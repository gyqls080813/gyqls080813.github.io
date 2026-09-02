"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import KindIcon from "../graph/KindIcon";
import type { NodeKind } from "../graph/types";
import { fullGraphNodes } from "@/lib/graphData";
import { posts } from "@/lib/posts";
/* 계층은 머리말과 같은 지도를 쓴다 — 둘이 각자 계산하면 다른 깊이를 말하게 된다 */
import { chaptersOf, parentOf } from "@/lib/nodePath";
import { nodeDestination, nodeHref } from "@/lib/nodeTarget";
import { getTheory } from "@/lib/theories";
import { getTil } from "@/lib/tils";
import styles from "./NodeTree.module.css";

/**
 * 트리에서 누르면 글로 곧장 간다.
 *
 * 포트는 `/?node=` 로 그래프를 거친다 — 어느 노드로 가는지 이동·확대가 보여야
 * 연결이 읽히기 때문이다. 트리는 다르다. 이미 목록에서 무엇을 고르는지 보고
 * 누르는 것이라, 그래프를 한 번 들렀다 오는 것이 기다림밖에 안 된다.
 */
const treeHref = (id: string) => nodeDestination(id) ?? nodeHref(id);

function nodeLabel(id: string): string {
  const node = fullGraphNodes.find((candidate) => candidate.id === id);
  if (!node) return id;
  return node.sublabel ? `${node.label} ${node.sublabel}` : node.label;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 5 L16 12 L9 19"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** 아래가 없는 줄의 점 색 — 여기 없는 종류는 이론 색으로 떨어진다 */
const DOT_CLASS: Partial<Record<NodeKind, string>> = {
  idea: styles.dotIdea,
  til: styles.dotIdea,
};

/** 누구의 챕터도 아닌 노드 — 그 갈래의 뿌리만 최상위에 선다.
    아래가 없는 뿌리(철학)도 있으므로 클러스터가 아니라 노드에서 찾는다 */
const rootsOf = (kind: NodeKind) =>
  fullGraphNodes
    .filter((node) => node.kind === kind && !parentOf.has(node.id))
    .map((node) => node.id);
const theoryRoots = rootsOf("theory");
const ideaRoots = rootsOf("idea");

/** 글 페이지 좌측의 노드 탐색기 — VS Code 탐색기 문법 */
export default function NodeTree({ activeNodeId }: { activeNodeId: string }) {
  /* 처음에는 전부 펴 둔다 — 탐색기는 무엇이 어디 있는지 한눈에 보이는 것이
     먼저고, 길면 접는 것은 보는 사람이 정한다. */
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const projects = fullGraphNodes.filter((node) => node.kind === "project");

  /**
   * 트리의 한 줄 — 갈래가 달라도 이 모양은 같다.
   *
   * 화살표는 펴고, 이름은 연다. 둘을 한 버튼으로 합치면 아래가 있는 줄(프로젝트,
   * Learn React…)은 이름을 눌러도 펴지기만 하고 그 노드로는 갈 수 없다.
   * 아래가 없는 줄도 화살표 자리를 비워 둬야 같은 층의 이름이 한 줄로 선다.
   */
  const TreeRow = ({
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
  }) => {
    const open = !collapsed.has(id);
    const active = id === activeNodeId;
    const group = children !== undefined;

    const inner = (
      <>
        {icon}
        <span className={`${styles.rowLabel} ${group ? styles.groupLabel : ""}`}>
          {label}
        </span>
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
              onClick={() => toggle(id)}
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
              className={`${styles.row} ${styles.rowGrow} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {inner}
            </Link>
          ) : (
            <div className={`${styles.row} ${styles.rowGrow}`}>{inner}</div>
          )}
        </div>
        {group && open && <div className={styles.children}>{children}</div>}
      </div>
    );
  };

  /** 개념 한 줄 — 아래로 내려가는 것만 여기서 따진다 */
  const TheoryRow = ({ id }: { id: string }) => {
    const chapters = chaptersOf.get(id);
    const references = posts.filter((post) =>
      post.theories.some((theory) => theory.id === id),
    ).length;
    const kind = fullGraphNodes.find((node) => node.id === id)?.kind ?? "theory";

    return (
      <TreeRow
        id={id}
        label={nodeLabel(id)}
        icon={
          chapters ? (
            <KindIcon kind={kind} size={13} />
          ) : (
            <span
              className={`${styles.dot} ${DOT_CLASS[kind] ?? styles.dotTheory}`}
            />
          )
        }
        count={
          chapters ? (
            <span className={styles.count}>{chapters.length}</span>
          ) : references > 0 ? (
            <span className={styles.count}>글 {references}</span>
          ) : undefined
        }
        /* 내용이 있는 것만 링크가 된다 — 나머지는 아직 이름뿐이다 */
        href={getTheory(id) || getTil(id) ? treeHref(id) : undefined}
      >
        {chapters?.map((child) => <TheoryRow key={child} id={child} />)}
      </TreeRow>
    );
  };

  return (
    <nav className={styles.tree} aria-label="노드 탐색기">
      <Link href="/" className={styles.graphLink}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="10" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M8.4 7.2 L15.4 8.4 M7 8.4 L9.2 15.4 M15.6 11 L12 15.6"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
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
              label={nodeLabel(project.id)}
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
  );
}
