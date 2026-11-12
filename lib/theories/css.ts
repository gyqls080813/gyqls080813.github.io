import type { Theory } from ".";

/**
 * CSS — MDN 의 CSS 학습 모듈(스타일링 기초 · 레이아웃)과 CSS 모듈 가이드를 따라 열네 장으로 세운다.
 *
 * MDN 은 CSS 를 69 개 모듈로 나눠 적지만, 매일 부딪히는 것은 캐스케이드 · 박스 · 레이아웃 · 쿼리 · 변수 ·
 * 움직임 · 글꼴 · 범위 열네 갈래다. 장마다 그 모듈의 규칙을 적고, Chrome 156 에서 getComputedStyle 과
 * getBoundingClientRect 로 실제 값을 재어 '실제로 돌려 보면' 에 붙였다. 측정은 scratchpad/css-demo 의
 * probe1.html · probe2.html(ego-browser) 이고, 숫자는 그 결과 그대로다. 출처는 developer.mozilla.org 의
 * Web/CSS/Guides 와 Learn_web_development/Core 이다.
 */

const MDN = "https://developer.mozilla.org/en-US/docs/Web/CSS";
const LEARN = "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core";

export const cssTheories: Theory[] = [
  {
    id: "css",
    name: "CSS",
    tagline: "선언은 많고, 이기는 선언은 하나다",
    intro:
      "CSS는 '이 요소는 이렇게 보인다'는 선언을 쌓는 언어입니다. 어려운 것은 문법이 아닙니다. '어느 선언이 이기는가'(캐스케이드)와 '그 값이 어떤 상자를 어디에 놓는가'(박스와 레이아웃)입니다. 이 허브는 MDN의 학습 순서를 따라 열네 장으로 나눕니다. 문법과 선택자, 캐스케이드와 상속, 박스 모델, 값과 단위, 디스플레이와 흐름, 플렉스박스, 그리드, 위치 지정과 쌓임, 오버플로와 크기, 반응형 쿼리, 커스텀 속성, 트랜지션·애니메이션·트랜스폼, 글꼴과 텍스트, 중첩·레이어·스코프입니다. 장마다 Chrome 156에서 실제로 잰 값을 붙였습니다.",
    blocks: [
      {
        label: "열네 장을 나눈 기준",
        body: "앞의 넷(문법, 캐스케이드, 박스, 값)은 '한 선언이 어떻게 값이 되는가'입니다. 가운데 다섯(디스플레이, 플렉스, 그리드, 위치, 오버플로)은 '그 값이 상자를 어디에 놓는가'입니다. 뒤의 다섯(쿼리, 변수, 움직임, 글꼴, 범위)은 '조건과 시간과 범위에 따라 어떻게 달라지는가'입니다. MDN에서는 스타일링 기초 모듈이 앞의 넷과 오버플로를, 레이아웃 모듈이 가운데를, 모듈별 가이드가 뒤를 다룹니다.",
        code: "값이 되는 과정          상자를 놓는 과정            조건 · 시간 · 범위\n─────────────────────  ─────────────────────────  ──────────────────────────\n1 문법과 선택자          5 디스플레이와 흐름          10 반응형 — 미디어·컨테이너 쿼리\n2 캐스케이드와 상속      6 플렉스박스                 11 커스텀 속성과 함수\n3 박스 모델              7 그리드                     12 트랜지션 · 애니메이션 · 트랜스폼\n4 값과 단위              8 위치 지정과 쌓임 맥락       13 글꼴과 텍스트\n                        9 오버플로와 크기             14 중첩 · 레이어 · 스코프",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 이 허브가 재는 방법",
        body: "모든 '실제로 돌려 보면'은 같은 방법입니다. 고정 폭(800px) 컨테이너에 작은 요소를 둡니다. `getComputedStyle(el).getPropertyValue(prop)`로 계산값을 읽고, `getBoundingClientRect()`로 렌더된 크기와 위치를 읽습니다. 색은 `rgb(255, 0, 0)`처럼 계산값으로 비교합니다. 그렇게 '어느 선언이 이겼는가'를 봅니다. 뷰포트는 1728×973이고, 브라우저는 Chrome 156.0.0.0입니다. `CSS.supports()`로 지원 현황도 보았습니다. :has · @layer · @starting-style · anchor-name · startViewTransition · animation-timeline: scroll() · text-wrap: balance · color-mix · 중첩 · subgrid · light-dark · field-sizing은 전부 true였습니다.",
        code: "const cs = (id, p) => getComputedStyle(document.getElementById(id)).getPropertyValue(p);\nconst r  = (id) => document.getElementById(id).getBoundingClientRect();\n\ncs(\"spec-id\", \"color\")   // \"rgb(255, 0, 0)\"  ← 어느 선언이 이겼나\nr(\"box-cb\").width         // 230               ← 실제 렌더 폭\n\n// Chrome 156 — CSS.supports()\n{ has: true, layer: true, starting_style: true, anchor: true, view_transitions: true,\n  scroll_timeline: true, text_wrap_balance: true, color_mix: true, nesting: true,\n  subgrid: true, light_dark: true, field_sizing: true }",
      },
      {
        label: "문제의 구조: 선언 → 캐스케이드 값 → 계산값 → 사용값 → 실제값",
        body: "CSS가 한 속성의 값을 정하는 과정은 다섯 단계입니다.\n(1) 선언값은 적용되는 모든 선언입니다.\n(2) 캐스케이드 값은 그중 이긴 하나입니다. 없으면 상속이나 초깃값이 됩니다(2장).\n(3) 계산값은 상대 단위를 되도록 절대 단위로 바꾼 값입니다(em → px, 4장).\n(4) 사용값은 레이아웃이 끝나야 아는 값입니다(width: auto → 실제 px, 5~9장).\n(5) 실제값은 장치 제약에 맞춰 조정한 값입니다.\n`getComputedStyle`이 돌려주는 것은 속성에 따라 계산값이거나 사용값입니다. width는 레이아웃 뒤의 px를, color는 rgb()를 돌려줍니다. 이 허브의 측정은 모두 이 단계 중 하나를 읽습니다. '왜 이 값이 나왔나'는 어느 단계에서 정해졌는지로 답할 수 있습니다.",
        code: "선언값들 ──캐스케이드──► 캐스케이드 값 ──(없으면 상속/초깃값)──► 지정값\n   ──상대→절대──► 계산값 (em→px, 색→rgb)  ──레이아웃──► 사용값 (auto→px)  ──장치──► 실제값\n\ngetComputedStyle: color → 계산값 rgb(…)   width → 사용값 230px   font-size → 계산값 20px",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "문법과 선택자부터 차례로 읽습니다. 뒤 장은 앞 장의 낱말(특이성, 계산값, BFC, 포함 블록)을 그대로 쓰므로 건너뛰면 읽히지 않습니다. '스타일 계산 → 레이아웃 → 페인트' 파이프라인은 렌더링 허브가 다룹니다. 이 허브는 그 파이프라인에 들어가는 '규칙' 쪽입니다.",
      },
    ],
    sources: [
      { label: "MDN — CSS", href: MDN },
      { label: "MDN — CSS styling basics", href: `${LEARN}/Styling_basics` },
      { label: "MDN — CSS layout", href: `${LEARN}/CSS_layout` },
    ],
  },

  {
    id: "css-s1",
    name: "1장 · 문법과 선택자",
    tagline: "규칙은 선택자와 선언 블록이고, 선택자는 트리에서 요소를 고르는 식이다",
    intro:
      "CSS 규칙 하나는 선택자와 `{ 속성: 값; }` 선언 블록입니다. 선택자는 '어느 요소에 적용하나'를 트리 위에서 고르는 식이고, MDN은 '60 개 넘는 선택자와 다섯 결합자'라고 적습니다. 종류(type)·클래스·ID·속성·전체(*) 선택자, 결합자(공백 · > · + · ~), 가상 클래스(:hover · :has())와 가상 요소(::before), 그리고 선택자 목록과 `:is()`·`:where()`가 있습니다. 2장의 특이성은 이 선택자의 모양에서 계산됩니다.",
    blocks: [
      {
        label: "기본 선택자 다섯과 복합 선택자",
        body: "기본 선택자는 `div`(종류), `.card`(클래스), `#main`(ID), `[type=\"text\"]`(속성), `*`(전체)입니다. 한 요소에 조건을 겹쳐 적으면 복합 선택자(`a.card[href]`)입니다. 이때 종류나 전체 선택자가 맨 앞에 와야 합니다. 속성 선택자는 `[attr]`(존재), `=`(일치), `~=`(공백 목록 중 하나), `|=`(접두 또는 `-`로 이어진 값), `^=` `$=` `*=`(시작, 끝, 포함)로 씁니다. HTML의 열거형 속성(type 등)은 대소문자를 가리지 않습니다. 하지만 class, id, data-*는 가립니다. 이 동작은 `i` 플래그로 바꿀 수 있습니다.",
        code: "/* 기본 */\ndiv { }  .card { }  #main { }  [type=\"text\"] { }  * { }\n\n/* 복합 — 종류는 맨 앞 */\na.card[href^=\"https\"] { }\n\n/* 속성 선택자 */\n[lang|=\"ko\"]      /* ko, ko-KR */\n[class~=\"active\"] /* 공백 목록 중 하나 */\n[href$=\".pdf\" i]  /* 대소문자 무시 */",
      },
      {
        label: "결합자: 트리 위의 관계",
        body: "공백은 자손을 고릅니다(`article p`, 안쪽 어디든). `>`는 자식(바로 아래), `+`는 다음 형제(바로 뒤 하나), `~`는 뒤따르는 형제(뒤의 어느 것이든)를 고릅니다. 결합자는 특이성에 무게를 더하지 않습니다(2장). 가상 클래스는 트리에 없는 '상태'를 고릅니다(`:hover` `:focus-visible` `:nth-child(2n)` `:target` `:checked`). 가상 요소는 HTML에 없는 '부분'을 고릅니다(`::before` `::after` `::marker` `::first-line` `::placeholder`). 콜론이 하나인지 둘인지가 이 차이를 나타냅니다.",
        code: "article p { }     /* 자손 */\nul > li { }       /* 자식 */\nh2 + p { }        /* 바로 다음 형제 */\nh2 ~ p { }        /* 뒤따르는 형제 전부 */\n\n/* 가상 클래스(상태) : 하나  ·  가상 요소(부분) :: 둘 */\nli:nth-child(2n) { }   a:focus-visible { }   p::first-line { }   li::marker { }",
      },
      {
        label: "실제로 돌려 보면: :has(), :is(), :where()와 중첩",
        body: "`:has()`는 '이 조건의 자손·형제를 가진 요소'를 고르는 관계 선택자입니다. 자식으로 부모를 고르는 유일한 길입니다. Chrome 156에서 `CSS.supports(\"selector(:has(a))\")`가 true였습니다. `:is()`와 `:where()`는 선택자 목록을 하나로 묶어 반복을 줄입니다. 다만 특이성이 다릅니다. `:is()`는 인자 중 가장 특이한 것의 무게를 따르고, `:where()`는 0입니다. 실제로 `:where(#spec-where) .sw` 뒤에 적은 `.sw`가 이겼습니다(둘 다 0-1-0이라 뒤의 것). `:is(.x, #spec-is) .si`는 ID 무게(1-1-0)를 받아 `.si.si2`(0-2-0)를 이겼습니다. 중첩(`.a { .b { } }`)도 지원합니다(`selector(&)` true). `&`로 부모 자리를 정합니다(14장).",
        code: "/* probe1.html */\n:where(#spec-where) .sw { color: blue; }   /* 0-1-0 — :where 는 0 */\n.sw { color: red; }                        /* 0-1-0, 뒤 → 이김 */\n→ cs(\"sw\", \"color\") = \"rgb(255, 0, 0)\"\n\n:is(.x, #spec-is) .si { color: blue; }     /* 1-1-0 — 가장 특이한 인자 */\n.si.si2 { color: red; }                    /* 0-2-0 */\n→ cs(\"si\", \"color\") = \"rgb(0, 0, 255)\"\n\n/* 부모를 자식으로 고르기 */\n.card:has(img) { display: grid; }\nlabel:has(+ input:invalid) { color: red; }",
      },
      {
        label: "문제가 나는 경우: 선택자가 '안 맞는' 이유",
        body: "선택자가 요소를 못 고르거나 뜻밖의 것을 고를 때의 표입니다.",
        code: "증상                                     원인                                  확인\n──────────────────────────────────────  ─────────────────────────────────────  ───────────────────────────\n.a .b 가 형제 .b 에도 맞는다              공백은 '자손' — 형제가 아니라 안쪽        > 또는 + 로 바꾸기\nh2 + p 가 둘째 p 에 안 맞는다             + 는 바로 다음 하나                      ~ 로\n[type=Text] 가 맞는데 [data-k=Text] 는 안 맞음 열거형 속성은 대소문자 무시, data-* 는 구분  i 플래그\n:hover 가 터치에서 걸려 있다               터치 뒤 hover 상태 유지                  @media (hover: hover) 안으로\n::before 가 안 보인다                     content 가 없으면 생성 안 됨              content: \"\" 추가\n부모를 자식 조건으로 못 고른다             CSS 는 아래로만 — :has() 전까지          .parent:has(.child)\n입력창에 ::before 가 안 된다               대체 요소(input·img)엔 가상 요소 없음     래퍼 요소에",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 선택자는 '매칭'이고 겹침은 정상이다",
        body: "선택자는 요소를 '소유'하지 않습니다. 한 요소에 규칙 열 개가 동시에 맞을 수 있고, 규칙마다 자기 선언을 후보로 내놓습니다. 후보 중 하나를 고르는 것이 다음 장의 캐스케이드입니다. 선택자의 모양(ID 몇 개, 클래스 몇 개)은 그 선택의 재료인 특이성이 됩니다. 그래서 '선택자를 더 길게 써서 이기기'는 캐스케이드 싸움을 선택자로 하는 셈입니다. MDN은 그 대신 레이어(14장)를 권합니다.",
        code: "요소 <a class=\"card\" id=\"x\" href=…>\n\n맞는 규칙들 (전부 후보)         특이성\n  a            { color: … }     0-0-1\n  .card        { color: … }     0-1-0\n  #x           { color: … }     1-0-0\n  a[href]      { color: … }     0-1-1\n  :where(#x) a { color: … }     0-0-1\n           ↓ 캐스케이드(2장)가 하나를 고른다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "같은 요소에 맞은 후보 중 무엇이 이기는지는 2장입니다. 출처, 중요도, 레이어, 특이성, 순서로 정합니다. 특이성 계산의 정확한 규칙(ID 1-0-0, :is는 가장 특이한 인자, :where는 0)도 거기서 숫자로 나옵니다.",
      },
      {
        label: "확인 질문",
        body: "1) `article p`와 `article > p`의 차이는?\n2) `:is(.a, #b) .c`와 `:where(.a, #b) .c`의 특이성은 각각?\n3) 자식의 상태로 부모를 고르는 선택자는?\n4) `[type=TEXT]`는 맞는데 `[data-kind=TEXT]`는 안 맞는 이유는?",
      },
    ],
    sources: [
      { label: "MDN — CSS selectors", href: `${MDN}/Guides/Selectors` },
      { label: "MDN — Selectors and combinators", href: `${MDN}/Guides/Selectors/Selectors_and_combinators` },
      { label: "MDN — Basic selectors (Learn)", href: `${LEARN}/Styling_basics/Basic_selectors` },
    ],
  },

  {
    id: "css-s2",
    name: "2장 · 캐스케이드와 상속",
    tagline: "출처, 중요도, 레이어, 특이성, 순서의 차례로 하나를 고른다",
    intro:
      "같은 요소의 같은 속성에 선언이 여럿 맞으면 캐스케이드가 하나를 고릅니다. MDN이 적은 알고리즘 순서는 관련성 → 출처와 중요도 → 특이성 → 스코프 근접성 → 등장 순서입니다. 특이성보다 먼저, 레이어(@layer)가 출처 안의 순서를 정합니다. 맞는 선언이 하나도 없으면 상속되는 속성은 부모의 계산값을, 아닌 속성은 초깃값을 받습니다. inherit, initial, unset, revert, revert-layer 다섯 키워드로 이 값을 직접 정합니다.",
    blocks: [
      {
        label: "완전한 순서: 출처와 중요도가 먼저다",
        body: "MDN에는 '완전한 캐스케이드 순서' 표가 있습니다(낮은 것 → 높은 것).\n(1) 사용자 에이전트 normal입니다. 레이어(첫→끝), 비레이어 순입니다.\n(2) 사용자 normal입니다.\n(3) 작성자 normal입니다. 레이어(첫→끝), 비레이어, 인라인 style 순입니다.\n(4) @keyframes 애니메이션입니다.\n(5) 작성자 !important입니다. 비레이어, 레이어(끝→첫), 인라인 !important 순입니다.\n(6) 사용자 !important입니다.\n(7) UA !important입니다.\n(8) 트랜지션이 가장 높습니다.\n핵심은 둘입니다. 하나는 '!important는 레이어의 우선순위를 뒤집는다'는 것입니다. 다른 하나는 특이성이 '출처와 중요도를 정한 뒤에야' 비교된다는 것입니다. 그래서 MDN은 `!important`로 특이성을 이기려는 것을 '나쁜 관행'이라 하고, 레이어를 쓰라고 적습니다.",
        code: "낮음 ─────────────────────────────────────────────────────────► 높음\nUA normal │ user normal │ author normal (layer 첫→끝 · 비레이어 · inline) │ animations │\nauthor !important (비레이어 · layer 끝→첫 · inline !important) │ user !important │ UA !important │ transitions\n\n같은 칸 안에서만: 특이성 → 스코프 근접성 → 등장 순서",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 레이어가 특이성을 이긴다",
        body: "`@layer base, theme;`로 순서를 정했습니다. base에는 `#lay-id.lay`(1-1-0, 빨강)를, theme에는 `.lay`(0-1-0, 파랑)를 두었습니다. 결과는 파랑이었습니다. 뒤 레이어가 이기고, 특이성은 보지 않습니다. 레이어 밖의 `.lay-unlayered-target.lay`(초록)는 레이어 안의 어떤 선언보다 셉니다. '레이어 밖 스타일은 항상 레이어 안을 덮는다'는 말 그대로입니다. `!important`를 붙이면 이 순서가 뒤집힙니다. theme(뒤)의 `!important` 파랑과 base(앞)의 `!important` 빨강 중 base가 이겨 빨강이 됩니다. 특이성에서는 ID 하나가 클래스와 속성 여럿을 이깁니다. `#spec-id`(1-0-0) 대 `.a .b .c .d .e [data-x]`(0-6-0)의 결과는 빨강입니다. 자릿수를 합쳐 보지 않고 왼쪽 열부터 비교하기 때문입니다.",
        code: "@layer base, theme;\n@layer theme { .lay { color: blue; } }           /* 0-1-0, 뒤 레이어 */\n@layer base  { #lay-id.lay { color: red; } }     /* 1-1-0, 앞 레이어 */\n→ cs(\"lay-id\", \"color\") = \"rgb(0, 0, 255)\"       /* 레이어 순서 > 특이성 */\n\n.lay-unlayered-target.lay { color: green; }      /* 비레이어 */\n→ \"rgb(0, 128, 0)\"                                /* 비레이어 > 레이어 */\n\n@layer theme { .imp { color: blue !important; } }\n@layer base  { .imp { color: red !important; } }\n→ \"rgb(255, 0, 0)\"                                /* !important 는 앞 레이어가 이김 */\n\n#spec-id { color: red; }                         /* 1-0-0 */\n.a .b .c .d .e [data-x=\"1\"] { color: blue; }     /* 0-6-0 */\n→ \"rgb(255, 0, 0)\"                                /* ID 열이 먼저 */",
        terms: [
          {
            term: "특이성 (specificity)",
            body: "ID, 클래스, 종류 세 열로 매기는 무게입니다. ID는 1-0-0, 클래스와 속성과 가상 클래스는 0-1-0, 종류와 가상 요소는 0-0-1입니다. `*`, `:where()`, 결합자는 0입니다. `:is()`, `:not()`, `:has()`는 가장 특이한 인자를 따릅니다. 인라인 style은 1-0-0-0처럼 모든 선택자를 이기고, 그 위에는 `!important`만 있습니다. 출처, 레이어, 중요도가 같을 때만 비교합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 상속되는 것과 안 되는 것, 다섯 키워드",
        body: "부모에 `color: green; border: 2px solid; font-size: 20px`를 두었습니다. 자식의 color는 green, font-size는 20px로 상속됐습니다. border-top-width는 상속되지 않아 0px였습니다(border-style의 초깃값이 none). `border: inherit`을 적으면 자식도 2px가 됩니다. `unset`은 상속 속성에서는 inherit처럼(color → green), 비상속 속성에서는 initial처럼(border → 0px) 동작했습니다. MDN은 키워드를 이렇게 정의합니다.\ninherit는 부모의 계산값입니다. 포함 블록이 아니라 문서 트리의 부모입니다.\ninitial은 속성의 초깃값입니다.\nunset은 상속 속성이면 inherit, 아니면 initial입니다.\nrevert는 현재 출처(작성자)의 선언이 없는 것처럼 UA 스타일로 되돌립니다.\nrevert-layer는 이전 레이어의 값으로 되돌립니다.\n`all` 속성은 모든 속성에 한 키워드를 한꺼번에 적용합니다.",
        code: ".inh { color: green; border: 2px solid green; font-size: 20px; }\n.inh-child  { }                     → color green · font-size 20px · border-top-width 0px\n.inh-child2 { border: inherit; }    → border-top-width 2px\n.inh-unset  { color: unset; border: unset; } → color green(상속처럼) · border 0px(초깃값처럼)\n\n키워드          뜻\n─────────────  ─────────────────────────────────────────\ninherit        부모의 계산값\ninitial        속성 초깃값 (상속 속성에 쓰면 뜻밖일 수 있음)\nunset          상속 속성은 inherit, 아니면 initial\nrevert         이 출처(작성자)가 없었던 것처럼 → UA 값\nrevert-layer   이전 레이어의 값\nall: revert    모든 속성에 한 번에",
      },
      {
        label: "문제가 나는 경우: '왜 안 먹지'의 진단 순서",
        body: "선언이 적용되지 않을 때 보는 순서입니다. DevTools의 Styles 패널은 이긴 선언을 위에, 진 선언을 취소선으로 보여 줍니다.",
        code: "확인 순서                                   흔한 답\n─────────────────────────────────────────  ─────────────────────────────────────────────\n① 선택자가 맞긴 하나 (Elements 에 보이나)     오타 · 공백/> 혼동 · 가상 요소에 content 없음\n② 다른 선언이 이기나 (취소선인가)             더 특이한 선택자 · 뒤의 같은 특이성 · 인라인 style\n③ 레이어 안인가                              비레이어가 레이어를 덮음 · 라이브러리가 레이어를 씀\n④ !important 인가                           레이어 순서가 뒤집힘 · 인라인 !important\n⑤ 상속 때문인가                              부모에 적용됐는데 자식이 덮음 / 비상속 속성\n⑥ 값이 유효한가                              잘못된 값은 선언 전체가 무시 (var() 는 11장 — 다르다)\n⑦ 애니메이션·트랜지션 중인가                  animations 는 normal 보다 위, transitions 는 전부 위",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 캐스케이드는 '싸움'이 아니라 '정렬'이다",
        body: "캐스케이드는 후보 선언을 (출처와 중요도) → (레이어) → (특이성) → (근접성) → (순서)라는 키로 정렬해 맨 위를 고릅니다. 앞 키가 다르면 뒤 키는 보지 않습니다. 그래서 레이어가 다르면 특이성은 소용이 없고, `!important`가 붙으면 레이어 순서가 뒤집힙니다. 그러니 '이기기 위한 도구'도 층마다 다릅니다. 같은 레이어 안에서는 특이성(또는 순서), 라이브러리와 내 스타일 사이에는 레이어, 프레임워크의 인라인 style을 넘을 때만 `!important`(마지막 수단)입니다. 선언이 없는 자리는 상속이나 초깃값이 메우므로, '적용 안 됨'과 '상속으로 받음'을 구분해야 합니다.",
      },
      {
        label: "다음 입구",
        body: "이긴 선언의 값이 상자의 어디에 쓰이는지는 3장 박스 모델에서 봅니다. 레이어를 설계 도구로 쓰는 법과 스코프 근접성은 14장에서 다시 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) `@layer a, b;`에서 a의 `#id` 선언과 b의 `.cls` 선언이 같은 속성을 두고 다투면 누가 이기나요?\n2) `!important`가 레이어 순서에 미치는 영향은?\n3) `border`가 자식에 상속되지 않는 이유와 상속시키는 키워드는?\n4) 특이성 1-0-0과 0-9-0 중 이기는 쪽과 그 이유는?",
      },
    ],
    sources: [
      { label: "MDN — Introducing the CSS cascade", href: `${MDN}/Guides/Cascade/Introduction` },
      { label: "MDN — Specificity", href: `${MDN}/Guides/Cascade/Specificity` },
      { label: "MDN — Inheritance", href: `${MDN}/Guides/Cascade/Inheritance` },
      { label: "MDN — Handling conflicts (Learn)", href: `${LEARN}/Styling_basics/Handling_conflicts` },
    ],
  },

  {
    id: "css-s3",
    name: "3장 · 박스 모델",
    tagline: "콘텐츠, 패딩, 테두리, 마진 네 겹과 세로 마진이 합쳐지는 규칙",
    intro:
      "모든 요소는 상자이고, 상자에는 콘텐츠, 패딩, 테두리, 마진 네 영역이 있습니다. `width`가 어느 영역까지인지 정하는 `box-sizing`(content-box 기본, border-box), 블록 상자와 인라인 상자의 차이, 세로 마진이 겹치면 큰 쪽만 남는 마진 병합을 차례로 봅니다. 레이아웃 버그의 절반이 이 장의 두 규칙인 box-sizing과 마진 병합에서 납니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: content-box 230px, border-box 200px",
        body: "`width: 200px; padding: 10px; border: 5px solid`인 상자를 두 가지 box-sizing으로 쟀습니다. content-box는 렌더 폭이 230px(200 + 20 + 10)였고, border-box는 200px였습니다. 그런데 둘 다 `getComputedStyle().width`는 \"200px\"로 같습니다. width는 '지정한 값'이고, 어느 영역에 적용되는지만 다르기 때문입니다. MDN의 예와 같은 결과입니다(350px + 10px 테두리 → 370px vs 350px). 초깃값은 content-box이고 상속되지 않습니다. 하지만 브라우저는 table · select · button · 일부 input에 border-box를 기본으로 둡니다. MDN은 노트에 '요소를 배치할 때 box-sizing을 border-box로 두는 것이 종종 유용하다'고 적습니다. 거의 모든 리셋이 `*, *::before, *::after { box-sizing: border-box }`로 시작하는 이유입니다.",
        code: ".box { width: 200px; padding: 10px; border: 5px solid; }\n.bb  { box-sizing: border-box; }\n\nr(\"box-cb\").width   // 230   = 200 + 10·2 + 5·2  (content-box)\nr(\"box-bb\").width   // 200   (border-box — 콘텐츠는 170)\ncs(\"box-cb\", \"width\") // \"200px\"  ← 둘 다 지정값 그대로\ncs(\"box-bb\", \"width\") // \"200px\"\n\n/* 사실상 표준 리셋 */\n*, *::before, *::after { box-sizing: border-box; }",
        terms: [
          {
            term: "box-sizing",
            body: "width와 height가 가리키는 영역입니다. content-box(기본)는 콘텐츠만이라 패딩과 테두리가 바깥에 더해지고, border-box는 테두리까지라 패딩과 테두리가 안쪽을 깎습니다. 마진은 어느 쪽에도 안 들어갑니다. 콘텐츠 상자는 0 아래로 줄지 않습니다.",
          },
        ],
      },
      {
        label: "블록 상자와 인라인 상자",
        body: "블록 상자는 줄을 바꾸고, 기본으로 인라인 방향을 다 채웁니다. width, height, 세로 패딩과 마진이 모두 먹습니다. 인라인 상자(span, a, em)는 줄 안에 흐르고 width와 height가 무시됩니다. 세로 패딩과 테두리는 그려지지만 줄 높이에 영향이 없어 겹치고, 세로 마진은 무시됩니다. 줄 상자(line box)의 높이는 그 줄에서 가장 큰 상자가 정합니다. `inline-block`은 줄 안에 흐르면서 블록처럼 크기를 가집니다. MDN의 다중 키워드 문법으로는 `inline flow-root`입니다(5장). 실제로 `display: inline flow-root`의 계산값이 \"inline-block\"으로 나왔습니다.",
        code: "                 줄 바꿈   width/height   세로 padding/border   세로 margin\n블록 (div, p)      O         적용            적용                  적용\n인라인 (span, a)   X         무시            그려지되 줄에 영향 X    무시\ninline-block       X         적용            적용                  적용\n\ncs(\"d-ifr\", \"display\")  // \"inline-block\"  ← inline flow-root 의 계산값",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 마진 병합, 30과 20이 만나면 30",
        body: "`p { margin: 30px 0 20px }` 두 개를 세웠습니다. 사이 간격은 50이 아니라 30이었습니다. 인접 형제의 세로 마진은 큰 쪽 하나만 남습니다. 이 병합은 부모와 첫 자식 사이에서도 일어납니다. 부모에 테두리, 패딩, 인라인 콘텐츠가 없으면 부모의 top과 첫 자식의 margin-top이 합쳐집니다. 그래서 자식 마진이 부모 '밖'으로 샙니다. 실제로 부모의 top과 첫 p의 top이 같았습니다(true). 막는 방법은 둘입니다. 부모에 1px 패딩을 주거나(실제로 간격 31), 새 BFC를 만듭니다(`display: flow-root`, 간격 30이 부모 안에 남음). 플렉스나 그리드 컨테이너 안에서는 병합하지 않습니다(실제로 flex column의 두 p 사이가 50). 가로 마진, float, absolute도 병합하지 않습니다. 음수 마진은 '가장 큰 양수 + 가장 작은 음수'로 계산합니다.",
        code: ".mc-parent p { margin: 30px 0 20px; }\n\n인접 형제:          p[1].top − p[0].bottom = 30     (50 아님 — 큰 쪽만)\n부모–첫 자식:        parent.top === p[0].top → true  (자식 마진이 부모 밖으로)\n부모 flow-root:      p.top − parent.top = 30         (BFC 가 막음)\n부모 padding 1px:    p.top − parent.top = 31         (패딩이 막음)\n부모 flex column:    p[1].top − p[0].bottom = 50     (플렉스 안엔 병합 없음)\n\n규칙: 세로만 · 양수는 큰 것 · 음수는 큰 양수 + 작은 음수 · float/absolute/flex/grid 는 없음",
        terms: [
          {
            term: "마진 병합 (margin collapsing)",
            body: "인접한 세로 마진 둘이 하나로 합쳐지는 규칙입니다. 형제 사이, 빈 블록의 위아래, 그리고 테두리, 패딩, 콘텐츠, 높이로 갈라지지 않은 부모와 첫·마지막 자식 사이에서 일어납니다. 새 BFC(5장)를 만드는 요소는 자식 마진이 밖으로 새지 않습니다. 0 마진도 병합합니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우: 폭이 안 맞고, 간격이 다르다",
        body: "박스 모델에서 매일 보는 둘입니다.",
        code: "증상                                    원인                          처방\n─────────────────────────────────────  ───────────────────────────  ─────────────────────────────\nwidth: 100% + padding 이 부모를 넘친다   content-box 라 패딩이 바깥으로    box-sizing: border-box\n두 블록 사이 간격이 margin 합과 다르다    세로 마진 병합 (큰 쪽만)           한쪽에만 주기 · gap(flex/grid)\n첫 자식 margin-top 이 부모 밖으로 샌다    부모–자식 병합                    부모 padding/border · display: flow-root\nspan 에 margin-top 이 안 먹는다           인라인은 세로 마진 무시            inline-block 또는 block\nspan 의 padding 이 윗줄과 겹친다          인라인 세로 패딩은 줄 높이에 안 들어감  inline-block · line-height\nbackground 가 border 밑까지 깔린다        기본 background-clip: border-box   background-clip: padding-box",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 네 겹은 '자기 상자'이고 마진은 '이웃과의 거리'다",
        body: "콘텐츠, 패딩, 테두리는 그 상자 자신의 것이라 배경이 깔리고 클릭이 닿습니다. 마진은 상자 밖의 빈 거리라 배경이 없고 이웃과 '공유'됩니다. 그래서 병합 규칙은 마진에만 있습니다. box-sizing은 '내 상자의 크기를 어느 겹까지로 셀까'이고, 마진 병합은 '이웃과의 거리를 어떻게 합칠까'입니다. 둘을 나눠 보면 '폭이 안 맞음'은 앞, '간격이 안 맞음'은 뒤로 바로 갈립니다.",
        code: "┌─ margin (바깥 · 배경 없음 · 이웃과 병합) ──────────┐\n│ ┌─ border ──────────────────────────────────────┐ │\n│ │ ┌─ padding ─────────────────────────────────┐ │ │\n│ │ │  content  ← content-box 의 width           │ │ │\n│ │ └───────────────────────────────────────────┘ │ │\n│ └───────────────────────────────────────────────┘ │  ← border-box 의 width\n└───────────────────────────────────────────────────┘",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "`width: 200px`의 200이 px가 되는 과정(em, rem, %, vw, calc)은 4장 값과 단위입니다. 블록, 인라인, flow-root가 display의 어떤 값인지와 BFC의 정확한 정의는 5장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `width: 200px; padding: 10px; border: 5px` 상자의 렌더 폭은 content-box와 border-box에서 각각?\n2) margin-bottom 20px과 margin-top 30px인 형제 사이 간격은?\n3) 부모 밖으로 새는 첫 자식의 margin-top을 막는 두 방법은?\n4) span에 margin-top이 안 먹는 이유는?",
      },
    ],
    sources: [
      { label: "MDN — Introduction to the CSS box model", href: `${MDN}/Guides/Box_model/Introduction` },
      { label: "MDN — Mastering margin collapsing", href: `${MDN}/Guides/Box_model/Margin_collapsing` },
      { label: "MDN — box-sizing", href: `${MDN}/Reference/Properties/box-sizing` },
      { label: "MDN — The box model (Learn)", href: `${LEARN}/Styling_basics/Box_model` },
    ],
  },

  {
    id: "css-s4",
    name: "4장 · 값과 단위",
    tagline: "px, em, rem, %, vw는 각각 무엇을 기준으로 하나",
    intro:
      "속성 값에는 길이, 퍼센트, 숫자, 색, 함수가 옵니다. 길이는 절대와 상대로 나뉩니다. 절대는 px(= 1/96in)입니다. 상대는 em(요소의 글자 크기), rem(루트의 글자 크기), vw(뷰포트의 1%), cqi(컨테이너의 1%)입니다. 퍼센트의 기준은 속성마다 다릅니다. width와 padding-top은 포함 블록의 폭, height는 높이, font-size는 부모 글자 크기입니다. calc(), min(), max(), clamp()가 그 사이를 계산합니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 같은 2가 40px, 32px, 172.8px가 된다",
        body: "글자 크기가 20px인 요소 안에서 쟀습니다. `width: 2em`은 40px였습니다. `2rem`은 루트 16px 기준이라 32px, `10vw`는 뷰포트 1728px의 10%라 172.797px였습니다. `width: 50%`는 부모 폭 400의 200px, `height: 50%`는 부모 높이 100의 50px였습니다. `padding-top: 10%`는 높이가 아니라 '폭'의 10%라서 40px였습니다. 세로 패딩과 마진의 퍼센트가 폭 기준이라서 padding-top으로 가로세로 비율을 맞추는 트릭이 됩니다. `calc(100px + 2em)`은 140px였습니다. `clamp(100px, 10vw, 150px)`는 172.8이 상한에 걸려 150px가 되었습니다.",
        code: "html { font-size: 16px; }  .u { font-size: 20px; width: 400px; height: 100px; }\n\n.u-em    { width: 2em; }                      → \"40px\"      (요소 글자 20 × 2)\n.u-rem   { width: 2rem; }                     → \"32px\"      (루트 16 × 2)\n.u-vw    { width: 10vw; }                     → \"172.797px\" (1728 × 10%)\n.u-pct   { width: 50%; height: 50%; }         → \"200px\" / \"50px\"\n.u-pct-pad { padding-top: 10%; }              → \"40px\"      (높이 아닌 '폭' 400 의 10%)\n.u-calc  { width: calc(100px + 2em); }        → \"140px\"\n.u-clamp { width: clamp(100px, 10vw, 150px); } → \"150px\"    (상한)",
      },
      {
        label: "단위표: 기준은 무엇인가",
        body: "MDN의 숫자 데이터 타입 페이지를 표로 옮깁니다. 핵심은 '기준이 무엇인가' 한 열입니다.",
        code: "단위        기준                                   비고\n─────────  ────────────────────────────────────  ───────────────────────────────\npx         1/96 in (절대)                          1in = 96px · 1pt = 1/72in\nem         이 요소의 font-size                     font-size 자체에 쓰면 부모의 font-size — 중첩되면 곱해짐\nrem        루트(html)의 font-size                  기본 16px · 사용자 설정 따라감\nch · ex · lh  '0' 의 전진폭 · x 높이 · 줄 높이\nvw · vh    뷰포트 폭·높이의 1%                     모바일 주소창 때문에 svh(작은) · lvh(큰) · dvh(동적)\nvmin · vmax 작은 쪽 · 큰 쪽\ncqw · cqi · cqb  컨테이너 쿼리 컨테이너의 1%  컨테이너 없으면 작은 뷰포트 단위로 (10장)\n%  속성마다 다름: width·padding·margin → 포함 블록 폭 / height → 높이 / font-size → 부모 글자 / line-height →\n   자기 font-size\nfr  그리드의 남는 공간 비율 (7장)\n0  길이는 단위 생략 가능 · 시간(s/ms)·각도는 0 도 단위 필요\n1 cm  공백 있으면 무효 — \"1cm\"",
        codeLang: "text",
        terms: [
          {
            term: "계산값 (computed value)",
            body: "상대 단위를 바꿀 수 있는 만큼 절대 단위로 바꾼 값입니다. em, rem, vw는 계산값에서 px가 됩니다. %는 대개 레이아웃이 끝나야 알 수 있어서 사용값(used value)에서 px가 됩니다. `getComputedStyle`은 width처럼 레이아웃에 기대는 속성이면 사용값을 돌려줍니다. 그래서 위 측정값이 모두 px입니다.",
          },
        ],
      },
      {
        label: "함수: calc, min, max, clamp",
        body: "`calc()`은 단위를 섞어 계산합니다(`100% - 2rem`). 연산자 `+ -` 양옆에는 공백이 있어야 합니다. `min(a, b)`는 작은 쪽, `max(a, b)`는 큰 쪽입니다. `clamp(min, 선호, max)`는 선호값을 두 경계 안에 가둡니다. `max(min, min(선호, max))`와 같습니다. clamp는 '뷰포트에 따라 자라되 한계가 있는' 값에 씁니다. 반응형 글자 크기 `font-size: clamp(1rem, 0.5rem + 1vw, 2rem)`가 그 예이고, 미디어 쿼리 없는 유동 타이포그래피의 재료입니다. 실제로 선호값 10vw(172.8px)가 max 150px에 걸려 150px가 되었습니다.",
        code: ".sidebar { width: calc(100% - 2rem); }        /* 단위 섞기 — + - 양옆 공백 */\n.card    { width: min(90%, 60ch); }           /* 작은 쪽 */\nh1       { font-size: clamp(1.5rem, 1rem + 2vw, 3rem); }   /* 유동 + 경계 */\n/* clamp(a, b, c) === max(a, min(b, c)) */",
      },
      {
        label: "문제가 나는 경우: 단위를 섞을 때",
        body: "기준을 잘못 짚어 나는 일들입니다.",
        code: "증상                                      원인                                   처방\n───────────────────────────────────────  ────────────────────────────────────  ──────────────────────────\n중첩될수록 글자가 커진다(작아진다)          font-size 에 em 은 부모 기준 → 곱해짐        rem\npadding-top: 50% 가 높이의 반이 아니다      세로 % 패딩은 '폭' 기준                    aspect-ratio 로 비율\nheight: 100% 가 안 먹는다                  부모 높이가 auto 면 % 기준이 없음           부모에 높이 · 또는 vh/dvh\n모바일에서 100vh 가 주소창 뒤로 넘친다      vh 는 큰 뷰포트 기준                        dvh · svh\ncalc(100%-2rem) 이 무효                    - 양옆 공백 필요                           calc(100% - 2rem)\n'1 cm' 가 무효                             단위와 숫자 사이 공백                       1cm\n0.5s 를 0 으로 줄여 '0' 만 적으니 무효        시간·각도는 0 에도 단위                      0s",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 단위는 '어디를 기준으로 셀 것인가'의 선언이다",
        body: "px는 장치, em은 요소, rem은 문서, vw는 창을 기준으로 합니다. cqi는 컨테이너, %는 속성이 정한 기준을 따릅니다. 같은 '2'가 40도 되고 32도 되고 172도 되는 것은 기준이 달라서입니다. 기준이 바뀌면 값도 따라 바뀝니다. 상대 단위의 쓸모가 여기서 나옵니다. 사용자 글자 크기 설정을 존중하고, 컴포넌트를 다시 쓸 수 있습니다. 중첩된 em이라는 함정도 여기서 나옵니다. 반응형의 두 축도 여기서 갈립니다. 창에 반응하려면 vw와 미디어 쿼리를 씁니다. 놓인 자리에 반응하려면 cqi와 컨테이너 쿼리를 씁니다(10장).",
        code: "기준          단위              바뀌는 때\n───────────  ───────────────  ─────────────────────────\n장치          px               (고정)\n요소          em · ch · lh      요소의 font-size 가 바뀔 때\n문서          rem · rlh         html font-size (사용자 설정)\n창            vw · vh · dvh     창 크기 · 주소창\n컨테이너      cqi · cqb         놓인 자리의 크기 (10장)\n속성별        %                 포함 블록의 폭/높이 등",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "width와 height가 적용되는 상자의 종류(블록, 인라인, flex, grid)는 5장 디스플레이와 흐름에서 다룹니다. `%`의 기준인 '포함 블록'은 8장 위치 지정에서 정의합니다.",
      },
      {
        label: "확인 질문",
        body: "1) font-size 20px 요소의 `2em`과 루트 16px의 `2rem`은 각각 몇 px인가요?\n2) `padding-top: 10%`의 기준은 폭인가요, 높이인가요?\n3) `height: 100%`가 안 먹는 흔한 이유는?\n4) 뷰포트 1728px에서 `clamp(100px, 10vw, 150px)`는 몇 px가 되고, 왜 그런가요?",
      },
    ],
    sources: [
      { label: "MDN — CSS values and units", href: `${MDN}/Guides/Values_and_units` },
      { label: "MDN — Numeric data types", href: `${MDN}/Guides/Values_and_units/Numeric_data_types` },
      { label: "MDN — Values and units (Learn)", href: `${LEARN}/Styling_basics/Values_and_units` },
    ],
  },

  {
    id: "css-s5",
    name: "5장 · 디스플레이와 흐름",
    tagline: "display에는 바깥(block/inline)과 안쪽(flow/flex/grid) 두 값이 있다",
    intro:
      "`display`는 두 가지를 함께 정합니다. 하나는 상자가 바깥에서 어떻게 놓이는가입니다(block-level인가, inline-level인가). 다른 하나는 안쪽 자식들을 어떻게 배치하는가입니다(flow · flow-root · flex · grid). MDN의 다중 키워드 문법은 그 둘을 갈라 적습니다. `block` = `block flow`, `inline-block` = `inline flow-root`, `flex` = `block flex`입니다. 기본은 정상 흐름(normal flow)입니다. `flow-root`가 만드는 블록 서식 맥락(BFC)은 float과 마진 병합을 가둡니다. `none` · `contents` · `visibility: hidden`의 차이도 여기서 다룹니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 두 값 문법의 계산값",
        body: "`display: inline flow-root`의 계산값은 \"inline-block\"으로, `block flex`는 \"flex\"로 나왔습니다. 브라우저가 옛 한 단어 이름으로 되돌려 적습니다. 바깥 값만 적으면 안쪽은 flow가 됩니다. 안쪽 값만 적으면 바깥은 block(ruby만 inline)입니다. 그래서 `display: flex`인 요소 자신은 블록처럼 줄을 바꾸고, 그 '자식들'이 플렉스로 놓입니다. `inline-flex`와 `inline-grid`는 바깥만 인라인으로 바꾼 것입니다.",
        code: "한 단어          두 값               뜻\n──────────────  ─────────────────  ─────────────────────────────────\nblock           block flow          줄 바꿈 · 자식은 정상 흐름\ninline          inline flow         줄 안 · 자식은 정상 흐름\ninline-block    inline flow-root    줄 안 · 자식은 새 BFC (크기 가짐)\nflow-root       block flow-root     줄 바꿈 · 새 BFC\nflex            block flex          줄 바꿈 · 자식은 플렉스\ninline-flex     inline flex\ngrid            block grid\n\ncs(\"d-ifr\", \"display\")   // \"inline-block\"\ncs(\"d-bflex\", \"display\") // \"flex\"",
        codeLang: "text",
      },
      {
        label: "정상 흐름과 블록 서식 맥락(BFC)",
        body: "정상 흐름에서 블록 상자는 세로로 쌓이고, 인라인 상자는 줄 상자 안에서 가로로 흐릅니다. BFC는 '블록들이 놓이는 독립된 구역'입니다. MDN이 적는 생성 조건은 다음과 같습니다. 루트, float, absolute/fixed, inline-block, table-cell, `overflow`가 visible이나 clip이 아닌 블록, `display: flow-root`, `contain: layout/content/paint`, 스스로 컨테이너가 아닌 flex와 grid 아이템, 멀티컬럼, `container-type`이 normal이 아닌 요소입니다. BFC는 세 가지 일을 합니다. 안쪽 float을 부모 높이에 넣고, 바깥 float을 밀어내고, 마진 병합을 막습니다. overflow로 BFC를 만들면 '원치 않는 스크롤바나 잘린 그림자'가 생깁니다. 그래서 MDN은 `flow-root`를 권합니다.",
        code: "/* float 자식이 부모 높이에 안 잡힐 때 */\n.wrap { display: flow-root; }   /* 새 BFC — float 포함, 마진 병합 차단, 부작용 없음 */\n\n/* 옛 방법들의 부작용 */\n.wrap { overflow: hidden; }     /* 그림자·툴팁이 잘린다 */\n.wrap::after { content: \"\"; display: block; clear: both; }   /* clearfix */",
        terms: [
          {
            term: "블록 서식 맥락 (BFC, block formatting context)",
            body: "블록 상자들이 세로로 쌓이는 독립 구역입니다. 구역 안의 float과 마진은 밖으로 나가지 않습니다. 3장의 '부모 flow-root가 자식 마진을 가뒀다'가 BFC의 효과였습니다. 간격 30이 부모 안에 남았습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: none, contents, visibility: hidden",
        body: "`display: none` 요소의 rect는 0×0이었습니다. 레이아웃에서 빠지고, MDN에 따르면 접근성 트리에서도 빠집니다. `visibility: hidden`은 rect가 800×19로 자리를 차지했지만 보이지 않았습니다. 자식이 `visibility: visible`이면 그 자식은 다시 보입니다. probe2에서 자식이 visible이었고, 클릭도 자식에 닿았습니다. `display: contents`는 요소 자신의 상자를 없애고 자식만 남깁니다. 자신의 rect는 0×0이고, 자식은 그대로 그려집니다. MDN은 두 가지를 주의하라고 합니다. 일부 브라우저는 contents 요소를 접근성 트리에서도 빼는데, 이는 '명세상 잘못된 동작'입니다. 또 표 요소를 block/grid/flex로 바꾸면 접근성 표현이 바뀔 수 있습니다. `display`는 이산(discrete) 애니메이션이고, 12장의 `transition-behavior: allow-discrete`로 이어집니다.",
        code: "                   레이아웃 자리   보임   접근성 트리        자식\ndisplay: none       X             X     제거              함께 사라짐\nvisibility: hidden  O (800×19)    X     (이름 없이 남음)    visible 로 되살릴 수 있음 (실제로)\ndisplay: contents   자기 상자 X   —     (브라우저 버그)     그대로 그려짐\nopacity: 0          O             X     남음 (포커스 가능)   함께 투명\n\nr(\"d-none\")     // { w: 0, h: 0 }\nr(\"d-hidden\")   // { w: 800, h: 19 }   cs(\"d-hidden\", \"visibility\") = \"hidden\"\nr(\"d-contents\") // { w: 0, h: 0 }  — 자식 span 은 그려진다",
        codeLang: "text",
      },
      {
        label: "문제가 나는 경우: display를 바꿨는데",
        body: "display 값이 바뀔 때 함께 바뀌는 것들입니다.",
        code: "증상                               원인                          처방\n────────────────────────────────  ───────────────────────────  ─────────────────────────\nspan 에 width 가 안 먹는다           inline 은 크기 무시              inline-block / block\nflex 로 바꾸니 자식 마진 병합이 사라졌다  플렉스 컨테이너 안엔 병합 없음 (3장)  의도된 것 — gap 으로\nfloat 자식이 있는 부모 높이가 0       float 은 흐름에서 빠짐            display: flow-root\nul 을 flex 로 바꾸니 스크린리더가 목록을 안 읽음  display 가 역할 표현에 영향 (Safari)  role=\"list\" 명시\ndisplay: none 토글에 transition 이 안 된다  none 은 이산 값                   allow-discrete +\n                                                                        @starting-style (12장)\ninline-block 들 사이 틈               줄 안의 공백 문자                flex 또는 font-size: 0\n하나만 숨겼는데 자리까지 사라진다       none 은 자리도 뺀다               visibility: hidden",
        codeLang: "text",
      },
      {
        label: "문제의 구조: display는 상자의 종류와 자식의 배치를 함께 정한다",
        body: "바깥 값은 부모의 레이아웃 안에서 이 상자를 어떻게 다룰지 정합니다(블록 레벨 또는 인라인 레벨). 안쪽 값은 이 상자가 자식에게 줄 레이아웃 모드를 정합니다(정상 흐름, 플렉스, 그리드). 플렉스와 그리드 장의 규칙은 모두 안쪽 값이 flex/grid인 컨테이너의 직접 자식에게만 적용됩니다. 손자에게는 적용되지 않습니다. BFC는 안쪽 값 flow-root(또는 같은 효과를 내는 다른 조건)가 만드는 '격리'입니다. 결국 display 하나가 줄 바꿈, 크기, 자식 배치, 격리 네 가지를 정합니다.",
        code: "display: <바깥> <안쪽>\n           │       └── 자식의 레이아웃 모드 (flow · flow-root · flex · grid)\n           └────────── 부모 안에서 나의 종류 (block · inline)\n\n부모 (display: flex)\n ├─ 자식 A  ← 플렉스 아이템 (안쪽 값의 영향)\n │   └─ 손자  ← 아님 — A 의 안쪽 값(flow)이 정함\n └─ 자식 B  ← 플렉스 아이템",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "안쪽 값이 flex일 때의 규칙은 6장, grid일 때는 7장입니다. 요소를 정상 흐름에서 빼내는 position과 포함 블록, 쌓임 맥락은 8장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `display: inline-block`을 두 값 문법으로 쓰면?\n2) BFC를 만들면 달라지는 세 가지는?\n3) `display: none`과 `visibility: hidden`의 차이를 레이아웃, 접근성, 자식으로 나눠 적어 보세요.\n4) `display: flex`가 손자에게 영향을 주지 않는 이유는?",
      },
    ],
    sources: [
      { label: "MDN — Using the multi-keyword syntax with CSS display", href: `${MDN}/Guides/Display/Multi-keyword_syntax` },
      { label: "MDN — Block formatting context", href: `${MDN}/Guides/Display/Block_formatting_context` },
      { label: "MDN — display", href: `${MDN}/Reference/Properties/display` },
      { label: "MDN — Introduction to CSS layout (Learn)", href: `${LEARN}/CSS_layout/Introduction` },
    ],
  },

  {
    id: "css-s6",
    name: "6장 · 플렉스박스",
    tagline: "한 축 위에서 남는 공간을 grow, shrink, basis로 나눈다",
    intro:
      "플렉스박스는 행이나 열, 한 차원의 레이아웃입니다. 컨테이너가 주축(flex-direction)과 교차축을 정합니다. 아이템 크기는 세 값으로 정해집니다. `flex-basis`는 출발 크기, `flex-grow`는 남는 공간을 나눠 받는 비율, `flex-shrink`는 모자라는 공간을 내놓는 비율입니다. 기본값 `0 1 auto`는 자라지 않고, 줄어들고, 콘텐츠 크기에서 출발한다는 뜻입니다. `flex: 1`은 `1 1 0`입니다. 가장 자주 부딪히는 것은 아이템의 `min-width: auto`입니다. 이 값 때문에 아이템이 콘텐츠보다 작게 줄지 않습니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 기본값과 flex: 1",
        body: "`display: flex` 안에 아무 설정 없는 아이템을 두고 계산값을 읽었습니다. 아이템은 flex-grow 0, flex-shrink 1, flex-basis auto, min-width auto였습니다. 컨테이너는 align-items normal(stretch로 동작), justify-content normal(flex-start로 동작), flex-wrap nowrap이었습니다. `flex: 1`을 주면 flex-basis 계산값이 \"0%\"가 됩니다. MDN은 `1 1 0`으로 적지만, 브라우저는 0%로 돌려줍니다. basis 0은 '콘텐츠 크기를 무시하고 남는 공간만 비율로 나눈다'는 뜻입니다. 그래서 두 아이템이 콘텐츠와 무관하게 같은 폭이 됩니다. 단, 아래의 min-width: auto에 걸리지 않을 때만 그렇습니다.",
        code: "cs(\"f-def\", \"flex-grow\")    // \"0\"\ncs(\"f-def\", \"flex-shrink\")  // \"1\"\ncs(\"f-def\", \"flex-basis\")   // \"auto\"\ncs(\"f-def\", \"min-width\")    // \"auto\"   ← 아래 함정의 근원\ncs(\"f1\", \"align-items\")     // \"normal\" (stretch 처럼)\ncs(\"f1\", \"justify-content\") // \"normal\" (flex-start 처럼)\ncs(\"f-a\", \"flex-basis\")     // \"0%\"     ← flex: 1 = 1 1 0\n\n단축          grow shrink basis   뜻\nflex: initial  0    1     auto    기본 — 안 자라고 줄어든다\nflex: auto     1    1     auto    콘텐츠에서 출발해 자라고 줄어든다\nflex: none     0    0     auto    고정\nflex: 1        1    1     0       남는 공간만 비율로 (같은 폭)",
      },
      {
        label: "실제로 돌려 보면: 긴 단어가 컨테이너를 터뜨린다(min-width: auto)",
        body: "폭 300 컨테이너에 `flex: 1` 아이템 둘을 두고, 둘째에 띄어쓰기 없는 긴 문자열을 넣었습니다. 150/150을 기대했지만 실제는 a 8px, b 698px였습니다. 둘째가 컨테이너를 넘어 698까지 커졌습니다. MDN은 '작은 아이템은 min-content 크기 아래로 줄어들지 않는다'고 적습니다. 플렉스와 그리드 아이템에서는 `min-width` 초깃값 auto가 '자동 최소 = min-content'로 풀리기 때문입니다. 블록 요소에서는 0입니다. 둘째에 `min-width: 0`을 주면 150/150이 됩니다. `overflow: hidden`처럼 visible이 아닌 값도 효과가 같습니다. 스크롤 컨테이너가 되어 자동 최소가 0이 되기 때문입니다. 플렉스 아이템에서 말줄임(`text-overflow: ellipsis`)이 안 되는 이유도 모두 이것입니다.",
        code: ".f { display: flex; width: 300px; }  .f > div { flex: 1; }\n/* 둘째에 'bbbb…'(끊기지 않는 80자) */\nr(\"f-a\").width, r(\"f-b\").width     // 8, 698   ← 넘침\n\n.f-min0 { min-width: 0; }\nr(\"f-c\").width, r(\"f-d\").width     // 150, 150 ← 고쳐짐\n\n/* 같은 효과: overflow: hidden (스크롤 컨테이너는 자동 최소 0) · 말줄임의 전제 */\n.item { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",
        terms: [
          {
            term: "min-content · max-content",
            body: "min-content는 '모든 줄바꿈 기회에서 줄을 바꿨을 때'의 폭, 즉 가장 긴 단어의 폭입니다. max-content는 '전혀 줄을 바꾸지 않았을 때'의 폭입니다. 실제로 'short words here'는 min-content 41px, max-content 115px였습니다. 플렉스와 그리드 아이템의 자동 최소 크기는 min-content입니다. 그래서 끊기지 않는 긴 단어가 그대로 최소 폭이 됩니다.",
          },
        ],
      },
      {
        label: "축과 정렬: justify는 주축, align은 교차축",
        body: "`flex-direction`이 주축을 정합니다(row 기본, column이면 세로). `justify-content`는 주축 방향으로 분배합니다(flex-start · center · space-between · space-around · space-evenly). `align-items`는 교차축으로 정렬합니다(stretch 기본 · center · flex-start · baseline). `align-self`는 아이템 하나만 정렬합니다. `flex-wrap: wrap`이면 줄마다 별도 플렉스 컨테이너처럼 동작합니다. 이때 `align-content`가 줄들을 정렬합니다. `gap`은 아이템 사이 간격입니다. 마진과 달리 병합이나 가장자리 문제가 없습니다. MDN은 'justify-items는 플렉스에서 무시된다'고 적습니다(그리드 전용). `order`는 시각 순서만 바꿉니다. 탭 순서·읽기 순서는 바꾸지 않습니다.",
        code: "flex-direction: row            주축 →  (justify-content)      교차축 ↓ (align-items)\nflex-direction: column         주축 ↓  (justify-content)      교차축 → (align-items)\n\n.center-both { display: flex; justify-content: center; align-items: center; }\n.toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: baseline; }\n.push-right { margin-left: auto; }   /* auto 마진이 남는 공간을 먹는다 */",
        codeLang: "text",
      },
      {
        label: "문제가 나는 경우: 플렉스에서 자주 보는 것",
        body: "플렉스 레이아웃이 뜻대로 안 될 때의 표입니다.",
        code: "증상                               원인                          처방\n────────────────────────────────  ───────────────────────────  ──────────────────────────────\nflex: 1 둘인데 폭이 다르다           한쪽 콘텐츠가 min-content 로 더 크다  min-width: 0\n긴 텍스트가 넘친다 · 말줄임이 안 된다  자동 최소 = min-content         min-width: 0 또는 overflow: hidden\n아이템이 세로로 늘어난다             align-items 기본 stretch         align-items: flex-start\nimg 가 찌그러진다                    stretch + 비율 없는 늘어남        align-self: flex-start · img {\n                                                                max-width: 100% }\n세로 중앙 정렬이 안 된다              컨테이너 높이가 콘텐츠 높이        컨테이너에 높이 (min-height: 100dvh)\n자식의 margin 이 병합되지 않는다       플렉스 안엔 병합 없음              gap 으로 통일\n마지막 줄이 양쪽 정렬로 벌어진다       space-between + wrap            gap + flex-start · 또는 grid\norder 로 순서 바꿨는데 탭이 원래 순서  시각 순서만 바뀜                  DOM 순서를 바꾸기",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 출발 크기 → 공간 분배 → 최소/최대 고정",
        body: "(1) 각 아이템의 가설 크기는 flex-basis입니다. auto면 width나 콘텐츠 크기입니다.\n(2) 컨테이너 주축 크기에서 가설 크기의 합을 뺀 것이 남는 공간입니다. 양수면 flex-grow 비율로 더하고, 음수면 flex-shrink × basis 비율로 뺍니다.\n(3) 그 결과를 min-width/max-width 안으로 고정(clamp)합니다. 고정에 걸린 아이템을 빼고 (2)를 다시 돕니다.\n`min-width: auto`는 (3)에서 min-content로 작동합니다. 그래서 긴 단어 아이템은 줄지 않고, 나머지가 그만큼 더 줄어듭니다. a가 8px까지 밀린 이유입니다. `flex: 1`의 basis 0은 (1)을 0으로 만듭니다. 그러면 남는 공간이 컨테이너 전체가 되고, 이를 1:1로 나눠 같은 폭이 됩니다.",
        code: "① 가설 크기   basis(auto → width/콘텐츠)        [a: 8]  [b: 698]      또는 flex:1 → [0] [0]\n② 분배        남는 공간 = 300 − Σ               음수 → shrink 로 빼기 / 양수 → grow 로 더하기\n③ 고정        min-width:auto = min-content        b 는 698 아래로 못 줄음 → a 가 대신 줄어 8\n              min-width: 0 이면                   150 / 150",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "두 차원이 필요하면 7장 그리드입니다. 플렉스는 '아이템이 흐르며 크기를 정하는' 쪽, 그리드는 '컨테이너가 트랙을 정하고 아이템을 놓는' 쪽입니다. 이 차이가 둘을 고르는 기준입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `flex: 1`의 세 값과, basis 0이 '같은 폭'을 만드는 이유는?\n2) 긴 단어 아이템이 `flex: 1`인데도 커지는 이유와 두 가지 처방은?\n3) justify-content와 align-items는 각각 어느 축인가요?\n4) 플렉스에서 `order`가 바꾸지 않는 것은?",
      },
    ],
    sources: [
      { label: "MDN — Basic concepts of flexbox", href: `${MDN}/Guides/Flexible_box_layout/Basic_concepts` },
      { label: "MDN — Controlling ratios of flex items along the main axis", href: `${MDN}/Guides/Flexible_box_layout/Controlling_flex_item_ratios` },
      { label: "MDN — min-width (auto)", href: `${MDN}/Reference/Properties/min-width` },
      { label: "MDN — Flexbox (Learn)", href: `${LEARN}/CSS_layout/Flexbox` },
    ],
  },

  {
    id: "css-s7",
    name: "7장 · 그리드",
    tagline: "컨테이너가 선과 트랙을 정하고, 아이템을 셀과 영역에 놓는다",
    intro:
      "그리드는 두 차원 레이아웃입니다. `display: grid` 컨테이너가 `grid-template-columns/rows`로 트랙(열과 행)을 정합니다. 트랙 사이의 선(line)에는 번호가 붙고, 아이템은 선 번호나 영역 이름으로 놓입니다. `fr`은 남는 공간의 비율입니다. `repeat()`, `minmax()`, `auto-fill`, `auto-fit`이 반응형 트랙을 만듭니다. 정하지 않은 자리로 아이템이 넘치면 `grid-auto-rows` 크기의 암묵적 트랙이 생깁니다. `subgrid`를 쓰면 자식이 부모의 트랙을 그대로 씁니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: fr은 간격을 뺀 뒤의 비율이다",
        body: "폭 400에서 `grid-template-columns: 100px 1fr 2fr; gap: 10px`의 계산값은 `100px 93.3281px 186.672px`였습니다. 400 − 100 − 10·2(gap) = 280을 1:2로 나눠 93.33과 186.67이 됩니다. MDN은 '간격은 fr 트랙보다 먼저 할당되고, 간격에는 아무것도 놓을 수 없다'고 적습니다. 암묵적 트랙도 봤습니다. 열 하나에 아이템 셋을 넣으면 행이 셋 생깁니다. `grid-auto-rows: 40px`이면 행마다 40입니다. 실제로 `grid-template-rows` 계산값은 `40px 40px 40px`, 높이는 120이었습니다. `getComputedStyle`의 grid-template-* 는 레이아웃이 끝난 뒤의 px 트랙 목록을 돌려줍니다. 그래서 트랙을 디버깅할 때 바로 쓸 수 있습니다.",
        code: ".g { display: grid; grid-template-columns: 100px 1fr 2fr; gap: 10px; width: 400px; }\ncs(\"g1\", \"grid-template-columns\")   // \"100px 93.3281px 186.672px\"\n// (400 − 100 − 10×2) = 280 → 1fr = 93.33, 2fr = 186.67\n\n.g-implicit { grid-template-columns: 1fr; grid-auto-rows: 40px; }   /* 아이템 3 */\ncs(\"g-imp\", \"grid-template-rows\")   // \"40px 40px 40px\"  ← 암묵적 행 셋\nr(\"g-imp\").height                   // 120",
        terms: [
          {
            term: "fr (fraction)",
            body: "고정 트랙과 간격을 뺀 '남는 공간'을 나누는 단위입니다. `1fr 2fr`은 1:2로 나눕니다. `minmax(100px, 1fr)`처럼 하한을 둘 수 있습니다. 하한 없는 `1fr`은 사실 `minmax(auto, 1fr)`입니다. 그래서 min-content 아래로 줄지 않습니다. 플렉스의 min-width: auto와 같은 문제입니다. 정말 같은 폭을 원하면 `minmax(0, 1fr)`을 씁니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: auto-fill과 auto-fit의 차이",
        body: "폭 350에서 `repeat(auto-fill, minmax(100px, 1fr))`에 아이템 둘을 넣자 트랙이 셋 나왔습니다. `116.656px 116.672px 116.656px`, 즉 350/3입니다. 빈 셋째 트랙도 자리를 차지합니다. `repeat(auto-fit, …)`에 아이템 둘을 넣으면 `175px 175px 0px`입니다. MDN 설명대로 '빈 반복 트랙은 0으로 접히고 양옆 간격도 접힌다'는 결과입니다. 그래서 아이템이 적으면 auto-fit은 늘어나 채우고, auto-fill은 빈 칸을 남깁니다. 둘 다 컨테이너에 들어가는 만큼 반복합니다. 미디어 쿼리 없는 반응형 카드 격자의 표준 식입니다. 제한도 있습니다. 자동 반복은 fr이나 내재 크기만으로는 쓸 수 없고, minmax로 하한을 줘야 합니다. 한 목록에는 자동 반복을 하나만 쓸 수 있습니다.",
        code: ".cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); width: 350px; }\n\nauto-fill, 아이템 2:  \"116.656px 116.672px 116.656px\"   ← 빈 트랙이 남는다\nauto-fit,  아이템 2:  \"175px 175px 0px\"                 ← 빈 트랙이 0 으로 접힌다\n\n/* 반응형 카드 격자의 표준 */\n.cards { grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); }",
      },
      {
        label: "선, 영역, 배치, 자동 배치",
        body: "선 번호는 앞에서 1부터, 끝에서 −1부터 셉니다. `grid-column: 1 / -1`은 첫 선부터 마지막 선까지, 즉 전체 폭입니다. `grid-row: 2 / span 2`는 2번 선에서 두 트랙입니다. `grid-template-areas`로 이름을 그려 두고 `grid-area: header`처럼 놓을 수도 있습니다. 이름 붙인 선(`[main-start]`)도 쓸 수 있습니다. 자동 배치는 기본이 행 방향이라, 소스 순서대로 셀을 하나씩 채웁니다. `grid-auto-flow: column`이면 열 방향입니다. `dense`는 뒤의 작은 아이템으로 앞의 빈 칸을 채웁니다. 이때 MDN은 '탭 순서는 문서 순서를 따른다'고 주의시킵니다. 아이템이 겹치면 `z-index`가 위아래를 정하고, 없으면 소스에서 뒤에 오는 것이 위에 놓입니다. 정렬 속성은 `justify-items/self`(인라인 축), `align-items/self`(블록 축), `justify-content/align-content`(트랙 전체)입니다.",
        code: ".layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    \"header header\"\n    \"nav    main\"\n    \"footer footer\";\n}\n.header { grid-area: header; }\n.full   { grid-column: 1 / -1; }        /* 전체 폭 */\n.tall   { grid-row: 2 / span 2; }\n\n/* 선 번호 */\n|1    |2         |3\n 200px   1fr",
        codeLang: "text",
      },
      {
        label: "subgrid와 중첩",
        body: "중첩 그리드는 기본으로 부모 트랙을 모릅니다. 그래서 자식 그리드의 열이 부모 열과 어긋납니다. `grid-template-columns: subgrid`를 주면 자식이 부모의 트랙 선을 그대로 씁니다. 그러면 카드 안의 제목, 본문, 버튼이 카드끼리 줄이 맞습니다. Chrome 156에서 `CSS.supports(\"grid-template-columns: subgrid\")`는 true였습니다. 간격도 부모를 따르지만, 자식에서 다시 줄 수 있습니다.",
        code: ".cards { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto auto; }\n.card  { display: grid; grid-row: span 3; grid-template-rows: subgrid; }   /* 부모 행 선을 그대로 */\n/* 카드마다 제목·본문·버튼이 같은 행 선에 놓인다 */",
      },
      {
        label: "문제가 나는 경우: 그리드가 뜻대로 안 될 때",
        body: "그리드에서 자주 보는 것들입니다.",
        code: "증상                            원인                           처방\n─────────────────────────────  ────────────────────────────  ─────────────────────────────\n1fr 열이 콘텐츠 때문에 넓어진다    1fr = minmax(auto, 1fr), 하한 min-content  minmax(0, 1fr)\n아이템이 적을 때 카드가 왼쪽에 작게 모인다  auto-fill 은 빈 트랙을 남김       auto-fit\n행 높이가 멋대로                   암묵적 행은 auto                 grid-auto-rows: minmax(100px, auto)\n빈 칸이 생긴다                     자동 배치가 앞으로 못 감           grid-auto-flow: dense (탭 순서 주의)\n% 높이 · 세로 중앙이 안 된다       컨테이너 높이 없음                 min-height · align-items: center\n중첩 그리드 열이 부모와 어긋남        자식은 부모 트랙을 모름            subgrid\n텍스트 긴 셀이 넘친다               자동 최소 = min-content (플렉스와 같음)  min-width: 0 · minmax(0, 1fr) ·\n                                                                  overflow-wrap",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 그리드는 컨테이너가 정하고, 플렉스는 아이템이 흐른다",
        body: "플렉스는 '콘텐츠 → 컨테이너' 방향입니다. 아이템의 콘텐츠 크기에서 출발해 남는 공간을 나눕니다. 그리드는 '컨테이너 → 콘텐츠' 방향입니다. 컨테이너가 트랙을 먼저 정하고 아이템을 끼웁니다. 그래서 표처럼 열이 어긋나지 않는 정렬은 그리드가 쉽고, 툴바나 태그 목록처럼 내용에 맞춰 흐르는 줄은 플렉스가 쉽습니다. 공통 함정은 '자동 최소 = min-content'입니다(`minmax(0, 1fr)`, `min-width: 0`). 공통 도구는 `gap`과 박스 정렬 속성입니다. 한 축이면 플렉스, 두 축이거나 줄을 맞춰야 하면 그리드를 먼저 고릅니다.",
        code: "플렉스                                   그리드\n──────────────────────────────────────  ──────────────────────────────────────\n한 축 (row 또는 column)                   두 축 (행 × 열)\n아이템 크기 → 분배 (콘텐츠가 주도)           트랙 정의 → 배치 (컨테이너가 주도)\n줄마다 독립 (wrap)                        열이 전체에서 맞음\n툴바 · 태그 · 중앙 정렬                     페이지 골격 · 카드 격자 · 폼 레이아웃\n공통: gap · justify/align · 자동 최소 min-content",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "요소를 흐름에서 빼내는 position과 포함 블록, 쌓임 맥락은 8장입니다. 그리드 아이템에 z-index를 주면 쌓임 맥락이 생긴다는 점이 그 장과 이어집니다.",
      },
      {
        label: "확인 질문",
        body: "1) 폭 400, `100px 1fr 2fr`, gap 10에서 1fr은 몇 px?\n2) auto-fill과 auto-fit의 차이를 '빈 트랙'으로 설명하세요.\n3) `1fr` 열이 긴 단어 때문에 넓어지는 이유와 처방은?\n4) 어떤 레이아웃에 그리드를, 어떤 것에 플렉스를 고르나요?",
      },
    ],
    sources: [
      { label: "MDN — Basic concepts of grid layout", href: `${MDN}/Guides/Grid_layout/Basic_concepts` },
      { label: "MDN — Auto-placement in grid layout", href: `${MDN}/Guides/Grid_layout/Auto-placement` },
      { label: "MDN — repeat()", href: `${MDN}/Reference/Values/repeat` },
      { label: "MDN — CSS grid layout (Learn)", href: `${LEARN}/CSS_layout/Grids` },
    ],
  },

  {
    id: "css-s8",
    name: "8장 · 위치 지정과 쌓임 맥락",
    tagline: "position은 무엇을 기준으로 옮길지, z-index는 어느 맥락 안에서 비교할지 정한다",
    intro:
      "`position` 값은 다섯입니다. static은 기본값이고, relative는 흐름을 지킨 채 자기 자리 기준으로 옮깁니다. absolute는 흐름에서 빠져 포함 블록 기준, fixed는 뷰포트 기준입니다. sticky는 임계까지 relative, 넘으면 고정입니다. absolute의 '포함 블록'은 position이 static이 아닌 가장 가까운 조상의 패딩 상자입니다. fixed는 뷰포트 기준이지만, transform이나 filter 등이 있는 조상이 있으면 그 조상이 기준입니다. z-index는 전역 순서가 아니라 '쌓임 맥락' 안에서만 비교됩니다. 모달이 헤더 뒤에 깔리는 버그는 거의 다 이 두 규칙 때문입니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 포함 블록과 transform의 함정",
        body: "`position: relative` 부모 안의 `absolute; top: 10px; left: 10px` 자식은 부모 기준 (10, 10)에 놓였습니다. `position: fixed; top: 0; left: 0`은 뷰포트 기준이어야 합니다. 그런데 부모에 `transform: translateZ(0)`이 있으면 그 부모 기준 (0, 0)이 됩니다. 변형된 부모를 뷰포트 밖(x −9999)에 두자 fixed 요소의 rect.x도 −9999였습니다. MDN 규칙에서 포함 블록은 absolute면 '가장 가까운 non-static 조상의 패딩 상자', fixed면 '뷰포트'입니다. 하지만 `transform`, `filter`, `backdrop-filter`, `perspective`, `translate/rotate/scale`, `contain: layout/paint/strict/content`, `content-visibility: auto`가 있거나, 이를 `will-change`로 예고한 조상이 둘 다를 가로챕니다. 'perspective와 filter가 포함 블록을 만드는 데는 브라우저 간 차이가 있다'는 주의도 있습니다.",
        code: ".pos-rel { position: relative; } .pos-abs { position: absolute; top: 10px; left: 10px; }\nr(\"pos-abs\") − r(\"pos-rel\")           // { x: 10, y: 10 }\n\n.pos-xform { transform: translateZ(0); }   /* 조상에 transform */\n.pos-fixed { position: fixed; top: 0; left: 0; }\nr(\"pos-fixed\") − r(\"pos-xform\")       // { x: 0, y: 0 }  ← 뷰포트가 아니라 변형된 조상 기준\nr(\"pos-fixed\").x                      // −9999 (조상을 따라 화면 밖)\n\n포함 블록                      기준\n──────────────────────────    ────────────────────────────────────────\nstatic · relative · sticky     가장 가까운 블록 컨테이너의 콘텐츠 상자\nabsolute                       가장 가까운 non-static 조상의 패딩 상자 (없으면 초기 포함 블록)\nfixed                          뷰포트 — 단 transform/filter/perspective/contain/will-change 조상이 있으면 그 조상",
        terms: [
          {
            term: "포함 블록 (containing block)",
            body: "위치와 퍼센트의 기준이 되는 상자입니다. `top/left/width/%`는 모두 이 상자를 기준으로 풀립니다. top/bottom/height는 포함 블록의 높이를, left/right/width/margin/padding은 폭을 기준으로 삼습니다. 4장의 '%의 기준'이 바로 이 상자입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: z-index 999가 z-index 2에 진다",
        body: "`.sc-a { position: relative; z-index: 1 }` 안에 `.child { position: absolute; z-index: 999 }`를, 형제로 `.sc-b { position: relative; z-index: 2 }`를 두었습니다. 겹친 자리를 `elementFromPoint`로 찍으면 `sc-b`가 나옵니다. 999가 2에 진 것입니다. child의 999는 sc-a의 맥락 안에서만 비교되고, 밖에서 sc-a는 z-index 1인 한 층입니다. `opacity: 0.5`인 부모 안의 `z-index: 10` 자식도 형제의 `z-index: 1`에 졌습니다(`op-sib`가 위). opacity < 1도 맥락을 만들기 때문입니다. MDN이 꼽는 생성 조건은 이렇습니다.\n루트, z-index가 auto가 아닌 positioned, fixed/sticky(z-index 무관), z-index가 있는 flex/grid 아이템, opacity < 1, transform, filter, backdrop-filter, perspective, clip-path, mask, mix-blend-mode, isolation: isolate, will-change(해당 속성), contain: layout/paint, container-type: size/inline-size, top layer(::backdrop)입니다.",
        code: "<div class=\"sc-a\">            position: relative; z-index: 1     ← 쌓임 맥락 A\n  <div class=\"child\">         position: absolute; z-index: 999  ← A 안에서만 999\n</div>\n<div class=\"sc-b\">            position: relative; z-index: 2     ← A 와 같은 맥락에서 2 > 1\n\ndocument.elementFromPoint(겹친 자리).id   // \"sc-b\"   ← 999 가 진다\n\n.op-parent { opacity: 0.5 } > .child { position: absolute; z-index: 10 }  vs  .op-sib { z-index: 1 }\n→ \"op-sib\"   ← opacity < 1 도 맥락을 만든다",
        terms: [
          {
            term: "쌓임 맥락 (stacking context)",
            body: "z 순서를 따로 비교하는 묶음입니다. 묶음 안의 z-index는 밖에서 보이지 않고, 묶음 전체가 부모 맥락에서 한 층으로 다뤄집니다. '맥락을 만들지 않는 요소는 부모 맥락에 흡수된다'. 모달이나 툴팁이 뒤에 깔리면 '어느 조상이 맥락을 만들었나'부터 봅니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: sticky는 '스크롤 조상' 안에서 붙는다",
        body: "`position: sticky; top: 0` 헤더는 스크롤 전에 top 260에 있다가, 400만큼 스크롤하자 top 0에 붙었습니다. 안쪽 스크롤 컨테이너(`overflow: auto`)에 든 sticky는 그 컨테이너 위쪽에 붙습니다. 실제로 컨테이너 top과의 차이가 0이었습니다. MDN에 따르면 sticky는 '임계값(top: 10px 등)까지 relative처럼, 넘으면 fixed처럼' 동작합니다. 기준은 '가장 가까운 스크롤 메커니즘을 가진 조상'입니다. 그래서 중간 조상에 `overflow: hidden/auto`가 있으면 그 조상 안에서만 붙고, 문서 스크롤에는 붙지 않습니다. sticky가 안 되는 가장 흔한 이유입니다. 또 sticky 요소는 부모 상자 안에서만 움직여서, 부모가 끝나면 함께 올라갑니다. z-index가 없어도 쌓임 맥락을 만듭니다.",
        code: "r(\"sticky\").top   // 스크롤 전 260 → scrollTo(0, 400) 뒤 0\n\n.scroller { overflow: auto; height: 100px; } .sticky2 { position: sticky; top: 0; }\nr(\"sticky2\").top − r(\"scroller\").top   // 0  ← 안쪽 스크롤 컨테이너에 붙는다\n\nsticky 가 안 될 때: 중간 조상의 overflow (hidden/auto/scroll) · 부모 높이가 자기 높이와 같음 · top 미지정",
      },
      {
        label: "문제가 나는 경우: 위치와 층",
        body: "position과 z-index에서 매일 보는 것들입니다.",
        code: "증상                                 원인                                처방\n──────────────────────────────────  ─────────────────────────────────  ──────────────────────────────\nz-index: 9999 모달이 헤더 뒤에         모달의 조상이 쌓임 맥락 (transform/opacity/z-index)  모달을 body 끝으로\n                                   (Portal/Teleport) · 조상 맥락 제거\nposition: fixed 가 스크롤을 따라간다     조상에 transform/filter                그 조상 밖으로 · transform 대신\n                                                                         다른 방법\nabsolute 가 엉뚱한 곳에                가까운 조상이 전부 static                부모에 position: relative\nsticky 가 안 붙는다                    중간 조상 overflow · 부모가 짧음 · top 없음  overflow 제거 · 부모 높이 ·\n                                                                           top 지정\nz-index 가 안 먹는다                   static 요소 (flex/grid 아이템 제외)      position 또는 플렉스/그리드 아이템\n툴팁이 overflow: hidden 부모에 잘린다    absolute 도 조상의 overflow 에 잘림 (포함 블록 밖이어도)  Portal · overflow:\n                                    clip 대신 visible\n% top 이 안 먹는다                     포함 블록 높이가 auto                    부모 높이 지정",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 포함 블록 트리와 쌓임 맥락 트리",
        body: "CSS는 DOM 트리 하나 위에 서로 다른 트리 둘을 세웁니다. 포함 블록 트리는 '위치의 기준'입니다(non-static 조상, 또는 transform 등이 있는 조상). 쌓임 맥락 트리는 'z 순서의 울타리'입니다(z-index가 있는 positioned, opacity, transform …). 두 트리를 함께 만드는 조건(transform, filter, will-change)이 있어서, 속성 하나가 두 문제를 함께 일으킵니다. transform 하나가 fixed의 기준을 바꾸고 z-index 울타리도 세웁니다. 그래서 Portal/Teleport로 모달, 드롭다운, 툴팁을 DOM 끝(body 바로 아래)에 그립니다. 두 트리 모두에서 가장 바깥으로 나가는 처방입니다. 애니메이션 성능을 위해 `will-change: transform`을 남발하면 두 트리가 어지러워집니다.",
        code: "DOM                      포함 블록 트리 (position 기준)        쌓임 맥락 트리 (z-index 울타리)\nbody                      초기 포함 블록                        루트 맥락\n └ header (transform)      ← fixed 자손의 기준이 됨               ← 새 맥락: 자손 z-index 가 밖에서 안 보임\n    └ .modal (fixed, z 9999)  header 기준으로 놓임                 header 층 안의 9999\n └ main (z-index: 1, rel)                                         main 층 1  → header 가 z 없으면 main 이 위!\n\n처방: .modal 을 body 끝으로 (Portal) → 초기 포함 블록 + 루트 맥락",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "overflow는 스크롤 컨테이너와 BFC를 만들고, sticky의 기준이 되고, absolute 자손까지 자릅니다. 이는 9장 오버플로와 크기에서 다룹니다. transform이 쌓임 맥락과 포함 블록을 만든다는 점은 12장 트랜스폼에서 다시 나옵니다.",
      },
      {
        label: "확인 질문",
        body: "1) `position: fixed`가 뷰포트 기준이 아니게 되는 조상의 속성 셋은?\n2) z-index 999가 z-index 2에 지는 상황을 쌓임 맥락으로 설명하세요.\n3) opacity: 0.5가 z 순서에 영향을 주는 이유는?\n4) sticky가 안 붙을 때 먼저 볼 조상의 속성은?",
      },
    ],
    sources: [
      { label: "MDN — Stacking context", href: `${MDN}/Guides/Positioned_layout/Stacking_context` },
      { label: "MDN — Layout and the containing block", href: `${MDN}/Guides/Display/Containing_block` },
      { label: "MDN — Positioning (Learn)", href: `${LEARN}/CSS_layout/Positioning` },
      { label: "MDN — Understanding z-index", href: `${MDN}/Guides/Positioned_layout/Understanding_z-index` },
    ],
  },

  {
    id: "css-s9",
    name: "9장 · 오버플로와 크기",
    tagline: "넘친 것을 어떻게 다루고, 상자 크기는 어디서 오나",
    intro:
      "콘텐츠가 상자보다 크면 넘칩니다(overflow). `overflow` 값 visible(기본), hidden, clip, scroll, auto가 넘친 것을 어떻게 다룰지 정합니다. visible과 clip이 아닌 값은 상자를 '스크롤 컨테이너'이자 BFC로 만듭니다. 넘침의 원인과 처방을 알려면 세 가지를 봐야 합니다. 한 축만 지정하면 다른 축이 따라 바뀌는 규칙, hidden과 clip의 차이, 그리고 크기입니다. 크기는 내재(min-content, max-content, fit-content)와 외재(width, %, vw)로 나뉩니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 한 축만 scroll로 두면 다른 축은 auto가 된다",
        body: "`overflow-y: scroll`만 적은 요소의 `overflow-x` 계산값은 \"auto\"였습니다. MDN의 규칙은 '한 축이 visible·clip 이 아니면 다른 축의 visible은 auto로, clip은 hidden으로 계산된다'입니다. 그래서 '세로만 스크롤하고 가로는 보이게'는 overflow 두 값으로 만들 수 없습니다. `overflow: hidden`과 `clip`도 다릅니다. hidden은 스크롤바가 없어도 스크롤 컨테이너입니다. 그래서 `scrollTop = 5`가 먹고(실제로 5), 프로그램(scrollIntoView, 포커스 이동)으로도 스크롤됩니다. clip은 스크롤 컨테이너가 아니어서 `scrollTop`이 실제로 0에 머물렀고, 잘리기만 합니다. MDN은 'visible과 clip을 제외한 모든 값은 새 BFC를 만든다'고 적습니다. 잉크 오버플로(그림자, 외곽선)는 스크롤 영역을 늘리지 않습니다.",
        code: ".ov-y { overflow-y: scroll; }\ncs(\"ov-y\", \"overflow-x\")   // \"auto\"  ← 지정 안 했는데 visible 이 아니다\n\n.ov-hidden { overflow: hidden; }  el.scrollTop = 5 → 5   (스크롤 컨테이너 — 프로그램 스크롤 됨)\n.ov-clip   { overflow: clip; }    el.scrollTop = 5 → 0   (스크롤 컨테이너 아님 — 잘리기만)\n\n값        잘림   스크롤바        스크롤 컨테이너   BFC\nvisible   X      X               X                X\nhidden    O      X               O (프로그램만)    O\nclip      O      X               X                X  (overflow-clip-margin 으로 여유)\nscroll    O      항상            O                O\nauto      O      넘칠 때만        O                O",
      },
      {
        label: "실제로 돌려 보면: min-content와 max-content",
        body: "'short words here'의 min-content 폭은 41px로, 가장 긴 단어 'short'의 폭입니다. max-content는 115px로, 한 줄 전체의 폭입니다. `fit-content`는 '가능한 공간 안에서 max-content까지, 모자라면 min-content까지'입니다. `width: fit-content; max-width: 150px`에 더 긴 문장을 넣으면 150에 걸렸습니다. MDN은 크기를 둘로 나눕니다. 내재(intrinsic) 크기는 콘텐츠나 파일에서 옵니다. 빈 div는 높이가 0이고, 이미지는 파일 크기입니다. 외재(extrinsic) 크기는 width/height로 준 크기라서 콘텐츠가 넘칠 수 있습니다. `min-height`는 '적어도 이만큼'이라는 뜻입니다. `max-width: 100%`는 이미지가 내재 폭을 넘지 않게 합니다. 반면 100%는 작은 이미지를 늘려 깨뜨립니다.",
        code: ".ov-min { width: min-content; }  → 41px   ('short')\n.ov-max { width: max-content; }  → 115px  (한 줄)\n.ov-fit { width: fit-content; max-width: 150px; }  → 150px (공간에 맞춤)\n\n내재 크기 (콘텐츠에서)        외재 크기 (지정)\n빈 div 높이 0                 height: 200px → 콘텐츠가 넘칠 수 있다\nimg 는 파일 크기              img { max-width: 100%; height: auto } ← 넘침 방지, 작은 건 안 늘림\n텍스트는 min/max-content      width: 50% (포함 블록 폭)",
      },
      {
        label: "넘침의 세 원인과 처방",
        body: "(1) 끊기지 않는 긴 문자열(URL, 토큰)입니다. `overflow-wrap: anywhere`나 `word-break: break-all`을 씁니다. 플렉스나 그리드 아이템이면 `min-width: 0`도 필요합니다(6장, 7장).\n(2) 고정 높이에 긴 콘텐츠입니다. `min-height`로 바꾸거나 `overflow: auto`를 줍니다.\n(3) 자식 폭이 부모보다 큰 경우입니다(width: 100% + padding, 큰 이미지, 고정 폭 표). `box-sizing: border-box`(3장)와 `max-width: 100%`를 쓰고, 표는 `overflow-x: auto` 래퍼로 감쌉니다.\n말줄임에는 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` 셋이 함께 있어야 합니다. 여러 줄은 `-webkit-line-clamp`나 표준 `line-clamp`를 씁니다. 앞의 것은 display: -webkit-box가 있어야 합니다.",
        code: "/* 긴 토큰 */\n.text { overflow-wrap: anywhere; }\n/* 한 줄 말줄임 — 셋이 전부 필요 */\n.one { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }\n/* 여러 줄 */\n.three { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }\n/* 표 */\n.table-wrap { overflow-x: auto; }",
      },
      {
        label: "문제가 나는 경우: overflow를 켰다가 생기는 일",
        body: "overflow는 넘침만 다루지 않습니다. BFC, 스크롤 컨테이너, sticky 기준, absolute 자손 잘림, 자동 최소 0도 함께 바꿉니다.",
        code: "증상                                  원인                            처방\n───────────────────────────────────  ─────────────────────────────  ──────────────────────────\n드롭다운·툴팁이 잘린다                   조상 overflow: hidden 이 absolute 자손도 자름  Portal · clip-path 대신\n                                                                              · visible\nsticky 가 안 붙는다                     중간 조상 overflow 가 스크롤 조상이 됨  overflow 제거 (8장)\n가로 스크롤바가 갑자기                   overflow-y 만 줬는데 x 가 auto     overflow-x: hidden 또는 clip\n그림자가 잘린다                         hidden 이 잉크 오버플로도 자름       clip + overflow-clip-margin · padding\n모바일에서 가로로 흔들린다                어떤 자식이 100vw + 스크롤바 폭       html { overflow-x: clip } · 100% 로\nscrollIntoView 가 hidden 안을 스크롤해 버림  hidden 은 스크롤 컨테이너            clip\n텍스트가 플렉스 아이템 밖으로              자동 최소 min-content             min-width: 0",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 크기는 '안에서' 또는 '밖에서' 오고, 둘이 다르면 넘친다",
        body: "상자의 크기는 콘텐츠가 정하거나(내재) 지정값·부모가 정합니다(외재). 넘침은 그 둘이 어긋나는 자리 — 외재로 잡은 크기보다 내재 크기가 클 때 — 에서 납니다. overflow는 그 어긋남을 '보이게·자르게·스크롤하게' 처리하는 세 선택이고, 그중 스크롤은 상자를 스크롤 컨테이너로 만들어 다른 규칙(BFC · sticky · 자동 최소 0)을 끌어옵니다. 그래서 넘침의 첫 질문은 '이 크기가 안에서 왔나 밖에서 왔나'이고, 답에 따라 처방이 '내재 크기를 줄이기'(줄바꿈·말줄임·min-width 0)와 '외재 크기를 풀기'(min-height·auto·max-width 100%)로 갈립니다.",
        code: "내재 (콘텐츠) ──┐\n                ├── 같으면 OK · 다르면 넘침 ──► overflow: visible(보임) · hidden/clip(자름) · auto/scroll(스크롤 컨테이너)\n외재 (지정)   ──┘                                              └── BFC · sticky 기준 · 자동 최소 0 · absolute 자손 잘림",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "크기가 '놓인 자리'에 따라 달라져야 한다면 10장 반응형으로 갑니다. 미디어 쿼리(창 기준)와 컨테이너 쿼리(부모 기준)를 다룹니다. cqi 단위가 컨테이너 폭의 1%라는 것이 4장 단위표의 마지막 줄과 이어집니다.",
      },
      {
        label: "확인 질문",
        body: "1) `overflow-y: scroll`만 적었을 때 `overflow-x`의 계산값과 그 규칙은?\n2) hidden과 clip의 차이를 `scrollTop`으로 설명하세요.\n3) 'short words here'의 min-content와 max-content는 각각 무엇에 해당하나요?\n4) 한 줄 말줄임에 필요한 세 속성과, 플렉스 아이템에서 추가로 필요한 것은?",
      },
    ],
    sources: [
      { label: "MDN — overflow", href: `${MDN}/Reference/Properties/overflow` },
      { label: "MDN — CSS overflow module", href: `${MDN}/Guides/Overflow` },
      { label: "MDN — Sizing items in CSS (Learn)", href: `${LEARN}/Styling_basics/Sizing` },
      { label: "MDN — Overflowing content (Learn)", href: `${LEARN}/Styling_basics/Overflow` },
    ],
  },

  {
    id: "css-s10",
    name: "10장 · 반응형 — 미디어 쿼리와 컨테이너 쿼리",
    tagline: "창에 반응할 것인가, 놓인 자리에 반응할 것인가",
    intro:
      "`@media`는 뷰포트와 장치 조건(폭, 색 모드, 모션 선호, 포인터)으로 규칙을 켜고 끕니다. 범위 문법(`width >= 600px`)이 min-/max- 를 대신합니다. `@container`는 조상 컨테이너의 크기로 규칙을 켭니다. 같은 컴포넌트가 사이드바에서는 세로, 본문에서는 가로가 되게 할 수 있습니다. 컨테이너는 `container-type: inline-size`로 선언해야 합니다. 이 선언에는 '컨테이너는 자기 콘텐츠로 크기를 못 정한다'는 격리가 따라옵니다. 논리 속성은 좌우 대신 시작과 끝으로 적어 쓰기 방향을 따릅니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 같은 컴포넌트가 500 컨테이너에선 파랑, 300에선 빨강",
        body: "`.cq { container-type: inline-size; container-name: card }`를 폭 500과 300으로 두 개 만들고, 안에 같은 `.cq-target`을 넣었습니다. 기본 색은 빨강입니다. `@container card (min-width: 400px) { .cq-target { color: blue } }`를 두면 500 안은 파랑, 300 안은 빨강이 됩니다. 창 폭(1728)과 상관없이 '놓인 자리'로 갈립니다. `width: 50cqi`는 컨테이너 500의 50%인 250px입니다. 미디어 쿼리 `@media (width >= 600px)`는 창 1728에서 켜져 파랑이 됩니다. `prefers-reduced-motion: reduce`는 이 Chrome에서 꺼져 있어(matchMedia false) 기본 검정입니다. MDN은 '컨테이너 쿼리는 미디어 쿼리의 대안'이라고 적습니다. container-type이 normal(기본)이면 크기 쿼리 컨테이너가 아닙니다.",
        code: ".cq { container-type: inline-size; container-name: card; }\n.cq-target { color: red; }\n@container card (min-width: 400px) { .cq-target { color: blue; } }\n.cq-unit { width: 50cqi; }\n\n500px 컨테이너 안:  cs(\"cq-t1\", \"color\") = \"rgb(0, 0, 255)\"   cs(\"cq-unit\", \"width\") = \"250px\"\n300px 컨테이너 안:  cs(\"cq-t2\", \"color\") = \"rgb(255, 0, 0)\"\n\n@media (width >= 600px) { .mq { color: blue; } }     → 창 1728: \"rgb(0, 0, 255)\"\n@media (prefers-reduced-motion: reduce) { … }        → matchMedia(...).matches = false → 기본값",
        terms: [
          {
            term: "container-type",
            body: "size는 두 축을, inline-size는 인라인 축만 다룹니다. normal은 기본값으로, 크기 쿼리 컨테이너가 아니고 이름 쿼리와 스타일 쿼리만 됩니다. size/inline-size는 레이아웃, 스타일, 크기 격리(containment)를 함께 켭니다. '자식이 컨테이너 크기를 바꾸면 무한 루프'를 막기 위해서입니다. 그래서 컨테이너는 자기 콘텐츠로 그 축의 크기를 정할 수 없습니다. 쌓임 맥락도 생깁니다(8장).",
          },
        ],
      },
      {
        label: "미디어 쿼리: 타입, 특징, 범위, 논리",
        body: "형식은 `@media [타입] (특징)`입니다. 타입은 all(기본), screen, print입니다. 특징은 이산형(orientation)과 범위형(width, height, resolution에 min-/max-)이 있습니다. 범위 문법 `(400px <= width <= 800px)`이 min/max 쌍을 대신하고, `<`로 경계를 뺄 수도 있습니다. 논리 연산자는 `and`, `not`, `,`(or), `or`입니다. 'and·not과 같은 수준에 or는 못 씀'이라 괄호로 묶습니다. 사용자 선호는 `prefers-color-scheme: dark`, `prefers-reduced-motion: reduce`, `prefers-contrast`, `forced-colors`로 묻습니다. 입력은 `(hover: hover)`(호버 가능)와 `(pointer: coarse)`(터치)로 가립니다. 쿼리가 거짓이어도 `<link media>` 스타일시트는 '그래도 다운로드된다'고 MDN은 적습니다. 우선순위만 낮습니다. 모바일에서는 `<meta name=\"viewport\" content=\"width=device-width\">`가 있어야 미디어 쿼리가 동작합니다.",
        code: "@media (width >= 600px) { }                 /* 범위 문법 = (min-width: 600px) */\n@media (400px <= width < 800px) { }\n@media screen and (prefers-color-scheme: dark) { }\n@media (hover: hover) and (pointer: fine) { .btn:hover { … } }   /* 터치에서 hover 잔상 방지 */\n@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }\n@media print { nav { display: none; } }",
      },
      {
        label: "컨테이너 쿼리 더 보기: 이름, 단위, 스타일 쿼리",
        body: "`container-name`으로 어느 조상을 볼지 고릅니다. 이름이 없으면 가장 가까운 컨테이너를 봅니다. 단위 cqw, cqh, cqi, cqb, cqmin, cqmax는 컨테이너의 1%이고, '적합한 컨테이너가 없으면 작은 뷰포트 단위로' 떨어집니다. 스타일 쿼리 `@container style(--theme: dark)`는 커스텀 속성 값으로 분기하며, container-type이 필요 없습니다. MDN은 '현재 지원되는 스타일 특징은 커스텀 속성만'이라고 적습니다. 등록(@property)된 속성은 초깃값과 다를 때만 참입니다. 값은 문자열로 비교하지만, `@property`로 등록하면 계산값으로 비교합니다.",
        code: ".sidebar { container: sidebar / inline-size; }     /* 단축: 이름 / 타입 */\n@container sidebar (width < 300px) { .card { flex-direction: column; } }\n\n.card h2 { font-size: clamp(1rem, 4cqi, 2rem); }   /* 컨테이너에 비례 */\n\n.theme { --theme: dark; }\n@container style(--theme: dark) { .card { background: #222; } }   /* 스타일 쿼리 */",
      },
      {
        label: "논리 속성: 좌우가 아니라 시작과 끝",
        body: "`margin-left` 대신 `margin-inline-start`, `width` 대신 `inline-size`, `top` 대신 `inset-block-start`를 씁니다. 인라인 축은 '글이 흐르는 방향', 블록 축은 '블록이 쌓이는 방향'입니다. 물리 방향은 `writing-mode`와 `direction`에 따라 바뀝니다. 실제로 `writing-mode: vertical-rl; inline-size: 100px; block-size: 200px` 요소는 축이 돌아가 계산값이 width 200px, height 100px였습니다. `margin-inline-start: 10px`은 margin-top 10px로, `padding-block-start: 5px`은 padding-right 5px로 바뀌었습니다. 아랍어나 히브리어(RTL), 세로쓰기를 지원해야 하는 i18n에서 이것이 '한 번 쓰면 모든 방향에서 맞는' 길입니다.",
        code: ".lg { writing-mode: vertical-rl; inline-size: 100px; block-size: 200px; margin-inline-start: 10px;\n  padding-block-start: 5px; }\n\ncs(\"lg\", \"width\")   // \"200px\"  (inline-size 가 세로축으로)\ncs(\"lg\", \"height\")  // \"100px\"\nmargin-inline-start 10px → margin-top: 10px   (vertical-rl 의 인라인 시작 = 위)\npadding-block-start 5px  → padding-right: 5px (vertical-rl 의 블록 시작 = 오른쪽)\n\n물리         논리 (가로쓰기 LTR 기준)\nwidth        inline-size\nheight       block-size\nmargin-left  margin-inline-start\ntop          inset-block-start\ntext-align: left   text-align: start",
      },
      {
        label: "문제가 나는 경우: 반응형에서",
        body: "쿼리가 안 켜지거나 뜻밖에 켜지는 자리들입니다.",
        code: "증상                                원인                              처방\n─────────────────────────────────  ───────────────────────────────  ─────────────────────────────\n모바일에서 미디어 쿼리가 안 먹는다      viewport meta 없음 → 980px 가상 뷰포트  <meta name=viewport\n                                                                    content=\"width=device-width\">\n@container 가 안 먹는다               조상에 container-type 없음 (normal)  container-type: inline-size\n컨테이너가 콘텐츠 높이를 안 가진다       container-type: size 는 블록 축도 격리  inline-size 로\ncqi 가 뷰포트 크기처럼 나온다          적합한 컨테이너 없음 → 작은 뷰포트 단위  컨테이너 선언 확인\n터치 기기에서 hover 스타일이 남는다      터치 뒤 hover 유지                 @media (hover: hover)\n미디어 쿼리 안에서 var() 를 썼는데 무효   '변수는 미디어·컨테이너 쿼리 안에서 동작 안 함'  값을 직접 · 또는 스타일 쿼리\nRTL 에서 아이콘 마진이 반대            margin-left 는 물리                margin-inline-start",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 창이면 미디어, 자리면 컨테이너, 방향이면 논리",
        body: "반응형에는 세 축이 있습니다. 미디어 쿼리는 문서 전체가 함께 쓰는 조건(창 크기, 장치, 사용자 선호)이라 페이지 골격과 접근성 선호에 맞습니다. 컨테이너 쿼리는 컴포넌트가 어디에 놓이든 자기 자리에 맞추므로 재사용 컴포넌트에 맞습니다. 논리 속성은 같은 스타일이 쓰기 방향을 따라 돌게 하므로 i18n에 맞습니다. 요즘 기본형은 셋을 섞는 것입니다. 페이지는 미디어로 열 수를 정하고, 카드는 컨테이너로 자기 배치를 정하고, 안의 간격은 논리 속성으로 적습니다. 그 사이를 4장의 clamp() 유동 값이 '쿼리 없는 반응'으로 메웁니다.",
        code: "기준        도구                      맞는 자리\n─────────  ───────────────────────  ───────────────────────────────\n창 · 장치   @media · vw · dvh         페이지 골격 · 다크 모드 · 모션 선호 · 인쇄\n놓인 자리   @container · cqi          재사용 컴포넌트 (카드 · 위젯)\n쓰기 방향   논리 속성 · start/end     RTL · 세로쓰기 (i18n)\n연속        clamp() · min() · max()   유동 글자 크기 · 간격 (쿼리 없이)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "쿼리 안에서 `var()`를 못 쓰는 이유와, 대신 커스텀 속성으로 테마와 토큰을 세우는 법은 11장입니다. 논리 속성의 쓰임은 i18n 허브의 '텍스트 방향' 단계에 있습니다. 뷰포트 메타가 레이아웃 뷰포트를 바꾸는 방식은 렌더링 허브에서 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) 같은 컴포넌트가 두 컨테이너에서 다른 색이 된 이유를 `container-type`으로 설명하세요.\n2) `container-type: inline-size`가 함께 가져오는 격리는 무엇을 막기 위한 것인가요?\n3) `(400px <= width < 800px)`를 옛 문법으로 쓰면?\n4) `margin-inline-start`가 `vertical-rl`에서 어느 물리 방향이 됐나요?",
      },
    ],
    sources: [
      { label: "MDN — Using media queries", href: `${MDN}/Guides/Media_queries/Using` },
      { label: "MDN — CSS container queries", href: `${MDN}/Guides/Containment/Container_queries` },
      { label: "MDN — Container size and style queries", href: `${MDN}/Guides/Containment/Container_size_and_style_queries` },
      { label: "MDN — Basic concepts of logical properties and values", href: `${MDN}/Guides/Logical_properties_and_values/Basic_concepts` },
    ],
  },

  {
    id: "css-s11",
    name: "11장 · 커스텀 속성과 함수",
    tagline: "--이름은 상속되는 값 저장소이고, 잘못된 var()는 무시되지 않고 초깃값이 된다",
    intro:
      "커스텀 속성은 `--brand: #0a0`처럼 선언하고 `var(--brand, 대체값)`으로 읽는, 상속되는 값 저장소입니다. 일반 선언과 크게 다른 점이 하나 있습니다. 잘못된 값을 `var()`로 넣어도 그 선언은 무시되지 않습니다. '계산값 시점에 무효'가 되어 속성이 초깃값(또는 상속값)으로 떨어집니다. `@property`로 타입, 상속 여부, 초깃값을 등록하면 타입 검사와 애니메이션이 됩니다. 그 위에서 calc(), 색 함수, color-mix(), light-dark()가 계산합니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 같은 '잘못된 값'이 다르게 끝난다",
        body: "`.cp-invalid-plain { color: green; color: 16px }`에서 16px는 색이 아니라서 파싱 때 버려집니다. 앞의 green이 남아 실제로 초록이었습니다. `.cp-invalid { color: green; color: var(--text-color) }`에 `--text-color: 16px`를 주면 다릅니다. var()는 파싱 때 유효하므로 green을 덮습니다. 계산값 시점에야 16px가 색이 아님을 알고 '계산값 시점 무효'가 됩니다. 결과는 green이 아니라 초깃값 검정, 실제로 `rgb(0, 0, 0)`이었습니다. MDN의 예와 같습니다. 대체값을 보면 `var(--nope, red)`는 red, 중첩 `var(--nope, var(--brand, red))`는 brand(파랑)가 됩니다. 대체값은 '첫 콤마부터 끝까지'라서 `var(--x, 1px, 2px)`의 대체는 `1px, 2px`입니다. 이름은 대소문자를 가립니다.",
        code: ":root { --text-color: 16px; --brand: blue; }\n\n.cp-invalid-plain { color: green; color: 16px; }            → \"rgb(0, 128, 0)\"  (파싱 무효 → 무시 → green)\n.cp-invalid       { color: green; color: var(--text-color); } → \"rgb(0, 0, 0)\"    (계산값 시점 무효 → 초깃값!)\n.cp-fallback      { color: var(--nope, red); }               → \"rgb(255, 0, 0)\"\n.cp-nested        { color: var(--nope, var(--brand, red)); }  → \"rgb(0, 0, 255)\"",
        terms: [
          {
            term: "계산값 시점 무효 (invalid at computed-value time)",
            body: "`var()`를 치환한 값이 그 속성에 맞지 않을 때의 상태입니다. 파서가 var()를 통과시켜 앞선 선언은 이미 덮였습니다. 계산 시점에는 되돌아갈 선언이 없어서 상속 속성은 부모 값, 비상속 속성은 초깃값이 됩니다. '대체값은 정의되지 않았거나 무효인 변수용이고, 브라우저가 커스텀 속성을 모를 때를 위한 것이 아니다'.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: @property가 타입, 상속, 초깃값을 정한다",
        body: "`@property --typed { syntax: \"<length>\"; inherits: false; initial-value: 7px }`를 두고 `--typed: not-a-length`를 주면 `width: var(--typed)`가 7px이 됩니다. 등록한 초깃값으로 떨어진 것이고, 실제로 그랬습니다. 유효한 `42px`를 주면 42px입니다. `inherits: false`라서 부모에 `--typed: 99px`가 있어도 자식은 실제로 7px이었습니다. 등록하지 않은 커스텀 속성은 모두 상속됩니다. `--inh: 3`인 부모 아래에서 `calc(var(--inh) * 10px)`는 30px이었습니다. MDN에 따르면 세 디스크립터 중 syntax와 inherits는 필수입니다. initial-value는 syntax가 `\"*\"`가 아니면 필수이고, '하나라도 빠지면 규칙 전체가 무효'입니다. initial-value는 계산 독립적이어야 해서 `3em`은 안 되고 `10px`는 됩니다. 등록하면 숫자, 색, 길이로 '보간'되어 트랜지션과 애니메이션이 됩니다(12장). 등록하지 않으면 이산으로 바뀝니다.",
        code: "@property --typed { syntax: \"<length>\"; inherits: false; initial-value: 7px; }\n\n.cp-typed    { --typed: not-a-length; width: var(--typed); }  → \"7px\"   (타입 검사 → 초깃값)\n.cp-typed-ok { --typed: 42px; width: var(--typed); }          → \"42px\"\n<div style=\"--typed: 99px\"><div class=\"cp-noinherit-child\">  → \"7px\"   (inherits: false)\n\n.cp-inherit-parent { --inh: 3; } .cp-inherit-child { width: calc(var(--inh) * 10px); } → \"30px\" (미등록은\n  상속)\n\n/* 애니메이션 가능한 커스텀 속성 */\n@property --angle { syntax: \"<angle>\"; inherits: false; initial-value: 0deg; }\n.spin { background: conic-gradient(from var(--angle), …); transition: --angle 300ms; }\n.spin:hover { --angle: 90deg; }",
      },
      {
        label: "함수들: 색과 계산",
        body: "색 함수에는 `rgb()` `hsl()` `hwb()` `lab()` `lch()` `oklab()` `oklch()` `color()` `color-mix()` `light-dark()` `contrast-color()`가 있습니다. 실제 계산값은 이렇습니다.\n`color-mix(in srgb, red 50%, blue)`는 `color(srgb 0.5 0 0.5)`입니다.\n`oklch(70% 0.1 200)`는 `oklch(0.7 0.1 200)`로 직렬화됩니다.\n상대 색 `rgb(from var(--c) r g b / 50%)`는 `color(srgb 1 0 0 / 0.5)`입니다.\n`light-dark(black, white)`는 `color-scheme: light`에서 black, `currentColor`는 그 요소의 color(초록)입니다.\noklch는 '지각적으로 균일'해서 L을 고정하고 H만 돌리면 밝기가 같은 팔레트가 나옵니다. `calc()`에는 var()를 섞을 수 있고(`calc(var(--gap) * 2)`), `min()` `max()` `clamp()`로 경계를 정합니다. 단위 규칙은 4장과 같습니다. 단위 없는 숫자를 변수에 두고 `calc(var(--n) * 1px)`로 단위를 붙입니다. `var(--n)px`처럼 이어 붙이면 안 됩니다.",
        code: ".col-mix  { color: color-mix(in srgb, red 50%, blue); }   → \"color(srgb 0.5 0 0.5)\"\n.col-rel  { --c: red; color: rgb(from var(--c) r g b / 50%); } → \"color(srgb 1 0 0 / 0.5)\"\n.col-ld   { color-scheme: light; color: light-dark(black, white); } → \"rgb(0, 0, 0)\"\n.col-cur  { color: green; border: 1px solid; }  → border-top-color \"rgb(0, 128, 0)\" (currentColor)\n\n/* 토큰 → 파생 */\n:root { --space: 4; --brand: oklch(60% 0.15 250); }\n.card { padding: calc(var(--space) * 2px); background: oklch(from var(--brand) calc(l + 0.3) c h); }",
      },
      {
        label: "문제가 나는 경우: 변수를 쓸 때",
        body: "커스텀 속성에서 자주 보는 것들입니다.",
        code: "증상                                   원인                                     처방\n────────────────────────────────────  ──────────────────────────────────────  ───────────────────────────\n잘못된 토큰 하나에 색이 검정으로 떨어졌다   계산값 시점 무효 → 초깃값 (앞 선언으로 안 돌아감)  @property 초깃값 · 대체값\n@media 안에 var() 가 안 먹는다            변수는 쿼리 안에서 불가                     값 직접 · @container style()\n변수에 'px' 를 붙여 쓰려는데 안 된다        var(--n)px 는 문자열 연결이 아님             calc(var(--n) * 1px)\n커스텀 속성 transition 이 뚝뚝 끊긴다       미등록은 이산 보간                          @property syntax 등록\n자식에서 변수 값이 바뀌었는데 부모 효과가 안 바뀜  값은 '쓰는 자리' 에서 계산 — 부모는 자기 값으로  부모에서 재선언\n--My-color 가 안 잡힌다                   대소문자 구분                               이름 통일\n:root 에 둔 값이 shadow DOM 에 안 들어온다 (반대)  커스텀 속성은 shadow 경계를 상속으로 통과한다 — 들어온다  의도면 OK\n                                            · 아니면 재설정\n선택자 이름이나 속성 이름에 var() 를 썼다    var() 는 값 자리에만                        전처리기",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 커스텀 속성은 토큰이고, 치환은 쓰는 자리에서 일어난다",
        body: "커스텀 속성의 값은 정의한 자리에서 계산되지 않고 '쓰는 요소'에서 치환됩니다. 그래서 상속을 타고 내려가 자식마다 다르게 풀릴 수 있고(테마 스위치 `.dark { --bg: … }` 하나로 아래 전부가 바뀜), 거꾸로 부모의 효과는 자식의 재선언에 영향받지 않습니다. 치환이 늦게 일어나는 대가가 '계산값 시점 무효' — 파서가 검증할 수 없으니 틀린 값이 초깃값으로 떨어집니다. `@property`는 그 검증을 등록 시점으로 당기고(타입), 상속을 끄고(컴포넌트 지역 변수), 보간을 켭니다(애니메이션). 디자인 토큰 체계는 결국 ':root의 원시 토큰 → 컴포넌트의 의미 토큰 → 속성' 세 층의 var() 사슬입니다.",
        code: ":root        { --blue-500: oklch(60% 0.15 250); }          ← 원시 토큰 (값)\n.button      { --btn-bg: var(--blue-500); }                 ← 의미 토큰 (역할)\n.button      { background: var(--btn-bg); }                 ← 속성 (쓰는 자리에서 치환)\n.dark        { --blue-500: oklch(75% 0.12 250); }           ← 한 줄로 아래 전부 바뀜\n\n치환 시점: 쓰는 요소의 계산값 단계 → 실패하면 초깃값/상속값 (파싱 단계가 아니라 되돌릴 선언이 없다)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "12장 트랜지션과 애니메이션은 등록된 커스텀 속성이 '보간'된다는 데서 출발합니다. 무엇이 보간되고 무엇이 이산으로 바뀌는지, display를 트랜지션하는 법까지 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) `color: green; color: 16px`와 `color: green; color: var(--x)`(--x가 16px)의 결과가 다른 이유는?\n2) `@property`의 필수 디스크립터와 '규칙 전체 무효' 조건은?\n3) `inherits: false`가 쓰이는 자리는?\n4) `var(--n)px`가 안 되는 이유와 대안은?",
      },
    ],
    sources: [
      { label: "MDN — Using CSS custom properties (variables)", href: `${MDN}/Guides/Cascading_variables/Using_custom_properties` },
      { label: "MDN — @property", href: `${MDN}/Reference/At-rules/@property` },
      { label: "MDN — CSS colors", href: `${MDN}/Guides/Colors` },
    ],
  },

  {
    id: "css-s12",
    name: "12장 · 트랜지션 · 애니메이션 · 트랜스폼",
    tagline: "값의 변화를 시간 위에 펴고, 상자를 흐름 밖에서 움직인다",
    intro:
      "트랜지션은 속성값이 바뀔 때 그 사이를 보간해 암묵적 애니메이션을 만듭니다. `@keyframes` 애니메이션은 거쳐 갈 상태들을 직접 적어 시간 위에 놓습니다. 길이, 색, 숫자, transform은 보간되는 속성이고, display와 visibility는 이산 속성입니다. display를 트랜지션하려면 `transition-behavior: allow-discrete`와 `@starting-style`이 필요합니다. 트랜스폼은 레이아웃을 건드리지 않고 좌표계를 바꿉니다. 대신 포함 블록과 쌓임 맥락을 만듭니다(8장). 캐스케이드에서 애니메이션은 normal보다 위에, 트랜지션은 그 모두보다 위에 있습니다(2장).",
    blocks: [
      {
        label: "실제로 돌려 보면: 이벤트 순서와 auto의 함정",
        body: "`transition: width 100ms`인 요소의 너비를 클래스로 100에서 200으로 바꿨습니다. 바꾼 순간 `getComputedStyle().width`는 아직 100px였습니다. 트랜지션은 다음 스타일 계산부터 시작합니다. 이벤트는 transitionrun, transitionstart, …, `transitionend`(propertyName width, elapsedTime 100ms) 순이었고, 600ms 뒤 200px가 됐습니다.\n\n`height: auto`에 `transition: height`를 걸면 자식 높이를 바꿔도 곧바로 60px가 됩니다. MDN은 '명세는 auto 로의/로부터의 애니메이션을 권하지 않는다'고 적습니다. 처방은 `interpolate-size: allow-keywords`, `calc-size()`, grid-template-rows 0fr→1fr 트릭입니다.\n\n막 삽입했거나 display:none에서 바뀐 요소는 '초기 상태가 없었던 것처럼' 처리되므로 `@starting-style`이 필요합니다.",
        code: ".tr { width: 100px; transition: width 100ms linear; }  .tr.go { width: 200px; }\n\n클래스 추가 직후:  cs(\"tr\", \"width\") = \"100px\"      (아직)\n이벤트:  transitionrun → transitionstart → transitionend:width:100ms\n600ms 뒤:          \"200px\"\n\n.tr-auto { height: auto; transition: height 100ms; }  자식 20 → 60px\n바꾼 직후:         cs(\"tr-auto\", \"height\") = \"60px\"  ← 보간 없음 (auto)\n\n/* auto 를 보간하려면 */\n.panel { interpolate-size: allow-keywords; transition: height 300ms; }   /* 또는 height: calc-size(auto,\n  size) */",
      },
      {
        label: "실제로 돌려 보면: display를 트랜지션하기",
        body: "display를 트랜지션하려면 allow-discrete와 @starting-style이 함께 필요합니다. `display: none; opacity: 0`을 `display: block; opacity: 1`로 바꾸며 `transition: opacity 100ms, display 100ms allow-discrete`와 `@starting-style { opacity: 0 }`을 두었습니다. `display-transition:opacity` 이벤트가 왔고, 끝 값은 display block, opacity 1이었습니다.\n\nMDN에 따르면 display와 content-visibility는 '50% 지점에서 뒤집히는' 이산 애니메이션입니다. 다만 none과 오갈 때는 0%(보이기)나 100%(숨기기)에서 뒤집혀 내용이 내내 보입니다.\n\n`@starting-style`은 '요소가 첫 스타일 업데이트를 받을 때'의 출발값이고, '트랜지션에만 관련'됩니다. 특이성이 같으니 원 규칙 '뒤'에 둡니다. 팝오버와 다이얼로그의 등장 애니메이션이 이 둘로 됩니다.",
        code: ".tr-display { display: none; opacity: 0; transition: opacity 100ms, display 100ms allow-discrete; }\n.tr-display.go { display: block; opacity: 1; @starting-style { opacity: 0; } }\n\n이벤트:  display-transition:opacity        (opacity 는 보간, display 는 이산)\n끝:      display \"block\" · opacity \"1\"\n\n/* 숨길 때도 되게: 양쪽에 allow-discrete, 사라지는 쪽은 display 가 100% 에서 none 으로 */\n[popover] { transition: opacity .2s, display .2s allow-discrete, overlay .2s allow-discrete; opacity: 0; }\n[popover]:popover-open { opacity: 1; @starting-style { opacity: 0; } }",
        terms: [
          {
            term: "보간 (interpolation)과 이산 (discrete)",
            body: "길이, 색, 숫자, 각도, transform은 두 값 사이를 계산해 부드럽게 바뀝니다(보간). display, visibility, font-family처럼 사이값이 없는 속성은 50%에서 한 번에 바뀝니다(이산). `transition-behavior: allow-discrete`가 없으면 이산 속성은 트랜지션되지 않습니다. 등록하지 않은 커스텀 속성도 이산입니다(11장).",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: @keyframes와 fill-mode, 트랜스폼의 좌표",
        body: "`animation: slide 100ms 50ms both`에서 첫 시간은 duration, 둘째는 delay입니다. 이벤트는 animationstart, animationend 순이었고, elapsedTime은 delay를 뺀 100ms였습니다. `both`/`forwards`는 끝난 뒤에도 마지막 키프레임 값을 유지합니다. `an-fill`의 translate도 끝난 뒤 100px였습니다. MDN은 이 값이 'will-change에 포함된 것처럼' 동작한다고 합니다(쌓임 맥락 등).\n\n`transform: rotate(90deg) translateX(10px)`의 계산값은 `matrix(0, 1, -1, 0, 0, 10)`였고, 100×50 상자가 50×100으로 돌았습니다. 함수는 '오른쪽부터' 적용되어 translate가 먼저입니다. `rotate: 45deg; scale: 2; translate: 10px`처럼 개별 속성은 따로 트랜지션됩니다. `transform-origin` 기본값은 중심(`50px 25px`)입니다. `top left`로 바꾸면 scale(2)가 왼쪽 위에서 커져 rect가 (0,·)에서 200×100이 됩니다.",
        code: "@keyframes slide { from { translate: 0; } to { translate: 100px; } }\n.an { animation: slide 100ms 50ms both; }        /* duration 100, delay 50 */\n이벤트: animationstart → animationend:slide:100ms\n.an-fill { animation: slide 100ms forwards; }    끝난 뒤 cs(\"an-fill\", \"translate\") = \"100px\"\n\n.tf { width: 100px; height: 50px; transform: rotate(90deg) translateX(10px); }\ncs(\"tf\", \"transform\")        // \"matrix(0, 1, -1, 0, 0, 10)\"   r(\"tf\") → 50×100\ncs(\"tf\", \"transform-origin\") // \"50px 25px\" (중심)\n.tf-ind { rotate: 45deg; scale: 2; translate: 10px 0; }   // 계산값 각각 \"45deg\" \"2\" \"10px\"\n.tf-origin { transform: scale(2); transform-origin: top left; }  → rect 200×100, 왼쪽 위 고정",
      },
      {
        label: "성능과 접근성: 무엇을 움직일 것인가",
        body: "MDN은 '박스 모델에 영향을 주는 속성을 바꾸면 성능에 나쁘다'고 적습니다. width, margin, top을 애니메이션하면 프레임마다 레이아웃이 다시 돕니다. `transform`과 `opacity`는 레이아웃과 페인트 없이 합성 단계에서 처리되어 가장 쌉니다(렌더링 허브의 합성 장). 그래서 '이동은 translate로, 크기는 scale로'가 기본입니다. `will-change`는 레이어를 미리 떼어 두라는 힌트입니다. 남발하면 메모리를 쓰고, 8장의 두 트리인 포함 블록과 쌓임 맥락을 어지럽힙니다. 접근성을 위해 `prefers-reduced-motion: reduce`일 때는 큰 움직임을 끄거나 줄입니다(10장). 스크롤 연동 애니메이션은 `animation-timeline: scroll()`/`view()`로 JS 없이 만듭니다(Chrome 156 지원 true).",
        code: "/* 싼 것 (합성만) */           /* 비싼 것 (레이아웃 → 페인트 → 합성) */\ntransform: translateX(…)        left / margin-left\ntransform: scale(…)             width / height\nopacity                         display / visibility (이산)\n\n@media (prefers-reduced-motion: reduce) { .hero { animation: none; transition-duration: 0.01ms; } }\n\n.bar { animation: grow linear both; animation-timeline: scroll(root); }   /* 스크롤 연동 */",
        codeLang: "text",
      },
      {
        label: "문제가 나는 경우: 안 움직이거나 뚝뚝 끊길 때",
        body: "움직임에서 자주 보는 것들입니다.",
        code: "증상                              원인                             처방\n───────────────────────────────  ──────────────────────────────  ─────────────────────────────\nheight: auto 로 트랜지션이 안 된다   auto 는 보간 불가                  interpolate-size · calc-size ·\n                                                                grid 0fr→1fr\ndisplay: none 토글에 페이드가 안 된다  display 는 이산 · 초기 상태 없음     allow-discrete + @starting-style\n막 삽입한 요소의 트랜지션이 안 된다   첫 스타일 업데이트엔 트랜지션 없음    @starting-style (또는 한 프레임 뒤 클래스)\n커스텀 속성 트랜지션이 뚝 바뀐다      미등록 → 이산                     @property syntax 등록\n트랜지션 중 끝 이벤트가 안 온다       중간에 취소됨 (transitioncancel)   transitioncancel 도 처리\nfixed 자식이 transform 부모에 갇힌다  transform 이 포함 블록 생성 (8장)   부모 transform 제거 · Portal\n애니메이션이 !important 를 뚫는다/안 뚫는다  animations 는 normal 위, !important 아래; transitions 는 전부 위 (2장)\n                                     레이어·우선순위 확인\n스크롤이 버벅인다                   top/left/width 애니메이션 → 레이아웃  transform/opacity 로",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 시간 축의 세 층, 무엇이 어떻게 어디서 바뀌나",
        body: "트랜지션·애니메이션은 '값이 시간에 따라 어떻게 바뀌나'(보간 vs 이산, easing, delay)를 정하고, 트랜스폼은 '그 값이 상자를 어떻게 움직이나'(레이아웃 밖 좌표 변환)를 정하며, 렌더링 파이프라인은 '어느 단계가 다시 도나'(레이아웃 · 페인트 · 합성)를 정합니다. 세 층이 만나는 자리가 성능 규칙입니다 — transform·opacity는 보간되고 합성 단계만 건드리니 싸고, display는 이산이고 레이아웃을 바꾸니 트랜지션에 특별한 문법이 필요하고, 커스텀 속성은 등록해야 보간됩니다. 캐스케이드 순서(애니메이션 > normal, 트랜지션 > 전부)는 '움직이는 중의 값은 그 어떤 선언보다 우선'이라는 설계입니다.",
        code: "값의 변화    보간: length · color · number · transform · 등록된 --var    이산: display · visibility ·\n                                                                    미등록 --var\n시간         transition (상태 바뀔 때 암묵)  ·  @keyframes animation (명시 열)  ·  animation-timeline: scroll()\n상자 이동     transform / translate·rotate·scale (레이아웃 불변, 포함 블록·쌓임 맥락 생성)\n파이프라인    합성만 (transform · opacity)  <  페인트 (color · background)  <  레이아웃 (width · top · display)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "글꼴 로딩도 '시간'의 문제입니다. 폰트가 오기 전후의 글자 교체(FOUT/FOIT)와 `font-display`는 13장에서 다룹니다. transform과 opacity가 싼 이유는 렌더링 허브의 합성·레이어 장이 파이프라인 쪽에서 설명합니다.",
      },
      {
        label: "확인 질문",
        body: "1) `height: auto` 트랜지션이 즉시 바뀐 이유와 두 가지 처방은?\n2) display를 페이드와 함께 토글하려면 필요한 두 문법은?\n3) `transform: rotate(90deg) translateX(10px)`에서 먼저 적용되는 함수는?\n4) transform·opacity가 '싼' 이유를 파이프라인 단계로 설명하세요.",
      },
    ],
    sources: [
      { label: "MDN — Using CSS transitions", href: `${MDN}/Guides/Transitions/Using` },
      { label: "MDN — Using CSS animations", href: `${MDN}/Guides/Animations/Using` },
      { label: "MDN — Using CSS transforms", href: `${MDN}/Guides/Transforms/Using` },
      { label: "MDN — @starting-style", href: `${MDN}/Reference/At-rules/@starting-style` },
    ],
  },

  {
    id: "css-s13",
    name: "13장 · 글꼴과 텍스트",
    tagline: "@font-face가 파일을 글꼴 이름에 묶고, font-display가 기다리는 법을 정한다",
    intro:
      "`font-family`는 대체 목록(스택)입니다. 맨 끝의 일반 가족(sans-serif, system-ui)이 마지막 보루입니다. 웹 폰트는 `@font-face`로 파일(src)을 이름에 묶습니다. `font-display`는 '폰트가 오기 전에 무엇을 보여 줄까'를 정합니다. 값은 block(숨김), swap(대체 글꼴 먼저), fallback, optional입니다. `unicode-range`로 글자 범위마다 파일을 나누고, 가변 폰트는 `@font-face` 하나에 weight 범위를 둡니다. 로딩 상태는 `document.fonts`(CSS Font Loading API)가 알려 줍니다. 텍스트 쪽에서는 줄 높이, 줄바꿈, 말줄임, `text-wrap: balance`를 다룹니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 없는 폰트는 loading → error, 그동안 대체 글꼴",
        body: "`@font-face { font-family: \"ProbeFont\"; src: url(\"missing.woff2\"); font-display: swap }`과 `.ft { font-family: \"ProbeFont\", sans-serif }`를 썼습니다. 계산값 font-family는 스택 그대로 `\"ProbeFont, sans-serif\"`였습니다. `document.fonts`의 상태는 처음 `ProbeFont:loading`, `document.fonts.ready` 뒤 `ProbeFont:error`(404)였고, `document.fonts.check(\"12px ProbeFont\")`는 false였습니다. swap이라 그동안 글자는 sans-serif로 보였습니다.\n\nfont 단축 `italic bold 20px/1.5 system-ui, sans-serif`는 style italic, weight 700, size 20px, line-height 30px(1.5 × 20), family `system-ui, sans-serif`로 계산됐습니다. 단축은 생략한 하위 속성을 초깃값으로 되돌리고, 순서(style variant weight stretch size/line-height family)를 지켜야 합니다.",
        code: "@font-face { font-family: \"ProbeFont\"; src: url(\"missing.woff2\") format(\"woff2\"); font-display: swap; }\n.ft { font-family: \"ProbeFont\", sans-serif; }\n\ncs(\"ft\", \"font-family\")      // \"ProbeFont, sans-serif\"  (스택은 그대로 — 어느 것이 그려졌는지는 안 보임)\n[...document.fonts]           // [\"ProbeFont:loading\"] → fonts.ready 뒤 [\"ProbeFont:error\"]\ndocument.fonts.check(\"12px ProbeFont\")   // false\n\n.ft-stack { font: italic bold 20px/1.5 system-ui, sans-serif; }\n→ style italic · weight 700 · size 20px · line-height 30px · family \"system-ui, sans-serif\"",
      },
      {
        label: "font-display 네 값과 FOIT, FOUT",
        body: "폰트 로딩에는 '차단 기간'(글자를 숨김)과 '교체 기간'(대체 글꼴로 보이다가 오면 바꿈)이 있습니다.\nblock은 차단이 길고(약 3초) 교체는 무한입니다. 글자가 안 보이는 FOIT입니다.\nswap은 차단이 거의 0이고 교체는 무한입니다. 대체 글꼴이 먼저 보이다 바뀌는 FOUT입니다.\nfallback은 차단이 아주 짧고(약 100ms) 교체도 짧습니다(약 3초). 그 안에 안 오면 대체 글꼴로 굳습니다.\noptional은 차단이 아주 짧고 교체가 없습니다. 빨리 안 오면 이번 방문은 대체 글꼴로 보이고, 다음 방문에 캐시된 폰트를 씁니다.\nauto는 브라우저 기본값이며 대개 block과 비슷합니다.\n본문에는 swap이나 optional을 씁니다. 아이콘 폰트에는 block을 씁니다. 대체 글자로는 깨져 보이기 때문입니다. 교체 때의 레이아웃 흔들림(CLS)은 `size-adjust`와 `ascent-override`로 대체 글꼴의 메트릭을 맞춰 줄입니다.",
        code: "값         차단 기간      교체 기간     보이는 것                      쓰는 곳\n────────  ────────────  ──────────  ────────────────────────────  ─────────────────\nblock      ~3s           무한         숨김 → 폰트 (FOIT)              아이콘 폰트\nswap       ~0            무한         대체 → 폰트 (FOUT)              본문 (기본 권장)\nfallback   ~100ms        ~3s          짧게 숨김 → 대체 → 늦으면 대체 고정  본문 (흔들림 적게)\noptional   ~100ms        없음         늦으면 이번엔 대체               성능 우선\n\n/* 대체 글꼴 메트릭 맞추기 — 교체 때 흔들림 줄이기 */\n@font-face { font-family: \"Fallback\"; src: local(\"Arial\"); size-adjust: 105%; ascent-override: 92%; }",
        codeLang: "text",
        terms: [
          {
            term: "FOIT · FOUT",
            body: "Flash Of Invisible Text는 폰트가 올 때까지 글자를 숨깁니다. Flash Of Unstyled Text는 대체 글꼴로 보이다 바뀝니다. 어느 쪽일지는 font-display가 정합니다. 둘 다 '시간'의 문제라 12장의 트랜지션과 같은 축에 있습니다. 교체 순간의 레이아웃 이동은 CLS 지표에 잡힙니다.",
          },
        ],
      },
      {
        label: "@font-face 디스크립터와 가변 폰트, unicode-range",
        body: "`src`에는 여러 후보를 적고, 브라우저는 지원하는 첫 포맷을 씁니다(`url() format(\"woff2\")`, `local()`로 설치된 폰트 우선). `font-weight: 100 900`처럼 범위를 적으면 가변 폰트 하나로 모든 굵기를 씁니다. MDN도 '한 @font-face 선언으로 모든 스타일을 포함한 가변 폰트를 가져올 수 있다'고 적습니다. `unicode-range: U+AC00-D7A3`처럼 글자 범위를 적으면, 그 범위의 글자가 실제로 쓰일 때만 그 파일을 받습니다. 한글(11,172자)·한자처럼 큰 폰트를 서브셋으로 쪼개는 표준 방법입니다. 같은 family 이름으로 여러 @font-face를 두면 범위별로 합쳐집니다. `font-feature-settings` · `font-variation-settings`로 OpenType 기능·축을 직접 건드립니다. 미리 받으려면 `<link rel=\"preload\" as=\"font\" type=\"font/woff2\" crossorigin>`을 씁니다(렌더링 허브).",
        code: "@font-face {\n  font-family: \"Pretendard\";\n  src: local(\"Pretendard\"), url(\"/fonts/pretendard-ko.woff2\") format(\"woff2\");\n  font-weight: 100 900;                 /* 가변 폰트 — 한 파일로 모든 굵기 */\n  font-display: swap;\n  unicode-range: U+AC00-D7A3, U+1100-11FF, U+3130-318F;   /* 한글만 — 쓰일 때 받음 */\n}\n@font-face {\n  font-family: \"Pretendard\";            /* 같은 이름, 다른 범위 → 합쳐짐 */\n  src: url(\"/fonts/pretendard-latin.woff2\") format(\"woff2\");\n  font-display: swap;\n  unicode-range: U+0000-00FF;\n}",
      },
      {
        label: "텍스트: 줄 높이, 줄바꿈, 균형",
        body: "`line-height`는 단위 없는 숫자(1.5)로 적어야 자식이 '비율'을 상속합니다. `150%`나 `24px`는 계산된 px가 상속되므로, 글자 크기가 다른 자식에서 어긋납니다. `overflow-wrap: anywhere`는 긴 토큰도 끊습니다. `word-break: keep-all`은 한국어와 일본어에서 단어 단위로만 끊어 어절을 지킵니다. `hyphens: auto`도 있습니다. `text-wrap: balance`는 제목의 줄 길이를 고르게 맞춥니다(Chrome 156 지원 true). `text-wrap: pretty`는 마지막 줄의 외톨이 단어를 줄입니다. `white-space`와 `text-overflow: ellipsis` 조합은 9장에서 다룹니다. 세로쓰기와 RTL의 `text-align: start`는 10장의 논리값입니다.",
        code: "body { line-height: 1.5; }        /* 숫자 — 비율로 상속 */\nh1   { text-wrap: balance; }       /* 줄 길이 균형 */\np    { text-wrap: pretty; overflow-wrap: anywhere; }\n.ko  { word-break: keep-all; }      /* 한국어 어절 보존 */\n\n/* line-height 단위의 차이 */\n.parent { font-size: 16px; line-height: 1.5; }   .child { font-size: 32px; }  → 자식 48px (비율)\n.parent { font-size: 16px; line-height: 24px; }  .child { font-size: 32px; }  → 자식 24px (겹침!)",
      },
      {
        label: "문제가 나는 경우: 글꼴에서",
        body: "웹 폰트와 텍스트에서 자주 보는 것들입니다.",
        code: "증상                                원인                             처방\n─────────────────────────────────  ──────────────────────────────  ─────────────────────────────\n글자가 잠깐 안 보인다 (FOIT)          font-display: block/auto          swap · optional\n폰트 오면서 레이아웃이 튄다 (CLS)      대체 글꼴 메트릭 차이                size-adjust/ascent-override · preload\n한글 폰트가 2MB                      전체 글리프 한 파일                  unicode-range 서브셋 · woff2\n굵기마다 파일이 다르다                 정적 폰트                          가변 폰트 + font-weight 범위\nbold 가 가짜 굵기 (faux bold)         그 굵기 파일 없음 → 합성             해당 weight 선언 · font-synthesis: none\n자식 줄 간격이 겹친다                  line-height 를 px/% 로               단위 없는 숫자\n한국어 단어가 중간에서 끊긴다           기본 줄바꿈                         word-break: keep-all\n폰트가 적용됐는지 모른다               computed font-family 는 스택 그대로   document.fonts.check · DevTools\n                                                                    Rendered Fonts",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 글꼴은 '파일'이고 텍스트는 '그 파일로 그린 상자'다",
        body: "`font-family`는 이름 목록일 뿐입니다. 실제로 그려지는 글꼴은 '그 글자를 가진 첫 후보 파일'입니다. 그래서 글자(코드 포인트)마다 다른 파일이 쓰일 수 있고, 그 선택을 unicode-range로 설계합니다. 파일은 네트워크로 오니 시간이 걸립니다. font-display는 그동안의 정책입니다. 텍스트는 글꼴의 메트릭(ascent, descent, 글자 폭)으로 줄 상자를 채운 결과입니다. 글꼴이 바뀌면 줄 높이와 줄바꿈이 바뀌고 레이아웃이 움직입니다. 그래서 글꼴 최적화는 '파일 크기(서브셋 · 가변 · woff2) → 로딩 정책(font-display · preload) → 메트릭 맞춤(size-adjust)' 세 겹입니다.",
        code: "font-family 스택  →  글자마다 '가진 첫 파일'      →  파일 로딩 (시간)        →  메트릭으로 줄 상자\n\"A\", \"B\", sans     unicode-range 로 설계           font-display 정책         line-height · 줄바꿈 · CLS\n                   서브셋 · 가변 · woff2            preload · optional        size-adjust · ascent-override",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "마지막 장은 스타일을 '범위'로 가두는 세 도구(중첩, 레이어, @scope)를 다룹니다. 컴포넌트 프레임워크의 scoped CSS와 CSS Modules가 무엇을 흉내 내는지도 봅니다. 글꼴 파일의 preload와 렌더링 차단은 렌더링 허브로, 한국어·일본어 조판은 i18n 허브로 이어집니다.",
      },
      {
        label: "확인 질문",
        body: "1) `document.fonts`의 상태가 loading에서 error로 바뀌는 동안 글자가 보인 이유는?\n2) swap과 optional의 차이를 '교체 기간'으로 설명하세요.\n3) 한글 폰트를 '쓰일 때만' 받게 하는 디스크립터는?\n4) `line-height: 150%`가 자식에서 문제가 되는 이유는?",
      },
    ],
    sources: [
      { label: "MDN — CSS fonts module", href: `${MDN}/Guides/Fonts` },
      { label: "MDN — CSS font loading", href: `${MDN}/Guides/Font_loading` },
      { label: "MDN — @font-face", href: `${MDN}/Reference/At-rules/@font-face` },
      { label: "MDN — CSS text module", href: `${MDN}/Guides/Text` },
    ],
  },

  {
    id: "css-s14",
    name: "14장 · 중첩 · 레이어 · 스코프",
    tagline: "스타일에 범위를 주는 세 도구, 그리고 프레임워크가 그중 무엇을 흉내 내는가",
    intro:
      "CSS의 전역성을 다루는 네이티브 도구 셋입니다. 중첩(nesting)은 선택자를 부모 안에 적어 '어디에 속한 규칙인지'를 코드 구조로 보여 줍니다. 캐스케이드 레이어(@layer)는 규칙 묶음 사이의 우선순위를 특이성과 상관없이 정합니다. @scope는 선택자가 닿는 DOM 범위를 뿌리와 한계로 가둡니다. Vue의 scoped, CSS Modules, BEM은 이 도구들이 없던 시절의 대안입니다. 지금은 셋 다 Chrome 156에서 쓸 수 있습니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 중첩에서 &의 자리와 특이성",
        body: "`.nest { color: red; .child { color: blue } &.mod { color: green } }`에서 자식 `.child`는 파랑입니다. `.nest .child`로 풀리기 때문입니다. `.nest.mod`는 초록입니다. &가 붙어 복합 선택자가 됩니다. `.nest2 { .deep & { color: blue } }`는 `&`를 뒤에 둬서 `.deep .nest2`가 됩니다. 부모 문맥을 자식 뒤에 붙이는 것이고, 실제로 파랑이었습니다. MDN의 규칙은 이렇습니다. 결합자 없이 적으면 자손(`.parent .child`)이 됩니다. 복합으로 붙이려면 `&`가 필수입니다(`&.mod`). `&` 없이 `h2 { + p {} }`처럼 결합자로 시작해도 됩니다. 특이성은 ':is()처럼 연관 선택자 목록 중 가장 높은 것'으로 계산합니다. 경고도 있습니다. '`&__child` 같은 문자열 이어붙이기는 불가'라서 BEM식 Sass 습관이 안 통합니다. 그리고 중첩 규칙 뒤에 오는 선언은 `CSSNestedDeclarations`로 감싸져 순서가 유지됩니다. 하지만 '지원하지 않는 브라우저는 잘못된 순서로 파싱할 수 있다'고 합니다.",
        code: ".nest { color: red;\n  .child { color: blue; }      /* → .nest .child     cs(\"nest-child\") = blue */\n  &.mod  { color: green; }     /* → .nest.mod        cs(\"nest-mod\")   = green */\n}\n.nest2 { .deep & { color: blue; } }   /* → .deep .nest2  cs(\"nest2\") = blue */\n\n/* 안 되는 것 */\n.block { &__elem { } }         /* 문자열 이어붙이기 아님 — .block__elem 이 되지 않는다 */\n/* 되는 것 */\n.card { & h2 { } @media (width >= 600px) { padding: 2rem; } }   /* at-rule 중첩 */",
      },
      {
        label: "실제로 돌려 보면: @scope의 뿌리, 한계, 근접성",
        body: "`@scope (.scope-outer) to (.scope-limit) { p { color: blue } }`에서 뿌리 안의 p는 파랑이고, 한계(.scope-limit) 안의 p는 기본색 검정입니다. '도넛' 스코핑입니다. `@scope (.scope-near) { p { color: red } }`와 `@scope (.scope-far) { p { color: green } }`가 둘 다 맞는 p(far 안의 near 안)는 빨강이었습니다. 가까운 뿌리가 이깁니다. MDN에 따르면 스코프 근접성은 '등장 순서를 이기되 특이성·레이어·중요도에는 진다'고 합니다. 2장 알고리즘 순서의 바로 그 자리입니다. 스코프 안의 선택자는 앞에 `:where(:scope)`가 붙은 것처럼 특이성을 0만 더합니다. `:scope`를 직접 쓰면 0-1-0입니다. 상속은 가두지 않습니다. color 같은 상속 속성은 한계를 넘어 내려갑니다. 지원 상태는 'Baseline 2026, 새로 사용 가능'입니다.",
        code: "@scope (.scope-outer) to (.scope-limit) { p { color: blue; } }\n.scope-outer > p            → \"rgb(0, 0, 255)\"   (뿌리 안)\n.scope-outer .scope-limit p → \"rgb(0, 0, 0)\"     (한계 안 — 제외)\n\n@scope (.scope-near) { p { color: red; } }\n@scope (.scope-far)  { p { color: green; } }\n.scope-far > .scope-near > p → \"rgb(255, 0, 0)\"  (가까운 뿌리가 이김 — 근접성)\n\n/* 컴포넌트 안에서만, 슬롯 내용은 제외 */\n@scope (.card) to (.card-content) { img { border-radius: 8px; } }",
        terms: [
          {
            term: "스코프 근접성 (scoping proximity)",
            body: "같은 요소에 두 스코프 규칙이 맞으면 DOM에서 뿌리가 더 가까운 쪽이 이깁니다. 캐스케이드 순서에서는 특이성 뒤, 등장 순서 앞입니다. 중첩 컴포넌트에서 안쪽 스타일이 바깥 것을 이기게 하는 자연스러운 장치입니다.",
          },
        ],
      },
      {
        label: "레이어로 설계하기: 리셋 → 베이스 → 컴포넌트 → 유틸리티",
        body: "2장에서 본 대로 레이어 순서는 특이성을 이깁니다. 그래서 전체 스타일을 역할별 레이어로 나누면, '유틸리티가 컴포넌트를 항상 이긴다' 같은 약속을 선택자 모양과 상관없이 지킬 수 있습니다. 맨 위에 `@layer reset, base, components, utilities;`를 선언해 순서를 정하고, 파일마다 `@layer components { … }`로 붙입니다. 서드파티 CSS는 `@import url(lib.css) layer(vendor)`로 가장 낮은 레이어에 넣습니다. 그러면 내 스타일이 특이성 싸움 없이 이깁니다. 레이어 밖 선언은 모든 레이어를 이기니 '탈출구'로만 씁니다. `!important`는 순서를 뒤집어, reset 레이어의 important가 가장 셉니다. `revert-layer`는 한 레이어의 선언을 '없었던 것처럼' 되돌립니다.",
        code: "/* 맨 위 — 순서 확정 (여기 적은 순서가 전부) */\n@layer reset, vendor, base, components, utilities;\n\n@import url(\"normalize.css\") layer(reset);\n@import url(\"some-lib.css\") layer(vendor);      /* 라이브러리는 낮은 레이어로 */\n\n@layer base { body { line-height: 1.5; } }\n@layer components { .btn { padding: .5rem 1rem; } .btn-primary { background: var(--brand); } }\n@layer utilities { .p-0 { padding: 0; } }       /* .p-0 (0-1-0) 이 .btn-primary 를 항상 이김 */\n\n/* 레이어 밖 = 모든 레이어 위 — 탈출구로만 */",
      },
      {
        label: "프레임워크의 스코프: Vue scoped, CSS Modules, Tailwind",
        body: "Vue의 `<style scoped>`는 컴파일러가 선택자에 `[data-v-abc123]`를 붙이고, 요소에도 같은 속성을 찍습니다. 그래서 '이 컴포넌트의 요소만' 맞습니다. Vue 허브의 SFC 장에서 실제로 `.a[data-v-abc123]`를 확인했습니다. @scope를 속성으로 흉내 낸 셈입니다. 부작용으로 특이성이 0-1-0씩 올라가고, 자식 컴포넌트의 루트에는 스타일이 샙니다. CSS Modules는 클래스 이름을 `_title_1a2d1_1`처럼 해시로 바꿔 충돌을 없앱니다(번들링 허브에서 실제로 확인). 범위가 아니라 '이름의 유일성'으로 푸는 길입니다. Tailwind 같은 유틸리티는 레이어(`@layer base, components, utilities`)를 실제로 씁니다. 셋의 공통 목표는 '전역 네임스페이스에서 충돌 없이, 예측 가능한 우선순위로'입니다. 네이티브 셋(중첩, @layer, @scope)이 그 목표의 표준 답이 되어 갑니다.",
        code: "도구            방법                                  범위의 뜻                    우선순위\n─────────────  ───────────────────────────────────  ──────────────────────────  ─────────────────────\nVue scoped      .a → .a[data-v-abc]  (속성 선택자)      이 컴포넌트의 요소만            특이성 +0-1-0 (부작용)\nCSS Modules     .title → ._title_1a2d1_1 (해시 이름)    이름이 유일 → 충돌 없음         보통 특이성\nBEM             .block__elem--mod (관례)               사람이 지키는 약속              전부 0-1-0\n@scope          @scope (.card) to (.slot)              DOM 뿌리~한계                   근접성 (특이성 아래)\n@layer          @layer components { … }               (범위 아님) 묶음의 우선순위       특이성 위\n중첩            .card { .title { } }                   코드 구조 = 선택자 구조          :is() 식 특이성",
        codeLang: "text",
      },
      {
        label: "문제가 나는 경우: 범위 도구를 섞을 때",
        body: "세 도구와 프레임워크 스코프가 부딪히는 자리입니다.",
        code: "증상                                     원인                                 처방\n──────────────────────────────────────  ──────────────────────────────────  ─────────────────────────────\nSass 처럼 &__elem 을 썼는데 안 맞는다        네이티브 중첩은 이어붙이기 없음           클래스를 그대로 적기\n중첩 규칙 뒤의 선언이 옛 브라우저에서 순서가 다르다  CSSNestedDeclarations 미지원           선언을 중첩 규칙 '앞'에\n@scope 안인데 color 가 한계 밖으로 샌다      상속은 가두지 않음                     한계 안에서 재설정\n라이브러리 스타일을 못 이긴다                 같은 레이어(비레이어)에서 특이성 싸움       @import … layer(vendor) 로 아래에\n레이어를 썼는데 내 스타일이 진다              비레이어 선언이 레이어를 덮음 · !important 역전  전부 레이어 안으로 ·\n                                                                               important 점검\nVue scoped 가 자식 컴포넌트 안에 안 먹는다    속성이 자식 루트까지만                   :deep() · 또는 @scope\nCSS Modules 클래스를 전역 선택자로 못 잡는다  이름이 해시                            :global() · data 속성",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 세 도구는 캐스케이드의 다른 칸을 다룬다",
        body: "2장의 정렬 키 (출처·중요도) → (레이어) → (특이성) → (근접성) → (순서)에 셋을 놓으면 겹치지 않습니다. @layer는 두 번째 칸(묶음의 순서)을 다룹니다. @scope는 네 번째 칸(근접성)과 '어느 요소에 맞는가'(관련성)를, 중첩은 선택자 자체(세 번째 칸의 재료)를 다룹니다. 그래서 셋은 함께 씁니다. 레이어로 큰 우선순위를 세우고, 스코프로 컴포넌트 범위를 가두고, 중첩으로 그 안의 구조를 적습니다. 프레임워크 스코프는 모두 세 번째 칸(특이성)이나 이름(관련성)에서 싸우던 방법이었습니다. 네이티브 도구는 그 싸움을 다른 칸으로 옮겼습니다.",
        code: "캐스케이드 정렬 키            손대는 도구\n──────────────────────────  ─────────────────────────────────────\n① 관련성 (맞는가)             선택자 · @scope 의 뿌리~한계 · CSS Modules 의 유일 이름\n② 출처 · 중요도               (!important — 레이어 역전 주의)\n③ 레이어                      @layer · @import layer()\n④ 특이성                      선택자 모양 · 중첩(:is 식) · Vue scoped 의 +0-1-0\n⑤ 스코프 근접성               @scope\n⑥ 등장 순서                   파일 순서 · 번들 순서",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "CSS 허브는 여기서 끝납니다. 스타일이 파일로 묶여(CSS Modules, PostCSS, Lightning CSS, 코드 분할) 브라우저에 전달되는 과정은 번들링 허브에 있습니다. 컴포넌트 안의 scoped가 컴파일되는 방식은 Vue 허브의 SFC 장에, 스타일이 레이아웃과 페인트로 바뀌는 과정은 렌더링 허브에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `.a { .b { } &.c { } .d & { } }`가 각각 어떤 선택자로 풀리나요?\n2) @scope의 근접성이 캐스케이드 순서에서 어디에 있고, 무엇에는 지나요?\n3) 라이브러리 CSS를 특이성 싸움 없이 이기는 레이어 설정은?\n4) Vue scoped와 @scope의 차이를 '방법'과 '부작용'으로 적어 보세요.",
      },
    ],
    sources: [
      { label: "MDN — Using CSS nesting", href: `${MDN}/Guides/Nesting/Using` },
      { label: "MDN — @layer", href: `${MDN}/Reference/At-rules/@layer` },
      { label: "MDN — @scope", href: `${MDN}/Reference/At-rules/@scope` },
      { label: "MDN — Cascade layers (Learn)", href: `${LEARN}/Styling_basics/Cascade_layers` },
    ],
  },
];
