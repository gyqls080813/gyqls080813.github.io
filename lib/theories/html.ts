import type { Theory } from ".";

/**
 * HTML — MDN의 'Structuring content with HTML' 학습 순서를 따라 열다섯 장으로 세운다.
 *
 * 다른 허브와 다른 점은 장마다 '직접 해 보기'(block.lab)가 있다는 것이다. 코드를 고쳐 실행하면
 * public/labs/html/play.html이 그 코드를 진짜 작은 창(iframe)에 넣고, lib/lab/engine이 그 창에서
 * 브라우저가 실제로 낸 이벤트를 기록한다. 본문의 '눌러 보면' 숫자는 Chrome 156에서 그 기록을
 * 그대로 옮긴 것이다. 출처는 developer.mozilla.org의 Learn_web_development/Core/Structuring_content와
 * Web/HTML/Reference, 그리고 WHATWG HTML 표준이다.
 */

const LEARN = "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content";
const REF = "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference";
const SPEC = "https://html.spec.whatwg.org/multipage";

export const htmlTheories: Theory[] = [
  {
    id: "html",
    name: "HTML",
    tagline: "태그는 뜻을 적고, 동작은 브라우저가 붙인다",
    intro:
      "HTML은 글에 뜻을 붙이는 언어입니다. '이건 제목', '이건 다른 문서로 가는 길', '이건 이메일을 받는 칸'처럼요. 뜻을 붙이면 브라우저가 거기에 맞는 동작을 붙여 줍니다. 링크는 누르면 이동하고, 폼은 보내기 전에 칸을 검사하고, details는 스크립트 없이 열리고 닫힙니다.\n\n이 허브는 MDN의 'HTML로 내용 구조 잡기' 학습 순서를 따라 열다섯 장으로 나눕니다. 장마다 '직접 해 보기'가 있습니다. 코드를 고쳐 실행하면 진짜 브라우저 창에 들어가고, 그 창을 누르면 브라우저가 실제로 낸 이벤트가 순서대로 기록됩니다. 읽고 끝나는 예제가 아니라, 눌러서 동작을 확인하는 예제입니다.",
    blocks: [
      {
        label: "열다섯 장을 나눈 기준",
        body: "앞의 다섯 장은 글자 하나하나에 뜻을 붙이는 법입니다. 가운데 두 장은 문서 전체의 뼈대와, 문서와 문서를 잇는 링크입니다. 그다음 세 장은 이미지, 영상, 다른 페이지처럼 바깥 파일을 들여오는 법입니다. 표와 폼 세 장은 값을 보여 주고 받는 법입니다. 마지막 두 장은 스크립트 없이 스스로 움직이는 요소와, 모든 요소에 붙는 속성입니다. 순서는 MDN 학습 모듈과 같고, MDN이 참고서로만 다루는 dialog, popover, 전역 속성을 뒤에 더했습니다.",
        tables: [
          {
            caption: "다섯 묶음, 열다섯 장",
            head: ["묶음", "장", "묻는 것"],
            rows: [
              ["글을 적는 법", "1 문법과 파서\n2 head와 메타데이터\n3 제목, 문단, 강조\n4 목록\n5 고급 텍스트", "이 글자는 무엇인가"],
              ["문서를 세우는 법", "6 문서 구조와 랜드마크\n7 링크", "문서는 어떻게 생겼고, 어디로 이어지나"],
              ["바깥 것을 들이는 법", "8 이미지\n9 비디오와 오디오\n10 iframe과 임베드", "다른 파일을 어떻게 가져와 보여 주나"],
              ["값을 다루는 법", "11 표\n12 폼과 버튼\n13 폼 검증", "칸에 담긴 값을 어떻게 보여 주고 받나"],
              ["스스로 움직이는 것", "14 열고 닫는 요소\n15 전역 속성", "스크립트 없이 어디까지 되나"],
            ],
          },
        ],
      },
      {
        label: "찾아보는 두 갈래: 태그 참고서와 속성 참고서",
        body: "1~15장은 순서대로 읽는 쪽입니다. 그 옆에 찾아보는 쪽 두 갈래를 두었습니다. 태그 참고서는 지금 표준의 태그 107개를 열한 묶음으로 나눠, 태그마다 뜻과 그 태그만의 속성을 적었습니다. 속성 참고서는 전역 속성, 링크와 리소스, 폼, input의 type, 이미지와 표, ARIA 여섯 장으로 속성의 값과 함정을 모았습니다. 두 참고서에도 직접 해 보기가 있습니다. 장을 읽다가 처음 보는 태그나 속성이 나오면 참고서에서 찾고, 참고서에서 동작이 궁금하면 '자세히' 칸의 장으로 갑니다.",
      },
      {
        label: "직접 해 보기 쓰는 법",
        body: "직접 해 보기는 세 칸입니다.\n(1) 코드: 고칠 수 있습니다. 고친 뒤 '이 코드로 실행'을 누르면 작은 창에 그대로 들어갑니다. '처음 코드로'는 원래 코드로 되돌립니다.\n(2) 작은 창: 진짜 브라우저 창(iframe)입니다. 위 주소 줄은 그 창의 실제 주소이고, 0.4초마다 다시 읽습니다. 링크를 누르면 이 창이 실제로 이동합니다.\n(3) 일어난 일: 작은 창에서 난 일을 시간 순서대로 적습니다. 왼쪽 숫자는 누른 순간부터 걸린 시간입니다.\n\n지금 값 표가 있는 블록은 작은 창 안에서 식을 계속 다시 계산해 보여 줍니다. 눌러서 값이 어떻게 바뀌는지 볼 수 있습니다. 아래 작은 창에서 링크와 버튼을 눌러 보세요.",
        tables: [
          {
            caption: "기록 줄의 꼬리표",
            head: ["꼬리표", "누가 적나", "뜻"],
            rows: [
              ["클릭", "작은 창의 click 이벤트", "무엇을 눌렀는지. 페이지 코드보다 먼저 받아 적습니다."],
              ["주소", "a.href, FormData", "href 글자가 풀린 진짜 주소, 폼이 보낼 값"],
              ["예상", "HTML 표준의 규칙", "브라우저가 고를 길을 규칙대로 미리 읽은 것"],
              ["실제", "브라우저가 낸 이벤트", "pagehide, load, hashchange, invalid, toggle 같은 진짜 이벤트"],
              ["막힘", "event.defaultPrevented", "페이지 코드가 기본 동작을 막았거나, 검증에 걸린 것"],
              ["출력, 에러", "작은 창의 console.log, 에러", "코드 안 script가 적은 것"],
              ["준비", "직접 해 보기", "작은 창에 코드를 넣고 다 읽었을 때"],
            ],
          },
        ],
        lab: {
          html: `<p>링크와 버튼을 눌러 보세요.</p>
<a href="#bottom">아래로 가기 (#bottom)</a>
<button onclick="console.log('버튼의 onclick이 돌았습니다')">버튼</button>
<div style="height: 320px"></div>
<p id="bottom">여기가 id="bottom"입니다.</p>`,
          height: 170,
          checks: [
            { label: "location.hash", expr: "location.hash" },
            { label: "scrollY", expr: "Math.round(scrollY)" },
          ],
          tryIt: "버튼을 누르면 예상 줄이 '폼 밖이라 보낼 폼이 없다'고 적습니다. button의 기본 type은 submit이기 때문입니다(12장).",
        },
        notes: [
          {
            title: "작은 창에 미리 넣어 둔 것",
            body: "작은 창의 문서(play.html)에는 세 가지 스타일만 미리 들어 있습니다. body의 여백과 글꼴, 그리고 :target에 주황 테두리입니다. 나머지는 브라우저 기본 스타일입니다. 코드는 문서를 읽는 도중 document.write로 써 넣습니다. 그래서 코드 안의 <script>도 보통 페이지처럼 실행됩니다. 지금 값 표가 부르는 도우미 함수 셋(labDom, labOutline, labLandmarks)도 미리 넣어 두었습니다. 각각 DOM 나무, 제목 개요, 랜드마크를 글자로 뽑습니다.",
            bottom: true,
          },
          {
            title: "뒤로 가기를 누르면",
            body: "작은 창이 이동하면 그 기록이 브라우저의 방문 기록에도 쌓입니다. iframe의 이동도 탭 하나의 기록에 함께 들어가기 때문입니다(7장). 그래서 실험 뒤에 브라우저의 뒤로 가기를 누르면 이 페이지를 떠나기 전에 작은 창이 먼저 뒤로 갑니다.",
            bottom: true,
          },
        ],
      },
      {
        label: "문제의 구조: 태그 하나에 세 가지가 따라온다",
        body: "요소를 고르면 세 가지가 함께 정해집니다. 기본 모양, 기본 동작, 그리고 보조 기술(화면 낭독기)에 알리는 역할입니다. <a href>는 밑줄이 있고, 누르면 이동하고, Tab으로 갈 수 있고, '링크'라고 읽힙니다. <div>에 onclick을 달면 모양은 흉내 낼 수 있지만 나머지 둘은 직접 다시 만들어야 합니다. 키보드 포커스, Enter로 누르기, 역할 알리기입니다. 이 허브의 장들은 결국 '이 뜻을 고르면 무엇이 공짜로 따라오나'를 하나씩 확인합니다.",
        tables: [
          {
            caption: "요소를 고르면 함께 정해지는 것",
            head: ["요소", "기본 모양", "기본 동작", "역할"],
            rows: [
              ["<a href>", "밑줄, 파란 글자", "누르면 이동, Tab으로 감 (7장)", "link"],
              ["<button>", "버튼 테두리", "폼 안이면 보내기 (12장)", "button"],
              ["<h1>~<h6>", "크고 굵게", "없음. 개요를 만듦 (3장)", "heading, level 1~6"],
              ['<input type="email">', "입력 칸", "보내기 전에 형식 검사 (13장)", "textbox"],
              ["<details>", "삼각형 표시", "누르면 열고 닫음 (14장)", "group"],
              ["<div>", "없음 (블록)", "없음", "generic: 역할 없음"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "1장 문법과 파서부터 읽습니다. 브라우저가 코드를 어떻게 읽어 DOM으로 바꾸는지, 틀린 코드를 어떻게 고쳐 읽는지가 나머지 장의 바탕입니다. 브라우저가 그 DOM을 화면에 그리는 과정은 브라우저 렌더링 허브가, 모양을 바꾸는 규칙은 CSS 허브가 다룹니다. 이 허브는 그 사이에서 '무엇을 적느냐'를 다룹니다.",
      },
    ],
    sources: [
      { label: "MDN — Structuring content with HTML", href: LEARN },
      { label: "MDN — HTML elements reference", href: `${REF}/Elements` },
      { label: "WHATWG — HTML Living Standard", href: `${SPEC}/` },
    ],
  },

  {
    id: "html-s1",
    name: "1장 · 문법과 파서",
    tagline: "파서는 틀린 코드에서 멈추지 않고, 고쳐서 읽는다",
    intro:
      "HTML 문서는 요소로 이뤄집니다. 요소는 시작 태그, 내용, 끝 태그로 이뤄지고, 시작 태그에 속성을 붙입니다. 브라우저의 HTML 파서는 이 글자들을 읽어 DOM이라는 나무를 만듭니다. 중요한 점은 파서가 틀린 코드를 만나도 멈추지 않는다는 것입니다. 표준에 적힌 규칙대로 고쳐서 읽습니다. 그래서 '화면에 잘 보이니까 맞게 적었다'가 성립하지 않습니다. 이 장은 파서가 내 코드를 어떻게 고쳐 읽었는지를 작은 창에서 직접 봅니다.",
    blocks: [
      {
        label: "요소, 태그, 속성",
        body: "<p class=\"note\">안녕</p>에서 <p class=\"note\">는 시작 태그, </p>는 끝 태그, 둘을 합친 전체가 요소입니다. class=\"note\"는 속성입니다. MDN은 속성 값을 늘 따옴표로 감싸라고 적습니다. '오류와 뜻밖의 동작을 막고 코드를 읽기 쉽게 한다'는 이유입니다. 태그 이름은 대소문자를 가리지 않습니다. <br>, <img>, <input>, <meta>처럼 내용을 가질 수 없는 요소는 빈 요소(void element)라 끝 태그가 없습니다. <br />의 /는 적어도 되지만 필요하지 않습니다.",
        code: '<p class="note">안녕</p>\n│        │      │     └ 끝 태그\n│        │      └ 내용\n│        └ 속성 (이름="값")\n└ 시작 태그\n\n<img src="cat.png" alt="고양이">   <!-- 빈 요소: 끝 태그가 없다 -->\n<input type="checkbox" checked>    <!-- 불 속성: 이름만 적어도 켜진다 -->',
        codeLang: "text",
        terms: [
          {
            term: "요소 (element)",
            body: "시작 태그부터 끝 태그까지의 한 덩어리입니다. 태그는 글자이고, 요소는 그 글자로 만든 물건입니다. 파서가 요소를 하나씩 DOM 나무의 가지로 만듭니다. 상자에 붙인 이름표(태그)와 그 상자(요소)의 관계와 같습니다.",
          },
          {
            term: "DOM",
            body: "Document Object Model의 줄임말로, 파서가 HTML 글자를 읽어 만든 나무 모양의 객체입니다. 자바스크립트가 만지는 것도, 화면에 그려지는 것도 소스 글자가 아니라 이 나무입니다. 설계도(HTML)를 보고 지은 집(DOM)이라, 설계도에 틀린 곳이 있으면 목수가 고쳐서 짓습니다.",
          },
          {
            term: "빈 요소 (void element)",
            body: "내용을 가질 수 없어 끝 태그가 없는 요소입니다. br, hr, img, input, link, meta, source, track, wbr 등입니다. 이미 닫힌 상자라 안에 무엇을 넣을 수 없습니다.",
          },
        ],
      },
      {
        label: "중첩: 연 순서의 반대로 닫는다",
        body: "요소 안에 요소를 넣을 때는 나중에 연 것을 먼저 닫습니다. MDN은 '태그는 서로의 안쪽이나 바깥쪽에 있도록 열고 닫아야 한다'고 적습니다. <b><i>글</i></b>는 맞고, <b><i>글</b></i>는 겹쳐서 틀립니다. 틀려도 화면은 비슷하게 나옵니다. 파서가 고쳐 읽기 때문입니다. 아래 실험에서 그 고친 결과를 봅니다.",
        code: "<b><i>맞음</i></b>      <!-- 안쪽 i를 먼저 닫는다 -->\n<b><i>틀림</b></i>      <!-- 겹침: 파서가 고쳐 읽는다 -->",
        codeLang: "html",
      },
      {
        label: "직접 해 보기: 파서가 고쳐 쓴 DOM",
        body: "아래 코드에는 실수가 다섯 가지 있습니다. 지금 값의 DOM 나무를 보면 파서가 무엇을 어떻게 고쳤는지 보입니다.\n(1) 첫 <p>를 닫지 않았습니다. 다음 <p>가 나오는 순간 앞 p를 닫습니다.\n(2) <b><i>가 겹쳤습니다. </b>를 만나면 i를 닫고 b를 닫은 뒤, 남은 글자를 위해 <i>를 새로 하나 엽니다.\n(3) li의 끝 태그를 빠뜨렸습니다. 다음 <li>가 앞 li를 닫습니다.\n(4) <p> 안에 <div>를 넣었습니다. p는 div를 품을 수 없어 <div> 앞에서 p를 닫습니다. 남은 </p>는 짝이 없어 빈 <p></p>가 하나 생깁니다.\n(5) 대문자 태그와 따옴표 없는 속성은 소문자 이름과 값 그대로 들어갑니다.",
        lab: {
          html: `<p>첫 문단
<p>둘째 문단 <b><i>굵고 기울게</b> 기울기만?</i>
<ul><li>하나<li>둘</ul>
<p>문단 안의 <div>div</div></p>
<P CLASS=Upper>대문자 태그</P>`,
          height: 210,
          checks: [{ label: "labDom()", expr: "labDom()" }],
          tryIt: "<table>안에 <p>를 바로 넣어 보세요(11장). p가 표 밖으로 쫓겨납니다.",
        },
      },
      {
        label: "직접 해 보기: 불 속성은 있으면 켜진다",
        body: "disabled, checked, required, hidden 같은 불 속성은 값이 아니라 '있느냐 없느냐'로 정해집니다. MDN은 '불 속성을 붙이면 값으로 무엇을 넣든(값이 없어도) true가 된다'고 적습니다. 그래서 disabled=\"false\"는 꺼진 버튼을 만듭니다. 끄려면 속성을 통째로 지워야 합니다. 꺼진 버튼은 눌러도 click 이벤트조차 나지 않습니다. 기록에 아무것도 찍히지 않는 것이 그 결과입니다.",
        lab: {
          html: `<button disabled="false">disabled="false"인 버튼</button>
<button>disabled가 없는 버튼</button>
<p><label><input type="checkbox" checked="no"> checked="no"인 체크 상자</label></p>`,
          height: 130,
          checks: [
            { label: "첫 버튼의 disabled", expr: "document.querySelectorAll('button')[0].disabled" },
            { label: "체크 상자의 checked", expr: "document.querySelector('input').checked" },
          ],
          tryIt: '첫 버튼에서 disabled="false"를 통째로 지우고 실행해 보세요.',
        },
        terms: [
          {
            term: "불 속성 (boolean attribute)",
            body: "있으면 켜지고 없으면 꺼지는 속성입니다. 값은 보지 않습니다. 전등 스위치가 아니라 '전구를 끼웠느냐'라서, 전구에 'off'라고 적어도 불은 켜집니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 공백과 문자 참조",
        body: "MDN은 'HTML 파서는 연속된 공백을 화면에 그릴 때 하나로 줄인다'고 적습니다. 정확히는 파서가 아니라 그리는 단계의 규칙입니다. 지금 값을 보면 DOM의 textContent에는 공백과 줄바꿈이 그대로 남아 있습니다. 화면에 보이는 대로 읽는 innerText에서만 한 칸이 됩니다. CSS의 white-space: normal이 줄이는 것이고, <pre>는 그 값이 pre라 그대로 보입니다.\n\n<와 &는 태그와 문자 참조의 시작이라 글자로 쓰려면 &lt;와 &amp;로 적습니다. 문자 참조는 &로 시작해 ;로 끝납니다. MDN은 문서가 UTF-8이면 다른 기호(©, → 등)는 그대로 적어도 된다고 적습니다.",
        lab: {
          html: `<p>여러     칸의    공백과
줄바꿈은     한 칸이 됩니다.</p>
<pre>pre 안에서는     공백과
줄바꿈이 그대로입니다.</pre>
<p>&lt;p&gt;는 글자로, &amp;는 &amp;amp;로 적습니다. © →</p>`,
          height: 200,
          checks: [
            { label: "첫 p의 textContent", expr: "document.querySelector('p').textContent" },
            { label: "첫 p의 innerText", expr: "document.querySelector('p').innerText" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "파서가 고쳐 읽기 때문에 틀린 코드도 대개 화면에 나옵니다. 문제는 고친 결과가 내가 생각한 나무와 다를 때입니다. CSS 선택자가 안 맞고, 자바스크립트가 요소를 못 찾습니다.",
        tables: [
          {
            head: ["적은 것", "파서가 만든 것", "드러나는 증상"],
            rows: [
              ["<p>문단 <div>상자</div></p>", "<p>문단 </p><div>상자</div><p></p>", "p > div 선택자가 안 맞고 빈 p가 여백을 만든다"],
              ["<b><i>글</b> 뒤</i>", "<b><i>글</i></b><i> 뒤</i>", "i가 두 개가 되어 querySelectorAll 개수가 달라진다"],
              ["<a href=a.html title=새 창>", 'title="새" 그리고 이름이 "창"인 속성', "따옴표가 없어 공백에서 값이 끊긴다"],
              ['<input disabled="false">', "disabled 켜짐", "버튼이 안 눌린다"],
              ["<p>3 < 5 & 7</p>", "대개 글자로 읽지만 <5 같은 모양이면 태그가 된다", "글자가 사라진다"],
              ["<ul><div>…</div></ul>", "그대로 (파서가 고치지 않는다)", "낭독기가 목록 개수를 틀리게 읽는다 (4장)"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: HTML 파서는 멈추지 않는다",
        body: "XML이나 JSON은 틀린 글자 하나에서 읽기를 멈춥니다. HTML은 처음부터 사람이 손으로 적는 문서를 위해 만들어져서, 표준이 '이렇게 틀리면 이렇게 고쳐 읽는다'를 모든 경우에 적어 두었습니다. 그래서 어느 브라우저에서나 같은 틀린 코드가 같은 DOM이 됩니다. 대신 실수가 조용합니다. 개발자 도구의 Elements 탭이 보여 주는 것도 소스가 아니라 고친 DOM이라, 거기서는 실수가 보이지 않습니다. MDN의 '디버깅' 장이 소스를 검사기(validator.w3.org/nu)에 넣어 보라고 권하는 이유입니다. 또 하나, 파서는 '구조'의 실수(겹침, 닫지 않음)만 고칩니다. '뜻'의 실수(ul 안의 div)는 그대로 둡니다.",
        tables: [
          {
            head: ["언어", "틀린 글자를 만나면", "결과"],
            rows: [
              ["JSON", "읽기를 멈추고 에러를 던진다", "JSON.parse가 SyntaxError"],
              ["XML (XHTML)", "그 자리에서 멈춘다", "노란 에러 화면"],
              ["HTML", "표준의 고치는 규칙으로 계속 읽는다", "모든 브라우저가 같은 DOM, 실수는 조용함"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "지금까지는 body 안의 글자를 봤습니다. 2장은 화면에 보이지 않는 head를 봅니다. 글자를 어떤 인코딩으로 읽을지, 탭에 어떤 제목을 띄울지, 이 문서가 무슨 언어인지가 거기 적힙니다.",
      },
      {
        label: "확인 질문",
        body: '1) <p>안에 <div>를 넣으면 DOM은 어떻게 되나요? 빈 <p>는 어디서 생기나요?\n2) <input disabled="false">는 켜져 있나요, 꺼져 있나요? 끄려면?\n3) 연속 공백이 한 칸으로 보일 때, DOM의 textContent에도 한 칸인가요?\n4) 개발자 도구의 Elements 탭으로 소스의 실수를 찾기 어려운 이유는?',
      },
    ],
    sources: [
      { label: "MDN — Basic HTML syntax", href: `${LEARN}/Basic_HTML_syntax` },
      { label: "MDN — Debugging HTML", href: `${LEARN}/Debugging_HTML` },
      { label: "WHATWG — Parsing HTML documents", href: `${SPEC}/parsing.html` },
    ],
  },

  {
    id: "html-s2",
    name: "2장 · head와 메타데이터",
    tagline: "head는 화면이 아니라 브라우저와 기계가 읽는다",
    intro:
      "MDN은 head를 '페이지를 불러올 때 브라우저에 표시되지 않는 부분'이라고 적습니다. 대신 그 문서에 대한 정보가 들어갑니다. 바이트를 어떤 글자로 읽을지(charset), 탭에 띄울 제목(title), 이 문서의 언어(lang), 검색 결과에 보일 요약(description), 휴대폰에서의 폭(viewport), 그리고 불러올 CSS와 스크립트입니다. 사람 눈에는 안 보이지만 파서, 탭, 검색 엔진, 화면 낭독기가 이 값을 읽습니다. 이 장은 그 값을 작은 창에서 직접 읽어 봅니다.",
    blocks: [
      {
        label: "head에 들어가는 것",
        body: "아래 표는 head에 자주 들어가는 요소와, 그것이 빠졌을 때 생기는 일입니다. lang만은 head가 아니라 <html> 태그에 붙입니다. MDN은 '페이지의 언어를 정할 수 있고, 정말 정해야 한다'고 적습니다.",
        tables: [
          {
            head: ["요소", "누가 읽나", "하는 일", "빠지면"],
            rows: [
              ['<meta charset="utf-8">', "파서", "바이트를 글자로 읽는 법", "한글이 깨질 수 있다"],
              ["<title>", "탭, 북마크, 검색 결과", "문서의 제목", "탭에 주소가 뜬다"],
              ['<html lang="ko">', "낭독기, 글꼴, 번역기", "문서의 언어", "낭독기가 다른 언어 발음으로 읽는다"],
              ['<meta name="description">', "검색 엔진", "검색 결과의 요약", "검색 엔진이 본문에서 아무 문장이나 뽑는다"],
              ['<meta name="viewport">', "휴대폰 브라우저", "화면 폭을 기기 폭으로", "980px로 그린 뒤 줄여서 글자가 깨알만 하다"],
              ['<link rel="stylesheet">', "브라우저", "CSS를 불러온다", "기본 스타일만 남는다"],
              ["<script defer>", "브라우저", "문서를 다 읽은 뒤 실행", "(defer 없이 head에 두면) 읽기가 멈춘다"],
            ],
          },
        ],
        code: '<!doctype html>\n<html lang="ko">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>문서 제목</title>\n    <meta name="description" content="검색 결과에 보일 한 줄 요약">\n    <link rel="icon" href="/favicon.ico">\n    <link rel="stylesheet" href="/style.css">\n    <script defer src="/app.js"></script>\n  </head>\n  <body>…</body>\n</html>',
        codeLang: "html",
        terms: [
          {
            term: "메타데이터",
            body: "데이터에 대한 데이터입니다. 문서 내용이 아니라 '이 문서는 무슨 언어이고 제목이 무엇인가'처럼 문서를 설명하는 정보입니다. 책의 본문이 아니라 표지와 판권 면입니다.",
          },
          {
            term: "문자 인코딩 (charset)",
            body: "글자를 바이트로, 바이트를 글자로 바꾸는 약속입니다. '가'는 UTF-8에서 EA B0 80 세 바이트이고, EUC-KR에서는 B0 A1 두 바이트입니다. 약속이 다르면 같은 바이트가 다른 글자로 읽혀 깨집니다. 암호표가 다르면 같은 암호문이 다른 문장이 되는 것과 같습니다.",
          },
          {
            term: "doctype",
            body: "<!doctype html>은 '표준 모드로 그려라'는 표시입니다. 없으면 브라우저가 1990년대 페이지를 위한 호환(quirks) 모드로 그립니다. MDN은 이것을 '모든 웹 페이지 맨 위에 넣어야 하는 가장 짧은 문자열'이라고 적습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: head의 값을 읽어 보기",
        body: "아래 코드의 title, description은 화면에 아무것도 그리지 않습니다. 대신 지금 값에 나옵니다. document.title이 탭 제목이 되는 값이고, documentElement.lang이 문서의 언어입니다. characterSet은 이 문서를 어떤 인코딩으로 읽었는지, compatMode는 표준 모드(CSS1Compat)인지 호환 모드(BackCompat)인지입니다.\n\n<html lang=\"ko\">를 body 쪽에 적어도 lang이 붙는 것은 파서의 규칙입니다. 이미 html 요소가 있는데 <html> 태그를 또 만나면, 없는 속성만 원래 html 요소에 옮겨 붙입니다.",
        lab: {
          html: `<html lang="ko">
<title>작은 창의 제목</title>
<meta name="description" content="이 문서의 한 줄 요약">
<p>head에 적은 것은 화면에 보이지 않습니다. 아래 지금 값을 보세요.</p>`,
          height: 110,
          checks: [
            { label: "document.title", expr: "document.title" },
            { label: "documentElement.lang", expr: "document.documentElement.lang" },
            { label: "description", expr: "document.querySelector('meta[name=description]')?.content" },
            { label: "characterSet", expr: "document.characterSet" },
            { label: "compatMode", expr: "document.compatMode" },
          ],
          tryIt: "<title> 줄을 지우고 실행해 보세요. document.title이 빈 글자가 됩니다. lang을 en으로 바꿔 보세요.",
        },
      },
      {
        label: "직접 해 보기: lang이 바꾸는 글자 모양",
        body: "한국어, 일본어, 중국어는 같은 한자를 같은 유니코드 번호로 씁니다(한중일 통합 한자). 그런데 나라마다 쓰는 모양이 조금씩 다릅니다. 브라우저는 lang을 보고 그 언어에 맞는 글꼴을 고릅니다. 아래 네 줄은 똑같은 글자 '直 骨 刃 写'인데 lang만 다릅니다. 刃의 점과 骨의 안쪽 획처럼, 같은 글자의 획이 줄마다 조금씩 다르게 그려지는지 보세요. lang을 빠뜨리면 일본어 문장이 한국어 글꼴로, 중국어가 일본어 글꼴로 그려지는 일이 생깁니다.",
        lab: {
          html: `<style>p { margin: 4px 0; font-size: 22px; }</style>
<p lang="ko">ko 直 骨 刃 写</p>
<p lang="ja">ja 直 骨 刃 写</p>
<p lang="zh-CN">zh-CN 直 骨 刃 写</p>
<p lang="zh-TW">zh-TW 直 骨 刃 写</p>`,
          height: 200,
          tryIt: "네 줄의 lang을 모두 지우고 실행해 보세요. 모두 같은 모양이 됩니다.",
        },
        terms: [
          {
            term: "한중일 통합 한자 (Han unification)",
            body: "유니코드가 세 나라의 같은 뜻 한자를 번호 하나로 합친 것입니다. 번호는 같지만 나라마다 익숙한 글씨 모양은 달라서, 모양은 글꼴이 맡습니다. 그래서 lang이 글꼴을 고르는 단서가 됩니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: script는 만난 자리에서 돈다",
        body: "보통 <script>는 파서가 만난 자리에서 내려받고 실행합니다. 그동안 파서는 멈춥니다. defer는 내려받기만 먼저 하고, 문서를 다 읽은 뒤(readyState가 interactive) 적은 순서대로 실행합니다. async는 다 받는 대로 바로 실행해서 순서를 보장하지 않습니다. 기록의 출력 줄에서 실행 순서와 그때의 readyState를 보세요. Chrome 156에서는 1 보통(loading) → 4 인라인(loading) → 3 async(loading) → 2 defer(interactive) 순서였습니다. async는 문서를 다 읽기 전에 끼어들었고, defer는 적은 자리와 상관없이 맨 뒤였습니다. MDN이 head의 script에 defer를 붙이라고 하는 이유입니다. 자세한 차단 과정은 브라우저 렌더링 허브 5장이 다룹니다.",
        lab: {
          html: `<script src="say.js" data-msg="1. 보통 script"></script>
<script defer src="say.js" data-msg="2. defer script"></script>
<script async src="say.js" data-msg="3. async script"></script>
<script>console.log('4. 인라인 script · readyState = ' + document.readyState)</script>
<p>문서 끝</p>`,
          height: 90,
          tryIt: "say.js는 data-msg와 readyState를 출력하는 두 줄짜리 파일입니다. 순서를 바꿔 실행해 보세요.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "head의 실수는 화면에 바로 드러나지 않습니다. 탭, 검색 결과, 휴대폰, 낭독기처럼 다른 곳에서 드러납니다.",
        tables: [
          {
            head: ["증상", "원인", "확인"],
            rows: [
              ["한글이 ë°˜ê°€ 처럼 깨진다", "UTF-8 바이트를 다른 인코딩으로 읽었다", "document.characterSet, 응답 헤더의 charset"],
              ["휴대폰에서 글자가 깨알만 하다", "viewport 메타가 없다", '<meta name="viewport" content="width=device-width">'],
              ["낭독기가 한국어를 영어 발음으로 읽는다", 'lang이 없거나 "en"이다', "document.documentElement.lang"],
              ["일본어 한자가 한국어 모양으로 나온다", "그 문장에 lang=\"ja\"가 없다", "문장 요소에 lang을 붙인다"],
              ["탭마다 제목이 같다 (SPA)", "화면이 바뀌어도 title을 안 바꾼다", "라우트마다 document.title을 바꾼다"],
              ["CSS와 레이아웃이 이상하다", "doctype이 빠져 호환 모드다", "document.compatMode가 BackCompat"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 인코딩을 정하는 순서",
        body: "브라우저는 인코딩을 다음 순서로 정합니다. 먼저 파일 맨 앞의 BOM, 그다음 서버가 보낸 Content-Type 헤더의 charset, 그다음 문서 앞쪽 1024바이트 안의 <meta charset>, 그래도 없으면 추측입니다. 그래서 서버가 헤더로 charset=utf-8을 보내면 meta는 쓰이지 않습니다. 이 블로그(GitHub Pages)와 대부분의 서버가 그렇게 보냅니다. meta charset을 적는 이유는 파일을 서버 없이 열거나 헤더가 빠졌을 때를 위해서입니다. MDN은 '일부 브라우저(Chrome 같은)는 잘못된 인코딩을 자동으로 고치므로 문제가 안 보일 수도 있다'고 적습니다. 보이지 않는다고 맞는 것은 아닙니다.",
        tables: [
          {
            caption: "인코딩을 정하는 순서 (앞이 이긴다)",
            head: ["순서", "어디에", "예"],
            rows: [
              ["1", "파일 맨 앞의 BOM", "EF BB BF (UTF-8)"],
              ["2", "HTTP 응답 헤더", "Content-Type: text/html; charset=utf-8"],
              ["3", "문서 앞 1024바이트 안의 meta", '<meta charset="utf-8">'],
              ["4", "브라우저의 추측", "내용과 사용자 언어를 보고 고른다"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "head가 문서에 대한 정보라면, body는 문서 자체입니다. 3장은 body의 가장 기본인 제목과 문단, 그리고 글자에 힘을 주는 em과 strong을 봅니다. 크기와 굵기가 아니라 '단계'와 '뜻'으로 고른다는 것이 핵심입니다.",
      },
      {
        label: "확인 질문",
        body: '1) 서버가 Content-Type에 charset=utf-8을 보내고, 문서에는 <meta charset="euc-kr">이 있으면 무엇으로 읽나요?\n2) <title>이 없으면 document.title은 무엇인가요?\n3) lang이 바꾸는 것 세 가지를 말해 보세요.\n4) head의 <script>에 defer를 붙이면 실행 시점과 순서가 어떻게 되나요?',
      },
    ],
    sources: [
      { label: "MDN — Web page metadata", href: `${LEARN}/Webpage_metadata` },
      { label: "MDN — <meta>", href: `${REF}/Elements/meta` },
      { label: "WHATWG — Determining the character encoding", href: `${SPEC}/parsing.html#determining-the-character-encoding` },
    ],
  },

  {
    id: "html-s3",
    name: "3장 · 제목, 문단, 강조",
    tagline: "제목은 크기가 아니라 단계이고, 강조는 모양이 아니라 뜻이다",
    intro:
      "<h1>부터 <h6>는 제목, <p>는 문단입니다. 제목은 문서의 개요(목차)를 만듭니다. 화면 낭독기 사용자는 제목만 골라 건너뛰며 문서를 훑습니다. 그래서 MDN은 '단계를 건너뛰지 말고, 원하는 글자 크기를 얻으려고 제목을 쓰지 말라(그것은 CSS의 일)'고 적습니다. 글자에 힘을 줄 때도 같습니다. <em>과 <strong>은 기울임과 굵기가 아니라 '힘줌'과 '중요함'이라는 뜻입니다. 이 장은 제목이 만드는 개요와, 모양은 같지만 뜻이 다른 요소들을 작은 창에서 봅니다.",
    blocks: [
      {
        label: "제목은 단계다",
        body: "h1은 문서의 가장 큰 제목, h2는 그 아래 절, h3는 그 아래 소절입니다. MDN 참고서는 '제목 단계를 건너뛰지 말라. 늘 h1에서 시작해 h2, 그다음으로 간다'고 적습니다. h1은 페이지마다 하나를 권합니다. 여러 개도 표준상 허용되지만 좋은 습관으로 보지 않습니다. 또 '글자 크기를 바꾸려고 제목 요소를 쓰지 말고 CSS의 font-size를 쓰라'고 적습니다. 브라우저와 보조 기술은 이 제목들로 문서의 목차를 자동으로 만듭니다.",
        terms: [
          {
            term: "문서 개요 (outline)",
            body: "제목들을 단계대로 늘어놓은 목차입니다. h2는 h1의 하위 절, h3는 h2의 하위 절로 읽힙니다. 책의 장, 절, 항과 같아서 '2장 바로 아래 4항'이 나오면 독자가 길을 잃습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 제목이 만드는 개요",
        body: "지금 값의 labOutline()은 문서의 h1~h6를 단계대로 들여 써서 보여 줍니다. 낭독기가 제목 목록으로 보여 주는 것과 같은 모양입니다. h2 다음에 바로 h4가 오면 단계를 건너뛰었다고 표시합니다. 크고 굵게 꾸민 p는 아무리 제목처럼 보여도 개요에 없습니다. 낭독기 사용자에게 그 줄은 제목이 아니라 보통 문단입니다.",
        lab: {
          html: `<h1>요리책</h1>
<h2>국</h2>
<h3>된장국</h3>
<h2>반찬</h2>
<h4>나물 (h3를 건너뜀)</h4>
<p style="font-size: 1.6em; font-weight: bold; margin: 0">크고 굵은 p (제목 아님)</p>`,
          height: 230,
          checks: [{ label: "labOutline()", expr: "labOutline()" }],
          tryIt: "h4를 h3로 고치고, p를 <h2>로 바꿔 실행해 보세요. 개요가 바로잡힙니다.",
        },
      },
      {
        label: "강조와 중요: em, strong, i, b",
        body: "em은 말할 때 힘주는 자리입니다. 힘준 자리가 바뀌면 문장 뜻이 바뀝니다('나는 *오늘* 간다' 대 '*나는* 오늘 간다'). strong은 중요하거나 급한 내용입니다. MDN은 둘 다 '기울임이나 굵기를 얻으려는 목적만으로 쓰지 말라'고 적습니다. i와 b는 HTML5에서 다시 정의됐습니다. i는 외국어, 학명, 기술 용어, 속생각처럼 '관례상 기울여 쓰던 것', b는 키워드, 제품명, 첫 문장처럼 '관례상 굵게 쓰던 것'입니다. MDN은 '더 맞는 요소가 없을 때만 b, i, u를 쓰고, 대개 더 맞는 요소가 있다'고 적습니다. 밑줄(u)은 링크와 헷갈려서 웹에서는 링크에만 쓰는 편이 좋다고 덧붙입니다.",
        tables: [
          {
            head: ["요소", "뜻", "기본 모양", "쓰는 곳"],
            rows: [
              ["<em>", "힘줌. 자리가 바뀌면 뜻이 바뀐다", "기울임", "말할 때 강하게 읽는 낱말"],
              ["<strong>", "중요, 경고, 급함", "굵게", "주의: 뜨겁습니다"],
              ["<i>", "관례상 기울이던 것", "기울임", "외국어, 학명(Homo sapiens), 속생각"],
              ["<b>", "관례상 굵게 쓰던 것", "굵게", "키워드, 제품명"],
              ["<mark>", "지금 찾는 것과 관련된 표시", "노란 바탕", "검색어 하이라이트"],
              ["<u>", "철자 틀림 같은 표시", "밑줄", "드물게. 링크와 헷갈린다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 모양은 같고 뜻이 다르다",
        body: "em과 i는 둘 다 기울어 보이고, strong과 b는 둘 다 굵어 보입니다. 지금 값에서 계산된 스타일을 보면 실제로 같습니다. 차이는 화면이 아니라 뜻에 있습니다. 낭독기는 em과 strong을 다른 억양으로 읽을 수 있고, 검색 엔진과 번역기도 이 뜻을 씁니다. 그리고 모양은 CSS로 언제든 바꿀 수 있습니다. 아래 style은 em을 기울이지 않고 붉은색으로 바꿉니다. 모양이 바뀌어도 em은 여전히 em입니다.",
        lab: {
          html: `<style>.red em { font-style: normal; color: crimson; }</style>
<p>나는 <em>오늘</em> 간다고 했다. (em)</p>
<p>나는 <i>오늘</i> 간다고 했다. (i)</p>
<p><strong>주의:</strong> 뜨겁습니다. (strong)</p>
<p><b>주의:</b> 뜨겁습니다. (b)</p>
<p class="red">CSS로 바꾼 <em>em</em>도 em입니다.</p>`,
          height: 210,
          checks: [
            { label: "em의 font-style", expr: "getComputedStyle(document.querySelector('em')).fontStyle" },
            { label: "i의 font-style", expr: "getComputedStyle(document.querySelector('i')).fontStyle" },
            { label: "strong의 font-weight", expr: "getComputedStyle(document.querySelector('strong')).fontWeight" },
            { label: "b의 font-weight", expr: "getComputedStyle(document.querySelector('b')).fontWeight" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "제목과 강조의 실수는 눈으로 보는 사람에게는 티가 나지 않습니다. 개요와 뜻을 읽는 쪽(낭독기, 검색 엔진, 목차 생성기)에서 드러납니다.",
        tables: [
          {
            head: ["한 것", "보이는 화면", "개요나 뜻에서 생기는 일"],
            rows: [
              ["작은 글씨가 필요해서 h5를 썼다", "작은 제목", "h2 아래에 갑자기 h5: 단계가 끊긴다"],
              ["제목을 <p><b>로 꾸몄다", "제목처럼 보인다", "개요에 없다. H 키로 건너뛸 수 없다"],
              ["기울임이 필요해서 em을 썼다", "기울임", "힘주지 않을 곳에 힘줌이 들어간다"],
              ["경고를 <span class=red>로만 적었다", "빨간 글자", "색을 못 보는 사람에게 중요함이 전달되지 않는다"],
              ["페이지마다 h1을 여러 개 중첩했다", "큰 제목 여럿", "MDN: 비표준(non-conforming)이 됐다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 모양은 CSS, 뜻은 HTML",
        body: "브라우저의 기본 스타일 때문에 h1은 크고, em은 기울고, strong은 굵습니다. 그래서 모양을 보고 태그를 고르기 쉽습니다. 하지만 기본 스타일은 출발점일 뿐이고 CSS가 언제든 바꿉니다. 바뀌지 않는 것은 뜻입니다. 태그를 고를 때는 '어떻게 보여야 하나'가 아니라 '이 글자는 무엇인가'를 묻습니다. 모양이 필요하면 맞는 태그를 고른 뒤 CSS로 바꿉니다.",
        tables: [
          {
            head: ["물음", "답하는 쪽", "예"],
            rows: [
              ["이 글자는 무엇인가?", "HTML (태그)", "제목 2단계, 힘준 낱말, 중요한 경고"],
              ["어떻게 보여야 하나?", "CSS", "18px, 붉은색, 기울임 없음"],
              ["누가 그 뜻을 쓰나?", "낭독기, 검색 엔진, 번역기, 읽기 모드", "제목으로 건너뛰기, 억양, 요약"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "제목과 문단 다음으로 자주 쓰는 구조는 목록입니다. 4장은 ul, ol, dl 세 가지 목록과, 번호를 바꾸는 속성(start, reversed, value)을 작은 창에서 봅니다.",
      },
      {
        label: "확인 질문",
        body: "1) 글자를 작게 하려고 h2 대신 h5를 쓰면 무엇이 깨지나요?\n2) 크고 굵게 꾸민 p는 낭독기에서 제목으로 들리나요?\n3) em과 i는 모양이 같은데 무엇이 다른가요? 각각 언제 쓰나요?\n4) em의 기울임을 없애고 싶으면 태그를 바꿔야 하나요, CSS를 바꿔야 하나요?",
      },
    ],
    sources: [
      { label: "MDN — Headings and paragraphs", href: `${LEARN}/Headings_and_paragraphs` },
      { label: "MDN — Emphasis and importance", href: `${LEARN}/Emphasis_and_importance` },
      { label: "MDN — Heading elements", href: `${REF}/Elements/Heading_Elements` },
    ],
  },

  {
    id: "html-s4",
    name: "4장 · 목록",
    tagline: "목록은 항목이 몇 개인지까지 알린다",
    intro:
      "MDN은 '웹에는 세 가지 목록이 있다. 순서 없는 목록, 순서 있는 목록, 설명 목록'이라고 적습니다. <ul>은 순서가 상관없는 항목, <ol>은 순서가 중요한 항목, <dl>은 용어와 설명의 짝입니다. 목록으로 묶으면 브라우저가 글머리 기호나 번호를 붙이고, 낭독기는 '목록, 항목 3개'처럼 개수를 먼저 알립니다. 이 장은 번호를 바꾸는 속성과, 파서가 고쳐 주지 않는 목록의 실수를 작은 창에서 봅니다.",
    blocks: [
      {
        label: "세 가지 목록",
        body: "ul과 ol의 항목은 <li>입니다. dl은 용어를 <dt>, 설명을 <dd>로 감쌉니다. MDN은 용어 하나에 설명이 여럿이어도 된다고 적습니다. 목록 안에 목록을 넣는 것도 괜찮습니다. 이때 안쪽 목록은 바깥 li 안에 들어가야 합니다.",
        tables: [
          {
            head: ["목록", "항목", "쓰는 곳", "기본 모양"],
            rows: [
              ["<ul>", "<li>", "순서가 상관없는 것: 장보기 목록", "글머리 기호 •"],
              ["<ol>", "<li>", "순서가 중요한 것: 요리 순서", "번호 1. 2. 3."],
              ["<dl>", "<dt> 용어, <dd> 설명", "용어 풀이, 이름과 값의 짝", "설명이 들여 쓰임"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: ol의 번호를 바꾸는 속성",
        body: "ol에는 번호를 바꾸는 속성이 셋 있습니다. start는 첫 번호, reversed는 거꾸로 세기, li의 value는 그 항목부터 번호를 새로 매기기입니다. type은 번호 모양(1, a, A, i, I)입니다. 번호는 글자로 적은 것이 아니라 브라우저가 매기는 것이라, 항목을 하나 넣거나 빼면 뒤 번호가 저절로 바뀝니다. 지금 값에서 start 속성의 값도 보세요. reversed만 적고 start를 적지 않으면 화면은 항목 수부터 세지만, ol.start는 기본값 1을 돌려줍니다.",
        lab: {
          html: `<ol start="3">
  <li>셋째부터 시작 (start="3")</li>
  <li>그다음</li>
  <li value="10">value="10"으로 건너뜀</li>
  <li>그다음은 11</li>
</ol>
<ol reversed>
  <li>거꾸로 셉니다 (reversed)</li>
  <li>둘째</li>
  <li>마지막이 1</li>
</ol>`,
          height: 240,
          checks: [
            { label: "ol.start", expr: "[...document.querySelectorAll('ol')].map((ol) => ol.start)" },
            { label: "ol.reversed", expr: "[...document.querySelectorAll('ol')].map((ol) => ol.reversed)" },
          ],
          tryIt: '첫 ol에 type="a"를 붙이거나, 두 번째 ol의 항목을 하나 지워 보세요. 번호가 저절로 다시 매겨집니다.',
        },
      },
      {
        label: "직접 해 보기: 중첩 목록, dl, 그리고 고쳐지지 않는 실수",
        body: "중첩 목록은 바깥 li 안에 안쪽 ul을 넣습니다. dl은 dt 하나에 dd 여럿을 둘 수 있습니다. 마지막 줄은 실수입니다. ul의 자식은 li여야 하는데 div를 바로 넣었습니다. 1장에서 본 것처럼 파서는 겹침이나 닫지 않음 같은 '구조'의 실수는 고치지만, 이런 '뜻'의 실수는 그대로 둡니다. 지금 값의 DOM 나무에 ul > div가 그대로 남아 있습니다. 검사기(validator)가 찾아 주는 종류의 실수입니다.",
        lab: {
          html: `<ul>
  <li>과일
    <ul><li>사과</li><li>배</li></ul>
  </li>
  <li>채소</li>
</ul>
<dl>
  <dt>HTML</dt><dd>뜻을 적는 언어</dd>
  <dt>CSS</dt><dd>모양을 정하는 언어</dd><dd>이기는 선언 하나를 고른다</dd>
</dl>
<ul><div>ul 바로 아래의 div (실수)</div></ul>`,
          height: 260,
          checks: [{ label: "labDom()", expr: "labDom()" }],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "목록의 실수는 대개 화면에서 티가 나지 않습니다. 개수와 순서를 읽는 쪽에서 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["번호를 글자로 '1. 2. 3.' 적었다", "항목을 넣으면 번호를 손으로 다 고쳐야 한다", "ol을 쓰고 번호는 브라우저에 맡긴다"],
              ["<br>로 줄을 나눠 목록처럼 보이게 했다", "낭독기가 목록인지, 몇 개인지 모른다", "ul과 li로 묶는다"],
              ["ul 안에 div나 p를 바로 넣었다", "뜻이 틀린 목록. 파서는 고치지 않는다", "li로 감싼다"],
              ["list-style: none으로 기호를 없앴다", "Safari의 VoiceOver가 목록으로 알리지 않는다", 'role="list"를 붙인다'],
              ["안쪽 ul을 li 밖, ul 바로 아래에 넣었다", "뜻이 틀린 중첩", "안쪽 ul을 바깥 li 안으로 옮긴다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 목록은 개수와 순서를 들고 있다",
        body: "목록으로 묶는다는 것은 '이것들은 같은 종류의 항목 n개이고, (ol이면) 이 순서다'라는 정보를 붙이는 것입니다. 눈으로 보는 사람은 글머리 기호에서 그것을 알지만, 낭독기 사용자는 그 정보를 마크업에서만 얻습니다. 번호를 브라우저에 맡기는 것도 같은 이유입니다. 항목이 바뀌면 번호가 따라 바뀌는 것은 번호가 글자가 아니라 구조이기 때문입니다.",
      },
      {
        label: "다음 입구",
        body: "5장은 MDN이 '고급 텍스트'로 묶은 요소들입니다. 인용(blockquote, q), 약어(abbr), 위아래 첨자(sup, sub), 코드(code, kbd), 그리고 사람이 읽는 날짜와 기계가 읽는 날짜를 함께 적는 time입니다.",
      },
      {
        label: "확인 질문",
        body: '1) ol에 reversed만 적으면 첫 항목의 번호는 무엇인가요? ol.start는요?\n2) <li value="10"> 다음 항목의 번호는?\n3) ul 안에 div를 바로 넣으면 파서가 고쳐 주나요?\n4) 목록의 글머리 기호를 CSS로 없앴을 때 생길 수 있는 접근성 문제는?',
      },
    ],
    sources: [
      { label: "MDN — Lists", href: `${LEARN}/Lists` },
      { label: "MDN — <ol>", href: `${REF}/Elements/ol` },
      { label: "MDN — <dl>", href: `${REF}/Elements/dl` },
    ],
  },

  {
    id: "html-s5",
    name: "5장 · 고급 텍스트",
    tagline: "사람이 읽는 글자 옆에 기계가 읽는 값을 함께 적는다",
    intro:
      "MDN이 '고급 텍스트 기능'으로 묶은 요소들입니다. 인용(blockquote, q, cite), 약어(abbr), 연락처(address), 위아래 첨자(sup, sub), 컴퓨터 글자(code, pre, kbd, samp, var), 그리고 날짜와 시간(time)입니다. 이 요소들의 공통점은 화면에 보이는 글자와 별도로 '기계가 읽는 값'을 하나 더 들고 있다는 것입니다. q는 언어에 맞는 따옴표를 브라우저가 붙이고, abbr는 title에 풀어 쓴 말을, time은 datetime에 정확한 날짜를 듭니다. 이 장은 그 값을 작은 창에서 꺼내 봅니다.",
    blocks: [
      {
        label: "요소와 하는 일",
        body: "MDN은 blockquote에 인용한 출처 주소를 cite 속성으로 붙이라고 하면서도, '브라우저와 낭독기는 이 속성으로 별로 하는 일이 없다'고 적습니다. <cite> 요소는 인용한 작품의 제목(책 이름 등)을 감쌉니다. abbr는 처음 나올 때 풀어 쓴 말을 함께 적고, title에도 넣습니다. address는 가장 가까운 article이나 body의 연락처에만 씁니다. 그냥 주소(우편 주소)를 감싸는 요소가 아닙니다.",
        tables: [
          {
            head: ["요소", "뜻", "기계가 읽는 값"],
            rows: [
              ["<blockquote cite>", "블록 인용", "cite: 출처 주소"],
              ["<q>", "문장 안 인용", "언어에 맞는 따옴표를 브라우저가 붙임"],
              ["<cite>", "작품 제목", ""],
              ["<abbr title>", "약어", "title: 풀어 쓴 말"],
              ["<address>", "이 글(article, body)의 연락처", ""],
              ["<sup>, <sub>", "위 첨자, 아래 첨자", ""],
              ["<code>, <pre>, <kbd>, <samp>, <var>", "코드, 공백 유지, 키 입력, 출력, 변수", ""],
              ["<time datetime>", "날짜, 시간", "datetime: 기계가 읽는 정확한 값"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: q의 따옴표는 언어마다 다르다",
        body: "<q>는 따옴표를 글자로 적지 않습니다. 브라우저가 CSS의 ::before, ::after로 붙입니다. 그래서 언어(lang)에 맞는 따옴표가 나옵니다. 영어는 “ ”, 프랑스어는 « », 독일어는 „ “, 일본어는 「 」입니다. q 안에 q를 또 넣으면 안쪽은 작은따옴표 ‘ ’가 됩니다. 이 따옴표는 글자가 아니라서 드래그해 복사하면 빠집니다. 지금 값을 보면 따옴표를 정하는 CSS 속성 quotes의 계산값이 auto입니다. 'lang을 보고 그 언어의 따옴표를 고른다'는 뜻입니다. q의 textContent에도 따옴표는 없습니다.",
        lab: {
          html: `<p lang="en">English: <q>Hello <q>nested</q> world</q></p>
<p lang="fr">Français : <q>Bonjour</q></p>
<p lang="de">Deutsch: <q>Hallo</q></p>
<p lang="ja">日本語: <q>こんにちは</q></p>
<p lang="ko">한국어: <q>안녕하세요</q></p>`,
          height: 250,
          checks: [
            { label: "fr의 quotes", expr: "getComputedStyle(document.querySelector('[lang=fr] q')).quotes" },
            { label: "q의 textContent", expr: "document.querySelector('[lang=fr] q').textContent" },
          ],
          tryIt: "lang을 다른 언어 태그(es, ru, zh)로 바꿔 보세요.",
        },
      },
      {
        label: "직접 해 보기: time, abbr, 첨자, kbd",
        body: "time의 글자는 '다음 주 금요일 저녁 7시'처럼 사람이 읽기 좋게 적고, datetime에는 '2026-11-20T19:00+09:00'처럼 기계가 읽는 값을 적습니다. MDN은 time이 '모호하지 않고 기계가 읽을 수 있는 날짜를 붙이게 해 준다'고 적습니다. 지금 값을 보면 그 값으로 Date를 만들고, Intl로 다른 언어의 날짜 모양까지 다시 만들 수 있습니다. i18n 허브 6장의 Intl이 쓰는 재료가 바로 이 값입니다.\n\nabbr에 마우스를 올리면 title이 풍선 도움말로 뜹니다. 다만 MDN은 title이 마우스에서만 보인다는 점을 짚습니다. 그래서 처음 나올 때는 본문에도 풀어 씁니다.",
        lab: {
          html: `<p>모임은 <time datetime="2026-11-20T19:00+09:00">다음 주 금요일 저녁 7시</time>입니다.</p>
<p><abbr title="HyperText Markup Language">HTML</abbr>에 마우스를 올려 보세요.</p>
<p>물은 H<sub>2</sub>O, 질량과 에너지는 E = mc<sup>2</sup></p>
<p>저장하려면 <kbd>Ctrl</kbd> + <kbd>S</kbd>를 누릅니다.</p>`,
          height: 190,
          checks: [
            { label: "time.dateTime", expr: "document.querySelector('time').dateTime" },
            { label: "UTC로", expr: "new Date(document.querySelector('time').dateTime).toISOString()" },
            {
              label: "Intl, en-US",
              expr: "new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Seoul' }).format(new Date(document.querySelector('time').dateTime))",
            },
            { label: "abbr.title", expr: "document.querySelector('abbr').title" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "고급 텍스트 요소의 실수는 대개 '보이는 글자만 적고 기계가 읽는 값을 빠뜨린 것'입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["따옴표를 글자로 적고 <q>로 또 감쌌다", "따옴표가 두 겹으로 보인다", "q를 쓰면 따옴표는 적지 않는다"],
              ["날짜를 글자로만 적었다", "검색 엔진, 달력 앱, 번역기가 날짜를 모른다", "time datetime을 붙인다"],
              ["약어의 뜻을 title에만 적었다", "터치와 키보드 사용자는 볼 수 없다", "처음 나올 때 본문에 풀어 쓴다"],
              ["아무 주소에나 address를 썼다", "연락처가 아닌 것을 연락처로 알린다", "우편 주소는 p로 적는다"],
              ["코드를 <pre> 없이 붙였다", "공백과 줄바꿈이 한 칸으로 줄어든다", "<pre><code>로 감싼다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 글자 두 겹",
        body: "이 장의 요소들은 '사람용 글자'와 '기계용 값'을 한 요소에 함께 둡니다. 사람용 글자는 맥락에 맞게 자유롭게 적고('다음 주 금요일'), 기계용 값은 형식에 맞게 정확히 적습니다('2026-11-20T19:00+09:00'). 7장의 a(글자와 href), 8장의 img(alt와 src)도 같은 모양입니다. 기계용 값이 있어야 브라우저와 다른 프로그램이 그 글자를 다시 쓸 수 있습니다. 날짜를 다른 언어로 바꾸고, 약어를 풀어 읽고, 따옴표를 언어에 맞춥니다.",
        tables: [
          {
            head: ["요소", "사람용 글자", "기계용 값"],
            rows: [
              ["<time>", "다음 주 금요일 저녁 7시", 'datetime="2026-11-20T19:00+09:00"'],
              ["<abbr>", "HTML", 'title="HyperText Markup Language"'],
              ["<a> (7장)", "다음 장으로", 'href="/theories/html-s6/"'],
              ["<img> (8장)", 'alt="고양이가 자는 사진"', 'src="cat.jpg"'],
              ["<data>", "검정 티셔츠", 'value="SKU-1042"'],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "지금까지는 글자 하나하나의 뜻을 봤습니다. 6장은 페이지 전체의 뼈대입니다. header, nav, main, article, aside, footer가 낭독기에서 '랜드마크'가 되어, 페이지 안을 건너뛰는 길이 됩니다.",
      },
      {
        label: "확인 질문",
        body: '1) <q>의 따옴표를 복사하면 함께 복사되나요? 왜요?\n2) lang="fr" 안의 <q>는 어떤 따옴표로 보이나요?\n3) time의 글자와 datetime은 각각 누구를 위한 것인가요?\n4) abbr의 뜻을 title에만 적으면 누가 그 뜻을 볼 수 없나요?',
      },
    ],
    sources: [
      { label: "MDN — Advanced text features", href: `${LEARN}/Advanced_text_features` },
      { label: "MDN — <q>", href: `${REF}/Elements/q` },
      { label: "MDN — <time>", href: `${REF}/Elements/time` },
    ],
  },

  {
    id: "html-s6",
    name: "6장 · 문서 구조와 랜드마크",
    tagline: "큰 덩어리에 이름을 붙이면, 그 이름이 건너뛰는 길이 된다",
    intro:
      "웹 페이지는 대개 머리(header), 메뉴(nav), 본문(main), 곁다리(aside), 꼬리(footer)로 나뉩니다. MDN은 이것을 div로 나누지 말고 뜻이 있는 요소로 나누라고 합니다. 그 요소들은 화면 낭독기에서 '랜드마크'가 됩니다. 사용자는 랜드마크 목록을 열어 '본문으로' 바로 건너뜁니다. 이 장은 요소마다 어떤 랜드마크 역할이 붙는지, 그리고 그 역할이 놓인 자리에 따라 어떻게 달라지는지를 작은 창에서 셉니다.",
    blocks: [
      {
        label: "페이지의 큰 덩어리",
        body: "MDN의 정의를 옮기면 이렇습니다. main은 '이 페이지에만 있는 내용으로, 페이지마다 한 번만, body 바로 아래에' 씁니다. article은 '나머지 페이지 없이도 뜻이 통하는 내용 묶음'(블로그 글 하나)이고, section은 article과 비슷하지만 '페이지의 한 부분을 묶는' 데 씁니다. aside는 본문과 직접 관련은 없는 내용, header는 머리말 묶음, nav는 페이지의 주 메뉴(보조 링크는 넣지 않음), footer는 꼬리말 묶음입니다. div와 span은 뜻이 없는 상자입니다. MDN은 'div는 쓰기 편해서 너무 많이 쓰기 쉽다. 뜻이 없어서 코드만 어지럽힌다'고 경고합니다.",
        tables: [
          {
            head: ["요소", "뜻", "랜드마크 역할", "조건"],
            rows: [
              ["<header>", "머리말 묶음", "banner", "article, aside, main, nav, section 밖일 때만"],
              ["<nav>", "주 메뉴", "navigation", "늘"],
              ["<main>", "이 페이지만의 본문", "main", "늘. 보이는 것은 하나만"],
              ["<aside>", "곁다리", "complementary", "article, aside, nav, section 안이면 이름이 있을 때만"],
              ["<section>", "한 부분", "region", "aria-label 같은 이름이 있을 때만"],
              ["<footer>", "꼬리말 묶음", "contentinfo", "header와 같은 조건"],
              ["<div>, <span>", "뜻 없음", "없음 (generic)", ""],
            ],
          },
        ],
        terms: [
          {
            term: "랜드마크 (landmark)",
            body: "페이지의 큰 구역에 붙는 역할입니다. 낭독기는 랜드마크 목록을 보여 주고, 사용자는 '본문', '메뉴'로 바로 건너뜁니다. 건물 안내도의 층별 이름과 같아서, 계단을 하나하나 오르지 않고 엘리베이터로 그 층에 갑니다.",
          },
          {
            term: "역할 (role)과 접근성 트리",
            body: "브라우저는 DOM과 별도로 보조 기술을 위한 접근성 트리를 만듭니다. 거기서 요소마다 역할(button, link, heading, main)과 이름이 붙습니다. 태그에서 저절로 정해지는 역할을 암묵적 역할이라고 합니다. Chrome 개발자 도구의 Elements 패널 옆 Accessibility 탭에서 볼 수 있습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 랜드마크 세어 보기",
        body: "지금 값의 labLandmarks()는 HTML-AAM(HTML이 접근성 트리에 어떻게 옮겨지는지 정한 W3C 문서)의 규칙으로 랜드마크 역할을 셉니다. 같은 header라도 body 바로 아래면 banner이고, article 안이면 역할이 없습니다. 글마다 있는 머리말이 사이트 전체의 머리로 잘못 알려지지 않게 하려는 규칙입니다. section은 이름(aria-label)이 있을 때만 region이 됩니다. 이름 없는 section은 div와 같습니다. Chrome 개발자 도구의 Accessibility 탭으로 이 작은 창을 보면 같은 결과가 나옵니다(banner, navigation '주 메뉴', main, region '본문', complementary, contentinfo). article 안의 header는 sectionheader라는 역할로 보이는데, 랜드마크 목록에는 들어가지 않습니다.",
        lab: {
          html: `<header>사이트 머리</header>
<nav aria-label="주 메뉴"><a href="#a">홈</a> <a href="#b">글</a></nav>
<main>
  <article>
    <header>글의 머리 (article 안이라 banner 아님)</header>
    <section aria-label="본문">이름 있는 section</section>
    <section>이름 없는 section</section>
  </article>
  <aside>곁다리</aside>
</main>
<footer>사이트 꼬리</footer>`,
          height: 250,
          checks: [
            { label: "labLandmarks()", expr: "labLandmarks()" },
            { label: "보이는 main 개수", expr: "document.querySelectorAll('main:not([hidden])').length" },
          ],
          tryIt: "모든 태그를 div로 바꿔 실행해 보세요. 화면은 거의 같은데 랜드마크가 하나도 남지 않습니다.",
        },
      },
      {
        label: "main은 하나, 숨긴 것은 예외",
        body: "MDN 참고서는 '문서에 hidden 속성이 없는 main이 둘 이상 있으면 안 된다'고 적습니다. 반대로 말하면 hidden인 main은 더 있어도 됩니다. 화면을 갈아 끼우는 SPA가 다음 화면의 main을 숨겨 두는 경우입니다. role=\"main\"을 직접 적는 대신 <main> 요소를 쓰라고도 적습니다. 이름이 같은 랜드마크가 둘이면(nav 둘) aria-label로 구별합니다. 낭독기 목록에 '주 메뉴', '바닥 메뉴'처럼 다른 이름으로 나와야 고를 수 있습니다.",
      },
      {
        label: "문제가 나는 경우",
        body: "구조 요소의 실수는 눈으로 보는 화면에서는 거의 티가 나지 않습니다. 랜드마크 목록과 건너뛰기에서 드러납니다.",
        tables: [
          {
            head: ["한 것", "랜드마크에서 생기는 일", "고치는 법"],
            rows: [
              ["전부 div로 나눴다", "랜드마크가 없어 처음부터 끝까지 읽어야 한다", "header, nav, main, footer로 바꾼다"],
              ["article마다 header를 넣었다", "괜찮다. article 안이라 banner가 아니다", "그대로 둔다"],
              ["main을 두 개 보이게 뒀다", "어느 것이 본문인지 모호하다", "하나만 두거나 나머지에 hidden"],
              ["nav가 둘인데 이름이 없다", "'탐색' 두 개가 같은 이름으로 나온다", "aria-label로 이름을 붙인다"],
              ["section을 꾸미기용 상자로 썼다", "이름 없으면 역할이 없다. 뜻도 흐려진다", "꾸미기용이면 div를 쓴다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 화면의 배치와 문서의 뼈대는 따로다",
        body: "화면에서 메뉴가 왼쪽에 있든 위에 있든은 CSS의 일입니다. 문서의 뼈대는 그와 상관없이 '이것은 메뉴, 이것은 본문'이라는 뜻입니다. 낭독기, 읽기 모드, 검색 엔진은 화면 배치가 아니라 이 뼈대를 읽습니다. 그래서 div로 같은 화면을 만들 수는 있지만, 같은 문서를 만들 수는 없습니다. 같은 이유로 '이 상자는 무엇인가'라는 물음에 답이 없을 때만 div를 씁니다.",
      },
      {
        label: "다음 입구",
        body: "문서의 뼈대가 섰으니 이제 문서와 문서를 잇습니다. 7장은 링크입니다. href에 넣는 것에 따라 브라우저가 새 문서를 받기도, 스크롤만 하기도, 메일 앱을 열기도 하는 것을 작은 창에서 열 가지로 눌러 봅니다.",
      },
      {
        label: "확인 질문",
        body: "1) article 안의 header는 banner인가요?\n2) 이름 없는 section과 div는 랜드마크에서 무엇이 다른가요?\n3) main이 두 개여도 되는 경우는?\n4) nav가 둘일 때 낭독기 사용자가 구별할 수 있게 하려면?",
      },
    ],
    sources: [
      { label: "MDN — Structuring documents", href: `${LEARN}/Structuring_documents` },
      { label: "MDN — <main>", href: `${REF}/Elements/main` },
      { label: "W3C — HTML Accessibility API Mappings", href: "https://www.w3.org/TR/html-aam-1.0/" },
    ],
  },

  {
    id: "html-s7",
    name: "7장 · 링크",
    tagline: "href는 주소일 뿐이고, 길은 브라우저가 고른다",
    intro:
      "<a href>는 '여기를 누르면 이 주소로 간다'는 뜻입니다. 그런데 같은 a라도 href에 무엇을 적느냐에 따라 브라우저가 하는 일이 완전히 다릅니다. 새 문서를 받기도 하고, 스크롤만 하기도 하고, 메일 앱을 열기도 하고, 파일로 저장하기도 하고, 코드를 실행하기도 합니다. 이 장은 href에 넣을 수 있는 것을 하나씩 작은 창에 넣고 직접 눌러 봅니다. 기록 줄을 보면 브라우저가 어느 길을 골랐는지, 그때 어떤 이벤트가 어떤 순서로 났는지 보입니다.",
    blocks: [
      {
        label: "링크를 누르면 브라우저가 하는 일",
        body: "HTML 표준은 이것을 '하이퍼링크 따라가기'라고 부릅니다. 순서는 넷입니다.\n(1) click 이벤트가 먼저 페이지 코드에 갑니다. 코드가 event.preventDefault()를 부르면 여기서 끝납니다(9번 실험).\n(2) href 글자를 지금 문서의 주소를 기준으로 풀어 진짜 주소를 만듭니다. getAttribute(\"href\")는 적은 글자 그대로, a.href는 풀어 낸 주소를 돌려줍니다.\n(3) 그 주소와 속성을 보고 길을 고릅니다. 아래 표의 위에서부터 먼저 맞는 길로 갑니다.\n(4) 고른 길에 따라 이벤트가 납니다. 새 문서면 pagehide와 load, 같은 문서 안이면 popstate, scroll, hashchange입니다.\n\n아래 실험의 '예상' 줄은 (3)의 규칙을 그대로 옮겨 미리 읽은 것이고, '실제' 줄은 (4)에서 브라우저가 낸 이벤트입니다.",
        tables: [
          {
            caption: "(3) 길 고르기: 위에서부터 먼저 맞는 것",
            head: ["조건", "가는 길", "실험"],
            rows: [
              ["download 속성 + 같은 출처", "이동하지 않고 파일로 저장", "7번"],
              ["javascript:", "지금 문서에서 코드 실행", "10번"],
              ["mailto:, tel:, sms:", "운영체제의 앱에 넘김", "6번"],
              ['target="_blank" 등 다른 창', "그 창(새 탭)에서 엶", "5번"],
              ["# 앞이 지금 문서와 같음", "문서를 그대로 두고 스크롤", "3번"],
              ["그 밖의 주소", "지금 문서를 내리고 새 문서를 받음", "1, 2, 4번"],
            ],
          },
        ],
        terms: [
          {
            term: "상대 주소와 기준 주소",
            body: "href=\"target.html\"처럼 https:로 시작하지 않는 주소는 상대 주소입니다. 지금 문서의 주소(기준 주소)에서 마지막 / 뒤를 바꿔 끼워 풉니다. 같은 폴더의 다른 파일을 가리키는 셈입니다. 집 주소 대신 '옆집'이라고 말하는 것과 같습니다.",
          },
          {
            term: "출처 (origin)",
            body: "주소의 scheme, host, port 세 가지를 묶은 것입니다. https://a.com:443이 하나의 출처입니다. 셋 중 하나라도 다르면 다른 출처이고, 브라우저는 다른 출처의 문서를 서로 읽지 못하게 막습니다. 같은 건물(출처) 안에서만 서로의 방을 열어 볼 수 있는 규칙입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기 1: 다른 페이지로 가기",
        body: "상대 주소 target.html은 지금 문서(play.html)와 같은 폴더의 target.html로 풀립니다. 누르면 옛 문서가 pagehide로 내려가고 새 문서가 load로 올라옵니다. 옛 문서의 변수와 상태는 이때 함께 사라집니다. 방문 기록(history.length)은 하나 늘어서 뒤로 가기로 돌아올 수 있습니다. 도착한 target.html은 document.referrer에 어디서 왔는지 적혀 있습니다.",
        lab: {
          html: `<a href="target.html">target.html로 가기</a>`,
          height: 150,
          tryIt: 'href를 "/labs/html/target.html", "./target.html?from=1", "없는파일.html"로 바꿔 보세요. 없는 파일이면 서버 응답이 404로 찍힙니다.',
        },
      },
      {
        label: "직접 해 보기 2: 다른 사이트로 가기",
        body: "https:로 시작하는 절대 주소는 기준 주소와 상관없이 그대로 씁니다. 도착한 문서는 출처가 다릅니다. 그래서 이 페이지의 코드는 그 문서의 주소도 내용도 읽지 못합니다. 주소 줄에도 '읽을 수 없다'고 나옵니다. 브라우저의 동일 출처 정책입니다. 사이트가 다른 페이지 안에 표시되는 것을 막아 두었다면(X-Frame-Options) 작은 창은 빈 화면이 됩니다. example.com은 막지 않습니다.",
        lab: {
          html: `<a href="https://example.com/">example.com으로 가기</a>`,
          height: 150,
        },
      },
      {
        label: "직접 해 보기 3: #으로 같은 문서 안에서 움직이기",
        body: "# 앞부분이 지금 문서와 같으면 문서를 새로 받지 않습니다. # 뒤 이름과 같은 id를 가진 요소를 찾아 스크롤만 합니다. popstate가 먼저 나고, 이어서 scroll과 hashchange가 납니다. 둘의 순서는 정해져 있지 않습니다. hashchange는 할 일 줄에 들어가 차례를 기다리고, scroll은 화면을 새로 그리는 때에 맞춰 나기 때문입니다. Chrome 156에서 처음 누를 때는 hashchange(+57ms)가 scroll(+960ms)보다 먼저였고, 다음에 누를 때는 scroll(+30ms)이 먼저였습니다. 방문 기록은 하나 늘어납니다. 도착한 요소는 :target 선택자에 걸려 주황 테두리가 생깁니다.\n\n#top은 특별합니다. id=\"top\"인 요소가 없어도 문서 맨 위로 갑니다. HTML 표준이 '#top이나 빈 #이면 맨 위로'라고 정해 두었습니다. 이미 #top인 상태에서 스크롤을 내리고 #top을 다시 누르면, 스크롤은 하지만 hashchange는 나지 않습니다. 주소가 바뀌지 않았기 때문입니다.",
        lab: {
          html: `<a href="#section2">아래 section2로 (#section2)</a>
<div style="height: 420px; color: #888">… 긴 내용 …</div>
<h3 id="section2">id="section2"인 곳</h3>
<a href="#top">맨 위로 (#top)</a>
<div style="height: 260px"></div>`,
          height: 190,
          checks: [
            { label: "location.hash", expr: "location.hash" },
            { label: "scrollY", expr: "Math.round(scrollY)" },
            { label: "id가 top인 요소", expr: "document.getElementById('top')" },
          ],
          tryIt: 'href="#"만 적어 보세요. # 뒤가 비어 있어도 맨 위로 갑니다. 버튼 대신 href="#"을 쓰면 누를 때마다 화면이 맨 위로 튀는 이유입니다.',
        },
        terms: [
          {
            term: "조각 (fragment)",
            body: "주소에서 # 뒤의 부분입니다. 서버로 보내지 않고 브라우저 안에서만 씁니다. 그래서 #만 바뀌는 이동은 서버에 묻지 않고 문서 안에서 끝납니다. 책의 쪽수와 같아서, 같은 책 안에서 쪽만 넘깁니다.",
          },
        ],
      },
      {
        label: "직접 해 보기 4: href=\"\"로 지금 문서 다시 받기",
        body: "빈 href는 지금 문서의 주소로 풀립니다. 이때 # 뒤는 빠집니다. #이 없는 같은 주소로 가면 브라우저는 문서를 새로 받습니다. 새로 고침과 비슷하게 pagehide 뒤에 load가 납니다. 다만 방문 기록은 늘지 않습니다(17 → 17). 지금 기록을 새 문서로 바꿔 끼우기 때문입니다. 기록에 '새 문서라 play.html이 코드를 처음부터 다시 쓴다'는 줄이 끼는 것도 보세요. 문서를 새로 받으면 그 안의 모든 것이 처음부터 다시 만들어집니다.",
        lab: {
          html: `<a href="">지금 문서 다시 받기 (href="")</a>`,
          height: 140,
          checks: [{ label: "history.length", expr: "history.length" }],
        },
      },
      {
        label: "직접 해 보기 5: target=\"_blank\"와 opener",
        body: "target=\"_blank\"는 새 탭을 만들고 거기서 엽니다. 이 작은 창에는 아무 이벤트도 없습니다. 새 탭의 target.html이 도착 소식을 보내 오면 기록에 window.opener 값이 찍힙니다.\n\n요즘 브라우저는 _blank에 rel=\"noopener\"를 저절로 붙입니다. 그래서 새 탭의 window.opener가 null이고, 새 탭이 원래 창을 움직일 수 없습니다. rel=\"opener\"를 적으면 opener가 남습니다. 새 탭의 'opener의 주소 바꿔 보기' 버튼을 누르면 원래 탭의 작은 창이 바뀝니다. 낯선 사이트가 이 틈으로 원래 탭을 가짜 로그인 페이지로 바꾸는 공격을 리버스 탭내빙(reverse tabnabbing)이라고 부릅니다.",
        lab: {
          html: `<a href="target.html" target="_blank">새 탭에서 열기</a>
<br>
<a href="target.html" target="_blank" rel="opener">새 탭 + rel="opener"</a>`,
          height: 150,
          tryIt: 'rel="noreferrer"를 붙여 보세요. 새 탭의 document.referrer까지 비어 있습니다.',
        },
        terms: [
          {
            term: "opener",
            body: "새 탭에서 '나를 연 창'을 가리키는 window.opener입니다. 남아 있으면 새 탭이 원래 창의 주소를 바꿀 수 있습니다. 집 열쇠를 손님에게 복사해 준 것과 같아서, 요즘 브라우저는 _blank일 때 기본으로 열쇠를 주지 않습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기 6: mailto:와 tel:",
        body: "mailto:와 tel:은 웹 문서의 주소가 아닙니다. 브라우저는 문서를 바꾸지 않고 주소를 운영체제에 넘깁니다. 운영체제가 기본 메일 앱이나 전화 앱을 엽니다. 그래서 작은 창에는 click 말고 아무 이벤트도 나지 않습니다. 앱이 열렸는지 페이지는 알 수 없습니다.\n\n주소 줄을 보면 한글 '문의'가 %EB%AC%B8%EC%9D%98로 바뀌어 있습니다. 주소에는 퍼센트 인코딩된 글자만 들어가기 때문입니다. tel:은 +82 같은 국가 번호로 시작해야 어느 나라에서 눌러도 맞게 걸립니다. 하이픈은 읽기 편하라고 넣은 것입니다.",
        lab: {
          html: `<a href="mailto:hello@example.com?subject=문의&body=안녕하세요">메일 쓰기</a>
<br>
<a href="tel:+82-2-1234-5678">전화 걸기</a>`,
          height: 140,
          tryIt: "누르면 이 컴퓨터의 메일 앱이나 전화 앱이 실제로 열립니다. 열고 싶지 않으면 기록의 주소 줄만 보세요.",
        },
        terms: [
          {
            term: "퍼센트 인코딩",
            body: "주소에 쓸 수 없는 글자(한글, 공백 등)를 UTF-8 바이트로 바꾼 뒤 바이트마다 %와 16진수 두 자리로 적는 방법입니다. '문'은 세 바이트라 %EB%AC%B8이 됩니다. 소포에 받는 사람 이름을 로마자로 적는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기 7: download로 파일 받기",
        body: "download 속성이 있으면 이동하지 않고 파일로 저장합니다. 값은 저장할 파일 이름입니다. 문서는 그대로라 작은 창에는 아무 이벤트도 없습니다. MDN은 'download는 같은 출처의 주소와 blob:, data:에서만 동작한다'고 적습니다. 다른 사이트의 파일이면 속성을 무시하고 그냥 이동합니다. download가 없으면 txt 파일을 문서처럼 엽니다. 작은 창에 글자가 그대로 보입니다.",
        lab: {
          html: `<a href="sample.txt" download="인사.txt">파일로 받기 (download)</a>
<br>
<a href="sample.txt">download 없이 열기</a>`,
          height: 140,
          tryIt: "첫 링크를 누르면 이 컴퓨터에 인사.txt가 실제로 저장됩니다.",
        },
      },
      {
        label: "직접 해 보기 8: href가 없는 a",
        body: "href가 없으면 링크가 아닙니다. 눌러도 아무 일이 없고, 밑줄과 손가락 커서도 없습니다. 브라우저 기본 스타일이 :any-link(href가 있는 a)에만 붙기 때문입니다. Tab 키로도 가지 않습니다. 작은 창을 한 번 누르고 Tab을 눌러 보세요. href 있는 a만 포커스를 받습니다. 키보드 사용자에게는 없는 것과 같습니다. 눌러서 무언가를 실행하는 것은 링크가 아니라 버튼이고, 그때는 <button type=\"button\">을 씁니다.",
        lab: {
          html: `<a>href 없는 a</a>
<br>
<a href="target.html">href 있는 a</a>`,
          height: 140,
          logFocus: true,
          checks: [{ label: "document.activeElement", expr: "document.activeElement" }],
        },
      },
      {
        label: "직접 해 보기 9: preventDefault()와 pushState()",
        body: "click 이벤트는 페이지 코드가 먼저 받습니다. 코드가 event.preventDefault()를 부르면 브라우저는 길을 고르지 않습니다. history.pushState()는 문서를 그대로 두고 주소와 방문 기록만 바꿉니다. 그래서 load 없이 주소만 /labs/html/about으로 바뀝니다.\n\nVue Router와 NuxtLink가 이 방식입니다. href에는 진짜 주소를 남겨 둡니다. 그래서 새 탭으로 열기와 검색 엔진은 그대로 동작합니다. 누른 뒤 주소 줄 옆의 새로 고침을 눌러 보세요. 서버에 /labs/html/about을 묻고, 그런 파일이 없으니 404가 납니다. SPA를 올리는 서버가 모르는 주소에도 index.html을 돌려주도록 설정하는 이유입니다.",
        lab: {
          html: `<a href="target.html" onclick="
  event.preventDefault();
  history.pushState(null, '', 'about');
  document.querySelector('#out').textContent = '지금 주소: ' + location.pathname;
">target.html (하지만 막음)</a>
<p id="out"></p>`,
          height: 150,
          checks: [
            { label: "location.pathname", expr: "location.pathname" },
            { label: "history.length", expr: "history.length" },
          ],
        },
        terms: [
          {
            term: "preventDefault()",
            body: "이벤트의 기본 동작(링크 이동, 폼 보내기, 체크 바꾸기)을 취소하는 메서드입니다. 이벤트는 그대로 퍼지고 기본 동작만 빠집니다. 택배 기사가 문 앞까지 왔지만 '두고 가지 마세요'라고 말한 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기 10: javascript: 주소",
        body: "href가 javascript:로 시작하면 주소 대신 코드를 실행합니다. 지금 문서 안에서 돌아가서, 누르면 작은 창의 배경이 실제로 금색이 됩니다. 사용자가 적은 값(프로필의 홈페이지 주소 같은 것)을 그대로 href에 넣으면 위험합니다. 누군가 javascript:를 적어 두면 다른 사람이 그 링크를 누를 때 코드가 실행됩니다. 이것이 XSS의 한 갈래입니다. 그래서 사용자 값을 href에 넣기 전에 http:나 https:로 시작하는지 검사합니다. React는 javascript: 주소를 넣으면 경고를 내고 막습니다.",
        lab: {
          html: `<a href="javascript:document.body.style.background = 'gold'; void 0">배경을 바꾸는 링크</a>`,
          height: 140,
          checks: [{ label: "body의 배경", expr: "document.body.style.background || '(없음)'" }],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "링크가 뜻밖의 길로 갈 때의 표입니다. 대부분은 href 글자가 어떻게 풀리는지, 또는 위 길 고르기 표의 어느 칸에 걸리는지로 설명됩니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ['버튼처럼 쓴 a를 누르면 화면이 맨 위로 튄다', 'href="#"은 맨 위로 가는 주소다', "<button type=\"button\">을 쓴다"],
              ["하위 폴더 페이지에서 링크가 404", "상대 주소가 지금 폴더 기준으로 풀렸다", "/로 시작하는 주소를 쓴다"],
              ["SPA에서 새로 고침하면 404", "pushState로 만든 주소를 서버가 모른다", "서버가 모르는 주소에 index.html을 준다"],
              ["download인데 파일 대신 이동한다", "다른 출처의 파일이다", "같은 출처로 받거나 서버가 Content-Disposition을 준다"],
              ["새 탭이 원래 탭을 바꿨다", 'rel="opener"가 있었다', "rel을 지우거나 noopener를 적는다"],
              ["사용자 링크로 코드가 실행됐다", "href에 javascript:가 들어갔다", "http:, https:만 허락한다"],
              ["Tab으로 링크에 안 간다", "href가 없는 a다", "href를 적거나 button을 쓴다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 링크는 주소이고, 길은 브라우저가 고른다",
        body: "a 태그가 하는 일은 '주소 하나를 들고 있는 것'뿐입니다. 그 주소로 무엇을 할지는 브라우저가 정해진 순서로 고릅니다. 그래서 링크 문제를 볼 때는 두 가지만 확인하면 됩니다. 첫째, href 글자가 어떤 진짜 주소로 풀렸나(a.href). 둘째, 그 주소가 길 고르기 표의 어느 칸에 걸렸나. 아래 표는 위 실험 열 가지를 기록 그대로 한데 모은 것입니다.",
        tables: [
          {
            caption: "열 가지 실험의 결과",
            head: ["href", "문서를 새로 받나", "작은 창 주소", "나는 이벤트", "처리하는 쪽"],
            rows: [
              ["target.html", "예", "새 주소", "pagehide → load, 기록 +1", "브라우저"],
              ["https://example.com/", "예", "새 주소 (다른 출처라 못 읽음)", "pagehide → load", "브라우저"],
              ["#section2, #top, #", "아니요", "# 뒤만 바뀜", "popstate → scroll, hashchange, 기록 +1", "브라우저"],
              ['""', "예 (같은 주소를 다시)", "그대로", "pagehide → load, 기록 그대로", "브라우저"],
              ['target="_blank"', "새 탭에서만", "그대로", "이 창에는 없음, 새 탭의 opener = null", "브라우저"],
              ["mailto:, tel:", "아니요", "그대로", "없음", "운영체제의 앱"],
              ["download", "아니요", "그대로", "없음, 파일 저장", "브라우저 내려받기"],
              ["(href 없음)", "아니요", "그대로", "없음, Tab으로도 못 감", "없음"],
              ["preventDefault + pushState", "아니요", "코드가 바꾼 주소", "load 없음, 기록 +1", "페이지 코드"],
              ["javascript:", "아니요", "그대로", "없음, 코드만 실행", "지금 문서의 코드"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "링크는 다른 문서로 가는 길이고, 이미지는 다른 파일을 이 문서 안으로 가져오는 길입니다. 8장은 img가 어떤 파일을 고르고(srcset), 언제 받고(loading), 받기 전에 자리를 얼마나 잡는지(width, height)를 작은 창에서 확인합니다.",
      },
      {
        label: "확인 질문",
        body: '1) href="#"과 href=""은 각각 무엇을 하나요? 문서를 새로 받는 쪽은?\n2) #top으로 맨 위에 간 뒤 같은 링크를 다시 누르면 hashchange가 나나요? 왜요?\n3) target="_blank" 링크에서 새 탭의 window.opener는 무엇인가요? rel="opener"를 붙이면?\n4) NuxtLink가 href를 남겨 두면서도 문서를 새로 받지 않는 방법은?\n5) 사용자가 입력한 주소를 href에 넣기 전에 무엇을 검사해야 하나요?',
      },
    ],
    sources: [
      { label: "MDN — Creating links", href: `${LEARN}/Creating_links` },
      { label: "MDN — <a>: The Anchor element", href: `${REF}/Elements/a` },
      { label: "WHATWG — Following hyperlinks", href: `${SPEC}/links.html#following-hyperlinks-2` },
      { label: "WHATWG — Navigating to a fragment", href: `${SPEC}/browsing-the-web.html#scroll-to-fragid` },
    ],
  },

  {
    id: "html-s8",
    name: "8장 · 이미지",
    tagline: "img는 파일을 고르고, 받고, 자리를 잡는다",
    intro:
      "<img>는 다른 파일(그림)을 문서 안에 들여옵니다. 겉보기에는 src 하나면 될 것 같지만, 브라우저는 세 가지를 따로 합니다. 여러 후보 중 어느 파일을 받을지 고르고(srcset, sizes, picture), 언제 받을지 정하고(loading), 받기 전에 화면에 자리를 얼마나 잡을지 정합니다(width, height). 그림을 못 받았을 때 대신 보여 줄 글자(alt)도 img가 들고 있습니다. 이 장은 이 넷을 작은 창에서 하나씩 확인합니다.",
    blocks: [
      {
        label: "img의 속성",
        body: "MDN은 alt를 '그림을 대신하는 글자로, 반드시 있어야 한다'고 적습니다. 그림이 꾸밈일 뿐이면 alt=\"\"로 비웁니다. 그러면 낭독기가 건너뛰고, 그림을 못 받아도 깨진 그림 표시를 숨깁니다. title은 alt를 대신할 수 없다고도 적습니다. width와 height는 그림의 본래 크기를 알려 줍니다. 브라우저는 그 비율로 받기 전부터 자리를 잡아, 그림이 도착했을 때 아래 글이 밀려 내려가는 일(레이아웃 이동)을 막습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "적지 않으면"],
            rows: [
              ["src", "기본 파일", "받을 것이 없다"],
              ["alt", "그림 대신 읽고 보여 줄 글자", "낭독기가 파일 이름을 읽기도 한다"],
              ["width, height", "본래 크기. 비율로 자리를 미리 잡는다", "받는 순간 아래 글이 밀린다"],
              ["srcset, sizes", "크기와 밀도별 후보, 화면에서 차지할 폭", "작은 화면에도 큰 파일을 받는다"],
              ['loading="lazy"', "화면 가까이 와야 받는다", "보이지 않는 그림도 처음에 다 받는다"],
              ['fetchpriority="high"', "다른 그림보다 먼저 받는다", "브라우저가 정한 순서"],
            ],
          },
        ],
        terms: [
          {
            term: "대체 텍스트 (alt)",
            body: "그림을 볼 수 없을 때 그림 대신 쓰이는 글자입니다. 낭독기가 읽고, 그림을 못 받으면 그 자리에 보입니다. 사진을 전화로 설명해 줄 때 하는 말이라고 생각하고 적습니다.",
          },
          {
            term: "레이아웃 이동 (layout shift)",
            body: "늦게 도착한 그림이 자리를 차지하면서 이미 그려진 글과 버튼이 밀리는 현상입니다. 누르려던 버튼이 내려가 다른 것을 누르게 됩니다. 자리를 맡아 두지 않은 식당에 일행이 늦게 와서 다 같이 자리를 옮기는 것과 같습니다.",
          },
          {
            term: "기기 픽셀 비율 (devicePixelRatio)",
            body: "CSS 1px에 화면의 진짜 점(픽셀)이 몇 개 들어가는지입니다. 레티나 화면은 2라서, 100px 폭에 200점짜리 그림을 넣어야 선명합니다. srcset의 1x, 2x가 이 값을 보고 고릅니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 그림이 없을 때 alt와 자리",
        body: "다섯 img 모두 없는 파일을 가리킵니다. 기록에 error가 다섯 번 찍힙니다. 지금 값은 각 img가 실제로 차지한 크기입니다. alt가 있으면 깨진 그림 표시와 alt 글자가 보이고, 자리는 그 글자만큼입니다(1번). alt=\"\"면 아무것도 보이지 않습니다(2번, 0×0). 깨진 그림 표시까지 숨깁니다.\n\n3번이 뜻밖입니다. width와 height를 적었는데도 160×90이 아니라 alt 글자만큼으로 줄었습니다. HTML 표준의 그리기 규칙은 '그림이 곧 올 거라고 믿을 이유가 있을 때'만 크기 자리를 지킵니다. 이미 실패한 그림에 alt가 있으면 크기를 버리고 alt 글자로 바꿔 그립니다. alt가 없는 5번만 160×90을 지킵니다. 크기 속성이 자리를 잡아 주는 때는 '받는 중'이고, 그것은 아래 lazy 실험에서 봅니다.",
        lab: {
          html: `<p>1. alt 있음: <img src="없는그림.png" alt="고양이가 자는 사진"></p>
<p>2. alt="": <img src="없는그림.png" alt=""></p>
<p>3. alt 있음 + 크기: <img src="없는그림.png" alt="자리" width="160" height="90"></p>
<p>4. alt 없음: <img src="없는그림.png"></p>
<p>5. alt 없음 + 크기: <img src="없는그림.png" width="160" height="90"></p>`,
          height: 330,
          checks: [
            {
              label: "차지한 크기",
              expr: "[...document.images].map((img, i) => (i + 1) + '번 ' + img.offsetWidth + '×' + img.offsetHeight)",
            },
          ],
        },
      },
      {
        label: "직접 해 보기: srcset이 고르는 파일",
        body: "첫 img는 너비 기술자(400w, 800w, 1600w)와 sizes를 씁니다. 브라우저는 sizes에서 '이 그림이 화면에서 차지할 폭'을 읽고, 거기에 기기 픽셀 비율을 곱한 만큼의 파일을 고릅니다. 작은 창이 600px보다 넓으면 300px, 레티나(2배)면 600점이 필요해서 800w를 고릅니다. 둘째 img는 밀도 기술자(1x, 2x)라 기기 픽셀 비율만 봅니다. 지금 값의 currentSrc가 실제로 고른 파일입니다. 레티나 화면(devicePixelRatio 2)의 Chrome 156, 작은 창 폭 867px에서는 첫 img가 photo-800.svg를, 둘째가 dot-2x.svg를 골랐습니다. 기록의 load 줄에서 naturalWidth가 800이 아니라 300인 것도 보세요. 브라우저는 고른 파일의 폭을 밀도(800w ÷ 300px)로 나눠 'CSS 픽셀로 본 그림 크기'로 다룹니다. MDN은 한 srcset에 w와 x를 섞으면 틀린다고 적습니다.",
        lab: {
          html: `<img src="photo-400.svg" alt="너비 기술자"
     srcset="photo-400.svg 400w, photo-800.svg 800w, photo-1600.svg 1600w"
     sizes="(max-width: 600px) 100vw, 300px" width="300">
<img src="dot-1x.svg" alt="밀도 기술자" srcset="dot-1x.svg 1x, dot-2x.svg 2x" width="120">`,
          height: 260,
          checks: [
            { label: "devicePixelRatio", expr: "devicePixelRatio" },
            { label: "작은 창 폭 (innerWidth)", expr: "innerWidth" },
            { label: "첫 img의 currentSrc", expr: "document.images[0].currentSrc.split('/').pop()" },
            { label: "둘째 img의 currentSrc", expr: "document.images[1].currentSrc.split('/').pop()" },
          ],
          tryIt: 'sizes를 "100vw"로 바꿔 실행해 보세요. 필요한 점 수가 커져 더 큰 파일을 고릅니다.',
        },
      },
      {
        label: "직접 해 보기: picture로 형식 고르기",
        body: "<picture>는 <source>를 위에서부터 보고 처음 맞는 것을 고릅니다. type이 이 브라우저가 모르는 형식이면 건너뜁니다. 아무것도 맞지 않으면 안쪽 <img>의 src를 씁니다. MDN은 '어느 경우든 src와 alt가 있는 img를 넣어야 한다'고 적습니다. 실제로 화면에 그려지는 것은 늘 그 img이고, source는 img가 받을 파일만 바꿉니다. 아래에서 AVIF(주황)를 고르면 이 브라우저가 AVIF를 아는 것입니다. 첫 source의 type을 지어낸 형식으로 바꾸면 JPEG(파랑)로 내려갑니다.",
        lab: {
          html: `<picture>
  <source srcset="photo.avif" type="image/avif">
  <img src="photo.jpg" alt="picture가 고른 그림" width="200" height="150">
</picture>`,
          height: 190,
          checks: [{ label: "img의 currentSrc", expr: "document.images[0].currentSrc.split('/').pop()" }],
          tryIt: 'type="image/avif"를 type="image/x-없는형식"으로 바꿔 실행해 보세요.',
        },
      },
      {
        label: "직접 해 보기: loading=\"lazy\"",
        body: "lazy인 그림은 화면 가까이 와야 받기 시작합니다. 얼마나 가까워야 하는지는 브라우저가 정합니다. 아래 두 그림은 긴 빈칸 밑에 있어서 처음에는 받지 않습니다. 지금 값의 complete가 둘 다 false입니다. 이때 차지한 크기를 보세요. width, height를 적은 첫 그림은 받기 전부터 200×150 자리를 잡고 있고, 적지 않은 둘째는 0×0입니다. 작은 창 안을 끝까지 스크롤하면 기록에 load가 두 번 찍히고, 둘째는 0×0에서 800×600으로 갑자기 커집니다. 그 600px만큼 아래 내용이 밀리는 것이 레이아웃 이동입니다.\n\nMDN은 lazy가 자바스크립트가 켜져 있을 때만 미뤄진다고 적습니다. 꺼져 있으면 추적에 쓰일 수 있어서 그냥 바로 받습니다.",
        lab: {
          html: `<p>작은 창 안을 아래로 끝까지 스크롤해 보세요.</p>
<div style="height: 3200px; color: #888">… 긴 내용 …</div>
<img src="photo-400.svg" loading="lazy" alt="크기를 적은 그림" width="200" height="150">
<img src="photo-800.svg" loading="lazy" alt="크기를 안 적은 그림">`,
          height: 170,
          checks: [
            { label: "complete", expr: "[...document.images].map((img) => img.complete)" },
            {
              label: "차지한 크기",
              expr: "[...document.images].map((img, i) => (i + 1) + '번 ' + img.offsetWidth + '×' + img.offsetHeight)",
            },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "img 문제는 대부분 고르기, 받기, 자리 잡기 중 하나에서 생깁니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["그림이 뜰 때 글이 아래로 밀린다", "width, height가 없다", "본래 크기를 적고 CSS로 width: 100%, height: auto"],
              ["휴대폰에서 큰 파일을 받는다", "srcset, sizes가 없다", "폭별 후보와 sizes를 적는다"],
              ["sizes를 바꿔도 같은 파일", "w가 아니라 x 기술자를 썼다", "sizes는 w 기술자와만 쓴다"],
              ["창 폭을 바꿨는데 파일이 바뀌기도, 안 바뀌기도 한다", "srcset의 후보 고르기는 표준이 브라우저에 맡긴다. Chrome은 폭이 바뀌면 다시 골라 작은 파일을 받기도 한다", "꼭 바꿔야 하면 picture의 source media로 정한다"],
              ["첫 화면 큰 그림이 늦게 뜬다", "첫 화면 그림에 lazy를 붙였다", "첫 화면 그림은 lazy를 빼고 fetchpriority=\"high\""],
              ["낭독기가 'IMG_2031.jpg'라고 읽는다", "alt가 없다", "뜻 있는 그림은 alt, 꾸밈은 alt=\"\""],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 고르기, 받기, 자리 잡기",
        body: "img 하나는 세 단계를 따로 거칩니다. 어느 단계의 속성인지 알면 문제의 자리가 보입니다. 고르기는 화면 폭과 기기 픽셀 비율이 정해진 뒤에 일어나고, 받기는 그림이 화면 가까이 왔는지에 달려 있고, 자리 잡기는 파일이 오기 전에 일어납니다. 세 단계가 서로 다른 때에 일어나서, 한 속성으로 다른 단계의 문제를 고칠 수 없습니다.",
        tables: [
          {
            head: ["단계", "정하는 속성", "확인하는 값"],
            rows: [
              ["고르기", "srcset, sizes, <picture>의 <source>", "img.currentSrc"],
              ["받기", "loading, fetchpriority, decoding", "img.complete, load와 error 이벤트"],
              ["자리 잡기", "width, height, CSS aspect-ratio", "img.offsetWidth, offsetHeight (받기 전에도)"],
              ["대신하기", "alt", "그림을 못 받았을 때 보이는 글자, 낭독기가 읽는 이름"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "그림 다음은 움직이는 그림과 소리입니다. 9장은 video와 audio가 여러 source 중 무엇을 고르는지, 소리 있는 autoplay가 왜 막히는지, 자막(track)이 어떻게 붙는지를 작은 창에서 확인합니다.",
      },
      {
        label: "확인 질문",
        body: '1) 꾸밈용 그림의 alt는 어떻게 적나요? 그 그림을 못 받으면 무엇이 보이나요?\n2) width와 height를 적으면 무엇이 좋아지나요?\n3) sizes="300px"이고 기기 픽셀 비율이 2면 몇 점짜리 파일이 필요한가요?\n4) <picture>에서 실제로 화면에 그려지는 요소는 무엇인가요?',
      },
    ],
    sources: [
      { label: "MDN — HTML images", href: `${LEARN}/HTML_images` },
      { label: "MDN — <img>", href: `${REF}/Elements/img` },
      { label: "MDN — Responsive images", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images" },
      { label: "MDN — <picture>", href: `${REF}/Elements/picture` },
    ],
  },

  {
    id: "html-s9",
    name: "9장 · 비디오와 오디오",
    tagline: "미디어 요소는 고르고, 기다리고, 허락을 받는다",
    intro:
      "<video>와 <audio>는 영상과 소리를 문서 안에서 재생합니다. img처럼 파일을 고르지만 더 복잡합니다. 브라우저마다 재생할 수 있는 형식이 달라서 후보를 여러 개 적고(source), 파일이 길어서 얼마나 미리 받을지 정하고(preload), 갑자기 소리가 나면 사용자가 놀라서 브라우저가 소리 있는 자동 재생을 막습니다(autoplay 정책). 이 장은 미디어 요소가 내는 이벤트를 작은 창에서 직접 보며 그 셋을 확인합니다.",
    blocks: [
      {
        label: "속성",
        body: "MDN은 '사용자가 재생을 제어할 수 있어야 한다. 적어도 시작, 멈춤, 볼륨 조절이 있어야 한다'고 적습니다. controls를 붙이면 브라우저의 기본 조작판이 생깁니다. 자동 재생은 권하지 않습니다. autoplay=\"false\"로는 끌 수 없고 속성을 지워야 합니다(1장의 불 속성). muted도 같습니다.",
        tables: [
          {
            head: ["속성", "하는 일", "알아 둘 것"],
            rows: [
              ["controls", "기본 조작판을 보인다", "없으면 재생할 방법이 없다"],
              ["autoplay", "준비되면 바로 재생", "소리가 있으면 브라우저가 막을 수 있다"],
              ["muted", "소리를 끈 채 시작", "muted면 autoplay가 대개 허락된다"],
              ["preload", "none, metadata, auto", "힌트일 뿐이다. MDN은 metadata를 권한다"],
              ["poster (video만)", "재생 전 보여 줄 그림", "없으면 첫 프레임이 나올 때까지 빈칸"],
              ["<source type>", "형식별 후보", "모르는 type은 받지도 않고 건너뛴다"],
              ["<track kind>", "자막(captions), 설명(descriptions)", "WebVTT 파일. audio에서는 안 보인다"],
            ],
          },
        ],
        terms: [
          {
            term: "WebVTT",
            body: "자막 파일 형식입니다. 'WEBVTT' 한 줄로 시작하고, '00:00:00.000 --> 00:00:01.500' 같은 시간 줄 아래에 그때 보일 자막을 적습니다. 대본에 시간표를 붙인 것입니다.",
          },
          {
            term: "autoplay 정책",
            body: "소리 있는 미디어가 사용자 동작 없이 재생되는 것을 브라우저가 막는 규칙입니다. 소리를 끄거나(muted), 사용자가 그 사이트를 한 번이라도 누르면 풀립니다. 극장에서 관객이 자리에 앉기 전에는 영화를 틀지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: source 고르기와 미디어 이벤트",
        body: "브라우저는 source를 위에서부터 차례로 시도합니다. 첫 source는 없는 파일이라 실패하고, 기록에 그 source의 error가 찍힙니다. 둘째 webm을 이 브라우저가 재생할 수 있으면 그것을 고르고 loadedmetadata(길이, 크기를 알게 됨)가 납니다. 셋째 mp4는 받지도 않습니다. 재생 버튼을 누르면 play, 멈추면 pause가 찍힙니다. 끝까지 재생하면 paused가 true로 바뀌면서 pause가 먼저 나고, 이어서 ended가 납니다. 자막(track)은 default라서 켜진 채 시작합니다(mode가 showing). Chrome 156에서는 없는 mp4의 error 다음에 webm을 골라 loadedmetadata(길이 3.01초, 320×180)가 났습니다.\n\nMDN은 '대체 문구는 video를 지원하지 않는 브라우저에서만 보이고, source가 모두 실패할 때는 보이지 않는다'고 적습니다. source를 모두 없는 파일로 바꿔 보면, 대체 문구 대신 빈 조작판이 남습니다.",
        lab: {
          html: `<video controls width="320" poster="poster.svg" preload="metadata">
  <source src="없는영상.mp4" type="video/mp4">
  <source src="clip.webm" type="video/webm">
  <source src="clip.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="ko" label="한국어" default>
  이 브라우저는 video를 지원하지 않습니다.
</video>`,
          height: 230,
          checks: [
            { label: "currentSrc", expr: "document.querySelector('video').currentSrc.split('/').pop()" },
            { label: "paused", expr: "document.querySelector('video').paused" },
            { label: "currentTime", expr: "document.querySelector('video').currentTime.toFixed(2)" },
            { label: "자막 mode", expr: "document.querySelector('video').textTracks[0]?.mode" },
          ],
          tryIt: "재생을 누르고 끝까지 보세요. 소리는 작게 줄여 둔 3초짜리 삐 소리입니다.",
        },
      },
      {
        label: "직접 해 보기: 소리 있는 autoplay는 막힌다",
        body: "두 video 모두 autoplay인데 하나는 muted입니다. 스크립트가 play()를 부르고 그 결과를 출력합니다. 이 페이지에서 아직 아무것도 누르지 않았다면 소리 있는 쪽은 NotAllowedError로 막히고, muted 쪽만 재생됩니다. 지금 값의 '이 탭에서 누른 적'이 false인 상태입니다. 이 탭 어디든 한 번 누른 뒤(이 코드로 실행 버튼도 됩니다) 다시 실행하면 둘 다 재생됩니다. Chrome의 정책이 '사용자가 이 사이트와 상호작용했는가'를 보기 때문입니다. 같은 코드가 상황에 따라 다르게 동작하므로, 자동 재생에 기대는 화면은 늘 막힌 경우를 함께 만들어 둡니다.",
        lab: {
          html: `<video autoplay src="clip.mp4" width="150"></video>
<video autoplay muted src="clip.mp4" width="150"></video>
<script>
  for (const v of document.querySelectorAll('video')) {
    const who = v.muted ? 'muted 쪽' : '소리 있는 쪽';
    v.play().then(() => console.log(who + ': 재생 시작'), (e) => console.log(who + ': ' + e.name));
  }
</script>`,
          height: 120,
          checks: [
            { label: "paused", expr: "[...document.querySelectorAll('video')].map((v) => v.paused)" },
            { label: "이 탭에서 누른 적", expr: "top.navigator.userActivation.hasBeenActive" },
          ],
        },
      },
      {
        label: "직접 해 보기: audio와 preload",
        body: "audio는 영상이 없는 video와 같습니다. MDN은 audio가 width, height, poster를 지원하지 않는다고 적습니다. 아래 둘은 같은 파일인데 preload만 다릅니다. preload=\"none\"은 재생을 누르기 전까지 아무것도 받지 않아 readyState가 0, 길이(duration)가 NaN입니다. preload=\"metadata\"는 길이와 형식만 먼저 받으라는 뜻인데, 실제로는 readyState가 1(메타데이터)이 아니라 4(끝까지 재생할 만큼)였습니다. 1.5초짜리 작은 파일이라 브라우저가 힌트보다 많이 받은 것입니다. MDN이 preload를 '힌트일 뿐이고, 브라우저가 따르도록 강제하지 않는다'고 적은 그대로입니다.",
        lab: {
          html: `<p>preload="none"<br><audio controls preload="none" src="tone.wav"></audio></p>
<p>preload="metadata"<br><audio controls preload="metadata" src="tone.wav"></audio></p>`,
          height: 170,
          checks: [
            { label: "readyState", expr: "[...document.querySelectorAll('audio')].map((a) => a.readyState)" },
            { label: "duration", expr: "[...document.querySelectorAll('audio')].map((a) => a.duration)" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "미디어 문제는 '어느 파일을 골랐나'와 '재생이 허락됐나'에서 대부분 생깁니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["Safari에서만 영상이 안 나온다", "그 브라우저가 못 여는 형식 하나만 적었다", "mp4(H.264) source를 함께 적는다"],
              ["배경 영상이 자동 재생되지 않는다", "소리 있는 autoplay가 막혔다", "muted와 playsinline을 붙인다"],
              ["play() 뒤 에러가 콘솔에 남는다", "play()의 Promise 거절을 안 받았다", ".catch로 막힌 경우를 처리한다"],
              ["source가 다 실패했는데 대체 문구가 없다", "대체 문구는 미지원 브라우저에서만 보인다. 이때 error는 video가 아니라 각 source에 난다", "마지막 source의 error를 듣거나 video.networkState가 3(NETWORK_NO_SOURCE)인지 본다"],
              ["autoplay=\"false\"인데 재생된다", "불 속성이라 값과 상관없이 켜진다", "속성을 지운다"],
              ["자막이 안 보인다", "track이 source보다 앞에 있거나 default가 없다", "track은 source 뒤에, default를 붙인다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 미디어 요소는 상태를 가진다",
        body: "img는 '받았다, 못 받았다' 둘뿐이지만 미디어 요소는 상태가 많습니다. 무엇을 아는지(readyState: 0 아무것도, 1 메타데이터, 4 끝까지 재생할 만큼), 재생 중인지(paused), 어디까지 재생했는지(currentTime)입니다. 상태가 바뀔 때마다 이벤트가 납니다. 그래서 미디어를 다루는 코드는 '지금 상태'를 묻는 대신 이벤트를 기다립니다. 영상 길이가 필요하면 loadedmetadata를, 재생이 시작됐는지는 playing을 기다립니다. 자동 재생도 상태의 하나라, 요청(play())과 결과(Promise)가 따로 옵니다.",
        tables: [
          {
            head: ["알고 싶은 것", "기다릴 이벤트", "읽을 값"],
            rows: [
              ["길이와 크기", "loadedmetadata", "duration, videoWidth"],
              ["재생이 시작됐나", "play, playing", "paused"],
              ["자동 재생이 허락됐나", "play()의 Promise", "거절이면 NotAllowedError"],
              ["끝났나", "ended", "currentTime === duration"],
              ["모든 source가 실패했나", "마지막 source의 error", "networkState가 3 (NETWORK_NO_SOURCE)"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "그림과 영상은 파일 하나를 들여옵니다. 10장의 iframe은 문서 하나를, 그 문서의 window와 출처째로 들여옵니다. 이 허브의 작은 창도 iframe입니다. sandbox가 그 안의 문서에서 무엇을 빼앗는지 작은 창 안의 작은 창으로 확인합니다.",
      },
      {
        label: "확인 질문",
        body: "1) source가 셋일 때 브라우저는 셋을 모두 받나요?\n2) 소리 있는 autoplay가 막혔는지 코드에서 어떻게 아나요?\n3) preload=\"none\"인 audio의 duration은 무엇인가요?\n4) muted=\"false\"로 소리를 켤 수 있나요?",
      },
    ],
    sources: [
      { label: "MDN — HTML video and audio", href: `${LEARN}/HTML_video_and_audio` },
      { label: "MDN — <video>", href: `${REF}/Elements/video` },
      { label: "Chrome — Autoplay policy", href: "https://developer.chrome.com/blog/autoplay" },
    ],
  },

  {
    id: "html-s10",
    name: "10장 · iframe과 임베드",
    tagline: "iframe은 파일이 아니라 창 하나를 통째로 들여온다",
    intro:
      "<iframe>은 문서 안에 다른 문서를 넣습니다. 지도, 영상 플레이어, 결제창이 대개 iframe입니다. 그림과 달리 iframe 안에는 자기만의 window와 document가 있고, 자기만의 출처가 있습니다. 브라우저 렌더링 허브 11장이 그 구조를 다뤘다면, 이 장은 HTML 속성으로 그 창을 어떻게 다루는지 봅니다. 무엇을 못 하게 막을지(sandbox), 무슨 권한을 줄지(allow), 파일 대신 글자로 넣을지(srcdoc), 언제 불러올지(loading)입니다.",
    blocks: [
      {
        label: "iframe의 속성",
        body: "MDN은 sandbox를 '비워 두면 모든 제한을 건다'고 적습니다. 스크립트가 돌지 않고, 폼을 보내지 못하고, 팝업이 조용히 실패하고, 문서는 '같은 출처 검사에 늘 실패하는 특별한 출처'가 됩니다. 필요한 것만 allow- 토큰으로 하나씩 풀어 줍니다. 다만 'allow-scripts와 allow-same-origin을 함께 쓰는 것은 강하게 말린다'고 적습니다. 같은 출처의 문서가 스크립트로 자기 sandbox 속성을 지울 수 있기 때문입니다. title은 낭독기가 이 창을 무엇이라고 부를지입니다.",
        tables: [
          {
            head: ["속성", "하는 일", "알아 둘 것"],
            rows: [
              ["src", "불러올 문서의 주소", "그 사이트가 막으면(X-Frame-Options) 빈 창"],
              ["srcdoc", "문서를 글자로 직접 넣는다", "src보다 우선. 주소는 about:srcdoc"],
              ["sandbox", "안쪽 문서의 능력을 빼앗는다", "빈 값이면 전부 막음, allow-*로 하나씩 푼다"],
              ["allow", "카메라, 전체 화면 같은 권한 정책", "Permissions-Policy 헤더 위에 더 좁힌다"],
              ['loading="lazy"', "화면 가까이 와야 불러온다", "기본은 바로(eager)"],
              ["title", "낭독기가 부르는 이 창의 이름", "빠뜨리면 '프레임'으로만 읽힌다"],
            ],
          },
        ],
        terms: [
          {
            term: "샌드박스 (sandbox)",
            body: "안쪽 문서를 모래 상자 안에 가둬 할 수 있는 일을 줄이는 것입니다. 스크립트, 폼, 팝업, 같은 출처 대우를 기본으로 다 빼고, 필요한 것만 허락합니다. 아이를 모래 상자에서 놀게 하면 상자 밖의 물건을 건드리지 못하는 것과 같습니다.",
          },
          {
            term: "불투명 출처 (opaque origin)",
            body: "어느 출처와도 같지 않은 특별한 출처입니다. 문자열로 쓰면 \"null\"입니다. sandbox에 allow-same-origin이 없으면 안쪽 문서가 이 출처가 되어, 원래 같은 서버의 파일이어도 부모와 남남이 됩니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: sandbox가 막는 것",
        body: "세 iframe은 같은 파일 inner.html을 불러옵니다. inner.html의 스크립트는 자기 출처를 적고, 부모 문서를 읽어 보고, 그 결과를 postMessage로 부모(작은 창)에 보냅니다. 기록의 message 줄이 그 소식입니다.\n(1) sandbox 없음: 스크립트가 돌고, 출처가 같아 부모를 읽습니다.\n(2) 빈 sandbox: 스크립트가 아예 돌지 않습니다. 소식이 없고 '막혔습니다' 문장이 그대로입니다.\n(3) allow-scripts만: 스크립트는 돌지만 출처가 \"null\"이 되어 부모를 읽으려다 SecurityError가 납니다. 지금 값에서 작은 창이 각 iframe의 문서를 읽은 결과도 같습니다.",
        lab: {
          html: `<p>1. sandbox 없음</p>
<iframe src="inner.html" width="440" height="46" title="sandbox 없음"></iframe>
<p>2. sandbox (빈 값: 전부 막음)</p>
<iframe src="inner.html" width="440" height="46" sandbox title="빈 sandbox"></iframe>
<p>3. sandbox="allow-scripts"</p>
<iframe src="inner.html" width="440" height="46" sandbox="allow-scripts" title="스크립트만 허락"></iframe>`,
          height: 340,
          checks: [
            {
              label: "부모가 각 iframe 읽기",
              expr: "[...document.querySelectorAll('iframe')].map((f, i) => { try { void f.contentWindow.document.body; return (i + 1) + '번 읽힘'; } catch (e) { return (i + 1) + '번 ' + e.name; } })",
            },
          ],
          tryIt: 'sandbox="allow-scripts allow-same-origin"으로 바꿔 보세요. 둘 다 풀면 사실상 sandbox가 없는 것과 같아집니다.',
        },
      },
      {
        label: "직접 해 보기: srcdoc과 loading=\"lazy\"",
        body: "srcdoc은 파일 없이 문서를 글자로 넣습니다. 그 문서의 주소는 about:srcdoc입니다. 아래쪽 iframe은 lazy라서 처음에는 불러오지 않습니다. 지금 값을 보면 그 창의 주소가 about:blank입니다. 작은 창 안을 끝까지 스크롤하면 기록에 load와 message가 찍히고 주소가 inner.html로 바뀝니다. MDN은 iframe 하나하나가 메모리와 계산을 더 쓴다고 경고합니다. 첫 화면에 보이지 않는 iframe에 lazy를 붙이는 이유입니다.",
        lab: {
          html: `<iframe srcdoc="<p style='font: 14px sans-serif'>srcdoc으로 넣은 문서입니다.</p>" height="50" title="srcdoc"></iframe>
<p>작은 창 안을 아래로 끝까지 스크롤해 보세요.</p>
<div style="height: 3200px; color: #888">… 긴 내용 …</div>
<iframe src="inner.html" loading="lazy" height="46" title="늦게 불러오는 창"></iframe>`,
          height: 170,
          checks: [
            { label: "첫 iframe 주소", expr: "frames[0].location.href" },
            { label: "lazy iframe 주소", expr: "frames[1].location.href" },
          ],
        },
      },
      {
        label: "embed와 object",
        body: "MDN은 <embed>와 <object>를 학습 경로 밖의 '추가 자료'로 둡니다. 예전에는 플래시 같은 플러그인을 넣는 데 썼고, 지금은 PDF처럼 브라우저가 직접 여는 파일을 넣는 정도로 씁니다. 다른 웹 문서를 넣을 때는 iframe을 씁니다. sandbox, allow, loading 같은 제어가 iframe에만 있기 때문입니다.",
      },
      {
        label: "문제가 나는 경우",
        body: "iframe 문제는 대부분 '그 창이 누구의 것인가(출처)'와 '무엇을 허락했나(sandbox, allow)'에서 생깁니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["iframe이 빈 화면이다", "그 사이트가 X-Frame-Options나 CSP frame-ancestors로 막았다", "그 사이트가 허락한 임베드 주소를 쓴다"],
              ["iframe 안의 폼이 안 보내진다", "sandbox에 allow-forms가 없다", "필요한 토큰만 더한다"],
              ["sandbox를 걸었는데 안쪽이 탈출했다", "allow-scripts와 allow-same-origin을 함께 줬다", "같은 출처 문서에는 둘을 함께 주지 않는다"],
              ["부모가 iframe 내용을 못 읽는다", "다른 출처다 (SecurityError)", "postMessage로 주고받는다"],
              ["iframe의 error 이벤트가 안 난다", "MDN: iframe에서는 error를 내지 않고 load는 늘 난다", "안쪽에서 postMessage로 성공을 알린다"],
              ["낭독기가 '프레임'이라고만 읽는다", "title이 없다", "title에 내용을 적는다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 문서 안의 또 하나의 창",
        body: "img가 파일을 들여온다면 iframe은 창을 들여옵니다. 그 창에는 자기 window, document, 출처, 그리고 탭과 함께 쓰는 방문 기록이 있습니다. 부모와 자식이 서로를 얼마나 만질 수 있는지는 출처가 정합니다. 같은 출처면 서로의 문서를 직접 읽고, 다르면 postMessage로 편지만 주고받습니다. sandbox는 그 출처를 일부러 불투명하게 만들어 남남으로 떼어 놓는 장치입니다. 이 허브의 작은 창도 같은 출처의 iframe이라서, 블로그가 그 안의 이벤트를 받아 적을 수 있습니다.",
        tables: [
          {
            head: ["관계", "부모가 자식 문서 읽기", "자식이 부모 문서 읽기", "주고받는 길"],
            rows: [
              ["같은 출처", "된다", "된다", "직접 호출, postMessage"],
              ["다른 출처", "SecurityError", "SecurityError", "postMessage만"],
              ["sandbox (allow-same-origin 없음)", "SecurityError", "SecurityError, 출처는 \"null\"", "postMessage만 (allow-scripts일 때)"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "바깥 것을 들여오는 세 장이 끝났습니다. 11장부터는 값을 다룹니다. 먼저 표입니다. 파서가 표를 특별하게 다룬다는 것, tbody를 저절로 넣고 표 안에 잘못 넣은 요소를 표 밖으로 쫓아낸다는 것을 작은 창에서 봅니다.",
      },
      {
        label: "확인 질문",
        body: "1) 빈 sandbox가 막는 것 세 가지는?\n2) sandbox=\"allow-scripts\"인 문서의 self.origin은 무엇인가요?\n3) allow-scripts와 allow-same-origin을 함께 주면 왜 위험한가요?\n4) 다른 출처의 iframe과 값을 주고받으려면 무엇을 쓰나요?",
      },
    ],
    sources: [
      { label: "MDN — <iframe>", href: `${REF}/Elements/iframe` },
      { label: "MDN — From object to iframe", href: `${LEARN}/General_embedding_technologies` },
      { label: "WHATWG — The iframe element", href: `${SPEC}/iframe-embed-object.html#the-iframe-element` },
    ],
  },

  {
    id: "html-s11",
    name: "11장 · 표",
    tagline: "표는 데이터의 칸이고, 파서는 표를 특별히 다룬다",
    intro:
      "MDN은 'HTML 표는 표 형식의 데이터만을 위한 것'이라고 적습니다. 행과 열로 된 값을 칸에 담는 것입니다. 예전에는 화면 배치를 표로 했지만, MDN은 '레이아웃에 표를 쓰는 것은 나쁜 생각'이라고 못 박습니다. 표에는 다른 요소에 없는 특별한 점이 둘 있습니다. 칸과 제목 칸의 관계를 낭독기가 읽어 준다는 것, 그리고 파서가 표 안의 구조를 강하게 고친다는 것입니다. 이 장은 그 둘을 작은 창에서 봅니다.",
    blocks: [
      {
        label: "표의 부품",
        body: "<table> 안에 행(<tr>)이 있고, 행 안에 칸이 있습니다. 데이터 칸은 <td>, 제목 칸은 <th>입니다. <caption>은 표의 제목으로, MDN은 <table> 여는 태그 바로 아래에 두라고 적습니다. <thead>, <tbody>, <tfoot>은 행을 머리, 몸통, 꼬리로 묶습니다. MDN은 이 묶음이 '낭독기 사용자에게 표를 더 접근하기 쉽게 만들지는 않는다'고 적습니다. 접근성은 th와 scope가 만듭니다. scope=\"col\"은 이 제목이 아래 열의 제목, scope=\"row\"는 옆 행의 제목이라는 뜻입니다. colspan, rowspan은 칸을 여러 열, 여러 행에 걸칩니다.",
        code: '<table>\n  <caption>2026년 11월 지출</caption>\n  <thead>\n    <tr><th scope="col">항목</th><th scope="col">금액</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">식비</th><td>320,000원</td></tr>\n    <tr><th scope="row">교통</th><td>64,000원</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><th scope="row">합계</th><td>384,000원</td></tr>\n  </tfoot>\n</table>',
        codeLang: "html",
        terms: [
          {
            term: "제목 칸 (th)과 scope",
            body: "th는 '이 칸은 값이 아니라 이름'이라는 뜻입니다. scope는 그 이름이 어느 방향의 칸들에 붙는지입니다. 낭독기는 '교통, 금액, 64,000원'처럼 칸을 읽을 때 그 칸의 행 제목과 열 제목을 함께 읽어 줍니다. 엑셀 표의 머리글 행과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: tbody는 저절로 생긴다",
        body: "아래 코드에는 tbody가 없습니다. 그런데 지금 값의 DOM 나무를 보면 table과 tr 사이에 tbody가 들어 있습니다. MDN은 'tbody는 코드에 적지 않아도 모든 표에 늘 들어간다'고 적습니다. 파서가 table 바로 아래의 tr을 보면 tbody를 먼저 만들기 때문입니다. 그래서 table > tr 선택자는 아무것도 고르지 못합니다. 지금 값에 두 선택자의 결과를 함께 놓았습니다.",
        lab: {
          html: `<table border="1">
  <tr><th>이름</th><th>점수</th></tr>
  <tr><td>가람</td><td>90</td></tr>
</table>`,
          height: 120,
          checks: [
            { label: "labDom()", expr: "labDom()" },
            { label: "table > tr 개수", expr: "document.querySelectorAll('table > tr').length" },
            { label: "table > tbody > tr 개수", expr: "document.querySelectorAll('table > tbody > tr').length" },
          ],
        },
      },
      {
        label: "직접 해 보기: 표 안에 잘못 넣은 것은 밖으로 쫓겨난다",
        body: "표 안에는 정해진 요소(caption, colgroup, thead, tbody, tfoot, tr, td, th)만 들어갈 수 있습니다. 그 밖의 것을 칸(td) 밖에 바로 넣으면, 파서는 그것을 표 앞으로 옮겨 놓습니다. 표준은 이것을 '포스터 페어런팅(foster parenting)'이라고 부릅니다. 아래 코드는 p를 tr과 tr 사이에 넣었습니다. 화면을 보면 그 문단이 표 위에 나오고, DOM에서도 table보다 앞에 있습니다. 칸 안(td 안)에 넣은 p는 제자리에 남습니다.",
        lab: {
          html: `<table border="1">
  <tr><td>첫 행</td></tr>
  <p>tr 사이에 넣은 p</p>
  <tr><td>둘째 행 <p>td 안의 p</p></td></tr>
</table>`,
          height: 170,
          checks: [{ label: "labDom()", expr: "labDom()" }],
        },
        terms: [
          {
            term: "포스터 페어런팅 (foster parenting)",
            body: "표 구조 안에 들어갈 수 없는 요소를 만났을 때 파서가 그것을 표 바로 앞에 붙이는 규칙입니다. 원래 부모(표) 대신 '위탁 부모'에게 맡긴다는 뜻의 이름입니다. 템플릿 엔진이 tr 사이에 div를 넣어 화면이 깨지는 흔한 원인입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: colspan과 rowspan",
        body: "colspan=\"2\"는 칸 하나가 두 열을, rowspan=\"2\"는 두 행을 차지합니다. 걸친 칸이 있으면 그 행에 적는 td 수가 줄어듭니다. 둘째 행은 위 칸이 내려와 자리를 차지했으므로 td를 하나만 적습니다. 지금 값의 cells.length는 각 행에 실제로 적힌 칸 수이고, 화면의 열 수와 다릅니다. 표 데이터를 스크립트로 읽을 때 자주 틀리는 자리입니다.",
        lab: {
          html: `<table border="1">
  <tr><th colspan="2">colspan="2"</th><th>C</th></tr>
  <tr><td rowspan="2">rowspan="2"</td><td>B2</td><td>C2</td></tr>
  <tr><td>B3</td><td>C3</td></tr>
</table>`,
          height: 140,
          checks: [
            { label: "행마다 cells.length", expr: "[...document.querySelector('table').rows].map((r) => r.cells.length)" },
            { label: "B3의 cellIndex", expr: "[...document.querySelectorAll('td')].find((td) => td.textContent === 'B3').cellIndex" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "표의 문제는 파서가 바꾼 구조를 몰라서 생기거나, 제목 칸의 관계를 적지 않아서 생깁니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["table > tr 선택자가 안 맞는다", "파서가 tbody를 넣었다", "table > tbody > tr, 또는 tbody를 직접 적는다"],
              ["표 안에 넣은 div가 표 위에 나온다", "포스터 페어런팅", "td 안에 넣거나 표 밖으로 뺀다"],
              ["낭독기가 값만 읽고 무슨 값인지 모른다", "th나 scope가 없다", '머리 칸을 th scope="col"로'],
              ["레이아웃을 표로 짰다", "낭독기가 칸마다 '행 1, 열 2'라고 읽는다", "CSS 그리드로 바꾼다"],
              ["스크립트로 읽은 열 위치가 어긋난다", "rowspan, colspan으로 칸 수가 행마다 다르다", "걸친 칸을 계산해 실제 열을 구한다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 표의 뜻은 칸의 관계에 있다",
        body: "표의 값 하나는 혼자서는 뜻이 없습니다. '64,000원'은 '교통'의 '금액'일 때 뜻이 생깁니다. 눈으로 보는 사람은 줄을 따라가 그 관계를 알지만, 낭독기는 th와 scope(복잡하면 headers와 id)로만 압니다. 그래서 표를 고를 때의 물음은 '값마다 행과 열의 이름이 있는가'입니다. 있으면 표이고, 없으면(화면 배치일 뿐이면) 표가 아니라 CSS 레이아웃입니다.",
      },
      {
        label: "다음 입구",
        body: "표가 값을 보여 준다면, 폼은 값을 받습니다. 12장은 form이 값을 어떻게 모아(name과 FormData) 어디로 보내는지(action, method), 그리고 button의 기본 type이 왜 submit인지를 작은 창에서 직접 보내 봅니다.",
      },
      {
        label: "확인 질문",
        body: "1) tbody를 적지 않은 표에서 table > tr은 몇 개를 고르나요?\n2) tr과 tr 사이에 넣은 div는 DOM의 어디로 가나요?\n3) th scope=\"col\"은 낭독기에 무엇을 알려 주나요?\n4) 화면 배치에 표를 쓰면 낭독기 사용자에게 어떤 일이 생기나요?",
      },
    ],
    sources: [
      { label: "MDN — HTML table basics", href: `${LEARN}/HTML_table_basics` },
      { label: "MDN — Table accessibility", href: `${LEARN}/Table_accessibility` },
      { label: "WHATWG — Parsing: foster parenting", href: `${SPEC}/parsing.html#foster-parent` },
    ],
  },

  {
    id: "html-s12",
    name: "12장 · 폼과 버튼",
    tagline: "폼은 name이 붙은 칸의 값을 모아 주소로 보낸다",
    intro:
      "<form>은 사용자가 적은 값을 모아 서버로 보냅니다. 무엇을 모으는지는 칸의 name이, 어디로 보내는지는 action이, 어떻게 보내는지는 method가 정합니다. 그리고 폼 안의 <button>은 type을 적지 않으면 '보내기' 버튼입니다. 이 기본값 하나가 '저장 버튼을 눌렀더니 페이지가 새로 고쳐졌다'는 흔한 버그의 원인입니다. 이 장은 작은 창에서 실제로 폼을 보내고, 무엇이 어떤 주소로 갔는지 기록과 도착한 페이지로 확인합니다.",
    blocks: [
      {
        label: "폼을 보낼 때 정해지는 것",
        body: "MDN은 name을 '필수가 아니지만 필수라고 생각하라'고 적습니다. name이 없거나 비어 있으면 그 칸의 값은 보내지 않기 때문입니다. method=\"get\"(기본)은 값을 action 주소의 ? 뒤에 붙입니다. 검색처럼 서버의 데이터를 바꾸지 않는 폼에 씁니다. method=\"post\"는 값을 요청 본문에 담습니다. method=\"dialog\"는 보내지 않고 감싼 dialog를 닫습니다(14장). <label>은 칸의 이름입니다. for에 칸의 id를 적어 잇거나 칸을 label 안에 넣습니다. MDN은 for로 잇는 쪽을 권합니다. 안에 넣는 방식을 모든 보조 기술이 지원하지는 않기 때문입니다.",
        tables: [
          {
            head: ["정하는 것", "속성", "적지 않으면"],
            rows: [
              ["어디로", "form의 action", "지금 문서의 주소"],
              ["어떻게", "form의 method", "get: 주소의 ? 뒤에 붙인다"],
              ["무엇을", "각 칸의 name", "name 없는 칸은 보내지 않는다"],
              ["누가 보내나", "button의 type", "폼 안의 button은 submit"],
              ["칸의 이름", "label의 for = 칸의 id", "낭독기가 그냥 '편집 칸'이라고 읽는다"],
            ],
          },
        ],
        terms: [
          {
            term: "FormData",
            body: "폼이 보낼 값을 name=값 짝으로 모은 객체입니다. 브라우저가 폼을 보낼 때 만드는 것과 같아서, new FormData(form)으로 '지금 보내면 무엇이 가나'를 미리 볼 수 있습니다. 택배 상자에 넣기 전에 늘어놓은 물건 목록입니다.",
          },
          {
            term: "쿼리 문자열 (query string)",
            body: "주소의 ? 뒤에 붙는 이름=값&이름=값 부분입니다. GET 폼이 값을 여기에 실어 보냅니다. 주소에 남으니 북마크와 공유가 되지만, 비밀번호처럼 남으면 안 되는 값은 담지 않습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: GET 폼 보내기",
        body: "보내기를 누르면 기록에 submit이 찍히고, 보낼 값(FormData)이 나오고, 예상 줄이 '주소의 ? 뒤에 붙여 이동한다'며 갈 주소를 보여 줍니다. 그다음 작은 창이 실제로 target.html로 이동하고, 도착한 페이지의 '받은 값'에 그 값이 나옵니다. 둘째 칸은 name이 없어서 보낼 값에도, 도착한 주소에도 없습니다. 한글과 공백은 퍼센트 인코딩되고, 공백은 +로 바뀝니다. 칸 안에서 Enter를 눌러도 보내집니다. 기록을 보면 Enter가 보내기 버튼의 클릭으로 바뀌어 찍힙니다.",
        lab: {
          html: `<form action="target.html">
  <label for="q">검색어</label>
  <input id="q" name="q" value="안녕 하세요">
  <input value="name이 없는 칸">
  <button>보내기</button>
</form>`,
          height: 170,
          checks: [
            {
              label: "지금 보내면 (FormData)",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + v) : '(폼 없음)'",
            },
          ],
          tryIt: 'form에 method="post"를 붙여 보세요. 값이 주소에 붙지 않습니다. 이 블로그는 정적 파일 서버라 POST를 받지 못해 오류 응답이 옵니다.',
        },
      },
      {
        label: "직접 해 보기: button의 기본 type은 submit",
        body: "폼 안에서 type을 적지 않은 button은 보내기 버튼입니다. MDN은 '폼과 연결된 button에 type이 없으면 submit이 기본'이라고 적고, 보내기가 아닌 버튼에는 type=\"button\"을 적으라고 합니다. 아래 첫 버튼은 onclick에서 '저장했습니다'를 출력하지만, 그 뒤 폼이 보내져 작은 창이 다른 문서로 이동합니다. 화면에 보이던 상태가 모두 사라집니다. 둘째 버튼은 type=\"button\"이라 onclick만 돌고 아무 데도 가지 않습니다.",
        lab: {
          html: `<form action="target.html">
  <input name="memo" value="메모 내용">
  <button onclick="console.log('저장했습니다 (type 없음)')">저장 (type 없음)</button>
  <button type="button" onclick="console.log('저장했습니다 (type=button)')">저장 (type="button")</button>
</form>`,
          height: 150,
        },
      },
      {
        label: "직접 해 보기: label을 누르면 칸이 눌린다",
        body: "label은 칸의 이름이면서 누르는 자리이기도 합니다. label을 누르면 브라우저가 연결된 칸에 클릭을 넘깁니다. 기록을 보면 label 클릭 바로 뒤에 체크 상자의 클릭이 '앞의 동작이 만든 클릭'으로 찍히고, change가 뒤따릅니다. 작은 체크 상자 대신 글자 전체를 누를 수 있어서 손가락으로 누르기 쉬워집니다. 연결되지 않은 label(셋째)은 눌러도 아무 일이 없습니다.",
        lab: {
          html: `<p><label><input type="checkbox" name="agree"> 약관에 동의합니다 (안에 넣기)</label></p>
<p><input type="checkbox" id="news" name="news"> <label for="news">소식 받기 (for로 잇기)</label></p>
<p><input type="checkbox" name="lonely"> <label>연결 안 된 label</label></p>`,
          height: 140,
          checks: [
            { label: "checked", expr: "[...document.querySelectorAll('input')].map((i) => i.name + '=' + i.checked)" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "폼의 문제는 대부분 기본값(type, method, action)을 모르고 생깁니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["버튼을 누르면 페이지가 새로 고쳐진다", "폼 안 button의 기본 type이 submit", 'type="button"을 적는다'],
              ["서버에 값 하나가 안 온다", "그 칸에 name이 없다", "name을 적는다"],
              ["비밀번호가 주소창과 기록에 남았다", "GET으로 보냈다", 'method="post"'],
              ["SPA에서 Enter를 누르면 새로 고쳐진다", "submit 이벤트를 막지 않았다", "submit 핸들러에서 preventDefault()"],
              ["작은 체크 상자를 누르기 어렵다", "label이 연결되지 않았다", "for와 id로 잇는다"],
              ["낭독기가 칸 이름을 읽지 않는다", "placeholder만 있고 label이 없다", "label을 붙인다. placeholder는 이름이 아니다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 폼은 주소로 가는 또 하나의 링크다",
        body: "GET 폼을 보내는 것은 '값을 붙인 주소'로 가는 링크를 누르는 것과 같습니다. 기록을 7장의 링크와 견줘 보면 pagehide, load 순서가 똑같습니다. 다른 점은 주소를 사용자가 채운다는 것뿐입니다. 그래서 폼에도 7장의 규칙이 그대로 적용됩니다. preventDefault()로 막을 수 있고, target으로 다른 창에 보낼 수 있습니다. SPA의 폼이 submit 이벤트를 막고 fetch로 보내는 것은 링크를 막고 pushState를 쓰는 것과 같은 구조입니다.",
        tables: [
          {
            head: ["", "링크 (7장)", "GET 폼"],
            rows: [
              ["주소", "href에 적힌 것", "action + ? + name=값"],
              ["시작하는 이벤트", "click", "click → submit"],
              ["막는 법", "click에서 preventDefault()", "submit에서 preventDefault()"],
              ["다른 창으로", 'target="_blank"', 'form의 target="_blank"'],
              ["SPA가 대신하는 것", "pushState", "fetch + pushState"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "폼은 보내기 전에 칸을 검사합니다. 13장은 required, type=\"email\", pattern 같은 속성만으로 브라우저가 검증하는 과정을 봅니다. 검증에 걸리면 submit 대신 invalid 이벤트가 나고, 메시지가 뜹니다.",
      },
      {
        label: "확인 질문",
        body: "1) name이 없는 칸의 값은 보내지나요?\n2) 폼 안에서 type을 적지 않은 button을 누르면 무슨 일이 생기나요?\n3) GET 폼에서 '안녕 하세요'는 주소에 어떻게 적히나요?\n4) 칸에서 Enter를 누르면 기록에 무엇이 찍히나요?",
      },
    ],
    sources: [
      { label: "MDN — Forms and buttons in HTML", href: `${LEARN}/HTML_forms` },
      { label: "MDN — <form>", href: `${REF}/Elements/form` },
      { label: "MDN — <button>", href: `${REF}/Elements/button` },
      { label: "MDN — <label>", href: `${REF}/Elements/label` },
    ],
  },

  {
    id: "html-s13",
    name: "13장 · 폼 검증",
    tagline: "속성만 적어도 브라우저가 보내기 전에 검사한다",
    intro:
      "칸에 required, type=\"email\", pattern, min, maxlength 같은 속성을 적으면, 브라우저가 폼을 보내기 전에 값을 검사합니다. 스크립트 한 줄 없이도 됩니다. 검사에 걸리면 폼을 보내지 않고, 그 칸에 invalid 이벤트를 내고, 메시지를 띄웁니다. MDN은 이것을 '클라이언트 쪽 검증'이라 부르며, 동시에 '서버로 오는 데이터는 절대 믿지 말라'고 적습니다. 이 장은 작은 창에서 검증이 어떻게 걸리는지, 무엇으로 끄고 바꾸는지를 직접 봅니다.",
    blocks: [
      {
        label: "검증 속성과 걸리는 이유",
        body: "칸마다 validity 객체가 있고, 검사 결과가 항목별로 true, false로 들어 있습니다. 어느 항목이 true인지가 '왜 걸렸나'입니다. MDN은 pattern이 '저절로 ^(?: 와 )$로 감싸진다'고 적습니다. 값 전체가 맞아야 한다는 뜻입니다. 또 사용자가 그 칸을 만진 뒤에만 맞는 :user-invalid 선택자가 있어서, 페이지를 열자마자 빨간 칸이 뜨는 일을 피할 수 있습니다.",
        tables: [
          {
            head: ["속성", "걸리는 경우", "validity의 항목"],
            rows: [
              ["required", "비어 있다", "valueMissing"],
              ['type="email", "url"', "형식이 틀렸다", "typeMismatch"],
              ["pattern", "값 전체가 정규식에 안 맞는다", "patternMismatch"],
              ["minlength, maxlength", "글자 수가 모자라거나 넘친다", "tooShort, tooLong"],
              ["min, max, step", "숫자, 날짜가 범위 밖이거나 간격이 틀렸다", "rangeUnderflow, rangeOverflow, stepMismatch"],
              ["setCustomValidity('메시지')", "스크립트가 직접 틀렸다고 했다", "customError"],
            ],
          },
        ],
        terms: [
          {
            term: "제약 검증 (constraint validation)",
            body: "속성으로 적은 규칙(제약)을 브라우저가 검사하는 구조입니다. 보낼 때, 그리고 checkValidity()나 reportValidity()를 부를 때 검사합니다. 공항 보안 검색대처럼 탑승(보내기) 전에 한 번 거칩니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 걸리면 submit 대신 invalid",
        body: "아무것도 적지 않고 보내기를 누르세요. 기록에 submit이 없고, 대신 칸마다 invalid가 찍힙니다. 각 줄에는 걸린 이유(valueMissing 등)와 브라우저가 띄우는 메시지(validationMessage)가 있습니다. 메시지 문장은 브라우저와 그 언어 설정이 정합니다. 마지막에 '검증에 걸려 보내지 않았다'는 줄이 남습니다. 이메일 칸에 'abc'를 적으면 typeMismatch, 코드 칸에 '12'를 적으면 patternMismatch로 바뀝니다. 다 맞게 적으면 그때 submit이 나고 target.html로 갑니다. 칸을 한 번 만진 뒤 빠져나오면 :user-invalid에 걸려 빨간 테두리가 생깁니다.",
        lab: {
          html: `<style>:user-invalid { outline: 2px solid crimson; }</style>
<form action="target.html">
  <p><label>이메일 <input name="email" type="email" required></label></p>
  <p><label>숫자 넷 <input name="code" pattern="[0-9]{4}" required></label></p>
  <button>보내기</button>
</form>`,
          height: 170,
          checks: [
            {
              label: "칸마다 valid",
              expr: "[...document.querySelectorAll('input')].map((i) => i.name + '=' + i.validity.valid)",
            },
            { label: "폼 전체", expr: "document.forms[0]?.matches(':valid') ? ':valid' : ':invalid'" },
          ],
          tryIt: "코드 칸에 '12345'를 적어 보세요. 앞 넷이 숫자여도 값 전체가 맞아야 해서 걸립니다.",
        },
      },
      {
        label: "직접 해 보기: novalidate와 formnovalidate",
        body: "form에 novalidate를 붙이면 검증 없이 보냅니다. 버튼 하나에만 formnovalidate를 붙이면 그 버튼으로 보낼 때만 검증을 건너뜁니다. '임시 저장'처럼 덜 채운 채 보내야 하는 버튼에 씁니다. 아래에서 빈 칸인 채로 두 버튼을 눌러 보세요. '보내기'는 invalid로 막히고, '임시 저장'은 바로 submit이 나서 이동합니다. 예상 줄도 '검증은 건너뜁니다'로 다르게 적힙니다.",
        lab: {
          html: `<form action="target.html">
  <label>제목 <input name="title" required></label>
  <button>보내기</button>
  <button formnovalidate name="draft" value="1">임시 저장 (formnovalidate)</button>
</form>`,
          height: 130,
        },
      },
      {
        label: "직접 해 보기: setCustomValidity로 직접 규칙 더하기",
        body: "속성으로 적을 수 없는 규칙(두 칸이 같아야 한다)은 스크립트로 더합니다. setCustomValidity에 메시지를 넣으면 그 칸은 틀린 칸이 되고(customError), 빈 문자열을 넣으면 다시 맞는 칸이 됩니다. MDN은 '사용자 메시지를 정하면 그 요소는 틀린 것으로 여겨진다'고 적습니다. 아래에서 두 칸을 다르게 적고 보내 보세요. 브라우저 기본 메시지 대신 직접 적은 '비밀번호가 다릅니다'가 invalid 줄에 나옵니다.",
        lab: {
          html: `<form action="target.html">
  <p><label>비밀번호 <input id="pw" name="pw" type="password" required></label></p>
  <p><label>한 번 더 <input id="pw2" type="password" required
    oninput="this.setCustomValidity(this.value === pw.value ? '' : '비밀번호가 다릅니다')"></label></p>
  <button>가입</button>
</form>`,
          height: 170,
          checks: [{ label: "pw2.validationMessage", expr: "document.getElementById('pw2')?.validationMessage" }],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "검증의 문제는 '언제 검사하나'와 '누가 검사하나'를 헷갈려서 생깁니다.",
        tables: [
          {
            head: ["증상", "원인", "고치는 법"],
            rows: [
              ["페이지를 열자마자 칸이 빨갛다", ":invalid는 만지기 전에도 맞는다", ":user-invalid를 쓴다"],
              ["pattern이 일부만 맞아도 될 줄 알았다", "pattern은 값 전체에 맞춘다", "^ $를 적지 않아도 전체 일치"],
              ["setCustomValidity 뒤로 계속 못 보낸다", "맞는 값이 된 뒤에 빈 문자열로 풀지 않았다", "맞으면 setCustomValidity('')"],
              ["SPA에서 검증이 안 걸린다", "버튼 click에서 직접 fetch했다", "submit 이벤트에서 보낸다. 검증은 그 앞에서 돈다"],
              ["검증을 끄고 보낸 값이 서버에 들어갔다", "클라이언트 검증만 믿었다", "서버에서 다시 검사한다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 검증은 편의이고, 보안은 서버다",
        body: "브라우저 검증은 사용자가 실수를 빨리 알게 하는 편의입니다. 막을 수 있는 것은 '정직한 사용자의 실수'까지입니다. 개발자 도구에서 required를 지우거나, novalidate를 붙이거나, 폼을 거치지 않고 요청을 직접 보내면 검증은 아무것도 막지 못합니다. MDN도 '악의적인 사용자는 여전히 네트워크 요청을 바꿀 수 있다', '서버로 오는 데이터는 절대 믿지 말라'고 적습니다. 그래서 같은 규칙을 두 번 둡니다. 브라우저에는 빨리 알려 주려고, 서버에는 지키려고 둡니다.",
        tables: [
          {
            head: ["", "브라우저 검증", "서버 검증"],
            rows: [
              ["목적", "실수를 빨리 알린다", "잘못된 값을 막는다"],
              ["끌 수 있나", "사용자가 언제든 (개발자 도구, novalidate)", "사용자는 못 끈다"],
              ["없으면", "불편하다", "위험하다"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "검증처럼 스크립트 없이 브라우저가 해 주는 동작은 더 있습니다. 14장은 열고 닫는 요소 셋입니다. details는 접었다 펴고, dialog는 모달 창을 띄우고, popover는 바깥을 누르면 닫히는 말풍선이 됩니다. 셋 다 자바스크립트 없이 동작하는지 작은 창에서 확인합니다.",
      },
      {
        label: "확인 질문",
        body: "1) 검증에 걸린 폼을 보내면 submit 이벤트가 나나요? 대신 무엇이 나나요?\n2) pattern=\"[0-9]{4}\"에 '12345'는 통과하나요?\n3) 버튼 하나만 검증을 건너뛰게 하려면?\n4) 브라우저 검증이 있으면 서버 검증을 빼도 되나요?",
      },
    ],
    sources: [
      { label: "MDN — Client-side form validation", href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation" },
      { label: "MDN — <input>", href: `${REF}/Elements/input` },
      { label: "WHATWG — Constraint validation", href: `${SPEC}/form-control-infrastructure.html#constraints` },
    ],
  },

  {
    id: "html-s14",
    name: "14장 · 열고 닫는 요소",
    tagline: "details, dialog, popover는 스크립트 없이 열리고 닫힌다",
    intro:
      "접었다 펴는 칸, 모달 창, 말풍선 메뉴는 예전에는 자바스크립트로 만들었습니다. 지금은 HTML 요소 셋이 그 동작을 갖고 있습니다. <details>는 누르면 열리고, <dialog>는 화면 맨 위층에 창을 띄우고 Esc로 닫히고, popover 속성을 붙인 요소는 버튼으로 열고 바깥을 누르면 닫힙니다. 키보드 조작, 포커스 이동, 맨 위층 표시까지 브라우저가 맡습니다. 이 장은 셋을 작은 창에서 직접 열고 닫으며, 그때 나는 toggle, close 같은 이벤트를 봅니다.",
    blocks: [
      {
        label: "세 요소 견주기",
        body: "셋 다 '열림과 닫힘' 상태가 있고, 상태가 바뀌면 toggle 이벤트가 납니다. MDN은 details의 toggle이 '상태가 바뀐 뒤에' 온다고 적습니다. dialog는 show()로 열면 보통 창, showModal()로 열면 모달입니다. 모달은 바깥을 누를 수 없게 막고(inert), Esc로 닫힙니다. MDN은 'open 속성으로 연 dialog는 모달이 아니다'라고 적고, 메서드로 여는 것을 권합니다. popover는 기본값 auto면 바깥을 누르거나 Esc를 누르면 닫히고(light dismiss), 다른 auto 팝오버를 열면 닫힙니다. manual이면 그런 일 없이 버튼이나 스크립트로만 닫힙니다.",
        tables: [
          {
            head: ["", "<details>", "<dialog> (모달)", "popover"],
            rows: [
              ["여는 법", "summary를 누른다", 'showModal(), 또는 command="show-modal" 버튼', "popovertarget 버튼"],
              ["닫는 법", "summary를 다시", 'Esc, method="dialog" 폼, close()', "바깥 누르기, Esc, 버튼 (auto)"],
              ["뒤의 페이지", "그대로 쓸 수 있다", "누를 수 없다 (inert)", "그대로 쓸 수 있다"],
              ["맨 위층 (top layer)", "아니요", "예", "예"],
              ["상태를 읽는 법", "details.open", "dialog.open, :modal", ":popover-open"],
              ["이벤트", "toggle", "cancel, close, toggle", "beforetoggle, toggle"],
            ],
          },
        ],
        terms: [
          {
            term: "맨 위층 (top layer)",
            body: "모든 요소 위에 그려지는 특별한 층입니다. z-index 싸움 없이 늘 맨 위에 옵니다. 모달 dialog와 popover가 여기에 올라갑니다. 무대 위 어떤 세트보다 앞에 내려오는 막과 같습니다.",
          },
          {
            term: "가벼운 닫기 (light dismiss)",
            body: "바깥을 누르거나 Esc를 누르면 저절로 닫히는 동작입니다. 메뉴나 말풍선에 기대하는 동작이라 popover=\"auto\"가 기본으로 갖고 있습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: details와 name 묶음",
        body: "summary를 누르면 details가 열리고, 기록에 toggle이 'closed → open'으로 찍힙니다. 아래 셋은 name이 같습니다. MDN은 '같은 name의 details는 한 번에 하나만 열린다'고 적습니다. 둘째를 열면 열려 있던 첫째가 닫히고, toggle이 두 번 찍힙니다. 아코디언 메뉴를 스크립트 없이 만드는 방법입니다. open=\"false\"도 열린다는 점은 1장의 불 속성과 같습니다.",
        lab: {
          html: `<details name="faq" open>
  <summary>배송은 얼마나 걸리나요?</summary>
  <p>보통 2~3일 걸립니다.</p>
</details>
<details name="faq">
  <summary>교환할 수 있나요?</summary>
  <p>받은 날부터 7일 안에 됩니다.</p>
</details>
<details name="faq">
  <summary>해외로 보내나요?</summary>
  <p>지금은 국내만 보냅니다.</p>
</details>`,
          height: 200,
          checks: [{ label: "열린 것", expr: "[...document.querySelectorAll('details')].map((d) => d.open)" }],
          tryIt: "name을 지우고 실행해 보세요. 여러 개를 함께 열 수 있습니다.",
        },
      },
      {
        label: "직접 해 보기: dialog를 스크립트 없이 열고 닫기",
        body: "첫 버튼의 commandfor와 command=\"show-modal\"은 '저 dialog에 showModal()을 부르라'는 뜻입니다. 스크립트 한 줄 없이 모달이 뜹니다. 모달이 떠 있는 동안 뒤의 버튼은 눌리지 않습니다. 눌러 보면 기록에 클릭조차 찍히지 않습니다. 닫는 길은 셋입니다. Esc를 누르면 cancel 뒤에 close가 나고 returnValue는 비어 있습니다. method=\"dialog\" 폼의 버튼을 누르면 submit이 나지만 이동하지 않고 dialog가 닫히며, returnValue가 그 버튼의 value가 됩니다. 기록의 close 줄에서 어느 버튼으로 닫았는지 보입니다.",
        lab: {
          html: `<button commandfor="d" command="show-modal">구매 확인 열기</button>
<button onclick="console.log('뒤의 버튼이 눌렸습니다')">뒤의 버튼</button>
<dialog id="d">
  <p>정말 구매할까요?</p>
  <form method="dialog">
    <button value="no">취소</button>
    <button value="yes">구매</button>
  </form>
</dialog>`,
          height: 200,
          checks: [
            { label: "dialog.open", expr: "document.getElementById('d').open" },
            { label: ":modal", expr: "document.getElementById('d').matches(':modal')" },
            { label: "returnValue", expr: "document.getElementById('d').returnValue" },
          ],
          tryIt: '첫 버튼을 command="show"로 바꿔 보세요. 모달이 아니라서 뒤의 버튼이 눌리고, Esc로 닫히지 않습니다.',
        },
      },
      {
        label: "직접 해 보기: popover의 auto와 manual",
        body: "popovertarget은 '이 버튼으로 저 popover를 여닫으라'는 뜻입니다. 첫 말풍선(auto)을 연 뒤 작은 창의 빈 곳을 누르면 저절로 닫힙니다. 기록에 toggle이 'open → closed'로 찍힙니다. 둘째 말풍선(manual)은 바깥을 눌러도, 다른 말풍선을 열어도 닫히지 않습니다. 버튼을 다시 눌러야 닫힙니다. 지금 값의 :popover-open이 각 말풍선이 열려 있는지입니다.",
        lab: {
          html: `<button popovertarget="tip">auto 말풍선</button>
<button popovertarget="note">manual 말풍선</button>
<div id="tip" popover>auto: 바깥을 누르거나 Esc를 누르면 닫힙니다.</div>
<div id="note" popover="manual">manual: 버튼을 다시 눌러야 닫힙니다.</div>`,
          height: 170,
          checks: [
            {
              label: ":popover-open",
              expr: "[...document.querySelectorAll('[popover]')].map((p) => p.id + '=' + p.matches(':popover-open'))",
            },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이 요소들의 문제는 대개 '브라우저가 해 주는 것'을 모르고 직접 다시 만들다 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ['dialog에 open 속성을 붙여 모달로 썼다', "모달이 아니다. 뒤가 눌리고 Esc가 안 먹는다", "showModal()이나 command=\"show-modal\""],
              ["div와 z-index로 모달을 만들었다", "다른 요소에 가려지고, 포커스가 뒤로 샌다", "dialog를 쓴다. 맨 위층과 inert가 따라온다"],
              ["dialog에 tabindex를 붙였다", "MDN: dialog에 tabindex를 쓰면 안 된다", "지우고, 먼저 누를 칸에 autofocus"],
              ["메뉴 바깥 클릭 감지를 직접 짰다", "Esc, 다른 메뉴 열기 같은 경우를 빠뜨린다", 'popover="auto"를 쓴다'],
              ["details를 스크립트로 여닫으며 상태를 따로 뒀다", "open 속성과 내 상태가 어긋난다", "details.open과 toggle 이벤트를 쓴다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 상태와 동작을 브라우저에 맡긴다",
        body: "열고 닫는 UI를 직접 만들면 상태(열렸나), 동작(무엇으로 열고 닫나), 접근성(포커스, Esc, 뒤를 막기, 낭독기에 알리기)을 모두 직접 맞춰야 합니다. 이 요소들은 셋을 한 번에 줍니다. 그리고 상태를 속성(open)과 선택자(:modal, :popover-open)로 드러내서 CSS로 모양을 바꿀 수 있게 합니다. 프레임워크에서도 같은 원칙이 맞습니다. 상태를 따로 들고 있다 맞추는 대신, 이 요소의 상태를 읽고 toggle, close 이벤트로 따라갑니다.",
      },
      {
        label: "다음 입구",
        body: "마지막 15장은 어느 요소에나 붙는 전역 속성입니다. hidden, inert, tabindex, contenteditable, data-*처럼 요소의 종류와 상관없이 보이기, 누르기, 포커스, 편집을 바꾸는 속성을 작은 창에서 확인합니다.",
      },
      {
        label: "확인 질문",
        body: "1) 같은 name의 details 셋 중 둘째를 열면 무슨 일이 생기나요?\n2) open 속성으로 연 dialog와 showModal()로 연 dialog는 무엇이 다른가요?\n3) method=\"dialog\" 폼의 버튼으로 닫으면 returnValue는 무엇이 되나요?\n4) popover=\"auto\"와 \"manual\"의 차이는?",
      },
    ],
    sources: [
      { label: "MDN — <details>", href: `${REF}/Elements/details` },
      { label: "MDN — <dialog>", href: `${REF}/Elements/dialog` },
      { label: "MDN — popover", href: `${REF}/Global_attributes/popover` },
      { label: "MDN — Invoker Commands API", href: "https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API" },
    ],
  },

  {
    id: "html-s15",
    name: "15장 · 전역 속성",
    tagline: "어느 요소에나 붙고, 보이기와 누르기와 포커스를 바꾼다",
    intro:
      "MDN은 전역 속성을 '모든 HTML 요소에 공통인 속성. 모든 요소에 쓸 수 있지만 어떤 요소에서는 효과가 없을 수 있다'고 적습니다. id, class, style, title, lang처럼 익숙한 것부터, hidden(숨기기), inert(못 누르게), tabindex(포커스 순서), contenteditable(편집), data-*(내 데이터)까지 서른 개가 넘습니다. 이 장은 그중 화면의 동작을 바꾸는 것들을 골라 작은 창에서 확인합니다.",
    blocks: [
      {
        label: "자주 쓰는 전역 속성",
        body: "MDN은 hidden을 '아직 또는 더 이상 관련 없는 요소'에 쓰고, '정당하게 보여 줄 수 있는 내용을 숨기는 데 쓰면 안 된다'고 적습니다. inert는 '사용자 입력 이벤트를 무시하게 하는' 불 속성입니다. tabindex는 음수면 '포커스는 받지만 Tab으로는 가지 않음', 0이면 'Tab으로 가고 순서는 문서 순서'입니다. 양수는 문서 순서를 깨므로 쓰지 않는 편이 좋습니다. data-* 속성은 스크립트가 dataset으로 읽는 내 데이터입니다.",
        tables: [
          {
            head: ["속성", "바꾸는 것", "알아 둘 것"],
            rows: [
              ["hidden", "보이기: 그리지 않는다", "CSS display가 이긴다. until-found는 찾기로 열린다"],
              ["inert", "누르기: 클릭, 포커스, 찾기를 막는다", "안쪽 전부에 적용. 모달 뒤가 이것이다"],
              ["tabindex", "포커스: 받을지, Tab 순서", "-1, 0만 쓴다. 양수는 순서를 깬다"],
              ["contenteditable", "편집: 사용자가 고칠 수 있게", "plaintext-only는 서식 없이 글자만"],
              ["data-*", "내 데이터", "el.dataset으로 읽고 쓴다"],
              ["lang, dir", "언어와 글 방향", "2장, 아래 dir 실험"],
              ["title", "풍선 도움말", "마우스에서만 보인다. 중요한 정보에 쓰지 않는다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: hidden과 CSS",
        body: "hidden은 브라우저 기본 스타일의 [hidden] { display: none }으로 숨깁니다. 그래서 내 CSS가 display를 적으면 hidden이 져서 보입니다. 첫 줄은 hidden인데도 style의 display: block 때문에 보입니다. 둘째 줄은 그대로 숨습니다. 지금 값은 각 줄이 실제로 차지한 높이입니다.\n\n셋째 줄의 hidden=\"until-found\"는 숨어 있다가, 브라우저의 찾기(Ctrl+F, ⌘+F)나 # 이동이 그 안을 가리키면 저절로 열립니다. 링크를 눌러 보세요. 기록에 popstate 바로 뒤 beforematch가 찍히고, hidden 속성이 지워져 높이가 0에서 26이 됩니다. 접은 답이나 탭 안의 글도 브라우저 찾기로 찾을 수 있게 하는 속성입니다.",
        lab: {
          html: `<p hidden style="display: block">1. hidden인데 display: block이라 보입니다</p>
<p hidden>2. hidden이라 숨었습니다</p>
<a href="#answer">숨은 답으로 가기 (#answer)</a>
<p hidden="until-found" id="answer">3. 숨은 답: 찾기나 # 이동으로 열립니다</p>`,
          height: 140,
          checks: [
            { label: "offsetHeight", expr: "[...document.querySelectorAll('p')].map((p, i) => (i + 1) + '번 ' + p.offsetHeight)" },
          ],
        },
      },
      {
        label: "직접 해 보기: inert와 tabindex",
        body: "inert인 상자 안의 버튼과 링크는 눌리지도, Tab으로 가지도 않습니다. 기록에 클릭조차 찍히지 않습니다. 모달 dialog가 뜰 때 뒤의 페이지가 바로 이 상태가 됩니다(14장). 아래 줄은 tabindex 셋입니다. 작은 창을 한 번 누르고 Tab을 여러 번 눌러 보세요. 기록의 focus 줄로 순서가 보입니다. tabindex=\"0\"인 span은 Tab으로 가고, \"-1\"인 span은 건너뜁니다. -1은 스크립트의 focus()로만 갈 수 있습니다.",
        lab: {
          html: `<div inert style="opacity: .5">
  <button>inert 안의 버튼</button> <a href="#x">inert 안의 링크</a>
</div>
<p>
  <button>보통 버튼</button>
  <span tabindex="0">tabindex="0"인 span</span>
  <span tabindex="-1">tabindex="-1"인 span</span>
  <a href="#y">보통 링크</a>
</p>`,
          height: 140,
          logFocus: true,
          checks: [{ label: "document.activeElement", expr: "document.activeElement" }],
        },
      },
      {
        label: "직접 해 보기: contenteditable과 data-*",
        body: "contenteditable을 붙이면 아무 요소나 편집 칸이 됩니다. 글자를 고치면 input 이벤트가 납니다. 이 블록은 input도 기록합니다. data-price처럼 data-로 시작하는 속성은 dataset으로 읽습니다. 이름의 하이픈은 낙타 표기로 바뀌어 data-stock-count는 dataset.stockCount가 됩니다. 값은 늘 문자열이라 숫자로 쓰려면 바꿔야 합니다. 지금 값에서 typeof가 string인 것을 보세요.",
        lab: {
          html: `<p contenteditable>이 문장을 눌러 고쳐 보세요.</p>
<p contenteditable="plaintext-only">여기는 서식 없이 글자만 (plaintext-only)</p>
<button data-price="12000" data-stock-count="3">장바구니</button>`,
          height: 130,
          logInput: true,
          checks: [
            { label: "dataset", expr: "{ ...document.querySelector('button').dataset }" },
            { label: "typeof price", expr: "typeof document.querySelector('button').dataset.price" },
          ],
        },
      },
      {
        label: "직접 해 보기: dir과 bdi",
        body: "dir은 글 방향입니다. 아랍어와 히브리어는 오른쪽에서 왼쪽으로 씁니다(rtl). dir=\"auto\"는 첫 글자의 방향을 보고 정합니다. 문제는 한 줄에 두 방향이 섞일 때입니다. 사용자 이름 같은 값을 문장에 끼우면 그 이름의 방향이 둘레 글자까지 끌고 가 숫자와 기호 자리가 뒤섞입니다. <bdi>로 감싸면 그 안의 방향을 따로 정해 둘레를 지킵니다. 아래 두 줄에서 숫자 1과 ': 1위'의 자리를 견줘 보세요. bdi가 없는 줄은 '1 :إيان위'처럼 뒤섞이고, bdi가 있는 줄만 바르게 나옵니다. 코드 칸에서도 그 줄이 뒤섞여 보이는 것은 편집기도 같은 규칙으로 그리기 때문입니다. i18n 허브가 다루는 문제의 HTML 쪽 답입니다.",
        lab: {
          html: `<p dir="rtl">dir="rtl": 오른쪽에서 시작합니다</p>
<ul>
  <li>bdi 없음: 사용자 إيان: 1위</li>
  <li>bdi 있음: 사용자 <bdi>إيان</bdi>: 1위</li>
</ul>`,
          height: 140,
        },
      },
      {
        label: "문제가 나는 경우",
        body: "전역 속성은 어느 요소에나 붙어서, 잘못 붙여도 오류가 나지 않습니다. 결과로만 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["hidden을 붙였는데 보인다", "CSS의 display가 이겼다", "[hidden] { display: none !important } 또는 CSS 정리"],
              ['tabindex="1", "2"로 순서를 정했다', "양수가 문서 순서보다 먼저 와서 Tab 순서가 뒤엉킨다", "문서 순서를 고치고 0만 쓴다"],
              ["div에 onclick만 달아 버튼을 만들었다", "Tab으로 못 가고 Enter로 못 누른다", "button을 쓴다. 꼭 div면 tabindex=0과 키 처리"],
              ["모달 뒤를 aria-hidden만으로 숨겼다", "Tab으로 여전히 뒤로 간다", "inert를 쓴다 (모달 dialog는 저절로)"],
              ["data-price를 더했더니 '1200012000'", "dataset 값은 문자열이다", "Number()로 바꾼다"],
              ["아랍어 이름 뒤의 숫자 자리가 바뀐다", "방향이 섞였다", "값을 <bdi>로 감싼다"],
            ],
          },
        ],
      },
      {
        label: "문제의 구조: 네 가지 문",
        body: "사용자가 요소에 닿는 길은 넷입니다. 보기, 누르기(마우스와 터치), 포커스(키보드), 그리고 보조 기술입니다. 전역 속성은 이 문을 하나씩 엽니다. hidden은 넷을 모두 닫고, inert는 보기만 남기고 나머지를 닫고, tabindex는 포커스 문만 열고 닫습니다. 문제가 생기면 '어느 문이 열려 있고 어느 문이 닫혔나'를 표로 확인하면 됩니다. 이 허브의 첫 장에서 본 '태그 하나에 세 가지가 따라온다'의 반대쪽입니다. 태그가 문을 기본으로 열어 두면, 전역 속성이 그것을 바꿉니다.",
        tables: [
          {
            head: ["속성", "보기", "누르기", "포커스 (Tab)", "보조 기술"],
            rows: [
              ["(없음, button)", "열림", "열림", "열림", "열림"],
              ["hidden", "닫힘", "닫힘", "닫힘", "닫힘"],
              ["inert", "열림", "닫힘", "닫힘", "닫힘"],
              ['tabindex="-1"', "열림", "열림", "닫힘 (focus()로만)", "열림"],
              ['aria-hidden="true"', "열림", "열림", "열림 (주의)", "닫힘"],
            ],
          },
        ],
      },
      {
        label: "다음 입구",
        body: "HTML 허브는 여기까지입니다. 여기서 본 요소의 모양은 CSS 허브가, 요소가 화면에 그려지는 과정은 브라우저 렌더링 허브가, 요소를 스크립트로 다루는 법은 JavaScript 허브의 '문서'와 '이벤트' 장이 이어 받습니다. 7장의 링크와 12장의 폼에서 본 preventDefault와 pushState는 Next.js, Nuxt 허브의 라우팅으로 이어집니다.",
      },
      {
        label: "확인 질문",
        body: "1) hidden이 붙었는데 보이는 이유는?\n2) inert와 aria-hidden=\"true\"는 무엇이 다른가요?\n3) tabindex=\"-1\"인 요소에 포커스를 주는 방법은?\n4) data-stock-count는 dataset의 어떤 이름으로 읽나요? 값의 타입은?",
      },
    ],
    sources: [
      { label: "MDN — Global attributes", href: `${REF}/Global_attributes` },
      { label: "MDN — hidden", href: `${REF}/Global_attributes/hidden` },
      { label: "MDN — inert", href: `${REF}/Global_attributes/inert` },
      { label: "MDN — <bdi>", href: `${REF}/Elements/bdi` },
    ],
  },

  {
    id: "html-tags",
    name: "태그 참고서",
    tagline: "지금 쓰는 태그 107개를 열한 묶음으로 나눈다",
    intro:
      "지금 표준에 있는 HTML 태그를 MDN의 분류를 따라 열한 묶음으로 나눠 모았습니다. 태그마다 블록 하나에 무엇을 나타내는지, 언제 쓰는지, 그 태그만 가진 속성이 무엇인지를 적었습니다. 동작이 있는 태그는 직접 해 보기로 바로 눌러 볼 수 있습니다. 1~15장이 '왜 이렇게 동작하나'를 순서대로 설명한다면, 이 참고서는 '이 태그에 무엇을 쓸 수 있나'를 찾아보는 곳입니다.",
    blocks: [
      {
        label: "열한 묶음",
        body: "묶음은 MDN 요소 참고서의 분류와 같습니다. 문서의 뼈대에서 시작해 글, 바깥 파일, 표, 폼, 대화형 요소 순서입니다.",
        tables: [
          {
            head: ["장", "태그", "묻는 것"],
            rows: [
              ["문서와 head 태그", "html, head, title, base, link, meta, style, body", "문서의 바깥 틀과 보이지 않는 정보"],
              ["구획과 제목 태그", "header, nav, main, article, section, aside, footer, search, address, h1~h6, hgroup", "페이지를 어떤 덩어리로 나누나"],
              ["글 덩어리 태그", "p, div, hr, pre, blockquote, ol, ul, menu, li, dl, dt, dd, figure, figcaption", "줄을 바꿔 쌓이는 덩어리"],
              ["링크와 꾸밈 글자 태그", "a, span, br, wbr, em, strong, i, b, u, s, small, mark", "글 안의 링크와 힘줌"],
              ["뜻을 붙이는 글자 태그", "abbr, cite, q, dfn, code, kbd, samp, var, data, time, sub, sup, bdi, bdo, ruby, rt, rp, del, ins", "글자에 기계가 읽는 뜻 더하기"],
              ["이미지와 미디어 태그", "img, picture, source, audio, video, track, map, area", "그림, 소리, 영상"],
              ["임베드와 스크립트 태그", "iframe, embed, object, canvas, script, noscript, template, slot", "다른 문서와 코드 들이기"],
              ["표 태그", "table, caption, colgroup, col, thead, tbody, tfoot, tr, th, td", "칸으로 된 데이터"],
              ["폼 칸과 버튼 태그", "form, label, input, button, select, option, optgroup, datalist, textarea", "값을 받는 칸"],
              ["폼 묶음과 결과 태그", "fieldset, legend, output, progress, meter", "칸 묶기와 결과 보여 주기"],
              ["열고 닫는 태그", "details, summary, dialog", "스크립트 없이 열리고 닫히는 것"],
            ],
          },
        ],
      },
      {
        label: "태그 전체 목록",
        body: "107개 태그를 abc 순서로 늘어놓았습니다. 장 이름을 따라가면 그 태그의 블록이 있습니다.",
        tables: [
          { head: ["태그", "뜻", "장"], rows: [["<a>","링크","링크와 꾸밈 글자 태그"],["<abbr>","약어","뜻을 붙이는 글자 태그"],["<address>","가장 가까운 article이나 body의 연락처","구획과 제목 태그"],["<area>","그림 안의 누르는 영역 하나","이미지와 미디어 태그"],["<article>","따로 떼어도 뜻이 통하는 글","구획과 제목 태그"],["<aside>","본문과 간접적으로 이어진 곁다리","구획과 제목 태그"],["<audio>","소리","이미지와 미디어 태그"],["<b>","눈길을 끌 낱말(키워드, 제품명)","링크와 꾸밈 글자 태그"],["<base>","상대 주소의 기준","문서와 head 태그"],["<bdi>","글 방향 떼어 놓기","뜻을 붙이는 글자 태그"],["<bdo>","글 방향 강제","뜻을 붙이는 글자 태그"],["<blockquote>","긴 인용","글 덩어리 태그"],["<body>","문서의 내용","문서와 head 태그"],["<br>","줄바꿈","링크와 꾸밈 글자 태그"],["<button>","누르는 버튼","폼 칸과 버튼 태그"],["<canvas>","스크립트로 그리는 그림판","임베드와 스크립트 태그"],["<caption>","표의 제목","표 태그"],["<cite>","작품 제목","뜻을 붙이는 글자 태그"],["<code>","짧은 코드","뜻을 붙이는 글자 태그"],["<col>","열 하나 또는 여럿","표 태그"],["<colgroup>","열 묶음","표 태그"],["<data>","기계가 읽는 값","뜻을 붙이는 글자 태그"],["<datalist>","칸에 붙는 제안 목록","폼 칸과 버튼 태그"],["<dd>","dl의 설명","글 덩어리 태그"],["<del>","지운 글","뜻을 붙이는 글자 태그"],["<details>","접었다 펴는 칸","열고 닫는 태그"],["<dfn>","정의되는 용어","뜻을 붙이는 글자 태그"],["<dialog>","대화 상자 (모달, 보통 창)","열고 닫는 태그"],["<div>","뜻 없는 상자","글 덩어리 태그"],["<dl>","용어와 설명의 목록","글 덩어리 태그"],["<dt>","dl의 용어","글 덩어리 태그"],["<em>","힘줌","링크와 꾸밈 글자 태그"],["<embed>","브라우저가 여는 바깥 파일","임베드와 스크립트 태그"],["<fieldset>","칸 묶음","폼 묶음과 결과 태그"],["<figcaption>","figure의 설명글","글 덩어리 태그"],["<figure>","따로 떼어 둘 수 있는 그림, 코드 등","글 덩어리 태그"],["<footer>","사이트나 구획의 꼬리말","구획과 제목 태그"],["<form>","칸을 모아 보내는 구역","폼 칸과 버튼 태그"],["<h1>~<h6>","여섯 단계의 제목","구획과 제목 태그"],["<head>","기계가 읽는 정보의 묶음","문서와 head 태그"],["<header>","사이트나 구획의 머리말","구획과 제목 태그"],["<hgroup>","제목과 부제의 묶음","구획과 제목 태그"],["<hr>","주제가 바뀌는 곳","글 덩어리 태그"],["<html>","문서의 뿌리","문서와 head 태그"],["<i>","결이 다른 글(외국어, 학명, 속생각)","링크와 꾸밈 글자 태그"],["<iframe>","문서 안의 다른 문서(창)","임베드와 스크립트 태그"],["<img>","그림 하나","이미지와 미디어 태그"],["<input>","한 줄 칸, 체크 상자, 버튼 등\n(type이 모양을 정함)","폼 칸과 버튼 태그"],["<ins>","더한 글","뜻을 붙이는 글자 태그"],["<kbd>","사용자 입력(키)","뜻을 붙이는 글자 태그"],["<label>","칸의 이름표","폼 칸과 버튼 태그"],["<legend>","fieldset의 제목","폼 묶음과 결과 태그"],["<li>","목록의 항목","글 덩어리 태그"],["<link>","바깥 자원과의 관계","문서와 head 태그"],["<main>","문서의 중심 내용","구획과 제목 태그"],["<map>","그림의 누르는 영역 묶음","이미지와 미디어 태그"],["<mark>","지금 하는 일과 관련된 표시","링크와 꾸밈 글자 태그"],["<menu>","명령의 목록 (도구 막대)","글 덩어리 태그"],["<meta>","다른 태그로 못 적는 메타데이터","문서와 head 태그"],["<meter>","범위 안의 양","폼 묶음과 결과 태그"],["<nav>","주요 길잡이 링크의 묶음","구획과 제목 태그"],["<noscript>","스크립트가 꺼졌을 때의 내용","임베드와 스크립트 태그"],["<object>","바깥 자원. 대체 내용을 품는다","임베드와 스크립트 태그"],["<ol>","순서 있는 목록","글 덩어리 태그"],["<optgroup>","option 묶음","폼 칸과 버튼 태그"],["<option>","목록의 한 항목","폼 칸과 버튼 태그"],["<output>","계산이나 동작의 결과","폼 묶음과 결과 태그"],["<p>","문단","글 덩어리 태그"],["<picture>","그림 후보들의 묶음","이미지와 미디어 태그"],["<pre>","적은 그대로 보이는 글","글 덩어리 태그"],["<progress>","작업이 끝난 정도","폼 묶음과 결과 태그"],["<q>","문장 안 짧은 인용","뜻을 붙이는 글자 태그"],["<rp>","루비를 못 그릴 때의 괄호","뜻을 붙이는 글자 태그"],["<rt>","루비 글자(읽는 법)","뜻을 붙이는 글자 태그"],["<ruby>","루비 주석 묶음","뜻을 붙이는 글자 태그"],["<s>","더는 맞지 않는 내용","링크와 꾸밈 글자 태그"],["<samp>","프로그램 출력","뜻을 붙이는 글자 태그"],["<script>","실행할 코드나 데이터 블록","임베드와 스크립트 태그"],["<search>","검색이나 거르기 기능의 묶음","구획과 제목 태그"],["<section>","제목을 가진 일반 구획","구획과 제목 태그"],["<select>","항목 중에서 고르는 칸","폼 칸과 버튼 태그"],["<slot>","섀도 DOM 안의 끼울 자리","임베드와 스크립트 태그"],["<small>","곁말, 작은 글씨(저작권, 약관)","링크와 꾸밈 글자 태그"],["<source>","picture, audio, video의 후보 하나","이미지와 미디어 태그"],["<span>","뜻 없는 글줄 안 묶음","링크와 꾸밈 글자 태그"],["<strong>","중요, 경고, 급함","링크와 꾸밈 글자 태그"],["<style>","문서 안의 CSS","문서와 head 태그"],["<sub>","아래 첨자","뜻을 붙이는 글자 태그"],["<summary>","details의 이름표이자 누르는 자리","열고 닫는 태그"],["<sup>","위 첨자","뜻을 붙이는 글자 태그"],["<table>","표 전체","표 태그"],["<tbody>","몸통 행 묶음","표 태그"],["<td>","데이터 칸","표 태그"],["<template>","당장 그리지 않는 HTML 조각","임베드와 스크립트 태그"],["<textarea>","여러 줄 글 칸","폼 칸과 버튼 태그"],["<tfoot>","꼬리 행 묶음","표 태그"],["<th>","제목 칸","표 태그"],["<thead>","머리 행 묶음","표 태그"],["<time>","날짜, 시각, 기간","뜻을 붙이는 글자 태그"],["<title>","문서의 제목","문서와 head 태그"],["<tr>","행 하나","표 태그"],["<track>","시간에 맞춰 나오는 글자(자막 등)","이미지와 미디어 태그"],["<u>","글자 아닌 주석 표시(철자 틀림)","링크와 꾸밈 글자 태그"],["<ul>","순서 없는 목록","글 덩어리 태그"],["<var>","변수 이름","뜻을 붙이는 글자 태그"],["<video>","영상","이미지와 미디어 태그"],["<wbr>","줄을 바꿔도 되는 자리","링크와 꾸밈 글자 태그"]] },
        ],
      },
      {
        label: "태그 블록 읽는 법",
        body: "태그 블록은 세 부분입니다.\n(1) 뜻: 그 태그가 나타내는 것과 쓰는 때, 기본 모양과 동작, 주의할 점입니다.\n(2) 그 태그만의 속성: 표준에 있는 지금 쓰는 속성만 적었습니다. 실험 중인 속성에는 (실험)을 붙였습니다. 표준에서 빠진 옛 속성(align, bgcolor 같은 모양 속성)은 표에 넣지 않았습니다. 모양은 CSS로 바꿉니다.\n(3) 직접 해 보기: 동작이 있는 태그만 있습니다.\n\n묶음 장의 블록은 짧은 요약입니다. 태그마다 따로 세운 장(예: <input>, <a>)에는 기술 요약, 속성마다의 설명과 예시, 브라우저 기본 스타일, DOM으로 다루기, 접근성, 브라우저 지원, 비슷한 태그와의 견줌, 그리고 직접 해 보기가 셋 이상 있습니다. 그래프에서 묶음 장을 펼치면 그 아래에 태그 장들이 있습니다.\n\n표에 없더라도 모든 태그에는 전역 속성(id, class, lang, hidden 등)을 붙일 수 있습니다. 전역 속성은 속성 참고서의 '전역 속성 목록'에 모았습니다.",
        terms: [
          {
            term: "실험 속성과 옛 속성",
            body: "실험 속성은 표준에 들어가는 중이라 아직 일부 브라우저에만 있는 속성입니다. 옛 속성(deprecated)은 표준에서 빠졌지만 오래된 페이지를 위해 브라우저가 아직 읽어 주는 속성입니다. 새로 나온 메뉴와 단종을 앞둔 메뉴처럼, 둘 다 새 코드에서는 조심해서 씁니다.",
          },
        ],
      },
      {
        label: "여기 없는 태그",
        body: "표준에서 빠진 옛 태그는 넣지 않았습니다. center, font, big, tt, strike, marquee, frame, frameset, acronym, applet 등입니다. 브라우저는 오래된 페이지를 위해 이 태그들을 아직 그려 주지만, 새 코드에는 쓰지 않습니다. 모양은 CSS로, acronym은 abbr로, strike는 s나 del로 바꿉니다. svg와 math는 HTML 안에 넣을 수 있지만 각자 별도의 언어(SVG, MathML)라 이 참고서에서 다루지 않습니다.",
        terms: [
          {
            term: "사용자 정의 요소 (custom element)",
            body: "이름에 하이픈이 들어간 태그(<user-card>)는 개발자가 자바스크립트로 정의해 쓰는 요소입니다. 표준 태그와 이름이 겹치지 않도록 하이픈을 꼭 넣게 했습니다. 정의하기 전에도 파서는 지우지 않고 보통 요소로 남겨 둡니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 모르는 태그는 어떻게 되나",
        body: "브라우저는 모르는 태그를 지우지 않습니다. DOM에 그대로 남기고, 글자처럼 줄을 바꾸지 않는 인라인 상자로 그립니다. 지금 값에서 각 요소가 어떤 종류의 객체(생성자 이름)가 됐는지 보세요. 지어낸 이름 <banana>는 '모르는 요소'(HTMLUnknownElement)가 됩니다. 하이픈이 있는 <fruit-box>는 나중에 정의될 수 있는 사용자 정의 요소 자리라 보통 요소(HTMLElement)입니다. 옛 태그도 브라우저는 아직 압니다. <center>는 객체로는 보통 HTMLElement지만 기본 스타일 덕분에 블록이 되어 가운데로 모이고, <marquee>는 자기 객체(HTMLMarqueeElement)가 있어 글자가 흘러갑니다.",
        lab: {
          html: `<banana>지어낸 태그 banana</banana>
<fruit-box>하이픈이 있는 fruit-box</fruit-box>
<center>옛 태그 center</center>
<marquee>옛 태그 marquee</marquee>`,
          height: 130,
          checks: [
            {
              label: "생성자 이름",
              expr: "[...document.body.children].filter((e) => e.localName !== 'script').map((e) => e.localName + ': ' + e.constructor.name)",
            },
            {
              label: "display",
              expr: "[...document.body.children].filter((e) => e.localName !== 'script').map((e) => e.localName + ': ' + getComputedStyle(e).display)",
            },
          ],
        },
        terms: [
          {
            term: "생성자 이름 (constructor.name)",
            body: "DOM 요소는 태그마다 다른 종류의 객체로 만들어집니다. a는 HTMLAnchorElement, input은 HTMLInputElement입니다. 객체의 종류가 그 요소에 어떤 프로퍼티와 메서드가 있는지를 정합니다. 같은 사람이라도 직업에 따라 쓸 수 있는 도구가 다른 것과 같습니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "태그를 고를 때의 흔한 실수입니다. 대부분 '모양으로 고른 것'이 원인입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["가운데 정렬에 <center>를 썼다", "표준에서 빠진 태그다", "CSS text-align, margin-inline: auto"],
              ["태그 이름을 잘못 적었다 (<artcle>)", "에러 없이 모르는 인라인 요소가 된다", "검사기로 찾는다"],
              ["사용자 정의 요소에 하이픈을 뺐다 (<usercard>)", "customElements.define이 거절한다", "<user-card>처럼 하이픈을 넣는다"],
              ["모든 덩어리를 div로 만들었다", "뜻과 랜드마크가 사라진다", "이 참고서에서 맞는 태그를 찾는다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 모르는 태그 <banana>는 DOM에서 사라지나요? 화면에는 어떻게 그려지나요?\n2) <fruit-box>와 <banana>가 다른 종류의 객체가 되는 이유는?\n3) 태그 표에 없는 속성 class를 모든 태그에 붙일 수 있는 이유는?\n4) align 같은 옛 속성 대신 무엇을 쓰나요?",
      },
    ],
    sources: [
      { label: "MDN — HTML elements reference", href: `${REF}/Elements` },
      { label: "WHATWG — Obsolete features", href: `${SPEC}/obsolete.html` },
      { label: "MDN — Using custom elements", href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements" },
    ],
  },
  {
    id: "html-tag-doc",
    name: "문서와 head 태그",
    tagline: "문서의 바깥 껍질과 보이지 않는 머리",
    intro:
      "모든 HTML 문서는 html 하나 안에 head와 body를 하나씩 둡니다. head에는 화면에 그리지 않는 정보가 들어갑니다. 제목(title), 기준 주소(base), 바깥 파일과의 관계(link), 그 밖의 메타데이터(meta), 문서 안의 CSS(style)입니다. body는 화면에 그리는 내용이고, 창 전체의 이벤트를 받는 자리이기도 합니다. 이 시트는 여덟 태그를 하나씩 보고, 태그마다 그 태그만의 속성을 표로 정리합니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "문서의 뼈대를 이루는 세 태그와, head 안에 들어가는 다섯 태그입니다. 속성 칸이 '없음'이면 전역 속성만 씁니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<html>", "문서의 뿌리", "없음", "2장 · head와 메타데이터"],
              ["<head>", "기계가 읽는 정보의 묶음", "없음", "2장 · head와 메타데이터"],
              ["<title>", "문서의 제목", "없음", "2장 · head와 메타데이터"],
              ["<base>", "상대 주소의 기준", "href, target", "7장 · 링크"],
              ["<link>", "바깥 자원과의 관계", "rel, href, as 외 13개", "2장 · head와 메타데이터"],
              ["<meta>", "다른 태그로 못 적는 메타데이터", "name, content, http-equiv, charset, media", "2장 · head와 메타데이터"],
              ["<style>", "문서 안의 CSS", "media, blocking, nonce, title", ""],
              ["<body>", "문서의 내용", "onload, onhashchange 같은 창 이벤트 속성", ""],
            ],
          },
        ],
      },
      {
        label: "<html>",
        body: "문서의 뿌리 요소입니다. 다른 모든 요소는 그 안에 들어갑니다. 문서에 하나만 있고, 자식은 head 하나와 body 하나뿐입니다.\n\n시작 태그와 끝 태그를 빼도 파서가 html 요소를 만들어 줍니다. 그래도 시작 태그는 적는 것이 좋습니다. lang을 붙일 자리이기 때문입니다. lang이 없으면 화면 낭독기는 운영체제의 언어로 읽습니다. 그래서 발음이 틀릴 수 있습니다. lang은 head의 title을 읽을 때도 쓰입니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 version은 쓰지 않습니다(doctype이 대신합니다).",
      },
      {
        label: "<head>",
        body: "문서에 대한 정보를 담는 상자입니다. 사람이 아니라 브라우저, 검색 엔진, 낭독기 같은 기계가 읽습니다. 화면에 보이는 머리말은 head가 아니라 header 태그입니다. 문서에 하나만 있고, html의 첫 자식입니다.\n\n들어가는 것은 메타데이터 요소뿐입니다. title, base, link, meta, style, script, noscript, template입니다. title은 꼭 하나 있어야 합니다(iframe의 srcdoc 문서 같은 예외가 있습니다).\n\n태그를 빼도 파서가 head를 만듭니다. 파서는 메타데이터가 아닌 요소를 만나면 head를 닫고 body를 엽니다. 그래서 p 뒤에 적은 meta는 head가 아니라 body에 들어갑니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 profile은 쓰지 않습니다.",
      },
      {
        label: "<title>",
        body: "문서의 제목입니다. 브라우저 탭과 제목 표시줄, 북마크, 검색 결과에 쓰입니다. head 안에 하나만 둡니다.\n\n안에는 글자만 들어갑니다. 태그를 적어도 요소가 되지 않고 글자로 남습니다. 다만 &amp; 같은 문자 참조는 풀립니다. 끝 태그 </title>를 빠뜨리면 파서가 그 뒤 문서를 모두 제목 글자로 읽습니다.\n\nMDN은 '이 페이지의 내용, 그다음 사이트 이름' 순서를 권합니다. 낭독기 사용자는 페이지를 옮길 때마다 제목부터 듣기 때문입니다. 폼 오류처럼 상태가 크게 바뀌면 제목에 적어 알리기도 합니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<base>",
        body: "문서의 모든 상대 주소가 기댈 기준 주소를 정합니다. a, link, img, form 가릴 것 없이 문서 안의 상대 주소가 모두 이 값을 따릅니다. 스크립트에서는 document.baseURI로 읽습니다. base가 없으면 문서 자신의 주소가 기준입니다.\n\n빈 요소라 끝 태그가 없습니다. href와 target 중 하나는 있어야 합니다. 주소를 쓰는 다른 요소보다 앞에 둡니다. 여러 개 적으면 첫 href와 첫 target만 씁니다.\n\n조심할 점이 둘 있습니다.\n(1) #으로 시작하는 링크도 base를 따릅니다. base가 다른 곳을 가리키면 같은 문서 안의 이동이 다른 문서로 가는 이동이 됩니다.\n(2) Open Graph 같은 meta의 주소는 base를 따르지 않습니다. 늘 절대 주소로 적습니다.",
        tables: [
          {
            caption: "<base>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["href", "주소 (절대, 상대)\ndata:, javascript:는 안 됨", "문서 전체의 상대 주소 기준"],
              ["target", "_self(기본), _blank, _parent, _top, 창 이름", "target이 없는 a, area, form의 결과를 열 곳"],
            ],
          },
        ],
        terms: [
          {
            term: "상대 주소와 기준 주소",
            body: "상대 주소는 photo.jpg나 ../img/a.png처럼 출발점을 빼고 적은 주소입니다. 브라우저는 기준 주소에 이어 붙여 진짜 주소를 만듭니다. 기준 주소는 보통 문서 자신의 주소입니다. '여기서 두 블록 앞'이라는 길 안내가 출발점에 따라 다른 곳을 가리키는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: base가 바꾸는 상대 주소",
        body: "작은 창의 문서 주소는 /labs/html/play.html입니다. 그런데 첫 줄의 base가 기준을 /labs/로 바꿉니다. 지금 값의 document.baseURI를 먼저 보세요.\n(1) 첫 링크를 누르세요. 기록의 주소 줄이 href 글자 \"html/target.html?via=base\"를 /labs/html/target.html로 풉니다. target.html이 열리고 받은 쿼리 값 via=base를 보여 줍니다.\n(2) 다시 실행하고 #memo 링크를 누르세요. 진짜 주소가 /labs/#memo입니다. 예상 줄도 같은 사이트의 다른 주소라고 적습니다. 아래 메모로 스크롤하지 않고 다른 문서로 옮겨 갑니다. /labs/에는 문서가 없어서 서버 응답이 404로 찍힙니다.",
        lab: {
          html: `<base href="/labs/">
<p><a href="html/target.html?via=base">html/target.html</a></p>
<p><a href="#memo">#memo</a> (같은 문서의 메모로 갈까요?)</p>
<p id="memo">메모</p>`,
          height: 160,
          checks: [
            { label: "document.baseURI", expr: "document.baseURI" },
            { label: "첫 링크의 a.href", expr: "document.querySelector('a').href" },
            { label: "#memo 링크의 a.href", expr: "document.querySelectorAll('a')[1].href" },
          ],
          tryIt: "base 줄을 지우고 실행해 보세요. 첫 링크가 /labs/html/html/target.html을 가리키고, #memo는 같은 문서 안으로 스크롤합니다.",
        },
      },
      {
        label: "<link>",
        body: "지금 문서와 바깥 자원의 관계를 적습니다. 가장 흔한 것은 CSS 파일 연결과 사이트 아이콘입니다. 빈 요소라 끝 태그가 없습니다. rel=\"stylesheet\"처럼 body에 둬도 되는 값이 있습니다. 그래도 head에 모으는 것이 좋습니다.\n\n관계의 종류는 rel에 적습니다. 공백으로 나눠 여러 개를 적을 수 있습니다. 자주 쓰는 값은 아래 둘째 표에 모았습니다.\n\nrel=\"preload\"는 곧 쓸 자원을 미리 받으라는 뜻입니다. 이때 as가 꼭 있어야 합니다. as는 받을 것의 종류입니다. 브라우저는 as로 우선순위, 보안 규칙(CSP), Accept 헤더를 정합니다. as가 font나 fetch면 crossorigin도 함께 적습니다.\n\nlink도 다 받으면 load, 못 받으면 error 이벤트를 냅니다. 옛 속성 charset, rev, target은 쓰지 않습니다.",
        tables: [
          {
            caption: "<link>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["rel", "공백으로 나눈 관계 이름", "이 자원이 문서와 어떤 관계인지"],
              ["href", "주소", "바깥 자원의 주소"],
              ["as", "script, style, font, image, fetch, track 등", "preload에서 필수. 받을 것의 종류"],
              ["media", "미디어 쿼리", "조건이 맞을 때만 적용 (주로 CSS)"],
              ["type", "MIME 타입", "자원의 형식. 모르는 형식의 preload는 받지 않음"],
              ["sizes", "any, 48x48 같은 크기", "rel=\"icon\"의 아이콘 크기"],
              ["crossorigin", "anonymous, use-credentials", "CORS로 받을지, 쿠키를 보낼지"],
              ["integrity", "해시 값", "받은 파일이 바뀌지 않았는지 검사"],
              ["referrerpolicy", "no-referrer 등", "요청에 실을 Referer"],
              ["fetchpriority", "high, low, auto", "같은 종류 안에서 받는 순서의 힌트"],
              ["blocking", "render", "받을 때까지 화면 그리기를 멈춤\n(stylesheet, expect에서만)"],
              ["disabled", "불 속성", "stylesheet를 받지도 적용하지도 않음"],
              ["hreflang", "언어 태그", "자원의 언어 (참고용)"],
              ["imagesrcset", "srcset과 같은 문법", "preload as=\"image\"에서 고를 후보"],
              ["imagesizes", "sizes와 같은 문법", "preload as=\"image\"에서 그릴 폭"],
              ["title", "글자", "stylesheet에서 대체 스타일의 이름"],
            ],
          },
          {
            caption: "rel에 자주 쓰는 값",
            head: ["rel", "뜻", "함께 쓰는 속성"],
            rows: [
              ["stylesheet", "이 CSS를 적용한다", "href, media"],
              ["icon", "사이트 아이콘", "href, sizes, type"],
              ["preload", "곧 쓸 자원을 미리 받는다", "href, as, crossorigin"],
              ["modulepreload", "모듈 스크립트를 미리 받아 둔다", "href"],
              ["preconnect", "그 서버에 미리 연결해 둔다", "href, crossorigin"],
              ["dns-prefetch", "그 서버의 DNS만 미리 찾는다", "href"],
              ["canonical", "이 내용의 대표 주소", "href"],
              ["alternate", "다른 언어나 형식의 같은 문서", "href, hreflang, type"],
              ["manifest", "웹 앱 매니페스트", "href"],
            ],
          },
        ],
        code: '<link rel="stylesheet" href="/style.css">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">\n<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="alternate" hreflang="en" href="https://example.com/en/">',
        codeLang: "html",
        terms: [
          {
            term: "미리 받기 (preload)",
            body: "지금 당장 그리지는 않지만 곧 쓸 파일을 먼저 받아 두는 것입니다. 브라우저가 CSS나 스크립트를 다 읽은 뒤에야 찾을 글꼴을 앞당겨 받을 때 씁니다. 저녁 요리를 시작하기 전에 재료를 미리 장바구니에 담아 두는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: link의 load와 error",
        body: "실행하면 기록에 두 줄이 생깁니다. preload한 photo.jpg는 load 줄로, 없는 파일 no-such.css는 error 줄로 나옵니다. 화면에는 아무 변화가 없습니다. preload는 받아 두기만 하고 그리지는 않습니다.\n\n지금 값의 head 안의 link 수도 보세요. 코드 맨 앞의 link는 파서가 head에 넣습니다. relList.supports()는 이 브라우저가 그 rel 값을 아는지 알려 줍니다.",
        lab: {
          html: `<link rel="preload" href="photo.jpg" as="image">
<link rel="stylesheet" href="no-such.css">
<p>head에 link 둘을 넣었습니다. 기록을 보세요.</p>`,
          height: 110,
          checks: [
            { label: "첫 link의 as", expr: "document.querySelector('link').as" },
            { label: "head 안의 link 수", expr: "document.head.querySelectorAll('link').length" },
            { label: "relList.supports('preload')", expr: "document.querySelector('link').relList.supports('preload')" },
          ],
          tryIt: "첫 link에서 as=\"image\"를 지우고 실행해 보세요. 표준은 as가 없는 preload를 받지 않습니다. load 줄이 사라집니다.",
        },
      },
      {
        label: "<meta>",
        body: "title, base, link, style, script로 적을 수 없는 나머지 메타데이터입니다. 빈 요소라 끝 태그가 없습니다. 어떤 속성을 쓰느냐에 따라 넷 중 하나가 됩니다.\n(1) charset: 문서의 문자 인코딩. 값은 utf-8 하나뿐이고, 문서 앞 1024바이트 안에 둡니다.\n(2) name과 content: 이름과 값의 짝. description, viewport, theme-color 등.\n(3) http-equiv와 content: HTTP 헤더 대신 내리는 지시.\n(4) itemprop: 마이크로데이터의 값.\n\n한 meta에는 name, http-equiv, charset, itemprop 중 하나만 적습니다. media는 name=\"theme-color\"일 때만 뜻이 있습니다.\n\nhttp-equiv=\"refresh\"는 content의 초만큼 기다립니다. 그 뒤 문서를 다시 읽거나 url= 뒤 주소로 옮깁니다. 읽기도 전에 페이지가 바뀌면 곤란하니 짧은 자동 이동은 피합니다.\n\nviewport의 content는 쉼표로 나눈 '키=값'입니다. 확대를 막는 값은 글자를 키워 읽는 사람을 곤란하게 합니다.",
        tables: [
          {
            caption: "<meta>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["name", "description, viewport, theme-color 등", "메타데이터의 이름"],
              ["content", "글자", "name이나 http-equiv의 값"],
              ["http-equiv", "content-security-policy, refresh, default-style 등", "HTTP 헤더를 흉내 내는 지시"],
              ["charset", "utf-8", "문서의 문자 인코딩"],
              ["media", "미디어 쿼리 (기본 all)", "theme-color를 적용할 조건"],
            ],
          },
          {
            caption: "viewport의 content에 쓰는 키",
            head: ["키", "값", "하는 일"],
            rows: [
              ["width", "device-width 또는 숫자", "레이아웃 폭. device-width면 기기의 폭"],
              ["initial-scale", "숫자 (예: 1)", "처음 확대 배율"],
              ["minimum-scale", "숫자", "가장 작은 배율"],
              ["maximum-scale", "숫자", "가장 큰 배율. 작게 잡으면 확대를 막음"],
              ["user-scalable", "yes, no", "no면 확대를 막음 (접근성 문제)"],
              ["interactive-widget", "resizes-visual, resizes-content, overlays-content", "화면 키보드가 뜰 때 뷰포트를 다루는 법"],
              ["height", "device-height 또는 숫자", "높이. 거의 쓰지 않음"],
            ],
          },
        ],
        code: '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">\n<meta http-equiv="refresh" content="3; url=https://example.com/">',
        codeLang: "html",
        terms: [
          {
            term: "프래그마 지시 (pragma directive)",
            body: "브라우저에게 이 문서를 어떻게 처리하라고 이르는 지시입니다. 원래 서버가 HTTP 헤더로 보내는 것을 문서 안에 적습니다. 그래서 이름이 http-equiv, 곧 'HTTP와 같은 것'입니다. 택배 상자 겉면에 적을 '취급 주의'를 상자 안 편지에 적어 넣은 셈입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: title과 meta refresh",
        body: "지금 값부터 보세요. title이 둘이지만 document.title은 첫 title의 글자입니다. 그 안의 <b>는 요소가 아니라 글자 그대로이고, &amp;는 &로 풀렸습니다. 그래서 첫 title 안의 요소 수는 0입니다.\n\n그대로 두면 8초 뒤 기록에 pagehide와 load 줄이 생깁니다. http-equiv=\"refresh\"가 content의 초만큼 기다렸다가 url= 뒤의 주소로 옮긴 것입니다. 아무것도 누르지 않았는데 문서가 바뀝니다. target.html은 받은 쿼리 값 from=refresh를 보여 줍니다.",
        lab: {
          html: `<title>첫 <b>제목</b> &amp; 끝</title>
<title>둘째 제목</title>
<meta name="description" content="이 문서의 한 줄 요약">
<meta http-equiv="refresh" content="8; url=target.html?from=refresh">
<p>8초 뒤 이 작은 창이 다른 문서로 옮겨 갑니다.</p>`,
          height: 110,
          checks: [
            { label: "document.title", expr: "document.title" },
            { label: "title 요소 수", expr: "document.querySelectorAll('title').length" },
            { label: "첫 title 안의 요소 수", expr: "document.querySelector('title').children.length" },
            { label: "description", expr: "document.querySelector('meta[name=description]').content" },
          ],
          tryIt: "두 title의 순서를 바꾸고 refresh 줄을 지운 뒤 실행해 보세요. document.title이 둘째 제목이 되고, 문서는 그대로 머뭅니다.",
        },
      },
      {
        label: "<style>",
        body: "문서 안에 CSS를 직접 적습니다. 보통 head에 둡니다. style과 link가 여럿이면 문서에 적힌 순서대로 적용됩니다. 우선순위가 같은 규칙은 뒤에 온 것이 이깁니다.\n\nmedia를 붙이면 그 조건이 맞을 때만 적용됩니다. head의 style은 파서가 만나는 순간부터 화면 그리기를 막습니다. 스크립트로 나중에 넣은 style이 그리기를 막게 하려면 blocking=\"render\"를 붙입니다.\n\nbody 안에도 둘 수 있습니다. 다만 표준에 맞으려면 부모의 첫 자식이어야 합니다. 그리고 규칙을 모두 @scope { } 안에 넣어 그 부모 안만 꾸며야 합니다. 이를 어겨도 브라우저는 적용하지만 틀린 HTML입니다.\n\n옛 속성 type은 쓰지 않습니다(CSS뿐이라 필요 없습니다).",
        tables: [
          {
            caption: "<style>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["media", "미디어 쿼리 (기본 all)", "조건이 맞을 때만 적용"],
              ["blocking", "render", "적용될 때까지 화면 그리기를 멈춤"],
              ["nonce", "서버가 매번 새로 만든 값", "CSP의 style-src가 이 style을 허락하게 함"],
              ["title", "글자", "대체 스타일 묶음의 이름"],
            ],
          },
        ],
        terms: [
          {
            term: "렌더링 차단 (render-blocking)",
            body: "브라우저가 화면 그리기를 잠시 멈추고 기다리는 것입니다. CSS가 오기 전에 그리면 꾸미지 않은 화면이 번쩍 보였다가 바뀌기 때문입니다. 무대 준비가 끝날 때까지 막을 내려 두는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<body>",
        body: "문서의 내용입니다. 화면에 그리는 것은 모두 여기에 들어갑니다. 문서에 하나만 있고, html의 둘째 자식입니다. 스크립트에서는 document.body로 읽습니다.\n\nbody만의 속성은 모두 on으로 시작하는 이벤트 속성입니다. 이 이벤트들은 body가 아니라 window에서 납니다. onload는 window의 load, onhashchange는 window의 hashchange입니다. 곧 body에 적는 것은 window에 다는 것과 같습니다. 스크립트에서는 window.addEventListener로 다는 편이 분명합니다.\n\n옛 속성 bgcolor, background, text, link 등은 쓰지 않습니다(CSS로). onunload도 쓰지 않습니다(pagehide로).",
        tables: [
          {
            caption: "<body>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["onload", "스크립트", "문서와 딸린 자원을 다 읽었을 때"],
              ["onpageshow, onpagehide", "스크립트", "문서를 보여 줄 때, 내릴 때 (뒤로 가기 포함)"],
              ["onpagereveal, onpageswap", "스크립트", "문서를 처음 그릴 때, 다른 문서로 바꿔 갈 때"],
              ["onbeforeunload", "스크립트", "문서를 내리기 직전"],
              ["onhashchange", "스크립트", "주소의 # 뒷부분이 바뀌었을 때"],
              ["onpopstate", "스크립트", "세션 기록을 오갔을 때 (뒤로, 앞으로)"],
              ["onresize", "스크립트", "창 크기가 바뀌었을 때"],
              ["onfocus, onblur", "스크립트", "창이 포커스를 얻었을 때, 잃었을 때"],
              ["onmessage, onmessageerror", "스크립트", "postMessage를 받았을 때, 풀지 못했을 때"],
              ["onstorage", "스크립트", "다른 탭이 저장소를 바꿨을 때"],
              ["ononline, onoffline", "스크립트", "네트워크가 돌아왔을 때, 끊겼을 때"],
              ["onbeforeprint, onafterprint", "스크립트", "인쇄를 시작할 때, 끝냈을 때"],
              ["onlanguagechange", "스크립트", "사용자의 선호 언어가 바뀌었을 때"],
              ["onerror", "스크립트", "처리하지 않은 스크립트 에러"],
              ["onunhandledrejection, onrejectionhandled", "스크립트", "처리하지 않은 Promise 거부, 늦게 처리된 거부"],
            ],
          },
        ],
        terms: [
          {
            term: "창 이벤트 (window event)",
            body: "어느 한 요소가 아니라 창 전체에서 나는 이벤트입니다. 문서를 다 읽음(load), 주소의 # 바뀜(hashchange), 창 크기 바뀜(resize)이 그렇습니다. 그래서 요소가 아니라 window가 받습니다. 건물 안내 방송이 어느 방이 아니라 건물 전체에 울리는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: body의 이벤트는 window의 것",
        body: "실행하면 기록의 출력 줄에 load가 찍힙니다. body에 적은 onload가 window의 load에 달렸기 때문입니다. 그때 readyState는 complete입니다.\n\n#one으로 링크를 누르세요. 엔진이 적는 hashchange 줄과 함께 출력 줄이 하나 더 생깁니다. hashchange는 window에서만 나는 이벤트인데, body에 적은 핸들러가 받았습니다. 지금 값을 보면 body.onhashchange와 window.onhashchange는 같은 함수입니다.",
        lab: {
          html: `<body onload="console.log('load, readyState = ' + document.readyState)"
      onhashchange="console.log('hashchange, 지금 # = ' + location.hash)">
<p><a href="#one">#one으로</a> <a href="#two">#two로</a></p>
<p id="one">하나</p>
<p id="two">둘</p>`,
          height: 170,
          checks: [
            { label: "typeof window.onhashchange", expr: "typeof window.onhashchange" },
            { label: "body.onhashchange === window.onhashchange", expr: "document.body.onhashchange === window.onhashchange" },
          ],
          tryIt: "onhashchange 속성을 <p id=\"one\">으로 옮겨 실행해 보세요. hashchange 줄은 그대로인데 출력 줄은 생기지 않습니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "head의 실수는 화면에 바로 드러나지 않습니다. 링크를 누를 때, 휴대폰에서, 검색 결과에서 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["base href를 다른 경로로 바꿨다", "#으로 시작하는 링크까지 다른 문서로 간다", "base를 빼고 주소를 /로 시작하는 루트 기준으로 적는다"],
              ["</title>을 빠뜨렸다", "뒤의 문서 전체가 제목 글자가 되어 화면이 빈다", "끝 태그를 꼭 적는다"],
              ["preload에 as를 빠뜨렸다", "미리 받지 않는다", "as에 종류를 적는다. font, fetch면 crossorigin도"],
              ["meta charset을 head 뒤쪽에 두었다", "앞 1024바이트를 넘으면 인코딩 선언으로 쓰이지 않는다", "head의 맨 처음에 둔다"],
              ["viewport에 user-scalable=no를 넣었다", "사용자가 확대해 읽을 수 없다", "확대를 막는 값을 뺀다"],
              ["onhashchange를 div에 적었다", "그 이벤트는 window에서만 나 핸들러가 불리지 않는다", "body에 적거나 window.addEventListener로 단다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) <base href=\"/docs/\">가 있을 때 <a href=\"#top\">은 어디로 가나요?\n2) rel=\"preload\"에 꼭 함께 적어야 하는 속성은 무엇이고, 왜 필요한가요?\n3) <title> 안에 <b>를 적으면 document.title은 어떻게 되나요?\n4) <body onresize>와 window.onresize는 어떤 관계인가요?",
      },
    ],
    sources: [
      { label: "MDN — <base>", href: `${REF}/Elements/base` },
      { label: "MDN — <link>", href: `${REF}/Elements/link` },
      { label: "MDN — <meta>", href: `${REF}/Elements/meta` },
      { label: "MDN — <style>", href: `${REF}/Elements/style` },
      { label: "MDN — <body>", href: `${REF}/Elements/body` },
      { label: "MDN — <title>", href: `${REF}/Elements/title` },
    ],
  },

  {
    id: "html-tag-section",
    name: "구획과 제목 태그",
    tagline: "문서를 나누는 상자와 그 이름표",
    intro:
      "문서는 머리, 길잡이, 본문, 곁다리, 꼬리로 나뉩니다. 이 시트의 태그는 그 나눔에 이름을 붙입니다. 화면은 div와 거의 같습니다. 하지만 낭독기는 이 이름으로 랜드마크 목록을 만들고, 사용자는 원하는 곳으로 곧장 건너뜁니다. 각 구획은 h1~h6 제목으로 목차를 이룹니다. 태그마다 뜻, 쓰는 때, 놓치기 쉬운 규칙을 정리합니다. 여기의 태그는 모두 그 태그만의 속성이 없고 전역 속성만 씁니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "구획 태그 여덟, 연락처 태그 하나, 제목 태그 둘입니다. 둘째 표는 태그가 저절로 갖는 역할입니다. 같은 태그도 놓인 자리에 따라 역할이 바뀝니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<header>", "사이트나 구획의 머리말", "없음", "6장 · 문서 구조와 랜드마크"],
              ["<nav>", "주요 길잡이 링크의 묶음", "없음", "6장 · 문서 구조와 랜드마크"],
              ["<main>", "문서의 중심 내용", "없음", "6장 · 문서 구조와 랜드마크"],
              ["<article>", "따로 떼어도 뜻이 통하는 글", "없음", "6장 · 문서 구조와 랜드마크"],
              ["<section>", "제목을 가진 일반 구획", "없음", "6장 · 문서 구조와 랜드마크"],
              ["<aside>", "본문과 간접적으로 이어진 곁다리", "없음", "6장 · 문서 구조와 랜드마크"],
              ["<footer>", "사이트나 구획의 꼬리말", "없음", "6장 · 문서 구조와 랜드마크"],
              ["<search>", "검색이나 거르기 기능의 묶음", "없음", ""],
              ["<address>", "가장 가까운 article이나 body의 연락처", "없음", "5장 · 고급 텍스트"],
              ["<h1>~<h6>", "여섯 단계의 제목", "없음", "3장 · 제목, 문단, 강조"],
              ["<hgroup>", "제목과 부제의 묶음", "없음", ""],
            ],
          },
          {
            caption: "태그가 저절로 갖는 역할",
            head: ["태그", "역할", "예외"],
            rows: [
              ["<header>", "banner", "article, aside, main, nav, section 안이면 역할 없음(generic)"],
              ["<footer>", "contentinfo", "header와 같은 예외"],
              ["<nav>", "navigation", "없음"],
              ["<main>", "main", "없음"],
              ["<search>", "search", "없음"],
              ["<aside>", "complementary", "구획 요소 안에서 이름이 없으면 generic"],
              ["<section>", "region", "이름이 없으면 generic"],
              ["<article>", "article", "랜드마크는 아님"],
              ["<address>, <hgroup>", "group", "랜드마크는 아님"],
              ["<h1>~<h6>", "heading", "숫자가 단계(1~6)"],
            ],
          },
        ],
        terms: [
          {
            term: "랜드마크 (landmark)",
            body: "페이지의 큰 구역에 붙는 표지판입니다. 낭독기는 랜드마크 목록을 보여 주고, 사용자는 '본문', '메뉴'로 곧장 건너뜁니다. 건물 안내도의 '출구', '계단' 표시와 같습니다.",
          },
          {
            term: "암묵적 역할 (implicit role)",
            body: "태그만으로 저절로 정해지는 역할입니다. main 태그는 role=\"main\"을 적지 않아도 main 역할입니다. 제복을 입으면 이름표 없이도 하는 일을 알아보는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<header>",
        body: "소개나 길잡이를 모아 두는 머리말입니다. 제목, 로고, 검색 폼, 글쓴이 이름 등이 들어갑니다.\n\n어디에 있느냐로 뜻이 바뀝니다. body 바로 아래처럼 구획 밖에 있으면 사이트 전체의 머리, 곧 banner 랜드마크입니다. article, aside, main, nav, section 안에 있으면 그 구획의 머리일 뿐입니다. 이때는 랜드마크가 아닙니다. 글마다 있는 머리말이 사이트의 머리로 잘못 알려지지 않게 하는 규칙입니다.\n\n제목을 꼭 넣어야 하는 것은 아닙니다. header 안에 다른 header나 footer는 넣지 않습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
        terms: [
          {
            term: "구획 요소 (sectioning content)",
            body: "문서를 구획으로 나누는 요소의 묶음입니다. article, aside, nav, section 넷입니다. header와 footer는 가장 가까운 구획 요소에 딸립니다. 책의 장과 절을 나누는 칸막이와 같습니다.",
          },
        ],
      },
      {
        label: "<nav>",
        body: "주요 길잡이 링크를 묶습니다. 사이트 메뉴, 목차, 색인이 그 예입니다. navigation 랜드마크가 됩니다.\n\n모든 링크를 nav에 넣을 필요는 없습니다. footer의 잡다한 링크 목록은 nav 없이 둬도 됩니다. nav가 여럿이면 aria-label이나 aria-labelledby로 이름을 붙여 구별합니다. 안에 목록이 꼭 있어야 하는 것도 아닙니다. 문장 속 링크도 됩니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<main>",
        body: "문서의 중심 내용입니다. 그 페이지에만 있는 내용을 담습니다. 여러 페이지에 되풀이되는 메뉴, 사이드바, 저작권 줄, 로고는 넣지 않습니다. main 랜드마크가 됩니다.\n\nhidden이 없는 main은 문서에 하나만 둡니다. 화면을 바꿔 끼우는 앱이면 main을 여럿 두고, 하나만 빼고 hidden을 붙입니다. main의 조상은 html, body, div, 이름 없는 form 정도로 둡니다. article이나 section 안에는 넣지 않습니다.\n\nmain에 id를 붙이면 '본문으로 건너뛰기' 링크의 목적지가 됩니다. 브라우저의 읽기 모드도 main을 찾아 본문을 고릅니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
        terms: [
          {
            term: "건너뛰기 링크 (skip link)",
            body: "페이지 맨 앞에 두는 '본문으로 건너뛰기' 링크입니다. 키보드나 낭독기 사용자가 매번 메뉴를 다 지나지 않게 해 줍니다. 엘리베이터에서 원하는 층 버튼을 바로 누르는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<article>",
        body: "따로 떼어 내도 뜻이 통하는 한 편의 글입니다. 블로그 글, 뉴스 기사, 댓글, 상품 카드가 그 예입니다. 한 페이지에 여럿 둘 수 있습니다.\n\n보통 제목(h1~h6)을 자식으로 넣어 무슨 글인지 밝힙니다. article 안의 article은 바깥 글에 딸린 글입니다. 블로그 글 안의 댓글이 그렇습니다. 글쓴이 연락처는 address로, 쓴 날짜는 time의 datetime으로 적습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<section>",
        body: "더 알맞은 태그가 없을 때 쓰는 일반 구획입니다. 거의 언제나 제목이 있어야 합니다.\n\n고르는 순서는 이렇습니다.\n(1) 따로 떼어도 되는 글이면 article\n(2) 곁다리 정보면 aside\n(3) 문서의 중심이면 main\n(4) 꾸미기 위한 상자일 뿐이면 div\n(5) 그 밖의 제목 있는 덩어리면 section\n\nsection은 이름이 있을 때만 region 랜드마크가 됩니다. aria-labelledby로 제목을 가리키면 이름이 붙습니다. 이름이 없으면 낭독기에게는 div와 같습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
        code: '<section aria-labelledby="price-title">\n  <h2 id="price-title">요금</h2>\n  <p>…</p>\n</section>',
        codeLang: "html",
        terms: [
          {
            term: "접근 가능한 이름 (accessible name)",
            body: "보조 기술이 요소를 부를 때 쓰는 이름입니다. aria-label, aria-labelledby, 안의 글자 등에서 계산합니다. section은 이 이름이 있어야 region이 됩니다. 이름표가 있어야 불러 세울 수 있는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<aside>",
        body: "본문과 간접적으로만 이어진 내용입니다. 사이드바, 덧붙임 상자, 관련 글 목록이 그 예입니다. 보통 complementary 랜드마크가 됩니다. 다만 article 같은 구획 요소 안에 있고 이름이 없으면 랜드마크가 아닙니다.\n\n괄호 속 설명처럼 본문 흐름의 일부인 글에는 쓰지 않습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<footer>",
        body: "가장 가까운 구획의 꼬리말입니다. 글쓴이, 저작권, 관련 문서 링크가 들어갑니다. 가장 가까운 구획이 body면 페이지 전체의 꼬리, 곧 contentinfo 랜드마크입니다. article, aside, main, nav, section 안이면 그 구획의 꼬리입니다. 이때는 랜드마크가 아닙니다.\n\nfooter는 구획을 새로 만들지 않습니다. 그래서 개요에 절을 더하지 않습니다. 글쓴이 연락처는 footer 안의 address에 적습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "직접 해 보기: header와 footer의 범위",
        body: "header와 footer는 둘씩, 모두 넷입니다. 그런데 지금 값의 랜드마크에는 banner, main, contentinfo가 하나씩만 나옵니다. article 안의 머리와 꼬리는 그 글의 것이라 랜드마크가 아닙니다.\n\n글의 꼬리에는 address가 있습니다. 이 글을 쓴 사람의 연락처라는 뜻입니다. 그 링크를 누르면 target.html이 열리고 받은 쿼리 값 to=writer를 보여 줍니다.",
        lab: {
          html: `<header>사이트 머리</header>
<main>
  <article>
    <header>글의 머리</header>
    <p>글 본문</p>
    <footer>글의 꼬리
      <address><a href="target.html?to=writer">글쓴이에게</a></address>
    </footer>
  </article>
</main>
<footer>사이트 꼬리</footer>`,
          height: 250,
          checks: [
            { label: "labLandmarks()", expr: "labLandmarks()" },
            { label: "header, footer 요소 수", expr: "document.querySelectorAll('header, footer').length" },
          ],
          tryIt: "<main>과 <article>을 <div>로 바꿔 실행해 보세요. 글의 머리와 꼬리도 banner, contentinfo가 되어 둘씩 생깁니다.",
        },
      },
      {
        label: "<search>",
        body: "검색이나 거르기 기능을 담는 상자입니다. 사이트 검색 폼, 페이지 안의 필터가 그 예입니다. search 랜드마크가 됩니다. 그래서 form에 role=\"search\"를 따로 붙이지 않아도 됩니다.\n\n검색 결과를 담는 태그는 아닙니다. 결과는 main 같은 본문에 둡니다. 다만 입력하는 동안 뜨는 추천 검색어는 검색 기능의 일부라 search 안에 둡니다. 스크립트로만 거르는 기능이면 form 없이 써도 됩니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "직접 해 보기: search 안의 폼",
        body: "지금 값을 보세요. banner 안에 search 랜드마크가 있습니다. role을 하나도 적지 않았는데 태그만으로 생겼습니다.\n\n찾기를 누르세요. search는 뜻만 붙일 뿐 폼의 동작은 그대로입니다. 기록에 submit 줄과 보낼 값 q=\"html\"이 나옵니다. GET이라 target.html?q=html로 옮겨 가고, target.html이 받은 값을 보여 줍니다.",
        lab: {
          html: `<header>
  <b>사이트 이름</b>
  <search>
    <form action="target.html">
      <input name="q" value="html" aria-label="검색어">
      <button>찾기</button>
    </form>
  </search>
</header>
<main><p>검색 결과는 search 밖, 본문에 둡니다.</p></main>`,
          height: 150,
          checks: [{ label: "labLandmarks()", expr: "labLandmarks()" }],
          tryIt: "<search>와 </search>를 <div>, </div>로 바꿔 실행해 보세요. search가 사라집니다. form에 role=\"search\"를 붙이면 다시 생깁니다.",
        },
      },
      {
        label: "<address>",
        body: "사람이나 단체의 연락처를 담습니다. 주소, 이메일, 전화번호, URL, SNS 계정, 좌표 무엇이든 됩니다. 연락처 주인의 이름도 함께 적습니다.\n\n연락처만 담습니다. 쓴 날짜 같은 다른 정보는 넣지 않습니다(날짜는 time으로). 또 가장 가까운 article이나 body의 연락처만 나타냅니다. 아무 우편 주소에나 쓰는 태그가 아닙니다. 보통 그 구획의 footer 안에 둡니다.\n\n기본 모양은 기울임꼴이지만 뜻은 i, em과 다릅니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
        code: '<footer>\n  <address>\n    글쓴이: <a href="https://example.com/sky">김하늘</a>\n  </address>\n</footer>',
        codeLang: "html",
      },
      {
        label: "<h1>~<h6>",
        body: "여섯 단계의 제목입니다. h1이 가장 높고 h6가 가장 낮습니다. 기본은 블록 상자라 새 줄에서 시작해 폭을 다 씁니다.\n\n브라우저와 보조 기술은 제목으로 목차를 만듭니다. 낭독기 사용자는 제목에서 제목으로 건너뛰며 페이지를 훑습니다. 그래서 MDN은 셋을 권합니다.\n(1) 단계를 건너뛰지 않습니다. h2 다음에 바로 h4를 쓰지 않습니다.\n(2) h1은 페이지에 하나를 둡니다.\n(3) 글자 크기를 바꾸려고 제목을 쓰지 않습니다. 크기는 CSS의 font-size로 정합니다.\n\n하위 절을 닫고 위로 돌아갈 때는 단계가 뛰어도 됩니다. h4 다음에 h2가 오는 것은 괜찮습니다. 예전 표준은 section 안의 h1을 h2처럼 작게 그렸습니다. 이 기본 스타일은 2025년에 표준에서 빠졌습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 전역 속성 headingoffset(실험)과 headingreset(실험)은 계산된 제목 단계를 바꿉니다.",
      },
      {
        label: "<hgroup>",
        body: "제목 하나와 거기 딸린 문단을 묶습니다. 부제, 다른 이름, 한 줄 소개가 그 딸린 내용입니다. 안에는 h1~h6 하나와, 그 앞이나 뒤의 p를 둡니다.\n\n개요에 들어가는 것은 hgroup 안의 제목 하나뿐입니다. 부제는 p라서 제목 단계를 차지하지 않습니다. 부제를 h2로 적으면 개요에서 하위 절처럼 읽힙니다. 부제를 p로 적고 hgroup으로 묶으면 제목과 한 덩어리임이 분명해집니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "직접 해 보기: hgroup의 부제는 개요에 없다",
        body: "지금 값의 개요에는 h1, h2, h3만 나옵니다. 부제 '태그와 속성을 한 장씩'은 p라서 개요에 없습니다. 화면에서는 제목 바로 아래에 붙어 제목의 일부로 보입니다. hgroup이 그 둘을 한 덩어리로 묶습니다.",
        lab: {
          html: `<hgroup>
  <h1>HTML 참고서</h1>
  <p>태그와 속성을 한 장씩</p>
</hgroup>
<h2>구획 태그</h2>
<h3>header</h3>`,
          height: 260,
          checks: [
            { label: "labOutline()", expr: "labOutline()" },
            { label: "hgroup의 자식", expr: "[...document.querySelector('hgroup').children].map((el) => el.localName)" },
          ],
          tryIt: "부제의 <p>를 <h2>로 바꿔 실행해 보세요. 개요에 h2가 하나 더 생겨, 부제가 첫 절의 제목처럼 읽힙니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "구획 태그의 실수는 화면에서 거의 티가 나지 않습니다. 랜드마크 목록과 제목 목록에서 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["모든 구획을 div로 만들었다", "랜드마크가 없어 낭독기로 건너뛸 곳이 없다", "header, nav, main, footer로 바꾼다"],
              ["글의 header를 article 밖에 두었다", "글의 머리가 banner가 되어 여럿 생긴다", "글의 header를 article 안에 넣는다"],
              ["main 둘을 모두 보이게 두었다", "중심 내용이 어디인지 모호한 틀린 HTML", "하나만 남기고 나머지에 hidden"],
              ["부제를 h2로 적었다", "개요에 없는 절이 생긴다", "hgroup 안에 p로 적는다"],
              ["글자를 키우려고 h3를 썼다", "개요의 단계가 어긋난다", "알맞은 단계를 쓰고 크기는 CSS로"],
              ["address에 아무 우편 주소나 넣었다", "그 구획의 연락처로 잘못 알려진다", "보통 p로 적는다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) article 안의 header와 body 바로 아래의 header는 역할이 어떻게 다른가요?\n2) 이름이 없는 section은 어떤 랜드마크가 되나요?\n3) search 안에 검색 결과 목록을 넣어도 되나요?\n4) hgroup 안의 p는 제목 개요에 들어가나요?",
      },
    ],
    sources: [
      { label: "MDN — <header>", href: `${REF}/Elements/header` },
      { label: "MDN — <main>", href: `${REF}/Elements/main` },
      { label: "MDN — <section>", href: `${REF}/Elements/section` },
      { label: "MDN — <search>", href: `${REF}/Elements/search` },
      { label: "MDN — <h1>–<h6>", href: `${REF}/Elements/Heading_Elements` },
      { label: "MDN — <hgroup>", href: `${REF}/Elements/hgroup` },
    ],
  },

  {
    id: "html-tag-block",
    name: "글 덩어리 태그",
    tagline: "줄을 바꿔 쌓이는 덩어리들",
    intro:
      "문단, 목록, 인용, 그림처럼 줄을 바꿔 위에서 아래로 쌓이는 덩어리를 만드는 태그입니다. MDN은 이것들을 '글 내용(text content)' 묶음으로 부릅니다. 대부분은 뜻을 가진 덩어리이고, div만 아무 뜻 없는 상자입니다. 태그마다 뜻, 기본 모양, 파서가 붙이는 규칙을 정리합니다. 그 태그만의 속성은 blockquote의 cite, ol의 세 속성, li의 value뿐입니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "열네 태그 중 목록 태그가 일곱입니다. 나머지는 문단, 상자, 구분선, 미리 짠 글, 인용, 그림입니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<p>", "문단", "없음", "3장 · 제목, 문단, 강조"],
              ["<div>", "뜻 없는 상자", "없음", ""],
              ["<hr>", "주제가 바뀌는 곳", "없음", ""],
              ["<pre>", "적은 그대로 보이는 글", "없음", "1장 · 문법과 파서"],
              ["<blockquote>", "긴 인용", "cite", "5장 · 고급 텍스트"],
              ["<ol>", "순서 있는 목록", "reversed, start, type", "4장 · 목록"],
              ["<ul>", "순서 없는 목록", "없음", "4장 · 목록"],
              ["<menu>", "명령의 목록 (도구 막대)", "없음", ""],
              ["<li>", "목록의 항목", "value", "4장 · 목록"],
              ["<dl>", "용어와 설명의 목록", "없음", "4장 · 목록"],
              ["<dt>", "dl의 용어", "없음", "4장 · 목록"],
              ["<dd>", "dl의 설명", "없음", "4장 · 목록"],
              ["<figure>", "따로 떼어 둘 수 있는 그림, 코드 등", "없음", ""],
              ["<figcaption>", "figure의 설명글", "없음", ""],
            ],
          },
        ],
        terms: [
          {
            term: "블록 상자 (block box)",
            body: "새 줄에서 시작해 부모의 폭을 다 차지하는 상자입니다. 앞뒤 내용은 위아래로 쌓입니다. 벽돌을 한 줄에 하나씩 쌓는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<p>",
        body: "문단입니다. 보통 위아래를 빈 줄만큼 띄워 그립니다. 글만이 아니라 이미지나 폼 칸처럼 서로 이어진 내용을 묶는 데도 씁니다.\n\n끝 태그 </p>는 빼도 됩니다. 파서는 div, ul, h1 같은 블록 태그를 만나면 열린 p를 저절로 닫습니다. 그래서 p 안에 div나 목록을 넣을 수 없습니다. 넣으면 p가 그 앞에서 닫히고, 남은 </p>는 빈 p를 하나 더 만듭니다(1장의 직접 해 보기).\n\n빈 p로 간격을 만들지 않습니다. 낭독기가 내용 없는 문단을 알려 듣는 사람이 헷갈립니다. 간격은 CSS의 margin으로 줍니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align은 쓰지 않습니다(CSS로).",
        terms: [
          {
            term: "암묵적 끝 태그 (implied end tag)",
            body: "적지 않아도 파서가 넣어 주는 끝 태그입니다. 다음 li가 오면 앞 li를, 블록 태그가 오면 앞 p를 닫습니다. 마침표를 빠뜨려도 다음 문장의 첫머리를 보고 앞 문장이 끝난 줄 아는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<div>",
        body: "아무 뜻이 없는 상자입니다. CSS로 꾸미거나 배치할 때, lang 같은 속성을 한 덩어리에 붙일 때 씁니다. 꾸미기 전에는 화면에 아무 영향이 없습니다.\n\n알맞은 뜻의 태그(article, nav, section 등)가 없을 때만 씁니다. 암묵적 역할은 generic입니다. 역할이 아예 없는 것과는 다릅니다. 특정 자식 역할을 기대하는 ARIA 조합에 끼면 문제가 될 수 있습니다. dl 안에서는 dt와 dd의 짝을 묶는 데도 씁니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align은 쓰지 않습니다(CSS로).",
        terms: [
          {
            term: "generic 역할",
            body: "뜻이 없는 상자에 붙는 역할입니다. 낭독기는 이 상자를 따로 알리지 않고 안의 내용만 읽습니다. 이름표 없는 빈 상자와 같습니다.",
          },
        ],
      },
      {
        label: "<hr>",
        body: "주제가 바뀌는 곳을 나타냅니다. 이야기의 장면 전환, 절 안에서 화제가 바뀌는 곳이 그 예입니다. 브라우저는 가로줄로 그리지만, 뜻은 줄이 아니라 '여기서 주제가 바뀐다'입니다. separator 역할이 됩니다.\n\n그냥 선을 긋고 싶으면 CSS의 border를 씁니다. 빈 요소라 끝 태그가 없습니다. select 안에서 option 사이의 구분선으로도 씁니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align, color, noshade, size, width는 쓰지 않습니다(CSS로).",
      },
      {
        label: "<pre>",
        body: "미리 짜 둔 글입니다. 적은 그대로 보여 줍니다. 공백과 줄바꿈이 줄어들지 않고, 보통 고정폭 글꼴로 그립니다. 코드(code), 출력(samp), 입력(kbd)을 담을 때 흔히 씁니다.\n\n예외가 하나 있습니다. <pre> 바로 뒤의 첫 줄바꿈 하나는 파서가 지웁니다. 그래서 여는 태그 뒤에서 줄을 바꿔 적어도 첫 줄이 비지 않습니다.\n\n안의 글도 HTML로 읽습니다. <로 시작하는 태그는 요소가 됩니다. 코드를 글자로 보이려면 &를 &amp;로, <를 &lt;로 바꿔 적습니다. &부터 바꿔야 새로 생긴 &가 다시 바뀌지 않습니다.\n\n글자로 그린 그림은 낭독기가 기호를 하나씩 읽어 버립니다. figure로 감싸고, pre에 role=\"img\"와 aria-label을 붙여 설명을 줍니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 width, wrap은 쓰지 않습니다(CSS로).",
        terms: [
          {
            term: "고정폭 글꼴 (monospace)",
            body: "모든 글자의 폭이 같은 글꼴입니다. 그래서 공백으로 맞춘 줄이 위아래로 가지런합니다. 모눈종이에 한 칸에 한 글자씩 적는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: pre 뒤의 첫 줄바꿈",
        body: "세 pre를 견줍니다.\n(1) #one은 여는 태그 뒤에서 바로 줄을 바꿨습니다. 그 줄바꿈은 파서가 지워서 지금 값이 false입니다.\n(2) #two는 줄을 두 번 바꿨습니다. 첫째만 지워져 하나가 남고, 화면에도 빈 줄이 하나 보입니다.\n(3) #three의 &lt;b&gt;는 글자로, <b>는 요소로 들어갑니다. 지금 값의 요소 목록에 b가 하나 있습니다.",
        lab: {
          html: `<pre id="one">
첫 줄바꿈 하나는 지워집니다</pre>
<pre id="two">

둘이면 하나가 남습니다</pre>
<pre id="three">&lt;b&gt;는 글자, <b>b</b>는 요소</pre>`,
          height: 210,
          checks: [
            { label: "#one이 줄바꿈으로 시작하나", expr: "document.getElementById('one').textContent.startsWith('\\n')" },
            { label: "#two 앞의 줄바꿈 수", expr: "document.getElementById('two').textContent.match(/^\\n*/)[0].length" },
            { label: "#three 안의 요소", expr: "[...document.getElementById('three').children].map((el) => el.localName)" },
          ],
          tryIt: "#one의 여는 태그 뒤 줄바꿈을 지우고 글을 바로 붙여 보세요. 화면은 똑같습니다.",
        },
      },
      {
        label: "<blockquote>",
        body: "다른 곳에서 가져온 긴 인용입니다. 보통 양옆을 들여 그립니다. 들여쓰기 폭은 CSS의 margin으로 바꿉니다. 문장 안의 짧은 인용에는 q를 씁니다.\n\ncite에는 인용한 원문의 주소를 적습니다. 이 주소는 화면에 보이지도 않고 눌러지지도 않습니다. 기계가 읽는 출처입니다.\n\n누가 한 말인지 같은 출처 표시는 blockquote 밖에 둡니다. figure로 감싸고 figcaption에 적는 방법이 흔합니다.",
        tables: [
          {
            caption: "<blockquote>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["cite", "주소", "인용한 원문이나 그 맥락을 설명하는 곳"]],
          },
        ],
        terms: [
          {
            term: "반영 (reflection)",
            body: "HTML 속성과 같은 이름의 DOM 속성이 값을 주고받는 것입니다. 그대로 주기도 하고 바꿔 주기도 합니다. blockquote.cite는 진짜 주소로, li.value는 숫자로 바꿔 돌려줍니다. 원본 서류를 양식에 맞춰 옮겨 적은 사본과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: cite는 보이지 않는 출처",
        body: "인용문을 눌러 보세요. 기록에 아무 줄도 생기지 않습니다. cite의 주소는 링크가 아니기 때문입니다.\n\n지금 값을 견줘 보세요. getAttribute는 적은 글자 그대로입니다. blockquote.cite는 문서 주소를 기준으로 푼 진짜 주소입니다.\n\n사람이 누를 출처는 figcaption의 a로 따로 둡니다. 그 링크를 누르면 target.html이 열리고 from=caption을 보여 줍니다.",
        lab: {
          html: `<figure>
  <blockquote cite="target.html?from=cite">
    <p>짧게 쓴 글이 오래 남습니다.</p>
  </blockquote>
  <figcaption>출처: <a href="target.html?from=caption">글쓴이의 페이지</a></figcaption>
</figure>`,
          height: 170,
          checks: [
            { label: "getAttribute('cite')", expr: "document.querySelector('blockquote').getAttribute('cite')" },
            { label: "blockquote.cite", expr: "document.querySelector('blockquote').cite" },
          ],
          tryIt: "cite의 값을 https://example.com/quote로 바꿔 보세요. 두 지금 값이 같아집니다.",
        },
      },
      {
        label: "<ol>",
        body: "순서가 뜻을 가진 목록입니다. 요리 순서, 길 안내가 그 예입니다. 항목의 순서를 바꿔 뜻이 달라지면 ol, 그대로면 ul입니다. 번호는 글자가 아니라 브라우저가 매깁니다.\n\n자식은 li만 둡니다. 목록을 중첩하려면 바깥 li 안에 새 ol이나 ul을 넣습니다. type은 번호 모양이 뜻을 가질 때만 씁니다. 법률 조항처럼 번호로 가리키는 문서가 그렇습니다. 꾸밈이면 CSS의 list-style-type을 씁니다.\n\n옛 속성 compact는 쓰지 않습니다(CSS로).",
        tables: [
          {
            caption: "<ol>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["start", "정수", "첫 번호. 모양이 a나 i여도 숫자로 적음 (d는 4)"],
              ["reversed", "불 속성", "큰 번호에서 작은 번호로 셈"],
              ["type", "1, a, A, i, I", "번호 모양 (기본 1)"],
            ],
          },
        ],
      },
      {
        label: "<ul>",
        body: "순서에 뜻이 없는 목록입니다. 보통 글머리 기호를 붙여 그립니다. 기호 모양은 HTML이 아니라 CSS의 list-style-type이 정합니다. 따로 정하지 않으면 중첩 깊이에 따라 기호가 바뀝니다.\n\n자식은 li만 둡니다. 들여쓰기를 얻으려고 ul을 쓰지 않습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 compact, type은 쓰지 않습니다(CSS로).",
      },
      {
        label: "<menu>",
        body: "ul과 같은 순서 없는 목록입니다. 표준은 뜻을 하나 더 얹습니다. ul이 보여 줄 항목의 목록이라면, menu는 사용자가 누를 명령의 목록, 곧 도구 막대입니다. 그래서 li 안에 보통 button을 넣습니다.\n\n브라우저와 접근성 트리는 menu를 ul과 똑같이 다룹니다. 역할도 list입니다. 예전 표준의 오른쪽 클릭 메뉴 기능은 표준에서 빠졌습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 compact는 쓰지 않습니다(CSS로).",
        code: '<menu>\n  <li><button type="button">복사</button></li>\n  <li><button type="button">붙여넣기</button></li>\n</menu>',
        codeLang: "html",
      },
      {
        label: "<li>",
        body: "목록의 항목입니다. 부모는 ol, ul, menu 중 하나입니다. ol 안이면 번호가, ul과 menu 안이면 글머리 기호가 붙습니다.\n\n끝 태그 </li>는 빼도 됩니다. 다음 <li>나 부모의 끝 태그가 앞 li를 닫습니다.\n\nvalue는 ol 안에서만 뜻이 있습니다. 그 항목의 번호를 정하고, 뒤 항목은 거기서 이어 셉니다. 번호 모양이 a나 i여도 value는 숫자로 적습니다.\n\n옛 속성 type은 쓰지 않습니다(CSS의 list-style-type으로).",
        tables: [
          {
            caption: "<li>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["value", "정수", "이 항목의 번호. 뒤 항목은 여기서 이어 셈 (ol 안에서만)"]],
          },
        ],
      },
      {
        label: "직접 해 보기: li.value는 적은 값만 읽는다",
        body: "화면의 번호는 1, 10, 11입니다. 둘째 항목이 10이 되고, 셋째는 거기서 이어 셉니다.\n\n그런데 지금 값의 li.value는 0, 10, 0입니다. li.value는 매겨진 번호가 아니라 value 속성을 숫자로 읽은 값입니다. 속성이 없으면 0입니다.\n\n버튼을 누르세요. 첫 li에 value=\"5\" 속성이 생깁니다. 화면의 번호가 5, 10, 11로 바뀌고, 지금 값도 따라 바뀝니다.",
        lab: {
          html: `<ol>
  <li>하나</li>
  <li value="10">value="10"</li>
  <li>다음</li>
</ol>
<button type="button" onclick="document.querySelector('li').value = 5">첫 li의 value를 5로</button>`,
          height: 160,
          checks: [
            { label: "li.value", expr: "[...document.querySelectorAll('li')].map((li) => li.value)" },
            { label: "getAttribute('value')", expr: "[...document.querySelectorAll('li')].map((li) => li.getAttribute('value'))" },
          ],
          tryIt: "ol에 reversed를 붙여 실행해 보세요. 화면의 번호는 거꾸로 매겨지지만 li.value는 그대로입니다.",
        },
      },
      {
        label: "<dl>",
        body: "용어와 설명의 목록입니다. 용어집이나 '이름: 값' 짝으로 된 정보를 적을 때 씁니다. dt(용어)와 dd(설명)의 묶음을 늘어놓습니다.\n\n한 용어에 설명이 여럿이어도, 여러 용어에 설명이 하나여도 됩니다. dt와 dd의 짝을 div로 감쌀 수도 있습니다. 묶음에 속성을 붙이거나 꾸밀 때 편합니다.\n\n들여쓰기를 얻으려고 dl을 쓰지 않습니다. 낭독기마다 dl을 알리는 방식이 다르다는 점도 알아 둡니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 compact는 쓰지 않습니다(CSS로).",
        code: "<dl>\n  <div><dt>이름</dt><dd>등대</dd></div>\n  <div><dt>높이</dt><dd>12m</dd></div>\n</dl>",
        codeLang: "html",
      },
      {
        label: "<dt>",
        body: "dl 안의 용어입니다. 보통 dd가 뒤따릅니다. dt가 여럿 이어지면 바로 다음 dd 하나가 그 용어들을 함께 설명합니다.\n\n끝 태그는 빼도 됩니다. 다음 dt나 dd가 앞 dt를 닫습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<dd>",
        body: "바로 앞 dt의 설명, 정의, 값입니다. 보통 들여 그립니다. dd가 여럿 이어지면 한 용어에 설명이 여럿입니다.\n\n끝 태그는 빼도 됩니다. 다음 dd나 dt가 앞 dd를 닫습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<figure>",
        body: "본문에서 가리키지만 따로 떼어 둘 수 있는 내용입니다. 그림, 도표, 코드 조각, 인용, 시가 그 예입니다. 부록으로 옮겨도 본문 흐름이 깨지지 않는 것이 기준입니다. figure 역할이 됩니다.\n\n설명글은 figcaption으로 붙입니다. figcaption은 figure의 첫 자식이나 마지막 자식으로 둡니다. 그러면 그 글이 figure의 접근 가능한 이름이 됩니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
        code: '<figure>\n  <img src="photo.jpg" alt="바닷가의 등대">\n  <figcaption>그림 1. 섬 끝의 등대</figcaption>\n</figure>',
        codeLang: "html",
      },
      {
        label: "<figcaption>",
        body: "부모 figure의 내용을 설명하는 글입니다. figure의 첫 자식이나 마지막 자식으로만 두고, figure 하나에 하나만 둡니다.\n\n이 글이 figure의 접근 가능한 이름이 됩니다. 그림 아래 '그림 1'처럼 보이는 설명을 여기에 적습니다. 인용의 출처를 적는 자리로도 씁니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "문제가 나는 경우",
        body: "덩어리 태그의 실수는 파서가 고쳐 쓴 DOM이나 지금 값에서 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["p 안에 div나 ul을 넣었다", "p가 그 앞에서 닫히고 빈 p가 하나 더 생긴다", "p를 div로 바꾸거나 p 밖으로 뺀다"],
              ["빈 p로 간격을 만들었다", "낭독기가 빈 문단을 알린다", "CSS의 margin을 쓴다"],
              ["pre 안에 HTML 코드를 그대로 붙였다", "태그가 요소가 되어 글자가 사라진다", "&를 &amp;로, <를 &lt;로 바꾼다"],
              ["선을 그으려고 hr을 썼다", "주제가 바뀌는 곳으로 알려진다", "CSS의 border를 쓴다"],
              ["li.value로 화면의 번호를 읽었다", "value 속성이 없는 항목은 0이 나온다", "번호가 필요하면 순서로 센다"],
              ["blockquote 안에 출처를 적었다", "출처가 인용문의 일부가 된다", "figure로 감싸 figcaption에 적는다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) <pre> 바로 뒤에서 줄을 두 번 바꾸면 textContent는 줄바꿈 몇 개로 시작하나요?\n2) <li value=\"10\"> 다음 항목의 번호는 무엇이고, 그 항목의 li.value는 무엇인가요?\n3) ul과 menu는 뜻이 어떻게 다르고, 브라우저는 둘을 어떻게 다루나요?\n4) blockquote의 cite 주소를 화면에서 누를 수 있나요?",
      },
    ],
    sources: [
      { label: "MDN — <p>", href: `${REF}/Elements/p` },
      { label: "MDN — <pre>", href: `${REF}/Elements/pre` },
      { label: "MDN — <blockquote>", href: `${REF}/Elements/blockquote` },
      { label: "MDN — <li>", href: `${REF}/Elements/li` },
      { label: "MDN — <menu>", href: `${REF}/Elements/menu` },
      { label: "MDN — <figure>", href: `${REF}/Elements/figure` },
    ],
  },
  {
    id: "html-tag-inline",
    name: "링크와 꾸밈 글자 태그",
    tagline: "글줄 안에서 링크를 걸고 글자에 뜻을 입힌다",
    intro:
      "문단 안의 낱말 몇 개에 붙는 태그들입니다. 다른 곳으로 가는 링크(a), 뜻 없는 묶음(span), 줄을 바꾸는 br과 wbr, 그리고 글자를 꾸미는 것처럼 보이는 여덟 태그입니다. 꾸밈 태그는 모양이 아니라 뜻으로 고릅니다. 기본 모양이 같아도 뜻이 다르면 다른 태그를 씁니다. 이 시트는 태그마다 뜻, 쓰는 곳, 속성, 주의할 점을 짧게 모읍니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "문단 안의 낱말에 붙는 태그 12개입니다. 그 태그만의 속성은 a에만 있고, 나머지는 전역 속성만 씁니다. em, strong, i, b의 모양과 뜻은 3장에서 작은 창으로 견줘 봅니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<a>", "링크", "href, target, download, rel, hreflang, ping, referrerpolicy, type, interestfor(실험)", "7장 · 링크"],
              ["<span>", "뜻 없는 글줄 안 묶음", "없음", ""],
              ["<br>", "줄바꿈", "없음", ""],
              ["<wbr>", "줄을 바꿔도 되는 자리", "없음", ""],
              ["<em>", "힘줌", "없음", "3장 · 제목, 문단, 강조"],
              ["<strong>", "중요, 경고, 급함", "없음", "3장 · 제목, 문단, 강조"],
              ["<i>", "결이 다른 글(외국어, 학명, 속생각)", "없음", "3장 · 제목, 문단, 강조"],
              ["<b>", "눈길을 끌 낱말(키워드, 제품명)", "없음", "3장 · 제목, 문단, 강조"],
              ["<u>", "글자 아닌 주석 표시(철자 틀림)", "없음", "3장 · 제목, 문단, 강조"],
              ["<s>", "더는 맞지 않는 내용", "없음", ""],
              ["<small>", "곁말, 작은 글씨(저작권, 약관)", "없음", ""],
              ["<mark>", "지금 하는 일과 관련된 표시", "없음", "3장 · 제목, 문단, 강조"],
            ],
          },
        ],
      },
      {
        label: "<a>",
        body: "다른 주소로 가는 링크입니다. 웹 페이지, 파일, 문서 안의 한 자리, 메일 주소로 갈 수 있습니다. URL로 가리킬 수 있으면 어디든 됩니다. href가 있어야 링크입니다. href가 없는 a는 링크가 놓일 자리표시일 뿐이고, Tab으로 가지 않습니다.\n\n주의할 점은 둘입니다. 링크 글자만 읽어도 어디로 가는지 알게 씁니다. '여기'보다 '제품 소개 보기'가 낫습니다. 그리고 a 안에 다른 a나 button처럼 누르는 요소를 넣지 않습니다. 눌러서 무언가를 실행하는 것은 링크가 아니라 button입니다.\n\nhref의 종류, target, rel, download가 실제로 하는 일은 7장에서 작은 창 열 개로 봅니다. 여기서는 속성만 한 표로 모읍니다. target=\"_blank\"는 rel=\"noopener\"를 붙인 것처럼 동작합니다. hreflang과 type은 힌트일 뿐이고, 브라우저가 따로 하는 일은 없습니다. 옛 속성 name, charset, coords, shape, rev는 쓰지 않습니다(name 대신 id로).",
        tables: [
          {
            caption: "<a>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["href", "URL", "링크가 가리키는 주소. 없으면 링크가 아니다"],
              ["target", "_self(기본), _blank, _parent, _top, 창 이름", "어느 창에서 열지 고른다"],
              ["download", "불 속성 또는 파일 이름", "이동 대신 내려받는다. 같은 출처, blob:, data: 주소에서만"],
              ["rel", "링크 종류 낱말(공백으로 나눔)", "이 문서와 대상의 관계. noopener, noreferrer, nofollow 등"],
              ["hreflang", "언어 태그(lang과 같은 값)", "대상 문서의 언어 힌트. 브라우저가 하는 일은 없다"],
              ["ping", "URL 목록(공백으로 나눔)", "링크를 따라갈 때 이 주소들에 POST(본문 PING)를 보낸다. 주로 추적용"],
              ["referrerpolicy", "no-referrer, origin, same-origin,\nstrict-origin-when-cross-origin(기본) 등", "Referer 헤더에 지금 주소를 얼마나 담을지"],
              ["type", "MIME 타입", "대상의 형식 힌트. 브라우저가 하는 일은 없다"],
              ["interestfor (실험)", "요소의 id", "마우스를 올리거나 포커스하면 그 요소를 보이고 숨긴다"],
            ],
          },
        ],
        terms: [
          {
            term: "리퍼러 (referrer)",
            body: "링크를 따라갈 때 '어느 페이지에서 왔는지' 알려 주는 주소입니다. 요청의 Referer 헤더에 담겨 상대 서버로 갑니다. 편지 봉투의 보내는 사람 칸과 같아서, 얼마나 자세히 적을지를 referrerpolicy로 정합니다.",
          },
        ],
      },
      {
        label: "<span>",
        body: "아무 뜻도 없는 글줄 안 묶음입니다. class나 lang을 붙이거나 CSS로 꾸미려고 낱말 몇 개를 묶습니다. div와 하는 일이 같지만, div는 덩어리(블록)이고 span은 글줄 안(인라인)입니다. MDN은 맞는 뜻의 태그가 없을 때만 span을 쓰라고 적습니다. 힘줌이면 em, 중요함이면 strong을 먼저 찾습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        terms: [
          {
            term: "글줄 안 요소 (inline)",
            body: "문단 안에서 글자처럼 옆으로 이어지는 요소입니다. 새 줄을 시작하지 않고, 앞뒤 글과 한 줄에 섞입니다. 문장의 낱말에 형광펜을 칠해도 문장이 끊기지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<br>",
        body: "글줄 안에서 줄을 바꿉니다. 시나 우편 주소처럼 줄 나눔 자체가 내용인 곳에 씁니다. 문단 사이를 띄우려고 br을 겹쳐 쓰지 않습니다. 문단은 p로 나누고 간격은 CSS margin으로 줍니다. MDN은 br로 흉내 낸 문단이 낭독기 사용자를 헷갈리게 한다고 적습니다. br은 빈 요소라서 닫는 태그가 없습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 clear는 쓰지 않습니다(CSS로).",
      },
      {
        label: "직접 해 보기: br과 소스의 줄바꿈",
        body: "첫 문단은 소스에서 엔터로 줄을 나눴고, 둘째 문단은 br로 나눴습니다. 화면에서는 첫 문단이 한 줄로 이어집니다. HTML이 소스의 줄바꿈을 빈칸 하나로 접기 때문입니다. 둘째 문단만 br 자리에서 줄이 바뀝니다.\n\n지금 값의 innerText는 화면에 그린 대로의 글자입니다. 첫 문단은 빈칸으로, 둘째 문단은 줄바꿈 문자(\\n)로 이어집니다. textContent는 그리기와 상관없이 글자 노드만 모읍니다. br은 글자가 없는 요소라서 textContent에는 줄바꿈이 남지 않습니다. '12'와 '3층'이 붙어 다른 번지처럼 읽힙니다.",
        lab: {
          html: `<p id="src">한빛시 중앙로 12
3층 사무실</p>
<p id="br">한빛시 중앙로 12<br>3층 사무실</p>`,
          height: 150,
          tryIt: "<br> 대신 </br>처럼 닫는 태그만 써 보세요. 파서가 <br>로 고쳐 읽어서 br 개수가 그대로입니다.",
          checks: [
            { label: "엔터 문단의 innerText", expr: "JSON.stringify(document.getElementById('src').innerText)" },
            { label: "br 문단의 innerText", expr: "JSON.stringify(document.getElementById('br').innerText)" },
            { label: "br 문단의 textContent", expr: "JSON.stringify(document.getElementById('br').textContent)" },
            { label: "br 개수", expr: "document.querySelectorAll('br').length" },
          ],
        },
        terms: [
          {
            term: "공백 접기 (whitespace collapsing)",
            body: "HTML은 소스의 줄바꿈과 여러 칸 띄어쓰기를 빈칸 하나로 줄여 그립니다. 그래서 소스를 보기 좋게 들여 써도 화면은 바뀌지 않습니다. 원고를 옮겨 치는 사람이 원고의 줄 끝을 무시하고 이어 치는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<wbr>",
        body: "줄을 바꿔도 되는 자리를 알려 주는 빈 요소입니다. 긴 URL이나 긴 합성어처럼 빈칸 없는 글자는 브라우저가 줄을 바꿀 데가 없습니다. 그러면 좁은 상자 밖으로 삐져나갑니다. wbr을 넣으면 그 자리에서 필요할 때만 줄이 바뀝니다. 자리가 넉넉하면 아무 일도 없습니다.\n\nwbr은 줄이 바뀌어도 하이픈(-)을 붙이지 않습니다. 줄 끝에만 하이픈이 보이길 원하면 &shy;(소프트 하이픈)를 씁니다. MDN은 URL을 나눌 때 점이나 빗금 앞에서 나누라는 글쓰기 지침을 소개합니다. 줄 끝에 남은 문장 부호를 주소의 끝으로 오해하지 않게 하려는 것입니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        terms: [
          {
            term: "줄바꿈 기회 (line break opportunity)",
            body: "글이 상자 끝에 닿았을 때 다음 줄로 넘어가도 되는 자리입니다. 보통은 빈칸과 일부 문장 부호 뒤가 그 자리입니다. 긴 낱말은 이 자리가 없어서 통째로 넘칩니다. 징검다리 돌이 없으면 개울을 건널 수 없는 것과 같고, wbr은 돌을 하나 놓는 일입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: wbr과 좁은 상자",
        body: "두 상자는 너비가 같고 같은 긴 이름이 들어 있습니다. 위 상자는 빈칸이 없어 줄을 바꿀 데가 없습니다. 글자가 테두리 밖으로 삐져나가고, 지금 값의 '넘침'이 true입니다. 아래 상자는 wbr 자리에서 줄이 바뀝니다. 넘치지 않고(false), 줄이 늘어난 만큼 높이가 큽니다. 줄이 바뀐 자리에 하이픈은 없습니다.",
        lab: {
          html: `<style>div { width: 10em; border: 1px solid #999; margin-bottom: 8px; }</style>
<div id="plain">useLocaleCurrencyFormatterWithFallback</div>
<div id="wbr">use<wbr>Locale<wbr>Currency<wbr>Formatter<wbr>With<wbr>Fallback</div>`,
          height: 200,
          tryIt: "width를 30em으로 넓혀 보세요. 자리가 넉넉하면 wbr이 있어도 한 줄입니다. wbr을 &shy;로 바꾸면 줄 끝에만 하이픈이 생깁니다.",
          checks: [
            { label: "wbr 없음: 넘침", expr: "document.getElementById('plain').scrollWidth > document.getElementById('plain').clientWidth" },
            { label: "wbr 있음: 넘침", expr: "document.getElementById('wbr').scrollWidth > document.getElementById('wbr').clientWidth" },
            { label: "wbr 없음: 높이", expr: "document.getElementById('plain').offsetHeight" },
            { label: "wbr 있음: 높이", expr: "document.getElementById('wbr').offsetHeight" },
          ],
        },
      },
      {
        label: "<em>",
        body: "말할 때 힘주는 자리입니다. 힘준 자리가 바뀌면 문장의 뜻이 바뀝니다. em 안에 em을 겹치면 더 세게 힘준다는 뜻입니다. 기본 모양은 기울임이지만, 기울임만 필요하면 CSS font-style을 씁니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<strong>",
        body: "중요하거나 심각하거나 급한 내용입니다. 경고문이나 '주의:' 같은 머리말에 씁니다. 겹쳐 쓰면 더 중요하다는 뜻입니다. em은 문장의 뜻을 바꾸는 힘줌이고, strong은 뜻은 두고 무게를 더합니다. 기본 모양은 굵게이지만, 굵기만 필요하면 CSS font-weight를 씁니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<i>",
        body: "둘레 글과 결이 다른 글입니다. 외국어 낱말, 학명, 기술 용어, 속생각, 배 이름이 여기에 듭니다. 힘줌이나 중요함은 없습니다. 외국어라면 lang을 붙여 그 언어로 읽게 합니다. 작품 제목은 i가 아니라 cite, 용어를 정의하는 자리는 dfn입니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        code: `<p>라틴어 <i lang="la">Veni, vidi, vici</i>는 자주 인용됩니다.</p>`,
        codeLang: "html",
      },
      {
        label: "<b>",
        body: "중요하지는 않지만 눈길을 끌어야 하는 글입니다. 요약의 키워드, 리뷰의 제품 이름, 기사의 첫 문장 같은 것입니다. MDN은 strong, em, mark가 맞지 않을 때만 b를 쓰라고 적습니다. 제목을 b로 꾸미지 말고 h1~h6를 씁니다. class로 쓰임을 적어 두면(b class=\"lead\") 나중에 모양을 바꾸기 쉽습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<u>",
        body: "글자가 아닌 주석이 붙은 글입니다. 철자가 틀린 낱말 표시, 중국어 고유명사 표시가 MDN이 드는 예입니다. 기본 모양이 밑줄이라 링크와 헷갈리기 쉽습니다. 그래서 대개 CSS로 물결 밑줄 같은 다른 모양을 줍니다. 그냥 밑줄만 필요하면 u 대신 CSS text-decoration을 씁니다. 책 제목도 u가 아니라 cite입니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<s>",
        body: "더는 맞지 않거나 쓸모없어진 내용입니다. 품절된 메뉴, 끝난 할인 가격처럼 '이제는 아니다'를 보여 줄 때 씁니다. 기본 모양은 취소선입니다.\n\n문서를 고친 기록이면 s가 아니라 del과 ins를 씁니다. s는 '지금은 틀린 정보'이고, del은 '문서를 고치며 지운 글'입니다. del에는 언제, 왜 지웠는지 datetime과 cite로 적을 수 있지만 s에는 그런 속성이 없습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        code: `<p><s>정가 30,000원</s> 오늘만 24,000원</p>
<p>모임은 <del datetime="2026-11-10">화요일</del> <ins datetime="2026-11-10">목요일</ins>입니다.</p>`,
        codeLang: "html",
      },
      {
        label: "<small>",
        body: "곁말과 작은 글씨입니다. 저작권 표시, 약관, 법적 고지, 단서 조항처럼 본문 옆에 붙는 짧은 말에 씁니다. 기본 모양은 글자 크기를 한 단계 줄입니다. 하지만 small의 뜻은 '작게 그려라'가 아니라 '곁말'입니다. 그냥 작게만 보이게 하려면 CSS font-size를 씁니다. 표준은 여러 문단이나 목록처럼 긴 글을 small로 감싸지 말라고 적습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        terms: [
          {
            term: "곁말 (side comment)",
            body: "본문의 흐름 밖에서 덧붙이는 짧은 말입니다. 저작권 한 줄, '세금 별도' 같은 단서가 그렇습니다. 계약서 맨 아래의 작은 글씨와 같아서, 작아도 내용은 그대로 유효합니다.",
          },
        ],
      },
      {
        label: "<mark>",
        body: "지금 하는 일과 관련 있어서 표시한 글입니다. 검색 결과에서 찾은 낱말을 칠하는 것이 대표적인 쓰임입니다. 인용문 안에서는 원문에 없던 표시, 곧 '내가 그은 형광펜'을 뜻합니다. 기본 모양은 노란 바탕입니다.\n\nmark는 관련성이고 strong은 중요함입니다. 코드의 문법 색칠에는 mark 대신 span과 CSS를 씁니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        terms: [
          {
            term: "관련성 (relevance)",
            body: "글이 지금 사용자가 하는 일과 맞닿아 있다는 뜻입니다. 글 자체가 중요하다는 뜻과는 다릅니다. 책에서 내가 찾던 대목에만 형광펜을 긋는 것과 같아서, 다른 사람이 찾는 것이 바뀌면 칠할 곳도 바뀝니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 검색어를 mark로 칠하기",
        body: "칸의 낱말을 바꿔 쳐 보세요. 스크립트가 문단에서 그 낱말을 찾아 mark로 감쌉니다. 기록에는 칠 때마다 input이 남고, 지금 값의 mark 개수가 찾은 횟수만큼 바뀝니다. 칸을 비우면 mark도 사라집니다. 이 낱말이 중요해서 칠한 것이 아닙니다. 사용자가 지금 찾는 낱말이라서 칠했습니다. 이것이 mark의 뜻입니다.",
        lab: {
          html: `<label>찾을 낱말 <input id="q" value="태그"></label>
<p id="t">링크 태그와 꾸밈 태그는 모두 글줄 안에 들어가는 태그입니다.</p>
<script>
  const q = document.getElementById("q"), t = document.getElementById("t"), text = t.textContent;
  function paint() {
    const parts = q.value ? text.split(q.value) : [text];
    t.replaceChildren(parts[0]);
    for (const part of parts.slice(1)) {
      const m = document.createElement("mark");
      m.textContent = q.value;
      t.append(m, part);
    }
  }
  q.addEventListener("input", paint);
  paint();
</script>`,
          height: 150,
          logInput: true,
          tryIt: "createElement(\"mark\")를 createElement(\"strong\")으로 바꿔 보세요. 노란 바탕 대신 굵은 글자가 되고, 뜻도 '관련'에서 '중요'로 바뀝니다.",
          checks: [
            { label: "mark 개수", expr: "document.querySelectorAll('mark').length" },
            { label: "칠한 낱말", expr: "[...document.querySelectorAll('mark')].map((m) => m.textContent).join(', ')" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이 태그들은 잘못 골라도 화면은 그럴듯합니다. 문제는 낭독기, 검색 엔진, 좁은 화면에서 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["문단 사이를 띄우려고 <br><br>을 겹쳤다", "낭독기에 문단으로 전달되지 않고, 간격을 맞추기 어렵다", "문단은 p로 나누고 간격은 margin으로"],
              ["긴 URL을 좁은 칸에 그대로 넣었다", "글자가 상자 밖으로 삐져나간다", "나눌 자리에 wbr을 넣는다"],
              ["밑줄을 주려고 <u>를 썼다", "링크로 착각해 누르려 한다", "CSS text-decoration을 쓴다"],
              ["문서를 고친 기록을 <s>로 남겼다", "언제, 왜 지웠는지 적을 곳이 없다", "<del>, <ins>에 datetime, cite를 붙인다"],
              ["검색 결과를 <strong>으로 칠했다", "관련이 아니라 중요함으로 전달된다", "<mark>로 바꾼다"],
              ["눌러서 실행할 것을 <a href=\"#\">로 만들었다", "주소가 바뀌고 새 탭 열기, 북마크가 어긋난다", "<button type=\"button\">을 쓴다(7장)"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "(1) href가 없는 a는 링크인가요? Tab으로 갈 수 있나요?\n(2) 소스에서 엔터로 줄을 바꾸면 화면에서도 줄이 바뀌나요? br은요?\n(3) wbr 자리에서 줄이 바뀌면 하이픈이 붙나요? 하이픈이 필요하면 무엇을 쓰나요?\n(4) 품절된 메뉴에는 s와 del 중 무엇을 쓰나요? 문서를 고친 기록에는요?",
      },
    ],
    sources: [
      { label: "MDN — <a>", href: `${REF}/Elements/a` },
      { label: "MDN — <br>", href: `${REF}/Elements/br` },
      { label: "MDN — <wbr>", href: `${REF}/Elements/wbr` },
      { label: "MDN — <s>", href: `${REF}/Elements/s` },
      { label: "MDN — <small>", href: `${REF}/Elements/small` },
      { label: "MDN — <mark>", href: `${REF}/Elements/mark` },
    ],
  },
  {
    id: "html-tag-meaning",
    name: "뜻을 붙이는 글자 태그",
    tagline: "보이는 글자 옆에 기계가 읽는 뜻을 단다",
    intro:
      "약어, 인용, 정의, 코드, 날짜, 글 방향, 읽는 법, 고친 흔적처럼 글자가 무엇인지 알리는 태그들입니다. 화면 모양은 조금 바뀌거나 그대로입니다. 대신 낭독기, 검색 엔진, 스크립트가 그 뜻을 읽습니다. data, time, del, ins는 사람이 읽는 글자 옆에 기계가 읽는 값을 속성으로 듭니다. 5장에서 q, abbr, time의 값을 꺼내 봤다면, 이 시트는 태그 19개를 하나씩 정리합니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "글자가 무엇인지 알리는 태그 19개입니다. 그 태그만의 속성은 q, data, time, bdo, del, ins에만 있습니다. abbr와 dfn은 전역 속성 title에 특별한 뜻을 줍니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<abbr>", "약어", "없음(title에 특별한 뜻)", "5장 · 고급 텍스트"],
              ["<cite>", "작품 제목", "없음", "5장 · 고급 텍스트"],
              ["<q>", "문장 안 짧은 인용", "cite", "5장 · 고급 텍스트"],
              ["<dfn>", "정의되는 용어", "없음(title에 특별한 뜻)", ""],
              ["<code>", "짧은 코드", "없음", "5장 · 고급 텍스트"],
              ["<kbd>", "사용자 입력(키)", "없음", "5장 · 고급 텍스트"],
              ["<samp>", "프로그램 출력", "없음", "5장 · 고급 텍스트"],
              ["<var>", "변수 이름", "없음", "5장 · 고급 텍스트"],
              ["<data>", "기계가 읽는 값", "value", ""],
              ["<time>", "날짜, 시각, 기간", "datetime", "5장 · 고급 텍스트"],
              ["<sub>", "아래 첨자", "없음", "5장 · 고급 텍스트"],
              ["<sup>", "위 첨자", "없음", "5장 · 고급 텍스트"],
              ["<bdi>", "글 방향 떼어 놓기", "없음", "15장 · 전역 속성"],
              ["<bdo>", "글 방향 강제", "dir", "15장 · 전역 속성"],
              ["<ruby>", "루비 주석 묶음", "없음", ""],
              ["<rt>", "루비 글자(읽는 법)", "없음", ""],
              ["<rp>", "루비를 못 그릴 때의 괄호", "없음", ""],
              ["<del>", "지운 글", "cite, datetime", ""],
              ["<ins>", "더한 글", "cite, datetime", ""],
            ],
          },
        ],
      },
      {
        label: "<abbr>",
        body: "약어나 머리글자입니다. 처음 나올 때 본문에 풀어 쓰고, 약어를 abbr로 감쌉니다. 본문에 풀어 쓸 수 없을 때만 title에 풀어 쓴 말을 넣습니다. abbr에서 title은 특별한 뜻이 있어서, 풀어 쓴 말만 넣어야 합니다. 같은 약어가 여러 번 나와도 title은 abbr마다 따로 붙습니다. 기본 모양은 브라우저마다 다릅니다(점선 밑줄 등). 이 태그만의 속성은 없고 전역 속성만 씁니다. title 풍선 도움말은 5장의 작은 창에서 봅니다.",
      },
      {
        label: "<cite>",
        body: "창작물의 제목입니다. 책, 논문, 노래, 영화, 게임, 웹 페이지, 게시글의 이름을 감쌉니다. 사람 이름은 작품 제목이 아니라서 cite로 감싸지 않습니다. 기본 모양은 기울임입니다. 인용한 글의 출처 주소는 cite 요소가 아니라 blockquote나 q의 cite 속성에 적습니다. 이름이 같아 헷갈리기 쉽습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<q>",
        body: "문장 안에 들어가는 짧은 인용입니다. 문단을 나눠야 하는 긴 인용은 blockquote를 씁니다. 브라우저가 언어에 맞는 따옴표를 앞뒤에 그려 주므로 따옴표를 글자로 또 적지 않습니다. cite 속성에는 출처 주소를 적습니다. 화면에는 나오지 않고, 스크립트에서 q.cite로 읽으면 절대 주소로 풀려 나옵니다. 언어별 따옴표는 5장의 작은 창에서 봅니다.",
        tables: [
          {
            caption: "<q>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["cite", "URL", "인용한 글의 출처 주소. 화면에는 나오지 않는다"]],
          },
        ],
      },
      {
        label: "<dfn>",
        body: "정의하는 문장 안에서, 지금 정의되는 용어를 표시합니다. 그 용어의 뜻은 dfn을 품은 문단, dt와 dd의 짝, 또는 가장 가까운 구획(section 등)에 있어야 합니다. 용어가 정의되는 한 자리에만 씁니다. 뒤에서 그 용어를 다시 쓰는 곳은 dfn이 아닙니다.\n\n정의되는 용어는 이 차례로 정합니다.\n(1) dfn에 title이 있으면 그 값\n(2) dfn 안에 title 있는 abbr 하나만 있으면 그 title\n(3) 둘 다 아니면 dfn의 글자\n\ndfn에 id를 주면 뒤에 나오는 용어를 a href=\"#id\"로 정의에 이어 줄 수 있습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다(title은 위의 특별한 뜻).",
        code: `<p><dfn id="def-validator">검사기</dfn>는 코드의 문법 오류를 찾는 프로그램입니다.</p>
<p>올리기 전에 <a href="#def-validator">검사기</a>를 돌립니다.</p>`,
        codeLang: "html",
        terms: [
          {
            term: "정의하는 자리 (defining instance)",
            body: "용어의 뜻을 밝히는 바로 그 자리입니다. 다른 곳에서 그 낱말을 쓰는 것은 정의가 아니라 사용입니다. 사전에서 표제어가 굵게 적힌 자리가 정의이고, 다른 항목의 풀이에 그 낱말이 나오는 것은 사용과 같습니다.",
          },
        ],
      },
      {
        label: "<code>",
        body: "짧은 컴퓨터 코드 조각입니다. 함수 이름, 파일 이름, 한 줄짜리 명령을 감쌉니다. 기본 모양은 고정폭 글꼴입니다. code 혼자서는 한 구절이나 한 줄을 뜻합니다. 여러 줄 코드는 pre로 code를 감싸야 줄바꿈과 공백이 지켜집니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<kbd>",
        body: "사용자가 넣는 입력입니다. 대개 키보드 키입니다. 기본 모양은 고정폭 글꼴입니다. 겹쳐 쓰는 방법에 따라 뜻이 조금씩 다릅니다.\n(1) kbd 안의 kbd: 단축키처럼 여러 키로 된 입력의 한 키\n(2) samp 안의 kbd: 시스템이 되받아 보여 준 입력\n(3) kbd 안의 samp: 화면의 메뉴나 버튼 이름을 고르는 입력\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
        code: `<p><kbd><kbd>Ctrl</kbd>+<kbd>S</kbd></kbd>로 저장합니다.</p>
<p><kbd><samp>파일</samp></kbd> 메뉴를 고릅니다.</p>
<p>터미널에 <samp>Saved.</samp>가 찍힙니다.</p>`,
        codeLang: "html",
      },
      {
        label: "<samp>",
        body: "프로그램이 내놓은 출력입니다. 오류 메시지나 터미널에 찍힌 결과를 옮겨 적을 때 씁니다. 기본 모양은 고정폭 글꼴입니다. 지금 페이지의 스크립트가 계산해 보여 주는 결과 자리는 samp가 아니라 output 요소입니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<var>",
        body: "수식이나 프로그램의 변수 이름입니다. 'x = y + 2'의 x와 y 같은 자리입니다. 기본 모양은 대개 기울임입니다. 기울임만 필요해서 var를 쓰지 않습니다. 그때는 span과 CSS, 또는 뜻이 맞는 em이나 i를 씁니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<data>",
        body: "글자에 기계가 읽는 값을 붙입니다. 화면에는 '검정 티셔츠'처럼 사람이 읽는 이름을 적고, value에는 상품 번호처럼 프로그램이 쓸 값을 적습니다. 스크립트는 data.value로 이 값을 읽습니다. 날짜나 시간이면 data가 아니라 time을 써야 합니다.",
        tables: [
          {
            caption: "<data>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["value", "글자(꼭 적는다)", "내용을 기계가 읽는 값으로 옮긴 것"]],
          },
        ],
        terms: [
          {
            term: "기계가 읽는 값 (machine-readable)",
            body: "프로그램이 정해진 형식대로 읽어 쓸 수 있는 값입니다. '다음 주 금요일'은 사람만 알지만 '2026-11-20'은 프로그램도 압니다. 상품의 이름표와 바코드처럼, 같은 물건에 사람용과 기계용 표시가 함께 붙는 셈입니다.",
          },
        ],
      },
      {
        label: "<time>",
        body: "날짜, 시각, 기간을 나타냅니다. 화면 글자는 '다음 주 금요일'처럼 사람에게 맞게 쓰고, datetime에 기계가 읽는 정확한 값을 적습니다. 그러면 브라우저나 다른 프로그램이 달력에 넣기 같은 일에 그 값을 씁니다.\n\ndatetime이 없으면 time의 글자 자체가 기계용 값입니다. 이때는 time 안에 다른 요소를 넣으면 안 되고, 글자가 아래 형식에 맞아야 합니다. data와 time은 모양이 닮았고, 값의 종류가 다릅니다. data의 value는 형식이 정해지지 않은 아무 값입니다. time의 datetime은 정해진 날짜 형식만 받습니다.",
        tables: [
          {
            caption: "<time>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["datetime", "날짜 형식 문자열(아래 표)", "기계가 읽는 날짜, 시각, 기간"]],
          },
          {
            caption: "datetime에 쓰는 형식",
            head: ["종류", "모양", "예"],
            rows: [
              ["연월", "YYYY-MM", "2026-11"],
              ["날짜", "YYYY-MM-DD", "2026-11-17"],
              ["연도 없는 날짜", "MM-DD", "11-17"],
              ["시각", "HH:MM, HH:MM:SS", "20:00"],
              ["날짜와 시각", "YYYY-MM-DDTHH:MM\n(T 대신 빈칸도 됨)", "2026-11-17T20:00"],
              ["시간대까지", "날짜와 시각 뒤에 Z 또는 +HH:MM", "2026-11-17T20:00+09:00"],
              ["주", "YYYY-Www", "2026-W47"],
              ["연도", "숫자 4자리 이상", "2026"],
              ["기간", "PnDTnHnMnS, 또는 1h 30m 꼴", "PT2H30M"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: data와 time의 기계용 값",
        body: "지금 값을 보면 data.value와 time.dateTime이 속성에 적은 값을 그대로 돌려줍니다. 화면 글자와는 상관없습니다. 기간도 'PT2H30M' 그대로입니다.\n\n셋째 time에는 datetime이 없습니다. 표준에서는 이때 글자 '2026-11-30'이 기계용 값입니다. 하지만 DOM 프로퍼티 dateTime은 HTML 속성 datetime만 비추므로 빈 문자열(\"\")을 돌려줍니다. 스크립트로 날짜를 모을 때는 글자까지 함께 봐야 합니다. 그 값으로 Date와 Intl을 만드는 것은 5장에서 봅니다.",
        lab: {
          html: `<p>새 상품: <data value="SKU-1042">검정 티셔츠</data></p>
<p>공연은 <time datetime="2026-11-20T19:00+09:00">다음 주 금요일 저녁</time>에
  <time datetime="PT2H30M">두 시간 반</time> 동안 합니다.</p>
<p>신청 마감: <time>2026-11-30</time></p>`,
          height: 170,
          tryIt: "data의 value를 지우면 data.value가 빈 문자열이 됩니다. 셋째 time에 datetime=\"2026-12-01\"을 붙여 글자와 값이 갈라지는 것을 보세요.",
          checks: [
            { label: "data.value", expr: "document.querySelector('data').value" },
            { label: "첫 time의 dateTime", expr: "document.querySelectorAll('time')[0].dateTime" },
            { label: "기간 time의 dateTime", expr: "document.querySelectorAll('time')[1].dateTime" },
            { label: "datetime 없는 time의 dateTime", expr: "JSON.stringify(document.querySelectorAll('time')[2].dateTime)" },
            { label: "그 time의 글자", expr: "document.querySelectorAll('time')[2].textContent" },
          ],
        },
        terms: [
          {
            term: "반영 (reflect)",
            body: "HTML 속성과 같은 이름의 DOM 프로퍼티가 서로 이어져 있는 것입니다. 속성을 바꾸면 프로퍼티가, 프로퍼티를 바꾸면 속성이 바뀝니다. 거울처럼 서로를 비추지만, 거울 밖에 있는 것(여기서는 글자 내용)은 비추지 않습니다.",
          },
        ],
      },
      {
        label: "<sub>",
        body: "아래 첨자입니다. 화학식 H2O의 2, 수학의 변수 첨자처럼 글쓰기 관례상 아래로 내려 쓰는 글자에 씁니다. 기본 모양은 기준선을 내리고 글자를 작게 합니다. 회사 로고처럼 모양 때문에 내리는 것은 sub가 아니라 CSS vertical-align으로 합니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<sup>",
        body: "위 첨자입니다. 거듭제곱의 지수, 영어 서수(4th의 th), 프랑스어 약어(Mlle)처럼 관례상 위로 올려 쓰는 글자에 씁니다. 기본 모양은 기준선을 올리고 글자를 작게 합니다. 모양만 올리려면 CSS vertical-align: super를 씁니다. 복잡한 수식은 MathML을 생각해 봅니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<bdi>",
        body: "안의 글자를 둘레와 떼어 놓고 방향을 따로 정합니다. 사용자 이름처럼 방향을 미리 모르는 값을 문장에 끼울 때 씁니다. 격리하지 않으면, 아랍어 이름 뒤의 숫자와 기호가 이름 쪽으로 끌려가 순서가 뒤섞입니다. dir을 적지 않아도 bdi는 dir=\"auto\"처럼 안의 글자를 보고 방향을 정합니다.\n\n방향을 미리 알면 span dir=\"rtl\"로도 됩니다. 뜻이 맞는 요소가 따로 있으면 그 요소에 dir=\"auto\"를 붙이는 쪽을 권합니다(cite dir=\"auto\"). 이 태그만의 속성은 없고 전역 속성만 씁니다. dir과 bdi의 기본 예는 15장에서 봅니다.",
        terms: [
          {
            term: "양방향 글 (bidirectional text)",
            body: "왼쪽에서 오른쪽으로 쓰는 글과 오른쪽에서 왼쪽으로 쓰는 글이 한 줄에 섞인 것입니다. 브라우저는 유니코드 양방향 알고리즘으로 글자마다 방향을 정합니다. 숫자와 기호는 제 방향이 약해서 옆 글자를 따라갑니다. 줄 선 사람 사이에 낀 아이가 옆 어른을 따라 도는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<bdo>",
        body: "글 방향을 강제로 바꿉니다. 유니코드 규칙이 글자마다 정하는 방향을 무시하고, dir에 적은 방향대로 글자를 늘어놓습니다. 그래서 bdo dir=\"rtl\" 안의 영어나 한글은 글자 순서가 거꾸로 보입니다. 글자 하나하나의 모양이 뒤집히지는 않습니다. 컴퓨터에 저장된 순서를 그대로 보여 줄 때처럼 드물게 씁니다.",
        tables: [
          {
            caption: "<bdo>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["dir", "ltr, rtl(꼭 적는다. auto는 안 됨)", "안의 글자를 이 방향으로 늘어놓는다"]],
          },
        ],
        terms: [
          {
            term: "격리와 강제 (isolate, override)",
            body: "격리는 안쪽 글과 바깥 글의 방향이 서로 영향을 주지 않게 떼어 놓는 것입니다. 강제는 글자마다 정해진 방향을 무시하고 한 방향으로 줄 세우는 것입니다. 격리는 칸막이를 치는 일이고, 강제는 모두 한쪽만 보고 서라고 시키는 일입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: bdi는 떼고 bdo는 뒤집는다",
        body: "첫 줄은 아랍어 이름을 span으로, 둘째 줄은 bdi로 감쌌습니다. 첫 줄은 '- 1'이 이름 쪽으로 끌려가 순서가 뒤섞입니다. 둘째 줄은 이름 뒤에 '- 1위'가 그대로 옵니다. 지금 값에서 bdi의 unicode-bidi는 isolate(떼어 놓기)입니다. bdi의 direction은 표준에 따라 안의 아랍어를 보고 고른 rtl이고, span은 둘레의 ltr을 물려받습니다.\n\nbdo는 다릅니다. unicode-bidi가 override(강제)가 들어간 값이라서, 안의 라틴 글자와 숫자도 dir 방향대로 늘어섭니다. 'abc 123'이 오른쪽부터 놓여 '321 cba'로 보입니다.",
        lab: {
          html: `<ul>
  <li><span>سما</span> - 1위</li>
  <li><bdi>سما</bdi> - 1위</li>
</ul>
<p>bdo: <bdo dir="rtl">abc 123</bdo></p>`,
          height: 170,
          tryIt: "bdo의 dir을 ltr로 바꾸거나, span에 dir=\"auto\"를 붙여 bdi와 견줘 보세요.",
          checks: [
            { label: "span의 direction", expr: "getComputedStyle(document.querySelector('span')).direction" },
            { label: "bdi의 direction", expr: "getComputedStyle(document.querySelector('bdi')).direction" },
            { label: "bdi의 unicode-bidi", expr: "getComputedStyle(document.querySelector('bdi')).unicodeBidi" },
            { label: "bdo의 direction", expr: "getComputedStyle(document.querySelector('bdo')).direction" },
            { label: "bdo의 unicode-bidi", expr: "getComputedStyle(document.querySelector('bdo')).unicodeBidi" },
          ],
        },
      },
      {
        label: "<ruby>",
        body: "글자 위나 옆에 작은 글씨로 읽는 법을 다는 묶음입니다. 한자에 독음을 달거나 일본어 후리가나를 달 때 씁니다. 구조는 이렇습니다. ruby 안에 바탕 글자를 쓰고, 바로 뒤 rt에 그 글자의 주석을 씁니다. 바탕 글자와 rt의 짝을 여러 번 이어 쓸 수 있습니다. rp는 rt 앞뒤에 두는 대비용 괄호입니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        code: `<ruby>
  漢<rp>(</rp><rt>한</rt><rp>)</rp>
  字<rp>(</rp><rt>자</rt><rp>)</rp>
</ruby>`,
        codeLang: "html",
        terms: [
          {
            term: "루비 주석 (ruby annotation)",
            body: "바탕 글자 위나 옆에 작게 다는 주석입니다. 읽는 법을 가장 많이 답니다. 이름은 옛 인쇄소에서 쓰던 아주 작은 활자 크기에서 왔습니다. 어린이 책에서 어려운 한자 위에 작은 한글 독음을 다는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<rt>",
        body: "루비의 주석 글자입니다. 읽는 법, 번역, 음역을 적습니다. 꼭 ruby 안에 있어야 합니다. 가로쓰기에서는 기본으로 바탕 글자 위에 작게 놓입니다. 바로 뒤에 rt나 rp가 오거나 ruby가 끝나면 닫는 태그를 생략할 수 있습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<rp>",
        body: "루비를 그리지 못하는 브라우저를 위한 괄호입니다. 여는 괄호와 닫는 괄호를 rp 하나씩에 담아 rt 바로 앞뒤에 둡니다. 루비를 그리는 브라우저는 rp를 숨깁니다. 그리지 못하는 곳에서는 '漢(한)字(자)'처럼 괄호 안에 주석이 나와 뜻이 통합니다. rp가 없으면 '漢한字자'처럼 붙어 버립니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "직접 해 보기: ruby, rt, rp",
        body: "한자 위에 작은 한글 독음이 보이고, 괄호는 보이지 않습니다. 지금 값에서 rp의 display가 none입니다. 루비를 그리는 브라우저는 rp를 숨기기 때문입니다. 그래도 rp는 DOM에 그대로 있습니다. textContent에는 괄호가 들어 있고, 화면에 그린 글자만 모으는 innerText에는 괄호가 빠집니다. labDom()에서 ruby 안의 짜임을 봅니다.",
        lab: {
          html: `<p style="font-size: 1.8em">
  <ruby>漢<rp>(</rp><rt>한</rt><rp>)</rp>字<rp>(</rp><rt>자</rt><rp>)</rp></ruby>
</p>`,
          height: 150,
          tryIt: "<style>ruby, rt, rp { display: inline }</style>를 더해 루비를 못 그리는 브라우저처럼 만들어 보세요. 닫는 태그를 빼고 <ruby>漢<rp>(<rt>한<rp>)</ruby>로 써 보세요. labDom()을 보면 파서가 rp와 rt를 알아서 닫습니다.",
          checks: [
            { label: "rp의 display", expr: "getComputedStyle(document.querySelector('rp')).display" },
            { label: "ruby의 textContent", expr: "JSON.stringify(document.querySelector('ruby').textContent)" },
            { label: "ruby의 innerText", expr: "JSON.stringify(document.querySelector('ruby').innerText)" },
            { label: "labDom()", expr: "labDom()" },
          ],
        },
      },
      {
        label: "<del>",
        body: "문서에서 지운 글입니다. 고친 내용 추적이나 코드 차이(diff)를 보여 줄 때 씁니다. 기본 모양은 대개 취소선입니다. cite에는 바꾼 까닭을 적은 문서 주소(회의록 등)를, datetime에는 바꾼 때를 적습니다. 둘 다 화면에는 나오지 않습니다. 글줄 안의 낱말에도, 문단 전체를 감싸는 데도 쓸 수 있습니다.\n\ns와 헷갈리기 쉽습니다. s는 '이제는 맞지 않는 정보'이고, del은 '문서를 고치며 지운 글'입니다.",
        tables: [
          {
            caption: "<del>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["cite", "URL", "바꾼 까닭을 설명하는 문서의 주소"],
              ["datetime", "날짜, 또는 날짜와 시각", "지운 때. 형식이 틀리면 시각 정보가 없는 것으로 본다"],
            ],
          },
        ],
      },
      {
        label: "<ins>",
        body: "문서에 더한 글입니다. del과 짝을 이뤄 '이것을 지우고 이렇게 고쳤다'를 보여 줍니다. 기본 모양은 대개 밑줄입니다. cite와 datetime은 del과 같은 뜻입니다. del처럼 글줄 안에도, 문단 전체를 감싸는 데도 쓸 수 있습니다.",
        tables: [
          {
            caption: "<ins>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["cite", "URL", "바꾼 까닭을 설명하는 문서의 주소"],
              ["datetime", "날짜, 또는 날짜와 시각", "더한 때. 형식이 틀리면 시각 정보가 없는 것으로 본다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: del과 ins의 기록",
        body: "화면에서 del은 취소선, ins는 밑줄로 보입니다. cite와 datetime은 보이지 않지만 스크립트로 읽을 수 있습니다. 지금 값의 del.cite는 적은 'notes.html'이 아니라, 작은 창 주소를 기준으로 푼 절대 주소입니다. del.dateTime은 적은 값 그대로입니다. del과 ins의 DOM 종류는 고친 기록용 HTMLModElement입니다. s는 뜻만 있는 보통 HTMLElement라서 cite도 dateTime도 없습니다.",
        lab: {
          html: `<p>모임은 <del cite="notes.html" datetime="2026-11-10">화요일</del>
  <ins cite="notes.html" datetime="2026-11-10T09:00Z">목요일</ins>에 합니다.</p>
<p>오늘의 메뉴: <s>비빔밥</s> 품절</p>`,
          height: 140,
          tryIt: "del의 cite를 https://example.com/minutes로 바꾸면 del.cite도 그 주소가 됩니다. datetime을 지우면 del.dateTime이 빈 문자열이 됩니다.",
          checks: [
            { label: "del.cite", expr: "document.querySelector('del').cite" },
            { label: "del.dateTime", expr: "document.querySelector('del').dateTime" },
            { label: "del의 DOM 종류", expr: "document.querySelector('del').constructor.name" },
            { label: "s의 DOM 종류", expr: "document.querySelector('s').constructor.name" },
            { label: "s에 cite가 있나", expr: "'cite' in document.querySelector('s')" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이 태그들의 실수는 화면에서 잘 보이지 않습니다. 기계가 값을 읽거나, 다른 언어의 글이 섞일 때 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["날짜를 <data value>로 감쌌다", "날짜로 읽히지 않는다", "날짜, 시각, 기간은 <time datetime>"],
              ["datetime 없는 <time> 안에 <b>를 넣었다", "글자를 기계용 값으로 쓸 수 없다", "datetime을 붙이거나 안의 요소를 뺀다"],
              ["사용자 이름을 그냥 문장에 끼웠다", "아랍어, 히브리어 이름 뒤의 숫자와 기호 순서가 뒤섞인다", "이름을 <bdi>로 감싼다"],
              ["방향을 맞추려고 <bdo>를 썼다", "안의 글자 순서가 통째로 거꾸로 된다", "떼어 놓는 것이 목적이면 bdi나 dir=\"auto\""],
              ["rt만 쓰고 rp를 뺐다", "루비를 못 그리는 곳에서 '漢한字자'처럼 붙어 나온다", "rt 앞뒤에 <rp>(</rp>와 <rp>)</rp>"],
              ["용어가 나올 때마다 <dfn>을 붙였다", "어디가 정의인지 알 수 없다", "정의하는 한 자리에만 dfn, 나머지는 a로 이어 준다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "(1) data의 value와 time의 datetime은 받는 값이 어떻게 다른가요?\n(2) datetime이 없는 time에서 time.dateTime은 무엇을 돌려주나요?\n(3) bdi와 bdo 중 하나는 떼어 놓고 하나는 강제합니다. 어느 쪽이 어느 쪽인가요?\n(4) 루비를 그리는 브라우저에서 rp는 왜 보이지 않나요? 그럼 rp는 왜 쓰나요?",
      },
    ],
    sources: [
      { label: "MDN — <dfn>", href: `${REF}/Elements/dfn` },
      { label: "MDN — <data>", href: `${REF}/Elements/data` },
      { label: "MDN — <time>", href: `${REF}/Elements/time` },
      { label: "MDN — <bdo>", href: `${REF}/Elements/bdo` },
      { label: "MDN — <ruby>", href: `${REF}/Elements/ruby` },
      { label: "MDN — <del>", href: `${REF}/Elements/del` },
    ],
  },
  {
    id: "html-tag-media",
    name: "이미지와 미디어 태그",
    tagline: "그림, 소리, 영상을 문서에 들이는 태그들",
    intro:
      "그림과 영상 파일은 HTML 문서 밖에 있습니다. 이 시트의 태그들은 그 파일을 문서의 한 자리로 들여옵니다. 태그마다 받는 속성을 표로 모았고, 같은 source가 부모에 따라 다른 속성을 쓰는 까닭도 정리했습니다. 파일을 고르고 받는 동작과 그 실험은 8장(이미지)과 9장(비디오와 오디오)에 있습니다. 여기서는 그 장에 없는 이미지 맵(map, area)과 track의 kind를 직접 해 봅니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "이미지와 미디어에 쓰는 태그 여덟 개입니다. 속성이 많은 img, audio, video도 아래 블록에 빠짐없이 적었습니다. class, id, title 같은 전역 속성은 15장을 봅니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<img>", "그림 하나", "alt, src, srcset, sizes, width, height, loading, decoding, fetchpriority, crossorigin, referrerpolicy, usemap, ismap, elementtiming", "8장 · 이미지"],
              ["<picture>", "그림 후보들의 묶음", "없음 (전역 속성만)", "8장 · 이미지"],
              ["<source>", "picture, audio, video의 후보 하나", "type, src, srcset, sizes, media, width, height", "8장 · 이미지\n9장 · 비디오와 오디오"],
              ["<audio>", "소리", "src, controls, autoplay, muted, loop, preload, crossorigin, controlslist, disableremoteplayback, loading(실험)", "9장 · 비디오와 오디오"],
              ["<video>", "영상", "audio의 속성 모두와 poster, width, height, playsinline, disablepictureinpicture", "9장 · 비디오와 오디오"],
              ["<track>", "시간에 맞춰 나오는 글자(자막 등)", "kind, src, srclang, label, default", "9장 · 비디오와 오디오"],
              ["<map>", "그림의 누르는 영역 묶음", "name", ""],
              ["<area>", "그림 안의 누르는 영역 하나", "shape, coords, href, alt, target, download, rel, ping, referrerpolicy, interestfor(실험)", ""],
            ],
          },
        ],
      },
      {
        label: "<img>",
        body: "문서에 그림 하나를 넣습니다. 빈 요소라 닫는 태그가 없습니다. MDN은 적어도 src와 alt 둘을 쓰라고 적습니다. src 대신 srcset만 있어도 됩니다. alt는 그림을 못 받거나 못 보는 사람에게 대신 전할 글자입니다. 꾸밈 그림이면 alt=\"\"로 비워 낭독기가 건너뛰게 합니다. title은 alt를 대신하지 못합니다. 기본 display는 inline이고, 크기는 그림의 본래 크기를 따릅니다. 후보 고르기, 늦게 받기, 자리 잡기는 8장에서 직접 해 봅니다.\n\n옛 속성 align, border, hspace, vspace는 쓰지 않습니다(CSS로). name은 id로, longdesc는 aria-describedby로 바꿉니다.",
        tables: [
          {
            caption: "<img>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["alt", "글자, 빈 값", "그림 대신 읽고 보여 줄 글자. 꾸밈 그림은 빈 값"],
              ["src", "URL", "기본 그림 파일. src와 srcset 중 하나는 꼭 있어야 합니다"],
              ["srcset", "URL과 폭(400w) 또는 밀도(2x)의 목록", "후보 파일들. 브라우저가 하나를 고릅니다"],
              ["sizes", "미디어 조건과 길이의 목록, auto", "그림이 화면에서 차지할 폭. srcset이 w 후보일 때 씁니다"],
              ["width, height", "단위 없는 정수(픽셀)", "본래 크기. 받기 전부터 그 비율로 자리를 잡습니다"],
              ["loading", "eager(기본), lazy", "lazy면 화면 가까이 와야 받습니다"],
              ["decoding", "sync, async, auto(기본)", "그림 풀기를 다른 내용과 함께 그릴지에 대한 힌트"],
              ["fetchpriority", "high, low, auto(기본)", "다른 그림보다 먼저, 또는 나중에 받으라는 힌트"],
              ["crossorigin", "anonymous, use-credentials", "CORS로 받습니다. canvas에서 그림 픽셀을 읽으려면 필요합니다"],
              ["referrerpolicy", "no-referrer, origin 등", "그림을 받을 때 Referer 헤더를 얼마나 보낼지"],
              ["usemap", "#map의 이름", "이 그림에 붙일 map. a, button 안의 img에는 못 씁니다"],
              ["ismap", "불 속성", "누른 좌표를 서버로 보내는 서버 쪽 이미지 맵. a 안에서만 씁니다"],
              ["elementtiming", "식별 이름", "PerformanceElementTiming으로 이 그림이 그려진 때를 잽니다"],
            ],
          },
        ],
        terms: [
          {
            term: "CORS 요청",
            body: "다른 출처의 파일을 받을 때 서버에게 '이 사이트가 내용을 읽어도 되나'를 묻는 방식입니다. 서버가 허락하는 헤더를 돌려주면 스크립트가 그 내용을 읽을 수 있습니다. 남의 물건을 빌릴 때 주인의 허락 쪽지를 받아 두는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<picture>",
        body: "여러 source 후보와 img 하나를 묶습니다. 브라우저는 source를 위에서부터 보고 맞는 첫 후보를 고릅니다. 맞는 것이 없으면 img의 src를 씁니다. 고른 그림은 img 자리에 나옵니다. picture는 상자일 뿐이라 크기, alt, object-fit 같은 스타일은 img에 줍니다. 쓰는 때는 대개 둘입니다.\n(1) 화면에 따라 다르게 자른 그림을 줄 때(아트 디렉션)\n(2) AVIF처럼 새 형식을 먼저 주고, 못 읽으면 옛 형식을 줄 때\n밀도만 다른 그림(1x, 2x)은 picture 없이 img의 srcset으로 충분합니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
        terms: [
          {
            term: "대체 내용 (fallback)",
            body: "앞의 방법이 안 될 때 대신 쓰는 내용입니다. picture에서는 안의 img가, audio와 video에서는 그 요소를 모르는 브라우저에게 보일 안쪽 글이 그 노릇을 합니다. 평소에는 닫혀 있다가 막혔을 때 여는 비상구와 같습니다.",
          },
        ],
      },
      {
        label: "<source>",
        body: "picture, audio, video 안에서 후보 파일 하나를 적는 빈 요소입니다. 닫는 태그 </source>는 쓰지 않습니다. 브라우저는 source를 위에서부터 보고 쓸 수 있는 첫 후보를 고릅니다. type이 있으면 받기 전에 그 형식을 읽을 수 있는지 봅니다. 모르는 형식이면 받지 않고 다음 후보로 넘어갑니다.\n\n부모에 따라 쓰는 속성이 다릅니다. 그림은 크기와 밀도별 후보가 여럿이라 srcset을 씁니다. 미디어는 후보 하나가 파일 하나라 src를 씁니다. picture 안에서 후보가 모두 맞지 않으면 img의 src를 씁니다.",
        tables: [
          {
            caption: "<source>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["type", "MIME 타입(codecs를 덧붙일 수 있음)", "형식을 미리 알려, 못 읽는 후보를 받지 않고 건너뛰게 합니다"],
              ["src", "URL", "미디어 파일. audio, video 안에서 꼭 있어야 합니다"],
              ["srcset", "URL과 w 또는 x의 목록", "그림 후보들. picture 안에서 꼭 있어야 합니다"],
              ["sizes", "미디어 조건과 길이의 목록", "그림이 차지할 폭. srcset이 w 후보일 때만 씁니다"],
              ["media", "미디어 쿼리", "그 조건에 맞을 때만 이 후보를 씁니다"],
              ["width, height", "단위 없는 정수(픽셀)", "이 후보 그림의 본래 크기"],
            ],
          },
          {
            caption: "부모에 따라 다른 source",
            head: ["속성", "picture 안", "audio, video 안"],
            rows: [
              ["src", "못 씀", "꼭 필요"],
              ["srcset", "꼭 필요", "못 씀"],
              ["sizes, width, height", "씀", "못 씀"],
              ["type, media", "씀", "씀"],
            ],
          },
        ],
        code: '<picture>\n  <source srcset="photo.avif" type="image/avif">\n  <source srcset="photo-800.svg" media="(width >= 600px)">\n  <img src="photo.jpg" alt="바다 사진" width="400" height="300">\n</picture>\n\n<video controls>\n  <source src="clip.webm" type="video/webm">\n  <source src="clip.mp4" type="video/mp4">\n</video>',
        codeLang: "html",
        terms: [
          {
            term: "MIME 타입",
            body: "파일의 종류를 'image/avif', 'video/mp4'처럼 큰 갈래와 작은 갈래로 적은 이름입니다. 확장자와 달리 서버와 브라우저가 주고받는 공식 이름입니다. 택배 상자에 붙여 내용물을 알리는 딱지와 같습니다.",
          },
        ],
      },
      {
        label: "<audio>",
        body: "소리를 재생합니다. controls가 없으면 화면에 아무것도 보이지 않습니다. 파일은 src 하나로 주거나 안에 source를 여러 개 둡니다. 브라우저마다 읽는 형식이 달라서 대개 source를 씁니다. autoplay, muted, loop는 불 속성이라 값과 상관없이 있으면 켜집니다. muted=\"false\"로는 소리가 켜지지 않습니다. MDN은 소리가 저절로 나는 페이지를 피하라고 적습니다. audio는 track의 자막을 화면에 보여 주지 않습니다. 자막이 필요하면 소리 파일을 video로 재생합니다. preload와 autoplay는 9장에서 직접 해 봅니다.",
        tables: [
          {
            caption: "<audio>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["src", "URL", "재생할 파일. 없으면 안의 source를 씁니다"],
              ["controls", "불 속성", "브라우저의 기본 조작판을 보입니다"],
              ["autoplay", "불 속성", "받는 대로 재생을 시작합니다. 소리가 있으면 막힐 수 있습니다"],
              ["muted", "불 속성", "소리를 끈 채 시작합니다"],
              ["loop", "불 속성", "끝나면 처음으로 돌아가 다시 재생합니다"],
              ["preload", "none, metadata, auto, 빈 값(auto)", "재생 전에 얼마나 받을지에 대한 힌트. 기본값은 브라우저마다 다릅니다"],
              ["crossorigin", "anonymous, use-credentials", "CORS로 받습니다"],
              ["controlslist", "nodownload, nofullscreen, noremoteplayback", "기본 조작판에서 뺄 단추를 고릅니다"],
              ["disableremoteplayback", "불 속성", "TV 같은 바깥 기기로 보내는 재생을 끕니다"],
              ["loading (실험)", "eager(기본), lazy", "lazy면 조작판이 화면 가까이 와야 받습니다"],
            ],
          },
        ],
      },
      {
        label: "<video>",
        body: "영상을 재생합니다. audio의 속성을 모두 쓰고, 화면이 있어서 속성이 몇 개 더 있습니다. width와 height는 CSS 픽셀 정수이고 퍼센트는 안 됩니다. poster가 없으면 첫 프레임이 나올 때까지 빈칸입니다. 기본 display가 inline이라 대개 block으로 바꿔 배치합니다. MDN은 말소리가 있는 영상에 캡션과 대본을 함께 두라고 적습니다. 자막은 track으로 붙입니다. 소리 있는 autoplay가 막히는 일은 9장에서 직접 봅니다.",
        tables: [
          {
            caption: "<video>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["src", "URL", "재생할 파일. 없으면 안의 source를 씁니다"],
              ["controls, autoplay, muted, loop", "불 속성", "audio와 같습니다"],
              ["preload", "none, metadata, auto", "audio와 같습니다"],
              ["crossorigin", "anonymous, use-credentials", "audio와 같습니다"],
              ["controlslist", "nodownload, nofullscreen, noremoteplayback", "audio와 같습니다"],
              ["disableremoteplayback", "불 속성", "audio와 같습니다"],
              ["poster", "URL", "재생 전에 보여 줄 그림"],
              ["width, height", "정수(CSS 픽셀)", "재생 영역의 크기. 퍼센트는 안 됩니다"],
              ["playsinline", "불 속성", "요소 안 제자리에서 재생하라는 표시"],
              ["disablepictureinpicture", "불 속성", "화면 속 화면(PiP)을 권하지 않게 합니다"],
              ["loading (실험)", "eager(기본), lazy", "lazy면 화면 가까이 와야 영상과 poster를 받습니다"],
            ],
          },
        ],
      },
      {
        label: "<track>",
        body: "audio, video 안에 넣는, 시간에 맞춰 나오는 글자 파일입니다. 자막, 캡션, 장면 설명, 장 제목을 담습니다. 파일 형식은 WebVTT(.vtt)이고, track은 빈 요소입니다. src는 문서와 같은 출처여야 합니다. 다른 출처면 부모 미디어 요소에 crossorigin이 있어야 합니다. kind를 빼면 subtitles가 되고, 모르는 값이면 metadata가 됩니다. kind가 subtitles면 srclang을 꼭 적습니다. default는 미디어 요소마다 track 하나에만 붙입니다. kind, srclang, label이 모두 같은 track을 둘 두지 않습니다.",
        tables: [
          {
            caption: "<track>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["kind", "subtitles(기본), captions, descriptions, chapters, metadata", "이 글자를 어디에 쓰는지. 아래 표"],
              ["src", "URL(.vtt)", "자막 파일. 꼭 있어야 합니다"],
              ["srclang", "언어 태그(ko, en-US 등)", "글자의 언어. subtitles면 꼭 적습니다"],
              ["label", "글자", "자막을 고르는 메뉴에 보일 이름"],
              ["default", "불 속성", "사용자 설정이 따로 없으면 이 트랙을 켭니다"],
            ],
          },
          {
            caption: "kind의 값",
            head: ["값", "담는 것", "누구를 위해"],
            rows: [
              ["subtitles (기본)", "대사의 받아쓰기나 번역", "소리는 들리지만 말을 알아듣지 못할 때"],
              ["captions", "대사에 효과음, 음악까지 적은 글", "소리를 듣지 못하거나 끈 때"],
              ["descriptions", "영상 장면을 글로 풀어 쓴 것", "화면을 볼 수 없을 때. 소리로 읽어 줍니다"],
              ["chapters", "장 제목", "영상 안에서 옮겨 다닐 때"],
              ["metadata", "스크립트가 쓰는 데이터", "사용자에게는 보이지 않습니다"],
            ],
          },
        ],
        terms: [
          {
            term: "언어 태그 (BCP 47)",
            body: "ko, en-US, zh-Hant처럼 언어를 적는 표준 이름입니다. 앞은 언어, 뒤는 지역이나 글자 체계입니다. lang 속성과 같은 형식이라 자막의 언어도 같은 이름으로 적습니다. 나라마다 다른 콘센트를 정해진 기호로 부르는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: track의 kind와 default",
        body: "네 track이 모두 같은 자막 파일을 가리킵니다. 다른 것은 kind와 default뿐입니다.\n(1) kind를 뺀 둘째는 subtitles가 됩니다.\n(2) 모르는 값 \"자막\"을 적은 넷째는 metadata가 됩니다.\n지금 값의 첫 줄에서 속성 글자와 track.kind를 나란히 봅니다. 처음에 켜지는 것은 default가 붙은 둘째뿐입니다(mode가 showing). 나머지는 disabled입니다. 꺼진 트랙은 파일을 받지 않습니다. 그래서 기록에는 track의 load가 하나만 찍히고, track.readyState도 둘째만 받음(2)입니다. 조작판의 자막 메뉴에서 다른 자막을 고르면 그 트랙이 showing이 되고, 그때 load가 하나 더 찍힙니다.",
        lab: {
          html: `<video controls width="240" src="clip.mp4">
  <track kind="captions" src="captions.vtt" srclang="ko" label="캡션">
  <track src="captions.vtt" srclang="ko" label="kind 없음" default>
  <track kind="chapters" src="captions.vtt" srclang="ko" label="장">
  <track kind="자막" src="captions.vtt" srclang="ko" label="틀린 kind">
</video>`,
          height: 200,
          checks: [
            { label: "kind 속성 → track.kind", expr: "[...document.querySelectorAll('track')].map((t) => (t.getAttribute('kind') ?? '(없음)') + ' → ' + t.kind)" },
            { label: "textTracks의 mode", expr: "[...document.querySelector('video').textTracks].map((t) => t.label + ': ' + t.mode)" },
            { label: "track.readyState", expr: "[...document.querySelectorAll('track')].map((t) => t.readyState)" },
          ],
          tryIt: "default를 첫째 track으로 옮겨 보세요. 켜지는 트랙과 load가 찍히는 트랙이 함께 바뀝니다.",
        },
      },
      {
        label: "<map>",
        body: "그림 위의 누를 수 있는 영역들을 묶습니다. 이런 그림을 이미지 맵이라고 합니다. 영역 하나하나는 안의 area가 정합니다. img의 usemap에 \"#\"과 map의 name을 이어 적으면 그 그림에 붙습니다. name은 빈칸 없이 적고, 문서 안의 다른 map과 겹치면 안 됩니다. id를 함께 쓰면 name과 같은 값이어야 합니다. map과 area는 화면에 아무것도 그리지 않습니다. 그림은 그대로 보이고, 누르는 영역만 생깁니다.",
        tables: [
          {
            caption: "<map>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["name", "빈칸 없는 이름", "img의 usemap=\"#이름\"이 이 map을 찾는 이름. 꼭 있어야 합니다"]],
          },
        ],
        terms: [
          {
            term: "이미지 맵 (image map)",
            body: "그림 한 장의 여러 곳에 서로 다른 링크를 거는 방법입니다. 그림은 그대로 두고, 좌표로 누르는 영역만 정합니다. 지하철 노선도의 역마다 다른 안내 페이지를 붙이는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<area>",
        body: "map 안에서 그림의 한 영역을 정하는 빈 요소입니다. href가 있으면 그 영역은 링크이고, 없으면 링크가 아닙니다. 링크라서 a처럼 target, download, rel, ping, referrerpolicy를 씁니다(7장). href가 있으면 alt도 꼭 적습니다. 낭독기와 그림을 못 받은 화면은 이 alt로 영역을 알립니다. shape로 모양을, coords로 자리를 정합니다. coords의 숫자는 그림 왼쪽 위에서 잰 CSS 픽셀입니다. 그래서 CSS로 그림 크기를 바꿔도 영역은 따라 바뀌지 않습니다.",
        tables: [
          {
            caption: "<area>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["shape", "rect, circle, poly, default", "영역의 모양. default는 다른 영역 밖의 나머지 전부"],
              ["coords", "쉼표로 나눈 숫자(CSS 픽셀)", "rect: 왼쪽 위 x,y와 오른쪽 아래 x,y\ncircle: 중심 x,y와 반지름\npoly: 꼭짓점 x,y를 차례로"],
              ["href", "URL", "이 영역이 가는 주소. 없으면 링크가 아닙니다"],
              ["alt", "글자", "영역을 대신하는 글자. href가 있으면 꼭 적습니다"],
              ["target", "_self, _blank, _parent, _top, 창 이름", "어느 창에서 열지. a와 같습니다"],
              ["download", "불 속성 또는 파일 이름", "열지 않고 내려받습니다"],
              ["rel", "링크 종류 목록", "이 링크와 문서의 관계. href가 있을 때만 씁니다"],
              ["ping", "빈칸으로 나눈 URL 목록", "링크를 따라갈 때 이 주소들에 POST로 알립니다"],
              ["referrerpolicy", "no-referrer, origin 등", "따라갈 때 Referer를 얼마나 보낼지"],
              ["interestfor (실험)", "요소의 id", "가리키거나 포커스하면 그 요소를 보이고 숨깁니다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: area로 그림 나누기",
        body: "그림의 왼쪽 절반(rect)과 오른쪽의 작은 원(circle)이 각각 링크입니다. 왼쪽 절반을 누르면 주소에 #left가 붙고, 기록에 hashchange가 찍힙니다. 아래 문단 중 id가 left인 것에 주황 테두리가 생깁니다(:target). 원을 누르면 #right로 바뀝니다. 오른쪽인데 원 밖을 누르면 아무 일도 없습니다. 그곳은 영역이 없는 그냥 그림이기 때문입니다. 지금 값에서 img.useMap은 \"#m\"이고, map.areas에 영역이 둘 있습니다.",
        lab: {
          html: `<img src="dot-1x.svg" usemap="#m" alt="두 영역으로 나눈 사각형" width="120" height="120">
<map name="m">
  <area shape="rect" coords="0,0,60,120" href="#left" alt="왼쪽 절반">
  <area shape="circle" coords="90,60,25" href="#right" alt="오른쪽 원">
</map>
<p id="left">왼쪽 절반을 눌렀습니다.</p>
<p id="right">오른쪽 원을 눌렀습니다.</p>`,
          height: 250,
          checks: [
            { label: "location.hash", expr: "location.hash" },
            { label: "img.useMap", expr: "document.images[0].useMap" },
            { label: "map.areas.length", expr: "document.querySelector('map').areas.length" },
            { label: "area마다 hash", expr: "[...document.querySelectorAll('area')].map((a) => a.hash)" },
          ],
          tryIt: "img에 style=\"width: 240px; height: 240px\"를 더해 보세요. 그림은 두 배가 되지만 영역은 그대로라, 커진 그림의 원을 눌러도 맞지 않습니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이미지와 미디어 태그의 실수는 화면에 바로 드러나지 않는 것이 많습니다. 후보를 조용히 건너뛰거나 영역이 조용히 어긋납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["usemap=\"m\"처럼 #을 빠뜨렸다", "그림에 map이 붙지 않아 눌러도 아무 일이 없다", "usemap=\"#m\"처럼 #과 name을 이어 적는다"],
              ["이미지 맵 그림의 크기를 CSS로 바꿨다", "누르는 영역이 그림과 어긋난다", "본래 크기로 두거나, 바뀐 크기에 맞춰 coords를 다시 적는다"],
              ["picture 안의 source에 src를 적었다", "srcset이 없는 후보라 건너뛴다", "picture 안에서는 srcset에 적는다"],
              ["video 안의 source에 srcset을 적었다", "src가 없는 후보라 실패로 넘어간다", "audio, video 안에서는 src에 적는다"],
              ["track에 kind=\"자막\"처럼 모르는 값을 적었다", "metadata 트랙이 되어 화면에 나오지 않는다", "subtitles, captions 같은 정해진 값을 쓴다"],
              ["audio에 track으로 자막을 붙였다", "audio는 자막을 화면에 보여 주지 않는다", "소리 파일을 video로 재생하거나 대본을 따로 둔다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) picture 안의 source와 video 안의 source는 파일 주소를 각각 어느 속성에 적나요?\n2) area의 coords는 CSS로 그림 크기를 바꾸면 따라 바뀌나요?\n3) track에서 kind를 빼면, 또 모르는 값을 적으면 각각 무엇이 되나요?\n4) 꺼진(disabled) 자막 트랙의 파일은 언제 받나요?",
      },
    ],
    sources: [
      { label: "MDN — <img>", href: `${REF}/Elements/img` },
      { label: "MDN — <picture>", href: `${REF}/Elements/picture` },
      { label: "MDN — <source>", href: `${REF}/Elements/source` },
      { label: "MDN — <video>", href: `${REF}/Elements/video` },
      { label: "MDN — <track>", href: `${REF}/Elements/track` },
      { label: "MDN — <area>", href: `${REF}/Elements/area` },
    ],
  },
  {
    id: "html-tag-embed",
    name: "임베드와 스크립트 태그",
    tagline: "다른 문서, 그림판, 코드를 품는 태그들",
    intro:
      "어떤 태그는 HTML 바깥의 것을 문서 안에 품습니다. 다른 웹 문서(iframe), 브라우저가 여는 파일(embed, object), 스크립트로 그리는 그림판(canvas), 실행할 코드(script)입니다. template과 slot은 거꾸로, 당장 그리지 않을 HTML을 품었다가 나중에 꺼내 씁니다. 이 시트는 각 태그의 속성을 모읍니다. iframe의 sandbox와 srcdoc은 10장, script의 defer와 async는 2장에서 직접 해 봤습니다. 여기서는 canvas의 크기, 모듈 스크립트, template과 slot을 직접 해 봅니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "임베드와 스크립트에 쓰는 태그 여덟 개입니다. (실험)이 붙은 속성은 아직 일부 브라우저만 지원합니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<iframe>", "문서 안의 다른 문서(창)", "src, srcdoc, name, sandbox, allow, allowfullscreen, loading, referrerpolicy, width, height, credentialless(실험), csp(실험), privateToken(실험)", "10장 · iframe과 임베드"],
              ["<embed>", "브라우저가 여는 바깥 파일", "src, type, width, height", "10장 · iframe과 임베드"],
              ["<object>", "바깥 자원. 대체 내용을 품는다", "data, type, name, form, width, height", "10장 · iframe과 임베드"],
              ["<canvas>", "스크립트로 그리는 그림판", "width, height", ""],
              ["<script>", "실행할 코드나 데이터 블록", "src, type, async, defer, nomodule, crossorigin, integrity, nonce, referrerpolicy, fetchpriority, blocking", "2장 · head와 메타데이터"],
              ["<noscript>", "스크립트가 꺼졌을 때의 내용", "없음 (전역 속성만)", ""],
              ["<template>", "당장 그리지 않는 HTML 조각", "shadowrootmode, shadowrootclonable, shadowrootdelegatesfocus, shadowrootserializable, shadowrootcustomelementregistry, 실험 속성 셋", ""],
              ["<slot>", "섀도 DOM 안의 끼울 자리", "name", ""],
            ],
          },
        ],
      },
      {
        label: "<iframe>",
        body: "현재 문서 안에 다른 문서를 넣습니다. 안쪽 문서는 자기 window와 document를 가진 창입니다. 출처가 다르면 부모 스크립트가 안을 읽지 못하고, postMessage로 주고받습니다. MDN은 iframe마다 메모리와 계산을 더 쓴다고 경고합니다. 낭독기를 위해 title에 내용을 적습니다. iframe에서는 보안 때문에 error 이벤트가 나지 않고, load는 실패해도 납니다. sandbox, srcdoc, loading은 10장에서 직접 해 봅니다.\n\n옛 속성 frameborder, scrolling, marginwidth, marginheight, align, longdesc는 쓰지 않습니다(CSS로). allowpaymentrequest는 allow=\"payment\"로 바꿉니다.",
        tables: [
          {
            caption: "<iframe>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["src", "URL", "넣을 문서의 주소. about:blank는 빈 문서"],
              ["srcdoc", "HTML 글자", "문서를 글자로 직접 넣습니다. src보다 우선합니다"],
              ["name", "창 이름", "a, form의 target이 이 창을 고르는 이름"],
              ["sandbox", "빈 값 또는 allow-* 토큰 목록", "안쪽 문서의 능력을 빼앗고, 토큰으로 하나씩 풉니다"],
              ["allow", "권한 정책(camera, fullscreen 등)", "안쪽 문서에 줄 기능 권한"],
              ["allowfullscreen", "불 속성", "전체 화면을 허락합니다. allow=\"fullscreen *\"의 옛 표기"],
              ["loading", "eager(기본), lazy", "lazy면 화면 가까이 와야 불러옵니다"],
              ["referrerpolicy", "no-referrer, origin 등", "문서를 받을 때 Referer를 얼마나 보낼지"],
              ["width, height", "정수(CSS 픽셀)", "창 크기. 기본은 300과 150"],
              ["credentialless (실험)", "불 속성", "쿠키와 저장소 없이 새 임시 상태로 불러옵니다"],
              ["csp (실험)", "CSP 정책 글자", "안쪽 문서가 지킬 콘텐츠 보안 정책을 요구합니다"],
              ["privateToken (실험)", "옵션 객체를 적은 글자", "Private State Token 작업을 함께 요청합니다"],
            ],
          },
        ],
        terms: [
          {
            term: "창 (browsing context)",
            body: "문서 하나를 담아 보여 주는 틀입니다. 브라우저 탭 하나, iframe 하나가 각각 창이고, 저마다 window와 document를 가집니다. 큰 액자 안에 작은 액자가 따로 걸린 것과 같습니다.",
          },
        ],
      },
      {
        label: "<embed>",
        body: "바깥 파일을 그 자리에 넣는 빈 요소입니다. 예전에는 플래시 같은 플러그인 내용을 넣었습니다. 지금 브라우저는 플러그인을 지원하지 않습니다. 그래서 PDF처럼 브라우저가 직접 여는 파일 정도에 씁니다. 빈 요소라 대체 내용을 품지 못합니다. iframe과 달리 불러오기를 조절하는 속성도 없습니다. 낭독기를 위해 title을 적습니다. object-fit은 embed에 효과가 없습니다.",
        tables: [
          {
            caption: "<embed>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["src", "URL", "넣을 파일의 주소"],
              ["type", "MIME 타입", "넣을 파일의 형식"],
              ["width, height", "정수(CSS 픽셀)", "보여 줄 크기. 퍼센트는 안 됩니다"],
            ],
          },
        ],
      },
      {
        label: "<object>",
        body: "바깥 자원을 넣습니다. 자원에 따라 그림, 안쪽 문서, 플러그인 내용으로 다룹니다. embed와 달리 안에 대체 내용을 둘 수 있습니다. 자원을 보여 주지 못하면 그 안의 내용이 대신 나옵니다. PDF를 넣고 안에 내려받기 링크를 두는 식입니다. MDN은 보기 창이 떠도 PDF가 안 보일 수 있으니, 바깥에도 링크를 두라고 적습니다. data와 type 중 하나는 꼭 있어야 합니다. 페이지의 CSP는 object-src로 object의 출처를 제한합니다.\n\n옛 속성 classid, codebase, codetype, archive, declare, standby, border, usemap은 쓰지 않습니다.",
        tables: [
          {
            caption: "<object>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["data", "URL", "넣을 자원의 주소"],
              ["type", "MIME 타입", "data 자원의 형식"],
              ["name", "창 이름", "안쪽 창의 이름. window와 document에서 이 이름으로 찾습니다"],
              ["form", "form의 id", "이 object가 속한 폼"],
              ["width, height", "정수(CSS 픽셀)", "보여 줄 크기"],
            ],
          },
        ],
        code: '<object data="report.pdf" type="application/pdf" width="600" height="400">\n  <p>PDF를 보여 줄 수 없습니다. <a href="report.pdf">내려받기</a></p>\n</object>',
        codeLang: "html",
      },
      {
        label: "<canvas>",
        body: "스크립트로 그리는 픽셀 그림판입니다. HTML만으로는 빈 사각형입니다. getContext('2d')나 WebGL로 그립니다. width, height 속성은 그림판의 픽셀 수이고, 기본은 300과 150입니다. CSS의 width, height는 화면에 보일 크기입니다. 둘이 다르면 그림판을 늘이거나 줄여 그려서 흐려지거나 일그러집니다. 그래서 크기는 속성으로 정합니다. </canvas> 닫는 태그가 꼭 있어야 합니다. 안에 적은 내용은 canvas를 못 그리는 브라우저와 스크립트가 꺼진 브라우저에서만 보입니다. MDN은 canvas가 그린 것이 접근성 도구에 드러나지 않는다고 적습니다. 그래서 그 내용을 글로도 알려 줍니다.\n\n옛 속성 moz-opaque는 쓰지 않습니다(getContext의 alpha: false로).",
        tables: [
          {
            caption: "<canvas>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["width", "음이 아닌 정수(기본 300)", "그림판의 가로 픽셀 수"],
              ["height", "음이 아닌 정수(기본 150)", "그림판의 세로 픽셀 수"],
            ],
          },
        ],
        terms: [
          {
            term: "그리기 버퍼 (drawing buffer)",
            body: "canvas가 속에 가진 픽셀 판입니다. width×height개의 점에 색을 담고, 화면에 보일 때는 이 판을 CSS 크기에 맞춰 늘이거나 줄입니다. 작은 사진을 큰 액자에 맞춰 늘이면 흐려지는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 그림판 크기와 화면 크기",
        body: "두 canvas는 width=\"100\" height=\"50\"으로 그림판 크기가 같습니다. 스크립트가 둘에 같은 사각형을 그립니다. 둘째는 CSS로 화면 크기만 두 배로 키웠습니다. 그래서 사각형도 두 배로 커져 보이고, 늘여 그린 것이라 가장자리가 흐릿할 수 있습니다. 지금 값에서 width×height는 둘이 같고, clientWidth×clientHeight만 다릅니다. 첫째 안에 적은 글은 보이지 않습니다. 이 브라우저가 canvas를 그릴 수 있기 때문입니다. 마지막 줄은 새로 만든 canvas의 기본 크기입니다.",
        lab: {
          html: `<canvas width="100" height="50" style="border: 1px solid #888">canvas를 못 그리면 보이는 글</canvas>
<canvas width="100" height="50" style="width: 200px; height: 100px; border: 1px solid #888"></canvas>
<script>
  for (const c of document.querySelectorAll('canvas')) {
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#2f6f9f';
    ctx.fillRect(10, 10, 80, 30);
  }
</script>`,
          height: 150,
          checks: [
            { label: "그림판 (width×height)", expr: "[...document.querySelectorAll('canvas')].map((c) => c.width + '×' + c.height)" },
            { label: "화면 (clientWidth×clientHeight)", expr: "[...document.querySelectorAll('canvas')].map((c) => c.clientWidth + '×' + c.clientHeight)" },
            { label: "새 canvas의 기본 크기", expr: "document.createElement('canvas').width + '×' + document.createElement('canvas').height" },
          ],
          tryIt: "스크립트 끝에 document.querySelector('canvas').width = 100; 을 더해 보세요. 같은 값을 다시 넣어도 첫째 그림판이 지워집니다.",
        },
      },
      {
        label: "<script>",
        body: "자바스크립트를 실행하거나 데이터를 품습니다. 코드를 안에 적거나 src로 파일을 부릅니다. type에 따라 하는 일이 갈립니다(아래 표). 속성 없는 보통 script는 파서가 만난 자리에서 받고 실행합니다. 그동안 파싱은 멈춥니다. defer와 async의 실행 시점은 2장에서 봤습니다.\n\ntype=\"module\"은 defer가 없어도 문서를 다 읽은 뒤 돕니다. 인라인 모듈도 같습니다. 다른 출처의 모듈 파일은 CORS로 받습니다. 모듈 안에서는 document.currentScript가 null입니다. nomodule을 붙인 script는 모듈을 아는 브라우저에서 돌지 않습니다. 모듈을 모르는 옛 브라우저용 대체 코드에 씁니다.\n\n옛 속성 charset, language는 쓰지 않습니다.",
        tables: [
          {
            caption: "<script>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["src", "URL", "바깥 스크립트 파일"],
              ["type", "빈 값, module, importmap, speculationrules, 그 밖의 MIME", "스크립트의 종류. 아래 표"],
              ["async", "불 속성", "받는 대로 실행합니다. 순서는 보장하지 않습니다"],
              ["defer", "불 속성", "다 읽은 뒤 적은 순서대로. src가 있는 보통 script에만 효과"],
              ["nomodule", "불 속성", "모듈을 아는 브라우저에서는 실행하지 않습니다"],
              ["crossorigin", "anonymous, use-credentials", "CORS로 받습니다. 다른 출처 스크립트의 에러 내용을 보려면 필요합니다"],
              ["integrity", "해시(sha384-… 등)", "받은 파일의 해시가 다르면 실행하지 않습니다. src와 함께만"],
              ["nonce", "한 번 쓰는 무작위 값", "CSP의 script-src가 이 값을 가진 script만 허락합니다"],
              ["referrerpolicy", "no-referrer, origin 등", "스크립트를 받을 때 Referer를 얼마나 보낼지"],
              ["fetchpriority", "high, low, auto(기본)", "다른 스크립트보다 먼저, 또는 나중에 받으라는 힌트"],
              ["blocking", "render", "이 스크립트가 끝날 때까지 화면 그리기를 막습니다. head 안에서만"],
            ],
          },
          {
            caption: "type의 값",
            head: ["type", "담는 것", "언제 도나"],
            rows: [
              ["없음, 빈 값, text/javascript", "보통(classic) 스크립트", "만난 자리에서. defer, async로 바꿉니다"],
              ["module", "자바스크립트 모듈(import, export)", "문서를 다 읽은 뒤, 적은 순서대로"],
              ["importmap", "모듈 이름을 주소로 바꾸는 JSON 표", "실행하지 않고 규칙으로 등록합니다"],
              ["speculationrules (실험)", "미리 받거나 미리 그릴 페이지 규칙(JSON)", "실행하지 않고 규칙으로 등록합니다"],
              ["그 밖의 MIME(application/json 등)", "데이터 블록", "실행하지 않습니다. src도 무시합니다"],
            ],
          },
        ],
        code: '<script type="importmap">\n  { "imports": { "square": "./shapes/square.js" } }\n</script>\n<script type="module">\n  import { draw } from "square";\n</script>\n<script nomodule src="fallback.js"></script>',
        codeLang: "html",
        terms: [
          {
            term: "SRI (하위 자원 무결성)",
            body: "integrity에 적은 해시와 받은 파일의 해시를 견주어, 다르면 실행하지 않는 장치입니다. CDN의 파일이 몰래 바뀌는 공격을 막습니다. 봉인 스티커가 뜯긴 택배는 받지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<noscript>",
        body: "스크립트가 꺼진 브라우저에서만 쓰이는 내용입니다. 스크립트가 켜져 있으면 파서는 그 안을 요소가 아니라 글자 하나로 읽습니다. 그래서 화면에 나오지 않고, 안의 a나 img도 요소로 생기지 않습니다. 스크립트가 꺼져 있으면 안의 내용이 보통 HTML로 그려집니다. head 안에 둘 때는 link, style, meta만 넣습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "직접 해 보기: module, nomodule, noscript",
        body: "여섯 script가 무엇을 출력하는지 기록의 출력 줄에서 봅니다. 나와야 하는 순서는 이렇습니다.\n(1) 3번 보통 script가 만난 자리에서 돕니다. readyState는 loading입니다.\n(2) 마지막 script가 데이터 블록을 읽어 5번 글을 출력합니다. 데이터 블록 자체는 실행되지 않습니다.\n(3) 문서를 다 읽은 뒤 1번 module이 돕니다. readyState는 interactive입니다.\n(4) 이어서 2번 defer 파일이 돕니다.\nmodule과 defer는 같은 줄에 서서 적은 순서대로 돕니다. 4번 nomodule은 이 브라우저가 모듈을 알기 때문에 돌지 않습니다. 지금 값에서 noscript의 첫 자식은 #text입니다. 스크립트가 켜져 있어 안의 b가 요소가 아니라 글자로 남은 것입니다.",
        lab: {
          html: `<script type="module">console.log('1. 인라인 module, readyState = ' + document.readyState)</script>
<script defer src="say.js" data-msg="2. defer 파일"></script>
<script>console.log('3. 보통 script, readyState = ' + document.readyState)</script>
<script nomodule>console.log('4. nomodule')</script>
<script type="application/json" id="data">{"msg": "5. 데이터 블록은 읽어야 나온다"}</script>
<script>console.log(JSON.parse(document.getElementById('data').text).msg)</script>
<noscript><b>스크립트가 꺼져 있습니다</b></noscript>
<p>문서 끝</p>`,
          height: 120,
          checks: [
            { label: "HTMLScriptElement.supports()", expr: "['classic', 'module', 'importmap', 'speculationrules'].map((t) => t + ' ' + HTMLScriptElement.supports(t))" },
            { label: "noscript의 첫 자식", expr: "document.querySelector('noscript').firstChild.nodeName" },
            { label: "noscript 안의 b 요소", expr: "document.querySelector('noscript b')" },
          ],
          tryIt: "1번 script에 async를 더해 보세요. 모듈이 문서를 다 읽기 전에 끼어들 수 있습니다.",
        },
      },
      {
        label: "<template>",
        body: "당장 쓰지 않을 HTML 조각을 담아 둡니다. 안의 내용은 화면에 그려지지 않습니다. 안의 script는 돌지 않고 img는 받지 않습니다. 파서는 안의 요소를 template의 자식이 아니라 따로 떨어진 조각(content)에 넣습니다. 그래서 childNodes는 늘 비어 있고, document.querySelector로도 찾지 못합니다. 스크립트가 content를 복제해 문서에 붙여야 비로소 살아납니다. 그때 script가 돌고 img도 받습니다. 표의 행처럼 같은 모양을 여러 번 찍어 낼 때 씁니다.\n\nshadowrootmode를 붙이면 쓰임이 바뀝니다. 파서는 template을 만들지 않고, 부모 요소에 섀도 루트를 붙여 내용을 그 안에 넣습니다(선언형 섀도 DOM). shadowroot로 시작하는 다른 속성은 그 섀도 루트의 성질을 정합니다.",
        tables: [
          {
            caption: "<template>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["shadowrootmode", "open, closed", "부모 요소에 섀도 루트를 만듭니다. closed면 스크립트에서 숨깁니다"],
              ["shadowrootclonable", "불 속성", "부모를 복제할 때 섀도 루트도 함께 복제합니다"],
              ["shadowrootdelegatesfocus", "불 속성", "섀도 안의 포커스 못 받는 곳을 누르면 첫 포커스 가능한 요소로 넘깁니다"],
              ["shadowrootserializable", "불 속성", "getHTML()로 섀도 루트까지 글자로 꺼낼 수 있게 합니다"],
              ["shadowrootcustomelementregistry", "불 속성", "문서의 사용자 정의 요소 등록부를 쓰지 않고, 나중에 따로 붙이게 비워 둡니다"],
              ["shadowrootslotassignment (실험)", "named(기본), manual", "slot 배정을 이름으로 할지, 스크립트로 할지"],
              ["shadowrootreferencetarget (실험)", "섀도 안 요소의 id", "바깥에서 호스트를 가리키는 참조를 그 요소로 보냅니다"],
              ["for (실험)", "표시 이름", "문서 앞쪽의 표시 자리에 이 내용을 나중에 끼워 넣습니다"],
            ],
          },
        ],
        terms: [
          {
            term: "DocumentFragment",
            body: "문서에 붙지 않은 채 노드를 담아 두는 가벼운 상자입니다. 상자를 문서에 붙이면 상자는 사라지고 안의 노드만 옮겨 갑니다. template.content가 이것입니다. 이삿짐 상자에서 물건을 꺼내 방에 놓으면 상자는 남지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: template 안은 잠들어 있다",
        body: "처음에는 template 안의 것이 하나도 보이지 않습니다. 기록의 출력에는 '밖의 script' 한 줄만 찍히고, img의 load도 없습니다. 지금 값을 보면 template의 childNodes는 비어 있고, 요소는 content 쪽에 있습니다. 문서 전체에서 .item을 찾아도 나오지 않습니다. 단추를 누르면 content를 복제해 body 끝에 붙입니다. 그제야 p가 보이고, img의 load와 '안의 script' 출력이 찍힙니다. 누를 때마다 하나씩 더 붙고, 원본 content는 그대로입니다.",
        lab: {
          html: `<template id="tpl">
  <p class="item">template에서 꺼낸 p</p>
  <img src="dot-1x.svg" alt="" width="40" height="40">
  <script>console.log('template 안의 script가 돌았습니다')</script>
</template>
<button type="button" onclick="document.body.append(document.importNode(tpl.content, true))">
  복제해 붙이기
</button>
<script>console.log('template 밖의 script가 돌았습니다')</script>`,
          height: 200,
          checks: [
            { label: "template.childNodes.length", expr: "document.getElementById('tpl').childNodes.length" },
            { label: "content.children.length", expr: "document.getElementById('tpl').content.children.length" },
            { label: "문서에서 찾은 .item", expr: "document.querySelectorAll('.item').length" },
            { label: "labDom(content)", expr: "labDom(document.getElementById('tpl').content)" },
          ],
        },
      },
      {
        label: "<slot>",
        body: "웹 컴포넌트의 섀도 DOM 안에 두는 빈자리입니다. 컴포넌트를 쓰는 쪽이 호스트 요소의 자식으로 넣은 내용이 이 자리에 그려집니다. 자식에 slot=\"이름\"을 적으면 같은 name의 slot으로 갑니다. slot 속성이 없는 자식은 name 없는 첫 slot(기본 slot)으로 갑니다. 끼울 것이 없으면 slot 안에 적어 둔 기본 내용이 보입니다. slot은 섀도 루트 안에 있을 때만 자리 노릇을 합니다.",
        tables: [
          {
            caption: "<slot>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["name", "글자", "이 자리의 이름. 같은 이름이 둘이면 첫 slot으로 갑니다. manual 배정에서는 효과가 없습니다"]],
          },
        ],
        terms: [
          {
            term: "섀도 DOM (shadow DOM)",
            body: "요소 하나에 바깥 문서와 떨어진 작은 DOM 나무를 붙이는 기능입니다. 안의 스타일과 구조가 바깥과 섞이지 않습니다. 그 나무가 붙은 요소를 호스트라고 부릅니다. 손님은 유리 너머로 보기만 하고 안의 배치는 가게가 정하는 진열장과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 선언형 섀도 DOM과 slot",
        body: "파서가 shadowrootmode가 붙은 template을 만나면 template 요소를 만들지 않습니다. 대신 부모 div에 섀도 루트를 붙이고, 내용을 그 안에 넣습니다. 지금 값에서 문서에 template이 하나도 없는 것이 그 흔적입니다. div의 자식 b는 slot=\"title\"이라 이름이 title인 자리에 그려집니다. slot 속성이 없는 span은 기본 slot에 들어갑니다. 화면에서 둘이 섀도 안의 테두리 문단에 끼워져 보입니다. 끼울 것이 있으므로 '기본 제목'과 '기본 본문'은 보이지 않습니다.",
        lab: {
          html: `<div id="card">
  <template shadowrootmode="open">
    <p style="border: 1px solid #888; padding: 4px">
      제목: <slot name="title">기본 제목</slot><br>
      본문: <slot>기본 본문</slot>
    </p>
  </template>
  <b slot="title">내가 넣은 제목</b>
  <span>이름 없는 slot으로 가는 글</span>
</div>`,
          height: 130,
          checks: [
            { label: "shadowRoot.mode", expr: "document.getElementById('card').shadowRoot?.mode" },
            { label: "문서의 template 수", expr: "document.querySelectorAll('template').length" },
            {
              label: "slot마다 들어온 것",
              expr: "[...document.getElementById('card').shadowRoot.querySelectorAll('slot')].map((s) => (s.name || '(기본)') + ' ← ' + (s.assignedNodes().map((n) => n.textContent.trim()).filter(Boolean).join(', ') || '(없음)'))",
            },
          ],
          tryIt: "b의 slot 속성을 지워 보세요. 제목 자리에 '기본 제목'이 돌아오고, b는 본문 자리로 갑니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이 태그들의 실수는 대개 에러 없이 조용히 지나갑니다. 그림이 흐려지고, 속성이 무시되고, 요소를 못 찾습니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["canvas 크기를 CSS로만 키웠다", "그림판이 늘어나 흐릿하거나 일그러진다", "width, height 속성을 화면 크기에 맞춘다"],
              ["type=\"module\" 안에서 document.currentScript를 읽었다", "모듈에서는 null이라 에러가 난다", "import.meta.url을 쓰거나 선택자로 요소를 찾는다"],
              ["인라인 script에 defer를 붙였다", "src가 없어 아무 효과가 없다", "파일로 빼서 src와 함께 쓰거나 type=\"module\"로 쓴다"],
              ["template 안의 요소를 document.querySelector로 찾았다", "null이 나온다", "template.content.querySelector로 찾는다"],
              ["embed 안에 대체 내용을 적었다", "빈 요소라 대체 내용을 품지 못한다", "object를 쓰거나 바깥에 링크를 둔다"],
              ["다른 출처 스크립트의 에러가 'Script error.'로만 보인다", "CORS 없이 받아 에러 내용을 감춘다", "crossorigin을 붙이고 서버가 CORS 헤더를 보내게 한다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) canvas의 width 속성과 CSS width가 다르면 그림은 어떻게 그려지나요?\n2) 인라인 type=\"module\" 스크립트는 보통 인라인 script와 견주어 언제 실행되나요?\n3) template 안의 script와 img는 언제 실행되고 언제 받아지나요?\n4) slot 속성이 없는 자식은 어느 slot에 그려지나요?",
      },
    ],
    sources: [
      { label: "MDN — <iframe>", href: `${REF}/Elements/iframe` },
      { label: "MDN — <canvas>", href: `${REF}/Elements/canvas` },
      { label: "MDN — <script>", href: `${REF}/Elements/script` },
      { label: "MDN — <noscript>", href: `${REF}/Elements/noscript` },
      { label: "MDN — <template>", href: `${REF}/Elements/template` },
      { label: "MDN — <slot>", href: `${REF}/Elements/slot` },
    ],
  },
  {
    id: "html-tag-table",
    name: "표 태그",
    tagline: "행과 열의 칸을 짜는 태그들",
    intro:
      "표는 행과 열로 된 데이터를 칸에 담습니다. 칸을 만드는 td, th 말고도 행을 묶고(thead, tbody, tfoot), 열을 묶고(colgroup, col), 제목을 붙이는(caption) 태그가 있습니다. 이 시트는 열 개 태그의 속성과 놓는 순서를 모읍니다. tbody가 저절로 생기는 일, 포스터 페어런팅, colspan과 rowspan은 11장에서 직접 해 봤습니다. 여기서는 열 묶음의 스타일, 행 묶음의 자리, 제목 칸의 속성을 직접 해 봅니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "표를 짜는 태그 열 개입니다. 이 가운데 자기 속성이 있는 것은 colgroup, col, th, td 넷뿐입니다. 나머지의 옛 속성(border, align, bgcolor 등)은 CSS로 바꿉니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<table>", "표 전체", "없음 (전역 속성만)", "11장 · 표"],
              ["<caption>", "표의 제목", "없음 (전역 속성만)", "11장 · 표"],
              ["<colgroup>", "열 묶음", "span", ""],
              ["<col>", "열 하나 또는 여럿", "span", ""],
              ["<thead>", "머리 행 묶음", "없음 (전역 속성만)", "11장 · 표"],
              ["<tbody>", "몸통 행 묶음", "없음 (전역 속성만)", "11장 · 표"],
              ["<tfoot>", "꼬리 행 묶음", "없음 (전역 속성만)", "11장 · 표"],
              ["<tr>", "행 하나", "없음 (전역 속성만)", "11장 · 표"],
              ["<th>", "제목 칸", "abbr, colspan, headers, rowspan, scope", "11장 · 표"],
              ["<td>", "데이터 칸", "colspan, headers, rowspan", "11장 · 표"],
            ],
          },
        ],
      },
      {
        label: "<table>",
        body: "행과 열로 된 데이터를 담는 표 전체입니다. MDN은 표를 화면 배치에 쓰지 말라고 적습니다. 안에 놓는 순서가 정해져 있습니다.\n(1) caption\n(2) colgroup\n(3) thead\n(4) tbody 여러 개, 또는 tr\n(5) tfoot\n스크립트에서는 table.caption, tHead, tBodies, tFoot, rows로 각 부분을 얻습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 border, cellpadding, cellspacing, width, align, bgcolor, frame, rules는 CSS로 바꾸고, summary는 caption으로 바꿉니다.",
        code: '<table>\n  <caption>과일 주문</caption>\n  <colgroup><col><col span="2"></colgroup>\n  <thead>\n    <tr><th scope="col">과일</th><th scope="col">개수</th><th scope="col">값</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">사과</th><td>2</td><td>3,000원</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><th scope="row">합계</th><td>2</td><td>3,000원</td></tr>\n  </tfoot>\n</table>',
        codeLang: "html",
      },
      {
        label: "<caption>",
        body: "표의 제목입니다. table의 첫 자식이어야 합니다. 낭독기는 caption을 표의 이름으로 읽습니다. 사용자는 그 이름을 듣고 표를 읽을지 건너뛸지 정합니다. 표가 figure의 유일한 내용이면 caption 대신 figure의 figcaption을 씁니다. table에 준 배경색은 caption에 칠해지지 않습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align은 CSS의 caption-side로 바꿉니다.",
      },
      {
        label: "<colgroup>",
        body: "열 여러 개를 하나로 묶습니다. caption 뒤, thead, tbody, tr 앞에 둡니다. 묶는 방법은 둘입니다. span으로 열 수만 정하거나, 안에 col을 넣습니다. 안에 col이 있으면 span을 쓰지 않습니다. 칸(td, th)은 colgroup의 자식이 아니라서 스타일을 물려받지 않습니다. 그래서 먹는 CSS가 넷뿐입니다.\n(1) background\n(2) border (table이 border-collapse: collapse일 때)\n(3) visibility: collapse\n(4) width (최소 폭처럼)\ntext-align, vertical-align 같은 것은 효과가 없습니다. 옛 속성 align, valign, width, bgcolor, char, charoff는 쓰지 않습니다.",
        tables: [
          {
            caption: "<colgroup>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["span", "1 이상의 정수(기본 1)", "묶을 열 수. 안에 col이 있으면 쓰지 않습니다"]],
          },
        ],
        terms: [
          {
            term: "열 묶음 (column group)",
            body: "표의 세로 줄 몇 개를 한 덩어리로 부르는 단위입니다. HTML 소스는 행 단위로 적기 때문에 열은 따로 이름을 붙여야 가리킬 수 있습니다. 책장 칸에 '소설', '만화' 딱지를 붙여 세로로 나누는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<col>",
        body: "colgroup 안에서 열 하나, 또는 span만큼의 열을 가리키는 빈 요소입니다. col은 열을 구조로 묶지 않습니다. 묶는 것은 colgroup이 합니다. col을 쓰는 까닭은 대개 열 하나에 배경이나 폭을 주려는 것입니다. 먹는 CSS는 colgroup과 같은 넷입니다. 열 배경은 행 묶음, 행, 칸의 배경보다 아래 층에 칠해집니다. 그래서 tr이나 td에 배경이 있으면 열 배경은 가려집니다. 옛 속성 align, valign, width, bgcolor, char, charoff는 쓰지 않습니다.",
        tables: [
          {
            caption: "<col>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["span", "1 이상의 정수(기본 1)", "이 col이 가리키는 열 수"]],
          },
        ],
        terms: [
          {
            term: "표의 층 (table layers)",
            body: "표의 배경은 여섯 층으로 겹쳐 칠해집니다. 아래부터 표, 열 묶음, 열, 행 묶음, 행, 칸입니다. 위층이 투명할 때만 아래층 배경이 보입니다. 투명한 비닐을 여러 장 겹치면 맨 위에 칠한 색이 아래 색을 가리는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: col span으로 열 칠하기",
        body: "둘째 col은 span=\"2\"라서 둘째와 셋째 열을 함께 가리킵니다. 그 두 열에 노란 배경이 칠해집니다. 그런데 같은 col에 준 text-align: right는 숫자를 오른쪽으로 옮기지 못합니다. 지금 값을 보면 col 요소는 둘인데 span을 더한 열 수는 셋입니다. td의 계산된 배경은 투명이고 text-align도 그대로입니다. 칸은 col의 자식이 아니라 아무것도 물려받지 않기 때문입니다. 노란색은 칸이 아니라 칸 아래의 열 층에 칠해진 것입니다.",
        lab: {
          html: `<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 2px 10px; }
</style>
<table>
  <colgroup>
    <col>
    <col span="2" style="background: #fde68a; text-align: right">
  </colgroup>
  <tr><th>과목</th><th>1학기</th><th>2학기</th></tr>
  <tr><th>수학</th><td>90</td><td>85</td></tr>
  <tr><th>과학</th><td>7</td><td>100</td></tr>
</table>`,
          height: 130,
          checks: [
            { label: "col 요소 수", expr: "document.querySelectorAll('col').length" },
            { label: "span을 더한 열 수", expr: "[...document.querySelectorAll('col')].reduce((n, c) => n + c.span, 0)" },
            { label: "td의 계산된 background-color", expr: "getComputedStyle(document.querySelector('td')).backgroundColor" },
            { label: "td의 계산된 text-align", expr: "getComputedStyle(document.querySelector('td')).textAlign" },
          ],
          tryIt: "둘째 tr에 style=\"background: white\"를 주어 보세요. 그 행에서는 열의 노란 배경이 가려집니다.",
        },
      },
      {
        label: "<thead>",
        body: "표의 머리 행들을 묶습니다. 대개 열 제목(th)이 든 행입니다. caption, colgroup 뒤, tbody, tr, tfoot 앞에 둡니다. 여러 쪽에 걸쳐 인쇄하는 표에서는 쪽마다 같은 머리를 보이는 데 쓰입니다. 이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align, valign, bgcolor, char, charoff는 쓰지 않습니다(CSS로).",
        terms: [
          {
            term: "행 묶음 (row group)",
            body: "표의 가로 줄을 머리(thead), 몸통(tbody), 꼬리(tfoot)로 나눈 덩어리입니다. 보조 기술과 인쇄가 이 구분을 단서로 씁니다. 책의 머리말, 본문, 맺음말처럼 같은 종이라도 맡은 자리가 다릅니다.",
          },
        ],
      },
      {
        label: "<tbody>",
        body: "표의 몸통 행들을 묶습니다. 적지 않아도 파서가 tr 앞에 tbody를 만듭니다(11장). 그래서 table > tr 선택자는 맞지 않습니다. tbody는 여러 개 둘 수 있어서, 행을 덩어리로 나눠 따로 꾸밀 때 씁니다. 여러 개면 서로 붙어 있어야 합니다. 이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align, valign, bgcolor는 쓰지 않습니다(CSS로).",
      },
      {
        label: "<tfoot>",
        body: "표의 꼬리 행들을 묶습니다. 합계나 요약 행입니다. tbody 뒤, 표의 맨 끝에 둡니다. 여러 쪽에 걸쳐 인쇄하는 표에서는 쪽마다 중간 합계를 보이는 데 쓰입니다. 이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align, valign, bgcolor는 쓰지 않습니다(CSS로).",
      },
      {
        label: "직접 해 보기: 행 묶음의 자리와 table.rows",
        body: "일부러 tfoot을 맨 앞에, thead를 맨 뒤에 적었습니다. 지금 규칙에 어긋나는 순서지만 파서는 그대로 둡니다. 지금 값의 첫 줄(소스 순서)이 caption, tfoot, tbody, thead인 것으로 확인합니다. 그런데 화면에서는 머리 행이 맨 위, 합계 행이 맨 아래에 그려집니다. thead와 tfoot의 CSS display 값(table-header-group, table-footer-group)이 자리를 정하기 때문입니다. table.rows도 표준에 따라 thead의 행을 먼저, tfoot의 행을 마지막에 셉니다. 각 행의 rowIndex도 이 순서를 따릅니다.",
        lab: {
          html: `<table border="1">
  <caption>과일 주문</caption>
  <tfoot><tr><th>합계</th><td>3</td></tr></tfoot>
  <tbody>
    <tr><th>사과</th><td>2</td></tr>
    <tr><th>배</th><td>1</td></tr>
  </tbody>
  <thead><tr><th>과일</th><th>개수</th></tr></thead>
</table>`,
          height: 170,
          checks: [
            { label: "소스 순서 (table의 자식)", expr: "[...document.querySelector('table').children].map((e) => e.localName)" },
            { label: "table.rows의 순서", expr: "[...document.querySelector('table').rows].map((r) => r.cells[0].textContent)" },
            { label: "화면 위에서부터", expr: "[...document.querySelectorAll('tr')].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top).map((r) => r.cells[0].textContent)" },
            { label: "소스 순서의 rowIndex", expr: "[...document.querySelectorAll('tr')].map((r) => r.cells[0].textContent + ' ' + r.rowIndex)" },
          ],
          tryIt: "thead를 caption 바로 뒤로, tfoot을 tbody 뒤로 옮겨 보세요. 화면은 그대로이고 소스 순서만 바뀝니다.",
        },
      },
      {
        label: "<tr>",
        body: "표의 행 하나입니다. 안에 td, th를 둡니다. thead, tbody, tfoot 안에 둡니다. table 바로 아래에 적으면 파서가 tbody를 만들어 그 안에 넣습니다. 스크립트에서는 cells로 그 행의 칸을, rowIndex로 table.rows 안의 순서를 얻습니다. 위 실험에서 본 것처럼 rowIndex는 소스 순서와 다를 수 있습니다. 행을 고를 때는 :nth-of-type 같은 선택자가 쓸모 있습니다. 이 태그만의 속성은 없고 전역 속성만 씁니다. 옛 속성 align, valign, bgcolor는 쓰지 않습니다(CSS로).",
      },
      {
        label: "<th>",
        body: "제목 칸입니다. 값이 아니라 그 행이나 열의 이름을 담습니다. tr 안에만 둡니다. 기본 모양은 굵고 가운데 정렬입니다. 낭독기는 데이터 칸을 읽을 때 관련된 th를 함께 읽습니다. 단순한 표에서는 브라우저가 제목의 방향을 짐작합니다. MDN은 짐작이 틀리는 보조 기술이 있으니 scope를 적는 편이 낫다고 적습니다. 행과 열이 얽힌 복잡한 표에서는 id와 headers로 칸마다 제목을 이어 줍니다.\n\n옛 속성 axis는 scope로, width, height, align, valign, bgcolor는 CSS로 바꿉니다.",
        tables: [
          {
            caption: "<th>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["scope", "row, col, rowgroup, colgroup", "이 제목이 붙는 칸들. 없거나 모르는 값이면 브라우저가 정합니다"],
              ["abbr", "짧은 글자", "다른 칸을 읽을 때 쓸 이 제목의 짧은 이름"],
              ["headers", "빈칸으로 나눈 th의 id 목록", "이 제목 칸의 위 제목들"],
              ["colspan", "음이 아닌 정수(기본 1, 1000에서 자름)", "차지할 열 수"],
              ["rowspan", "음이 아닌 정수(기본 1, 65534에서 자름)", "차지할 행 수. 0이면 그 행 묶음 끝까지"],
            ],
          },
        ],
        terms: [
          {
            term: "속성 반영 (reflect)",
            body: "HTML 속성의 글자를 DOM 속성(th.scope 같은 프로퍼티)으로 읽고 쓰게 이어 주는 규칙입니다. scope처럼 값이 정해진 속성은 아는 값만 돌려주고, 모르는 값이면 빈 글자를 돌려줍니다. 서류의 체크 칸 밖에 쓴 글씨는 읽지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<td>",
        body: "데이터 칸입니다. tr 안에만 둡니다. colspan, rowspan으로 여러 열, 여러 행을 차지합니다. 걸친 칸이 있으면 남은 칸은 빈자리를 차례로 채웁니다(11장). 칸끼리 겹치게 걸면 안 됩니다. headers에는 이 칸의 제목 th들의 id를 빈칸으로 나눠 적습니다. 복잡한 표에서 낭독기가 제목을 바르게 읽게 합니다. MDN은 그보다 먼저 표를 작은 표 여럿으로 나눌 수 있는지 보라고 권합니다.\n\n옛 속성 abbr, scope는 td에 쓰지 않습니다(제목이면 th로). axis, width, height, align, valign, bgcolor도 쓰지 않습니다.",
        tables: [
          {
            caption: "<td>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["colspan", "음이 아닌 정수(기본 1, 1000에서 자름)", "차지할 열 수"],
              ["rowspan", "음이 아닌 정수(기본 1, 65534에서 자름)", "차지할 행 수. 0이면 그 행 묶음 끝까지"],
              ["headers", "빈칸으로 나눈 th의 id 목록", "이 칸의 제목 칸들"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: scope 오타와 headers",
        body: "둘째 th의 scope는 \"column\"으로 잘못 적었습니다. 모르는 값이라 지금 값의 th.scope가 빈 글자입니다. 브라우저는 이 제목의 방향을 스스로 짐작합니다. 오타가 화면에는 아무 흔적도 남기지 않는다는 점에 주의합니다. td의 headers에는 그 칸의 제목 th들의 id를 적었습니다. 지금 값의 둘째 줄은 headers를 따라가 제목을 이어 붙인 것입니다. 1분기 쪽은 abbr이 있어서 짧은 이름 '1분기'가 쓰였습니다.",
        lab: {
          html: `<table border="1">
  <tr>
    <td></td>
    <th id="q1" scope="col" abbr="1분기">1분기 매출</th>
    <th id="q2" scope="column">2분기 매출</th>
  </tr>
  <tr>
    <th id="seoul" scope="row">서울</th>
    <td headers="seoul q1">120</td>
    <td headers="seoul q2">130</td>
  </tr>
</table>`,
          height: 120,
          checks: [
            { label: "scope 속성 → th.scope", expr: "[...document.querySelectorAll('th')].map((th) => th.getAttribute('scope') + ' → ' + (th.scope || '(빈 글자)'))" },
            {
              label: "headers로 이은 제목",
              expr: "[...document.querySelectorAll('td[headers]')].map((td) => td.headers.split(' ').map((id) => { const th = document.getElementById(id); return th.abbr || th.textContent; }).join(' + ') + ' = ' + td.textContent)",
            },
          ],
          tryIt: "\"column\"을 \"col\"로 고쳐 보세요. th.scope가 \"col\"로 바뀝니다. q2에 abbr=\"2분기\"를 더해 보세요.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "표의 실수는 화면에 잘 드러나지 않습니다. 열 스타일이 조용히 무시되거나, 낭독기만 제목을 잘못 읽습니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["col에 text-align: right를 줬다", "칸의 글자가 그대로다", "칸 선택자(td:nth-child(2) 등)로 준다"],
              ["tr이나 td에 배경을 주고 col에도 줬다", "열 배경이 가려져 보이지 않는다", "열 배경이 보여야 하는 칸은 배경을 비운다"],
              ["tfoot을 tbody 앞에 적었다", "화면에서는 아래에 그려져 티가 안 나지만 규칙에 어긋난다", "tfoot은 표의 맨 끝에 둔다"],
              ["scope=\"column\"처럼 값을 틀렸다", "모르는 값이라 무시되고 브라우저가 방향을 짐작한다", "row, col, rowgroup, colgroup 중에서 쓴다"],
              ["td에 scope나 abbr를 적었다", "td에서는 옛 속성이라 제목으로 쓰이지 않는다", "제목 칸이면 th로 바꾼다"],
              ["colspan, rowspan으로 칸을 겹치게 걸었다", "규칙 위반이고 칸이 어디에 그려질지 알기 어렵다", "칸이 겹치지 않게 다시 세거나 표를 나눈다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) col에 준 배경은 보이는데 text-align은 왜 먹지 않나요?\n2) tfoot을 tbody보다 앞에 적으면 화면과 table.rows에서 각각 어디에 놓이나요?\n3) th의 scope에 모르는 값을 적으면 th.scope는 무엇을 돌려주나요?\n4) td의 headers에는 무엇을 적나요?",
      },
    ],
    sources: [
      { label: "MDN — <table>", href: `${REF}/Elements/table` },
      { label: "MDN — <caption>", href: `${REF}/Elements/caption` },
      { label: "MDN — <colgroup>", href: `${REF}/Elements/colgroup` },
      { label: "MDN — <col>", href: `${REF}/Elements/col` },
      { label: "MDN — <th>", href: `${REF}/Elements/th` },
      { label: "MDN — <td>", href: `${REF}/Elements/td` },
    ],
  },
  {
    id: "html-tag-form",
    name: "폼 칸과 버튼 태그",
    tagline: "값을 받는 칸과 그 값을 보내는 버튼",
    intro:
      "폼은 칸 여러 개와 버튼으로 이루어집니다. 이 시트는 <form>, <label>, <input>, <button>, <select>, <option>, <optgroup>, <datalist>, <textarea>의 속성을 한곳에 모은 참고서입니다. 값을 모아 보내는 흐름(name, method, action), button의 기본 type, label 클릭은 12장에서, 검증은 13장에서 실험했습니다. 여기서는 속성 표를 빠짐없이 적고, 장에서 다루지 않은 동작을 작은 창에서 확인합니다. 누른 버튼의 값, select와 option의 값, datalist의 제안, 처음 값과 지금 값입니다. input의 type별 차이는 'input의 type 값' 시트에 따로 모았습니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "폼 칸들은 name, disabled, form, autofocus 같은 속성을 함께 씁니다. 태그마다 표에 다시 적었으니, 찾는 태그의 표만 보면 됩니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<form>", "칸을 모아 보내는 구역", "accept-charset, action, autocomplete, enctype, method, name, novalidate, rel, target", "12장 · 폼과 버튼"],
              ["<label>", "칸의 이름표", "for", "12장 · 폼과 버튼"],
              ["<input>", "한 줄 칸, 체크 상자, 버튼 등\n(type이 모양을 정함)", "type, name, value 외 30여 개", "13장 · 폼 검증"],
              [
                "<button>",
                "누르는 버튼",
                "type, name, value, disabled, form, formaction 등 form* 다섯, command, commandfor, popovertarget, popovertargetaction, autofocus",
                "12장 · 폼과 버튼",
              ],
              ["<select>", "항목 중에서 고르는 칸", "autocomplete, autofocus, disabled, form, multiple, name, required, size", ""],
              ["<option>", "목록의 한 항목", "disabled, label, selected, value", ""],
              ["<optgroup>", "option 묶음", "disabled, label", ""],
              ["<datalist>", "칸에 붙는 제안 목록", "없음 (input의 list로 잇는다)", ""],
              ["<textarea>", "여러 줄 글 칸", "rows, cols, wrap, maxlength, minlength, placeholder, readonly, required 외", ""],
            ],
          },
        ],
      },
      {
        label: "<form>",
        body: "칸들을 모아 한 번에 보내는 구역입니다. 보내기 버튼을 누르면 안의 칸 값을 name=값 짝으로 모아 action 주소로 보냅니다. 기본은 GET이라 값이 주소의 ? 뒤에 붙습니다(12장). 검색 폼, 로그인 폼, 주문 폼처럼 값을 서버나 스크립트로 넘길 때 씁니다.\n\n주의할 점이 둘 있습니다.\n(1) form 안에 form을 넣을 수 없습니다. 파서가 안쪽 <form> 시작 태그를 무시해서, 안쪽 칸이 바깥 폼에 들어갑니다. 떨어진 칸은 그 칸의 form 속성에 폼의 id를 적어 잇습니다.\n(2) 파일을 보내려면 method=\"post\"와 enctype=\"multipart/form-data\"를 함께 적습니다.\n\n옛 속성 accept는 쓰지 않습니다(input type=\"file\"의 accept로). autocapitalize는 전역 속성이라 표에서 뺐습니다.",
        tables: [
          {
            caption: "<form>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["action", "URL", "보낼 주소입니다. 없으면 지금 문서의 주소입니다. 버튼의 formaction이 덮어씁니다. method=\"dialog\"면 무시합니다"],
              ["method", "get (기본), post, dialog", "get은 값을 주소 뒤에, post는 요청 본문에 담습니다. dialog는 보내지 않고 감싼 dialog를 닫습니다"],
              [
                "enctype",
                "application/x-www-form-urlencoded (기본), multipart/form-data, text/plain",
                "post일 때 본문의 모양입니다. 파일이 있으면 multipart/form-data, text/plain은 디버깅용입니다",
              ],
              ["target", "_self (기본), _blank, _parent, _top, 창 이름", "응답을 띄울 창입니다. _blank는 rel=\"noopener\"처럼 opener를 주지 않습니다"],
              ["novalidate", "불 속성", "보낼 때 검증하지 않습니다(13장). 없을 때는 버튼의 formnovalidate로 그 버튼만 건너뜁니다"],
              ["autocomplete", "on (기본), off", "안 칸들의 자동 완성 기본값입니다. 칸의 autocomplete가 이깁니다"],
              ["rel", "noopener, noreferrer, opener, nofollow, external, help, license, next, prev, search", "링크의 rel처럼 폼이 만드는 이동의 관계를 적습니다(7장)"],
              ["name", "비어 있지 않은 이름", "document.forms에서 이 이름으로 폼을 꺼냅니다"],
              ["accept-charset", "UTF-8", "서버가 받는 문자 인코딩입니다. 표준이 허용하는 값은 UTF-8 하나입니다"],
            ],
          },
        ],
        terms: [
          {
            term: "폼 주인 (form owner)",
            body: "칸이 속한 폼입니다. 보통 칸을 감싼 <form>이고, 칸에 form 속성이 있으면 그 id의 폼입니다. 앉은 자리와 상관없이 출석부에 적힌 반이 그 학생의 반인 것과 같습니다.",
          },
          {
            term: "multipart/form-data",
            body: "값마다 칸을 나눠 담는 본문 형식입니다. 글뿐 아니라 파일 내용도 실을 수 있습니다. 기본 형식(urlencoded)은 파일 칸이 있어도 파일 이름만 보냅니다. 편지 한 장과 칸막이 상자의 차이입니다.",
          },
        ],
      },
      {
        label: "<label>",
        body: "칸에 붙는 이름표입니다. 낭독기는 칸에 포커스가 가면 label의 글을 읽습니다. label을 누르면 브라우저가 연결된 칸에 포커스와 클릭을 넘깁니다(12장). 잇는 방법은 둘입니다. for에 칸의 id를 적거나, 칸을 label 안에 넣습니다. MDN은 for로 잇기를 권합니다. 한 칸에 label 여러 개를 이어도 됩니다. 이을 수 있는 칸은 button, input(hidden 빼고), meter, output, progress, select, textarea입니다.\n\n주의할 점이 둘 있습니다.\n(1) label 안에 링크나 버튼을 넣지 않습니다. 칸을 누르기 어려워집니다.\n(2) label 안에 제목(h1~h6)을 넣지 않습니다. 폼 구역의 제목은 fieldset의 legend로 붙입니다.",
        tables: [
          {
            caption: "<label>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [["for", "칸의 id", "같은 문서에서 그 id를 가진 첫 칸과 잇습니다. 자바스크립트에서는 htmlFor입니다"]],
          },
        ],
      },
      {
        label: "<input>",
        body: "값을 받는 칸입니다. type에 따라 글 칸, 체크 상자, 날짜 고르개, 버튼까지 됩니다. type이 없거나 모르는 값이면 text입니다. 빈 요소라 닫는 태그가 없습니다.\n\nvalue 속성은 처음 값입니다. 사용자가 고친 지금 값은 .value 프로퍼티에 있고, 처음 값은 .defaultValue에 남습니다. placeholder는 이름이 아닙니다. 글을 치면 사라지니 label을 따로 붙입니다. id, title, tabindex, inputmode, autocapitalize는 전역 속성이라 표에서 뺐습니다. type마다 쓰는 속성과 값의 형식은 'input의 type 값' 시트에 있습니다.",
        tables: [
          {
            caption: "<input>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["type", "22가지 중 하나 (기본 text)", "칸의 종류를 정합니다"],
              ["name", "문자열", "보낼 때의 이름입니다. 없으면 보내지 않습니다"],
              ["value", "문자열", "처음 값입니다. 체크 상자와 라디오는 켜졌을 때 보낼 값, 버튼은 글자입니다"],
              ["disabled", "불 속성", "누를 수도 고칠 수도 없고, 보내지도 않습니다"],
              ["readonly", "불 속성", "고칠 수 없지만 값은 보냅니다. 글, 날짜, 숫자 칸에만"],
              ["required", "불 속성", "비어 있으면 보내지 않습니다(13장)"],
              ["form", "form의 id", "폼 밖에 있어도 그 폼의 칸이 됩니다"],
              ["autofocus", "불 속성", "페이지가 열리면(dialog 안이면 dialog가 열리면) 포커스를 받습니다"],
              ["autocomplete", "on, off, email, new-password 같은 낱말", "자동 완성의 종류입니다. 불 속성이 아닙니다"],
              ["placeholder", "짧은 글", "비어 있을 때 보이는 예시입니다"],
              ["list", "datalist의 id", "제안 목록을 붙입니다"],
              ["min, max, step", "숫자나 날짜, 시간", "범위와 간격입니다. 숫자, 날짜, 시간, range 칸에만"],
              ["minlength, maxlength", "0 이상 정수", "글자 수(UTF-16 코드 단위)의 범위입니다. 글 칸에만"],
              ["pattern", "정규식", "값 전체가 맞아야 합니다. 글 칸에만"],
              ["size", "양의 정수", "보이는 칸 너비(글자 수 기준)입니다. 글 칸에만"],
              ["multiple", "불 속성", "email은 주소 여럿, file은 파일 여럿을 받습니다"],
              ["checked", "불 속성", "checkbox, radio를 처음에 켜 둡니다"],
              ["dirname", "이름", "글의 방향(ltr, rtl)을 이 이름으로 함께 보냅니다"],
              ["accept, capture, webkitdirectory", "파일 형식 목록, user나 environment, 불 속성", "file 칸에만. 고를 형식, 찍을 카메라, 폴더 고르기입니다"],
              ["src, alt, width, height", "URL, 글, 픽셀", "image 버튼에만. 그림과 대체 글, 크기입니다"],
              [
                "formaction, formenctype, formmethod, formnovalidate, formtarget",
                "form의 속성과 같음",
                "submit, image 버튼에만. 이 버튼으로 보낼 때 form의 값을 덮어씁니다",
              ],
              ["popovertarget, popovertargetaction", "popover의 id, toggle (기본), show, hide", "type=\"button\"에만. 팝오버를 여닫습니다(14장)"],
              ["switch (실험)", "불 속성", "checkbox를 켜고 끄는 스위치로 바꿉니다"],
              ["alpha, colorspace (실험)", "불 속성, limited-srgb (기본), display-p3", "color 칸에만. 투명도와 색 공간을 고르게 합니다"],
            ],
          },
        ],
        terms: [
          {
            term: "처음 값 (defaultValue)",
            body: "HTML에 적힌 처음 값입니다. input은 value 속성, textarea는 태그 사이 글이 처음 값입니다. 사용자가 고쳐도 그대로 남고, reset을 누르면 이 값으로 돌아갑니다. 책에 인쇄된 글(처음 값)과 그 위에 연필로 고쳐 쓴 글(지금 값)의 차이입니다.",
          },
        ],
      },
      {
        label: "<button>",
        body: "누르는 버튼입니다. 안에 글, 아이콘, 이미지를 넣을 수 있어 input type=\"button\"보다 꾸미기 쉽습니다. 폼 안에서 type을 적지 않으면 submit이라 폼을 보냅니다(12장). 보내기가 아닌 버튼에는 type=\"button\"을 적습니다.\n\n주의할 점이 둘 있습니다.\n(1) 아이콘만 있는 버튼은 낭독기가 읽을 이름이 없습니다. 하는 일을 글로 버튼 안에 넣습니다.\n(2) formaction 같은 form* 속성은 폼 주인이 없으면 아무 일도 하지 않습니다.",
        tables: [
          {
            caption: "<button>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["type", "submit (기본), reset, button", "누를 때의 기본 동작입니다. 빈 값이나 틀린 값도 submit입니다"],
              ["name, value", "문자열", "이 버튼으로 보낼 때만 name=value가 함께 갑니다"],
              ["disabled", "불 속성", "누를 수도, 포커스할 수도 없습니다"],
              ["form", "form의 id", "폼 밖에 있어도 그 폼의 버튼이 됩니다"],
              ["formaction", "URL", "이 버튼으로 보낼 때 form의 action을 덮어씁니다"],
              ["formmethod", "get, post, dialog", "form의 method를 덮어씁니다"],
              ["formenctype", "form의 enctype과 같음", "form의 enctype을 덮어씁니다"],
              ["formtarget", "_self, _blank, _parent, _top, 창 이름", "form의 target을 덮어씁니다"],
              ["formnovalidate", "불 속성", "이 버튼으로 보낼 때 검증을 건너뜁니다(13장)"],
              ["commandfor", "요소의 id", "명령을 받을 요소입니다(14장)"],
              [
                "command",
                "show-modal, close, request-close, show-popover, hide-popover, toggle-popover, --이름",
                "commandfor 요소에 보낼 명령입니다. close와 request-close는 value를 dialog의 returnValue로 넘깁니다",
              ],
              ["popovertarget", "popover의 id", "그 팝오버를 여닫습니다(14장)"],
              ["popovertargetaction", "toggle (기본), show, hide", "여닫기 중 무엇을 할지 정합니다"],
              ["autofocus", "불 속성", "페이지가 열리면 포커스를 받습니다. 문서에 하나만 둡니다"],
              ["interestfor (실험)", "요소의 id", "마우스를 올리거나 포커스하면 그 요소를 보이거나 숨깁니다"],
            ],
          },
        ],
        terms: [
          {
            term: "접근 이름 (accessible name)",
            body: "낭독기 같은 보조 기술이 요소를 부르는 이름입니다. 버튼은 안의 글이, 칸은 이어진 label이 이름이 됩니다. 이름이 없으면 그냥 '버튼'으로만 읽힙니다. 문패 없는 집과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 누른 버튼의 name=value",
        body: "같은 name을 가진 보내기 버튼이 둘 있습니다. '저장'을 누르면 기록의 submit 줄에 누른 버튼이 찍히고, 보낼 값에 act=\"save\"가 함께 담깁니다. 다시 실행하고 '지우기'를 누르면 act=\"delete\"입니다. 누르지 않은 버튼의 값은 가지 않습니다. 셋째 버튼은 type=\"button\"이라 name과 value가 있어도 아무것도 보내지 않습니다. 지금 값을 보면 type을 적지 않은 두 버튼도 \"submit\"입니다. 서버는 act 값 하나로 어느 버튼을 눌렀는지 압니다.",
        lab: {
          html: `<form action="target.html">
  <input name="item" value="사과 2개">
  <button name="act" value="save">저장</button>
  <button name="act" value="delete">지우기</button>
  <button type="button" name="act" value="none">그냥 버튼</button>
</form>`,
          height: 140,
          checks: [
            { label: "button.type", expr: "[...document.querySelectorAll('button')].map((b) => b.textContent + '=' + b.type)" },
          ],
          tryIt: '지우기 버튼에 formaction="target.html#deleted"를 붙여 보세요. 그 버튼으로 보낼 때만 주소가 바뀝니다.',
        },
      },
      {
        label: "<select>",
        body: "정해진 항목 중에서 고르는 칸입니다. 항목은 안에 둔 <option>이고, 보낼 값은 고른 option의 value입니다. 처음에는 selected가 붙은 option이, 없으면 첫 option이 골라져 있습니다. 지금 고른 값은 select.value로 읽습니다.\n\nmultiple을 붙이면 여러 개를 고르고, 보낼 때 name=값1&name=값2처럼 같은 이름을 되풀이합니다. size가 1보다 크거나 multiple이 있으면 펼친 목록 상자로, 아니면 드롭다운으로 그립니다. required일 때는 자리 표시 option만 골라진 상태를 빈 것으로 봅니다.\n\n주의할 점이 둘 있습니다.\n(1) multiple을 쓰면 여러 개를 고를 수 있다고 글로 알립니다.\n(2) size 속성이 없을 때 select.size 프로퍼티는 옛 호환 때문에 0을 돌려줍니다.",
        tables: [
          {
            caption: "<select>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["name", "문자열", "보낼 때의 이름입니다"],
              ["multiple", "불 속성", "여러 개를 고릅니다. size 기본이 4가 됩니다"],
              ["size", "양의 정수", "닫힌 상태에서 보이는 항목 수입니다. 기본 1 (multiple이면 4)"],
              ["required", "불 속성", "고른 것이 없거나 자리 표시 option만 골랐으면 걸립니다"],
              ["disabled", "불 속성", "고를 수 없고 보내지 않습니다. 없으면 fieldset의 disabled를 따릅니다"],
              ["form", "form의 id", "폼 밖에 있어도 그 폼의 칸이 됩니다"],
              ["autofocus", "불 속성", "페이지가 열리면 포커스를 받습니다"],
              ["autocomplete", "on, off, country 같은 낱말", "자동 완성의 종류입니다"],
            ],
          },
        ],
        terms: [
          {
            term: "자리 표시 option (placeholder label option)",
            body: "select의 첫 직계 option이면서 value가 빈 option입니다. '-- 고르세요 --'처럼 고르기 전 안내만 하는 항목으로 봅니다. size가 1이고 multiple이 없을 때만 그렇게 봅니다. 메뉴판 맨 위의 '메뉴를 고르세요' 줄입니다.",
          },
        ],
      },
      {
        label: "<option>",
        body: "select, optgroup, datalist 안의 한 항목입니다. value가 없으면 글 내용이 값이 되고, label이 없으면 글 내용이 보이는 이름이 됩니다. selected 속성은 처음 고른 상태입니다. 사용자가 바꾼 지금 상태는 .selected 프로퍼티에 있습니다. 주의할 점이 하나 있습니다. 화면 글을 번역하는 페이지라면 value를 꼭 적습니다. value가 없으면 번역된 글이 그대로 서버로 갑니다.",
        tables: [
          {
            caption: "<option>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["value", "문자열", "골랐을 때 보낼 값입니다. 없으면 글 내용"],
              ["label", "글", "보이는 이름입니다. 없으면 글 내용"],
              ["selected", "불 속성", "처음에 골라 둡니다. multiple이 없으면 하나에만"],
              ["disabled", "불 속성", "고를 수 없습니다. disabled인 optgroup 안이어도 그렇습니다"],
            ],
          },
        ],
      },
      {
        label: "<optgroup>",
        body: "select 안의 option을 이름 붙은 묶음으로 나눕니다. 묶음 이름은 label 속성에 적고, 이 속성은 꼭 있어야 합니다. optgroup 안에 optgroup을 넣을 수 없습니다. disabled를 붙이면 묶음 안 option을 모두 고를 수 없습니다. 모양을 바꿀 수 있는 새 select에서는 optgroup 안에 legend를 두어 label 대신 쓸 수도 있습니다.",
        tables: [
          {
            caption: "<optgroup>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["label", "글 (필수)", "묶음의 이름입니다"],
              ["disabled", "불 속성", "묶음 안 option을 모두 고를 수 없게 합니다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: select의 값과 option",
        body: "처음에는 selected가 없어서 첫 option이 골라져 있고, value가 빈 문자열입니다. '배'를 고르면 기록에 change가 찍히고 value가 \"배\"가 됩니다. 그 option에 value가 없어서 글 내용이 값이 된 것입니다. '사과'는 value=\"apple\"이라 화면 글과 보낼 값이 다릅니다. '품절' 묶음은 disabled라 고를 수 없습니다. 지금 값의 selectedIndex는 고른 option의 순서(0부터)이고, optgroup은 순서에 세지 않습니다.",
        lab: {
          html: `<select id="s" name="fruit">
  <option value="">-- 고르세요 --</option>
  <optgroup label="과일">
    <option value="apple">사과</option>
    <option>배</option>
  </optgroup>
  <optgroup label="품절" disabled>
    <option value="melon">멜론</option>
  </optgroup>
</select>`,
          height: 150,
          checks: [
            { label: "select.value", expr: "JSON.stringify(document.getElementById('s').value)" },
            { label: "selectedIndex", expr: "document.getElementById('s').selectedIndex" },
            { label: "option 글 → value", expr: "[...document.getElementById('s').options].map((o) => o.text + '→' + o.value)" },
          ],
          tryIt: "select에 multiple을 붙여 보세요. 목록 상자로 바뀌고, 여러 개를 고르면 select.value는 그중 첫 값만 돌려줍니다.",
        },
      },
      {
        label: "<datalist>",
        body: "칸에 붙는 제안 목록입니다. 안에 <option>을 두고, 칸의 list 속성에 datalist의 id를 적어 잇습니다. 제안을 고르면 option의 value가 칸에 들어갑니다. select와 달리 목록에 없는 값도 적을 수 있고, 목록 밖의 값이라고 검증에 걸리지 않습니다. 글 칸(text, search, url, tel, email)과 number에서는 드롭다운으로, range에서는 눈금으로, color에서는 색 견본으로 보입니다. 날짜와 시간 칸에서는 고르개 안에 보입니다. 실제 모양은 브라우저마다 다릅니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다. 접근성에서 주의할 점이 있습니다. 제안 목록의 글자는 페이지를 확대해도 커지지 않습니다. 낭독기와 브라우저 조합에 따라 제안을 읽지 않기도 합니다.",
      },
      {
        label: "직접 해 보기: datalist 제안",
        body: "칸을 누르거나 글자를 치면 제안이 뜹니다. 하나를 고르면 그 option의 value가 칸에 들어가고, 기록에 input이 찍힙니다. 복숭아처럼 label이 있으면 브라우저에 따라 label을 대신, 또는 함께 보여 줍니다. 그래도 칸에 들어가는 것은 늘 value입니다. 목록에 없는 '포도'를 쳐도 validity.valid는 true입니다. datalist는 '이 중에서만'이 아니라 '이런 값은 어떠세요'입니다. 지금 값의 마지막 줄은 input.list로 이어진 datalist의 option입니다.",
        lab: {
          html: `<label for="f">과일</label>
<input id="f" name="fruit" list="fruits">
<datalist id="fruits">
  <option value="사과"></option>
  <option value="바나나"></option>
  <option value="복숭아" label="여름 과일"></option>
</datalist>`,
          height: 200,
          checks: [
            { label: "input.value", expr: "JSON.stringify(document.getElementById('f').value)" },
            { label: "validity.valid", expr: "document.getElementById('f').validity.valid" },
            { label: "list의 option", expr: "[...document.getElementById('f').list.options].map((o) => o.value)" },
          ],
          logInput: true,
          tryIt: 'input에 type="range" min="0" max="100"을 붙이고 option의 value를 0, 50, 100으로 바꿔 보세요. 막대에 눈금이 생깁니다.',
        },
      },
      {
        label: "<textarea>",
        body: "여러 줄 글을 받는 칸입니다. 처음 값은 value 속성이 아니라 태그 사이에 적습니다. 그래서 빈 요소가 아니고 닫는 태그가 꼭 있습니다. 자바스크립트에서 지금 값은 .value, 처음 값은 .defaultValue입니다. defaultValue는 태그 사이 글(textContent)과 같습니다. 그래서 사용자가 글을 쳐도 textContent는 바뀌지 않습니다.\n\nrows 기본은 2줄, cols 기본은 20글자 너비입니다. 대부분의 브라우저는 오른쪽 아래 손잡이로 크기를 바꾸게 하고, CSS resize: none으로 끕니다. autocapitalize, autocorrect, spellcheck는 전역 속성이라 표에서 뺐습니다.",
        tables: [
          {
            caption: "<textarea>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["rows", "양의 정수", "보이는 줄 수입니다. 기본 2"],
              ["cols", "양의 정수", "보이는 너비(평균 글자 수)입니다. 기본 20"],
              ["wrap", "soft (기본), hard, off", "보낼 값의 줄바꿈입니다. soft는 사용자가 친 줄바꿈만, hard는 cols 너비마다 줄바꿈을 더 넣습니다(cols 필요). off는 비표준입니다"],
              ["maxlength, minlength", "0 이상 정수", "글자 수(UTF-16 코드 단위)의 범위입니다"],
              ["placeholder", "글", "비어 있을 때 보이는 예시입니다. 줄바꿈도 그대로 보입니다"],
              ["readonly", "불 속성", "고칠 수 없지만 누르고 고를 수 있고, 값은 보냅니다"],
              ["required", "불 속성", "비어 있으면 보내지 않습니다"],
              ["disabled", "불 속성", "고칠 수 없고 보내지 않습니다"],
              ["name", "문자열", "보낼 때의 이름입니다"],
              ["form", "form의 id", "폼 밖에 있어도 그 폼의 칸이 됩니다"],
              ["autocomplete", "on, off, 자동 완성 낱말", "적지 않으면 폼 주인의 autocomplete를 따릅니다"],
              ["autofocus", "불 속성", "페이지가 열리면 포커스를 받습니다"],
              ["dirname", "이름", "글의 방향을 이 이름으로 함께 보냅니다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 처음 값과 지금 값",
        body: "두 칸 모두 HTML에 적힌 글이 처음 값입니다. 칸에 글을 더 쳐 보세요. 지금 값의 .value만 바뀌고, input의 value 속성과 textarea의 textContent는 그대로입니다. '되돌리기'를 누르면 기록에 reset이 찍히고, 두 칸의 .value가 처음 값으로 돌아갑니다. 스크립트에서 처음 값은 defaultValue로, 지금 값은 언제나 .value로 읽습니다.",
        lab: {
          html: `<form action="target.html">
  <p><input id="i" name="title" value="처음 제목"></p>
  <p><textarea id="t" name="body" rows="3" cols="30">처음 본문</textarea></p>
  <button type="reset">되돌리기</button>
</form>`,
          height: 190,
          checks: [
            { label: "input의 value 속성", expr: "document.getElementById('i')?.getAttribute('value')" },
            { label: "input.value", expr: "document.getElementById('i')?.value" },
            { label: "textarea.textContent", expr: "document.getElementById('t')?.textContent" },
            { label: "textarea.value", expr: "document.getElementById('t')?.value" },
          ],
          tryIt: 'textarea에 value="속성 값"을 붙여 보세요. 아무것도 바뀌지 않습니다. textarea에는 value 속성이 없습니다.',
        },
      },
      {
        label: "문제가 나는 경우",
        body: "폼 태그의 문제는 대개 처음 값과 보내는 값을 헷갈려 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["form 안에 form을 넣었다", "파서가 안쪽 <form>을 무시해 칸이 바깥 폼으로 간다", "폼을 나란히 두고, 칸의 form 속성으로 잇는다"],
              ["파일 칸이 있는 폼을 기본 enctype으로 보냈다", "파일 내용 없이 이름만 간다", "method=\"post\" enctype=\"multipart/form-data\""],
              ["option에 value 없이 화면 글만 적었다", "화면 글을 번역하면 보내는 값도 바뀐다", "value에 바뀌지 않는 코드를 적는다"],
              ["datalist로 '이 중에서만' 고르게 했다", "목록 밖의 값도 그대로 들어온다", "고르기만 허용하려면 select를 쓴다"],
              ["textarea에 value 속성으로 처음 값을 적었다", "무시되어 빈 칸으로 나온다", "태그 사이에 적는다"],
              ["getAttribute('value')로 칸 값을 읽었다", "사용자가 고친 값이 아니라 처음 값이 나온다", ".value를 읽는다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) value가 없는 option을 고르면 무엇을 보내나요?\n2) 같은 name의 보내기 버튼 둘 중 하나를 누르면 어느 값이 가나요?\n3) datalist에 없는 값을 적으면 검증에 걸리나요?\n4) 사용자가 textarea에 글을 친 뒤 textContent는 바뀌나요?",
      },
    ],
    sources: [
      { label: "MDN — <form>", href: `${REF}/Elements/form` },
      { label: "MDN — <input>", href: `${REF}/Elements/input` },
      { label: "MDN — <button>", href: `${REF}/Elements/button` },
      { label: "MDN — <select>", href: `${REF}/Elements/select` },
      { label: "MDN — <datalist>", href: `${REF}/Elements/datalist` },
      { label: "MDN — <textarea>", href: `${REF}/Elements/textarea` },
    ],
  },

  {
    id: "html-tag-formgroup",
    name: "폼 묶음과 결과 태그",
    tagline: "칸을 묶고, 결과와 진행을 보여 준다",
    intro:
      "폼이 길어지면 칸을 묶고 제목을 붙여야 읽기 쉽습니다. <fieldset>과 <legend>가 그 일을 합니다. 폼에는 값을 받는 칸만 있는 것이 아닙니다. <output>은 계산 결과를, <progress>는 작업이 얼마나 끝났는지를, <meter>는 정해진 범위 안의 양을 보여 줍니다. 이 시트는 다섯 태그의 속성을 모으고, 작은 창에서 네 가지를 확인합니다. fieldset의 disabled가 무엇을 끄는지, output의 값이 보내지는지, progress와 meter가 값을 어떻게 읽는지입니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "fieldset과 output은 폼에 속하는 요소라 form 속성으로 떨어진 폼에도 이을 수 있습니다. progress와 meter는 폼 밖에서도 그냥 씁니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<fieldset>", "칸 묶음", "disabled, form, name", ""],
              ["<legend>", "fieldset의 제목", "없음", ""],
              ["<output>", "계산이나 동작의 결과", "for, form, name", ""],
              ["<progress>", "작업이 끝난 정도", "max, value", ""],
              ["<meter>", "범위 안의 양", "value, min, max, low, high, optimum", ""],
            ],
          },
        ],
      },
      {
        label: "<fieldset>",
        body: "관련 칸들을 한 묶음으로 둡니다. 같은 질문에 답하는 라디오 단추들이 대표적입니다. 첫 자식으로 <legend>를 두면 묶음의 제목이 됩니다. 기본 모양은 칸들을 두른 홈 파인 테두리와 약간의 여백이고, legend는 위 테두리에 걸쳐 그려집니다. 낭독기에는 group 역할로 알려집니다.\n\ndisabled를 붙이면 안의 모든 칸이 꺼집니다. 꺼진 칸은 고칠 수 없고, 보내지 않고, 클릭이나 포커스 이벤트를 받지 않습니다. 단 첫 legend 안의 칸은 꺼지지 않습니다.\n\n주의할 점이 하나 있습니다. fieldset의 form 속성은 안의 칸을 그 폼에 넣지 않습니다. MDN도 이 속성이 헷갈린다고 적습니다. 안의 칸을 다른 폼에 이으려면 칸마다 form을 적습니다.",
        tables: [
          {
            caption: "<fieldset>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["disabled", "불 속성", "안의 칸을 모두 끕니다. 첫 legend 안의 칸은 빼고"],
              ["form", "form의 id", "fieldset 자신만 그 폼에 속합니다. 안의 칸은 따로 form을 적습니다"],
              ["name", "문자열", "묶음의 이름입니다. form.elements에서 이 이름으로 꺼냅니다"],
            ],
          },
        ],
        terms: [
          {
            term: "읽기 전용과 꺼짐 (readonly, disabled)",
            body: "readonly 칸은 고칠 수만 없고, 포커스를 받고 값도 보냅니다. disabled 칸은 누를 수도 포커스할 수도 없고, 값도 보내지 않습니다. 유리 진열장 속 물건(보이고 목록에 있음)과 창고에 넣은 물건(목록에서 빠짐)의 차이입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: fieldset의 disabled",
        body: "처음에는 fieldset이 disabled라 주소 칸과 '주소 찾기' 버튼이 흐립니다. '주소 찾기'를 눌러 보세요. 꺼진 버튼은 클릭 이벤트를 받지 않아 기록에 아무것도 찍히지 않습니다. 지금 보내면에도 addr가 없습니다. legend 안의 체크 상자는 예외라 누를 수 있습니다. 체크하면 onchange가 fieldset.disabled를 false로 바꿔 칸들이 살아납니다. 이제 버튼을 누르면 '눌림'이 출력되고, 보낼 값에 addr가 생깁니다.",
        lab: {
          html: `<form action="target.html">
  <fieldset id="f" disabled>
    <legend><label><input type="checkbox"
      onchange="this.closest('fieldset').disabled = !this.checked"> 배송지 바꾸기</label></legend>
    <input name="addr" value="서울시">
    <button type="button" onclick="console.log('눌림')">주소 찾기</button>
  </fieldset>
</form>`,
          height: 150,
          checks: [
            {
              label: ":disabled",
              expr: "[...document.querySelectorAll('#f input, #f button')].map((e) => (e.name || e.type) + '=' + e.matches(':disabled'))",
            },
            {
              label: "지금 보내면 (FormData)",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + v) : '(폼 없음)'",
            },
          ],
          tryIt: "체크 상자를 legend 밖으로 옮겨 보세요. 그 상자도 함께 꺼져서 다시 켤 길이 없어집니다.",
        },
      },
      {
        label: "<legend>",
        body: "부모 fieldset의 제목입니다. fieldset의 첫 자식이어야 하고, fieldset 묶음의 이름은 이 첫 legend가 정합니다. 글과 글 안에 쓰는 요소, 제목 요소(h1~h6)를 담을 수 있습니다. 폼이나 폼 구역에 제목이 필요하면 label 안에 제목 요소를 넣지 말고 legend를 씁니다. 모양을 바꿀 수 있는 새 select에서는 optgroup 안에도 둘 수 있습니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "<output>",
        body: "계산 결과나 사용자 동작의 결과를 넣는 칸입니다. 값은 스크립트가 .value에 넣고, .value는 글 내용과 같습니다. 많은 브라우저가 output을 라이브 영역으로 다룹니다. 그래서 결과가 바뀌면 포커스를 옮기지 않아도 낭독기가 새 글을 읽어 줍니다. 낭독은 글로만 하므로, 안에 넣은 링크나 버튼의 뜻은 전해지지 않을 수 있습니다.\n\n주의할 점이 하나 있습니다. output의 값, name, 내용은 폼과 함께 보내지 않습니다. 서버가 그 값을 받아야 하면 hidden 칸에 같은 값을 넣습니다.",
        tables: [
          {
            caption: "<output>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["for", "id 목록 (공백으로 나눔)", "계산에 쓰인 칸들입니다. 동작은 바꾸지 않고 관계만 적습니다"],
              ["form", "form의 id", "폼 밖에 있어도 그 폼의 요소가 됩니다"],
              ["name", "문자열", "form.elements에서 이 이름으로 꺼냅니다. 보내지는 않습니다"],
            ],
          },
        ],
        terms: [
          {
            term: "라이브 영역 (live region)",
            body: "내용이 바뀌면 보조 기술이 저절로 읽어 주는 영역입니다. 사용자가 그 자리로 포커스를 옮기지 않아도 됩니다. 보고 있지 않아도 들리는 기차역 안내 방송과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: output으로 합 보이기",
        body: "막대를 끌거나 숫자를 바꾸면 기록에 input이 찍히고, output에 두 값의 합이 들어갑니다. oninput은 칸이 아니라 form에 하나만 적었습니다. input 이벤트가 칸에서 폼으로 올라오기 때문입니다. 폼에 적은 인라인 핸들러 안에서는 a, b, sum처럼 칸의 name을 바로 쓸 수 있습니다. 지금 값의 form.elements에는 output이 있지만, 지금 보내면에는 a와 b뿐이고 sum은 없습니다.",
        lab: {
          html: `<form action="target.html" oninput="sum.value = a.valueAsNumber + b.valueAsNumber">
  <input type="range" id="a" name="a" value="50"> +
  <input type="number" id="b" name="b" value="10"> =
  <output name="sum" for="a b">60</output>
</form>`,
          height: 130,
          checks: [
            { label: "output.value", expr: "document.querySelector('output')?.value" },
            {
              label: "form.elements",
              expr: "document.forms[0] ? [...document.forms[0].elements].map((e) => e.localName + '[' + e.name + ']') : '(폼 없음)'",
            },
            {
              label: "지금 보내면 (FormData)",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + v) : '(폼 없음)'",
            },
          ],
          logInput: true,
          tryIt: "number 칸을 비워 보세요. valueAsNumber가 NaN이라 합도 NaN이 됩니다.",
        },
        terms: [
          {
            term: "이벤트 버블링 (bubbling)",
            body: "요소에서 난 이벤트가 부모, 그 부모로 차례로 올라가는 것입니다. 그래서 폼에 핸들러 하나만 두어도 모든 칸의 input을 받습니다. 각 층에서 낸 소리가 계단을 타고 1층까지 들리는 것과 같습니다.",
          },
        ],
      },
      {
        label: "<progress>",
        body: "작업이 얼마나 끝났는지 보여 주는 막대입니다. 파일 올리기, 설치 같은 진행에 씁니다. value는 0부터 max 사이이고, max 기본은 1입니다. min 속성은 없고 늘 0에서 시작합니다. value가 없으면 얼마나 걸릴지 모르는 상태가 되고, CSS의 :indeterminate에 걸립니다. 값을 준 뒤 다시 모름 상태로 돌리려면 value 속성을 지웁니다.\n\n주의할 점이 둘 있습니다.\n(1) 태그 사이 글은 접근 이름이 아니라 옛 브라우저용 대체 글입니다. label이나 aria-label로 이름을 붙입니다.\n(2) 페이지 한 구역을 불러오는 중이라면, 그 구역에 aria-busy=\"true\"를 두고 aria-describedby로 progress를 가리킵니다.",
        tables: [
          {
            caption: "<progress>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["value", "0 ~ max 사이 숫자", "끝난 양입니다. 없으면 모름 상태"],
              ["max", "0보다 큰 숫자", "전체 양입니다. 기본 1"],
            ],
          },
        ],
        terms: [
          {
            term: "모름 상태 (indeterminate)",
            body: "진행 중인 것은 알지만 얼마나 남았는지 모르는 상태입니다. progress는 value가 없을 때 이 상태입니다. 길 안내가 남은 시간 없이 '계산 중'이라고만 말하는 때와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: progress의 값과 모름 상태",
        body: "position은 value를 max로 나눈 값입니다. p1은 200 중 50이라 0.25입니다. p2는 value가 없는 모름 상태라 position이 -1이고, :indeterminate가 true이고, .value는 0입니다. '30 더하기'를 여러 번 눌러 보세요. value 속성이 max를 넘어도 .value는 max인 200에 머뭅니다. '지우기'를 누르면 value 속성이 지워져 p1도 모름 상태가 됩니다. 그 뒤 다시 더하면 0부터 셉니다.",
        lab: {
          html: `<p><label>올리는 중 <progress id="p1" max="200" value="50">50/200</progress></label></p>
<p><label>준비 중 <progress id="p2"></progress></label></p>
<button type="button" onclick="document.getElementById('p1').value += 30">30 더하기</button>
<button type="button" onclick="document.getElementById('p1').removeAttribute('value')">지우기</button>`,
          height: 160,
          checks: [
            { label: "position", expr: "[...document.querySelectorAll('progress')].map((p) => p.id + '=' + p.position)" },
            { label: "value", expr: "[...document.querySelectorAll('progress')].map((p) => p.id + '=' + p.value)" },
            {
              label: ":indeterminate",
              expr: "[...document.querySelectorAll('progress')].map((p) => p.id + '=' + p.matches(':indeterminate'))",
            },
          ],
        },
      },
      {
        label: "<meter>",
        body: "정해진 범위 안의 양을 보여 줍니다. 배터리 잔량, 시험 점수, 디스크 사용량처럼 '지금 얼마인가'를 나타냅니다. 작업의 진행이라면 progress를 씁니다. 범위는 min(기본 0)부터 max(기본 1)까지입니다. value가 없거나 틀리면 0이고, 범위 밖이면 가까운 끝으로 읽습니다.\n\nlow와 high는 범위를 낮음, 가운데, 높음 세 구간으로 나눕니다. optimum은 어느 구간이 좋은지 알려 줍니다. optimum이 low보다 낮으면 낮은 쪽이 좋은 것입니다. 브라우저는 value가 좋은 구간에 있는지에 따라 막대 색을 달리 칠할 수 있습니다. meter 안에 meter를 넣을 수 없습니다.",
        tables: [
          {
            caption: "<meter>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["value", "숫자", "지금 양입니다. 없거나 틀리면 0, 범위 밖이면 가까운 끝"],
              ["min", "숫자", "범위의 아래 끝입니다. 기본 0"],
              ["max", "숫자", "범위의 위 끝입니다. 기본 1"],
              ["low", "숫자", "낮은 구간의 위 끝입니다. 없거나 min보다 작으면 min"],
              ["high", "숫자", "높은 구간의 아래 끝입니다. 없거나 max보다 크면 max"],
              ["optimum", "숫자", "가장 좋은 값입니다. 어느 구간이 좋은지 정합니다"],
            ],
          },
        ],
        terms: [
          {
            term: "최적값 (optimum)",
            body: "범위 안에서 가장 바람직한 값입니다. 배터리는 높을수록, 오류 수는 낮을수록 좋으니 같은 막대라도 optimum이 다릅니다. 체온계에 그어진 '정상' 눈금처럼 좋은 자리를 알려 줍니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: meter의 범위와 optimum",
        body: "맨 위 막대를 끌면 두 meter의 value 속성이 같이 바뀝니다. 0부터 120까지 끌 수 있는데, meter의 max는 100입니다. 100을 넘기면 value 속성에는 그 숫자가 적히지만 .value는 100에 머뭅니다. 두 meter는 값과 구간이 같고 optimum만 반대입니다. 막대를 양 끝으로 끌어 보세요. 브라우저가 구간을 색으로 칠한다면 두 막대의 색이 서로 다르게 바뀝니다.",
        lab: {
          html: `<p>값 <input type="range" max="120" value="50"
  oninput="document.querySelectorAll('meter').forEach((m) => m.setAttribute('value', this.value))"></p>
<p>오류 수 (낮을수록 좋음) <meter low="30" high="70" max="100" optimum="0" value="50"></meter></p>
<p>배터리 (높을수록 좋음) <meter low="30" high="70" max="100" optimum="100" value="50"></meter></p>`,
          height: 170,
          checks: [
            { label: "value 속성", expr: "document.querySelector('meter').getAttribute('value')" },
            { label: "meter.value", expr: "[...document.querySelectorAll('meter')].map((m) => m.value)" },
            { label: "optimum", expr: "[...document.querySelectorAll('meter')].map((m) => m.optimum)" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이 태그들의 문제는 대개 '보내지는가'와 '무엇을 나타내는가'를 헷갈려 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["fieldset에 form 속성만 적었다", "안의 칸은 그 폼에 들어가지 않는다", "칸마다 form 속성을 적는다"],
              ["보여만 주려고 fieldset을 disabled로 했다", "꺼진 칸의 값은 서버로 가지 않는다", "칸마다 readonly를 쓴다"],
              ["output에 넣은 값을 서버에서 기다렸다", "output은 보내지 않는다", "hidden 칸에 같은 값을 넣는다"],
              ["준비 중을 value=\"0\"으로 나타냈다", "0에서 멈춘 막대로 읽힌다", "value를 빼서 모름 상태로 둔다"],
              ["디스크 사용량을 progress로 그렸다", "끝나 가는 작업으로 읽힌다", "범위 안의 양은 meter를 쓴다"],
              ["progress 사이 글을 이름으로 믿었다", "그 글은 접근 이름이 아니다", "label이나 aria-label을 붙인다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) disabled인 fieldset 안에서 누를 수 있는 칸은 어디에 있나요?\n2) output의 값은 폼과 함께 보내지나요?\n3) value가 없는 progress의 position은 얼마인가요?\n4) max가 100인 meter에 value=\"150\"을 적으면 .value는 얼마인가요?",
      },
    ],
    sources: [
      { label: "MDN — <fieldset>", href: `${REF}/Elements/fieldset` },
      { label: "MDN — <legend>", href: `${REF}/Elements/legend` },
      { label: "MDN — <output>", href: `${REF}/Elements/output` },
      { label: "MDN — <progress>", href: `${REF}/Elements/progress` },
      { label: "MDN — <meter>", href: `${REF}/Elements/meter` },
    ],
  },

  {
    id: "html-tag-interactive",
    name: "열고 닫는 태그",
    tagline: "누르면 열리고, 닫는 길은 속성이 정한다",
    intro:
      "누르면 펼쳐지는 칸과 대화 상자는 HTML 태그 셋으로 만듭니다. <details>와 <summary>는 접었다 펴는 칸을, <dialog>는 모달 창과 보통 창을 만듭니다. 14장에서 details의 name 묶음, dialog를 command로 여닫기, popover를 실험했습니다. 이 시트는 세 태그의 속성을 모두 적고, 장에서 다루지 않은 두 가지를 확인합니다. 사용자가 연 details에 무엇이 남는지, 그리고 dialog의 closedby가 닫는 길을 어떻게 바꾸는지입니다. 이 장은 묶음을 한눈에 보는 입구입니다. 태그마다 더 깊게 쓴 장(기술 요약, 속성마다의 설명과 예시, 기본 스타일, DOM, 접근성, 브라우저 지원, 직접 해 보기)이 이 장 아래에 따로 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "셋 다 열림과 닫힘 상태가 있고, 상태가 바뀌면 toggle 이벤트가 납니다. popover와 견준 표와 기본 실험은 14장에 있습니다.",
        tables: [
          {
            head: ["태그", "뜻", "그 태그만의 속성", "자세히"],
            rows: [
              ["<details>", "접었다 펴는 칸", "open, name", "14장 · 열고 닫는 요소"],
              ["<summary>", "details의 이름표이자 누르는 자리", "없음", "14장 · 열고 닫는 요소"],
              ["<dialog>", "대화 상자 (모달, 보통 창)", "closedby, open", "14장 · 열고 닫는 요소"],
            ],
          },
        ],
      },
      {
        label: "<details>",
        body: "누르면 펼쳐지는 칸입니다. 닫혀 있을 때는 삼각형과 summary의 글만 보이고, 열면 나머지 내용이 보입니다. summary를 누르거나, 포커스한 뒤 스페이스를 누르면 열리고 닫힙니다. 자주 묻는 질문, 자세한 설명 접기처럼 처음에는 숨겨 둘 내용에 씁니다.\n\n상태는 open 속성 하나로 드러납니다. 사용자가 열면 open이 붙고, 닫으면 빠집니다. 그래서 CSS의 details[open]으로 열린 모양을 꾸밉니다. 상태가 바뀐 뒤에 toggle 이벤트가 옵니다. 짧은 사이에 여러 번 바뀌면 이벤트는 하나로 합쳐집니다. 펼쳐지는 부분은 ::details-content로 꾸미고 움직임을 줄 수 있습니다.",
        tables: [
          {
            caption: "<details>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              ["open", "불 속성", "열려 있습니다. 닫으려면 속성을 지웁니다. open=\"false\"도 열립니다"],
              [
                "name",
                "묶음 이름",
                "같은 name의 details는 한 번에 하나만 열립니다. 이웃하지 않아도 됩니다. 여럿에 open이 있으면 문서에서 처음 것만 열립니다",
              ],
            ],
          },
        ],
        terms: [
          {
            term: "공개 위젯 (disclosure widget)",
            body: "제목을 누르면 숨은 내용이 드러나는 UI입니다. 열고 닫을 때 삼각형이 돌아가서 twisty라고도 부릅니다. 접어 둔 지도를 펼쳐 보는 것과 같습니다.",
          },
          {
            term: "아코디언 (accordion)",
            body: "여러 공개 위젯 중 하나만 열리게 묶은 UI입니다. 하나를 열면 다른 것이 접힙니다. details에 같은 name을 주면 스크립트 없이 됩니다. 악기 아코디언의 주름처럼 한쪽이 펴지면 다른 쪽이 접힙니다.",
          },
        ],
      },
      {
        label: "<summary>",
        body: "details의 이름표이자 누르는 자리입니다. details의 첫 자식으로 둡니다. 누르면 부모 details가 열리거나 닫히고, details에 toggle 이벤트가 옵니다. 글, 제목 요소, 문단 안에 쓰는 HTML을 담을 수 있습니다. details의 나머지 내용은 summary의 접근 설명이 됩니다.\n\ndetails의 첫 자식이 summary가 아니면, 브라우저가 정한 기본 글(흔히 Details)을 이름표로 씁니다. summary의 기본 모양은 display: list-item이라 삼각형이 붙습니다. ::marker나 list-style로 삼각형을 바꾸고, display: block으로 바꾸면 삼각형이 사라집니다. Safari 같은 WebKit 계열은 비표준 ::-webkit-details-marker로 삼각형을 다룹니다.\n\n이 태그만의 속성은 없고 전역 속성만 씁니다.",
      },
      {
        label: "직접 해 보기: open 속성과 summary 없는 details",
        body: "첫 details의 summary를 누르면 기록에 클릭과 toggle이 찍히고, 지금 값의 open 속성이 true가 됩니다. 사용자가 열어도 HTML 속성이 붙는다는 뜻이라, details[open] 규칙이 배경을 칠합니다. 둘째 details에는 summary가 없습니다. 브라우저가 기본 이름표를 그려 주고, 그것을 눌러도 열립니다. 그런데 DOM 나무를 보면 summary가 생기지 않았습니다. 기본 이름표는 브라우저가 DOM 밖에 따로 그린 것이라, 스크립트로 찾거나 글을 바꿀 수 없습니다.",
        lab: {
          html: `<style>details[open] { background: #fff3e0; }</style>
<details id="a">
  <summary>주문 내역</summary>
  <p>사과 2개, 배 1개</p>
</details>
<details id="b">
  <p>summary가 없는 details입니다.</p>
</details>`,
          height: 180,
          checks: [
            { label: "open 속성", expr: "[...document.querySelectorAll('details')].map((d) => d.id + '=' + d.hasAttribute('open'))" },
            { label: "DOM 나무", expr: "labDom()" },
          ],
          tryIt: "둘째 details의 첫 자식으로 <summary>배송 안내</summary>를 넣어 보세요. 기본 이름표 대신 그 글이 나옵니다.",
        },
      },
      {
        label: "<dialog>",
        body: "대화 상자입니다. 확인 창, 알림, 작은 편집 창처럼 페이지 위에 뜨는 창에 씁니다. showModal()이나 command=\"show-modal\" 버튼으로 열면 모달입니다. 모달은 맨 위층에 뜨고, 뒤의 페이지를 inert로 막고, ::backdrop으로 뒤를 가립니다. 열리면 포커스가 안의 첫 포커스할 수 있는 요소로 갑니다. show()나 open 속성으로 열면 보통 창이라 뒤를 그대로 쓸 수 있습니다. MDN은 open 속성을 직접 붙이고 떼기보다 메서드로 열기를 권합니다.\n\n닫는 길은 여럿입니다.\n(1) method=\"dialog\" 폼을 보냅니다. returnValue가 누른 버튼의 value가 됩니다.\n(2) close()를 부르거나 command=\"close\" 버튼을 누릅니다.\n(3) Esc나 command=\"request-close\" 버튼은 닫기 요청이라, cancel 이벤트가 먼저 납니다.\n(4) closedby=\"any\"면 바깥을 눌러도 닫힙니다.\n\nclosedby를 적지 않으면 showModal()로 연 dialog는 closerequest처럼, 그 밖은 none처럼 동작합니다. 주의할 점이 둘 있습니다. dialog에 tabindex를 붙이지 않습니다. 열었을 때 먼저 쓸 칸이나 닫기 버튼에 autofocus를 둡니다.",
        tables: [
          {
            caption: "<dialog>만의 속성",
            head: ["속성", "값", "하는 일"],
            rows: [
              [
                "closedby",
                "any, closerequest, none",
                "사용자가 닫을 수 있는 길입니다. any는 바깥 누르기, Esc 같은 닫기 요청, 개발자가 만든 버튼 모두. closerequest는 닫기 요청과 버튼. none은 버튼과 스크립트로만",
              ],
              ["open", "불 속성", "열려 있습니다. 이 속성으로 연 dialog는 모달이 아닙니다"],
            ],
          },
        ],
        terms: [
          {
            term: "모달과 보통 창 (modal, non-modal)",
            body: "모달은 닫기 전까지 뒤의 페이지를 쓸 수 없게 막는 창입니다. 보통 창은 떠 있어도 뒤를 누르고 고칠 수 있습니다. '이것부터 답하세요'라고 막아서는 창구 직원과, 옆에 놓인 메모지의 차이입니다.",
          },
          {
            term: "닫기 요청 (close request)",
            body: "Esc 키, 모바일의 뒤로 가기 몸짓처럼 플랫폼이 '이 창을 닫아 달라'고 보내는 요청입니다. dialog는 이 요청을 받으면 close보다 cancel 이벤트를 먼저 냅니다. 손님이 '계산해 주세요'라고 말하는 것이지, 아직 계산이 끝난 것은 아닙니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: closedby로 닫는 길 고르기",
        body: "두 버튼은 각각 다른 dialog를 모달로 엽니다. 'any로 열기'를 누른 뒤 dialog 바깥을 누르면 닫힙니다. 닫기 요청이라 기록에 cancel, close가 차례로 찍힙니다. 다시 열어 Esc를 눌러도 닫힙니다. 'none으로 열기'로 연 dialog는 바깥을 눌러도, Esc를 눌러도 열린 채입니다. 안의 '닫기' 버튼(command=\"close\")으로만 닫히고, close 줄의 returnValue가 버튼의 value인 \"btn\"이 됩니다. closedby를 모르는 브라우저에서는 지금 값의 closedBy가 undefined로 나옵니다.",
        lab: {
          html: `<button commandfor="d1" command="show-modal">any로 열기</button>
<button commandfor="d2" command="show-modal">none으로 열기</button>
<dialog id="d1" closedby="any">
  <p>바깥을 누르거나 Esc를 누르면 닫힙니다.</p>
  <button commandfor="d1" command="close" value="btn">닫기</button>
</dialog>
<dialog id="d2" closedby="none">
  <p>바깥도 Esc도 안 됩니다. 버튼으로만 닫힙니다.</p>
  <button commandfor="d2" command="close" value="btn">닫기</button>
</dialog>`,
          height: 230,
          checks: [
            { label: "open", expr: "['d1', 'd2'].map((id) => id + '=' + document.getElementById(id).open)" },
            { label: "closedBy", expr: "['d1', 'd2'].map((id) => id + '=' + document.getElementById(id).closedBy)" },
          ],
          tryIt: "d1의 closedby를 지워 보세요. showModal()로 연 dialog의 기본은 closerequest라, Esc로는 닫히지만 바깥을 눌러서는 닫히지 않습니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이 태그들의 문제는 대개 브라우저가 이미 해 주는 일을 모르고 다시 만들다 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["details를 닫으려고 open=\"false\"를 적었다", "불 속성이라 열린 채다", "속성을 지우거나 details.open = false"],
              ["같은 name의 details 여럿에 open을 적었다", "문서에서 처음 것만 열린다", "처음에 열 것 하나에만 open을 적는다"],
              ["모달 바깥을 누르면 닫히길 바랐다", "closedby가 없으면 모달의 기본은 closerequest다", "closedby=\"any\"를 적는다"],
              ["버튼으로만 닫게 하려고 Esc를 스크립트로 막았다", "keydown과 cancel을 빠짐없이 막기 어렵다", "closedby=\"none\"을 적는다"],
              ["dialog에 tabindex를 붙였다", "MDN: dialog 자신은 포커스를 받는 요소가 아니다", "지우고, 먼저 쓸 칸에 autofocus"],
              ["닫기 버튼 없이 모달을 띄웠다", "키보드가 없는 기기에서 닫을 길이 없다", "닫기 버튼을 꼭 둔다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) open=\"false\"인 details는 열려 있나요?\n2) 첫 자식이 summary가 아닌 details는 무엇을 이름표로 쓰나요?\n3) closedby 없이 showModal()로 연 dialog는 바깥을 누르면 닫히나요?\n4) closedby=\"none\"인 dialog는 어떻게 닫나요?",
      },
    ],
    sources: [
      { label: "MDN — <details>", href: `${REF}/Elements/details` },
      { label: "MDN — <summary>", href: `${REF}/Elements/summary` },
      { label: "MDN — <dialog>", href: `${REF}/Elements/dialog` },
      { label: "MDN — HTMLDialogElement.closedBy", href: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/closedBy" },
    ],
  },

  {
    id: "html-attr-input-type",
    name: "input의 type 값",
    tagline: "type 하나가 모양, 값의 형식, 검증을 바꾼다",
    intro:
      "<input> 하나가 type에 따라 글 칸, 숫자 칸, 날짜 고르개, 체크 상자, 버튼이 됩니다. type은 모양만 바꾸지 않습니다. value에 담기는 글의 형식, 쓸 수 있는 속성, 브라우저가 저절로 하는 검증까지 바꿉니다. type이 없거나 모르는 값이면 text입니다. 이 시트는 22가지 type을 한 표에 모으고, 여섯 계열로 나눠 작은 창에서 .value, .valueAsNumber, .valueAsDate, validity를 직접 읽습니다. 검증이 걸리는 흐름은 13장에서 다룹니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "모든 type의 value는 문자열입니다. 숫자와 날짜 칸도 \"42\", \"2026-11-17\" 같은 글자입니다. 숫자나 Date로 읽으려면 valueAsNumber, valueAsDate를 씁니다. 표의 '저절로 하는 검증'은 속성 없이 type만으로 걸리는 검사입니다. required, pattern, min 같은 속성을 더하면 검사가 늘어납니다(13장).",
        tables: [
          {
            head: ["type", "모양", "value의 형식", "주로 쓰는 속성", "저절로 하는 검증"],
            rows: [
              ["text", "한 줄 글 칸 (기본)", "아무 글. 줄바꿈은 지워짐", "maxlength, minlength, pattern, placeholder, size, list", "없음"],
              ["search", "검색 칸. 지우기 단추가 붙기도", "아무 글. 줄바꿈은 지워짐", "text와 같음", "없음"],
              ["email", "글 칸 (이메일용 자판)", "이메일 주소. multiple이면 쉼표로 여럿", "multiple, pattern, maxlength, list", "이메일 형식 (typeMismatch)"],
              ["url", "글 칸 (URL용 자판)", "절대 URL", "pattern, maxlength, list", "URL 형식 (typeMismatch)"],
              ["tel", "글 칸 (전화 자판)", "아무 글", "pattern, maxlength, list", "없음 (나라마다 형식이 달라서)"],
              ["password", "글이 가려진 칸", "아무 글", "minlength, maxlength, pattern, autocomplete", "없음"],
              ["number", "숫자 칸과 위아래 단추", "숫자 글자. 숫자가 아니면 \"\"", "min, max, step, placeholder, list", "숫자로 못 읽으면 badInput. step 기본 1"],
              ["range", "미끄럼 막대", "숫자 글자. 비지 않음, 기본은 가운데", "min (0), max (100), step (1), list", "값을 범위와 step 안으로 옮겨 늘 맞음"],
              ["date", "날짜 고르개", "yyyy-mm-dd", "min, max, step (일)", "범위, step. 형식이 틀린 value는 \"\""],
              ["time", "시간 칸", "HH:mm 또는 HH:mm:ss (24시간)", "min, max, step (초)", "범위, step"],
              ["datetime-local", "날짜와 시간 고르개", "yyyy-mm-ddTHH:mm (시간대 없음)", "min, max, step (초)", "범위, step"],
              ["month", "연월 고르개 (브라우저마다 다름)", "yyyy-mm", "min, max, step (달)", "범위, step"],
              ["week", "주 고르개 (브라우저마다 다름)", "yyyy-Www", "min, max, step (주)", "범위, step"],
              ["checkbox", "체크 상자", "value 속성, 없으면 \"on\". 켜졌을 때만 보냄", "checked, value, required", "required면 켜야 함"],
              ["radio", "동그란 단추 (같은 name 중 하나)", "value 속성, 없으면 \"on\". 고른 것만 보냄", "name, checked, value, required", "묶음에 required가 있으면 하나는 골라야 함"],
              ["color", "색 고르개", "#rrggbb (소문자 16진수)", "list, alpha (실험), colorspace (실험)", "고칠 수 없는 value는 #000000"],
              ["file", "파일 고르기 단추", "C:\\fakepath\\첫 파일 이름. 파일은 .files", "accept, multiple, capture", "required면 하나 이상"],
              ["submit", "보내기 버튼", "버튼 글자", "name, value, formaction 등 form* 다섯", "검사할 값이 없음"],
              ["reset", "되돌리기 버튼", "버튼 글자", "value", "검증 대상이 아님"],
              ["button", "기본 동작 없는 버튼", "버튼 글자", "value, popovertarget", "검증 대상이 아님"],
              ["image", "그림으로 된 보내기 버튼", "없음. 누른 자리의 x, y를 보냄", "src, alt, width, height, form*", "검사할 값이 없음"],
              ["hidden", "보이지 않음", "개발자가 넣은 글", "name, value", "검증 대상이 아님"],
            ],
          },
        ],
        terms: [
          {
            term: "값 정리 (value sanitization)",
            body: "type마다 value에 들어갈 글의 규칙이 있고, 맞지 않는 글을 브라우저가 고치거나 지우는 과정입니다. date에 2026/11/17을 넣으면 \"\"가 되고, range에 범위 밖 수를 넣으면 끝 값이 됩니다. 규격에 안 맞는 소포를 우체국이 돌려보내거나 규격 상자로 옮겨 담는 것과 같습니다.",
          },
        ],
      },
      {
        label: "텍스트 계열",
        body: "text, search, email, url, tel, password는 모두 한 줄 글 칸입니다. value는 문자열이고, 줄바꿈은 저절로 지워집니다. 서로 다른 점은 모바일 자판의 모양과 저절로 하는 검증입니다. email과 url만 형식을 검사합니다. tel은 나라마다 번호 모양이 달라 검사하지 않으니, 필요하면 pattern을 붙입니다. list로 datalist를 이으면 낭독기에는 콤보박스로 알려집니다.\n\nMDN은 이 검증이 서버 검증을 대신하지 못한다고 경고합니다. HTML은 누구나 고칠 수 있고, 폼을 거치지 않고 서버로 바로 보낼 수도 있기 때문입니다.",
        tables: [
          {
            head: ["type", "모바일 자판", "저절로 하는 검증", "알아 둘 것"],
            rows: [
              ["text", "보통 자판", "없음", "type이 없거나 틀리면 이것"],
              ["search", "엔터 대신 검색 단추가 있기도", "없음", "지우기 단추가 붙기도. 역할은 searchbox"],
              ["email", "이메일용 자판", "이메일 형식", "me@example처럼 점 없는 도메인도 맞음. multiple이면 여럿"],
              ["url", "URL용 자판", "URL 형식", "스킴이 있는 절대 URL이어야 함. 주소가 실제로 있는지는 보지 않음"],
              ["tel", "전화 자판", "없음", "형식은 pattern으로 정함"],
              ["password", "보통 자판", "없음", "글이 가려짐. 안전하지 않은 페이지면 브라우저가 경고하기도"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 텍스트 계열의 검증",
        body: "네 칸에 처음 값이 들어 있습니다. 지금 값을 보면 email의 abc와 url의 example.com은 typeMismatch라 valid가 false입니다. url은 https:// 같은 스킴이 있어야 합니다. tel은 아무 글이나 맞습니다. 보내기를 누르면 기록에 invalid가 두 줄 찍히고 보내지 않습니다. email을 a@b로, url을 https://example.com으로 고치면 둘 다 맞는 값이 되어 보내집니다. password 칸은 화면에서 가려져도 .value로 글이 그대로 읽힙니다. name이 없어서 보내지는 않습니다.",
        lab: {
          html: `<form action="target.html">
  <p><input type="email" name="e" value="abc"> email</p>
  <p><input type="url" name="u" value="example.com"> url</p>
  <p><input type="tel" name="t" value="아무 글 123"> tel</p>
  <p><input type="password" id="p" value="secret"> password</p>
  <button>보내기</button>
</form>`,
          height: 230,
          checks: [
            { label: "valid", expr: "[...document.querySelectorAll('input')].map((i) => i.type + '=' + i.validity.valid)" },
            { label: "typeMismatch", expr: "[...document.querySelectorAll('input')].map((i) => i.type + '=' + i.validity.typeMismatch)" },
            { label: "password.value", expr: "document.getElementById('p')?.value" },
          ],
          tryIt: "email 칸에 multiple을 붙이고 a@b.c, d@e.f처럼 쉼표로 둘을 적어 보세요. 둘 다 맞으면 valid가 true입니다.",
        },
      },
      {
        label: "숫자 계열",
        body: "number와 range는 숫자를 받습니다. 그래도 value는 \"42\" 같은 문자열이라, 계산하려면 valueAsNumber로 읽습니다. number는 숫자로 읽을 수 없는 글이 들어오면 value가 \"\"가 되고 validity.badInput이 true가 됩니다. step 기본이 1이라 1.5는 stepMismatch입니다. 소수를 받으려면 step=\"any\"나 step=\"0.01\"을 적습니다.\n\nrange는 정확한 값이 중요하지 않을 때 씁니다. value는 비는 일이 없고, 기본은 min과 max의 가운데입니다. 범위 밖이나 step에 안 맞는 값은 가까운 맞는 값으로 옮깁니다. MDN은 우편번호나 카드 번호처럼 숫자로만 된 글에는 number를 쓰지 말라고 합니다. 그때는 type=\"text\"에 inputmode=\"numeric\"과 pattern을 씁니다.",
        tables: [
          {
            head: ["", "number", "range"],
            rows: [
              ["모양", "숫자 칸과 위아래 단추", "미끄럼 막대"],
              ["빈 값", "됨 (\"\")", "안 됨. 기본은 가운데"],
              ["min, max 기본", "없음", "0, 100"],
              ["step 기본", "1", "1"],
              ["범위 밖 값", "그대로 두고 rangeUnderflow, rangeOverflow", "범위 끝으로 옮김"],
              ["valueAsNumber", "숫자. 비면 NaN", "숫자"],
              ["낭독기 역할", "spinbutton", "slider"],
            ],
          },
        ],
        terms: [
          {
            term: "valueAsNumber, valueAsDate",
            body: "value를 숫자나 Date 객체로 읽고 쓰는 프로퍼티입니다. value가 늘 문자열이라 계산할 때 씁니다. 비어 있거나 그 type에 맞지 않으면 valueAsNumber는 NaN, valueAsDate는 null입니다. 같은 금액을 다른 단위로 보여 주는 환율표와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: number와 range의 값",
        body: "number의 1.5는 step 기본값이 1인데도 맞는 값입니다. min이 없으면 step을 세는 기준(step base)이 value 속성의 값 1.5가 되기 때문입니다. 칸을 2로 고치면 stepMismatch가 true가 되고, 2.5는 다시 맞습니다. 칸을 비우면 value는 \"\", valueAsNumber는 NaN입니다. e 하나처럼 숫자로 읽을 수 없는 글을 치면 value는 여전히 \"\"인데 badInput이 true가 됩니다. value만으로는 빈 칸과 틀린 글을 가를 수 없어서 badInput을 봅니다. range는 value=\"20\"을 적었지만 max가 10이라 value가 \"10\"으로 옮겨져 있습니다. 막대를 끌면 기록에 input과 change가 찍힙니다.",
        lab: {
          html: `<p><input type="number" id="n" value="1.5"> number (step 기본 1)</p>
<p><input type="range" id="r" min="0" max="10" value="20"> range 0~10</p>`,
          height: 120,
          checks: [
            { label: "n.value", expr: "JSON.stringify(document.getElementById('n').value)" },
            { label: "n.valueAsNumber", expr: "document.getElementById('n').valueAsNumber" },
            {
              label: "n.validity",
              expr: "['valid', 'badInput', 'stepMismatch'].map((k) => k + '=' + document.getElementById('n').validity[k])",
            },
            { label: "r.value", expr: "JSON.stringify(document.getElementById('r').value)" },
          ],
          logInput: true,
          tryIt: 'number에 min="0"을 붙여 보세요. 기준이 0이 되어 이번에는 1.5가 stepMismatch입니다. step="any"를 붙이면 어떤 소수도 맞습니다.',
        },
      },
      {
        label: "날짜와 시간",
        body: "date, time, datetime-local, month, week는 고르개를 줍니다. 화면에 보이는 모양은 사용자의 언어와 운영체제 설정을 따르지만, value는 늘 정해진 형식입니다. 서버와 스크립트는 화면 모양이 아니라 value를 읽습니다. 형식에 안 맞는 value는 \"\"로 지워집니다. datetime-local에는 시간대가 없습니다. GET으로 보내면 시간의 콜론(:)은 %3A로 바뀝니다.\n\ndate의 valueAsNumber는 1970년 1월 1일 UTC부터 그날 자정까지의 밀리초이고, valueAsDate는 그 시각의 Date입니다. step의 단위는 type마다 다릅니다. time만은 min이 max보다 크면 자정을 넘는 범위가 됩니다.\n\n브라우저 지원이 고르지 않습니다. MDN은 데스크톱 Firefox와 Safari가 month와 week의 고르개를 주지 않는다고 적습니다. 그런 브라우저에서는 글 칸이 되고, type 프로퍼티가 \"text\"를 돌려주기도 합니다. 그래서 type을 읽어 지원 여부를 가리기도 합니다. 어느 브라우저에서나 같은 모양이 필요하면 select 둘(연, 월)로 받습니다.",
        tables: [
          {
            head: ["type", "value 형식", "예", "step 단위 (기본)"],
            rows: [
              ["date", "yyyy-mm-dd", "2026-11-17", "일 (1)"],
              ["time", "HH:mm 또는 HH:mm:ss", "09:30", "초 (60)"],
              ["datetime-local", "yyyy-mm-ddTHH:mm", "2026-11-17T09:30", "초 (60)"],
              ["month", "yyyy-mm", "2026-11", "달 (1)"],
              ["week", "yyyy-Www (ISO 주 번호)", "2026-W47", "주 (1)"],
            ],
          },
        ],
        terms: [
          {
            term: "ISO 주 번호",
            body: "한 해의 주에 1부터 매긴 번호입니다. 주는 월요일에 시작하고, 그해의 첫 목요일이 든 주가 1주입니다. 그래서 한 해는 52주나 53주입니다. 회사 달력의 'n주차'와 비슷하지만 세는 규칙이 국제 표준으로 정해져 있습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 날짜 칸의 value 형식",
        body: "date 칸에서 날짜를 골라 보세요. 기록에 change가 찍히고 value가 yyyy-mm-dd로 바뀝니다. 고르개에 보이는 모양이 무엇이든 value 형식은 같습니다. 지금 값의 valueAsDate는 그날 UTC 자정이라 끝이 T00:00:00.000Z입니다. 마지막 칸은 value를 2026/11/17로 적어 형식이 틀렸고, value가 \"\"로 지워져 있습니다. type 줄에서 month나 week가 \"text\"로 나오면 그 브라우저는 그 type을 지원하지 않는 것입니다.",
        lab: {
          html: `<p><input type="date" id="d" value="2026-11-17"> date</p>
<p><input type="time" id="t" value="09:30"> time</p>
<p><input type="month" id="m" value="2026-11"> month</p>
<p><input type="week" id="w" value="2026-W47"> week</p>
<p><input type="date" id="bad" value="2026/11/17"> 형식이 틀린 date</p>`,
          height: 240,
          checks: [
            { label: "type", expr: "[...document.querySelectorAll('input')].map((i) => i.id + '=' + i.type)" },
            { label: "value", expr: "[...document.querySelectorAll('input')].map((i) => i.id + '=' + (i.value || '(빈 글자)'))" },
            { label: "d.valueAsDate", expr: "document.getElementById('d').valueAsDate?.toISOString()" },
            { label: "d.validity.valid", expr: "document.getElementById('d').validity.valid" },
          ],
          tryIt: 'date 칸에 min="2026-12-01"을 붙여 보세요. 지금 값이 min보다 앞이라 rangeUnderflow로 valid가 false가 됩니다.',
        },
      },
      {
        label: "고르기 계열",
        body: "checkbox와 radio는 켜고 끄는 칸입니다. 켜진 칸만 name=value를 보내고, value가 없으면 \"on\"을 보냅니다. 그래서 value를 꼭 적습니다. checked 속성은 처음 상태이고, 지금 상태는 .checked입니다. checkbox의 indeterminate는 스크립트로만 켜는 '반쯤' 모양입니다. 모양만 바뀌고, 보낼지는 checked가 정합니다. radio는 같은 name끼리 묶여 하나만 켜집니다. 묶음 중 하나에 required가 있으면 묶음 전체가 필수입니다.\n\ncolor는 색 고르개이고 value는 #ff0000 같은 소문자 16진수입니다. 없거나 틀린 value는 #000000(검정)입니다. 고르는 동안 input이, 고르개를 닫을 때 change가 납니다. file의 value는 진짜 경로를 숨긴 C:\\fakepath\\파일 이름이고, 고른 파일은 .files로 읽습니다. accept는 고르개에 주는 힌트일 뿐 검사가 아닙니다. 서버에서 파일 형식을 다시 봅니다.",
        tables: [
          {
            head: ["type", "value", "보낼 때", "지금 상태"],
            rows: [
              ["checkbox", "value 속성, 없으면 \"on\"", "켜졌을 때만 name=value", ".checked, .indeterminate"],
              ["radio", "value 속성, 없으면 \"on\"", "묶음에서 켜진 하나만", ".checked, 묶음은 form.elements[name].value"],
              ["color", "#rrggbb (소문자)", "늘 보냄", ".value"],
              ["file", "C:\\fakepath\\첫 파일 이름, 없으면 \"\"", "multipart/form-data면 파일 내용, 아니면 이름만", ".files"],
            ],
          },
        ],
        terms: [
          {
            term: "가짜 경로 (fakepath)",
            body: "file 칸의 value 앞에 늘 붙는 C:\\fakepath\\입니다. 사용자의 실제 폴더 구조가 새지 않게 정해 둔 가짜 경로입니다. 택배 송장에 집 전화 대신 적는 안심 번호와 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 고르는 칸이 보내는 값",
        body: "처음에는 체크 상자가 꺼져 있어 지금 보내면에 news가 없습니다. 켜면 기록에 change가 찍히고 news=on이 생깁니다. value를 적지 않아서 \"on\"입니다. 라디오는 M이 켜져 있어 size=M이고, S를 누르면 M이 저절로 꺼집니다. 색 칸은 value=\"#FF0000\"으로 적었지만 .value는 소문자 #ff0000입니다. 파일을 고르면 value가 C:\\fakepath\\로 시작하고, 지금 보내면에 파일 이름이 나옵니다. 고르기 전에도 f는 이름 없는 빈 파일로 담겨 있습니다.",
        lab: {
          html: `<form action="target.html">
  <p><label><input type="checkbox" name="news"> 소식 받기</label></p>
  <p><label><input type="radio" name="size" value="S"> S</label>
    <label><input type="radio" name="size" value="M" checked> M</label></p>
  <p><input type="color" id="c" name="c" value="#FF0000">
    <input type="file" name="f" accept="image/*"></p>
</form>`,
          height: 170,
          checks: [
            {
              label: "지금 보내면 (FormData)",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + (typeof v === 'string' ? v : '파일(' + v.name + ')')) : '(폼 없음)'",
            },
            { label: "news.value", expr: "document.querySelector('[name=news]')?.value" },
            { label: "color.value", expr: "document.getElementById('c')?.value" },
            { label: "file.value", expr: "document.querySelector('[name=f]')?.value || '(빈 문자열)'" },
          ],
          tryIt: '체크 상자에 value="yes"를 붙여 보세요. 켰을 때 news=yes가 됩니다.',
        },
      },
      {
        label: "버튼 계열",
        body: "submit, reset, button, image는 누르는 버튼이고, value가 버튼 글자입니다. submit은 폼을 보냅니다. value를 적지 않으면 브라우저가 정한 기본 글이 버튼에 보입니다. name이 있으면 누른 버튼의 name=value가 함께 갑니다. formaction, formmethod 같은 form* 속성은 이 버튼으로 보낼 때만 폼의 값을 덮어씁니다.\n\nreset은 폼의 모든 칸을 처음 값으로 되돌립니다. MDN은 실수로 눌러 적은 것을 잃기 쉬워 권하지 않습니다. button은 기본 동작이 없어 onclick이나 popovertarget으로만 일합니다. image는 그림으로 된 submit입니다. src와 alt를 적고, 누른 자리의 x, y 좌표를 함께 보냅니다. name이 있으면 이름.x, 이름.y가 됩니다. 안에 글과 그림을 넣을 수 있는 <button> 요소를 더 많이 씁니다.",
        tables: [
          {
            head: ["type", "누르면", "함께 보내는 값", "버튼 글자"],
            rows: [
              ["submit", "폼을 보낸다", "name이 있으면 name=value", "value, 없으면 브라우저 기본 글"],
              ["reset", "칸을 처음 값으로 되돌린다", "없음", "value, 없으면 브라우저 기본 글"],
              ["button", "아무 일도 없다", "없음", "value, 없으면 빈 버튼"],
              ["image", "폼을 보낸다", "누른 자리의 x, y (name.x, name.y)", "없음. src 그림, 못 불러오면 alt"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 네 가지 버튼",
        body: "칸의 글을 고친 뒤 기본 글이 붙은 되돌리기 버튼(reset)을 누르세요. 기록에 reset이 찍히고 칸이 '처음 값'으로 돌아갑니다. 지금 값을 보면 reset과 image의 value는 \"\"입니다. 버튼에 보이는 기본 글은 value가 아니라 브라우저가 그린 것입니다. '그냥 버튼'은 onclick만 돌고 아무 데도 가지 않습니다. '찾기'를 누르면 submit 줄의 보낼 값에 act가 함께 담깁니다. 다시 실행하고 점 그림을 누르면 그림 버튼으로 보내고, 도착한 페이지에 pt.x와 pt.y가 보입니다.",
        lab: {
          html: `<form action="target.html">
  <input name="q" value="처음 값">
  <input type="submit" name="act" value="찾기">
  <input type="reset">
  <input type="button" value="그냥 버튼" onclick="console.log('onclick만 돕니다')">
  <input type="image" name="pt" src="dot-1x.svg" alt="그림으로 보내기" width="40" height="40">
</form>`,
          height: 150,
          checks: [
            { label: "q.value", expr: "document.querySelector('[name=q]')?.value" },
            {
              label: "버튼의 value",
              expr: "[...document.querySelectorAll('input:not([name=q])')].map((i) => i.type + '=' + (i.value || '(빈 글자)'))",
            },
          ],
          tryIt: '찾기 버튼에 formaction="target.html#search"를 붙여 보세요. 그 버튼으로 보낼 때만 주소가 바뀝니다.',
        },
      },
      {
        label: "숨김",
        body: "hidden은 화면에 보이지 않고 값만 보내는 칸입니다. 고치고 있는 글의 id처럼, 사용자는 볼 필요 없지만 서버가 받아야 하는 값을 담습니다. 자리도 차지하지 않고, label을 이을 수 없고, focus()를 불러도 포커스를 받지 않습니다. input과 change 이벤트도 없습니다.\n\nhidden은 검증 대상이 아닙니다. required를 붙여도 걸리지 않습니다. name을 _charset_로 하면 보낼 때 그 폼의 문자 인코딩 이름이 값으로 들어갑니다. MDN은 hidden의 값이 화면에만 안 보일 뿐, 소스 보기와 개발자 도구로 보고 고칠 수 있다고 경고합니다. 가격이나 권한처럼 믿어야 하는 값은 서버가 다시 정합니다.",
        tables: [
          {
            head: ["항목", "hidden에서는"],
            rows: [
              ["화면", "보이지 않고 자리도 차지하지 않음"],
              ["이벤트, 포커스", "input, change 없음. focus()로도 포커스를 받지 않음"],
              ["검증", "대상이 아님. required가 있어도 걸리지 않음"],
              ["name=\"_charset_\"", "보낼 때 문자 인코딩 이름이 값이 됨"],
              ["보안", "소스 보기로 보이고 고칠 수 있음"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: hidden이 보내는 값",
        body: "화면에는 제목 칸과 버튼만 보입니다. 지금 보내면에는 hidden 셋이 모두 있습니다. postId=42가 있고, value를 비워 둔 _charset_에는 문자 인코딩 이름이 들어 있습니다. must는 required지만 hidden이라 willValidate가 false입니다. 비어 있어도 보내기를 막지 않습니다. 보내기를 누르면 invalid 없이 submit이 찍히고, 도착한 페이지에 셋이 보입니다.",
        lab: {
          html: `<form action="target.html">
  <input type="hidden" name="postId" value="42">
  <input type="hidden" name="_charset_">
  <input type="hidden" name="must" required>
  <label>제목 <input name="title" value="안녕"></label>
  <button>보내기</button>
</form>`,
          height: 120,
          checks: [
            {
              label: "지금 보내면 (FormData)",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + v) : '(폼 없음)'",
            },
            { label: "willValidate", expr: "[...document.querySelectorAll('input')].map((i) => i.name + '=' + i.willValidate)" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "type의 문제는 대개 화면에 보이는 것과 value를 같다고 여겨서 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              [
                "우편번호, 카드 번호를 type=\"number\"로 받았다",
                "위아래 단추와 step 검사가 붙는다. MDN: 숫자로만 된 글은 number가 아니다",
                "type=\"text\" inputmode=\"numeric\" pattern",
              ],
              ["가격 칸에 1.5를 적으면 걸린다", "step 기본이 1이다", "step=\"any\" 또는 step=\"0.01\""],
              ["서버에서 날짜를 화면 모양대로 파싱했다", "value는 화면과 달리 늘 yyyy-mm-dd다", "value를 그대로 쓴다"],
              ["month, week 고르개가 안 나온다는 신고가 왔다", "데스크톱 Firefox, Safari는 고르개가 없다(MDN)", "date나 select 둘로 받는다"],
              ["accept=\"image/*\"만 믿고 파일을 받았다", "다른 형식도 고를 수 있다", "서버에서 형식을 검사한다"],
              ["hidden에 가격을 담아 보냈다", "소스 보기로 고칠 수 있다", "서버가 가격을 다시 정한다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) type=\"foo\"처럼 모르는 type을 적으면 어떻게 되나요?\n2) number 칸에 숫자로 읽을 수 없는 글이 있으면 value와 badInput은?\n3) date 칸의 value 형식은 사용자 언어에 따라 바뀌나요?\n4) value가 없는 checkbox를 켜고 보내면 무엇이 가나요?",
      },
    ],
    sources: [
      { label: "MDN — <input>", href: `${REF}/Elements/input` },
      { label: "MDN — <input type=\"number\">", href: `${REF}/Elements/input/number` },
      { label: "MDN — <input type=\"date\">", href: `${REF}/Elements/input/date` },
      { label: "MDN — <input type=\"week\">", href: `${REF}/Elements/input/week` },
      { label: "MDN — <input type=\"file\">", href: `${REF}/Elements/input/file` },
      { label: "MDN — Date and time formats", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Date_and_time_formats" },
    ],
  },

  {
    id: "html-attrs",
    name: "속성 참고서",
    tagline: "속성은 요소에 붙이는 설정이고, 값의 모양이 넷이다",
    intro:
      "속성은 시작 태그 안에 이름=\"값\"으로 붙이는 설정입니다. 어느 요소에나 붙는 전역 속성(id, class, lang 등)이 있고, 특정 요소에만 붙는 속성(a의 href, input의 type 등)이 있습니다. 이 참고서는 속성을 여섯 장으로 나눠 모읍니다. 장마다 속성의 값, 기본값, 함정을 표로 적고, 동작이 보이는 속성은 직접 해 보기로 확인합니다. 요소별로 어떤 속성이 붙는지는 태그 참고서의 각 태그 블록에 있습니다.",
    blocks: [
      {
        label: "여섯 장",
        body: "전역 속성부터 읽으면 나머지 장이 쉬워집니다. 링크와 리소스 속성은 다른 파일을 가리키는 속성, 폼 속성과 input의 type 값은 사용자의 값을 받는 속성입니다. ARIA는 HTML이 모자란 곳에서 보조 기술에 뜻을 더 알리는 속성입니다.",
        tables: [
          {
            head: ["장", "모은 속성", "개념 장"],
            rows: [
              ["전역 속성 목록", "id, class, lang, hidden, tabindex, data-* 등 39개", "15장 · 전역 속성"],
              ["링크와 리소스 속성", "href, src, rel, target, crossorigin, integrity 등", "7장 · 링크"],
              ["폼 속성", "name, value, required, autocomplete, form* 등", "12장, 13장"],
              ["input의 type 값", "text부터 week까지 22가지", "13장 · 폼 검증"],
              ["이미지와 표 속성", "alt, srcset, sizes, scope, headers 등", "8장, 11장"],
              ["ARIA 속성과 role", "role, aria-label, aria-hidden, aria-expanded 등", "6장 · 문서 구조와 랜드마크"],
            ],
          },
        ],
      },
      {
        label: "속성 값의 네 가지 모양",
        body: "속성 값은 모양이 넷입니다. 모양을 알면 '왜 이 값이 안 먹지?'의 절반이 풀립니다. 불 속성은 값을 보지 않고 있느냐 없느냐만 봅니다(1장). 열거형은 정해진 낱말 중 하나이고, 대소문자를 가리지 않으며, 모르는 값을 적으면 기본값(잘못된 값의 기본값)으로 돌아갑니다. 숫자는 정수나 실수이고, 단위를 붙이지 않습니다. width=\"300px\"이 아니라 width=\"300\"입니다. 나머지는 글자나 주소이고, 주소는 문서의 기준 주소로 풀립니다(7장).",
        tables: [
          {
            head: ["모양", "예", "알아 둘 것"],
            rows: [
              ["불 속성", "disabled, checked, required, hidden", 'disabled="false"도 켜진다. 끄려면 지운다'],
              ["열거형", 'type="email", dir="rtl", loading="lazy"', "모르는 값이면 기본값. type=\"emial\"은 text가 된다"],
              ["숫자", 'width="300", tabindex="0", colspan="2"', "단위를 붙이지 않는다"],
              ["글자, 주소", 'alt="…", href="/a", class="x y"', "주소는 기준 주소로 풀리고, class는 공백으로 나뉜다"],
            ],
          },
        ],
        terms: [
          {
            term: "열거형 속성 (enumerated attribute)",
            body: "정해진 낱말 몇 개 중 하나만 받는 속성입니다. 목록에 없는 값을 적으면 에러 없이 기본값으로 돌아갑니다. 자판기 버튼이 정해져 있어서, 없는 메뉴를 누르면 기본 음료가 나오는 것과 같습니다.",
          },
          {
            term: "빠졌을 때의 기본값과 틀렸을 때의 기본값",
            body: "열거형 속성은 기본값이 둘일 수 있습니다. 속성을 아예 적지 않았을 때의 값과, 모르는 값을 적었을 때의 값입니다. input의 type은 둘 다 text입니다. 빈칸으로 낸 답안지와 엉뚱한 답을 쓴 답안지를 따로 채점하는 것과 같습니다.",
          },
        ],
      },
      {
        label: "속성과 프로퍼티는 다르다",
        body: "HTML에 적은 것은 속성(attribute)이고, 자바스크립트로 읽는 DOM 객체의 값은 프로퍼티(property)입니다. 이름이 같아도 뜻이 다를 때가 있습니다. input의 value 속성은 '처음 값'이고, .value 프로퍼티는 '지금 칸에 든 값'입니다. 사용자가 글자를 바꾸면 .value만 바뀌고 속성은 그대로입니다. checked와 .checked, a의 href 속성(적은 글자)과 .href(풀어 낸 주소)도 같은 관계입니다. 그래서 '지금 값'을 읽을 때는 프로퍼티를, '처음에 적은 값'을 읽을 때는 getAttribute를 씁니다.",
        tables: [
          {
            head: ["속성 (getAttribute)", "프로퍼티", "다른 점"],
            rows: [
              ["value", ".value (처음 값은 .defaultValue)", "사용자가 고치면 프로퍼티만 바뀐다"],
              ["checked", ".checked (처음 값은 .defaultChecked)", "눌러도 속성은 그대로다"],
              ["href", ".href", "프로퍼티는 기준 주소로 풀린 진짜 주소"],
              ["class", ".className, .classList", "이름이 다르다 (class는 자바스크립트 예약어)"],
              ["for", ".htmlFor", "이름이 다르다"],
              ["data-stock-count", ".dataset.stockCount", "하이픈이 낙타 표기로 바뀐다"],
            ],
          },
        ],
        terms: [
          {
            term: "속성과 프로퍼티",
            body: "속성은 HTML 글자에 적힌 설정이고, 프로퍼티는 파서가 만든 DOM 객체의 값입니다. 처음에는 속성으로 프로퍼티를 채우지만, 그 뒤로는 따로 움직이는 것이 많습니다. 주문서(속성)와 지금 식탁 위의 음식(프로퍼티)의 차이입니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: value 속성과 .value",
        body: "칸의 글자를 고치고 체크 상자를 눌러 보세요. 지금 값에서 getAttribute로 읽은 쪽은 그대로이고, 프로퍼티로 읽은 쪽만 바뀝니다. 폼의 reset 버튼을 누르면 프로퍼티가 속성의 값(처음 값)으로 돌아갑니다. 링크의 href도 속성은 적은 글자 그대로, 프로퍼티는 풀린 주소입니다.",
        lab: {
          html: `<form>
  <input name="nick" value="처음 값">
  <label><input type="checkbox" name="ok"> 동의</label>
  <button type="reset">처음으로 (reset)</button>
</form>
<a href="target.html">링크</a>`,
          height: 120,
          logInput: true,
          checks: [
            { label: "getAttribute('value')", expr: "document.querySelector('[name=nick]').getAttribute('value')" },
            { label: ".value", expr: "document.querySelector('[name=nick]').value" },
            { label: "checked 속성 / .checked", expr: "document.querySelector('[name=ok]').hasAttribute('checked') + ' / ' + document.querySelector('[name=ok]').checked" },
            { label: "href 속성 / .href", expr: "document.querySelector('a').getAttribute('href') + ' / ' + document.querySelector('a').href" },
          ],
        },
      },
      {
        label: "문제가 나는 경우",
        body: "속성 문제의 대부분은 값의 모양을 잘못 알았거나, 속성과 프로퍼티를 헷갈려서 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ['width="300px"', "숫자가 아니라 무시되거나 다르게 읽힌다", '단위 없이 width="300"'],
              ['type="emial" (오타)', "에러 없이 text 칸이 된다", "열거형 값은 오타가 조용하다. 검사기로 찾는다"],
              ["입력 뒤 getAttribute('value')를 읽었다", "처음 값이 나온다", ".value를 읽는다"],
              ["setAttribute('value', x)로 칸을 바꾸려 했다", "사용자가 이미 고친 칸은 안 바뀐다", ".value = x"],
              ['checked="false"로 끄려 했다', "켜진다 (불 속성)", "속성을 지운다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 불 속성, 열거형, 숫자, 글자 속성을 하나씩 예로 들어 보세요.\n2) 사용자가 칸에 글자를 바꾼 뒤 getAttribute('value')는 무엇을 돌려주나요?\n3) a.getAttribute('href')와 a.href는 언제 달라지나요?\n4) 열거형 속성에 모르는 값을 적으면 어떻게 되나요?",
      },
    ],
    sources: [
      { label: "MDN — HTML attribute reference", href: `${REF}/Attributes` },
      { label: "MDN — Global attributes", href: `${REF}/Global_attributes` },
      { label: "WHATWG — Common microsyntaxes", href: `${SPEC}/common-microsyntaxes.html` },
    ],
  },
  {
    id: "html-attr-global",
    name: "전역 속성 목록",
    tagline: "어느 요소에나 붙는 서른아홉 가지 설정",
    intro:
      "전역 속성은 모든 HTML 요소에 붙일 수 있는 속성입니다. 다만 붙여도 효과가 없는 요소가 있습니다. MDN 목록에는 39개가 있고, 이 시트는 그 전부를 쓰임새로 묶어 값과 기본값과 함정을 적습니다. hidden, inert, tabindex, contenteditable, data-*, dir은 15장이 직접 해 보기로 다뤘습니다. 여기서는 짧게 적습니다. 끝에서는 onclick 같은 이벤트 처리 속성을 보고, addEventListener를 더 권하는 까닭을 확인합니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "MDN의 전역 속성 39개를 아래 블록의 순서대로 늘어놓았습니다. (실험)은 표준이 아직 굳지 않아 지원이 고르지 않은 것, (비표준)은 표준에 없는 것입니다. '붙는 곳'이 모든 요소여도 뜻이 있는 곳은 따로 있습니다. 예를 들어 inputmode는 편집할 수 있는 칸에서만 뜻이 있습니다. 이 밖에 aria-* 속성과 onclick 같은 이벤트 처리 속성도 모든 요소에 붙습니다.",
        tables: [
          {
            head: ["속성", "붙는 곳", "값", "하는 일"],
            rows: [
              ["id", "모든 요소", "문서에서 하나뿐인 이름", "# 이동, CSS, 스크립트가 찾는 이름표"],
              ["class", "모든 요소", "공백으로 나눈 이름들", "CSS, 스크립트가 묶어 고르는 이름"],
              ["style", "모든 요소", "CSS 선언", "이 요소에만 스타일을 적는다"],
              ["title", "모든 요소", "글자", "덧붙임 설명. 대개 풍선 도움말"],
              ["part", "섀도 트리 안의 요소", "공백으로 나눈 이름들", "바깥 CSS의 ::part()에 연다"],
              ["exportparts", "섀도 호스트", "쉼표로 나눈 part 이름", "안쪽 part를 한 겹 더 바깥에 연다"],
              ["slot", "섀도 호스트의 자식", "slot 이름", "같은 이름의 <slot> 자리에 들어간다"],
              ["is", "내장 요소", "등록한 요소 이름", "내장 요소를 사용자 정의 요소로 키운다"],
              ["lang", "모든 요소", "언어 태그 (ko, en-US)", "내용의 언어"],
              ["dir", "모든 요소", "ltr, rtl, auto", "글 방향"],
              ["translate", "모든 요소", "yes, no", "번역 도구가 옮길지"],
              ["hidden", "모든 요소", "불 속성, until-found", "그리지 않는다"],
              ["inert", "모든 요소", "불 속성", "누르기, 포커스, 찾기를 막는다"],
              ["popover", "모든 요소", "auto, manual, hint", "팝오버로 만든다"],
              ["tabindex", "모든 요소", "정수", "포커스를 받을지, Tab 순서"],
              ["accesskey", "모든 요소", "글자 하나 (여럿이면 공백)", "단축키 힌트"],
              ["autofocus", "모든 요소", "불 속성", "열리자마자 포커스"],
              ["contenteditable", "모든 요소", "true, false, plaintext-only", "사용자가 내용을 고칠 수 있게"],
              ["writingsuggestions", "편집할 수 있는 곳", "true, false", "브라우저의 글쓰기 제안"],
              ["spellcheck", "편집할 수 있는 곳", "true, false", "맞춤법 검사"],
              ["autocorrect", "편집할 수 있는 곳", "on, off", "오타 자동 고침"],
              ["autocapitalize", "편집할 수 있는 곳", "none, sentences, words, characters", "대문자 자동 넣기"],
              ["inputmode", "편집할 수 있는 곳", "text, numeric, decimal, tel 등 8개", "가상 키보드의 모양"],
              ["enterkeyhint", "편집할 수 있는 곳", "enter, done, go, next 등 7개", "가상 키보드 Enter 키의 이름"],
              ["virtualkeyboardpolicy (실험)", "편집할 수 있는 곳", "auto, manual", "가상 키보드를 저절로 띄울지"],
              ["draggable", "모든 요소", "true, false", "끌어 옮길 수 있게"],
              ["data-*", "모든 요소", "아무 글자", "스크립트가 쓰는 내 데이터"],
              ["itemscope", "모든 요소", "불 속성", "마이크로데이터 항목을 연다"],
              ["itemtype", "itemscope가 있는 요소", "어휘의 주소", "항목의 종류"],
              ["itemprop", "모든 요소", "속성 이름", "항목의 속성 하나"],
              ["itemid", "itemscope, itemtype이 있는 요소", "주소", "항목의 전역 식별자"],
              ["itemref", "itemscope가 있는 요소", "공백으로 나눈 id들", "항목 밖의 속성을 끌어온다"],
              ["nonce", "script, style 등", "한 번 쓰는 무작위 값", "CSP가 실행을 허락할지 가린다"],
              ["role", "모든 요소", "ARIA 역할 이름", "보조 기술에 알릴 역할"],
              ["headingoffset (실험)", "모든 요소", "정수", "안쪽 제목의 수준을 올린다"],
              ["headingreset (실험)", "모든 요소", "불 속성", "바깥의 headingoffset을 끊는다"],
              ["containertiming (실험)", "모든 요소", "이름", "성능 측정 묶음의 뿌리"],
              ["containertimingignore (실험)", "모든 요소", "불 속성", "그 측정에서 뺀다"],
              ["anchor (비표준)", "모든 요소", "기준 요소의 id", "CSS 앵커 위치의 기준"],
            ],
          },
        ],
      },
      {
        label: "id, class",
        body: "id는 문서 전체에서 하나뿐인 이름입니다. 주소의 # 뒤 조각, label의 for, getElementById가 이 이름으로 요소를 찾습니다. 값에 공백을 넣을 수 없고, 대소문자를 가립니다. 같은 id를 둘에 달아도 오류는 나지 않습니다. 대신 찾는 쪽이 문서에서 첫째만 집습니다.\n\nclass는 공백으로 나눈 이름 목록입니다. 한 요소에 여러 이름을 달고, 여러 요소가 한 이름을 나눠 씁니다. CSS의 .이름 선택자와 classList가 이 목록을 씁니다. 쉼표는 구분자가 아닙니다. class=\"a,b\"는 'a,b'라는 이름 하나입니다. 스크립트에서는 class가 예약어라 className이나 classList로 읽습니다.",
      },
      {
        label: "직접 해 보기: id는 하나, class는 여럿",
        body: "'#x로 가기'를 눌러 보세요. 기록에 hashchange가 찍히고, 첫째 문단에만 주황 테두리(:target)가 생깁니다. id가 겹쳐도 찾는 쪽은 첫째를 집기 때문입니다. 지금 값을 보면 querySelectorAll은 둘을 다 찾지만, getElementById는 첫째만 돌려줍니다. 셋째 문단은 class에 note를 두 번 적었습니다. classList는 겹친 이름을 하나로 셉니다. className은 적은 글자를 공백까지 그대로 돌려줍니다.",
        lab: {
          html: `<p><a href="#x">#x로 가기</a></p>
<p id="x">첫째 문단 (id x)</p>
<p id="x">둘째 문단 (id x, 겹침)</p>
<p class="note  warn note">셋째 문단 (class 셋)</p>`,
          height: 180,
          checks: [
            { label: "querySelectorAll('#x').length", expr: "document.querySelectorAll('#x').length" },
            { label: "getElementById('x')", expr: "document.getElementById('x')?.textContent" },
            { label: ":target", expr: "document.querySelector(':target')?.textContent ?? '(없음)'" },
            { label: "classList", expr: "[...document.querySelector('.note').classList]" },
            { label: "className", expr: "document.querySelector('.note').className" },
          ],
          tryIt: '둘째 문단의 id를 "X"(대문자)로 바꾸고 실행해 보세요. 대소문자가 다르면 다른 이름이라 #x는 하나만 찾습니다.',
        },
      },
      {
        label: "style, title",
        body: "style에는 CSS 선언을 적습니다. 선택자 없이 이 요소 하나에만 붙고, 스타일 시트의 규칙보다 셉니다. 그래서 나중에 스타일 시트로 덮어쓰려면 !important가 필요합니다. MDN은 스타일을 따로 파일에 두고, style은 빠른 시험용으로 쓰라고 권합니다. 인라인 스타일을 막는 CSP가 걸린 페이지에서는 style 속성도 막힙니다.\n\ntitle은 요소에 덧붙이는 설명입니다. 마우스를 올리면 풍선 도움말로 보이는 것이 보통입니다. 키보드와 터치 사용자는 이것을 보기 어렵습니다. 그래서 꼭 알아야 할 내용은 title에만 두지 않습니다. title은 자식 요소에도 이어집니다. link, abbr, input의 pattern 설명처럼 title이 따로 뜻을 갖는 요소도 있습니다.",
      },
      {
        label: "part, exportparts, slot, is",
        body: "넷 다 웹 컴포넌트에서 씁니다. 섀도 DOM 안의 요소에는 바깥 CSS가 닿지 않습니다. part=\"label\"을 붙인 요소만 바깥에서 my-card::part(label)로 꾸밀 수 있습니다. 컴포넌트 안에 다른 컴포넌트가 있으면 안쪽 part는 한 겹 바깥까지만 열립니다. exportparts=\"label, icon: card-icon\"처럼 적으면 더 바깥으로 넘기고, 이름도 바꿀 수 있습니다.\n\nslot은 반대 방향입니다. 호스트의 자식에 slot=\"title\"을 붙이면, 섀도 트리 안 <slot name=\"title\">의 자리에 그려집니다. is는 button, ul 같은 내장 요소를 사용자 정의 요소로 키웁니다. 등록은 customElements.define()에 { extends: \"button\" }을 주어 합니다. 쓸 때는 <button is=\"fancy-button\">처럼 적습니다. Safari는 is를 지원하지 않습니다.",
        code: `<style>
  my-card::part(label) { color: crimson; }
</style>
<my-card>
  <span slot="title">이 글은 섀도 트리의 slot 자리에 그려집니다</span>
</my-card>
<button is="fancy-button">보내기</button>`,
        codeLang: "html",
        terms: [
          {
            term: "섀도 DOM (shadow DOM)",
            body: "요소 안에 따로 붙여 둔 작은 DOM 나무입니다. 바깥의 CSS와 스크립트가 함부로 닿지 않아 컴포넌트의 속을 지킵니다. 식당 주방과 같아서, 손님(바깥 CSS)은 차림표에 올린 것(part)만 고를 수 있습니다.",
          },
          {
            term: "사용자 정의 요소 (custom element)",
            body: "customElements.define()으로 브라우저에 등록한 내 요소입니다. 이름에 하이픈이 꼭 들어갑니다(my-card). 새 요소를 만들 수도, is로 내장 요소를 키울 수도 있습니다. 기본 블록에 내 부품을 더해 새 블록을 만드는 것과 같습니다.",
          },
        ],
      },
      {
        label: "lang, dir, translate",
        body: "lang은 내용의 언어입니다. 값은 ko, en-US, zh-Hant 같은 BCP 47 언어 태그이고, 빈 값은 '모르는 언어'입니다. 자식에게 이어지므로 보통 <html lang>에 한 번 적고, 다른 언어가 섞인 곳에만 따로 적습니다. 낭독기의 발음, 글꼴 고르기, q의 따옴표, CSS의 :lang()과 hyphens가 이 값을 봅니다(2장).\n\ndir은 글 방향입니다(15장). translate=\"no\"는 번역 도구에게 '이 안은 옮기지 말라'고 알립니다. 상품명, 코드, 사람 이름에 붙입니다. 자식에게 이어지고, 빈 값과 yes는 옮기라는 뜻입니다. 셋 다 이 블로그의 i18n 허브와 바로 이어지는 속성입니다.",
        tables: [
          {
            head: ["속성", "값", "뜻"],
            rows: [
              ["dir", "ltr", "왼쪽에서 오른쪽으로"],
              ["dir", "rtl", "오른쪽에서 왼쪽으로 (아랍어, 히브리어)"],
              ["dir", "auto", "안의 글자에서 방향이 뚜렷한 첫 글자를 보고 정한다"],
              ["translate", "yes, 빈 값", "옮긴다. 적지 않으면 부모를 따른다"],
              ["translate", "no", "글자와 속성 값을 옮기지 않는다"],
            ],
          },
        ],
      },
      {
        label: "hidden, inert, popover",
        body: "셋 다 보이기와 누르기를 바꿉니다. 자세한 동작과 실험은 15장(hidden, inert)과 14장(popover)에 있습니다. hidden은 빈 값이나 hidden이면 그리지 않습니다. until-found면 숨겨 두었다가 브라우저의 찾기나 # 이동이 닿으면 엽니다. 브라우저 기본 스타일의 display: none으로 숨기므로, 내 CSS가 display를 적으면 hidden이 집니다.\n\ninert는 그 안 전체를 누를 수도, 포커스할 수도, 찾을 수도 없게 합니다. popover는 auto(빈 값도 같음), manual, hint 중 하나입니다. auto는 바깥을 누르거나 Esc를 누르면 닫히고, manual은 직접 닫아야 닫힙니다. hint는 풍선 도움말용입니다. 열려도 이미 열린 auto 팝오버를 닫지 않습니다.",
      },
      {
        label: "tabindex, accesskey, autofocus",
        body: "tabindex는 포커스를 받을지와 Tab 순서를 정합니다. 음수는 스크립트의 focus()로만, 0은 문서 순서대로 Tab으로, 양수는 그 숫자 순서로 먼저 갑니다. 양수는 순서를 뒤엉키게 해서 쓰지 않습니다(15장).\n\naccesskey는 단축키 힌트입니다. 값은 글자 하나이고, 공백으로 여럿을 적으면 키보드에 있는 첫 글자를 씁니다. 함께 누르는 키(Alt, Alt+Shift, Ctrl+Option 등)는 브라우저와 운영체제마다 다릅니다. 브라우저나 보조 기술의 단축키와 부딪힐 수 있어, MDN은 일반 사이트에서 쓰지 말라고 권합니다.\n\nautofocus는 페이지가 열릴 때, 또는 그 요소가 든 dialog가 열릴 때 포커스를 줍니다. 문서나 dialog마다 하나만 둡니다. 여럿이면 첫째만 받습니다. MDN은 낭독기 사용자가 앞 내용을 듣지 못한 채 칸으로 옮겨진다고 경고합니다. 작은 화면에서는 페이지가 스크롤되거나 가상 키보드가 뜨기도 합니다.",
      },
      {
        label: "contenteditable, writingsuggestions",
        body: "contenteditable은 아무 요소나 편집 칸으로 만듭니다(15장). 적지 않거나 모르는 값이면 부모를 따릅니다. 편집할 수 있는 곳은 input, textarea, 그리고 contenteditable인 요소입니다. writingsuggestions와 아래 두 블록의 속성은 그런 곳에서만 뜻이 있습니다.\n\nwritingsuggestions는 브라우저가 주는 글쓰기 제안(이어 쓸 말 제안 등)을 켜고 끕니다. 자식에게 이어집니다. 비밀번호, 코드, 주소처럼 제안이 방해되는 칸에 false를 적습니다.",
        tables: [
          {
            head: ["속성", "값", "뜻"],
            rows: [
              ["contenteditable", "true, 빈 값", "서식까지 편집한다"],
              ["contenteditable", "plaintext-only", "서식 없이 글자만 편집한다"],
              ["contenteditable", "false", "편집하지 않는다"],
              ["writingsuggestions", "true, 빈 값", "제안을 켠다"],
              ["writingsuggestions", "false", "제안을 끈다"],
            ],
          },
        ],
      },
      {
        label: "spellcheck, autocorrect, autocapitalize",
        body: "셋 다 사용자가 친 글자를 브라우저가 고쳐 주는 일을 다룹니다. spellcheck는 틀린 낱말에 밑줄을 칠지입니다. 적지 않으면 요소와 브라우저가 정하고, 부모를 따르기도 합니다. MDN은 맞춤법 검사를 위해 내용이 바깥 서비스로 보내질 수 있다고 적습니다. 그래서 민감한 정보가 들어가는 칸에는 false를 적습니다.\n\nautocorrect는 오타를 저절로 고칠지입니다. type이 password, email, url인 input에는 효과가 없습니다. autocapitalize는 대문자를 저절로 넣을지입니다. 물리 키보드에는 효과가 없고, 가상 키보드와 음성 입력에서만 뜻이 있습니다. url, email, password 칸에도 적용되지 않습니다. 한글에는 대소문자가 없어 주로 영어 칸에서 씁니다. 아이디 칸에 none을 적으면 첫 글자가 대문자로 바뀌는 일을 막습니다.",
        tables: [
          {
            head: ["속성", "값", "뜻"],
            rows: [
              ["spellcheck", "true, 빈 값", "맞춤법을 검사한다"],
              ["spellcheck", "false", "검사하지 않는다"],
              ["autocorrect", "on, 빈 값", "오타를 고친다"],
              ["autocorrect", "off", "고치지 않는다"],
              ["autocapitalize", "none, off", "대문자를 넣지 않는다"],
              ["autocapitalize", "sentences, on", "문장의 첫 글자"],
              ["autocapitalize", "words", "낱말마다 첫 글자"],
              ["autocapitalize", "characters", "모든 글자"],
            ],
          },
        ],
      },
      {
        label: "inputmode, enterkeyhint (가상 키보드)",
        body: "터치 기기는 칸을 누르면 화면에 키보드를 띄웁니다. inputmode는 그 키보드의 모양을 고르는 힌트입니다. 값을 검사하지는 않습니다. type=\"number\"는 숫자만 받고 검증까지 하지만, inputmode=\"numeric\"은 키보드만 바꿉니다. MDN은 우편번호나 카드 번호처럼 '숫자로만 된 글자'에 type=\"number\"를 권하지 않습니다. 대신 inputmode=\"numeric\"과 pattern을 쓰라고 합니다.\n\nenterkeyhint는 Enter 키에 붙일 이름이나 그림입니다. enter, done, go, next, previous, search, send 중 하나입니다. next면 '다음', send면 '보내기'처럼 보입니다. 이름만 바꿀 뿐, 눌렀을 때 하는 일은 페이지 코드가 정합니다. virtualkeyboardpolicy(실험)는 포커스를 받을 때 키보드를 저절로 띄울지입니다. auto(빈 값도)는 저절로, manual은 스크립트의 navigator.virtualKeyboard.show()로 띄웁니다.",
        tables: [
          {
            head: ["inputmode 값", "뜨는 키보드"],
            rows: [
              ["text (기본)", "보통 글자 키보드"],
              ["numeric", "숫자 0~9"],
              ["decimal", "숫자와 그 지역의 소수점 (. 또는 ,)"],
              ["tel", "전화 키패드 (*, # 포함)"],
              ["email", "@가 잘 보이는 키보드"],
              ["url", "/가 잘 보이는 키보드"],
              ["search", "검색에 맞춘 키보드 (Enter가 '검색')"],
              ["none", "띄우지 않는다. 페이지가 자체 키보드를 줄 때"],
            ],
          },
        ],
        terms: [
          {
            term: "가상 키보드",
            body: "물리 키보드가 없는 기기에서 화면에 띄우는 키보드입니다. 칸을 누르면 뜨고, 페이지는 힌트로 그 모양을 고를 수 있습니다. 계산대 직원이 손님에 맞춰 계산기나 펜을 꺼내 주는 것과 같습니다.",
          },
        ],
      },
      {
        label: "draggable",
        body: "draggable은 요소를 끌어 옮길 수 있게 합니다(끌어 놓기 API). 값은 true와 false뿐입니다. 불 속성이 아니라서 <p draggable>처럼 이름만 적으면 안 되고, draggable=\"true\"처럼 값을 적습니다. 적지 않거나 모르는 값이면 auto입니다. auto에서는 img, href가 있는 a, 그리고 고른 글자만 끌 수 있습니다.\n\n이미지를 끌 때 따라오는 반투명 그림이 싫으면 draggable=\"false\"를 적습니다. 끌기만 켜서는 놓을 자리가 생기지 않습니다. 놓을 곳은 dragover에서 preventDefault()를 불러 '여기에 놓아도 된다'고 알려야 합니다.",
      },
      {
        label: "직접 해 보기: draggable의 기본값",
        body: "그림, 링크, 점선 문단, 아래 그림을 차례로 끌어 보세요. 놓을 때는 작은 창 안에 놓습니다. 이 실험은 놓기를 받아 막아 둡니다. 속성이 없는 그림과 링크도 끌리고, 출력 줄에 dragstart가 찍힙니다. 점선 문단은 draggable=\"true\"라 끌립니다. 아래 그림은 false라 끌리지 않습니다. 지금 값의 .draggable이 이 결과를 그대로 보여 줍니다. span은 false라서, 끌면 글자 고르기가 됩니다.",
        lab: {
          html: `<p>
  <img id="img1" src="dot-1x.svg" width="48" alt="점">
  <a id="link1" href="target.html">링크</a>
  <span id="span1">보통 글자</span>
</p>
<p id="p1" draggable="true" style="border: 1px dashed; padding: 4px">draggable="true"인 문단</p>
<p><img id="img2" src="dot-1x.svg" width="48" alt="못 끄는 점" draggable="false"></p>
<script>
  addEventListener('dragstart', (e) => console.log('dragstart:', e.target.nodeName));
  addEventListener('dragover', (e) => e.preventDefault());
  addEventListener('drop', (e) => { e.preventDefault(); console.log('drop: 놓았습니다'); });
</script>`,
          height: 230,
          checks: [
            {
              label: ".draggable",
              expr: "['img1', 'link1', 'span1', 'p1', 'img2'].map((id) => id + '=' + document.getElementById(id).draggable)",
            },
          ],
          tryIt: 'p1의 값을 지우고 draggable만 남겨 보세요. 빈 값은 true가 아니라 auto라서 끌리지 않습니다.',
        },
      },
      {
        label: "data-*",
        body: "data-로 시작하는 속성은 스크립트가 쓰는 내 데이터입니다. 파서가 속성 이름을 소문자로 바꾸므로 data- 뒤 이름은 소문자로 적습니다. el.dataset으로 읽고 쓰며, data-stock-count는 dataset.stockCount가 됩니다. 값은 늘 문자열입니다. CSS에서는 [data-state=\"open\"] 같은 선택자로 고릅니다. 자세한 실험은 15장에 있습니다. 화면에 보여야 할 내용은 data-*에만 두지 않습니다. 보조 기술이 이 값을 읽지 못할 수 있습니다.",
      },
      {
        label: "itemscope 등 마이크로데이터 다섯",
        body: "마이크로데이터는 내용에 '이것은 사람이고, 이것이 이름'이라는 뜻을 다는 방법입니다. 화면은 바뀌지 않고, 검색 엔진 같은 기계가 읽습니다. itemscope로 항목을 열고, itemtype에 어휘의 주소(https://schema.org/Person 등)를 적습니다. 안쪽 요소의 itemprop이 그 항목의 속성 이름입니다.\n\nitemprop의 값은 요소마다 다르게 읽습니다. 보통은 글자 내용이고, a와 link는 href, img는 src, meta는 content, time은 datetime입니다. itemid는 항목의 전역 식별자(주소)이고, itemscope와 itemtype이 함께 있어야 합니다. itemref는 항목 밖에 있는 속성을 공백으로 나눈 id 목록으로 끌어옵니다.",
        code: `<div itemscope itemtype="https://schema.org/Person">
  <span itemprop="name">김하나</span>
  <a itemprop="url" href="https://example.com/">홈페이지</a>
  <time itemprop="birthDate" datetime="1990-05-01">5월 1일</time>
</div>`,
        codeLang: "html",
        terms: [
          {
            term: "마이크로데이터 (microdata)",
            body: "HTML 요소에 '이것은 이름, 이것은 생일' 같은 뜻을 붙이는 표준 방법입니다. 화면 모양은 그대로이고, 기계가 읽고 쓰기 좋게 정리됩니다. 물건에 붙인 바코드처럼 사람보다 기계를 위한 표시입니다.",
          },
        ],
      },
      {
        label: "nonce",
        body: "nonce는 CSP(콘텐츠 보안 정책)와 함께 씁니다. 서버가 응답마다 새 무작위 값을 만듭니다. 그 값을 CSP 헤더(script-src 'nonce-값')와 <script nonce=\"값\">에 같이 적습니다. 그러면 브라우저는 값이 맞는 script만 실행합니다. style도 style-src로 같은 방식을 씁니다. 공격자가 끼워 넣은 스크립트는 값을 몰라서 막힙니다. MDN은 값이 매번 달라야 하고 맞히기 어려워야 한다고 적습니다.\n\nCSP 헤더가 있는 페이지에서는 getAttribute('nonce')가 빈 문자열을 돌려줍니다. 값은 el.nonce 프로퍼티로만 읽힙니다. CSS 선택자 같은 길로 값을 빼 가지 못하게 숨기는 것입니다.",
        terms: [
          {
            term: "논스 (nonce)",
            body: "'한 번만 쓰는 수'라는 뜻의 무작위 값입니다. 응답마다 새로 만들어, 그 응답 안의 믿을 수 있는 스크립트에만 붙입니다. 그날만 통하는 출입증과 같아서, 어제 출입증을 주워도 오늘은 못 들어옵니다.",
          },
        ],
      },
      {
        label: "role",
        body: "role은 ARIA 속성으로, 요소가 보조 기술에 어떤 역할로 알려질지 정합니다. 전역 속성 목록에 함께 들어 있습니다. 대부분의 HTML 요소는 이미 역할을 갖고 있습니다. button은 button, nav는 navigation입니다. 그래서 맞는 요소를 쓰는 것이 먼저이고, role은 HTML로 나타낼 수 없을 때 씁니다. 값과 함정은 'ARIA 속성과 role' 장에서 봅니다.",
      },
      {
        label: "headingoffset 등 실험 속성과 anchor",
        body: "아래 다섯은 표준이 아직 굳지 않았거나 표준에 없습니다. 지원하는 브라우저가 적으니 쓰기 전에 MDN의 호환표를 확인합니다.\n(1) headingoffset(실험)은 안쪽 h1~h6의 계산된 수준을 그 수만큼 올립니다. 다른 곳에서 가져온 조각을 넣어도 개요가 맞게 하려는 것입니다.\n(2) headingreset(실험)은 바깥의 headingoffset이 안으로 이어지지 않게 끊습니다.\n(3) containertiming(실험)은 요소를 성능 측정의 묶음 뿌리로 정합니다. PerformanceObserver의 container 종류가 이 묶음을 잽니다.\n(4) containertimingignore(실험)는 그 요소와 자손을 그 측정에서 뺍니다.\n(5) anchor(비표준)는 위치를 잡을 요소에 기준 요소의 id를 적어 CSS 앵커 위치 잡기와 잇습니다. 표준 쪽에서는 CSS의 anchor-name과 position-anchor로 같은 일을 합니다.",
      },
      {
        label: "이벤트 처리 속성 (onclick 등)",
        body: "onclick, oninput, onsubmit처럼 on으로 시작하는 속성도 모든 요소에 붙습니다. 값은 자바스크립트 코드이고, 그 이벤트가 나면 실행됩니다. MDN은 이 속성들을 권하지 않습니다. 까닭은 셋입니다.\n(1) 한 이벤트에 하나뿐입니다. 스크립트가 el.onclick에 함수를 넣으면 속성으로 적은 코드를 덮어씁니다.\n(2) HTML과 스크립트가 섞여 고치기 어렵습니다.\n(3) script-src에 'unsafe-inline'이 없는 CSP는 이런 인라인 코드를 막습니다.\n\naddEventListener는 한 이벤트에 리스너를 여럿 겹쳐 달 수 있고, removeEventListener로 뗄 수 있습니다. once, passive, capture 같은 선택지도 줍니다. 모든 요소에 붙는다고 모든 이벤트를 받는 것은 아닙니다. onvolumechange는 어디에나 적을 수 있지만 그 이벤트는 미디어 요소에만 납니다. body의 onload 등 몇몇은 window의 이벤트를 듣습니다.",
        terms: [
          {
            term: "이벤트 리스너",
            body: "이벤트가 날 때 부를 함수를 등록해 둔 것입니다. 한 요소의 한 이벤트에 여럿을 달 수 있고, 단 순서대로 불립니다. 초인종 하나에 여러 사람이 알림을 신청해 두면 누를 때마다 모두에게 알림이 가는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: onclick은 하나, 리스너는 여럿",
        body: "버튼을 눌러 보세요. 기록의 출력 줄에 '속성 onclick', '리스너 1', '리스너 2'가 단 순서대로 찍힙니다. 이제 해 볼 것을 따라 마지막 줄의 //를 지우고 실행해 보세요. 이번에는 '속성 onclick' 대신 '프로퍼티 onclick'이 찍힙니다. onclick 자리는 하나라서 덮어쓴 것입니다. 리스너 둘은 그대로입니다. 지금 값을 보면 getAttribute('onclick')은 처음 글자 그대로입니다. 그런데 실제로 도는 .onclick의 코드는 바뀌어 있습니다.",
        lab: {
          html: `<button id="b" type="button" onclick="console.log('속성 onclick')">눌러 보세요</button>
<script>
  const btn = document.getElementById('b');
  btn.addEventListener('click', () => console.log('리스너 1'));
  btn.addEventListener('click', () => console.log('리스너 2'));
  // btn.onclick = () => console.log('프로퍼티 onclick');
</script>`,
          height: 120,
          checks: [
            { label: "getAttribute('onclick')", expr: "document.getElementById('b').getAttribute('onclick')" },
            { label: ".onclick의 코드", expr: "String(document.getElementById('b').onclick)" },
          ],
          tryIt: "마지막 줄 앞의 //를 지우고 '이 코드로 실행'을 눌러 보세요.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "전역 속성은 어느 요소에나 붙어서, 잘못 적어도 오류가 나지 않습니다. 결과로만 드러납니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["같은 id를 두 요소에 달았다", "# 이동, label의 for, getElementById가 첫째만 찾는다", "id는 하나만. 여럿을 묶으려면 class"],
              ['class="a,b"로 나눴다', "a,b라는 이름 하나가 된다", "공백으로 나눈다"],
              ["<img draggable>로 끌기를 끄려 했다", "빈 값은 auto라 그대로 끌린다", 'draggable="false"처럼 값을 적는다'],
              ["중요한 안내를 title에만 넣었다", "키보드, 터치 사용자는 보지 못한다", "보이는 글자로 적는다"],
              ["onclick 속성이 배포 뒤에 돌지 않는다", "CSP가 인라인 코드를 막았다", "addEventListener로 옮긴다"],
              ["상품명이 자동 번역으로 바뀌었다", "번역 도구가 모든 글을 옮긴다", '그 부분에 translate="no"'],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 같은 id가 둘이면 getElementById와 # 이동은 어느 요소를 찾나요?\n2) draggable은 왜 이름만 적으면 안 되나요?\n3) inputmode=\"numeric\"과 type=\"number\"는 무엇이 다른가요?\n4) onclick 속성 대신 addEventListener를 쓰는 까닭 두 가지는?",
      },
    ],
    sources: [
      { label: "MDN — Global attributes", href: `${REF}/Global_attributes` },
      { label: "MDN — draggable", href: `${REF}/Global_attributes/draggable` },
      { label: "MDN — inputmode", href: `${REF}/Global_attributes/inputmode` },
      { label: "MDN — itemscope", href: `${REF}/Global_attributes/itemscope` },
      { label: "MDN — Event handler attributes", href: `${REF}/Attributes#event_handler_attributes` },
      { label: "WHATWG — Global attributes", href: `${SPEC}/dom.html#global-attributes` },
    ],
  },

  {
    id: "html-attr-link",
    name: "링크와 리소스 속성",
    tagline: "다른 파일을 가리키고, 어떻게 받을지 정한다",
    intro:
      "href와 src는 다른 문서나 파일의 주소입니다. 그 둘레의 속성이 나머지를 정합니다. rel은 어떤 관계인지, target은 어느 창에서 열지 정합니다. crossorigin, referrerpolicy, fetchpriority는 어떻게 받을지, integrity는 받은 것이 맞는지 정합니다. 이 시트는 a, area, link, base, script, img 등에 흩어진 이 속성들을 한곳에 모읍니다. 링크를 누를 때 브라우저가 길을 고르는 과정은 7장에 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "링크와 파일을 가리키는 속성 18개입니다. 같은 이름이라도 요소마다 조금씩 다르게 쓰이니 '붙는 곳'을 먼저 보세요. img의 srcset, sizes, loading은 '이미지와 표 속성' 장에 있습니다.",
        tables: [
          {
            head: ["속성", "붙는 곳", "값", "하는 일"],
            rows: [
              ["href", "a, area, link, base", "주소", "가리키는 곳"],
              ["src", "img, script, iframe, audio, video, source, track, embed, input(image)", "주소", "불러와 그 자리에 넣을 파일"],
              ["rel", "a, area, link, form", "공백으로 나눈 링크 종류", "이 문서와 대상의 관계"],
              ["target", "a, area, form, base", "_self, _blank, _parent, _top, 창 이름", "어느 창에서 열지"],
              ["download", "a, area", "빈 값 또는 파일 이름", "이동 대신 파일로 저장"],
              ["hreflang", "a, link", "언어 태그", "대상의 언어 (힌트)"],
              ["type", "a, link", "MIME 형식", "대상의 형식 (힌트)"],
              ["media", "link, style, source, meta", "미디어 쿼리", "어느 화면, 장치에 쓸지"],
              ["as", "link (preload, modulepreload)", "script, style, font, image, fetch 등", "미리 받을 것의 종류"],
              ["crossorigin", "img, script, link, audio, video", "anonymous, use-credentials", "CORS로 받을지, 자격 증명을 실을지"],
              ["integrity", "script, link", "sha256-, sha384-, sha512- 해시", "받은 파일이 그 파일인지 검사"],
              ["referrerpolicy", "a, area, img, iframe, script, link", "no-referrer 등 8개", "Referer 헤더에 무엇을 담을지"],
              ["fetchpriority", "img, link, script", "high, low, auto", "같은 종류 안에서 받는 순서 힌트"],
              ["ping", "a, area", "공백으로 나눈 주소들", "따라갈 때 그 주소에 알린다"],
              ["cite", "blockquote, q, del, ins", "주소", "인용, 고침의 출처"],
              ["datetime", "time, del, ins", "날짜, 시간 글자", "기계가 읽는 날짜와 시간"],
              ["sizes", "link (rel=icon)", "any 또는 16x16 같은 크기들", "아이콘 파일의 크기"],
              ["blocking", "link, script, style", "render", "받을 때까지 화면 그리기를 막는다"],
            ],
          },
        ],
      },
      {
        label: "href",
        body: "href는 가리키는 곳의 주소입니다. a와 area에서는 누르면 갈 곳, link에서는 불러올 파일, base에서는 문서 전체의 기준 주소입니다. https://로 시작하는 절대 주소, /로 시작하는 주소, 상대 주소, #조각을 모두 받습니다. 상대 주소는 문서의 기준 주소로 풀립니다. 기준 주소는 보통 문서의 주소이고, <base href>가 있으면 그 값입니다. getAttribute('href')는 적은 글자, a.href는 풀린 주소입니다(7장).\n\nbase는 head 안에서, 주소를 쓰는 다른 요소보다 앞에 둡니다. 여럿이면 첫째 href와 첫째 target만 씁니다. data:와 javascript: 주소는 받지 않습니다. MDN은 base가 있으면 href=\"#intro\" 같은 조각 링크도 base 주소로 풀린다고 적습니다. 같은 문서 안에서 스크롤하지 않고 base 주소로 요청을 보냅니다.",
      },
      {
        label: "직접 해 보기: base가 바꾸는 진짜 주소",
        body: "base의 href를 /labs/html/target.html로 두었습니다. 지금 값을 보면 세 링크가 모두 이 주소를 기준으로 풀립니다. sample.txt는 같은 폴더의 파일이 되고, ?from=base는 target.html에 쿼리가 붙습니다. 셋째 #note를 눌러 보세요. 아래에 id=\"note\"인 문단이 있는데도 스크롤하지 않습니다. 기록의 주소 줄에 target.html#note가 찍히고, 예상 줄은 '다른 주소'라고 적습니다. 그리고 작은 창이 target.html로 이동합니다.",
        lab: {
          html: `<base href="/labs/html/target.html">
<p><a href="sample.txt">sample.txt</a></p>
<p><a href="?from=base">?from=base</a></p>
<p><a href="#note">#note (아래 문단일까?)</a></p>
<p id="note">id="note"인 문단</p>`,
          height: 190,
          checks: [
            { label: "document.baseURI", expr: "document.baseURI" },
            { label: "href 글자 → a.href", expr: "[...document.links].map((a) => a.getAttribute('href') + ' → ' + a.href)" },
          ],
          tryIt: "base 줄을 지우고 실행한 뒤 #note를 눌러 보세요. 이번에는 문서를 그대로 두고 아래 문단으로 스크롤합니다.",
        },
      },
      {
        label: "src",
        body: "src는 불러와서 그 자리에 넣을 파일의 주소입니다. href가 '저쪽을 가리킨다'면, src는 '이쪽으로 가져온다'입니다. 그래서 src가 있는 요소는 만나면 곧 파일을 받기 시작합니다. loading=\"lazy\"인 img와 iframe, preload=\"none\"인 미디어는 예외입니다(8장, 9장, 10장). script는 src가 있으면 안쪽 코드를 실행하지 않습니다. 이미지와 미디어는 srcset이나 source로 여러 후보를 줄 수 있습니다(8장, 9장). iframe은 srcdoc이 있으면 src보다 srcdoc을 씁니다(10장).",
      },
      {
        label: "rel",
        body: "rel은 이 문서와 대상이 어떤 관계인지를 공백으로 나눈 낱말로 적습니다. 낱말은 하는 일에 따라 셋으로 나뉩니다.\n(1) link에서 파일을 불러오는 것: stylesheet, icon, preload 등\n(2) 다른 문서를 가리키며 관계만 알리는 것: canonical, alternate, next 등\n(3) a, area, form의 링크 동작을 바꾸는 것: noopener, noreferrer, nofollow 등\n\n붙을 수 없는 요소에 적은 낱말은 효과가 없습니다. a에 rel=\"stylesheet\"를 적어도 스타일을 불러오지 않습니다. 표 밖에 help, bookmark, tag, privacy-policy, terms-of-service, expect 등도 있습니다.",
        tables: [
          {
            caption: "자주 쓰는 rel 값",
            head: ["값", "붙는 곳", "하는 일"],
            rows: [
              ["stylesheet", "link", "스타일 시트를 불러와 적용한다"],
              ["icon", "link", "탭에 보일 아이콘 (sizes, type과 함께)"],
              ["manifest", "link", "웹 앱 매니페스트 파일"],
              ["preload", "link", "이 페이지에서 곧 쓸 파일을 먼저 받는다. as가 꼭 필요"],
              ["modulepreload", "link", "모듈 스크립트를 미리 받아 해석해 둔다"],
              ["prefetch", "link", "다음 페이지에서 쓸 것 같은 파일을 미리 받아 둔다"],
              ["preconnect", "link", "그 출처에 미리 연결해 둔다"],
              ["dns-prefetch", "link", "그 도메인의 DNS만 미리 찾아 둔다"],
              ["canonical", "link", "이 내용의 대표 주소 (검색 엔진용)"],
              ["alternate", "link, a, area", "다른 판. hreflang과 함께면 번역판, type과 함께면 RSS 같은 다른 형식"],
              ["author", "link, a, area", "글쓴이에 대한 페이지"],
              ["license", "link, a, area, form", "이 내용의 이용 조건"],
              ["search", "link, a, area, form", "이 사이트의 검색 기능"],
              ["next, prev", "link, a, area, form", "이어지는 문서의 다음, 이전"],
              ["noopener", "a, area, form", "새 창에 window.opener를 주지 않는다"],
              ["noreferrer", "a, area, form", "Referer를 보내지 않는다. noopener도 겸한다"],
              ["opener", "a, area, form", "_blank여도 opener를 남긴다"],
              ["nofollow", "a, area, form", "검색 엔진에 '이 링크를 보증하지 않는다'"],
              ["external", "a, area, form", "다른 사이트로 가는 링크라는 표시"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: noopener, noreferrer, opener",
        body: "넷 다 새 탭을 엽니다. 새 탭의 target.html이 도착 소식을 보내면, 기록에 window.opener와 document.referrer가 찍힙니다. 첫째는 opener가 null이고, referrer는 이 작은 창의 주소입니다. _blank에는 noopener가 저절로 붙기 때문입니다. 둘째는 opener도 referrer도 비어 있습니다. 셋째는 opener가 '있음'입니다. 넷째는 rel을 적지 않았는데도 opener가 '있음'입니다. 저절로 붙는 noopener는 _blank에만 있기 때문입니다. opener가 남은 새 탭에서 'opener의 주소 바꿔 보기'를 누르면 이 작은 창이 바뀝니다(7장).",
        lab: {
          html: `<p><a href="target.html?rel=none" target="_blank">_blank (rel 없음)</a></p>
<p><a href="target.html?rel=noreferrer" target="_blank" rel="noreferrer">_blank + noreferrer</a></p>
<p><a href="target.html?rel=opener" target="_blank" rel="opener">_blank + opener</a></p>
<p><a href="target.html?rel=named" target="side">target="side" (이름)</a></p>`,
          height: 180,
          tryIt: '넷째 링크에 rel="noopener"를 붙이고 실행해 보세요. 이름으로 연 탭에서도 opener가 null이 됩니다.',
        },
      },
      {
        label: "target",
        body: "target은 링크나 폼의 결과를 어느 창에 열지 정합니다. 밑줄로 시작하는 넷은 예약어이고, 나머지 값은 창의 이름입니다. 그 이름을 가진 창(name이 같은 iframe, 앞서 그 이름으로 연 탭)이 있으면 거기서 엽니다. 없으면 새 탭을 만들어 그 이름을 붙입니다. base의 target은 target을 적지 않은 모든 링크와 폼의 기본값이 됩니다.\n\n_blank는 rel=\"noopener\"를 붙인 것처럼 동작해 opener를 남기지 않습니다. 그런데 이름으로 연 새 탭에는 이 보호가 없습니다. 이름으로 다른 사이트를 열 때는 rel=\"noopener\"를 직접 적습니다.",
        tables: [
          {
            head: ["값", "여는 곳"],
            rows: [
              ["_self", "지금 창 (기본)"],
              ["_blank", "새 탭이나 새 창. opener를 남기지 않는다"],
              ["_parent", "한 겹 바깥 창. 바깥이 없으면 _self"],
              ["_top", "맨 바깥 창. 바깥이 없으면 _self"],
              ["그 밖의 이름", "그 이름의 창. 없으면 새로 만들어 이름을 붙인다"],
            ],
          },
        ],
        terms: [
          {
            term: "브라우징 컨텍스트 (browsing context)",
            body: "문서 하나를 담아 보여 주는 그릇입니다. 탭, 창, iframe이 저마다 하나씩입니다. target에 적는 이름은 이 그릇의 이름입니다. 액자에 이름표를 붙여 두고 '이 사진은 거실 액자에'라고 말하는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 이름 붙은 창으로 열기",
        body: "작은 창 안에 name=\"box\"인 iframe이 있습니다. 링크를 누르면 작은 창은 그대로이고, box 안에 target.html이 열립니다. 예상 줄은 '이름이 box인 창을 찾는다'고 적고, 실제 줄에는 iframe의 load가 찍힙니다. 폼도 같습니다. form의 target이 box라서, 보낸 결과가 box에 열립니다. 지금 값의 box 창 주소가 바뀌는 것을 보세요.",
        lab: {
          html: `<iframe name="box" src="sample.txt" height="90"></iframe>
<p><a href="target.html?from=link" target="box">box 창에서 열기 (a)</a></p>
<form action="target.html" target="box">
  <input name="from" value="form"> <button>box로 보내기 (form)</button>
</form>`,
          height: 230,
          checks: [
            { label: "box 창의 주소", expr: "document.querySelector('iframe').contentWindow.location.href" },
          ],
          tryIt: 'a의 target을 "boxx"처럼 없는 이름으로 바꿔 보세요. 그 이름의 창이 없어 새 탭이 열립니다.',
        },
      },
      {
        label: "download",
        body: "download는 a와 area에서 이동 대신 파일로 저장하게 합니다. 값을 비우면 브라우저가 이름을 고르고, 값을 적으면 그 이름을 제안합니다. 이름 속의 /와 \\는 _로 바뀝니다. 같은 출처의 주소, blob:, data:에서만 동작합니다. 다른 출처면 무시하고 그냥 이동합니다. 서버가 Content-Disposition 헤더에 filename을 주면 그 이름이 download 값보다 앞섭니다. 실험은 7장에 있습니다.",
      },
      {
        label: "hreflang, type",
        body: "둘 다 대상에 대한 힌트이고, 브라우저가 스스로 하는 일은 거의 없습니다. hreflang은 대상의 언어이고, 값은 lang과 같은 언어 태그입니다. href가 있을 때만 씁니다. i18n에서 가장 흔한 쓰임은 번역판 알리기입니다. head에 언어마다 link rel=\"alternate\"를 하나씩 적습니다. 그러면 검색 엔진이 사용자 언어에 맞는 판을 고를 수 있습니다.\n\ntype은 대상의 MIME 형식입니다. a의 type은 힌트일 뿐입니다. link의 type은 rel=\"preload\"에서 쓸모가 있습니다. 브라우저가 지원하지 않는 형식이면 받지 않고 건너뜁니다. 스타일 시트의 type=\"text/css\"는 적지 않아도 됩니다. script, source, button, input, ol의 type은 이름만 같고 뜻이 다른 속성입니다.",
        code: `<link rel="alternate" hreflang="ko" href="https://example.com/ko/">
<link rel="alternate" hreflang="en" href="https://example.com/en/">
<link rel="preload" href="/hero.avif" as="image" type="image/avif">`,
        codeLang: "html",
        terms: [
          {
            term: "MIME 형식 (MIME type)",
            body: "파일의 종류를 text/html, image/png처럼 '큰 갈래/작은 갈래'로 적은 이름입니다. 브라우저는 확장자보다 이 값을 보고 파일을 다룹니다. 상자 겉에 붙은 '유리, 깨지기 쉬움' 같은 내용물 표시입니다.",
          },
        ],
      },
      {
        label: "media",
        body: "media는 미디어 쿼리를 받아 어느 화면, 어느 장치에 쓸지 정합니다. 스타일 시트를 부르는 link, style, picture 안의 source, theme-color를 적는 meta에 붙습니다. link와 style에서 적지 않으면 all입니다. media=\"print\"인 스타일 시트는 인쇄할 때만 적용됩니다. media=\"(prefers-color-scheme: dark)\"인 theme-color는 어두운 모드에서만 씁니다. source의 media는 8장에서 봅니다.",
      },
      {
        label: "as",
        body: "as는 link rel=\"preload\"에는 꼭 적습니다. rel=\"modulepreload\"에는 골라 적고, 다른 rel에는 적지 않습니다. 미리 받을 것이 무엇인지 알아야 브라우저가 우선순위, Accept 헤더, CSP를 맞게 정합니다. 그리고 나중에 진짜 요청이 왔을 때 미리 받은 것을 꺼내 씁니다.\n\nfont와 fetch는 같은 출처여도 crossorigin을 함께 적어야 합니다. 빼면 미리 받은 파일과 진짜 요청이 맞지 않아 같은 파일을 두 번 받습니다. as=\"image\"에는 imagesrcset과 imagesizes를 붙여 반응형 이미지를 미리 받을 수 있습니다.",
        tables: [
          {
            head: ["값", "쓰는 rel", "미리 받는 것"],
            rows: [
              ["script", "preload, modulepreload", "스크립트"],
              ["style", "preload, modulepreload", "스타일 시트"],
              ["font", "preload", "웹 글꼴. crossorigin이 필요하다"],
              ["image", "preload", "이미지"],
              ["fetch", "preload", "fetch로 받을 데이터. crossorigin이 필요하다"],
              ["track", "preload", "자막 파일 (WebVTT)"],
              ["worker, json 등", "modulepreload", "워커 모듈, JSON 모듈"],
            ],
          },
        ],
      },
      {
        label: "crossorigin",
        body: "crossorigin은 다른 출처의 파일을 CORS 요청으로 받을지 정합니다. 적지 않으면 CORS 없이 받습니다. 그래도 화면에 그리거나 실행은 되지만 쓰임이 막힙니다. 다른 출처의 이미지는 canvas에 그린 뒤 픽셀을 읽을 수 없습니다. 다른 출처 스크립트의 에러는 자세한 내용 없이 보입니다. crossorigin을 적으면 서버가 Access-Control-Allow-Origin으로 허락해야 합니다. 허락하지 않으면 불러오기가 실패합니다.",
        tables: [
          {
            head: ["값", "뜻"],
            rows: [
              ["(적지 않음)", "CORS 없이 받는다. 쓰임이 제한된다"],
              ["anonymous, 빈 값", "CORS로 받는다. 다른 출처에는 쿠키 같은 자격 증명을 보내지 않는다"],
              ["use-credentials", "CORS로 받고 자격 증명도 보낸다"],
              ["모르는 값", "anonymous로 여긴다"],
            ],
          },
        ],
        terms: [
          {
            term: "CORS",
            body: "다른 출처의 파일을 페이지가 써도 되는지 서버가 허락하는 규칙입니다. 서버가 Access-Control-Allow-Origin 헤더로 '이 출처는 써도 된다'고 답해야 합니다. 남의 집 물건을 빌리려면 주인의 허락 쪽지가 있어야 하는 것과 같습니다.",
          },
        ],
      },
      {
        label: "integrity",
        body: "integrity는 받을 파일의 해시를 적어, 받은 내용이 그 파일과 똑같은지 검사하게 합니다. CDN에 올린 라이브러리가 몰래 바뀌는 공급망 공격을 막습니다. 값은 sha384-처럼 해시 이름 뒤에 base64 값을 이은 것이고, 공백으로 여럿을 적을 수 있습니다. 해시가 맞지 않으면 브라우저는 그 파일을 쓰지 않습니다. 스크립트면 실행하지 않고, 스타일 시트면 적용하지 않습니다. link에서는 rel이 stylesheet, preload, modulepreload일 때만 적습니다. 다른 출처의 파일이면 crossorigin도 적어야 하고, 서버가 CORS를 허락해야 합니다.",
        code: `<script src="https://cdn.example.com/lib.js"
  integrity="sha384-(파일 내용으로 만든 해시)"
  crossorigin="anonymous"></script>`,
        codeLang: "html",
        terms: [
          {
            term: "해시 (hash)",
            body: "파일 내용을 넣으면 짧은 값이 나오는 계산입니다. 한 글자만 바뀌어도 값이 완전히 달라집니다. 그래서 값을 견주면 내용이 같은지 알 수 있습니다. 택배 상자의 봉인 스티커처럼 뜯긴 흔적을 드러냅니다.",
          },
        ],
      },
      {
        label: "referrerpolicy",
        body: "링크를 따라가거나 파일을 받을 때 브라우저는 Referer 헤더에 어디서 왔는지를 담습니다. referrerpolicy는 그 양을 줄입니다. 적지 않으면 문서의 정책을 따릅니다. 문서도 정하지 않았으면 기본값 strict-origin-when-cross-origin입니다. 이 기본값은 같은 출처에는 전체 주소를, 다른 출처에는 출처만 보냅니다. https에서 http로 내려갈 때는 아무것도 보내지 않습니다.\n\n전체 주소라도 # 뒤 조각과 사용자 이름, 비밀번호는 빠집니다. 주소에 개인 정보가 있으면 no-referrer나 origin으로 더 줄입니다. rel=\"noreferrer\"는 no-referrer에 noopener를 더한 것과 같습니다.",
        tables: [
          {
            head: ["값", "보내는 것"],
            rows: [
              ["no-referrer", "아무것도 보내지 않는다"],
              ["no-referrer-when-downgrade", "전체 주소. 단 https에서 http로는 보내지 않는다"],
              ["origin", "어디로든 출처만"],
              ["origin-when-cross-origin", "같은 출처엔 전체 주소, 다른 출처엔 출처만"],
              ["same-origin", "같은 출처엔 전체 주소, 다른 출처엔 없음"],
              ["strict-origin", "출처만. 단 https에서 http로는 없음"],
              ["strict-origin-when-cross-origin (기본)", "같은 출처엔 전체 주소, 다른 출처엔 출처만, https에서 http로는 없음"],
              ["unsafe-url", "어디로든 전체 주소 (위험)"],
            ],
          },
        ],
        terms: [
          {
            term: "Referer 헤더",
            body: "요청에 실려 가는 '어느 페이지에서 왔나'라는 정보입니다. 철자가 Referer인 것은 표준을 만들 때의 오타가 굳은 것입니다. 받은 문서는 document.referrer로 읽습니다. 소개장에 적힌 '누구의 소개로 왔다'는 한 줄과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: referrerpolicy가 줄이는 referrer",
        body: "box 창의 target.html은 받은 document.referrer를 화면에 보여 줍니다. 지금 값에도 같은 값이 나옵니다. 처음 열린 box에는 이 작은 창의 전체 주소가 갑니다. 같은 출처이고, 기본 정책은 같은 출처에 전체 주소를 보내기 때문입니다. origin 링크를 누르면 경로가 빠지고 https://호스트/ 모양의 출처만 남습니다. no-referrer를 누르면 빈 문자열이 됩니다.",
        lab: {
          html: `<iframe name="box" src="target.html?p=start" height="110"></iframe>
<p>
  <a href="target.html?p=default" target="box">정책 없음</a>,
  <a href="target.html?p=origin" target="box" referrerpolicy="origin">origin</a>,
  <a href="target.html?p=none" target="box" referrerpolicy="no-referrer">no-referrer</a>
</p>`,
          height: 210,
          checks: [
            { label: "box의 location.search", expr: "document.querySelector('iframe').contentWindow.location.search" },
            { label: "box의 document.referrer", expr: "document.querySelector('iframe').contentDocument.referrer" },
          ],
          tryIt: 'origin 링크에 rel="noreferrer"를 더해 보세요. rel이 이겨서 referrer가 비어 있습니다.',
        },
      },
      {
        label: "fetchpriority",
        body: "fetchpriority는 같은 종류의 파일끼리 무엇을 먼저 받을지에 대한 힌트입니다. high, low, auto(기본)이고, 모르는 값도 auto입니다. 첫 화면의 큰 이미지에 high를 주면 그 이미지를 일찍 받을 수 있습니다. 화면 밖 슬라이드의 이미지에는 low를 줍니다. 힌트일 뿐이라 브라우저가 따르지 않을 수 있습니다. 상대적인 순서라서, 모든 것에 high를 주면 아무것도 앞서지 않습니다.",
      },
      {
        label: "ping",
        body: "ping은 a, area의 링크를 따라갈 때, 적어 둔 주소들로 POST 요청을 보냅니다. 본문은 PING이라는 글자이고, 주로 클릭을 세는 데 씁니다. 공백으로 주소를 여럿 적을 수 있습니다. 사용자가 무엇을 눌렀는지 다른 곳에 알려지는 일이라, 브라우저와 설정에 따라 보내지 않기도 합니다. 꼭 세어야 하는 값이면 ping에만 기대지 않습니다.",
      },
      {
        label: "cite, datetime",
        body: "cite는 인용(blockquote, q)이나 고침(del, ins)의 출처 주소입니다. 브라우저는 이 주소를 화면에 보여 주지 않습니다. 사람이 볼 출처는 <cite> 요소나 링크로 따로 적습니다.\n\ndatetime은 time, del, ins에 기계가 읽는 날짜와 시간을 적습니다. 화면의 '어제 오후 3시'는 사람이 읽습니다. datetime=\"2026-11-16T15:00+09:00\"은 달력 앱이나 검색 엔진이 읽습니다. time은 아래 모양을 모두 받고, del과 ins는 날짜, 또는 날짜와 시간만 받습니다(5장).",
        tables: [
          {
            head: ["모양", "예"],
            rows: [
              ["날짜", "2026-11-17"],
              ["연월", "2026-11"],
              ["시간", "09:30, 09:30:15"],
              ["날짜와 시간", "2026-11-17T09:30 (T 대신 공백도 됨)"],
              ["시간대", "Z, +09:00, +0900"],
              ["주", "2026-W47"],
              ["기간", "PT2H30M, 2h 30m"],
            ],
          },
        ],
      },
      {
        label: "sizes (link rel=icon)",
        body: "link rel=\"icon\"의 sizes는 그 아이콘 파일에 든 크기입니다. 값은 any(SVG처럼 늘려도 되는 것)이거나, 공백으로 나눈 가로x세로(16x16 32x32)입니다. 브라우저는 icon이 여럿일 때 필요한 크기를 고르는 데 이 값을 씁니다. 대부분의 아이콘 형식은 크기를 하나만 담으므로 값도 대개 하나입니다. img와 source의 sizes는 이름만 같고, 그릴 너비를 적는 다른 속성입니다(8장).",
      },
      {
        label: "blocking",
        body: "blocking=\"render\"는 그 파일을 다 받아 적용하거나 실행할 때까지 화면 그리기를 막습니다. 값은 지금 render 하나뿐입니다. head 안의 것만 그리기를 막을 수 있습니다. head의 link rel=\"stylesheet\"는 원래 그리기를 막으므로 적지 않아도 됩니다. 스크립트로 나중에 넣은 스타일 시트나 async, defer, module 스크립트처럼 원래는 막지 않는 것에 씁니다. link에서는 rel이 stylesheet나 expect일 때만 적습니다. 막는 만큼 첫 화면이 늦어지니 꼭 필요할 때만 씁니다.",
      },
      {
        label: "문제가 나는 경우",
        body: "주소를 다루는 속성의 문제는 대개 주소가 어떻게 풀리는지, 또는 무엇이 함께 있어야 하는지를 놓쳐서 생깁니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["base를 넣었다", "#조각 링크가 스크롤 대신 base 주소로 간다", "base 없이 /로 시작하는 주소를 쓴다"],
              ['다른 사이트를 target="side"로 열었다', "새 탭에 opener가 남는다", 'rel="noopener"를 적는다'],
              ['as="font"로 미리 받았다', "crossorigin이 없어 같은 글꼴을 또 받는다", "crossorigin을 더한다"],
              ['rel="preload"에 as를 빼먹었다', "미리 받지 않는다", "as를 적는다"],
              ["CDN 스크립트에 integrity를 달았다", "파일이 바뀌었거나 crossorigin이 없어 막힌다", "해시를 새로 만들고 crossorigin을 적는다"],
              ["다른 출처 이미지를 canvas에 그렸다", "픽셀을 읽으면 보안 에러가 난다", 'crossorigin="anonymous"와 서버의 CORS 허락'],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) <base href>가 있을 때 href=\"#note\"는 어디로 풀리나요?\n2) target=\"_blank\"와 target=\"side\"로 연 새 탭의 window.opener는 각각 어떤가요?\n3) 기본 referrer 정책에서 다른 출처로 가는 요청에는 무엇이 실리나요?\n4) as=\"font\"로 미리 받을 때 함께 적어야 하는 속성은?",
      },
    ],
    sources: [
      { label: "MDN — rel", href: `${REF}/Attributes/rel` },
      { label: "MDN — <a>", href: `${REF}/Elements/a` },
      { label: "MDN — <link>", href: `${REF}/Elements/link` },
      { label: "MDN — <base>", href: `${REF}/Elements/base` },
      { label: "MDN — crossorigin", href: `${REF}/Attributes/crossorigin` },
      { label: "MDN — Referrer-Policy", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy" },
    ],
  },

  {
    id: "html-attr-form",
    name: "폼 속성",
    tagline: "칸의 이름과 처음 값, 막기와 검사, 보내는 법",
    intro:
      "폼 칸의 속성은 네 가지를 정합니다. name, value는 무엇이라는 이름으로 보낼지, disabled, readonly는 사용자가 고칠 수 있는지 정합니다. required, pattern, min은 어떤 값이어야 하는지, form, formaction, enctype은 어떻게 보낼지 정합니다. 이 시트는 input, select, textarea, button, form에 붙는 속성을 한곳에 모읍니다. 폼을 보내는 흐름은 12장, 검증이 걸리는 과정은 13장에 있습니다. input의 type 값은 'input의 type 값' 장에서 봅니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "폼 칸에 붙는 속성 28개입니다. form에만 붙는 action, method, novalidate는 12장과 13장에서 다룹니다. '붙는 곳'의 '글자 칸'은 input의 text, search, url, tel, email, password입니다.",
        tables: [
          {
            head: ["속성", "붙는 곳", "값", "하는 일"],
            rows: [
              ["name", "input, select, textarea, button, form 등", "글자", "보낼 값의 이름. 없으면 보내지 않는다"],
              ["value", "input, button, option", "글자", "처음 값, 보낼 값"],
              ["disabled", "input, select, textarea, button, fieldset, option, optgroup", "불 속성", "끈다. 포커스도, 보내기도 없다"],
              ["readonly", "input(글자, 날짜, 숫자 칸), textarea", "불 속성", "고치지만 못한다. 값은 보낸다"],
              ["required", "input, select, textarea", "불 속성", "비어 있으면 보내지 않는다 (13장)"],
              ["placeholder", "input(글자, 숫자 칸), textarea", "글자", "빈 칸에 흐리게 보이는 예시"],
              ["autocomplete", "form, input, select, textarea", "on, off, 토큰", "자동 채우기에 무엇을 넣을지"],
              ["autofocus", "모든 요소 (전역)", "불 속성", "열리자마자 포커스"],
              ["min, max", "input(숫자, 날짜, range)", "숫자, 날짜", "허락하는 범위"],
              ["step", "input(숫자, 날짜, range)", "양수, any", "값의 간격"],
              ["minlength, maxlength", "글자 칸, textarea", "0 이상의 정수", "글자 수의 범위"],
              ["pattern", "글자 칸", "정규식", "값 전체가 맞아야 한다"],
              ["size", "글자 칸, select", "양의 정수", "보이는 글자 수, 줄 수"],
              ["multiple", "input(email, file), select", "불 속성", "값을 여럿 받는다"],
              ["accept", "input type=file", "확장자, MIME 형식", "고를 파일 종류의 힌트"],
              ["capture", "input type=file", "user, environment", "카메라나 마이크로 바로 찍기"],
              ["checked", "input(checkbox, radio)", "불 속성", "처음에 체크"],
              ["selected", "option", "불 속성", "처음에 고름"],
              ["list", "input", "datalist의 id", "추천 목록을 잇는다"],
              ["form", "input, select, textarea, button, fieldset, output, object", "form의 id", "속할 폼을 정한다"],
              ["formaction", "button, input(submit, image)", "주소", "이 버튼으로 보낼 때의 action"],
              ["formmethod", "button, input(submit, image)", "get, post, dialog", "이 버튼으로 보낼 때의 method"],
              ["formenctype", "button, input(submit, image)", "enctype의 세 값", "이 버튼으로 보낼 때의 enctype"],
              ["formnovalidate", "button, input(submit, image)", "불 속성", "이 버튼은 검증을 건너뛴다"],
              ["formtarget", "button, input(submit, image)", "_self, _blank, 창 이름 등", "이 버튼으로 보낸 결과를 열 창"],
              ["dirname", "input(text, search 등), textarea", "보낼 이름", "글 방향(ltr, rtl)도 함께 보낸다"],
              ["enctype", "form", "urlencoded, multipart/form-data, text/plain", "POST 본문의 모양"],
              ["type", "button", "submit, reset, button", "누르면 무엇을 할지"],
            ],
          },
        ],
      },
      {
        label: "name, value",
        body: "name은 보낼 값의 이름입니다. 폼을 보내면 name=value 짝이 모입니다. name이 없거나 비어 있으면 그 칸은 보내지 않습니다. MDN은 name을 '필수는 아니지만 필수라고 여기라'고 적습니다. 같은 name의 radio는 한 묶음이 되어 하나만 고를 수 있습니다. name은 form.elements.email처럼 칸을 찾는 이름도 됩니다. 그래서 submit, action처럼 form의 메서드나 속성과 같은 name은 피합니다. 그 칸이 원래 기능을 가립니다.\n\nvalue는 칸마다 뜻이 조금 다릅니다. 글자 칸에서는 처음 값입니다. 사용자가 고치면 .value 프로퍼티만 바뀌고 속성은 그대로입니다. checkbox와 radio에서는 체크됐을 때 보낼 값이고, 적지 않으면 on을 보냅니다. button에서는 그 버튼으로 보낼 때 name과 함께 가는 값입니다. option에서는 고르면 보낼 값이고, 적지 않으면 option의 글자를 보냅니다.",
      },
      {
        label: "disabled, readonly",
        body: "둘 다 사용자가 값을 못 바꾸게 하지만 결과가 다릅니다. disabled는 칸을 끕니다. 누를 수도, 포커스할 수도 없고, 폼을 보낼 때 값이 빠집니다. 흐리게 그려지고 :disabled에 걸립니다. fieldset에 disabled를 적으면 안의 칸이 모두 꺼집니다. 첫 legend 안의 칸만 예외입니다.\n\nreadonly는 고치지만 못하게 합니다. 포커스, 글자 고르기, 복사는 되고, 값은 보냅니다. 글자, 날짜, 숫자 칸과 textarea에만 뜻이 있고, checkbox, radio, select에는 없습니다. 두 칸 다 제약 검증에서 빠집니다. 그래서 readonly에 required를 함께 적어도 검사하지 않습니다. 보여 주되 못 고치게 하고 서버에는 보낼 값이면 readonly, 지금은 쓸 수 없는 칸이면 disabled입니다.",
        terms: [
          {
            term: "검증에서 빠짐 (barred from constraint validation)",
            body: "칸이 검증 대상에서 아예 빠지는 것입니다. required, pattern 같은 규칙이 있어도 검사하지 않고, willValidate가 false입니다. 시험장에 들어오지 않은 사람은 채점도 하지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: disabled와 readonly",
        body: "작은 창을 한 번 누르고 Tab을 여러 번 눌러 보세요. 기록의 focus 줄을 보면 readonly 칸에는 포커스가 가고, disabled 칸은 건너뜁니다. 지금 값의 FormData에는 plain과 ro만 있고 off는 없습니다. willValidate는 보통 칸만 true이고, 나머지 둘은 false입니다. 둘 다 검증에서 빠진다는 뜻입니다. 보내기를 누르면 도착한 target.html의 받은 값에도 plain과 ro만 나옵니다.",
        lab: {
          html: `<form action="target.html">
  <p><label>보통 <input name="plain" value="A"></label></p>
  <p><label>readonly <input name="ro" value="B" readonly></label></p>
  <p><label>disabled <input name="off" value="C" disabled></label></p>
  <button>보내기</button>
</form>`,
          height: 210,
          logFocus: true,
          checks: [
            {
              label: "지금 보내면 (FormData)",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + v) : '(폼 없음)'",
            },
            { label: "willValidate", expr: "[...document.querySelectorAll('input')].map((i) => i.name + '=' + i.willValidate)" },
          ],
          tryIt: "readonly 칸의 value를 지우고 required를 더해 보세요. 비어 있어도 검증에서 빠져 그대로 보내집니다.",
        },
      },
      {
        label: "required, placeholder",
        body: "required는 비어 있으면 폼을 보내지 않게 합니다. checkbox는 체크해야, radio는 같은 name 중 하나를 골라야 통과합니다. select는 맨 앞의 빈 안내 option('-- 고르세요 --') 말고 다른 것을 골라야 통과합니다. 검증의 흐름과 메시지는 13장에서 봅니다.\n\nplaceholder는 빈 칸에 흐리게 보이는 짧은 예시입니다. 글자를 치면 사라집니다. 그래서 칸의 이름이나 설명을 대신하지 못합니다. 이름은 label로 적고, placeholder에는 '예: 홍길동'처럼 값의 모양만 보여 줍니다. 글자 칸과 number, textarea에 씁니다. input의 placeholder에는 줄바꿈을 넣지 않습니다.",
      },
      {
        label: "autocomplete",
        body: "autocomplete는 불 속성이 아닙니다. 이 칸에 무엇을 채우면 되는지 브라우저에 알리는 낱말입니다. on과 off 말고도 name, email, street-address처럼 값의 뜻을 적는 토큰이 있습니다. 토큰을 적으면 브라우저가 저장해 둔 주소나 카드 정보를 맞는 칸에 채웁니다. form에 적으면 그 안 칸들의 기본값이 되고, 칸에 적은 값이 이깁니다.\n\noff는 기억한 값을 제안하지 말라는 요청일 뿐입니다. MDN은 브라우저가 로그인 폼에서 off를 무시하는 편이라고 적습니다. 비밀번호 칸이면 off 대신 current-password(로그인)나 new-password(가입, 바꾸기)를 적습니다. new-password를 보면 브라우저가 지금 비밀번호를 잘못 채우지 않고, 안전한 새 비밀번호를 제안하기도 합니다. 문자로 받은 인증 번호 칸에는 one-time-code를 적습니다.",
        tables: [
          {
            caption: "자주 쓰는 토큰",
            head: ["토큰", "채우는 값"],
            rows: [
              ["off", "제안하지 말라는 요청"],
              ["on", "브라우저가 알아서"],
              ["name", "이름 전체 (given-name, family-name으로 나눌 수도)"],
              ["email", "이메일 주소"],
              ["username", "아이디"],
              ["current-password", "지금 비밀번호 (로그인)"],
              ["new-password", "새 비밀번호 (가입, 바꾸기)"],
              ["one-time-code", "문자나 앱으로 받은 일회용 코드"],
              ["tel", "전화번호"],
              ["street-address", "도로명 주소 전체"],
              ["postal-code", "우편번호"],
              ["cc-number", "카드 번호"],
            ],
          },
        ],
        terms: [
          {
            term: "자동 채우기 (autofill)",
            body: "브라우저가 저장해 둔 이름, 주소, 카드, 비밀번호를 칸에 대신 넣어 주는 기능입니다. autocomplete 토큰을 보고 어느 칸에 무엇을 넣을지 정합니다. 단골 가게 직원이 주소를 기억해 배송지를 미리 채워 주는 것과 같습니다.",
          },
        ],
      },
      {
        label: "autofocus",
        body: "autofocus는 전역 속성이라 어느 요소에나 붙지만, 대개 폼 칸에 씁니다. 페이지가 열릴 때, 또는 그 칸이 든 dialog가 열릴 때 포커스를 줍니다. 문서마다 하나만 두고, type=\"hidden\"에는 쓸 수 없습니다. 접근성 주의는 전역 속성 목록 시트에 있습니다.",
      },
      {
        label: "min, max, step",
        body: "min과 max는 숫자, 날짜, 시간 칸과 range의 범위입니다. 값이 그 형식으로 읽히지 않으면 그쪽 끝은 없는 것으로 칩니다. 시간처럼 도는 값은 max가 min보다 작아도 됩니다. 밤 10시부터 새벽 4시처럼 자정을 넘는 범위입니다.\n\nstep은 값의 간격입니다. number와 range는 기본이 1입니다. 그래서 step을 적지 않은 number 칸에 4.2를 적으면 stepMismatch로 걸립니다. 소수를 받으려면 step=\"0.1\"이나 step=\"any\"를 적습니다. 간격은 min에서 셉니다. min이 없으면 value에서, 둘 다 없으면 0에서 셉니다. meter의 min, max와 progress의 max는 막대를 그리기 위한 범위이고, 검증과는 상관없습니다.",
      },
      {
        label: "minlength, maxlength, pattern",
        body: "minlength와 maxlength는 글자 수의 범위입니다. 브라우저는 maxlength보다 길게 치지 못하게 막습니다. 글자 수는 UTF-16 코드 단위로 셉니다. 한글 한 글자는 1이지만, 이모지는 하나에 2 이상인 것이 많습니다. 그리고 사용자가 고친 값만 검사합니다. value 속성으로 넣은 긴 값은 tooLong에 걸리지 않습니다.\n\npattern은 값 전체가 맞아야 하는 정규식입니다. 브라우저가 ^(?:와 )$로 감싸고 v 플래그로 읽으므로, 앞뒤에 ^ $나 /를 적지 않습니다. 값이 비어 있으면 pattern은 검사하지 않습니다. 비어도 안 되면 required를 함께 적습니다. multiple이 있는 email 칸이면 쉼표로 나눈 값마다 검사합니다. 원하는 모양은 칸 옆에 글로 적어 둡니다. title은 풍선 도움말로만 보여서 그것만으로는 모자랍니다.",
        terms: [
          {
            term: "UTF-16 코드 단위",
            body: "자바스크립트 문자열이 글자를 세는 단위입니다. 한글과 대부분의 글자는 한 단위이지만, 이모지 같은 글자는 두 단위 이상을 씁니다. 그래서 '😀'.length는 2입니다. 같은 짐 한 개라도 큰 짐은 선반 두 칸을 차지하는 것과 같습니다.",
          },
        ],
      },
      {
        label: "size, multiple",
        body: "size는 input에서 보이는 너비이고, select에서는 보이는 줄 수입니다. 글자 칸에서는 대략의 글자 수이고 기본은 20입니다. CSS의 width가 있으면 그것이 이깁니다. select의 size가 1보다 크거나 multiple이 있으면 펼친 목록 상자로 그립니다. multiple이 있으면 size의 기본값은 4입니다.\n\nmultiple은 값을 여럿 받게 합니다. email 칸은 쉼표로 나눈 주소 여럿을, file 칸은 파일 여럿을, select는 option 여럿을 받습니다. select에서 여럿을 고를 때는 Ctrl(맥은 ⌘)을 누른 채 누릅니다. 보낼 때는 같은 name의 짝이 여럿 생깁니다(size=S&size=M).",
      },
      {
        label: "accept, capture",
        body: "accept는 file 칸에서 고를 파일 종류의 힌트입니다. 쉼표로 나눠 확장자, MIME 형식, image/* 같은 갈래 전체를 적습니다. 파일 고르기 창이 그 종류를 먼저 보여 주지만, 사용자는 대개 다른 파일도 고를 수 있습니다. 그래서 서버에서 다시 검사합니다.\n\ncapture는 모바일 기기에서 파일 대신 카메라나 마이크로 바로 찍게 합니다. accept가 image/*, video/*, audio/*일 때 뜻이 있습니다. 적지 않으면 브라우저가 정하고, 요청한 쪽 카메라가 없으면 다른 쪽을 쓰기도 합니다.",
        tables: [
          {
            head: ["속성", "값", "뜻"],
            rows: [
              ["accept", ".pdf", "확장자가 .pdf인 파일"],
              ["accept", "image/png", "PNG 이미지"],
              ["accept", "image/*", "모든 이미지 (video/*, audio/*도 같은 꼴)"],
              ["accept", ".doc,.docx", "여럿은 쉼표로"],
              ["capture", "user", "사용자 쪽 카메라, 마이크 (셀카)"],
              ["capture", "environment", "바깥쪽 카메라, 마이크"],
            ],
          },
        ],
      },
      {
        label: "checked, selected",
        body: "checked는 checkbox와 radio가 처음에 체크돼 있게 합니다. selected는 option이 처음에 골라져 있게 합니다. 둘 다 처음 상태입니다. 사용자가 누르면 .checked, .selected 프로퍼티만 바뀌고 속성은 그대로입니다. reset을 누르면 속성의 상태로 돌아갑니다. 같은 name의 radio에는 checked를 하나만 적습니다. multiple이 없는 select에도 selected는 하나만 적습니다. 접힌 드롭다운 select는 selected가 없으면 disabled가 아닌 첫 option이 골라집니다.\n\n체크하지 않은 checkbox와 radio는 아예 보내지 않습니다. 서버는 값이 없으면 꺼짐으로 읽어야 합니다. 체크한 checkbox는 value를 보내고, value가 없으면 on을 보냅니다.",
      },
      {
        label: "직접 해 보기: 같은 name의 여러 값",
        body: "지금 값의 FormData를 먼저 보세요. 체크된 tag=html만 있고 css는 없습니다. select는 selected인 S와 M이 같은 name으로 두 번 들어 있습니다. option에 value가 없어 글자가 값이 됩니다. '동의'를 체크하면 agree=on이 생깁니다. value를 적지 않은 checkbox의 값은 on입니다. L을 Ctrl(맥은 ⌘)을 누른 채 누르면 size=large가 더해집니다. 보내기를 누르면 도착한 주소에 size=S&size=M처럼 같은 이름이 되풀이됩니다.",
        lab: {
          html: `<form action="target.html">
  <label><input type="checkbox" name="tag" value="html" checked> HTML</label>
  <label><input type="checkbox" name="tag" value="css"> CSS</label>
  <label><input type="checkbox" name="agree"> 동의 (value 없음)</label>
  <p><select name="size" multiple size="3">
    <option selected>S</option><option selected>M</option><option value="large">L</option>
  </select></p>
  <button>보내기</button>
</form>`,
          height: 200,
          checks: [
            {
              label: "지금 보내면 (FormData)",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + v) : '(폼 없음)'",
            },
          ],
        },
      },
      {
        label: "list",
        body: "list는 input과 datalist를 잇습니다. 값에 datalist의 id를 적으면 그 안의 option들이 추천 목록으로 뜹니다. select와 달리 목록에 없는 값도 칠 수 있습니다. 추천일 뿐 제한이 아닙니다. 칸의 type과 맞지 않는 option은 빠집니다. 브라우저에 따라 range에서는 눈금으로, color에서는 색 견본으로 보이기도 합니다. hidden, password, checkbox, radio, file, 버튼에는 쓸 수 없습니다.",
        code: `<label>도시 <input name="city" list="cities"></label>
<datalist id="cities">
  <option value="서울"></option>
  <option value="부산"></option>
</datalist>`,
        codeLang: "html",
      },
      {
        label: "form",
        body: "form 속성은 칸이 어느 폼에 속할지를 폼의 id로 정합니다. 적지 않으면 자기를 감싼 가장 가까운 form에 속합니다. 이 속성을 쓰면 칸을 폼 밖 어디에 두어도 그 폼과 함께 보냅니다. 감싼 폼 대신 다른 폼에 속하게 할 수도 있습니다. form은 서로 겹칠 수 없으므로, 표의 행마다 폼을 두거나 버튼이 화면 구조상 폼 밖에 있을 때 씁니다.\n\n칸은 폼 하나에만 속합니다. .form 프로퍼티는 읽기만 되므로, 바꾸려면 setAttribute('form', id)를 씁니다. button, fieldset, input, object, output, select, textarea에 붙습니다.",
        terms: [
          {
            term: "폼 주인 (form owner)",
            body: "칸이 속한 form 요소입니다. 폼을 보낼 때는 그 폼을 주인으로 둔 칸만 모입니다. 보통은 감싼 form이고, form 속성으로 바꿀 수 있습니다. 학생의 소속 반과 같아서, 어느 자리에 앉든 출석부의 반으로 셉니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 폼 밖의 칸을 form으로 묶기",
        body: "폼 안에는 상품 칸 하나뿐입니다. 그런데 지금 값의 order 폼 칸 목록에는 qty와 버튼도 있습니다. form=\"order\"가 둘을 이 폼에 묶었기 때문입니다. memo는 어느 폼에도 속하지 않아 .form이 null입니다. 폼 밖의 '주문' 버튼을 눌러 보세요. 예상 줄이 order 폼을 보낸다고 적고, 보낼 값에는 item과 qty만 있고 memo는 없습니다.",
        lab: {
          html: `<form id="order" action="target.html">
  <label>상품 <input name="item" value="책"></label>
</form>
<p><label>수량 <input name="qty" value="2" form="order"></label> (폼 밖, form="order")</p>
<p><label>메모 <input name="memo" value="안 감"></label> (폼 밖, form 없음)</p>
<button form="order">주문 (폼 밖의 버튼)</button>`,
          height: 190,
          checks: [
            {
              label: "order 폼의 칸",
              expr: "document.forms.order ? [...document.forms.order.elements].map((e) => e.name || e.localName) : '(폼 없음)'",
            },
            {
              label: "칸마다 .form",
              expr: "[...document.querySelectorAll('input')].map((i) => i.name + ' → ' + (i.form ? i.form.id : 'null'))",
            },
          ],
        },
      },
      {
        label: "button의 type",
        body: "button의 type은 누르면 무엇을 할지입니다. 폼에 속한 button에 type을 적지 않으면 submit입니다. 빈 값이나 모르는 값을 적어도 submit입니다. 이것이 '저장 버튼을 눌렀더니 페이지가 새로 고쳐졌다'의 원인입니다(12장). 스크립트만 돌릴 버튼에는 꼭 type=\"button\"을 적습니다. MDN은 reset이 사용자를 짜증 나게 하기 쉽다고 적습니다. 누르는 순간 적은 내용이 한꺼번에 처음으로 돌아가기 때문입니다.",
        tables: [
          {
            head: ["값", "누르면"],
            rows: [
              ["submit (기본)", "폼을 보낸다"],
              ["reset", "칸을 처음 값으로 되돌린다"],
              ["button", "아무것도 하지 않는다. 페이지 코드만 돈다"],
            ],
          },
        ],
      },
      {
        label: "formaction, formmethod 등 다섯",
        body: "보내기 버튼(button, input type=submit, image)에 붙어, 그 버튼으로 보낼 때만 폼의 속성을 바꿉니다. 한 폼에 '저장', '미리 보기', '임시 저장' 버튼을 두고 보낼 곳이나 검증을 달리할 때 씁니다. 폼 주인이 없는 버튼에서는 아무 일도 하지 않습니다.\n\n누른 버튼에 name이 있으면 그 name=value도 함께 보냅니다. 서버는 이 값으로 어느 버튼을 눌렀는지 압니다. 누르지 않은 버튼의 값은 가지 않습니다. 그리고 GET으로 보낼 때는 action 주소의 ? 뒤를 폼의 값으로 바꿔 씁니다. 그래서 formaction=\"target.html?mode=preview\"의 mode는 사라집니다. 이런 값은 type=\"hidden\" 칸에 담습니다.",
        tables: [
          {
            head: ["속성", "대신하는 폼 속성", "값"],
            rows: [
              ["formaction", "action", "주소"],
              ["formmethod", "method", "get, post, dialog"],
              ["formenctype", "enctype", "아래 enctype 표의 세 값"],
              ["formnovalidate", "novalidate", "불 속성"],
              ["formtarget", "target", "_self, _blank, _parent, _top, 창 이름"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: 누른 버튼의 값과 formaction",
        body: "지금 값의 FormData에는 title만 있습니다. 버튼의 값은 그 버튼을 눌렀을 때만 들어가기 때문입니다. '저장'을 누르면 기록의 보낼 값에 act=\"save\"가 더해집니다. '이 코드로 실행'을 다시 누르고 '미리 보기'를 눌러 보세요. act=\"preview\"가 가고, 갈 주소가 formaction의 주소로 바뀝니다. 그런데 예상 줄의 주소에는 mode=preview가 없습니다. GET은 action의 ? 뒤를 폼 값으로 바꿔 쓰기 때문입니다. 도착한 target.html의 받은 값에도 mode는 없습니다.",
        lab: {
          html: `<form action="target.html">
  <input name="title" value="초안">
  <button name="act" value="save">저장</button>
  <button name="act" value="preview" formaction="target.html?mode=preview">미리 보기</button>
</form>`,
          height: 150,
          checks: [
            {
              label: "버튼 없이 만든 FormData",
              expr: "document.forms[0] ? [...new FormData(document.forms[0])].map(([k, v]) => k + '=' + v) : '(폼 없음)'",
            },
          ],
          tryIt: 'form에 <input type="hidden" name="mode" value="preview">를 더해 보세요. 이번에는 mode가 도착합니다.',
        },
      },
      {
        label: "enctype",
        body: "enctype은 method=\"post\"로 보낼 때 요청 본문의 모양입니다. GET은 늘 주소에 붙이므로 enctype을 보지 않습니다. 파일을 보내는 폼은 반드시 post와 multipart/form-data를 함께 적습니다. 기본값으로 보내면 파일 내용 대신 파일 이름만 갑니다.",
        tables: [
          {
            head: ["값", "본문 모양", "쓰는 때"],
            rows: [
              ["application/x-www-form-urlencoded (기본)", "name=value&… 를 퍼센트 인코딩", "보통의 폼"],
              ["multipart/form-data", "칸마다 나눈 덩어리", "파일 올리기"],
              ["text/plain", "name=value를 줄마다", "디버깅용. 실제로는 쓰지 않는다"],
            ],
          },
        ],
        terms: [
          {
            term: "multipart/form-data",
            body: "요청 본문을 경계 글자로 칸마다 나눠 담는 모양입니다. 칸마다 이름과 내용의 형식을 따로 적을 수 있어 파일을 그대로 실을 수 있습니다. 칸막이 도시락처럼 반찬마다 따로 담습니다.",
          },
        ],
      },
      {
        label: "dirname",
        body: "dirname은 사용자가 친 글의 방향을 함께 보냅니다. dirname=\"comment.dir\"이면 폼을 보낼 때 comment=값과 함께 comment.dir=ltr(또는 rtl)이 갑니다. 아랍어나 히브리어 사용자가 쓴 글을 서버가 다시 보여 줄 때 같은 방향으로 그리려고 씁니다. 칸에 dir=\"auto\"를 함께 적어야 친 글자를 보고 방향을 정합니다. input(text, search, url, tel, email, hidden)과 textarea에 붙습니다. 방향 자체는 15장의 dir을 보세요.",
      },
      {
        label: "문제가 나는 경우",
        body: "폼 속성의 문제는 대개 '보내지 않는 경우'를 몰라서 생깁니다. 아래 표의 절반이 '값이 서버에 안 왔다'입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["고치지 못하게 하려고 disabled를 걸었다", "그 칸의 값이 서버에 오지 않는다", "readonly를 쓴다"],
              ["체크 상자를 체크하지 않고 보냈다", "그 name이 아예 오지 않는다", "서버에서 없음을 꺼짐으로 읽는다"],
              ['GET 폼에 formaction="a.html?mode=1"', "mode=1이 사라진다", 'type="hidden" 칸으로 보낸다'],
              ["enctype 없이 파일을 보냈다", "파일 대신 파일 이름만 온다", 'method="post"와 enctype="multipart/form-data"'],
              ['비밀번호 칸에 autocomplete="off"', "브라우저가 무시하고 채운다", "current-password나 new-password를 적는다"],
              ['maxlength="10"에 이모지를 쳤다', "열 개보다 적게 들어간다", "UTF-16 단위로 센다는 것을 알고 서버에서 다시 센다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) disabled 칸과 readonly 칸 중 값이 서버에 가는 것은?\n2) value를 적지 않은 checkbox를 체크해 보내면 무엇이 가나요?\n3) 폼 밖에 둔 칸을 그 폼과 함께 보내려면?\n4) GET 폼에서 formaction=\"a.html?x=1\"의 x=1은 왜 사라지나요?",
      },
    ],
    sources: [
      { label: "MDN — <input>", href: `${REF}/Elements/input` },
      { label: "MDN — <button>", href: `${REF}/Elements/button` },
      { label: "MDN — <form>", href: `${REF}/Elements/form` },
      { label: "MDN — autocomplete", href: `${REF}/Attributes/autocomplete` },
      { label: "MDN — readonly", href: `${REF}/Attributes/readonly` },
      { label: "MDN — form", href: `${REF}/Attributes/form` },
    ],
  },
  {
    id: "html-attr-img-table",
    name: "이미지와 표 속성",
    tagline: "그림은 고르고 받고, 표의 칸은 제목을 찾는다",
    intro:
      "<img>의 속성은 일을 나눠 맡습니다. 어느 파일을 받을지(srcset, sizes), 언제 어떻게 받을지(loading, fetchpriority, crossorigin), 못 볼 때 무엇이 대신할지(alt)입니다. 표의 칸 속성은 값 칸과 제목 칸을 잇습니다(scope, headers). 이 시트는 그 속성들의 값과 기본값, 흔한 실수를 모읍니다. 개념과 기본 실험은 8장(이미지)과 11장(표)에 있습니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "이 시트에 나오는 속성입니다. 위는 <img>에, 아래는 표의 칸과 열에 붙습니다. 값이 정해진 속성은 틀린 값을 적어도 에러가 나지 않습니다. 대개 기본값으로 읽힙니다.",
        tables: [
          {
            head: ["속성", "붙는 곳", "값", "하는 일"],
            rows: [
              ["alt", "<img>, <area>, <input type=\"image\">", "글자. 꾸밈 그림은 \"\"", "그림 대신 읽고 보여 줄 글자"],
              ["src", "<img>", "URL", "기본 파일. x 후보에서는 1x 자리"],
              ["srcset", "<img>, <picture>의 <source>", "URL과 기술자(400w, 2x)의 목록", "고를 후보 파일들"],
              ["sizes", "<img>, <picture>의 <source>", "(미디어 조건) 길이의 목록, auto", "그림이 차지할 폭. w 후보를 고를 때 쓴다"],
              ["width, height", "<img>, <picture>의 <source>, <video> 등", "단위 없는 정수", "본래 크기. 받기 전에 자리를 잡는다"],
              ["loading", "<img>, <iframe>", "eager(기본), lazy", "언제 받을지"],
              ["decoding", "<img>", "auto(기본), sync, async", "그림 풀기를 다른 내용과 함께 그릴지"],
              ["fetchpriority", "<img>, <link>, <script>", "auto(기본), high, low", "받는 순서의 힌트"],
              ["crossorigin", "<img>, <script>, <link>, <video>, <audio>", "(없음), anonymous, use-credentials", "CORS 요청으로 받을지"],
              ["referrerpolicy", "<img>, <a>, <area>, <iframe>, <script>, <link>", "no-referrer 등 여덟 가지", "요청에 보낼 Referer의 범위"],
              ["usemap", "<img>", "#지도이름", "<map>의 누를 수 있는 영역을 잇는다"],
              ["ismap", "<a href> 안의 <img>", "불 속성", "누른 좌표를 서버로 보낸다"],
              ["elementtiming", "<img>, 글 덩어리 등", "내가 붙이는 이름", "그려진 때를 성능 API로 잰다"],
              ["scope", "<th>", "row, col, rowgroup, colgroup", "제목이 붙는 칸의 방향"],
              ["abbr", "<th>", "짧은 글자", "제목 칸의 줄인 이름"],
              ["headers", "<td>, <th>", "th의 id 목록", "이 칸의 제목 칸을 직접 고른다"],
              ["colspan", "<td>, <th>", "1 이상의 정수 (기본 1)", "몇 열을 차지할지"],
              ["rowspan", "<td>, <th>", "0 이상의 정수 (기본 1)", "몇 행을 차지할지"],
              ["span", "<col>, <colgroup>", "1 이상의 정수 (기본 1)", "몇 열을 묶을지"],
            ],
          },
        ],
      },
      {
        label: "alt: 그림마다 적는 법",
        body: "alt는 그림을 볼 수 없을 때 그 자리에 들어가는 글자입니다. 낭독기가 읽고, 그림을 못 받으면 화면에 보입니다. 그림을 복사해 글로 붙일 때도 쓰입니다. 그러니 alt는 그림의 묘사가 아니라 그림 대신 들어갈 말입니다.\n\n좋은 alt인지는 앞 문장과 이어 읽어 보면 압니다. '여행 중에 귀여운 동물을 봤다: 그림'은 말이 되지 않습니다. '여행 중에 귀여운 동물을 봤다: 해변에 선 펭귄'은 말이 됩니다. '그림', '사진' 같은 말과 파일 이름은 적지 않습니다. alt를 아예 빼면 낭독기가 파일 이름을 읽기도 합니다. 그래서 꾸밈 그림도 alt를 빼지 않고 alt=\"\"로 비웁니다.\n\n그래프처럼 내용이 많은 그림은 alt 한 줄에 다 담지 못합니다. alt에는 요약을 적고, 자세한 값은 그림 옆의 글이나 표로 보입니다. figcaption이나 aria-describedby로 그 글을 그림과 이을 수 있습니다. 옛 속성 longdesc는 쓰지 않습니다. title은 alt를 대신하지 못합니다. 같은 글을 alt와 title에 함께 적으면 두 번 읽힐 수 있습니다. MDN에 따르면 VoiceOver는 SVG 파일을 쓰는 img를 그림으로 알리지 못하는 버그가 있습니다. 그래서 role=\"img\"를 함께 적으라고 합니다. 그림을 못 받았을 때의 모습은 8장 실험에서 봅니다.",
        tables: [
          {
            caption: "상황별 alt",
            head: ["그림", "alt에 적을 것", "예"],
            rows: [
              ["뜻 있는 그림", "그림이 전하는 내용을 짧게", "alt=\"해변에 선 펭귄\""],
              ["링크나 버튼 안의 그림 (그림만)", "모양이 아니라 누르면 일어나는 일", "alt=\"다음 쪽\"\n(\"오른쪽 화살표\"가 아니라)"],
              ["글자와 함께 링크 안에 든 그림", "비운다. 링크의 글자가 이미 이름이다", "<a><img alt=\"\"> 장바구니</a>"],
              ["글을 그림으로 그린 것", "그림 속 글자를 그대로", "alt=\"가을 할인 30%\""],
              ["꾸밈 그림", "비운다. 속성은 남긴다", "alt=\"\""],
              ["그래프와 차트", "한 줄 요약. 수치는 본문이나 표로", "alt=\"월별 방문자, 9월이 가장 많음\""],
              ["로고", "회사나 서비스의 이름. 홈 링크면 갈 곳", "alt=\"MDN\", alt=\"MDN 홈\""],
            ],
          },
        ],
      },
      {
        label: "srcset, sizes, src",
        body: "srcset은 같은 그림의 여러 파일을 후보로 적습니다. 후보는 쉼표로 나누고, 각 후보는 'URL 기술자' 모양입니다. 기술자는 둘 중 하나입니다.\n(1) x 기술자(1x, 2x): 기기 픽셀 비율에 맞춰 고릅니다. srcset에 1x가 없으면 src가 1x 후보가 됩니다.\n(2) w 기술자(400w): 그 파일의 실제 폭입니다. 이때는 sizes를 함께 적고, src는 후보에 들지 않습니다. srcset을 모르는 옛 브라우저를 위한 대비로만 남습니다.\n한 srcset에 w와 x를 섞으면 틀립니다. 같은 기술자를 두 번 써도 틀립니다. 기술자가 없는 후보는 1x로 봅니다.\n\nsizes는 '이 그림이 화면에서 차지할 폭'의 목록입니다. 각 항목은 '(미디어 조건) 길이'이고, 마지막 항목만 조건 없이 적습니다. 브라우저는 앞에서부터 처음 맞는 조건의 길이를 씁니다. 조건은 그림이 아니라 뷰포트(창)를 봅니다. 길이에 %는 쓸 수 없습니다. em 같은 상대 단위는 미디어 쿼리처럼 읽혀, 그림이 아니라 문서 전체를 기준으로 합니다. sizes가 없으면 100vw입니다. CSS로 크기를 따로 주지 않으면 그림도 이 폭으로 그려집니다.\n\nsizes=\"auto\"는 레이아웃이 정한 실제 폭을 쓰라는 뜻입니다. loading=\"lazy\"와 함께일 때만 쓸 수 있습니다. 브라우저는 필요한 점 수(sizes의 폭 × 기기 픽셀 비율)를 보고 후보를 고르지만, 표준은 마지막 선택을 브라우저에 맡깁니다. 고른 결과는 img.currentSrc로 읽습니다. 기술자 두 가지를 견주는 실험은 8장에 있습니다.",
        tables: [
          {
            caption: "srcset과 sizes에 적는 모양",
            head: ["모양", "예", "뜻"],
            rows: [
              ["x 기술자", "dot-2x.svg 2x", "기기 픽셀 비율이 2일 때 쓸 파일"],
              ["w 기술자", "photo-800.svg 800w", "이 파일의 실제 폭이 800px"],
              ["기술자 없음", "photo.svg", "1x로 본다"],
              ["sizes의 항목", "(max-width: 600px) 100vw", "창이 600px 이하면 창 폭만큼 차지"],
              ["sizes의 마지막", "300px", "앞의 조건이 다 틀리면 이 폭"],
              ["sizes=\"auto\"", "auto, 300px", "레이아웃의 실제 폭. lazy일 때만"],
            ],
          },
        ],
        code: '<!-- 밀도 후보: srcset에 1x가 없으니 src가 1x 자리 -->\n<img src="logo.png" srcset="logo-2x.png 2x" alt="MDN" width="120" height="40">\n\n<!-- 폭 후보: sizes로 차지할 폭을 알린다 -->\n<img src="photo-800.jpg" alt="해변에 선 펭귄"\n     srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"\n     sizes="(max-width: 600px) 100vw, 50vw">',
        codeLang: "html",
        terms: [
          {
            term: "후보 기술자 (descriptor)",
            body: "srcset에서 URL 뒤에 붙는 400w, 2x 같은 꼬리표입니다. 브라우저는 파일을 받아 보기 전에 이 꼬리표만 보고 후보를 고릅니다. 옷 가게의 사이즈 태그와 같아서, 입어 보지 않고 태그로 고릅니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: sizes를 바꾸면 폭과 파일이 바뀐다",
        body: "img에 width를 적지 않았습니다. 그러면 sizes가 두 가지를 정합니다. 어느 후보를 고를지, 그리고 그림을 몇 px 폭으로 그릴지입니다. 지금 값의 img.width가 sizes에 적은 150과 같은지 보세요. 후보의 w가 파일의 실제 폭과 맞을 때 이렇게 됩니다.\n\n이제 sizes를 \"600px\"로 바꿔 실행해 보세요. img.width가 따라 커지고, 필요한 점 수가 늘어 currentSrc가 더 큰 파일로 바뀔 것입니다. 기록의 load 줄에도 고른 파일이 찍힙니다. 어느 파일이 골라질지는 기기 픽셀 비율에 따라 다릅니다. 표준이 마지막 선택을 브라우저에 맡기므로, 결과가 이 설명과 다를 수도 있습니다.",
        lab: {
          html: `<img alt="연습용 사진" src="photo-400.svg"
     srcset="photo-400.svg 400w, photo-800.svg 800w, photo-1600.svg 1600w"
     sizes="150px">`,
          height: 220,
          checks: [
            { label: "img.sizes", expr: "document.images[0].sizes" },
            { label: "img.width (그린 폭)", expr: "document.images[0].width" },
            { label: "currentSrc", expr: "document.images[0].currentSrc.split('/').pop()" },
            { label: "devicePixelRatio", expr: "devicePixelRatio" },
          ],
          tryIt: "sizes를 \"600px\"로, 그다음 \"(max-width: 5000px) 50px, 600px\"로 바꿔 보세요. 작은 창은 5000px보다 좁아서 첫 조건의 50px이 쓰입니다.",
        },
      },
      {
        label: "width와 height",
        body: "그림의 본래 크기를 단위 없는 정수로 적습니다. 단위는 px로 읽습니다. 브라우저는 둘의 비율로 그림을 받기 전부터 자리를 잡습니다. 그래서 그림이 도착해도 아래 글이 밀리지 않습니다. CSS로 크기를 주지 않으면 이 크기로 그려집니다.\n\n화면에서 그릴 크기는 CSS로 바꿉니다. width: 100%와 height: auto를 함께 주면, 폭은 칸에 맞고 높이는 비율을 따릅니다. 받기 전에도 속성의 비율로 자리가 잡힙니다. 100%나 200px처럼 단위를 붙여 적지 않습니다. 파일의 실제 비율과 다르게 적으면 그림이 찌그러집니다. <picture>의 <source>에도 적을 수 있어서, 후보마다 비율이 다를 때 씁니다. 자리 잡기 실험은 8장에 있습니다.",
      },
      {
        label: "loading",
        body: "그림을 언제 받을지 정합니다. 기본인 eager는 화면 밖의 그림도 바로 받습니다. lazy는 그림이 뷰포트 가까이 올 때까지 받기를 미룹니다. 얼마나 가까워야 하는지는 브라우저가 정합니다.\n\n주의할 점이 셋 있습니다.\n(1) 첫 화면에 보이는 큰 그림에는 lazy를 붙이지 않습니다. 늦게 뜹니다.\n(2) lazy 그림일수록 width, height가 중요합니다. 크기가 0이면 화면과 겹치지 않아 끝내 받지 않을 수 있습니다.\n(3) 자바스크립트가 꺼져 있으면 미루지 않습니다. 서버가 스크롤 위치를 엿보지 못하게 하려는 규칙입니다.\n창의 load 이벤트는 lazy 그림을 기다리지 않습니다. 실험은 8장에 있습니다.",
        tables: [
          {
            head: ["값", "하는 일"],
            rows: [
              ["eager (기본)", "화면 안팎을 가리지 않고 바로 받는다"],
              ["lazy", "뷰포트 가까이 와야 받는다"],
              ["틀린 값", "eager로 읽힌다"],
            ],
          },
        ],
      },
      {
        label: "decoding",
        body: "그림 파일을 화면에 찍을 점들로 푸는 일을 언제 할지에 대한 힌트입니다. sync는 다른 내용과 함께 한 번에 그립니다. async는 다른 내용을 먼저 그리고 그림을 나중에 그립니다. 기본은 auto로, 브라우저가 고릅니다.\n\nMDN은 HTML에 처음부터 있는 img에서는 차이를 느끼기 어렵다고 적습니다. 파일을 받는 동안 어차피 빈칸으로 먼저 그려지기 때문입니다. 스크립트로 img를 넣을 때 차이가 더 잘 보입니다. 다 풀린 뒤에 넣고 싶으면 img.decode()가 돌려주는 프로미스를 기다립니다.",
        tables: [
          {
            head: ["값", "하는 일"],
            rows: [
              ["auto (기본)", "브라우저가 고른다. 틀린 값도 이것"],
              ["sync", "다른 내용과 함께 한 번에 그린다"],
              ["async", "다른 내용을 먼저 그리고, 그림은 풀리는 대로"],
            ],
          },
        ],
        terms: [
          {
            term: "디코딩 (decoding)",
            body: "PNG, JPEG처럼 압축된 그림 파일을 화면에 찍을 점들로 푸는 일입니다. 큰 그림일수록 시간이 걸립니다. 진공 포장한 이불을 꺼내 부풀리는 것과 같아서, 받아 온 뒤에도 펼치는 시간이 따로 듭니다.",
          },
        ],
      },
      {
        label: "fetchpriority",
        body: "다른 그림들에 견준 받기 순서의 힌트입니다. high는 먼저, low는 나중에 받으라는 뜻입니다. 기본은 auto이고, 틀린 값도 auto로 읽힙니다. 첫 화면의 가장 큰 그림에 high를 주면 그 그림이 빨리 뜰 수 있습니다. 힌트일 뿐이라 브라우저가 따르지 않을 수도 있습니다. 모든 그림에 high를 주면 아무것도 앞서지 않습니다. <link rel=\"preload\">와 <script>에도 같은 속성이 있습니다.",
        tables: [
          {
            head: ["값", "하는 일"],
            rows: [
              ["auto (기본)", "따로 바라는 것이 없다"],
              ["high", "다른 그림보다 먼저 받기를 바란다"],
              ["low", "다른 그림보다 나중에 받기를 바란다"],
            ],
          },
        ],
      },
      {
        label: "crossorigin",
        body: "그림을 CORS 요청으로 받을지 정합니다. 속성이 없으면 보통 요청을 보냅니다. 다른 출처의 그림도 화면에는 뜹니다. 하지만 그 그림을 canvas에 그리면 canvas가 오염되어 픽셀을 읽을 수 없습니다.\n\n속성이 있으면 Origin 헤더를 붙인 CORS 요청을 보냅니다. 서버가 Access-Control-Allow-Origin으로 허락하지 않으면 그림이 아예 막히고, 콘솔에 CORS 에러가 납니다. 그러니 canvas로 읽을 그림이고 서버가 허락할 때만 붙입니다. 값을 비우거나 모르는 값을 적으면 anonymous로 읽힙니다.",
        tables: [
          {
            head: ["값", "하는 일"],
            rows: [
              ["(속성 없음)", "CORS 없이 받는다. canvas에 그리면 오염된다"],
              ["anonymous", "쿠키 같은 자격 증명 없이 CORS 요청"],
              ["use-credentials", "쿠키, 인증 헤더를 함께 보낸다. 서버가 Access-Control-Allow-Credentials: true로 허락해야 한다"],
              ["\"\" 또는 틀린 값", "anonymous와 같다"],
            ],
          },
        ],
        terms: [
          {
            term: "오염된 캔버스 (tainted canvas)",
            body: "다른 출처의 그림을 허락 없이 canvas에 그리면 canvas에 '오염' 표시가 붙습니다. 그 뒤로는 getImageData나 toDataURL로 픽셀을 꺼낼 수 없습니다. 남의 사진을 액자에 걸어 둘 수는 있어도 복사해 갈 수는 없는 것과 같습니다.",
          },
        ],
      },
      {
        label: "referrerpolicy",
        body: "그림을 받을 때 Referer 헤더에 지금 페이지의 주소를 얼마나 적을지 정합니다. 적지 않으면 기본 정책인 strict-origin-when-cross-origin을 따릅니다. 같은 출처에는 전체 주소를, 다른 출처에는 출처만 보냅니다. HTTPS에서 HTTP로 내려갈 때는 보내지 않습니다. 주소에 검색어나 토큰 같은 개인 정보가 있는 페이지라면 no-referrer나 origin으로 줄입니다. unsafe-url은 경로까지 어디로든 보내므로 쓰지 않습니다.",
        tables: [
          {
            head: ["값", "보내는 것"],
            rows: [
              ["no-referrer", "보내지 않는다"],
              ["no-referrer-when-downgrade", "전체 주소. HTTPS에서 HTTP로 갈 때만 빼고"],
              ["origin", "출처(scheme, 호스트, 포트)만"],
              ["origin-when-cross-origin", "같은 출처면 전체, 다른 출처면 출처만"],
              ["same-origin", "같은 출처에만 전체, 다른 출처에는 없음"],
              ["strict-origin", "출처만. 보안이 내려가면 없음"],
              ["strict-origin-when-cross-origin (기본)", "같은 출처면 전체, 다른 출처면 출처만, 보안이 내려가면 없음"],
              ["unsafe-url", "늘 출처와 경로. 쓰지 않는다"],
            ],
          },
        ],
        terms: [
          {
            term: "Referer 헤더",
            body: "요청을 보낼 때 '어느 페이지에서 왔는지'를 적는 HTTP 헤더입니다. 철자가 Referrer가 아니라 Referer인 것은 옛 표준의 오타가 그대로 굳은 것입니다. 편지 봉투의 보내는 사람 주소와 같고, 얼마나 자세히 적을지를 referrerpolicy로 정합니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: 잘못 적은 값은 기본값이 된다",
        body: "이 img의 다섯 속성 값은 모두 오타입니다. 그래도 에러는 나지 않고 그림도 뜹니다. 지금 값은 같은 이름의 DOM 프로퍼티이고, 브라우저가 실제로 쓰는 값이 나옵니다. decoding과 fetchPriority는 \"auto\", referrerPolicy는 \"\"(기본 정책)로 읽힙니다. loading은 표준대로라면 \"eager\"인데, Chrome 156에서는 옛 값 \"auto\"로 읽혔습니다. 어느 쪽이든 그림을 바로 받습니다.\n\ncrossOrigin만 결이 다릅니다. 모르는 값을 \"anonymous\"로 읽어서, 오타가 CORS 요청을 켭니다. 여기서는 같은 출처의 그림이라 무사히 뜹니다. 맨 아래 getAttribute는 적은 글자를 그대로 돌려줍니다. 오타를 찾을 때는 프로퍼티 쪽을 보면 됩니다.",
        lab: {
          html: `<img src="photo-400.svg" alt="값을 일부러 틀리게 적은 그림" width="160" height="120"
     loading="lazzy" decoding="snyc" fetchpriority="highest"
     crossorigin="yes" referrerpolicy="none">`,
          height: 170,
          checks: [
            { label: "img.loading", expr: "document.images[0].loading" },
            { label: "img.decoding", expr: "document.images[0].decoding" },
            { label: "img.fetchPriority", expr: "document.images[0].fetchPriority" },
            { label: "img.crossOrigin", expr: "document.images[0].crossOrigin" },
            { label: "img.referrerPolicy", expr: "document.images[0].referrerPolicy" },
            { label: "getAttribute('loading')", expr: "document.images[0].getAttribute('loading')" },
          ],
          tryIt: "값을 하나씩 바른 값으로 고쳐 실행해 보세요. crossorigin 속성을 아예 지우면 crossOrigin은 null이 됩니다.",
        },
        terms: [
          {
            term: "반영 (reflection)",
            body: "HTML 속성과 같은 이름의 DOM 프로퍼티가 서로 이어진 것입니다. img.loading을 읽으면 loading 속성을 읽어, 브라우저가 쓰는 값으로 돌려줍니다. 정해진 값만 받는 속성은 틀린 글자를 기본값으로 바꿔 보여 줍니다. 손글씨 주문서를 점원이 메뉴판의 이름으로 고쳐 읽는 것과 같습니다.",
          },
        ],
      },
      {
        label: "usemap과 ismap",
        body: "usemap은 그림 위에 누를 수 있는 영역들을 얹습니다. 값은 \"#이름\"이고, 같은 name을 가진 <map>을 찾아 잇습니다. <map> 안의 <area>마다 모양(shape), 좌표(coords), 갈 곳(href), 대신할 글자(alt)를 적습니다. shape은 rect, circle, poly, default 중 하나입니다. area의 alt도 img의 alt처럼 있어야 합니다. MDN은 img가 <a>나 <button> 안에 있으면 usemap을 쓸 수 없다고 적습니다.\n\nismap은 서버 쪽 이미지 맵을 뜻하는 불 속성입니다. <a href> 안의 img에만 쓸 수 있습니다. 그림을 누르면 링크 주소 뒤에 누른 좌표가 ?x,y 모양으로 붙어 서버로 갑니다. 마우스가 없는 사용자에게는 링크 주소 자체가 대신 갈 곳이 됩니다. 둘 다 요즘은 드물고, 영역마다 링크가 필요하면 보통 a를 따로 놓습니다.",
        code: '<img src="floor.png" alt="2층 안내도" usemap="#floor" width="400" height="300">\n<map name="floor">\n  <area shape="rect" coords="0,0,200,150" href="room-a.html" alt="회의실 A">\n  <area shape="circle" coords="300,220,50" href="lounge.html" alt="휴게실">\n</map>',
        codeLang: "html",
        terms: [
          {
            term: "이미지 맵 (image map)",
            body: "그림 한 장 위에 누를 수 있는 영역을 여러 개 정한 것입니다. 영역마다 갈 곳이 다릅니다. 지하철 노선도에서 역을 누르면 그 역의 안내로 가는 것과 같습니다.",
          },
        ],
      },
      {
        label: "elementtiming",
        body: "그림이 화면에 그려진 때를 성능 API로 잴 수 있게 표시합니다. 값은 내가 붙이는 이름이고, 재는 쪽에서 그 이름으로 그림을 알아봅니다. PerformanceObserver로 \"element\" 종류를 지켜봅니다. 그러면 표시한 요소마다 받은 때(loadTime)와 그린 때(renderTime)가 옵니다. <img> 말고 글 덩어리(p 등)에도 붙일 수 있습니다. 첫 화면의 중요한 그림이 언제 보였는지 잴 때 씁니다. MDN 호환성 표로는 Chrome 계열만 지원하고, 다른 브라우저는 이 속성을 그냥 무시합니다.",
        code: '<img src="hero.jpg" alt="가을 할인 30%" elementtiming="hero">\n<script>\n  new PerformanceObserver((list) => {\n    for (const e of list.getEntries()) console.log(e.identifier, e.renderTime);\n  }).observe({ type: "element", buffered: true });\n</script>',
        codeLang: "html",
      },
      {
        label: "scope (th)",
        body: "제목 칸이 어느 방향의 칸들의 제목인지 정합니다. 값이 없거나 넷 중 하나가 아니면 브라우저가 짐작합니다. 간단한 표에서는 짐작이 맞아서 없어도 됩니다. 그래도 MDN은 짐작을 잘못하는 보조 기술이 있으니 적는 편이 낫다고 적습니다. rowgroup과 colgroup은 칸 한 줄이 아니라 행 묶음(tbody 등)이나 열 묶음(colgroup)의 제목일 때 씁니다. td의 scope는 옛 속성이라 쓰지 않습니다. th와 scope의 기본은 11장에 있습니다.",
        tables: [
          {
            head: ["값", "제목이 붙는 칸"],
            rows: [
              ["row", "이 th가 있는 행의 칸들"],
              ["col", "이 th가 있는 열의 칸들"],
              ["rowgroup", "이 th가 속한 행 묶음(thead, tbody, tfoot)의 칸들"],
              ["colgroup", "이 th가 속한 열 묶음(colgroup)의 칸들"],
              ["(없음, 틀린 값)", "브라우저가 짐작한다. th.scope는 \"\""],
            ],
          },
        ],
      },
      {
        label: "abbr (th)",
        body: "제목 칸의 줄인 이름입니다. 긴 제목('1인당 월평균 지출')이 칸마다 되풀이해 읽히면 듣기 힘듭니다. abbr=\"월 지출\"을 주면, 낭독기가 다른 칸을 읽으며 이 제목을 붙일 때 짧은 이름을 쓸 수 있습니다. 화면에는 보이지 않습니다. 이 이름을 쓰는 정도는 낭독기마다 다릅니다. td의 abbr는 옛 속성입니다.",
      },
      {
        label: "headers와 id",
        body: "scope로 다 말할 수 없는 복잡한 표에서, 칸마다 제목 칸을 직접 고릅니다. 값은 제목 칸(th)의 id를 띄어 쓴 목록입니다. 한 칸에 제목이 셋 이상 겹치거나, 제목 칸이 표 한가운데에 있을 때 씁니다. 가리키는 id는 같은 표 안의 th여야 합니다. th에도 headers를 줄 수 있어서, 제목 칸 위의 큰 제목을 이을 수 있습니다. 손이 많이 가고 틀려도 에러가 나지 않으니, 표가 단순하면 scope로 충분합니다.",
        code: '<table>\n  <tr><td></td><th id="q1" colspan="2">1분기</th></tr>\n  <tr><td></td><th id="jan">1월</th><th id="feb">2월</th></tr>\n  <tr>\n    <th id="seoul">서울</th>\n    <td headers="seoul q1 jan">120</td>\n    <td headers="seoul q1 feb">98</td>\n  </tr>\n</table>',
        codeLang: "html",
      },
      {
        label: "직접 해 보기: scope와 headers 읽기",
        body: "지금 값의 첫 줄은 th마다 th.scope 프로퍼티입니다. 네 값(row, col, rowgroup, colgroup) 말고는 모두 \"\"로 읽힙니다. \"\"이면 브라우저가 방향을 짐작합니다. 둘째 줄의 headers는 적은 글자 그대로 나옵니다. 그래서 셋째 줄은 id를 하나씩 찾아 제목 칸의 글자로 바꿨습니다. 낭독기가 85 칸을 읽을 때 붙이는 제목이 이것입니다.\n\ntryIt대로 id 하나를 틀리게 적어 보세요. 에러는 나지 않고, 그 자리만 (없음)으로 바뀝니다. 낭독기에서는 그 제목이 조용히 빠집니다.",
        lab: {
          html: `<table border="1">
  <tr><td></td><th id="ko" scope="col">국어</th><th id="ma" scope="col">수학</th></tr>
  <tr>
    <th id="mj" scope="row">민지</th>
    <td headers="mj ko">90</td>
    <td headers="mj ma">85</td>
  </tr>
</table>`,
          height: 140,
          checks: [
            { label: "th마다 scope", expr: "[...document.querySelectorAll('th')].map((th) => th.scope)" },
            { label: "85 칸의 headers", expr: "document.querySelectorAll('td')[2].headers" },
            {
              label: "85 칸의 제목 칸들",
              expr: "document.querySelectorAll('td')[2].headers.split(' ').map((id) => document.getElementById(id)?.textContent ?? '(없음)')",
            },
          ],
          tryIt: "scope=\"col\" 하나를 scope=\"column\"으로, headers의 ma를 mb로 바꿔 실행해 보세요.",
        },
      },
      {
        label: "colspan과 rowspan",
        body: "칸 하나가 여러 열(colspan)이나 여러 행(rowspan)을 차지하게 합니다. 둘 다 기본은 1입니다. colspan은 1000을, rowspan은 65534를 넘으면 그 값으로 잘립니다. rowspan=\"0\"은 그 칸이 속한 묶음(thead, tbody, tfoot)의 끝까지라는 뜻입니다. 걸친 칸이 차지한 자리에는 다음 줄에서 칸을 적지 않습니다. 나머지 칸은 빈자리에 앞에서부터 채워집니다. 칸이 서로 겹치게 적으면 안 됩니다. 적힌 칸 수와 화면의 열 수가 달라지는 것은 11장 실험에서 봅니다.",
        tables: [
          {
            head: ["", "colspan", "rowspan"],
            rows: [
              ["기본", "1", "1"],
              ["최대", "1000 (넘으면 잘림)", "65534 (넘으면 잘림)"],
              ["0", "쓰지 않는다 (1 이상)", "묶음의 끝까지"],
            ],
          },
        ],
      },
      {
        label: "span (col, colgroup)",
        body: "<col>과 <colgroup>이 몇 개의 열을 묶을지 정합니다. 1 이상의 정수이고 기본은 1입니다. 열 묶음은 칸을 옮기지 않습니다. 여러 열에 한 번에 스타일을 줄 때 씁니다. 다만 col에 먹는 CSS는 몇 가지뿐입니다. background, width(최소 폭처럼), border(표가 border-collapse: collapse일 때), visibility: collapse입니다. 글자색이나 정렬은 먹지 않습니다. colgroup에 span을 적었으면 안에 col을 두지 않습니다. th의 scope=\"colgroup\"이 가리키는 묶음이 이것입니다.",
      },
      {
        label: "직접 해 보기: rowspan=\"0\"과 cellIndex",
        body: "rowspan=\"0\"은 '이 묶음의 끝까지'입니다. tbody를 적지 않았지만 파서가 만들었으므로, 오전 칸은 세 줄을 모두 차지합니다. 지금 값의 th.rowSpan은 0입니다. 줄을 하나 더 적으면 오전 칸도 따라 늘어납니다. MDN 호환성 표로는 Safari가 아직 rowspan=\"0\"을 지원하지 않습니다.\n\n음악 칸은 화면에서 둘째 열인데 cellIndex는 0입니다. cellIndex는 그 줄에 적힌 칸 가운데 몇째인지이고, 화면의 열 번호가 아닙니다. tryIt대로 rowspan을 \"2\"로 바꾸면 음악이 첫 열로 당겨집니다. 그래도 cellIndex는 0 그대로입니다. 첫 col의 span=\"2\"는 앞의 두 열에 한 번에 배경을 칠합니다.",
        lab: {
          html: `<table border="1">
  <colgroup><col span="2" style="background: #fde"><col></colgroup>
  <tr><th rowspan="0">오전</th><td>국어</td><td>수학</td></tr>
  <tr><td>영어</td><td>과학</td></tr>
  <tr><td>음악</td><td>체육</td></tr>
</table>`,
          height: 160,
          checks: [
            { label: "th.rowSpan", expr: "document.querySelector('th').rowSpan" },
            { label: "행마다 cells.length", expr: "[...document.querySelector('table').rows].map((r) => r.cells.length)" },
            {
              label: "음악의 cellIndex",
              expr: "[...document.querySelectorAll('td')].find((td) => td.textContent === '음악').cellIndex",
            },
            { label: "첫 col의 span", expr: "document.querySelector('col').span" },
          ],
          tryIt: "rowspan=\"0\"을 \"2\"로 바꿔 실행해 보세요. 셋째 줄의 칸들이 왼쪽으로 당겨집니다.",
        },
      },
      {
        label: "문제가 나는 경우",
        body: "이 속성들은 틀려도 에러가 나지 않습니다. 화면은 멀쩡한데 낭독기나 네트워크에서만 드러나는 일이 많습니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["alt=\"그림\", alt=\"IMG_2031.jpg\"", "낭독기가 쓸모없는 말을 읽는다", "그림 대신 들어갈 말을 적는다"],
              ["아이콘 버튼에 alt=\"화살표\"", "무엇을 하는 버튼인지 모른다", "누르면 일어나는 일을 적는다: alt=\"다음 쪽\""],
              ["w 후보를 쓰고 sizes를 빼먹었다", "100vw로 보고 필요보다 큰 파일을 받는다", "그림이 차지할 폭을 sizes에 적는다"],
              ["crossorigin을 아무 그림에나 붙였다", "서버가 CORS를 허락하지 않으면 그림이 안 뜬다", "canvas로 읽을 그림에만, 허락하는 서버에서"],
              ["loading=\"lazzy\"처럼 오타", "에러 없이 기본값(eager)으로 동작한다", "img.loading 프로퍼티로 확인한다"],
              ["headers의 id를 틀리게 적었다", "그 제목만 조용히 빠진다", "id를 맞추거나, 단순한 표면 scope로"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) 글자 없이 그림만 든 링크에서 alt에는 무엇을 적나요?\n2) srcset이 w 기술자를 쓸 때 src는 후보에 드나요? x 기술자일 때는요?\n3) crossorigin=\"yes\"라고 적으면 img.crossOrigin은 무엇으로 읽히나요?\n4) rowspan=\"0\"은 무슨 뜻이고, cellIndex는 왜 화면의 열 번호와 다를 수 있나요?",
      },
    ],
    sources: [
      { label: "MDN — <img>", href: `${REF}/Elements/img` },
      { label: "MDN — <th>", href: `${REF}/Elements/th` },
      { label: "MDN — <td>", href: `${REF}/Elements/td` },
      { label: "MDN — crossorigin", href: `${REF}/Attributes/crossorigin` },
      { label: "MDN — fetchpriority", href: `${REF}/Attributes/fetchpriority` },
      { label: "W3C WAI — An alt Decision Tree", href: "https://www.w3.org/WAI/tutorials/images/decision-tree/" },
    ],
  },

  {
    id: "html-attr-aria",
    name: "ARIA 속성과 role",
    tagline: "보조 기술에 들리는 말만 바꾸는 속성",
    intro:
      "role과 aria-* 속성은 접근성 트리에 적히는 역할, 이름, 상태를 바꿉니다. 화면 낭독기 같은 보조 기술은 이 트리를 읽습니다. 하지만 ARIA는 들리는 말만 바꿉니다. 포커스, 키보드, 클릭 같은 동작은 하나도 더하지 않습니다. 그래서 ARIA의 첫 규칙은 'ARIA보다 맞는 HTML 요소를 먼저 쓴다'입니다. 이 시트는 자주 쓰는 role 값과 같은 일을 하는 HTML 요소, 그리고 aria-* 속성의 값과 함정을 모읍니다.",
    blocks: [
      {
        label: "한눈에 보기",
        body: "이 시트에 나오는 속성입니다. 모두 전역 속성이라 어느 요소에나 적을 수는 있습니다. 하지만 역할마다 뜻이 있는 속성이 정해져 있습니다. 값이 true, false인 aria-* 속성은 불 속성이 아닙니다. 값 없이 적으면 켜지지 않고, \"true\"를 글자로 적어야 합니다.",
        tables: [
          {
            head: ["속성", "붙는 곳", "값", "하는 일"],
            rows: [
              ["role", "모든 요소", "역할 이름 (button, navigation 등)", "요소의 역할을 바꾼다"],
              ["aria-label", "이름을 가질 수 있는 역할", "글자", "이름을 직접 준다"],
              ["aria-labelledby", "이름을 가질 수 있는 역할", "id 목록", "다른 요소의 글로 이름을 준다"],
              ["aria-describedby", "모든 요소", "id 목록", "이름 뒤에 읽을 설명을 잇는다"],
              ["aria-hidden", "모든 요소", "true, false", "접근성 트리에서 뺀다"],
              ["aria-expanded", "button, link 등 펼치는 컨트롤", "true, false", "펼쳐졌는지 알린다"],
              ["aria-controls", "컨트롤", "id 목록", "이 컨트롤이 바꾸는 요소를 잇는다"],
              ["aria-current", "모든 요소", "page, step, location, date, time, true, false", "여럿 가운데 지금 것을 표시한다"],
              ["aria-live", "글이 바뀌는 영역", "off(기본), polite, assertive", "바뀐 글을 읽어 줄지, 언제"],
              ["aria-pressed", "button", "true, false, mixed", "눌림 상태가 있는 토글 버튼"],
              ["aria-checked", "checkbox, radio, switch 등", "true, false, mixed", "체크 상태"],
              ["aria-invalid", "입력 칸", "false(기본), true, grammar, spelling", "값이 틀렸다고 알린다"],
              ["aria-required", "입력 칸", "true, false", "꼭 채워야 한다고 알린다"],
              ["aria-disabled", "컨트롤", "true, false", "꺼졌다고 알린다. 동작은 그대로"],
            ],
          },
        ],
      },
      {
        label: "ARIA가 바꾸는 것과 못 바꾸는 것",
        body: "브라우저는 DOM과 따로 접근성 트리를 만듭니다. 요소마다 역할(button), 이름('저장'), 상태(눌림, 펼침)가 붙고, 보조 기술은 이것을 읽습니다. role과 aria-*는 이 트리의 값만 바꿉니다.\n\ndiv에 role=\"button\"을 붙이면 낭독기는 그 div를 버튼이라고 알립니다. 그런데 그 div는 여전히 Tab으로 가지 않고, Enter나 Space를 눌러도 click이 나지 않습니다. 폼 안에 있어도 폼을 보내지 않습니다. 버튼처럼 들리지만 버튼처럼 움직이지 않는 것입니다. aria-disabled=\"true\"도 같습니다. 꺼졌다고 읽히지만 누르면 click이 그대로 납니다. 동작은 HTML 요소나 스크립트가 맡습니다. 상태를 CSS 선택자([aria-expanded=\"true\"])로 모양에 쓰는 것은 괜찮습니다.",
        tables: [
          {
            caption: "<button>과 <div role=\"button\">",
            head: ["견줄 것", "<button>", "<div role=\"button\">"],
            rows: [
              ["낭독기가 알리는 역할", "버튼", "버튼"],
              ["Tab으로 가는가", "간다", "안 간다. tabindex=\"0\"이 필요"],
              ["Enter, Space로 click", "난다", "안 난다. 키 처리를 직접"],
              ["폼 보내기", "type=\"submit\"이면 보낸다", "안 한다"],
              ["끄기", "disabled", "aria-disabled와 스크립트"],
            ],
          },
        ],
        terms: [
          {
            term: "WAI-ARIA",
            body: "W3C가 만든 접근성 표준으로, HTML만으로 알릴 수 없는 역할과 상태를 속성으로 더합니다. role 속성과 aria-로 시작하는 속성들입니다. 무대 옆의 수어 통역사처럼, 공연은 그대로 두고 전하는 말만 보탭니다.",
          },
          {
            term: "보조 기술 (assistive technology)",
            body: "화면 낭독기, 화면 확대기, 음성 조작, 점자 단말기처럼 사용자가 컴퓨터를 쓰도록 돕는 프로그램과 기기입니다. 화면 낭독기는 화면의 그림이 아니라 브라우저가 만든 접근성 트리를 읽습니다. 안경처럼 사용자와 화면 사이에 끼어 있는 도구입니다.",
          },
        ],
      },
      {
        label: "ARIA를 쓰는 다섯 규칙",
        body: "W3C의 'Using ARIA' 문서는 ARIA를 쓸 때의 규칙 다섯을 적습니다.\n(1) 필요한 뜻과 동작을 이미 가진 HTML 요소나 속성이 있으면 그것을 씁니다. div에 role=\"button\"을 붙이지 말고 button을 씁니다.\n(2) 꼭 필요하지 않으면 요소의 원래 뜻을 바꾸지 않습니다. <h2 role=\"tab\"> 대신 <div role=\"tab\"><h2>…</h2></div>처럼 감쌉니다.\n(3) ARIA로 만든 컨트롤은 모두 키보드로 쓸 수 있어야 합니다.\n(4) 포커스를 받는 요소에 role=\"presentation\"이나 aria-hidden=\"true\"를 쓰지 않습니다.\n(5) 상호작용하는 요소에는 모두 접근 가능한 이름이 있어야 합니다.\n\nARIA 작성 지침(APG)은 'ARIA가 없는 것이 나쁜 ARIA보다 낫다'고도 적습니다. 틀린 role은 아무것도 안 한 것보다 사용자를 더 헷갈리게 합니다.",
      },
      {
        label: "role: 랜드마크",
        body: "랜드마크는 페이지의 큰 구역입니다. 낭독기 사용자는 랜드마크 목록으로 구역 사이를 건너뜁니다. 아래 role은 모두 같은 일을 하는 HTML 요소가 있습니다. 요소를 쓰면 role을 적을 필요가 없고, 같은 role을 또 적지도 않습니다(<nav role=\"navigation\">). 같은 랜드마크가 둘 이상이면 aria-label로 이름을 붙여 구별합니다. 요소마다 역할이 붙는 조건은 6장에 있습니다. role 값에 낱말을 여럿 적으면 브라우저는 그중 아는 첫째를 씁니다.",
        tables: [
          {
            caption: "랜드마크 role",
            head: ["role", "뜻", "같은 HTML"],
            rows: [
              ["banner", "사이트의 머리", "<header> (article, aside, main, nav, section 밖)"],
              ["navigation", "탐색 링크 묶음", "<nav>"],
              ["main", "이 페이지의 본문", "<main>"],
              ["complementary", "본문을 돕는 곁 내용", "<aside>"],
              ["contentinfo", "사이트의 꼬리 (저작권, 연락처)", "<footer> (header와 같은 조건)"],
              ["region", "이름 붙은 구역", "이름 있는 <section>"],
              ["search", "검색 기능 묶음", "<search>"],
              ["form", "이름 붙은 폼", "이름 있는 <form>"],
            ],
          },
        ],
        terms: [
          {
            term: "암묵적 역할 (implicit role)",
            body: "role을 적지 않아도 태그가 저절로 가지는 역할입니다. <nav>는 navigation, <button>은 button입니다. 그래서 같은 role을 또 적을 필요가 없습니다. 교복을 입은 학생에게 '학생' 이름표를 따로 달지 않는 것과 같습니다.",
          },
        ],
      },
      {
        label: "직접 해 보기: role로 적은 랜드마크",
        body: "모두 div지만 role을 적었습니다. 지금 값의 labLandmarks()는 role 속성을 먼저 읽고, 없을 때만 태그로 역할을 정합니다. 그래서 다섯 구역이 모두 랜드마크로 나옵니다. search는 main 안에 있어 한 칸 들여 나옵니다.\n\n이제 tryIt대로 div를 요소로 바꾸고 role을 지워 보세요. 랜드마크 목록은 같고, role 속성 수만 0이 됩니다. 결과가 같다면 요소를 씁니다. 이것이 첫 규칙입니다. 코드가 짧고, 뜻이 태그 이름에 바로 보입니다.",
        lab: {
          html: `<div role="banner">사이트 머리</div>
<div role="navigation" aria-label="주 메뉴"><a href="#home">홈</a></div>
<div role="main">
  <div role="search" aria-label="글 검색"><input aria-label="검색어"></div>
  <p>본문</p>
</div>
<div role="contentinfo">사이트 꼬리</div>`,
          height: 200,
          checks: [
            { label: "labLandmarks()", expr: "labLandmarks()" },
            { label: "role 속성이 있는 요소 수", expr: "document.querySelectorAll('[role]').length" },
          ],
          tryIt: "div 다섯을 차례로 header, nav, main, search, footer로 바꾸고 role을 지워 실행해 보세요.",
        },
      },
      {
        label: "role: 위젯",
        body: "위젯 role은 누르고 고르는 컨트롤입니다. 이 role들은 동작을 약속하는 말입니다. role=\"checkbox\"라고 적으면 낭독기 사용자는 Space로 체크할 수 있다고 믿습니다. 그 약속은 스크립트로 직접 지켜야 합니다. tabindex=\"0\"으로 포커스를 받게 하고, 키 입력을 처리하고, aria-checked 같은 상태를 바꿔 줍니다. 같은 HTML 요소가 있으면 이 일을 브라우저가 모두 합니다.\n\ntab, tablist, tabpanel처럼 HTML에 없는 위젯을 만들 때 ARIA가 제값을 합니다. alert와 status는 라이브 영역이기도 합니다. 빈 영역을 먼저 두고 안의 글만 바꾸는 편이 확실하게 읽힙니다(아래 aria-live).",
        tables: [
          {
            caption: "위젯 role",
            head: ["role", "뜻", "같은 HTML", "직접 해야 할 일"],
            rows: [
              ["button", "누르는 버튼", "<button>", "tabindex=\"0\", Enter와 Space"],
              ["link", "다른 곳으로 가는 링크", "<a href>", "tabindex=\"0\", Enter, 이동. 새 탭 메뉴는 못 만든다"],
              ["checkbox", "켜고 끄는 칸", "<input type=\"checkbox\">", "aria-checked, Space"],
              ["tablist, tab, tabpanel", "탭 묶음, 탭, 탭이 보여 주는 판", "없음", "aria-selected, aria-controls, 화살표 키"],
              ["dialog", "대화 상자", "<dialog>", "포커스 옮기기, Esc, 모달이면 뒤를 막기"],
              ["alert", "급한 알림. 바로 읽는다", "없음", "알릴 때 글을 넣는다"],
              ["status", "상태 알림. 하던 말 뒤에 읽는다", "<output>", "알릴 때 글을 넣는다"],
            ],
          },
        ],
      },
      {
        label: "직접 해 보기: div 버튼과 진짜 버튼",
        body: "먼저 div 버튼을 마우스로 눌러 보세요. 기록에 출력 줄(div에서 click)만 나옵니다. 엔진은 진짜 컨트롤의 클릭만 적으므로, div에는 클릭 줄이 없습니다. 이어서 Tab을 누르면 focus 줄에 진짜 버튼만 나옵니다. div 버튼은 Tab이 건너뜁니다. 지금 값의 tabIndex도 div는 -1, button은 0입니다.\n\n포커스가 진짜 버튼에 있을 때 Enter나 Space를 누르면 click이 나고 출력 줄이 찍힙니다. role=\"button\"은 이름표만 바꿨고, 동작은 그대로 div입니다. macOS Safari는 기본 설정에서 Tab이 버튼에 멈추지 않으니 Option+Tab을 누르세요.",
        lab: {
          html: `<div role="button">div 버튼</div>
<button type="button">진짜 버튼</button>
<script>
  for (const el of document.querySelectorAll('[role=button], button')) {
    el.addEventListener('click', () => console.log(el.localName + '에서 click'));
  }
</script>`,
          height: 120,
          logFocus: true,
          checks: [
            { label: "document.activeElement", expr: "document.activeElement" },
            {
              label: "tabIndex",
              expr: "[...document.querySelectorAll('[role=button], button')].map((el) => el.localName + ' ' + el.tabIndex)",
            },
          ],
          tryIt: "div에 tabindex=\"0\"을 더해 실행해 보세요. 이제 Tab이 div에도 멈춥니다. 하지만 Enter, Space를 눌러도 출력 줄이 나오지 않습니다.",
        },
      },
      {
        label: "role: 구조와 none, generic",
        body: "구조 role은 내용의 짜임을 알립니다. 대부분 같은 HTML 요소가 있으니 요소를 씁니다. role=\"heading\"에는 aria-level로 단계를 함께 적습니다. 적지 않으면 2단계로 봅니다. role=\"img\"는 여러 요소를 그림 하나로 묶습니다. 안쪽은 따로 읽히지 않으므로 aria-label로 이름을 줍니다.\n\nnone과 presentation은 같은 뜻입니다. 요소의 역할만 지우고 안의 글은 남깁니다. 화면 배치에 표를 쓴 옛 코드에 <table role=\"none\">을 붙이는 식입니다. 그러면 안쪽 tr, td의 역할도 함께 지워집니다. 단, 포커스를 받는 요소나 aria-describedby 같은 전역 ARIA 속성이 있는 요소에서는 브라우저가 none을 무시합니다. generic은 div와 span의 암묵적 역할입니다. ARIA 1.2는 작성자가 generic을 직접 쓰지 말라고 적습니다.",
        tables: [
          {
            caption: "구조 role",
            head: ["role", "뜻", "같은 HTML"],
            rows: [
              ["img", "그림 하나", "<img alt=\"글자\">"],
              ["list, listitem", "목록과 항목", "<ul>, <ol>, <li>"],
              ["note", "본문에 곁들인 참고", "없음"],
              ["heading (+ aria-level)", "제목", "<h1>~<h6>"],
              ["none, presentation", "역할 없음. 글은 남는다", "없음 (<img alt=\"\">가 이 역할)"],
              ["generic", "뜻 없는 상자", "<div>, <span>"],
            ],
          },
        ],
      },
      {
        label: "aria-label과 aria-labelledby",
        body: "둘 다 요소의 접근 가능한 이름을 정합니다. aria-label은 이름 글자를 바로 적습니다. aria-labelledby는 이름이 될 글을 가진 요소의 id를 적습니다. 화면에 이미 보이는 글이 있으면 aria-labelledby가 낫습니다. 보이는 글과 들리는 이름이 어긋나지 않습니다. id를 여럿 적으면 그 순서로 이어 붙이고, 가리킨 요소가 숨겨져 있어도 그 글을 씁니다.\n\n이름은 aria-labelledby, aria-label, HTML의 방법(label, alt, 안의 글), title 순으로 정해집니다. 그래서 aria-label은 버튼 안의 글과 label을 덮어씁니다. 보이는 글이 '보내기'인데 aria-label=\"제출\"이면, 음성으로 '보내기 눌러'라고 말하는 사용자가 누르지 못합니다. 보이는 글을 이름에 그대로 담습니다. ARIA 1.2는 역할 없는 div, span에 이름을 붙이는 것을 금지합니다. 낭독기가 읽지 않을 수 있습니다.",
        code: '<h2 id="cart-title">장바구니</h2>\n<section aria-labelledby="cart-title">…</section>\n\n<button type="button" aria-label="닫기">×</button>',
        codeLang: "html",
        terms: [
          {
            term: "접근 가능한 이름 (accessible name)",
            body: "보조 기술이 요소를 부르는 이름입니다. 버튼이면 안의 글, 그림이면 alt, 입력 칸이면 label에서 옵니다. aria-labelledby나 aria-label이 있으면 그것이 먼저입니다. 사람의 이름표와 같아서, 없으면 그냥 '버튼'이라고만 불려 무엇인지 모릅니다.",
          },
        ],
      },
      {
        label: "aria-describedby",
        body: "이름 말고 덧붙일 설명을 잇습니다. 값은 설명 글을 가진 요소의 id 목록입니다. 낭독기는 대개 이름과 역할을 읽은 뒤 설명을 읽습니다. 입력 칸의 형식 안내나 에러 문구를 칸과 이을 때 씁니다. 이름은 짧게 두고 긴 안내는 설명으로 나누는 것입니다. aria-labelledby처럼 숨겨진 요소의 글도 쓸 수 있습니다.",
        code: '<label for="pw">비밀번호</label>\n<input id="pw" type="password" aria-describedby="pw-hint">\n<p id="pw-hint">8자 이상, 숫자를 하나 넣으세요.</p>',
        codeLang: "html",
      },
      {
        label: "aria-hidden",
        body: "aria-hidden=\"true\"는 요소와 그 안쪽 전부를 접근성 트리에서 뺍니다. 화면에는 그대로 보이고, 마우스와 키보드도 그대로 닿습니다. 화면에만 필요한 꾸밈(아이콘 글꼴, 장식 기호, 같은 말을 되풀이하는 그림)을 낭독기에서 감출 때 씁니다.\n\n함정이 셋 있습니다.\n(1) 포커스를 받는 요소에 쓰지 않습니다(넷째 규칙). Tab으로는 가는데 낭독기는 그 요소를 모릅니다.\n(2) 안쪽 요소에 aria-hidden=\"false\"를 적어도 되살아나지 않습니다.\n(3) 값 없이 aria-hidden만 적으면 숨겨지지 않습니다. \"true\"를 글자로 적습니다.\n모달 뒤처럼 보기 말고 다 막아야 하는 곳에는 inert를 씁니다(15장). hidden이나 display: none은 화면과 트리에서 함께 뺍니다.",
        code: '<button type="button"><span aria-hidden="true">★</span> 즐겨찾기</button>',
        codeLang: "html",
      },
      {
        label: "직접 해 보기: aria-hidden과 inert",
        body: "링크 A를 마우스로 눌러 보세요. 기록에 링크 클릭과 hashchange가 찍힙니다. aria-hidden은 마우스를 막지 않습니다. 이어서 Tab을 누르면 포커스는 링크 B를 건너뛰고 링크 C로 갑니다. Shift+Tab으로 돌아가면 다시 링크 A에 멈춥니다. 낭독기는 모르는 링크에 키보드 포커스가 있는 상태입니다.\n\n링크 B는 눌러도 기록에 아무것도 나오지 않습니다. inert는 클릭, 포커스, 보조 기술을 함께 닫습니다. 그래서 모달 뒤를 막는 데는 inert가 맞습니다. macOS Safari는 기본 설정에서 Tab이 링크에 멈추지 않으니 Option+Tab을 누르세요.",
        lab: {
          html: `<p aria-hidden="true">aria-hidden 안: <a href="#a">링크 A</a></p>
<p inert>inert 안: <a href="#b">링크 B</a></p>
<p>보통: <a href="#c">링크 C</a></p>`,
          height: 140,
          logFocus: true,
          checks: [
            { label: "document.activeElement", expr: "document.activeElement" },
            { label: "location.hash", expr: "location.hash" },
          ],
          tryIt: "첫 p의 aria-hidden=\"true\"를 inert로 바꿔 실행해 보세요. 이제 Tab이 링크 C에만 멈춥니다.",
        },
      },
      {
        label: "aria-expanded와 aria-controls",
        body: "aria-expanded는 펼치고 접는 컨트롤이 지금 펼쳐졌는지 알립니다. 값은 \"true\", \"false\"입니다. 접히는 쪽(메뉴)이 아니라 누르는 쪽(버튼)에 붙입니다. 속성이 없으면 '펼치는 컨트롤이 아님'이라는 뜻이라, 접힌 상태도 \"false\"로 적어 둡니다. 상태는 스크립트가 직접 바꿔야 합니다. 브라우저는 메뉴가 보이는지 보고 값을 고쳐 주지 않습니다.\n\naria-controls는 이 컨트롤이 바꾸는 요소의 id를 적습니다. 그 요소로 건너가는 길을 주는 낭독기도 있지만, 쓰는 정도가 낭독기마다 다릅니다. <details>와 <summary>를 쓰면 펼침 상태를 브라우저가 알아서 알립니다(14장).",
      },
      {
        label: "직접 해 보기: aria-expanded를 스크립트로",
        body: "메뉴 버튼을 눌러 보세요. 목록이 열리고, 지금 값의 aria-expanded가 \"true\"로, menu.hidden이 false로 바뀝니다. 다시 누르면 둘 다 돌아옵니다. button.ariaExpanded는 같은 속성을 읽는 DOM 프로퍼티입니다.\n\n이제 tryIt대로 setAttribute 줄을 지워 보세요. 목록은 여전히 열리고 닫히는데 aria-expanded는 \"false\"에 머뭅니다. 화면은 열렸는데 낭독기는 '접힘'이라고 알리는 상태입니다. ARIA 상태는 이렇게 손으로 맞춰야 하고, 빠뜨려도 에러가 나지 않습니다.",
        lab: {
          html: `<button type="button" aria-expanded="false" aria-controls="menu">메뉴</button>
<ul id="menu" hidden>
  <li><a href="#one">하나</a></li>
  <li><a href="#two">둘</a></li>
</ul>
<script>
  const btn = document.querySelector('button');
  const menu = document.getElementById('menu');
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
</script>`,
          height: 160,
          checks: [
            { label: "aria-expanded 속성", expr: "document.querySelector('button').getAttribute('aria-expanded')" },
            { label: "button.ariaExpanded", expr: "document.querySelector('button').ariaExpanded" },
            { label: "menu.hidden", expr: "document.getElementById('menu').hidden" },
          ],
          tryIt: "스크립트의 btn.setAttribute(…) 줄을 지우고 실행한 뒤 메뉴를 눌러 보세요.",
        },
      },
      {
        label: "aria-current",
        body: "같은 종류 여럿 가운데 지금 것을 표시합니다. 메뉴의 링크 중 지금 보고 있는 페이지, 단계 표시의 지금 단계, 달력의 오늘 같은 것입니다. 값은 그것이 무엇의 '지금'인지를 말합니다. 하나에만 붙이고, 나머지에는 붙이지 않거나 \"false\"로 둡니다. 색이나 굵기로만 지금 페이지를 보이면 낭독기 사용자는 알 수 없습니다. CSS에서 [aria-current=\"page\"]로 모양을 주면 뜻과 모양이 함께 움직입니다.",
        tables: [
          {
            head: ["값", "지금 것"],
            rows: [
              ["page", "링크 묶음 가운데 지금 페이지"],
              ["step", "단계 표시 가운데 지금 단계"],
              ["location", "흐름도 같은 그림에서 지금 위치"],
              ["date", "달력에서 오늘"],
              ["time", "시간표에서 지금 시간"],
              ["true", "여럿 가운데 지금 것 (종류를 말하지 않음)"],
              ["false (기본)", "지금 것이 아니다"],
              ["모르는 값", "true로 본다"],
            ],
          },
        ],
        code: '<nav aria-label="주 메뉴">\n  <a href="/" aria-current="page">홈</a>\n  <a href="/blog">블로그</a>\n</nav>',
        codeLang: "html",
      },
      {
        label: "aria-live: polite와 assertive",
        body: "aria-live가 붙은 영역은 라이브 영역이 됩니다. 그 안의 글이 바뀌면 포커스가 거기 없어도 낭독기가 읽어 줍니다. 장바구니 개수, 저장 완료, 검색 결과 수처럼 스크립트가 바꾸는 글에 씁니다.\n\npolite는 하던 말을 마친 뒤 읽고, assertive는 하던 말을 끊고 바로 읽습니다. assertive는 사용자를 방해하므로 급한 알림에만 씁니다. role=\"status\"는 polite를, role=\"alert\"는 assertive를 이미 뜻합니다. 영역은 처음부터 문서에 두고 안의 글만 바꿉니다. 영역과 글을 한꺼번에 새로 넣으면 읽히지 않을 수 있습니다.",
        tables: [
          {
            head: ["값", "바뀐 글을"],
            rows: [
              ["off (기본)", "따로 읽어 주지 않는다"],
              ["polite", "하던 말을 마친 뒤 읽는다"],
              ["assertive", "하던 말을 끊고 바로 읽는다"],
            ],
          },
        ],
        code: '<button type="button" id="save">저장</button>\n<p role="status" id="msg"></p>\n<script>\n  document.getElementById("save").addEventListener("click", () => {\n    document.getElementById("msg").textContent = "저장했습니다";\n  });\n</script>',
        codeLang: "html",
        terms: [
          {
            term: "라이브 영역 (live region)",
            body: "글이 바뀌면 포커스가 없어도 보조 기술이 읽어 주는 영역입니다. aria-live, role=\"status\", role=\"alert\"가 만듭니다. 역의 안내 방송처럼, 보고 있지 않아도 바뀐 소식을 들려줍니다.",
          },
        ],
      },
      {
        label: "aria-pressed와 aria-checked",
        body: "aria-pressed는 button을 토글 버튼으로 만듭니다. 낭독기는 이 버튼을 눌림 상태가 있는 버튼으로 알립니다. 이름은 그대로 두고 상태만 바꿉니다. 이름을 '굵게 켜기', '굵게 끄기'로 바꾸면서 aria-pressed까지 붙이면 뜻이 겹칩니다.\n\naria-checked는 checkbox, radio, switch 같은 role의 체크 상태입니다. role=\"checkbox\"에는 꼭 있어야 합니다. 진짜 <input type=\"checkbox\">에는 쓰지 않습니다. 브라우저가 checked로 이미 알리고, 두 값이 어긋나면 헷갈립니다. mixed는 '일부만 체크됨'입니다. 진짜 체크 상자에서는 indeterminate 프로퍼티가 같은 일을 합니다.",
        tables: [
          {
            head: ["값", "aria-pressed", "aria-checked"],
            rows: [
              ["true", "눌림", "체크됨"],
              ["false", "안 눌림", "체크 안 됨"],
              ["mixed", "섞인 상태 (고른 글의 일부만 굵을 때)", "일부만 체크됨"],
              ["(없음)", "토글 버튼이 아니다", "checkbox 역할에는 꼭 있어야 한다"],
            ],
          },
        ],
      },
      {
        label: "aria-invalid와 aria-required",
        body: "aria-invalid=\"true\"는 입력한 값이 틀렸다고 알립니다. 값을 검사한 뒤에 붙이고, 아직 입력하지 않은 칸에는 붙이지 않습니다. 무엇이 틀렸는지는 aria-describedby로 에러 문구를 이어 알립니다.\n\naria-required=\"true\"는 꼭 채워야 하는 칸이라고 알리기만 합니다. 빈칸이어도 폼은 그대로 보내집니다. HTML의 required는 알리는 일과 막는 일을 함께 합니다. 진짜 입력 요소에는 required를 쓰고, role로 만든 입력 위젯에만 aria-required를 씁니다. 폼 검증은 13장에 있습니다.",
        tables: [
          {
            caption: "aria-invalid의 값",
            head: ["값", "뜻"],
            rows: [
              ["false (기본)", "틀린 것이 없다"],
              ["true", "값이 틀렸다"],
              ["grammar", "문법 오류가 있다"],
              ["spelling", "맞춤법 오류가 있다"],
              ["모르는 값", "true로 본다"],
            ],
          },
        ],
      },
      {
        label: "aria-disabled와 disabled",
        body: "disabled는 HTML 폼 요소의 불 속성이고, 진짜로 끕니다. Tab으로 가지 않고, 눌러도 click이 나지 않고, 폼을 보낼 때 값도 빠집니다. aria-disabled=\"true\"는 꺼졌다고 알리기만 합니다. 포커스도 가고 click도 그대로 나므로, 누를 때 할 일을 스크립트에서 막아야 합니다.\n\n그래도 aria-disabled가 쓸모 있는 때가 있습니다. 꺼진 버튼에도 Tab으로 닿게 해서, 왜 꺼졌는지 설명을 들려주고 싶을 때입니다. disabled 버튼은 Tab에서 빠져, 키보드 사용자는 그런 버튼이 있는 줄도 모를 수 있습니다. disabled는 button, input, select, textarea, fieldset 같은 폼 요소에만 있습니다. div에 적으면 아무 일도 하지 않습니다.",
        tables: [
          {
            head: ["견줄 것", "disabled", "aria-disabled=\"true\""],
            rows: [
              ["낭독기", "꺼짐으로 알린다", "꺼짐으로 알린다"],
              ["Tab 포커스", "빠진다", "간다"],
              ["click 이벤트", "나지 않는다", "난다. 스크립트로 막는다"],
              ["폼으로 보내는 값", "빠진다", "그대로 보낸다"],
              ["붙는 곳", "폼 요소", "역할이 있는 아무 요소"],
            ],
          },
        ],
      },
      {
        label: "문제가 나는 경우",
        body: "ARIA의 실수는 화면에 드러나지 않습니다. 키보드로 써 보거나 낭독기로 들어 봐야 보입니다.",
        tables: [
          {
            head: ["한 것", "생기는 일", "고치는 법"],
            rows: [
              ["div에 role=\"button\"만 붙였다", "Tab으로 못 가고 Enter, Space가 듣지 않는다", "<button>을 쓴다"],
              ["포커스가 가는 요소에 aria-hidden=\"true\"", "키보드는 가는데 낭독기는 그 요소를 모른다", "숨기지 않거나, inert나 hidden을 쓴다"],
              ["aria-hidden을 값 없이 적었다", "숨겨지지 않는다", "aria-hidden=\"true\"로 값을 적는다"],
              ["펼침 메뉴의 aria-expanded를 안 바꾼다", "열렸는데 '접힘'이라고 알린다", "열고 닫는 코드에서 함께 바꾼다"],
              ["보이는 글과 다른 aria-label", "음성으로 버튼 이름을 말해도 못 누른다", "보이는 글을 이름에 담는다"],
              ["<nav role=\"navigation\">", "해는 없지만 뜻이 겹친다", "role을 지운다"],
            ],
          },
        ],
      },
      {
        label: "확인 질문",
        body: "1) div에 role=\"button\"을 붙이면 무엇이 바뀌고 무엇이 그대로인가요?\n2) 포커스를 받는 링크에 aria-hidden=\"true\"를 붙이면 어떻게 되나요? inert는요?\n3) aria-label과 aria-labelledby가 함께 있으면 어느 쪽이 이름이 되나요?\n4) polite와 assertive는 각각 언제 읽히나요?",
      },
    ],
    sources: [
      { label: "MDN — ARIA", href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" },
      { label: "MDN — ARIA roles", href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles" },
      { label: "MDN — ARIA attributes", href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes" },
      { label: "W3C — Using ARIA", href: "https://www.w3.org/TR/using-aria/" },
      { label: "W3C — WAI-ARIA 1.2", href: "https://www.w3.org/TR/wai-aria-1.2/" },
      { label: "W3C — ARIA in HTML", href: "https://www.w3.org/TR/html-aria/" },
    ],
  },
];
