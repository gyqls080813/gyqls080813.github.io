"use client";

import { useEffect } from "react";
import KindIcon from "./graph/KindIcon";
import postStyles from "./post/PostView.module.css";
import styles from "./IntroSheet.module.css";

type Project = {
  id: string;
  name: string;
  desc: string;
  /** 프론트엔드 리더를 맡은 프로젝트에만 붙는다 */
  role?: string;
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    id: "withy",
    name: "WITHY",
    desc: "멀리 있는 지인과 넷플릭스를 같이 보는 워치파티 크롬 익스텐션",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "WXT",
      "Shadow DOM",
      "WebSocket",
    ],
  },
  {
    id: "petfolio",
    name: "Petfolio",
    desc: "반려동물 지출을 여러 보호자가 함께 기록하는 공동 가계부",
    role: "FE Leader",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Effect-TS",
      "MSW",
    ],
  },
  {
    id: "tickle",
    name: "Tickle",
    desc: "AI가 매크로를 걸러내는 공정한 티켓 예매 플랫폼",
    role: "FE Leader",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Effect-TS",
      "Canvas",
      "Storybook",
      "Playwright",
    ],
  },
];

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Zustand",
  "TanStack Query",
  "Effect-TS",
  "Tailwind CSS",
  "Storybook",
  "Playwright",
];

/** '비추다'의 세 뜻 — 헤드라인의 따옴표를 회수하는 자리 */
const STANCES = [
  {
    label: "어두운 데를 밝히는 것",
    body: "잘 돌아가는 것처럼 보이는 화면이 가장 위험하다고 생각합니다. 무엇이 어디서 멈췄는지 사용자가 묻기 전에 화면이 먼저 말해야 합니다. 실패를 숨기지 않는 것이 화면의 첫 번째 책임이라고 봅니다.",
  },
  {
    label: "거울처럼 그대로 보여주는 것",
    body: "규칙은 문서가 아니라 화면 안에 있어야 한다고 생각합니다. 읽어야 아는 것은 결국 읽히지 않습니다. 형태와 색이 규칙을 대신 말해주면, 그때부터는 설명이 필요 없어지고 잘못 쓰는 일도 줄어듭니다.",
  },
  {
    label: "서로 견주어 보는 것",
    body: "답을 내려주기보다 판단할 재료를 놓아두려 합니다. 무엇과 무엇이 이어져 있는지 눈에 보이면, 상대는 제 결론을 따라오는 대신 스스로 판단합니다. 제가 생각하는 소통은 설득이 아니라 이쪽입니다.",
  },
];

const HISTORY = [
  { text: "삼성청년 SW·AI 아카데미 14기", date: "2025.07 – 2026.07" },
  { text: "연세대학교 환경에너지공학부 석사", date: "2023.03 – 2025.02" },
  { text: "연세대학교 미래캠퍼스 친환경에너지공학부 학사", date: "2018.03 – 2023.02" },
];

const AWARDS = [
  { text: "삼성청년 SW·AI 아카데미 자율 프로젝트 우수상", date: "2026.05" },
  { text: "삼성청년 SW·AI 아카데미 공통 프로젝트 최우수상", date: "2026.02" },
  { text: "연세대 환경에너지공학과 대학원 추계 학술제 발표 우수상", date: "2024.11" },
  { text: "제11회 기초과학연구소 학술제 포스터 발표 최우수상", date: "2023.12" },
  { text: "연세대 환경에너지공학과 추계 학술제 우수포스터발표상", date: "2023.11" },
  { text: "연세대학교 환경공학부 성적우수상", date: "2022.02" },
];

interface IntroSheetProps {
  onClose: () => void;
  /** 소개 속 프로젝트 클릭 → 그래프의 그 노드로 */
  onProjectClick: (nodeId: string) => void;
  /** "기술 블로그로 가기" → 그래프의 기술(이론) 영역으로 */
  onTheoryClick: () => void;
  /** 노드가 열리는 중 — 시트 껍데기 없이 안쪽만 그린다 */
  bare?: boolean;
}

