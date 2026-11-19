import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { allClusters, fullGraphBackdrops, fullGraphEdges, fullGraphNodes } from "@/lib/graphData";
import {
  dictionarySections,
  postSummaries,
  projectSummaries,
  techBranches,
  tilEntries,
} from "@/lib/catalog";
import { theories } from "@/lib/theories";
import { ideas } from "@/lib/ideas";
import { posts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { tils } from "@/lib/tils";
import { entriesByDocument } from "@/lib/dictionary";
import { OPEN_KINDS, routeOf } from "@/lib/nodeKinds";
import { nodeOpenKind } from "@/lib/nodeTarget";
import { crumbsOf, sheetNodeId } from "@/lib/outline";
import { nodeOutline } from "@/lib/sheet";

/**
 * 손으로 맞추는 id가 수백 개다(노드, 간선, 틀, 클러스터, 사전 절, 글이 가리키는 개념).
 * 화면 쪽 코드는 어긋나도 그리도록 짜여 있어서(`?? []`, `filter(isDefined)`, 없는 id는
 * 이름 대신 id) 틀려도 조용히 사라진다. 그래서 어긋남은 여기서 잡는다.
 */

const nodeIds = new Set(fullGraphNodes.map((node) => node.id));
const backdropIds = new Set(fullGraphBackdrops.map((backdrop) => backdrop.id));
const missing = (ids: Iterable<string>, known: Set<string>) =>
  [...ids].filter((id) => !known.has(id));
const sameIds = (a: { id: string }[], b: { id: string }[]) =>
  expect(a.map((x) => x.id)).toEqual(b.map((x) => x.id));

describe("그래프의 id", () => {
  it("노드 id가 겹치지 않는다", () => {
    expect(nodeIds.size).toBe(fullGraphNodes.length);
  });

  it("간선의 양 끝이 모두 노드다", () => {
    expect(
      missing(
        fullGraphEdges.flatMap((edge) => [edge.from, edge.to]),
        nodeIds,
      ),
    ).toEqual([]);
  });

  it("클러스터의 허브와 챕터가 모두 노드다", () => {
    expect(
      missing(
        allClusters.flatMap((cluster) => [cluster.hub, ...cluster.chapters]),
        nodeIds,
      ),
    ).toEqual([]);
  });

  it("틀의 members는 노드이거나 다른 틀이다", () => {
    const known = new Set([...nodeIds, ...backdropIds]);
    expect(
      missing(
        fullGraphBackdrops.flatMap((backdrop) => backdrop.members),
        known,
      ),
    ).toEqual([]);
  });

  it("한 노드(틀)는 틀 하나에만 들어간다", () => {
    const owner = new Map<string, string>();
    const twice: string[] = [];
    for (const backdrop of fullGraphBackdrops)
      for (const member of backdrop.members) {
        if (owner.has(member)) twice.push(`${member}: ${owner.get(member)}, ${backdrop.id}`);
        owner.set(member, backdrop.id);
      }
    expect(twice).toEqual([]);
  });

  it("기술 갈래의 뿌리, 글이 가리키는 개념, 사전 절의 문서가 모두 노드다", () => {
    expect(
      missing(
        techBranches.map((branch) => branch.root),
        nodeIds,
      ),
    ).toEqual([]);
    expect(
      missing(
        postSummaries.flatMap((post) => post.theories.map((theory) => theory.id)),
        nodeIds,
      ),
    ).toEqual([]);
    expect(
      missing(
        dictionarySections.map((section) => section.from),
        nodeIds,
      ),
    ).toEqual([]);
  });

  it("글의 프로젝트가 실제 프로젝트다", () => {
    const projectIds = new Set(projectSummaries.map((project) => project.id));
    expect(
      missing(
        postSummaries.map((post) => post.project),
        projectIds,
      ),
    ).toEqual([]);
  });
});

describe("요약과 본문은 1:1", () => {
  /* 본문 목록은 요약을 flatMap(find)으로 거른다 — 본문 id에 오타가 있으면 그 글이 사라진다 */
  it("글, 프로젝트, TIL마다 본문이 있다", () => {
    sameIds(posts, postSummaries);
    sameIds(projects, projectSummaries);
    sameIds(tils, tilEntries);
  });

  it("사전의 낱말 묶음마다 절이 있고, 절마다 낱말이 있다", () => {
    const sectionFrom = new Set(dictionarySections.map((section) => section.from));
    expect(
      missing(
        entriesByDocument.map((group) => group.from),
        sectionFrom,
      ),
    ).toEqual([]);
    const groupFrom = new Set(entriesByDocument.map((group) => group.from));
    expect(missing(sectionFrom, groupFrom)).toEqual([]);
  });

  it("이론과 생각의 시트마다 그래프 노드가 있다", () => {
    expect(
      missing(
        [...theories, ...ideas].map((sheet) => sheet.id),
        nodeIds,
      ),
    ).toEqual([]);
  });
});

describe("같은 이름은 한 곳에서", () => {
  it("이론, 생각 노드의 이름은 시트의 graphLabel(없으면 name)과 같다", () => {
    const sheetLabel = new Map([...theories, ...ideas].map((s) => [s.id, s.graphLabel ?? s.name]));
    const differ = fullGraphNodes
      .filter((node) => sheetLabel.has(node.id) && sheetLabel.get(node.id) !== node.label)
      .map((node) => `${node.id}: 그래프 "${node.label}" / 시트 "${sheetLabel.get(node.id)}"`);
    expect(differ).toEqual([]);
  });

  it("graphLabel은 name과 다를 때만 적는다", () => {
    const useless = [...theories, ...ideas]
      .filter((sheet) => sheet.graphLabel === sheet.name)
      .map((sheet) => sheet.id);
    expect(useless).toEqual([]);
  });
});

describe("머리말의 길", () => {
  /* 트러블 글은 개념 계층 밖이라 부모(프로젝트)를 요약 목록에서 얹는다 */
  it("트러블 글은 프로젝트 › 글", () => {
    for (const post of postSummaries) {
      expect(crumbsOf(post.id).map((node) => node.id)).toEqual([post.project, post.id]);
    }
  });

  it("챕터는 허브부터 자기까지", () => {
    for (const cluster of allClusters) {
      for (const chapter of cluster.chapters) {
        const path = crumbsOf(chapter).map((node) => node.id);
        expect(path.at(-1)).toBe(chapter);
        expect(path.at(-2)).toBe(cluster.hub);
      }
    }
  });
});

describe("색인 조회", () => {
  /* 생성된 색인은 평범한 객체라 Object의 기본 키가 걸리면 안 된다 (/?node=constructor) */
  it("Object의 기본 키는 노드가 아니다", () => {
    for (const key of ["constructor", "toString", "__proto__", "hasOwnProperty"]) {
      expect(nodeOpenKind(key)).toBeNull();
      expect(nodeOutline(key)).toEqual({ nav: [], ports: { left: [], right: [] } });
      expect(crumbsOf(key)).toEqual([]);
      expect(sheetNodeId(`/theories/${key}`)).toBeNull();
    }
  });
});

describe("시트 종류마다 두 벌의 라우트", () => {
  /*
   * 시트 한 종류는 본문 페이지(app/<주소>/…/page.tsx)와 목차, 포트를 그리는 슬롯 페이지
   * (app/@outline/<주소>/…/page.tsx)를 함께 둔다. 슬롯 쪽을 빠뜨리면 default.tsx가 받아 주어
   * 타입 검사도 빌드도 통과하지만, 앱 안에서 그 시트로 옮기면 Next가 직전 시트의 슬롯을
   * 그대로 남겨 다른 시트의 목차와 포트가 보인다. 그래서 여기서 잡는다.
   */
  const pageFile = (base: string, kind: (typeof OPEN_KINDS)[number]) => {
    const route = routeOf(kind, "__id__");
    const dir = route.includes("__id__") ? route.replace("__id__", "[id]") : route;
    return join(process.cwd(), base, ...dir.split("/").filter(Boolean), "page.tsx");
  };

  it.each(OPEN_KINDS)("%s: 본문 페이지와 슬롯 페이지가 모두 있다", (kind) => {
    expect(existsSync(pageFile("app", kind)), pageFile("app", kind)).toBe(true);
    expect(existsSync(pageFile("app/@outline", kind)), pageFile("app/@outline", kind)).toBe(true);
  });
});

describe("주소와 파일 이름에 쓰는 글자", () => {
  it("노드 id는 소문자, 숫자, 하이픈뿐이다 — public/outline 파일 이름과 주소에 그대로 쓴다", () => {
    expect(fullGraphNodes.map((node) => node.id).filter((id) => !/^[a-z0-9-]+$/.test(id))).toEqual(
      [],
    );
  });
});

describe("결과 미리보기", () => {
  it("preview는 HTML 코드가 있는 블록에만 단다 — 다른 블록에서는 조용히 무시된다", () => {
    const wrong = theories.flatMap((theory) =>
      [...(theory.blocks ?? []), ...(theory.sections ?? []).flatMap((s) => s.blocks)]
        .filter((block) => block.preview && !(block.code && block.codeLang === "html"))
        .map((block) => `${theory.id}: ${block.label}`),
    );
    expect(wrong).toEqual([]);
  });
});

describe("배우는 장치", () => {
  const blocksOf = (theory: (typeof theories)[number]) => [
    ...(theory.blocks ?? []),
    ...(theory.sections ?? []).flatMap((s) => s.blocks),
  ];

  it("표의 행마다 칸 수가 머리와 같다 — 모자라면 칸이 밀려 다른 열의 값으로 읽힌다", () => {
    const wrong = theories.flatMap((theory) =>
      blocksOf(theory).flatMap((block) =>
        (block.tables ?? []).flatMap((table, t) =>
          table.rows
            .map((row, r) => [row.length, r] as const)
            .filter(([length]) => length !== table.head.length)
            .map(([length, r]) => `${theory.id}: ${block.label} 표${t} ${r}행 ${length}칸`),
        ),
      ),
    );
    expect(wrong).toEqual([]);
  });

  it("확인 질문은 질문과 답이 짝으로 있다", () => {
    const wrong = theories.flatMap((theory) =>
      blocksOf(theory).flatMap((block) =>
        (block.quiz ?? [])
          .filter((item) => !item.q.trim() || !item.a.trim())
          .map(() => `${theory.id}: ${block.label}`),
      ),
    );
    expect(wrong).toEqual([]);
  });

  it("절에는 블록이 하나 이상 있다", () => {
    const empty = theories.flatMap((theory) =>
      (theory.sections ?? [])
        .filter((section) => section.blocks.length === 0)
        .map((section) => `${theory.id}: ${section.heading}`),
    );
    expect(empty).toEqual([]);
  });
});
