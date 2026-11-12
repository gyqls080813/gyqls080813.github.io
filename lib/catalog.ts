/**
 * 본문 없는 요약 목록 — 그래프의 노드·간선·틀, 소개 카드, 트리가 여기서 나온다.
 *
 * 같은 사실을 여러 곳에 적으면 언젠가 어긋난다. 프로젝트 소개 문구와 기술 목록이
 * 소개 카드·그래프·프로젝트 시트에 각자 적혀 있다가 실제로 갈라졌던 것이 그 예다.
 * 그래서 이름·날짜·소속·연결 같은 뼈대는 여기 한 곳에만 적고, 본문 모듈(projects·
 * posts·dictionary·tils)은 id로 이 목록에 본문을 붙인다.
 *
 * 이 파일은 본문을 갖지 않는다. 껍데기(그래프·트리)는 모든 페이지에 실리므로,
 * 여기 본문이 들어오면 모든 페이지가 본문 전체를 JS로 받게 된다.
 */

// ── 프로젝트 ──────────────────────────────────────────────

export type ProjectSummary = {
  /** 그래프의 프로젝트 노드 id와 동일 */
  id: string;
  name: string;
  tagline: string;
  /** "2026.01.12 – 2026.02.09, 5주" — 그래프 카드의 월 단위 기간도 여기서 뽑는다 */
  period: string;
  team: string;
  /** 그 팀에서 내가 맡은 자리 — " — " 앞이 직함이다 */
  role: string;
  /** 받은 상이 있으면 */
  award?: string;
  /** 코드가 있는 곳 — 소스는 이 블로그에 복사해 두지 않고 저장소로 보낸다 */
  repo?: string;
  stack: string[];
};

/** 진행 순서대로 — 그래프의 프로젝트 줄과 소개 카드가 이 순서를 따른다 */
export const projectSummaries: ProjectSummary[] = [
  {
    id: "withy",
    name: "WITHY",
    tagline: "멀리 있는 지인과 같은 순간을 보는 AI 워치파티 플랫폼",
    period: "2026.01.12 – 2026.02.09, 5주",
    team: "6인, 프론트엔드 3인",
    role: "프론트엔드 — 익스텐션 전반",
    award: "SSAFY 공통 프로젝트 최우수상",
    repo: "https://github.com/gyqls080813/WITHY",
    stack: [
      "WXT",
      "React",
      "TypeScript",
      "Chrome Extension API",
      "Shadow DOM",
      "postMessage",
      "STOMP / SockJS",
      "TanStack Query",
      "Next.js",
      "Zustand",
      "Tailwind CSS",
    ],
  },
  {
    id: "petfolio",
    name: "Petfolio",
    tagline: "여러 보호자의 결제 내역에서 반려동물 지출만 찾아내는 AI 공동 가계부",
    period: "2026.02.19 – 2026.03.30, 6주",
    team: "6인, 프론트엔드 2인",
    role: "프론트엔드 리더 — API 계층과 에러 처리",
    repo: "https://github.com/gyqls080813/Petfolio",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Effect-TS",
      "@effect/schema",
      "TanStack Query",
      "SSE",
      "MSW",
      "Tailwind CSS",
    ],
  },
  {
    id: "tickle",
    name: "Tickle",
    tagline: "AI가 매크로를 걸러내는 공정한 티켓 예매 플랫폼",
    period: "2026.04.14 – 2026.05.22, 6주",
    team: "6인, 프론트엔드 2인",
    role: "프론트엔드 리더 — 예매 흐름과 봇 탐지",
    award: "SSAFY 자율 프로젝트 우수상",
    repo: "https://github.com/gyqls080813/Tickle",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Canvas",
      "Zustand",
      "TanStack Query",
      "Effect-TS",
      "SSE",
      "Storybook",
      "Playwright / Vitest",
      "MSW",
    ],
  },
];

/** "2026.01.12 – 2026.02.09, 5주" → "2026.01 – 2026.02" (그래프 카드의 날짜 줄) */
export function monthSpan(period: string): string {
  const months = period.match(/\d{4}\.\d{2}/g) ?? [];
  return months.slice(0, 2).join(" – ");
}

/** "프론트엔드 리더 — API 계층과 에러 처리" → "프론트엔드 리더" (소개 카드의 직함) */
export function roleTitle(role: string): string {
  return role.split(" — ")[0];
}

// ── 트러블 글 ─────────────────────────────────────────────

export type TheoryRole = "원인 개념" | "해결 기법" | "관련 개념";

