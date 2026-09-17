import type {
  GraphBackdropData,
  GraphEdgeData,
  GraphNodeData,
} from "@/components/graph/types";
import { dictionary } from "./dictionary";

/**
 * TIL에 쌓이는 하루치 기록 — 최근 것이 맨 위(내림차순)로 온다.
 *
 * 여기 한 줄을 더하면 노드·간선·틀 멤버가 전부 따라온다. 프로젝트가
 * projectTroubles 하나에서 트러블 전부를 얻는 것과 같은 자리다.
 *
 * 이름은 그날의 주제다. 날짜를 이름으로 세우면 목록이 숫자만 남아 무엇을
 * 적었는지가 안 보인다 — 날짜는 id와 글 안에서 밝힌다. id를 날짜로 짓는
 * 것은 주제가 바뀌어도 그날은 안 바뀌기 때문이다.
 */
export const tilEntries = [
  { id: "til-2026-09-15", title: "모달의 바깥", date: "2026.09.15" },
  { id: "til-2026-09-02", title: "limbo 상태", date: "2026.09.02" },
] as const;

/**
 * 전체 그래프(랜딩) 데이터. 좌표는 카드 중심 기준 (toFlow에서 SPREAD 배율 적용).
 * 흐름: 민엽 → (프로젝트 · 기술) → 트러블슈팅.
 * 계층(개념 → 챕터)은 간선이, 시각적 묶음은 백드랍(디자인 전용)이 맡는다.
 */
