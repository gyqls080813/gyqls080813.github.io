/* 자동 생성 — scripts/sheet-index.mjs. 직접 고치지 말 것.
   시트 껍데기가 브라우저에서 쓰는 요약(목차·포트·머리말·열림 종류·카드 집계·글 뼈대).
   본문 모듈을 브라우저로 보내지 않으려고 빌드 때 뽑아 둔다. */
import type { GraphNodeData } from "@/components/graph/types";
import type { NodeOpenKind } from "../nodeTarget";
import type { NavItem, Port } from "../sheet";

export type PostOutline = {
  id: string;
  title: string;
  date: string;
  project: string;
  theories: string[];
};

/** 카드에 덧붙는 집계 — lib/annotatedGraph가 본문을 보고 붙인 값 */
export type NodeAnnotation = Pick<GraphNodeData, "clickable" | "meta" | "dateLabel">;

export const sheetIndex: {
  openKind: Record<string, NodeOpenKind>;
  nav: Record<string, NavItem[]>;
  ports: Record<string, { left: Port[]; right: Port[] }>;
  crumbs: Record<string, string[]>;
  annotations: Record<string, NodeAnnotation>;
  posts: PostOutline[];
} = {
  "openKind": {
    "me": "intro",
    "withy": "project",
    "petfolio": "project",
    "tickle": "project",
    "dict": "dict",
    "algo-bruteforce": "idea",
    "swea-5188": "idea",
    "til-2026-09-15": "til",
    "til-2026-09-02": "til",
    "craft-url": "idea",
    "craft-request": "idea",
    "craft-4state": "idea",
    "craft-cache": "idea",
    "craft-colocation": "idea",
    "craft-flow": "idea",
    "craft-composition": "idea",
    "craft-contract": "idea",
    "craft-hooks": "idea",
    "craft-strategy": "idea",
    "craft-rerender": "idea",
    "craft-timing": "idea",
    "craft-concurrency": "idea",
    "craft-error": "idea",
    "craft-trust": "idea",
    "craft-perf": "idea",
    "craft-a11y": "idea",
    "craft-observe": "idea",
    "react": "theory",
    "rl": "theory",
    "rl-start": "theory",
    "rl-start-quick": "theory",
    "rl-start-install": "theory",
    "rl-start-setup": "theory",
    "rl-start-compiler": "theory",
    "rl-learn": "theory",
    "rl-ui": "theory",
    "rl-interact": "theory",
    "rl-state": "theory",
    "rl-escape": "theory",
    "ra": "theory",
    "ra-react": "theory",
    "ra-react-hooks": "theory",
    "ra-react-components": "theory",
    "ra-react-apis": "theory",
    "ra-dom": "theory",
    "ra-dom-hooks": "theory",
    "ra-dom-components": "theory",
    "ra-dom-apis": "theory",
    "ra-dom-client": "theory",
    "ra-dom-server": "theory",
    "ra-dom-static": "theory",
    "ra-compiler": "theory",
    "ra-compiler-config": "theory",
    "ra-compiler-directives": "theory",
    "ra-devtools": "theory",
    "ra-eslint": "theory",
    "ra-eslint-lints": "theory",
    "ra-rules": "theory",
    "ra-rules-overview": "theory",
    "ra-rsc": "theory",
    "ra-rsc-directives": "theory",
    "ra-legacy": "theory",
    "ra-legacy-apis": "theory",
    "js": "theory",
    "js-core": "theory",
    "js-intro": "theory",
    "js-first-steps": "theory",
    "js-quality": "theory",
    "js-object-basics": "theory",
    "js-data-types": "theory",
    "js-adv-functions": "theory",
    "js-object-props": "theory",
    "js-prototypes": "theory",
    "js-classes": "theory",
    "js-error": "theory",
    "js-async": "theory",
    "js-generators": "theory",
    "js-modules": "theory",
    "js-core-misc": "theory",
    "js-browser": "theory",
    "js-document": "theory",
    "js-events": "theory",
    "js-ui-events": "theory",
    "js-forms": "theory",
    "js-loading": "theory",
    "js-ui-misc": "theory",
    "js-extra": "theory",
    "js-frames": "theory",
    "js-binary": "theory",
    "js-network": "theory",
    "js-storage": "theory",
    "js-animation": "theory",
    "js-webcomponents": "theory",
    "js-regexp": "theory",
    "ts": "theory",
    "ts-start": "theory",
    "ts-handbook": "theory",
    "ts-hb-everyday": "theory",
    "ts-ev-primitives": "theory",
    "ts-ev-arrays": "theory",
    "ts-ev-any": "theory",
    "ts-ev-annotations": "theory",
    "ts-ev-functions": "theory",
    "ts-ev-objects": "theory",
    "ts-ev-unions": "theory",
    "ts-ev-aliases": "theory",
    "ts-ev-interfaces": "theory",
    "ts-ev-assertions": "theory",
    "ts-ev-literals": "theory",
    "ts-ev-null": "theory",
    "ts-ev-enums": "theory",
    "ts-ev-rare": "theory",
    "ts-reference": "theory",
    "ts-modules-ref": "theory",
    "ts-tutorials": "theory",
    "ts-whatsnew": "theory",
    "ts-declaration": "theory",
    "ts-js": "theory",
    "ts-config": "theory",
    "vue": "theory",
    "vg": "theory",
    "va": "theory",
    "git": "theory",
    "git-areas": "theory",
    "git-branch": "theory",
    "git-undo": "theory",
    "git-remote": "theory",
    "git-merge": "theory",
    "git-github": "theory",
    "git-practice": "theory",
    "i18n": "theory",
    "i18n-s1": "theory",
    "i18n-s2": "theory",
    "i18n-s3": "theory",
    "i18n-s4": "theory",
    "i18n-s5": "theory",
    "i18n-s6": "theory",
    "i18n-s7": "theory",
    "i18n-s8": "theory",
    "i18n-s9": "theory",
    "i18n-s10": "theory",
    "i18n-s11": "theory",
    "i18n-s12": "theory",
    "i18n-s13": "theory",
    "i18n-s14": "theory",
    "i18n-commerce-web": "idea",
    "render": "theory",
    "render-s1": "theory",
    "render-s2": "theory",
    "render-s3": "theory",
    "render-s4": "theory",
    "render-s5": "theory",
    "render-s6": "theory",
    "render-s7": "theory",
    "render-s8": "theory",
    "render-s9": "theory",
    "render-s10": "theory",
    "render-s11": "theory",
    "render-s12": "theory",
    "t-isolated": "post",
    "t-focus": "post",
    "t-sync": "post",
    "t-schema": "post",
    "t-tagged": "post",
    "t-canvas": "post",
    "t-webdriver": "post",
    "t-buffer": "post"
  },
  "nav": {
    "me": [
      {
        "id": "자기소개",
        "label": "자기소개"
      },
      {
        "id": "이력",
        "label": "이력"
      },
      {
        "id": "수상",
        "label": "수상"
      },
      {
        "id": "사용-기술",
        "label": "사용 기술"
      },
      {
        "id": "projects",
        "label": "Projects"
      },
      {
        "id": "기술-블로그",
        "label": "기술 블로그"
      }
    ],
    "withy": [
      {
        "id": "소개",
        "label": "소개"
      },
      {
        "id": "프로젝트-뷰",
        "label": "프로젝트 뷰"
      },
      {
        "id": "남의-페이지-위에서-살아-있어야-했다",
        "label": "남의 페이지 위에서 살아 있어야 했다"
      },
      {
        "id": "익스텐션은-세-곳에서-동시에-돈다",
        "label": "익스텐션은 세 곳에서 동시에 돈다"
      },
      {
        "id": "리액트를-쓰지-않은-절반",
        "label": "리액트를 쓰지 않은 절반"
      },
      {
        "id": "무엇을-맡았나",
        "label": "무엇을 맡았나"
      },
      {
        "id": "남은-것",
        "label": "남은 것"
      },
      {
        "id": "트러블-슈팅",
        "label": "트러블 슈팅"
      }
    ],
    "petfolio": [
      {
        "id": "소개",
        "label": "소개"
      },
      {
        "id": "프로젝트-뷰",
        "label": "프로젝트 뷰"
      },
      {
        "id": "우리가-만들지-않은-데이터를-다루는-화면이었다",
        "label": "우리가 만들지 않은 데이터를 다루는 화면이었다"
      },
      {
        "id": "그래서-하얀-화면이-나왔다",
        "label": "그래서 하얀 화면이 나왔다"
      },
      {
        "id": "무엇을-맡았나",
        "label": "무엇을 맡았나"
      },
      {
        "id": "남은-것",
        "label": "남은 것"
      },
      {
        "id": "트러블-슈팅",
        "label": "트러블 슈팅"
      }
    ],
    "tickle": [
      {
        "id": "소개",
        "label": "소개"
      },
      {
        "id": "프로젝트-뷰",
        "label": "프로젝트 뷰"
      },
      {
        "id": "방어를-한-겹에-몰아넣지-않았다",
        "label": "방어를 한 겹에 몰아넣지 않았다"
      },
      {
        "id": "행동-데이터는-화면을-건드리면-안-됐다",
        "label": "행동 데이터는 화면을 건드리면 안 됐다"
      },
      {
        "id": "무엇을-맡았나",
        "label": "무엇을 맡았나"
      },
      {
        "id": "남은-것",
        "label": "남은 것"
      },
      {
        "id": "트러블-슈팅",
        "label": "트러블 슈팅"
      }
    ],
    "dict": [
      {
        "id": "vue-소개-vue란-무엇인가요",
        "label": "Vue 소개 — Vue란 무엇인가요?",
        "children": [
          {
            "id": "사용자-인터페이스-user-interface-ui",
            "label": "사용자 인터페이스 (user interface, UI)"
          },
          {
            "id": "위에-구축된다-built-on-top-of",
            "label": "위에 구축된다 (built on top of)"
          },
          {
            "id": "선언적-declarative",
            "label": "선언적 (declarative)"
          },
          {
            "id": "프로그래밍-모델-programming-model",
            "label": "프로그래밍 모델 (programming model)"
          },
          {
            "id": "복잡도-complexity",
            "label": "복잡도 (complexity)"
          },
          {
            "id": "효율적으로-efficiently",
            "label": "효율적으로 (efficiently)"
          }
        ]
      },
      {
        "id": "i18n-문장을-코드에서-떼어-내는-열네-단계",
        "label": "i18n — 문장을 코드에서 떼어 내는 열네 단계",
        "children": [
          {
            "id": "i18n과-l10n-internationalization-localization",
            "label": "i18n과 l10n (internationalization, localization)"
          },
          {
            "id": "로케일-locale",
            "label": "로케일 (locale)"
          },
          {
            "id": "bcp-47",
            "label": "BCP 47"
          },
          {
            "id": "열쇠와-값-key-value",
            "label": "열쇠와 값 (key, value)"
          },
          {
            "id": "gettext-msgid-msgstr",
            "label": "gettext, msgid, msgstr"
          },
          {
            "id": "폴백-fallback",
            "label": "폴백 (fallback)"
          },
          {
            "id": "보간-interpolation",
            "label": "보간 (interpolation)"
          },
          {
            "id": "복수형-pluralization",
            "label": "복수형 (pluralization)"
          },
          {
            "id": "intl-ecma-402",
            "label": "Intl (ECMA-402)"
          },
          {
            "id": "로케일-협상-locale-negotiation",
            "label": "로케일 협상 (locale negotiation)"
          },
          {
            "id": "accept-language",
            "label": "Accept-Language"
          },
          {
            "id": "반응형-전환-reactive-locale",
            "label": "반응형 전환 (reactive locale)"
          },
          {
            "id": "전역-스코프와-로컬-스코프-global-local-scope",
            "label": "전역 스코프와 로컬 스코프 (global / local scope)"
          },
          {
            "id": "지연-로딩과-청크-lazy-loading-chunk",
            "label": "지연 로딩과 청크 (lazy loading, chunk)"
          },
          {
            "id": "메시지-컴파일러-message-compiler",
            "label": "메시지 컴파일러 (message compiler)"
          },
          {
            "id": "린트와-ci-lint-continuous-integration",
            "label": "린트와 CI (lint, continuous integration)"
          },
          {
            "id": "tms-translation-management-system",
            "label": "TMS (translation management system)"
          },
          {
            "id": "ssr과-하이드레이션-server-side-rendering-hydration",
            "label": "SSR과 하이드레이션 (server-side rendering, hydration)"
          },
          {
            "id": "요청-간-상태-오염-cross-request-state-pollution",
            "label": "요청 간 상태 오염 (cross-request state pollution)"
          },
          {
            "id": "vary-헤더",
            "label": "Vary 헤더"
          },
          {
            "id": "messageformat-2-mf2",
            "label": "MessageFormat 2 (MF2)"
          },
          {
            "id": "시간대-time-zone",
            "label": "시간대 (time zone)"
          },
          {
            "id": "intl-collator와-intl-segmenter",
            "label": "Intl.Collator와 Intl.Segmenter"
          },
          {
            "id": "한중일-통합-한자-han-unification",
            "label": "한중일 통합 한자 (Han unification)"
          },
          {
            "id": "rtl과-css-논리-속성-right-to-left-logical-properties",
            "label": "RTL과 CSS 논리 속성 (right-to-left, logical properties)"
          },
          {
            "id": "유니코드-정규화-nfc-nfd",
            "label": "유니코드 정규화 (NFC/NFD)"
          },
          {
            "id": "글자-길이-팽창-text-expansion",
            "label": "글자 길이 팽창 (text expansion)"
          },
          {
            "id": "가짜-로케일-pseudo-localization",
            "label": "가짜 로케일 (pseudo-localization)"
          },
          {
            "id": "missing-핸들러",
            "label": "missing 핸들러"
          },
          {
            "id": "열쇠-유니온-타입-message-key-union",
            "label": "열쇠 유니온 타입 (message key union)"
          },
          {
            "id": "트리-셰이킹-tree-shaking",
            "label": "트리 셰이킹 (tree-shaking)"
          },
          {
            "id": "ota-over-the-air",
            "label": "OTA (over-the-air)"
          },
          {
            "id": "in-context-편집",
            "label": "in-context 편집"
          },
          {
            "id": "리터럴-literal",
            "label": "리터럴 (literal)"
          },
          {
            "id": "죽은-열쇠-dead-key",
            "label": "죽은 열쇠 (dead key)"
          },
          {
            "id": "빈-값-empty-string",
            "label": "빈 값 (empty string)"
          },
          {
            "id": "장부가-둘-two-sources-of-truth",
            "label": "장부가 둘 (two sources of truth)"
          },
          {
            "id": "복수-규칙-pluralization-rules",
            "label": "복수 규칙 (pluralization rules)"
          },
          {
            "id": "조사-선택-을-를-이-가",
            "label": "조사 선택 (을/를, 이/가)"
          },
          {
            "id": "iso-8601-날짜-문자열과-utc",
            "label": "ISO 8601 날짜 문자열과 UTC"
          },
          {
            "id": "언어-범위-매칭-bcp-47-lookup",
            "label": "언어 범위 매칭 (BCP 47 lookup)"
          },
          {
            "id": "의존성-추적-dependency-tracking",
            "label": "의존성 추적 (dependency tracking)"
          },
          {
            "id": "콘텐츠-해시-파일-이름-content-hash",
            "label": "콘텐츠 해시 파일 이름 (content hash)"
          },
          {
            "id": "eslint-disable-주석",
            "label": "eslint-disable 주석"
          },
          {
            "id": "자동-변환-auto-format",
            "label": "자동 변환 (auto-format)"
          },
          {
            "id": "요청-스코프-request-scope",
            "label": "요청 스코프 (request scope)"
          },
          {
            "id": "검토-상태-review-state",
            "label": "검토 상태 (review state)"
          }
        ]
      },
      {
        "id": "브라우저-렌더링-주소가-픽셀이-되기까지",
        "label": "브라우저 렌더링 — 주소가 픽셀이 되기까지",
        "children": [
          {
            "id": "렌더링-rendering",
            "label": "렌더링 (rendering)"
          },
          {
            "id": "브라우저-프로세스와-렌더러-프로세스",
            "label": "브라우저 프로세스와 렌더러 프로세스"
          },
          {
            "id": "메인-스레드-main-thread",
            "label": "메인 스레드 (main thread)"
          },
          {
            "id": "사이트-격리-site-isolation",
            "label": "사이트 격리 (site isolation)"
          },
          {
            "id": "브라우징-컨텍스트-browsing-context",
            "label": "브라우징 컨텍스트 (browsing context)"
          },
          {
            "id": "realm-렘",
            "label": "realm (렘)"
          },
          {
            "id": "windowproxy",
            "label": "WindowProxy"
          },
          {
            "id": "전역-객체와-전역-렉시컬-스코프",
            "label": "전역 객체와 전역 렉시컬 스코프"
          },
          {
            "id": "이름-접근-named-access-on-window",
            "label": "이름 접근 (named access on Window)"
          },
          {
            "id": "readystate와-네-시점",
            "label": "readyState와 네 시점"
          },
          {
            "id": "호환-모드-quirks-mode-standards-mode",
            "label": "호환 모드 (quirks mode / standards mode)"
          },
          {
            "id": "토크나이저와-트리-구성-tokenizer-tree-construction",
            "label": "토크나이저와 트리 구성 (tokenizer, tree construction)"
          },
          {
            "id": "포스터-페어런팅-foster-parenting",
            "label": "포스터 페어런팅 (foster parenting)"
          },
          {
            "id": "프리로드-스캐너-preload-scanner",
            "label": "프리로드 스캐너 (preload scanner)"
          },
          {
            "id": "파싱을-막는-스크립트-parser-blocking-script",
            "label": "파싱을 막는 스크립트 (parser-blocking script)"
          },
          {
            "id": "스크립트를-막는-스타일시트-script-blocking-style-sheet",
            "label": "스크립트를 막는 스타일시트 (script-blocking style sheet)"
          },
          {
            "id": "async-defer-module",
            "label": "async / defer / module"
          },
          {
            "id": "렌더링-차단-render-blocking",
            "label": "렌더링 차단 (render-blocking)"
          },
          {
            "id": "cssom-css-object-model",
            "label": "CSSOM (CSS Object Model)"
          },
          {
            "id": "캐스케이드와-특이도-cascade-specificity",
            "label": "캐스케이드와 특이도 (cascade, specificity)"
          },
          {
            "id": "계산된-스타일-computed-style",
            "label": "계산된 스타일 (computed style)"
          },
          {
            "id": "레이아웃-트리-layout-tree",
            "label": "레이아웃 트리 (layout tree)"
          },
          {
            "id": "폭은-내려오고-높이는-올라온다",
            "label": "폭은 내려오고 높이는 올라온다"
          },
          {
            "id": "강제-동기-레이아웃과-레이아웃-스래싱",
            "label": "강제 동기 레이아웃과 레이아웃 스래싱"
          },
          {
            "id": "레이아웃-시프트-layout-shift-cls",
            "label": "레이아웃 시프트 (layout shift, CLS)"
          },
          {
            "id": "글리프-glyph-와-셰이핑-shaping",
            "label": "글리프 (glyph)와 셰이핑 (shaping)"
          },
          {
            "id": "폰트-매칭과-폴백-font-matching-fallback",
            "label": "폰트 매칭과 폴백 (font matching, fallback)"
          },
          {
            "id": "word-break-keep-all과-overflow-wrap-anywhere",
            "label": "word-break: keep-all과 overflow-wrap: anywhere"
          },
          {
            "id": "font-display와-foit-fout",
            "label": "font-display와 FOIT / FOUT"
          },
          {
            "id": "페인트-레코드와-레이어-paint-record-compositing-layer",
            "label": "페인트 레코드와 레이어 (paint record, compositing layer)"
          },
          {
            "id": "래스터와-합성-rasterization-compositing",
            "label": "래스터와 합성 (rasterization, compositing)"
          },
          {
            "id": "태스크와-마이크로태스크-task-microtask",
            "label": "태스크와 마이크로태스크 (task, microtask)"
          },
          {
            "id": "렌더링-기회와-requestanimationframe",
            "label": "렌더링 기회와 requestAnimationFrame"
          },
          {
            "id": "긴-태스크-long-task",
            "label": "긴 태스크 (long task)"
          },
          {
            "id": "교차-출처-속성-cross-origin-properties",
            "label": "교차 출처 속성 (cross-origin properties)"
          },
          {
            "id": "postmessage",
            "label": "postMessage"
          },
          {
            "id": "가상-dom과-패치-virtual-dom-patch",
            "label": "가상 DOM과 패치 (virtual DOM, patch)"
          },
          {
            "id": "하이드레이션-hydration",
            "label": "하이드레이션 (hydration)"
          }
        ]
      },
      {
        "id": "javascript-javascript-info-를-따라-읽은-스물일곱-챕터",
        "label": "JavaScript — javascript.info 를 따라 읽은 스물일곱 챕터",
        "children": [
          {
            "id": "엔진-명세서-호스트",
            "label": "엔진 · 명세서 · 호스트"
          },
          {
            "id": "엄격-모드-use-strict",
            "label": "엄격 모드 ('use strict')"
          },
          {
            "id": "형-변환-type-conversion",
            "label": "형 변환 (type conversion)"
          },
          {
            "id": "동등-과-일치",
            "label": "동등 (==)과 일치 (===)"
          },
          {
            "id": "호이스팅-hoisting-과-tdz",
            "label": "호이스팅 (hoisting)과 TDZ"
          },
          {
            "id": "참조-reference-와-얕은-깊은-복사",
            "label": "참조 (reference)와 얕은·깊은 복사"
          },
          {
            "id": "this",
            "label": "this"
          },
          {
            "id": "클로저-closure-와-렉시컬-환경",
            "label": "클로저 (closure)와 렉시컬 환경"
          },
          {
            "id": "래퍼-객체-wrapper-object",
            "label": "래퍼 객체 (wrapper object)"
          },
          {
            "id": "sort의-기본-비교",
            "label": "sort의 기본 비교"
          },
          {
            "id": "map-set-weakmap",
            "label": "Map · Set · WeakMap"
          },
          {
            "id": "프로퍼티-설명자-property-descriptor-와-접근자",
            "label": "프로퍼티 설명자 (property descriptor)와 접근자"
          },
          {
            "id": "prototype-과-f-prototype",
            "label": "[[Prototype]]과 F.prototype"
          },
          {
            "id": "클래스-class",
            "label": "클래스 (class)"
          },
          {
            "id": "try-catch와-비동기-에러",
            "label": "try..catch와 비동기 에러"
          },
          {
            "id": "커스텀-에러와-다시-던지기",
            "label": "커스텀 에러와 다시 던지기"
          },
          {
            "id": "프라미스-promise",
            "label": "프라미스 (Promise)"
          },
          {
            "id": "마이크로태스크-큐-microtask-queue",
            "label": "마이크로태스크 큐 (microtask queue)"
          },
          {
            "id": "async-await",
            "label": "async / await"
          },
          {
            "id": "제너레이터-generator-와-이터레이터-프로토콜",
            "label": "제너레이터 (generator)와 이터레이터 프로토콜"
          },
          {
            "id": "모듈-module-과-import-export",
            "label": "모듈 (module)과 import/export"
          },
          {
            "id": "proxy와-reflect",
            "label": "Proxy와 Reflect"
          },
          {
            "id": "속성-attribute-과-프로퍼티-property",
            "label": "속성 (attribute)과 프로퍼티 (property)"
          },
          {
            "id": "offsetwidth-clientwidth-scrollwidth",
            "label": "offsetWidth · clientWidth · scrollWidth"
          },
          {
            "id": "캡처-capturing-와-버블-bubbling",
            "label": "캡처 (capturing)와 버블 (bubbling)"
          },
          {
            "id": "이벤트-위임-event-delegation",
            "label": "이벤트 위임 (event delegation)"
          },
          {
            "id": "기본-동작-default-action-과-preventdefault",
            "label": "기본 동작 (default action)과 preventDefault"
          },
          {
            "id": "input-이벤트와-change-이벤트",
            "label": "input 이벤트와 change 이벤트"
          },
          {
            "id": "form-submit-requestsubmit-submit-이벤트",
            "label": "form.submit() · requestSubmit() · submit 이벤트"
          },
          {
            "id": "domcontentloaded-load-beforeunload",
            "label": "DOMContentLoaded · load · beforeunload"
          },
          {
            "id": "mutationobserver",
            "label": "MutationObserver"
          },
          {
            "id": "동일-출처-정책-same-origin-policy-과-postmessage",
            "label": "동일 출처 정책 (Same Origin Policy)과 postMessage"
          },
          {
            "id": "arraybuffer와-뷰-view",
            "label": "ArrayBuffer와 뷰 (view)"
          },
          {
            "id": "fetch의-두-단계와-response-ok",
            "label": "fetch의 두 단계와 response.ok"
          },
          {
            "id": "cors와-프리플라이트",
            "label": "CORS와 프리플라이트"
          },
          {
            "id": "쿠키-localstorage-indexeddb",
            "label": "쿠키 · localStorage · IndexedDB"
          },
          {
            "id": "requestanimationframe과-시간-기반-애니메이션",
            "label": "requestAnimationFrame과 시간 기반 애니메이션"
          },
          {
            "id": "커스텀-엘리먼트와-shadow-dom",
            "label": "커스텀 엘리먼트와 Shadow DOM"
          },
          {
            "id": "파국적-백트래킹-catastrophic-backtracking",
            "label": "파국적 백트래킹 (catastrophic backtracking)"
          },
          {
            "id": "정규식과-한글-w-b-u-플래그",
            "label": "정규식과 한글: \\w · \\b · u 플래그"
          }
        ]
      },
      {
        "id": "react-react-dev-의-배우기와-참고서를-따라-읽은-서른여섯-장",
        "label": "React — react.dev 의 배우기와 참고서를 따라 읽은 서른여섯 장",
        "children": [
          {
            "id": "렌더-render-와-커밋-commit",
            "label": "렌더 (render)와 커밋 (commit)"
          },
          {
            "id": "순수-컴포넌트-pure-component",
            "label": "순수 컴포넌트 (pure component)"
          },
          {
            "id": "스냅샷-snapshot-으로서의-state",
            "label": "스냅샷 (snapshot)으로서의 state"
          },
          {
            "id": "묶음-갱신-batching",
            "label": "묶음 갱신 (batching)"
          },
          {
            "id": "key",
            "label": "key"
          },
          {
            "id": "제어-컴포넌트-controlled-와-비제어-uncontrolled",
            "label": "제어 컴포넌트 (controlled)와 비제어 (uncontrolled)"
          },
          {
            "id": "effect-와-동기화",
            "label": "Effect 와 동기화"
          },
          {
            "id": "uselayouteffect",
            "label": "useLayoutEffect"
          },
          {
            "id": "useeffectevent",
            "label": "useEffectEvent"
          },
          {
            "id": "ref",
            "label": "ref"
          },
          {
            "id": "디스패처-dispatcher-와-훅-순서",
            "label": "디스패처 (dispatcher)와 훅 순서"
          },
          {
            "id": "전환-transition-과-액션-action",
            "label": "전환 (Transition)과 액션 (Action)"
          },
          {
            "id": "usedeferredvalue",
            "label": "useDeferredValue"
          },
          {
            "id": "suspense-경계-boundary",
            "label": "Suspense 경계 (boundary)"
          },
          {
            "id": "use",
            "label": "use"
          },
          {
            "id": "strictmode",
            "label": "StrictMode"
          },
          {
            "id": "memo-와-얕은-비교",
            "label": "memo 와 얕은 비교"
          },
          {
            "id": "lazy-와-코드-분할",
            "label": "lazy 와 코드 분할"
          },
          {
            "id": "하이드레이션-hydration-과-불일치",
            "label": "하이드레이션 (hydration)과 불일치"
          },
          {
            "id": "포털-portal",
            "label": "포털 (portal)"
          },
          {
            "id": "flushsync",
            "label": "flushSync"
          },
          {
            "id": "precedence-와-리소스-호이스팅",
            "label": "precedence 와 리소스 호이스팅"
          },
          {
            "id": "셸-shell-과-스트리밍-ssr",
            "label": "셸 (shell)과 스트리밍 SSR"
          },
          {
            "id": "prerender-와-postponed",
            "label": "prerender 와 postponed"
          },
          {
            "id": "useformstatus-와-폼-액션",
            "label": "useFormStatus 와 폼 액션"
          },
          {
            "id": "react-컴파일러와-자동-메모이제이션",
            "label": "React 컴파일러와 자동 메모이제이션"
          },
          {
            "id": "use-memo-와-use-no-memo",
            "label": "'use memo' 와 'use no memo'"
          },
          {
            "id": "게이팅-gating",
            "label": "게이팅 (gating)"
          },
          {
            "id": "컴파일러-진단-compiler-diagnostics-과-린트",
            "label": "컴파일러 진단 (compiler diagnostics)과 린트"
          },
          {
            "id": "연쇄-렌더-cascading-render",
            "label": "연쇄 렌더 (cascading render)"
          },
          {
            "id": "레인-lane-과-performance-트랙",
            "label": "레인 (lane)과 Performance 트랙"
          },
          {
            "id": "react-규칙-rules-of-react",
            "label": "React 규칙 (Rules of React)"
          },
          {
            "id": "서버-컴포넌트-server-component",
            "label": "서버 컴포넌트 (Server Component)"
          },
          {
            "id": "use-client-와-직렬화-경계",
            "label": "'use client' 와 직렬화 경계"
          },
          {
            "id": "서버-함수-use-server",
            "label": "서버 함수 ('use server')"
          },
          {
            "id": "레거시-api-legacy",
            "label": "레거시 API (legacy)"
          }
        ]
      }
    ],
    "algo-bruteforce": [
      {
        "id": "1-이-기법이-답하는-문제",
        "label": "1. 이 기법이 답하는 문제",
        "children": [
          {
            "id": "1-이-기법이-답하는-문제--세는-것이-먼저다",
            "label": "세는 것이 먼저다"
          },
          {
            "id": "1-이-기법이-답하는-문제--빠뜨리지-않는-것이-전부다",
            "label": "빠뜨리지 않는 것이 전부다"
          }
        ]
      },
      {
        "id": "2-만드는-방법",
        "label": "2. 만드는 방법",
        "children": [
          {
            "id": "2-만드는-방법--중첩-반복문-고르는-개수가-고정일-때",
            "label": "중첩 반복문 — 고르는 개수가 고정일 때"
          },
          {
            "id": "2-만드는-방법--재귀-고르는-개수가-변할-때",
            "label": "재귀 — 고르는 개수가 변할 때"
          },
          {
            "id": "2-만드는-방법--비트마스크-넣거나-빼거나-둘-중-하나일-때",
            "label": "비트마스크 — 넣거나 빼거나 둘 중 하나일 때"
          },
          {
            "id": "2-만드는-방법--순열과-조합-순서가-답을-바꾸나",
            "label": "순열과 조합 — 순서가 답을 바꾸나"
          },
          {
            "id": "2-만드는-방법--bfs-dfs-다음-경우가-지금-경우에서-한-걸음일-때",
            "label": "BFS / DFS — 다음 경우가 지금 경우에서 한 걸음일 때"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--먼저-곱해-본다",
            "label": "먼저 곱해 본다"
          },
          {
            "id": "3-선택-기준--제한이-곧-힌트다",
            "label": "제한이 곧 힌트다"
          },
          {
            "id": "3-선택-기준--작으면-완전탐색이-정답이다",
            "label": "작으면 완전탐색이 정답이다"
          },
          {
            "id": "3-선택-기준--넘치면-무엇을-안-세도-되는지를-찾는다",
            "label": "넘치면 무엇을 안 세도 되는지를 찾는다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--재귀-한-틀",
            "label": "재귀 한 틀"
          },
          {
            "id": "4-도구--비트-연산-세-줄",
            "label": "비트 연산 세 줄"
          },
          {
            "id": "4-도구--언어가-주는-것",
            "label": "언어가 주는 것"
          },
          {
            "id": "4-도구--무작위-입력으로-맞춰-보기",
            "label": "무작위 입력으로 맞춰 보기"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--세어-보지-않고-짠다",
            "label": "세어 보지 않고 짠다"
          },
          {
            "id": "5-안티패턴--가지치기를-최적화로-안다",
            "label": "가지치기를 최적화로 안다"
          },
          {
            "id": "5-안티패턴--같은-경우를-여러-번-센다",
            "label": "같은 경우를 여러 번 센다"
          },
          {
            "id": "5-안티패턴--되돌리기를-빠뜨린다",
            "label": "되돌리기를 빠뜨린다"
          },
          {
            "id": "5-안티패턴--다-만들어-놓고-고른다",
            "label": "다 만들어 놓고 고른다"
          }
        ]
      }
    ],
    "swea-5188": [
      {
        "id": "1-문제",
        "label": "1. 문제",
        "children": [
          {
            "id": "1-문제--무엇을-구하나",
            "label": "무엇을 구하나"
          },
          {
            "id": "1-문제--제약이-곧-힌트다",
            "label": "제약이 곧 힌트다"
          }
        ]
      },
      {
        "id": "2-완전탐색으로-되나",
        "label": "2. 완전탐색으로 되나",
        "children": [
          {
            "id": "2-완전탐색으로-되나--경로를-센다",
            "label": "경로를 센다"
          },
          {
            "id": "2-완전탐색으로-되나--어디까지-버티나",
            "label": "어디까지 버티나"
          }
        ]
      },
      {
        "id": "3-답",
        "label": "3. 답",
        "children": [
          {
            "id": "3-답--재귀-하나로-끝난다",
            "label": "재귀 하나로 끝난다"
          },
          {
            "id": "3-답--도착하면-멈춘다",
            "label": "도착하면 멈춘다"
          }
        ]
      },
      {
        "id": "4-틀렸던-자리",
        "label": "4. 틀렸던 자리",
        "children": [
          {
            "id": "4-틀렸던-자리--격자를-문자열로-읽었다",
            "label": "격자를 문자열로 읽었다"
          },
          {
            "id": "4-틀렸던-자리--제자리에서-자기를-불렀다-recursionerror",
            "label": "제자리에서 자기를 불렀다 — RecursionError"
          },
          {
            "id": "4-틀렸던-자리--이동을-반복문으로-만들었다",
            "label": "이동을 반복문으로 만들었다"
          },
          {
            "id": "4-틀렸던-자리--바깥-변수를-함수에서-고쳤다-unboundlocalerror",
            "label": "바깥 변수를 함수에서 고쳤다 — UnboundLocalError"
          },
          {
            "id": "4-틀렸던-자리--읽는-자와-검사하는-자가-달랐다-indexerror",
            "label": "읽는 자와 검사하는 자가 달랐다 — IndexError"
          },
          {
            "id": "4-틀렸던-자리--지금-칸을-두-번-셌다",
            "label": "지금 칸을 두 번 셌다"
          }
        ]
      },
      {
        "id": "5-더-줄인다면",
        "label": "5. 더 줄인다면",
        "children": [
          {
            "id": "5-더-줄인다면--가지치기-한-줄",
            "label": "가지치기 한 줄"
          },
          {
            "id": "5-더-줄인다면--겹쳐-세던-것을-지우면-dp",
            "label": "겹쳐 세던 것을 지우면 DP"
          }
        ]
      }
    ],
    "til-2026-09-15": [
      {
        "id": "보이는데-눌리지-않는다",
        "label": "보이는데 눌리지 않는다"
      },
      {
        "id": "모달은-dom-포함관계로-안과-밖을-나눈다",
        "label": "모달은 DOM 포함관계로 안과 밖을 나눈다"
      },
      {
        "id": "pointer-events는-상속된다",
        "label": "pointer-events는 상속된다"
      },
      {
        "id": "포인터를-풀어도-포커스가-남는다",
        "label": "포인터를 풀어도 포커스가 남는다"
      },
      {
        "id": "진짜-원인-전제가-바뀌었다",
        "label": "진짜 원인 — 전제가 바뀌었다"
      }
    ],
    "til-2026-09-02": [
      {
        "id": "무엇을-limbo라고-부르는가",
        "label": "무엇을 limbo라고 부르는가"
      },
      {
        "id": "이름을-찾다가-안-나왔다",
        "label": "이름을 찾다가 안 나왔다"
      },
      {
        "id": "왜-생기는가-여기까지-판-것",
        "label": "왜 생기는가 — 여기까지 판 것"
      },
      {
        "id": "내-코드에서-확인한-것",
        "label": "내 코드에서 확인한 것"
      },
      {
        "id": "여기서-멈췄다-다음-걸음",
        "label": "여기서 멈췄다 — 다음 걸음"
      }
    ],
    "craft-url": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--질문은-둘이고-순서가-있다",
            "label": "질문은 둘이고 순서가 있다"
          },
          {
            "id": "1-이-단계의-의사결정--담으면-얻는-것",
            "label": "담으면 얻는 것"
          },
          {
            "id": "1-이-단계의-의사결정--담으면-치르는-값",
            "label": "담으면 치르는 값"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--url에-안-둔다-여기서-먼저-갈린다",
            "label": "URL에 안 둔다 — 여기서 먼저 갈린다"
          },
          {
            "id": "2-선택지--path-무엇을-보는지",
            "label": "path — 무엇을 보는지"
          },
          {
            "id": "2-선택지--query-어떻게-보는지",
            "label": "query — 어떻게 보는지"
          },
          {
            "id": "2-선택지--hash-서버는-몰라도-되는-위치",
            "label": "hash — 서버는 몰라도 되는 위치"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--판별-순서",
            "label": "판별 순서"
          },
          {
            "id": "3-선택-기준--주인은-하나여야-한다",
            "label": "주인은 하나여야 한다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--path를-골랐다면",
            "label": "path를 골랐다면"
          },
          {
            "id": "4-도구--query를-골랐다면",
            "label": "query를 골랐다면"
          },
          {
            "id": "4-도구--hash를-골랐다면",
            "label": "hash를 골랐다면"
          },
          {
            "id": "4-도구--안-두기로-했다면",
            "label": "안 두기로 했다면"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--식별자를-query에-필터를-path에",
            "label": "식별자를 query에, 필터를 path에"
          },
          {
            "id": "5-안티패턴--필터와-탭이-url에-없다",
            "label": "필터와 탭이 URL에 없다"
          },
          {
            "id": "5-안티패턴--민감한-값을-url에",
            "label": "민감한 값을 URL에"
          },
          {
            "id": "5-안티패턴--url과-state에-이중-보관하고-effect로-동기화",
            "label": "URL과 state에 이중 보관하고 effect로 동기화"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-검색-검색어의-주인이-셋이었다",
            "label": "Tickle 검색 — 검색어의 주인이 셋이었다"
          },
          {
            "id": "실제로-부딪힌-곳--실수가-아니라-우회였다",
            "label": "실수가 아니라 우회였다"
          },
          {
            "id": "실제로-부딪힌-곳--고친-방법-입력-중과-확정을-나눴다",
            "label": "고친 방법 — 입력 중과 확정을 나눴다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-상세-단계를-history-state에만-뒀다",
            "label": "Tickle 상세 — 단계를 history.state에만 뒀다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-상세-detail-id",
            "label": "Tickle 상세 — /detail?id="
          },
          {
            "id": "실제로-부딪힌-곳--잘-된-자리-카카오-토큰은-hash로-redirect는-검증하고",
            "label": "잘 된 자리 — 카카오 토큰은 hash로, redirect는 검증하고"
          }
        ]
      }
    ],
    "craft-request": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--무엇으로-어디서",
            "label": "무엇으로, 어디서"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--useeffect-fetch-직접",
            "label": "useEffect + fetch — 직접"
          },
          {
            "id": "2-선택지--서버상태-라이브러리-react-query-swr",
            "label": "서버상태 라이브러리 — react-query, SWR"
          },
          {
            "id": "2-선택지--서버-컴포넌트에서-fetch",
            "label": "서버 컴포넌트에서 fetch"
          },
          {
            "id": "2-선택지--공통-클라이언트-래퍼-위-어느-것과도-함께",
            "label": "공통 클라이언트 래퍼 — 위 어느 것과도 함께"
          },
          {
            "id": "2-선택지--한-번-받기가-아니라-계속-받기",
            "label": "한 번 받기가 아니라 계속 받기"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--판별-한-줄",
            "label": "판별 한 줄"
          },
          {
            "id": "3-선택-기준--썼다-가-아니라-맞다고-판단했다",
            "label": "'썼다'가 아니라 '맞다고 판단했다'"
          },
          {
            "id": "3-선택-기준--한-화면-안에서도-갈린다",
            "label": "한 화면 안에서도 갈린다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--서버상태-라이브러리를-골랐다면",
            "label": "서버상태 라이브러리를 골랐다면"
          },
          {
            "id": "4-도구--공통-클라이언트를-만든다면",
            "label": "공통 클라이언트를 만든다면"
          },
          {
            "id": "4-도구--직접-fetch가-불가피하다면",
            "label": "직접 fetch가 불가피하다면"
          },
          {
            "id": "4-도구--계속-받기를-골랐다면",
            "label": "계속 받기를 골랐다면"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--컴포넌트마다-raw-fetch",
            "label": "컴포넌트마다 raw fetch"
          },
          {
            "id": "5-안티패턴--서버-데이터를-useeffect와-usestate로-관리",
            "label": "서버 데이터를 useEffect와 useState로 관리"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-규칙을-바꿀-자리를-하나로",
            "label": "Tickle — 규칙을 바꿀 자리를 하나로"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-한-화면에서-방식을-셋으로-나눴다",
            "label": "Tickle 좌석 — 한 화면에서 방식을 셋으로 나눴다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-상세-떠나면서-보내는-요청",
            "label": "Tickle 상세 — 떠나면서 보내는 요청"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-행동-수집-모아서-한-번",
            "label": "Tickle 행동 수집 — 모아서 한 번"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-봇-탐지-신원은-캐시하고-신고는-한-번만",
            "label": "Tickle 봇 탐지 — 신원은 캐시하고 신고는 한 번만"
          },
          {
            "id": "실제로-부딪힌-곳--withy-소켓은-한-곳만-연다",
            "label": "WITHY — 소켓은 한 곳만 연다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-같은-파싱을-두-번-만들었다",
            "label": "WITHY — 같은 파싱을 두 번 만들었다"
          }
        ]
      }
    ],
    "craft-4state": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--고르는-것이-아니라-빠뜨리지-않는-것",
            "label": "고르는 것이 아니라 빠뜨리지 않는 것"
          }
        ]
      },
      {
        "id": "2-다뤄야-할-항목",
        "label": "2. 다뤄야 할 항목",
        "children": [
          {
            "id": "2-다뤄야-할-항목--loading-요청-중-데이터는-아직-없다",
            "label": "Loading — 요청 중, 데이터는 아직 없다"
          },
          {
            "id": "2-다뤄야-할-항목--error-4xx-5xx-네트워크-끊김",
            "label": "Error — 4xx, 5xx, 네트워크 끊김"
          },
          {
            "id": "2-다뤄야-할-항목--empty-성공했지만-결과가-0건",
            "label": "Empty — 성공했지만 결과가 0건"
          },
          {
            "id": "2-다뤄야-할-항목--success-데이터-도착",
            "label": "Success — 데이터 도착"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--empty와-loading은-반드시-갈라야-한다",
            "label": "Empty와 Loading은 반드시 갈라야 한다"
          },
          {
            "id": "3-선택-기준--그-화면에-없는-상태도-있다",
            "label": "그 화면에 없는 상태도 있다"
          },
          {
            "id": "3-선택-기준--에러는-어디에-그릴지까지가-결정이다",
            "label": "에러는 어디에 그릴지까지가 결정이다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--상태를-판별할-때",
            "label": "상태를 판별할 때"
          },
          {
            "id": "4-도구--로딩을-그릴-때",
            "label": "로딩을 그릴 때"
          },
          {
            "id": "4-도구--에러를-그릴-때",
            "label": "에러를 그릴 때"
          },
          {
            "id": "4-도구--빈-상태를-그릴-때",
            "label": "빈 상태를 그릴 때"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--로딩-가드-없이-목록을-순회",
            "label": "로딩 가드 없이 목록을 순회"
          },
          {
            "id": "5-안티패턴--에러를-콘솔에만-남기기",
            "label": "에러를 콘솔에만 남기기"
          },
          {
            "id": "5-안티패턴--빈-결과와-로딩을-하나로-뭉개기",
            "label": "빈 결과와 로딩을 하나로 뭉개기"
          },
          {
            "id": "5-안티패턴--실패를-성공으로-적기",
            "label": "실패를 성공으로 적기"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-검색-안-보내는-것부터",
            "label": "Tickle 검색 — 안 보내는 것부터"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-대기열-빈-상태가-없는-화면",
            "label": "Tickle 대기열 — 빈 상태가 없는 화면"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-취소표-알림창을-토스트로-바꾼-이유",
            "label": "Tickle 취소표 — 알림창을 토스트로 바꾼 이유"
          },
          {
            "id": "실제로-부딪힌-곳--withy-역할-판정-로딩을-권한으로-읽었다",
            "label": "WITHY 역할 판정 — 로딩을 권한으로 읽었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-빈-화면이-둘이었다",
            "label": "WITHY 채팅 — 빈 화면이 둘이었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-대기방-실패를-조금-늦게-그리기",
            "label": "WITHY 대기방 — 실패를 조금 늦게 그리기"
          }
        ]
      }
    ],
    "craft-cache": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--신선하다고-볼-기간과-다시-볼-시점",
            "label": "신선하다고 볼 기간과 다시 볼 시점"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--길게-믿기",
            "label": "길게 믿기"
          },
          {
            "id": "2-선택지--짧게-믿거나-안-믿기",
            "label": "짧게 믿거나 안 믿기"
          },
          {
            "id": "2-선택지--사건이-생기면-다시-보기",
            "label": "사건이 생기면 다시 보기"
          },
          {
            "id": "2-선택지--쓰고-나서-무효화하기",
            "label": "쓰고 나서 무효화하기"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--누가-바꾸는가",
            "label": "누가 바꾸는가"
          },
          {
            "id": "3-선택-기준--같은-소스는-같은-수명으로",
            "label": "같은 소스는 같은 수명으로"
          },
          {
            "id": "3-선택-기준--0에도-이유가-있어야-한다",
            "label": "0에도 이유가 있어야 한다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--신선도를-정할-때",
            "label": "신선도를 정할 때"
          },
          {
            "id": "4-도구--기준을-이름으로-만들-때",
            "label": "기준을 이름으로 만들 때"
          },
          {
            "id": "4-도구--다시-볼-시점을-정할-때",
            "label": "다시 볼 시점을 정할 때"
          },
          {
            "id": "4-도구--쓰고-나서-갱신할-때",
            "label": "쓰고 나서 갱신할 때"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--전부-기본값",
            "label": "전부 기본값"
          },
          {
            "id": "5-안티패턴--수정했는데-목록이-그대로",
            "label": "수정했는데 목록이 그대로"
          },
          {
            "id": "5-안티패턴--0-남발",
            "label": "0 남발"
          },
          {
            "id": "5-안티패턴--같은-소스를-다른-수명으로",
            "label": "같은 소스를 다른 수명으로"
          },
          {
            "id": "5-안티패턴--주석과-값이-다름",
            "label": "주석과 값이 다름"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-홈-네-목록에-네-개의-수명",
            "label": "Tickle 홈 — 네 목록에 네 개의 수명"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-마이페이지-전부-0이었다",
            "label": "Tickle 마이페이지 — 전부 0이었다"
          },
          {
            "id": "실제로-부딪힌-곳--고친-방법-숫자가-아니라-기준을-만들었다",
            "label": "고친 방법 — 숫자가 아니라 기준을 만들었다"
          },
          {
            "id": "실제로-부딪힌-곳--이-결정이-앞-단계에-기댄다",
            "label": "이 결정이 앞 단계에 기댄다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-검색-아직-못-고친-자리",
            "label": "Tickle 검색 — 아직 못 고친 자리"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-0이-정답인-자리",
            "label": "Tickle 좌석 — 0이 정답인 자리"
          },
          {
            "id": "실제로-부딪힌-곳--withy-홈-주석과-값이-달랐다",
            "label": "WITHY 홈 — 주석과 값이 달랐다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-참여자-목록-한-키를-같이-보기",
            "label": "WITHY 참여자 목록 — 한 키를 같이 보기"
          }
        ]
      }
    ],
    "craft-colocation": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--주인을-어디에-둘-것인가",
            "label": "주인을 어디에 둘 것인가"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--로컬-이-컴포넌트만-쓴다",
            "label": "로컬 — 이 컴포넌트만 쓴다"
          },
          {
            "id": "2-선택지--부모로-올리기-형제가-같이-쓴다",
            "label": "부모로 올리기 — 형제가 같이 쓴다"
          },
          {
            "id": "2-선택지--전역-스토어-멀리-떨어진-곳들이-쓴다",
            "label": "전역 스토어 — 멀리 떨어진 곳들이 쓴다"
          },
          {
            "id": "2-선택지--서버상태-서버가-주인이다",
            "label": "서버상태 — 서버가 주인이다"
          },
          {
            "id": "2-선택지--url-공유하고-새로고침해도-남아야-한다",
            "label": "URL — 공유하고 새로고침해도 남아야 한다"
          },
          {
            "id": "2-선택지--상태가-아닌-것-ref-클래스-필드-dom-속성",
            "label": "상태가 아닌 것 — ref, 클래스 필드, DOM 속성"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--판별-순서",
            "label": "판별 순서"
          },
          {
            "id": "3-선택-기준--최소-범위로-시작한다",
            "label": "최소 범위로 시작한다"
          },
          {
            "id": "3-선택-기준--편해서는-이유가-아니다",
            "label": "편해서는 이유가 아니다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--로컬과-올리기",
            "label": "로컬과 올리기"
          },
          {
            "id": "4-도구--전역",
            "label": "전역"
          },
          {
            "id": "4-도구--서버상태",
            "label": "서버상태"
          },
          {
            "id": "4-도구--상태가-아닌-값",
            "label": "상태가 아닌 값"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--props를-로컬-state로-복사한-뒤-맞추기",
            "label": "props를 로컬 state로 복사한 뒤 맞추기"
          },
          {
            "id": "5-안티패턴--서버-데이터를-전역-스토어에-복사",
            "label": "서버 데이터를 전역 스토어에 복사"
          },
          {
            "id": "5-안티패턴--한-화면만-쓰는-값을-전역에",
            "label": "한 화면만 쓰는 값을 전역에"
          },
          {
            "id": "5-안티패턴--같은-개념을-세-곳에-두고-서로-보조하게-하기",
            "label": "같은 개념을 세 곳에 두고 서로 보조하게 하기"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-화면에-나오는-것만-상태로",
            "label": "Tickle — 화면에 나오는 것만 상태로"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-행동-수집-아예-react-밖에-뒀다",
            "label": "Tickle 행동 수집 — 아예 React 밖에 뒀다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-예매자-정보-복사와-동기화가-데이터를-지웠다",
            "label": "Tickle 예매자 정보 — 복사와 동기화가 데이터를 지웠다"
          },
          {
            "id": "실제로-부딪힌-곳--고친-방법-처음-한-번만-채운다",
            "label": "고친 방법 — 처음 한 번만 채운다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-찜-한-값이-세-곳에-있었다",
            "label": "Tickle 찜 — 한 값이 세 곳에 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-상세-상태와-ref를-함께-들고-있었다",
            "label": "Tickle 상세 — 상태와 ref를 함께 들고 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-대기방-방장-여부가-세-곳에-있었다",
            "label": "WITHY 대기방 — 방장 여부가 세 곳에 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-역할-같은-개념이-두-형태로",
            "label": "WITHY 역할 — 같은 개념이 두 형태로"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-상한이-한쪽에만-걸려-있었다",
            "label": "WITHY 채팅 — 상한이 한쪽에만 걸려 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-백그라운드-사라져도-되는-것과-안-되는-것",
            "label": "WITHY 백그라운드 — 사라져도 되는 것과 안 되는 것"
          }
        ]
      }
    ],
    "craft-flow": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--무엇을-어느-방향으로",
            "label": "무엇을 어느 방향으로"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--값-props-부모에서-자식으로",
            "label": "값 props — 부모에서 자식으로"
          },
          {
            "id": "2-선택지--콜백-props-자식에서-부모로",
            "label": "콜백 props — 자식에서 부모로"
          },
          {
            "id": "2-선택지--함수-props-계산을-자식에게-맡긴다",
            "label": "함수 props — 계산을 자식에게 맡긴다"
          },
          {
            "id": "2-선택지--children과-render-props-구조-자체를-넘긴다",
            "label": "children과 render props — 구조 자체를 넘긴다"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--단방향을-지킨다",
            "label": "단방향을 지킨다"
          },
          {
            "id": "3-선택-기준--값이냐-함수냐",
            "label": "값이냐 함수냐"
          },
          {
            "id": "3-선택-기준--같은-흐름을-두-번-쓰지-않는다",
            "label": "같은 흐름을 두 번 쓰지 않는다"
          },
          {
            "id": "3-선택-기준--로직은-하나-표현은-화면별로",
            "label": "로직은 하나, 표현은 화면별로"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--값과-요청",
            "label": "값과 요청"
          },
          {
            "id": "4-도구--서버-모양과-화면-모양을-가르는-매퍼",
            "label": "서버 모양과 화면 모양을 가르는 매퍼"
          },
          {
            "id": "4-도구--계산-위임",
            "label": "계산 위임"
          },
          {
            "id": "4-도구--깊이-문제는-구조로",
            "label": "깊이 문제는 구조로"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--자식이-부모의-상태-변경-함수를-직접-부른다",
            "label": "자식이 부모의 상태 변경 함수를 직접 부른다"
          },
          {
            "id": "5-안티패턴--콜백이-매-렌더-새로-만들어진다",
            "label": "콜백이 매 렌더 새로 만들어진다"
          },
          {
            "id": "5-안티패턴--쓰지도-않는-값을-여러-단계-통과시키기",
            "label": "쓰지도 않는 값을 여러 단계 통과시키기"
          },
          {
            "id": "5-안티패턴--같은-계산을-여러-자리에-복사",
            "label": "같은 계산을 여러 자리에 복사"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-대기열-자식은-알리고-부모가-정한다",
            "label": "Tickle 대기열 — 자식은 알리고 부모가 정한다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-서버-모양과-화면-모양을-갈랐다",
            "label": "Tickle — 서버 모양과 화면 모양을 갈랐다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-찜-방향은-맞는데-내용이-갈라졌다",
            "label": "Tickle 찜 — 방향은 맞는데 내용이 갈라졌다"
          },
          {
            "id": "실제로-부딪힌-곳--합칠-때-화면별-차이를-지우지-않았다",
            "label": "합칠 때 화면별 차이를 지우지 않았다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-권종-중복-중-하나가-버그였다",
            "label": "Tickle 권종 — 중복 중 하나가 버그였다"
          },
          {
            "id": "실제로-부딪힌-곳--계산을-모으면서-알게-된-것",
            "label": "계산을 모으면서 알게 된 것"
          },
          {
            "id": "실제로-부딪힌-곳--withy-영상-동기화-되쏘지-않는다",
            "label": "WITHY 영상 동기화 — 되쏘지 않는다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-플레이어-제어-비대칭에-이유가-있다",
            "label": "WITHY 플레이어 제어 — 비대칭에 이유가 있다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-역할-같은-파이프라인이-두-벌",
            "label": "WITHY 역할 — 같은 파이프라인이 두 벌"
          },
          {
            "id": "실제로-부딪힌-곳--withy-회원가입-흐름이-콜백-안에-파묻혔다",
            "label": "WITHY 회원가입 — 흐름이 콜백 안에 파묻혔다"
          }
        ]
      }
    ],
    "craft-composition": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--유연성을-어디로-열-것인가",
            "label": "유연성을 어디로 열 것인가"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--props-나열-옵션이-적고-고정적일-때",
            "label": "props 나열 — 옵션이 적고 고정적일 때"
          },
          {
            "id": "2-선택지--children과-합성-조합이-많을-때",
            "label": "children과 합성 — 조합이 많을 때"
          },
          {
            "id": "2-선택지--compound-부모와-자식이-상태를-나눠-쓸-때",
            "label": "compound — 부모와 자식이 상태를 나눠 쓸 때"
          },
          {
            "id": "2-선택지--render-props-데이터는-같고-표현만-다를-때",
            "label": "render props — 데이터는 같고 표현만 다를 때"
          },
          {
            "id": "2-선택지--제어와-비제어-값의-주인을-누구로",
            "label": "제어와 비제어 — 값의 주인을 누구로"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--플래그가-늘어나면-구조를-연다",
            "label": "플래그가 늘어나면 구조를 연다"
          },
          {
            "id": "3-선택-기준--한-컴포넌트는-한-책임",
            "label": "한 컴포넌트는 한 책임"
          },
          {
            "id": "3-선택-기준--범용화는-두-번째-사용처가-생겼을-때",
            "label": "범용화는 두 번째 사용처가 생겼을 때"
          },
          {
            "id": "3-선택-기준--만들기-전에-있는지-먼저-본다",
            "label": "만들기 전에 있는지 먼저 본다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--구조를-열-때",
            "label": "구조를 열 때"
          },
          {
            "id": "4-도구--부모와-자식이-상태를-나눌-때",
            "label": "부모와 자식이 상태를 나눌 때"
          },
          {
            "id": "4-도구--제어와-비제어를-둘-다-열-때",
            "label": "제어와 비제어를 둘 다 열 때"
          },
          {
            "id": "4-도구--react-바깥의-로직",
            "label": "React 바깥의 로직"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--불리언-prop-폭발",
            "label": "불리언 prop 폭발"
          },
          {
            "id": "5-안티패턴--한-컴포넌트가-다-한다",
            "label": "한 컴포넌트가 다 한다"
          },
          {
            "id": "5-안티패턴--한-곳만-쓰는데-범용인-척",
            "label": "한 곳만 쓰는데 범용인 척"
          },
          {
            "id": "5-안티패턴--추출해-놓고-안-쓴다",
            "label": "추출해 놓고 안 쓴다"
          },
          {
            "id": "5-안티패턴--있는데-안-쓰고-다시-만든다",
            "label": "있는데 안 쓰고 다시 만든다"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-검색창-값의-주인을-열어-뒀다",
            "label": "Tickle 검색창 — 값의 주인을 열어 뒀다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-봇-판정기-아무것도-감싸지-않는-래퍼",
            "label": "Tickle 봇 판정기 — 아무것도 감싸지 않는 래퍼"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-취소표-결제를-다시-만들지-않았다",
            "label": "Tickle 취소표 — 결제를 다시 만들지 않았다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-행동-수집-react-밖으로-빼-뒀다",
            "label": "Tickle 행동 수집 — React 밖으로 빼 뒀다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-상세-한-파일이-전부를-들고-있었다",
            "label": "Tickle 상세 — 한 파일이 전부를 들고 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--고친-방법-조립만-남겼다",
            "label": "고친 방법 — 조립만 남겼다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-sse-좋은-걸-만들어-두고-안-썼다",
            "label": "Tickle SSE — 좋은 걸 만들어 두고 안 썼다"
          },
          {
            "id": "실제로-부딪힌-곳--합치지-않고-규칙만-공유했다",
            "label": "합치지 않고 규칙만 공유했다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-대기방-추출해-놓고-원본을-안-지웠다",
            "label": "WITHY 대기방 — 추출해 놓고 원본을 안 지웠다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-미디어-파싱-두-벌이-갈라지기-시작했다",
            "label": "WITHY 미디어 파싱 — 두 벌이 갈라지기 시작했다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-플레이어-같은-모양으로-맞춰-두면-위가-단순해진다",
            "label": "WITHY 플레이어 — 같은 모양으로 맞춰 두면 위가 단순해진다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-옵션-하나로-두-용도",
            "label": "WITHY 채팅 — 옵션 하나로 두 용도"
          }
        ]
      }
    ],
    "craft-contract": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--경계를-먼저-정한다",
            "label": "경계를 먼저 정한다"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--좁은-ts-타입-내부-경계",
            "label": "좁은 TS 타입 — 내부 경계"
          },
          {
            "id": "2-선택지--런타임-스키마-검증-외부-경계",
            "label": "런타임 스키마 검증 — 외부 경계"
          },
          {
            "id": "2-선택지--런타임-가드-좁혀-쓰기",
            "label": "런타임 가드 — 좁혀 쓰기"
          },
          {
            "id": "2-선택지--타입-단언-회피",
            "label": "타입 단언 — 회피"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--안쪽은-좁게",
            "label": "안쪽은 좁게"
          },
          {
            "id": "3-선택-기준--바깥에서-오는-값은-검사한다",
            "label": "바깥에서 오는 값은 검사한다"
          },
          {
            "id": "3-선택-기준--돈과-신원이-걸린-곳부터",
            "label": "돈과 신원이 걸린 곳부터"
          },
          {
            "id": "3-선택-기준--경계를-넘는-값은-타입이-지켜-주지-않는다",
            "label": "경계를 넘는 값은 타입이 지켜 주지 않는다"
          },
          {
            "id": "3-선택-기준--실패는-타입으로-드러나야-한다",
            "label": "실패는 타입으로 드러나야 한다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--내부를-좁힐-때",
            "label": "내부를 좁힐 때"
          },
          {
            "id": "4-도구--외부를-검사할-때",
            "label": "외부를 검사할 때"
          },
          {
            "id": "4-도구--우회를-대비할-때",
            "label": "우회를 대비할 때"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--느슨한-타입",
            "label": "느슨한 타입"
          },
          {
            "id": "5-안티패턴--서버-응답을-단언",
            "label": "서버 응답을 단언"
          },
          {
            "id": "5-안티패턴--any와-무시-주석이-흩어짐",
            "label": "any와 무시 주석이 흩어짐"
          },
          {
            "id": "5-안티패턴--매직-문자열로-상태를-표현",
            "label": "매직 문자열로 상태를 표현"
          },
          {
            "id": "5-안티패턴--실패를-성공-모양으로-돌려주기",
            "label": "실패를 성공 모양으로 돌려주기"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-돈과-신원부터-검증했다",
            "label": "Tickle — 돈과 신원부터 검증했다"
          },
          {
            "id": "실제로-부딪힌-곳--검증-실패를-무엇으로-다룰지가-남는다",
            "label": "검증 실패를 무엇으로 다룰지가 남는다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-any로-순회하던-응답",
            "label": "Tickle 좌석 — any로 순회하던 응답"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-마이페이지-any가-가리고-있던-것은-오타가-아니었다",
            "label": "Tickle 마이페이지 — any가 가리고 있던 것은 오타가 아니었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-홈-에러를-한글-문구로-판단했다",
            "label": "Tickle 홈 — 에러를 한글 문구로 판단했다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-검색-고친-것과-남긴-것",
            "label": "Tickle 검색 — 고친 것과 남긴 것"
          },
          {
            "id": "실제로-부딪힌-곳--withy-역할-타입은-있는데-경계에서-샜다",
            "label": "WITHY 역할 — 타입은 있는데 경계에서 샜다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-레이어-사이에서-어휘가-갈라졌다",
            "label": "WITHY 채팅 — 레이어 사이에서 어휘가 갈라졌다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-미디어-파싱-실패가-성공처럼-생겼다",
            "label": "WITHY 미디어 파싱 — 실패가 성공처럼 생겼다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-인증-방어가-계약-미확정의-신호였다",
            "label": "WITHY 인증 — 방어가 계약 미확정의 신호였다"
          }
        ]
      }
    ],
    "craft-hooks": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--언제-실행될-로직인가",
            "label": "언제 실행될 로직인가"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--렌더-중-계산-훅이-아니다",
            "label": "렌더 중 계산 — 훅이 아니다"
          },
          {
            "id": "2-선택지--이벤트-핸들러",
            "label": "이벤트 핸들러"
          },
          {
            "id": "2-선택지--useeffect-바깥과-맞출-때",
            "label": "useEffect — 바깥과 맞출 때"
          },
          {
            "id": "2-선택지--usememo와-usecallback",
            "label": "useMemo와 useCallback"
          },
          {
            "id": "2-선택지--useref-렌더와-무관한-값",
            "label": "useRef — 렌더와 무관한 값"
          },
          {
            "id": "2-선택지--커스텀-훅",
            "label": "커스텀 훅"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--effect가-정말-필요한지-먼저-묻는다",
            "label": "effect가 정말 필요한지 먼저 묻는다"
          },
          {
            "id": "3-선택-기준--의존성은-린트가-시키는-대로",
            "label": "의존성은 린트가 시키는 대로"
          },
          {
            "id": "3-선택-기준--정리가-필요한지-묻는다",
            "label": "정리가 필요한지 묻는다"
          },
          {
            "id": "3-선택-기준--한-effect에-여러-책임을-담지-않는다",
            "label": "한 effect에 여러 책임을 담지 않는다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--파생값",
            "label": "파생값"
          },
          {
            "id": "4-도구--콜백을-의존성에서-빼는-법",
            "label": "콜백을 의존성에서 빼는 법"
          },
          {
            "id": "4-도구--정리",
            "label": "정리"
          },
          {
            "id": "4-도구--로직-재사용",
            "label": "로직 재사용"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--effect에서-파생-상태를-만든다",
            "label": "effect에서 파생 상태를 만든다"
          },
          {
            "id": "5-안티패턴--정리-없는-구독과-타이머",
            "label": "정리 없는 구독과 타이머"
          },
          {
            "id": "5-안티패턴--의존성-경고를-주석으로-끈다",
            "label": "의존성 경고를 주석으로 끈다"
          },
          {
            "id": "5-안티패턴--객체와-함수를-그대로-의존성에",
            "label": "객체와 함수를 그대로 의존성에"
          },
          {
            "id": "5-안티패턴--렌더-도중에-ref를-쓴다",
            "label": "렌더 도중에 ref를 쓴다"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-봇-판정-실행-조건이-다르면-effect도-다르게",
            "label": "Tickle 봇 판정 — 실행 조건이 다르면 effect도 다르게"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-금액은-상태가-아니다",
            "label": "Tickle 좌석 — 금액은 상태가 아니다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-실시간-훅-콜백을-ref로-받는다",
            "label": "Tickle 실시간 훅 — 콜백을 ref로 받는다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-대기열-한-effect가-전부를-한다",
            "label": "Tickle 대기열 — 한 effect가 전부를 한다"
          },
          {
            "id": "실제로-부딪힌-곳--왜-그-순서였나",
            "label": "왜 그 순서였나"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-마이페이지-데이터-레이어를-한곳에",
            "label": "Tickle 마이페이지 — 데이터 레이어를 한곳에"
          },
          {
            "id": "실제로-부딪힌-곳--withy-대기방-훅을-만들고-안-썼다",
            "label": "WITHY 대기방 — 훅을 만들고 안 썼다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-dm-같은-훅-안에서-규칙이-달랐다",
            "label": "WITHY DM — 같은 훅 안에서 규칙이 달랐다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-받지-않은-인자가-만든-제약",
            "label": "WITHY 채팅 — 받지 않은 인자가 만든 제약"
          }
        ]
      }
    ],
    "craft-strategy": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--실행-위치와-그-경계",
            "label": "실행 위치와 그 경계"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--서버-컴포넌트-기본값",
            "label": "서버 컴포넌트 — 기본값"
          },
          {
            "id": "2-선택지--클라이언트-컴포넌트",
            "label": "클라이언트 컴포넌트"
          },
          {
            "id": "2-선택지--서버-렌더를-아예-끄기",
            "label": "서버 렌더를 아예 끄기"
          },
          {
            "id": "2-선택지--effect-안에서만-브라우저에-접근",
            "label": "effect 안에서만 브라우저에 접근"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--클라이언트-경계는-잎사귀에",
            "label": "클라이언트 경계는 잎사귀에"
          },
          {
            "id": "3-선택-기준--브라우저-전용-값은-렌더-본문에서-읽지-않는다",
            "label": "브라우저 전용 값은 렌더 본문에서 읽지 않는다"
          },
          {
            "id": "3-선택-기준--첫-렌더는-서버와-같아야-한다",
            "label": "첫 렌더는 서버와 같아야 한다"
          },
          {
            "id": "3-선택-기준--차단은-렌더-전략으로-하는-일이-아니다",
            "label": "차단은 렌더 전략으로 하는 일이 아니다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--경계를-그을-때",
            "label": "경계를 그을 때"
          },
          {
            "id": "4-도구--브라우저-전용-모듈",
            "label": "브라우저 전용 모듈"
          },
          {
            "id": "4-도구--주소-파라미터를-읽을-때",
            "label": "주소 파라미터를 읽을 때"
          },
          {
            "id": "4-도구--남의-페이지-위에-그릴-때",
            "label": "남의 페이지 위에 그릴 때"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--렌더-본문에서-브라우저-전역-접근",
            "label": "렌더 본문에서 브라우저 전역 접근"
          },
          {
            "id": "5-안티패턴--서버와-클라이언트의-첫-렌더가-다름",
            "label": "서버와 클라이언트의 첫 렌더가 다름"
          },
          {
            "id": "5-안티패턴--습관적으로-전부-클라이언트",
            "label": "습관적으로 전부 클라이언트"
          },
          {
            "id": "5-안티패턴--준비될-때까지-화면-전체를-비우기",
            "label": "준비될 때까지 화면 전체를 비우기"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-경계를-봇-판정-래퍼에만",
            "label": "Tickle — 경계를 봇 판정 래퍼에만"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-서버에는-브라우저가-없다",
            "label": "Tickle — 서버에는 브라우저가 없다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-무거운-것은-나중에-브라우저-전용은-서버-밖에서",
            "label": "Tickle — 무거운 것은 나중에, 브라우저 전용은 서버 밖에서"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-mock-한-프레임이-비어-있었다",
            "label": "Tickle Mock — 한 프레임이 비어 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-행동-수집-렌더를-아예-건드리지-않는-수집",
            "label": "Tickle 행동 수집 — 렌더를 아예 건드리지 않는 수집"
          },
          {
            "id": "실제로-부딪힌-곳--withy-오버레이-남의-페이지-위에-얹기",
            "label": "WITHY 오버레이 — 남의 페이지 위에 얹기"
          },
          {
            "id": "실제로-부딪힌-곳--withy-인증-가드가-렌더-뒤에-걸린다",
            "label": "WITHY 인증 — 가드가 렌더 뒤에 걸린다"
          }
        ]
      }
    ],
    "craft-rerender": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--무엇을-얼마나-다시-그릴-것인가",
            "label": "무엇을 얼마나 다시 그릴 것인가"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--아무것도-안-한다-대부분",
            "label": "아무것도 안 한다 — 대부분"
          },
          {
            "id": "2-선택지--자식을-건너뛴다",
            "label": "자식을 건너뛴다"
          },
          {
            "id": "2-선택지--계산을-캐시한다",
            "label": "계산을 캐시한다"
          },
          {
            "id": "2-선택지--참조를-고정한다",
            "label": "참조를 고정한다"
          },
          {
            "id": "2-선택지--상태를-내리거나-나눈다",
            "label": "상태를 내리거나 나눈다"
          },
          {
            "id": "2-선택지--급하지-않은-렌더를-미룬다",
            "label": "급하지 않은 렌더를 미룬다"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--측정하고-나서-고친다",
            "label": "측정하고 나서 고친다"
          },
          {
            "id": "3-선택-기준--값이-아니라-참조를-본다",
            "label": "값이 아니라 참조를 본다"
          },
          {
            "id": "3-선택-기준--구독-범위를-좁힌다",
            "label": "구독 범위를 좁힌다"
          },
          {
            "id": "3-선택-기준--파생-상태를-만들지-않는다",
            "label": "파생 상태를 만들지 않는다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--무거운-인스턴스는-한-번만-만든다",
            "label": "무거운 인스턴스는 한 번만 만든다"
          },
          {
            "id": "4-도구--급한-것과-안-급한-것을-나눌-때",
            "label": "급한 것과 안 급한 것을 나눌 때"
          },
          {
            "id": "4-도구--범위를-좁힐-때",
            "label": "범위를 좁힐 때"
          },
          {
            "id": "4-도구--목록을-다룰-때",
            "label": "목록을 다룰 때"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--객체와-함수를-그대로-넘기기",
            "label": "객체와 함수를 그대로 넘기기"
          },
          {
            "id": "5-안티패턴--전부-메모이제이션",
            "label": "전부 메모이제이션"
          },
          {
            "id": "5-안티패턴--큰-컴포넌트가-작은-상태에-통째로-반응",
            "label": "큰 컴포넌트가 작은 상태에 통째로 반응"
          },
          {
            "id": "5-안티패턴--같은-값을-다시-상태로-복사",
            "label": "같은 값을 다시 상태로 복사"
          },
          {
            "id": "5-안티패턴--리스너를-두-번-등록",
            "label": "리스너를 두 번 등록"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-캐시를-들고-있는-객체는-한-번만",
            "label": "Tickle — 캐시를 들고 있는 객체는 한 번만"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-홈-전환은-즉시-무거운-화면은-한-박자-뒤에",
            "label": "Tickle 홈 — 전환은 즉시, 무거운 화면은 한 박자 뒤에"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-마이페이지-안-보이는-탭은-마운트하지-않는다",
            "label": "Tickle 마이페이지 — 안 보이는 탭은 마운트하지 않는다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-여기는-메모-저기는-안-함",
            "label": "Tickle 좌석 — 여기는 메모, 저기는 안 함"
          },
          {
            "id": "실제로-부딪힌-곳--withy-dm-토큰이-바뀔-때마다-전부-다시",
            "label": "WITHY DM — 토큰이 바뀔 때마다 전부 다시"
          },
          {
            "id": "실제로-부딪힌-곳--withy-홈-파생-상태가-렌더를-늘렸다",
            "label": "WITHY 홈 — 파생 상태가 렌더를 늘렸다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-오버레이-리스너가-두-번-등록돼-있었다",
            "label": "WITHY 오버레이 — 리스너가 두 번 등록돼 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-영상-동기화-의존성-누락을-주석으로-정당화했다",
            "label": "WITHY 영상 동기화 — 의존성 누락을 주석으로 정당화했다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-메모가-실제로-필요한-곳",
            "label": "WITHY 채팅 — 메모가 실제로 필요한 곳"
          }
        ]
      }
    ],
    "craft-timing": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--페인트-전인가-후인가",
            "label": "페인트 전인가 후인가"
          },
          {
            "id": "1-이-단계의-의사결정--그리고-순서와-간격",
            "label": "그리고 순서와 간격"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--페인트-후-기본",
            "label": "페인트 후 — 기본"
          },
          {
            "id": "2-선택지--페인트-전-동기",
            "label": "페인트 전 — 동기"
          },
          {
            "id": "2-선택지--렌더-중-계산",
            "label": "렌더 중 계산"
          },
          {
            "id": "2-선택지--주기와-간격-디바운스-스로틀-폴링-타이머",
            "label": "주기와 간격 — 디바운스, 스로틀, 폴링, 타이머"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--기본은-페인트-후",
            "label": "기본은 페인트 후"
          },
          {
            "id": "3-선택-기준--페인트-전은-깜빡임을-막을-때만",
            "label": "페인트 전은 깜빡임을 막을 때만"
          },
          {
            "id": "3-선택-기준--잃으면-안-되는-것을-먼저-연다",
            "label": "잃으면 안 되는 것을 먼저 연다"
          },
          {
            "id": "3-선택-기준--시간을-재는-대신-끝났다는-신호를-기다린다",
            "label": "시간을 재는 대신 끝났다는 신호를 기다린다"
          },
          {
            "id": "3-선택-기준--끝나는-조건을-정해-둔다",
            "label": "끝나는 조건을 정해 둔다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--일반적인-부수효과",
            "label": "일반적인 부수효과"
          },
          {
            "id": "4-도구--한-번만-실행되게",
            "label": "한 번만 실행되게"
          },
          {
            "id": "4-도구--입력이-몰아칠-때",
            "label": "입력이 몰아칠 때"
          },
          {
            "id": "4-도구--지연-실행을-예약했으면-취소도-준비한다",
            "label": "지연 실행을 예약했으면 취소도 준비한다"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--dom-측정을-페인트-후에",
            "label": "DOM 측정을 페인트 후에"
          },
          {
            "id": "5-안티패턴--숨기는-일을-클라이언트-시점에",
            "label": "숨기는 일을 클라이언트 시점에"
          },
          {
            "id": "5-안티패턴--매직-딜레이",
            "label": "매직 딜레이"
          },
          {
            "id": "5-안티패턴--끝나지-않는-반복",
            "label": "끝나지 않는 반복"
          },
          {
            "id": "5-안티패턴--예약해-놓고-취소하지-않음",
            "label": "예약해 놓고 취소하지 않음"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-구독을-먼저-열었다",
            "label": "Tickle 좌석 — 구독을 먼저 열었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-상세-정확한-타이머에서-타이머-없는-코드로",
            "label": "Tickle 상세 — 정확한 타이머에서 타이머 없는 코드로"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-카카오-콜백-두-번-실행되면-안-되는-일",
            "label": "Tickle 카카오 콜백 — 두 번 실행되면 안 되는 일"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-결제-끝나지-않는-폴링",
            "label": "Tickle 결제 — 끝나지 않는 폴링"
          },
          {
            "id": "실제로-부딪힌-곳--만료됐을-때-뭐라고-말할지도-결정이다",
            "label": "만료됐을 때 뭐라고 말할지도 결정이다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-봇-판정-타이밍이-구조를-결정했다",
            "label": "Tickle 봇 판정 — 타이밍이 구조를 결정했다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-행동-수집-초당-수백-번을-받아-내는-법",
            "label": "Tickle 행동 수집 — 초당 수백 번을 받아 내는 법"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-권종-애니메이션-시간을-숫자로-적어-뒀다",
            "label": "Tickle 권종 — 애니메이션 시간을 숫자로 적어 뒀다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-백그라운드-시간으로-순서를-맞추고-있었다",
            "label": "WITHY 백그라운드 — 시간으로 순서를 맞추고 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-오버레이-정리한-뒤에-되살아났다",
            "label": "WITHY 오버레이 — 정리한 뒤에 되살아났다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-영상-동기화-이벤트만으로는-부족했다",
            "label": "WITHY 영상 동기화 — 이벤트만으로는 부족했다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-핸드오프-쓰기-전에-비교한다",
            "label": "WITHY 핸드오프 — 쓰기 전에 비교한다"
          }
        ]
      }
    ],
    "craft-concurrency": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--어떤-겹침이-있고-각각-무엇으로-막는가",
            "label": "어떤 겹침이 있고 각각 무엇으로 막는가"
          }
        ]
      },
      {
        "id": "2-다뤄야-할-항목",
        "label": "2. 다뤄야 할 항목",
        "children": [
          {
            "id": "2-다뤄야-할-항목--중복-호출",
            "label": "중복 호출"
          },
          {
            "id": "2-다뤄야-할-항목--레이스-늦은-응답이-최신을-덮음",
            "label": "레이스 — 늦은 응답이 최신을 덮음"
          },
          {
            "id": "2-다뤄야-할-항목--취소",
            "label": "취소"
          },
          {
            "id": "2-다뤄야-할-항목--멱등",
            "label": "멱등"
          },
          {
            "id": "2-다뤄야-할-항목--순서",
            "label": "순서"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--서버-데이터면-라이브러리에-먼저-맡긴다",
            "label": "서버 데이터면 라이브러리에 먼저 맡긴다"
          },
          {
            "id": "3-선택-기준--플래그는-취소가-아니다",
            "label": "플래그는 취소가 아니다"
          },
          {
            "id": "3-선택-기준--쓰기는-멱등하게-사용자-조작은-가드",
            "label": "쓰기는 멱등하게, 사용자 조작은 가드"
          },
          {
            "id": "3-선택-기준--재시도에는-상한과-리셋이-함께-온다",
            "label": "재시도에는 상한과 리셋이 함께 온다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--한-번만-실행되게-락과-대기-큐",
            "label": "한 번만 실행되게 — 락과 대기 큐"
          },
          {
            "id": "4-도구--순서가-뒤집힐-때-버퍼",
            "label": "순서가 뒤집힐 때 — 버퍼"
          },
          {
            "id": "4-도구--끊고-다시-붙일-때",
            "label": "끊고 다시 붙일 때"
          },
          {
            "id": "4-도구--입력이-몰아칠-때",
            "label": "입력이 몰아칠 때"
          },
          {
            "id": "4-도구--미리-반영하고-되돌릴-때",
            "label": "미리 반영하고 되돌릴 때"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--직접-페칭에-정리와-끊기가-없다",
            "label": "직접 페칭에 정리와 끊기가 없다"
          },
          {
            "id": "5-안티패턴--연타로-중복-생성",
            "label": "연타로 중복 생성"
          },
          {
            "id": "5-안티패턴--플래그만-두고-요청은-계속-간다",
            "label": "플래그만 두고 요청은 계속 간다"
          },
          {
            "id": "5-안티패턴--자기-명령이-자기에게-돌아온다",
            "label": "자기 명령이 자기에게 돌아온다"
          },
          {
            "id": "5-안티패턴--읽고-고쳐서-쓰는-사이에-끼어든다",
            "label": "읽고 고쳐서 쓰는 사이에 끼어든다"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-토큰-재발급-락과-대기-큐",
            "label": "Tickle 토큰 재발급 — 락과 대기 큐"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-먼저-온-이벤트를-쌓아-뒀다",
            "label": "Tickle 좌석 — 먼저 온 이벤트를 쌓아 뒀다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-대기열-퇴장을-고민하는-중에-입장이-왔다",
            "label": "Tickle 대기열 — 퇴장을 고민하는 중에 입장이 왔다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-결제-두-사건이-같은-주기에-겹쳤다",
            "label": "Tickle 결제 — 두 사건이 같은 주기에 겹쳤다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-봇-신고-객체를-의존성에-뒀다",
            "label": "Tickle 봇 신고 — 객체를 의존성에 뒀다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-검색-취소하지-않아도-안-덮인다",
            "label": "Tickle 검색 — 취소하지 않아도 안 덮인다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-찜-되돌리면-오히려-틀리는-경우",
            "label": "Tickle 찜 — 되돌리면 오히려 틀리는 경우"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-sse-다시-붙는-규칙을-만들었다",
            "label": "Tickle SSE — 다시 붙는 규칙을 만들었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-영상-동기화-켜지지-않는-가드",
            "label": "WITHY 영상 동기화 — 켜지지 않는 가드"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-읽고-쓰는-사이",
            "label": "WITHY 채팅 — 읽고 쓰는 사이"
          },
          {
            "id": "실제로-부딪힌-곳--withy-소켓-다시-붙었는데-구독이-없다",
            "label": "WITHY 소켓 — 다시 붙었는데 구독이 없다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-미디어-파싱-늦게-온-결과가-덮었다",
            "label": "WITHY 미디어 파싱 — 늦게 온 결과가 덮었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-오버레이-재진입-락",
            "label": "WITHY 오버레이 — 재진입 락"
          }
        ]
      }
    ],
    "craft-error": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--어디까지-방어할-것인가",
            "label": "어디까지 방어할 것인가"
          }
        ]
      },
      {
        "id": "2-다뤄야-할-항목",
        "label": "2. 다뤄야 할 항목",
        "children": [
          {
            "id": "2-다뤄야-할-항목--값의-경계",
            "label": "값의 경계"
          },
          {
            "id": "2-다뤄야-할-항목--네트워크-실패",
            "label": "네트워크 실패"
          },
          {
            "id": "2-다뤄야-할-항목--브라우저-엣지",
            "label": "브라우저 엣지"
          },
          {
            "id": "2-다뤄야-할-항목--전역-안전망",
            "label": "전역 안전망"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--실패를-먼저-쓰고-성공을-나중에",
            "label": "실패를 먼저 쓰고 성공을 나중에"
          },
          {
            "id": "3-선택-기준--모든-요청에-상한이-있어야-한다",
            "label": "모든 요청에 상한이 있어야 한다"
          },
          {
            "id": "3-선택-기준--취소와-실패는-다르다",
            "label": "취소와 실패는 다르다"
          },
          {
            "id": "3-선택-기준--무한-로딩과-빈-화면을-주지-않는다",
            "label": "무한 로딩과 빈 화면을 주지 않는다"
          },
          {
            "id": "3-선택-기준--재시도할-가치가-있는-실패인지-본다",
            "label": "재시도할 가치가 있는 실패인지 본다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--값의-경계",
            "label": "값의 경계"
          },
          {
            "id": "4-도구--네트워크",
            "label": "네트워크"
          },
          {
            "id": "4-도구--화면이-사라지는-중에-보낼-때",
            "label": "화면이 사라지는 중에 보낼 때"
          },
          {
            "id": "4-도구--전역-안전망",
            "label": "전역 안전망"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--방어-없이-접근",
            "label": "방어 없이 접근"
          },
          {
            "id": "5-안티패턴--상한-없는-요청",
            "label": "상한 없는 요청"
          },
          {
            "id": "5-안티패턴--빈-catch",
            "label": "빈 catch"
          },
          {
            "id": "5-안티패턴--보내-놓고-결과를-안-본다",
            "label": "보내 놓고 결과를 안 본다"
          },
          {
            "id": "5-안티패턴--브라우저-기본-알림창",
            "label": "브라우저 기본 알림창"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-요청에-상한을-걸었다",
            "label": "Tickle — 요청에 상한을 걸었다"
          },
          {
            "id": "실제로-부딪힌-곳--취소와-타임아웃을-갈랐다",
            "label": "취소와 타임아웃을 갈랐다"
          },
          {
            "id": "실제로-부딪힌-곳--기다리는-쪽에도-상한이-필요했다",
            "label": "기다리는 쪽에도 상한이 필요했다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-알림창을-걷어내고-세-계층으로-나눴다",
            "label": "Tickle — 알림창을 걷어내고 세 계층으로 나눴다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-결제-조용한-실패를-세기-시작했다",
            "label": "Tickle 결제 — 조용한 실패를 세기 시작했다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-대기열-끊긴-것과-끝난-것을-갈랐다",
            "label": "Tickle 대기열 — 끊긴 것과 끝난 것을 갈랐다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-떠나는-중에-자리를-놓아-주기",
            "label": "Tickle 좌석 — 떠나는 중에 자리를 놓아 주기"
          },
          {
            "id": "실제로-부딪힌-곳--고치려다-더-큰-것을-봤다",
            "label": "고치려다 더 큰 것을 봤다"
          },
          {
            "id": "실제로-부딪힌-곳--재시도할-가치를-태그로-판단한다",
            "label": "재시도할 가치를 태그로 판단한다"
          },
          {
            "id": "실제로-부딪힌-곳--이미-원하는-상태면-성공으로",
            "label": "이미 원하는 상태면 성공으로"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-홈-아직-정리-못-한-자리",
            "label": "Tickle 홈 — 아직 정리 못 한 자리"
          },
          {
            "id": "실제로-부딪힌-곳--withy-조용한-실패가-만든-좀비-상태",
            "label": "WITHY — 조용한 실패가 만든 좀비 상태"
          },
          {
            "id": "실제로-부딪힌-곳--끊김을-상태로-내보내기",
            "label": "끊김을 상태로 내보내기"
          }
        ]
      }
    ],
    "craft-trust": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--이-판정의-최종-권한은-누구에게-있는가",
            "label": "이 판정의 최종 권한은 누구에게 있는가"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--클라이언트-검증-믿을-수-없음",
            "label": "클라이언트 검증 — 믿을 수 없음"
          },
          {
            "id": "2-선택지--서버-검증-신뢰의-원천",
            "label": "서버 검증 — 신뢰의 원천"
          },
          {
            "id": "2-선택지--토큰-기반-신원",
            "label": "토큰 기반 신원"
          },
          {
            "id": "2-선택지--계층-방어",
            "label": "계층 방어"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--조작하면-위험한-값을-먼저-찾는다",
            "label": "조작하면 위험한 값을 먼저 찾는다"
          },
          {
            "id": "3-선택-기준--검증보다-통로를-없애는-쪽이-낫다",
            "label": "검증보다 통로를 없애는 쪽이 낫다"
          },
          {
            "id": "3-선택-기준--메시지를-받는-곳에서는-보낸-쪽을-확인한다",
            "label": "메시지를 받는 곳에서는 보낸 쪽을 확인한다"
          },
          {
            "id": "3-선택-기준--가리는-것과-안-보내는-것은-다르다",
            "label": "가리는 것과 안 보내는 것은 다르다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--클라이언트-쪽",
            "label": "클라이언트 쪽"
          },
          {
            "id": "4-도구--서버-쪽",
            "label": "서버 쪽"
          },
          {
            "id": "4-도구--신원",
            "label": "신원"
          },
          {
            "id": "4-도구--비밀",
            "label": "비밀"
          },
          {
            "id": "4-도구--경계를-넘는-메시지",
            "label": "경계를 넘는 메시지"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--금액을-클라이언트가-계산해-보낸다",
            "label": "금액을 클라이언트가 계산해 보낸다"
          },
          {
            "id": "5-안티패턴--차단과-권한-판정을-클라이언트에서만",
            "label": "차단과 권한 판정을 클라이언트에서만"
          },
          {
            "id": "5-안티패턴--본문에-실린-신원을-믿는다",
            "label": "본문에 실린 신원을 믿는다"
          },
          {
            "id": "5-안티패턴--비밀이-번들에-들어간다",
            "label": "비밀이 번들에 들어간다"
          },
          {
            "id": "5-안티패턴--메시지의-출처를-확인하지-않는다",
            "label": "메시지의 출처를 확인하지 않는다"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-결제-클라이언트는-금액을-보내지-않는다",
            "label": "Tickle 결제 — 클라이언트는 금액을 보내지 않는다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-봇-대응-네-겹으로-쌓았다",
            "label": "Tickle 봇 대응 — 네 겹으로 쌓았다"
          },
          {
            "id": "실제로-부딪힌-곳--주장할-통로-자체가-없다",
            "label": "주장할 통로 자체가 없다"
          },
          {
            "id": "실제로-부딪힌-곳--그런데-감사의-지적이-틀렸다",
            "label": "그런데 감사의 지적이 틀렸다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-좌석-captcha-아직-열려-있는-자리",
            "label": "Tickle 좌석 CAPTCHA — 아직 열려 있는 자리"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-토큰-무엇을-막는지-정확히-말하기",
            "label": "Tickle 토큰 — 무엇을 막는지 정확히 말하기"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-로그인-이동-검증에서-제거로",
            "label": "Tickle 로그인 이동 — 검증에서 제거로"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-수수료-서버도-아직-모르는-구간",
            "label": "Tickle 수수료 — 서버도 아직 모르는 구간"
          },
          {
            "id": "실제로-부딪힌-곳--withy-페이지-메시지-형식만-알면-누구나",
            "label": "WITHY 페이지 메시지 — 형식만 알면 누구나"
          },
          {
            "id": "실제로-부딪힌-곳--withy-확장-받은-주소로-바로-이동시킨다",
            "label": "WITHY 확장 — 받은 주소로 바로 이동시킨다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-토큰-회전의-이점을-스스로-없앴다",
            "label": "WITHY 토큰 — 회전의 이점을 스스로 없앴다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-권한-저장소-값으로-방장을-판정했다",
            "label": "WITHY 권한 — 저장소 값으로 방장을 판정했다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-스포일러-가린-것이지-감춘-것이-아니었다",
            "label": "WITHY 스포일러 — 가린 것이지 감춘 것이 아니었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-파티-비밀번호-잘-닫힌-한-곳",
            "label": "WITHY 파티 비밀번호 — 잘 닫힌 한 곳"
          }
        ]
      }
    ],
    "craft-perf": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--무엇을-줄일-것인가",
            "label": "무엇을 줄일 것인가"
          }
        ]
      },
      {
        "id": "2-고를-수-있는-수단",
        "label": "2. 고를 수 있는 수단",
        "children": [
          {
            "id": "2-고를-수-있는-수단--코드-나누기",
            "label": "코드 나누기"
          },
          {
            "id": "2-고를-수-있는-수단--이미지와-폰트",
            "label": "이미지와 폰트"
          },
          {
            "id": "2-고를-수-있는-수단--많이-그리지-않기",
            "label": "많이 그리지 않기"
          },
          {
            "id": "2-고를-수-있는-수단--다시-계산하지-않기",
            "label": "다시 계산하지 않기"
          },
          {
            "id": "2-고를-수-있는-수단--요청-줄이기",
            "label": "요청 줄이기"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--재고-나서-고친다",
            "label": "재고 나서 고친다"
          },
          {
            "id": "3-선택-기준--명백한-낭비는-재기-전에-없앤다",
            "label": "명백한 낭비는 재기 전에 없앤다"
          },
          {
            "id": "3-선택-기준--무엇을-얼마나-받고-되돌리는가-를-본다",
            "label": "'무엇을 얼마나 받고 되돌리는가'를 본다"
          },
          {
            "id": "3-선택-기준--안-쓰는-것을-받지-않는-쪽이-거르는-것보다-낫다",
            "label": "안 쓰는 것을 받지 않는 쪽이 거르는 것보다 낫다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--나눠서-받기",
            "label": "나눠서 받기"
          },
          {
            "id": "4-도구--이미지",
            "label": "이미지"
          },
          {
            "id": "4-도구--스크롤과-관찰",
            "label": "스크롤과 관찰"
          },
          {
            "id": "4-도구--많이-들어오는-것-줄이기",
            "label": "많이 들어오는 것 줄이기"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--첫-화면에-안-쓰는-무거운-것을-받는다",
            "label": "첫 화면에 안 쓰는 무거운 것을 받는다"
          },
          {
            "id": "5-안티패턴--수천-개를-한-번에-그린다",
            "label": "수천 개를 한 번에 그린다"
          },
          {
            "id": "5-안티패턴--받아서-클라이언트에서-거른다",
            "label": "받아서 클라이언트에서 거른다"
          },
          {
            "id": "5-안티패턴--쌓기만-하고-상한이-없다",
            "label": "쌓기만 하고 상한이 없다"
          },
          {
            "id": "5-안티패턴--안-바뀌는-것을-매번-다시-받는다",
            "label": "안 바뀌는 것을 매번 다시 받는다"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-행동-수집-세-겹으로-눌렀다",
            "label": "Tickle 행동 수집 — 세 겹으로 눌렀다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-홈-급한-것과-안-급한-것",
            "label": "Tickle 홈 — 급한 것과 안 급한 것"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-captcha-목적이-둘인-한-선택",
            "label": "Tickle CAPTCHA — 목적이 둘인 한 선택"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-마이페이지-안-그리면-요청도-안-한다",
            "label": "Tickle 마이페이지 — 안 그리면 요청도 안 한다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-동시성-설계가-곧-성능이었다",
            "label": "Tickle — 동시성 설계가 곧 성능이었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-미디어-파싱-무거운-건-코드가-아니었다",
            "label": "WITHY 미디어 파싱 — 무거운 건 코드가 아니었다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-홈-받아서-버렸다",
            "label": "WITHY 홈 — 받아서 버렸다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-저장은-가벼운데-표시가-무거웠다",
            "label": "WITHY 채팅 — 저장은 가벼운데 표시가 무거웠다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-확장-필요-없는-곳까지-보냈다",
            "label": "WITHY 확장 — 필요 없는 곳까지 보냈다"
          }
        ]
      }
    ],
    "craft-a11y": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--무엇으로-의미를-전달할-것인가",
            "label": "무엇으로 의미를 전달할 것인가"
          }
        ]
      },
      {
        "id": "2-선택지",
        "label": "2. 선택지",
        "children": [
          {
            "id": "2-선택지--시맨틱-html-기본",
            "label": "시맨틱 HTML — 기본"
          },
          {
            "id": "2-선택지--aria-속성-보강",
            "label": "ARIA 속성 — 보강"
          },
          {
            "id": "2-선택지--포커스-관리",
            "label": "포커스 관리"
          },
          {
            "id": "2-선택지--변화-알림",
            "label": "변화 알림"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--먼저-시맨틱-안-되면-보강",
            "label": "먼저 시맨틱, 안 되면 보강"
          },
          {
            "id": "3-선택-기준--마우스로-되는-것은-키보드로도-돼야-한다",
            "label": "마우스로 되는 것은 키보드로도 돼야 한다"
          },
          {
            "id": "3-선택-기준--시각적으로-가린-것은-가려진-것이-아니다",
            "label": "시각적으로 가린 것은 가려진 것이 아니다"
          },
          {
            "id": "3-선택-기준--다른-기준과-부딪히면-대체-경로를-만든다",
            "label": "다른 기준과 부딪히면 대체 경로를 만든다"
          },
          {
            "id": "3-선택-기준--프로젝트-성격에-따라-가중치가-다르다",
            "label": "프로젝트 성격에 따라 가중치가 다르다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--기본",
            "label": "기본"
          },
          {
            "id": "4-도구--보강",
            "label": "보강"
          },
          {
            "id": "4-도구--포커스",
            "label": "포커스"
          },
          {
            "id": "4-도구--키-충돌-막기",
            "label": "키 충돌 막기"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--클릭만-붙은-일반-요소",
            "label": "클릭만 붙은 일반 요소"
          },
          {
            "id": "5-안티패턴--모달을-열어도-포커스가-뒤에-남는다",
            "label": "모달을 열어도 포커스가 뒤에 남는다"
          },
          {
            "id": "5-안티패턴--이미지에-대체-텍스트가-없다",
            "label": "이미지에 대체 텍스트가 없다"
          },
          {
            "id": "5-안티패턴--호버-힌트만-달아-둔다",
            "label": "호버 힌트만 달아 둔다"
          },
          {
            "id": "5-안티패턴--시각-효과로-감췄다고-생각한다",
            "label": "시각 효과로 감췄다고 생각한다"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-아이콘-버튼에-이름을-붙였다",
            "label": "Tickle — 아이콘 버튼에 이름을 붙였다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-스피너-대신-문장",
            "label": "Tickle — 스피너 대신 문장"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-captcha-두-요구가-정면으로-부딪혔다",
            "label": "Tickle CAPTCHA — 두 요구가 정면으로 부딪혔다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-오버레이-전파는-막고-입력은-살린다",
            "label": "WITHY 오버레이 — 전파는 막고 입력은 살린다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-채팅-가린-쪽에-안-가려졌다",
            "label": "WITHY 채팅 — 가린 쪽에 안 가려졌다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-홈-핵심-진입이-키보드로-안-됐다",
            "label": "WITHY 홈 — 핵심 진입이 키보드로 안 됐다"
          },
          {
            "id": "실제로-부딪힌-곳--withy-대기방-호버-힌트로-대신했다",
            "label": "WITHY 대기방 — 호버 힌트로 대신했다"
          }
        ]
      }
    ],
    "craft-observe": [
      {
        "id": "1-이-단계의-의사결정",
        "label": "1. 이 단계의 의사결정",
        "children": [
          {
            "id": "1-이-단계의-의사결정--감지와-검증",
            "label": "감지와 검증"
          }
        ]
      },
      {
        "id": "2-고를-수-있는-수단",
        "label": "2. 고를 수 있는 수단",
        "children": [
          {
            "id": "2-고를-수-있는-수단--실패를-남기기",
            "label": "실패를 남기기"
          },
          {
            "id": "2-고를-수-있는-수단--순수-함수로-떼어내기",
            "label": "순수 함수로 떼어내기"
          },
          {
            "id": "2-고를-수-있는-수단--테스트",
            "label": "테스트"
          },
          {
            "id": "2-고를-수-있는-수단--사용처-점검",
            "label": "사용처 점검"
          }
        ]
      },
      {
        "id": "3-선택-기준",
        "label": "3. 선택 기준",
        "children": [
          {
            "id": "3-선택-기준--실패를-삼키지-않는다",
            "label": "실패를 삼키지 않는다"
          },
          {
            "id": "3-선택-기준--로그에는-판단에-필요한-것이-있어야-한다",
            "label": "로그에는 판단에 필요한 것이 있어야 한다"
          },
          {
            "id": "3-선택-기준--예상-가능한-실패와-아닌-것을-나눈다",
            "label": "예상 가능한 실패와 아닌 것을 나눈다"
          },
          {
            "id": "3-선택-기준--어긋남은-양방향으로-본다",
            "label": "어긋남은 양방향으로 본다"
          },
          {
            "id": "3-선택-기준--주석도-관측-대상이다",
            "label": "주석도 관측 대상이다"
          }
        ]
      },
      {
        "id": "4-도구",
        "label": "4. 도구",
        "children": [
          {
            "id": "4-도구--관측",
            "label": "관측"
          },
          {
            "id": "4-도구--테스트-가능하게-만들기",
            "label": "테스트 가능하게 만들기"
          },
          {
            "id": "4-도구--테스트",
            "label": "테스트"
          },
          {
            "id": "4-도구--죽은-코드-찾기",
            "label": "죽은 코드 찾기"
          }
        ]
      },
      {
        "id": "5-안티패턴",
        "label": "5. 안티패턴",
        "children": [
          {
            "id": "5-안티패턴--실패를-어디에도-남기지-않는다",
            "label": "실패를 어디에도 남기지 않는다"
          },
          {
            "id": "5-안티패턴--로직이-화면에-박혀-있다",
            "label": "로직이 화면에 박혀 있다"
          },
          {
            "id": "5-안티패턴--정의됐는데-아무도-안-쓴다",
            "label": "정의됐는데 아무도 안 쓴다"
          },
          {
            "id": "5-안티패턴--있는데-안-쓰고-다시-만든다",
            "label": "있는데 안 쓰고 다시 만든다"
          },
          {
            "id": "5-안티패턴--테스트용-우회가-프로덕션에-남는다",
            "label": "테스트용 우회가 프로덕션에 남는다"
          }
        ]
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳",
        "children": [
          {
            "id": "실제로-부딪힌-곳--tickle-죽은-코드가-일곱-건이었다",
            "label": "Tickle — 죽은 코드가 일곱 건이었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-테스트용-우회가-남아-있었다",
            "label": "Tickle — 테스트용 우회가 남아 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-죽은-필드가-감사를-틀리게-했다",
            "label": "Tickle — 죽은 필드가 감사를 틀리게 했다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-있는데-안-쓰고-다시-만든-자리",
            "label": "Tickle — 있는데 안 쓰고 다시 만든 자리"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-로그에-판단-재료를-넣었다",
            "label": "Tickle — 로그에 판단 재료를 넣었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-레벨을-나눴다",
            "label": "Tickle — 레벨을 나눴다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-우리가-고칠-수-없는-자리도-있었다",
            "label": "Tickle — 우리가 고칠 수 없는 자리도 있었다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-아직-조용한-자리",
            "label": "Tickle — 아직 조용한 자리"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-주석이-코드와-달랐다",
            "label": "Tickle — 주석이 코드와 달랐다"
          },
          {
            "id": "실제로-부딪힌-곳--tickle-테스트할-수-있게-만든-것들",
            "label": "Tickle — 테스트할 수 있게 만든 것들"
          },
          {
            "id": "실제로-부딪힌-곳--withy-로그가-전부-주석-처리돼-있었다",
            "label": "WITHY — 로그가 전부 주석 처리돼 있었다"
          }
        ]
      }
    ],
    "react": [
      {
        "id": "렌더는-계산이고-커밋이-반영이다",
        "label": "렌더는 계산이고, 커밋이 반영이다"
      },
      {
        "id": "순수해야-react가-마음대로-부를-수-있다",
        "label": "순수해야 React가 마음대로 부를 수 있다"
      },
      {
        "id": "그래서-최적화의-방향이-정해진다",
        "label": "그래서 최적화의 방향이 정해진다"
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳"
      },
      {
        "id": "문서의-두-갈래와-이-노드의-시트",
        "label": "문서의 두 갈래와 이 노드의 시트"
      },
      {
        "id": "실제로-돌린-것",
        "label": "실제로 돌린 것"
      }
    ],
    "rl": [
      {
        "id": "두-갈래로-나뉜다",
        "label": "두 갈래로 나뉜다"
      },
      {
        "id": "순서가-곧-주장이다",
        "label": "순서가 곧 주장이다"
      },
      {
        "id": "다시-읽게-된-장",
        "label": "다시 읽게 된 장"
      },
      {
        "id": "페이지-마흔-편의-지도",
        "label": "페이지 마흔 편의 지도"
      },
      {
        "id": "실제로-돌려-보면-네-그룹의-핵심-한-줄씩",
        "label": "실제로 돌려 보면: 네 그룹의 핵심 한 줄씩"
      }
    ],
    "rl-start": [
      {
        "id": "무엇이-들어-있나-열여섯-편",
        "label": "무엇이 들어 있나: 열여섯 편"
      },
      {
        "id": "react로-사고하기-다섯-단계",
        "label": "React로 사고하기: 다섯 단계"
      },
      {
        "id": "자습서가-가르치는-것-불변성과-시간-여행",
        "label": "자습서가 가르치는 것: 불변성과 시간 여행"
      },
      {
        "id": "문제-react-를-시작한다-가-세-가지-다른-일이다",
        "label": "문제: 'React 를 시작한다' 가 세 가지 다른 일이다"
      },
      {
        "id": "문제가-나는-경우-시작-자리에서",
        "label": "문제가 나는 경우: 시작 자리에서"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "rl-start-quick": [
      {
        "id": "1-컴포넌트-생성-및-중첩하기",
        "label": "1. 컴포넌트 생성 및 중첩하기",
        "children": [
          {
            "id": "1-컴포넌트-생성-및-중첩하기--react-앱은-컴포넌트로-구성된다",
            "label": "React 앱은 컴포넌트로 구성된다"
          },
          {
            "id": "1-컴포넌트-생성-및-중첩하기--컴포넌트는-마크업을-반환하는-자바스크립트-함수다",
            "label": "컴포넌트는 마크업을 반환하는 자바스크립트 함수다"
          },
          {
            "id": "1-컴포넌트-생성-및-중첩하기--대문자와-소문자가-가르는-것",
            "label": "대문자와 소문자가 가르는 것"
          },
          {
            "id": "1-컴포넌트-생성-및-중첩하기--export-default-이-파일의-주인공",
            "label": "export default — 이 파일의 주인공"
          }
        ]
      },
      {
        "id": "2-jsx로-마크업-작성하기",
        "label": "2. JSX로 마크업 작성하기",
        "children": [
          {
            "id": "2-jsx로-마크업-작성하기--jsx는-html보다-엄격하다",
            "label": "JSX는 HTML보다 엄격하다"
          }
        ]
      },
      {
        "id": "3-스타일-추가하기",
        "label": "3. 스타일 추가하기",
        "children": [
          {
            "id": "3-스타일-추가하기--class-가-아니라-classname",
            "label": "class 가 아니라 className"
          }
        ]
      },
      {
        "id": "4-데이터-표시하기",
        "label": "4. 데이터 표시하기",
        "children": [
          {
            "id": "4-데이터-표시하기--중괄호는-자바스크립트로-돌아가는-문",
            "label": "중괄호는 자바스크립트로 돌아가는 문"
          }
        ]
      },
      {
        "id": "5-조건부-렌더링",
        "label": "5. 조건부 렌더링",
        "children": [
          {
            "id": "5-조건부-렌더링--특별한-문법이-없다-자바스크립트-그대로",
            "label": "특별한 문법이 없다 — 자바스크립트 그대로"
          }
        ]
      },
      {
        "id": "6-리스트-렌더링",
        "label": "6. 리스트 렌더링",
        "children": [
          {
            "id": "6-리스트-렌더링--map-으로-배열을-요소-배열로-그리고-key",
            "label": "map 으로 배열을 요소 배열로, 그리고 key"
          }
        ]
      },
      {
        "id": "7-이벤트에-응답하기",
        "label": "7. 이벤트에 응답하기",
        "children": [
          {
            "id": "7-이벤트에-응답하기--핸들러-함수를-전달-한다-부르지-않는다",
            "label": "핸들러 함수를 '전달'한다 — 부르지 않는다"
          }
        ]
      },
      {
        "id": "8-화면-업데이트하기",
        "label": "8. 화면 업데이트하기",
        "children": [
          {
            "id": "8-화면-업데이트하기--기억해야-하면-state-그-state-는-컴포넌트마다-따로",
            "label": "기억해야 하면 state, 그 state 는 컴포넌트마다 따로"
          }
        ]
      },
      {
        "id": "9-hook-사용하기",
        "label": "9. Hook 사용하기",
        "children": [
          {
            "id": "9-hook-사용하기--use-로-시작하는-함수-그리고-두-규칙",
            "label": "use 로 시작하는 함수, 그리고 두 규칙"
          }
        ]
      },
      {
        "id": "10-컴포넌트-간에-데이터-공유하기",
        "label": "10. 컴포넌트 간에 데이터 공유하기",
        "children": [
          {
            "id": "10-컴포넌트-간에-데이터-공유하기--state-를-위로-올리고-props-로-내린다",
            "label": "state 를 위로 올리고 props 로 내린다"
          }
        ]
      },
      {
        "id": "열-절에서-자주-깨지는-자리",
        "label": "열 절에서 자주 깨지는 자리",
        "children": [
          {
            "id": "열-절에서-자주-깨지는-자리--문제-count-list-가-화면에-0-을-그린다",
            "label": "문제: {count && <List />} 가 화면에 0 을 그린다"
          },
          {
            "id": "열-절에서-자주-깨지는-자리--문제가-나는-경우",
            "label": "문제가 나는 경우"
          },
          {
            "id": "열-절에서-자주-깨지는-자리--문제의-구조-jsx-는-html-이-아니라-함수-호출이고-컴포넌트는-react-가-부른다",
            "label": "문제의 구조: JSX 는 HTML 이 아니라 함수 호출이고, 컴포넌트는 React 가 부른다"
          },
          {
            "id": "열-절에서-자주-깨지는-자리--확인-질문",
            "label": "확인 질문"
          }
        ]
      }
    ],
    "rl-start-install": [
      {
        "id": "무엇을-다루나-네-편",
        "label": "무엇을 다루나: 네 편"
      },
      {
        "id": "세-길과-그-뒤에-따라오는-일",
        "label": "세 길과 그 뒤에 따라오는 일"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-vite-로-시작해-데이터-가져오기를-각-컴포넌트에-두었더니-화면이-층층이-늦게-뜬다",
        "label": "문제: Vite 로 시작해 데이터 가져오기를 각 컴포넌트에 두었더니 화면이 층층이 늦게 뜬다"
      },
      {
        "id": "문제가-나는-경우-길을-잘못-고르거나-뒤따르는-일을-빠뜨릴-때",
        "label": "문제가 나는 경우: 길을 잘못 고르거나 뒤따르는 일을 빠뜨릴 때"
      },
      {
        "id": "문제의-구조-react-는-작고-앱은-크다",
        "label": "문제의 구조: React 는 작고, 앱은 크다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "rl-start-setup": [
      {
        "id": "무엇을-다루나-네-편",
        "label": "무엇을 다루나: 네 편"
      },
      {
        "id": "typescript-가-react-에서-잡는-것",
        "label": "TypeScript 가 React 에서 잡는 것"
      },
      {
        "id": "개발자-도구가-보여-주는-것-트리와-시간",
        "label": "개발자 도구가 보여 주는 것: 트리와 시간"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-린터-없이-조건-안에-훅을-두어-어느-날-state-가-뒤바뀐다",
        "label": "문제: 린터 없이 조건 안에 훅을 두어 어느 날 state 가 뒤바뀐다"
      },
      {
        "id": "문제가-나는-경우-잡을-수-있는-단계를-놓칠-때",
        "label": "문제가 나는 경우: 잡을 수 있는 단계를 놓칠 때"
      },
      {
        "id": "문제의-구조-같은-버그를-잡을-수-있는-단계가-셋이고-뒤로-갈수록-비싸다",
        "label": "문제의 구조: 같은 버그를 잡을 수 있는 단계가 셋이고, 뒤로 갈수록 비싸다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "rl-start-compiler": [
      {
        "id": "무엇을-다루나-네-편",
        "label": "무엇을 다루나: 네 편"
      },
      {
        "id": "컴파일러가-코드를-어떻게-바꾸나",
        "label": "컴파일러가 코드를 어떻게 바꾸나"
      },
      {
        "id": "설치와-점진적-도입",
        "label": "설치와 점진적 도입"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-컴파일러를-켰는데-어떤-컴포넌트만-빨라지지-않는다",
        "label": "문제: 컴파일러를 켰는데 어떤 컴포넌트만 빨라지지 않는다"
      },
      {
        "id": "문제가-나는-경우-전제를-모르고-켤-때",
        "label": "문제가 나는 경우: 전제를 모르고 켤 때"
      },
      {
        "id": "문제의-구조-자동화는-가정-위에-서고-가정을-어긴-곳은-자동화-밖에-남는다",
        "label": "문제의 구조: 자동화는 가정 위에 서고, 가정을 어긴 곳은 자동화 밖에 남는다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "rl-learn": [
      {
        "id": "무엇이-들어-있나-서른세-편",
        "label": "무엇이 들어 있나: 서른세 편"
      },
      {
        "id": "네-그룹을-꿰는-실-렌더는-함수-호출이다",
        "label": "네 그룹을 꿰는 실: 렌더는 함수 호출이다"
      },
      {
        "id": "순서가-주장인-이유",
        "label": "순서가 주장인 이유"
      },
      {
        "id": "실제로-돌려-보면-네-그룹의-측정-한-줄씩",
        "label": "실제로 돌려 보면: 네 그룹의 측정 한 줄씩"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "rl-ui": [
      {
        "id": "무엇을-다루나-아홉-편",
        "label": "무엇을 다루나: 아홉 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "props-는-읽기-전용이고-시간에-따라-바뀐다",
        "label": "props 는 읽기 전용이고 시간에 따라 바뀐다"
      },
      {
        "id": "조건-리스트-트리",
        "label": "조건·리스트·트리"
      },
      {
        "id": "문제-컴포넌트-안에서-컴포넌트를-정의했더니-입력값이-매-글자마다-사라진다",
        "label": "문제: 컴포넌트 안에서 컴포넌트를 정의했더니 입력값이 매 글자마다 사라진다"
      },
      {
        "id": "문제가-나는-경우-함수와-입력의-성질을-놓칠-때",
        "label": "문제가 나는 경우: 함수와 입력의 성질을 놓칠 때"
      },
      {
        "id": "문제의-구조-컴포넌트는-react-가-부르는-순수-함수고-입력은-매-호출-새로-온다",
        "label": "문제의 구조: 컴포넌트는 React 가 부르는 순수 함수고, 입력은 매 호출 새로 온다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "rl-interact": [
      {
        "id": "무엇을-다루나-여덟-편",
        "label": "무엇을 다루나: 여덟 편"
      },
      {
        "id": "실제로-돌려-보면-묶음-스냅샷-큐",
        "label": "실제로 돌려 보면: 묶음, 스냅샷, 큐"
      },
      {
        "id": "큐가-처리하는-규칙-값은-덮고-함수는-이어-간다",
        "label": "큐가 처리하는 규칙: 값은 덮고, 함수는 이어 간다"
      },
      {
        "id": "객체와-배열-바꾸지-말고-갈아-끼운다",
        "label": "객체와 배열: 바꾸지 말고 갈아 끼운다"
      },
      {
        "id": "문제-더블-클릭을-두-번-1-로-처리했는데-1-만-된다",
        "label": "문제: 더블 클릭을 두 번 +1 로 처리했는데 +1 만 된다"
      },
      {
        "id": "문제가-나는-경우-스냅샷과-큐와-불변성을-모를-때",
        "label": "문제가 나는 경우: 스냅샷과 큐와 불변성을 모를 때"
      },
      {
        "id": "문제의-구조-렌더-하나는-사진-한-장이고-갱신은-다음-사진을-위한-메모다",
        "label": "문제의 구조: 렌더 하나는 사진 한 장이고, 갱신은 다음 사진을 위한 메모다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "rl-state": [
      {
        "id": "무엇을-다루나-여덟-편",
        "label": "무엇을 다루나: 여덟 편"
      },
      {
        "id": "실제로-돌려-보면-자리가-정체다",
        "label": "실제로 돌려 보면: 자리가 정체다"
      },
      {
        "id": "구조-선택의-다섯-원칙",
        "label": "구조 선택의 다섯 원칙"
      },
      {
        "id": "자리-끌어올리기-reducer-context",
        "label": "자리, 끌어올리기, reducer, context"
      },
      {
        "id": "문제-사용자를-바꿨는데-전-사용자의-입력값이-폼에-남아-있다",
        "label": "문제: 사용자를 바꿨는데 전 사용자의 입력값이 폼에 남아 있다"
      },
      {
        "id": "문제가-나는-경우-구조와-자리를-모를-때",
        "label": "문제가 나는 경우: 구조와 자리를 모를 때"
      },
      {
        "id": "문제의-구조-사실-하나에-자리-하나-그리고-그-자리는-트리다",
        "label": "문제의 구조: 사실 하나에 자리 하나, 그리고 그 자리는 트리다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "rl-escape": [
      {
        "id": "무엇을-다루나-여덟-편",
        "label": "무엇을 다루나: 여덟 편"
      },
      {
        "id": "실제로-돌려-보면-ref-는-렌더를-안-일으키고-effect-는-커밋-뒤에-돈다",
        "label": "실제로 돌려 보면: ref 는 렌더를 안 일으키고, Effect 는 커밋 뒤에 돈다"
      },
      {
        "id": "effect-가-필요하지-않은-열-가지",
        "label": "Effect 가 필요하지 않은 열 가지"
      },
      {
        "id": "생명주기-이벤트-분리-의존성-제거-커스텀-훅",
        "label": "생명주기, 이벤트 분리, 의존성 제거, 커스텀 훅"
      },
      {
        "id": "문제-props-가-바뀌면-effect-로-state-를-맞추는데-한-박자-늦고-때로-무한-루프다",
        "label": "문제: props 가 바뀌면 Effect 로 state 를 맞추는데 한 박자 늦고, 때로 무한 루프다"
      },
      {
        "id": "문제가-나는-경우-바깥이-아닌-것을-바깥처럼-다룰-때",
        "label": "문제가 나는 경우: 바깥이 아닌 것을 바깥처럼 다룰 때"
      },
      {
        "id": "문제의-구조-effect-는-렌더의-결과를-바깥에-맞추는-것-이고-바깥이-아니면-쓸-자리가-없다",
        "label": "문제의 구조: Effect 는 '렌더의 결과를 바깥에 맞추는 것'이고, 바깥이 아니면 쓸 자리가 없다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "패키지가-갈라진-이유",
        "label": "패키지가 갈라진 이유"
      },
      {
        "id": "규칙이-레퍼런스에-있는-이유",
        "label": "규칙이 레퍼런스에 있는 이유"
      },
      {
        "id": "여덟-갈래의-지도와-실제-패키지",
        "label": "여덟 갈래의 지도와 실제 패키지"
      },
      {
        "id": "참고서를-읽는-법",
        "label": "참고서를 읽는 법"
      }
    ],
    "ra-react": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면-이-패키지만으로-되는-것",
        "label": "실제로 돌려 보면: 이 패키지만으로 되는 것"
      },
      {
        "id": "문제의-구조-react-는-무엇을-그릴지-만-알고-어디에-는-모른다",
        "label": "문제의 구조: react 는 '무엇을 그릴지' 만 알고 '어디에' 는 모른다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "ra-react-hooks": [
      {
        "id": "무엇이-들어-있나-여섯-가족",
        "label": "무엇이 들어 있나: 여섯 가족"
      },
      {
        "id": "실제로-돌려-보면-가족별-한-줄",
        "label": "실제로 돌려 보면: 가족별 한 줄"
      },
      {
        "id": "자주-헷갈리는-짝-넷",
        "label": "자주 헷갈리는 짝 넷"
      },
      {
        "id": "문제-useeffect-로-툴팁-위치를-맞추니-한-프레임-깜빡인다",
        "label": "문제: useEffect 로 툴팁 위치를 맞추니 한 프레임 깜빡인다"
      },
      {
        "id": "문제가-나는-경우-가족을-잘못-고를-때",
        "label": "문제가 나는 경우: 가족을 잘못 고를 때"
      },
      {
        "id": "문제의-구조-훅은-렌더에-매단-상태-효과-이고-가족마다-매다는-시점이-다르다",
        "label": "문제의 구조: 훅은 '렌더에 매단 상태·효과' 이고, 가족마다 매다는 시점이 다르다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-react-components": [
      {
        "id": "무엇이-들어-있나-여섯",
        "label": "무엇이 들어 있나: 여섯"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "suspense-를-어디에-두나",
        "label": "Suspense 를 어디에 두나"
      },
      {
        "id": "문제-데이터가-왔는데-스피너가-300ms-더-돈다",
        "label": "문제: 데이터가 왔는데 스피너가 300ms 더 돈다"
      },
      {
        "id": "문제가-나는-경우-여섯의-경계를-모를-때",
        "label": "문제가 나는 경우: 여섯의 경계를 모를 때"
      },
      {
        "id": "문제의-구조-여섯은-트리의-사이-에-서서-자식의-시간을-바꾼다",
        "label": "문제의 구조: 여섯은 트리의 '사이'에 서서 자식의 시간을 바꾼다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-react-apis": [
      {
        "id": "무엇이-들어-있나-열둘",
        "label": "무엇이 들어 있나: 열둘"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-memo-를-붙였는데-자식이-매번-다시-그려진다",
        "label": "문제: memo 를 붙였는데 자식이 매번 다시 그려진다"
      },
      {
        "id": "문제가-나는-경우-함수가-더하는-것을-모를-때",
        "label": "문제가 나는 경우: 함수가 더하는 것을 모를 때"
      },
      {
        "id": "문제의-구조-컴포넌트를-감싸거나-만드는-함수들이고-감싼-것의-성질을-알아야-한다",
        "label": "문제의 구조: 컴포넌트를 '감싸거나 만드는' 함수들이고, 감싼 것의 성질을 알아야 한다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-dom": [
      {
        "id": "무엇이-들어-있나-여섯",
        "label": "무엇이 들어 있나: 여섯"
      },
      {
        "id": "실제로-돌려-보면-세-자리의-차이",
        "label": "실제로 돌려 보면: 세 자리의 차이"
      },
      {
        "id": "문제의-구조-한-트리-세-출구",
        "label": "문제의 구조: 한 트리, 세 출구"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "ra-dom-hooks": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-제출-버튼이-저장-중-으로-바뀌지-않는다",
        "label": "문제: 제출 버튼이 '저장 중' 으로 바뀌지 않는다"
      },
      {
        "id": "문제가-나는-경우-어느-form-의-상태인지-모를-때",
        "label": "문제가 나는 경우: 어느 form 의 상태인지 모를 때"
      },
      {
        "id": "문제의-구조-상태는-form-에-있고-훅은-위로-만-본다",
        "label": "문제의 구조: 상태는 form 에 있고, 훅은 '위로' 만 본다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-dom-components": [
      {
        "id": "무엇이-들어-있나-공통-props",
        "label": "무엇이 들어 있나: 공통 props"
      },
      {
        "id": "무엇이-들어-있나-폼-요소의-제어와-비제어",
        "label": "무엇이 들어 있나: 폼 요소의 제어와 비제어"
      },
      {
        "id": "무엇이-들어-있나-head-로-올라가는-다섯-19",
        "label": "무엇이 들어 있나: head 로 올라가는 다섯 (19)"
      },
      {
        "id": "실제로-돌려-보면-html-과-다른-자리들",
        "label": "실제로 돌려 보면: HTML 과 다른 자리들"
      },
      {
        "id": "문제-검색창에-타이핑이-안-된다",
        "label": "문제: 검색창에 타이핑이 안 된다"
      },
      {
        "id": "문제가-나는-경우-html-습관이-그대로-올-때",
        "label": "문제가 나는 경우: HTML 습관이 그대로 올 때"
      },
      {
        "id": "문제의-구조-react-는-dom-의-주인-이-되려-하고-html-은-자기-방식이-있다",
        "label": "문제의 구조: React 는 DOM 의 '주인' 이 되려 하고, HTML 은 자기 방식이 있다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-dom-apis": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-인쇄-미리보기에-인쇄용-레이아웃-이-안-나온다",
        "label": "문제: 인쇄 미리보기에 '인쇄용 레이아웃' 이 안 나온다"
      },
      {
        "id": "문제가-나는-경우-트리-밖과-시간을-잘못-다룰-때",
        "label": "문제가 나는 경우: 트리 밖과 시간을 잘못 다룰 때"
      },
      {
        "id": "문제의-구조-react-트리와-dom-트리-react-시간과-브라우저-시간이-어긋나는-자리",
        "label": "문제의 구조: React 트리와 DOM 트리, React 시간과 브라우저 시간이 어긋나는 자리"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-dom-client": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면-에러-셋이-가는-곳",
        "label": "실제로 돌려 보면: 에러 셋이 가는 곳"
      },
      {
        "id": "문제-배포-뒤-sentry-에-아무것도-안-오는데-사용자는-흰-화면을-본다",
        "label": "문제: 배포 뒤 Sentry 에 아무것도 안 오는데 사용자는 흰 화면을 본다"
      },
      {
        "id": "문제가-나는-경우-뿌리를-잘못-다룰-때",
        "label": "문제가 나는 경우: 뿌리를 잘못 다룰 때"
      },
      {
        "id": "문제의-구조-뿌리는-하나의-계약-이고-에러는-세-층으로-나간다",
        "label": "문제의 구조: 뿌리는 하나의 '계약' 이고, 에러는 세 층으로 나간다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-dom-server": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면-스트림이-흘러가는-모양",
        "label": "실제로 돌려 보면: 스트림이 흘러가는 모양"
      },
      {
        "id": "문제-느린-api-하나-때문에-페이지-전체가-늦게-뜬다",
        "label": "문제: 느린 API 하나 때문에 페이지 전체가 늦게 뜬다"
      },
      {
        "id": "문제가-나는-경우-출구를-잘못-고를-때",
        "label": "문제가 나는 경우: 출구를 잘못 고를 때"
      },
      {
        "id": "문제의-구조-언제-끝나야-하나-가-api-를-고른다",
        "label": "문제의 구조: '언제 끝나야 하나' 가 API 를 고른다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-dom-static": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-빌드한-html-에-로딩-이-박혀-있다",
        "label": "문제: 빌드한 HTML 에 '로딩…' 이 박혀 있다"
      },
      {
        "id": "문제가-나는-경우-빌드-때와-요청-때를-섞을-때",
        "label": "문제가 나는 경우: 빌드 때와 요청 때를 섞을 때"
      },
      {
        "id": "문제의-구조-시간을-둘로-가른다-빌드-때-아는-것과-요청-때만-아는-것",
        "label": "문제의 구조: 시간을 둘로 가른다 — 빌드 때 아는 것과 요청 때만 아는 것"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-compiler": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면-컴파일-전후",
        "label": "실제로 돌려 보면: 컴파일 전후"
      },
      {
        "id": "문제의-구조-컴파일러는-순수하다-는-약속-위에서만-코드를-바꿀-수-있다",
        "label": "문제의 구조: 컴파일러는 '순수하다' 는 약속 위에서만 코드를 바꿀 수 있다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "ra-compiler-config": [
      {
        "id": "무엇이-들어-있나-다섯-옵션",
        "label": "무엇이 들어 있나: 다섯 옵션"
      },
      {
        "id": "실제로-돌려-보면-옵션을-바꾸면",
        "label": "실제로 돌려 보면: 옵션을 바꾸면"
      },
      {
        "id": "문제-켰는데-빨라진-게-없다",
        "label": "문제: 켰는데 빨라진 게 없다"
      },
      {
        "id": "문제가-나는-경우-옵션을-잘못-잡을-때",
        "label": "문제가 나는 경우: 옵션을 잘못 잡을 때"
      },
      {
        "id": "문제의-구조-옵션은-어디까지-바꿀-것인가-와-실패를-어떻게-다룰-것인가-두-축",
        "label": "문제의 구조: 옵션은 '어디까지 바꿀 것인가' 와 '실패를 어떻게 다룰 것인가' 두 축"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-compiler-directives": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-컴파일러를-켜자-폼-라이브러리-값이-갱신되지-않는다",
        "label": "문제: 컴파일러를 켜자 폼 라이브러리 값이 갱신되지 않는다"
      },
      {
        "id": "문제가-나는-경우-스위치를-잘못-쓸-때",
        "label": "문제가 나는 경우: 스위치를 잘못 쓸 때"
      },
      {
        "id": "문제의-구조-지시어는-범위-설정-의-예외이고-예외는-임시여야-한다",
        "label": "문제의 구조: 지시어는 범위(설정)의 예외이고, 예외는 임시여야 한다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-devtools": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "다른-노드의-측정이-트랙에서-보이는-모양",
        "label": "다른 노드의 측정이 트랙에서 보이는 모양"
      },
      {
        "id": "문제-입력이-버벅이는데-어느-컴포넌트-탓인지-모른다",
        "label": "문제: 입력이 버벅이는데 어느 컴포넌트 탓인지 모른다"
      },
      {
        "id": "문제가-나는-경우-측정을-잘못-읽을-때",
        "label": "문제가 나는 경우: 측정을 잘못 읽을 때"
      },
      {
        "id": "문제의-구조-느림은-어느-레인에서-어느-컴포넌트가-얼마나-의-세-좌표다",
        "label": "문제의 구조: 느림은 '어느 레인에서, 어느 컴포넌트가, 얼마나' 의 세 좌표다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-eslint": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면-최소-예제-열다섯",
        "label": "실제로 돌려 보면: 최소 예제 열다섯"
      },
      {
        "id": "문제의-구조-린트는-컴파일러가-건너뛸-자리를-쓰는-중에-미리-보여-준다",
        "label": "문제의 구조: 린트는 컴파일러가 '건너뛸' 자리를 쓰는 중에 미리 보여 준다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "ra-eslint-lints": [
      {
        "id": "묶음-1-훅과-컴포넌트의-자리",
        "label": "묶음 1: 훅과 컴포넌트의 자리"
      },
      {
        "id": "묶음-2-렌더의-순수성",
        "label": "묶음 2: 렌더의 순수성"
      },
      {
        "id": "묶음-3-메모이제이션과-호환성",
        "label": "묶음 3: 메모이제이션과 호환성"
      },
      {
        "id": "묶음-4-컴파일러-설정-검증",
        "label": "묶음 4: 컴파일러 설정 검증"
      },
      {
        "id": "문제-missing-dependency-경고를-끄려고-의존성-배열을-비웠다",
        "label": "문제: 'missing dependency' 경고를 끄려고 의존성 배열을 비웠다"
      },
      {
        "id": "문제가-나는-경우-경고를-잘못-다룰-때",
        "label": "문제가 나는 경우: 경고를 잘못 다룰 때"
      },
      {
        "id": "문제의-구조-열일곱은-react-규칙-셋-의-검사기이고-메시지는-어느-규칙인지를-말한다",
        "label": "문제의 구조: 열일곱은 'React 규칙 셋' 의 검사기이고, 메시지는 어느 규칙인지를 말한다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-rules": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면-세-검사기가-같은-규칙을-잡는다",
        "label": "실제로 돌려 보면: 세 검사기가 같은 규칙을 잡는다"
      },
      {
        "id": "문제의-구조-규칙은-react-가-마음대로-부를-수-있다-는-전제다",
        "label": "문제의 구조: 규칙은 React 가 '마음대로 부를 수 있다' 는 전제다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "ra-rules-overview": [
      {
        "id": "규칙-1-a-멱등-같은-입력이면-같은-출력",
        "label": "규칙 1-a: 멱등 — 같은 입력이면 같은 출력"
      },
      {
        "id": "규칙-1-b-부수-효과는-렌더-밖-지역-변경은-괜찮다",
        "label": "규칙 1-b: 부수 효과는 렌더 밖 — 지역 변경은 괜찮다"
      },
      {
        "id": "규칙-1-c-props-state-훅의-인자-반환값-jsx-에-넘긴-값은-불변",
        "label": "규칙 1-c: props·state, 훅의 인자·반환값, JSX 에 넘긴 값은 불변"
      },
      {
        "id": "규칙-2-react-가-컴포넌트와-훅을-부른다",
        "label": "규칙 2: React 가 컴포넌트와 훅을 부른다"
      },
      {
        "id": "규칙-3-훅의-규칙-최상위에서-react-함수에서만",
        "label": "규칙 3: 훅의 규칙 — 최상위에서, React 함수에서만"
      },
      {
        "id": "문제-지금은-되는데-strictmode-를-켜자-두-번-들어간다",
        "label": "문제: '지금은 되는데' StrictMode 를 켜자 두 번 들어간다"
      },
      {
        "id": "문제가-나는-경우-조항별",
        "label": "문제가 나는 경우: 조항별"
      },
      {
        "id": "문제의-구조-조항은-많아도-뿌리는-둘-렌더는-계산-과-훅은-순서",
        "label": "문제의 구조: 조항은 많아도 뿌리는 둘 — '렌더는 계산' 과 '훅은 순서'"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-rsc": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "실제로-돌려-보면-프레임워크-없이-보이는-것",
        "label": "실제로 돌려 보면: 프레임워크 없이 보이는 것"
      },
      {
        "id": "문제의-구조-경계를-넘는-것은-직렬화-가능한-값-과-서버-함수-참조-만이다",
        "label": "문제의 구조: 경계를 넘는 것은 '직렬화 가능한 값' 과 '서버 함수 참조' 만이다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "ra-rsc-directives": [
      {
        "id": "무엇이-들어-있나-use-client",
        "label": "무엇이 들어 있나: 'use client'"
      },
      {
        "id": "무엇이-들어-있나-use-server",
        "label": "무엇이 들어 있나: 'use server'"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-서버-컴포넌트에서-onclick-을-넘겼는데-빌드가-깨진다",
        "label": "문제: 서버 컴포넌트에서 onClick 을 넘겼는데 빌드가 깨진다"
      },
      {
        "id": "문제가-나는-경우-경계와-직렬화를-모를-때",
        "label": "문제가 나는 경우: 경계와 직렬화를 모를 때"
      },
      {
        "id": "문제의-구조-두-지시어는-코드가-어디서-돌고-사이를-무엇이-넘나-를-정하는-선이다",
        "label": "문제의 구조: 두 지시어는 '코드가 어디서 돌고, 사이를 무엇이 넘나' 를 정하는 선이다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ra-legacy": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "문제의-구조-레거시-여덟은-함수-컴포넌트-훅-jsx-가-없던-시절의-길이다",
        "label": "문제의 구조: 레거시 여덟은 '함수 컴포넌트 + 훅 + JSX' 가 없던 시절의 길이다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      }
    ],
    "ra-legacy-apis": [
      {
        "id": "children-cloneelement-자식을-데이터처럼-다루던-길",
        "label": "Children · cloneElement: 자식을 데이터처럼 다루던 길"
      },
      {
        "id": "component-purecomponent-createref-클래스의-길",
        "label": "Component · PureComponent · createRef: 클래스의 길"
      },
      {
        "id": "forwardref-createelement-isvalidelement-jsx-와-ref-가-자리를-잡기-전",
        "label": "forwardRef · createElement · isValidElement: JSX 와 ref 가 자리를 잡기 전"
      },
      {
        "id": "문제-라이브러리를-19-로-올리자-forwardref-타입과-element-ref-에서-깨진다",
        "label": "문제: 라이브러리를 19 로 올리자 forwardRef 타입과 element.ref 에서 깨진다"
      },
      {
        "id": "문제가-나는-경우-레거시를-만났을-때",
        "label": "문제가 나는 경우: 레거시를 만났을 때"
      },
      {
        "id": "문제의-구조-레거시는-암묵-을-명시-로-바꾸라는-목록이다",
        "label": "문제의 구조: 레거시는 '암묵' 을 '명시' 로 바꾸라는 목록이다"
      },
      {
        "id": "다음-입구",
        "label": "다음 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js": [
      {
        "id": "세-파트로-나뉜다",
        "label": "세 파트로 나뉜다"
      },
      {
        "id": "이-선이-첫-질문이-된다",
        "label": "이 선이 첫 질문이 된다"
      },
      {
        "id": "제가-걸린-곳은-대부분-뒤쪽이었다",
        "label": "제가 걸린 곳은 대부분 뒤쪽이었다"
      },
      {
        "id": "스물일곱-챕터-한눈에",
        "label": "스물일곱 챕터 한눈에"
      },
      {
        "id": "챕터-시트를-읽는-법",
        "label": "챕터 시트를 읽는 법"
      },
      {
        "id": "실제로-돌린-것",
        "label": "실제로 돌린 것"
      },
      {
        "id": "이-목차-밖에-있는-것들",
        "label": "이 목차 밖에 있는 것들"
      }
    ],
    "js-core": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "프로토타입과-클래스가-나란히-있는-이유",
        "label": "프로토타입과 클래스가 나란히 있는 이유"
      },
      {
        "id": "에러-핸들링이-비동기-앞에-있다",
        "label": "에러 핸들링이 비동기 앞에 있다"
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳"
      },
      {
        "id": "열네-장을-꿰는-실-셋",
        "label": "열네 장을 꿰는 실 셋"
      }
    ],
    "js-intro": [
      {
        "id": "무엇을-다루나-네-편",
        "label": "무엇을 다루나: 네 편"
      },
      {
        "id": "브라우저-안의-자바스크립트-할-수-있는-일과-없는-일",
        "label": "브라우저 안의 자바스크립트: 할 수 있는 일과 없는 일"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-브라우저마다-다르다-를-언어-탓으로-돌린다",
        "label": "문제: '브라우저마다 다르다'를 언어 탓으로 돌린다"
      },
      {
        "id": "문제가-나는-경우-어디를-열어-봐야-하는지-모를-때",
        "label": "문제가 나는 경우: 어디를 열어 봐야 하는지 모를 때"
      },
      {
        "id": "문제의-구조-정답이-세-층에-흩어져-있다",
        "label": "문제의 구조: 정답이 세 층에 흩어져 있다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-first-steps": [
      {
        "id": "무엇을-다루나-열여덟-편",
        "label": "무엇을 다루나: 열여덟 편"
      },
      {
        "id": "값이-바뀌는-규칙-셋-문자열로-숫자로-불린으로",
        "label": "값이 바뀌는 규칙 셋: 문자열로, 숫자로, 불린으로"
      },
      {
        "id": "값을-견주는-규칙-그리고-null-undefined의-예외",
        "label": "값을 견주는 규칙: ==, ===, 그리고 null·undefined의 예외"
      },
      {
        "id": "함수-셋-선언-표현식-화살표",
        "label": "함수 셋: 선언, 표현식, 화살표"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-0-false-가-true-라서-빈-입력이-없음-으로-처리된다",
        "label": "문제: '0' == false 가 true 라서 빈 입력이 '없음'으로 처리된다"
      },
      {
        "id": "문제가-나는-경우-변환-규칙이-섞이는-자리",
        "label": "문제가 나는 경우: 변환 규칙이 섞이는 자리"
      },
      {
        "id": "문제의-구조-변환-규칙은-셋인데-어느-연산자가-어느-규칙을-쓰는지는-따로-외워야-한다",
        "label": "문제의 구조: 변환 규칙은 셋인데 어느 연산자가 어느 규칙을 쓰는지는 따로 외워야 한다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-quality": [
      {
        "id": "무엇을-다루나-여섯-편",
        "label": "무엇을 다루나: 여섯 편"
      },
      {
        "id": "디버거가-보여-주는-세-창-scope-call-stack-watch",
        "label": "디버거가 보여 주는 세 창: Scope, Call Stack, Watch"
      },
      {
        "id": "테스트-기대를-먼저-코드로-적는다",
        "label": "테스트: 기대를 먼저 코드로 적는다"
      },
      {
        "id": "폴리필과-트랜스파일러-새-코드를-옛-엔진에서",
        "label": "폴리필과 트랜스파일러: 새 코드를 옛 엔진에서"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-콘솔에서만-재현되는-버그를-console-log-로-쫓는다",
        "label": "문제: 콘솔에서만 재현되는 버그를 console.log 로 쫓는다"
      },
      {
        "id": "문제가-나는-경우-도구를-안-쓰거나-잘못-쓸-때",
        "label": "문제가 나는 경우: 도구를 안 쓰거나 잘못 쓸 때"
      },
      {
        "id": "문제의-구조-질문이-셋인데-로그는-하나만-답한다",
        "label": "문제의 구조: 질문이 셋인데 로그는 하나만 답한다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-object-basics": [
      {
        "id": "무엇을-다루나-여덟-편",
        "label": "무엇을 다루나: 여덟 편"
      },
      {
        "id": "this-는-호출할-때-정해진다",
        "label": "this 는 호출할 때 정해진다"
      },
      {
        "id": "new-는-네-단계-심볼은-숨은-열쇠-변환은-힌트-순서",
        "label": "new 는 네 단계, 심볼은 숨은 열쇠, 변환은 힌트 순서"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-메서드를-콜백으로-넘겼더니-this-가-사라진다",
        "label": "문제: 메서드를 콜백으로 넘겼더니 this 가 사라진다"
      },
      {
        "id": "문제가-나는-경우-참조와-this-를-값처럼-다룰-때",
        "label": "문제가 나는 경우: 참조와 this 를 값처럼 다룰 때"
      },
      {
        "id": "문제의-구조-값은-복사되고-객체는-공유되며-this-는-정의가-아니라-호출이-정한다",
        "label": "문제의 구조: 값은 복사되고 객체는 공유되며, this 는 정의가 아니라 호출이 정한다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-data-types": [
      {
        "id": "무엇을-다루나-열두-편",
        "label": "무엇을 다루나: 열두 편"
      },
      {
        "id": "숫자와-문자열-담을-수-있는-것과-없는-것",
        "label": "숫자와 문자열: 담을 수 있는 것과 없는 것"
      },
      {
        "id": "배열-특별한-객체-그리고-sort-의-함정",
        "label": "배열: 특별한 객체, 그리고 sort 의 함정"
      },
      {
        "id": "map-set-weakmap-구조-분해-date-json",
        "label": "Map·Set·WeakMap, 구조 분해, Date, JSON"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-숫자-배열을-sort-했는데-10-이-2-앞에-온다",
        "label": "문제: 숫자 배열을 sort() 했는데 10 이 2 앞에 온다"
      },
      {
        "id": "문제가-나는-경우-자료형의-규칙을-당연히-그럴-것-으로-넘길-때",
        "label": "문제가 나는 경우: 자료형의 규칙을 '당연히 그럴 것'으로 넘길 때"
      },
      {
        "id": "문제의-구조-자료형마다-담는-규칙-이-있고-넣은-것과-돌려주는-것이-다를-수-있다",
        "label": "문제의 구조: 자료형마다 '담는 규칙'이 있고, 넣은 것과 돌려주는 것이 다를 수 있다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-adv-functions": [
      {
        "id": "무엇을-다루나-열한-편",
        "label": "무엇을 다루나: 열한 편"
      },
      {
        "id": "클로저-함수는-만들어진-자리를-기억한다",
        "label": "클로저: 함수는 만들어진 자리를 기억한다"
      },
      {
        "id": "this-를-정하는-세-길-call-apply-bind-그리고-화살표는-못-바꾼다",
        "label": "this 를 정하는 세 길: call, apply, bind — 그리고 화살표는 못 바꾼다"
      },
      {
        "id": "함수는-객체-스케줄링은-최소-지연",
        "label": "함수는 객체, 스케줄링은 '최소' 지연"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-반복문에서-만든-핸들러가-전부-마지막-값을-본다",
        "label": "문제: 반복문에서 만든 핸들러가 전부 마지막 값을 본다"
      },
      {
        "id": "문제가-나는-경우-함수가-무엇을-보는지-를-잘못-짚을-때",
        "label": "문제가 나는 경우: 함수가 '무엇을 보는지'를 잘못 짚을 때"
      },
      {
        "id": "문제의-구조-함수가-보는-것-둘-환경-this-의-결정-시점이-다르다",
        "label": "문제의 구조: 함수가 보는 것 둘(환경, this)의 결정 시점이 다르다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-object-props": [
      {
        "id": "무엇을-다루나-두-편",
        "label": "무엇을 다루나: 두 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-라이브러리-객체의-프로퍼티에-대입했는데-아무-일도-안-일어난다",
        "label": "문제: 라이브러리 객체의 프로퍼티에 대입했는데 아무 일도 안 일어난다"
      },
      {
        "id": "문제가-나는-경우-깃발을-모르고-프로퍼티를-열쇠-값-으로만-볼-때",
        "label": "문제가 나는 경우: 깃발을 모르고 프로퍼티를 '열쇠: 값'으로만 볼 때"
      },
      {
        "id": "문제의-구조-프로퍼티는-값-하나가-아니라-설명자-하나다",
        "label": "문제의 구조: 프로퍼티는 값 하나가 아니라 설명자 하나다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-prototypes": [
      {
        "id": "무엇을-다루나-네-편",
        "label": "무엇을 다루나: 네 편"
      },
      {
        "id": "읽기는-올라가고-쓰기는-자기에게-this-는-점-앞에",
        "label": "읽기는 올라가고, 쓰기는 자기에게, this 는 점 앞에"
      },
      {
        "id": "f-prototype-과-내장-사슬",
        "label": "F.prototype 과 내장 사슬"
      },
      {
        "id": "proto-가-없는-객체-사전으로-쓸-때",
        "label": "__proto__ 가 없는 객체: 사전으로 쓸 때"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-상속받은-배열을-공유해서-모든-인스턴스가-같은-목록을-본다",
        "label": "문제: 상속받은 배열을 공유해서 모든 인스턴스가 같은 목록을 본다"
      },
      {
        "id": "문제가-나는-경우-누구의-프로퍼티인가-를-놓칠-때",
        "label": "문제가 나는 경우: '누구의 프로퍼티인가'를 놓칠 때"
      },
      {
        "id": "문제의-구조-읽기와-쓰기가-비대칭이라-공유-와-자기-것-이-갈린다",
        "label": "문제의 구조: 읽기와 쓰기가 비대칭이라 '공유'와 '자기 것'이 갈린다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-classes": [
      {
        "id": "무엇을-다루나-일곱-편",
        "label": "무엇을 다루나: 일곱 편"
      },
      {
        "id": "class-가-함수와-다른-셋-그리고-초기화-순서",
        "label": "class 가 함수와 다른 셋, 그리고 초기화 순서"
      },
      {
        "id": "두-겹의-사슬-static-private",
        "label": "두 겹의 사슬, static, #private"
      },
      {
        "id": "내장-확장-instanceof-믹스인",
        "label": "내장 확장, instanceof, 믹스인"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-부모-생성자가-부른-메서드에서-자식-필드가-undefined-다",
        "label": "문제: 부모 생성자가 부른 메서드에서 자식 필드가 undefined 다"
      },
      {
        "id": "문제가-나는-경우-문법이-숨긴-것을-모를-때",
        "label": "문제가 나는 경우: 문법이 숨긴 것을 모를 때"
      },
      {
        "id": "문제의-구조-문법이-프로토타입을-감추되-바꾸지는-않았다",
        "label": "문제의 구조: 문법이 프로토타입을 감추되 바꾸지는 않았다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-error": [
      {
        "id": "무엇을-다루나-두-편",
        "label": "무엇을 다루나: 두 편"
      },
      {
        "id": "try-가-잡는-것과-못-잡는-것",
        "label": "try 가 잡는 것과 못 잡는 것"
      },
      {
        "id": "커스텀-에러-이름을-붙이고-계층을-만들고-감싼다",
        "label": "커스텀 에러: 이름을 붙이고, 계층을 만들고, 감싼다"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-비동기-콜백의-에러가-try-를-지나쳐-화면이-멈춘다",
        "label": "문제: 비동기 콜백의 에러가 try 를 지나쳐 화면이 멈춘다"
      },
      {
        "id": "문제가-나는-경우-잡는-범위와-아는-범위를-착각할-때",
        "label": "문제가 나는 경우: 잡는 범위와 아는 범위를 착각할 때"
      },
      {
        "id": "문제의-구조-try-는-공간이-아니라-시간을-감싼다",
        "label": "문제의 구조: try 는 공간이 아니라 시간을 감싼다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-async": [
      {
        "id": "무엇을-다루나-여덟-편",
        "label": "무엇을 다루나: 여덟 편"
      },
      {
        "id": "프라미스가-보장하는-넷",
        "label": "프라미스가 보장하는 넷"
      },
      {
        "id": "다섯-api-와-그-차이",
        "label": "다섯 API 와 그 차이"
      },
      {
        "id": "마이크로태스크와-async-await",
        "label": "마이크로태스크와 async/await"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-promise-all-로-묶었더니-상품-하나의-실패가-목록-전체를-지운다",
        "label": "문제: Promise.all 로 묶었더니 상품 하나의 실패가 목록 전체를 지운다"
      },
      {
        "id": "문제가-나는-경우-언제-와-한-번-을-놓칠-때",
        "label": "문제가 나는 경우: '언제'와 '한 번'을 놓칠 때"
      },
      {
        "id": "문제의-구조-프라미스는-한-번-끝나는-나중-이고-그-나중은-마이크로태스크다",
        "label": "문제의 구조: 프라미스는 '한 번 끝나는 나중'이고, 그 나중은 마이크로태스크다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-generators": [
      {
        "id": "무엇을-다루나-두-편",
        "label": "무엇을 다루나: 두 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-페이지-단위-api-를-재귀-콜백으로-받다가-멈출-수가-없다",
        "label": "문제: 페이지 단위 API 를 재귀 콜백으로 받다가 멈출 수가 없다"
      },
      {
        "id": "문제가-나는-경우-여럿을-하나씩-의-규칙을-놓칠-때",
        "label": "문제가 나는 경우: '여럿을 하나씩'의 규칙을 놓칠 때"
      },
      {
        "id": "문제의-구조-소비자가-당기는-모양이라-멈춤과-재개가-소비자-손에-있다",
        "label": "문제의 구조: 소비자가 당기는 모양이라, 멈춤과 재개가 소비자 손에 있다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-modules": [
      {
        "id": "무엇을-다루나-세-편",
        "label": "무엇을 다루나: 세 편"
      },
      {
        "id": "모듈이-스크립트와-다른-여섯",
        "label": "모듈이 스크립트와 다른 여섯"
      },
      {
        "id": "내보내기-가져오기-다시-내보내기",
        "label": "내보내기 · 가져오기 · 다시 내보내기"
      },
      {
        "id": "동적-import-조건부로-나중에-프라미스로",
        "label": "동적 import(): 조건부로, 나중에, 프라미스로"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-두-파일이-같은-설정-을-import-했는데-서로-다른-값을-본다",
        "label": "문제: 두 파일이 '같은 설정'을 import 했는데 서로 다른 값을 본다"
      },
      {
        "id": "문제가-나는-경우-모듈의-규칙-여섯이-스크립트와-다를-때",
        "label": "문제가 나는 경우: 모듈의 규칙 여섯이 스크립트와 다를 때"
      },
      {
        "id": "문제의-구조-파일이-경계가-되자-공유-가-암묵에서-명시로-바뀌었다",
        "label": "문제의 구조: 파일이 경계가 되자 '공유'가 암묵에서 명시로 바뀌었다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-core-misc": [
      {
        "id": "무엇을-다루나-다섯-편",
        "label": "무엇을 다루나: 다섯 편"
      },
      {
        "id": "proxy-가로채기와-그-한계-실제로-돌려-보면",
        "label": "Proxy: 가로채기와 그 한계 — 실제로 돌려 보면"
      },
      {
        "id": "eval-과-new-function-커링-참조-타입-bigint",
        "label": "eval 과 new Function, 커링, 참조 타입, BigInt"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-proxy-로-감싼-map-에-set-을-부르니-터진다",
        "label": "문제: Proxy 로 감싼 Map 에 set 을 부르니 터진다"
      },
      {
        "id": "문제가-나는-경우-가장자리의-규칙을-모를-때",
        "label": "문제가 나는 경우: 가장자리의 규칙을 모를 때"
      },
      {
        "id": "문제의-구조-언어의-가장자리는-내부-동작-에-손을-대는-자리다",
        "label": "문제의 구조: 언어의 가장자리는 '내부 동작'에 손을 대는 자리다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-browser": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "이벤트는-경로가-있다",
        "label": "이벤트는 경로가 있다"
      },
      {
        "id": "브라우저는-가만히-있지-않는다",
        "label": "브라우저는 가만히 있지 않는다"
      },
      {
        "id": "dom으로-그리면-dom으로-읽힌다",
        "label": "DOM으로 그리면 DOM으로 읽힌다"
      },
      {
        "id": "이-파트와-렌더링-노드의-경계",
        "label": "이 파트와 렌더링 노드의 경계"
      }
    ],
    "js-document": [
      {
        "id": "무엇을-다루나-열한-편",
        "label": "무엇을 다루나: 열한 편"
      },
      {
        "id": "트리는-공백도-노드다-실제로-돌려-보면",
        "label": "트리는 공백도 노드다 — 실제로 돌려 보면"
      },
      {
        "id": "속성과-프로퍼티-다른-두-물건",
        "label": "속성과 프로퍼티: 다른 두 물건"
      },
      {
        "id": "크기와-좌표-offset-client-scroll-그리고-두-좌표계",
        "label": "크기와 좌표: offset · client · scroll, 그리고 두 좌표계"
      },
      {
        "id": "문제-input-value-를-바꿨는데-html-속성이-안-바뀌고-속성을-읽어-옛-값을-쓴다",
        "label": "문제: input.value 를 바꿨는데 HTML 속성이 안 바뀌고, 속성을 읽어 옛 값을 쓴다"
      },
      {
        "id": "문제가-나는-경우-트리-속성-크기의-규칙을-당연히-로-넘길-때",
        "label": "문제가 나는 경우: 트리·속성·크기의 규칙을 '당연히'로 넘길 때"
      },
      {
        "id": "문제의-구조-소스-dom-화면이-세-층이고-각-층의-값이-다르다",
        "label": "문제의 구조: 소스·DOM·화면이 세 층이고, 각 층의 값이 다르다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-events": [
      {
        "id": "무엇을-다루나-다섯-편",
        "label": "무엇을 다루나: 다섯 편"
      },
      {
        "id": "전파-순서-실제로-돌려-보면",
        "label": "전파 순서 — 실제로 돌려 보면"
      },
      {
        "id": "위임-기본-동작-커스텀-이벤트",
        "label": "위임, 기본 동작, 커스텀 이벤트"
      },
      {
        "id": "문제-바깥-클릭으로-드롭다운을-닫는데-드롭다운-안의-버튼이-stoppropagation-을-해서-다른-메뉴가-안-닫힌다",
        "label": "문제: 바깥 클릭으로 드롭다운을 닫는데, 드롭다운 안의 버튼이 stopPropagation 을 해서 다른 메뉴가 안 닫힌다"
      },
      {
        "id": "문제가-나는-경우-전파의-길을-잊거나-막을-때",
        "label": "문제가 나는 경우: 전파의 길을 잊거나 막을 때"
      },
      {
        "id": "문제의-구조-전파는-모두가-나눠-쓰는-하나의-길이다",
        "label": "문제의 구조: 전파는 모두가 나눠 쓰는 하나의 길이다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-ui-events": [
      {
        "id": "무엇을-다루나-여섯-편",
        "label": "무엇을 다루나: 여섯 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "드래그-앤-드롭-옛-방법과-포인터-캡처",
        "label": "드래그 앤 드롭: 옛 방법과 포인터 캡처"
      },
      {
        "id": "문제-목록-항목-호버를-mouseenter-로-위임했는데-안-된다",
        "label": "문제: 목록 항목 호버를 mouseenter 로 위임했는데 안 된다"
      },
      {
        "id": "문제가-나는-경우-종류별-규칙을-섞을-때",
        "label": "문제가 나는 경우: 종류별 규칙을 섞을 때"
      },
      {
        "id": "문제의-구조-이벤트마다-버블-좌표-기본-동작-시점-네-속성이-다르게-정해져-있다",
        "label": "문제의 구조: 이벤트마다 '버블·좌표·기본 동작·시점' 네 속성이 다르게 정해져 있다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-forms": [
      {
        "id": "무엇을-다루나-네-편",
        "label": "무엇을 다루나: 네 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "focus-는-버블하지-않고-이벤트는-프로그램-변경에-나지-않는다",
        "label": "focus 는 버블하지 않고, 이벤트는 프로그램 변경에 나지 않는다"
      },
      {
        "id": "submit-이벤트와-submit-requestsubmit-유효성",
        "label": "submit 이벤트와 submit(), requestSubmit(), 유효성"
      },
      {
        "id": "문제-자바스크립트로-값을-채웠는데-v-model-이-모른다",
        "label": "문제: 자바스크립트로 값을 채웠는데 v-model 이 모른다"
      },
      {
        "id": "문제가-나는-경우-값-이벤트-전송의-자리를-헷갈릴-때",
        "label": "문제가 나는 경우: 값·이벤트·전송의 자리를 헷갈릴 때"
      },
      {
        "id": "문제의-구조-폼은-사용자-동작을-위해-만들어졌고-프로그램은-그-길-옆을-지나간다",
        "label": "문제의 구조: 폼은 사용자 동작을 위해 만들어졌고, 프로그램은 그 길 옆을 지나간다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-loading": [
      {
        "id": "무엇을-다루나-세-편",
        "label": "무엇을 다루나: 세 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "세-스크립트와-두-이벤트의-자리",
        "label": "세 스크립트와 두 이벤트의 자리"
      },
      {
        "id": "onload-onerror-리소스마다-붙는다",
        "label": "onload · onerror: 리소스마다 붙는다"
      },
      {
        "id": "문제-async-분석-스크립트가-domcontentloaded-리스너를-걸었는데-영영-안-불린다",
        "label": "문제: async 분석 스크립트가 DOMContentLoaded 리스너를 걸었는데 영영 안 불린다"
      },
      {
        "id": "문제가-나는-경우-시점을-잘못-고를-때",
        "label": "문제가 나는 경우: 시점을 잘못 고를 때"
      },
      {
        "id": "문제의-구조-문서에는-시계가-있고-코드는-그-시계의-어느-눈금에-서-있는지-알아야-한다",
        "label": "문제의 구조: 문서에는 시계가 있고, 코드는 그 시계의 어느 눈금에 서 있는지 알아야 한다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-ui-misc": [
      {
        "id": "무엇을-다루나-세-편",
        "label": "무엇을 다루나: 세 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "이벤트-루프-긴-태스크를-쪼개는-법",
        "label": "이벤트 루프: 긴 태스크를 쪼개는 법"
      },
      {
        "id": "문제-서드파티가-끼운-요소를-지우려-setinterval-로-1초마다-뒤진다",
        "label": "문제: 서드파티가 끼운 요소를 지우려 setInterval 로 1초마다 뒤진다"
      },
      {
        "id": "문제가-나는-경우-변화-선택-루프의-시점을-놓칠-때",
        "label": "문제가 나는 경우: 변화·선택·루프의 시점을 놓칠 때"
      },
      {
        "id": "문제의-구조-세-편-모두-내-코드-바깥에서-일어나는-일-을-다룬다",
        "label": "문제의 구조: 세 편 모두 '내 코드 바깥에서 일어나는 일'을 다룬다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-extra": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "다른-창은-다른-세계다",
        "label": "다른 창은 다른 세계다"
      },
      {
        "id": "애니메이션-장이-성능-장이기도-하다",
        "label": "애니메이션 장이 성능 장이기도 하다"
      },
      {
        "id": "일곱-장의-공통점-경계를-넘는다",
        "label": "일곱 장의 공통점: 경계를 넘는다"
      }
    ],
    "js-frames": [
      {
        "id": "무엇을-다루나-세-편",
        "label": "무엇을 다루나: 세 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "같은-출처-로드-전후의-document-가-다르다",
        "label": "같은 출처: 로드 전후의 document 가 다르다"
      },
      {
        "id": "다른-출처-postmessage-와-origin-확인-그리고-클릭재킹",
        "label": "다른 출처: postMessage 와 origin 확인, 그리고 클릭재킹"
      },
      {
        "id": "문제-로그인-뒤-창을-닫고-부모를-새로고침-하려는데-opener-가-null-이다",
        "label": "문제: 로그인 뒤 '창을 닫고 부모를 새로고침'하려는데 opener 가 null 이다"
      },
      {
        "id": "문제가-나는-경우-창의-경계를-잘못-짚을-때",
        "label": "문제가 나는 경우: 창의 경계를 잘못 짚을 때"
      },
      {
        "id": "문제의-구조-창마다-세계가-따로고-세계-사이에는-출처라는-벽이-있다",
        "label": "문제의 구조: 창마다 세계가 따로고, 세계 사이에는 출처라는 벽이 있다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-binary": [
      {
        "id": "무엇을-다루나-네-편",
        "label": "무엇을 다루나: 네 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "blob-과-file-묶고-주소를-주고-읽는다",
        "label": "Blob 과 File: 묶고, 주소를 주고, 읽는다"
      },
      {
        "id": "문제-서버가-준-2바이트-정수를-uint16array-로-읽으니-값이-뒤집힌다",
        "label": "문제: 서버가 준 2바이트 정수를 Uint16Array 로 읽으니 값이 뒤집힌다"
      },
      {
        "id": "문제가-나는-경우-글자와-바이트-복사와-창을-섞을-때",
        "label": "문제가 나는 경우: 글자와 바이트, 복사와 창을 섞을 때"
      },
      {
        "id": "문제의-구조-바이트는-뜻이-없고-뜻은-어떤-창으로-보느냐-가-정한다",
        "label": "문제의 구조: 바이트는 뜻이 없고, 뜻은 '어떤 창으로 보느냐'가 정한다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-network": [
      {
        "id": "무엇을-다루나-열두-편",
        "label": "무엇을 다루나: 열두 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "cors-다른-출처의-서버가-허락하는-법",
        "label": "CORS: 다른 출처의 서버가 허락하는 법"
      },
      {
        "id": "본문-읽기-중단-그리고-세-가지-계속-받기",
        "label": "본문 읽기, 중단, 그리고 세 가지 '계속 받기'"
      },
      {
        "id": "문제-404-가-catch-로-안-가서-성공-처리가-돈다",
        "label": "문제: 404 가 catch 로 안 가서 '성공' 처리가 돈다"
      },
      {
        "id": "문제가-나는-경우-끝나는-곳-실패하는-곳-허락하는-곳을-잘못-짚을-때",
        "label": "문제가 나는 경우: 끝나는 곳, 실패하는 곳, 허락하는 곳을 잘못 짚을 때"
      },
      {
        "id": "문제의-구조-요청의-끝은-셋이고-허락하는-쪽은-서버다",
        "label": "문제의 구조: 요청의 끝은 셋이고, 허락하는 쪽은 서버다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-storage": [
      {
        "id": "무엇을-다루나-세-편",
        "label": "무엇을 다루나: 세 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "셋을-가르는-세-질문",
        "label": "셋을 가르는 세 질문"
      },
      {
        "id": "문제-설정-객체를-localstorage-에-넣었는데-꺼내니-object-object-다",
        "label": "문제: 설정 객체를 localStorage 에 넣었는데 꺼내니 '[object Object]' 다"
      },
      {
        "id": "문제가-나는-경우-저장소의-모양과-수명을-헷갈릴-때",
        "label": "문제가 나는 경우: 저장소의 모양과 수명을 헷갈릴 때"
      },
      {
        "id": "문제의-구조-저장소마다-누가-읽고-어디까지-보이고-얼마나-사나-가-다르다",
        "label": "문제의 구조: 저장소마다 '누가 읽고, 어디까지 보이고, 얼마나 사나'가 다르다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-animation": [
      {
        "id": "무엇을-다루나-세-편",
        "label": "무엇을 다루나: 세 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "css-에-맡기기-트랜지션-키프레임-타이밍-함수",
        "label": "CSS 에 맡기기: 트랜지션, 키프레임, 타이밍 함수"
      },
      {
        "id": "자바스크립트로-그리기-시간-기반-매-프레임-raf",
        "label": "자바스크립트로 그리기: 시간 기반, 매 프레임, rAF"
      },
      {
        "id": "문제-클래스를-붙였는데-트랜지션-없이-바로-바뀐다",
        "label": "문제: 클래스를 붙였는데 트랜지션 없이 바로 바뀐다"
      },
      {
        "id": "문제가-나는-경우-프레임과-비용을-모를-때",
        "label": "문제가 나는 경우: 프레임과 비용을 모를 때"
      },
      {
        "id": "문제의-구조-애니메이션은-프레임마다-한-상태-를-그리는-일이고-누가-그리느냐가-비용을-정한다",
        "label": "문제의 구조: 애니메이션은 '프레임마다 한 상태'를 그리는 일이고, 누가 그리느냐가 비용을 정한다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-webcomponents": [
      {
        "id": "무엇을-다루나-일곱-편",
        "label": "무엇을 다루나: 일곱 편"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "경계를-넘는-것과-못-넘는-것",
        "label": "경계를 넘는 것과 못 넘는 것"
      },
      {
        "id": "생명주기와-업그레이드-template-과-슬롯",
        "label": "생명주기와 업그레이드, template 과 슬롯"
      },
      {
        "id": "문제-컴포넌트-안에서-보낸-커스텀-이벤트를-바깥-리스너가-못-받는다",
        "label": "문제: 컴포넌트 안에서 보낸 커스텀 이벤트를 바깥 리스너가 못 받는다"
      },
      {
        "id": "문제가-나는-경우-경계의-규칙을-모를-때",
        "label": "문제가 나는 경우: 경계의 규칙을 모를 때"
      },
      {
        "id": "문제의-구조-경계는-세-종류에-대해-세-가지로-동작한다",
        "label": "문제의 구조: 경계는 세 종류에 대해 세 가지로 동작한다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "js-regexp": [
      {
        "id": "무엇을-다루나-열일곱-편",
        "label": "무엇을 다루나: 열일곱 편"
      },
      {
        "id": "실제로-돌려-보면-글자와-자리",
        "label": "실제로 돌려 보면: 글자와 자리"
      },
      {
        "id": "실제로-돌려-보면-반복-묶기-조건",
        "label": "실제로 돌려 보면: 반복, 묶기, 조건"
      },
      {
        "id": "엔진-백트래킹-파국-sticky-lastindex",
        "label": "엔진: 백트래킹, 파국, sticky, lastIndex"
      },
      {
        "id": "문제-사용자-입력에-돌린-정규식-하나가-서버를-멈춘다",
        "label": "문제: 사용자 입력에 돌린 정규식 하나가 서버를 멈춘다"
      },
      {
        "id": "문제가-나는-경우-한글-유니코드-엔진을-모를-때",
        "label": "문제가 나는 경우: 한글·유니코드·엔진을 모를 때"
      },
      {
        "id": "문제의-구조-정규식은-영어-기준으로-설계된-작은-언어이고-엔진은-되돌아간다",
        "label": "문제의 구조: 정규식은 영어 기준으로 설계된 작은 언어이고, 엔진은 되돌아간다"
      },
      {
        "id": "스물일곱-챕터를-돌아보면",
        "label": "스물일곱 챕터를 돌아보면"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "ts": [
      {
        "id": "문서가-갈라-놓은-아홉-갈래",
        "label": "문서가 갈라 놓은 아홉 갈래"
      },
      {
        "id": "타입은-런타임에-없다",
        "label": "타입은 런타임에 없다"
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳"
      }
    ],
    "ts-start": [
      {
        "id": "다섯-개의-입구",
        "label": "다섯 개의 입구"
      },
      {
        "id": "oop-배경을-위한-문이-따로-있는-이유",
        "label": "OOP 배경을 위한 문이 따로 있는 이유"
      },
      {
        "id": "제가-실제로-지나온-문",
        "label": "제가 실제로 지나온 문"
      }
    ],
    "ts-handbook": [
      {
        "id": "여덟-장의-순서",
        "label": "여덟 장의 순서"
      },
      {
        "id": "좁히기가-이-문서의-중심이다",
        "label": "좁히기가 이 문서의 중심이다"
      },
      {
        "id": "타입-조작은-중복을-지우는-장이다",
        "label": "타입 조작은 중복을 지우는 장이다"
      },
      {
        "id": "실제로-부딪힌-곳",
        "label": "실제로 부딪힌 곳"
      }
    ],
    "ts-hb-everyday": [
      {
        "id": "열네-개의-대제목",
        "label": "열네 개의 대제목"
      }
    ],
    "ts-ev-primitives": [
      {
        "id": "자바스크립트-원시-값마다-짝이-되는-타입이-있다",
        "label": "자바스크립트 원시 값마다 짝이 되는 타입이 있다"
      },
      {
        "id": "대문자-string-number-boolean은-래퍼-객체의-타입이다",
        "label": "대문자 String, Number, Boolean은 래퍼 객체의 타입이다"
      }
    ],
    "ts-ev-arrays": [
      {
        "id": "배열은-타입-뒤에-를-붙인다",
        "label": "배열은 타입 뒤에 [ ]를 붙인다"
      },
      {
        "id": "array-number-도-같은-뜻이다",
        "label": "Array<number>도 같은 뜻이다"
      },
      {
        "id": "number-는-배열이-아니라-튜플이다",
        "label": "[number]는 배열이 아니라 튜플이다"
      }
    ],
    "ts-ev-any": [
      {
        "id": "any는-그-값의-타입-검사를-끈다",
        "label": "any는 그 값의 타입 검사를 끈다"
      },
      {
        "id": "noimplicitany-조용히-생긴-any를-에러로-잡는다",
        "label": "noImplicitAny: 조용히 생긴 any를 에러로 잡는다"
      }
    ],
    "ts-ev-annotations": [
      {
        "id": "타입-어노테이션이란",
        "label": "타입 어노테이션이란"
      },
      {
        "id": "타입은-변수-이름-뒤에-적는다",
        "label": "타입은 변수 이름 뒤에 적는다"
      },
      {
        "id": "대부분은-적지-않아도-추론된다",
        "label": "대부분은 적지 않아도 추론된다"
      }
    ],
    "ts-ev-functions": [
      {
        "id": "함수는-입력과-출력의-타입을-정할-수-있다",
        "label": "함수는 입력과 출력의 타입을 정할 수 있다"
      },
      {
        "id": "매개변수-타입-어노테이션-parameter-type-annotations",
        "label": "매개변수 타입 어노테이션 (Parameter Type Annotations)"
      },
      {
        "id": "반환-타입-어노테이션-return-type-annotations",
        "label": "반환 타입 어노테이션 (Return Type Annotations)"
      },
      {
        "id": "비동기-함수의-반환-타입-어노테이션-promise-t",
        "label": "비동기 함수의 반환 타입 어노테이션: Promise<T>"
      },
      {
        "id": "익명-함수-anonymous-functions",
        "label": "익명 함수 (Anonymous Functions)"
      }
    ],
    "ts-ev-objects": [
      {
        "id": "객체-타입은-속성과-그-타입을-나열한다",
        "label": "객체 타입은 속성과 그 타입을 나열한다"
      },
      {
        "id": "선택적-속성-optional-properties",
        "label": "선택적 속성 (Optional Properties)"
      }
    ],
    "ts-ev-unions": [
      {
        "id": "타입을-조합하기-시작한다",
        "label": "타입을 조합하기 시작한다"
      },
      {
        "id": "유니온-타입-정의하기-defining-a-union-type",
        "label": "유니온 타입 정의하기 (Defining a Union Type)"
      },
      {
        "id": "유니온-타입-다루기-working-with-union-types",
        "label": "유니온 타입 다루기 (Working with Union Types)"
      },
      {
        "id": "모든-멤버에-공통으로-있으면-좁히지-않고-쓴다",
        "label": "모든 멤버에 공통으로 있으면 좁히지 않고 쓴다"
      }
    ],
    "ts-ev-aliases": [
      {
        "id": "타입-별칭은-타입에-붙이는-이름이다",
        "label": "타입 별칭은 타입에 붙이는 이름이다"
      },
      {
        "id": "객체-말고-어떤-타입에도-붙일-수-있다",
        "label": "객체 말고 어떤 타입에도 붙일 수 있다"
      },
      {
        "id": "별칭은-별칭일-뿐-새-타입이-아니다",
        "label": "별칭은 별칭일 뿐, 새 타입이 아니다"
      }
    ],
    "ts-ev-interfaces": [
      {
        "id": "인터페이스는-객체-타입에-이름을-붙이는-또-다른-방법이다",
        "label": "인터페이스는 객체 타입에 이름을 붙이는 또 다른 방법이다"
      },
      {
        "id": "타입-별칭과-인터페이스의-차이-differences-between-type-aliases-and-interfaces",
        "label": "타입 별칭과 인터페이스의 차이 (Differences Between Type Aliases and Interfaces)"
      },
      {
        "id": "그-밖의-차이와-고르는-기준",
        "label": "그 밖의 차이와 고르는 기준"
      }
    ],
    "ts-ev-assertions": [
      {
        "id": "타입-단언은-내가-아는-타입을-알려-주는-것이다",
        "label": "타입 단언은 내가 아는 타입을 알려 주는 것이다"
      },
      {
        "id": "말이-안-되는-단언은-막는다",
        "label": "말이 안 되는 단언은 막는다"
      }
    ],
    "ts-ev-literals": [
      {
        "id": "특정-값-하나도-타입이-될-수-있다",
        "label": "특정 값 하나도 타입이 될 수 있다"
      },
      {
        "id": "리터럴-타입은-유니온으로-묶을-때-쓸모가-생긴다",
        "label": "리터럴 타입은 유니온으로 묶을 때 쓸모가 생긴다"
      },
      {
        "id": "리터럴-추론-literal-inference",
        "label": "리터럴 추론 (Literal Inference)"
      }
    ],
    "ts-ev-null": [
      {
        "id": "값이-없다는-뜻의-두-원시-값",
        "label": "값이 없다는 뜻의 두 원시 값"
      },
      {
        "id": "strictnullchecks-꺼짐",
        "label": "strictNullChecks 꺼짐"
      },
      {
        "id": "strictnullchecks-켜짐",
        "label": "strictNullChecks 켜짐"
      },
      {
        "id": "null-아님-단언-연산자-postfix",
        "label": "null 아님 단언 연산자 (Postfix !)"
      }
    ],
    "ts-ev-enums": [
      {
        "id": "열거형은-타입이-아니라-실행되는-코드까지-더한다",
        "label": "열거형은 타입이 아니라 실행되는 코드까지 더한다"
      }
    ],
    "ts-ev-rare": [
      {
        "id": "아주-큰-정수를-위한-bigint",
        "label": "아주 큰 정수를 위한 bigint"
      },
      {
        "id": "절대-겹치지-않는-참조를-만드는-symbol",
        "label": "절대 겹치지 않는 참조를 만드는 symbol"
      }
    ],
    "ts-reference": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "유틸리티-타입은-결국-타입-조작의-예제집이다",
        "label": "유틸리티 타입은 결국 타입 조작의 예제집이다"
      },
      {
        "id": "타입-호환성과-타입-추론",
        "label": "타입 호환성과 타입 추론"
      }
    ],
    "ts-modules-ref": [
      {
        "id": "소개-이론-가이드-참고서-부록",
        "label": "소개·이론·가이드·참고서·부록"
      },
      {
        "id": "타입은-컴파일러가-실행은-런타임이-정한다",
        "label": "타입은 컴파일러가, 실행은 런타임이 정한다"
      },
      {
        "id": "esm과-cjs의-상호운용",
        "label": "ESM과 CJS의 상호운용"
      }
    ],
    "ts-tutorials": [
      {
        "id": "다섯-개의-상황",
        "label": "다섯 개의 상황"
      },
      {
        "id": "마이그레이션-문서가-본편이다",
        "label": "마이그레이션 문서가 본편이다"
      },
      {
        "id": "필요할-때-여는-곳",
        "label": "필요할 때 여는 곳"
      }
    ],
    "ts-whatsnew": [
      {
        "id": "버전-목록-그대로",
        "label": "버전 목록 그대로"
      },
      {
        "id": "왜-읽게-되는가",
        "label": "왜 읽게 되는가"
      },
      {
        "id": "버전을-올리기-전에",
        "label": "버전을 올리기 전에"
      }
    ],
    "ts-declaration": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "do-s-and-don-ts가-제일-실용적이다",
        "label": "Do's and Don'ts가 제일 실용적이다"
      },
      {
        "id": "읽는-법을-배우는-데-먼저-쓴다",
        "label": "읽는 법을 배우는 데 먼저 쓴다"
      }
    ],
    "ts-js": [
      {
        "id": "네-갈래",
        "label": "네 갈래"
      },
      {
        "id": "jsdoc이-타입-표기가-된다",
        "label": "JSDoc이 타입 표기가 된다"
      },
      {
        "id": "왜-남겨-뒀나",
        "label": "왜 남겨 뒀나"
      }
    ],
    "ts-config": [
      {
        "id": "무엇이-들어-있나",
        "label": "무엇이 들어 있나"
      },
      {
        "id": "strict는-한-개가-아니다",
        "label": "strict는 한 개가 아니다"
      },
      {
        "id": "설정이-곧-팀의-합의다",
        "label": "설정이 곧 팀의 합의다"
      }
    ],
    "vue": [
      {
        "id": "반응성은-비교가-아니라-추적이다",
        "label": "반응성은 비교가 아니라 추적이다"
      },
      {
        "id": "템플릿은-컴파일러를-거친다",
        "label": "템플릿은 컴파일러를 거친다"
      },
      {
        "id": "api가-둘인-이유",
        "label": "API가 둘인 이유"
      },
      {
        "id": "문서가-갈라-놓은-다섯-갈래",
        "label": "문서가 갈라 놓은 다섯 갈래"
      }
    ],
    "vg": [
      {
        "id": "핵심-개념은-한-줄로-이어진다",
        "label": "핵심 개념은 한 줄로 이어진다"
      },
      {
        "id": "컴포넌트-심화와-재사용성이-갈라진-이유",
        "label": "컴포넌트 심화와 재사용성이 갈라진 이유"
      },
      {
        "id": "왜-는-맨-뒤에-있다",
        "label": "'왜'는 맨 뒤에 있다"
      },
      {
        "id": "두-api를-한-문서로-읽는-법",
        "label": "두 API를 한 문서로 읽는 법"
      }
    ],
    "va": [
      {
        "id": "여섯-갈래",
        "label": "여섯 갈래"
      },
      {
        "id": "반응성이-셋으로-나뉜-이유",
        "label": "반응성이 셋으로 나뉜 이유"
      },
      {
        "id": "싱글-파일-컴포넌트가-따로-있는-이유",
        "label": "싱글 파일 컴포넌트가 따로 있는 이유"
      },
      {
        "id": "내장-기능은-문법이-아니라-api다",
        "label": "내장 기능은 문법이 아니라 API다"
      }
    ],
    "git": [
      {
        "id": "일곱-단계로-나눈-이유",
        "label": "일곱 단계로 나눈 이유"
      },
      {
        "id": "각-단계는-같은-흐름으로-읽는다",
        "label": "각 단계는 같은 흐름으로 읽는다"
      },
      {
        "id": "연습은-버려도-되는-저장소에서",
        "label": "연습은 버려도 되는 저장소에서"
      }
    ],
    "git-areas": [
      {
        "id": "세-공간",
        "label": "세 공간"
      },
      {
        "id": "커밋에-들어-있는-것",
        "label": "커밋에 들어 있는 것"
      },
      {
        "id": "두-단계로-나눈-이유는-골라-담기-위해서",
        "label": "두 단계로 나눈 이유는 골라 담기 위해서"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "git-branch": [
      {
        "id": "커밋은-앞-커밋을-기억한다",
        "label": "커밋은 앞 커밋을 기억한다"
      },
      {
        "id": "브랜치는-커밋-하나를-가리키는-이름표다",
        "label": "브랜치는 커밋 하나를 가리키는 이름표다"
      },
      {
        "id": "log는-도달할-수-있는-커밋만-보여준다",
        "label": "log는 도달할 수 있는 커밋만 보여준다"
      },
      {
        "id": "브랜치를-지워도-커밋은-남는다",
        "label": "브랜치를 지워도 커밋은 남는다"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "git-undo": [
      {
        "id": "restore-파일-단위로-되돌린다",
        "label": "restore — 파일 단위로 되돌린다"
      },
      {
        "id": "reset-이름표를-옮긴다",
        "label": "reset — 이름표를 옮긴다"
      },
      {
        "id": "revert-취소하는-커밋을-새로-만든다",
        "label": "revert — 취소하는 커밋을 새로 만든다"
      },
      {
        "id": "reflog-내-컴퓨터의-이동-기록",
        "label": "reflog — 내 컴퓨터의 이동 기록"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "git-remote": [
      {
        "id": "원격-추적-브랜치는-마지막으로-본-원격의-기록이다",
        "label": "원격 추적 브랜치는 마지막으로 본 원격의 기록이다"
      },
      {
        "id": "fetch는-받아-오기만-pull은-합치기까지",
        "label": "fetch는 받아 오기만, pull은 합치기까지"
      },
      {
        "id": "push는-이름표를-기준으로-도달-가능한-커밋을-보낸다",
        "label": "push는 이름표를 기준으로 도달 가능한 커밋을 보낸다"
      },
      {
        "id": "지우는-일도-따로따로다",
        "label": "지우는 일도 따로따로다"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "git-merge": [
      {
        "id": "fast-forward-이름표만-앞으로",
        "label": "fast-forward — 이름표만 앞으로"
      },
      {
        "id": "병합-커밋-두-갈래를-잇는-새-커밋",
        "label": "병합 커밋 — 두 갈래를 잇는 새 커밋"
      },
      {
        "id": "충돌이-나는-조건",
        "label": "충돌이 나는 조건"
      },
      {
        "id": "rebase-내-커밋을-상대-끝으로-옮겨-다시-쌓기",
        "label": "rebase — 내 커밋을 상대 끝으로 옮겨 다시 쌓기"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "git-github": [
      {
        "id": "base와-compare",
        "label": "base와 compare"
      },
      {
        "id": "병합-방식-셋",
        "label": "병합 방식 셋"
      },
      {
        "id": "위에-쌓는-pr",
        "label": "위에 쌓는 PR"
      },
      {
        "id": "병합-뒤-로컬에서-할-일",
        "label": "병합 뒤 로컬에서 할 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "git-practice": [
      {
        "id": "하던-작업을-잠시-치워-두기-stash",
        "label": "하던 작업을 잠시 치워 두기 — stash"
      },
      {
        "id": "커밋-하나만-가져오기-cherry-pick",
        "label": "커밋 하나만 가져오기 — cherry-pick"
      },
      {
        "id": "엉뚱한-브랜치에-커밋했을-때",
        "label": "엉뚱한 브랜치에 커밋했을 때"
      },
      {
        "id": "이미-push한-커밋을-되돌려야-할-때",
        "label": "이미 push한 커밋을 되돌려야 할 때"
      },
      {
        "id": "무언가-사라진-것-같을-때",
        "label": "무언가 사라진 것 같을 때"
      }
    ],
    "i18n": [
      {
        "id": "i18n이라는-낱말",
        "label": "i18n이라는 낱말"
      },
      {
        "id": "i18n과-l10n은-하는-사람이-다르다",
        "label": "i18n과 l10n은 하는 사람이 다르다"
      },
      {
        "id": "단계로-읽는-법",
        "label": "단계로 읽는 법"
      },
      {
        "id": "지금-쓰는-것은-한-단계가-아니라-묶음이다",
        "label": "지금 쓰는 것은 한 단계가 아니라 묶음이다"
      },
      {
        "id": "열네-단계-한눈에",
        "label": "열네 단계 한눈에"
      },
      {
        "id": "열네-단계-밖에-있는-것들",
        "label": "열네 단계 밖에 있는 것들"
      }
    ],
    "i18n-s1": [
      {
        "id": "방법-문장을-코드에-박고-언어마다-코드를-복사한다",
        "label": "방법: 문장을 코드에 박고, 언어마다 코드를 복사한다"
      },
      {
        "id": "파일-구조-언어-폴더마다-같은-파일이-있다",
        "label": "파일 구조: 언어 폴더마다 같은 파일이 있다"
      },
      {
        "id": "빌드가-언어를-고른다",
        "label": "빌드가 언어를 고른다"
      },
      {
        "id": "설정-파일이-입력-폴더와-출력-폴더를-정한다",
        "label": "설정 파일이 입력 폴더와 출력 폴더를 정한다"
      },
      {
        "id": "결과물은-사이트-세-개-주소가-곧-언어다",
        "label": "결과물은 사이트 세 개, 주소가 곧 언어다"
      },
      {
        "id": "문제-버그-하나를-언어-수만큼-고친다",
        "label": "문제: 버그 하나를 언어 수만큼 고친다"
      },
      {
        "id": "문제가-나는-경우-복사본이-갈라지는-네-가지-길",
        "label": "문제가 나는 경우: 복사본이 갈라지는 네 가지 길"
      },
      {
        "id": "문제의-구조-같아야-하는-것과-달라야-하는-것이-한-파일에-있다",
        "label": "문제의 구조: 같아야 하는 것과 달라야 하는 것이 한 파일에 있다"
      },
      {
        "id": "로직과-문장이-한-몸이라서-생긴-일",
        "label": "로직과 문장이 한 몸이라서 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s2": [
      {
        "id": "방법-문장을-번호표로-빼고-코드는-번호를-부른다",
        "label": "방법: 문장을 번호표로 빼고, 코드는 번호를 부른다"
      },
      {
        "id": "파일-구조-코드는-한-벌-언어별로-갈라지는-건-표만",
        "label": "파일 구조: 코드는 한 벌, 언어별로 갈라지는 건 표만"
      },
      {
        "id": "빌드는-아직-언어마다-돈다",
        "label": "빌드는 아직 언어마다 돈다"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-번호를-읽을-수-없다",
        "label": "문제: 번호를 읽을 수 없다"
      },
      {
        "id": "문제-번호-관리와-빈약한-자리표시자",
        "label": "문제: 번호 관리와 빈약한 자리표시자"
      },
      {
        "id": "문제가-나는-경우-번호가-가리키는-것을-아무도-모를-때",
        "label": "문제가 나는 경우: 번호가 가리키는 것을 아무도 모를 때"
      },
      {
        "id": "문제의-구조-열쇠에-뜻이-없어서-사람도-기계도-맞춰-볼-수-없다",
        "label": "문제의 구조: 열쇠에 뜻이 없어서 사람도 기계도 맞춰 볼 수 없다"
      },
      {
        "id": "번호가-사람에게-아무-뜻도-없어서-생긴-일",
        "label": "번호가 사람에게 아무 뜻도 없어서 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s3": [
      {
        "id": "방법-영어-문장-자체를-열쇠로-쓴다",
        "label": "방법: 영어 문장 자체를 열쇠로 쓴다"
      },
      {
        "id": "msgid와-msgstr",
        "label": "msgid와 msgstr"
      },
      {
        "id": "파일-구조-언어마다-사전-하나-폴더-이름은-posix-로케일",
        "label": "파일 구조: 언어마다 사전 하나, 폴더 이름은 POSIX 로케일"
      },
      {
        "id": "세-단계로-돈다-추출-번역-실행",
        "label": "세 단계로 돈다: 추출 → 번역 → 실행"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-영어를-고치면-번역이-끊어진다",
        "label": "문제: 영어를 고치면 번역이 끊어진다"
      },
      {
        "id": "문제-같은-영어-다른-뜻",
        "label": "문제: 같은 영어, 다른 뜻"
      },
      {
        "id": "문제가-나는-경우-열쇠인-영어가-흔들릴-때",
        "label": "문제가 나는 경우: 열쇠인 영어가 흔들릴 때"
      },
      {
        "id": "문제의-구조-자리의-이름과-자리의-내용이-한-글자열이다",
        "label": "문제의 구조: 자리의 이름과 자리의 내용이 한 글자열이다"
      },
      {
        "id": "열쇠가-내용과-한-몸이라서-생긴-일",
        "label": "열쇠가 내용과 한 몸이라서 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s4": [
      {
        "id": "방법-문장에서-떼어-낸-이름표를-열쇠로-쓴다",
        "label": "방법: 문장에서 떼어 낸 이름표를 열쇠로 쓴다"
      },
      {
        "id": "계층-이름표를-폴더처럼-묶는다",
        "label": "계층: 이름표를 폴더처럼 묶는다"
      },
      {
        "id": "파일-구조-언어마다-파일-하나-안은-같은-모양의-트리",
        "label": "파일 구조: 언어마다 파일 하나, 안은 같은 모양의 트리"
      },
      {
        "id": "빌드는-한-번-사전은-번들-안에",
        "label": "빌드는 한 번, 사전은 번들 안에"
      },
      {
        "id": "결과물은-사이트-하나-언어는-실행-중에-고른다",
        "label": "결과물은 사이트 하나, 언어는 실행 중에 고른다"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-빠진-열쇠가-그대로-찍힌다",
        "label": "문제: 빠진 열쇠가 그대로 찍힌다"
      },
      {
        "id": "문제-코드에서-문장이-사라지고-이름표가-썩는다",
        "label": "문제: 코드에서 문장이 사라지고, 이름표가 썩는다"
      },
      {
        "id": "문제가-나는-경우-코드의-열쇠와-사전의-열쇠가-어긋나는-여덟-경우",
        "label": "문제가 나는 경우: 코드의 열쇠와 사전의 열쇠가 어긋나는 여덟 경우"
      },
      {
        "id": "사고-기록-오타-하나가-사용자-화면까지-가는-여섯-지점",
        "label": "사고 기록: 오타 하나가 사용자 화면까지 가는 여섯 지점"
      },
      {
        "id": "문제의-구조-두-장부가-실행-중의-문자열-비교-하나로만-묶여-있다",
        "label": "문제의 구조: 두 장부가 실행 중의 문자열 비교 하나로만 묶여 있다"
      },
      {
        "id": "열쇠를-문장에서-떼어-낸-대가",
        "label": "열쇠를 문장에서 떼어 낸 대가"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s5": [
      {
        "id": "방법-문장-안에-빈칸을-두고-코드는-값만-넘긴다",
        "label": "방법: 문장 안에 빈칸을 두고, 코드는 값만 넘긴다"
      },
      {
        "id": "복수형-세로줄로-가르고-숫자가-고른다",
        "label": "복수형: 세로줄로 가르고, 숫자가 고른다"
      },
      {
        "id": "링크-다른-문장을-끌어와-잇는다",
        "label": "링크: 다른 문장을 끌어와 잇는다"
      },
      {
        "id": "문장-속의-컴포넌트-i18n-t",
        "label": "문장 속의 컴포넌트: i18n-t"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-문장-안에-작은-언어가-생겼다",
        "label": "문제: 문장 안에 작은 언어가 생겼다"
      },
      {
        "id": "문제가-나는-경우-번역가가-문법을-건드릴-때-문법이-언어를-모를-때",
        "label": "문제가 나는 경우: 번역가가 문법을 건드릴 때, 문법이 언어를 모를 때"
      },
      {
        "id": "문제의-구조-문장이-세-사람이-함께-지켜야-하는-문법이-되었다",
        "label": "문제의 구조: 문장이 세 사람이 함께 지켜야 하는 문법이 되었다"
      },
      {
        "id": "문장이-코드가-되자-생긴-일",
        "label": "문장이 코드가 되자 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s6": [
      {
        "id": "방법-형식에-이름을-붙이고-로케일은-intl이-푼다",
        "label": "방법: 형식에 이름을 붙이고, 로케일은 Intl이 푼다"
      },
      {
        "id": "같은-값-세-가지-모양",
        "label": "같은 값, 세 가지 모양"
      },
      {
        "id": "로케일-없는-tolocalestring-은-어디서-돌아가느냐에-따라-다르다",
        "label": "로케일 없는 toLocaleString()은 어디서 돌아가느냐에 따라 다르다"
      },
      {
        "id": "intl이-하는-다른-일-시간대-정렬-글자-세기-언어-이름",
        "label": "Intl이 하는 다른 일: 시간대, 정렬, 글자 세기, 언어 이름"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-서버와-브라우저의-intl이-다를-수-있다",
        "label": "문제: 서버와 브라우저의 Intl이 다를 수 있다"
      },
      {
        "id": "문제가-나는-경우-보이지-않는-입력이-둘-더-있다",
        "label": "문제가 나는 경우: 보이지 않는 입력이 둘 더 있다"
      },
      {
        "id": "문제의-구조-결과는-입력-셋의-함수인데-코드는-하나만-적는다",
        "label": "문제의 구조: 결과는 입력 셋의 함수인데 코드는 하나만 적는다"
      },
      {
        "id": "표준에-맡기자-생긴-일",
        "label": "표준에 맡기자 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s7": [
      {
        "id": "방법-신호에-우선순위를-매긴다",
        "label": "방법: 신호에 우선순위를 매긴다"
      },
      {
        "id": "주소에-언어를-넣을지-말지",
        "label": "주소에 언어를 넣을지 말지"
      },
      {
        "id": "폴백-없으면-어디로-내려가나",
        "label": "폴백: 없으면 어디로 내려가나"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-신호가-서로-싸운다",
        "label": "문제: 신호가 서로 싸운다"
      },
      {
        "id": "문제가-나는-경우-신호-다섯이-다른-답을-낼-때",
        "label": "문제가 나는 경우: 신호 다섯이 다른 답을 낼 때"
      },
      {
        "id": "문제의-구조-순서가-둘이고-신호마다-주인과-수명이-다르다",
        "label": "문제의 구조: 순서가 둘이고, 신호마다 주인과 수명이 다르다"
      },
      {
        "id": "선택이-실행-시점으로-넘어와서-생긴-일",
        "label": "선택이 실행 시점으로 넘어와서 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s8": [
      {
        "id": "방법-locale은-ref-t는-그것을-읽는-함수",
        "label": "방법: locale은 ref, t는 그것을 읽는 함수"
      },
      {
        "id": "전환할-때-따라와야-하는-것-html-lang과-dir",
        "label": "전환할 때 따라와야 하는 것: html lang과 dir"
      },
      {
        "id": "전역-스코프-모두가-하나의-사전을-본다",
        "label": "전역 스코프: 모두가 하나의 사전을 본다"
      },
      {
        "id": "로컬-스코프-이-컴포넌트만의-사전",
        "label": "로컬 스코프: 이 컴포넌트만의 사전"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-반응하지-않는-곳과-두-사전의-경계",
        "label": "문제: 반응하지 않는 곳과 두 사전의 경계"
      },
      {
        "id": "문제가-나는-경우-반응형이-덮지-못하는-네-겹",
        "label": "문제가 나는 경우: 반응형이 덮지 못하는 네 겹"
      },
      {
        "id": "문제의-구조-반응형은-t를-부른-자리까지만-미친다",
        "label": "문제의 구조: 반응형은 t를 부른 자리까지만 미친다"
      },
      {
        "id": "값이-반응형이-되자-생긴-일",
        "label": "값이 반응형이 되자 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s9": [
      {
        "id": "방법-처음엔-한-권만-바꿀-때-받아-온다",
        "label": "방법: 처음엔 한 권만, 바꿀 때 받아 온다"
      },
      {
        "id": "빌드-결과-사전이-언어별-청크로-갈라진다",
        "label": "빌드 결과: 사전이 언어별 청크로 갈라진다"
      },
      {
        "id": "사전-컴파일-문장-문법은-빌드-때-풀어-둔다",
        "label": "사전 컴파일: 문장 문법은 빌드 때 풀어 둔다"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-전환이-비동기가-되고-컴파일러가-없으면-못-하는-일이-생긴다",
        "label": "문제: 전환이 비동기가 되고, 컴파일러가 없으면 못 하는 일이 생긴다"
      },
      {
        "id": "문제가-나는-경우-사전이-나중에-오는-것-이-되자-생긴-시간-축",
        "label": "문제가 나는 경우: 사전이 '나중에 오는 것'이 되자 생긴 시간 축"
      },
      {
        "id": "문제의-구조-상수가-데이터가-되면-상태가-생긴다",
        "label": "문제의 구조: 상수가 데이터가 되면 상태가 생긴다"
      },
      {
        "id": "사전이-빌드를-거치자-생긴-일",
        "label": "사전이 빌드를 거치자 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s10": [
      {
        "id": "방법-1-타입-사전의-모양을-타입으로-삼는다",
        "label": "방법 1 · 타입: 사전의 모양을 타입으로 삼는다"
      },
      {
        "id": "방법-2-린트-코드가-부르는-열쇠와-적힌-글자를-본다",
        "label": "방법 2 · 린트: 코드가 부르는 열쇠와 적힌 글자를 본다"
      },
      {
        "id": "방법-3-ci-머지-전에-사전-다섯-권의-짝을-맞춘다",
        "label": "방법 3 · CI: 머지 전에 사전 다섯 권의 짝을 맞춘다"
      },
      {
        "id": "방법-4-실행-중의-그물-missing-핸들러와-가짜-로케일",
        "label": "방법 4 · 실행 중의 그물: missing 핸들러와 가짜 로케일"
      },
      {
        "id": "파일-구조-검사-셋이-어디에-걸리나",
        "label": "파일 구조: 검사 셋이 어디에 걸리나"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-동적-열쇠는-어느-도구도-못-본다",
        "label": "문제: 동적 열쇠는 어느 도구도 못 본다"
      },
      {
        "id": "문제가-나는-경우-세-도구의-사각지대",
        "label": "문제가 나는 경우: 세 도구의 사각지대"
      },
      {
        "id": "문제의-구조-도구는-정적으로-보이는-모양만-보고-뜻은-못-본다",
        "label": "문제의 구조: 도구는 정적으로 보이는 모양만 보고, 뜻은 못 본다"
      },
      {
        "id": "보증이-도구로-돌아오자-생긴-일",
        "label": "보증이 도구로 돌아오자 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s11": [
      {
        "id": "방법-원본은-표-하나-json은-그-표에서-생성한다",
        "label": "방법: 원본은 표 하나, JSON은 그 표에서 생성한다"
      },
      {
        "id": "흐름-내보내고-채우고-받아-오고-생성한다",
        "label": "흐름: 내보내고, 채우고, 받아 오고, 생성한다"
      },
      {
        "id": "파일-구조-원본-스냅샷과-생성물을-나눈다",
        "label": "파일 구조: 원본 스냅샷과 생성물을 나눈다"
      },
      {
        "id": "생성할-때-검사한다",
        "label": "생성할 때 검사한다"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-원본이-둘이-되는-순간",
        "label": "문제: 원본이 둘이 되는 순간"
      },
      {
        "id": "문제가-나는-경우-표와-코드-사이에서-길을-잃는-문장",
        "label": "문제가 나는 경우: 표와 코드 사이에서 길을 잃는 문장"
      },
      {
        "id": "문제의-구조-한-방향이어야-하는-흐름에-편집-지점이-셋이다",
        "label": "문제의 구조: 한 방향이어야 하는 흐름에 편집 지점이 셋이다"
      },
      {
        "id": "사전이-생성물이-되자-생긴-일",
        "label": "사전이 생성물이 되자 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s12": [
      {
        "id": "문제가-먼저-공유-인스턴스는-요청을-섞는다",
        "label": "문제가 먼저: 공유 인스턴스는 요청을 섞는다"
      },
      {
        "id": "방법-요청마다-createi18n",
        "label": "방법: 요청마다 createI18n"
      },
      {
        "id": "서버가-로케일을-정하고-html-lang에-박는다",
        "label": "서버가 로케일을 정하고 html lang에 박는다"
      },
      {
        "id": "캐시가-언어를-섞지-않게-한다",
        "label": "캐시가 언어를 섞지 않게 한다"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-서버와-브라우저가-두-번-결정한다",
        "label": "문제: 서버와 브라우저가 두 번 결정한다"
      },
      {
        "id": "문제가-나는-경우-요청의-것이-프로세스에-남아-있을-때",
        "label": "문제가 나는 경우: 요청의 것이 프로세스에 남아 있을 때"
      },
      {
        "id": "문제의-구조-상태의-주인이-프로세스에서-요청으로-바뀐다",
        "label": "문제의 구조: 상태의 주인이 프로세스에서 요청으로 바뀐다"
      },
      {
        "id": "표준의-마지막-조각이-놓이고-생긴-일",
        "label": "표준의 마지막 조각이 놓이고 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s13": [
      {
        "id": "방법-기계가-먼저-채우고-fuzzy-표시를-붙인다",
        "label": "방법: 기계가 먼저 채우고 fuzzy 표시를 붙인다"
      },
      {
        "id": "llm이-전통-mt와-다른-자리-문맥을-함께-넘긴다",
        "label": "LLM이 전통 MT와 다른 자리: 문맥을 함께 넘긴다"
      },
      {
        "id": "검사가-더-중요해진다",
        "label": "검사가 더 중요해진다"
      },
      {
        "id": "좋아진-점",
        "label": "좋아진 점"
      },
      {
        "id": "문제-자신-있게-틀린다",
        "label": "문제: 자신 있게 틀린다"
      },
      {
        "id": "문제가-나는-경우-기계가-채운-칸이-사람이-채운-칸과-섞일-때",
        "label": "문제가 나는 경우: 기계가 채운 칸이 사람이 채운 칸과 섞일 때"
      },
      {
        "id": "문제의-구조-보증의-근거가-누가-했나-에서-무엇으로-검사했나-로-옮겨-간다",
        "label": "문제의 구조: 보증의 근거가 '누가 했나'에서 '무엇으로 검사했나'로 옮겨 간다"
      },
      {
        "id": "기계가-칸을-채우자-생긴-일",
        "label": "기계가 칸을 채우자 생긴 일"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-s14": [
      {
        "id": "방법-빈칸-복수형-형식을-한-문법으로",
        "label": "방법: 빈칸·복수형·형식을 한 문법으로"
      },
      {
        "id": "vue-i18n-문법과-나란히-놓으면",
        "label": "Vue I18n 문법과 나란히 놓으면"
      },
      {
        "id": "어디까지-왔나-2026년-11월-기준",
        "label": "어디까지 왔나 (2026년 11월 기준)"
      },
      {
        "id": "좋아진-점-약속된-것",
        "label": "좋아진 점 (약속된 것)"
      },
      {
        "id": "문제-아직-없고-옮기는-비용이-있고-더-길다",
        "label": "문제: 아직 없고, 옮기는 비용이 있고, 더 길다"
      },
      {
        "id": "문제가-나는-경우-표준이-있음-과-쓸-수-있음-사이에-있을-때",
        "label": "문제가 나는 경우: 표준이 '있음'과 '쓸 수 있음' 사이에 있을 때"
      },
      {
        "id": "문제의-구조-표준은-네-층으로-도착하고-지금은-두-층만-왔다",
        "label": "문제의 구조: 표준은 네 층으로 도착하고, 지금은 두 층만 왔다"
      },
      {
        "id": "열네-단계를-돌아보면",
        "label": "열네 단계를 돌아보면"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "i18n-commerce-web": [
      {
        "id": "1-무엇을-보았나",
        "label": "1. 무엇을 보았나",
        "children": [
          {
            "id": "1-무엇을-보았나--잣대와-방법",
            "label": "잣대와 방법"
          },
          {
            "id": "1-무엇을-보았나--단계별-비교표-지금-근거-고른-방식",
            "label": "단계별 비교표: 지금 · 근거 · 고른 방식"
          }
        ]
      },
      {
        "id": "2-지금-쓰는-방식",
        "label": "2. 지금 쓰는 방식",
        "children": [
          {
            "id": "2-지금-쓰는-방식--뼈대는-4단계-nuxt-모듈이-7-9-12를-설정으로-넣어-준다",
            "label": "뼈대는 4단계, Nuxt 모듈이 7·9·12를 설정으로 넣어 준다"
          },
          {
            "id": "2-지금-쓰는-방식--번역-흐름은-11단계-그대로",
            "label": "번역 흐름은 11단계 그대로"
          },
          {
            "id": "2-지금-쓰는-방식--서버-데이터의-번역은-다른-길로-간다",
            "label": "서버 데이터의 번역은 다른 길로 간다"
          }
        ]
      },
      {
        "id": "3-비어-있는-자리와-거기서-나는-버그",
        "label": "3. 비어 있는 자리와 거기서 나는 버그",
        "children": [
          {
            "id": "3-비어-있는-자리와-거기서-나는-버그--6단계-공백-날짜와-금액을-코드가-찍는다",
            "label": "6단계 공백: 날짜와 금액을 코드가 찍는다"
          },
          {
            "id": "3-비어-있는-자리와-거기서-나는-버그--10단계-공백-열쇠의-짝을-아무도-보지-않는다",
            "label": "10단계 공백: 열쇠의 짝을 아무도 보지 않는다"
          },
          {
            "id": "3-비어-있는-자리와-거기서-나는-버그--5단계-절반-보간은-쓰고-복수형과-링크는-안-쓴다",
            "label": "5단계 절반: 보간은 쓰고 복수형과 링크는 안 쓴다"
          },
          {
            "id": "3-비어-있는-자리와-거기서-나는-버그--9단계-기본값-컴파일러가-번들에-남아-있다",
            "label": "9단계 기본값: 컴파일러가 번들에 남아 있다"
          },
          {
            "id": "3-비어-있는-자리와-거기서-나는-버그--잔재-사전-밖의-사전",
            "label": "잔재: 사전 밖의 사전"
          }
        ]
      },
      {
        "id": "4-선택지-공백을-메우는-길은-하나가-아니다",
        "label": "4. 선택지: 공백을 메우는 길은 하나가 아니다",
        "children": [
          {
            "id": "4-선택지-공백을-메우는-길은-하나가-아니다--6단계-날짜와-숫자를-누가-찍나",
            "label": "6단계: 날짜와 숫자를 누가 찍나"
          },
          {
            "id": "4-선택지-공백을-메우는-길은-하나가-아니다--10단계-열쇠의-짝을-누가-보나",
            "label": "10단계: 열쇠의 짝을 누가 보나"
          },
          {
            "id": "4-선택지-공백을-메우는-길은-하나가-아니다--5단계-복수형-지금-할-일인가",
            "label": "5단계 복수형: 지금 할 일인가"
          },
          {
            "id": "4-선택지-공백을-메우는-길은-하나가-아니다--9단계-컴파일-켤-조건",
            "label": "9단계 컴파일: 켤 조건"
          },
          {
            "id": "4-선택지-공백을-메우는-길은-하나가-아니다--잔재-옮기나-잇나",
            "label": "잔재: 옮기나, 잇나"
          },
          {
            "id": "4-선택지-공백을-메우는-길은-하나가-아니다--주소-전략-바꾸지-않는-이유와-바꿀-조건",
            "label": "주소 전략: 바꾸지 않는 이유와 바꿀 조건"
          }
        ]
      },
      {
        "id": "5-더-나은-길은-없나-선택지-밖을-본다",
        "label": "5. 더 나은 길은 없나: 선택지 밖을 본다",
        "children": [
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--4절의-길은-전부-지금-틀-안에-있다",
            "label": "4절의 길은 전부 지금 틀 안에 있다"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㄱ-열쇠를-타입으로-뽑아-변수-열쇠까지-잡는다",
            "label": "ㄱ 열쇠를 타입으로 뽑아 변수 열쇠까지 잡는다"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㄴ-빠진-열쇠를-실행-중에-에러-추적으로-보낸다",
            "label": "ㄴ 빠진 열쇠를 실행 중에 에러 추적으로 보낸다"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㄷ-가짜-로케일로-날글자와-넘침을-화면에서-본다",
            "label": "ㄷ 가짜 로케일로 날글자와 넘침을 화면에서 본다"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㄹ-sheets를-tms로-바꾸는-길",
            "label": "ㄹ Sheets를 TMS로 바꾸는 길"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㅁ-문장을-함수로-컴파일하는-길-paraglide-js",
            "label": "ㅁ 문장을 함수로 컴파일하는 길 (Paraglide JS)"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㅂ-번역자용-문법-icu-fluent-을-지금-끼우는-길",
            "label": "ㅂ 번역자용 문법(ICU·Fluent)을 지금 끼우는 길"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㅅ-사전을-배포에서-떼어-내는-길-ota",
            "label": "ㅅ 사전을 배포에서 떼어 내는 길 (OTA)"
          },
          {
            "id": "5-더-나은-길은-없나-선택지-밖을-본다--ㅇ-서버-데이터의-번역을-서버에서-끝내는-길",
            "label": "ㅇ 서버 데이터의 번역을 서버에서 끝내는 길"
          }
        ]
      },
      {
        "id": "6-고른-것을-어떤-순서로",
        "label": "6. 고른 것을 어떤 순서로",
        "children": [
          {
            "id": "6-고른-것을-어떤-순서로--첫째-10단계부터",
            "label": "첫째, 10단계부터"
          },
          {
            "id": "6-고른-것을-어떤-순서로--둘째-6단계",
            "label": "둘째, 6단계"
          },
          {
            "id": "6-고른-것을-어떤-순서로--셋째-5단계-복수형과-9단계-설정",
            "label": "셋째, 5단계 복수형과 9단계 설정"
          },
          {
            "id": "6-고른-것을-어떤-순서로--넷째-잔재를-사전으로",
            "label": "넷째, 잔재를 사전으로"
          },
          {
            "id": "6-고른-것을-어떤-순서로--바꿀-문구-지금-코드-바꾼-코드",
            "label": "바꿀 문구: 지금 코드 → 바꾼 코드"
          }
        ]
      },
      {
        "id": "7-근거",
        "label": "7. 근거",
        "children": [
          {
            "id": "7-근거--왜-이-순서인가",
            "label": "왜 이 순서인가"
          },
          {
            "id": "7-근거--무엇을-하지-않을-것인가",
            "label": "무엇을 하지 않을 것인가"
          },
          {
            "id": "7-근거--다시-재는-법",
            "label": "다시 재는 법"
          }
        ]
      }
    ],
    "render": [
      {
        "id": "렌더링이라는-낱말",
        "label": "렌더링이라는 낱말"
      },
      {
        "id": "두-객체가-먼저-생긴다-window-그다음-document",
        "label": "두 객체가 먼저 생긴다: window, 그다음 document"
      },
      {
        "id": "한눈에-보는-파이프라인",
        "label": "한눈에 보는 파이프라인"
      },
      {
        "id": "단계로-읽는-법",
        "label": "단계로 읽는 법"
      },
      {
        "id": "열두-장-한눈에",
        "label": "열두 장 한눈에"
      },
      {
        "id": "실제로-돌린-페이지",
        "label": "실제로 돌린 페이지"
      },
      {
        "id": "열두-장-밖에-있는-것들",
        "label": "열두 장 밖에 있는 것들"
      }
    ],
    "render-s1": [
      {
        "id": "무슨-일이-일어나나-주소-네트워크-렌더러-커밋",
        "label": "무슨 일이 일어나나: 주소 → 네트워크 → 렌더러 → 커밋"
      },
      {
        "id": "메인-스레드-하나가-거의-전부를-한다",
        "label": "메인 스레드 하나가 거의 전부를 한다"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-긴-자바스크립트-하나가-탭-전체를-멈춘다",
        "label": "문제: 긴 자바스크립트 하나가 탭 전체를 멈춘다"
      },
      {
        "id": "문제가-나는-경우-한-줄에-선-것들과-경계를-넘는-것들",
        "label": "문제가 나는 경우: 한 줄에 선 것들과 경계를 넘는 것들"
      },
      {
        "id": "문제의-구조-상태가-한-스레드에-묶여-있고-경계는-메시지로만-넘는다",
        "label": "문제의 구조: 상태가 한 스레드에 묶여 있고, 경계는 메시지로만 넘는다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s2": [
      {
        "id": "무슨-일이-일어나나-브라우징-컨텍스트-realm-window-document",
        "label": "무슨 일이 일어나나: 브라우징 컨텍스트 → realm → Window → Document"
      },
      {
        "id": "window-안에는-무엇이-있나",
        "label": "window 안에는 무엇이 있나"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-iframe-참조에-붙여-둔-것이-사라진다",
        "label": "문제: iframe 참조에 붙여 둔 것이 사라진다"
      },
      {
        "id": "문제가-나는-경우-전역이-겹치는-자리",
        "label": "문제가 나는 경우: 전역이 겹치는 자리"
      },
      {
        "id": "문제의-구조-전역이라-부르는-것이-세-겹이다",
        "label": "문제의 구조: 전역이라 부르는 것이 세 겹이다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s3": [
      {
        "id": "무슨-일이-일어나나-document-가-받는-것들",
        "label": "무슨 일이 일어나나: Document 가 받는 것들"
      },
      {
        "id": "네-시점-loading-interactive-domcontentloaded-complete",
        "label": "네 시점: loading → interactive → DOMContentLoaded → complete"
      },
      {
        "id": "문제-head-스크립트에서-document-body-가-null-이다",
        "label": "문제: head 스크립트에서 document.body 가 null 이다"
      },
      {
        "id": "문제가-나는-경우-시점을-잘못-짚는-자리",
        "label": "문제가 나는 경우: 시점을 잘못 짚는 자리"
      },
      {
        "id": "문제의-구조-문서는-그릇이고-코드는-자기가-어느-시점에-도는지-모른다",
        "label": "문제의 구조: 문서는 그릇이고, 코드는 자기가 어느 시점에 도는지 모른다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s4": [
      {
        "id": "무슨-일이-일어나나-바이트-글자-토큰-노드",
        "label": "무슨 일이 일어나나: 바이트 → 글자 → 토큰 → 노드"
      },
      {
        "id": "파서가-고쳐-쓰는-규칙-셋",
        "label": "파서가 고쳐 쓰는 규칙 셋"
      },
      {
        "id": "프리로드-스캐너-파서가-멈춰도-다운로드는-간다",
        "label": "프리로드 스캐너: 파서가 멈춰도 다운로드는 간다"
      },
      {
        "id": "문제-p-안의-div-가-빈-p-둘로-갈라진다",
        "label": "문제: <p> 안의 <div> 가 빈 p 둘로 갈라진다"
      },
      {
        "id": "문제가-나는-경우-적은-것과-가진-것이-갈라지는-자리",
        "label": "문제가 나는 경우: 적은 것과 가진 것이 갈라지는 자리"
      },
      {
        "id": "문제의-구조-오류-복구가-표준이라-틀린-입력도-조용히-맞는-트리가-된다",
        "label": "문제의 구조: 오류 복구가 표준이라, 틀린 입력도 조용히 '맞는' 트리가 된다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s5": [
      {
        "id": "무슨-일이-일어나나-네-종류의-스크립트와-두-종류의-대기",
        "label": "무슨 일이 일어나나: 네 종류의 스크립트와 두 종류의 대기"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-css-가-늦으면-스크립트가-늦고-스크립트가-늦으면-화면이-늦다",
        "label": "문제: CSS 가 늦으면 스크립트가 늦고, 스크립트가 늦으면 화면이 늦다"
      },
      {
        "id": "문제가-나는-경우-시점을-잘못-고른-자리",
        "label": "문제가 나는 경우: 시점을 잘못 고른 자리"
      },
      {
        "id": "문제의-구조-스크립트가-일관된-상태를-봐야-해서-그-보장이-곧-멈춤이다",
        "label": "문제의 구조: 스크립트가 일관된 상태를 봐야 해서, 그 보장이 곧 멈춤이다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s6": [
      {
        "id": "무슨-일이-일어나나-css-글자-cssom-요소마다-계산된-스타일",
        "label": "무슨 일이 일어나나: CSS 글자 → CSSOM → 요소마다 계산된 스타일"
      },
      {
        "id": "css는-파서를-막지-않지만-그리기를-막는다",
        "label": "CSS는 파서를 막지 않지만 그리기를 막는다"
      },
      {
        "id": "문제-특이도-싸움-끝에-important-가-쌓인다",
        "label": "문제: 특이도 싸움 끝에 !important 가 쌓인다"
      },
      {
        "id": "문제가-나는-경우-캐스케이드와-시점이-꼬이는-자리",
        "label": "문제가 나는 경우: 캐스케이드와 시점이 꼬이는 자리"
      },
      {
        "id": "문제의-구조-계산된-스타일은-dom-과-cssom-의-곱이다",
        "label": "문제의 구조: 계산된 스타일은 DOM 과 CSSOM 의 곱이다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s7": [
      {
        "id": "무슨-일이-일어나나-레이아웃-트리-상자마다-x-y-폭-높이",
        "label": "무슨 일이 일어나나: 레이아웃 트리 → 상자마다 (x, y, 폭, 높이)"
      },
      {
        "id": "강제-동기-레이아웃-쓰고-읽으면-그-자리에서-계산한다",
        "label": "강제 동기 레이아웃: 쓰고 읽으면 그 자리에서 계산한다"
      },
      {
        "id": "문제-이미지가-오면-아래-글자가-밀려-내려간다",
        "label": "문제: 이미지가 오면 아래 글자가 밀려 내려간다"
      },
      {
        "id": "문제가-나는-경우-의존이-꼬이는-자리",
        "label": "문제가 나는 경우: 의존이 꼬이는 자리"
      },
      {
        "id": "문제의-구조-레이아웃은-의존-그래프를-푸는-일이다",
        "label": "문제의 구조: 레이아웃은 의존 그래프를 푸는 일이다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s8": [
      {
        "id": "무슨-일이-일어나나-코드-포인트-런-폰트-글리프-줄-픽셀",
        "label": "무슨 일이 일어나나: 코드 포인트 → 런 → 폰트 → 글리프 → 줄 → 픽셀"
      },
      {
        "id": "폰트가-폭을-정한다-실제로-돌려-보면",
        "label": "폰트가 폭을 정한다 — 실제로 돌려 보면"
      },
      {
        "id": "줄바꿈-한국어는-어디서든-끊을-수-있다",
        "label": "줄바꿈: 한국어는 어디서든 끊을 수 있다"
      },
      {
        "id": "웹폰트-도착하기-전의-세-시기",
        "label": "웹폰트: 도착하기 전의 세 시기"
      },
      {
        "id": "문제-keep-all-을-켰더니-상자를-넘친다",
        "label": "문제: keep-all 을 켰더니 상자를 넘친다"
      },
      {
        "id": "문제가-나는-경우-글자의-폭이-환경에서-오기-때문에",
        "label": "문제가 나는 경우: 글자의 폭이 환경에서 오기 때문에"
      },
      {
        "id": "문제의-구조-글자의-폭은-문자열의-속성이-아니라-환경의-함수다",
        "label": "문제의 구조: 글자의 폭은 문자열의 속성이 아니라 환경의 함수다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s9": [
      {
        "id": "무슨-일이-일어나나-페인트-레코드-레이어-타일-래스터-합성-gpu",
        "label": "무슨 일이 일어나나: 페인트 레코드 → 레이어 → 타일 → 래스터 → 합성 → GPU"
      },
      {
        "id": "비용의-사다리-어느-속성이-어디까지-되돌리나",
        "label": "비용의 사다리: 어느 속성이 어디까지 되돌리나"
      },
      {
        "id": "입력도-컴포지터를-거친다",
        "label": "입력도 컴포지터를 거친다"
      },
      {
        "id": "문제-top-left-로-움직이는-애니메이션이-매-프레임-레이아웃을-돌린다",
        "label": "문제: top/left 로 움직이는 애니메이션이 매 프레임 레이아웃을 돌린다"
      },
      {
        "id": "문제가-나는-경우-메인-스레드로-돌아가야-하는-변화들",
        "label": "문제가 나는 경우: 메인 스레드로 돌아가야 하는 변화들"
      },
      {
        "id": "문제의-구조-메인-스레드의-산출물과-컴포지터의-반복이-갈라져-있다",
        "label": "문제의 구조: 메인 스레드의 산출물과 컴포지터의 반복이 갈라져 있다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s10": [
      {
        "id": "무슨-일이-일어나나-한-바퀴의-순서",
        "label": "무슨 일이 일어나나: 한 바퀴의 순서"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "vue-는-마이크로태스크-문으로-들어온다",
        "label": "Vue 는 마이크로태스크 문으로 들어온다"
      },
      {
        "id": "문제-상태를-바꾼-직후-dom-을-읽으니-옛-값이다",
        "label": "문제: 상태를 바꾼 직후 DOM 을 읽으니 옛 값이다"
      },
      {
        "id": "문제가-나는-경우-예산을-넘기거나-순서를-착각하는-자리",
        "label": "문제가 나는 경우: 예산을 넘기거나 순서를 착각하는 자리"
      },
      {
        "id": "문제의-구조-한-프레임은-공유-예산이고-마이크로태스크는-틈을-없애는-대신-그리기를-미룬다",
        "label": "문제의 구조: 한 프레임은 공유 예산이고, 마이크로태스크는 틈을 없애는 대신 그리기를 미룬다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s11": [
      {
        "id": "무슨-일이-일어나나-프레임마다-2-9장이-한-번-더",
        "label": "무슨 일이 일어나나: 프레임마다 2~9장이 한 번 더"
      },
      {
        "id": "출처가-다르면-열세-개만-남는다",
        "label": "출처가 다르면 열세 개만 남는다"
      },
      {
        "id": "문제-결제-프레임의-높이를-읽으려다-securityerror",
        "label": "문제: 결제 프레임의 높이를 읽으려다 SecurityError"
      },
      {
        "id": "문제가-나는-경우-세-경계가-겹치는-자리",
        "label": "문제가 나는 경우: 세 경계가 겹치는 자리"
      },
      {
        "id": "문제의-구조-프레임-경계는-세-선의-겹침이다",
        "label": "문제의 구조: 프레임 경계는 세 선의 겹침이다"
      },
      {
        "id": "다음-장의-입구",
        "label": "다음 장의 입구"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "render-s12": [
      {
        "id": "무슨-일이-일어나나-마운트-갱신-ssr-이면-하이드레이션",
        "label": "무슨 일이 일어나나: 마운트 → 갱신 → (SSR 이면) 하이드레이션"
      },
      {
        "id": "실제로-돌려-보면",
        "label": "실제로 돌려 보면"
      },
      {
        "id": "문제-서버와-브라우저가-다른-글자를-만든다",
        "label": "문제: 서버와 브라우저가 다른 글자를 만든다"
      },
      {
        "id": "문제가-나는-경우-세-트리와-두-시점이-어긋나는-자리",
        "label": "문제가 나는 경우: 세 트리와 두 시점이 어긋나는 자리"
      },
      {
        "id": "문제의-구조-두-트리의-동기화가-좁은-문-둘로만-파이프라인과-만난다",
        "label": "문제의 구조: 두 트리의 동기화가 좁은 문 둘로만 파이프라인과 만난다"
      },
      {
        "id": "열두-장을-돌아보면",
        "label": "열두 장을 돌아보면"
      },
      {
        "id": "확인-질문",
        "label": "확인 질문"
      }
    ],
    "t-isolated": [
      {
        "id": "증상-동작은-하는데-상태가-어긋난다",
        "label": "증상 — 동작은 하는데 상태가 어긋난다"
      },
      {
        "id": "원인-isolated-world-dom은-공유-js-힙은-분리",
        "label": "원인 — Isolated World: DOM은 공유, JS 힙은 분리"
      },
      {
        "id": "해결-권한-없는-코드만-main-world로-내려보낸다",
        "label": "해결 — 권한 없는 코드만 MAIN World로 내려보낸다"
      },
      {
        "id": "읽기와-쓰기의-비대칭-경계를-넘어야만-하는-것만-넘긴다",
        "label": "읽기와 쓰기의 비대칭 — 경계를 넘어야만 하는 것만 넘긴다"
      },
      {
        "id": "결과와-한계",
        "label": "결과와 한계"
      }
    ],
    "t-focus": [
      {
        "id": "증상-유튜브는-새어-나가고-넷플릭스는-끊긴다",
        "label": "증상 — 유튜브는 새어 나가고, 넷플릭스는 끊긴다"
      },
      {
        "id": "원인-1-이벤트는-우리-입력창에서-끝나지-않는다",
        "label": "원인 1 — 이벤트는 우리 입력창에서 끝나지 않는다"
      },
      {
        "id": "원인-2-idle-user-커서를-가져가는-건-클래스-하나였다",
        "label": "원인 2 — idle-user: 커서를 가져가는 건 클래스 하나였다"
      },
      {
        "id": "해결-1-main-world를-감시자로-쓴다",
        "label": "해결 1 — MAIN World를 감시자로 쓴다"
      },
      {
        "id": "해결-2-뺏기면-돌려놓는다",
        "label": "해결 2 — 뺏기면 돌려놓는다"
      },
      {
        "id": "유튜브-쪽-통과가-기본이다",
        "label": "유튜브 쪽 — 통과가 기본이다"
      },
      {
        "id": "결과와-남은-것",
        "label": "결과와 남은 것"
      }
    ],
    "t-sync": [
      {
        "id": "증상-맞출수록-끊긴다",
        "label": "증상 — 맞출수록 끊긴다"
      },
      {
        "id": "해결-1초-불감대-아무것도-하지-않는-것이-설계다",
        "label": "해결 — 1초 불감대: 아무것도 하지 않는 것이 설계다"
      },
      {
        "id": "하트비트-이벤트만으로는-원리적으로-못-잡는-것",
        "label": "하트비트 — 이벤트만으로는 원리적으로 못 잡는 것"
      },
      {
        "id": "왜-websocket인가-결정한-건-영상이-아니라-채팅",
        "label": "왜 WebSocket인가 — 결정한 건 영상이 아니라 채팅"
      },
      {
        "id": "정직한-결과",
        "label": "정직한 결과"
      }
    ],
    "t-schema": [
      {
        "id": "증상-로컬에서는-절대-재현되지-않는-크래시",
        "label": "증상 — 로컬에서는 절대 재현되지 않는 크래시"
      },
      {
        "id": "원인-타입은-컴파일-후에-사라진다",
        "label": "원인 — 타입은 컴파일 후에 사라진다"
      },
      {
        "id": "해결-경계에서-1회-검증",
        "label": "해결 — 경계에서 1회 검증"
      },
      {
        "id": "남는-문제-스키마는-결국-프론트가-손으로-쓴다",
        "label": "남는 문제 — 스키마는 결국 프론트가 손으로 쓴다"
      }
    ],
    "t-tagged": [
      {
        "id": "증상-누락은-컴파일이-통과된다",
        "label": "증상 — 누락은 컴파일이 통과된다"
      },
      {
        "id": "해결-에러-4종-규격화-effect-ts",
        "label": "해결 — 에러 4종 규격화 + Effect-TS"
      },
      {
        "id": "대안-인정-class로도-분류는-된다",
        "label": "대안 인정 — class로도 분류는 된다"
      },
      {
        "id": "결과-에러-종류마다-다른-화면",
        "label": "결과 — 에러 종류마다 다른 화면"
      }
    ],
    "t-canvas": [
      {
        "id": "증상-자동-클릭-스크립트에-그대로-뚫린다",
        "label": "증상 — 자동 클릭 스크립트에 그대로 뚫린다"
      },
      {
        "id": "해결-190석을-canvas-하나로",
        "label": "해결 — 190석을 Canvas 하나로"
      },
      {
        "id": "까다로웠던-것-확대-상태의-좌표-보정",
        "label": "까다로웠던 것 — 확대 상태의 좌표 보정"
      },
      {
        "id": "적용-범위-기술-선호가-아니라-요구사항으로-합의",
        "label": "적용 범위 — 기술 선호가 아니라 요구사항으로 합의"
      },
      {
        "id": "결과와-한계",
        "label": "결과와 한계"
      },
      {
        "id": "지금-다시-본다면-매-프레임-다시-그릴-이유가-없었다",
        "label": "지금 다시 본다면 — 매 프레임 다시 그릴 이유가 없었다"
      }
    ],
    "t-webdriver": [
      {
        "id": "해결-오탐이-안-나는-신호만-클라이언트에서",
        "label": "해결 — 오탐이 안 나는 신호만 클라이언트에서"
      },
      {
        "id": "렌더-이전에-배치한-이유",
        "label": "렌더 이전에 배치한 이유"
      },
      {
        "id": "계층-방어-위로-갈수록-값싸고-아래로-갈수록-정밀하게",
        "label": "계층 방어 — 위로 갈수록 값싸고 아래로 갈수록 정밀하게"
      },
      {
        "id": "정직한-한계-이건-차단이-아니라-필터다",
        "label": "정직한 한계 — 이건 차단이 아니라 필터다"
      }
    ],
    "t-buffer": [
      {
        "id": "증상-mousemove-한-번마다-리렌더",
        "label": "증상 — mousemove 한 번마다 리렌더"
      },
      {
        "id": "해결-react가-모르는-곳에-상태를-둔다",
        "label": "해결 — React가 모르는 곳에 상태를 둔다"
      },
      {
        "id": "왜-그냥-useref-가-아닌가-캡슐화",
        "label": "왜 그냥 useRef([])가 아닌가 — 캡슐화"
      },
      {
        "id": "타이머-없는-스로틀-좌표와-시각의-짝을-지킨다",
        "label": "타이머 없는 스로틀 — 좌표와 시각의 짝을 지킨다"
      },
      {
        "id": "관측이-대상을-흔드는-문제-dom을-저장소로",
        "label": "관측이 대상을 흔드는 문제 — DOM을 저장소로"
      },
      {
        "id": "전송-시점-블로킹을-없앤-게-아니라-옮겼다",
        "label": "전송 시점 — 블로킹을 없앤 게 아니라 옮겼다"
      }
    ]
  },
  "ports": {
    "me": {
      "left": [],
      "right": [
        {
          "id": "withy",
          "role": "프로젝트",
          "name": "WITHY",
          "kind": "project"
        },
        {
          "id": "petfolio",
          "role": "프로젝트",
          "name": "Petfolio",
          "kind": "project"
        },
        {
          "id": "tickle",
          "role": "프로젝트",
          "name": "Tickle",
          "kind": "project"
        },
        {
          "id": "react",
          "role": "이론",
          "name": "React",
          "kind": "theory"
        },
        {
          "id": "js",
          "role": "이론",
          "name": "JavaScript",
          "kind": "theory"
        },
        {
          "id": "ts",
          "role": "이론",
          "name": "TypeScript",
          "kind": "theory"
        },
        {
          "id": "vue",
          "role": "이론",
          "name": "Vue",
          "kind": "theory"
        },
        {
          "id": "git",
          "role": "이론",
          "name": "Git",
          "kind": "theory"
        },
        {
          "id": "i18n",
          "role": "이론",
          "name": "i18n",
          "kind": "theory"
        },
        {
          "id": "render",
          "role": "이론",
          "name": "브라우저 렌더링",
          "kind": "theory"
        },
        {
          "id": "fe-craft",
          "role": "생각",
          "name": "코드 작성법",
          "kind": "idea"
        },
        {
          "id": "fe-philosophy",
          "role": "생각",
          "name": "철학",
          "kind": "idea"
        },
        {
          "id": "algo",
          "role": "생각",
          "name": "알고리즘",
          "kind": "idea"
        },
        {
          "id": "til",
          "role": "생각",
          "name": "TIL",
          "kind": "idea"
        },
        {
          "id": "dict",
          "role": "생각",
          "name": "사전",
          "kind": "idea"
        }
      ]
    },
    "withy": {
      "left": [
        {
          "id": "me",
          "role": "만든 사람",
          "name": "민엽",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "t-isolated",
          "role": "트러블슈팅",
          "name": "video.currentTime은 됐는데, 넷플릭스는 그 사실을 몰랐다",
          "kind": "trouble"
        },
        {
          "id": "t-focus",
          "role": "트러블슈팅",
          "name": "넷플릭스가 유휴 상태가 되면 채팅 커서가 사라졌다",
          "kind": "trouble"
        },
        {
          "id": "t-sync",
          "role": "트러블슈팅",
          "name": "완벽히 맞추려던 동기화가 오히려 영상을 끊고 있었다",
          "kind": "trouble"
        }
      ]
    },
    "petfolio": {
      "left": [
        {
          "id": "me",
          "role": "만든 사람",
          "name": "민엽",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "t-schema",
          "role": "트러블슈팅",
          "name": "백엔드 스키마가 바뀌면 전원이 같은 흰 화면을 봤다",
          "kind": "trouble"
        },
        {
          "id": "t-tagged",
          "role": "트러블슈팅",
          "name": "에러 타입이 unknown인 채로는, 놓친 분기가 크래시가 된다",
          "kind": "trouble"
        }
      ]
    },
    "tickle": {
      "left": [
        {
          "id": "me",
          "role": "만든 사람",
          "name": "민엽",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "t-canvas",
          "role": "트러블슈팅",
          "name": "DOM으로 그린 좌석은 셀렉터 한 줄에 뚫렸다",
          "kind": "trouble"
        },
        {
          "id": "t-webdriver",
          "role": "트러블슈팅",
          "name": "봇 방어가 서버 AI 한 곳뿐이라는 게 문제였다",
          "kind": "trouble"
        },
        {
          "id": "t-buffer",
          "role": "트러블슈팅",
          "name": "행동 데이터를 수집하자 좌석 화면이 버벅였다",
          "kind": "trouble"
        }
      ]
    },
    "dict": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        },
        {
          "id": "vg-start-intro",
          "role": "낱말이 나온 곳",
          "name": "소개",
          "kind": "theory"
        },
        {
          "id": "i18n",
          "role": "낱말이 나온 곳",
          "name": "i18n",
          "kind": "theory"
        },
        {
          "id": "render",
          "role": "낱말이 나온 곳",
          "name": "브라우저 렌더링",
          "kind": "theory"
        },
        {
          "id": "js",
          "role": "낱말이 나온 곳",
          "name": "JavaScript",
          "kind": "theory"
        },
        {
          "id": "react",
          "role": "낱말이 나온 곳",
          "name": "React",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "algo-bruteforce": {
      "left": [
        {
          "id": "algo",
          "role": "상위 개념",
          "name": "알고리즘",
          "kind": "idea"
        }
      ],
      "right": [
        {
          "id": "swea-5188",
          "role": "하위 개념",
          "name": "[SWEA] 5188. 최소합",
          "kind": "idea"
        }
      ]
    },
    "swea-5188": {
      "left": [
        {
          "id": "algo-bruteforce",
          "role": "상위 개념",
          "name": "완전탐색",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "til-2026-09-15": {
      "left": [
        {
          "id": "til",
          "role": "상위 개념",
          "name": "TIL",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "til-2026-09-02": {
      "left": [
        {
          "id": "til",
          "role": "상위 개념",
          "name": "TIL",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-url": {
      "left": [
        {
          "id": "craft-entry",
          "role": "상위 개념",
          "name": "진입 / 라우팅",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-request": {
      "left": [
        {
          "id": "craft-fetch",
          "role": "상위 개념",
          "name": "데이터 수급",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-4state": {
      "left": [
        {
          "id": "craft-fetch",
          "role": "상위 개념",
          "name": "데이터 수급",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-cache": {
      "left": [
        {
          "id": "craft-fetch",
          "role": "상위 개념",
          "name": "데이터 수급",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-colocation": {
      "left": [
        {
          "id": "craft-state",
          "role": "상위 개념",
          "name": "상태 관리",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-flow": {
      "left": [
        {
          "id": "craft-state",
          "role": "상위 개념",
          "name": "상태 관리",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-composition": {
      "left": [
        {
          "id": "craft-component",
          "role": "상위 개념",
          "name": "컴포넌트 설계",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-contract": {
      "left": [
        {
          "id": "craft-component",
          "role": "상위 개념",
          "name": "컴포넌트 설계",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-hooks": {
      "left": [
        {
          "id": "craft-component",
          "role": "상위 개념",
          "name": "컴포넌트 설계",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-strategy": {
      "left": [
        {
          "id": "craft-render",
          "role": "상위 개념",
          "name": "렌더링 / 실행",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-rerender": {
      "left": [
        {
          "id": "craft-render",
          "role": "상위 개념",
          "name": "렌더링 / 실행",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-timing": {
      "left": [
        {
          "id": "craft-render",
          "role": "상위 개념",
          "name": "렌더링 / 실행",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-concurrency": {
      "left": [
        {
          "id": "craft-robust",
          "role": "상위 개념",
          "name": "견고성",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-error": {
      "left": [
        {
          "id": "craft-robust",
          "role": "상위 개념",
          "name": "견고성",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-trust": {
      "left": [
        {
          "id": "craft-robust",
          "role": "상위 개념",
          "name": "견고성",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-perf": {
      "left": [
        {
          "id": "craft-quality",
          "role": "상위 개념",
          "name": "품질 / 사용자",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-a11y": {
      "left": [
        {
          "id": "craft-quality",
          "role": "상위 개념",
          "name": "품질 / 사용자",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "craft-observe": {
      "left": [
        {
          "id": "craft-quality",
          "role": "상위 개념",
          "name": "품질 / 사용자",
          "kind": "idea"
        }
      ],
      "right": []
    },
    "react": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        }
      ],
      "right": [
        {
          "id": "rl",
          "role": "하위 개념",
          "name": "Learn React",
          "kind": "theory"
        },
        {
          "id": "ra",
          "role": "하위 개념",
          "name": "API 참고서",
          "kind": "theory"
        },
        {
          "id": "dict",
          "role": "사전",
          "name": "사전",
          "kind": "idea"
        }
      ]
    },
    "rl": {
      "left": [
        {
          "id": "react",
          "role": "상위 개념",
          "name": "React",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "rl-start",
          "role": "하위 개념",
          "name": "시작하기",
          "kind": "theory"
        },
        {
          "id": "rl-learn",
          "role": "하위 개념",
          "name": "React 배우기",
          "kind": "theory"
        }
      ]
    },
    "rl-start": {
      "left": [
        {
          "id": "rl",
          "role": "상위 개념",
          "name": "Learn React",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "rl-start-quick",
          "role": "하위 개념",
          "name": "빠른 시작",
          "kind": "theory"
        },
        {
          "id": "rl-start-install",
          "role": "하위 개념",
          "name": "설치",
          "kind": "theory"
        },
        {
          "id": "rl-start-setup",
          "role": "하위 개념",
          "name": "설정",
          "kind": "theory"
        },
        {
          "id": "rl-start-compiler",
          "role": "하위 개념",
          "name": "React 컴파일러",
          "kind": "theory"
        }
      ]
    },
    "rl-start-quick": {
      "left": [
        {
          "id": "rl-start",
          "role": "상위 개념",
          "name": "시작하기",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "rl-start-install": {
      "left": [
        {
          "id": "rl-start",
          "role": "상위 개념",
          "name": "시작하기",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "rl-start-setup": {
      "left": [
        {
          "id": "rl-start",
          "role": "상위 개념",
          "name": "시작하기",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "rl-start-compiler": {
      "left": [
        {
          "id": "rl-start",
          "role": "상위 개념",
          "name": "시작하기",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "rl-learn": {
      "left": [
        {
          "id": "rl",
          "role": "상위 개념",
          "name": "Learn React",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "rl-ui",
          "role": "하위 개념",
          "name": "UI 표현하기",
          "kind": "theory"
        },
        {
          "id": "rl-interact",
          "role": "하위 개념",
          "name": "상호작용 더하기",
          "kind": "theory"
        },
        {
          "id": "rl-state",
          "role": "하위 개념",
          "name": "State 관리하기",
          "kind": "theory"
        },
        {
          "id": "rl-escape",
          "role": "하위 개념",
          "name": "탈출구",
          "kind": "theory"
        }
      ]
    },
    "rl-ui": {
      "left": [
        {
          "id": "rl-learn",
          "role": "상위 개념",
          "name": "React 배우기",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "rl-interact": {
      "left": [
        {
          "id": "rl-learn",
          "role": "상위 개념",
          "name": "React 배우기",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-buffer",
          "role": "트러블슈팅",
          "name": "비동기 이벤트 버퍼링",
          "kind": "trouble"
        }
      ]
    },
    "rl-state": {
      "left": [
        {
          "id": "rl-learn",
          "role": "상위 개념",
          "name": "React 배우기",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "rl-escape": {
      "left": [
        {
          "id": "rl-learn",
          "role": "상위 개념",
          "name": "React 배우기",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-sync",
          "role": "트러블슈팅",
          "name": "영상 동기화 불감대",
          "kind": "trouble"
        },
        {
          "id": "t-buffer",
          "role": "트러블슈팅",
          "name": "비동기 이벤트 버퍼링",
          "kind": "trouble"
        }
      ]
    },
    "ra": {
      "left": [
        {
          "id": "react",
          "role": "상위 개념",
          "name": "React",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-react",
          "role": "하위 개념",
          "name": "React",
          "kind": "theory"
        },
        {
          "id": "ra-dom",
          "role": "하위 개념",
          "name": "React DOM",
          "kind": "theory"
        },
        {
          "id": "ra-compiler",
          "role": "하위 개념",
          "name": "React 컴파일러 참고서",
          "kind": "theory"
        },
        {
          "id": "ra-devtools",
          "role": "하위 개념",
          "name": "React 개발자 도구",
          "kind": "theory"
        },
        {
          "id": "ra-eslint",
          "role": "하위 개념",
          "name": "ESLint 플러그인",
          "kind": "theory"
        },
        {
          "id": "ra-rules",
          "role": "하위 개념",
          "name": "React 규칙",
          "kind": "theory"
        },
        {
          "id": "ra-rsc",
          "role": "하위 개념",
          "name": "서버 컴포넌트",
          "kind": "theory"
        },
        {
          "id": "ra-legacy",
          "role": "하위 개념",
          "name": "레거시 API",
          "kind": "theory"
        }
      ]
    },
    "ra-react": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-react-hooks",
          "role": "하위 개념",
          "name": "내장 훅",
          "kind": "theory"
        },
        {
          "id": "ra-react-components",
          "role": "하위 개념",
          "name": "내장 컴포넌트",
          "kind": "theory"
        },
        {
          "id": "ra-react-apis",
          "role": "하위 개념",
          "name": "React API",
          "kind": "theory"
        }
      ]
    },
    "ra-react-hooks": {
      "left": [
        {
          "id": "ra-react",
          "role": "상위 개념",
          "name": "React",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-react-components": {
      "left": [
        {
          "id": "ra-react",
          "role": "상위 개념",
          "name": "React",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-react-apis": {
      "left": [
        {
          "id": "ra-react",
          "role": "상위 개념",
          "name": "React",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-dom": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-dom-hooks",
          "role": "하위 개념",
          "name": "DOM 훅",
          "kind": "theory"
        },
        {
          "id": "ra-dom-components",
          "role": "하위 개념",
          "name": "DOM 컴포넌트",
          "kind": "theory"
        },
        {
          "id": "ra-dom-apis",
          "role": "하위 개념",
          "name": "DOM API",
          "kind": "theory"
        },
        {
          "id": "ra-dom-client",
          "role": "하위 개념",
          "name": "클라이언트 API",
          "kind": "theory"
        },
        {
          "id": "ra-dom-server",
          "role": "하위 개념",
          "name": "서버 API",
          "kind": "theory"
        },
        {
          "id": "ra-dom-static",
          "role": "하위 개념",
          "name": "정적 API",
          "kind": "theory"
        }
      ]
    },
    "ra-dom-hooks": {
      "left": [
        {
          "id": "ra-dom",
          "role": "상위 개념",
          "name": "React DOM",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-dom-components": {
      "left": [
        {
          "id": "ra-dom",
          "role": "상위 개념",
          "name": "React DOM",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-dom-apis": {
      "left": [
        {
          "id": "ra-dom",
          "role": "상위 개념",
          "name": "React DOM",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-dom-client": {
      "left": [
        {
          "id": "ra-dom",
          "role": "상위 개념",
          "name": "React DOM",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-dom-server": {
      "left": [
        {
          "id": "ra-dom",
          "role": "상위 개념",
          "name": "React DOM",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-dom-static": {
      "left": [
        {
          "id": "ra-dom",
          "role": "상위 개념",
          "name": "React DOM",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-compiler": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-compiler-config",
          "role": "하위 개념",
          "name": "컴파일러 설정",
          "kind": "theory"
        },
        {
          "id": "ra-compiler-directives",
          "role": "하위 개념",
          "name": "컴파일러 지시어",
          "kind": "theory"
        }
      ]
    },
    "ra-compiler-config": {
      "left": [
        {
          "id": "ra-compiler",
          "role": "상위 개념",
          "name": "React 컴파일러 참고서",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-compiler-directives": {
      "left": [
        {
          "id": "ra-compiler",
          "role": "상위 개념",
          "name": "React 컴파일러 참고서",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-devtools": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-eslint": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-eslint-lints",
          "role": "하위 개념",
          "name": "린트 규칙",
          "kind": "theory"
        }
      ]
    },
    "ra-eslint-lints": {
      "left": [
        {
          "id": "ra-eslint",
          "role": "상위 개념",
          "name": "ESLint 플러그인",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-rules": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-rules-overview",
          "role": "하위 개념",
          "name": "규칙 개요",
          "kind": "theory"
        }
      ]
    },
    "ra-rules-overview": {
      "left": [
        {
          "id": "ra-rules",
          "role": "상위 개념",
          "name": "React 규칙",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-rsc": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-rsc-directives",
          "role": "하위 개념",
          "name": "서버 지시어",
          "kind": "theory"
        }
      ]
    },
    "ra-rsc-directives": {
      "left": [
        {
          "id": "ra-rsc",
          "role": "상위 개념",
          "name": "서버 컴포넌트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ra-legacy": {
      "left": [
        {
          "id": "ra",
          "role": "상위 개념",
          "name": "API 참고서",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ra-legacy-apis",
          "role": "하위 개념",
          "name": "레거시 React API",
          "kind": "theory"
        }
      ]
    },
    "ra-legacy-apis": {
      "left": [
        {
          "id": "ra-legacy",
          "role": "상위 개념",
          "name": "레거시 API",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        }
      ],
      "right": [
        {
          "id": "js-core",
          "role": "하위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        },
        {
          "id": "js-browser",
          "role": "하위 개념",
          "name": "브라우저: 문서·이벤트·인터페이스",
          "kind": "theory"
        },
        {
          "id": "js-extra",
          "role": "하위 개념",
          "name": "추가 주제",
          "kind": "theory"
        },
        {
          "id": "dict",
          "role": "사전",
          "name": "사전",
          "kind": "idea"
        }
      ]
    },
    "js-core": {
      "left": [
        {
          "id": "js",
          "role": "상위 개념",
          "name": "JavaScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "js-intro",
          "role": "하위 개념",
          "name": "소개",
          "kind": "theory"
        },
        {
          "id": "js-first-steps",
          "role": "하위 개념",
          "name": "자바스크립트 기본",
          "kind": "theory"
        },
        {
          "id": "js-quality",
          "role": "하위 개념",
          "name": "코드 품질",
          "kind": "theory"
        },
        {
          "id": "js-object-basics",
          "role": "하위 개념",
          "name": "객체: 기본",
          "kind": "theory"
        },
        {
          "id": "js-data-types",
          "role": "하위 개념",
          "name": "자료구조와 자료형",
          "kind": "theory"
        },
        {
          "id": "js-adv-functions",
          "role": "하위 개념",
          "name": "함수 심화학습",
          "kind": "theory"
        },
        {
          "id": "js-object-props",
          "role": "하위 개념",
          "name": "객체 프로퍼티 설정",
          "kind": "theory"
        },
        {
          "id": "js-prototypes",
          "role": "하위 개념",
          "name": "프로토타입과 상속",
          "kind": "theory"
        },
        {
          "id": "js-classes",
          "role": "하위 개념",
          "name": "클래스",
          "kind": "theory"
        },
        {
          "id": "js-error",
          "role": "하위 개념",
          "name": "에러 핸들링",
          "kind": "theory"
        },
        {
          "id": "js-async",
          "role": "하위 개념",
          "name": "프라미스와 async·await",
          "kind": "theory"
        },
        {
          "id": "js-generators",
          "role": "하위 개념",
          "name": "제너레이터와 비동기 이터레이션",
          "kind": "theory"
        },
        {
          "id": "js-modules",
          "role": "하위 개념",
          "name": "모듈",
          "kind": "theory"
        },
        {
          "id": "js-core-misc",
          "role": "하위 개념",
          "name": "코어 기타",
          "kind": "theory"
        }
      ]
    },
    "js-intro": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-first-steps": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-quality": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-object-basics": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-data-types": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-adv-functions": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-object-props": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-prototypes": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-classes": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-error": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-async": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-generators": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-modules": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-core-misc": {
      "left": [
        {
          "id": "js-core",
          "role": "상위 개념",
          "name": "코어 자바스크립트",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-browser": {
      "left": [
        {
          "id": "js",
          "role": "상위 개념",
          "name": "JavaScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "js-document",
          "role": "하위 개념",
          "name": "문서",
          "kind": "theory"
        },
        {
          "id": "js-events",
          "role": "하위 개념",
          "name": "이벤트 기초",
          "kind": "theory"
        },
        {
          "id": "js-ui-events",
          "role": "하위 개념",
          "name": "UI 이벤트",
          "kind": "theory"
        },
        {
          "id": "js-forms",
          "role": "하위 개념",
          "name": "폼과 폼 조작",
          "kind": "theory"
        },
        {
          "id": "js-loading",
          "role": "하위 개념",
          "name": "문서와 리소스 로딩",
          "kind": "theory"
        },
        {
          "id": "js-ui-misc",
          "role": "하위 개념",
          "name": "브라우저 기타",
          "kind": "theory"
        }
      ]
    },
    "js-document": {
      "left": [
        {
          "id": "js-browser",
          "role": "상위 개념",
          "name": "브라우저: 문서·이벤트·인터페이스",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-canvas",
          "role": "트러블슈팅",
          "name": "Canvas 좌석 렌더링",
          "kind": "trouble"
        },
        {
          "id": "t-webdriver",
          "role": "트러블슈팅",
          "name": "WebDriver 봇 필터링",
          "kind": "trouble"
        }
      ]
    },
    "js-events": {
      "left": [
        {
          "id": "js-browser",
          "role": "상위 개념",
          "name": "브라우저: 문서·이벤트·인터페이스",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-focus",
          "role": "트러블슈팅",
          "name": "채팅 입력 포커스 유실",
          "kind": "trouble"
        }
      ]
    },
    "js-ui-events": {
      "left": [
        {
          "id": "js-browser",
          "role": "상위 개념",
          "name": "브라우저: 문서·이벤트·인터페이스",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-focus",
          "role": "트러블슈팅",
          "name": "채팅 입력 포커스 유실",
          "kind": "trouble"
        }
      ]
    },
    "js-forms": {
      "left": [
        {
          "id": "js-browser",
          "role": "상위 개념",
          "name": "브라우저: 문서·이벤트·인터페이스",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-loading": {
      "left": [
        {
          "id": "js-browser",
          "role": "상위 개념",
          "name": "브라우저: 문서·이벤트·인터페이스",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-ui-misc": {
      "left": [
        {
          "id": "js-browser",
          "role": "상위 개념",
          "name": "브라우저: 문서·이벤트·인터페이스",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-buffer",
          "role": "트러블슈팅",
          "name": "비동기 이벤트 버퍼링",
          "kind": "trouble"
        }
      ]
    },
    "js-extra": {
      "left": [
        {
          "id": "js",
          "role": "상위 개념",
          "name": "JavaScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "js-frames",
          "role": "하위 개념",
          "name": "프레임과 윈도우",
          "kind": "theory"
        },
        {
          "id": "js-binary",
          "role": "하위 개념",
          "name": "이진 데이터와 파일",
          "kind": "theory"
        },
        {
          "id": "js-network",
          "role": "하위 개념",
          "name": "네트워크 요청",
          "kind": "theory"
        },
        {
          "id": "js-storage",
          "role": "하위 개념",
          "name": "브라우저에 데이터 저장하기",
          "kind": "theory"
        },
        {
          "id": "js-animation",
          "role": "하위 개념",
          "name": "애니메이션",
          "kind": "theory"
        },
        {
          "id": "js-webcomponents",
          "role": "하위 개념",
          "name": "웹 컴포넌트",
          "kind": "theory"
        },
        {
          "id": "js-regexp",
          "role": "하위 개념",
          "name": "정규 표현식",
          "kind": "theory"
        }
      ]
    },
    "js-frames": {
      "left": [
        {
          "id": "js-extra",
          "role": "상위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-isolated",
          "role": "트러블슈팅",
          "name": "넷플릭스 플레이어 제어",
          "kind": "trouble"
        }
      ]
    },
    "js-binary": {
      "left": [
        {
          "id": "js-extra",
          "role": "상위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-network": {
      "left": [
        {
          "id": "js-extra",
          "role": "상위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "t-sync",
          "role": "트러블슈팅",
          "name": "영상 동기화 불감대",
          "kind": "trouble"
        }
      ]
    },
    "js-storage": {
      "left": [
        {
          "id": "js-extra",
          "role": "상위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-animation": {
      "left": [
        {
          "id": "js-extra",
          "role": "상위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-webcomponents": {
      "left": [
        {
          "id": "js-extra",
          "role": "상위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "js-regexp": {
      "left": [
        {
          "id": "js-extra",
          "role": "상위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        }
      ],
      "right": [
        {
          "id": "ts-start",
          "role": "하위 개념",
          "name": "시작하기",
          "kind": "theory"
        },
        {
          "id": "ts-handbook",
          "role": "하위 개념",
          "name": "핸드북",
          "kind": "theory"
        },
        {
          "id": "ts-reference",
          "role": "하위 개념",
          "name": "참고서",
          "kind": "theory"
        },
        {
          "id": "ts-modules-ref",
          "role": "하위 개념",
          "name": "모듈 참고서",
          "kind": "theory"
        },
        {
          "id": "ts-tutorials",
          "role": "하위 개념",
          "name": "튜토리얼",
          "kind": "theory"
        },
        {
          "id": "ts-whatsnew",
          "role": "하위 개념",
          "name": "릴리스 노트",
          "kind": "theory"
        },
        {
          "id": "ts-declaration",
          "role": "하위 개념",
          "name": "선언 파일",
          "kind": "theory"
        },
        {
          "id": "ts-js",
          "role": "하위 개념",
          "name": "JavaScript 지원",
          "kind": "theory"
        },
        {
          "id": "ts-config",
          "role": "하위 개념",
          "name": "프로젝트 설정",
          "kind": "theory"
        }
      ]
    },
    "ts-start": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-start-new",
          "role": "하위 개념",
          "name": "처음 배우는 사람을 위한 TS",
          "kind": "theory"
        },
        {
          "id": "ts-start-js",
          "role": "하위 개념",
          "name": "JS 개발자를 위한 TS",
          "kind": "theory"
        },
        {
          "id": "ts-start-oop",
          "role": "하위 개념",
          "name": "Java·C# 개발자를 위한 TS",
          "kind": "theory"
        },
        {
          "id": "ts-start-fp",
          "role": "하위 개념",
          "name": "함수형 개발자를 위한 TS",
          "kind": "theory"
        },
        {
          "id": "ts-start-tooling",
          "role": "하위 개념",
          "name": "5분 만에 보는 TS 도구",
          "kind": "theory"
        }
      ]
    },
    "ts-handbook": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-hb-basics",
          "role": "하위 개념",
          "name": "기초",
          "kind": "theory"
        },
        {
          "id": "ts-hb-everyday",
          "role": "하위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        },
        {
          "id": "ts-hb-narrowing",
          "role": "하위 개념",
          "name": "좁히기",
          "kind": "theory"
        },
        {
          "id": "ts-hb-functions",
          "role": "하위 개념",
          "name": "함수 더 알아보기",
          "kind": "theory"
        },
        {
          "id": "ts-hb-objects",
          "role": "하위 개념",
          "name": "객체 타입",
          "kind": "theory"
        },
        {
          "id": "ts-hb-manipulation",
          "role": "하위 개념",
          "name": "타입 조작",
          "kind": "theory"
        },
        {
          "id": "ts-hb-classes",
          "role": "하위 개념",
          "name": "클래스",
          "kind": "theory"
        },
        {
          "id": "ts-hb-modules",
          "role": "하위 개념",
          "name": "모듈",
          "kind": "theory"
        }
      ]
    },
    "ts-hb-everyday": {
      "left": [
        {
          "id": "ts-handbook",
          "role": "상위 개념",
          "name": "핸드북",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-ev-primitives",
          "role": "하위 개념",
          "name": "원시 타입: string, number, boolean",
          "kind": "theory"
        },
        {
          "id": "ts-ev-arrays",
          "role": "하위 개념",
          "name": "배열",
          "kind": "theory"
        },
        {
          "id": "ts-ev-any",
          "role": "하위 개념",
          "name": "any",
          "kind": "theory"
        },
        {
          "id": "ts-ev-annotations",
          "role": "하위 개념",
          "name": "변수의 타입 어노테이션",
          "kind": "theory"
        },
        {
          "id": "ts-ev-functions",
          "role": "하위 개념",
          "name": "함수",
          "kind": "theory"
        },
        {
          "id": "ts-ev-objects",
          "role": "하위 개념",
          "name": "객체 타입",
          "kind": "theory"
        },
        {
          "id": "ts-ev-unions",
          "role": "하위 개념",
          "name": "유니온 타입",
          "kind": "theory"
        },
        {
          "id": "ts-ev-aliases",
          "role": "하위 개념",
          "name": "타입 별칭",
          "kind": "theory"
        },
        {
          "id": "ts-ev-interfaces",
          "role": "하위 개념",
          "name": "인터페이스",
          "kind": "theory"
        },
        {
          "id": "ts-ev-assertions",
          "role": "하위 개념",
          "name": "타입 단언",
          "kind": "theory"
        },
        {
          "id": "ts-ev-literals",
          "role": "하위 개념",
          "name": "리터럴 타입",
          "kind": "theory"
        },
        {
          "id": "ts-ev-null",
          "role": "하위 개념",
          "name": "null과 undefined",
          "kind": "theory"
        },
        {
          "id": "ts-ev-enums",
          "role": "하위 개념",
          "name": "열거형",
          "kind": "theory"
        },
        {
          "id": "ts-ev-rare",
          "role": "하위 개념",
          "name": "덜 쓰는 원시 타입",
          "kind": "theory"
        },
        {
          "id": "t-schema",
          "role": "트러블슈팅",
          "name": "런타임 스키마 검증",
          "kind": "trouble"
        }
      ]
    },
    "ts-ev-primitives": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-arrays": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-any": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-annotations": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-functions": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-objects": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-unions": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-aliases": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-interfaces": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-assertions": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-literals": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-null": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-enums": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-ev-rare": {
      "left": [
        {
          "id": "ts-hb-everyday",
          "role": "상위 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-reference": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-ref-utility",
          "role": "하위 개념",
          "name": "유틸리티 타입",
          "kind": "theory"
        },
        {
          "id": "ts-ref-cheat",
          "role": "하위 개념",
          "name": "치트 시트",
          "kind": "theory"
        },
        {
          "id": "ts-ref-decorators",
          "role": "하위 개념",
          "name": "데코레이터",
          "kind": "theory"
        },
        {
          "id": "ts-ref-merging",
          "role": "하위 개념",
          "name": "선언 병합",
          "kind": "theory"
        },
        {
          "id": "ts-ref-enums",
          "role": "하위 개념",
          "name": "이넘",
          "kind": "theory"
        },
        {
          "id": "ts-ref-iterators",
          "role": "하위 개념",
          "name": "이터레이터와 제너레이터",
          "kind": "theory"
        },
        {
          "id": "ts-ref-jsx",
          "role": "하위 개념",
          "name": "JSX",
          "kind": "theory"
        },
        {
          "id": "ts-ref-mixins",
          "role": "하위 개념",
          "name": "믹스인",
          "kind": "theory"
        },
        {
          "id": "ts-ref-namespaces",
          "role": "하위 개념",
          "name": "네임스페이스",
          "kind": "theory"
        },
        {
          "id": "ts-ref-ns-modules",
          "role": "하위 개념",
          "name": "네임스페이스와 모듈",
          "kind": "theory"
        },
        {
          "id": "ts-ref-symbols",
          "role": "하위 개념",
          "name": "심볼",
          "kind": "theory"
        },
        {
          "id": "ts-ref-triple",
          "role": "하위 개념",
          "name": "트리플 슬래시 지시어",
          "kind": "theory"
        },
        {
          "id": "ts-ref-compat",
          "role": "하위 개념",
          "name": "타입 호환성",
          "kind": "theory"
        },
        {
          "id": "ts-ref-inference",
          "role": "하위 개념",
          "name": "타입 추론",
          "kind": "theory"
        },
        {
          "id": "ts-ref-vardecl",
          "role": "하위 개념",
          "name": "변수 선언",
          "kind": "theory"
        }
      ]
    },
    "ts-modules-ref": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-mr-intro",
          "role": "하위 개념",
          "name": "모듈 소개",
          "kind": "theory"
        },
        {
          "id": "ts-mr-theory",
          "role": "하위 개념",
          "name": "모듈 이론",
          "kind": "theory"
        },
        {
          "id": "ts-mr-guides",
          "role": "하위 개념",
          "name": "모듈 가이드",
          "kind": "theory"
        },
        {
          "id": "ts-mr-reference",
          "role": "하위 개념",
          "name": "모듈 레퍼런스",
          "kind": "theory"
        },
        {
          "id": "ts-mr-appendices",
          "role": "하위 개념",
          "name": "모듈 부록",
          "kind": "theory"
        }
      ]
    },
    "ts-tutorials": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-tut-aspnet",
          "role": "하위 개념",
          "name": "ASP.NET Core",
          "kind": "theory"
        },
        {
          "id": "ts-tut-gulp",
          "role": "하위 개념",
          "name": "Gulp",
          "kind": "theory"
        },
        {
          "id": "ts-tut-dom",
          "role": "하위 개념",
          "name": "DOM 조작",
          "kind": "theory"
        },
        {
          "id": "ts-tut-migrate",
          "role": "하위 개념",
          "name": "JavaScript에서 옮겨오기",
          "kind": "theory"
        },
        {
          "id": "ts-tut-babel",
          "role": "하위 개념",
          "name": "Babel과 함께 쓰기",
          "kind": "theory"
        }
      ]
    },
    "ts-whatsnew": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "ts-declaration": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-dcl-intro",
          "role": "하위 개념",
          "name": "선언 파일 소개",
          "kind": "theory"
        },
        {
          "id": "ts-dcl-reference",
          "role": "하위 개념",
          "name": "선언 레퍼런스",
          "kind": "theory"
        },
        {
          "id": "ts-dcl-structures",
          "role": "하위 개념",
          "name": "라이브러리 구조",
          "kind": "theory"
        },
        {
          "id": "ts-dcl-templates",
          "role": "하위 개념",
          "name": "d.ts 템플릿",
          "kind": "theory"
        },
        {
          "id": "ts-dcl-dos",
          "role": "하위 개념",
          "name": "해야 할 것과 하지 말 것",
          "kind": "theory"
        },
        {
          "id": "ts-dcl-deep",
          "role": "하위 개념",
          "name": "깊이 알아보기",
          "kind": "theory"
        },
        {
          "id": "ts-dcl-publish",
          "role": "하위 개념",
          "name": "배포하기",
          "kind": "theory"
        },
        {
          "id": "ts-dcl-consume",
          "role": "하위 개념",
          "name": "가져다 쓰기",
          "kind": "theory"
        }
      ]
    },
    "ts-js": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-js-projects",
          "role": "하위 개념",
          "name": "TS를 쓰는 JS 프로젝트",
          "kind": "theory"
        },
        {
          "id": "ts-js-checking",
          "role": "하위 개념",
          "name": "JS 파일 타입 검사",
          "kind": "theory"
        },
        {
          "id": "ts-js-jsdoc",
          "role": "하위 개념",
          "name": "JSDoc 레퍼런스",
          "kind": "theory"
        },
        {
          "id": "ts-js-dts",
          "role": "하위 개념",
          "name": "JS에서 d.ts 만들기",
          "kind": "theory"
        }
      ]
    },
    "ts-config": {
      "left": [
        {
          "id": "ts",
          "role": "상위 개념",
          "name": "TypeScript",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "ts-cfg-tsconfig",
          "role": "하위 개념",
          "name": "tsconfig.json이란",
          "kind": "theory"
        },
        {
          "id": "ts-cfg-msbuild",
          "role": "하위 개념",
          "name": "MSBuild 컴파일러 옵션",
          "kind": "theory"
        },
        {
          "id": "ts-cfg-tsconfig-ref",
          "role": "하위 개념",
          "name": "TSConfig 레퍼런스",
          "kind": "theory"
        },
        {
          "id": "ts-cfg-cli",
          "role": "하위 개념",
          "name": "tsc CLI 옵션",
          "kind": "theory"
        },
        {
          "id": "ts-cfg-references",
          "role": "하위 개념",
          "name": "프로젝트 참조",
          "kind": "theory"
        },
        {
          "id": "ts-cfg-buildtools",
          "role": "하위 개념",
          "name": "빌드 도구 연동",
          "kind": "theory"
        },
        {
          "id": "ts-cfg-watch",
          "role": "하위 개념",
          "name": "watch 설정",
          "kind": "theory"
        },
        {
          "id": "ts-cfg-nightly",
          "role": "하위 개념",
          "name": "나이틀리 빌드",
          "kind": "theory"
        }
      ]
    },
    "vue": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        }
      ],
      "right": [
        {
          "id": "vg",
          "role": "하위 개념",
          "name": "가이드",
          "kind": "theory"
        },
        {
          "id": "va",
          "role": "하위 개념",
          "name": "API 참고서",
          "kind": "theory"
        },
        {
          "id": "vt",
          "role": "하위 개념",
          "name": "튜토리얼",
          "kind": "theory"
        },
        {
          "id": "ve",
          "role": "하위 개념",
          "name": "예제",
          "kind": "theory"
        },
        {
          "id": "vs",
          "role": "하위 개념",
          "name": "스타일 가이드",
          "kind": "theory"
        }
      ]
    },
    "vg": {
      "left": [
        {
          "id": "vue",
          "role": "상위 개념",
          "name": "Vue",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "vg-start",
          "role": "하위 개념",
          "name": "시작하기",
          "kind": "theory"
        },
        {
          "id": "vg-essentials",
          "role": "하위 개념",
          "name": "필수 개념",
          "kind": "theory"
        },
        {
          "id": "vg-components",
          "role": "하위 개념",
          "name": "컴포넌트 심화",
          "kind": "theory"
        },
        {
          "id": "vg-reusability",
          "role": "하위 개념",
          "name": "재사용성",
          "kind": "theory"
        },
        {
          "id": "vg-builtins",
          "role": "하위 개념",
          "name": "내장 컴포넌트",
          "kind": "theory"
        },
        {
          "id": "vg-scaling",
          "role": "하위 개념",
          "name": "확장하기",
          "kind": "theory"
        },
        {
          "id": "vg-practices",
          "role": "하위 개념",
          "name": "베스트 프랙티스",
          "kind": "theory"
        },
        {
          "id": "vg-typescript",
          "role": "하위 개념",
          "name": "TypeScript와 함께",
          "kind": "theory"
        },
        {
          "id": "vg-extras",
          "role": "하위 개념",
          "name": "추가 주제",
          "kind": "theory"
        }
      ]
    },
    "va": {
      "left": [
        {
          "id": "vue",
          "role": "상위 개념",
          "name": "Vue",
          "kind": "theory"
        }
      ],
      "right": [
        {
          "id": "va-global",
          "role": "하위 개념",
          "name": "글로벌 API",
          "kind": "theory"
        },
        {
          "id": "va-composition",
          "role": "하위 개념",
          "name": "Composition API",
          "kind": "theory"
        },
        {
          "id": "va-options",
          "role": "하위 개념",
          "name": "Options API",
          "kind": "theory"
        },
        {
          "id": "va-builtins",
          "role": "하위 개념",
          "name": "내장 기능",
          "kind": "theory"
        },
        {
          "id": "va-sfc",
          "role": "하위 개념",
          "name": "SFC 참고서",
          "kind": "theory"
        },
        {
          "id": "va-advanced",
          "role": "하위 개념",
          "name": "고급 API",
          "kind": "theory"
        }
      ]
    },
    "git": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        }
      ],
      "right": [
        {
          "id": "git-areas",
          "role": "하위 개념",
          "name": "세 개의 공간과 커밋",
          "kind": "theory"
        },
        {
          "id": "git-branch",
          "role": "하위 개념",
          "name": "커밋 사슬 · 브랜치 · HEAD",
          "kind": "theory"
        },
        {
          "id": "git-undo",
          "role": "하위 개념",
          "name": "되돌리기와 복구",
          "kind": "theory"
        },
        {
          "id": "git-remote",
          "role": "하위 개념",
          "name": "로컬과 원격",
          "kind": "theory"
        },
        {
          "id": "git-merge",
          "role": "하위 개념",
          "name": "합치기와 충돌",
          "kind": "theory"
        },
        {
          "id": "git-github",
          "role": "하위 개념",
          "name": "GitHub 협업",
          "kind": "theory"
        },
        {
          "id": "git-practice",
          "role": "하위 개념",
          "name": "실전 상황 대처",
          "kind": "theory"
        }
      ]
    },
    "git-areas": {
      "left": [
        {
          "id": "git",
          "role": "상위 개념",
          "name": "Git",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "git-branch": {
      "left": [
        {
          "id": "git",
          "role": "상위 개념",
          "name": "Git",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "git-undo": {
      "left": [
        {
          "id": "git",
          "role": "상위 개념",
          "name": "Git",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "git-remote": {
      "left": [
        {
          "id": "git",
          "role": "상위 개념",
          "name": "Git",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "git-merge": {
      "left": [
        {
          "id": "git",
          "role": "상위 개념",
          "name": "Git",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "git-github": {
      "left": [
        {
          "id": "git",
          "role": "상위 개념",
          "name": "Git",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "git-practice": {
      "left": [
        {
          "id": "git",
          "role": "상위 개념",
          "name": "Git",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        }
      ],
      "right": [
        {
          "id": "i18n-s1",
          "role": "하위 개념",
          "name": "1단계 · 언어별 별도 빌드",
          "kind": "theory"
        },
        {
          "id": "i18n-s2",
          "role": "하위 개념",
          "name": "2단계 · 리소스 파일과 번호표",
          "kind": "theory"
        },
        {
          "id": "i18n-s3",
          "role": "하위 개념",
          "name": "3단계 · 영어 원문을 열쇠로 (gettext)",
          "kind": "theory"
        },
        {
          "id": "i18n-s4",
          "role": "하위 개념",
          "name": "4단계 · 이름표를 열쇠로 (Vue I18n)",
          "kind": "theory"
        },
        {
          "id": "i18n-s5",
          "role": "하위 개념",
          "name": "5단계 · 값 자리의 문장 문법",
          "kind": "theory"
        },
        {
          "id": "i18n-s6",
          "role": "하위 개념",
          "name": "6단계 · 날짜와 숫자는 Intl에 맡긴다",
          "kind": "theory"
        },
        {
          "id": "i18n-s7",
          "role": "하위 개념",
          "name": "7단계 · 로케일 협상과 폴백",
          "kind": "theory"
        },
        {
          "id": "i18n-s8",
          "role": "하위 개념",
          "name": "8단계 · 반응형 전환과 스코프",
          "kind": "theory"
        },
        {
          "id": "i18n-s9",
          "role": "하위 개념",
          "name": "9단계 · 지연 로딩과 사전 컴파일",
          "kind": "theory"
        },
        {
          "id": "i18n-s10",
          "role": "하위 개념",
          "name": "10단계 · 타입·린트·CI로 열쇠를 보증한다",
          "kind": "theory"
        },
        {
          "id": "i18n-s11",
          "role": "하위 개념",
          "name": "11단계 · 번역 워크플로: 사전은 누가 채우나",
          "kind": "theory"
        },
        {
          "id": "i18n-s12",
          "role": "하위 개념",
          "name": "12단계 · SSR: 요청마다 인스턴스 하나",
          "kind": "theory"
        },
        {
          "id": "i18n-s13",
          "role": "하위 개념",
          "name": "13단계 · 기계 번역과 LLM이 표를 채운다",
          "kind": "theory"
        },
        {
          "id": "i18n-s14",
          "role": "하위 개념",
          "name": "14단계 · MessageFormat 2: 문장 문법의 표준",
          "kind": "theory"
        },
        {
          "id": "i18n-commerce-web",
          "role": "하위 개념",
          "name": "진단 · commerce-web은 어느 단계인가",
          "kind": "idea"
        },
        {
          "id": "dict",
          "role": "사전",
          "name": "사전",
          "kind": "idea"
        }
      ]
    },
    "i18n-s1": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s2": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s3": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s4": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s5": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s6": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s7": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s8": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s9": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s10": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s11": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s12": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s13": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-s14": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "i18n-commerce-web": {
      "left": [
        {
          "id": "i18n",
          "role": "상위 개념",
          "name": "i18n",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render": {
      "left": [
        {
          "id": "me",
          "role": "공부한 사람",
          "name": "Who am I",
          "kind": "me"
        }
      ],
      "right": [
        {
          "id": "render-s1",
          "role": "하위 개념",
          "name": "1장 · 프로세스와 네비게이션",
          "kind": "theory"
        },
        {
          "id": "render-s2",
          "role": "하위 개념",
          "name": "2장 · window의 탄생",
          "kind": "theory"
        },
        {
          "id": "render-s3",
          "role": "하위 개념",
          "name": "3장 · document의 탄생과 readyState",
          "kind": "theory"
        },
        {
          "id": "render-s4",
          "role": "하위 개념",
          "name": "4장 · 바이트에서 DOM까지",
          "kind": "theory"
        },
        {
          "id": "render-s5",
          "role": "하위 개념",
          "name": "5장 · 스크립트가 파서를 멈추는 자리",
          "kind": "theory"
        },
        {
          "id": "render-s6",
          "role": "하위 개념",
          "name": "6장 · CSSOM과 스타일 계산",
          "kind": "theory"
        },
        {
          "id": "render-s7",
          "role": "하위 개념",
          "name": "7장 · 레이아웃",
          "kind": "theory"
        },
        {
          "id": "render-s8",
          "role": "하위 개념",
          "name": "8장 · 글자가 그려지는 길",
          "kind": "theory"
        },
        {
          "id": "render-s9",
          "role": "하위 개념",
          "name": "9장 · 페인트와 합성",
          "kind": "theory"
        },
        {
          "id": "render-s10",
          "role": "하위 개념",
          "name": "10장 · 이벤트 루프와 프레임",
          "kind": "theory"
        },
        {
          "id": "render-s11",
          "role": "하위 개념",
          "name": "11장 · 프레임 안의 프레임",
          "kind": "theory"
        },
        {
          "id": "render-s12",
          "role": "하위 개념",
          "name": "12장 · 프레임워크가 끼어드는 자리",
          "kind": "theory"
        },
        {
          "id": "dict",
          "role": "사전",
          "name": "사전",
          "kind": "idea"
        }
      ]
    },
    "render-s1": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s2": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s3": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s4": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s5": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s6": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s7": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s8": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s9": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s10": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s11": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "render-s12": {
      "left": [
        {
          "id": "render",
          "role": "상위 개념",
          "name": "브라우저 렌더링",
          "kind": "theory"
        }
      ],
      "right": []
    },
    "t-isolated": {
      "left": [
        {
          "id": "withy",
          "role": "프로젝트 / 발생한 곳",
          "name": "WITHY",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "js-frames",
          "role": "이론 / 원인 개념",
          "name": "프레임과 윈도우",
          "kind": "theory"
        }
      ]
    },
    "t-focus": {
      "left": [
        {
          "id": "withy",
          "role": "프로젝트 / 발생한 곳",
          "name": "WITHY",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "js-events",
          "role": "이론 / 원인 개념",
          "name": "이벤트 기초",
          "kind": "theory"
        },
        {
          "id": "js-ui-events",
          "role": "이론 / 관련 개념",
          "name": "UI 이벤트",
          "kind": "theory"
        }
      ]
    },
    "t-sync": {
      "left": [
        {
          "id": "withy",
          "role": "프로젝트 / 발생한 곳",
          "name": "WITHY",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "js-network",
          "role": "이론 / 해결 기법",
          "name": "네트워크 요청",
          "kind": "theory"
        },
        {
          "id": "rl-escape",
          "role": "이론 / 관련 개념",
          "name": "탈출구",
          "kind": "theory"
        }
      ]
    },
    "t-schema": {
      "left": [
        {
          "id": "petfolio",
          "role": "프로젝트 / 발생한 곳",
          "name": "Petfolio",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "ts-hb-everyday",
          "role": "이론 / 원인 개념",
          "name": "일상적인 타입",
          "kind": "theory"
        },
        {
          "id": "ts-hb-narrowing",
          "role": "이론 / 해결 기법",
          "name": "좁히기",
          "kind": "theory"
        }
      ]
    },
    "t-tagged": {
      "left": [
        {
          "id": "petfolio",
          "role": "프로젝트 / 발생한 곳",
          "name": "Petfolio",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "ts-hb-narrowing",
          "role": "이론 / 해결 기법",
          "name": "좁히기",
          "kind": "theory"
        },
        {
          "id": "ts-tm-creating",
          "role": "이론 / 관련 개념",
          "name": "타입에서 타입 만들기",
          "kind": "theory"
        }
      ]
    },
    "t-canvas": {
      "left": [
        {
          "id": "tickle",
          "role": "프로젝트 / 발생한 곳",
          "name": "Tickle",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "js-document",
          "role": "이론 / 관련 개념",
          "name": "문서",
          "kind": "theory"
        }
      ]
    },
    "t-webdriver": {
      "left": [
        {
          "id": "tickle",
          "role": "프로젝트 / 발생한 곳",
          "name": "Tickle",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "js-document",
          "role": "이론 / 관련 개념",
          "name": "문서",
          "kind": "theory"
        }
      ]
    },
    "t-buffer": {
      "left": [
        {
          "id": "tickle",
          "role": "프로젝트 / 발생한 곳",
          "name": "Tickle",
          "kind": "project"
        }
      ],
      "right": [
        {
          "id": "js-ui-misc",
          "role": "이론 / 원인 개념",
          "name": "브라우저 기타",
          "kind": "theory"
        },
        {
          "id": "rl-interact",
          "role": "이론 / 원인 개념",
          "name": "상호작용 더하기",
          "kind": "theory"
        },
        {
          "id": "rl-escape",
          "role": "이론 / 해결 기법",
          "name": "탈출구",
          "kind": "theory"
        }
      ]
    }
  },
  "crumbs": {
    "me": [
      "me"
    ],
    "withy": [
      "withy"
    ],
    "petfolio": [
      "petfolio"
    ],
    "tickle": [
      "tickle"
    ],
    "dict": [
      "dict"
    ],
    "algo-bruteforce": [
      "algo",
      "algo-bruteforce"
    ],
    "swea-5188": [
      "algo",
      "algo-bruteforce",
      "swea-5188"
    ],
    "til-2026-09-15": [
      "til",
      "til-2026-09-15"
    ],
    "til-2026-09-02": [
      "til",
      "til-2026-09-02"
    ],
    "craft-url": [
      "fe-craft",
      "craft-entry",
      "craft-url"
    ],
    "craft-request": [
      "fe-craft",
      "craft-fetch",
      "craft-request"
    ],
    "craft-4state": [
      "fe-craft",
      "craft-fetch",
      "craft-4state"
    ],
    "craft-cache": [
      "fe-craft",
      "craft-fetch",
      "craft-cache"
    ],
    "craft-colocation": [
      "fe-craft",
      "craft-state",
      "craft-colocation"
    ],
    "craft-flow": [
      "fe-craft",
      "craft-state",
      "craft-flow"
    ],
    "craft-composition": [
      "fe-craft",
      "craft-component",
      "craft-composition"
    ],
    "craft-contract": [
      "fe-craft",
      "craft-component",
      "craft-contract"
    ],
    "craft-hooks": [
      "fe-craft",
      "craft-component",
      "craft-hooks"
    ],
    "craft-strategy": [
      "fe-craft",
      "craft-render",
      "craft-strategy"
    ],
    "craft-rerender": [
      "fe-craft",
      "craft-render",
      "craft-rerender"
    ],
    "craft-timing": [
      "fe-craft",
      "craft-render",
      "craft-timing"
    ],
    "craft-concurrency": [
      "fe-craft",
      "craft-robust",
      "craft-concurrency"
    ],
    "craft-error": [
      "fe-craft",
      "craft-robust",
      "craft-error"
    ],
    "craft-trust": [
      "fe-craft",
      "craft-robust",
      "craft-trust"
    ],
    "craft-perf": [
      "fe-craft",
      "craft-quality",
      "craft-perf"
    ],
    "craft-a11y": [
      "fe-craft",
      "craft-quality",
      "craft-a11y"
    ],
    "craft-observe": [
      "fe-craft",
      "craft-quality",
      "craft-observe"
    ],
    "react": [
      "react"
    ],
    "rl": [
      "react",
      "rl"
    ],
    "rl-start": [
      "react",
      "rl",
      "rl-start"
    ],
    "rl-start-quick": [
      "react",
      "rl",
      "rl-start",
      "rl-start-quick"
    ],
    "rl-start-install": [
      "react",
      "rl",
      "rl-start",
      "rl-start-install"
    ],
    "rl-start-setup": [
      "react",
      "rl",
      "rl-start",
      "rl-start-setup"
    ],
    "rl-start-compiler": [
      "react",
      "rl",
      "rl-start",
      "rl-start-compiler"
    ],
    "rl-learn": [
      "react",
      "rl",
      "rl-learn"
    ],
    "rl-ui": [
      "react",
      "rl",
      "rl-learn",
      "rl-ui"
    ],
    "rl-interact": [
      "react",
      "rl",
      "rl-learn",
      "rl-interact"
    ],
    "rl-state": [
      "react",
      "rl",
      "rl-learn",
      "rl-state"
    ],
    "rl-escape": [
      "react",
      "rl",
      "rl-learn",
      "rl-escape"
    ],
    "ra": [
      "react",
      "ra"
    ],
    "ra-react": [
      "react",
      "ra",
      "ra-react"
    ],
    "ra-react-hooks": [
      "react",
      "ra",
      "ra-react",
      "ra-react-hooks"
    ],
    "ra-react-components": [
      "react",
      "ra",
      "ra-react",
      "ra-react-components"
    ],
    "ra-react-apis": [
      "react",
      "ra",
      "ra-react",
      "ra-react-apis"
    ],
    "ra-dom": [
      "react",
      "ra",
      "ra-dom"
    ],
    "ra-dom-hooks": [
      "react",
      "ra",
      "ra-dom",
      "ra-dom-hooks"
    ],
    "ra-dom-components": [
      "react",
      "ra",
      "ra-dom",
      "ra-dom-components"
    ],
    "ra-dom-apis": [
      "react",
      "ra",
      "ra-dom",
      "ra-dom-apis"
    ],
    "ra-dom-client": [
      "react",
      "ra",
      "ra-dom",
      "ra-dom-client"
    ],
    "ra-dom-server": [
      "react",
      "ra",
      "ra-dom",
      "ra-dom-server"
    ],
    "ra-dom-static": [
      "react",
      "ra",
      "ra-dom",
      "ra-dom-static"
    ],
    "ra-compiler": [
      "react",
      "ra",
      "ra-compiler"
    ],
    "ra-compiler-config": [
      "react",
      "ra",
      "ra-compiler",
      "ra-compiler-config"
    ],
    "ra-compiler-directives": [
      "react",
      "ra",
      "ra-compiler",
      "ra-compiler-directives"
    ],
    "ra-devtools": [
      "react",
      "ra",
      "ra-devtools"
    ],
    "ra-eslint": [
      "react",
      "ra",
      "ra-eslint"
    ],
    "ra-eslint-lints": [
      "react",
      "ra",
      "ra-eslint",
      "ra-eslint-lints"
    ],
    "ra-rules": [
      "react",
      "ra",
      "ra-rules"
    ],
    "ra-rules-overview": [
      "react",
      "ra",
      "ra-rules",
      "ra-rules-overview"
    ],
    "ra-rsc": [
      "react",
      "ra",
      "ra-rsc"
    ],
    "ra-rsc-directives": [
      "react",
      "ra",
      "ra-rsc",
      "ra-rsc-directives"
    ],
    "ra-legacy": [
      "react",
      "ra",
      "ra-legacy"
    ],
    "ra-legacy-apis": [
      "react",
      "ra",
      "ra-legacy",
      "ra-legacy-apis"
    ],
    "js": [
      "js"
    ],
    "js-core": [
      "js",
      "js-core"
    ],
    "js-intro": [
      "js",
      "js-core",
      "js-intro"
    ],
    "js-first-steps": [
      "js",
      "js-core",
      "js-first-steps"
    ],
    "js-quality": [
      "js",
      "js-core",
      "js-quality"
    ],
    "js-object-basics": [
      "js",
      "js-core",
      "js-object-basics"
    ],
    "js-data-types": [
      "js",
      "js-core",
      "js-data-types"
    ],
    "js-adv-functions": [
      "js",
      "js-core",
      "js-adv-functions"
    ],
    "js-object-props": [
      "js",
      "js-core",
      "js-object-props"
    ],
    "js-prototypes": [
      "js",
      "js-core",
      "js-prototypes"
    ],
    "js-classes": [
      "js",
      "js-core",
      "js-classes"
    ],
    "js-error": [
      "js",
      "js-core",
      "js-error"
    ],
    "js-async": [
      "js",
      "js-core",
      "js-async"
    ],
    "js-generators": [
      "js",
      "js-core",
      "js-generators"
    ],
    "js-modules": [
      "js",
      "js-core",
      "js-modules"
    ],
    "js-core-misc": [
      "js",
      "js-core",
      "js-core-misc"
    ],
    "js-browser": [
      "js",
      "js-browser"
    ],
    "js-document": [
      "js",
      "js-browser",
      "js-document"
    ],
    "js-events": [
      "js",
      "js-browser",
      "js-events"
    ],
    "js-ui-events": [
      "js",
      "js-browser",
      "js-ui-events"
    ],
    "js-forms": [
      "js",
      "js-browser",
      "js-forms"
    ],
    "js-loading": [
      "js",
      "js-browser",
      "js-loading"
    ],
    "js-ui-misc": [
      "js",
      "js-browser",
      "js-ui-misc"
    ],
    "js-extra": [
      "js",
      "js-extra"
    ],
    "js-frames": [
      "js",
      "js-extra",
      "js-frames"
    ],
    "js-binary": [
      "js",
      "js-extra",
      "js-binary"
    ],
    "js-network": [
      "js",
      "js-extra",
      "js-network"
    ],
    "js-storage": [
      "js",
      "js-extra",
      "js-storage"
    ],
    "js-animation": [
      "js",
      "js-extra",
      "js-animation"
    ],
    "js-webcomponents": [
      "js",
      "js-extra",
      "js-webcomponents"
    ],
    "js-regexp": [
      "js",
      "js-extra",
      "js-regexp"
    ],
    "ts": [
      "ts"
    ],
    "ts-start": [
      "ts",
      "ts-start"
    ],
    "ts-handbook": [
      "ts",
      "ts-handbook"
    ],
    "ts-hb-everyday": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday"
    ],
    "ts-ev-primitives": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-primitives"
    ],
    "ts-ev-arrays": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-arrays"
    ],
    "ts-ev-any": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-any"
    ],
    "ts-ev-annotations": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-annotations"
    ],
    "ts-ev-functions": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-functions"
    ],
    "ts-ev-objects": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-objects"
    ],
    "ts-ev-unions": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-unions"
    ],
    "ts-ev-aliases": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-aliases"
    ],
    "ts-ev-interfaces": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-interfaces"
    ],
    "ts-ev-assertions": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-assertions"
    ],
    "ts-ev-literals": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-literals"
    ],
    "ts-ev-null": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-null"
    ],
    "ts-ev-enums": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-enums"
    ],
    "ts-ev-rare": [
      "ts",
      "ts-handbook",
      "ts-hb-everyday",
      "ts-ev-rare"
    ],
    "ts-reference": [
      "ts",
      "ts-reference"
    ],
    "ts-modules-ref": [
      "ts",
      "ts-modules-ref"
    ],
    "ts-tutorials": [
      "ts",
      "ts-tutorials"
    ],
    "ts-whatsnew": [
      "ts",
      "ts-whatsnew"
    ],
    "ts-declaration": [
      "ts",
      "ts-declaration"
    ],
    "ts-js": [
      "ts",
      "ts-js"
    ],
    "ts-config": [
      "ts",
      "ts-config"
    ],
    "vue": [
      "vue"
    ],
    "vg": [
      "vue",
      "vg"
    ],
    "va": [
      "vue",
      "va"
    ],
    "git": [
      "git"
    ],
    "git-areas": [
      "git",
      "git-areas"
    ],
    "git-branch": [
      "git",
      "git-branch"
    ],
    "git-undo": [
      "git",
      "git-undo"
    ],
    "git-remote": [
      "git",
      "git-remote"
    ],
    "git-merge": [
      "git",
      "git-merge"
    ],
    "git-github": [
      "git",
      "git-github"
    ],
    "git-practice": [
      "git",
      "git-practice"
    ],
    "i18n": [
      "i18n"
    ],
    "i18n-s1": [
      "i18n",
      "i18n-s1"
    ],
    "i18n-s2": [
      "i18n",
      "i18n-s2"
    ],
    "i18n-s3": [
      "i18n",
      "i18n-s3"
    ],
    "i18n-s4": [
      "i18n",
      "i18n-s4"
    ],
    "i18n-s5": [
      "i18n",
      "i18n-s5"
    ],
    "i18n-s6": [
      "i18n",
      "i18n-s6"
    ],
    "i18n-s7": [
      "i18n",
      "i18n-s7"
    ],
    "i18n-s8": [
      "i18n",
      "i18n-s8"
    ],
    "i18n-s9": [
      "i18n",
      "i18n-s9"
    ],
    "i18n-s10": [
      "i18n",
      "i18n-s10"
    ],
    "i18n-s11": [
      "i18n",
      "i18n-s11"
    ],
    "i18n-s12": [
      "i18n",
      "i18n-s12"
    ],
    "i18n-s13": [
      "i18n",
      "i18n-s13"
    ],
    "i18n-s14": [
      "i18n",
      "i18n-s14"
    ],
    "i18n-commerce-web": [
      "i18n",
      "i18n-commerce-web"
    ],
    "render": [
      "render"
    ],
    "render-s1": [
      "render",
      "render-s1"
    ],
    "render-s2": [
      "render",
      "render-s2"
    ],
    "render-s3": [
      "render",
      "render-s3"
    ],
    "render-s4": [
      "render",
      "render-s4"
    ],
    "render-s5": [
      "render",
      "render-s5"
    ],
    "render-s6": [
      "render",
      "render-s6"
    ],
    "render-s7": [
      "render",
      "render-s7"
    ],
    "render-s8": [
      "render",
      "render-s8"
    ],
    "render-s9": [
      "render",
      "render-s9"
    ],
    "render-s10": [
      "render",
      "render-s10"
    ],
    "render-s11": [
      "render",
      "render-s11"
    ],
    "render-s12": [
      "render",
      "render-s12"
    ],
    "t-isolated": [
      "withy",
      "t-isolated"
    ],
    "t-focus": [
      "withy",
      "t-focus"
    ],
    "t-sync": [
      "withy",
      "t-sync"
    ],
    "t-schema": [
      "petfolio",
      "t-schema"
    ],
    "t-tagged": [
      "petfolio",
      "t-tagged"
    ],
    "t-canvas": [
      "tickle",
      "t-canvas"
    ],
    "t-webdriver": [
      "tickle",
      "t-webdriver"
    ],
    "t-buffer": [
      "tickle",
      "t-buffer"
    ]
  },
  "annotations": {
    "me": {
      "clickable": true,
      "meta": "프론트엔드 이민엽"
    },
    "withy": {
      "meta": "트러블 3"
    },
    "petfolio": {
      "meta": "트러블 2"
    },
    "tickle": {
      "meta": "트러블 3"
    },
    "fe-craft": {
      "meta": "챕터 7"
    },
    "dict": {
      "clickable": true,
      "meta": "낱말 167"
    },
    "algo": {
      "meta": "챕터 1"
    },
    "algo-bruteforce": {
      "clickable": true,
      "meta": "챕터 1"
    },
    "swea-5188": {
      "clickable": true
    },
    "til": {
      "meta": "기록 2"
    },
    "til-2026-09-15": {
      "clickable": true
    },
    "til-2026-09-02": {
      "clickable": true
    },
    "craft-entry": {
      "meta": "챕터 1"
    },
    "craft-url": {
      "clickable": true
    },
    "craft-fetch": {
      "meta": "챕터 3"
    },
    "craft-request": {
      "clickable": true
    },
    "craft-4state": {
      "clickable": true
    },
    "craft-cache": {
      "clickable": true
    },
    "craft-state": {
      "meta": "챕터 2"
    },
    "craft-colocation": {
      "clickable": true
    },
    "craft-flow": {
      "clickable": true
    },
    "craft-component": {
      "meta": "챕터 3"
    },
    "craft-composition": {
      "clickable": true
    },
    "craft-contract": {
      "clickable": true
    },
    "craft-hooks": {
      "clickable": true
    },
    "craft-render": {
      "meta": "챕터 3"
    },
    "craft-strategy": {
      "clickable": true
    },
    "craft-rerender": {
      "clickable": true
    },
    "craft-timing": {
      "clickable": true
    },
    "craft-robust": {
      "meta": "챕터 3"
    },
    "craft-concurrency": {
      "clickable": true
    },
    "craft-error": {
      "clickable": true
    },
    "craft-trust": {
      "clickable": true
    },
    "craft-quality": {
      "meta": "챕터 3"
    },
    "craft-perf": {
      "clickable": true
    },
    "craft-a11y": {
      "clickable": true
    },
    "craft-observe": {
      "clickable": true
    },
    "react": {
      "clickable": true,
      "meta": "챕터 2"
    },
    "rl": {
      "clickable": true,
      "meta": "챕터 2"
    },
    "rl-start": {
      "clickable": true,
      "meta": "챕터 4"
    },
    "rl-start-quick": {
      "clickable": true
    },
    "rl-start-install": {
      "clickable": true
    },
    "rl-start-setup": {
      "clickable": true
    },
    "rl-start-compiler": {
      "clickable": true
    },
    "rl-learn": {
      "clickable": true,
      "meta": "챕터 4"
    },
    "rl-ui": {
      "clickable": true
    },
    "rl-interact": {
      "clickable": true,
      "meta": "글 1"
    },
    "rl-state": {
      "clickable": true
    },
    "rl-escape": {
      "clickable": true,
      "meta": "글 2"
    },
    "ra": {
      "clickable": true,
      "meta": "챕터 8"
    },
    "ra-react": {
      "clickable": true,
      "meta": "챕터 3"
    },
    "ra-react-hooks": {
      "clickable": true
    },
    "ra-react-components": {
      "clickable": true
    },
    "ra-react-apis": {
      "clickable": true
    },
    "ra-dom": {
      "clickable": true,
      "meta": "챕터 6"
    },
    "ra-dom-hooks": {
      "clickable": true
    },
    "ra-dom-components": {
      "clickable": true
    },
    "ra-dom-apis": {
      "clickable": true
    },
    "ra-dom-client": {
      "clickable": true
    },
    "ra-dom-server": {
      "clickable": true
    },
    "ra-dom-static": {
      "clickable": true
    },
    "ra-compiler": {
      "clickable": true,
      "meta": "챕터 2"
    },
    "ra-compiler-config": {
      "clickable": true
    },
    "ra-compiler-directives": {
      "clickable": true
    },
    "ra-devtools": {
      "clickable": true
    },
    "ra-eslint": {
      "clickable": true,
      "meta": "챕터 1"
    },
    "ra-eslint-lints": {
      "clickable": true
    },
    "ra-rules": {
      "clickable": true,
      "meta": "챕터 1"
    },
    "ra-rules-overview": {
      "clickable": true
    },
    "ra-rsc": {
      "clickable": true,
      "meta": "챕터 1"
    },
    "ra-rsc-directives": {
      "clickable": true
    },
    "ra-legacy": {
      "clickable": true,
      "meta": "챕터 1"
    },
    "ra-legacy-apis": {
      "clickable": true
    },
    "js": {
      "clickable": true,
      "meta": "챕터 3"
    },
    "js-core": {
      "clickable": true,
      "meta": "챕터 14"
    },
    "js-intro": {
      "clickable": true
    },
    "js-first-steps": {
      "clickable": true
    },
    "js-quality": {
      "clickable": true
    },
    "js-object-basics": {
      "clickable": true
    },
    "js-data-types": {
      "clickable": true
    },
    "js-adv-functions": {
      "clickable": true
    },
    "js-object-props": {
      "clickable": true
    },
    "js-prototypes": {
      "clickable": true
    },
    "js-classes": {
      "clickable": true
    },
    "js-error": {
      "clickable": true
    },
    "js-async": {
      "clickable": true
    },
    "js-generators": {
      "clickable": true
    },
    "js-modules": {
      "clickable": true
    },
    "js-core-misc": {
      "clickable": true
    },
    "js-browser": {
      "clickable": true,
      "meta": "챕터 6"
    },
    "js-document": {
      "clickable": true,
      "meta": "글 2"
    },
    "js-events": {
      "clickable": true,
      "meta": "글 1"
    },
    "js-ui-events": {
      "clickable": true,
      "meta": "글 1"
    },
    "js-forms": {
      "clickable": true
    },
    "js-loading": {
      "clickable": true
    },
    "js-ui-misc": {
      "clickable": true,
      "meta": "글 1"
    },
    "js-extra": {
      "clickable": true,
      "meta": "챕터 7"
    },
    "js-frames": {
      "clickable": true,
      "meta": "글 1"
    },
    "js-binary": {
      "clickable": true
    },
    "js-network": {
      "clickable": true,
      "meta": "글 1"
    },
    "js-storage": {
      "clickable": true
    },
    "js-animation": {
      "clickable": true
    },
    "js-webcomponents": {
      "clickable": true
    },
    "js-regexp": {
      "clickable": true
    },
    "ts": {
      "clickable": true,
      "meta": "챕터 9"
    },
    "ts-start": {
      "clickable": true,
      "meta": "챕터 5"
    },
    "ts-handbook": {
      "clickable": true,
      "meta": "챕터 8"
    },
    "ts-hb-everyday": {
      "clickable": true,
      "meta": "챕터 14"
    },
    "ts-ev-primitives": {
      "clickable": true
    },
    "ts-ev-arrays": {
      "clickable": true
    },
    "ts-ev-any": {
      "clickable": true
    },
    "ts-ev-annotations": {
      "clickable": true
    },
    "ts-ev-functions": {
      "clickable": true
    },
    "ts-ev-objects": {
      "clickable": true
    },
    "ts-ev-unions": {
      "clickable": true
    },
    "ts-ev-aliases": {
      "clickable": true
    },
    "ts-ev-interfaces": {
      "clickable": true
    },
    "ts-ev-assertions": {
      "clickable": true
    },
    "ts-ev-literals": {
      "clickable": true
    },
    "ts-ev-null": {
      "clickable": true
    },
    "ts-ev-enums": {
      "clickable": true
    },
    "ts-ev-rare": {
      "clickable": true
    },
    "ts-hb-narrowing": {
      "meta": "글 2"
    },
    "ts-hb-manipulation": {
      "meta": "챕터 8"
    },
    "ts-tm-creating": {
      "meta": "글 1"
    },
    "ts-reference": {
      "clickable": true,
      "meta": "챕터 15"
    },
    "ts-modules-ref": {
      "clickable": true,
      "meta": "챕터 5"
    },
    "ts-mr-guides": {
      "meta": "챕터 1"
    },
    "ts-mr-appendices": {
      "meta": "챕터 1"
    },
    "ts-tutorials": {
      "clickable": true,
      "meta": "챕터 5"
    },
    "ts-whatsnew": {
      "clickable": true
    },
    "ts-declaration": {
      "clickable": true,
      "meta": "챕터 8"
    },
    "ts-dcl-templates": {
      "meta": "챕터 6"
    },
    "ts-js": {
      "clickable": true,
      "meta": "챕터 4"
    },
    "ts-config": {
      "clickable": true,
      "meta": "챕터 8"
    },
    "vue": {
      "clickable": true,
      "meta": "챕터 5"
    },
    "vg": {
      "clickable": true,
      "meta": "챕터 9"
    },
    "vg-start": {
      "meta": "챕터 2"
    },
    "vg-essentials": {
      "meta": "챕터 13"
    },
    "vg-components": {
      "meta": "챕터 8"
    },
    "vg-reusability": {
      "meta": "챕터 3"
    },
    "vg-builtins": {
      "meta": "챕터 5"
    },
    "vg-scaling": {
      "meta": "챕터 6"
    },
    "vg-practices": {
      "meta": "챕터 4"
    },
    "vg-typescript": {
      "meta": "챕터 3"
    },
    "vg-extras": {
      "meta": "챕터 7"
    },
    "va": {
      "clickable": true,
      "meta": "챕터 6"
    },
    "va-global": {
      "meta": "챕터 2"
    },
    "va-composition": {
      "meta": "챕터 7"
    },
    "va-options": {
      "meta": "챕터 6"
    },
    "va-builtins": {
      "meta": "챕터 4"
    },
    "va-sfc": {
      "meta": "챕터 3"
    },
    "va-advanced": {
      "meta": "챕터 6"
    },
    "ve": {
      "meta": "챕터 3"
    },
    "vs": {
      "meta": "챕터 4"
    },
    "git": {
      "clickable": true,
      "meta": "챕터 7"
    },
    "git-areas": {
      "clickable": true
    },
    "git-branch": {
      "clickable": true
    },
    "git-undo": {
      "clickable": true
    },
    "git-remote": {
      "clickable": true
    },
    "git-merge": {
      "clickable": true
    },
    "git-github": {
      "clickable": true
    },
    "git-practice": {
      "clickable": true
    },
    "i18n": {
      "clickable": true,
      "meta": "챕터 15"
    },
    "i18n-s1": {
      "clickable": true
    },
    "i18n-s2": {
      "clickable": true
    },
    "i18n-s3": {
      "clickable": true
    },
    "i18n-s4": {
      "clickable": true
    },
    "i18n-s5": {
      "clickable": true
    },
    "i18n-s6": {
      "clickable": true
    },
    "i18n-s7": {
      "clickable": true
    },
    "i18n-s8": {
      "clickable": true
    },
    "i18n-s9": {
      "clickable": true
    },
    "i18n-s10": {
      "clickable": true
    },
    "i18n-s11": {
      "clickable": true
    },
    "i18n-s12": {
      "clickable": true
    },
    "i18n-s13": {
      "clickable": true
    },
    "i18n-s14": {
      "clickable": true
    },
    "i18n-commerce-web": {
      "clickable": true
    },
    "render": {
      "clickable": true,
      "meta": "챕터 12"
    },
    "render-s1": {
      "clickable": true
    },
    "render-s2": {
      "clickable": true
    },
    "render-s3": {
      "clickable": true
    },
    "render-s4": {
      "clickable": true
    },
    "render-s5": {
      "clickable": true
    },
    "render-s6": {
      "clickable": true
    },
    "render-s7": {
      "clickable": true
    },
    "render-s8": {
      "clickable": true
    },
    "render-s9": {
      "clickable": true
    },
    "render-s10": {
      "clickable": true
    },
    "render-s11": {
      "clickable": true
    },
    "render-s12": {
      "clickable": true
    },
    "t-isolated": {
      "clickable": true,
      "meta": "9분, 섹션 5",
      "dateLabel": "2026.02.05"
    },
    "t-focus": {
      "clickable": true,
      "meta": "7분, 섹션 7",
      "dateLabel": "2026.02.06"
    },
    "t-sync": {
      "clickable": true,
      "meta": "7분, 섹션 5",
      "dateLabel": "2026.02.08"
    },
    "t-schema": {
      "clickable": true,
      "meta": "6분, 섹션 4",
      "dateLabel": "2026.03.24"
    },
    "t-tagged": {
      "clickable": true,
      "meta": "6분, 섹션 4",
      "dateLabel": "2026.03.28"
    },
    "t-canvas": {
      "clickable": true,
      "meta": "7분, 섹션 6",
      "dateLabel": "2026.05.10"
    },
    "t-webdriver": {
      "clickable": true,
      "meta": "5분, 섹션 4",
      "dateLabel": "2026.05.15"
    },
    "t-buffer": {
      "clickable": true,
      "meta": "9분, 섹션 6",
      "dateLabel": "2026.05.22"
    }
  },
  "posts": [
    {
      "id": "t-isolated",
      "title": "video.currentTime은 됐는데, 넷플릭스는 그 사실을 몰랐다",
      "date": "2026.02.05",
      "project": "withy",
      "theories": [
        "js-frames"
      ]
    },
    {
      "id": "t-focus",
      "title": "넷플릭스가 유휴 상태가 되면 채팅 커서가 사라졌다",
      "date": "2026.02.06",
      "project": "withy",
      "theories": [
        "js-events",
        "js-ui-events"
      ]
    },
    {
      "id": "t-sync",
      "title": "완벽히 맞추려던 동기화가 오히려 영상을 끊고 있었다",
      "date": "2026.02.08",
      "project": "withy",
      "theories": [
        "js-network",
        "rl-escape"
      ]
    },
    {
      "id": "t-schema",
      "title": "백엔드 스키마가 바뀌면 전원이 같은 흰 화면을 봤다",
      "date": "2026.03.24",
      "project": "petfolio",
      "theories": [
        "ts-hb-everyday",
        "ts-hb-narrowing"
      ]
    },
    {
      "id": "t-tagged",
      "title": "에러 타입이 unknown인 채로는, 놓친 분기가 크래시가 된다",
      "date": "2026.03.28",
      "project": "petfolio",
      "theories": [
        "ts-hb-narrowing",
        "ts-tm-creating"
      ]
    },
    {
      "id": "t-canvas",
      "title": "DOM으로 그린 좌석은 셀렉터 한 줄에 뚫렸다",
      "date": "2026.05.10",
      "project": "tickle",
      "theories": [
        "js-document"
      ]
    },
    {
      "id": "t-webdriver",
      "title": "봇 방어가 서버 AI 한 곳뿐이라는 게 문제였다",
      "date": "2026.05.15",
      "project": "tickle",
      "theories": [
        "js-document"
      ]
    },
    {
      "id": "t-buffer",
      "title": "행동 데이터를 수집하자 좌석 화면이 버벅였다",
      "date": "2026.05.22",
      "project": "tickle",
      "theories": [
        "js-ui-misc",
        "rl-interact",
        "rl-escape"
      ]
    }
  ]
};