/** 첫 화면: "민엽" 노드가 열려 있는 상태 — 뒤에 그래프가 비친다 */
export default function IntroSheet({
  onClose,
  onProjectClick,
  onTheoryClick,
  bare,
}: IntroSheetProps) {
  useEffect(() => {
    if (bare) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, bare]);

  const content = (
    <article className={styles.article}>
      <div className={styles.inner}>
        <aside className={styles.photoCol}>
          <img
            className={styles.photo}
            src="/minyeop.jpg"
            alt="이민엽"
            width={640}
            height={823}
          />
        </aside>

        <div className={styles.body}>
          <div className={styles.kicker}>
            <KindIcon kind="me" size={15} />자기소개
          </div>
          <h1 className={styles.title}>
            &lsquo;비추는&rsquo; 소통을 지향하는
            <br />
            프론트엔드 개발자 이민엽입니다
          </h1>
          <p className={styles.lead}>
            비추다에는 세 가지 뜻이 있습니다. 어두운 데를 밝히는 것, 거울처럼
            그대로 보여주는 것, 서로 견주어 보는 것. 제가 화면으로 하고 싶은
            일이 이 셋입니다.
          </p>

          <div className={styles.stances}>
            {STANCES.map((stance) => (
              <div key={stance.label} className={styles.stance}>
                <div className={styles.stanceLabel}>{stance.label}</div>
                <p className={styles.stanceBody}>{stance.body}</p>
              </div>
            ))}
          </div>

          <p className={styles.lead}>
            대신 화면에 올리기 전까지는 오래 붙잡습니다. 제가 이해하지 못한
            것은 보여줄 수도 없으니까요. 그래서 되는 걸 확인하고 넘어가기보다,
            왜 되는지 알 때까지 묻는 편입니다.
          </p>

          <div className={styles.factsSection}>
            <div className={styles.factsLabel}>이력</div>
            <div className={styles.factsList}>
              {HISTORY.map((item) => (
                <div key={item.text} className={styles.factRow}>
                  <span className={styles.factBullet} />
                  <span className={styles.factText}>{item.text}</span>
                  <span className={styles.factDate}>{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.factsSection}>
            <div className={styles.factsLabel}>수상</div>
            <div className={styles.factsList}>
              {AWARDS.map((item) => (
                <div key={item.text} className={styles.factRow}>
                  <span className={styles.factBullet} />
                  <span className={styles.factText}>{item.text}</span>
                  <span className={styles.factDate}>{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.factsSection}>
            <div className={styles.factsLabel}>사용 기술</div>
            <div className={styles.stack}>
              {STACK.map((skill) => (
                <span key={skill} className={styles.stackChip}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <h2 className={styles.sectionTitle}>
            <KindIcon kind="project" size={15} />
            Projects
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
                  <span className={styles.projectHead}>
                    <span className={styles.projectName}>{project.name}</span>
                    {project.role && (
                      <span className={styles.roleTag}>{project.role}</span>
                    )}
                  </span>
                  <span className={styles.projectDesc}>{project.desc}</span>
                  <span className={styles.projectTech}>
                    {project.tech.map((item) => (
                      <span key={item} className={styles.techBadge}>
                        {item}
                      </span>
                    ))}
                  </span>
                </span>
                <span className={styles.port} aria-hidden />
              </button>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>
            <KindIcon kind="theory" size={15} />
            기술 블로그
          </h2>
          <button
            type="button"
            className={`${styles.projectRow} ${styles.theoryRow}`}
            onClick={onTheoryClick}
          >
            <KindIcon kind="theory" size={16} />
            <span className={styles.projectText}>
              <span className={styles.projectName}>기술 블로그로 가기</span>
              <span className={styles.projectDesc}>
                프로젝트에서 부딪히며 배운 개념들
              </span>
            </span>
            <span className={styles.port} aria-hidden />
          </button>

          <p className={styles.hint}>
            바깥을 클릭하면 지식 그래프 전체가 보입니다. 붉은 트러블 노드를
            누르면 그 글이 열려요.
          </p>
        </div>
      </div>
    </article>
  );

  if (bare) return content;

  return (
    <>
      <button
        type="button"
        className={`${postStyles.scrim} ${styles.scrimReset}`}
        onClick={onClose}
        aria-label="지식 그래프 보기"
      />
      <div className={postStyles.sheet} role="dialog" aria-label="소개">
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="닫기"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6 L18 18 M18 6 L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {content}
      </div>
    </>
  );
}