export const fullGraphNodes: GraphNodeData[] = [
  // 1열: 그래프의 시작점 — 나
  { id: "me", label: "Who am I", kind: "me", x: 95, y: 300, r: 30, hub: true },

  // 2열 상단: 프로젝트 (가로 배치, 진행 순서대로)
  {
    id: "withy",
    label: "WITHY",
    kind: "project",
    x: 330,
    y: 140,
    r: 44,
    hub: true,
    dateLabel: "2026.01 – 2026.02",
  },
  {
    id: "petfolio",
    label: "Petfolio",
    kind: "project",
    x: 545,
    y: 140,
    r: 44,
    hub: true,
    dateLabel: "2026.02 – 2026.03",
  },
  {
    id: "tickle",
    label: "Tickle",
    kind: "project",
    x: 760,
    y: 140,
    r: 44,
    hub: true,
    dateLabel: "2026.04 – 2026.05",
  },

  /* 2열 맨 아래: 생각 — 만든 것(프로젝트)·배운 것(이론)과 나란한 세 번째 갈래.
     넣을 때의 기준은 하나다 — 사실이면 이론, 내 결정이면 이쪽.
     이론은 공부하는 만큼 끝없이 늘어나는 쪽이고, 이쪽은 그 서가의 색인이 된다.

     y가 2400부터인 것은 열 안의 순서 때문이다 — 이 열은 프로젝트·이론·생각
     순으로 서고, 순서는 y가 정한다. 이론의 맨 아래(2260)보다 커야 한다. */
  {
    id: "fe-craft",
    label: "코드 작성법",
    kind: "idea",
    x: 330,
    y: 2402,
    r: 17,
    hub: true,
  },
  { id: "fe-philosophy", label: "철학", kind: "idea", x: 330, y: 2454, r: 17, hub: true },
  /* 사전 — 문서를 읽다 걸린 낱말을 내 말로 다시 적는 곳. 뜻풀이는 사실에 가깝지만
     어느 낱말에 걸렸고 어떤 말로 바꿀지는 내 결정이라 이쪽에 둔다.
     낱말은 노드가 아니라 시트 안의 항목이다 — 낱말마다 노드를 세우면 그래프가
     색인이 되어 버린다. 항목은 lib/dictionary.ts에 쌓이고, 낱말이 나온 문서에서
     이 노드로 선이 들어온다(아래 간선). */
  { id: "dict", label: "사전", kind: "idea", x: 330, y: 2455, r: 17, hub: true },
  /* 하루하루의 기록 — 작성법·철학과 성격이 다르다. 저 둘은 정리해서 쌓는 곳이고
     이쪽은 그날 있었던 일을 그날 적는 곳이다. 그래서 항목은 미리 만들어 두지
     않는다. 이름은 그날의 주제고, 쌓이는 순서가 곧 목차다.

     항목이 붙을 때는 y를 til보다 크게, 새것일수록 작게 준다 — 열 안의 순서는
     y가 정하므로 그래야 최근 것이 맨 위에 선다. */
  { id: "til", label: "TIL", kind: "idea", x: 330, y: 2456, r: 17, hub: true },
  ...tilEntries.map(
    (entry, index): GraphNodeData => ({
      id: entry.id,
      label: entry.title,
      kind: "til",
      x: 330,
      y: 2458 + index * 2,
      r: 12,
    }),
  ),

  /* 화면 하나를 만들 때 정하는 것들 — 데이터가 들어와서 나가기까지의 순서 그대로
     일곱 단계로 놓았다. 순서대로 훑으면 빠진 단계가 없다는 게 구조로 보장된다. */
  { id: "craft-entry", label: "진입 / 라우팅", kind: "idea", x: 330, y: 2404, r: 15, hub: true },
  { id: "craft-url", label: "URL 설계", kind: "idea", x: 330, y: 2406, r: 12 },

  { id: "craft-fetch", label: "데이터 수급", kind: "idea", x: 330, y: 2408, r: 15, hub: true },
  { id: "craft-request", label: "요청 방식", kind: "idea", x: 330, y: 2410, r: 12 },
  { id: "craft-4state", label: "네 가지 상태", kind: "idea", x: 330, y: 2412, r: 12 },
  { id: "craft-cache", label: "캐싱 / 재검증", kind: "idea", x: 330, y: 2414, r: 12 },

  { id: "craft-state", label: "상태 관리", kind: "idea", x: 330, y: 2416, r: 15, hub: true },
  { id: "craft-colocation", label: "상태 위치", kind: "idea", x: 330, y: 2418, r: 12 },
  { id: "craft-flow", label: "데이터 흐름", kind: "idea", x: 330, y: 2420, r: 12 },

  { id: "craft-component", label: "컴포넌트 설계", kind: "idea", x: 330, y: 2422, r: 15, hub: true },
  { id: "craft-composition", label: "합성 / 범용성", kind: "idea", x: 330, y: 2424, r: 12 },
  { id: "craft-contract", label: "타입 계약", kind: "idea", x: 330, y: 2426, r: 12 },
  { id: "craft-hooks", label: "훅 설계", kind: "idea", x: 330, y: 2428, r: 12 },

  { id: "craft-render", label: "렌더링 / 실행", kind: "idea", x: 330, y: 2430, r: 15, hub: true },
  { id: "craft-strategy", label: "렌더 전략", kind: "idea", x: 330, y: 2432, r: 12 },
  { id: "craft-rerender", label: "리렌더 / 메모이제이션", kind: "idea", x: 330, y: 2434, r: 12 },
  { id: "craft-timing", label: "실행 타이밍", kind: "idea", x: 330, y: 2436, r: 12 },

  { id: "craft-robust", label: "견고성", kind: "idea", x: 330, y: 2438, r: 15, hub: true },
  { id: "craft-concurrency", label: "동시성", kind: "idea", x: 330, y: 2440, r: 12 },
  { id: "craft-error", label: "에러 / 엣지 케이스", kind: "idea", x: 330, y: 2442, r: 12 },
  { id: "craft-trust", label: "신뢰 경계", kind: "idea", x: 330, y: 2444, r: 12 },

  { id: "craft-quality", label: "품질 / 사용자", kind: "idea", x: 330, y: 2446, r: 15, hub: true },
  { id: "craft-perf", label: "성능 / 번들", kind: "idea", x: 330, y: 2448, r: 12 },
  { id: "craft-a11y", label: "접근성", kind: "idea", x: 330, y: 2450, r: 12 },
  { id: "craft-observe", label: "관측성 / 테스트", kind: "idea", x: 330, y: 2452, r: 12 },

  // 2열 하단: 기술 — 개념(허브) 노드와 그 하위 챕터 노드.
  // 계층은 백드랍이 아니라 허브 → 챕터 간선이 표현한다
  { id: "react", label: "React", kind: "theory", x: 330, y: 300, r: 20, hub: true },

  /* react.dev 목차를 그대로 옮긴 것 — llms.txt의 ## / ### / #### 세 층과 1:1.
     라벨은 ko.react.dev를 따르되, 갈래가 달라도 이름이 같아지는 것(훅·컴포넌트·API·
     지시어·설정)만 어느 쪽인지 앞에 붙였다. 내용은 하나씩 채운다. */
  { id: "rl", label: "Learn React", kind: "theory", x: 330, y: 730, r: 18, hub: true },
  { id: "rl-start", label: "시작하기", kind: "theory", x: 330, y: 790, r: 15, hub: true },
  { id: "rl-start-quick", label: "빠른 시작", kind: "theory", x: 330, y: 835, r: 12 },
  { id: "rl-start-install", label: "설치", kind: "theory", x: 330, y: 875, r: 12 },
  { id: "rl-start-setup", label: "설정", kind: "theory", x: 330, y: 915, r: 12 },
  { id: "rl-start-compiler", label: "React 컴파일러", kind: "theory", x: 330, y: 955, r: 12 },
  { id: "rl-learn", label: "React 배우기", kind: "theory", x: 330, y: 1005, r: 16, hub: true },
  { id: "rl-ui", label: "UI 표현하기", kind: "theory", x: 330, y: 1050, r: 14 },
  { id: "rl-interact", label: "상호작용 더하기", kind: "theory", x: 330, y: 1090, r: 14 },
  { id: "rl-state", label: "State 관리하기", kind: "theory", x: 330, y: 1130, r: 14 },
  { id: "rl-escape", label: "탈출구", kind: "theory", x: 330, y: 1170, r: 15 },

  { id: "ra", label: "API 참고서", kind: "theory", x: 330, y: 1240, r: 18, hub: true },
  { id: "ra-react", label: "React", kind: "theory", x: 330, y: 1300, r: 15, hub: true },
  { id: "ra-react-hooks", label: "내장 훅", kind: "theory", x: 330, y: 1345, r: 13 },
  { id: "ra-react-components", label: "내장 컴포넌트", kind: "theory", x: 330, y: 1385, r: 12 },
  { id: "ra-react-apis", label: "React API", kind: "theory", x: 330, y: 1425, r: 12 },
  { id: "ra-dom", label: "React DOM", kind: "theory", x: 330, y: 1475, r: 15, hub: true },
  { id: "ra-dom-hooks", label: "DOM 훅", kind: "theory", x: 330, y: 1520, r: 12 },
  { id: "ra-dom-components", label: "DOM 컴포넌트", kind: "theory", x: 330, y: 1560, r: 12 },
  { id: "ra-dom-apis", label: "DOM API", kind: "theory", x: 330, y: 1600, r: 12 },
  { id: "ra-dom-client", label: "클라이언트 API", kind: "theory", x: 330, y: 1640, r: 12 },
  { id: "ra-dom-server", label: "서버 API", kind: "theory", x: 330, y: 1680, r: 12 },
  { id: "ra-dom-static", label: "정적 API", kind: "theory", x: 330, y: 1720, r: 12 },
  { id: "ra-compiler", label: "React 컴파일러 참고서", kind: "theory", x: 330, y: 1770, r: 14, hub: true },
  { id: "ra-compiler-config", label: "컴파일러 설정", kind: "theory", x: 330, y: 1815, r: 12 },
  { id: "ra-compiler-directives", label: "컴파일러 지시어", kind: "theory", x: 330, y: 1855, r: 12 },
  { id: "ra-devtools", label: "React 개발자 도구", kind: "theory", x: 330, y: 1900, r: 13 },
  { id: "ra-eslint", label: "ESLint 플러그인", kind: "theory", x: 330, y: 1945, r: 14, hub: true },
  { id: "ra-eslint-lints", label: "린트 규칙", kind: "theory", x: 330, y: 1990, r: 12 },
  { id: "ra-rules", label: "React 규칙", kind: "theory", x: 330, y: 2035, r: 14, hub: true },
  { id: "ra-rules-overview", label: "규칙 개요", kind: "theory", x: 330, y: 2080, r: 12 },
  { id: "ra-rsc", label: "서버 컴포넌트", kind: "theory", x: 330, y: 2125, r: 14, hub: true },
  { id: "ra-rsc-directives", label: "서버 지시어", kind: "theory", x: 330, y: 2170, r: 12 },
  { id: "ra-legacy", label: "레거시 API", kind: "theory", x: 330, y: 2215, r: 13, hub: true },
  { id: "ra-legacy-apis", label: "레거시 React API", kind: "theory", x: 330, y: 2260, r: 12 },

  /* javascript.info 목차 — 파트 3개와 그 아래 챕터 그룹. 개별 글까지는 내려가지 않는다.
     (원래 있던 '브라우저' 허브가 하던 일은 파트 2가 그대로 받는다) */
  { id: "js", label: "JavaScript", kind: "theory", x: 545, y: 300, r: 20, hub: true },
  { id: "js-core", label: "코어 자바스크립트", kind: "theory", x: 545, y: 360, r: 17, hub: true },
  { id: "js-intro", label: "소개", kind: "theory", x: 545, y: 405, r: 12 },
  { id: "js-first-steps", label: "자바스크립트 기본", kind: "theory", x: 545, y: 445, r: 13 },
  { id: "js-quality", label: "코드 품질", kind: "theory", x: 545, y: 485, r: 12 },
  { id: "js-object-basics", label: "객체: 기본", kind: "theory", x: 545, y: 525, r: 13 },
  { id: "js-data-types", label: "자료구조와 자료형", kind: "theory", x: 545, y: 565, r: 13 },
  { id: "js-adv-functions", label: "함수 심화학습", kind: "theory", x: 545, y: 605, r: 14 },
  { id: "js-object-props", label: "객체 프로퍼티 설정", kind: "theory", x: 545, y: 645, r: 12 },
  { id: "js-prototypes", label: "프로토타입과 상속", kind: "theory", x: 545, y: 685, r: 13 },
  { id: "js-classes", label: "클래스", kind: "theory", x: 545, y: 725, r: 13 },
  { id: "js-error", label: "에러 핸들링", kind: "theory", x: 545, y: 765, r: 13 },
  { id: "js-async", label: "프라미스와 async·await", kind: "theory", x: 545, y: 805, r: 15 },
  { id: "js-generators", label: "제너레이터와 비동기 이터레이션", kind: "theory", x: 545, y: 845, r: 12 },
  { id: "js-modules", label: "모듈", kind: "theory", x: 545, y: 885, r: 12 },
  { id: "js-core-misc", label: "코어 기타", kind: "theory", x: 545, y: 925, r: 12 },

  { id: "js-browser", label: "브라우저: 문서·이벤트·인터페이스", kind: "theory", x: 545, y: 985, r: 17, hub: true },
  { id: "js-document", label: "문서", kind: "theory", x: 545, y: 1030, r: 13 },
  { id: "js-events", label: "이벤트 기초", kind: "theory", x: 545, y: 1070, r: 15 },
  { id: "js-ui-events", label: "UI 이벤트", kind: "theory", x: 545, y: 1110, r: 14 },
  { id: "js-forms", label: "폼과 폼 조작", kind: "theory", x: 545, y: 1150, r: 13 },
  { id: "js-loading", label: "문서와 리소스 로딩", kind: "theory", x: 545, y: 1190, r: 12 },
  { id: "js-ui-misc", label: "브라우저 기타", kind: "theory", x: 545, y: 1230, r: 15 },

  { id: "js-extra", label: "추가 주제", kind: "theory", x: 545, y: 1290, r: 17, hub: true },
  { id: "js-frames", label: "프레임과 윈도우", kind: "theory", x: 545, y: 1335, r: 15 },
  { id: "js-binary", label: "이진 데이터와 파일", kind: "theory", x: 545, y: 1375, r: 12 },
  { id: "js-network", label: "네트워크 요청", kind: "theory", x: 545, y: 1415, r: 16 },
  { id: "js-storage", label: "브라우저에 데이터 저장하기", kind: "theory", x: 545, y: 1455, r: 12 },
  { id: "js-animation", label: "애니메이션", kind: "theory", x: 545, y: 1495, r: 12 },
  { id: "js-webcomponents", label: "웹 컴포넌트", kind: "theory", x: 545, y: 1535, r: 14 },
  { id: "js-regexp", label: "정규 표현식", kind: "theory", x: 545, y: 1575, r: 12 },

  /* typescriptlang.org 문서 목차 — 사이드바의 섹션과 그 아래 페이지까지 그대로.
     릴리스 노트만 버전 목록이라 한 노드로 둔다 */
  { id: "ts", label: "TypeScript", kind: "theory", x: 760, y: 300, r: 20, hub: true },
  { id: "ts-start", label: "시작하기", kind: "theory", x: 760, y: 360, r: 15, hub: true },
  { id: "ts-start-new", label: "처음 배우는 사람을 위한 TS", kind: "theory", x: 760, y: 362, r: 12 },
  { id: "ts-start-js", label: "JS 개발자를 위한 TS", kind: "theory", x: 760, y: 364, r: 13 },
  { id: "ts-start-oop", label: "Java·C# 개발자를 위한 TS", kind: "theory", x: 760, y: 366, r: 12 },
  { id: "ts-start-fp", label: "함수형 개발자를 위한 TS", kind: "theory", x: 760, y: 368, r: 12 },
  { id: "ts-start-tooling", label: "5분 만에 보는 TS 도구", kind: "theory", x: 760, y: 370, r: 12 },
  { id: "ts-handbook", label: "핸드북", kind: "theory", x: 760, y: 400, r: 17, hub: true },
  { id: "ts-hb-basics", label: "기초", kind: "theory", x: 760, y: 445, r: 13 },
  { id: "ts-hb-everyday", label: "일상적인 타입", kind: "theory", x: 760, y: 485, r: 14, hub: true },
  { id: "ts-ev-primitives", label: "원시 타입: string, number, boolean", kind: "theory", x: 760, y: 530, r: 12 },
  { id: "ts-ev-arrays", label: "배열", kind: "theory", x: 760, y: 570, r: 12 },
  { id: "ts-ev-any", label: "any", kind: "theory", x: 760, y: 610, r: 12 },
  { id: "ts-ev-annotations", label: "변수의 타입 어노테이션", kind: "theory", x: 760, y: 650, r: 12 },
  { id: "ts-ev-functions", label: "함수", kind: "theory", x: 760, y: 690, r: 12 },
  { id: "ts-ev-objects", label: "객체 타입", kind: "theory", x: 760, y: 730, r: 12 },
  { id: "ts-ev-unions", label: "유니온 타입", kind: "theory", x: 760, y: 770, r: 12 },
  { id: "ts-ev-aliases", label: "타입 별칭", kind: "theory", x: 760, y: 810, r: 12 },
  { id: "ts-ev-interfaces", label: "인터페이스", kind: "theory", x: 760, y: 850, r: 12 },
  { id: "ts-ev-assertions", label: "타입 단언", kind: "theory", x: 760, y: 890, r: 12 },
  { id: "ts-ev-literals", label: "리터럴 타입", kind: "theory", x: 760, y: 930, r: 12 },
  { id: "ts-ev-null", label: "null과 undefined", kind: "theory", x: 760, y: 970, r: 12 },
  { id: "ts-ev-enums", label: "열거형", kind: "theory", x: 760, y: 1010, r: 12 },
  { id: "ts-ev-rare", label: "덜 쓰는 원시 타입", kind: "theory", x: 760, y: 1050, r: 12 },
  { id: "ts-hb-narrowing", label: "좁히기", kind: "theory", x: 760, y: 1085, r: 14 },
  { id: "ts-hb-functions", label: "함수 더 알아보기", kind: "theory", x: 760, y: 1125, r: 13 },
  { id: "ts-hb-objects", label: "객체 타입", kind: "theory", x: 760, y: 1165, r: 13 },
  { id: "ts-hb-manipulation", label: "타입 조작", kind: "theory", x: 760, y: 1205, r: 15, hub: true },
  { id: "ts-tm-creating", label: "타입에서 타입 만들기", kind: "theory", x: 760, y: 1250, r: 12 },
  { id: "ts-tm-generics", label: "제네릭", kind: "theory", x: 760, y: 1290, r: 13 },
  { id: "ts-tm-keyof", label: "keyof 연산자", kind: "theory", x: 760, y: 1330, r: 12 },
  { id: "ts-tm-typeof", label: "typeof 연산자", kind: "theory", x: 760, y: 1370, r: 12 },
  { id: "ts-tm-indexed", label: "인덱스 접근 타입", kind: "theory", x: 760, y: 1410, r: 12 },
  { id: "ts-tm-conditional", label: "조건부 타입", kind: "theory", x: 760, y: 1450, r: 12 },
  { id: "ts-tm-mapped", label: "매핑된 타입", kind: "theory", x: 760, y: 1490, r: 12 },
  { id: "ts-tm-template", label: "템플릿 리터럴 타입", kind: "theory", x: 760, y: 1530, r: 12 },
  { id: "ts-hb-classes", label: "클래스", kind: "theory", x: 760, y: 1570, r: 13 },
  { id: "ts-hb-modules", label: "모듈", kind: "theory", x: 760, y: 1610, r: 12 },
  { id: "ts-reference", label: "참고서", kind: "theory", x: 760, y: 1660, r: 15, hub: true },
  { id: "ts-ref-utility", label: "유틸리티 타입", kind: "theory", x: 760, y: 1662, r: 14 },
  { id: "ts-ref-cheat", label: "치트 시트", kind: "theory", x: 760, y: 1664, r: 12 },
  { id: "ts-ref-decorators", label: "데코레이터", kind: "theory", x: 760, y: 1666, r: 12 },
  { id: "ts-ref-merging", label: "선언 병합", kind: "theory", x: 760, y: 1668, r: 12 },
  { id: "ts-ref-enums", label: "이넘", kind: "theory", x: 760, y: 1670, r: 12 },
  { id: "ts-ref-iterators", label: "이터레이터와 제너레이터", kind: "theory", x: 760, y: 1672, r: 12 },
  { id: "ts-ref-jsx", label: "JSX", kind: "theory", x: 760, y: 1674, r: 13 },
  { id: "ts-ref-mixins", label: "믹스인", kind: "theory", x: 760, y: 1676, r: 12 },
  { id: "ts-ref-namespaces", label: "네임스페이스", kind: "theory", x: 760, y: 1678, r: 12 },
  { id: "ts-ref-ns-modules", label: "네임스페이스와 모듈", kind: "theory", x: 760, y: 1680, r: 12 },
  { id: "ts-ref-symbols", label: "심볼", kind: "theory", x: 760, y: 1682, r: 12 },
  { id: "ts-ref-triple", label: "트리플 슬래시 지시어", kind: "theory", x: 760, y: 1684, r: 12 },
  { id: "ts-ref-compat", label: "타입 호환성", kind: "theory", x: 760, y: 1686, r: 13 },
  { id: "ts-ref-inference", label: "타입 추론", kind: "theory", x: 760, y: 1688, r: 14 },
  { id: "ts-ref-vardecl", label: "변수 선언", kind: "theory", x: 760, y: 1690, r: 12 },

  { id: "ts-modules-ref", label: "모듈 참고서", kind: "theory", x: 760, y: 1700, r: 14, hub: true },
  { id: "ts-mr-intro", label: "모듈 소개", kind: "theory", x: 760, y: 1702, r: 12 },
  { id: "ts-mr-theory", label: "모듈 이론", kind: "theory", x: 760, y: 1704, r: 13 },
  { id: "ts-mr-guides", label: "모듈 가이드", kind: "theory", x: 760, y: 1706, r: 12, hub: true },
  { id: "ts-mr-options", label: "컴파일러 옵션 고르기", kind: "theory", x: 760, y: 1708, r: 12 },
  { id: "ts-mr-reference", label: "모듈 레퍼런스", kind: "theory", x: 760, y: 1710, r: 12 },
  { id: "ts-mr-appendices", label: "모듈 부록", kind: "theory", x: 760, y: 1712, r: 12, hub: true },
  { id: "ts-mr-esm-cjs", label: "ESM·CJS 상호운용", kind: "theory", x: 760, y: 1714, r: 13 },

  { id: "ts-tutorials", label: "튜토리얼", kind: "theory", x: 760, y: 1740, r: 14, hub: true },
  { id: "ts-tut-aspnet", label: "ASP.NET Core", kind: "theory", x: 760, y: 1742, r: 12 },
  { id: "ts-tut-gulp", label: "Gulp", kind: "theory", x: 760, y: 1744, r: 12 },
  { id: "ts-tut-dom", label: "DOM 조작", kind: "theory", x: 760, y: 1746, r: 13 },
  { id: "ts-tut-migrate", label: "JavaScript에서 옮겨오기", kind: "theory", x: 760, y: 1748, r: 13 },
  { id: "ts-tut-babel", label: "Babel과 함께 쓰기", kind: "theory", x: 760, y: 1750, r: 12 },

  { id: "ts-whatsnew", label: "릴리스 노트", kind: "theory", x: 760, y: 1780, r: 12 },

  { id: "ts-declaration", label: "선언 파일", kind: "theory", x: 760, y: 1820, r: 15, hub: true },
  { id: "ts-dcl-intro", label: "선언 파일 소개", kind: "theory", x: 760, y: 1822, r: 12 },
  { id: "ts-dcl-reference", label: "선언 레퍼런스", kind: "theory", x: 760, y: 1824, r: 12 },
  { id: "ts-dcl-structures", label: "라이브러리 구조", kind: "theory", x: 760, y: 1826, r: 12 },
  { id: "ts-dcl-templates", label: "d.ts 템플릿", kind: "theory", x: 760, y: 1828, r: 13, hub: true },
  { id: "ts-dcl-t-modules", label: "모듈 d.ts", kind: "theory", x: 760, y: 1830, r: 12 },
  { id: "ts-dcl-t-plugin", label: "모듈: 플러그인", kind: "theory", x: 760, y: 1832, r: 12 },
  { id: "ts-dcl-t-class", label: "모듈: 클래스", kind: "theory", x: 760, y: 1834, r: 12 },
  { id: "ts-dcl-t-function", label: "모듈: 함수", kind: "theory", x: 760, y: 1836, r: 12 },
  { id: "ts-dcl-t-global", label: "전역 d.ts", kind: "theory", x: 760, y: 1838, r: 12 },
  { id: "ts-dcl-t-globalmod", label: "전역: 모듈 수정", kind: "theory", x: 760, y: 1840, r: 12 },
  { id: "ts-dcl-dos", label: "해야 할 것과 하지 말 것", kind: "theory", x: 760, y: 1842, r: 12 },
  { id: "ts-dcl-deep", label: "깊이 알아보기", kind: "theory", x: 760, y: 1844, r: 12 },
  { id: "ts-dcl-publish", label: "배포하기", kind: "theory", x: 760, y: 1846, r: 12 },
  { id: "ts-dcl-consume", label: "가져다 쓰기", kind: "theory", x: 760, y: 1848, r: 12 },

  { id: "ts-js", label: "JavaScript 지원", kind: "theory", x: 760, y: 1860, r: 14, hub: true },
  { id: "ts-js-projects", label: "TS를 쓰는 JS 프로젝트", kind: "theory", x: 760, y: 1862, r: 12 },
  { id: "ts-js-checking", label: "JS 파일 타입 검사", kind: "theory", x: 760, y: 1864, r: 13 },
  { id: "ts-js-jsdoc", label: "JSDoc 레퍼런스", kind: "theory", x: 760, y: 1866, r: 13 },
  { id: "ts-js-dts", label: "JS에서 d.ts 만들기", kind: "theory", x: 760, y: 1868, r: 12 },

  { id: "ts-config", label: "프로젝트 설정", kind: "theory", x: 760, y: 1900, r: 14, hub: true },
  { id: "ts-cfg-tsconfig", label: "tsconfig.json이란", kind: "theory", x: 760, y: 1902, r: 13 },
  { id: "ts-cfg-msbuild", label: "MSBuild 컴파일러 옵션", kind: "theory", x: 760, y: 1904, r: 12 },
  { id: "ts-cfg-tsconfig-ref", label: "TSConfig 레퍼런스", kind: "theory", x: 760, y: 1906, r: 13 },
  { id: "ts-cfg-cli", label: "tsc CLI 옵션", kind: "theory", x: 760, y: 1908, r: 12 },
  { id: "ts-cfg-references", label: "프로젝트 참조", kind: "theory", x: 760, y: 1910, r: 12 },
  { id: "ts-cfg-buildtools", label: "빌드 도구 연동", kind: "theory", x: 760, y: 1912, r: 12 },
  { id: "ts-cfg-watch", label: "watch 설정", kind: "theory", x: 760, y: 1914, r: 12 },
  { id: "ts-cfg-nightly", label: "나이틀리 빌드", kind: "theory", x: 760, y: 1916, r: 12 },

  /* vuejs.org 목차 — 가이드와 API 참고서는 사이드바의 장과 페이지까지 그대로,
     튜토리얼·예제·스타일 가이드는 갈래만. 라벨은 ko.vuejs.org를 따르되 갈래가
     달라도 이름이 같아지는 것(라이프사이클 훅·내장 컴포넌트·SFC·이벤트)만 구분을 붙였다. */
  { id: "vue", label: "Vue", kind: "theory", x: 975, y: 300, r: 20, hub: true },

  { id: "vg", label: "가이드", kind: "theory", x: 975, y: 730, r: 18, hub: true },
  { id: "vg-start", label: "시작하기", kind: "theory", x: 975, y: 732, r: 15, hub: true },
  { id: "vg-start-intro", label: "소개", kind: "theory", x: 975, y: 734, r: 12 },
  { id: "vg-start-quick", label: "빠른 시작", kind: "theory", x: 975, y: 736, r: 12 },
  { id: "vg-essentials", label: "필수 개념", kind: "theory", x: 975, y: 738, r: 16, hub: true },
  { id: "vg-ess-app", label: "애플리케이션 생성", kind: "theory", x: 975, y: 740, r: 12 },
  { id: "vg-ess-template", label: "템플릿 문법", kind: "theory", x: 975, y: 742, r: 14 },
  { id: "vg-ess-reactivity", label: "반응성 기초", kind: "theory", x: 975, y: 744, r: 15 },
  { id: "vg-ess-computed", label: "계산된 속성", kind: "theory", x: 975, y: 746, r: 13 },
  { id: "vg-ess-class-style", label: "클래스와 스타일 바인딩", kind: "theory", x: 975, y: 748, r: 12 },
  { id: "vg-ess-conditional", label: "조건부 렌더링", kind: "theory", x: 975, y: 750, r: 12 },
  { id: "vg-ess-list", label: "리스트 렌더링", kind: "theory", x: 975, y: 752, r: 13 },
  { id: "vg-ess-events", label: "이벤트 처리", kind: "theory", x: 975, y: 754, r: 13 },
  { id: "vg-ess-forms", label: "폼 입력 바인딩", kind: "theory", x: 975, y: 756, r: 13 },
  { id: "vg-ess-watchers", label: "감시자", kind: "theory", x: 975, y: 758, r: 13 },
  { id: "vg-ess-refs", label: "템플릿 ref", kind: "theory", x: 975, y: 760, r: 12 },
  { id: "vg-ess-components", label: "컴포넌트 기초", kind: "theory", x: 975, y: 762, r: 14 },
  { id: "vg-ess-lifecycle", label: "라이프사이클 훅", kind: "theory", x: 975, y: 764, r: 13 },
  { id: "vg-components", label: "컴포넌트 심화", kind: "theory", x: 975, y: 766, r: 16, hub: true },
  { id: "vg-comp-registration", label: "등록", kind: "theory", x: 975, y: 768, r: 12 },
  { id: "vg-comp-props", label: "Props", kind: "theory", x: 975, y: 770, r: 14 },
  { id: "vg-comp-events", label: "컴포넌트 이벤트", kind: "theory", x: 975, y: 772, r: 13 },
  { id: "vg-comp-vmodel", label: "컴포넌트 v-model", kind: "theory", x: 975, y: 774, r: 14 },
  { id: "vg-comp-attrs", label: "폴스루 속성", kind: "theory", x: 975, y: 776, r: 12 },
  { id: "vg-comp-slots", label: "슬롯", kind: "theory", x: 975, y: 778, r: 14 },
  { id: "vg-comp-provide", label: "Provide / inject", kind: "theory", x: 975, y: 780, r: 13 },
  { id: "vg-comp-async", label: "비동기 컴포넌트", kind: "theory", x: 975, y: 782, r: 12 },
  { id: "vg-reusability", label: "재사용성", kind: "theory", x: 975, y: 784, r: 15, hub: true },
  { id: "vg-reuse-composables", label: "컴포저블", kind: "theory", x: 975, y: 786, r: 15 },
  { id: "vg-reuse-directives", label: "커스텀 디렉티브", kind: "theory", x: 975, y: 788, r: 12 },
  { id: "vg-reuse-plugins", label: "플러그인", kind: "theory", x: 975, y: 790, r: 12 },
  { id: "vg-builtins", label: "내장 컴포넌트", kind: "theory", x: 975, y: 792, r: 15, hub: true },
  { id: "vg-bi-transition", label: "Transition", kind: "theory", x: 975, y: 794, r: 13 },
  { id: "vg-bi-transition-group", label: "TransitionGroup", kind: "theory", x: 975, y: 796, r: 12 },
  { id: "vg-bi-keep-alive", label: "KeepAlive", kind: "theory", x: 975, y: 798, r: 12 },
  { id: "vg-bi-teleport", label: "Teleport", kind: "theory", x: 975, y: 800, r: 13 },
  { id: "vg-bi-suspense", label: "Suspense", kind: "theory", x: 975, y: 802, r: 12 },
  { id: "vg-scaling", label: "확장하기", kind: "theory", x: 975, y: 804, r: 15, hub: true },
  { id: "vg-scale-sfc", label: "싱글 파일 컴포넌트", kind: "theory", x: 975, y: 806, r: 14 },
  { id: "vg-scale-tooling", label: "툴링", kind: "theory", x: 975, y: 808, r: 12 },
  { id: "vg-scale-routing", label: "라우팅", kind: "theory", x: 975, y: 810, r: 13 },
  { id: "vg-scale-state", label: "상태 관리", kind: "theory", x: 975, y: 812, r: 14 },
  { id: "vg-scale-testing", label: "테스트", kind: "theory", x: 975, y: 814, r: 12 },
  { id: "vg-scale-ssr", label: "서버 사이드 렌더링", kind: "theory", x: 975, y: 816, r: 13 },
  { id: "vg-practices", label: "베스트 프랙티스", kind: "theory", x: 975, y: 818, r: 15, hub: true },
  { id: "vg-bp-deploy", label: "프로덕션 배포", kind: "theory", x: 975, y: 820, r: 12 },
  { id: "vg-bp-performance", label: "성능", kind: "theory", x: 975, y: 822, r: 13 },
  { id: "vg-bp-a11y", label: "접근성", kind: "theory", x: 975, y: 824, r: 12 },
  { id: "vg-bp-security", label: "보안", kind: "theory", x: 975, y: 826, r: 12 },
  { id: "vg-typescript", label: "TypeScript와 함께", kind: "theory", x: 975, y: 828, r: 14, hub: true },
  { id: "vg-ts-overview", label: "TS 개요", kind: "theory", x: 975, y: 830, r: 12 },
  { id: "vg-ts-composition", label: "Composition API와 TS", kind: "theory", x: 975, y: 832, r: 13 },
  { id: "vg-ts-options", label: "Options API와 TS", kind: "theory", x: 975, y: 834, r: 12 },
  { id: "vg-extras", label: "추가 주제", kind: "theory", x: 975, y: 836, r: 15, hub: true },
  { id: "vg-extra-ways", label: "Vue 사용 방법", kind: "theory", x: 975, y: 838, r: 12 },
  { id: "vg-extra-faq", label: "Composition API FAQ", kind: "theory", x: 975, y: 840, r: 13 },
  { id: "vg-extra-reactivity", label: "반응성 심화", kind: "theory", x: 975, y: 842, r: 15 },
  { id: "vg-extra-rendering", label: "렌더링 메커니즘", kind: "theory", x: 975, y: 844, r: 14 },
  { id: "vg-extra-render-fn", label: "렌더 함수와 JSX", kind: "theory", x: 975, y: 846, r: 12 },
  { id: "vg-extra-web-components", label: "Vue와 웹 컴포넌트", kind: "theory", x: 975, y: 848, r: 12 },
  { id: "vg-extra-animation", label: "애니메이션 기법", kind: "theory", x: 975, y: 850, r: 12 },

  { id: "va", label: "API 참고서", kind: "theory", x: 975, y: 852, r: 18, hub: true },
  { id: "va-global", label: "글로벌 API", kind: "theory", x: 975, y: 854, r: 15, hub: true },
  { id: "va-global-app", label: "애플리케이션 API", kind: "theory", x: 975, y: 856, r: 13 },
  { id: "va-global-general", label: "일반 API", kind: "theory", x: 975, y: 858, r: 12 },
  { id: "va-composition", label: "Composition API", kind: "theory", x: 975, y: 860, r: 16, hub: true },
  { id: "va-comp-setup", label: "setup()", kind: "theory", x: 975, y: 862, r: 12 },
  { id: "va-comp-reactivity-core", label: "반응성: 코어", kind: "theory", x: 975, y: 864, r: 15 },
  { id: "va-comp-reactivity-utils", label: "반응성: 유틸리티", kind: "theory", x: 975, y: 866, r: 12 },
  { id: "va-comp-reactivity-advanced", label: "반응성: 고급", kind: "theory", x: 975, y: 868, r: 12 },
  { id: "va-comp-lifecycle", label: "라이프사이클 훅 API", kind: "theory", x: 975, y: 870, r: 13 },
  { id: "va-comp-di", label: "의존성 주입", kind: "theory", x: 975, y: 872, r: 12 },
  { id: "va-comp-helpers", label: "헬퍼", kind: "theory", x: 975, y: 874, r: 12 },
  { id: "va-options", label: "Options API", kind: "theory", x: 975, y: 876, r: 15, hub: true },
  { id: "va-opt-state", label: "옵션: 상태", kind: "theory", x: 975, y: 878, r: 12 },
  { id: "va-opt-rendering", label: "옵션: 렌더링", kind: "theory", x: 975, y: 880, r: 12 },
  { id: "va-opt-lifecycle", label: "옵션: 라이프사이클", kind: "theory", x: 975, y: 882, r: 12 },
  { id: "va-opt-composition", label: "옵션: 컴포지션", kind: "theory", x: 975, y: 884, r: 12 },
  { id: "va-opt-misc", label: "옵션: 기타", kind: "theory", x: 975, y: 886, r: 12 },
  { id: "va-opt-instance", label: "컴포넌트 인스턴스", kind: "theory", x: 975, y: 888, r: 12 },
  { id: "va-builtins", label: "내장 기능", kind: "theory", x: 975, y: 890, r: 15, hub: true },
  { id: "va-bi-directives", label: "내장 디렉티브", kind: "theory", x: 975, y: 892, r: 14 },
  { id: "va-bi-components", label: "내장 컴포넌트 API", kind: "theory", x: 975, y: 894, r: 13 },
  { id: "va-bi-elements", label: "특수 엘리먼트", kind: "theory", x: 975, y: 896, r: 12 },
  { id: "va-bi-attrs", label: "특수 속성", kind: "theory", x: 975, y: 898, r: 12 },
  { id: "va-sfc", label: "SFC 참고서", kind: "theory", x: 975, y: 900, r: 15, hub: true },
  { id: "va-sfc-spec", label: "SFC 문법 명세", kind: "theory", x: 975, y: 902, r: 12 },
  { id: "va-sfc-script-setup", label: "<script setup>", kind: "theory", x: 975, y: 904, r: 14 },
  { id: "va-sfc-css", label: "SFC CSS 기능", kind: "theory", x: 975, y: 906, r: 12 },
  { id: "va-advanced", label: "고급 API", kind: "theory", x: 975, y: 908, r: 15, hub: true },
  { id: "va-adv-custom-elements", label: "커스텀 엘리먼트", kind: "theory", x: 975, y: 910, r: 12 },
  { id: "va-adv-render-fn", label: "렌더 함수 API", kind: "theory", x: 975, y: 912, r: 12 },
  { id: "va-adv-ssr", label: "SSR API", kind: "theory", x: 975, y: 914, r: 12 },
  { id: "va-adv-utility-types", label: "TS 유틸리티 타입", kind: "theory", x: 975, y: 916, r: 12 },
  { id: "va-adv-custom-renderer", label: "커스텀 렌더러", kind: "theory", x: 975, y: 918, r: 12 },
  { id: "va-adv-compile-flags", label: "컴파일 타임 플래그", kind: "theory", x: 975, y: 920, r: 12 },

  { id: "vt", label: "튜토리얼", kind: "theory", x: 975, y: 922, r: 14 },

  { id: "ve", label: "예제", kind: "theory", x: 975, y: 924, r: 15, hub: true },
  { id: "ve-basic", label: "기본 예제", kind: "theory", x: 975, y: 926, r: 12 },
  { id: "ve-practical", label: "실전 예제", kind: "theory", x: 975, y: 928, r: 13 },
  { id: "ve-7guis", label: "7 GUIs", kind: "theory", x: 975, y: 930, r: 12 },

  { id: "vs", label: "스타일 가이드", kind: "theory", x: 975, y: 932, r: 15, hub: true },
  { id: "vs-essential", label: "A - 필수", kind: "theory", x: 975, y: 934, r: 12 },
  { id: "vs-strong", label: "B - 적극 권장", kind: "theory", x: 975, y: 936, r: 12 },
  { id: "vs-recommended", label: "C - 권장", kind: "theory", x: 975, y: 938, r: 12 },
  { id: "vs-caution", label: "D - 주의해서 사용", kind: "theory", x: 975, y: 940, r: 12 },

  // 3열: 트러블슈팅 — 프로젝트와 기술이 만나는 곳 (프로젝트 진행 순서대로)
  { id: "t-isolated", label: "넷플릭스 플레이어 제어", kind: "trouble", x: 1240, y: 100, r: 14 },
  { id: "t-focus", label: "채팅 입력 포커스 유실", kind: "trouble", x: 1240, y: 205, r: 13 },
  { id: "t-sync", label: "영상 동기화 불감대", kind: "trouble", x: 1240, y: 310, r: 13 },
  { id: "t-schema", label: "런타임 스키마 검증", kind: "trouble", x: 1240, y: 415, r: 13 },
  { id: "t-tagged", label: "타입 안전 예외 처리", kind: "trouble", x: 1240, y: 520, r: 13 },
  { id: "t-canvas", label: "Canvas 좌석 렌더링", kind: "trouble", x: 1240, y: 625, r: 13 },
  { id: "t-webdriver", label: "WebDriver 봇 필터링", kind: "trouble", x: 1240, y: 730, r: 13 },
  { id: "t-buffer", label: "비동기 이벤트 버퍼링", kind: "trouble", x: 1240, y: 835, r: 14 },
];

