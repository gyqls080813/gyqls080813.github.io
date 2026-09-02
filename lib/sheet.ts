import type { GraphNodeData, NodeKind } from "@/components/graph/types";
import { fullGraphEdges, fullGraphNodes } from "./graphData";
import { nodePath } from "./nodePath";
import { getPost, posts } from "./posts";
import { getProject } from "./projects";
import { getTheory } from "./theories";
import { getTil } from "./tils";
import { nodeOpenKind } from "./nodeTarget";
import { slugify } from "./slug";

/**
 * 껍데기가 "지금 열린 노드" 하나로부터 알아내야 하는 것 전부.
 *
 * 예전에는 시트를 여는 네 뷰(글·프로젝트·개념·소개)가 각자 머리말·포트·목차를
 * 만들었다. 그래서 껍데기가 페이지 안에 있었고, 주소가 바뀌면 트리와 그래프까지
 * 통째로 다시 마운트됐다 — 트리 스크롤이 맨 위로 튀고 접어 둔 갈래가 펴졌다.
 *
 * 껍데기를 레이아웃으로 올리려면 껍데기가 노드 id 하나만 알면 되게 만들어야
 * 한다. 그 계산이 여기 모여 있다. 데이터는 전부 번들에 있으므로 서버가
 * 넘겨 줄 것이 없다.
 */

// ── 지금 어느 노드인가 ───────────────────────────────────

/**
 * 주소 → 열린 노드 id. 시트가 아닌 곳(그래프 홈, 글 목록)이면 null.
 *
 * 목록(/posts)과 글(/posts/x)을 가르는 건 두 번째 칸의 유무다 — 목록은
 * 껍데기를 쓰지 않으므로 여기서 걸러야 한다.
 */
export function sheetNodeId(pathname: string): string | null {
  if (pathname === "/about") return "me";
  const match = /^\/(?:posts|projects|theories|tils)\/([^/]+)\/?$/.exec(pathname);
  return match ? decodeURIComponent(match[1]) : null;
}

// ── 목차 ────────────────────────────────────────────────

export type NavItem = { id: string; label: string; children?: NavItem[] };

/** 본문과 목차가 같은 제목을 봐야 한다 — 각자 적으면 언젠가 어긋난다 */
export const PROJECT_HEADINGS = {
  intro: "소개",
  views: "프로젝트 뷰",
  troubles: "트러블 슈팅",
} as const;

export const INTRO_HEADINGS = {
  intro: "자기소개",
  history: "이력",
  awards: "수상",
  stack: "사용 기술",
  projects: "Projects",
  blog: "기술 블로그",
} as const;

const item = (label: string): NavItem => ({ id: slugify(label), label });

/** 이 프로젝트에서 나온 글 — 목차·본문·포트가 같은 목록을 본다 */
export const troublesOf = (projectId: string) =>
  posts.filter((post) => post.project === projectId);

/** 오른쪽 목차 — 노드 종류마다 제목을 어디서 얻는지가 다르다 */
export function sheetNavItems(nodeId: string): NavItem[] {
  const theory = getTheory(nodeId);
  if (theory) {
    /* 절이 있으면 절 제목을, 없으면(길잡이 시트) 블록 라벨을 세운다.
       절이 있을 때는 그 아래 블록까지 두 층으로 넘긴다 — 펴는 판단은 목차가 한다 */
    if (theory.sections) {
      return theory.sections.map((section) => ({
        ...item(section.heading),
        children: section.blocks.map((block) => item(block.label)),
      }));
    }
    return (theory.blocks ?? []).map((block) => item(block.label));
  }

  /* 기록은 절만 세운다 — 블록 라벨까지 펴면 하루치 메모가 목차를 다 먹는다 */
  const til = getTil(nodeId);
  if (til) return til.sections.map((section) => item(section.heading));

  const project = getProject(nodeId);
  if (project) {
    return [
      PROJECT_HEADINGS.intro,
      ...(project.views?.length ? [PROJECT_HEADINGS.views] : []),
      ...project.blocks.map((block) => block.label),
      ...(troublesOf(project.id).length > 0 ? [PROJECT_HEADINGS.troubles] : []),
    ].map(item);
  }

  const post = getPost(nodeId);
  if (post) return post.sections.map((section) => item(section.heading));

  /* 소개는 내용이 고정이라 목록도 고정이다 */
  if (nodeId === "me") return Object.values(INTRO_HEADINGS).map(item);

  return [];
}

