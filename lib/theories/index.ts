/** 개념 시트의 한 블록 — 라벨 하나에 문단 하나, 필요하면 코드 한 조각 */
export type TheoryBlock = {
  label: string;
  body: string;
  code?: string;
};

/** 참고한 곳 — 문서를 읽고 쓴 것이니 출처를 남긴다 */
export type TheorySource = {
  label: string;
  href: string;
};

export type Theory = {
  /** 그래프의 이론 노드 id와 동일 */
  id: string;
  name: string;
  tagline: string;
  /** 이 개념이 답하는 질문 — 화면을 보여주기 전에 */
  intro: string;
  blocks: TheoryBlock[];
  sources?: TheorySource[];
};

import { reactTheories } from "./react";
import { javascriptTheories } from "./javascript";
import { typescriptTheories } from "./typescript";

/**
 * 갈래마다 파일을 나눈다 — 그래프가 React·JS·TS로 갈라져 있는 것과 같은 선이다.
 * 목차를 통째로 옮겨 둔 터라 한 파일에 모으면 어느 갈래를 고치는지가 흐려진다.
 */
export const theories: Theory[] = [
  ...reactTheories,
  ...javascriptTheories,
  ...typescriptTheories,
];

export function getTheory(id: string): Theory | undefined {
  return theories.find((theory) => theory.id === id);
}