export type PostSummary = {
  /** 그래프의 트러블 노드 id와 동일 */
  id: string;
  title: string;
  date: string;
  readMinutes: number;
  /** 발생한 프로젝트 — 프로젝트 → 트러블 간선과 트러블 틀이 여기서 나온다 */
  project: string;
  /** 다리를 놓은 개념 — 기술 → 트러블 간선이 여기서 나온다 */
  theories: { id: string; role: TheoryRole }[];
};

export const postSummaries: PostSummary[] = [
  {
    id: "t-isolated",
    title: "video.currentTime은 됐는데, 넷플릭스는 그 사실을 몰랐다",
    date: "2026.02.05",
    readMinutes: 9,
    project: "withy",
    theories: [{ id: "js-frames", role: "원인 개념" }],
  },
  {
    id: "t-focus",
    title: "넷플릭스가 유휴 상태가 되면 채팅 커서가 사라졌다",
    date: "2026.02.06",
    readMinutes: 7,
    project: "withy",
    theories: [
      { id: "js-events", role: "원인 개념" },
      { id: "js-ui-events", role: "관련 개념" },
    ],
  },
  {
    id: "t-sync",
    title: "완벽히 맞추려던 동기화가 오히려 영상을 끊고 있었다",
    date: "2026.02.08",
    readMinutes: 7,
    project: "withy",
    theories: [
      { id: "js-network", role: "해결 기법" },
      { id: "rl-escape", role: "관련 개념" },
    ],
  },
  {
    id: "t-schema",
    title: "백엔드 스키마가 바뀌면 전원이 같은 흰 화면을 봤다",
    date: "2026.03.24",
    readMinutes: 6,
    project: "petfolio",
    theories: [
      { id: "ts-hb-everyday", role: "원인 개념" },
      { id: "ts-hb-narrowing", role: "해결 기법" },
    ],
  },
  {
    id: "t-tagged",
    title: "에러 타입이 unknown인 채로는, 놓친 분기가 크래시가 된다",
    date: "2026.03.28",
    readMinutes: 6,
    project: "petfolio",
    theories: [
      { id: "ts-hb-narrowing", role: "해결 기법" },
      { id: "ts-tm-creating", role: "관련 개념" },
    ],
  },
  {
    id: "t-canvas",
    title: "DOM으로 그린 좌석은 셀렉터 한 줄에 뚫렸다",
    date: "2026.05.10",
    readMinutes: 7,
    project: "tickle",
    theories: [{ id: "js-document", role: "관련 개념" }],
  },
  {
    id: "t-webdriver",
    title: "봇 방어가 서버 AI 한 곳뿐이라는 게 문제였다",
    date: "2026.05.15",
    readMinutes: 5,
    project: "tickle",
    theories: [{ id: "js-document", role: "관련 개념" }],
  },
  {
    id: "t-buffer",
    title: "행동 데이터를 수집하자 좌석 화면이 버벅였다",
    date: "2026.05.22",
    readMinutes: 9,
    project: "tickle",
    theories: [
      { id: "js-ui-misc", role: "원인 개념" },
      { id: "rl-interact", role: "원인 개념" },
      { id: "rl-escape", role: "해결 기법" },
    ],
  },
];

// ── 사전의 절 ─────────────────────────────────────────────

/**
 * 사전의 절 = 낱말이 나온 문서. from은 그 문서의 그래프 노드다 —
 * 그래프는 여기서 문서 → 사전 간선을 만들고, 사전 시트는 여기에 낱말을 붙인다.
 */
export const dictionarySections: { from: string; heading: string }[] = [
  { from: "vg-start-intro", heading: "Vue 소개 — Vue란 무엇인가요?" },
  { from: "i18n", heading: "i18n — 문장을 코드에서 떼어 내는 열네 단계" },
  { from: "render", heading: "브라우저 렌더링 — 주소가 픽셀이 되기까지" },
  { from: "js", heading: "JavaScript — javascript.info를 따라 읽은 스물일곱 챕터" },
  { from: "react", heading: "React — react.dev의 배우기와 참고서를 따라 읽은 서른여섯 장" },
  { from: "vue", heading: "Vue — vuejs.org의 가이드와 참고서를 따라 읽은 백여섯 장" },
  {
    from: "ts",
    heading: "TypeScript — typescriptlang.org의 핸드북과 참고서를 따라 읽은 아흔여덟 장",
  },
  { from: "git", heading: "Git — Pro Git과 GitHub 문서로 세운 일곱 단계의 낱말" },
  { from: "css", heading: "CSS — MDN의 스타일링 기초와 레이아웃 모듈로 세운 열네 장의 낱말" },
  { from: "bundle", heading: "번들링 · Vite — vite.dev 가이드로 세운 열두 장의 낱말" },
  { from: "nn", heading: "Next.js · Nuxt — 같은 질문 열넷에 두 답을 놓은 낱말" },
];

// ── TIL ───────────────────────────────────────────────────

