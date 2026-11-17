/* 본문과 목차가 함께 보는 고정 제목 — 본문 모듈 없이 불러올 수 있게 따로 둔다 */
import type { NodeKind } from "@/components/graph/types";

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
  projects: "프로젝트",
  blog: "기술 블로그",
} as const;

/**
 * 시트 제목 위의 머리표 — 시트 본문과, 노드가 열리는 동안의 겹침 화면(ExpandShell)이
 * 같은 글자를 쓴다. 글은 머리표 대신 날짜 줄을, 소개는 INTRO_HEADINGS.intro를 쓴다.
 */
export const SHEET_KICKER = {
  project: "프로젝트",
  theory: "이론",
  idea: "생각",
  til: "TIL",
  dict: "사전",
} as const;

/** 이론, 생각, TIL, 사전 시트의 머리 — 머리표, 제목, (TIL의 날짜), 한 줄 소개 */
export type SheetHead = {
  /** 갈래 색 — 머리표와 시트 안 라벨·절 아이콘이 이 색을 쓴다 */
  kind: NodeKind;
  kicker: string;
  title: string;
  /** 제목 바로 아래 한 줄 (TIL의 날짜) */
  date?: string;
  tagline: string;
};

type Named = { name: string; tagline: string };

/**
 * 본문 → 머리. 시트 본문(TheoryArticle 등)과, 노드가 열리는 동안의 겹침 화면이 읽는
 * 노드별 요약(lib/sheet의 sheetHead)이 이 함수를 같이 쓴다. 갈래 색도 여기서 한 번만
 * 정한다 — 사전은 생각 갈래라 생각의 색이다.
 */
export const SHEET_HEAD = {
  theory: (sheet: Named): SheetHead => ({
    kind: "theory",
    kicker: SHEET_KICKER.theory,
    title: sheet.name,
    tagline: sheet.tagline,
  }),
  idea: (sheet: Named): SheetHead => ({
    kind: "idea",
    kicker: SHEET_KICKER.idea,
    title: sheet.name,
    tagline: sheet.tagline,
  }),
  til: (til: { title: string; date: string; tagline: string }): SheetHead => ({
    kind: "til",
    kicker: SHEET_KICKER.til,
    title: til.title,
    date: til.date,
    tagline: til.tagline,
  }),
  dict: (dictionary: Named): SheetHead => ({
    kind: "idea",
    kicker: SHEET_KICKER.dict,
    title: dictionary.name,
    tagline: dictionary.tagline,
  }),
};