/**
 * 프로젝트별 트러블 — 프로젝트 → 트러블 간선과 트러블 틀이 이 하나에서 나온다.
 * 글을 추가할 때 여기 한 줄만 고치면 간선과 틀이 함께 따라온다.
 */
export const projectTroubles = [
  { project: "withy", troubles: ["t-isolated", "t-focus", "t-sync"] },
  { project: "petfolio", troubles: ["t-schema", "t-tagged"] },
  { project: "tickle", troubles: ["t-canvas", "t-webdriver", "t-buffer"] },
] as const;

/** 틀 이름에 쓸 노드 라벨 — 프로젝트 카드와 같은 이름을 쓴다 */
function nodeLabel(id: string): string {
  return fullGraphNodes.find((node) => node.id === id)?.label ?? id;
}

/**
 * 기술 계층 — 개념(허브)과 그 하위 챕터. 간선과 트리가 여기서 유도된다.
 * 한 클러스터의 허브가 다른 클러스터의 챕터일 수 있다(React → Learn → 시작하기처럼 3단).
 */
/**
 * 생각의 계층 — 이론과 같은 문법(허브 → 챕터)이지만 성격이 반대다.
 * 이론은 공부하는 만큼 늘어나는 열린 집합이고, 작성법 일곱 단계 열여덟 항목은
 * 데이터 생애주기를 덮으려고 만든 것이라 늘어나지 않는다. 늘어나는 건 철학 쪽이다.
 */
