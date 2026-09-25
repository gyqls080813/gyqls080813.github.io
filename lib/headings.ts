/* 본문과 목차가 함께 보는 고정 제목 — 본문 모듈 없이 불러올 수 있게 따로 둔다 */

/** 본문과 목차가 같은 제목을 봐야 한다 — 각자 적으면 언젠가 어긋난다 */
export const PROJECT_HEADINGS = {
  intro: "소개",
  views: "프로젝트 뷰",
  troubles: "트러블 슈팅",
} as const;

export const INTRO_HEADINGS = {
  intro: "자기소개",
  history: "이력",
  awards: "수상",
  stack: "사용 기술",
  projects: "Projects",
  blog: "기술 블로그",
} as const;
