"use client";

import { useState } from "react";
import Link from "next/link";
import KindIcon from "../graph/KindIcon";
import { fullGraphBackdrops, fullGraphNodes } from "@/lib/graphData";
import { posts } from "@/lib/posts";
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

/** 글 페이지 좌측의 노드 탐색기 — VS Code 탐색기 문법 */
export default function NodeTree({ activePostId }: { activePostId: string }) {
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(new Set());

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const projects = fullGraphNodes.filter((node) => node.kind === "project");
  const theoryGroups = fullGraphBackdrops.filter(
    (backdrop) => backdrop.tint === "theory",
  );

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
                      href={`/posts/${post.id}`}
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
        {theoryGroups.map((group) => {
          const open = !collapsed.has(group.id);
          return (
            <div key={group.id}>
              <button
                type="button"
                className={styles.row}
                onClick={() => toggle(group.id)}
                aria-expanded={open}
              >
                <Chevron open={open} />
                <KindIcon kind="theory" size={13} />
                <span className={`${styles.rowLabel} ${styles.groupLabel}`}>
                  {group.label}
                </span>
                <span className={styles.count}>{group.members.length}</span>
              </button>
              {open && (
                <div className={styles.children}>
                  {group.members.map((memberId) => {
                    const references = posts.filter((post) =>
                      post.theories.some((theory) => theory.id === memberId),
                    ).length;
                    return (
                      <div key={memberId} className={styles.row}>
                        <span className={`${styles.dot} ${styles.dotTheory}`} />
                        <span className={styles.rowLabel}>{nodeLabel(memberId)}</span>
                        {references > 0 && (
                          <span className={styles.count}>글 {references}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