export const ideaClusters = [
  {
    hub: "fe-craft",
    chapters: [
      "craft-entry",
      "craft-fetch",
      "craft-state",
      "craft-component",
      "craft-render",
      "craft-robust",
      "craft-quality",
    ],
  },
  { hub: "craft-entry", chapters: ["craft-url"] },
  { hub: "craft-fetch", chapters: ["craft-request", "craft-4state", "craft-cache"] },
  { hub: "craft-state", chapters: ["craft-colocation", "craft-flow"] },
  {
    hub: "craft-component",
    chapters: ["craft-composition", "craft-contract", "craft-hooks"],
  },
  {
    hub: "craft-render",
    chapters: ["craft-strategy", "craft-rerender", "craft-timing"],
  },
  {
    hub: "craft-robust",
    chapters: ["craft-concurrency", "craft-error", "craft-trust"],
  },
  { hub: "craft-quality", chapters: ["craft-perf", "craft-a11y", "craft-observe"] },
  /* TIL도 같은 문법으로 매단다 — 간선·트리·머리말이 전부 이 지도에서 나오므로
     여기 들어와야 기록이 그래프의 어느 가지에서 왔는지가 말이 된다 */
  { hub: "til", chapters: tilEntries.map((entry) => entry.id) },
] as const;

export const theoryClusters = [
  /* React — 문서가 갈라놓은 두 갈래를 그대로 */
  { hub: "react", chapters: ["rl", "ra"] },

  /* ## Learn React */
  { hub: "rl", chapters: ["rl-start", "rl-learn"] },
  {
    hub: "rl-start",
    chapters: ["rl-start-quick", "rl-start-install", "rl-start-setup", "rl-start-compiler"],
  },
  { hub: "rl-learn", chapters: ["rl-ui", "rl-interact", "rl-state", "rl-escape"] },

  /* ## API Reference */
  {
    hub: "ra",
    chapters: [
      "ra-react",
      "ra-dom",
      "ra-compiler",
      "ra-devtools",
      "ra-eslint",
      "ra-rules",
      "ra-rsc",
      "ra-legacy",
    ],
  },
  { hub: "ra-react", chapters: ["ra-react-hooks", "ra-react-components", "ra-react-apis"] },
  {
    hub: "ra-dom",
    chapters: [
      "ra-dom-hooks",
      "ra-dom-components",
      "ra-dom-apis",
      "ra-dom-client",
      "ra-dom-server",
      "ra-dom-static",
    ],
  },
  { hub: "ra-compiler", chapters: ["ra-compiler-config", "ra-compiler-directives"] },
  { hub: "ra-eslint", chapters: ["ra-eslint-lints"] },
  { hub: "ra-rules", chapters: ["ra-rules-overview"] },
  { hub: "ra-rsc", chapters: ["ra-rsc-directives"] },
  { hub: "ra-legacy", chapters: ["ra-legacy-apis"] },
  /* javascript.info — 파트 3개 */
  { hub: "js", chapters: ["js-core", "js-browser", "js-extra"] },
  {
    hub: "js-core",
    chapters: [
      "js-intro",
      "js-first-steps",
      "js-quality",
      "js-object-basics",
      "js-data-types",
      "js-adv-functions",
      "js-object-props",
      "js-prototypes",
      "js-classes",
      "js-error",
      "js-async",
      "js-generators",
      "js-modules",
      "js-core-misc",
    ],
  },
  {
    hub: "js-browser",
    chapters: [
      "js-document",
      "js-events",
      "js-ui-events",
      "js-forms",
      "js-loading",
      "js-ui-misc",
    ],
  },
  {
    hub: "js-extra",
    chapters: [
      "js-frames",
      "js-binary",
      "js-network",
      "js-storage",
      "js-animation",
      "js-webcomponents",
      "js-regexp",
    ],
  },

  /* TypeScript — 핸드북만 페이지까지, 나머지는 섹션 이름만 */
  {
    hub: "ts",
    chapters: [
      "ts-start",
      "ts-handbook",
      "ts-reference",
      "ts-modules-ref",
      "ts-tutorials",
      "ts-whatsnew",
      "ts-declaration",
      "ts-js",
      "ts-config",
    ],
  },
  {
    hub: "ts-handbook",
    chapters: [
      "ts-hb-basics",
      "ts-hb-everyday",
      "ts-hb-narrowing",
      "ts-hb-functions",
      "ts-hb-objects",
      "ts-hb-manipulation",
      "ts-hb-classes",
      "ts-hb-modules",
    ],
  },
  {
    hub: "ts-hb-everyday",
    chapters: [
      "ts-ev-primitives",
      "ts-ev-arrays",
      "ts-ev-any",
      "ts-ev-annotations",
      "ts-ev-functions",
      "ts-ev-objects",
      "ts-ev-unions",
      "ts-ev-aliases",
      "ts-ev-interfaces",
      "ts-ev-assertions",
      "ts-ev-literals",
      "ts-ev-null",
      "ts-ev-enums",
      "ts-ev-rare",
    ],
  },
  {
    hub: "ts-hb-manipulation",
    chapters: [
      "ts-tm-creating",
      "ts-tm-generics",
      "ts-tm-keyof",
      "ts-tm-typeof",
      "ts-tm-indexed",
      "ts-tm-conditional",
      "ts-tm-mapped",
      "ts-tm-template",
    ],
  },
  {
    hub: "ts-start",
    chapters: [
      "ts-start-new",
      "ts-start-js",
      "ts-start-oop",
      "ts-start-fp",
      "ts-start-tooling",
    ],
  },
  {
    hub: "ts-reference",
    chapters: [
      "ts-ref-utility",
      "ts-ref-cheat",
      "ts-ref-decorators",
      "ts-ref-merging",
      "ts-ref-enums",
      "ts-ref-iterators",
      "ts-ref-jsx",
      "ts-ref-mixins",
      "ts-ref-namespaces",
      "ts-ref-ns-modules",
      "ts-ref-symbols",
      "ts-ref-triple",
      "ts-ref-compat",
      "ts-ref-inference",
      "ts-ref-vardecl",
    ],
  },
  {
    hub: "ts-modules-ref",
    chapters: [
      "ts-mr-intro",
      "ts-mr-theory",
      "ts-mr-guides",
      "ts-mr-reference",
      "ts-mr-appendices",
    ],
  },
  { hub: "ts-mr-guides", chapters: ["ts-mr-options"] },
  { hub: "ts-mr-appendices", chapters: ["ts-mr-esm-cjs"] },
  {
    hub: "ts-tutorials",
    chapters: ["ts-tut-aspnet", "ts-tut-gulp", "ts-tut-dom", "ts-tut-migrate", "ts-tut-babel"],
  },
  {
    hub: "ts-declaration",
    chapters: [
      "ts-dcl-intro",
      "ts-dcl-reference",
      "ts-dcl-structures",
      "ts-dcl-templates",
      "ts-dcl-dos",
      "ts-dcl-deep",
      "ts-dcl-publish",
      "ts-dcl-consume",
    ],
  },
  {
    hub: "ts-dcl-templates",
    chapters: [
      "ts-dcl-t-modules",
      "ts-dcl-t-plugin",
      "ts-dcl-t-class",
      "ts-dcl-t-function",
      "ts-dcl-t-global",
      "ts-dcl-t-globalmod",
    ],
  },
  {
    hub: "ts-js",
    chapters: ["ts-js-projects", "ts-js-checking", "ts-js-jsdoc", "ts-js-dts"],
  },
  {
    hub: "ts-config",
    chapters: [
      "ts-cfg-tsconfig",
      "ts-cfg-msbuild",
      "ts-cfg-tsconfig-ref",
      "ts-cfg-cli",
      "ts-cfg-references",
      "ts-cfg-buildtools",
      "ts-cfg-watch",
      "ts-cfg-nightly",
    ],
  },

  /* Vue — 문서 상단 탭 다섯 갈래(가이드·API·튜토리얼·예제·스타일 가이드) */
  { hub: "vue", chapters: ["vg", "va", "vt", "ve", "vs"] },
  { hub: "vg-start", chapters: ["vg-start-intro", "vg-start-quick"] },
  {
    hub: "vg-essentials",
    chapters: [
      "vg-ess-app",
      "vg-ess-template",
      "vg-ess-reactivity",
      "vg-ess-computed",
      "vg-ess-class-style",
      "vg-ess-conditional",
      "vg-ess-list",
      "vg-ess-events",
      "vg-ess-forms",
      "vg-ess-watchers",
      "vg-ess-refs",
      "vg-ess-components",
      "vg-ess-lifecycle",
    ],
  },
  {
    hub: "vg-components",
    chapters: [
      "vg-comp-registration",
      "vg-comp-props",
      "vg-comp-events",
      "vg-comp-vmodel",
      "vg-comp-attrs",
      "vg-comp-slots",
      "vg-comp-provide",
      "vg-comp-async",
    ],
  },
  {
    hub: "vg-reusability",
    chapters: [
      "vg-reuse-composables",
      "vg-reuse-directives",
      "vg-reuse-plugins",
    ],
  },
  {
    hub: "vg-builtins",
    chapters: [
      "vg-bi-transition",
      "vg-bi-transition-group",
      "vg-bi-keep-alive",
      "vg-bi-teleport",
      "vg-bi-suspense",
    ],
  },
  {
    hub: "vg-scaling",
    chapters: [
      "vg-scale-sfc",
      "vg-scale-tooling",
      "vg-scale-routing",
      "vg-scale-state",
      "vg-scale-testing",
      "vg-scale-ssr",
    ],
  },
  {
    hub: "vg-practices",
    chapters: [
      "vg-bp-deploy",
      "vg-bp-performance",
      "vg-bp-a11y",
      "vg-bp-security",
    ],
  },
  { hub: "vg-typescript", chapters: ["vg-ts-overview", "vg-ts-composition", "vg-ts-options"] },
  {
    hub: "vg-extras",
    chapters: [
      "vg-extra-ways",
      "vg-extra-faq",
      "vg-extra-reactivity",
      "vg-extra-rendering",
      "vg-extra-render-fn",
      "vg-extra-web-components",
      "vg-extra-animation",
    ],
  },
  {
    hub: "vg",
    chapters: [
      "vg-start",
      "vg-essentials",
      "vg-components",
      "vg-reusability",
      "vg-builtins",
      "vg-scaling",
      "vg-practices",
      "vg-typescript",
      "vg-extras",
    ],
  },
  { hub: "va-global", chapters: ["va-global-app", "va-global-general"] },
  {
    hub: "va-composition",
    chapters: [
      "va-comp-setup",
      "va-comp-reactivity-core",
      "va-comp-reactivity-utils",
      "va-comp-reactivity-advanced",
      "va-comp-lifecycle",
      "va-comp-di",
      "va-comp-helpers",
    ],
  },
  {
    hub: "va-options",
    chapters: [
      "va-opt-state",
      "va-opt-rendering",
      "va-opt-lifecycle",
      "va-opt-composition",
      "va-opt-misc",
      "va-opt-instance",
    ],
  },
  {
    hub: "va-builtins",
    chapters: [
      "va-bi-directives",
      "va-bi-components",
      "va-bi-elements",
      "va-bi-attrs",
    ],
  },
  { hub: "va-sfc", chapters: ["va-sfc-spec", "va-sfc-script-setup", "va-sfc-css"] },
  {
    hub: "va-advanced",
    chapters: [
      "va-adv-custom-elements",
      "va-adv-render-fn",
      "va-adv-ssr",
      "va-adv-utility-types",
      "va-adv-custom-renderer",
      "va-adv-compile-flags",
    ],
  },
  {
    hub: "va",
    chapters: [
      "va-global",
      "va-composition",
      "va-options",
      "va-builtins",
      "va-sfc",
      "va-advanced",
    ],
  },
  { hub: "ve", chapters: ["ve-basic", "ve-practical", "ve-7guis"] },
  { hub: "vs", chapters: ["vs-essential", "vs-strong", "vs-recommended", "vs-caution"] },
] as const;

