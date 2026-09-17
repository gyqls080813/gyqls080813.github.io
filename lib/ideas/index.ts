import type { Theory } from "../theories";

/**
 * 생각 시트 — 코드 작성법(일곱 단계 열여덟 항목)·철학의 내용.
 *
 * 모양은 이론 시트와 같다. 이론이 문서를 읽고 정리한 것이라면 이쪽은 화면
 * 하나를 만들 때 내가 무엇을 두고 고민하고 무엇을 근거로 고르는지를 정리한
 * 것이다 — 사실이면 이론, 내 결정이면 이쪽. 시트의 문법(절 → 블록, 낱말
 * 풀이, 코드 조각)은 같아야 읽는 사람이 갈래를 옮겨도 다시 배우지 않는다.
 *
 * 항목 하나는 다섯 절로 쓴다 — 이 단계의 의사결정, 선택지, 선택 기준, 도구,
 * 안티패턴. 그리고 마지막에 내 프로젝트에서 실제로 부딪힌 자리를 붙인다.
 * 앞의 다섯은 어느 프로젝트를 보든 같고, 마지막 하나만 내 것이다.
 *
 * 두 번째 절의 성격은 항목마다 다르다 — 대부분은 하나를 고르는 "선택지"지만,
 * 4상태·동시성·에러는 전부 처리해야 하는 "항목"이고, 성능·관측성은 필요한
 * 것만 골라 쓰는 "수단"이다. 제목을 그에 맞게 달아 둔다.
 */
export type Idea = Theory;

import { entryIdeas } from "./entry";
import { fetchIdeas } from "./fetch";
import { stateIdeas } from "./state";
import { componentIdeas } from "./component";
import { renderIdeas } from "./render";
import { robustIdeas } from "./robust";
import { qualityIdeas } from "./quality";
import { algorithmIdeas } from "./algorithm";

/**
 * 파일은 그래프의 축과 같은 선으로 나눈다 — 데이터가 들어와(진입) 받아오고
 * (수급) 어디에 두고(보관) 짜서(조립) 그리고(표현) 버티고(견고) 마감한다
 * (품질). 18개를 한 파일에 모으면 어느 축을 고치는지가 흐려진다.
 *
 * 알고리즘은 그 일곱 축 밖이다 — 작성법이 화면 하나를 만드는 순서라면 이쪽은
 * 문제를 푸는 기법이라, 같은 시트 문법을 쓰되 갈래를 따로 세운다.
 */
export const ideas: Idea[] = [
  ...entryIdeas,
  ...fetchIdeas,
  ...stateIdeas,
  ...componentIdeas,
  ...renderIdeas,
  ...robustIdeas,
  ...qualityIdeas,
  ...algorithmIdeas,
];

export function getIdea(id: string): Idea | undefined {
  return ideas.find((idea) => idea.id === id);
}
