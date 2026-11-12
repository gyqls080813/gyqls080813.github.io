import type { GraphNodeData, NodeKind } from "@/components/graph/types";
import { fullGraphEdges, labelOf, nodeById } from "./graphData";
import { nodePath } from "./nodePath";
import { getDictionary } from "./dictionary";
import { getIdea } from "./ideas";
import type { NodeOpenKind } from "./nodeKinds";
import { getPost, posts } from "./posts";
import { getProject } from "./projects";
import { getTheory } from "./theories";
import { getTil } from "./tils";
import { nodeOpenKindFromContent } from "./openKind";
import { sectionBlockId, slugify } from "./slug";
import { PROJECT_HEADINGS, INTRO_HEADINGS } from "./headings";
import { isDefined } from "./util";

/**
 * 껍데기가 "지금 열린 노드" 하나로부터 알아내야 하는 것 전부 — 목차·머리말·포트.
 *
 * 껍데기를 루트 레이아웃에 두려면 껍데기가 노드 id 하나만 알면 되게 만들어야 한다.
 * 그 계산이 여기 모여 있다. 본문 모듈을 전부 부르므로 브라우저는 이 파일을 쓰지
 * 않는다 — 빌드 때 scripts/sheet-index.mjs가 결과를 색인으로 뽑고, 브라우저는
 * lib/outline으로 그 색인을 읽는다.
 *
 * 목차와 포트는 노드의 종류(lib/nodeKinds)로 갈린다. 둘 다 종류 → 계산 표라,
 * 갈래가 하나 늘면 두 표가 함께 타입 오류로 알려 준다.
 */

// ── 목차 ────────────────────────────────────────────────

export type NavItem = { id: string; label: string; children?: NavItem[] };

const item = (label: string): NavItem => ({ id: slugify(label), label });

/** 이 프로젝트에서 나온 글 — 목차·본문·포트가 같은 목록을 본다 */
export const troublesOf = (projectId: string) => posts.filter((post) => post.project === projectId);

/**
 * 생각 시트는 이론 시트와 같은 모양이라 목차도 같은 규칙으로 세운다.
 * 절이 있으면 절 제목을, 없으면(길잡이 시트) 블록 라벨을 세운다. 절이 있을 때는
 * 그 아래 블록까지 두 층으로 넘긴다 — 펴는 판단은 목차가 한다.
 * 블록 앵커는 절 id를 앞에 붙인다 — 본문(SheetArticle)과 같은 규칙이다.
 */
function theoryNav(theory: ReturnType<typeof getTheory>): NavItem[] {
  if (!theory) return [];
  if (!theory.sections) return (theory.blocks ?? []).map((block) => item(block.label));
  return theory.sections.map((section) => ({
    ...item(section.heading),
    children: section.blocks.map((block) => ({
      id: sectionBlockId(section.heading, block.label),
      label: block.label,
    })),
  }));
}

/** 오른쪽 목차 — 노드 종류마다 제목을 어디서 얻는지가 다르다 */
const NAV: Record<NodeOpenKind, (nodeId: string) => NavItem[]> = {
  theory: (id) => theoryNav(getTheory(id)),
  idea: (id) => theoryNav(getIdea(id)),
  /* 기록은 절만 세운다 — 블록 라벨까지 펴면 하루치 메모가 목차를 다 먹는다 */
  til: (id) => getTil(id)?.sections.map((section) => item(section.heading)) ?? [],
  /* 사전은 절(나온 문서) 아래 낱말까지 두 층 — 찾는 것이 낱말이라 목차에 있어야 한다 */
  dict: (id) =>
    getDictionary(id)?.sections.map((section) => ({
      ...item(section.heading),
      children: section.entries.map((entry) => item(entry.term)),
    })) ?? [],
  project: (id) => {
    const project = getProject(id);
    if (!project) return [];
    return [
      PROJECT_HEADINGS.intro,
      ...(project.views?.length ? [PROJECT_HEADINGS.views] : []),
      ...project.blocks.map((block) => block.label),
      ...(troublesOf(project.id).length > 0 ? [PROJECT_HEADINGS.troubles] : []),
    ].map(item);
  },
  post: (id) => getPost(id)?.sections.map((section) => item(section.heading)) ?? [],
  /* 소개는 내용이 고정이라 목록도 고정이다 */
  intro: () => Object.values(INTRO_HEADINGS).map(item),
};