export const fullGraphEdges: GraphEdgeData[] = [
  // 나 → 프로젝트
  { from: "me", to: "withy" },
  { from: "me", to: "petfolio" },
  { from: "me", to: "tickle" },

  // 나 → 기술 갈래의 뿌리
  { from: "me", to: "react" },
  { from: "me", to: "js" },
  { from: "me", to: "ts" },
  { from: "me", to: "vue" },

  // 나 → 생각 (이론이 React·JS·TS·Vue로 바로 가듯, 여기도 갈래로 바로 간다)
  { from: "me", to: "fe-craft" },
  { from: "me", to: "fe-philosophy" },
  { from: "me", to: "til" },
  { from: "me", to: "dict" },

  // 개념 → 챕터 (계층: 하위 내용) — 이론과 생각이 같은 문법을 쓴다
  ...[...theoryClusters, ...ideaClusters].flatMap((cluster) =>
    cluster.chapters.map((chapter) => ({ from: cluster.hub, to: chapter })),
  ),

  // 프로젝트 → 트러블 (틀과 같은 목록에서 나온다)
  ...projectTroubles.flatMap(({ project, troubles }) =>
    troubles.map((trouble) => ({ from: project, to: trouble })),
  ),

  /* 기술 → 트러블 (다리): 프로젝트와 기술이 만나 트러블이 된다.
     기술 쪽 끝은 전부 공식 문서 목차의 자리를 가리킨다 —
     그 개념을 어디서 읽었는지가 그대로 드러나도록. */
  { from: "js-frames", to: "t-isolated" },
  { from: "js-events", to: "t-focus" },
  { from: "js-ui-events", to: "t-focus" },
  { from: "js-network", to: "t-sync" },
  { from: "rl-escape", to: "t-sync" },
  { from: "ts-hb-narrowing", to: "t-schema" },
  { from: "ts-hb-everyday", to: "t-schema" },
  { from: "ts-hb-narrowing", to: "t-tagged" },
  { from: "ts-tm-creating", to: "t-tagged" },
  { from: "js-document", to: "t-canvas" },
  { from: "js-document", to: "t-webdriver" },
  { from: "js-ui-misc", to: "t-buffer" },
  { from: "rl-interact", to: "t-buffer" },
  { from: "rl-escape", to: "t-buffer" },

  /* 문서 → 사전 (다리): 낱말이 나온 문서에서 사전으로. 기술 → 트러블과 같은
     방향이다 — 읽은 것에서 내가 적은 것으로. 사전에 절이 늘면 선도 따라온다.
     이 선 때문에 생각 틀이 트러블과 같은 열(이론의 뒤)에 선다. */
  ...[...new Set(dictionary.sections.map((section) => section.from))].map(
    (from): GraphEdgeData => ({ from, to: "dict" }),
  ),
];

