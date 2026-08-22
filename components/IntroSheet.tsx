"use client";

import { useEffect } from "react";
import KindIcon from "./graph/KindIcon";
import postStyles from "./post/PostView.module.css";
import styles from "./IntroSheet.module.css";

const PROJECTS = [
  {
    id: "withy",
    name: "withy",
    desc: "넷플릭스 콘텐츠를 친구와 같이 보는 파티 시청 서비스 — React · TypeScript · WebSocket",
  },
  {
    id: "blog",
    name: "트러블로그",
    desc: "지금 보고 계신 이 블로그 — Next.js · React Flow로 만든 지식 그래프",
  },
];

interface IntroSheetProps {
  onClose: () => void;
  /** 소개 속 프로젝트 클릭 → 그래프의 그 노드로 */
  onProjectClick: (nodeId: string) => void;
}

/** 첫 화면: "민엽" 노드가 열려 있는 상태 — 뒤에 그래프가 비친다 */
export default function IntroSheet({ onClose, onProjectClick }: IntroSheetProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        className={`${postStyles.scrim} ${styles.scrimReset}`}
        onClick={onClose}
        aria-label="지식 그래프 보기"
      />
      <div className={postStyles.sheet} role="dialog" aria-label="소개">
        <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6 L18 18 M18 6 L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <article className={styles.article}>
          <div className={styles.inner}>
            <div className={styles.kicker}>
              <KindIcon kind="me" size={15} />이 그래프의 시작점
            </div>
            <h1 className={styles.title}>
              안녕하세요,
              <br />
              부딪히며 배우는 개발자 이민엽입니다
            </h1>
            <p className={styles.lead}>
              프로젝트를 만들다 부딪힌 트러블을 기록하고, 그 트러블이 어떤 이론과
              닿아 있는지 연결합니다. 이 블로그의 지식 그래프가 그 기록이에요 —
              왼쪽에 제가 만든 프로젝트, 가운데에 부딪힌 순간들, 오른쪽에 그렇게
              배운 개념들이 이어져 있습니다.
            </p>
            <p className={styles.lead}>
              에러 메시지를 지우는 데서 멈추지 않고, &ldquo;왜 그랬는가&rdquo;를
              한 문장의 이론으로 남기는 것을 좋아합니다.
            </p>

            <h2 className={styles.sectionTitle}>
              <KindIcon kind="project" size={15} />
              만든 것들
            </h2>
            <div className={styles.projects}>
              {PROJECTS.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className={styles.projectRow}
                  onClick={() => onProjectClick(project.id)}
                >
                  <KindIcon kind="project" size={16} />
                  <span className={styles.projectText}>
                    <span className={styles.projectName}>{project.name}</span>
                    <span className={styles.projectDesc}>{project.desc}</span>
                  </span>
                  <span className={styles.projectGo}>그래프에서 보기 →</span>
                </button>
              ))}
            </div>

            <p className={styles.hint}>
              바깥을 클릭하면 지식 그래프 전체가 보입니다. 붉은 트러블 노드를
              누르면 그 글이 열려요.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