export function sheetNavItems(nodeId: string): NavItem[] {
  const kind = nodeOpenKindFromContent(nodeId);
  return kind ? NAV[kind](nodeId) : [];
}

// ── 머리말 ──────────────────────────────────────────────

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
    return [post.project, nodeId].map((id) => nodeById.get(id)).filter(isDefined);
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

/** 개념·생각 시트의 포트 이름 — 건너편 노드가 무엇이고 어느 쪽에서 왔는지로 정한다 */
function edgeRole(node: GraphNodeData, side: "in" | "out"): string {
  if (node.kind === "me") return "공부한 사람";
  if (node.kind === "trouble") return "트러블슈팅";
  if (node.id === "dict") return "사전";
  return side === "in" ? "상위 개념" : "하위 개념";
}

/**
 * 개념·생각 노드의 포트는 간선에서 그대로 끌어낸다.
 *
 * 위아래로도 이어지기 때문이다 — 상위 개념에서 내려와 하위 챕터로 갈라지고,
 * 옆으로는 그 개념이 나온 트러블 글로 빠진다. 손으로 적으면 그래프와 어긋난다.
 */
function edgePorts(nodeId: string, side: "in" | "out"): Port[] {
  return fullGraphEdges
    .filter((edge) => (side === "in" ? edge.to : edge.from) === nodeId)
    .map((edge) => nodeById.get(side === "in" ? edge.from : edge.to))
    .filter(isDefined)
    .map((node) => ({
      id: node.id,
      role: edgeRole(node, side),
      name: node.label,
      kind: node.kind,
    }));
}

type Ports = { left: Port[]; right: Port[] };

/** 개념·생각·기록은 계층이 간선에 있으므로 같은 방식으로 뽑는다 */
const hierarchyPorts = (id: string): Ports => ({
  left: edgePorts(id, "in"),
  right: edgePorts(id, "out"),
});

/** 시트 양옆의 포트 = 그래프에서 이 노드에 들어오고 나가는 선 */
const PORTS: Record<NodeOpenKind, (nodeId: string) => Ports> = {
  theory: hierarchyPorts,
  idea: hierarchyPorts,
  til: hierarchyPorts,

  /* 사전의 왼쪽은 낱말이 나온 문서들 — 문서 → 사전 간선이 그대로 답이다.
     트러블 글의 왼쪽이 발생한 곳이듯, 여기도 들어온 쪽이 출처다 */
  dict: (id) => ({
    left: edgePorts(id, "in").map((port) =>
      port.kind === "theory" ? { ...port, role: "낱말이 나온 곳" } : port,
    ),
    right: [],
  }),

  /* 왼쪽은 만든 사람, 오른쪽은 여기서 나온 트러블 슈팅.
     그래프에서 민엽은 보라다 — 시트 포트도 같은 색이어야 같은 노드로 읽힌다 */
  project: (id) => ({
    left: [{ id: "me", role: "만든 사람", name: "민엽", kind: "me" }],
    right: troublesOf(id).map((post) => ({
      id: post.id,
      role: "트러블슈팅",
      name: post.title,
      kind: "trouble",
    })),
  }),

  post: (id) => {
    const post = getPost(id);
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
        kind: "theory",
      })),
    };
  },

  intro: () => ({
    left: [],
    right: fullGraphEdges
      .filter((edge) => edge.from === "me")
      .map((edge) => nodeById.get(edge.to))
      .filter(isDefined)
      .flatMap((node) => {
        const role = ME_ROLE[node.kind];
        return role ? [{ id: node.id, role, name: node.label, kind: node.kind }] : [];
      }),
  }),
};

export function sheetPorts(nodeId: string): Ports {
  const kind = nodeOpenKindFromContent(nodeId);
  return kind ? PORTS[kind](nodeId) : { left: [], right: [] };
}

export { INTRO_HEADINGS, PROJECT_HEADINGS } from "./headings";