/**
 * TIL에 쌓이는 하루치 기록 — 최근 것이 맨 위(내림차순)로 온다.
 *
 * 여기 한 줄을 더하면 노드·간선·틀 멤버가 전부 따라온다. 이름은 그날의 주제다.
 * 날짜를 이름으로 세우면 목록이 숫자만 남아 무엇을 적었는지가 안 보인다 —
 * 날짜는 id와 글 안에서 밝힌다. id를 날짜로 짓는 것은 주제가 바뀌어도 그날은
 * 안 바뀌기 때문이다.
 */
export const tilEntries: { id: string; title: string; date: string }[] = [
  { id: "til-2026-09-15", title: "모달의 바깥", date: "2026.09.15" },
  { id: "til-2026-09-02", title: "limbo 상태", date: "2026.09.02" },
];

// ── 기술 갈래 ─────────────────────────────────────────────

/**
 * 기술 갈래의 뿌리 — 민엽 → 뿌리 간선, 갈래마다의 틀, 소개의 기술 블로그 카드가
 * 이 하나에서 나온다. root는 그 갈래의 허브 노드 id다.
 *
 * desc와 topics는 소개 카드에 쓴다. topics는 목차의 장 이름이 아니라 그 갈래에서
 * 실제로 붙잡은 주제다 — 프로젝트 카드의 기술 배지와 같은 층위로 읽히게.
 */
export const techBranches: { root: string; label: string; desc: string; topics: string[] }[] = [
  {
    root: "react",
    label: "React",
    desc: "공식 문서 목차를 그대로 옮겨 두고, 프로젝트에서 부딪힌 자리부터 채웁니다",
    topics: ["렌더링과 커밋", "상태", "훅", "Effect", "Context", "탈출구"],
  },
  {
    root: "js",
    label: "JavaScript",
    desc: "javascript.info를 따라 언어와 브라우저를 같은 지도 위에 둡니다",
    topics: ["프로토타입", "클로저", "이벤트 루프", "DOM", "이벤트", "비동기"],
  },
  {
    root: "ts",
    label: "TypeScript",
    desc: "핸드북과 레퍼런스 — 타입으로 규칙을 화면에 드러내려고 붙잡은 것들",
    topics: ["좁히기", "제네릭", "타입 조작", "유틸리티 타입", "선언 파일", "tsconfig"],
  },
  {
    root: "vue",
    label: "Vue",
    desc: "가이드와 API 참고서 목차를 옮겨 두고, 반응성이 React와 갈리는 자리부터 봅니다",
    topics: ["반응성", "템플릿 문법", "v-model", "슬롯", "컴포저블", "Provide / inject"],
  },
  {
    root: "git",
    label: "Git",
    desc: "명령어보다 모델 먼저 — 커밋과 이름표로 브랜치·원격·복구를 한 그림에 둡니다",
    topics: ["스테이징", "브랜치", "HEAD", "reflog", "fetch / pull", "충돌"],
  },
  {
    root: "i18n",
    label: "i18n",
    desc: "문장을 코드에서 떼어 내는 방법을 언어별 빌드부터 MessageFormat 2까지 열네 단계로 다시 밟습니다",
    topics: ["이름표 열쇠", "메시지 문법", "Intl", "협상과 폴백", "지연 로딩", "SSR"],
  },
  {
    root: "render",
    label: "브라우저 렌더링",
    desc: "주소 하나가 픽셀이 되기까지를 열두 장으로 나눠, 데모 페이지에서 직접 잽니다",
    topics: ["파싱", "스크립트 차단", "CSSOM", "레이아웃", "페인트와 합성", "하이드레이션"],
  },
  {
    root: "css",
    label: "CSS",
    desc: "MDN 학습 순서를 따라 선언이 이기는 규칙부터 컨테이너 쿼리까지 브라우저에서 재 봅니다",
    topics: ["캐스케이드", "박스 모델", "플렉스박스", "그리드", "쌓임 맥락", "컨테이너 쿼리"],
  },
  {
    root: "bundle",
    label: "번들링 · Vite",
    desc: "vite.dev 가이드 순서대로, 개발 서버와 프로덕션 빌드가 무엇을 다르게 하는지 봅니다",
    topics: ["사전 번들링", "개발 서버", "HMR", "트리 셰이킹", "환경 변수", "플러그인"],
  },
  {
    root: "nn",
    label: "Next.js · Nuxt",
    desc: "두 메타 프레임워크에 같은 질문 열넷을 던져, 렌더링·데이터·캐시가 어디서 갈리는지 봅니다",
    topics: ["라우팅", "렌더링 모드", "서버와 클라이언트", "캐시와 재검증", "미들웨어", "배포"],
  },
];
