"use client";

import { slugify } from "@/lib/slug";
/* 제목은 목차를 만드는 쪽과 같은 것을 봐야 한다 — 각자 적으면 언젠가 어긋난다 */
import { INTRO_HEADINGS as HEADINGS } from "@/lib/sheet";
import {
  Chip,
  EntryRow,
  Figure,
  Kicker,
  NodeCard,
  SectionHeading,
  TextBlock,
} from "./content";
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

/**
 * 기술 갈래 — id는 그래프의 뿌리 노드와 같다.
 *
 * 프로젝트 행이 프로젝트 노드로 가듯 이 행도 그 갈래의 뿌리로 간다.
 * 배지는 목차의 장 이름이 아니라 그 갈래에서 실제로 붙잡은 주제다 —
 * 프로젝트 행의 기술 배지와 같은 층위로 읽히게.
 */
const TECHS = [
  {
    id: "react",
    name: "React",
    desc: "공식 문서 목차를 그대로 옮겨 두고, 프로젝트에서 부딪힌 자리부터 채웁니다",
    topics: ["렌더링과 커밋", "상태", "훅", "Effect", "Context", "탈출구"],
  },
  {
    id: "js",
    name: "JavaScript",
    desc: "javascript.info를 따라 언어와 브라우저를 같은 지도 위에 둡니다",
    topics: ["프로토타입", "클로저", "이벤트 루프", "DOM", "이벤트", "비동기"],
  },
  {
    id: "ts",
    name: "TypeScript",
    desc: "핸드북과 레퍼런스 — 타입으로 규칙을 화면에 드러내려고 붙잡은 것들",
    topics: ["좁히기", "제네릭", "타입 조작", "유틸리티 타입", "선언 파일", "tsconfig"],
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
  /* 아직 시작 전이라 끝을 비워 둔다 — 이어지는 중이라는 뜻 */
  { text: "메이크스타 FrontEnd Engineer", date: "2026.09 –" },
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

/* 절 이름은 한 곳에서 — 본문과 목차가 갈라져 어긋나지 않게 */
interface IntroSheetProps {
  /** 소개 속 프로젝트 클릭 → 그래프의 그 노드로 */
  onProjectClick: (nodeId: string) => void;
  /** 기술 행 클릭 → 그래프의 그 갈래(react·js·ts)로 */
  onTheoryClick: (rootId: string) => void;
}

/**
 * 소개 시트의 안쪽.
 *
 * 껍데기(트리·목차·조작)는 갖지 않는다 — 주소가 있는 페이지(IntroView)와
 * 노드가 열리는 중의 겹침 화면이 각자 같은 틀로 감싼다.
 */
export default function IntroSheet({
  onProjectClick,
  onTheoryClick,
}: IntroSheetProps) {
  return (
    <article className={styles.article}>
      <div className={styles.inner}>
        <div className={styles.body} id={slugify(HEADINGS.intro)}>
          <Kicker kind="me">{HEADINGS.intro}</Kicker>
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

          {/* 세 뜻을 풀어놓는 대목만 사진과 나란히 선다 — 위의 문단이 셋을
              예고했으니, 그 셋이 사진 옆에 모여 있는 편이 한 덩어리로 읽힌다.
              띄우기(float)가 아니라 한 줄로 묶은 것은 세로 가운데 때문이다.
              띄운 것은 늘 줄 맨 위에 붙어 사진만 위로 쏠린다. */}
          <div className={styles.opening}>
            <div className={styles.photo}>
              <Figure src="/minyeop.jpg" alt="이민엽" width={640} height={823} />
            </div>
            <div className={styles.stances}>
              {STANCES.map((stance) => (
                <TextBlock key={stance.label} label={stance.label} accent="me">
                  {stance.body}
                </TextBlock>
              ))}
            </div>
          </div>

          <p className={styles.lead}>
            대신 화면에 올리기 전까지는 오래 붙잡습니다. 제가 이해하지 못한
            것은 보여줄 수도 없으니까요. 그래서 되는 걸 확인하고 넘어가기보다,
            왜 되는지 알 때까지 묻는 편입니다.
          </p>

          <div className={styles.factsSection} id={slugify(HEADINGS.history)}>
            <div className={styles.factsLabel}>{HEADINGS.history}</div>
            <div className={styles.factsList}>
              {HISTORY.map((item) => (
                <EntryRow key={item.text} date={item.date}>
                  {item.text}
                </EntryRow>
              ))}
            </div>
          </div>

          <div className={styles.factsSection} id={slugify(HEADINGS.awards)}>
            <div className={styles.factsLabel}>{HEADINGS.awards}</div>
            <div className={styles.factsList}>
              {AWARDS.map((item) => (
                <EntryRow key={item.text} date={item.date}>
                  {item.text}
                </EntryRow>
              ))}
            </div>
          </div>

          <div className={styles.factsSection} id={slugify(HEADINGS.stack)}>
            <div className={styles.factsLabel}>{HEADINGS.stack}</div>
            <div className={styles.stack}>
              {STACK.map((skill) => (
                <Chip key={skill} variant="outline">
                  {skill}
                </Chip>
              ))}
            </div>
          </div>

          <SectionHeading icon="project" spaced>
            <span id={slugify(HEADINGS.projects)}>{HEADINGS.projects}</span>
          </SectionHeading>
          <div className={styles.projects}>
            {PROJECTS.map((project) => (
              <NodeCard
                key={project.id}
                kind="project"
                title={project.name}
                role={project.role}
                description={project.desc}
                tags={project.tech}
                onClick={() => onProjectClick(project.id)}
              />
            ))}
          </div>

          <SectionHeading icon="theory" spaced>
            <span id={slugify(HEADINGS.blog)}>{HEADINGS.blog}</span>
          </SectionHeading>
          <div className={styles.projects}>
            {TECHS.map((tech) => (
              <NodeCard
                key={tech.id}
                kind="theory"
                title={tech.name}
                description={tech.desc}
                tags={tech.topics}
                onClick={() => onTheoryClick(tech.id)}
              />
            ))}
          </div>

          <p className={styles.hint}>
            바깥을 클릭하면 지식 그래프 전체가 보입니다. 붉은 트러블 노드를
            누르면 그 글이 열려요.
          </p>
        </div>
      </div>
    </article>
  );
}