// ── 머리말 ──────────────────────────────────────────────

const nodeById = new Map(fullGraphNodes.map((node) => [node.id, node]));

/**
 * 머리말에 세울 길 — 뿌리부터 지금까지.
 *
 * 개념·생각은 계층이 간선에 있으므로 nodePath가 그대로 답이다. 트러블 글만
 * 예외인데, 프로젝트의 자식이지만 개념 계층(허브 → 챕터)에 속하지 않아서
 * 부모를 따로 얹어 준다.
 */
export function sheetCrumbs(nodeId: string): GraphNodeData[] {
  const post = getPost(nodeId);
  if (post) {
    return [post.project, nodeId]
      .map((id) => nodeById.get(id))
      .filter((node): node is GraphNodeData => node !== undefined);
  }
  return nodePath(nodeId);
}

// ── 가장자리 포트 ────────────────────────────────────────

export type Port = { id: string; role: string; name: string; kind: NodeKind };

/** 소개에서 뻗어 나가는 갈래 이름 — 여기 없는 종류는 포트로 세우지 않는다 */
const ME_ROLE: Partial<Record<NodeKind, string>> = {
  project: "프로젝트",
  theory: "이론",
  idea: "생각",
};

/**
 * 개념·생각 노드의 포트는 간선에서 그대로 끌어낸다.
 *
 * 위아래로도 이어지기 때문이다 — 상위 개념에서 내려와 하위 챕터로 갈라지고,
 * 옆으로는 그 개념이 나온 트러블 글로 빠진다. 손으로 적으면 그래프와 어긋난다.
 */
function edgePorts(nodeId: string, side: "in" | "out"): Port[] {
  return fullGraphEdges
    .filter((edge) => (side === "in" ? edge.to : edge.from) === nodeId)
    .map((edge) => (side === "in" ? edge.from : edge.to))
    .flatMap((id) => {
      const node = nodeById.get(id);
      if (!node) return [];
      const role =
        node.kind === "me"
          ? "공부한 사람"
          : node.kind === "trouble"
            ? "트러블슈팅"
            : side === "in"
              ? "상위 개념"
              : "하위 개념";
      return [{ id, role, name: node.label, kind: node.kind }];
    });
}

const labelOf = (id: string) => nodeById.get(id)?.label ?? id;

/** 시트 양옆의 포트 = 그래프에서 이 노드에 들어오고 나가는 선 */
export function sheetPorts(nodeId: string): { left: Port[]; right: Port[] } {
  switch (nodeOpenKind(nodeId)) {
    /* 기록도 계층이 간선에 있으므로 개념과 같은 방식으로 뽑는다 */
    case "theory":
    case "til":
      return { left: edgePorts(nodeId, "in"), right: edgePorts(nodeId, "out") };

    case "project": {
      /* 왼쪽은 만든 사람, 오른쪽은 여기서 나온 트러블 슈팅 */
      return {
        left: [{ id: "me", role: "만든 사람", name: "민엽", kind: "project" }],
        right: troublesOf(nodeId).map((post) => ({
          id: post.id,
          role: "트러블슈팅",
          name: post.title,
          kind: "trouble" as const,
        })),
      };
    }

    case "post": {
      const post = getPost(nodeId);
      if (!post) return { left: [], right: [] };
      return {
        left: [
          {
            id: post.project,
            role: "프로젝트 / 발생한 곳",
            name: labelOf(post.project),
            kind: "project",
          },
        ],
        right: post.theories.map((theory) => ({
          id: theory.id,
          role: `이론 / ${theory.role}`,
          name: labelOf(theory.id),
          kind: "theory" as const,
        })),
      };
    }

    case "intro":
      return {
        left: [],
        right: fullGraphEdges
          .filter((edge) => edge.from === "me")
          .flatMap((edge) => {
            const node = nodeById.get(edge.to);
            const role = node && ME_ROLE[node.kind];
            return node && role
              ? [{ id: node.id, role, name: node.label, kind: node.kind }]
              : [];
          }),
      };

    default:
      return { left: [], right: [] };
  }
}
