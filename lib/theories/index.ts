/**
 * 본문에 나온 낱말 하나를 따로 풀어 두는 자리.
 *
 * 문단 안에서 풀면 읽던 흐름이 끊긴다. 아는 사람은 건너뛰고 모르는 사람만
 * 들르도록 한 단 들여 둔다.
 */
export type TheoryTerm = {
  term: string;
  body: string;
};

/** 개념 시트의 한 블록 — 라벨 하나에 문단 하나, 필요하면 코드 한 조각과 낱말 풀이 */
export type TheoryBlock = {
  label: string;
  body: string;
  code?: string;
  terms?: TheoryTerm[];
};

/**
 * 공식 문서의 절 하나 — 제목은 문서의 번호와 이름을 그대로 쓴다.
 *
 * 문서를 따라 읽는 시트(빠른 시작 등)만 절을 갖는다. 갈래를 소개하는 길잡이
 * 시트는 원래 문서에 절이 없으므로 블록만 늘어놓는다.
 */
export type TheorySection = {
  heading: string;
  blocks: TheoryBlock[];
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
  /** 절이 없는 시트 — 길잡이·총론 */
  blocks?: TheoryBlock[];
  /** 문서를 절 단위로 따라가는 시트 */
  sections?: TheorySection[];
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
