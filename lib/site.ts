/**
 * 블로그 주인의 이름 — 트리의 시작점 줄, 프로젝트 시트의 '만든 사람' 포트, 사이트 이름이 쓴다.
 * 그래프 카드와 소개 페이지 제목은 이름 대신 "Who am I"(graphData의 시작점 라벨)를 쓴다.
 */
export const OWNER_NAME = "민엽";

/** 사이트 이름 — 탭 제목의 꼬리(레이아웃의 title.template)와 상단 바의 글자가 이 하나를 쓴다 */
export const SITE_NAME = `${OWNER_NAME}의 트러블로그`;

/** localStorage에 판(어두운·밝은)을 적어 두는 키 — 첫 칠 스크립트와 토글이 함께 읽는다 */
export const THEME_KEY = "theme";

/** 읽는 글자 크기 단계 — 보통, 크게, 아주 크게. 첫 칠 스크립트와 글자 크기 스위치가 함께 쓴다 */
export const TEXT_SIZES = ["m", "l", "xl"] as const;
export type TextSize = (typeof TEXT_SIZES)[number];
/** localStorage에 읽는 글자 크기를 적어 두는 키 */
export const TEXT_SIZE_KEY = "text-size";
