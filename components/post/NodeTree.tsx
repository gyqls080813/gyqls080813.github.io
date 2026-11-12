"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import Link from "next/link";
import KindIcon from "../graph/KindIcon";
import type { NodeKind } from "../graph/types";
import { ChevronIcon, GraphIcon } from "../icons";
import { fullGraphNodes, labelOf, nodeById } from "@/lib/graphData";
import { postOutlines as posts } from "@/lib/outline";
import { cx, toggled } from "@/lib/util";
/* 계층은 머리말과 같은 지도를 쓴다 — 둘이 각자 계산하면 다른 깊이를 말하게 된다 */
import { chaptersOf, parentOf } from "@/lib/nodePath";
import { nodeDestination, nodeHref, nodeOpenKind } from "@/lib/nodeTarget";
import styles from "./NodeTree.module.css";

/**
 * 트리에서 누르면 글로 곧장 간다.
 *
 * 포트는 `/?node=` 로 그래프를 거친다 — 어느 노드로 가는지 이동·확대가 보여야
 * 연결이 읽히기 때문이다. 트리는 다르다. 이미 목록에서 무엇을 고르는지 보고
 * 누르는 것이라, 그래프를 한 번 들렀다 오는 것이 기다림밖에 안 된다.
 */
const treeHref = (id: string) => nodeDestination(id) ?? nodeHref(id);

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={cx(styles.chevron, open && styles.chevronOpen)}>
      <ChevronIcon />
    </span>
  );
}

/** 누구의 챕터도 아닌 노드 — 그 갈래의 뿌리만 최상위에 선다.
    아래가 없는 뿌리(철학)도 있으므로 클러스터가 아니라 노드에서 찾는다 */
const rootsOf = (kind: NodeKind) =>
  fullGraphNodes
    .filter((node) => node.kind === kind && !parentOf.has(node.id))
    .map((node) => node.id);
/* 프로젝트 줄 — 데이터가 모듈 상수라 그릴 때마다 다시 거를 까닭이 없다 */
const projects = fullGraphNodes.filter((node) => node.kind === "project");
const theoryRoots = rootsOf("theory");
const ideaRoots = rootsOf("idea");

/**
 * 트리 전체가 함께 보는 상태 — 접힌 갈래와 그것을 바꾸는 손잡이, 지금 열린 노드.
 *
 * 줄 컴포넌트를 NodeTree 안에서 만들면 NodeTree가 다시 그려질 때마다(노드를 고를
 * 때마다) React가 다른 컴포넌트로 보고 트리 줄 전체를 지웠다가 새로 만든다.
 * 그러면 트리가 흔들린다. 줄은 바깥에 두고 상태는 여기서 읽어, 강조만 바뀌게 한다.
 */
const TreeState = createContext<{
  collapsed: ReadonlySet<string>;
  /* 상태 setter를 그대로 넘긴다 — 바뀌지 않는 값이라 묶음이 접기 상태와 열린
     노드가 바뀔 때만 새로 만들어진다 */
  setCollapsed: Dispatch<SetStateAction<ReadonlySet<string>>>;
  activeNodeId: string;
}>({ collapsed: new Set(), setCollapsed: () => {}, activeNodeId: "" });

/**
 * 트리의 한 줄 — 갈래가 달라도 이 모양은 같다.
 *
 * 화살표는 펴고, 이름은 연다. 둘을 한 버튼으로 합치면 아래가 있는 줄(프로젝트,
 * Learn React…)은 이름을 눌러도 펴지기만 하고 그 노드로는 갈 수 없다.
 * 아래가 없는 줄도 화살표 자리를 비워 둬야 같은 층의 이름이 한 줄로 선다.
 */
function TreeRow({
  id,
  label,
  icon,
  count,
  href,
  children,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  count?: ReactNode;
  /** 열 것이 없으면 생략 — 이름이 링크가 되지 않는다 */
  href?: string;
  /** 아래에 그릴 것. 없으면 화살표 대신 빈 자리를 둔다 */
  children?: ReactNode;
}) {
  const { collapsed, setCollapsed, activeNodeId } = useContext(TreeState);
  const open = !collapsed.has(id);
  const active = id === activeNodeId;
  const group = children !== undefined;

  const inner = (
    <>
      {icon}
      <span className={cx(styles.rowLabel, group && styles.groupLabel)}>{label}</span>
      {count}
    </>
  );

  return (
    <div>
      <div className={styles.rowSplit}>
        {group ? (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setCollapsed((current) => toggled(current, id))}
            aria-expanded={open}
            aria-label={`${label} ${open ? "접기" : "펼치기"}`}
          >
            <Chevron open={open} />
          </button>
        ) : (
          <span className={styles.togglePad} />
        )}
        {href ? (
          <Link
            href={href}
            /* 본문 맨 위로 되돌리기는 SheetShell이 한다 — Next가 화면을 옮기면 트리까지 움직인다 */
            scroll={false}
            className={cx(styles.row, styles.rowGrow, active && styles.active)}
            aria-current={active ? "page" : undefined}
          >
            {inner}
          </Link>
        ) : (
          <div className={cx(styles.row, styles.rowGrow)}>{inner}</div>
        )}
      </div>
      {group && open && <div className={styles.children}>{children}</div>}
    </div>
  );
}