/**
 * 기술 갈래의 뿌리 — 틀 하나가 여기서 나온다.
 *
 * 전부 접은 채로 연다. 목차가 통째로 들어와 이론 노드만 150개가 넘는데,
 * 처음 화면이 그 목록이면 정작 보여야 할 흐름(민엽 → 프로젝트 → 트러블)이 묻힌다.
 * 필요한 사람이 펴서 보는 편이 낫다.
 */
const techRoots = [
  { root: "react", label: "React", collapsed: true },
  { root: "js", label: "JavaScript", collapsed: true },
  { root: "ts", label: "TypeScript", collapsed: true },
  { root: "vue", label: "Vue", collapsed: true },
] as const;

const chaptersOf = new Map<string, readonly string[]>(
  theoryClusters.map((cluster) => [cluster.hub, cluster.chapters]),
);

/** 이 뿌리에 매달린 노드 전부 (자기 포함). 고리가 있어도 한 번씩만 본다 */
function techMembers(root: string): string[] {
  const seen = new Set<string>();
  const walk = (id: string) => {
    if (seen.has(id)) return;
    seen.add(id);
    for (const child of chaptersOf.get(id) ?? []) walk(child);
  };
  walk(root);
  return [...seen];
}

/**
 * 이 뿌리 안의 레이아웃 덩어리 — 허브 하나와 그 직속 챕터가 한 덩어리다.
 * 중간 허브가 두 덩어리에 겹쳐 들어가지 않도록 한 번 나온 id는 건너뛴다.
 */
