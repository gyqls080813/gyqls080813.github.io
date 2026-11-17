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
              ["창을 줄여도 작은 파일로 안 바뀐다", "이미 받은 큰 파일을 브라우저가 계속 쓴다", "정상. 더 작은 것을 다시 받지 않는다"],
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
              ["source가 다 실패했는데 대체 문구가 없다", "대체 문구는 미지원 브라우저에서만 보인다", "video의 error 이벤트로 안내를 띄운다"],
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
              ["모든 source가 실패했나", "video의 error", "networkState, error.code"],
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
];