/** 줄 오른쪽의 수 — 아래가 있으면 챕터 수, 없으면 이 개념이 나온 글 수 */
function theoryCount(chapters: readonly string[] | undefined, references: number) {
  if (chapters) return <span className={styles.count}>{chapters.length}</span>;
  if (references > 0) return <span className={styles.count}>글 {references}</span>;
  return undefined;
}

/** 개념 한 줄 — 아래로 내려가는 것만 여기서 따진다 */
function TheoryRow({ id }: { id: string }) {
  const chapters = chaptersOf.get(id);
  const references = posts.filter((post) =>
    post.theories.some((theory) => theory.id === id),
  ).length;
  const kind = nodeById.get(id)?.kind ?? "theory";

  return (
    <TreeRow
      id={id}
      label={labelOf(id)}
      icon={
        chapters ? (
          <KindIcon kind={kind} size={13} />
        ) : (
          /* 아래가 없는 줄은 아이콘 대신 점 — 색은 종류에서 */
          <span className={styles.dot} data-kind={kind} />
        )
      }
      count={theoryCount(chapters, references)}
      /* 내용이 있는 것만 링크가 된다 — 나머지는 아직 이름뿐이다.
         무엇이 열리는지는 그래프·포트와 같은 판단 하나(nodeOpenKind)를 쓴다.
         갈래마다 getTheory·getTil처럼 손으로 적으면 갈래가 늘 때 여기만 빠진다 */
      href={nodeOpenKind(id) ? treeHref(id) : undefined}
    >
      {chapters?.map((child) => (
        <TheoryRow key={child} id={child} />
      ))}
    </TreeRow>
  );
}

/** 글 페이지 좌측의 노드 탐색기 — VS Code 탐색기 문법 */
export default function NodeTree({ activeNodeId }: { activeNodeId: string }) {
  /* 처음에는 전부 펴 둔다 — 탐색기는 무엇이 어디 있는지 한눈에 보이는 것이
     먼저고, 길면 접는 것은 보는 사람이 정한다. */
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set());

  const treeState = useMemo(
    () => ({ collapsed, setCollapsed, activeNodeId }),
    [collapsed, activeNodeId],
  );

  return (
    <TreeState.Provider value={treeState}>
      <nav className={styles.tree} aria-label="노드 탐색기">
        <Link href="/" className={styles.graphLink}>
          <GraphIcon />
          전체 그래프로 돌아가기
        </Link>

        {/* 그래프의 시작점 — 갈래 셋보다 위에, 이름표 없이 혼자 선다 */}
        <div className={styles.section}>
          <TreeRow
            id="me"
            label="민엽"
            icon={<KindIcon kind="me" size={13} />}
            count={<span className={styles.count}>자기소개</span>}
            href={treeHref("me")}
          />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>프로젝트</div>
          {projects.map((project) => {
            const projectPosts = posts
              .filter((post) => post.project === project.id)
              .sort((a, b) => b.date.localeCompare(a.date));
            return (
              <TreeRow
                key={project.id}
                id={project.id}
                label={project.label}
                icon={<KindIcon kind="project" size={13} />}
                count={<span className={styles.count}>{projectPosts.length}</span>}
                href={treeHref(project.id)}
              >
                {projectPosts.map((post) => (
                  <TreeRow
                    key={post.id}
                    id={post.id}
                    label={post.title}
                    icon={<KindIcon kind="trouble" size={12} />}
                    href={treeHref(post.id)}
                  />
                ))}
              </TreeRow>
            );
          })}
        </div>

        {/* 프로젝트 → 이론 → 생각. 만든 것에서 출발해 그 근거가 된 것으로,
          마지막이 그 위에서 내가 정한 것 — 그래프의 갈래 순서와 같다 */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>이론</div>
          {theoryRoots.map((root) => (
            <TheoryRow key={root} id={root} />
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>생각</div>
          {ideaRoots.map((root) => (
            <TheoryRow key={root} id={root} />
          ))}
        </div>
      </nav>
    </TreeState.Provider>
  );
}
