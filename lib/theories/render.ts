import type { Theory } from "./index";

/**
 * 브라우저 렌더링 — 주소 하나가 픽셀이 되기까지.
 *
 * 공식 문서 목차가 없는 주제라, 브라우저 안에서 물건이 생기는 순서를 장으로 세운다.
 * 노드 하나가 한 장이고, 앞 장이 만든 것이 다음 장의 재료다.
 * '실제로 돌려 보면'은 Chrome 156 에서 로컬 서버(스타일시트를 700ms 늦게 주는)로
 * 돌린 결과다. 숫자는 그 한 번의 측정값이고, 순서와 참·거짓은 매번 같다.
 */

const HTML = "https://html.spec.whatwg.org/multipage";
const CHROME = "https://developer.chrome.com/blog";
const MDN = "https://developer.mozilla.org/en-US/docs/Web";

export const renderTheories: Theory[] = [
  {
    id: "render",
    name: "브라우저 렌더링",
    tagline: "주소 하나가 픽셀이 되기까지, window와 document가 생기는 자리",
    intro:
      "주소창에 주소를 넣고 엔터를 칩니다. 잠시 뒤 글자와 그림이 보입니다. 그 사이에 브라우저는 물건을 여럿 만듭니다. 프로세스를 띄우고, window라는 전역 객체를 만들고, 그 안에 document를 끼우고, HTML 글자를 읽어 DOM 트리를 세우고, CSS를 읽어 규칙 표를 만들고, 둘을 합쳐 상자마다 자리와 크기를 재고, 글자를 글리프로 바꿔 줄을 나누고, 색을 칠하고, 레이어를 합쳐 GPU에 넘깁니다. 그리고 1초에 60번쯤 뒤 절반을 다시 돕니다. 이 노드는 그 순서를 열두 장으로 나눕니다. 장마다 무엇이 생기는지, 실제로 돌려 보면 어떻게 보이는지, 그 자리에서 어떤 사고가 나는지를 적습니다.",
    blocks: [
      {
        label: "렌더링이라는 낱말",
        body: "render는 '그리다, 바꾸어 내놓다'입니다. 브라우저 렌더링은 바이트를 받아 픽셀로 바꾸어 내놓는 일 전체를 가리킵니다. 좁게는 마지막 단계(페인트)만 부르기도 합니다. 이 노드에서는 넓은 뜻으로 씁니다. 네비게이션에서 시작해 화면에 올라가는 프레임까지입니다. 중간에 생기는 물건의 이름을 알면 개발자 도구의 탭 이름이 그대로 읽힙니다. Elements는 DOM, Styles는 CSSOM과 계산된 스타일, Layout은 레이아웃 트리, Layers는 레이어 트리, Performance는 이벤트 루프의 기록입니다.",
        terms: [
          {
            term: "렌더링 (rendering)",
            body: "브라우저가 받은 글자(HTML, CSS, JS)를 화면의 픽셀로 바꾸는 일입니다. 요리로 치면 재료를 받아 접시에 올리기까지 전부입니다. 좁게는 마지막의 색칠(페인트)만을 가리키기도 합니다. 이 노드에서는 넓은 뜻으로 씁니다."},
        ],
      },
      {
        label: "두 객체가 먼저 생긴다: window, 그다음 document",
        body: "직관과 반대로 문서보다 창이 먼저입니다. 탭이 생기면 브라우저는 먼저 자바스크립트가 돌 수 있는 세계(realm)와 그 세계의 전역 객체인 Window를 만듭니다. 그리고 그 Window에 빈 문서(about:blank)를 끼웁니다. 주소로 네비게이션하면 응답이 HTML인지 확인한 뒤 새 Document를 만들고, 보통은 그 Document를 위한 새 Window도 함께 만듭니다. 바깥에서 window라고 부르는 손잡이(WindowProxy)는 그대로이고, 그 안의 Window와 Document가 통째로 바뀝니다. 그래서 head의 첫 스크립트가 돌 때 window는 이미 완성되어 있고(속성 1,269개), document는 비어 있습니다. 실제로 돌려 보면 그 시점에 document.body는 null입니다. 2장과 3장이 이 순서를 다룹니다.",
        code: "탭이 열린다\n  └─ 브라우징 컨텍스트 생성 ── WindowProxy 하나 (바깥에서 보이는 손잡이)\n       └─ realm + Window (전역 객체)  ── Document (about:blank, 빈 문서)\n\n주소로 네비게이션 → 응답 헤더가 HTML 이라고 말한다\n  └─ 새 realm + 새 Window ── 새 Document (readyState: loading)\n       WindowProxy 는 그대로. 안의 짝만 바뀐다\n\nhead 의 첫 <script> 가 도는 순간 (실제로 돌려 보면, t = 17ms)\n  window: 완성. Object.getOwnPropertyNames(window).length = 1269\n  document: 있음. document.body = null  ← 아직 파싱 중",
        codeLang: "text",
      },
      {
        label: "한눈에 보는 파이프라인",
        body: "왼쪽에서 오른쪽으로 물건이 만들어집니다. 앞 장의 결과가 다음 장의 재료입니다. 네비게이션이 렌더러 프로세스를 정하고, 렌더러가 window와 document를 만들고, 파서가 바이트를 DOM으로 바꾸고, 스크립트가 그 사이에 끼어 파서를 멈추고, CSS가 CSSOM이 되어 DOM과 합쳐지고, 레이아웃이 자리와 크기를 재고(글자 폭은 폰트가 정합니다), 페인트가 그릴 명령을 만들고, 컴포지터가 레이어를 합쳐 GPU에 넘깁니다. 10장의 이벤트 루프는 이 그림의 뒤 절반(스타일부터 합성까지)을 프레임마다 다시 돌립니다. 11장은 이 그림이 iframe마다 하나씩 더 있다는 이야기이고, 12장은 Vue 같은 프레임워크가 이 그림의 어디에 올라앉는지입니다.",
        code: "1장 네비게이션 ─▶ 렌더러 프로세스 (메인 스레드 하나)\n                    │\n2장  window + realm │   3장  Document (loading)\n                    ▼\n4장  바이트 ─▶ 토큰 ─▶ DOM 트리 ◀──▶ 5장 <script> (파서를 멈추고, CSS 를 기다린다)\n                    │\n6장  CSS ─▶ CSSOM ──┤─▶ 계산된 스타일 (요소마다 모든 속성의 값)\n                    ▼\n7장  레이아웃 트리 ─▶ 상자의 자리와 크기        8장  글자: 폰트 매칭 → 셰이핑 → 줄바꿈 → 글리프\n                    ▼\n9장  페인트 레코드 ─▶ 레이어 ─▶ 래스터(타일) ─▶ 합성 ─▶ GPU ─▶ 화면\n                    ▲\n10장 이벤트 루프: 태스크 → 마이크로태스크 → (렌더링 기회) rAF → 스타일 → 레이아웃 → 페인트   ×60/초\n11장 iframe 마다 2~9장이 하나씩 더 있다        12장 프레임워크는 10장의 마이크로태스크 문으로 들어온다",
        codeLang: "text",
      },
      {
        label: "단계로 읽는 법",
        body: "노드 하나가 한 장입니다. 장마다 먼저 '무슨 일이 일어나나'를 적습니다. 사양(WHATWG HTML)과 Chrome의 설명을 근거로 삼고, 짧은 인용을 붙입니다. 그다음 '실제로 돌려 보면'이 있습니다. 로컬 서버에 데모 페이지를 띄우고 Chrome 156에서 측정한 값입니다. 그다음 세 겹으로 깨지는 자리를 적습니다. '문제' 블록이 대표 사고 하나를, '문제가 나는 경우'가 경우별 표를(언제 생기고, 어떻게 보이고, 언제 들통나는지), '문제의 구조'가 왜 그 장에서는 피할 수 없는지를 그림으로 적습니다. 끝에 다음 장의 입구와 확인 질문이 있습니다. i18n 노드와 같은 틀이라 두 노드를 나란히 읽을 수 있습니다.",
      },
      {
        label: "열두 장 한눈에",
        body: "각 장이 만드는 물건과, 그 자리에서 나는 대표 사고입니다. 사고의 이름이 곧 그 장의 이름이라고 봐도 됩니다. 어느 사고를 겪었다면 그 장으로 가면 됩니다.",
        code: "장  이름                               만드는 것                      대표 사고\n1  프로세스와 네비게이션                  렌더러 프로세스, 커밋             긴 JS 하나가 탭 전체를 멈춘다\n2  window 의 탄생                        realm, Window, WindowProxy      iframe 참조에 붙인 속성이 사라진다\n3  document 의 탄생과 readyState          Document, 네 시점               head 스크립트에서 document.body 가 null\n4  바이트에서 DOM 까지                    토큰, DOM 트리                  <p><div> 가 빈 p 둘로 갈라진다\n5  스크립트가 파서를 멈추는 자리           실행 순서                       CSS 가 늦으면 스크립트도 늦는다\n6  CSSOM 과 스타일 계산                   CSSOM, 계산된 스타일             특이도 싸움, FOUC\n7  레이아웃                              레이아웃 트리, 상자의 자리·크기    쓰고-읽고 반복이 75배 느리다\n8  글자가 그려지는 길                      글리프, 줄                      keep-all 이 넘친다, 등폭 표가\n                                                                    한글에서 어긋난다\n9  페인트와 합성                          페인트 레코드, 레이어, 타일        top/left 애니메이션이 매 프레임 레이아웃\n10  이벤트 루프와 프레임                    한 프레임                       상태 바꾼 직후 DOM 을 읽으면 옛 값\n11  프레임 안의 프레임                      프레임마다 2~9장                 SecurityError: cross-origin frame\n12  프레임워크가 끼어드는 자리                vdom ↔ DOM 동기화               하이드레이션 불일치",
        codeLang: "text",
      },
      {
        label: "실제로 돌린 페이지",
        body: "열두 장의 측정값은 한 페이지에서 나왔습니다. 로컬 Node 서버가 index.html을 주고, 그 안의 스타일시트 하나를 700ms 늦게 줍니다. 그 뒤에 인라인 스크립트, 파서를 멈추는 스크립트, 잘못 중첩된 태그, 표 안의 날 텍스트, 같은 출처와 다른 출처(localhost와 127.0.0.1)의 iframe 둘, defer·async·module 스크립트가 들어 있습니다. 마지막에 window.__results에 모든 측정을 모아 읽었습니다. 시각은 performance.now() 기준 ms입니다. 브라우저는 Chrome 156, macOS입니다. 각 장의 '실제로 돌려 보면'이 이 표의 어느 줄을 가리키는지 적어 두었습니다.",
        code: "t(ms)   무슨 일                                              누가 적었나\n4       응답 끝 (responseEnd) — 로컬이라 빠르다                  Navigation Timing\n17      head 첫 <script> 실행. readyState=loading, body=null    P0, P1\n17~713  <link rel=stylesheet href=/slow.css?ms=700> 기다림      파서가 멈춰 있다\n713     스타일시트 뒤 인라인 <script> 실행 (696ms 기다렸다)        P6\n713~733 body 파싱. 중간의 <script> 가 다시 파서를 멈춘다           P4\n733     파싱 끝 → readyState=interactive                        readystatechange\n733     async.js 실행 (300ms 에 도착했지만 지금 돈다)             scriptOrder\n733     defer.js → defer2.js → module 실행                      scriptOrder\n734     DOMContentLoaded (body 자식 23개)                       P0\n745     readyState=complete → load                              P0\n764     first-paint, first-contentful-paint, LCP(BODY)          Paint Timing",
        codeLang: "text",
        notes: [
          {
            title: "숫자를 읽을 때",
            body: "ms 값은 이 한 번의 측정값입니다. 다시 돌리면 몇 ms씩 다릅니다. 그러나 순서(loading → 인라인 스크립트가 CSS를 기다림 → interactive → async → defer → DOMContentLoaded → complete → 첫 페인트)와 참·거짓(body가 null인가, 뒤의 요소가 있는가)은 매번 같습니다. 각 장에서 믿어야 할 것은 순서와 참·거짓이고, 숫자는 크기 감각을 주는 보조입니다.",
            bottom: true,
          },
        ],
      },
      {
        label: "열두 장 밖에 있는 것들",
        body: "렌더링과 맞닿아 있지만 이 노드가 다루지 않는 것들입니다. 각각 다른 노드의 자리입니다. 어디서 끊었는지 알아야 '왜 그 얘기가 없지'가 안 생깁니다.",
        code: "주제                       한 줄                                                    어디로\n네트워크 우선순위·캐시       어느 자원을 먼저 받나, HTTP 캐시·CDN 은 무엇을 기억하나          별도 노드 (아직 없음)\n접근성 트리                 DOM 과 나란히 만들어지는 스크린 리더용 트리                       별도 노드 (아직 없음)\n서비스 워커                 네트워크와 페이지 사이에 끼는 프로그램. 오프라인·캐시              별도 노드 (아직 없음)\n보안 정책 (CSP·COOP·COEP)   어떤 스크립트·프레임을 허용하나                                 11장이 교차 출처만 다룬다\n메모리와 GC                 Window 가 사는 동안 쌓이는 것                                  2장이 누수 한 줄만 다룬다\n캔버스·WebGL               페인트 바깥에서 직접 그리는 길                                  9장이 레이어로만 언급\n인쇄·PDF                   또 다른 렌더링 대상                                           다루지 않음\n국제화 (lang, Intl)         글자가 어느 언어인지가 폰트·줄바꿈을 바꾼다                        8장 + i18n 노드",
        codeLang: "text",
      },
    ],
    sources: [
      { label: "WHATWG HTML — Document lifecycle (create and initialize a Document)", href: `${HTML}/document-lifecycle.html#initialise-the-document-object` },
      { label: "WHATWG HTML — Event loop processing model", href: `${HTML}/webappapis.html#event-loop-processing-model` },
      { label: "Chrome — Inside look at modern web browser (part 1~4)", href: `${CHROME}/inside-browser-part1` },
      { label: "MDN — Populating the page: how browsers work", href: `${MDN}/Performance/Guides/How_browsers_work` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s1",
    name: "1장 · 프로세스와 네비게이션: 주소가 렌더러에 닿기까지",
    tagline: "브라우저 프로세스가 받고, 렌더러 프로세스가 그린다. 그 사이는 메시지다",
    intro:
      "주소창에 글자를 치는 순간부터 봅니다. 그 글자를 받는 것은 페이지가 아니라 브라우저 프로세스입니다. 네트워크 스레드가 응답을 받고, 헤더를 보고 이것이 HTML인지 다운로드할 파일인지 가립니다. HTML이면 렌더러 프로세스를 하나 골라(또는 띄워) 네비게이션을 '커밋'합니다. 그때부터 그 탭의 모든 일은 렌더러 프로세스의 메인 스레드 하나에서 일어납니다. 자바스크립트, 파싱, 스타일, 레이아웃, 페인트 명령 만들기까지입니다. 이 장의 질문은 둘입니다. 왜 프로세스를 나누는가. 그리고 왜 한 스레드가 거의 전부를 하는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 주소 → 네트워크 → 렌더러 → 커밋",
        body: "Chrome은 프로세스를 역할로 나눕니다. 브라우저 프로세스는 주소창·탭·뒤로 가기 같은 '크롬 부분'을 맡습니다. 네트워크 요청과 저장소도 여기 스레드들이 합니다. 렌더러 프로세스는 '탭 안에 보이는 모든 것'을 맡습니다. GPU 프로세스는 그리기를 다른 프로세스와 떨어진 곳에서 합니다. 네비게이션은 이렇게 흐릅니다. UI 스레드가 입력이 검색어인지 URL인지 가립니다. 네트워크 스레드가 요청을 보내고 응답 헤더를 읽습니다. Content-Type이 HTML이면 렌더러로 보내고, zip 같은 파일이면 다운로드로 돌립니다. UI 스레드는 응답을 기다리는 동안 렌더러 프로세스를 미리 찾거나 띄워 둡니다. 데이터가 준비되면 브라우저 프로세스가 렌더러에 IPC로 '커밋'을 보냅니다. 그 순간부터 데이터 스트림이 렌더러로 흐르고 파싱이 시작됩니다. 모든 프레임의 onload가 끝나면 UI 스레드가 로딩 표시를 멈춥니다.",
        code: "브라우저 프로세스                                 렌더러 프로세스 (사이트마다 하나)\n├─ UI 스레드     주소창, 탭, 입력 판단                ├─ 메인 스레드   JS · 파싱 · 스타일 · 레이아웃 · 페인트 레코드\n├─ 네트워크 스레드  요청, 응답 헤더 읽기, 스니핑         ├─ 컴포지터 스레드  레이어 합성, 스크롤 (메인 스레드 없이)\n└─ 저장소 스레드   쿠키, 캐시                          ├─ 래스터 스레드들  타일을 비트맵으로\n                                                     └─ 워커 스레드들   Web Worker\nGPU 프로세스      화면에 올리기\n\n네비게이션\n① UI 스레드: \"이건 URL 이다\"   ② 네트워크 스레드: 요청 → 응답 헤더 → Content-Type 이 text/html 인가\n③ UI 스레드: 응답을 기다리는 동안 렌더러 프로세스를 미리 띄운다   ④ 커밋: 브라우저 → 렌더러 IPC\n⑤ 렌더러: 데이터 스트림을 받아 파싱 시작 (2·3·4장)   ⑥ 모든 프레임 onload → 로딩 표시 끝",
        codeLang: "text",
        terms: [
          {
            term: "프로세스 (process)와 스레드 (thread)",
            body: "프로세스는 운영체제가 메모리를 따로 떼어 준 실행 단위입니다. 서로의 메모리를 못 봅니다. 스레드는 한 프로세스 안에서 같은 메모리를 보며 나란히 도는 실행 줄기입니다. Chrome은 탭(정확히는 사이트)마다 프로세스를 따로 둬서 하나가 죽어도 다른 탭이 멀쩡합니다. 한 프로세스 안에서는 스레드로 일을 나눕니다.",
          },
          {
            term: "IPC (inter-process communication)와 커밋 (commit)",
            body: "IPC는 프로세스 사이에 메시지를 보내는 길입니다. 메모리를 공유하지 않으니 메시지로만 말합니다. 커밋은 브라우저 프로세스가 렌더러 프로세스에 '이 네비게이션을 네가 맡아라'라고 보내는 메시지입니다. 이 메시지 뒤로 주소창의 주소가 바뀌고 세션 이력에 항목이 생깁니다.",
          },
          {
            term: "사이트 격리 (site isolation)",
            body: "다른 사이트의 내용은 다른 렌더러 프로세스에 두는 정책입니다. 교차 사이트 iframe도 따로 프로세스를 받습니다. 한 사이트의 스크립트가 다른 사이트의 메모리를 읽을 길을 막습니다. 대신 프레임 사이의 모든 통신이 메시지(비동기)가 됩니다. 11장에서 다시 봅니다.",
          },
        ],
      },
      {
        label: "메인 스레드 하나가 거의 전부를 한다",
        body: "렌더러 프로세스 안에서 자바스크립트 실행, HTML 파싱, 스타일 계산, 레이아웃, 페인트 명령 만들기는 전부 메인 스레드 하나가 합니다. DOM이라는 자료 구조를 여러 스레드가 동시에 건드리면 깨지기 때문입니다. 그래서 자바스크립트가 돌고 있는 동안은 파싱도, 레이아웃도, 페인트도 멈춥니다. 반대로 레이아웃이 오래 걸리면 자바스크립트가 기다립니다. 메인 스레드 밖에 있는 것은 셋입니다. 컴포지터 스레드(레이어를 합쳐 프레임을 만들고, 스크롤을 처리합니다), 래스터 스레드들(타일을 비트맵으로 바꿉니다), 워커(개발자가 명시적으로 띄운 스레드)입니다. Chrome의 설명을 빌리면 컴포지터 스레드는 '스타일 계산이나 자바스크립트 실행을 기다릴 필요가 없다'고 합니다. 이 분리가 9장의 핵심입니다.",
        code: "메인 스레드의 시간 (한 줄로 이어진다)\n│ JS 실행 │ 파싱 │ 스타일 │ 레이아웃 │ 페인트 레코드 │ JS 실행 │ 파싱 │ ...\n└─ 어느 하나가 길면 나머지가 전부 기다린다. 클릭 핸들러도 여기 줄을 선다\n\n메인 스레드 밖\n컴포지터 스레드:  이미 만들어진 레이어를 합쳐 프레임을 낸다. 스크롤·transform·opacity 애니메이션\n래스터 스레드:   타일 → 비트맵 (GPU 메모리)\n워커:           postMessage 로만 메인과 말한다. DOM 을 만질 수 없다",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "로컬 서버라 네트워크는 거의 0입니다. 응답 끝(responseEnd)이 4ms입니다. 그런데 파싱이 끝나는 domInteractive는 733ms입니다. 그 사이 700ms 가까이를 메인 스레드가 스타일시트 하나를 기다리며 멈춰 있었습니다(5장). 네트워크가 빨라도 메인 스레드가 기다리면 화면은 늦습니다. 첫 페인트는 764ms입니다. 그리고 창이 다른 창 뒤에 가려진 상태에서 requestAnimationFrame을 3초 동안 돌렸을 때 4번만 불렸습니다. 보이지 않는 탭의 렌더러는 그리기 자체를 거의 멈춥니다. 1장에서 알 것은 이것입니다. 탭 하나의 모든 일이 한 줄에 서 있고, 그 줄은 보이지 않을 때 느려집니다.",
        code: "Navigation Timing (ms)          Paint Timing (ms)\nresponseEnd                 4    first-paint               764\ndomInteractive            733    first-contentful-paint    764\ndomContentLoadedEventStart 733    largest-contentful-paint  764 (BODY)\ndomComplete               744\nloadEventEnd              780\n\n창이 가려진 상태: requestAnimationFrame 3초 동안 4번  (document.visibilityState 는 'visible' 이었다)",
        codeLang: "text",
      },
      {
        label: "문제: 긴 자바스크립트 하나가 탭 전체를 멈춘다",
        body: "큰 배열을 정렬하는 함수가 300ms 돕니다. 그동안 사용자가 버튼을 누릅니다. 클릭 이벤트는 메인 스레드 큐에 들어가 정렬이 끝나기를 기다립니다. 입력창에 글자를 쳐도 300ms 뒤에 한꺼번에 나타납니다. 스크롤은 컴포지터 스레드가 하니 움직이지만, 스크롤 핸들러가 있으면 그것도 기다립니다. 애니메이션은 프레임을 놓칩니다. 이것이 '탭이 멈췄다'의 정체입니다. 네트워크가 느린 것도, 서버가 느린 것도 아닙니다. 한 스레드의 줄이 밀린 것입니다.",
      },
      {
        label: "문제가 나는 경우: 한 줄에 선 것들과 경계를 넘는 것들",
        body: "경우 ㄱ, 긴 태스크입니다. 50ms를 넘는 자바스크립트가 돌면 그동안 입력이 반응하지 않습니다. 경우 ㄴ, 메모리 폭주입니다. 한 탭이 메모리를 다 쓰면 그 사이트의 렌더러 프로세스만 죽습니다. 다른 탭은 멀쩡합니다. 사이트 격리의 대가가 아니라 혜택입니다. 경우 ㄷ, 교차 출처 iframe입니다. 다른 사이트의 프레임은 다른 프로세스에 있어서 부모와 메모리를 공유하지 않습니다. 동기로 읽을 수 없고 postMessage로만 말합니다. 경우 ㄹ, Content-Type 오판입니다. 서버가 HTML을 application/octet-stream으로 보내면 네트워크 스레드는 다운로드로 돌립니다. 페이지가 열리지 않고 파일이 내려옵니다. 경우 ㅁ, 가려진 탭입니다. 보이지 않는 탭에서는 타이머가 1초 단위로 묶이고 requestAnimationFrame은 멈춥니다. 실제로 돌려 보면 가려진 창에서 3초에 4번이었습니다. 시간을 재는 로직이 멈춘 것처럼 보입니다. 경우 ㅂ, beforeunload입니다. 떠나는 페이지의 beforeunload 핸들러가 오래 걸리면 새 페이지의 커밋이 그만큼 늦습니다.",
        code: "경우              언제 생기나                          겉모습                               들통나는 때\nㄱ 긴 태스크        JS 가 50ms 넘게 돈다                   클릭·타이핑이 뒤늦게 한꺼번에            느린 기기에서\nㄴ 메모리 폭주      한 탭이 메모리를 다 쓴다                그 사이트 탭만 죽는다 (Aw, Snap)         대량 데이터 화면에서\nㄷ 교차 출처 프레임  다른 사이트 iframe                    동기 접근 불가, postMessage 만           프레임과 말하려 할 때\nㄹ Content-Type    HTML 을 octet-stream 으로 보냄          페이지 대신 파일이 내려온다               배포 직후\nㅁ 가려진 탭        탭이 보이지 않는다                      타이머 1초 묶음, rAF 멈춤 (3초에 4번)     탭을 돌아왔을 때\nㅂ beforeunload    떠나는 페이지의 핸들러가 길다             새 페이지가 늦게 뜬다                    페이지 이동 때",
        codeLang: "text",
        terms: [
          {
            term: "긴 태스크 (long task)",
            body: "메인 스레드를 50ms 넘게 붙잡는 일 하나입니다. 50ms는 사람이 '즉시'로 느끼는 100ms 안에 입력 처리까지 끝내려는 기준에서 나왔습니다. 개발자 도구 Performance 탭에서 빨간 모서리로 표시됩니다. 10장에서 프레임 예산과 함께 다시 봅니다.",
          },
        ],
      },
      {
        label: "문제의 구조: 상태가 한 스레드에 묶여 있고, 경계는 메시지로만 넘는다",
        body: "DOM은 한 스레드에서만 만집니다. 그래서 그 스레드의 시간은 페이지의 모든 일이 나눠 쓰는 하나의 자원입니다. 자바스크립트, 파싱, 레이아웃, 이벤트 처리가 그 자원을 두고 줄을 섭니다. 누가 오래 쓰면 나머지가 밀립니다(ㄱ). 이것은 버그가 아니라 설계입니다. 동시에 만지면 깨지는 것을 한 줄로 세운 것입니다. 프로세스 경계는 다른 종류의 선입니다. 보안 경계입니다. 다른 사이트의 메모리를 읽을 수 없게 하려고 프로세스를 나눴고, 그래서 그 선을 넘는 모든 일은 메시지가 됩니다(ㄷ). 메시지는 비동기입니다. 두 선을 알면 성능 문제의 반이 읽힙니다. 느린 것은 대개 '한 줄에 선 것 중 하나가 길다'이고, 안 되는 것은 대개 '경계를 동기로 넘으려 했다'입니다.",
        code: "선 하나: 스레드 (시간의 공유)                   선 둘: 프로세스 (메모리의 격리)\n┌─ 메인 스레드 ─────────────────────┐          ┌─ 렌더러 A (shop.example) ─┐   ┌─ 렌더러 B (ads.example) ─┐\n│ JS │ 파싱 │ 스타일 │ 레이아웃 │ 페인트 │          │  window, document, DOM    │   │  iframe 의 window, DOM   │\n└──────────────────────────────────┘          └───────────┬───────────────┘   └───────────┬──────────────┘\n  누가 길면 나머지가 밀린다 (ㄱ)                            └──── postMessage (비동기) ────┘   동기 접근 불가 (ㄷ)",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "커밋을 받은 렌더러가 가장 먼저 만드는 것은 문서가 아닙니다. 문서를 담을 전역 세계, window입니다. 사양은 탭(브라우징 컨텍스트)이 생기는 순간 Window를 만들고, 네비게이션으로 새 문서가 올 때마다 보통 새 Window를 또 만든다고 적습니다. 그런데 자바스크립트에서 window를 가리키는 손잡이는 바뀌지 않습니다. 그 둘이 어떻게 다른지가 다음 장입니다.",
      },
      {
        label: "확인 질문",
        body: "로컬 서버라 응답은 4ms에 끝났는데 첫 페인트는 764ms였습니다. 그 760ms 동안 네트워크 스레드와 메인 스레드는 각각 무엇을 하고 있었을까요?",
        notes: [
          {
            title: "답",
            body: "네트워크 스레드는 거의 놀았습니다. HTML은 4ms에 다 왔고, 뒤의 스타일시트 요청은 서버가 700ms 뒤에 답했으니 기다리기만 했습니다. 메인 스레드는 17ms에 head의 첫 스크립트를 돌린 뒤 스타일시트 뒤의 인라인 스크립트에서 멈췄습니다. 스크립트는 자기 앞의 스타일시트가 끝나야 돌 수 있고(5장), 파서는 그 스크립트가 끝나야 다음 줄을 읽습니다. 그래서 713ms까지 파싱이 멈춰 있었습니다. 그 뒤 20ms 만에 body를 다 읽고, 스타일·레이아웃·페인트를 거쳐 764ms에 첫 픽셀이 나왔습니다. 느린 것은 망이 아니라 한 스레드의 대기였습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Chrome — Inside look at modern web browser, part 1 (프로세스)", href: `${CHROME}/inside-browser-part1` },
      { label: "Chrome — Inside look at modern web browser, part 2 (네비게이션)", href: `${CHROME}/inside-browser-part2` },
      { label: "MDN — PerformanceNavigationTiming", href: `${MDN}/API/PerformanceNavigationTiming` },
      { label: "MDN — Page Visibility API (가려진 탭의 스로틀링)", href: `${MDN}/API/Page_Visibility_API` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s2",
    name: "2장 · window의 탄생: 브라우징 컨텍스트, realm, WindowProxy",
    tagline: "자바스크립트가 살 세계가 먼저 생기고, 문서는 그 세계에 끼워진다",
    intro:
      "window는 '브라우저 창'이 아닙니다. 자바스크립트의 전역 객체이자, 그 코드가 사는 세계(realm)의 중심입니다. 사양은 탭이 생기는 순간 새 realm을 만들고 그 전역 객체로 Window를 만든다고 적습니다. 주소로 네비게이션해 새 문서가 오면 보통 또 새 Window를 만듭니다. 그런데 우리가 코드에서 window라고 쓰는 것은 그 Window가 아니라 WindowProxy라는 손잡이입니다. 손잡이는 탭이 사는 동안 하나이고, 안의 Window는 문서마다 바뀝니다. 이 장의 질문은 셋입니다. window 안에는 무엇이 있나. var와 let은 왜 다르게 붙나. iframe에서 받아 둔 window 참조는 네비게이션 뒤에 무엇을 가리키나.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 브라우징 컨텍스트 → realm → Window → Document",
        body: "탭 하나가 브라우징 컨텍스트입니다. 사양의 '브라우징 컨텍스트 만들기' 알고리즘은 이렇게 적습니다. 전역 객체로는 '새 Window 객체를 만들고', 전역 this로는 '브라우징 컨텍스트의 WindowProxy 객체를 쓴다'. 그리고 같은 알고리즘 안에서 about:blank인 초기 Document를 만듭니다. 그다음 주소로 네비게이션합니다. 응답이 오면 '문서 만들고 초기화하기' 알고리즘이 돕니다. 7단계에서 '새 realm을 만들고, 전역 객체로 새 Window 객체를 만든다'. 10단계에서 그 Window의 문서를 새 Document로 둡니다. 예외가 하나 있습니다. 현재 문서가 초기 about:blank이고 출처가 같으면 6단계에서 기존 Window를 다시 씁니다. 사양의 말로는 '그 경우 초기 about:blank 페이지의 Window 객체가 재사용되어 새 Document 객체를 받는다'. WindowProxy는 이 모든 동안 하나입니다. 사양은 '각 브라우징 컨텍스트에는 WindowProxy 객체가 하나 있다'고 하고, 네비게이션 때 '그 WindowProxy가 감싸는 Window 객체가 바뀐다'고 적습니다.",
        code: "브라우징 컨텍스트 (탭, 또는 iframe 하나)\n  │ 1:1\n  ▼\nWindowProxy ──[[Window]] 슬롯──▶ Window ◀──1:1──▶ Document\n(바깥에서 window 라고 부르는 손잡이)   (realm 의 전역 객체)       (readyState 를 가진 문서)\n\n시간순\n① 탭 생성:         WindowProxy ─▶ Window₀ ─ Document₀ (about:blank)\n② 네비게이션 커밋:   WindowProxy ─▶ Window₁ ─ Document₁ (/index.html)      ← Window 도 Document 도 새것\n③ 다시 네비게이션:   WindowProxy ─▶ Window₂ ─ Document₂ (/next)\n\n예외: ①의 about:blank 가 아직 그대로이고 같은 출처면, ②에서 Window₀ 를 재사용하고 Document 만 바꾼다",
        codeLang: "text",
        terms: [
          {
            term: "브라우징 컨텍스트 (browsing context)",
            body: "문서가 사용자에게 보이는 자리 하나입니다. 탭 하나, iframe 하나가 각각 브라우징 컨텍스트입니다. 사양은 이것을 WindowProxy와 1:1로 짝지어 둡니다. 창이 아니라 '자리'라고 생각하면 iframe도 같은 것이라는 점이 자연스럽습니다.",
          },
          {
            term: "realm (렘)",
            body: "자바스크립트 코드가 사는 세계 하나입니다. 그 세계의 Object, Array, Promise 같은 내장 객체 한 벌과 전역 객체가 들어 있습니다. 탭마다, iframe마다 realm이 따로입니다. 그래서 iframe의 Array와 부모의 Array는 다른 함수입니다. 11장에서 그 결과(instanceof 실패)를 봅니다.",
          },
          {
            term: "WindowProxy",
            body: "코드가 window라고 부를 때 실제로 받는 객체입니다. 안에 진짜 Window를 담아 두고 모든 접근을 그 Window로 넘깁니다. 네비게이션으로 Window가 바뀌어도 WindowProxy는 같은 객체라 iframe.contentWindow 같은 참조가 끊어지지 않습니다. 대신 참조는 그대로인데 안의 내용이 바뀌는 일이 생깁니다.",
          },
        ],
      },
      {
        label: "window 안에는 무엇이 있나",
        body: "네 종류가 섞여 있습니다. 첫째, realm의 내장 객체입니다. Object, Array, Promise, JSON, Math 같은 자바스크립트 언어의 것입니다. 둘째, 웹 API입니다. document, location, navigator, history, setTimeout, fetch, requestAnimationFrame처럼 브라우저가 붙인 것입니다. 셋째, 개발자의 전역 변수입니다. 스크립트 최상위의 var와 function 선언이 window의 속성이 됩니다. let, const, class는 되지 않습니다. 넷째, 이름 접근(named access)입니다. id가 있는 요소를 window.id로 꺼낼 수 있습니다. 실제로 돌려 보면 head의 첫 스크립트 시점에 window의 자체 속성은 1,269개였습니다. window === globalThis === self이고, window.window === window입니다. 프로토타입 사슬은 Window → EventTarget → Object입니다. var로 선언한 변수는 window에 붙고 delete가 안 됩니다(false). let으로 선언한 것은 'declaredLet' in window가 false입니다. 스크립트 안에서는 보이지만 window에는 없습니다. id='hero'인 요소는 window.hero로 나오지만 Object.getOwnPropertyNames(window)에는 없습니다. 자체 속성이 아니라 특별한 찾기 규칙입니다.",
        code: "// head 의 첫 <script> 에서 (실제로 돌려 보면)\nwindow === globalThis            // true\nwindow === self                  // true\nwindow.window === window         // true\ndocument.defaultView === window  // true\nObject.getOwnPropertyNames(window).length   // 1269  (페이지 끝에서는 1272)\nObject.prototype.toString.call(window)      // \"[object Window]\"\n// 프로토타입 사슬: Window → EventTarget → EventTarget(prototype) → Object\n\nvar declaredVar = 1; let declaredLet = 2; const declaredConst = 3; function declaredFn() {}\nwindow.declaredVar          // 1\nwindow.declaredLet          // undefined   ← let 은 window 에 붙지 않는다\nwindow.declaredConst        // undefined\ntypeof declaredLet          // 'number'    ← 스크립트 전역 스코프에서는 보인다\n'declaredLet' in window     // false\ndelete window.declaredVar   // false       ← var 로 만든 속성은 지울 수 없다\n\n// <h1 id=\"hero\"> 가 있을 때\nwindow.hero instanceof HTMLElement                         // true\nwindow.hero === document.getElementById('hero')            // true\nObject.getOwnPropertyNames(window).includes('hero')        // false  ← 자체 속성이 아니다",
        terms: [
          {
            term: "전역 객체 (global object)와 전역 렉시컬 스코프",
            body: "전역에는 층이 둘 있습니다. 전역 객체(Window)에는 var와 function 선언, 웹 API가 속성으로 붙습니다. 전역 렉시컬 스코프에는 let·const·class 선언이 들어갑니다. 둘째 층의 것은 코드 어디서나 이름으로 부를 수 있지만 window.이름으로는 안 나옵니다. ES2015가 let을 넣으면서 이렇게 갈라 놓았습니다.",
          },
          {
            term: "이름 접근 (named access on the Window object)",
            body: "id나 name이 있는 요소를 window.그이름으로 꺼내는 옛 규칙입니다. window의 자체 속성이 아니라 못 찾을 때 마지막으로 문서를 뒤지는 규칙입니다. 그래서 같은 이름의 전역 변수가 있으면 변수가 이깁니다. 편리하지만 id 하나를 바꾸면 전역 이름이 사라지는 셈이라 코드에서는 쓰지 않는 것이 보통입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "두 가지를 더 확인했습니다. 하나는 iframe입니다. iframe.contentWindow를 변수 w에 받아 두고 w.markerSetBeforeNavigation = '있었다'로 속성을 붙였습니다. 그리고 그 iframe을 다른 페이지로 네비게이션했습니다. load 뒤에 iframe.contentWindow === w는 true였습니다. 같은 WindowProxy입니다. 그런데 w.markerSetBeforeNavigation은 undefined였습니다. 안의 Window가 새것이라 전에 붙인 속성이 없습니다. w.document도 다른 객체이고 title이 'frame B'로 바뀌었습니다. 옛 document의 defaultView는 null이었습니다. 사양대로입니다. '이 문서의 브라우징 컨텍스트가 null이면 null을 돌려준다'. 다른 하나는 realm입니다. iframe의 Array는 부모의 Array와 다른 함수입니다(w.Array !== Array가 true). 그래서 [] instanceof w.Array는 false입니다. Array.isArray는 realm을 넘어 true를 줍니다.",
        code: "// iframe 참조를 받아 두고 네비게이션한다\nconst w = iframe.contentWindow;\nw.markerSetBeforeNavigation = '있었다';\nconst oldDoc = w.document;\nw.location.href = '/frame-b.html';\n// ... load 뒤\niframe.contentWindow === w          // true        ← WindowProxy 는 그대로\nw.markerSetBeforeNavigation         // undefined   ← 안의 Window 가 바뀌어 속성이 없다\nw.document !== oldDoc               // true\nw.document.title                    // 'frame B'\noldDoc.defaultView                  // null        ← 버려진 문서의 window 는 null\n\n// realm\nw.Array !== Array                   // true\n[] instanceof w.Array               // false\nArray.isArray(new w.Array())        // true        ← realm 을 넘어 본다",
      },
      {
        label: "문제: iframe 참조에 붙여 둔 것이 사라진다",
        body: "결제 위젯을 iframe으로 띄우고, 부모가 iframe.contentWindow.config = {...}로 설정을 넘겼습니다. 위젯이 내부에서 다음 단계로 네비게이션합니다. 부모는 같은 contentWindow 참조를 들고 있으니 설정도 그대로라고 믿습니다. 그런데 안의 Window가 새것이어서 config는 undefined입니다. 참조는 살아 있고 비교하면 같다고 나오는데, 안이 비어 있습니다. 참조가 끊어지는 것보다 찾기 어려운 사고입니다.",
      },
      {
        label: "문제가 나는 경우: 전역이 겹치는 자리",
        body: "경우 ㄱ, 이름 충돌입니다. 스크립트 최상위의 var name = 5는 window.name의 setter를 부릅니다. window.name은 문자열이라 '5'가 됩니다. var status, var top, var parent도 같은 자리를 밟습니다. 두 라이브러리가 같은 전역 이름을 쓰면 뒤가 앞을 덮습니다. 경우 ㄴ, let을 window로 읽습니다. 설정 파일을 let config = {...}로 두고 다른 스크립트에서 window.config를 읽으면 undefined입니다. 실제로 돌려 보면 'declaredLet' in window가 false였습니다. 경우 ㄷ, iframe 참조에 붙인 속성입니다. 위의 사고입니다. 경우 ㄹ, realm을 넘는 instanceof입니다. iframe에서 받은 배열은 부모의 Array로 instanceof하면 false입니다. 실제로 돌려 보면 [] instanceof w.Array가 false였습니다. 경우 ㅁ, 전역에 매달린 참조로 생기는 누수입니다. window.cache = new Map()에 넣은 것은 Window가 살아 있는 동안 풀리지 않습니다. SPA에서는 라우트가 바뀌어도 Window가 그대로라 끝까지 쌓입니다. 전체 네비게이션은 Window를 새로 만들어 저절로 비웁니다. 경우 ㅂ, 최상위 this입니다. 고전 스크립트의 최상위 this는 window이고 모듈 스크립트의 최상위 this는 undefined입니다. 옛 코드를 type=module로 바꾸면 this.something이 깨집니다.",
        code: "경우          언제 생기나                          겉모습                            들통나는 때\nㄱ 이름 충돌    var name = 5;  두 라이브러리가 같은 전역   window.name 이 '5' (문자열)        다른 코드가 그 이름을 읽을 때\nㄴ let 을 window 로  let config = {}; 다른 파일에서 window.config  undefined                        두\n                                                              파일을 합친 뒤\nㄷ 프레임 참조 속성  contentWindow.config = … 뒤 프레임이 이동    참조는 같은데 속성이 없다          프레임이 다음 단계로\n                                                          간 뒤\nㄹ realm instanceof  프레임에서 온 배열을 instanceof Array      false                            프레임\n                                                          데이터를 검사할 때\nㅁ 전역 누수    window.cache 에 계속 넣는다                메모리가 줄지 않는다 (SPA)         오래 켜 둔 탭에서\nㅂ 최상위 this  고전 → module 로 바꿈                      this 가 undefined                옛 스크립트를\n                                                      모듈로 옮길 때",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 전역이라 부르는 것이 세 겹이다",
        body: "코드에서 '전역'이라고 하면 세 가지가 섞여 있습니다. 첫째, realm의 전역 객체 Window입니다. var·function·웹 API가 붙는 곳입니다. 둘째, 전역 렉시컬 스코프입니다. let·const·class가 사는 곳이고 window의 속성이 아닙니다(ㄴ). 셋째, WindowProxy입니다. 바깥에서 보이는 손잡이이고, 네비게이션마다 안의 Window가 바뀝니다(ㄷ). 여기에 realm마다 내장 객체가 따로 있다는 사실이 겹칩니다(ㄹ). 세 겹을 하나로 생각하면 ㄴ·ㄷ·ㄹ이 납니다. 또 Window는 문서와 수명을 같이하지만 SPA는 문서를 바꾸지 않으니 Window가 오래 삽니다(ㅁ). 처방은 간단합니다. 모듈로 쓰고(전역에 아무것도 붙이지 않음), 프레임과는 postMessage로 말하고(참조에 속성을 붙이지 않음), 검사는 Array.isArray처럼 realm을 넘는 것으로 합니다.",
        code: "'전역' 의 세 겹\n┌─ WindowProxy (손잡이) ─────────────────────────────┐   네비게이션마다 안이 바뀐다           → ㄷ\n│  ┌─ Window (realm 의 전역 객체) ─────────────────┐ │   var · function · 웹 API 가 붙는다    → ㄱ ㅁ\n│  │  Object  Array  Promise …  (realm 마다 따로)    │ │   프레임의 Array ≠ 부모의 Array        → ㄹ\n│  │  document  location  setTimeout …              │ │\n│  │  declaredVar  declaredFn                       │ │\n│  └───────────────────────────────────────────────┘ │\n│  전역 렉시컬 스코프:  declaredLet  declaredConst     │   window 의 속성이 아니다              → ㄴ\n└───────────────────────────────────────────────────┘\n\n처방:  모듈로 쓴다 (전역에 안 붙임) · 프레임과는 postMessage · 검사는 Array.isArray 처럼 realm 을 넘는 것으로",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "Window가 생기면 그 짝으로 Document가 만들어집니다. 사양의 '문서 만들고 초기화하기'는 Document에 URL, 출처, 브라우징 컨텍스트, 그리고 readyState의 첫 값 'loading'을 줍니다. 그 뒤 파서가 이 빈 문서를 채우기 시작합니다. 문서가 '만들어진다'는 것과 '다 채워진다'는 것은 다른 시점입니다. 그 시점들이 다음 장입니다.",
      },
      {
        label: "확인 질문",
        body: "같은 탭에서 사용자가 링크를 눌러 다른 페이지로 갔습니다. 이때 바뀌는 것과 바뀌지 않는 것을 WindowProxy, Window, Document, realm 넷으로 나눠 말해 봅시다. 그리고 SPA의 라우터가 화면을 바꿀 때는 넷 중 무엇이 바뀔까요?",
        notes: [
          {
            title: "답",
            body: "링크로 이동하면 WindowProxy만 그대로입니다. 새 realm이 만들어지고, 그 전역 객체로 새 Window가 생기고, 새 Document가 그 Window에 끼워집니다. 전역 변수, 타이머, 이벤트 리스너가 전부 사라지는 이유입니다. SPA 라우터는 history.pushState로 주소만 바꾸고 문서는 그대로 둡니다. 넷 중 아무것도 바뀌지 않습니다. 그래서 상태가 이어지는 대신, 전역에 쌓은 것이 저절로 비워지는 일도 없습니다(경우 ㅁ).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "WHATWG HTML — Creating browsing contexts", href: `${HTML}/document-sequences.html#creating-browsing-contexts` },
      { label: "WHATWG HTML — Create and initialize a Document object", href: `${HTML}/document-lifecycle.html#initialise-the-document-object` },
      { label: "WHATWG HTML — The WindowProxy exotic object", href: `${HTML}/nav-history-apis.html#the-windowproxy-exotic-object` },
      { label: "WHATWG HTML — The Window object", href: `${HTML}/nav-history-apis.html#the-window-object` },
      { label: "MDN — Window", href: `${MDN}/API/Window` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s3",
    name: "3장 · document의 탄생과 readyState",
    tagline: "문서는 완성된 물건이 아니라 채워지는 그릇이다. 시점이 넷이다",
    intro:
      "응답이 HTML이라고 판명되면 사양의 '문서 만들고 초기화하기'가 돕니다. 새 Document에 URL, 출처, 브라우징 컨텍스트, 콘텐츠 타입, 그리고 readyState의 첫 값인 loading을 줍니다. 그 문서는 비어 있습니다. 파서가 바이트를 읽어 채우기 시작합니다. 파싱이 끝나면 interactive, defer 스크립트가 다 돌면 DOMContentLoaded, 이미지까지 다 오면 complete와 load입니다. 코드는 자기가 이 넷 중 어느 시점에 돌고 있는지 알아야 합니다. 모르면 document.body가 null이거나 getElementById가 null입니다. 이 장의 질문은 하나입니다. 문서가 '있다'는 것과 '다 있다'는 것의 차이는 어디서 나는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: Document 가 받는 것들",
        body: "사양의 알고리즘 9단계가 새 Document를 만들며 값을 채웁니다. type(html인지 xml인지), content type, 출처(navigationParams의 출처), 브라우징 컨텍스트, 정책 컨테이너(CSP 등), 권한 정책, 샌드박스 플래그, 교차 출처 오프너 정책, 로드 타이밍 정보, URL(creationURL), 현재 문서 준비 상태 'loading', about 기준 URL, 커스텀 엘리먼트 레지스트리입니다. 10단계에서 Window의 문서를 이 Document로 둡니다. 이때부터 window.document와 document.defaultView가 서로를 가리킵니다. 문서의 글자 인코딩도 이 즈음 정해집니다. BOM, Content-Type 헤더의 charset, 그리고 처음 1024바이트 안의 meta charset 순서입니다. 실제로 돌려 보면 document.characterSet은 UTF-8, document.URL은 http://localhost:4321/, document.compatMode는 CSS1Compat(doctype이 있어 표준 모드)이었습니다.",
        code: "응답 헤더: Content-Type: text/html; charset=utf-8\n       │\n       ▼\n새 Document\n  type: 'html'            content type: 'text/html'      origin: http://localhost:4321\n  browsing context: 이 탭   URL: http://localhost:4321/     readyState: 'loading'\n  policy container (CSP)   permissions policy             sandboxing flags\n  load timing info         custom element registry (새것)\n       │\n       ▼\nWindow 의 associated Document ← 이것     window.document === document,  document.defaultView === window\n       │\n       ▼\n파서가 바이트를 읽어 채우기 시작한다 (4장)\n\n// 실제로 돌려 보면\ndocument.characterSet   // 'UTF-8'\ndocument.compatMode     // 'CSS1Compat'  (doctype 있음)  ·  doctype 없는 frame A 는 'BackCompat'\ndocument.URL            // 'http://localhost:4321/'",
        codeLang: "text",
        terms: [
          {
            term: "출처 (origin)",
            body: "스킴, 호스트, 포트 셋을 합친 것입니다. http://localhost:4321과 http://127.0.0.1:4321은 호스트가 달라 다른 출처입니다. 문서가 만들어질 때 정해지고 바뀌지 않습니다. 같은 출처의 문서끼리만 서로의 DOM을 만질 수 있습니다. 11장의 SecurityError가 이 선입니다.",
          },
          {
            term: "호환 모드 (compatMode: CSS1Compat / BackCompat)",
            body: "문서 첫 줄의 doctype을 보고 파서가 정하는 렌더링 규칙입니다. <!doctype html>이 있으면 표준 모드(CSS1Compat)입니다. 없으면 쿼크 모드(BackCompat)로, 1990년대 브라우저의 버그를 흉내 냅니다. 표 안의 글꼴 상속, 박스 크기 계산, 인라인 이미지 밑의 틈이 달라집니다. 문서가 만들어진 뒤에는 바꿀 수 없습니다.",
          },
        ],
      },
      {
        label: "네 시점: loading → interactive → DOMContentLoaded → complete",
        body: "사양의 '끝(the end)' 절이 순서를 정합니다. 파서가 입력을 다 읽으면 4단계에서 readyState를 interactive로 바꿉니다. 7단계에서 '지연된 스크립트를 실행한다'. defer 스크립트와 모듈 스크립트가 적힌 순서대로 돕니다. 8단계에서 태스크를 하나 넣어 Document에 DOMContentLoaded 이벤트를 보냅니다. 9단계에서 async 스크립트가 다 돌 때까지 이벤트 루프를 돌립니다. 10단계에서 '문서의 load 이벤트를 늦추는 것이 없을 때까지' 기다립니다. 이미지, 스타일시트, iframe입니다. 11단계에서 readyState를 complete로 바꾸고 window에 load 이벤트를 보냅니다. 코드에서는 document.readyState를 읽거나 readystatechange, DOMContentLoaded, load 이벤트를 듣습니다. 실제로 돌려 보면 17ms에 loading(body는 null), 733ms에 interactive, 734ms에 DOMContentLoaded(body 자식 23개), 745ms에 complete와 load였습니다.",
        code: "시점       readyState  무엇이 끝났나                   아직인 것           이벤트\n① 문서 생성  'loading'  Document 객체만                body 조차 없다 (null)  -\n② 파싱 끝   'interactive'  DOM 트리 전부. defer 스크립트 실행 시작  이미지, async, iframe  readystatechange\n③ defer 끝  'interactive'  defer·module 스크립트 전부         이미지, async        DOMContentLoaded\n                                                                              (Document 에)\n④ 자원 끝   'complete'  이미지·스타일시트·iframe·async      -                   readystatechange, load\n                                                                          (window 에)\n\n// 실제로 돌려 보면 (ms)\n17   loading        document.body === null\n733  interactive\n734  DOMContentLoaded   document.body.children.length === 23\n745  complete → load",
        codeLang: "text",
        terms: [
          {
            term: "readyState",
            body: "문서가 얼마나 채워졌는지 알려 주는 값입니다. loading(채우는 중), interactive(글자는 다 읽었다), complete(그림까지 다 왔다) 셋입니다. 이벤트를 놓쳤을 때 지금이 어느 시점인지 묻는 데 씁니다. readyState가 이미 interactive나 complete면 DOMContentLoaded 리스너를 걸어도 불리지 않습니다.",
          },
          {
            term: "DOMContentLoaded와 load",
            body: "DOMContentLoaded는 HTML을 다 읽고 defer 스크립트가 다 돈 뒤에 Document에서 납니다. 이미지는 기다리지 않습니다. load는 이미지·스타일시트·iframe까지 다 온 뒤에 window에서 납니다. DOM을 만지는 코드는 앞의 것을, 그림의 크기가 필요한 코드는 뒤의 것을 기다립니다. jQuery의 $(document).ready가 앞의 것이었습니다.",
          },
        ],
      },
      {
        label: "문제: head 스크립트에서 document.body 가 null 이다",
        body: "분석 스크립트를 head에 넣고 document.body.appendChild(pixel)을 불렀습니다. TypeError: Cannot read properties of null입니다. head를 읽는 시점에 body는 아직 파서가 만들지 않았습니다. 실제로 돌려 보면 17ms 시점의 document.body는 null이었습니다. 문서는 있는데 몸이 없습니다. 이 사고는 가장 흔하고 가장 먼저 배우는 것이라 사소해 보이지만, 뒤의 모든 시점 문제가 같은 모양입니다. 코드가 '문서가 있다'와 '그 부분이 있다'를 같은 것으로 보았습니다.",
      },
      {
        label: "문제가 나는 경우: 시점을 잘못 짚는 자리",
        body: "경우 ㄱ, head에서 body를 만집니다. 위의 사고입니다. 경우 ㄴ, 파서를 멈춘 스크립트가 자기 뒤의 요소를 찾습니다. body 중간의 <script>에서 getElementById('after')는 null입니다. 실제로 돌려 보면 그 시점 body의 자식은 3개였고 뒤의 요소는 없었습니다. 경우 ㄷ, load를 기다립니다. 이미지가 100장이면 load는 몇 초 뒤입니다. DOM만 필요한 코드가 그때까지 기다리면 화면은 떠 있는데 버튼이 안 눌립니다. 경우 ㄹ, 지나간 이벤트를 듣습니다. async 스크립트가 DOMContentLoaded 뒤에 도착하면 그 리스너는 영영 불리지 않습니다. readyState를 먼저 봐야 합니다. 경우 ㅁ, 인코딩 선언이 늦습니다. meta charset이 처음 1024바이트 뒤에 있으면 파서는 추측으로 시작합니다. 한글이 깨지거나, 선언을 만나 처음부터 다시 파싱합니다. 경우 ㅂ, doctype이 없습니다. 쿼크 모드가 되어 레이아웃이 달라집니다. 실제로 돌려 보면 doctype 없는 프레임의 compatMode는 BackCompat이었습니다. 경우 ㅅ, 스트리밍을 잊습니다. HTML은 조각으로 도착하며 파싱됩니다. 서버가 뒷부분을 늦게 보내면 화면은 반만 보입니다. 버그가 아니라 설계이지만, '왜 반만 나오나'로 보입니다.",
        code: "경우          언제 생기나                           겉모습                               들통나는 때\nㄱ head 에서 body  <head><script>document.body.…          TypeError: null                      즉시, 첫 로드\nㄴ 뒤의 요소     body 중간 <script> 가 아래 id 를 찾음     null (그 시점 body 자식 3개)           즉시\nㄷ load 기다림   DOM 만 필요한데 window.onload            버튼이 몇 초 동안 안 눌린다             이미지 많은 페이지\nㄹ 지나간 이벤트  async 스크립트가 DOMContentLoaded 리스너  영영 불리지 않는다                    망이 빠를수록 자주\nㅁ 인코딩 늦음   meta charset 이 1024바이트 뒤             한글 깨짐, 또는 재파싱                 긴 head 를 가진 페이지\nㅂ doctype 없음  첫 줄에 <!doctype html> 이 없다           BackCompat. 표·이미지 틈·박스가 다르다  레이아웃이 '이상할' 때\nㅅ 스트리밍      서버가 뒷부분을 늦게 보냄                 화면이 반만 보인다                    느린 서버 렌더링\n\n// ㄹ 의 처방 — 시점을 먼저 묻는다\nif (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);\nelse init();",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 문서는 그릇이고, 코드는 자기가 어느 시점에 도는지 모른다",
        body: "Document 객체는 첫 바이트가 오기 전에 만들어집니다. 그 뒤 수백 ms 동안 채워집니다. 그러니 '문서가 있다'는 거의 아무것도 보장하지 않습니다. 보장은 시점이 줍니다. interactive는 DOM 트리를, DOMContentLoaded는 defer 스크립트까지를, complete는 자원까지를 보장합니다. 문제는 스크립트가 자기가 언제 도는지 코드만 보고는 모른다는 것입니다. 같은 파일이 head에 있으면 ㄱ이 나고, body 끝에 있으면 멀쩡하고, async면 ㄹ이 납니다. 위치와 속성이 시점을 정하는데, 그것은 HTML에 있고 스크립트 파일에는 없습니다. 처방은 시점을 코드 안으로 가져오는 것입니다. readyState를 묻거나, defer로 시점을 고정하거나, 모듈로 쓰는 것(모듈은 늘 defer입니다)입니다.",
        code: "시간 ─────────────────────────────────────────────────────────────────────────▶\n문서 생성     head 파싱      body 파싱 중       파싱 끝        defer 끝          자원 끝\n│            │              │                 │              │                 │\nloading ──────────────────────────────────────┤ interactive ─────────────────────┤ complete\n                                              │              DOMContentLoaded    load\n보장되는 것:  Document 만     head 까지        여기까지의 DOM     DOM 전부         + defer 실행      + 이미지·iframe\n\n같은 스크립트 파일이 어디서 도나          시점                 ㄱ·ㄴ·ㄹ 이 나나\n<head><script>                        loading (body 없음)   ㄱ\n<body> 중간 <script>                   loading (뒤가 없음)   ㄴ\n<script defer>  /  type=module         interactive 직전     안 난다 — 시점이 고정된다\n<script async>                         도착하는 대로         ㄹ (DOMContentLoaded 를 지났을 수 있다)",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "이 장은 문서가 채워지는 '시점'만 봤습니다. 다음 장은 채워지는 '방법'입니다. 바이트가 글자가 되고, 글자가 토큰이 되고, 토큰이 노드가 되는 길입니다. 그 길에서 파서는 틀린 HTML도 반드시 트리로 만듭니다. 그래서 내가 적은 것과 브라우저가 가진 것이 다를 수 있습니다.",
      },
      {
        label: "확인 질문",
        body: "같은 init() 함수를 세 가지로 넣었습니다. (1) head의 <script>, (2) body 끝의 <script>, (3) <script async>. init()이 document.querySelector('#app')을 부릅니다. 각각 어떤 결과가 나올까요?",
        notes: [
          {
            title: "답",
            body: "(1) #app이 body 안에 있으니 null입니다. head를 읽는 시점에 body는 없습니다. (2) #app이 그 스크립트보다 앞에 있으면 찾습니다. 파서가 거기까지는 만들었습니다. (3) 알 수 없습니다. 파일이 빨리 오면 #app 전에 돌아 null이고, 늦게 오면 찾습니다. 망 속도가 결과를 정합니다. 셋 다 피하려면 defer나 module로 시점을 interactive 직전에 고정하거나, readyState를 묻고 아직 loading이면 DOMContentLoaded를 기다립니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "WHATWG HTML — Create and initialize a Document object", href: `${HTML}/document-lifecycle.html#initialise-the-document-object` },
      { label: "WHATWG HTML — The end (readiness, DOMContentLoaded, load)", href: `${HTML}/parsing.html#the-end` },
      { label: "MDN — Document.readyState", href: `${MDN}/API/Document/readyState` },
      { label: "MDN — Quirks mode and standards mode", href: `${MDN}/HTML/Guides/Quirks_mode_and_standards_mode` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s4",
    name: "4장 · 바이트에서 DOM까지: 토크나이저와 트리 구성",
    tagline: "파서는 틀린 HTML도 반드시 트리로 만든다. 그래서 내가 적은 것과 브라우저가 가진 것이 다르다",
    intro:
      "HTML 파서는 두 단계입니다. 사양의 말로는 입력이 '토큰화 단계를 거친 뒤 트리 구성 단계를 거친다'. 토크나이저는 글자를 읽어 시작 태그, 끝 태그, 글자, 주석 같은 토큰을 냅니다. 트리 구성기는 토큰을 받아 DOM 노드를 만들고 끼웁니다. 그런데 이 파서는 오류를 내지 않습니다. 어떤 입력이 와도 규칙에 따라 고쳐서 트리를 만듭니다. <p> 안에 <div>를 넣으면 p를 닫고 div를 형제로 둡니다. <table> 안의 날 텍스트는 표 밖으로 꺼냅니다. <tbody>가 없으면 만들어 넣습니다. 이 장의 질문은 하나입니다. 내가 적은 HTML과 브라우저가 가진 DOM이 어디서 어떻게 달라지는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 바이트 → 글자 → 토큰 → 노드",
        body: "네트워크에서 온 것은 바이트입니다. 먼저 인코딩을 정합니다. BOM, Content-Type의 charset, 처음 1024바이트의 meta charset, 그래도 없으면 추측입니다. 바이트가 글자가 됩니다. 전처리기가 줄바꿈(CR LF)을 LF로 고칩니다. 토크나이저가 글자를 하나씩 읽으며 상태를 바꿉니다. 데이터 상태에서 <를 만나면 태그 열기 상태, 글자를 읽으면 태그 이름 상태, 공백을 만나면 속성 이름 상태입니다. 상태 기계가 토큰을 냅니다. DOCTYPE, 시작 태그(이름과 속성), 끝 태그, 글자, 주석, 파일 끝입니다. 트리 구성기가 토큰을 받습니다. 지금 어디에 있는지(삽입 모드: initial, before html, in head, in body, in table…)와 열린 요소 스택을 보고, 노드를 만들어 끼우거나, 빠진 태그를 암묵적으로 만들거나, 잘못 놓인 것을 옮깁니다. 사양은 트리 구성 단계가 '재진입 가능'하다고 적습니다. 스크립트가 document.write로 글자를 넣으면 파서가 그 글자를 바로 처리하기 때문입니다.",
        code: "바이트  3c 68 31 3e ...\n  │  인코딩 결정: BOM → Content-Type charset → 처음 1024바이트의 <meta charset> → 추측\n  ▼\n글자    <h1 id=\"hero\">render demo</h1>\n  │  전처리: CR LF → LF\n  ▼\n토큰    [StartTag h1 {id: hero}]  [Character 'r' 'e' 'n' ...]  [EndTag h1]\n  │  토크나이저 = 상태 기계 (데이터 → 태그 열기 → 태그 이름 → 속성 이름 → 속성 값 → ...)\n  ▼\n노드    트리 구성기: 삽입 모드 + 열린 요소 스택을 보고 끼운다\n        html ─ head ─ ...\n             └ body ─ h1#hero ─ #text 'render demo'\n\n재진입: <script>document.write('<p>x</p>')</script>  → 파서가 멈춘 자리에 글자가 끼어들어 바로 토큰이 된다",
        codeLang: "text",
        terms: [
          {
            term: "토큰 (token)과 토크나이저 (tokenizer)",
            body: "토큰은 글자 덩어리에 뜻을 붙인 조각입니다. '<h1 id=hero>'는 글자 열셋이지만 토큰으로는 '시작 태그 h1, 속성 id=hero' 하나입니다. 토크나이저는 글자를 한 자씩 읽으며 지금 태그 이름을 읽는 중인지 속성 값을 읽는 중인지 상태를 바꾸는 기계입니다. 상태가 있어서 '<' 가 태그인지 글자인지 자리마다 다르게 읽습니다.",
          },
          {
            term: "삽입 모드 (insertion mode)와 열린 요소 스택",
            body: "트리 구성기가 '지금 문서의 어디쯤인가'를 기억하는 두 장치입니다. 삽입 모드는 in head, in body, in table처럼 큰 자리를 말하고, 스택은 아직 닫히지 않은 요소들을 쌓아 둡니다. 새 토큰이 오면 이 둘을 보고 어디에 끼울지, 무엇을 먼저 닫을지 정합니다. <p>가 열린 채 <div>가 오면 스택의 p를 먼저 닫는 규칙이 여기 있습니다.",
          },
        ],
      },
      {
        label: "파서가 고쳐 쓰는 규칙 셋",
        body: "첫째, 암묵적 태그입니다. html, head, body, tbody를 적지 않아도 만들어 넣습니다. 둘째, 자동 닫기입니다. 사양의 in body 모드에서 address, article, …, div 같은 블록 시작 태그를 만나면 '열린 요소 스택에 버튼 범위의 p 요소가 있으면 p 요소를 닫는다'. 그래서 <p><div>는 p가 먼저 닫히고 div는 형제가 됩니다. 뒤의 </p>는 열린 p가 없으니 빈 <p></p>를 하나 만듭니다. 셋째, 포스터 페어런팅입니다. 사양은 '표 안에 내용이 잘못 중첩되면 포스터 페어런팅이 일어난다'고 적습니다. 표 안에 있을 수 없는 글자나 요소를 표 앞으로 옮겨 끼웁니다. 이 셋 모두 오류 메시지가 없습니다. 콘솔은 조용하고 결과만 다릅니다.",
        code: "내가 적은 것                              브라우저가 가진 것 (실제로 돌려 보면)\n<p><div id=\"inDiv\">div inside p</div></p>   <p></p>  <div id=\"inDiv\">…</div>  <p></p>\n                                           ① <div> 가 p 를 닫는다  ② div 는 형제  ③ </p> 가 빈 p 를 하나 더 만든다\n                                           → body 자식: … p#after, p(빈), div#inDiv, p(빈), table#tbl …\n\n<table id=\"tbl\"><tr><td>cell</td></tr>stray text</table>\n                                           \"\\nstray text\"  ← 표 앞으로 나왔다 (foster parenting)\n                                           <table id=\"tbl\"><tbody><tr><td>cell</td></tr></tbody></table>\n                                           ← tbody 가 생겼다\n\nquerySelector('#tbl > tr')         // null   ← 소스에는 tr 이 table 의 자식이지만 DOM 에서는 tbody 의 자식\nquerySelector('#tbl > tbody > tr') // <tr>",
        codeLang: "text",
        terms: [
          {
            term: "포스터 페어런팅 (foster parenting)",
            body: "표 안에 있을 수 없는 것(날 텍스트, div 등)을 표 바로 앞에 '위탁'해 끼우는 규칙입니다. 이름이 위탁 양육입니다. 템플릿의 {{ }} 사이 공백이나 조건문 찌꺼기가 표 위로 튀어나오는 것이 이 규칙입니다. 표 안에 무엇을 쓸 때는 tr·td 바깥에 글자가 남지 않게 해야 합니다.",
          },
        ],
      },
      {
        label: "프리로드 스캐너: 파서가 멈춰도 다운로드는 간다",
        body: "메인 파서가 스크립트에 막혀 멈추면 뒤의 img, link, script를 발견하는 것도 늦어집니다. 그래서 Chrome은 가벼운 두 번째 스캐너를 함께 돌립니다. Chrome의 설명으로는 '속도를 높이기 위해 프리로드 스캐너가 동시에 돈다'. 이 스캐너는 토큰만 훑어 src와 href를 찾아 네트워크 스레드에 요청을 보냅니다. DOM은 만들지 않습니다. 그래서 다운로드와 실행이 갈라집니다. 실제로 돌려 보면 async.js는 300ms 뒤에 도착하도록 서버가 늦췄는데, 실행은 733ms에 됐습니다. 파일은 일찍 왔지만 <script async> 태그를 메인 파서가 실제로 만든 것은 CSS 대기가 풀린 뒤였기 때문입니다. 받는 것은 스캐너가 먼저, 도는 것은 파서가 그 자리에 닿은 뒤입니다. 스캐너가 못 보는 것도 있습니다. 자바스크립트가 만들어 끼우는 <script>, CSS 안의 @import와 background-image는 스캐너의 눈 밖입니다.",
        code: "메인 파서    ─ <head> ─ <link slow.css> ─ <script> (CSS 기다림 …… 700ms) ─ <body> ─ … ─ <script async\n           src=async.js>\n                                        │                                                      └ 여기서 태그가 만들어지고\n프리로드 스캐너 ─ 토큰만 훑는다 ─ slow.css 요청 ─ async.js 요청 (~17ms) ────── 도착 (~320ms) ──── 실행 (733ms)\n                                                                                                  받기와 돌기가 갈라진다\n스캐너가 못 보는 것:  JS 가 만든 <script>,  CSS 의 @import,  background-image,  JS 가 넣는 <link>",
        codeLang: "text",
      },
      {
        label: "문제: <p> 안의 <div> 가 빈 p 둘로 갈라진다",
        body: "컴포넌트 라이브러리의 Paragraph 안에 Card(div)를 넣었습니다. 디자인은 그대로인데 CSS가 p + .card로 간격을 주려 하니 안 맞습니다. DOM을 열어 보면 p는 비어 있고 div는 그 옆에 있고 빈 p가 하나 더 있습니다. 실제로 돌려 보면 body 자식 중 빈 p가 둘이었습니다. 소스에는 없는 요소가 둘 생기고, 있는 중첩이 사라졌습니다. 콘솔에는 아무 말도 없습니다. React는 개발 모드에서 validateDOMNesting 경고를, Vue와 React의 SSR은 하이드레이션 불일치를 냅니다. 서버가 보낸 HTML을 파서가 고쳐 쓴 뒤라 프레임워크가 만든 트리와 다르기 때문입니다(12장).",
      },
      {
        label: "문제가 나는 경우: 적은 것과 가진 것이 갈라지는 자리",
        body: "경우 ㄱ, 블록이 p를 닫습니다. 위의 사고입니다. 경우 ㄴ, 표 셀렉터입니다. table > tr은 null입니다. tbody가 끼어 있습니다. 실제로 돌려 보면 #tbl > tr은 false, #tbl > tbody > tr은 true였습니다. 경우 ㄷ, 표 안의 날 텍스트입니다. 템플릿 공백이나 {{ }}가 표 앞으로 튀어나옵니다. 실제로 돌려 보면 'stray text'가 표의 앞 형제 텍스트 노드가 되었습니다. 경우 ㄹ, 닫지 않은 따옴표입니다. <a href=\"/x>링크</a><p>다음 문단… 에서 따옴표 하나가 빠지면 토크나이저는 속성 값 상태에 머물러 뒤의 글자를 전부 href 값으로 먹습니다. 다음 따옴표까지 문서가 사라집니다. 경우 ㅁ, 인코딩 선언이 늦거나 없습니다. 3장의 ㅁ입니다. 경우 ㅂ, 셀프 클로징 착각입니다. <div />는 HTML에서 닫히지 않습니다. 뒤의 모든 것이 그 div의 자식이 됩니다. 경우 ㅅ, 중첩 폼입니다. <form> 안의 <form>은 무시됩니다. 두 번째 폼의 입력이 첫 폼으로 들어갑니다. 경우 ㅇ, 프리로드 스캐너의 사각입니다. 중요한 글꼴을 CSS @import 뒤에 두면 스캐너가 못 봐서 늦게 받습니다. <link rel=preload>로 알려 줘야 합니다.",
        code: "경우      언제 생기나                     겉모습                             들통나는 때\nㄱ p 안의 블록  <p><div>                         빈 p 둘, div 는 형제                 CSS 인접\n                                                                                셀렉터·하이드레이션 경고\nㄴ tbody 삽입  <table><tr>                      table > tr 이 null                  셀렉터가 안 잡힐 때\nㄷ 표 안 날 텍스트  <table> 바로 안의 글자·{{ }} 공백    글자가 표 위로 튀어나온다             표 위에 이상한 글자\nㄹ 따옴표 누락  href=\"/x>                        다음 따옴표까지 문서가 속성 값이 된다    화면 일부가 통째로 사라짐\nㅁ 인코딩 늦음  meta charset 이 1024바이트 뒤       깨진 글자, 재파싱                   한글 페이지\nㅂ <div />  셀프 클로징을 믿었다                뒤가 전부 그 div 의 자식              중첩이 이상할 때\nㅅ 중첩 폼  <form> 안 <form>                  안쪽 form 무시, 입력이 바깥 폼으로     전송 데이터가 섞일 때\nㅇ 스캐너 사각  @import 뒤의 글꼴, JS 가 만든 script  늦게 받는다                         Performance 탭 워터폴",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 오류 복구가 표준이라, 틀린 입력도 조용히 '맞는' 트리가 된다",
        body: "XML 파서는 틀린 입력에 오류를 내고 멈춥니다. HTML 파서는 그 반대를 택했습니다. 1990년대의 웹 페이지가 대부분 틀려 있었고, 그것들을 전부 보여 줘야 했습니다. 그래서 HTML5 사양은 '틀렸을 때 어떻게 고치는가'까지 표준으로 적었습니다. 모든 브라우저가 같은 방식으로 고칩니다. 그 결과 두 가지가 동시에 참입니다. 어떤 입력도 트리가 됩니다. 그리고 그 트리는 입력과 다를 수 있습니다. 두 번째가 사고의 자리입니다. 개발자는 소스를 보고, 브라우저는 트리를 봅니다. CSS 셀렉터, querySelector, 프레임워크의 하이드레이션은 전부 트리 쪽을 봅니다. 처방은 트리를 직접 보는 습관입니다. 개발자 도구 Elements 탭은 소스가 아니라 트리입니다. 그리고 유효성 검사기나 린트(vue/no-invalid-nesting 같은)를 두어 '고쳐 쓸 여지가 있는 입력'을 미리 막는 것입니다.",
        code: "XML 파서:   틀린 입력 ──▶ 오류, 멈춤                     \"고치지 않는다\"\nHTML 파서:  틀린 입력 ──▶ 규칙대로 고친 트리 (오류 없음)     \"반드시 트리를 낸다\" — 그 규칙이 표준이라 모든 브라우저가 같다\n\n           개발자가 보는 것        브라우저가 가진 것        둘을 비교하는 자리\n           소스 (.vue, .html)      DOM 트리                 CSS 셀렉터 · querySelector · 하이드레이션 · 접근성 트리\n           <p><div>…</div></p>     p, div, p                ← 여기서 어긋남이 드러난다\n\n처방:  Elements 탭은 트리다 (소스가 아니다) · 중첩 규칙 린트 · 표 안에는 tr·td 바깥 글자를 남기지 않는다",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "트리 구성기가 <script> 토큰을 만나면 멈춥니다. 스크립트는 지금까지의 DOM을 읽고 바꿀 수 있고, document.write로 파서에 글자를 밀어 넣을 수도 있습니다. 그래서 브라우저는 스크립트가 끝나기 전에는 다음 토큰을 처리하지 않습니다. 거기에 조건이 하나 더 붙습니다. 스크립트 앞의 스타일시트가 아직 오지 않았으면 스크립트도 기다립니다. 실제로 돌려 보면 그 기다림이 696ms였습니다. 다음 장입니다.",
      },
      {
        label: "확인 질문",
        body: "Vue 템플릿에 <table><tr v-for=\"row in rows\"><td>{{ row }}</td></tr></table>를 적었습니다. 서버 렌더링(SSR)한 뒤 브라우저가 하이드레이션합니다. 어떤 일이 생길 수 있을까요?",
        notes: [
          {
            title: "답",
            body: "서버는 적힌 대로 table > tr을 문자열로 보냅니다. 브라우저 파서는 그 사이에 tbody를 끼워 table > tbody > tr로 만듭니다. Vue가 클라이언트에서 만든 가상 트리는 table > tr입니다. 둘이 달라 하이드레이션 불일치 경고가 나고, Vue는 그 부분을 다시 그립니다. 처방은 템플릿에 <tbody>를 명시해 파서가 고칠 여지를 없애는 것입니다. 파서가 고쳐 쓰는 규칙(암묵적 태그)이 SSR에서는 '서버와 브라우저가 다른 트리를 가진다'로 나타납니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "WHATWG HTML — Overview of the parsing model", href: `${HTML}/parsing.html#overview-of-the-parsing-model` },
      { label: "WHATWG HTML — The 'in body' insertion mode (p 를 닫는 규칙)", href: `${HTML}/parsing.html#parsing-main-inbody` },
      { label: "WHATWG HTML — Creating and inserting nodes (foster parenting)", href: `${HTML}/parsing.html#creating-and-inserting-nodes` },
      { label: "Chrome — Inside look at modern web browser, part 3 (preload scanner)", href: `${CHROME}/inside-browser-part3` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s5",
    name: "5장 · 스크립트가 파서를 멈추는 자리",
    tagline: "스크립트는 파서를 멈추고, 스타일시트는 스크립트를 멈춘다. async와 defer는 그 멈춤을 미루는 선언이다",
    intro:
      "파서가 <script>를 만나면 멈춥니다. 스크립트가 DOM을 바꾸거나 document.write로 글자를 밀어 넣을 수 있어서, 브라우저는 스크립트가 끝나기 전에 다음 토큰을 처리하지 않습니다. 사양은 이런 스크립트를 '파싱을 막는 대기 스크립트'라 부릅니다. 여기에 조건이 하나 더 붙습니다. 스크립트는 자기 앞의 스타일시트가 다 오기 전에는 돌지 않습니다. 스크립트가 getComputedStyle로 스타일을 읽을 수 있으니, 아직 안 온 스타일시트가 있으면 답이 틀리기 때문입니다. 그래서 CSS가 늦으면 스크립트가 늦고, 스크립트가 늦으면 파서가 늦습니다. 실제로 돌려 보면 그 사슬이 696ms였습니다. async, defer, module은 이 멈춤을 다른 시점으로 미루는 선언입니다. 이 장의 질문은 하나입니다. 어느 선언이 언제 받고, 언제 돌고, 무엇을 보장하는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 네 종류의 스크립트와 두 종류의 대기",
        body: "사양의 '스크립트 요소 준비하기' 알고리즘이 네 갈래로 나눕니다. src가 있고 async도 defer도 없는 고전 스크립트는 '파서 문서의 파싱을 막는 대기 스크립트로 둔다'. 파서는 그것이 받아져 실행될 때까지 기다립니다. defer가 있거나 type이 module이면 '문서 파싱이 끝났을 때 실행할 스크립트 목록에 넣는다'. 적힌 순서대로, 파싱이 끝난 뒤, DOMContentLoaded 전에 돕니다. 사양은 모듈에 대해 'defer 속성은 모듈 스크립트에 아무 효과가 없다'고 적습니다. 이미 defer이기 때문입니다. async가 있으면 '가능한 한 빨리 실행할 스크립트 집합에 넣는다'. 도착하는 순서대로 돕니다. 적힌 순서와 무관합니다. 인라인 고전 스크립트는 그 자리에서 바로 돕니다. 두 번째 대기는 스타일시트입니다. 파서가 만든 <link rel=stylesheet>나 <style>이 아직 로딩 중이면 그 문서는 '스크립트를 막는 스타일시트를 가진' 상태입니다. 그동안 파싱을 막는 스크립트는 실행을 미룹니다. 스타일시트가 load나 error를 내면 그 집합에서 빠지고 스크립트가 돕니다.",
        code: "종류                    받기 (fetch)            돌기 (execute)                     순서          파서를 막나\n<script src>  (고전)     만나는 즉시 (스캐너는 더 일찍)  받는 즉시 — 그 자리에서. 앞 CSS 를 기다림  적힌 순서      막는다\n<script src defer>       만나는 즉시               파싱 끝난 뒤, DOMContentLoaded 전        적힌 순서      안 막는다\n<script type=module>     만나는 즉시               defer 와 같다 (인라인 모듈도)             적힌 순서      안 막는다\n<script src async>       만나는 즉시               도착하는 즉시 (파싱 중이든 뒤든)            도착 순서      도는 동안만\n<script> (인라인 고전)    -                       그 자리에서 즉시. 앞 CSS 를 기다림          적힌 순서      막는다\n\n두 종류의 대기 사슬\n파서 ──기다린다──▶ 파싱을 막는 스크립트 ──기다린다──▶ 스크립트를 막는 스타일시트 (파서가 만든 <link>/<style>, 아직 로딩 중)\n                                                   └ load 또는 error 가 나면 집합에서 빠진다 → 스크립트가 돈다 → 파서가 간다",
        codeLang: "text",
        terms: [
          {
            term: "파싱을 막는 스크립트 (parser-blocking script)",
            body: "파서가 그 스크립트의 실행이 끝날 때까지 다음 토큰을 처리하지 않는 스크립트입니다. src가 있고 async·defer가 없는 고전 스크립트와 인라인 스크립트가 여기 속합니다. 그 스크립트가 document.write로 글자를 넣거나 지금까지의 DOM을 읽을 수 있으니, 브라우저는 '그 시점까지의 문서'를 멈춰 세워 둡니다.",
          },
          {
            term: "스크립트를 막는 스타일시트 (script-blocking style sheet)",
            body: "파서가 만든 <link rel=stylesheet>나 <style>이 아직 로딩 중일 때, 그 스타일시트는 뒤의 스크립트 실행을 막습니다. 스크립트가 getComputedStyle 같은 것으로 스타일을 읽을 수 있어서, 아직 안 온 규칙이 있으면 답이 틀리기 때문입니다. 자바스크립트로 끼운 <link>는 이 집합에 들지 않습니다.",
          },
          {
            term: "async와 defer",
            body: "둘 다 파서를 막지 않고 파일을 받습니다. 차이는 도는 시점입니다. defer는 파싱이 끝난 뒤 적힌 순서대로, DOMContentLoaded 전에 돕니다. async는 파일이 도착하는 즉시 돕니다. 순서는 도착 순서이고 파싱 중일 수도 뒤일 수도 있습니다. 서로 의존하는 파일은 defer, 독립적인 것(분석, 광고)은 async입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "head에 700ms 늦게 오는 스타일시트를 두고 바로 뒤에 인라인 스크립트를 두었습니다. 그 스크립트는 696ms를 기다린 뒤 713ms에 돌았습니다. 돌 때 document.styleSheets는 1개였고 그 시트의 변수 값이 이미 읽혔습니다. 스타일시트가 와야 돈다는 사양대로입니다. body 중간의 인라인 스크립트는 자기 뒤의 요소를 못 봤습니다. getElementById('after')가 null이고 body 자식은 3개, document.currentScript가 body의 마지막 자식이었습니다. 다섯 스크립트의 실행 순서는 이렇습니다. body 끝의 인라인 고전 → async.js → defer.js → defer2.js → 인라인 module. async.js는 서버가 300ms 늦췄는데 733ms에 돌았습니다. 파일은 320ms쯤 도착했지만 <script async> 태그 자체를 파서가 만든 것이 CSS 대기가 풀린 뒤였기 때문입니다. defer 둘은 적힌 순서대로 interactive 직후에, 인라인 module은 그 뒤에 돌았습니다. 모두 DOMContentLoaded(734ms) 전입니다.",
        code: "// head: <link rel=stylesheet href=/slow.css?ms=700> 바로 뒤의 인라인 스크립트\nperformance.now()                          // 713   (스크립트 시작 시각 17 → 696ms 기다림)\ndocument.styleSheets.length                // 1\ngetComputedStyle(html).getPropertyValue('--from-slow-css')   // 'arrived'  ← 스타일시트가 와 있다\n\n// body 중간의 인라인 스크립트\ndocument.getElementById('before')          // <p>   (앞)\ndocument.getElementById('after')           // null  (뒤 — 아직 파싱 안 됨)\ndocument.body.children.length              // 3\ndocument.currentScript === document.body.lastElementChild   // true\n\n// 실행 순서 (scriptOrder)                 돈 시각    readyState\n1  inline classic (body 끝)                 ~733      loading\n2  async.js  (서버가 300ms 늦춤)             733       loading     ← 도착은 ~320ms, 실행은 태그가 만들어진 뒤\n3  defer.js                                733       interactive\n4  defer2.js                               733       interactive\n5  module (inline)                         733       interactive\n   DOMContentLoaded                        734",
      },
      {
        label: "문제: CSS 가 늦으면 스크립트가 늦고, 스크립트가 늦으면 화면이 늦다",
        body: "head에 CDN의 폰트 CSS 한 줄과 그 뒤에 작은 인라인 스크립트(테마 색을 localStorage에서 읽어 html에 붙이는 것)가 있습니다. 어느 날 CDN이 느려져 CSS가 3초 걸립니다. 인라인 스크립트는 그 CSS를 기다립니다. 파서는 그 스크립트를 기다립니다. body는 3초 동안 파싱되지 않습니다. 화면은 흰색입니다. 스크립트는 CSS와 아무 상관이 없는 세 줄이었습니다. 실제로 돌려 보면 같은 모양으로 696ms가 묶였습니다. 사슬의 어느 고리도 틀리지 않았습니다. 사양대로 기다린 것입니다.",
      },
      {
        label: "문제가 나는 경우: 시점을 잘못 고른 자리",
        body: "경우 ㄱ, head의 동기 스크립트입니다. 큰 번들을 <head><script src>로 넣으면 받고 실행하는 동안 body가 파싱되지 않습니다. 흰 화면입니다. 경우 ㄴ, CSS 뒤의 인라인 스크립트입니다. 위의 사고입니다. 경우 ㄷ, async의 순서입니다. 라이브러리와 플러그인을 둘 다 async로 넣으면 플러그인이 먼저 도착해 '라이브러리가 없다'로 깨집니다. 도착 순서는 망이 정합니다. 경우 ㄹ, defer가 DOMContentLoaded를 미룹니다. defer 스크립트가 전부 돈 뒤에 DOMContentLoaded가 납니다. defer 번들이 크면 그 이벤트가 그만큼 늦습니다. 경우 ㅁ, async 스크립트 안의 DOMContentLoaded 리스너입니다. 3장의 ㄹ입니다. 경우 ㅂ, document.write입니다. 파서를 재진입시키고 뒤를 전부 막습니다. Chrome은 느린 망에서 document.write로 넣은 외부 스크립트를 아예 막습니다. 경우 ㅅ, module로 바꿨을 때입니다. 모듈은 strict 모드이고 늘 defer이고 최상위 this가 undefined이고 var가 window에 붙지 않습니다. 옛 코드를 type=module로만 바꾸면 네 가지가 한 번에 바뀝니다. 경우 ㅇ, 프리로드 스캐너의 사각입니다. 4장의 ㅇ입니다. 스크립트가 만들어 끼운 <script>는 스캐너가 못 봐서 늦게 받습니다.",
        code: "경우          언제 생기나                           겉모습                               들통나는 때\nㄱ head 동기 번들  <head><script src=app.js> (큼)          받고 도는 동안 흰 화면                  느린 망·기기\nㄴ CSS 뒤 인라인  <link> 뒤 <script> 세 줄                CSS 가 늦으면 스크립트·파서가 같이 멈춤 (696ms)  CSS CDN\n                                                      이 느린 날\nㄷ async 순서   라이브러리·플러그인 둘 다 async           플러그인이 먼저 와서 깨진다               망 상태에 따라 간헐적\nㄹ defer 가 DCL 미룸  defer 번들이 크다                      DOMContentLoaded 가 늦다                번들이 커질수록\nㅁ async 의 DCL 리스너 이미 지난 뒤 도착                      리스너가 영영 안 불린다                  빠른 망에서\nㅂ document.write  파서에 글자를 밀어 넣음                   뒤가 전부 막힘. Chrome 은 느린 망에서 차단  광고 스크립트\nㅅ module 전환   type=module 만 붙임                    this undefined, var 가 전역 아님, strict  옛 코드 옮길 때\nㅇ 스캐너 사각   JS 가 만든 <script>, @import          늦게 받는다                            워터폴에서\n\n// ㄴ 의 처방 셋 중 하나:  스크립트를 CSS 앞으로 · defer 로 · 인라인이 아니라 async 로",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 스크립트가 일관된 상태를 봐야 해서, 그 보장이 곧 멈춤이다",
        body: "스크립트는 DOM과 CSSOM을 읽고 바꿀 수 있습니다. 그래서 브라우저는 스크립트가 도는 순간 '그 시점까지의 문서와 스타일이 전부 반영된 상태'를 보장해야 합니다. 그 보장을 지키는 가장 단순한 방법이 멈추는 것입니다. 파서를 멈춰 DOM이 더 바뀌지 않게 하고, 스타일시트를 기다려 CSSOM이 완성되게 합니다. 사슬이 둘 겹칩니다. 파서 → 스크립트, 스크립트 → 스타일시트. 어느 고리가 늦으면 전부 늦습니다(ㄱ, ㄴ). async와 defer는 이 보장을 포기하거나 미루는 선언입니다. defer는 '파싱이 끝난 뒤 봐도 된다', async는 '언제 봐도 된다'입니다. 보장이 느슨해지는 대신 멈춤이 사라집니다. 그래서 선택의 기준은 하나입니다. 이 스크립트가 '그 자리의 DOM'을 봐야 하는가. 봐야 하면 그 자리에(그리고 CSS 앞에), 다 그려진 DOM이 필요하면 defer, 아무것도 안 봐도 되면 async입니다.",
        code: "보장의 강도                        선언                     멈춤\n'그 자리까지의 DOM + 완성된 CSSOM'    <script> / <script src>   파서 멈춤 + CSS 대기        → ㄱ ㄴ 의 자리\n'파싱이 끝난 DOM, 적힌 순서'          defer / module           없음. 대신 DCL 이 뒤로        → ㄹ\n'아무 보장 없음, 도착 순서'           async                    없음. 순서도 없음            → ㄷ ㅁ\n\n두 사슬\n파서 ──▶ 스크립트 ──▶ 스타일시트       (늦은 고리 하나가 전체를 멈춘다)\n\n고르는 기준:  이 스크립트가 '그 자리의 DOM' 을 봐야 하나?\n  예 → 그 자리에, CSS 보다 앞에      다 그려진 DOM 이 필요 → defer      아무것도 안 봄 → async",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "스크립트가 기다린 스타일시트는 도착하면 무엇이 될까요. CSS 글자도 파싱되어 객체가 됩니다. 규칙의 목록(CSSOM)이 되고, DOM의 요소 하나하나와 맞춰져 '계산된 스타일'이 됩니다. 요소마다 모든 속성의 값이 정해지는 자리입니다. 그리고 CSS는 파서를 막지 않지만 그리기는 막습니다. 다음 장입니다.",
      },
      {
        label: "확인 질문",
        body: "같은 페이지에 <script defer src=\"a.js\">, <script async src=\"b.js\">, <script type=\"module\" src=\"c.js\">가 이 순서로 있습니다. b.js는 아주 작아 가장 먼저 도착합니다. 셋이 도는 순서는 무엇이고, 그 순서는 매번 같을까요?",
        notes: [
          {
            title: "답",
            body: "b.js(async)는 도착하는 즉시 돕니다. 파싱 중이라도 돕니다. 그래서 보통 가장 먼저입니다. 그다음 파싱이 끝나면 a.js(defer)와 c.js(module)가 적힌 순서대로 돕니다. 모듈은 defer와 같은 목록에 들어가므로 a → c입니다. 그러나 b.js의 자리는 매번 같지 않습니다. 느린 망에서 b.js가 파싱 끝난 뒤 도착하면 a → c → b가 됩니다. async는 순서를 약속하지 않습니다. 실제로 돌려 보면 async.js는 서버가 300ms 늦췄지만 태그가 만들어진 뒤에야 돌아 defer 직전이었습니다. 도착뿐 아니라 '태그가 파서에 닿는 시점'도 순서를 바꿉니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "WHATWG HTML — Prepare the script element", href: `${HTML}/scripting.html#prepare-the-script-element` },
      { label: "WHATWG HTML — A style sheet that is blocking scripts", href: `${HTML}/semantics.html#has-a-style-sheet-that-is-blocking-scripts` },
      { label: "MDN — <script>: async, defer", href: `${MDN}/HTML/Reference/Elements/script` },
      { label: "Chrome — Inside look at modern web browser, part 3 (JavaScript can block the parsing)", href: `${CHROME}/inside-browser-part3` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s6",
    name: "6장 · CSSOM과 스타일 계산",
    tagline: "CSS 도 트리가 된다. 그 트리를 DOM 의 요소마다 대어 '모든 속성의 값'을 정한다",
    intro:
      "스타일시트도 파싱됩니다. 글자가 토큰이 되고, 토큰이 규칙(셀렉터 + 선언들)이 되고, 규칙들이 CSSStyleSheet 객체가 됩니다. document.styleSheets로 보이는 그것이 CSSOM입니다. 그다음이 스타일 계산입니다. DOM의 요소 하나하나에 대해, 어느 규칙이 맞는지 찾고(셀렉터 매칭), 여러 규칙이 겹치면 누가 이기는지 정하고(캐스케이드), 적히지 않은 속성은 부모에서 받거나 초깃값을 쓰고(상속), 결국 모든 속성에 값 하나씩을 줍니다. 그것이 계산된 스타일입니다. Chrome의 말로는 '메인 스레드가 CSS를 파싱하고 각 DOM 노드의 계산된 스타일을 정한다'. CSS는 파서를 막지 않습니다. 그러나 그리기는 막습니다. 스타일 없는 화면이 먼저 보이지 않게 하려는 것입니다. 이 장의 질문은 둘입니다. 겹친 규칙 중 누가 이기는가. 그리고 CSS가 늦으면 무엇이 늦는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: CSS 글자 → CSSOM → 요소마다 계산된 스타일",
        body: "CSS 파서는 HTML 파서보다 단순합니다. 규칙 하나는 셀렉터와 선언 블록입니다. 파싱 결과가 CSSStyleSheet이고 그 안에 CSSRule들이 있습니다. 실제로 돌려 보면 document.styleSheets는 2개(외부 하나, <style> 하나)였고 <style>의 규칙은 7개였습니다. 스타일 계산은 요소마다 돕니다. 첫째, 매칭입니다. 모든 규칙의 셀렉터를 이 요소에 대어 봅니다. 브라우저는 셀렉터를 오른쪽에서 왼쪽으로 읽습니다. .nav a라면 먼저 이 요소가 a인지 보고, 그다음 조상 중에 .nav가 있는지 봅니다. 둘째, 캐스케이드입니다. 맞은 선언이 여럿이면 출처와 중요도(브라우저 기본 < 사용자 < 작성자 < 작성자 !important …), 레이어, 특이도, 적힌 순서로 하나를 고릅니다. 셋째, 상속과 초깃값입니다. 적히지 않은 속성 중 color·font 같은 것은 부모의 값을 받고, background·border 같은 것은 초깃값을 씁니다. 넷째, 값의 변환입니다. em·%·auto 같은 상대 값이 절댓값으로 바뀝니다(일부는 레이아웃까지 가야 정해집니다). 결과가 계산된 스타일입니다. getComputedStyle로 읽는 것이 그것입니다.",
        code: "CSS 글자                      CSSOM                                계산된 스타일 (요소마다)\n.box { color: blue }           CSSStyleSheet                        <div id=\"target\" class=\"box\">\n#target { color: red }          ├ CSSStyleRule .box                   color: rgb(255, 0, 0)   ← #target 이 이겼다\n.box.box { color: green }       ├ CSSStyleRule #target                font-size: 16px         ← 부모에서 상속\n                                └ CSSStyleRule .box.box               background-color: transparent  ← 초깃값\n                                                                      display: block  …  (모든 속성)\n\n캐스케이드 — 맞은 선언이 여럿일 때 고르는 순서\n① 출처·중요도  브라우저 기본 < 사용자 < 작성자 < 작성자 !important < 사용자 !important < 브라우저 !important\n② 레이어     @layer 로 선언한 층 (뒤 층이 이긴다)\n③ 특이도     (id 수, 클래스·속성·가상클래스 수, 요소·가상요소 수)  #target = (1,0,0)  >  .box.box = (0,2,0)  >  .box\n  = (0,1,0)\n④ 적힌 순서  같으면 뒤가 이긴다\n\n// 실제로 돌려 보면\ngetComputedStyle(target).color     // 'rgb(255, 0, 0)'   ← .box.box 가 두 클래스지만 id 하나에 진다\ntarget.style.color                 // ''                  ← 인라인 style 은 비어 있다. 계산된 값과 다른 것이다\ndocument.styleSheets.length        // 2\ndocument.styleSheets[1].cssRules.length   // 7",
        codeLang: "text",
        terms: [
          {
            term: "CSSOM (CSS Object Model)",
            body: "CSS를 파싱해 만든 객체 트리입니다. document.styleSheets 아래에 시트, 그 아래에 규칙, 그 아래에 선언이 있습니다. DOM이 HTML의 객체 모델이듯 CSSOM은 CSS의 객체 모델입니다. 자바스크립트로 규칙을 넣고 빼는 것도 이 객체를 통해서입니다. DOM과는 별개의 트리라 둘을 합치는 단계(스타일 계산)가 따로 필요합니다.",
          },
          {
            term: "캐스케이드 (cascade)와 특이도 (specificity)",
            body: "캐스케이드는 한 속성에 여러 선언이 맞을 때 하나를 고르는 규칙 전체입니다. 특이도는 그중 한 단계로, 셀렉터가 얼마나 좁은지를 (id, 클래스, 요소) 세 자리 수로 셉니다. 자리 사이에 올림이 없습니다. 클래스 열 개도 id 하나를 못 이깁니다. 'cascading'이 CSS의 첫 글자입니다.",
          },
          {
            term: "계산된 스타일 (computed style)",
            body: "캐스케이드와 상속을 거쳐 요소의 모든 속성에 값 하나씩이 정해진 결과입니다. 적지 않은 속성도 전부 값이 있습니다. getComputedStyle(el)이 돌려주는 것입니다. el.style은 다릅니다. 그것은 인라인 style 속성에 적힌 것만 보여 줍니다. 둘을 헷갈리면 '값을 읽었는데 빈 문자열'이 됩니다.",
          },
        ],
      },
      {
        label: "CSS는 파서를 막지 않지만 그리기를 막는다",
        body: "<link rel=stylesheet>를 만나도 파서는 계속 갑니다. DOM은 CSS 없이도 만들 수 있기 때문입니다. 그러나 사양은 파서가 만든 스타일시트를 '렌더링을 막는 요소 집합'에 넣습니다. 그 집합이 비기 전에는 문서를 그리지 않습니다. 스타일 없는 화면이 먼저 번쩍이는 것(FOUC)을 막기 위해서입니다. 사양의 말로는 '문서의 렌더링 차단 요소 집합이 비어 있지 않으면' 문서는 렌더링이 막힌 상태입니다. 그래서 CSS가 늦으면 둘이 늦습니다. 5장의 사슬로 뒤의 스크립트가 늦고, 이 집합으로 첫 페인트가 늦습니다. 실제로 돌려 보면 CSS가 700ms 늦은 페이지의 첫 페인트는 764ms였습니다. 미디어 쿼리가 맞지 않는 시트(media=print)는 받긴 하지만 렌더링을 막지 않습니다.",
        code: "<link rel=stylesheet href=slow.css>   ─▶ 파서: 계속 간다 (DOM 은 CSS 없이도 만든다)\n                                       ─▶ 렌더링 차단 요소 집합에 들어간다 → 올 때까지 첫 페인트 없음\n                                       ─▶ 스크립트 차단 스타일시트 집합에 들어간다 → 뒤의 스크립트가 기다린다 (5장)\n\n시간   17ms          713ms            733ms       764ms\n       파서 시작      slow.css 도착     파싱 끝      첫 페인트     ← CSS 가 700ms 늦으면 첫 픽셀도 그만큼 늦다\n\n막지 않는 것:  <link media=\"print\">,  JS 가 끼운 <link>,  <link rel=preload as=style>",
        codeLang: "text",
        terms: [
          {
            term: "렌더링 차단 (render-blocking)",
            body: "어떤 자원이 올 때까지 브라우저가 첫 화면을 그리지 않는 것입니다. 파서가 만든 스타일시트가 기본으로 이것입니다. 파서를 막는 것(5장의 스크립트)과 다릅니다. 파서는 가고 DOM은 만들어지는데 화면에만 안 올립니다. 스타일 없는 글자가 먼저 보였다가 바뀌는 깜빡임(FOUC)을 피하려는 설계입니다.",
          },
        ],
      },
      {
        label: "문제: 특이도 싸움 끝에 !important 가 쌓인다",
        body: "버튼 색을 바꾸려고 .btn-primary { color: white }를 적었는데 안 먹습니다. 라이브러리가 #app .btn { color: #333 }으로 적어 두었습니다. id가 하나 있어 (1,0,1)이고, 내 것은 (0,1,0)입니다. 클래스를 아무리 붙여도 못 이깁니다. 결국 !important를 붙입니다. 다음 사람은 그것을 이기려고 또 !important를 붙입니다. 몇 년 뒤 스타일시트의 반이 !important입니다. 캐스케이드의 네 단계 중 특이도 한 단계만 알고 싸운 결과입니다. 처방은 위 단계에 있습니다. @layer로 라이브러리를 아래 층에 두면 특이도와 무관하게 내 층이 이깁니다.",
      },
      {
        label: "문제가 나는 경우: 캐스케이드와 시점이 꼬이는 자리",
        body: "경우 ㄱ, 특이도 싸움입니다. 위의 사고입니다. 경우 ㄴ, FOUC입니다. CSS를 body 끝이나 자바스크립트로 넣으면 그 전에 그려진 화면이 스타일 없이 번쩍입니다. 반대로 head의 큰 CSS는 첫 페인트를 그만큼 늦춥니다. 둘은 같은 저울의 양끝입니다. 경우 ㄷ, @import 사슬입니다. a.css 안의 @import b.css는 a가 와서 파싱된 뒤에야 요청됩니다. 직렬입니다. 세 단계면 세 번 왕복합니다. 경우 ㄹ, 상속의 착각입니다. color는 상속되고 background는 안 됩니다. font-size: 1.2em을 중첩하면 복리로 커집니다. rem이 생긴 이유입니다. 경우 ㅁ, el.style과 getComputedStyle의 혼동입니다. 실제로 돌려 보면 target.style.color는 빈 문자열이고 getComputedStyle(target).color는 rgb(255, 0, 0)이었습니다. 경우 ㅂ, 셀렉터 비용입니다. * 후손 셀렉터나 넓은 :has()는 요소마다 조상을 거꾸로 훑습니다. 큰 DOM에서 스타일 재계산이 길어집니다. 경우 ㅅ, getComputedStyle의 부작용입니다. 스타일이 더러워진 상태에서 읽으면 그 순간 스타일 계산(때로 레이아웃까지)을 강제합니다. 7장의 강제 동기 레이아웃과 같은 모양입니다. 경우 ㅇ, 재계산 범위입니다. body의 클래스를 토글하면 그 아래 전부가 다시 계산됩니다. 테마 전환이 큰 페이지에서 수십 ms를 먹는 이유입니다.",
        code: "경우           언제 생기나                        겉모습                                 들통나는 때\nㄱ 특이도 싸움    라이브러리가 id 셀렉터를 씀            내 클래스가 안 먹음 → !important 누적       덮어쓰려 할 때마다\nㄴ FOUC / 늦은 페인트  CSS 를 body 끝에 · head 에 큰 CSS     스타일 없이 번쩍 / 흰 화면 길어짐           느린 망에서\nㄷ @import 사슬   a.css → @import b.css → @import c.css  직렬 왕복 세 번                         워터폴에서 계단\nㄹ 상속 착각      em 중첩, background 상속 기대          글자가 복리로 커짐 / 배경이 안 따라옴       중첩 깊은 컴포넌트\nㅁ style vs computed  el.style.color 를 읽음                 ''  (계산된 값은 rgb(255, 0, 0))          값이\n                                                               비어 보일 때\nㅂ 셀렉터 비용    * 후손, 넓은 :has()                    스타일 재계산이 길다                     큰 DOM 에서\nㅅ 읽기의 부작용  더러운 상태에서 getComputedStyle        그 자리에서 강제 계산                     루프 안에서 읽을 때\nㅇ 재계산 범위    body 클래스 토글                        아래 전부 재계산                        테마 전환이 느릴 때\n\n// ㄱ 의 처방 — 특이도 위의 단계를 쓴다\n@layer vendor, app;\n@layer vendor { #app .btn { color: #333 } }      /* 아래 층 */\n@layer app    { .btn-primary { color: white } }  /* 위 층이 특이도와 무관하게 이긴다 */",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 계산된 스타일은 DOM 과 CSSOM 의 곱이다",
        body: "DOM은 '무엇이 있나'이고 CSSOM은 '어떻게 보이나'입니다. 둘은 따로 파싱되고 따로 바뀝니다. 계산된 스타일은 그 둘을 곱한 결과입니다. 요소 수 × 규칙 수만큼의 매칭을 거칩니다. 그래서 어느 쪽이 바뀌어도 곱을 다시 해야 합니다. 요소를 하나 넣으면 그 요소에 모든 규칙을 대어 보고(ㅂ), 클래스를 하나 바꾸면 영향받는 요소를 전부 다시 계산합니다(ㅇ). 캐스케이드는 이 곱에서 충돌을 푸는 규칙인데, 네 단계 중 특이도 하나만 알면 그 단계 안에서만 싸우게 됩니다(ㄱ). 그리고 CSSOM이 완성되기 전에는 곱이 틀리므로, 브라우저는 그리기를 막고(ㄴ) 스크립트를 막습니다(5장). 처방은 세 방향입니다. 충돌은 위 단계(@layer)에서 풀고, CSS는 작게 빨리 오게 하고(head에, @import 없이, 미디어별로 나눠), 읽기와 쓰기를 섞지 않습니다.",
        code: "DOM (무엇이 있나)        ×        CSSOM (어떻게 보이나)        =        계산된 스타일 (요소마다 모든 속성)\n요소 N 개                           규칙 M 개                           매칭 N×M, 충돌은 캐스케이드로\n\n한쪽이 바뀌면                        다시 계산되는 범위\n요소 하나 추가                       그 요소 × 모든 규칙                    → ㅂ (규칙이 넓으면 비싸다)\nbody 클래스 토글                     body 아래 전부 × 모든 규칙              → ㅇ\n규칙 하나 추가 (<style> 삽입)          모든 요소 × 그 규칙                    → 스타일 재계산 전체\n\n충돌 (캐스케이드 네 단계)             ① 출처·중요도  ② 레이어  ③ 특이도  ④ 순서\n                                   ③ 만 알고 싸우면 → ㄱ.  ② 로 올라가면 끝난다\n\nCSSOM 이 미완성이면 곱이 틀리다      → 그리기를 막는다 (ㄴ) · 스크립트를 막는다 (5장)",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "요소마다 모든 속성의 값이 정해졌습니다. display, width, margin, font-size 전부입니다. 그런데 아직 아무것도 자리가 없습니다. '이 상자가 어디에, 얼마나 크게'는 다음 단계가 정합니다. DOM과 계산된 스타일을 합쳐 레이아웃 트리를 만들고, 폭은 위에서 아래로, 높이는 아래에서 위로 흘려 보내며 상자마다 좌표를 매깁니다. 그 과정에서 글자의 폭이 필요해지고, 그것은 폰트가 정합니다.",
      },
      {
        label: "확인 질문",
        body: "<div id=\"a\" class=\"x y z\" style=\"color: blue\">에 규칙 셋이 있습니다. #a { color: red } .x.y.z { color: green } div { color: purple !important }. 글자는 무슨 색일까요? 그리고 el.style.color와 getComputedStyle(el).color는 각각 무엇을 돌려줄까요?",
        notes: [
          {
            title: "답",
            body: "purple입니다. 캐스케이드의 첫 단계가 출처와 중요도입니다. 작성자 !important는 작성자 보통 선언(인라인 style 포함) 전부를 이깁니다. 특이도는 그다음 단계라 div의 (0,0,1)이 낮아도 상관없습니다. !important가 없었다면 인라인 style이 가장 높은 특이도로 쳐서 blue였을 것입니다. el.style.color는 'blue'입니다. 인라인에 적힌 것만 보입니다. getComputedStyle(el).color는 'rgb(128, 0, 128)'입니다. 계산된 값이고 색 이름이 아니라 rgb로 나옵니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "CSS Cascading and Inheritance Level 5 — Cascade Sorting Order", href: "https://www.w3.org/TR/css-cascade-5/#cascade-sort" },
      { label: "WHATWG HTML — Render-blocking mechanism", href: `${HTML}/dom.html#render-blocking-mechanism` },
      { label: "MDN — CSS Object Model (CSSOM)", href: `${MDN}/API/CSS_Object_Model` },
      { label: "MDN — Window.getComputedStyle()", href: `${MDN}/API/Window/getComputedStyle` },
      { label: "Chrome — Inside look at modern web browser, part 3 (Style calculation)", href: `${CHROME}/inside-browser-part3` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s7",
    name: "7장 · 레이아웃: 상자의 자리와 크기",
    tagline: "폭은 위에서 내려오고, 높이는 아래에서 올라온다. 글자 폭은 폰트에서 온다",
    intro:
      "DOM과 계산된 스타일을 합쳐 레이아웃 트리를 만듭니다. Chrome의 말로는 display: none인 요소는 '레이아웃 트리에 들지 않고', ::before 같은 가상 요소는 'DOM에 없어도 레이아웃 트리에 든다'. 그 트리의 상자마다 자리와 크기를 정하는 것이 레이아웃입니다. 블록은 부모의 폭을 받아 자기 폭을 정하고, 안의 글자를 그 폭에 맞춰 줄로 나누고, 그 줄 수로 높이가 정해져 부모에게 올려 보냅니다. 폭은 내려오고 높이는 올라옵니다. 그래서 한 값을 바꾸면 연결된 상자들이 다시 계산됩니다. 자바스크립트가 중간에 크기를 읽으면 그 순간 계산을 끝까지 해야 합니다. 실제로 돌려 보면 그 차이가 75배였습니다. 이 장의 질문은 둘입니다. 상자의 크기는 어디서 오는가. 그리고 왜 읽기 하나가 비싼가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 레이아웃 트리 → 상자마다 (x, y, 폭, 높이)",
        body: "먼저 트리를 만듭니다. DOM 노드마다 계산된 display를 보고 상자를 만듭니다. none이면 상자가 없습니다. ::before·::after는 상자가 있습니다. 블록 안에 글자가 바로 있으면 익명 인라인 상자가, 블록과 인라인이 섞이면 익명 블록 상자가 끼어듭니다. 각 상자는 포매팅 컨텍스트 안에 놓입니다. 블록(위에서 아래로 쌓임), 인라인(줄 안에서 왼쪽에서 오른콝으로 흐름), 플렉스, 그리드, 테이블입니다. 그다음 치수를 정합니다. 블록의 폭은 포함 블록(보통 부모)에서 내려옵니다. width: auto면 부모 폭에서 마진·테두리·패딩을 뺀 값입니다. 그 폭 안에서 글자를 줄로 나눕니다. 글자의 폭은 폰트가 정합니다(8장). 줄 수와 줄 높이로 상자의 높이가 정해지고, 그 높이가 부모로 올라가 부모의 높이가 됩니다. 결과는 상자마다의 좌표와 크기입니다. Chrome은 이것을 조각(fragment) 트리로 둡니다. 레이아웃은 전체를 매번 다시 하지 않습니다. 더러워진(바뀐) 상자와 그 영향 범위만 다시 합니다.",
        code: "DOM + 계산된 스타일                       레이아웃 트리 (상자)                         결과: 조각 (x, y, w, h)\n<div class=\"card\">                       BlockBox .card                              (0, 0, 320, 88)\n  <span hidden>…</span>  display:none      (상자 없음)\n  ::before { content: '★' }              InlineBox ::before  ← DOM 에는 없다\n  \"제목 글자\"                             AnonymousInlineBox → 줄 상자 2개              줄 높이 20 × 2 = 40\n  <p>본문</p>                              BlockBox p                                  (0, 44, 320, 44)\n</div>\n\n폭은 내려온다:   body 폭 → .card 폭 (auto = 부모 - margin - border - padding) → p 폭\n높이는 올라온다:  글자 줄 수 → p 높이 → .card 높이 → body 높이\n글자 폭은 옆에서 온다:  폰트 (8장)\n\n박스 모델:  margin [ border [ padding [ content ] ] ]     box-sizing: border-box 면 width 가 border\n                                                        까지를 가리킨다",
        codeLang: "text",
        terms: [
          {
            term: "레이아웃 트리 (layout tree)와 익명 상자",
            body: "DOM 노드에 계산된 스타일을 입혀 만든 '그릴 상자'의 트리입니다. DOM과 1:1이 아닙니다. display: none은 빠지고, ::before는 들어오고, 블록 안의 날 글자는 익명 인라인 상자로 싸입니다. 개발자 도구 Layout 탭이 보여 주는 것이 이 트리입니다. 옛 이름은 렌더 트리입니다.",
          },
          {
            term: "포매팅 컨텍스트 (formatting context)",
            body: "상자들이 어떤 규칙으로 놓이는지 정하는 틀입니다. 블록 포매팅 컨텍스트에서는 위에서 아래로 쌓이고 마진이 겹칩니다. 인라인에서는 줄 안에서 흐릅니다. 플렉스·그리드는 자기 규칙으로 자식을 배치합니다. 한 상자가 새 컨텍스트를 만들면(overflow: hidden, display: flow-root 등) 그 안의 마진 겹침과 플로트가 밖으로 새지 않습니다.",
          },
          {
            term: "포함 블록 (containing block)",
            body: "어떤 상자의 폭(%)과 위치(position: absolute의 top/left)를 재는 기준이 되는 조상 상자입니다. 보통은 가장 가까운 블록 조상입니다. position: absolute면 가장 가까운 position이 static이 아닌 조상이고, fixed면 뷰포트입니다. 단, 조상에 transform이 있으면 fixed의 기준이 그 조상으로 바뀝니다. 그래서 transform 아래의 fixed가 '고정되지 않는' 사고가 납니다.",
          },
        ],
      },
      {
        label: "강제 동기 레이아웃: 쓰고 읽으면 그 자리에서 계산한다",
        body: "스타일을 바꾸면 브라우저는 바로 레이아웃하지 않습니다. 더럽다고 표시만 해 두고, 다음 프레임의 '스타일 → 레이아웃' 단계에서 한꺼번에 합니다(10장). 그런데 자바스크립트가 offsetWidth, getBoundingClientRect, scrollTop 같은 치수를 읽으면 브라우저는 틀린 값을 줄 수 없습니다. 그 순간 더러운 것을 전부 계산합니다. 이것이 강제 동기 레이아웃입니다. 쓰기와 읽기를 번갈아 하면 매번 계산합니다. 레이아웃 스래싱입니다. 실제로 돌려 보면 폭을 바꾸고 offsetWidth를 읽는 것을 2,000번 반복하면 14.9ms, 2,000번 바꾸고 한 번만 읽으면 0.2ms였습니다. 75배입니다. 치수를 읽는 API의 목록은 길지만 모양은 하나입니다. '지금 자리와 크기를 묻는 것'입니다.",
        code: "// 실제로 돌려 보면 (Chrome 156, 60×60 상자 하나)\nfor (i of 2000) { el.style.width = (60 + i % 7) + 'px'; void el.offsetWidth; }   // 14.9ms   ← 쓰기→읽기\n                                                                                 반복: 매번 레이아웃\nfor (i of 2000) { el.style.width = (60 + i % 7) + 'px'; }  void el.offsetWidth;    //  0.2ms   ← 몰아\n  쓰고 한 번 읽기\n\n레이아웃을 강제하는 읽기 (모양은 하나: '지금 자리와 크기를 묻는다')\n  el.offsetWidth / offsetHeight / offsetTop / offsetLeft / offsetParent\n  el.clientWidth / clientHeight / clientTop / clientLeft\n  el.scrollWidth / scrollHeight / scrollTop / scrollLeft      (scrollTop 은 쓰기도 강제한다)\n  el.getBoundingClientRect() / getClientRects()\n  window.innerWidth / scrollX / getComputedStyle(el).width 처럼 레이아웃에 의존하는 속성\n  el.focus() / range.getBoundingClientRect() / 일부 input 의 selectionStart\n\n안전한 순서:  읽기를 전부 먼저 → 쓰기를 전부 나중   (또는 requestAnimationFrame 안에서 읽고, 다음 rAF 에서 쓴다)",
        codeLang: "text",
        terms: [
          {
            term: "강제 동기 레이아웃 (forced synchronous layout)과 레이아웃 스래싱",
            body: "브라우저는 바뀐 스타일을 모아 두고 다음 프레임에 한 번 레이아웃합니다. 그런데 자바스크립트가 치수를 읽으면 그 자리에서 즉시 계산해야 합니다. 그것이 강제 동기 레이아웃입니다. 쓰기와 읽기를 번갈아 반복해 매번 계산하게 만드는 것을 레이아웃 스래싱이라 합니다. 실제로 돌려 보면 같은 일이 75배 차이였습니다.",
          },
        ],
      },
      {
        label: "문제: 이미지가 오면 아래 글자가 밀려 내려간다",
        body: "상품 목록 페이지입니다. 이미지에 width와 height를 적지 않았습니다. 처음 레이아웃할 때 이미지 상자는 높이 0입니다. 그 아래 글자가 위에 붙어 그려집니다. 이미지가 도착하면 상자가 240px이 되고, 아래 글자가 전부 240px 밀려 내려갑니다. 사용자가 누르려던 버튼이 그 순간 자리를 바꿉니다. 레이아웃 시프트입니다. 높이는 아래에서 올라오는데, 올라올 값이 나중에 도착했습니다. 처방은 값이 오기 전에 자리를 비워 두는 것입니다. width·height 속성이나 aspect-ratio입니다.",
      },
      {
        label: "문제가 나는 경우: 의존이 꼬이는 자리",
        body: "경우 ㄱ, 레이아웃 스래싱입니다. 위의 75배입니다. 목록의 각 항목 높이를 읽고 바로 아래 항목의 top을 쓰는 루프가 전형입니다. 경우 ㄴ, 레이아웃 시프트입니다. 위의 사고입니다. 이미지뿐 아니라 웹폰트 교체(8장), 늦게 끼우는 배너, 쿠키 안내 띠도 같은 모양입니다. 경우 ㄷ, height: 100%가 안 먹습니다. 부모의 높이가 auto면 자식의 %는 기준이 없습니다. 높이는 올라오는 값이라 부모가 자식을 기다리고 자식이 부모를 기다립니다. 경우 ㄹ, 마진 겹침입니다. 위아래 블록의 마진은 더해지지 않고 큰 쪽 하나가 됩니다. 부모의 첫 자식 마진이 부모 밖으로 새기도 합니다. 경우 ㅁ, 인라인에 width입니다. <span>에 width를 적어도 무시됩니다. 인라인 상자의 폭은 내용이 정합니다. 경우 ㅂ, display: none과 visibility: hidden입니다. 앞은 상자가 없어 트랜지션이 안 되고, 뒤는 상자가 있어 자리를 차지합니다. 경우 ㅅ, transform 아래의 position: fixed입니다. 포함 블록이 뷰포트에서 그 조상으로 바뀌어 고정이 풀립니다. 경우 ㅇ, 자동 테이블입니다. table-layout: auto는 모든 셀의 내용을 읽어야 열 폭이 정해집니다. 큰 표가 느린 이유이고, fixed로 바꾸면 첫 행만 봅니다.",
        code: "경우        언제 생기나                        겉모습                              들통나는 때\nㄱ 스래싱     읽기·쓰기 번갈아 반복                같은 일이 75배 느림 (14.9 vs 0.2ms)     목록·표를 JS 로 정렬할 때\nㄴ 레이아웃 시프트  이미지·폰트·배너가 늦게 와 높이가 바뀜   아래가 밀려 내려감. 누르려던 버튼이 도망   느린 망, CLS 지표\nㄷ height: 100%  부모 높이가 auto                   자식 높이가 0 또는 내용만큼              세로 중앙 정렬할 때\nㄹ 마진 겹침  위아래 블록 마진 20 + 20           40 이 아니라 20. 첫 자식 마진이 부모 밖으로  간격이 '안 맞을' 때\nㅁ 인라인 width  <span style=\"width:100px\">        무시된다                            span 으로 상자를 만들 때\nㅂ none vs hidden  display:none 에 transition         안 된다 (상자가 없다) / hidden 은 자리 차지  페이드 인이 안\n                                                     될 때\nㅅ transform + fixed  조상에 transform                   fixed 가 그 조상 기준으로 바뀜            모달·헤더가\n                                                       '고정 안 될' 때\nㅇ 자동 테이블  수천 행 table-layout: auto          열 폭 정하려고 전부 읽음 → 느림          큰 표\n\n// ㄴ 의 처방 — 값이 오기 전에 자리를 비워 둔다\n<img src=\"…\" width=\"320\" height=\"240\">          또는   img { aspect-ratio: 4 / 3; width: 100% }",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 레이아웃은 의존 그래프를 푸는 일이다",
        body: "상자 하나의 크기는 세 방향에서 옵니다. 폭은 위(포함 블록)에서, 높이는 아래(내용)에서, 글자 폭은 옆(폰트)에서입니다. 그래서 상자들은 의존 그래프로 묶여 있습니다. 한 값이 바뀌면 그래프에서 연결된 것들이 다시 풀립니다. 이것이 리플로우입니다. 자바스크립트가 중간에 값을 읽으면 그 시점에 그래프를 끝까지 풀어야 합니다(ㄱ). 값이 늦게 도착하면 그래프가 두 번 풀리고 그 차이가 화면에 보입니다(ㄴ). 부모와 자식이 서로를 기다리면 풀리지 않습니다(ㄷ). 처방은 그래프를 알고 끊는 것입니다. 읽기와 쓰기를 모아 그래프를 한 번만 풀고, 늦게 올 값은 자리를 미리 잡아 그래프가 바뀌지 않게 하고, 순환은 한쪽에 고정값을 줘서 끊습니다.",
        code: "상자의 크기는 세 방향에서 온다\n            폭 ↓ (포함 블록에서)\n               ┌──────────────┐\n글자 폭 → (폰트) │   이 상자     │\n               └──────────────┘\n            높이 ↑ (내용에서)\n\n의존 그래프:  body.w → card.w → p.w → 줄바꿈(폰트) → p.h → card.h → body.h\n\n한 값이 바뀌면        다시 풀리는 것                         사고\nJS 가 중간에 읽는다    그 시점에 그래프 전체                  ㄱ 강제 동기 레이아웃\n값이 늦게 도착        그래프가 두 번 풀리고 차이가 보인다        ㄴ 레이아웃 시프트\n부모 h ← 자식 h ← 부모 h   순환. 풀리지 않는다                ㄷ height: 100%\n\n처방:  읽기 모아서 → 쓰기 모아서 (한 번만 푼다) · 자리를 미리 잡는다 (그래프가 안 바뀌게) · 순환은 고정값으로 끊는다",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "이 장에서 '글자 폭은 폰트에서 온다'고 한 줄로 넘겼습니다. 그 한 줄이 다음 장입니다. 글자 하나의 폭과 모양은 문자열에 없습니다. 어느 폰트 파일을 쓰는지, 그 폰트가 이웃 글자와 어떻게 붙는지, 어디서 줄을 끊는지, 외곽선을 어떻게 픽셀로 바꾸는지가 전부 정해져야 폭이 나옵니다. 실제로 돌려 보면 같은 문장이 폰트에 따라 19% 달랐고, 등폭 폰트의 한글은 등폭이 아니었습니다.",
      },
      {
        label: "확인 질문",
        body: "목록의 각 항목을 순서대로 돌며 item.style.top = prevBottom + 'px'; prevBottom = item.getBoundingClientRect().bottom; 을 100개 항목에 돕니다. 레이아웃은 몇 번 일어날까요? 한 번으로 줄이려면 어떻게 바꿔야 할까요?",
        notes: [
          {
            title: "답",
            body: "100번입니다. 쓰기(top)로 더러워진 뒤 읽기(getBoundingClientRect)가 오니 매 항목마다 레이아웃을 강제합니다. 한 번으로 줄이려면 읽기와 쓰기를 가릅니다. 먼저 모든 항목의 높이를 읽어 배열에 담고(처음 한 번만 레이아웃), 그다음 모든 top을 씁니다(더러워지지만 아무도 읽지 않으니 다음 프레임에 한 번). 또는 각 항목의 높이를 미리 알 수 있으면(고정 높이) 읽기 자체를 없앱니다. 실제로 돌려 보면 같은 모양의 차이가 75배였습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Chrome — Inside look at modern web browser, part 3 (Layout)", href: `${CHROME}/inside-browser-part3` },
      { label: "Chrome — RenderingNG architecture (LayoutNG, fragment tree)", href: "https://developer.chrome.com/docs/chromium/renderingng-architecture" },
      { label: "MDN — Introduction to the CSS box model", href: `${MDN}/CSS/CSS_box_model/Introduction_to_the_CSS_box_model` },
      { label: "web.dev — Cumulative Layout Shift (CLS)", href: "https://web.dev/articles/cls" },
      { label: "Paul Irish — What forces layout / reflow", href: "https://gist.github.com/paulirish/5d52fb081b3570c81e3a" },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s8",
    name: "8장 · 글자가 그려지는 길: 폰트, 셰이핑, 줄바꿈",
    tagline: "글자의 모양과 폭은 문자열에 없다. 폰트와 셰이퍼와 OS 에 있다",
    intro:
      "텍스트 노드의 문자열은 UTF-16 코드 단위의 나열입니다. 그 안에는 '한'이라는 글자의 모양도 폭도 없습니다. 브라우저는 이 문자열을 다섯 단계로 그립니다. 먼저 같은 글꼴·같은 문자 체계·같은 방향으로 이어지는 덩어리(런)로 나눕니다. 글자마다 글리프를 가진 폰트를 찾습니다(폰트 매칭과 폴백). 폰트의 규칙에 따라 글자를 글리프로 바꾸고 자리를 잡습니다(셰이핑). 상자 폭에 맞춰 줄을 끊습니다(줄바꿈). 글리프의 외곽선을 픽셀로 바꿉니다(래스터). 실제로 돌려 보면 같은 문장이 폰트에 따라 180.7px에서 216.7px까지 달랐고, 등폭 폰트의 한글 네 글자는 영문 네 글자보다 44% 넓었고, 한글 음절을 자모로 풀어 쓴 문자열(NFD)은 조합형과 폭이 같았습니다. 한국어 문장은 어디서든 끊을 수 있어 keep-all을 쓰면 상자를 넘칩니다. 이 장의 질문은 하나입니다. 글자 하나의 폭은 어디서 정해지는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 코드 포인트 → 런 → 폰트 → 글리프 → 줄 → 픽셀",
        body: "첫째, 분절입니다. 문자열을 문자 체계(한글, 라틴, 한자)와 방향(왼→오, 오→왼)과 쓸 폰트가 같은 덩어리로 나눕니다. '브라우저가 한국어 Hello 123'은 한글 런, 라틴 런, 숫자 런으로 갈립니다. 둘째, 폰트 매칭입니다. CSS Fonts 사양의 말로는 브라우저가 'font-family 목록을 순서대로 훑어, 그 글자의 글리프를 가진 폰트를 찾을 때까지' 갑니다. 글자마다입니다. 목록에 없으면 시스템 폴백 폰트로 갑니다. 그래서 한 문장 안에 폰트가 둘 이상 섞일 수 있습니다. 셋째, 셰이핑입니다. HarfBuzz 같은 셰이퍼가 합니다. HarfBuzz 문서의 정의로는 '문자 코드의 열을 적절히 배치된 글리프의 열로 바꾸는 과정'입니다. 폰트의 표(GSUB, GPOS)를 보고 합자(fi → ﬁ), 결합 문자, 문맥형, 커닝을 적용합니다. 한글 자모 셋을 음절 하나의 글리프로 모으는 것도 여기입니다. 결과는 글리프 ID와 각 글리프의 전진 폭(advance)입니다. 넷째, 줄바꿈입니다. 전진 폭을 더해 가다 상자 폭을 넘기면 끊을 수 있는 자리에서 끊습니다. 어디서 끊을 수 있는지는 유니코드 줄바꿈 규칙(UAX #14)과 CSS의 word-break, overflow-wrap, hyphens가 정합니다. 다섯째, 래스터입니다. 글리프의 베지어 외곽선을 비트맵으로 바꿉니다. 안티에일리어싱, 서브픽셀 위치, 힌팅이 여기서 들어가고, OS마다 다릅니다. 비트맵은 글리프 캐시(아틀라스)에 담겨 9장의 페인트에서 쓰입니다.",
        code: "\"브라우저가 한국어 Hello 123\"            UTF-16 코드 단위 17개. 모양도 폭도 아직 없다\n   │ ① 분절 (itemize)\n   ▼\n[한글 런: 브라우저가 한국어] [라틴 런: Hello] [숫자 런: 123]        문자 체계·방향·폰트가 같은 덩어리\n   │ ② 폰트 매칭 — 글자마다 font-family 목록을 순서대로, 글리프가 있는 첫 폰트. 없으면 시스템 폴백\n   ▼\n[Pretendard: 브라우저가 한국어] [Pretendard: Hello] [Pretendard: 123]     (한 폰트에 다 있으면 하나, 없으면 섞인다)\n   │ ③ 셰이핑 (HarfBuzz) — 글자 → 글리프 ID + 전진 폭.  합자·결합·문맥형·커닝.  ㅎ+ㅏ+ㄴ → '한' 글리프 하나\n   ▼\n글리프 열:  [g812 adv 15.6] [g1203 adv 15.6] … [g45 adv 10.2 (H)] [g72 adv 8.9 (e)] …\n   │ ④ 줄바꿈 — 전진 폭을 더하다 상자 폭을 넘으면 끊을 수 있는 자리에서 (UAX #14 + word-break/overflow-wrap)\n   ▼\n줄 1: 브라우저가 한국어 Hello    줄 2: 123\n   │ ⑤ 래스터 — 외곽선 → 비트맵 (안티에일리어싱, 서브픽셀 위치, 힌팅; OS 마다 다름) → 글리프 아틀라스\n   ▼\n9장 페인트가 아틀라스의 비트맵을 자리에 찍는다",
        codeLang: "text",
        terms: [
          {
            term: "글리프 (glyph)",
            body: "폰트 파일 안에 든 글자 모양 하나입니다. 문자(코드 포인트)와 1:1이 아닙니다. 'fi' 두 문자가 합자 글리프 하나가 되기도 하고, 한글 자모 세 문자가 음절 글리프 하나가 되기도 하고, 아랍 문자 하나가 자리에 따라 네 가지 글리프가 되기도 합니다. 폭(전진 폭)은 글리프에 붙어 있습니다. 그래서 폭은 폰트가 정합니다.",
          },
          {
            term: "셰이핑 (shaping)과 HarfBuzz",
            body: "문자열을 폰트의 규칙대로 글리프 열과 위치로 바꾸는 일입니다. 폰트 안의 치환 표(GSUB)와 위치 표(GPOS)를 읽어 합자, 결합 문자 얹기, 문맥에 따른 모양 바꾸기, 커닝을 합니다. HarfBuzz는 Chrome·Firefox·Android가 쓰는 셰이핑 라이브러리입니다. 한글 음절을 자모로 풀어 쓴 문자열(NFD)이 조합형(NFC)과 같은 모양·같은 폭이 되는 것도 셰이퍼가 모아 주기 때문입니다.",
          },
          {
            term: "폰트 매칭 (font matching)과 폴백 (fallback)",
            body: "글자마다 '이 글자의 글리프를 가진 폰트'를 font-family 목록 순서로 찾는 일입니다. 영문 폰트를 첫째로 두고 한글을 적으면 한글은 그 폰트에 없어 둘째 폰트나 시스템 폰트로 갑니다. 그래서 한 줄에 폰트 둘이 섞이고, 획 두께와 높이가 어긋납니다. 폴백은 목록에 없을 때 OS가 고르는 마지막 폰트입니다. lang 속성이 그 선택에 쓰입니다.",
          },
        ],
      },
      {
        label: "폰트가 폭을 정한다 — 실제로 돌려 보면",
        body: "canvas의 measureText로 같은 문장의 폭을 재었습니다. 16px 기준으로 serif 214.5px, sans-serif 180.7px, monospace 216.7px, system-ui 186.5px입니다. 가장 넓은 것과 좁은 것이 19% 차이입니다. 폰트가 바뀌면 줄바꿈이 바뀌고, 줄 수가 바뀌고, 상자 높이가 바뀌고(7장), 아래가 밀립니다. 등폭 폰트도 등폭이 아닙니다. monospace로 'abcd' 네 글자는 38.5px, '한글한글' 네 글자는 55.4px, 'ab한글'은 46.9px입니다. 영문 등폭 폰트에 한글 글리프가 없어 폴백 폰트가 끼어들고, 그 폰트의 한글은 전각 폭입니다. 코드 블록의 표가 한글이 들어가면 어긋나는 이유가 이것입니다. 이 블로그의 표도 그렇습니다. 한글 음절 '한글'(NFC, 길이 2)과 자모로 푼 것(NFD, 길이 6)은 둘 다 27.7px입니다. 셰이퍼가 자모를 모아 같은 글리프를 골랐습니다. document.fonts.check('16px NoSuchFont')는 true입니다. 없는 폰트인데 참입니다. check는 '이 글자들을 그 폰트로 그릴 수 있는 상태인가'를 묻고, 폴백으로라도 그릴 수 있으면 참을 줍니다. 폰트가 정말 있는지는 알 수 없습니다.",
        code: "// canvas.measureText, 16px  (Chrome 156, macOS)\n\"브라우저가 한국어 Hello 123\"    serif 214.5   sans-serif 180.7   monospace 216.7   system-ui 186.5     ← 최대\n  19% 차이\n\n// 등폭(monospace) 폰트에서 네 글자\n'abcd'      38.5px        ← 9.6px × 4\n'한글한글'   55.4px        ← 13.9px × 4   폴백 폰트의 전각. 등폭이 아니다\n'ab한글'    46.9px        ← 한 줄에 두 폰트\n\n// 조합형 vs 풀어쓰기\n'한글'.length                       2     폭 27.7px\n'한글'.normalize('NFD').length      6     폭 27.7px   ← 셰이퍼가 자모를 모아 같은 글리프로\n\n// 글자 수\n'👨‍👩‍👧 한글'.length                                      11   (UTF-16 단위)\n[...new Intl.Segmenter('ko', {granularity:'grapheme'}).segment('👨‍👩‍👧 한글')].length   4    (눈에 보이는 글자)\n\n// 폰트 존재 확인은 안 된다\ndocument.fonts.check('16px NoSuchFont')   // true  ← 폴백으로 그릴 수 있으면 참",
      },
      {
        label: "줄바꿈: 한국어는 어디서든 끊을 수 있다",
        body: "줄을 끊을 수 있는 자리는 유니코드 규칙(UAX #14)이 글자 종류별로 정합니다. 라틴 문자는 공백과 하이픈에서, 한자·가나는 글자 사이 거의 어디서나입니다. 한글은 둘 다 됩니다. CSS Text 사양은 word-break: normal에서 '한국어는 두 가지 동작을 보이는데, 연속한 한글·한자 사이 어디서나 끊는 것을 허용한다'고 적고, keep-all은 '한중일 글자의 연속은 끊지 않는다'며 '이것이 (낱말 사이에 공백을 쓰는) 한국어의 다른 흔한 동작'이라고 적습니다. 즉 기본값은 글자 단위, keep-all은 어절 단위입니다. 어절 단위가 읽기는 좋지만 긴 어절이 상자보다 넓으면 넘칩니다. 실제로 돌려 보면 140px 상자에 긴 어절이 든 문장을 넣었을 때 normal은 4줄로 들어갔고, keep-all은 2줄이지만 폭이 318px로 넘쳤습니다. keep-all에 overflow-wrap: anywhere를 더하면 다시 4줄로 들어갑니다. 끊을 자리가 없을 때만 글자 사이를 허용하는 것입니다. 공백 없는 긴 URL도 같습니다. 기본은 1줄로 넘치고 anywhere면 4줄입니다.",
        code: "140px 상자, 16px.  \"국제화와지역화는문장을코드에서떼어내는일입니다 그리고 다음 낱말\"\n\n설정                                   줄 수    scrollWidth    모양\nword-break: normal (기본)                4       140           글자 사이 어디서나 끊는다. 어절이 갈린다\nword-break: keep-all                     2       318 (넘침)     어절 사이(공백)에서만. 긴 어절이 상자를 넘는다\nkeep-all + overflow-wrap: anywhere       4       140           공백에서 끊되, 안 되면 글자 사이를 허용\n\n\"https://example.com/very/long/path/without/spaces/anywhere\"\noverflow-wrap 기본                       1       넘침           끊을 자리가 없다\noverflow-wrap: anywhere                  4       140\n\n규칙의 출처:  UAX #14 (유니코드 줄바꿈)  +  CSS Text (word-break · overflow-wrap · hyphens · white-space)",
        codeLang: "text",
        terms: [
          {
            term: "word-break: keep-all과 overflow-wrap: anywhere",
            body: "keep-all은 한중일 글자 사이에서 끊지 않고 공백에서만 끊습니다. 한국어를 어절 단위로 읽게 해 주지만 긴 어절은 상자를 넘습니다. overflow-wrap: anywhere는 '다른 데서 끊을 수 없을 때만' 글자 사이를 허용합니다. 둘을 함께 쓰면 어절 단위로 끊되 넘치지는 않습니다. break-all은 다릅니다. 라틴 단어도 글자 사이에서 끊어 버립니다.",
          },
        ],
      },
      {
        label: "웹폰트: 도착하기 전의 세 시기",
        body: "폰트 파일이 아직 안 왔을 때 글자를 어떻게 할지를 CSS Fonts 사양이 세 시기로 나눕니다. 차단 시기에는 글자를 보이지 않게 그립니다(자리만 차지합니다). 교체 시기에는 폴백 폰트로 보이다가 도착하면 바꿉니다. 실패 시기에는 도착해도 바꾸지 않습니다. font-display가 세 시기의 길이를 정합니다. block은 '짧은 차단 시기(대개 3초를 권장)와 무한한 교체 시기', swap은 '아주 짧은 차단 시기(100ms 이하 권장)와 무한한 교체 시기', fallback은 아주 짧은 차단과 '짧은 교체 시기(3초 권장)', optional은 둘 다 아주 짧아 '못 왔으면 폴백으로 끝'입니다. auto는 브라우저 정책이고 Chrome·Firefox는 '3초 뒤 폴백 폰트로 글자를 보인다'고 사양의 표가 적습니다. 차단 시기의 빈 글자가 FOIT, 교체 순간의 폰트 바뀜이 FOUT입니다. 교체 순간 글자 폭이 바뀌면 줄바꿈이 바뀌고 7장의 레이아웃 시프트가 납니다. size-adjust, ascent-override로 폴백 폰트의 치수를 웹폰트에 맞추면 그 차이를 줄일 수 있습니다. unicode-range로 폰트를 글자 범위별로 쪼개면 그 범위의 글자가 있을 때만 받습니다. 한글 11,172 음절을 전부 담은 파일은 수 MB라 쪼개는 것이 보통입니다. commerce-web이 일본어일 때만 Pretendard JP CSS를 끼우는 것도 같은 생각입니다.",
        code: "폰트 요청 ─────┬─ 차단 시기 ─────┬─ 교체 시기 ──────────────┬─ 실패 시기 ─────▶\n              │ 글자 안 보임     │ 폴백 폰트로 보임.          │ 도착해도 안 바꿈\n              │ (자리만 차지)    │ 도착하면 바꿈 (FOUT)       │\n\nfont-display   차단 시기            교체 시기          결과\nblock          짧게 (≈3s 권장)      무한               3초까지 빈 글자, 그 뒤 폴백, 오면 교체\nswap           아주 짧게 (≤100ms)   무한               거의 바로 폴백, 오면 교체 (시프트 위험)\nfallback       아주 짧게            짧게 (≈3s)         3초 안에 오면 교체, 아니면 폴백 그대로\noptional       아주 짧게            없음               첫 방문엔 폴백. 캐시되면 다음부터 웹폰트\nauto           브라우저 정책         (Chrome·Firefox: 3초 뒤 폴백)\n\n교체 순간 폭이 바뀐다 → 줄바꿈이 바뀐다 → 높이가 바뀐다 → 아래가 밀린다 (7장 ㄴ)\n줄이는 법:  size-adjust · ascent-override 로 폴백 치수 맞추기 · <link rel=preload as=font> · unicode-range\n          로 쪼개기",
        codeLang: "text",
        terms: [
          {
            term: "FOIT와 FOUT",
            body: "FOIT(flash of invisible text)는 웹폰트가 오기 전 글자가 안 보이는 것입니다. 차단 시기의 모습입니다. FOUT(flash of unstyled text)는 폴백 폰트로 보이다가 웹폰트로 바뀌는 깜빡임입니다. 교체 순간의 모습입니다. 둘 중 하나는 겪어야 합니다. font-display가 어느 쪽을 얼마나 겪을지 고릅니다.",
          },
          {
            term: "unicode-range와 서브셋",
            body: "@font-face에 '이 파일은 이 글자 범위만 담았다'고 적는 선언입니다. 브라우저는 페이지에 그 범위의 글자가 있을 때만 그 파일을 받습니다. 한글 폰트는 음절이 11,172개라 한 파일이 크고, 쪼개서 쓰는 글자만 받게 하는 것이 보통입니다. 일본어가 필요할 때만 JP 파일을 끼우는 것도 같은 생각입니다.",
          },
        ],
      },
      {
        label: "문제: keep-all 을 켰더니 상자를 넘친다",
        body: "한국어 본문이 어절 중간에서 끊겨 보기 싫어 word-break: keep-all을 전역으로 걸었습니다. 본문은 좋아졌습니다. 그런데 상품명이 들어가는 좁은 카드에서 긴 상품명('초고속무선충전보조배터리20000mAh')이 카드 폭을 뚫고 옆 카드 위로 올라갑니다. 실제로 돌려 보면 140px 상자에서 keep-all은 2줄이지만 318px로 넘쳤습니다. 어절 단위로 끊으라고 했으니 끊을 공백이 없는 어절은 끊지 않은 것입니다. 처방은 overflow-wrap: anywhere를 함께 거는 것입니다. 끊을 자리가 없을 때만 글자 사이를 허용합니다. 같은 상자가 4줄로 들어갔습니다.",
      },
      {
        label: "문제가 나는 경우: 글자의 폭이 환경에서 오기 때문에",
        body: "경우 ㄱ, FOIT입니다. font-display: block이나 auto로 웹폰트가 늦으면 3초까지 글자가 안 보입니다. 경우 ㄴ, FOUT 시프트입니다. 폴백에서 웹폰트로 바뀌는 순간 폭이 바뀌어 줄과 높이가 바뀝니다. 경우 ㄷ, keep-all 넘침입니다. 위의 사고입니다. 경우 ㄹ, 긴 URL·해시입니다. 공백이 없어 1줄로 넘칩니다. overflow-wrap: anywhere나 word-break: break-all이 필요합니다. 경우 ㅁ, 등폭 표의 한글입니다. 실제로 돌려 보면 등폭 폰트의 한글 네 글자가 영문 네 글자의 1.44배였습니다. 코드 블록 안의 표는 한글이 들어가는 순간 칸이 어긋납니다. 경우 ㅂ, 폰트 존재 오판입니다. document.fonts.check가 없는 폰트에도 true를 줍니다. 경우 ㅅ, lang이 없습니다. 한중일 통합 한자는 같은 코드 포인트를 중국·일본·한국 폰트가 다르게 그립니다. <html lang>이 없거나 틀리면 일본어 페이지의 한자가 중국 글꼴로 나옵니다. 경우 ㅇ, length로 글자 수를 셉니다. 가족 이모지와 한글 두 자가 length 11입니다. 11자 제한에 걸립니다. 보이는 글자는 4입니다. 경우 ㅈ, 가짜 굵게입니다. 웹폰트에 700 굵기 파일이 없으면 브라우저가 400을 두껍게 그립니다(font-synthesis). 모양이 둔하고 폭이 달라집니다. 경우 ㅊ, OS마다 1px입니다. 힌팅과 서브픽셀 처리가 OS마다 달라 같은 문장이 Windows에서 1~2px 넓습니다. 딱 맞게 잡은 한 줄이 두 줄이 됩니다.",
        code: "경우           언제 생기나                        겉모습                                    들통나는 때\nㄱ FOIT         font-display: block/auto, 폰트 늦음    3초까지 빈 글자                            느린 망, 첫 방문\nㄴ FOUT 시프트   교체 순간 폭이 바뀜                   줄·높이가 바뀌어 아래가 밀림 (CLS)           웹폰트 도착 순간\nㄷ keep-all 넘침  긴 어절 (상품명, 해시태그)            2줄인데 318px 로 옆 카드 침범                좁은 카드\nㄹ 긴 URL       공백 없는 문자열                     1줄로 넘침                                댓글·로그 화면\nㅁ 등폭 표의 한글  code 블록 안의 표                    한글 열이 1.44배 넓어 칸이 어긋남              이 블로그의 표\nㅂ fonts.check  없는 폰트도 true                     '폰트 있음' 으로 오판                       폰트 감지 코드\nㅅ lang 없음     <html lang> 누락·틀림                일본어 한자가 중국 글꼴로                   일본어 사용자\nㅇ length 세기   이모지·결합 문자                     11자 제한에 4글자가 걸림                   입력 길이 제한\nㅈ 가짜 굵게     700 굵기 파일 없음                   둔한 굵기, 폭 달라짐                       제목에서\nㅊ OS 1px       힌팅·서브픽셀 차이                   한 줄이 다른 OS 에서 두 줄                  QA 가 다른 OS 일 때\n\n// ㄷ ㄹ 의 처방\n.card-title { word-break: keep-all; overflow-wrap: anywhere; }     /* 어절로 끊되 넘치지 않게 */",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 글자의 폭은 문자열의 속성이 아니라 환경의 함수다",
        body: "'한'이라는 글자의 폭은 어디에도 적혀 있지 않습니다. 어느 폰트 파일이 골라지는지(매칭), 그 폰트가 이웃과 어떻게 붙는지(셰이핑), 어디서 끊는지(줄바꿈), OS가 어떻게 픽셀로 바꾸는지(래스터)가 전부 정해진 뒤에야 나옵니다. 네 단계 중 셋이 환경에 있습니다. 설치된 폰트, 셰이퍼 버전, OS입니다. 그래서 같은 HTML이 기기마다 다른 줄 수를 가집니다(ㅊ, ㅅ). 그리고 웹폰트는 그 함수의 입력 하나가 '나중에 도착'하는 경우입니다. 도착 전과 후의 함수값이 달라 화면이 두 번 그려집니다(ㄱ, ㄴ). i18n 노드의 9단계가 '상수가 데이터가 되면 상태가 생긴다'고 적은 것과 같은 모양입니다. 처방은 함수의 입력을 고정하거나 차이를 흡수하는 것입니다. 폰트를 고정하고(웹폰트 + size-adjust로 폴백 치수 맞춤), 끊는 규칙을 명시하고(keep-all + anywhere), 글자 수는 보이는 글자로 세고(Segmenter), 폭에 의존하는 레이아웃은 1px 여유를 둡니다.",
        code: "폭('한') = f( 폰트 매칭, 셰이핑, 줄바꿈 규칙, 래스터 )\n                 │          │         │           └── OS (힌팅·서브픽셀)            → ㅊ\n                 │          │         └── CSS (word-break·overflow-wrap) + UAX #14  → ㄷ ㄹ\n                 │          └── 셰이퍼 (HarfBuzz) + 폰트의 GSUB/GPOS 표\n                 └── 설치된 폰트 + font-family 목록 + lang                            → ㅁ ㅅ ㅈ\n\n웹폰트 = 입력 하나가 나중에 도착한다\n  도착 전 f(폴백)  ≠  도착 후 f(웹폰트)   → 두 번 그려진다 → ㄱ (안 보임) 또는 ㄴ (바뀜)\n\n처방:  입력을 고정 (웹폰트 + size-adjust) · 규칙을 명시 (keep-all + anywhere) · 보이는 글자로 센다 (Segmenter) ·\n      폭에 1px 여유",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "글리프마다 자리가 잡혔고 비트맵이 아틀라스에 있습니다. 상자마다 좌표가 있습니다. 이제 그릴 차례입니다. 그런데 브라우저는 바로 픽셀을 칠하지 않습니다. 먼저 '무엇을 어떤 순서로 칠할지'의 목록을 만들고, 그 목록을 레이어로 나누고, 레이어를 타일로 잘라 다른 스레드에서 비트맵으로 바꾸고, 마지막에 합칩니다. 왜 이렇게 돌아가는지가 다음 장입니다.",
      },
      {
        label: "확인 질문",
        body: "댓글 글자 수를 200자로 제한하려 합니다. text.length > 200으로 막고, 서버도 같은 식으로 셉니다. 어떤 사용자가 '글자 수가 안 맞는다'고 합니다. 무슨 일일까요? 그리고 등폭 폰트의 코드 블록에서 한글이 든 표가 어긋나는 이유는 무엇일까요?",
        notes: [
          {
            title: "답",
            body: "length는 UTF-16 코드 단위를 셉니다. 가족 이모지 하나가 8, 결합 문자가 붙은 글자는 2 이상입니다. 실제로 돌려 보면 '👨‍👩‍👧 한글'이 length 11, 보이는 글자 4였습니다. 이모지를 몇 개 쓴 사용자는 눈에 보이는 글자가 200자 한참 전에 막힙니다. Intl.Segmenter로 그래핌을 세면 보이는 글자 수가 나옵니다. 서버도 같은 기준으로 세야 합니다. 표가 어긋나는 것은 등폭 폰트에 한글 글리프가 없어서 폴백 폰트가 끼어들고, 그 폰트의 한글이 전각 폭(실제로 돌려 보면 영문의 1.44배)이기 때문입니다. '등폭'은 그 폰트가 가진 글리프 안에서만 참입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "HarfBuzz — What is HarfBuzz? (text shaping)", href: "https://harfbuzz.github.io/what-is-harfbuzz.html" },
      { label: "CSS Fonts Module Level 4 — font-family (글자마다 매칭)", href: "https://www.w3.org/TR/css-fonts-4/#font-family-prop" },
      { label: "CSS Fonts Module Level 4 — font-display (세 시기)", href: "https://www.w3.org/TR/css-fonts-4/#font-display-desc" },
      { label: "CSS Text Module Level 3 — word-break (한국어 줄바꿈)", href: "https://www.w3.org/TR/css-text-3/#word-break-property" },
      { label: "MDN — word-break", href: `${MDN}/CSS/word-break` },
      { label: "MDN — overflow-wrap", href: `${MDN}/CSS/overflow-wrap` },
      { label: "MDN — FontFaceSet.check()", href: `${MDN}/API/FontFaceSet/check` },
      { label: "Unicode UAX #14 — Line Breaking Algorithm", href: "https://www.unicode.org/reports/tr14/" },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s9",
    name: "9장 · 페인트와 합성: 레이어, 래스터, 컴포지터",
    tagline: "메인 스레드는 '무엇을 칠할지' 목록만 만든다. 칠하고 합치는 것은 다른 스레드다",
    intro:
      "상자마다 자리가 있고 글리프마다 비트맵이 있습니다. 이제 칠합니다. 그런데 메인 스레드는 픽셀을 직접 칠하지 않습니다. 레이아웃 트리를 걸으며 '배경 먼저, 그다음 글자, 그다음 테두리' 같은 그릴 명령의 목록을 만듭니다. Chrome은 이것을 페인트 레코드라 부릅니다. 그 목록을 레이어로 나누고, 레이어 트리를 컴포지터 스레드에 넘깁니다. 컴포지터는 레이어를 타일로 잘라 래스터 스레드들에 보내고, 래스터 스레드가 타일을 GPU 메모리의 비트맵으로 바꿉니다. 컴포지터가 타일 정보를 모아 프레임을 만들어 GPU 프로세스에 보내면 화면에 올라갑니다. 왜 이렇게 나눴을까요. 스크롤과 transform 애니메이션을 메인 스레드 없이 하기 위해서입니다. Chrome의 말로는 컴포지터 스레드는 '스타일 계산이나 자바스크립트 실행을 기다릴 필요가 없다'. 이 장의 질문은 하나입니다. 어떤 변화가 메인 스레드로 돌아가야 하고, 어떤 변화는 컴포지터에서 끝나는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 페인트 레코드 → 레이어 → 타일 → 래스터 → 합성 → GPU",
        body: "첫째, 페인트입니다. 메인 스레드가 레이아웃 트리를 걸으며 그릴 순서를 정합니다. CSS의 쌓임 맥락(stacking context) 규칙대로입니다. 배경과 테두리, 음수 z-index 자식, 블록, 플로트, 인라인과 글자, 양수 z-index 자식 순입니다. 결과는 페인트 레코드의 목록(디스플레이 리스트)입니다. Chrome의 설명으로는 '페인트 레코드는 배경 먼저, 그다음 글자, 그다음 사각형 같은 그리기 과정의 기록'입니다. 둘째, 레이어 나누기입니다. 메인 스레드가 레이아웃 트리를 다시 걸으며 어떤 부분을 따로 레이어로 뗄지 정합니다. 3D transform, will-change, video, canvas, 그리고 그런 것 위에 겹쳐 그려져야 하는 요소가 레이어가 됩니다. 셋째, 컴포지터 스레드에 넘깁니다. 컴포지터는 각 레이어를 타일로 자르고 래스터 스레드들에 보냅니다. 넷째, 래스터입니다. 래스터 스레드가 타일 하나의 페인트 레코드를 실행해 비트맵을 만들고 GPU 메모리에 둡니다. 뷰포트 근처 타일을 먼저 합니다. 다섯째, 합성입니다. 컴포지터가 타일 정보(draw quad)를 모아 컴포지터 프레임을 만듭니다. 그 프레임을 IPC로 브라우저 프로세스에 보내고, 브라우저 프로세스가 GPU에 보내 화면에 올립니다. 스크롤이나 transform이 바뀌면 컴포지터는 이미 래스터된 타일을 다른 자리에 놓아 새 프레임을 만듭니다. 메인 스레드가 바쁘더라도 됩니다.",
        code: "메인 스레드                                     컴포지터 스레드              래스터 스레드들           GPU 프로세스\n레이아웃 트리\n  │ ① 페인트: 쌓임 순서대로 걸으며\n  ▼\n페인트 레코드 (디스플레이 리스트)\n  \"배경 → 글자 → 테두리 → …\"\n  │ ② 레이어 나누기: transform3d · will-change · video · 겹침\n  ▼\n레이어 트리 ───────────── commit ──────────▶ 레이어를 타일로 자른다 ──▶ 타일마다 레코드를 실행 → 비트맵 (GPU 메모리)\n                                                │                          │\n                                                ◀────── 래스터 완료 ─────────┘\n                                                │ ⑤ 합성: draw quads → 컴포지터 프레임\n                                                └──────── IPC ───────────────────────────────▶ 화면에 올린다\n\n스크롤 · transform · opacity 가 바뀌면:  컴포지터가 타일을 다른 자리에 놓아 새 프레임  (메인 스레드 불필요)\n글자 · 색 · 크기가 바뀌면:  메인 스레드가 ①부터 다시 (레이아웃도 바뀌면 7장부터)",
        codeLang: "text",
        terms: [
          {
            term: "페인트 레코드 (paint record)와 디스플레이 리스트",
            body: "'이 자리에 이 색 사각형, 그 위에 이 글리프들'처럼 그릴 명령을 순서대로 적은 목록입니다. 메인 스레드는 이 목록까지만 만듭니다. 실제 픽셀은 래스터 스레드가 이 목록을 실행해 만듭니다. 그림 그리는 순서를 적은 설계도이고, 설계도 만들기와 그리기가 다른 스레드에서 일어납니다.",
          },
          {
            term: "레이어 (compositing layer)",
            body: "따로 래스터해 두고 합칠 때만 자리를 바꾸는 그림 조각입니다. 포토샵의 레이어와 같은 생각입니다. 레이어가 따로 있으면 그 레이어만 움직여도 다른 레이어를 다시 그리지 않습니다. 대신 레이어마다 GPU 메모리를 먹습니다. 어떤 요소가 레이어가 되는지는 브라우저가 정하고, will-change나 transform으로 힌트를 줄 수 있습니다.",
          },
          {
            term: "래스터 (rasterization)와 타일 (tile)",
            body: "래스터는 그릴 명령(외곽선, 사각형)을 픽셀 격자로 바꾸는 일입니다. 타일은 레이어를 잘라 놓은 조각(보통 256×256)입니다. 레이어 전체를 한 번에 하지 않고 타일로 나누면 보이는 곳부터 먼저 하고 여러 스레드에서 나눠 할 수 있습니다. 스크롤하면 새로 보이는 타일만 래스터합니다.",
          },
          {
            term: "컴포지터 (compositor)와 합성 (compositing)",
            body: "래스터된 타일들을 겹쳐 한 장의 프레임으로 만드는 일과 그 일을 하는 스레드입니다. 메인 스레드와 따로 돌아서, 자바스크립트가 바쁘더라도 스크롤과 transform 애니메이션은 매끈합니다. 반대로 말하면 '컴포지터만으로 되는 변화'와 '메인 스레드가 다시 그려야 하는 변화'를 가르는 것이 성능의 반입니다.",
          },
        ],
      },
      {
        label: "비용의 사다리: 어느 속성이 어디까지 되돌리나",
        body: "파이프라인은 한 줄입니다. 자바스크립트 → 스타일 → 레이아웃 → 페인트 → 합성. Chrome의 말로는 '각 단계에서 앞 단계의 결과를 써서 새 데이터를 만든다'. 그래서 어느 속성을 바꾸느냐가 어디까지 되돌아가는지를 정합니다. width, height, margin, font-size처럼 자리와 크기를 바꾸는 것은 레이아웃부터 다시입니다. 레이아웃이 바뀌면 페인트와 합성도 따라옵니다. color, background, box-shadow처럼 자리는 그대로이고 모양만 바뀌는 것은 페인트부터입니다. transform, opacity는 레이어가 따로 있으면 합성만 다시 합니다. 메인 스레드가 아무 일도 안 합니다. 그래서 애니메이션은 transform과 opacity로 하라고 합니다. 같은 '움직임'을 top/left로 하면 매 프레임 레이아웃이고, transform으로 하면 매 프레임 합성만입니다.",
        code: "JS ──▶ 스타일 ──▶ 레이아웃 ──▶ 페인트 ──▶ 합성          (앞 단계의 결과가 다음 단계의 입력)\n\n바꾼 속성                     되돌아가는 곳         메인 스레드 일\nwidth · height · margin · top · left · font-size     레이아웃부터          스타일 + 레이아웃 + 페인트 레코드\n                                                                        (+ 래스터)\ncolor · background · box-shadow · border-color      페인트부터           스타일 + 페인트 레코드 (+ 래스터)\ntransform · opacity  (레이어가 따로 있을 때)         합성만               없음. 컴포지터가 타일을 옮긴다\n\n같은 움직임, 다른 비용\n@keyframes slide { to { left: 300px } }       매 프레임: 레이아웃 → 페인트 → 래스터 → 합성\n@keyframes slide { to { transform: translateX(300px) } }   매 프레임: 합성만.  메인 스레드가 바빠도 매끈하다",
        codeLang: "text",
      },
      {
        label: "입력도 컴포지터를 거친다",
        body: "스크롤은 컴포지터가 처리합니다. 그런데 페이지에 스크롤이나 터치 이벤트 핸들러가 있으면 사정이 달라집니다. 핸들러가 preventDefault를 부를 수 있어서, 컴포지터는 스크롤 전에 메인 스레드에 물어봐야 합니다. Chrome은 핸들러가 붙은 영역을 '빠르지 않은 스크롤 영역'으로 표시합니다. 그 영역에서 시작한 스크롤은 메인 스레드의 답을 기다립니다. 메인 스레드가 바쁘면 스크롤이 버벅입니다. 리스너에 passive: true를 주면 '막지 않겠다'는 약속이라 컴포지터가 바로 스크롤합니다. 연속 이벤트(mousemove, touchmove, wheel)는 화면 주사율보다 자주 옵니다. Chrome은 이것을 모아 두고 '다음 requestAnimationFrame 직전에' 한 번 보냅니다. 사이의 좌표가 필요하면 getCoalescedEvents로 꺼냅니다.",
        code: "스크롤 입력 → 컴포지터: \"이 자리에 핸들러가 있나?\"\n   없다 → 바로 스크롤 (메인 스레드 모름)\n   있다 (빠르지 않은 스크롤 영역) → 메인 스레드에 물어본다 → 핸들러가 preventDefault 할지 기다린다 → 그 뒤 스크롤\n                                   └ 메인 스레드가 바쁘면 여기서 버벅인다\n\nel.addEventListener('touchstart', fn, { passive: true });   // \"막지 않겠다\" → 컴포지터가 기다리지 않는다\n\n연속 이벤트 (mousemove·touchmove·wheel):  120Hz 로 와도 모아서 rAF 직전에 한 번.  사이 좌표는 e.getCoalescedEvents()",
        codeLang: "text",
      },
      {
        label: "문제: top/left 로 움직이는 애니메이션이 매 프레임 레이아웃을 돌린다",
        body: "드로어 메뉴가 왼쪽에서 밀려 들어옵니다. left: -300px에서 0까지 transition입니다. 느린 기기에서 뚝뚝 끊깁니다. left는 자리를 바꾸는 속성이라 프레임마다 레이아웃 → 페인트 → 래스터 → 합성을 전부 돕니다. 300ms 애니메이션이면 18프레임, 매 프레임 메인 스레드가 그 상자와 영향받는 상자를 다시 재고 다시 칠합니다. 그 사이 자바스크립트가 조금만 돌면 프레임이 밀립니다. transform: translateX로 바꾸면 메인 스레드는 첫 프레임에 레이어를 만들고 손을 뗍니다. 나머지 17프레임은 컴포지터가 타일을 옮깁니다.",
      },
      {
        label: "문제가 나는 경우: 메인 스레드로 돌아가야 하는 변화들",
        body: "경우 ㄱ, 자리 속성 애니메이션입니다. 위의 사고입니다. 경우 ㄴ, 레이어 폭발입니다. 성능 좋아진다는 말만 듣고 will-change: transform을 전역에 걸면 요소마다 레이어가 생기고, 레이어마다 GPU 메모리를 먹습니다. 모바일에서 탭이 죽습니다. 경우 ㄷ, 비싼 페인트입니다. 큰 box-shadow, filter: blur, 반투명 겹침은 래스터 비용이 큽니다. 스크롤할 때 새 타일을 래스터하느라 느립니다. 경우 ㄹ, 막는 스크롤 핸들러입니다. passive 없는 touchstart·wheel 리스너가 있으면 컴포지터가 메인 스레드를 기다립니다. 라이브러리가 document에 걸어 둔 것이 흔합니다. 경우 ㅁ, 겹침 때문에 강제 승격입니다. 레이어 위에 겹쳐 그려지는 요소는 순서를 지키려고 자기도 레이어가 됩니다. 하나를 승격했는데 열 개가 따라 올라갑니다. 경우 ㅂ, 흐릿한 글자입니다. transform: scale로 키운 레이어는 원래 크기로 래스터된 비트맵을 늘려 보여 흐릿합니다. 경우 ㅅ, 넓은 무효화입니다. 작은 변화가 큰 레이어 전체를 다시 래스터시킵니다. 고정 헤더의 글자 하나 바꾸기가 헤더 레이어 전체 래스터입니다. 경우 ㅇ, background-attachment: fixed입니다. 스크롤마다 배경을 다시 칠해야 해서 컴포지터만으로 스크롤할 수 없습니다.",
        code: "경우        언제 생기나                         겉모습                             들통나는 때\nㄱ 자리 속성 애니메이션  left/top/width 로 움직임              매 프레임 레이아웃. 끊김              느린 기기, JS 가\n                                                       바쁠 때\nㄴ 레이어 폭발  will-change 전역                     GPU 메모리 급증, 모바일 탭 죽음        Layers 패널에 수백 개\nㄷ 비싼 페인트  큰 blur · box-shadow · 반투명 겹침      스크롤할 때 새 타일 래스터가 느림         긴 목록 스크롤\nㄹ 막는 스크롤 핸들러  passive 없는 touchstart/wheel          스크롤이 메인 스레드를 기다림            JS 가 바쁠\n                                                        때 스크롤 버벅\nㅁ 겹침 강제 승격  레이어 위에 겹친 요소들                 하나 올렸는데 열 개가 레이어             Layers 패널 'overlap'\nㅂ 흐릿한 글자  transform: scale 로 키움               비트맵을 늘려 흐릿                    확대 애니메이션 끝\nㅅ 넓은 무효화  큰 레이어의 작은 변화                   레이어 전체 재래스터                  고정 헤더 시계 글자\nㅇ 배경 고정    background-attachment: fixed          스크롤마다 다시 칠함                  배경 이미지 페이지",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 메인 스레드의 산출물과 컴포지터의 반복이 갈라져 있다",
        body: "메인 스레드가 만드는 것은 설계도(페인트 레코드)와 그것을 나눈 레이어입니다. 컴포지터가 하는 것은 그 레이어를 매 프레임 다시 놓는 일입니다. 둘이 갈라져 있어서 '레이어를 옮기기만 하면 되는 변화'는 메인 스레드 없이 됩니다. 이것이 분리의 이득입니다. 대신 두 가지 대가가 있습니다. 레이어는 메모리를 먹고(ㄴ, ㅁ), 레이어 안의 내용이 바뀌면 설계도부터 다시 만들어야 합니다(ㄱ, ㅅ). 그래서 성능 문제는 대개 한 질문으로 좁혀집니다. 이 변화가 메인 스레드로 돌아가야 하는가. 자리와 모양이 바뀌면 돌아가고, 레이어의 위치·투명도만 바뀌면 안 돌아갑니다. 처방은 변화를 두 번째 종류로 바꾸는 것(transform·opacity)과, 레이어 수를 필요한 만큼만 두는 것(will-change는 애니메이션 직전에만), 그리고 입력이 메인 스레드를 기다리지 않게 하는 것(passive)입니다.",
        code: "메인 스레드가 만드는 것                        컴포지터가 매 프레임 하는 것\n페인트 레코드 (설계도) + 레이어 나누기             레이어(타일)를 다시 놓아 프레임을 만든다\n     │                                              │\n     │ 레이어 안의 내용이 바뀌면 → 설계도부터 다시    │ 레이어의 위치·투명도만 바뀌면 → 여기서 끝\n     └── ㄱ ㅅ (자리·모양 변화)                      └── transform · opacity · 스크롤\n\n분리의 대가:  레이어마다 GPU 메모리 (ㄴ ㅁ) · 입력이 핸들러 때문에 메인 스레드를 기다릴 수 있다 (ㄹ)\n\n질문 하나:  \"이 변화가 메인 스레드로 돌아가야 하나?\"\n  돌아가야 한다 → 횟수를 줄인다 (묶어서, 작게)     안 돌아간다 → 그 길로 바꾼다 (transform · opacity · passive)",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "지금까지 파이프라인을 한 번 흐르는 것으로 그렸습니다. 실제로는 1초에 60번쯤 반복됩니다. 누가 언제 '다시 스타일부터 돌려라'라고 하나요. 이벤트 루프입니다. 태스크를 하나 돌리고, 마이크로태스크를 다 비우고, 그릴 때가 되면 requestAnimationFrame 콜백 → 스타일 → 레이아웃 → 페인트를 한 번 돕니다. 그 한 바퀴가 프레임입니다. 자바스크립트가 그 예산을 얼마나 쓰느냐가 다음 장입니다.",
      },
      {
        label: "확인 질문",
        body: "스크롤할 때 헤더가 서서히 투명해지게 하려고 scroll 이벤트에서 header.style.opacity = 1 - scrollY / 300을 씁니다. 그리고 다른 곳에서 header.style.height = …도 함께 바꿉니다. 둘 중 어느 쪽이 프레임을 더 쓰고, 왜 그럴까요?",
        notes: [
          {
            title: "답",
            body: "height가 훨씬 비쌉니다. 높이는 레이아웃 속성이라 프레임마다 레이아웃 → 페인트 → 래스터 → 합성을 전부 돕니다. 헤더 아래의 상자들도 밀리니 영향 범위가 넓습니다. opacity는 헤더가 자기 레이어를 가지면 합성만 다시 하니 메인 스레드가 거의 쉽니다. 단, 둘 다 scroll 이벤트 핸들러 안에서 하면 그 핸들러 자체가 메인 스레드에서 돌고, 헤더 영역이 '빠르지 않은 스크롤 영역'이 되어 스크롤이 메인 스레드를 기다릴 수 있습니다. 스크롤 연동 효과는 CSS의 animation-timeline: scroll()이나 passive 리스너 + rAF로 옮기는 것이 낫습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Chrome — Inside look at modern web browser, part 3 (Paint, Compositing)", href: `${CHROME}/inside-browser-part3` },
      { label: "Chrome — Inside look at modern web browser, part 4 (Input is coming to the compositor)", href: `${CHROME}/inside-browser-part4` },
      { label: "web.dev — Rendering performance (pixel pipeline)", href: "https://web.dev/articles/rendering-performance" },
      { label: "CSS Triggers — 어느 속성이 어디까지 되돌리나", href: "https://csstriggers.com/" },
      { label: "MDN — CSS stacking context", href: `${MDN}/CSS/CSS_positioned_layout/Stacking_context` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s10",
    name: "10장 · 이벤트 루프와 프레임",
    tagline: "태스크 하나, 마이크로태스크 전부, 그리고 그릴 때가 되면 한 바퀴. 그것이 프레임이다",
    intro:
      "메인 스레드는 쉬지 않고 한 루프를 돕니다. 사양의 이벤트 루프 처리 모델은 이렇습니다. 태스크 큐 중 하나를 고르고, 가장 오래된 태스크 하나를 꺼내 돌리고, 마이크로태스크 체크포인트를 수행합니다. 그리고 따로 도는 렌더링 루프가 '렌더링 기회'가 있는 문서에 대해 '렌더링 갱신' 태스크를 넣습니다. 그 태스크 안에서 순서가 정해져 있습니다. 리사이즈, 스크롤, 미디어 쿼리, 애니메이션, requestAnimationFrame 콜백, 스타일 재계산과 레이아웃, IntersectionObserver, 그리고 페인트입니다. 렌더링 기회는 화면 주사율을 따릅니다. 사양은 60Hz면 '최대 1/60초(약 16.7ms)마다'라고 예를 듭니다. 그 16.7ms가 한 프레임의 예산이고, 자바스크립트·스타일·레이아웃·페인트가 그 안에서 나눠 씁니다. 이 장의 질문은 둘입니다. 큐에 넣은 것들은 어떤 순서로 도는가. 그리고 Vue가 상태를 바꾼 뒤 DOM이 언제 바뀌는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 한 바퀴의 순서",
        body: "사양의 처리 모델 2단계가 한 바퀴입니다. '태스크 큐 하나를 구현이 정한 방식으로 고른다'. 입력 이벤트 큐를 먼저 고르는 식의 우선순위가 여기 들어갑니다. '그 큐의 첫 실행 가능 태스크를 꺼낸다'. '그 태스크의 단계를 수행한다'. 그다음 '마이크로태스크 체크포인트를 수행한다'. Promise 콜백, queueMicrotask, MutationObserver가 여기서 전부 돕니다. 하나가 또 넣으면 그것도 이 체크포인트 안에서 돕니다. 비기 전에는 다음으로 안 갑니다. 콜백 하나가 끝날 때마다도 비웁니다. 사양의 '스크립트 실행 뒤 정리' 단계가 '자바스크립트 실행 컨텍스트 스택이 비었으면 마이크로태스크 체크포인트를 수행한다'고 적습니다. 렌더링은 따로 돕니다. 병렬 블록이 '렌더링 기회가 있는 navigable마다 렌더링 갱신 태스크를 넣는다'. 그 태스크의 순서는 이렇습니다. 문서 드러내기, autofocus, 리사이즈 단계, 스크롤 단계, 미디어 쿼리 평가, 애니메이션 갱신과 이벤트, 풀스크린, requestAnimationFrame 콜백 실행, 스타일 재계산과 레이아웃(ResizeObserver 루프 포함), 포커스 정리, 뷰 전환, IntersectionObserver 갱신, 페인트 타이밍 기록, 그리고 '렌더링 또는 UI 갱신'(페인트). rAF가 스타일·레이아웃 앞에 있다는 점이 중요합니다. rAF 안에서 쓴 스타일은 바로 뒤의 레이아웃에 반영되어 그 프레임에 그려집니다.",
        code: "이벤트 루프 한 바퀴\n① 태스크 큐 하나를 고른다 (입력 우선 등은 구현의 몫)\n② 가장 오래된 태스크 하나를 돌린다          ← setTimeout 콜백, 클릭 핸들러, 네트워크 응답, 파서의 한 조각 …\n③ 마이크로태스크 체크포인트: 전부 비운다      ← Promise.then, queueMicrotask, MutationObserver, Vue 의 flush\n   (콜백 하나가 끝날 때마다도 비운다 — 스택이 비면)\n④ 렌더링 기회가 있으면 '렌더링 갱신' 태스크:\n   드러내기 → autofocus → 리사이즈 단계 → 스크롤 단계 → 미디어 쿼리 → 애니메이션 갱신·이벤트 → 풀스크린\n   → requestAnimationFrame 콜백 → 스타일 재계산 + 레이아웃 (ResizeObserver 루프) → 포커스 정리 → 뷰 전환\n   → IntersectionObserver → 페인트 타이밍 → 페인트 (렌더링 갱신)\n⑤ ①로\n\n렌더링 기회 = 화면 주사율 (60Hz 면 약 16.7ms 마다) · 보이지 않는 탭은 거의 없음\n한 프레임의 예산 16.7ms 를 ② ③ ④ 가 나눠 쓴다",
        codeLang: "text",
        terms: [
          {
            term: "태스크 (task)와 태스크 큐",
            body: "이벤트 루프가 한 번에 하나씩 꺼내 돌리는 일의 단위입니다. 클릭 핸들러 호출, setTimeout 콜백, fetch 응답 처리, 파서가 HTML 한 조각을 처리하는 것이 각각 태스크입니다. 큐가 여럿이고(입력, 타이머, 네트워크…) 어느 큐를 먼저 볼지는 브라우저가 정합니다. 태스크 사이에만 렌더링이 끼어들 수 있습니다.",
          },
          {
            term: "마이크로태스크 (microtask)",
            body: "태스크가 끝난 직후, 다음 태스크나 렌더링 전에 전부 비우는 작은 일들입니다. Promise의 then, queueMicrotask, MutationObserver 콜백이 여기 들어갑니다. 비울 때 새로 들어온 것도 같은 자리에서 돕니다. 그래서 마이크로태스크가 마이크로태스크를 계속 넣으면 렌더링이 영영 안 옵니다. Vue가 DOM 갱신을 모아 두는 자리도 여기입니다.",
          },
          {
            term: "렌더링 기회 (rendering opportunity)",
            body: "브라우저가 '지금 한 프레임 그릴 때다'라고 판단하는 순간입니다. 화면 주사율(보통 60Hz, 약 16.7ms)에 맞추고, 보이지 않는 탭에서는 거의 주지 않습니다. 이 기회가 올 때만 requestAnimationFrame 콜백, 스타일, 레이아웃, 페인트가 돕니다. 기회 사이에 스타일을 열 번 바꿔도 그리는 것은 한 번입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "load 뒤 한 태스크 안에서 여섯 가지를 큐에 넣고 순서를 기록했습니다. 동기 코드 끝 → Promise.then → queueMicrotask → MutationObserver → setTimeout 0 → requestAnimationFrame → 다음 프레임의 rAF 순이었습니다. 마이크로태스크 셋이 동기 코드 바로 뒤에, 넣은 순서대로 돌았습니다. setTimeout 0은 다음 태스크라 그 뒤였고, rAF는 다음 렌더링 기회라 더 뒤였습니다. 첫 rAF와 둘째 rAF 사이는 25.1ms였습니다. 그리고 창이 다른 창 뒤에 가려진 상태에서는 rAF가 3초 동안 4번만 불렸습니다. 렌더링 기회가 거의 없었던 것입니다. Vue 3.5.45에서는 Node로 확인했습니다. reactive 상태를 한 태스크 안에서 세 번 바꿨는데 watchEffect는 동기 코드가 끝난 뒤 한 번, n=3으로 돌았습니다. 내가 그 뒤에 넣은 queueMicrotask보다 먼저였습니다. Vue가 첫 변경 때 flush 마이크로태스크를 넣어 두었기 때문입니다. await nextTick()은 그 flush 뒤에 풀렸습니다.",
        code: "// 브라우저 (Chrome 156) — 한 태스크 안에서 큐에 넣은 순서와 실제 돈 순서\n넣은 것                         돈 순서\nsetTimeout(…, 0)                5   setTimeout 0\nPromise.resolve().then(…)        2   Promise.then           ┐\nqueueMicrotask(…)                3   queueMicrotask         ├ 마이크로태스크: 동기 코드 직후, 넣은 순서\nMutationObserver (속성 변경)       4   MutationObserver       ┘\nrequestAnimationFrame(…)         6   rAF                    ← 다음 렌더링 기회\n(동기 코드)                       1   동기 코드 끝\n첫 rAF → 둘째 rAF: 25.1ms.  가려진 창: 3초 동안 rAF 4번\n\n// Vue 3.5.45 (Node) — 세 번 바꿔도 effect 는 한 번\neffect 실행: n=0\nn=1 로 바꿈 (동기) · n=2 로 바꿈 (동기) · n=3 로 바꿈 (동기) · 동기 코드 끝\neffect 실행: n=3            ← 마이크로태스크. 내가 뒤에 넣은 queueMicrotask 보다 먼저\n내가 넣은 queueMicrotask\nawait nextTick() 뒤\nsetTimeout 0",
      },
      {
        label: "Vue 는 마이크로태스크 문으로 들어온다",
        body: "Vue에서 state.n = 3을 쓰면 DOM은 그 줄에서 바뀌지 않습니다. 반응형 시스템이 '이 컴포넌트를 다시 그려야 한다'는 일(job)을 큐에 넣고, 아직 안 넣었으면 flush를 Promise.then으로 예약합니다. 같은 태스크 안에서 상태를 백 번 바꿔도 job은 한 번만 들어갑니다. 동기 코드가 끝나면 마이크로태스크 체크포인트에서 flush가 돌아 컴포넌트를 다시 렌더링하고 DOM을 패치합니다. Vue 문서는 이것을 '다음 틱까지 버퍼링한다'고 적습니다. nextTick()은 그 flush 뒤에 풀리는 Promise입니다. 그러니 DOM이 바뀐 뒤 무엇을 읽으려면 await nextTick()이 필요합니다. 그리고 그 패치는 아직 화면에 없습니다. 같은 태스크의 마이크로태스크 안이라 렌더링 기회 전입니다. 다음 렌더링 갱신에서 스타일 → 레이아웃 → 페인트를 거쳐야 보입니다. 즉 상태 변경 → (마이크로태스크) DOM 패치 → (렌더링 기회) 픽셀, 두 단계의 늦춤이 있습니다. React도 같은 생각입니다. 이벤트 핸들러 안의 setState를 모아 한 번 렌더링합니다.",
        code: "state.n = 1  ──┐\nstate.n = 2  ──┼─▶ job 큐에 '이 컴포넌트 다시 그리기' 한 번  +  Promise.then(flush) 예약 (처음 한 번만)\nstate.n = 3  ──┘\n동기 코드 끝\n── 마이크로태스크 체크포인트 ──\nflush: 컴포넌트 render() → vdom 비교 → DOM 패치 (n=3)        ← 여기까지가 nextTick 이 기다리는 것\n(내 queueMicrotask, 내 then …)\n── 렌더링 기회 ──\nrAF → 스타일 → 레이아웃 → 페인트                              ← 여기서 비로소 화면에 3 이 보인다\n\n두 단계 늦춤:  상태 → [마이크로태스크] → DOM → [렌더링 기회] → 픽셀",
        codeLang: "text",
        terms: [
          {
            term: "nextTick (Vue) / flushSync (React)",
            body: "프레임워크가 모아 둔 DOM 갱신이 끝난 직후를 잡는 장치입니다. Vue의 nextTick()은 flush 뒤에 풀리는 Promise라 await nextTick() 다음 줄에서는 DOM이 새 값입니다. React는 반대 방향의 flushSync로 '지금 당장 그려라'를 시킵니다. 둘 다 '상태를 바꿨다고 DOM이 바로 바뀌지는 않는다'는 같은 사실 위에 있습니다.",
          },
        ],
      },
      {
        label: "문제: 상태를 바꾼 직후 DOM 을 읽으니 옛 값이다",
        body: "목록에 항목을 추가하고 바로 스크롤을 맨 아래로 내리려 합니다. items.push(x); list.scrollTop = list.scrollHeight. 스크롤이 새 항목 바로 위에서 멈춥니다. push는 상태만 바꿨고 DOM의 새 항목은 마이크로태스크에서 생깁니다. scrollHeight를 읽은 시점에는 아직 없습니다. 실제로 돌려 보면 세 번 바꾼 상태의 effect가 동기 코드 끝난 뒤에 돌았습니다. 처방은 await nextTick() 뒤에 읽는 것입니다. 그러면 DOM은 새 값이고, scrollHeight를 읽는 순간 강제 레이아웃이 한 번 돌아 맞는 값을 줍니다.",
      },
      {
        label: "문제가 나는 경우: 예산을 넘기거나 순서를 착각하는 자리",
        body: "경우 ㄱ, 긴 태스크입니다. 50ms를 넘는 태스크 하나가 돌면 그 프레임은 날아가고 입력도 밀립니다. 경우 ㄴ, 마이크로태스크 폭주입니다. then 안에서 또 then을 넣는 재귀는 체크포인트를 빠져나오지 못합니다. 렌더링이 영영 안 옵니다. 같은 일을 setTimeout으로 하면 사이사이 그려집니다. 경우 ㄷ, setTimeout 애니메이션입니다. 16ms 타이머는 프레임과 어긋나 어떤 프레임은 두 번, 어떤 프레임은 안 그립니다. 가려진 탭에서는 1초로 묶입니다. 경우 ㄹ, rAF 안의 읽기-쓰기입니다. rAF는 레이아웃 앞에서 돕니다. 거기서 치수를 읽고 스타일을 쓰고 다시 읽으면 7장의 강제 레이아웃이 매 프레임 납니다. 경우 ㅁ, 가려진 탭입니다. rAF가 거의 안 돕니다. 실제로 돌려 보면 3초에 4번이었습니다. rAF로 시간을 재는 로직이 멈춘 것처럼 보입니다. 경우 ㅂ, 한 프레임 안의 두 상태입니다. el.classList.add('start'); el.classList.add('end')를 연달아 쓰면 브라우저는 end만 봅니다. 트랜지션이 걸리지 않습니다. 사이에 렌더링 기회가 없었기 때문입니다. 경우 ㅅ, ResizeObserver 루프입니다. 콜백에서 크기를 바꾸면 같은 프레임에 다시 불리고, 끝이 없으면 'ResizeObserver loop' 오류가 납니다. 경우 ㅇ, 상태 직후 읽기입니다. 위의 사고입니다.",
        code: "경우       언제 생기나                        겉모습                              들통나는 때\nㄱ 긴 태스크  JS 가 50ms 넘게                     프레임 드랍, 입력 지연                 Performance 탭 빨간 모서리\nㄴ 마이크로태스크 폭주  then 안에서 then 재귀               렌더링이 영영 안 옴. 탭 멈춤            무한 Promise 체인\nㄷ setTimeout 애니메이션  16ms 타이머로 움직임             프레임과 어긋남. 가려진 탭에서 1초 묶임    느린 기기, 백그라운드\nㄹ rAF 읽기-쓰기  rAF 안에서 offsetWidth → style → offsetWidth  매 프레임 강제 레이아웃                 스크롤\n                                                            연동 효과\nㅁ 가려진 탭  탭이 보이지 않음                     rAF 3초에 4번                        돌아왔을 때 시계가 멈춰 있다\nㅂ 한 프레임 두 상태  class start 뒤 바로 end             트랜지션 없음 (end 만 본다)             페이드 인이 안 될 때\nㅅ ResizeObserver 루프  콜백에서 크기를 또 바꿈             'ResizeObserver loop completed with undelivered\n                                                     notifications'  콘솔\nㅇ 상태 직후 읽기  items.push 뒤 scrollHeight          옛 값. nextTick 필요                  스크롤이 한 칸 모자람\n\n// ㅂ 의 처방 — 사이에 렌더링 기회를 둔다 (또는 레이아웃을 한 번 강제한다)\nel.classList.add('start');\nrequestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('end')));   // 두 프레임 뒤\n// 또는  void el.offsetWidth;  el.classList.add('end');                               // 강제\n                              스타일·레이아웃으로 start 를 '보게' 한다",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 한 프레임은 공유 예산이고, 마이크로태스크는 틈을 없애는 대신 그리기를 미룬다",
        body: "메인 스레드의 16.7ms는 태스크, 마이크로태스크, rAF, 스타일, 레이아웃, 페인트가 순서대로 나눠 쓰는 하나의 예산입니다. 앞이 길면 뒤가 밀리고, 다 합쳐 예산을 넘기면 프레임이 떨어집니다(ㄱ). 마이크로태스크는 '태스크 사이에 아무것도 끼지 않는다'는 보장을 줍니다. Promise 콜백 사이에 렌더링이나 다른 이벤트가 끼지 않아 상태가 일관됩니다. Vue가 DOM 갱신을 여기 모으는 이유입니다. 그 보장의 대가가 ㄴ입니다. 틈이 없으니 그리기도 끼지 못합니다. 렌더링은 기회가 있을 때만, 정해진 순서로 한 번입니다. 그래서 기회 사이의 중간 상태는 보이지 않고(ㅂ), 기회가 없는 탭은 그려지지 않고(ㅁ), 기회 밖의 타이머는 프레임과 어긋납니다(ㄷ). 처방은 예산을 알고 쓰는 것입니다. 긴 일은 쪼개거나 워커로 보내고, 그리기와 묶인 일은 rAF에 두고, 중간 상태를 보이려면 기회를 하나 끼우고, DOM을 읽는 코드는 프레임워크의 flush 뒤(nextTick)에 둡니다.",
        code: "한 프레임 (16.7ms)  ─────────────────────────────────────────────────────────────────▶\n│ 태스크 │ 마이크로태스크 (전부) │ rAF │ 스타일 │ 레이아웃 │ 페인트 │ (남은 시간 = 여유)\n   ㄱ ──────────────────────────────────────────────────▶ 넘치면 다음 프레임을 먹는다\n            ㄴ ─▶ 비워지지 않으면 rAF 이후가 영영 안 온다\n                                 ㄹ ─▶ 여기서 읽고-쓰고-읽으면 레이아웃이 두 번\n\n마이크로태스크의 거래:  \"태스크 사이에 틈이 없다\" (상태 일관)  ↔  \"그리기도 끼지 못한다\" (ㄴ)\n렌더링 기회의 거래:    \"기회마다 한 번만 그린다\" (효율)       ↔  \"기회 사이 중간 상태는 안 보인다\" (ㅂ) · \"기회 없는 탭은\n                                                      안 그린다\" (ㅁ)\n\n처방:  긴 일은 쪼개거나 워커로 · 그리기와 묶인 일은 rAF 에 · 중간 상태는 기회 하나 끼우기 · DOM 읽기는 nextTick 뒤",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "지금까지 한 페이지에 window 하나, document 하나, 이벤트 루프 하나로 말했습니다. 그런데 iframe이 하나 있으면 그 안에 또 window, document, realm이 있습니다. 2장에서 9장까지가 그 안에서 한 번 더 돕니다. 같은 출처면 서로의 것을 만질 수 있고, 다른 출처면 열 몇 개의 속성 말고는 전부 SecurityError입니다. 실제로 돌려 보면 localhost와 127.0.0.1이 그 선이었습니다.",
      },
      {
        label: "확인 질문",
        body: "버튼을 누르면 items를 1,000개 추가하고, 그 직후 console.log(list.children.length)를 찍고, 그다음 줄에서 await nextTick() 뒤 다시 찍습니다. 두 값은 무엇이고, 사용자 화면에 1,000개가 보이는 것은 그중 어느 시점일까요?",
        notes: [
          {
            title: "답",
            body: "첫 로그는 추가 전 개수입니다. push는 상태만 바꿨고 DOM 패치는 마이크로태스크에서 일어나니 아직입니다. 둘째 로그는 1,000개 늘어난 값입니다. nextTick이 flush 뒤에 풀렸습니다. 그러나 화면에는 둘째 로그 시점에도 아직 안 보입니다. 같은 태스크의 마이크로태스크 안이라 렌더링 기회 전입니다. 이 태스크가 끝나고 다음 렌더링 갱신에서 스타일 → 레이아웃 → 페인트를 거친 뒤에 보입니다. 1,000개의 레이아웃이 길면 그 프레임이 늦고, 그동안 클릭 핸들러도 밀립니다(ㄱ). 큰 목록은 나눠 넣거나 가상 스크롤로 줄입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "WHATWG HTML — Event loop processing model", href: `${HTML}/webappapis.html#event-loop-processing-model` },
      { label: "WHATWG HTML — Rendering opportunity", href: `${HTML}/webappapis.html#rendering-opportunity` },
      { label: "WHATWG HTML — Clean up after running script (microtask checkpoint)", href: `${HTML}/webappapis.html#clean-up-after-running-script` },
      { label: "Vue — Reactivity Fundamentals: DOM Update Timing", href: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing" },
      { label: "Vue — nextTick()", href: "https://vuejs.org/api/general.html#nexttick" },
      { label: "MDN — requestAnimationFrame()", href: `${MDN}/API/Window/requestAnimationFrame` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s11",
    name: "11장 · 프레임 안의 프레임: iframe과 교차 출처",
    tagline: "iframe 하나에 window · document · realm 이 또 하나다. 출처가 다르면 열세 개 말고는 전부 막힌다",
    intro:
      "<iframe>은 문서 안의 또 하나의 브라우징 컨텍스트입니다. 2장의 그림이 한 번 더 그려집니다. 자기 WindowProxy, 자기 Window, 자기 realm, 자기 Document, 자기 파서와 이벤트 루프 차례입니다. 부모는 frame.contentWindow로, 자식은 window.parent로 서로를 가리킵니다. 출처가 같으면 서로의 DOM을 자유롭게 만집니다. 출처가 다르면 사양이 정한 열몇 개의 속성(window, self, location, close, closed, focus, blur, frames, length, top, opener, parent, postMessage)과 location의 href 쓰기·replace만 됩니다. 나머지는 SecurityError입니다. 그리고 1장의 사이트 격리로 다른 사이트의 프레임은 다른 프로세스에 있습니다. 실제로 돌려 보면 localhost와 127.0.0.1은 같은 서버인데 다른 출처였습니다. 이 장의 질문은 하나입니다. 프레임 경계는 어떤 선들의 겹침인가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 프레임마다 2~9장이 한 번 더",
        body: "파서가 <iframe src>를 만나면 자식 navigable을 만듭니다. 그 순간 2장과 같이 새 브라우징 컨텍스트, WindowProxy, Window, about:blank Document가 생기고, src로 네비게이션해 새 Window와 Document가 또 생깁니다. 그 문서는 자기 파서로 파싱되고, 자기 CSSOM과 레이아웃 트리를 가지며, 부모 문서의 레이아웃에서는 iframe 요소의 상자 하나로만 보입니다. 부모의 CSS는 안으로 들어가지 않고 안의 CSS는 밖으로 나오지 않습니다. 관계는 속성으로 잇습니다. 부모에서 iframe.contentWindow와 window.frames[i], 자식에서 window.parent와 window.top입니다. window.length는 자식 프레임 수입니다. 실제로 돌려 보면 같은 출처 프레임의 contentWindow === frames[0], parent === window, top === window가 전부 true였고, 부모의 window.length는 2였습니다. 그 프레임은 doctype이 없어 compatMode가 BackCompat이었습니다. 부모는 CSS1Compat입니다. 문서마다 따로입니다. realm도 따로입니다. 프레임의 Array는 부모의 Array가 아닙니다. 사이트 격리가 켜진 Chrome에서 교차 사이트 프레임은 다른 렌더러 프로세스에서 그려지고, 그 결과만 부모 프레임의 합성 단계에서 한 장의 그림으로 합쳐집니다.",
        code: "부모 문서 (localhost:4321)                          자식 프레임 (같은 출처)                자식 프레임\n                                                  (127.0.0.1:4321 — 다른 출처)\nwindow ── WindowProxy ── Window ── Document          contentWindow ── Window ── Document\n                                                     contentWindow ── [다른 프로세스] Window ── Document\n  │ frames[0], frames[1], window.length === 2           │ parent === 부모, top === 부모            │ parent, top 은 보이지만 document 는 SecurityError\n  │ realm A: Array_A                                    │ realm B: Array_B  (≠ Array_A)            │ realm C\n  │ compatMode CSS1Compat                               │ compatMode BackCompat (doctype 없음)\n  │ 자기 파서 · CSSOM · 레이아웃 트리                      │ 자기 파서 · CSSOM · 레이아웃 트리         │ 자기 렌더러 프로세스에서 그린 뒤 합성만 부모에서\n  └ 레이아웃에서는 <iframe> 상자 하나\n\n// 실제로 돌려 보면 (같은 출처 프레임)\nframe.contentWindow === frames[0]       // true      frame.contentWindow.parent === window   // true\nframe.contentWindow.document.title      // 'frame A (doctype 없음)'\nframe.contentWindow.document.compatMode // 'BackCompat'   (부모는 'CSS1Compat')\nframe.contentWindow.Array !== Array     // true      [] instanceof frame.contentWindow.Array   // false",
        codeLang: "text",
        terms: [
          {
            term: "자식 navigable과 window.parent / top / frames",
            body: "iframe이 만드는 안쪽 브라우징 컨텍스트가 자식 navigable입니다. 부모는 iframe.contentWindow나 window.frames[i]로 자식의 WindowProxy를 얻고, 자식은 window.parent로 바로 위를, window.top으로 맨 위를 가리킵니다. window.length는 자식 수입니다. 최상위 문서에서는 parent === top === window입니다.",
          },
        ],
      },
      {
        label: "출처가 다르면 열세 개만 남는다",
        body: "사양의 '교차 출처 속성' 목록이 전부입니다. Window에서는 window, self, location, close, closed, focus, blur, frames, length, top, opener, parent, postMessage와 숫자 인덱스(frames[0])입니다. Location에서는 href의 쓰기(읽기는 안 됨)와 replace입니다. 그 밖의 모든 속성 접근은 SecurityError를 던집니다. document도, name 읽기도, Object.keys도 안 됩니다. 실제로 돌려 보면 127.0.0.1 프레임의 contentWindow.document는 SecurityError였고, 메시지는 'Blocked a frame with origin http://localhost:4321 from accessing a cross-origin frame'이었습니다. contentWindow.length는 0, closed는 false, postMessage는 function이었습니다. location.href 읽기와 name 읽기는 SecurityError, Object.keys(contentWindow)는 빈 배열이었습니다. 그래서 다른 출처의 프레임과 말하는 길은 하나입니다. postMessage로 메시지를 보내고 message 이벤트로 받습니다. 비동기이고, 받는 쪽은 event.origin을 확인해야 합니다. 1장의 사이트 격리가 이 경계를 프로세스 경계로도 만들어서, 동기로 넘을 길이 구조적으로 없습니다.",
        code: "// 다른 출처 프레임 (http://127.0.0.1:4321) — 실제로 돌려 보면\ncross.contentWindow.document  // SecurityError: Blocked a frame with origin \"http://localhost:4321\" from\n                              accessing a cross-origin frame\ncross.contentWindow.location.href  // SecurityError  (쓰기만 된다)\ncross.contentWindow.name  // SecurityError\nObject.keys(cross.contentWindow)  // []\ncross.contentWindow.length  // 0  ← 허용\ncross.contentWindow.closed  // false  ← 허용\ntypeof cross.contentWindow.postMessage  // 'function'  ← 허용. 유일한 통로\n\n허용되는 것 (사양 CrossOriginProperties)\nWindow:    window  self  location  close  closed  focus  blur  frames  length  top  opener  parent\n  postMessage  [0], [1] …\nLocation:  href (쓰기만)  replace\n\n// 유일한 통로\ncross.contentWindow.postMessage({ type: 'resize' }, 'http://127.0.0.1:4321');\nwindow.addEventListener('message', (e) => { if (e.origin !== 'http://127.0.0.1:4321') return; /* … */ });",
        terms: [
          {
            term: "교차 출처 (cross-origin)와 SecurityError",
            body: "스킴·호스트·포트 중 하나라도 다르면 교차 출처입니다. localhost와 127.0.0.1은 같은 기계지만 호스트 글자가 달라 교차 출처입니다. 교차 출처 프레임의 Window에 허용된 속성 밖을 건드리면 브라우저가 SecurityError를 던집니다. 한 사이트가 다른 사이트의 화면을 읽거나 조작하지 못하게 하는 선입니다.",
          },
          {
            term: "postMessage",
            body: "출처가 다른 창·프레임 사이에 메시지를 보내는 유일한 공식 통로입니다. 보내는 쪽은 받을 출처를 둘째 인자로 적고, 받는 쪽은 message 이벤트의 origin을 확인합니다. 비동기입니다. 구조화 복제로 객체를 복사해 보내므로 함수나 DOM 노드는 못 보냅니다. 사이트 격리 아래서는 프로세스 사이의 IPC가 됩니다.",
          },
        ],
      },
      {
        label: "문제: 결제 프레임의 높이를 읽으려다 SecurityError",
        body: "결제 대행사의 폼을 iframe으로 띄웁니다. 폼 길이가 카드 종류마다 달라서 iframe 높이를 안의 내용에 맞추려 합니다. iframe.contentWindow.document.body.scrollHeight를 읽습니다. SecurityError입니다. 대행사 도메인은 우리와 다른 출처입니다. 허용된 열몇 개 속성에 document는 없습니다. 실제로 돌려 보면 같은 메시지였습니다. 처방은 안쪽이 자기 높이를 재서 postMessage로 보내고, 바깥이 받아서 iframe.style.height를 쓰는 것입니다. 대행사가 그 메시지를 보내 주지 않으면 할 수 없습니다. 경계는 양쪽이 합의해야 넘습니다.",
      },
      {
        label: "문제가 나는 경우: 세 경계가 겹치는 자리",
        body: "경우 ㄱ, 교차 출처 DOM 접근입니다. 위의 사고입니다. 경우 ㄴ, instanceof입니다. 프레임에서 받은 배열을 부모의 Array로 instanceof하면 false입니다. 같은 출처여도 realm이 다릅니다. 실제로 돌려 보면 그랬습니다. Array.isArray나 덕 타이핑으로 검사합니다. 경우 ㄷ, 네비게이션 뒤의 옛 참조입니다. 2장의 사고입니다. contentWindow는 같은데 안의 Window가 바뀌어 붙여 둔 속성이 사라집니다. 경우 ㄹ, 이벤트가 경계를 넘지 않습니다. 부모에서 '바깥 클릭하면 드롭다운 닫기'를 document에 걸어도 iframe 안의 클릭은 부모 document에 오지 않습니다. 드래그 중 마우스가 iframe 위로 지나가면 mousemove가 끊깁니다. 경우 ㅁ, 포커스와 스크롤이 따로입니다. 프레임 안의 포커스는 부모의 document.activeElement에 iframe 요소로만 보입니다. 경우 ㅂ, 서드파티 쿠키 차단입니다. 교차 사이트 프레임 안의 로그인은 쿠키가 막혀 안 됩니다. 분할 쿠키(CHIPS)나 다른 설계가 필요합니다. 경우 ㅅ, 끼우기 거부입니다. 상대 서버가 X-Frame-Options나 CSP frame-ancestors로 막으면 빈 프레임입니다. 콘솔에만 오류가 나고 자바스크립트로는 알 수 없습니다. 경우 ㅇ, origin 미검증입니다. message 핸들러가 e.origin을 확인하지 않으면 아무 사이트가 보낸 메시지도 처리합니다. 보안 구멍입니다.",
        code: "경우        언제 생기나                      겉모습                                들통나는 때\nㄱ 교차 출처 DOM  contentWindow.document (다른 출처)    SecurityError: Blocked a frame …          대행사·광고\n                                                   프레임\nㄴ realm instanceof  프레임에서 온 배열·Date 를 instanceof  false (같은 출처여도)                     프레임\n                                                      데이터 검사\nㄷ 옛 Window 참조  프레임 네비게이션 뒤 참조에 붙인 속성    참조는 같은데 속성 undefined                프레임이 다음\n                                                 단계로 간 뒤\nㄹ 이벤트 경계  iframe 안 클릭이 부모 document 에 안 옴  바깥 클릭 감지 실패, 드래그 끊김             프레임 위에서 조작할 때\nㅁ 포커스·스크롤  프레임 안 포커스                       부모의 activeElement 는 <iframe>             키보드 탐색\nㅂ 서드파티 쿠키  교차 사이트 프레임 안 로그인             쿠키가 안 붙어 로그아웃 상태                 Safari·Chrome\n                                                차단 뒤\nㅅ 끼우기 거부  X-Frame-Options / frame-ancestors    빈 프레임. JS 로는 못 안다                   콘솔만\nㅇ origin 미검증  message 핸들러에 origin 확인 없음       아무 사이트의 메시지도 처리                 보안 점검 때",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 프레임 경계는 세 선의 겹침이다",
        body: "iframe 하나에 선이 셋 그어집니다. 첫째, 문서 경계입니다. DOM 트리가 따로이고 이벤트도 그 트리 안에서만 흐릅니다(ㄹ, ㅁ). 둘째, realm 경계입니다. 내장 객체가 따로여서 instanceof가 깨집니다(ㄴ). 셋째, 출처 경계입니다. 다르면 보안 선이 되어 열몇 개 속성 밖은 전부 막히고(ㄱ), 사이트 격리로 프로세스까지 갈립니다. 같은 출처면 앞의 둘만 있고, 다른 출처면 셋 다 있습니다. 많은 사고가 '같은 출처에서 되던 것이 다른 출처에서 안 된다'인 이유입니다. 셋째 선 때문입니다. 그리고 WindowProxy가 네비게이션을 넘어 같은 객체로 남는다는 2장의 사실이 여기 겹쳐 ㄷ이 납니다. 경계를 넘는 공식 통로는 하나, postMessage입니다. 비동기이고 복사이고 출처를 확인해야 합니다. 그 통로를 설계에 넣지 않은 프레임 연동은 ㄱ·ㄹ·ㅂ 중 하나에서 막힙니다.",
        code: "<iframe> 하나에 그어지는 선\n① 문서 경계     DOM 트리 따로 · 이벤트 흐름 따로 · CSS 따로               → ㄹ ㅁ         (같은 출처여도)\n② realm 경계    Array · Date · Promise 가 따로                        → ㄴ ㄷ         (같은 출처여도)\n③ 출처 경계     열세 속성 밖은 SecurityError · 다른 프로세스 · 쿠키 분리    → ㄱ ㅂ ㅅ ㅇ    (다른 출처일 때만)\n\n같은 출처:  ① ②           다른 출처:  ① ② ③\n\n유일한 통로:  postMessage  (비동기 · 구조화 복제 · origin 확인)\n  안쪽:  parent.postMessage({ height }, 'https://shop.example')\n  바깥:  addEventListener('message', e => { if (e.origin !== 'https://pay.example') return;\n        iframe.style.height = e.data.height + 'px'; })",
        codeLang: "text",
      },
      {
        label: "다음 장의 입구",
        body: "브라우저가 만드는 물건은 다 보았습니다. 프로세스, window, document, DOM, CSSOM, 레이아웃 트리, 글리프, 레이어, 프레임, 그리고 프레임 속 프레임. 이 위에 Vue나 React가 올라앉습니다. 프레임워크는 DOM을 직접 만지는 대신 자기 트리(vdom)를 두고 둘을 맞춥니다. 그 맞춤이 브라우저 파이프라인의 어디에서 일어나는지, 서버가 먼저 그린 HTML을 어떻게 이어받는지가 마지막 장입니다.",
      },
      {
        label: "확인 질문",
        body: "같은 회사의 두 서비스 a.example.com과 b.example.com이 있습니다. a가 b를 iframe으로 띄우고 contentWindow.document를 읽으려 합니다. 될까요? 그리고 둘이 같은 서버(IP)에 있다면 달라질까요?",
        notes: [
          {
            title: "답",
            body: "안 됩니다. 출처는 스킴·호스트·포트의 글자 비교입니다. a.example.com과 b.example.com은 호스트가 달라 교차 출처입니다. 같은 서버, 같은 회사, 같은 IP여도 상관없습니다. 실제로 돌려 보면 localhost와 127.0.0.1도 같은 서버인데 SecurityError였습니다. 옛날에는 document.domain을 둘 다 example.com으로 맞춰 같은 출처로 만드는 길이 있었지만 지금은 기본으로 막혀 있습니다. 둘이 말하려면 postMessage이고, 받는 쪽이 origin을 확인합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "WHATWG HTML — CrossOriginProperties (교차 출처에서 허용되는 속성)", href: `${HTML}/nav-history-apis.html#crossoriginproperties-(-o-)` },
      { label: "WHATWG HTML — The WindowProxy exotic object", href: `${HTML}/nav-history-apis.html#the-windowproxy-exotic-object` },
      { label: "MDN — Same-origin policy", href: `${MDN}/Security/Same-origin_policy` },
      { label: "MDN — Window: postMessage() method", href: `${MDN}/API/Window/postMessage` },
      { label: "Chrome — Inside look at modern web browser, part 1 (Site Isolation)", href: `${CHROME}/inside-browser-part1` },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "render-s12",
    name: "12장 · 프레임워크가 끼어드는 자리: 마운트, 묶음 갱신, 하이드레이션",
    tagline: "Vue 는 두 트리를 맞춘다. 브라우저 파이프라인과는 마이크로태스크라는 좁은 문으로만 만난다",
    intro:
      "Vue나 React는 브라우저의 어느 단계도 바꾸지 않습니다. 파서도, 레이아웃도, 페인트도 그대로입니다. 프레임워크가 하는 일은 하나입니다. 자기 트리(가상 DOM)를 두고 그것을 진짜 DOM과 맞추는 것입니다. 그 맞춤이 일어나는 자리가 둘입니다. 처음 한 번은 마운트입니다. 번들이 돌면서 빈 #app 안에 DOM을 통째로 만듭니다. 그 뒤로는 갱신입니다. 상태가 바뀌면 10장의 마이크로태스크에서 모아 한 번 패치합니다. 서버 렌더링(SSR)이면 셋째 자리가 생깁니다. 서버가 보낸 HTML을 브라우저 파서가 먼저 DOM으로 만들어 그리고(FCP), 번들이 도착하면 그 DOM을 버리지 않고 이어받습니다. 하이드레이션입니다. 이때 서버의 트리, 파서가 고친 트리(4장), 클라이언트의 가상 트리 셋이 같아야 합니다. 다르면 불일치 경고입니다. 이 장의 질문은 하나입니다. 세 트리가 어디서 어긋나는가.",
    blocks: [
      {
        label: "무슨 일이 일어나나: 마운트 → 갱신 → (SSR 이면) 하이드레이션",
        body: "클라이언트 렌더링(CSR)의 흐름입니다. HTML에는 <div id=\"app\"></div>와 <script type=\"module\" src=\"bundle.js\">만 있습니다. 파서가 그 둘을 읽고 끝납니다(interactive). 모듈 스크립트는 defer라 그때 돕니다. createApp(App).mount('#app')이 컴포넌트를 렌더링해 가상 트리를 만들고, 그것을 진짜 DOM 노드로 바꿔 #app에 넣습니다. 그 전까지 화면은 비어 있습니다. 첫 페인트는 번들이 다 돌고 다음 렌더링 기회에 옵니다. 갱신의 흐름은 10장에서 봤습니다. 상태 변경 → job 큐 → 마이크로태스크 flush → render → vdom 비교 → DOM 패치 → 다음 렌더링 기회에 픽셀입니다. SSR의 흐름입니다. 서버가 같은 컴포넌트를 돌려 HTML 문자열을 만들어 보냅니다. 브라우저 파서가 그것을 DOM으로 만들고 CSS가 오면 그립니다. 번들 전에 글자가 보입니다. 번들이 도착하면 createSSRApp(App).mount('#app')이 가상 트리를 만들되, DOM을 새로 만들지 않고 이미 있는 노드와 하나씩 짝지어 이벤트 리스너만 붙입니다. Vue 문서는 이것을 '클라이언트 하이드레이션'이라 부릅니다. 짝이 안 맞으면 개발 모드에서 'Hydration … mismatch' 경고를 내고 그 부분을 클라이언트 쪽으로 다시 그립니다. 하이드레이션 전에는 글자는 보이지만 버튼이 반응하지 않습니다.",
        code: "CSR                                                     SSR\n파서: <div id=app></div> <script type=module>              파서: 서버가 보낸 완성된 HTML → DOM → (CSS 오면) 페인트\n                                                          ← 글자가 먼저 보인다\n      │ interactive                                            │ 그러나 버튼은 아직 반응 없음\n번들 실행: createApp(App).mount('#app')                   번들 실행: createSSRApp(App).mount('#app')\n      │ render → vdom → DOM 노드 생성 → #app 에 넣음               │ render → vdom → 기존 DOM 노드와 하나씩 짝 → 리스너 붙임 (하이드레이션)\n      │                                                         │ 짝이 안 맞으면: 경고 + 그 부분 다시 그림\n다음 렌더링 기회: 첫 페인트 (여기서야 글자가 보인다)          상호작용 가능\n\n갱신 (둘 다 같다)\n상태 변경 → job 큐 → [마이크로태스크] flush → render → vdom 비교 → DOM 패치 → [렌더링 기회] → 픽셀\n\n세 트리 (SSR)\n서버가 만든 문자열의 트리  ──파서가 고친다(4장)──▶  브라우저 DOM  ──하이드레이션이 비교──▶  클라이언트 vdom\n셋이 같아야 한다. 다르면 불일치",
        codeLang: "text",
        terms: [
          {
            term: "가상 DOM (virtual DOM)과 패치",
            body: "프레임워크가 메모리에 들고 있는 가벼운 트리입니다. 상태가 바뀌면 새 가상 트리를 만들어 옛것과 비교하고, 다른 부분만 진짜 DOM에 반영합니다. 그 반영이 패치입니다. 진짜 DOM 조작은 비싸고(스타일·레이아웃을 더럽힙니다), 가상 트리 비교는 싸다는 계산 위에 서 있습니다.",
          },
          {
            term: "마운트 (mount)",
            body: "프레임워크가 처음으로 가상 트리를 진짜 DOM으로 만들어 지정한 요소(#app) 안에 넣는 일입니다. 그 전까지 그 요소는 비어 있습니다. 마운트는 번들이 실행될 때 일어나므로, 번들이 늦으면 빈 화면이 그만큼 길어집니다. 모듈 스크립트는 파싱이 끝난 뒤 돌기 때문에 #app이 이미 존재한다는 것은 보장됩니다.",
          },
          {
            term: "하이드레이션 (hydration)",
            body: "서버가 보낸 HTML로 이미 만들어진 DOM에 클라이언트 프레임워크가 '물을 주어' 살리는 일입니다. DOM을 새로 만들지 않고 기존 노드에 가상 트리를 짝지어 이벤트 리스너와 상태를 붙입니다. 서버의 트리와 클라이언트의 트리가 같아야 하고, 다르면 불일치 경고가 납니다. i18n 노드의 12단계가 로케일 때문에 나는 불일치를 다룹니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Vue 3.5.45에서 묶음 갱신을 확인했습니다. 10장에 적은 그대로입니다. 세 번 바꾼 상태의 effect가 한 번, 마지막 값으로, 동기 코드가 끝난 뒤 마이크로태스크에서 돌았습니다. nextTick은 그 뒤에 풀렸습니다. 파서가 고치는 트리는 4장에서 확인했습니다. <p><div></div></p>가 p, div, p 셋이 되고, <table><tr>에 tbody가 끼었습니다. 서버가 그런 HTML을 보내면 브라우저 DOM은 서버 문자열의 트리와 다릅니다. 클라이언트 가상 트리는 서버 문자열 쪽(템플릿 그대로)이므로 하이드레이션이 DOM과 비교할 때 어긋납니다. 이 두 측정이 이 장의 두 사고의 근거입니다.",
        code: "// Vue 3.5.45 — 상태 세 번, DOM 반영 한 번 (마이크로태스크)\nstate.n = 1; state.n = 2; state.n = 3;      // 동기. effect 는 아직\n// 동기 코드 끝\n// → effect 실행: n=3                        // 마이크로태스크 flush, 한 번\n// → await nextTick() 뒤                      // flush 다음\n\n// 4장 — 파서가 고친 트리 (서버 문자열 ≠ 브라우저 DOM)\n서버가 보낸 것:   <p><div>…</div></p>              <table><tr><td>…</td></tr></table>\n브라우저 DOM:     <p></p><div>…</div><p></p>        <table><tbody><tr><td>…</td></tr></tbody></table>\n클라이언트 vdom:  p > div                          table > tr                    ← DOM 과 다르다 → 불일치",
      },
      {
        label: "문제: 서버와 브라우저가 다른 글자를 만든다",
        body: "상품 카드에 '3분 전 등록'을 보여 줍니다. 서버가 HTML을 만들 때 Date.now()로 계산해 '3분 전'을 적습니다. 브라우저가 1초 뒤 하이드레이션하며 같은 컴포넌트를 돌리면 Date.now()가 달라 '3분 전'이거나 '4분 전'입니다. 다르면 'Hydration text mismatch' 경고가 나고 그 노드를 다시 그립니다. 운영 모드에서는 경고 없이 다시 그리므로, 글자가 한 번 바뀌는 깜빡임만 남습니다. 같은 모양의 원인이 더 있습니다. Math.random(), 브라우저 전용 API(window.innerWidth로 모바일 여부 결정), 그리고 로케일입니다. 서버는 쿠키로 ko를, 브라우저는 navigator.language로 en을 골랐으면 모든 글자가 어긋납니다. i18n 노드의 12단계가 그 사고입니다. 처방은 입력을 같게 하는 것입니다. 시각은 서버가 정해 데이터로 내려주고, 로케일은 서버가 정해 HTML에 실어 브라우저가 읽기만 하고, 브라우저 전용 값은 마운트 뒤(onMounted)에만 씁니다.",
      },
      {
        label: "문제가 나는 경우: 세 트리와 두 시점이 어긋나는 자리",
        body: "경우 ㄱ, 상태 직후 DOM 읽기입니다. 10장의 사고입니다. 패치는 마이크로태스크에서 일어나니 그 전에 읽으면 옛 값입니다. 경우 ㄴ, 서버와 브라우저의 다른 입력입니다. 위의 사고입니다. Date, 랜덤, 로케일, window 크기입니다. 경우 ㄷ, 파서가 고친 트리입니다. 템플릿의 <p><div>, <table><tr>, <a> 안의 <a>, <ul> 바로 안의 <div>가 서버 문자열과 다른 DOM이 되어 하이드레이션이 어긋납니다. 4장의 규칙이 여기서 경고로 나타납니다. 경우 ㄹ, 서버에서 window입니다. setup 최상위에서 window나 document를 읽으면 서버에서 ReferenceError로 렌더링이 실패합니다. 경우 ㅁ, CSR의 빈 화면입니다. 번들이 돌기 전까지 #app이 비어 있습니다. 느린 망에서 몇 초의 흰 화면이고 검색 엔진이 보는 것도 빈 div입니다. 경우 ㅂ, SSR의 죽은 시간입니다. 글자는 보이는데 번들이 아직이라 버튼이 반응하지 않습니다. 사용자는 '고장'으로 봅니다. 경우 ㅅ, 프레임워크 밖의 DOM 조작입니다. v-html로 넣은 내용이나 다른 라이브러리가 바꾼 DOM은 가상 트리에 없어서 다음 패치가 덮어씁니다. 경우 ㅇ, 큰 갱신입니다. 1,000행 목록을 한 번에 바꾸면 패치 자체가 긴 태스크가 되고, 이어지는 레이아웃도 깁니다. key 없는 v-for는 노드를 재사용하지 못해 더 큽니다.",
        code: "경우        언제 생기나                        겉모습                                   들통나는 때\nㄱ 상태 직후 읽기  items.push 뒤 scrollHeight          옛 값. await nextTick() 필요               스크롤이 한\n                                                   칸 모자람\nㄴ 입력 불일치  Date.now · Math.random · 로케일 · innerWidth  Hydration mismatch 경고, 글자 깜빡임        SSR\n                                                         첫 로드\nㄷ 파서가 고친 트리  <p><div>, <table><tr>, <a><a>       불일치 경고. 그 부분 다시 그림                SSR 첫 로드\nㄹ 서버에서 window  setup 최상위에서 window 읽음          서버 ReferenceError, 500                   SSR 빌드 뒤\n                                                   첫 요청\nㅁ CSR 빈 화면  번들 전까지 #app 비어 있음             흰 화면 몇 초. 검색 엔진은 빈 div              느린 망, SEO\nㅂ SSR 죽은 시간  글자는 보이는데 번들 전                버튼 무반응                              느린 망 (TTI 지표)\nㅅ 밖의 DOM 조작  v-html · 외부 라이브러리가 DOM 변경      다음 패치가 덮어씀                        상태가 바뀐 뒤\nㅇ 큰 갱신    1,000행 한 번에, key 없는 v-for        긴 태스크 + 긴 레이아웃                     목록 정렬·필터 때\n\n// ㄴ ㄹ 의 처방 — 브라우저 전용 값은 마운트 뒤에\nconst width = ref(0);\nonMounted(() => { width.value = window.innerWidth; });     // 서버에서는 돌지 않는다. 하이드레이션 뒤 한 번 더 그려진다",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 두 트리의 동기화가 좁은 문 둘로만 파이프라인과 만난다",
        body: "프레임워크의 일은 가상 트리와 진짜 DOM을 같게 유지하는 것입니다. 그 일이 브라우저 파이프라인과 만나는 문이 둘입니다. 하나는 시간의 문입니다. 패치는 마이크로태스크에서, 픽셀은 렌더링 기회에서 일어납니다. 그 사이의 어느 시점에 코드가 끼어드느냐가 ㄱ을 정합니다. 다른 하나는 공간의 문입니다. SSR에서는 트리가 셋입니다. 서버 문자열, 파서가 고친 DOM, 클라이언트 vdom. 셋이 같아야 하는데 둘째는 4장의 규칙이 바꾸고(ㄷ), 셋째는 실행 환경이 바꿉니다(ㄴ, ㄹ). 그리고 프레임워크가 모르는 손이 DOM을 바꾸면 동기화 자체가 깨집니다(ㅅ). CSR과 SSR은 같은 저울의 양끝입니다. CSR은 첫 글자가 늦고(ㅁ), SSR은 첫 반응이 늦습니다(ㅂ). 처방은 문을 아는 것입니다. DOM을 읽는 코드는 nextTick 뒤에, 환경에 따라 다른 값은 마운트 뒤에, 템플릿은 파서가 고칠 여지 없이, DOM은 프레임워크만 만지게 둡니다.",
        code: "프레임워크의 일:  vdom ◀──같게 유지──▶ DOM\n\n문 ①  시간:  상태 변경 ─[마이크로태스크: 패치]─▶ DOM ─[렌더링 기회: 스타일·레이아웃·페인트]─▶ 픽셀\n              여기서 읽으면 옛 값 (ㄱ)         여기서 읽으면 새 값, 아직 안 보임\n\n문 ②  공간 (SSR):  서버 문자열 ──파서(4장)──▶ 브라우저 DOM ◀──하이드레이션 비교──▶ 클라이언트 vdom\n                              ㄷ 가 바꾼다                                        ㄴ ㄹ 이 바꾼다\n\n문 밖에서 DOM 을 바꾸면 (v-html · 외부 라이브러리) → 동기화가 깨진다 (ㅅ)\n\nCSR ◀────── 같은 저울 ──────▶ SSR\n첫 글자 늦음 (ㅁ)              첫 반응 늦음 (ㅂ)\n\n처방:  DOM 읽기는 nextTick 뒤 · 환경 값은 onMounted · 템플릿은 tbody·p 중첩을 명시 · DOM 은 프레임워크만",
        codeLang: "text",
      },
      {
        label: "열두 장을 돌아보면",
        body: "순서를 한 줄로 적으면 이렇습니다. 주소 → 브라우저 프로세스가 받아 렌더러 프로세스에 커밋(1장) → realm과 Window(2장) → Document와 네 시점(3장) → 바이트가 토큰이 되고 트리가 되되 틀린 것도 고쳐 쓴다(4장) → 스크립트가 파서를 멈추고 CSS가 스크립트를 멈춘다(5장) → CSS가 CSSOM이 되어 요소마다 모든 속성의 값(6장) → 상자마다 자리와 크기, 폭은 내려오고 높이는 올라온다(7장) → 글자는 폰트·셰이퍼·OS가 정한다(8장) → 설계도를 레이어로 나눠 다른 스레드가 칠하고 합친다(9장) → 이 뒤 절반을 이벤트 루프가 프레임마다 다시 돈다(10장) → iframe마다 이 전부가 하나씩 더(11장) → 프레임워크는 마이크로태스크와 하이드레이션이라는 문으로 들어온다(12장). 사고의 자리도 한 줄로 적을 수 있습니다. 한 스레드의 줄, 세 겹의 전역, 네 시점, 고쳐 쓴 트리, 두 대기 사슬, 캐스케이드의 네 단계, 의존 그래프, 환경의 함수, 메인 스레드로 돌아가는 변화, 공유 예산, 세 경계, 세 트리. 각 장의 '문제의 구조'가 그 이름입니다. 어떤 화면 버그를 만나든 이 열두 자리 중 하나에 대어 보면 어디서 난 것인지 나옵니다.",
      },
      {
        label: "확인 질문",
        body: "Nuxt 페이지에 <p v-if=\"isMobile\">모바일</p>가 있고, isMobile은 setup에서 window.innerWidth < 768로 계산합니다. 서버에서 무슨 일이 나고, 그것을 고친 뒤에는 어떤 다른 문제가 남을까요?",
        notes: [
          {
            title: "답",
            body: "서버에는 window가 없어 setup이 ReferenceError로 실패합니다(ㄹ). 흔한 첫 수정은 typeof window !== 'undefined' 조건입니다. 그러면 서버는 false로 그려 <p>를 빼고, 브라우저는 모바일이면 true로 그려 <p>를 넣습니다. 서버 트리와 클라이언트 트리가 달라 하이드레이션 불일치 경고가 나고 그 부분이 다시 그려집니다(ㄴ). 바른 수정은 값을 onMounted에서 정하는 것입니다. 서버와 첫 하이드레이션은 둘 다 false로 같고, 마운트 뒤 한 번 더 그려져 모바일이면 <p>가 나타납니다. 그 '한 번 더'가 깜빡임이라면 CSS 미디어 쿼리로 보이기·숨기기를 옮겨 자바스크립트 없이 해결하는 것이 가장 낫습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Vue — Server-Side Rendering: Client Hydration", href: "https://vuejs.org/guide/scaling-up/ssr.html#client-hydration" },
      { label: "Vue — Reactivity Fundamentals: DOM Update Timing", href: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing" },
      { label: "Vue — Rendering Mechanism (virtual DOM, patch)", href: "https://vuejs.org/guide/extras/rendering-mechanism.html" },
      { label: "React — hydrateRoot", href: "https://react.dev/reference/react-dom/client/hydrateRoot" },
      { label: "WHATWG HTML — The 'in body' insertion mode (파서가 고치는 규칙)", href: `${HTML}/parsing.html#parsing-main-inbody` },
    ],
  },
];