function subClusters(root: string) {
  const inside = new Set(techMembers(root));
  const taken = new Set<string>();
  return theoryClusters
    .filter((cluster) => inside.has(cluster.hub))
    .map((cluster) => ({
      id: `grp-${cluster.hub}`,
      members: [cluster.hub, ...cluster.chapters].filter((id) => {
        if (taken.has(id)) return false;
        taken.add(id);
        return true;
      }),
    }))
    .filter((group) => group.members.length > 0);
}

/** 작성법에 매달린 전부 (자기 포함) — 한 틀에 담기는 단위다 */
const craftMembers = (() => {
  const under = new Map<string, readonly string[]>(
    ideaClusters.map((cluster) => [cluster.hub, cluster.chapters]),
  );
  const seen = new Set<string>();
  const walk = (id: string) => {
    if (seen.has(id)) return;
    seen.add(id);
    for (const child of under.get(id) ?? []) walk(child);
  };
  walk("fe-craft");
  return [...seen];
})();

/**
 * 정렬 시 단계와 그 항목이 한 덩어리로 움직인다 — 이론의 subClusters와 같은 규칙.
 *
 * 허브 자신도 덩어리에 들어가야 한다. 클러스터가 있는 틀은 배치가 클러스터만
 * 보므로, 어느 덩어리에도 안 든 노드는 자리를 못 받고 데이터 좌표에 그대로
 * 그려진다 — 깊이와 상관없이 엉뚱한 열에 선다.
 * 중간 허브가 두 덩어리에 겹쳐 들어가지 않도록 한 번 나온 id는 건너뛴다.
 */
