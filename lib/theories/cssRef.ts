import type { Theory } from ".";

/**
 * CSS 참고서 — 선택자, 속성, 값과 단위를 찾아보는 쪽.
 *
 * CSS 허브의 1~14장이 순서대로 읽는 쪽이라면, 이 파일은 찾아보는 쪽이다. 항목의 정의(초기값, 상속,
 * 적용 대상, 애니메이션 방식)는 MDN의 mdn-data를, 값 목록과 설명은 mdn/content 원문을, 지원 버전은
 * browser-compat-data를 옮겼다. 직접 해 보기(block.lab)의 지금 값은 작은 창에서 계속 다시 잰 계산값이다.
 */

const MDN = "https://developer.mozilla.org/en-US/docs/Web/CSS";

export const cssRefTheories: Theory[] = [  {
    id: "css-sels",
    name: "선택자 참고서",
    tagline: "요소를 고르는 식 77가지를 여덟 묶음으로 나눈다",
    intro:
      "선택자는 '규칙을 어느 요소에 적용하나'를 정하는 식입니다. 이 참고서는 MDN의 선택자 참고서에서 지금 쓰는 것을 골라 여덟 묶음으로 나눴습니다. 선택자마다 고르는 것, 문법, 특이성, 주의할 점을 적었습니다. 직접 해 보기에서 선택자를 바꾸면 지금 값 칸이 어느 요소가 골라졌는지, 그 요소의 계산된 색이 무엇인지 바로 보여 줍니다. 선택자가 이기는 규칙(캐스케이드와 특이성)은 2장, 문법의 기초는 1장에 있습니다.",
    blocks: [
      {
        label: "여덟 묶음",
        body: "앞의 둘은 요소를 이름이나 속성으로 고르는 선택자입니다. 가운데 넷은 가상 클래스로, 트리에 적히지 않은 상태나 자리를 고릅니다. 가상 요소는 HTML에 없는 '부분'을 만들어 고르고, 결합자는 두 선택자의 관계를 잇습니다.",
        tables: [
          {
            head: ["장", "선택자", "고르는 것"],
            rows: [
              ["기본 선택자와 목록", "*, 태그, .class, #id, 목록(,), &", "이름으로 고르기"],
              ["속성 선택자", "[a], [a=v], [a~=v], [a|=v], [a^=v], [a$=v], [a*=v]", "속성과 그 값으로 고르기"],
              ["사용자 동작 가상 클래스", ":link, :visited, :hover, :active, :focus, :focus-visible, :focus-within, :target", "사용자가 지금 하는 일"],
              ["폼 상태 가상 클래스", ":checked, :disabled, :required, :invalid, :user-invalid, :placeholder-shown 등", "폼 칸의 상태"],
              ["구조 가상 클래스", ":root, :empty, :first-child, :nth-child(), :nth-of-type() 등", "트리 안의 자리"],
              ["논리, 언어, 상태 가상 클래스", ":is(), :where(), :has(), :not(), :lang(), :dir(), :modal 등", "조건을 묶고 뒤집기"],
              ["가상 요소", "::before, ::after, ::first-line, ::marker, ::placeholder, ::backdrop 등", "HTML에 없는 부분"],
              ["결합자", "공백, >, +, ~, ||, |", "두 요소의 관계"],
            ],
          },
        ],
      },
      {
        label: "선택자 전체 목록",
        body: "이 참고서의 선택자를 묶음 순서대로 모두 늘어놓았습니다. 장 이름을 따라가면 그 선택자의 블록이 있습니다.",
        tables: [
          { head: ["선택자", "고르는 것", "장"], rows: [["*","모든 요소","기본 선택자와 목록"],["element","이름이 같은 요소","기본 선택자와 목록"],[".class","class 낱말에 그 이름이 있는 요소","기본 선택자와 목록"],["#id","id가 그 값인 요소","기본 선택자와 목록"],["A, B","A나 B에 맞는 요소","기본 선택자와 목록"],["&","중첩 규칙에서 부모가 고른 요소","기본 선택자와 목록"],["[attr]","그 속성이 있는 요소","속성 선택자"],["[attr=\"v\"]","값이 v와 똑같은 요소","속성 선택자"],["[attr~=\"v\"]","공백으로 나눈 낱말 하나가 v","속성 선택자"],["[attr|=\"v\"]","값이 v이거나 v-로 시작","속성 선택자"],["[attr^=\"v\"]","값이 v로 시작","속성 선택자"],["[attr$=\"v\"]","값이 v로 끝남","속성 선택자"],["[attr*=\"v\"]","값 어딘가에 v가 있음","속성 선택자"],["[attr=\"v\" i]","대소문자를 무시하고 견줌","속성 선택자"],["[attr=\"v\" s]","대소문자를 가려 견줌","속성 선택자"],[":link","아직 방문하지 않은 링크","사용자 동작 가상 클래스"],[":visited","방문한 링크 (색만 바꿀 수 있음)","사용자 동작 가상 클래스"],[":any-link","방문과 상관없이 모든 링크","사용자 동작 가상 클래스"],[":hover","포인터가 올라간 요소","사용자 동작 가상 클래스"],[":active","눌리고 있는 요소","사용자 동작 가상 클래스"],[":focus","포커스를 가진 요소","사용자 동작 가상 클래스"],[":focus-visible","포커스 표시가 필요할 때의 포커스 요소","사용자 동작 가상 클래스"],[":focus-within","자신이나 자손이 포커스를 가진 요소","사용자 동작 가상 클래스"],[":target","주소의 #과 id가 같은 요소","사용자 동작 가상 클래스"],[":checked","체크된 checkbox, radio, 고른 option","폼 상태 가상 클래스"],[":indeterminate","상태가 정해지지 않은 컨트롤","폼 상태 가상 클래스"],[":default","묶음에서 기본인 컨트롤","폼 상태 가상 클래스"],[":disabled","꺼진 컨트롤","폼 상태 가상 클래스"],[":enabled","켜진 컨트롤","폼 상태 가상 클래스"],[":required","required가 있는 input, select, textarea","폼 상태 가상 클래스"],[":optional","required가 없는 input, select, textarea","폼 상태 가상 클래스"],[":valid","값이 제약에 맞는 요소","폼 상태 가상 클래스"],[":invalid","값이 제약에 어긋난 요소","폼 상태 가상 클래스"],[":user-valid","사용자가 만진 뒤 맞는 요소","폼 상태 가상 클래스"],[":user-invalid","사용자가 만진 뒤 어긋난 요소","폼 상태 가상 클래스"],[":in-range","min, max 안의 값","폼 상태 가상 클래스"],[":out-of-range","min, max 밖의 값","폼 상태 가상 클래스"],[":placeholder-shown","자리표시자가 보이는 칸","폼 상태 가상 클래스"],[":read-only","사용자가 고칠 수 없는 요소","폼 상태 가상 클래스"],[":read-write","사용자가 고칠 수 있는 요소","폼 상태 가상 클래스"],[":autofill","브라우저가 자동으로 채운 input","폼 상태 가상 클래스"],[":open","열린 details, dialog, select 등","폼 상태 가상 클래스"],[":root","문서의 뿌리 요소(HTML이면 html)","구조 가상 클래스"],[":empty","자식이 하나도 없는 요소","구조 가상 클래스"],[":first-child","형제 중 첫째","구조 가상 클래스"],[":last-child","형제 중 마지막","구조 가상 클래스"],[":only-child","형제가 없는 외동 요소","구조 가상 클래스"],[":nth-child()","형제 중 An+B번째","구조 가상 클래스"],[":nth-last-child()","끝에서 센 An+B번째","구조 가상 클래스"],[":first-of-type","같은 태그 중 첫째","구조 가상 클래스"],[":last-of-type","같은 태그 중 마지막","구조 가상 클래스"],[":only-of-type","같은 태그 형제가 없는 요소","구조 가상 클래스"],[":nth-of-type()","같은 태그 중 An+B번째","구조 가상 클래스"],[":nth-last-of-type()","같은 태그를 끝에서 센 An+B번째","구조 가상 클래스"],[":is()","목록 중 하나에 맞는 요소","논리, 언어, 상태 가상 클래스"],[":where()","목록 중 하나에 맞는 요소","논리, 언어, 상태 가상 클래스"],[":has()","인자에 맞는 자손이나 형제가 있는 요소","논리, 언어, 상태 가상 클래스"],[":not()","목록 어느 것에도 안 맞는 요소","논리, 언어, 상태 가상 클래스"],[":lang()","그 언어로 정해진 요소","논리, 언어, 상태 가상 클래스"],[":dir()","글 방향이 ltr 또는 rtl인 요소","논리, 언어, 상태 가상 클래스"],[":scope","선택의 기준점이 되는 요소","논리, 언어, 상태 가상 클래스"],[":defined","정의가 끝난 요소","논리, 언어, 상태 가상 클래스"],[":modal","바깥 조작을 막고 있는 요소","논리, 언어, 상태 가상 클래스"],[":popover-open","열려 있는 팝오버","논리, 언어, 상태 가상 클래스"],[":fullscreen","전체 화면 중인 요소","논리, 언어, 상태 가상 클래스"],["::before","요소의 첫 자식으로 만든 상자","가상 요소"],["::after","요소의 마지막 자식으로 만든 상자","가상 요소"],["::first-letter","블록 첫 줄의 첫 글자","가상 요소"],["::first-line","블록의 첫 줄","가상 요소"],["::selection","사용자가 끌어 고른 부분","가상 요소"],["::marker","목록 항목의 글머리표나 번호","가상 요소"],["::placeholder","입력란의 안내 글","가상 요소"],["::backdrop","최상위 레이어 요소 밑의 막","가상 요소"],["::file-selector-button","파일 입력란의 버튼","가상 요소"],["::details-content","details의 접히는 내용","가상 요소"],["::cue","WebVTT 자막 큐","가상 요소"],["::part()","그림자 트리 안의 part 요소","가상 요소"],["::slotted()","슬롯에 꽂힌 요소","가상 요소"],["::highlight()","등록한 사용자 하이라이트","가상 요소"],["A B","A 안 어디든 있는 B(자손)","결합자"],["A > B","A 바로 아래의 B(자식)","결합자"],["A + B","A 바로 뒤의 형제 B","결합자"],["A ~ B","A 뒤쪽의 모든 형제 B","결합자"],["A || B","열 A에 속한 칸 B(실험)","결합자"],["ns|a","이름공간 ns에 속한 a","결합자"]] },
        ],
      },
      {
        label: "특이성 한눈에",
        body: "같은 요소에 맞는 규칙이 여럿이면, 출처와 레이어가 같을 때 특이성이 높은 쪽이 이깁니다. 특이성은 ID-클래스-종류 세 칸의 숫자입니다. 왼쪽 칸부터 견주므로 ID 하나가 클래스 열 개를 이깁니다. 결합자와 *는 무게가 없고, :where()는 0, :is(), :not(), :has()는 인자 중 가장 무거운 것을 따릅니다. 자세한 견줌은 2장에 있습니다.",
        tables: [
          {
            head: ["선택자", "무게 (ID-클래스-종류)", "예"],
            rows: [
              ["#id", "1-0-0", "#main"],
              [".class, [속성], :가상 클래스", "0-1-0", ".card, [type=text], :hover"],
              ["태그, ::가상 요소", "0-0-1", "p, ::before"],
              ["*, 결합자, :where()", "0-0-0", "*, >, :where(.a)"],
              [":is(), :not(), :has()", "인자 중 가장 무거운 것", ":is(#a, .b) → 1-0-0"],
              ["인라인 style", "모든 선택자보다 위", 'style="color: red"'],
            ],
          },
        ],
        terms: [
          {
            term: "특이성 (specificity)",
            body: "선택자가 얼마나 구체적으로 요소를 가리키는지를 세 칸 숫자로 나타낸 무게입니다. 무게가 큰 규칙의 선언이 이깁니다. 주소를 '서울'보다 '서울 중구 세종대로'로 적은 편지가 더 정확히 배달되는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 어느 규칙이 이기나",
        body: "한 문단에 규칙 넷이 동시에 맞습니다. 지금 값의 color가 이긴 규칙의 색입니다. 처음에는 ID 선택자가 이깁니다. style의 규칙을 하나씩 지우거나 순서를 바꿔 실행해 보세요. 특이성이 같은 규칙끼리는 뒤에 적은 것이 이기고, :where()로 감싼 규칙은 무게가 0이라 늘 집니다. 지금 값의 matches 줄은 각 선택자가 이 문단에 맞는지입니다. 맞는다고 다 이기는 것은 아닙니다.",
        lab: {
          html: `<style>
  p { color: gray; }
  .note { color: green; }
  #lead { color: crimson; }
  :where(#lead) { color: blue; }
</style>
<p id="lead" class="note">이 문단의 색은 어느 규칙이 정할까요?</p>`,
          height: 90,
          checks: [
            { label: "color", expr: "getComputedStyle(document.querySelector('p')).color" },
            {
              label: "matches",
              expr: "['p', '.note', '#lead', ':where(#lead)'].map((s) => s + ' ' + document.querySelector('p').matches(s))",
            },
          ],
          tryIt: "#lead 규칙을 지우고 실행해 보세요. 다음으로 무거운 .note가 이깁니다.",
        },
        terms: [
          {
            term: "가상 클래스와 가상 요소",
            body: "가상 클래스(:hover)는 HTML에 적히지 않은 '상태'를 고르고, 콜론이 하나입니다. 가상 요소(::before)는 HTML에 없는 '부분'을 만들어 고르고, 콜론이 둘입니다. 사람(요소)의 기분(상태)과 그림자(부분)의 차이입니다.",
          },
          {
            term: "관대한 목록 (forgiving selector list)",
            body: "선택자 목록에 틀린 선택자가 하나 섞이면 보통은 규칙 전체가 버려집니다. :is()와 :where() 안의 목록은 관대해서 틀린 것만 빼고 나머지로 계속 고릅니다. 시험지에서 틀린 문제만 0점 처리하고 나머지는 채점하는 것과 같습니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "선택자 문제는 '안 맞는다'와 '맞는데 진다' 두 가지입니다. 지금 값에서 matches와 계산값을 함께 보면 어느 쪽인지 갈립니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["규칙이 아예 안 먹는다", "선택자가 요소에 맞지 않는다 (오타, 구조 착각)", "el.matches('선택자')로 확인"],
              ["맞는데 다른 색이 나온다", "더 무거운 규칙이 이겼다", "개발자 도구 Styles에서 그어진 줄 확인"],
              ["목록 전체가 무시된다", "목록 안에 브라우저가 모르는 선택자가 섞였다", ":is()로 감싸 관대한 목록으로"],
              ["특이성 싸움으로 !important가 늘어난다", "ID와 긴 선택자로 이기려 했다", ":where()로 무게를 빼거나 @layer로 나눈다(14장)"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) #a와 .b.c.d.e는 어느 쪽이 무거운가요?\n2) :is(#a, .b)와 :where(#a, .b)의 특이성은?\n3) 가상 클래스와 가상 요소를 콜론 수로 어떻게 구별하나요?\n4) 규칙이 안 먹을 때 '안 맞는다'와 '진다'를 어떻게 가르나요?",
      },
    ],
    sources: [
      { label: "MDN — CSS selectors", href: `${MDN}/Guides/Selectors` },
      { label: "MDN — Specificity", href: `${MDN}/Guides/Cascade/Specificity` },
      { label: "W3C — Selectors Level 4", href: "https://www.w3.org/TR/selectors-4/" },
    ],
  },

  {
    id: "css-sel-basic",
    name: "기본 선택자와 목록",
    tagline: "모두, 이름, 클래스, ID로 고르고 쉼표로 묶고 &로 잇는다",
    intro:
      "선택자의 가장 작은 조각들입니다. `*`는 모든 요소를, 요소 이름은 같은 태그를 고릅니다. `.class`는 class 속성의 낱말로, `#id`는 id 값으로 고릅니다. 쉼표 목록은 여러 선택자에 같은 선언을 나눠 줍니다. `&`는 중첩 규칙 안에서 부모 선택자의 자리를 가리킵니다. 블록마다 무엇을 고르는지, 특이성이 얼마인지, 어디서 틀리기 쉬운지 적었습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "여섯 선택자를 한 표에 모았습니다. 특이성은 ID, 클래스, 요소 세 칸을 1-0-0 꼴로 적습니다. 자세한 계산은 2장에 있습니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              ["*", "모든 요소", "0-0-0", "1장 · 문법과 선택자"],
              ["element", "이름이 같은 요소", "0-0-1", "1장 · 문법과 선택자"],
              [".class", "class 낱말에 그 이름이 있는 요소", "0-1-0", "1장 · 문법과 선택자"],
              ["#id", "id가 그 값인 요소", "1-0-0", "2장 · 캐스케이드와 상속"],
              ["A, B", "A나 B에 맞는 요소", "맞은 선택자의 값", "1장 · 문법과 선택자"],
              ["&", "중첩 규칙에서 부모가 고른 요소", ":is(부모)와 같음", "14장 · 중첩 · 레이어 · 스코프"],
            ],
          },
        ],
        terms: [
          {
            term: "특이성 (specificity)",
            body: "선택자의 무게를 ID, 클래스, 요소 세 칸으로 적은 값입니다. 같은 속성을 두고 다투면 왼쪽 칸부터 견줘 큰 쪽이 이깁니다. 세 칸이 다 같으면 뒤에 적은 규칙이 이깁니다. 올림픽 메달 순위처럼 금메달 하나가 은메달 여럿보다 앞섭니다.",
          },
        ],
      },
      {
        label: "*",
        body: "`*`는 종류를 가리지 않고 모든 요소를 고릅니다. 특이성은 0-0-0입니다. 가장 가벼워서 다른 선택자와 겹치면 대개 집니다.\n다른 조건과 붙이면 `*`는 생략할 수 있습니다. `*.warning`과 `.warning`은 같습니다. 그래서 `.floating + *`처럼 '아무 요소나'를 뜻할 때 주로 씁니다.\n주의할 점은 가상 요소입니다. `*`는 요소만 고르고 `::before` 같은 가상 요소는 고르지 않습니다. 가상 요소까지 잡으려면 `*::before`, `*::after`를 따로 적습니다. SVG가 섞인 문서에서는 `ns|*`, `*|*`, `|*`로 네임스페이스를 고릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["*, *.warning, ns|*", "0-0-0", "모든 요소 (가상 요소는 빠짐)"]],
          },
        ],
        code: `* { margin: 0; }                  /* 모든 요소, 0-0-0 */
*, *::before, *::after {          /* 가상 요소까지 */
  box-sizing: border-box;
}
.floating + * { clear: left; }    /* 떠 있는 요소 바로 뒤의 아무 요소 */`,
        codeLang: "css",
      },
      {
        label: "element",
        body: "요소 이름(태그 이름)으로 고릅니다. `p`는 문서의 모든 `<p>`를 고릅니다. 종류 선택자라고도 부르고, 특이성은 0-0-1입니다.\n다른 조건과 붙일 때 요소 이름은 맨 앞에 옵니다. `li.active`는 'class가 active인 li'입니다. 사이에 공백을 넣은 `li .active`는 li 안의 자손을 고르니 전혀 다른 뜻입니다.\n사용자 정의 요소(`my-card`)도 이름으로 고릅니다. SVG나 MathML이 섞인 문서에서는 `ns|h1`, `*|h1`, `|h1`처럼 네임스페이스를 붙입니다. 네임스페이스는 `@namespace`로 먼저 선언합니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["p, li, my-card", "0-0-1", "이름이 같은 모든 요소"]],
          },
        ],
        code: `p { line-height: 1.7; }        /* 모든 <p>, 0-0-1 */
li.active { color: teal; }     /* class가 active인 li, 0-1-1 */
li .active { color: gray; }    /* li 안의 .active 자손, 0-1-1 */
my-card { display: block; }    /* 사용자 정의 요소 */`,
        codeLang: "css",
      },
      {
        label: ".class",
        body: "class 속성에 적힌 낱말 가운데 하나가 같으면 고릅니다. `class=\"card big\"`인 요소는 `.card`와 `.big`에 모두 맞습니다. 특이성은 0-1-0입니다.\n`.card.big`처럼 점으로 이으면 두 클래스를 다 가진 요소만 고릅니다. 문법으로는 속성 선택자 `[class~=\"card\"]`와 같습니다.\n클래스 이름은 CSS 식별자여야 합니다. `.123item`처럼 숫자로 시작하면 무효라 규칙이 버려집니다. `.\\31 23item`처럼 이스케이프해야 합니다. 자바스크립트의 `CSS.escape()`가 이 꼴을 만들어 줍니다. 대소문자도 가립니다. `.Card`는 `class=\"card\"`에 맞지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [
              [".card", "0-1-0", "class 낱말에 card가 있는 요소"],
              [".card.big", "0-2-0", "card와 big을 다 가진 요소"],
            ],
          },
        ],
        code: `.card { padding: 1rem; }         /* class에 card가 있는 요소, 0-1-0 */
.card.big { padding: 2rem; }     /* card와 big을 다 가진 요소, 0-2-0 */
li.card { list-style: none; }    /* class에 card가 있는 li, 0-1-1 */
.\\31 23item { color: teal; }     /* class="123item", 이스케이프 */`,
        codeLang: "css",
        terms: [
          {
            term: "식별자 (identifier)",
            body: "CSS가 이름으로 읽는 낱말입니다. 글자, 숫자, 하이픈, 밑줄로 쓰고 숫자로 시작할 수 없습니다. 클래스 이름과 id 값은 선택자에 쓰려면 식별자여야 합니다. 서류 칸에 쓸 수 있는 글자가 정해져 있어 다른 글자는 풀어 적는 것과 같습니다.",
          },
        ],
      },
      {
        label: "#id",
        body: "id 속성이 선택자의 값과 정확히 같은 요소를 고릅니다. 특이성은 1-0-0입니다. 클래스를 몇 개 이어도 ID 하나를 넘지 못합니다.\n문법만 보면 `[id=\"main\"]`과 같지만 특이성은 다릅니다. 속성 선택자로 적으면 0-1-0입니다. id로 고르되 무게는 가볍게 두고 싶을 때 이렇게 씁니다.\nid 값도 CSS 식별자여야 하고 대소문자를 가립니다. 숫자로 시작하는 id는 클래스처럼 이스케이프합니다. 같은 id가 둘 있으면 CSS는 둘 다 고릅니다. 하지만 HTML 규칙 위반이고, `getElementById()`는 첫 요소만 돌려줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [
              ["#main", "1-0-0", "id가 main인 요소"],
              ["[id=\"main\"]", "0-1-0", "같은 요소, 무게만 가볍다"],
            ],
          },
        ],
        code: `#main { max-width: 60rem; }        /* id="main", 1-0-0 */
[id="main"] { max-width: 60rem; }  /* 같은 요소, 0-1-0 */
#\\31 st { color: teal; }           /* id="1st", 이스케이프 */`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 한 문단에 겹친 선택자",
        body: "네 문단에 `*`, `p`, `.note`, `#main`, `[id=\"side\"]` 규칙이 겹쳐 맞습니다. 지금 값에서 문단마다 이긴 color를 봅니다. blue는 rgb(0, 0, 255)처럼 rgb 꼴로 나옵니다.\n첫 문단은 `p`만 맞아 gray입니다. 둘째는 `.note`가 `p`를 이겨 blue입니다. 셋째는 `#main`이 이겨 red입니다. 넷째는 `.note`와 `[id=\"side\"]`가 둘 다 0-1-0입니다. 그래서 뒤에 적은 `[id=\"side\"]`의 green이 이깁니다.\n`*`가 준 font-weight는 다투는 규칙이 없습니다. 그래서 모든 문단이 bold의 계산값인 700입니다.",
        lab: {
          html: `<style>
  * { font-weight: bold; }
  p { color: gray; }
  .note { color: blue; }
  #main { color: red; }
  [id="side"] { color: green; }
</style>
<p>p만 맞는 문단</p>
<p class="note">p와 .note가 맞는 문단</p>
<p class="note" id="main">p, .note, #main이 맞는 문단</p>
<p class="note" id="side">p, .note, [id="side"]가 맞는 문단</p>`,
          height: 200,
          checks: [
            { label: "첫째 p의 color", expr: "getComputedStyle(document.querySelectorAll('p')[0]).color" },
            { label: "둘째 p의 color", expr: "getComputedStyle(document.querySelectorAll('p')[1]).color" },
            { label: "셋째 p의 color", expr: "getComputedStyle(document.querySelectorAll('p')[2]).color" },
            { label: "넷째 p의 color", expr: "getComputedStyle(document.querySelectorAll('p')[3]).color" },
            { label: "첫째 p의 font-weight", expr: "getComputedStyle(document.querySelectorAll('p')[0]).fontWeight" },
          ],
          tryIt: "[id=\"side\"] 규칙을 .note 위로 옮겨 실행해 보세요. 넷째 문단이 blue가 됩니다.",
        },
      },
      {
        label: "A, B",
        body: "쉼표로 이은 선택자 가운데 하나라도 맞으면 고릅니다. 같은 선언을 여러 선택자에 줄 때 씁니다. 쉼표 앞뒤의 공백은 상관없습니다.\n특이성은 목록 전체가 아니라 선택자마다 따로 셉니다. `h1, #top`에서 h1로 맞으면 0-0-1, #top으로 맞으면 1-0-0입니다. 한 요소가 둘 다에 맞으면 큰 쪽을 씁니다.\n가장 큰 함정은 무효 선택자입니다. 목록에 틀린 선택자가 하나라도 있으면 규칙 전체가 버려집니다. 오타나 아직 지원하지 않는 가상 클래스가 다른 선택자까지 끌고 갑니다. `:is()`와 `:where()` 안의 목록은 관대한 목록이라 틀린 것만 빼고 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["h1, h2, .title", "맞은 선택자의 값", "하나라도 맞는 요소"]],
          },
        ],
        code: `h1, h2, h3 { font-family: serif; }    /* 셋 가운데 하나에 맞으면 */
h1, h2:nope { color: red; }           /* 틀린 것이 섞여 규칙 전체가 버려진다 */
:is(h1, h2:nope) { color: red; }      /* h1에는 적용된다 */`,
        codeLang: "css",
        terms: [
          {
            term: "관대한 선택자 목록 (forgiving selector list)",
            body: "목록 안의 선택자를 하나씩 따로 읽는 목록입니다. 틀린 선택자는 버리고 맞는 것만 씁니다. `:is()`와 `:where()`의 인자가 이렇게 읽힙니다. 손님 명단에 오타 한 줄이 있어도 그 줄만 지우고 나머지 손님은 들여보내는 문지기와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 목록에 틀린 선택자가 섞이면",
        body: "`h3, p:nope`에는 없는 가상 클래스 `:nope`가 섞여 있습니다. 그래서 규칙 전체가 버려지고, h3는 body의 색을 그대로 물려받습니다. 같은 목록을 `:is()`로 감싸면 `p:nope`만 빠지고 h4는 green이 됩니다.\n지금 값의 '남은 규칙 수'도 보세요. 브라우저가 읽고 남긴 규칙만 셉니다. 틀린 목록 규칙은 읽는 단계에서 사라져 `:is()` 규칙 하나만 남습니다.",
        lab: {
          html: `<style id="s">
  h3, p:nope { color: red; }
  :is(h4, p:nope) { color: green; }
</style>
<h3>h3, p:nope 규칙의 h3</h3>
<h4>:is(h4, p:nope) 규칙의 h4</h4>`,
          height: 170,
          checks: [
            { label: "h3의 color", expr: "getComputedStyle(document.querySelector('h3')).color" },
            { label: "h4의 color", expr: "getComputedStyle(document.querySelector('h4')).color" },
            { label: "남은 규칙 수", expr: "document.getElementById('s').sheet.cssRules.length" },
            { label: "selector(p:nope) 지원", expr: "CSS.supports('selector(p:nope)')" },
          ],
          tryIt: "첫 규칙에서 , p:nope를 지우고 실행해 보세요. h3가 red가 되고 남은 규칙 수가 늘어납니다.",
        },
      },
      {
        label: "&",
        body: "중첩 규칙 안에서 `&`는 부모 규칙의 선택자를 가리킵니다. 어디에 두느냐에 따라 뜻이 달라집니다.\n1) `& .icon`이나 그냥 `.icon`은 부모 안의 자손입니다. 브라우저가 사이에 공백을 넣어 읽습니다.\n2) `&:hover`, `&.on`처럼 공백 없이 붙이면 부모 요소 자신의 조건입니다.\n3) `.dark &`처럼 뒤에 두면 부모가 `.dark` 안에 있을 때입니다.\n특이성은 부모 선택자를 `:is()`로 감싼 것과 같습니다. 부모가 `#a, .b`면 `.b`로 맞은 요소도 1-0-0의 무게를 받습니다.\n주의할 점이 둘입니다. `&`는 가상 요소를 나타내지 못합니다. `.foo::before` 안의 `.x &`는 아무것도 고르지 않습니다. 그리고 `:hover`를 `&` 없이 적으면 `.btn :hover`로 읽혀 자손의 hover가 됩니다. 중첩 밖에서 쓴 `&`는 `:scope`, 곧 문서의 뿌리입니다. 지원은 Chrome 120, Safari 17.2, Firefox 117부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["&, &:hover, .dark &", ":is(부모)와 같음", "부모 규칙이 고른 요소"]],
          },
        ],
        code: `.btn {
  color: teal;
  &:hover { color: navy; }     /* .btn:hover */
  .icon { margin: 0; }         /* .btn .icon */
  .dark & { color: white; }    /* .dark .btn */
}
#a, .b {
  & p { color: red; }          /* :is(#a, .b) p, 1-0-1 */
}`,
        codeLang: "css",
        terms: [
          {
            term: "중첩 규칙 (nested rule)",
            body: "다른 규칙의 중괄호 안에 적은 규칙입니다. 부모 선택자를 다시 쓰지 않아도 브라우저가 풀어서 읽습니다. 서랍장 안의 칸막이처럼, 어느 서랍 안의 칸인지가 적힌 자리로 드러납니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: &를 붙이는 자리",
        body: "한 `.card` 규칙 안에 `&`를 세 자리에 두었습니다. `&.hot`은 `.card.hot`이라 첫 card 자신이 red입니다. `.hot`은 `.card .hot`이라 안쪽 span이 blue입니다. `.dark &`는 `.dark .card`라 셋째 card가 orange입니다.\n`&:hover`는 맨 뒤에 적었습니다. 그래서 card 위에 마우스를 올리면 그 card의 color가 purple로 바뀝니다. 지금 값은 0.4초마다 다시 재므로 올려 둔 동안 바뀐 값이 보입니다.",
        lab: {
          html: `<style>
  .card {
    color: gray;
    &.hot { color: red; }
    .hot { color: blue; }
    .dark & { color: orange; }
    &:hover { color: purple; }
  }
</style>
<div class="card hot">card hot <span class="hot">안쪽 span.hot</span></div>
<div class="card">그냥 card</div>
<div class="dark"><div class="card">dark 안의 card</div></div>`,
          height: 170,
          checks: [
            { label: "div.card.hot의 color", expr: "getComputedStyle(document.querySelector('.card.hot')).color" },
            { label: "span.hot의 color", expr: "getComputedStyle(document.querySelector('span.hot')).color" },
            { label: "그냥 card의 color", expr: "getComputedStyle(document.querySelectorAll('.card')[1]).color" },
            { label: ".dark 안 card의 color", expr: "getComputedStyle(document.querySelector('.dark .card')).color" },
            { label: "selector(&) 지원", expr: "CSS.supports('selector(&)')" },
          ],
          tryIt: "&.hot에서 &를 지우고 실행해 보세요. .card .hot이 되어 첫 card가 gray로 돌아갑니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "기본 선택자에서 자주 보는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["* { box-sizing: border-box }만 적음", "::before, ::after는 content-box 그대로", "*, *::before, *::after로 적기"],
              ["h1, h2:hoverr { }처럼 목록에 오타", "규칙 전체가 버려져 h1도 안 바뀜", "오타 고치기, 또는 :is()로 감싸기"],
              [".123item으로 고름", "무효 선택자라 규칙이 버려짐", ".\\31 23item, CSS.escape()"],
              ["#main으로 꾸밈", "1-0-0이라 클래스로 덮기 어려움", "클래스나 [id=\"main\"](0-1-0)"],
              ["중첩에서 :hover를 & 없이 적음", ".btn :hover로 읽혀 자손에만 맞음", "&:hover"],
              [".card { &__title { } }", ".card__title이 되지 않음", "클래스 이름을 통째로 적기(14장)"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `*.warning`과 `.warning`은 다른가요?\n2) `#main`과 `[id=\"main\"]`의 특이성은 각각 얼마인가요?\n3) `h1, h2:nope { }`에서 h1의 스타일까지 사라지는 이유는?\n4) `.btn { :hover { } }`와 `.btn { &:hover { } }`는 어떻게 다른가요?",
      },
    ],
    sources: [
      { label: "MDN — Universal selectors", href: `${MDN}/Reference/Selectors/Universal_selectors` },
      { label: "MDN — Type selectors", href: `${MDN}/Reference/Selectors/Type_selectors` },
      { label: "MDN — Class selectors", href: `${MDN}/Reference/Selectors/Class_selectors` },
      { label: "MDN — ID selectors", href: `${MDN}/Reference/Selectors/ID_selectors` },
      { label: "MDN — Selector list", href: `${MDN}/Reference/Selectors/Selector_list` },
      { label: "MDN — & nesting selector", href: `${MDN}/Reference/Selectors/Nesting_selector` },
    ],
  },

  {
    id: "css-sel-attr",
    name: "속성 선택자",
    tagline: "속성이 있는지, 값이 같은지, 어디에 들어 있는지로 고른다",
    intro:
      "속성 선택자는 HTML 속성으로 요소를 고릅니다. 대괄호 안에 속성 이름만 적으면 '있느냐'를 봅니다. 연산자를 더하면 값이 같은지, 낱말로 들어 있는지, 앞이나 뒤나 가운데에 있는지를 봅니다. 닫는 괄호 앞의 `i`와 `s`는 대소문자를 가릴지 정합니다. 연산자와 플래그가 무엇이든 특이성은 0-1-0입니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "아홉 꼴을 한 표에 모았습니다. 값이 식별자면 따옴표를 빼도 되고, 공백이나 기호가 있으면 따옴표로 감쌉니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              ["[attr]", "그 속성이 있는 요소", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr=\"v\"]", "값이 v와 똑같은 요소", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr~=\"v\"]", "공백으로 나눈 낱말 하나가 v", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr|=\"v\"]", "값이 v이거나 v-로 시작", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr^=\"v\"]", "값이 v로 시작", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr$=\"v\"]", "값이 v로 끝남", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr*=\"v\"]", "값 어딘가에 v가 있음", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr=\"v\" i]", "대소문자를 무시하고 견줌", "0-1-0", "1장 · 문법과 선택자"],
              ["[attr=\"v\" s]", "대소문자를 가려 견줌", "0-1-0", ""],
            ],
          },
        ],
      },
      {
        label: "[attr]",
        body: "그 속성이 있으면 값과 상관없이 고릅니다. 값이 빈 문자열이어도 맞습니다. `disabled`, `hidden` 같은 불 속성이나 `data-*` 속성을 고를 때 씁니다.\n특이성은 0-1-0으로 클래스와 같습니다. HTML에서 속성 이름은 대소문자를 가리지 않아 `[TITLE]`도 title을 고릅니다.\n속성과 상태는 다르다는 점을 기억해 둡니다. `[checked]`는 HTML에 적힌 처음 상태입니다. 사용자가 바꾼 지금 상태는 `:checked`로 봅니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["a[title], [data-state]", "0-1-0", "그 속성이 있는 요소 (값은 안 봄)"]],
          },
        ],
        code: `a[title] { text-decoration: underline dotted; }  /* title이 있는 링크 */
[data-state] { outline: 1px dashed; }             /* 값이 무엇이든 */
input:not([type]) { border-color: teal; }         /* type을 안 적은 input */`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 값이 비어도 [attr]는 맞는다",
        body: "첫 문단은 `[title]`과 `[title=\"설명\"]`에 다 맞습니다. 둘 다 0-1-0이라 뒤에 적은 green이 이깁니다. 둘째 문단은 값이 비었지만 `[title]`에 맞아 blue입니다. `[title=\"\"]`에도 맞아 밑줄이 생깁니다. 셋째 문단은 아무 규칙에도 맞지 않아 body의 색을 물려받습니다.",
        lab: {
          html: `<style>
  [title] { color: blue; }
  [title="설명"] { color: green; }
  [title=""] { text-decoration: underline; }
</style>
<p title="설명">title="설명"</p>
<p title="">title=""</p>
<p>title 없음</p>`,
          height: 170,
          checks: [
            { label: "첫째 p의 color", expr: "getComputedStyle(document.querySelectorAll('p')[0]).color" },
            { label: "둘째 p의 color", expr: "getComputedStyle(document.querySelectorAll('p')[1]).color" },
            { label: "둘째 p의 text-decoration-line", expr: "getComputedStyle(document.querySelectorAll('p')[1]).textDecorationLine" },
            { label: "셋째 p의 color", expr: "getComputedStyle(document.querySelectorAll('p')[2]).color" },
          ],
          tryIt: "둘째 p에서 title=\"\"를 지우고 실행해 보세요. 셋째 문단과 같아집니다.",
        },
      },
      {
        label: "[attr=\"v\"]",
        body: "속성 값이 v와 처음부터 끝까지 똑같을 때만 고릅니다. `[type=\"checkbox\"]`처럼 정해진 값을 고를 때 씁니다. 특이성은 0-1-0입니다.\n값이 식별자면 따옴표를 빼도 됩니다. `[type=checkbox]`도 됩니다. 하지만 공백이나 기호가 있거나 숫자로 시작하면 따옴표가 필요합니다. `[data-id=1]`은 무효이고 `[data-id=\"1\"]`이 맞습니다.\n대소문자는 속성마다 다릅니다. HTML 표준이 정한 `type` 같은 일부 속성의 값은 가리지 않습니다. class, id, data-*, role, aria-*의 값은 가립니다. 값 전체와 견주므로 `[class=\"btn\"]`은 `class=\"btn big\"`에 맞지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["[type=\"checkbox\"]", "0-1-0", "값이 v와 똑같은 요소"]],
          },
          {
            caption: "[class=\"btn\"]과 견준 결과",
            head: ["속성 값", "맞나"],
            rows: [
              ["btn", "맞음"],
              ["btn big", "안 맞음 (값 전체가 달라서)"],
              ["Btn", "안 맞음 (class는 대소문자를 가림)"],
            ],
          },
        ],
        code: `input[type="checkbox"] { accent-color: teal; }
[data-id="1"] { order: -1; }                     /* 숫자로 시작하면 따옴표 */
a[href="https://example.org"] { color: green; }`,
        codeLang: "css",
      },
      {
        label: "[attr~=\"v\"]",
        body: "값을 공백으로 나눈 낱말 가운데 하나가 v와 같으면 고릅니다. class나 rel처럼 낱말을 늘어놓는 속성에 맞습니다. `.btn`은 `[class~=\"btn\"]`과 같은 뜻입니다. 특이성은 0-1-0입니다.\n낱말 단위로 견주므로 `btn-big`이나 `mybtn`에는 맞지 않습니다. v에 공백이 있거나 v가 빈 문자열이면 아무것도 고르지 않습니다. 낱말은 공백으로 나뉘니, 공백을 품은 낱말은 있을 수 없기 때문입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["[class~=\"btn\"]", "0-1-0", "낱말 목록에 v가 있는 요소"]],
          },
          {
            caption: "[class~=\"btn\"]과 견준 결과",
            head: ["속성 값", "맞나"],
            rows: [
              ["btn big", "맞음"],
              ["big btn", "맞음"],
              ["btn-big", "안 맞음 (낱말이 btn-big 하나)"],
            ],
          },
        ],
        code: `[class~="btn"] { padding: .5em 1em; }   /* class="btn big", class="big btn" */
a[rel~="external"] { cursor: alias; }    /* rel="external noopener" */`,
        codeLang: "css",
      },
      {
        label: "[attr|=\"v\"]",
        body: "값이 v와 똑같거나, v 바로 뒤에 하이픈(-)이 이어지면 고릅니다. `[lang|=\"en\"]`은 `en`, `en-US`, `en-GB`에 맞고 `english`에는 맞지 않습니다. 언어 코드처럼 '주 코드-하위 코드' 꼴의 값을 위한 연산자입니다. 특이성은 0-1-0입니다.\n주의할 점은 그 속성이 적힌 요소만 본다는 것입니다. 언어는 자식에게 물려지지만 lang 속성은 물려지지 않습니다. 문서 안의 언어로 고르려면 상속까지 보는 `:lang()`이 낫습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["[lang|=\"zh\"]", "0-1-0", "값이 v이거나 v-로 시작하는 요소"]],
          },
          {
            caption: "[lang|=\"zh\"]와 견준 결과",
            head: ["속성 값", "맞나"],
            rows: [
              ["zh", "맞음"],
              ["zh-Hant-TW", "맞음"],
              ["zhx", "안 맞음 (하이픈이 없음)"],
            ],
          },
        ],
        code: `[lang|="zh"] { font-family: "Noto Sans SC", sans-serif; }  /* zh, zh-Hans-CN, zh-Hant-TW */
p:lang(en) { font-style: italic; }                          /* 물려받은 언어까지 */`,
        codeLang: "css",
        terms: [
          {
            term: "언어 하위 코드 (subtag)",
            body: "언어 코드에서 하이픈 뒤에 붙는 부분입니다. `en-US`의 US, `zh-Hant-TW`의 Hant와 TW가 그렇습니다. `|=`는 맨 앞 코드만 맞으면 하위 코드는 보지 않습니다. 성이 같으면 이름은 보지 않고 한 집안으로 치는 것과 같습니다.",
          },
        ],
      },
      {
        label: "[attr^=\"v\"]",
        body: "값이 v로 시작하면 고릅니다. `a[href^=\"#\"]`는 같은 문서 안으로 가는 링크입니다. `a[href^=\"mailto:\"]`는 메일 링크입니다. 특이성은 0-1-0입니다.\nv가 빈 문자열이면 아무것도 고르지 않습니다. 그리고 낱말이 아니라 글자 단위로 견줍니다. `[class^=\"btn\"]`은 `btn-big`에도 맞고, `class=\"big btn\"`에는 맞지 않습니다. 클래스를 고를 때는 `~=`나 `.btn`을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["a[href^=\"#\"]", "0-1-0", "값이 v로 시작하는 요소"]],
          },
          {
            caption: "[class^=\"btn\"]과 견준 결과",
            head: ["속성 값", "맞나"],
            rows: [
              ["btn-big", "맞음"],
              ["btnx", "맞음"],
              ["big btn", "안 맞음 (big으로 시작)"],
            ],
          },
        ],
        code: `a[href^="#"] { color: teal; }               /* 같은 문서 안으로 가는 링크 */
a[href^="mailto:"] { font-style: italic; }  /* 메일 링크 */`,
        codeLang: "css",
      },
      {
        label: "[attr$=\"v\"]",
        body: "값이 v로 끝나면 고릅니다. 파일 확장자로 링크를 고를 때 자주 씁니다. `a[href$=\".pdf\"]`는 PDF로 가는 링크입니다. 특이성은 0-1-0입니다.\nhref 값은 대소문자를 가립니다. 그래서 `report.PDF`는 위 선택자에 맞지 않습니다. 닫는 괄호 앞에 `i`를 붙이면 둘 다 고릅니다. 주소 끝에 `?v=2`나 `#page=3`이 붙어도 끝이 달라져 맞지 않습니다. v가 빈 문자열이면 아무것도 고르지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["a[href$=\".pdf\"]", "0-1-0", "값이 v로 끝나는 요소"]],
          },
          {
            caption: "[href$=\".pdf\"]와 견준 결과",
            head: ["속성 값", "맞나"],
            rows: [
              ["memo.pdf", "맞음"],
              ["report.PDF", "안 맞음 (i를 붙이면 맞음)"],
              ["memo.pdf?v=2", "안 맞음 (끝이 ?v=2)"],
            ],
          },
        ],
        code: `a[href$=".pdf" i]::after { content: " (PDF)"; }
img[src$=".svg"] { inline-size: 2rem; }`,
        codeLang: "css",
      },
      {
        label: "[attr*=\"v\"]",
        body: "값 어디에든 v가 한 번 이상 들어 있으면 고릅니다. `a[href*=\"example\"]`은 주소 어딘가에 example이 있는 링크입니다. 특이성은 0-1-0입니다.\n가장 넓게 고르는 연산자라 뜻밖의 요소까지 잡기 쉽습니다. `[class*=\"col\"]`은 `col-6`뿐 아니라 `color-box`, `school`에도 맞습니다. v가 빈 문자열이면 아무것도 고르지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["a[href*=\"example\"]", "0-1-0", "값 어딘가에 v가 있는 요소"]],
          },
          {
            caption: "[class*=\"col\"]과 견준 결과",
            head: ["속성 값", "맞나"],
            rows: [
              ["col-6", "맞음"],
              ["color-box", "맞음 (뜻하지 않은 일치)"],
              ["school", "맞음 (뜻하지 않은 일치)"],
            ],
          },
        ],
        code: `a[href*="example"] { background: silver; }
[class*="col-"] { float: left; }   /* col-6에도, bigcol-1에도 맞는다 */`,
        codeLang: "css",
        terms: [
          {
            term: "부분 문자열 (substring)",
            body: "문자열 안에 이어진 한 토막입니다. `*=`는 낱말의 경계를 보지 않고 토막만 찾습니다. 그래서 school 안의 col도 찾습니다. 긴 글에서 형광펜으로 글자 몇 개를 찾으면 뜻이 다른 낱말 속 글자까지 칠해지는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 여섯 연산자로 같은 class 견주기",
        body: "네 문단의 class 값을 `\"btn\"`과 여섯 연산자로 견줍니다. 지금 값은 문단마다 맞은 연산자를 늘어놓습니다.\n`btn`은 여섯 모두에 맞습니다. `btn big`은 낱말로 들어 있어 `~=`, 앞이 같아 `^=`, 들어 있어 `*=`에 맞습니다. `big btn`은 `~=`, `$=`, `*=`입니다. `btn-big`은 하이픈 덕에 `|=`에 맞고 `^=`, `*=`에도 맞습니다. 하지만 낱말이 btn이 아니라 `~=`에서는 빠집니다.\n화면에서는 `~=`에 맞은 문단이 blue, `^=`에 맞은 문단이 gold 바탕입니다.",
        lab: {
          html: `<style>
  [class~="btn"] { color: blue; }
  [class^="btn"] { background: gold; }
</style>
<p class="btn">class="btn"</p>
<p class="btn big">class="btn big"</p>
<p class="big btn">class="big btn"</p>
<p class="btn-big">class="btn-big"</p>`,
          height: 200,
          checks: [
            { label: "btn", expr: "['=', '~=', '|=', '^=', '$=', '*='].filter((op) => document.querySelectorAll('p')[0].matches('[class' + op + '\"btn\"]')).join('  ') || '(없음)'" },
            { label: "btn big", expr: "['=', '~=', '|=', '^=', '$=', '*='].filter((op) => document.querySelectorAll('p')[1].matches('[class' + op + '\"btn\"]')).join('  ') || '(없음)'" },
            { label: "big btn", expr: "['=', '~=', '|=', '^=', '$=', '*='].filter((op) => document.querySelectorAll('p')[2].matches('[class' + op + '\"btn\"]')).join('  ') || '(없음)'" },
            { label: "btn-big", expr: "['=', '~=', '|=', '^=', '$=', '*='].filter((op) => document.querySelectorAll('p')[3].matches('[class' + op + '\"btn\"]')).join('  ') || '(없음)'" },
          ],
          tryIt: "넷째 p의 class를 btnbig으로 바꾸고 실행해 보세요. |=에서도 빠집니다.",
        },
      },
      {
        label: "[attr=\"v\" i]",
        body: "닫는 괄호 앞에 `i`(또는 `I`)를 붙이면 값을 대소문자 구분 없이 견줍니다. 모든 연산자에 붙일 수 있고, ASCII 글자에만 통합니다.\n`a[href$=\".pdf\" i]`는 `.pdf`, `.PDF`, `.Pdf`를 모두 고릅니다. `data-*`나 href처럼 대소문자를 가리는 값에 씁니다. 플래그가 붙어도 특이성은 0-1-0입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["[href$=\".pdf\" i]", "0-1-0", "대소문자를 무시하고 맞는 요소"]],
          },
        ],
        code: `a[href$=".pdf" i] { color: crimson; }
[data-kind="big" i] { font-weight: bold; }   /* Big, BIG, big */`,
        codeLang: "css",
        terms: [
          {
            term: "열거형 속성 (enumerated attribute)",
            body: "정해진 낱말 가운데 하나를 값으로 받는 속성입니다. `type` 같은 것이 그렇습니다. HTML 표준은 이런 속성 일부의 값을 대소문자 없이 견주라고 정합니다. 메뉴판에서 고르는 주문이라, '라떼'를 크게 쓰든 작게 쓰든 같은 음료가 나오는 것과 같습니다.",
          },
        ],
      },
      {
        label: "[attr=\"v\" s]",
        body: "`s`(또는 `S`)는 반대로 대소문자를 가려 견주게 합니다. HTML이 대소문자를 무시하는 `type` 같은 속성에도 구분을 강제합니다. 특이성은 0-1-0입니다.\n`ol[type=\"a\"]`는 HTML 규칙 때문에 `type=\"A\"`에도 맞습니다. `ol[type=\"a\" s]`라고 적어야 소문자 a만 고릅니다.\n주의할 점은 지원입니다. MDN은 브라우저가 이 플래그를 모르면 선택자가 아무것도 고르지 않는다고 적습니다. `@supports selector([a=\"b\" s])`로 먼저 확인합니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["ol[type=\"a\" s]", "0-1-0", "대소문자까지 맞는 요소"]],
          },
        ],
        code: `ol[type="a" s] { list-style-type: lower-alpha; }
ol[type="A" s] { list-style-type: upper-alpha; }
@supports not selector([a="b" s]) {
  /* s를 모르는 브라우저를 위한 대안 */
}`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: i와 s 플래그",
        body: "`type`은 HTML이 대소문자를 무시하는 속성이라 `[type=\"text\"]`가 `TEXT`에도 맞습니다. `data-kind`는 가리는 속성이라 `big`과 `Big`이 다릅니다. `i`를 붙이면 맞습니다.\n링크 개수도 견줘 보세요. `i`가 없으면 `.PDF`로 끝나는 링크가 빠지고, 있으면 둘 다 셉니다. 마지막 두 줄은 `s` 플래그입니다. 지원하는 브라우저라면 `[type=\"text\" s]`가 `TEXT`에 맞지 않아 false가 나옵니다.",
        lab: {
          html: `<p><input type="TEXT" value="type=TEXT"></p>
<p data-kind="Big">data-kind="Big"</p>
<p><a href="#report.PDF">report.PDF</a> <a href="#memo.pdf">memo.pdf</a></p>`,
          height: 160,
          checks: [
            { label: "input이 [type=\"text\"]", expr: "document.querySelector('input').matches('[type=\"text\"]')" },
            { label: "p가 [data-kind=\"big\"]", expr: "document.querySelector('[data-kind]').matches('[data-kind=\"big\"]')" },
            { label: "p가 [data-kind=\"big\" i]", expr: "document.querySelector('[data-kind]').matches('[data-kind=\"big\" i]')" },
            { label: "[href$=\".pdf\"] 개수", expr: "document.querySelectorAll('[href$=\".pdf\"]').length" },
            { label: "[href$=\".pdf\" i] 개수", expr: "document.querySelectorAll('[href$=\".pdf\" i]').length" },
            { label: "s 플래그 지원", expr: "CSS.supports('selector([a=\"b\" s])')" },
            { label: "input이 [type=\"text\" s]", expr: "CSS.supports('selector([a=\"b\" s])') ? document.querySelector('input').matches('[type=\"text\" s]') : '이 브라우저는 s를 모릅니다'" },
          ],
          tryIt: "input의 type을 소문자 text로 바꾸고 실행해 보세요. s를 지원하면 마지막 줄이 true가 됩니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "속성 선택자에서 자주 보는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["[data-id=1]", "1이 식별자가 아니라 규칙이 버려짐", "[data-id=\"1\"]처럼 따옴표"],
              ["a[href$=\".pdf\"]", ".PDF로 끝나는 링크가 빠짐", "[href$=\".pdf\" i]"],
              ["[class=\"btn\"]", "class=\"btn big\"에 안 맞음", "[class~=\"btn\"] 또는 .btn"],
              ["[class^=\"col\"]", "color-box에 맞고 \"big col-6\"에는 안 맞음", "클래스는 ~=나 .col-6으로"],
              ["자식 요소에 [lang|=\"en\"]", "lang 속성이 없는 자식은 안 맞음", ":lang(en)"],
              ["[type=\"a\" s]만 적음", "s를 모르는 브라우저에서는 아무것도 안 고름", "@supports selector()로 대안 두기"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `class=\"btn-big\"`에 맞는 것은 `[class~=\"btn\"]`과 `[class|=\"btn\"]` 가운데 어느 쪽인가요?\n2) `a[href$=\".pdf\"]`가 `report.PDF`를 놓치는 이유와 고치는 법은?\n3) `[type=\"TEXT\"]`는 맞는데 `[data-kind=\"TEXT\"]`는 안 맞는 이유는?\n4) `[title]`과 `[title=\"\"]`는 각각 어떤 요소에 맞나요?",
      },
    ],
    sources: [
      { label: "MDN — Attribute selectors", href: `${MDN}/Reference/Selectors/Attribute_selectors` },
      { label: "MDN — <ident>", href: `${MDN}/Reference/Values/ident` },
      { label: "MDN — :lang()", href: `${MDN}/Reference/Selectors/:lang` },
      { label: "HTML — Case-sensitivity of selectors", href: "https://html.spec.whatwg.org/multipage/semantics-other.html#case-sensitivity-of-selectors" },
    ],
  },

  {
    id: "css-sel-user",
    name: "사용자 동작 가상 클래스",
    tagline: "방문, 포인터, 누름, 포커스, 주소의 #이 상태를 바꾼다",
    intro:
      "이 가상 클래스들은 HTML에 적히지 않은 상태로 요소를 고릅니다. 링크를 방문했는지, 포인터가 올라와 있는지, 눌리고 있는지를 봅니다. 포커스가 어디 있는지, 주소의 #이 무엇을 가리키는지도 봅니다. 상태는 사용자가 움직일 때마다 바뀝니다. 특이성은 모두 0-1-0입니다. 링크 규칙은 :link, :visited, :hover, :active 순서로 적습니다. 그래야 서로 덮지 않습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "아홉 가상 클래스입니다. 링크 규칙은 :link, :visited, :hover, :active 순서(LVHA)로 적습니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              [":link", "아직 방문하지 않은 링크", "0-1-0", "1장 · 문법과 선택자"],
              [":visited", "방문한 링크 (색만 바꿀 수 있음)", "0-1-0", ""],
              [":any-link", "방문과 상관없이 모든 링크", "0-1-0", ""],
              [":hover", "포인터가 올라간 요소", "0-1-0", "1장 · 문법과 선택자"],
              [":active", "눌리고 있는 요소", "0-1-0", ""],
              [":focus", "포커스를 가진 요소", "0-1-0", ""],
              [":focus-visible", "포커스 표시가 필요할 때의 포커스 요소", "0-1-0", "1장 · 문법과 선택자"],
              [":focus-within", "자신이나 자손이 포커스를 가진 요소", "0-1-0", ""],
              [":target", "주소의 #과 id가 같은 요소", "0-1-0", "1장 · 문법과 선택자"],
            ],
          },
        ],
      },
      {
        label: ":link",
        body: "href가 있는 `<a>`, `<area>` 가운데 아직 방문하지 않은 것을 고릅니다. href가 없는 `<a>`는 링크가 아니라 맞지 않습니다. 특이성은 0-1-0이고 `a:link`는 0-1-1입니다.\n`:link`와 `:visited`는 서로 배타적입니다. 한 링크는 둘 가운데 하나에만 맞습니다. 방문과 상관없이 고르려면 `:any-link`를 씁니다.\n링크 규칙은 :link, :visited, :hover, :active 순서로 적습니다. 넷 다 `a`를 붙이면 0-1-1로 같아 뒤의 것이 이깁니다. `:link`를 `:hover` 뒤에 두면 올려도 hover 색이 덮입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["a:link", "0-1-0", "방문 전인 a, area (href 있음)"]],
          },
        ],
        code: `a:link { color: #0645ad; }      /* 1. 방문 안 함 */
a:visited { color: #0b0080; }   /* 2. 방문함 */
a:hover { color: #d33; }        /* 3. 올림 */
a:active { color: #000; }       /* 4. 누름 */`,
        codeLang: "css",
        terms: [
          {
            term: "가상 클래스 (pseudo-class)",
            body: "콜론 하나로 시작하는 선택자입니다. 문서 나무에 적히지 않은 상태나 위치로 요소를 고릅니다. 특이성은 클래스와 같은 0-1-0입니다. 사람에게 붙이는 '지금 통화 중' 같은 표지라서, 상황이 바뀌면 붙었다 떨어졌다 합니다.",
          },
        ],
      },
      {
        label: ":visited",
        body: "사용자가 이미 다녀온 주소로 가는 링크를 고릅니다. 특이성은 0-1-0입니다. 다만 사생활 보호 때문에 할 수 있는 일이 아주 적습니다.\n1) 바꿀 수 있는 속성은 색뿐입니다. color, background-color, border-color(네 변 포함), column-rule-color, outline-color, text-decoration-color, text-emphasis-color입니다. SVG의 fill, stroke도 됩니다.\n2) 색의 알파는 무시하고 방문 전 상태의 알파를 씁니다. Firefox는 알파가 0이면 :visited 스타일을 통째로 버립니다.\n3) `getComputedStyle()`은 늘 방문 전의 색을 돌려줍니다.\n4) `querySelector(':visited')`는 늘 null을 돌려줍니다. `querySelectorAll()`은 늘 빈 목록입니다.\n5) `<link>` 요소는 맞지 않습니다.\n원래 색이 없는 속성도 바꿀 수 없습니다. 바탕을 바꾸려면 `a`에 먼저 바탕색을 주어야 합니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["a:visited", "0-1-0", "방문한 a, area (href 있음)"]],
          },
        ],
        code: `a { background-color: white; }   /* 바탕을 바꾸려면 먼저 색을 준다 */
a:visited {
  color: purple;                 /* 됨 */
  background-color: lavender;    /* 됨, a에 바탕색이 있으니까 */
  font-weight: bold;             /* 무시됨, 색 속성이 아님 */
}`,
        codeLang: "css",
        terms: [
          {
            term: "방문 기록 엿보기 (history sniffing)",
            body: "페이지가 링크 스타일을 읽어 사용자가 어떤 사이트에 다녀왔는지 알아내는 공격입니다. 그래서 브라우저는 :visited의 결과를 스크립트에 숨기고, 색이 아닌 속성은 아예 막습니다. 현관에 놓인 택배 상자로 무엇을 샀는지 짐작할 수 없게 상자에 아무 표시도 하지 않는 셈입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: :visited는 스크립트에 숨는다",
        body: "첫 링크는 지금 열린 문서 자신을 가리킵니다. 브라우저가 방문한 곳으로 보면 화면에서는 purple이 됩니다. 그래도 지금 값의 color는 `:link`의 blue로 나오고, `:visited` 개수는 0입니다. font-weight는 허용된 색 속성이 아니라 화면에서도 굵어지지 않습니다.\n`:any-link`는 href가 있는 두 링크를 셉니다. 셋째 `a`는 href가 없어 어느 링크 가상 클래스에도 맞지 않습니다.",
        lab: {
          html: `<style>
  a:link { color: blue; }
  a:visited { color: purple; font-weight: bold; }
</style>
<p><a href="">지금 이 문서로 가는 링크</a></p>
<p><a href="#visited-demo">아직 안 간 조각 주소</a></p>
<p><a>href가 없는 a</a></p>`,
          height: 170,
          checks: [
            { label: "첫 링크의 color", expr: "getComputedStyle(document.querySelectorAll('a')[0]).color" },
            { label: "첫 링크의 font-weight", expr: "getComputedStyle(document.querySelectorAll('a')[0]).fontWeight" },
            { label: ":visited 개수", expr: "document.querySelectorAll(':visited').length" },
            { label: ":any-link 개수", expr: "document.querySelectorAll(':any-link').length" },
            { label: "셋째 a가 :link", expr: "document.querySelectorAll('a')[2].matches(':link')" },
          ],
          tryIt: "둘째 링크를 눌러 보세요. 화면의 색이 바뀌더라도 지금 값은 그대로입니다.",
        },
      },
      {
        label: ":any-link",
        body: "href가 있는 `<a>`, `<area>`를 방문 여부와 상관없이 고릅니다. `:link`나 `:visited`에 맞는 요소 전부라서 `:is(:link, :visited)`와 같은 뜻입니다. 특이성은 0-1-0입니다.\n링크의 기본 모양을 한 번에 정할 때 씁니다. `a`만 적으면 href 없는 `<a>`도 잡지만 `:any-link`는 진짜 링크만 잡습니다. 지원은 Chrome 65, Safari 9, Firefox 50부터입니다. 더 오래된 WebKit에는 `:-webkit-any-link`가 있었습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["a:any-link", "0-1-0", "href가 있는 a, area"]],
          },
        ],
        code: `a:any-link { color: teal; text-underline-offset: 3px; }
a:not(:any-link) { cursor: default; }   /* href가 없는 a */`,
        codeLang: "css",
      },
      {
        label: ":hover",
        body: "사용자가 포인팅 장치로 요소를 가리킬 때 맞습니다. 보통 마우스 커서가 요소 위에 있고 버튼은 누르지 않은 때입니다. 자손 위에 올려도 그 조상까지 `:hover`가 됩니다. 특이성은 0-1-0입니다.\n링크에 쓸 때는 `:link`, `:visited` 뒤, `:active` 앞에 적습니다.\n터치 화면이 문제입니다. 브라우저에 따라 `:hover`가 아예 안 맞거나, 잠깐 맞거나, 다른 곳을 누를 때까지 남습니다. 그러니 hover 없이는 쓸 수 없는 화면을 만들지 않습니다. `@media (hover: hover)` 안에 넣으면 hover가 되는 기기에만 적용됩니다(10장).",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [[".card:hover", "0-1-0", "포인터가 올라간 요소와 그 조상"]],
          },
        ],
        code: `.card:hover { box-shadow: 0 2px 8px rgb(0 0 0 / .2); }
@media (hover: hover) {
  .menu:hover > ul { display: block; }   /* hover가 되는 기기에서만 */
}`,
        codeLang: "css",
      },
      {
        label: ":active",
        body: "사용자가 요소를 활성화하는 동안 맞습니다. 마우스라면 주 버튼을 누르고 있는 동안입니다. 버튼이 여럿인 마우스에서도 주 버튼에만 반응합니다. 특이성은 0-1-0입니다.\n주로 `<a>`, `<button>`에 씁니다. 누르는 요소의 조상도 함께 맞아서, 문단 안의 링크를 누르면 문단도 `:active`입니다. `<label>`을 눌러 연결된 폼 컨트롤을 활성화할 때도 맞습니다.\n링크 규칙 가운데 맨 뒤에 적습니다. 앞에 적으면 같은 특이성의 `:hover`가 뒤에서 덮어, 눌러도 모양이 바뀌지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["button:active", "0-1-0", "눌리고 있는 요소와 그 조상"]],
          },
        ],
        code: `button:active { transform: translateY(1px); }
p:active { background: #eee; }   /* 안의 링크를 눌러도 맞는다 */`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: LVHA 순서와 :active",
        body: "링크 위에 마우스를 올리면 `:hover`가 true가 되고 color가 green으로 바뀝니다. 누르고 있는 동안은 `:active`까지 true라서 red입니다. 넷 다 0-1-1이라 뒤에 적은 규칙이 이기기 때문입니다.\n버튼도 누르고 있는 동안 `:active`가 true입니다. 지금 값은 0.4초마다 다시 재므로 조금 길게 눌러 봅니다.",
        lab: {
          html: `<style>
  a:link { color: blue; }
  a:visited { color: purple; }
  a:hover { color: green; }
  a:active { color: red; }
</style>
<p><a href="#lvha-demo">올려 보고, 눌러 보세요</a></p>
<p><button>버튼도 눌러 보세요</button></p>`,
          height: 160,
          checks: [
            { label: "a가 :hover", expr: "document.querySelector('a').matches(':hover')" },
            { label: "a가 :active", expr: "document.querySelector('a').matches(':active')" },
            { label: "a의 color", expr: "getComputedStyle(document.querySelector('a')).color" },
            { label: "button이 :active", expr: "document.querySelector('button').matches(':active')" },
          ],
          tryIt: "a:hover 줄을 맨 위로 옮기고 실행해 보세요. 올려도 color가 green이 되지 않습니다.",
        },
      },
      {
        label: ":focus",
        body: "포커스를 받은 요소를 고릅니다. 사용자가 누르거나 Tab 키로 옮겨 오면 생깁니다. 한 문서에서 포커스를 가진 요소는 하나뿐입니다. 특이성은 0-1-0입니다.\n그 요소 자신에게만 맞습니다. 포커스를 품은 부모를 고르려면 `:focus-within`을 씁니다.\n접근성에서 가장 중요한 규칙이 있습니다. 대신할 표시 없이 `outline: none`으로 포커스 윤곽을 지우지 않습니다. 키보드 사용자는 그 윤곽으로 위치를 압니다. WCAG 2.1의 1.4.11은 포커스 표시의 명암비가 3:1 이상이어야 한다고 정합니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:focus", "0-1-0", "포커스를 가진 요소 하나"]],
          },
        ],
        code: `input:focus { background: lightyellow; }
/* 나쁜 예: 대신할 표시 없이 윤곽을 지운다 */
/* :focus { outline: none; } */`,
        codeLang: "css",
        terms: [
          {
            term: "포커스 (focus)",
            body: "키보드 입력을 받을 요소로 지금 골라진 상태입니다. 한 번에 한 요소만 가질 수 있고 Tab 키로 다음 요소에 넘깁니다. 회의실의 마이크가 하나뿐이라 쥔 사람만 말하고, 차례로 넘기는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":focus-visible",
        body: "`:focus`에 맞으면서, 브라우저가 포커스를 눈에 보여야 한다고 판단할 때만 맞습니다. 판단은 입력 방식을 보고 합니다. 특이성은 0-1-0입니다.\n마우스로 버튼을 누르면 대개 맞지 않습니다. 사용자가 어디를 눌렀는지 이미 알기 때문입니다. Tab 키로 옮겨 오거나, 글을 쳐야 하는 칸에 포커스가 가면 맞습니다. MDN은 스크립트가 포커스를 옮길 때도 표시가 필요하다고 적습니다.\n그래서 포커스 모양을 바꿀 때는 `:focus` 대신 `:focus-visible`을 씁니다. 언제 보일지는 브라우저 판단에 맡기고 모양만 바꾸게 됩니다. 지원은 Chrome 86, Safari 15.4, Firefox 85부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["button:focus-visible", "0-1-0", ":focus 가운데 표시가 필요한 요소"]],
          },
          {
            caption: ":focus와 :focus-visible",
            head: ["한 일", ":focus", ":focus-visible"],
            rows: [
              ["마우스로 버튼 누르기", "맞음", "대개 안 맞음"],
              ["Tab으로 버튼에 오기", "맞음", "맞음"],
              ["글 칸을 마우스로 누르기", "맞음", "맞음"],
            ],
          },
        ],
        code: `button:focus-visible {
  outline: 3px solid crimson;
  outline-offset: 2px;
}`,
        codeLang: "css",
        terms: [
          {
            term: "휴리스틱 (heuristic)",
            body: "정확한 규칙 대신 경험에 기대어 '대개 맞는' 답을 고르는 방법입니다. 브라우저는 마지막 입력이 키보드였는지, 요소가 글을 받는 칸인지를 보고 포커스 표시를 정합니다. 길을 아는 손님은 그냥 두고, 두리번거리는 손님에게만 다가가 안내하는 점원과 같습니다.",
          },
        ],
      },
      {
        label: ":focus-within",
        body: "자신이 포커스를 가졌거나, 자손 가운데 하나가 가졌을 때 맞습니다. 섀도 트리 안의 자손도 셉니다. 특이성은 0-1-0입니다.\n폼 전체나 카드를 강조할 때 씁니다. 칸 하나에 포커스가 가면 그 칸을 품은 `form`, `fieldset`, `div`가 모두 맞습니다. 드롭다운 메뉴에도 씁니다. `:hover`와 함께 적으면 마우스와 키보드 모두로 열립니다. 지원은 Chrome 60, Safari 10.1, Firefox 52부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["form:focus-within", "0-1-0", "포커스를 가진 요소와 그 조상"]],
          },
        ],
        code: `form:focus-within { background: #fffbe6; }
.menu:hover > ul,
.menu:focus-within > ul { display: block; }   /* 마우스와 키보드 모두 */`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 클릭과 Tab, 포커스 셋",
        body: "버튼을 마우스로 누르면 `:focus`는 true지만 `:focus-visible`은 대개 false입니다. 브라우저와 운영체제에 따라 누른 버튼이 아예 포커스를 받지 않기도 합니다.\n이번에는 '상자 밖의 글'을 누른 뒤 Tab을 눌러 보세요. 글 칸, 버튼 순서로 오면서 둘 다 true가 되고 붉은 윤곽이 그려집니다. macOS의 Safari는 기본 설정에서 Tab이 글 칸만 돕니다. 글 칸은 마우스로 눌러도 `:focus-visible`이 true입니다. 둘 가운데 어디에 포커스가 있든 `.box`의 `:focus-within`은 true입니다. 기록에는 focus 줄이 남습니다.",
        lab: {
          html: `<style>
  :focus-visible { outline: 3px solid crimson; }
  .box:focus-within { background: #fef3c7; }
</style>
<div class="box">
  <input placeholder="글 칸">
  <button>버튼</button>
</div>
<p>상자 밖의 글</p>`,
          height: 160,
          logFocus: true,
          checks: [
            { label: "activeElement", expr: "document.activeElement.localName" },
            { label: "button이 :focus", expr: "document.querySelector('button').matches(':focus')" },
            { label: "button이 :focus-visible", expr: "document.querySelector('button').matches(':focus-visible')" },
            { label: "input이 :focus-visible", expr: "document.querySelector('input').matches(':focus-visible')" },
            { label: ".box가 :focus-within", expr: "document.querySelector('.box').matches(':focus-within')" },
          ],
          tryIt: ":focus-visible을 :focus로 바꾸고 실행해 보세요. 마우스로 버튼을 눌러도 윤곽이 생깁니다.",
        },
      },
      {
        label: ":target",
        body: "주소의 조각 식별자(# 뒤)와 id가 같은 요소를 고릅니다. 주소가 `/help/#setup`이면 `id=\"setup\"`인 요소가 목표입니다. 조각이 없으면 목표도 없습니다. 특이성은 0-1-0입니다.\n목표는 문서를 열 때, 그리고 `history.back()`, `forward()`, `go()` 때 정해집니다. 같은 문서 안의 # 링크를 누를 때도 바뀝니다. 하지만 `history.pushState()`, `replaceState()`로 주소를 바꾸면 바뀌지 않습니다. 웹 컴포넌트의 섀도 트리 안에서는 동작하지 않습니다.\n목차에서 누른 절을 강조할 때 씁니다. 이 작은 창에는 `:target`에 주황 윤곽이 미리 들어 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["section:target", "0-1-0", "id가 주소의 #과 같은 요소"]],
          },
        ],
        code: `section:target { background: gold; }
:target::before { content: "▶ "; }`,
        codeLang: "css",
        terms: [
          {
            term: "조각 식별자 (fragment identifier)",
            body: "주소에서 # 뒤의 부분입니다. 서버로 보내지 않고, 브라우저가 문서 안의 위치를 찾는 데 씁니다. 책 제목 뒤에 '37쪽'이라고 덧붙여 어디를 펼칠지 알려 주는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 조각 주소로 목표 바꾸기",
        body: "'첫 절로'를 누르면 기록에 hashchange가 남고 `:target`이 t1이 됩니다. t1의 바탕이 gold가 되고, 미리 넣은 주황 윤곽도 생깁니다. '없는 id로'를 누르면 주소는 바뀌어도 `:target`은 없습니다.\n마지막 버튼은 `history.replaceState()`로 주소만 #t2로 바꿉니다. location.hash는 #t2가 되지만, MDN이 적은 대로 `:target`은 그대로입니다.",
        lab: {
          html: `<style>
  p:target { background: gold; }
</style>
<p><a href="#t1">첫 절로</a> | <a href="#t2">둘째 절로</a> | <a href="#none">없는 id로</a></p>
<p id="t1">첫 절</p>
<p id="t2">둘째 절</p>
<button onclick="history.replaceState(null, '', '#t2')">replaceState로 #t2</button>`,
          height: 200,
          checks: [
            { label: "location.hash", expr: "location.hash || '(없음)'" },
            { label: ":target인 요소", expr: "document.querySelector(':target')?.id ?? '(없음)'" },
            { label: "#t1의 background-color", expr: "getComputedStyle(document.getElementById('t1')).backgroundColor" },
          ],
          tryIt: "replaceState 버튼을 누른 뒤 '첫 절로'를 눌러 보세요. 링크로 옮겨 가야 목표가 바뀝니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "사용자 동작 가상 클래스에서 자주 보는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["a:hover를 a:link 앞에 적음", "방문 안 한 링크에 hover 색이 안 나옴", "LVHA 순서로 적기"],
              ["a:visited에 font-weight를 줌", "무시됨", ":visited에는 색 속성만"],
              ["a:visited에서만 바탕색을 줌", "바탕이 안 바뀜", "a에 먼저 바탕색 주기"],
              ["getComputedStyle로 방문 여부를 읽음", "늘 방문 전의 색이 나옴", "막혀 있어 읽을 수 없음"],
              [":focus { outline: none }", "키보드 사용자가 위치를 잃음", ":focus-visible에 대신할 윤곽"],
              ["메뉴를 :hover로만 엶", "터치나 키보드로 못 엶", ":focus-within을 함께 적기"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 링크 네 규칙을 LVHA 순서로 적어야 하는 이유는?\n2) `:visited`로 font-weight를 바꿀 수 없는 이유는?\n3) 마우스로 버튼을 눌렀을 때 `:focus`와 `:focus-visible`은 각각 어떤가요?\n4) `history.pushState()`로 #을 바꾸면 `:target`도 바뀌나요?",
      },
    ],
    sources: [
      { label: "MDN — :visited", href: `${MDN}/Reference/Selectors/:visited` },
      { label: "MDN — Privacy and the :visited selector", href: `${MDN}/Guides/Selectors/Privacy_and_:visited` },
      { label: "MDN — :hover", href: `${MDN}/Reference/Selectors/:hover` },
      { label: "MDN — :focus-visible", href: `${MDN}/Reference/Selectors/:focus-visible` },
      { label: "MDN — :target", href: `${MDN}/Reference/Selectors/:target` },
    ],
  },

  {
    id: "css-sel-form",
    name: "폼 상태 가상 클래스",
    tagline: "체크, 켜짐, 필수, 유효, 범위, 편집 가능 여부로 폼 요소를 고른다",
    intro:
      "폼 컨트롤은 사용자가 만지는 동안 상태가 계속 바뀝니다. 이 가상 클래스들은 그 상태를 선택자로 씁니다. 체크됐는지, 쓸 수 있는지, 꼭 채워야 하는지를 봅니다. 값이 규칙에 맞는지, 범위 안인지, 고칠 수 있는지도 봅니다. 속성 선택자와 달리 지금 상태를 따라갑니다. 특이성은 모두 0-1-0입니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "열여덟 가상 클래스를 짝지어 늘어놓았습니다. 짝은 대개 서로 반대입니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              [":checked", "체크된 checkbox, radio, 고른 option", "0-1-0", "1장 · 문법과 선택자"],
              [":indeterminate", "상태가 정해지지 않은 컨트롤", "0-1-0", ""],
              [":default", "묶음에서 기본인 컨트롤", "0-1-0", ""],
              [":disabled", "꺼진 컨트롤", "0-1-0", ""],
              [":enabled", "켜진 컨트롤", "0-1-0", ""],
              [":required", "required가 있는 input, select, textarea", "0-1-0", ""],
              [":optional", "required가 없는 input, select, textarea", "0-1-0", ""],
              [":valid", "값이 제약에 맞는 요소", "0-1-0", ""],
              [":invalid", "값이 제약에 어긋난 요소", "0-1-0", ""],
              [":user-valid", "사용자가 만진 뒤 맞는 요소", "0-1-0", ""],
              [":user-invalid", "사용자가 만진 뒤 어긋난 요소", "0-1-0", ""],
              [":in-range", "min, max 안의 값", "0-1-0", ""],
              [":out-of-range", "min, max 밖의 값", "0-1-0", ""],
              [":placeholder-shown", "자리표시자가 보이는 칸", "0-1-0", ""],
              [":read-only", "사용자가 고칠 수 없는 요소", "0-1-0", ""],
              [":read-write", "사용자가 고칠 수 있는 요소", "0-1-0", ""],
              [":autofill", "브라우저가 자동으로 채운 input", "0-1-0", ""],
              [":open", "열린 details, dialog, select 등", "0-1-0", ""],
            ],
          },
        ],
      },
      {
        label: ":checked",
        body: "체크된 checkbox, 선택된 radio, `<select>` 안에서 고른 `<option>`을 고릅니다. 사용자가 체크하면 맞고, 풀면 빠집니다. 특이성은 0-1-0입니다.\n`[checked]` 속성 선택자와 다릅니다. checked 속성은 처음 상태만 적어 두고, 사용자가 눌러도 바뀌지 않습니다. 지금 상태는 `:checked`로 봅니다.\n`input:checked + label`처럼 형제 결합자와 함께 써서 라벨이나 뒤따르는 내용을 꾸밉니다. `<option>`은 대체 요소처럼 그려져 꾸밀 수 있는 범위가 브라우저마다 다릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:checked", "0-1-0", "체크된 checkbox, radio, 고른 option"]],
          },
        ],
        code: `input:checked + label { color: crimson; }
option:checked { font-weight: bold; }
#more:checked ~ .panel { display: block; }   /* 체크 상자로 여닫기 */`,
        codeLang: "css",
        terms: [
          {
            term: "체크 상태 (checkedness)",
            body: "요소가 지금 체크됐는지를 나타내는 안쪽 값입니다. checked 속성은 처음 값만 정하고, 사용자가 누르면 안쪽 값만 바뀝니다. `:checked`는 안쪽 값을, `[checked]`와 `:default`는 속성을 봅니다. 달력에 적어 둔 계획과 오늘 실제로 한 일이 다를 수 있는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":indeterminate",
        body: "상태가 정해지지 않은 폼 요소를 고릅니다. 세 경우입니다. 특이성은 0-1-0입니다.\n1) 스크립트로 `indeterminate` 값을 true로 둔 checkbox. 이 상태는 HTML 속성으로 적을 수 없습니다.\n2) name이 같은 radio 묶음에서 아무것도 고르지 않았을 때의 radio 전부.\n3) value가 없는 `<progress>`.\n'모두 선택' 상자가 일부만 체크됐음을 보일 때 씁니다. 사용자가 그 상자를 누르면 HTML 표준에 따라 indeterminate 값이 false로 돌아갑니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:indeterminate", "0-1-0", "checkbox, radio, progress"]],
          },
        ],
        code: `input:indeterminate + label { background: lime; }
progress:indeterminate { inline-size: 100%; }`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 스크립트로 만든 :indeterminate",
        body: "스크립트가 '모두 선택' 상자의 indeterminate 값을 true로 둡니다. 그래서 처음에는 그 상자가 `:indeterminate`이고 checked는 false입니다. 라벨을 누르면 기록에 label과 checkbox 클릭이 남습니다. 동시에 indeterminate 값이 풀려 lime이 사라지고 checked가 true가 됩니다.\nradio 둘은 묶음에서 아무것도 고르지 않아 둘 다 `:indeterminate`입니다. 하나를 고르면 둘 다 빠집니다. value가 없는 progress도 맞습니다.",
        lab: {
          html: `<style>
  :indeterminate + label { background: lime; }
</style>
<p><input type="checkbox" id="all"><label for="all">모두 선택</label></p>
<p><input type="radio" name="g" id="r1"><label for="r1">가</label>
  <input type="radio" name="g" id="r2"><label for="r2">나</label></p>
<progress id="pg"></progress>
<script>
  document.getElementById('all').indeterminate = true;
</script>`,
          height: 180,
          checks: [
            { label: "#all이 :indeterminate", expr: "document.getElementById('all').matches(':indeterminate')" },
            { label: "#all.checked", expr: "document.getElementById('all').checked" },
            { label: "#r1이 :indeterminate", expr: "document.getElementById('r1').matches(':indeterminate')" },
            { label: "progress가 :indeterminate", expr: "document.getElementById('pg').matches(':indeterminate')" },
          ],
          tryIt: "progress에 value=\"0.5\"를 넣고 실행해 보세요. 마지막 줄이 false가 됩니다.",
        },
      },
      {
        label: ":default",
        body: "관련된 요소 묶음에서 기본인 폼 요소를 고릅니다. 무엇이 기본인지는 HTML 표준이 요소마다 정합니다. 특이성은 0-1-0입니다.\n1) checkbox, radio는 HTML에 checked 속성이 있으면 맞습니다.\n2) `<option>`은 selected 속성이 있으면 맞습니다. multiple select면 여럿이 맞습니다.\n3) 제출 버튼은 폼의 기본 버튼이면 맞습니다. 폼에 속한 첫 제출 버튼이고, submit과 image 타입의 input도 됩니다.\n사용자가 다른 것을 골라도 `:default`는 그대로입니다. 처음 값을 표시해 두거나, 엔터 키로 눌릴 버튼을 강조할 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:default", "0-1-0", "checkbox, radio, option, 기본 제출 버튼"]],
          },
        ],
        code: `input:default + label::after { content: " (기본)"; }
button:default { font-weight: bold; }   /* 엔터를 치면 눌리는 버튼 */`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: :checked는 따라가고 :default는 남는다",
        body: "처음에는 news와 m이 `:checked`이자 `:default`입니다. '크게' 라벨을 눌러 보세요. 기록에 label과 radio 클릭이 남고, `:checked`는 news, l로 바뀝니다. `:default`는 HTML에 checked를 적은 news, m 그대로입니다.\n'보통' 라벨의 color도 보세요. 더는 `:checked`가 아니라 crimson이 풀리고 body의 색으로 돌아갑니다. 밑줄은 `:default`라서 남습니다.",
        lab: {
          html: `<style>
  input:checked + label { color: crimson; }
  input:default + label { text-decoration: underline; }
</style>
<p><input type="checkbox" id="news" checked><label for="news">소식 받기</label></p>
<p><input type="radio" name="size" id="s"><label for="s">작게</label>
  <input type="radio" name="size" id="m" checked><label for="m">보통</label>
  <input type="radio" name="size" id="l"><label for="l">크게</label></p>`,
          height: 150,
          checks: [
            { label: ":checked인 것", expr: "[...document.querySelectorAll(':checked')].map((e) => e.id).join(', ') || '(없음)'" },
            { label: ":default인 것", expr: "[...document.querySelectorAll(':default')].map((e) => e.id).join(', ') || '(없음)'" },
            { label: "'보통' 라벨의 color", expr: "getComputedStyle(document.querySelector('label[for=\"m\"]')).color" },
          ],
          tryIt: "'소식 받기' 라벨을 눌러 체크를 풀어 보세요. :checked에서는 빠지고 :default에는 남습니다.",
        },
      },
      {
        label: ":disabled",
        body: "꺼진 요소를 고릅니다. 꺼진 요소는 누르거나, 고르거나, 글을 칠 수 없고 포커스도 받지 않습니다. 특이성은 0-1-0입니다.\n`disabled` 속성이 있는 button, input, select, textarea, optgroup, option, fieldset이 맞습니다. `<fieldset disabled>` 안의 컨트롤도 꺼집니다. 단 그 fieldset의 첫 `<legend>` 안에 있는 것은 빠집니다.\n그래서 `[disabled]`보다 `:disabled`가 정확합니다. 속성 선택자는 fieldset 때문에 꺼진 자식을 놓칩니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:disabled", "0-1-0", "꺼진 폼 컨트롤"]],
          },
        ],
        code: `input:disabled { background: #eee; cursor: not-allowed; }
fieldset:disabled { opacity: .6; }`,
        codeLang: "css",
      },
      {
        label: ":enabled",
        body: "켤 수도 끌 수도 있는 요소 가운데 지금 켜진 것을 고릅니다. 누르고, 고르고, 글을 치고, 포커스를 받을 수 있는 상태입니다. 특이성은 0-1-0입니다.\n`:not(:disabled)`와 같지 않습니다. `:enabled`는 button, input 같은 폼 컨트롤에만 맞습니다. `p`, `div`처럼 꺼질 수 없는 요소는 `:enabled`에도 `:disabled`에도 맞지 않습니다. 반면 `:not(:disabled)`는 그런 요소까지 모두 고릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:enabled", "0-1-0", "켜진 폼 컨트롤"]],
          },
        ],
        code: `input:enabled { border-color: teal; }
button:enabled:hover { background: #e0f2f1; }`,
        codeLang: "css",
      },
      {
        label: ":required",
        body: "`required` 속성이 있는 `<input>`, `<select>`, `<textarea>`를 고릅니다. 제출 전에 꼭 채워야 하는 칸을 표시할 때 씁니다. 특이성은 0-1-0입니다.\n접근성에서는 색만으로 필수임을 알리지 않습니다. 글자나 아이콘을 함께 둡니다. required 속성 자체도 꼭 적습니다. 화면 읽기 프로그램이 그 속성으로 필수 칸을 알려 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:required", "0-1-0", "required가 있는 input, select, textarea"]],
          },
        ],
        code: `input:required { border-left: 4px solid maroon; }
label:has(+ input:required)::after { content: " *"; }`,
        codeLang: "css",
      },
      {
        label: ":optional",
        body: "`required`가 없는 `<input>`, `<select>`, `<textarea>`를 고릅니다. `:required`의 반대입니다. 특이성은 0-1-0입니다.\n이 세 요소에만 맞습니다. button이나 일반 요소는 `:optional`에도 `:required`에도 맞지 않습니다. 필수 칸이 많은 폼이라면 선택 칸 쪽을 표시하는 편이 깔끔할 때가 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:optional", "0-1-0", "required가 없는 input, select, textarea"]],
          },
        ],
        code: `input:optional + .hint::after { content: " (선택)"; }`,
        codeLang: "css",
      },
      {
        label: ":valid",
        body: "값이 제약 검사를 통과한 요소를 고릅니다. 제약은 required, type, pattern, min, max, maxlength 같은 속성입니다. `<form>`과 `<fieldset>`도 안의 컨트롤이 모두 맞으면 `:valid`입니다. 특이성은 0-1-0입니다.\n필수가 아닌 칸은 비어 있어도 맞습니다. required가 없는 빈 `type=\"email\"` 칸은 `:valid`입니다.\n초록색만으로 '맞음'을 알리면 색을 구별하기 어려운 사람은 알 수 없습니다. 글자나 아이콘을 함께 둡니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:valid", "0-1-0", "제약에 맞는 폼 컨트롤, form, fieldset"]],
          },
        ],
        code: `input:valid + .mark::before { content: "✓ "; color: green; }
form:valid button[type="submit"] { opacity: 1; }`,
        codeLang: "css",
        terms: [
          {
            term: "제약 검사 (constraint validation)",
            body: "브라우저가 폼 값을 required, type, pattern, min, max 같은 규칙에 비춰 보는 일입니다. 그 결과가 :valid와 :invalid를 정합니다. 스크립트 없이 HTML 속성만으로 돌아갑니다. 택배 창구 직원이 접수 전에 상자 크기와 주소 칸을 확인하는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":invalid",
        body: "값이 제약 검사에 걸린 요소를 고릅니다. 안의 컨트롤 하나라도 어긋나면 `<form>`과 `<fieldset>`도 `:invalid`입니다. 특이성은 0-1-0입니다.\n가장 흔한 문제는 시점입니다. 필수 칸은 페이지가 열리자마자 비어 있으니 바로 `:invalid`입니다. 사용자가 아무것도 하기 전에 빨간 테두리가 보입니다. 만진 뒤에만 표시하려면 `:user-invalid`를 씁니다.\nname이 같은 radio는 하나에만 required가 있어도 묶음으로 검사합니다. 아무것도 고르지 않으면 묶음 전부가 `:invalid`입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:invalid", "0-1-0", "제약에 어긋난 폼 컨트롤, form, fieldset"]],
          },
        ],
        code: `input:invalid { border-color: #c00; }           /* 열자마자 빨갛다 */
fieldset:invalid ~ fieldset { display: none; }  /* 앞 칸을 채워야 다음이 보인다 */`,
        codeLang: "css",
      },
      {
        label: ":user-valid",
        body: "`:valid`와 같지만 사용자가 그 칸을 만진 뒤에만 맞습니다. 다음 가운데 하나가 일어나야 합니다. 특이성은 0-1-0입니다.\n1) 값을 바꾸고 포커스를 다른 곳으로 옮겨 확정했다.\n2) 바꾸지 않았어도 폼 제출을 시도했다.\n3) 포커스를 받을 때 값이 틀렸는데, 고쳐서 맞게 만들었다. 이때는 포커스가 칸에 있어도 바로 맞습니다.\n한 번 맞기 시작하면, 포커스가 있는 동안 글자를 칠 때마다 다시 검사합니다. 지원은 Chrome 119, Safari 16.5, Firefox 88부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:user-valid", "0-1-0", "사용자가 만진 뒤 제약에 맞는 컨트롤"]],
          },
        ],
        code: `input:user-valid { border-color: green; }
input:user-valid + .mark::before { content: "✓ "; }`,
        codeLang: "css",
      },
      {
        label: ":user-invalid",
        body: "`:invalid`와 같지만 사용자가 그 칸을 만진 뒤에만 맞습니다. 값을 바꾸고 빠져나왔거나 제출을 시도했을 때입니다. 열자마자 빨간 칸이 보이는 `:invalid`의 문제를 고칩니다. 특이성은 0-1-0입니다.\n규칙상 `:invalid`, `:out-of-range`, 비어 있는 `:required` 칸은 제출을 시도하면 여기에 맞습니다. 사용자가 그 칸을 다시 만질 때까지 그대로입니다. 그래서 아무것도 치지 않고 제출을 눌러도 빈 필수 칸이 표시됩니다. Firefox는 기본 스타일로 `:user-invalid`에 붉은 그림자를 줍니다. 지원은 Chrome 119, Safari 16.5, Firefox 88부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:user-invalid", "0-1-0", "사용자가 만진 뒤 제약에 어긋난 컨트롤"]],
          },
          {
            caption: ":invalid와 :user-invalid",
            head: ["때", ":invalid", ":user-invalid"],
            rows: [
              ["빈 필수 칸, 페이지를 막 열었을 때", "맞음", "안 맞음"],
              ["틀린 값을 치고 빠져나온 뒤", "맞음", "맞음"],
              ["빈 채로 제출을 시도한 뒤", "맞음", "맞음"],
            ],
          },
        ],
        code: `input:user-invalid { border-color: crimson; }
input:user-invalid + .mark::before { content: "✖ "; color: crimson; }`,
        codeLang: "css",
        terms: [
          {
            term: "사용자 상호작용 (user interaction)",
            body: "사용자가 칸의 값을 바꾸고 확정하거나, 제출을 시도한 일입니다. :user-valid와 :user-invalid는 이 일이 있은 뒤에만 맞습니다. 시험지를 나눠 주자마자 채점하지 않고, 답을 적어 낸 뒤에 채점하는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: :invalid와 :user-invalid",
        body: "처음에는 빈 필수 칸이라 `:invalid`가 true입니다. 바탕은 붉지만 `:user-invalid`는 false라 윤곽은 없습니다.\n1) 칸에 abc를 치고 Tab으로 빠져나오세요. 값을 바꾸고 확정했으니 `:user-invalid`가 true가 됩니다.\n2) 다시 칸으로 돌아와 a@b.c로 고치세요. 틀린 값을 고쳐 맞췄으니 포커스가 있어도 바로 `:user-valid`가 true입니다.\n3) 값이 틀린 채로 '보내기'를 누르면 브라우저가 제출을 막고, 기록에 invalid가 남습니다.\n`form`도 안의 칸을 따라 `:invalid`가 됐다 풀렸다 합니다.",
        lab: {
          html: `<style>
  input:invalid { background: #fee2e2; }
  input:user-invalid { outline: 3px solid crimson; }
  input:user-valid { outline: 3px solid green; }
</style>
<form onsubmit="event.preventDefault()">
  <label>메일 <input type="email" id="mail" required></label>
  <button>보내기</button>
</form>`,
          height: 140,
          logInput: true,
          checks: [
            { label: "value", expr: "document.getElementById('mail').value || '(비어 있음)'" },
            { label: ":invalid", expr: "document.getElementById('mail').matches(':invalid')" },
            { label: ":user-invalid", expr: "document.getElementById('mail').matches(':user-invalid')" },
            { label: ":valid", expr: "document.getElementById('mail').matches(':valid')" },
            { label: ":user-valid", expr: "document.getElementById('mail').matches(':user-valid')" },
            { label: "form이 :invalid", expr: "document.querySelector('form').matches(':invalid')" },
          ],
          tryIt: "다시 실행하고 아무것도 치지 않은 채 '보내기'를 눌러 보세요. 만지지 않았어도 :user-invalid가 true가 됩니다.",
        },
      },
      {
        label: ":in-range",
        body: "min, max로 범위를 정할 수 있는 `<input>`에서 값이 그 안에 있을 때 맞습니다. number, range, date 같은 타입입니다. 특이성은 0-1-0입니다.\n범위를 가질 수 없는 요소는 `:in-range`에도 `:out-of-range`에도 맞지 않습니다. `type=\"text\"`에 min을 적어도 마찬가지입니다. 값이 허용 범위 안이라는 것을 눈으로 확인시킬 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:in-range", "0-1-0", "min, max가 통하고 값이 범위 안인 input"]],
          },
        ],
        code: `input:in-range { border-color: green; }
input:in-range + .hint::after { content: " 범위 안"; }`,
        codeLang: "css",
      },
      {
        label: ":out-of-range",
        body: "min, max가 있는 `<input>`의 값이 범위를 벗어났을 때 맞습니다. 범위를 벗어난 값은 제약 검사에도 걸리므로 `:invalid`에도 함께 맞습니다. 특이성은 0-1-0입니다.\n빈 칸은 범위 밖이 아닙니다. 그래서 빈 칸을 경고하려고 `:out-of-range`를 쓰면 아무 일도 없습니다. 빈 칸까지 잡으려면 required를 주고 `:invalid`나 `:user-invalid`를 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:out-of-range", "0-1-0", "min, max가 통하고 값이 범위 밖인 input"]],
          },
        ],
        code: `input:out-of-range { background: rgb(255 0 0 / 25%); }
input:out-of-range + .hint::after { content: " 범위 밖"; }`,
        codeLang: "css",
      },
      {
        label: ":placeholder-shown",
        body: "자리표시자 글이 지금 보이는 `<input>`, `<textarea>`를 고릅니다. placeholder 속성이 있고 값이 비어 있을 때입니다. 사용자가 한 글자라도 치면 빠집니다. 특이성은 0-1-0입니다.\n자리표시자 글 자체의 색과 글꼴은 가상 요소 `::placeholder`로 꾸밉니다. `:placeholder-shown`은 칸 전체를 고른다는 점이 다릅니다. `input:not(:placeholder-shown)`으로 '무언가 적힌 칸'을 고를 수도 있습니다. 지원은 Chrome 47, Safari 9, Firefox 51부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:placeholder-shown", "0-1-0", "자리표시자가 보이는 input, textarea"]],
          },
        ],
        code: `input:placeholder-shown {
  border-style: dashed;
  text-overflow: ellipsis;   /* 긴 자리표시자를 줄임표로 */
}
input:not(:placeholder-shown) + label { font-size: .75em; }`,
        codeLang: "css",
        terms: [
          {
            term: "자리표시자 (placeholder)",
            body: "빈 칸에 흐리게 보이는 안내 글입니다. 값이 아니라서 제출되지 않고, 한 글자라도 치면 사라집니다. 빈 주차 칸 바닥에 그려진 '경차' 글씨가 차가 들어오면 가려지는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":read-only",
        body: "사용자가 고칠 수 없는 요소를 고릅니다. readonly가 있는 input, textarea가 대표입니다. 그런데 범위가 훨씬 넓습니다. 특이성은 0-1-0입니다.\nreadonly가 의미 없는 checkbox, radio도 맞습니다. `p`, `div` 같은 일반 요소도 모두 맞습니다. `:read-write`에 맞지 않는 모든 것이라 `:not(:read-write)`와 같습니다. HTML 표준은 꺼진(disabled) 칸도 고칠 수 없는 것으로 봅니다.\n그래서 `:read-only`만 적으면 문서 전체가 맞습니다. 앞에 `input`, `textarea`를 붙여 범위를 좁힙니다. 지원은 Chrome 1, Safari 4, Firefox 78부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:read-only", "0-1-0", "고칠 수 없는 모든 요소"]],
          },
        ],
        code: `input:read-only,
textarea:read-only {
  border: 0;
  background: #f4f4f4;
}`,
        codeLang: "css",
      },
      {
        label: ":read-write",
        body: "사용자가 고칠 수 있는 요소를 고릅니다. readonly도 disabled도 없는 글 입력 칸과 textarea가 맞습니다. `contenteditable`이 켜진 요소도 맞습니다. 특이성은 0-1-0입니다.\n폼 밖의 요소도 맞습니다. `<p contenteditable>`은 `:read-write`입니다. 편집할 수 있는 영역을 표시할 때 씁니다. 지원은 Chrome 1, Safari 4, Firefox 78부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["textarea:read-write", "0-1-0", "고칠 수 있는 input, textarea, contenteditable"]],
          },
        ],
        code: `textarea:read-write { box-shadow: inset 1px 1px 3px #ccc; }
[contenteditable]:read-write { outline: 1px dashed teal; }`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 범위, 자리표시자, 읽기 전용",
        body: "다섯 요소가 지금 맞는 폼 가상 클래스를 늘어놓습니다. number 칸은 값 12가 max 10을 넘어 `:out-of-range`입니다. `:invalid`도 함께 맞습니다. 값을 5로 고치면 `:in-range`, `:valid`로 바뀝니다.\n자리표시자 칸에 글자를 치면 `:placeholder-shown`이 빠집니다. readonly 칸과 꺼진 칸은 `:read-only`입니다. 문단은 폼 컨트롤이 아니라 `:enabled`에 맞지 않습니다. 하지만 contenteditable이라 `:read-write`에는 맞습니다.",
        lab: {
          html: `<style>
  input:out-of-range { background: #fee2e2; }
  input:placeholder-shown { border-style: dashed; }
  input:read-only { color: gray; }
</style>
<p><input id="n" type="number" min="1" max="10" value="12"></p>
<p><input id="ph" placeholder="이름을 적으세요"></p>
<p><input id="ro" value="고칠 수 없음" readonly> <input id="off" value="꺼진 칸" disabled></p>
<p id="ed" contenteditable>고칠 수 있는 문단</p>`,
          height: 230,
          logInput: true,
          checks: [
            { label: "#n (number, min 1, max 10)", expr: "['in-range', 'out-of-range', 'placeholder-shown', 'read-only', 'read-write', 'enabled', 'disabled', 'valid', 'invalid'].filter((c) => document.getElementById('n').matches(':' + c)).join('  ')" },
            { label: "#ph (placeholder)", expr: "['in-range', 'out-of-range', 'placeholder-shown', 'read-only', 'read-write', 'enabled', 'disabled', 'valid', 'invalid'].filter((c) => document.getElementById('ph').matches(':' + c)).join('  ')" },
            { label: "#ro (readonly)", expr: "['in-range', 'out-of-range', 'placeholder-shown', 'read-only', 'read-write', 'enabled', 'disabled', 'valid', 'invalid'].filter((c) => document.getElementById('ro').matches(':' + c)).join('  ')" },
            { label: "#off (disabled)", expr: "['in-range', 'out-of-range', 'placeholder-shown', 'read-only', 'read-write', 'enabled', 'disabled', 'valid', 'invalid'].filter((c) => document.getElementById('off').matches(':' + c)).join('  ')" },
            { label: "#ed (contenteditable p)", expr: "['in-range', 'out-of-range', 'placeholder-shown', 'read-only', 'read-write', 'enabled', 'disabled', 'valid', 'invalid'].filter((c) => document.getElementById('ed').matches(':' + c)).join('  ')" },
          ],
          tryIt: "input:read-only에서 input을 지우고 실행해 보세요. body까지 맞아 글 전체가 gray가 됩니다.",
        },
      },
      {
        label: ":autofill",
        body: "브라우저가 자동 완성으로 값을 채운 `<input>`을 고릅니다. 사용자가 그 칸을 고치면 빠지고, 같은 값으로 되돌려도 다시 맞지 않습니다. 특이성은 0-1-0입니다.\n한 칸을 자동 완성하면 함께 채워진 다른 칸도 모두 맞습니다. 표준은 `:-webkit-autofill`을 같은 뜻의 별칭으로 둡니다.\n주의할 점은 브라우저 기본 스타일입니다. MDN에 따르면 Chrome은 고른 자동 채움 칸에 `!important` 스타일을 겁니다. 대상은 background-color, background-image, color입니다. 그래서 그 칸에서는 이 셋을 덮을 수 없습니다. outline, border-radius 같은 다른 속성은 바꿀 수 있습니다. 지원은 Chrome 110, Safari 15, Firefox 86부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["input:autofill", "0-1-0", "자동 채움 뒤 고치지 않은 input"]],
          },
        ],
        code: `input:autofill {
  outline: 3px dashed magenta;   /* 덮을 수 있다 */
  border-radius: .5lh;
}`,
        codeLang: "css",
      },
      {
        label: ":open",
        body: "열림과 닫힘 상태가 있는 요소 가운데 지금 열린 것을 고릅니다. 특이성은 0-1-0입니다.\n1) open 속성이 있는 `<details>`, `<dialog>`. `details[open]`과 같은 결과입니다.\n2) 색이나 날짜를 고르는 창을 띄운 `<input>`.\n3) 드롭다운 목록을 펼친 `<select>`. multiple select는 펼치는 목록이 없어 열림 상태도 없습니다.\n열림은 의미상의 상태라 화면에 보이는지와는 별개입니다. 팝오버의 표시 상태는 `:popover-open`으로 고릅니다. 지원은 Chrome 133, Safari 26.5, Firefox 136부터라 아직 새 기능입니다.",
        tables: [
          {
            caption: "정의",
            head: ["쓰는 꼴", "특이성", "맞는 요소"],
            rows: [["details:open", "0-1-0", "열린 details, dialog, select, 고르기 창 input"]],
          },
        ],
        code: `details:open > summary { background: pink; }
select:open { background-color: #f8f2dc; }
label:has(select:open) { border-color: #cd4631; }`,
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "폼 상태 가상 클래스에서 자주 보는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["input:invalid에 빨간 테두리", "필수 칸이 열자마자 빨갛다", ":user-invalid로 바꾸기"],
              ["[disabled]로 꺼진 칸 꾸미기", "fieldset disabled 안의 칸이 빠짐", ":disabled"],
              ["[checked]로 체크된 상자 꾸미기", "사용자가 눌러도 바뀌지 않음", ":checked"],
              [":out-of-range로 빈 칸 경고", "빈 칸은 범위 밖이 아니라 안 맞음", "required와 :invalid"],
              [":read-only { color: gray }", "문서 전체가 gray가 됨", "input:read-only처럼 좁히기"],
              ["input:autofill에 background-color", "Chrome의 !important에 막힘", "outline 같은 다른 속성"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 사용자가 상자를 눌렀을 때 `[checked]`와 `:checked`는 어떻게 다른가요?\n2) `:invalid` 대신 `:user-invalid`를 쓰는 이유는?\n3) `<p>`가 `:read-only`에는 맞고 `:enabled`에는 안 맞는 이유는?\n4) `:indeterminate`인 checkbox를 HTML 속성만으로 만들 수 있나요?",
      },
    ],
    sources: [
      { label: "MDN — :checked", href: `${MDN}/Reference/Selectors/:checked` },
      { label: "MDN — :default", href: `${MDN}/Reference/Selectors/:default` },
      { label: "MDN — :user-invalid", href: `${MDN}/Reference/Selectors/:user-invalid` },
      { label: "MDN — :read-only", href: `${MDN}/Reference/Selectors/:read-only` },
      { label: "MDN — :open", href: `${MDN}/Reference/Selectors/:open` },
      { label: "MDN — Constraint validation", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation" },
    ],
  },
  {
    id: "css-sel-tree",
    name: "구조 가상 클래스",
    tagline: "형제 사이의 자리와 자식 유무로 요소를 고른다",
    intro:
      "목록의 첫 줄만, 홀수 줄만, 비어 있는 칸만 꾸미고 싶을 때가 있습니다. 클래스를 하나하나 붙이지 않고 문서 트리 속 자리로 고르는 것이 구조 가상 클래스입니다. 이 시트는 열두 개를 '무엇을 세나', '어디서부터 세나', '특이성은 얼마인가'로 정리합니다. 셈이 어긋나는 흔한 실수도 함께 봅니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "구조 가상 클래스는 부모 안에서의 자리, 또는 자식이 있는지로 요소를 고릅니다. 특이성은 모두 클래스 하나와 같은 0-1-0입니다. `of S`를 쓴 `:nth-child()`와 `:nth-last-child()`만 S의 무게가 더해집니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              [":root", "문서의 뿌리 요소(HTML이면 html)", "0-1-0", "11장 · 커스텀 속성과 함수"],
              [":empty", "자식이 하나도 없는 요소", "0-1-0", ""],
              [":first-child", "형제 중 첫째", "0-1-0", "1장 · 문법과 선택자"],
              [":last-child", "형제 중 마지막", "0-1-0", ""],
              [":only-child", "형제가 없는 외동 요소", "0-1-0", ""],
              [":nth-child()", "형제 중 An+B번째", "0-1-0 + S", "1장 · 문법과 선택자"],
              [":nth-last-child()", "끝에서 센 An+B번째", "0-1-0 + S", ""],
              [":first-of-type", "같은 태그 중 첫째", "0-1-0", ""],
              [":last-of-type", "같은 태그 중 마지막", "0-1-0", ""],
              [":only-of-type", "같은 태그 형제가 없는 요소", "0-1-0", ""],
              [":nth-of-type()", "같은 태그 중 An+B번째", "0-1-0", ""],
              [":nth-last-of-type()", "같은 태그를 끝에서 센 An+B번째", "0-1-0", ""],
            ],
          },
        ],
        terms: [
          {
            term: "특이성",
            body: "규칙 여럿이 같은 요소를 고를 때 누가 이길지 정하는 점수입니다. ID, 클래스, 태그의 개수를 1-0-0 꼴의 세 자리로 적고 왼쪽 자리부터 견줍니다. 가상 클래스는 가운데 자리에 1을 더합니다(2장). 메달 순위를 금메달 수부터 견주는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":root",
        body: "문서 트리의 뿌리 요소를 고릅니다. HTML 문서에서는 `<html>` 요소입니다. 그래서 `html` 선택자와 같은 요소를 고릅니다. 차이는 특이성입니다. `:root`는 0-1-0이고 `html`은 0-0-1입니다. 전역 커스텀 속성을 모아 두는 자리로 흔히 씁니다(11장).",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":root", "0-1-0", "Chrome 1, Safari 1, Firefox 1"]],
          },
        ],
        code: ":root {\n  --main-color: hotpink;\n  --gap: 8px;\n}\nhtml { background: white; }   /* 0-0-1, :root의 규칙보다 약하다 */",
        codeLang: "css",
      },
      {
        label: ":empty",
        body: "자식이 하나도 없는 요소를 고릅니다. 여기서 자식은 요소와 글자 노드입니다. 공백 한 칸, 줄바꿈도 글자 노드라서 자식으로 칩니다. 주석은 자식으로 치지 않습니다. CSS `content`로 넣은 글자도 상관없습니다.\n\nSelectors Level 4는 공백만 든 요소도 비었다고 보도록 바꿨습니다. 하지만 MDN은 그렇게 동작하는 브라우저가 아직 없다고 적습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":empty", "0-1-0", "Chrome 1, Safari 3.1, Firefox 1"]],
          },
        ],
        code: ".badge:empty { display: none; }   /* 숫자가 없으면 숨김 */\ntd:empty { background: #f4f4f4; }",
        codeLang: "css",
        terms: [
          {
            term: "글자 노드",
            body: "요소 사이에 있는 글자 덩어리입니다. 화면에 안 보이는 공백과 줄바꿈도 글자 노드가 됩니다. 빈 상자에 투명 비닐 한 장이 들어 있어도 빈 상자가 아닌 것과 같습니다.",
          },
        ],
        notes: [
          {
            title: "빈 버튼은 이름이 없다",
            body: "아이콘만 든 버튼처럼 글자가 없는 조작 요소는 화면 읽기 프로그램이 이름을 읽지 못합니다. 글자를 넣고 화면에서만 숨기는 방법을 씁니다. `:empty`로 빈 요소를 찾을 수는 있지만 이름을 만들어 주지는 않습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: :empty와 공백, 주석",
        body: "상자 다섯 개 중 `:empty`에 맞는 것만 초록으로 칠합니다. 1번은 정말 빈 상자이고 2번은 주석만 든 상자입니다. 3번에는 공백 한 칸, 4번에는 줄바꿈이 들었습니다. 5번은 빈 상자에 `::before`로 글자를 넣었습니다.\n\nMDN대로라면 1, 2, 5번이 맞고 3, 4번은 맞지 않습니다. 지금 값의 childNodes 수를 보면 까닭이 보입니다. 3, 4번에는 글자 노드가 하나씩 있습니다. 2번도 노드가 하나지만 주석이라 세지 않습니다. 3번 상자의 공백을 지우고 실행하면 그 상자도 초록이 됩니다.",
        lab: {
          html: `<style>
  .box { display: inline-block; width: 60px; height: 32px; margin: 4px; background: pink; }
  .box:empty { background: lime; }
  .c::before { content: "가"; }
</style>
<div class="box"></div>
<div class="box"><!-- 주석 --></div>
<div class="box"> </div>
<div class="box">
</div>
<div class="box c"></div>`,
          height: 120,
          tryIt: "3번 상자의 공백을 지우거나, 1번 상자에 <span></span>을 넣어 보세요.",
          checks: [
            { label: ":empty에 맞나", expr: "[...document.querySelectorAll('.box')].map((d, i) => (i + 1) + ':' + d.matches(':empty')).join(' ')" },
            { label: "childNodes 수", expr: "[...document.querySelectorAll('.box')].map((d, i) => (i + 1) + ':' + d.childNodes.length).join(' ')" },
            { label: "칠해진 색", expr: "[...document.querySelectorAll('.box')].map((d, i) => (i + 1) + ':' + (getComputedStyle(d).backgroundColor === 'rgb(0, 255, 0)' ? '초록' : '분홍')).join(' ')" },
          ],
        },
      },
      {
        label: ":first-child",
        body: "부모의 자식 요소 중 첫째를 고릅니다. `p:first-child`는 'p 중 첫째'가 아닙니다. '첫째 자식이면서 p인 요소'입니다. 첫째 자식이 h2라면 그 부모 안의 p는 하나도 맞지 않습니다. 같은 태그 중 첫째를 원하면 `:first-of-type`을 씁니다. `:nth-child(1)`과 같은 요소를 고르고 특이성도 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":first-child", "0-1-0", "Chrome 4, Safari 3.1, Firefox 3"]],
          },
        ],
        code: "li:first-child { border-top: 0; }\n.card > :first-child { margin-top: 0; }",
        codeLang: "css",
        terms: [
          {
            term: "형제 요소",
            body: "부모가 같은 요소끼리를 형제라고 합니다. 구조 가상 클래스는 형제 요소만 세고 글자 노드는 세지 않습니다. 한 반의 출석 번호를 같은 반 학생끼리만 매기는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":last-child",
        body: "부모의 자식 요소 중 마지막을 고릅니다. `:first-child`와 같은 함정이 있습니다. `p:last-child`는 마지막 자식이 p일 때만 맞습니다. 목록 끝에 다른 요소가 붙으면 더는 맞지 않습니다. 목록 끝 줄의 구분선을 지울 때 자주 씁니다. `:nth-last-child(1)`과 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":last-child", "0-1-0", "Chrome 1, Safari 3.1, Firefox 1"]],
          },
        ],
        code: "li:last-child { border-bottom: 0; }\n.card > :last-child { margin-bottom: 0; }",
        codeLang: "css",
      },
      {
        label: ":only-child",
        body: "형제 요소가 하나도 없는, 부모의 유일한 자식 요소를 고릅니다. 글자 노드는 형제로 치지 않습니다. `:first-child:last-child`와 같은 요소를 고르지만 특이성은 더 낮습니다. 앞의 것은 0-2-0이고 `:only-child`는 0-1-0입니다. 항목이 하나뿐인 목록을 따로 꾸밀 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":only-child", "0-1-0", "Chrome 2, Safari 3.1, Firefox 1.5"]],
          },
        ],
        code: "li:only-child { list-style: none; }\n.grid > :only-child { grid-column: 1 / -1; }",
        codeLang: "css",
      },
      {
        label: ":nth-child()",
        body: "부모의 자식 요소에 1부터 번호를 매기고, 번호가 식에 맞는 요소를 고릅니다. 인자는 `odd`, `even`, 또는 `An+B` 식입니다. n에 0, 1, 2를 차례로 넣어 나온 번호가 고를 자리입니다. 0이나 음수 번호는 버립니다. 그래서 `-n+3`은 3, 2, 1번, 곧 앞의 셋입니다.\n\n번호는 태그와 상관없이 모든 형제 요소로 셉니다. `span:nth-child(3)`에서 셋째 자식이 em이면 그 자리는 맞지 않습니다.\n\n`of S`를 붙이면 S에 맞는 형제끼리만 번호를 매깁니다. `:nth-child(2n+1 of .x)`는 '.x 중 홀수째'입니다. `.x:nth-child(2n+1)`은 '홀수째 자리에 있는 .x'라서 결과가 다릅니다. 특이성은 0-1-0에 S 중 가장 무거운 것을 더합니다. `:nth-child(2n of .x)`는 0-2-0입니다. `of` 문법은 `:nth-child()` 자체보다 한참 늦게 들어왔습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":nth-child(An+B [of S])", "0-1-0 + S", "Chrome 1, Safari 3.1, Firefox 3.5"]],
          },
          {
            caption: ":nth-child()의 값",
            head: ["값", "하는 일"],
            rows: [
              ["odd", "홀수째(1, 3, 5번)"],
              ["even", "짝수째(2, 4, 6번)"],
              ["An+B", "n = 0, 1, 2를 넣어 나온 번호째"],
              ["of S", "S에 맞는 형제끼리만 번호를 매김"],
            ],
          },
          {
            caption: "자주 쓰는 식",
            head: ["식", "고르는 번호"],
            rows: [
              ["2n+1", "1, 3, 5 (odd와 같음)"],
              ["3n+4", "4, 7, 10"],
              ["5n", "5, 10, 15 (n=0의 0번은 버림)"],
              ["n+7", "7번부터 끝까지"],
              ["-n+3", "1, 2, 3 (앞의 셋)"],
              [":nth-child(n+3):nth-child(-n+5)", "3, 4, 5 (두 조건을 겹침)"],
            ],
          },
        ],
        code: "tr:nth-child(even) { background: #f6f6f6; }\nli:nth-child(-n + 3) { font-weight: bold; }            /* 앞의 셋 */\nli:nth-child(n + 3):nth-child(-n + 5) { color: teal; } /* 3~5번째 */\ntr:nth-child(even of :not([hidden])) { background: #eee; }",
        codeLang: "css",
        terms: [
          {
            term: "An+B",
            body: "n에 0, 1, 2를 차례로 넣어 번호 목록을 만드는 식입니다. A는 몇 칸씩 건너뛸지, B는 어디서 시작할지를 정합니다. 계단을 B번째 칸에서 시작해 A칸씩 오르는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: An+B와 of S",
        body: "li 여섯 개 중 1, 3, 4, 6번에 class=\"x\"가 있습니다. CSS 규칙 `li:nth-child(2n+1 of .x)`가 금색을 칠합니다. .x만 따로 세면 1번이 첫째, 4번이 셋째입니다. 그래서 1, 4번이 칠해집니다.\n\n지금 값에는 같은 목록을 다른 선택자로 고른 결과도 나옵니다. `:nth-child(2n+1)`은 1, 3, 5번입니다. `.x:nth-child(2n+1)`은 그중 .x인 1, 3번입니다. CSS 규칙의 식을 바꾸면 '칠해진 li' 줄이 따라 바뀝니다.",
        lab: {
          html: `<style>
  .x { font-weight: bold; }
  li:nth-child(2n+1 of .x) { background: gold; }
</style>
<ul>
  <li class="x">1 x</li>
  <li>2</li>
  <li class="x">3 x</li>
  <li class="x">4 x</li>
  <li>5</li>
  <li class="x">6 x</li>
</ul>`,
          height: 200,
          tryIt: "규칙의 식을 even of .x나 -n+3 of .x로 바꾸거나, class=\"x\"를 다른 li로 옮겨 보세요.",
          checks: [
            { label: "칠해진 li", expr: "[...document.querySelectorAll('li')].flatMap((li, i) => getComputedStyle(li).backgroundColor === 'rgba(0, 0, 0, 0)' ? [] : [i + 1]).join(', ') || '없음'" },
            { label: ":nth-child(2n+1)", expr: "[...document.querySelectorAll('li')].flatMap((li, i) => li.matches(':nth-child(2n+1)') ? [i + 1] : []).join(', ') || '없음'" },
            { label: ":nth-child(2n+1 of .x)", expr: "[...document.querySelectorAll('li')].flatMap((li, i) => li.matches(':nth-child(2n+1 of .x)') ? [i + 1] : []).join(', ') || '없음'" },
            { label: ".x:nth-child(2n+1)", expr: "[...document.querySelectorAll('li')].flatMap((li, i) => li.matches('.x:nth-child(2n+1)') ? [i + 1] : []).join(', ') || '없음'" },
          ],
        },
      },
      {
        label: ":nth-last-child()",
        body: "`:nth-child()`와 같지만 번호를 끝에서부터 매깁니다. 마지막 자식 요소가 1번입니다. `-n+3`은 끝의 셋을 고릅니다. `of S`도 똑같이 쓸 수 있습니다. 개수에 따라 스타일을 바꾸는 수량 쿼리에 쓰입니다. 아래 예의 두 선택자를 함께 쓰면 항목이 셋 이상일 때 모든 항목을 고릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":nth-last-child(An+B [of S])", "0-1-0 + S", "Chrome 4, Safari 3.1, Firefox 3.5"]],
          },
        ],
        code: "li:nth-last-child(-n + 2) { color: gray; }   /* 끝의 둘 */\n\n/* 항목이 셋 이상이면 모두 */\nli:nth-last-child(n + 3),\nli:nth-last-child(3) ~ li { font-size: 0.9em; }",
        codeLang: "css",
        terms: [
          {
            term: "수량 쿼리",
            body: "항목이 몇 개인지에 따라 스타일을 바꾸는 선택자 기법입니다. 끝에서 센 번호와 형제 결합자를 엮어 만듭니다. 손님 수를 보고 식탁 크기를 고르는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":first-of-type",
        body: "형제 중 같은 태그(요소 이름)의 첫째를 고릅니다. 클래스가 아니라 태그로 셉니다. 제목 다음의 첫 문단을 고를 때 `p:first-of-type`이 맞습니다. 태그를 안 적으면 `*`를 붙인 것과 같아서 태그마다 첫째를 하나씩 고릅니다. `.item:first-of-type`은 '.item 중 첫째'가 아닙니다. '자기 태그의 첫째이면서 .item인 요소'입니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":first-of-type", "0-1-0", "Chrome 1, Safari 3.1, Firefox 3.5"]],
          },
        ],
        code: "article p:first-of-type { font-size: 1.1em; }\narticle :first-of-type { color: teal; }   /* 태그마다 첫째 */",
        codeLang: "css",
      },
      {
        label: ":last-of-type",
        body: "형제 중 같은 태그의 마지막을 고릅니다. 뒤에 다른 태그가 붙어도 상관없습니다. 그래서 끝에 다른 요소가 따라붙는 곳에서는 `:last-child`보다 믿을 만합니다. 클래스와 함께 쓰면 '그 태그의 마지막이면서 그 클래스'라는 뜻입니다. 그 태그의 마지막이 그 클래스가 아니면 아무것도 맞지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":last-of-type", "0-1-0", "Chrome 1, Safari 3.1, Firefox 3.5"]],
          },
        ],
        code: "section > p:last-of-type { margin-bottom: 0; }\n.list .item:last-of-type { border: 0; }",
        codeLang: "css",
      },
      {
        label: ":only-of-type",
        body: "형제 중 같은 태그가 자기 하나뿐인 요소를 고릅니다. 다른 태그 형제는 몇 개 있어도 됩니다. `:first-of-type:last-of-type`과 같은 요소를 고르지만 특이성이 더 낮습니다(0-1-0). 그림 하나만 든 figure처럼 '그 종류가 하나뿐일 때'를 꾸밉니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":only-of-type", "0-1-0", "Chrome 1, Safari 3.1, Firefox 3.5"]],
          },
        ],
        code: "figure img:only-of-type { width: 100%; }\nmain :only-of-type { color: crimson; }",
        codeLang: "css",
      },
      {
        label: ":nth-of-type()",
        body: "같은 태그의 형제끼리만 번호를 매기고, 번호가 An+B 식에 맞는 요소를 고릅니다. 다른 태그는 세지도 고르지도 않습니다. 식은 `:nth-child()`와 같지만 `of S`가 없습니다. 그래서 '클래스 기준 n번째'는 이것으로 못 만듭니다. 그럴 때는 `:nth-child(An+B of .클래스)`를 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":nth-of-type(An+B)", "0-1-0", "Chrome 1, Safari 3.1, Firefox 3.5"]],
          },
        ],
        code: "p:nth-of-type(2n) { background: #f5f5f5; }\nimg:nth-of-type(1) { float: left; }\np.fancy:nth-of-type(2n + 1) { text-decoration: underline; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: child로 셀까, type으로 셀까",
        body: "상자 안에 h3, p, p, span, p, small이 차례로 있습니다. 지금 값은 선택자마다 고른 요소의 글을 보여 줍니다. `p:nth-child(2)`는 둘째 자식인 '문단 가'를 고릅니다. `p:nth-of-type(2)`는 둘째 p인 '문단 나'를 고릅니다.\n\n첫째 자식이 h3이라 `p:first-child`는 없음입니다. 마지막 자식이 small이라 `p:last-child`도 없음입니다. `:only-of-type`은 h3, span, small을 고릅니다. h3을 지우고 실행하면 `p:first-child`가 '문단 가'를 고릅니다.",
        lab: {
          html: `<style>
  p:nth-of-type(2) { color: crimson; }
</style>
<div class="box">
  <h3>제목</h3>
  <p>문단 가</p>
  <p>문단 나</p>
  <span>꼬리표</span>
  <p>문단 다</p>
  <small>끝</small>
</div>`,
          height: 260,
          tryIt: "h3이나 small을 지우고, 지금 값이 어떻게 바뀌는지 보세요.",
          checks: [
            { label: "p:nth-child(2)", expr: "[...document.querySelectorAll('.box > *')].filter((el) => el.matches('p:nth-child(2)')).map((el) => el.textContent).join(', ') || '없음'" },
            { label: "p:nth-of-type(2)", expr: "[...document.querySelectorAll('.box > *')].filter((el) => el.matches('p:nth-of-type(2)')).map((el) => el.textContent).join(', ') || '없음'" },
            { label: "p:first-child", expr: "[...document.querySelectorAll('.box > *')].filter((el) => el.matches('p:first-child')).map((el) => el.textContent).join(', ') || '없음'" },
            { label: "p:first-of-type", expr: "[...document.querySelectorAll('.box > *')].filter((el) => el.matches('p:first-of-type')).map((el) => el.textContent).join(', ') || '없음'" },
            { label: "p:last-child", expr: "[...document.querySelectorAll('.box > *')].filter((el) => el.matches('p:last-child')).map((el) => el.textContent).join(', ') || '없음'" },
            { label: "p:last-of-type", expr: "[...document.querySelectorAll('.box > *')].filter((el) => el.matches('p:last-of-type')).map((el) => el.textContent).join(', ') || '없음'" },
            { label: ":only-of-type", expr: "[...document.querySelectorAll('.box > *')].filter((el) => el.matches(':only-of-type')).map((el) => el.textContent).join(', ') || '없음'" },
          ],
        },
      },
      {
        label: ":nth-last-of-type()",
        body: "같은 태그의 형제를 끝에서부터 세어, 번호가 An+B 식에 맞는 요소를 고릅니다. 그 태그의 마지막 요소가 1번입니다. `span:nth-last-of-type(2)`는 끝에서 둘째 span입니다. 사이에 낀 다른 태그는 세지 않습니다. 이 선택자에도 `of S`는 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":nth-last-of-type(An+B)", "0-1-0", "Chrome 4, Safari 3.1, Firefox 3.5"]],
          },
        ],
        code: "span:nth-last-of-type(2) { background: lime; }\ndd:nth-last-of-type(-n + 2) { color: gray; }   /* 끝의 dd 둘 */",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "구조 가상 클래스의 실수는 대개 '무엇을 세는지'를 잘못 알아서 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["`p:first-child`로 첫 문단을 고르려 했다", "첫째 자식이 h2라 아무것도 안 맞는다", "`p:first-of-type`으로 바꾼다"],
              ["`.item:nth-child(2)`로 둘째 .item을 고르려 했다", "번호는 모든 형제 요소로 센다", "`:nth-child(2 of .item)`을 쓴다"],
              ["`:nth-child(5n)`으로 첫째도 고르려 했다", "n=0이면 0번이라 버려진다", "`5n+1`처럼 B를 준다"],
              ["빈칸처럼 보이는 칸에 `:empty`를 걸었다", "공백, 줄바꿈도 글자 노드라 안 맞는다", "태그 사이의 공백을 지운다"],
              ["`li:last-child`로 끝 줄 선을 지웠다", "끝에 다른 요소가 붙자 안 맞는다", "`li:last-of-type`을 쓴다"],
              ["hidden 행이 섞인 표에 줄무늬를 줬다", "숨은 행도 번호에 들어 줄무늬가 겹친다", "`:nth-child(even of :not([hidden]))`"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `li:nth-child(-n+3)`은 몇째 li들을 고릅니까?\n2) `p:first-child`와 `p:first-of-type`이 다른 요소를 고르는 HTML을 떠올려 보세요.\n3) `:nth-child(2n of .x)`의 특이성은 얼마입니까?\n4) `<div> </div>`는 `:empty`에 맞습니까?",
      },
    ],
    sources: [
      { label: "MDN: :nth-child()", href: `${MDN}/Reference/Selectors/:nth-child` },
      { label: "MDN: :nth-of-type()", href: `${MDN}/Reference/Selectors/:nth-of-type` },
      { label: "MDN: :first-child", href: `${MDN}/Reference/Selectors/:first-child` },
      { label: "MDN: :empty", href: `${MDN}/Reference/Selectors/:empty` },
      { label: "MDN: :root", href: `${MDN}/Reference/Selectors/:root` },
    ],
  },
  {
    id: "css-sel-logic",
    name: "논리, 언어, 상태 가상 클래스",
    tagline: "선택자를 묶고 빼고 조건을 걸고, 언어와 방향과 열린 상태로 고른다",
    intro:
      "선택자 여럿을 묶거나, 어떤 것을 빼거나, 자식을 보고 부모를 고르고 싶을 때가 있습니다. `:is()`, `:where()`, `:not()`, `:has()`가 그 일을 합니다. 넷은 특이성을 셈하는 법과 잘못된 선택자를 다루는 법이 서로 다릅니다. 뒤쪽은 언어와 글 방향, 그리고 대화상자나 팝오버가 열린 상태를 고르는 가상 클래스입니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "논리 가상 클래스 넷의 특이성은 인자로 정해집니다. 나머지는 모두 0-1-0입니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              [":is()", "목록 중 하나에 맞는 요소", "인자 중 가장 높은 것", "1장 · 문법과 선택자"],
              [":where()", "목록 중 하나에 맞는 요소", "0-0-0", "2장 · 캐스케이드와 상속"],
              [":has()", "인자에 맞는 자손이나 형제가 있는 요소", "인자 중 가장 높은 것", "1장 · 문법과 선택자"],
              [":not()", "목록 어느 것에도 안 맞는 요소", "인자 중 가장 높은 것", ""],
              [":lang()", "그 언어로 정해진 요소", "0-1-0", ""],
              [":dir()", "글 방향이 ltr 또는 rtl인 요소", "0-1-0", ""],
              [":scope", "선택의 기준점이 되는 요소", "0-1-0", "14장 · 중첩, 레이어, 스코프"],
              [":defined", "정의가 끝난 요소", "0-1-0", ""],
              [":modal", "바깥 조작을 막고 있는 요소", "0-1-0", ""],
              [":popover-open", "열려 있는 팝오버", "0-1-0", ""],
              [":fullscreen", "전체 화면 중인 요소", "0-1-0", ""],
            ],
          },
        ],
      },
      {
        label: ":is()",
        body: "선택자 목록을 받아, 그중 하나에라도 맞는 요소를 고릅니다. 긴 선택자 조합을 짧게 줄일 때 씁니다. `:is(section, article) h1`은 `section h1, article h1`과 같습니다.\n\n특이성은 인자 중 가장 높은 것을 따릅니다. 실제로 맞은 항목이 무엇이든 상관없습니다. `:is(.card, #main) p`는 .card로 맞아도 1-0-1입니다.\n\n인자는 너그러운 목록입니다. 모르는 선택자가 섞여도 그 항목만 버리고 나머지로 고릅니다. 가상 요소는 인자로 넣을 수 없습니다. 예전 이름은 `:matches()`, `:any()`였습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":is(<너그러운 목록>)", "인자 중 가장 높은 것", "Chrome 88, Safari 14, Firefox 78"]],
          },
          {
            caption: "잘못된 선택자가 섞였을 때",
            head: ["쓰는 곳", "목록 종류", "생기는 일"],
            rows: [
              ["`a, b` 선택자 목록", "엄격한 목록", "규칙 전체가 버려짐"],
              [":is(), :where()", "너그러운 목록", "그 항목만 버리고 나머지로 고름"],
              [":not()", "엄격한 목록", "규칙 전체가 버려짐"],
              [":has()", "엄격한 상대 선택자 목록", "규칙 전체가 버려짐"],
            ],
          },
        ],
        code: ":is(ol, ul, menu) :is(ol, ul, menu) ul { list-style-type: square; }\n:is(h1, h2, h3):hover { color: teal; }\n:is(:valid, :unsupported) { outline: 1px solid green; }   /* :valid 쪽은 산다 */",
        codeLang: "css",
        terms: [
          {
            term: "너그러운 목록",
            body: "잘못된 항목이 있어도 그것만 빼고 나머지를 살리는 선택자 목록입니다. 보통 선택자 목록은 하나만 틀려도 규칙 전체가 버려집니다. 장보기 목록에 없는 물건이 있으면 그것만 건너뛰고 나머지를 사는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":where()",
        body: "`:is()`와 똑같이 목록 중 하나에 맞는 요소를 고릅니다. 다른 점은 특이성이 늘 0-0-0이라는 것입니다. 안에 ID를 넣어도 무게가 더해지지 않습니다. 그래서 나중에 쉽게 덮어쓸 기본 스타일, 초기화 스타일에 알맞습니다. 인자는 너그러운 목록이고 가상 요소는 넣을 수 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":where(<너그러운 목록>)", "0-0-0", "Chrome 88, Safari 14, Firefox 78"]],
          },
        ],
        code: ":where(ul, ol) { margin: 0; padding-left: 1.2em; }   /* 0-0-0 */\n:where(#nav) a { color: gray; }                        /* 0-0-1 */\nfooter a { color: blue; }                              /* 0-0-2, 이긴다 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: :is()와 :where()의 무게",
        body: "세 규칙이 p와 span의 color를 두고 다툽니다. `:is(.card, #main) p`는 가장 무거운 인자의 무게를 받아 1-0-1입니다. `#main`이 문서에 없어도 그렇습니다. 그래서 뒤에 적은 `.card p`(0-1-1)를 이기고 p는 파랑입니다.\n\n`:where(.card, #main) span`은 0-0-1이라 `.card span`(0-1-1)에 집니다. 그래서 span은 빨강입니다. 지금 값의 '#main이 있나'는 false입니다. 맞은 항목이 아니라 목록 전체에서 가장 무거운 것을 본다는 뜻입니다.",
        lab: {
          html: `<style>
  :is(.card, #main) p { color: rgb(0, 0, 255); }
  :where(.card, #main) span { color: rgb(0, 0, 255); }
  .card p, .card span { color: rgb(255, 0, 0); }
</style>
<div class="card">
  <p>p 문단</p>
  <span>span 글자</span>
</div>`,
          height: 140,
          tryIt: "첫 규칙의 :is를 :where로 바꾸면 p도 빨강이 되는지 보세요.",
          checks: [
            { label: "p의 color", expr: "getComputedStyle(document.querySelector('p')).color" },
            { label: "span의 color", expr: "getComputedStyle(document.querySelector('span')).color" },
            { label: "#main이 있나", expr: "!!document.getElementById('main')" },
          ],
        },
      },
      {
        label: ":has()",
        body: "인자로 받은 상대 선택자가 이 요소를 기준으로 하나라도 맞으면 이 요소를 고릅니다. 자식을 보고 부모를, 뒤 형제를 보고 앞 형제를 고를 수 있습니다. `section:has(.featured)`는 .featured를 품은 section입니다. `h1:has(+ p)`는 바로 뒤에 p가 오는 h1입니다.\n\n쉼표는 '또는'입니다. `:has(a, b)`는 a나 b가 있으면 맞습니다. 둘 다 있어야 하면 `:has(a):has(b)`로 잇습니다. 특이성은 `:is()`처럼 인자 중 가장 높은 것입니다.\n\n인자는 엄격한 목록이라 하나라도 잘못되면 규칙 전체가 버려집니다. `:has()` 안에 `:has()`를 넣을 수 없고 가상 요소도 쓸 수 없습니다. `body`, `:root`처럼 자손이 많은 요소에 걸면 DOM이 바뀔 때마다 다시 볼 범위가 넓어집니다. 기준은 좁은 요소로 잡고, 안쪽은 `>`나 `+`로 좁혀 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":has(<상대 선택자 목록>)", "인자 중 가장 높은 것", "Chrome 105, Safari 15.4, Firefox 121"]],
          },
        ],
        code: ".card:has(> img) { display: grid; grid-template-columns: 120px 1fr; }\nh1:has(+ h2) { margin-bottom: 0.25rem; }\nform:has(input:invalid) button { opacity: 0.5; }\n.abc:not(:has(+ .xyz)) { color: gray; }   /* 뒤에 .xyz가 없는 .abc */",
        codeLang: "css",
        terms: [
          {
            term: "상대 선택자",
            body: "`> img`, `+ p`처럼 결합자로 시작하는 선택자입니다. 기준 요소에서 출발해 어느 쪽을 볼지 정합니다. 결합자를 안 쓰면 자손을 봅니다. '내 오른쪽 사람'처럼 말하는 사람을 기준으로 가리키는 말과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: :has()로 부모 바꾸기",
        body: "체크 상자를 눌러 보세요. 기록에 checkbox 클릭이 찍힙니다. 체크되면 `.card:has(input:checked)`가 맞아 .card의 테두리와 배경이 바뀝니다. 지금 값의 첫 줄이 true가 됩니다. background-color와 border-top-color도 바뀝니다. 체크를 풀면 처음 값으로 돌아옵니다. 스크립트 없이 자식의 상태로 부모를 바꾼 것입니다.",
        lab: {
          html: `<style>
  .card { padding: 8px; border: 2px solid #ccc; }
  .card:has(input:checked) { border-color: seagreen; background: #e6f4ea; }
</style>
<div class="card">
  <label><input type="checkbox"> 약관에 동의합니다</label>
  <p>체크하면 이 상자의 테두리와 배경이 바뀝니다.</p>
</div>`,
          height: 160,
          tryIt: "선택자를 .card:has(> input:checked)로 바꿔 보세요. input이 label 안에 있어서 이제는 맞지 않습니다.",
          checks: [
            { label: ".card:has(input:checked)", expr: "document.querySelector('.card').matches(':has(input:checked)')" },
            { label: "background-color", expr: "getComputedStyle(document.querySelector('.card')).backgroundColor" },
            { label: "border-top-color", expr: "getComputedStyle(document.querySelector('.card')).borderTopColor" },
          ],
        },
      },
      {
        label: ":not()",
        body: "인자 목록 어느 것에도 맞지 않는 요소를 고릅니다. `:not(.a, .b)`는 `:not(.a):not(.b)`와 같습니다. 특이성은 인자 중 가장 높은 것으로 바뀝니다. 그래서 `#foo:not(#bar)`는 `#foo`와 같은 요소를 고르지만 2-0-0입니다.\n\n인자는 엄격한 목록입니다. 모르는 선택자가 하나라도 섞이면 규칙 전체가 버려집니다. 이걸 피하려면 `:not(:is(.foo, :unsupported))`처럼 감쌉니다.\n\n자손 결합자와 엮을 때 조심합니다. `body :not(table) a`는 표 안의 링크에도 맞습니다. tbody, td도 'table이 아닌 것'이기 때문입니다. 표 안의 링크를 빼려면 `a:not(table a)`로 씁니다. `:not(.x)`만 쓰면 html, body까지 고릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":not(<선택자 목록>)", "인자 중 가장 높은 것", "Chrome 1, Safari 3.1, Firefox 1\n(목록 인자는 그 뒤)"]],
          },
        ],
        code: "p:not(.fancy) { color: green; }\na:not(table a) { text-decoration: underline; }   /* 표 밖의 링크만 */\nli:not(:last-child) { border-bottom: 1px solid #ddd; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 너그러운 목록과 엄격한 목록",
        body: "`:zzz`는 없는 가상 클래스입니다. 이것을 네 규칙에 섞었습니다. MDN대로라면 너그러운 목록을 받는 `:is()` 규칙만 살아남습니다. `:zzz` 항목만 버리고 `.a`로 고르므로 .a 문단이 초록이 됩니다.\n\n보통 선택자 목록인 `.b, :zzz`는 규칙 전체가 버려져 .b 문단은 기본 색입니다. 엄격한 목록을 받는 `:not()`과 `:has()` 규칙도 통째로 버려집니다. 지금 값의 '살아남은 규칙'에는 버려지지 않은 규칙만 나옵니다. `:zzz`를 모두 지우고 실행하면 네 규칙이 다 살아납니다.",
        lab: {
          html: `<style id="s">
  :is(.a, :zzz) { color: rgb(0, 128, 0); }
  .b, :zzz { color: rgb(0, 128, 0); }
  p:not(.no, :zzz) { text-decoration: underline; }
  div:has(.c, :zzz) { outline: 2px solid; }
</style>
<p class="a">.a 문단</p>
<p class="b">.b 문단</p>
<div><span class="c">.c를 품은 div</span></div>`,
          height: 150,
          tryIt: "p:not(.no, :zzz)를 p:not(:is(.no, :zzz))로 감싸 보세요. 밑줄이 생깁니다.",
          checks: [
            { label: "살아남은 규칙", expr: "[...document.getElementById('s').sheet.cssRules].map((r) => r.selectorText).join(' | ')" },
            { label: ".a, .b의 color", expr: "['.a', '.b'].map((s) => s + ' ' + getComputedStyle(document.querySelector(s)).color).join(' | ')" },
            { label: "p의 밑줄(:not 규칙)", expr: "getComputedStyle(document.querySelector('.a')).textDecorationLine" },
            { label: "div의 outline(:has 규칙)", expr: "getComputedStyle(document.querySelector('div')).outlineStyle" },
            { label: ":zzz를 아나", expr: "CSS.supports('selector(:zzz)')" },
          ],
        },
      },
      {
        label: ":lang()",
        body: "요소가 어떤 언어로 정해졌는지로 고릅니다. HTML에서 언어는 `lang` 속성, `<meta>`, HTTP 머리말 같은 정보를 합쳐 정합니다. 언어는 물려받으므로 조상에 lang=\"en\"이 있으면 자손도 `:lang(en)`에 맞습니다. `[lang=\"en\"]` 속성 선택자는 lang을 직접 단 요소만 고른다는 점이 다릅니다.\n\n언어 범위로 비교합니다. `:lang(de-DE)`는 de-DE-1996, de-Latn-DE에도 맞습니다. 대소문자는 가리지 않습니다. 쉼표로 여러 언어를 줄 수 있습니다. `\"*-Latn\"` 같은 와일드카드는 브라우저마다 지원이 다릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":lang(<언어 코드>, …)", "0-1-0", "Chrome 1, Safari 3.1, Firefox 1"]],
          },
        ],
        code: ":lang(fr) > q { quotes: \"« \" \" »\"; }\n:lang(ko) { word-break: keep-all; }\n:lang(\"nl\", \"de\") { color: green; }",
        codeLang: "css",
        terms: [
          {
            term: "언어 태그",
            body: "ko, en-GB, zh-Hant처럼 언어와 지역, 문자를 하이픈으로 잇는 이름입니다. 웹은 BCP 47이라는 규칙을 따릅니다. 우편 주소가 나라, 도시, 동 순서로 좁혀 가는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":dir()",
        body: "글의 방향이 ltr(왼쪽에서 오른쪽)인지 rtl(오른쪽에서 왼쪽)인지로 고릅니다. 문서가 정한 '의미의 방향'만 봅니다. HTML에서는 `dir` 속성이 정하고 자손은 그 방향을 물려받습니다. `dir=\"auto\"`면 브라우저가 글자를 보고 방향을 정합니다.\n\nCSS `direction` 속성으로 바꾼 방향은 보지 않습니다. `[dir=rtl]` 속성 선택자와도 다릅니다. 속성 선택자는 dir을 직접 단 요소만 고르고 auto도 고르지 못합니다. `:dir()`은 물려받은 방향과 auto로 정해진 방향까지 고릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":dir(ltr | rtl)", "0-1-0", "Chrome 120, Safari 16.4, Firefox 49"]],
          },
          {
            caption: ":dir()의 값",
            head: ["값", "하는 일"],
            rows: [
              ["ltr", "왼쪽에서 오른쪽으로 쓰는 요소를 고름"],
              ["rtl", "오른쪽에서 왼쪽으로 쓰는 요소를 고름"],
            ],
          },
        ],
        code: ":dir(rtl) .icon-next { transform: scaleX(-1); }   /* 화살표 뒤집기 */\n:dir(ltr) blockquote { border-left: 3px solid; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: :dir()과 :lang()은 물려받은 값을 본다",
        body: "rtl div 안의 a는 dir을 물려받았고, b는 dir=\"ltr\"을 직접 달았습니다. c는 dir=\"auto\"에 히브리어가 들었고, d는 CSS `direction: rtl`만 줬습니다.\n\nMDN대로라면 `:dir(rtl)`은 a와 c에 맞습니다. d는 계산된 direction이 rtl이어도 맞지 않습니다. `[dir=rtl]`은 넷 모두에 맞지 않습니다. 그 속성을 직접 단 요소는 div뿐이기 때문입니다. `:lang()`도 같습니다. a는 lang=\"ar\"을 물려받아 `:lang(ar)`에 맞습니다. en-GB인 b는 `:lang(en)`에 맞습니다.",
        lab: {
          html: `<div dir="rtl" lang="ar">
  <p id="a">مرحبا</p>
  <p id="b" dir="ltr" lang="en-GB">hello</p>
</div>
<p id="c" dir="auto">שלום</p>
<p id="d" style="direction: rtl">CSS로만 rtl</p>`,
          height: 200,
          tryIt: "d에 dir=\"rtl\"을 달거나, c의 글을 영어로 바꿔 보세요.",
          checks: [
            { label: ":dir(rtl)", expr: "['a', 'b', 'c', 'd'].map((id) => id + ':' + document.getElementById(id).matches(':dir(rtl)')).join(' ')" },
            { label: "[dir=rtl]", expr: "['a', 'b', 'c', 'd'].map((id) => id + ':' + document.getElementById(id).matches('[dir=rtl]')).join(' ')" },
            { label: "direction 계산값", expr: "['a', 'b', 'c', 'd'].map((id) => id + ':' + getComputedStyle(document.getElementById(id)).direction).join(' ')" },
            { label: ":lang(ar)", expr: "['a', 'b', 'c', 'd'].map((id) => id + ':' + document.getElementById(id).matches(':lang(ar)')).join(' ')" },
            { label: ":lang(en)", expr: "['a', 'b', 'c', 'd'].map((id) => id + ':' + document.getElementById(id).matches(':lang(en)')).join(' ')" },
          ],
        },
      },
      {
        label: ":scope",
        body: "선택자가 기준으로 삼는 요소를 고릅니다. 어디서 쓰느냐에 따라 고르는 요소가 다릅니다.\n1. 스타일시트의 맨 바깥: `:root`와 같습니다. HTML에서는 html입니다.\n2. `@scope` 블록 안: 그 블록의 스코프 뿌리를 고릅니다(14장).\n3. `querySelectorAll()`, `matches()`, `closest()` 안: 그 메서드를 부른 요소입니다.\n\n`el.querySelectorAll(':scope > div')`는 el의 바로 아래 div만 고릅니다. `:scope` 오른쪽에 `+`나 `~`를 두면 아무것도 맞지 않습니다. 스코프는 자기와 자손만 다루기 때문입니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":scope", "0-1-0", "Chrome 27, Safari 7, Firefox 32"]],
          },
        ],
        code: "@scope (.card) {\n  :scope { border: 1px solid #ccc; }   /* .card 자신 */\n  img { max-width: 100%; }\n}",
        codeLang: "css",
      },
      {
        label: ":defined",
        body: "정의가 끝난 요소를 고릅니다. div, p 같은 내장 요소는 처음부터 정의되어 있어 늘 맞습니다. 사용자 정의 요소는 `customElements.define()`으로 등록된 뒤에야 맞습니다. 그래서 `my-card:not(:defined)`로 등록 전의 요소를 숨기거나 흐리게 둘 수 있습니다. 스크립트가 늦게 올 때 꾸밈 없는 모양이 잠깐 보이는 것을 막습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":defined", "0-1-0", "Chrome 54, Safari 10, Firefox 63"]],
          },
        ],
        code: "my-card:not(:defined) { visibility: hidden; }\nmy-card:defined { display: block; }",
        codeLang: "css",
        terms: [
          {
            term: "사용자 정의 요소",
            body: "개발자가 이름에 하이픈을 넣어 만든 HTML 태그입니다(`my-card`). 자바스크립트로 클래스를 등록해야 제 동작을 합니다. 간판을 걸었어도 영업 신고를 마쳐야 문을 여는 가게와 같습니다.",
          },
        ],
      },
      {
        label: ":modal",
        body: "바깥 요소와의 상호작용을 막고 있는 요소를 고릅니다. 사용자가 닫기 전까지 나머지 페이지를 쓸 수 없는 상태입니다. `showModal()`로 연 dialog가 여기에 듭니다. `requestFullscreen()`으로 전체 화면이 된 요소도 듭니다. `show()`나 open 속성으로 연 dialog는 모달이 아니라서 맞지 않습니다. 여러 요소가 함께 맞을 수 있지만 입력을 받는 것은 하나뿐입니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":modal", "0-1-0", "Chrome 105, Safari 15.6, Firefox 103"]],
          },
        ],
        code: "dialog:modal { border: 3px solid crimson; }\ndialog:modal::backdrop { background: rgb(0 0 0 / 40%); }",
        codeLang: "css",
        terms: [
          {
            term: "모달",
            body: "사용자가 닫기 전까지 나머지 화면을 쓸 수 없게 막는 창입니다. 모달이 열리면 바깥의 버튼은 눌리지 않고 포커스도 가지 않습니다. 전화를 받는 동안 하던 일을 잠시 멈추는 것과 같습니다.",
          },
        ],
      },
      {
        label: ":popover-open",
        body: "popover 속성을 단 요소가 지금 보이는 상태일 때 고릅니다. 닫혀 있을 때는 맞지 않습니다. 브라우저 기본 스타일은 팝오버를 화면 가운데에 둡니다. `position: fixed`, `inset: 0`, `margin: auto`로 그렇게 합니다. 열렸을 때의 위치나 크기만 바꾸고 싶으면 `:popover-open`에 적습니다. `popovertarget`을 단 버튼으로 열고 닫으면 스크립트가 없어도 됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":popover-open", "0-1-0", "Chrome 114, Safari 17, Firefox 125"]],
          },
        ],
        code: "[popover]:popover-open {\n  inset: auto 8px 8px auto;   /* 오른쪽 아래로 */\n  margin: 0;\n}",
        codeLang: "css",
      },
      {
        label: ":fullscreen",
        body: "지금 전체 화면 모드인 요소를 고릅니다. 여러 요소가 전체 화면이면 모두 고릅니다. 요소는 `requestFullscreen()`으로 전체 화면이 됩니다. 이 메서드는 클릭 같은 사용자 동작 안에서 불러야 합니다. 전체 화면일 때만 배경이나 크기를 바꾸는 데 씁니다. 전체 화면 요소는 `:modal`에도 맞고, 뒤에 `::backdrop`이 깔립니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [[":fullscreen", "0-1-0", "Chrome 71, Safari 16.4, Firefox 64"]],
          },
        ],
        code: ".player:fullscreen { background: black; }\n.player:fullscreen video { width: 100%; height: 100%; }",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "논리 가상 클래스의 문제는 대개 특이성과 목록 종류에서 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["`a, :새선택자 { }`처럼 목록에 새 선택자를 섞었다", "모르는 브라우저에서 규칙 전체가 버려진다", "`:is(a, :새선택자)`로 감싼다"],
              ["`:not()` 안에 지원이 불확실한 선택자를 넣었다", "엄격한 목록이라 규칙 전체가 버려진다", "`:not(:is(…))`로 감싼다"],
              ["`:where()`로 쓴 규칙이 자꾸 진다", "특이성이 0이라 태그 하나에도 진다", "이겨야 하면 `:is()`로 바꾼다"],
              ["`:is(.a, #b)`가 너무 세다", "가장 무거운 인자 #b의 무게를 받는다", "ID를 빼거나 `:where()`로 옮긴다"],
              ["`body :not(table) a`로 표 밖 링크를 골랐다", "tbody, td도 'table이 아닌 것'이라 맞는다", "`a:not(table a)`로 쓴다"],
              ["`[dir=rtl] .x`로 rtl 영역을 꾸몄다", "물려받은 방향과 auto에는 안 맞는다", "`:dir(rtl) .x`를 쓴다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `:is(.a, #b) p`와 `:where(.a, #b) p`의 특이성은 각각 얼마입니까?\n2) 체크된 상자를 품은 label을 고르는 선택자를 `:has()`로 써 보세요.\n3) `:not(.x, :unknown)`과 `:not(:is(.x, :unknown))`은 무엇이 다릅니까?\n4) `style=\"direction: rtl\"`만 준 요소는 `:dir(rtl)`에 맞습니까?",
      },
    ],
    sources: [
      { label: "MDN: :is()", href: `${MDN}/Reference/Selectors/:is` },
      { label: "MDN: :where()", href: `${MDN}/Reference/Selectors/:where` },
      { label: "MDN: :has()", href: `${MDN}/Reference/Selectors/:has` },
      { label: "MDN: :not()", href: `${MDN}/Reference/Selectors/:not` },
      { label: "MDN: :dir()", href: `${MDN}/Reference/Selectors/:dir` },
      { label: "MDN: Selector list", href: `${MDN}/Reference/Selectors/Selector_list` },
    ],
  },
  {
    id: "css-sel-pseudo",
    name: "가상 요소",
    tagline: "HTML에 없는 부분을 상자로 만들거나 골라서 꾸민다",
    intro:
      "글 앞에 아이콘을 붙이거나, 첫 글자만 키우거나, 목록 번호의 색만 바꾸고 싶을 때가 있습니다. HTML을 고치지 않고 요소의 '부분'을 고르는 것이 가상 요소입니다. 콜론 둘(`::`)로 쓰고 대개 선택자의 맨 뒤에 붙습니다. 이 시트는 열네 개를 '무엇을 만들거나 고르나', '어떤 속성이 먹나'로 정리합니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "가상 요소의 특이성은 태그와 같은 0-0-1입니다. 그래서 `p::first-line`은 0-0-2입니다. 함수형인 `::slotted()`는 인자의 무게가 더해집니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              ["::before", "요소의 첫 자식으로 만든 상자", "0-0-1", "1장 · 문법과 선택자"],
              ["::after", "요소의 마지막 자식으로 만든 상자", "0-0-1", "1장 · 문법과 선택자"],
              ["::first-letter", "블록 첫 줄의 첫 글자", "0-0-1", "13장 · 글꼴과 텍스트"],
              ["::first-line", "블록의 첫 줄", "0-0-1", "13장 · 글꼴과 텍스트"],
              ["::selection", "사용자가 끌어 고른 부분", "0-0-1", ""],
              ["::marker", "목록 항목의 글머리표나 번호", "0-0-1", ""],
              ["::placeholder", "입력란의 안내 글", "0-0-1", ""],
              ["::backdrop", "최상위 레이어 요소 밑의 막", "0-0-1", "8장 · 위치 지정과 쌓임 맥락"],
              ["::file-selector-button", "파일 입력란의 버튼", "0-0-1", ""],
              ["::details-content", "details의 접히는 내용", "0-0-1", ""],
              ["::cue", "WebVTT 자막 큐", "0-0-1", ""],
              ["::part()", "그림자 트리 안의 part 요소", "0-0-1", ""],
              ["::slotted()", "슬롯에 꽂힌 요소", "0-0-1 + 인자", ""],
              ["::highlight()", "등록한 사용자 하이라이트", "0-0-1", ""],
            ],
          },
        ],
        terms: [
          {
            term: "가상 요소",
            body: "HTML에는 없지만 CSS가 고를 수 있는 요소의 부분입니다. 상자처럼 그려지지만 DOM에는 없어서 자바스크립트로 집어 올 수 없습니다. 벽에 비친 그림자처럼 보이기는 해도 손에 잡히지 않습니다.",
          },
        ],
      },
      {
        label: "::before",
        body: "고른 요소 안에 첫 자식 상자를 하나 만듭니다. 이 상자는 기본이 inline입니다. 아이콘, 따옴표, 꾸밈 도형을 넣을 때 씁니다.\n\n`content` 속성이 있어야 상자가 생깁니다. content가 없거나 잘못됐으면 그려지지 않습니다. normal이나 none일 때도 `display: none`처럼 됩니다. 빈 도형만 필요하면 `content: \"\"`를 씁니다.\n\nimg, video 같은 대체 요소에는 생기지 않습니다. input도 브라우저마다 달라서 기대하지 않는 것이 좋습니다. 옛 표기 `:before`도 브라우저가 받아 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::before { content: …; }", "0-0-1", "Chrome 1, Safari 4, Firefox 1.5"]],
          },
        ],
        code: "q::before { content: \"«\"; color: blue; }\n.req::before { content: \"* \"; color: crimson; }\n.dot::before { content: \"\"; display: inline-block; width: 8px; height: 8px; }",
        codeLang: "css",
        terms: [
          {
            term: "대체 요소",
            body: "내용을 CSS가 아니라 바깥 자원이 정하는 요소입니다. img, video, iframe이 대표입니다. 액자 틀은 꾸밀 수 있어도 액자 속 사진 위에 덧그릴 수는 없는 것과 같습니다.",
          },
        ],
        notes: [
          {
            title: "넣은 글은 읽히지 않을 수 있다",
            body: "MDN은 가상 요소로 넣은 글을 화면 읽기 프로그램이 안정적으로 읽지 못한다고 적습니다. 뜻이 있는 글은 HTML에 두고, 가상 요소에는 꾸밈만 넣습니다.",
          },
        ],
      },
      {
        label: "::after",
        body: "고른 요소 안에 마지막 자식 상자를 만듭니다. 규칙은 `::before`와 같습니다. content가 있어야 생기고 대체 요소에는 생기지 않습니다. 두 상자는 부모와 같은 쌓임 맥락에 듭니다. z-index를 안 주면 나중에 그려지는 `::after`가 `::before` 위에 옵니다. `attr()`와 함께 써서 data-* 속성 값을 글로 보여 줄 수 있습니다. `display: list-item`을 주면 `::after::marker`도 생깁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::after { content: …; }", "0-0-1", "Chrome 1, Safari 4, Firefox 1.5"]],
          },
        ],
        code: "a[href$=\".pdf\"]::after { content: \" (PDF)\"; }\n[data-tip]:hover::after { content: attr(data-tip); position: absolute; }\n.clearfix::after { content: \"\"; display: block; clear: both; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: content가 있어야 생긴다",
        body: "`.a::before`에는 content가 있고 `.b::before`에는 color만 있습니다. 지금 값에서 .a 쪽 content는 넣은 글자이고 .b 쪽은 none입니다. MDN은 ::before의 normal이 none으로 계산된다고 적습니다. 상자가 생긴 .a span만 폭이 늘어납니다.\n\nimg에도 `::before` 규칙을 걸었습니다. 지금 값에 img 쪽 계산값이 나오더라도, img는 대체 요소라서 사진 앞에 아무것도 그려지지 않습니다. `.b::before`에 content를 더하고 실행하면 .b span의 폭도 늘어납니다.",
        lab: {
          html: `<style>
  .a::before { content: "★ "; color: crimson; }
  .b::before { color: crimson; }
  img::before { content: "사진 앞"; }
</style>
<p><span class="a">가</span> / <span class="b">나</span></p>
<img src="photo-400.svg" width="120" alt="사진">`,
          height: 180,
          tryIt: ".b::before에 content: \"☆ \"를 더하고 실행해 보세요.",
          checks: [
            { label: ".a::before의 content", expr: "getComputedStyle(document.querySelector('.a'), '::before').content" },
            { label: ".b::before의 content", expr: "getComputedStyle(document.querySelector('.b'), '::before').content" },
            { label: "span 폭(.a, .b)", expr: "[...document.querySelectorAll('span')].map((s) => Math.round(s.getBoundingClientRect().width)).join(', ')" },
            { label: "img::before의 content", expr: "getComputedStyle(document.querySelector('img'), '::before').content" },
          ],
        },
      },
      {
        label: "::first-letter",
        body: "블록 컨테이너 첫 줄의 첫 글자를 고릅니다. 앞에 그림이나 인라인 표 같은 다른 내용이 있으면 고르지 않습니다. 첫 글자 앞의 따옴표 같은 문장부호는 함께 고릅니다. 글자를 키워 여러 줄에 걸치게 하는 장식(드롭 캡)에 씁니다. 먹는 속성은 정해져 있고, 여백과 테두리, float까지 받습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::first-letter", "0-0-1", "Chrome 1, Safari 1, Firefox 1"]],
          },
          {
            caption: "먹는 속성",
            head: ["묶음", "예"],
            rows: [
              ["글꼴", "font, font-size, font-weight"],
              ["배경", "background, background-color"],
              ["여백, 테두리", "margin, padding, border, border-radius"],
              ["글자 꾸밈", "color, text-decoration, text-shadow, text-transform"],
              ["그 밖", "letter-spacing, line-height, box-shadow, float, vertical-align(float가 none일 때)"],
            ],
          },
        ],
        code: "h2 + p::first-letter {\n  float: left;\n  font-size: 250%;\n  margin-right: 6px;\n}",
        codeLang: "css",
        terms: [
          {
            term: "블록 컨테이너",
            body: "안에 글줄을 차례로 쌓아 담는 상자입니다. p, div, li처럼 블록이거나 inline-block인 요소가 여기에 듭니다. span 같은 인라인 요소는 아닙니다. 줄이 위에서부터 차례로 채워지는 공책 한 쪽과 같습니다.",
          },
        ],
      },
      {
        label: "::first-line",
        body: "블록 컨테이너의 첫 줄을 고릅니다. 첫 줄이 어디서 끊기는지는 창 폭과 글꼴에 따라 바뀝니다. span 같은 인라인 요소에는 먹지 않습니다. 배경은 인라인 상자처럼 글자가 있는 데까지만 칠해질 수 있습니다. 먹는 속성은 `::first-letter`보다 적습니다. 여백, 테두리, float, text-indent는 먹지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::first-line", "0-0-1", "Chrome 1, Safari 1, Firefox 1"]],
          },
          {
            caption: "먹는 속성",
            head: ["묶음", "예"],
            rows: [
              ["글꼴", "font, font-size, font-weight, font-style"],
              ["배경", "background-color, background-image"],
              ["글자 꾸밈", "color, text-decoration, text-shadow, text-transform"],
              ["간격", "letter-spacing, word-spacing, line-height, vertical-align"],
            ],
          },
        ],
        code: "article p:first-of-type::first-line {\n  font-variant-caps: small-caps;\n  color: #333;\n}",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 첫 줄과 첫 글자에 먹는 속성",
        body: "`::first-line`에 color, margin-left, text-indent를 줬습니다. MDN 목록에 있는 color만 먹고 나머지 둘은 먹지 않습니다. 지금 값에서 color는 준 색이고, margin-left와 text-indent는 초기값에 머뭅니다. 브라우저에 따라 계산값에는 남을 수도 있으니, 화면에서 첫 줄이 들여 쓰이지 않았는지도 봅니다.\n\n`::first-letter`는 float과 여백이 먹는 목록에 있습니다. 그래서 float과 margin-right가 준 값 그대로 나옵니다. p 자체의 color는 바뀌지 않습니다. 첫 줄 상자에만 색이 들기 때문입니다.",
        lab: {
          html: `<style>
  p { width: 220px; }
  .t::first-line { color: crimson; margin-left: 40px; text-indent: 40px; }
  .t::first-letter { font-size: 200%; float: left; margin-right: 6px; }
</style>
<p class="t">첫 줄만 색이 바뀌는 긴 문단입니다. 폭을 바꾸면 첫 줄이 끝나는 자리도 달라집니다.</p>`,
          height: 170,
          tryIt: "p의 width를 120px로 줄이고 실행해, 색이 드는 범위가 어떻게 바뀌는지 보세요.",
          checks: [
            { label: "::first-line의 color", expr: "getComputedStyle(document.querySelector('.t'), '::first-line').color" },
            { label: "::first-line의 margin-left", expr: "getComputedStyle(document.querySelector('.t'), '::first-line').marginLeft" },
            { label: "::first-line의 text-indent", expr: "getComputedStyle(document.querySelector('.t'), '::first-line').textIndent" },
            { label: "::first-letter의 float", expr: "getComputedStyle(document.querySelector('.t'), '::first-letter').float" },
            { label: "::first-letter의 margin-right", expr: "getComputedStyle(document.querySelector('.t'), '::first-letter').marginRight" },
            { label: "p 자체의 color", expr: "getComputedStyle(document.querySelector('.t')).color" },
          ],
        },
      },
      {
        label: "::selection",
        body: "사용자가 끌어서 고른 부분을 꾸밉니다. 먹는 속성은 글자색, 바탕색, 글자 꾸밈 몇 가지뿐입니다. background-image는 무시됩니다. 하이라이트 가상 요소라서 상속 방식이 보통 요소와 다릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::selection", "0-0-1", "Chrome 1, Safari 1.1, Firefox 62"]],
          },
          {
            caption: "먹는 속성",
            head: ["묶음", "예"],
            rows: [
              ["색", "color, background-color"],
              ["글자 꾸밈", "text-decoration과 그 풀어 쓴 속성, text-shadow"],
              ["-webkit- 속성", "-webkit-text-stroke-color, -webkit-text-stroke-width, -webkit-text-fill-color"],
            ],
          },
        ],
        code: "::selection { color: white; background-color: #2563eb; }\ncode::selection { background-color: #f59e0b; }",
        codeLang: "css",
        notes: [
          {
            title: "선택 색은 함부로 바꾸지 않는다",
            body: "MDN은 꾸밈만을 위해 선택 색을 바꾸지 말라고 권합니다. 사용자가 자기에게 맞게 정해 둔 색일 수 있기 때문입니다. 바꾼다면 글자와 바탕의 명도 대비를 4.5:1 이상으로 맞춥니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 끌어 고른 글과 ::selection",
        body: "첫 문단을 마우스로 끌어 고르면 흰 글자에 파란 바탕이 됩니다. 둘째 문단은 규칙이 없어 브라우저 기본 선택 색입니다. 두 문단에 걸쳐 고르면 한 선택 안에서도 문단마다 색이 다릅니다.\n\n지금 값의 '고른 글'이 고른 내용을 보여 주고, '고르기 시작한 문단'이 어디서 시작했는지 알려 줍니다. 마지막 줄은 `.hi::selection`에 적은 바탕색을 계산값으로 읽은 것입니다.",
        lab: {
          html: `<style>
  .hi::selection { color: white; background-color: rgb(37, 99, 235); }
</style>
<p class="hi">이 문장을 마우스로 끌어 골라 보세요.</p>
<p>이 문단은 브라우저 기본 선택 색입니다.</p>`,
          height: 140,
          tryIt: "둘째 p에도 class=\"hi\"를 달고 다시 골라 보세요.",
          checks: [
            { label: "고른 글", expr: "String(getSelection()) || '(없음)'" },
            { label: "고르기 시작한 문단", expr: "(() => { const n = getSelection().anchorNode; if (!n) return '(없음)'; const p = (n.nodeType === 3 ? n.parentElement : n).closest('p'); return p ? (p.className ? '.' + p.className : '보통 p') : '(p 밖)'; })()" },
            { label: ".hi::selection의 background-color", expr: "getComputedStyle(document.querySelector('.hi'), '::selection').backgroundColor" },
          ],
        },
      },
      {
        label: "::marker",
        body: "목록 항목의 표지 상자를 고릅니다. 글머리표나 번호가 들어가는 자리입니다. `display: list-item`인 요소면 모두 생기고, li와 summary가 대표입니다. `content`로 표지 글자 자체를 바꿀 수 있습니다. 배경이나 여백은 먹지 않습니다. 표지를 상자처럼 꾸며야 하면 `list-style: none`과 `::before`로 직접 그립니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::marker", "0-0-1", "Chrome 86, Safari 11.1, Firefox 68"]],
          },
          {
            caption: "먹는 속성",
            head: ["묶음", "예"],
            rows: [
              ["글꼴", "font, font-size, font-weight"],
              ["글자", "color, content, white-space, quotes"],
              ["번호", "counter-increment, counter-reset, counter-set"],
              ["움직임", "animation, transition 무리"],
              ["방향", "direction, unicode-bidi, text-combine-upright"],
            ],
          },
        ],
        code: "li::marker { color: crimson; font-weight: bold; }\nol.steps li::marker { content: counter(list-item) \"단계 \"; }\nsummary::marker { content: \"+ \"; }",
        codeLang: "css",
      },
      {
        label: "::placeholder",
        body: "input과 textarea의 안내 글, 곧 placeholder 속성의 글을 꾸밉니다. 브라우저마다 기본 색이 달라서, 맞추려면 color를 직접 줍니다. 안내 글은 입력하면 사라지므로 label을 대신할 수 없습니다. 색이 너무 연하면 읽기 어렵고, 너무 진하면 이미 입력한 값으로 오해합니다. 안내 글이 보이는 입력란 자체를 고르려면 `:placeholder-shown`을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::placeholder", "0-0-1", "Chrome 57, Safari 10.1, Firefox 51"]],
          },
        ],
        code: "input::placeholder { color: #6b7280; font-style: italic; }\n.same::placeholder { color: currentColor; }   /* 입력 글자와 같은 색 */",
        codeLang: "css",
      },
      {
        label: "::backdrop",
        body: "최상위 레이어에 올라간 요소 바로 밑에 깔리는 화면 크기의 상자입니다. 세 경우에 생깁니다.\n1. `requestFullscreen()`으로 전체 화면이 된 요소\n2. `showModal()`로 연 dialog\n3. `showPopover()`로 연 팝오버\n\n올라간 요소마다 자기 `::backdrop`을 하나씩 가집니다. 다른 요소에게서 물려받지도 않고 물려주지도 않습니다. 먹는 속성에 제한이 없어서 반투명 배경이나 흐림 효과를 줄 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::backdrop", "0-0-1", "Chrome 37, Safari 15.4, Firefox 47"]],
          },
        ],
        code: "dialog::backdrop { background: rgb(0 0 0 / 50%); }\n[popover]::backdrop { backdrop-filter: blur(2px); }",
        codeLang: "css",
        terms: [
          {
            term: "최상위 레이어",
            body: "문서의 다른 모든 것 위에 따로 그려지는 층입니다. z-index를 아무리 높여도 이 층 위로는 못 올라갑니다. 모달 dialog, 팝오버, 전체 화면 요소가 여기에 올라갑니다. 무대 막 앞에 따로 나와 서는 배우와 같습니다.",
          },
        ],
      },
      {
        label: "::file-selector-button",
        body: "`<input type=\"file\">`의 '파일 선택' 버튼을 고릅니다. 이 버튼은 통째로 하나의 요소처럼 다룹니다. 그래서 브라우저 기본 스타일을 그대로 받고, input의 글꼴과 색을 꼭 물려받지는 않습니다. `::file-selector-button:hover`처럼 뒤에 가상 클래스를 붙일 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::file-selector-button", "0-0-1", "Chrome 89, Safari 14.1, Firefox 82"]],
          },
        ],
        code: "input[type=\"file\"]::file-selector-button {\n  border: 2px solid #6c5ce7;\n  border-radius: 0.2em;\n  background: #a29bfe;\n}\ninput[type=\"file\"]::file-selector-button:hover { background: #81ecec; }",
        codeLang: "css",
      },
      {
        label: "::details-content",
        body: "details 요소에서 summary를 뺀 나머지, 곧 접히고 펴지는 내용을 고릅니다. 이 부분을 감싸는 HTML 요소는 따로 없습니다. 펼치고 접을 때 이 상자의 `content-visibility`가 visible과 hidden 사이를 오갑니다. 여기에 `allow-discrete` 전환을 더하면 opacity를 서서히 바꿀 수 있습니다(12장).",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::details-content", "0-0-1", "Chrome 131, Safari 18.4, Firefox 143"]],
          },
        ],
        code: "details::details-content {\n  opacity: 0;\n  transition: opacity 0.6s, content-visibility 0.6s allow-discrete;\n}\ndetails[open]::details-content { opacity: 1; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 펼치면 바뀌는 ::details-content",
        body: "summary를 눌러 펼치면 기록에 toggle이 찍힙니다. 지금 값의 open이 true가 됩니다. content-visibility는 hidden에서 visible로 바뀝니다. MDN이 '펼치고 접을 때 이 값이 hidden과 visible을 오간다'고 적은 그대로입니다. 이때부터 `details[open]` 쪽 규칙도 맞아 outline-style이 solid가 됩니다. 이 가상 요소를 모르는 브라우저에서는 두 규칙이 모두 버려집니다.",
        lab: {
          html: `<style>
  details::details-content { background-color: #e0e7ff; padding: 0 8px; }
  details[open]::details-content { outline: 2px solid #6366f1; }
</style>
<details>
  <summary>펼쳐 보기</summary>
  <p>summary를 뺀 이 부분이 ::details-content입니다.</p>
</details>`,
          height: 150,
          tryIt: "첫 규칙에 opacity: 0과 transition: opacity 0.6s, content-visibility 0.6s allow-discrete를, 둘째 규칙에 opacity: 1을 더해 보세요.",
          checks: [
            { label: "open", expr: "document.querySelector('details').open" },
            { label: "content-visibility", expr: "getComputedStyle(document.querySelector('details'), '::details-content').contentVisibility" },
            { label: "outline-style", expr: "getComputedStyle(document.querySelector('details'), '::details-content').outlineStyle" },
          ],
        },
      },
      {
        label: "::cue",
        body: "video의 WebVTT 자막 큐, 곧 화면에 뜨는 자막 글을 꾸밉니다. `::cue`는 모든 큐를 고르고, `::cue(u)`처럼 인자를 주면 큐 안의 그 태그만 고릅니다. 큐 글에는 c, i, b, u, ruby, rt, v, lang 태그를 쓸 수 있습니다. 먹는 속성은 글자와 배경을 꾸미는 것으로 정해져 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::cue, ::cue(선택자)", "0-0-1", "Chrome 26, Safari 7, Firefox 55"]],
          },
          {
            caption: "먹는 속성",
            head: ["묶음", "예"],
            rows: [
              ["글꼴", "font, font-size, font-weight, line-height"],
              ["색과 배경", "color, opacity, background, background-color"],
              ["글자 꾸밈", "text-decoration, text-shadow, outline"],
              ["그 밖", "visibility, white-space, ruby-position, text-combine-upright"],
            ],
          },
        ],
        code: "::cue { color: white; background-color: rgb(0 0 0 / 60%); }\n::cue(u) { color: red; text-decoration: wavy overline lime; }",
        codeLang: "css",
      },
      {
        label: "::part()",
        body: "그림자 트리 안에서 `part` 속성을 단 요소를 바깥에서 고릅니다. 컴포넌트를 만든 사람이 꾸며도 된다고 연 부분에만 바깥 CSS가 닿습니다. part 이름은 클래스처럼 여러 요소가 같이 쓸 수 있고, 한 요소가 이름을 여럿 가질 수 있습니다. `::part(tab active)`는 두 이름을 모두 가진 요소이고 순서는 상관없습니다.\n\n뒤에 `:hover` 같은 가상 클래스를 붙일 수 있습니다. 하지만 `:empty`, `:last-child` 같은 구조 가상 클래스는 안 됩니다. `::part()` 뒤에 `::part()`를 또 붙이면 아무것도 맞지 않습니다. 중첩된 그림자 트리의 part는 바로 위 문서에만 보입니다. 더 위로 열려면 `exportparts`를 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::part(<이름>+)", "0-0-1", "Chrome 73, Safari 13.1, Firefox 72"]],
          },
        ],
        code: "tab-list::part(tab) { color: blue; }\ntab-list::part(tab):hover { background: black; color: white; }\ntab-list::part(tab active) { border-color: blue; }",
        codeLang: "css",
        terms: [
          {
            term: "그림자 트리",
            body: "사용자 정의 요소가 안쪽에 숨겨 두는 별도의 DOM 나무입니다. 바깥 CSS는 원래 이 안으로 들어가지 못합니다. 가전제품 덮개 속 부품처럼, 만든 사람이 밖으로 내놓은 단추만 누를 수 있습니다.",
          },
        ],
      },
      {
        label: "::slotted()",
        body: "그림자 트리 안의 CSS에서, 슬롯에 꽂힌 바깥 요소를 고릅니다. 그림자 트리 안에 둔 스타일에서만 동작합니다. 인자는 복합 선택자 하나입니다(`::slotted(span.note)`). 꽂힌 요소 자신만 고르고 그 자손은 고르지 못합니다. 슬롯에 들어간 글자 노드도 고르지 못합니다. 특이성은 가상 요소의 0-0-1에 인자의 무게를 더합니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::slotted(<복합 선택자>)", "0-0-1 + 인자", "Chrome 50, Safari 10, Firefox 63"]],
          },
        ],
        code: "/* 그림자 트리 안의 <style> */\n::slotted(*) { color: gray; }\n::slotted(span) { text-decoration: underline; }",
        codeLang: "css",
      },
      {
        label: "::highlight()",
        body: "CSS 사용자 하이라이트 API로 등록한 범위들을 꾸밉니다. 자바스크립트에서 Range를 모아 `new Highlight()`를 만듭니다. 그것을 `CSS.highlights.set(\"이름\", h)`로 등록합니다. 그 이름을 `::highlight(이름)`에 씁니다. DOM에 span을 끼우지 않고도 검색어 강조, 맞춤법 표시 같은 것을 칠할 수 있습니다. 먹는 속성은 `::selection`과 같은 목록입니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["::highlight(<이름>)", "0-0-1", "Chrome 105, Safari 17.2, Firefox 149"]],
          },
        ],
        code: "::highlight(search) { background-color: yellow; color: black; }\n::highlight(typo) { text-decoration: wavy underline red; }",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "가상 요소의 문제는 대개 '상자가 생기는 조건'과 '먹는 속성'에서 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["`::before`에 모양만 줬다", "content가 없어 상자가 안 생긴다", "`content: \"\"`라도 준다"],
              ["`img::after`로 캡션을 붙였다", "대체 요소라 가상 요소가 안 생긴다", "figure로 감싸 figcaption을 쓴다"],
              ["`::first-line`에 margin을 줬다", "먹는 속성 목록에 없어 무시된다", "p 자체에 margin을 준다"],
              ["`li::marker`에 배경을 줬다", "marker는 배경을 받지 않는다", "`::before`로 표지를 직접 그린다"],
              ["placeholder 색을 그대로 뒀다", "브라우저마다 기본 색이 다르다", "`::placeholder`에 color를 준다"],
              ["`a:is(::before, ::after)`로 묶었다", "`:is()`는 가상 요소를 받지 않는다", "`a::before, a::after`로 나눠 쓴다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `content`를 안 준 `::before`는 왜 안 보입니까?\n2) `p::first-line`의 특이성은 얼마입니까?\n3) `img::before`가 생기지 않는 까닭은 무엇입니까?\n4) 바깥 CSS로 그림자 트리 안의 요소를 꾸미려면 무엇이 필요합니까?",
      },
    ],
    sources: [
      { label: "MDN: Pseudo-elements", href: `${MDN}/Reference/Selectors/Pseudo-elements` },
      { label: "MDN: ::before", href: `${MDN}/Reference/Selectors/::before` },
      { label: "MDN: ::first-letter", href: `${MDN}/Reference/Selectors/::first-letter` },
      { label: "MDN: ::marker", href: `${MDN}/Reference/Selectors/::marker` },
      { label: "MDN: ::backdrop", href: `${MDN}/Reference/Selectors/::backdrop` },
      { label: "MDN: ::part()", href: `${MDN}/Reference/Selectors/::part` },
    ],
  },
  {
    id: "css-sel-comb",
    name: "결합자",
    tagline: "두 선택자 사이에 트리 위의 관계를 적는다",
    intro:
      "선택자 두 개 사이에 공백, `>`, `+`, `~`를 넣으면 트리 위의 관계가 됩니다. 차례로 '안 어딘가', '바로 아래', '바로 뒤', '뒤쪽 어딘가'입니다. 결합자는 오른쪽 선택자가 고를 대상을 왼쪽과의 관계로 좁힙니다. 결합자 자체는 특이성에 무게를 더하지 않습니다. 실험 단계의 열 결합자(`||`)와 이름공간 구분자(`|`)도 함께 봅니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "결합자는 특이성을 더하지 않습니다. `ul > li`는 `ul li`와 같은 0-0-2입니다. 실제로 고르는 대상은 맨 오른쪽 선택자에 맞는 요소입니다.",
        tables: [
          {
            head: ["선택자", "고르는 것", "특이성", "자세히"],
            rows: [
              ["A B", "A 안 어디든 있는 B(자손)", "더하지 않음", "1장 · 문법과 선택자"],
              ["A > B", "A 바로 아래의 B(자식)", "더하지 않음", "1장 · 문법과 선택자"],
              ["A + B", "A 바로 뒤의 형제 B", "더하지 않음", "1장 · 문법과 선택자"],
              ["A ~ B", "A 뒤쪽의 모든 형제 B", "더하지 않음", "1장 · 문법과 선택자"],
              ["A || B", "열 A에 속한 칸 B(실험)", "더하지 않음", ""],
              ["ns|a", "이름공간 ns에 속한 a", "더하지 않음", ""],
            ],
          },
        ],
        terms: [
          {
            term: "복잡 선택자",
            body: "결합자로 선택자 여럿을 이은 선택자입니다(`nav > ul li`). 고르는 대상은 맨 오른쪽 선택자에 맞는 요소이고, 왼쪽은 조건입니다. '강남구에 있는 카페'에서 찾는 것은 카페이고 앞은 위치 조건인 것과 같습니다.",
          },
        ],
      },
      {
        label: "A B",
        body: "왼쪽 A를 조상으로 둔 B를 고르는 자손 결합자입니다. 부모든, 부모의 부모든 몇 단계 위든 상관없습니다. 결합자는 공백 문자 하나 이상입니다. 스페이스, 탭, 줄바꿈 모두 되고 사이에 주석이 있어도 됩니다. 범위가 넓어서 중첩 목록처럼 같은 구조가 되풀이되면 안쪽까지 모두 맞습니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["A B", "A와 B의 합", "Chrome 1, Safari 1, Firefox 1"]],
          },
        ],
        code: "ul.menu li { margin: 0.5em; }        /* 몇 단계 안이든 */\nli li { list-style-type: circle; }   /* 목록 안의 목록 */",
        codeLang: "css",
        terms: [
          {
            term: "자손",
            body: "어떤 요소 안에 들어 있는 모든 요소입니다. 바로 아래 자식뿐 아니라 손자와 그 아래까지 포함합니다. 족보에서 한 사람 아래로 이어진 모든 후손과 같습니다.",
          },
        ],
      },
      {
        label: "A > B",
        body: "A의 바로 아래 자식인 B만 고르는 자식 결합자입니다. 자손 결합자보다 엄격해서 손자나 그 아래는 고르지 않습니다. `>` 앞뒤의 공백은 없어도 되지만 읽기 좋게 넣습니다. 중첩 메뉴에서 바깥 단계만 꾸밀 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["A > B", "A와 B의 합", "Chrome 1, Safari 1, Firefox 1"]],
          },
        ],
        code: "ul.menu > li { display: inline-block; }   /* 바깥 단계만 */\n.card > :first-child { margin-top: 0; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 자손과 자식",
        body: "span 셋 중 가는 .box의 자식이고, 나는 .box 안 p의 자식이고, 다는 .box 밖에 있습니다. `.box span`은 몇 단계 안이든 고르므로 가와 나에 맞고, 둘 다 밑줄이 생깁니다. `.box > span`은 바로 아래 자식만 고르므로 가에만 맞고, 가만 빨강입니다. 다는 어느 규칙에도 맞지 않습니다. 지금 값의 처음 두 줄이 각 선택자가 고른 span입니다.",
        lab: {
          html: `<style>
  .box span { text-decoration: underline; }
  .box > span { color: crimson; }
</style>
<div class="box">
  <span>가: box의 자식</span>
  <p><span>나: p 안의 span</span></p>
</div>
<span>다: box 밖</span>`,
          height: 160,
          tryIt: "p 태그를 지워 나를 .box 바로 아래로 옮겨 보세요.",
          checks: [
            { label: ".box span이 고른 것", expr: "[...document.querySelectorAll('.box span')].map((s) => s.textContent[0]).join(', ') || '없음'" },
            { label: ".box > span이 고른 것", expr: "[...document.querySelectorAll('.box > span')].map((s) => s.textContent[0]).join(', ') || '없음'" },
            { label: "color", expr: "[...document.querySelectorAll('span')].map((s) => s.textContent[0] + ':' + (getComputedStyle(s).color === 'rgb(220, 20, 60)' ? '빨강' : '기본')).join(' ')" },
            { label: "text-decoration-line", expr: "[...document.querySelectorAll('span')].map((s) => s.textContent[0] + ':' + getComputedStyle(s).textDecorationLine).join(' ')" },
          ],
        },
      },
      {
        label: "A + B",
        body: "A 바로 뒤에 오는 형제 B를 고르는 다음 형제 결합자입니다. 둘은 부모가 같아야 하고, 사이에 다른 요소가 끼면 안 됩니다. 사이의 글자 노드나 주석은 상관없습니다. 제목 바로 뒤 문단처럼 '바로 다음 하나'를 꾸밀 때 씁니다. 앞 형제를 고르고 싶으면 `:has(+ B)`를 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["A + B", "A와 B의 합", "Chrome 1, Safari 1, Firefox 1"]],
          },
        ],
        code: "h2 + p { margin-top: 0; }\ninput:invalid + .hint { color: crimson; }\nli:has(+ li:last-of-type) { font-weight: bold; }   /* 끝에서 둘째 */",
        codeLang: "css",
        terms: [
          {
            term: "형제",
            body: "부모가 같은 요소끼리입니다. 형제 결합자는 문서 순서에서 뒤쪽 형제만 봅니다. 줄 선 사람에게 '내 뒷사람'만 가리키게 한 것과 같습니다.",
          },
        ],
      },
      {
        label: "A ~ B",
        body: "A 뒤쪽에 있는 형제 B를 모두 고르는 뒤따르는 형제 결합자입니다. 바로 뒤가 아니어도 되고, 사이에 무엇이 몇 개 끼어도 됩니다. 부모는 같아야 합니다. A보다 앞에 있는 형제는 고르지 않습니다. 체크 상자 상태로 뒤쪽 형제를 바꾸는 패턴에 자주 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["A ~ B", "A와 B의 합", "Chrome 1, Safari 3, Firefox 1"]],
          },
        ],
        code: "h2 ~ p { color: #444; }   /* h2 뒤의 모든 형제 p */\n#menu-toggle:checked ~ nav { display: block; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: +와 ~, 그리고 체크 상자",
        body: "체크 상자나 label을 눌러 보세요. 기록에 클릭이 찍히고 상자가 체크됩니다. 그러면 `input:checked + label`이 바로 뒤의 label을 굵게 만듭니다. `input:checked ~ p`는 뒤쪽의 p 둘을 모두 초록으로 만듭니다. 지금 값의 font-weight와 color가 바뀝니다.\n\n`input + p`는 늘 0개입니다. input 바로 뒤에는 label이 있어서 p는 '바로 다음 형제'가 아니기 때문입니다. `input ~ p`는 체크와 상관없이 2개입니다.",
        lab: {
          html: `<style>
  input:checked + label { font-weight: bold; }
  input:checked ~ p { color: seagreen; }
</style>
<input type="checkbox" id="t">
<label for="t">알림 받기</label>
<p>첫째 p</p>
<p>둘째 p</p>`,
          height: 150,
          tryIt: "label을 p 둘 뒤로 옮기고 다시 눌러 보세요.",
          checks: [
            { label: "label의 font-weight", expr: "getComputedStyle(document.querySelector('label')).fontWeight" },
            { label: "p의 color", expr: "[...document.querySelectorAll('p')].map((p) => getComputedStyle(p).color).join(' | ')" },
            { label: "input + p 개수", expr: "document.querySelectorAll('input + p').length" },
            { label: "input ~ p 개수", expr: "document.querySelectorAll('input ~ p').length" },
          ],
        },
      },
      {
        label: "A || B",
        body: "열 결합자입니다. 앞의 col 요소가 나타내는 열에 속한 표 칸 B를 고릅니다. 표 칸은 col의 자식이 아니라서 다른 결합자로는 이 관계를 적을 수 없습니다. MDN은 실험 기능으로 표시하고, 주요 브라우저는 아직 이 문법을 읽지 못합니다. 지금은 `:nth-child()`로 열의 칸을 고르는 편이 안전합니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["A || B", "A와 B의 합", "실험 기능, 주요 브라우저에 아직 없음"]],
          },
        ],
        code: "col.selected || td { background: gray; color: white; }\n\n/* 지금 쓸 수 있는 대안: 셋째 열 */\ntr > :nth-child(3) { background: gray; }",
        codeLang: "css",
      },
      {
        label: "ns|a",
        body: "이름공간 구분자입니다. 태그 선택자나 `*` 앞에 이름공간을 붙여, 어느 어휘의 요소인지 정합니다. 이름공간은 먼저 `@namespace`로 선언합니다. HTML 안에 SVG나 MathML이 섞인 문서, 여러 XML 어휘가 섞인 문서에서 씁니다.\n1. `ns|a`: 이름공간 ns의 a\n2. `*|a`: 이름공간이 있든 없든 모든 a\n3. `|a`: 이름공간이 없는 a\n\nHTML 요소와 SVG 요소는 선언하지 않아도 각자의 이름공간에 들어 있습니다. 그래서 `|a`는 보통 아무것도 고르지 않습니다. 이름 없이 `@namespace url(…)`만 쓰면 기본 이름공간이 됩니다. 그러면 접두어 없는 태그 선택자는 그 이름공간의 요소만 고릅니다. 이름공간 부분은 특이성에 더하지 않아서 `ns|a`는 `a`와 같은 0-0-1입니다.",
        tables: [
          {
            caption: "정의",
            head: ["문법", "특이성", "지원 시작"],
            rows: [["ns|a, *|a, |a", "더하지 않음(a의 0-0-1만)", "주요 브라우저 모두"]],
          },
        ],
        code: "@namespace svg url(\"http://www.w3.org/2000/svg\");\nsvg|a { fill: green; }   /* SVG 안의 링크 */\n*|a { color: red; }      /* 모든 이름공간의 a */",
        codeLang: "css",
        terms: [
          {
            term: "이름공간",
            body: "같은 태그 이름이 여러 어휘에서 겹칠 때 어느 어휘인지 가르는 주소입니다. HTML의 a와 SVG의 a는 이름은 같지만 이름공간이 다릅니다. 이름이 같은 학생을 반 이름으로 가르는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 이름공간으로 a 가르기",
        body: "a가 셋 있습니다. HTML의 a, SVG 안의 a, 그리고 스크립트가 이름공간 없이 만든 a입니다. 지금 값의 첫 줄이 셋의 이름공간을 보여 줍니다. `svg|a`의 fill은 SVG의 a에만 들어갑니다. `*|a`는 이름공간과 상관없이 셋 모두를 기울입니다. `|a`는 이름공간이 없는 셋째 a에만 맞아 그것에만 outline이 생깁니다.\n\n`@namespace` 줄을 지우고 실행하면 `svg|a` 규칙이 버려집니다. 선언하지 않은 접두어는 잘못된 선택자이기 때문입니다.",
        lab: {
          html: `<style>
  @namespace svg url("http://www.w3.org/2000/svg");
  svg|a { fill: green; }
  *|a { font-style: italic; }
  |a { outline: 2px solid crimson; }
</style>
<p><a href="#">HTML 링크</a></p>
<svg width="200" height="24"><a href="#"><text x="0" y="16">SVG 링크</text></a></svg>
<script>
  const a = document.createElementNS('', 'a');
  a.textContent = '이름공간 없는 a';
  document.body.append(a);
</script>`,
          height: 160,
          tryIt: "@namespace 줄을 지우고 실행해, fill 줄이 어떻게 바뀌는지 보세요.",
          checks: [
            { label: "a마다 이름공간", expr: "[...document.getElementsByTagName('a')].map((a) => a.namespaceURI ? a.namespaceURI.split('/').pop() : '없음').join(', ')" },
            { label: "fill", expr: "[...document.getElementsByTagName('a')].map((a) => getComputedStyle(a).fill).join(' | ')" },
            { label: "font-style", expr: "[...document.getElementsByTagName('a')].map((a) => getComputedStyle(a).fontStyle).join(', ')" },
            { label: "outline-style", expr: "[...document.getElementsByTagName('a')].map((a) => getComputedStyle(a).outlineStyle).join(', ')" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "결합자의 문제는 대개 범위를 너무 넓게 잡거나, 형제 관계를 잘못 알아서 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["`.menu li`로 바깥 메뉴를 꾸몄다", "하위 메뉴의 li까지 바뀐다", "`.menu > li`로 좁힌다"],
              ["`h2 + p`로 h2 뒤 문단을 모두 꾸몄다", "`+`는 바로 다음 하나만 고른다", "`h2 ~ p`로 바꾼다"],
              ["`input:checked ~ .panel`을 썼다", ".panel이 다른 부모 아래라 안 맞는다", "같은 부모에 두거나 `:has()`를 쓴다"],
              ["`~`로 앞 형제를 고르려 했다", "형제 결합자는 뒤쪽만 본다", "`A:has(~ B)`로 앞쪽 A를 고른다"],
              ["`col.x || td`로 열을 칠했다", "실험 기능이라 규칙이 버려진다", "`td:nth-child(n)`으로 고른다"],
              ["`querySelector(\"svg|a\")`를 불렀다", "선언 안 된 접두어라 SyntaxError가 난다", "`*|a`를 쓰거나 CSS에서만 쓴다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `ul li`와 `ul > li`의 특이성은 같습니까?\n2) `h2 + p`와 `h2 ~ p`가 다른 결과를 내는 HTML을 떠올려 보세요.\n3) 결합자만으로 앞 형제를 고를 수 있습니까? 없다면 무엇을 씁니까?\n4) HTML 문서에서 `|a`가 보통 아무것도 고르지 않는 까닭은 무엇입니까?",
      },
    ],
    sources: [
      { label: "MDN: Descendant combinator", href: `${MDN}/Reference/Selectors/Descendant_combinator` },
      { label: "MDN: Child combinator", href: `${MDN}/Reference/Selectors/Child_combinator` },
      { label: "MDN: Next-sibling combinator", href: `${MDN}/Reference/Selectors/Next-sibling_combinator` },
      { label: "MDN: Subsequent-sibling combinator", href: `${MDN}/Reference/Selectors/Subsequent-sibling_combinator` },
      { label: "MDN: Column combinator", href: `${MDN}/Reference/Selectors/Column_combinator` },
      { label: "MDN: Namespace separator", href: `${MDN}/Reference/Selectors/Namespace_separator` },
    ],
  },
  {
    id: "css-props",
    name: "속성 참고서",
    tagline: "속성 210여 개를 열여섯 묶음으로, 정의와 값까지",
    intro:
      "CSS 속성을 MDN의 모듈 분류에 맞춰 열여섯 묶음으로 나눴습니다. 속성마다 하는 일, 정의(초기값, 적용 대상, 상속, 애니메이션 방식), 쓸 수 있는 값을 적었습니다. 정의는 MDN의 속성 정의 데이터(mdn-data)를 옮긴 것입니다. 직접 해 보기에서 값을 바꾸면 지금 값 칸이 계산된 값과 상자의 실제 크기를 보여 줍니다. 속성이 왜 그렇게 동작하는지의 큰 줄기는 CSS 허브 1~14장에 있습니다.",
    blocks: [
      {
        label: "열여섯 묶음",
        body: "상자 하나를 그리는 순서를 따라 묶었습니다. 상자의 크기와 테두리, 그 안의 배경과 글자, 상자를 놓는 방법(디스플레이, 플렉스, 그리드, 위치), 넘치는 것과 움직이는 것, 그리고 효과와 그 밖의 것입니다.",
        tables: [
          {
            head: ["장", "대표 속성", "개념 장"],
            rows: [
              ["박스와 크기 속성", "width, height, box-sizing, margin, padding", "3장 · 박스 모델"],
              ["테두리, 윤곽, 그림자 속성", "border, border-radius, outline, box-shadow", "3장 · 박스 모델"],
              ["배경 속성", "background와 그 개별 속성", ""],
              ["글꼴 속성", "font, font-family, font-size, line-height", "13장 · 글꼴과 텍스트"],
              ["글자와 줄바꿈 속성", "text-align, white-space, word-break, text-overflow", "13장 · 글꼴과 텍스트"],
              ["쓰기 모드와 방향 속성", "writing-mode, direction, text-orientation", ""],
              ["디스플레이와 흐름 속성", "display, float, visibility", "5장 · 디스플레이와 흐름"],
              ["플렉스 속성", "flex, justify-content, align-items, gap", "6장 · 플렉스박스"],
              ["그리드 속성", "grid-template-columns, grid-area, place-items", "7장 · 그리드"],
              ["위치와 쌓임 속성", "position, inset, z-index", "8장 · 위치 지정과 쌓임 맥락"],
              ["넘침과 스크롤 속성", "overflow, scrollbar-*, scroll-snap-*", "9장 · 오버플로와 크기"],
              ["변형 속성", "transform, translate, rotate, scale", "12장"],
              ["트랜지션과 애니메이션 속성", "transition, animation", "12장"],
              ["색과 효과 속성", "opacity, filter, mix-blend-mode, accent-color", ""],
              ["목록과 표 속성", "list-style, counter-*, border-collapse, table-layout", ""],
              ["UI와 그 밖의 속성", "cursor, pointer-events, user-select, object-fit, all", ""],
            ],
          },
        ],
      },
      {
        label: "속성 전체 목록",
        body: "이 참고서의 속성을 abc 순서로 모두 늘어놓았습니다. 초기값과 상속은 MDN의 속성 정의를 옮겼고, 장 이름을 따라가면 그 속성의 블록이 있습니다.",
        tables: [
          { head: ["속성", "하는 일", "초기값", "상속", "장"], rows: [["accent-color","체크박스 같은 컨트롤의 강조색","auto","됨","색과 효과 속성"],["align-content","컨테이너: 여러 줄 사이 공간 분배","normal","안 됨","플렉스 속성"],["align-items","컨테이너: 교차축 기본 정렬","normal","안 됨","플렉스 속성"],["align-self","아이템: 교차축 정렬을 하나만","auto","안 됨","플렉스 속성"],["all","거의 모든 속성을 한 번에 되돌림","없음","안 됨","UI와 그 밖의 속성"],["animation","애니메이션 단축 속성","각 속성의 초기값","안 됨","트랜지션과 애니메이션 속성"],["animation-delay","시작 전 기다림","0s","안 됨","트랜지션과 애니메이션 속성"],["animation-direction","도는 방향","normal","안 됨","트랜지션과 애니메이션 속성"],["animation-duration","한 바퀴 시간","0s","안 됨","트랜지션과 애니메이션 속성"],["animation-fill-mode","시작 전, 끝난 뒤의 값","none","안 됨","트랜지션과 애니메이션 속성"],["animation-iteration-count","반복 횟수","1","안 됨","트랜지션과 애니메이션 속성"],["animation-name","쓸 @keyframes 이름","none","안 됨","트랜지션과 애니메이션 속성"],["animation-play-state","돌릴지 멈출지","running","안 됨","트랜지션과 애니메이션 속성"],["animation-timing-function","한 바퀴 안의 속도 곡선","ease","안 됨","트랜지션과 애니메이션 속성"],["appearance","컨트롤을 운영체제 모양으로 그릴지","none","안 됨","UI와 그 밖의 속성"],["aspect-ratio","너비 대 높이의 비율","auto","안 됨","박스와 크기 속성"],["backdrop-filter","요소 뒤에 비치는 영역에 효과","none","안 됨","색과 효과 속성"],["backface-visibility","뒷면을 보일지","visible","안 됨","변형 속성"],["background","배경 속성 전부를 한 번에","하위 속성마다","안 됨","배경 속성"],["background-attachment","스크롤할 때 무엇에 붙을지","scroll","안 됨","배경 속성"],["background-blend-mode","층끼리 섞는 방식","normal","안 됨","배경 속성"],["background-clip","배경을 칠할 영역","border-box","안 됨","배경 속성"],["background-color","맨 아래 배경색","transparent","안 됨","배경 속성"],["background-image","배경 그림 층","none","안 됨","배경 속성"],["background-origin","위치와 크기를 잴 기준 상자","padding-box","안 됨","배경 속성"],["background-position","그림 시작 위치","0% 0%","안 됨","배경 속성"],["background-repeat","그림 반복 방식","repeat","안 됨","배경 속성"],["background-size","그림 크기","auto auto","안 됨","배경 속성"],["block-size","블록 축(가로쓰기면 세로)의 크기","auto","안 됨","박스와 크기 속성"],["border","네 변 테두리의 굵기, 모양, 색을 한 번에","medium none currentColor","안 됨","테두리, 윤곽, 그림자 속성"],["border-collapse","칸 테두리를 합칠지 나눌지","separate","됨","목록과 표 속성"],["border-color","테두리 색","currentColor","안 됨","테두리, 윤곽, 그림자 속성"],["border-radius","모서리를 둥글게","0","안 됨","테두리, 윤곽, 그림자 속성"],["border-spacing","나뉜 칸 사이 거리","0","됨","목록과 표 속성"],["border-style","테두리 선 모양","none","안 됨","테두리, 윤곽, 그림자 속성"],["border-top","위 테두리 하나의 굵기, 모양, 색","medium none currentColor","안 됨","테두리, 윤곽, 그림자 속성"],["border-width","테두리 굵기","medium","안 됨","테두리, 윤곽, 그림자 속성"],["box-decoration-break","쪼개진 상자 조각의 장식","slice","안 됨","디스플레이와 흐름 속성"],["box-shadow","상자 그림자","none","안 됨","테두리, 윤곽, 그림자 속성"],["box-sizing","width가 어느 겹까지인지","content-box","안 됨","박스와 크기 속성"],["caption-side","표 제목의 자리","top","됨","목록과 표 속성"],["caret-color","입력 캐럿의 색","auto","됨","색과 효과 속성"],["clear","앞선 float 아래로 내려감","none","안 됨","디스플레이와 흐름 속성"],["clip-path","보일 영역을 모양으로 자름","none","안 됨","색과 효과 속성"],["color","글자와 장식선의 색","canvastext","됨","글자와 줄바꿈 속성"],["color-scheme","그려도 되는 밝은, 어두운 색 구성","normal","됨","색과 효과 속성"],["column-gap","컨테이너: 열 사이 간격","normal","안 됨","플렉스 속성"],["content","가상 요소에 넣을 생성 내용","normal","안 됨","UI와 그 밖의 속성"],["counter-increment","카운터를 늘리거나 줄임","none","안 됨","목록과 표 속성"],["counter-reset","카운터를 만들고 처음 값을 정함","none","안 됨","목록과 표 속성"],["cursor","마우스 커서 모양","auto","됨","UI와 그 밖의 속성"],["direction","글자가 흐르는 쪽 (ltr, rtl)","ltr","됨","쓰기 모드와 방향 속성"],["display","상자의 바깥 역할과 자식 배치 방식","inline","안 됨","디스플레이와 흐름 속성"],["empty-cells","빈 칸의 테두리, 배경을 그릴지","show","됨","목록과 표 속성"],["field-sizing","폼 컨트롤이 내용에 맞춰 커질지","fixed","안 됨","UI와 그 밖의 속성"],["filter","흐림, 색 바꿈 같은 그래픽 효과","none","안 됨","색과 효과 속성"],["flex","아이템: grow, shrink, basis를 한 번에","0 1 auto","안 됨","플렉스 속성"],["flex-basis","아이템: 주축 방향 출발 크기","auto","안 됨","플렉스 속성"],["flex-direction","컨테이너: 주축 방향","row","안 됨","플렉스 속성"],["flex-flow","컨테이너: 방향과 줄바꿈을 한 번에","row nowrap","안 됨","플렉스 속성"],["flex-grow","아이템: 남는 공간을 받는 비율","0","안 됨","플렉스 속성"],["flex-shrink","아이템: 모자란 공간을 내놓는 비율","1","안 됨","플렉스 속성"],["flex-wrap","컨테이너: 여러 줄 허용","nowrap","안 됨","플렉스 속성"],["float","상자를 왼쪽이나 오른쪽에 띄움","none","안 됨","디스플레이와 흐름 속성"],["font","글꼴 속성을 한 줄로 정하는 단축","하위 속성마다","됨","글꼴 속성"],["font-family","글꼴 후보 목록","브라우저마다 다름","됨","글꼴 속성"],["font-kerning","글자 쌍 간격 정보 사용","auto","됨","글꼴 속성"],["font-optical-sizing","크기에 맞춘 글자 모양","auto","됨","글꼴 속성"],["font-size","글자 크기","medium","됨","글꼴 속성"],["font-style","기울임","normal","됨","글꼴 속성"],["font-synthesis","없는 굵기, 기울임의 흉내 허용","weight style small-caps position","됨","글꼴 속성"],["font-variant","대체 글리프를 켜는 단축","normal","됨","글꼴 속성"],["font-variant-caps","작은 대문자","normal","됨","글꼴 속성"],["font-variant-numeric","숫자, 분수 모양","normal","됨","글꼴 속성"],["font-weight","글자 굵기","normal","됨","글꼴 속성"],["gap","컨테이너: 아이템과 줄 사이 간격","normal","안 됨","플렉스 속성"],["grid","명시적, 암묵적 그리드를 한 번에","none","안 됨","그리드 속성"],["grid-area","영역 이름이나 네 선으로 놓기","auto","안 됨","그리드 속성"],["grid-auto-columns","암묵적 열의 크기","auto","안 됨","그리드 속성"],["grid-auto-flow","자동 배치 방향과 dense","row","안 됨","그리드 속성"],["grid-auto-rows","암묵적 행의 크기","auto","안 됨","그리드 속성"],["grid-column","아이템의 열 시작선과 끝선","auto","안 됨","그리드 속성"],["grid-row","아이템의 행 시작선과 끝선","auto","안 됨","그리드 속성"],["grid-template","위 셋을 한 번에","none","안 됨","그리드 속성"],["grid-template-areas","칸에 이름을 붙여 영역 만들기","none","안 됨","그리드 속성"],["grid-template-columns","열 트랙의 크기와 선 이름","none","안 됨","그리드 속성"],["grid-template-rows","행 트랙의 크기와 선 이름","none","안 됨","그리드 속성"],["height","상자의 세로 크기","auto","안 됨","박스와 크기 속성"],["hyphens","하이픈 넣어 끊기","manual","됨","글자와 줄바꿈 속성"],["inline-size","인라인 축(가로쓰기면 가로)의 크기","auto","안 됨","박스와 크기 속성"],["inset","네 방향 거리를 한 줄에","네 속성 각각 auto","안 됨","위치와 쌓임 속성"],["isolation","쌓임 맥락을 새로 만듦","auto","안 됨","위치와 쌓임 속성"],["justify-content","컨테이너: 주축 방향 공간 분배","normal","안 됨","플렉스 속성"],["justify-items","모든 아이템의 인라인 축 기본 정렬","legacy","안 됨","그리드 속성"],["justify-self","아이템 하나의 인라인 축 정렬","auto","안 됨","그리드 속성"],["letter-spacing","글자 사이 간격","normal","됨","글자와 줄바꿈 속성"],["line-break","한중일 문장 부호 앞뒤 줄바꿈","auto","됨","글자와 줄바꿈 속성"],["-webkit-line-clamp","몇 줄까지 보일지","none","안 됨","글자와 줄바꿈 속성"],["line-height","줄 상자의 높이","normal","됨","글꼴 속성"],["list-style","목록 표시를 한 번에 (단축)","disc outside none","됨","목록과 표 속성"],["list-style-image","표시로 쓸 그림","none","됨","목록과 표 속성"],["list-style-position","표시를 상자 안에 둘지 밖에 둘지","outside","됨","목록과 표 속성"],["list-style-type","표시의 모양, 번호 체계","disc","됨","목록과 표 속성"],["margin","네 변의 바깥 여백을 한 번에","0","안 됨","박스와 크기 속성"],["margin-block","블록 축 양 끝의 바깥 여백","0","안 됨","박스와 크기 속성"],["margin-inline","인라인 축 양 끝의 바깥 여백","0","안 됨","박스와 크기 속성"],["margin-top, -right, -bottom, -left","한 변의 바깥 여백","0","안 됨","박스와 크기 속성"],["mask","그림의 투명도나 밝기로 가림 (단축)","풀어 쓴 속성마다","안 됨","색과 효과 속성"],["max-height","높이의 위 한계","none","안 됨","박스와 크기 속성"],["max-width","폭의 위 한계","none","안 됨","박스와 크기 속성"],["min-height","높이의 아래 한계","auto","안 됨","박스와 크기 속성"],["min-width","폭의 아래 한계","auto","안 됨","박스와 크기 속성"],["mix-blend-mode","뒤 내용과 색을 섞는 방식","normal","안 됨","색과 효과 속성"],["object-fit","그림을 상자에 맞추는 방식","fill","안 됨","UI와 그 밖의 속성"],["object-position","상자 안 그림의 자리","50% 50%","안 됨","UI와 그 밖의 속성"],["opacity","요소 전체의 불투명도","1","안 됨","색과 효과 속성"],["order","아이템: 보이는 순서","0","안 됨","플렉스 속성"],["outline","윤곽선의 굵기, 모양, 색을 한 번에","medium none auto","안 됨","테두리, 윤곽, 그림자 속성"],["outline-color","윤곽선 색","auto","안 됨","테두리, 윤곽, 그림자 속성"],["outline-offset","윤곽선과 테두리 사이 간격","0","안 됨","테두리, 윤곽, 그림자 속성"],["outline-style","윤곽선 모양","none","안 됨","테두리, 윤곽, 그림자 속성"],["outline-width","윤곽선 굵기","medium","안 됨","테두리, 윤곽, 그림자 속성"],["overflow","넘친 내용을 보일지, 자를지, 스크롤할지","visible","안 됨","넘침과 스크롤 속성"],["overflow-clip-margin","clip이 자르는 선을 바깥으로 넓힘","0px","안 됨","넘침과 스크롤 속성"],["overflow-wrap","넘칠 때만 긴 낱말 끊기","normal","됨","글자와 줄바꿈 속성"],["overflow-x, overflow-y","가로, 세로 한 축씩 정함","visible","안 됨","넘침과 스크롤 속성"],["overscroll-behavior","끝에 닿은 뒤 스크롤이 이어질지","auto","안 됨","넘침과 스크롤 속성"],["padding","네 변의 안쪽 여백을 한 번에","0","안 됨","박스와 크기 속성"],["padding-block","블록 축 양 끝의 안쪽 여백","0","안 됨","박스와 크기 속성"],["padding-inline","인라인 축 양 끝의 안쪽 여백","0","안 됨","박스와 크기 속성"],["padding-top, -right, -bottom, -left","한 변의 안쪽 여백","0","안 됨","박스와 크기 속성"],["perspective","자식에게 줄 원근 거리","none","안 됨","변형 속성"],["perspective-origin","원근의 소실점 위치","50% 50%","안 됨","변형 속성"],["place-content","align-content와 justify-content를 한 번에","normal","안 됨","그리드 속성"],["place-items","align-items와 justify-items를 한 번에","normal legacy","안 됨","그리드 속성"],["place-self","align-self와 justify-self를 한 번에","auto","안 됨","그리드 속성"],["pointer-events","포인터 이벤트의 대상이 될지","auto","됨","UI와 그 밖의 속성"],["position","놓는 방식과 기준 상자를 정함","static","안 됨","위치와 쌓임 속성"],["quotes","따옴표 글자","브라우저가 정함","됨","UI와 그 밖의 속성"],["resize","사용자가 크기를 끌어 바꿀 수 있을지","none","안 됨","UI와 그 밖의 속성"],["rotate","회전만 따로","none","안 됨","변형 속성"],["row-gap","컨테이너: 행 사이 간격","normal","안 됨","플렉스 속성"],["ruby-align","루비 주석의 정렬","space-around","됨","쓰기 모드와 방향 속성"],["ruby-position","루비 주석의 위치","alternate","됨","쓰기 모드와 방향 속성"],["scale","크기만 따로","none","안 됨","변형 속성"],["scroll-behavior","프로그램 스크롤을 부드럽게","auto","안 됨","넘침과 스크롤 속성"],["scroll-margin","스냅, 이동 때 자식 둘레의 여백","0","안 됨","넘침과 스크롤 속성"],["scroll-padding","스크롤 컨테이너의 안쪽 여백","auto","안 됨","넘침과 스크롤 속성"],["scroll-snap-align","자식이 맞춰 설 자리","none","안 됨","넘침과 스크롤 속성"],["scroll-snap-type","스냅의 축과 강도","none","안 됨","넘침과 스크롤 속성"],["scrollbar-color","스크롤바 막대와 길의 색","auto","됨","넘침과 스크롤 속성"],["scrollbar-gutter","스크롤바 자리를 미리 잡음","auto","안 됨","넘침과 스크롤 속성"],["scrollbar-width","스크롤바 굵기","auto","안 됨","넘침과 스크롤 속성"],["table-layout","열 폭을 정하는 방식","auto","안 됨","목록과 표 속성"],["text-align","줄 안의 인라인 내용을 가로로 정렬","start","됨","글자와 줄바꿈 속성"],["text-combine-upright","세로쓰기 속 짧은 가로짜기","none","됨","쓰기 모드와 방향 속성"],["text-decoration","장식선 단축 속성","풀어 쓴 속성 각각","안 됨","글자와 줄바꿈 속성"],["text-decoration-color","장식선 색","currentcolor","안 됨","글자와 줄바꿈 속성"],["text-decoration-line","밑줄, 윗줄, 취소선 고르기","none","안 됨","글자와 줄바꿈 속성"],["text-decoration-skip-ink","획을 피해 선 끊기","auto","됨","글자와 줄바꿈 속성"],["text-decoration-style","장식선 모양","solid","안 됨","글자와 줄바꿈 속성"],["text-decoration-thickness","장식선 두께","auto","안 됨","글자와 줄바꿈 속성"],["text-emphasis","강조 표시 단축 속성","풀어 쓴 속성 각각","됨","글자와 줄바꿈 속성"],["text-emphasis-color","강조 표시 색","currentcolor","됨","글자와 줄바꿈 속성"],["text-emphasis-position","강조 표시 위치","auto","됨","글자와 줄바꿈 속성"],["text-emphasis-style","강조 표시 모양","none","됨","글자와 줄바꿈 속성"],["text-indent","첫 줄 들여쓰기","0","됨","글자와 줄바꿈 속성"],["text-orientation","세로쓰기 속 글자의 방향","mixed","됨","쓰기 모드와 방향 속성"],["text-overflow","넘친 글 알리기 (말줄임표)","clip","안 됨","글자와 줄바꿈 속성"],["text-shadow","글자 그림자","none","됨","글자와 줄바꿈 속성"],["text-size-adjust (실험)","모바일 글자 부풀림 조절","auto 또는 none","됨","글자와 줄바꿈 속성"],["-webkit-text-stroke","글자 윤곽선 단축 속성","풀어 쓴 속성 각각","됨","글자와 줄바꿈 속성"],["-webkit-text-stroke-color","윤곽선 색","currentcolor","됨","글자와 줄바꿈 속성"],["-webkit-text-stroke-width","윤곽선 두께","0","됨","글자와 줄바꿈 속성"],["text-transform","대소문자 바꿔 보이기","none","됨","글자와 줄바꿈 속성"],["text-underline-offset","밑줄까지 거리","auto","됨","글자와 줄바꿈 속성"],["text-underline-position","밑줄 위치","auto","됨","글자와 줄바꿈 속성"],["text-wrap","줄 나누는 방식 (balance, pretty)","wrap","됨","글자와 줄바꿈 속성"],["top, right, bottom, left","기준 상자의 변에서 떨어진 거리","auto","안 됨","위치와 쌓임 속성"],["touch-action","터치 이동, 확대를 브라우저가 처리할지","auto","안 됨","UI와 그 밖의 속성"],["transform","변형 함수 목록을 적용","none","안 됨","변형 속성"],["transform-origin","변형의 기준점","50% 50% 0","안 됨","변형 속성"],["transform-style","자식을 3D 공간에 둘지","flat","안 됨","변형 속성"],["transition","트랜지션 단축 속성","각 속성의 초기값","안 됨","트랜지션과 애니메이션 속성"],["transition-behavior","이산 속성도 트랜지션할지","normal","안 됨","트랜지션과 애니메이션 속성"],["transition-delay","시작 전 기다림","0s","안 됨","트랜지션과 애니메이션 속성"],["transition-duration","걸리는 시간","0s","안 됨","트랜지션과 애니메이션 속성"],["transition-property","트랜지션할 속성","all","안 됨","트랜지션과 애니메이션 속성"],["transition-timing-function","속도 곡선","ease","안 됨","트랜지션과 애니메이션 속성"],["translate","이동만 따로","none","안 됨","변형 속성"],["unicode-bidi","섞인 방향의 글을 묶거나 떼어 냄","normal","안 됨","쓰기 모드와 방향 속성"],["user-select","글을 고를 수 있을지","auto","안 됨","UI와 그 밖의 속성"],["vertical-align","인라인과 표 칸의 세로 정렬","baseline","안 됨","글자와 줄바꿈 속성"],["visibility","자리는 두고 그리지 않음","visible","됨","디스플레이와 흐름 속성"],["white-space","공백 합치기와 자동 줄바꿈","normal","됨","글자와 줄바꿈 속성"],["width","상자의 가로 크기","auto","안 됨","박스와 크기 속성"],["will-change","곧 바뀔 속성을 미리 알림","auto","안 됨","트랜지션과 애니메이션 속성"],["word-break","낱말 안 줄바꿈 (한국어 어절)","normal","됨","글자와 줄바꿈 속성"],["word-spacing","낱말 사이 간격","normal","됨","글자와 줄바꿈 속성"],["writing-mode","가로쓰기, 세로쓰기와 줄이 쌓이는 쪽","horizontal-tb","됨","쓰기 모드와 방향 속성"],["z-index","쌓임 맥락 안의 층 번호","auto","안 됨","위치와 쌓임 속성"]] },
        ],
      },
      {
        label: "정의 표 읽는 법",
        body: "속성 블록마다 있는 '정의' 표는 네 칸입니다.\n(1) 초기값: 아무 선언도 없고 상속도 안 될 때의 값입니다.\n(2) 적용 대상: 이 속성이 효과를 내는 요소입니다. 대상이 아닌 요소에 적어도 에러는 없고 그냥 아무 일도 일어나지 않습니다(예: inline 요소의 width).\n(3) 상속: '예'면 선언이 없을 때 부모의 계산값을 물려받습니다. color, font는 상속되고, border, margin은 상속되지 않습니다.\n(4) 애니메이션: 트랜지션과 애니메이션으로 중간값을 만들 수 있는지입니다. '띄엄띄엄(discrete)'이면 중간 없이 한 번에 바뀝니다.",
        terms: [
          {
            term: "초기값과 상속",
            body: "선언이 없을 때 값을 정하는 두 길입니다. 상속되는 속성은 부모에게서 받고, 아니면 초기값을 씁니다. 집안 성씨(상속)는 물려받지만 키(비상속)는 물려받지 않고 각자 자라는 것과 같습니다.",
          },
          {
            term: "단축 속성 (shorthand)",
            body: "여러 개별 속성을 한 줄로 쓰는 속성입니다. margin은 margin-top, -right, -bottom, -left를 한 번에 정합니다. 단축 속성에서 빠뜨린 값은 '그대로'가 아니라 초기값으로 돌아갑니다. 세트 메뉴를 시키면 고르지 않은 음료도 기본 음료로 바뀌는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 상속되는 것과 안 되는 것",
        body: "부모 div에 color, font-size, border, padding을 줬습니다. 자식 p에는 아무것도 주지 않았습니다. 지금 값을 보면 p의 color와 font-size는 부모와 같습니다. 상속되는 속성이기 때문입니다. border와 padding은 0입니다. 상속되지 않아 초기값을 쓴 것입니다. tryIt대로 p에 border: inherit을 주면, 상속되지 않는 속성도 일부러 물려받게 할 수 있습니다.",
        lab: {
          html: `<style>
  div { color: crimson; font-size: 20px; border: 3px solid crimson; padding: 8px; }
</style>
<div>부모 div
  <p>자식 p: 아무 선언도 없습니다</p>
</div>`,
          height: 150,
          checks: [
            {
              label: "p의 color, font-size",
              expr: "(() => { const s = getComputedStyle(document.querySelector('p')); return s.color + ', ' + s.fontSize; })()",
            },
            {
              label: "p의 border, padding",
              expr: "(() => { const s = getComputedStyle(document.querySelector('p')); return s.borderTopWidth + ' ' + s.borderTopStyle + ', ' + s.paddingTop; })()",
            },
          ],
          tryIt: "<style>에 p { border: inherit; } 를 더해 실행해 보세요.",
        },
        terms: [
          {
            term: "적용 대상 (applies to)",
            body: "그 속성이 효과를 내는 요소의 범위입니다. width는 inline 요소가 아닌 것에, vertical-align은 inline과 표 칸에만 효과가 있습니다. 대상이 아닌 곳에 적어도 에러 없이 무시됩니다. 수도꼭지 손잡이를 전등 스위치에 달아도 물이 나오지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 단축 속성은 빠진 값을 초기값으로 되돌린다",
        body: "먼저 font-weight: bold를 주고, 뒤에서 font 단축 속성으로 크기와 글꼴만 다시 적었습니다. 지금 값의 font-weight가 bold(700)가 아니라 400입니다. font에서 굵기를 빠뜨렸기 때문에 초기값 normal로 돌아간 것입니다. line-height도 같은 이유로 normal이 됩니다. 단축 속성을 개별 속성 뒤에 쓰면 이렇게 앞의 선언이 지워집니다.",
        lab: {
          html: `<style>
  p { font-weight: bold; line-height: 2; }
  p { font: 18px serif; }
</style>
<p>굵게 하라고 했는데요?</p>`,
          height: 80,
          checks: [
            {
              label: "font-weight, line-height",
              expr: "(() => { const s = getComputedStyle(document.querySelector('p')); return s.fontWeight + ', ' + s.lineHeight; })()",
            },
          ],
          tryIt: "두 규칙의 순서를 바꿔 실행해 보세요. 이번에는 bold와 line-height 2가 남습니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "속성을 적었는데 효과가 없을 때 대부분 이 넷 중 하나입니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["span에 width가 안 먹는다", "적용 대상이 아니다 (inline 요소)", "display를 inline-block이나 block으로"],
              ["자식에 border가 안 물려진다", "상속되지 않는 속성이다", "자식에도 적거나 inherit"],
              ["앞에서 준 굵기가 사라졌다", "뒤의 단축 속성이 초기값으로 되돌렸다", "개별 속성을 단축 속성 뒤에 적는다"],
              ["display가 부드럽게 바뀌지 않는다", "애니메이션 방식이 띄엄띄엄이다", "opacity, transform처럼 보간되는 속성으로"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) color와 border 중 상속되는 것은?\n2) 단축 속성에서 빠뜨린 값은 어떻게 되나요?\n3) '적용 대상'이 아닌 요소에 속성을 적으면?\n4) 상속되지 않는 속성을 부모에게서 받으려면?",
      },
    ],
    sources: [
      { label: "MDN — CSS properties reference", href: `${MDN}/Reference/Properties` },
      { label: "MDN — Inheritance", href: `${MDN}/Guides/Cascade/Inheritance` },
      { label: "MDN — Shorthand properties", href: `${MDN}/Guides/Cascade/Shorthand_properties` },
    ],
  },

  {
    id: "css-prop-box",
    name: "박스와 크기 속성",
    tagline: "크기는 어느 겹까지 재고, 여백의 퍼센트는 무엇을 기준으로 하나",
    intro:
      "상자의 크기와 여백을 정하는 속성을 모았습니다. `width`, `height`와 그 위아래 한계, 크기를 어느 겹까지 셀지 정하는 `box-sizing`, 비율을 정하는 `aspect-ratio`가 있습니다. 바깥 여백 `margin`과 안쪽 여백 `padding`은 네 변을 따로 또는 한꺼번에 정합니다. 위, 오른쪽 대신 글의 흐름을 기준으로 하는 논리 속성(`inline-size`, `margin-inline` 등)도 함께 봅니다. 박스 모델의 원리는 3장, 넘침과 내재적 크기는 9장에 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "크기를 정하는 속성, 크기 계산 방식과 비율을 정하는 속성, 여백을 정하는 속성으로 나뉩니다. 모두 상속되지 않습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["width", "상자의 가로 크기", "auto", "안 됨", "3장 · 박스 모델"],
              ["height", "상자의 세로 크기", "auto", "안 됨", "3장 · 박스 모델"],
              ["min-width", "폭의 아래 한계", "auto", "안 됨", "9장 · 오버플로와 크기"],
              ["max-width", "폭의 위 한계", "none", "안 됨", "9장 · 오버플로와 크기"],
              ["min-height", "높이의 아래 한계", "auto", "안 됨", "9장 · 오버플로와 크기"],
              ["max-height", "높이의 위 한계", "none", "안 됨", "9장 · 오버플로와 크기"],
              ["inline-size", "인라인 축(가로쓰기면 가로)의 크기", "auto", "안 됨", ""],
              ["block-size", "블록 축(가로쓰기면 세로)의 크기", "auto", "안 됨", ""],
              ["box-sizing", "width가 어느 겹까지인지", "content-box", "안 됨", "3장 · 박스 모델"],
              ["aspect-ratio", "너비 대 높이의 비율", "auto", "안 됨", ""],
              ["margin", "네 변의 바깥 여백을 한 번에", "0", "안 됨", "3장 · 박스 모델"],
              ["margin-top, -right, -bottom, -left", "한 변의 바깥 여백", "0", "안 됨", "3장 · 박스 모델"],
              ["margin-inline", "인라인 축 양 끝의 바깥 여백", "0", "안 됨", ""],
              ["margin-block", "블록 축 양 끝의 바깥 여백", "0", "안 됨", ""],
              ["padding", "네 변의 안쪽 여백을 한 번에", "0", "안 됨", "3장 · 박스 모델"],
              ["padding-top, -right, -bottom, -left", "한 변의 안쪽 여백", "0", "안 됨", "3장 · 박스 모델"],
              ["padding-inline", "인라인 축 양 끝의 안쪽 여백", "0", "안 됨", ""],
              ["padding-block", "블록 축 양 끝의 안쪽 여백", "0", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "width",
        body: "상자의 가로 크기를 정합니다. 기본으로 콘텐츠 영역의 폭입니다. `box-sizing: border-box`이면 테두리까지의 폭이 됩니다.\n초기값 `auto`인 블록 상자는 포함 블록의 남은 폭을 채웁니다. 퍼센트는 포함 블록의 폭을 기준으로 합니다. `min-width`보다 작으면 `min-width`가, `max-width`보다 크면 `max-width`가 이깁니다. MDN은 화면을 확대해도 폭을 정한 상자가 글을 자르거나 가리지 않는지 확인하라고 적습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "대체되지 않은 인라인 요소, 표의 행과 행 묶음을 뺀 모든 요소", "안 됨", "길이, %, calc()로 보간"]],
          },
          {
            caption: "width의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<length>", "고정 길이로 정합니다(px, em, rem 등)"],
              ["<percentage>", "포함 블록 폭에 대한 비율입니다"],
              ["auto", "브라우저가 계산합니다. 블록은 남은 폭을 채웁니다"],
              ["min-content", "내용이 허락하는 가장 좁은 폭입니다"],
              ["max-content", "줄을 바꾸지 않을 때 내용의 폭입니다"],
              ["fit-content", "남은 공간을 쓰되 max-content를 넘지 않습니다"],
              ["fit-content(<length-percentage>)", "남은 공간 자리에 인수를 넣어 같은 공식으로 계산합니다"],
              ["stretch", "마진 상자를 포함 블록 폭에 맞춥니다. 지원 여부를 확인하고 씁니다"],
            ],
          },
        ],
        terms: [
          {
            term: "포함 블록 (containing block)",
            body: "퍼센트 크기와 여백을 잴 때 기준이 되는 상자입니다. 보통 가장 가까운 블록 조상의 콘텐츠 영역이고, position에 따라 바뀝니다(8장). 액자에 넣을 그림을 잴 때 액자 바깥이 아니라 안쪽 틀을 재는 것과 같습니다.",
          },
          {
            term: "내재적 크기 (intrinsic size)",
            body: "바깥에서 정하지 않아도 내용이 스스로 가진 크기입니다. 가장 긴 낱말의 폭인 min-content, 한 줄로 늘어놓은 폭인 max-content가 대표입니다. 옷 치수가 아니라 몸 치수에 해당합니다.",
          },
        ],
      },
      {
        label: "height",
        body: "상자의 세로 크기를 정합니다. 값은 `width`와 같고 축만 세로입니다. 기본 `auto`이면 내용에 맞춰 늘고 줄어듭니다.\n퍼센트는 포함 블록의 높이를 기준으로 합니다. 포함 블록의 높이가 내용에 따라 정해지면(auto) 퍼센트 높이는 `auto`로 계산됩니다. 절대 위치 요소는 예외입니다. 그래서 부모 높이를 정하지 않고 `height: 100%`를 주면 아무 일도 일어나지 않습니다. 내용이 늘 수 있는 곳에는 고정 `height`보다 `min-height`가 안전합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "대체되지 않은 인라인 요소, 표의 열과 열 묶음을 뺀 모든 요소", "안 됨", "길이, %, calc()로 보간"]],
          },
          {
            caption: "height의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "내용 높이에 맞춥니다"],
              ["<percentage>", "포함 블록 높이에 대한 비율입니다. 그 높이가 auto면 auto처럼 됩니다"],
              ["<length>, min-content, max-content, fit-content, stretch", "width와 같은 뜻이고 축만 세로입니다"],
            ],
          },
        ],
      },
      {
        label: "min-width",
        body: "폭이 이 값보다 작아지지 않게 막습니다. `width`나 `max-width`보다 크면 이 값이 폭이 됩니다. 셋이 부딪치면 `min-width`가 가장 셉니다.\n초기값 `auto`는 블록 상자에서 0입니다. 플렉스 아이템과 그리드 아이템에서는 내용 기준의 자동 최소 크기(대개 min-content)가 됩니다. 그래서 긴 낱말이 든 플렉스 아이템이 줄지 않고 넘치면 `min-width: 0`으로 풉니다(6장).",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "width와 같음", "안 됨", "길이, %, calc()로 보간"]],
          },
          {
            caption: "min-width의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "블록은 0, 플렉스와 그리드 아이템은 내용 기준의 자동 최소"],
              ["<length>", "고정 하한입니다"],
              ["<percentage>", "포함 블록 폭에 대한 비율입니다"],
              ["min-content, max-content, fit-content", "내용 기준 크기를 하한으로 씁니다"],
            ],
          },
        ],
      },
      {
        label: "max-width",
        body: "폭이 이 값보다 커지지 않게 막습니다. `width`보다 이 값이 우선합니다. 하지만 `min-width`가 더 크면 `min-width`가 이깁니다.\n글 단의 폭을 읽기 좋게 묶거나, 그림이 부모를 넘지 않게 할 때 씁니다. `img { max-width: 100%; height: auto }`가 흔한 짝입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "width와 같음", "안 됨", "길이, %, calc()로 보간"]],
          },
          {
            caption: "max-width의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "한계가 없습니다"],
              ["<length>", "고정 상한입니다"],
              ["<percentage>", "포함 블록 폭에 대한 비율입니다"],
              ["min-content, max-content, fit-content", "내용 기준 크기를 상한으로 씁니다"],
            ],
          },
        ],
        code: ".article { max-width: 40rem; margin-inline: auto; }  /* 읽기 좋은 단 폭, 가운데 */\nimg { max-width: 100%; height: auto; }               /* 부모를 넘지 않는 그림 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: min-width와 max-width",
        body: "폭 버튼을 눌러 작은 창의 폭을 바꿔 보세요. 상자는 `width: 50%`이지만 `min-width: 200px`과 `max-width: 280px` 사이에 묶여 있습니다. 지금 값의 '50%로 계산한 폭'은 창 폭을 따라 계속 바뀝니다. '실제 폭'은 좁은 창에서는 그보다 크고(min-width가 이김), 넓은 창에서는 그보다 작습니다(max-width가 이김). 그 사이에서만 두 값이 같습니다. 버튼을 누를 때마다 기록에 resize 줄이 생깁니다.",
        lab: {
          html: `<style>
  .box {
    width: 50%; min-width: 200px; max-width: 280px;
    box-sizing: border-box; padding: 8px; background: #fc6;
  }
</style>
<div class="box" id="b">width: 50%<br>min-width: 200px<br>max-width: 280px</div>`,
          height: 160,
          widths: [320, 480, 640],
          checks: [
            { label: "body 콘텐츠 폭", expr: "Math.round(document.body.getBoundingClientRect().width)" },
            { label: "50%로 계산한 폭", expr: "Math.round(document.body.getBoundingClientRect().width / 2)" },
            { label: "실제 폭", expr: "Math.round(document.getElementById('b').getBoundingClientRect().width)" },
          ],
          tryIt: "min-width를 300px로 올려 보세요. max-width보다 커져도 min-width가 이깁니다.",
        },
      },
      {
        label: "min-height",
        body: "높이가 이 값보다 작아지지 않게 막습니다. 내용이 많으면 그대로 늘어납니다. 그래서 '적어도 이만큼'을 원할 때 고정 `height` 대신 씁니다. `height`나 `max-height`보다 크면 이 값이 높이가 됩니다. 퍼센트는 포함 블록 높이 기준이라 `height`와 같은 함정이 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "height와 같음", "안 됨", "길이, %, calc()로 보간"]],
          },
          {
            caption: "min-height의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 정합니다. 블록 흐름에서는 0과 같습니다"],
              ["<length>, <percentage>", "고정 하한, 포함 블록 높이에 대한 비율입니다"],
              ["min-content, max-content, fit-content", "내용 기준 크기를 하한으로 씁니다"],
            ],
          },
        ],
      },
      {
        label: "max-height",
        body: "높이가 이 값보다 커지지 않게 막습니다. 내용이 더 많으면 상자 밖으로 넘칩니다. 넘친 것을 감추거나 스크롤하려면 `overflow`를 함께 줍니다(9장). `min-height`가 더 크면 `min-height`가 이깁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "height와 같음", "안 됨", "길이, %, calc()로 보간"]],
          },
          {
            caption: "max-height의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "한계가 없습니다"],
              ["<length>, <percentage>", "고정 상한, 포함 블록 높이에 대한 비율입니다"],
              ["min-content, max-content, fit-content", "내용 기준 크기를 상한으로 씁니다"],
            ],
          },
        ],
      },
      {
        label: "inline-size",
        body: "인라인 축의 크기를 정하는 논리 속성입니다. 인라인 축은 글자가 한 줄에 놓이는 방향입니다. 가로쓰기(`writing-mode: horizontal-tb`)에서는 `width`와 같고, 세로쓰기에서는 `height`와 같습니다. 값은 `width`와 같고, 짝으로 `min-inline-size`, `max-inline-size`도 있습니다.\n논리 속성은 쓰기 모드가 바뀌어도 '글 방향의 크기'라는 뜻을 지킵니다. 여러 언어와 세로쓰기를 함께 다루는 화면에서 쓸모가 있습니다. 지원은 Chrome 57, Safari 12.1, Firefox 41부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "width, height와 같음", "안 됨", "길이, %, calc()로 보간"]],
          },
        ],
        terms: [
          {
            term: "논리 속성 (logical property)",
            body: "위, 오른쪽 같은 화면 방향 대신 글의 흐름을 기준으로 변과 크기를 부르는 속성입니다. writing-mode와 direction에 따라 실제 변이 정해집니다. '오른쪽 쪽' 대신 '다음 쪽'이라고 하면 책을 어느 방향으로 넘기든 맞는 말이 되는 것과 같습니다.",
          },
          {
            term: "인라인 축과 블록 축",
            body: "인라인 축은 글자가 한 줄에 놓이는 방향, 블록 축은 줄이 쌓이는 방향입니다. 가로쓰기에서는 인라인 축이 가로, 블록 축이 세로입니다. 공책에 글씨를 써 나가는 방향과 다음 줄로 내려가는 방향입니다.",
          },
        ],
      },
      {
        label: "block-size",
        body: "블록 축의 크기를 정하는 논리 속성입니다. 블록 축은 줄이 쌓이는 방향입니다. 가로쓰기에서는 `height`, 세로쓰기에서는 `width`와 같습니다. 값과 지원 버전은 `inline-size`와 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "width, height와 같음", "안 됨", "길이, %, calc()로 보간"]],
          },
        ],
      },
      {
        label: "box-sizing",
        body: "`width`와 `height`가 어느 겹까지를 재는지 정합니다. 초기값 `content-box`는 콘텐츠만 잽니다. 그래서 패딩과 테두리가 그 바깥에 더해집니다. `border-box`는 테두리까지 잽니다. 패딩과 테두리가 안쪽을 깎고, 마진은 어느 쪽에도 들지 않습니다.\n`border-box`여도 콘텐츠 영역은 0보다 작아지지 않습니다. 패딩과 테두리의 합이 `width`보다 크면 상자가 그만큼 커집니다. 많은 리셋이 모든 요소에 `border-box`를 줍니다(3장).",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["content-box", "width나 height를 받는 모든 요소", "안 됨", "불연속(중간값 없음)"]],
          },
          {
            caption: "box-sizing의 값",
            head: ["값", "하는 일"],
            rows: [
              ["content-box", "width는 콘텐츠 폭입니다. 패딩, 테두리는 바깥에 더합니다"],
              ["border-box", "width는 테두리까지의 폭입니다. 패딩, 테두리가 안쪽을 깎습니다"],
            ],
          },
        ],
        code: "*, *::before, *::after { box-sizing: border-box; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: content-box와 border-box",
        body: "두 상자 모두 `width: 200px; padding: 10px; border: 5px solid`입니다. 아래 상자만 `border-box`입니다. 지금 값의 '렌더 폭'은 `getBoundingClientRect()`로 잰 테두리 바깥까지의 폭입니다. content-box 상자가 패딩과 테두리만큼 더 넓게 나옵니다. 그런데 계산값 `width`는 두 상자가 같습니다. 같은 `width` 값이 어느 겹에 적용되는지만 다르기 때문입니다.",
        lab: {
          html: `<style>
  .box {
    width: 200px; padding: 10px; border: 5px solid #36c;
    background: #eef; margin-bottom: 8px;
  }
  .bb { box-sizing: border-box; }
</style>
<div class="box" id="cb">content-box</div>
<div class="box bb" id="bb">border-box</div>`,
          height: 150,
          checks: [
            { label: "content-box의 렌더 폭", expr: "Math.round(document.getElementById('cb').getBoundingClientRect().width)" },
            { label: "border-box의 렌더 폭", expr: "Math.round(document.getElementById('bb').getBoundingClientRect().width)" },
            { label: "content-box의 계산값 width", expr: "getComputedStyle(document.getElementById('cb')).width" },
            { label: "border-box의 계산값 width", expr: "getComputedStyle(document.getElementById('bb')).width" },
          ],
          tryIt: "padding을 120px로 올려 보세요. border-box 상자도 200px 안에 다 담지 못해 넓어집니다.",
        },
      },
      {
        label: "aspect-ratio",
        body: "상자의 너비 대 높이 비율을 정합니다. `16 / 9`처럼 적고, `/`와 뒤 숫자를 빼면 높이를 1로 봅니다. 너비와 높이 중 적어도 하나가 자동(auto)이어야 효과가 있습니다. 둘 다 정하면 비율은 무시됩니다.\n`img`처럼 원래 비율이 있는 대체 요소는 `auto`이면 그 비율을 씁니다. `auto 4 / 3`처럼 함께 적으면 그림이 오기 전에는 4 / 3을, 읽힌 뒤에는 그림의 비율을 씁니다. 그래서 그림이 늦게 와도 자리가 미리 잡힙니다. 지원은 Chrome 88, Safari 15, Firefox 89부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "인라인 상자, 루비와 표의 내부 상자를 뺀 모든 요소", "안 됨", "계산값 유형대로"]],
          },
          {
            caption: "aspect-ratio의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "대체 요소는 원래 비율, 나머지는 비율 없음"],
              ["<ratio>", "너비 / 높이 비율입니다. box-sizing이 정한 상자로 계산합니다"],
              ["auto && <ratio>", "원래 비율이 있는 대체 요소면 그 비율, 아니면 적은 비율"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: aspect-ratio와 자동 높이",
        body: "폭 버튼으로 창 폭을 바꿔 보세요. 위 상자는 `width: 40%; aspect-ratio: 16 / 9`이고 높이를 정하지 않았습니다. 폭이 바뀌면 높이가 따라 바뀌고, 지금 값의 '폭 ÷ 높이'는 16 ÷ 9 근처에 머뭅니다. 아래 상자는 `height`를 직접 줘서 두 크기가 모두 정해졌습니다. 그래서 비율이 무시되고 높이가 그대로입니다.",
        lab: {
          html: `<style>
  .r { width: 40%; aspect-ratio: 16 / 9; background: #9cf; margin-bottom: 8px; }
  .fixed { height: 40px; }
</style>
<div class="r" id="a">aspect-ratio만</div>
<div class="r fixed" id="b">height도 지정</div>`,
          height: 240,
          widths: [320, 480, 640],
          checks: [
            { label: "위 상자 폭", expr: "Math.round(document.getElementById('a').getBoundingClientRect().width)" },
            { label: "위 상자 높이", expr: "Math.round(document.getElementById('a').getBoundingClientRect().height)" },
            { label: "위 상자 폭 ÷ 높이", expr: "(r => (r.width / r.height).toFixed(2))(document.getElementById('a').getBoundingClientRect())" },
            { label: "아래 상자 높이", expr: "Math.round(document.getElementById('b').getBoundingClientRect().height)" },
          ],
          tryIt: "위 상자의 aspect-ratio를 1로 바꾸면 정사각형이 됩니다.",
        },
      },
      {
        label: "margin",
        body: "네 변의 바깥 여백을 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 `margin-top`, `margin-right`, `margin-bottom`, `margin-left`입니다. 값은 1~4개이고 위, 오른쪽, 아래, 왼쪽(시계 방향) 순으로 채웁니다. 빠진 변은 마주 보는 변의 값을 씁니다.\n음수도 됩니다. 음수 마진은 이웃 쪽으로 끌어당깁니다. 폭을 정한 블록에 `margin: 0 auto`를 주면 가로 가운데에 놓입니다. 세로 마진은 이웃과 합쳐질 수 있습니다(마진 병합, 3장).",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0 (네 변 모두)", "표의 내부 상자(셀, 행 등)를 뺀 모든 요소", "안 됨", "길이로 보간"]],
          },
          {
            caption: "margin의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<length>", "고정 길이입니다. 음수도 됩니다"],
              ["<percentage>", "포함 블록의 인라인 크기(가로쓰기면 폭)에 대한 비율입니다"],
              ["auto", "남는 공간을 나눠 가집니다. 좌우가 둘 다 auto면 가운데"],
            ],
          },
        ],
        code: "margin: 8px;              /* 네 변 모두 */\nmargin: 8px 16px;         /* 위아래 | 좌우 */\nmargin: 8px 16px 24px;    /* 위 | 좌우 | 아래 */\nmargin: 8px 16px 24px 0;  /* 위 | 오른쪽 | 아래 | 왼쪽 */\nmargin: 0 auto;           /* 폭이 정해진 블록을 가로 가운데로 */",
        codeLang: "css",
        terms: [
          {
            term: "단축 속성 (shorthand property)",
            body: "여러 속성을 한 선언으로 정하는 속성입니다. 적지 않은 조각은 초기값으로 되돌아가서, 앞서 따로 정한 값이 지워질 수 있습니다. 세트 메뉴를 시키면 따로 말하지 않은 구성은 기본으로 나오는 것과 같습니다.",
          },
        ],
      },
      {
        label: "margin-top, -right, -bottom, -left",
        body: "한 변의 바깥 여백만 정합니다. 단축 속성 `margin`의 네 조각입니다. 퍼센트는 위아래 마진도 포함 블록의 폭(인라인 크기)을 기준으로 합니다.\n`span` 같은 대체되지 않은 인라인 요소에는 위아래 마진이 먹지 않습니다. 좌우 마진은 먹습니다. 블록 흐름에서 위아래 `auto`는 0으로 계산됩니다. 그래서 `margin: auto`로는 세로 가운데를 만들 수 없습니다. 플렉스나 그리드 아이템에서는 위아래 `auto`도 남는 공간을 나눕니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "표의 내부 상자를 뺀 모든 요소", "안 됨", "길이로 보간"]],
          },
          {
            caption: "각 변의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<length>", "고정 길이입니다. 음수도 됩니다"],
              ["<percentage>", "포함 블록의 인라인 크기에 대한 비율입니다"],
              ["auto", "좌우는 남는 폭을 나눕니다. 블록 흐름의 위아래는 0입니다"],
            ],
          },
        ],
      },
      {
        label: "margin-inline",
        body: "인라인 축 양 끝의 바깥 여백을 정하는 논리 속성입니다. 단축 속성입니다. 풀어 쓰면 `margin-inline-start`, `margin-inline-end`입니다. 값이 하나면 양 끝에 같이, 둘이면 시작과 끝 순서로 들어갑니다.\n가로쓰기에서 왼쪽에서 오른쪽(ltr)으로 쓰면 시작은 왼쪽, 끝은 오른쪽입니다. `direction: rtl`이면 시작이 오른쪽이 되고, 세로쓰기에서는 위와 아래가 됩니다. `margin-inline: auto`는 언어 방향과 상관없는 가로 가운데 정렬입니다. 지원은 Chrome 87, Safari 14.1, Firefox 66부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "margin과 같음", "안 됨", "길이로 보간"]],
          },
        ],
        code: ".card { margin-inline: auto; }    /* 가로 가운데 */\n.icon { margin-inline: 0 8px; }   /* 시작 0, 끝 8px */",
        codeLang: "css",
      },
      {
        label: "margin-block",
        body: "블록 축 양 끝의 바깥 여백을 정하는 논리 속성입니다. 단축 속성입니다. 풀어 쓰면 `margin-block-start`, `margin-block-end`입니다. 가로쓰기에서는 위와 아래입니다. 세로쓰기에서는 `vertical-rl`이면 오른쪽과 왼쪽, `vertical-lr`이면 왼쪽과 오른쪽이 됩니다. 값 규칙과 지원 버전은 `margin-inline`과 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "margin과 같음", "안 됨", "길이로 보간"]],
          },
        ],
        code: "p { margin-block: 0 1em; }   /* 가로쓰기: 위 0, 아래 1em */",
        codeLang: "css",
      },
      {
        label: "padding",
        body: "네 변의 안쪽 여백을 한 번에 정합니다. 안쪽 여백은 콘텐츠와 테두리 사이의 공간입니다. 단축 속성입니다. 풀어 쓰면 `padding-top`, `padding-right`, `padding-bottom`, `padding-left`입니다. 값을 채우는 순서는 `margin`과 같습니다.\n마진과 달리 음수는 안 되고 `auto`도 없습니다. 패딩 영역에는 배경이 깔리고 클릭도 닿습니다. 그래서 눌리는 영역을 넓히거나 글과 테두리 사이를 띄울 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0 (네 변 모두)", "표의 행, 행 묶음, 열, 열 묶음을 뺀 모든 요소", "안 됨", "길이로 보간"]],
          },
        ],
        code: "padding: 12px;               /* 네 변 모두 */\npadding: 8px 16px;           /* 위아래 | 좌우 */\npadding: 8px 16px 12px;      /* 위 | 좌우 | 아래 */\npadding: 8px 16px 12px 4px;  /* 위 | 오른쪽 | 아래 | 왼쪽 */",
        codeLang: "css",
      },
      {
        label: "padding-top, -right, -bottom, -left",
        body: "한 변의 안쪽 여백만 정합니다. 퍼센트는 위아래 패딩도 포함 블록의 폭(인라인 크기)을 기준으로 합니다. 높이가 아닙니다. 이 성질로 `padding-top: 56.25%`를 줘서 16:9 상자를 만드는 옛 요령이 있었습니다. 지금은 `aspect-ratio`가 그 일을 합니다.\n인라인 요소의 위아래 패딩은 그려지지만 줄 높이를 밀어내지 않아 윗줄과 겹칠 수 있습니다(3장).",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "표의 행, 행 묶음, 열, 열 묶음을 뺀 모든 요소", "안 됨", "길이로 보간"]],
          },
          {
            caption: "각 변의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<length>", "고정 길이입니다. 음수는 안 됩니다"],
              ["<percentage>", "포함 블록의 인라인 크기에 대한 비율입니다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 퍼센트 패딩은 부모 폭을 따른다",
        body: "바깥 `.wrap`은 높이를 120px로 고정했고 폭은 창을 따릅니다. 안쪽 `.box`는 `padding-top: 10%; padding-left: 10%`입니다. 폭 버튼을 눌러 보세요. 부모 높이는 그대로인데 두 패딩이 함께 바뀝니다. 위 패딩도 부모의 높이가 아니라 폭을 기준으로 하기 때문입니다. 그래서 두 값은 늘 같습니다.",
        lab: {
          html: `<style>
  .wrap { height: 120px; background: #eef; }
  .box { padding-top: 10%; padding-left: 10%; background: #fc6; }
</style>
<div class="wrap"><div class="box" id="b">퍼센트 패딩</div></div>`,
          height: 180,
          widths: [320, 480, 640],
          checks: [
            { label: "부모 폭", expr: "Math.round(document.querySelector('.wrap').getBoundingClientRect().width)" },
            { label: "부모 높이", expr: "Math.round(document.querySelector('.wrap').getBoundingClientRect().height)" },
            { label: "padding-top", expr: "Math.round(parseFloat(getComputedStyle(document.getElementById('b')).paddingTop))" },
            { label: "padding-left", expr: "Math.round(parseFloat(getComputedStyle(document.getElementById('b')).paddingLeft))" },
          ],
          tryIt: ".wrap의 height를 60px로 줄여 보세요. padding-top은 그대로입니다.",
        },
      },
      {
        label: "padding-inline",
        body: "인라인 축 양 끝의 안쪽 여백을 정하는 논리 속성입니다. 단축 속성입니다. 풀어 쓰면 `padding-inline-start`, `padding-inline-end`입니다. 값이 하나면 양 끝에 같이, 둘이면 시작과 끝 순서입니다. 가로쓰기 ltr에서는 왼쪽과 오른쪽입니다. 버튼이나 입력 칸의 좌우 여백을 언어 방향과 상관없이 맞출 때 씁니다. 지원은 Chrome 87, Safari 14.1, Firefox 66부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "padding과 같음", "안 됨", "길이로 보간"]],
          },
        ],
        code: "button { padding-inline: 1em; padding-block: 0.5em; }",
        codeLang: "css",
      },
      {
        label: "padding-block",
        body: "블록 축 양 끝의 안쪽 여백을 정하는 논리 속성입니다. 단축 속성입니다. 풀어 쓰면 `padding-block-start`, `padding-block-end`입니다. 가로쓰기에서는 위와 아래입니다. 값 규칙과 지원 버전은 `padding-inline`과 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "padding과 같음", "안 됨", "길이로 보간"]],
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "크기 속성의 문제는 대개 '무엇을 기준으로 재나'를 잘못 안 데서 납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["width: 100%에 padding을 줬다", "상자가 부모보다 넓어진다", "box-sizing: border-box"],
              ["부모 높이 없이 height: 100%", "높이가 auto처럼 내용만큼이다", "부모 높이를 정하거나 min-height, flex, grid로"],
              ["margin: auto로 세로 가운데를 노렸다", "블록 흐름의 위아래 auto는 0이라 위에 붙는다", "부모를 flex나 grid로 하고 margin: auto"],
              ["플렉스 아이템 안에 긴 URL", "아이템이 줄지 않고 넘친다", "아이템에 min-width: 0"],
              ["padding-top: 10%를 높이 기준으로 알았다", "부모 폭이 바뀔 때 함께 바뀐다", "높이 기준이 필요하면 다른 단위나 aspect-ratio"],
              ["aspect-ratio 상자에 글이 많다", "높이가 늘어 비율이 깨진다", "overflow: auto 또는 min-height: 0"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `width: 200px; padding: 10px; border: 5px solid`인 상자의 렌더 폭은 content-box와 border-box에서 어떻게 다른가요?\n2) `padding-top: 10%`의 10%는 무엇의 10%인가요?\n3) `width`, `min-width`, `max-width`가 부딪치면 어느 것이 이기나요?\n4) 가로쓰기 ltr에서 `margin-inline: 0 8px`은 어느 변에 8px을 주나요?",
      },
    ],
    sources: [
      { label: "MDN — width", href: `${MDN}/Reference/Properties/width` },
      { label: "MDN — box-sizing", href: `${MDN}/Reference/Properties/box-sizing` },
      { label: "MDN — aspect-ratio", href: `${MDN}/Reference/Properties/aspect-ratio` },
      { label: "MDN — margin", href: `${MDN}/Reference/Properties/margin` },
      { label: "MDN — padding", href: `${MDN}/Reference/Properties/padding` },
      { label: "MDN — inline-size", href: `${MDN}/Reference/Properties/inline-size` },
    ],
  },

  {
    id: "css-prop-border",
    name: "테두리, 윤곽, 그림자 속성",
    tagline: "자리를 차지하는 선과 차지하지 않는 선",
    intro:
      "테두리(`border`), 윤곽선(`outline`), 그림자(`box-shadow`)는 모두 상자 둘레에 선이나 면을 그립니다. 차이는 자리를 차지하느냐입니다. 테두리는 박스 모델의 한 겹이라 상자 크기에 들어갑니다. 윤곽선과 그림자는 자리를 차지하지 않고 위에 덧그려집니다. 모서리를 둥글게 하는 `border-radius`와 포커스 표시에 쓰는 `outline-offset`도 함께 봅니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "테두리는 상자 크기에 들어가고, 윤곽선과 그림자는 들어가지 않습니다. 모두 상속되지 않습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["border", "네 변 테두리의 굵기, 모양, 색을 한 번에", "medium none currentColor", "안 됨", "3장 · 박스 모델"],
              ["border-width", "테두리 굵기", "medium", "안 됨", "3장 · 박스 모델"],
              ["border-style", "테두리 선 모양", "none", "안 됨", ""],
              ["border-color", "테두리 색", "currentColor", "안 됨", ""],
              ["border-top", "위 테두리 하나의 굵기, 모양, 색", "medium none currentColor", "안 됨", ""],
              ["border-radius", "모서리를 둥글게", "0", "안 됨", ""],
              ["outline", "윤곽선의 굵기, 모양, 색을 한 번에", "medium none auto", "안 됨", ""],
              ["outline-width", "윤곽선 굵기", "medium", "안 됨", ""],
              ["outline-style", "윤곽선 모양", "none", "안 됨", ""],
              ["outline-color", "윤곽선 색", "auto", "안 됨", ""],
              ["outline-offset", "윤곽선과 테두리 사이 간격", "0", "안 됨", ""],
              ["box-shadow", "상자 그림자", "none", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "border",
        body: "네 변 테두리의 굵기, 모양, 색을 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 `border-width`, `border-style`, `border-color`입니다. 세 값은 순서와 상관없이 1~3개를 적고, 빠진 값은 초기값이 됩니다.\n모양의 초기값이 `none`이라 모양을 빼면 테두리가 보이지 않습니다. `border`는 `border-image`도 초기값 `none`으로 되돌립니다. 네 변을 다르게 하려면 풀어 쓴 속성이나 `border-top` 같은 한 변 속성을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["medium none currentColor", "모든 요소", "안 됨", "각 하위 속성대로"]],
          },
        ],
        code: "border: solid;            /* 모양만 */\nborder: 2px dashed;       /* 굵기 | 모양 */\nborder: 1px solid #ccc;   /* 굵기 | 모양 | 색 */",
        codeLang: "css",
      },
      {
        label: "border-width",
        body: "테두리 굵기를 정합니다. 단축 속성입니다. 풀어 쓰면 `border-top-width`, `border-right-width`, `border-bottom-width`, `border-left-width`입니다. 값 1~4개를 `margin`과 같은 순서(위, 오른쪽, 아래, 왼쪽)로 채웁니다.\n퍼센트는 쓸 수 없습니다. 같은 변의 `border-style`이 `none`이나 `hidden`이면 굵기를 줘도 0으로 처리됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["medium", "모든 요소", "안 됨", "길이로 보간"]],
          },
          {
            caption: "border-width의 값",
            head: ["값", "하는 일"],
            rows: [
              ["thin", "얇은 선"],
              ["medium", "중간 굵기(초기값)"],
              ["thick", "굵은 선"],
              ["<length>", "음수가 아닌 길이"],
            ],
          },
        ],
        code: "border-width: 1px 2px;   /* 위아래 | 좌우 */",
        codeLang: "css",
      },
      {
        label: "border-style",
        body: "테두리 선 모양을 정합니다. 단축 속성입니다. 풀어 쓰면 `border-top-style`, `border-right-style`, `border-bottom-style`, `border-left-style`입니다. 값 1~4개를 같은 순서로 채웁니다.\n초기값이 `none`이라 테두리를 보이게 하려면 이 값이 꼭 있어야 합니다. `dotted`, `dashed`의 점과 선 간격은 표준이 정하지 않아 브라우저마다 조금 다릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "불연속(중간값 없음)"]],
          },
          {
            caption: "border-style의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "테두리 없음. 굵기는 0으로 처리"],
              ["hidden", "none과 같음. 표의 테두리 병합에서는 가장 우선"],
              ["dotted", "둥근 점"],
              ["dashed", "짧은 선분"],
              ["solid", "한 줄 실선"],
              ["double", "두 줄. 두 선과 사이가 굵기를 나눠 가짐"],
              ["groove", "파인 듯한 선(ridge의 반대)"],
              ["ridge", "솟은 듯한 선"],
              ["inset", "상자가 박힌 듯 보임(outset의 반대)"],
              ["outset", "상자가 튀어나온 듯 보임"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 모양이 없으면 굵기도 0",
        body: "위 상자는 `border: 6px`만 적었고 아래 상자는 `border: 6px solid`입니다. 지금 값을 보면 위 상자의 `border-top-style`은 `none`이고, `border-top-width`도 6px이 아니라 0으로 나옵니다. 모양이 없는 테두리는 굵기도 없는 것으로 처리되기 때문입니다. 그래서 두 상자의 높이도 다릅니다. 위 상자의 `border-top-color`에는 글자 색이 들어 있습니다. 색을 빼면 `currentColor`가 되기 때문입니다.",
        lab: {
          html: `<style>
  .box { padding: 8px; margin-bottom: 8px; background: #eef; }
  #a { border: 6px; }
  #b { border: 6px solid; }
</style>
<div class="box" id="a">border: 6px</div>
<div class="box" id="b">border: 6px solid</div>`,
          height: 160,
          checks: [
            { label: "위 상자의 border-top-style", expr: "getComputedStyle(document.getElementById('a')).borderTopStyle" },
            { label: "위 상자의 border-top-width", expr: "getComputedStyle(document.getElementById('a')).borderTopWidth" },
            { label: "아래 상자의 border-top-width", expr: "getComputedStyle(document.getElementById('b')).borderTopWidth" },
            { label: "위 상자의 border-top-color", expr: "getComputedStyle(document.getElementById('a')).borderTopColor" },
            { label: "두 상자의 offsetHeight", expr: "['a', 'b'].map(id => document.getElementById(id).offsetHeight).join(' / ')" },
          ],
          tryIt: "위 상자를 border: 6px dashed로 바꿔 보세요. 굵기가 살아나고 높이도 같아집니다.",
        },
      },
      {
        label: "border-color",
        body: "테두리 색을 정합니다. 단축 속성입니다. 풀어 쓰면 `border-top-color`, `border-right-color`, `border-bottom-color`, `border-left-color`입니다. 값 1~4개를 같은 순서로 채웁니다.\n초기값은 `currentColor`라 글자 색을 따라갑니다. 그래서 `color`만 바꿔도 테두리 색이 함께 바뀝니다. 투명한 색을 주면 그 아래 배경이 비칩니다. 배경이 기본으로 테두리 밑까지 깔리기 때문입니다(`background-clip`).",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["currentColor", "모든 요소", "안 됨", "색으로 보간"]],
          },
        ],
        code: "border-color: red green;   /* 위아래 | 좌우 */",
        codeLang: "css",
        terms: [
          {
            term: "currentColor",
            body: "그 요소의 `color` 값, 곧 글자 색을 그대로 가리키는 색 키워드입니다. 테두리와 그림자의 색을 빼면 이 값이 들어갑니다. 양복을 맞출 때 '바지는 윗옷과 같은 색으로'라고만 주문하는 것과 같습니다.",
          },
        ],
      },
      {
        label: "border-top",
        body: "위 테두리 하나의 굵기, 모양, 색을 정합니다. 단축 속성입니다. 풀어 쓰면 `border-top-width`, `border-top-style`, `border-top-color`입니다. 같은 꼴로 `border-right`, `border-bottom`, `border-left`가 있고, 논리판으로 `border-block-start` 등이 있습니다.\n단축 속성이라 적지 않은 조각은 초기값으로 돌아갑니다. 앞에서 `border-top-style: dotted`를 주고 뒤에 `border-top: 2px red`를 쓰면 모양이 `none`이 되어 선이 사라집니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["medium none currentColor", "모든 요소", "안 됨", "각 하위 속성대로"]],
          },
        ],
        code: "h2 { border-bottom: 2px solid currentColor; }\n\n/* 아래 두 줄은 같습니다. 앞의 dotted는 덮입니다 */\n.a { border-top-style: dotted; border-top: 2px red; }\n.a { border-top-style: dotted; border-top: 2px none red; }",
        codeLang: "css",
      },
      {
        label: "border-radius",
        body: "테두리 바깥 모서리를 둥글게 합니다. 단축 속성입니다. 풀어 쓰면 `border-top-left-radius`, `border-top-right-radius`, `border-bottom-right-radius`, `border-bottom-left-radius`입니다. 값 1~4개는 왼쪽 위부터 시계 방향으로 채웁니다.\n`/` 뒤에 값을 더 적으면 그것이 세로 반지름이 됩니다. 앞은 가로, 뒤는 세로라 모서리가 타원으로 굽습니다. 퍼센트는 가로 반지름이 상자 폭, 세로 반지름이 상자 높이를 기준으로 합니다. 그래서 정사각형이 아닌 상자에 `50%`를 주면 원이 아니라 타원이 됩니다.\n\n테두리가 없어도 배경, 그림자, 윤곽선이 같은 모서리를 따릅니다. 반지름의 합이 변 길이보다 크면 브라우저가 모든 반지름을 같은 비율로 줄입니다. 그래서 `999px` 같은 큰 값으로 알약 모양을 만듭니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "모든 요소(테두리를 병합한 표는 빠질 수 있음)", "안 됨", "길이, %로 보간"]],
          },
          {
            caption: "border-radius의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<length>", "반지름 길이입니다. 음수는 안 됩니다"],
              ["<percentage>", "가로는 상자 폭, 세로는 상자 높이에 대한 비율입니다"],
              ["값 / 값", "앞은 가로 반지름, 뒤는 세로 반지름입니다"],
            ],
          },
        ],
        code: "border-radius: 8px;            /* 네 모서리 */\nborder-radius: 8px 0;          /* 왼쪽 위와 오른쪽 아래 | 나머지 둘 */\nborder-radius: 8px 4px 0 2px;  /* 왼쪽 위부터 시계 방향 */\nborder-radius: 40px / 20px;    /* 가로 반지름 / 세로 반지름 */\nborder-radius: 999px;          /* 알약 모양 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 퍼센트 반지름과 / 문법",
        body: "두 상자 모두 `width: 200px; height: 100px`입니다. 위 상자는 `border-radius: 50%`, 아래 상자는 `40px / 20px`입니다. 지금 값을 보면 위 상자의 계산값은 퍼센트 그대로 남아 있습니다. 퍼센트는 그릴 때 상자 크기에 맞춰 풀리기 때문입니다. 가로는 폭의 절반, 세로는 높이의 절반이라 타원이 됩니다. 아래 상자의 계산값에는 가로와 세로 반지름 두 값이 나란히 나옵니다.",
        lab: {
          html: `<style>
  .r { width: 200px; height: 100px; margin-bottom: 10px; background: #9cf; }
  #pct { border-radius: 50%; }
  #slash { border-radius: 40px / 20px; }
</style>
<div class="r" id="pct">50%</div>
<div class="r" id="slash">40px / 20px</div>`,
          height: 260,
          checks: [
            { label: "위 상자의 border-top-left-radius", expr: "getComputedStyle(document.getElementById('pct')).borderTopLeftRadius" },
            { label: "아래 상자의 border-top-left-radius", expr: "getComputedStyle(document.getElementById('slash')).borderTopLeftRadius" },
            { label: "위 상자의 폭 × 높이", expr: "(r => Math.round(r.width) + ' × ' + Math.round(r.height))(document.getElementById('pct').getBoundingClientRect())" },
          ],
          tryIt: "위 상자의 height를 200px로 바꿔 보세요. 정사각형이 되어 원이 됩니다.",
        },
      },
      {
        label: "outline",
        body: "윤곽선의 굵기, 모양, 색을 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 `outline-width`, `outline-style`, `outline-color`입니다. 순서와 상관없이 1~3개를 적습니다.\n윤곽선은 테두리 바깥에 그려지지만 자리를 차지하지 않습니다. 그래서 켜고 꺼도 레이아웃이 움직이지 않고, 이웃 요소 위에 겹칠 수 있습니다. 브라우저가 포커스 표시에 윤곽선을 쓰는 이유입니다.\n\n`outline: none`이나 `0`은 브라우저의 기본 포커스 표시를 지웁니다. 키보드로 다니는 사람은 자기가 어디 있는지 알 수 없게 됩니다. 지운다면 `:focus-visible`에 다른 뚜렷한 표시를 꼭 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["medium none auto", "모든 요소", "안 됨", "각 하위 속성대로"]],
          },
        ],
        code: ":focus-visible { outline: 2px solid #36c; outline-offset: 2px; }",
        codeLang: "css",
        terms: [
          {
            term: "윤곽선 (outline)",
            body: "테두리 바깥에 그리지만 자리를 차지하지 않는 선입니다. 켜고 꺼도 다른 요소가 움직이지 않습니다. 가구를 옮기지 않고 바닥에 테이프로 둘레만 표시하는 것과 같습니다.",
          },
          {
            term: "포커스 표시 (focus indicator)",
            body: "키보드로 지금 어느 요소에 와 있는지 보여 주는 표시입니다. 브라우저는 기본으로 윤곽선을 씁니다. 엘리베이터의 지금 층 불빛처럼, 없으면 어디 있는지 알 수 없습니다.",
          },
        ],
      },
      {
        label: "outline-width",
        body: "윤곽선 굵기를 정합니다. 값은 `border-width`와 같은 `thin`, `medium`, `thick`, 길이입니다. 테두리와 달리 네 변을 따로 정할 수 없습니다. `outline-style`이 `none`이면 보이지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["medium", "모든 요소", "안 됨", "길이로 보간"]],
          },
          {
            caption: "outline-width의 값",
            head: ["값", "하는 일"],
            rows: [
              ["thin, medium, thick", "얇은 선, 중간 굵기(초기값), 굵은 선"],
              ["<length>", "음수가 아닌 길이"],
            ],
          },
        ],
      },
      {
        label: "outline-style",
        body: "윤곽선 모양을 정합니다. 값은 `border-style`과 거의 같지만 `hidden`이 없고 `auto`가 있습니다. `auto`는 브라우저가 정한 모양으로 그리게 합니다. 초기값이 `none`이라 모양을 빼면 윤곽선이 보이지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "계산값 유형대로"]],
          },
          {
            caption: "outline-style의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 정한 모양"],
              ["none", "윤곽선 없음"],
              ["dotted, dashed, solid", "점선, 짧은 선분, 실선"],
              ["double", "두 줄. 두 선과 사이가 굵기를 나눠 가짐"],
              ["groove, ridge", "파인 듯한 선, 솟은 듯한 선"],
              ["inset, outset", "박힌 듯, 튀어나온 듯 보임"],
            ],
          },
        ],
      },
      {
        label: "outline-color",
        body: "윤곽선 색을 정합니다. 초기값은 글자 색(`currentColor`)을 따릅니다. 포커스 표시로 쓸 때는 주변 색과의 대비를 챙깁니다. MDN은 WCAG 기준으로 윤곽선과 맞닿는 색 사이에 적어도 3:1 대비가 필요하다고 적습니다. 맞닿는 색에는 바깥 배경과 요소 자신의 배경이 모두 들어갑니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto(글자 색을 따름)", "모든 요소", "안 됨", "색으로 보간"]],
          },
        ],
      },
      {
        label: "outline-offset",
        body: "윤곽선과 테두리 바깥 사이의 간격을 정합니다. 그 사이는 투명해서 뒤의 배경이 비칩니다. 음수를 주면 윤곽선이 상자 안쪽으로 들어옵니다.\n포커스 표시를 상자에서 살짝 띄우면 눈에 잘 띕니다. 다만 `overflow: hidden`인 조상이나 스크롤 상자 안에서는 바깥으로 나간 윤곽선이 잘릴 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "모든 요소", "안 됨", "길이로 보간"]],
          },
        ],
      },
      {
        label: "직접 해 보기: 자리를 차지하는 선과 아닌 선",
        body: "세 상자는 폭과 패딩이 같고, 둘레에 6px짜리 선을 그립니다. 첫째는 `border`, 둘째는 `outline`과 `outline-offset`, 셋째는 퍼짐 값만 준 `box-shadow`입니다. 지금 값의 `offsetWidth`를 보면 `border` 상자만 넓습니다. 윤곽선과 그림자는 박스 모델에 들지 않고 위에 덧그려지기 때문입니다. 셋째 상자처럼 퍼짐만 준 그림자는 자리를 차지하지 않는 테두리처럼 쓸 수 있습니다.",
        lab: {
          html: `<style>
  .box { width: 140px; padding: 8px; margin: 14px 0; background: #eef; }
  #b1 { border: 6px solid #36c; }
  #b2 { outline: 6px solid #c63; outline-offset: 4px; }
  #b3 { box-shadow: 0 0 0 6px #6a3; }
</style>
<div class="box" id="b1">border</div>
<div class="box" id="b2">outline</div>
<div class="box" id="b3">box-shadow</div>`,
          height: 230,
          checks: [
            { label: "border 상자의 offsetWidth", expr: "document.getElementById('b1').offsetWidth" },
            { label: "outline 상자의 offsetWidth", expr: "document.getElementById('b2').offsetWidth" },
            { label: "box-shadow 상자의 offsetWidth", expr: "document.getElementById('b3').offsetWidth" },
            { label: "outline 상자의 outline-offset", expr: "getComputedStyle(document.getElementById('b2')).outlineOffset" },
          ],
          tryIt: "둘째 상자의 outline-offset을 -10px로 바꿔 보세요. 윤곽선이 상자 안으로 들어옵니다.",
        },
      },
      {
        label: "box-shadow",
        body: "상자 둘레에 그림자를 그립니다. 그림자 하나는 길이 2~4개(가로 오프셋, 세로 오프셋, 흐림, 퍼짐 순)와, 고를 수 있는 `inset`, 색으로 적습니다. 쉼표로 여러 개를 겹칠 수 있고, 먼저 적은 것이 위에 놓입니다.\n흐림은 클수록 가장자리가 넓게 번집니다. 퍼짐은 양수면 그림자를 키우고 음수면 줄입니다. `inset`은 그림자를 상자 안쪽에 그립니다. 안쪽 그림자는 패딩 상자에 잘리고, 배경 위, 내용 아래에 놓입니다. 색을 빼면 글자 색(`currentColor`)을 씁니다.\n\n그림자는 레이아웃에 영향을 주지 않습니다. `border-radius`가 있으면 같은 모서리를 따릅니다. 애니메이션할 때 짝이 되는 그림자의 `inset` 여부가 다르면, 그림자 목록 전체가 중간값 없이 바로 바뀝니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "그림자 목록으로 보간"]],
          },
          {
            caption: "box-shadow의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "그림자 없음"],
              ["<offset-x> <offset-y>", "가로, 세로로 옮긴 거리. 음수면 왼쪽, 위"],
              ["<blur-radius>", "셋째 길이. 흐림 정도. 음수는 안 됨"],
              ["<spread-radius>", "넷째 길이. 양수면 커지고 음수면 작아짐"],
              ["inset", "안쪽 그림자로 바꿈"],
              ["<color>", "그림자 색. 빠지면 글자 색"],
            ],
          },
        ],
        code: "box-shadow: 0 2px 4px rgb(0 0 0 / 0.2);         /* x | y | 흐림 | 색 */\nbox-shadow: 0 0 0 3px #36c;                     /* 퍼짐만: 자리 안 차지하는 테두리 */\nbox-shadow: inset 0 2px 4px rgb(0 0 0 / 0.3);   /* 안쪽 그림자 */\nbox-shadow: 0 1px 2px #0003, 0 8px 16px #0002;  /* 여러 겹, 앞이 위 */",
        codeLang: "css",
        terms: [
          {
            term: "흐림과 퍼짐 (blur, spread)",
            body: "흐림은 그림자 가장자리를 얼마나 번지게 할지, 퍼짐은 그림자 자체를 얼마나 키울지입니다. 흐림이 0이고 퍼짐만 주면 또렷한 띠가 생깁니다. 손전등을 멀리 대면 그림자 끝이 흐려지고, 물체를 키우면 그림자도 커지는 것과 같습니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "테두리 문제는 대개 '모양이 빠졌다', '단축 속성이 덮었다', '자리를 차지한다' 셋 중 하나입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["border: 2px red만 적었다", "모양이 none이라 테두리가 안 보인다", "solid 같은 모양을 함께 적는다"],
              ["border-top-style을 준 뒤 border-top을 썼다", "앞의 모양이 초기값으로 덮인다", "단축 속성을 먼저, 풀어 쓴 속성을 나중에"],
              ["hover에서만 border를 켰다", "굵기만큼 상자가 커져 레이아웃이 흔들린다", "투명한 테두리를 미리 두거나 outline, box-shadow로"],
              ["outline: none으로 포커스 표시를 지웠다", "키보드 사용자가 위치를 잃는다", ":focus-visible에 다른 뚜렷한 표시를 준다"],
              ["정사각형이 아닌 상자에 border-radius: 50%", "원이 아니라 타원이 된다", "aspect-ratio: 1로 정사각형을 만들거나 999px로 알약 모양"],
              ["overflow: hidden 안에서 outline-offset을 키웠다", "바깥으로 나간 윤곽선이 잘린다", "offset을 줄이거나 음수로 안쪽에 그린다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `border: 4px red`가 화면에 보이지 않는 이유는?\n2) `border`와 `outline` 중 상자의 `offsetWidth`를 바꾸는 것은?\n3) 200×100 상자에 `border-radius: 50%`를 주면 어떤 모양이 되나요?\n4) `box-shadow: 0 0 0 3px blue`의 3px은 무엇이고, 어떻게 보이나요?",
      },
    ],
    sources: [
      { label: "MDN — border", href: `${MDN}/Reference/Properties/border` },
      { label: "MDN — border-style", href: `${MDN}/Reference/Properties/border-style` },
      { label: "MDN — border-radius", href: `${MDN}/Reference/Properties/border-radius` },
      { label: "MDN — outline", href: `${MDN}/Reference/Properties/outline` },
      { label: "MDN — outline-offset", href: `${MDN}/Reference/Properties/outline-offset` },
      { label: "MDN — box-shadow", href: `${MDN}/Reference/Properties/box-shadow` },
    ],
  },

  {
    id: "css-prop-background",
    name: "배경 속성",
    tagline: "쉼표로 층을 겹치고, 층마다 크기, 위치, 칠할 영역을 정한다",
    intro:
      "요소 뒤에는 배경색 한 겹과 배경 그림 여러 겹을 깔 수 있습니다. 그림은 쉼표로 나열하고, 먼저 적은 것이 위에 옵니다. 층마다 반복, 위치, 크기, 고정 방식, 기준 상자, 칠할 영역을 따로 정합니다. 단축 속성 `background`는 이 모두를 한 줄에 적지만, 크기는 위치 뒤에 `/`로 붙여야 한다는 규칙이 있습니다. 글자 모양으로 배경을 오리는 `background-clip: text`와 층을 섞는 혼합 모드도 봅니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "배경 그림에 관한 속성은 쉼표로 층마다 값을 받습니다. 배경색만 값이 하나입니다. 모두 상속되지 않습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["background", "배경 속성 전부를 한 번에", "하위 속성마다", "안 됨", ""],
              ["background-color", "맨 아래 배경색", "transparent", "안 됨", ""],
              ["background-image", "배경 그림 층", "none", "안 됨", ""],
              ["background-repeat", "그림 반복 방식", "repeat", "안 됨", ""],
              ["background-position", "그림 시작 위치", "0% 0%", "안 됨", ""],
              ["background-size", "그림 크기", "auto auto", "안 됨", ""],
              ["background-attachment", "스크롤할 때 무엇에 붙을지", "scroll", "안 됨", ""],
              ["background-clip", "배경을 칠할 영역", "border-box", "안 됨", "3장 · 박스 모델"],
              ["background-origin", "위치와 크기를 잴 기준 상자", "padding-box", "안 됨", "3장 · 박스 모델"],
              ["background-blend-mode", "층끼리 섞는 방식", "normal", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "background",
        body: "배경 속성 전부를 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 `background-image`, `background-position`, `background-size`, `background-repeat`, `background-origin`, `background-clip`, `background-attachment`, `background-color`입니다. 적지 않은 조각은 초기값으로 돌아갑니다.\n쉼표로 나눈 묶음 하나가 층 하나입니다. 먼저 적은 층이 맨 위에 그려집니다. 배경색은 마지막 층에만 적을 수 있고, 늘 맨 아래에 깔립니다.\n\n순서 규칙이 하나 있습니다. 크기는 위치 바로 뒤에 `/`로 이어야 합니다(`center / cover`). 크기만 따로 적으면 선언 전체가 틀린 값이 되어 버려집니다. 상자 키워드(`padding-box` 등)를 하나만 적으면 origin과 clip에 함께 들어갑니다. 둘을 적으면 앞이 origin, 뒤가 clip입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["하위 속성마다 초기값", "모든 요소", "안 됨", "각 하위 속성대로"]],
          },
        ],
        code: "background: #eef url(photo.jpg) center / cover no-repeat;\n\n/* 층 둘: 위는 아이콘, 아래는 그라디언트와 배경색 */\nbackground:\n  url(icon.svg) right 8px top 8px / 24px no-repeat,\n  linear-gradient(#fff, #eef) #eef;",
        codeLang: "css",
        terms: [
          {
            term: "배경 층 (background layer)",
            body: "쉼표로 나눠 적은 배경 그림 하나하나입니다. 층마다 반복, 위치, 크기를 따로 받고, 먼저 적은 층이 위에 그려집니다. 투명 필름을 여러 장 겹친 것과 같아서 맨 위 필름부터 보입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 층과 / 규칙",
        body: "위 상자는 층이 둘입니다. 위층은 `center / contain`처럼 크기를 위치 뒤에 붙인 그림이고, 아래층은 그라디언트입니다. 지금 값의 `background-size`와 `background-repeat`에는 층마다 값이 쉼표로 이어져 나옵니다. 아래 상자는 `url(...) contain no-repeat`처럼 크기를 `/` 없이 적었습니다. 선언 전체가 버려져서 `background-image`는 `none`, `background-size`는 초기값입니다.",
        lab: {
          html: `<style>
  .box { height: 90px; margin-bottom: 8px; border: 1px solid #999; }
  #ok {
    background: url(photo-400.svg) center / contain no-repeat,
      linear-gradient(90deg, #fde, #def);
  }
  #bad { background: url(photo-400.svg) contain no-repeat; }
</style>
<div class="box" id="ok">#ok</div>
<div class="box" id="bad">#bad</div>`,
          height: 240,
          checks: [
            { label: "#ok의 background-size", expr: "getComputedStyle(document.getElementById('ok')).backgroundSize" },
            { label: "#ok의 background-repeat", expr: "getComputedStyle(document.getElementById('ok')).backgroundRepeat" },
            { label: "#bad의 background-image", expr: "getComputedStyle(document.getElementById('bad')).backgroundImage" },
            { label: "#bad의 background-size", expr: "getComputedStyle(document.getElementById('bad')).backgroundSize" },
          ],
          tryIt: "#bad의 contain 앞에 center /를 넣어 보세요. 그림이 나타납니다.",
        },
      },
      {
        label: "background-color",
        body: "배경색을 정합니다. 배경 그림들 아래, 맨 밑에 깔립니다. 그림에 투명한 곳이 있으면 그 사이로 보입니다. 기본으로 테두리 바깥 끝까지 칠하고, 칠할 영역은 맨 아래 그림 층의 `background-clip`이 정합니다.\n그림을 깔더라도 비슷한 배경색을 함께 주는 편이 좋습니다. 그림을 못 읽으면 배경색이 대신 보여 글이 읽힙니다. 글자 색과의 대비도 챙깁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["transparent", "모든 요소", "안 됨", "색으로 보간"]],
          },
        ],
      },
      {
        label: "background-image",
        body: "배경 그림 층을 정합니다. `url()` 그림, 그라디언트 같은 `<image>` 값을 쉼표로 나열합니다. 먼저 적은 것이 사용자에게 가장 가까운 위층입니다. 테두리는 그림들 위에, 배경색은 그 아래에 그려집니다.\n그림을 못 읽으면 `none`처럼 처리됩니다. 화면 낭독기는 배경 그림을 알려 주지 않습니다. 뜻이 있는 그림은 `img`와 대체 글로 넣습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "불연속(중간값 없음)"]],
          },
          {
            caption: "background-image의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "그림 없음"],
              ["<image>", "url(), linear-gradient() 같은 그림 값"],
            ],
          },
        ],
        code: "background-image:\n  linear-gradient(rgb(0 0 0 / 0.4), transparent),  /* 위층: 어둡게 덮기 */\n  url(photo.jpg);                                   /* 아래층: 사진 */",
        codeLang: "css",
      },
      {
        label: "background-repeat",
        body: "그림을 어떻게 되풀이할지 정합니다. 값이 하나면 두 축에, 둘이면 가로, 세로 순입니다. 초기값 `repeat`는 칠할 영역을 덮을 때까지 바둑판처럼 깔고, 끝에서 잘린 조각이 생깁니다.\n`space`는 잘리지 않게 깔고 남는 틈을 고르게 나눕니다. `round`는 틈 없이 맞추려고 그림을 늘이거나 줄입니다. 그래서 그림 비율이 바뀔 수 있는 유일한 값입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["repeat", "모든 요소", "안 됨", "불연속(중간값 없음)"]],
          },
          {
            caption: "background-repeat의 값",
            head: ["값", "하는 일"],
            rows: [
              ["repeat", "두 축으로 덮을 때까지 반복. 끝은 잘림"],
              ["no-repeat", "한 번만 그림"],
              ["space", "잘리지 않게 반복하고 틈을 고르게 나눔"],
              ["round", "틈 없이 맞도록 그림을 늘이거나 줄임"],
              ["repeat-x", "가로로만 반복(repeat no-repeat)"],
              ["repeat-y", "세로로만 반복(no-repeat repeat)"],
            ],
          },
        ],
      },
      {
        label: "background-position",
        body: "그림을 놓을 시작 위치를 정합니다. 위치는 `background-origin`이 정한 상자(기본은 패딩 상자)를 기준으로 합니다. 값을 하나만 적으면 다른 축은 `center`가 됩니다.\n퍼센트는 특이합니다. 상자 크기에서 그림 크기를 뺀 나머지에 퍼센트를 곱합니다. 그래서 `50%`는 그림의 가운데를 상자의 가운데에, `100%`는 그림 오른쪽 끝을 상자 오른쪽 끝에 맞춥니다. 모서리에서 떨어뜨리려면 `right 8px top 8px`처럼 키워드 뒤에 거리를 붙입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0% 0%", "모든 요소", "안 됨", "층마다 따로(반복 목록)"]],
          },
          {
            caption: "background-position의 값",
            head: ["값", "하는 일"],
            rows: [
              ["left, center, right", "가로 위치 키워드"],
              ["top, center, bottom", "세로 위치 키워드"],
              ["<length>", "왼쪽(또는 위) 끝에서의 거리"],
              ["<percentage>", "(상자 − 그림) 크기에 대한 비율"],
              ["키워드 + 거리", "그 변에서 떨어진 거리(right 8px)"],
            ],
          },
        ],
        code: "background-position: center;             /* 두 축 가운데 */\nbackground-position: 25% 75%;            /* 가로 | 세로 */\nbackground-position: right 8px top 8px;  /* 오른쪽 위에서 8px씩 */\n/* 퍼센트: (상자 폭 - 그림 폭) × x% = 왼쪽 끝에서의 거리 */",
        codeLang: "css",
      },
      {
        label: "background-size",
        body: "그림의 크기를 정합니다. 초기값 `auto`는 그림의 원래 크기입니다. 길이나 퍼센트를 하나만 적으면 그것이 폭이고, 높이는 `auto`가 되어 비율을 따릅니다. 퍼센트는 배경 위치 영역(기본은 패딩 상자)을 기준으로 합니다.\n`cover`는 비율을 지키며 상자를 빈틈없이 덮는 가장 작은 크기입니다. 비율이 다르면 한쪽이 잘립니다. `contain`은 비율을 지키며 잘리지 않는 가장 큰 크기입니다. 남는 쪽에 빈 곳이 생기고, `no-repeat`가 없으면 그 빈 곳에 그림이 되풀이됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto auto", "모든 요소", "안 됨", "층마다 따로(반복 목록)"]],
          },
          {
            caption: "background-size의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "원래 크기. 한쪽만 auto면 비율대로"],
              ["cover", "비율을 지키며 빈틈없이 덮음. 넘친 쪽은 잘림"],
              ["contain", "비율을 지키며 잘리지 않게 가장 크게"],
              ["<length>", "그 축의 길이로 늘이거나 줄임"],
              ["<percentage>", "배경 위치 영역에 대한 비율"],
            ],
          },
        ],
        terms: [
          {
            term: "원래 크기와 비율 (intrinsic dimensions)",
            body: "그림이 스스로 가진 폭, 높이, 그리고 그 비율입니다. 사진 파일은 늘 둘 다 있고, 그라디언트는 둘 다 없습니다. 액자에 넣기 전 사진 원본의 치수와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: cover와 contain",
        body: "두 상자는 `width: 45%; height: 120px`이고, 400×300 그림을 가운데에 놓았습니다. 왼쪽은 `cover`, 오른쪽은 `contain`입니다. 계산값 `background-size`는 키워드 그대로라 실제 그림 크기를 알려 주지 않습니다. 그래서 지금 값에 두 공식으로 계산한 그림 크기를 함께 적었습니다. cover는 폭과 높이의 배율 중 큰 쪽, contain은 작은 쪽으로 키웁니다. 폭 버튼을 바꾸면 cover 그림이 상자 높이에 맞을 때와 폭에 맞을 때가 갈립니다.",
        lab: {
          html: `<style>
  .box {
    display: inline-block; width: 45%; height: 120px; margin-right: 4px;
    background: #ddd url(photo-400.svg) center no-repeat;
  }
  #cv { background-size: cover; }
  #ct { background-size: contain; }
</style>
<div class="box" id="cv">cover</div><div class="box" id="ct">contain</div>`,
          height: 170,
          widths: [320, 480, 640],
          checks: [
            { label: "상자 폭 × 높이", expr: "(r => Math.round(r.width) + ' × ' + Math.round(r.height))(document.getElementById('cv').getBoundingClientRect())" },
            { label: "왼쪽 상자의 background-size", expr: "getComputedStyle(document.getElementById('cv')).backgroundSize" },
            { label: "cover 공식으로 계산한 그림 크기", expr: "(r => { const s = Math.max(r.width / 400, r.height / 300); return Math.round(400 * s) + ' × ' + Math.round(300 * s); })(document.getElementById('cv').getBoundingClientRect())" },
            { label: "contain 공식으로 계산한 그림 크기", expr: "(r => { const s = Math.min(r.width / 400, r.height / 300); return Math.round(400 * s) + ' × ' + Math.round(300 * s); })(document.getElementById('ct').getBoundingClientRect())" },
          ],
          tryIt: "오른쪽 상자의 no-repeat를 지워 보세요. contain으로 남는 쪽에 그림이 되풀이됩니다.",
        },
      },
      {
        label: "background-attachment",
        body: "스크롤할 때 배경이 무엇에 붙어 있을지 정합니다. 초기값 `scroll`은 요소 자체에 붙습니다. 페이지를 스크롤하면 요소와 함께 움직이지만, 요소 안을 스크롤할 때는 제자리에 있습니다.\n`local`은 요소의 내용에 붙어서 안을 스크롤하면 함께 움직입니다. `fixed`는 뷰포트에 붙어서 무엇을 스크롤해도 움직이지 않습니다. `fixed`이면 `background-origin`은 무시되고, 퍼센트 크기와 위치도 뷰포트를 기준으로 합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["scroll", "모든 요소", "안 됨", "불연속(중간값 없음)"]],
          },
          {
            caption: "background-attachment의 값",
            head: ["값", "하는 일"],
            rows: [
              ["scroll", "요소에 붙음. 요소 안을 스크롤해도 그대로"],
              ["local", "요소의 내용에 붙음. 안을 스크롤하면 함께 움직임"],
              ["fixed", "뷰포트에 붙음. 어떤 스크롤에도 그대로"],
            ],
          },
        ],
        terms: [
          {
            term: "뷰포트 (viewport)",
            body: "브라우저 창에서 문서가 보이는 부분입니다. `background-attachment: fixed`인 배경은 여기에 붙습니다. 기차 창문에 붙인 스티커가 바깥 풍경이 지나가도 그 자리에 있는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: scroll과 local",
        body: "두 상자는 안을 스크롤할 수 있고, 줄무늬 배경을 깔았습니다. 위는 초기값 `scroll`, 아래는 `local`입니다. 각 상자 안을 스크롤해 보세요. 지금 값의 `scrollTop`이 늘어납니다. 위 상자의 줄무늬는 글이 올라가도 제자리에 있습니다. 아래 상자의 줄무늬는 글과 함께 올라갑니다.",
        lab: {
          html: `<style>
  .sc {
    height: 70px; overflow: auto; margin-bottom: 8px; border: 1px solid #999;
    background: repeating-linear-gradient(#fff 0 20px, #dde 20px 40px);
  }
  #loc { background-attachment: local; }
  .sc p { margin: 0; height: 200px; padding: 4px 8px; }
</style>
<div class="sc" id="scr"><p>scroll: 이 안을 스크롤해 보세요.</p></div>
<div class="sc" id="loc"><p>local: 이 안을 스크롤해 보세요.</p></div>`,
          height: 200,
          checks: [
            { label: "위 상자의 scrollTop", expr: "Math.round(document.getElementById('scr').scrollTop)" },
            { label: "아래 상자의 scrollTop", expr: "Math.round(document.getElementById('loc').scrollTop)" },
            { label: "아래 상자의 background-attachment", expr: "getComputedStyle(document.getElementById('loc')).backgroundAttachment" },
          ],
          tryIt: "아래 상자를 background-attachment: fixed로 바꿔 보세요. 줄무늬가 작은 창 자체에 붙습니다.",
        },
      },
      {
        label: "background-clip",
        body: "배경(색과 그림)을 어디까지 칠할지 정합니다. 초기값 `border-box`는 테두리 바깥 끝까지 칠합니다. 배경은 늘 테두리 아래에 깔리므로, 점선이나 반투명 테두리일 때만 차이가 보입니다. `padding-box`는 테두리 밑을 비우고, `content-box`는 콘텐츠 영역만 칠합니다.\n`text`는 배경을 글자 모양으로 오립니다. 글자 색이 불투명하면 배경을 가리므로 `color: transparent`와 함께 씁니다. 예전 브라우저를 위해 `-webkit-background-clip: text`도 같이 적곤 합니다. 그림을 못 읽을 때를 대비해 배경색을 주고 대비를 확인합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["border-box", "모든 요소", "안 됨", "층마다 따로(반복 목록)"]],
          },
          {
            caption: "background-clip의 값",
            head: ["값", "하는 일"],
            rows: [
              ["border-box", "테두리 바깥 끝까지(테두리 아래에 깔림)"],
              ["padding-box", "패딩 바깥 끝까지. 테두리 밑은 비움"],
              ["content-box", "콘텐츠 영역만"],
              ["text", "글자 모양으로 오림"],
              ["border-area", "테두리가 그려진 곳만"],
            ],
          },
        ],
        terms: [
          {
            term: "배경 칠 영역 (background painting area)",
            body: "배경이 실제로 칠해지는 범위입니다. `background-clip`이 정하고, 초기값은 테두리 바깥 끝까지입니다. 벽에 페인트를 칠할 때 붙이는 마스킹 테이프의 안쪽과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: background-clip: text",
        body: "위 문장은 그라디언트 배경을 `background-clip: text`로 글자 모양에 오리고, 글자 색을 투명하게 했습니다. 지금 값에서 `background-clip`은 `text`, `color`는 알파가 0인 투명색으로 나옵니다. 아래 상자는 점선 테두리에 `padding-box`라서 점 사이로 배경이 비치지 않습니다.",
        lab: {
          html: `<style>
  .t {
    margin: 0 0 8px; font: 900 36px/1.2 system-ui, sans-serif;
    background: linear-gradient(90deg, #c33, #36c);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .p { padding: 10px; border: 6px dashed #333; background: #9cf; background-clip: padding-box; }
</style>
<p class="t" id="t">글자 그라디언트</p>
<div class="p" id="p">padding-box</div>`,
          height: 170,
          checks: [
            { label: "문장의 background-clip", expr: "getComputedStyle(document.getElementById('t')).getPropertyValue('background-clip')" },
            { label: "문장의 color", expr: "getComputedStyle(document.getElementById('t')).color" },
            { label: "아래 상자의 background-clip", expr: "getComputedStyle(document.getElementById('p')).backgroundClip" },
          ],
          tryIt: "문장에서 color: transparent를 지워 보세요. 불투명한 글자 색이 배경을 덮어 그라디언트가 사라집니다.",
        },
      },
      {
        label: "background-origin",
        body: "그림의 위치와 크기를 잴 기준 상자를 정합니다. 초기값 `padding-box`는 패딩 바깥 끝이 기준이라, `0 0` 위치가 테두리 안쪽 모서리가 됩니다. 반복하는 그림은 기준 밖인 테두리 밑까지 이어서 깔립니다. `background-clip`이 '어디까지 칠하나'라면 이것은 '어디서부터 재나'입니다. `background-attachment: fixed`이면 무시됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["padding-box", "모든 요소", "안 됨", "층마다 따로(반복 목록)"]],
          },
          {
            caption: "background-origin의 값",
            head: ["값", "하는 일"],
            rows: [
              ["border-box", "테두리 바깥 끝 기준"],
              ["padding-box", "패딩 바깥 끝 기준(초기값)"],
              ["content-box", "콘텐츠 영역 기준"],
            ],
          },
        ],
        terms: [
          {
            term: "배경 위치 영역 (background positioning area)",
            body: "배경 그림의 위치와 퍼센트 크기를 재는 기준 상자입니다. `background-origin`이 정하고, 초기값은 패딩 상자입니다. 벽지를 바를 때 첫 장을 맞추는 기준선과 같습니다.",
          },
        ],
      },
      {
        label: "background-blend-mode",
        body: "배경 층끼리, 그리고 배경색과 어떻게 섞을지 정합니다. 그림 층마다 쉼표로 값을 주고, 개수가 다르면 되풀이하거나 잘라서 맞춥니다. 섞는 대상은 그 요소의 배경뿐입니다. 요소 뒤에 있는 다른 요소와 섞으려면 `mix-blend-mode`를 씁니다.\n사진에 색을 입히는 데 자주 씁니다. 배경색 위에 사진을 `multiply`로 섞으면 사진이 그 색으로 물듭니다. 지원은 Chrome 35, Safari 8, Firefox 30부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소(SVG에서는 그래픽 요소 등)", "안 됨", "안 됨"]],
          },
          {
            caption: "background-blend-mode의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "섞지 않고 위층을 그대로"],
              ["multiply, darken, color-burn", "어둡게 섞음"],
              ["screen, lighten, color-dodge", "밝게 섞음"],
              ["overlay, soft-light, hard-light", "대비를 키움"],
              ["difference, exclusion", "두 색의 차이로 뒤집음"],
              ["hue, saturation, color, luminosity", "색상, 채도, 밝기 가운데 일부만 가져옴"],
            ],
          },
        ],
        code: ".tinted {\n  background: url(photo.jpg) center / cover, #36c;\n  background-blend-mode: multiply;   /* 사진을 파란색과 곱해 물들임 */\n}",
        codeLang: "css",
        terms: [
          {
            term: "혼합 모드 (blend mode)",
            body: "위 색과 아래 색을 합쳐 새 색을 만드는 규칙입니다. multiply는 곱해서 어둡게, screen은 반대로 밝게 합니다. 색 셀로판지 두 장을 겹쳐 빛에 비추면 섞인 색이 보이는 것과 같습니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "배경 문제는 대개 단축 속성의 규칙에서 납니다. 틀린 단축 선언은 조용히 통째로 버려집니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["background: url(a.jpg) cover", "선언 전체가 버려져 그림이 안 보인다", "center / cover처럼 위치 뒤에 /로 크기"],
              ["background-size를 쓴 뒤 background를 썼다", "단축 속성이 크기를 초기값으로 되돌린다", "단축 속성을 먼저, 풀어 쓴 속성을 뒤에"],
              ["배경색을 첫 층에 적었다", "선언이 틀린 값이 되어 버려진다", "배경색은 마지막 층에만"],
              ["contain에 no-repeat를 빠뜨렸다", "남는 쪽에 그림이 되풀이된다", "no-repeat를 함께 적는다"],
              ["background-clip: text만 줬다", "글자 색이 배경을 덮어 효과가 안 보인다", "color: transparent, 배경색과 대비 확인"],
              ["그림만 깔고 배경색을 안 줬다", "그림을 못 읽으면 글이 안 보인다", "비슷한 배경색을 함께 준다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `background: url(a.jpg) center cover`가 버려지는 이유와 고친 모양은?\n2) 쉼표로 적은 층 가운데 맨 위에 그려지는 것은 어느 것인가요?\n3) 400×300 그림에 `cover`와 `contain`을 주면 무엇이 달라지나요?\n4) `background-clip`과 `background-origin`은 각각 무엇을 정하나요?",
      },
    ],
    sources: [
      { label: "MDN — background", href: `${MDN}/Reference/Properties/background` },
      { label: "MDN — background-size", href: `${MDN}/Reference/Properties/background-size` },
      { label: "MDN — background-clip", href: `${MDN}/Reference/Properties/background-clip` },
      { label: "MDN — background-attachment", href: `${MDN}/Reference/Properties/background-attachment` },
      { label: "MDN — background-blend-mode", href: `${MDN}/Reference/Properties/background-blend-mode` },
      { label: "MDN — Using multiple backgrounds", href: `${MDN}/Guides/Backgrounds_and_borders/Using_multiple_backgrounds` },
    ],
  },
  {
    id: "css-prop-font",
    name: "글꼴 속성",
    tagline: "font 단축은 크기와 가족을 꼭 받고, 빠진 칸은 초기값으로 채운다",
    intro:
      "글꼴은 어떤 속성으로 정하고, 각 속성은 어떤 값을 받을까요? 이 장은 `font` 단축과 그 하위 속성, 그리고 `line-height`를 하나씩 봅니다. 여기 모은 속성은 모두 상속됩니다. 그래서 html이나 body에 한 번 적으면 자식까지 퍼집니다. em, %, bolder 같은 상대값은 부모의 계산값에서 출발합니다. 웹 폰트 파일과 `@font-face`는 13장에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "글꼴 속성 열두 개를 한 표에 모았습니다. 모두 상속되므로 보통 html이나 body에 한 번 적습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["font", "글꼴 속성을 한 줄로 정하는 단축", "하위 속성마다", "됨", "13장 · 글꼴과 텍스트"],
              ["font-family", "글꼴 후보 목록", "브라우저마다 다름", "됨", "13장 · 글꼴과 텍스트"],
              ["font-size", "글자 크기", "medium", "됨", "4장 · 값과 단위"],
              ["font-weight", "글자 굵기", "normal", "됨", ""],
              ["font-style", "기울임", "normal", "됨", ""],
              ["font-variant", "대체 글리프를 켜는 단축", "normal", "됨", ""],
              ["font-variant-caps", "작은 대문자", "normal", "됨", ""],
              ["font-variant-numeric", "숫자, 분수 모양", "normal", "됨", ""],
              ["font-kerning", "글자 쌍 간격 정보 사용", "auto", "됨", ""],
              ["font-optical-sizing", "크기에 맞춘 글자 모양", "auto", "됨", ""],
              ["font-synthesis", "없는 굵기, 기울임의 흉내 허용", "weight style small-caps position", "됨", ""],
              ["line-height", "줄 상자의 높이", "normal", "됨", "13장 · 글꼴과 텍스트"],
            ],
          },
        ],
      },
      {
        label: "font",
        body: "글꼴 속성을 한 줄에 몰아 적습니다. `caption` 같은 시스템 글꼴 키워드 하나로 정할 수도 있습니다.\n단축 속성입니다. 풀어 쓰면 font-style, font-variant, font-weight, font-stretch, font-size, line-height, font-family입니다. font-stretch의 새 이름은 font-width입니다.\n순서 규칙은 넷입니다.\n1) font-size와 font-family는 꼭 적습니다.\n2) style, variant, weight는 크기 앞에 옵니다.\n3) line-height는 크기 바로 뒤에 `/`로 붙입니다.\n4) font-family는 맨 끝에 옵니다.\n주의할 점은 되돌리기입니다. 적지 않은 하위 속성은 초기값으로 돌아갑니다. 앞에서 적은 `line-height`도 normal이 됩니다. font-kerning, font-variant-numeric처럼 단축에 적을 수 없는 속성도 초기값으로 돌아갑니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["하위 속성마다 초기값", "모든 요소와 텍스트", "됨", "하위 속성마다 따름"]],
          },
          {
            caption: "font의 값",
            head: ["값", "하는 일"],
            rows: [
              ["font-style", "기울임. 생략하면 normal"],
              ["font-variant", "normal이나 small-caps만. 생략하면 normal"],
              ["font-weight", "굵기. 생략하면 normal"],
              ["font-width 키워드", "condensed 같은 너비 키워드만. 생략하면 normal"],
              ["font-size", "꼭 적음. 글자 크기"],
              ["/ line-height", "크기 바로 뒤. 생략하면 normal"],
              ["font-family", "꼭 적음. 맨 끝"],
              ["caption, icon, menu", "시스템 글꼴 키워드. 다른 값 없이 혼자 씀"],
              ["message-box, small-caption, status-bar", "시스템 글꼴 키워드. 다른 값 없이 혼자 씀"],
            ],
          },
        ],
        code: "/* 순서: style variant weight width size/line-height family */\n.title { font: italic small-caps 700 condensed 1.25rem/1.4 \"Noto Sans KR\", sans-serif; }\n.body  { font: 1rem/1.6 system-ui, sans-serif; }   /* 꼭 필요한 것은 크기와 가족 */\n.ui    { font: caption; }                           /* 시스템 글꼴 키워드는 혼자 */",
        codeLang: "css",
        terms: [
          {
            term: "단축 속성 (shorthand)",
            body: "여러 속성을 한 줄로 적는 속성입니다. 적지 않은 칸은 그대로 두지 않고 초기값으로 채웁니다. 이삿짐 상자를 통째로 바꾸는 것과 같아서, 새 상자에 안 넣은 물건은 사라집니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: font가 line-height를 되돌린다",
        body: "세 문단은 모두 줄 높이 2배를 노렸습니다. a는 `line-height: 2` 뒤에 `font`를 적었습니다. b는 `font`를 먼저 적었습니다. c는 `font` 안에 `20px/2`로 적었습니다.\nMDN대로라면 a의 line-height는 normal로 돌아갑니다. b와 c는 2배가 남습니다. 지금 값에서 a만 normal로 나오고, b와 c는 px 값으로 나옵니다. getComputedStyle은 숫자 line-height를 글자 크기에 곱한 px로 돌려주기 때문입니다.\nfont-kerning도 같습니다. a에 먼저 적은 `none`이 초기값 auto로 돌아갑니다. font 단축은 이 속성을 적을 수 없지만 되돌리기는 합니다.",
        lab: {
          html: `<style>
  .a { line-height: 2; font-kerning: none; font: 20px sans-serif; }
  .b { font: 20px sans-serif; line-height: 2; font-kerning: none; }
  .c { font: 20px/2 sans-serif; }
  p { margin: 4px 0; background: #eef3ff; }
</style>
<p class="a">a: line-height 다음에 font</p>
<p class="b">b: font 다음에 line-height</p>
<p class="c">c: font 안에 20px/2</p>`,
          height: 190,
          checks: [
            { label: "a의 line-height", expr: "getComputedStyle(document.querySelector('.a')).lineHeight" },
            { label: "b의 line-height", expr: "getComputedStyle(document.querySelector('.b')).lineHeight" },
            { label: "c의 line-height", expr: "getComputedStyle(document.querySelector('.c')).lineHeight" },
            { label: "a의 font-kerning", expr: "getComputedStyle(document.querySelector('.a')).fontKerning" },
            { label: "b의 font-kerning", expr: "getComputedStyle(document.querySelector('.b')).fontKerning" },
          ],
          tryIt: "a에서 font 선언을 맨 앞으로 옮겨 보세요. line-height와 font-kerning이 살아납니다.",
        },
      },
      {
        label: "font-family",
        body: "글꼴 후보를 쉼표로 늘어놓습니다. 앞에 적은 것이 먼저입니다.\n고르기는 글자 하나씩 합니다. 첫 글꼴에 그 글자가 없으면 다음 후보로 넘어갑니다. 그래서 한글이 없는 영문 글꼴을 앞에 두면 영문은 그 글꼴로, 한글은 뒤 후보로 그려집니다.\n목록 끝에는 sans-serif 같은 일반 가족을 하나 둡니다. 어떤 글꼴이 깔려 있을지 모르기 때문입니다. 이름에 공백, 숫자, 기호가 있으면 따옴표로 감쌉니다. 일반 가족 키워드는 감싸지 않습니다.\n주의할 점이 둘 있습니다. `system-ui`는 UI용이라 긴 본문에는 sans-serif가 낫습니다. `monospace` 하나만 적으면 고정폭용 기본 크기가 쓰여 글자가 작아질 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["브라우저마다 다름", "모든 요소와 텍스트", "됨", "불연속"]],
          },
          {
            caption: "font-family의 값",
            head: ["값", "하는 일"],
            rows: [
              ["\"글꼴 이름\"", "깔린 글꼴이나 @font-face의 이름"],
              ["serif", "획 끝에 장식이 있는 글꼴 (바탕체 계열)"],
              ["sans-serif", "획 끝이 밋밋한 글꼴 (돋움체 계열)"],
              ["monospace", "모든 글자의 폭이 같음"],
              ["cursive", "손글씨처럼 획이 이어짐"],
              ["fantasy", "장식용 글꼴"],
              ["system-ui", "운영체제의 UI 글꼴"],
              ["ui-serif, ui-sans-serif", "UI용 바탕체, 돋움체"],
              ["ui-monospace, ui-rounded", "UI용 고정폭, 둥근 글꼴"],
              ["math", "수식용 글꼴"],
              ["fangsong", "송체와 해서 사이의 한자 양식"],
            ],
          },
        ],
        code: "body { font-family: \"Inter\", \"Noto Sans KR\", sans-serif; }  /* 영문은 Inter, 한글은 Noto Sans KR */\ncode { font-family: ui-monospace, monospace; }            /* 둘 이상이면 고정폭 크기 축소가 없음 */",
        codeLang: "css",
        terms: [
          {
            term: "일반 가족 (generic family)",
            body: "특정 글꼴이 아니라 '이런 느낌의 글꼴'을 부르는 키워드입니다. 브라우저가 기기에 있는 글꼴 가운데 하나를 골라 줍니다. 식당에서 메뉴 이름 대신 '아무 국수나'라고 시키는 것과 같습니다.",
          },
        ],
      },
      {
        label: "font-size",
        body: "글자 크기를 정합니다. em, ex 같은 글꼴 기준 단위의 바탕이 되는 값이기도 합니다.\n값은 키워드, 길이, 퍼센트로 적습니다. em과 %는 부모의 글자 크기를 바탕으로 합니다. rem은 html 요소의 글자 크기를 바탕으로 합니다.\n계산값은 언제나 절대 길이입니다. `1.5em`으로 적어도 자식이 물려받는 것은 계산된 px입니다.\n주의할 점이 둘 있습니다. em은 겹쳐 곱해집니다. 0.8em인 목록을 세 번 겹치면 점점 작아집니다. 그리고 px로 고정하면 일부 브라우저에서 사용자가 글자 크기를 못 바꿉니다. MDN은 사용자 기본 크기를 기준으로 하는 값을 권합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["medium", "모든 요소와 텍스트", "됨", "계산값끼리 보간"]],
          },
          {
            caption: "font-size의 값",
            head: ["값", "하는 일"],
            rows: [
              ["xx-small부터 xxx-large", "절대 크기 키워드. medium이 사용자 기본 크기"],
              ["larger, smaller", "부모보다 한 단계 크게, 작게"],
              ["길이 (px, em, rem)", "em은 부모 기준, rem은 html 기준"],
              ["퍼센트", "부모의 글자 크기 기준"],
              ["math", "수식 요소의 크기 규칙을 따름"],
            ],
          },
        ],
        code: "html  { font-size: 100%; }     /* 사용자 기본 크기를 그대로 */\nh1    { font-size: 2rem; }     /* html 기준이라 겹쳐 곱해지지 않음 */\nsmall { font-size: 0.875em; }  /* 부모 기준 */",
        codeLang: "css",
        terms: [
          {
            term: "계산값 (computed value)",
            body: "선언한 값을 물려줄 수 있는 모양으로 바꿔 둔 값입니다. font-size는 em이나 %를 px로 바꿔 둡니다. 자식은 이 값을 물려받습니다. 요리법의 '한 숟갈'을 그램으로 고쳐 적어 두면, 물려받는 쪽은 그램만 보는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: em, rem, %가 px로 바뀐다",
        body: "부모 상자의 글자 크기는 20px입니다. 안의 네 줄은 1.5em, 1.5rem, 150%, larger로 적었습니다. 지금 값은 모두 px로 나옵니다. font-size의 계산값이 절대 길이이기 때문입니다.\nem과 %는 부모의 20px에 곱하므로 둘이 같은 값입니다. rem은 부모와 상관없이 html의 글자 크기에 곱합니다. 첫 줄 안의 span은 em 안에 em을 겹친 것입니다. 바깥 줄보다 더 크게 나옵니다.",
        lab: {
          html: `<style>
  .parent { font-size: 20px; }
  .em { font-size: 1.5em; }
  .rem { font-size: 1.5rem; }
  .pct { font-size: 150%; }
  .lg { font-size: larger; }
  p { margin: 0; line-height: 1.3; }
</style>
<div class="parent">
  <p class="em">1.5em <span class="em">안에 또 1.5em</span></p>
  <p class="rem">1.5rem</p>
  <p class="pct">150%</p>
  <p class="lg">larger</p>
</div>`,
          height: 240,
          checks: [
            { label: "html의 font-size", expr: "getComputedStyle(document.documentElement).fontSize" },
            { label: "1.5em", expr: "getComputedStyle(document.querySelector('p.em')).fontSize" },
            { label: "1.5em 안의 1.5em", expr: "getComputedStyle(document.querySelector('span.em')).fontSize" },
            { label: "1.5rem", expr: "getComputedStyle(document.querySelector('p.rem')).fontSize" },
            { label: "150%", expr: "getComputedStyle(document.querySelector('p.pct')).fontSize" },
            { label: "larger", expr: "getComputedStyle(document.querySelector('p.lg')).fontSize" },
          ],
          tryIt: ".parent의 20px를 30px로 바꿔 보세요. rem 줄만 그대로입니다.",
        },
      },
      {
        label: "font-weight",
        body: "글자 굵기를 정합니다. 1부터 1000까지의 숫자나 키워드로 적습니다. normal은 400, bold는 700과 같습니다.\n`bolder`와 `lighter`는 부모 굵기에서 한 단계 옮깁니다. 이때는 100, 400, 700, 900 네 단계만 봅니다. 계산값은 옮긴 결과의 숫자입니다.\n주의할 점이 있습니다. 글꼴에 그 굵기가 없으면 가까운 굵기로 그립니다. 그래도 계산값은 적은 숫자 그대로입니다. 가변 글꼴은 450 같은 숫자도 그대로 그릴 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소와 텍스트", "됨", "계산값끼리 보간"]],
          },
          {
            caption: "font-weight의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "400과 같음"],
              ["bold", "700과 같음"],
              ["숫자 1~1000", "클수록 굵음"],
              ["bolder", "부모보다 한 단계 굵게"],
              ["lighter", "부모보다 한 단계 얇게"],
            ],
          },
          {
            caption: "bolder와 lighter의 결과",
            head: ["부모 굵기", "bolder", "lighter"],
            rows: [
              ["100~300", "400", "100"],
              ["400~500", "700", "100"],
              ["600~700", "900", "400"],
              ["800~900", "900", "700"],
            ],
          },
        ],
        terms: [
          {
            term: "가변 글꼴 (variable font)",
            body: "굵기나 기울기를 축으로 담은 글꼴 파일 하나입니다. 축 위의 아무 값이나 그릴 수 있어서 450 같은 굵기도 됩니다. 계단 대신 경사로를 놓은 건물과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: bolder는 부모 굵기에서 정해진다",
        body: "세 부모의 굵기는 300, 400, 600입니다. 자식은 모두 `bolder`이고, 끝의 하나만 `lighter`입니다.\n지금 값에는 bolder가 숫자로 바뀌어 나옵니다. MDN의 표대로라면 300은 400으로, 400은 700으로, 600은 900으로 갑니다. 600 아래의 lighter는 400입니다.\n부모의 굵기를 바꾸면 같은 bolder라도 결과가 달라집니다. 상대값은 부모의 계산값에서 출발하기 때문입니다.",
        lab: {
          html: `<style>
  .w300 { font-weight: 300; }
  .w400 { font-weight: 400; }
  .w600 { font-weight: 600; }
  b { font-weight: bolder; }
  i { font-weight: lighter; font-style: normal; }
  p { margin: 2px 0; }
</style>
<p class="w300">300 부모 <b id="b3">bolder</b></p>
<p class="w400">400 부모 <b id="b4">bolder</b></p>
<p class="w600">600 부모 <b id="b6">bolder</b> <i id="l6">lighter</i></p>`,
          height: 160,
          checks: [
            { label: "300 부모의 bolder", expr: "getComputedStyle(document.getElementById('b3')).fontWeight" },
            { label: "400 부모의 bolder", expr: "getComputedStyle(document.getElementById('b4')).fontWeight" },
            { label: "600 부모의 bolder", expr: "getComputedStyle(document.getElementById('b6')).fontWeight" },
            { label: "600 부모의 lighter", expr: "getComputedStyle(document.getElementById('l6')).fontWeight" },
          ],
          tryIt: ".w600의 600을 800으로 바꿔 보세요. bolder는 900에 머물고 lighter는 700이 됩니다.",
        },
      },
      {
        label: "font-style",
        body: "바른 꼴, 이탤릭, 오블리크 가운데 고릅니다. 이탤릭은 따로 그린 기울인 꼴이고, 오블리크는 바른 꼴을 비스듬히 눕힌 모양입니다.\n`italic`은 이탤릭 꼴이 없으면 오블리크를, 그것도 없으면 흉내 낸 기울임을 씁니다. `oblique`는 뒤에 각도를 붙일 수 있습니다. 각도를 빼면 14deg입니다.\n주의할 점이 있습니다. 한글 글꼴은 대개 기울인 꼴이 없어서 흉내 낸 기울임이 됩니다. 긴 문단을 기울이면 난독증이 있는 사람이 읽기 어렵습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소와 텍스트", "됨", "계산값끼리 보간. normal은 oblique 0deg로"]],
          },
          {
            caption: "font-style의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "바른 꼴"],
              ["italic", "이탤릭 꼴. 없으면 오블리크, 그다음 흉내"],
              ["oblique", "오블리크 꼴. 없으면 이탤릭, 그다음 흉내"],
              ["oblique 각도", "-90deg~90deg 사이 기울기. 생략하면 14deg"],
            ],
          },
        ],
      },
      {
        label: "font-variant",
        body: "글꼴 안에 든 대체 글리프를 켭니다. 작은 대문자, 숫자 모양, 합자, 동아시아 글자 모양 같은 것입니다.\n단축 속성입니다. 풀어 쓰면 font-variant-ligatures, font-variant-caps, font-variant-numeric, font-variant-east-asian, font-variant-alternates, font-variant-position, font-variant-emoji입니다.\n값은 공백으로 이어 적고, 각 값은 맞는 하위 속성으로 갑니다. 주의할 점이 있습니다. `font` 단축 안에서는 normal과 small-caps만 됩니다. 그리고 숫자 모양처럼 글꼴에 기능이 없으면 바뀌지 않는 값이 많습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소와 텍스트", "됨", "불연속"]],
          },
          {
            caption: "font-variant의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "모든 하위 속성을 normal로"],
              ["none", "합자를 끄고 나머지는 normal로"],
              ["common-ligatures 등", "합자 (font-variant-ligatures)"],
              ["small-caps 등", "작은 대문자 (font-variant-caps)"],
              ["tabular-nums 등", "숫자 모양 (font-variant-numeric)"],
              ["full-width, ruby 등", "동아시아 글자 (font-variant-east-asian)"],
              ["stylistic() 등", "대체 글리프 (font-variant-alternates)"],
              ["sub, super", "아래첨자, 위첨자 (font-variant-position)"],
              ["text, emoji, unicode", "이모지 표시 (font-variant-emoji)"],
            ],
          },
        ],
        code: "/* 풀어 쓴 두 선언 */\n.price { font-variant-caps: small-caps; font-variant-numeric: tabular-nums slashed-zero; }\n/* 단축 한 줄: 값마다 제 하위 속성으로 간다 */\n.price { font-variant: small-caps tabular-nums slashed-zero; }",
        codeLang: "css",
      },
      {
        label: "font-variant-caps",
        body: "대문자 모양의 대체 글리프를 고릅니다. 작은 대문자는 대문자 모양을 소문자 크기로 그린 글자입니다.\n글꼴에 그 글리프가 없으면 브라우저가 대문자를 줄여 흉내 냅니다. petite-caps가 없으면 small-caps로 대신합니다.\n대소문자가 없는 한글에는 효과가 없습니다. 터키어의 i처럼 언어마다 다른 대소문자 규칙은 따릅니다. 긴 문단을 all-small-caps로 쓰면 읽기 어렵습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소와 텍스트", "됨", "불연속"]],
          },
          {
            caption: "font-variant-caps의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "대체 글리프를 쓰지 않음"],
              ["small-caps", "소문자를 작은 대문자로"],
              ["all-small-caps", "대문자, 소문자 모두 작은 대문자로"],
              ["petite-caps", "소문자를 더 작은 대문자로"],
              ["all-petite-caps", "모두 더 작은 대문자로"],
              ["unicase", "대문자만 작은 대문자로, 소문자는 그대로"],
              ["titling-caps", "제목용 대문자"],
            ],
          },
        ],
      },
      {
        label: "font-variant-numeric",
        body: "숫자, 분수, 서수 표시의 대체 글리프를 고릅니다. 값은 공백으로 여럿 이어 적을 수 있습니다.\n가장 자주 쓰는 값은 `tabular-nums`입니다. 숫자 폭을 모두 같게 해서 표, 가격, 타이머의 자릿수가 위아래로 맞습니다.\n주의할 점이 있습니다. 글꼴에 그 OpenType 기능(tnum 같은 것)이 있어야 바뀝니다. 없으면 값을 적어도 모양이 그대로입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소와 텍스트", "됨", "불연속"]],
          },
          {
            caption: "font-variant-numeric의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "대체 글리프를 쓰지 않음"],
              ["lining-nums", "모든 숫자가 기준선 위에 섬"],
              ["oldstyle-nums", "3, 4, 7, 9 같은 숫자가 아래로 내려옴"],
              ["proportional-nums", "숫자마다 폭이 다름"],
              ["tabular-nums", "숫자 폭이 모두 같음"],
              ["diagonal-fractions", "1/2을 빗금 분수로"],
              ["stacked-fractions", "1/2을 가로줄 분수로"],
              ["ordinal", "1st의 st 같은 서수 표시"],
              ["slashed-zero", "빗금 친 0"],
            ],
          },
        ],
        code: "td.money { font-variant-numeric: tabular-nums; }        /* 자릿수를 위아래로 맞춤 */\n.code    { font-variant-numeric: slashed-zero; }        /* 0과 O를 가름 */",
        codeLang: "css",
      },
      {
        label: "font-kerning",
        body: "글꼴에 든 커닝 정보를 쓸지 정합니다. 커닝은 AV, To처럼 특정 글자 쌍의 틈을 줄여 간격을 고르게 합니다.\n`auto`는 브라우저가 고릅니다. 어떤 브라우저는 작은 글자에서 커닝을 끕니다. 늘 쓰려면 `normal`을 적습니다.\n주의할 점이 있습니다. `font` 단축은 이 속성을 auto로 되돌립니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소와 텍스트", "됨", "불연속"]],
          },
          {
            caption: "font-kerning의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 정함"],
              ["normal", "글꼴의 커닝 정보를 씀"],
              ["none", "커닝 정보를 쓰지 않음"],
            ],
          },
        ],
        terms: [
          {
            term: "커닝 (kerning)",
            body: "특정 글자 쌍 사이의 틈을 따로 맞추는 정보입니다. 글꼴을 만든 사람이 쌍마다 미리 적어 둡니다. 단체 사진에서 어깨가 넓은 사람 옆은 살짝 겹쳐 세우는 것과 같습니다.",
          },
        ],
      },
      {
        label: "font-optical-sizing",
        body: "글자 크기에 맞춰 글자 모양을 다듬을지 정합니다. 광학 크기 축(opsz)이 있는 가변 글꼴에서만 효과가 있습니다.\n그런 글꼴은 이 기능이 기본으로 켜집니다. 작은 글자는 획을 굵고 장식을 크게 그립니다. 큰 글자는 굵은 획과 가는 획의 대비를 크게 그립니다. 끄려면 `none`을 적습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소와 텍스트", "됨", "불연속"]],
          },
          {
            caption: "font-optical-sizing의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "크기에 맞춰 글자 모양을 바꿈"],
              ["none", "글자 모양을 바꾸지 않음"],
            ],
          },
        ],
      },
      {
        label: "font-synthesis",
        body: "글꼴에 굵은 꼴이나 기울인 꼴이 없을 때, 브라우저가 흉내 내도 되는지 정합니다.\n단축 속성입니다. 풀어 쓰면 font-synthesis-weight, font-synthesis-style, font-synthesis-small-caps, font-synthesis-position입니다.\n초기값은 넷 다 허용입니다. 값을 적으면 적은 낱말만 허용되고 나머지는 금지됩니다. 낱말의 순서는 상관없습니다.\n한국어, 중국어, 일본어 글꼴은 이런 꼴이 없는 경우가 많습니다. 흉내 낸 굵기나 기울임은 글자를 읽기 어렵게 할 수 있습니다. 그럴 때 `:lang()`과 함께 끕니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["weight style small-caps position", "모든 요소와 텍스트", "됨", "불연속"]],
          },
          {
            caption: "font-synthesis의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "아무것도 흉내 내지 않음"],
              ["weight", "굵은 꼴 흉내 허용"],
              ["style", "기울인 꼴 흉내 허용"],
              ["small-caps", "작은 대문자 흉내 허용"],
              ["position", "위첨자, 아래첨자 흉내 허용"],
            ],
          },
        ],
        code: ".logo     { font-synthesis: none; }           /* 아무것도 흉내 내지 않음 */\n:lang(ko) { font-synthesis: weight; }         /* 굵기만 허용, 기울임은 금지 */\n.note     { font-synthesis: style weight; }   /* 낱말 순서는 상관없음 */",
        codeLang: "css",
        terms: [
          {
            term: "합성 (synthesis)",
            body: "글꼴에 없는 굵은 꼴이나 기울인 꼴을 브라우저가 만들어 그리는 일입니다. 굵기는 획을 덧칠하고, 기울임은 바른 꼴을 비스듬히 눕힙니다. 정장이 없어서 셔츠에 넥타이만 매고 나서는 것과 같습니다.",
          },
        ],
      },
      {
        label: "line-height",
        body: "가로쓰기에서 줄 상자의 높이를 정합니다. 글줄 사이의 간격이 이 값으로 정해집니다.\n단위 없는 숫자가 가장 안전합니다. 계산값이 숫자 그대로라서, 자식은 비율을 물려받아 자기 글자 크기에 곱합니다. em, %, px는 그 요소에서 px로 계산된 뒤 물려집니다. 그래서 글자가 큰 자식에서 줄이 겹칠 수 있습니다.\nMDN은 본문에 1.5 이상을 권합니다. 저시력이나 난독증이 있는 사람이 읽기 쉬워집니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소", "됨", "숫자끼리, 길이끼리 보간"]],
          },
          {
            caption: "line-height의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "브라우저가 정함. 대개 1.2 안팎"],
              ["숫자", "자기 글자 크기 × 숫자. 계산값은 숫자"],
              ["길이", "그 길이. em은 이 요소에서 px로 굳음"],
              ["퍼센트", "자기 글자 크기 × %. 계산값은 px"],
            ],
          },
        ],
        code: "body { line-height: 1.5; }     /* 권장: 자식도 각자 글자 크기 × 1.5 */\n.bad { line-height: 1.5em; }   /* 여기서 px로 굳어 자식에게 그대로 간다 */",
        codeLang: "css",
        terms: [
          {
            term: "줄 상자 (line box)",
            body: "한 줄의 글자를 담는 보이지 않는 상자입니다. 높이는 line-height로 정해지고, 이 상자를 쌓아 문단이 됩니다. 공책의 줄 간격과 같아서, 넓을수록 글이 여유 있어 보입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 숫자와 em, 자식에게 물려줄 때",
        body: "두 부모의 글자 크기는 모두 16px입니다. 왼쪽은 `line-height: 1.5`, 오른쪽은 `1.5em`입니다. 안의 제목은 글자 크기가 32px입니다.\ngetComputedStyle은 line-height를 px로 바꿔 보여 줍니다. 그래서 글자 크기에 대한 비율도 함께 셉니다.\n숫자 쪽 제목은 줄 높이가 자기 글자 크기에 맞춰 커지고, 비율이 1.5로 나옵니다. em 쪽 제목은 부모에서 굳은 px를 그대로 받습니다. 비율이 1.5에 한참 못 미치고, 두 줄로 넘어간 제목의 줄이 겹쳐 보입니다.",
        lab: {
          html: `<style>
  .num { font-size: 16px; line-height: 1.5; }
  .em { font-size: 16px; line-height: 1.5em; }
  .box { display: inline-block; vertical-align: top; width: 44%; border: 2px solid #36c; }
  h3 { font-size: 32px; margin: 0; }
</style>
<div class="box num"><h3 id="n">숫자 1.5를 물려받은 제목</h3>본문</div>
<div class="box em"><h3 id="e">1.5em을 물려받은 제목</h3>본문</div>`,
          height: 240,
          checks: [
            { label: "숫자 쪽 제목의 line-height", expr: "getComputedStyle(document.getElementById('n')).lineHeight" },
            { label: "숫자 쪽 비율", expr: "(() => { const s = getComputedStyle(document.getElementById('n')); return Math.round(parseFloat(s.lineHeight) / parseFloat(s.fontSize) * 100) / 100; })()" },
            { label: "em 쪽 제목의 line-height", expr: "getComputedStyle(document.getElementById('e')).lineHeight" },
            { label: "em 쪽 비율", expr: "(() => { const s = getComputedStyle(document.getElementById('e')); return Math.round(parseFloat(s.lineHeight) / parseFloat(s.fontSize) * 100) / 100; })()" },
          ],
          tryIt: ".em의 1.5em을 150%나 24px로 바꿔 보세요. 결과가 같습니다. 셋 다 부모에서 px로 굳기 때문입니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "글꼴 속성에서 자주 보는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["`line-height` 뒤에 `font`를 적음", "line-height가 normal로 돌아감", "font 안에 `/1.5`로 적거나 font 뒤에 적기"],
              ["`font: bold sans-serif`", "크기가 없어 선언 전체가 무시됨", "font-size와 font-family를 함께 적기"],
              ["line-height를 em, %, px로 적음", "글자가 큰 자식의 줄이 겹침", "단위 없는 숫자로 적기"],
              ["겹친 목록에 `font-size: 0.8em`", "깊어질수록 글자가 작아짐", "rem으로 적기"],
              ["`font-family: Hawaii 5-0, sans-serif`", "따옴표가 없어 선언이 무효", "이름을 따옴표로 감싸기"],
              ["굵은 꼴이 없는 한글 글꼴에 bold", "흉내 낸 굵기로 획이 뭉개짐", "굵기 파일을 @font-face로 잇거나 font-synthesis 끄기"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `font: bold sans-serif;`가 무시되는 까닭은 무엇일까요?\n2) 부모가 `line-height: 1.5em`이면 글자가 큰 자식의 줄이 겹치는 까닭은 무엇일까요?\n3) font-weight가 400인 부모 안에서 `bolder`의 계산값은 무엇일까요?\n4) 한글이 없는 영문 글꼴을 목록 맨 앞에 두면 한글은 어떻게 그려질까요?",
      },
    ],
    sources: [
      { label: "MDN — font", href: `${MDN}/Reference/Properties/font` },
      { label: "MDN — font-family", href: `${MDN}/Reference/Properties/font-family` },
      { label: "MDN — font-size", href: `${MDN}/Reference/Properties/font-size` },
      { label: "MDN — font-weight", href: `${MDN}/Reference/Properties/font-weight` },
      { label: "MDN — font-synthesis", href: `${MDN}/Reference/Properties/font-synthesis` },
      { label: "MDN — line-height", href: `${MDN}/Reference/Properties/line-height` },
    ],
  },
  {
    id: "css-prop-writing",
    name: "쓰기 모드와 방향 속성",
    tagline: "글자가 흐르는 쪽과 줄이 쌓이는 쪽을 정한다",
    intro:
      "글자는 어느 쪽으로 흐르고, 다음 줄은 어디에 놓일까요? 가로로 쓰는 영어, 오른쪽에서 왼쪽으로 쓰는 아랍어, 세로로 쓰는 일본어는 답이 다릅니다. 이 장은 그 답을 정하는 일곱 속성을 봅니다. `writing-mode`는 줄의 방향을, `direction`은 글자가 흐르는 쪽을 정합니다. 나머지는 세로쓰기 속 글자의 방향, 섞인 방향의 글, 루비 주석을 다룹니다. 방향은 되도록 CSS보다 HTML의 dir 속성으로 정합니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "쓰기 방향에 관한 일곱 속성입니다. unicode-bidi만 상속되지 않습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["writing-mode", "가로쓰기, 세로쓰기와 줄이 쌓이는 쪽", "horizontal-tb", "됨", ""],
              ["direction", "글자가 흐르는 쪽 (ltr, rtl)", "ltr", "됨", ""],
              ["unicode-bidi", "섞인 방향의 글을 묶거나 떼어 냄", "normal", "안 됨", ""],
              ["text-orientation", "세로쓰기 속 글자의 방향", "mixed", "됨", ""],
              ["text-combine-upright", "세로쓰기 속 짧은 가로짜기", "none", "됨", ""],
              ["ruby-align", "루비 주석의 정렬", "space-around", "됨", ""],
              ["ruby-position", "루비 주석의 위치", "alternate", "됨", ""],
            ],
          },
        ],
      },
      {
        label: "writing-mode",
        body: "글줄을 가로로 놓을지 세로로 놓을지 정합니다. 블록이 쌓이는 방향도 함께 정합니다.\n한국어, 일본어, 중국어 세로쓰기에는 `vertical-rl`을 씁니다. 글자는 위에서 아래로 흐르고, 다음 줄은 왼쪽에 놓입니다. 문서 전체를 바꿀 때는 html 요소에 적습니다.\n주의할 점이 있습니다. width와 height는 화면 기준이라 쓰기 모드를 따라 돌지 않습니다. 세로쓰기에서 줄 길이는 height 쪽입니다. 쓰기 모드를 따라가려면 inline-size와 block-size를 씁니다. 이 둘은 '박스와 크기 속성' 장에서 다룹니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["horizontal-tb", "표의 행, 열, 행 묶음, 열 묶음을 뺀 모든 요소", "됨", "안 됨"]],
          },
          {
            caption: "writing-mode의 값",
            head: ["값", "하는 일"],
            rows: [
              ["horizontal-tb", "가로쓰기. 다음 줄은 아래에"],
              ["vertical-rl", "세로쓰기. 다음 줄은 왼쪽에"],
              ["vertical-lr", "세로쓰기. 다음 줄은 오른쪽에"],
              ["sideways-rl", "세로 줄. 모든 글자를 오른쪽으로 눕힘"],
              ["sideways-lr", "세로 줄. 모든 글자를 왼쪽으로 눕히고 아래에서 위로"],
            ],
          },
        ],
        code: "html  { writing-mode: vertical-rl; }   /* 문서 전체를 세로쓰기로 */\n.card { inline-size: 20em; }           /* 가로쓰기에선 너비, 세로쓰기에선 높이 */",
        codeLang: "css",
        terms: [
          {
            term: "인라인 방향과 블록 방향",
            body: "인라인 방향은 한 줄 안에서 글자가 흐르는 쪽입니다. 블록 방향은 줄과 문단이 쌓이는 쪽입니다. 가로쓰기에선 오른쪽과 아래쪽, vertical-rl에선 아래쪽과 왼쪽입니다. 원고지를 세로로 돌려 쓰면 칸을 채우는 순서가 바뀌는 것과 같습니다.",
          },
          {
            term: "논리 속성",
            body: "inline-size, margin-inline-start처럼 화면의 위아래 대신 쓰기 방향을 기준으로 한 속성입니다. 쓰기 모드나 방향이 바뀌면 가리키는 쪽도 따라 바뀝니다. '오른손 쪽' 대신 '글 쓰는 쪽'이라고 부르는 셈입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: vertical-rl에서 자라는 쪽이 바뀐다",
        body: "상자에는 `inline-size: 9em`만 적었습니다. 가로쓰기에서 이 값은 너비입니다. 지금 값의 상자 width는 9em에 안쪽 여백과 테두리를 더한 길이입니다. 글이 늘면 height가 자랍니다.\n`horizontal-tb`를 `vertical-rl`로 바꿔 실행해 보세요. inline-size 계산값은 그대로인데, 이번엔 상자 height가 그 길이를 따릅니다. 여기에 글을 한 문장 더 붙여 보세요. height는 그대로이고 width가 자랍니다. 새 줄은 왼쪽에 생깁니다.",
        lab: {
          html: `<style>
  .box { writing-mode: horizontal-tb; inline-size: 9em; padding: 6px; border: 2px solid #36c; }
</style>
<div class="box">세로쓰기에서는 글자가 위에서 아래로 흐르고, 다음 줄은 왼쪽에 놓입니다.</div>`,
          height: 220,
          checks: [
            { label: "writing-mode", expr: "getComputedStyle(document.querySelector('.box')).writingMode" },
            { label: "inline-size 계산값", expr: "getComputedStyle(document.querySelector('.box')).inlineSize" },
            { label: "상자 width", expr: "Math.round(document.querySelector('.box').getBoundingClientRect().width)" },
            { label: "상자 height", expr: "Math.round(document.querySelector('.box').getBoundingClientRect().height)" },
          ],
          tryIt: "horizontal-tb를 vertical-rl로 바꾸고, 글을 한 문장 더 붙여 보세요.",
        },
      },
      {
        label: "direction",
        body: "글자와 요소가 흐르는 쪽을 정합니다. 기본 정렬, 표와 그리드 열의 순서, 가로 넘침의 방향도 이 값을 따릅니다. 아랍어, 히브리어처럼 오른쪽에서 왼쪽으로 쓰는 글에는 `rtl`을 씁니다.\n주의할 점이 둘 있습니다. MDN은 이 속성 대신 HTML의 `dir` 속성을 쓰라고 권합니다. `:dir()` 선택자도 문서에 적힌 dir만 보고 CSS의 direction은 보지 않습니다. 그리고 인라인 요소에서는 unicode-bidi가 embed나 bidi-override여야 효과가 납니다.\n`all` 단축으로도 바뀌지 않는 두 속성 가운데 하나입니다. 다른 하나는 unicode-bidi입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["ltr", "모든 요소", "됨", "안 됨"]],
          },
          {
            caption: "direction의 값",
            head: ["값", "하는 일"],
            rows: [
              ["ltr", "왼쪽에서 오른쪽으로. 기본값"],
              ["rtl", "오른쪽에서 왼쪽으로"],
            ],
          },
        ],
        code: "<html lang=\"ar\" dir=\"rtl\">          <!-- 권장: 방향은 HTML에 적는다 -->\n<p dir=\"auto\">사용자가 쓴 글</p>      <!-- 내용을 보고 방향을 정한다 -->",
        codeLang: "html",
      },
      {
        label: "직접 해 보기: dir 속성과 direction",
        body: "두 문단은 모두 오른쪽에서 왼쪽으로 흐릅니다. 위는 HTML의 `dir=\"rtl\"`, 아래는 CSS의 `direction: rtl`입니다. 두 문단 모두 끝의 느낌표가 왼쪽 끝으로 갑니다. 방향이 없는 문장 부호가 문단 방향을 따르기 때문입니다.\n지금 값을 보면 두 문단의 direction은 모두 rtl입니다. 그런데 `:dir(rtl)`에 맞는 것은 위 문단뿐입니다. `:dir(rtl)`로 칠한 초록 배경도 위에만 보입니다. MDN은 `:dir()`이 문서에 적힌 방향만 본다고 적습니다.",
        lab: {
          html: `<style>
  p { border: 1px solid #999; padding: 4px 8px; }
  p:dir(rtl) { background: #dcfce7; }
  .css-rtl { direction: rtl; }
</style>
<p id="attr" dir="rtl">dir 속성으로 정한 방향!</p>
<p id="css" class="css-rtl">CSS direction으로 정한 방향!</p>`,
          height: 170,
          checks: [
            { label: "위 문단의 direction", expr: "getComputedStyle(document.getElementById('attr')).direction" },
            { label: "아래 문단의 direction", expr: "getComputedStyle(document.getElementById('css')).direction" },
            { label: "위 문단이 :dir(rtl)에 맞나", expr: "document.getElementById('attr').matches(':dir(rtl)')" },
            { label: "아래 문단이 :dir(rtl)에 맞나", expr: "document.getElementById('css').matches(':dir(rtl)')" },
          ],
          tryIt: "아래 문단에 dir=\"rtl\"을 붙여 보세요. 마지막 줄도 true가 됩니다.",
        },
      },
      {
        label: "unicode-bidi",
        body: "direction과 함께, 방향이 섞인 글을 어떻게 다룰지 정합니다. 브라우저는 유니코드 양방향 알고리즘으로 글자 순서를 정합니다. 이 속성은 그 계산에 묶음과 격리를 더합니다.\n흔히 쓰는 값은 `isolate`입니다. 요소 안의 글이 바깥 문장의 순서를 흔들지 않게 떼어 냅니다. 아랍어 문장 속 영어 사용자 이름 같은 곳에 맞습니다.\n주의할 점이 있습니다. MDN은 이 속성이 문서 형식 설계자용이라며, 웹 작성자는 바꾸지 말라고 경고합니다. HTML의 dir 속성, `<bdi>`, `<bdo>`는 브라우저 기본 스타일로 이 값을 정해 둡니다. 또 이 장에서 유일하게 상속되지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소 (일부 값은 인라인에만 효과)", "안 됨", "안 됨"]],
          },
          {
            caption: "unicode-bidi의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "따로 묶지 않음. 요소 경계를 넘어 순서를 정함"],
              ["embed", "인라인 요소에 한 단계 묶음을 엶. 방향은 direction"],
              ["isolate", "바깥과 떼어 따로 계산. 바깥에선 그림 하나처럼 봄"],
              ["bidi-override", "알고리즘을 무시하고 direction 순서대로 늘어놓음"],
              ["isolate-override", "바깥으로는 isolate, 안으로는 bidi-override"],
              ["plaintext", "부모와 direction을 무시하고 내용으로 방향을 정함"],
            ],
          },
        ],
        code: "<!-- 이 속성을 직접 바꾸지 말고 HTML로: 기본 스타일이 unicode-bidi를 정해 준다 -->\n<p>작성자: <bdi>إيان</bdi> 님 (댓글 3개)</p>   <!-- bdi는 isolate -->\n<p><bdo dir=\"rtl\">거꾸로 그리기</bdo></p>       <!-- bdo는 isolate-override -->",
        codeLang: "html",
        terms: [
          {
            term: "양방향 텍스트 (bidi)",
            body: "왼쪽에서 오른쪽으로 쓰는 글과 그 반대로 쓰는 글이 한 줄에 섞인 것입니다. 브라우저는 유니코드 양방향 알고리즘으로 글자 순서를 정합니다. 마주 달리는 두 열차를 한 선로에 세우는 일과 같아서, 경계를 잘 나눠야 합니다.",
          },
        ],
      },
      {
        label: "text-orientation",
        body: "세로쓰기 안에서 글자를 어느 방향으로 세울지 정합니다. writing-mode가 horizontal-tb가 아닐 때만 효과가 있습니다.\n기본값 `mixed`는 한글, 한자 같은 세로 문자를 바로 세웁니다. 영어 같은 가로 문자는 시계 방향으로 90도 눕힙니다. `upright`는 가로 문자도 하나씩 세웁니다. 세로로 쓴 표 머리글에 쓸모가 있습니다.\n주의할 점이 있습니다. `upright`는 모든 글자를 왼쪽에서 오른쪽 글자로 봅니다. direction의 사용값이 ltr로 고정됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["mixed", "표의 행, 열, 행 묶음, 열 묶음을 뺀 모든 요소", "됨", "안 됨"]],
          },
          {
            caption: "text-orientation의 값",
            head: ["값", "하는 일"],
            rows: [
              ["mixed", "가로 문자는 눕히고 세로 문자는 세움"],
              ["upright", "모든 글자를 세움. direction은 ltr로"],
              ["sideways", "가로쓰기 줄을 통째로 시계 방향 90도 돌림"],
            ],
          },
        ],
        code: "th.vertical { writing-mode: vertical-rl; text-orientation: upright; }  /* 세로 머리글 */",
        codeLang: "css",
      },
      {
        label: "text-combine-upright",
        body: "세로쓰기 안에서 여러 글자를 한 글자 칸에 가로로 모아 넣습니다. 일본어로 다테추요코(縦中横)라 부르는 효과입니다. 세로쓰기에서만 효과가 있습니다.\n`2026년`, `12월`처럼 짧은 숫자에 씁니다. 숫자를 span으로 감싸고 그 span에 `all`을 줍니다. 모은 글자가 1em보다 넓으면 브라우저가 1em 안에 맞춰 줄입니다.\n주의할 점이 있습니다. 표준의 `digits 2` 같은 값은 아직 어느 브라우저도 지원하지 않습니다. 긴 글을 감싸면 한 칸에 눌려 읽을 수 없게 됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "대체 요소가 아닌 인라인 요소", "됨", "안 됨"]],
          },
          {
            caption: "text-combine-upright의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "따로 처리하지 않음"],
              ["all", "이어진 글자를 모두 한 글자 칸에 가로로"],
              ["digits 정수", "(지원 없음) 2~4자리 숫자만 모음"],
            ],
          },
        ],
        terms: [
          {
            term: "縦中横 (다테추요코)",
            body: "세로쓰기 속에 짧은 가로쓰기를 끼워 넣는 조판입니다. 두세 자리 숫자를 눕히지 않고 한 칸에 나란히 세웁니다. 세로 간판에 '24시'의 24를 한 칸에 나란히 적는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 숫자 넷을 한 칸에 모으기",
        body: "세로쓰기 문단 안의 `2026`을 span으로 감쌌습니다. 처음에는 `none`이라 숫자가 옆으로 누워 네 글자 길이를 차지합니다. 지금 값의 span height가 글자 크기보다 깁니다.\n`none`을 `all`로 바꿔 실행해 보세요. 네 숫자가 한 칸에 가로로 모여 똑바로 섭니다. span height는 글자 크기 쪽으로 줄어듭니다. 모은 글자를 1em 안에 맞춰 누르기 때문입니다.",
        lab: {
          html: `<style>
  p { writing-mode: vertical-rl; height: 200px; margin: 0; font-size: 20px; }
  .tcy { text-combine-upright: none; background: #fef3c7; }
</style>
<p>오늘은 <span class="tcy">2026</span>년 11월입니다.</p>`,
          height: 240,
          checks: [
            { label: "text-combine-upright", expr: "getComputedStyle(document.querySelector('.tcy')).textCombineUpright" },
            { label: "글자 크기", expr: "getComputedStyle(document.querySelector('.tcy')).fontSize" },
            { label: "span height", expr: "Math.round(document.querySelector('.tcy').getBoundingClientRect().height)" },
            { label: "span width", expr: "Math.round(document.querySelector('.tcy').getBoundingClientRect().width)" },
          ],
          tryIt: "none을 all로 바꾸고, 11도 span class=\"tcy\"로 감싸 보세요.",
        },
      },
      {
        label: "ruby-align",
        body: "루비 주석과 바탕 글자의 길이가 다를 때 남는 공간을 어떻게 나눌지 정합니다. 루비는 HTML의 `<ruby>`와 `<rt>`로 다는 작은 주석입니다.\n기본값 `space-around`는 남는 공간을 글자 사이와 양 끝에 나눕니다. `center`는 가운데로, `start`는 시작 쪽으로 붙입니다. 상속되므로 보통 ruby 요소에 적습니다.\n지원은 비교적 최근입니다. Chrome 128, Safari 18.2, Firefox 38부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["space-around", "루비 바탕, 루비 주석과 그 컨테이너", "됨", "계산값 타입대로"]],
          },
          {
            caption: "ruby-align의 값",
            head: ["값", "하는 일"],
            rows: [
              ["start", "바탕 글자의 시작에 맞춤"],
              ["center", "바탕 글자의 가운데에 맞춤"],
              ["space-between", "남는 공간을 글자 사이에만 나눔"],
              ["space-around", "남는 공간을 글자 사이와 양 끝에 나눔"],
            ],
          },
        ],
        terms: [
          {
            term: "루비 (ruby)",
            body: "바탕 글자 곁에 읽는 법이나 뜻을 작게 다는 주석입니다. 한자 위에 한글 읽기를 다는 것이 흔한 예입니다. 어린이 책에서 어려운 한자 위에 작게 적힌 읽기와 같습니다.",
          },
        ],
      },
      {
        label: "ruby-position",
        body: "루비 주석을 바탕 글자의 어느 쪽에 둘지 정합니다. 상속되므로 보통 ruby 요소에 적습니다.\n`over`는 가로쓰기에서 위, 세로쓰기에서 오른쪽입니다. `under`는 가로쓰기에서 아래, 세로쓰기에서 왼쪽입니다. 초기값 `alternate`는 주석이 여러 겹일 때 위와 아래를 번갈아 씁니다.\n`inter-character`는 바탕 글자의 오른쪽에 둡니다. 중국어 주음부호(보포모포) 주석을 위한 값입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["alternate", "루비 주석 컨테이너", "됨", "불연속"]],
          },
          {
            caption: "ruby-position의 값",
            head: ["값", "하는 일"],
            rows: [
              ["over", "가로쓰기는 위, 세로쓰기는 오른쪽"],
              ["under", "가로쓰기는 아래, 세로쓰기는 왼쪽"],
              ["alternate", "여러 겹이면 위와 아래를 번갈아"],
              ["inter-character", "글자의 오른쪽. 주음부호용"],
            ],
          },
        ],
        code: "<ruby>漢字<rt>한자</rt></ruby>\n<style> ruby { ruby-position: under; } </style>   <!-- 가로쓰기에서 읽기를 아래로 -->",
        codeLang: "html",
      },
      {
        label: "직접 해 보기: 루비를 위에서 아래로",
        body: "한자에 한글 읽기를 단 루비입니다. 지금 값은 rt가 바탕 글자의 어느 쪽에 있는지 위치로 잽니다. 처음에는 `over`라 '위'가 나옵니다.\n`over`를 `under`로 바꿔 실행하면 '아래'로 바뀝니다. 이어서 p에 `writing-mode: vertical-rl`을 더해 보세요. over는 '오른쪽', under는 '왼쪽'으로 나옵니다. 같은 값이라도 쓰기 모드에 따라 놓이는 쪽이 달라집니다.",
        lab: {
          html: `<style>
  p { font-size: 28px; }
  ruby { ruby-position: over; }
  rt { color: #b45309; }
</style>
<p><ruby><span id="base">漢字</span><rt>한자</rt></ruby>를 읽습니다.</p>`,
          height: 200,
          checks: [
            { label: "ruby-position", expr: "getComputedStyle(document.querySelector('ruby')).rubyPosition" },
            { label: "rt는 바탕 글자의", expr: "(() => { const a = document.querySelector('rt').getBoundingClientRect(); const b = document.getElementById('base').getBoundingClientRect(); const dx = (a.left + a.right - b.left - b.right) / 2; const dy = (a.top + a.bottom - b.top - b.bottom) / 2; return Math.abs(dy) >= Math.abs(dx) ? (dy < 0 ? '위' : '아래') : (dx > 0 ? '오른쪽' : '왼쪽'); })()" },
          ],
          tryIt: "over를 under로 바꾸고, p에 writing-mode: vertical-rl을 더해 보세요.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "쓰기 모드와 방향에서 자주 보는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["세로쓰기 상자의 줄 길이를 width로 정함", "width는 블록 방향이라 줄 길이가 안 바뀜", "inline-size, block-size 쓰기"],
              ["CSS `direction: rtl`로만 방향을 정함", "`:dir(rtl)`이 맞지 않음", "HTML의 dir 속성 쓰기"],
              ["아랍어 문장에 영어 이름을 그냥 넣음", "이름 뒤의 부호와 숫자 순서가 뒤섞임", "`<bdi>`나 dir=\"auto\"로 떼어 내기"],
              ["세로쓰기 속 숫자 `2026`을 그대로 둠", "숫자가 옆으로 누움", "span으로 감싸 text-combine-upright: all"],
              ["text-combine-upright로 긴 글을 감쌈", "한 칸에 눌려 읽을 수 없음", "두세 자리 숫자에만 쓰기"],
              ["`text-combine-upright: digits 2`", "지원하는 브라우저가 없어 효과 없음", "span에 all 쓰기"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `vertical-rl`에서 `inline-size: 10em`은 화면의 너비와 높이 가운데 어느 쪽일까요?\n2) `direction: rtl`보다 dir 속성을 권하는 까닭을 `:dir()`로 설명해 보세요.\n3) 세로쓰기 속 `12`를 한 칸에 세우려면 어디에 무엇을 적을까요?\n4) 세로쓰기에서 `ruby-position: over`의 주석은 어느 쪽에 놓일까요?",
      },
    ],
    sources: [
      { label: "MDN — writing-mode", href: `${MDN}/Reference/Properties/writing-mode` },
      { label: "MDN — direction", href: `${MDN}/Reference/Properties/direction` },
      { label: "MDN — unicode-bidi", href: `${MDN}/Reference/Properties/unicode-bidi` },
      { label: "MDN — text-combine-upright", href: `${MDN}/Reference/Properties/text-combine-upright` },
      { label: "MDN — ruby-position", href: `${MDN}/Reference/Properties/ruby-position` },
      { label: "MDN — CSS writing modes", href: `${MDN}/Guides/Writing_modes` },
    ],
  },
  {
    id: "css-prop-text",
    name: "글자와 줄바꿈 속성",
    tagline: "글자는 꾸미고, 줄은 공백과 낱말 규칙으로 나눈다",
    intro:
      "글자 색과 밑줄은 어떤 속성이 정할까요? 한국어 문장이 어절 중간에서 끊기거나, 말줄임표가 나오지 않는 까닭은 무엇일까요? 이 장은 글자를 꾸미는 속성과 줄바꿈을 정하는 속성 32개를 표로 정리합니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "글자 모양을 꾸미는 속성과, 줄을 어디서 바꿀지 정하는 속성을 모았습니다. `text-decoration`과 그 풀어 쓴 네 속성, `text-overflow`, `-webkit-line-clamp`, `vertical-align`만 상속되지 않습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["color", "글자와 장식선의 색", "canvastext", "됨", ""],
              ["text-align", "줄 안의 인라인 내용을 가로로 정렬", "start", "됨", ""],
              ["text-indent", "첫 줄 들여쓰기", "0", "됨", ""],
              ["text-transform", "대소문자 바꿔 보이기", "none", "됨", ""],
              ["letter-spacing", "글자 사이 간격", "normal", "됨", ""],
              ["word-spacing", "낱말 사이 간격", "normal", "됨", ""],
              ["text-decoration", "장식선 단축 속성", "풀어 쓴 속성 각각", "안 됨", ""],
              ["text-decoration-line", "밑줄, 윗줄, 취소선 고르기", "none", "안 됨", ""],
              ["text-decoration-style", "장식선 모양", "solid", "안 됨", ""],
              ["text-decoration-color", "장식선 색", "currentcolor", "안 됨", ""],
              ["text-decoration-thickness", "장식선 두께", "auto", "안 됨", ""],
              ["text-decoration-skip-ink", "획을 피해 선 끊기", "auto", "됨", ""],
              ["text-underline-position", "밑줄 위치", "auto", "됨", ""],
              ["text-underline-offset", "밑줄까지 거리", "auto", "됨", ""],
              ["text-shadow", "글자 그림자", "none", "됨", ""],
              ["text-emphasis", "강조 표시 단축 속성", "풀어 쓴 속성 각각", "됨", ""],
              ["text-emphasis-style", "강조 표시 모양", "none", "됨", ""],
              ["text-emphasis-color", "강조 표시 색", "currentcolor", "됨", ""],
              ["text-emphasis-position", "강조 표시 위치", "auto", "됨", ""],
              ["-webkit-text-stroke", "글자 윤곽선 단축 속성", "풀어 쓴 속성 각각", "됨", ""],
              ["-webkit-text-stroke-width", "윤곽선 두께", "0", "됨", ""],
              ["-webkit-text-stroke-color", "윤곽선 색", "currentcolor", "됨", ""],
              ["white-space", "공백 합치기와 자동 줄바꿈", "normal", "됨", "13장 · 글꼴과 텍스트"],
              ["word-break", "낱말 안 줄바꿈 (한국어 어절)", "normal", "됨", "13장 · 글꼴과 텍스트"],
              ["overflow-wrap", "넘칠 때만 긴 낱말 끊기", "normal", "됨", "13장 · 글꼴과 텍스트"],
              ["line-break", "한중일 문장 부호 앞뒤 줄바꿈", "auto", "됨", ""],
              ["hyphens", "하이픈 넣어 끊기", "manual", "됨", "13장 · 글꼴과 텍스트"],
              ["text-wrap", "줄 나누는 방식 (balance, pretty)", "wrap", "됨", "13장 · 글꼴과 텍스트"],
              ["text-overflow", "넘친 글 알리기 (말줄임표)", "clip", "안 됨", "9장 · 오버플로와 크기"],
              ["-webkit-line-clamp", "몇 줄까지 보일지", "none", "안 됨", "9장 · 오버플로와 크기"],
              ["vertical-align", "인라인과 표 칸의 세로 정렬", "baseline", "안 됨", "5장 · 디스플레이와 흐름"],
              ["text-size-adjust (실험)", "모바일 글자 부풀림 조절", "auto 또는 none", "됨", ""],
            ],
          },
        ],
      },
      {
        label: "color",
        body: "`color`는 글자와 밑줄 같은 글자 장식의 색을 정합니다. 이 값은 `currentColor`라는 낱말로 다른 속성에서 다시 쓸 수 있습니다. `border-color`, `text-decoration-color` 같은 색 속성의 기본값이 `currentColor`입니다. 그래서 `color` 하나만 바꿔도 테두리와 밑줄이 따라 바뀝니다.\n글자와 배경의 대비가 낮으면 읽기 어렵습니다. WCAG는 본문 글자에 4.5:1, 큰 글자에 3:1 이상의 대비를 요구합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["canvastext", "모든 요소와 글자", "됨", "색으로 보간"]],
          },
          {
            caption: "color의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<color>", "글자와 장식선의 색"],
              ["currentColor", "`color`에 쓰면 inherit처럼 부모 색을 받음"],
            ],
          },
        ],
        terms: [
          {
            term: "currentColor",
            body: "그 요소의 `color` 값을 가리키는 낱말입니다. 테두리, 장식선, 강조 표시, 윤곽선 색의 기본값이 이것입니다. '내 글자 색과 같은 색으로'라고 적어 두는 메모와 같습니다.",
          },
        ],
      },
      {
        label: "text-align",
        body: "`text-align`은 블록 안에서 줄마다 인라인 내용을 가로로 어디에 둘지 정합니다. 블록 자신은 옮기지 않습니다. 블록을 가운데 두려면 `margin-inline: auto`나 플렉스를 씁니다(6장). `start`와 `end`는 글 방향(`direction`)을 따릅니다. 그래서 오른쪽에서 왼쪽으로 쓰는 언어에서도 맞게 뒤집힙니다. `justify`는 낱말 사이를 늘려 양 끝을 맞춥니다. 간격이 고르지 않아 난독증이 있는 사람은 읽기 어려울 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["start", "블록 컨테이너", "됨", "불연속"]],
          },
          {
            caption: "text-align의 값",
            head: ["값", "하는 일"],
            rows: [
              ["start", "글 방향의 시작 쪽 (ltr이면 왼쪽)"],
              ["end", "글 방향의 끝 쪽 (ltr이면 오른쪽)"],
              ["left", "줄 상자의 왼쪽 끝"],
              ["right", "줄 상자의 오른쪽 끝"],
              ["center", "줄 상자의 가운데"],
              ["justify", "양 끝 맞춤. 마지막 줄은 빼고"],
              ["match-parent", "inherit처럼 받되 start, end를 부모 방향으로 left, right로 바꿈"],
            ],
          },
        ],
      },
      {
        label: "text-indent",
        body: "`text-indent`는 블록의 첫 줄 앞에 빈 공간을 둡니다. 퍼센트는 블록 콘텐츠 영역의 인라인 폭이 기준입니다. 음수를 주면 첫 줄이 앞으로 튀어나오는 내어쓰기가 됩니다. 이때 글이 패딩이나 상자 밖으로 나갈 수 있습니다. `hanging`은 거꾸로 첫 줄만 빼고 나머지 줄을 들입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "블록 컨테이너", "됨", "길이, 퍼센트로 보간"]],
          },
          {
            caption: "text-indent의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<length>", "들여쓸 길이. 음수면 내어쓰기"],
              ["<percentage>", "콘텐츠 영역 인라인 폭에 대한 비율"],
              ["each-line", "첫 줄과 강제 줄바꿈(<br>) 뒤의 줄도 들임"],
              ["hanging", "첫 줄을 뺀 나머지 줄을 들임"],
            ],
          },
        ],
      },
      {
        label: "text-transform",
        body: "`text-transform`은 글자의 대소문자를 바꿔 보여 줍니다. DOM의 글자는 그대로이고 그려지는 모양만 바뀝니다. 대소문자 규칙은 언어마다 달라서 `lang` 속성을 따릅니다. 예를 들어 독일어 `ß`는 대문자로 `SS`가 됩니다. 한글은 대소문자가 없어 바뀌지 않습니다. 긴 글을 모두 대문자로 쓰면 난독증이 있는 사람은 읽기 어렵습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "text-transform의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "바꾸지 않음"],
              ["capitalize", "낱말마다 첫 글자만 대문자. 영어 제목 규칙과는 다름"],
              ["uppercase", "모두 대문자"],
              ["lowercase", "모두 소문자"],
              ["full-width", "전각 글자로 바꿔 동아시아 글자와 칸을 맞춤"],
              ["full-size-kana", "작은 가나를 보통 크기 가나로 (루비용)"],
              ["math-auto", "한 글자짜리 글을 수학 이탤릭으로 (x는 바뀌고 sin은 그대로)"],
            ],
          },
        ],
      },
      {
        label: "letter-spacing, word-spacing",
        body: "`letter-spacing`은 글자 사이에, `word-spacing`은 낱말 사이에 간격을 더합니다. 값은 글꼴의 원래 간격에 더해지고, 음수면 좁아집니다. `letter-spacing: normal`은 0과 다릅니다. `normal`이면 양쪽 맞춤 때 브라우저가 글자 간격을 조절할 수 있습니다. 0이 아닌 `letter-spacing`은 선택 합자(liga 등)를 끕니다. 아랍 문자처럼 글자가 이어지는 문자에 `letter-spacing`을 주면 글자가 끊겨 보입니다.",
        tables: [
          {
            caption: "정의",
            head: ["속성", "초기값", "적용 대상", "상속", "애니메이션"],
            rows: [
              ["letter-spacing", "normal", "모든 요소", "됨", "길이로 보간"],
              ["word-spacing", "normal", "모든 요소", "됨", "길이로 보간"],
            ],
          },
          {
            caption: "letter-spacing, word-spacing의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "글꼴과 브라우저의 기본 간격"],
              ["<length>", "기본 간격에 더할 길이. 음수도 됨"],
              ["<percentage>", "letter-spacing은 공백 글자 폭, word-spacing은 글자 크기에 대한 비율"],
            ],
          },
        ],
      },
      {
        label: "text-decoration",
        body: "단축 속성입니다. 풀어 쓰면 `text-decoration-line`, `text-decoration-style`, `text-decoration-color`, `text-decoration-thickness`입니다. 값의 순서는 자유입니다. 장식선은 상속되지 않지만 자손 글자 위로 이어 그려집니다. 그래서 부모의 밑줄을 자식의 `text-decoration: none`으로 지울 수 없습니다. `text-underline-offset`, `text-underline-position`, `text-decoration-skip-ink`는 이 단축 속성에 들어 있지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["풀어 쓴 속성 각각", "모든 요소", "안 됨", "풀어 쓴 속성 각각"]],
          },
        ],
        code: `/* line, style, color, thickness 순서로 적었지만 순서는 자유입니다 */
a { text-decoration: underline wavy #d33 2px; }

/* 풀어 쓰면 */
a {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: #d33;
  text-decoration-thickness: 2px;
}`,
        codeLang: "css",
      },
      {
        label: "text-decoration-line, -style, -color",
        body: "`text-decoration-line`은 선의 종류를 고릅니다. 여러 개를 함께 적을 수도 있습니다(`underline overline`). `text-decoration-style`은 선 모양을, `text-decoration-color`는 선 색을 정합니다. 색은 기본으로 글자 색(`currentColor`)을 따릅니다. 취소선이 '지운 글'이라는 뜻이면 `<del>`이나 `<s>` 요소로 적습니다. 스타일이 꺼져도 뜻은 남기 때문입니다. 색만으로 뜻을 전해서도 안 됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["속성", "초기값", "적용 대상", "상속", "애니메이션"],
            rows: [
              ["text-decoration-line", "none", "모든 요소", "안 됨", "불연속"],
              ["text-decoration-style", "solid", "모든 요소", "안 됨", "불연속"],
              ["text-decoration-color", "currentcolor", "모든 요소", "안 됨", "색으로 보간"],
            ],
          },
          {
            caption: "text-decoration-line의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "장식선 없음"],
              ["underline", "줄마다 글자 아래에 선"],
              ["overline", "줄마다 글자 위에 선"],
              ["line-through", "줄마다 글자 가운데를 지나는 선 (취소선)"],
              ["spelling-error", "브라우저의 맞춤법 오류 표시를 씀"],
              ["grammar-error", "브라우저의 문법 오류 표시를 씀"],
            ],
          },
          {
            caption: "text-decoration-style의 값",
            head: ["값", "하는 일"],
            rows: [
              ["solid", "한 줄"],
              ["double", "두 줄"],
              ["dotted", "점선"],
              ["dashed", "끊은 선"],
              ["wavy", "물결선"],
            ],
          },
        ],
      },
      {
        label: "text-decoration-thickness, -skip-ink",
        body: "`text-decoration-thickness`는 장식선의 두께입니다. 퍼센트는 그 글꼴의 1em에 대한 비율이라 글자 크기를 따라 커집니다. 브라우저는 적어도 기기 픽셀 하나 두께로 그립니다. `text-decoration-skip-ink`는 밑줄과 윗줄이 g, p 같은 글자의 획을 지날 때 끊을지 정합니다. 한중일 글꼴은 `auto`에서 끊기지 않을 수 있어 `all`이 도움이 됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["속성", "초기값", "적용 대상", "상속", "애니메이션"],
            rows: [
              ["text-decoration-thickness", "auto", "모든 요소", "안 됨", "계산값 종류대로"],
              ["text-decoration-skip-ink", "auto", "모든 요소", "됨", "불연속"],
            ],
          },
          {
            caption: "text-decoration-thickness의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 알맞은 두께를 고름"],
              ["from-font", "글꼴 파일의 권장 두께. 없으면 auto"],
              ["<length>", "그 길이로 그림"],
              ["<percentage>", "그 글꼴 1em에 대한 비율"],
            ],
          },
          {
            caption: "text-decoration-skip-ink의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "획 가까이에서 선을 끊어도 됨"],
              ["all", "획 가까이에서 반드시 끊음"],
              ["none", "끊지 않고 끝까지 그음"],
            ],
          },
        ],
      },
      {
        label: "text-underline-position, -offset",
        body: "둘 다 밑줄(`underline`)에만 작용합니다. 상속되고, `text-decoration` 단축 속성이 되돌리지 않습니다. 그래서 문서 전체에 한 번 정해 두기 좋습니다. `text-underline-position: under`는 밑줄을 글자의 내림 획 아래로 내립니다. 아래 첨자가 많은 화학식이나 수식이 읽기 쉬워집니다. `text-underline-offset`은 원래 자리에서 밑줄까지의 거리입니다. 글자 크기를 따라가도록 em 단위를 권합니다.",
        tables: [
          {
            caption: "정의",
            head: ["속성", "초기값", "적용 대상", "상속", "애니메이션"],
            rows: [
              ["text-underline-position", "auto", "모든 요소", "됨", "불연속"],
              ["text-underline-offset", "auto", "모든 요소", "됨", "계산값 종류대로"],
            ],
          },
          {
            caption: "text-underline-position의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 기준선 근처나 아래에 둠"],
              ["from-font", "글꼴 파일의 권장 위치. 없으면 auto"],
              ["under", "내림 획에 닿지 않게 기준선 아래로"],
              ["left, right", "세로쓰기에서 글자의 왼쪽, 오른쪽. 가로쓰기에서는 auto"],
            ],
          },
          {
            caption: "text-underline-offset의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 고름"],
              ["<length>", "원래 자리에서 그만큼 떨어뜨림"],
              ["<percentage>", "그 글꼴 1em에 대한 비율"],
            ],
          },
        ],
      },
      {
        label: "text-shadow",
        body: "`text-shadow`는 글자와 그 장식선에 그림자를 붙입니다. 그림자 하나는 x 거리, y 거리, 흐림 반경, 색으로 적습니다. 쉼표로 여러 개를 적으면 먼저 적은 것이 위에 그려집니다. 색을 빼면 브라우저가 정하므로 늘 적어 둡니다. `box-shadow`와 달리 퍼짐(spread)과 `inset`이 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "됨", "그림자 목록으로 보간"]],
          },
          {
            caption: "text-shadow의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<offset-x> <offset-y>", "가로, 세로 거리 (꼭 적음). 음수면 왼쪽, 위"],
              ["<blur-radius>", "흐림 반경. 빼면 0"],
              ["<color>", "그림자 색. 거리 앞이나 뒤에 적음"],
            ],
          },
        ],
        code: `/* 먼저 적은 그림자가 위에 그려집니다 */
h1 { text-shadow: 1px 1px 2px #0006, 0 0 1em #39f; }`,
        codeLang: "css",
      },
      {
        label: "text-emphasis",
        body: "단축 속성입니다. 풀어 쓰면 `text-emphasis-style`, `text-emphasis-color`입니다. 드러냄표처럼 글자마다 작은 강조 표시를 찍습니다. 공백과 제어 문자에는 찍지 않습니다. `text-decoration`과 달리 상속되므로 자손에서 바꿀 수 있습니다. 표시는 글자 크기의 절반쯤이라, 줄 간격이 모자라면 줄 높이가 늘어납니다. 위치(`text-emphasis-position`)는 이 단축 속성이 되돌리지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["풀어 쓴 속성 각각", "모든 요소", "됨", "풀어 쓴 속성 각각"]],
          },
        ],
        code: `/* style, color 순서는 자유입니다 */
em.ko { font-style: normal; text-emphasis: filled dot #e33; }

/* 풀어 쓰면 */
em.ko {
  text-emphasis-style: filled dot;
  text-emphasis-color: #e33;
}`,
        codeLang: "css",
      },
      {
        label: "text-emphasis-style, -color, -position",
        body: "`text-emphasis-style`은 모양과 채움을, `text-emphasis-color`는 색을, `text-emphasis-position`은 위치를 정합니다. 모양만 적으면 `filled`가 붙습니다. 채움만 적으면 가로쓰기는 `circle`, 세로쓰기는 `sesame`가 모양이 됩니다. 알맞은 위치는 언어마다 다릅니다. 한국어와 일본어는 가로쓰기에서 위(`over`), 중국어는 아래(`under`)입니다.",
        tables: [
          {
            caption: "정의",
            head: ["속성", "초기값", "적용 대상", "상속", "애니메이션"],
            rows: [
              ["text-emphasis-style", "none", "모든 요소", "됨", "불연속"],
              ["text-emphasis-color", "currentcolor", "모든 요소", "됨", "색으로 보간"],
              ["text-emphasis-position", "auto", "모든 요소", "됨", "불연속"],
            ],
          },
          {
            caption: "text-emphasis-style의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "표시 없음"],
              ["filled, open", "속을 채운 모양, 속이 빈 모양"],
              ["dot", "작은 원 (•, ◦)"],
              ["circle", "큰 원 (●, ○)"],
              ["double-circle", "겹원 (◉, ◎)"],
              ["triangle", "세모 (▲, △)"],
              ["sesame", "깨 모양 (﹅, ﹆)"],
              ["<string>", "그 글자 하나를 표시로 씀"],
            ],
          },
          {
            caption: "text-emphasis-position의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "가로쓰기는 위, 세로쓰기는 오른쪽"],
              ["over, under", "가로쓰기에서 글자 위, 아래"],
              ["right, left", "세로쓰기에서 글자 오른쪽, 왼쪽"],
            ],
          },
        ],
      },
      {
        label: "-webkit-text-stroke, -width, -color",
        body: "단축 속성입니다. 풀어 쓰면 `-webkit-text-stroke-width`, `-webkit-text-stroke-color`입니다. 글자 획의 윤곽을 따라 선을 긋습니다. 이름에 접두사가 있지만 Chrome 4, Safari 3, Firefox 49부터 지원합니다. 색을 빼면 글자 색(`color`)을 씁니다. 속이 빈 윤곽 글씨는 `-webkit-text-fill-color: transparent`와 함께 만듭니다. 세 속성 모두 상속됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["속성", "초기값", "적용 대상", "상속", "애니메이션"],
            rows: [
              ["-webkit-text-stroke", "풀어 쓴 속성 각각", "모든 요소", "됨", "풀어 쓴 속성 각각"],
              ["-webkit-text-stroke-width", "0", "모든 요소", "됨", "불연속"],
              ["-webkit-text-stroke-color", "currentcolor", "모든 요소", "됨", "색으로 보간"],
            ],
          },
        ],
        code: `/* width, color 순서는 자유입니다 */
.outline { -webkit-text-stroke: 1px #333; -webkit-text-fill-color: transparent; }

/* 풀어 쓰면 */
.outline {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #333;
}`,
        codeLang: "css",
      },
      {
        label: "white-space",
        body: "단축 속성입니다. 풀어 쓰면 `white-space-collapse`, `text-wrap-mode`입니다. 앞의 것은 공백과 줄바꿈 문자를 합칠지, 뒤의 것은 상자 끝에서 자동으로 줄을 바꿀지 정합니다. 기본값 `normal`은 공백 여러 칸과 줄바꿈 문자를 공백 하나로 합칩니다. 줄 끝 공백이 '매달린다'는 말은 그 공백이 줄 길이 계산에 들지 않는다는 뜻입니다. 낱말 안에서 끊는 일은 이 속성이 아니라 `word-break`, `overflow-wrap`, `hyphens`가 맡습니다. 탭은 기본 8칸이고 `tab-size`로 바꿉니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "white-space의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "공백과 줄바꿈을 합치고 자동 줄바꿈 (collapse wrap)"],
              ["pre", "모두 지키고 자동 줄바꿈 없음 (preserve nowrap)"],
              ["pre-wrap", "모두 지키고 자동 줄바꿈 (preserve wrap)"],
              ["pre-line", "줄바꿈만 지키고 공백은 합침 (preserve-breaks wrap)"],
              ["nowrap", "공백을 합치고 자동 줄바꿈 없음 (collapse nowrap)"],
            ],
          },
          {
            caption: "네 값 견주기",
            head: ["값", "줄바꿈 문자", "공백과 탭", "자동 줄바꿈", "줄 끝 공백"],
            rows: [
              ["normal", "합침", "합침", "함", "지움"],
              ["pre", "지킴", "지킴", "안 함", "지킴"],
              ["pre-wrap", "지킴", "지킴", "함", "매달림"],
              ["pre-line", "지킴", "합침", "함", "지움"],
            ],
          },
        ],
        code: `pre  { white-space: pre; }             /* 특수 낱말 하나 */
.tag { white-space: collapse nowrap; } /* 풀어 쓴 두 값을 순서 없이 */

/* 풀어 쓰면 */
.tag {
  white-space-collapse: collapse;
  text-wrap-mode: nowrap;
}`,
        codeLang: "css",
        terms: [
          {
            term: "줄바꿈 기회 (soft wrap opportunity)",
            body: "브라우저가 자동으로 줄을 바꿔도 되는 자리입니다. 영어는 주로 공백이고, 한국어는 기본값에서 글자 사이 어디나입니다. `word-break`, `overflow-wrap`, `line-break`가 이 자리를 늘리거나 줄입니다. 원고지에 '여기서 줄을 넘겨도 됨'이라고 연필로 찍어 둔 표시와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: white-space 네 값",
        body: "네 상자에 같은 글을 넣고 `white-space`만 다르게 했습니다. 글에는 공백 세 칸과 줄바꿈 문자가 있고, 첫 줄은 상자보다 깁니다. 지금 값은 상자마다 계산된 값, scrollWidth / clientWidth, 줄 수를 보입니다. scrollWidth가 clientWidth보다 크면 글이 상자 밖으로 넘친 것입니다.\n`pre`만 넘칩니다. 원문 줄바꿈에서만 줄을 바꾸기 때문입니다. `normal`은 줄바꿈 문자를 공백으로 합쳐 원문의 줄 경계가 사라집니다. `pre-wrap`과 `pre-line`은 원문 줄바꿈을 지키면서 상자 끝에서도 줄을 바꿉니다. 공백 세 칸은 `pre`와 `pre-wrap`에서만 그대로 보입니다.",
        lab: {
          html: `<style>
  .b { width: 220px; border: 1px solid #aaa; margin: 4px 0; font-size: 14px; }
</style>
<div class="b" style="white-space: normal">공백   세 칸, 그리고 상자보다 훨씬 긴 첫 줄입니다
둘째 줄</div>
<div class="b" style="white-space: pre">공백   세 칸, 그리고 상자보다 훨씬 긴 첫 줄입니다
둘째 줄</div>
<div class="b" style="white-space: pre-wrap">공백   세 칸, 그리고 상자보다 훨씬 긴 첫 줄입니다
둘째 줄</div>
<div class="b" style="white-space: pre-line">공백   세 칸, 그리고 상자보다 훨씬 긴 첫 줄입니다
둘째 줄</div>`,
          height: 260,
          tryIt: "둘째 상자의 style을 white-space: nowrap으로 바꿔 보세요. 넘침은 남고, 공백 세 칸과 줄바꿈 문자가 공백 하나로 합쳐져 한 줄이 됩니다.",
          checks: [
            {
              label: "상자 1",
              expr: "(b => getComputedStyle(b).whiteSpace + ', ' + b.scrollWidth + ' / ' + b.clientWidth + ', ' + Math.round(b.clientHeight / parseFloat(getComputedStyle(b).lineHeight)) + '줄')(document.querySelectorAll('.b')[0])",
            },
            {
              label: "상자 2",
              expr: "(b => getComputedStyle(b).whiteSpace + ', ' + b.scrollWidth + ' / ' + b.clientWidth + ', ' + Math.round(b.clientHeight / parseFloat(getComputedStyle(b).lineHeight)) + '줄')(document.querySelectorAll('.b')[1])",
            },
            {
              label: "상자 3",
              expr: "(b => getComputedStyle(b).whiteSpace + ', ' + b.scrollWidth + ' / ' + b.clientWidth + ', ' + Math.round(b.clientHeight / parseFloat(getComputedStyle(b).lineHeight)) + '줄')(document.querySelectorAll('.b')[2])",
            },
            {
              label: "상자 4",
              expr: "(b => getComputedStyle(b).whiteSpace + ', ' + b.scrollWidth + ' / ' + b.clientWidth + ', ' + Math.round(b.clientHeight / parseFloat(getComputedStyle(b).lineHeight)) + '줄')(document.querySelectorAll('.b')[3])",
            },
          ],
        },
      },
      {
        label: "word-break",
        body: "`word-break`는 글이 상자를 넘칠 때 낱말 안에서도 줄을 바꿀지 정합니다. 한중일(CJK) 글은 기본값 `normal`에서 글자 사이 어디서나 줄을 바꿀 수 있습니다. 그래서 한국어 문장이 어절 중간에서 끊깁니다. `keep-all`은 한중일 글도 띄어쓰기에서만 줄을 바꿔 어절을 지킵니다. 다만 띄어쓰기 없는 긴 문자열은 끊을 곳이 없어 넘칩니다. 그래서 `overflow-wrap: anywhere`를 함께 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "word-break의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "기본 규칙. 한중일은 글자 사이, 영어는 공백에서"],
              ["break-all", "한중일이 아닌 글도 글자 사이 어디서나 끊음"],
              ["keep-all", "한중일 글도 낱말(어절) 안에서 끊지 않음"],
              ["auto-phrase", "normal에 언어 분석을 더해 구의 중간을 피함"],
              ["break-word", "`overflow-wrap: anywhere`와 normal을 함께 준 것과 같음"],
            ],
          },
        ],
        code: `/* 한국어 본문: 어절을 지키고, 긴 URL은 넘칠 때만 끊는다 */
:lang(ko) { word-break: keep-all; overflow-wrap: anywhere; }`,
        codeLang: "css",
        terms: [
          {
            term: "CJK",
            body: "중국어(Chinese), 일본어(Japanese), 한국어(Korean)를 묶어 부르는 말입니다. 띄어쓰기 없이 써도 글자 사이에서 줄을 바꾸는 관례를 나눕니다. 한국어는 띄어쓰기가 있어 어절을 지키는 쪽도 고를 수 있습니다. 같은 원고지 습관을 쓰는 이웃 셋을 한 반으로 묶은 이름표와 같습니다.",
          },
          {
            term: "어절",
            body: "띄어쓰기로 나뉜 한 덩어리입니다. '번역을'처럼 낱말에 조사가 붙은 단위입니다. `keep-all`은 어절 안에서 줄을 바꾸지 않습니다. 기차의 객차 한 칸처럼, 칸 사이는 떼어도 칸 가운데는 자르지 않습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: keep-all과 한국어 어절",
        body: "같은 한국어 문장을 두 상자에 넣고, 아래 상자에만 `word-break: keep-all`을 주었습니다. 상자 폭은 작은 창의 50%입니다. 그래서 폭 버튼을 누르면 줄바꿈이 바뀝니다. 지금 값은 상자마다 줄 수와 '어절 중간에서 끊긴 곳'의 수를 셉니다. 끊긴 곳은 새 줄의 첫 글자 바로 앞이 공백이 아닌 자리입니다.\n위 상자는 끊긴 곳이 생길 수 있고, 아래 상자는 늘 0입니다. 대신 아래 상자는 줄 끝이 들쭉날쭉하고, 줄 수가 같거나 늘어납니다.",
        lab: {
          html: `<style>
  .k { width: 50%; border: 1px solid #aaa; margin: 6px 0; font-size: 16px; }
  #keep { word-break: keep-all; }
</style>
<div class="k" id="normal">다국어 서비스는 번역할 문자열을 코드에서 분리하는 일부터 시작합니다.</div>
<div class="k" id="keep">다국어 서비스는 번역할 문자열을 코드에서 분리하는 일부터 시작합니다.</div>`,
          height: 220,
          widths: [320, 480, 640],
          tryIt: "아래 상자에 띄어쓰기 없는 긴 낱말(예: 국제화현지화자동화도구모음)을 넣고 폭을 320으로 줄여 보세요. 넘침이 true가 되면 #keep에 overflow-wrap: anywhere를 더합니다.",
          checks: [
            {
              label: "위(normal): 줄 수, 끊긴 곳",
              expr: "(el => { const t = el.firstChild, r = document.createRange(); let top = null, cut = 0; for (let i = 0; i < t.length; i++) { r.setStart(t, i); r.setEnd(t, i + 1); const y = Math.round(r.getBoundingClientRect().top); if (top !== null && y > top + 2 && t.data[i] !== ' ' && t.data[i - 1] !== ' ') cut++; if (t.data[i] !== ' ') top = y; } return Math.round(el.clientHeight / parseFloat(getComputedStyle(el).lineHeight)) + '줄, 끊긴 곳 ' + cut; })(document.getElementById('normal'))",
            },
            {
              label: "아래(keep-all): 줄 수, 끊긴 곳",
              expr: "(el => { const t = el.firstChild, r = document.createRange(); let top = null, cut = 0; for (let i = 0; i < t.length; i++) { r.setStart(t, i); r.setEnd(t, i + 1); const y = Math.round(r.getBoundingClientRect().top); if (top !== null && y > top + 2 && t.data[i] !== ' ' && t.data[i - 1] !== ' ') cut++; if (t.data[i] !== ' ') top = y; } return Math.round(el.clientHeight / parseFloat(getComputedStyle(el).lineHeight)) + '줄, 끊긴 곳 ' + cut; })(document.getElementById('keep'))",
            },
            {
              label: "아래 상자의 word-break, 넘침",
              expr: "(el => getComputedStyle(el).wordBreak + ', 넘침 ' + (el.scrollWidth > el.clientWidth))(document.getElementById('keep'))",
            },
          ],
        },
      },
      {
        label: "overflow-wrap",
        body: "`overflow-wrap`은 낱말 하나가 한 줄에도 다 들어가지 않을 때만 그 낱말 안을 끊습니다. 긴 URL이나 띄어쓰기 없는 문자열에 씁니다. `word-break: break-all`은 넘치는 바로 그 자리에서 끊는다는 점이 다릅니다. 옛 이름은 `word-wrap`이고, 지금도 별칭으로 동작합니다.\n`anywhere`와 `break-word`는 끊는 모양이 같습니다. 다른 점은 최소 콘텐츠 폭 계산입니다. `anywhere`는 끊을 자리를 계산에 넣습니다. 그래서 플렉스 아이템, 표 칸처럼 내용에 맞춰 줄어드는 상자가 더 좁아질 수 있습니다. `break-word`는 넣지 않아서, 그런 상자가 긴 낱말 폭 아래로 줄지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "글자", "됨", "불연속"]],
          },
          {
            caption: "overflow-wrap의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "공백 같은 보통 자리에서만 끊음"],
              ["anywhere", "넘칠 때 어디서나 끊음. 최소 콘텐츠 폭에 반영"],
              ["break-word", "끊는 모양은 anywhere와 같음. 최소 콘텐츠 폭에는 반영 안 함"],
            ],
          },
        ],
        terms: [
          {
            term: "최소 콘텐츠 폭 (min-content)",
            body: "줄바꿈 기회를 모두 써서 줄을 바꿀 때 내용이 차지하는 가장 좁은 폭입니다. 플렉스 아이템과 표 칸은 이 폭 아래로 잘 줄지 않습니다(9장). 이삿짐을 가장 좁게 쌓았을 때의 폭이라고 생각하면 됩니다.",
          },
        ],
      },
      {
        label: "line-break",
        body: "`line-break`는 한중일 글에서 문장 부호와 기호 앞뒤로 줄을 바꿀 때의 엄격함을 정합니다. MDN 예제는 일본어의 `々`, `ぁ`, `。` 앞에서 줄이 바뀌는지를 견줍니다. 규칙의 세부는 언어와 브라우저마다 다릅니다. `anywhere`는 모든 금지를 무시하고 글자마다 줄을 바꿀 수 있게 합니다. `word-break`가 막은 자리도 무시합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "line-break의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "기본 규칙"],
              ["loose", "가장 느슨한 규칙. 신문처럼 짧은 줄에"],
              ["normal", "가장 흔한 규칙"],
              ["strict", "가장 엄격한 규칙"],
              ["anywhere", "문장 부호를 포함해 글자마다 줄바꿈 가능. 하이픈 없음"],
            ],
          },
        ],
      },
      {
        label: "hyphens",
        body: "`hyphens`는 영어처럼 낱말 안을 끊을 때 하이픈(-)을 넣을지 정합니다. `auto`는 브라우저가 하이픈 사전으로 끊을 자리를 찾습니다. 사전은 언어마다 다르므로 `lang` 속성이 있어야 합니다. 그 언어의 사전도 있어야 동작합니다. 한국어 페이지 안의 영어 문단에는 `lang=\"en\"`을 달아 줍니다. 기본값 `manual`은 `&shy;`(소프트 하이픈)을 넣은 자리에서만 끊습니다. `word-break: break-all`이 있으면 하이픈이 보이지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["manual", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "hyphens의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "끊을 자리가 있어도 끊지 않음. 공백에서만 줄바꿈"],
              ["manual", "`&shy;`나 하이픈 글자(U+2010)가 있는 자리에서만 끊음"],
              ["auto", "사전을 보고 알아서 끊음. 직접 넣은 자리가 우선"],
            ],
          },
        ],
        code: `<p lang="en" style="hyphens: auto">internationalization</p>
<p style="hyphens: manual">inter&shy;nationalization</p>`,
        codeLang: "html",
      },
      {
        label: "text-wrap",
        body: "단축 속성입니다. 풀어 쓰면 `text-wrap-mode`, `text-wrap-style`입니다. 줄을 바꿀지(`wrap`, `nowrap`)와, 어떤 방식으로 나눌지를 정합니다. `balance`는 줄마다 글자 수를 고르게 맞춰 제목의 마지막 줄이 짧게 남지 않게 합니다. 계산이 비싸서 몇 줄 안 되는 블록에만 작용합니다. Chromium은 6줄, Firefox는 10줄까지입니다. `pretty`는 긴 본문용입니다. 느린 대신 더 나은 줄 나눔을 고릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["wrap", "글자와 블록 컨테이너", "됨", "풀어 쓴 속성 각각"]],
          },
          {
            caption: "text-wrap의 값",
            head: ["값", "하는 일"],
            rows: [
              ["wrap", "알맞은 자리에서 줄을 바꿈 (기본)"],
              ["nowrap", "줄을 바꾸지 않고 넘침"],
              ["balance", "줄마다 글자 수를 고르게. 몇 줄짜리 블록만"],
              ["pretty", "wrap과 같되 느린 대신 더 나은 줄 나눔"],
              ["stable", "편집하는 줄의 앞줄들을 다시 나누지 않음"],
            ],
          },
        ],
        code: `h1, h2    { text-wrap: balance; } /* 짧은 제목 */
article p { text-wrap: pretty; }  /* 긴 본문 */

/* 풀어 쓰면 */
h1 {
  text-wrap-mode: wrap;
  text-wrap-style: balance;
}`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: balance와 줄 길이",
        body: "같은 제목 두 개 가운데 아래에만 `text-wrap: balance`를 주었습니다. 지금 값은 줄마다 글자가 차지한 폭을 Range로 재어 보입니다. 위 제목은 앞줄을 꽉 채우고 마지막 줄이 짧게 남습니다. 아래 제목은 줄 폭이 서로 비슷해집니다. 제목 폭은 작은 창의 70%라서, 폭 버튼을 누르면 두 제목이 함께 다시 나뉩니다. 계산된 값이 비어 있으면 그 브라우저가 `text-wrap`을 모르는 것입니다.",
        lab: {
          html: `<style>
  h3 { width: 70%; border: 1px solid #aaa; font-size: 20px; margin: 8px 0; }
  .bal { text-wrap: balance; }
</style>
<h3>화면 폭이 바뀌어도 제목의 마지막 줄이 혼자 남지 않게 하는 방법</h3>
<h3 class="bal">화면 폭이 바뀌어도 제목의 마지막 줄이 혼자 남지 않게 하는 방법</h3>`,
          height: 240,
          widths: [320, 480, 640],
          tryIt: "두 제목에 word-break: keep-all을 더해 보세요. 어절을 지키면서 줄을 고르게 나누는지 줄 폭으로 견줄 수 있습니다.",
          checks: [
            {
              label: "위 제목: 계산값, 줄마다 폭",
              expr: "(e => { const r = document.createRange(); r.selectNodeContents(e); return (getComputedStyle(e).getPropertyValue('text-wrap') || '(비어 있음)') + ': ' + [...r.getClientRects()].filter(x => x.width > 0).map(x => Math.round(x.width)).join(', '); })(document.querySelectorAll('h3')[0])",
            },
            {
              label: "아래 제목: 계산값, 줄마다 폭",
              expr: "(e => { const r = document.createRange(); r.selectNodeContents(e); return (getComputedStyle(e).getPropertyValue('text-wrap') || '(비어 있음)') + ': ' + [...r.getClientRects()].filter(x => x.width > 0).map(x => Math.round(x.width)).join(', '); })(document.querySelectorAll('h3')[1])",
            },
          ],
        },
      },
      {
        label: "text-overflow",
        body: "`text-overflow`는 넘쳐서 가려진 글이 있다는 것을 어떻게 알릴지 정합니다. 넘침을 만들지는 않습니다. 그래서 말줄임표(…)를 보려면 세 속성이 함께 있어야 합니다. 줄을 바꾸지 않게 하는 `white-space: nowrap`, 넘친 부분을 자르는 `overflow: hidden`, 그리고 `text-overflow: ellipsis`입니다. 줄이 나아가는 방향으로 넘친 글에만 작용합니다. 아래로 넘친 글에는 작용하지 않습니다. 입력 칸처럼 편집할 수 있는 요소에서는 `clip`처럼 동작할 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["clip", "블록 컨테이너", "안 됨", "불연속"]],
          },
          {
            caption: "text-overflow의 값",
            head: ["값", "하는 일"],
            rows: [
              ["clip", "콘텐츠 영역 끝에서 자름. 글자 중간도 잘림"],
              ["ellipsis", "잘린 자리에 …(U+2026)를 보임"],
              ["<string>", "잘린 자리에 그 문자열을 보임"],
              ["값 두 개", "첫 값은 왼쪽 끝, 둘째 값은 오른쪽 끝에 씀"],
            ],
          },
        ],
        code: `.title {
  white-space: nowrap;     /* 한 줄로 둔다 */
  overflow: hidden;        /* 넘친 부분을 자른다 */
  text-overflow: ellipsis; /* 잘린 자리에 … */
}`,
        codeLang: "css",
      },
      {
        label: "-webkit-line-clamp",
        body: "`-webkit-line-clamp`는 블록 내용을 정한 줄 수까지만 보이게 합니다. 접두사 판은 두 속성이 함께 있어야 동작합니다. `display: -webkit-box`(또는 `-webkit-inline-box`)와 `-webkit-box-orient: vertical`입니다. MDN은 이 세 속성의 짝이 표준에 정해져 있어 계속 지원된다고 적습니다. `overflow: hidden`도 함께 줍니다. 빼면 말줄임표는 붙지만 나머지 줄이 잘리지 않고 보입니다. 표준 이름은 접두사 없는 `line-clamp`입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "계산값 종류대로"]],
          },
          {
            caption: "-webkit-line-clamp의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "자르지 않음"],
              ["<integer>", "보일 줄 수. 0보다 커야 함"],
            ],
          },
        ],
        code: `.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 세 줄까지 */
  overflow: hidden;
}`,
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 말줄임표에 필요한 것",
        body: "a, b, c 문단은 속성을 하나씩 더해 갑니다. a는 `text-overflow: ellipsis`만 있고, b는 `white-space: nowrap`을 더했고, c는 `overflow: hidden`까지 있습니다. 지금 값은 계산된 white-space, overflow, 그리고 넘침(scrollWidth > clientWidth)을 보입니다.\na는 줄을 바꾸므로 넘침이 false입니다. b는 넘침이 true지만 overflow가 visible이라 글이 상자 밖으로 그대로 보입니다. c에서만 말줄임표가 나옵니다. d는 `-webkit-line-clamp: 2`라서 2줄만 보이고, 숨은 내용이 true로 나옵니다. 폭은 작은 창의 60%입니다. 폭 버튼을 눌러도 d는 2줄 그대로입니다.",
        lab: {
          html: `<style>
  p { width: 60%; border: 1px solid #aaa; margin: 6px 0; }
  .a { text-overflow: ellipsis; }
  .b { text-overflow: ellipsis; white-space: nowrap; }
  .c { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  .d { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
</style>
<p class="a">a. 아주 긴 상품 이름이라 좁은 상자에서는 한 줄에 다 들어가지 않습니다</p>
<p class="b">b. 아주 긴 상품 이름이라 좁은 상자에서는 한 줄에 다 들어가지 않습니다</p>
<p class="c">c. 아주 긴 상품 이름이라 좁은 상자에서는 한 줄에 다 들어가지 않습니다</p>
<p class="d">d. 상품 설명은 여러 줄입니다. 설명이 아무리 길어도 처음 두 줄만 보이고 나머지는 숨습니다.
  숨은 줄이 있다는 표시로 둘째 줄 끝에 말줄임표가 붙습니다. 폭을 바꿔도 줄 수는 그대로입니다.</p>`,
          height: 280,
          widths: [320, 480, 640],
          tryIt: "c의 overflow: hidden을 지우면 넘침은 true로 남지만 말줄임표가 사라집니다. d의 -webkit-line-clamp를 3으로 바꿔 보세요.",
          checks: [
            {
              label: "a: white-space, overflow, 넘침",
              expr: "(e => getComputedStyle(e).whiteSpace + ', ' + getComputedStyle(e).overflow + ', 넘침 ' + (e.scrollWidth > e.clientWidth))(document.querySelector('.a'))",
            },
            {
              label: "b: white-space, overflow, 넘침",
              expr: "(e => getComputedStyle(e).whiteSpace + ', ' + getComputedStyle(e).overflow + ', 넘침 ' + (e.scrollWidth > e.clientWidth))(document.querySelector('.b'))",
            },
            {
              label: "c: white-space, overflow, 넘침",
              expr: "(e => getComputedStyle(e).whiteSpace + ', ' + getComputedStyle(e).overflow + ', 넘침 ' + (e.scrollWidth > e.clientWidth))(document.querySelector('.c'))",
            },
            {
              label: "d: 보이는 줄 수, 숨은 내용",
              expr: "(e => Math.round(e.clientHeight / parseFloat(getComputedStyle(e).lineHeight)) + '줄, 숨은 내용 ' + (e.scrollHeight > e.clientHeight))(document.querySelector('.d'))",
            },
          ],
        },
      },
      {
        label: "vertical-align",
        body: "`vertical-align`은 인라인, 인라인 블록, 표 칸에만 작용합니다. 블록 요소를 세로 가운데에 두는 데는 쓸 수 없습니다. 그때는 플렉스나 그리드를 씁니다(6장, 7장). 인라인 요소에서는 그 요소를 줄 상자 안 어느 높이에 둘지 정합니다. 표 칸에서는 칸 내용을 행의 위, 가운데, 아래 중 어디에 둘지 정합니다. 인라인 이미지 아래의 작은 틈은 기준선 정렬 때문입니다. `vertical-align: middle`이나 `display: block`으로 없앱니다. MDN은 이 속성을 단축 속성으로 적습니다. 풀어 쓰면 `alignment-baseline`, `baseline-source`, `baseline-shift`입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["baseline", "인라인, 인라인 블록, 표 칸", "안 됨", "불연속"]],
          },
          {
            caption: "인라인 요소에서의 값",
            head: ["값", "하는 일"],
            rows: [
              ["baseline", "부모의 기준선에 맞춤"],
              ["sub, super", "부모의 아래 첨자, 위 첨자 기준선에 맞춤"],
              ["text-top, text-bottom", "부모 글꼴의 위 끝, 아래 끝에 맞춤"],
              ["middle", "가운데를 부모 기준선 + x 높이 절반에 맞춤"],
              ["top, bottom", "줄 전체의 위 끝, 아래 끝에 맞춤"],
              ["<length>, <percentage>", "기준선에서 그만큼 위로. 퍼센트는 line-height 기준, 음수도 됨"],
            ],
          },
          {
            caption: "표 칸에서의 값",
            head: ["값", "하는 일"],
            rows: [
              ["baseline", "같은 행에서 baseline인 칸끼리 기준선을 맞춤"],
              ["top", "칸의 패딩 위 끝을 행의 위에 맞춤"],
              ["middle", "칸을 행의 가운데에"],
              ["bottom", "칸의 패딩 아래 끝을 행의 아래에 맞춤"],
            ],
          },
        ],
        code: `img.icon { vertical-align: middle; } /* 글줄 가운데쯤에 */
td       { vertical-align: top; }    /* 칸 내용을 위로 */`,
        codeLang: "css",
      },
      {
        label: "text-size-adjust",
        body: "`text-size-adjust`는 일부 스마트폰과 태블릿 브라우저의 글자 부풀림을 조절합니다. 다른 브라우저는 이 속성을 무시합니다. 작은 화면에 맞춰 만든 반응형 페이지는 부풀림이 필요 없어 `none`으로 끕니다. 실험 기능이고, Chrome은 54부터 지원합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["부풀림을 하는 스마트폰 브라우저는 auto, 그 밖은 none", "모든 요소", "됨", "계산값 종류대로"]],
          },
          {
            caption: "text-size-adjust의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "부풀림을 끔"],
              ["auto", "부풀림을 켬. 앞서 준 none을 되돌릴 때"],
              ["<percentage>", "부풀림을 켜고 그 비율로 글자를 키움"],
            ],
          },
        ],
        terms: [
          {
            term: "글자 부풀림 (text inflation)",
            body: "모바일 브라우저가 넓은 데스크톱 페이지를 줄여 보일 때, 너무 작아진 글자를 키우는 동작입니다. 레이아웃은 그대로 두고 글자만 키웁니다. 신문을 축소 복사한 뒤 본문 글자만 돋보기로 키워 붙이는 것과 비슷합니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "글자와 줄바꿈에서 자주 막히는 경우입니다. 대부분 한 속성만 적고 짝이 되는 속성을 빠뜨린 경우입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["`text-overflow: ellipsis`만 적음", "말줄임표가 나오지 않음", "`white-space: nowrap`과 `overflow: hidden`을 함께"],
              ["플렉스 아이템 안의 글에 말줄임", "아이템이 줄지 않아 부모 밖으로 넘침", "아이템에 `min-width: 0` (6장)"],
              ["한국어 본문을 기본값으로 둠", "어절 중간에서 줄이 바뀜", "`word-break: keep-all`, 긴 낱말은 `overflow-wrap: anywhere`"],
              ["`hyphens: auto`만 적음", "하이픈이 생기지 않음", "`lang` 속성을 맞게 달기 (영어 부분은 lang=\"en\")"],
              ["자식에 `text-decoration: none`", "부모의 밑줄이 그대로 남음", "밑줄을 부모가 아닌 필요한 요소에만 주기"],
              ["블록에 `vertical-align: middle`", "아무 변화 없음", "인라인, 표 칸에만 작용. 블록은 플렉스나 그리드 (6장, 7장)"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1. `text-overflow: ellipsis`가 보이려면 어떤 두 속성이 더 있어야 할까요?\n2. `word-break: keep-all`에 `overflow-wrap: anywhere`를 함께 쓰는 까닭은 무엇일까요?\n3. 부모의 밑줄을 자식의 `text-decoration: none`으로 지울 수 없는 까닭은 무엇일까요?\n4. `overflow-wrap`의 `anywhere`와 `break-word`는 어떤 상자에서 다르게 보일까요?",
      },
    ],
    sources: [
      { label: "MDN word-break", href: `${MDN}/Reference/Properties/word-break` },
      { label: "MDN overflow-wrap", href: `${MDN}/Reference/Properties/overflow-wrap` },
      { label: "MDN white-space", href: `${MDN}/Reference/Properties/white-space` },
      { label: "MDN text-overflow", href: `${MDN}/Reference/Properties/text-overflow` },
      { label: "MDN text-wrap", href: `${MDN}/Reference/Properties/text-wrap` },
      { label: "MDN text-decoration", href: `${MDN}/Reference/Properties/text-decoration` },
    ],
  },
  {
    id: "css-prop-display",
    name: "디스플레이와 흐름 속성",
    tagline: "상자를 만들지, 어떻게 놓을지, 그릴지를 정한다",
    intro:
      "요소 하나가 화면에 나오기까지 세 가지를 묻습니다. 상자를 만드는가, 그 상자를 흐름 어디에 놓는가, 실제로 그리는가입니다. `display`는 앞의 두 질문에 답합니다. `float`와 `clear`는 상자를 한쪽으로 띄우고, 그 아래로 내려가게 합니다. `visibility`는 자리를 둔 채 그리기만 끕니다. `box-decoration-break`는 여러 줄로 쪼개진 상자의 장식을 정합니다. 이 시트는 속성마다 정의와 값을 모은 참고서입니다. 원리는 5장 디스플레이와 흐름에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "이 장의 속성 다섯 개입니다. 앞의 셋은 레이아웃을 바꿉니다. `visibility`와 `box-decoration-break`는 그리는 방식만 바꿉니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["display", "상자의 바깥 역할과 자식 배치 방식", "inline", "안 됨", "5장 · 디스플레이와 흐름"],
              ["float", "상자를 왼쪽이나 오른쪽에 띄움", "none", "안 됨", "5장 · 디스플레이와 흐름"],
              ["clear", "앞선 float 아래로 내려감", "none", "안 됨", "5장 · 디스플레이와 흐름"],
              ["visibility", "자리는 두고 그리지 않음", "visible", "됨", "5장 · 디스플레이와 흐름"],
              ["box-decoration-break", "쪼개진 상자 조각의 장식", "slice", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "display",
        body: "`display`는 두 가지를 정합니다. 바깥 표시 유형은 이 상자가 흐름 안에서 블록인지 인라인인지입니다. 안쪽 표시 유형은 자식을 어떤 방식으로 놓을지입니다. flow, flow-root, flex, grid, table 같은 것입니다. 요즘 문법은 둘을 갈라 `display: inline flex`처럼 씁니다. `inline-flex` 같은 한 단어 값은 옛 문법이지만 그대로 쓸 수 있습니다.\n\n빠진 쪽은 기본값으로 채웁니다. 바깥만 적으면 안쪽은 flow입니다. 안쪽만 적으면 바깥은 block입니다(ruby만 inline). 그래서 `display: flex`인 요소 자신은 블록처럼 줄을 바꿉니다. 플렉스로 놓이는 것은 그 자식들입니다.\n\n주의할 점이 둘 있습니다. 첫째, float이나 절대 위치인 요소와 루트 요소는 계산값이 바뀔 수 있습니다. `inline`을 줘도 `block`으로 계산되는 식입니다. 둘째, `none`은 요소를 접근성 트리에서도 뺍니다. 화면 낭독기도 그 요소와 자손을 읽지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["inline", "모든 요소", "안 됨", "불연속. none과 오갈 때는 끝까지 보임"]],
          },
          {
            caption: "display의 값",
            head: ["값", "하는 일"],
            rows: [
              ["block", "블록 상자. 앞뒤로 줄을 바꿉니다"],
              ["inline", "인라인 상자. 자리가 있으면 같은 줄에 이어집니다"],
              ["inline-block", "줄 안에 놓이지만 안쪽은 새 BFC입니다"],
              ["flow-root", "새 BFC를 만드는 블록입니다. float을 감쌉니다"],
              ["flex, inline-flex", "자식을 플렉스 레이아웃으로 놓습니다"],
              ["grid, inline-grid", "자식을 그리드 레이아웃으로 놓습니다"],
              ["grid-lanes, inline-grid-lanes", "열은 그리드처럼, 아이템은 빈틈을 메우며 쌓습니다(새 값)"],
              ["table, inline-table", "<table>처럼 동작합니다"],
              ["list-item", "목록 항목처럼 내용 상자와 마커 상자를 만듭니다"],
              ["ruby", "<ruby>처럼 윗주를 배치합니다. 바깥은 inline입니다"],
              ["contents", "자기 상자를 만들지 않습니다. 자식 상자가 그 자리를 대신합니다"],
              ["none", "자신과 자손 모두 상자를 만들지 않습니다. 레이아웃에서 사라집니다"],
            ],
          },
          {
            caption: "한 단어 값을 두 값으로 쓰면",
            head: ["한 단어", "두 값"],
            rows: [
              ["block", "block flow"],
              ["inline", "inline flow"],
              ["inline-block", "inline flow-root"],
              ["flow-root", "block flow-root"],
              ["flex, inline-flex", "block flex, inline flex"],
              ["grid, inline-grid", "block grid, inline grid"],
              ["table, inline-table", "block table, inline table"],
              ["list-item", "block flow list-item"],
            ],
          },
          {
            caption: "표 안쪽 값",
            head: ["값", "닮은 HTML 요소"],
            rows: [
              ["table-header-group", "<thead>"],
              ["table-row-group", "<tbody>"],
              ["table-footer-group", "<tfoot>"],
              ["table-row", "<tr>"],
              ["table-cell", "<td>"],
              ["table-column-group, table-column", "<colgroup>, <col>"],
              ["table-caption", "<caption>"],
              ["ruby-base, ruby-text, ruby-text-container", "<rb>, <rt>, <rtc>"],
            ],
          },
        ],
        code: ".card { display: block flow-root; }   /* = flow-root */\n.tag  { display: inline flex; }       /* = inline-flex */\n.item { display: list-item; }         /* 마커 상자가 생긴다 */\n\n/* 두 값 문법을 모르는 브라우저를 위한 대비 */\n.box {\n  display: inline-flex;\n  display: inline flex;\n}",
        codeLang: "css",
        terms: [
          {
            term: "바깥 표시 유형, 안쪽 표시 유형",
            body: "바깥 유형은 이 상자가 부모의 흐름에 블록으로 끼는지, 인라인으로 끼는지입니다. 안쪽 유형은 자식들을 어떤 규칙으로 놓을지입니다. 집에 비유하면 바깥은 골목에서 집이 차지하는 자리, 안쪽은 집 안의 가구 배치입니다.",
          },
          {
            term: "접근성 트리",
            body: "브라우저가 화면 낭독기 같은 보조 기술에 넘기는 요소 목록입니다. DOM에서 뜻 있는 것을 추려 이름과 역할을 붙입니다. 건물 안내판과 같습니다. 안내판에서 빠진 방은 눈으로 보이지 않는 사람이 찾아갈 수 없습니다.",
          },
        ],
        notes: [
          {
            title: "display를 애니메이션하면",
            body: "display는 불연속으로 바뀝니다. 대개 중간 지점에서 값이 넘어갑니다. none과 오갈 때만 다릅니다. 보이는 값이 처음부터 끝까지 유지됩니다. 트랜지션으로 쓰려면 `transition-behavior: allow-discrete`와 `@starting-style`이 함께 필요합니다. 자세히는 12장입니다.",
          },
          {
            title: "contents와 접근성",
            body: "명세대로라면 `display: contents`는 상자만 없애고 뜻은 남겨야 합니다. 그런데 MDN은 일부 브라우저가 그 요소를 접근성 트리에서 뺀다고 적습니다. 자손은 남지만 요소 자신은 읽히지 않습니다. 버튼, 목록, 표처럼 뜻 있는 요소에는 조심해서 씁니다. 표에 `display: block`이나 `grid`를 줘도 일부 브라우저에서 표로 읽히지 않습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: display: contents와 none",
        body: "`.wrap`은 `display: contents`라 자기 상자가 없습니다. 그래서 지금 값의 wrap 상자 크기는 0 x 0입니다. 그래도 B와 C는 보입니다. 두 자식이 `.row`의 플렉스 아이템이 되어 A 옆에 바로 놓이기 때문입니다. 'B의 왼쪽 - A의 오른쪽'은 `gap`과 같습니다. 빨간 테두리와 안쪽 여백도 그려지지 않습니다.\n`block`으로 바꾸면 wrap 상자가 생겨 크기가 0보다 커집니다. 테두리와 여백만큼 B가 오른쪽으로 밀립니다. `none`으로 바꾸면 wrap은 다시 0 x 0이지만, B의 폭까지 0이 됩니다. 자식 상자도 함께 사라지기 때문입니다.",
        lab: {
          html: `<style>
  .row { display: flex; gap: 8px; }
  .row span { padding: 4px 10px; background: #dde6ff; }
  .wrap { display: contents; border: 2px solid red; padding: 8px; }
</style>
<div class="row">
  <span id="a">A</span>
  <div class="wrap" id="wrap">
    <span id="b">B</span>
    <span id="c">C</span>
  </div>
</div>`,
          height: 150,
          tryIt: ".wrap의 display를 block, none으로 바꿔 실행하고 지금 값 넷을 견주어 보세요.",
          checks: [
            { label: "wrap의 display", expr: "getComputedStyle(document.querySelector('#wrap')).display" },
            {
              label: "wrap 상자 폭 x 높이",
              expr: "(r => Math.round(r.width) + ' x ' + Math.round(r.height))(document.querySelector('#wrap').getBoundingClientRect())",
            },
            {
              label: "B의 왼쪽 - A의 오른쪽",
              expr: "Math.round(document.querySelector('#b').getBoundingClientRect().left - document.querySelector('#a').getBoundingClientRect().right)",
            },
            { label: "B의 폭", expr: "Math.round(document.querySelector('#b').getBoundingClientRect().width)" },
          ],
        },
      },
      {
        label: "float",
        body: "`float`는 상자를 포함 블록의 왼쪽이나 오른쪽 끝으로 띄웁니다. 글과 인라인 요소는 그 둘레를 감싸며 흐릅니다. 사진 옆에 글을 두를 때 씁니다. 페이지 전체의 배치는 이제 플렉스와 그리드가 맡습니다. float은 정상 흐름에서 빠지지만, 절대 위치와 달리 흐름의 일부로 남습니다.\n주의할 점이 둘 있습니다. 첫째, float은 블록 배치를 뜻하므로 display 계산값을 바꿉니다. `inline`과 `inline-block`은 `block`이 되고, `inline-flex`는 `flex`가 됩니다. 둘째, float은 부모 높이에 들어가지 않습니다. 부모가 float만 담으면 높이가 무너집니다. 이때 부모에 `display: flow-root`를 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소. display: none이면 효과 없음", "안 됨", "불연속"]],
          },
          {
            caption: "float의 값",
            head: ["값", "하는 일"],
            rows: [
              ["left", "포함 블록의 왼쪽에 띄웁니다"],
              ["right", "포함 블록의 오른쪽에 띄웁니다"],
              ["none", "띄우지 않습니다"],
              ["inline-start", "글이 시작하는 쪽에 띄웁니다. ltr이면 왼쪽, rtl이면 오른쪽"],
              ["inline-end", "글이 끝나는 쪽에 띄웁니다. ltr이면 오른쪽, rtl이면 왼쪽"],
            ],
          },
          {
            caption: "float이 바꾸는 display 계산값",
            head: ["지정값", "계산값"],
            rows: [
              ["inline, inline-block", "block"],
              ["inline-table", "table"],
              ["table-row, table-cell 같은 표 안쪽 값", "block"],
              ["inline-flex", "flex"],
              ["inline-grid", "grid"],
              ["그 밖의 값", "그대로"],
            ],
          },
        ],
        code: "figure.photo { float: inline-start; margin-inline-end: 1rem; }\n.wrap { display: flow-root; }   /* float 자식까지 높이에 넣는다 */",
        codeLang: "css",
        notes: [
          {
            title: "자바스크립트에서 float 읽기",
            body: "요즘 브라우저에서는 `el.style.float`로 읽고 씁니다. float이 자바스크립트 예약어라 옛 브라우저는 `cssFloat`이라는 이름을 썼습니다.",
          },
        ],
      },
      {
        label: "clear",
        body: "`clear`는 이 요소를 앞선 float 아래로 내립니다. float 옆에 붙지 않고 새 줄에서 시작하게 할 때 씁니다. 예를 들어 문단은 사진 옆에 흐르게 두고, 제목만 사진 아래로 내립니다.\nfloat이 아닌 블록에 주면, 요소의 테두리 가장자리가 관련 float의 마진 가장자리 아래로 내려갑니다. float에 주면 그 float이 앞선 float들 아래로 갑니다. 따지는 float은 같은 블록 서식 맥락(BFC) 안에서 앞에 나온 것뿐입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "블록 수준 요소", "안 됨", "불연속"]],
          },
          {
            caption: "clear의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "내리지 않습니다"],
              ["left", "왼쪽 float 아래로 내립니다"],
              ["right", "오른쪽 float 아래로 내립니다"],
              ["both", "양쪽 float 모두의 아래로 내립니다"],
              ["inline-start", "시작 쪽 float 아래로 내립니다. ltr이면 왼쪽"],
              ["inline-end", "끝 쪽 float 아래로 내립니다. ltr이면 오른쪽"],
            ],
          },
        ],
        code: "h2 { clear: both; }   /* 제목은 늘 앞선 float 아래에서 시작 */",
        codeLang: "css",
        terms: [
          {
            term: "블록 서식 맥락 (BFC)",
            body: "블록들이 세로로 쌓이는 독립된 구역입니다. 구역 안의 float은 밖으로 새지 않고, clear도 구역 안의 float만 봅니다. `display: flow-root`가 새 구역을 만듭니다. 칸막이를 친 서랍과 같습니다. 칸 안의 물건은 옆 칸으로 굴러가지 않습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: float, clear, flow-root",
        body: "`span`에 `float: left`를 줬습니다. 지금 값의 display 계산값은 `block`입니다. float이 인라인 상자를 블록으로 바꾸기 때문입니다. box 높이는 float 높이보다 작습니다. float이 부모 높이에 들어가지 않아서입니다. 다음 문단은 float 옆에서 시작하므로 '문단이 float 아래인가'는 false입니다.\n`.next`에 `clear: left`를 넣으면 true가 됩니다. 문단의 테두리가 float 아래로 내려가기 때문입니다. clear를 지우고 `.box`에 `display: flow-root`를 넣어도 true가 됩니다. 이번에는 box가 float을 감싸 box 높이가 float 높이보다 커집니다.",
        lab: {
          html: `<style>
  .box { border: 2px solid #999; }
  .f { float: left; width: 90px; height: 60px; background: #ffd9a8; }
  .next { background: #e3f0ff; }
</style>
<div class="box" id="box">
  <span class="f" id="f">float</span>
</div>
<p class="next" id="next">다음 문단입니다. float 옆을 따라 흐릅니다.</p>`,
          height: 170,
          tryIt: ".next에 clear: left를 넣어 보고, 지운 뒤 .box에 display: flow-root를 넣어 보세요.",
          checks: [
            { label: "span의 display 계산값", expr: "getComputedStyle(document.querySelector('#f')).display" },
            { label: "box 높이", expr: "Math.round(document.querySelector('#box').getBoundingClientRect().height)" },
            { label: "float 높이", expr: "Math.round(document.querySelector('#f').getBoundingClientRect().height)" },
            {
              label: "문단이 float 아래인가",
              expr: "document.querySelector('#next').getBoundingClientRect().top >= document.querySelector('#f').getBoundingClientRect().bottom - 0.5",
            },
          ],
        },
      },
      {
        label: "visibility",
        body: "`visibility`는 상자를 그릴지 말지만 정합니다. `hidden`이면 보이지 않지만 자리는 그대로 남습니다. 레이아웃이 흔들리지 않게 잠깐 숨길 때 씁니다. 자리까지 없애려면 `display: none`입니다.\n상속되는 속성이라 자손도 함께 숨습니다. 하지만 자손에 `visibility: visible`을 주면 그 자손만 다시 보입니다. hidden인 요소는 포커스를 받지 못합니다. 접근성 트리에서도 빠집니다.\n`collapse`는 요소마다 다릅니다. 표의 행과 열은 자리까지 없앱니다. 다른 행과 열의 크기는 그대로 둡니다. 플렉스 아이템과 루비 주석도 자리를 없앤다고 정의돼 있습니다. 그 밖의 요소에서는 `hidden`과 같습니다. MDN은 일부 브라우저의 collapse 지원이 빠졌거나 틀리다고 적습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["visible", "모든 요소", "됨", "불연속. 바뀌는 동안은 visible"]],
          },
          {
            caption: "visibility의 값",
            head: ["값", "하는 일"],
            rows: [
              ["visible", "상자를 그립니다"],
              ["hidden", "그리지 않지만 자리는 남깁니다. 포커스를 받지 못합니다"],
              ["collapse", "표의 행과 열, 플렉스 아이템은 자리까지 없앱니다. 그 밖은 hidden과 같습니다"],
            ],
          },
          {
            caption: "숨기는 방법 견주기",
            head: ["방법", "자리", "포커스", "접근성 트리"],
            rows: [
              ["visibility: hidden", "남음", "못 받음", "빠짐"],
              ["display: none", "없어짐", "못 받음", "빠짐"],
              ["opacity: 0", "남음", "받음", "남음"],
            ],
          },
        ],
        code: ".menu { visibility: hidden; }            /* 자리는 남는다 */\n.menu .always { visibility: visible; }   /* 이 자손만 다시 보인다 */\ntr.done { visibility: collapse; }        /* 표의 행은 자리까지 접힌다 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: hidden과 display: none",
        body: "`#mid`는 hidden이라 보이지 않습니다. 하지만 폭은 그대로라 셋이 제자리에 있습니다. '셋의 왼쪽 - 하나의 오른쪽'은 #mid 폭에 간격 둘을 더한 값입니다. 자손 b는 `visible`을 받아 혼자 보입니다. 지금 값에서 #mid는 hidden, 자손은 visible입니다.\n`#mid`를 `display: none`으로 바꾸면 #mid 폭이 0이 되고, 셋이 하나 옆으로 당겨집니다. 이때 거리는 간격 하나뿐입니다. 자손도 함께 사라집니다. `visibility: collapse`도 넣어 보세요. MDN 정의대로라면 플렉스 아이템의 자리가 사라집니다. 지원이 고르지 않으니, 셋의 위치로 지금 브라우저가 어떻게 하는지 확인합니다.",
        lab: {
          html: `<style>
  .row { display: flex; gap: 8px; }
  .row > div { width: 90px; padding: 8px; background: #e3f0ff; }
  #mid { visibility: hidden; }
  #mid b { visibility: visible; }
</style>
<div class="row">
  <div id="one">하나</div>
  <div id="mid">둘 <b id="kid">자손</b></div>
  <div id="three">셋</div>
</div>`,
          height: 150,
          tryIt: "#mid의 visibility: hidden을 display: none으로, 다음에는 visibility: collapse로 바꿔 보세요.",
          checks: [
            { label: "#mid의 visibility", expr: "getComputedStyle(document.querySelector('#mid')).visibility" },
            { label: "자손 b의 visibility", expr: "getComputedStyle(document.querySelector('#kid')).visibility" },
            { label: "#mid 폭", expr: "Math.round(document.querySelector('#mid').getBoundingClientRect().width)" },
            {
              label: "셋의 왼쪽 - 하나의 오른쪽",
              expr: "Math.round(document.querySelector('#three').getBoundingClientRect().left - document.querySelector('#one').getBoundingClientRect().right)",
            },
          ],
        },
      },
      {
        label: "box-decoration-break",
        body: "요소가 여러 줄, 여러 단, 여러 쪽으로 쪼개질 때 조각마다 장식을 어떻게 그릴지 정합니다. 장식은 배경, 테두리, 안쪽 여백, 바깥 여백, 그림자, 둥근 모서리 같은 것입니다.\n초기값 `slice`는 쪼개지지 않은 긴 상자 하나를 그린 뒤 조각으로 자릅니다. 그래서 줄이 끊긴 쪽에는 테두리와 여백이 없습니다. `clone`은 조각마다 테두리, 여백, 그림자를 따로 감쌉니다. 배경도 조각마다 따로 그립니다. 그래서 `no-repeat` 배경 그림이 조각 수만큼 보일 수 있습니다.\n여러 줄에 걸친 강조 표시나 태그 모양 span에 씁니다. 지원 버전은 Chrome 130, Safari 7, Firefox 32입니다. MDN 예제는 `-webkit-box-decoration-break` 선언을 함께 적습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["slice", "모든 요소", "안 됨", "불연속"]],
          },
          {
            caption: "box-decoration-break의 값",
            head: ["값", "하는 일"],
            rows: [
              ["slice", "한 상자로 그린 뒤 조각으로 자릅니다. 끊긴 쪽엔 테두리와 여백이 없습니다"],
              ["clone", "조각마다 테두리, 여백, 그림자, 배경을 따로 그립니다"],
            ],
          },
        ],
        code: "mark.multi {\n  padding: 0 0.3em;\n  border-radius: 0.3em;\n  -webkit-box-decoration-break: clone;\n  box-decoration-break: clone;\n}",
        codeLang: "css",
        terms: [
          {
            term: "상자 조각 (fragment)",
            body: "한 요소의 상자가 줄, 단, 쪽의 경계에서 나뉜 각 부분입니다. 인라인 요소가 두 줄에 걸치면 조각이 둘입니다. `getClientRects()`가 조각마다 사각형 하나씩 돌려줍니다. 두 쪽에 걸쳐 인쇄된 긴 표를 떠올리면 됩니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: slice와 clone",
        body: "`<br>` 때문에 span이 두 줄, 곧 조각 둘로 나뉩니다. 지금 값의 '조각마다 폭'은 `getClientRects()`가 돌려준 조각 상자의 폭입니다. slice에서는 첫 조각에 왼쪽 여백과 테두리만, 둘째 조각에 오른쪽 것만 붙습니다.\n`slice`를 `clone`으로 바꾸면 조각마다 양쪽 여백과 테두리가 붙습니다. 그래서 두 조각의 폭이 모두 늘어납니다. 늘어난 만큼이 안쪽 여백과 테두리의 한쪽 몫입니다. 조각 수는 그대로입니다.",
        lab: {
          html: `<style>
  .tag {
    padding: 2px 12px;
    border: 2px solid #c60;
    background: #fff0d9;
    box-decoration-break: slice;
  }
</style>
<p><span class="tag" id="tag">첫째 줄<br>둘째 줄</span></p>`,
          height: 140,
          tryIt: "slice를 clone으로 바꿔 실행하세요. Safari라면 -webkit-box-decoration-break: clone 줄도 더합니다.",
          checks: [
            { label: "조각 수", expr: "document.querySelector('#tag').getClientRects().length" },
            {
              label: "조각마다 폭",
              expr: "[...document.querySelector('#tag').getClientRects()].map(r => Math.round(r.width)).join(', ')",
            },
            {
              label: "box-decoration-break 계산값",
              expr: "getComputedStyle(document.querySelector('#tag')).getPropertyValue('box-decoration-break')",
            },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "디스플레이와 흐름 속성에서 자주 부딪히는 것들입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["자식에만 float을 줬다", "부모 높이가 무너진다", "부모에 display: flow-root"],
              ["span에 width를 줬다", "폭이 바뀌지 않는다. 인라인 상자에는 width가 적용되지 않는다", "display: inline-block이나 block"],
              ["visibility: hidden으로 숨겼다", "빈자리가 그대로 남는다", "자리까지 없애려면 display: none"],
              ["목록에 display: contents를 줬다", "일부 브라우저가 목록을 접근성 트리에서 뺀다", "뜻 있는 요소에는 contents를 피한다"],
              ["display: none에서 보이게 하며 트랜지션", "처음 나타날 때 트랜지션이 돌지 않는다", "@starting-style과 transition-behavior: allow-discrete"],
              ["float한 span의 display를 읽었다", "inline이 아니라 block이 나온다", "float이 계산값을 바꾼 것이니 정상이다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `display: inline-block`을 두 값으로 쓰면 무엇인가요?\n2) `visibility: hidden`과 `display: none`은 자리와 포커스에서 어떻게 다른가요?\n3) `display: contents`인 요소는 크기가 0인데, 자식은 왜 보이나요?\n4) `float: left`인 span의 display 계산값이 block인 까닭은?",
      },
    ],
    sources: [
      { label: "MDN: display", href: `${MDN}/Reference/Properties/display` },
      { label: "MDN: Using the multi-keyword syntax with CSS display", href: `${MDN}/Guides/Display/Multi-keyword_syntax` },
      { label: "MDN: float", href: `${MDN}/Reference/Properties/float` },
      { label: "MDN: clear", href: `${MDN}/Reference/Properties/clear` },
      { label: "MDN: visibility", href: `${MDN}/Reference/Properties/visibility` },
      { label: "MDN: box-decoration-break", href: `${MDN}/Reference/Properties/box-decoration-break` },
    ],
  },

  {
    id: "css-prop-flex",
    name: "플렉스 속성",
    tagline: "아이템 크기는 basis에서 출발해 grow와 shrink로 정해진다",
    intro:
      "플렉스 속성은 두 무리입니다. 컨테이너에 주는 것은 축 방향, 줄바꿈, 정렬, 간격입니다. 아이템에 주는 것은 크기(flex, flex-basis, flex-grow, flex-shrink)와 순서, 개별 정렬입니다. 아이템 크기는 flex-basis에서 출발합니다. 남는 공간은 flex-grow 비율로 더하고, 모자란 공간은 flex-shrink 비율로 뺍니다. 그다음 min-width와 max-width로 다시 묶습니다. 이 시트는 속성마다 정의와 값을 모은 참고서입니다. 원리는 6장 플렉스박스에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "컨테이너에 주는 속성과 아이템에 주는 속성이 섞여 있습니다. '하는 일' 칸 앞에 어디에 주는지 적었습니다. 정렬 속성과 gap은 그리드에서도 씁니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["flex", "아이템: grow, shrink, basis를 한 번에", "0 1 auto", "안 됨", "6장 · 플렉스박스"],
              ["flex-basis", "아이템: 주축 방향 출발 크기", "auto", "안 됨", "6장 · 플렉스박스"],
              ["flex-grow", "아이템: 남는 공간을 받는 비율", "0", "안 됨", "6장 · 플렉스박스"],
              ["flex-shrink", "아이템: 모자란 공간을 내놓는 비율", "1", "안 됨", "6장 · 플렉스박스"],
              ["flex-flow", "컨테이너: 방향과 줄바꿈을 한 번에", "row nowrap", "안 됨", "6장 · 플렉스박스"],
              ["flex-direction", "컨테이너: 주축 방향", "row", "안 됨", "6장 · 플렉스박스"],
              ["flex-wrap", "컨테이너: 여러 줄 허용", "nowrap", "안 됨", "6장 · 플렉스박스"],
              ["justify-content", "컨테이너: 주축 방향 공간 분배", "normal", "안 됨", "6장 · 플렉스박스"],
              ["align-items", "컨테이너: 교차축 기본 정렬", "normal", "안 됨", "6장 · 플렉스박스"],
              ["align-self", "아이템: 교차축 정렬을 하나만", "auto", "안 됨", "6장 · 플렉스박스"],
              ["align-content", "컨테이너: 여러 줄 사이 공간 분배", "normal", "안 됨", "6장 · 플렉스박스"],
              ["order", "아이템: 보이는 순서", "0", "안 됨", "6장 · 플렉스박스"],
              ["gap", "컨테이너: 아이템과 줄 사이 간격", "normal", "안 됨", "6장 · 플렉스박스"],
              ["row-gap", "컨테이너: 행 사이 간격", "normal", "안 됨", "6장 · 플렉스박스"],
              ["column-gap", "컨테이너: 열 사이 간격", "normal", "안 됨", "6장 · 플렉스박스"],
            ],
          },
        ],
      },
      {
        label: "flex",
        body: "`flex`는 아이템이 얼마나 자라고 줄지, 어디서 출발할지를 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 flex-grow, flex-shrink, flex-basis입니다. MDN은 셋을 따로 쓰기보다 이 단축 속성의 키워드나 양수 하나를 권합니다.\n\n줄여 쓰면 빈 자리를 이렇게 채웁니다. 단위 없는 숫자 하나는 grow입니다. 이때 shrink는 1, basis는 0%가 됩니다. 길이 하나는 basis입니다. 이때 grow와 shrink는 1입니다. 빠진 basis가 auto가 아니라 0%라는 점이 핵심입니다.\n\n`flex: 1`과 `flex: auto`는 출발점이 다릅니다. `flex: 1`은 basis가 0%라 콘텐츠 크기를 빼고, 컨테이너 전체를 비율로 나눕니다. 그래서 아이템들이 같은 폭이 됩니다. `flex: auto`는 콘텐츠나 width에서 출발해 남는 공간만 나눕니다. 그래서 글이 긴 아이템이 더 넓습니다. `flex: none`은 자라지도 줄지도 않습니다. 어느 값이든 아이템은 기본으로 콘텐츠 최소 크기 아래로 줄지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0 1 auto (단축)", "플렉스 아이템", "안 됨", "풀어 쓴 속성 따라"]],
          },
          {
            caption: "flex의 값",
            head: ["값", "하는 일"],
            rows: [
              ["initial", "0 1 auto. 자라지 않고 줄어듭니다(기본)"],
              ["auto", "1 1 auto. 콘텐츠에서 출발해 자라고 줄어듭니다"],
              ["none", "0 0 auto. 자라지도 줄지도 않습니다"],
              ["양수 하나 (flex: 2)", "2 1 0%. 컨테이너를 비율로 나눕니다"],
              ["길이 하나 (flex: 10em)", "1 1 10em. 그 크기에서 출발합니다"],
              ["두 수 (flex: 2 2)", "2 2 0%. grow와 shrink"],
              ["수와 길이 (flex: 1 30px)", "1 1 30px. grow와 basis"],
              ["세 값 (flex: 2 2 10%)", "grow, shrink, basis 순서 그대로"],
            ],
          },
        ],
        code: ".side { flex: none; }       /* 0 0 auto: 고정 */\n.main { flex: 1; }          /* 1 1 0%: 남은 폭을 모두 */\n.chip { flex: auto; }       /* 1 1 auto: 콘텐츠만큼 + 나눠 받기 */\n.col  { flex: 1 1 200px; }  /* 200px에서 출발 */",
        codeLang: "css",
        terms: [
          {
            term: "주축과 교차축",
            body: "주축은 아이템이 늘어서는 방향입니다. `flex-direction: row`면 가로, column이면 세로입니다. 교차축은 주축과 직각인 방향입니다. 기차에 비유하면 주축은 객차가 이어진 방향, 교차축은 객차의 높이 방향입니다.",
          },
          {
            term: "남는 공간, 모자란 공간",
            body: "컨테이너 주축 크기에서 아이템 출발 크기의 합을 뺀 값입니다. 양수면 남는 공간이라 grow로 나눠 줍니다. 음수면 모자란 공간이라 shrink로 나눠 뺍니다. 식탁에 의자를 놓고 남은 자리를 나누는 것과 같습니다.",
          },
          {
            term: "flex 기준 크기 (flex base size)",
            body: "공간을 나누기 전 아이템의 출발 크기입니다. flex-basis가 정하고, auto면 width나 콘텐츠 크기를 씁니다. 짐을 싣기 전에 각자 재 둔 가방 크기와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: flex: 1과 flex: auto",
        body: "두 아이템 모두 `flex: 1`입니다. flex-basis 계산값이 0%라, 글 길이와 상관없이 두 폭이 같습니다.\n`flex: auto`로 바꾸면 basis 계산값이 auto가 됩니다. 각자 콘텐츠 폭에서 출발해 남는 공간을 똑같이 더 받습니다. 그래서 긴 아이템이 더 넓어지고, 폭 차이는 콘텐츠 폭 차이와 같습니다. `flex: none`이면 grow와 shrink가 0이라 콘텐츠 폭에서 멈춥니다. 오른쪽에 빈 공간이 남습니다.",
        lab: {
          html: `<style>
  .box { display: flex; width: 300px; gap: 8px; background: #eee; }
  .box > div { flex: 1; background: #e3f0ff; }
</style>
<div class="box">
  <div id="s">짧음</div>
  <div id="l">조금 긴 글</div>
</div>`,
          height: 140,
          tryIt: ".box > div의 flex: 1을 flex: auto, flex: none으로 바꿔 보세요.",
          checks: [
            { label: "짧은 아이템 폭", expr: "Math.round(document.querySelector('#s').getBoundingClientRect().width)" },
            { label: "긴 아이템 폭", expr: "Math.round(document.querySelector('#l').getBoundingClientRect().width)" },
            { label: "flex-basis 계산값", expr: "getComputedStyle(document.querySelector('#s')).flexBasis" },
            {
              label: "flex-grow, flex-shrink",
              expr: "(s => s.flexGrow + ', ' + s.flexShrink)(getComputedStyle(document.querySelector('#s')))",
            },
          ],
        },
      },
      {
        label: "flex-basis",
        body: "`flex-basis`는 아이템의 주축 방향 출발 크기입니다. 남는 공간을 나누기 전의 크기입니다. `box-sizing`을 바꾸지 않았다면 콘텐츠 상자 크기를 뜻합니다.\n`width`와의 관계가 헷갈리기 쉽습니다. basis가 auto가 아니면 basis가 width를 이깁니다. 세로 방향 컨테이너라면 height를 이깁니다. basis가 auto면 width를 쓰고, width도 auto면 콘텐츠 크기(`content`)를 씁니다. 그 뒤 `min-width`와 `max-width`가 마지막에 다시 묶습니다. 그래서 크기를 못 박으려면 basis와 함께 grow와 shrink를 0으로 둡니다.\n퍼센트는 플렉스 컨테이너 크기에 대한 비율입니다. 컨테이너 크기가 정해지지 않았으면 `content`로 다룹니다. MDN은 이 속성을 따로 쓰기보다 `flex` 단축 속성을 권합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "플렉스 아이템", "안 됨", "길이, 퍼센트, calc로"]],
          },
          {
            caption: "flex-basis의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "주축 크기 속성(width나 height)을 씁니다. 그것도 auto면 content"],
              ["content", "콘텐츠로 크기를 정합니다"],
              ["<길이>", "그 크기에서 출발합니다"],
              ["<퍼센트>", "플렉스 컨테이너 크기에 대한 비율입니다"],
              ["min-content, max-content", "콘텐츠의 최소 폭, 줄바꿈 없는 폭"],
              ["fit-content", "max-content까지 크되 담을 공간을 넘지 않습니다"],
            ],
          },
        ],
        code: ".item  { width: 300px; flex-basis: 100px; }   /* 출발 크기는 100px */\n.fixed { flex: 0 0 240px; }                    /* 240px에 고정 */",
        codeLang: "css",
      },
      {
        label: "flex-grow",
        body: "`flex-grow`는 남는 공간을 받는 비율입니다. 남는 공간은 컨테이너 주축 크기에서 아이템 크기의 합을 뺀 것입니다. 형제들의 grow를 모두 더한 수로 남는 공간을 나누고, 각자 자기 grow만큼 곱해 받습니다. 비율이라 모두 1이든 모두 100이든 결과가 같습니다. 초기값 0은 자라지 않는다는 뜻입니다. 음수는 쓸 수 없습니다.\nMDN의 예를 옮기면 이렇습니다. 700px 컨테이너에 100px 아이템이 넷이고, grow가 0, 1, 2, 3입니다. 남는 300px을 grow 합 6으로 나눠 한 몫이 50px입니다. 그래서 최종 폭은 100, 150, 200, 250px입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "플렉스 아이템", "안 됨", "숫자로"]],
          },
          {
            caption: "MDN의 예: 700px 컨테이너, 100px 아이템 넷",
            head: ["flex-grow", "받는 몫", "최종 폭"],
            rows: [
              ["0", "0", "100px"],
              ["1", "50px", "150px"],
              ["2", "100px", "200px"],
              ["3", "150px", "250px"],
            ],
          },
        ],
        code: ".a { flex-grow: 0; }   /* 그대로 */\n.b { flex-grow: 1; }   /* 한 몫 */\n.c { flex-grow: 2; }   /* 두 몫 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 남는 공간 나누기",
        body: "아이템은 모두 width 60px에서 출발합니다. grow가 0, 1, 2라 남는 공간을 0:1:2로 나눕니다. 지금 값의 '늘어난 몫'이 정확히 그 비율입니다. a는 자라지 않습니다.\n#b와 #c의 grow를 둘 다 100으로 바꾸면 b와 c가 같은 몫을 받습니다. 비율만 따지기 때문입니다. `.box`의 width를 줄이면 남는 공간이 줄지만, 몫의 비율은 그대로입니다. 아이템 합보다 작게 줄이면 이번에는 shrink 차례입니다. 여기서는 flex-shrink가 0이라 아이템이 상자를 넘칩니다.",
        lab: {
          html: `<style>
  .box { display: flex; width: 360px; background: #eee; }
  .box > div { width: 60px; flex-shrink: 0; background: #e3f0ff; outline: 1px solid #89a; }
  #a { flex-grow: 0; }
  #b { flex-grow: 1; }
  #c { flex-grow: 2; }
</style>
<div class="box" id="box">
  <div id="a">0</div><div id="b">1</div><div id="c">2</div>
</div>`,
          height: 140,
          tryIt: "#b와 #c의 flex-grow를 100으로 바꾸거나, .box의 width를 줄여 보세요.",
          checks: [
            {
              label: "a, b, c 폭",
              expr: "['#a', '#b', '#c'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().width)).join(', ')",
            },
            {
              label: "늘어난 몫 (폭 - 60)",
              expr: "['#a', '#b', '#c'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().width) - 60).join(', ')",
            },
            { label: "상자 폭", expr: "Math.round(document.querySelector('#box').getBoundingClientRect().width)" },
          ],
        },
      },
      {
        label: "flex-shrink",
        body: "`flex-shrink`는 공간이 모자랄 때 줄어드는 비율입니다. 아이템 출발 크기의 합이 컨테이너보다 크면, 넘치는 만큼을 나눠 뺍니다. 초기값이 1이라 아이템은 기본으로 줄어듭니다. 0이면 줄지 않습니다.\n빼는 몫은 shrink 값에 출발 크기를 곱한 비율로 나눕니다. 그래서 큰 아이템이 더 많이 줄고, 작은 아이템이 먼저 0이 되지 않습니다.\n가장 자주 걸리는 함정은 `min-width: auto`입니다. 플렉스 아이템의 min-width 초기값 auto는 콘텐츠 최소 크기로 풀립니다. 그래서 띄어쓰기 없는 긴 낱말이 든 아이템은 그 아래로 줄지 않고 컨테이너를 넘칩니다. `min-width: 0`이나 `overflow: hidden`을 주면 줄어듭니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["1", "플렉스 아이템", "안 됨", "숫자로"]],
          },
        ],
        code: ".logo  { flex-shrink: 0; }   /* 로고는 줄지 않는다 */\n.title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",
        codeLang: "css",
        terms: [
          {
            term: "자동 최소 크기 (min-width: auto)",
            body: "플렉스 아이템과 그리드 아이템에서 min-width 초기값 auto가 뜻하는 최소 크기입니다. 대개 콘텐츠 최소 크기, 곧 가장 긴 낱말의 폭입니다. 블록 요소에서는 0입니다. 접이식 자도 가장 긴 마디보다 짧게는 접히지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: flex-shrink와 min-width: auto",
        body: "두 아이템 모두 `flex: 1`이라 같은 폭을 기대합니다. 그런데 b에는 띄어쓰기 없는 긴 낱말이 있습니다. b의 min-width 계산값은 auto이고, 이 auto가 낱말 폭으로 풀립니다. 그래서 b는 그 아래로 줄지 않습니다. 지금 값의 '아이템 폭 합 - 상자 폭'이 0보다 큽니다. 아이템이 상자를 넘쳤다는 뜻입니다.\n`.long`의 min-width를 0으로 바꾸면 두 폭이 같아지고, 그 값이 0이 됩니다. 대신 낱말은 아이템 밖으로 삐져나옵니다. min-width를 auto로 두고 `overflow: hidden`을 넣어도 두 폭이 같아집니다. 이번에는 넘친 글자가 잘려 보입니다.",
        lab: {
          html: `<style>
  .box { display: flex; width: 240px; background: #eee; }
  .box > div { flex: 1; background: #e3f0ff; outline: 1px solid #89a; }
  .long { min-width: auto; }
</style>
<div class="box" id="box">
  <div id="a">짧은 글</div>
  <div class="long" id="b">Supercalifragilisticexpialidocious</div>
</div>`,
          height: 140,
          tryIt: ".long의 min-width를 0으로 바꿔 보고, 다시 auto로 둔 채 overflow: hidden을 더해 보세요.",
          checks: [
            {
              label: "a, b 폭",
              expr: "['#a', '#b'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().width)).join(', ')",
            },
            {
              label: "아이템 폭 합 - 상자 폭",
              expr: "Math.round(['#a', '#b'].reduce((n, s) => n + document.querySelector(s).getBoundingClientRect().width, 0) - document.querySelector('#box').getBoundingClientRect().width)",
            },
            { label: "b의 min-width 계산값", expr: "getComputedStyle(document.querySelector('#b')).minWidth" },
          ],
        },
      },
      {
        label: "flex-flow",
        body: "`flex-flow`는 방향과 줄바꿈을 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 flex-direction, flex-wrap입니다. 두 값은 순서 없이 써도 되고, 하나만 써도 됩니다. 빠진 쪽은 초기값이 됩니다. MDN은 두 속성을 이 단축 속성으로 함께 쓰라고 권합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["row nowrap (단축)", "플렉스 컨테이너", "안 됨", "불연속"]],
          },
        ],
        code: ".list  { flex-flow: row wrap; }   /* flex-direction: row; flex-wrap: wrap; */\n.stack { flex-flow: column; }     /* column nowrap */",
        codeLang: "css",
      },
      {
        label: "flex-direction",
        body: "`flex-direction`은 주축 방향을 정합니다. row는 글이 흐르는 방향, column은 블록이 쌓이는 방향입니다. row는 `dir`에 따라 뒤집힙니다. rtl이면 오른쪽에서 왼쪽입니다. column이면 justify-content가 세로를, align-items가 가로를 맡습니다.\n`-reverse` 값은 보이는 순서만 뒤집습니다. 화면 낭독기와 Tab 순서는 DOM 순서를 따릅니다. 그래서 MDN은 보이는 순서와 읽는 순서가 어긋날 수 있다고 경고합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["row", "플렉스 컨테이너", "안 됨", "불연속"]],
          },
          {
            caption: "flex-direction의 값",
            head: ["값", "하는 일"],
            rows: [
              ["row", "주축이 글 방향입니다. 가로쓰기면 가로"],
              ["row-reverse", "row와 같되 첫 아이템이 줄 끝 쪽에 놓입니다"],
              ["column", "주축이 블록 방향입니다. 가로쓰기면 세로"],
              ["column-reverse", "column과 같되 첫 아이템이 아래 끝에 놓입니다"],
            ],
          },
        ],
        code: ".toolbar { flex-direction: row; }\n.sidebar { flex-direction: column; }   /* 이제 justify-content가 세로를 맡는다 */",
        codeLang: "css",
      },
      {
        label: "flex-wrap",
        body: "`flex-wrap`은 아이템이 여러 줄로 넘어갈 수 있는지 정합니다. 초기값 nowrap은 한 줄에 모두 놓습니다. 그래서 컨테이너를 넘칠 수 있습니다. wrap이면 들어가지 않는 아이템이 다음 줄로 갑니다.\n여러 줄이 되면 줄마다 따로 공간을 나눕니다. 마지막 줄에 아이템이 적으면 grow 때문에 크게 늘어날 수 있습니다. 새 값 `balance`는 줄 길이를 비슷하게 맞춥니다. 혼자 쓰면 wrap과 함께 쓴 것으로 봅니다. 새로 정의된 값이라 쓰기 전에 지원을 확인합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["nowrap", "플렉스 컨테이너", "안 됨", "불연속"]],
          },
          {
            caption: "flex-wrap의 값",
            head: ["값", "하는 일"],
            rows: [
              ["nowrap", "한 줄에 놓습니다. 넘칠 수 있습니다"],
              ["wrap", "여러 줄로 넘어갑니다"],
              ["wrap-reverse", "wrap과 같되 줄이 거꾸로 쌓입니다"],
              ["balance", "줄 길이가 비슷하도록 나눕니다(새 값). nowrap과는 못 씁니다"],
            ],
          },
        ],
        code: ".tags { display: flex; flex-wrap: wrap; gap: 8px; }",
        codeLang: "css",
        terms: [
          {
            term: "플렉스 줄 (flex line)",
            body: "아이템이 한 줄로 늘어선 묶음입니다. nowrap이면 줄이 하나, wrap이면 여럿일 수 있습니다. grow와 shrink는 줄마다 따로 계산합니다. 원고지의 한 줄과 같습니다. 줄이 차면 다음 줄로 넘어갑니다.",
          },
        ],
      },
      {
        label: "justify-content",
        body: "`justify-content`는 주축 방향의 남는 공간을 아이템 사이와 둘레에 나눕니다. 한 줄 안의 공간만 다룹니다. 줄과 줄 사이는 `align-content`가 맡습니다.\n정렬은 길이와 auto 마진을 다 적용한 뒤에 합니다. 그래서 grow가 0보다 큰 아이템이 있으면 남는 공간이 없어 효과가 없습니다. 플렉스에서는 늘이는 일을 flex가 맡으므로 `stretch`는 flex-start처럼 동작합니다. 초기값 normal도 플렉스에서는 start처럼 놓입니다.\n`safe`를 앞에 붙이면 아이템이 넘칠 때 start로 물러나 내용이 잘리지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "플렉스, 그리드, 다단 컨테이너", "안 됨", "불연속"]],
          },
          {
            caption: "justify-content의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "플렉스에서는 start처럼 놓습니다"],
              ["flex-start, flex-end", "주축의 시작, 끝 쪽에 모읍니다. -reverse면 함께 뒤집힙니다"],
              ["start, end", "정렬 컨테이너의 시작, 끝 쪽에 모읍니다"],
              ["left, right", "왼쪽, 오른쪽에 모읍니다. 주축이 가로가 아니면 start처럼"],
              ["center", "가운데에 모읍니다"],
              ["space-between", "사이를 같게 나눕니다. 처음과 끝은 가장자리에 붙습니다"],
              ["space-around", "사이를 같게 나눕니다. 양 끝 공간은 사이의 절반입니다"],
              ["space-evenly", "양 끝과 사이를 모두 같게 나눕니다"],
              ["stretch", "플렉스에서는 flex-start처럼 동작합니다"],
              ["safe, unsafe", "넘칠 때 start로 물러날지(safe), 그대로 둘지(unsafe)"],
            ],
          },
        ],
        code: ".nav    { display: flex; justify-content: space-between; }\n.center { display: flex; justify-content: safe center; }   /* 넘치면 start로 */",
        codeLang: "css",
      },
      {
        label: "align-items",
        body: "`align-items`는 모든 자식의 기본 `align-self`를 정합니다. 플렉스에서는 각 줄 안에서 교차축으로 정렬합니다. 초기값 normal은 플렉스 아이템에서 stretch로 동작합니다. 그래서 행 방향 아이템은 기본으로 줄 높이만큼 늘어납니다.\nstretch는 교차축 크기가 auto인 아이템만 늘입니다. 높이를 정해 둔 아이템은 flex-start로 물러납니다. 늘어나지 않게 하려면 `align-items: flex-start`나 center를 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소", "안 됨", "불연속"]],
          },
          {
            caption: "align-items의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "플렉스 아이템에서는 stretch처럼 동작합니다"],
              ["stretch", "교차축 크기가 auto면 줄을 채우도록 늘입니다"],
              ["flex-start, flex-end", "교차축의 시작, 끝에 붙입니다"],
              ["start, end", "정렬 컨테이너의 시작, 끝에 붙입니다"],
              ["self-start, self-end", "아이템 자신의 시작, 끝 방향 쪽에 붙입니다"],
              ["center", "교차축 가운데에 둡니다. 크면 양쪽으로 똑같이 넘칩니다"],
              ["baseline", "글자의 기준선을 맞춥니다"],
              ["anchor-center", "앵커 위치 지정 요소를 앵커의 가운데에 맞춥니다"],
              ["safe, unsafe", "넘칠 때 start로 물러날지, 그대로 둘지"],
            ],
          },
        ],
        code: ".row      { display: flex; align-items: center; }     /* 세로 가운데 */\n.form-row { display: flex; align-items: baseline; }   /* 라벨과 입력의 글줄을 맞춤 */",
        codeLang: "css",
      },
      {
        label: "align-self",
        body: "`align-self`는 아이템 하나만 교차축으로 따로 정렬합니다. 부모의 align-items를 이 아이템에서만 덮어씁니다. 초기값 auto는 부모의 align-items 값을 따릅니다. 나머지 값은 align-items와 같습니다.\n플렉스에는 주축 방향으로 아이템 하나만 옮기는 속성이 없습니다. `justify-self`는 플렉스 아이템에서 무시됩니다. 그때는 `margin-left: auto` 같은 auto 마진을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "플렉스 아이템, 그리드 아이템, 절대 위치 상자", "안 됨", "불연속"]],
          },
          {
            caption: "align-self의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "부모의 align-items 값을 씁니다"],
              ["그 밖의 값", "align-items의 값과 같습니다. 이 아이템에만 적용됩니다"],
            ],
          },
        ],
        code: ".box { display: flex; align-items: flex-start; }\n.box > .tall { align-self: stretch; }\n.box > .push { margin-left: auto; }   /* 주축은 auto 마진으로 민다 */",
        codeLang: "css",
      },
      {
        label: "align-content",
        body: "`align-content`는 플렉스 줄들 사이와 둘레의 교차축 공간을 나눕니다. 아이템 하나가 아니라 줄 전체를 움직입니다. 그래서 MDN은 한 줄 컨테이너, 곧 `flex-wrap: nowrap`에는 효과가 없다고 적습니다. 효과를 보려면 `flex-wrap: wrap`과 교차축의 여유 공간이 있어야 합니다. 플렉스에서 초기값 normal은 줄들을 늘여 채웁니다.\n그리드에서는 행 트랙 전체를 블록 축으로 옮깁니다. 블록 컨테이너에도 적용됩니다. 블록에서는 내용 전체를 한 덩어리로 보므로 space-between 같은 분배 값은 효과가 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "플렉스, 그리드, 블록, 다단 컨테이너", "안 됨", "불연속"]],
          },
          {
            caption: "align-content의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "값을 주지 않은 것처럼 기본 위치에 둡니다"],
              ["flex-start, flex-end", "줄들을 교차축 시작, 끝에 모읍니다"],
              ["start, end", "정렬 컨테이너의 시작, 끝에 모읍니다"],
              ["center", "줄들을 가운데에 모읍니다"],
              ["space-between", "줄 사이를 같게. 첫 줄과 끝 줄은 가장자리에 붙습니다"],
              ["space-around, space-evenly", "줄 사이와 양 끝에 공간을 나눕니다"],
              ["stretch", "auto 크기의 줄을 똑같이 늘여 채웁니다"],
              ["baseline", "첫 줄이나 마지막 줄의 기준선을 맞춥니다"],
              ["safe, unsafe", "넘칠 때 start로 물러날지, 그대로 둘지"],
            ],
          },
        ],
        code: ".wall { display: flex; flex-wrap: wrap; height: 400px; align-content: space-between; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: align-content는 wrap일 때만",
        body: "지금은 `flex-wrap: nowrap`이라 한 줄 컨테이너입니다. `align-content: center`를 줬지만 효과가 없습니다. 첫 아이템은 상자 위에 붙어 있고, 높이는 상자를 채웁니다. 한 줄이 교차축을 다 차지하고, align-items 기본값이 아이템을 늘이기 때문입니다.\nnowrap을 wrap으로 바꾸면 줄 수가 늘어납니다. 이제 줄들이 가운데로 모여 '첫 아이템 위쪽 - 상자 위쪽'이 0보다 커집니다. 아이템 높이도 콘텐츠 높이로 줄어듭니다. 다음에는 center를 space-between이나 stretch로 바꿔 줄 위치를 견주어 보세요.",
        lab: {
          html: `<style>
  .box {
    display: flex; flex-wrap: nowrap; align-content: center;
    width: 240px; height: 160px; background: #eee;
  }
  .box > div { width: 70px; background: #e3f0ff; outline: 1px solid #89a; }
</style>
<div class="box" id="box">
  <div id="first">1</div><div>2</div><div>3</div><div>4</div>
</div>`,
          height: 200,
          tryIt: "flex-wrap: nowrap을 wrap으로 바꾸고, 그다음 align-content 값을 바꿔 보세요.",
          checks: [
            { label: "flex-wrap", expr: "getComputedStyle(document.querySelector('#box')).flexWrap" },
            {
              label: "줄 수",
              expr: "new Set([...document.querySelector('#box').children].map(e => Math.round(e.getBoundingClientRect().top))).size",
            },
            {
              label: "첫 아이템 위쪽 - 상자 위쪽",
              expr: "Math.round(document.querySelector('#first').getBoundingClientRect().top - document.querySelector('#box').getBoundingClientRect().top)",
            },
            { label: "첫 아이템 높이", expr: "Math.round(document.querySelector('#first').getBoundingClientRect().height)" },
          ],
        },
      },
      {
        label: "order",
        body: "`order`는 플렉스 아이템과 그리드 아이템이 보이는 순서를 바꿉니다. 작은 값이 먼저 놓이고, 같으면 DOM 순서를 따릅니다. 초기값이 0이라 -1을 주면 맨 앞으로 갑니다. 부모가 플렉스나 그리드 컨테이너가 아니면 효과가 없습니다.\n보이는 순서만 바뀝니다. Tab 순서와 화면 낭독기의 읽는 순서는 DOM 그대로입니다. MDN은 이 어긋남이 보조 기술을 쓰는 사람에게 해롭다고 경고합니다. 순서에 뜻이 있으면 DOM을 바꿉니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "플렉스 아이템, 그리드 아이템", "안 됨", "정수로"]],
          },
        ],
        code: ".first { order: -1; }   /* 맨 앞에 보인다. Tab 순서는 그대로 */",
        codeLang: "css",
      },
      {
        label: "gap",
        body: "`gap`은 아이템 사이와 줄 사이의 간격입니다. 단축 속성입니다. 풀어 쓰면 row-gap, column-gap입니다. 값 하나면 둘에 같은 값이 들어갑니다. 둘이면 row-gap, column-gap 순서입니다.\n플렉스 행 방향에서는 첫 값이 줄 사이, 둘째 값이 한 줄 안의 아이템 사이입니다. 간격은 아이템 사이에만 생기고 바깥 가장자리에는 생기지 않습니다. 그래서 마진으로 간격을 줄 때 생기는 끝 여백 문제가 없습니다. 퍼센트는 컨테이너 콘텐츠 상자에 대한 비율입니다. 보이는 간격은 마진이나 space-* 정렬 때문에 gap보다 넓을 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal normal (단축)", "다단, 플렉스, 그리드 컨테이너", "안 됨", "풀어 쓴 속성 따라"]],
          },
          {
            caption: "gap의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "다단 레이아웃은 1em, 그 밖은 0입니다"],
              ["<길이>, <퍼센트>", "음수가 아닌 간격입니다"],
            ],
          },
        ],
        code: ".cards { display: flex; flex-wrap: wrap; gap: 16px 8px; }   /* 줄 사이 16px, 아이템 사이 8px */",
        codeLang: "css",
      },
      {
        label: "row-gap, column-gap",
        body: "`row-gap`은 행 사이, `column-gap`은 열 사이 간격입니다. 플렉스 행 방향에서는 row-gap이 줄 사이, column-gap이 아이템 사이입니다. 초기값 normal은 다단 레이아웃에서 1em, 그 밖에서는 0입니다. 그리드 시절의 옛 이름 `grid-row-gap`, `grid-column-gap`도 별칭으로 받습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "다단, 플렉스, 그리드 컨테이너", "안 됨", "길이, 퍼센트, calc로"]],
          },
          {
            caption: "row-gap, column-gap의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "다단 레이아웃은 1em, 그 밖은 0입니다"],
              ["<길이>, <퍼센트>", "음수가 아닌 간격입니다"],
            ],
          },
        ],
        code: ".list { display: flex; flex-direction: column; row-gap: 12px; }",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "플렉스 속성에서 자주 부딪히는 것들입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["flex: 1을 둘에 줬다", "한쪽이 더 넓다. 긴 낱말이 자동 최소 크기에 걸렸다", "그 아이템에 min-width: 0이나 overflow: hidden"],
              ["아이템에 width: 200px를 줬다", "그 폭이 아니다. basis가 이기거나 shrink로 줄었다", "flex: 0 0 200px"],
              ["nowrap 컨테이너에 align-content", "아무 일도 없다", "flex-wrap: wrap"],
              ["justify-content: center를 줬다", "가운데로 안 모인다. grow 아이템이 공간을 다 가져갔다", "grow를 0으로, 또는 auto 마진"],
              ["order로 순서를 바꿨다", "Tab 순서와 읽는 순서는 그대로다", "DOM 순서를 바꾼다"],
              ["플렉스 아이템에 justify-self", "무시된다", "margin-left: auto나 justify-content"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) `flex: 1`, `flex: auto`, `flex: none`을 풀어 쓰면 무엇인가요?\n2) flex-basis와 width가 둘 다 있으면 무엇이 이기나요?\n3) 긴 낱말이 든 아이템이 shrink 1인데도 줄지 않는 까닭은?\n4) align-content가 효과를 내려면 무엇이 필요한가요?",
      },
    ],
    sources: [
      { label: "MDN: flex", href: `${MDN}/Reference/Properties/flex` },
      { label: "MDN: flex-basis", href: `${MDN}/Reference/Properties/flex-basis` },
      { label: "MDN: Controlling ratios of flex items along the main axis", href: `${MDN}/Guides/Flexible_box_layout/Controlling_flex_item_ratios` },
      { label: "MDN: align-content", href: `${MDN}/Reference/Properties/align-content` },
      { label: "MDN: order", href: `${MDN}/Reference/Properties/order` },
      { label: "MDN: gap", href: `${MDN}/Reference/Properties/gap` },
    ],
  },

  {
    id: "css-prop-grid",
    name: "그리드 속성",
    tagline: "트랙을 정하고, 선과 이름으로 아이템을 놓는다",
    intro:
      "그리드 속성은 세 무리입니다. 트랙을 정하는 것(grid-template-*, grid-auto-*), 아이템을 놓는 것(grid-column, grid-row, grid-area), 정렬하는 것(justify-*, place-*)입니다. 트랙 크기는 fr, minmax(), repeat()로 적습니다. 아이템은 선 번호, span, 영역 이름으로 놓습니다. 정하지 않은 자리로 아이템이 가면 암묵적 트랙이 생깁니다. 이 시트는 속성마다 정의와 값을 모은 참고서입니다. 원리는 7장 그리드에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "위의 여덟 개는 컨테이너에, grid-column부터 grid-area까지는 아이템에 줍니다. justify-items와 place-items는 컨테이너, justify-self와 place-self는 아이템입니다. align-* 속성은 플렉스 속성 시트에 있습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["grid-template-columns", "열 트랙의 크기와 선 이름", "none", "안 됨", "7장 · 그리드"],
              ["grid-template-rows", "행 트랙의 크기와 선 이름", "none", "안 됨", "7장 · 그리드"],
              ["grid-template-areas", "칸에 이름을 붙여 영역 만들기", "none", "안 됨", "7장 · 그리드"],
              ["grid-template", "위 셋을 한 번에", "none", "안 됨", "7장 · 그리드"],
              ["grid", "명시적, 암묵적 그리드를 한 번에", "none", "안 됨", "7장 · 그리드"],
              ["grid-auto-flow", "자동 배치 방향과 dense", "row", "안 됨", "7장 · 그리드"],
              ["grid-auto-columns", "암묵적 열의 크기", "auto", "안 됨", "7장 · 그리드"],
              ["grid-auto-rows", "암묵적 행의 크기", "auto", "안 됨", "7장 · 그리드"],
              ["grid-column", "아이템의 열 시작선과 끝선", "auto", "안 됨", "7장 · 그리드"],
              ["grid-row", "아이템의 행 시작선과 끝선", "auto", "안 됨", "7장 · 그리드"],
              ["grid-area", "영역 이름이나 네 선으로 놓기", "auto", "안 됨", "7장 · 그리드"],
              ["justify-items", "모든 아이템의 인라인 축 기본 정렬", "legacy", "안 됨", "7장 · 그리드"],
              ["justify-self", "아이템 하나의 인라인 축 정렬", "auto", "안 됨", "7장 · 그리드"],
              ["place-items", "align-items와 justify-items를 한 번에", "normal legacy", "안 됨", "7장 · 그리드"],
              ["place-content", "align-content와 justify-content를 한 번에", "normal", "안 됨", "7장 · 그리드"],
              ["place-self", "align-self와 justify-self를 한 번에", "auto", "안 됨", "7장 · 그리드"],
            ],
          },
        ],
      },
      {
        label: "grid-template-columns",
        body: "`grid-template-columns`는 열 트랙의 개수와 크기를 정합니다. 값을 하나 적을 때마다 열이 하나 생깁니다. 트랙 사이의 선에는 `[이름]`을 붙일 수 있습니다.\n`fr`은 남는 공간의 몫입니다. 고정 트랙과 간격을 먼저 빼고, 남은 것을 fr 비율로 나눕니다. `minmax(최소, 최대)`는 크기의 범위입니다. minmax 밖의 `1fr`은 사실 `minmax(auto, 1fr)`이라 콘텐츠 최소 크기 아래로 줄지 않습니다. 같은 폭을 확실히 원하면 `minmax(0, 1fr)`을 씁니다.\n\n`repeat(횟수, 트랙)`은 같은 트랙을 되풀이합니다. 횟수 자리에 `auto-fill`이나 `auto-fit`을 쓰면 컨테이너에 들어가는 만큼 반복합니다. 이때 트랙은 `100px`이나 `minmax(100px, 1fr)`처럼 고정 크기를 품어야 합니다. 둘은 빈 트랙에서 갈립니다. auto-fill은 빈 트랙도 자리를 차지합니다. auto-fit은 빈 트랙을 0으로 접어, 있는 아이템이 늘어나 채웁니다.\n`getComputedStyle`로 읽으면 레이아웃이 끝난 px 트랙 목록이 나옵니다. 암묵적 트랙도 함께 나옵니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "그리드 컨테이너", "안 됨", "트랙 목록에서 길이 값만 다르면 보간"]],
          },
          {
            caption: "grid-template-columns의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "명시적 그리드가 없습니다. 열은 grid-auto-columns로 생깁니다"],
              ["[이름]", "그 자리의 선에 이름을 붙입니다. span과 auto는 못 씁니다"],
              ["<길이>, <퍼센트>", "고정 크기입니다. 퍼센트는 컨테이너 인라인 크기 기준"],
              ["<flex> (fr)", "남는 공간의 몫입니다. 최소는 auto입니다"],
              ["min-content, max-content", "트랙 안 아이템의 가장 큰 최소, 최대 콘텐츠 크기"],
              ["auto", "최대로는 max-content, 최소로는 아이템의 최소 크기. 남는 공간을 늘여 채울 수 있습니다"],
              ["minmax(최소, 최대)", "크기 범위입니다. fr은 최대 자리에만 씁니다"],
              ["fit-content(한도)", "max-content까지 크되 한도를 넘지 않습니다"],
              ["repeat(횟수, 트랙)", "트랙 묶음을 되풀이합니다. auto-fill, auto-fit을 쓸 수 있습니다"],
              ["subgrid", "부모 그리드의 트랙을 그대로 씁니다"],
            ],
          },
        ],
        code: ".layout { grid-template-columns: [side] 200px [main] 1fr; }\n.even   { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n.cards  { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }",
        codeLang: "css",
        terms: [
          {
            term: "트랙 (track)",
            body: "그리드의 한 열이나 한 행입니다. 이웃한 두 격자선 사이의 띠입니다. grid-template-columns의 값 하나가 열 트랙 하나입니다. 책장의 선반 한 단과 같습니다.",
          },
          {
            term: "격자선 (grid line)",
            body: "트랙과 트랙 사이의 경계선입니다. 앞에서 1부터 번호가 붙고, 끝에서는 -1부터 거꾸로 셉니다. 열이 셋이면 선은 넷입니다. 주차장 바닥의 흰 선과 같습니다. 차는 선과 선 사이에 섭니다.",
          },
          {
            term: "fr",
            body: "남는 공간을 나누는 몫의 단위입니다. 고정 트랙과 간격을 먼저 뺀 뒤 나눕니다. `1fr 2fr`이면 1:2입니다. 회비를 쓰고 남은 돈을 지분대로 나누는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: auto-fill과 auto-fit",
        body: "아이템은 둘뿐입니다. auto-fill은 창 폭에 들어가는 만큼 트랙을 만들고, 빈 트랙도 자리를 차지합니다. 폭 버튼을 눌러 창을 넓히면 열 트랙 수가 늘고, 첫 아이템은 좁아집니다. 기록에는 resize 줄이 생깁니다.\n`auto-fill`을 `auto-fit`으로 바꿔 실행한 뒤 폭 버튼을 다시 눌러 보세요. 열 트랙 수는 auto-fill과 같습니다. 빈 트랙도 계산값에 0px로 남기 때문입니다. 대신 '0보다 큰 트랙 수'가 아이템 수에 머물고, 첫 아이템이 넓어집니다. 빈 트랙이 접혀서 두 아이템이 폭을 나눠 가지기 때문입니다. 창이 좁아 트랙이 아이템 수만큼만 들어가면 둘은 같아 보입니다.",
        lab: {
          html: `<style>
  .grid {
    display: grid; gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  .grid > div { background: #e3f0ff; outline: 1px solid #89a; }
</style>
<div class="grid" id="g">
  <div id="first">1</div>
  <div>2</div>
</div>`,
          height: 140,
          widths: [320, 480, 640],
          tryIt: "폭 버튼을 차례로 누른 뒤, auto-fill을 auto-fit으로 바꿔 다시 눌러 보세요.",
          checks: [
            {
              label: "열 트랙 수 (0px 포함)",
              expr: "getComputedStyle(document.querySelector('#g')).gridTemplateColumns.split(' ').length",
            },
            {
              label: "0보다 큰 트랙 수",
              expr: "getComputedStyle(document.querySelector('#g')).gridTemplateColumns.split(' ').filter(v => parseFloat(v) > 0).length",
            },
            { label: "첫 아이템 폭", expr: "Math.round(document.querySelector('#first').getBoundingClientRect().width)" },
          ],
        },
      },
      {
        label: "grid-template-rows",
        body: "`grid-template-rows`는 행 트랙의 개수와 크기를 정합니다. 값은 grid-template-columns와 같습니다. 정한 행보다 아이템이 많으면 나머지 행은 grid-auto-rows 크기로 생깁니다. 행에서 fr로 높이를 나누려면 컨테이너에 높이가 있어야 뜻대로 됩니다. 머리, 본문, 바닥처럼 세로 골격을 짤 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "그리드 컨테이너", "안 됨", "트랙 목록에서 길이 값만 다르면 보간"]],
          },
          {
            caption: "grid-template-rows의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "명시적 행이 없습니다. 행은 grid-auto-rows로 생깁니다"],
              ["그 밖의 값", "grid-template-columns의 값과 같습니다"],
            ],
          },
        ],
        code: ".page { display: grid; min-height: 100dvh; grid-template-rows: auto 1fr auto; }   /* 머리, 본문, 바닥 */",
        codeLang: "css",
      },
      {
        label: "grid-template-areas",
        body: "`grid-template-areas`는 그리드 칸에 이름을 붙여 영역을 그립니다. 문자열 하나가 행 하나이고, 문자열 안의 낱말 하나가 칸 하나입니다. 같은 이름이 이어진 칸들은 한 영역이 됩니다. 아이템에 `grid-area: 이름`을 주면 그 영역에 놓입니다. DOM 순서와 상관없습니다.\n이름 없는 칸은 점(`.`)으로 비웁니다. 영역은 반드시 직사각형이어야 합니다. ㄱ자처럼 꺾이면 선언 전체가 무효가 됩니다. 행마다 칸 수가 달라도 무효입니다.\n영역 이름을 지으면 `이름-start`, `이름-end` 선 이름도 저절로 생깁니다. 그래서 `grid-column: main-start`처럼 선 이름으로도 쓸 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "그리드 컨테이너", "안 됨", "불연속"]],
          },
          {
            caption: "grid-template-areas의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "이름 붙인 영역이 없습니다"],
              ["<문자열>…", "문자열마다 행 하나, 낱말마다 칸 하나입니다"],
              [". (점)", "이름 없는 빈칸입니다. 점 여러 개도 한 칸입니다"],
            ],
          },
        ],
        code: ".layout {\n  display: grid;\n  grid-template-columns: 160px 1fr;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.layout > header { grid-area: head; }",
        codeLang: "css",
        terms: [
          {
            term: "그리드 영역 (grid area)",
            body: "격자선 넷으로 둘러싸인 직사각형 구역입니다. 칸 하나일 수도, 여러 칸을 묶은 것일 수도 있습니다. 아이템 하나는 영역 하나를 차지합니다. 아파트 평면도에서 거실, 안방처럼 이름 붙인 구역과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 이름 붙인 영역에 놓기",
        body: "DOM 순서는 main, foot, side, head로 뒤섞었습니다. 그래도 각자 이름 붙인 영역에 놓입니다. head는 두 칸을 차지해 그리드 폭과 같고, main은 side 오른쪽에 섭니다. 위에서부터 head, main, foot 순서입니다. 지금 값의 세 줄이 모두 true입니다.\n첫 문자열을 \"head side\"로 바꿔 보세요. side 영역이 ㄱ자로 꺾여 직사각형이 아니게 됩니다. 그러면 선언 전체가 무효라, 계산값이 none이 됩니다. 아이템들은 엉뚱한 자리로 밀려나고 true가 false로 바뀝니다. \"side head\"로 고치면 다시 직사각형이라 계산값이 돌아옵니다. 이번에는 head가 한 칸뿐이라 첫 줄만 false입니다.",
        lab: {
          html: `<style>
  .g {
    display: grid; gap: 6px;
    grid-template-columns: 90px 1fr;
    grid-template-areas: "head head" "side main" "foot foot";
  }
  .g > div { background: #e3f0ff; padding: 4px; }
  #h { grid-area: head; } #s { grid-area: side; }
  #m { grid-area: main; } #f { grid-area: foot; }
</style>
<div class="g" id="g">
  <div id="m">main</div><div id="f">foot</div>
  <div id="s">side</div><div id="h">head</div>
</div>`,
          height: 180,
          tryIt: "첫 문자열 \"head head\"를 \"head side\"로, 다시 \"side head\"로 바꿔 보세요.",
          checks: [
            { label: "grid-template-areas 계산값", expr: "getComputedStyle(document.querySelector('#g')).gridTemplateAreas" },
            {
              label: "head 폭 = 그리드 폭",
              expr: "Math.round(document.querySelector('#h').getBoundingClientRect().width) === Math.round(document.querySelector('#g').getBoundingClientRect().width)",
            },
            {
              label: "main이 side 오른쪽에 있나",
              expr: "document.querySelector('#m').getBoundingClientRect().left >= document.querySelector('#s').getBoundingClientRect().right",
            },
            {
              label: "위에서부터 head, main, foot",
              expr: "(t => t('#h') < t('#m') && t('#m') < t('#f'))(s => document.querySelector(s).getBoundingClientRect().top)",
            },
          ],
        },
      },
      {
        label: "grid-template",
        body: "`grid-template`은 행, 열, 영역을 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 grid-template-rows, grid-template-columns, grid-template-areas입니다. 기본 꼴은 `행 / 열`입니다. 이때 영역은 none이 됩니다.\n영역 문자열과 함께 쓸 수도 있습니다. 문자열 뒤에 그 행의 높이를 적고, 빗금 뒤에 열 목록을 적습니다. 높이를 빼면 auto입니다. 이 꼴에서는 `repeat()`를 쓸 수 없습니다. 문자열과 트랙이 눈으로 한 줄씩 맞도록 하려는 규칙입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none (단축)", "그리드 컨테이너", "안 됨", "풀어 쓴 속성 따라"]],
          },
          {
            caption: "grid-template의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "세 속성 모두 none입니다. 명시적 그리드가 없습니다"],
              ["<행> / <열>", "행과 열을 정하고 영역은 none으로 둡니다"],
              ["문자열과 행 높이 / <열>", "영역, 행 높이, 열을 함께 정합니다. repeat()는 못 씁니다"],
            ],
          },
        ],
        code: ".a { grid-template: auto 1fr auto / 200px 1fr; }   /* 행 / 열 */\n.b {\n  grid-template:\n    \"head head\" 60px\n    \"side main\" 1fr\n    / 160px 1fr;\n}",
        codeLang: "css",
      },
      {
        label: "grid",
        body: "`grid`는 명시적 그리드와 암묵적 그리드 속성을 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, grid-auto-flow입니다. 간격(gap)은 되돌리지 않습니다.\n꼴은 셋입니다. grid-template과 같은 꼴, `행 / auto-flow 열크기`, `auto-flow 행크기 / 열`입니다. `auto-flow`를 빗금 어느 쪽에 두느냐로 자동 배치 방향이 정해집니다. 오른쪽이면 column, 왼쪽이면 row입니다.\n주의할 점은 초기화입니다. 적지 않은 하위 속성은 모두 초기값으로 돌아갑니다. 그래서 앞에서 정한 grid-auto-flow나 grid-auto-rows가 사라질 수 있습니다. 템플릿만 바꾸려면 grid-template을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none (단축)", "그리드 컨테이너", "안 됨", "풀어 쓴 속성 따라"]],
          },
          {
            caption: "grid의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<'grid-template'>", "grid-template과 같은 꼴입니다. 암묵적 속성은 초기값으로"],
              ["<행> / auto-flow dense? <열 크기>", "행을 정하고 열은 자동으로 늘립니다. grid-auto-flow는 column"],
              ["auto-flow dense? <행 크기> / <열>", "열을 정하고 행은 자동으로 늘립니다. grid-auto-flow는 row"],
            ],
          },
        ],
        code: ".feed  { grid: auto-flow 120px / repeat(3, 1fr); }   /* 열 셋, 행은 120px씩 자동 */\n.strip { grid: 100px / auto-flow 80px; }              /* 행 하나, 열이 자동으로 늘어남 */",
        codeLang: "css",
      },
      {
        label: "grid-auto-flow",
        body: "`grid-auto-flow`는 자리를 정하지 않은 아이템을 어떻게 채울지 정합니다. 초기값 row는 행을 하나씩 채우고, 모자라면 행을 더합니다. column은 열을 하나씩 채우고, 모자라면 열을 더합니다.\n기본 배치는 앞으로만 나아갑니다. 큰 아이템이 남은 칸에 들어가지 못해 다음 행으로 가면 빈칸이 남습니다. `dense`를 더하면 뒤의 작은 아이템으로 앞의 빈칸을 메웁니다. 그 대신 보이는 순서가 DOM 순서와 달라집니다. Tab 순서와 읽는 순서는 DOM을 따르므로, 순서가 중요한 목록에는 쓰지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["row", "그리드 컨테이너", "안 됨", "불연속"]],
          },
          {
            caption: "grid-auto-flow의 값",
            head: ["값", "하는 일"],
            rows: [
              ["row", "행을 차례로 채우고, 필요하면 행을 더합니다"],
              ["column", "열을 차례로 채우고, 필요하면 열을 더합니다"],
              ["dense", "뒤의 작은 아이템으로 앞의 빈칸을 메웁니다. 혼자 쓰면 row dense"],
              ["row dense, column dense", "방향과 dense를 함께 씁니다"],
            ],
          },
        ],
        code: ".gallery { grid-auto-flow: row dense; }   /* 빈칸 메우기. 보이는 순서가 바뀔 수 있다 */",
        codeLang: "css",
        terms: [
          {
            term: "명시적 그리드, 암묵적 그리드",
            body: "grid-template-*로 정한 트랙이 명시적 그리드입니다. 아이템이 그 밖에 놓이면 브라우저가 트랙을 더 만듭니다. 이것이 암묵적 그리드이고, 크기는 grid-auto-rows와 grid-auto-columns가 정합니다. 예약석이 다 차면 보조 의자를 꺼내 놓는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 암묵적 행과 dense",
        body: "B는 열 셋을 차지하므로 첫 행의 남은 두 칸에 들어가지 못합니다. 그래서 둘째 행으로 가고, 첫 행에 빈칸 둘이 남습니다. C는 B 뒤로만 나아가 셋째 행에 놓입니다. 명시적 행이 없으니 행은 모두 암묵적이고, 높이는 grid-auto-rows입니다. 지금 값의 행 트랙 수는 3입니다.\ngrid-auto-flow를 `row dense`로 바꿔 보세요. C가 첫 행의 빈칸으로 올라가 'C가 A와 같은 행인가'가 true가 됩니다. 행 트랙 수도 하나 줄어듭니다. DOM 순서는 여전히 A, B, C입니다.",
        lab: {
          html: `<style>
  .g {
    display: grid; gap: 6px;
    grid-template-columns: repeat(3, 70px);
    grid-auto-rows: 40px;
    grid-auto-flow: row;
  }
  .g > div { background: #e3f0ff; outline: 1px solid #89a; }
  #b { grid-column: span 3; }
</style>
<div class="g" id="g">
  <div id="a">A</div><div id="b">B (span 3)</div><div id="c">C</div>
</div>`,
          height: 180,
          tryIt: "grid-auto-flow: row를 row dense로 바꿔 보세요. grid-auto-rows 값도 바꿔 보세요.",
          checks: [
            { label: "grid-auto-flow", expr: "getComputedStyle(document.querySelector('#g')).gridAutoFlow" },
            { label: "행 트랙 수", expr: "getComputedStyle(document.querySelector('#g')).gridTemplateRows.split(' ').length" },
            { label: "행 트랙 크기", expr: "getComputedStyle(document.querySelector('#g')).gridTemplateRows" },
            {
              label: "C가 A와 같은 행인가",
              expr: "Math.round(document.querySelector('#c').getBoundingClientRect().top) === Math.round(document.querySelector('#a').getBoundingClientRect().top)",
            },
          ],
        },
      },
      {
        label: "grid-auto-columns, grid-auto-rows",
        body: "두 속성은 암묵적 트랙의 크기를 정합니다. grid-auto-rows는 행, grid-auto-columns는 열입니다. 초기값 auto는 콘텐츠에 맞춘 크기입니다. 크기를 여러 개 적으면 그 패턴을 되풀이합니다. 명시적 트랙에는 영향이 없습니다.\n카드 목록처럼 행 수를 미리 모를 때 씁니다. `minmax(100px, auto)`를 주면 행이 최소 100px을 지키면서, 콘텐츠가 많으면 늘어납니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "그리드 컨테이너", "안 됨", "계산값 종류에 따라"]],
          },
          {
            caption: "grid-auto-columns, grid-auto-rows의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "최대로는 max-content, 최소로는 아이템의 최소 크기"],
              ["<트랙 크기>", "길이, 퍼센트, fr, minmax(), fit-content() 같은 트랙 크기"],
              ["크기 여러 개", "적은 순서대로 되풀이합니다"],
            ],
          },
        ],
        code: ".cards { grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(100px, auto); }\n.zebra { grid-auto-rows: 40px 80px; }   /* 40, 80, 40, 80 … */",
        codeLang: "css",
      },
      {
        label: "grid-column, grid-row",
        body: "아이템이 어느 선에서 시작해 어느 선에서 끝날지 정합니다. 둘 다 단축 속성입니다. grid-column은 풀어 쓰면 grid-column-start, grid-column-end입니다. grid-row는 grid-row-start, grid-row-end입니다. 빗금 앞이 시작선, 뒤가 끝선입니다.\n선 번호는 앞에서 1부터 셉니다. 음수는 명시적 그리드의 끝에서 거꾸로 셉니다. 그래서 `1 / -1`은 명시적 그리드 전체를 덮습니다. 0은 쓸 수 없습니다. `span 2`는 반대쪽 선에서 두 칸 떨어진 선까지라는 뜻입니다. 선 이름도 쓸 수 있습니다.\n명시적 그리드 밖의 선을 적으면 암묵적 트랙이 생깁니다. 끝선을 빼면 한 칸(span 1)입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto / auto (단축)", "그리드 아이템, 그리드가 포함 블록인 절대 위치 상자", "안 됨", "불연속"]],
          },
          {
            caption: "grid-column, grid-row의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "자동 배치입니다. 한 칸을 차지합니다"],
              ["<정수>", "n번째 선입니다. 음수는 끝에서 거꾸로. 0은 무효입니다"],
              ["<이름>", "그 이름의 선입니다. 영역 이름이면 이름-start, 이름-end 선"],
              ["<정수> <이름>", "그 이름을 가진 선 가운데 n번째"],
              ["span <정수>", "반대쪽 선에서 n칸 떨어진 선까지"],
              ["span <이름>", "그 이름의 선이 나올 때까지"],
            ],
          },
        ],
        code: ".full  { grid-column: 1 / -1; }       /* 명시적 열 전체 */\n.wide  { grid-column: 2 / span 2; }   /* 2번 선에서 두 칸 */\n.tall  { grid-row: span 3; }          /* 자동 배치하되 세 행 */\n.named { grid-column: main-start / main-end; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 선 번호와 span",
        body: "열 셋, 간격 8px인 그리드입니다. A는 1번 선부터 마지막 선(-1)까지라, 폭이 열 셋과 간격 둘을 더한 값입니다. B는 2번 선에서 두 칸이라 열 둘과 간격 하나의 폭입니다. B는 첫 열과 간격 하나만큼 오른쪽에서 시작합니다.\nB를 `4 / span 2`로 바꿔 보세요. 명시적 그리드 밖이라 암묵적 열이 생기고, 열 트랙 수가 늘어납니다. 암묵적 열은 grid-auto-columns 값 auto라 남는 폭을 나눠 늘어납니다. A의 `-1`은 여전히 명시적 그리드의 끝선이라 A 폭은 그대로입니다.",
        lab: {
          html: `<style>
  .g { display: grid; gap: 8px; grid-template-columns: repeat(3, 60px); }
  .g > div { background: #e3f0ff; outline: 1px solid #89a; }
  #a { grid-column: 1 / -1; }
  #b { grid-column: 2 / span 2; }
</style>
<div class="g" id="g">
  <div id="a">A: 1 / -1</div>
  <div id="b">B: 2 / span 2</div>
</div>`,
          height: 140,
          tryIt: "#b의 grid-column을 4 / span 2로, 다음에는 1 / span 3으로 바꿔 보세요.",
          checks: [
            { label: "열 트랙 수", expr: "getComputedStyle(document.querySelector('#g')).gridTemplateColumns.split(' ').length" },
            { label: "A 폭", expr: "Math.round(document.querySelector('#a').getBoundingClientRect().width)" },
            { label: "B 폭", expr: "Math.round(document.querySelector('#b').getBoundingClientRect().width)" },
            {
              label: "B의 왼쪽 - 그리드 왼쪽",
              expr: "Math.round(document.querySelector('#b').getBoundingClientRect().left - document.querySelector('#g').getBoundingClientRect().left)",
            },
          ],
        },
      },
      {
        label: "grid-area",
        body: "`grid-area`는 아이템을 영역 이름이나 네 선으로 놓습니다. 단축 속성입니다. 풀어 쓰면 grid-row-start, grid-column-start, grid-row-end, grid-column-end입니다. 가로쓰기 기준으로 위, 왼쪽, 아래, 오른쪽 순서입니다. margin의 위, 오른쪽, 아래, 왼쪽과 다르니 조심합니다.\n이름 하나만 적으면 그 이름의 영역에 놓입니다. 영역이 만든 `이름-start`, `이름-end` 선을 찾기 때문입니다. 빠진 값은 짝이 되는 값이 이름이면 그 이름으로, 아니면 auto로 채웁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto (단축)", "그리드 아이템, 그리드가 포함 블록인 절대 위치 상자", "안 됨", "불연속"]],
          },
          {
            caption: "grid-area의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "자동 배치입니다. 한 칸을 차지합니다"],
              ["<이름>", "그 이름의 영역에 놓습니다"],
              ["<선> / <선> / <선> / <선>", "행 시작, 열 시작, 행 끝, 열 끝 순서"],
              ["span <정수>", "그 방향으로 n칸을 차지합니다"],
            ],
          },
        ],
        code: ".header { grid-area: head; }\n.box    { grid-area: 1 / 2 / 3 / 4; }   /* 행 1→3, 열 2→4 */",
        codeLang: "css",
      },
      {
        label: "justify-items",
        body: "`justify-items`는 모든 자식의 기본 `justify-self`를 정합니다. 그리드에서는 아이템을 자기 영역 안에서 인라인 축으로 정렬합니다. 가로쓰기면 가로입니다.\n초기값 legacy는 부모가 legacy 값을 물려주지 않으면 normal로 계산됩니다. 그리드에서 normal은 stretch와 비슷해, 아이템이 영역 폭을 채웁니다. 다만 그림처럼 비율이나 고유 크기가 있는 요소는 start처럼 놓입니다. 플렉스에서는 이 속성을 무시합니다. 주축 정렬은 justify-content가 맡습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["legacy", "모든 요소", "안 됨", "불연속"]],
          },
          {
            caption: "justify-items의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "그리드에서는 stretch와 비슷합니다. 비율 있는 요소는 start"],
              ["stretch", "auto 크기면 영역 폭을 채웁니다"],
              ["start, end, center", "영역의 시작, 끝, 가운데에 둡니다"],
              ["left, right", "왼쪽, 오른쪽에 둡니다"],
              ["self-start, self-end", "아이템 자신의 방향 기준 시작, 끝"],
              ["baseline", "기준선을 맞춥니다"],
              ["legacy", "left, right, center 값을 자손에게 물려주는 옛 방식"],
              ["anchor-center", "앵커 위치 지정 요소를 앵커 가운데에 맞춥니다"],
              ["safe, unsafe", "넘칠 때 start로 물러날지, 그대로 둘지"],
            ],
          },
        ],
        code: ".grid { display: grid; justify-items: start; }   /* 아이템이 콘텐츠 폭으로 줄어든다 */",
        codeLang: "css",
      },
      {
        label: "justify-self",
        body: "`justify-self`는 아이템 하나를 인라인 축으로 정렬합니다. 부모의 justify-items를 이 아이템에서만 덮어씁니다. 초기값 auto는 부모의 justify-items를 따릅니다. 그리드 아이템은 자기 영역 안에서 움직입니다.\n적용 대상에는 블록 수준 상자와 절대 위치 상자도 들어 있습니다. 플렉스 아이템에서는 무시됩니다. 플렉스에서 하나만 밀려면 auto 마진을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "블록 수준 상자, 절대 위치 상자, 그리드 아이템", "안 됨", "불연속"]],
          },
          {
            caption: "justify-self의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "부모의 justify-items 값을 씁니다"],
              ["그 밖의 값", "justify-items의 값과 같습니다. legacy는 없습니다"],
            ],
          },
        ],
        code: ".grid > .badge { justify-self: end; }   /* 이 아이템만 영역 오른쪽 끝 */",
        codeLang: "css",
      },
      {
        label: "place-items",
        body: "`place-items`는 align-items와 justify-items를 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 align-items, justify-items입니다. 첫 값이 블록 축(align), 둘째 값이 인라인 축(justify)입니다. 하나만 쓰면 두 축에 같은 값이 들어갑니다. `place-items: center`는 그리드 아이템을 영역 한가운데에 놓는 가장 짧은 방법입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal legacy (단축)", "모든 요소", "안 됨", "불연속"]],
          },
        ],
        code: ".center { display: grid; place-items: center; }   /* align-items: center; justify-items: center; */\n.mixed  { place-items: start end; }                /* 블록 축 start, 인라인 축 end */",
        codeLang: "css",
      },
      {
        label: "place-content",
        body: "`place-content`는 align-content와 justify-content를 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 align-content, justify-content입니다. 첫 값이 블록 축, 둘째 값이 인라인 축입니다.\n값을 하나만 쓰면 두 속성에 모두 들어갑니다. 단, 그 값이 두 속성 모두에 맞아야 합니다. 하나라도 맞지 않으면 선언 전체가 무효입니다. 예를 들어 left는 align-content에 없으므로 `place-content: left`는 무효입니다.\n그리드에서는 트랙 전체가 컨테이너보다 작을 때, 그 트랙 묶음을 옮깁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal (단축)", "그리드 컨테이너, 여러 줄 플렉스 컨테이너", "안 됨", "불연속"]],
          },
        ],
        code: ".board { display: grid; grid-template-columns: repeat(3, 80px); height: 300px; place-content: center; }",
        codeLang: "css",
      },
      {
        label: "place-self",
        body: "`place-self`는 align-self와 justify-self를 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 align-self, justify-self입니다. 둘째 값이 없으면 첫 값을 두 축에 씁니다. 아이템 하나만 영역 가운데나 구석에 둘 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto (단축)", "블록 수준 상자, 절대 위치 상자, 그리드 아이템", "안 됨", "불연속"]],
          },
        ],
        code: ".grid > .close { place-self: start end; }   /* 영역의 위, 오른쪽 구석 */",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "그리드 속성에서 자주 부딪히는 것들입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["열을 1fr로 나눴다", "긴 낱말이 든 열만 넓어진다. 1fr의 최소가 auto라서", "minmax(0, 1fr)"],
              ["repeat(auto-fill, …)에 아이템이 적다", "오른쪽에 빈 트랙이 남는다", "auto-fit으로 빈 트랙을 접는다"],
              ["영역 이름을 ㄱ자로 적었다", "grid-template-areas 전체가 무효가 된다", "영역을 직사각형으로, 행마다 칸 수를 같게"],
              ["grid 단축 속성으로 열을 바꿨다", "앞서 정한 grid-auto-flow, grid-auto-rows가 풀렸다", "grid-template을 쓴다"],
              ["암묵적 열이 있는데 1 / -1을 줬다", "끝까지 가지 않는다. -1은 명시적 그리드의 끝선이다", "열을 명시적으로 정하거나 span을 쓴다"],
              ["dense로 빈칸을 메웠다", "보이는 순서와 Tab 순서가 어긋난다", "순서가 중요한 목록엔 쓰지 않는다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) auto-fill과 auto-fit은 빈 트랙을 어떻게 다루나요?\n2) `grid-column: 2 / span 2`는 몇 번 선에서 몇 번 선까지인가요?\n3) grid와 grid-template 단축 속성은 무엇이 다른가요?\n4) `place-items: center`를 풀어 쓰면 무엇인가요?",
      },
    ],
    sources: [
      { label: "MDN: grid-template-columns", href: `${MDN}/Reference/Properties/grid-template-columns` },
      { label: "MDN: repeat()", href: `${MDN}/Reference/Values/repeat` },
      { label: "MDN: grid-template-areas", href: `${MDN}/Reference/Properties/grid-template-areas` },
      { label: "MDN: grid", href: `${MDN}/Reference/Properties/grid` },
      { label: "MDN: grid-auto-flow", href: `${MDN}/Reference/Properties/grid-auto-flow` },
      { label: "MDN: Line-based placement", href: `${MDN}/Guides/Grid_layout/Line-based_placement` },
    ],
  },
  {
    id: "css-prop-position",
    name: "위치와 쌓임 속성",
    tagline: "상자를 어디에 놓고, 겹치면 무엇을 앞에 둘지 정한다",
    intro:
      "`position`은 상자를 흐름 안에 둘지, 흐름에서 빼서 다른 상자를 기준으로 놓을지 정합니다. 기준이 되는 상자를 포함 블록이라 부릅니다. `top`, `right`, `bottom`, `left`와 단축 속성 `inset`은 그 기준에서 얼마나 떨어질지 적습니다. 겹친 상자의 앞뒤는 `z-index`가 정합니다. 다만 z-index는 같은 쌓임 맥락 안에서만 비교됩니다. `isolation`은 다른 효과 없이 쌓임 맥락만 새로 만듭니다. 이 장은 속성마다 값과 정의를 모았습니다. 원리는 8장에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "위치와 쌓임 속성은 두 질문에 답합니다. 상자를 어디에 놓나(position, inset 속성), 겹치면 무엇이 앞에 오나(z-index, isolation)입니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["position", "놓는 방식과 기준 상자를 정함", "static", "안 됨", "8장 · 위치 지정과 쌓임 맥락"],
              ["top, right, bottom, left", "기준 상자의 변에서 떨어진 거리", "auto", "안 됨", "8장 · 위치 지정과 쌓임 맥락"],
              ["inset", "네 방향 거리를 한 줄에", "네 속성 각각 auto", "안 됨", ""],
              ["z-index", "쌓임 맥락 안의 층 번호", "auto", "안 됨", "8장 · 위치 지정과 쌓임 맥락"],
              ["isolation", "쌓임 맥락을 새로 만듦", "auto", "안 됨", "8장 · 위치 지정과 쌓임 맥락"],
            ],
          },
        ],
      },
      {
        label: "position",
        body: "상자를 어떻게 놓을지 정합니다. static은 보통 흐름 그대로입니다. 이때 top 같은 inset 속성과 z-index는 아무 효과가 없습니다. static이 아닌 값을 가진 요소를 위치 지정 요소라 부릅니다.\n값마다 기준 상자가 다릅니다. relative는 제자리, absolute는 가장 가까운 위치 지정 조상, fixed는 뷰포트가 기준입니다. sticky는 흐름에 있다가 가장 가까운 스크롤 조상의 경계에 닿으면 붙습니다.\n주의할 점이 둘 있습니다. 조상에 transform이나 perspective가 있으면 absolute와 fixed의 기준이 그 조상으로 바뀝니다. fixed와 sticky는 z-index가 없어도 늘 쌓임 맥락을 만듭니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["static", "모든 요소", "안 됨", "이산"]],
          },
          {
            caption: "position의 값",
            head: ["값", "하는 일"],
            rows: [
              ["static", "보통 흐름대로 놓음. inset 속성과 z-index가 듣지 않음. 기본값"],
              ["relative", "흐름의 자리를 지킨 채 자기 자리에서 옮김. 다른 상자는 그대로"],
              ["absolute", "흐름에서 빠짐. 가장 가까운 위치 지정 조상 기준. 없으면 처음 포함 블록"],
              ["fixed", "흐름에서 빠짐. 뷰포트 기준. 늘 쌓임 맥락을 만듦"],
              ["sticky", "흐름에 있다가 스크롤 조상의 임계값에 닿으면 붙음. 늘 쌓임 맥락을 만듦"],
            ],
          },
        ],
        code: ".card { position: relative; }                  /* 자식 absolute의 기준이 된다 */\n.card .badge { position: absolute; top: 8px; right: 8px; }\n.toolbar { position: sticky; top: 0; }         /* 스크롤 조상의 위쪽에 붙는다 */\n.toast { position: fixed; bottom: 16px; right: 16px; }",
        codeLang: "css",
        terms: [
          {
            term: "포함 블록 (containing block)",
            body: "위치와 퍼센트 값의 기준이 되는 상자입니다. absolute 요소는 가장 가까운 위치 지정 조상의 패딩 상자가 포함 블록입니다. 길 안내에서 '저 건물에서 북쪽으로 10미터'라고 할 때의 그 건물과 같습니다.",
          },
          {
            term: "위치 지정 요소 (positioned element)",
            body: "position 계산값이 static이 아닌 요소입니다. relative, absolute, fixed, sticky가 모두 해당합니다. inset 속성과 z-index는 이런 요소에서 듣습니다. 줄을 서 있다가 자리를 옮겨도 된다는 허가증을 받은 사람과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: absolute의 기준은 가까운 조상",
        body: "파란 .outer 안에 초록 .mid가 있습니다. position: relative는 .mid에만 있습니다. 빨간 .box는 absolute로 top: 8px, left: 8px을 받았습니다.\n지금 값을 보면 .mid 기준 차이가 top, left에 적은 값과 같습니다. .outer 기준 차이는 그보다 큽니다. offsetParent도 .mid를 가리킵니다. absolute의 기준은 가장 가까운 위치 지정 조상의 패딩 상자이기 때문입니다.",
        lab: {
          html: `<style>
  .outer { padding: 20px; background: #dde8ff; }
  .mid { position: relative; margin: 10px; padding: 10px; background: #d8f5d8; }
  .box { position: absolute; top: 8px; left: 8px; width: 40px; height: 24px; background: tomato; }
</style>
<div class="outer">
  <div class="mid">
    <p>.mid 안의 글입니다.</p>
    <div class="box"></div>
  </div>
</div>`,
          height: 200,
          tryIt: ".mid의 position: relative를 지우고 실행해 보세요. 기준이 처음 포함 블록으로 바뀌고 offsetParent는 body가 됩니다.",
          checks: [
            { label: "box.left − mid.left", expr: "Math.round(document.querySelector('.box').getBoundingClientRect().left - document.querySelector('.mid').getBoundingClientRect().left)" },
            { label: "box.top − mid.top", expr: "Math.round(document.querySelector('.box').getBoundingClientRect().top - document.querySelector('.mid').getBoundingClientRect().top)" },
            { label: "box.left − outer.left", expr: "Math.round(document.querySelector('.box').getBoundingClientRect().left - document.querySelector('.outer').getBoundingClientRect().left)" },
            { label: "box.offsetParent", expr: "document.querySelector('.box').offsetParent" },
          ],
        },
      },
      {
        label: "top, right, bottom, left",
        body: "위치 지정 요소가 기준 상자의 각 변에서 얼마나 떨어질지 정합니다. 뜻은 position 값에 따라 다릅니다. absolute와 fixed는 포함 블록의 변에서 잰 거리입니다. relative는 제자리에서 옮기는 거리입니다. sticky는 스크롤 조상의 변에서 이만큼 남으면 붙으라는 임계값입니다.\n퍼센트는 top, bottom이면 포함 블록의 높이, left, right면 폭이 기준입니다. absolute에서 top과 bottom을 함께 주고 height를 auto로 두면 그 사이를 채웁니다. 그 밖의 경우 둘 다 주면 top이 이깁니다. left와 right는 direction이 ltr이면 left가, rtl이면 right가 이깁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "위치 지정 요소", "안 됨", "길이, 퍼센트, calc()로 보간"]],
          },
          {
            caption: "top, right, bottom, left의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "반대쪽 속성을 따름. 둘 다 auto면 static일 때의 자리(relative는 안 옮김)"],
              ["<length>", "변에서 떨어진 거리. 음수도 됨"],
              ["<percentage>", "포함 블록 높이(top, bottom) 또는 폭(left, right)의 비율"],
              ["anchor(), anchor-size()", "앵커 요소의 변이나 크기를 기준으로 한 거리"],
            ],
          },
        ],
        code: ".rel { position: relative; top: 4px; left: -2px; }    /* 제자리에서 아래로 4px, 왼쪽으로 2px */\n.fill { position: absolute; top: 0; bottom: 0; }      /* height가 auto면 위아래를 채운다 */\n.head { position: sticky; top: 0; }                   /* 스크롤 조상 위쪽 0에서 붙는다 */",
        codeLang: "css",
        terms: [
          {
            term: "임계값 (sticky threshold)",
            body: "sticky 요소가 붙기 시작하는 거리입니다. top: 0이면 스크롤 조상의 위쪽 변에 닿는 순간 붙습니다. 이 값이 없으면 그 축에서는 relative처럼 움직입니다. 버스 정류장의 정지선처럼, 거기에 닿아야 멈춥니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: sticky는 스크롤 조상과 임계값이 필요하다",
        body: "작은 창의 회색 상자 안을 아래로 스크롤해 보세요. 지금 값의 차이가 줄어들다가 top에 적은 값에서 더 줄지 않습니다. 머리글이 상자 위쪽에 붙은 것입니다.\nsticky의 기준은 페이지가 아니라 가장 가까운 스크롤 조상인 .scroller입니다. 그리고 top 같은 임계값이 하나는 있어야 합니다. 없으면 그 축에서 relative처럼 함께 올라갑니다.",
        lab: {
          html: `<style>
  .scroller { height: 130px; overflow: auto; background: #f1f1f1; }
  .head { position: sticky; top: 0; background: gold; padding: 4px 8px; }
  .tall { height: 400px; padding: 8px; }
</style>
<div class="scroller">
  <p>위쪽 글입니다. 이 회색 상자 안을 아래로 스크롤해 보세요.</p>
  <div class="head">sticky 머리글 (top: 0)</div>
  <div class="tall">긴 내용이 이어집니다.</div>
</div>`,
          height: 190,
          tryIt: ".head에서 top: 0을 지우고 실행해 보세요. 지금 값의 top이 auto가 되고, 머리글이 붙지 않고 함께 올라갑니다.",
          checks: [
            { label: "scroller.scrollTop", expr: "Math.round(document.querySelector('.scroller').scrollTop)" },
            { label: "head.top − scroller.top", expr: "Math.round(document.querySelector('.head').getBoundingClientRect().top - document.querySelector('.scroller').getBoundingClientRect().top)" },
            { label: "head의 position", expr: "getComputedStyle(document.querySelector('.head')).position" },
            { label: "head의 top", expr: "getComputedStyle(document.querySelector('.head')).top" },
          ],
        },
      },
      {
        label: "inset",
        body: "단축 속성입니다. 풀어 쓰면 top, right, bottom, left입니다. 값을 적는 법은 margin과 같습니다. 하나면 네 변 모두, 둘이면 위아래와 좌우입니다. 셋이면 위, 좌우, 아래이고, 넷이면 위, 오른쪽, 아래, 왼쪽 순서입니다.\n`inset: 0`은 absolute 요소를 포함 블록에 꽉 채울 때 자주 씁니다. 이름은 논리 속성 모듈에서 왔지만 물리 방향입니다. 쓰기 방향이 바뀌어도 top은 위입니다. 위치 지정 요소가 아니면 효과가 없습니다. 지원은 Chrome 87, Safari 14.1, Firefox 66부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["네 속성 각각 auto", "위치 지정 요소", "안 됨", "길이, 퍼센트, calc()로 보간"]],
          },
        ],
        code: ".overlay { position: absolute; inset: 0; }   /* top, right, bottom, left 모두 0 */\n.a { inset: 10px 20px; }                     /* 위아래 10px, 좌우 20px */\n.b { inset: 5px 15px 10px; }                 /* 위 5px, 좌우 15px, 아래 10px */\n.c { inset: 1em 2em 3em 4em; }               /* 위, 오른쪽, 아래, 왼쪽 */",
        codeLang: "css",
      },
      {
        label: "z-index",
        body: "겹친 상자 가운데 무엇이 앞에 올지 정합니다. 큰 수가 작은 수를 덮습니다. 위치 지정 요소, 그리고 플렉스 아이템과 그리드 아이템에서만 듣습니다. 보통 흐름의 static 블록에 적으면 무시됩니다.\n정수를 주면 그 요소가 새 쌓임 맥락을 만듭니다. 그러면 자손의 z-index는 그 맥락 안에서만 비교됩니다. 그래서 z-index: 999인 자식도 부모의 층이 낮으면 바깥 형제에게 집니다. auto는 층 0이고 새 맥락을 만들지 않습니다. 음수는 같은 맥락의 보통 블록보다 뒤로 갑니다. 다만 맥락을 만든 요소의 배경보다는 앞입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "위치 지정 요소, 플렉스 아이템, 그리드 아이템", "안 됨", "정수 단계로 보간"]],
          },
          {
            caption: "z-index의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "지금 맥락에서 층 0. 새 쌓임 맥락을 만들지 않음"],
              ["<integer>", "지금 맥락 안의 층 번호. 새 쌓임 맥락을 만듦. 음수도 됨"],
            ],
          },
        ],
        code: ".modal { position: fixed; z-index: 10; }\n.header { position: sticky; top: 0; z-index: 5; }\n.row > .item { z-index: 1; }     /* .row가 플렉스 컨테이너면 position 없이도 듣는다 */\n.plain { z-index: 100; }         /* static 블록이면 무시된다 */",
        codeLang: "css",
        terms: [
          {
            term: "쌓임 맥락 (stacking context)",
            body: "z 순서를 따로 비교하는 묶음입니다. 묶음 안의 z-index는 밖과 비교되지 않고, 밖에서는 묶음 전체가 한 층으로 다뤄집니다. 서류철을 쌓는 것과 같습니다. 철 안에 999쪽이 있어도 철이 아래에 있으면 그 쪽도 아래입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: static 요소의 z-index는 무시된다",
        body: "파란 A에는 z-index: 10, 주황 B에는 position: relative와 z-index: 1을 주었습니다. B는 위로 끌어올려 A와 겹치게 했습니다.\n지금 값의 '겹친 곳 맨 위 요소'는 B입니다. A는 position이 static이라 10이 아무 일도 하지 않습니다. 위치 지정 요소는 보통 블록보다 앞에 그려지므로 B가 덮습니다.",
        lab: {
          html: `<style>
  .a, .b { width: 140px; height: 60px; padding: 4px; }
  .a { background: #9cd3ff; z-index: 10; }
  .b { background: #ffc98a; position: relative; z-index: 1; margin: -30px 0 0 50px; }
</style>
<div class="a">A: z-index 10</div>
<div class="b">B: relative, z-index 1</div>`,
          height: 150,
          tryIt: ".a에 position: relative를 더해 보세요. 이제 A의 10이 B의 1을 이기고 맨 위 요소가 A로 바뀝니다.",
          checks: [
            { label: "A의 position", expr: "getComputedStyle(document.querySelector('.a')).position" },
            { label: "겹친 곳 맨 위 요소", expr: "(() => { const a = document.querySelector('.a').getBoundingClientRect(); const b = document.querySelector('.b').getBoundingClientRect(); return document.elementFromPoint((Math.max(a.left, b.left) + Math.min(a.right, b.right)) / 2, (Math.max(a.top, b.top) + Math.min(a.bottom, b.bottom)) / 2); })()" },
          ],
        },
      },
      {
        label: "isolation",
        body: "다른 효과 없이 새 쌓임 맥락만 만듭니다. isolate를 주면 자손의 z-index와 mix-blend-mode가 이 요소 밖으로 새지 않습니다. 컴포넌트 안의 z-index가 페이지의 다른 층과 다투지 않게 막을 때 씁니다.\nz-index로 맥락을 만들려면 위치 지정이 필요합니다. opacity나 transform은 모양이나 기준 상자까지 바꿉니다. isolation은 그런 부작용이 없습니다. 지원은 Chrome 41, Safari 8, Firefox 36부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소 (SVG는 컨테이너와 그래픽 요소)", "안 됨", "안 됨"]],
          },
          {
            caption: "isolation의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "다른 속성이 요구할 때만 쌓임 맥락을 만듦"],
              ["isolate", "늘 새 쌓임 맥락을 만듦"],
            ],
          },
        ],
        code: ".card { isolation: isolate; }                     /* 카드 안의 z-index는 카드 안에서만 */\n.card .badge { position: relative; z-index: -1; }  /* 카드 배경 위, 카드 글자 아래 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: isolation으로 음수 z-index 가두기",
        body: "빨간 배지에 z-index: -1을 주었습니다. .card는 쌓임 맥락을 만들지 않으니, 배지는 바깥 맥락의 뒤쪽 층으로 갑니다. 그래서 카드 배경에 가려 보이지 않습니다. 지금 값의 '배지 가운데 맨 위 요소'도 카드입니다.\n.card에 isolation: isolate를 주면 카드가 맥락을 만듭니다. 배지의 -1은 그 안에서만 비교되고, 맥락을 만든 카드의 배경보다는 앞에 그려집니다.",
        lab: {
          html: `<style>
  .card { background: #cfe0f0; padding: 12px; width: 220px; }
  .badge { position: relative; z-index: -1; background: tomato; color: #fff; padding: 4px 8px; }
</style>
<div class="card">
  카드 글자
  <div class="badge">z-index: -1 배지</div>
</div>`,
          height: 150,
          tryIt: ".card에 isolation: isolate를 더해 보세요. 배지가 카드 위로 나오고 맨 위 요소가 배지로 바뀝니다.",
          checks: [
            { label: "card의 isolation", expr: "getComputedStyle(document.querySelector('.card')).isolation" },
            { label: "배지 가운데 맨 위 요소", expr: "(() => { const r = document.querySelector('.badge').getBoundingClientRect(); return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); })()" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "위치와 층에서 자주 만나는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["자식에만 absolute를 줌", "엉뚱한 조상이나 처음 포함 블록 기준으로 놓임", "기준이 될 부모에 position: relative"],
              ["static 블록에 z-index: 999", "아무 변화 없음", "position을 주거나 플렉스, 그리드 아이템으로 만듦"],
              ["sticky에 top을 안 줌", "relative처럼 함께 스크롤됨", "붙을 축에 top 같은 inset 값을 줌"],
              ["sticky의 조상에 overflow: hidden", "그 조상 안에서만 붙고 페이지 스크롤엔 안 붙음", "overflow를 빼거나 clip으로 바꿈"],
              ["fixed 요소의 조상에 transform", "뷰포트가 아니라 그 조상을 따라 움직임", "fixed 요소를 그 조상 밖(body 끝)으로 옮김"],
              ["모달의 z-index를 아무리 올림", "조상이 만든 쌓임 맥락에 갇혀 뒤에 깔림", "모달을 body 끝으로 옮기거나 조상의 맥락을 없앰"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) absolute 요소의 기준 상자는 어떻게 정해지나요?\n2) static 블록에 준 z-index가 무시될 때 고치는 법 둘은?\n3) sticky가 붙으려면 무엇이 있어야 하나요?\n4) isolation: isolate가 opacity나 transform으로 맥락을 만드는 것보다 나은 점은?",
      },
    ],
    sources: [
      { label: "MDN — position", href: `${MDN}/Reference/Properties/position` },
      { label: "MDN — top", href: `${MDN}/Reference/Properties/top` },
      { label: "MDN — inset", href: `${MDN}/Reference/Properties/inset` },
      { label: "MDN — z-index", href: `${MDN}/Reference/Properties/z-index` },
      { label: "MDN — isolation", href: `${MDN}/Reference/Properties/isolation` },
      { label: "MDN — Stacking context", href: `${MDN}/Guides/Positioned_layout/Stacking_context` },
    ],
  },

  {
    id: "css-prop-overflow",
    name: "넘침과 스크롤 속성",
    tagline: "넘친 내용을 어떻게 다루고, 스크롤을 어떻게 다듬을지 정한다",
    intro:
      "내용이 상자보다 크면 넘칩니다. `overflow`는 넘친 내용을 보일지, 자를지, 스크롤로 볼지 정합니다. 자르거나 스크롤하는 값은 대개 상자를 스크롤 컨테이너로 만듭니다. 나머지 속성은 스크롤 컨테이너를 다듬습니다. 스크롤바의 굵기와 색, 스크롤바 자리, 부드러운 스크롤, 끝에 닿은 뒤의 동작, 멈출 자리(스냅)를 정합니다. 원리는 9장에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "앞의 넷은 넘침을 다루고, 뒤의 아홉은 스크롤을 다듬습니다. 스크롤 속성은 대개 스크롤 컨테이너에 줍니다. scroll-snap-align과 scroll-margin만 그 안의 자식에 줍니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["overflow", "넘친 내용을 보일지, 자를지, 스크롤할지", "visible", "안 됨", "9장 · 오버플로와 크기"],
              ["overflow-x, overflow-y", "가로, 세로 한 축씩 정함", "visible", "안 됨", "9장 · 오버플로와 크기"],
              ["overflow-clip-margin", "clip이 자르는 선을 바깥으로 넓힘", "0px", "안 됨", ""],
              ["scrollbar-width", "스크롤바 굵기", "auto", "안 됨", ""],
              ["scrollbar-color", "스크롤바 막대와 길의 색", "auto", "됨", ""],
              ["scrollbar-gutter", "스크롤바 자리를 미리 잡음", "auto", "안 됨", ""],
              ["scroll-behavior", "프로그램 스크롤을 부드럽게", "auto", "안 됨", ""],
              ["overscroll-behavior", "끝에 닿은 뒤 스크롤이 이어질지", "auto", "안 됨", ""],
              ["scroll-snap-type", "스냅의 축과 강도", "none", "안 됨", ""],
              ["scroll-snap-align", "자식이 맞춰 설 자리", "none", "안 됨", ""],
              ["scroll-margin", "스냅, 이동 때 자식 둘레의 여백", "0", "안 됨", ""],
              ["scroll-padding", "스크롤 컨테이너의 안쪽 여백", "auto", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "overflow",
        body: "내용이 패딩 상자를 넘을 때 어떻게 할지 정합니다. 단축 속성입니다. 풀어 쓰면 overflow-x, overflow-y입니다. 값 하나면 두 축에 같이, 둘이면 가로, 세로 순서입니다.\nvisible과 clip을 뺀 값은 새 블록 서식 맥락(BFC)을 만듭니다. hidden은 스크롤바만 없을 뿐 스크롤 컨테이너입니다. 그래서 scrollTop이나 포커스 이동으로 스크롤됩니다. clip은 스크롤 컨테이너가 아니어서 프로그램으로도 스크롤되지 않습니다.\n주의할 점입니다. clip 안의 요소는 포커스를 받아도 보이게 스크롤되지 않습니다. 키보드 사용자가 못 볼 수 있습니다. 스크롤 영역에는 tabindex=\"0\"과 이름을 주어 키보드로도 닿게 합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["visible", "블록 컨테이너, 플렉스 컨테이너, 그리드 컨테이너", "안 됨", "이산"]],
          },
          {
            caption: "overflow의 값",
            head: ["값", "하는 일"],
            rows: [
              ["visible", "자르지 않음. 스크롤 컨테이너 아님. 기본값"],
              ["hidden", "패딩 상자에서 자름. 넘치면 스크롤바 없는 스크롤 컨테이너"],
              ["clip", "자르는 선(overflow-clip-margin)에서 자름. 스크롤 컨테이너 아님"],
              ["scroll", "패딩 상자에서 자름. 넘치지 않아도 늘 스크롤바와 스크롤 컨테이너"],
              ["auto", "패딩 상자에서 자름. 넘칠 때만 스크롤바와 스크롤 컨테이너"],
            ],
          },
        ],
        code: ".card { overflow: hidden; }          /* 밖을 자른다. 스크롤 컨테이너가 된다 */\n.frame { overflow: clip; }           /* 자르기만 한다. sticky의 기준이 되지 않는다 */\n.list { overflow: auto; }            /* 넘칠 때만 스크롤바 */\n.wide { overflow: auto hidden; }     /* 가로 auto, 세로 hidden */",
        codeLang: "css",
        terms: [
          {
            term: "스크롤 컨테이너 (scroll container)",
            body: "넘친 내용을 스크롤로 보여 주는 상자입니다. overflow가 hidden, scroll, auto일 때 됩니다. sticky의 기준이 되고, scrollTop으로 움직일 수 있습니다. 창틀은 그대로 두고 뒤의 두루마리 그림을 감아 보는 것과 같습니다.",
          },
          {
            term: "블록 서식 맥락 (BFC)",
            body: "안쪽 배치를 바깥과 떼어 놓는 영역입니다. 안의 float가 밖으로 새지 않고, 바깥과 마진이 합쳐지지 않습니다. 이삿짐 상자처럼 안의 물건이 밖의 물건과 섞이지 않습니다. 자세히는 5장에서 다룹니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: hidden은 스크롤되고 clip은 안 된다",
        body: "두 상자는 똑같이 아래로 넘칩니다. 버튼을 누르면 두 상자의 scrollTop에 같은 값을 넣습니다.\nhidden 상자는 스크롤 컨테이너라서 글이 위로 밀리고 지금 값이 바뀝니다. clip 상자는 스크롤 컨테이너가 아니라서 그대로입니다. 스크롤바가 없다는 겉모습은 같아도 속은 다릅니다.",
        lab: {
          html: `<style>
  .box { width: 170px; height: 52px; background: #eef; margin-bottom: 8px; }
  .hidden { overflow: hidden; }
  .clip { overflow: clip; }
</style>
<div class="box hidden">hidden 상자입니다. 줄이 많아 아래로 넘칩니다. 둘째 줄, 셋째 줄, 넷째 줄.</div>
<div class="box clip">clip 상자입니다. 줄이 많아 아래로 넘칩니다. 둘째 줄, 셋째 줄, 넷째 줄.</div>
<button onclick="document.querySelectorAll('.box').forEach((b) => { b.scrollTop = 30; })">둘 다 scrollTop = 30</button>`,
          height: 200,
          tryIt: ".clip을 overflow: hidden으로 바꾸고 다시 눌러 보세요. 이제 두 상자가 함께 밀립니다.",
          checks: [
            { label: "hidden 상자의 scrollTop", expr: "Math.round(document.querySelector('.hidden').scrollTop)" },
            { label: "clip 상자의 scrollTop", expr: "Math.round(document.querySelector('.clip').scrollTop)" },
          ],
        },
      },
      {
        label: "overflow-x, overflow-y",
        body: "가로(왼쪽, 오른쪽 변)와 세로(위, 아래 변)의 넘침을 따로 정합니다. 값 목록은 overflow와 같습니다.\n두 축은 서로 영향을 줍니다. 한 축이 visible이나 clip이 아닌 값이면, 다른 축의 visible은 auto로, clip은 hidden으로 계산됩니다. 그래서 overflow-x: hidden으로는 '가로는 자르고 세로는 보이게'를 만들 수 없습니다. 세로가 auto가 되어 스크롤이 생깁니다. 가로만 자르려면 overflow-x: clip을 씁니다. clip과 visible끼리는 서로 바꾸지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["visible", "블록 컨테이너, 플렉스 컨테이너, 그리드 컨테이너", "안 됨", "이산"]],
          },
          {
            caption: "두 축의 짝 규칙",
            head: ["적은 값 (x, y)", "계산값 (x, y)"],
            rows: [
              ["hidden, visible", "hidden, auto"],
              ["auto, visible", "auto, auto"],
              ["scroll, clip", "scroll, hidden"],
              ["clip, visible", "clip, visible (그대로)"],
              ["visible, visible", "visible, visible (그대로)"],
            ],
          },
        ],
        code: ".x-only { overflow-x: hidden; }   /* 세로가 auto로 계산되어 세로 스크롤이 생길 수 있다 */\n.x-clip { overflow-x: clip; }     /* 세로는 visible 그대로 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 한 축이 hidden이면 visible은 auto",
        body: "상자에 overflow-x: hidden과 overflow-y: visible을 적었습니다. 글은 세로로 넘칩니다.\n지금 값의 overflow-y는 auto입니다. 가로가 hidden이라 세로의 visible이 auto로 바뀐 것입니다. 그래서 글이 상자 밖으로 보이지 않고, 상자 안에서 세로로 스크롤됩니다.",
        lab: {
          html: `<style>
  .box { width: 220px; height: 60px; background: #eef; overflow-x: hidden; overflow-y: visible; }
</style>
<div class="box">이 상자는 overflow-x: hidden, overflow-y: visible을 적었습니다.
글이 길어서 세로로 넘칩니다. 세로가 정말 보이게 넘칠까요?</div>
<p>상자 바로 아래 문단입니다.</p>`,
          height: 160,
          tryIt: "overflow-x를 clip으로 바꿔 보세요. 이번에는 overflow-y가 visible로 남고 글이 상자 밖으로 흘러나옵니다.",
          checks: [
            { label: "overflow-x 계산값", expr: "getComputedStyle(document.querySelector('.box')).overflowX" },
            { label: "overflow-y 계산값", expr: "getComputedStyle(document.querySelector('.box')).overflowY" },
            { label: "세로로 넘치나", expr: "document.querySelector('.box').scrollHeight > document.querySelector('.box').clientHeight" },
          ],
        },
      },
      {
        label: "overflow-clip-margin",
        body: "overflow: clip인 상자가 경계 밖으로 얼마나 더 그릴지 정합니다. 이 선을 넘침 자르는 선(overflow clip edge)이라 합니다. 그림자나 외곽선이 잘리지 않게 여유를 줄 때 씁니다.\n상자 키워드(content-box, padding-box, border-box)로 어느 변에서 잴지 고르고, 0 이상의 길이를 더합니다. 키워드를 빼면 padding-box입니다. overflow가 clip이 아니면 무시됩니다. 지원은 Chrome 90, Firefox 102부터이고 Safari는 아직 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0px", "모든 요소", "안 됨", "이산"]],
          },
        ],
        code: ".frame { overflow: clip; overflow-clip-margin: 8px; }               /* 8px 밖까지는 그린다 */\n.frame2 { overflow: clip; overflow-clip-margin: content-box 4px; }  /* 콘텐츠 상자에서 4px */",
        codeLang: "css",
      },
      {
        label: "scrollbar-width",
        body: "스크롤바의 굵기를 정합니다. 목적은 꾸밈이 아니라 공간을 아끼는 것입니다. thin은 플랫폼의 얇은 스크롤바입니다. none은 스크롤바를 숨기지만 스크롤은 됩니다.\nnone은 접근성을 해칩니다. 휠이나 터치가 없는 기기에서는 스크롤할 길이 사라질 수 있습니다. 프로그램으로만 스크롤할 상자라면 none 대신 overflow: hidden을 씁니다. 상속되지 않습니다. 뿌리 요소에 주면 뷰포트 스크롤바에 적용됩니다. 지원은 Chrome 121, Safari 18.2, Firefox 64부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "스크롤 상자", "안 됨", "이산"]],
          },
          {
            caption: "scrollbar-width의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "플랫폼 기본 굵기"],
              ["thin", "얇은 스크롤바"],
              ["none", "스크롤바를 숨김. 스크롤은 됨"],
            ],
          },
        ],
      },
      {
        label: "scrollbar-color",
        body: "스크롤바의 두 부분의 색을 정합니다. 첫 색은 움직이는 막대(thumb), 둘째 색은 그 아래 길(track)입니다. scrollbar-width와 달리 상속됩니다. 조상에 주면 자손 스크롤 상자도 같은 색이 됩니다.\n두 색의 대비가 충분해야 막대가 보입니다. 강제 색 모드(forced-colors: active)에서는 auto로 돌아갑니다. 계산값이 auto가 아니면 브라우저는 ::-webkit-scrollbar 꾸밈을 무시합니다. 지원은 Chrome 121, Safari 26.2, Firefox 64부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "스크롤 상자", "됨", "계산값 형식대로 보간"]],
          },
          {
            caption: "scrollbar-color의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "플랫폼 기본 색"],
              ["<color> <color>", "막대 색, 길 색 순서"],
            ],
          },
        ],
        code: ":root { scrollbar-color: #888 #eee; }   /* 막대, 길 */\n.panel { scrollbar-width: thin; }",
        codeLang: "css",
      },
      {
        label: "scrollbar-gutter",
        body: "스크롤바가 들어갈 자리(거터)를 미리 잡을지 정합니다. 내용이 늘어 스크롤바가 생길 때 폭이 줄며 레이아웃이 밀리는 것을 막습니다.\n고전 스크롤바는 거터 안에서 자리를 차지합니다. 오버레이 스크롤바는 내용 위에 떠서 자리를 차지하지 않습니다. 그래서 stable은 고전 스크롤바일 때만 효과가 있습니다. 어느 쪽을 쓸지는 브라우저와 운영체제가 정합니다. 지원은 Chrome 94, Safari 18.2, Firefox 97부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "스크롤 상자", "안 됨", "이산"]],
          },
          {
            caption: "scrollbar-gutter의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "고전 스크롤바는 scroll이거나, auto이면서 넘칠 때만 거터를 만듦"],
              ["stable", "overflow가 auto, scroll, hidden이면 넘치지 않아도 거터를 둠"],
              ["both-edges", "stable과 함께 써서 반대쪽 변에도 같은 거터를 둠"],
            ],
          },
        ],
        code: ".list { overflow: auto; scrollbar-gutter: stable; }               /* 스크롤바 자리를 늘 비워 둔다 */\n.center { overflow: auto; scrollbar-gutter: stable both-edges; }   /* 양쪽을 같게 둔다 */",
        codeLang: "css",
        terms: [
          {
            term: "거터 (scrollbar gutter)",
            body: "테두리 안쪽과 패딩 바깥 사이, 스크롤바가 들어가는 자리입니다. 스크롤바가 없으면 패딩처럼 칠해집니다. 주차장의 지정석처럼 차가 없어도 자리는 비워 둡니다.",
          },
        ],
      },
      {
        label: "scroll-behavior",
        body: "링크로 이동하거나 scrollTo() 같은 프로그램 스크롤을 할 때, 바로 뛸지 부드럽게 미끄러질지 정합니다. 사용자가 휠이나 손가락으로 하는 스크롤은 바꾸지 않습니다.\n뿌리 요소(html)에 주면 뷰포트에 적용됩니다. body에 준 값은 뷰포트로 넘어가지 않습니다. 브라우저는 이 속성을 무시해도 됩니다. 움직임 줄이기를 켠 사용자에게는 auto로 두는 편이 안전합니다. 지원은 Chrome 61, Safari 15.4, Firefox 36부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "스크롤 상자", "안 됨", "안 됨"]],
          },
          {
            caption: "scroll-behavior의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "바로 이동"],
              ["smooth", "브라우저가 정한 시간과 곡선으로 부드럽게 이동"],
            ],
          },
        ],
        code: "html { scroll-behavior: smooth; }\n@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }",
        codeLang: "css",
      },
      {
        label: "overscroll-behavior",
        body: "스크롤이 끝에 닿은 뒤 무슨 일이 일어날지 정합니다. 기본은 바깥 스크롤 컨테이너가 이어서 스크롤되는 것입니다. 이를 스크롤 체이닝이라 합니다. 모바일의 튕김 효과나 당겨서 새로 고침도 여기에 속합니다.\ncontain은 바깥으로 이어지지 않게 막습니다. 대화 상자 안을 끝까지 스크롤해도 뒤 페이지가 따라 움직이지 않습니다. 단축 속성입니다. 풀어 쓰면 overscroll-behavior-x, overscroll-behavior-y입니다. 스크롤 컨테이너에만 적용되므로, iframe 요소 자체에 주면 효과가 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "블록 수준, 인라인 블록 요소 (대체 요소 제외)", "안 됨", "이산"]],
          },
          {
            caption: "overscroll-behavior의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "기본 동작. 바깥 컨테이너로 스크롤이 이어질 수 있음"],
              ["chain", "바깥으로 이어지되 튕김 효과는 막음"],
              ["contain", "바깥으로 이어지지 않음. 튕김은 남을 수 있음"],
              ["none", "이어짐과 튕김을 모두 막음"],
            ],
          },
        ],
        code: ".dialog-body { overflow: auto; overscroll-behavior: contain; }   /* 뒤 페이지가 따라오지 않는다 */\n.feed { overscroll-behavior: auto contain; }                     /* x, y 순서 */\nhtml, body { overscroll-behavior-y: none; }                      /* 당겨서 새로 고침을 막는다 */",
        codeLang: "css",
        terms: [
          {
            term: "스크롤 체이닝 (scroll chaining)",
            body: "안쪽 스크롤이 끝에 닿으면 바깥 스크롤이 이어받아 움직이는 일입니다. 대화 상자를 끝까지 내리면 뒤 페이지가 내려가는 것이 그 예입니다. 앞 칸에 밀려 뒤 칸이 따라 움직이는 기차와 같습니다.",
          },
        ],
      },
      {
        label: "scroll-snap-type",
        body: "스크롤 컨테이너에 주어, 스크롤이 멈출 때 자식의 정해진 자리에 맞춰 서게 합니다. 첫 값은 축(x, y, block, inline, both)이고 둘째 값은 강도입니다. mandatory는 반드시 스냅 자리에 섭니다. proximity는 가까울 때만 서며, 축만 적으면 이것이 기본입니다.\n자식에 scroll-snap-align이 있어야 멈출 자리가 생깁니다. 내용이 더해지거나 바뀌면, 전에 맞춰 섰던 자식이 남아 있는 한 그 자식에 다시 맞춥니다. 지원은 Chrome 69, Safari 11, Firefox 99부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "이산"]],
          },
          {
            caption: "scroll-snap-type의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "스냅 자리를 무시함"],
              ["x, y", "가로축만, 세로축만 스냅"],
              ["block, inline", "블록 축만, 인라인 축만 스냅"],
              ["both", "두 축을 따로 스냅"],
              ["mandatory", "멈출 때 반드시 스냅 자리에 섬"],
              ["proximity", "가까우면 섬. 브라우저가 판단. 기본 강도"],
            ],
          },
        ],
        terms: [
          {
            term: "스냅포트 (snapport)",
            body: "스크롤 컨테이너에서 스냅을 맞추는 기준 영역입니다. 보이는 영역에서 scroll-padding만큼 안쪽으로 줄인 사각형입니다. 사진기 화면의 격자선처럼, 자식을 이 틀에 맞춰 세웁니다.",
          },
        ],
      },
      {
        label: "scroll-snap-align",
        body: "스냅 컨테이너 안의 자식에 주어, 자기 상자의 어디를 스냅포트에 맞출지 정합니다. start는 시작 변, center는 가운데, end는 끝 변을 맞춥니다. 값 하나면 두 축에 같이, 둘이면 블록 축, 인라인 축 순서입니다. 스크롤 컨테이너에 scroll-snap-type이 없으면 효과가 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "이산"]],
          },
          {
            caption: "scroll-snap-align의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "이 축에 스냅 자리를 만들지 않음"],
              ["start", "자기 시작 변을 스냅포트 시작 변에 맞춤"],
              ["end", "자기 끝 변을 스냅포트 끝 변에 맞춤"],
              ["center", "자기 가운데를 스냅포트 가운데에 맞춤"],
            ],
          },
        ],
        code: ".carousel { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }\n.carousel > img { scroll-snap-align: center; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 스냅은 멈출 자리를 정한다",
        body: "회색 상자 안을 위아래로 스크롤해 보세요. 손을 떼면 상자가 가까운 칸의 시작 변에 맞춰 섭니다. 지금 값의 '칸 높이로 나눈 값'은 멈춘 뒤 늘 정수입니다.\n부모의 scroll-snap-type: y mandatory가 스냅을 켜고, 자식의 scroll-snap-align: start가 멈출 자리를 정합니다.",
        lab: {
          html: `<style>
  .snap { height: 100px; overflow-y: auto; scroll-snap-type: y mandatory; background: #f1f1f1; }
  .snap > div { height: 100px; scroll-snap-align: start; display: grid; place-items: center; }
  .snap > div:nth-child(odd) { background: #dde3f5; }
</style>
<div class="snap">
  <div>1번 칸</div>
  <div>2번 칸</div>
  <div>3번 칸</div>
  <div>4번 칸</div>
</div>`,
          height: 150,
          tryIt: "mandatory를 proximity로 바꾸거나 scroll-snap-type 줄을 지우고 다시 스크롤해 보세요. 칸 사이에서도 멈출 수 있습니다.",
          checks: [
            { label: "scrollTop", expr: "Math.round(document.querySelector('.snap').scrollTop)" },
            { label: "칸 높이로 나눈 값", expr: "Math.round(document.querySelector('.snap').scrollTop / document.querySelector('.snap').clientHeight * 100) / 100" },
            { label: "scroll-snap-type", expr: "getComputedStyle(document.querySelector('.snap')).scrollSnapType" },
          ],
        },
      },
      {
        label: "scroll-margin",
        body: "스냅하거나 이 요소로 스크롤할 때, 요소 둘레에 더하는 바깥 여백입니다. 진짜 마진과 달리 자리를 차지하지 않습니다. 스냅 영역을 이만큼 넓혀서, 맞춰 선 뒤 앞뒤가 조금 더 보이게 합니다.\n단축 속성입니다. 풀어 쓰면 scroll-margin-top, scroll-margin-right, scroll-margin-bottom, scroll-margin-left입니다. 적는 순서는 margin과 같습니다. 퍼센트는 받지 않고 길이만 받습니다. 지원은 Chrome 69, Safari 14.1, Firefox 90부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["네 속성 각각 0", "모든 요소", "안 됨", "계산값 형식대로 보간"]],
          },
        ],
        code: "h2 { scroll-margin-top: 4rem; }        /* 앵커로 이동하면 제목 위에 4rem 여유 */\n.slide { scroll-margin: 8px 16px; }    /* 위아래 8px, 좌우 16px */",
        codeLang: "css",
      },
      {
        label: "scroll-padding",
        body: "스크롤 컨테이너에 주는 안쪽 여백입니다. 요소를 보이게 스크롤할 때 쓰는 '잘 보이는 영역'을 정합니다. 고정 머리글이나 옆 막대에 가리는 만큼 비워 둘 때 씁니다. 스냅 모듈에서 정의했지만 scroll-snap-type과 상관없이 모든 스크롤 컨테이너에 적용됩니다.\n단축 속성입니다. 풀어 쓰면 scroll-padding-top, scroll-padding-right, scroll-padding-bottom, scroll-padding-left입니다. scroll-margin은 자식에, scroll-padding은 컨테이너에 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["네 속성 각각 auto", "스크롤 컨테이너", "안 됨", "계산값 형식대로 보간"]],
          },
          {
            caption: "scroll-padding의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 정함. 대개 0px"],
              ["<length-percentage>", "스크롤포트의 각 변에서 안쪽으로 들인 거리"],
            ],
          },
        ],
        code: "html { scroll-padding-top: 60px; }    /* 60px 고정 머리글 아래로 앵커가 오게 */\n.snap { scroll-padding: 0 24px; }     /* 위아래 0, 좌우 24px */",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "넘침과 스크롤에서 자주 만나는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["overflow-x: hidden만 적음", "세로가 auto로 계산되어 뜻밖의 세로 스크롤", "가로만 자르려면 overflow-x: clip"],
              ["카드에 overflow: hidden", "안의 sticky가 페이지 스크롤에 안 붙음", "clip으로 바꾸거나 overflow를 뺌"],
              ["scrollbar-width: none으로 숨김", "휠, 터치가 없는 기기에서 스크롤할 길이 없음", "보이게 두거나 thin으로 줄임"],
              ["대화 상자 안을 끝까지 스크롤", "뒤 페이지가 따라 스크롤됨", "대화 상자 스크롤 영역에 overscroll-behavior: contain"],
              ["고정 머리글이 있는 페이지에서 앵커 이동", "제목이 머리글 밑에 가려짐", "html에 scroll-padding-top이나 제목에 scroll-margin-top"],
              ["스크롤바가 생겼다 사라짐", "폭이 바뀌어 레이아웃이 흔들림", "scrollbar-gutter: stable"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) overflow-x: hidden; overflow-y: visible의 계산값은 무엇이고 왜 그런가요?\n2) hidden과 clip의 차이를 scrollTop과 sticky로 설명하세요.\n3) scroll-margin과 scroll-padding은 각각 누구에게 주나요?\n4) 대화 상자 뒤 페이지가 따라 스크롤되지 않게 하려면?",
      },
    ],
    sources: [
      { label: "MDN — overflow", href: `${MDN}/Reference/Properties/overflow` },
      { label: "MDN — overflow-x", href: `${MDN}/Reference/Properties/overflow-x` },
      { label: "MDN — scrollbar-gutter", href: `${MDN}/Reference/Properties/scrollbar-gutter` },
      { label: "MDN — overscroll-behavior", href: `${MDN}/Reference/Properties/overscroll-behavior` },
      { label: "MDN — scroll-snap-type", href: `${MDN}/Reference/Properties/scroll-snap-type` },
      { label: "MDN — scroll-padding", href: `${MDN}/Reference/Properties/scroll-padding` },
    ],
  },

  {
    id: "css-prop-transform",
    name: "변형 속성",
    tagline: "레이아웃은 그대로 두고, 그려지는 모양만 옮기고 돌리고 키운다",
    intro:
      "`transform`은 요소를 옮기고, 돌리고, 키우고, 기울입니다. 변형은 좌표계를 바꿀 뿐 레이아웃을 바꾸지 않습니다. 옆 상자는 원래 자리를 기준으로 그대로 놓입니다. 대신 none이 아니면 쌓임 맥락과 포함 블록을 만듭니다. `translate`, `rotate`, `scale`은 변형 하나만 따로 적는 속성이고, 적용 순서가 정해져 있습니다. 3D에서는 `perspective`, `transform-style`, `backface-visibility`가 원근과 뒷면을 정합니다. 원리는 12장에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "변형 속성은 셋으로 나뉩니다. 무엇을 할지(transform과 개별 속성), 어디를 기준으로 할지(transform-origin), 3D를 어떻게 보일지(perspective부터 backface-visibility까지)입니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["transform", "변형 함수 목록을 적용", "none", "안 됨", "12장 · 트랜스폼"],
              ["transform-origin", "변형의 기준점", "50% 50% 0", "안 됨", "12장 · 트랜스폼"],
              ["translate", "이동만 따로", "none", "안 됨", "12장 · 트랜스폼"],
              ["rotate", "회전만 따로", "none", "안 됨", ""],
              ["scale", "크기만 따로", "none", "안 됨", ""],
              ["perspective", "자식에게 줄 원근 거리", "none", "안 됨", ""],
              ["perspective-origin", "원근의 소실점 위치", "50% 50%", "안 됨", ""],
              ["transform-style", "자식을 3D 공간에 둘지", "flat", "안 됨", ""],
              ["backface-visibility", "뒷면을 보일지", "visible", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "transform",
        body: "요소에 변형 함수를 적용합니다. 함수는 공백으로 이어 적고, 왼쪽부터 차례로 적용됩니다. 각 함수가 다음 함수의 좌표계를 새로 만듭니다. 그래서 순서를 바꾸면 결과가 달라집니다. getComputedStyle로 읽으면 matrix() 꼴로 나옵니다.\n변형은 레이아웃에 영향을 주지 않습니다. offsetWidth나 형제의 자리는 그대로이고, 그려진 모양과 getBoundingClientRect()만 바뀝니다. none이 아니면 쌓임 맥락을 만들고, 안의 absolute와 fixed 요소의 포함 블록이 됩니다. 대체 요소가 아닌 인라인 상자, 표의 열과 열 묶음에는 적용되지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "변형 가능한 요소", "안 됨", "transform으로 보간"]],
          },
          {
            caption: "transform의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "변형 없음"],
              ["<transform-function> 목록", "공백으로 이은 변형 함수. 왼쪽부터 적용"],
            ],
          },
          {
            caption: "변형 함수",
            head: ["함수", "하는 일"],
            rows: [
              ["translate(), translateX(), translateY(), translateZ(), translate3d()", "옮김"],
              ["rotate(), rotateX(), rotateY(), rotateZ(), rotate3d()", "돌림"],
              ["scale(), scaleX(), scaleY(), scaleZ(), scale3d()", "키우거나 줄임"],
              ["skew(), skewX(), skewY()", "기울임"],
              ["matrix(), matrix3d()", "변형을 행렬로 한 번에 적음"],
              ["perspective()", "이 요소 하나에 원근을 줌"],
            ],
          },
        ],
        code: ".a { transform: translateX(80px) rotate(45deg); }   /* 옮긴 뒤 그 자리에서 돈다 */\n.b { transform: rotate(45deg) translateX(80px); }   /* 돈 뒤 기울어진 x축을 따라 옮긴다 */\n.c { transform: scale(1.2) skewX(10deg); }",
        codeLang: "css",
        terms: [
          {
            term: "변형 함수 (transform function)",
            body: "transform에 적는 translate(), rotate() 같은 함수입니다. 함수마다 좌표계를 하나씩 바꿉니다. 여러 개를 적으면 앞 함수가 바꾼 좌표계 위에서 다음 함수가 돕니다. '세 걸음 가고 오른쪽으로 돌기'와 '돌고 세 걸음 가기'가 다른 자리에 닿는 것과 같습니다.",
          },
          {
            term: "변형 가능한 요소 (transformable element)",
            body: "변형을 받을 수 있는 요소입니다. CSS 상자 모델을 따르는 요소 대부분이 해당합니다. 대체 요소가 아닌 인라인 상자, 표의 열과 열 묶음은 빠집니다. 문장 속 낱말 하나만 떼어 돌릴 수 없는 것과 같습니다. span을 돌리려면 display: inline-block을 줍니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: transform은 레이아웃을 바꾸지 않는다",
        body: "파란 상자에 transform: scale(2)를 주었습니다. 기준점은 왼쪽 위(0 0)입니다.\n지금 값의 getBoundingClientRect().width는 scale만큼 커집니다. offsetWidth는 width에 적은 그대로입니다. 형제와의 거리(next.offsetTop − box.offsetTop)도 원래 높이 그대로입니다. 그래서 커진 상자가 아래 형제를 밀지 않고 덮어 그립니다.",
        lab: {
          html: `<style>
  .box { width: 100px; height: 40px; background: #9cd3ff; transform: scale(2); transform-origin: 0 0; }
  .next { background: #ffc98a; }
</style>
<div class="box">scale(2)</div>
<div class="next">바로 아래 형제입니다.</div>`,
          height: 150,
          tryIt: "transform 줄을 지우고 width: 200px; height: 80px로 바꿔 보세요. 이번에는 offsetWidth와 형제의 자리가 함께 바뀝니다.",
          checks: [
            { label: "box.offsetWidth", expr: "document.querySelector('.box').offsetWidth" },
            { label: "box.getBoundingClientRect().width", expr: "Math.round(document.querySelector('.box').getBoundingClientRect().width)" },
            { label: "next.offsetTop − box.offsetTop", expr: "document.querySelector('.next').offsetTop - document.querySelector('.box').offsetTop" },
            { label: "box의 transform 계산값", expr: "getComputedStyle(document.querySelector('.box')).transform" },
          ],
        },
      },
      {
        label: "직접 해 보기: 함수 순서가 바뀌면 자리가 바뀐다",
        body: "A와 B는 같은 함수 둘을 순서만 바꿔 적었습니다. A는 translateX(80px) 다음 rotate(45deg), B는 그 반대입니다.\nA는 오른쪽으로 옮긴 뒤 그 자리에서 돌아, 중심이 오른쪽으로만 갑니다. B는 먼저 돌아서 x축이 기울어졌습니다. 그 기울어진 축을 따라 옮기니 중심이 오른쪽 아래로 갑니다. 지금 값의 중심 좌표와 matrix()가 서로 다릅니다.",
        lab: {
          html: `<style>
  .slot { height: 70px; border: 1px dashed #aaa; margin-bottom: 8px; }
  .box { width: 40px; height: 40px; background: #9cd3ff; }
  .a { transform: translateX(80px) rotate(45deg); }
  .b { transform: rotate(45deg) translateX(80px); background: #ffc98a; }
</style>
<div class="slot"><div class="box a">A</div></div>
<div class="slot"><div class="box b">B</div></div>`,
          height: 240,
          tryIt: "B의 두 함수 순서를 A와 같게 바꿔 보세요. 두 중심 좌표가 같아집니다.",
          checks: [
            { label: "A 중심 (칸 기준 x, y)", expr: "(() => { const el = document.querySelector('.a'); const r = el.getBoundingClientRect(); const s = el.parentNode.getBoundingClientRect(); return Math.round(r.left + r.width / 2 - s.left) + ', ' + Math.round(r.top + r.height / 2 - s.top); })()" },
            { label: "B 중심 (칸 기준 x, y)", expr: "(() => { const el = document.querySelector('.b'); const r = el.getBoundingClientRect(); const s = el.parentNode.getBoundingClientRect(); return Math.round(r.left + r.width / 2 - s.left) + ', ' + Math.round(r.top + r.height / 2 - s.top); })()" },
            { label: "A의 transform 계산값", expr: "getComputedStyle(document.querySelector('.a')).transform" },
            { label: "B의 transform 계산값", expr: "getComputedStyle(document.querySelector('.b')).transform" },
          ],
        },
      },
      {
        label: "transform-origin",
        body: "변형의 기준점을 정합니다. rotate()는 이 점을 중심으로 돌고, scale()은 이 점을 향해 줄거나 이 점에서 커집니다. 기본은 가운데(50% 50% 0)입니다.\n값은 하나에서 셋까지 적습니다. 가로, 세로, z 순서이고 z는 길이만 받습니다. 키워드 left, center, right, top, bottom도 씁니다. 적지 않은 값은 초기값으로 돌아갑니다. 속으로는 기준점을 원점으로 옮기고, 변형하고, 다시 되돌리는 이동 둘이 앞뒤로 붙는 것과 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["50% 50% 0", "변형 가능한 요소", "안 됨", "길이, 퍼센트, calc() 목록으로 보간"]],
          },
          {
            caption: "transform-origin의 값",
            head: ["값", "하는 일"],
            rows: [
              ["<length-percentage>", "왼쪽 위에서 잰 거리. 퍼센트는 상자 크기 기준"],
              ["left, center, right", "가로 0%, 50%, 100%"],
              ["top, center, bottom", "세로 0%, 50%, 100%"],
              ["<length> (셋째 값)", "z축 위치"],
            ],
          },
        ],
        code: ".door { transform-origin: left center; transform: rotateY(60deg); }   /* 왼쪽 경첩으로 열린다 */\n.pin { transform-origin: 0 0; transform: rotate(10deg); }              /* 왼쪽 위를 축으로 */",
        codeLang: "css",
      },
      {
        label: "translate",
        body: "이동 변형만 따로 적습니다. transform에서 함수 순서를 외우지 않아도 되게 만든 속성입니다. 값 하나는 x, 둘은 x와 y, 셋째 값은 z 길이입니다.\n개별 속성은 정해진 순서로 적용됩니다. translate, rotate, scale을 차례로 적용하고 마지막에 transform을 적용합니다. 그래서 translate는 부모의 좌표계 그대로 움직이고, transform 안의 함수는 그 뒤의 좌표계에서 움직입니다. 계산값도 따로라서 getComputedStyle의 transform에 섞여 나오지 않습니다. 지원은 Chrome 104, Safari 14.1, Firefox 72부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "변형 가능한 요소", "안 됨", "transform으로 보간"]],
          },
          {
            caption: "translate의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "이동 없음"],
              ["<length-percentage> 하나", "x축 이동 (값 하나인 translate()와 같음)"],
              ["<length-percentage> 둘", "x, y 이동"],
              ["둘 + <length>", "x, y, z 이동 (translate3d()와 같음)"],
            ],
          },
        ],
        code: ".a { translate: 20px; }          /* x만 */\n.b { translate: 20px 10%; }      /* x, y. %는 자기 상자 크기 기준 */\n.c { translate: 0 0 40px; }      /* z까지 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 개별 속성은 transform보다 먼저",
        body: "P는 translate: 80px와 transform: rotate(45deg), Q는 rotate: 45deg와 transform: translateX(80px)을 받았습니다.\n순서는 translate, rotate, scale, transform입니다. P는 옮긴 뒤 돌아서 중심이 오른쪽으로만 갑니다. Q는 rotate 속성이 먼저 돌고, transform의 translateX가 기울어진 축을 따라 옮깁니다. 그래서 중심이 오른쪽 아래로 갑니다. Q의 transform 계산값에는 회전이 섞이지 않고, 회전은 rotate 계산값에 따로 있습니다.",
        lab: {
          html: `<style>
  .slot { height: 70px; border: 1px dashed #aaa; margin-bottom: 8px; }
  .box { width: 40px; height: 40px; background: #9cd3ff; }
  .p { translate: 80px; transform: rotate(45deg); }
  .q { rotate: 45deg; transform: translateX(80px); background: #ffc98a; }
</style>
<div class="slot"><div class="box p">P</div></div>
<div class="slot"><div class="box q">Q</div></div>`,
          height: 240,
          tryIt: "Q를 rotate 속성 대신 transform: translateX(80px) rotate(45deg) 한 줄로 바꿔 보세요. 중심이 P와 같아집니다.",
          checks: [
            { label: "P 중심 (칸 기준 x, y)", expr: "(() => { const el = document.querySelector('.p'); const r = el.getBoundingClientRect(); const s = el.parentNode.getBoundingClientRect(); return Math.round(r.left + r.width / 2 - s.left) + ', ' + Math.round(r.top + r.height / 2 - s.top); })()" },
            { label: "Q 중심 (칸 기준 x, y)", expr: "(() => { const el = document.querySelector('.q'); const r = el.getBoundingClientRect(); const s = el.parentNode.getBoundingClientRect(); return Math.round(r.left + r.width / 2 - s.left) + ', ' + Math.round(r.top + r.height / 2 - s.top); })()" },
            { label: "Q의 transform 계산값", expr: "getComputedStyle(document.querySelector('.q')).transform" },
            { label: "Q의 rotate 계산값", expr: "getComputedStyle(document.querySelector('.q')).rotate" },
          ],
        },
      },
      {
        label: "rotate",
        body: "회전 변형만 따로 적습니다. 각도 하나면 화면에 수직인 z축을 중심으로 돕니다. rotate() 함수와 같고, 양수 각도는 시계 방향입니다. 축 이름 x, y, z나 벡터를 뜻하는 수 셋을 각도 앞에 붙이면 3D 회전입니다.\ntranslate 다음, scale 앞에 적용됩니다. transform의 함수보다는 늘 먼저입니다. 지원은 Chrome 104, Safari 14.1, Firefox 72부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "변형 가능한 요소", "안 됨", "transform으로 보간"]],
          },
          {
            caption: "rotate의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "회전 없음"],
              ["<angle>", "z축 회전 (rotate()와 같음)"],
              ["x, y, z + <angle>", "그 축을 중심으로 회전 (rotateX() 등과 같음)"],
              ["수 셋 + <angle>", "그 벡터를 축으로 회전 (rotate3d()와 같음)"],
            ],
          },
        ],
        code: ".icon { rotate: 90deg; }\n.card { rotate: y 180deg; }      /* 세로축을 중심으로 뒤집는다 */\n.cube { rotate: 1 1 0 45deg; }   /* 대각선 축으로 돈다 */",
        codeLang: "css",
      },
      {
        label: "scale",
        body: "크기 변형만 따로 적습니다. 값 하나면 가로세로 같은 비율, 둘이면 가로와 세로, 셋이면 z까지입니다. 수(1.5)와 퍼센트(150%) 둘 다 됩니다. 1보다 작으면 줄어듭니다.\nrotate 다음, transform 앞에 적용됩니다. 레이아웃 크기는 바뀌지 않으므로, 커져도 옆 상자를 밀지 않고 겹쳐 그려집니다. 지원은 Chrome 104, Safari 14.1, Firefox 72부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "변형 가능한 요소", "안 됨", "transform으로 보간"]],
          },
          {
            caption: "scale의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "크기 변화 없음"],
              ["값 하나", "두 축 같은 비율 (값 하나인 scale()과 같음)"],
              ["값 둘", "가로, 세로 비율"],
              ["값 셋", "가로, 세로, z 비율 (scale3d()와 같음)"],
            ],
          },
        ],
        code: ".thumb:hover { scale: 1.1; }\n.flip { scale: -1 1; }      /* 좌우로 뒤집는다 */",
        codeLang: "css",
      },
      {
        label: "perspective",
        body: "자식들에게 원근을 줍니다. 값은 보는 사람과 z=0 평면 사이의 거리입니다. 작을수록 원근이 세고, 클수록 약합니다. z가 양수인 부분은 커 보이고, 음수인 부분은 작아 보입니다.\n변형할 요소가 아니라 그 부모에 줍니다. 요소 하나에만 원근을 주려면 transform의 perspective() 함수를 씁니다. 음수는 문법 오류이고, 1px보다 작으면 1px로 맞춥니다. none이 아니면 쌓임 맥락을 만들고 fixed 자손의 포함 블록이 됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "변형 가능한 요소", "안 됨", "길이로 보간"]],
          },
          {
            caption: "perspective의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "원근 없음"],
              ["<length>", "보는 사람에서 z=0 평면까지 거리. 음수는 안 됨"],
            ],
          },
        ],
        code: ".stage { perspective: 600px; }\n.stage > .card { transform: rotateY(40deg); }   /* 부모의 원근으로 비스듬히 보인다 */",
        codeLang: "css",
        terms: [
          {
            term: "소실점 (vanishing point)",
            body: "멀어지는 선들이 모여 보이는 한 점입니다. CSS에서는 perspective-origin이 이 점의 자리입니다. 곧은 기찻길이 멀리서 한 점으로 모여 보이는 것과 같습니다.",
          },
        ],
      },
      {
        label: "perspective-origin",
        body: "보는 사람이 어디를 바라보는지, 곧 소실점의 위치를 정합니다. 기본은 요소 가운데(50% 50%)입니다. perspective와 함께 변형할 자식의 부모에 줍니다. 퍼센트는 요소의 폭과 높이가 기준이고, 음수도 됩니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["50% 50%", "변형 가능한 요소", "안 됨", "길이, 퍼센트, calc() 목록으로 보간"]],
          },
          {
            caption: "perspective-origin의 값",
            head: ["값", "하는 일"],
            rows: [
              ["x 위치", "길이, 퍼센트, left(0), center(50%), right(100%)"],
              ["y 위치", "길이, 퍼센트, top(0), center(50%), bottom(100%)"],
            ],
          },
        ],
        code: ".stage { perspective: 600px; perspective-origin: left top; }   /* 왼쪽 위에서 바라본다 */",
        codeLang: "css",
      },
      {
        label: "transform-style",
        body: "자식을 3D 공간에 둘지, 이 요소의 평면에 납작하게 그릴지 정합니다. flat이면 자식의 3D 변형이 이 평면에 눌려 그려집니다. preserve-3d면 자식들이 같은 3D 공간에 놓여 서로 앞뒤로 겹칩니다.\n상속되지 않으므로 3D 장면의 잎이 아닌 중간 요소마다 줘야 합니다. 몇몇 값은 preserve-3d를 쓰는 값을 flat으로 되돌립니다. visible, clip이 아닌 overflow, 1 미만의 opacity, filter, clip-path, mask-image, mix-blend-mode, isolation: isolate 등이 그렇습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["flat", "변형 가능한 요소", "안 됨", "이산"]],
          },
          {
            caption: "transform-style의 값",
            head: ["값", "하는 일"],
            rows: [
              ["flat", "자식을 이 요소의 평면에 납작하게 그림"],
              ["preserve-3d", "자식을 3D 공간에 둠"],
            ],
          },
        ],
        code: ".cube { transform-style: preserve-3d; rotate: 1 1 0 30deg; }\n.cube > .face { position: absolute; inset: 0; }",
        codeLang: "css",
        terms: [
          {
            term: "평탄화 (flattening)",
            body: "3D로 놓인 자식들을 부모의 평면 한 장에 눌러 그리는 일입니다. 그러면 자식끼리 앞뒤로 엇갈려 겹치지 않습니다. 입체 모형을 사진 한 장으로 찍은 것과 같습니다.",
          },
        ],
      },
      {
        label: "backface-visibility",
        body: "요소가 3D로 돌아 뒷면이 보는 사람을 향할 때 보일지 정합니다. 뒷면은 앞면의 거울상입니다. hidden이면 뒤집힌 동안 요소가 보이지 않습니다. 카드 뒤집기에서 앞면과 뒷면 요소 둘을 겹칠 때 씁니다.\n원근이 없는 2D 변형에는 효과가 없습니다. 지원은 Chrome 36, Safari 15.4, Firefox 16부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["visible", "변형 가능한 요소", "안 됨", "이산"]],
          },
          {
            caption: "backface-visibility의 값",
            head: ["값", "하는 일"],
            rows: [
              ["visible", "뒷면이 향해도 보임 (거울상)"],
              ["hidden", "뒷면이 향하면 숨김"],
            ],
          },
        ],
        code: ".card { position: relative; transform-style: preserve-3d; transition: rotate 0.6s; }\n.card:hover { rotate: y 180deg; }\n.front, .back { position: absolute; inset: 0; backface-visibility: hidden; }\n.back { rotate: y 180deg; }",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "변형에서 자주 만나는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["translate()로 옮기면 옆 상자도 따라올 줄 앎", "옆 상자는 원래 자리 기준이라 겹쳐 그려짐", "자리를 바꾸려면 margin, 그리드 같은 레이아웃 속성"],
              ["rotate()와 translate()의 순서를 바꿈", "전혀 다른 자리에 놓임", "왼쪽부터 적용됨을 생각하고 순서를 정함"],
              ["rotate 속성과 transform: rotate()를 함께 씀", "두 회전이 겹쳐 더해짐", "한 가지 방법만 쓰거나 적용 순서를 고려"],
              ["조상에 transform을 줌", "자손 fixed가 뷰포트 대신 그 조상을 따라감", "fixed 요소를 그 조상 밖으로 옮김"],
              ["preserve-3d를 줬는데 자식이 납작함", "overflow: hidden, opacity 같은 값이 flat으로 되돌림", "그 값을 다른 요소로 옮김"],
              ["perspective를 변형할 요소 자신에 줌", "그 요소에는 원근이 안 보임", "부모에 perspective, 또는 transform에 perspective() 함수"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) transform으로 키운 상자에서 offsetWidth와 getBoundingClientRect().width 가운데 무엇이 바뀌나요?\n2) translateX(80px) rotate(45deg)와 rotate(45deg) translateX(80px)은 어떻게 다른가요?\n3) translate, rotate, scale 속성과 transform은 어떤 순서로 적용되나요?\n4) preserve-3d가 flat으로 되돌아가는 경우를 둘 대 보세요.",
      },
    ],
    sources: [
      { label: "MDN — transform", href: `${MDN}/Reference/Properties/transform` },
      { label: "MDN — transform-origin", href: `${MDN}/Reference/Properties/transform-origin` },
      { label: "MDN — translate", href: `${MDN}/Reference/Properties/translate` },
      { label: "MDN — perspective", href: `${MDN}/Reference/Properties/perspective` },
      { label: "MDN — transform-style", href: `${MDN}/Reference/Properties/transform-style` },
      { label: "MDN — Using CSS transforms", href: `${MDN}/Guides/Transforms/Using` },
    ],
  },

  {
    id: "css-prop-motion",
    name: "트랜지션과 애니메이션 속성",
    tagline: "값이 바뀌는 순간을 시간 위에 펴고, 거쳐 갈 장면을 직접 적는다",
    intro:
      "트랜지션은 속성값이 바뀔 때 옛 값에서 새 값까지 그 사이를 채워 움직입니다. :hover나 클래스 변경이 계기입니다. 애니메이션은 `@keyframes`에 거쳐 갈 장면을 적고 시간 위에 놓습니다. 계기 없이 바로 돌 수 있습니다. 이 장은 두 단축 속성 `transition`, `animation`과 풀어 쓴 속성을 모두 모았습니다. 마지막의 `will-change`는 곧 바뀔 것을 브라우저에 미리 알리는 힌트입니다. 원리는 12장에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "transition-* 여섯은 값이 바뀔 때의 움직임을, animation-* 열은 키프레임 애니메이션을 정합니다. 둘 다 쉼표로 여러 개를 적을 수 있고, 목록은 순서대로 짝지어집니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["transition", "트랜지션 단축 속성", "각 속성의 초기값", "안 됨", "12장 · 트랜지션과 애니메이션"],
              ["transition-property", "트랜지션할 속성", "all", "안 됨", ""],
              ["transition-duration", "걸리는 시간", "0s", "안 됨", ""],
              ["transition-timing-function", "속도 곡선", "ease", "안 됨", ""],
              ["transition-delay", "시작 전 기다림", "0s", "안 됨", ""],
              ["transition-behavior", "이산 속성도 트랜지션할지", "normal", "안 됨", "12장 · 트랜지션과 애니메이션"],
              ["animation", "애니메이션 단축 속성", "각 속성의 초기값", "안 됨", "12장 · 트랜지션과 애니메이션"],
              ["animation-name", "쓸 @keyframes 이름", "none", "안 됨", ""],
              ["animation-duration", "한 바퀴 시간", "0s", "안 됨", ""],
              ["animation-timing-function", "한 바퀴 안의 속도 곡선", "ease", "안 됨", ""],
              ["animation-delay", "시작 전 기다림", "0s", "안 됨", ""],
              ["animation-iteration-count", "반복 횟수", "1", "안 됨", ""],
              ["animation-direction", "도는 방향", "normal", "안 됨", ""],
              ["animation-fill-mode", "시작 전, 끝난 뒤의 값", "none", "안 됨", "12장 · 트랜지션과 애니메이션"],
              ["animation-play-state", "돌릴지 멈출지", "running", "안 됨", ""],
              ["will-change", "곧 바뀔 속성을 미리 알림", "auto", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "transition",
        body: "속성값이 바뀔 때 그 사이를 시간에 걸쳐 채우게 합니다. 단축 속성입니다. 풀어 쓰면 transition-property, transition-duration, transition-timing-function, transition-delay, transition-behavior입니다.\n속성마다 한 덩이씩 쉼표로 이어 적습니다. 한 덩이 안에 시간 값이 둘이면 앞이 duration, 뒤가 delay입니다. 속성 이름을 빼면 all로 봅니다. none은 트랜지션을 끕니다.\n주의할 점입니다. duration의 초기값이 0s라서 시간을 안 적으면 아무것도 움직이지 않습니다. 처음 그려질 때와 display: none에서 나타날 때는 트랜지션이 시작되지 않습니다. 그때는 @starting-style로 시작 값을 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["각 속성의 초기값", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
        ],
        code: "/* property | duration | timing-function | delay | behavior */\n.btn { transition: background-color 0.3s ease-in 0.1s; }\n.btn { transition: width 0.5s, opacity 0.2s linear; }   /* 속성마다 쉼표 */\n.btn { transition: all 0.2s, opacity 0.4s; }            /* opacity만 0.4s */",
        codeLang: "css",
        terms: [
          {
            term: "보간 (interpolation)",
            body: "두 값 사이의 중간값을 계산해 채우는 일입니다. 길이, 색, 숫자는 보간되어 부드럽게 바뀝니다. 0에서 100으로 가는 동안 10, 20, 30을 차례로 지나는 것과 같습니다.",
          },
          {
            term: "이산 애니메이션 (discrete)",
            body: "중간값이 없는 속성의 움직임입니다. display, visibility 같은 속성은 대개 50% 지점에서 한 번에 바뀝니다. 켜짐과 꺼짐 사이가 없는 전등 스위치와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: hover 트랜지션과 transitionend",
        body: "파란 상자에 마우스를 올려 보세요. width는 바로 늘기 시작하고, background-color는 0.2초 기다렸다가 바뀝니다. 지금 값이 그사이의 중간값을 보여 줍니다.\n속성마다 트랜지션이 끝나면 기록에 transitionend가 한 줄씩 찍힙니다. 시간은 지연을 뺀 값이라 적은 duration과 같습니다. 마우스를 빼면 거꾸로 돌아가는 트랜지션이 다시 돌고, 끝나면 또 찍힙니다.",
        lab: {
          html: `<style>
  .btn { width: 140px; padding: 8px; background-color: #9cd3ff;
    transition: width 0.5s ease, background-color 0.3s linear 0.2s; }
  .btn:hover { width: 240px; background-color: #ffc98a; }
</style>
<div class="btn">마우스를 올려 보세요</div>`,
          height: 140,
          tryIt: "transition 줄에서 background-color 덩이를 지워 보세요. 색은 바로 바뀌고 transitionend는 width만 찍힙니다.",
          checks: [
            { label: "width (그려진 폭)", expr: "Math.round(document.querySelector('.btn').getBoundingClientRect().width)" },
            { label: "background-color", expr: "getComputedStyle(document.querySelector('.btn')).backgroundColor" },
            { label: "transition-property", expr: "getComputedStyle(document.querySelector('.btn')).transitionProperty" },
            { label: "transition-delay", expr: "getComputedStyle(document.querySelector('.btn')).transitionDelay" },
          ],
        },
      },
      {
        label: "transition-property",
        body: "어느 속성에 트랜지션을 걸지 정합니다. 쉼표로 여러 개를 적습니다. 이 목록이 기준이 되어, duration과 delay 같은 다른 목록이 순서대로 짝지어집니다. background처럼 단축 속성 이름을 적으면 그 안의 보간할 수 있는 속성이 모두 걸립니다.\nall은 편하지만 생각지 못한 속성까지 움직일 수 있습니다. 움직일 속성을 적어 두는 편이 안전합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["all", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "transition-property의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "아무 속성도 트랜지션하지 않음"],
              ["all", "트랜지션할 수 있는 모든 속성"],
              ["<custom-ident>", "그 이름의 속성 하나"],
            ],
          },
        ],
      },
      {
        label: "transition-duration",
        body: "옛 값에서 새 값까지 걸리는 시간입니다. 초기값 0s는 바로 바뀌어 트랜지션이 없습니다. 음수를 적으면 선언이 무효가 됩니다.\n여러 개를 적으면 transition-property 목록과 순서대로 짝짓습니다. 개수가 모자라면 되풀이하고, 남으면 잘라 냅니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0s", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "transition-duration의 값",
            head: ["값", "하는 일"],
            rows: [["<time>", "걸리는 시간(s, ms). 0s면 바로 바뀜. 음수는 무효"]],
          },
        ],
      },
      {
        label: "transition-timing-function",
        body: "트랜지션 동안 중간값을 어떤 빠르기로 지날지 정하는 곡선입니다. 이를 이징 함수라 합니다. 기본 ease는 가운데로 가며 빨라졌다가 끝에서 느려집니다. linear는 처음부터 끝까지 같은 빠르기입니다. steps()는 부드럽게가 아니라 계단처럼 끊어서 바뀝니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["ease", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "transition-timing-function의 값",
            head: ["값", "하는 일"],
            rows: [
              ["ease", "가운데로 가며 빨라지고 끝에서 느려짐. 기본값"],
              ["linear", "처음부터 끝까지 같은 빠르기"],
              ["ease-in", "느리게 시작해 점점 빨라짐"],
              ["ease-out", "빠르게 시작해 점점 느려짐"],
              ["ease-in-out", "느리게 시작해 빨라졌다가 느리게 끝남"],
              ["cubic-bezier(x1, y1, x2, y2)", "직접 정한 곡선. x1, x2는 0에서 1 사이"],
              ["steps(n, <jump-term>)", "n칸 계단으로 끊어 바뀜"],
              ["step-start, step-end", "steps(1, jump-start), steps(1, jump-end)와 같음"],
              ["linear(…)", "점 여러 개를 이은 꺾은선 곡선"],
            ],
          },
        ],
        code: ".menu { transition: opacity 0.2s ease-out; }\n.clock { transition: rotate 1s steps(12, jump-end); }      /* 12칸으로 끊어 돈다 */\n.pop { transition: scale 0.3s cubic-bezier(0.3, 1.4, 0.6, 1); }",
        codeLang: "css",
        terms: [
          {
            term: "이징 함수 (easing function)",
            body: "흐른 시간의 비율을 값이 바뀐 비율로 바꾸는 곡선입니다. 같은 1초라도 처음에 많이 가고 나중에 조금 갈 수 있습니다. 출발할 때 천천히 밟고 서기 전에 브레이크를 거는 운전과 같습니다.",
          },
        ],
      },
      {
        label: "transition-delay",
        body: "값이 바뀐 뒤 트랜지션을 시작하기 전에 기다릴 시간입니다. 0s면 바로 시작합니다. 음수면 바로 시작하되, 그만큼 이미 진행된 중간부터 움직입니다.\n목록을 짝짓는 규칙은 transition-duration과 같습니다. 마우스가 메뉴를 잠깐 스쳐도 열리지 않게 할 때 짧은 지연을 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0s", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "transition-delay의 값",
            head: ["값", "하는 일"],
            rows: [
              ["0s", "바로 시작"],
              ["양수 <time>", "그만큼 기다렸다가 시작"],
              ["음수 <time>", "바로 시작. 그만큼 진행된 지점부터 움직임"],
            ],
          },
        ],
      },
      {
        label: "transition-behavior",
        body: "이산으로 움직이는 속성에도 트랜지션을 시작할지 정합니다. 기본 normal이면 display, visibility 같은 이산 속성은 트랜지션 없이 바로 바뀝니다. allow-discrete면 이들도 트랜지션에 들어갑니다.\n이산 속성은 보통 50% 지점에서 뒤집힙니다. display: none과 오갈 때는 다릅니다. 나타날 때는 0%에서 보이는 값으로, 사라질 때는 100%에서 none으로 바뀝니다. 그래서 페이드가 처음부터 끝까지 보입니다. 나타날 때의 시작 값은 @starting-style로 줍니다. 지원은 Chrome 117, Safari 17.4, Firefox 129부터입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소", "안 됨", "안 됨"]],
          },
          {
            caption: "transition-behavior의 값",
            head: ["값", "하는 일"],
            rows: [
              ["allow-discrete", "이산 속성에도 트랜지션을 시작함"],
              ["normal", "이산 속성은 트랜지션하지 않음"],
            ],
          },
        ],
        code: ".panel { display: none; opacity: 0; transition: opacity 0.3s, display 0.3s allow-discrete; }\n.panel.open { display: block; opacity: 1; }\n@starting-style { .panel.open { opacity: 0; } }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: allow-discrete로 display 트랜지션",
        body: "'보이기'를 체크하면 상자가 display: none에서 block이 되며 서서히 나타납니다. @starting-style이 opacity의 시작 값 0을 줍니다.\n체크를 풀면 서서히 사라집니다. 지금 값의 display는 페이드가 끝날 때까지 block이다가 마지막에 none이 됩니다. allow-discrete가 display를 트랜지션에 넣었기 때문입니다. 기록에는 transitionend 줄이 찍힙니다.",
        lab: {
          html: `<style>
  .panel { display: none; opacity: 0; background: #9cd3ff; padding: 8px; margin-top: 8px;
    transition: opacity 0.6s, display 0.6s allow-discrete; }
  #show:checked ~ .panel { display: block; opacity: 1; }
  @starting-style { #show:checked ~ .panel { opacity: 0; } }
</style>
<input type="checkbox" id="show"> <label for="show">보이기</label>
<div class="panel">천천히 나타나고 천천히 사라집니다.</div>`,
          height: 150,
          tryIt: "display 덩이의 allow-discrete를 지우고 체크를 풀어 보세요. 사라질 때 페이드 없이 바로 없어집니다.",
          checks: [
            { label: "display", expr: "getComputedStyle(document.querySelector('.panel')).display" },
            { label: "opacity", expr: "Math.round(getComputedStyle(document.querySelector('.panel')).opacity * 100) / 100" },
            { label: "transition-behavior", expr: "getComputedStyle(document.querySelector('.panel')).transitionBehavior" },
          ],
        },
      },
      {
        label: "animation",
        body: "요소에 @keyframes 애니메이션을 겁니다. 단축 속성입니다. 풀어 쓰면 animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, animation-play-state, animation-timeline입니다.\n값의 순서는 대체로 자유지만 두 가지는 지킵니다. 시간 값이 둘이면 앞이 duration, 뒤가 delay입니다. 이름은 맨 뒤에 둡니다. 다른 속성의 값으로 읽힐 수 있는 낱말은 그쪽에 먼저 들어가기 때문입니다.\n빠진 값은 초기값으로 돌아갑니다. animation-timeline도 auto로 되돌리니, 스크롤 연동 애니메이션은 animation 뒤에 animation-timeline을 적습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["각 속성의 초기값", "모든 요소", "안 됨", "안 됨"]],
          },
        ],
        code: "/* duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | name */\n.toast { animation: 0.4s ease-out 1s 1 normal both running slide-in; }\n.dot { animation: 1s linear infinite alternate pulse; }\n.hero { animation: 3s linear slide-in, 3s ease-out 5s slide-out; }   /* 쉼표로 여럿 */",
        codeLang: "css",
        terms: [
          {
            term: "키프레임 (keyframe)",
            body: "애니메이션이 거쳐 갈 한 장면입니다. @keyframes 안에 from, to나 0%, 50% 같은 지점마다 값을 적습니다. 그 사이는 브라우저가 채웁니다. 만화에서 주요 장면만 그리고 사이 그림은 따로 채우는 것과 같습니다.",
          },
        ],
      },
      {
        label: "animation-name",
        body: "쓸 @keyframes 규칙의 이름을 적습니다. 쉼표로 여러 개를 적으면, 다른 animation-* 값들이 이 순서대로 짝지어집니다. 이름에 맞는 @keyframes가 없으면 아무것도 움직이지 않습니다.\nnone은 애니메이션을 끕니다. 목록의 순서를 지키면서 하나만 끌 때도 씁니다. 이름은 대소문자를 가립니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-name의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "키프레임 없음. 애니메이션을 끔"],
              ["<custom-ident>", "따옴표 없는 이름. 대소문자를 가림"],
              ["<string>", "따옴표로 감싼 이름"],
            ],
          },
        ],
      },
      {
        label: "animation-duration",
        body: "한 바퀴 도는 데 걸리는 시간입니다. 초기값 0s여도 애니메이션은 실행되어 animationstart와 animationend 이벤트가 납니다. 화면에 무엇이 보이는지는 animation-fill-mode에 달렸습니다. 음수는 무효입니다.\nauto는 시간 기반 애니메이션에서 0s와 같습니다. 스크롤 연동 애니메이션에서는 타임라인 전체를 채웁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0s", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-duration의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "시간 기반이면 0s. 스크롤 연동이면 타임라인 전체"],
              ["<time>", "한 바퀴 시간. 0 이상이고 단위가 꼭 필요함"],
            ],
          },
        ],
      },
      {
        label: "animation-timing-function",
        body: "한 바퀴 도는 동안의 속도 곡선입니다. 값은 transition-timing-function과 같은 이징 함수입니다.\n곡선은 애니메이션 전체가 아니라 키프레임 사이 구간마다 걸립니다. 키프레임 안에 animation-timing-function을 적으면 그 구간만 바꿀 수 있습니다. 그래서 to(100%) 키프레임에 적은 곡선은 쓰이지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["ease", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-timing-function의 값",
            head: ["값", "하는 일"],
            rows: [
              ["ease, linear, ease-in, ease-out, ease-in-out", "미리 정한 곡선. 기본값 ease"],
              ["cubic-bezier(), linear()", "직접 정한 곡선"],
              ["steps(), step-start, step-end", "계단처럼 끊어 바뀜"],
            ],
          },
        ],
        code: "@keyframes bounce {\n  0% { translate: 0 0; animation-timing-function: ease-out; }   /* 0%에서 50%까지만 */\n  50% { translate: 0 -20px; animation-timing-function: ease-in; }\n  100% { translate: 0 0; }\n}",
        codeLang: "css",
      },
      {
        label: "animation-delay",
        body: "애니메이션을 건 순간부터 시작까지 기다릴 시간입니다. 양수면 기다렸다가, 0s면 바로 시작합니다. 음수면 바로 시작하되 그만큼 지난 지점부터 돕니다. -1s면 1초 진행된 장면부터입니다.\n지연 동안 무엇이 보일지는 animation-fill-mode가 정합니다. 스크롤 연동 애니메이션에는 효과가 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0s", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-delay의 값",
            head: ["값", "하는 일"],
            rows: [
              ["0s", "걸자마자 시작"],
              ["양수 <time>", "그만큼 기다렸다가 시작"],
              ["음수 <time>", "바로 시작. 그만큼 지난 지점부터"],
            ],
          },
        ],
      },
      {
        label: "animation-iteration-count",
        body: "몇 번 돌지 정합니다. 기본은 1입니다. 0.5처럼 소수를 주면 한 바퀴의 일부만 돕니다. infinite는 끝없이 돕니다. 음수는 무효입니다.\n끝없이 도는 움직임은 주의를 흩뜨립니다. 멈출 수단을 주거나, prefers-reduced-motion일 때 끕니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["1", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-iteration-count의 값",
            head: ["값", "하는 일"],
            rows: [
              ["infinite", "끝없이 반복"],
              ["<number>", "반복 횟수. 소수면 일부만. 음수는 무효"],
            ],
          },
        ],
      },
      {
        label: "animation-direction",
        body: "바퀴마다 앞으로 돌지, 거꾸로 돌지, 번갈아 돌지 정합니다. reverse는 키프레임을 거꾸로 밟고 이징 곡선도 뒤집습니다. ease-in이 ease-out처럼 됩니다. alternate는 홀수 바퀴를 앞으로, 짝수 바퀴를 거꾸로 돕니다. 바퀴는 1부터 셉니다.\n방향은 fill-mode가 붙잡는 '마지막 키프레임'도 바꿉니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-direction의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "매 바퀴 앞으로. 처음 장면으로 돌아가 다시 시작. 기본값"],
              ["reverse", "매 바퀴 거꾸로. 이징 곡선도 뒤집힘"],
              ["alternate", "첫 바퀴는 앞으로, 다음 바퀴는 거꾸로 번갈아"],
              ["alternate-reverse", "첫 바퀴는 거꾸로, 다음 바퀴는 앞으로 번갈아"],
            ],
          },
        ],
      },
      {
        label: "animation-fill-mode",
        body: "애니메이션이 돌지 않는 동안, 곧 시작 전 지연과 끝난 뒤에 키프레임 값을 적용할지 정합니다. 기본 none은 끝나면 원래 스타일로 돌아갑니다. 그래서 끝 장면에서 멈추게 하려면 forwards나 both가 필요합니다.\n어느 키프레임이 마지막인지는 animation-direction과 반복 횟수에 달렸습니다. forwards로 남은 속성은 will-change에 적힌 것처럼 다뤄집니다. 애니메이션 중에 쌓임 맥락이 생겼다면 끝난 뒤에도 남습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-fill-mode의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "돌지 않는 동안 키프레임 값을 쓰지 않음. 기본값"],
              ["forwards", "끝난 뒤 마지막 키프레임 값을 유지"],
              ["backwards", "지연 동안 첫 키프레임 값을 적용"],
              ["both", "forwards와 backwards를 함께"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 애니메이션 이벤트와 fill-mode",
        body: "'움직이기'를 체크하면 0.5초 지연 뒤 상자가 오른쪽으로 갑니다. 기록에는 시작할 때 animationstart, 끝날 때 animationend가 찍힙니다. 시간은 지연을 뺀 진행 시간입니다.\nforwards라서 끝난 뒤에도 지금 값의 translate가 to 키프레임 값에 머뭅니다. 체크를 풀면 animation-name이 none이 되어 처음 자리로 돌아갑니다. 다시 체크하면 처음부터 다시 돕니다.",
        lab: {
          html: `<style>
  @keyframes slide { from { translate: 0; } to { translate: 160px; } }
  .box { width: 60px; height: 30px; margin-top: 8px; background: #9cd3ff; }
  #go:checked ~ .box { animation: slide 1s ease-out 0.5s forwards; }
</style>
<input type="checkbox" id="go"> <label for="go">움직이기</label>
<div class="box"></div>`,
          height: 140,
          tryIt: "forwards를 none으로 바꾸고 실행해 보세요. animationend 뒤 translate가 none으로 돌아갑니다. both로 바꾸면 지연 동안에도 첫 키프레임 값이 걸립니다.",
          checks: [
            { label: "translate", expr: "getComputedStyle(document.querySelector('.box')).translate" },
            { label: "animation-name", expr: "getComputedStyle(document.querySelector('.box')).animationName" },
            { label: "animation-fill-mode", expr: "getComputedStyle(document.querySelector('.box')).animationFillMode" },
          ],
        },
      },
      {
        label: "animation-play-state",
        body: "애니메이션을 돌릴지 멈출지 정합니다. paused로 멈췄다가 running으로 돌리면, 처음부터가 아니라 멈춘 곳에서 이어 갑니다. :hover나 클래스로 바꿔 '올리면 멈춤'을 만들 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["running", "모든 요소, ::before, ::after", "안 됨", "안 됨"]],
          },
          {
            caption: "animation-play-state의 값",
            head: ["값", "하는 일"],
            rows: [
              ["running", "돌고 있음. 기본값"],
              ["paused", "멈춤. 다시 running이면 멈춘 곳에서 이어 감"],
            ],
          },
        ],
        code: ".ticker { animation: scroll-left 20s linear infinite; }\n.ticker:hover { animation-play-state: paused; }   /* 올리면 멈춘다 */",
        codeLang: "css",
      },
      {
        label: "will-change",
        body: "곧 바뀔 속성을 브라우저에 미리 알리는 힌트입니다. 브라우저는 그 변화에 맞춰 미리 준비해 둡니다. 다만 최후의 수단입니다. 이미 성능 문제가 있을 때만 씁니다.\n많은 요소에 주거나 스타일시트에 늘 걸어 두면, 오히려 메모리를 많이 쓰고 느려집니다. 변화 직전에 스크립트로 켜고 끝나면 끄는 편이 좋습니다. 쌓임 맥락을 만드는 속성(opacity, transform 등)을 적으면 그 맥락이 미리 생깁니다. @keyframes 안에는 적지 않습니다. 애니메이션되는 속성은 이미 그렇게 다뤄집니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소", "안 됨", "이산"]],
          },
          {
            caption: "will-change의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "평소의 최적화만 함. 기본값"],
              ["scroll-position", "스크롤 위치가 곧 바뀜"],
              ["contents", "요소의 내용이 곧 바뀜"],
              ["<custom-ident>", "곧 바뀔 속성 이름. 단축 속성이면 풀어 쓴 속성 모두"],
            ],
          },
        ],
        code: ".drawer { will-change: transform; }                      /* 늘 걸어 두면 메모리를 계속 쓴다 */\n.slide.about-to-move { will-change: transform, opacity; }  /* 바뀌기 직전에만 켠다 */",
        codeLang: "css",
        terms: [
          {
            term: "레이어 (layer)",
            body: "브라우저가 페이지의 일부를 따로 그려 두는 판입니다. 따로 그려 두면 움직일 때 그 판만 옮기면 되어 빠릅니다. 대신 판마다 메모리를 씁니다. 셀 애니메이션에서 움직이는 인물만 투명 필름에 따로 그리는 것과 같습니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "움직임에서 자주 만나는 실수입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["transition에 속성만 적고 시간을 안 적음", "duration이 0s라 바로 바뀜", "transition: opacity 0.3s처럼 시간을 적음"],
              ["display: none 토글에 페이드를 걺", "display가 이산이라 바로 사라짐", "allow-discrete와 @starting-style"],
              ["fill-mode를 안 줌", "애니메이션이 끝나면 처음 자리로 튐", "forwards나 both"],
              ["시간 값을 하나만 적고 지연을 기대함", "첫 시간 값은 duration으로 들어감", "duration과 delay를 둘 다 적음"],
              ["will-change를 많은 요소에 늘 걸어 둠", "메모리가 늘고 오히려 느려짐", "바뀌기 직전에만 켜고 끝나면 끔"],
              ["큰 움직임을 끝없이 돌림", "움직임에 민감한 사람이 불편함", "prefers-reduced-motion: reduce에서 끄거나 줄임"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) transition: width 0.5s 0.2s에서 0.2s는 무엇인가요?\n2) 애니메이션이 끝난 뒤 마지막 장면에 머물게 하려면 무엇이 필요한가요?\n3) display: none 요소를 페이드로 나타나고 사라지게 하는 데 필요한 두 가지는?\n4) will-change를 스타일시트에 늘 걸어 두면 안 되는 이유는?",
      },
    ],
    sources: [
      { label: "MDN — transition", href: `${MDN}/Reference/Properties/transition` },
      { label: "MDN — transition-behavior", href: `${MDN}/Reference/Properties/transition-behavior` },
      { label: "MDN — animation", href: `${MDN}/Reference/Properties/animation` },
      { label: "MDN — animation-fill-mode", href: `${MDN}/Reference/Properties/animation-fill-mode` },
      { label: "MDN — will-change", href: `${MDN}/Reference/Properties/will-change` },
      { label: "MDN — Using CSS transitions", href: `${MDN}/Guides/Transitions/Using` },
    ],
  },
  {
    id: "css-prop-effect",
    name: "색과 효과 속성",
    tagline: "다 그린 요소 위에 덧씌우는 투명도, 필터, 색 설정",
    intro:
      "요소를 반쯤 비치게 하거나 흐리게 하려면 무엇을 쓸까요? 사진을 원 모양으로 자르거나 체크박스 색만 바꾸는 방법도 있을까요? 이 시트의 속성은 대부분 레이아웃을 건드리지 않습니다. 상자의 자리와 크기는 그대로 두고, 그려지는 모습만 바꿉니다. 그 대신 몇몇은 쌓임 맥락을 새로 만들어 z-index의 결과를 바꿉니다. 아홉 속성을 하나씩 보고, 어디서 자주 걸리는지 정리합니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "투명도와 필터, 섞기, 폼 컨트롤의 색, 잘라 내기를 맡는 속성입니다. accent-color, caret-color, color-scheme만 상속됩니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["opacity", "요소 전체의 불투명도", "1", "안 됨", "8장 · 위치 지정과 쌓임 맥락"],
              ["filter", "흐림, 색 바꿈 같은 그래픽 효과", "none", "안 됨", ""],
              ["backdrop-filter", "요소 뒤에 비치는 영역에 효과", "none", "안 됨", ""],
              ["mix-blend-mode", "뒤 내용과 색을 섞는 방식", "normal", "안 됨", "8장 · 위치 지정과 쌓임 맥락"],
              ["accent-color", "체크박스 같은 컨트롤의 강조색", "auto", "됨", ""],
              ["caret-color", "입력 캐럿의 색", "auto", "됨", ""],
              ["color-scheme", "그려도 되는 밝은, 어두운 색 구성", "normal", "됨", ""],
              ["clip-path", "보일 영역을 모양으로 자름", "none", "안 됨", ""],
              ["mask", "그림의 투명도나 밝기로 가림 (단축)", "풀어 쓴 속성마다", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "opacity",
        body: "요소의 불투명도를 정합니다. 0이면 완전히 투명하고 1이면 불투명합니다. 0.5처럼 수로 쓰거나 50%처럼 퍼센트로 씁니다. 범위를 벗어난 값도 틀리지는 않습니다. 다만 0과 1 사이로 잘립니다.\n\nopacity는 상속되지 않습니다. 그런데도 자식까지 통째로 비칩니다. 요소와 자식을 한 장의 그림으로 그린 뒤 그 그림을 비치게 하기 때문입니다. 자식에 opacity: 1을 줘도 부모보다 진해지지 않습니다. 배경만 비치게 하려면 rgb(0 0 0 / 40%)처럼 알파가 있는 배경색을 씁니다.\n\n주의할 점이 둘 있습니다.\n(1) 1이 아닌 값은 새 쌓임 맥락을 만듭니다. 안쪽 자식의 z-index는 이 맥락 밖으로 나가지 못합니다.\n(2) 0이어도 요소는 그대로 있습니다. 클릭을 받고 Tab 포커스도 받습니다. 숨기려면 visibility, display, hidden 속성을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["1", "모든 요소", "안 됨", "계산값 유형대로 (수)"]],
          },
          {
            caption: "opacity의 값",
            head: ["값", "하는 일"],
            rows: [
              ["0", "완전히 투명함. 보이지 않지만 자리와 이벤트는 그대로"],
              ["0과 1 사이 수, 또는 0%~100%", "반쯤 비침. 뒤의 내용이 보임"],
              ["1", "불투명함 (초기값)"],
            ],
          },
        ],
        terms: [
          {
            term: "쌓임 맥락 (stacking context)",
            body: "z-index로 앞뒤를 견주는 하나의 무리입니다. 맥락 안의 요소는 그 안에서만 순서를 다투고, 바깥에서는 맥락 전체가 한 덩어리로 견줍니다. 회사 안의 직급이 아무리 높아도 다른 회사 사람과는 회사끼리 견주는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: opacity가 만드는 쌓임 맥락",
        body: "카드 .card에 opacity: 0.6을 줬습니다. 카드 안의 .pop은 z-index: 10, 카드 바깥의 .note는 z-index: 1입니다. 두 상자는 일부가 겹칩니다.\n(1) 지금 값의 .pop opacity는 1입니다. opacity는 상속되지 않기 때문입니다. 그런데 화면의 .pop도 카드와 함께 비칩니다.\n(2) 겹친 자리의 맨 위 요소는 note입니다. .card가 쌓임 맥락을 만들어서, .pop의 z-index: 10은 카드 안에서만 통합니다.\n(3) .card의 opacity를 1로 고쳐 실행하세요. 쌓임 맥락이 사라지고 맨 위 요소가 pop으로 바뀝니다.",
        lab: {
          html: `<style>
  .wrap { position: relative; height: 130px; }
  .card { opacity: 0.6; width: 170px; height: 100px; background: #bfdbfe; }
  .pop { position: absolute; z-index: 10; left: 90px; top: 30px;
    width: 120px; height: 60px; background: #f59e0b; }
  .note { position: absolute; z-index: 1; left: 150px; top: 50px;
    width: 120px; height: 60px; background: #34d399; }
</style>
<div class="wrap">
  <div class="card">card<div class="pop">pop, z-index: 10</div></div>
  <div class="note">note, z-index: 1</div>
</div>`,
          height: 180,
          checks: [
            { label: ".card의 opacity", expr: "getComputedStyle(document.querySelector('.card')).opacity" },
            { label: ".pop의 opacity", expr: "getComputedStyle(document.querySelector('.pop')).opacity" },
            {
              label: "겹친 자리의 맨 위 요소",
              expr: "(() => { const r = document.querySelector('.wrap').getBoundingClientRect(); return document.elementFromPoint(r.left + 180, r.top + 70).className; })()",
            },
          ],
          tryIt: "opacity 대신 filter: blur(0px)나 clip-path: inset(0)을 .card에 줘 보세요. 이것들도 쌓임 맥락을 만들어 맨 위 요소가 note로 남습니다.",
        },
      },
      {
        label: "filter",
        body: "요소에 그래픽 효과를 줍니다. 값은 blur(), grayscale(), drop-shadow() 같은 효과 함수입니다. 공백으로 나눠 여러 개를 적습니다. 함수는 적은 순서대로 하나씩 적용됩니다. 그래서 순서를 바꾸면 결과가 달라질 수 있습니다. 퍼센트를 받는 함수는 0.34처럼 소수로도 적습니다.\n\n효과는 요소의 테두리, 배경, 자식까지 함께 받습니다. drop-shadow()는 box-shadow와 달리 그림의 윤곽을 따라 그림자를 그립니다. 투명한 PNG나 SVG 아이콘에 알맞습니다. 다만 inset과 퍼짐 값은 쓸 수 없습니다.\n\n주의: none이 아닌 filter는 opacity처럼 새 쌓임 맥락을 만듭니다. 또 position: fixed인 자손의 기준 상자가 됩니다. 그러면 그 자손은 화면이 아니라 이 요소에 붙습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소 (SVG는 defs를 뺀 컨테이너, 그래픽 요소)", "안 됨", "필터 함수 목록으로"]],
          },
          {
            caption: "filter의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "효과 없음 (초기값)"],
              ["blur(길이)", "가우스 흐림. 값이 클수록 더 흐림"],
              ["brightness(수)", "밝기 배수. 0은 검정, 1(100%)은 그대로"],
              ["contrast(수)", "대비. 0은 회색, 1은 그대로, 1보다 크면 강해짐"],
              ["drop-shadow(그림자)", "윤곽을 따르는 그림자"],
              ["grayscale(수)", "흑백. 1(100%)이면 완전히 흑백"],
              ["hue-rotate(각도)", "색상환을 따라 색을 돌림"],
              ["invert(수)", "색 반전. 1이면 완전히 반전"],
              ["opacity(수)", "투명도. 0은 투명, 1은 그대로"],
              ["saturate(수)", "채도. 0은 무채색, 1은 그대로"],
              ["sepia(수)", "갈색 옛 사진 톤. 1이면 완전히 세피아"],
              ["url(파일#id)", "SVG의 filter 요소를 씀"],
            ],
          },
        ],
        code: "img.old { filter: grayscale(100%) sepia(60%); }\n.logo   { filter: drop-shadow(2px 4px 6px rgb(0 0 0 / 50%)); }\n.dim    { filter: contrast(175%) brightness(103%); }",
        codeLang: "css",
      },
      {
        label: "backdrop-filter",
        body: "요소 뒤에 비치는 영역에 효과를 줍니다. 값은 filter와 같은 함수 목록입니다. 뒤가 흐리게 비치는 반투명 유리 패널을 만들 때 씁니다. Chrome 76, Safari 18, Firefox 103부터 지원합니다.\n\n효과를 보려면 요소나 그 배경이 투명하거나 반투명해야 합니다. 불투명한 배경이 뒤를 다 가리면 흐려진 뒤쪽이 보이지 않습니다.\n\n주의: 효과는 가장 가까운 배경 뿌리(backdrop root)까지만 닿습니다. 조상의 opacity가 1보다 작으면 그 조상이 배경 뿌리입니다. filter, mask, clip-path, mix-blend-mode가 있는 조상도 그렇습니다. 그러면 그 조상 바깥의 내용은 흐려지지 않습니다. 효과가 안 보일 때 가장 흔한 까닭입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소 (SVG는 filter와 같음)", "안 됨", "필터 함수 목록으로"]],
          },
          {
            caption: "backdrop-filter의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "뒤 영역에 효과 없음 (초기값)"],
              ["필터 함수 목록", "blur(), brightness() 같은 함수나 SVG 필터를 뒤 영역에 적용"],
            ],
          },
        ],
        code: ".glass {\n  background: rgb(255 255 255 / 30%);\n  backdrop-filter: blur(8px) saturate(150%);\n}",
        codeLang: "css",
        terms: [
          {
            term: "배경 뿌리 (backdrop root)",
            body: "backdrop-filter가 뒤를 어디까지 볼지 정하는 경계입니다. 문서의 뿌리 html이 기본이고, opacity나 filter가 있는 조상도 경계가 됩니다. 창문에 김 서림 필름을 붙여도 방 안의 커튼 너머는 흐리게 보이지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "mix-blend-mode",
        body: "요소의 내용을 뒤 배경(backdrop)과 어떻게 섞을지 정합니다. 여기서 배경은 같은 쌓임 맥락 안에서 요소 뒤에 그려진 것입니다. 그림 편집 프로그램의 레이어 혼합 모드와 같은 생각입니다.\n\n사진 위 글자를 difference로 올려 늘 대비가 보이게 할 때 씁니다. 로고를 multiply로 종이 질감에 녹일 때도 씁니다.\n\n주의: 섞임은 쌓임 맥락의 경계에서 멈춥니다. 부모에 isolation: isolate를 주면 부모 바깥과는 섞이지 않습니다. normal이 아닌 값은 그 요소에도 새 쌓임 맥락을 만듭니다. 배경 그림끼리 섞으려면 background-blend-mode를 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소", "안 됨", "안 됨"]],
          },
          {
            caption: "mix-blend-mode의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "섞지 않음 (초기값)"],
              ["multiply, darken, color-burn", "어둡게 섞음"],
              ["screen, lighten, color-dodge", "밝게 섞음"],
              ["overlay, soft-light, hard-light", "대비를 키우며 섞음"],
              ["difference, exclusion", "두 색의 차이로 섞음"],
              ["hue, saturation, color, luminosity", "색상, 채도, 밝기 중 일부만 가져옴"],
              ["plus-darker, plus-lighter", "두 색을 더하는 합성. plus-lighter는 교차 페이드에 알맞음"],
            ],
          },
        ],
        terms: [
          {
            term: "혼합 모드 (blend mode)",
            body: "위에 놓인 색과 아래 색을 계산해 새 색을 만드는 규칙입니다. multiply는 곱해서 어두워지고 screen은 반대로 밝아집니다. 셀로판지 두 장을 겹쳐 빛에 비추면 겹친 곳의 색이 바뀌는 것과 같습니다.",
          },
        ],
      },
      {
        label: "accent-color",
        body: "체크박스, 라디오 버튼, 범위 슬라이더(range), progress의 강조색을 정합니다. 브라우저가 그리는 컨트롤을 다시 만들지 않고 색만 바꿀 때 씁니다. 상속되므로 :root에 한 번 주면 페이지 전체의 컨트롤에 퍼집니다.\n\nauto는 브라우저가 고른 색입니다. 운영체제의 강조색을 따르기도 합니다. 브라우저는 읽기 좋게 대비를 맞춘 변형 색을 쓰기도 합니다.\n\n주의: 강조색은 그 색을 쓰는 상태에서만 보입니다. 체크박스라면 체크된 때입니다. 지문 수집을 막으려고 auto의 값을 고정해 돌려주는 브라우저도 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소", "됨", "계산값 유형대로 (색)"]],
          },
          {
            caption: "accent-color의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "브라우저가 고른 색. 플랫폼 강조색을 따르기도 함 (초기값)"],
              ["<color>", "그 색을 강조색으로 씀"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 체크박스의 accent-color",
        body: ":root에만 accent-color를 줬고, 둘째 체크박스 .plain은 auto로 되돌렸습니다.\n(1) 지금 값을 보세요. #a에도 :root의 색이 계산값으로 있습니다. accent-color는 상속되기 때문입니다. #b는 auto입니다.\n(2) 첫 체크박스를 눌러 체크를 풀어 보세요. 기록에 클릭과 change가 적히고 강조색이 사라집니다. 강조색은 체크된 상태에서만 쓰입니다.\n(3) range 슬라이더도 :root의 색을 상속받습니다. 지금 값에서 같은 색인지 보세요.",
        lab: {
          html: `<style>
  :root { accent-color: #e11d48; }
  .plain { accent-color: auto; }
  input[type="checkbox"] { width: 24px; height: 24px; vertical-align: middle; }
</style>
<label><input type="checkbox" id="a" checked> 상속받은 강조색</label><br>
<label><input type="checkbox" id="b" class="plain" checked> auto</label><br>
<input type="range" id="r">`,
          height: 160,
          checks: [
            { label: "#a의 accent-color", expr: "getComputedStyle(document.getElementById('a')).accentColor" },
            { label: "#b의 accent-color", expr: "getComputedStyle(document.getElementById('b')).accentColor" },
            { label: "#r의 accent-color", expr: "getComputedStyle(document.getElementById('r')).accentColor" },
            { label: "#a.checked", expr: "document.getElementById('a').checked" },
          ],
          tryIt: ":root의 색을 #16a34a 같은 다른 색으로 바꿔 실행해 보세요. #a와 range가 함께 바뀌고 #b는 그대로입니다.",
        },
      },
      {
        label: "caret-color",
        body: "글을 넣을 자리에서 깜박이는 세로 막대, 곧 입력 캐럿의 색을 정합니다. 글을 받는 요소에 포커스가 있을 때만 보입니다. input, textarea, contenteditable 요소가 그렇습니다. checkbox, radio, color 같은 input에는 캐럿이 없습니다.\n\nauto는 대개 currentColor, 곧 글자색입니다. transparent를 주면 캐럿이 보이지 않습니다.\n\n주의: 마우스 커서와는 다릅니다. 글 위에서 보이는 I 모양은 cursor 속성이 정합니다. 또 auto에서 다른 색으로 가는 트랜지션은 부드럽지 않습니다. 중간 지점에서 한 번에 바뀝니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "글자, 글을 입력받는 요소", "됨", "색으로"]],
          },
          {
            caption: "caret-color의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "대개 currentColor, 곧 글자색 (초기값)"],
              ["<color>", "그 색으로 그림. transparent면 안 보임"],
            ],
          },
        ],
      },
      {
        label: "color-scheme",
        body: "이 요소를 어떤 색 구성(밝은, 어두운)으로 그려도 괜찮은지 알립니다. 브라우저는 고른 구성에 맞춰 자기가 그리는 부분의 색을 바꿉니다. 캔버스 바탕, 스크롤바, 폼 컨트롤의 기본색, 맞춤법 밑줄 같은 것입니다. Canvas, FieldText 같은 시스템 색의 값도 따라 바뀝니다.\n\n페이지 전체에 쓰려면 :root에 color-scheme: light dark를 줍니다. 그러면 사용자가 어두운 모드를 쓸 때 브라우저가 그리는 부분도 어둡게 맞춥니다. 나머지 색은 직접 정합니다. prefers-color-scheme 미디어 쿼리나 light-dark() 함수를 씁니다.\n\n주의: color-scheme은 작성자가 정한 색을 바꾸지 않습니다. 브라우저가 기본으로 그리는 색만 바꿉니다. head에 <meta name=\"color-scheme\">도 둡니다. 그러면 첫 화면이 번쩍이는 일을 막습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소와 글자", "됨", "불연속"]],
          },
          {
            caption: "color-scheme의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "페이지의 색 구성 설정을 따름. 없으면 기본색 (초기값)"],
              ["light", "운영체제의 밝은 구성으로 그릴 수 있음"],
              ["dark", "운영체제의 어두운 구성으로 그릴 수 있음"],
              ["light dark", "둘 다 됨. 사용자 설정을 따름"],
              ["only", "브라우저가 구성을 바꿔 덮지 못하게 함 (only light 꼴)"],
            ],
          },
        ],
        code: ":root { color-scheme: light dark; }\n.box  { color: light-dark(#111, #eee); background: light-dark(#fff, #222); }\nheader { color-scheme: only light; }",
        codeLang: "css",
        terms: [
          {
            term: "시스템 색 (system color)",
            body: "이름으로 부르는 브라우저의 기본색입니다. Canvas, CanvasText, Field, FieldText 같은 것입니다. 실제 색은 그때의 색 구성에 따라 풀립니다. 극장의 '무대 조명'이 낮 공연과 밤 공연에서 다른 밝기로 켜지는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: color-scheme: dark인 폼 컨트롤",
        body: "작은 창의 :root는 color-scheme: light입니다. 아래 textarea에만 color-scheme: dark를 줬습니다. 두 textarea의 색은 모두 브라우저 기본 스타일이 정합니다.\n(1) 지금 값의 color와 background-color를 견주세요. #t2만 값이 다릅니다. 기본 스타일은 시스템 색 Field, FieldText를 씁니다. 이 색이 어두운 구성의 색으로 풀립니다.\n(2) .dark 규칙에 color: #e11d48을 더해 실행하세요. #t2의 color가 그 값이 됩니다. 작성자가 준 색은 color-scheme이 바꾸지 않습니다.",
        lab: {
          html: `<style>
  .dark { color-scheme: dark; }
</style>
<p><textarea id="t1" rows="2">color-scheme 상속 (light)</textarea></p>
<p><textarea id="t2" class="dark" rows="2">color-scheme: dark</textarea></p>`,
          height: 190,
          checks: [
            { label: "#t1 color", expr: "getComputedStyle(document.getElementById('t1')).color" },
            { label: "#t2 color", expr: "getComputedStyle(document.getElementById('t2')).color" },
            { label: "#t1 background-color", expr: "getComputedStyle(document.getElementById('t1')).backgroundColor" },
            { label: "#t2 background-color", expr: "getComputedStyle(document.getElementById('t2')).backgroundColor" },
            { label: "#t2 color-scheme", expr: "getComputedStyle(document.getElementById('t2')).colorScheme" },
          ],
          tryIt: "dark를 light dark로 바꿔 보세요. 운영체제가 어두운 모드일 때만 #t2가 어두워집니다.",
        },
      },
      {
        label: "clip-path",
        body: "요소에서 보일 영역을 모양으로 정합니다. 모양 밖은 그려지지 않습니다. 모양은 도형 함수로 정합니다. circle(), ellipse(), inset(), polygon(), path() 같은 것입니다. SVG의 clipPath 요소를 url()로 가리켜도 됩니다. 사진을 원이나 마름모로 자를 때 씁니다.\n\n도형의 기준 상자는 border-box, padding-box 같은 낱말로 고릅니다. 적지 않으면 border-box입니다. 상자 낱말만 적으면 그 상자의 가장자리대로 자릅니다. 이때 border-radius의 둥근 모서리도 따릅니다.\n\n주의: 잘린 부분이 안 보여도 레이아웃 크기는 그대로입니다. none이 아닌 값은 새 쌓임 맥락을 만듭니다. 도형 함수끼리는 트랜지션이 됩니다. polygon()이라면 꼭짓점 수가 같아야 합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소 (SVG는 filter와 같음)", "안 됨", "도형 함수면 됨, 아니면 안 됨"]],
          },
          {
            caption: "clip-path의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "자르지 않음 (초기값)"],
              ["inset()", "가장자리에서 안쪽으로 들인 사각형"],
              ["circle()", "반지름과 중심으로 원"],
              ["ellipse()", "두 반지름과 중심으로 타원"],
              ["polygon()", "꼭짓점 목록으로 다각형"],
              ["path()", "SVG 경로 문자열로 모양"],
              ["rect(), xywh()", "가장자리 거리, 또는 위치와 크기로 사각형"],
              ["shape()", "선, 곡선, 호 명령으로 모양"],
              ["상자 낱말", "border-box, padding-box 등. 기준 상자, 또는 그 가장자리로 자름"],
              ["url()", "SVG의 clipPath 요소를 씀"],
            ],
          },
        ],
        code: ".avatar { clip-path: circle(50%); }\n.badge  { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }\n.card   { clip-path: inset(0 round 12px); }",
        codeLang: "css",
      },
      {
        label: "mask",
        body: "그림(마스크)으로 요소의 일부나 전체를 가립니다. 단축 속성입니다. 풀어 쓰면 mask-image, mask-mode, mask-repeat, mask-position, mask-clip, mask-origin, mask-size, mask-composite입니다. Chrome 120, Safari 15.4, Firefox 53부터 지원합니다.\n\n알파 마스크에서는 마스크가 불투명한 곳만 요소가 보이고 투명한 곳은 가려집니다. 휘도(luminance) 마스크에서는 밝은 곳이 보이고 어두운 곳이 가려집니다. clip-path는 칼로 오리듯 경계가 딱 떨어집니다. mask는 그러데이션을 써서 서서히 사라지게 할 수 있습니다.\n\n주의: 위치 다음에 /를 두고 크기를 적습니다. 또 mask는 mask-border도 초기값으로 되돌립니다. 그래서 mask-border는 mask보다 뒤에 적습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["풀어 쓴 속성마다 (mask-image: none 등)", "모든 요소 (SVG는 filter와 같음)", "안 됨", "풀어 쓴 속성대로"]],
          },
          {
            caption: "mask의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "마스크 없음"],
              ["그림 (url(), 그러데이션)", "마스크로 쓸 그림 (mask-image)"],
              ["alpha, luminance, match-source", "투명도로 볼지 밝기로 볼지 (mask-mode)"],
              ["위치 / 크기", "마스크 그림의 자리와 크기 (mask-position / mask-size)"],
              ["repeat, no-repeat 등", "그림을 되풀이하는 방식 (mask-repeat)"],
              ["상자 낱말, no-clip", "기준 상자와 가릴 범위 (mask-origin, mask-clip)"],
              ["add, subtract, intersect, exclude", "여러 겹 마스크를 합치는 법 (mask-composite)"],
            ],
          },
        ],
        code: "/* 그림 모드 위치 / 크기 반복 */\n.icon { mask: url(\"star.svg\") alpha center / contain no-repeat; }\n.fade { mask: linear-gradient(to bottom, #000 60%, transparent); }",
        codeLang: "css",
        terms: [
          {
            term: "마스크 (mask)",
            body: "요소 위에 겹쳐 '어디를 보여 줄지'를 정하는 그림입니다. 불투명한 곳(또는 밝은 곳)으로만 요소가 비쳐 보입니다. 스프레이 페인트를 뿌릴 때 대는 구멍 뚫린 판, 스텐실과 같습니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "효과 속성은 보이는 모습만 바꾸는 듯해도 쌓임 맥락과 이벤트에 영향을 줍니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["부모에 opacity: 0.5, 자식에 opacity: 1", "자식도 똑같이 비침", "배경색에 알파를 쓰거나 자식을 부모 밖으로 뺌"],
              ["메뉴를 opacity: 0으로 숨김", "안 보이는데 클릭, Tab 포커스를 받음", "visibility: hidden, display: none, inert를 씀"],
              ["z-index를 크게 줬는데 위로 안 옴", "조상의 opacity, filter, clip-path가 쌓임 맥락을 만듦", "맥락을 만드는 조상을 찾아 그 z-index를 조정"],
              ["filter가 있는 부모 안의 position: fixed", "화면이 아니라 부모에 붙음", "filter를 다른 요소로 옮김"],
              ["backdrop-filter인데 흐림이 안 보임", "배경이 불투명하거나 조상이 배경 뿌리", "배경을 반투명하게, 조상의 opacity, filter 확인"],
              ["color-scheme: dark인데 글자색이 그대로", "작성자가 준 색은 바뀌지 않음", "light-dark()나 prefers-color-scheme로 색 지정"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 부모의 opacity가 0.5이고 자식의 opacity가 1이면, 자식은 얼마나 비쳐 보일까요?\n2) filter와 backdrop-filter는 각각 무엇에 효과를 주나요?\n3) 체크박스 색만 바꾸고 싶을 때 appearance: none 대신 쓸 속성은 무엇인가요?\n4) color-scheme: dark를 줘도 바뀌지 않는 색은 어떤 색인가요?",
      },
    ],
    sources: [
      { label: "MDN: opacity", href: `${MDN}/Reference/Properties/opacity` },
      { label: "MDN: filter", href: `${MDN}/Reference/Properties/filter` },
      { label: "MDN: backdrop-filter", href: `${MDN}/Reference/Properties/backdrop-filter` },
      { label: "MDN: accent-color", href: `${MDN}/Reference/Properties/accent-color` },
      { label: "MDN: color-scheme", href: `${MDN}/Reference/Properties/color-scheme` },
      { label: "MDN: clip-path", href: `${MDN}/Reference/Properties/clip-path` },
    ],
  },
  {
    id: "css-prop-list-table",
    name: "목록과 표 속성",
    tagline: "목록의 점과 번호, 표의 테두리와 칸 폭",
    intro:
      "ul과 ol 앞의 점이나 번호는 어디서 올까요? 제목마다 1, 2, 3을 붙이려면 HTML을 고쳐야 할까요? 표의 칸 사이 간격과 열 폭은 누가 정할까요? 이 시트는 list-style 묶음, CSS 카운터, 표 전용 속성 다섯을 봅니다. 표 속성은 대부분 table 요소에 주면 칸까지 상속됩니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "목록 속성은 display: list-item인 요소에 적용됩니다. 표 속성은 table, caption, 칸에 적용됩니다. 카운터 속성은 모든 요소에 씁니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["list-style", "목록 표시를 한 번에 (단축)", "disc outside none", "됨", ""],
              ["list-style-type", "표시의 모양, 번호 체계", "disc", "됨", ""],
              ["list-style-image", "표시로 쓸 그림", "none", "됨", ""],
              ["list-style-position", "표시를 상자 안에 둘지 밖에 둘지", "outside", "됨", ""],
              ["counter-reset", "카운터를 만들고 처음 값을 정함", "none", "안 됨", ""],
              ["counter-increment", "카운터를 늘리거나 줄임", "none", "안 됨", ""],
              ["border-collapse", "칸 테두리를 합칠지 나눌지", "separate", "됨", ""],
              ["border-spacing", "나뉜 칸 사이 거리", "0", "됨", ""],
              ["caption-side", "표 제목의 자리", "top", "됨", ""],
              ["empty-cells", "빈 칸의 테두리, 배경을 그릴지", "show", "됨", ""],
              ["table-layout", "열 폭을 정하는 방식", "auto", "안 됨", ""],
            ],
          },
        ],
      },
      {
        label: "list-style",
        body: "목록 항목의 표시(마커)를 한 번에 정합니다. 단축 속성입니다. 풀어 쓰면 list-style-type, list-style-position, list-style-image입니다. 순서 상관없이 하나에서 셋까지 적습니다. 빠진 것은 초기값이 됩니다.\n\n대상은 li처럼 display: list-item인 요소입니다. 상속되므로 보통 ul이나 ol에 줍니다. 다만 브라우저 기본 스타일이 ul, ol, menu에 list-style-type을 따로 줍니다. 그래서 바깥 목록의 type이 중첩 목록까지 내려가지 않습니다.\n\n주의: Safari는 list-style: none인 목록을 접근성 트리에서 목록으로 알리지 않습니다. nav 안의 목록은 예외입니다. 목록임을 알려야 하면 ul에 role=\"list\"를 더합니다. type과 그림을 함께 적으면 그림을 못 받을 때 type을 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["disc outside none", "목록 항목 (display: list-item)", "됨", "풀어 쓴 속성대로 (불연속)"]],
          },
          {
            caption: "list-style의 값",
            head: ["값", "하는 일"],
            rows: [
              ["type 값 (disc, decimal 등)", "표시 모양 (list-style-type)"],
              ["inside, outside", "표시의 자리 (list-style-position)"],
              ["그림 (url() 등)", "표시 그림 (list-style-image)"],
              ["none", "표시 없음"],
            ],
          },
        ],
        code: "/* type position image, 순서는 자유 */\nol.steps { list-style: decimal inside; }\nul.check { list-style: square outside url(\"check.svg\"); }\nnav ul   { list-style: none; }",
        codeLang: "css",
        terms: [
          {
            term: "마커 (marker)",
            body: "목록 항목 앞에 붙는 점이나 번호입니다. 브라우저가 ::marker라는 가상 요소로 그립니다. 공책의 줄마다 찍는 글머리표와 같습니다.",
          },
        ],
      },
      {
        label: "list-style-type",
        body: "표시의 모양을 정합니다. 점, 숫자, 로마 숫자, 알파벳, 여러 언어의 번호 체계가 있습니다. 한국어 번호로는 korean-hangul-formal이 있습니다. 일, 이, 삼처럼 셉니다.\n\n문자열도 됩니다. list-style-type: \"- \"처럼 적으면 그 글자가 표시가 됩니다. @counter-style로 만든 이름도 쓸 수 있습니다.\n\n주의: 일부 번호 체계는 그 글자를 가진 글꼴이 있어야 제대로 보입니다. cjk-ideographic은 옛 이름이고 trad-chinese-informal과 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["disc", "목록 항목", "됨", "불연속"]],
          },
          {
            caption: "list-style-type의 값 (일부)",
            head: ["값", "하는 일"],
            rows: [
              ["disc", "꽉 찬 원 (초기값)"],
              ["circle", "속이 빈 원"],
              ["square", "꽉 찬 네모"],
              ["decimal", "1부터 세는 숫자"],
              ["decimal-leading-zero", "01, 02처럼 0을 채운 숫자"],
              ["lower-roman, upper-roman", "로마 숫자 (i, I)"],
              ["lower-alpha, upper-alpha", "알파벳 (a, A)"],
              ["korean-hangul-formal", "한글 숫자 (일, 이, 삼)"],
              ["korean-hanja-formal, korean-hanja-informal", "한자 숫자"],
              ["disclosure-open, disclosure-closed", "details 같은 펼침 위젯의 열림, 닫힘 표시"],
              ["\"문자열\"", "그 글자를 표시로 씀"],
              ["none", "표시 없음"],
            ],
          },
        ],
      },
      {
        label: "list-style-image",
        body: "표시로 쓸 그림을 정합니다. url()이나 그러데이션 같은 <image> 값을 받습니다. none이면 list-style-type의 표시를 씁니다.\n\n그림을 못 받으면 list-style-type의 표시로 돌아갑니다. 그래서 둘을 함께 적어 두면 안전합니다. 보통은 단축 속성 list-style로 함께 적습니다.\n\n주의: 이 속성으로는 그림의 크기와 자리를 고를 수 없습니다. 그런 조정이 필요하면 list-style: none으로 두고 ::before로 그립니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "목록 항목", "됨", "불연속"]],
          },
          {
            caption: "list-style-image의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "그림 없음. list-style-type의 표시를 씀 (초기값)"],
              ["<image>", "url(), 그러데이션 등을 표시로 씀"],
            ],
          },
        ],
      },
      {
        label: "list-style-position",
        body: "표시를 항목의 주 상자 밖에 둘지 안에 둘지 정합니다. outside(초기값)는 표시가 내용 상자 밖에 걸립니다. 글이 둘째 줄로 넘어가도 첫 줄 글자와 나란히 시작합니다. inside는 표시가 내용의 첫 조각처럼 줄 안에 들어갑니다. 둘째 줄은 표시 밑에서 시작합니다.\n\ninside일 때 항목의 첫 자식이 블록이면, 그 블록은 표시 다음 줄에 놓입니다.\n\n주의: outside 표시는 ul의 왼쪽 padding 자리에 그려집니다. padding을 0으로 지우면 표시가 상자 밖으로 나가 잘려 보일 수 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["outside", "목록 항목", "됨", "불연속"]],
          },
          {
            caption: "list-style-position의 값",
            head: ["값", "하는 일"],
            rows: [
              ["inside", "표시가 항목 내용의 첫 조각이 됨"],
              ["outside", "표시가 주 블록 상자 밖에 놓임 (초기값)"],
            ],
          },
        ],
      },
      {
        label: "counter-reset",
        body: "이름 붙은 CSS 카운터를 만들고 처음 값을 정합니다. 수를 빼면 0에서 시작합니다. counter-reset: chapter section 4처럼 여러 개를 한 번에 만듭니다. reversed(이름)이면 거꾸로 세는 카운터가 됩니다. 이때 처음 값을 빼면 브라우저가 항목 수로 셉니다.\n\n카운터는 만든 요소와 그 뒤 형제, 그 자손에게 보입니다. 그래서 번호를 매길 항목들의 부모에 둡니다. ol에는 list-item이라는 내장 카운터가 이미 있습니다.\n\n주의: 이름과 달리 있는 카운터의 값을 바꾸는 속성이 아닙니다. 새 카운터를 만듭니다. 있는 카운터의 값만 바꾸려면 counter-set을 씁니다. none은 덜 구체적인 규칙의 counter-reset을 지울 때 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "계산값 유형대로 (정수)"]],
          },
          {
            caption: "counter-reset의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "카운터를 만들지 않음 (초기값)"],
              ["이름 정수?", "카운터를 만들고 처음 값을 줌. 빼면 0"],
              ["reversed(이름) 정수?", "거꾸로 세는 카운터. 빼면 항목 수로 정함"],
            ],
          },
        ],
        terms: [
          {
            term: "CSS 카운터",
            body: "CSS가 문서를 읽으며 세는 이름 붙은 수입니다. counter-reset으로 만들고, counter-increment로 늘리고, counter()로 화면에 씁니다. 행사장 입구의 계수기를 누를 때마다 숫자가 하나씩 올라가는 것과 같습니다.",
          },
        ],
      },
      {
        label: "counter-increment",
        body: "카운터 값을 늘리거나 줄입니다. 수를 빼면 1씩 늡니다. counter-increment: item -1처럼 음수면 줄어듭니다. 그 규칙에 맞는 요소가 하나 나올 때마다 한 번 적용됩니다.\n\n카운터 값은 content의 counter(이름)으로 화면에 씁니다. 둘째 인수에 list-style-type 값을 주면 모양이 바뀝니다. counter(이름, upper-roman)처럼 적습니다. counters(이름, \".\")는 중첩된 같은 이름의 카운터를 모두 이어 1.2.3처럼 씁니다.\n\n주의: none은 모든 카운터의 증가를 막습니다. 하나만 막으려면 그 이름에 0을 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "계산값 유형대로 (정수)"]],
          },
          {
            caption: "counter-increment의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "아무 카운터도 바꾸지 않음 (초기값)"],
              ["이름 정수?", "그 수만큼 더함. 빼면 1, 음수면 뺌"],
            ],
          },
        ],
        code: "article { counter-reset: sec; }\nh2 { counter-increment: sec; }\nh2::before { content: counter(sec) \". \"; }\nol.nested { counter-reset: item; list-style: none; }\nol.nested li { counter-increment: item; }\nol.nested li::before { content: counters(item, \".\") \" \"; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 카운터로 제목에 번호 붙이기",
        body: "article이 카운터 sec을 만듭니다. h3가 나올 때마다 1씩 늘고, h3::before가 그 값을 씁니다.\n(1) 화면의 제목에 1, 2, 3이 붙습니다. 지금 값의 counter-reset은 sec 0, counter-increment는 sec 1입니다. 수를 빼고 적어도 계산값에는 기본값이 채워집니다.\n(2) ::before의 content 계산값은 counter(sec) \". \" 그대로입니다. 몇 번째인지는 계산값이 아니라 그릴 때 정해집니다.\n(3) counter-reset을 sec 9로 고쳐 실행하세요. 번호가 10부터 시작합니다.",
        lab: {
          html: `<style>
  article { counter-reset: sec; }
  h3 { counter-increment: sec; margin: 4px 0; font-size: 16px; }
  h3::before { content: counter(sec) ". "; color: #2563eb; }
</style>
<article>
  <h3>설치</h3>
  <h3>설정</h3>
  <h3>배포</h3>
</article>`,
          height: 150,
          checks: [
            { label: "article의 counter-reset", expr: "getComputedStyle(document.querySelector('article')).counterReset" },
            { label: "h3의 counter-increment", expr: "getComputedStyle(document.querySelector('h3')).counterIncrement" },
            { label: "h3::before의 content", expr: "getComputedStyle(document.querySelector('h3'), '::before').content" },
          ],
          tryIt: "counter-reset: sec;을 article에서 h3 규칙으로 옮겨 보세요. 제목마다 카운터를 새로 만들어 번호가 모두 1이 됩니다.",
        },
      },
      {
        label: "border-collapse",
        body: "표 칸의 테두리를 나눌지(separate) 합칠지(collapse) 정합니다. separate가 초기값입니다. 이웃한 두 칸이 저마다 테두리를 그려 두 줄로 보입니다. 그 사이는 border-spacing만큼 벌어집니다. collapse는 이웃 칸이 테두리 하나를 함께 씁니다. 한 줄짜리 격자 표를 만들 때 씁니다.\n\ncollapse에서는 border-spacing과 empty-cells가 쓰이지 않습니다. 맞닿은 테두리가 서로 다르면 규칙에 따라 하나가 이깁니다. 대개 더 굵은 쪽입니다. border-style의 inset은 ridge처럼, outset은 groove처럼 그려집니다.\n\n주의: 상속되는 속성이지만 table과 inline-table에만 적용됩니다. 그래서 table에 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["separate", "table, inline-table 요소", "됨", "불연속"]],
          },
          {
            caption: "border-collapse의 값",
            head: ["값", "하는 일"],
            rows: [
              ["separate", "칸마다 테두리를 따로 그림 (초기값)"],
              ["collapse", "이웃 칸이 테두리를 함께 씀"],
            ],
          },
        ],
        terms: [
          {
            term: "나뉜 테두리 모델과 합친 테두리 모델",
            body: "표 테두리를 그리는 두 방식입니다. 나뉜 모델은 칸마다 제 테두리를 그리고 사이를 띄웁니다. 합친 모델은 칸 사이 선을 하나로 칩니다. 벽돌을 줄눈을 두고 쌓느냐, 한 판의 격자 틀을 쓰느냐의 차이입니다.",
          },
        ],
      },
      {
        label: "border-spacing",
        body: "나뉜 테두리 모델(border-collapse: separate)에서 이웃 칸 사이 거리를 정합니다. 값 하나면 가로, 세로가 같습니다. 둘이면 첫째가 가로(열 사이), 둘째가 세로(행 사이)입니다. 음수는 쓸 수 없습니다.\n\n이 간격은 표 가장자리와 바깥쪽 칸 사이에도 들어갑니다. 옛 HTML의 cellspacing 속성이 하던 일입니다.\n\n주의: 초기값은 0이지만 브라우저 기본 스타일이 table에 간격을 따로 줍니다. collapse에서는 계산값이 남아 있어도 쓰이지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["0", "table, inline-table 요소", "됨", "계산값 유형대로 (길이)"]],
          },
        ],
        code: "table.grid { border-collapse: separate; border-spacing: 4px 12px; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: border-collapse와 border-spacing",
        body: "표에 border-collapse: separate와 border-spacing: 8px을 줬습니다. 둘째 줄 가운데 칸은 비어 있습니다.\n(1) 지금은 칸 테두리가 저마다 그려지고 사이가 벌어집니다. 빈 칸도 테두리가 있습니다.\n(2) border-collapse를 collapse로 고쳐 실행하세요. 테두리가 한 줄로 합쳐지고 표 폭이 줄어듭니다. 그런데 border-spacing 계산값은 그대로입니다. 값은 남아 있어도 쓰이지 않습니다.\n(3) separate로 되돌리고 table에 empty-cells: hide를 더하세요. 빈 칸의 테두리가 사라집니다. 빈 칸에 &nbsp;를 넣으면 다시 그려집니다.",
        lab: {
          html: `<style>
  table { border-collapse: separate; border-spacing: 8px; border: 2px solid #2563eb; }
  td { border: 2px solid #f59e0b; padding: 4px 10px; }
</style>
<table id="t">
  <tr><td>가</td><td>나</td><td>다</td></tr>
  <tr><td>라</td><td></td><td>바</td></tr>
</table>`,
          height: 150,
          checks: [
            { label: "border-collapse", expr: "getComputedStyle(document.getElementById('t')).borderCollapse" },
            { label: "border-spacing", expr: "getComputedStyle(document.getElementById('t')).borderSpacing" },
            { label: "empty-cells (빈 칸)", expr: "getComputedStyle(document.querySelectorAll('td')[4]).emptyCells" },
            { label: "표 폭 (offsetWidth)", expr: "document.getElementById('t').offsetWidth" },
          ],
          tryIt: "border-spacing을 4px 16px로 바꿔 보세요. 열 사이와 행 사이 간격이 따로 바뀌고, 계산값에도 두 값이 보입니다.",
        },
      },
      {
        label: "caption-side",
        body: "표 제목(caption)을 표의 위에 둘지 아래에 둘지 정합니다. top이 초기값입니다. 정확히는 표의 블록 시작 쪽과 끝 쪽입니다. 가로쓰기에서는 위와 아래이고, 세로쓰기에서는 옆이 됩니다.\n\ncaption 요소에 줍니다. 상속되므로 table에 줘도 됩니다. 자리만 바뀌고, caption이 표의 이름이라는 점은 그대로입니다.\n\n주의: 명세에는 inline-start, inline-end 값도 있습니다. 하지만 지원하는 브라우저가 없습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["top", "표 제목(table-caption) 요소", "됨", "불연속"]],
          },
          {
            caption: "caption-side의 값",
            head: ["값", "하는 일"],
            rows: [
              ["top", "표의 블록 시작 쪽. 가로쓰기면 위 (초기값)"],
              ["bottom", "표의 블록 끝 쪽. 가로쓰기면 아래"],
            ],
          },
        ],
      },
      {
        label: "empty-cells",
        body: "보이는 내용이 없는 칸에 테두리와 배경을 그릴지 정합니다. show가 초기값이고 보통 칸처럼 그립니다. hide면 빈 칸의 테두리와 배경을 그리지 않습니다.\n\nborder-collapse가 separate일 때만 효과가 있습니다. collapse에서는 무시됩니다.\n\n주의: 접히는 공백만 있는 칸은 빈 칸으로 봅니다. &nbsp;처럼 접히지 않는 공백이 있으면 내용이 있는 칸입니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["show", "표 칸(table-cell) 요소", "됨", "불연속"]],
          },
          {
            caption: "empty-cells의 값",
            head: ["값", "하는 일"],
            rows: [
              ["show", "보통 칸처럼 테두리, 배경을 그림 (초기값)"],
              ["hide", "빈 칸의 테두리, 배경을 그리지 않음"],
            ],
          },
        ],
      },
      {
        label: "table-layout",
        body: "표의 열 폭을 정하는 방식을 고릅니다. auto(초기값)는 모든 칸의 내용을 다 읽고 내용에 맞춰 열 폭을 정합니다. 글이 긴 열이 넓어집니다.\n\nfixed는 칸 내용을 보지 않습니다. 열 폭을 이렇게 정합니다.\n1. width가 있는 col 요소의 폭\n2. 없으면 첫 행 칸의 width\n3. 둘 다 없으면 남은 폭을 나눠 가짐\n첫 행만 읽으면 그릴 수 있어서 큰 표가 빨리 나타납니다. 열 폭이 내용에 따라 흔들리지 않는 것도 장점입니다.\n\n주의: fixed는 표의 width가 정해져 있어야 통합니다. width가 auto면 브라우저는 auto 방식을 씁니다. fixed에서 칸보다 긴 내용은 넘칩니다. overflow, text-overflow로 다룹니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "table, inline-table 요소", "안 됨", "불연속"]],
          },
          {
            caption: "table-layout의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "모든 칸의 내용에 맞춰 열 폭을 정함 (초기값)"],
              ["fixed", "표 폭, col, 첫 행의 폭만으로 열 폭을 정함"],
            ],
          },
        ],
        terms: [
          {
            term: "표 레이아웃 알고리즘",
            body: "브라우저가 열 폭을 계산하는 절차입니다. auto는 모든 칸을 다 재 보고 정하고, fixed는 정해 둔 폭으로 바로 나눕니다. 손님 키를 다 재고 맞춤 옷을 짓느냐, 정해진 치수의 기성복을 내놓느냐의 차이입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: table-layout fixed와 auto",
        body: "두 표는 폭이 300px로 같고, 내용도 같습니다. table-layout만 다릅니다.\n(1) 지금 값의 칸 폭을 견주세요. auto 표는 글이 긴 둘째 칸이 넓습니다. fixed 표는 내용을 보지 않고 남은 폭을 나눠 두 칸 폭이 같습니다.\n(2) fixed 표의 첫 td에 style=\"width: 60px\"을 넣고 실행하세요. 첫 행의 폭을 따르므로 첫 칸이 좁아지고 둘째 칸이 나머지를 가집니다.\n(3) table 규칙의 width: 300px을 지우고 실행하세요. 폭이 auto라 fixed가 통하지 않고, 두 표의 칸 폭이 같아집니다.",
        lab: {
          html: `<style>
  table { width: 300px; border-collapse: collapse; margin-bottom: 8px; }
  td { border: 1px solid #888; padding: 2px 4px; }
  #a { table-layout: auto; }
  #f { table-layout: fixed; }
</style>
<table id="a"><tr><td>짧음</td><td>내용이 길면 auto 표는 이 열을 넓힙니다</td></tr></table>
<table id="f"><tr><td>짧음</td><td>내용이 길면 auto 표는 이 열을 넓힙니다</td></tr></table>`,
          height: 160,
          checks: [
            { label: "#a (auto) 칸 폭", expr: "[...document.querySelectorAll('#a td')].map((c) => Math.round(c.getBoundingClientRect().width)).join(', ')" },
            { label: "#f (fixed) 칸 폭", expr: "[...document.querySelectorAll('#f td')].map((c) => Math.round(c.getBoundingClientRect().width)).join(', ')" },
            { label: "#f의 table-layout", expr: "getComputedStyle(document.getElementById('f')).tableLayout" },
            { label: "표 폭 (#a, #f)", expr: "document.getElementById('a').offsetWidth + ', ' + document.getElementById('f').offsetWidth" },
          ],
          tryIt: "두 표의 둘째 칸 글을 공백 없는 긴 영어 낱말로 바꿔 보세요. auto 표는 300px을 넘겨 낱말을 담고, fixed 표는 폭을 지켜 글이 넘칩니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "목록 표시와 카운터, 표 속성에서 자주 생기는 일입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["nav 밖 목록에 list-style: none", "Safari가 목록으로 알리지 않음", "ul에 role=\"list\"를 더함"],
              ["ul의 padding을 0으로 지움", "outside 표시가 상자 밖으로 나가 잘림", "padding을 남기거나 list-style-position: inside"],
              ["h2마다 counter-reset을 줌", "모든 제목의 번호가 1", "counter-reset은 부모(article 등)에 둠"],
              ["collapse 표에 border-spacing", "간격이 생기지 않음", "separate로 두거나 칸의 padding으로 띄움"],
              ["width 없는 표에 table-layout: fixed", "fixed가 통하지 않음", "표에 width를 줌"],
              ["fixed 표에 긴 낱말", "칸 밖으로 넘침", "overflow: hidden과 text-overflow, 또는 overflow-wrap"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) ul에 준 list-style-type이 중첩된 ul에는 왜 내려가지 않나요?\n2) 제목 번호를 매길 때 counter-reset을 h2가 아니라 부모에 두는 까닭은 무엇인가요?\n3) border-collapse: collapse에서 쓰이지 않는 두 속성은 무엇인가요?\n4) table-layout: fixed가 열 폭을 정할 때 보는 것 세 가지는 무엇인가요?",
      },
    ],
    sources: [
      { label: "MDN: list-style", href: `${MDN}/Reference/Properties/list-style` },
      { label: "MDN: list-style-type", href: `${MDN}/Reference/Properties/list-style-type` },
      { label: "MDN: counter-reset", href: `${MDN}/Reference/Properties/counter-reset` },
      { label: "MDN: counter()", href: `${MDN}/Reference/Values/counter` },
      { label: "MDN: border-collapse", href: `${MDN}/Reference/Properties/border-collapse` },
      { label: "MDN: table-layout", href: `${MDN}/Reference/Properties/table-layout` },
    ],
  },
  {
    id: "css-prop-ui",
    name: "UI와 그 밖의 속성",
    tagline: "커서와 클릭, 선택, 폼 모양, 크기 조절, 그림 맞추기, 생성 내용",
    intro:
      "마우스를 올렸을 때의 커서 모양도 CSS가 정합니다. 클릭이 어느 요소에 닿을지, 글을 고를 수 있을지도 그렇습니다. 상자 크기를 끌어서 바꾸게 할지, 사진을 칸에 어떻게 맞출지도 정합니다. 이 시트는 사용자 조작에 관한 속성과, 다른 묶음에 넣기 애매한 속성을 모았습니다. 마지막의 all은 거의 모든 속성을 한 번에 되돌립니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "앞쪽 여섯은 사용자 조작, 가운데 셋은 대체 요소와 폼 크기, 뒤쪽 셋은 생성 내용과 초기화입니다.",
        tables: [
          {
            head: ["속성", "하는 일", "초기값", "상속", "자세히"],
            rows: [
              ["cursor", "마우스 커서 모양", "auto", "됨", ""],
              ["pointer-events", "포인터 이벤트의 대상이 될지", "auto", "됨", ""],
              ["user-select", "글을 고를 수 있을지", "auto", "안 됨", ""],
              ["appearance", "컨트롤을 운영체제 모양으로 그릴지", "none", "안 됨", ""],
              ["resize", "사용자가 크기를 끌어 바꿀 수 있을지", "none", "안 됨", "9장 · 오버플로와 크기"],
              ["touch-action", "터치 이동, 확대를 브라우저가 처리할지", "auto", "안 됨", ""],
              ["field-sizing", "폼 컨트롤이 내용에 맞춰 커질지", "fixed", "안 됨", ""],
              ["object-fit", "그림을 상자에 맞추는 방식", "fill", "안 됨", ""],
              ["object-position", "상자 안 그림의 자리", "50% 50%", "안 됨", ""],
              ["content", "가상 요소에 넣을 생성 내용", "normal", "안 됨", ""],
              ["quotes", "따옴표 글자", "브라우저가 정함", "됨", ""],
              ["all", "거의 모든 속성을 한 번에 되돌림", "없음", "안 됨", "2장 · 캐스케이드와 상속"],
            ],
          },
        ],
      },
      {
        label: "cursor",
        body: "요소 위에 마우스가 있을 때 보일 커서를 정합니다. 값은 pointer, text, not-allowed, grab 같은 낱말입니다. 링크가 아닌데 누를 수 있는 요소에 pointer를 주는 일이 흔합니다.\n\n그림 커서는 url()로 적습니다. 그 뒤에 쉼표를 두고 낱말 하나를 꼭 적습니다. 브라우저는 앞의 그림부터 차례로 시도하고, 모두 못 쓰면 끝의 낱말을 씁니다. url() 다음의 두 수는 커서가 가리키는 점(핫스폿)의 좌표입니다.\n\n주의: 브라우저는 너무 큰 커서 그림을 무시하곤 합니다. MDN은 32×32 이하를 권합니다. iPadOS에서는 text 말고는 커서 모양이 바뀌지 않습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "cursor의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "상황에 맞게 브라우저가 고름. 글 위면 text (초기값)"],
              ["default", "운영체제 기본 커서. 대개 화살표"],
              ["none", "커서를 그리지 않음"],
              ["pointer", "링크를 뜻하는 손가락"],
              ["text, vertical-text", "글을 고를 수 있음"],
              ["wait, progress", "바쁨. progress는 그래도 조작할 수 있음"],
              ["help, context-menu", "도움말이나 메뉴가 있음"],
              ["not-allowed, no-drop", "할 수 없음, 여기에 놓을 수 없음"],
              ["move, grab, grabbing", "옮김, 잡을 수 있음, 잡는 중"],
              ["crosshair, cell", "십자, 표 칸 고르기"],
              ["copy, alias", "복사함, 바로 가기를 만듦"],
              ["n-resize, ew-resize, col-resize 등", "그 방향으로 크기를 바꿈"],
              ["zoom-in, zoom-out, all-scroll", "확대, 축소, 모든 방향 스크롤"],
              ["url() x y, 낱말", "그림 커서. 끝의 낱말은 대체 값"],
            ],
          },
        ],
        code: ".card[role=\"button\"] { cursor: pointer; }\n.map { cursor: url(\"hand.svg\") 4 2, grab; }\nbutton:disabled { cursor: not-allowed; }",
        codeLang: "css",
      },
      {
        label: "pointer-events",
        body: "요소가 포인터 이벤트(마우스, 펜, 터치)의 대상이 될지 정합니다. HTML에서 쓰는 값은 auto와 none입니다. 나머지 값은 SVG용입니다.\n\nnone이면 요소가 대상에서 빠지고 이벤트가 그 아래 요소로 뚫고 내려갑니다. 장식용 겹침 층이나 툴팁 아래의 버튼을 누를 수 있게 할 때 씁니다. 상속되므로 자식도 함께 빠집니다. 자식에 auto를 주면 그 자식만 다시 받습니다. 그 이벤트는 거품처럼 올라가 부모의 리스너에도 닿습니다.\n\n주의: 포인터만 막습니다. Tab으로는 여전히 포커스가 가고 키보드로 누를 수 있습니다. 비활성 버튼은 disabled 속성으로 만듭니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "pointer-events의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "평소처럼 대상이 됨 (초기값)"],
              ["none", "대상이 되지 않음. 아래 요소가 받음"],
              ["visiblePainted, fill, stroke 등", "SVG용. 칠, 선, visibility에 따라 받음"],
            ],
          },
        ],
        terms: [
          {
            term: "히트 테스트 (hit testing)",
            body: "포인터가 놓인 점에서 맨 위 요소를 찾는 일입니다. 클릭은 그렇게 찾은 요소로 가고, pointer-events: none인 요소는 검색에서 빠집니다. 겹친 투명 필름에 도장을 찍을 때, 구멍 뚫린 장은 건너뛰고 아래 장에 찍히는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 덮개 아래 버튼 누르기",
        body: "버튼 위에 반투명한 파란 덮개 .cover가 덮여 있습니다. 덮개에는 pointer-events: none을 줬습니다.\n(1) 지금 값에서 버튼 가운데의 맨 위 요소가 button입니다. 덮개가 히트 테스트에서 빠졌기 때문입니다. 버튼을 눌러 보세요. 기록에 버튼 클릭과 출력 줄이 적힙니다.\n(2) pointer-events를 auto로 고쳐 실행하세요. 맨 위 요소가 div.cover로 바뀝니다. 이제 버튼을 눌러도 클릭이 적히지 않습니다.\n(3) auto인 채로 Tab을 눌러 버튼에 포커스를 옮기고 Enter를 누르세요. 키보드로는 여전히 눌립니다.",
        lab: {
          html: `<style>
  .box { position: relative; display: inline-block; padding: 8px; }
  .cover { position: absolute; inset: 0; background: rgb(37 99 235 / 30%);
    pointer-events: none; }
</style>
<div class="box">
  <button type="button" onclick="console.log('버튼이 눌렸습니다')">아래의 버튼</button>
  <div class="cover"></div>
</div>`,
          height: 140,
          logFocus: true,
          checks: [
            { label: ".cover의 pointer-events", expr: "getComputedStyle(document.querySelector('.cover')).pointerEvents" },
            {
              label: "버튼 가운데의 맨 위 요소",
              expr: "(() => { const r = document.querySelector('button').getBoundingClientRect(); const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return el ? el.localName + (el.className ? '.' + el.className : '') : null; })()",
            },
          ],
          tryIt: ".box에 pointer-events: none을, button에 pointer-events: auto를 주고 덮개 줄은 지워 보세요. 상속을 끊은 버튼만 다시 클릭을 받습니다.",
        },
      },
      {
        label: "user-select",
        body: "사용자가 글을 고를(선택할) 수 있는지 정합니다. none이면 끌어도 고를 수 없습니다. 버튼 글자나 끌어서 옮기는 손잡이처럼 고를 일이 없는 곳에 씁니다. all이면 일부만 끌어도 요소 전체가 한꺼번에 골라집니다. 복사할 코드나 주소를 담은 상자에 알맞습니다.\n\nauto는 부모를 따릅니다. 부모가 none이면 none, all이면 all, 그 밖에는 text로 쓰입니다. ::before, ::after에서는 none입니다. 그래서 명세상 상속되지 않는데도 상속되는 것처럼 보입니다.\n\n주의: 본문 글에 none을 주면 복사와 검색이 막혀 불편합니다. Safari를 위해 -webkit-user-select를 함께 적는 예가 많습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "모든 요소", "안 됨", "불연속"]],
          },
          {
            caption: "user-select의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "부모를 따름. 대개 text (초기값)"],
              ["text", "글을 고를 수 있음"],
              ["none", "이 요소와 자손의 글을 고를 수 없음"],
              ["all", "요소 전체를 한꺼번에 고름"],
            ],
          },
        ],
      },
      {
        label: "appearance",
        body: "폼 컨트롤(위젯)을 운영체제 고유의 모양으로 그릴지 정합니다. 브라우저 기본 스타일이 버튼, 체크박스, select 같은 컨트롤에 auto를 줍니다. 그래서 정의상 초기값은 none이지만 컨트롤의 계산값은 대개 auto입니다.\n\nnone을 주면 고유 모양을 걷어 내고 CSS로 꾸밀 수 있는 기본 모양만 남깁니다. 기능은 그대로입니다. 체크박스는 여전히 체크되고, 연결된 label을 눌러도 바뀝니다.\n\n주의: none을 준 체크박스와 라디오는 아예 안 보이기도 합니다. 크기, 테두리, :checked 모양을 직접 그려야 합니다. 색만 바꾸려면 accent-color가 더 간단합니다. button, checkbox 같은 옛 값은 모두 auto와 같습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "모든 요소", "안 됨", "불연속"]],
          },
          {
            caption: "appearance의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "고유 모양을 걷어 낸 기본 모양. CSS로 꾸밈"],
              ["auto", "운영체제 고유 모양. 위젯이 아니면 none처럼 동작"],
              ["base-select", "select와 그 목록을 CSS로 모두 꾸밈"],
              ["textfield, menulist-button", "일부 input, select에서 auto 비슷한 특별 모양"],
              ["button, checkbox 등 옛 값", "auto와 같음. auto를 씀"],
            ],
          },
        ],
        code: "input[type=\"checkbox\"].custom {\n  appearance: none;\n  width: 1.2em; height: 1.2em;\n  border: 2px solid currentColor; border-radius: 4px;\n}\ninput[type=\"checkbox\"].custom:checked { background: #2563eb; }",
        codeLang: "css",
        terms: [
          {
            term: "위젯과 고유 모양",
            body: "위젯은 체크박스, select처럼 브라우저가 그려 주는 조작 부품입니다. 고유 모양은 운영체제마다 다른 그 부품의 기본 생김새입니다. 같은 문이라도 집마다 손잡이 모양이 다른 것과 같습니다.",
          },
        ],
      },
      {
        label: "resize",
        body: "사용자가 요소의 크기를 끌어서 바꿀 수 있는지, 어느 방향으로인지 정합니다. 요소 모서리에 손잡이가 생깁니다. textarea는 브라우저 기본 스타일 덕에 처음부터 손잡이가 있습니다. 끄려면 resize: none을 줍니다.\n\nresize는 overflow가 visible이나 clip이 아닌 요소에만 통합니다. div에 resize: both만 적으면 아무 일도 없습니다. overflow: auto나 hidden을 함께 줘야 합니다. 인라인 요소에도 통하지 않습니다.\n\n주의: 끌어서 바꾸는 크기도 min-width, max-width 같은 크기 제한을 따릅니다. 레이아웃을 망가뜨릴 만한 크기를 막으려면 이 값들을 함께 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["none", "overflow가 visible이 아닌 요소 (그림, 동영상, iframe도 될 수 있음)", "안 됨", "불연속"]],
          },
          {
            caption: "resize의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "손잡이 없음 (초기값)"],
              ["both", "가로, 세로 모두 바꿈"],
              ["horizontal", "가로로만 바꿈"],
              ["vertical", "세로로만 바꿈"],
              ["block", "블록 방향으로만 (쓰기 모드에 따라 가로나 세로)"],
              ["inline", "인라인 방향으로만 (쓰기 모드에 따라 가로나 세로)"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: resize에는 overflow가 필요하다",
        body: "상자에 resize: both를 줬지만 overflow는 visible입니다.\n(1) 지금 값의 resize는 both인데 모서리에 손잡이가 없습니다. 계산값은 남아도 이 상자가 적용 대상이 아니기 때문입니다.\n(2) overflow를 auto로 고쳐 실행하세요. 오른쪽 아래에 손잡이가 생깁니다. 끌면 지금 값의 상자 크기가 바뀝니다.\n(3) resize를 vertical로 바꾸면 세로로만 끌립니다.",
        lab: {
          html: `<style>
  .note { resize: both; overflow: visible;
    width: 180px; height: 60px; padding: 6px; border: 2px solid #2563eb; }
</style>
<div class="note">오른쪽 아래 모서리를 끌어 보세요.</div>`,
          height: 200,
          checks: [
            { label: "resize 계산값", expr: "getComputedStyle(document.querySelector('.note')).resize" },
            { label: "overflow 계산값", expr: "getComputedStyle(document.querySelector('.note')).overflow" },
            { label: "상자 크기 (offsetWidth × offsetHeight)", expr: "document.querySelector('.note').offsetWidth + ' × ' + document.querySelector('.note').offsetHeight" },
          ],
          tryIt: "overflow: auto인 채로 min-width: 120px; max-width: 260px을 더해 보세요. 끌어도 그 범위 밖으로는 늘거나 줄지 않습니다.",
        },
      },
      {
        label: "touch-action",
        body: "터치 화면에서 이 영역의 손가락 동작을 브라우저가 처리할지 정합니다. 브라우저가 처리하는 동작은 이런 것입니다. 끌어서 스크롤하기(pan), 두 손가락 확대(pinch-zoom), 두 번 눌러 확대입니다. 지도, 그림판, 슬라이더처럼 스크립트가 손가락 움직임을 직접 받을 곳에서 브라우저의 동작을 끕니다.\n\nmanipulation은 스크롤과 확대만 남기고 두 번 눌러 확대 같은 나머지 동작을 끕니다. 그러면 브라우저가 두 번째 누름을 기다리지 않아 click이 늦지 않습니다. pan-x, pan-y는 한 방향 스크롤만 허락합니다.\n\n주의: none은 확대까지 막습니다. 저시력 사용자가 글을 키워 읽지 못하게 됩니다. 꼭 필요한 영역에만 씁니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["auto", "비대체 인라인, 표의 행, 행 그룹, 열, 열 그룹을 뺀 모든 요소", "안 됨", "안 됨"]],
          },
          {
            caption: "touch-action의 값",
            head: ["값", "하는 일"],
            rows: [
              ["auto", "모든 이동, 확대를 브라우저가 처리 (초기값)"],
              ["none", "모든 이동, 확대를 끔"],
              ["pan-x, pan-y", "한 손가락 가로 스크롤, 세로 스크롤만"],
              ["pan-left, pan-right, pan-up, pan-down", "그 방향으로 시작하는 스크롤만"],
              ["pinch-zoom", "여러 손가락 이동과 확대. pan 값과 함께 씀"],
              ["manipulation", "스크롤과 확대만. 두 번 눌러 확대 등은 끔"],
            ],
          },
        ],
      },
      {
        label: "field-sizing",
        body: "폼 컨트롤이 내용에 맞춰 크기를 바꿀지 정합니다. fixed(초기값)는 정해진 기본 크기를 씁니다. content면 input과 textarea가 글을 칠수록 늘고 지우면 줄어듭니다. select는 고른 항목의 폭에 맞춥니다.\n\ncontent에서는 input의 size, textarea의 rows, cols 속성이 효과가 없습니다. 기본 크기를 정하는 값이기 때문입니다. 빈 input은 캐럿 폭만큼만 남습니다. placeholder가 있으면 그 글이 보일 만큼입니다.\n\n주의: width, height를 고정하면 다시 고정 크기가 됩니다. min-width, max-width로 범위만 정합니다. MDN은 실험 기능으로 표시합니다. Chrome 123, Safari 26.2, Firefox 152부터 지원합니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["fixed", "기본 선호 크기가 있는 요소 (폼 컨트롤)", "안 됨", "불연속"]],
          },
          {
            caption: "field-sizing의 값",
            head: ["값", "하는 일"],
            rows: [
              ["content", "내용에 맞춰 크기를 바꿈"],
              ["fixed", "정해진 기본 크기를 씀 (초기값)"],
            ],
          },
        ],
        code: "textarea, input[type=\"text\"] {\n  field-sizing: content;\n  min-width: 8em;\n  max-width: 100%;\n}",
        codeLang: "css",
      },
      {
        label: "object-fit",
        body: "img, video 같은 대체 요소의 내용(그림)을 요소 상자에 어떻게 맞출지 정합니다. 상자 크기는 width, height가 정합니다. object-fit은 그 상자 안에 그림을 그리는 방식만 바꿉니다.\n\n가장 흔한 쓰임은 cover입니다. 썸네일 칸을 정사각형으로 고정하고 사진을 비율대로 꽉 채웁니다. 넘치는 부분은 잘립니다. contain은 그림 전체가 보이게 줄이고 남는 곳은 비워 둡니다.\n\n주의: fill(초기값)은 비율을 무시하고 늘립니다. 그래서 상자와 그림의 비율이 다르면 찌그러집니다. iframe, embed에는 효과가 없습니다. 잘릴 자리는 object-position으로 고릅니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["fill", "대체 요소", "안 됨", "불연속"]],
          },
          {
            caption: "object-fit의 값",
            head: ["값", "하는 일"],
            rows: [
              ["fill", "상자를 꽉 채우게 늘림. 비율 무시 (초기값)"],
              ["contain", "비율을 지키며 전체가 보이게. 남는 곳은 빔"],
              ["cover", "비율을 지키며 상자를 꽉 채움. 넘치면 잘림"],
              ["none", "그림 크기를 바꾸지 않음"],
              ["scale-down", "none과 contain 중 더 작게 그려지는 쪽"],
            ],
          },
        ],
        terms: [
          {
            term: "대체 요소 (replaced element)",
            body: "내용을 CSS가 아니라 바깥 자원이 정하는 요소입니다. img, video가 대표입니다. 요소는 액자 틀이고 그림은 따로 끼워 넣는 셈입니다. object-fit은 액자에 사진을 끼우는 방식을 고릅니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 정사각형 칸 안의 object-fit",
        body: "가로로 긴 사진 photo-400.svg를 정사각형 img 상자에 넣었습니다.\n(1) 지금 값의 상자 크기는 정사각형이고, 그림 원래 크기는 가로로 깁니다. cover라서 사진이 비율을 지키며 칸을 꽉 채우고 좌우가 잘립니다.\n(2) contain으로 바꿔 실행하세요. 사진 전체가 보이고 위아래에 회색 배경이 드러납니다. fill이면 찌그러지고, none이면 원래 크기로 가운데만 보입니다.\n(3) 어느 값이든 상자 크기는 그대로입니다. object-fit은 상자가 아니라 상자 안의 그림을 바꿉니다.",
        lab: {
          html: `<style>
  img { width: 140px; height: 140px; object-fit: cover;
    border: 2px solid #2563eb; background: #e5e7eb; }
</style>
<img src="photo-400.svg" alt="예시 사진" id="p">`,
          height: 190,
          checks: [
            { label: "object-fit 계산값", expr: "getComputedStyle(document.getElementById('p')).objectFit" },
            { label: "img 상자 크기 (offsetWidth × offsetHeight)", expr: "document.getElementById('p').offsetWidth + ' × ' + document.getElementById('p').offsetHeight" },
            { label: "그림 원래 크기 (naturalWidth × naturalHeight)", expr: "document.getElementById('p').naturalWidth + ' × ' + document.getElementById('p').naturalHeight" },
          ],
          tryIt: "cover인 채로 object-position: left center를 더해 보세요. 사진의 왼쪽이 남도록 잘리는 자리가 바뀝니다.",
        },
      },
      {
        label: "object-position",
        body: "대체 요소 상자 안에서 그림을 어디에 놓을지 정합니다. background-position과 같은 <position> 값을 씁니다. 초기값 50% 50%는 가운데입니다. right top, 20px 10px, 25% 75%처럼 적습니다.\n\nobject-fit: cover로 잘릴 때 어느 부분을 남길지 고릅니다. contain이나 none일 때는 그림을 어디에 붙일지 고릅니다. 상자에서 그림이 덮지 않은 곳에는 요소의 배경이 보입니다.\n\n주의: 값에 따라 그림을 상자 밖으로 밀어낼 수도 있습니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["50% 50%", "대체 요소", "안 됨", "반복 가능한 목록으로"]],
          },
        ],
        code: ".thumb { width: 160px; height: 160px; object-fit: cover; object-position: 50% 20%; }\n.logo  { object-fit: none; object-position: right top; }",
        codeLang: "css",
      },
      {
        label: "content",
        body: "::before, ::after 같은 가상 요소에 넣을 내용을 정합니다. 값은 문자열, 그림, counter(), attr(), 따옴표 낱말입니다. 공백으로 이어 여러 개를 적습니다. ::before, ::after는 content가 none이 아니어야 생깁니다. 초기값 normal도 여기서는 none으로 계산됩니다. 그래서 빈 장식 상자라도 content: \"\"를 적습니다.\n\n일반 요소에 그림 하나를 주면 요소의 내용을 그 그림으로 바꿉니다. 슬래시 뒤에는 화면 낭독기가 읽을 대체 글을 적습니다. content: url(\"icon.svg\") / \"경고\"처럼 적습니다.\n\n주의: 생성된 내용은 DOM에 없습니다. 고를 수도 없고, 보조 기술이 읽지 않을 수도 있습니다. 뜻이 있는 글은 HTML에 둡니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["normal", "모든 요소, 트리를 따르는 가상 요소, 페이지 여백 상자", "안 됨", "불연속"]],
          },
          {
            caption: "content의 값",
            head: ["값", "하는 일"],
            rows: [
              ["normal", "::before, ::after에서는 none. ::marker 등은 기본 내용 (초기값)"],
              ["none", "가상 요소를 만들지 않음"],
              ["\"문자열\"", "그 글자를 넣음. 여러 개면 이어 붙임"],
              ["그림 (url(), 그러데이션)", "그림을 넣음"],
              ["counter(), counters()", "카운터 값을 글자로"],
              ["attr(이름)", "원래 요소의 속성 값을 글자로"],
              ["open-quote, close-quote", "quotes의 여는, 닫는 따옴표"],
              ["no-open-quote, no-close-quote", "따옴표 없이 중첩 단계만 바꿈"],
              ["/ 대체 글", "화면 낭독기가 읽을 대체 글"],
            ],
          },
        ],
        code: "a[href^=\"http\"]::after { content: \" ↗\" / \"\"; }\nabbr[title]::after { content: \" (\" attr(title) \")\"; }\n.badge::before { content: \"\"; display: inline-block; width: 8px; height: 8px; }",
        codeLang: "css",
        terms: [
          {
            term: "생성 내용 (generated content)",
            body: "HTML에는 없는데 CSS가 화면에 만들어 넣는 내용입니다. ::before, ::after의 content가 대표입니다. 책 본문에는 없고 인쇄소가 찍어 넣은 쪽 번호와 같습니다.",
          },
        ],
      },
      {
        label: "quotes",
        body: "q 요소와 content의 open-quote, close-quote가 넣는 따옴표 글자를 정합니다. 여는 것과 닫는 것을 한 쌍씩 적습니다. 첫 쌍은 바깥 인용에, 둘째 쌍은 그 안의 인용에 쓰입니다. 쌍이 모자라면 마지막 쌍을 되풀이합니다.\n\nauto는 상속받은 언어(lang)에 맞는 따옴표를 씁니다. none이면 따옴표가 나오지 않습니다.\n\n주의: 어느 쌍을 쓸지는 깊이로 정합니다. 깊이는 앞에서부터 센 여는 따옴표 수에서 닫는 따옴표 수를 뺀 값입니다. no-open-quote는 글자를 넣지 않지만 깊이는 올립니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["브라우저가 정함", "모든 요소", "됨", "불연속"]],
          },
          {
            caption: "quotes의 값",
            head: ["값", "하는 일"],
            rows: [
              ["none", "open-quote, close-quote가 따옴표를 넣지 않음"],
              ["auto", "상속받은 언어에 맞는 따옴표"],
              ["\"여는\" \"닫는\" 쌍들", "단계마다 쓸 따옴표 글자"],
            ],
          },
        ],
        code: "q { quotes: \"“\" \"”\" \"‘\" \"’\"; }\nblockquote p::before { content: open-quote; }\nblockquote p::after  { content: close-quote; }",
        codeLang: "css",
      },
      {
        label: "all",
        body: "거의 모든 속성을 한 번에 같은 전역 낱말로 정합니다. unicode-bidi, direction, 커스텀 속성만 빠집니다. 단축 속성입니다. 값은 initial, inherit, unset, revert, revert-layer 중 하나만 씁니다.\n\n바깥 스타일이 새어 들지 않게 위젯을 깨끗이 시작할 때 씁니다. all: revert는 작성자 스타일을 걷어 브라우저 기본 스타일로 돌립니다. all: unset은 상속되는 속성은 부모 값, 그렇지 않은 속성은 초기값으로 만듭니다.\n\n주의: all: initial은 브라우저 기본 스타일까지 지웁니다. display의 초기값은 inline이라 div도 인라인이 됩니다. 버튼에 all: unset을 쓰면 포커스 윤곽까지 사라집니다. :focus-visible 모양을 다시 줍니다.",
        tables: [
          {
            caption: "정의",
            head: ["초기값", "적용 대상", "상속", "애니메이션"],
            rows: [["실질적인 초기값 없음", "모든 요소", "안 됨", "각 속성대로"]],
          },
          {
            caption: "all의 값",
            head: ["값", "하는 일"],
            rows: [
              ["initial", "모든 속성을 초기값으로"],
              ["inherit", "모든 속성을 부모 값으로"],
              ["unset", "상속 속성은 부모 값, 나머지는 초기값으로"],
              ["revert", "작성자 스타일을 걷어 사용자, 브라우저 기본 스타일로"],
              ["revert-layer", "앞 캐스케이드 레이어의 값으로. 없으면 revert처럼"],
            ],
          },
        ],
        code: ".widget { all: revert; }\nbutton.plain { all: unset; cursor: pointer; }\nbutton.plain:focus-visible { outline: 2px solid #2563eb; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: all: initial과 all: revert",
        body: "같은 div에 all: initial과 all: revert를 각각 줬습니다. 버튼에도 all: initial을 줬습니다.\n(1) 지금 값의 display를 보세요. div.a는 inline, div.b는 block입니다. initial은 display의 초기값 inline으로 갑니다. revert는 브라우저 기본 스타일의 block으로 갑니다.\n(2) font-family도 다릅니다. div.a는 상속까지 끊겨 글꼴 초기값이 됩니다. div.b는 body의 system-ui를 이어받습니다.\n(3) button.a는 appearance가 none이 되어 버튼 모양이 사라집니다. 그래도 눌러 보면 기록에 버튼 클릭이 적힙니다.",
        lab: {
          html: `<style>
  .a { all: initial; }
  .b { all: revert; }
</style>
<div class="a">div.a (all: initial)</div>
<div class="b">div.b (all: revert)</div>
<button type="button" class="a">button.a</button>`,
          height: 150,
          checks: [
            { label: "div.a display", expr: "getComputedStyle(document.querySelector('div.a')).display" },
            { label: "div.b display", expr: "getComputedStyle(document.querySelector('div.b')).display" },
            { label: "div.a font-family", expr: "getComputedStyle(document.querySelector('div.a')).fontFamily" },
            { label: "div.b font-family", expr: "getComputedStyle(document.querySelector('div.b')).fontFamily" },
            { label: "button.a appearance", expr: "getComputedStyle(document.querySelector('button.a')).appearance" },
          ],
          tryIt: ".a를 all: unset으로 바꿔 보세요. font-family처럼 상속되는 속성은 body 값을 이어받고, display는 여전히 inline입니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "사용자 조작 속성은 화면만 보고는 원인을 찾기 어렵습니다. 지금 값으로 계산값을 확인합니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["덮개에 pointer-events: none", "마우스는 통과하지만 Tab, 키보드는 그대로", "막으려면 disabled나 inert를 씀"],
              ["div에 resize: both만 줌", "손잡이가 생기지 않음", "overflow: auto 등을 함께 줌"],
              ["체크박스에 appearance: none", "체크박스가 안 보임", "크기, 테두리, :checked를 직접 그리거나 accent-color"],
              ["썸네일 img에 width, height만 줌", "사진이 찌그러짐", "object-fit: cover를 줌"],
              ["::before에 content 없이 스타일만", "가상 요소가 생기지 않음", "content: \"\"를 적음"],
              ["버튼에 all: unset", "포커스 윤곽까지 사라짐", ":focus-visible에 outline을 다시 줌"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) pointer-events: none인 덮개 아래의 버튼을 마우스로 누르면 어느 요소가 클릭을 받나요?\n2) div에 resize: both를 줬는데 손잡이가 없다면 무엇을 더해야 하나요?\n3) object-fit: cover와 contain은 무엇이 다른가요?\n4) all: initial을 준 div가 인라인이 되는 까닭은 무엇인가요?",
      },
    ],
    sources: [
      { label: "MDN: cursor", href: `${MDN}/Reference/Properties/cursor` },
      { label: "MDN: pointer-events", href: `${MDN}/Reference/Properties/pointer-events` },
      { label: "MDN: resize", href: `${MDN}/Reference/Properties/resize` },
      { label: "MDN: object-fit", href: `${MDN}/Reference/Properties/object-fit` },
      { label: "MDN: content", href: `${MDN}/Reference/Properties/content` },
      { label: "MDN: all", href: `${MDN}/Reference/Properties/all` },
    ],
  },
  {
    id: "css-vals",
    name: "값과 단위 참고서",
    tagline: "적은 값이 계산값이 되고, 계산값이 실제 px가 된다",
    intro:
      "속성 뒤에 적는 값의 종류를 다섯 장으로 모았습니다. 어디에나 쓰는 전역 키워드, 길이와 단위, 크기 키워드와 수학 함수, 색, 그리고 var() 같은 함수입니다. 값은 적은 그대로 쓰이지 않습니다. em은 px가 되고, calc()는 계산되고, 퍼센트는 레이아웃이 끝나야 정해집니다. 직접 해 보기의 지금 값은 그 바뀐 결과를 보여 줍니다. 값이 정해지는 단계는 CSS 허브 4장에 있습니다.",
    blocks: [
      {
        label: "다섯 장",
        body: "값은 쓰는 곳이 정해져 있습니다. 전역 키워드는 모든 속성에, 길이는 크기와 여백에, 색은 색 속성에 씁니다. 함수는 다른 값을 만들어 내는 값입니다.",
        tables: [
          {
            head: ["장", "값", "개념 장"],
            rows: [
              ["전역 키워드와 !important", "initial, inherit, unset, revert, revert-layer, !important", "2장 · 캐스케이드와 상속"],
              ["길이와 단위", "px, em, rem, %, vw, dvh, cqi, ch, deg, s 등", "4장 · 값과 단위"],
              ["크기 키워드와 수학 함수", "min-content, max-content, fit-content, calc(), clamp() 등", "9장, 11장"],
              ["색 값", "이름, #hex, rgb(), hsl(), oklch(), color-mix(), light-dark() 등", ""],
              ["변수와 그 밖의 함수", "var(), env(), attr(), url(), counter(), 그라디언트", "11장 · 커스텀 속성과 함수"],
            ],
          },
        ],
      },
      {
        label: "값이 정해지는 단계",
        body: "적은 값은 세 단계를 거쳐 화면의 px가 됩니다.\n(1) 계산값: 상대 단위를 되도록 절대 단위로 바꾼 값입니다. 2em은 부모 글자 크기를 보고 px가 됩니다.\n(2) 사용값: 레이아웃이 끝나야 아는 값입니다. width: 50%나 auto는 이때 px가 됩니다.\n(3) 실제값: 화면 픽셀에 맞춰 반올림한 값입니다.\ngetComputedStyle은 속성에 따라 계산값이나 사용값을 돌려줍니다. width는 사용값(px)을, color는 계산값(rgb)을 돌려줍니다.",
        terms: [
          {
            term: "계산값과 사용값",
            body: "계산값은 다른 요소를 보지 않고 정할 수 있는 만큼 정한 값입니다. 사용값은 레이아웃까지 끝나야 정해지는 값입니다. 요리법의 '두 숟가락'(계산값)과 실제로 그릇에 담긴 양(사용값)의 차이입니다.",
          },
          {
            term: "상대 단위",
            body: "다른 값을 기준으로 크기가 정해지는 단위입니다. em은 글자 크기, rem은 뿌리 요소의 글자 크기, %는 속성마다 정해진 기준, vw는 창 폭, cqi는 컨테이너 폭을 봅니다. 기준이 바뀌면 값도 따라 바뀝니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 같은 50%, 다른 기준",
        body: "같은 50%라도 속성마다 기준이 다릅니다. width의 50%는 부모 내용 폭의 절반입니다. padding-top의 50%도 부모의 '폭'이 기준입니다. 위아래 여백인데 높이가 아니라 폭을 봅니다. font-size의 50%는 부모 글자 크기의 절반입니다. 폭 버튼으로 작은 창 폭을 바꿔 보세요. width와 padding-top은 따라 바뀌고, font-size는 그대로입니다.",
        lab: {
          html: `<style>
  .parent { width: 80%; font-size: 20px; border: 1px dashed #999; }
  .child { width: 50%; padding-top: 50%; font-size: 50%; background: #dbeafe; }
</style>
<div class="parent"><div class="child">50%</div></div>`,
          height: 260,
          widths: [320, 480, 640],
          checks: [
            {
              label: "child의 width, padding-top, font-size",
              expr: "(() => { const s = getComputedStyle(document.querySelector('.child')); return [s.width, s.paddingTop, s.fontSize].join(', '); })()",
            },
            { label: "parent 내용 폭", expr: "document.querySelector('.parent').clientWidth + 'px'" },
          ],
        },
        terms: [
          {
            term: "퍼센트의 기준",
            body: "퍼센트는 속성마다 기준이 따로 정해져 있습니다. width, padding, margin은 포함 블록의 폭, height는 포함 블록의 높이, font-size는 부모의 글자 크기, line-height는 자기 글자 크기입니다. 같은 '절반'이라도 무엇의 절반인지가 다릅니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "값 문제는 대부분 '무엇을 기준으로 계산됐나'를 헷갈려서 생깁니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["height: 50%가 안 먹는다", "부모 높이가 auto라 기준이 없다", "부모에 높이를 주거나 다른 단위(vh, flex)"],
              ["em이 겹겹이 커진다", "em은 부모 글자 크기 기준이라 중첩되면 곱해진다", "rem을 쓴다"],
              ["휴대폰에서 100vh가 화면보다 길다", "주소창을 뺀 높이가 아니다", "dvh나 svh를 쓴다"],
              ["calc(100%-10px)가 무시된다", "- 앞뒤에 빈칸이 없어 문법 오류", "calc(100% - 10px)"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) padding-top: 50%의 기준은 부모의 폭인가요, 높이인가요?\n2) getComputedStyle(el).width는 계산값과 사용값 중 무엇인가요?\n3) em과 rem의 기준은 각각 무엇인가요?\n4) calc() 안의 빼기 기호 앞뒤에 빈칸이 필요한 이유는?",
      },
    ],
    sources: [
      { label: "MDN — CSS values and units", href: `${MDN}/Guides/Values_and_units` },
      { label: "MDN — Computed value", href: `${MDN}/Guides/Cascade/Property_value_processing` },
      { label: "W3C — CSS Values and Units Level 4", href: "https://www.w3.org/TR/css-values-4/" },
    ],
  },

  {
    id: "css-val-keyword",
    name: "전역 키워드와 !important",
    tagline: "어느 속성에나 통하는 되돌리기 낱말과 우선 표시",
    intro:
      "CSS의 모든 속성은 제 값 말고도 다섯 낱말을 받습니다. initial, inherit, unset, revert, revert-layer입니다. 이것을 전역 키워드(CSS-wide keyword)라고 합니다. 앞의 셋은 속성의 정의(초기값, 상속 여부)로 값을 정합니다. 뒤의 둘은 캐스케이드의 앞 단계로 값을 되돌립니다. !important는 값이 아니라 선언에 붙는 표시입니다. 붙이면 출처와 레이어의 순서가 뒤집힙니다. 색 키워드 currentcolor도 여기서 함께 봅니다. 캐스케이드의 전체 그림은 2장에 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "전역 키워드 다섯은 모든 속성과 단축 속성 all에 쓸 수 있습니다. 마지막 두 줄은 전역 키워드가 아니지만, 함께 헷갈리기 쉬워 같이 둡니다.",
        tables: [
          {
            head: ["값", "뜻", "쓰는 곳", "자세히"],
            rows: [
              ["initial", "속성 정의의 초기값", "모든 속성, all", "2장 · 캐스케이드와 상속"],
              ["inherit", "부모의 계산값", "모든 속성, all", "2장 · 캐스케이드와 상속"],
              ["unset", "상속 속성이면 inherit, 아니면 initial", "모든 속성, all", "2장 · 캐스케이드와 상속"],
              ["revert", "이 출처의 선언을 없던 것으로 한 값\n(대개 브라우저 기본 스타일)", "모든 속성, all", "2장 · 캐스케이드와 상속"],
              ["revert-layer", "이 레이어의 선언을 없던 것으로 한 값", "모든 속성, all", "14장 · 중첩, 레이어, 스코프"],
              ["!important", "선언을 중요 선언으로 표시", "선언의 값 뒤", "2장 · 캐스케이드와 상속"],
              ["currentcolor", "이 요소의 color 값", "<color>를 받는 곳", ""],
            ],
          },
        ],
      },
      {
        label: "initial",
        body: "속성마다 명세가 정한 초기값을 적용합니다. 초기값은 MDN 속성 페이지의 정의 표에 있습니다. display는 inline, color는 CanvasText, border-color는 currentcolor입니다.\n\n계산되는 때: 캐스케이드가 끝나 지정값을 정할 때 바로 초기값으로 바뀝니다. 그다음은 보통 값과 같습니다.\n\n주의할 점이 둘 있습니다.\n(1) 초기값은 브라우저 기본 스타일이 아닙니다. div에 display: initial을 주면 block이 아니라 inline이 됩니다.\n(2) 상속 속성에 쓰면 부모를 따르지 않습니다. 결과가 뜻밖일 수 있어서, MDN은 inherit, unset, revert를 먼저 생각하라고 권합니다.\n\nall: initial은 모든 속성을 한 번에 초기값으로 돌립니다. direction, unicode-bidi, 커스텀 속성만 빠집니다.",
        code: "p  { color: red; font-size: 2rem; }\nem { color: initial; font-size: initial; }   /* CanvasText, medium */\ndiv.box { display: initial; }                /* block이 아니라 inline */\n.reset { all: initial; }                     /* direction, unicode-bidi 빼고 모두 */",
        codeLang: "css",
        terms: [
          {
            term: "초기값 (initial value)",
            body: "명세가 속성마다 정해 둔 기본값입니다. 선언도 상속도 없을 때 쓰입니다. 브라우저 기본 스타일과는 다른 것입니다. 공장에서 막 나온 기계의 설정값과 같습니다.",
          },
        ],
      },
      {
        label: "inherit",
        body: "부모 요소의 계산값을 그대로 가져옵니다. 상속 속성에서는 원래 그렇게 동작하므로, 다른 규칙을 이겨야 할 때만 필요합니다. border, padding처럼 상속되지 않는 속성도 inherit를 쓰면 부모 값을 받습니다.\n\n계산되는 때: 부모의 '계산값'을 받습니다. 부모가 font-size: 1.5em이면 자식은 그 px 크기를 받습니다. 1.5em을 한 번 더 곱하지 않습니다.\n\n주의: 상속은 늘 문서 트리의 부모에게서 옵니다. 포함 블록이 다른 요소여도 그렇습니다. all: inherit는 display까지 물려받아서, 인라인 요소가 블록이 될 수 있습니다.",
        code: "main { color: blue; }\nh2 { color: green; }\nsection h2 { color: inherit; }                 /* section 안의 h2만 부모 색 */\na { color: inherit; text-decoration: inherit; }",
        codeLang: "css",
        terms: [
          {
            term: "상속 속성 (inherited property)",
            body: "선언이 없으면 부모의 값을 저절로 물려받는 속성입니다. color, font, line-height가 그렇습니다. border, padding, width는 물려받지 않습니다. 집안 말투는 닮아도 옷 치수는 물려받지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "unset",
        body: "상속 속성이면 inherit처럼, 아니면 initial처럼 동작합니다. 속성마다 따지지 않고 '선언이 없던 것처럼' 만들 때 씁니다. all: unset이 대표적인 쓰임입니다.\n\n계산되는 때: 지정값 단계에서 inherit나 initial 중 하나로 바뀝니다.\n\n주의: 브라우저 기본 스타일까지 지우는 점이 revert와 다릅니다. button에 all: unset을 주면 테두리, 배경, 패딩이 사라지고 display도 inline이 됩니다. 포커스 표시도 사라지므로 :focus-visible에 다시 만들어 줍니다.",
        code: ".bar p { color: unset; }           /* color는 상속 속성 → 부모 색 */\n.bar p { border-color: unset; }    /* 상속 안 됨 → 초기값 currentcolor */\nbutton.plain { all: unset; }       /* 기본 모양까지 모두 지움 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: initial, inherit, unset 견주기",
        body: "부모 div는 color가 rebeccapurple, 테두리가 teal입니다. 세 p는 모두 .kid에서 crimson 글자와 orange 테두리를 받습니다. 그다음 각자 키워드로 color와 border-color를 덮습니다. 지금 값을 보세요.\n(1) a(inherit)는 글자도 테두리도 부모 값입니다. border-color는 상속 속성이 아니지만 inherit가 강제로 가져옵니다.\n(2) b(initial)는 글자가 color의 초기값 CanvasText입니다. 작은 창은 밝은 색 구성이라 검정입니다. 테두리는 초기값 currentcolor라서 자기 글자색을 따라 검정입니다.\n(3) c(unset)는 두 속성이 갈립니다. color는 상속 속성이라 부모의 보라입니다. border-color는 상속되지 않아 초기값 currentcolor, 곧 자기 글자색인 보라입니다.",
        lab: {
          html: `<style>
  .parent { color: rebeccapurple; border: 4px solid teal; padding: 4px 10px; }
  .kid { color: crimson; border: 2px solid orange; margin: 6px 0; padding: 0 6px; }
  .a { color: inherit; border-color: inherit; }
  .b { color: initial; border-color: initial; }
  .c { color: unset; border-color: unset; }
</style>
<div class="parent">
  <p class="kid a">a: inherit</p>
  <p class="kid b">b: initial</p>
  <p class="kid c">c: unset</p>
</div>`,
          height: 200,
          checks: [
            { label: "a의 color", expr: "getComputedStyle(document.querySelector('.a')).color" },
            { label: "a의 border-top-color", expr: "getComputedStyle(document.querySelector('.a')).borderTopColor" },
            { label: "b의 color", expr: "getComputedStyle(document.querySelector('.b')).color" },
            { label: "b의 border-top-color", expr: "getComputedStyle(document.querySelector('.b')).borderTopColor" },
            { label: "c의 color", expr: "getComputedStyle(document.querySelector('.c')).color" },
            { label: "c의 border-top-color", expr: "getComputedStyle(document.querySelector('.c')).borderTopColor" },
          ],
          tryIt: "부모 div의 color를 navy로 바꿔 보세요. a와 c의 글자색, c의 테두리가 함께 바뀌고 b는 그대로입니다.",
        },
      },
      {
        label: "revert",
        body: "지금 출처(origin)가 이 요소에 준 선언을 없던 것으로 하고 값을 다시 정합니다. 사이트의 CSS(작성자 출처)에서 쓰면 사용자 스타일로 돌아갑니다. 사용자 스타일이 없으면 브라우저 기본 스타일로 갑니다. 거기에도 없으면 상속 속성은 부모 값, 아니면 초기값입니다.\n\n계산되는 때: 캐스케이드 단계입니다. revert도 결국 하나의 값이라, 특이성이 더 높은 선언에 질 수 있습니다.\n\n주의: unset과 결과가 같을 때가 많습니다. 다른 것은 브라우저 기본 스타일이 있는 속성입니다. h3의 font-weight를 revert하면 굵게(기본 스타일), unset하면 부모를 따라 보통 굵기입니다. div의 display를 revert하면 block이고, initial이나 unset이면 inline입니다. 자식에게 직접 준 규칙은 건드리지 않습니다. 부모의 color를 revert해도 p에 준 color: red는 그대로입니다.",
        code: "h3   { font-weight: normal; color: blue; }\nh3.a { font-weight: revert; }    /* bold (브라우저 기본) */\nh3.b { font-weight: unset; }     /* 부모를 따라 normal */\n.widget * { all: revert; }       /* 브라우저 기본 모양으로 */",
        codeLang: "css",
        terms: [
          {
            term: "스타일 출처 (style origin)",
            body: "선언이 어디서 왔는지를 가리킵니다. 브라우저 기본(user-agent), 사용자, 작성자 셋이 있습니다. 사이트가 쓴 CSS가 작성자 출처입니다. 같은 동네에도 나라의 법, 아파트 규칙, 집안 규칙이 따로 있는 것과 같습니다.",
          },
        ],
      },
      {
        label: "revert-layer",
        body: "캐스케이드 레이어 안에서 쓰면 이 레이어의 선언을 없던 것으로 합니다. 그리고 앞 레이어에서 이 요소에 맞는 규칙의 값으로 돌아갑니다. 앞 레이어에도 맞는 규칙이 없으면 이전 출처(브라우저 기본 등)로 갑니다.\n\n레이어 밖에서 쓰면 revert와 비슷합니다. 다만 MDN에 따르면 HTML 속성이 주는 표현 힌트(img의 width 속성 같은 것)는 되돌리지 않습니다.\n\n계산되는 때: 캐스케이드 단계입니다.\n\n주의: 레이어의 순서는 @layer로 이름을 처음 적은 순서입니다. 순서를 바꾸면 '앞 레이어'도 바뀝니다. 레이어 자체는 14장에서 다룹니다.",
        code: "@layer base, special;\n@layer base    { .item { color: blue; } .feature { color: green; } }\n@layer special { .item { color: red; }  .feature { color: revert-layer; } }\n/* .item.feature → green (base 레이어의 .feature로 돌아감) */",
        codeLang: "css",
        terms: [
          {
            term: "캐스케이드 레이어 (cascade layer)",
            body: "@layer로 나눈 선언의 묶음입니다. 레이어끼리는 특이성보다 레이어 순서를 먼저 봅니다. 보통 선언은 뒤 레이어가 이깁니다. 투명 필름을 겹쳐 놓으면 위에 놓은 필름의 그림이 아래를 덮는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: revert와 revert-layer",
        body: "위 세 div는 display에 initial, unset, revert를 줍니다. 아래 두 p는 레이어 base와 theme 사이에서 color를 다툽니다.\n(1) d1(initial)과 d2(unset)는 지금 값이 inline입니다. 그래서 한 줄에 나란히 놓입니다. display의 초기값이 inline이고, display는 상속되지 않기 때문입니다.\n(2) d3(revert)만 block입니다. 브라우저 기본 스타일의 div { display: block }으로 돌아가서입니다.\n(3) .x는 뒤 레이어 theme의 red가 이겨 빨강입니다. .x.rl은 theme 안에서 revert-layer를 받아, 앞 레이어 base의 green으로 돌아갑니다.",
        lab: {
          html: `<style>
  @layer base, theme;
  @layer base { .x { color: green; } }
  @layer theme { .x { color: red; } .x.rl { color: revert-layer; } }
  .d1, .d2, .d3 { background: #fef3c7; outline: 1px solid #d97706; }
  .d1 { display: initial; }
  .d2 { display: unset; }
  .d3 { display: revert; }
</style>
<div class="d1">d1: initial</div>
<div class="d2">d2: unset</div>
<div class="d3">d3: revert</div>
<p class="x">.x</p>
<p class="x rl">.x.rl</p>`,
          height: 220,
          checks: [
            { label: "d1의 display", expr: "getComputedStyle(document.querySelector('.d1')).display" },
            { label: "d2의 display", expr: "getComputedStyle(document.querySelector('.d2')).display" },
            { label: "d3의 display", expr: "getComputedStyle(document.querySelector('.d3')).display" },
            { label: ".x의 color", expr: "getComputedStyle(document.querySelector('.x')).color" },
            { label: ".x.rl의 color", expr: "getComputedStyle(document.querySelector('.rl')).color" },
          ],
          tryIt: "첫 줄을 @layer theme, base;로 바꿔 보세요. 이제 base가 뒤 레이어라 두 p가 모두 green입니다. theme의 revert-layer는 아예 지는 선언이 됩니다.",
        },
      },
      {
        label: "!important",
        body: "선언의 값 뒤에 !important를 붙이면 중요 선언이 됩니다. 붙이지 않은 선언은 보통 선언입니다. !와 important 사이에 공백을 넣어도 되지만 보통 붙여 씁니다. !important는 선언의 마지막 토큰이어야 하고, 뒤에는 공백과 주석만 올 수 있습니다.\n\n중요 선언은 캐스케이드에서 출처와 레이어의 순서를 뒤집습니다. 아래 표에 정리했습니다. 같은 출처와 레이어 안에서는 중요 선언이 특이성과 상관없이 보통 선언을 이깁니다. 중요 선언끼리는 특이성, 그다음 순서로 가립니다.\n\n주의할 점입니다.\n(1) 단축 속성에 붙이면 풀어 쓴 속성이 모두 중요 선언이 됩니다.\n(2) @keyframes 안에서는 쓸 수 없습니다.\n(3) 커스텀 속성에 붙이면 그 대입만 중요해집니다. var()로 넘어가는 값에는 !important가 따라가지 않습니다.\n(4) 특이성 싸움을 !important로 끝내지 않습니다. MDN은 남의 CSS를 앞 레이어에 넣는 방법을 권합니다.\n\n접근성: 사용자 스타일의 중요 선언은 작성자의 중요 선언을 이깁니다. 사이트가 !important를 써도 큰 글자 같은 사용자 설정을 막지 못합니다.",
        tables: [
          {
            caption: "중요 선언이 뒤집는 순서",
            head: ["견주는 것", "보통 선언에서 이기는 쪽", "중요 선언에서 이기는 쪽"],
            rows: [
              ["출처", "작성자 > 사용자 > 브라우저 기본", "브라우저 기본 > 사용자 > 작성자"],
              ["레이어", "레이어 밖 > 뒤 레이어 > 앞 레이어", "앞 레이어 > 뒤 레이어 > 레이어 밖"],
              ["인라인 style", "다른 보통 선언을 모두 이김", "작성자의 다른 중요 선언을 모두 이김"],
              ["애니메이션", "애니메이션이 보통 선언을 이김", "중요 선언이 애니메이션을 이김\n(트랜지션 중인 값은 중요 선언도 이김)"],
            ],
          },
        ],
        code: "@import url(\"vendor.css\") layer(vendor);         /* 남의 CSS는 앞 레이어로 */\np { color: red !important; }\n#main .note p:hover { color: blue; }             /* 특이성이 높아도 진다 */\n.box { background: blue !important; }            /* 풀어 쓴 속성이 모두 중요 선언 */\n:root { --c: red !important; --c: blue; }        /* --c는 red */",
        codeLang: "css",
        terms: [
          {
            term: "중요 선언 (important declaration)",
            body: "!important가 붙은 선언입니다. 보통 선언과 따로 줄을 서고, 출처와 레이어의 순서가 거꾸로 적용됩니다. 구급차가 일반 차선의 순서를 따르지 않고 전용 차로로 가는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: !important와 레이어",
        body: "첫 p는 세 선언을 받습니다. id 선택자의 blue, 인라인 style의 red, 클래스 선택자의 green !important입니다. 둘째 p는 두 레이어에서 각각 중요 선언을 받습니다.\n(1) 첫 p의 지금 값은 green입니다. 모두 작성자 출처이므로, 중요 선언이 id 선택자와 인라인 style을 모두 이깁니다.\n(2) 둘째 p는 purple입니다. 보통 선언이라면 뒤 레이어 b가 이기지만, 중요 선언에서는 앞 레이어 a가 이깁니다.",
        lab: {
          html: `<style>
  #box { color: blue; }
  .imp { color: green !important; }
  @layer a, b;
  @layer a { .t { color: purple !important; } }
  @layer b { .t { color: orange !important; } }
</style>
<p id="box" class="imp" style="color: red">#box.imp, style="color: red"</p>
<p class="t">.t: 레이어 a는 purple, 레이어 b는 orange</p>`,
          height: 150,
          checks: [
            { label: "첫 p의 color", expr: "getComputedStyle(document.querySelector('#box')).color" },
            { label: "둘째 p의 color", expr: "getComputedStyle(document.querySelector('.t')).color" },
          ],
          tryIt: "style 속성을 color: red !important로 바꿔 보세요. 인라인 중요 선언이 이겨 첫 p가 red가 됩니다.",
        },
      },
      {
        label: "currentcolor",
        body: "요소의 color 값을 가리키는 색 키워드입니다. 전역 키워드는 아니고 <color> 자리에만 씁니다. 대소문자를 가리지 않아 currentColor로도 적습니다.\n\nborder-color와 text-decoration-color의 초기값이 currentcolor입니다. box-shadow도 색을 빼면 currentcolor를 씁니다. 그래서 color만 바꾸면 테두리와 밑줄도 따라 바뀝니다. SVG 아이콘의 fill에 쓰면 아이콘이 글자색을 따라갑니다.\n\n계산되는 때: 쓰이는 요소의 color로 정해집니다. getComputedStyle에서는 그 요소의 color와 같은 rgb() 값으로 보입니다.\n\n주의: color 속성 자체에 쓰면 부모에게서 상속된 color를 뜻합니다. color: inherit와 같습니다.",
        code: ".container { color: blue; border: 1px dashed currentcolor; }\n.child { background: currentcolor; height: 9px; }   /* 파랑 막대 */\nsvg.icon { fill: currentcolor; }                     /* 아이콘이 글자색을 따라감 */",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "되돌리는 키워드는 '어디로' 되돌리는지가 서로 다릅니다. 실수는 대개 그 차이에서 납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["div에 display: initial", "block이 아니라 inline이 된다", "display: revert"],
              ["button에 all: unset", "포커스 표시까지 사라진다", ":focus-visible에 outline을 다시 준다"],
              ["특이성 싸움을 !important로 끝냈다", "다음 수정에도 !important가 필요해진다", "남의 CSS를 앞 레이어에 넣는다"],
              ["@keyframes 안에 !important", "그 선언이 무시된다", "keyframes 밖의 규칙에서 다룬다"],
              ["커스텀 속성에 !important를 붙이고 var() 쪽도 기대했다", "var()를 쓴 선언은 보통 선언으로 남는다", "쓰는 쪽 선언에 직접 붙인다"],
              ["h3의 굵기를 unset으로 되돌렸다", "기본 굵게가 아니라 부모의 보통 굵기가 된다", "font-weight: revert"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) div에 display: initial과 display: revert를 주면 각각 무엇이 되나요?\n2) color: unset과 border-color: unset은 왜 다르게 동작하나요?\n3) 두 레이어에 같은 속성의 중요 선언이 있으면 앞 레이어와 뒤 레이어 중 어느 쪽이 이기나요?\n4) color만 바꿨는데 테두리 색까지 바뀌는 이유는 무엇인가요?",
      },
    ],
    sources: [
      { label: "MDN — initial", href: `${MDN}/Reference/Values/initial` },
      { label: "MDN — inherit", href: `${MDN}/Reference/Values/inherit` },
      { label: "MDN — unset", href: `${MDN}/Reference/Values/unset` },
      { label: "MDN — revert", href: `${MDN}/Reference/Values/revert` },
      { label: "MDN — revert-layer", href: `${MDN}/Reference/Values/revert-layer` },
      { label: "MDN — !important", href: `${MDN}/Reference/Values/important` },
    ],
  },
  {
    id: "css-val-length",
    name: "길이와 단위",
    tagline: "숫자에 붙는 단위가 기준을 정한다",
    intro:
      "CSS의 숫자 값은 붙는 단위에 따라 타입이 갈립니다. 길이(<length>), 퍼센트(<percentage>), 각도(<angle>), 시간(<time>), 해상도(<resolution>), 단위 없는 수(<number>, <integer>)입니다. 길이는 다시 절대 단위와 상대 단위로 나뉩니다. 상대 단위는 글꼴, 뷰포트, 컨테이너 중 무엇을 기준으로 하느냐로 또 나뉩니다. 이 시트는 단위 묶음마다 기준과 계산되는 때를 정리합니다. 단위를 고르는 생각의 틀은 4장에 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "앞의 여덟 줄은 길이 단위의 묶음이고, 뒤의 다섯 줄은 길이가 아닌 수 타입입니다.",
        tables: [
          {
            head: ["값", "뜻", "쓰는 곳", "자세히"],
            rows: [
              ["px, cm, mm, Q, in, pc, pt", "절대 길이 (1in = 96px)", "얇은 선, 인쇄", "4장 · 값과 단위"],
              ["em", "요소의 font-size", "패딩, 간격, 글자 크기", "4장 · 값과 단위"],
              ["rem", "루트 요소의 font-size", "글자 크기, 여백", "4장 · 값과 단위"],
              ["ch, ex, cap, ic", "글꼴의 글자 치수", "글줄 폭, 아이콘 크기", "13장 · 글꼴과 텍스트"],
              ["lh, rlh", "줄 높이", "세로 간격", "13장 · 글꼴과 텍스트"],
              ["vw, vh, vmin, vmax", "뷰포트의 1%", "화면 전체 구획", "4장 · 값과 단위"],
              ["svh, lvh, dvh 등", "작은, 큰, 동적 뷰포트의 1%", "모바일 전체 높이", "4장 · 값과 단위"],
              ["cqw, cqh, cqi, cqb", "쿼리 컨테이너의 1%", "부품 안의 크기", "10장 · 반응형"],
              ["<percentage>", "속성이 정한 기준의 백분율", "폭, 여백, 글자 크기", "4장 · 값과 단위"],
              ["<angle>", "deg, grad, rad, turn", "회전, 그러데이션", "12장 · 트랜지션, 애니메이션, 트랜스폼"],
              ["<time>", "s, ms", "트랜지션, 애니메이션", "12장 · 트랜지션, 애니메이션, 트랜스폼"],
              ["<resolution>", "dpi, dpcm, dppx, x", "미디어 쿼리, image-set()", "10장 · 반응형"],
              ["<number>, <integer>", "단위 없는 수, 정수", "line-height, z-index", ""],
            ],
          },
        ],
      },
      {
        label: "<length>",
        body: "거리를 나타내는 값입니다. 숫자 바로 뒤에 단위를 붙입니다. 숫자와 단위 사이에 공백이 있으면 틀린 값입니다. 숫자가 0이면 단위를 빼도 됩니다. 음수를 받는지는 속성마다 다릅니다. margin은 받고 padding은 받지 않습니다.\n\n단위는 절대 단위와 상대 단위로 나뉩니다. 상대 단위는 글꼴, 뷰포트, 컨테이너 중 하나를 기준으로 합니다. 아래 블록에서 묶음마다 봅니다.\n\n계산되는 때: 계산값은 지정한 길이를 절대 길이로 바꾼 값입니다. 어떤 단위로 적었는지는 남지 않습니다. 자식은 2em 같은 지정값이 아니라 이 계산값을 상속합니다. 애니메이션에서는 계산값을 실수로 이어 갑니다.\n\n주의: <percentage>는 <length>와 다른 타입입니다. 둘 다 받는 자리는 <length-percentage>로 적습니다.",
        code: ".a { width: 12.5rem; }       /* 숫자 바로 뒤에 단위 */\n.b { margin: 0; }            /* 0은 단위를 빼도 됨 */\n.c { margin-top: -1em; }     /* 음수: margin은 받고 padding은 안 받음 */\n.d { width: 10 px; }         /* 틀림: 숫자와 단위 사이 공백 */",
        codeLang: "css",
        terms: [
          {
            term: "계산값 (computed value)",
            body: "상대 단위를 바꿀 수 있는 만큼 절대값으로 바꾼 값입니다. em, rem, vw는 여기서 px가 됩니다. 자식이 상속받는 것도 이 값입니다. 외화를 그날 환율로 원화로 바꿔 적어 둔 금액과 같습니다.",
          },
        ],
      },
      {
        label: "px, cm, mm, Q, in, pc, pt",
        body: "절대 길이 단위입니다. 화면에서는 px가 기준이고, 나머지는 px에서 셉니다. 1in = 96px = 2.54cm = 72pt = 6pc입니다.\n\n그래서 화면의 1cm가 자로 잰 1cm와 꼭 같지는 않습니다. 고해상도 화면에서는 CSS 1px에 장치 픽셀이 여러 개 들어갑니다. 인쇄처럼 물리 크기를 아는 매체에서는 cm, in이 실제 길이와 맞습니다.\n\n계산되는 때: 이미 절대 길이라 지정값이 곧 계산값입니다. 다만 border-width, outline-width, outline-offset 같은 몇 속성은 장치 픽셀의 정수 배로 맞춥니다. 1장치 픽셀보다 작은 0 아닌 값은 올리고, 그보다 큰 값은 내립니다.\n\n주의: 사용자가 브라우저의 기본 글자 크기를 키워도 px로 정한 글자는 커지지 않습니다. MDN은 font-size에 em이나 rem을 권합니다.",
        tables: [
          {
            caption: "절대 단위 환산",
            head: ["단위", "이름", "같은 길이"],
            rows: [
              ["px", "픽셀", "1in의 1/96"],
              ["cm", "센티미터", "96px / 2.54"],
              ["mm", "밀리미터", "1cm의 1/10"],
              ["Q", "4분의 1 밀리미터", "1cm의 1/40"],
              ["in", "인치", "2.54cm = 96px"],
              ["pc", "파이카", "12pt = 1in의 1/6"],
              ["pt", "포인트", "1in의 1/72"],
            ],
          },
        ],
        code: ".rule { border-top: 1px solid; }                        /* 얇은 선은 px */\n@media print { .page { width: 21cm; margin: 2cm; } }     /* 인쇄는 물리 단위 */\nh1 { font-size: 2rem; }                                  /* 글자 크기는 rem */",
        codeLang: "css",
        terms: [
          {
            term: "CSS 픽셀과 장치 픽셀",
            body: "CSS 픽셀(px)은 1/96인치로 정한 약속된 단위입니다. 장치 픽셀은 화면에 실제로 박힌 점입니다. 고해상도 화면에서는 CSS 1px을 장치 픽셀 여러 개로 그립니다. 지도의 1cm가 축척에 따라 땅의 다른 거리가 되는 것과 같습니다.",
          },
        ],
      },
      {
        label: "em",
        body: "요소 자신의 font-size입니다. font-size 속성에 쓸 때만 예외로, 부모에게서 물려받은 font-size를 기준으로 합니다.\n\n계산되는 때: 계산값에서 px로 바뀝니다. 자식은 em이 아니라 이 px 값을 상속합니다.\n\n주의: font-size에 em을 겹겹이 쓰면 곱해집니다. 1.5em 안의 1.5em은 2.25배입니다. 반대로 패딩과 간격을 em으로 주면 글자 크기에 맞춰 함께 커집니다. 버튼 같은 부품에 쓰기 좋습니다.",
        code: ".card { font-size: 20px; padding: 1em; }     /* 패딩은 자기 글자 크기 기준 */\n.card small { font-size: 0.8em; }            /* 부모 글자 크기 × 0.8 */\nli li { font-size: 1.2em; }                  /* 중첩마다 1.2배씩 커짐 */",
        codeLang: "css",
      },
      {
        label: "rem",
        body: "루트 요소(보통 html)의 font-size입니다. 브라우저의 기본값은 흔히 16px이고, 사용자가 설정에서 바꿀 수 있습니다. 루트의 font-size 자체에 쓰면 초기값(medium)을 기준으로 합니다.\n\n루트 글꼴 기준의 짝으로 rch, rex, rcap, ric, rlh도 있습니다.\n\n계산되는 때: 계산값에서 px로 바뀝니다.\n\n주의: 중첩해도 곱해지지 않아 글자 크기 체계를 잡기 좋습니다. 루트의 font-size를 px로 고정하면 사용자의 글자 크기 설정이 무시됩니다. 루트를 바꿀 때는 퍼센트로 주어 사용자 설정에 비례하게 합니다.",
        code: "html { font-size: 100%; }        /* 사용자 설정을 그대로 */\nh1 { font-size: 2rem; }          /* 어디에 놓여도 루트의 2배 */\n.stack > * + * { margin-top: 1.5rem; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: em은 곱해지고 rem은 그대로",
        body: "바깥 div의 font-size는 14px입니다. 그 안에 font-size: 1.3em인 div를 세 겹, 1.3rem인 div를 두 겹 넣었습니다.\n(1) 지금 값에서 em 줄의 font-size는 겹마다 1.3배씩 커집니다. font-size의 em은 부모의 font-size를 기준으로 하기 때문입니다.\n(2) rem 줄은 두 겹 모두 같은 값입니다. 늘 루트의 font-size(보통 16px)가 기준이라 바깥 14px과도 상관없습니다.\n(3) 셋째 겹의 padding-left: 1em은 그 요소의 font-size와 같은 값입니다. font-size가 아닌 속성의 em은 자기 글자 크기가 기준입니다.",
        lab: {
          html: `<style>
  .outer { font-size: 14px; }
  .em { font-size: 1.3em; }
  .rem { font-size: 1.3rem; }
  .em .em .em { padding-left: 1em; background: #fef3c7; }
</style>
<div class="outer">
  <div class="em">em 1겹<div class="em">em 2겹<div class="em">em 3겹</div></div></div>
  <div class="rem">rem 1겹<div class="rem">rem 2겹</div></div>
</div>`,
          height: 240,
          checks: [
            { label: ".outer의 font-size", expr: "getComputedStyle(document.querySelector('.outer')).fontSize" },
            { label: "em 1겹", expr: "getComputedStyle(document.querySelectorAll('.em')[0]).fontSize" },
            { label: "em 2겹", expr: "getComputedStyle(document.querySelectorAll('.em')[1]).fontSize" },
            { label: "em 3겹", expr: "getComputedStyle(document.querySelectorAll('.em')[2]).fontSize" },
            { label: "rem 1겹", expr: "getComputedStyle(document.querySelectorAll('.rem')[0]).fontSize" },
            { label: "rem 2겹", expr: "getComputedStyle(document.querySelectorAll('.rem')[1]).fontSize" },
            { label: "em 3겹의 padding-left", expr: "getComputedStyle(document.querySelectorAll('.em')[2]).paddingLeft" },
          ],
          tryIt: ".outer의 font-size를 10px로 바꿔 보세요. em 줄은 모두 작아지고 rem 줄은 그대로입니다.",
        },
      },
      {
        label: "ch, ex, cap, ic",
        body: "글꼴의 글자 치수를 기준으로 하는 단위입니다. 모두 그 요소에 쓰인 글꼴에서 잽니다.\n1) ch: 숫자 0의 전진폭입니다. 0을 잴 수 없으면 0.5em으로 봅니다.\n2) ex: 소문자 x의 높이입니다. 많은 글꼴에서 약 0.5em입니다.\n3) cap: 대문자의 높이입니다.\n4) ic: 한자 '水'의 전진폭입니다. 한중일 글자 한 칸의 폭에 가깝습니다.\n\n계산되는 때: 계산값에서 px로 바뀝니다. 글꼴이 바뀌면 값도 바뀝니다.\n\n주의: max-width: 60ch는 '0이 60개 들어가는 폭'입니다. 영문 글자는 0보다 좁은 것이 많아서 실제로는 60자보다 많이 들어갑니다. 한중일 글자 수로 폭을 정할 때는 ic를 씁니다.",
        code: "article { max-width: 65ch; }      /* 글줄 길이 */\n.icon { height: 1cap; }           /* 대문자 높이에 맞춘 아이콘 */\n.cjk { width: 20ic; }             /* 한중일 글자 20칸 */",
        codeLang: "css",
        terms: [
          {
            term: "전진폭 (advance measure)",
            body: "글자 하나를 찍은 뒤 다음 글자까지 나아가는 거리입니다. 글자 모양의 폭에 양옆 여백을 더한 값입니다. ch는 0의, ic는 水의 전진폭입니다. 타자기가 한 글자를 칠 때마다 종이를 미는 거리와 같습니다.",
          },
        ],
      },
      {
        label: "lh, rlh",
        body: "lh는 그 요소의 line-height 계산값을 절대 길이로 바꾼 값입니다. rlh는 루트 요소의 lh입니다. 빈 줄 하나의 높이로 세로 간격을 맞출 때 씁니다.\n\n계산되는 때: 계산값에서 px로 바뀝니다.\n\n주의: lh는 '이상적인 빈 줄'의 높이입니다. 실제 줄 상자는 큰 글자나 이미지 같은 내용에 따라 lh보다 커질 수 있습니다.",
        code: "p { line-height: 1.6; margin-block: 1lh; }     /* 문단 사이를 빈 줄 하나만큼 */\n.clamp { max-height: 3lh; overflow: hidden; }  /* 세 줄 높이 */\nhr { margin-block: 1rlh; }                     /* 루트의 줄 높이 */",
        codeLang: "css",
      },
      {
        label: "vw, vh, vmin, vmax",
        body: "뷰포트 퍼센트 단위입니다. 1vw는 초기 포함 블록 폭의 1%, 1vh는 높이의 1%입니다. vmin은 vw와 vh 중 작은 쪽, vmax는 큰 쪽입니다. 쓰기 방향을 따르는 vi(인라인 축)와 vb(블록 축)도 있습니다.\n\n계산되는 때: 계산값에서 px로 바뀝니다. 창 크기가 바뀌면 다시 계산합니다.\n\n주의: MDN에 따르면 지금 브라우저의 vh, vw는 모두 큰 뷰포트 단위(lvh, lvw)와 같습니다. 그래서 모바일에서 주소창이 보이면 100vh가 보이는 화면보다 깁니다. 또 100vw는 세로 스크롤바 폭을 빼지 않아서, 스크롤바가 자리를 차지하는 환경에서는 가로로 넘칠 수 있습니다. @page 안에서는 뷰포트 단위를 쓸 수 없습니다.",
        code: ".hero { height: 100vh; }                     /* 큰 뷰포트 기준 */\nh1 { font-size: calc(1rem + 2vw); }          /* 창 폭에 따라 자라는 글자 */\n.square { width: 50vmin; height: 50vmin; }   /* 짧은 변의 절반 */",
        codeLang: "css",
        terms: [
          {
            term: "초기 포함 블록 (initial containing block)",
            body: "뿌리 요소(html)를 담는 가장 바깥 상자입니다. 크기는 뷰포트를 따릅니다. vw와 vh가 이 상자를 기준으로 셉니다. 방 안 가구가 아니라 창틀의 크기를 재는 것과 같습니다.",
          },
        ],
      },
      {
        label: "svh, lvh, dvh와 짝들",
        body: "모바일 브라우저는 스크롤하면 주소창 같은 화면 요소를 접었다가 다시 펼칩니다. 그래서 뷰포트 크기를 셋으로 나눕니다.\n1) 작은 뷰포트(sv*): 화면 요소가 모두 펼쳐졌을 때입니다. 내용이 가려지지 않아 안전하지만, 접히면 빈 곳이 남을 수 있습니다.\n2) 큰 뷰포트(lv*): 화면 요소가 모두 접혔을 때입니다. 펼쳐지면 내용 일부가 가려집니다.\n3) 동적 뷰포트(dv*): 지금 보이는 크기입니다. 화면 요소를 따라 값이 계속 바뀝니다.\n\n접두사 sv, lv, dv 뒤에 w, h, i, b, min, max를 붙입니다. svh, lvw, dvmin 같은 식입니다.\n\n계산되는 때: 계산값에서 px로 바뀝니다. 바뀌는 때는 아래 표와 같습니다.\n\n주의: dv*는 스크롤하는 동안 크기를 다시 계산하게 만듭니다. 화면이 흔들리고 느려질 수 있다고 MDN은 경고합니다. 화면 높이를 꽉 채울 때는 대개 svh가 안전합니다.",
        tables: [
          {
            caption: "세 뷰포트",
            head: ["접두사", "기준 크기", "값이 바뀌는 때"],
            rows: [
              ["sv", "화면 요소가 모두 펼쳐진 작은 뷰포트", "뷰포트 자체가 바뀔 때만"],
              ["lv", "화면 요소가 모두 접힌 큰 뷰포트\n(vw, vh와 같음)", "뷰포트 자체가 바뀔 때만"],
              ["dv", "지금 보이는 뷰포트", "화면 요소가 접히고 펼 때마다"],
            ],
          },
        ],
        code: ".screen { min-height: 100svh; }   /* 주소창이 보여도 가려지지 않음 */\n.sheet  { height: 100dvh; }       /* 지금 보이는 높이를 따라감 */",
        codeLang: "css",
      },
      {
        label: "cqw, cqh, cqi, cqb",
        body: "컨테이너 쿼리 길이 단위입니다. 가장 가까운 쿼리 컨테이너(container-type을 준 조상) 크기의 1%입니다. cqw는 폭, cqh는 높이, cqi는 인라인 크기, cqb는 블록 크기입니다. cqmin과 cqmax는 cqi와 cqb 중 작은 쪽과 큰 쪽입니다.\n\n계산되는 때: 계산값에서 px로 바뀝니다. 컨테이너 크기가 바뀌면 다시 계산합니다.\n\n주의: 그 축을 잴 수 있는 컨테이너가 없으면 그 축의 작은 뷰포트 단위(sv*)로 계산합니다. container-type: inline-size인 컨테이너는 인라인 축만 잽니다. 그래서 그 안의 cqb, cqh는 그 컨테이너를 쓰지 못합니다. 같은 부품을 넓은 칸과 좁은 칸에 넣어도 각자 칸에 맞춰 크기가 정해지는 것이 이 단위의 쓸모입니다.",
        code: ".card-slot { container-type: inline-size; }\n.card h2 { font-size: clamp(1rem, 5cqi, 2rem); }   /* 칸 폭을 따라 자라는 제목 */\n.card img { width: 40cqi; }",
        codeLang: "css",
        terms: [
          {
            term: "쿼리 컨테이너 (query container)",
            body: "container-type을 준 요소입니다. 자손은 이 요소의 크기로 컨테이너 쿼리를 묻고 cq 단위를 계산합니다. 부품이 창 크기 대신 자기가 놓인 칸의 크기를 보는 셈입니다. 화분이 방 크기가 아니라 놓인 선반 크기에 맞추는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: vw, cqi, %의 기준",
        body: "바깥 .wrap은 body 폭의 80%이고 쿼리 컨테이너입니다. 그 안의 .inner는 .wrap의 60% 폭입니다. 막대 셋은 .inner 안에서 각각 50vw, 50cqi, 50%를 받습니다. 폭 버튼을 눌러 작은 창의 폭을 바꿔 보세요. 기록에 resize 줄이 생깁니다.\n(1) 50vw 막대는 늘 창 폭의 절반입니다. 부모 폭과 상관없어서 .inner보다 넓습니다.\n(2) 50cqi 막대는 컨테이너 .wrap 폭의 절반입니다. 사이에 .inner가 끼어 있어도 기준은 컨테이너입니다.\n(3) 50% 막대는 바로 위 포함 블록인 .inner의 절반입니다.\n세 막대 모두 버튼마다 바뀌지만, 기준이 달라서 바뀌는 비율이 다릅니다.",
        lab: {
          html: `<style>
  .wrap { container-type: inline-size; width: 80%; outline: 1px dashed #888; }
  .inner { width: 60%; outline: 1px dotted #2563eb; }
  .bar { height: 14px; margin: 4px 0; }
  .vw { width: 50vw; background: #fcd34d; }
  .cq { width: 50cqi; background: #6ee7b7; }
  .pc { width: 50%; background: #93c5fd; }
</style>
<div class="wrap">
  <div class="inner">
    <div class="bar vw"></div>
    <div class="bar cq"></div>
    <div class="bar pc"></div>
  </div>
</div>`,
          height: 160,
          widths: [320, 480, 640],
          checks: [
            { label: "창 폭 innerWidth", expr: "innerWidth" },
            { label: ".wrap 폭(px)", expr: "Math.round(document.querySelector('.wrap').getBoundingClientRect().width)" },
            { label: ".inner 폭(px)", expr: "Math.round(document.querySelector('.inner').getBoundingClientRect().width)" },
            { label: "50vw 막대(px)", expr: "Math.round(document.querySelector('.vw').getBoundingClientRect().width)" },
            { label: "50cqi 막대(px)", expr: "Math.round(document.querySelector('.cq').getBoundingClientRect().width)" },
            { label: "50% 막대(px)", expr: "Math.round(document.querySelector('.pc').getBoundingClientRect().width)" },
          ],
          tryIt: ".wrap의 container-type을 지워 보세요. 컨테이너가 없어져 50cqi가 작은 뷰포트 폭 기준이 되고, 50vw 막대와 거의 같아집니다.",
        },
      },
      {
        label: "<percentage>",
        body: "숫자 뒤에 %를 붙인 값입니다. 무엇의 몇 %인지는 속성이 정합니다. 같은 50%라도 속성마다 기준이 다릅니다. 자주 쓰는 속성의 기준을 아래 표에 모았습니다.\n\n계산되는 때: 속성마다 다릅니다. font-size와 line-height의 %는 계산값에서 px가 됩니다. width, padding, margin의 %는 레이아웃이 끝나야 알 수 있어서 사용값에서 px가 됩니다. 자식이 상속받는 것은 늘 계산값입니다.\n\n주의: <percentage>는 <length>가 아닙니다. 숫자와 % 사이에 공백을 넣을 수 없습니다. 음수는 속성에 따라 받지 않습니다. 부모 높이가 내용으로 정해지면 height: 50%는 auto처럼 동작합니다.",
        tables: [
          {
            caption: "퍼센트의 기준",
            head: ["속성", "무엇의 %인가"],
            rows: [
              ["width, max-width", "포함 블록의 폭"],
              ["margin, padding (위아래 포함 네 방향)", "포함 블록의 폭(인라인 크기)"],
              ["height, max-height", "포함 블록의 높이\n(그 높이가 내용으로 정해지면 auto처럼)"],
              ["top, bottom / left, right", "포함 블록의 높이 / 폭"],
              ["font-size", "부모의 font-size"],
              ["line-height", "요소 자신의 font-size"],
              ["transform의 translate()", "요소 자신의 테두리 상자"],
              ["border-radius", "요소 자신의 테두리 상자 폭(가로), 높이(세로)"],
              ["background-position", "배경 영역에서 이미지 크기를 뺀 길이"],
              ["flex-basis", "플렉스 컨테이너의 주축 크기"],
            ],
          },
        ],
        code: ".box  { width: 50%; padding-top: 10%; }         /* 둘 다 포함 블록의 폭 기준 */\n.text { font-size: 150%; line-height: 150%; }   /* 부모 글자 / 자기 글자 기준 */\n.move { transform: translateX(-50%); }          /* 자기 폭의 절반 */",
        codeLang: "css",
        terms: [
          {
            term: "사용값 (used value)",
            body: "레이아웃까지 끝내고 정한 최종 값입니다. width: 50%처럼 부모 크기를 알아야 하는 값은 여기서 px가 됩니다. getComputedStyle은 width, padding 같은 속성에서 이 값을 돌려줍니다. 견적서가 아니라 영수증에 찍힌 금액과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 퍼센트는 속성마다 기준이 다르다",
        body: ".box는 폭 60%, 높이 120px, font-size 20px입니다. 안의 .k는 width, height, padding-top, font-size, line-height를 모두 %로 받습니다. 폭 버튼을 눌러 보세요.\n(1) width는 .box 폭의 50%라서 버튼마다 바뀝니다.\n(2) height는 .box 높이의 50%라서 버튼을 눌러도 그대로입니다.\n(3) padding-top은 세로 여백이지만 높이가 아니라 .box '폭'의 10%입니다. 그래서 width처럼 버튼마다 바뀝니다.\n(4) font-size는 부모 20px의 150%, line-height는 자기 font-size의 150%입니다. 둘 다 px로 계산되어 나옵니다.",
        lab: {
          html: `<style>
  .box { width: 60%; height: 120px; font-size: 20px; outline: 1px dashed #888; }
  .k { width: 50%; height: 50%; padding-top: 10%; background: #e0e7ff;
       font-size: 150%; line-height: 150%; }
</style>
<div class="box"><div class="k">%</div></div>`,
          height: 170,
          widths: [320, 480, 640],
          checks: [
            { label: ".box 폭(px)", expr: "Math.round(document.querySelector('.box').getBoundingClientRect().width)" },
            { label: ".k의 width", expr: "getComputedStyle(document.querySelector('.k')).width" },
            { label: ".k의 height", expr: "getComputedStyle(document.querySelector('.k')).height" },
            { label: ".k의 padding-top", expr: "getComputedStyle(document.querySelector('.k')).paddingTop" },
            { label: ".k의 font-size", expr: "getComputedStyle(document.querySelector('.k')).fontSize" },
            { label: ".k의 line-height", expr: "getComputedStyle(document.querySelector('.k')).lineHeight" },
          ],
          tryIt: ".box의 height: 120px를 지워 보세요. 포함 블록의 높이가 내용으로 정해져서 .k의 height: 50%가 auto처럼 동작합니다.",
        },
      },
      {
        label: "<angle>",
        body: "각도 값입니다. 숫자 뒤에 deg, grad, rad, turn 중 하나를 붙입니다. 양수는 시계 방향, 음수는 반시계 방향입니다. transform의 rotate(), 그러데이션의 방향, hsl()의 색상에 씁니다.\n\n계산되는 때: 적은 그대로 각도입니다. 멈춰 있는 값에서는 90deg와 -270deg가 같은 방향입니다. 하지만 애니메이션에서는 도는 양이 달라 결과가 다릅니다.\n\n주의: 옛 문법 몇 곳은 단위 없는 0을 받습니다. 그래도 0deg처럼 늘 단위를 붙입니다.",
        tables: [
          {
            caption: "<angle>의 단위",
            head: ["단위", "뜻", "한 바퀴"],
            rows: [
              ["deg", "도", "360deg"],
              ["grad", "그레이드", "400grad"],
              ["rad", "라디안", "2π, 약 6.2832rad"],
              ["turn", "바퀴 수", "1turn"],
            ],
          },
        ],
        code: ".arrow { transform: rotate(0.25turn); }                  /* = 90deg */\n.bg { background: linear-gradient(135deg, #f69d3c, #3f87a6); }\n.tilt { rotate: -45deg; }                                /* 반시계 방향 */",
        codeLang: "css",
      },
      {
        label: "<time>",
        body: "시간 값입니다. s(초)나 ms(밀리초)를 붙입니다. 1s = 1000ms입니다. transition-duration, transition-delay, animation-duration, animation-delay에 씁니다. 음수도 됩니다. 지연(delay)에 음수를 주면 효과가 바로 시작하되, 그만큼 이미 진행한 곳에서 시작합니다.\n\n계산되는 때: 적은 그대로 시간입니다.\n\n주의: 길이와 달리 0에도 단위가 있어야 합니다. 0만 적으면 틀린 값이라 선언이 무시됩니다. 숫자와 단위 사이에 공백도 넣을 수 없습니다.",
        tables: [
          {
            caption: "맞는 값과 틀린 값",
            head: ["값", "결과"],
            rows: [
              ["1.5s, 150ms, -60s, 0s", "맞음"],
              ["0", "틀림. 0s로 적는다"],
              ["12.0", "단위가 없어 <number>이지 <time>이 아님"],
              ["7 ms", "틀림. 공백 금지"],
            ],
          },
        ],
        code: ".btn { transition: background-color 150ms ease-out; }\n.spinner { animation: spin 1s linear infinite; }\n.late { animation-delay: -0.5s; }   /* 이미 0.5초 진행한 곳에서 시작 */",
        codeLang: "css",
      },
      {
        label: "<resolution>",
        body: "출력 장치의 픽셀 밀도입니다. 주로 미디어 쿼리의 resolution 특성과 image-set()에 씁니다. 단위는 dpi(인치당 점), dpcm(센티미터당 점), dppx(CSS 픽셀당 점)입니다. x는 dppx의 다른 이름입니다. CSS 인치가 96px로 정해져 있어서 1dppx = 96dpi입니다.\n\n화면에서는 물리 인치가 아니라 CSS 인치, CSS 픽셀이 기준입니다. 2dppx는 CSS 1px을 장치 픽셀 2개로 그린다는 뜻입니다.\n\n계산되는 때: 적은 그대로입니다.\n\n주의: 0보다 큰 수만 받습니다. 0에도 단위가 필요하고, 숫자와 단위 사이에 공백을 넣을 수 없습니다.",
        code: "@media (resolution >= 2dppx) { .logo { background-image: url(logo-2x.png); } }\n@media print and (resolution >= 300dpi) { /* 고해상도 인쇄 */ }\n.hero { background-image: image-set(\"a.jpg\" 1x, \"a-2x.jpg\" 2x); }",
        codeLang: "css",
      },
      {
        label: "<number>, <integer>",
        body: "<number>는 단위 없는 수입니다. 정수, 소수, 과학 표기(10e3)를 모두 받습니다. .60처럼 앞의 0을 빼도 됩니다. line-height, opacity, flex-grow, scale 같은 곳에 씁니다.\n\n<integer>는 그중 정수만입니다. 12.0도 정수가 아니라 <number>로 칩니다. 과학 표기도 받지 않습니다. z-index, order, column-count, counter-increment, grid-row의 번호에 씁니다. 명세가 정한 범위는 없습니다.\n\n계산되는 때: 적은 그대로입니다. 애니메이션에서 <number>는 실수로 이어 가고, <integer>는 실수로 계산한 뒤 내림해서 정수 단계로 바뀝니다.\n\n주의: 정수 자리에 calc()를 쓰면 가장 가까운 정수로 반올림합니다. 딱 .5이면 양의 무한대 쪽으로 올립니다. calc(1.5)는 2, calc(-1.5)는 -1입니다.",
        tables: [
          {
            caption: "어느 타입인가",
            head: ["값", "<number>", "<integer>"],
            rows: [
              ["12, -456, +0", "예", "예"],
              ["4.01, .60, -456.8", "예", "아니오"],
              ["10e3, -3.4e-2", "예", "아니오"],
              ["12.0", "예", "아니오"],
              ["12., +-12", "아니오 (틀린 값)", "아니오"],
            ],
          },
        ],
        code: "p { line-height: 1.6; }                 /* <number>: 자식도 1.6을 물려받음 */\n.modal { z-index: 10; }                 /* <integer> */\n.cols { column-count: calc(7 / 2); }    /* 정수 자리라 3.5를 반올림 */",
        codeLang: "css",
      },
      {
        label: "문제가 나는 경우",
        body: "단위는 '어디를 기준으로 셀 것인가'의 선언입니다. 문제는 대개 기준을 잘못 짚어서 납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["font-size에 em을 중첩했다", "겹마다 글자가 커지거나 작아진다", "rem을 쓴다"],
              ["모바일에서 height: 100vh", "주소창이 보일 때 아래가 가려진다", "100svh나 100dvh"],
              ["padding-top: 50%로 높이의 절반을 기대했다", "높이가 아니라 포함 블록 폭의 절반이 된다", "aspect-ratio 같은 다른 방법"],
              ["부모 높이가 auto인데 height: 100%", "auto처럼 동작해 늘어나지 않는다", "부모에 높이를 주거나 그리드, svh를 쓴다"],
              ["transition-duration: 0", "틀린 값이라 선언이 무시된다", "0s로 적는다"],
              ["inline-size 컨테이너 안에서 cqh", "그 컨테이너를 못 써서 svh로 계산된다", "cqi를 쓰거나 container-type: size"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) font-size가 20px인 요소 안에서 font-size: 1.5em과 1.5rem은 각각 무엇을 기준으로 하나요?\n2) padding-top: 10%의 기준은 폭인가요, 높이인가요?\n3) 쿼리 컨테이너가 없는 곳에서 50cqi는 무엇으로 계산되나요?\n4) transition-duration: 0이 무시되는 이유는 무엇인가요?",
      },
    ],
    sources: [
      { label: "MDN — <length>", href: `${MDN}/Reference/Values/length` },
      { label: "MDN — <percentage>", href: `${MDN}/Reference/Values/percentage` },
      { label: "MDN — <angle>", href: `${MDN}/Reference/Values/angle` },
      { label: "MDN — <time>", href: `${MDN}/Reference/Values/time` },
      { label: "MDN — <resolution>", href: `${MDN}/Reference/Values/resolution` },
      { label: "MDN — <number>", href: `${MDN}/Reference/Values/number` },
    ],
  },
  {
    id: "css-val-size",
    name: "크기 키워드와 수학 함수",
    tagline: "내용에 맞추는 낱말과 값을 셈하는 함수",
    intro:
      "크기를 정하는 값에는 숫자 말고 두 갈래가 더 있습니다. 하나는 내용을 재서 크기를 정하는 키워드입니다. min-content, max-content, fit-content와 fit-content() 함수입니다. 다른 하나는 값을 계산하는 수학 함수입니다. calc(), min(), max(), clamp()와 단계를 다루는 round(), mod(), abs()입니다. 내재적 크기의 개념은 9장, calc()와 clamp()의 쓰임은 11장에 있습니다. 이 시트는 값마다 문법, 계산되는 때, 주의를 정리합니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "앞의 넷은 내용에서 크기를 재는 값이고, 뒤의 일곱은 수학 함수입니다. 수학 함수의 브라우저 지원 버전은 둘째 표에 있습니다.",
        tables: [
          {
            head: ["값", "뜻", "쓰는 곳", "자세히"],
            rows: [
              ["min-content", "넘치지 않는 가장 작은 내재적 크기", "width, height, 그리드 트랙", "9장 · 오버플로와 크기"],
              ["max-content", "줄을 바꾸지 않는 가장 큰 내재적 크기", "width, height, 그리드 트랙", "9장 · 오버플로와 크기"],
              ["fit-content", "내용에 맞추되 남는 공간을 넘지 않음", "width, height, min-, max-", "9장 · 오버플로와 크기"],
              ["fit-content()", "인자를 상한으로 내용에 맞춤", "그리드 트랙", "7장 · 그리드"],
              ["calc()", "사칙연산, 단위 섞기", "수를 받는 모든 곳", "11장 · 커스텀 속성과 함수"],
              ["min()", "가장 작은 값 (상한 정하기)", "수를 받는 모든 곳", "11장 · 커스텀 속성과 함수"],
              ["max()", "가장 큰 값 (하한 정하기)", "수를 받는 모든 곳", "11장 · 커스텀 속성과 함수"],
              ["clamp()", "하한과 상한 사이에 가둔 값", "유동 글자 크기, 폭", "11장 · 커스텀 속성과 함수"],
              ["round()", "간격의 배수로 맞춤", "격자에 맞춘 크기", ""],
              ["mod()", "나머지 (나누는 수의 부호)", "되풀이되는 값", ""],
              ["abs()", "절댓값", "음수가 될 수 있는 변수", ""],
            ],
          },
          {
            caption: "수학 함수의 지원 버전",
            head: ["함수", "Chrome", "Safari", "Firefox"],
            rows: [
              ["calc()", "26", "7", "16"],
              ["min(), max()", "79", "11.1", "75"],
              ["clamp()", "79", "13.1", "75"],
              ["round(), mod()", "125", "15.4", "118"],
              ["abs()", "138", "15.4", "118"],
            ],
          },
        ],
      },
      {
        label: "min-content",
        body: "요소의 최소 내재적 크기입니다. 피할 수 있는 넘침 없이 내용을 가장 작게 줄인 크기입니다. 글자라면 줄을 바꿀 수 있는 곳(낱말 사이 공백 등)마다 모두 바꿉니다. 그래서 상자 폭이 가장 긴 낱말만큼이 됩니다.\n\n계산되는 때: 레이아웃 때 내용을 재서 정하는 사용값입니다. getComputedStyle의 width는 잰 px를 돌려줍니다.\n\n주의: 한글은 기본 설정에서 음절 사이에서도 줄을 바꿀 수 있습니다. 그래서 min-content가 한 글자 폭까지 줄어듭니다. word-break: keep-all을 주면 어절 단위로 바꿉니다. min-content로, 또는 min-content에서 애니메이션하려면 interpolate-size나 calc-size()가 필요합니다.",
        code: ".tag { width: min-content; }                         /* 가장 긴 낱말 폭 */\n.grid { grid-template-columns: min-content 1fr; }    /* 첫 열을 최대한 좁게 */\n.ko { width: min-content; word-break: keep-all; }    /* 한글을 어절로 접기 */",
        codeLang: "css",
        terms: [
          {
            term: "내재적 크기 (intrinsic size)",
            body: "부모나 창이 아니라 내용에서 나온 크기입니다. 글자의 길이, 이미지의 원래 크기가 정합니다. min-content와 max-content가 그 두 끝입니다. 옷을 몸에 맞춰 재단하는 것과 같습니다.",
          },
          {
            term: "줄바꿈 기회 (soft wrap opportunity)",
            body: "줄을 바꿔도 되는 자리입니다. 영문은 낱말 사이 공백이고, 한글은 보통 음절 사이도 됩니다. min-content는 이 자리마다 줄을 바꾸고, max-content는 하나도 쓰지 않습니다. 지도에 미리 그어 둔 접는 선과 같습니다.",
          },
        ],
      },
      {
        label: "max-content",
        body: "요소의 최대 내재적 크기입니다. 내용을 줄바꿈 없이 모두 펼쳤을 때의 크기입니다. 글자는 넘치더라도 줄을 바꾸지 않습니다.\n\n계산되는 때: 레이아웃 때 내용을 재서 정하는 사용값입니다.\n\n주의: 부모보다 넓어지면 그대로 넘칩니다. 긴 글에는 max-width를 함께 주거나 fit-content를 씁니다. 그리드 트랙에 쓰면 그 열이 가장 긴 칸의 한 줄 폭이 됩니다.",
        code: ".badge { width: max-content; }                       /* 한 줄로 펼친 폭 */\n.form { grid-template-columns: max-content 1fr; }    /* 라벨 열을 가장 긴 라벨에 맞춤 */",
        codeLang: "css",
      },
      {
        label: "fit-content",
        body: "내용에 맞춰 늘고 줄되, 포함 블록의 남는 공간에서 멈추는 크기입니다. 식은 min(max-content, max(min-content, stretch))입니다. stretch는 마진 상자를 포함 블록 폭에 꽉 채운 크기입니다. 곧 내용이 짧으면 max-content, 길면 남는 폭이고, 아무리 좁아도 min-content보다 작아지지 않습니다.\n\n계산되는 때: 레이아웃 때 정하는 사용값입니다. width, height, min-width, max-width, inline-size, block-size에 쓰고, 내용 상자의 크기를 정합니다.\n\n주의: 인자를 받는 fit-content() 함수와 다른 값입니다. 블록 요소를 내용 폭만큼만 차지하게 한 뒤 margin-inline: auto로 가운데 둘 때 자주 씁니다.",
        code: ".callout { width: fit-content; margin-inline: auto; }   /* 내용 폭으로 가운데 */\n/* fit-content = min(max-content, max(min-content, stretch)) */",
        codeLang: "css",
        terms: [
          {
            term: "stretch",
            body: "마진 상자를 포함 블록의 폭에 꽉 채우는 크기입니다. 블록 요소의 width: auto와 거의 같습니다. fit-content 식에서 '남는 공간'이 이것입니다. 책장 한 칸을 빈틈없이 채우는 폭과 같습니다.",
          },
        ],
      },
      {
        label: "fit-content()",
        body: "인자를 상한으로 내용에 맞추는 함수입니다. 식은 min(최대 크기, max(최소 크기, 인자))입니다. 그리드 트랙에서는 minmax(auto, max-content)처럼 동작하다가, 인자보다 커지면 인자에서 멈춥니다.\n\n인자는 길이나 퍼센트입니다. 그리드에서 퍼센트는 열 트랙이면 그리드 컨테이너의 인라인 크기, 행 트랙이면 블록 크기가 기준입니다.\n\n계산되는 때: 트랙 크기를 정하는 레이아웃 때입니다.\n\n주의: grid-template-columns 같은 트랙 속성에는 이 함수만 쓸 수 있고, 인자 없는 fit-content 키워드는 못 씁니다. MDN은 width 같은 상자 크기에도 쓸 수 있다고 적지만, 그리드 밖에서 쓰기 전에는 MDN 호환 표를 확인합니다.",
        code: ".layout { grid-template-columns: fit-content(200px) 1fr; }   /* 내용에 맞추되 200px까지 */\n.side   { grid-template-columns: fit-content(40%) auto; }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: 내재적 크기 키워드 셋",
        body: "네 상자에 내재적 크기 키워드를 주었습니다. 폭 버튼을 눌러 작은 창의 폭을 바꿔 보세요. 지금 값은 테두리까지 잰 폭입니다.\n(1) 첫 상자(min-content)는 가장 긴 영어 낱말 폭에 패딩과 테두리를 더한 폭입니다. 창 폭이 바뀌어도 그대로입니다.\n(2) 둘째 상자도 min-content입니다. 한글은 음절 사이에서 줄을 바꿀 수 있어 거의 한 글자 폭입니다.\n(3) 셋째 상자(max-content)는 문장을 한 줄로 펼친 폭입니다. 좁은 창에서는 body 내용 폭보다 커져 밖으로 넘칩니다.\n(4) 넷째 상자(fit-content)는 넓은 창에서는 한 줄 폭입니다. 좁은 창에서는 body 내용 폭에서 멈추고 줄을 바꿉니다.",
        lab: {
          html: `<style>
  .b { font: 14px/1.3 system-ui, sans-serif; border: 2px solid #94a3b8;
       padding: 4px; margin: 4px 0; }
  .min { width: min-content; }
  .max { width: max-content; background: #fef3c7; }
  .fit { width: fit-content; background: #dcfce7; }
</style>
<div class="b min">wraps at spaces</div>
<div class="b min">한글 접기</div>
<div class="b max">max-content keeps this whole sentence on one line</div>
<div class="b fit">fit-content grows with its text but stops at the frame edge</div>`,
          height: 300,
          widths: [320, 480, 640],
          checks: [
            { label: "body 내용 폭", expr: "document.body.clientWidth" },
            { label: "min-content 영문(px)", expr: "Math.round(document.querySelectorAll('.b')[0].getBoundingClientRect().width)" },
            { label: "min-content 한글(px)", expr: "Math.round(document.querySelectorAll('.b')[1].getBoundingClientRect().width)" },
            { label: "max-content(px)", expr: "Math.round(document.querySelectorAll('.b')[2].getBoundingClientRect().width)" },
            { label: "fit-content(px)", expr: "Math.round(document.querySelectorAll('.b')[3].getBoundingClientRect().width)" },
          ],
          tryIt: "둘째 상자에 style=\"word-break: keep-all\"을 넣어 보세요. 한글이 어절 단위로 접혀 폭이 '한글'만큼 넓어집니다.",
        },
      },
      {
        label: "calc()",
        body: "속성 값을 계산식으로 적는 함수입니다. +, -, *, / 네 연산자와 괄호를 쓰고, 보통의 연산 순서를 따릅니다. 단위가 다른 값을 섞을 수 있습니다(100% - 2rem). <length>, <percentage>, <angle>, <time>, <number>, <integer> 같은 수 타입 자리에 씁니다.\n\n규칙이 몇 가지 있습니다.\n1) +와 - 양옆에는 공백이 있어야 합니다. calc(100%-2rem)은 틀린 값입니다.\n2) *는 한쪽만 단위가 있어야 합니다. /는 같은 타입끼리 나누면 단위 없는 수가 됩니다(100vw / 1px). 이 나눗셈은 지원하는 브라우저에서만 됩니다.\n3) 단위까지 통째로 바꿔야 합니다. calc(100 / 4)%는 틀리고 calc(100% / 4)는 맞습니다.\n4) 결과의 타입이 자리와 맞아야 합니다. margin: calc(1 + 2)는 margin: 3과 같아서 무시됩니다.\n5) auto, fit-content 같은 내재적 크기는 계산할 수 없습니다. 그때는 calc-size()(실험)를 씁니다.\n\n계산되는 때: 계산값 단계에서 할 수 있는 만큼 계산합니다. %처럼 레이아웃이 필요한 부분은 사용값 때 마저 계산합니다. 정수 자리에서는 가장 가까운 정수로 반올림합니다. calc() 안의 calc()는 그냥 괄호입니다.\n\n접근성: 글자 크기에 쓸 때는 rem 같은 상대 단위를 하나는 넣습니다. 그래야 페이지를 확대할 때 글자도 커집니다.",
        code: ".sidebar { width: calc(100% - 2rem); }        /* 단위 섞기, - 양옆 공백 */\n.cols    { width: calc(100% / 3); }\nh1       { font-size: calc(1.5rem + 3vw); }    /* 상대 단위를 하나는 넣는다 */\n.foo     { --w: 100px; width: calc(var(--w) / 2); }",
        codeLang: "css",
        terms: [
          {
            term: "수학 함수 (math function)",
            body: "calc(), min(), max(), clamp(), round()처럼 값을 계산하는 함수입니다. 안에서는 calc() 없이 바로 사칙연산을 쓰고, 서로 넣어 쓸 수 있습니다. 계산기처럼 결과 값 하나를 내놓습니다.",
          },
        ],
      },
      {
        label: "min()",
        body: "쉼표로 나눈 식 가운데 가장 작은(가장 음수 쪽) 값을 씁니다. 인자는 하나 이상이고, 단위가 달라도 됩니다. 각 인자 안에서는 calc() 없이 바로 사칙연산을 씁니다.\n\n쓰는 법: '아무리 커도 이만큼까지'라는 상한을 정할 때 씁니다. width: min(100%, 60ch)는 좁은 화면에서는 100%, 넓은 화면에서는 60ch입니다. 이름은 min이지만 하는 일은 최댓값 제한입니다.\n\n계산되는 때: calc()와 같습니다. 인자를 견줄 수 있게 된 때 고릅니다. %가 들어 있으면 레이아웃 때 정해집니다.\n\n주의: 글자 크기의 상한으로 쓸 때는 확대로 200%까지 커질 수 있는지 확인합니다(MDN 접근성 권고).",
        code: ".card  { width: min(100%, 60ch); }      /* 상한 60ch */\ninput  { width: min(40%, 400px); }\n.hero  { padding: min(5vw, 3rem); }",
        codeLang: "css",
      },
      {
        label: "max()",
        body: "가장 큰(가장 양수 쪽) 값을 씁니다. '아무리 작아도 이만큼은'이라는 하한을 정할 때 씁니다. font-size: max(1.2rem, 1.2vw)는 좁은 창에서도 1.2rem 아래로 내려가지 않습니다. 이름은 max지만 하는 일은 최솟값 보장입니다.\n\n계산되는 때: min()과 같습니다.\n\n주의: 하한만 필요할 때 씁니다. 상한도 필요하면 clamp()가 읽기 쉽습니다. abs()를 못 쓰는 브라우저에서는 max(var(--x), -1 * var(--x))로 절댓값을 흉내 냅니다.",
        code: "p      { font-size: max(1.2rem, 1.2vw); }   /* 하한 1.2rem */\n.panel { width: max(50%, 320px); }",
        codeLang: "css",
      },
      {
        label: "clamp()",
        body: "clamp(최소, 선호, 최대)는 선호값을 두 경계 사이에 가둡니다. max(최소, min(선호, 최대))와 같습니다. 선호값이 최소보다 작으면 최소, 최대보다 크면 최대를 씁니다. 각 인자에 calc() 없이 식을 쓸 수 있고, min()과 max()를 넣을 수도 있습니다.\n\n쓰는 법: 창 폭에 따라 자라되 한계가 있는 값에 씁니다. 미디어 쿼리 없이 유동 글자 크기를 만드는 대표적인 방법입니다.\n\n계산되는 때: calc()와 같습니다. vw나 rem만 있으면 계산값에서, %가 있으면 레이아웃 때 정해집니다.\n\n주의: 최소가 최대보다 크면 최소가 이깁니다. 바깥이 max()이기 때문입니다. 글자 크기에 쓸 때 MDN은 최댓값을 최솟값의 두 배 이상인 상대 단위로 두라고 권합니다. 그래야 확대로 200%까지 커질 수 있습니다.",
        code: "h1   { font-size: clamp(1.8rem, 1rem + 2.5vw, 3.6rem); }   /* 유동 + 경계 */\n.box { width: clamp(200px, 40%, 400px); }\n/* clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX)) */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: clamp(), min(), max()와 창 폭",
        body: "제목 글자 크기와 막대 셋의 폭을 수학 함수로 정했습니다. 폭 버튼을 차례로 눌러, 값마다 어느 인자가 이겼는지 지금 값으로 확인합니다.\n(1) 제목의 font-size는 가장 좁은 창에서 하한 1rem에 걸립니다. 가장 넓은 창에서는 상한 1.75rem에 걸립니다. 그 사이에서는 4.5vw를 따라 자랍니다.\n(2) min(100%, 300px) 막대는 body가 300px보다 좁으면 body 폭, 넓으면 300px입니다.\n(3) max(50%, 240px) 막대는 좁은 창에서 240px 아래로 줄지 않습니다.\n(4) clamp(150px, 50%, 260px) 막대는 body 폭의 절반을 따라가다가 150px와 260px에서 멈춥니다.",
        lab: {
          html: `<style>
  .t { font-size: clamp(1rem, 4.5vw, 1.75rem); margin: 0 0 6px; }
  .bar { height: 14px; margin: 4px 0; background: #93c5fd; }
  .mn { width: min(100%, 300px); }
  .mx { width: max(50%, 240px); background: #fcd34d; }
  .cl { width: clamp(150px, 50%, 260px); background: #6ee7b7; }
</style>
<p class="t">clamp(1rem, 4.5vw, 1.75rem)</p>
<div class="bar mn"></div>
<div class="bar mx"></div>
<div class="bar cl"></div>`,
          height: 160,
          widths: [320, 480, 640],
          checks: [
            { label: "창 폭 innerWidth", expr: "innerWidth" },
            { label: "body 내용 폭", expr: "document.body.clientWidth" },
            { label: "제목 font-size", expr: "getComputedStyle(document.querySelector('.t')).fontSize" },
            { label: "min(100%, 300px) 폭(px)", expr: "Math.round(document.querySelector('.mn').getBoundingClientRect().width)" },
            { label: "max(50%, 240px) 폭(px)", expr: "Math.round(document.querySelector('.mx').getBoundingClientRect().width)" },
            { label: "clamp(150px, 50%, 260px) 폭(px)", expr: "Math.round(document.querySelector('.cl').getBoundingClientRect().width)" },
          ],
          tryIt: ".cl의 최소 150px를 300px로 바꿔 보세요. 최소가 최대보다 커져서 어느 폭에서나 300px입니다.",
        },
      },
      {
        label: "round()",
        body: "값을 간격의 정수 배로 맞춥니다. round(방식, 값, 간격) 꼴이고, 방식은 빼면 nearest입니다. 값과 간격은 같은 타입이어야 합니다. 값이 <number>일 때만 간격을 뺄 수 있고, 그때 간격은 1입니다.\n\n방식은 넷입니다. 아래 표를 보세요.\n\n계산되는 때: 인자를 견줄 수 있게 된 때 계산합니다. 결과는 인자와 같은 타입입니다. 값이 이미 간격의 배수면 그대로입니다. 간격이 0이면 결과는 NaN입니다.\n\n주의: MDN은 값이나 간격이 커스텀 속성처럼 바뀌는 값일 때 쓰라고 합니다. 둘 다 정해진 수면 미리 계산해서 적으면 됩니다.",
        tables: [
          {
            caption: "반올림 방식",
            head: ["방식", "하는 일", "자바스크립트로"],
            rows: [
              ["nearest (기본)", "가까운 배수. 딱 중간이면 올림", "Math.round()"],
              ["up", "위쪽 배수 (양의 무한대 쪽)", "Math.ceil()"],
              ["down", "아래쪽 배수 (음의 무한대 쪽)", "Math.floor()"],
              ["to-zero", "0 쪽 배수", "Math.trunc()"],
            ],
          },
        ],
        code: ".tile { width: round(var(--w), 50px); }          /* 50px 단위로 반올림 */\n.row  { height: round(up, 101px, 25px); }        /* 125px */\n.m    { margin: round(to-zero, -105px, 10px); }  /* -100px */",
        codeLang: "css",
      },
      {
        label: "mod()",
        body: "첫 인자를 둘째 인자로 나눈 나머지입니다. 식은 a - floor(a / b) × b입니다. 결과의 부호는 늘 나누는 수(둘째 인자)를 따릅니다. mod(21, -4)는 -3입니다.\n\n두 인자는 같은 타입이어야 합니다. 단위가 달라도 길이끼리, 각도끼리처럼 같은 종류면 됩니다. mod(1000px, 29rem)도 됩니다.\n\n계산되는 때: round()와 같습니다. 나누는 수가 0이거나 나뉘는 수가 무한이면 NaN입니다.\n\n주의: 자바스크립트의 %와 비슷하지만 부호 규칙이 다릅니다. %는 나뉘는 수의 부호를, mod()는 나누는 수의 부호를 따릅니다. 나뉘는 수의 부호를 따르는 CSS 함수는 rem()입니다.",
        code: ".r { rotate: mod(400deg, 360deg); }    /* 40deg */\n.n { line-height: mod(7, 2); }          /* 1 */\n.s { rotate: mod(-70deg, 20deg); }      /* 10deg, 나누는 수의 부호 */",
        codeLang: "css",
      },
      {
        label: "abs()",
        body: "인자의 절댓값을 같은 타입으로 돌려줍니다. 양수나 0이면 그대로, 음수면 -1을 곱합니다. 숫자, 길이 같은 차원 값, 퍼센트를 받습니다.\n\n쓰는 법: 음수가 될 수 있는 커스텀 속성을 늘 양수로 쓸 때 씁니다. font-size: abs(var(--size)) 같은 식입니다.\n\n계산되는 때: round()와 같습니다.\n\n주의: Chrome은 138부터 지원합니다. 지원이 없는 브라우저에서는 max(var(--x), -1 * var(--x))로 같은 결과를 냅니다.",
        code: "h1 { font-size: abs(var(--size)); }\n.g { --deg: -45deg; background-image: linear-gradient(abs(var(--deg)), blue, red); }\np  { line-height: max(var(--lh), -1 * var(--lh)); }   /* abs()가 없을 때 */",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: round(), mod(), abs()",
        body: "세 막대는 같은 80vw에서 출발합니다. 둘째 막대는 50px 단위로 내림한 값, 셋째 막대는 50px로 나눈 나머지입니다. 폭 버튼을 눌러 보세요.\n(1) round(down, …) 막대는 늘 50의 배수입니다. 창 폭이 바뀌면 계단처럼 50씩 바뀝니다.\n(2) mod(…) 막대는 늘 50보다 작습니다.\n(3) 'round + mod' 줄은 첫 막대(80vw)와 같습니다. 내림한 몫과 나머지를 더하면 원래 값이기 때문입니다.\n(4) 작은 상자의 rotate는 400deg를 360deg로 나눈 나머지입니다. margin-left는 10px - 2rem의 절댓값입니다. 루트 글자 크기가 16px이면 음수가 양수로 바뀝니다.",
        lab: {
          html: `<style>
  .bar { height: 12px; margin: 4px 0; }
  .c { width: 80vw; background: #cbd5e1; }
  .r { width: round(down, 80vw, 50px); background: #fcd34d; }
  .m { width: mod(80vw, 50px); background: #fca5a5; }
  .t { width: 40px; height: 40px; margin-top: 16px; background: #a78bfa;
       rotate: mod(400deg, 360deg); margin-left: abs(10px - 2rem); }
</style>
<div class="bar c"></div>
<div class="bar r"></div>
<div class="bar m"></div>
<div class="t"></div>`,
          height: 160,
          widths: [320, 480, 640],
          checks: [
            { label: "80vw 막대(px)", expr: "Math.round(document.querySelector('.c').getBoundingClientRect().width)" },
            { label: "round(down, 80vw, 50px)(px)", expr: "Math.round(document.querySelector('.r').getBoundingClientRect().width)" },
            { label: "mod(80vw, 50px)(px)", expr: "Math.round(document.querySelector('.m').getBoundingClientRect().width)" },
            { label: "round + mod", expr: "Math.round(document.querySelector('.r').getBoundingClientRect().width + document.querySelector('.m').getBoundingClientRect().width)" },
            { label: "rotate", expr: "getComputedStyle(document.querySelector('.t')).rotate" },
            { label: "margin-left", expr: "getComputedStyle(document.querySelector('.t')).marginLeft" },
          ],
          tryIt: ".r의 down을 up으로 바꿔 보세요. 막대가 80vw보다 짧아지지 않고, 늘 50의 배수인 것은 같습니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "수학 함수는 문법이 틀리면 선언 전체가 버려집니다. 크기 키워드는 넘침을 막아 주지 않습니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["calc(100%-2rem)", "틀린 값이라 선언이 무시된다", "- 양옆에 공백: calc(100% - 2rem)"],
              ["calc(100 / 4)%", "단위만 따로 붙일 수 없어 틀린 값", "calc(100% / 4)"],
              ["width: max-content인 긴 글", "부모 밖으로 넘친다", "fit-content나 max-width를 함께"],
              ["clamp()의 최대가 최소의 두 배보다 작다", "확대해도 글자가 200%까지 커지지 않을 수 있다", "최대를 최소의 두 배 이상, rem으로"],
              ["round(101px, 25)", "값과 간격의 타입이 달라 틀린 값", "간격에도 단위: round(101px, 25px)"],
              ["mod(-7, 3)을 자바스크립트 %처럼 기대했다", "-1이 아니라 2가 나온다", "나뉘는 수의 부호가 필요하면 rem()"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 영어 문장에 width: min-content를 주면 상자는 어떤 폭이 되나요?\n2) clamp(150px, 50%, 260px)를 min()과 max()로 풀어 쓰면 어떻게 되나요?\n3) calc(100%-2rem)이 틀린 값인 이유는 무엇인가요?\n4) mod(-7, 3)과 자바스크립트의 -7 % 3은 왜 결과가 다른가요?",
      },
    ],
    sources: [
      { label: "MDN — min-content", href: `${MDN}/Reference/Values/min-content` },
      { label: "MDN — max-content", href: `${MDN}/Reference/Values/max-content` },
      { label: "MDN — fit-content", href: `${MDN}/Reference/Values/fit-content` },
      { label: "MDN — calc()", href: `${MDN}/Reference/Values/calc` },
      { label: "MDN — clamp()", href: `${MDN}/Reference/Values/clamp` },
      { label: "MDN — round()", href: `${MDN}/Reference/Values/round` },
    ],
  },
  {
    id: "css-val-color",
    name: "색 값",
    tagline: "같은 색을 적는 여러 문법과 그 계산값",
    intro:
      "CSS의 <color>는 색 하나를 나타내고, 필요하면 투명도(알파)도 함께 담습니다. 적는 방법은 여럿입니다. 이름(red), 16진수(#ff0000), 함수(rgb(), hsl(), oklch() 등), 두 색 섞기(color-mix()), 색 구성에 따라 고르기(light-dark())입니다. 시스템 색은 사용자 설정과 강제 색 모드를 따릅니다. 이 시트는 문법마다 계산값이 어떤 꼴로 나오는지도 함께 봅니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "모든 문법은 <color>를 받는 자리라면 어디든 씁니다. color, background-color, border-color, 그러데이션의 색 멈춤이 그런 자리입니다.",
        tables: [
          {
            head: ["값", "뜻", "쓰는 곳", "자세히"],
            rows: [
              ["red, rebeccapurple", "이름 있는 색 (sRGB)", "<color> 자리", ""],
              ["transparent", "완전히 투명한 검정", "배경, 테두리 지우기", ""],
              ["#rgb, #rgba, #rrggbb, #rrggbbaa", "16진수 sRGB", "<color> 자리", ""],
              ["rgb(), hsl(), hwb()", "sRGB를 성분이나 색상환으로", "<color> 자리", ""],
              ["lab(), lch(), oklab(), oklch()", "CIELAB, Oklab 색 공간", "팔레트, 넓은 색역", ""],
              ["color()", "이름 붙은 색 공간 (display-p3 등)", "넓은 색역", ""],
              ["color-mix()", "두 색을 비율대로 섞음", "호버 색, 팔레트", ""],
              ["light-dark()", "밝은, 어두운 색 구성에 따라 하나", "다크 모드", ""],
              ["currentcolor", "요소의 color 값", "테두리, 아이콘", "전역 키워드 시트"],
              ["Canvas, CanvasText 등", "시스템 색", "강제 색 모드", ""],
            ],
          },
        ],
      },
      {
        label: "<named-color>",
        body: "색 이름 키워드입니다. 기본 16색(black, white, red 등)이 있고, 그 밖에 약 150개 색에 이름이 있습니다. 확장 색 이름은 X11 색 이름에서 왔습니다. rebeccapurple은 CSS Color 4에서 더해졌습니다. 모두 sRGB의 불투명한 색이고, 대소문자를 가리지 않습니다.\n\naqua와 cyan, fuchsia와 magenta, gray와 grey처럼 같은 색의 다른 이름이 있습니다.\n\n계산되는 때: 계산값에서 sRGB 색이 됩니다. getComputedStyle은 rgb(r, g, b) 꼴로 돌려줍니다.\n\n주의: 이름은 대략의 색을 묘사할 뿐 규칙이 없습니다. darkgray가 gray보다 밝은 것이 그 예입니다.",
        code: ".a { color: rebeccapurple; }\n.b { background: aliceblue; border-color: Gray; }   /* 대소문자 무관 */",
        codeLang: "css",
        terms: [
          {
            term: "sRGB",
            body: "웹의 기본 색 공간입니다. 이름 색, 16진수, rgb(), hsl(), hwb()가 모두 이 공간의 색입니다. 흔한 모니터가 낼 수 있는 색 범위에 맞춰 정했습니다. 정해진 24색이 든 크레파스 상자와 같습니다.",
          },
        ],
      },
      {
        label: "transparent",
        body: "완전히 투명한 색입니다. rgb(0 0 0 / 0%)의 줄임이라 뒤의 배경이 그대로 보입니다. background-color의 초기값이 transparent입니다. 처음에는 background와 border에만 쓰는 특별한 낱말이었지만, 지금은 <color>를 받는 곳 어디서나 씁니다.\n\n계산되는 때: 계산값에서 투명한 검정이 됩니다. getComputedStyle은 rgba(0, 0, 0, 0)으로 돌려줍니다.\n\n주의: 그러데이션에서 transparent로 이어 갈 때, 지금 명세는 알파를 미리 곱한 공간에서 섞게 합니다. 그래서 중간에 회색 띠가 생기지 않습니다. 오래된 브라우저는 투명한 검정과 그냥 섞어 중간이 칙칙해질 수 있습니다.",
        code: ".ghost { background: transparent; border: 1px solid currentcolor; }\n.fade  { background: linear-gradient(to right, white, transparent); }",
        codeLang: "css",
      },
      {
        label: "<hex-color>",
        body: "sRGB 색을 16진수로 적습니다. #RGB, #RGBA, #RRGGBB, #RRGGBBAA 네 꼴이 있습니다. 각 성분은 00부터 ff(255)까지입니다. 한 자리로 적으면 같은 글자를 두 번 쓴 것으로 봅니다. #f09는 #ff0099입니다. 마지막 A는 알파입니다. 00이면 완전 투명, ff면 불투명입니다. 대소문자를 가리지 않습니다.\n\n계산되는 때: 계산값에서 sRGB 색이 됩니다. getComputedStyle은 불투명하면 rgb(r, g, b), 알파가 있으면 rgba(r, g, b, a) 꼴로 돌려줍니다.\n\n주의: 4자리와 8자리 꼴에는 알파가 들어갑니다. #f09a는 #ff0099aa라서 반투명입니다.",
        tables: [
          {
            caption: "16진수의 네 꼴",
            head: ["꼴", "예", "같은 값"],
            rows: [
              ["#RGB", "#f09", "#ff0099"],
              ["#RGBA", "#f09a", "#ff0099aa"],
              ["#RRGGBB", "#ff0099", "rgb(255 0 153)"],
              ["#RRGGBBAA", "#0000ff33", "rgb(0 0 255 / 0.2)"],
            ],
          },
        ],
        code: ".a { color: #f09; }             /* = #ff0099 */\n.b { background: #0000ff33; }   /* 파랑, 알파 33 = 51/255 = 0.2 */",
        codeLang: "css",
        terms: [
          {
            term: "알파 (alpha)",
            body: "색의 불투명도입니다. 1(또는 100%)이면 불투명, 0이면 완전 투명입니다. 뒤 배경과 얼마나 섞일지를 정합니다. 색 셀로판지를 몇 장 겹쳤는지와 같습니다.",
          },
        ],
      },
      {
        label: "rgb(), hsl(), hwb()",
        body: "sRGB 색을 함수로 적습니다. 요즘 문법은 성분을 공백으로 나누고, 알파는 / 뒤에 적습니다.\n1) rgb(R G B / A): 빨강, 초록, 파랑입니다.\n2) hsl(H S L / A): 색상(각도), 채도, 밝기입니다.\n3) hwb(H W B / A): 색상, 흰색 섞임, 검정 섞임입니다.\n\n옛 쉼표 문법인 rgb(255, 0, 153)과 rgba(), hsla()도 아직 씁니다. 다만 쉼표 문법에는 빠진 성분을 뜻하는 none을 쓸 수 없습니다. 한 함수 안에서 공백과 쉼표를 섞을 수도 없습니다. hwb()에는 쉼표 문법이 없습니다.\n\n계산되는 때: 셋 다 sRGB라서 계산값에서 rgb() 또는 rgba() 꼴이 됩니다. hsl()로 적어도 getComputedStyle은 rgb()로 돌려줍니다.\n\n주의: hsl()의 밝기 50%는 사람 눈에 고르지 않습니다. 같은 50%라도 노랑은 밝고 파랑은 어둡게 보입니다. 고른 밝기가 필요하면 oklch()를 씁니다.",
        tables: [
          {
            caption: "성분과 범위",
            head: ["함수", "성분", "범위"],
            rows: [
              ["rgb()", "R, G, B", "0~255 또는 0%~100%"],
              ["hsl()", "H 색상, S 채도, L 밝기", "각도, 0%~100%, 0%~100%"],
              ["hwb()", "H 색상, W 흰색, B 검정", "각도, 0%~100%, 0%~100%"],
              ["/ 뒤의 알파", "투명도", "0~1 또는 0%~100%"],
            ],
          },
        ],
        code: ".a { color: rgb(255 0 153); }\n.b { color: rgb(255 0 153 / 80%); }       /* 알파는 / 뒤 */\n.c { color: hsl(330 100% 50%); }\n.d { color: hwb(330 0% 0% / 0.5); }\n.e { color: rgba(255, 0, 153, 0.8); }     /* 옛 쉼표 문법 */",
        codeLang: "css",
      },
      {
        label: "lab(), lch(), oklab(), oklch()",
        body: "sRGB 밖의 색 공간으로 색을 적습니다. lab()과 lch()는 CIELAB, oklab()과 oklch()는 Oklab 공간입니다. L은 밝기, a와 b는 색의 방향(초록과 빨강 축, 파랑과 노랑 축)입니다. C는 채도(크로마), H는 색상 각도입니다.\n\nOklab은 사람 눈에 밝기와 색 차이가 고르게 보이도록 만든 공간입니다. 그래서 oklch()에서 L만 바꾸면 같은 색상으로 밝기만 고르게 달라집니다. 팔레트를 만들 때 편합니다. sRGB보다 넓은 색도 적을 수 있습니다.\n\n상대 색 문법도 있습니다. lch(from blue calc(l + 20) c h)처럼 from 뒤의 색에서 성분을 꺼내 고칩니다.\n\n계산되는 때: sRGB로 바꾸지 않고 자기 꼴로 남습니다. getComputedStyle은 oklch(…) 꼴 그대로 돌려줍니다. 이때 밝기는 퍼센트 대신 수로 나올 수 있습니다.\n\n주의: 화면이 그 색을 낼 수 없으면 브라우저가 낼 수 있는 가까운 색으로 바꿔 그립니다. 같은 값도 장치마다 다르게 보일 수 있습니다.",
        tables: [
          {
            caption: "성분과 밝기 범위",
            head: ["함수", "성분", "L의 범위"],
            rows: [
              ["lab()", "L, a, b", "0%~100% (수로는 0~100)"],
              ["lch()", "L, C, H", "0%~100% (수로는 0~100)"],
              ["oklab()", "L, a, b", "0%~100% (수로는 0~1)"],
              ["oklch()", "L, C, H", "0%~100% (수로는 0~1)"],
            ],
          },
        ],
        code: ".a { color: lab(50% 40 59.5); }\n.b { color: lch(52.2% 72.2 50 / 0.5); }\n.c { color: oklch(60% 0.15 50); }\n.c:hover { color: oklch(70% 0.15 50); }          /* L만 바꿔 같은 색상으로 밝게 */\n.d { color: lch(from blue calc(l + 20) c h); }   /* 상대 색: 파랑을 밝게 */",
        codeLang: "css",
        terms: [
          {
            term: "색 공간 (color space)",
            body: "색을 숫자로 적는 좌표계입니다. sRGB, display-p3, Oklab처럼 여럿이 있습니다. 담을 수 있는 색의 범위와 숫자의 뜻이 서로 다릅니다. 같은 장소를 위도와 경도로도, 도로명 주소로도 적을 수 있는 것과 같습니다.",
          },
        ],
      },
      {
        label: "color()",
        body: "이름 붙은 색 공간과 성분 값으로 색을 적습니다. color(공간 c1 c2 c3 / A) 꼴입니다. 공간으로 srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz, xyz-d50, xyz-d65가 있습니다. RGB 계열 공간의 성분은 보통 0~1입니다.\n\n계산되는 때: color(…) 꼴 그대로 남습니다. color(srgb 1 0 0)도 rgb()로 바뀌지 않습니다.\n\n주의: display-p3처럼 넓은 공간의 색은 그 색을 낼 수 있는 화면에서만 제대로 보입니다. @media (color-gamut: p3)로 화면을 확인하고 쓸 수 있습니다.",
        code: ".a { color: color(display-p3 1 0 0); }          /* sRGB보다 진한 빨강 */\n@media (color-gamut: p3) { .brand { color: color(display-p3 0 0.8 0.4); } }",
        codeLang: "css",
      },
      {
        label: "color-mix()",
        body: "두 색을 정한 색 공간에서 비율대로 섞습니다. color-mix(in 공간, 색1 비율, 색2 비율) 꼴입니다. 비율을 둘 다 빼면 반반입니다. 하나만 적으면 나머지는 100%에서 뺀 값입니다. 공간은 srgb, oklab, oklch, hsl 등에서 고릅니다. 색상 각도가 있는 공간에서는 shorter hue, longer hue처럼 도는 방향도 정할 수 있습니다.\n\n계산되는 때: 계산값에서 섞은 색 하나가 됩니다. in srgb로 섞으면 color(srgb …) 꼴로, in oklab으로 섞으면 oklab(…) 꼴로 나옵니다.\n\n주의: 같은 두 색이라도 공간에 따라 가운데 색이 다릅니다. srgb에서 파랑과 노랑을 반반 섞으면 회색입니다. oklch에서는 색상환을 따라 돌아 청록 쪽의 선명한 색이 됩니다. 비율 합이 100%보다 작으면 결과에 그만큼 투명도가 생깁니다.",
        code: ".btn:hover { background: color-mix(in oklab, var(--brand) 80%, black); }   /* 조금 어둡게 */\n.half { color: color-mix(in srgb, red, blue); }                        /* 반반 */\n.fade { color: color-mix(in srgb, red 30%, blue 30%); }                /* 합 60%라 반투명 */",
        codeLang: "css",
        terms: [
          {
            term: "보간 (interpolation)",
            body: "두 값 사이의 중간값을 계산하는 일입니다. 색에서는 정한 색 공간으로 바꾼 뒤 성분마다 섞습니다. 그러데이션, 트랜지션, color-mix()가 모두 보간입니다. 두 물감을 비율대로 섞는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 적은 문법과 계산값의 꼴",
        body: "일곱 상자는 글자색을 서로 다른 문법으로 적었습니다. 지금 값의 꼴을 견줘 보세요.\n(1) #f09, hsl(), rebeccapurple은 모두 sRGB라 rgb(r, g, b) 꼴로 나옵니다. 어떤 문법으로 적었는지는 남지 않습니다.\n(2) #ff009980은 알파가 있어 rgba(r, g, b, a) 꼴입니다.\n(3) oklch()는 sRGB로 바뀌지 않고 oklch(…) 꼴 그대로입니다.\n(4) color-mix(in srgb, …)는 섞은 색 하나가 되어 color(srgb …) 꼴로 나옵니다.\n(5) transparent는 투명한 검정 rgba(0, 0, 0, 0)입니다. 그래서 마지막 상자의 글자가 보이지 않습니다.",
        lab: {
          html: `<style>
  b { display: inline-block; padding: 2px 6px; margin: 2px; border: 1px solid #ccc; }
  .a { color: #f09; }
  .b { color: #ff009980; }
  .c { color: hsl(330 100% 50%); }
  .d { color: rebeccapurple; }
  .e { color: oklch(60% 0.2 350); }
  .f { color: color-mix(in srgb, red, blue); }
  .g { color: transparent; }
</style>
<b class="a">#f09</b><b class="b">#ff009980</b><b class="c">hsl()</b><b class="d">rebeccapurple</b>
<b class="e">oklch()</b><b class="f">color-mix()</b><b class="g">transparent</b>`,
          height: 140,
          checks: [
            { label: "#f09", expr: "getComputedStyle(document.querySelector('.a')).color" },
            { label: "#ff009980", expr: "getComputedStyle(document.querySelector('.b')).color" },
            { label: "hsl(330 100% 50%)", expr: "getComputedStyle(document.querySelector('.c')).color" },
            { label: "rebeccapurple", expr: "getComputedStyle(document.querySelector('.d')).color" },
            { label: "oklch(60% 0.2 350)", expr: "getComputedStyle(document.querySelector('.e')).color" },
            { label: "color-mix(in srgb, red, blue)", expr: "getComputedStyle(document.querySelector('.f')).color" },
            { label: "transparent", expr: "getComputedStyle(document.querySelector('.g')).color" },
          ],
          tryIt: ".c를 hsl(330 100% 50% / 0.5)로 바꿔 보세요. 지금 값이 rgba( ) 꼴로 바뀝니다. .f의 in srgb를 in oklab으로 바꾸면 oklab( ) 꼴이 됩니다.",
        },
      },
      {
        label: "light-dark()",
        body: "색 두 개를 받아, 요소의 색 구성이 밝으면 첫째, 어두우면 둘째를 씁니다. 색 구성은 color-scheme 속성으로 정합니다. color-scheme: light dark를 주면 사용자의 운영체제 설정을 따릅니다.\n\n계산되는 때: 그 요소에 쓰이는 색 구성을 보고 둘 중 하나를 고릅니다. getComputedStyle에는 고른 색이 나옵니다.\n\n주의: color-scheme의 초기값 normal에서는 밝은 쪽으로 봅니다. 그래서 color-scheme을 선언하지 않으면 다크 모드에서도 첫째 색이 나옵니다. color-scheme은 상속 속성이라, 한 요소에 주면 그 아래 전체가 따라갑니다.",
        code: ":root { color-scheme: light dark; }                 /* 운영체제 설정을 따름 */\nbody { color: light-dark(#111, #eee); background: light-dark(#fff, #121212); }\n.only-dark { color-scheme: dark; }                  /* 이 요소 아래는 늘 어두운 쪽 */",
        codeLang: "css",
      },
      {
        label: "currentcolor",
        body: "요소의 color 값을 가리키는 색 키워드입니다. border-color와 text-decoration-color의 초기값이고, box-shadow에서 색을 빼도 이 값을 씁니다. color 속성 자체에 쓰면 상속된 color를 뜻합니다. 자세한 설명과 실험은 '전역 키워드와 !important' 시트에 있습니다.\n\n계산되는 때: getComputedStyle에서는 그 요소의 color와 같은 rgb() 값으로 보입니다.",
        code: ".tag { color: #0b5fff; border: 1px solid currentcolor; }   /* 테두리도 같은 파랑 */",
        codeLang: "css",
      },
      {
        label: "<system-color>",
        body: "브라우저와 운영체제가 정한, 화면 부분의 색입니다. Canvas(문서 배경), CanvasText(문서 글자), LinkText(링크), ButtonFace(버튼 배경), Field(입력 칸 배경) 같은 낱말입니다. 대소문자를 가리지 않습니다. 표준 목록은 아래 표와 같습니다.\n\n강제 색 모드(예: Windows 고대비 모드)에서는 사용자가 고른 팔레트가 작성자의 색을 덮습니다. 이때 시스템 색이 그 팔레트의 색을 알려 줍니다. 덮이지 않는 속성에도 시스템 색을 쓰면 화면 전체가 한 팔레트로 맞춰집니다. 이 모드는 @media (forced-colors: active)로 알아냅니다.\n\n계산되는 때: 요소의 색 구성과 사용자 설정에 따라 정해집니다. 같은 Canvas라도 color-scheme: dark인 요소에서는 어두운 색입니다.\n\n주의: ActiveBorder, ButtonHighlight, ThreeDFace, Window 같은 옛 시스템 색 이름은 폐기되었습니다. 지문 수집을 막으려고 AccentColor와 AccentColorText에 고정 값을 돌려주는 브라우저도 있습니다.",
        tables: [
          {
            caption: "표준 시스템 색",
            head: ["낱말", "쓰는 곳"],
            rows: [
              ["AccentColor", "강조된 컨트롤의 배경"],
              ["AccentColorText", "강조된 컨트롤의 글자"],
              ["ActiveText", "누르고 있는 링크의 글자"],
              ["ButtonBorder", "컨트롤의 기본 테두리"],
              ["ButtonFace", "컨트롤의 배경"],
              ["ButtonText", "컨트롤의 글자"],
              ["Canvas", "문서나 앱 내용의 배경"],
              ["CanvasText", "문서나 앱 내용의 글자"],
              ["Field", "입력 칸의 배경"],
              ["FieldText", "입력 칸의 글자"],
              ["GrayText", "비활성 항목의 글자"],
              ["Highlight", "선택한 항목의 배경"],
              ["HighlightText", "선택한 항목의 글자"],
              ["LinkText", "방문하지 않은 링크의 글자"],
              ["Mark", "mark 요소처럼 표시한 글자의 배경"],
              ["MarkText", "표시한 글자"],
              ["SelectedItem", "선택한 항목(체크박스 등)의 배경"],
              ["SelectedItemText", "선택한 항목의 글자"],
              ["VisitedText", "방문한 링크의 글자"],
            ],
          },
        ],
        code: "@media (forced-colors: active) {\n  .badge { border: 1px solid CanvasText; }   /* 고대비 팔레트에 맞춤 */\n}\n.my-btn { background: ButtonFace; color: ButtonText; border: 1px solid ButtonBorder; }",
        codeLang: "css",
        terms: [
          {
            term: "강제 색 모드 (forced colors mode)",
            body: "사용자가 고른 몇 가지 색으로 화면 전체를 바꾸는 접근성 기능입니다. Windows 고대비 모드가 대표적입니다. 작성자가 정한 색 대부분을 덮어씁니다. 집 안 전구를 모두 사용자가 고른 색 전구로 바꿔 끼우는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: light-dark()와 currentcolor",
        body: "작은 창의 :root에는 color-scheme: light가 미리 들어 있습니다. 둘째 카드와 셋째 상자만 color-scheme: dark를 받습니다.\n(1) 첫 카드는 밝은 색 구성이라 light-dark()의 첫째 색이 나옵니다. 둘째 카드는 둘째 색입니다. 배경도 같은 식으로 갈립니다.\n(2) 두 카드 모두 border-top-color가 자기 color와 같습니다. 테두리 색을 currentcolor로 적었기 때문입니다.\n(3) 셋째 상자의 Canvas와 CanvasText는 어두운 색 구성의 시스템 색입니다. 그래서 어두운 배경에 밝은 글자입니다.",
        lab: {
          html: `<style>
  .card { color: light-dark(#1d4ed8, #93c5fd); background: light-dark(#fff, #0f172a);
          border: 3px solid currentcolor; padding: 4px 10px; margin: 6px 0; }
  .dark { color-scheme: dark; }
  .sys { background: Canvas; color: CanvasText; padding: 4px 10px; }
</style>
<div class="card">:root의 color-scheme: light</div>
<div class="card dark">color-scheme: dark</div>
<div class="sys dark">Canvas, CanvasText (dark)</div>`,
          height: 190,
          checks: [
            { label: "첫 카드 color", expr: "getComputedStyle(document.querySelectorAll('.card')[0]).color" },
            { label: "첫 카드 border-top-color", expr: "getComputedStyle(document.querySelectorAll('.card')[0]).borderTopColor" },
            { label: "둘째 카드 color", expr: "getComputedStyle(document.querySelectorAll('.card')[1]).color" },
            { label: "둘째 카드 border-top-color", expr: "getComputedStyle(document.querySelectorAll('.card')[1]).borderTopColor" },
            { label: "셋째 상자 background-color", expr: "getComputedStyle(document.querySelector('.sys')).backgroundColor" },
            { label: "셋째 상자 color", expr: "getComputedStyle(document.querySelector('.sys')).color" },
          ],
          tryIt: "첫 카드에 style=\"color-scheme: dark\"를 넣어 보세요. 글자색, 테두리, 배경이 함께 어두운 쪽으로 바뀝니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "색 문법은 조금만 어긋나도 선언 전체가 버려집니다. 계산값의 꼴이 적은 문법과 다르다는 점도 자주 헷갈립니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["rgb(255 0 153, 0.5)처럼 공백과 쉼표를 섞었다", "틀린 값이라 선언이 무시된다", "rgb(255 0 153 / 0.5)"],
              ["hsl()로 밝기를 맞춘 팔레트", "색상마다 밝기가 달라 보인다", "oklch()로 L을 맞춘다"],
              ["light-dark()만 쓰고 color-scheme은 안 줬다", "다크 모드에서도 밝은 쪽 색이 나온다", ":root { color-scheme: light dark }"],
              ["getComputedStyle 값을 적은 hex 문자열과 비교했다", "rgb() 꼴로 나와 늘 다르다고 나온다", "rgb() 꼴끼리 비교한다"],
              ["color-mix() 비율 합이 100% 미만", "결과가 반투명해진다", "합을 100%로 맞추거나 하나만 적는다"],
              ["#f09a를 불투명한 색으로 알았다", "4자리 꼴은 알파가 든 반투명 색", "불투명이면 3자리나 6자리"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) hsl(330 100% 50%)을 getComputedStyle로 읽으면 어떤 꼴로 나오나요?\n2) #f09a와 #ff0099aa는 같은 색인가요?\n3) color-scheme 선언 없이 light-dark(white, black)은 어느 색이 되나요?\n4) 강제 색 모드에서 시스템 색을 쓰면 무엇이 좋나요?",
      },
    ],
    sources: [
      { label: "MDN — <color>", href: `${MDN}/Reference/Values/color_value` },
      { label: "MDN — <named-color>", href: `${MDN}/Reference/Values/named-color` },
      { label: "MDN — <hex-color>", href: `${MDN}/Reference/Values/hex-color` },
      { label: "MDN — <system-color>", href: `${MDN}/Reference/Values/system-color` },
      { label: "MDN — oklch()", href: `${MDN}/Reference/Values/color_value/oklch` },
      { label: "MDN — color-mix()", href: `${MDN}/Reference/Values/color_value/color-mix` },
    ],
  },
  {
    id: "css-val-function",
    name: "변수와 그 밖의 함수",
    tagline: "값 자리에 다른 곳의 값을 끌어오는 함수들",
    intro:
      "어떤 함수는 계산하지 않고 다른 곳에서 값을 가져옵니다. var()는 커스텀 속성에서, env()는 브라우저가 정한 환경 변수에서, attr()은 HTML 속성에서 값을 가져옵니다. url()은 파일을, counter()와 counters()는 카운터의 현재 값을 가져옵니다. image-set()과 그러데이션 함수는 이미지 값을 만듭니다. 커스텀 속성 자체는 11장에 있습니다. 이 시트는 함수마다 문법, 값이 정해지는 때, 대체값의 동작을 정리합니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "앞의 셋은 값을 바꿔 넣는 함수라서, 바꿔 넣은 결과가 틀리면 같은 방식으로 실패합니다. 지원 버전은 둘째 표에 있습니다.",
        tables: [
          {
            head: ["값", "뜻", "쓰는 곳", "자세히"],
            rows: [
              ["var()", "커스텀 속성의 값", "모든 속성 값", "11장 · 커스텀 속성과 함수"],
              ["env()", "브라우저가 정한 환경 변수", "속성 값", ""],
              ["attr()", "요소의 HTML 속성 값", "content (그 밖은 실험)", ""],
              ["url()", "파일 주소", "배경, 글꼴, 커서, 목록 표지", ""],
              ["counter(), counters()", "카운터의 현재 값을 글자로", "content", ""],
              ["image-set()", "해상도에 맞는 이미지 고르기", "background-image 등", ""],
              ["linear-gradient() 등", "색이 이어지는 이미지", "background-image 등", ""],
            ],
          },
          {
            caption: "지원 버전",
            head: ["함수", "Chrome", "Safari", "Firefox"],
            rows: [
              ["var()", "49", "9.1", "31"],
              ["env()", "69", "11.1", "65"],
              ["attr() (content에서)", "2", "3.1", "1"],
              ["url()", "1", "1", "1"],
              ["counter()", "1", "3", "1"],
              ["그러데이션", "26", "7", "3.6"],
            ],
          },
        ],
      },
      {
        label: "var()",
        body: "커스텀 속성(--로 시작하는 이름)의 값을 다른 속성 값의 일부나 전체에 넣습니다. var(--이름, 대체값) 꼴이고 대체값은 빼도 됩니다. 속성 이름, 선택자처럼 속성 값이 아닌 곳에는 쓸 수 없습니다.\n\n대체값은 커스텀 속성이 '보장된 무효 값'일 때 쓰입니다.\n1) 그 요소에 맞는 선언이 없고, @property로 initial-value를 등록하지도 않았을 때\n2) 등록하지 않은 커스텀 속성에 initial을 주었을 때\n3) 서로를 참조하는 순환처럼 계산값 시점에 무효일 때\n첫 쉼표 뒤는 모두 대체값입니다. var(--a, red, blue)의 대체값은 'red, blue'입니다. var(--a,)처럼 빈 대체값도 됩니다.\n\n계산되는 때: 계산값 시점에 바꿔 넣습니다. 그래서 파서는 var()가 든 선언을 일단 맞는 문법으로 받아 둡니다. 바꿔 넣은 결과가 그 속성에 맞지 않으면 '계산값 시점에 무효(IACVT)'가 됩니다. 그때 속성은 unset처럼 동작합니다. 상속 속성이면 부모 값, 아니면 초기값입니다. 앞의 다른 선언으로 돌아가지 않습니다.\n\n주의: color: 20px처럼 그냥 틀린 값은 파싱 때 버려져서 앞 선언이 남습니다. 같은 20px도 var()로 넣으면 앞 선언까지 잃습니다.",
        code: ":root { --brand: #0b5fff; }\n.btn { background: var(--brand); }\n.card h2 { color: var(--title-color, var(--brand, black)); }   /* 대체값 사슬 */\n.list { font-family: var(--fonts, system-ui, sans-serif); }   /* 대체값은 'system-ui, sans-serif' */",
        codeLang: "css",
        terms: [
          {
            term: "보장된 무효 값 (guaranteed-invalid value)",
            body: "커스텀 속성에 쓸 값이 없다는 뜻의 특별한 값입니다. 선언이 없거나 initial이면 이 값이 되고, var()는 대체값을 씁니다. 대체값도 없으면 그 선언은 계산값 시점에 무효가 됩니다. 빈칸으로 남겨 둔 서류 칸과 같습니다.",
          },
          {
            term: "계산값 시점에 무효 (IACVT)",
            body: "파싱 때는 맞는 문법이었지만, 값을 바꿔 넣고 보니 틀린 상태입니다. 이때 속성은 unset처럼 상속값이나 초기값이 됩니다. 앞 선언은 이미 버린 뒤라 돌아갈 수 없습니다. 주문을 받은 뒤에야 재료가 없음을 안 식당이 기본 메뉴를 내는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: var()의 대체값과 IACVT",
        body: "다섯 문단은 모두 .p에서 green 글자와 green 테두리를 받은 뒤, 각자 color를 다시 정합니다. 부모 div의 color는 rebeccapurple입니다.\n(1) a는 --main이 있어 tomato입니다.\n(2) b는 --missing이 없어 대체값 navy입니다.\n(3) c는 대체값도 없습니다. 계산값 시점에 무효가 되어 color가 unset처럼 동작합니다. color는 상속 속성이라 부모의 보라가 나옵니다. .p의 green으로 돌아가지 않습니다.\n(4) d는 --bad의 20px이 색이 아니라 무효입니다. 글자는 부모의 보라입니다. 테두리는 border-color의 초기값 currentcolor라서 역시 보라입니다.\n(5) e의 color: 20px은 파싱 때 버려집니다. 그래서 .p의 green이 남습니다.",
        lab: {
          html: `<style>
  .p { color: green; border: 3px solid green; margin: 4px 0; padding: 2px 8px; }
  .a { --main: tomato; color: var(--main); }
  .b { color: var(--missing, navy); }
  .c { color: var(--missing); }
  .d { --bad: 20px; color: var(--bad); border-color: var(--bad); }
  .e { color: 20px; }
</style>
<div style="color: rebeccapurple">
  <p class="p a">a: var(--main)</p>
  <p class="p b">b: var(--missing, navy)</p>
  <p class="p c">c: var(--missing)</p>
  <p class="p d">d: var(--bad), --bad는 20px</p>
  <p class="p e">e: color: 20px</p>
</div>`,
          height: 260,
          checks: [
            { label: "a의 color", expr: "getComputedStyle(document.querySelector('.a')).color" },
            { label: "b의 color", expr: "getComputedStyle(document.querySelector('.b')).color" },
            { label: "c의 color", expr: "getComputedStyle(document.querySelector('.c')).color" },
            { label: "d의 color", expr: "getComputedStyle(document.querySelector('.d')).color" },
            { label: "d의 border-top-color", expr: "getComputedStyle(document.querySelector('.d')).borderTopColor" },
            { label: "e의 color", expr: "getComputedStyle(document.querySelector('.e')).color" },
          ],
          tryIt: ".d의 --bad를 orange로 바꿔 보세요. 글자와 테두리가 모두 orange가 됩니다.",
        },
      },
      {
        label: "env()",
        body: "브라우저가 정한 환경 변수의 값을 넣습니다. env(이름, 대체값) 꼴입니다. var()와 비슷하지만, 값은 작성자가 아니라 브라우저가 정하고 문서 전체에 하나뿐입니다. 이름은 대소문자를 가립니다.\n\n가장 많이 쓰는 이름은 safe-area-inset-top, -right, -bottom, -left입니다. 노치나 둥근 모서리에 가리지 않는 안전 영역까지의 거리입니다. 화면이 직사각형이고 가리는 것이 없으면 0, 아니면 0보다 큰 px 값입니다. 그 밖에 PWA의 제목 표시줄 자리(titlebar-area-*), 화면 키보드(keyboard-inset-*), 접는 화면(viewport-segment-*) 같은 이름이 있습니다.\n\n계산되는 때: var()처럼 계산값 시점에 바꿔 넣습니다. 대체값은 그 이름의 변수가 없을 때만 씁니다. 바꿔 넣은 값이 맞지 않고 맞는 대체값도 없으면 계산값 시점에 무효가 됩니다. 그러면 초기값이나 상속값이 됩니다.\n\n주의: 변수가 있고 값이 0이면 대체값은 쓰이지 않습니다. 최소 여백이 필요하면 max(1rem, env(safe-area-inset-left))처럼 씁니다.",
        code: "footer { padding-bottom: env(safe-area-inset-bottom, 0px); }\n.bar { padding-left: max(1rem, env(safe-area-inset-left)); }   /* 최소 1rem */\nheader { height: env(titlebar-area-height, 40px); }",
        codeLang: "css",
        terms: [
          {
            term: "안전 영역 (safe area)",
            body: "노치, 둥근 모서리, 시스템 막대에 가리지 않고 내용이 다 보이는 직사각형입니다. safe-area-inset-*은 화면 가장자리에서 이 영역까지의 거리입니다. 액자 틀에 가리지 않고 보이는 그림 부분과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: env()의 대체값은 언제 쓰이나",
        body: "세 문단의 padding-top을 env()로 정했습니다. 노치 없는 컴퓨터 화면에서 보면 이렇습니다.\n(1) a는 safe-area-inset-top이 있는 변수라서 그 값 0을 씁니다. 대체값 30px은 쓰이지 않습니다.\n(2) b는 없는 이름이라 대체값 30px을 씁니다.\n(3) c는 max()로 감싸서 0과 12px 중 큰 쪽입니다.\n노치가 있는 휴대폰에서는 a와 c의 값이 달라질 수 있습니다.",
        lab: {
          html: `<style>
  .p { margin: 4px 0; background: #e0f2fe; }
  .a { padding-top: env(safe-area-inset-top, 30px); }
  .b { padding-top: env(no-such-variable, 30px); }
  .c { padding-top: max(12px, env(safe-area-inset-top)); }
</style>
<p class="p a">a: env(safe-area-inset-top, 30px)</p>
<p class="p b">b: env(no-such-variable, 30px)</p>
<p class="p c">c: max(12px, env(safe-area-inset-top))</p>`,
          height: 170,
          checks: [
            { label: "a의 padding-top", expr: "getComputedStyle(document.querySelector('.a')).paddingTop" },
            { label: "b의 padding-top", expr: "getComputedStyle(document.querySelector('.b')).paddingTop" },
            { label: "c의 padding-top", expr: "getComputedStyle(document.querySelector('.c')).paddingTop" },
          ],
          tryIt: "b의 대체값 30px을 지워 보세요. 바꿔 넣을 값이 없어 계산값 시점에 무효가 되고, padding-top은 초기값 0이 됩니다.",
        },
      },
      {
        label: "attr()",
        body: "요소의 HTML 속성 값을 읽어 속성 값에 넣습니다. 가상 요소에서 쓰면 그 가상 요소를 만든 요소의 속성을 읽습니다. 오래전부터 모든 브라우저가 지원한 쓰임은 content 속성 하나입니다. content: attr(data-label)처럼 글자로 넣습니다.\n\n새 문법은 attr(이름 타입, 대체값) 꼴입니다. 타입은 raw-string(기본, 글자 그대로), type(<number>) 같은 type() 함수, 또는 px, %, deg 같은 단위입니다. attr(data-w px)는 '220'을 220px로 읽습니다. 속성이 없거나 그 타입으로 읽을 수 없으면 대체값을 씁니다. MDN은 content 밖에서 쓰는 이 새 문법을 실험 기능으로 표시합니다.\n\n계산되는 때: var()처럼 계산값 시점에 바꿔 넣습니다. 그래서 커스텀 속성에 attr()을 넣으면 그 커스텀 속성을 선언한 요소의 속성을 읽고, 자식에게는 읽은 결과가 상속됩니다.\n\n주의: 보안 때문에 attr()로 주소를 만들 수 없습니다. url(attr(data-icon))이나 image-set(attr(…))은 계산값 시점에 무효가 됩니다. 새 문법을 지원하는지는 @supports (x: attr(x type(*)))로 확인합니다.",
        code: "a[href^=\"http\"]::after { content: \" (\" attr(href) \")\"; }   /* content: 모든 브라우저 */\n.bar { width: attr(data-w px, 60px); }                     /* 타입 지정: 실험 */\n@supports (x: attr(x type(*))) { /* 새 attr() 지원 */ }",
        codeLang: "css",
      },
      {
        label: "직접 해 보기: attr()을 content 밖에서",
        body: "두 막대는 width: attr(data-w px, 60px)를 받습니다. 아래 문단의 ::after는 content에 attr()을 씁니다.\n(1) 문단 뒤의 괄호 글자는 어느 브라우저에서나 보입니다. content의 attr()은 오래된 기능입니다.\n(2) 지금 값의 '새 attr() 지원'이 true면, 첫 막대는 data-w의 220을 px로 읽은 폭입니다. 둘째 막대는 'abc'를 수로 읽을 수 없어 대체값 60px입니다.\n(3) false면 브라우저가 width 선언을 이해하지 못해 버립니다. 두 막대 모두 width: auto라 body 폭만큼 넓습니다.",
        lab: {
          html: `<style>
  .bar { height: 16px; margin: 4px 0; background: #93c5fd; width: attr(data-w px, 60px); }
  .tag::after { content: " (" attr(data-note) ")"; color: #b45309; }
</style>
<div class="bar" data-w="220"></div>
<div class="bar" data-w="abc"></div>
<p class="tag" data-note="data-note에서 읽은 글자">문단</p>`,
          height: 130,
          checks: [
            { label: "새 attr() 지원", expr: "CSS.supports('x: attr(x type(*))')" },
            { label: "첫 막대 폭(px), data-w=220", expr: "Math.round(document.querySelectorAll('.bar')[0].getBoundingClientRect().width)" },
            { label: "둘째 막대 폭(px), data-w=abc", expr: "Math.round(document.querySelectorAll('.bar')[1].getBoundingClientRect().width)" },
            { label: "body 내용 폭", expr: "document.body.clientWidth" },
          ],
          tryIt: "첫 막대의 data-w를 120으로 바꿔 보세요. 새 attr()을 지원하는 브라우저에서는 막대가 짧아집니다.",
        },
      },
      {
        label: "url()",
        body: "파일을 가리키는 함수입니다. 절대 주소, 상대 주소, data: 주소, blob 주소를 받습니다. SVG 안의 요소는 url(#id)로 가리킵니다. 따옴표는 대개 빼도 됩니다. 다만 주소에 괄호, 공백, 따옴표가 있으면 따옴표로 감쌉니다.\n\n상대 주소는 웹 페이지가 아니라 그 CSS 파일의 주소를 기준으로 풉니다. style 요소 안의 CSS는 문서의 주소가 기준입니다. 커스텀 속성에 넣은 url()은 바로 풀지 않습니다. var()로 쓰이는 곳의 스타일시트를 기준으로 풉니다.\n\n계산되는 때: background-image 같은 속성의 계산값에서 절대 주소가 됩니다. getComputedStyle은 url(\"https://…\") 꼴로 돌려줍니다.\n\n주의: url()로 감싸야 이미지입니다. 따옴표 글자 \"photo.jpg\"만 적으면 이미지가 아닙니다. 가리킨 파일이 이미지가 아니어도 이미지 자리에서는 쓸 수 없습니다.",
        code: "body { background: url(\"img/paper.png\") repeat; }          /* 이 CSS 파일 기준 상대 주소 */\nli { list-style-image: url(bullet.svg); }\n@font-face { font-family: Brand; src: url(/fonts/brand.woff2) format(\"woff2\"); }\n.icon { mask-image: url(\"sprite.svg#check\"); }",
        codeLang: "css",
        terms: [
          {
            term: "기준 주소 (base URL)",
            body: "상대 주소를 풀 때 앞에 이어 붙이는 주소입니다. CSS 파일 안의 url()은 그 CSS 파일의 주소가 기준입니다. 같은 'img/a.png'도 어느 파일에 적었느냐에 따라 다른 곳을 가리킵니다. '여기서 두 블록 앞'이라는 길 안내가 출발점에 따라 다른 곳인 것과 같습니다.",
          },
        ],
      },
      {
        label: "counter(), counters()",
        body: "카운터의 현재 값을 글자로 돌려줍니다. 카운터는 counter-reset으로 만들고 counter-increment로 올립니다. 카운터 자체는 보이지 않습니다. 보통 ::before, ::after, ::marker의 content에서 counter()로 꺼내 씁니다.\n\ncounter(이름, 스타일) 꼴입니다. 스타일은 decimal(기본), upper-roman, lower-alpha, hangul 같은 list-style-type 이름이나 @counter-style 이름입니다. counters(이름, 이어 붙일 글자, 스타일)는 중첩된 같은 이름의 카운터를 모두 이어 '1.2.3'처럼 만듭니다.\n\n계산되는 때: 화면을 그릴 때 문서 순서대로 셉니다.\n\n주의: 카운터 이름은 대소문자를 가립니다. none, unset, initial, inherit는 이름으로 쓸 수 없습니다. 번호가 내용에서 중요하면 HTML의 ol처럼 문서 구조로도 남깁니다.",
        code: "ol { counter-reset: item; }                          /* ol마다 새 카운터 */\nli { counter-increment: item; }\nli::marker { content: counters(item, \".\") \". \"; }    /* 1. 1.1. 1.2. … */\nh2::before { content: counter(sec, upper-roman) \" \"; }  /* sec도 reset, increment로 만든다 */",
        codeLang: "css",
      },
      {
        label: "<image>와 image-set()",
        body: "<image>는 그림 하나를 나타내는 타입입니다. url(), 그러데이션, image-set(), cross-fade(), element()(실험) 같은 값이 이 자리에 옵니다. background-image, list-style-image, border-image-source, mask-image, content에 씁니다.\n\nimage-set()은 해상도별 후보를 주고 브라우저가 고르게 합니다. image-set(\"a.png\" 1x, \"a-2x.png\" 2x) 꼴입니다. 후보마다 해상도가 달라야 합니다. type(\"image/avif\")로 형식을 적으면 지원하지 않는 형식의 후보는 건너뜁니다.\n\n계산되는 때: 그릴 때 화면의 픽셀 밀도를 보고 후보를 고릅니다.\n\n주의: 그러데이션처럼 원래 크기가 없는 이미지는 놓이는 상자의 크기를 따릅니다. 배경 이미지는 화면 낭독기에 전해지지 않습니다. 뜻이 있는 그림은 HTML의 img와 alt로 넣습니다.",
        code: ".logo { background-image: image-set(\"logo.png\" 1x, \"logo-2x.png\" 2x); }\n.hero { background-image: image-set(\"hero.avif\" type(\"image/avif\"), \"hero.jpg\" type(\"image/jpeg\")); }",
        codeLang: "css",
      },
      {
        label: "<gradient>",
        body: "둘 이상의 색이 이어지는 이미지입니다. <image>의 한 종류라서 background-color가 아니라 background-image 같은 이미지 자리에 씁니다. 원래 크기가 없어서 놓인 상자의 크기를 따릅니다. 함수는 아래 표와 같습니다.\n\nlinear-gradient()의 방향은 to right 같은 낱말이나 135deg 같은 각도로 적습니다. 빼면 위에서 아래(to bottom)입니다. 색 멈춤은 '색 위치'로 적습니다. red 0 10px처럼 위치를 둘 주면 그 구간이 한 색입니다. 위치가 같은 두 멈춤은 경계를 날카롭게 만듭니다.\n\n계산되는 때: 그릴 때 상자 크기로 정해집니다. 색은 알파를 미리 곱한 공간에서 섞여서, transparent로 이어도 회색 띠가 생기지 않습니다.\n\n주의: 그러데이션은 이미지라서 background-color에 쓰면 틀린 값입니다. background 단축 속성이나 background-image에 씁니다.",
        tables: [
          {
            caption: "그러데이션 함수",
            head: ["함수", "모양", "예"],
            rows: [
              ["linear-gradient()", "한 직선을 따라", "linear-gradient(to right, red, blue)"],
              ["radial-gradient()", "한 점에서 원, 타원으로 퍼짐", "radial-gradient(circle, gold, transparent)"],
              ["conic-gradient()", "한 점을 중심으로 돌며", "conic-gradient(#3f87a6 0 70%, #eee 0)"],
              ["repeating-linear-gradient() 등 셋", "멈춤 구간을 되풀이해 채움", "repeating-linear-gradient(45deg, #000 0 6px, #fff 6px 12px)"],
            ],
          },
        ],
        code: ".hero    { background: linear-gradient(135deg, #f69d3c, #3f87a6); }\n.pie     { background: conic-gradient(#3f87a6 0 70%, #eee 0); border-radius: 50%; }\n.stripes { background: repeating-linear-gradient(45deg, #000 0 6px, #fff 6px 12px); }",
        codeLang: "css",
        terms: [
          {
            term: "색 멈춤 (color stop)",
            body: "그러데이션에서 어느 위치에 어떤 색이 오는지 적은 점입니다. 멈춤 사이는 색이 이어지고, 같은 위치의 두 멈춤은 경계를 날카롭게 만듭니다. 물감 띠 위에 꽂아 둔 색 핀과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: url(), image-set(), 그러데이션의 계산값",
        body: "세 상자의 배경을 url(), image-set(), linear-gradient()로 정했습니다.\n(1) .u의 지금 값은 적은 'photo-400.svg'가 아니라 https://로 시작하는 절대 주소입니다. background-image의 계산값에서 url()이 절대 주소가 되기 때문입니다. 기준은 이 문서(/labs/html/play.html)의 주소입니다.\n(2) 가운데 상자에는 1x나 2x 글자가 보입니다. 브라우저가 화면의 픽셀 밀도를 보고 후보를 고른 결과입니다. 지금 값의 devicePixelRatio와 '2dppx 이상인가' 줄을 함께 보세요. 고해상도 화면이면 보통 2x입니다.\n(3) .g의 지금 값에서 red와 blue가 rgb( ) 꼴로 바뀌어 있습니다. 그러데이션 안의 색도 계산된 색이 됩니다.",
        lab: {
          html: `<style>
  .u { height: 40px; background: url(photo-400.svg) center / cover; }
  .i { width: 80px; height: 80px; margin: 6px 0;
       background-image: image-set("dot-1x.svg" 1x, "dot-2x.svg" 2x); background-size: 80px 80px; }
  .g { height: 24px; background-image: linear-gradient(to right, red, blue); }
</style>
<div class="u"></div>
<div class="i"></div>
<div class="g"></div>`,
          height: 200,
          checks: [
            { label: ".u의 background-image", expr: "getComputedStyle(document.querySelector('.u')).backgroundImage" },
            { label: "devicePixelRatio", expr: "devicePixelRatio" },
            { label: "2dppx 이상인가", expr: "matchMedia('(resolution >= 2dppx)').matches" },
            { label: ".g의 background-image", expr: "getComputedStyle(document.querySelector('.g')).backgroundImage" },
          ],
          tryIt: "image-set에서 2x 후보를 지워 보세요. 고해상도 화면에서도 1x 그림이 나옵니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "값을 끌어오는 함수는 파싱 때가 아니라 계산값 시점에 실패합니다. 그래서 앞 선언으로 돌아가지 않는다는 점이 가장 큰 함정입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["color: var(--x)인데 --x가 색이 아니다", "앞 선언으로 돌아가지 않고 상속값이나 초기값이 된다", "대체값을 주거나 @property로 타입을 등록한다"],
              ["var(--a, red, blue)를 대체값 하나로 생각했다", "대체값이 'red, blue' 전체가 된다", "대체값 안의 쉼표에 주의한다"],
              ["env(safe-area-inset-left, 1rem)으로 최소 여백을 기대했다", "변수가 0이면 대체값 대신 0이 된다", "max(1rem, env(safe-area-inset-left))"],
              ["url(attr(data-icon))", "보안 규칙으로 계산값 시점에 무효가 된다", "주소는 CSS나 style 속성에 직접 적는다"],
              ["커스텀 속성에 상대 주소 url()을 담았다", "var()를 쓴 스타일시트 기준으로 풀려 경로가 틀어진다", "절대 주소나 /로 시작하는 주소"],
              ["background-color: linear-gradient(…)", "그러데이션은 이미지라 선언이 무시된다", "background-image나 background"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 부모의 color가 보라일 때 color: var(--없는-이름)은 어떤 색이 되나요?\n2) 노치 없는 화면에서 env(safe-area-inset-top, 30px)은 왜 30px이 아닌가요?\n3) attr()을 content 밖에서 쓰기 전에 무엇을 확인해야 하나요?\n4) 커스텀 속성에 담은 상대 주소 url()은 어느 주소를 기준으로 풀리나요?",
      },
    ],
    sources: [
      { label: "MDN — var()", href: `${MDN}/Reference/Values/var` },
      { label: "MDN — env()", href: `${MDN}/Reference/Values/env` },
      { label: "MDN — attr()", href: `${MDN}/Reference/Values/attr` },
      { label: "MDN — url()", href: `${MDN}/Reference/Values/url_function` },
      { label: "MDN — counter()", href: `${MDN}/Reference/Values/counter` },
      { label: "MDN — <gradient>", href: `${MDN}/Reference/Values/gradient` },
    ],
  },
];
