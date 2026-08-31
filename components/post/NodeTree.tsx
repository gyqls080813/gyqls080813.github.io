"use client";

import { useState } from "react";
import Link from "next/link";
import KindIcon from "../graph/KindIcon";
import { fullGraphNodes, theoryClusters } from "@/lib/graphData";
import { posts } from "@/lib/posts";
import { nodeHref } from "@/lib/nodeTarget";
import { getTheory } from "@/lib/theories";
import styles from "./NodeTree.module.css";

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

/* 개념 계층 — 그래프의 허브 → 챕터 관계가 그대로 트리가 된다 */
const chaptersOf = new Map<string, readonly string[]>(
  theoryClusters.map((cluster) => [cluster.hub, cluster.chapters]),
);
const parentOf = new Map<string, string>(
  theoryClusters.flatMap((cluster) =>
    cluster.chapters.map((chapter) => [chapter, cluster.hub] as const),
  ),
);
/** 아무의 챕터도 아닌 허브 — React·JavaScript·TypeScript */
const theoryRoots = theoryClusters
  .map((cluster) => cluster.hub)
  .filter((hub) => !parentOf.has(hub));

/** 이 노드에서 뿌리까지의 길 (자기 포함) — 이 줄들만 펴 둔다 */
function pathToRoot(id: string): Set<string> {
  const path = new Set<string>([id]);
  let current = parentOf.get(id);
  while (current && !path.has(current)) {
    path.add(current);
    current = parentOf.get(current);
  }
  return path;
}

/** 글 페이지 좌측의 노드 탐색기 — VS Code 탐색기 문법 */
export default function NodeTree({ activePostId }: { activePostId: string }) {
  /* 개념은 150개가 넘는다 — 전부 편 채로 두면 목록이 아니라 벽이 된다.
     지금 보고 있는 줄까지의 길만 펴 두고 나머지는 접는다. */
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => {
    const open = pathToRoot(activePostId);
    return new Set([...chaptersOf.keys()].filter((hub) => !open.has(hub)));
  });

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const projects = fullGraphNodes.filter((node) => node.kind === "project");

  /** 개념 한 줄. 아래가 있으면 화살표로 펴고, 내용이 있으면 이름으로 연다 */
  const TheoryRow = ({ id }: { id: string }) => {
    const children = chaptersOf.get(id);
    const open = children ? !collapsed.has(id) : false;
    const references = posts.filter((post) =>
      post.theories.some((theory) => theory.id === id),
    ).length;
    const active = id === activePostId;

    const inner = (
      <>
        {children ? (
          <KindIcon kind="theory" size={13} />
        ) : (
          <span className={`${styles.dot} ${styles.dotTheory}`} />
        )}
        <span
          className={`${styles.rowLabel} ${children ? styles.groupLabel : ""}`}
        >
          {nodeLabel(id)}
        </span>
        {children ? (
          <span className={styles.count}>{children.length}</span>
        ) : (
          references > 0 && <span className={styles.count}>글 {references}</span>
        )}
      </>
    );

    /* 내용이 있는 개념만 링크가 된다 — 나머지는 아직 이름뿐이다 */
    const name = getTheory(id) ? (
      <Link
        href={nodeHref(id)}
        className={`${styles.row} ${styles.rowGrow} ${active ? styles.active : ""}`}
        aria-current={active ? "page" : undefined}
      >
        {inner}
      </Link>
    ) : (
      <div className={`${styles.row} ${styles.rowGrow}`}>{inner}</div>
    );

    /* 아래가 없는 줄도 화살표 자리를 비워 둔다 — 같은 층의 이름이 한 줄로 선다 */
    if (!children) {
      return (
        <div className={styles.rowSplit}>
          <span className={styles.togglePad} />
          {name}
        </div>
      );
    }
    return (
      <div>
        <div className={styles.rowSplit}>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => toggle(id)}
            aria-expanded={open}
            aria-label={`${nodeLabel(id)} ${open ? "접기" : "펼치기"}`}
          >
            <Chevron open={open} />
          </button>
          {name}
        </div>
        {open && (
          <div className={styles.children}>
            {children.map((child) => (
              <TheoryRow key={child} id={child} />
            ))}
          </div>
        )}
      </div>
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

      <div className={styles.section}>
        <div className={styles.sectionLabel}>프로젝트</div>
        {projects.map((project) => {
          const projectPosts = posts
            .filter((post) => post.project === project.id)
            .sort((a, b) => b.date.localeCompare(a.date));
          const open = !collapsed.has(project.id);
          return (
            <div key={project.id}>
              <button
                type="button"
                className={styles.row}
                onClick={() => toggle(project.id)}
                aria-expanded={open}
              >
                <Chevron open={open} />
                <KindIcon kind="project" size={13} />
                <span className={`${styles.rowLabel} ${styles.groupLabel}`}>
                  {nodeLabel(project.id)}
                </span>
                <span className={styles.count}>{projectPosts.length}</span>
              </button>
              {open && (
                <div className={styles.children}>
                  {projectPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={nodeHref(post.id)}
                      className={`${styles.row} ${
                        post.id === activePostId ? styles.active : ""
                      }`}
                      aria-current={post.id === activePostId ? "page" : undefined}
                    >
                      <KindIcon kind="trouble" size={12} />
                      <span className={styles.rowLabel}>{post.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>이론</div>
        {theoryRoots.map((root) => (
          <TheoryRow key={root} id={root} />
        ))}
      </div>
    </nav>
  );
}