const craftGroups = [
  /* 뿌리는 혼자 한 덩어리. 일곱 단계와 함께 묶으면 그 일곱이 서로 붙어 버려
     자기 항목들과 높이가 어긋난다 — 단계는 자기 항목 옆에 서야 읽힌다 */
  { id: "grp-fe-craft", members: ["fe-craft"] },
  ...ideaClusters
    .filter((cluster) => cluster.hub.startsWith("craft-"))
    .map((cluster) => ({
      id: `grp-${cluster.hub}`,
      members: [cluster.hub, ...cluster.chapters],
    })),
];

/** 클러스터 백드랍 — 멤버 카드들의 위치에서 프레임이 계산된다 */
export const fullGraphBackdrops: GraphBackdropData[] = [
  {
    id: "bd-projects",
    label: "프로젝트",
    tint: "project",
    members: ["withy", "petfolio", "tickle"],
  },
  /* 트러블은 프로젝트별로 틀을 나눈다 — 어느 프로젝트에서 나온 글인지가
     간선뿐 아니라 틀로도 보이게. 한 노드는 최대 한 틀에만 들어간다. */
  ...projectTroubles.map(
    ({ project, troubles }): GraphBackdropData => ({
      id: `bd-troubles-${project}`,
      label: `${nodeLabel(project)} 트러블슈팅`,
      tint: "trouble",
      members: [...troubles],
    }),
  ),
  /* 생각 — 이론과 같은 모양으로 담는다. 안쪽의 작성법만 접어 두는 것도 같다.
     열여덟 항목이 첫 화면에 쏟아지면 정작 "생각이라는 갈래가 있다"가 안 읽힌다. */
  {
    id: "bd-idea",
    label: "생각",
    tint: "idea",
    members: ["bd-craft", "fe-philosophy", "dict", "bd-til"],
  },
  /* TIL — 갈래 안에서 자기 틀을 가지는 둘째. 작성법과 같은 모양으로, 접은 채 연다.
     매일 한 줄씩 늘어나는 쪽이라 펴 두면 언젠가 첫 화면이 이 목록이 된다.
     처음에 읽혀야 할 것은 목록이 아니라 「이런 갈래가 있다」다.
     클러스터를 두지 않는다 — 안에 중간 허브가 없어 y 순서만으로 충분하다. */
  {
    id: "bd-til",
    label: "TIL",
    tint: "idea",
    collapsed: true,
    members: ["til", ...tilEntries.map((entry) => entry.id)],
  },
  {
    id: "bd-craft",
    label: "코드 작성법",
    tint: "idea",
    collapsed: true,
    clusters: craftGroups,
    members: craftMembers,
  },
  /* 갈래 넷을 한 번 더 묶는다 — 프로젝트가 한 틀에 담기듯 이론도 한 자리에.
     틀 안에 틀이 들어가는 유일한 곳이다. */
  {
    id: "bd-theory",
    label: "이론",
    tint: "theory",
    members: techRoots.map(({ root }) => `bd-${root}`),
  },
  /* 기술은 갈래마다 틀을 따로 둔다 — 문서 목차가 통째로 들어가 하나로는 너무
     커졌고, 접었다 펴는 단위도 갈래여야 한다. */
  ...techRoots.map(
    ({ root, label, collapsed }): GraphBackdropData => ({
      id: `bd-${root}`,
      label,
      tint: "theory",
      collapsed,
      /* 정렬 시 개념+챕터가 한 덩어리로 움직인다 */
      clusters: subClusters(root),
      members: techMembers(root),
    }),
  ),
];
