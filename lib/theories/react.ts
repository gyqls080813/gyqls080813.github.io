import type { Theory } from ".";

/**
 * React — ko.react.dev 의 목차를 그대로 따른다.
 *
 * 배우기(Learn)와 참고서(Reference) 두 갈래, 그 아래 그룹과 페이지. 노드 하나가 문서의 그룹 하나다.
 * 시트는 그 그룹의 페이지들이 무엇을 말하는지 → 실제로 돌려 본 결과 → 그 자리에서 나는 사고 →
 * 사고의 구조 → 다음 입구 순서로 적는다. i18n·렌더링·JavaScript 노드와 같은 틀이다.
 * '실제로 돌려 보면'은 React 19.3.1 을 Node 24(서버 API)와 Chrome 156(클라이언트, esm.sh 개발 빌드)에서 돌린 결과다.
 */

const DOCS = "https://react.dev";
const KO = "https://ko.react.dev";

export const reactTheories: Theory[] = [
  {
    id: "react",
    name: "React",
    tagline: "화면을 명령이 아니라 결과로 쓰는 도구",
    intro:
      "직접 DOM을 다루면 코드가 '무엇을 보여줄지'가 아니라 '무엇을 바꿀지'로 쌓입니다. 지금 화면이 어떤 상태인지 알아야 다음 명령을 쓸 수 있고, 그 전제가 하나라도 어긋나면 화면과 데이터가 갈라집니다. React는 그 순서를 뒤집습니다. 지금 데이터가 이러면 화면은 이렇게 생겼다고 쓰면, 무엇을 어떻게 바꿀지는 React가 계산합니다. 이 노드 아래의 시트들은 공식 문서의 목차를 그대로 따릅니다. 배우기 쪽(Learn) 네 그룹과 시작하기, 참고서 쪽(Reference) 여덟 갈래입니다. 각 시트에 React 19.3.1을 실제로 돌려 본 결과를 붙였습니다.",
    blocks: [
      {
        label: "렌더는 계산이고, 커밋이 반영이다",
        body: "React에서 렌더링은 화면을 그리는 일이 아니라 컴포넌트 함수를 불러 무엇을 보여줄지 알아내는 일입니다. 그 결과를 실제 DOM에 옮기는 것은 그다음 단계인 커밋이고요. 이 둘이 나뉘어 있다는 것이 React를 쓰면서 제일 자주 되돌아온 사실이었습니다. 리렌더가 일어났다고 해서 DOM이 바뀐 것은 아니고, 화면이 그대로라고 해서 계산이 없었던 것도 아닙니다.",
      },
      {
        label: "순수해야 React가 마음대로 부를 수 있다",
        body: "React는 컴포넌트를 순수 함수로 가정합니다. 같은 입력이면 같은 결과를 돌려주고, 렌더 중에 자기 바깥의 값을 건드리지 않는 함수라는 뜻입니다. 이 가정이 있어야 React가 컴포넌트를 언제 몇 번 부르든 결과가 같습니다. 개발 모드의 StrictMode가 컴포넌트를 두 번 부르는 것도 이 가정이 깨진 곳을 드러내기 위해서입니다. 렌더 중에 만든 값을 렌더 중에 바꾸는 것은 괜찮습니다 — 바깥이 모르는 값이니까요.",
        code: "// 렌더 바깥의 값을 건드린다 — 두 번 부르면 결과가 달라진다\nlet guest = 0;\nfunction Cup() {\n  guest = guest + 1;\n  return <h2>Tea cup for guest #{guest}</h2>;\n}\n\n// 입력만 읽는다 — 몇 번을 부르든 같다\nfunction Cup({ guest }) {\n  return <h2>Tea cup for guest #{guest}</h2>;\n}",
      },
      {
        label: "그래서 최적화의 방향이 정해진다",
        body: "리렌더가 비싸다고 느껴질 때 손댈 곳은 대체로 셋 중 하나입니다. 렌더를 덜 일으키거나, 렌더 한 번의 비용을 줄이거나, 애초에 React가 모르는 곳에 값을 두거나. 앞의 둘은 React 안에서 하는 일이고 마지막은 경계 바깥으로 나가는 일입니다. 셋을 구분하지 않으면 메모이제이션을 아무 데나 붙이게 됩니다.",
      },
      {
        label: "실제로 부딪힌 곳",
        body: "이 개념이 실전에서 문제가 된 자리는 대부분 '상태가 아닌 값을 상태로 뒀을 때'였습니다. 초당 수백 번 들어오는 마우스 이벤트를 상태로 받으면 화면이 그 횟수만큼 다시 계산됩니다. 화면에 그려지지 않는 값이라면 애초에 렌더를 일으킬 이유가 없다는 것을, 프레임이 떨어지고 나서야 알았습니다.",
      },
      {
        label: "문서의 두 갈래와 이 노드의 시트",
        body: "공식 문서는 배우기(Learn)와 참고서(Reference)로 갈라져 있습니다. 배우기는 '왜'를 순서대로 가르치고, 참고서는 '정확히 무엇'을 API마다 적습니다. 이 노드의 시트도 그 둘을 따릅니다. 아래 표가 노드와 문서 그룹의 짝이고, 그 그룹에서 가장 자주 나는 사고를 한 줄씩 적었습니다. 어떤 버그를 겪었다면 그 줄의 시트로 가면 됩니다.",
        code: "배우기 (Learn)                          문서 그룹                                       대표 사고\n  시작하기                              빠른 시작 · 자습서 · React로 사고하기 · 설치 · 설정 · 컴파일러   -\n    빠른 시작                           한 페이지 10절                                   JSX 에서 class, 닫지 않은 태그\n    설치                                새 앱 · 처음부터 · 기존 프로젝트에 추가              CRA 를 찾는다 (없다)\n    설정                                에디터 · TypeScript · 개발자 도구                   타입 없는 props\n    React 컴파일러                       소개 · 설치 · 점진적 도입 · 디버깅                   규칙을 어긴 컴포넌트는 건너뛴다\n  React 배우기\n    UI 표현하기 (9)                      컴포넌트 · JSX · props · 조건 · 리스트 · 순수 · 트리     key 없는 리스트, 렌더 중 바깥 변경\n    상호작용성 더하기 (8)                 이벤트 · state · 렌더와 커밋 · 스냅샷 · 큐 · 객체·배열   같은 틱에 +1 세 번이 +1\n    State 관리하기 (8)                    input · 구조 · 공유 · 보존과 초기화 · reducer · context   같은 자리라 state 가 남는다\n    탈출구 (8)                           ref · DOM · Effect · 필요 없는 Effect · 생명주기 · 의존성 · 커스텀 훅   Effect 로 파생 상태\n참고서 (Reference)\n  react                                 훅 19개 · 컴포넌트 6개 · API 12개                  useEffect 의존성, StrictMode 두 번\n  react-dom                             useFormStatus · 컴포넌트 · API · 클라이언트 · 서버 · 정적   renderToString 은 Suspense 를 못 기다린다\n  React 컴파일러                          설정 · 지시어 · 라이브러리 컴파일                    'use no memo' 남발\n  개발자 도구                            Performance 트랙                                  -\n  ESLint 플러그인                         react-hooks 린트 17개                              exhaustive-deps 끄기\n  React 규칙                             순수 · React 가 부른다 · 훅의 규칙                    조건부 훅\n  서버 컴포넌트                           서버 컴포넌트 · 서버 함수 · 'use client' · 'use server'   서버 컴포넌트에 useState\n  레거시 API                             Children · cloneElement · Component · createElement …  forwardRef 가 더는 필요 없다",
        codeLang: "text",
      },
      {
        label: "실제로 돌린 것",
        body: "React 19.3.1을 두 곳에서 돌렸습니다. Node 24에서는 react-dom/server의 renderToString·renderToStaticMarkup·renderToReadableStream으로 서버 쪽 동작을, Chrome 156에서는 esm.sh의 개발 빌드로 createRoot·hydrateRoot·flushSync·createPortal과 훅들을 돌렸습니다. 확인한 것은 이렇습니다. 상태 갱신 묶음(핸들러 안에서 세 번 set → 렌더 한 번), 스냅샷(같은 값 +1 세 번 → +1), 함수형 갱신(→ +3), StrictMode의 두 번 렌더·두 번 효과, 효과 순서(자식 layout → 부모 layout → 자식 effect → 부모 effect), key 변경의 상태 초기화, 같은 자리의 상태 보존, 제어 컴포넌트 경고 문구, 포털 이벤트가 React 트리로 버블, ref 변경은 렌더 없음, memo가 새 객체 props에 무력함(3 vs 1), useTransition으로 입력이 먼저 반영, Suspense 드러내기의 300ms 묶음, 하이드레이션 불일치가 onRecoverableError로 오는 것, 렌더 중 setState의 'Too many re-renders', 훅 순서 변경 경고, useDeferredValue가 한 렌더 뒤처지는 것, 서버의 useId 모양, renderToString이 Suspense를 못 기다리는 것, 스트리밍이 fallback을 먼저 보내는 것. 각 시트에 그 결과를 붙였습니다.",
      },
    ],
    sources: [
      { label: "Render and Commit", href: `${DOCS}/learn/render-and-commit` },
      { label: "Keeping Components Pure", href: `${DOCS}/learn/keeping-components-pure` },
      { label: "React 문서 (한국어)", href: `${KO}/learn` },
    ],
  },

  {
    id: "rl",
    name: "Learn React",
    tagline: "모르는 것을 순서대로 배우는 쪽",
    intro:
      "공식 문서는 배우는 곳과 찾아보는 곳을 나눠 놨습니다. 이쪽은 배우는 쪽입니다. 필요한 API를 그때그때 검색해서 붙이면 화면은 돌아가지만, 왜 그렇게 써야 하는지는 남지 않습니다. 순서대로 읽으면 그 '왜'가 앞 장에 이미 나와 있습니다. 두 갈래입니다. 시작하기(빠른 시작, 자습서, React로 사고하기, 설치, 설정, 컴파일러)와 React 배우기(UI 표현하기, 상호작용성 더하기, State 관리하기, 탈출구).",
    blocks: [
      {
        label: "두 갈래로 나뉜다",
        body: "앞은 시작하기 — 빠른 시작, 설치, 설정, React 컴파일러. 뒤는 본편으로 UI 표현하기, 상호작용성 더하기, 상태 관리하기, 탈출구 네 장입니다. 앞쪽은 한 번 훑고 넘어가는 곳이고, 실제로 다시 돌아오게 되는 것은 뒤쪽 네 장이었습니다.",
      },
      {
        label: "순서가 곧 주장이다",
        body: "화면을 먼저 그리고, 그다음에 상호작용을 붙이고, 그다음에 상태를 설계하고, 탈출구는 맨 끝입니다. 저는 이 배치 자체가 문서의 주장이라고 읽었습니다. ref와 Effect는 React 바깥으로 나가는 문인데, 먼저 배우면 안에서 풀 수 있는 문제까지 밖으로 들고 나가게 됩니다. 실제로 Effect로 해결하려다 결국 '렌더 중에 계산하면 되는 값'이었던 적이 여러 번 있었습니다.",
      },
      {
        label: "다시 읽게 된 장",
        body: "제일 여러 번 돌아온 곳은 상태 관리하기였습니다. 무엇을 상태로 둘지, 그 상태를 어디에 둘지 — 이건 문법 문제가 아니라 설계 문제라서 코드를 다 쓴 뒤에야 틀렸다는 걸 알게 됩니다. 좌석 화면이 버벅이거나 동기화가 어긋났던 자리도 결국 여기로 되돌아왔습니다.",
      },
      {
        label: "페이지 마흔 편의 지도",
        body: "시작하기 쪽은 열여섯 편(컴파일러 네 편 포함), React 배우기는 그룹 넷에 서른세 편입니다. 네 그룹은 각각 질문 하나에 답합니다. UI 표현하기는 '화면을 어떻게 적나', 상호작용성 더하기는 '바뀌는 값을 어떻게 다루나', State 관리하기는 '그 값을 어디에 어떤 모양으로 두나', 탈출구는 'React 바깥(DOM, 네트워크, 타이머)과 어떻게 만나나'입니다. 질문이 앞에서 뒤로 좁아지는 것이 아니라 '안에서 밖으로' 나갑니다.",
        code: "시작하기 (16편)\n  빠른 시작 (1)  ·  자습서: 틱택토 (1)  ·  React 로 사고하기 (1)\n  설치하기 (4): 설치 · 새 앱 만들기 · 처음부터 · 기존 프로젝트에 추가\n  설정하기 (4): 설정 · 에디터 · TypeScript · 개발자 도구\n  React 컴파일러 (4): 소개 · 설치 · 점진적 도입 · 디버깅\n\nReact 배우기 (33편)                    묻는 것                         안 → 밖\n  UI 표현하기 (9)                      화면을 어떻게 적나                 컴포넌트 함수 안\n  상호작용성 더하기 (8)                 바뀌는 값을 어떻게 다루나           state 와 렌더\n  State 관리하기 (8)                    어디에 어떤 모양으로 두나           컴포넌트 사이\n  탈출구 (8)                           React 바깥과 어떻게 만나나           DOM · 네트워크 · 타이머",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 네 그룹의 핵심 한 줄씩",
        body: "React 19.3.1, Chrome 156입니다. UI 표현하기의 핵심인 '순수'는 StrictMode가 렌더를 두 번 부르는 것으로 드러났습니다(렌더 2, 효과 2, 정리 1). 상호작용성 더하기의 핵심인 '스냅샷과 묶음'은 한 핸들러에서 set(1) set(2) set(3)이 렌더 한 번(n=3), 같은 스냅샷으로 +1 세 번이 +1(n=4), 함수형 갱신 세 번이 +3(n=7)으로 나왔습니다. State 관리하기의 핵심인 '자리가 정체다'는 같은 자리의 다른 분기에서 state 5가 남았고, key를 바꾸자 입력값이 '처음'으로 돌아갔습니다. 탈출구의 핵심인 'Effect는 커밋 뒤'는 순서로 나왔습니다. 렌더 → 자식 layout → 부모 layout → 자식 effect → 부모 effect, 리렌더에서는 정리가 먼저입니다.",
        code: "UI 표현하기        StrictMode:  { renders: 2, effects: 2, cleanups: 1 }   /   없음: { 1, 1, 0 }\n상호작용성 더하기   set(1); set(2); set(3)        → render n=3  (한 번)\n                  set(n+1) ×3 (같은 스냅샷)      → render n=4  (+1)\n                  set(x => x+1) ×3              → render n=7  (+3)\nState 관리하기     같은 자리 다른 분기            → 'fancy:5'   (state 보존)\n                  key 'a' → 'b'                 → '사용자가 친 값' → '처음'   (state 초기화)\n탈출구            Parent render → Child render → Child layout → Parent layout → Child effect → Parent effect",
        codeLang: "text",
      },
    ],
    sources: [
      { label: "Learn React", href: `${DOCS}/learn` },
      { label: "Escape Hatches", href: `${DOCS}/learn/escape-hatches` },
    ],
  },

  {
    id: "rl-start",
    name: "시작하기",
    tagline: "빠른 시작 한 페이지, 자습서 하나, 사고법 하나, 그리고 설치·설정·컴파일러",
    intro:
      "문서의 '시작하기' 그룹입니다. 빠른 시작은 매일 쓰는 React의 80%를 한 페이지에, 자습서(틱택토)는 작은 게임을 끝까지 만들며, React로 사고하기는 목업에서 컴포넌트 트리와 상태를 뽑아내는 다섯 단계를 가르칩니다. 그 뒤가 설치하기(새 앱, 처음부터, 기존 프로젝트에 추가), 설정하기(에디터, TypeScript, 개발자 도구), React 컴파일러(소개, 설치, 점진적 도입, 디버깅)입니다. 이 노드의 자식 넷은 빠른 시작·설치·설정·컴파일러이고, 자습서와 사고하기는 이 시트에서 다룹니다. 이 그룹의 질문은 하나입니다. React를 '어디서 어떻게' 시작하는가.",
    blocks: [
      {
        label: "무엇이 들어 있나: 열여섯 편",
        body: "빠른 시작은 컴포넌트, JSX, 스타일, 데이터 표시, 조건부 렌더링, 리스트, 이벤트, state, 훅, 데이터 공유의 열 절입니다. 자습서는 틱택토 게임을 만들며 컴포넌트 분리, props, state 끌어올리기, 불변성, 시간 여행(history)을 익힙니다. React로 사고하기는 다섯 단계입니다. UI를 컴포넌트 계층으로 쪼개기, 정적 버전 만들기, 최소한의 완전한 state 찾기, state가 살 곳 정하기, 역방향 데이터 흐름 추가하기. 설치하기는 프레임워크로 새 앱 만들기(Next.js, React Router, Expo), 처음부터(Vite, Parcel, Rsbuild + 라우팅·데이터·코드 분할을 직접), 기존 프로젝트에 추가(페이지 일부에 createRoot). 설정하기는 에디터(VS Code + ESLint + Prettier), TypeScript(@types/react, props 타입, 훅 타입), 개발자 도구(브라우저 확장, Components·Profiler 탭). React 컴파일러는 소개(자동 메모이제이션), 설치(babel-plugin-react-compiler, 빌드 도구별), 점진적 도입(디렉터리·opt-in·gating), 디버깅(컴파일 건너뛴 컴포넌트 찾기, 'use no memo')입니다.",
        code: "빠른 시작 (1)         10절: 컴포넌트 → JSX → 스타일 → 데이터 → 조건 → 리스트 → 이벤트 → state → 훅 → 공유          → rl-start-quick\n자습서: 틱택토 (1)     컴포넌트 분리 · props · state 끌어올리기 · 불변성 (slice 로 복사) · 시간 여행 (history 배열)      이 시트\nReact 로 사고하기 (1)   ① 컴포넌트 계층 ② 정적 버전 ③ 최소 state ④ state 의 자리 ⑤ 역방향 흐름                   이 시트\n설치하기 (4)          새 앱 (Next.js · React Router · Expo) · 처음부터 (Vite · Parcel · Rsbuild) · 기존에 추가          → rl-start-install\n설정하기 (4)          에디터 · TypeScript · 개발자 도구                                                         → rl-start-setup\nReact 컴파일러 (4)     소개 · 설치 · 점진적 도입 · 디버깅                                                        → rl-start-compiler",
        codeLang: "text",
      },
      {
        label: "React로 사고하기: 다섯 단계",
        body: "문서가 가장 공들여 적은 사고법입니다. 목업과 JSON 데이터가 있을 때 이렇게 갑니다. 첫째, UI를 컴포넌트 계층으로 쪼갭니다. 기준은 하나의 책임(프로그래밍), CSS 선택자(디자인), 데이터 모양(정보 구조)입니다. 둘째, 상호작용 없는 정적 버전을 만듭니다. props만 쓰고 state는 아직 없습니다. 위에서 아래로든 아래에서 위로든 됩니다. 셋째, 최소한의 완전한 state를 찾습니다. 시간이 지나도 안 바뀌면 state가 아니고, 부모가 props로 주면 state가 아니고, 다른 state나 props로 계산할 수 있으면 state가 아닙니다. 넷째, state가 살 곳을 정합니다. 그 state를 쓰는 모든 컴포넌트의 공통 부모(또는 그 위)입니다. 다섯째, 역방향 데이터 흐름을 더합니다. 자식이 부모의 state를 바꾸려면 부모가 setter를 props로 내려줍니다. 셋째 단계의 세 질문이 뒤의 'State 구조 선택하기'로, 넷째가 'State 공유하기'로 이어집니다.",
        code: "목업 + JSON\n   │ ① 컴포넌트 계층으로 쪼갠다 — 한 책임 · CSS 선택자 · 데이터 모양\n   ▼\nFilterableProductTable\n├─ SearchBar\n└─ ProductTable\n   ├─ ProductCategoryRow\n   └─ ProductRow\n   │ ② 정적 버전 — props 만, state 없음\n   │ ③ 최소 state — 시간이 지나도 안 바뀌나? 부모가 주나? 계산할 수 있나? → 셋 다 아니면 state\n   │     검색어 ✓   체크박스 ✓   원래 상품 목록 ✗(props)   필터된 목록 ✗(계산)\n   │ ④ state 의 자리 — 쓰는 컴포넌트들의 공통 부모 → FilterableProductTable\n   │ ⑤ 역방향 흐름 — SearchBar 가 onFilterTextChange 를 받아 부른다\n   ▼",
        codeLang: "text",
        terms: [
          {
            term: "최소한의 완전한 state (minimal complete state)",
            body: "앱이 기억해야 하는 값 중 '다른 것으로 계산할 수 없는 것'만 남긴 집합입니다. 문서의 세 질문으로 거릅니다. 시간이 지나도 안 바뀌면 상수, 부모가 주면 props, 다른 state·props로 계산되면 렌더 중 계산. 필터된 목록을 state로 두면 원본과 어긋날 길이 생기므로 렌더 중에 계산합니다. 'State 구조 선택하기'의 다섯 원칙이 이것을 더 자세히 적습니다.",
          },
          {
            term: "state 끌어올리기 (lifting state up)",
            body: "두 컴포넌트가 같은 값을 봐야 할 때, 그 값을 둘의 공통 부모로 옮기고 props로 내려주는 것입니다. 자습서의 틱택토가 Square의 state를 Board로, Board의 history를 Game으로 끌어올립니다. 자식이 값을 바꾸려면 부모가 '바꾸는 함수'를 props로 내려줍니다. 역방향 데이터 흐름입니다.",
          },
        ],
      },
      {
        label: "자습서가 가르치는 것: 불변성과 시간 여행",
        body: "틱택토 자습서의 두 핵심은 불변성과 끌어올리기입니다. 보드의 칸을 바꿀 때 squares[i] = 'X'가 아니라 const next = squares.slice(); next[i] = 'X'로 복사해 바꿉니다. 이유가 둘입니다. 옛 배열이 그대로 남아 '되돌리기'(시간 여행)가 되고, React가 '바뀌었나'를 참조 비교로 싸게 알 수 있습니다(memo). 그래서 history를 배열로 들고 어느 수로든 점프할 수 있습니다. 자습서는 또 key의 필요를 보입니다. 수 목록을 그릴 때 key가 없으면 경고가 나고, 인덱스를 key로 쓰면 순서가 바뀔 때 틀립니다. 실제로 돌려 보면 key 없는 리스트의 경고는 'Each child in a list should have a unique \"key\" prop.'입니다.",
        code: "// 자습서의 불변성\nfunction handleClick(i) {\n  if (squares[i] || calculateWinner(squares)) return;\n  const nextSquares = squares.slice();        // 복사\n  nextSquares[i] = xIsNext ? 'X' : 'O';       // 복사본을 바꾼다\n  onPlay(nextSquares);                        // 부모(Game)가 history 에 덧붙인다\n}\n\n// 시간 여행 — 옛 배열이 그대로 있어서 가능하다\nconst [history, setHistory] = useState([Array(9).fill(null)]);\nconst currentSquares = history[currentMove];\nfunction jumpTo(move) { setCurrentMove(move); }\n\n// key — 실제로 돌려 보면 (Node 24, 서버 렌더에서도 경고)\n[1, 2].map(i => <li>{i}</li>)   // Each child in a list should have a unique \"key\" prop.",
      },
      {
        label: "문제: 'React 를 시작한다' 가 세 가지 다른 일이다",
        body: "같은 '시작'이 상황에 따라 다른 일입니다. 새 제품이면 프레임워크(Next.js 등)로 시작하라는 것이 문서의 첫 권고입니다. 라우팅·데이터·번들이 묶여 있습니다. 직접 쌓고 싶으면 Vite로 시작하고 라우팅·데이터·코드 분할을 하나씩 고릅니다. 이미 있는 사이트(서버 템플릿, jQuery)에 React를 넣으려면 페이지의 한 조각에 createRoot를 하면 됩니다. 셋을 섞으면 사고가 납니다. 기존 사이트에 Next.js를 통째로 들이려 하거나, 새 제품을 '처음부터'로 시작해 라우터와 데이터 패칭을 직접 다 짜게 됩니다. create-react-app은 더는 권고되지 않고 문서에서 빠졌습니다.",
      },
      {
        label: "문제가 나는 경우: 시작 자리에서",
        body: "경우 ㄱ, 셋을 섞습니다. 위의 사고입니다. 경우 ㄴ, CRA를 찾습니다. 2025년 이후 문서에 없고 유지되지 않습니다. 새 앱은 프레임워크 또는 Vite입니다. 경우 ㄷ, 사고하기 셋째 단계를 건너뜁니다. 계산할 수 있는 값(필터된 목록, 합계)을 state로 두어 원본과 어긋납니다. 경우 ㄹ, state를 너무 아래에 둡니다. 두 형제가 같은 값을 각자 state로 들고 동기화 Effect를 씁니다. 공통 부모로 끌어올립니다. 경우 ㅁ, 배열을 제자리에서 바꿉니다. squares[i] = 'X' 뒤 setSquares(squares)는 같은 참조라 React가 바뀜을 못 봅니다. 복사합니다. 경우 ㅂ, 인덱스를 key로 씁니다. 순서가 바뀌면 state가 엉뚱한 항목에 붙습니다. 경우 ㅅ, 개발자 도구 없이 디버깅합니다. 어느 컴포넌트가 왜 리렌더됐는지 Profiler가 보여 주는데 console.log로 찍습니다. 경우 ㅇ, TypeScript 없이 props를 넘깁니다. 이름이 틀려도 undefined로 조용합니다.",
        code: "경우               언제 생기나                            겉모습                                   들통나는 때\nㄱ 셋을 섞음         기존 사이트에 Next 통째로 · 새 제품을 처음부터   마이그레이션 지옥 · 라우터·데이터 직접        몇 달 뒤\nㄴ CRA              npx create-react-app                   유지 안 됨, 문서에 없음                     의존성 경고\nㄷ 계산 값을 state 로  filtered 를 state 에                   원본과 어긋남                             필터 조건이 바뀔 때\nㄹ state 가 아래에    형제 둘이 각자 state + 동기화 Effect       한 박자 늦거나 무한 루프                    두 곳이 같이 바뀔 때\nㅁ 제자리 변경        arr[i] = x; setArr(arr)                화면이 안 바뀜 (같은 참조)                   클릭했는데 그대로\nㅂ 인덱스 key        key={i} 뒤 정렬·삭제                   입력값이 다른 행에 붙음                      순서가 바뀔 때\nㅅ 도구 없이         console.log 로 리렌더 추적               원인을 못 찾음                            성능 문제\nㅇ 타입 없이         props 이름 오타                         undefined 로 조용                          화면이 비어 보일 때",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 노드 넷이 이 그룹의 나머지입니다. 빠른 시작은 문서의 열 절을 그대로 따라 읽고, 설치는 세 길을, 설정은 에디터·TypeScript·개발자 도구를, 컴파일러는 자동 메모이제이션이 무엇을 바꾸는지를 적습니다. 그 뒤 'React 배우기' 노드가 본편 네 그룹으로 들어갑니다.",
      },
      {
        label: "확인 질문",
        body: "상품 목록 화면을 만듭니다. 서버에서 받은 products, 검색어, '재고 있는 것만' 체크박스, 그리고 화면에 보일 필터된 목록이 있습니다. React로 사고하기의 셋째 단계로 넷 중 무엇이 state일까요? 그리고 그 state는 어디에 살아야 할까요?",
        notes: [
          {
            title: "답",
            body: "검색어와 체크박스 둘만 state입니다. products는 부모(또는 데이터 로더)가 주는 props이고, 필터된 목록은 products·검색어·체크박스로 렌더 중에 계산할 수 있으니 state가 아닙니다. state로 두면 셋 중 하나가 바뀔 때 다시 계산하는 Effect가 필요해지고 한 박자 늦게 어긋납니다. 두 state는 검색창(SearchBar)과 표(ProductTable) 둘이 다 쓰니 공통 부모(FilterableProductTable)에 둡니다. 검색창은 값과 함께 onChange 콜백을 props로 받아 부모의 state를 바꿉니다. 역방향 데이터 흐름입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "빠르게 시작하기", href: `${KO}/learn` },
      { label: "자습서: 틱택토 게임", href: `${KO}/learn/tutorial-tic-tac-toe` },
      { label: "React로 사고하기", href: `${KO}/learn/thinking-in-react` },
      { label: "설치하기", href: `${KO}/learn/installation` },
    ],
  },

  {
    id: "rl-start-quick",
    name: "빠른 시작",
    tagline: "매일 쓰게 될 React의 80%를 한 페이지로 훑는 문서입니다",
    intro:
      "문법을 하나씩 늘어놓은 목록이 아닙니다. 화면 하나를 만들고, 데이터를 넣고, 움직이게 하기까지를 열 개 절로 한 번에 지나갑니다. 그래서 여기서 못 알아들은 자리가 곧 뒤에서 다시 만날 자리이기도 합니다. 문서의 절을 그대로 따라가며 하나씩 풀어 씁니다. 마지막 절에 이 열 절에서 실제로 자주 깨지는 자리를 모았습니다.",
    sections: [
      {
        heading: "1. 컴포넌트 생성 및 중첩하기",
        blocks: [
          {
            label: "React 앱은 컴포넌트로 구성된다",
            body: "컴포넌트는 고유한 로직과 모양을 가진 UI의 일부입니다. 문서가 곧바로 덧붙이는 말이 중요합니다 — 버튼만큼 작을 수도 있고 전체 페이지만큼 클 수도 있다는 것. 크기가 정해져 있지 않다는 뜻이고, 그래서 무엇을 컴포넌트로 뗄지는 React가 정해 주지 않습니다. 문법이 아니라 판단으로 남겨 둔 자리입니다.",
          },
          {
            label: "컴포넌트는 마크업을 반환하는 자바스크립트 함수다",
            body: "마크업을 반환한다는 건 화면을 그린다는 뜻이 아닙니다. 화면이 어떻게 생겨야 하는지 적은 설명서를 돌려줄 뿐이고, 그리는 일은 그 설명서를 받은 React가 합니다. 이 경계를 여기서 잡아 두면 뒤에 나오는 렌더와 커밋이 훨씬 쉬워집니다. 그리고 함수니까 다른 함수 안에서 부르듯 컴포넌트 안에 컴포넌트를 중첩할 수 있습니다.",
            terms: [
              {
                term: "마크업 (markup)",
                body: "글에 표시(mark)를 붙이는 일. 인쇄 교정에서 원고 여백에 '여기 굵게', '여기 제목' 하고 편집 지시를 적어 넣던 데서 온 말이고, HTML의 ML이 그 Markup Language입니다. 그냥 '클릭'이라고 쓰면 글자일 뿐이지만 <button>클릭</button>이라고 쓰면 그 글자에 '이건 버튼이다'라는 표시가 붙습니다.",
              },
            ],
            code: "function MyButton() {\n  return <button>I'm a button</button>;\n}\n\nexport default function MyApp() {\n  return (\n    <div>\n      <h1>Welcome to my app</h1>\n      <MyButton />\n    </div>\n  );\n}",
          },
          {
            label: "대문자와 소문자가 가르는 것",
            body: "컴포넌트 이름은 항상 대문자로, HTML 태그는 소문자로 시작합니다. 이름 규칙처럼 보이지만 실제로는 둘을 가르는 유일한 단서입니다. 소문자로 쓰면 브라우저가 아는 태그로 읽히고, 대문자로 쓰면 내가 만든 함수를 부릅니다. 이 절에서 새로 외울 것은 사실상 이것 하나입니다 — 나머지는 자바스크립트 함수와 모듈 문법이라 React가 더한 것이 없습니다.",
            code: "<MyButton />   // 대문자 → 내가 만든 함수를 부른다\n<button />     // 소문자 → 브라우저가 아는 태그다",
          },
          {
            label: "export default — 이 파일의 주인공",
            body: "한 파일은 여러 개를 내보낼 수 있습니다. 이름을 붙여 내보내면 가져오는 쪽이 그 이름을 맞춰야 하고, default로 내보내면 이름 없이 대표로 하나가 나갑니다. 가져오는 쪽이 이름을 새로 지어도 되는 것도 그래서입니다 — 이름으로 찾는 게 아니니까요. 파일당 default는 최대 하나뿐이라, 이 표시가 곧 '이 파일의 주인공은 얘다'가 됩니다. Next.js에서는 관례를 넘어 규칙입니다. page 파일의 default export가 그 주소의 페이지 자체입니다.",
            code: "// 이름을 붙여 내보내기 — 가져올 때 이름이 맞아야 한다\nexport function Header() {}\nimport { Header } from './parts';\n\n// 이름 없이 대표로 하나 — 가져오는 쪽이 이름을 새로 지어도 된다\nexport default function MyApp() {}\nimport App from './App';",
          },
        ],
      },
      {
        heading: "2. JSX로 마크업 작성하기",
        blocks: [
          {
            label: "JSX는 HTML보다 엄격하다",
            body: "위에서 본 마크업 문법이 JSX입니다. 선택이지만 거의 모든 React 프로젝트가 씁니다. HTML과 닮았지만 규칙이 더 엄격합니다. 태그는 꼭 닫아야 합니다. <br />처럼요. 그리고 컴포넌트는 JSX 태그를 하나만 돌려줄 수 있습니다. 여럿을 돌려주려면 <div>…</div>나 빈 태그 <>…</>로 감쌉니다. HTML에서 JSX로 옮길 것이 많으면 온라인 변환기를 쓰라고 문서가 권합니다. 왜 엄격한지는 JSX가 결국 자바스크립트 함수 호출(createElement)로 바뀌기 때문입니다. 함수는 값을 하나만 돌려주니 루트도 하나이고, 닫지 않은 태그는 파서가 어디서 끝나는지 모릅니다.",
            code: "function AboutPage() {\n  return (\n    <>\n      <h1>About</h1>\n      <p>Hello there.<br />How do you do?</p>\n    </>\n  );\n}\n// 실제로 돌려 보면 — JSX 는 이런 객체로 바뀐다 (React 19.3.1)\n// { $$typeof: Symbol(react.transitional.element), type: 'div', props: { id, className, children }, key: null }  props 는 동결(frozen)",
            terms: [
              {
                term: "JSX",
                body: "자바스크립트 안에 마크업을 적는 문법 확장입니다. 브라우저는 모르고, 빌드 도구(Babel, TypeScript, esbuild)가 React.createElement(또는 jsx()) 호출로 바꿉니다. 그래서 HTML과 규칙이 다릅니다. 함수 호출이라 루트가 하나여야 하고, 태그를 꼭 닫아야 하고, class 대신 className처럼 자바스크립트 이름을 씁니다.",
              },
              {
                term: "Fragment (<>…</>)",
                body: "DOM에 아무것도 남기지 않고 자식 여럿을 묶는 빈 태그입니다. '루트는 하나'라는 JSX 규칙을 지키면서 불필요한 <div>를 피하는 용도입니다. 실제로 돌려 보면 <Fragment><i>a</i><i>b</i></Fragment>의 서버 HTML은 <i>a</i><i>b</i>였습니다. key가 필요하면 <Fragment key={…}>로 길게 씁니다.",
              },
            ],
          },
        ],
      },
      {
        heading: "3. 스타일 추가하기",
        blocks: [
          {
            label: "class 가 아니라 className",
            body: "React에서 CSS 클래스는 className으로 적습니다. HTML의 class 속성과 같은 일을 하지만 자바스크립트에서 class가 예약어라 이름이 바뀌었습니다. CSS 규칙은 보통 별도 CSS 파일에 적고, 그 파일을 어떻게 넣을지(링크 태그, import)는 빌드 도구나 프레임워크가 정합니다. React 자체는 CSS 파일을 다루는 방법을 정하지 않습니다. 가장 단순하게는 HTML에 <link>로 넣습니다. 인라인 스타일은 style={{ color: 'red' }}처럼 객체로 적고, 속성 이름은 camelCase(backgroundColor)입니다.",
            code: "<img className=\"avatar\" />\n\n/* styles.css */\n.avatar { border-radius: 50%; }\n\n// 인라인은 객체, camelCase\n<div style={{ backgroundColor: 'tomato', fontSize: 14 }} />",
          },
        ],
      },
      {
        heading: "4. 데이터 표시하기",
        blocks: [
          {
            label: "중괄호는 자바스크립트로 돌아가는 문",
            body: "JSX 안에서 중괄호 {}를 쓰면 자바스크립트로 돌아갑니다. 변수를 넣어 사용자에게 보일 수 있습니다. <h1>{user.name}</h1>처럼요. 속성 자리에서도 됩니다. 따옴표 대신 중괄호입니다. src={user.imageUrl}. 중괄호 안에는 식(expression)이면 무엇이든 됩니다. 문자열 결합 'Photo of ' + user.name, 함수 호출, 삼항. 문(statement)은 안 됩니다. if, for는 중괄호 안에 못 들어갑니다. style={{ }}의 겹 중괄호는 특별한 문법이 아니라 바깥은 '자바스크립트로', 안은 '객체 리터럴'입니다.",
            code: "const user = { name: 'Hedy Lamarr', imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg', imageSize: 90 };\n\nreturn (\n  <>\n    <h1>{user.name}</h1>\n    <img\n      className=\"avatar\"\n      src={user.imageUrl}\n      alt={'Photo of ' + user.name}\n      style={{ width: user.imageSize, height: user.imageSize }}   // 바깥 { } 는 JS, 안 { } 는 객체\n    />\n  </>\n);",
          },
        ],
      },
      {
        heading: "5. 조건부 렌더링",
        blocks: [
          {
            label: "특별한 문법이 없다 — 자바스크립트 그대로",
            body: "React에는 조건을 적는 특별한 문법이 없습니다. 자바스크립트의 if를 그대로 씁니다. JSX 밖에서 if로 변수에 담아 넣거나, JSX 안에서 삼항 연산자 cond ? a : b를 쓰거나, else가 필요 없으면 && 를 씁니다. cond && <A />는 cond가 참일 때만 A입니다. 함정이 하나 있습니다. 0 && <A />는 0을 렌더링합니다. 0은 거짓이지만 React가 숫자 0은 글자로 그리기 때문입니다. count > 0 && 처럼 불린으로 만듭니다.",
            code: "// JSX 밖에서 if\nlet content;\nif (isLoggedIn) { content = <AdminPanel />; } else { content = <LoginForm />; }\nreturn <div>{content}</div>;\n\n// JSX 안에서 삼항\n<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>\n\n// else 가 없으면 &&\n<div>{isLoggedIn && <AdminPanel />}</div>\n\n// 함정: 0 은 그려진다\n{count && <List />}        // count 가 0 이면 화면에 '0'\n{count > 0 && <List />}    // 불린으로",
          },
        ],
      },
      {
        heading: "6. 리스트 렌더링",
        blocks: [
          {
            label: "map 으로 배열을 요소 배열로, 그리고 key",
            body: "리스트도 자바스크립트입니다. for나 map으로 배열을 JSX 요소 배열로 바꿔 중괄호에 넣습니다. 각 요소에는 key가 필요합니다. 형제 사이에서 유일한 문자열이나 숫자이고, 보통 데이터의 ID입니다. React는 key로 '항목이 추가·삭제·이동됐을 때 어느 것이 어느 것인가'를 압니다. 실제로 돌려 보면 key 없는 리스트는 서버 렌더에서도 경고를 냈습니다. 'Each child in a list should have a unique \"key\" prop.' 배열 인덱스를 key로 쓰면 순서가 바뀔 때 React가 항목을 잘못 짝지어 state가 엉뚱한 항목에 남습니다.",
            code: "const products = [\n  { title: 'Cabbage', isFruit: false, id: 1 },\n  { title: 'Garlic', isFruit: false, id: 2 },\n  { title: 'Apple', isFruit: true, id: 3 },\n];\n\nconst listItems = products.map(product =>\n  <li key={product.id} style={{ color: product.isFruit ? 'magenta' : 'darkgreen' }}>\n    {product.title}\n  </li>\n);\nreturn <ul>{listItems}</ul>;\n\n// 실제로 돌려 보면 (Node 24, renderToString) — key 가 없으면\n// Each child in a list should have a unique \"key\" prop.",
            terms: [
              {
                term: "key",
                body: "리스트의 각 항목에 붙이는 형제 사이 유일한 표식입니다. React가 리렌더 때 '이 항목이 전의 어느 항목인가'를 알아내는 데 씁니다. 데이터의 ID를 쓰고, 인덱스는 순서가 안 바뀔 때만 씁니다. key가 바뀌면 React는 다른 항목으로 보아 state를 버리고 새로 만듭니다. 'State를 보존하고 초기화하기'에서 이것을 의도적으로 쓰는 법이 나옵니다.",
              },
            ],
          },
        ],
      },
      {
        heading: "7. 이벤트에 응답하기",
        blocks: [
          {
            label: "핸들러 함수를 '전달'한다 — 부르지 않는다",
            body: "컴포넌트 안에 이벤트 핸들러 함수를 선언하고 onClick={handleClick}처럼 전달합니다. 괄호를 붙이지 않습니다. onClick={handleClick()}은 렌더할 때 함수를 불러 그 반환값(undefined)을 넘기는 것입니다. React가 사용자가 클릭할 때 함수를 부릅니다. 이름은 on + 이벤트(onClick, onChange, onSubmit)이고 camelCase입니다. 핸들러는 이벤트 객체(e)를 받습니다. React의 합성 이벤트이고 e.nativeEvent가 브라우저 원본입니다. 실제로 돌려 보면 버튼 클릭의 e.nativeEvent는 PointerEvent였습니다. React 19는 이벤트를 각 요소가 아니라 루트 컨테이너에 하나 걸어 위임합니다. 포털 안의 클릭도 DOM이 아니라 React 트리를 따라 부모 핸들러로 올라옵니다.",
            code: "function MyButton() {\n  function handleClick() {\n    alert('You clicked me!');\n  }\n  return (\n    <button onClick={handleClick}>   {/* 전달. handleClick() 이 아니다 */}\n      Click me\n    </button>\n  );\n}\n\n// 실제로 돌려 보면 (Chrome 156): 포털 안 버튼 클릭 순서\n// 포털 안 버튼 (e.nativeEvent: PointerEvent) → React 부모 div onClick (React 트리로 버블) → DOM 부모 리스너",
          },
        ],
      },
      {
        heading: "8. 화면 업데이트하기",
        blocks: [
          {
            label: "기억해야 하면 state, 그 state 는 컴포넌트마다 따로",
            body: "컴포넌트가 무언가를 기억해 보여 주려면 state를 둡니다. import { useState } from 'react' 뒤 const [count, setCount] = useState(0)입니다. 현재 값과 그것을 바꾸는 함수 한 쌍이고, 이름은 [something, setSomething]이 관례입니다. setCount를 부르면 React가 그 컴포넌트를 다시 불러 새 count로 화면을 갱신합니다. 같은 컴포넌트를 두 번 쓰면 각자 자기 state를 갖습니다. 버튼 둘이 각자 카운트합니다. 실제로 돌려 보면 핸들러 안에서 setCount를 세 번 불러도 렌더는 한 번이었습니다(묶음). 그리고 ref와 달리 state를 바꾸면 렌더가 나고, ref를 바꾸면 안 납니다.",
            code: "import { useState } from 'react';\n\nfunction MyButton() {\n  const [count, setCount] = useState(0);\n  function handleClick() {\n    setCount(count + 1);\n  }\n  return <button onClick={handleClick}>Clicked {count} times</button>;\n}\n\n// 같은 컴포넌트 둘 — state 는 따로\n<MyButton />  <MyButton />      // 각자 센다\n\n// 실제로 돌려 보면 (Chrome 156)\nset(1); set(2); set(3)   → 렌더 한 번, n=3      // 묶음\nref.current++ ×2         → 렌더 없음            // ref 는 화면과 무관",
            terms: [
              {
                term: "state와 useState",
                body: "컴포넌트가 렌더 사이에 기억하는 값이고, 바뀌면 React가 그 컴포넌트를 다시 그립니다. useState(초깃값)은 [현재 값, 바꾸는 함수]를 돌려줍니다. 바꾸는 함수를 부르면 다음 렌더에 새 값이 들어옵니다. 지금 렌더의 count는 바뀌지 않습니다(스냅샷). 같은 컴포넌트가 여러 번 쓰이면 인스턴스마다 state가 따로입니다.",
              },
            ],
          },
        ],
      },
      {
        heading: "9. Hook 사용하기",
        blocks: [
          {
                label: "use 로 시작하는 함수, 그리고 두 규칙",
            body: "use로 시작하는 함수를 Hook이라 부릅니다. useState가 내장 훅이고, 다른 내장 훅들은 참고서에 있고, 직접 만들 수도 있습니다(커스텀 훅). 훅은 다른 함수보다 제한이 많습니다. 컴포넌트(또는 다른 훅)의 최상위에서만 부를 수 있습니다. 조건문이나 반복문 안에서는 안 됩니다. 조건 안에서 쓰고 싶으면 그 부분을 새 컴포넌트로 빼서 그 안에 둡니다. 이유는 React가 훅을 '호출 순서'로 구분하기 때문입니다. 렌더마다 같은 순서로 불려야 n번째 useState가 같은 state를 가리킵니다. 실제로 돌려 보면 둘째 렌더에서 훅 순서가 바뀌자 'React has detected a change in the order of Hooks called by …'가 찍혔습니다. 컴포넌트 밖에서 부르면 'Cannot read properties of null (reading 'useState')'입니다. 훅이 없는 자리입니다.",
            code: "// 최상위에서만\nfunction Form() {\n  const [name, setName] = useState('');      // ✓\n  if (name !== '') {\n    useEffect(() => {});                     // ✗ 조건 안 — 순서가 바뀐다\n  }\n}\n\n// 실제로 돌려 보면 (React 19.3.1)\n// 둘째 렌더에서 조건부 useState 가 추가되자:\n//   React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed.\n// 컴포넌트 밖에서 useState():\n//   Cannot read properties of null (reading 'useState')",
            terms: [
              {
                term: "Hook (훅)",
                body: "use로 시작하는 React 함수입니다. 컴포넌트에 state·효과·컨텍스트 같은 React 기능을 '걸어(hook)' 줍니다. 컴포넌트나 다른 훅의 최상위에서, 매 렌더 같은 순서로만 불러야 합니다. React가 훅을 이름이 아니라 호출 순서로 구분하기 때문입니다. ESLint의 rules-of-hooks 규칙이 이것을 잡습니다.",
              },
            ],
          },
        ],
      },
      {
        heading: "10. 컴포넌트 간에 데이터 공유하기",
        blocks: [
          {
            label: "state 를 위로 올리고 props 로 내린다",
            body: "앞 절의 버튼 둘은 각자 셌습니다. 둘이 같은 숫자를 보이려면 state를 둘의 공통 부모(MyApp)로 옮깁니다. 부모가 useState를 갖고, count와 handleClick을 props로 자식에게 내려줍니다. 자식 MyButton은 props로 받은 count를 보이고 onClick에 받은 함수를 걸 뿐 자기 state가 없습니다. 어느 버튼을 눌러도 부모의 handleClick이 돌아 부모의 state가 바뀌고, 부모가 다시 렌더하며 두 자식에게 새 count를 내려줍니다. 이것이 'state 끌어올리기'이고 '데이터는 위에서 아래로, 이벤트는 아래에서 위로'입니다. React로 사고하기의 넷째·다섯째 단계입니다.",
            code: "export default function MyApp() {\n  const [count, setCount] = useState(0);          // state 는 부모에\n  function handleClick() { setCount(count + 1); }\n  return (\n    <div>\n      <h1>Counters that update together</h1>\n      <MyButton count={count} onClick={handleClick} />   {/* 내려준다 */}\n      <MyButton count={count} onClick={handleClick} />\n    </div>\n  );\n}\n\nfunction MyButton({ count, onClick }) {          // props 로 받는다. 자기 state 없음\n  return <button onClick={onClick}>Clicked {count} times</button>;\n}\n\n데이터:  MyApp ──count──▶ MyButton        이벤트:  MyButton ──onClick──▶ MyApp 의 handleClick",
          },
        ],
      },
      {
        heading: "열 절에서 자주 깨지는 자리",
        blocks: [
          {
            label: "문제: {count && <List />} 가 화면에 0 을 그린다",
            body: "'항목이 있을 때만 목록을 보이자'고 {items.length && <List />}를 적었습니다. 항목이 없으면 목록 대신 숫자 0이 화면에 찍힙니다. &&는 왼쪽이 거짓이면 왼쪽 값을 돌려주고, React는 false·null·undefined는 그리지 않지만 0은 글자로 그립니다. 5절의 함정입니다. items.length > 0 && 으로 불린을 만들거나 삼항으로 null을 명시합니다. 열 절 중 가장 자주 나는 사고가 이것과 key입니다.",
          },
          {
            label: "문제가 나는 경우",
            body: "경우 ㄱ, 0이 그려집니다. 위의 사고입니다. 경우 ㄴ, 닫지 않은 태그와 루트 둘입니다. <br>, <img>를 안 닫거나 형제 둘을 그대로 돌려주면 빌드 에러입니다. 경우 ㄷ, class와 for입니다. className, htmlFor입니다. 조용히 무시되지 않고 경고가 납니다. 경우 ㄹ, onClick={handleClick()}입니다. 렌더마다 즉시 불리고 클릭에는 undefined가 걸립니다. 경우 ㅁ, key가 없거나 인덱스입니다. 경고, 그리고 순서가 바뀔 때 state가 엉뚱한 행에. 경우 ㅂ, 조건 안의 훅입니다. 순서 변경 경고와 틀린 state. 경우 ㅅ, 컴포넌트 이름 소문자입니다. <myButton />은 알 수 없는 HTML 태그로 그려지고 함수는 불리지 않습니다. 경우 ㅇ, 중괄호 안에 문입니다. {if (x) …}는 문법 에러입니다. 삼항이나 밖에서 변수로. 경우 ㅈ, state를 각 자식에 두고 동기화합니다. 10절의 끌어올리기를 안 해 두 버튼이 따로 셉니다. 경우 ㅊ, 같은 틱에 setCount(count + 1)을 두 번 부릅니다. +1만 됩니다. 스냅샷이라서입니다. 뒤의 '상호작용성 더하기'가 다룹니다.",
            code: "경우               언제 생기나                        겉모습                                들통나는 때\nㄱ 0 이 그려짐       {arr.length && <A />}              빈 목록 자리에 '0'                     목록이 비었을 때\nㄴ 닫지 않음·루트 둘  <br>  ·  <h1/><p/> 나란히            빌드 에러                             바로\nㄷ class · for      HTML 속성 이름 그대로               경고. className · htmlFor               콘솔\nㄹ 괄호 붙임        onClick={f()}                      렌더 때 바로 실행, 클릭엔 undefined       첫 렌더\nㅁ key 없음·인덱스   map 에 key 없음 · key={i}            경고 · 정렬·삭제 뒤 state 가 다른 행에     순서 바뀔 때\nㅂ 조건부 훅        if 안 useState                     순서 변경 경고 · 틀린 값                  조건이 바뀔 때\nㅅ 소문자 컴포넌트   <myButton />                       빈 태그, 함수 안 불림                    화면이 비었을 때\nㅇ 중괄호 안 문      {if (x) …}                         SyntaxError                           빌드\nㅈ state 가 아래에   자식마다 useState                   버튼 둘이 따로 센다                     같이 바뀌어야 할 때\nㅊ 스냅샷           set(count+1) 두 번                  +1 만                                 더블 클릭 처리",
            codeLang: "text",
          },
          {
            label: "문제의 구조: JSX 는 HTML 이 아니라 함수 호출이고, 컴포넌트는 React 가 부른다",
            body: "열 절의 사고는 두 뿌리입니다. 첫째, JSX는 HTML처럼 보이지만 자바스크립트 함수 호출로 바뀝니다. 그래서 루트가 하나여야 하고(ㄴ), 속성 이름이 자바스크립트 이름이고(ㄷ), 중괄호 안은 식이어야 하고(ㅇ), &&의 결과 값이 그대로 그려지고(ㄱ), 소문자는 문자열 태그로 넘어갑니다(ㅅ). 둘째, 컴포넌트와 핸들러는 내가 부르는 것이 아니라 React가 부릅니다. 그래서 핸들러는 전달하고(ㄹ), 훅은 React가 순서로 세고(ㅂ), state는 React가 컴포넌트 인스턴스마다 들고 있어(ㅈ) 지금 렌더의 값은 스냅샷입니다(ㅊ). key는 그 '인스턴스'를 React가 어떻게 알아보나의 문제입니다(ㅁ). 두 뿌리를 알면 열 절이 두 문장으로 줄어듭니다.",
            code: "뿌리 ①  JSX = 함수 호출 (createElement / jsx)\n   <div className=\"a\">{x}</div>  →  jsx('div', { className: 'a', children: x })\n   루트 하나 (ㄴ) · JS 이름 (ㄷ) · 중괄호는 식 (ㅇ) · && 의 값이 그려진다 (ㄱ) · 소문자는 문자열 (ㅅ)\n\n뿌리 ②  컴포넌트·핸들러는 React 가 부른다\n   onClick={f}  ← 전달 (ㄹ)        훅은 호출 순서로 (ㅂ)        state 는 인스턴스마다 React 가 든다 (ㅈ) → 지금 값은 스냅샷 (ㅊ)\n   key = 인스턴스를 알아보는 표식 (ㅁ)",
            codeLang: "text",
          },
          {
            label: "확인 질문",
            body: "<ul>{todos.length && todos.map(t => <li>{t.text}</li>)}</ul> 에는 문제가 둘 있습니다. 무엇이고 어떻게 고칠까요?",
            notes: [
              {
                title: "답",
                body: "첫째, todos가 비면 0이 그려집니다. todos.length > 0 && 또는 삼항으로 null을 줍니다. 둘째, li에 key가 없습니다. 실제로 돌려 보면 'Each child in a list should have a unique \"key\" prop.' 경고가 났습니다. <li key={t.id}>로 데이터 ID를 붙입니다. 인덱스 key는 할 일을 지우거나 순서를 바꿀 때 입력 상태가 다른 행에 남습니다.",
                bottom: true,
              },
            ],
          },
        ],
      },
    ],
    sources: [{ label: "빠르게 시작하기", href: `${KO}/learn` }],
  },

  {
    id: "rl-start-install",
    name: "설치",
    tagline: "새 앱은 프레임워크로, 직접 쌓으면 Vite 로, 기존 페이지에는 조각으로",
    intro:
      "문서의 '설치하기' 그룹 네 편입니다. 설치하기(개요), 새로운 React 앱 만들기, 처음부터 React 앱 만들기, 기존 프로젝트에 React 추가하기. React 자체는 npm install react react-dom 두 줄이지만, 실제 앱에는 라우팅·데이터 가져오기·코드 분할·빌드가 필요합니다. 문서는 세 길을 가릅니다. 새 제품은 풀스택 프레임워크(Next.js, React Router 프레임워크 모드, Expo)로 시작합니다. 프레임워크 없이 쌓으려면 빌드 도구(Vite, Parcel, Rsbuild)로 시작해 라우팅·데이터·코드 분할을 하나씩 고릅니다. 이미 있는 사이트(서버 템플릿, 다른 프레임워크)에 React를 넣으려면 페이지의 한 조각에 createRoot를 합니다. 이 그룹의 질문은 하나입니다. 내 상황은 세 길 중 어느 것인가.",
    blocks: [
      {
        label: "무엇을 다루나: 네 편",
        body: "설치하기 개요는 '브라우저에서 바로 써 보기'(CodeSandbox, StackBlitz)와 '로컬 설치'로 나누고, 로컬은 다음 세 편으로 보냅니다. 새로운 React 앱 만들기는 프레임워크를 권합니다. Next.js(App Router, 서버 컴포넌트, Vercel에 최적화됐지만 어디든 배포 가능), React Router v7(프레임워크 모드, Vite 기반), Expo(네이티브 + 웹). 그 밖에 TanStack Start, RedwoodSDK 같은 떠오르는 것들을 적습니다. 처음부터 React 앱 만들기는 빌드 도구 셋(Vite, Parcel, Rsbuild)으로 시작한 뒤 '프레임워크가 해 주던 일'을 직접 고르는 법입니다. 라우팅(React Router, TanStack Router), 데이터 가져오기(React Query, SWR, RTK Query — 렌더 뒤가 아니라 라우트 수준에서 미리), 코드 분할(React.lazy, 라우터와 묶기), 그리고 그 셋을 묶지 않으면 생기는 네트워크 워터폴 경고입니다. 기존 프로젝트에 React 추가하기는 세 경우입니다. 기존 사이트의 새 하위 경로 전체를 React로(프레임워크를 /some-app 아래에), 기존 페이지의 일부를 React로(createRoot(document.getElementById('navigation')).render(<NavigationBar />), 여러 조각이면 여러 루트), 네이티브 앱에 React Native 추가.",
        code: "글                          한 줄\n설치하기                     브라우저에서 바로 (CodeSandbox) · 로컬은 아래 셋 중 하나 · npm install react react-dom 은 둘 다 필요\n새로운 React 앱 만들기        프레임워크 권고: Next.js (App Router) · React Router v7 (프레임워크 모드) · Expo · 그 밖 TanStack Start, RedwoodSDK\n처음부터 React 앱 만들기      빌드 도구 (Vite · Parcel · Rsbuild) → 라우팅 · 데이터 가져오기 · 코드 분할을 직접 고른다 · 워터폴 주의\n기존 프로젝트에 React 추가     하위 경로 전체 → 프레임워크를 그 경로 아래에 · 페이지 일부 → createRoot 를 그 조각에 (여럿도 됨) · 네이티브 → RN",
        codeLang: "text",
        terms: [
          {
            term: "프레임워크 (framework)와 빌드 도구 (build tool)",
            body: "빌드 도구(Vite, Parcel)는 파일을 묶고 변환해 브라우저가 받을 수 있게 만드는 것까지만 합니다. 프레임워크(Next.js, React Router v7)는 그 위에 라우팅·데이터 가져오기·서버 렌더링·코드 분할의 규칙까지 정해 둔 것입니다. 문서는 '프레임워크가 해 주는 일을 직접 하려면 그 전부를 고르고 묶어야 한다'고 적고, 그래서 새 앱은 프레임워크를 권합니다. Vite·Next·Nuxt 노드가 따로 있습니다.",
          },
          {
            term: "createRoot와 루트 (root)",
            body: "react-dom/client의 createRoot(container)는 DOM 요소 하나를 React가 관리하는 뿌리로 만들고, root.render(<App />)으로 그 안을 채웁니다. 페이지 전체가 아니라 요소 하나면 됩니다. 그래서 기존 사이트의 한 조각에만 React를 넣을 수 있고, 조각이 여럿이면 루트도 여럿입니다. 실제로 돌려 보면 react-dom/client가 내보내는 것은 createRoot, hydrateRoot, version 셋이었습니다.",
          },
        ],
      },
      {
        label: "세 길과 그 뒤에 따라오는 일",
        body: "첫 길, 프레임워크. npx create-next-app@latest 한 줄로 라우팅(파일 기반), 데이터(서버 컴포넌트·fetch), 서버 렌더링, 코드 분할, 이미지·폰트 최적화가 묶여 옵니다. 대신 프레임워크의 규칙(파일 구조, 서버/클라이언트 경계)을 배워야 하고 배포 환경이 Node를 돌릴 수 있어야 합니다(정적 내보내기도 됩니다). 둘째 길, 처음부터. npm create vite@latest -- --template react-ts 뒤 빈 앱이 뜹니다. 그다음이 일입니다. 라우터를 고르고, 데이터 가져오기를 라우트와 묶어 미리 받게 하고(그렇지 않으면 부모가 렌더 → 자식이 렌더 → 자식이 fetch의 워터폴), React.lazy로 라우트별 코드 분할을 하고, 서버 렌더링이 필요하면 그것도 직접입니다. 문서는 '결국 프레임워크를 만들게 된다'고 솔직하게 적습니다. 셋째 길, 기존에 추가. <div id=\"navigation\"></div>를 두고 createRoot로 그 안만 React로 그립니다. 나머지 페이지는 그대로입니다. JSX를 쓰려면 빌드 도구는 필요하지만(Vite로 React 조각만 빌드해 <script>로 넣기) 전부 바꿀 필요는 없습니다. 조각이 여럿이면 createRoot를 여럿 합니다.",
        code: "// 길 ① 프레임워크\nnpx create-next-app@latest          // 라우팅 · 데이터 · SSR · 코드 분할 · 이미지 전부 묶여 온다\nnpx create-react-router@latest      // React Router v7 프레임워크 모드\nnpx create-expo-app@latest          // 네이티브 + 웹\n\n// 길 ② 처음부터\nnpm create vite@latest my-app -- --template react-ts\n// 그다음 직접 고른다:  라우팅 (React Router / TanStack Router) · 데이터 (React Query / SWR — 라우트에서 미리) · 코드 분할 (lazy + 라우트)\n// 묶지 않으면 워터폴:  부모 렌더 → 자식 렌더 → 자식 fetch → 손자 렌더 → 손자 fetch …\n\n// 길 ③ 기존 페이지의 조각\n<!-- index.html (기존 사이트) -->\n<nav id=\"navigation\"></nav>\n<!-- 서버 템플릿의 나머지는 그대로 -->\n\n// index.js\nimport { createRoot } from 'react-dom/client';\ncreateRoot(document.getElementById('navigation')).render(<NavigationBar />);   // 이 조각만 React\ncreateRoot(document.getElementById('comments')).render(<Comments />);          // 조각이 여럿이면 루트도 여럿",
      },
      {
        label: "실제로 돌려 보면",
        body: "설치 자체를 확인했습니다. npm install react react-dom으로 React 19.3.1이 들어왔고, react-dom 패키지에는 진입점이 여럿입니다. client(createRoot·hydrateRoot), server(renderToString·renderToStaticMarkup·renderToPipeableStream·renderToReadableStream·resume·resumeToPipeableStream), static(prerender·prerenderToNodeStream·resumeAndPrerender·resumeAndPrerenderToNodeStream), 그리고 server.node·server.edge·server.browser·server.bun처럼 환경별 파일입니다. react 패키지는 index와 jsx-runtime·jsx-dev-runtime(빌드 도구가 JSX를 바꿀 때 가져오는 것), compiler-runtime(React 컴파일러가 쓰는 것), 그리고 *.react-server(서버 컴포넌트 환경용)로 나뉩니다. 참고서 노드의 react-dom 갈래(클라이언트·서버·정적)가 이 파일 구조와 그대로 맞습니다.",
        code: "// React 19.3.1 (npm install react react-dom)\nreact/            index.js · jsx-runtime.js · jsx-dev-runtime.js · compiler-runtime.js · react.react-server.js\nreact-dom/        client.js · server.js (+ .node .edge .browser .bun) · static.js · profiling.js · *.react-server.js\n\nreact-dom/client   →  createRoot · hydrateRoot · version\nreact-dom/server   →  renderToString · renderToStaticMarkup · renderToPipeableStream · renderToReadableStream · resume · resumeToPipeableStream\nreact-dom/static   →  prerender · prerenderToNodeStream · resumeAndPrerender · resumeAndPrerenderToNodeStream\n\n// 훅 19개 (react):  use useActionState useCallback useContext useDebugValue useDeferredValue useEffect useEffectEvent useId\n//                  useImperativeHandle useInsertionEffect useLayoutEffect useMemo useOptimistic useReducer useRef useState useSyncExternalStore useTransition",
      },
      {
        label: "문제: Vite 로 시작해 데이터 가져오기를 각 컴포넌트에 두었더니 화면이 층층이 늦게 뜬다",
        body: "Vite로 깨끗하게 시작하고 각 컴포넌트가 자기 useEffect에서 fetch를 합니다. 페이지가 뜨면 상단 바가 먼저, 그 안의 사용자 메뉴가 그다음, 그 안의 알림 수가 또 그다음에 옵니다. 부모가 렌더되어야 자식이 마운트되고, 자식이 마운트되어야 그 fetch가 시작되기 때문입니다. 요청 셋이 직렬로 가는 워터폴입니다. 문서가 '처음부터' 편에서 경고한 그것입니다. 처방은 데이터 가져오기를 컴포넌트가 아니라 라우트 수준에서 미리 시작하는 것입니다. React Router의 loader, TanStack Router의 loader, 또는 React Query로 라우트가 뜰 때 셋을 동시에 보냅니다. 프레임워크는 이것을 처음부터 묶어 줍니다. '처음부터'를 고른 비용이 여기서 처음 보입니다.",
      },
      {
        label: "문제가 나는 경우: 길을 잘못 고르거나 뒤따르는 일을 빠뜨릴 때",
        body: "경우 ㄱ, 워터폴입니다. 위의 사고입니다. 경우 ㄴ, CRA입니다. 더는 권고도 유지도 안 됩니다. 경우 ㄷ, 기존 사이트를 통째로 바꾸려 합니다. 한 조각씩 createRoot로 옮기는 길이 있습니다. 경우 ㄹ, react만 설치하고 react-dom을 빠뜨립니다. createRoot가 없습니다. 둘 다 필요합니다. 경우 ㅁ, JSX를 빌드 없이 씁니다. 브라우저는 JSX를 모릅니다. 빌드 도구나(실험용으로) Babel standalone이 필요합니다. 경우 ㅂ, 프레임워크의 서버/클라이언트 경계를 모릅니다. Next.js에서 useState를 쓴 컴포넌트에 'use client'가 없어 에러입니다. 서버 컴포넌트 노드가 다룹니다. 경우 ㅅ, 코드 분할 없이 번들 하나입니다. 첫 로드가 수 MB입니다. React.lazy와 라우트를 묶습니다. 경우 ㅇ, 여러 조각에 React를 넣었는데 조각끼리 state를 공유하려 합니다. 루트가 다르면 React 트리가 다릅니다. 공통 부모가 없으니 외부 스토어나 하나의 루트로 합칩니다. 경우 ㅈ, 개발 빌드를 운영에 올립니다. 느리고 경고가 찍힙니다. NODE_ENV=production 빌드를 씁니다. 경우 ㅊ, 버전을 섞습니다. react 19와 react-dom 18이 함께 있으면 훅이 null입니다. 둘의 버전을 맞춥니다.",
        code: "경우              언제 생기나                           겉모습                                   들통나는 때\nㄱ 워터폴          컴포넌트마다 useEffect fetch             층층이 늦게 뜸                             느린 망\nㄴ CRA            create-react-app                      유지 안 됨                               경고\nㄷ 통째로 전환      기존 사이트 전부 바꾸려 함               끝나지 않는 마이그레이션                     몇 달 뒤\nㄹ react-dom 누락   react 만 설치                        createRoot 없음                           첫 실행\nㅁ 빌드 없는 JSX    <script> 에 JSX                      SyntaxError                              바로\nㅂ 서버/클라 경계    Next 에서 useState 에 'use client' 없음   에러                                    첫 렌더\nㅅ 분할 없음        번들 하나                            첫 로드 수 MB                              느린 망\nㅇ 루트 사이 공유    조각 둘이 state 공유                   공통 부모가 없다                           연동할 때\nㅈ 개발 빌드 운영    NODE_ENV 미설정                       느림 · 경고                               운영 성능\nㅊ 버전 불일치      react 19 + react-dom 18               Cannot read properties of null (reading 'useState') 류   첫 렌더",
        codeLang: "text",
      },
      {
        label: "문제의 구조: React 는 작고, 앱은 크다",
        body: "react와 react-dom은 '컴포넌트를 DOM에 그리고 갱신한다'까지만 합니다. 앱에는 그 밖의 것이 있습니다. 주소와 화면의 짝(라우팅), 서버의 데이터(가져오기), 처음에 받을 코드와 나중에 받을 코드(분할), 서버에서 먼저 그리기(SSR), 그리고 그 전부를 묶어 내는 빌드. 세 길은 이 '밖의 것'을 누가 정하느냐의 차이입니다. 프레임워크가 전부 정하면 규칙을 배우는 대신 워터폴·분할 같은 사고를 미리 피합니다. 직접 고르면 자유로운 대신 그 사고를 하나씩 겪으며 결국 프레임워크 비슷한 것을 만들게 됩니다(ㄱ, ㅅ). 기존 사이트는 React를 조각으로 들이는 길이 따로 있고, 조각 사이의 경계가 새 문제가 됩니다(ㅇ). 처방은 상황을 세 길에 대어 보고 그 길이 뒤에 요구하는 일(규칙 배우기 / 하나씩 고르기 / 경계 다루기)을 처음부터 계획에 넣는 것입니다.",
        code: "react + react-dom  =  컴포넌트 → DOM 그리기·갱신        (작다)\n앱  =  그것 + 라우팅 + 데이터 가져오기 + 코드 분할 + SSR + 빌드    (크다)\n\n길 ① 프레임워크      '밖의 것' 을 프레임워크가 정한다      대가: 규칙 배우기 (ㅂ)        이득: 워터폴·분할을 미리 피함\n길 ② 처음부터        '밖의 것' 을 내가 하나씩 고른다       대가: 사고를 하나씩 겪음 (ㄱ ㅅ)  이득: 자유\n길 ③ 조각으로 추가    기존 사이트에 루트 하나씩              대가: 조각 사이 경계 (ㅇ)      이득: 전부 바꾸지 않아도 됨",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "설치했으면 설정입니다. 다음 노드 '설정'은 에디터(ESLint·Prettier), TypeScript(props와 훅의 타입), React 개발자 도구(Components·Profiler 탭)입니다. 그다음 'React 컴파일러'는 메모이제이션을 빌드가 대신 해 주는 도구이고, 그것이 왜 가능한지는 'React 규칙'(순수)에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "회사에 Django 템플릿으로 된 관리자 페이지가 있습니다. 그중 '주문 목록' 표 하나만 필터·정렬이 복잡해 React로 만들고 싶습니다. 세 길 중 무엇이고, 무엇을 설치하고, 어디에 무엇을 적어야 할까요?",
        notes: [
          {
            title: "답",
            body: "셋째 길, 기존 페이지의 일부에 추가입니다. Django 템플릿에 <div id=\"order-table\"></div>를 두고, 별도 폴더에서 Vite로 react·react-dom을 설치해 그 컴포넌트만 빌드한 뒤 결과 스크립트를 템플릿에 <script type=\"module\">로 넣습니다. 스크립트는 createRoot(document.getElementById('order-table')).render(<OrderTable />)입니다. 나머지 페이지는 Django가 그대로 그립니다. 초기 데이터는 템플릿이 JSON으로 data 속성이나 <script type=\"application/json\">에 넣어 주면 첫 fetch를 피할 수 있습니다. 나중에 조각이 늘어 서로 state를 나눠야 하면 그때 하위 경로 전체를 프레임워크로 옮기는 둘째 단계를 생각합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "설치하기", href: `${KO}/learn/installation` },
      { label: "새로운 React 앱 만들기", href: `${KO}/learn/creating-a-react-app` },
      { label: "처음부터 React 앱 만들기", href: `${KO}/learn/build-a-react-app-from-scratch` },
      { label: "기존 프로젝트에 React 추가하기", href: `${KO}/learn/add-react-to-an-existing-project` },
    ],
  },

  {
    id: "rl-start-setup",
    name: "설정",
    tagline: "에디터가 잡아 주는 것, 타입이 잡아 주는 것, 개발자 도구가 보여 주는 것",
    intro:
      "문서의 '설정하기' 그룹 네 편입니다. 설정하기(개요), 에디터 설정하기, TypeScript 사용하기, React 개발자 도구. 셋은 코드를 쓰기 전과 쓰는 중과 돌린 뒤를 맡습니다. 에디터는 ESLint(규칙 위반, 특히 훅 규칙)와 Prettier(모양)를 저장할 때마다 돌려 리뷰에서 모양 얘기를 없앱니다. TypeScript는 props·state·이벤트·훅에 타입을 붙여 이름 오타와 빈 값을 컴파일 때 잡습니다. 개발자 도구는 브라우저 확장으로 컴포넌트 트리(props·state·훅 값)와 Profiler(어느 컴포넌트가 왜 리렌더됐나, 얼마나 걸렸나)를 보여 줍니다. 이 그룹의 질문은 하나입니다. 버그를 어느 단계에서 잡을 것인가.",
    blocks: [
      {
        label: "무엇을 다루나: 네 편",
        body: "에디터 설정하기는 VS Code를 예로 들어 린팅(eslint-plugin-react-hooks를 꼭 켜라 — 훅 규칙은 린터만 잡습니다), 포매팅(Prettier, 저장 시 포맷, ESLint와 충돌하는 스타일 규칙은 끄기)을 적습니다. TypeScript 사용하기는 설치(@types/react, @types/react-dom), 컴포넌트에 타입 붙이기(props 인터페이스), 훅의 타입(useState는 초깃값에서 추론, 유니온은 명시 useState<Status>, useReducer의 state·action 타입, useContext는 createContext<Type>(기본값), useMemo·useCallback은 반환·인자에서 추론), 그리고 DOM 이벤트(React.ChangeEvent<HTMLInputElement>)·children(React.ReactNode)·style(React.CSSProperties) 타입입니다. React 개발자 도구는 Chrome·Firefox·Edge 확장 설치, Components 탭(트리 선택, props·state·훅 보기·편집, 렌더한 소스 찾기), Profiler 탭(녹화 → 커밋별 렌더 시간, '왜 렌더됐나' 옵션), Safari와 기타 브라우저는 react-devtools 패키지로 독립 실행입니다. 참고서의 개발자 도구 노드가 Performance 트랙(Chrome Performance 패널에 React 레인)을 더합니다.",
        code: "글                     한 줄\n설정하기                에디터 · TypeScript · 개발자 도구 세 편으로 보낸다\n에디터 설정하기           ESLint + eslint-plugin-react-hooks (훅 규칙은 린터만 잡는다) · Prettier (저장 시 포맷, 스타일 규칙 충돌은 끈다)\nTypeScript 사용하기      @types/react · props 인터페이스 · useState<Union> · useReducer 타입 · createContext<T>(기본값) · ChangeEvent<HTMLInputElement> · ReactNode · CSSProperties\nReact 개발자 도구         확장 설치 · Components (트리·props·state·훅·소스) · Profiler (커밋별 시간, 왜 렌더됐나) · 독립 실행 react-devtools",
        codeLang: "text",
        terms: [
          {
            term: "eslint-plugin-react-hooks",
            body: "훅 규칙을 코드에서 검사하는 ESLint 플러그인입니다. rules-of-hooks(최상위에서만, 조건·반복 안 금지)와 exhaustive-deps(useEffect·useMemo 의존성 배열 누락)가 핵심이고, React 19에서는 컴파일러 기반 규칙(set-state-in-render, purity, refs 등)이 더 들어왔습니다. 훅 규칙은 실행 중에는 '순서가 바뀐 뒤'에야 드러나므로 린터가 거의 유일한 사전 그물입니다. 참고서의 ESLint 노드가 규칙 전부를 적습니다.",
          },
        ],
      },
      {
        label: "TypeScript 가 React 에서 잡는 것",
        body: "props는 인터페이스로 적고 함수 매개변수에 붙입니다. 이름 오타, 빠진 필수 prop, 틀린 타입이 편집기에서 바로 빨간 줄입니다. useState는 초깃값에서 타입을 추론하지만 null로 시작하거나 유니온이면 useState<User | null>(null)처럼 적습니다. 그렇지 않으면 null 타입이 되어 뒤에서 값을 못 넣습니다. useReducer는 state와 action의 타입을 적고, action은 보통 type 필드로 가르는 유니온(판별 유니온)입니다. createContext는 기본값의 타입으로 추론되므로 null로 시작하면 createContext<Theme | null>(null)이고, 쓰는 쪽에서 null 검사를 하거나 커스텀 훅에서 throw로 좁힙니다. 이벤트는 React.ChangeEvent<HTMLInputElement>처럼 요소 타입을 적어야 e.target.value가 보입니다. children은 React.ReactNode(무엇이든), 요소만이면 React.ReactElement입니다. style은 React.CSSProperties입니다. 이 타입들이 i18n 노드 10단계의 '열쇠 유니온'과 같은 생각입니다. 문자열이던 것을 좁혀 오타를 컴파일 때 잡습니다.",
        code: "// props\ninterface ButtonProps { title: string; disabled?: boolean; onClick: () => void; children?: React.ReactNode; }\nfunction Button({ title, disabled = false, onClick, children }: ButtonProps) { … }\n<Button titel=\"x\" />                                    // 에러: 'titel' 은 없다. 'title' 을 뜻했나요?\n\n// useState — null 로 시작하면 유니온을 적는다\nconst [user, setUser] = useState<User | null>(null);     // 안 적으면 타입이 null 이라 setUser(u) 가 에러\nconst [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');\n\n// useReducer — 판별 유니온 action\ntype Action = { type: 'add'; item: Item } | { type: 'remove'; id: string };\nfunction reducer(state: State, action: Action): State { switch (action.type) { case 'add': …; case 'remove': …; } }\n\n// createContext — 기본값으로 추론\nconst ThemeContext = createContext<Theme | null>(null);\nfunction useTheme() { const t = useContext(ThemeContext); if (!t) throw new Error('Provider 밖'); return t; }   // 좁힌다\n\n// 이벤트 · children · style\nfunction onChange(e: React.ChangeEvent<HTMLInputElement>) { e.target.value; }\nconst box: React.CSSProperties = { display: 'flex' };",
        terms: [
          {
            term: "판별 유니온 (discriminated union)",
            body: "공통 필드(보통 type)의 값으로 갈라지는 객체 타입들의 유니온입니다. { type: 'add'; item } | { type: 'remove'; id }처럼 적으면 switch (action.type)의 각 case 안에서 TypeScript가 나머지 필드를 알아봅니다. useReducer의 action 타입이 전형이고, TypeScript 노드의 '타입 좁히기'가 그 원리입니다.",
          },
        ],
      },
      {
        label: "개발자 도구가 보여 주는 것: 트리와 시간",
        body: "Components 탭은 DOM이 아니라 React 트리를 보입니다. 컴포넌트를 고르면 오른쪽에 props, state, 훅의 현재 값이 보이고 바꿔 볼 수 있습니다. 어느 컴포넌트가 그린 DOM인지, 어느 파일에서 왔는지도 보입니다. '왜 이 값이 이렇게 보이나'를 console.log 없이 봅니다. Profiler 탭은 녹화 버튼을 누르고 조작한 뒤 멈추면 커밋(렌더 결과를 DOM에 반영한 단위)마다 어느 컴포넌트가 몇 ms 걸렸는지 불꽃 그래프로 보입니다. 설정에서 'Record why each component rendered'를 켜면 'props가 바뀜(어느 prop)', 'state가 바뀜', '부모가 렌더됨' 중 이유가 붙습니다. 렌더링 노드 7장의 강제 레이아웃을 Performance 탭이 보여 주듯, React의 리렌더는 Profiler가 보여 줍니다. 실제로 돌려 보면 memo 없는 자식이 부모의 state 변경마다 렌더되어 3번, useMemo·useCallback으로 props를 고정하면 1번이었습니다. Profiler는 이 차이를 '부모가 렌더됨 / props 변경 없음'으로 보여 줍니다.",
        code: "Components 탭                                   Profiler 탭\n▼ App                                           녹화 ● → 조작 → ■\n  ▼ FilterableProductTable                       커밋 #1  12.3ms   ████████ ProductTable (props changed: products)\n      props: { products: Array(6) }               커밋 #2   3.1ms   ██ SearchBar (state changed: text)\n      hooks: State \"\" · State false                           ░░ ProductTable (did not render — memo)\n    ▶ SearchBar                                  '왜 렌더됐나':  props 변경 (어느 prop) · state 변경 · 부모가 렌더 · 훅 변경\n    ▶ ProductTable  ← 고르면 DOM 과 소스로 점프\n\n// 실제로 돌려 보면 (Chrome 156, React 19.3.1)\n부모 state 2번 변경, 자식 memo + 매 렌더 새 객체 props  →  자식 렌더 3번   (Profiler: 'props changed: cfg, onX')\n부모 state 2번 변경, useMemo·useCallback 으로 고정       →  자식 렌더 1번   (Profiler: 'did not render')",
        codeLang: "text",
        terms: [
          {
            term: "Profiler와 커밋 (commit)",
            body: "Profiler는 React 개발자 도구의 탭으로, 녹화 동안 일어난 커밋마다 어느 컴포넌트가 얼마나 걸렸고 왜 렌더됐는지를 보입니다. 커밋은 React가 한 번의 렌더 결과를 DOM에 반영한 단위입니다. '렌더링 그리고 커밋' 페이지의 그 커밋입니다. 느린 화면의 원인을 찾을 때 console.log 대신 여기서 시작합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "개발자 도구 자체는 사람이 보는 것이라 코드로 재지 못합니다. 대신 도구가 보여 줄 것들을 React 19.3.1에서 측정했습니다. StrictMode(개발 모드)는 렌더 2, 효과 2, 정리 1을 냈습니다. 개발자 도구의 트리에서 StrictMode 아래 컴포넌트가 두 번 렌더되는 것으로 보이는 그것입니다. 제어 컴포넌트 경고 문구는 'You provided a value prop to a form field without an onChange handler. This will render a read-only field. …'였습니다. 훅 순서 변경 경고는 'React has detected a change in the order of Hooks called by …'입니다. 린터(rules-of-hooks)가 있었다면 저장할 때 잡혔을 것입니다. 타입은 TypeScript 노드와 i18n 노드 10단계에서 tsc 6.0으로 돌린 것이 있습니다. 'cart.chekout' 오타가 TS2345로 막혔습니다.",
        code: "StrictMode (개발):  { renders: 2, effects: 2, cleanups: 1 }   ← 개발자 도구 트리에서 '두 번 렌더' 로 보이는 것\n\n제어 컴포넌트 경고:\n  You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.\n  If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.\n\n훅 순서 변경 (린터가 있었다면 저장 때 잡힌다):\n  React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed.\n\n타입 (i18n 10단계, tsc 6.0):\n  error TS2345: Argument of type '\"cart.chekout\"' is not assignable to parameter of type …",
        codeLang: "text",
      },
      {
        label: "문제: 린터 없이 조건 안에 훅을 두어 어느 날 state 가 뒤바뀐다",
        body: "로딩 중이면 일찍 return하고 그 아래에 useState를 둔 컴포넌트가 있습니다. 처음엔 됩니다. 로딩이 끝나 아래 훅이 처음 불리는 순간 훅 순서가 바뀌고, React는 '두 번째 useState'를 전 렌더의 다른 state와 짝지어 값이 뒤바뀝니다. 실제로 돌려 보면 순서가 바뀌는 둘째 렌더에서 경고가 찍혔습니다. 실행 중에는 그때까지 모릅니다. eslint-plugin-react-hooks의 rules-of-hooks는 코드를 읽는 순간 '조건부 훅 호출'로 잡습니다. 문서가 에디터 설정 편에서 '이 플러그인을 꼭 켜라'고 한 이유입니다. 처방은 모든 훅을 early return 위로 올리는 것입니다.",
      },
      {
        label: "문제가 나는 경우: 잡을 수 있는 단계를 놓칠 때",
        body: "경우 ㄱ, 린터 없는 조건부 훅입니다. 위의 사고입니다. 경우 ㄴ, exhaustive-deps를 끕니다. 의존성 누락이 '어쩌다 맞는' 코드로 남습니다. 끄지 말고 의존성을 고치거나 Effect를 없앱니다(탈출구 노드). 경우 ㄷ, useState(null)에 타입을 안 적습니다. 타입이 null이라 setUser(u)가 에러이거나, any로 도망칩니다. 경우 ㄹ, 이벤트 타입을 any로 둡니다. e.target.value가 안 보이거나 틀린 요소 타입입니다. 경우 ㅁ, createContext 기본값을 {}로 둡니다. 타입이 넓어져 Provider 밖에서 undefined 접근이 조용히 통과합니다. null + 좁히는 훅입니다. 경우 ㅂ, Prettier와 ESLint 스타일 규칙이 싸웁니다. 저장마다 두 도구가 서로 고칩니다. eslint-config-prettier로 스타일 규칙을 끕니다. 경우 ㅅ, 개발자 도구 없이 리렌더를 찍습니다. console.log('render')는 StrictMode 때문에 두 번 찍혀 더 헷갈립니다. Profiler의 '왜 렌더됐나'입니다. 경우 ㅇ, 운영 빌드에서 Profiler가 비어 있습니다. 운영은 프로파일링 정보가 빠집니다. react-dom/profiling 빌드나 개발 빌드에서 잽니다. 경우 ㅈ, 개발자 도구가 컴포넌트 이름을 'Anonymous'로 보입니다. 익명 화살표 함수를 export default했기 때문입니다. 이름을 붙입니다. 경우 ㅊ, 타입을 React.FC로 덮습니다. 옛 관례이고 children이 암묵적으로 들어가던 문제가 있어 문서는 함수 매개변수에 인터페이스를 권합니다.",
        code: "경우               언제 생기나                           겉모습                                   들통나는 때\nㄱ 린터 없는 조건부 훅  early return 아래 useState            둘째 렌더에서 state 뒤바뀜                  조건이 바뀔 때\nㄴ exhaustive-deps 끔  의존성 누락을 주석으로 끔             옛 값을 보는 Effect                        데이터가 바뀔 때\nㄷ useState(null)     타입 미지정                           setUser(u) 에러 또는 any                    값을 넣을 때\nㄹ 이벤트 any         (e) => e.target.value                 value 가 안 보임                           타입 검사\nㅁ Context 기본값 {}   createContext({})                     Provider 밖 접근이 조용히 통과               런타임 undefined\nㅂ Prettier vs ESLint  스타일 규칙 겹침                       저장마다 서로 고침                          매 저장\nㅅ 로그로 리렌더 추적   console.log('render')                 StrictMode 로 두 번 찍혀 헷갈림               디버깅\nㅇ 운영에서 Profiler   production 빌드                       비어 있음                                 성능 측정\nㅈ Anonymous          export default () => …                트리에서 이름이 안 보임                      디버깅\nㅊ React.FC           옛 관례                               암묵 children (옛 버전)                     리뷰",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 같은 버그를 잡을 수 있는 단계가 셋이고, 뒤로 갈수록 비싸다",
        body: "React의 버그는 세 단계에서 잡힙니다. 쓰는 중(편집기: 린터·타입), 돌릴 때(개발 모드의 경고·StrictMode), 돌린 뒤(개발자 도구·사용자). 같은 버그라도 앞 단계가 싸고 뒤 단계가 비쌉니다. 조건부 훅은 린터가 저장할 때 잡거나(ㄱ), 개발 모드가 둘째 렌더에서 경고하거나, 사용자가 뒤바뀐 state를 보고 신고합니다. props 오타는 타입이 편집기에서 잡거나(ㄷ, ㄹ), undefined로 조용히 지나 사용자가 봅니다(ㅁ). 리렌더 비용은 Profiler가 보여 주거나(ㅅ), 사용자가 느낍니다. 설정 그룹의 세 편은 각각 한 단계의 그물입니다. 그물을 뒤로 미루면 같은 버그를 더 늦게, 더 비싸게 잡습니다. i18n 노드 10단계가 '타입은 편집기에서, 린트는 PR에서, CI는 머지 전에'라고 한 것과 같은 사다리입니다.",
        code: "단계          도구                              잡는 것                                       비용\n① 쓰는 중      린터 (react-hooks) · TypeScript     조건부 훅 (ㄱ) · 의존성 누락 (ㄴ) · props 오타 (ㄷ ㄹ ㅁ)   저장 한 번\n② 돌릴 때      개발 모드 경고 · StrictMode          훅 순서 변경 · 제어 컴포넌트 · 순수성 위반              새로고침 한 번\n③ 돌린 뒤      개발자 도구 Profiler · 사용자         리렌더 비용 (ㅅ) · 뒤바뀐 state · 느린 화면              재현 · 신고\n\n같은 버그, 앞에서 잡으면 싸다.  설정 그룹의 세 편 = 세 단계의 그물 하나씩",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "린터와 타입이 코드를 검사한다면, React 컴파일러는 코드를 바꿉니다. useMemo·useCallback·memo를 손으로 붙이던 일을 빌드가 자동으로 합니다. 그것이 가능한 이유가 React 규칙(순수)이고, 규칙을 어긴 컴포넌트는 컴파일러가 건너뜁니다. 다음 노드 'React 컴파일러'입니다.",
      },
      {
        label: "확인 질문",
        body: "검색창 컴포넌트가 느립니다. 글자를 칠 때마다 상품 표 전체가 다시 그려집니다. 설정 그룹의 도구 셋 중 (1) 원인을 찾는 데 무엇을, (2) 고친 뒤 다시 깨지지 않게 무엇을 쓸까요? 그리고 (3) 'state로 둘 필요가 없는 값'을 state로 둔 것이 원인이라면 어느 도구가 그것을 미리 말해 줄 수 있었을까요?",
        notes: [
          {
            title: "답",
            body: "(1) 개발자 도구 Profiler입니다. 녹화하고 글자를 치면 커밋마다 ProductTable이 렌더된 이유('부모가 렌더됨' 또는 'props 변경: products')가 보입니다. 실제로 돌려 보면 매 렌더 새 객체 props를 받는 memo 자식은 부모 state 변경마다 렌더됐습니다. (2) 고친 뒤(props 고정, 또는 state를 아래로 내리기)에는 TypeScript가 props 모양을 지키고, 린터의 preserve-manual-memoization 같은 규칙이 메모이제이션이 깨지는 것을 경고합니다. 또는 React 컴파일러를 켜서 메모이제이션을 자동화합니다. (3) 그것은 세 도구 중 어느 것도 미리 말해 주지 않습니다. 설계 문제라서 'React로 사고하기'의 셋째 단계(최소 state)와 'State 구조 선택하기'가 그 자리입니다. 도구는 결과를 보여 주고, 설계는 사람이 합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "설정하기", href: `${KO}/learn/setup` },
      { label: "에디터 설정하기", href: `${KO}/learn/editor-setup` },
      { label: "TypeScript 사용하기", href: `${KO}/learn/typescript` },
      { label: "React 개발자 도구", href: `${KO}/learn/react-developer-tools` },
    ],
  },

  {
    id: "rl-start-compiler",
    name: "React 컴파일러",
    tagline: "메모이제이션을 빌드가 대신 한다. 그래서 규칙을 지킨 코드만 빨라진다",
    intro:
      "문서의 'React 컴파일러' 그룹 네 편입니다. 소개, 설치, 점진적 도입, 디버깅 및 문제 해결. React 컴파일러는 빌드 때 컴포넌트와 훅을 읽어 자동으로 메모이제이션합니다. 지금까지 useMemo·useCallback·memo를 손으로 붙여 '부모가 렌더돼도 자식은 안 그리게' 하던 일을 컴파일러가 코드를 바꿔 해 줍니다. 가능한 이유는 React 규칙입니다. 컴포넌트가 순수하고 props·state를 바꾸지 않으면 '어느 값이 바뀌었을 때 어느 부분을 다시 계산해야 하나'를 정적으로 알 수 있습니다. 규칙을 어긴 컴포넌트는 컴파일러가 건너뜁니다. 빨라지지 않을 뿐 깨지지는 않습니다. React 19.3.1의 react 패키지에 compiler-runtime이 들어 있는 것을 실제로 확인했습니다. 이 그룹의 질문은 하나입니다. 손으로 하던 메모이제이션을 기계에 맡기면 무엇이 바뀌고 무엇이 조건인가.",
    blocks: [
      {
        label: "무엇을 다루나: 네 편",
        body: "소개는 컴파일러가 하는 일(자동 메모이제이션 — 컴포넌트 전체와 그 안의 계산·콜백·JSX를 의존성에 따라 캐시), 하지 않는 일(규칙을 어긴 코드는 건너뜀), 전제(React 규칙 준수, React 17 이상 — 17·18은 react-compiler-runtime 패키지 필요), 그리고 '어떤 코드가 빨라지나'(비싼 계산, 안정된 참조가 필요한 자식)를 적습니다. 설치는 babel-plugin-react-compiler를 넣고 빌드 도구별로 Babel 설정에 추가하는 법입니다. Vite(@vitejs/plugin-react의 babel 옵션), Next.js(next.config의 reactCompiler: true), Remix·React Router, Webpack, Expo, Metro. 컴파일러 플러그인은 Babel 플러그인 중 가장 먼저 와야 합니다. 함께 eslint-plugin-react-hooks 최신판(컴파일러 기반 린트 포함)을 권합니다. 점진적 도입은 셋입니다. 디렉터리 범위로(Babel의 overrides나 플러그인의 sources 옵션), compilationMode: 'annotation'으로 'use memo'를 적은 것만, 그리고 gating으로 실행 중 플래그에 따라 컴파일된 버전과 원본 중 하나를 고르기(A/B). 디버깅은 '컴파일러가 건너뛴 컴포넌트 찾기'(개발자 도구에서 Memo ✨ 배지, 또는 린트 에러), 흔한 건너뜀 원인(렌더 중 변이, 훅 규칙 위반, ref.current 렌더 중 읽기, 지원 안 하는 문법), 'use no memo'로 특정 컴포넌트만 끄기, 그리고 컴파일 뒤 동작이 달라졌다면 그것은 거의 늘 코드가 규칙을 어기고 있었다는 뜻이라는 것입니다.",
        code: "글                 한 줄\n소개               자동 메모이제이션 (컴포넌트 전체 + 안의 계산·콜백·JSX) · 규칙 어긴 코드는 건너뜀 · React 17+ (17·18 은 runtime 패키지) · 무엇이 빨라지나\n설치               babel-plugin-react-compiler · Babel 플러그인 중 맨 앞 · Vite / Next (reactCompiler: true) / Webpack / Expo · eslint-plugin-react-hooks 최신\n점진적 도입         디렉터리 범위 (sources) · compilationMode: 'annotation' + 'use memo' · gating (실행 중 플래그로 A/B)\n디버깅             건너뛴 컴포넌트 찾기 (개발자 도구 ✨ · 린트) · 원인: 렌더 중 변이 · 훅 규칙 · ref 렌더 중 읽기 · 미지원 문법 · 'use no memo' · 동작이 바뀌면 코드가 규칙을 어기고 있었다",
        codeLang: "text",
        terms: [
          {
            term: "메모이제이션 (memoization)",
            body: "같은 입력이면 전에 계산한 결과를 다시 쓰는 것입니다. React에서는 useMemo(값), useCallback(함수), memo(컴포넌트)가 그 도구였습니다. 셋을 손으로 붙이면 코드가 길어지고 빠뜨리면 효과가 없고(실제로 돌려 보면 새 객체 props 하나로 memo가 무력했습니다), 의존성을 틀리면 옛 값을 봅니다. 컴파일러는 이 셋을 빌드 때 자동으로 넣습니다. 참고서의 useMemo·useCallback·memo 페이지가 '컴파일러를 쓰면 손으로 할 필요가 없다'고 적습니다.",
          },
          {
            term: "React 규칙 (Rules of React)",
            body: "컴포넌트와 훅은 순수해야 하고(같은 입력 → 같은 출력, 렌더 중 바깥 변경 금지), props·state·훅 반환값을 바꾸지 않고(불변), 훅은 최상위에서 같은 순서로만 부르고, 컴포넌트는 React만 부른다는 약속들입니다. 참고서의 'React 규칙' 노드가 전부를 적습니다. 컴파일러는 이 규칙이 지켜진다고 가정하고 코드를 바꾸므로, 규칙을 어긴 코드에서는 바꾸지 않고 건너뜁니다.",
          },
        ],
      },
      {
        label: "컴파일러가 코드를 어떻게 바꾸나",
        body: "컴파일러는 컴포넌트 함수를 읽어 '어느 값이 어느 props·state에 의존하나'를 분석하고, 각 부분을 캐시 슬롯에 넣는 코드로 다시 씁니다. 개념적으로는 이렇습니다. 원래 코드가 const sorted = sort(items); return <List items={sorted} onSelect={() => …} />였다면, 컴파일된 코드는 items가 전과 같으면 캐시된 sorted를 쓰고, onSelect도 의존성이 같으면 같은 함수 참조를 쓰고, JSX 요소도 props가 같으면 같은 요소를 돌려줍니다. 부모가 렌더돼도 자식 List가 받는 props가 전부 같은 참조라 List는 다시 그리지 않습니다. 손으로 useMemo·useCallback·memo 셋을 붙인 것과 같은 결과를, 더 세밀하게(JSX 조각 단위로) 냅니다. 실제로 돌려 보면 손으로 고정한 쪽이 자식 렌더 1번, 고정하지 않은 쪽이 3번이었습니다. 컴파일러는 '고정한 쪽'을 자동으로 만듭니다. 그리고 React 19.3.1의 react 패키지에 compiler-runtime.js가 들어 있습니다. 컴파일된 코드가 쓰는 캐시 훅(c)이 거기 있습니다.",
        code: "// 내가 쓴 코드\nfunction Table({ items, onPick }) {\n  const sorted = sort(items);                        // 매 렌더 다시 정렬\n  return <List items={sorted} onSelect={(id) => onPick(id)} />;   // 매 렌더 새 함수 → List 가 memo 여도 다시 그린다\n}\n\n// 컴파일러가 바꾼 코드 (개념적으로)\nfunction Table({ items, onPick }) {\n  const $ = _c(4);                                   // react/compiler-runtime 의 캐시 슬롯 (React 19.3.1 에 들어 있다)\n  let sorted;\n  if ($[0] !== items) { sorted = sort(items); $[0] = items; $[1] = sorted; } else { sorted = $[1]; }\n  let onSelect;\n  if ($[2] !== onPick) { onSelect = (id) => onPick(id); $[2] = onPick; $[3] = onSelect; } else { onSelect = $[3]; }\n  return <List items={sorted} onSelect={onSelect} />;   // items·onPick 이 같으면 같은 참조 → List 는 안 그린다\n}\n\n// 실제로 돌려 보면 (손으로 한 것과 같은 효과)\n매 렌더 새 객체·함수 props → memo 자식 렌더 3번   /   useMemo·useCallback 고정 → 1번",
      },
      {
        label: "설치와 점진적 도입",
        body: "설치는 플러그인 하나입니다. npm install -D babel-plugin-react-compiler@latest 뒤 빌드 도구에 적습니다. Vite는 @vitejs/plugin-react의 babel.plugins에, Next.js는 next.config.js의 reactCompiler: true(15.3+에서는 experimental 밖), Webpack은 babel-loader 옵션에. 컴파일러 플러그인은 다른 Babel 플러그인보다 먼저 돌아야 원본 코드를 봅니다. 함께 eslint-plugin-react-hooks를 최신으로 올리면 컴파일러가 건너뛸 코드를 린트가 미리 알려 줍니다. 한 번에 전부 켜기가 불안하면 셋 중 하나로 범위를 좁힙니다. sources 옵션으로 특정 디렉터리만(src/new/ 아래만), compilationMode: 'annotation'으로 'use memo' 지시어를 적은 함수만, gating으로 런타임 플래그 함수가 true일 때만 컴파일된 버전을 쓰기(원본과 컴파일본을 둘 다 번들에 넣고 실행 중 고름 — A/B 실험). 도입 뒤 동작이 달라진 컴포넌트가 있으면 그것은 규칙을 어기고 있던 코드입니다. 'use no memo'로 그 컴포넌트만 끄고 원인을 고칩니다.",
        code: "npm install -D babel-plugin-react-compiler@latest eslint-plugin-react-hooks@latest\n\n// Vite\nexport default defineConfig({ plugins: [react({ babel: { plugins: ['babel-plugin-react-compiler'] } })] });\n// Next.js 15.3+\nmodule.exports = { reactCompiler: true };\n// Babel 직접 — 맨 앞에\nmodule.exports = { plugins: [['babel-plugin-react-compiler', ReactCompilerConfig], /* 나머지 */] };\n\n// 점진적 도입 셋\n{ sources: (filename) => filename.includes('src/new/') }        // ① 디렉터리\n{ compilationMode: 'annotation' }   +   function C() { 'use memo'; … }   // ② 표시한 것만\n{ gating: { source: 'ReactCompilerFeatureFlags', importSpecifierName: 'isCompilerEnabled' } }   // ③ 실행 중 플래그\n\n// 특정 컴포넌트만 끄기 (원인을 고치는 동안)\nfunction Legacy() { 'use no memo'; … }",
        terms: [
          {
            term: "'use memo' / 'use no memo'",
            body: "함수 몸체 첫 줄에 적는 문자열 지시어입니다. 'use memo'는 annotation 모드에서 '이 함수는 컴파일하라', 'use no memo'는 어느 모드에서든 '이 함수는 건너뛰라'입니다. 'use no memo'는 임시 탈출구입니다. 컴파일 뒤 동작이 달라진 컴포넌트를 일단 끄고 규칙 위반을 고친 뒤 지우는 용도입니다. 참고서의 컴파일러 지시어 노드가 자세히 적습니다.",
          },
          {
            term: "gating (게이팅)",
            body: "컴파일된 버전과 원본을 둘 다 번들에 넣고, 실행 중 플래그 함수의 값으로 어느 것을 쓸지 고르는 도입 방식입니다. 사용자 일부에게만 컴파일본을 주어 성능과 오류를 비교(A/B)할 수 있습니다. 번들이 두 배가 되는 대가가 있어 실험 기간에만 씁니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "컴파일러 자체는 빌드 도구라 이 데모에는 안 들어갔지만, 컴파일러가 전제하는 것과 대신하는 것을 React 19.3.1에서 확인했습니다. 대신하는 것은 메모이제이션입니다. 손으로 useMemo·useCallback을 붙인 쪽이 자식 렌더 1번, 안 붙인 쪽이 3번이었습니다. 전제하는 것은 순수성이고, StrictMode가 그것을 검사합니다. 개발 모드에서 렌더가 2번 불렸습니다. 두 번 불러도 같은 결과여야 컴파일러가 캐시할 수 있습니다. 렌더 중 setState는 'Too many re-renders'로 막혔고, 훅 순서 변경은 경고가 났습니다. 둘 다 컴파일러가 건너뛰는 코드의 모양입니다. 그리고 react 패키지에 compiler-runtime.js가 있습니다. 컴파일된 코드가 import하는 캐시 함수의 자리입니다.",
        code: "컴파일러가 대신하는 것:    useMemo·useCallback 고정 → 자식 렌더 1번  /  없으면 3번           (Chrome 156)\n컴파일러가 전제하는 것:    StrictMode 두 번 렌더 → 같은 결과여야 한다                            renders: 2\n건너뛰는 코드의 모양:      렌더 중 setState → 'Too many re-renders. React limits the number of renders to prevent an infinite loop.'\n                        훅 순서 변경 → 'React has detected a change in the order of Hooks …'\n런타임:                   react/compiler-runtime.js  (React 19.3.1 패키지 안)",
        codeLang: "text",
      },
      {
        label: "문제: 컴파일러를 켰는데 어떤 컴포넌트만 빨라지지 않는다",
        body: "컴파일러를 켜고 Profiler를 보니 대부분 컴포넌트에 Memo ✨ 배지가 붙었는데 상품 표 하나만 없습니다. 그 컴포넌트가 렌더 중에 props로 받은 배열을 items.sort()로 제자리 정렬하고 있었습니다. props를 바꾸는 것은 규칙 위반이라 컴파일러가 '이 함수는 안전하게 캐시할 수 없다'고 보고 통째로 건너뛴 것입니다. 에러도 없고 동작도 전과 같습니다. 빨라지지 않을 뿐입니다. 린터(eslint-plugin-react-hooks 최신)를 켰다면 immutability 규칙이 그 줄을 미리 잡았을 것입니다. 처방은 [...items].sort()로 복사해 정렬하는 것이고, 그러면 다음 빌드에서 배지가 붙습니다. 문서의 디버깅 편이 적은 '건너뜀의 흔한 원인' 첫 항목입니다.",
      },
      {
        label: "문제가 나는 경우: 전제를 모르고 켤 때",
        body: "경우 ㄱ, 규칙 위반으로 건너뜁니다. 위의 사고입니다. 렌더 중 변이, ref.current 렌더 중 읽기, 조건부 훅이 흔한 원인입니다. 경우 ㄴ, 컴파일 뒤 동작이 바뀝니다. 전에는 매 렌더 새 객체라 '우연히' 다시 그려지던 자식이 이제 안 그려집니다. 코드가 참조 변화에 기대고 있었습니다. 규칙 위반을 고치고, 급하면 'use no memo'입니다. 경우 ㄷ, 플러그인 순서입니다. 컴파일러가 다른 Babel 플러그인 뒤에 와서 변환된 코드를 보고 건너뜁니다. 맨 앞에 둡니다. 경우 ㄹ, React 17·18에서 runtime 패키지를 빠뜨립니다. react-compiler-runtime을 설치하고 target을 적어야 합니다. 경우 ㅁ, 'use no memo'를 남발합니다. 임시 탈출구를 영구로 두면 컴파일러가 없는 것과 같습니다. 경우 ㅂ, 손 메모이제이션을 전부 지웁니다. 컴파일러가 건너뛴 컴포넌트는 다시 느려집니다. 린트의 preserve-manual-memoization이 '컴파일러가 보존하지 못하는 수동 메모'를 알려 줍니다. 경우 ㅅ, 서드파티 라이브러리가 규칙을 어깁니다. 린트의 incompatible-library가 알려진 호환 문제를 잡습니다. 경우 ㅇ, 린트를 옛 버전으로 둡니다. 컴파일러 기반 규칙이 없어 건너뜀 원인을 미리 못 봅니다. 경우 ㅈ, 번들이 두 배입니다. gating을 실험 뒤에도 끄지 않았습니다. 경우 ㅊ, 개발 빌드에서만 켭니다. 운영과 개발의 동작이 다르면 운영에서만 나는 버그를 못 봅니다. 둘 다 켜거나 둘 다 끕니다.",
        code: "경우               언제 생기나                           겉모습                                   들통나는 때\nㄱ 규칙 위반 건너뜀    items.sort() 제자리 · ref 렌더 중 읽기    그 컴포넌트만 ✨ 없음. 빨라지지 않음           Profiler\nㄴ 동작 변화         참조 변화에 기댄 코드                   자식이 안 그려짐 (전엔 우연히 그려짐)           켠 직후\nㄷ 플러그인 순서      컴파일러가 뒤에                        변환된 코드를 봐서 건너뜀                     전부 ✨ 없음\nㄹ runtime 누락      React 17·18                          에러: react/compiler-runtime 없음              빌드\nㅁ 'use no memo' 남발 임시를 영구로                        컴파일러 효과 없음                          성능 측정\nㅂ 수동 메모 전부 삭제  건너뛴 컴포넌트까지 지움               다시 느려짐                               Profiler\nㅅ 라이브러리 비호환    규칙 어긴 서드파티                     미묘한 버그                               특정 라이브러리\nㅇ 옛 린트           컴파일러 규칙 없음                      건너뜀 원인을 미리 못 봄                      켠 뒤\nㅈ gating 유지       실험 끝나고도 둘 다 번들에               번들 두 배                               번들 크기\nㅊ 개발만 켬         운영은 안 켬                           운영 전용 버그                             운영",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 자동화는 가정 위에 서고, 가정을 어긴 곳은 자동화 밖에 남는다",
        body: "컴파일러는 '컴포넌트는 순수하고 불변을 지킨다'는 React 규칙을 가정하고, 그 가정 아래서만 성립하는 변환(캐시)을 합니다. 가정이 맞는 코드는 손으로 하던 메모이제이션이 자동이 되고 더 세밀해집니다. 가정이 틀린 코드는 두 갈래입니다. 컴파일러가 알아채면 건너뛰어 전과 같이 느리게 남고(ㄱ), 못 알아채면 변환이 적용되어 동작이 바뀝니다(ㄴ). 둘째가 무서워서 컴파일러는 보수적으로 건너뛰고, 린터가 그 자리를 미리 알려 줍니다. 그래서 컴파일러를 켜는 일은 '빌드 설정 한 줄'이 아니라 '코드가 규칙을 지키는가를 확인하는 일'입니다. 점진적 도입 셋(디렉터리·annotation·gating)이 그 확인을 나눠 하는 방법이고, 'use no memo'는 확인이 끝날 때까지의 임시 표시입니다(ㅁ). 참고서의 'React 규칙' 노드가 그 가정의 전부이고, 'ESLint 플러그인' 노드가 그 가정을 코드에서 검사하는 규칙 열일곱입니다.",
        code: "가정:  컴포넌트·훅은 순수 · props·state 불변 · 훅은 최상위 같은 순서     (React 규칙)\n          │\n   맞는 코드 ──▶ 자동 메모이제이션 (useMemo·useCallback·memo 를 손으로 한 것보다 세밀하게)\n          │\n   틀린 코드 ─┬─ 알아챔 → 건너뜀 → 전과 같이 느림 (ㄱ) · 에러 없음\n             └─ 못 알아챔 → 변환 적용 → 동작이 바뀜 (ㄴ)  ← 이것이 무서워 보수적으로 건너뛴다\n\n린터 (eslint-plugin-react-hooks 최신) = 틀린 코드를 빌드 전에 알려 주는 그물\n점진적 도입 = 확인을 나눠서 (디렉터리 · 'use memo' · gating)     'use no memo' = 확인 끝날 때까지의 임시 표시 (ㅁ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "시작하기 그룹이 끝났습니다. 다음은 본편 'React 배우기' 네 그룹입니다. 첫 그룹 'UI 표현하기'는 컴포넌트·JSX·props·조건·리스트·순수성·트리입니다. 컴파일러가 가정하는 '순수'가 거기서 처음 정식으로 나옵니다.",
      },
      {
        label: "확인 질문",
        body: "컴파일러를 켠 뒤 (1) 어느 컴포넌트가 컴파일됐는지 어떻게 알 수 있고, (2) 한 컴포넌트가 컴파일된 뒤 '클릭해도 목록이 안 바뀐다'면 무엇을 의심해야 하고, (3) 그 컴포넌트에 'use no memo'를 붙이는 것은 해결일까요?",
        notes: [
          {
            title: "답",
            body: "(1) React 개발자 도구 Components 탭에서 컴파일된 컴포넌트에 Memo ✨ 배지가 붙습니다. 없는 것이 건너뛴 것입니다. 린트(eslint-plugin-react-hooks 최신)가 건너뜀 원인을 파일에서 바로 보여 주기도 합니다. (2) 그 컴포넌트가 규칙을 어기고 있었을 가능성이 가장 큽니다. 예를 들어 state 배열을 push로 제자리 변경한 뒤 같은 참조를 set했다면, 전에는 부모의 다른 렌더 때 '우연히' 다시 그려졌지만 컴파일러가 참조가 같다고 보고 캐시한 것입니다. 실제로 돌려 보면 같은 값으로 set하면 렌더가 나지 않았습니다(bail out). (3) 임시 처방입니다. 'use no memo'는 그 컴포넌트를 컴파일에서 빼서 전처럼 동작하게 하지만, 규칙 위반(제자리 변경)은 그대로 남아 다른 곳(memo, StrictMode, 동시성)에서 또 납니다. 복사해서 바꾸도록 고치고 지시어를 지우는 것이 해결입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "React 컴파일러 소개", href: `${KO}/learn/react-compiler/introduction` },
      { label: "설치", href: `${KO}/learn/react-compiler/installation` },
      { label: "점진적 도입", href: `${KO}/learn/react-compiler/incremental-adoption` },
      { label: "디버깅 및 문제 해결", href: `${KO}/learn/react-compiler/debugging` },
    ],
  },

  {
    id: "rl-learn",
    name: "React 배우기",
    tagline: "본편 네 그룹: 적기 → 바꾸기 → 두기 → 바깥과 만나기",
    intro:
      "문서의 본편입니다. UI 표현하기(9편), 상호작용성 더하기(8편), State 관리하기(8편), 탈출구(8편). 순서가 안에서 밖으로 나갑니다. 먼저 컴포넌트 함수 안에서 화면을 적는 법(props, JSX, 조건, 리스트, 순수). 그다음 바뀌는 값(state)과 그것이 화면이 되는 과정(렌더와 커밋, 스냅샷, 큐). 그다음 그 값을 어디에 어떤 모양으로 둘지(구조, 공유, 보존, reducer, context). 마지막에 React 바깥(DOM, 네트워크, 타이머)과 만나는 ref와 Effect. 이 노드의 자식 넷이 그룹 하나씩이고, 이 시트는 넷을 꿰는 실을 적습니다. 이 노드의 질문은 하나입니다. 네 그룹이 왜 이 순서인가.",
    blocks: [
      {
        label: "무엇이 들어 있나: 서른세 편",
        body: "UI 표현하기는 첫 컴포넌트, import/export, JSX, 중괄호, props, 조건부 렌더링, 리스트, 순수하게 유지하기, 트리로서의 UI입니다. 상호작용성 더하기는 이벤트, state(컴포넌트의 기억), 렌더링과 커밋, 스냅샷으로서의 state, state 업데이트 큐, 객체 state, 배열 state입니다. State 관리하기는 input 다루기(선언적 UI), state 구조 선택, 컴포넌트 간 공유(끌어올리기), 보존과 초기화, reducer, context, reducer + context입니다. 탈출구는 ref로 값 참조, ref로 DOM 조작, Effect로 동기화, Effect가 필요하지 않은 경우, Effect의 생명주기, Effect에서 이벤트 분리, 의존성 제거, 커스텀 훅입니다.",
        code: "그룹              편   페이지                                                                              묻는 것\nUI 표현하기        9    첫 컴포넌트 · import/export · JSX · 중괄호 · props · 조건 · 리스트 · 순수 · 트리                   화면을 어떻게 적나\n상호작용성 더하기   8    이벤트 · state · 렌더와 커밋 · 스냅샷 · 업데이트 큐 · 객체 state · 배열 state                      바뀌는 값을 어떻게 다루나\nState 관리하기     8    input 다루기 · 구조 선택 · 공유 · 보존과 초기화 · reducer · context · reducer+context               어디에 어떤 모양으로 두나\n탈출구            8    ref 값 · ref DOM · Effect 동기화 · 필요 없는 Effect · 생명주기 · 이벤트 분리 · 의존성 제거 · 커스텀 훅   바깥과 어떻게 만나나",
        codeLang: "text",
      },
      {
        label: "네 그룹을 꿰는 실: 렌더는 함수 호출이다",
        body: "네 그룹을 하나로 꿰는 사실이 있습니다. 렌더는 React가 컴포넌트 함수를 부르는 것이고, 그 호출 한 번이 그 시점의 props와 state를 받아 JSX를 돌려주는 것입니다. UI 표현하기는 그 함수가 '순수'해야 한다(같은 입력 → 같은 출력)고 합니다. 그래야 React가 아무 때나 몇 번이든 부를 수 있습니다. 상호작용성 더하기는 그 호출의 state가 '스냅샷'이라고 합니다. 함수가 불린 시점의 값이고, set을 불러도 지금 호출 안에서는 안 바뀝니다. 다음 호출에 새 값이 옵니다. State 관리하기는 React가 '어느 호출이 어느 인스턴스인가'를 트리의 자리로 안다고 합니다. 같은 자리면 같은 state, 자리가 바뀌거나 key가 바뀌면 새 state입니다. 탈출구는 함수 호출 바깥에 남겨야 하는 것(DOM 노드, 타이머 ID, 이전 값)을 ref에 두고, 호출이 끝난 뒤 바깥과 동기화할 것을 Effect에 둔다고 합니다. 실제로 돌려 보면 넷이 전부 확인됐습니다.",
        code: "렌더 = React 가 컴포넌트 함수를 부른다:   f(props, state) → JSX\n\nUI 표현하기        f 는 순수해야 한다 — 몇 번 불러도 같다            StrictMode: renders 2 (두 번 불러 확인)\n상호작용성 더하기   호출 안의 state 는 스냅샷 — set 해도 지금은 안 바뀐다   set(n+1) ×3 → +1 · set(x=>x+1) ×3 → +3\nState 관리하기     어느 호출이 어느 인스턴스인가 = 트리의 자리         같은 자리 → state 보존 ('fancy:5') · key 바뀜 → 초기화 ('처음')\n탈출구            호출 바깥에 남길 것은 ref, 끝난 뒤 동기화는 Effect    ref.current++ → 렌더 없음 · effect 는 layout 뒤",
        codeLang: "text",
      },
      {
        label: "순서가 주장인 이유",
        body: "문서가 탈출구를 맨 끝에 둔 것은 '먼저 배우면 안에서 풀 수 있는 문제를 밖으로 들고 나간다'는 판단입니다. 실제로 가장 흔한 React 버그가 Effect로 파생 상태를 만드는 것입니다. props가 바뀌면 Effect에서 setState로 다른 state를 맞추는 코드는 한 렌더 늦게 어긋나고, 둘이 서로를 바꾸면 무한 루프입니다. 그 값은 렌더 중에 계산하면 됩니다(UI 표현하기). state가 둘인 것은 하나로 합치거나 끌어올리면 됩니다(State 관리하기). Effect가 진짜 필요한 것은 'React 바깥'과의 동기화만입니다. 문서의 '필요하지 않은 경우' 페이지가 가장 긴 이유입니다. 그래서 네 그룹을 읽는 순서는 질문의 순서이기도 합니다. 렌더 중에 계산할 수 있나 → state가 맞나 → 어디에 둘까 → 그래도 바깥이면 Effect.",
        code: "버그가 났을 때 묻는 순서 (= 네 그룹의 순서)\n① 렌더 중에 계산할 수 있나?            → UI 표현하기 (순수한 계산)              const full = first + ' ' + last\n② 이 값이 state 가 맞나?               → State 관리하기 (구조 선택: 계산되면 X)    filtered 는 state 아님\n③ state 가 어디 있어야 하나?            → State 관리하기 (공유 · 보존)             공통 부모로\n④ 그래도 React 바깥인가?               → 탈출구 (Effect · ref)                 fetch · 타이머 · 서드파티 위젯\n\n거꾸로 가면: ④ 부터 시작 → Effect 로 파생 상태 → 한 렌더 늦음 · 무한 루프",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 네 그룹의 측정 한 줄씩",
        body: "React 19.3.1, Chrome 156입니다. 순수성은 StrictMode가 렌더를 두 번 불러 확인합니다(renders 2, effects 2, cleanups 1). 스냅샷은 같은 핸들러에서 set(n + 1)을 세 번 불러도 +1이고 함수형 갱신은 +3입니다. 자리는 같은 자리의 다른 분기에서 state 5가 남고 key를 바꾸면 '처음'으로 돌아갑니다. Effect는 커밋 뒤에 돌고, 순서는 자식 layout → 부모 layout → 자식 effect → 부모 effect이며, 리렌더에서는 정리가 먼저 돕니다. ref 변경은 렌더를 일으키지 않습니다. 각 자식 노드가 이 측정을 자기 자리에서 자세히 적습니다.",
        code: "renders 2 / effects 2 / cleanups 1   (StrictMode)\nn=3 (한 번) · n=4 (+1) · n=7 (+3)     (묶음 · 스냅샷 · 함수형)\n'fancy:5' · '처음'                    (자리 보존 · key 초기화)\nParent render → Child render → Child layout → Parent layout → Child effect → Parent effect\nref.current=2 (렌더 없음) → 다음 렌더에서 ref=2",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 그룹 'UI 표현하기'로 들어갑니다. 컴포넌트가 함수라는 것에서 시작해 JSX·props·조건·리스트를 거쳐, 그 함수가 순수해야 하는 이유와 React가 트리로 무엇을 보는지까지입니다.",
      },
    ],
    sources: [
      { label: "UI 표현하기", href: `${KO}/learn/describing-the-ui` },
      { label: "상호작용성 더하기", href: `${KO}/learn/adding-interactivity` },
      { label: "State 관리하기", href: `${KO}/learn/managing-state` },
      { label: "탈출구", href: `${KO}/learn/escape-hatches` },
    ],
  },

  {
    id: "rl-ui",
    name: "UI 표현하기",
    tagline: "컴포넌트는 JSX 를 돌려주는 순수한 함수다. 그 아홉 편",
    intro:
      "아홉 편입니다. 첫 번째 컴포넌트, 컴포넌트 Import 및 Export하기, JSX로 마크업 작성하기, 중괄호가 있는 JSX에서 자바스크립트 사용하기, 컴포넌트에 Props 전달하기, 조건부 렌더링, 리스트 렌더링, 컴포넌트를 순수하게 유지하기, 트리로서의 UI. 컴포넌트는 마크업(JSX)을 돌려주는 자바스크립트 함수입니다. props로 입력을 받고, 조건과 리스트는 자바스크립트 그대로 쓰고, 순수해야 합니다. 같은 입력이면 같은 JSX이고 렌더 중에 바깥을 바꾸지 않습니다. React는 그 함수들을 트리로 봅니다. 렌더 트리(컴포넌트 관계)와 모듈 의존성 트리(import 관계)입니다. 실제로 돌려 보면 StrictMode가 순수성 확인을 위해 두 번 렌더했고, key 없는 리스트는 경고를 냈고, JSX는 동결된 객체였습니다. 이 그룹의 질문은 하나입니다. 화면을 '어떻게 바꿀지'가 아니라 '어떻게 생겼는지'로 적으려면 무엇을 지켜야 하는가.",
    blocks: [
      {
        label: "무엇을 다루나: 아홉 편",
        body: "첫 번째 컴포넌트는 컴포넌트가 '마크업을 돌려주는 함수'이고 이름이 대문자이며 다른 컴포넌트 안에 중첩해 쓰되 정의는 중첩하지 말라는 것입니다. Import/Export는 파일당 default 하나와 named 여럿, 둘을 섞는 것은 피하라는 조언입니다. JSX는 HTML보다 엄격한 셋(루트 하나, 태그 닫기, camelCase)과 변환기입니다. 중괄호는 자바스크립트 식을 넣는 문이고 style={{ }}의 뜻입니다. Props는 함수 매개변수이고, 구조 분해, 기본값, 전개(...props), children, 그리고 '읽기 전용이며 시간이 지나면 부모가 새 props를 준다'는 것입니다. 조건부 렌더링은 if·삼항·&&·null 반환과 0의 함정입니다. 리스트는 map·filter와 key(형제 사이 유일, 안정, 인덱스는 피함)입니다. 순수하게 유지하기는 순수 함수의 정의, 렌더 중 바깥 변경 금지, 지역 변이는 괜찮음, 사이드 이펙트는 이벤트 핸들러(또는 마지막 수단 Effect)에, StrictMode가 두 번 불러 검사한다는 것입니다. 트리로서의 UI는 렌더 트리(루트에서 컴포넌트들, 조건에 따라 바뀜, HTML 요소는 안 보임)와 모듈 의존성 트리(import, 번들러가 봄)입니다.",
        code: "글                                   한 줄\n첫 번째 컴포넌트                        마크업을 돌려주는 함수 · 대문자 · 중첩해 쓰되 정의는 중첩 X (매 렌더 새 함수 → state 초기화)\n컴포넌트 Import 및 Export 하기            default 하나 · named 여럿 · 섞지 말 것 · 파일 하나에 컴포넌트 하나가 보통\nJSX 로 마크업 작성하기                   루트 하나 (Fragment) · 태그 닫기 · camelCase (className, htmlFor) · 변환기\n중괄호가 있는 JSX 에서 JS 사용하기        {식} · 속성에도 · style={{ }} = JS 로 + 객체 · 문(if, for) 은 안 됨\n컴포넌트에 Props 전달하기                 매개변수 · 구조 분해 · 기본값 · ...props 전개 · children · 읽기 전용, 시간에 따라 부모가 새것을 줌\n조건부 렌더링                           if · 삼항 · && · null 반환 · 0 의 함정\n리스트 렌더링                           map · filter · key (형제 사이 유일 · 안정 · 인덱스 X) · Fragment 에 key\n컴포넌트를 순수하게 유지하기              같은 입력 → 같은 출력 · 렌더 중 바깥 변경 X · 지역 변이 O · 사이드 이펙트는 핸들러에 · StrictMode 두 번\n트리로서의 UI                           렌더 트리 (컴포넌트 관계, 조건에 따라 바뀜) · 모듈 의존성 트리 (import, 번들러)",
        codeLang: "text",
        terms: [
          {
            term: "props",
            body: "부모가 자식 컴포넌트에 넘기는 입력입니다. JSX 속성으로 적고 자식 함수의 첫 매개변수 객체로 받습니다. 읽기 전용입니다. 자식이 바꾸면 안 되고, 바뀌어야 하면 부모가 새 props를 내려줍니다. children은 태그 사이에 넣은 것이 들어오는 특별한 prop입니다. HTML 속성이 아니라 함수 인자라서 객체·함수·JSX 무엇이든 넘길 수 있습니다.",
          },
          {
            term: "순수 함수 (pure function)",
            body: "자기 일만 하고(만들어지기 전에 있던 변수·객체를 바꾸지 않음), 같은 입력이면 같은 출력을 내는 함수입니다. React 컴포넌트는 순수해야 합니다. 그래야 React가 아무 때나 몇 번이든 부를 수 있고, 캐시할 수 있고(컴파일러), 서버에서 미리 돌릴 수 있습니다. 렌더 중에 만든 지역 변수를 바꾸는 것은 괜찮습니다. 바깥이 모르기 때문입니다. StrictMode가 두 번 불러 순수하지 않은 곳을 드러냅니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "순수성 검사부터입니다. StrictMode 안의 컴포넌트는 개발 모드에서 렌더 2번, 효과 2번, 정리 1번이었습니다. 밖에서는 1, 1, 0입니다. 두 번 불러 결과가 같은지 보는 것입니다. 서버 렌더(renderToString)에서는 StrictMode 안이어도 1번입니다. JSX는 createElement 호출이고 결과는 { $$typeof: Symbol(react.transitional.element), type: 'div', props: { id, className, children }, key: null }이며 props 객체는 동결(frozen)되어 있습니다. 바꾸려 하면 엄격 모드에서 에러입니다. key 없는 리스트는 서버 렌더에서도 경고를 냅니다. Fragment는 DOM에 아무것도 남기지 않습니다. <i>a</i><i>b</i>만 나왔습니다. Context는 Provider 없으면 기본값 'light', 안이면 'dark'를 보였고, React 19에서는 <Theme value>처럼 Context 자체가 Provider입니다.",
        code: "// React 19.3.1\nStrictMode (클라이언트 개발):  { renders: 2, effects: 2, cleanups: 1 }      밖: { 1, 1, 0 }\nStrictMode (서버 renderToString):  1번                                      ← 서버는 한 번만\n\n// JSX → 요소 객체 (Node 24)\ncreateElement('div', { id: 'a', className: 'b' }, '텍스트', <span key=\"k\" />)\n// { $$typeof: Symbol(react.transitional.element), type: 'div', props: ['id', 'className', 'children'], key: null }\n// props 는 Object.isFrozen → true     자식 span 의 key → 'k'\n\n// key 없는 리스트 (서버 렌더에서도)\n[1, 2].map(i => <li>{i}</li>)        // Each child in a list should have a unique \"key\" prop.\n\n// Fragment · Context\n<><i>a</i><i>b</i></>                 // '<i>a</i><i>b</i>'   DOM 에 Fragment 없음\n<Theme value=\"dark\"><Show /></Theme>  // 'dark'   (React 19: Context 가 곧 Provider)   Provider 없으면 'light'",
      },
      {
        label: "props 는 읽기 전용이고 시간에 따라 바뀐다",
        body: "props는 함수 인자입니다. 구조 분해로 받고({ name, size = 100 }) 기본값을 주고, 받은 것을 그대로 넘기려면 전개합니다(<Avatar {...props} />). 태그 사이에 넣은 것은 children으로 옵니다. 중요한 성질이 둘입니다. 첫째, 읽기 전용입니다. props.name = 'x'는 금지이고(동결된 객체라 엄격 모드에서 에러), 바꿔야 하면 부모에게 '바꿔 달라'고 콜백을 부릅니다. 둘째, 시간에 따라 바뀝니다. 부모가 다른 값으로 다시 렌더하면 자식 함수가 새 props로 다시 불립니다. 그래서 props는 '처음 한 번 받는 설정'이 아니라 '매 렌더의 입력'입니다. props를 state의 초깃값으로 복사하면(useState(props.value)) 그 뒤 props가 바뀌어도 state는 따라오지 않습니다. 가장 흔한 사고 중 하나입니다.",
        code: "function Avatar({ person, size = 100 }) {           // 구조 분해 + 기본값\n  return <img src={getImageUrl(person)} width={size} height={size} />;\n}\nfunction Profile(props) { return <Avatar {...props} />; }   // 전개로 그대로 넘기기\nfunction Card({ children }) { return <div className=\"card\">{children}</div>; }   // 태그 사이의 것\n<Card><Avatar person={p} /></Card>\n\n// 읽기 전용 — props 객체는 동결되어 있다\nprops.size = 200;              // 엄격 모드: TypeError (Cannot assign to read only property)\n\n// 시간에 따라 바뀐다 — 복사하면 끊어진다\nfunction Bad({ value }) { const [v, setV] = useState(value); /* value 가 바뀌어도 v 는 그대로 */ }\nfunction Good({ value }) { /* value 를 그냥 쓴다. 바꿔야 하면 부모에게 onChange 로 */ }",
      },
      {
        label: "조건·리스트·트리",
        body: "조건은 자바스크립트입니다. JSX 밖에서 if로 변수에 담거나, 안에서 삼항이나 &&입니다. 아무것도 안 그리려면 null을 돌려줍니다. 0 && <A />는 0을 그립니다. 리스트는 map으로 요소 배열을 만들고 각 요소에 key를 줍니다. key는 형제 사이에서 유일하고 렌더 사이에 안정적이어야 합니다. 데이터의 ID입니다. 인덱스는 순서가 바뀌면 틀립니다. 렌더마다 Math.random()으로 만들면 매번 다른 항목으로 보여 전부 다시 만들어집니다. Fragment에 key가 필요하면 <Fragment key={…}>로 길게 씁니다. 트리는 둘입니다. 렌더 트리는 루트 컴포넌트에서 자식 컴포넌트로 이어지는 관계이고, 조건부 렌더링에 따라 렌더마다 모양이 바뀝니다. HTML 요소는 이 트리에 없습니다. 플랫폼마다 다르기 때문입니다. 리프(자식이 없는 컴포넌트)는 자주 렌더되는 곳이라 성능 분석의 출발점입니다. 모듈 의존성 트리는 import 관계이고 번들러가 이것을 따라 코드를 묶습니다. 두 트리는 다릅니다. 컴포넌트가 아닌 모듈(유틸)도 의존성 트리에는 있습니다.",
        code: "// 조건\nif (isPacked) return <li>{name} ✓</li>;   return <li>{name}</li>;\n{isPacked ? name + ' ✓' : name}       {isPacked && ' ✓'}       {count > 0 && <List />}   // 0 은 그려지므로 불린으로\nreturn null;                           // 아무것도 안 그린다\n\n// 리스트\n{people.map(person => <li key={person.id}>{person.name}</li>)}\n{people.map(p => <Fragment key={p.id}><h2>{p.name}</h2><p>{p.bio}</p></Fragment>)}   // 여럿이면 Fragment 에 key\nkey 로 쓰면 안 되는 것:  index (순서 바뀌면 틀림) · Math.random() (매 렌더 다른 항목 → 전부 재생성)\n\n// 두 트리\n렌더 트리:        App → [InspirationGenerator → [FancyText, Copyright]]      조건에 따라 바뀜 · HTML 요소 없음 · 리프가 자주 렌더\n모듈 의존성 트리:  App.js → InspirationGenerator.js → inspirations.js (데이터)   import 관계 · 번들러가 따라간다 · 유틸도 있음",
        terms: [
          {
            term: "key",
            body: "리스트 항목이 '전 렌더의 어느 항목인가'를 React에 알려 주는 표식입니다. 형제 사이에서 유일하고 렌더 사이에 바뀌지 않아야 합니다. 데이터의 ID가 맞고, 인덱스는 순서가 바뀌면 틀리고, 렌더마다 만든 난수는 매번 다른 항목으로 보여 전부 다시 만들어집니다. key가 바뀌면 React는 그 항목의 state를 버리고 새로 만듭니다. 'State를 보존하고 초기화하기'가 이것을 의도적으로 씁니다.",
          },
          {
            term: "렌더 트리 (render tree)",
            body: "루트 컴포넌트에서 시작해 어느 컴포넌트가 어느 컴포넌트를 렌더하는지의 트리입니다. 조건부 렌더링에 따라 렌더마다 다를 수 있습니다. HTML 태그는 이 트리에 넣지 않습니다. React Native처럼 플랫폼이 다르면 요소도 다르기 때문입니다. 맨 아래 리프 컴포넌트가 자주 렌더되고, 맨 위 루트에 가까운 컴포넌트의 렌더가 아래 전부를 끌고 가므로 성능을 볼 때 이 트리를 봅니다.",
          },
        ],
      },
      {
        label: "문제: 컴포넌트 안에서 컴포넌트를 정의했더니 입력값이 매 글자마다 사라진다",
        body: "폼 컴포넌트 안에 function Field() { return <input /> }를 정의하고 아래에서 <Field />로 썼습니다. 글자를 치면 부모가 리렌더되고 그때마다 Field라는 '새 함수'가 만들어집니다. React는 함수가 다르면 다른 컴포넌트 타입으로 보고 전 것을 언마운트하고 새것을 마운트합니다. 입력값(DOM의 포커스와 값, state)이 매 렌더 사라집니다. 문서가 첫 편에서 '컴포넌트 정의를 중첩하지 말라'고 적은 이유입니다. 실제로 돌려 보면 같은 타입이 같은 자리에 오면 state가 보존됐고(fancy:5), 타입이나 key가 바뀌면 초기화됐습니다('처음'). 매 렌더 새 함수는 '타입이 바뀜'에 해당합니다. 처방은 정의를 최상위로 올리는 것입니다. 데이터가 필요하면 props로 넘깁니다.",
      },
      {
        label: "문제가 나는 경우: 함수와 입력의 성질을 놓칠 때",
        body: "경우 ㄱ, 정의 중첩입니다. 위의 사고입니다. 경우 ㄴ, props를 state로 복사합니다. useState(props.value)는 처음 한 번만 봅니다. 그 뒤 props가 바뀌어도 state는 옛 값입니다. props를 그냥 쓰거나, 정말 '초깃값'이면 이름을 initialValue로 바꿔 뜻을 분명히 합니다. 경우 ㄷ, 렌더 중 바깥 변경입니다. 모듈 변수나 props 객체를 렌더 중에 바꾸면 StrictMode에서 두 번 불려 결과가 달라집니다. 실제로 돌려 보면 StrictMode는 렌더를 2번 불렀습니다. 경우 ㄹ, 0이 그려집니다. {count && …}. 경우 ㅁ, key가 인덱스거나 난수입니다. 순서가 바뀌면 state가 엉뚱한 행에, 난수면 매 렌더 전부 재생성입니다. 경우 ㅂ, default와 named를 섞습니다. 같은 컴포넌트를 파일마다 다른 이름으로 import해 검색이 안 됩니다. 경우 ㅅ, 루트가 둘입니다. 빌드 에러입니다. Fragment입니다. 경우 ㅇ, props를 바꿉니다. props.items.push(x)는 동결된 배열이 아니라도 규칙 위반이고, 부모의 데이터를 바꿉니다. 경우 ㅈ, HTML 요소를 렌더 트리에 넣고 생각합니다. 성능 분석에서 div 수를 세는데 React가 보는 것은 컴포넌트입니다. 경우 ㅊ, 렌더 중에 fetch·구독·타이머를 시작합니다. 사이드 이펙트는 핸들러나 Effect에 둡니다. 두 번 렌더되면 두 번 요청됩니다.",
        code: "경우               언제 생기나                            겉모습                                   들통나는 때\nㄱ 정의 중첩         부모 안에 function Child()              매 렌더 언마운트·마운트. 입력값 사라짐          글자 칠 때\nㄴ props 를 state 로   useState(props.value)                 props 바뀌어도 옛 값                       부모가 바꿀 때\nㄷ 렌더 중 바깥 변경   guest++ · props 변이                   StrictMode 에서 두 배 · 컴파일러 건너뜀         개발 모드\nㄹ 0 이 그려짐       {count && <A />}                       '0'                                      0 일 때\nㅁ 나쁜 key          index · Math.random()                  state 뒤바뀜 · 전부 재생성                    정렬·삭제\nㅂ export 혼용       default + named 섞음                   이름이 파일마다 다름                        리팩터링\nㅅ 루트 둘           <h1/><p/> 나란히 반환                   빌드 에러                                바로\nㅇ props 변이        props.items.push                       부모 데이터가 바뀜 · 규칙 위반                 다른 곳이 같은 데이터를 볼 때\nㅈ HTML 을 트리로     div 수로 성능 추정                      엉뚱한 곳 최적화                            성능 작업\nㅊ 렌더 중 이펙트     렌더 중 fetch                           두 번 요청 (StrictMode)                    네트워크 탭",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 컴포넌트는 React 가 부르는 순수 함수고, 입력은 매 호출 새로 온다",
        body: "이 그룹의 사고는 두 성질에서 납니다. 첫째, 컴포넌트는 내가 부르는 함수가 아니라 React가 부르는 함수입니다. 언제 몇 번 불릴지 내가 정하지 못합니다. 그래서 순수해야 하고(ㄷ, ㅊ), 함수의 '정체'(어느 함수 객체인가)가 React에게 중요합니다(ㄱ). 둘째, props는 설정이 아니라 매 호출의 입력입니다. 시간에 따라 바뀌고(ㄴ), 읽기 전용이고(ㅇ), 그 입력으로 JSX라는 '화면의 설명'을 돌려줍니다. JSX는 함수 호출이라 루트 하나·식만·0도 값입니다(ㄹ, ㅅ). React는 돌려받은 설명을 트리로 보고 자리와 key로 인스턴스를 알아봅니다(ㅁ, ㅈ). 처방은 두 성질을 코드 모양에 맞추는 것입니다. 정의는 최상위에, 사이드 이펙트는 핸들러에, props는 그대로 쓰고, key는 ID로.",
        code: "성질 ①  React 가 부른다 (내가 아니라)\n   → 언제 몇 번 불릴지 모른다 → 순수해야 한다 (ㄷ ㅊ) → 함수의 정체가 중요하다 (ㄱ: 매 렌더 새 함수 = 다른 컴포넌트)\n\n성질 ②  props 는 매 호출의 입력\n   → 시간에 따라 바뀐다 (ㄴ: 복사하면 끊김) → 읽기 전용 (ㅇ) → 입력으로 JSX(설명)를 돌려준다\n   → JSX 는 함수 호출: 루트 하나 (ㅅ) · 식만 · 0 도 값 (ㄹ)\n\nReact 가 받은 설명 = 트리 (컴포넌트, HTML 아님 ㅈ) → 자리 + key 로 인스턴스를 알아본다 (ㅁ)\n\n처방:  정의는 최상위 · 이펙트는 핸들러 · props 는 그대로 · key 는 ID",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "화면을 적을 수 있게 됐습니다. 그런데 지금까지의 컴포넌트는 입력이 같으면 늘 같은 화면입니다. 사용자가 누르면 바뀌어야 합니다. 다음 그룹 '상호작용성 더하기'는 이벤트 핸들러, 컴포넌트의 기억인 state, 그 state가 화면이 되는 렌더와 커밋, 그리고 state가 '스냅샷'이라는 사실과 갱신이 '큐'에 쌓인다는 사실입니다. 실제로 돌려 보면 같은 값으로 +1을 세 번 해도 +1이었습니다.",
      },
      {
        label: "확인 질문",
        body: "function TodoList({ todos }) { const sorted = todos.sort((a, b) => a.due - b.due); return <ul>{sorted.map((t, i) => <li key={i}>{t.text}</li>)}</ul>; } 에 문제가 셋 있습니다. 무엇이고, 각각 어느 편의 규칙일까요?",
        notes: [
          {
            title: "답",
            body: "첫째, todos.sort()는 props 배열을 제자리에서 바꿉니다. props는 읽기 전용이고 렌더 중 바깥 변경은 순수성 위반입니다('순수하게 유지하기', 'Props 전달하기'). [...todos].sort()로 복사합니다. 컴파일러도 이 컴포넌트를 건너뜁니다. 둘째, key={i}는 인덱스라 정렬 순서가 바뀌면 각 li의 정체가 뒤바뀝니다('리스트 렌더링'). key={t.id}입니다. 셋째, 정렬을 매 렌더 다시 합니다. 작으면 괜찮지만 크면 useMemo나 컴파일러의 자리입니다. 셋째는 틀린 것이 아니라 비용의 문제이고, 앞의 둘은 규칙 위반입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "UI 표현하기", href: `${KO}/learn/describing-the-ui` },
      { label: "컴포넌트에 Props 전달하기", href: `${KO}/learn/passing-props-to-a-component` },
      { label: "리스트 렌더링", href: `${KO}/learn/rendering-lists` },
      { label: "컴포넌트를 순수하게 유지하기", href: `${KO}/learn/keeping-components-pure` },
      { label: "트리로서의 UI", href: `${KO}/learn/understanding-your-ui-as-a-tree` },
    ],
  },

  {
    id: "rl-interact",
    name: "상호작용성 더하기",
    tagline: "state 는 컴포넌트의 기억이고, 렌더는 그 기억의 스냅샷이고, 갱신은 큐에 쌓인다",
    intro:
      "여덟 편입니다. 이벤트에 응답하기, State: 컴포넌트의 기억 저장소, 렌더링 그리고 커밋, 스냅샷으로서의 State, State 업데이트 큐, 객체 State 업데이트하기, 배열 State 업데이트하기. 사용자가 누르면 핸들러가 돌고, 핸들러가 setState를 부르고, React가 그 컴포넌트를 다시 불러(렌더) 새 JSX를 받고, 달라진 부분만 DOM에 반영(커밋)합니다. 핵심이 둘입니다. 한 렌더 안의 state는 그 렌더가 시작될 때의 값으로 고정된 스냅샷이라 set을 불러도 지금 코드에서는 안 바뀝니다. 그리고 한 이벤트 안의 set 여럿은 큐에 쌓여 렌더 한 번으로 묶입니다. 실제로 돌려 보면 set(1) set(2) set(3)이 렌더 한 번에 n=3, 같은 스냅샷으로 set(n+1) 세 번이 +1, 함수형 set(x => x+1) 세 번이 +3이었습니다. 객체와 배열은 바꾸지 않고 새것으로 갈아 끼웁니다. 이 그룹의 질문은 하나입니다. set을 불렀는데 왜 지금 값이 안 바뀌는가.",
    blocks: [
      {
        label: "무엇을 다루나: 여덟 편",
        body: "이벤트에 응답하기는 핸들러를 전달하는 것(부르지 않음), 핸들러 이름(handle*, on*), props로 핸들러 넘기기, 전파(버블)와 e.stopPropagation, 기본 동작과 e.preventDefault, 그리고 '핸들러는 사이드 이펙트를 두기에 가장 좋은 곳'이라는 것입니다. State는 지역 변수가 두 가지로 모자라다(렌더 사이에 안 남고, 바꿔도 렌더가 안 남)는 데서 useState를 끌어내고, 훅 규칙과 '훅은 호출 순서로 구분된다'는 원리(배열로 흉내 낸 구현), state는 컴포넌트 인스턴스마다 격리된다는 것입니다. 렌더링 그리고 커밋은 세 단계입니다. 트리거(초기 렌더 또는 state 변경) → 렌더(React가 함수를 부름, 자식도 재귀로) → 커밋(초기엔 appendChild, 갱신엔 달라진 것만 최소로 DOM 변경). 그 뒤 브라우저가 페인트합니다. 스냅샷으로서의 State는 '렌더는 그 시점의 사진'이라 핸들러 안의 state가 그 렌더의 값이고, setTimeout 안에서도 그 값이고, set은 다음 렌더를 요청할 뿐 변수를 바꾸지 않는다는 것입니다. State 업데이트 큐는 React가 이벤트 핸들러가 끝날 때까지 기다려 set들을 묶어 처리(배칭)하고, 같은 state에 set(n + 1) 세 번은 마지막 하나와 같지만 set(n => n + 1) 세 번은 큐에 함수 셋이 들어가 차례로 적용된다는 것입니다. 객체 State는 state의 객체를 바꾸지 말고 새 객체를 만들어 set하라는 것, 전개 구문으로 복사하되 얕다는 것, 중첩이면 겹겹이 복사하거나 Immer를 쓰라는 것입니다. 배열 State도 같습니다. push·pop·splice·sort·reverse 대신 concat·[...]·filter·map·slice·toSorted를 쓰고, 배열 안 객체도 복사합니다.",
        code: "글                         한 줄\n이벤트에 응답하기             핸들러는 전달 (호출 X) · handleX / onX · 전파와 stopPropagation · preventDefault · 사이드 이펙트는 핸들러에\nState: 컴포넌트의 기억 저장소   지역 변수는 안 남고 렌더도 안 일으킴 → useState · 훅 규칙 (최상위) · 호출 순서로 구분 · 인스턴스마다 격리\n렌더링 그리고 커밋            트리거 → 렌더 (함수 호출, 재귀) → 커밋 (최소 DOM 변경) → 브라우저 페인트\n스냅샷으로서의 State          한 렌더의 state 는 고정된 사진 · 핸들러·setTimeout 안에서도 그 값 · set 은 다음 렌더 요청\nState 업데이트 큐             핸들러 끝까지 기다려 묶음 (배칭) · set(n+1) ×3 = 마지막 하나 · set(n=>n+1) ×3 = 차례로 셋\n객체 State 업데이트하기       바꾸지 말고 새 객체 · {...obj, x} 얕은 복사 · 중첩은 겹겹이 또는 Immer\n배열 State 업데이트하기       push/splice/sort 대신 [...]/filter/map/slice/toSorted · 배열 안 객체도 복사",
        codeLang: "text",
        terms: [
          {
            term: "렌더 (render)와 커밋 (commit)",
            body: "렌더는 React가 컴포넌트 함수를 불러 '화면이 어떻게 생겨야 하나'(JSX)를 알아내는 계산입니다. 커밋은 그 결과를 전 결과와 비교해 달라진 부분만 실제 DOM에 반영하는 단계입니다. 그 뒤 브라우저가 그립니다(렌더링 노드 10장). 렌더가 돌았다고 DOM이 바뀐 것은 아니고, DOM이 안 바뀌었다고 렌더가 없었던 것도 아닙니다. 식당으로 치면 주문 받기(트리거) → 요리(렌더) → 서빙(커밋)입니다.",
          },
          {
            term: "스냅샷 (snapshot)으로서의 state",
            body: "한 렌더 안에서 state 변수는 그 렌더가 시작될 때 React가 넘겨준 값으로 고정됩니다. 함수 호출의 인자처럼요. set을 불러도 그 변수는 안 바뀝니다. React에게 '다음 렌더는 이 값으로'라고 요청할 뿐입니다. 그래서 핸들러나 setTimeout 안에서 읽는 state도 그 핸들러가 만들어진 렌더의 값입니다. 실제로 돌려 보면 같은 스냅샷으로 set(n + 1)을 세 번 불러도 +1이었습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 묶음, 스냅샷, 큐",
        body: "React 19.3.1, Chrome 156입니다. 컴포넌트 밖에서 set을 세 번 연달아 불렀습니다. setN(1); setN(2); setN(3). 렌더는 한 번, n=3입니다. 묶음(배칭)입니다. React 18부터는 핸들러 밖(setTimeout, 프라미스)에서도 묶입니다. 그다음 그 렌더의 스냅샷 값 base로 setN(base + 1)을 세 번 불렀습니다. 결과는 +1(n=4)입니다. 셋 다 같은 값 base + 1을 큐에 넣었기 때문입니다. 그다음 함수형 갱신 setN(n => n + 1)을 세 번 불렀습니다. +3(n=7)입니다. 큐에 함수 셋이 들어가 React가 차례로 적용했습니다. 마지막으로 지금 값과 같은 값으로 set하니 렌더가 한 번 더 찍혔습니다. 같은 값이면 React가 보통 건너뛰지만(bail out), 이 측정에서는 자식 없는 단순 컴포넌트가 한 번 더 렌더되고 커밋은 없었습니다. React는 같은 값일 때 '때로 한 번 더 렌더한 뒤 자식으로 내려가지 않는다'고 문서에 적어 두었습니다. 효과 순서도 확인했습니다. 렌더 → 커밋(layout 효과) → 페인트 → effect입니다.",
        code: "// Chrome 156, React 19.3.1\nrender n=0\n--- 핸들러 하나 안에서 세 번 ---\nsetN(1); setN(2); setN(3);\nrender n=3                          ← 렌더 한 번 (묶음)\n--- 같은 스냅샷으로 +1 세 번 ---\nsetN(base + 1); setN(base + 1); setN(base + 1);     // base 는 그 렌더의 값 3\nrender n=4                          ← +1 (셋 다 같은 값 4 를 넣었다)\n--- 함수형 갱신 세 번 ---\nsetN(n => n + 1); ×3\nrender n=7                          ← +3 (큐에 함수 셋, 차례로)\n--- 같은 값 set ---\nsetN(7)\nrender n=7                          ← 한 번 더 렌더되지만 자식·커밋은 없다 (문서: '때로 한 번 더 호출')\n\n// 렌더 → 커밋 → 페인트 → effect\nParent render → Child render → Child layout → Parent layout → (flushSync 반환 = 커밋 끝) → Child effect → Parent effect",
      },
      {
        label: "큐가 처리하는 규칙: 값은 덮고, 함수는 이어 간다",
        body: "핸들러가 끝나면 React는 큐를 처음부터 봅니다. 값(set(5))은 '5로 바꿔라'라서 앞 것을 덮습니다. 함수(set(n => n + 1))는 '지금 큐의 값을 받아 바꿔라'라서 앞 결과를 이어 받습니다. 그래서 set(n + 1) 세 번은 전부 '스냅샷 + 1'이라는 같은 값을 넣어 +1이고, 함수 셋은 +3입니다. 섞으면 순서대로입니다. set(42); set(n => n + 1); set(100) 은 100입니다. 함수형 갱신은 순수해야 하고(렌더 중에 돕니다) 결과만 돌려줘야 합니다. 이름은 관례로 state 이름의 첫 글자(n => n + 1)나 앞에 접두(prevN)입니다. 묶음은 '한 이벤트 안'이 단위이고, 서로 다른 이벤트(두 번의 클릭)는 묶이지 않습니다. 의도적으로 묶지 않으려면 react-dom의 flushSync(() => set(...))로 즉시 커밋시킵니다. 측정 코드가 flushSync로 렌더를 동기로 끝낸 것이 그것입니다.",
        code: "큐 처리 규칙\n  값 v           → 큐의 값을 v 로 덮는다\n  함수 f         → 큐의 값에 f 를 적용해 이어 간다\n\n<button onClick={() => { setN(n + 1); setN(n + 1); setN(n + 1); }} />        // n 이 0 이면 큐: [1, 1, 1] → 1\n<button onClick={() => { setN(n => n + 1); setN(n => n + 1); setN(n => n + 1); }} />   // 큐: [f, f, f] → 0→1→2→3\n<button onClick={() => { setN(42); setN(n => n + 1); setN(100); }} />           // 42 → 43 → 100\n\n// 묶음의 단위 = 한 이벤트.  의도적으로 즉시 커밋하려면\nimport { flushSync } from 'react-dom';\nflushSync(() => setN(1));   // 여기서 DOM 이 바뀐다\nlistRef.current.scrollTop = listRef.current.scrollHeight;   // 바뀐 DOM 을 바로 읽을 수 있다",
        terms: [
          {
            term: "배칭 (batching)과 flushSync",
            body: "한 이벤트 핸들러(React 18부터는 setTimeout·프라미스 안도) 안의 set 호출들을 모아 끝난 뒤 렌더 한 번으로 처리하는 것입니다. 렌더링 노드 10장의 Vue flush와 같은 생각입니다. flushSync(fn)은 fn 안의 set을 즉시 동기로 렌더·커밋시킵니다. 커밋 직후 DOM을 읽어야 할 때(스크롤 맨 아래로)만 쓰고, 보통은 쓰지 않습니다.",
          },
          {
            term: "함수형 갱신 (updater function)",
            body: "set에 값 대신 함수(n => n + 1)를 넘기는 것입니다. React가 큐를 처리할 때 '그때까지의 값'을 넣어 부르므로 같은 핸들러에서 여러 번 불러도 차례로 쌓입니다. 이전 값에 기대는 갱신(카운터, 토글, 목록에 추가)은 함수형으로 쓰는 것이 안전합니다. 함수는 렌더 중에 돌 수 있어 순수해야 합니다.",
          },
        ],
      },
      {
        label: "객체와 배열: 바꾸지 말고 갈아 끼운다",
        body: "state에 든 객체·배열은 기술적으로 바꿀 수 있지만 그러면 안 됩니다. React는 set에 넘어온 값이 전과 '같은 참조'면 바뀐 것을 모르고 렌더하지 않습니다. 실제로 돌려 보면 같은 값(참조)으로 set하면 커밋이 없었습니다. 그래서 바꾸는 대신 새것을 만들어 넘깁니다. 객체는 전개 { ...person, name: '새 이름' }, 중첩은 겹겹이 { ...person, address: { ...person.address, city } }. 전개는 얕아서 안쪽을 공유합니다(JS 노드 4장). 배열은 추가 [...arr, item], 제거 arr.filter(i => i.id !== id), 교체 arr.map(i => i.id === id ? { ...i, done: true } : i), 삽입 [...arr.slice(0, k), item, ...arr.slice(k)], 정렬은 [...arr].sort() 또는 toSorted(). push·splice·sort·reverse는 원본을 바꾸므로 state에 직접 쓰지 않습니다. 중첩이 깊어 복사가 길어지면 Immer(useImmer)가 '바꾸는 것처럼 적으면 새 객체를 만들어 주는' 길입니다. 이 규칙이 자습서의 slice()이고, memo·컴파일러가 참조 비교로 동작하는 전제이고, '시간 여행'이 가능한 이유입니다.",
        code: "// 객체 — 전개로 새것\nsetPerson({ ...person, firstName: e.target.value });\nsetPerson({ ...person, artwork: { ...person.artwork, city: 'New Delhi' } });   // 중첩은 겹겹이 (전개는 얕다)\n\n// 배열 — 바꾸는 메서드 대신 새것을 주는 메서드\n추가    setList([...list, item])                     // push ✗\n제거    setList(list.filter(i => i.id !== id))        // splice ✗\n교체    setList(list.map(i => i.id === id ? { ...i, seen: true } : i))   // list[i].seen = true ✗\n삽입    setList([...list.slice(0, k), item, ...list.slice(k)])\n정렬    setList([...list].sort(cmp))  또는  list.toSorted(cmp)   // sort ✗ (원본 변경)\n\n// 왜: 같은 참조면 React 가 바뀐 것을 모른다\nlist.push(item); setList(list);     // 같은 참조 → 렌더 안 됨 (실제로 돌려 보면 같은 값 set 은 커밋 없음)\n\n// 깊으면 Immer\nupdatePerson(draft => { draft.artwork.city = 'Lagos'; });   // 바꾸는 것처럼 적으면 새 객체를 만들어 준다",
        terms: [
          {
            term: "불변성 (immutability)과 참조 비교",
            body: "state의 객체·배열을 제자리에서 바꾸지 않고 새것으로 갈아 끼우는 규칙입니다. React는 '바뀌었나'를 Object.is(참조 비교)로 봅니다. 같은 객체를 안에서 바꾸고 set하면 같은 참조라 모릅니다. 새 객체면 다르다고 알고 렌더합니다. memo·useMemo·컴파일러·시간 여행이 전부 이 전제 위에 있습니다. JS 노드 4장의 참조 복사가 그 바닥입니다.",
          },
        ],
      },
      {
        label: "문제: 더블 클릭을 두 번 +1 로 처리했는데 +1 만 된다",
        body: "'좋아요'를 누르면 setCount(count + 1)을 하고, 같은 핸들러에서 서버 응답 뒤 한 번 더 setCount(count + 1)을 합니다. 두 번 불렀는데 +1입니다. 둘 다 그 렌더의 스냅샷 count를 읽어 같은 값 count + 1을 큐에 넣었기 때문입니다. 실제로 돌려 보면 같은 스냅샷으로 set(n + 1) 세 번이 +1이었습니다. setTimeout 안에서 읽는 count도 그 핸들러가 만들어진 렌더의 값입니다. 처방은 함수형 갱신 setCount(c => c + 1)입니다. 큐를 처리할 때의 값을 받아 이어 갑니다. 실제로 돌려 보면 세 번이 +3이었습니다. 이전 값에 기대는 갱신은 늘 함수형으로 씁니다.",
      },
      {
        label: "문제가 나는 경우: 스냅샷과 큐와 불변성을 모를 때",
        body: "경우 ㄱ, 같은 스냅샷으로 여러 번 +1입니다. 위의 사고입니다. 경우 ㄴ, set 직후 state를 읽습니다. setCount(5); console.log(count)는 옛 값입니다. 다음 렌더에 옵니다. 바뀐 값이 필요하면 지역 변수에 먼저 담아 둘 다 씁니다. 경우 ㄷ, setTimeout 안의 옛 state입니다. 3초 뒤 알림에 그 렌더의 값이 찍힙니다. 스냅샷이 의도일 때도 있고(그 순간 값), 최신이 필요하면 ref에 최신 값을 두거나 함수형 갱신으로 읽습니다. 경우 ㄹ, 제자리 변경 뒤 set입니다. list.push(x); setList(list)는 같은 참조라 렌더가 안 납니다. 경우 ㅁ, 얕은 복사로 안쪽을 공유합니다. { ...state }.user.name = x는 안쪽 객체를 바꿉니다. 겹겹이 복사입니다. 경우 ㅂ, 핸들러를 부릅니다. onClick={handle()}은 렌더 때 돌고, set을 부르면 렌더 중 set이라 'Too many re-renders'입니다. 실제로 돌려 보면 그 문구였습니다. 경우 ㅅ, 전파를 끊지 않아 부모 핸들러도 돕니다. 버튼 클릭이 카드 클릭까지 올라갑니다. e.stopPropagation 또는 부모에서 closest로 판단(JS 노드 16장). 경우 ㅇ, 폼의 기본 동작입니다. onSubmit에서 preventDefault를 안 해 페이지가 새로고침됩니다. 경우 ㅈ, 지역 변수로 기억하려 합니다. let count = 0; count++는 렌더 사이에 남지 않고 렌더도 안 일으킵니다. 경우 ㅊ, 훅을 조건 안에 둡니다. 순서가 바뀌어 다른 state와 짝지어집니다. 경우 ㅋ, 묶임을 모르고 중간 상태를 기대합니다. 로딩 true → 데이터 set → 로딩 false를 한 핸들러에서 하면 로딩이 한 번도 안 보입니다. 비동기 경계(await)를 두면 그 사이에 렌더가 납니다.",
        code: "경우               언제 생기나                           겉모습                                   들통나는 때\nㄱ 스냅샷 +1 반복     set(count+1) 두 번                   +1 만                                    빠른 클릭·연속 갱신\nㄴ set 직후 읽기      set(5); log(count)                   옛 값                                    로그를 볼 때\nㄷ 타이머의 옛 값     setTimeout 안 count                   그 렌더의 값                              3초 뒤\nㄹ 제자리 변경        arr.push; setArr(arr)                 렌더 안 됨                                클릭했는데 그대로\nㅁ 얕은 복사         {...s}.inner.x = v                   안쪽 공유 · 옛 렌더도 바뀜                  중첩 state\nㅂ 핸들러 호출        onClick={f()} 안에 set                Too many re-renders                       첫 렌더\nㅅ 전파             버튼 클릭이 카드로                     부모 핸들러도 돈다                         중첩 클릭\nㅇ 폼 기본 동작       onSubmit 에 preventDefault 없음         새로고침                                 전송할 때\nㅈ 지역 변수         let n = 0; n++                       화면 안 바뀜                              클릭할 때\nㅊ 조건부 훅         if 안 useState                       순서 변경 경고 · 뒤바뀐 값                  조건이 바뀔 때\nㅋ 중간 상태 기대     setLoading(true); setData; setLoading(false)   로딩이 안 보임 (묶임)                 느린 응답\n\n// 실제로 돌려 보면\n'Too many re-renders. React limits the number of renders to prevent an infinite loop.'   (렌더 중 set)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 렌더 하나는 사진 한 장이고, 갱신은 다음 사진을 위한 메모다",
        body: "이 그룹의 사고는 '렌더 하나 = 그 시점의 사진'이라는 모형을 변수 모형으로 바꿔 생각할 때 납니다. 변수 모형에서는 set(count + 1)이 count를 바로 바꿉니다. 사진 모형에서는 set은 '다음 사진은 이 값으로'라는 메모를 큐에 넣는 것이고, 지금 사진(렌더)의 count는 끝까지 그대로입니다(ㄱ, ㄴ, ㄷ). 메모는 핸들러가 끝나면 한 번에 읽히고(ㅋ), 값 메모는 덮고 함수 메모는 이어 갑니다(ㄱ의 처방). 다음 사진이 전과 다른지는 참조로 봅니다. 그래서 같은 객체를 안에서 바꾸면 '같은 사진'이고(ㄹ, ㅁ), 새 객체를 만들어야 '다른 사진'입니다. 사진은 React가 찍습니다(함수를 부릅니다). 내가 핸들러를 부르거나(ㅂ) 지역 변수로 기억하려 하면(ㅈ) 사진 모형 밖입니다. 처방은 모형을 바꾸는 것입니다. state는 읽기만, 갱신은 메모(가능하면 함수형), 객체·배열은 새것으로.",
        code: "변수 모형 (틀림)                     사진 모형 (React)\ncount 는 변수, set 이 바꾼다           count 는 이 렌더의 사진. set 은 '다음 사진' 메모를 큐에 넣는다\nset(count+1) 두 번 → +2               두 메모 모두 '사진값+1' → +1 (ㄱ)   /   함수 메모 둘 → 이어 가서 +2\nset 뒤 count 는 새 값                  끝까지 옛 값 (ㄴ ㄷ)\n중간 상태가 보인다                     핸들러 끝나고 한 번에 읽힌다 → 안 보인다 (ㅋ)\n객체를 바꾸면 바뀐다                   같은 참조 = 같은 사진 → 모른다 (ㄹ ㅁ). 새 객체 = 다른 사진\n\n사진은 React 가 찍는다 (함수를 부른다)  → 내가 부르면 (ㅂ), 지역 변수로 기억하면 (ㅈ) 모형 밖\n\n처방:  state 는 읽기만 · 갱신은 메모 (이전 값에 기대면 함수형) · 객체·배열은 새것으로 · 커밋 직후가 필요하면 flushSync",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "state를 바꿀 수 있게 됐습니다. 다음 그룹 'State 관리하기'는 그 state를 어떻게 설계하는지입니다. 무엇을 state로 둘지(구조 선택의 다섯 원칙), 어디에 둘지(끌어올리기), React가 어느 state를 어느 컴포넌트의 것으로 보는지(트리의 자리와 key), 갱신 로직이 복잡해지면 reducer로, 깊이 내려줄 값은 context로. 실제로 돌려 보면 같은 자리의 다른 분기에서 state가 남았고 key를 바꾸자 초기화됐습니다.",
      },
      {
        label: "확인 질문",
        body: "function Counter() { const [n, setN] = useState(0); return <button onClick={() => { setN(n + 1); setTimeout(() => setN(n + 1), 1000); }}>{n}</button>; } 에서 버튼을 한 번 누르고 1초 기다리면 화면은 무엇일까요? 두 번 모두 +1이 되게 하려면?",
        notes: [
          {
            title: "답",
            body: "1입니다. 첫 setN(n + 1)은 0 + 1 = 1을 큐에 넣고 렌더가 나서 1이 됩니다. 1초 뒤 타이머 안의 n은 그 핸들러가 만들어진 렌더의 스냅샷 0이라 또 0 + 1 = 1을 넣습니다. 같은 값이라 화면은 1 그대로입니다. 실제로 돌려 보면 같은 스냅샷으로 세 번 더해도 +1이었습니다. 두 번 모두 +1이 되게 하려면 둘 다 함수형 갱신 setN(c => c + 1)으로 씁니다. 타이머 안의 함수는 1초 뒤 큐가 처리될 때의 값(1)을 받아 2가 됩니다. 실제로 돌려 보면 함수형 세 번이 +3이었습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "상호작용성 더하기", href: `${KO}/learn/adding-interactivity` },
      { label: "렌더링 그리고 커밋", href: `${KO}/learn/render-and-commit` },
      { label: "스냅샷으로서의 State", href: `${KO}/learn/state-as-a-snapshot` },
      { label: "State 업데이트 큐", href: `${KO}/learn/queueing-a-series-of-state-updates` },
      { label: "객체 State 업데이트하기", href: `${KO}/learn/updating-objects-in-state` },
      { label: "배열 State 업데이트하기", href: `${KO}/learn/updating-arrays-in-state` },
    ],
  },

  {
    id: "rl-state",
    name: "State 관리하기",
    tagline: "무엇을, 어디에, 어떤 모양으로. 그리고 React 는 state 를 트리의 자리로 알아본다",
    intro:
      "여덟 편입니다. State를 사용해 Input 다루기, State 구조 선택하기, 컴포넌트 간 State 공유하기, State를 보존하고 초기화하기, State 로직을 Reducer로 작성하기, Context를 사용해 데이터를 깊게 전달하기, Reducer와 Context로 앱 확장하기. 앞 그룹이 state를 바꾸는 법이었다면 여기는 설계입니다. 화면을 '상태들의 집합'으로 보고(선언적), state는 최소·비중복·비모순으로 고르고, 둘이 같이 바뀌면 공통 부모로 올리고, 복잡한 갱신은 reducer 하나로 모으고, 깊이 내려줄 값은 context로 보냅니다. 그리고 React가 '이 state는 어느 컴포넌트의 것인가'를 트리의 자리로 안다는 사실이 있습니다. 같은 자리의 같은 타입이면 보존, 자리나 key가 바뀌면 초기화입니다. 실제로 돌려 보면 둘 다 그랬습니다. 이 그룹의 질문은 하나입니다. 이 값은 state인가, 어디 있어야 하나, React는 그것을 어떻게 알아보나.",
    blocks: [
      {
        label: "무엇을 다루나: 여덟 편",
        body: "Input 다루기는 명령형(버튼 비활성화, 스피너 보이기…)과 선언형(화면이 가질 수 있는 상태를 전부 적고 그중 하나를 state로)의 차이입니다. 다섯 단계입니다. 시각적 상태 나열(empty, typing, submitting, success, error) → 상태를 바꾸는 트리거(사람 입력, 컴퓨터 응답) → useState로 표현 → 불필요한 state 제거 → 핸들러 연결. 구조 선택하기는 다섯 원칙입니다. 연관된 state는 묶기, 모순 피하기(isSending과 isSent 둘 대신 status 하나), 중복 피하기(계산되는 값은 state 아님), 깊은 중첩 피하기(정규화), 그리고 props를 state에 복사하지 말기. 공유하기는 끌어올리기 세 단계(자식의 state 제거 → 부모가 props로 → 부모에 state와 핸들러)와 제어·비제어 컴포넌트입니다. 보존과 초기화는 'state는 트리의 자리에 묶인다'입니다. 같은 자리의 같은 컴포넌트는 state 보존, 다른 컴포넌트나 다른 자리면 초기화, 같은 자리에서 초기화하려면 다른 자리로 옮기거나 key를 줍니다. Reducer는 여러 핸들러의 set을 '무슨 일이 일어났나'(action)로 바꿔 한 함수(reducer)가 다음 state를 계산하는 것입니다. 순수해야 하고 각 action은 사용자 상호작용 하나입니다. Context는 props 드릴링을 피해 트리 아래 어디서나 읽는 값입니다. createContext → Provider로 값 주기 → useContext로 읽기. 쓰기 전에 props 전달·children 전달을 먼저 고려하라고 합니다. 마지막 편은 reducer의 state와 dispatch를 두 context로 내려주어 깊은 자식이 읽고 바꾸는 패턴입니다.",
        code: "글                                    한 줄\nState 를 사용해 Input 다루기              명령형 vs 선언형 · 시각적 상태 나열 → 트리거 → useState → 불필요한 것 제거 → 핸들러\nState 구조 선택하기                      ① 연관된 것 묶기 ② 모순 피하기 (status 하나) ③ 중복 피하기 (계산되면 X) ④ 깊은 중첩 피하기 ⑤ props 복사 X\n컴포넌트 간 State 공유하기                끌어올리기 3단계 · 제어 (props 가 정함) vs 비제어 (자기 state)\nState 를 보존하고 초기화하기               state 는 트리의 자리에 묶인다 · 같은 자리 같은 타입 → 보존 · 다르면 초기화 · key 로 강제 초기화\nState 로직을 Reducer 로 작성하기          set 여럿 → dispatch({ type }) · reducer(state, action) → 다음 state · 순수 · action 은 상호작용 하나\nContext 를 사용해 데이터를 깊게 전달하기    createContext → <Ctx value> → useContext · 먼저 props·children 을 고려 · 쓰는 곳: 테마·사용자·라우팅\nReducer 와 Context 로 앱 확장하기         state 와 dispatch 를 두 context 로 · 커스텀 훅 useTasks / useTasksDispatch",
        codeLang: "text",
        terms: [
          {
            term: "선언형 UI (declarative UI)",
            body: "'버튼을 비활성화하고 스피너를 보이고…'처럼 단계를 명령하는 대신, 화면이 가질 수 있는 상태(empty, typing, submitting, success, error)를 전부 적고 '지금은 이 상태다'만 말하는 방식입니다. 각 상태에서 화면이 어떻게 생겼는지는 JSX가 조건으로 적습니다. 상태가 바뀌면 React가 그 사이를 알아서 바꿉니다. 택시 기사에게 길을 하나씩 말하는 대신 목적지를 말하는 것에 비유합니다.",
          },
          {
            term: "제어 컴포넌트 (controlled)와 비제어 컴포넌트 (uncontrolled)",
            body: "제어 컴포넌트는 중요한 값을 부모가 props로 정해 주는 것입니다. 부모가 state를 들고 자식은 보이기만 합니다. 비제어는 자식이 자기 state를 갖는 것입니다. 끌어올리기는 비제어를 제어로 바꾸는 일입니다. DOM input도 같습니다. value prop을 주면 제어, defaultValue만 주면 비제어입니다. 실제로 돌려 보면 value만 주고 onChange가 없으면 '읽기 전용이 된다'는 경고가 났습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 자리가 정체다",
        body: "React 19.3.1, Chrome 156입니다. 같은 자리의 다른 분기부터입니다. fancy ? <Counter label=\"fancy\" /> : <Counter label=\"plain\" />에서 plain인 채로 state를 5로 올리고 fancy로 바꿨습니다. 화면은 'fancy:5'입니다. 분기가 달라도 '같은 자리의 같은 타입'이라 React는 같은 컴포넌트로 보고 state를 남겼습니다. 그다음 key입니다. <Input key={k} />에서 입력값을 '사용자가 친 값'으로 바꾼 뒤 k를 'a'에서 'b'로 바꿨습니다. 입력값이 '처음'(초깃값)으로 돌아갔습니다. key가 다르면 다른 컴포넌트라 전 것을 버리고 새로 만듭니다. 제어 컴포넌트 경고도 확인했습니다. <input value=\"x\" />처럼 onChange 없이 value만 주면 'You provided a value prop to a form field without an onChange handler. This will render a read-only field. If the field should be mutable use defaultValue. Otherwise, set either onChange or readOnly.'입니다. Context는 Provider 값이 바뀔 때 useContext를 쓴 Consumer만 다시 렌더됐고(3번), 사이의 memo 형제는 1번이었습니다.",
        code: "// 같은 자리, 다른 분기 → state 보존\nfancy ? <Counter label=\"fancy\" /> : <Counter label=\"plain\" />\n// plain 에서 state 5 → fancy 로 토글 → 화면 'fancy:5'      ← 같은 자리의 같은 타입이라 같은 컴포넌트\n\n// key 가 바뀌면 → 초기화\n<Input key={k} />   // 입력값 '사용자가 친 값' → k 'a'→'b' → '처음'\n\n// 제어 컴포넌트 경고 (onChange 없는 value)\n<input value=\"x\" />\n// You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.\n// If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.\n\n// Context: 값이 바뀌면 읽는 쪽만\n<Ctx value={v}><Consumer /><MemoSibling /></Ctx>   // v 두 번 변경 → Consumer 렌더 3, MemoSibling 1",
      },
      {
        label: "구조 선택의 다섯 원칙",
        body: "첫째, 늘 함께 바뀌는 둘은 하나로 묶습니다. x와 y를 따로 두면 하나만 바꾸는 실수가 생기니 { x, y }입니다. 둘째, 모순을 피합니다. isSending과 isSent 둘을 두면 둘 다 true인 '불가능한 상태'가 생길 수 있습니다. status: 'typing' | 'sending' | 'sent' 하나로 두면 모순이 없습니다. 셋째, 중복을 피합니다. items와 selectedItem을 둘 다 두면 items가 바뀔 때 selectedItem이 옛 객체로 남습니다. selectedId만 두고 selectedItem은 렌더 중에 items.find로 계산합니다. 넷째, 깊은 중첩을 피합니다. 트리 모양 데이터를 그대로 두면 안쪽을 바꿀 때 겹겹이 복사해야 합니다. id → 항목의 평평한 표로 정규화하고 자식은 childIds로 둡니다. 다섯째, props를 state에 복사하지 않습니다. useState(props.color)는 처음만 보고 그 뒤 props 변화를 무시합니다. 그냥 props를 쓰거나, 정말 초깃값이면 initialColor로 이름을 바꿉니다. 다섯 원칙이 전부 '어긋날 수 있는 두 사실'을 하나로 줄이는 것입니다. 하나만 있으면 어긋날 수 없습니다.",
        code: "① 묶기        const [x, setX] = …; const [y, setY] = …;      →  const [pos, setPos] = useState({ x: 0, y: 0 })\n② 모순 X      isSending, isSent (둘 다 true 가능)              →  status: 'typing' | 'sending' | 'sent'\n③ 중복 X      items, selectedItem (items 바뀌면 옛 객체)        →  items, selectedId;  const selectedItem = items.find(i => i.id === selectedId)\n④ 깊은 중첩 X   { places: [{ childPlaces: [{ … }] }] }           →  { 0: { title, childIds: [1, 2] }, 1: { … } }  (정규화)\n⑤ props 복사 X  useState(props.color)                           →  props.color 를 그냥 쓴다  /  초깃값이면 initialColor\n\n전부 한 생각:  어긋날 수 있는 두 사실을 하나로 줄인다 — 하나면 어긋날 수 없다",
        codeLang: "text",
        terms: [
          {
            term: "정규화 (normalization)",
            body: "트리처럼 중첩된 데이터를 'id → 항목'의 평평한 표로 펴고, 관계는 id 목록(childIds)으로 적는 것입니다. 데이터베이스가 표를 나누는 것과 같습니다. 깊은 곳의 항목 하나를 바꿀 때 겹겹이 복사하지 않고 그 id의 항목만 새것으로 바꾸면 됩니다. 문서의 '여행 계획' 예제가 이것입니다.",
          },
        ],
      },
      {
        label: "자리, 끌어올리기, reducer, context",
        body: "React는 state를 컴포넌트 함수가 아니라 '렌더 트리의 자리'에 묶어 둡니다. 같은 자리에 같은 타입이 계속 렌더되면 state가 남고, 다른 타입이 오거나 그 자리가 사라지면 state도 사라집니다. 그래서 조건으로 두 <Counter />를 갈아 끼워도 state가 남고(위 측정), 다른 state를 원하면 자리를 다르게 하거나 key를 다르게 줍니다. key는 리스트만의 것이 아닙니다. 폼을 사용자별로 초기화하려면 <Form key={userId} />입니다. 끌어올리기는 둘이 같이 바뀌어야 할 때 state를 공통 부모로 옮기고 props로 내려주는 것입니다(제어 컴포넌트). reducer는 핸들러들이 set을 각자 부르던 것을 dispatch({ type: 'added', text })로 바꾸고, 한 함수 reducer(state, action)가 action 종류마다 다음 state를 돌려주는 것입니다. 갱신 로직이 한곳에 모여 읽기와 테스트가 쉽고, 순수해야 하며, 각 action은 '사용자가 한 일 하나'입니다. context는 트리 아래 어디서나 읽는 값입니다. 중간 컴포넌트들이 props를 그냥 넘겨 주기만 하는 드릴링을 없앱니다. 값이 바뀌면 그것을 읽는 컴포넌트만 다시 렌더됩니다(위 측정: Consumer 3, memo 형제 1). 문서는 쓰기 전에 props 전달과 children 전달을 먼저 고려하라고 하고, 테마·현재 사용자·라우팅·전역 state 관리를 좋은 용도로 듭니다. 마지막 편이 reducer의 state와 dispatch를 각각 context로 내려 커스텀 훅(useTasks, useTasksDispatch)으로 읽게 하는 패턴입니다.",
        code: "// 자리 = 정체\n{isFancy ? <Counter /> : <Counter />}        // 같은 자리 → state 보존\n{isFancy && <Counter />}{!isFancy && <Counter />}   // 다른 자리 → 초기화\n<Form key={userId} />                        // key 로 강제 초기화 (리스트 밖에서도)\n\n// reducer: set 여럿 → action 하나\nfunction tasksReducer(tasks, action) {\n  switch (action.type) {\n    case 'added':   return [...tasks, { id: action.id, text: action.text, done: false }];\n    case 'changed': return tasks.map(t => t.id === action.task.id ? action.task : t);\n    case 'deleted': return tasks.filter(t => t.id !== action.id);\n    default: throw Error('Unknown action: ' + action.type);\n  }\n}\nconst [tasks, dispatch] = useReducer(tasksReducer, initialTasks);\ndispatch({ type: 'added', id: nextId++, text });\n\n// context: 깊이 내려주기\nconst TasksContext = createContext(null);\nconst TasksDispatchContext = createContext(null);\n<TasksContext value={tasks}><TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext></TasksContext>\nexport function useTasks() { return useContext(TasksContext); }\nexport function useTasksDispatch() { return useContext(TasksDispatchContext); }",
        terms: [
          {
            term: "reducer와 action",
            body: "action은 '무슨 일이 일어났나'를 적은 객체({ type: 'added', text })이고, reducer는 (현재 state, action) → 다음 state인 순수 함수입니다. 핸들러는 set 대신 dispatch(action)만 부르고, 갱신 로직은 reducer 한곳에 모입니다. 배열의 reduce처럼 'action들을 차례로 적용해 state를 만든다'는 뜻입니다. 순수해야 하고, 한 action은 사용자 상호작용 하나(필드 다섯을 리셋하면 'reset_form' 하나)입니다.",
          },
          {
            term: "context와 props 드릴링",
            body: "props 드릴링은 깊은 자식이 쓰는 값을 중간 컴포넌트들이 그냥 받아 넘기기만 하는 것입니다. context는 부모가 <Ctx value>로 값을 두면 아래 어디서나 useContext(Ctx)로 읽는 장치입니다. 가장 가까운 Provider의 값을 받고, 없으면 createContext의 기본값입니다. 값이 바뀌면 읽는 컴포넌트만 다시 렌더됩니다. React 19에서는 <Ctx.Provider> 대신 <Ctx>를 바로 씁니다.",
          },
        ],
      },
      {
        label: "문제: 사용자를 바꿨는데 전 사용자의 입력값이 폼에 남아 있다",
        body: "<ProfileForm user={currentUser} />가 안에서 const [name, setName] = useState(user.name)으로 입력값을 들고 있습니다. 목록에서 다른 사용자를 고르면 user prop은 바뀌는데 입력창은 전 사용자의 이름입니다. 두 규칙이 겹쳤습니다. props를 state에 복사했고(구조 선택 ⑤, 처음만 봅니다), 같은 자리의 같은 컴포넌트라 React가 state를 보존했습니다(보존과 초기화). 실제로 돌려 보면 같은 자리의 분기 전환에서 state 5가 남았습니다. 처방은 둘 중 하나입니다. <ProfileForm key={user.id} user={user} />로 사용자마다 다른 컴포넌트로 만들어 초기화하거나(실제로 돌려 보면 key를 바꾸자 '처음'으로), 입력값 state를 부모로 끌어올려 사용자 전환 때 부모가 함께 바꾸는 것입니다. Effect로 props가 바뀔 때 setName(user.name)을 하는 것은 한 렌더 늦고 문서가 '필요 없는 Effect'로 꼽습니다.",
      },
      {
        label: "문제가 나는 경우: 구조와 자리를 모를 때",
        body: "경우 ㄱ, props 복사 + 자리 보존입니다. 위의 사고입니다. 경우 ㄴ, 모순 state입니다. isLoading과 isError가 둘 다 true인 순간이 생겨 두 UI가 겹칩니다. status 하나로. 경우 ㄷ, 중복 state입니다. selectedItem이 items 갱신 뒤 옛 객체입니다. id만 두고 계산. 경우 ㄹ, 계산되는 값을 state로 두고 Effect로 맞춥니다. fullName을 state로 두고 first·last가 바뀌면 Effect에서 set. 한 렌더 늦고 불필요합니다. 렌더 중 계산. 경우 ㅁ, 같은 자리 다른 데이터인데 초기화를 기대합니다. 채팅방을 바꿨는데 입력 중이던 글이 남습니다. key={roomId}. 경우 ㅂ, 반대로 초기화되면 안 되는데 자리가 바뀝니다. 조건에 따라 <A />를 <div> 안과 밖에 번갈아 두면 트리 자리가 달라 state가 사라집니다. 경우 ㅅ, 컴포넌트 정의를 중첩해 매 렌더 다른 타입이 됩니다(UI 표현하기). 경우 ㅇ, context 값에 매 렌더 새 객체를 넣습니다. value={{ user, setUser }}는 Provider가 렌더될 때마다 새 객체라 모든 소비자가 다시 렌더됩니다. useMemo로 고정하거나 둘을 나눕니다. 경우 ㅈ, context를 '전역 변수'로 남용합니다. 자주 바뀌는 값(마우스 좌표)을 context에 두면 읽는 전부가 매번 렌더. 경우 ㅊ, reducer가 순수하지 않습니다. 안에서 fetch나 setTimeout을 하면 StrictMode에서 두 번 돌고 테스트가 안 됩니다. 사이드 이펙트는 핸들러에. 경우 ㅋ, action을 'set처럼' 씁니다. { type: 'set_field', field, value }만 있으면 reducer를 쓸 이유가 없습니다. action은 사용자가 한 일(reset_form, submitted)입니다.",
        code: "경우               언제 생기나                            겉모습                                    들통나는 때\nㄱ props 복사+보존    useState(props.x) + 같은 자리             전 사용자의 값이 남음                        항목을 바꿀 때\nㄴ 모순 state        isLoading, isError 둘                   둘 다 true → 두 UI 겹침                    에러 직후\nㄷ 중복 state        items, selectedItem                     옛 객체                                    목록 갱신 뒤\nㄹ 계산 값 + Effect   fullName state + Effect                 한 렌더 늦음 · 불필요한 렌더                  타이핑할 때\nㅁ 초기화 기대       채팅방 바꿈, 입력 남음                    전 방의 글이 보임                          방 전환\nㅂ 자리 바뀜         조건에 따라 <div> 안/밖                   state 사라짐                               조건 바뀔 때\nㅅ 정의 중첩         부모 안 function Child                   매 렌더 초기화                              글자 칠 때\nㅇ context 새 객체    value={{ a, b }}                        전 소비자 매번 렌더                          Provider 렌더마다\nㅈ context 남용      마우스 좌표를 context 에                  읽는 전부가 60/초 렌더                       성능\nㅊ reducer 비순수     reducer 안 fetch                        StrictMode 두 번 · 테스트 불가                개발 모드\nㅋ action = set      { type: 'set_field' } 만                 reducer 의 이점 없음                        리뷰\n\n// ㅇ 의 처방\nconst value = useMemo(() => ({ user, setUser }), [user]);   <Ctx value={value}>",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 사실 하나에 자리 하나, 그리고 그 자리는 트리다",
        body: "이 그룹의 다섯 원칙과 끌어올리기와 reducer·context는 전부 한 질문입니다. '이 사실은 어디에 한 번만 적혀 있나.' 같은 사실이 두 곳에 적히면(중복, 모순, props 복사, 계산 값 state) 둘이 어긋날 길이 생기고 그 길을 Effect로 메우려다 한 렌더 늦어집니다(ㄴ, ㄷ, ㄹ, ㄱ의 반). 둘이 같은 사실을 봐야 하면 그 사실을 한 곳(공통 부모, reducer, context)에 두고 둘이 거기서 읽습니다. 그런데 React가 state를 두는 '곳'은 변수 이름이 아니라 트리의 자리입니다. 같은 자리면 같은 state(ㄱ의 반, ㅁ), 자리가 바뀌면 다른 state(ㅂ, ㅅ), key는 자리에 붙이는 이름표입니다. 그래서 설계는 두 축입니다. 사실을 한 번만 적기(구조), 그 한 번이 트리의 어느 자리인지 정하기(공유·보존). context는 '그 자리에서 아래 전부가 읽는다'이고, 자주 바뀌는 값을 거기 두면 아래 전부가 흔들립니다(ㅇ, ㅈ).",
        code: "축 ①  사실은 한 번만 적는다 (구조 선택)\n   두 번 적힌 사실 → 어긋날 길 → Effect 로 메움 → 한 렌더 늦음        ㄴ ㄷ ㄹ ㄱ\n   처방: 묶기 · status 하나 · id 만 두고 계산 · 정규화 · props 그대로\n\n축 ②  그 한 번은 트리의 어느 자리인가 (공유 · 보존)\n   자리 = 정체:  같은 자리 → 보존 (ㅁ)   자리 바뀜 → 초기화 (ㅂ ㅅ)   key = 자리의 이름표\n   둘이 봐야 하면 → 공통 부모 (끌어올리기) · 갱신이 복잡하면 → reducer · 깊으면 → context (아래 전부가 읽는다 — 자주 바뀌면 ㅇ ㅈ)\n\n한 질문:  이 사실은 어디에 한 번만 적혀 있나?",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "state의 설계까지 봤습니다. 그런데 React 안에서 풀 수 없는 것이 남습니다. 포커스를 주려면 DOM 노드가 필요하고, 서버와 통신하려면 fetch가 필요하고, 타이머와 서드파티 위젯은 React가 모릅니다. 다음 그룹 '탈출구'는 그 바깥과 만나는 두 문입니다. 렌더에 안 쓰는 값을 두는 ref, 렌더 뒤 바깥과 동기화하는 Effect. 그리고 가장 긴 페이지 'Effect가 필요하지 않은 경우'가 있습니다. 실제로 돌려 보면 ref 변경은 렌더를 일으키지 않았고 Effect는 커밋 뒤 페인트 뒤에 돌았습니다.",
      },
      {
        label: "확인 질문",
        body: "탭 UI가 있습니다. {tab === 'a' ? <Panel id=\"a\" /> : <Panel id=\"b\" />}로 그리고, Panel 안에 스크롤 위치 state가 있습니다. (1) 탭을 바꾸면 스크롤 state는 어떻게 될까요? (2) 탭마다 따로 기억하게 하려면? (3) 반대로 탭을 바꿔도 공통으로 하나만 쓰려면 지금 코드로 충분할까요?",
        notes: [
          {
            title: "답",
            body: "(1) 남습니다. 같은 자리의 같은 타입(Panel)이라 React는 같은 컴포넌트로 보고 state를 보존합니다. id prop만 바뀐 리렌더입니다. 실제로 돌려 보면 같은 자리의 분기 전환에서 state 5가 남았습니다. 탭 b가 탭 a의 스크롤 위치로 열립니다. (2) <Panel key={tab} id={tab} />입니다. key가 다르면 다른 컴포넌트라 전 것을 버리고 새로 만들어 초기화됩니다. 실제로 돌려 보면 key를 바꾸자 '처음'으로 돌아갔습니다. 다만 '따로 기억'은 아닙니다. 초기화입니다. 탭마다 위치를 기억하려면 부모에 { a: 0, b: 0 } 같은 state를 끌어올려 props로 내려줍니다. (3) 충분합니다. 보존이 기본 동작입니다. 단, 그것이 의도라는 것을 코드만 보고는 알기 어려워 주석이 필요합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "State 관리하기", href: `${KO}/learn/managing-state` },
      { label: "State 구조 선택하기", href: `${KO}/learn/choosing-the-state-structure` },
      { label: "State를 보존하고 초기화하기", href: `${KO}/learn/preserving-and-resetting-state` },
      { label: "State 로직을 Reducer로 작성하기", href: `${KO}/learn/extracting-state-logic-into-a-reducer` },
      { label: "Context를 사용해 데이터를 깊게 전달하기", href: `${KO}/learn/passing-data-deeply-with-context` },
    ],
  },

  {
    id: "rl-escape",
    name: "탈출구",
    tagline: "React 바깥과 만나는 두 문: 렌더에 안 쓰는 값은 ref, 렌더 뒤 동기화는 Effect — 그리고 그 둘이 필요 없는 때",
    intro:
      "여덟 편입니다. Ref로 값 참조하기, Ref로 DOM 조작하기, Effect로 동기화하기, Effect가 필요하지 않은 경우, React Effect의 생명주기, Effect에서 이벤트 분리하기, Effect의 의존성 제거하기, 커스텀 Hook으로 로직 재사용하기. 지금까지의 모든 것은 React 안이었습니다. props와 state로 JSX를 계산하면 React가 DOM을 맞춥니다. 그런데 바깥이 있습니다. 포커스·스크롤·측정은 DOM 노드가 필요하고, 서버·타이머·서드파티 위젯·브라우저 API는 React가 모릅니다. ref는 렌더에 쓰이지 않는 값을 렌더 사이에 들고 다니는 상자이고(바꿔도 렌더 없음), Effect는 커밋 뒤에 돌아 바깥 시스템을 지금 props·state에 맞추는(동기화) 코드입니다. 둘은 탈출구입니다. 문서는 '필요하지 않은 경우' 페이지를 가장 길게 적었습니다. 실제로 돌려 보면 ref 변경은 렌더를 일으키지 않았고, Effect는 커밋 뒤 페인트 뒤에, 자식 먼저, 정리는 먼저 돌았습니다. 이 그룹의 질문은 하나입니다. 이것은 정말 바깥인가.",
    blocks: [
      {
        label: "무엇을 다루나: 여덟 편",
        body: "Ref로 값 참조하기는 useRef(초깃값)이 { current }를 돌려주고, 바꿔도 렌더가 안 나고, 렌더 사이에 남는다는 것입니다. 타이머 ID, DOM 노드, JSX 계산에 안 쓰는 값에 씁니다. 렌더 중에 읽거나 쓰지 않는 것이 규칙입니다. Ref로 DOM 조작하기는 <div ref={myRef}>로 노드를 받아 focus·scrollIntoView·측정을 하는 것, 리스트에는 ref 콜백이나 Map, 자식 컴포넌트에는 ref를 props로 넘기기(React 19는 forwardRef 없이 ref prop), useImperativeHandle로 노출 범위 제한, flushSync로 커밋 직후 읽기, 그리고 React가 관리하는 DOM을 직접 바꾸지 말라는 것입니다. Effect로 동기화하기는 Effect가 렌더의 결과로 '바깥을 맞추는' 코드이고(이벤트가 아니라), 커밋 뒤에 돌고, 의존성 배열이 '언제 다시 돌지'를 정하고, 정리 함수가 '다음 Effect 전과 언마운트 때' 돈다는 것, StrictMode가 마운트 때 한 번 더 돌려 정리를 검사한다는 것, 그리고 흔한 패턴(구독, 애니메이션, 모달, fetch의 경쟁 조건은 ignore 플래그)입니다. 필요하지 않은 경우는 열 가지입니다. 파생 값, 비싼 계산(useMemo), props 변경 시 state 초기화(key), props 변경 시 일부 state 조정(렌더 중 set), 이벤트 핸들러 공유(핸들러에), POST(핸들러에), 연쇄 Effect, 앱 초기화(모듈 수준), 부모에게 알리기(핸들러에서), 외부 스토어 구독(useSyncExternalStore), 데이터 가져오기(가능하되 경쟁 조건·프레임워크 권장). 생명주기는 'Effect는 동기화를 시작하고 멈추는 것뿐'이고 의존성이 바뀌면 멈추고 다시 시작하며, 린터가 의존성을 검사한다는 것입니다. 이벤트 분리는 Effect 안의 '반응하지 않아야 하는 값'을 useEffectEvent로 빼는 것입니다. 의존성 제거는 의존성을 '선택'하는 것이 아니라 코드를 바꿔 의존성이 줄게 하는 법(객체·함수 의존성을 안으로, 원시값으로, 함수형 갱신)입니다. 커스텀 Hook은 use로 시작하는 함수로 Effect 로직을 묶되 state는 공유하지 않는다는 것입니다.",
        code: "글                               한 줄\nRef 로 값 참조하기                  useRef → { current } · 바꿔도 렌더 X · 렌더 사이 유지 · 렌더 중 읽기·쓰기 X · 타이머 ID · DOM\nRef 로 DOM 조작하기                 <div ref> · focus · scrollIntoView · 측정 · 리스트는 콜백 ref · 자식엔 ref prop (19) · useImperativeHandle · flushSync · React 의 DOM 직접 변경 X\nEffect 로 동기화하기                커밋 뒤 · 의존성 = 언제 다시 · 정리 = 다음 전·언마운트 · StrictMode 한 번 더 · 경쟁 조건은 ignore\nEffect 가 필요하지 않은 경우         파생 값 · useMemo · key 로 초기화 · 렌더 중 set · 핸들러에 · POST · 연쇄 · 앱 초기화 · 부모 알림 · useSyncExternalStore · fetch 는 가능\nReact Effect 의 생명주기             시작 → 멈춤 → 시작 … · 의존성이 바뀌면 · 린터가 검사 · 컴포넌트 생명주기와 다르다\nEffect 에서 이벤트 분리하기          반응하면 안 되는 값 → useEffectEvent · 의존성에서 빠진다\nEffect 의 의존성 제거하기            의존성은 선택이 아니다 · 코드를 바꿔 줄인다 · 객체·함수는 안으로 · 원시값으로 · 함수형 갱신\n커스텀 Hook 으로 로직 재사용하기      use* 함수 · 로직 공유, state 는 따로 · 구체적인 이름 · Effect 를 감싼다",
        codeLang: "text",
        terms: [
          {
            term: "ref (useRef)",
            body: "렌더 사이에 남지만 바꿔도 렌더를 일으키지 않는 상자입니다. useRef(0)이 { current: 0 }을 돌려주고 current를 마음껏 바꿉니다. state와 달리 React가 모르는 값입니다. 그래서 화면에 보이지 않는 것(타이머 ID, DOM 노드, 이전 값)에 씁니다. 렌더 중에 읽거나 쓰면 순수성이 깨지니 핸들러와 Effect에서만 다룹니다. 실제로 돌려 보면 ref.current를 두 번 바꿔도 렌더가 없었고, 다음 렌더에서 그 값이 보였습니다.",
          },
          {
            term: "Effect (useEffect)",
            body: "렌더가 끝나고 커밋된 뒤에 도는 코드입니다. '이 렌더의 결과로 바깥(DOM 밖의 것, 네트워크, 타이머, 서드파티)을 지금 props·state에 맞춰라'는 뜻입니다. 의존성 배열의 값이 바뀔 때마다 다시 돌고, 그 전에 정리 함수가 돕니다. 이벤트 핸들러가 '사용자가 한 일에 반응'이라면 Effect는 '렌더 결과에 반응'입니다. 그 둘을 헷갈리는 것이 가장 흔한 사고입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: ref 는 렌더를 안 일으키고, Effect 는 커밋 뒤에 돈다",
        body: "React 19.3.1, Chrome 156입니다. ref.current를 두 번 바꿨습니다. 렌더가 없었고 로그만 찍혔습니다. 그 뒤 state를 바꿔 렌더하니 ref=2가 보였습니다. ref 콜백은 DOM이 붙을 때 노드와 함께, 떨어질 때 null과 함께 불렸고, 리렌더 때 '떼어짐 → 붙음'이 한 번씩 났습니다(인라인 콜백이라 매 렌더 새 함수). 효과 순서는 이렇습니다. 부모 렌더 → 자식 렌더 → 자식 layout → 부모 layout → (flushSync 반환 = 커밋 끝) → 자식 effect → 부모 effect. 자식이 먼저이고 layout이 effect보다 먼저입니다. 리렌더에서는 자식 layout 정리 → 자식 layout → 부모 layout → 자식 effect 정리 → 자식 effect → 부모 effect입니다. 정리가 새 효과보다 먼저입니다. 언마운트에서는 layout 정리 → effect 정리입니다. StrictMode는 마운트 때 효과를 한 번 더 돌려(effects 2, cleanups 1) 정리가 제대로 되는지 검사합니다. useLayoutEffect에서 DOM을 측정하고 바꾸니 사용자가 본 첫 프레임이 이미 바뀐 200px이었습니다. 페인트 전입니다. useEffect는 페인트 뒤라 그 안에서 바꾸면 한 프레임 깜빡입니다.",
        code: "// ref — 렌더 없음\nrender n=0 ref=0  →  ref 콜백: 붙음 DIV\nref.current=1 (렌더 없음) · ref.current=2 (렌더 없음)\nrender n=1 ref=2  →  ref 콜백: 떼어짐 → 붙음 DIV            (인라인 콜백은 매 렌더 새 함수라 떼고 붙는다)\n\n// Effect 순서\n마운트:   Parent render → Child render → Child layout → Parent layout │ 커밋 끝 │ Child effect → Parent effect\n리렌더:   … → Child layout cleanup → Child layout → Parent layout │ Child effect cleanup → Child effect → Parent effect\n언마운트:  Child layout cleanup → Child effect cleanup\nStrictMode 마운트:  renders 2 · effects 2 · cleanups 1     (한 번 더 돌려 정리를 검사)\n\n// layout vs effect 와 페인트\nuseLayoutEffect: DOM 측정 가능 ('DOM 있음'), 폭을 200px 로 바꿈 → 사용자가 본 첫 프레임 200px   (100px 은 한 프레임도 안 보임)\nuseEffect:       getComputedStyle → '200px'  (페인트 뒤에 돈다 — 여기서 바꾸면 깜빡인다)",
      },
      {
        label: "Effect 가 필요하지 않은 열 가지",
        body: "문서가 가장 길게 적은 페이지입니다. 핵심 규칙은 둘입니다. 렌더링을 위해 데이터를 변환하는 데 Effect는 필요 없습니다. 렌더 중에 계산하면 됩니다. 사용자 이벤트를 처리하는 데 Effect는 필요 없습니다. 핸들러에서 하면 됩니다. 열 가지입니다. 첫째, 파생 값(fullName = first + ' ' + last)은 렌더 중 계산. 둘째, 비싼 계산은 useMemo(또는 컴파일러). 셋째, props가 바뀔 때 state 전체 초기화는 key. 넷째, props가 바뀔 때 일부 state 조정은 Effect 대신 렌더 중 조건부 set(React가 바로 다시 렌더, 자식은 안 그림) 또는 더 좋게는 계산으로. 다섯째, 핸들러 사이 공유 로직은 함수로. 여섯째, POST 요청은 '사용자가 눌렀기 때문'이면 핸들러에, '보였기 때문'이면 Effect에. 일곱째, 연쇄 Effect(a 바뀌면 b set, b 바뀌면 c set)는 핸들러에서 한 번에. 여덟째, 앱 초기화는 모듈 수준이나 '한 번만' 플래그. 아홉째, 부모에게 알리기는 핸들러에서 바로(Effect로 하면 한 렌더 늦음). 열째, 외부 스토어 구독은 useSyncExternalStore. 데이터 가져오기는 Effect로 할 수 있지만 경쟁 조건(ignore 플래그 또는 AbortController), 캐시 없음, 워터폴, 서버 렌더 안 됨이라는 단점이 있어 프레임워크나 React Query를 권합니다.",
        code: "// ✗ Effect 로 파생 상태                                     // ✓ 렌더 중 계산\nconst [fullName, setFullName] = useState('');               const fullName = firstName + ' ' + lastName;\nuseEffect(() => { setFullName(first + ' ' + last); }, [first, last]);\n\n// ✗ props 바뀌면 Effect 로 초기화                            // ✓ key\nuseEffect(() => { setComment(''); }, [userId]);               <Profile userId={userId} key={userId} />\n\n// ✗ Effect 에서 부모에 알리기 (한 렌더 늦음)                    // ✓ 핸들러에서 바로\nuseEffect(() => { onChange(isOn); }, [isOn]);                 function handleClick() { const next = !isOn; setIsOn(next); onChange(next); }\n\n// ✗ 연쇄 Effect                                            // ✓ 핸들러에서 한 번에\nuseEffect(() => { if (card?.gold) setGoldCount(c => c + 1); }, [card]);   function handlePlaceCard(next) { setCard(next); if (next.gold) setGoldCount(c => c + 1); }\n\n// fetch 는 Effect 로 할 수 있지만 — 경쟁 조건\nuseEffect(() => {\n  let ignore = false;\n  fetchResults(query).then(json => { if (!ignore) setResults(json); });   // 늦게 온 옛 응답을 버린다\n  return () => { ignore = true; };\n}, [query]);\n// 단점: 캐시 없음 · 워터폴 · 서버 렌더 X → 프레임워크의 데이터 로더 · React Query",
        terms: [
          {
            term: "경쟁 조건 (race condition)과 ignore 플래그",
            body: "query가 'a' → 'ab'로 빨리 바뀌면 fetch('a')와 fetch('ab')가 둘 다 나가고, 'a'의 응답이 더 늦게 오면 화면이 'a'의 결과로 끝납니다. Effect의 정리 함수에서 let ignore = true를 두어 옛 Effect의 응답을 버리게 하는 것이 문서의 처방입니다. AbortController로 옛 요청을 끊어도 됩니다. 프레임워크의 데이터 로더나 React Query는 이것을 대신 처리합니다.",
          },
          {
            term: "useSyncExternalStore",
            body: "React 밖의 저장소(브라우저 API, 서드파티 스토어)를 구독할 때 Effect + setState 대신 쓰는 훅입니다. subscribe(콜백)과 getSnapshot()을 넘기면 React가 구독하고, 값이 바뀌면 다시 렌더하고, 동시 렌더링에서도 찢어짐 없이 일관된 값을 보장합니다. navigator.onLine, window.innerWidth 같은 것이 전형이고, 서버용 getServerSnapshot을 셋째 인자로 줍니다.",
          },
        ],
      },
      {
        label: "생명주기, 이벤트 분리, 의존성 제거, 커스텀 훅",
        body: "Effect의 생명주기는 컴포넌트의 생명주기(마운트·업데이트·언마운트)와 다릅니다. Effect는 '동기화를 시작한다'와 '멈춘다' 둘뿐이고, 의존성이 바뀔 때마다 멈추고 다시 시작합니다. 그래서 Effect를 하나의 독립된 동기화 과정으로 적습니다. 채팅방 연결 Effect는 roomId에 반응해 roomId마다 연결하고 끊습니다. 의존성 배열은 '내가 고르는 것'이 아니라 Effect 코드가 읽는 반응형 값(props, state, 그것들로 만든 것) 전부입니다. 린터가 그것을 검사합니다. 린터를 끄지 말고 코드를 바꿉니다. 반응하면 안 되는 값(테마 — 방이 바뀔 때만 연결하고 싶은데 테마가 바뀌어도 재연결됨)은 useEffectEvent로 Effect 밖으로 뺍니다. 그 안의 코드는 최신 값을 보되 의존성이 아닙니다. 의존성을 줄이는 법은 코드를 바꾸는 것입니다. 객체·함수를 Effect 안으로 옮기거나, 객체에서 원시값(roomId)만 꺼내 의존하거나, setState(s => …) 함수형 갱신으로 state 의존을 없애거나, 이벤트 핸들러면 Effect를 아예 지웁니다. 커스텀 훅은 use로 시작하는 함수에 Effect 로직을 묶어 여러 컴포넌트가 쓰는 것입니다. 로직은 공유되지만 state는 컴포넌트마다 따로입니다. 이름은 useOnlineStatus처럼 구체적으로, '생명주기' 이름(useMount)은 피합니다. React 19에서 useEffectEvent가 정식 훅입니다.",
        code: "// 하나의 동기화 과정 — roomId 마다 시작·멈춤\nuseEffect(() => {\n  const connection = createConnection(serverUrl, roomId);\n  connection.connect();\n  return () => connection.disconnect();          // 의존성이 바뀌면 먼저 멈추고 다시 시작\n}, [roomId]);                                    // 코드가 읽는 반응형 값 전부 — 선택이 아니다\n\n// 반응하면 안 되는 값은 Effect 이벤트로\nconst onConnected = useEffectEvent(() => { showNotification('연결됨', theme); });   // theme 은 최신을 보되 의존성이 아니다\nuseEffect(() => {\n  const c = createConnection(serverUrl, roomId); c.on('connected', () => onConnected()); c.connect();\n  return () => c.disconnect();\n}, [roomId]);                                    // theme 이 바뀌어도 재연결하지 않는다\n\n// 의존성 제거는 코드를 바꿔서\nuseEffect(() => { const options = { serverUrl, roomId }; … }, [roomId]);     // 객체를 안으로 → 의존성은 원시값만\nuseEffect(() => { setMessages(m => [...m, received]); }, []);                 // 함수형 갱신 → messages 의존 제거\n\n// 커스텀 훅 — 로직 공유, state 는 따로\nfunction useOnlineStatus() {\n  return useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);\n}",
        terms: [
          {
            term: "반응형 값 (reactive value)과 의존성",
            body: "렌더마다 바뀔 수 있는 값입니다. props, state, 그리고 컴포넌트 본문에서 그것들로 만든 변수·함수·객체 전부입니다. Effect가 읽는 반응형 값은 전부 의존성 배열에 있어야 합니다. 그래야 값이 바뀔 때 Effect가 다시 돌아 바깥을 맞춥니다. 모듈 수준 상수나 ref.current는 반응형이 아니라 의존성이 아닙니다. 린터의 exhaustive-deps가 이 목록을 검사합니다.",
          },
          {
            term: "useEffectEvent",
            body: "Effect 안에서 '최신 값을 읽되 그 값이 바뀌어도 Effect를 다시 돌리지 않을' 코드를 떼어 두는 훅입니다. useEffectEvent(() => …)로 만든 함수는 의존성이 아니고 늘 최신 props·state를 봅니다. '방이 바뀔 때만 재연결하되 알림에는 현재 테마를 쓴다'가 전형입니다. Effect 안에서만 부르고 다른 컴포넌트에 넘기지 않습니다. React 19에서 정식입니다.",
          },
        ],
      },
      {
        label: "문제: props 가 바뀌면 Effect 로 state 를 맞추는데 한 박자 늦고, 때로 무한 루프다",
        body: "<Child items={items} />가 안에서 const [selected, setSelected] = useState(items[0])을 들고, items가 바뀌면 useEffect(() => { setSelected(items[0]); }, [items])로 맞춥니다. 부모가 items를 바꾸면 자식이 먼저 '옛 selected'로 한 번 렌더되어 커밋되고, 그 뒤 Effect가 돌아 set하고, 다시 렌더됩니다. 한 프레임 동안 옛 선택이 보이고 렌더가 두 번입니다. 부모가 items를 매 렌더 새 배열로 만들면([...]), 자식의 Effect가 매 렌더 돌아 set → 부모 리렌더 → 새 배열 → Effect … 무한 루프입니다. 실제로 돌려 보면 Effect는 커밋 뒤 페인트 뒤에 돌았습니다. 그래서 '한 박자'입니다. 처방은 Effect를 없애는 것입니다. selected가 items에서 계산되면 렌더 중에 계산하고(const selected = items.find(…) ?? items[0]), 사용자가 고른 id만 state로 둡니다(구조 선택 ③). 정말 items마다 초기화가 필요하면 key입니다.",
      },
      {
        label: "문제가 나는 경우: 바깥이 아닌 것을 바깥처럼 다룰 때",
        body: "경우 ㄱ, Effect로 파생 상태입니다. 위의 사고입니다. 경우 ㄴ, 의존성 린트를 끕니다. 옛 값을 보는 Effect가 '어쩌다' 맞게 돌다 깨집니다. 코드를 바꿔 의존성을 줄입니다. 경우 ㄷ, 정리를 안 합니다. 구독·타이머·연결이 쌓입니다. StrictMode가 마운트에서 한 번 더 돌려 바로 드러냅니다(effects 2, cleanups 1). 경우 ㄹ, fetch 경쟁 조건입니다. 빠르게 바뀐 검색어의 옛 응답이 늦게 와 덮습니다. ignore 플래그. 경우 ㅁ, Effect에서 부모에 알립니다. 한 렌더 늦고 마운트 때도 알립니다. 핸들러에서. 경우 ㅂ, 렌더 중에 ref를 읽거나 씁니다. 순수성 위반이고 컴파일러가 건너뜁니다. 핸들러·Effect에서. 경우 ㅅ, React가 관리하는 DOM을 직접 바꿉니다. ref로 노드를 지우거나 innerHTML을 바꾸면 React의 트리와 어긋나 다음 커밋에서 충돌합니다. React가 바꿀 이유가 없는 부분(포커스·스크롤)만 만집니다. 경우 ㅇ, useEffect에서 레이아웃을 바꿉니다. 페인트 뒤라 한 프레임 깜빡입니다. 측정 뒤 바꾸기는 useLayoutEffect. 실제로 돌려 보면 layout에서 바꾼 것은 첫 프레임부터 반영됐습니다. 경우 ㅈ, 객체·함수 의존성입니다. 매 렌더 새 객체라 Effect가 매번 돕니다. 안으로 옮기거나 원시값으로. 경우 ㅊ, useEffectEvent를 Effect 밖에서 부르거나 넘깁니다. 안에서만. 경우 ㅋ, 커스텀 훅이 state를 공유한다고 믿습니다. 각 호출이 독립입니다. 공유하려면 끌어올리거나 context. 경우 ㅌ, 'useMount' 같은 생명주기 훅을 만듭니다. Effect를 생명주기로 생각하게 해 의존성 누락을 숨깁니다. 경우 ㅍ, 외부 스토어를 Effect + setState로 구독합니다. 동시 렌더링에서 찢어질 수 있습니다. useSyncExternalStore.",
        code: "경우               언제 생기나                            겉모습                                   들통나는 때\nㄱ Effect 파생 상태   props 바뀌면 Effect 로 set              한 박자 늦음 · 렌더 두 번 · 무한 루프          props 가 매 렌더 새 참조일 때\nㄴ 린트 끔          // eslint-disable exhaustive-deps        옛 값 보는 Effect                         의존 값이 바뀔 때\nㄷ 정리 없음         구독·타이머 return 없음                  쌓임. StrictMode 에서 두 배로 드러남           개발 모드 바로\nㄹ 경쟁 조건         빠른 검색어 변경                         옛 응답이 덮음                             느린 망\nㅁ Effect 로 부모 알림  useEffect(() => onChange(v), [v])       한 렌더 늦음 · 마운트에도 알림                첫 렌더\nㅂ 렌더 중 ref       본문에서 ref.current 읽기·쓰기            순수성 위반 · 컴파일러 건너뜀                  StrictMode·컴파일러\nㅅ React 의 DOM 직접   ref.current.remove()                   다음 커밋에서 충돌                          state 바뀔 때\nㅇ useEffect 로 레이아웃  측정 뒤 위치 바꾸기                   한 프레임 깜빡                             툴팁·모달\nㅈ 객체 의존성        [options] (매 렌더 새 객체)               Effect 매번                               리렌더마다 재연결\nㅊ EffectEvent 밖에서   핸들러에서 호출 · props 로 넘김           규칙 위반                                린트\nㅋ 커스텀 훅 공유 기대  두 컴포넌트가 같은 훅                    각자 state                                값이 안 맞을 때\nㅌ useMount          생명주기 훅                              의존성 누락 숨김                           값이 바뀌어도 안 반응\nㅍ 외부 스토어 Effect  Effect + setState 구독                  찢어짐 (동시 렌더링)                        전환 중",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Effect 는 '렌더의 결과를 바깥에 맞추는 것'이고, 바깥이 아니면 쓸 자리가 없다",
        body: "React의 모형은 props·state → (렌더) → JSX → (커밋) → DOM입니다. 이 사슬 안의 것은 전부 계산입니다. Effect는 이 사슬이 끝난 뒤 '사슬 밖의 것'(네트워크 연결, 타이머, 서드파티 위젯, 브라우저 API, React가 안 만든 DOM)을 지금 결과에 맞추는 자리입니다. 사슬 안의 것(파생 값, state 초기화, 부모 알림)을 Effect로 하면 '커밋 뒤'라는 시점 때문에 한 박자 늦고(ㄱ, ㅁ), 렌더가 두 번이고, 참조가 바뀌면 루프입니다(ㅈ). 그래서 문서의 첫 질문이 '이것은 정말 바깥인가'입니다. 바깥이면 Effect를 '동기화 하나'로 적습니다. 시작(연결)과 멈춤(정리)이 짝이고(ㄷ), 의존성은 코드가 읽는 반응형 값 전부이며(ㄴ), 반응하지 않을 값은 Effect 이벤트로 뺍니다(ㅊ). ref는 같은 바깥 중 '값'을 두는 상자이고 렌더 사슬에 끼면 순수성이 깨집니다(ㅂ). 시점이 둘 더 있습니다. 페인트 전(layout, 측정 뒤 바꾸기 ㅇ)과 뒤(effect). 처방은 사슬 안은 계산으로, 사슬 밖만 Effect로, 그리고 Effect는 '한 동기화'로 적는 것입니다.",
        code: "React 의 사슬:   props · state ──렌더──▶ JSX ──커밋──▶ DOM ──페인트──▶ 화면\n                  └─────── 사슬 안 = 계산 ───────┘        │ layout │        │ effect │\n\n사슬 안의 것을 Effect 로:   파생 값 (ㄱ) · 부모 알림 (ㅁ) · state 초기화   → 커밋 뒤라 한 박자 늦음 · 렌더 두 번 · 참조 바뀌면 루프 (ㅈ)\n사슬 밖의 것 = Effect 의 자리:  연결 · 타이머 · 서드파티 · 브라우저 API · React 가 안 만든 DOM\n   한 동기화로:  시작 ↔ 멈춤 (정리 ㄷ) · 의존성 = 읽는 반응형 값 전부 (ㄴ) · 반응하지 않을 값은 useEffectEvent (ㅊ)\n   값만 두려면:  ref — 사슬에 끼면 (렌더 중 읽기·쓰기) 순수성 깨짐 (ㅂ)\n   시점:        페인트 전 → useLayoutEffect (측정 뒤 바꾸기 ㅇ)   페인트 뒤 → useEffect\n\n첫 질문:  이것은 정말 바깥인가?  아니면 → 계산 · 핸들러 · key · useSyncExternalStore",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "배우기 쪽이 끝났습니다. 다음은 참고서(API 참고서) 노드입니다. 같은 것들을 '왜'가 아니라 '정확히 무엇'으로 적습니다. react 패키지의 훅 열아홉·컴포넌트 여섯·API 열둘, react-dom의 클라이언트·서버·정적 API, 컴파일러 설정과 지시어, 개발자 도구, ESLint 규칙 열일곱, React 규칙, 서버 컴포넌트와 지시어, 레거시 API입니다.",
      },
      {
        label: "확인 질문",
        body: "검색 입력에 글자를 치면 (1) 결과 목록을 서버에서 받아 보이고, (2) 결과 수를 부모의 카운터에 알리고, (3) 결과가 비면 입력에 빨간 테두리를 그립니다. 셋 중 Effect가 필요한 것은 무엇이고, 나머지는 어디서 할까요?",
        notes: [
          {
            title: "답",
            body: "(1)만 바깥입니다. 네트워크는 React 사슬 밖이니 Effect(의존성 [query], ignore 플래그로 경쟁 조건 처리)나 더 좋게는 프레임워크의 데이터 로더·React Query입니다. (2)는 Effect로 하면 결과가 바뀐 '뒤'에 알려 한 렌더 늦고 마운트 때도 알립니다. 결과를 받는 그 자리(Effect 안에서 setResults 직후, 또는 데이터 로더의 콜백)에서 onCount(results.length)를 바로 부르거나, 더 좋게는 results 자체를 부모가 들고 자식이 받게 끌어올립니다. (3)은 파생 값입니다. const isEmpty = results.length === 0을 렌더 중에 계산해 className에 넣습니다. Effect도 state도 필요 없습니다. 실제로 돌려 보면 Effect는 커밋·페인트 뒤에 돌아 (3)을 Effect로 하면 테두리가 한 프레임 늦게 그려집니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "탈출구", href: `${KO}/learn/escape-hatches` },
      { label: "Effect로 동기화하기", href: `${KO}/learn/synchronizing-with-effects` },
      { label: "Effect가 필요하지 않은 경우", href: `${KO}/learn/you-might-not-need-an-effect` },
      { label: "React Effect의 생명주기", href: `${KO}/learn/lifecycle-of-reactive-effects` },
      { label: "Effect에서 이벤트 분리하기", href: `${KO}/learn/separating-events-from-effects` },
      { label: "Effect의 의존성 제거하기", href: `${KO}/learn/removing-effect-dependencies` },
      { label: "커스텀 Hook으로 로직 재사용하기", href: `${KO}/learn/reusing-logic-with-custom-hooks` },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 참고서 (Reference)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "ra",
    name: "API 참고서",
    tagline: "이미 아는 것을 정확히 확인하는 쪽",
    intro:
      "배우는 쪽이 '왜'를 다룬다면 이쪽은 '정확히 무엇'을 다룹니다. 인자 하나하나, 돌려주는 값, 그리고 쓰면 안 되는 경우까지. 기억으로 쓰다가 틀리는 것은 대개 문법이 아니라 이런 가장자리 조건이었습니다. 여덟 갈래입니다. react(훅·컴포넌트·API), react-dom(훅·컴포넌트·API·클라이언트·서버·정적), React 컴파일러, 개발자 도구, ESLint 플러그인, React 규칙, 서버 컴포넌트, 레거시 API. 이 노드의 자식 여덟이 그 갈래이고, 각 갈래 아래 노드가 페이지 묶음입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "react(훅·컴포넌트·API), react-dom(훅·컴포넌트·API·클라이언트·서버·정적), React 컴파일러, 개발자 도구, ESLint 플러그인, React 규칙, 서버 컴포넌트 지시어, 레거시 API까지 여덟 갈래입니다. 목록이 이렇게 갈라져 있다는 것 자체가 정보라, 그래프에도 문서 그대로 옮겨 뒀습니다.",
      },
      {
        label: "패키지가 갈라진 이유",
        body: "react는 어디서 돌든 같은 것이고, react-dom은 브라우저의 DOM에 붙는 것입니다. 서버 렌더링과 정적 생성이 react-dom 아래에 다시 나뉘어 있는 것도 같은 선입니다. 이 경계를 알면 'React에서 되는데 Next에서 안 되는' 상황을 어디서부터 의심해야 하는지가 정해집니다.",
      },
      {
        label: "규칙이 레퍼런스에 있는 이유",
        body: "React 규칙은 API가 아니라 약속입니다. 컴포넌트는 순수해야 하고, 훅은 정해진 자리에서만 불러야 한다는 것. 그런데도 레퍼런스에 함께 있는 까닭은, 이걸 어기면 동작이 '틀리게' 되는 게 아니라 '정의되지 않기' 때문입니다. 컴파일러와 ESLint 플러그인이 이 규칙 위에 서 있는 것도 그래서입니다.",
      },
      {
        label: "여덟 갈래의 지도와 실제 패키지",
        body: "문서의 갈래는 실제 npm 패키지의 진입점과 맞습니다. 실제로 돌려 보면 React 19.3.1의 react 패키지는 훅 열아홉(use, useActionState, useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useEffectEvent, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect, useMemo, useOptimistic, useReducer, useRef, useState, useSyncExternalStore, useTransition)과 컴포넌트(Activity, Fragment, Profiler, StrictMode, Suspense, ViewTransition), API(act, addTransitionType, cache, cacheSignal, captureOwnerStack, createContext, lazy, memo, startTransition), 레거시(Children, Component, PureComponent, cloneElement, createElement, createRef, forwardRef, isValidElement)를 내보냅니다. react-dom은 client(createRoot, hydrateRoot), server(renderToString, renderToStaticMarkup, renderToPipeableStream, renderToReadableStream, resume, resumeToPipeableStream), static(prerender, prerenderToNodeStream, resumeAndPrerender, resumeAndPrerenderToNodeStream)으로 갈라집니다. 컴파일러는 별도 패키지(babel-plugin-react-compiler)이고 react/compiler-runtime을 씁니다. ESLint 플러그인은 eslint-plugin-react-hooks입니다.",
        code: "갈래              노드                                패키지 · 진입점 (React 19.3.1 에서 확인)\nreact             훅 · 컴포넌트 · API                   react:  훅 19 · Activity Fragment Profiler StrictMode Suspense ViewTransition · act cache createContext lazy memo startTransition …\nreact-dom         훅 · 컴포넌트 · API · 클라이언트 · 서버 · 정적   react-dom (useFormStatus · createPortal · flushSync · preload …) / client / server / static\nReact 컴파일러      설정 · 지시어                          babel-plugin-react-compiler  +  react/compiler-runtime\n개발자 도구         Performance 트랙                      브라우저 확장 · react-devtools\nESLint 플러그인     린트 17                              eslint-plugin-react-hooks\nReact 규칙         개요 + 3                              (약속 — 패키지 아님)\n서버 컴포넌트       서버 컴포넌트 · 서버 함수 · 지시어        react-server-dom-* (프레임워크가 쓴다) · react/*.react-server\n레거시 API         Children · cloneElement · Component …   react (여전히 내보냄)",
        codeLang: "text",
      },
      {
        label: "참고서를 읽는 법",
        body: "참고서 페이지는 같은 틀입니다. 한 줄 정의 → 레퍼런스(시그니처, 매개변수, 반환값, 주의 사항) → 사용법(예제) → 문제 해결(흔한 오류). '주의 사항(Caveats)'과 '문제 해결(Troubleshooting)'이 가장 값진 절입니다. 배우기 쪽이 '이렇게 쓰라'고 한 것을 참고서는 '이렇게 쓰면 안 된다'로 적어 둡니다. 이 노드의 시트들도 그 둘을 중심으로 적었습니다. 실제로 돌려 본 결과(경고 문구, 순서, 횟수)가 그 '주의 사항'의 측정값입니다.",
      },
    ],
    sources: [
      { label: "React Reference Overview", href: `${DOCS}/reference/react` },
      { label: "Rules of React", href: `${DOCS}/reference/rules` },
    ],
  },

  {
    id: "ra-react",
    name: "React",
    tagline: "어디서 돌든 같은 것: 훅 열아홉, 컴포넌트 여섯, API 열둘",
    intro:
      "참고서의 react 패키지 갈래입니다. 셋으로 나뉩니다. 훅(use로 시작, 컴포넌트 안에서만), 내장 컴포넌트(<Fragment> <Profiler> <StrictMode> <Suspense> <Activity> <ViewTransition>), 그 밖의 API(act, cache, createContext, lazy, memo, startTransition, use…). 이 패키지는 DOM을 모릅니다. 브라우저든 서버든 네이티브든 같은 코드입니다. DOM에 붙는 것은 react-dom입니다. 실제로 돌려 보면 React 19.3.1의 react가 내보내는 훅은 열아홉이었습니다. 이 노드의 자식 셋이 그 셋입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "훅 열아홉은 상태(useState, useReducer), 컨텍스트(useContext), ref(useRef, useImperativeHandle), 효과(useEffect, useLayoutEffect, useInsertionEffect, useEffectEvent), 성능(useMemo, useCallback, useTransition, useDeferredValue), 그 밖(useDebugValue, useId, useSyncExternalStore, useActionState, useOptimistic), 그리고 use입니다. 내장 컴포넌트 여섯은 Fragment(묶기), Profiler(측정), StrictMode(검사), Suspense(기다리기), Activity(숨기되 유지), ViewTransition(전환 애니메이션)입니다. API 열둘은 act(테스트), addTransitionType, cache(서버 컴포넌트에서 캐시), cacheSignal, captureOwnerStack(개발), createContext, lazy(코드 분할), memo(리렌더 건너뛰기), startTransition, use, 그리고 실험적 taint 둘입니다.",
        code: "훅 (19)         상태: useState useReducer · 컨텍스트: useContext · ref: useRef useImperativeHandle\n               효과: useEffect useLayoutEffect useInsertionEffect useEffectEvent · 성능: useMemo useCallback useTransition useDeferredValue\n               그 밖: useDebugValue useId useSyncExternalStore useActionState useOptimistic · use\n컴포넌트 (6)     <Fragment> <Profiler> <StrictMode> <Suspense> <Activity> <ViewTransition>\nAPI (12)        act · addTransitionType · cache · cacheSignal · captureOwnerStack · createContext · lazy · memo · startTransition · use · experimental_taint*",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 이 패키지만으로 되는 것",
        body: "react 패키지만으로 할 수 있는 것을 Node에서 확인했습니다. createElement로 요소 객체를 만들 수 있고({ $$typeof, type, props, key }), createContext의 기본값과 memo·Fragment가 서버 렌더에서도 그대로입니다. 훅은 컴포넌트 밖에서 부르면 'Cannot read properties of null (reading 'useState')'입니다. 렌더 중이 아니면 훅이 매달릴 자리(디스패처)가 없기 때문입니다. 클라이언트에서는 상태 묶음, StrictMode 두 번 렌더, 효과 순서, useTransition으로 입력 우선, useDeferredValue가 한 렌더 뒤처짐, useId가 서버에서 _R_1_ 꼴·클라이언트에서 _r_0_ 꼴, Suspense 드러내기 300ms 묶음을 확인했습니다. 각 자식 노드에 자세히 적었습니다.",
        code: "createElement('div', { id: 'a' }, 'x')   // { $$typeof: Symbol(react.transitional.element), type: 'div', props: {…}, key: null }  (Node 24)\nuseState(0)  (컴포넌트 밖)              // Cannot read properties of null (reading 'useState')   ← 디스패처가 없다\nStrictMode (클라이언트 개발)             // renders 2 · effects 2 · cleanups 1\nuseId                                   // 서버 '_R_1_' '_R_2_'  /  클라이언트 '_r_0_' '_r_1_'   (하이드레이션 때 짝이 맞게 설계)\nuseDeferredValue                        // render q=ab deferred=  →  render q=ab deferred=ab   (한 렌더 뒤처짐)\nSuspense                                // 데이터 60ms 도착, 드러내기 401ms  (약 300ms 묶음)",
      },
      {
        label: "문제의 구조: react 는 '무엇을 그릴지' 만 알고 '어디에' 는 모른다",
        body: "react 패키지가 하는 일은 컴포넌트를 불러 요소 트리를 만들고, 상태와 효과를 스케줄하는 것입니다. 그 결과를 DOM에 넣는 일은 react-dom이, 문자열로 만드는 일은 react-dom/server가, 네이티브 뷰에 넣는 일은 react-native가 합니다. 그래서 react의 API는 전부 '플랫폼 중립'입니다. 훅은 자바스크립트 값만 다루고, Suspense는 '기다린다'만 알고, Fragment는 '묶는다'만 압니다. 이 경계가 사고의 지도입니다. 포커스·스크롤·측정은 react에 없고(ref로 받은 노드를 DOM API로 다룸), 포털·flushSync·preload는 react-dom에 있습니다. 같은 이름의 훅이 서버에서는 다르게 동작하는 것(useEffect 안 돎, useId 다른 모양)도 '어디에'를 모르는 react와 '어디에'를 아는 react-dom의 분업입니다.",
        code: "react            무엇을 그릴지:  컴포넌트 호출 · 요소 트리 · 상태 · 효과 스케줄 · 기다림(Suspense) · 전환(Transition)\n                 ─────────────── 플랫폼 중립 ───────────────\nreact-dom        어디에:  DOM 에 넣기 (client) · 문자열로 (server) · 미리 (static) · 포털 · flushSync · preload\nreact-native     어디에:  네이티브 뷰\n\n사고의 지도:  포커스·스크롤·측정 → react 에 없음 (ref + DOM API)   ·   서버에서 useEffect 안 돎 → react 는 '어디' 를 모른다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 셋으로 들어갑니다. 내장 훅(열아홉을 가족별로), 내장 컴포넌트(여섯이 각각 무엇을 기다리고 묶고 검사하나), React API(cache·lazy·memo·startTransition·use가 어디서 쓰이나).",
      },
    ],
    sources: [
      { label: "React Reference Overview", href: `${DOCS}/reference/react` },
      { label: "Built-in React Hooks", href: `${DOCS}/reference/react/hooks` },
    ],
  },

  {
    id: "ra-react-hooks",
    name: "내장 훅",
    tagline: "열아홉 개를 여섯 가족으로: 상태, 컨텍스트, ref, 효과, 성능, 그 밖",
    intro:
      "참고서의 훅 페이지 열아홉입니다. useActionState, useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useEffectEvent, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect, useMemo, useOptimistic, useReducer, useRef, useState, useSyncExternalStore, useTransition, 그리고 use. 전부 컴포넌트나 커스텀 훅의 최상위에서만 부릅니다. 가족으로 묶으면 여섯입니다. 상태(기억), 컨텍스트(멀리서 읽기), ref(React가 모르는 값), 효과(바깥과 동기화), 성능(건너뛰기와 미루기), 그 밖(폼·ID·외부 스토어). 실제로 돌려 보면 묶음·스냅샷·효과 순서·useTransition·useDeferredValue·useId·훅 순서 경고를 확인했습니다. 이 노드의 질문은 하나입니다. 어느 훅이 어느 문제의 것인가.",
    blocks: [
      {
        label: "무엇이 들어 있나: 여섯 가족",
        body: "상태 가족은 useState(값 하나, set은 묶이고 함수형 갱신 가능, 초깃값 함수는 한 번만)와 useReducer(reducer와 dispatch, 초기화 함수, 갱신 로직을 한곳에)입니다. 컨텍스트는 useContext(가장 가까운 Provider의 값, 없으면 기본값, 값이 바뀌면 리렌더, 같은 컴포넌트 안의 Provider는 안 봄)입니다. ref 가족은 useRef(바꿔도 렌더 없음, 렌더 중 읽기·쓰기 금지, DOM 노드)와 useImperativeHandle(부모에게 노출할 메서드만 정하기)입니다. 효과 가족은 useEffect(커밋·페인트 뒤), useLayoutEffect(커밋 뒤 페인트 전, 측정용, 서버에서 경고), useInsertionEffect(DOM 변경 전, CSS-in-JS 라이브러리용), useEffectEvent(Effect 안의 비반응 로직, 19 정식)입니다. 성능 가족은 useMemo(값 캐시), useCallback(함수 캐시), useTransition(갱신을 긴급하지 않게, isPending, 19에서 async 액션), useDeferredValue(값의 지연된 사본, 초깃값 옵션)입니다. 그 밖은 useId(서버·클라이언트 짝이 맞는 고유 ID, key로 쓰지 말 것), useDebugValue(개발자 도구 라벨), useSyncExternalStore(외부 스토어 구독), useActionState(폼 액션의 결과 state, 19), useOptimistic(낙관적 UI, 19), use(프라미스·컨텍스트를 읽음, 조건 안에서도 됨, 19)입니다.",
        code: "가족        훅                          한 줄\n상태        useState                    [값, set] · set 은 묶임 · set(fn) 함수형 · 초깃값 함수는 마운트에 한 번 · 같은 값이면 건너뜀\n           useReducer                  [state, dispatch] · reducer(state, action) 순수 · 셋째 인자 init 함수\n컨텍스트    useContext                  가장 가까운 <Ctx value> · 없으면 기본값 · 바뀌면 리렌더 (memo 로 못 막음) · 자기 Provider 는 안 봄\nref        useRef                      { current } · 렌더 없음 · 렌더 중 X · DOM 노드 · 초깃값 함수 아님 (매 렌더 평가)\n           useImperativeHandle         ref 로 노출할 것만 { focus, scrollIntoView } · 자식 DOM 전체를 숨김\n효과        useEffect                   커밋 → 페인트 → 돈다 · 정리 · 의존성 · 서버에서 안 돎\n           useLayoutEffect             커밋 → 돈다 → 페인트 · 측정·위치 · 서버 렌더에서 경고 · 성능 주의\n           useInsertionEffect          DOM 변경 전 · CSS-in-JS 가 <style> 넣는 용도 · ref 접근 X\n           useEffectEvent              Effect 안 비반응 로직 · 의존성 아님 · Effect 안에서만 호출\n성능        useMemo                     계산 캐시 · 의존성 · 컴파일러가 대신\n           useCallback                 함수 캐시 = useMemo(() => fn) · memo 자식에 넘길 때\n           useTransition               [isPending, startTransition] · 긴급하지 않은 갱신 · 19: async 액션 지원\n           useDeferredValue            값의 지연 사본 · 먼저 옛 값으로 렌더, 뒤에 새 값 · 19: initialValue\n그 밖       useId                       서버·클라이언트 짝 맞는 ID · aria 연결 · key 로 X\n           useDebugValue               커스텀 훅의 개발자 도구 라벨\n           useSyncExternalStore        subscribe · getSnapshot · getServerSnapshot · 찢어짐 없음\n           useActionState              [state, formAction, isPending] · <form action> 과 · 19\n           useOptimistic               [optimistic, addOptimistic] · 액션 중 낙관적 값 · 19\n           use                         프라미스·컨텍스트를 읽음 · 조건·반복 안에서도 됨 · Suspense 와 · 19",
        codeLang: "text",
        terms: [
          {
            term: "디스패처 (dispatcher)와 '훅은 렌더 중에만'",
            body: "훅 함수들은 전역 함수처럼 보이지만 안에서 '지금 렌더 중인 컴포넌트'를 가리키는 내부 객체(디스패처)를 찾습니다. 렌더 중이 아니면 그것이 null이라 실제로 돌려 보면 'Cannot read properties of null (reading 'useState')'였습니다. 그래서 훅은 컴포넌트·커스텀 훅 안에서, React가 부르는 동안에만 됩니다. 훅 순서로 state를 구분하므로 조건 안에 두면 '순서가 바뀌었다' 경고가 납니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 가족별 한 줄",
        body: "상태: set(1) set(2) set(3)은 렌더 한 번 n=3, 같은 스냅샷 +1 세 번은 +1, 함수형 세 번은 +3, 같은 값 set은 커밋 없음. ref: current를 두 번 바꿔도 렌더 없음, 다음 렌더에서 보임. 효과: 자식 layout → 부모 layout → (커밋 끝) → 자식 effect → 부모 effect, 리렌더에서는 정리 먼저, layout에서 바꾼 폭은 첫 프레임부터 반영. 성능: useMemo·useCallback으로 props를 고정하면 memo 자식 렌더 1번(안 하면 3번), useTransition으로 느린 탭 전환과 입력을 같은 틱에 넣으니 입력 'x'가 먼저 반영되고 탭은 뒤에, useDeferredValue는 render q=ab deferred= 다음에 deferred=ab. 그 밖: useId 둘이 _r_0_, _r_1_(서버는 _R_1_, _R_2_), useContext는 값이 바뀔 때 읽는 컴포넌트만 렌더(3), memo 형제 1. 훅 순서가 바뀌면 'React has detected a change in the order of Hooks called by …'. 컴포넌트 밖 훅은 'Cannot read properties of null'.",
        code: "상태     set ×3 → 1렌더 n=3 · 스냅샷 +1 ×3 → +1 · 함수형 ×3 → +3 · 같은 값 → 커밋 없음\nref      current++ ×2 → 렌더 0 · 다음 렌더 ref=2 · 콜백 ref: 붙음(DIV) / 떼어짐(null)\n효과     Child layout → Parent layout │커밋│ Child effect → Parent effect · 리렌더: cleanup 먼저 · layout 변경은 첫 프레임부터\n성능     memo 자식: 새 props 3렌더 / 고정 1렌더 · useTransition: 입력 'x' 먼저, 탭 'b' 뒤 (isPending true 관찰) · useDeferredValue: 뒤처진 한 렌더\n그 밖    useId: 클라 '_r_0_' / 서버 '_R_1_' · useContext: Consumer 3, memo 형제 1\n경고     순서 변경: 'React has detected a change in the order of Hooks called by %s…' · 밖에서: 'Cannot read properties of null (reading 'useState')'",
        codeLang: "text",
      },
      {
        label: "자주 헷갈리는 짝 넷",
        body: "useState와 useRef. 바뀌면 화면이 바뀌어야 하면 state, 화면과 무관(타이머 ID, 전 값, DOM)이면 ref입니다. ref를 바꿔도 렌더가 안 나는 것이 특징이자 함정입니다. useEffect와 useLayoutEffect. 둘 다 커밋 뒤지만 layout은 페인트 전이라 측정하고 바꿔도 깜빡이지 않습니다. 실제로 돌려 보면 layout에서 바꾼 폭이 첫 프레임부터였습니다. 대신 페인트를 막으니 무거운 일은 안 됩니다. useMemo와 useCallback. useCallback(fn, deps)는 useMemo(() => fn, deps)의 줄임입니다. 값이면 useMemo, 함수면 useCallback. 둘 다 '참조 고정'이 목적이고 컴파일러가 대신합니다. useTransition과 useDeferredValue. 둘 다 '긴급하지 않게'인데, 갱신을 내가 부를 수 있으면(setTab) startTransition으로 감싸고, 값만 받아 쓰는 자리(props로 온 query)면 useDeferredValue로 지연 사본을 만듭니다. 실제로 돌려 보면 transition은 입력을 먼저 반영했고, deferred는 한 렌더 뒤처졌습니다.",
        code: "짝                          기준                                      측정\nuseState vs useRef           화면이 바뀌어야 하나 → state / 아니면 ref        ref 변경: 렌더 0\nuseEffect vs useLayoutEffect  페인트 전에 끝나야 하나 (측정 뒤 변경) → layout    layout 변경: 첫 프레임부터 200px\nuseMemo vs useCallback        값 → useMemo / 함수 → useCallback (= useMemo(() => fn))   고정하면 memo 자식 1렌더\nuseTransition vs useDeferredValue  갱신을 내가 부르나 → startTransition / 값만 받나 → deferred   입력 먼저 · 한 렌더 뒤처짐\n\n// 19 의 새 셋\nconst [state, formAction, isPending] = useActionState(async (prev, formData) => …, initial);   // <form action={formAction}>\nconst [optimisticItems, addOptimistic] = useOptimistic(items, (cur, newItem) => [...cur, newItem]);   // 액션 끝나면 진짜 값으로\nconst data = use(promise);   // 조건 안에서도 됨. 렌더 중 프라미스를 '읽는다' → Suspense 가 기다린다",
        codeLang: "text",
        terms: [
          {
            term: "use",
            body: "React 19의 훅으로, 프라미스나 컨텍스트를 렌더 중에 '읽습니다'. 프라미스가 아직이면 가장 가까운 Suspense가 fallback을 보이고, 끝나면 그 값으로 다시 렌더합니다. 다른 훅과 달리 조건문·반복문 안에서 불러도 됩니다. 서버 컴포넌트에서 만든 프라미스를 클라이언트 컴포넌트가 use로 받는 것이 전형입니다. 렌더 중에 만든 프라미스는 매 렌더 새것이라 캐시(cache, 또는 바깥에서 만들기)가 필요합니다.",
          },
          {
            term: "useTransition과 액션 (Action)",
            body: "startTransition(fn) 안의 상태 갱신은 '긴급하지 않다'고 표시되어 입력 같은 긴급 갱신이 먼저 처리되고, 전환 중에는 isPending이 true입니다. React 19에서 fn이 async면 '액션'이라 부르고, 프라미스가 끝날 때까지 isPending이 유지되며 에러·낙관적 갱신(useOptimistic)·폼(useActionState)과 묶입니다. 실제로 돌려 보면 느린 전환과 입력을 같은 틱에 넣어도 입력이 먼저 반영됐습니다.",
          },
        ],
      },
      {
        label: "문제: useEffect 로 툴팁 위치를 맞추니 한 프레임 깜빡인다",
        body: "툴팁을 열 때 useEffect에서 getBoundingClientRect로 크기를 재고 위치를 state에 넣습니다. 처음 한 프레임은 기본 위치(0, 0)에 그려지고 다음 프레임에 제자리로 튑니다. useEffect는 페인트 뒤에 돌기 때문입니다. 실제로 돌려 보면 effect는 커밋 뒤 페인트 뒤였고, layout effect는 페인트 전이라 그 안에서 바꾼 폭이 첫 프레임부터 반영됐습니다. 처방은 useLayoutEffect입니다. 커밋 직후 페인트 전에 재고 set하면 React가 그 자리에서 동기로 다시 렌더해 사용자는 기본 위치를 보지 못합니다. 문서의 useLayoutEffect 페이지가 바로 이 예제이고, '성능을 해칠 수 있으니 측정이 필요할 때만'이라고 적습니다. 서버 렌더에서는 layout effect가 돌지 않아 경고가 나므로 클라이언트 전용 컴포넌트에서 씁니다.",
      },
      {
        label: "문제가 나는 경우: 가족을 잘못 고를 때",
        body: "경우 ㄱ, useEffect로 레이아웃입니다. 위의 사고입니다. 경우 ㄴ, 조건부 훅입니다. 순서 변경 경고와 뒤바뀐 state. use만 예외입니다. 경우 ㄷ, 컴포넌트 밖 훅입니다. null 디스패처. 경우 ㄹ, useState 초깃값에 비싼 호출입니다. useState(expensive())는 매 렌더 expensive를 부릅니다(결과만 버림). useState(() => expensive())로 함수를 넘깁니다. useRef는 그 옵션이 없어 매 렌더 평가됩니다. 경우 ㅁ, useMemo로 의미(semantic) 보장을 기대합니다. React는 메모리 부족 등에서 캐시를 버릴 수 있습니다. 성능 최적화일 뿐 '한 번만'의 보장이 아닙니다. 한 번만이면 ref나 state. 경우 ㅂ, useCallback을 모든 함수에 붙입니다. memo 자식에 넘기거나 Effect 의존성이 아니면 이득이 없고 코드만 길어집니다. 컴파일러가 대신합니다. 경우 ㅅ, useContext로 자기 Provider를 읽습니다. 같은 컴포넌트가 제공하는 값은 그 위의 Provider를 봅니다. 경우 ㅇ, useId를 key로 씁니다. 리스트 key는 데이터에서 와야 합니다. useId는 aria 연결용입니다. 경우 ㅈ, useLayoutEffect를 서버 컴포넌트에 둡니다. 서버에서 '아무 일도 안 함' 경고입니다. 클라이언트 전용으로. 경우 ㅊ, useTransition 안에서 입력을 바꿉니다. 입력은 긴급해야 합니다. 전환은 느린 쪽(결과 목록)에만. 경우 ㅋ, use에 렌더 중 만든 프라미스를 넘깁니다. 매 렌더 새 프라미스라 영원히 pending입니다. 바깥에서 만들거나 cache. 경우 ㅌ, useSyncExternalStore의 getSnapshot이 매번 새 객체를 돌려줍니다. 무한 렌더입니다. 같은 값이면 같은 참조를 돌려줘야 합니다. 경우 ㅍ, useOptimistic 값을 액션 밖에서 바꿉니다. 액션 안에서만 뜻이 있습니다.",
        code: "경우               언제 생기나                             겉모습                                   들통나는 때\nㄱ Effect 레이아웃    useEffect 에서 측정 뒤 위치 set           한 프레임 깜빡                            툴팁·모달 열 때\nㄴ 조건부 훅         if 안 useX (use 제외)                   순서 변경 경고 · 뒤바뀐 state               조건 바뀔 때\nㄷ 밖에서 훅         이벤트 핸들러·유틸에서 useX                Cannot read properties of null             바로\nㄹ 비싼 초깃값        useState(expensive())                   매 렌더 호출                               성능\nㅁ useMemo 보장 기대   '한 번만' 로 믿음                       캐시가 버려질 수 있음                        드물게\nㅂ useCallback 남발   모든 함수에                              이득 없이 코드 증가                         리뷰\nㅅ 자기 Provider      같은 컴포넌트 안 Provider 값 읽기          위의 값 또는 기본값                         값이 안 맞을 때\nㅇ useId 를 key 로     리스트 key                              순서 바뀌면 틀림 · 서버 불일치               정렬\nㅈ 서버에서 layout    서버 컴포넌트 useLayoutEffect              경고: 서버에서 아무 일도 안 함                SSR 로그\nㅊ 입력을 transition  startTransition 안 setQuery              입력이 늦게 반영                           타이핑\nㅋ 렌더 중 프라미스    use(fetch(...))                          영원히 pending                            Suspense fallback 멈춤\nㅌ getSnapshot 새 객체  useSyncExternalStore 가 {…} 반환           무한 렌더                                바로\nㅍ 낙관값 밖에서       액션 밖 addOptimistic                    의미 없음                                -\n\n// ㄹ 의 처방\nconst [v] = useState(() => expensive());        // 마운트에 한 번",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 훅은 '렌더에 매단 상태·효과' 이고, 가족마다 매다는 시점이 다르다",
        body: "열아홉 훅은 전부 '이 컴포넌트의 이 렌더에 무언가를 매단다'입니다. 매다는 것이 다릅니다. 상태 가족은 '다음 렌더로 가는 값', ref는 '렌더 사이에 남되 렌더와 무관한 값', 효과 가족은 '렌더 뒤에 돌 코드', 성능 가족은 '이 렌더가 전과 같으면 재사용할 것', 컨텍스트는 '위에서 내려오는 값', 그 밖은 특정 바깥(폼, ID, 스토어)과의 접점입니다. 매다는 시점이 가족마다 다르고(ㄱ: layout은 페인트 전, effect는 뒤), 매달 자리가 '호출 순서'라서 순서가 바뀌면 안 되고(ㄴ), 렌더 중이 아니면 매달 곳이 없습니다(ㄷ). 성능 가족은 '재사용할 수 있다'이지 '반드시 한다'가 아니고(ㅁ), 재사용의 기준이 참조 비교라 매번 새 객체는 재사용을 깹니다(ㅌ, ㅋ). 처방은 가족을 먼저 고르는 것입니다. 화면이 바뀌나(상태) / 바깥인가(효과, 어느 시점) / 전과 같으면 되나(성능) / 멀리서 오나(컨텍스트).",
        code: "훅 = 이 렌더에 매단 것          매다는 시점                        사고\n상태 (useState·useReducer)      다음 렌더의 입력                    스냅샷 · 묶음 (상호작용성 그룹)\nref                            렌더 사이, 렌더와 무관                렌더 중 읽기·쓰기 (ㅂ) · 비싼 초깃값 (ㄹ)\n효과 (layout → effect)          커밋 뒤 — layout 은 페인트 전, effect 는 뒤   시점 혼동 (ㄱ ㅈ)\n성능 (useMemo·useCallback·…)    전과 같으면 재사용 (보장 아님)          참조 (ㅌ ㅋ) · 보장 기대 (ㅁ) · 남발 (ㅂ)\n컨텍스트                        위에서 내려오는 값                    자기 Provider (ㅅ)\n매달 자리 = 호출 순서            → 조건부 금지 (ㄴ, use 제외) · 렌더 밖 금지 (ㄷ)\n\n고르는 순서:  화면이 바뀌나? → 바깥인가, 어느 시점? → 전과 같으면 되나? → 멀리서 오나?",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "훅이 '컴포넌트 안에 매다는 것'이라면, 내장 컴포넌트는 '트리에 끼우는 것'입니다. 다음 노드 '내장 컴포넌트'는 Fragment·Profiler·StrictMode·Suspense·Activity·ViewTransition 여섯입니다. 실제로 돌려 보면 StrictMode는 두 번 렌더했고 Suspense는 드러내기를 약 300ms 묶었습니다.",
      },
      {
        label: "확인 질문",
        body: "검색어를 치면 (1) 입력창은 즉시 바뀌고, (2) 결과 목록(3,000개)은 느려도 괜찮고, (3) 결과 수를 aria-live로 읽어 주는 요소와 입력을 id로 연결해야 합니다. 어느 훅들을 어디에 쓸까요?",
        notes: [
          {
            title: "답",
            body: "(1)·(2) 입력은 useState로 즉시, 목록은 그 값의 지연 사본 useDeferredValue(query)로 받아 그립니다. 입력이 먼저 반영되고 목록은 한 렌더 뒤에 따라옵니다. 실제로 돌려 보면 deferred가 한 렌더 뒤처졌습니다. 목록 컴포넌트를 memo로 감싸야 deferred가 같을 때 건너뜁니다. 갱신을 내가 부르는 쪽(탭 전환)이면 useTransition이 맞고, 값만 받아 쓰는 쪽이면 useDeferredValue가 맞습니다. (3) useId로 id를 만들어 input의 aria-describedby와 안내 요소의 id에 같이 넣습니다. 서버 렌더와 클라이언트가 같은 ID를 만들어 하이드레이션이 어긋나지 않습니다. 실제로 돌려 보면 서버는 _R_1_, 클라이언트는 _r_0_ 꼴로 각자 안에서 짝이 맞습니다. 리스트 key로는 쓰지 않습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Built-in React Hooks", href: `${DOCS}/reference/react/hooks` },
      { label: "useState", href: `${DOCS}/reference/react/useState` },
      { label: "useEffect", href: `${DOCS}/reference/react/useEffect` },
      { label: "useLayoutEffect", href: `${DOCS}/reference/react/useLayoutEffect` },
      { label: "useTransition", href: `${DOCS}/reference/react/useTransition` },
      { label: "useDeferredValue", href: `${DOCS}/reference/react/useDeferredValue` },
      { label: "use", href: `${DOCS}/reference/react/use` },
      { label: "useSyncExternalStore", href: `${DOCS}/reference/react/useSyncExternalStore` },
    ],
  },

  {
    id: "ra-react-components",
    name: "내장 컴포넌트",
    tagline: "트리에 끼우는 여섯: 묶기, 재기, 검사하기, 기다리기, 숨기되 두기, 전환하기",
    intro:
      "참고서의 내장 컴포넌트 여섯입니다. <Fragment>(DOM 없이 묶기), <Profiler>(렌더 비용 재기), <StrictMode>(개발 모드 검사), <Suspense>(자식이 준비될 때까지 fallback), <Activity>(숨기되 state 유지), <ViewTransition>(전환 애니메이션). 훅이 컴포넌트 '안에' 매다는 것이라면 이것들은 트리 '사이에' 끼우는 것입니다. 실제로 돌려 보면 StrictMode는 개발 모드에서 렌더·효과를 두 번 불렀고(서버에서는 한 번), Suspense는 데이터가 60ms에 다 왔는데 약 400ms에 드러냈고(fallback 뒤 300ms 묶음), Fragment는 서버 HTML에 아무것도 남기지 않았습니다. 이 노드의 질문은 하나입니다. 여섯이 각각 트리의 어디에서 무엇을 바꾸는가.",
    blocks: [
      {
        label: "무엇이 들어 있나: 여섯",
        body: "<Fragment>는 <>…</>의 긴 꼴이고 key가 필요할 때(리스트의 항목이 요소 둘)만 길게 씁니다. DOM에 아무것도 남기지 않습니다. <Profiler id onRender>는 자식 트리의 렌더 비용을 onRender(id, phase, actualDuration, …)로 받습니다. 운영 빌드에서는 기본으로 꺼져 있고 react-dom/profiling 빌드가 필요합니다. <StrictMode>는 개발 모드에서만 자식에 추가 검사를 합니다. 컴포넌트를 두 번 렌더(순수성), Effect를 한 번 더 돌림(정리 검사), ref 콜백을 한 번 더, 더는 지원 않는 API 사용 경고. 운영에는 영향 없습니다. <Suspense fallback>은 자식 중 하나가 '아직'(lazy 컴포넌트 로딩 중, use(프라미스) pending, Suspense 지원 데이터 소스)이면 fallback을 보이고, 준비되면 자식을 보입니다. 가장 가까운 경계가 받고, 중첩으로 단계적 드러내기, 전환(startTransition) 중에는 이미 보인 내용을 fallback으로 되돌리지 않고 유지, 서버 스트리밍에서는 fallback을 먼저 보내고 나중에 채웁니다. <Activity mode=\"visible\"|\"hidden\">은 자식을 숨기되(display: none, 효과 정리) state를 유지하고, 다시 visible이 되면 복원합니다. 탭 전환에서 상태를 잃지 않게. <ViewTransition>은 자식의 변화를 브라우저의 View Transition API로 애니메이션합니다(enter·exit·update·share). 둘은 React 19.2에서 정식입니다.",
        code: "컴포넌트          트리에서 하는 일                                주의 사항\n<Fragment>        자식 여럿을 DOM 없이 묶는다 · key 가 필요하면 긴 꼴     서버 HTML 에도 흔적 없음 (실제로 '<i>a</i><i>b</i>')\n<Profiler>        자식 렌더 비용을 onRender 로                      운영은 기본 꺼짐 (profiling 빌드) · 비용 있음\n<StrictMode>      개발 모드 추가 검사 (두 번 렌더 · Effect 한 번 더 · ref 콜백 한 번 더 · 폐기 API 경고)   운영 영향 없음 · 서버는 한 번\n<Suspense>        자식이 '아직' 이면 fallback · 가장 가까운 경계 · 중첩 · 전환 중엔 유지 · 스트리밍      드러내기 ~300ms 묶음 · 이펙트로 가져온 데이터는 안 잡음\n<Activity>        hidden: display none + 효과 정리, state 유지 · visible: 복원     19.2 정식 · 탭·뒤로가기 캐시\n<ViewTransition>  자식 변화를 View Transition API 로 애니메이션       19.2 정식 · startTransition 안의 갱신에만 · 브라우저 지원",
        codeLang: "text",
        terms: [
          {
            term: "Suspense 경계 (boundary)와 fallback",
            body: "<Suspense fallback={…}>로 감싼 영역입니다. 안의 어느 컴포넌트가 '아직 준비 안 됨'(lazy 로딩, use의 pending 프라미스)을 알리면 React는 그 영역 전체를 fallback으로 바꾸고, 준비되면 되돌립니다. 가장 가까운 경계가 받으므로 경계를 어디에 두느냐가 '무엇이 함께 기다리나'를 정합니다. useEffect 안의 fetch는 Suspense가 모릅니다. Suspense를 아는 데이터 소스(프레임워크, use)만 잡습니다.",
          },
          {
            term: "StrictMode",
            body: "개발 모드에서만 자식 트리에 추가 검사를 거는 래퍼입니다. 컴포넌트 함수를 두 번 불러 순수성을, Effect를 마운트 뒤 한 번 더 정리·실행해 정리 누락을, ref 콜백도 한 번 더 불러 검사합니다. 실제로 돌려 보면 renders 2, effects 2, cleanups 1이었습니다. 두 번째 호출 결과는 버려지므로 순수한 컴포넌트는 차이가 없습니다. 운영 빌드에서는 아무 일도 하지 않습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "StrictMode 안의 컴포넌트는 클라이언트 개발 모드에서 렌더 2, 효과 2, 정리 1이었고 밖에서는 1, 1, 0입니다. 서버(renderToString)에서는 StrictMode 안이어도 1입니다. Suspense는 lazy 컴포넌트(40ms)와 use(프라미스 60ms)를 자식으로 두었을 때 33ms·63ms·122ms·252ms에 모두 '로딩…'이었고 401ms에 'lazy 도착데이터'가 보였습니다. 데이터는 60ms에 다 왔지만 React가 fallback을 보인 뒤 약 300ms까지 드러내기를 묶어 깜빡임을 막습니다. 서버 스트리밍(renderToReadableStream)에서는 첫 청크에 fallback '로딩…'과 <template id=\"B:0\">이 들어 있고, 둘째 청크에 데이터와 그것을 제자리에 끼우는 <script>가 들어 있었습니다. renderToString은 Suspense를 기다리지 못해 fallback과 '클라이언트 렌더링으로 전환' 표시를 남겼습니다. Fragment는 서버 HTML에서 <i>a</i><i>b</i>만 남겼습니다.",
        code: "// StrictMode (React 19.3.1)\n클라이언트 개발:  { renders: 2, effects: 2, cleanups: 1 }      밖: { 1, 1, 0 }      서버 renderToString: 1\n\n// Suspense 드러내기 — lazy 40ms + use(프라미스 60ms)\n33ms 로딩… · 63ms 로딩… · 122ms 로딩… · 252ms 로딩… · 401ms 'lazy 도착데이터' · 601ms 같음\n→ 데이터는 60ms 에 다 왔지만 fallback 뒤 ~300ms 까지 묶는다 (깜빡임 방지)\n\n// 서버 스트리밍 (renderToReadableStream)\n청크 1:  <main><h1>제목</h1><!--$?--><template id=\"B:0\"></template><p>로딩…</p><!--/$--></main><script>…\n청크 2:  데이터 + 제자리에 끼우는 <script>\n// renderToString 은 못 기다린다\n<!--$!--><template data-msg=\"Switched to client rendering because the server rendering aborted due to: The server used \"renderToString\" which does not support Suspense…\"></template><p>로딩…</p><!--/$-->\n\n// Fragment\n<><i>a</i><i>b</i></>   →  '<i>a</i><i>b</i>'",
      },
      {
        label: "Suspense 를 어디에 두나",
        body: "경계의 위치가 '무엇이 함께 기다리나'를 정합니다. 페이지 전체를 하나로 감싸면 가장 느린 것이 올 때까지 전부 fallback입니다. 부분마다 감싸면 각자 따로 드러납니다. 문서의 조언은 '디자인이 로딩 상태를 어디에 두기를 원하나'를 따르라는 것입니다. 중첩하면 바깥이 먼저 드러나고 안이 뒤에 드러나는 단계적 로딩이 됩니다. startTransition 안의 갱신으로 자식이 다시 pending이 되면, React는 이미 보이던 내용을 fallback으로 되돌리지 않고 새 내용이 준비될 때까지 옛 내용을 유지합니다(isPending으로 흐리게). 그래서 탭 전환은 transition으로 감쌉니다. 새 경계를 key로 만들면(<Suspense key={id}>) 매번 fallback부터 시작합니다. 서버에서는 renderToPipeableStream·renderToReadableStream이 경계 단위로 스트리밍하고, 클라이언트는 hydrateRoot가 경계 단위로 선택적 하이드레이션을 합니다. 사용자가 클릭한 경계를 먼저 하이드레이션합니다. 데이터는 Suspense를 아는 소스여야 합니다. useEffect + fetch는 잡히지 않습니다. 프레임워크(Next.js, React Router)의 로더나 use(프라미스)가 잡힙니다.",
        code: "// 하나로 감싸면 가장 느린 것까지 전부 fallback\n<Suspense fallback={<PageSkeleton />}><Header /><Feed /><Sidebar /></Suspense>\n\n// 부분마다 — 각자 드러난다 (단계적)\n<Header />\n<Suspense fallback={<FeedSkeleton />}><Feed /></Suspense>\n<Suspense fallback={<SidebarSkeleton />}><Sidebar /></Suspense>\n\n// 전환 중에는 옛 내용을 유지한다 (fallback 으로 되돌리지 않음)\nstartTransition(() => setTab('posts'));     // Posts 가 pending 이어도 전 탭이 보인 채 isPending\n\n// 매번 fallback 부터\n<Suspense key={userId} fallback={…}><Profile id={userId} /></Suspense>\n\n// Suspense 가 아는 데이터만\nuseEffect(() => { fetch(…).then(setData) })   // ✗ Suspense 가 모른다\nconst data = use(dataPromise)                  // ✓  (프레임워크 로더 · cache 와 함께)",
        terms: [
          {
            term: "선택적 하이드레이션 (selective hydration)과 스트리밍",
            body: "서버가 Suspense 경계 단위로 HTML을 보내고(준비된 것 먼저, fallback 자리는 나중에 <script>로 채움), 클라이언트는 경계 단위로 하이드레이션하되 사용자가 상호작용한 경계를 먼저 처리하는 것입니다. 실제로 돌려 보면 스트리밍 첫 청크에 fallback과 template이, 둘째에 데이터와 스크립트가 있었습니다. 렌더링 노드 12장의 하이드레이션이 경계 단위로 쪼개진 것입니다.",
          },
        ],
      },
      {
        label: "문제: 데이터가 왔는데 스피너가 300ms 더 돈다",
        body: "검색 결과를 use(프라미스)로 받고 Suspense로 감쌌습니다. 네트워크 탭에서 응답은 60ms에 왔는데 스피너는 400ms쯤 사라집니다. 버그가 아니라 설계입니다. React는 fallback을 보인 뒤 아주 짧게 데이터가 오면 '스피너가 깜빡'하는 것을 막으려 드러내기를 약 300ms 묶습니다. 실제로 돌려 보면 60ms 도착, 401ms 드러남이었습니다. 응답이 늘 빠르다면 fallback을 보이지 않는 것이 낫습니다. 전환(startTransition)으로 갱신하면 fallback 대신 옛 내용을 유지하고, 그러면 묶음도 없습니다. 또는 데이터를 미리 받아(라우트 로더) pending 상태 자체를 없앱니다. Suspense는 '기다림을 보이는' 장치이고, 기다림이 짧으면 안 보이는 쪽이 맞습니다.",
      },
      {
        label: "문제가 나는 경우: 여섯의 경계를 모를 때",
        body: "경우 ㄱ, 300ms 묶음입니다. 위의 사고입니다. 경우 ㄴ, useEffect fetch를 Suspense로 감쌉니다. 잡히지 않아 fallback이 안 뜨고 자식이 빈 데이터로 그려집니다. use나 로더입니다. 경우 ㄷ, 경계가 너무 바깥입니다. 느린 사이드바 때문에 전체가 스켈레톤입니다. 부분마다 감쌉니다. 경우 ㄹ, 전환 없이 탭을 바꿉니다. 보이던 내용이 fallback으로 사라집니다. startTransition으로. 경우 ㅁ, StrictMode 두 번 렌더를 버그로 봅니다. console.log가 두 번 찍히는 것은 검사입니다. 순수하면 결과는 같습니다. 운영에는 없습니다. 경우 ㅂ, StrictMode에서 Effect가 두 번 돈다고 정리를 빼면 운영에서 구독이 쌓입니다. 정리를 바로 적는 것이 답입니다. 경우 ㅅ, 운영에서 Profiler가 비어 있습니다. profiling 빌드가 필요합니다. 경우 ㅇ, Fragment에 key 없이 리스트를 묶습니다. <>…</>에는 key를 못 붙입니다. <Fragment key>로. 경우 ㅈ, renderToString에 Suspense입니다. 기다리지 못하고 클라이언트 렌더링으로 넘깁니다. 실제로 돌려 보면 그 표시가 남았습니다. renderToPipeableStream으로. 경우 ㅊ, Activity hidden 안의 Effect가 돈다고 믿습니다. hidden에서는 Effect가 정리되고 state만 남습니다. 경우 ㅋ, ViewTransition을 transition 밖의 갱신에 씁니다. startTransition 안의 갱신에만 애니메이션됩니다. 경우 ㅌ, lazy를 컴포넌트 안에서 선언합니다. 매 렌더 새 lazy라 매번 다시 로드하고 state가 초기화됩니다. 모듈 최상위에.",
        code: "경우               언제 생기나                           겉모습                                  들통나는 때\nㄱ 300ms 묶음       빠른 응답 + fallback                   스피너가 더 돈다                           빠른 망\nㄴ Effect fetch     useEffect 안 fetch 를 Suspense 로        fallback 안 뜸, 빈 데이터로 그림              첫 로드\nㄷ 경계 바깥         페이지 하나로 감쌈                      느린 하나가 전부를 막음                      느린 API 하나\nㄹ 전환 없음         setTab 직접                            보이던 내용이 fallback 으로                  탭 전환\nㅁ 두 번 렌더 오해    StrictMode 로그 두 번                   '버그' 로 착각                            개발 모드\nㅂ 정리 삭제         두 번 돈다고 return 삭제                운영에서 구독 누적                          운영\nㅅ 운영 Profiler     production 빌드                        비어 있음                                측정\nㅇ Fragment key      <>…</> 에 key                         문법 에러 · 경고                           리스트\nㅈ renderToString    Suspense 자식                          클라이언트 렌더링으로 전환 표시               SSR\nㅊ hidden 의 Effect   Activity hidden                       Effect 안 돈다 (정리됨)                     탭 숨길 때\nㅋ 전환 밖 VT        startTransition 없이                    애니메이션 없음                            전환 때\nㅌ 안에서 lazy       컴포넌트 안 lazy(…)                     매 렌더 재로드 · state 초기화               리렌더마다",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 여섯은 트리의 '사이'에 서서 자식의 시간을 바꾼다",
        body: "훅이 한 컴포넌트의 렌더에 매달린다면, 내장 컴포넌트는 자식 트리 전체의 '시간'을 바꿉니다. StrictMode는 자식을 두 번 돌려 시간을 늘리고(검사, ㅁ·ㅂ), Profiler는 자식의 시간을 잽니다(ㅅ), Suspense는 자식이 준비될 때까지 시간을 멈추고 fallback을 끼우며 드러내기를 묶습니다(ㄱ~ㄹ, ㅈ), Activity는 자식의 시간을 정지시켜 두고(Effect 정리, state 유지, ㅊ), ViewTransition은 자식의 변화 '사이'에 애니메이션 시간을 끼웁니다(ㅋ). Fragment만 시간과 무관하게 자리를 묶습니다(ㅇ). 사고는 그 시간을 변수처럼 생각할 때 납니다. 경계의 위치가 '누가 함께 기다리나'이고(ㄷ), 전환 여부가 '옛 것을 유지하나'이고(ㄹ), Suspense가 아는 소스만 멈출 수 있습니다(ㄴ). 처방은 경계를 디자인의 로딩 단위에 맞추고, 갱신은 전환으로, 데이터는 Suspense를 아는 길로 받는 것입니다.",
        code: "컴포넌트          자식의 시간에 하는 일\n<StrictMode>      두 번 돌린다 (검사)                        ㅁ ㅂ\n<Profiler>        잰다                                    ㅅ\n<Suspense>        준비될 때까지 멈추고 fallback · 드러내기 묶음   ㄱ ㄴ ㄷ ㄹ ㅈ\n<Activity>        정지 (Effect 정리, state 유지)              ㅊ\n<ViewTransition>  변화 사이에 애니메이션                       ㅋ\n<Fragment>        (시간 무관) 자리만 묶는다                    ㅇ\n\n경계의 위치 = 누가 함께 기다리나 (ㄷ)   ·   전환 = 옛 것을 유지하나 (ㄹ)   ·   Suspense 가 아는 소스만 (ㄴ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 'React API'는 훅도 컴포넌트도 아닌 함수들입니다. lazy(코드 분할), memo(리렌더 건너뛰기), createContext, startTransition(훅 없이 전환), use, cache(서버 컴포넌트 캐시), act(테스트), 그리고 19.2의 addTransitionType·cacheSignal, 개발용 captureOwnerStack입니다.",
      },
      {
        label: "확인 질문",
        body: "상세 페이지가 헤더·본문·댓글 셋으로 되어 있고 댓글 API가 가장 느립니다. (1) Suspense를 어떻게 둘까요? (2) 사용자가 다른 글로 넘어갈 때 헤더가 스켈레톤으로 깜빡이지 않게 하려면? (3) 서버 렌더링을 쓴다면 어느 API여야 댓글을 나중에 보낼 수 있을까요?",
        notes: [
          {
            title: "답",
            body: "(1) 댓글만 따로 <Suspense fallback={<CommentsSkeleton />}>로 감싸고 헤더·본문은 밖에 둡니다(또는 둘을 함께 감싼 바깥 경계 하나). 그러면 헤더·본문이 먼저 보이고 댓글만 기다립니다. 하나로 감싸면 댓글 때문에 전부 스켈레톤입니다. (2) 글 전환을 startTransition 안에서 하면 React가 이미 보이던 헤더·본문을 fallback으로 되돌리지 않고 새 데이터가 준비될 때까지 유지합니다(isPending으로 흐리게). 전환 없이 바꾸면 fallback으로 사라집니다. (3) renderToPipeableStream(Node) 또는 renderToReadableStream(Web Streams)입니다. 헤더·본문을 먼저 보내고 댓글 경계는 fallback과 template을 보낸 뒤 데이터가 오면 <script>로 채웁니다. 실제로 돌려 보면 첫 청크에 fallback, 둘째에 데이터와 스크립트였습니다. renderToString은 Suspense를 기다리지 못해 클라이언트 렌더링으로 넘깁니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Built-in React Components", href: `${DOCS}/reference/react/components` },
      { label: "<Suspense>", href: `${DOCS}/reference/react/Suspense` },
      { label: "<StrictMode>", href: `${DOCS}/reference/react/StrictMode` },
      { label: "<Activity>", href: `${DOCS}/reference/react/Activity` },
      { label: "<ViewTransition>", href: `${DOCS}/reference/react/ViewTransition` },
      { label: "<Profiler>", href: `${DOCS}/reference/react/Profiler` },
    ],
  },

  {
    id: "ra-react-apis",
    name: "React API",
    tagline: "훅도 컴포넌트도 아닌 함수들: 나누기(lazy), 건너뛰기(memo), 멀리 주기(createContext), 미루기(startTransition), 읽기(use), 캐시(cache), 테스트(act)",
    intro:
      "참고서의 react API 열둘입니다. act, addTransitionType, cache, cacheSignal, captureOwnerStack, createContext, lazy, memo, startTransition, use, experimental_taintObjectReference, experimental_taintUniqueValue. 훅이 아니라 어디서든 부를 수 있는 함수들이고(use는 훅이지만 이 묶음에 있습니다), 대부분 '컴포넌트를 감싸거나 만드는' 것입니다. lazy는 컴포넌트를 나중에 받고, memo는 props가 같으면 건너뛰고, createContext는 멀리 주는 통로를 만들고, startTransition은 훅 없이 갱신을 미루고, use는 프라미스·컨텍스트를 읽고, cache는 서버 컴포넌트에서 함수 결과를 요청 단위로 캐시하고, act는 테스트에서 갱신을 묶어 끝냅니다. 실제로 돌려 보면 memo는 새 객체 props에 무력했고(3 vs 1), lazy는 Suspense와 함께 400ms에 드러났고, cache + use로 서버 스트리밍이 됐습니다. 이 노드의 질문은 하나입니다. 이 함수는 컴포넌트에 무엇을 더하는가.",
    blocks: [
      {
        label: "무엇이 들어 있나: 열둘",
        body: "lazy(() => import('./X'))는 컴포넌트를 처음 렌더될 때 받는 지연 컴포넌트를 만듭니다. Suspense 안에 두어야 로딩 중 fallback이 보입니다. 모듈 최상위에서 선언합니다. memo(Component, arePropsEqual?)는 props가 전과 얕게 같으면 리렌더를 건너뛰는 컴포넌트를 만듭니다. 부모가 렌더돼도 자식은 안 그립니다. state·context 변화는 막지 못합니다. createContext(defaultValue)는 컨텍스트 객체를 만들고, React 19에서는 <Ctx value>가 Provider입니다. 기본값은 Provider가 없을 때만. startTransition(fn)은 useTransition의 훅 없는 꼴로 isPending이 없고, 컴포넌트 밖(데이터 라이브러리)에서 쓸 수 있습니다. use(resource)는 프라미스나 컨텍스트를 읽는 훅이며 조건 안에서도 됩니다. cache(fn)는 서버 컴포넌트 전용으로, 같은 인자로 부르면 한 요청 안에서 한 번만 돌고 결과를 공유합니다. 클라이언트에서는 효과가 없습니다. act(async () => {})는 테스트에서 렌더·효과·갱신을 전부 끝낸 뒤 단언하게 합니다. captureOwnerStack은 개발 모드에서 '누가 이 컴포넌트를 렌더했나'의 스택을 줍니다. addTransitionType(19.2)은 전환에 종류를 붙여 ViewTransition이 다른 애니메이션을 고르게 하고, cacheSignal(19.2)은 cache의 수명이 끝났음을 알리는 AbortSignal입니다. taint 둘은 실험적으로 서버 데이터가 클라이언트로 넘어가지 않게 표시합니다.",
        code: "API                     하는 일                                          주의\nlazy(loader)             처음 렌더 때 받는 컴포넌트 · Suspense 안에            모듈 최상위에 · 로더는 { default } 를 resolve\nmemo(C, equal?)          props 가 얕게 같으면 건너뜀                         새 객체·함수 props 는 무력 (실제로 3 vs 1) · state·context 는 못 막음\ncreateContext(default)   컨텍스트 객체 · <Ctx value> 가 Provider (19)         기본값은 Provider 없을 때만 · 바뀌면 소비자 전부 렌더\nstartTransition(fn)      훅 없는 전환 · isPending 없음 · 밖에서도                fn 은 동기 (19: async 액션은 useTransition)\nuse(resource)            프라미스·컨텍스트 읽기 · 조건 안 OK                   렌더 중 만든 프라미스는 매번 새것 → cache/밖에서\ncache(fn)                서버 컴포넌트 전용 · 요청 안 메모이제이션 · 중복 fetch 제거   클라이언트는 무효 · 인자는 참조 비교\nact(fn)                  테스트에서 갱신·효과를 끝낸 뒤 단언                    await act(async …) · 테스트 라이브러리가 감싸 줌\ncaptureOwnerStack()      개발: 누가 렌더했나 스택                              개발 모드만\naddTransitionType(t)     전환에 종류 → ViewTransition 이 고른다 (19.2)         startTransition 안에서\ncacheSignal()            cache 수명 끝 알림 AbortSignal (19.2)                 서버 컴포넌트\nexperimental_taint*      서버 데이터가 클라이언트로 안 가게 표시                  실험적",
        codeLang: "text",
        terms: [
          {
            term: "lazy와 코드 분할",
            body: "lazy(() => import('./Heavy'))는 Heavy를 처음 렌더할 때 그 모듈을 받는 컴포넌트를 만듭니다. 번들러가 import()를 보고 별도 청크로 뗍니다(JS 노드 13장). 받는 동안은 가장 가까운 Suspense의 fallback이 보입니다. 라우트 단위로 쪼개는 것이 보통입니다. 컴포넌트 안에서 lazy를 부르면 매 렌더 새 컴포넌트라 state가 초기화되므로 모듈 최상위에 둡니다.",
          },
          {
            term: "memo와 얕은 비교",
            body: "memo(C)는 부모가 렌더될 때 C의 새 props와 옛 props를 얕게(각 prop을 Object.is로) 비교해 같으면 C를 건너뜁니다. 객체·배열·함수 prop이 매 렌더 새로 만들어지면 늘 다르다고 보아 건너뛰지 못합니다. 실제로 돌려 보면 그 경우 3번, useMemo·useCallback으로 고정하면 1번이었습니다. 컴파일러가 이 고정을 자동으로 해 주므로 컴파일러를 쓰면 memo를 손으로 붙일 일이 줄어듭니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "memo: 자식을 memo로 감싸고 부모 state를 두 번 바꿨습니다. props를 매 렌더 새 객체·함수로 넘기면 자식 렌더 3번, useMemo·useCallback으로 고정하면 1번입니다. lazy: 40ms 뒤 resolve하는 lazy 컴포넌트를 Suspense 안에 두니 401ms에 드러났습니다(드러내기 묶음). cache + use: 서버에서 cache로 감싼 데이터 함수를 use로 읽고 Suspense로 감싸 renderToReadableStream하니 두 청크로 왔습니다. 첫 청크는 fallback, 둘째는 데이터입니다. createContext: Provider 없으면 'light', <Theme value=\"dark\">면 'dark'. 요소 객체: createElement의 결과는 { $$typeof: Symbol(react.transitional.element), type, props(동결), key }입니다. react 패키지가 내보내는 API 목록도 확인했습니다. act, addTransitionType, cache, cacheSignal, captureOwnerStack, createContext, lazy, memo, startTransition과 use(훅 목록에), 그리고 unstable_useCacheRefresh입니다.",
        code: "// memo (Chrome 156)\n<Child cfg={{ a: 1 }} onX={() => {}} />  부모 state 2번 변경  → Child 렌더 3     (매 렌더 새 참조)\n<Child cfg={useMemo(…)} onX={useCallback(…)} />            → Child 렌더 1\n\n// lazy + Suspense\nlazy(() => new Promise(r => setTimeout(() => r({ default: () => <p>lazy 도착</p> }), 40)))   → 401ms 에 드러남\n\n// cache + use + 스트리밍 (Node 24)\nconst getData = cache(() => fetchSlow());\nfunction Slow() { return <p>{use(getData())}</p>; }\nrenderToReadableStream(<Suspense fallback=\"로딩…\"><Slow /></Suspense>)   → 청크 2개: [fallback+template] [데이터+script]\n\n// createContext (19: Context 가 Provider)\n<Theme value=\"dark\"><Show /></Theme>   → 'dark'      Provider 없음 → 'light' (기본값)\n\n// react 가 내보내는 API (19.3.1)\nact addTransitionType cache cacheSignal captureOwnerStack createContext lazy memo startTransition (+ use, unstable_useCacheRefresh)",
      },
      {
        label: "문제: memo 를 붙였는데 자식이 매번 다시 그려진다",
        body: "<Table rows={rows} options={{ dense: true }} onSelect={(id) => select(id)} />를 memo로 감쌌는데 부모의 다른 state가 바뀔 때마다 Table이 다시 그려집니다. options는 매 렌더 새 객체이고 onSelect는 매 렌더 새 함수라 memo의 얕은 비교가 늘 '다르다'를 냅니다. 실제로 돌려 보면 같은 모양에서 3번이었습니다. 처방은 셋입니다. options를 컴포넌트 밖 상수로 빼거나 useMemo로, onSelect를 useCallback으로 고정하면 1번이 됩니다. 또는 React 컴파일러를 켜면 이 고정을 자동으로 합니다. 또는 memo를 떼고 '자식이 비싼가'를 다시 봅니다. 대부분의 컴포넌트는 memo 없이도 충분히 빠르고, memo는 Profiler로 비싼 것을 확인한 뒤에 붙입니다.",
      },
      {
        label: "문제가 나는 경우: 함수가 더하는 것을 모를 때",
        body: "경우 ㄱ, memo + 새 참조입니다. 위의 사고입니다. 경우 ㄴ, memo로 state·context 변화를 막으려 합니다. memo는 props만 봅니다. 자식 자신의 state나 읽는 context가 바뀌면 그립니다. 경우 ㄷ, lazy를 컴포넌트 안에 둡니다. 매 렌더 재로드와 state 초기화. 경우 ㄹ, lazy 밖에 Suspense가 없습니다. 로딩 중 에러 'A component suspended while responding to synchronous input'. 경우 ㅁ, 로더가 default가 아닌 named export를 resolve합니다. lazy는 { default }를 기대합니다. then(m => ({ default: m.Named }))로 바꿉니다. 경우 ㅂ, 클라이언트에서 cache를 씁니다. 효과가 없습니다(요청 단위가 없음). useMemo나 데이터 라이브러리입니다. 경우 ㅅ, cache 인자에 매번 새 객체를 넘깁니다. 참조가 달라 캐시가 안 맞습니다. 원시값으로. 경우 ㅇ, use에 렌더 중 만든 프라미스입니다. 영원히 pending. 경우 ㅈ, startTransition 안에 await 뒤의 set입니다. 동기 fn만 전환으로 표시되고 await 뒤는 밖입니다. 19의 useTransition async 액션을 쓰거나 await 뒤에 다시 startTransition으로 감쌉니다. 경우 ㅊ, createContext 기본값을 '설정값'으로 씁니다. 기본값은 Provider가 없을 때의 폴백이지 설정이 아닙니다. 값은 Provider로 줍니다. 경우 ㅋ, 테스트에서 act 없이 단언합니다. 갱신이 아직 안 끝나 옛 값. 테스트 라이브러리의 render·fireEvent가 act로 감싸 주고, 직접 트리거하면 await act(async () => …)입니다. 경우 ㅌ, taint API를 정식으로 믿습니다. experimental_ 접두가 붙은 것은 바뀔 수 있습니다.",
        code: "경우               언제 생기나                            겉모습                                   들통나는 때\nㄱ memo + 새 참조     options={{…}} onX={() => …}             매번 렌더 (3)                             Profiler\nㄴ memo 로 state 막기  자식 state·context 변화                 그려진다 (props 만 본다)                    -\nㄷ 안에서 lazy       컴포넌트 안 lazy()                      재로드 · state 초기화                      리렌더\nㄹ Suspense 없음      lazy 만                                에러 (synchronous input) · 깨짐              첫 로드\nㅁ named export      lazy(() => import('./x'))  (default 없음)   'Element type is invalid'                  첫 렌더\nㅂ 클라 cache        클라이언트 컴포넌트에서 cache               효과 없음                                 -\nㅅ cache 새 객체      getUser({ id })                         캐시 미스                                 중복 fetch\nㅇ 렌더 중 프라미스    use(fetch())                            영원히 pending                            fallback 멈춤\nㅈ await 뒤 set       startTransition(async () => { await; set })  await 뒤는 전환 아님                    깜빡임\nㅊ 기본값 = 설정      createContext(config)                   Provider 없이 쓰다 바꿀 수 없음              설정 바꿀 때\nㅋ act 없음          직접 트리거 뒤 단언                      옛 값 · 'not wrapped in act' 경고            테스트\nㅌ 실험 API 의존      experimental_taint*                     버전 올리면 바뀜                           업그레이드",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 컴포넌트를 '감싸거나 만드는' 함수들이고, 감싼 것의 성질을 알아야 한다",
        body: "열둘은 대부분 컴포넌트나 값을 감싸 새 성질을 더합니다. lazy는 '나중에 받는다'(ㄷ, ㄹ, ㅁ), memo는 'props가 같으면 건너뛴다'(ㄱ, ㄴ), createContext는 '멀리서 읽을 수 있다'(ㅊ), cache는 '한 요청 안에서 한 번만'(ㅂ, ㅅ), startTransition은 '급하지 않다'(ㅈ), use는 '준비될 때까지 기다린다'(ㅇ), act는 '다 끝난 뒤'(ㅋ). 사고는 더해진 성질의 조건을 모를 때 납니다. memo는 얕은 비교라 참조가 조건이고, lazy는 Suspense와 default가 조건이고, cache는 서버와 참조 인자가 조건이고, use는 안정된 프라미스가 조건입니다. 처방은 함수마다 '무엇을 더하나'와 '조건이 무엇인가'를 짝으로 외우는 것입니다. 그리고 memo·useMemo·useCallback 셋은 컴파일러가 대신하는 쪽으로 가고 있습니다.",
        code: "함수              더하는 성질                      조건                              어기면\nlazy              나중에 받는다                    Suspense 안 · { default } · 최상위       ㄹ ㅁ ㄷ\nmemo              props 같으면 건너뜀               참조가 같아야 (얕은 비교) · props 만        ㄱ ㄴ\ncreateContext     멀리서 읽는다                    값은 Provider 로 · 기본값은 폴백            ㅊ\ncache             요청 안 한 번만                   서버 컴포넌트 · 원시값 인자                 ㅂ ㅅ\nstartTransition   급하지 않다                      동기 fn (async 는 useTransition)           ㅈ\nuse               준비될 때까지 기다린다             안정된 프라미스 (cache · 밖에서)              ㅇ\nact               다 끝난 뒤 단언                   await act(async …)                      ㅋ\n\nmemo · useMemo · useCallback → 컴파일러가 대신하는 방향",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "react 갈래가 끝났습니다. 다음은 react-dom입니다. '어디에' 그리는지를 아는 패키지입니다. 폼 상태 훅(useFormStatus), DOM 컴포넌트(<form> <input> <link> <script> …에 React가 더한 것), API(createPortal, flushSync, preload…), 클라이언트(createRoot, hydrateRoot), 서버(renderToString, 스트리밍), 정적(prerender). 실제로 돌려 보면 renderToString은 Suspense를 못 기다리고, 하이드레이션 불일치는 onRecoverableError로 왔습니다.",
      },
      {
        label: "확인 질문",
        body: "차트 라이브러리(300KB)를 쓰는 <Chart data={data} options={{ theme }} />가 있습니다. (1) 첫 로드에서 빼려면? (2) 부모가 다른 state로 리렌더될 때 Chart가 다시 그려지지 않게 하려면 무엇을 확인해야 할까요? (3) 서버 컴포넌트에서 같은 data를 세 컴포넌트가 각자 fetch한다면?",
        notes: [
          {
            title: "답",
            body: "(1) 모듈 최상위에 const Chart = lazy(() => import('./Chart'))로 두고 <Suspense fallback={<ChartSkeleton />}>로 감쌉니다. 번들러가 Chart를 별도 청크로 떼어 처음 렌더 때 받습니다. Chart 모듈이 named export면 then(m => ({ default: m.Chart }))로 바꿉니다. (2) memo(Chart)를 붙이되 props의 참조를 확인합니다. options={{ theme }}는 매 렌더 새 객체라 memo가 무력합니다(실제로 3 vs 1). useMemo(() => ({ theme }), [theme])로 고정하거나 theme을 바로 prop으로 넘기고, data도 같은 참조인지 봅니다. 컴파일러를 켰다면 자동입니다. (3) fetch 함수를 cache로 감쌉니다. const getData = cache(async (id) => …). 같은 인자로 세 번 불러도 그 요청 안에서 한 번만 돌고 결과를 공유합니다. 인자는 원시값(id)이어야 참조 비교가 맞습니다. 실제로 돌려 보면 cache + use가 스트리밍과 함께 동작했습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Built-in React APIs", href: `${DOCS}/reference/react/apis` },
      { label: "lazy", href: `${DOCS}/reference/react/lazy` },
      { label: "memo", href: `${DOCS}/reference/react/memo` },
      { label: "cache", href: `${DOCS}/reference/react/cache` },
      { label: "startTransition", href: `${DOCS}/reference/react/startTransition` },
      { label: "act", href: `${DOCS}/reference/react/act` },
    ],
  },

  {
    id: "ra-dom",
    name: "React DOM",
    tagline: "'어디에' 를 아는 패키지: 브라우저에 붙이고(client), 문자열로 만들고(server), 미리 만든다(static)",
    intro:
      "참고서의 react-dom 갈래입니다. 여섯으로 나뉩니다. 훅(useFormStatus), 컴포넌트(<form> <input> <select> <textarea> <link> <meta> <script> <style> <title> <img>와 공통 컴포넌트), API(createPortal, flushSync, preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule), 클라이언트 API(createRoot, hydrateRoot), 서버 API(renderToString, renderToStaticMarkup, renderToPipeableStream, renderToReadableStream, resume…), 정적 API(prerender, prerenderToNodeStream, resumeAndPrerender…). react가 '무엇을 그릴지'라면 react-dom은 '어디에'입니다. 실제로 돌려 보면 react-dom의 세 진입점(client·server·static)이 각각 그 API를 내보냈습니다. 이 노드의 자식 여섯이 그 여섯입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나: 여섯",
        body: "훅은 useFormStatus 하나로, <form> 안의 컴포넌트가 '지금 폼이 제출 중인가'(pending, data, method, action)를 읽습니다. 컴포넌트는 브라우저 태그 전부를 지원하되 React가 더한 것(className, htmlFor, onChange, value/defaultValue, ref, dangerouslySetInnerHTML, suppressHydrationWarning)과, 폼 요소의 제어·비제어, 그리고 19에서 <link> <meta> <script> <style> <title>을 어디서 렌더해도 <head>로 올리는 리소스·메타데이터 호이스팅입니다. API는 createPortal(다른 DOM 자리에 그리되 React 트리는 유지), flushSync(갱신을 즉시 동기 커밋), 그리고 리소스 힌트 여섯(preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule). 클라이언트는 createRoot(빈 컨테이너에 그리기)와 hydrateRoot(서버 HTML에 붙이기), 옵션 onUncaughtError·onCaughtError·onRecoverableError·identifierPrefix. 서버는 renderToString·renderToStaticMarkup(한 번에 문자열, Suspense 못 기다림), renderToPipeableStream(Node 스트림)·renderToReadableStream(Web 스트림, Suspense 스트리밍), resume·resumeToPipeableStream(prerender를 이어서). 정적은 prerender·prerenderToNodeStream(전부 기다려 완성된 HTML, SSG)과 resumeAndPrerender입니다.",
        code: "묶음           API                                                           한 줄\n훅             useFormStatus                                                  <form> 안에서 pending · data · method · action\n컴포넌트        공통 (<div> …) · <form> <input> <option> <progress> <select> <textarea> · <img> <link> <meta> <script> <style> <title>   React 가 더한 props · 제어/비제어 · 19: head 로 호이스팅\nAPI            createPortal · flushSync · preconnect prefetchDNS preinit preinitModule preload preloadModule   다른 자리에 그리기 · 즉시 커밋 · 리소스 힌트\n클라이언트      createRoot · hydrateRoot                                       빈 컨테이너 / 서버 HTML 에 붙이기 · onRecoverableError 등\n서버           renderToString · renderToStaticMarkup · renderToPipeableStream · renderToReadableStream · resume*   문자열 (Suspense X) / 스트림 (Suspense O) / 이어서\n정적           prerender · prerenderToNodeStream · resumeAndPrerender*          전부 기다려 완성 HTML (SSG)\n\n// React 19.3.1 진입점 (실제로 확인)\nreact-dom/client  → createRoot hydrateRoot\nreact-dom/server  → renderToString renderToStaticMarkup renderToPipeableStream renderToReadableStream resume resumeToPipeableStream\nreact-dom/static  → prerender prerenderToNodeStream resumeAndPrerender resumeAndPrerenderToNodeStream",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 세 자리의 차이",
        body: "같은 컴포넌트를 세 자리에서 돌렸습니다. renderToString은 '<h1 class=\"t\">Hi <!-- -->민엽</h1>' 문자열을 냈고 useEffect는 돌지 않았습니다. 텍스트 사이의 <!-- -->는 하이드레이션 때 텍스트 노드를 가르는 표시이고, renderToStaticMarkup은 그것이 없습니다(하이드레이션 안 할 때). renderToReadableStream은 Suspense를 두 청크로 스트리밍했고, renderToString은 Suspense를 못 기다려 '클라이언트 렌더링으로 전환' 표시를 남겼습니다. 클라이언트에서 createRoot + flushSync로 렌더하니 동기로 커밋됐고, hydrateRoot로 서버 HTML(time='서버')에 다른 props(time='브라우저')를 붙이니 onRecoverableError로 'Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client.'가 왔고 화면은 클라이언트 값으로 다시 그려졌습니다. console.error가 아니라 onRecoverableError입니다. 하이드레이션 뒤 버튼을 누르니 count가 1이 됐습니다. 포털 안 버튼의 클릭은 DOM 부모가 아니라 React 부모 핸들러로 먼저 올라갔습니다.",
        code: "renderToString(<App name=\"민엽\" />)        // '<h1 class=\"t\">Hi <!-- -->민엽</h1>'   effectRan: false   (<!-- --> 는 하이드레이션용 텍스트 경계)\nrenderToStaticMarkup(…)                   // '<h1 class=\"t\">Hi 민엽</h1>'          (하이드레이션 안 할 때)\nrenderToReadableStream(Suspense…)         // 청크 2: [fallback + <template id=\"B:0\">] [데이터 + <script>]\nrenderToString(Suspense…)                 // <!--$!--><template data-msg=\"Switched to client rendering because the server rendering aborted due to: The server used \"renderToString\" which does not support Suspense…\">\n\nhydrateRoot(el, <Card time=\"브라우저\" />, { onRecoverableError })   // 서버 HTML 은 time='서버'\n// onRecoverableError: 'Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client.'\n// 화면: '렌더 시각: 브라우저' · 클릭 뒤 'count: 1'      (console.error 에는 안 찍힌다)\n\ncreatePortal 안 버튼 클릭 순서:  포털 안 버튼 → React 부모 div onClick → DOM 부모 리스너",
      },
      {
        label: "문제의 구조: 한 트리, 세 출구",
        body: "react가 만든 요소 트리는 하나이고 react-dom은 그것을 세 곳으로 내보냅니다. 브라우저 DOM(client), 문자열·스트림(server), 완성된 HTML(static). 세 출구는 '언제 끝나나'가 다릅니다. client는 끝이 없습니다(계속 갱신). server의 renderToString은 한 번에 끝나야 해서 Suspense를 기다릴 수 없고, 스트림은 경계마다 끝나고, static은 전부 기다려 한 번에 끝납니다. 그리고 client의 hydrateRoot는 server의 출력을 입력으로 받아 둘을 맞추는 다리입니다. 거기서 서버 트리와 클라이언트 트리가 다르면 불일치입니다. 렌더링 노드 12장과 i18n 노드 12단계가 그 다리에서 나는 사고를 적었습니다. 이 구조를 알면 '어느 API를 쓰나'가 '언제 끝나야 하고 Suspense가 있나'로 줄어듭니다.",
        code: "react: 요소 트리 하나\n   ├─ client   createRoot (빈 컨테이너) / hydrateRoot (서버 HTML 에 붙임)      끝이 없다 (계속 갱신)\n   ├─ server   renderToString (한 번에, Suspense X) / *Stream (경계마다, Suspense O) / resume (이어서)\n   └─ static   prerender (전부 기다려 한 번에 — SSG)\n\n다리:  server 출력 ──▶ hydrateRoot ──▶ client 트리      다르면 onRecoverableError (불일치)\n고르기:  언제 끝나야 하나? Suspense 가 있나? → 문자열이면 renderToString(없음) · 스트림이면 *Stream · 빌드 때면 prerender",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 여섯으로 들어갑니다. DOM 훅(useFormStatus), DOM 컴포넌트(React가 태그에 더한 것과 호이스팅), DOM API(포털·flushSync·리소스 힌트), 클라이언트 API(createRoot·hydrateRoot와 에러 옵션), 서버 API(문자열과 스트림), 정적 API(prerender).",
      },
    ],
    sources: [
      { label: "React DOM APIs", href: `${DOCS}/reference/react-dom` },
      { label: "Client React DOM APIs", href: `${DOCS}/reference/react-dom/client` },
      { label: "Server React DOM APIs", href: `${DOCS}/reference/react-dom/server` },
      { label: "Static React DOM APIs", href: `${DOCS}/reference/react-dom/static` },
    ],
  },

  {
    id: "ra-dom-hooks",
    name: "React DOM 훅",
    tagline: "useFormStatus 하나: 부모 <form> 이 제출 중인지를 자식이 읽는다",
    intro:
      "react-dom이 내보내는 훅은 useFormStatus 하나입니다. 인자 없이 부르면 { pending, data, method, action }을 돌려줍니다. 가장 가까운 '부모' <form>의 상태입니다. 자기가 렌더하는 <form>이 아니라 자기를 감싼 <form>입니다. 이 한 줄이 이 훅의 거의 모든 사고입니다. 실제로 돌려 보면 <form>을 렌더하는 컴포넌트 자신은 pending이 늘 false였고, 그 안의 자식 버튼은 제출 중 pending=true, data에 FormData(q='바꿈'), method='get'을 받았습니다. 액션이 끝나자 비제어 입력은 '처음'으로 리셋되고 제어 입력은 그대로였습니다. 이 노드의 질문은 하나입니다. 폼의 제출 중 상태를 어디서 읽는가.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "const { pending, data, method, action } = useFormStatus(). pending은 부모 <form>이 액션(또는 onSubmit의 전환)을 돌리는 동안 true입니다. data는 제출 중인 FormData, 아니면 null. method는 'get' 또는 'post'(기본 'get'). action은 부모 form의 action에 넘긴 함수, URL이거나 없으면 null. 문서의 주의 사항 둘이 핵심입니다. '<form> 안에서 렌더되는 컴포넌트에서 불러야 한다', '부모 <form>의 상태만 돌려준다. 같은 컴포넌트나 자식이 렌더하는 <form>의 상태는 돌려주지 않는다'. 그래서 제출 버튼을 별도 컴포넌트(<SubmitButton />)로 빼서 form 안에 두는 것이 정석입니다. 폼 액션 자체는 <form action={fn}>(React DOM 컴포넌트 노드)이고, 액션의 결과 state는 useActionState(react 훅)입니다. 셋이 한 묶음입니다.",
        code: "import { useFormStatus } from 'react-dom';\n\nfunction SubmitButton() {                      // form 안의 자식 — 여기서 읽는다\n  const { pending, data } = useFormStatus();\n  return <button disabled={pending}>{pending ? `${data?.get('q')} 저장 중…` : '저장'}</button>;\n}\n\nfunction Search() {\n  const s = useFormStatus();                   // ✗ 자기가 렌더하는 form 은 안 본다 → 늘 pending false\n  return (\n    <form action={async (fd) => { await save(fd); }}>\n      <input name=\"q\" defaultValue=\"처음\" />\n      <SubmitButton />                         {/* ✓ */}\n    </form>\n  );\n}",
        terms: [
          {
            term: "폼 액션 (form action)",
            body: "React 19에서 <form action={fn}>에 함수를 넘기면 제출 때 React가 그 함수를 전환(Transition) 안에서 FormData 하나를 인자로 부릅니다. 함수가 async면 끝날 때까지 pending입니다. 서버 함수('use server')를 넘기면 자바스크립트가 로드되기 전에도 제출이 됩니다. 함수를 넘기면 HTTP 메서드는 method prop과 무관하게 POST이고, 액션이 성공하면 비제어 필드가 리셋됩니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "<form action={async}>을 렌더하는 컴포넌트 안에서 useFormStatus를 부르고, 자식 <Submit />에서도 불렀습니다. 폼 컴포넌트 자신은 렌더마다 pending=false였습니다. 자식은 처음 'pending=false data=null method=null'(form 바깥 상태처럼 보이는 첫 렌더가 아니라, 제출 전), 제출 뒤 'pending=true data=바꿈 method=get', 버튼 글자가 '저장 중'이었다가 액션(60ms)이 끝나자 '저장'으로 돌아왔습니다. 그리고 비제어 입력 q의 값은 사용자가 '바꿈'으로 고쳤는데 액션 뒤 '처음'(defaultValue)으로 리셋됐고, value로 제어한 입력은 '고정' 그대로였습니다. 서버(renderToString)에서는 form 안이든 밖이든 pending=false, data=null입니다. 서버에서는 제출이 없기 때문입니다. useActionState와 묶어 보니 10 + 5 → 15가 output에 들어가고, 입력은 defaultValue '5'로 리셋됐습니다.",
        code: "// Chrome 156 · React 19.3.1\n폼을 렌더하는 컴포넌트 자신:   pending=false  (매 렌더)                 ← 문서: 자기 form 은 안 본다\n자식 <Submit/>:               제출 전 pending=false data=null → 제출 중 pending=true data=바꿈 method=get → 끝 pending=false\n버튼 글자:                    '저장 중' (제출 10ms 뒤) → '저장' (액션 60ms 끝난 뒤)\n비제어 <input defaultValue=\"처음\">:  사용자 '바꿈' → 액션 성공 뒤 '처음'   (리셋)\n제어 <input value=\"고정\">:           '고정' 그대로\nuseActionState(async (prev, fd) => prev + Number(fd.get('d')), 10):  제출 뒤 15 · 입력은 defaultValue 로\n\n// Node 24 · renderToString\nform 안: <p>false/null/</p>   form 밖: <p>false/null/</p>      ← 서버엔 제출이 없다",
      },
      {
        label: "문제: 제출 버튼이 '저장 중' 으로 바뀌지 않는다",
        body: "폼 컴포넌트 안에서 const { pending } = useFormStatus()를 부르고 그 아래 <form action={save}><button disabled={pending}>를 렌더했습니다. 아무리 제출해도 pending이 false입니다. useFormStatus는 '자기를 감싼' form을 봅니다. 자기가 렌더하는 form은 자식이지 부모가 아닙니다. 실제로 돌려 보면 폼 컴포넌트 자신은 매 렌더 false, 자식 버튼 컴포넌트는 제출 중 true였습니다. 처방은 버튼을 컴포넌트로 빼서 form 안에 두는 것입니다. 상태를 폼 전체에서 쓰고 싶으면 useActionState의 셋째 반환값 isPending을 씁니다. 그것은 액션을 선언한 자리에서 읽을 수 있습니다.",
      },
      {
        label: "문제가 나는 경우: 어느 form 의 상태인지 모를 때",
        body: "경우 ㄱ, 자기 form입니다. 위의 사고입니다. 경우 ㄴ, form 밖입니다. 모달의 버튼이 form 밖에 있으면 pending이 늘 false, data가 null. form 안으로 옮기거나 <button form=\"id\">는 React가 보지 않습니다. useActionState로. 경우 ㄷ, onSubmit에 쓴 폼입니다. action 함수 없이 onSubmit만 쓰면 pending이 안 바뀝니다(onSubmit 안에서 startTransition으로 감싸면 바뀝니다). 경우 ㄹ, 액션 뒤 입력이 비워집니다. 비제어 필드는 액션 성공 뒤 리셋됩니다. 실제로 돌려 보면 '바꿈'이 '처음'으로. 값을 남기려면 useState + value(제어)로, 또는 useActionState의 state로 돌려받아 defaultValue에 넣습니다. 경우 ㅁ, 서버에서 pending을 믿습니다. 서버는 늘 false입니다. 경우 ㅂ, 중첩 form입니다. HTML은 form 중첩을 허용하지 않아 바깥 form만 남고 안쪽은 사라집니다. 경우 ㅅ, data.get을 pending이 false일 때 읽습니다. data는 제출 중에만 있고 아니면 null입니다. 경우 ㅇ, method를 HTTP 메서드로 믿습니다. method는 form의 method prop(기본 'get')이고, action이 함수이면 실제 HTTP는 POST입니다.",
        code: "경우              언제 생기나                          겉모습                        들통나는 때\nㄱ 자기 form        form 을 렌더하는 컴포넌트에서 호출         pending 늘 false                제출\nㄴ form 밖          버튼이 form 바깥 (모달 푸터)              pending false · data null       제출\nㄷ onSubmit 만      action 없이 onSubmit                   pending 안 바뀜                 제출\nㄹ 액션 뒤 리셋      비제어 defaultValue                   입력이 처음 값으로              저장 뒤\nㅁ 서버에서 pending   SSR 에서 pending 로 분기               늘 false                      SSR 로그\nㅂ 중첩 form        form 안의 form                        안쪽 form 이 사라짐              DOM 검사\nㅅ data null        pending false 에서 data.get             TypeError                     제출 전·후\nㅇ method 오해       method 를 HTTP 로                     'get' 인데 실제는 POST           네트워크 탭\n\n// ㄹ 의 처방 — 값을 남기려면 제어하거나 state 로 되돌린다\nconst [state, action] = useActionState(async (prev, fd) => ({ q: fd.get('q'), ...await save(fd) }), { q: '' });\n<input name=\"q\" defaultValue={state.q} />        // 리셋돼도 state.q 가 다시 들어간다",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 상태는 form 에 있고, 훅은 '위로' 만 본다",
        body: "폼 액션의 pending·data는 <form> 요소에 매달린 상태입니다. useFormStatus는 컨텍스트처럼 트리를 '위로' 올라가 가장 가까운 form을 찾습니다. 그래서 form의 자식만 읽을 수 있고(ㄱ, ㄴ), form 밖이나 자기 자신은 못 읽습니다. 서버에는 제출이 없으니 상태도 없고(ㅁ), 제출이 끝나면 React가 form을 리셋하니 비제어 값이 사라집니다(ㄹ). 처방은 둘로 나눠 생각하는 것입니다. '제출 중인가'는 form 안에서 useFormStatus로, '액션의 결과는 무엇인가'는 액션을 선언한 자리에서 useActionState로. 둘 다 '전환(Transition) 안에서 액션이 돈다'는 같은 바탕 위에 있습니다.",
        code: "<Search>                      useFormStatus → 위로 올라감 → form 없음 → pending false  (ㄱ)\n  └ <form action={fn}>       ← pending · data 가 여기 매달린다\n       ├ <input>              제출 성공 → 비제어 리셋 (ㄹ)\n       └ <SubmitButton>       useFormStatus → 위로 → 이 form → pending true  ✓\n<Footer>                      form 밖 → null  (ㄴ)\n\n제출 중인가?  → form 안에서 useFormStatus\n결과는?      → 액션 선언 자리에서 useActionState  [state, action, isPending]",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 'React DOM 컴포넌트'는 <form>을 포함해 React가 브라우저 태그에 더한 것들입니다. className·htmlFor·style 객체, 제어·비제어, dangerouslySetInnerHTML, 그리고 19의 <title> <meta> <link> <script> <style> 호이스팅. 실제로 돌려 보면 깊은 컴포넌트의 <title>이 <head>로 올라갔고, precedence 없는 <link rel=stylesheet>는 제자리에 남았습니다.",
      },
      {
        label: "확인 질문",
        body: "댓글 폼이 있습니다. (1) 전송 중 버튼을 비활성화하고 (2) 전송 실패 시 에러를 입력 아래에 보이고 (3) 실패했을 때 사용자가 쓴 글이 지워지지 않아야 합니다. 어떻게 나눌까요?",
        notes: [
          {
            title: "답",
            body: "(1) <SubmitButton />을 별도 컴포넌트로 만들어 form 안에 두고 useFormStatus의 pending으로 disabled합니다. 폼 컴포넌트 자신에서 부르면 늘 false입니다. (2) 액션을 useActionState로 선언합니다. const [state, action, isPending] = useActionState(async (prev, fd) => { try { await post(fd); return { ok: true, text: '' }; } catch { return { error: '실패', text: fd.get('text') }; } }, {}). state.error를 입력 아래에 그립니다. (3) 액션이 '성공'(예외 없이 끝남)하면 React가 비제어 필드를 리셋합니다. 에러를 반환값으로 돌려줘도 리셋됩니다. 그래서 <textarea name=\"text\" defaultValue={state.text}>처럼 리셋 뒤 다시 채울 값을 state로 돌려주거나, useState로 제어합니다. 실제로 돌려 보면 비제어 값은 액션 뒤 defaultValue로 돌아갔고 제어 값은 남았습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "useFormStatus", href: `${DOCS}/reference/react-dom/hooks/useFormStatus` },
      { label: "<form>", href: `${DOCS}/reference/react-dom/components/form` },
      { label: "useActionState", href: `${DOCS}/reference/react/useActionState` },
    ],
  },

  {
    id: "ra-dom-components",
    name: "React DOM 컴포넌트",
    tagline: "브라우저 태그에 React 가 더한 것: camelCase, 제어·비제어, 호이스팅",
    intro:
      "참고서의 DOM 컴포넌트 페이지들입니다. 공통 컴포넌트(<div> 같은 모든 태그에 공통인 props), 폼(<form> <input> <option> <progress> <select> <textarea>), 리소스·메타데이터(<img> <link> <meta> <script> <style> <title>). React는 HTML을 거의 그대로 쓰되 몇 가지를 바꿨습니다. 속성은 camelCase(tabIndex, className, htmlFor), 이벤트는 onClick, style은 객체, 폼 요소는 value를 주면 '제어'됩니다. 그리고 19에서 <title> <meta> <link> <script> <style>은 어디서 렌더해도 <head>로 올라갑니다. 실제로 돌려 보면 깊은 컴포넌트 안의 <title>과 <meta>, precedence가 있는 <link>·<style>, async인 <script src>가 <head>에 모였고, precedence 없는 <link rel=stylesheet>와 인라인 <script>는 제자리에 남았습니다. 이 노드의 질문은 하나입니다. HTML과 어디가 다른가.",
    blocks: [
      {
        label: "무엇이 들어 있나: 공통 props",
        body: "모든 DOM 컴포넌트가 받는 React 전용 props가 있습니다. children, className(class 대신), htmlFor(for 대신), style(객체, camelCase 키, 숫자는 px), ref(DOM 노드, 또는 콜백·19의 정리 함수), dangerouslySetInnerHTML({ __html }), suppressHydrationWarning(불일치 경고 끄기, 한 단계만), suppressContentEditableWarning. 이벤트는 onClick·onChange처럼 on + 대문자이고 캡처 단계는 onClickCapture입니다. onLoad·onAbort처럼 브라우저에서는 버블링 안 하는 이벤트도 React에서는 버블링합니다. 커스텀 속성은 소문자이고 on으로 시작하면 안 되며, null·undefined면 속성이 빠집니다. 대시가 있는 태그(<my-el>)와 is 속성이 있는 태그는 커스텀 엘리먼트로 취급해 class를 그대로 쓰고, 문자열이 아닌 값은 프로퍼티로 넣습니다. SVG의 xlink:href는 xlinkHref처럼 camelCase가 됩니다.",
        code: "HTML                     React                                 실제로 돌려 보면 (renderToString)\nclass=\"x\"                className=\"x\"                         class 를 쓰면 경고 'Invalid DOM property `class`. Did you mean `className`?' (렌더는 됨)\nfor=\"id\"                 htmlFor=\"id\"\nstyle=\"font-size:12px\"   style={{ fontSize: 12 }}              fontSize:12 → 12px · lineHeight:1.5 → 1.5 (단위 없음) · '--gap':4 → --gap:4 · width:'50%' 그대로\nonclick=\"…\"              onClick={fn} · onClickCapture\ndisabled                 disabled={true}                       disabled=\"\" · hidden={false} 빠짐 · data-x={null} 빠짐 · aria-hidden={true} → \"true\"\ninnerHTML                dangerouslySetInnerHTML={{ __html }}   children 과 같이 쓰면 THROWS 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'\n<img src=\"\">             —                                     경고 'An empty string (\"\") was passed to the src attribute…' · 속성 생략\n<my-el class=\"c\">        <my-el class=\"c\" someProp={obj}>      class 그대로 · 객체 prop 은 서버 HTML 에 안 나옴 (프로퍼티)",
        codeLang: "text",
        terms: [
          {
            term: "ref 콜백과 정리 함수 (React 19)",
            body: "ref에 함수를 넘기면 DOM 노드가 붙을 때 그 노드로 부릅니다. React 19부터 그 함수가 정리 함수를 반환하면 노드가 떨어질 때 정리 함수를 부르고, 반환하지 않으면 예전처럼 null로 한 번 더 부릅니다. 실제로 돌려 보면(상호작용성 노드) 붙음 DIV, 떼어짐 null이었습니다. StrictMode에서는 개발 모드에 한 번 더 붙이고 뗍니다.",
          },
        ],
      },
      {
        label: "무엇이 들어 있나: 폼 요소의 제어와 비제어",
        body: "<input> <select> <textarea>에 value(체크박스·라디오는 checked)를 넘기면 '제어' 컴포넌트입니다. React가 값의 주인이라 onChange로 state를 바꿔 주지 않으면 사용자가 타이핑해도 그대로입니다. defaultValue·defaultChecked는 '비제어'로 초깃값만 주고 DOM이 주인입니다. 문서의 규칙은 넷입니다. 둘을 동시에 못 쓴다, 수명 중에 바꿀 수 없다, 제어하면 onChange가 '동기로' 값을 갱신해야 한다, 제어 값은 문자열이어야 한다(null·undefined 금지, value={v ?? ''}). <textarea>는 children 대신 value·defaultValue, <select>는 <option selected> 대신 select의 value(multiple이면 배열), 체크박스는 value 아니라 checked. <form action>은 URL이면 HTML 그대로, 함수면 React가 전환 안에서 FormData로 부릅니다. <button formAction>이 form의 action을 덮습니다. 실제로 돌려 보면 서버 렌더에서 action 함수는 action=\"javascript:throw new Error('React form unexpectedly submitted.')\"와 제출을 붙잡아 두는 인라인 <script>로 나왔습니다. 하이드레이션 전 제출을 잃지 않기 위한 장치입니다.",
        code: "// 제어 (React 가 주인) — onChange 가 없으면 읽기 전용\n<input value={q} onChange={e => setQ(e.target.value)} />\n// 경고 (실제로 돌려 보면): 'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.\n//   If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.'\n\n// 비제어 (DOM 이 주인) — 초깃값만\n<input defaultValue=\"처음\" name=\"q\" />          // FormData 로 읽는다 · 액션 뒤 리셋됨\n\n// textarea · select · checkbox\n<textarea value={t} onChange={…} />            // children 을 넣으면 경고 'Use the `defaultValue` or `value` props instead of setting children on <textarea>.'\n<select value=\"b\" onChange={…}><option value=\"a\">A</option><option value=\"b\">B</option></select>   // → <option value=\"b\" selected=\"\">\n<input type=\"checkbox\" checked={on} onChange={…} />   // value 가 아니라 checked\n\n// form action — 함수를 넘기면 서버 HTML 은\n<form action=\"javascript:throw new Error('React form unexpectedly submitted.')\">…</form><script>addEventListener(\"submit\",…$$reactFormReplay…)</script>",
        terms: [
          {
            term: "제어 컴포넌트 (controlled)",
            body: "값의 주인이 React state인 폼 요소입니다. value={state}와 onChange={e => setState(e.target.value)}가 짝입니다. 주인이 state라서 검증·포맷·연동이 쉽지만, onChange를 빼면 사용자가 타이핑해도 value가 돌아와 '읽기 전용'이 됩니다. 반대인 비제어는 DOM이 주인이라 defaultValue만 주고 FormData나 ref로 읽습니다. 하나의 요소를 제어에서 비제어로 바꾸면 'A component is changing an uncontrolled input to be controlled' 경고입니다.",
          },
        ],
      },
      {
        label: "무엇이 들어 있나: head 로 올라가는 다섯 (19)",
        body: "React 19에서 <title> <meta> <link> <script> <style>은 '어디서 렌더해도' React가 <head>에 넣습니다. 조건이 있습니다. <title>은 늘(단, <svg> 안이나 itemProp이면 제외) 올라가고 자식은 문자열 하나여야 합니다. <meta>는 늘(itemProp 제외). <link>는 rel=\"stylesheet\"면 precedence가 있어야 특별 취급(없으면 제자리, 아무 특별 동작 없음), onLoad·onError·itemProp이 있으면 제자리. 스타일시트는 로드될 때까지 Suspense처럼 멈추고 같은 href는 하나로 합칩니다. <style>은 href와 precedence 둘 다 있을 때만 올라가고 합쳐집니다. <script>는 src와 async={true}일 때만 올라가고 같은 src는 하나로. 인라인 스크립트는 제자리이고 중복 제거도 없습니다. 공통 주의 사항은 '렌더된 뒤 props 변경은 무시한다', '컴포넌트가 언마운트돼도 DOM에 남을 수 있다'입니다. 실제로 돌려 보면 그대로였습니다. 클라이언트에서도 <title>을 렌더하니 document.title이 바뀌고 div 안에는 title이 남지 않았습니다.",
        code: "// 깊은 컴포넌트가 이걸 렌더하면 (Node 24 · renderToString)\n<section>\n  <title>깊은 곳의 제목</title>  <meta name=\"description\" content=\"설명\" />\n  <link rel=\"stylesheet\" href=\"/a.css\" precedence=\"default\" />   <link rel=\"stylesheet\" href=\"/plain.css\" />\n  <style href=\"theme\" precedence=\"high\">.x{color:red}</style>\n  <script src=\"/lib.js\" async />  <script src=\"/lib.js\" async />  <script>console.log(1)</script>\n  <p>본문</p>\n</section>\n\n// 결과\n<head>\n  <link rel=\"stylesheet\" href=\"/a.css\" data-precedence=\"default\"/>     ← precedence 있음 → head\n  <style data-precedence=\"high\" data-href=\"theme\">.x{color:red}</style>\n  <script src=\"/lib.js\" async=\"\"></script>                            ← 둘 → 하나\n  <title>깊은 곳의 제목</title><meta name=\"description\" content=\"설명\"/>\n</head>\n<body><main><section>\n  <link rel=\"stylesheet\" href=\"/plain.css\"/>                          ← precedence 없음 → 제자리\n  <script>console.log(1)</script>                                     ← 인라인 → 제자리\n  <p>본문</p>\n</section></main></body>\n\n// <title>Results page {n}</title> 처럼 자식이 배열이면\n// 경고: 'React expects the `children` prop of <title> tags to be a string, number, bigint, or object with a novel `toString` method but found an Array…'\n<title>{`Results page ${n}`}</title>   // ✓ 문자열 하나로",
        terms: [
          {
            term: "precedence (우선순위)",
            body: "<link rel=\"stylesheet\">와 <style>에 주는 React 전용 prop으로, head 안에서 스타일시트의 순서(캐스케이드)를 정하는 묶음 이름입니다(예: 'reset' < 'low' < 'default' < 'high'). 같은 precedence는 함께 놓이고 먼저 나온 묶음이 앞에 갑니다. 이 prop이 있어야 React가 그 스타일시트를 '관리하는 리소스'로 보아 head로 올리고, 로드될 때까지 멈추고, 중복을 합칩니다. 없으면 보통 태그처럼 제자리에 둡니다. 서버 HTML에는 data-precedence로 남습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: HTML 과 다른 자리들",
        body: "위 셋을 Node의 renderToString과 Chrome에서 확인했습니다. 호이스팅은 표대로였고, class를 쓰면 'Invalid DOM property class. Did you mean className?' 경고가 나되 class=\"x\"로 렌더는 됐습니다. style 객체의 숫자는 px가 붙고 lineHeight·커스텀 프로퍼티(--gap)는 안 붙습니다. disabled={true}는 disabled=\"\", hidden={false}와 null 속성은 빠지고, aria-hidden={true}는 \"true\" 문자열입니다. dangerouslySetInnerHTML과 children을 같이 넘기면 던집니다. <img src=\"\">는 속성이 빠지고 경고가 납니다. <textarea>텍스트</textarea>는 경고, value=\"v\"는 <textarea>v</textarea>로, <select value=\"b\">는 두 번째 option에 selected=\"\"가 붙습니다. value만 있고 onChange가 없는 input은 그 긴 경고를 냅니다. form action 함수는 javascript: URL과 재생 스크립트로 나왔고, 커스텀 엘리먼트의 class는 그대로, 객체 prop은 서버 HTML에 나오지 않습니다(클라이언트에서 프로퍼티로 넣음).",
        code: "className 대신 class    → <div class=\"x\">  + 경고 Invalid DOM property `class`. Did you mean `className`?\nstyle 숫자              → font-size:12px · line-height:1.5 · --gap:4 · width:50%\n불리언·null             → <input disabled=\"\" aria-hidden=\"true\"/>   (hidden={false} · data-x={null} 생략)\ninnerHTML + children    → THROWS Can only set one of `children` or `props.dangerouslySetInnerHTML`.\n<img src=\"\">            → <img alt=\"\"/> + 경고 An empty string (\"\") was passed to the src attribute…\ntextarea children       → 경고 Use the `defaultValue` or `value` props instead of setting children on <textarea>.\nselect value=\"b\"        → <option value=\"b\" selected=\"\">B</option>\ninput value, onChange X  → 경고 You provided a `value` prop to a form field without an `onChange` handler…\nform action={fn}        → action=\"javascript:throw new Error('React form unexpectedly submitted.')\" + <script>…$$reactFormReplay…</script>\n<my-el class someProp>  → <my-el class=\"c\"></my-el>   (객체 prop 은 클라이언트에서 프로퍼티)\n클라이언트 <title>       → document.title 바뀜 · div 안에 title 없음",
        codeLang: "text",
      },
      {
        label: "문제: 검색창에 타이핑이 안 된다",
        body: "<input value={query} />를 렌더했는데 키보드를 눌러도 글자가 안 들어갑니다. 콘솔에 'You provided a value prop to a form field without an onChange handler. This will render a read-only field.'가 떠 있습니다. value를 넘긴 순간 React가 값의 주인이 되어, 매 렌더 DOM의 값을 query로 되돌립니다. onChange로 query를 바꿔 주지 않으니 늘 처음 값입니다. 처방은 둘 중 하나입니다. 제어하려면 onChange={e => setQuery(e.target.value)}를 붙이고(동기로), 그냥 초깃값만 주려면 defaultValue={query}로 바꿔 DOM에 맡깁니다. 읽기 전용이 의도면 readOnly를 붙여 경고를 끕니다. 같은 요소를 비제어로 시작해 나중에 value를 주면 '바꾸고 있다' 경고가 납니다. 처음부터 하나로 정합니다.",
      },
      {
        label: "문제가 나는 경우: HTML 습관이 그대로 올 때",
        body: "경우 ㄱ, value만 있고 onChange가 없습니다. 위의 사고입니다. 경우 ㄴ, value={null}입니다. undefined·null은 '비제어'로 해석돼 나중에 문자열을 주면 전환 경고입니다. value={v ?? ''}. 경우 ㄷ, <textarea>글</textarea>, <option selected>, 체크박스에 value입니다. 각각 value/defaultValue, select의 value, checked로. 경우 ㄹ, class·for·tabindex입니다. 경고와 함께 렌더되지만(class) 또는 무시되거나(tabindex는 소문자라 커스텀 속성으로 들어감) 합니다. camelCase로. 경우 ㅁ, style 문자열입니다. style=\"color:red\"는 에러입니다. 객체로. 경우 ㅂ, dangerouslySetInnerHTML에 사용자 입력입니다. XSS입니다. 신뢰하고 소독한 HTML에만. children과 같이 쓰면 던집니다. 경우 ㅅ, precedence 없는 <link rel=stylesheet>를 깊은 컴포넌트에 둡니다. head로 안 올라가고 제자리에 남아 중복되고 로드도 기다리지 않습니다. precedence를 줍니다. 경우 ㅇ, <title>에 식을 섞습니다. 자식이 배열이 되어 경고. 템플릿 문자열 하나로. 경우 ㅈ, 호이스팅된 <link>·<script>의 props를 바꿉니다. 렌더 뒤 변경은 무시됩니다. 경우 ㅊ, 언마운트하면 스타일이 사라질 거라 믿습니다. React가 DOM에 남길 수 있습니다. 경우 ㅋ, <img src=\"\">입니다. 브라우저가 페이지를 다시 받을 수 있어 React가 속성을 빼고 경고합니다. 조건부 렌더로. 경우 ㅌ, 커스텀 엘리먼트에 className을 씁니다. 커스텀 엘리먼트는 class를 그대로 받고, 이벤트는 onspeak처럼 소문자 그대로입니다. 경우 ㅍ, suppressHydrationWarning을 트리 위에 하나 걸고 다 끄려 합니다. 한 단계만 먹고, 텍스트 불일치는 고쳐 주지도 않습니다.",
        code: "경우               언제 생기나                          겉모습                                   들통나는 때\nㄱ onChange 없음     <input value={q}>                     타이핑 안 됨 · 긴 경고                     첫 입력\nㄴ value null       value={maybe}                        비제어→제어 전환 경고                       값이 들어올 때\nㄷ HTML 습관        textarea children · option selected · checkbox value   경고 · 선택 안 됨            렌더\nㄹ class·for        HTML 속성 이름                        경고 (class) · 무시 (for)                  콘솔\nㅁ style 문자열      style=\"…\"                            에러 'The `style` prop expects a mapping…'    렌더\nㅂ innerHTML 입력    사용자 HTML 을 __html 로               XSS · children 과 함께면 throw               보안 점검\nㅅ precedence 없음   깊은 곳 <link rel=stylesheet>           제자리 · 중복 · 안 기다림                   DOM 검사\nㅇ title 식          <title>a {n}</title>                   경고 · 'a [object]' 같은 제목               탭 제목\nㅈ 호이스트 props 변경  href 바꾸기                          무시                                    테마 전환\nㅊ 언마운트 기대      스타일이 사라질 거라                    남아 있음                                페이지 이동\nㅋ img src \"\"       src={maybeEmpty}                      속성 생략 · 경고                           빈 데이터\nㅌ 커스텀 엘리먼트    className · onSpeak                   class 안 들어감 · 이벤트 안 옴               웹 컴포넌트\nㅍ suppressHydrationWarning  트리 위에 하나                 한 단계만 · 텍스트 불일치 안 고침             SSR",
        codeLang: "text",
      },
      {
        label: "문제의 구조: React 는 DOM 의 '주인' 이 되려 하고, HTML 은 자기 방식이 있다",
        body: "React는 DOM을 자기 선언의 결과로 유지하려 합니다. 그래서 속성은 자기 이름(camelCase)으로 받고(ㄹ, ㅁ), 폼 값은 value를 주면 자기가 주인이 되고(ㄱ, ㄴ, ㄷ), head의 리소스는 조건이 맞으면 자기가 관리합니다(ㅅ, ㅈ, ㅊ). 사고는 HTML의 방식(선언적 속성, DOM이 값을 가짐, 태그가 있는 자리에 그려짐)을 그대로 가져올 때 납니다. 반대로 React가 주인이 되기를 포기하는 자리도 있습니다. defaultValue(비제어), precedence 없는 link(보통 태그), dangerouslySetInnerHTML(내용은 네가 책임), 커스텀 엘리먼트(브라우저 방식 그대로, ㅌ). 처방은 '이 속성의 주인이 누군가'를 먼저 정하는 것입니다. React면 React의 이름과 규칙으로, DOM이면 default·ref·HTML 그대로.",
        code: "주인이 React                                주인이 DOM / 브라우저\n속성   className · htmlFor · style 객체 (ㄹ ㅁ)      커스텀 엘리먼트의 class · onspeak (ㅌ)\n폼값   value + onChange (ㄱ ㄴ ㄷ)                  defaultValue · FormData · ref\nhead  title · meta · link+precedence · style+href+precedence · script async src (ㅅ ㅈ ㅊ)   precedence 없는 link · 인라인 script\n내용   children (텍스트는 이스케이프)                  dangerouslySetInnerHTML (ㅂ)\n\n먼저 묻기: 이 값의 주인은 누군가? → React 면 React 의 이름·규칙 / DOM 이면 default·ref·HTML 그대로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 'React DOM API'는 컴포넌트가 아닌 함수들입니다. createPortal(다른 DOM 자리에, 이벤트는 React 트리로), flushSync(지금 당장 커밋), 리소스 힌트 여섯(preconnect, prefetchDNS, preload, preloadModule, preinit, preinitModule). 실제로 돌려 보면 렌더 중 부른 힌트가 서버 HTML의 <head>에 <link rel=preload>로 나왔고 클라이언트에서는 중복이 하나로 합쳐졌습니다.",
      },
      {
        label: "확인 질문",
        body: "상품 상세 컴포넌트가 (1) 탭 제목을 '상품명 | 가게'로 바꾸고, (2) 이 페이지에서만 쓰는 CSS 파일을 붙이고, (3) 리뷰 수 입력 필터 <input>을 두려 합니다. 각각 어떻게 쓰고, 무엇을 조심할까요?",
        notes: [
          {
            title: "답",
            body: "(1) 컴포넌트 안에서 <title>{`${name} | ${shop}`}</title>을 렌더합니다. 19는 어디서 렌더해도 head로 올립니다. 자식은 문자열 하나여야 하므로 템플릿 문자열로 합칩니다. {name} | {shop}처럼 식을 섞으면 배열이 되어 경고입니다. 동시에 title은 하나만 렌더합니다. (2) <link rel=\"stylesheet\" href=\"/product.css\" precedence=\"default\" />. precedence가 있어야 head로 올라가고, 로드될 때까지 기다리고, 같은 href가 여럿이어도 하나로 합쳐집니다. 없으면 제자리에 보통 태그로 남습니다. 렌더 뒤 href를 바꿔도 무시되고 언마운트 뒤에도 남을 수 있음을 염두에 둡니다. (3) 제어할지 정합니다. 필터 값으로 즉시 목록을 걸러야 하면 <input type=\"number\" value={min} onChange={e => setMin(e.target.value)} />로 제어하고, value는 문자열(빈 값은 '')로 유지합니다. 폼 제출 때만 읽으면 defaultValue와 FormData로 비제어가 간단합니다. onChange 없는 value는 읽기 전용 경고입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "React DOM Components", href: `${DOCS}/reference/react-dom/components` },
      { label: "Common components", href: `${DOCS}/reference/react-dom/components/common` },
      { label: "<input>", href: `${DOCS}/reference/react-dom/components/input` },
      { label: "<form>", href: `${DOCS}/reference/react-dom/components/form` },
      { label: "<link>", href: `${DOCS}/reference/react-dom/components/link` },
      { label: "<script>", href: `${DOCS}/reference/react-dom/components/script` },
      { label: "<title>", href: `${DOCS}/reference/react-dom/components/title` },
    ],
  },

  {
    id: "ra-dom-apis",
    name: "React DOM API",
    tagline: "다른 자리에 그리기(createPortal), 지금 커밋(flushSync), 미리 받기(preload·preinit…)",
    intro:
      "참고서의 react-dom API입니다. createPortal(자식을 다른 DOM 노드에 그리되 React 트리는 그대로), flushSync(콜백 안의 갱신을 동기로 즉시 커밋), 그리고 리소스 힌트 여섯(prefetchDNS, preconnect, preload, preloadModule, preinit, preinitModule), 드물게 requestFormReset. 문서는 리소스 힌트에 대해 '프레임워크가 대신 처리하는 경우가 많아 직접 부를 일이 없을 수 있다'고 적습니다. 실제로 돌려 보면 포털 안 버튼의 클릭은 DOM 부모가 아니라 React 부모의 onClick으로 먼저 올라갔고, flushSync 뒤에는 DOM이 바로 바뀌어 있었고(없으면 아직 옛 값), 렌더 중 부른 preload는 서버 HTML의 <head>에 <link rel=\"preload\">로 나왔습니다. 이 노드의 질문은 하나입니다. React 트리 밖의 DOM과 시간을 어떻게 다루는가.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "createPortal(children, domNode, key?)는 children을 domNode 안에 그립니다. React 트리에서는 원래 자리의 자식이라 컨텍스트를 읽고 이벤트도 React 부모로 버블링합니다. 모달·툴팁·드롭다운처럼 overflow나 z-index 때문에 바깥에 그려야 할 때 씁니다. flushSync(callback)는 콜백 안의 갱신을 묶어 즉시 동기로 커밋합니다. 문서의 주의 사항은 '성능을 크게 해친다. 드물게', 'Suspense 경계를 fallback으로 강제할 수 있다', '대기 중인 Effect를 돌릴 수 있다'입니다. 전형은 window.print 직전처럼 브라우저 API가 DOM을 읽기 전에 반영이 끝나야 할 때입니다. 리소스 힌트는 일찍 받기입니다. prefetchDNS(href) DNS만, preconnect(href) 연결까지, preload(href, { as }) 받기만(as 필수: font, image, script, style, fetch…), preloadModule(href, { as: 'script' }) ESM 받기만, preinit(href, { as: 'script' | 'style', precedence }) 받고 실행(스크립트)·삽입(스타일시트), preinitModule ESM 받고 실행. 브라우저에서는 렌더 중·Effect·이벤트 어디서든 부를 수 있고, 서버에서는 렌더 중(또는 렌더에서 시작된 비동기 작업)에 부른 것만 HTML에 들어갑니다. 같은 href는 하나로 합쳐집니다. requestFormReset(form)은 직접 만든 액션에서 React의 폼 리셋을 요청합니다.",
        code: "API                            하는 일                                        어디서\ncreatePortal(children, node, key?)   node 안에 그린다 · 컨텍스트·이벤트는 React 트리         렌더 결과로 반환 · 서버 X\nflushSync(cb)                   cb 안 갱신을 지금 동기 커밋                        이벤트·바깥 코드 · 렌더·Effect 안 X\nprefetchDNS(href)               DNS 조회 힌트                                      렌더 중·Effect·이벤트 (서버는 렌더 중만)\npreconnect(href)                연결까지\npreload(href, { as, … })        받기만 (as 필수) · 폰트는 crossOrigin\npreloadModule(href, { as:'script' })  ESM 받기만\npreinit(href, { as, precedence })  받고 실행 (script) / 삽입 (style, precedence 필수)\npreinitModule(href, { as:'script' })  ESM 받고 실행\nrequestFormReset(form)          커스텀 액션에서 폼 리셋 요청                        전환 안에서",
        codeLang: "text",
        terms: [
          {
            term: "포털 (portal)",
            body: "React 트리의 위치와 DOM의 위치를 떼어 놓는 장치입니다. createPortal(<Modal/>, document.body)는 Modal을 body 끝에 그리지만, React에서는 createPortal을 반환한 컴포넌트의 자식입니다. 그래서 그 컴포넌트가 제공하는 컨텍스트를 읽고, 클릭 같은 이벤트는 React 부모의 onClick으로 올라갑니다. 실제로 돌려 보면 포털 안 버튼 클릭이 React 부모 div의 onClick → DOM 부모 리스너 순이었고, 포털 안에서 바깥 Provider의 값을 읽었습니다. 서버에서는 DOM 노드가 없어 쓸 수 없습니다.",
          },
          {
            term: "preload 와 preinit 의 차이",
            body: "preload는 '받아 두기만'입니다. 스크립트면 실행하지 않고 스타일시트면 적용하지 않고 캐시에 둡니다. 나중에 실제 <script>·<link>가 나올 때 즉시 쓰입니다. preinit은 '받고 바로 쓰기'입니다. 스크립트는 받자마자 실행하고 스타일시트는 문서에 삽입합니다. 그래서 preinit 스타일시트에는 precedence가 필수입니다. 실제로 돌려 보면 preinit(css)는 head에 <link rel=\"stylesheet\" data-precedence>로, preinit(js)는 <script async>로, preload(font)는 <link rel=\"preload\" as=\"font\">로 나왔습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "포털: <div onClick={부모}>{createPortal(<button/>, document.body)}</div>에서 버튼을 누르니 순서가 '포털 안 버튼 → React 부모 div onClick → DOM 부모 리스너'였고 nativeEvent는 PointerEvent, 포털 안 컴포넌트가 바깥 <Ctx value=\"포털도 읽음\">의 값을 읽었습니다. 서버에서 createPortal을 렌더하니 'Target container is not a DOM element.'를 던졌습니다. flushSync: set(1) 직후 DOM은 n=0이었고(비동기 묶음), flushSync(() => set(2)) 직후에는 n=2였습니다. Effect 안에서 flushSync를 부르니 'flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.' 경고입니다. 리소스 힌트: 서버 렌더 중 preconnect·prefetchDNS·preload(font)·preinit(css)·preinit(js)를 부르니 <head>에 그 순서로 <link rel=\"preconnect\">, <link rel=\"dns-prefetch\">, <link rel=\"preload\" as=\"font\" crossorigin>, <link rel=\"stylesheet\" data-precedence>, <script async>가 들어갔습니다. 클라이언트에서 같은 preload를 두 번 부르니 <link>는 하나, preinit(css)는 data-precedence 스타일시트로 head에 들어갔습니다(head 증가 2). root.unmount 뒤 render는 'Cannot update an unmounted root.'입니다.",
        code: "// 포털 (Chrome 156)\n클릭 순서:  포털 안 버튼 → React 부모 <div onClick> → DOM 부모 addEventListener      · 컨텍스트: '포털도 읽음'\n서버:      renderToString(createPortal(…))  → THROWS Target container is not a DOM element.\n\n// flushSync\nset(1);                 el.textContent  → 'n=0'   (아직)\nflushSync(() => set(2)); el.textContent → 'n=2'   (바로)\nuseEffect(() => flushSync(…))  → 경고 flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering…\n\n// 리소스 힌트 — 서버 렌더 중 (Node 24)\n<head><link rel=\"preconnect\" href=\"https://api.example.com\"/><link href=\"https://cdn.example.com\" rel=\"dns-prefetch\"/><link rel=\"preload\" href=\"/font.woff2\" as=\"font\" crossorigin=\"\"/><link rel=\"stylesheet\" href=\"/init.css\" data-precedence=\"default\"/><script src=\"/init.js\" async=\"\"></script></head>\n// 클라이언트\npreload(font) ×2 → <link rel=\"preload\"> 1개 · preinit(css) → <link rel=\"stylesheet\" data-precedence=\"default\">   (head +2)",
      },
      {
        label: "문제: 인쇄 미리보기에 '인쇄용 레이아웃' 이 안 나온다",
        body: "window.print() 직전에 setIsPrinting(true)를 불러 인쇄용 클래스를 붙이려 했습니다. 미리보기는 화면용 레이아웃으로 뜹니다. setState는 묶여서 다음 틱에 커밋되는데 print()는 지금 당장 DOM을 읽기 때문입니다. 실제로 돌려 보면 set 직후 DOM은 옛 값이었습니다. 처방은 flushSync(() => setIsPrinting(true)) 뒤 print()입니다. flushSync는 콜백 안의 갱신을 동기로 커밋하므로 다음 줄에서 DOM이 바뀌어 있습니다(실제로 n=2). 문서의 예제도 onbeforeprint에서 이렇게 씁니다. 대신 성능 비용이 있고, Suspense를 fallback으로 보일 수 있으니 브라우저 API나 서드파티가 '지금' DOM을 읽는 자리에만 씁니다. 렌더나 Effect 안에서 부르면 React가 이미 렌더 중이라 경고입니다.",
      },
      {
        label: "문제가 나는 경우: 트리 밖과 시간을 잘못 다룰 때",
        body: "경우 ㄱ, print 전 flushSync 없음입니다. 위의 사고입니다. 경우 ㄴ, flushSync를 Effect·렌더 안에서 부릅니다. 'called from inside a lifecycle method' 경고. 이벤트나 바깥 콜백에서. 경우 ㄷ, 모든 setState를 flushSync로 감쌉니다. 묶음이 깨져 렌더가 늘고, Suspense가 fallback으로 튑니다. 경우 ㄹ, 포털 안 클릭이 '바깥 클릭'으로 잡힙니다. 모달을 포털로 띄우고 document에 '밖을 누르면 닫기' 리스너를 달면, DOM상 모달은 body 자식이라 '밖'으로 보입니다. React 트리 기준으로 처리(onClick 버블링을 쓰거나 stopPropagation)하거나 contains로 걸러야 합니다. 경우 ㅁ, 포털 이벤트가 React 부모로도 올라간다는 걸 모릅니다. 카드의 onClick이 모달 안 클릭에도 울립니다. 포털 루트에서 stopPropagation. 경우 ㅂ, 서버에서 createPortal입니다. DOM 노드가 없어 던집니다. 클라이언트에서만(마운트 뒤 state로). 경우 ㅅ, 포털 대상 노드가 아직 없습니다. domNode는 이미 존재해야 하고, 바뀌면 내용이 다시 만들어집니다. 경우 ㅇ, 포털 모달의 접근성입니다. 포커스 트랩·aria-modal·Esc는 포털이 안 해 줍니다. 경우 ㅈ, preload에 as가 없습니다. 아무 일도 안 합니다. as는 필수. 폰트는 crossOrigin도. 경우 ㅊ, preinit(css)에 precedence가 없습니다. 삽입 위치를 못 정해 무시됩니다. 경우 ㅋ, 서버에서 Effect·이벤트에서 힌트를 부릅니다. 렌더 중에 부른 것만 HTML에 들어갑니다. 경우 ㅌ, 프레임워크가 이미 하는 preload를 또 합니다. Next·Remix 같은 프레임워크는 라우트 기준으로 힌트를 넣습니다. 중복은 합쳐지지만 불필요합니다.",
        code: "경우               언제 생기나                         겉모습                                  들통나는 때\nㄱ print 전 비동기    set 뒤 바로 print()                  화면용 레이아웃이 인쇄됨                  인쇄\nㄴ Effect 안 flushSync  useEffect(() => flushSync(…))      경고 · 무시                             콘솔\nㄷ flushSync 남발     모든 set 을 감쌈                     렌더 증가 · Suspense fallback 깜빡          성능\nㄹ 밖 클릭 오판       포털 모달 + document 리스너           모달 안을 눌러도 닫힘                     모달\nㅁ 부모로 버블링      카드 onClick + 포털 모달               카드가 모달 클릭에 반응                   모달\nㅂ 서버 포털         SSR 에서 createPortal                 Target container is not a DOM element     SSR\nㅅ 노드 없음         아직 없는 node                        에러 · 내용 재생성                        마운트 순서\nㅇ 접근성            포커스·aria 없음                      키보드 사용자 갇힘/못 들어감                접근성 점검\nㅈ as 없음          preload(href)                        아무 일 없음                             네트워크 탭\nㅊ precedence 없음   preinit(css)                         무시                                    스타일 안 적용\nㅋ 서버 Effect 힌트   서버 Effect·이벤트                   HTML 에 안 들어감                         SSR\nㅌ 중복 힌트         프레임워크 + 직접                      합쳐지지만 불필요                         리뷰",
        codeLang: "text",
      },
      {
        label: "문제의 구조: React 트리와 DOM 트리, React 시간과 브라우저 시간이 어긋나는 자리",
        body: "셋은 전부 '어긋남'을 다루는 도구입니다. createPortal은 React 트리와 DOM 트리의 위치를 떼어 놓습니다. 그래서 이벤트·컨텍스트는 React 트리를 따르고(ㄹ, ㅁ), DOM만 다른 곳에 있고(ㅂ, ㅅ), 접근성은 DOM 위치 기준이라 손봐야 합니다(ㅇ). flushSync는 React의 묶음 시간과 브라우저가 '지금' DOM을 읽는 시간을 맞춥니다. 그래서 바깥에서만 뜻이 있고(ㄴ), 남발하면 묶음의 이득이 사라집니다(ㄷ). 리소스 힌트는 '브라우저가 받을 시점'을 React 렌더 시점으로 앞당깁니다. 그래서 as·precedence 같은 '어떻게 쓸지'가 필요하고(ㅈ, ㅊ), 서버에서는 HTML을 만드는 렌더 중에만 들어갈 수 있습니다(ㅋ). 처방은 어긋남을 인정한 자리에서만 쓰는 것입니다. 포털은 React 트리 기준으로 생각하고, flushSync는 브라우저가 지금 읽는 그 줄 앞에서만, 힌트는 프레임워크가 안 하는 것만.",
        code: "도구            어긋나는 것                        따라야 할 기준                      사고\ncreatePortal    React 트리 위치 ≠ DOM 위치            이벤트·컨텍스트 = React 트리 / 접근성 = DOM    ㄹ ㅁ ㅂ ㅅ ㅇ\nflushSync       React 묶음 시간 ≠ 브라우저 '지금'       브라우저가 읽는 줄 바로 앞에서만               ㄱ ㄴ ㄷ\npreload/preinit  받는 시점 ≠ 쓰는 시점                 as · precedence 로 '어떻게 쓸지' · 서버는 렌더 중   ㅈ ㅊ ㅋ ㅌ",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 '클라이언트 API'는 React 트리를 브라우저에 붙이는 두 함수입니다. createRoot(빈 컨테이너)와 hydrateRoot(서버 HTML에). 옵션 onCaughtError·onUncaughtError·onRecoverableError·identifierPrefix. 실제로 돌려 보면 에러 경계가 잡은 에러는 onCaughtError로, 경계 없는 에러는 onUncaughtError로 왔고 화면은 비었으며, 하이드레이션 불일치는 onRecoverableError로 왔습니다.",
      },
      {
        label: "확인 질문",
        body: "상품 카드 목록이 있고 카드를 누르면 상세 모달이 뜹니다. (1) 모달을 어디에 그리고, (2) 모달 안을 눌렀는데 카드의 onClick이 또 울리는 문제를 어떻게 막고, (3) 모달이 열릴 때 바로 첫 입력에 포커스하고 그 입력의 위치를 재야 한다면?",
        notes: [
          {
            title: "답",
            body: "(1) createPortal(<Modal/>, document.body)로 body에 그립니다. 카드의 overflow·z-index·transform에 갇히지 않고, React 트리에서는 카드의 자식이라 카드가 제공하는 컨텍스트를 그대로 읽습니다. 서버 렌더가 있으면 마운트 뒤에만(isOpen state) 렌더합니다. (2) 포털 이벤트는 React 트리를 따라 카드의 onClick으로 올라갑니다. 실제로 돌려 보면 포털 안 버튼 → React 부모 onClick 순이었습니다. 모달 루트에 onClick={e => e.stopPropagation()}을 두거나, 카드의 onClick에서 e.currentTarget.contains(e.target)로 거릅니다. document 레벨의 '밖 클릭' 리스너는 DOM상 모달이 body 자식이라 '밖'으로 보이니 모달 노드 contains로 걸러야 합니다. (3) 포커스와 측정은 DOM이 있어야 하므로 ref와 useLayoutEffect(페인트 전)입니다. flushSync는 여기 필요 없습니다. flushSync가 필요한 자리는 setState 직후 같은 틱에서 브라우저 API(print, 서드파티 측정)가 DOM을 읽어야 할 때이고, 렌더·Effect 안에서는 경고입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "React DOM APIs", href: `${DOCS}/reference/react-dom` },
      { label: "createPortal", href: `${DOCS}/reference/react-dom/createPortal` },
      { label: "flushSync", href: `${DOCS}/reference/react-dom/flushSync` },
      { label: "preload", href: `${DOCS}/reference/react-dom/preload` },
      { label: "preinit", href: `${DOCS}/reference/react-dom/preinit` },
    ],
  },

  {
    id: "ra-dom-client",
    name: "클라이언트 API",
    tagline: "createRoot 와 hydrateRoot: 빈 자리에 그리기, 서버 HTML 에 붙이기",
    intro:
      "참고서의 react-dom/client입니다. 함수 둘입니다. createRoot(domNode, options?)는 비어 있는 DOM 노드에 React 트리를 그릴 뿌리를 만들고, hydrateRoot(domNode, reactNode, options?)는 서버가 만든 HTML에 React를 '붙입니다'. 둘 다 { render, unmount }를 돌려주고, 옵션은 onCaughtError(에러 경계가 잡은 에러), onUncaughtError(아무도 못 잡은 에러), onRecoverableError(React가 스스로 복구한 에러, 하이드레이션 불일치 등), identifierPrefix(useId 접두)입니다. 실제로 돌려 보면 경계가 잡은 에러는 onCaughtError로 componentStack과 함께, 경계 없는 에러는 onUncaughtError로 오고 화면은 비었습니다. 서버 HTML과 다른 props로 hydrateRoot하니 onRecoverableError로 'Hydration failed because the server rendered text didn't match the client…'가 왔고 화면은 클라이언트 값으로 다시 그려졌습니다. 이 노드의 질문은 하나입니다. 트리를 어디에 어떻게 붙이고, 에러는 어디로 가나.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "createRoot(domNode, options?) → root. root.render(reactNode)는 처음에 노드 안의 기존 HTML을 지우고 그립니다. 다시 부르면 갱신입니다. root.unmount()는 트리를 떼고 그 뒤 render하면 'Cannot update an unmounted root.'입니다. 문서의 주의 사항은 '서버 렌더 앱이면 createRoot가 아니라 hydrateRoot', '앱에 보통 createRoot 하나', '페이지 일부에 React를 뿌리는(sprinkles) 경우 뿌리를 여럿 둘 수 있다', '모달·툴팁에는 createRoot가 아니라 createPortal'입니다. hydrateRoot(domNode, reactNode, options?)는 서버 HTML이 이미 들어 있는 노드에 붙입니다. '렌더 결과가 서버 HTML과 동일하기를 기대한다. 불일치는 버그로 다루라', '개발 모드에서 경고하지만 속성 차이를 고쳐 준다는 보장은 없다', 'HTML 없는 클라이언트 앱에 hydrateRoot는 지원하지 않는다'. 흔한 불일치 원인은 루트 주변 공백, 렌더 중 typeof window 분기, 렌더 중 window.matchMedia 같은 브라우저 API, 서버와 다른 데이터입니다. 한 요소의 불일치만 끄려면 suppressHydrationWarning(한 단계만, 텍스트는 안 고침), 서버와 클라이언트가 다르게 그려야 하면 useEffect로 isClient를 세운 뒤 두 번 렌더합니다(느려짐). hydrateRoot 옵션에는 identifierPrefix(서버와 같아야 함)와 formState(useActionState 폼용, 프레임워크가 넘김)가 더 있습니다.",
        code: "import { createRoot, hydrateRoot } from 'react-dom/client';\n\n// 클라이언트만 — 빈 컨테이너\nconst root = createRoot(document.getElementById('root'), {\n  onCaughtError(error, info) { log('경계가 잡음', error, info.componentStack); },\n  onUncaughtError(error, info) { report(error); },\n  onRecoverableError(error, info) { trace('복구됨', error, error.cause); },\n  identifierPrefix: 'app-',\n});\nroot.render(<App />);     // 두 번째 부르면 갱신 · root.unmount() 뒤 render → 'Cannot update an unmounted root.'\n\n// 서버 HTML 에 붙이기\nhydrateRoot(document.getElementById('root'), <App />, { identifierPrefix: 'app-' /* 서버와 같게 */ });\n\n// 문제 해결 (문서) — 흔한 에러 문구\n'Target container is not a DOM element'            // getElementById 가 null · createRoot(<App/>) 로 잘못 넘김\n'Functions are not valid as a React child.'        // root.render(App)  → root.render(<App />)\n'You passed a second argument to root.render(...)'   // render 는 인자 하나",
        terms: [
          {
            term: "하이드레이션 (hydration)",
            body: "서버가 만든 HTML에 React가 이벤트 핸들러를 붙이고 내부 트리를 세워 상호작용하게 만드는 일입니다. React는 다시 그리지 않고 기존 DOM을 '자기 것으로 인정'합니다. 그래서 클라이언트 첫 렌더 결과가 서버 HTML과 같아야 합니다. 다르면 불일치이고, React 19는 그 트리를 클라이언트에서 다시 그린 뒤 onRecoverableError로 알립니다. 렌더링 노드 12장과 i18n 노드 12단계가 이 지점의 사고입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 에러 셋이 가는 곳",
        body: "createRoot에 세 핸들러를 달고 세 종류의 에러를 냈습니다. 에러 경계(getDerivedStateFromError) 안의 컴포넌트가 던지면 onCaughtError(error, info)로 오고 info.componentStack이 문자열이며, 화면은 경계의 '경계가 잡음: 렌더 중 폭발'이 보입니다. 경계 없이 던지면 onUncaughtError로 오고 화면은 빈 문자열(트리 전체가 내려감)입니다. 핸들러를 달았으니 console.error에는 안 찍힙니다. 서버 HTML(time='서버')에 다른 props(time='브라우저')로 hydrateRoot하니 onRecoverableError가 한 번 오고 첫 줄이 'Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client.'였고, 화면은 '렌더 시각: 브라우저', 그 뒤 버튼 클릭이 count: 1로 동작했습니다. 렌더 중 무한 setState는 onUncaughtError로 'Too many re-renders. React limits the number of renders to prevent an infinite loop.'입니다. useId는 createRoot에서 _r_0_, _r_1_ 꼴이고 서버는 _R_1_ 꼴로, identifierPrefix를 주면 그 앞에 붙습니다.",
        code: "// Chrome 156 · React 19.3.1\n경계 안에서 throw     → onCaughtError('렌더 중 폭발', info.componentStack: string)   화면 '경계가 잡음: 렌더 중 폭발'\n경계 없이 throw       → onUncaughtError('렌더 중 폭발')                           화면 ''  (트리 내려감) · console.error 없음 (핸들러가 받음)\n렌더 중 setState 무한  → onUncaughtError('Too many re-renders. React limits the number of renders to prevent an infinite loop.')\n\nhydrateRoot(서버 time='서버', 클라 time='브라우저')\n  → onRecoverableError ×1: 'Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client.'\n  → 화면 '렌더 시각: 브라우저' · 클릭 뒤 'count: 1'   (동작은 한다)\n\nroot.unmount(); root.render(…)   → THROWS Cannot update an unmounted root.\nuseId: 클라이언트 '_r_0_' '_r_1_' · 서버 '_R_1_' '_R_2_' · identifierPrefix 'app-' → 'app-_r_0_'",
      },
      {
        label: "문제: 배포 뒤 Sentry 에 아무것도 안 오는데 사용자는 흰 화면을 본다",
        body: "루트를 createRoot(el)로만 만들었고 에러 경계도 없습니다. 어떤 컴포넌트가 렌더 중 던지면 React는 트리 전체를 내리고(화면 ''), 기본 동작으로 reportError(window 'error' 이벤트)에 보고합니다. 전역 리스너가 없으면 로그는 콘솔에만 남고 모니터링에는 안 갑니다. 실제로 돌려 보면 경계 없는 에러는 화면이 빈 문자열이 됐습니다. 처방은 둘입니다. createRoot의 onUncaughtError(그리고 onCaughtError, onRecoverableError)에 모니터링을 연결해 셋을 구분해서 받습니다. 경계가 잡은 것은 '부분 장애', 못 잡은 것은 '전체 장애', 복구된 것은 '불일치·경고'입니다. 그리고 라우트·위젯 단위로 에러 경계를 두어 한 위젯의 에러가 전체를 내리지 않게 합니다. 실제로 돌려 보면 경계가 있으면 그 자리만 대체 UI가 보이고 onCaughtError로 componentStack이 함께 왔습니다.",
      },
      {
        label: "문제가 나는 경우: 뿌리를 잘못 다룰 때",
        body: "경우 ㄱ, 핸들러 없이 흰 화면입니다. 위의 사고입니다. 경우 ㄴ, 서버 HTML에 createRoot입니다. 서버 HTML을 지우고 처음부터 다시 그려 깜빡이고 느려집니다. hydrateRoot로. 경우 ㄷ, 빈 컨테이너에 hydrateRoot입니다. 붙일 것이 없어 불일치 경고 뒤 클라이언트 렌더. createRoot로. 경우 ㄹ, 불일치입니다. 날짜·난수·window 분기·다른 데이터·공백. onRecoverableError로 알리고 다시 그립니다. 동작은 하지만 두 번 그리고 깜빡입니다. 원인을 고치거나, 한 요소면 suppressHydrationWarning, 정말 다르면 isClient 두 단계. 경우 ㅁ, getElementById가 null입니다. 'Target container is not a DOM element'. 스크립트가 DOM보다 먼저 돌았거나 id 오타. 경우 ㅂ, root.render(App)입니다. 'Functions are not valid as a React child.' <App />로. 경우 ㅅ, 뿌리를 매 갱신 새로 만듭니다. createRoot를 반복 호출하면 state가 날아갑니다. 뿌리는 한 번, 갱신은 root.render. 경우 ㅇ, 모달마다 createRoot입니다. 컨텍스트가 끊기고 이벤트가 안 올라갑니다. createPortal로. 경우 ㅈ, unmount 뒤 render입니다. 'Cannot update an unmounted root.' 새 뿌리를 만듭니다. 경우 ㅊ, identifierPrefix가 서버와 다릅니다. useId가 어긋나 aria 연결이 깨지고 불일치가 납니다. 경우 ㅋ, 하이드레이션 끝나기 전 root.render입니다. 서버 HTML을 버리고 클라이언트 렌더로 전환합니다. 경우 ㅌ, onRecoverableError를 무시합니다. 불일치가 조용히 쌓입니다. 적어도 로그로.",
        code: "경우               언제 생기나                         겉모습                                       들통나는 때\nㄱ 핸들러 없음       createRoot(el) 만                   흰 화면 · 모니터링 없음                        운영\nㄴ 서버 HTML 에 createRoot  SSR 앱에서                   지우고 다시 그림 · 깜빡 · 느림                   첫 로드\nㄷ 빈 곳에 hydrateRoot  CSR 앱에서                       불일치 경고 뒤 클라이언트 렌더                   첫 로드\nㄹ 불일치            날짜·난수·window·데이터·공백           onRecoverableError · 두 번 그림                 SSR\nㅁ null 컨테이너      id 오타 · 스크립트가 먼저             Target container is not a DOM element           바로\nㅂ 함수 넘김         root.render(App)                    Functions are not valid as a React child.       바로\nㅅ 뿌리 반복 생성     갱신마다 createRoot                  state 초기화                                  갱신\nㅇ 모달마다 뿌리      createRoot(modalEl)                 컨텍스트 끊김 · 이벤트 안 옴                      모달\nㅈ unmount 뒤 render  떼고 다시                           Cannot update an unmounted root.                바로\nㅊ prefix 불일치      서버·클라 identifierPrefix 다름        useId 어긋남 · aria 깨짐                        접근성\nㅋ 하이드레이션 중 render  바로 root.render               서버 HTML 폐기                                  첫 로드\nㅌ 복구 에러 무시      onRecoverableError 안 봄             불일치 누적                                   나중",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 뿌리는 하나의 '계약' 이고, 에러는 세 층으로 나간다",
        body: "뿌리(root)는 React와 DOM 노드 사이의 계약입니다. createRoot는 '이 노드는 내가 비우고 채운다', hydrateRoot는 '이 노드의 HTML은 내 첫 렌더와 같다'입니다. 계약을 어기면 전자는 state 초기화·컨텍스트 단절(ㅅ, ㅇ), 후자는 불일치(ㄴ, ㄷ, ㄹ, ㅊ, ㅋ)입니다. 그리고 트리 안에서 난 에러는 세 층으로 나갑니다. 경계가 잡으면 onCaughtError(부분 장애, 대체 UI), 아무도 못 잡으면 onUncaughtError(전체 장애, 빈 화면), React가 스스로 복구하면 onRecoverableError(불일치 등, 동작은 함). 셋을 구분해 받지 않으면 전체 장애가 조용히 지나갑니다(ㄱ, ㅌ). 처방은 뿌리를 한 번 만들고(갱신은 render), 서버 HTML이면 hydrateRoot, 세 핸들러를 모니터링에 연결하고, 경계를 라우트·위젯 단위로 두는 것입니다.",
        code: "계약\ncreateRoot(el)         '이 노드는 내가 비우고 채운다'   → 어기면 state 초기화·컨텍스트 단절 (ㅅ ㅇ) · 서버 HTML 폐기 (ㄴ)\nhydrateRoot(el, node)  '이 HTML = 내 첫 렌더'          → 어기면 불일치 (ㄷ ㄹ ㅊ ㅋ) → 다시 그림 + onRecoverableError\n\n에러 세 층\n경계가 잡음      → onCaughtError(error, { componentStack })     부분 장애 · 대체 UI 보임\n아무도 못 잡음   → onUncaughtError                              전체 장애 · 화면 ''  (ㄱ)\n스스로 복구      → onRecoverableError (error.cause)             불일치 · 동작은 함 (ㅌ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "hydrateRoot가 받는 HTML은 서버 API가 만듭니다. 다음 노드 '서버 API'는 renderToString(한 번에, Suspense 못 기다림), renderToPipeableStream·renderToReadableStream(경계 단위 스트리밍), resume(prerender를 이어서)입니다. 실제로 돌려 보면 스트림은 onShellReady 2ms, onAllReady 53ms에 셸 먼저·데이터 나중으로 흘렀습니다.",
      },
      {
        label: "확인 질문",
        body: "Next 같은 프레임워크 없이 Express로 SSR을 하는 앱입니다. (1) 클라이언트 진입점에서 createRoot와 hydrateRoot 중 무엇을, 왜? (2) 서버와 클라이언트가 '현재 시각'을 그려야 하는 시계 컴포넌트는 어떻게? (3) 운영에서 하이드레이션 불일치가 얼마나 나는지 알고 싶다면?",
        notes: [
          {
            title: "답",
            body: "(1) hydrateRoot(document.getElementById('root'), <App />)입니다. 서버 HTML이 이미 있으므로 createRoot를 쓰면 그 HTML을 지우고 처음부터 다시 그려 깜빡이고 느려집니다. 문서는 '서버 렌더 앱에 createRoot는 지원하지 않는다'고 적습니다. 서버에서 identifierPrefix를 줬다면 같은 값을 넘깁니다. (2) 렌더 중 new Date()를 쓰면 서버와 클라이언트가 다른 글자를 만들어 불일치입니다. 실제로 돌려 보면 텍스트 불일치는 onRecoverableError로 알리고 다시 그렸습니다. 처방은 시계를 마운트 뒤에만 그리는 것입니다. const [now, setNow] = useState(null); useEffect(() => { setNow(new Date()); const id = setInterval(…); return () => clearInterval(id); }, []); now가 null이면 서버와 같은 자리 표시를 그립니다. 또는 서버가 시각을 props로 내려 첫 렌더를 맞추고, 글자 포맷이 타임존으로 달라질 수 있는 요소에만 suppressHydrationWarning을 둡니다(한 단계, 텍스트는 안 고침). (3) hydrateRoot 옵션 onRecoverableError(error, info)에 모니터링을 연결합니다. 불일치는 console.error가 아니라 여기로 옵니다(실제로 확인). error.cause와 info.componentStack으로 어느 컴포넌트인지 묶어 집계하면 됩니다. onCaughtError·onUncaughtError도 함께 달아 세 층을 구분합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "createRoot", href: `${DOCS}/reference/react-dom/client/createRoot` },
      { label: "hydrateRoot", href: `${DOCS}/reference/react-dom/client/hydrateRoot` },
    ],
  },

  {
    id: "ra-dom-server",
    name: "서버 API",
    tagline: "트리를 HTML 로: 한 번에(renderToString), 흘려서(…Stream), 이어서(resume)",
    intro:
      "참고서의 react-dom/server입니다. 셋으로 나뉩니다. Node 스트림: renderToPipeableStream, resumeToPipeableStream. Web 스트림: renderToReadableStream, resume. 스트리밍 아닌 것(레거시): renderToString, renderToStaticMarkup. 문서는 '스트리밍 아닌 API는 스트리밍 API보다 기능이 제한된다'고 적습니다. 핵심 차이는 Suspense입니다. renderToString은 멈춘 컴포넌트를 기다리지 못해 fallback을 바로 HTML로 내고, 스트림은 셸을 먼저 보내고 경계가 준비되는 대로 <script>로 채웁니다. 실제로 돌려 보면 renderToPipeableStream은 onShellReady 2ms에 셸을 흘리고 onAllReady 53ms에 끝났으며, 경계 안의 느린 데이터는 <div hidden id=\"S:0\">와 $RC(\"B:0\",\"S:0\") 스크립트로 뒤에 왔습니다. renderToString에 Suspense를 주니 '클라이언트 렌더링으로 전환' 표시가 남았습니다. 이 노드의 질문은 하나입니다. HTML을 언제 어떻게 내보내나.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "renderToString(node, { identifierPrefix }) → 문자열. 스트리밍도 데이터 대기도 없고, 멈추면 fallback을 즉시 냅니다. 브라우저에서도 돌지만 권하지 않습니다. renderToStaticMarkup → 문자열. 같되 하이드레이션용 표시(<!-- --> 같은)가 없어 '하이드레이션할 수 없습니다'. 이메일·정적 생성기 같은 비상호작용용. renderToPipeableStream(node, options) → { pipe, abort }. 옵션 bootstrapScriptContent·bootstrapScripts·bootstrapModules(클라이언트 진입 스크립트), identifierPrefix, namespaceURI, nonce, onShellReady(셸 준비, 여기서 statusCode 정하고 pipe(res)), onShellError(셸 자체 실패, 대체 HTML), onAllReady(전부 준비, 크롤러·SSG용), onError(모든 에러 로그), progressiveChunkSize, formState, onHeaders. '셸을 내보내기 시작하면 상태 코드를 바꿀 수 없다'. abort()는 남은 경계를 fallback으로 내고 클라이언트에 맡깁니다. renderToReadableStream(node, options) → Promise<ReadableStream>. 셸이 준비되면 resolve, 셸이 실패하면 reject(try/catch로 500). stream.allReady로 전부 기다릴 수 있고 signal로 중단합니다. resume(node, postponedState, options)과 resumeToPipeableStream은 prerender가 남긴 postponed 상태에서 이어 렌더합니다(부분 사전 렌더링). bootstrap 옵션은 못 받습니다.",
        code: "API                              돌려주는 것                    Suspense                  어디서\nrenderToString(node)              string                         못 기다림 → fallback 즉시     Node · 브라우저 (비권장)\nrenderToStaticMarkup(node)        string (하이드레이션 표시 없음)   못 기다림                   이메일 · 정적\nrenderToPipeableStream(node, o)   { pipe, abort }                경계마다 스트리밍            Node 스트림\nrenderToReadableStream(node, o)   Promise<ReadableStream> (+allReady)   경계마다 스트리밍      Web 스트림 (Edge · Deno · Bun · Node)\nresume(node, postponed, o)        Promise<ReadableStream>        prerender 이어서            Web\nresumeToPipeableStream(node, postponed, o)  { pipe, abort }      prerender 이어서            Node\n\n// 권장 흐름 (문서)\nconst { pipe, abort } = renderToPipeableStream(<App />, {\n  bootstrapScripts: ['/main.js'],\n  onShellReady() { res.statusCode = didError ? 500 : 200; res.setHeader('content-type', 'text/html'); pipe(res); },\n  onShellError(err) { res.statusCode = 500; res.send('<h1>Something went wrong</h1>'); },\n  onError(err) { didError = true; console.error(err); logServerCrashReport(err); },\n});\nsetTimeout(() => abort(), 10_000);   // 10초 뒤 남은 건 클라이언트에",
        codeLang: "text",
        terms: [
          {
            term: "셸 (shell)",
            body: "Suspense 경계 바깥의 모든 것, 즉 '기다릴 필요 없이 바로 보낼 수 있는' 첫 HTML입니다. 스트리밍은 셸을 먼저 보내고(onShellReady), 경계 안의 내용은 준비되는 대로 뒤에 붙입니다. 셸 자체가 실패하면 onShellError로 아무 바이트도 안 나간 상태에서 대체 HTML을 보낼 수 있지만, 셸이 나간 뒤에는 상태 코드를 바꿀 수 없습니다. 실제로 돌려 보면 셸은 2ms, 전부는 53ms였습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 스트림이 흘러가는 모양",
        body: "renderToPipeableStream에 <h1>셸</h1>과 50ms 걸리는 데이터를 use로 읽는 Suspense를 넣고 bootstrapScripts: ['/main.js']를 줬습니다. 콜백은 onShellReady 2ms → onAllReady 53ms → 스트림 끝 53ms 순이었습니다. HTML은 <head>에 <link rel=\"preload\" as=\"script\" fetchPriority=\"low\" href=\"/main.js\">, 본문에 <h1>셸</h1>과 경계 자리 <!--$?--><template id=\"B:0\"></template><p>로딩…</p><!--/$-->, 그다음 $RT(첫 프레임 시각)와 <script src=\"/main.js\" id=\"_R_\" async>, 그다음 데이터가 오자 <div hidden id=\"S:0\"><p>느린 데이터</p></div>와 $RC(\"B:0\",\"S:0\")를 정의하고 부르는 인라인 스크립트입니다. $RC 안에 $RT+300이 보이는데, 이것이 클라이언트에서 본 '드러내기 300ms 묶음'의 서버 쪽 짝입니다. 경계 안 컴포넌트가 던지면 onError('경계 안 폭발') 뒤 onShellReady가 왔고 HTML에 <!--$!--><template data-msg=\"Switched to client rendering because the server rendering errored: …\">가 남았습니다. 셸이 던지면 onError 뒤 onShellError였습니다. renderToString은 <!-- -->로 텍스트 경계를 남기고 renderToStaticMarkup은 남기지 않으며, renderToString에 Suspense를 주면 'The server used renderToString which does not support Suspense' 표시와 함께 클라이언트 렌더링으로 넘깁니다.",
        code: "// Node 24 · React 19.3.1 · renderToPipeableStream + bootstrapScripts\n콜백:  onShellReady @2ms  →  onAllReady @53ms  →  stream end @53ms\n\n<!DOCTYPE html><html><head><link rel=\"preload\" as=\"script\" fetchPriority=\"low\" href=\"/main.js\"/></head><body>\n<h1>셸</h1>\n<!--$?--><template id=\"B:0\"></template><p>로딩…</p><!--/$-->              ← 경계 자리 + fallback\n<script>requestAnimationFrame(function(){$RT=performance.now()});</script>\n<script src=\"/main.js\" id=\"_R_\" async=\"\"></script>                      ← bootstrapScripts\n<div hidden id=\"S:0\"><p>느린 데이터</p></div>                              ← 50ms 뒤 도착한 내용 (숨김)\n<script>$RB=[];$RV=function(a){…};$RC=function(a,b){… $RT+300-a …};$RC(\"B:0\",\"S:0\")</script>   ← 제자리에 끼움 (300ms 묶음)\n</body></html>\n\n// 에러\n경계 안 throw:  onError('경계 안 폭발') → onShellReady   HTML: <!--$!--><template data-msg=\"Switched to client rendering because the server rendering errored: …\">\n셸 throw:      onError('셸 폭발') → onShellError('셸 폭발')   (바이트 안 나감 → 500 가능)\n\n// 문자열 API\nrenderToString:        '<h1 class=\"t\">Hi <!-- -->민엽</h1>'   (텍스트 경계 표시)\nrenderToStaticMarkup:  '<h1 class=\"t\">Hi 민엽</h1>'           (하이드레이션 불가)\nrenderToString + Suspense: <template data-msg=\"… The server used \"renderToString\" which does not support Suspense…\">",
      },
      {
        label: "문제: 느린 API 하나 때문에 페이지 전체가 늦게 뜬다",
        body: "renderToString으로 SSR을 합니다. 추천 상품 API가 2초 걸리면 그동안 HTML 한 바이트도 못 보내고, 사용자는 흰 화면을 2초 봅니다. renderToString은 전부 끝나야 문자열이 되고, Suspense를 써도 기다리지 못해 fallback을 그대로 냅니다. 처방은 스트리밍입니다. renderToPipeableStream(또는 Web 환경이면 renderToReadableStream)로 바꾸고 추천 영역을 <Suspense fallback>로 감쌉니다. 셸(헤더·본문)이 2ms에 나가고 추천은 준비되면 <script>로 채워집니다. 실제로 돌려 보면 셸 2ms, 느린 경계는 53ms에 뒤따랐습니다. 데이터는 use(프라미스)나 프레임워크 로더처럼 Suspense를 아는 길로 읽어야 하고, useEffect fetch는 서버에서 돌지 않습니다. 크롤러에는 onAllReady에서 pipe해 완성본을 보낼 수 있습니다.",
      },
      {
        label: "문제가 나는 경우: 출구를 잘못 고를 때",
        body: "경우 ㄱ, renderToString + 느린 데이터입니다. 위의 사고입니다. 경우 ㄴ, renderToString에 Suspense입니다. fallback이 그대로 나가고 '클라이언트 렌더링으로 전환'. 스트림으로. 경우 ㄷ, renderToStaticMarkup으로 하이드레이션합니다. 표시가 없어 불일치. 상호작용이 있으면 renderToString 이상. 경우 ㄹ, 셸이 나간 뒤 상태 코드를 바꾸려 합니다. 못 바꿉니다. 에러 플래그를 onError에서 세우고 onShellReady에서 정합니다. 경우 ㅁ, onShellError를 안 둡니다. 셸이 실패하면 빈 응답. 500과 대체 HTML을. 경우 ㅂ, onError를 덮고 console.error를 뺍니다. 문서가 '직접 onError를 쓰면 콘솔 로그도 잊지 말라'고 적습니다. 경우 ㅅ, abort를 안 둡니다. 멈춘 데이터가 영원히 응답을 붙잡습니다. setTimeout(abort, 10000). 경우 ㅇ, 셸이 너무 큽니다. 모든 데이터를 경계 밖에서 읽으면 스트리밍인데 한 번에 나갑니다. 느린 것을 경계 안으로. 경우 ㅈ, bootstrapScripts를 안 넘기고 <script>를 손으로 끼웁니다. 순서가 어긋나 하이드레이션 전 상호작용이 사라집니다. 옵션으로 넘기면 React가 preload와 자리를 챙깁니다. 경우 ㅊ, 크롤러에 onShellReady로 보냅니다. fallback 상태의 HTML이 색인됩니다. onAllReady로. 경우 ㅋ, Node에서 renderToReadableStream을 씁니다. 동작하지만 문서는 '성능이 더 나빠 권하지 않는다'. renderToPipeableStream으로. 경우 ㅌ, resume에 bootstrap 옵션을 넘깁니다. 받지 않습니다. prerender 쪽에서 줍니다.",
        code: "경우               언제 생기나                         겉모습                                  들통나는 때\nㄱ 문자열 + 느린 데이터  renderToString                   TTFB 가 가장 느린 API 만큼                 느린 API\nㄴ 문자열 + Suspense   renderToString(<Suspense>)         fallback 그대로 · 클라이언트 렌더링 전환      SSR 로그\nㄷ 정적 마크업 하이드레이션  renderToStaticMarkup → hydrateRoot   불일치                               첫 로드\nㄹ 늦은 상태 코드      pipe 뒤 res.statusCode              무시                                    에러 페이지가 200\nㅁ onShellError 없음   셸 throw                           빈 응답                                 셸 에러\nㅂ 콘솔 로그 누락      onError 덮어쓰기                     서버 에러가 안 보임                        운영\nㅅ abort 없음         멈춘 프라미스                        응답이 안 끝남                            타임아웃\nㅇ 셸이 전부          경계 밖에서 모든 데이터               스트리밍인데 한 번에                        TTFB\nㅈ 손으로 script      bootstrapScripts 대신                하이드레이션 전 입력 유실                    첫 로드\nㅊ 크롤러에 셸만       onShellReady 로 전부                 fallback 이 색인됨                        SEO\nㅋ Node 에 Web 스트림  renderToReadableStream in Node       느림                                    부하\nㅌ resume 에 bootstrap  resume(…, { bootstrapScripts })      무시                                    부분 사전 렌더",
        codeLang: "text",
      },
      {
        label: "문제의 구조: '언제 끝나야 하나' 가 API 를 고른다",
        body: "서버 API는 한 트리를 HTML로 바꾸되 '언제 끝나야 하나'가 다릅니다. renderToString은 '지금 전부'라서 기다릴 수 없고(ㄱ, ㄴ), 스트림은 '셸은 지금, 나머지는 준비되는 대로'라서 경계 단위로 끝나며(ㅇ), 그래서 셸이 나간 뒤에는 되돌릴 수 없는 것(상태 코드, ㄹ)과 끝을 강제하는 장치(abort, ㅅ)가 필요합니다. renderToStaticMarkup은 '하이드레이션 안 함'을 전제로 표시를 뺍니다(ㄷ). 에러도 시점으로 갈립니다. 셸 전이면 onShellError로 전체를 대체할 수 있고, 셸 뒤면 onError로 로그만 남기고 그 경계를 클라이언트에 맡깁니다(ㅁ, ㅂ). 소비자도 시점을 고릅니다. 사람에게는 onShellReady(빨리), 크롤러에게는 onAllReady(완성, ㅊ). 처방은 '이 응답은 언제 끝나야 하고, 누가 읽나'를 먼저 정한 뒤 API를 고르는 것입니다.",
        code: "언제 끝나야 하나                API                              되돌릴 수 없는 것 · 필요한 장치\n지금 전부                      renderToString / StaticMarkup        기다림 없음 (ㄱ ㄴ) · 하이드레이션 여부 (ㄷ)\n셸 지금, 나머지 준비되는 대로     renderTo*Stream                     셸 뒤 상태 코드 X (ㄹ) · abort (ㅅ) · 경계 안으로 (ㅇ)\n전부 준비되면                   onAllReady / stream.allReady         크롤러 (ㅊ)\n이어서                         resume*                             bootstrap 은 prerender 쪽 (ㅌ)\n\n에러의 시점:  셸 전 → onShellError (대체 HTML, 500)   ·   셸 뒤 → onError (로그) + 경계를 클라이언트에",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "스트림의 반대편이 다음 노드 '정적 API'입니다. prerender·prerenderToNodeStream은 '전부 기다려 완성된 HTML'을 빌드 때 만들고(SSG), abort하면 postponed 상태를 남겨 resume으로 이어 붙일 수 있습니다(부분 사전 렌더링). 실제로 돌려 보면 prerender는 65ms에 template·script 없는 완성 HTML을 냈고, abort하면 fallback 상태 HTML과 postponed 객체를 돌려줬습니다.",
      },
      {
        label: "확인 질문",
        body: "Express 서버에서 상품 페이지를 SSR합니다. 헤더·본문은 빠르고 리뷰 API는 느립니다(가끔 멈춤). (1) 어느 API와 어떤 구조로? (2) 리뷰 API가 500을 내면 응답 코드는? (3) 검색 엔진 봇에게는?",
        notes: [
          {
            title: "답",
            body: "(1) renderToPipeableStream(Node)입니다. 리뷰를 <Suspense fallback={<ReviewsSkeleton/>}>로 감싸고 데이터는 use(프라미스)나 로더로 읽습니다. onShellReady에서 상태 코드와 content-type을 정하고 pipe(res)합니다. 헤더·본문이 몇 ms에 나가고 리뷰는 준비되면 <script>로 채워집니다(실제로 셸 2ms, 경계 53ms). bootstrapScripts로 클라이언트 진입 스크립트를 넘기고, setTimeout(() => abort(), 10000)으로 멈춘 리뷰를 fallback으로 보내 클라이언트에 맡깁니다. (2) 리뷰는 경계 안이므로 셸은 이미 200으로 나갔고 바꿀 수 없습니다. onError에 로그가 오고 그 경계는 '클라이언트 렌더링으로 전환' 표시와 함께 클라이언트가 다시 시도합니다(실제로 그 template이 남았습니다). 페이지 자체가 실패인 경우(셸 안에서 throw)만 onShellError에서 500과 대체 HTML을 보냅니다. 에러를 500으로 내려야 하는 데이터는 셸에서 읽어야 합니다. (3) 봇에게는 onAllReady에서 pipe합니다. 전부 준비된 뒤 한 번에 나가므로 fallback이 색인되지 않습니다. 대신 TTFB가 느려지므로 User-Agent로 갈라 사람에게는 onShellReady를 씁니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Server React DOM APIs", href: `${DOCS}/reference/react-dom/server` },
      { label: "renderToPipeableStream", href: `${DOCS}/reference/react-dom/server/renderToPipeableStream` },
      { label: "renderToReadableStream", href: `${DOCS}/reference/react-dom/server/renderToReadableStream` },
      { label: "renderToString", href: `${DOCS}/reference/react-dom/server/renderToString` },
      { label: "renderToStaticMarkup", href: `${DOCS}/reference/react-dom/server/renderToStaticMarkup` },
      { label: "resume", href: `${DOCS}/reference/react-dom/server/resume` },
    ],
  },

  {
    id: "ra-dom-static",
    name: "정적 API",
    tagline: "전부 기다려 완성된 HTML: prerender, 그리고 멈춘 자리를 남기는 postponed",
    intro:
      "참고서의 react-dom/static입니다. prerender(node, options) → { prelude, postponed }(Web 스트림), prerenderToNodeStream(Node 스트림), resumeAndPrerender·resumeAndPrerenderToNodeStream(중단된 prerender를 이어서 정적으로 끝내기). 서버 API가 '지금 흘려보내기'라면 정적 API는 '전부 기다려 한 번에'입니다. 문서는 'renderToString과 달리 prerender는 모든 데이터가 로드될 때까지 기다린 뒤 resolve한다', '스트리밍하지 않는다'고 적습니다. 빌드 때 HTML 파일을 만드는 SSG가 자리입니다. 그리고 signal로 중단하면 미완성 경계를 fallback 상태로 둔 prelude와, 어디서 멈췄는지를 담은 postponed 객체를 돌려줍니다. 그것을 요청 때 resume에 넘기면 멈춘 자리부터 이어 렌더합니다(부분 사전 렌더링). 실제로 돌려 보면 prerender는 50ms 데이터를 기다려 65ms에 template·script가 전혀 없는 완성 HTML을 냈고(postponed null), 30ms에 abort하니 fallback 상태의 prelude와 여섯 키의 postponed 객체를 돌려줬습니다. 이 노드의 질문은 하나입니다. 빌드 때 만들 수 있는 것과 요청 때 만들어야 하는 것을 어디서 가르나.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "prerender(reactNode, options?) → Promise<{ prelude, postponed }>. prelude는 HTML의 Web ReadableStream, postponed는 'JSON으로 직렬화 가능한 불투명 객체'로 resume에 넘기는 것이고 다 끝났으면 null입니다. 옵션은 bootstrapScriptContent·bootstrapScripts·bootstrapModules, identifierPrefix, namespaceURI, onError, onHeaders, progressiveChunkSize, signal 등이며 nonce는 '사전 렌더링에서는 쓸 수 없다'입니다. 모든 Suspense가 끝날 때까지 기다리고, 셸이 실패하면 reject합니다. signal로 중단하면 '미완성 자식이 있는 Suspense 경계는 fallback 상태로 prelude에 들어가고' postponed가 남습니다. prerenderToNodeStream은 같되 Node 스트림이고 resumeToPipeableStream으로 이어집니다. resumeAndPrerender(node, postponedState, options?)는 중단된 prerender를 다시 정적으로 끝까지 돌려 { prelude, postponed }를 냅니다(bootstrap 옵션 없음). 서버 노드의 resume은 같은 postponed를 받아 '스트림으로' 이어 보냅니다. 조합이 부분 사전 렌더링(PPR)입니다. 빌드: prerender를 abort해 정적 셸 + postponed 저장. 요청: 정적 셸을 즉시 보내고 resume으로 동적 부분을 스트리밍.",
        code: "import { prerender } from 'react-dom/static';\n\n// SSG — 빌드 때 완성 HTML\nconst { prelude, postponed } = await prerender(<App />, { bootstrapScripts: ['/main.js'] });\nconst html = await new Response(prelude).text();      // 전부 기다림 · postponed === null\nawait fs.writeFile('dist/index.html', html);\n\n// 부분 사전 렌더링 — 빌드: 정적 셸 + 멈춘 자리\nconst ac = new AbortController(); setTimeout(() => ac.abort(), 0);   // 동적 데이터는 기다리지 않음\nconst { prelude: shell, postponed } = await prerender(<App />, { signal: ac.signal });\nsave(shell, JSON.stringify(postponed));\n\n// 요청 때: 셸 즉시 + 동적 부분 스트리밍\nimport { resume } from 'react-dom/server';\nconst stream = await resume(<App />, JSON.parse(postponedJson));   // bootstrap 옵션은 못 받음",
        terms: [
          {
            term: "postponed",
            body: "prerender가 중단됐을 때 '어디까지 그렸고 어디서 멈췄나'를 담은 불투명 객체입니다. 문서는 JSON 직렬화 가능하다고 적고, 실제로 돌려 보면 nextSegmentId·rootFormatContext·progressiveChunkSize·resumableState·replayNodes·replaySlots 여섯 키였습니다. 내용은 React 내부 형식이라 읽지 말고 그대로 저장해 resume(스트림으로 이어서) 또는 resumeAndPrerender(정적으로 이어서)에 넘깁니다. 끝까지 렌더됐으면 null입니다.",
          },
          {
            term: "부분 사전 렌더링 (Partial Prerendering)",
            body: "페이지의 정적인 부분은 빌드 때 HTML로 만들어 두고(prerender + abort), 동적인 부분(사용자별·실시간)만 요청 때 그 자리에 이어 렌더(resume)하는 방식입니다. 사용자는 정적 셸을 CDN 속도로 받고 동적 부분은 스트리밍으로 채워집니다. Next.js의 PPR이 이 API 위에 있습니다. React 19.2에서 resume 계열이 정식이 됐습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "50ms 걸리는 데이터를 use로 읽는 Suspense를 prerender에 넣으니 65ms에 resolve했고 HTML은 <main><!--$--><p>느린 데이터</p><!--/$--></main>이었습니다. 스트림이 남기는 <template id=\"B:0\">도, $RC 스크립트도 없는 완성본이고 postponed는 null입니다. 같은 트리에 영원히 pending인 프라미스를 넣고 30ms에 abort하니 onError로 'This operation was aborted'가 오고, prelude는 <main><h1>셸</h1><!--$?--><template id=\"B:0\"></template><p>로딩…</p><!--/$--></main>과 $RT 스크립트(fallback 상태), postponed는 여섯 키를 가진 객체였습니다. 서버 노드의 renderToPipeableStream과 비교하면 같은 트리가 스트림에서는 2ms 셸 + 53ms 경계로 두 번에 나갔고, prerender에서는 65ms에 한 번에 나갔습니다.",
        code: "// Node 24 · React 19.3.1 · react-dom/static\nprerender(<main><Suspense fallback=\"로딩…\"><Slow 50ms/></Suspense></main>)\n  → resolved @65ms · postponed: null\n  → <main><!--$--><p>느린 데이터</p><!--/$--></main>          ← template 없음 · script 없음 · 완성본\n\nprerender(…<Never/>…, { signal }) · 30ms 에 abort()\n  → onError: This operation was aborted\n  → prelude: <main><h1>셸</h1><!--$?--><template id=\"B:0\"></template><p>로딩…</p><!--/$--></main><script>…$RT…</script>   ← fallback 상태\n  → postponed: object { nextSegmentId, rootFormatContext, progressiveChunkSize, resumableState, replayNodes, replaySlots }\n\n// 같은 트리, 서버 스트림과 비교\nrenderToPipeableStream:  셸 @2ms  →  경계 @53ms  (두 번)\nprerender:               전부 @65ms  (한 번)",
      },
      {
        label: "문제: 빌드한 HTML 에 '로딩…' 이 박혀 있다",
        body: "SSG를 renderToString으로 했습니다. 데이터는 Suspense로 감쌌는데 생성된 HTML에 스켈레톤이 그대로 들어 있고, 사용자는 정적 페이지인데도 로딩을 봅니다. renderToString은 멈춘 컴포넌트를 기다리지 않고 fallback을 그대로 내기 때문입니다(실제로 '클라이언트 렌더링으로 전환' 표시). 처방은 prerender(또는 prerenderToNodeStream)입니다. 모든 경계가 끝날 때까지 기다린 뒤 resolve하므로 완성된 HTML이 나옵니다. 실제로 돌려 보면 template·script 없는 HTML이었습니다. 데이터는 use(프라미스)나 cache처럼 Suspense를 아는 길로 읽어야 하고, 영원히 안 오는 데이터가 있으면 signal로 끊어 fallback 상태로 두는 쪽을 택합니다.",
      },
      {
        label: "문제가 나는 경우: 빌드 때와 요청 때를 섞을 때",
        body: "경우 ㄱ, renderToString으로 SSG입니다. 위의 사고입니다. 경우 ㄴ, 사용자별 데이터를 prerender에 넣습니다. 빌드 때 한 사람의 데이터가 모두의 HTML에 박힙니다. 동적 부분은 abort로 미루고 요청 때 resume. 경우 ㄷ, 멈추는 데이터에 signal이 없습니다. 빌드가 끝나지 않습니다. 타임아웃 signal을 둡니다. 경우 ㄹ, postponed를 열어 봅니다. 내부 형식이라 버전에 따라 바뀝니다. 저장하고 넘기기만. 경우 ㅁ, postponed를 React 버전이 다른 서버에서 resume합니다. 빌드와 요청의 React 버전이 같아야 합니다. 경우 ㅂ, resume에 bootstrapScripts를 넘깁니다. 받지 않습니다. prerender 쪽 옵션입니다. 경우 ㅅ, prerender에 nonce를 넘깁니다. 쓸 수 없습니다. 경우 ㅇ, prerender 결과를 스트리밍이라 믿습니다. 한 번에 나갑니다. 스트리밍이 필요하면 renderToReadableStream. 경우 ㅈ, 셸이 던졌는데 catch가 없습니다. prerender는 reject합니다. try/catch로 빌드 실패를 명확히. 경우 ㅊ, 빌드 때 전역 상태를 씁니다. 여러 페이지를 한 프로세스에서 prerender하면 모듈 전역이 공유됩니다. 페이지별로 격리. 경우 ㅋ, 시간·난수를 렌더에 씁니다. 빌드 시각이 HTML에 박혀 하이드레이션 때 불일치. 서버 노드와 같은 처방(마운트 뒤). 경우 ㅌ, hydrateRoot 없이 정적 HTML만 배포하고 상호작용을 기대합니다. HTML은 죽은 문서입니다. bootstrapScripts와 hydrateRoot가 있어야 합니다.",
        code: "경우               언제 생기나                        겉모습                               들통나는 때\nㄱ 문자열 SSG       renderToString 으로 빌드             HTML 에 '로딩…' 박힘                   배포 뒤\nㄴ 사용자 데이터     prerender 에 세션 데이터             한 사람 데이터가 전원에게                 다른 사용자\nㄷ signal 없음      멈추는 프라미스                     빌드가 안 끝남                         CI\nㄹ postponed 열기    내부 필드 사용                     버전 올리면 깨짐                       업그레이드\nㅁ 버전 불일치       빌드 React ≠ 서버 React             resume 실패                          배포\nㅂ resume bootstrap  resume(…, { bootstrapScripts })      무시                                 첫 로드\nㅅ nonce            prerender(…, { nonce })             불가                                 CSP\nㅇ 스트리밍 기대     prerender 를 응답에                  TTFB 가 전부 끝날 때까지                느린 데이터\nㅈ catch 없음       셸 throw                           reject · 빌드 터짐                     빌드\nㅊ 전역 공유        한 프로세스 여러 페이지               페이지 간 상태 새어감                   다른 페이지\nㅋ 시간·난수         렌더 중 Date.now                   빌드 시각 박힘 · 불일치                 하이드레이션\nㅌ 하이드레이션 없음   HTML 만 배포                      버튼이 안 눌림                        첫 클릭",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 시간을 둘로 가른다 — 빌드 때 아는 것과 요청 때만 아는 것",
        body: "정적 API는 렌더의 시간을 '빌드 때'로 옮깁니다. 그때 알 수 있는 것(콘텐츠, 공통 레이아웃)은 HTML로 굳히고, 그때 알 수 없는 것(사용자, 실시간)은 굳히면 틀립니다(ㄴ, ㅋ). 그래서 둘을 가르는 선이 필요하고, 그 선이 Suspense 경계 + signal(abort)입니다. 경계 밖과 끝난 경계는 prelude에, 미완성 경계는 fallback 상태 + postponed에 남습니다. postponed는 그 선을 '요청 때'로 넘기는 봉투라 열지 말고(ㄹ) 같은 버전으로(ㅁ) resume에 넘깁니다. prerender는 '전부'를 기다리므로 끝을 보장하는 signal이 필요하고(ㄷ), 스트리밍이 아니라(ㅇ) 응답용이 아니라 파일용입니다. 처방은 페이지를 '빌드 때 아는 것 / 요청 때만 아는 것'으로 먼저 나누고, 전자는 prerender로 굳히고 후자는 경계 안에 두어 resume 또는 클라이언트에 맡기는 것입니다.",
        code: "빌드 때 (prerender)                                    요청 때 (resume / 클라이언트)\n콘텐츠 · 레이아웃 · 공통 데이터  → prelude (완성 HTML)       사용자별 · 실시간 → 경계 안 → fallback 상태 + postponed → resume 으로 이어 스트리밍\n\n가르는 선 = <Suspense> 경계 + signal.abort()\n  경계 밖 · 끝난 경계  → prelude\n  미완성 경계         → fallback + postponed (봉투: 열지 말고 (ㄹ) 같은 버전으로 (ㅁ) 넘긴다)\n\nprerender 는 '전부' 를 기다린다 → signal 필수 (ㄷ) · 스트리밍 아님 (ㅇ) · 파일용\n굳히면 틀리는 것: 사용자 데이터 (ㄴ) · 시간·난수 (ㅋ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "react-dom 갈래가 끝났습니다. 다음은 'React 컴파일러'입니다. useMemo·useCallback·memo를 손으로 쓰지 않아도 빌드 때 자동으로 메모이제이션하는 Babel 플러그인입니다. 실제로 돌려 보면 보통 컴포넌트는 react/compiler-runtime의 c(11) 슬롯으로 바뀌었고, 'use no memo'는 건너뛰었고, props를 바꾸는 컴포넌트는 'This value cannot be modified'로 컴파일을 건너뛰었습니다.",
      },
      {
        label: "확인 질문",
        body: "블로그 글 페이지를 빌드 때 HTML로 만들고 싶습니다. 글 본문은 빌드 때 알고, '이 글을 읽은 사람 수'는 실시간이고, 댓글 API는 가끔 멈춥니다. (1) 어느 API로 빌드하고, (2) 읽은 사람 수는 어떻게 하고, (3) 댓글이 멈추면?",
        notes: [
          {
            title: "답",
            body: "(1) prerender(또는 Node면 prerenderToNodeStream)입니다. 본문·댓글을 포함해 모든 경계가 끝날 때까지 기다려 template·script 없는 완성 HTML을 냅니다(실제로 확인). bootstrapScripts로 클라이언트 진입을 넣고 배포 뒤 hydrateRoot로 붙입니다. renderToString은 Suspense를 기다리지 못해 스켈레톤이 박힙니다. (2) 실시간 값은 빌드 때 굳히면 틀립니다. 두 길이 있습니다. 부분 사전 렌더링: 읽은 사람 수를 Suspense 경계 안에 두고 빌드 때 signal로 abort해 fallback 상태의 prelude와 postponed를 저장한 뒤, 요청 때 resume으로 그 자리만 이어 스트리밍합니다. 더 단순한 길: 그 숫자만 클라이언트에서 마운트 뒤 fetch해 채웁니다(서버 HTML에는 자리 표시). (3) 댓글 경계에 타임아웃 signal을 둡니다. 멈추면 abort되어 댓글 경계는 fallback 상태로 prelude에 남고 postponed가 생기므로, 요청 때 resume하거나 클라이언트가 채우게 합니다. signal 없이 두면 빌드가 끝나지 않습니다. 실제로 돌려 보면 abort 뒤 prelude는 fallback 상태, postponed는 여섯 키 객체였습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Static React DOM APIs", href: `${DOCS}/reference/react-dom/static` },
      { label: "prerender", href: `${DOCS}/reference/react-dom/static/prerender` },
      { label: "prerenderToNodeStream", href: `${DOCS}/reference/react-dom/static/prerenderToNodeStream` },
      { label: "resumeAndPrerender", href: `${DOCS}/reference/react-dom/static/resumeAndPrerender` },
      { label: "resume", href: `${DOCS}/reference/react-dom/server/resume` },
    ],
  },

  {
    id: "ra-compiler",
    name: "React 컴파일러",
    tagline: "useMemo·useCallback·memo 를 빌드가 대신 쓴다 — 규칙을 지킨 코드에만",
    intro:
      "참고서의 React 컴파일러 갈래입니다. babel-plugin-react-compiler는 빌드 때 컴포넌트와 훅을 읽어 '전과 같으면 재사용'하는 코드로 바꿉니다. 손으로 쓰던 useMemo·useCallback·memo를 자동으로 넣는 것과 같습니다. 조건이 있습니다. React 규칙(순수성, 훅 규칙, 불변성)을 지킨 코드만 바꾸고, 어긴 코드는 건너뜁니다. 이 노드 아래 둘은 설정(compilationMode, target, panicThreshold, logger, gating)과 지시어('use memo', 'use no memo')입니다. 실제로 돌려 보면(1.0.0) 보통 컴포넌트는 react/compiler-runtime의 c(11)로 슬롯 열한 개를 받아 의존성마다 비교하는 코드가 됐고, props를 고치는 컴포넌트는 CompileError 'This value cannot be modified'와 함께 원문 그대로 남았으며 빌드는 계속됐습니다. 배우기 쪽 '시작하기 > React 컴파일러'가 설치와 도입이라면, 이 갈래는 옵션 하나하나입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "컴파일러는 Babel 플러그인이고, Vite·Next·Remix·Expo·Webpack·Rspack 플러그인이 그것을 감쌉니다. 출력은 react/compiler-runtime의 c(n) 호출로 n개의 캐시 슬롯을 받고, 값마다 '전 렌더의 입력과 같은가'를 Object.is로 비교해 같으면 슬롯의 값을, 다르면 새로 계산해 슬롯에 넣습니다. React 19면 런타임이 react 안에 있고, 17·18이면 react-compiler-runtime 패키지가 필요합니다(target). 설정은 다섯입니다. compilationMode(무엇을 컴파일하나: infer 기본·annotation·syntax·all), target('19' 기본·'18'·'17'), panicThreshold(에러를 어떻게: 'none' 기본·'critical_errors'·'all_errors'), logger(컴파일 이벤트 받기), gating(런타임 플래그로 컴파일판·원본 고르기). 지시어는 둘입니다. 'use memo'(이 함수를 컴파일하라), 'use no memo'(건너뛰라). 규칙을 어긴 함수는 조용히 건너뛰므로(none), 어디가 건너뛰어졌는지는 logger나 ESLint 플러그인(같은 진단)으로 봅니다.",
        code: "설정             값                                        기본        뜻\ncompilationMode   'infer' | 'annotation' | 'syntax' | 'all'    'infer'     무엇을 컴파일하나 (infer: 컴포넌트·훅으로 보이는 것)\ntarget            '19' | '18' | '17'                           '19'        런타임 위치 (19: react/compiler-runtime · 17/18: react-compiler-runtime 패키지)\npanicThreshold    'none' | 'critical_errors' | 'all_errors'      'none'      에러 난 함수를 건너뛰나(none) 빌드를 깨나\nlogger            { logEvent(filename, event) }                null        CompileSuccess · CompileError · CompileSkip · CompileDiagnostic · PipelineError · Timing\ngating            { source, importSpecifierName }              null        플래그 함수로 컴파일판/원본 선택\n\n지시어            자리                          뜻\n'use memo'        함수 몸 첫 줄 · 파일 첫 줄       컴파일하라 (annotation 모드에선 필수)\n'use no memo'     함수 몸 첫 줄 · 파일 첫 줄       건너뛰라 (모든 모드보다 우선 · 별칭 'use no forget')",
        codeLang: "text",
        terms: [
          {
            term: "자동 메모이제이션 (automatic memoization)",
            body: "컴포넌트가 렌더마다 만드는 값(객체, 배열, 함수, JSX)을 '입력이 전과 같으면 전의 것을 재사용'하도록 컴파일러가 코드를 바꾸는 일입니다. 손으로 useMemo(() => …, [deps])를 쓰는 것과 결과가 같되, 의존성을 컴파일러가 코드 분석으로 정확히 찾습니다. 그래서 memo 자식에 넘기는 props가 안정되고, 리렌더가 줄어듭니다. 전제는 컴포넌트가 순수하다는 것이고, 어긴 함수는 컴파일하지 않습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 컴파일 전후",
        body: "babel-plugin-react-compiler 1.0.0으로 네 가지를 컴파일했습니다. items.filter·onPick·map을 쓰는 보통 컴포넌트는 CompileSuccess, import { c as _c } from \"react/compiler-runtime\"이 붙고 const $ = _c(11)로 슬롯 열한 개, if ($[0] !== filter || $[1] !== items || $[2] !== sel)처럼 입력을 비교해 같으면 재사용하는 코드가 됐습니다. 입력이 없는 클로저(() => setSel(i))는 Symbol.for(\"react.memo_cache_sentinel\")로 한 번만 만듭니다. 'use no memo'를 적은 함수는 CompileSkip, 원문 그대로. props를 고치는 user.name = …은 CompileError 'This value cannot be modified'와 함께 원문 그대로이고 빌드는 통과했습니다(panicThreshold none). 'all_errors'를 주니 'Found 1 error:'로 던졌습니다. 조건부 훅은 'Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks', 렌더 중 ref.current는 'Cannot access refs during render'로 건너뛰었습니다. useMemo(() => a + b, [a])처럼 의존성이 빠진 수동 메모는 컴파일러가 useMemo를 걷어내고 v = a + b를 매 렌더 계산하되 JSX는 v가 바뀔 때만 다시 만들도록 바꿨습니다. 빠졌던 b도 반영됩니다. target: '18'이면 import가 \"react-compiler-runtime\"으로, gating을 주면 export const List = isCompilerOn() ? function List(t0) {…} : function List({ items, filter }) {…}로 두 판이 나왔습니다.",
        code: "// 입력\nexport function List({ items, filter }) {\n  const [sel, setSel] = useState(null);\n  const shown = items.filter(i => i.includes(filter));\n  const onPick = (i) => setSel(i);\n  return <ul>{shown.map(i => <li key={i} onClick={() => onPick(i)}>{i}{sel === i ? ' *' : ''}</li>)}</ul>;\n}\n\n// 출력 (babel-plugin-react-compiler 1.0.0 · 앞부분)\nimport { c as _c } from \"react/compiler-runtime\";\nexport function List(t0) {\n  const $ = _c(11);                                   // 슬롯 11\n  const { items, filter } = t0;\n  const [sel, setSel] = useState(null);\n  let t1;\n  if ($[0] !== filter || $[1] !== items || $[2] !== sel) {   // 입력이 바뀌었나\n    let t2;\n    if ($[4] !== filter) { t2 = i => i.includes(filter); $[4] = filter; $[5] = t2; } else { t2 = $[5]; }\n    const shown = items.filter(t2);\n    let t3;\n    if ($[6] === Symbol.for(\"react.memo_cache_sentinel\")) { t3 = i_0 => setSel(i_0); $[6] = t3; } else { t3 = $[6]; }   // 입력 없는 클로저: 한 번만\n    …\n\n// 이벤트 (logger)\n보통 컴포넌트            CompileSuccess\n'use no memo'          CompileSkip                                   → 원문\nuser.name = …          CompileError: This value cannot be modified     → 원문 · 빌드 계속 (none) / all_errors: THROWS 'Found 1 error:'\nif (on) useState()     CompileError: Hooks must always be called in a consistent order, and may not be called conditionally…\nr.current++ (렌더)     CompileError: Cannot access refs during render\ntarget '18'            import { c as _c } from \"react-compiler-runtime\"\ngating                 export const List = isCompilerOn() ? function List(t0){…} : function List({items, filter}){…}",
      },
      {
        label: "문제의 구조: 컴파일러는 '순수하다' 는 약속 위에서만 코드를 바꿀 수 있다",
        body: "메모이제이션은 '입력이 같으면 출력이 같다'가 참일 때만 안전합니다. 그 참을 보장하는 것이 React 규칙입니다. 컴포넌트가 props를 고치면(불변성 위반) 전 렌더의 값을 재사용하는 순간 틀린 값이 되고, 조건부 훅이면 슬롯 순서가 어긋나고, 렌더 중 ref를 읽으면 입력에 안 잡히는 값이 결과를 바꿉니다. 그래서 컴파일러는 규칙을 '검사'한 뒤 통과한 함수만 바꾸고, 어긴 함수는 건너뜁니다. 건너뛴 함수는 전처럼 돌지만 느릴 뿐 틀리지는 않습니다. 이 설계가 panicThreshold 기본값 'none'(건너뛰고 계속)의 이유이고, ESLint 플러그인이 같은 진단을 에디터에서 보여 주는 이유이고, 'use no memo'가 '규칙은 지켰는데 컴파일 결과가 이상할 때'의 임시 탈출구인 이유입니다. 실제로 돌려 보면 어긴 세 경우 모두 원문 그대로 남았습니다.",
        code: "React 규칙 (순수 · 훅 순서 · 불변)  ──참이면──▶  '입력 같으면 출력 같다'  ──▶  메모이제이션 안전  ──▶  컴파일\n                                 ──거짓이면─▶  재사용하면 틀림           ──▶  건너뜀 (CompileError, 원문 유지, 느릴 뿐 맞음)\n\npanicThreshold 'none'   = 건너뛰고 빌드 계속 (운영 권장)\nESLint 플러그인          = 같은 진단을 에디터에서\n'use no memo'           = 규칙은 지켰는데 결과가 이상할 때의 임시 탈출구",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 둘로 들어갑니다. '설정'은 다섯 옵션의 값과 기본값, 언제 바꾸나. '지시어'는 'use memo'·'use no memo'의 자리와 우선순위. 설치와 도입 순서는 배우기 쪽 '시작하기 > React 컴파일러' 노드에 있습니다.",
      },
    ],
    sources: [
      { label: "React Compiler", href: `${DOCS}/learn/react-compiler` },
      { label: "Configuration", href: `${DOCS}/reference/react-compiler/configuration` },
      { label: "Directives", href: `${DOCS}/reference/react-compiler/directives` },
      { label: "Compiling Libraries", href: `${DOCS}/reference/react-compiler/compiling-libraries` },
    ],
  },

  {
    id: "ra-compiler-config",
    name: "컴파일러 설정",
    tagline: "compilationMode, target, panicThreshold, logger, gating — 무엇을, 어느 React 로, 에러는 어떻게, 기록은, 켜고 끄기는",
    intro:
      "참고서의 컴파일러 설정 다섯입니다. babel.config.js의 plugins: [['babel-plugin-react-compiler', { … }]]에 넘깁니다. compilationMode는 '무엇을 컴파일하나', target은 '어느 React용 런타임을 쓰나', panicThreshold는 '컴파일 에러를 만나면 건너뛰나 빌드를 깨나', logger는 '무슨 일이 있었는지 받기', gating은 '런타임 플래그로 컴파일판과 원본 중 고르기'입니다. 기본값만으로 대부분 충분하고, 문서는 '운영 빌드는 늘 panicThreshold none'이라고 적습니다. 실제로 돌려 보면 annotation 모드는 'use memo'를 적은 함수만 바꿨고, target '18'은 import를 react-compiler-runtime으로 바꿨고, all_errors는 props 변경 하나에 빌드를 던졌고, gating은 두 판을 삼항으로 묶었습니다. 이 노드의 질문은 하나입니다. 어느 옵션을 언제 건드리나.",
    blocks: [
      {
        label: "무엇이 들어 있나: 다섯 옵션",
        body: "compilationMode(기본 'infer'): infer는 'use memo'가 있는 함수, 또는 PascalCase 이름이면서 JSX를 만들거나 훅을 부르는 함수, 또는 use로 시작하면서 JSX·훅이 있는 함수를 컴파일합니다. annotation은 'use memo'가 있는 함수만. '점진적 도입에 이상적'. syntax는 Flow의 component·hook 문법만(TypeScript에서는 안 됨). all은 최상위 함수 전부('React가 아닌 함수까지 컴파일할 수 있어 권하지 않음'). 'use no memo'는 모든 모드에서 건너뜁니다. target(기본 '19'): '19'는 추가 런타임 없이 react/compiler-runtime, '17'·'18'은 react-compiler-runtime 패키지를 dependencies(devDependencies 아님)에 넣어야 하고 출력이 그 패키지를 import합니다. 패치 버전 없이 문자열. panicThreshold(기본 'none'): none은 컴파일 못 하는 컴포넌트를 건너뛰고 빌드 계속(권장), critical_errors는 치명적 에러만 빌드 실패, all_errors는 어떤 진단에도 실패. '운영 빌드는 늘 none이어야 한다. 높은 값은 개발 중에만 유용'. logger(기본 null): { logEvent(filename, event) }. event.kind는 CompileSuccess, CompileError(detail.reason·description·loc·suggestions), CompileDiagnostic(치명적 아님), CompileSkip, PipelineError, Timing. '이벤트 구조는 버전 간 바뀔 수 있다'. gating(기본 null): { source: '모듈 경로', importSpecifierName: '불리언을 돌려주는 named export' }. 출력은 플래그 함수를 모듈 평가 때 한 번 부르고 컴파일판과 원본 중 고르는 삼항입니다. 둘 다 번들에 들어가 커지고, 컴파일된 함수가 있는 모든 파일에 import가 추가됩니다. default export는 안 됩니다.",
        code: "// babel.config.js\nmodule.exports = {\n  plugins: [\n    ['babel-plugin-react-compiler', {\n      compilationMode: 'infer',          // 'annotation' 으로 시작하면 'use memo' 붙인 것만\n      target: '19',                      // '18' | '17' 이면 npm i react-compiler-runtime (dependencies 에)\n      panicThreshold: 'none',            // 운영은 늘 none · 개발 중 'all_errors' 로 전부 드러내기\n      logger: { logEvent(filename, event) { if (event.kind === 'CompileError') console.warn(filename, event.detail?.reason); } },\n      gating: { source: './src/flags', importSpecifierName: 'isCompilerEnabled' },   // 켜고 끄기\n    }],\n  ],\n};\n\n// 모드별로 컴파일되는 것\n'infer'       'use memo' 함수 · PascalCase + (JSX | 훅) · use* + (JSX | 훅)        ← 기본\n'annotation'  'use memo' 함수만                                                ← 점진 도입\n'syntax'      Flow component/hook 문법만                                        ← TS 불가\n'all'         최상위 함수 전부                                                   ← 비권장\n(모든 모드)    'use no memo' 는 건너뜀",
        terms: [
          {
            term: "게이팅 (gating)",
            body: "같은 컴포넌트의 컴파일된 판과 원본 판을 둘 다 번들에 넣고, 런타임의 불리언 함수로 어느 쪽을 쓸지 고르는 설정입니다. 실제로 돌려 보면 import { isCompilerOn } from \"./flags\"가 추가되고 export const List = isCompilerOn() ? function List(t0) {…컴파일판…} : function List({ items, filter }) {…원본…}이 됐습니다. 플래그는 모듈 평가 때 한 번만 읽힙니다. 운영에서 문제가 나면 코드 배포 없이 끌 수 있는 대신 번들이 두 배 가까이 커집니다. 도입 초기용입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 옵션을 바꾸면",
        body: "같은 소스에 옵션만 바꿔 컴파일했습니다. compilationMode: 'annotation'에서 'use memo'가 있는 Opt는 _c(4)로 컴파일됐고 옆의 Plain은 원문 그대로였습니다. 기본 infer에서는 PascalCase + JSX라 둘 다 컴파일됩니다. target: '18'은 출력 첫 줄이 import { c as _c } from \"react-compiler-runtime\"으로 바뀌었고 나머지는 같았습니다. 그 패키지가 없으면 런타임에 'Cannot find module'입니다. panicThreshold 기본에서 props 변경 컴포넌트는 CompileError 이벤트만 남기고 원문으로 통과, 'all_errors'에서는 transformSync가 'Found 1 error:'로 던졌습니다. logger로 받은 이벤트는 CompileSuccess, CompileSkip('use no memo'), CompileError(reason: 'This value cannot be modified', 'Hooks must always be called in a consistent order…', 'Cannot access refs during render')였고, ref 접근은 한 함수에서 세 번(읽기·쓰기·JSX) 보고됐습니다. gating은 위 낱말 풀이대로 두 판이 나왔습니다.",
        code: "옵션                         결과 (babel-plugin-react-compiler 1.0.0)\ncompilationMode 'annotation'   Opt('use memo') → _c(4) 컴파일 · Plain → 원문\ncompilationMode 'infer' (기본)  둘 다 컴파일 (PascalCase + JSX)\ntarget '18'                    import { c as _c } from \"react-compiler-runtime\"   (패키지 필요)\npanicThreshold 'none' (기본)    user.name = … → CompileError 이벤트 · 원문 · 빌드 OK\npanicThreshold 'all_errors'     같은 소스 → THROWS 'Found 1 error:'\nlogger                         [CompileSuccess] [CompileSkip] [CompileError: This value cannot be modified] [CompileError: Cannot access refs during render ×3]\ngating                         import { isCompilerOn } from \"./flags\";  export const List = isCompilerOn() ? function List(t0){…} : function List({items, filter}){…}",
        codeLang: "text",
      },
      {
        label: "문제: 켰는데 빨라진 게 없다",
        body: "컴파일러를 켜고 배포했는데 Profiler로 보면 리렌더 수가 그대로입니다. 두 원인이 흔합니다. 첫째, 컴파일이 건너뛰어졌습니다. panicThreshold가 none이라 규칙을 어긴 컴포넌트는 조용히 원문으로 남습니다. 실제로 돌려 보면 props 변경 하나로 그 컴포넌트 전체가 건너뛰어졌습니다. logger로 CompileError를 모아 보거나 ESLint 플러그인의 같은 진단을 보고 고칩니다. 둘째, 플러그인 순서입니다. 컴파일러는 다른 Babel 플러그인보다 먼저(첫 번째로) 돌아야 원본 JSX·훅을 봅니다. Vite면 @vitejs/plugin-react의 babel.plugins 맨 앞, Next면 reactCompiler: true. 셋째, 컴파일 자체는 됐는데 느린 원인이 메모이제이션이 아닐 수 있습니다. 컴파일러는 리렌더를 줄이지만 큰 리스트·무거운 Effect·네트워크는 못 줍니다. 개발 중에만 panicThreshold: 'all_errors'로 건너뛴 곳을 전부 드러내고, 운영은 none으로 되돌립니다.",
      },
      {
        label: "문제가 나는 경우: 옵션을 잘못 잡을 때",
        body: "경우 ㄱ, 조용한 건너뜀입니다. 위의 사고입니다. 경우 ㄴ, 운영에 all_errors입니다. 라이브러리 업데이트 하나에 빌드가 깨집니다. 운영은 none. 경우 ㄷ, React 18에 target 기본('19')입니다. 'Cannot find module react/compiler-runtime'. target: '18' + react-compiler-runtime을 dependencies에. 경우 ㄹ, 런타임을 devDependencies에 넣습니다. 운영 설치에서 빠져 런타임 에러. 경우 ㅁ, 'all' 모드입니다. 유틸 함수까지 컴파일해 뜻이 바뀔 수 있습니다. infer나 annotation. 경우 ㅂ, syntax 모드를 TypeScript에서. Flow 전용이라 아무것도 컴파일 안 됨. 경우 ㅅ, infer인데 컴포넌트가 camelCase입니다. 컴포넌트로 안 보여 건너뜁니다. 문서는 'use memo'로 강제하지 말고 이름을 PascalCase로 고치라고 적습니다. 경우 ㅇ, gating의 default export입니다. named export여야 합니다. 경우 ㅈ, gating을 운영에 영구로 둡니다. 번들이 두 배. 도입이 끝나면 뗍니다. 경우 ㅊ, gating 플래그를 요청마다 바꾸려 합니다. 모듈 평가 때 한 번만 읽힙니다. 경우 ㅋ, logger 이벤트 구조에 의존하는 도구를 만듭니다. '버전 간 바뀔 수 있다'. kind와 reason만 느슨하게. 경우 ㅌ, 플러그인 순서가 뒤입니다. 다른 플러그인이 바꾼 코드를 받아 분석이 틀어집니다. 맨 앞에.",
        code: "경우               언제 생기나                       겉모습                                  들통나는 때\nㄱ 조용한 건너뜀      규칙 위반 + none                   빨라진 게 없음                           Profiler\nㄴ 운영 all_errors    panicThreshold 'all_errors' 배포    의존성 하나에 빌드 실패                    CI\nㄷ 18 + target 19    React 18 에 기본                   Cannot find module 'react/compiler-runtime'   런타임\nㄹ devDependencies   react-compiler-runtime 위치         운영 설치에서 빠짐                        배포\nㅁ 'all'            유틸까지 컴파일                     뜻 바뀜                                 드물게\nㅂ 'syntax' + TS     Flow 문법만                        아무것도 안 됨                           -\nㅅ camelCase 컴포넌트  infer 가 못 알아봄                 건너뜀                                  Profiler\nㅇ default export    gating source                     에러                                   빌드\nㅈ gating 영구       도입 끝나고도                      번들 2배                                번들 크기\nㅊ 요청마다 플래그    런타임 토글 기대                    모듈 평가 때 한 번                        -\nㅋ logger 구조 의존   detail 필드 가정                   버전 올리면 깨짐                          업그레이드\nㅌ 플러그인 순서      컴파일러가 뒤                      분석 틀어짐 · 건너뜀                      Profiler",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 옵션은 '어디까지 바꿀 것인가' 와 '실패를 어떻게 다룰 것인가' 두 축",
        body: "다섯 옵션은 두 축으로 나뉩니다. 범위 축: compilationMode(어느 함수를), target(어느 React를), gating(어느 환경에서). 실패 축: panicThreshold(에러를 건너뛰나 깨나), logger(무엇이 건너뛰어졌나). 사고는 범위를 넓게 잡고 실패를 안 보거나(ㄱ, ㅁ), 범위를 잘못 잡아 아무것도 안 바뀌거나(ㅂ, ㅅ, ㄷ), 실패를 운영에서 깨뜨리거나(ㄴ) 합니다. 문서가 권하는 길은 범위는 좁게 시작해 넓히고(annotation → infer, gating으로 끄기 가능), 실패는 개발에서는 크게 보고(all_errors·logger·ESLint) 운영에서는 조용히 건너뛰는(none) 것입니다. 건너뛴 컴포넌트는 느릴 뿐 틀리지 않다는 것이 이 설계의 바탕입니다.",
        code: "범위 축 (어디까지)                        실패 축 (어떻게)\ncompilationMode  어느 함수   annotation → infer    panicThreshold  건너뛰나 깨나   개발 all_errors → 운영 none\ntarget           어느 React  19 / 18·17+런타임       logger          무엇이 건너뛰어졌나  kind · reason 만 느슨하게\ngating           어느 환경   도입기만, 끝나면 제거\n\n권장 길:  좁게 시작 → 넓히기  ·  개발에선 크게 보고 → 운영에선 조용히 건너뛰기  ·  건너뛴 것은 느릴 뿐 맞다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 '지시어'는 함수 단위의 스위치입니다. 'use memo'(컴파일하라)와 'use no memo'(건너뛰라). 실제로 돌려 보면 'use no memo'는 CompileSkip으로 원문을 남겼고, annotation 모드에서 'use memo'만 컴파일됐습니다.",
      },
      {
        label: "확인 질문",
        body: "React 18.3을 쓰는 큰 앱에 컴파일러를 도입합니다. (1) 처음 설정은? (2) 어느 컴포넌트가 건너뛰어졌는지 어떻게 알까요? (3) 운영에서 문제가 나면 코드 배포 없이 끄려면?",
        notes: [
          {
            title: "답",
            body: "(1) target: '18'과 npm i react-compiler-runtime(dependencies에)이 먼저입니다. 기본 '19'면 react/compiler-runtime을 찾다가 실패합니다. compilationMode: 'annotation'으로 시작해 'use memo'를 붙인 디렉터리부터 넓히고, 안정되면 'infer'로 바꿉니다. panicThreshold는 운영 none, 로컬·CI 검사용 빌드에서만 'all_errors'. Babel 플러그인 목록 맨 앞에 둡니다. (2) 둘입니다. logger의 logEvent에서 kind === 'CompileError'인 것을 파일명과 detail.reason으로 모아 리포트합니다(실제로 'This value cannot be modified', 'Cannot access refs during render' 같은 reason이 옵니다). 그리고 eslint-plugin-react-hooks의 recommended를 켜면 같은 진단(refs, immutability, purity, set-state-in-render 등)이 에디터에 바로 보입니다. (3) gating: { source: './src/flags', importSpecifierName: 'isCompilerEnabled' }를 둡니다. 출력이 isCompilerEnabled() ? 컴파일판 : 원본의 삼항이 되어(실제로 확인) 플래그 함수가 원격 설정을 읽으면 배포 없이 끌 수 있습니다. 단, 플래그는 모듈 평가 때 한 번 읽히고 번들이 두 판을 담아 커지므로 도입기가 끝나면 gating을 뗍니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Configuration", href: `${DOCS}/reference/react-compiler/configuration` },
      { label: "compilationMode", href: `${DOCS}/reference/react-compiler/compilationMode` },
      { label: "target", href: `${DOCS}/reference/react-compiler/target` },
      { label: "panicThreshold", href: `${DOCS}/reference/react-compiler/panicThreshold` },
      { label: "logger", href: `${DOCS}/reference/react-compiler/logger` },
      { label: "gating", href: `${DOCS}/reference/react-compiler/gating` },
    ],
  },

  {
    id: "ra-compiler-directives",
    name: "컴파일러 지시어",
    tagline: "'use memo' 와 'use no memo': 함수 하나를 켜고 끄는 문자열",
    intro:
      "참고서의 컴파일러 지시어 둘입니다. 함수 몸의 첫 문장(또는 파일의 첫 줄)에 문자열 리터럴로 적습니다. 'use memo'는 '이 함수를 컴파일하라'(annotation 모드에서는 필수, infer에서는 강제, all에서는 중복), 'use no memo'는 '이 함수는 건너뛰라'(모든 모드와 다른 지시어보다 우선, 별칭 'use no forget'). 문서는 'use no memo'를 '임시 탈출구'라 부르고, infer 모드에서 컴파일이 안 되는 컴포넌트는 'use memo'로 강제하지 말고 이름 규칙을 고치라고 적습니다. 실제로 돌려 보면 'use no memo'를 적은 함수는 CompileSkip 이벤트와 함께 지시어까지 원문 그대로 남았고, annotation 모드에서 'use memo'를 적은 함수만 _c(4)로 컴파일됐습니다. 이 노드의 질문은 하나입니다. 언제 함수 하나를 따로 켜고 끄나.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "'use memo': 함수 몸의 맨 처음(import·다른 코드보다 앞, 주석은 괜찮음)에 둡니다. 첫 지시어만 처리되고 정확히 일치해야 하며 홑따옴표·쌍따옴표 둘 다 됩니다. 모드별 뜻은 annotation에서 '컴파일할 함수의 표시'(없으면 안 함), infer에서 '이름 규칙에 안 맞아도 강제', all에서 '중복'. 'use no memo': 함수 몸 첫 줄 또는 파일 첫 줄(파일 단위는 함수 단위가 덮음). 'use no forget'도 같은 뜻입니다. 어떤 모드·지시어보다 우선합니다. 쓰는 때는 '규칙은 지켰는데 컴파일 결과가 이상한 것 같을 때' 원인을 가르기 위해, 또는 호환되지 않는 라이브러리(react-hook-form의 watch, MobX observer 등 incompatible-library 린트가 가리키는 것)를 쓰는 컴포넌트를 임시로 빼기 위해서입니다. 코드 뒤에 적으면 '너무 늦다'(무시). 라이브러리 작성자는 디버깅용으로만 쓰고 배포본에는 두지 않습니다.",
        code: "// 함수 단위 — 몸의 첫 문장\nfunction Heavy({ rows }) {\n  'use memo';                 // annotation 모드: 이것만 컴파일 · infer: 강제\n  …\n}\nfunction Legacy({ form }) {\n  'use no memo';              // 어떤 모드에서도 건너뜀 · 별칭 'use no forget'\n  const v = form.watch('x');  // 호환 안 되는 API 를 쓰는 동안만\n  …\n}\n\n// 파일 단위 — 첫 줄 (함수 단위가 덮는다)\n'use no memo';\nimport …\n\n// 너무 늦다 — 무시됨\nfunction C() {\n  const x = 1;\n  'use no memo';              // ✗ 첫 문장이 아니다\n}",
        terms: [
          {
            term: "지시어 (directive)",
            body: "함수나 모듈의 맨 앞에 두는 문자열 리터럴 문장입니다. 자바스크립트의 'use strict'와 같은 자리이고 실행하면 아무 일도 안 하지만, 도구가 읽어 뜻을 부여합니다. React에는 넷이 있습니다. 컴파일러의 'use memo'·'use no memo', 서버 컴포넌트의 'use client'·'use server'. 전부 '첫 문장이어야 한다'와 '정확히 그 글자'가 규칙입니다. 파일 중간에 두면 그냥 문자열입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "'use no memo'를 적은 Raw 함수를 기본(infer) 모드로 컴파일하니 logger에 CompileSkip 하나가 왔고 출력은 지시어 문장까지 원문 그대로였습니다. compiler-runtime import도 없습니다. compilationMode: 'annotation'에서 'use memo'를 적은 Opt와 적지 않은 Plain을 같은 파일에 두니 Opt만 import { c as _c }와 _c(4)로 바뀌고 Plain은 원문입니다. 출력에서 \"use memo\" 문장은 그대로 남아 있습니다(런타임에는 무해). 기본 infer 모드에서는 둘 다 PascalCase + JSX라 지시어 없이도 컴파일됩니다.",
        code: "// 'use no memo' (infer 모드)\n입력: export function Raw({ a }) { 'use no memo'; const x = { a }; return <div>{x.a}</div>; }\n이벤트: [CompileSkip]\n출력: (원문 그대로 · compiler-runtime import 없음)\n\n// annotation 모드\n입력: Opt { 'use memo'; … }   Plain { … }\n이벤트: [CompileSuccess]   (Opt 만)\n출력: import { c as _c } from \"react/compiler-runtime\"; export function Opt(t0) { \"use memo\"; const $ = _c(4); … }   export function Plain({ a }) { … 원문 … }",
      },
      {
        label: "문제: 컴파일러를 켜자 폼 라이브러리 값이 갱신되지 않는다",
        body: "react-hook-form의 watch('field')를 렌더에서 읽는 컴포넌트가, 컴파일러를 켠 뒤 입력을 바꿔도 화면이 안 바뀝니다. watch는 구독 없이 내부 가변 값을 읽는 API라 '입력이 같으면 출력이 같다'가 성립하지 않습니다. 컴파일러는 그 값을 의존성으로 보지 못해 전 결과를 재사용합니다. 처방은 셋 중 하나입니다. 그 컴포넌트에 'use no memo'를 붙여 임시로 빼고, 라이브러리가 권하는 useWatch(구독 기반)로 바꾼 뒤 지시어를 뗍니다. eslint-plugin-react-hooks의 incompatible-library 린트가 이 자리를 'Compilation Skipped: Use of incompatible library'로 가리켜 줍니다(실제로 확인). 컴파일러도 그 API를 알아보면 스스로 건너뜁니다. 지시어는 원인을 찾는 동안의 임시 조치이고, 영구로 두면 그 컴포넌트는 영원히 최적화 밖입니다.",
      },
      {
        label: "문제가 나는 경우: 스위치를 잘못 쓸 때",
        body: "경우 ㄱ, 호환 안 되는 라이브러리입니다. 위의 사고입니다. 경우 ㄴ, 'use no memo'를 영구 해법으로 둡니다. 원인(규칙 위반)이 남아 다른 자리에서도 터집니다. 고치고 뗍니다. 경우 ㄷ, 지시어가 첫 문장이 아닙니다. 무시됩니다. 경우 ㄹ, 글자가 다릅니다. 'use-no-memo', 'use nomemo'는 그냥 문자열. 경우 ㅁ, 백틱입니다. 템플릿 리터럴은 지시어가 아닙니다. 경우 ㅂ, 파일 단위 'use no memo'로 디렉터리를 끄려 합니다. 파일 하나만. 디렉터리는 Babel의 include/exclude. 경우 ㅅ, infer에서 안 되는 컴포넌트에 'use memo'를 붙입니다. 문서는 이름(camelCase → PascalCase)을 고치라고 합니다. 강제하면 다른 도구(DevTools·린트)도 컴포넌트로 못 봅니다. 경우 ㅇ, 'use memo'로 규칙 위반을 넘어가려 합니다. 'use memo'는 강제 '시도'일 뿐 규칙을 어기면 여전히 CompileError로 건너뜁니다. 경우 ㅈ, 라이브러리 배포본에 'use no memo'를 남깁니다. 사용자 앱에서 그 컴포넌트가 최적화 밖. 디버깅 뒤 제거. 경우 ㅊ, 'use client'와 혼동합니다. 서로 다른 도구의 지시어이고 둘 다 첫 줄에 올 수 있지만 뜻이 다릅니다. 경우 ㅋ, 두 지시어를 한 함수에 둡니다. 첫 지시어만 처리되고 'use no memo'가 우선입니다.",
        code: "경우               언제 생기나                        겉모습                            들통나는 때\nㄱ 비호환 라이브러리   watch · observer                   값이 안 갱신                       컴파일러 켠 뒤\nㄴ 영구 탈출구        'use no memo' 로 끝               최적화 밖 · 원인 잔존                 성능 · 다른 자리\nㄷ 첫 문장 아님       코드 뒤에 지시어                   무시                              -\nㄹ 글자 다름         'use-no-memo'                     그냥 문자열                        -\nㅁ 백틱             `use no memo`                     지시어 아님                         -\nㅂ 디렉터리 기대      파일 단위로 전부                   파일 하나만                         다른 파일\nㅅ 강제 컴파일        camelCase + 'use memo'            다른 도구가 컴포넌트로 못 봄            DevTools\nㅇ 규칙 위반 강제     'use memo' + props 변경            여전히 건너뜀 (CompileError)          logger\nㅈ 배포본에 남김      라이브러리 'use no memo'           사용자 앱에서 최적화 밖               성능\nㅊ 'use client' 혼동   서버 컴포넌트 지시어와             뜻 다름                            -\nㅋ 둘 다 적음        'use memo' + 'use no memo'         첫 것만 · no memo 우선               -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 지시어는 범위(설정)의 예외이고, 예외는 임시여야 한다",
        body: "설정(compilationMode)이 '어느 함수를 컴파일하나'의 기본 범위를 정하고, 지시어는 함수 하나를 그 범위에 넣거나(use memo) 빼는(use no memo) 예외입니다. 예외가 영구가 되면 두 가지 비용이 생깁니다. 빼 둔 함수는 최적화 밖에 남고(ㄴ, ㅈ), 넣은 함수는 이름 규칙을 어긴 채라 다른 도구가 못 알아봅니다(ㅅ). 그리고 지시어는 '시도'이지 '보증'이 아닙니다. 'use memo'를 적어도 규칙을 어기면 건너뛰고(ㅇ), 'use no memo'는 라이브러리 비호환처럼 '지금은 어쩔 수 없는' 자리의 표시입니다(ㄱ). 처방은 지시어를 TODO처럼 다루는 것입니다. 왜 붙였는지 주석을 남기고, 원인(라이브러리 교체·규칙 수정·이름 변경)이 해소되면 뗍니다.",
        code: "설정 compilationMode  = 기본 범위 (annotation 좁게 / infer 보통 / all 넓게)\n  'use memo'          = 범위에 넣는 예외 (시도 · 규칙 어기면 여전히 건너뜀 ㅇ) · 이름 고치는 게 정답 (ㅅ)\n  'use no memo'       = 범위에서 빼는 예외 (우선) · 비호환 라이브러리 · 디버깅 (ㄱ) · 임시 (ㄴ ㅈ)\n\n규칙: 첫 문장 · 정확한 글자 · 따옴표 (ㄷ ㄹ ㅁ) · 파일 하나 (ㅂ)\n다루기: 주석으로 이유 → 원인 해소 → 제거",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 '개발자 도구'는 컴파일러가 줄였다는 리렌더를 눈으로 보는 자리입니다. React 19.2의 Performance 트랙(Scheduler·Components·Server)이 브라우저 Performance 패널에 React의 렌더·커밋·효과를 레인별로 그립니다.",
      },
      {
        label: "확인 질문",
        body: "컴파일러를 켠 뒤 (1) 차트 컴포넌트 하나가 이상하게 동작합니다. 원인이 컴파일러인지 어떻게 가를까요? (2) 그 컴포넌트가 MobX observer를 쓰고 있었습니다. 어떻게 할까요? (3) 유틸 함수 renderRows(rows)가 JSX를 돌려주는데 컴파일이 안 됩니다. 'use memo'를 붙일까요?",
        notes: [
          {
            title: "답",
            body: "(1) 그 함수 첫 줄에 'use no memo'를 적고 다시 봅니다. 고쳐지면 컴파일러(정확히는 그 컴포넌트가 '입력이 같으면 출력이 같다'를 깨는 자리)가 원인입니다. 실제로 돌려 보면 지시어가 있으면 CompileSkip으로 원문이 쓰입니다. 안 고쳐지면 다른 원인입니다. 지시어는 가르기용이고 결론이 아닙니다. (2) MobX의 observer는 컴포넌트 밖의 가변 상태를 구독하는 방식이라 컴파일러의 메모이제이션과 맞지 않습니다. 문서의 incompatible-library 페이지는 MobX observer를 아직 자동으로 못 알아보니 'use no memo'를 쓰라고 적습니다. 그 컴포넌트에 지시어와 이유 주석을 남기고, 라이브러리가 호환 가이드를 내거나 상태를 React 식으로 옮길 때 뗍니다. (3) 붙이지 않습니다. renderRows는 컴포넌트가 아니라 JSX를 돌려주는 헬퍼이고, 컴포넌트의 일부로 호출됩니다. 호출하는 컴포넌트가 컴파일되면 그 결과도 메모이제이션됩니다. 정말 컴포넌트로 쓸 것이면 Rows로 이름을 바꾸고 <Rows rows={rows} />로 렌더합니다. 문서는 infer에서 안 되는 함수에 'use memo'를 강제하지 말고 이름 규칙을 고치라고 적습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Directives", href: `${DOCS}/reference/react-compiler/directives` },
      { label: "\"use memo\"", href: `${DOCS}/reference/react-compiler/directives/use-memo` },
      { label: "\"use no memo\"", href: `${DOCS}/reference/react-compiler/directives/use-no-memo` },
      { label: "incompatible-library", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/incompatible-library` },
    ],
  },

  {
    id: "ra-devtools",
    name: "개발자 도구",
    tagline: "React Performance 트랙: 렌더·커밋·효과를 브라우저 Performance 패널에서 레인별로",
    intro:
      "참고서의 개발자 도구 갈래는 'React Performance tracks' 한 페이지입니다. React 19.2부터 React가 브라우저 Performance 패널의 타임라인에 자기 트랙을 그립니다. Scheduler 트랙(Blocking·Transition·Suspense·Idle 레인에 무엇이 스케줄됐나), Components 트랙(어느 컴포넌트가 얼마나 렌더됐나, 효과는 얼마나 걸렸나, 마운트·언마운트), Server 트랙(서버 요청·서버 컴포넌트, 개발 빌드만). 개발 빌드와 프로파일링 빌드(react-dom/profiling)에서만 켜지고 운영 빌드에서는 꺼져 있습니다. 이 시트는 돌려 보지 않았습니다. 문서 기준이고, 다른 노드에서 측정한 수치(StrictMode 두 번 렌더, Suspense 300ms 묶음, 전환의 입력 우선)가 이 트랙에서 어떻게 보일지를 함께 적습니다. 이 노드의 질문은 하나입니다. '느리다'를 어디서 어떻게 읽나.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "문서의 정의는 'React Performance 트랙은 브라우저 개발자 도구 Performance 패널의 타임라인에 나타나는 특수한 사용자 정의 항목'입니다. 트랙 셋입니다. Scheduler: 하위 트랙 Blocking(동기 갱신, 클릭·입력 같은 긴급), Transition(startTransition으로 시작한 비차단 작업), Suspense(Suspense 경계 관련 작업), Idle(가장 낮은 우선순위). 각 레인에 Update(갱신 스케줄) → Render → Commit → Remaining Effects 단계가 그려집니다. 렌더 중 갱신이 스케줄되면 React가 완료된 작업을 버리고 새 패스를 시작할 수 있는데, 개발 빌드는 이것을 'Cascading update' 항목과 스케줄한 스택으로 보여 줍니다. Components: 컴포넌트별 렌더 시간을 플레임그래프로, 효과 시간을, Mount·Unmount·Reconnect·Disconnect 이벤트를 보여 줍니다. 효과는 0.05ms 이상이거나 갱신을 일으킨 것만. 개발 빌드에서는 렌더 항목을 누르면 바뀐 props가 보입니다. Server: Server Requests와 Server Components 하위 트랙, 개발 빌드만. 켜는 조건: 개발 빌드는 기본 켜짐, 프로파일링 빌드는 Scheduler 트랙만 기본 켜짐이고 react-dom/profiling을 번들러 alias로 react-dom/client 대신 씁니다. 운영 빌드는 꺼져 있습니다. 확장 API를 제공하는 브라우저의 Performance 패널에 보입니다.",
        code: "트랙          하위 트랙 / 내용                                               빌드\nScheduler     Blocking · Transition · Suspense · Idle  레인마다 Update → Render → Commit → Remaining Effects   개발 · 프로파일링(기본)\n              Cascading update (렌더 중 스케줄된 갱신 + 스택)                       개발\nComponents    렌더 플레임그래프 · 효과 시간(≥0.05ms 또는 갱신 유발) · Mount/Unmount/Reconnect/Disconnect · 바뀐 props(개발)   개발 · 프로파일링(켜야 함)\nServer        Server Requests · Server Components                                개발\n\n켜기:  개발 빌드 = 기본  ·  프로파일링 빌드 = react-dom/profiling 을 alias (Scheduler 만 기본)  ·  운영 = 꺼짐\n보기:  브라우저 Performance 패널 → 녹화 → React 트랙",
        codeLang: "text",
        terms: [
          {
            term: "레인 (lane)",
            body: "React가 갱신을 우선순위별로 나누는 통로입니다. 클릭·입력 같은 동기 갱신은 Blocking, startTransition 안의 갱신은 Transition, Suspense 경계의 재시도는 Suspense, 남는 시간에 하는 일은 Idle입니다. 같은 레인의 갱신은 함께 묶여 한 번에 렌더됩니다. 실제로 돌려 보면(상호작용성·훅 노드) 같은 틱의 set 셋이 한 렌더로 묶이고, 전환 안의 느린 갱신보다 입력이 먼저 반영됐습니다. 그 둘이 이 트랙에서는 Blocking 레인의 한 Render와 Transition 레인의 뒤따르는 Render로 보입니다.",
          },
          {
            term: "프로파일링 빌드 (profiling build)",
            body: "운영 빌드의 성능에 가깝되 측정 훅이 남아 있는 react-dom 빌드입니다. react-dom/profiling을 react-dom/client 대신 쓰도록 번들러 alias를 잡습니다. 운영 번들에 실수로 들어가면 조금 느려지므로 측정용 배포에만 씁니다. <Profiler> 컴포넌트의 onRender도 이 빌드에서 동작합니다.",
          },
        ],
      },
      {
        label: "다른 노드의 측정이 트랙에서 보이는 모양",
        body: "직접 녹화하지는 않았지만 측정한 사실은 트랙의 모양으로 옮길 수 있습니다. StrictMode의 renders 2·effects 2·cleanups 1은 Components 트랙에서 같은 컴포넌트의 렌더 막대 둘과 효과 막대 둘(사이에 정리)로 보입니다. 운영에서는 하나입니다. 같은 틱의 set 세 번 → n=3은 Blocking 레인의 Update 셋이 Render 하나로 묶인 모양입니다. useTransition으로 느린 탭 전환과 입력을 같은 틱에 넣어 입력이 먼저 반영된 것은 Blocking 레인의 짧은 Render 뒤에 Transition 레인의 긴 Render가 오는 모양입니다. Suspense가 60ms에 온 데이터를 401ms에 드러낸 것은 Suspense 레인에서 재시도 Render가 약 300ms 뒤에 오는 모양입니다. 렌더 중 setState로 'Too many re-renders'가 난 것은 Cascading update가 연쇄로 쌓인 모양입니다. 효과 순서 Child layout → Parent layout → Child effect → Parent effect는 Commit 안의 Layout 효과 막대 뒤에 Remaining Effects의 막대로 보입니다.",
        code: "측정 (다른 노드)                                트랙에서 보이는 모양\nStrictMode renders 2 · effects 2 · cleanups 1     Components: 같은 컴포넌트 렌더 막대 2 · 효과 2 (운영은 1)\nset ×3 → 1 렌더 (n=3)                             Scheduler/Blocking: Update 3 → Render 1\n전환: 입력 먼저, 느린 탭 뒤                        Blocking 짧은 Render → Transition 긴 Render\nSuspense 60ms 도착 → 401ms 드러남                 Suspense 레인: 재시도 Render 가 ~300ms 뒤\n렌더 중 setState → Too many re-renders              Cascading update 연쇄 (개발 빌드가 스택 표시)\nChild layout → Parent layout │ Child effect → Parent effect   Commit 안 layout 막대 → Remaining Effects 막대",
        codeLang: "text",
      },
      {
        label: "문제: 입력이 버벅이는데 어느 컴포넌트 탓인지 모른다",
        body: "검색창에 타이핑할 때 글자가 늦게 뜹니다. console.log 렌더 횟수로는 범인이 안 보입니다. Performance 패널을 켜고 타이핑을 녹화합니다. Scheduler 트랙의 Blocking 레인에 키 입력마다 Render가 길게 그려지면, 입력 갱신과 함께 무거운 것이 같은 레인에서 렌더되는 것입니다. Components 트랙의 플레임그래프에서 그 Render 안에 가장 긴 막대(예: 결과 목록 3,000행)가 범인입니다. 개발 빌드면 막대를 눌러 '바뀐 props'를 보고 왜 다시 그려졌는지 확인합니다. 처방은 그 목록을 Transition 레인으로 옮기는 것입니다. 목록 갱신을 useDeferredValue(query)나 startTransition으로 감싸면 Blocking 레인에는 입력만 남고 목록은 Transition 레인에서 뒤따릅니다. 실제로 돌려 보면 그렇게 하자 입력이 먼저 반영됐습니다. 그 뒤에도 목록 Render 자체가 길면 가상화(windowing)나 memo로 막대를 줄입니다.",
      },
      {
        label: "문제가 나는 경우: 측정을 잘못 읽을 때",
        body: "경우 ㄱ, 개발 빌드로 '느리다'를 판단합니다. StrictMode 두 번 렌더와 개발 검사가 섞여 운영보다 2배 이상 느립니다. 프로파일링 빌드로 잽니다. 경우 ㄴ, 운영 빌드에서 트랙이 안 보입니다. 꺼져 있습니다. react-dom/profiling alias. 경우 ㄷ, 프로파일링 빌드에서 Components 트랙이 비어 있습니다. Scheduler만 기본이라 켜야 합니다. 경우 ㄹ, 효과가 안 보입니다. 0.05ms 미만이고 갱신을 안 일으킨 효과는 그려지지 않습니다. 경우 ㅁ, Blocking 레인의 긴 Render를 보고 전환으로 옮겼는데 여전히 느립니다. 레인을 바꾸면 입력은 살지만 그 Render의 길이는 같습니다. 막대 자체를 줄여야(가상화·memo·분할) 합니다. 경우 ㅂ, Cascading update를 버그로만 봅니다. 레이아웃 측정 뒤 setState처럼 의도된 연쇄도 있습니다. 스택을 보고 가릅니다. 경우 ㅅ, Suspense 레인의 300ms 지연을 데이터 지연으로 봅니다. 드러내기 묶음입니다. 네트워크 탭과 같이 봅니다. 경우 ㅇ, 트랙이 안 나오는 브라우저입니다. Performance 확장 API가 있는 브라우저에서. 경우 ㅈ, 프로파일링 빌드를 운영에 배포합니다. 조금 느려집니다. 측정용 배포만. 경우 ㅊ, 서버 트랙을 운영에서 기대합니다. 개발 빌드만입니다.",
        code: "경우               언제 생기나                       겉모습                            들통나는 때\nㄱ 개발 빌드로 판단    StrictMode·검사 포함               2배 이상 느림                       운영과 비교\nㄴ 운영에서 안 보임    production 빌드                   트랙 없음                          -\nㄷ Components 비어 있음  프로파일링 빌드 기본              Scheduler 만                       녹화\nㄹ 효과 안 보임       < 0.05ms · 갱신 없음              막대 없음                          -\nㅁ 레인만 바꿈        전환으로 옮기고 끝                  입력은 살았는데 느림                 녹화\nㅂ 연쇄 = 버그        측정 뒤 setState                  Cascading update                    스택 확인\nㅅ 300ms 오해        Suspense 레인 지연                 데이터 탓으로 착각                    네트워크 탭\nㅇ 브라우저           확장 API 없음                     트랙 없음                          -\nㅈ 운영에 프로파일링   alias 가 운영 빌드에                조금 느림                          번들 검사\nㅊ 운영 서버 트랙     개발만                            없음                              -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 느림은 '어느 레인에서, 어느 컴포넌트가, 얼마나' 의 세 좌표다",
        body: "Performance 트랙은 느림을 세 좌표로 분해합니다. 레인(Scheduler: 긴급한 자리에서 느린가, 미뤄도 되는 자리인가), 컴포넌트(Components: 누가), 길이(막대: 얼마나). 처방이 좌표마다 다릅니다. 레인이 틀렸으면 startTransition·useDeferredValue로 옮기고(입력은 살림, 길이는 그대로, ㅁ), 컴포넌트가 불필요하게 그려지면 바뀐 props를 보고 참조를 고정하거나 컴파일러를 켜고, 길이가 길면 가상화·분할·서버로 옮깁니다. 측정 자체의 조건도 좌표입니다. 어느 빌드에서(ㄱ, ㄴ, ㄷ, ㅈ), 어느 임계 위에서(ㄹ), 어느 지연이 설계인지(ㅅ, ㅂ). 처방은 녹화 전에 빌드를 정하고, 녹화 뒤에는 레인 → 컴포넌트 → 길이 순서로 읽는 것입니다.",
        code: "느림 = (레인, 컴포넌트, 길이)\n레인 틀림   → Blocking 에 무거운 것   → startTransition · useDeferredValue 로 옮김 (입력 살림 · 길이 그대로 ㅁ)\n누가       → Components 플레임그래프 · 바뀐 props → 참조 고정 · memo · 컴파일러\n얼마나     → 긴 막대                 → 가상화 · 분할 · 서버 컴포넌트\n\n측정 조건:  빌드 (개발 2배 ㄱ · 운영 꺼짐 ㄴ · 프로파일링 alias ㄷ ㅈ) · 임계 0.05ms (ㄹ) · 설계된 지연 (Suspense 300ms ㅅ · 의도된 연쇄 ㅂ)\n읽는 순서:  빌드 정하기 → 녹화 → 레인 → 컴포넌트 → 길이",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 'ESLint 플러그인'은 트랙이 '느리다'를 보여 주는 것과 반대로, 코드가 '틀릴 수 있다'를 쓰는 중에 보여 줍니다. eslint-plugin-react-hooks 7의 recommended는 훅 규칙 둘에 컴파일러 진단 열넷을 더했습니다. 실제로 돌려 보면 조건부 훅, 렌더 중 ref, 렌더 중 setState, Effect 안 동기 setState가 바로 울렸습니다.",
      },
      {
        label: "확인 질문",
        body: "운영 사이트에서 '탭 전환이 느리다'는 제보가 왔습니다. (1) 어떤 빌드로 무엇을 녹화할까요? (2) 녹화에서 Blocking 레인에 400ms Render가 보이고 그 안에 <TabContent>가 가장 길다면 처방 두 단계는? (3) 전환 뒤 Suspense 레인에 300ms쯤 빈 구간이 있다면?",
        notes: [
          {
            title: "답",
            body: "(1) 운영 빌드에는 트랙이 없고 개발 빌드는 StrictMode 두 번 렌더로 2배 느려 판단이 흐려집니다. react-dom/profiling을 alias한 프로파일링 빌드를 측정용으로 올리고(Components 트랙도 켜고) 탭 전환을 녹화합니다. (2) 첫 단계는 레인입니다. 탭 전환 setTab을 startTransition으로 감싸면 Blocking 레인에는 탭 버튼의 활성 표시만 남고 TabContent 렌더는 Transition 레인으로 가서 클릭 반응이 즉시 돌아옵니다. 이전 탭 내용은 isPending 동안 유지됩니다. 실제로 돌려 보면 전환 안의 느린 갱신보다 긴급 갱신이 먼저 반영됐습니다. 둘째 단계는 길이입니다. 400ms 막대 자체는 레인을 바꿔도 같으므로 TabContent 안의 플레임그래프에서 긴 자식을 찾아 가상화·memo(바뀐 props 확인)·데이터 분할로 줄입니다. (3) Suspense 레인의 약 300ms 공백은 데이터 지연이 아니라 React의 드러내기 묶음일 가능성이 큽니다. 실제로 돌려 보면 60ms에 온 데이터가 401ms에 드러났습니다. 네트워크 탭에서 응답 시각을 확인하고, 빠른 응답이면 fallback을 보이지 않도록 전환으로 갱신해 옛 내용을 유지하거나(그러면 묶음 없음), 데이터를 미리 받아 pending 자체를 없앱니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "React Performance tracks", href: `${DOCS}/reference/dev-tools/react-performance-tracks` },
      { label: "React Developer Tools", href: `${DOCS}/learn/react-developer-tools` },
      { label: "<Profiler>", href: `${DOCS}/reference/react/Profiler` },
    ],
  },

  {
    id: "ra-eslint",
    name: "ESLint 플러그인",
    tagline: "eslint-plugin-react-hooks: 훅 규칙 둘 + 컴파일러 진단 — 틀릴 수 있는 코드를 쓰는 중에",
    intro:
      "참고서의 eslint-plugin-react-hooks 갈래입니다. 문서의 정의는 'React 규칙을 강제하는 ESLint 규칙을 제공한다'입니다. 오래된 둘(rules-of-hooks, exhaustive-deps)에 7.x부터 React 컴파일러의 진단을 린트로 옮긴 것들(refs, purity, immutability, set-state-in-render, set-state-in-effect, static-components, error-boundaries, globals, use-memo, preserve-manual-memoization, incompatible-library, unsupported-syntax, config, gating, component-hook-factories)이 더해졌습니다. 컴파일러를 쓰지 않아도 이 진단은 쓸 수 있습니다. 실제로 돌려 보면(7.1.1) 플러그인은 규칙 29개를 내보내고 recommended는 열여섯을 켜며, 조건부 훅·빠진 의존성·Effect 안 동기 setState·렌더 중 setState·렌더 중 ref·렌더 중 컴포넌트 정의·Math.random·try/catch 안 JSX·비호환 라이브러리가 최소 예제에서 바로 울렸습니다. 이 노드의 자식 '린트 목록'이 열일곱 규칙 하나하나입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "플러그인 하나, 프리셋 recommended(과 recommended-latest, flat 설정용 configs.flat.recommended). 규칙은 두 묶음입니다. 기본 패턴: rules-of-hooks(훅은 최상위·React 함수에서만), exhaustive-deps(의존성 배열 완전성). 컴파일러 진단: 컴포넌트·훅의 순수성과 불변성, 훅·ref·setState의 자리, 컴파일러 설정 검증. 문서는 '컴파일러 진단은 앱이 컴파일러를 도입하지 않았어도 쓸 수 있다'고 적습니다. 설치는 npm i -D eslint-plugin-react-hooks, flat 설정(eslint.config.js)에서는 import reactHooks from 'eslint-plugin-react-hooks'; export default [reactHooks.configs.flat.recommended]입니다. 실제로 돌려 보면 7.1.1의 recommended는 열여섯 규칙을 켭니다. error: rules-of-hooks, static-components, use-memo, preserve-manual-memoization, immutability, globals, refs, set-state-in-effect, error-boundaries, purity, set-state-in-render, config, gating. warn: exhaustive-deps, incompatible-library, unsupported-syntax. 문서가 recommended에 든다고 적은 component-hook-factories는 7.1.1의 recommended에 없었습니다(규칙은 내보냅니다). 나머지 열셋(capitalized-calls, fbt, hooks, invariant, memo-dependencies, memoized-effect-dependencies, no-deriving-state-in-effects, rule-suppression, syntax, todo, void-use-memo, exhaustive-effect-dependencies…)은 내보내지만 recommended 밖입니다.",
        code: "// eslint.config.js (flat)\nimport reactHooks from 'eslint-plugin-react-hooks';\nexport default [\n  { files: ['**/*.{js,jsx,ts,tsx}'], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },\n  reactHooks.configs.flat.recommended,\n  // 공유 설정: 커스텀 Effect 훅도 exhaustive-deps 가 보게\n  { settings: { 'react-hooks': { additionalEffectHooks: '(useMyEffect|useCustomEffect)' } } },\n];\n\n// eslint-plugin-react-hooks 7.1.1 · recommended 가 켜는 16\nerror: rules-of-hooks · static-components · use-memo · preserve-manual-memoization · immutability · globals · refs · set-state-in-effect · error-boundaries · purity · set-state-in-render · config · gating\nwarn:  exhaustive-deps · incompatible-library · unsupported-syntax\n(내보내지만 recommended 밖: component-hook-factories 외 12)",
        terms: [
          {
            term: "컴파일러 진단 (compiler diagnostics)",
            body: "React 컴파일러가 코드를 분석하다 '이 함수는 규칙을 어겨 컴파일할 수 없다'고 판단할 때 내는 이유(reason)입니다. 'Cannot access refs during render', 'This value cannot be modified' 같은 문장. 7.x 플러그인은 같은 분석기를 ESLint 규칙으로 감싸 그 이유를 에디터에 표시합니다. 실제로 돌려 보면 컴파일러의 logger가 낸 'Cannot access refs during render'와 린트 refs의 메시지가 같은 문장이었습니다. 그래서 린트가 깨끗하면 컴파일러가 건너뛸 함수도 거의 없습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 최소 예제 열다섯",
        body: "eslint 10 + eslint-plugin-react-hooks 7.1.1의 recommended로 열다섯 가지 최소 예제를 돌렸습니다. 아홉이 울렸습니다. 조건부 useState → rules-of-hooks 'React Hook \"useState\" is called conditionally. React Hooks must be called in the exact same order in every component render.' useEffect에서 count를 쓰고 []→ exhaustive-deps 'React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array.' Effect 안 setItems(data) → set-state-in-effect 'Calling setState synchronously within an effect can trigger cascading renders'. 렌더 중 setC(value) → set-state-in-render 'Cannot call setState during render'. 렌더 중 r.current → refs 'Cannot access refs during render'. 컴포넌트 안 const Child = () => … → static-components 'Cannot create components during render'. 렌더 중 Math.random() → purity 'Cannot call impure function during render'. try { return <Child/> } catch → error-boundaries 'Avoid constructing JSX within try/catch'. react-hook-form watch('field') → incompatible-library 'Compilation Skipped: Use of incompatible library'. useMemo(() => data.filter(filter), [data])는 preserve-manual-memoization이 아니라 exhaustive-deps가 'missing dependency: filter'로 잡았습니다. 울리지 않은 것: 이벤트 핸들러 안의 items.push(immutability — 렌더가 아니라 핸들러라 안 울린 것이 맞음), 모듈 변수 renderCount++(globals), 반환 없는 useMemo(use-memo), eval(unsupported-syntax)은 내 최소 예제에서 안 울렸습니다(문서 예제와 모양이 다를 수 있음). 깨끗한 컴포넌트는 보고 없음.",
        code: "예제                                        규칙 → 메시지 (eslint-plugin-react-hooks 7.1.1)\nif (on) { useState() }                        rules-of-hooks → React Hook \"useState\" is called conditionally. React Hooks must be called in the exact same order…\nuseEffect(() => log(count), [])               exhaustive-deps → React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array.\nuseEffect(() => setItems(data), [data])       set-state-in-effect → Calling setState synchronously within an effect can trigger cascading renders\nsetC(value) (렌더 중)                          set-state-in-render → Cannot call setState during render\nconst v = r.current (렌더 중)                  refs → Cannot access refs during render\nconst Child = () => … (컴포넌트 안)             static-components → Cannot create components during render\nMath.random() (렌더 중)                        purity → Cannot call impure function during render\ntry { return <Child/> } catch {…}              error-boundaries → Avoid constructing JSX within try/catch\nwatch('field') (react-hook-form)               incompatible-library → Compilation Skipped: Use of incompatible library\nuseMemo(() => data.filter(filter), [data])     exhaustive-deps → missing dependency: 'filter'   (preserve-manual-memoization 아님)\n핸들러 안 items.push → (보고 없음 — 렌더 아님)   renderCount++ · 반환 없는 useMemo · eval → (최소 예제에선 보고 없음)\n깨끗한 컴포넌트                                (보고 없음)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 린트는 컴파일러가 '건너뛸' 자리를 쓰는 중에 미리 보여 준다",
        body: "컴파일러 노드에서 본 대로, 규칙을 어긴 함수는 조용히 건너뛰어집니다. 그 '조용히'를 깨는 것이 이 플러그인입니다. 같은 분석기가 같은 이유를 에디터에 쓰는 중에 보여 줍니다. 그래서 린트의 메시지와 컴파일러 logger의 reason이 같은 문장이고(refs의 'Cannot access refs during render'), 린트가 깨끗한 코드는 컴파일러가 거의 다 바꿉니다. 둘은 역할이 갈립니다. 린트는 '틀릴 수 있다'(규칙 위반)를, Performance 트랙은 '느리다'를, 컴파일러는 '빠르게'를. 셋이 전부 React 규칙이라는 하나의 약속 위에 있습니다. 규칙을 지키면 세 도구가 다 일하고, 어기면 셋이 다 멈춥니다.",
        code: "React 규칙 (순수 · 훅 자리 · 불변)\n   ├─ ESLint 플러그인     쓰는 중에  '틀릴 수 있다'  → 같은 분석기 · 같은 reason\n   ├─ React 컴파일러      빌드 때    '빠르게'        → 규칙 지킨 함수만 (어기면 조용히 건너뜀 → 린트가 그 조용함을 깬다)\n   └─ Performance 트랙    돌릴 때    '느리다'        → 레인 · 컴포넌트 · 길이",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 노드 '린트 목록'이 열일곱 규칙을 하나씩 다룹니다. 규칙마다 무엇을 잡나, 문서의 틀린 예와 처방, 실제로 돌려 본 메시지.",
      },
    ],
    sources: [
      { label: "eslint-plugin-react-hooks", href: `${DOCS}/reference/eslint-plugin-react-hooks` },
      { label: "Rules of React", href: `${DOCS}/reference/rules` },
    ],
  },

  {
    id: "ra-eslint-lints",
    name: "린트 목록",
    tagline: "열일곱 규칙을 네 묶음으로: 훅의 자리, 렌더의 순수성, 메모이제이션, 컴파일러 설정",
    intro:
      "참고서의 린트 페이지 열일곱입니다. exhaustive-deps, rules-of-hooks, component-hook-factories, config, error-boundaries, gating, globals, immutability, incompatible-library, preserve-manual-memoization, purity, refs, set-state-in-effect, set-state-in-render, static-components, unsupported-syntax, use-memo. 네 묶음으로 읽으면 외우기 쉽습니다. 훅의 자리(rules-of-hooks, exhaustive-deps, component-hook-factories, static-components), 렌더의 순수성(purity, globals, immutability, refs, set-state-in-render, set-state-in-effect, error-boundaries), 메모이제이션(use-memo, preserve-manual-memoization, incompatible-library, unsupported-syntax), 컴파일러 설정(config, gating). 실제로 돌려 보면 아홉이 최소 예제에서 울렸고, 메시지는 컴파일러의 reason과 같은 문장이었습니다. 이 노드의 질문은 하나입니다. 이 경고는 어느 규칙을 어겼다는 뜻인가.",
    blocks: [
      {
        label: "묶음 1: 훅과 컴포넌트의 자리",
        body: "rules-of-hooks: 훅은 매 렌더 같은 순서로 불려야 합니다. 조건·반복·중첩 함수·조기 return 뒤·이벤트 핸들러·클래스·useMemo 등의 콜백·try/catch 안·async 함수·모듈 최상위에서 부르면 울립니다. use만 조건·반복에서 예외이되 try/catch는 안 됩니다. 처방은 훅을 최상위로 올리고 조건을 안으로. exhaustive-deps: 의존성 배열에 훅 안에서 쓴 모든 값이 있어야 합니다. 빠지면 오래된 클로저. 처방은 추가하거나, 한 번만 돌릴 것이면 ref 가드. 공유 설정 additionalEffectHooks로 커스텀 Effect 훅도 검사. component-hook-factories: 컴포넌트·훅을 다른 함수 안에서 만들어 돌려주지 말 것. 매 호출 새 컴포넌트라 state가 날아갑니다. 모듈 최상위에 두고 children으로 조합. static-components: 컴포넌트 안에서 컴포넌트를 정의하지 말 것. 렌더마다 새 타입이라 자식이 매번 언마운트·마운트. 모듈 최상위로 올리고 props로 넘깁니다. 실제로 돌려 보면 rules-of-hooks는 'React Hook \"useState\" is called conditionally…', exhaustive-deps는 'missing dependency: 'count'…', static-components는 'Cannot create components during render'였습니다.",
        code: "규칙                       잡는 것                                     문서의 틀린 예                                처방\nrules-of-hooks             훅 순서 깨짐                                 if (isLoggedIn) { const [u] = useState() }     최상위에서 부르고 조건은 안으로 · use 만 예외\nexhaustive-deps            빠진 의존성 (오래된 클로저)                    useEffect(() => log(count), [])                [count] · 한 번만이면 ref 가드 · additionalEffectHooks\ncomponent-hook-factories   함수가 컴포넌트·훅을 만들어 반환                 function create(d) { return function C() {…} }   모듈 최상위 + children 조합\nstatic-components          컴포넌트 안에서 컴포넌트 정의                   function P() { const C = () => …; return <C/> }   모듈 최상위 + props\n\n// 측정 메시지 (7.1.1)\nrules-of-hooks:     React Hook \"useState\" is called conditionally. React Hooks must be called in the exact same order in every component render.\nexhaustive-deps:    React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array.\nstatic-components:  Cannot create components during render",
        codeLang: "text",
      },
      {
        label: "묶음 2: 렌더의 순수성",
        body: "purity: 렌더 중 Math.random(), Date.now(), new Date(), crypto.randomUUID(), performance.now() 같은 비순수 함수 호출. 처방은 useState(() => crypto.randomUUID()) 같은 초기화 함수, 시계는 useEffect의 setInterval. globals: 렌더 중 전역·모듈 변수 대입·변경(renderCount++, window.x = …, 모듈 배열 push). state·컨텍스트로, 또는 Effect에서(document.title). immutability: props·state·훅 반환값 변경(items.push(4); setItems(items), items.sort()). 처방은 새 값([...items, 4], {...user, name}). refs: 렌더 중 ref.current 읽기·쓰기. Effect·핸들러에서, 화면 값이면 state. 지연 초기화 if (ref.current === null) ref.current = …는 허용. set-state-in-render: 렌더 중 무조건 setState(무한 루프). 렌더 중 파생하거나 핸들러에서, 또는 if (items !== prevItems) 패턴. set-state-in-effect: Effect 안 동기 setState(연쇄 렌더). 렌더 중 파생으로. useLayoutEffect의 측정 뒤 set은 예외. error-boundaries: try/catch로 렌더 에러를 잡으려 함(try { return <Child/> }). 렌더 에러는 try/catch가 못 잡으니 <ErrorBoundary>로. use()도 try/catch 금지, Suspense + 경계. 실제로 돌려 보면 purity 'Cannot call impure function during render', refs 'Cannot access refs during render', set-state-in-render 'Cannot call setState during render', set-state-in-effect 'Calling setState synchronously within an effect can trigger cascading renders', error-boundaries 'Avoid constructing JSX within try/catch'였습니다. 핸들러 안의 push는 immutability가 울리지 않았는데 렌더가 아니어서 맞는 동작이고, 모듈 변수 증가(globals)는 최소 예제에서 안 울렸습니다.",
        code: "규칙                  잡는 것                              문서의 틀린 예                               처방\npurity               렌더 중 비순수 함수                    const id = Math.random()                    useState(() => crypto.randomUUID()) · Effect 의 setInterval\nglobals              렌더 중 전역·모듈 변수 변경              renderCount++ · window.currentUser = id        state · 컨텍스트 · Effect 에서\nimmutability         props·state·훅 값 변경                  items.push(4); setItems(items)               setItems([...items, 4]) · 중첩마다 spread\nrefs                 렌더 중 ref.current                    const v = ref.current                        Effect·핸들러에서 · 화면 값은 state · 지연 초기화는 허용\nset-state-in-render  렌더 중 무조건 setState                 setCount(value)                             파생 · 핸들러 · if (a !== prev) 패턴 · setter 안 clamp\nset-state-in-effect  Effect 안 동기 setState                 useEffect(() => setItems(data), [data])      렌더 중 파생 (const sel = items.find(…)) · layout 측정은 예외\nerror-boundaries     try/catch 로 렌더 에러                   try { return <Child/> } catch {…}           <ErrorBoundary> · use 는 Suspense + 경계\n\n// 측정 메시지 (7.1.1)\npurity:               Cannot call impure function during render\nrefs:                 Cannot access refs during render\nset-state-in-render:  Cannot call setState during render\nset-state-in-effect:  Calling setState synchronously within an effect can trigger cascading renders\nerror-boundaries:     Avoid constructing JSX within try/catch",
        codeLang: "text",
        terms: [
          {
            term: "연쇄 렌더 (cascading render)",
            body: "커밋이 끝난 Effect 안에서 바로 setState를 부르면 React가 방금 그린 화면을 버리고 다시 렌더합니다. 한 번의 갱신이 두 번의 렌더가 되고 사용자는 중간 상태를 한 프레임 볼 수 있습니다. set-state-in-effect가 잡는 것이 이 모양입니다. 처방은 '렌더 중 파생'입니다. 다른 state·props로 계산할 수 있는 값은 state로 두지 말고 렌더 중에 계산합니다. Performance 트랙에서는 Cascading update로 보입니다.",
          },
        ],
      },
      {
        label: "묶음 3: 메모이제이션과 호환성",
        body: "use-memo: useMemo 콜백은 값을 돌려줘야 하고 부수 효과를 두면 안 됩니다(useMemo(() => { data.forEach(…) }, [data])). 값을 return하거나 Effect·핸들러로. preserve-manual-memoization: 컴파일러는 기존 useMemo·useCallback·React.memo를 보존하되, 의존성이 불완전하면(useMemo(() => data.filter(filter), [data])) 그 이상의 최적화를 못 합니다. 의존성을 완성하거나 컴파일러를 쓰면 수동 메모를 제거. incompatible-library: 메모이제이션과 맞지 않는 라이브러리 API를 알려진 목록으로 잡습니다. react-hook-form의 watch(→ useWatch), TanStack Table의 useReactTable. MobX observer는 아직 못 알아보니 'use no memo'. unsupported-syntax: 컴파일러가 분석할 수 없는 문법. eval(code), with (Math) {…}, eval(`props.${name}`). props[name], Math.sin(…), 안전한 파서 라이브러리. 실제로 돌려 보면 incompatible-library는 'Compilation Skipped: Use of incompatible library'로 울렸고, 불완전한 useMemo 의존성은 exhaustive-deps가 'missing dependency: filter'로 잡았으며, 반환 없는 useMemo와 eval은 최소 예제에서 울리지 않았습니다. 컴파일러 노드에서 본 대로, 의존성이 빠진 useMemo를 컴파일러는 자기 메모로 바꿔 빠진 의존성(b)도 반영했습니다.",
        code: "규칙                           잡는 것                                문서의 틀린 예                                    처방\nuse-memo                       반환 없음 · 부수 효과                    useMemo(() => { data.forEach(…) }, [data])          값을 return · 효과는 Effect·핸들러\npreserve-manual-memoization    불완전한 수동 메모 의존성                 useMemo(() => data.filter(filter), [data])          의존성 완성 · 컴파일러 쓰면 수동 메모 제거\nincompatible-library           비호환 라이브러리 API                     const v = watch('field')  (react-hook-form)         useWatch · MobX observer 는 'use no memo'\nunsupported-syntax             분석 불가 문법                           eval(code) · with (Math) {…}                      props[name] · Math.sin · 파서 라이브러리\n\n// 측정 (7.1.1)\nincompatible-library:  Compilation Skipped: Use of incompatible library\nuseMemo(…, [data]) 불완전:  exhaustive-deps → missing dependency: 'filter'   (컴파일러는 useMemo 를 걷어내고 b 까지 반영한 자기 메모로)",
        codeLang: "text",
      },
      {
        label: "묶음 4: 컴파일러 설정 검증",
        body: "config: babel-plugin-react-compiler 옵션의 이름과 값 타입을 검증합니다. compileMode(오타, compilationMode가 맞음), compilationMode: 'everything'(없는 값). 유효한 값은 compilationMode 'infer' | 'annotation' | 'syntax' | 'all', panicThreshold 'none' | 'critical_errors' | 'all_errors'. gating: gating 옵션의 모양을 검증합니다. 문자열('__experimental_useCompiler')이면 안 되고 객체 { source, importSpecifierName }이어야 하며 source가 빠지면 안 됩니다. 컴파일러를 전부에 적용하려면 gating을 생략합니다. 둘은 코드가 아니라 설정 파일의 린트라 recommended에서 error로 켜져 있어도 보통 조용합니다. 설정 노드에서 본 대로 실제 컴파일에서는 잘못된 값이 바로 에러가 되므로, 이 두 린트는 그보다 앞서 에디터에서 잡아 주는 역할입니다.",
        code: "규칙      잡는 것                       틀린 예                                           맞는 예\nconfig    옵션 이름·값 타입               compileMode: 'all' · compilationMode: 'everything'    compilationMode: 'infer' · panicThreshold: 'critical_errors'\ngating    gating 옵션 모양               gating: '__experimental_useCompiler' · { importSpecifierName } 만    gating: { source: 'featureFlags', importSpecifierName: 'isCompilerEnabled' } · 전부 적용이면 생략",
        codeLang: "text",
      },
      {
        label: "문제: 'missing dependency' 경고를 끄려고 의존성 배열을 비웠다",
        body: "useEffect(() => { onChange(value) }, [])에 exhaustive-deps가 'missing dependency: onChange, value'를 냅니다. 성가셔서 // eslint-disable-next-line을 붙였습니다. 두 달 뒤 value가 바뀌어도 onChange가 처음 값으로만 불리는 버그가 납니다. 오래된 클로저입니다. 이 린트가 잡는 것이 바로 그 버그이고, 끄는 것은 버그를 숨기는 것입니다. 처방은 셋입니다. 의존성을 넣습니다([onChange, value]). 함수가 매 렌더 바뀌어 Effect가 너무 자주 돌면 그 함수를 useEffectEvent로 감싸 비반응으로 만들거나(탈출구 노드), 컴파일러를 켜 참조를 고정합니다. 정말 '마운트에 한 번'이면 const sent = useRef(false); if (sent.current) return; sent.current = true 가드로 의도를 코드에 적습니다. 문서가 권하는 길입니다.",
      },
      {
        label: "문제가 나는 경우: 경고를 잘못 다룰 때",
        body: "경우 ㄱ, 끄기입니다. 위의 사고입니다. 경우 ㄴ, 조건부 훅을 조기 return으로 만듭니다. if (!user) return null; const [x] = useState() — 훅이 return 뒤라 울립니다. 훅을 위로. 경우 ㄷ, set-state-in-effect를 피하려 setTimeout(set)으로 감쌉니다. 린트는 피하지만 연쇄는 남고 한 프레임 더 늦습니다. 렌더 중 파생으로. 경우 ㄹ, 지연 초기화 ref에 refs가 울린다고 믿습니다. if (ref.current === null) ref.current = …는 허용입니다. 울리면 다른 읽기가 있습니다. 경우 ㅁ, 핸들러 안 변경에 immutability를 기대합니다. 렌더 밖은 범위가 아닙니다(실제로 안 울림). 대신 setItems(items)에 같은 참조를 넘기면 React가 바뀐 줄 모릅니다. 경우 ㅂ, static-components를 피하려 useMemo로 컴포넌트를 만듭니다. 여전히 컴포넌트 안 정의입니다. 모듈 최상위로. 경우 ㅅ, error-boundaries 경고에 try/catch를 이벤트 핸들러로 옮기면 됩니다. 핸들러 안 try/catch는 정상입니다. 렌더 에러만 경계로. 경우 ㅇ, use-memo 경고에 useMemo를 useEffect로 바꿉니다. 파생 값이면 useMemo에 return, 효과면 useEffect. 둘은 다릅니다. 경우 ㅈ, incompatible-library를 'use no memo'로 영구 처리합니다. 라이브러리의 호환 API(useWatch)로 바꾸고 뗍니다. 경우 ㅊ, 플러그인 6의 recommended만 켜 둡니다. 7의 컴파일러 진단이 빠집니다. 올리고 configs.flat.recommended. 경우 ㅋ, 커스텀 Effect 훅(useMyEffect)의 의존성이 검사되지 않습니다. settings 'react-hooks'.additionalEffectHooks. 경우 ㅌ, 문서의 열일곱이 전부 켜졌다고 믿습니다. 7.1.1의 recommended는 열여섯이고 component-hook-factories는 밖입니다. 필요하면 rules에 추가.",
        code: "경우               언제 생기나                          겉모습                              들통나는 때\nㄱ 끄기            eslint-disable + []                    오래된 클로저 버그                     나중\nㄴ 조기 return      if (!user) return null; useState()      rules-of-hooks                      바로\nㄷ setTimeout 우회   Effect 안 setTimeout(set)              연쇄 + 한 프레임 더                   깜빡임\nㄹ 지연 초기화 오해   if (ref.current === null) …            (허용) 울리면 다른 읽기               -\nㅁ 핸들러 변경 기대   items.push 후 setItems(items)           린트 조용 · React 가 변경 못 봄          화면 안 바뀜\nㅂ useMemo 컴포넌트  useMemo(() => () => …)                 여전히 안에서 정의                    static-components\nㅅ 핸들러 try/catch  onClick 안                              (정상)                              -\nㅇ useMemo→useEffect  파생 값을 Effect 로                    연쇄 렌더                           set-state-in-effect\nㅈ 영구 no memo      incompatible-library 에                 최적화 밖                           성능\nㅊ 6.x 프리셋        옛 recommended                          컴파일러 진단 없음                    린트 조용\nㅋ 커스텀 Effect 훅   useMyEffect 의존성                      검사 안 됨                          버그\nㅌ 17 전부 켜짐 믿음  component-hook-factories                 안 켜짐 (7.1.1)                     팩토리 버그",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 열일곱은 'React 규칙 셋' 의 검사기이고, 메시지는 어느 규칙인지를 말한다",
        body: "열일곱 린트는 React 규칙 노드의 세 규칙에 대응합니다. '컴포넌트와 훅은 순수해야 한다' → purity, globals, immutability, refs, set-state-in-render, set-state-in-effect(렌더 중 바깥을 바꾸거나 바깥에 의존하지 말 것). 'React가 컴포넌트와 훅을 부른다' → static-components, component-hook-factories, error-boundaries(컴포넌트를 값처럼 만들거나 직접 다루지 말 것). '훅의 규칙' → rules-of-hooks, exhaustive-deps(훅의 자리와 의존성). 그 위에 컴파일러 도입을 돕는 넷(use-memo, preserve-manual-memoization, incompatible-library, unsupported-syntax)과 설정 검증 둘(config, gating). 그래서 경고를 읽는 법은 '어느 묶음인가'를 먼저 보는 것입니다. 묶음 2면 '렌더 중에 할 일이 아니다'(Effect·핸들러·파생으로), 묶음 1이면 '자리를 옮겨라'(최상위·모듈), 묶음 3이면 '컴파일러가 못 본다'(API 교체·문법 교체), 묶음 4면 설정 파일. 끄는 것은 답이 아니고, 끄고 싶은 자리가 바로 컴파일러가 건너뛰는 자리입니다.",
        code: "React 규칙                         린트                                                      처방의 방향\n컴포넌트·훅은 순수해야 한다           purity · globals · immutability · refs · set-state-in-render · set-state-in-effect   렌더 중 할 일이 아니다 → Effect · 핸들러 · 파생\nReact 가 컴포넌트·훅을 부른다         static-components · component-hook-factories · error-boundaries                    컴포넌트를 값처럼 만들지 말라 → 모듈 최상위 · 경계\n훅의 규칙                           rules-of-hooks · exhaustive-deps                                                 자리와 의존성 → 최상위 · 완전한 deps\n컴파일러 도입                        use-memo · preserve-manual-memoization · incompatible-library · unsupported-syntax   컴파일러가 못 본다 → API · 문법 교체\n설정 검증                           config · gating                                                                  설정 파일\n\n끄고 싶은 자리 = 컴파일러가 건너뛰는 자리",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "린트가 검사하는 약속 자체가 다음 노드 'React 규칙'입니다. 세 규칙(순수성, React가 부른다, 훅의 규칙)과 그 아래 세부 조항. 문서는 이것을 '지침이 아니라 규칙'이라 부릅니다. 어기면 앱에 버그가 있을 가능성이 높다는 뜻에서.",
      },
      {
        label: "확인 질문",
        body: "다음 세 경고를 받았습니다. 각각 어느 묶음이고, 왜 울렸고, 어떻게 고칠까요? (a) refs: Cannot access refs during render — const w = sizeRef.current.width (b) set-state-in-effect — useEffect(() => { setFullName(first + ' ' + last) }, [first, last]) (c) exhaustive-deps — useEffect(() => { track(page) }, []) 그런데 '페이지 진입 시 한 번만' 보내야 함.",
        notes: [
          {
            title: "답",
            body: "(a) 묶음 2(순수성). 렌더 중 ref를 읽으면 React가 모르는 값이 결과에 섞여 메모이제이션이 틀어집니다. 폭이 화면에 필요하면 state로 두고 측정은 useLayoutEffect에서 setWidth(sizeRef.current.width)로 올립니다(이 setState는 예외로 허용). 화면에 필요 없으면 읽는 자리를 Effect나 핸들러로 옮깁니다. (b) 묶음 2. first·last로 계산할 수 있는 값을 state에 넣고 Effect로 동기화하면 커밋 뒤 다시 렌더하는 연쇄가 생깁니다. const fullName = first + ' ' + last로 렌더 중에 파생하고 state와 Effect를 지웁니다. 실제로 돌려 보면 Effect는 커밋·페인트 뒤에 돌아 한 프레임 늦습니다. (c) 묶음 1(훅의 자리·의존성). page를 쓰는데 []라 page가 바뀌어도 처음 값만 보냅니다. '한 번만'이 의도면 문서가 권하는 대로 의도를 코드에 적습니다. const sent = useRef(false); useEffect(() => { if (sent.current) return; sent.current = true; track(page) }, [page]). 의존성은 완전하게 두고 '한 번'은 가드로 표현합니다. eslint-disable로 끄면 나중에 page가 바뀔 때의 버그를 숨깁니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "eslint-plugin-react-hooks", href: `${DOCS}/reference/eslint-plugin-react-hooks` },
      { label: "rules-of-hooks", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/rules-of-hooks` },
      { label: "exhaustive-deps", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/exhaustive-deps` },
      { label: "set-state-in-effect", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/set-state-in-effect` },
      { label: "refs", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/refs` },
      { label: "purity", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/purity` },
      { label: "immutability", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/immutability` },
      { label: "incompatible-library", href: `${DOCS}/reference/eslint-plugin-react-hooks/lints/incompatible-library` },
    ],
  },

  {
    id: "ra-rules",
    name: "React 규칙",
    tagline: "지침이 아니라 규칙: 어기면 동작이 '틀리는' 게 아니라 '정의되지 않는다'",
    intro:
      "참고서의 React 규칙 갈래입니다. 문서의 정의는 '이것들은 지침이 아니라 규칙이다. 어기면 앱에 버그가 있을 가능성이 높다는 뜻에서'. 셋입니다. 컴포넌트와 훅은 순수해야 한다(같은 입력 → 같은 출력, 부수 효과는 렌더 밖, props·state·훅 인자와 반환값은 불변). React가 컴포넌트와 훅을 부른다(직접 호출하지 말고, 훅을 값처럼 넘기지 말 것). 훅의 규칙(최상위에서, React 함수에서만). 이 셋 위에 컴파일러(규칙 지킨 함수만 바꿈), ESLint 플러그인(어긴 자리를 쓰는 중에 표시), StrictMode(두 번 불러 순수성 검사)가 서 있습니다. 실제로 돌려 보면 StrictMode는 컴포넌트를 두 번 불렀고(renders 2), 컴파일러는 props를 고치는 함수를 'This value cannot be modified'로 건너뛰었고, 린트는 조건부 훅을 'called conditionally'로 잡았습니다. 셋이 같은 규칙의 세 얼굴입니다. 이 노드의 자식 '개요'가 조항 하나하나입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "규칙 1 '컴포넌트와 훅은 순수해야 한다'의 조항: 멱등(같은 입력에 같은 출력, 렌더 중 new Date() 금지), 부수 효과는 렌더 밖(document.title = … 는 Effect에서), props와 state는 불변 스냅샷(item.url = … 금지, count = count + 1 금지), 훅의 인자와 반환값은 불변(훅에 넘긴 객체를 고치지 말 것), JSX에 넘긴 뒤의 값은 불변(<Header styles={styles}/> 뒤 styles.size = … 금지), 지역 변경은 괜찮다(렌더 중 만든 배열에 push). 규칙 2 'React가 컴포넌트와 훅을 부른다': 컴포넌트 함수를 직접 부르지 말 것({Article()} 대신 <Article/>), 훅을 보통 값처럼 넘기지 말 것(고차 훅 withLogging(useData) 금지, <Button useData={…}> 금지). 규칙 3 '훅의 규칙': 최상위에서만(조건·반복·중첩 함수·try/catch/finally 안 금지, 조기 return 앞에), React 함수에서만(컴포넌트·커스텀 훅, 보통 함수·클래스·이벤트 핸들러 금지). 문서는 StrictMode와 ESLint 플러그인으로 어긴 곳을 찾으라고 권합니다.",
        code: "규칙                           조항                                                     검사기\n1 순수해야 한다                  멱등 · 부수 효과는 렌더 밖 · props·state 불변 · 훅 인자·반환 불변 · JSX 뒤 불변 · 지역 변경 OK    StrictMode 두 번 호출 · 린트 purity/globals/immutability/refs · 컴파일러\n2 React 가 부른다               컴포넌트 직접 호출 X · 훅을 값처럼 X (고차 훅 · prop 으로 훅)         린트 static-components/component-hook-factories · 컴파일러\n3 훅의 규칙                     최상위 (조건·반복·중첩·try 금지 · 조기 return 앞) · React 함수에서만    린트 rules-of-hooks · 컴파일러 · 런타임 순서 경고",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 세 검사기가 같은 규칙을 잡는다",
        body: "규칙 1: StrictMode 안의 컴포넌트는 개발 모드에서 renders 2, effects 2, cleanups 1이었습니다(밖은 1, 1, 0). 두 번 불러 결과가 같은지를 보는 것입니다. 컴파일러는 user.name = user.name.trim()을 'This value cannot be modified'로, 렌더 중 ref.current를 'Cannot access refs during render'로 건너뛰었고, 린트 purity는 Math.random()을 'Cannot call impure function during render'로 잡았습니다. 규칙 2: 린트 static-components는 컴포넌트 안의 const Child = () => …를 'Cannot create components during render'로 잡았습니다. 규칙 3: 컴파일러는 조건부 useState를 'Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks'로, 린트는 'React Hook \"useState\" is called conditionally…'로, 런타임은 순서가 바뀐 렌더에서 'React has detected a change in the order of Hooks called by %s…'로 잡았습니다. 컴포넌트 밖에서 훅을 부르니 'Cannot read properties of null (reading 'useState')'였습니다.",
        code: "규칙 1 (순수)\n  StrictMode:   { renders: 2, effects: 2, cleanups: 1 }   ← 두 번 불러 비교\n  컴파일러:      user.name = …        → CompileError: This value cannot be modified\n                r.current (렌더 중)   → CompileError: Cannot access refs during render\n  린트:          Math.random()        → purity: Cannot call impure function during render\n규칙 2 (React 가 부른다)\n  린트:          const Child = () => … (컴포넌트 안)  → static-components: Cannot create components during render\n규칙 3 (훅)\n  컴파일러:      if (on) useState()   → Hooks must always be called in a consistent order, and may not be called conditionally…\n  린트:          같은 코드             → React Hook \"useState\" is called conditionally…\n  런타임:        순서 바뀜             → React has detected a change in the order of Hooks called by %s…\n                컴포넌트 밖           → Cannot read properties of null (reading 'useState')",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 규칙은 React 가 '마음대로 부를 수 있다' 는 전제다",
        body: "React는 컴포넌트를 언제, 몇 번, 어느 순서로 부를지 스스로 정합니다. StrictMode에서 두 번, 전환에서 중단하고 다시, 서버에서 한 번, 컴파일러가 결과를 재사용. 이것이 가능한 조건이 세 규칙입니다. 순수해야 두 번 불러도 같고(1), React가 불러야 훅의 상태를 매달 자리가 있고(2), 훅 순서가 같아야 그 자리가 맞습니다(3). 규칙을 어기면 '지금은 돌아가는' 코드가 됩니다. StrictMode를 켜거나, 컴파일러를 켜거나, 전환을 쓰거나, 서버 컴포넌트로 옮기면 그때 깨집니다. 그래서 문서가 '정의되지 않음'이라 하고, 어긴 자리를 쓰는 중에 찾으라고 린트를 권합니다. 이 노드의 모든 '문제가 나는 경우' 표가 결국 이 세 규칙 중 하나로 돌아옵니다.",
        code: "React 가 하는 일                      필요한 규칙\n두 번 부른다 (StrictMode)              1 순수 (같은 결과)\n중단하고 다시 부른다 (전환 · Suspense)   1 순수 (버려도 안전)\n결과를 재사용한다 (컴파일러 · memo)      1 순수 + 불변 (입력 같으면 출력 같다)\n상태를 매단다 (훅)                      2 React 가 부른다 (디스패처) + 3 순서 (슬롯)\n\n어기면: 지금은 돌아감 → StrictMode · 컴파일러 · 전환 · 서버에서 깨짐 = '정의되지 않음'",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 노드 '개요'에서 조항마다 문서의 나쁜 예·좋은 예와, 왜 그것이 규칙인지를 적습니다.",
      },
    ],
    sources: [
      { label: "Rules of React", href: `${DOCS}/reference/rules` },
      { label: "Components and Hooks must be pure", href: `${DOCS}/reference/rules/components-and-hooks-must-be-pure` },
      { label: "React calls Components and Hooks", href: `${DOCS}/reference/rules/react-calls-components-and-hooks` },
      { label: "Rules of Hooks", href: `${DOCS}/reference/rules/rules-of-hooks` },
    ],
  },

  {
    id: "ra-rules-overview",
    name: "규칙 개요",
    tagline: "세 규칙의 조항 하나하나: 나쁜 예, 좋은 예, 왜 규칙인가",
    intro:
      "React 규칙 세 페이지의 조항을 그대로 따라갑니다. '컴포넌트와 훅은 순수해야 한다'(멱등, 부수 효과는 렌더 밖, props·state 불변, 훅 인자·반환 불변, JSX 뒤 불변, 지역 변경 OK), 'React가 컴포넌트와 훅을 부른다'(직접 호출 금지, 훅을 값처럼 금지), '훅의 규칙'(최상위, React 함수에서만, 부르면 안 되는 자리 여섯). 각 조항에 문서의 나쁜 예와 좋은 예가 있습니다. 실제로 돌려 보면 어긴 쪽은 StrictMode·컴파일러·린트·런타임 중 하나에서 잡혔습니다. 이 노드의 질문은 하나입니다. 이 코드는 어느 조항을 어겼나.",
    blocks: [
      {
        label: "규칙 1-a: 멱등 — 같은 입력이면 같은 출력",
        body: "문서의 나쁜 예는 렌더 중 const time = new Date()입니다. 부를 때마다 다릅니다. 좋은 예는 useState(() => new Date())로 처음 값을 잡고 useEffect의 setInterval로 갱신하는 것입니다. 왜 규칙인가. React는 StrictMode에서 두 번, 전환에서 중단 뒤 다시 부르고, 컴파일러는 입력이 같으면 전 결과를 재사용합니다. 렌더마다 결과가 다르면 두 번째 호출의 결과가 버려지거나 재사용된 값이 틀립니다. 실제로 돌려 보면 StrictMode는 renders 2였고, 린트 purity는 Math.random()·Date.now()·crypto.randomUUID()·performance.now()를 'Cannot call impure function during render'로 잡았습니다.",
        code: "// ✗ 부를 때마다 다르다\nfunction Clock() { const time = new Date(); return <span>{time.toLocaleString()}</span>; }\n// ✓ 처음 값은 초기화 함수로, 갱신은 Effect 로\nfunction Clock() {\n  const [time, setTime] = useState(() => new Date());\n  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);\n  return <span>{time.toLocaleString()}</span>;\n}\n// 검사기: StrictMode renders 2 · purity: Cannot call impure function during render",
      },
      {
        label: "규칙 1-b: 부수 효과는 렌더 밖 — 지역 변경은 괜찮다",
        body: "나쁜 예는 렌더 중 document.title = product.title. 좋은 예는 useEffect(() => { document.title = product.title }, [product.title]). 렌더는 '계산'이고 바깥을 바꾸는 일은 커밋 뒤의 Effect나 이벤트 핸들러의 몫입니다. 단, 렌더 중에 만든 값을 렌더 중에 바꾸는 것은 괜찮습니다. const items = []; for (…) items.push(<Friend/>)는 바깥이 모르는 지역 변경입니다. 그 배열을 컴포넌트 밖에 두면 나쁜 예가 됩니다. 지연 초기화(SuperCalculator.initializeIfNotReady())도 허용입니다. 실제로 돌려 보면 린트 globals가 모듈 변수·window 프로퍼티 변경을 잡는 규칙이고, Effect는 커밋·페인트 뒤에 돌아(effect order 측정) 렌더와 분리됩니다.",
        code: "// ✗ 렌더 중 바깥 변경\nfunction Page({ product }) { document.title = product.title; return <h1>{product.title}</h1>; }\n// ✓ Effect 에서\nfunction Page({ product }) { useEffect(() => { document.title = product.title; }, [product.title]); return <h1>{product.title}</h1>; }\n\n// ✓ 지역 변경 — 렌더 중 만든 것을 렌더 중 바꾼다\nfunction FriendList({ friends }) { const items = []; for (const f of friends) items.push(<Friend key={f.id} friend={f} />); return <ul>{items}</ul>; }\n// ✗ 같은 코드지만 items 가 컴포넌트 밖이면 바깥 변경\nconst items = [];   // 모듈\nfunction FriendList({ friends }) { for (const f of friends) items.push(…); … }   // globals",
      },
      {
        label: "규칙 1-c: props·state, 훅의 인자·반환값, JSX 에 넘긴 값은 불변",
        body: "props와 state는 '불변 스냅샷'입니다. 나쁜 예 item.url = new Url(item.url, base)(props 변경), count = count + 1(state 변경). 좋은 예 const url = new Url(…), setCount(count + 1). 훅에 넘긴 값도 넘긴 뒤에는 고치지 않습니다. useIconStyle(icon) 안에서 icon.className = …는 나쁜 예, const newIcon = { ...icon }이 좋은 예. JSX에 넘긴 값도 넘긴 뒤에 고치지 않습니다. const header = <Header styles={styles}/>; styles.size = 'small'; const footer = <Footer styles={styles}/>는 나쁜 예(header도 바뀜), footerStyles를 새로 만드는 것이 좋은 예. 왜 규칙인가. 컴파일러와 memo는 '참조가 같으면 내용도 같다'고 보고 재사용합니다. 참조는 같은데 내용을 고치면 재사용된 값이 틀립니다. 실제로 돌려 보면 컴파일러는 props 변경을 'This value cannot be modified'로 건너뛰었고, 린트 immutability는 items.push(4); setItems(items)를 잡는 규칙입니다. 요소 객체의 props는 동결(frozen)되어 있어 고치면 조용히 무시되거나 strict 모드에서 던집니다.",
        code: "// ✗ props 변경 · state 변경\nfunction Post({ item }) { item.url = new Url(item.url, base); return <a href={item.url}>…</a>; }\nfunction Counter() { let [count, setCount] = useState(0); function up() { count = count + 1; } … }\n// ✓ 새 값\nfunction Post({ item }) { const url = new Url(item.url, base); return <a href={url}>…</a>; }\nfunction Counter() { const [count, setCount] = useState(0); function up() { setCount(count + 1); } … }\n\n// ✗ JSX 에 넘긴 뒤 변경 — header 까지 바뀐다\nconst header = <Header styles={styles} />;  styles.size = 'small';  const footer = <Footer styles={styles} />;\n// ✓ 새 객체\nconst footerStyles = { ...styles, size: 'small' };\n\n// 검사기: 컴파일러 This value cannot be modified · 린트 immutability · 요소 props 는 Object.isFrozen === true",
      },
      {
        label: "규칙 2: React 가 컴포넌트와 훅을 부른다",
        body: "컴포넌트 함수를 직접 부르지 않습니다. 나쁜 예 <Layout>{Article()}</Layout>, 좋은 예 <Layout><Article/></Layout>. 직접 부르면 Article 안의 훅이 Layout의 훅 순서에 끼어들어(규칙 3 위반) 조건·반복에서 깨지고, React가 Article을 별도 컴포넌트로 알지 못해 key·memo·Suspense·DevTools가 동작하지 않습니다. 훅을 보통 값처럼 넘기지 않습니다. 고차 훅 const useDataWithLogging = withLogging(useData)는 나쁜 예(훅을 동적으로 만듦), 로깅을 안에 쓴 정적 훅이 좋은 예. <Button useData={useDataWithLogging}/>처럼 훅을 prop으로 넘기는 것도 나쁜 예, Button 안에서 직접 부르는 것이 좋은 예. 왜 규칙인가. 훅은 '지금 렌더 중인 컴포넌트'(디스패처)에 호출 순서로 매달립니다. React가 컴포넌트를 불러야 그 자리가 생기고, 훅이 정적이어야 순서가 고정됩니다. 실제로 돌려 보면 컴포넌트 밖에서 훅을 부르니 'Cannot read properties of null (reading 'useState')'였고, 린트 static-components·component-hook-factories가 컴포넌트를 렌더 중·함수 안에서 만드는 것을 잡습니다.",
        code: "// ✗ 직접 호출 — Article 의 훅이 Layout 의 훅 순서에 끼어든다\nfunction Blog() { return <Layout>{Article()}</Layout>; }\n// ✓ React 가 부르게\nfunction Blog() { return <Layout><Article /></Layout>; }\n\n// ✗ 훅을 값처럼 — 고차 훅 · prop 으로 훅\nconst useDataWithLogging = withLogging(useData);\n<Button useData={useDataWithLogging} />\n// ✓ 정적 훅을 안에서 직접\nfunction useDataWithLogging() { const data = useData(); log(data); return data; }\nfunction Button() { const data = useDataWithLogging(); … }\n\n// 검사기: 컴포넌트 밖 훅 → Cannot read properties of null (reading 'useState') · static-components · component-hook-factories",
      },
      {
        label: "규칙 3: 훅의 규칙 — 최상위에서, React 함수에서만",
        body: "'훅을 반복·조건·중첩 함수·try/catch/finally 안에서 부르지 말 것. 조기 return 앞에서 부를 것.' 문서가 적은 '부르면 안 되는 자리' 여섯: 조건·반복 안, 조건부 return 뒤, 이벤트 핸들러 안, 클래스 컴포넌트 안, useMemo·useReducer·useEffect에 넘긴 함수 안, try/catch/finally 안. 린트 페이지는 async 함수, 클래스 메서드, 모듈 최상위를 더합니다. 그리고 보통 자바스크립트 함수(function setOnlineStatus() { useOnlineStatus() })에서 부르지 말고 컴포넌트나 커스텀 훅에서만. 커스텀 훅은 다른 훅을 부를 수 있습니다. use는 조건·반복에서 예외이되 try/catch는 안 됩니다. 왜 규칙인가. React는 훅을 이름이 아니라 '호출 순서'로 구분합니다. 첫 useState는 슬롯 0, 둘째는 슬롯 1. 조건으로 하나가 빠지면 뒤의 훅이 앞 슬롯을 받아 state가 뒤바뀝니다. 실제로 돌려 보면 순서가 바뀐 렌더에서 'React has detected a change in the order of Hooks called by %s…' 경고가 났고, 컴파일러와 린트는 조건부 훅을 컴파일 전·작성 중에 잡았습니다.",
        code: "// ✗ 여섯 자리\nif (cond) { useEffect(…) }                 // 조건 안\nfor (…) { useState() }                      // 반복 안\nif (!user) return null; const [x] = useState()   // 조기 return 뒤\nfunction handleClick() { useState() }       // 이벤트 핸들러\nclass C extends Component { render() { useEffect(…) } }   // 클래스\nuseMemo(() => { const t = useContext(T) }, [])   // 다른 훅의 콜백 안\ntry { useState() } catch {}                 // try/catch\n\n// ✓ 최상위 · 조건은 안으로\nconst [x] = useState();\nuseEffect(() => { if (cond) { … } }, [cond]);\nif (!user) return null;                      // 훅 뒤에\n\n// 왜: 훅 = 호출 순서의 슬롯\n렌더 1:  useState → 슬롯0  useEffect → 슬롯1  useState → 슬롯2\n렌더 2:  (조건으로 useEffect 빠짐)  useState → 슬롯0  useState → 슬롯1 ← 슬롯1 은 Effect 였다 → 뒤바뀜\n// 검사기: 런타임 React has detected a change in the order of Hooks… · 컴파일러 Hooks must always be called in a consistent order… · 린트 rules-of-hooks",
      },
      {
        label: "문제: '지금은 되는데' StrictMode 를 켜자 두 번 들어간다",
        body: "장바구니에 담기 컴포넌트가 렌더 중에 analytics.track('view')를 부릅니다. 개발 모드에서 StrictMode를 켜자 이벤트가 두 번 들어갑니다. 규칙 1-b 위반입니다. 렌더는 React가 몇 번이든 부를 수 있는 계산이고, 바깥을 바꾸는 일은 커밋 뒤의 Effect나 사용자 이벤트의 몫입니다. 실제로 돌려 보면 StrictMode는 렌더를 두 번 부르고 두 번째 결과를 버리는데, 부수 효과는 버려지지 않습니다. 처방은 track을 useEffect(() => { analytics.track('view') }, [])로 옮기는 것입니다. 그러면 StrictMode에서 Effect도 한 번 더 돌아(effects 2) 여전히 두 번 들어가는데, 그것은 '정리를 적었는가'를 검사하는 의도된 동작이고 운영에서는 한 번입니다. 정말 한 번만 보내야 하고 개발에서도 한 번이면 ref 가드를 둡니다. StrictMode를 끄는 것은 답이 아닙니다. 그 두 번이 전환·컴파일러·서버에서 깨질 자리를 미리 보여 주는 것입니다.",
      },
      {
        label: "문제가 나는 경우: 조항별",
        body: "경우 ㄱ(1-a), 렌더 중 시간·난수. 두 번 다른 결과. 초기화 함수·Effect. 경우 ㄴ(1-b), 렌더 중 바깥 변경. StrictMode에서 두 번, 전환에서 버려진 렌더의 효과 잔존. Effect·핸들러. 경우 ㄷ(1-b), 모듈 변수 누적. 렌더마다 쌓임. state. 경우 ㄹ(1-c), props 변경. 컴파일러 건너뜀, 부모의 값도 바뀜. 새 객체. 경우 ㅁ(1-c), 배열 push 뒤 같은 참조 set. React가 변경을 못 봄. 새 배열. 경우 ㅂ(1-c), JSX에 넘긴 객체를 뒤에 고침. 앞 요소까지 바뀜. 새 객체. 경우 ㅅ(2), 컴포넌트 직접 호출. 훅 순서 끼어듦, key·memo 무효. JSX로. 경우 ㅇ(2), 고차 훅·prop으로 훅. 순서 불안정. 정적 훅. 경우 ㅈ(3), 조건부 훅. 슬롯 뒤바뀜. 최상위. 경우 ㅊ(3), 조기 return 뒤 훅. 같은 결과. 훅을 위로. 경우 ㅋ(3), 이벤트 핸들러·유틸에서 훅. 'Cannot read properties of null'. 컴포넌트·커스텀 훅에서. 경우 ㅌ(3), try/catch 안 use. 안 됨. Suspense + 에러 경계. 경우 ㅍ, StrictMode를 끄는 것으로 해결. 어긴 자리가 숨겨져 컴파일러·전환·서버에서 터짐.",
        code: "경우               조항     언제 생기나                       겉모습                                검사기\nㄱ 시간·난수         1-a     렌더 중 Date.now · Math.random      두 번 다름 · 재사용 틀림                 StrictMode · purity\nㄴ 바깥 변경         1-b     렌더 중 document.title · track      두 번 실행 · 버려진 렌더의 효과            StrictMode · globals\nㄷ 모듈 누적         1-b     모듈 배열 push                    렌더마다 쌓임                          globals\nㄹ props 변경        1-c     item.x = …                       컴파일 건너뜀 · 부모 값 바뀜               컴파일러 · immutability\nㅁ 같은 참조 set     1-c     items.push; setItems(items)       화면 안 바뀜                           immutability\nㅂ JSX 뒤 변경       1-c     styles.size = … 뒤 재사용           앞 요소까지 바뀜                        immutability\nㅅ 직접 호출         2       {Article()}                      훅 끼어듦 · key·memo 무효               -\nㅇ 훅을 값처럼        2       withLogging(useData) · prop 훅      순서 불안정                            component-hook-factories\nㅈ 조건부 훅         3       if (c) useState()                 슬롯 뒤바뀜                            rules-of-hooks · 컴파일러 · 런타임\nㅊ 조기 return 뒤    3       return null; useState()           같은 결과                              rules-of-hooks\nㅋ 밖에서 훅         3       핸들러·유틸                        Cannot read properties of null           런타임\nㅌ try 안 use        3       try { use(p) }                    안 됨                                 rules-of-hooks\nㅍ StrictMode 끔     -       경고 피하려                        나중에 터짐                            -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 조항은 많아도 뿌리는 둘 — '렌더는 계산' 과 '훅은 순서'",
        body: "규칙 1의 여섯 조항은 전부 '렌더는 계산이다'에서 나옵니다. 계산은 몇 번 해도 같아야 하고(멱등), 계산 중에 바깥을 바꾸면 안 되고(부수 효과), 계산의 입력을 고치면 안 됩니다(불변). 지역 변수는 계산의 일부라 괜찮습니다. 규칙 2와 3은 '훅은 호출 순서의 슬롯이다'에서 나옵니다. React가 불러야 슬롯이 생기고(2, 디스패처), 순서가 같아야 슬롯이 맞고(3), 훅을 값처럼 다루면 순서가 변합니다(2). 사고 표의 열세 줄이 이 둘로 접힙니다. 처방도 둘입니다. '이것은 계산인가, 바깥을 바꾸는 일인가'를 가르고(계산이면 렌더, 아니면 Effect·핸들러), '이 훅은 매 렌더 같은 자리에서 불리나'를 확인합니다(아니면 최상위로, 조건은 안으로).",
        code: "뿌리 1  렌더는 계산           → 멱등 (ㄱ) · 부수 효과 밖 (ㄴ ㄷ) · 입력 불변 (ㄹ ㅁ ㅂ) · 지역 변경 OK\n뿌리 2  훅은 호출 순서의 슬롯   → React 가 불러야 (ㅅ ㅋ) · 순서 고정 (ㅈ ㅊ ㅌ) · 값처럼 다루면 순서 변함 (ㅇ)\n\n묻기 1:  계산인가, 바깥을 바꾸나?  → 계산이면 렌더 · 아니면 Effect·핸들러\n묻기 2:  이 훅은 매 렌더 같은 자리인가?  → 아니면 최상위로, 조건은 안으로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 노드 '서버 컴포넌트'는 이 규칙이 가장 엄하게 적용되는 자리입니다. 서버 컴포넌트는 브라우저로 가지 않아 state·Effect가 없고, 클라이언트 경계('use client')를 넘는 값은 직렬화 가능해야 합니다. 함수를 넘기면 안 되고 서버 함수('use server')만 넘어갑니다.",
      },
      {
        label: "확인 질문",
        body: "코드 리뷰에서 세 줄을 봤습니다. (a) function List({ items }) { items.sort(); return items.map(…) } (b) function Page() { const Row = ({ r }) => <li>{r}</li>; return rows.map(r => <Row r={r} />) } (c) function Form() { if (!ready) return <Spinner/>; const [v, setV] = useState(''); … } 각각 어느 조항이고 어떻게 고칠까요?",
        notes: [
          {
            title: "답",
            body: "(a) 규칙 1-c, props 불변. items.sort()는 제자리 정렬이라 부모의 배열이 바뀌고, 컴파일러는 'This value cannot be modified'로 건너뛰며, 부모가 같은 참조를 들고 있어 변경을 못 봅니다. const sorted = [...items].sort() 또는 items.toSorted()로 새 배열을 만듭니다. (b) 규칙 2, React가 컴포넌트를 부른다(렌더 중 컴포넌트 정의). Row가 렌더마다 새 함수 타입이라 React가 매번 다른 컴포넌트로 보고 모든 <li>를 언마운트·마운트합니다. 린트 static-components가 'Cannot create components during render'로 잡습니다. Row를 모듈 최상위로 올리고 key를 줍니다. (c) 규칙 3, 조기 return 뒤 훅. ready가 바뀔 때 useState가 불리는 렌더와 안 불리는 렌더가 섞여 슬롯이 어긋납니다. 린트 rules-of-hooks, 런타임 'React has detected a change in the order of Hooks'. const [v, setV] = useState('')를 if 위로 올리고 그 뒤에 return <Spinner/>를 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Rules of React", href: `${DOCS}/reference/rules` },
      { label: "Components and Hooks must be pure", href: `${DOCS}/reference/rules/components-and-hooks-must-be-pure` },
      { label: "React calls Components and Hooks", href: `${DOCS}/reference/rules/react-calls-components-and-hooks` },
      { label: "Rules of Hooks", href: `${DOCS}/reference/rules/rules-of-hooks` },
    ],
  },

  {
    id: "ra-rsc",
    name: "서버 컴포넌트",
    tagline: "번들 전에, 서버(또는 빌드)에서 미리 렌더되는 컴포넌트 — 그리고 클라이언트가 부르는 서버 함수",
    intro:
      "참고서의 React Server Components(RSC) 갈래입니다. 문서의 정의는 '서버 컴포넌트는 번들링 전에, 클라이언트 앱이나 SSR 서버와 분리된 환경에서 미리 렌더되는 새 종류의 컴포넌트'입니다. 셋입니다. 서버 컴포넌트(서버·빌드에서 돌고, 브라우저로 코드가 가지 않으며, async로 await할 수 있고, state·Effect가 없음), 서버 함수('use server'로 표시한 async 함수를 클라이언트가 부름), 지시어('use client'는 클라이언트 경계, 'use server'는 서버 함수). 이것은 React의 API이지만 번들러·프레임워크(Next.js App Router, React Router 등)가 있어야 돕니다. 실제로 돌려 보면 프레임워크 없는 Node에서 'use server'를 적은 함수를 <form action>에 넘기니 그냥 클라이언트 액션으로 취급되어 javascript: URL과 재생 스크립트가 나왔습니다. 지시어 자체는 문자열이고 뜻을 주는 것은 번들러입니다. 그리고 cache + use + Suspense가 Node에서 스트리밍됐습니다. 그것이 서버 컴포넌트가 데이터를 읽는 길입니다. 이 노드의 자식 '지시어'가 'use client'·'use server'의 규칙입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "서버 컴포넌트: 서버 없이 빌드 때 돌 수 있습니다(파일 시스템 읽기, 정적 콘텐츠 fetch. '웹 서버가 필요하지 않다'). 서버가 있으면 요청마다 돌아 데이터 계층을 직접 읽고 결과(데이터·JSX)를 클라이언트 컴포넌트에 props로 넘깁니다. async 컴포넌트는 '렌더에서 await할 수 있게 하는 서버 컴포넌트의 새 기능'. '브라우저로 보내지지 않으므로 useState 같은 상호작용 API를 쓸 수 없다'. 상호작용은 클라이언트 컴포넌트와 조합합니다. '서버 컴포넌트를 위한 지시어는 없다'. 기본이 서버이고 'use client'로 클라이언트를 표시합니다. 서버 함수: '클라이언트 컴포넌트가 서버에서 실행되는 async 함수를 부를 수 있게 한다'. 'use server'로 표시하면 프레임워크가 참조를 만들어 클라이언트에 넘기고, <form action={fn}>·useActionState·startTransition 안에서 부릅니다. 인자와 반환값은 직렬화 가능해야 하고, '서버 함수는 노출된 서버 엔드포인트라 클라이언트 어디서든 불릴 수 있다'. 그래서 '인자는 완전히 클라이언트 통제이므로 늘 신뢰하지 않는 입력으로 다루고 검증·이스케이프하라', '로그인한 사용자가 그 동작을 할 수 있는지 확인하라'. 데이터 가져오기 용도로는 권하지 않습니다. 프레임워크: 'RSC 번들러·프레임워크를 구현하는 데 쓰이는 기반 API는 semver를 따르지 않는다'. React 버전을 고정하거나 Canary.",
        code: "// 서버 컴포넌트 — 지시어 없음 · async · 데이터 직접 · state·Effect 없음 · 브라우저로 안 감\nasync function Page({ id }) {\n  const note = await db.notes.get(id);            // 렌더에서 await\n  return <article><h1>{note.title}</h1><Editor note={note} onSave={saveNote} /></article>;   // 클라이언트 컴포넌트에 데이터 + 서버 함수\n}\n\n// 클라이언트 컴포넌트 — 'use client' 가 경계\n'use client';\nimport { useState } from 'react';\nexport function Editor({ note, onSave }) { const [text, setText] = useState(note.body); return <form action={onSave}>…</form>; }\n\n// 서버 함수 — 'use server' · async · 클라이언트가 부름 · 공개 엔드포인트\n'use server';\nexport async function saveNote(formData) {\n  const user = await auth();                        // 권한 확인\n  const body = z.string().max(5000).parse(formData.get('body'));   // 검증\n  await db.notes.update(user.id, body);\n}",
        terms: [
          {
            term: "클라이언트 컴포넌트 (client component)",
            body: "'use client'가 있는 모듈(과 그것이 import하는 모든 것)의 컴포넌트입니다. 번들에 들어가 브라우저에서 돌고, 서버에서도 SSR로 한 번 그려집니다. state·Effect·이벤트·브라우저 API를 쓸 수 있습니다. 서버 컴포넌트는 클라이언트 컴포넌트를 import해 렌더할 수 있지만, 클라이언트 컴포넌트가 서버 컴포넌트를 import할 수는 없습니다. children으로 받아 끼우는 것은 됩니다. 이름이 헷갈리는데 '클라이언트'는 '브라우저에서만'이 아니라 '번들에 포함되어 하이드레이션된다'는 뜻입니다.",
          },
          {
            term: "RSC 페이로드",
            body: "서버 컴포넌트가 렌더된 결과를 담은 특수한 형식입니다. HTML이 아니라 '어떤 클라이언트 컴포넌트를 어떤 props로 어디에 그려라'는 트리 데이터이고, 클라이언트 컴포넌트는 모듈 참조로만 들어 있습니다. 브라우저의 React가 이것을 받아 트리에 끼웁니다. 그래서 서버 컴포넌트는 state를 잃지 않고 갱신될 수 있고(클라이언트 state는 그대로), 서버 컴포넌트의 코드와 의존성(마크다운 파서 등)은 번들에 들어가지 않습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 프레임워크 없이 보이는 것",
        body: "RSC 번들러 없이 Node + react-dom/server에서 할 수 있는 것만 확인했습니다. 'use server'를 첫 줄에 적은 async 함수를 <form action={act}>에 넘겨 renderToString하니 action=\"javascript:throw new Error('React form unexpectedly submitted.')\"와 제출을 붙잡아 두는 <script>가 나왔습니다. 지시어가 있어도 React는 그것을 보통 클라이언트 액션으로 다룹니다. 'use server'를 서버 함수 참조로 바꾸는 것은 번들러(react-server-dom-* 와 프레임워크)의 일입니다. 반대로 서버 컴포넌트가 데이터를 읽는 길은 확인됐습니다. cache로 감싼 데이터 함수를 use로 읽고 Suspense로 감싸 renderToReadableStream하니 두 청크(fallback → 데이터)로 스트리밍됐고, useEffect는 서버에서 돌지 않았습니다(effectRan: false). react 패키지는 react-server 조건 export(react.react-server.js 등)를 갖고 있어 서버 컴포넌트 환경에서는 훅 없는 판이 로드됩니다.",
        code: "// Node 24 · 번들러 없음\nasync function act(fd) { 'use server'; }          // 지시어만 있음\nrenderToString(<form action={act}>…</form>)\n→ <form action=\"javascript:throw new Error('React form unexpectedly submitted.')\">…</form><script>…$$reactFormReplay…</script>\n   ← 그냥 클라이언트 액션. 'use server' 에 뜻을 주는 것은 번들러\n\n// 서버에서 데이터 읽는 길 (확인됨)\nconst getData = cache(() => fetchSlow());\nfunction Slow() { return <p>{use(getData())}</p>; }\nrenderToReadableStream(<Suspense fallback=\"로딩…\"><Slow/></Suspense>)  → 청크 2 (fallback → 데이터)\nuseEffect 는 서버에서 안 돈다 (effectRan: false)",
      },
      {
        label: "문제의 구조: 경계를 넘는 것은 '직렬화 가능한 값' 과 '서버 함수 참조' 만이다",
        body: "서버 컴포넌트와 클라이언트 컴포넌트는 다른 환경에서 돕니다. 사이를 넘는 것은 네트워크를 타므로 직렬화돼야 합니다. 서버 → 클라이언트 props: 원시값, 직렬화 가능한 이터러블(Array·Map·Set·TypedArray), Date, 플레인 객체, Promise, JSX(서버·클라이언트 요소), 서버 함수. 함수 일반·클래스·인스턴스·등록 안 된 Symbol은 못 넘습니다. 클라이언트 → 서버 함수 인자: 거의 같되 FormData가 더 있고 JSX·이벤트는 못 넘습니다. 그래서 '서버 컴포넌트가 클라이언트 컴포넌트에 onClick 핸들러를 넘기기'가 안 되고, 대신 서버 함수(이름 있는 엔드포인트)를 넘깁니다. 이 경계가 두 지시어의 뜻입니다. 'use client'는 '여기부터 번들에 들어가 하이드레이션된다', 'use server'는 '이 함수는 서버에 남고 참조만 넘어간다'. 서버 함수는 공개 엔드포인트라 인자 검증과 권한 확인이 함수 안에 있어야 합니다.",
        code: "서버 컴포넌트 (서버 · 빌드)        ──props──▶   클라이언트 컴포넌트 (번들 · 브라우저 + SSR)\n  async · await · DB 직접 · 번들 X                 state · Effect · 이벤트 · 브라우저 API\n  넘어가는 것: 원시값 · Array/Map/Set · Date · 플레인 객체 · Promise · JSX · 서버 함수\n  못 넘는 것:  일반 함수 · 클래스 · 인스턴스 · Symbol('x')\n\n클라이언트 ──서버 함수 호출 (인자: + FormData · − JSX·이벤트)──▶ 서버 ('use server' 함수 = 공개 엔드포인트 → 검증 · 권한)\n\n'use client' = 여기부터 번들 (경계)   ·   'use server' = 이 함수는 서버에 남고 참조만",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 노드 '지시어'에서 'use client'와 'use server'의 자리, 넘길 수 있는 값의 목록, 보안 규칙, 실제로 돌려 본 결과를 적습니다.",
      },
    ],
    sources: [
      { label: "Server Components", href: `${DOCS}/reference/rsc/server-components` },
      { label: "Server Functions", href: `${DOCS}/reference/rsc/server-functions` },
      { label: "Directives", href: `${DOCS}/reference/rsc/directives` },
    ],
  },

  {
    id: "ra-rsc-directives",
    name: "서버 컴포넌트 지시어",
    tagline: "'use client' 는 번들의 경계, 'use server' 는 서버에 남는 함수의 표시",
    intro:
      "참고서의 RSC 지시어 둘입니다. 'use client': 파일 첫 줄에 두어 '이 모듈과 그것이 import하는 모든 것을 클라이언트 코드로 표시'합니다. 서버 컴포넌트가 이 모듈의 컴포넌트를 렌더하면 거기가 경계입니다. 'use server': async 함수 몸 첫 줄(그 함수만) 또는 파일 첫 줄(모든 export)에 두어 '클라이언트가 부를 수 있는 서버 함수'로 표시합니다. 둘 다 '파일·함수의 맨 처음, import보다 앞(주석은 괜찮음), 홑·쌍따옴표(백틱 불가)'가 규칙입니다. 실제로 돌려 보면 번들러 없는 Node에서 'use server'는 그냥 문자열이었고(폼이 클라이언트 액션으로 렌더됨), 컴파일러 지시어처럼 뜻을 주는 것은 도구입니다. 이 노드의 질문은 하나입니다. 경계를 어디에 두고 무엇을 넘기나.",
    blocks: [
      {
        label: "무엇이 들어 있나: 'use client'",
        body: "'파일의 맨 처음, 어떤 import나 코드보다 위(주석은 OK)에 있어야 하며 홑따옴표나 쌍따옴표로, 백틱은 안 된다'. 표시된 모듈과 그 전이적 의존성이 전부 클라이언트 번들에 들어갑니다. 주의 사항 둘. '클라이언트 렌더 모듈에서 다른 use client 모듈을 import하면 지시어는 효과가 없다'(이미 클라이언트). '서버에서 평가되는 모듈이 use client 모듈에서 값을 import하면 그 값은 React 컴포넌트이거나 직렬화 가능한 prop 값이어야 한다. 그 밖은 예외'. 서버 → 클라이언트로 넘길 수 있는 props: 원시값(string, number, bigint, boolean, undefined, null, Symbol.for로 등록된 심볼), 직렬화 가능한 값의 이터러블(String, Array, Map, Set, TypedArray, ArrayBuffer), Date, 플레인 객체, 서버 함수, 클라이언트·서버 컴포넌트 요소(JSX), Promise. 못 넘기는 것: 클라이언트 모듈에서 export되지 않았거나 'use server'가 아닌 함수, 클래스, 클래스 인스턴스(위 내장 제외), null 프로토타입 객체, 등록 안 된 심볼(Symbol('x')). 어디에 두나. '가능한 한 아래(leaf)에'. 상호작용이 필요한 가장 작은 컴포넌트만 클라이언트로 하고, 그 위는 서버로 두어 번들을 줄입니다. 서버 컴포넌트를 클라이언트 컴포넌트의 children으로 끼우는 것은 됩니다(import는 안 됨).",
        code: "// 클라이언트 경계 — 파일 첫 줄\n'use client';\nimport { useState } from 'react';\nexport function Counter({ initial, onSave }) {            // props 는 직렬화 가능해야: initial(number) ✓ · onSave(서버 함수) ✓ · 일반 함수 ✗\n  const [n, set] = useState(initial);\n  return <button onClick={() => set(n + 1)}>{n}</button>;\n}\n\n// 서버 컴포넌트가 쓰기\nimport { Counter } from './Counter';                        // 서버 → 클라이언트 import ✓\nexport default async function Page() {\n  const n = await db.count();\n  return <Counter initial={n} onSave={save} />;            // 데이터 + 서버 함수\n}\n\n// 넘길 수 있는 것                                   못 넘기는 것\n원시값 · Symbol.for('x')                              Symbol('x')\nArray · Map · Set · TypedArray · ArrayBuffer · Date      클래스 · 인스턴스 · null-prototype 객체\n플레인 객체 · Promise · JSX · 서버 함수                   일반 함수 (onClick={() => …} 를 서버에서 넘기기 ✗)",
      },
      {
        label: "무엇이 들어 있나: 'use server'",
        body: "'async 함수 몸의 맨 위에 두어 그 함수를 클라이언트가 부를 수 있게 표시', 또는 파일 맨 위에 두어 모든 export를 서버 함수로. '함수나 모듈의 맨 처음, import를 포함한 다른 코드보다 위(주석은 OK)'. '기반 네트워크 호출이 늘 비동기이므로 async 함수에만 쓸 수 있다'. '클라이언트 코드에서 서버 함수를 import하려면 모듈 수준 지시어여야 한다'. 인자로 받을 수 있는 것: 원시값, 이터러블(String·Array·Map·Set·TypedArray·ArrayBuffer), Date, FormData, 플레인 객체, 서버 함수, Promise. 못 받는 것: React 요소·JSX, 함수(컴포넌트 포함), 클래스·인스턴스, 등록 안 된 심볼, 이벤트. 반환값은 클라이언트 경계 props와 같은 목록. 보안: '서버 함수의 인자는 완전히 클라이언트 통제다. 늘 신뢰하지 않는 입력으로 다루고 검증·이스케이프하라'. '어느 서버 함수에서든 로그인한 사용자가 그 동작을 할 수 있는지 확인하라'. 부르는 법: '서버 함수는 전환 안에서 불러야 한다'. <form action>·formAction은 자동으로 전환이고, 이벤트 핸들러에서는 startTransition(async () => { const r = await fn(); startTransition(() => set(r)); }). 데이터 가져오기에는 권하지 않습니다(쓰기·변경용).",
        code: "// 함수 단위\nasync function Page() {\n  async function like() { 'use server'; await db.likes.add(await userId()); }     // 이 함수만 서버 함수\n  return <LikeButton onLike={like} />;\n}\n\n// 파일 단위 — 클라이언트가 import 하려면 이 꼴\n'use server';\nexport async function createNote(formData) {\n  const session = await auth(); if (!session) throw new Error('로그인 필요');     // 권한\n  const title = String(formData.get('title')).slice(0, 200);                     // 검증\n  return await db.notes.create(session.user.id, title);                           // 반환: 직렬화 가능\n}\n\n// 클라이언트에서 부르기\n<form action={createNote}>…</form>                            // 자동 전환\nstartTransition(async () => { const n = await incrementLike(); startTransition(() => setLikes(n)); });   // 핸들러: 전환 안에서\n\n// 인자: + FormData · − JSX · 함수 · 이벤트          반환: 경계 props 와 같은 목록",
      },
      {
        label: "실제로 돌려 보면",
        body: "번들러 없는 Node에서 'use server'를 첫 줄에 적은 async 함수 act를 <form action={act}>와 <button formAction={act}>에 넘겨 renderToString했습니다. 결과는 action=\"javascript:throw new Error('React form unexpectedly submitted.')\", formAction도 같은 값, 그리고 submit 이벤트를 붙잡아 FormData를 $$reactFormReplay에 쌓아 두는 인라인 <script>였습니다. 하이드레이션 전 제출을 잃지 않는 장치이고, 'use server'는 아무 역할이 없었습니다. 서버 함수로 바꾸는 변환은 react-server-dom-webpack/turbopack/parcel 같은 번들러 플러그인이 합니다. 서버 컴포넌트 전용 빌드도 확인했습니다. react 패키지의 exports에 react-server 조건이 있어 서버 컴포넌트 환경에서는 훅이 없는 판이 로드됩니다. 클라이언트에서 useActionState + <form action>은 동작했습니다(10 + 5 → 15, 입력 리셋).",
        code: "// Node 24 · react-dom/server · 번들러 없음\nasync function act(fd) { 'use server'; }\n<form action={act}><input name=\"q\" defaultValue=\"a\"/><button formAction={act}>go</button></form>\n→ <form action=\"javascript:throw new Error('React form unexpectedly submitted.')\"><input name=\"q\" value=\"a\"/><button formAction=\"javascript:throw new Error(…)\">go</button></form>\n  <script>addEventListener(\"submit\",function(a){… (c.$$reactFormReplay=c.$$reactFormReplay||[]).push(b,d,a) …})</script>\n  ← 'use server' 는 효과 없음 · 서버 함수 참조로 바꾸는 것은 번들러\n\n// 클라이언트 (Chrome 156)\nuseActionState(async (prev, fd) => prev + Number(fd.get('d')), 10) + <form action>  → 제출 뒤 15 · 입력은 defaultValue 로 리셋",
      },
      {
        label: "문제: 서버 컴포넌트에서 onClick 을 넘겼는데 빌드가 깨진다",
        body: "서버 컴포넌트 Page에서 <Button onClick={() => console.log('hi')}>를 렌더했습니다. 에러는 'Event handlers cannot be passed to Client Component props' 같은 문구입니다. 서버 컴포넌트에서 클라이언트 컴포넌트로 넘기는 props는 네트워크를 타므로 직렬화돼야 하고, 일반 함수는 직렬화되지 않습니다. 처방은 둘로 가릅니다. 클릭이 브라우저 안의 일(토글, 로그)이면 그 핸들러를 클라이언트 컴포넌트 안으로 옮깁니다. Button 자체를 'use client'로 두고 안에서 onClick을 정의. 클릭이 서버의 일(저장, 좋아요)이면 서버 함수를 만들어 넘깁니다. async function like() { 'use server'; … } 를 onLike prop으로. 서버 함수는 직렬화 가능한 '참조'라 경계를 넘습니다. 그리고 그 함수는 공개 엔드포인트이므로 안에서 권한과 인자를 확인합니다.",
      },
      {
        label: "문제가 나는 경우: 경계와 직렬화를 모를 때",
        body: "경우 ㄱ, 서버에서 함수 prop입니다. 위의 사고입니다. 경우 ㄴ, 'use client'를 레이아웃 맨 위에 둡니다. 그 아래 전부가 번들에 들어가 서버 컴포넌트의 이득이 사라집니다. leaf로 내립니다. 경우 ㄷ, 클라이언트 컴포넌트가 서버 컴포넌트를 import합니다. 그 서버 컴포넌트가 클라이언트로 끌려가 async·DB 접근이 깨집니다. children으로 끼웁니다. 경우 ㄹ, 서버 컴포넌트에서 useState·useEffect입니다. 훅이 없는 판이라 에러. 상호작용은 클라이언트 컴포넌트로. 경우 ㅁ, Date 대신 dayjs 인스턴스, Map 대신 클래스 인스턴스를 넘깁니다. 직렬화 불가. 플레인 값으로. 경우 ㅂ, 'use server'를 동기 함수에 둡니다. async여야 합니다. 경우 ㅅ, 서버 함수에서 인자를 믿습니다. 클라이언트가 임의로 부를 수 있는 공개 엔드포인트입니다. 검증·권한. 경우 ㅇ, 서버 함수를 데이터 가져오기에 씁니다. 권하지 않습니다(순차 호출·캐시 없음). 서버 컴포넌트에서 await. 경우 ㅈ, 이벤트 핸들러에서 서버 함수를 전환 없이 부릅니다. pending·에러 처리가 빠집니다. startTransition 안에서. 경우 ㅊ, 'use server' 함수를 클라이언트 모듈에서 import하는데 함수 단위 지시어입니다. 모듈 단위여야 import됩니다. 경우 ㅋ, 지시어가 첫 줄이 아니거나 백틱입니다. 그냥 문자열. 경우 ㅌ, RSC 내부 API에 의존합니다. 'semver를 따르지 않는다'. 프레임워크를 통해서만. 경우 ㅍ, 프레임워크 없이 'use server'가 동작하길 기대합니다. 실제로 돌려 보면 아무 효과가 없었습니다.",
        code: "경우               언제 생기나                        겉모습                                 들통나는 때\nㄱ 함수 prop        서버 → 클라 onClick                 Event handlers cannot be passed…           빌드·렌더\nㄴ 경계가 위        레이아웃에 'use client'              번들 커짐 · 서버 이득 없음                  번들 분석\nㄷ 클라가 서버 import  'use client' 파일에서 import         async 컴포넌트 에러 · DB 코드가 번들에         빌드\nㄹ 서버에서 훅       서버 컴포넌트 useState               훅 없음 에러                              빌드·렌더\nㅁ 인스턴스 prop     dayjs() · class 인스턴스             직렬화 에러                              렌더\nㅂ 동기 서버 함수    function f() { 'use server' }        에러                                    빌드\nㅅ 인자 신뢰        검증 없는 서버 함수                  임의 호출 · 권한 상승                       보안 점검\nㅇ 가져오기용        서버 함수로 fetch                   느림 · 캐시 없음                           성능\nㅈ 전환 없음        핸들러에서 await fn()                pending·에러 처리 누락                      UX\nㅊ 함수 단위 import   클라에서 import                    안 됨                                   빌드\nㅋ 자리·따옴표       첫 줄 아님 · 백틱                   그냥 문자열                               -\nㅌ 내부 API 의존     react-server-dom-* 직접              버전 올리면 깨짐                          업그레이드\nㅍ 프레임워크 없음    Node 만으로 'use server'             효과 없음 (실제로 확인)                    -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 두 지시어는 '코드가 어디서 돌고, 사이를 무엇이 넘나' 를 정하는 선이다",
        body: "서버 컴포넌트 모델은 코드를 두 환경으로 가릅니다. 지시어는 그 선을 소스에 그립니다. 'use client'는 '여기부터 브라우저에 간다'는 선이고, 선 아래는 전부 번들에 들어가므로 선이 위에 있을수록 번들이 커집니다(ㄴ). 선을 거꾸로 넘는 import는 서버 코드를 브라우저로 끌어옵니다(ㄷ). 선을 넘는 데이터는 직렬화돼야 하므로 함수·인스턴스는 못 넘고(ㄱ, ㅁ) 서버 함수라는 '참조'만 넘습니다. 'use server'는 그 참조를 만드는 표시이고, 참조는 네트워크 엔드포인트가 되므로 async여야 하고(ㅂ) 공개된 것으로 다뤄야 합니다(ㅅ). 지시어 자체는 문자열이라 도구가 읽어야 뜻이 생기고(ㅋ, ㅍ), 그 도구는 React가 아니라 프레임워크입니다(ㅌ). 처방은 선을 가능한 한 아래에 긋고, 선을 넘는 것은 '값 또는 서버 함수 참조'만으로 제한하고, 서버 함수 안에서 검증·권한을 끝내는 것입니다.",
        code: "서버 (빌드 · 서버)                    선: 'use client'                   브라우저 (번들)\nasync · DB · 훅 없음 (ㄹ)        ──▶  선 아래 전부 번들 (ㄴ) ──▶        state · Effect · 이벤트\n                                 ◀── 거꾸로 import ✗ (ㄷ) · children ✓\n넘는 것: 값 (직렬화 ㄱ ㅁ) · 서버 함수 참조 ('use server': async ㅂ · 공개 ㅅ · 전환 안 ㅈ)\n\n지시어 = 문자열 → 도구(프레임워크)가 읽어야 뜻 (ㅋ ㅍ ㅌ)\n처방: 선은 아래로 · 넘는 것은 값·참조만 · 서버 함수 안에서 검증·권한",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "참고서의 마지막 갈래 '레거시 API'입니다. 아직 내보내지만 새 코드에는 권하지 않는 여덟(Children, cloneElement, Component, createElement, createRef, forwardRef, isValidElement, PureComponent)과 19에서 제거된 것들. 실제로 돌려 보면 forwardRef는 19.3.1에서 경고 없이 동작했고, element.ref 접근은 '19에서 제거됐다' 경고를 냈습니다.",
      },
      {
        label: "확인 질문",
        body: "Next.js App Router 블로그입니다. (1) 글 목록 페이지에서 '좋아요' 버튼만 상호작용이 필요합니다. 어디에 'use client'를 둘까요? (2) 좋아요를 누르면 DB에 저장해야 합니다. 어떻게 넘기고 무엇을 확인할까요? (3) 글 본문(마크다운 → HTML 변환, 무거운 라이브러리)은 어디서 돌려야 번들이 작을까요?",
        notes: [
          {
            title: "답",
            body: "(1) LikeButton 컴포넌트 파일 첫 줄에만 둡니다. 페이지·목록·글 카드는 서버 컴포넌트로 남아 번들에 들어가지 않고, 버튼만 하이드레이션됩니다. 페이지 맨 위에 두면 그 아래 전부가 클라이언트가 되어 이득이 사라집니다. (2) 서버 함수를 만듭니다. 'use server'를 파일 첫 줄에 둔 actions.ts에 export async function like(postId: string)를 쓰고, 서버 컴포넌트가 <LikeButton postId={post.id} onLike={like} />로 넘깁니다. 일반 함수는 경계를 못 넘지만 서버 함수 참조는 넘습니다. 버튼은 startTransition(async () => { const n = await onLike(postId); startTransition(() => setLikes(n)); })로 부르거나 <form action>으로. 그리고 like 안에서 세션 확인(로그인했나, 이 글에 할 수 있나)과 postId 검증을 합니다. 클라이언트가 임의 인자로 부를 수 있는 공개 엔드포인트입니다. (3) 서버 컴포넌트에서 돌립니다. async function Post({ slug }) { const html = await renderMarkdown(await readFile(slug)); return <article dangerouslySetInnerHTML={{ __html: html }} /> }. 마크다운 라이브러리는 서버에만 있고 브라우저에는 결과 HTML만 갑니다. 신뢰하는 소스(내 글)라 innerHTML이 가능하되, 외부 입력이면 소독합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "'use client'", href: `${DOCS}/reference/rsc/use-client` },
      { label: "'use server'", href: `${DOCS}/reference/rsc/use-server` },
      { label: "Server Functions", href: `${DOCS}/reference/rsc/server-functions` },
    ],
  },

  {
    id: "ra-legacy",
    name: "레거시 API",
    tagline: "아직 내보내지만 새 코드에는 권하지 않는 여덟 — 그리고 19 에서 사라진 것들",
    intro:
      "참고서의 레거시 갈래입니다. react 패키지가 여전히 내보내지만 '새 코드에서는 쓰지 않기를 권하는' API 여덟입니다. Children(자식 순회·변형), cloneElement(요소 복제에 props 주입), Component(클래스 컴포넌트), createElement(JSX 없이 요소 만들기), createRef(클래스용 ref), forwardRef(ref를 자식에 넘기기, 19에서는 ref가 prop), isValidElement(요소 판별), PureComponent(얕은 비교 클래스). 그리고 19에서 제거된 것들(createFactory, 클래스의 contextTypes·childContextTypes·getChildContext·propTypes, this.refs 문자열 ref). 실제로 돌려 보면 19.3.1에서 forwardRef는 경고 없이 동작했고, ref를 보통 prop으로 받는 함수 컴포넌트도 동작했고, element.ref 접근은 'Accessing element.ref was removed in React 19. ref is now a regular prop.' 경고를 냈고, Children.count는 null을 세지만 toArray는 버렸고, PureComponent와 memo는 같은 props에 둘 다 한 번만 그렸습니다. 이 노드의 자식 '레거시 API 목록'이 여덟 각각의 대안입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "여덟 API와 문서가 적은 대안. Children(map·forEach·count·only·toArray) → '가능하면 피하라'. 하위 컴포넌트 export, 배열 prop(rows), 렌더 prop(renderRow). cloneElement → 렌더 prop(renderItem(item, isHighlighted)), 컨텍스트, 커스텀 훅(useList). '더 명시적이라 이 패턴이 선호된다'. Component → 함수 컴포넌트. contextType → useContext, state·setState → useState, componentDidMount/Update/WillUnmount → useEffect와 정리. componentDidCatch는 직접 대응이 없어 에러 경계 클래스 하나 또는 react-error-boundary. createRef → useRef. '주로 클래스용'. forwardRef → '19에서는 더 이상 필요 없다. ref를 prop으로 받으라'. '향후 폐기 예정'. PureComponent → memo. 'PureComponent와 달리 memo는 새·옛 state를 비교하지 않는다'(함수에는 state 비교가 필요 없음). createElement·isValidElement → 대안 없음, JSX. 제거된 것(19): createFactory(JSX로), 클래스 static contextTypes·childContextTypes·getChildContext(static contextType·Context로), 클래스 static propTypes(TypeScript로), this.refs(createRef로).",
        code: "레거시           대안 (문서)                                          19.3.1 에서 실제로\nChildren         하위 컴포넌트 · 배열 prop · 렌더 prop                     map·count·toArray 동작 · count 는 null 포함(4) · toArray 는 null 제외(3)\ncloneElement     렌더 prop · 컨텍스트 · 커스텀 훅                          Children.map + cloneElement 로 data-i 주입 동작\nComponent        함수 컴포넌트 (useContext · useState · useEffect)           동작 · 에러 경계(getDerivedStateFromError)는 여전히 클래스\ncreateElement    JSX                                                  동작 · { $$typeof, type, props(동결), key }\ncreateRef        useRef                                               동작\nforwardRef       ref 를 prop 으로 (19)                                   경고 없이 동작 · ref prop 함수 컴포넌트도 동작\nisValidElement   (JSX)                                                h('p') → true · { type: 'p' } → false\nPureComponent    memo                                                 부모 2회 리렌더(같은 props): Pure 1 · memo 1\n\n제거 (19):  createFactory · static contextTypes/childContextTypes/getChildContext · static propTypes · this.refs\n경고:      element.ref 접근 → 'Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.'",
        codeLang: "text",
        terms: [
          {
            term: "레거시 (legacy)",
            body: "문서에서 '여전히 지원하되 새 코드에는 권하지 않는' API입니다. 제거(removed)와 다릅니다. 레거시는 기존 코드가 돌고 경고도 없거나 적지만, 더 나은 길이 있어 새로 쓸 이유가 없습니다. 실제로 돌려 보면 여덟 전부 19.3.1에서 동작했습니다. 제거된 것은 19에서 사라져 쓰면 에러이거나 무시됩니다.",
          },
        ],
      },
      {
        label: "문제의 구조: 레거시 여덟은 '함수 컴포넌트 + 훅 + JSX' 가 없던 시절의 길이다",
        body: "여덟을 보면 세 시절이 보입니다. 클래스 시절: Component, PureComponent, createRef(인스턴스에 매달 자리가 필요했음). JSX 전 시절: createElement, isValidElement(요소를 손으로 만들고 판별). 자식을 '데이터'로 다루던 시절: Children, cloneElement(자식 요소를 순회해 props를 끼워 넣음), forwardRef(함수 컴포넌트가 ref를 받을 자리가 없었음). 대안은 전부 하나로 모입니다. 함수 컴포넌트 + 훅(useState·useEffect·useRef·useContext·memo) + JSX, 그리고 자식 대신 '명시적 데이터'(배열 prop, 렌더 prop, 컨텍스트). 19가 ref를 보통 prop으로 만들면서 forwardRef의 마지막 이유도 사라졌습니다. 남은 예외는 에러 경계입니다. getDerivedStateFromError·componentDidCatch는 아직 클래스에만 있어, 경계 하나는 클래스로 쓰거나 라이브러리를 씁니다.",
        code: "시절                 레거시                          대안\n클래스               Component · PureComponent · createRef    함수 컴포넌트 · memo · useRef\nJSX 전               createElement · isValidElement           JSX\n자식 = 데이터         Children · cloneElement                 배열 prop · 렌더 prop · 컨텍스트 · 커스텀 훅\nref 받을 자리 없음    forwardRef                              19: ref 는 prop\n\n남은 예외:  에러 경계 (getDerivedStateFromError · componentDidCatch) → 클래스 하나 또는 react-error-boundary",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 노드 '레거시 API 목록'에서 여덟 각각을 무엇을 했나 → 왜 레거시인가 → 대안 코드 → 실제로 돌려 본 결과로 적습니다.",
      },
    ],
    sources: [
      { label: "Legacy React APIs", href: `${DOCS}/reference/react/legacy` },
      { label: "forwardRef", href: `${DOCS}/reference/react/forwardRef` },
      { label: "Children", href: `${DOCS}/reference/react/Children` },
    ],
  },

  {
    id: "ra-legacy-apis",
    name: "레거시 API 목록",
    tagline: "여덟 각각: 무엇을 했나, 왜 레거시인가, 대신 무엇을 쓰나",
    intro:
      "레거시 API 여덟을 하나씩 봅니다. Children, cloneElement, Component, createElement, createRef, forwardRef, isValidElement, PureComponent. 전부 19.3.1에서 동작합니다. 문서가 '피하라'고 하는 이유는 깨져서가 아니라, 같은 일을 더 명시적으로 하는 길이 생겼기 때문입니다. 실제로 돌려 보면 Children.map + cloneElement로 자식에 data-i를 끼우는 것은 됐지만 그 자식이 어떤 props를 받는지 코드에서 보이지 않았고, forwardRef와 ref-as-prop은 결과가 같았고, PureComponent와 memo는 같은 props에 둘 다 한 번만 그렸습니다. 이 노드의 질문은 하나입니다. 기존 코드에서 이것을 만나면 무엇으로 바꾸나.",
    blocks: [
      {
        label: "Children · cloneElement: 자식을 데이터처럼 다루던 길",
        body: "Children.map(children, fn)·forEach·count·only·toArray는 children prop(요소, 배열, null…)을 순회·변형합니다. cloneElement(element, props, ...children)는 요소를 복제하며 props를 덮어씁니다. 둘을 합치면 부모가 자식 요소에 props를 '몰래' 끼워 넣을 수 있습니다. 왜 레거시인가. 자식이 어떤 props를 받는지 자식 코드에도 부모 코드에도 명시되지 않고, 자식이 Fragment나 다른 컴포넌트로 감싸이면 깨지며, 컴파일러가 분석하기 어렵습니다. 문서의 대안은 셋입니다. 하위 컴포넌트 export(<List.Row>), 배열 prop(<List rows={[…]} />), 렌더 prop(<List renderRow={(id, i) => …} />). 그리고 데이터는 컨텍스트로, 로직은 커스텀 훅(useList)으로. 실제로 돌려 보면 Children.map([<li>a</li>, <li>b</li>], (c, i) => cloneElement(c, { 'data-i': i }))는 <li data-i=\"0\">a</li><li data-i=\"1\">b</li>를 냈습니다. Children.count([1, [2, 3], null])은 4(null 포함), Children.toArray(…).length는 3(null 제외)로 둘의 셈이 다릅니다.",
        code: "// 레거시 — 부모가 자식에 props 를 몰래 끼운다\nfunction List({ children }) {\n  return <ul>{Children.map(children, (child, i) => cloneElement(child, { index: i, highlighted: i === sel }))}</ul>;\n}\n<List><Row /><Row /></List>          // Row 가 index·highlighted 를 받는지 아무 데도 안 보인다\n\n// 대안 1 — 배열 prop\n<List rows={rows} />\n// 대안 2 — 렌더 prop\n<List items={items} renderItem={(item, isHighlighted) => <Row item={item} highlighted={isHighlighted} />} />\n// 대안 3 — 컨텍스트 (데이터) · 커스텀 훅 (로직)\nconst { selected, onSelect } = useList(items);\n\n// 실제로 (19.3.1)\nChildren.map([<li>a</li>, <li>b</li>], (c, i) => cloneElement(c, { 'data-i': i }))  → <li data-i=\"0\">a</li><li data-i=\"1\">b</li>\nChildren.count([1, [2, 3], null]) → 4   ·   Children.toArray([1, [2, 3], null]).length → 3",
      },
      {
        label: "Component · PureComponent · createRef: 클래스의 길",
        body: "class C extends Component { state; setState; render(); componentDidMount/DidUpdate/WillUnmount; static contextType; componentDidCatch }. PureComponent는 props·state를 얕게 비교해 같으면 render를 건너뜁니다. createRef()는 { current }를 만들어 클래스 인스턴스 필드에 둡니다. 왜 레거시인가. 함수 컴포넌트와 훅이 같은 일을 더 작은 단위로, 로직을 재사용 가능하게(커스텀 훅) 합니다. 문서의 대응표: contextType → useContext, state·setState → useState, 생명주기 셋 → useEffect와 정리 함수, PureComponent → memo('memo는 state를 비교하지 않는다'. 함수에는 비교할 인스턴스 state가 없음), createRef → useRef. 예외는 에러 경계입니다. getDerivedStateFromError·componentDidCatch에 훅 대응이 없어 경계 하나는 클래스로 두거나 react-error-boundary를 씁니다. 실제로 돌려 보면 부모를 같은 props로 두 번 리렌더했을 때 PureComponent 자식 1번, memo 자식 1번으로 같았고, 클래스 static defaultProps는 적용됐습니다. 함수 컴포넌트의 defaultProps도 19.3.1에서는 적용되고 경고가 없었지만, 문서가 권하는 것은 기본 매개변수({ a = '기본' })입니다. 문자열 ref(ref=\"legacy\")는 19에서 제거되어 그 트리는 빈 화면이 됐습니다(this.refs 제거).",
        code: "// 클래스                                              // 함수 + 훅\nclass Clock extends Component {                          function Clock() {\n  state = { now: Date.now() };                             const [now, setNow] = useState(() => Date.now());\n  static contextType = Theme;                              const theme = useContext(Theme);\n  componentDidMount() { this.id = setInterval(…) }        useEffect(() => { const id = setInterval(…); return () => clearInterval(id); }, []);\n  componentWillUnmount() { clearInterval(this.id) }        return <span className={theme}>{now}</span>;\n  render() { return <span className={this.context}>{this.state.now}</span> }   }\n}\nclass Row extends PureComponent { … }                    const Row = memo(function Row(props) { … });\nthis.inputRef = createRef();                             const inputRef = useRef(null);\n\n// 예외 — 에러 경계는 아직 클래스\nclass ErrorBoundary extends Component { static getDerivedStateFromError(e) { return { e }; } render() { return this.state?.e ? <Fallback/> : this.props.children; } }\n\n// 실제로 (19.3.1)  부모 2회 리렌더, 같은 props:  PureComponent 자식 1 · memo 자식 1\n// defaultProps: 클래스 static 적용 · 함수 Fn.defaultProps 도 적용(경고 없음) — 문서는 기본 매개변수를 권함\n// 문자열 ref=\"legacy\": 트리가 빈 화면 (19 제거)",
      },
      {
        label: "forwardRef · createElement · isValidElement: JSX 와 ref 가 자리를 잡기 전",
        body: "forwardRef((props, ref) => …)는 함수 컴포넌트가 ref를 받을 자리가 없던 시절에 ref를 둘째 인자로 흘려주는 래퍼였습니다. '19에서는 더 이상 필요 없다. ref를 prop으로 받으라'. function Input({ ref, ...props }) { return <input ref={ref} {...props}/> }. '향후 폐기 예정'. createElement(type, props, ...children)은 JSX가 컴파일되는 결과이고 isValidElement(x)는 그것이 요소인지 판별합니다. JSX 없이 요소를 만들 때(이 블로그의 측정 스크립트처럼) 아직 쓰이지만 앱 코드에서는 JSX입니다. 실제로 돌려 보면 forwardRef((p, ref) => <input ref={ref}/>)와 function RefProp({ ref }) { return <input ref={ref}/> } 둘 다 <input>을 그리고 경고가 없었습니다. createElement('div', { id: 'a' }, 'x')는 { $$typeof: Symbol(react.transitional.element), type: 'div', props: {…}(동결), key: null }이고 isValidElement(h('p'))는 true, isValidElement({ type: 'p' })는 false입니다. 요소 객체의 .ref를 읽으니 'Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.' 경고가 났고 props.ref로 읽어야 합니다.",
        code: "// 레거시                                                   // 19\nconst Input = forwardRef(function Input(props, ref) {        function Input({ ref, ...props }) {\n  return <input ref={ref} {...props} />;                       return <input ref={ref} {...props} />;\n});                                                          }\n\n// createElement · isValidElement — JSX 가 하는 일\n<div id=\"a\">x</div>  ==  createElement('div', { id: 'a' }, 'x')\n→ { $$typeof: Symbol(react.transitional.element), type: 'div', props: { id: 'a', children: 'x' } (frozen), key: null }\nisValidElement(<p/>) → true   ·   isValidElement({ type: 'p' }) → false\n\n// 실제로 (19.3.1)\nforwardRef 판 · ref-prop 판  → 둘 다 <input> · 경고 없음\nelement.ref 읽기 → 경고 Accessing element.ref was removed in React 19. ref is now a regular prop…   (props.ref 로)",
      },
      {
        label: "문제: 라이브러리를 19 로 올리자 forwardRef 타입과 element.ref 에서 깨진다",
        body: "디자인 시스템 패키지가 forwardRef로 감싼 컴포넌트 수십 개를 내보내고, 유틸이 자식 요소의 element.ref를 읽어 포커스 관리를 합니다. 19로 올리자 element.ref 접근에 경고가 쌓이고, 일부 소비자는 ref를 prop으로 넘기기 시작했습니다. 처방은 단계적입니다. forwardRef는 19에서 여전히 경고 없이 동작하므로(실제로 확인) 급하게 뜯을 필요는 없지만, 새 컴포넌트는 ref를 prop으로 받고 기존 것은 점차 옮깁니다. 둘은 결과가 같습니다. element.ref는 19에서 제거된 접근이라 element.props.ref로 바꿔야 하고, 그 전에 '자식 요소의 ref를 읽어 조작하는' 설계 자체를 돌아봅니다. 대부분 cloneElement·Children 시절의 패턴이고, 렌더 prop이나 컨텍스트로 ref를 '받는' 쪽이 명시적입니다. 18과 19를 함께 지원해야 하면 forwardRef를 유지하는 것이 호환이 쉽습니다. 문서도 '향후' 폐기라고만 적습니다.",
      },
      {
        label: "문제가 나는 경우: 레거시를 만났을 때",
        body: "경우 ㄱ, element.ref 읽기입니다. 위의 사고입니다. props.ref로. 경우 ㄴ, cloneElement로 끼운 props를 자식이 Fragment로 감싸자 사라집니다. 복제는 바로 그 요소에만. 렌더 prop으로. 경우 ㄷ, Children.count와 toArray의 셈이 다릅니다. null·불리언을 count는 세고 toArray는 버립니다(4 vs 3). 하나로 통일하거나 배열 prop으로. 경우 ㄹ, Children.only에 둘을 넘깁니다. 던집니다. 경우 ㅁ, 클래스에 훅을 씁니다. 안 됩니다(훅 규칙). 함수로 바꾸거나 래퍼. 경우 ㅂ, PureComponent를 memo로 바꾸고 state 비교를 기대합니다. memo는 props만. 함수 state는 set이 같은 값이면 스스로 건너뜁니다. 경우 ㅅ, componentDidCatch를 훅으로 찾습니다. 없습니다. 클래스 경계 하나. 경우 ㅇ, this.refs 문자열 ref입니다. 19에서 제거. createRef·useRef·콜백. 경우 ㅈ, 함수 컴포넌트 defaultProps에 의존합니다. 19.3.1에서는 동작했지만 문서의 길은 기본 매개변수. 경우 ㅊ, createElement를 앱 코드에서 손으로 씁니다. 되지만 JSX가 읽기 쉽고 컴파일러·린트가 더 잘 봅니다. 경우 ㅋ, forwardRef를 전부 급히 뜯습니다. 18 지원이 필요하면 유지. 새 코드만 prop. 경우 ㅌ, isValidElement로 자식 타입을 분기합니다. 컴포넌트 트리를 데이터처럼 다루는 설계 신호. 명시적 prop으로.",
        code: "경우               언제 생기나                       겉모습                               대안\nㄱ element.ref       자식 요소 .ref 읽기                 경고 (19 제거)                        element.props.ref · 렌더 prop\nㄴ 복제 + Fragment    cloneElement 자식이 감싸임            props 사라짐                         렌더 prop\nㄷ count vs toArray   null 포함 여부                     4 vs 3                              배열 prop\nㄹ only 에 둘        Children.only(children)            throw                               -\nㅁ 클래스 + 훅       render 안 useState                 에러                                 함수로\nㅂ memo 가 state 비교  PureComponent → memo               props 만 비교 (설계)                   -\nㅅ 훅 에러 경계       componentDidCatch 대응 찾기          없음                                 클래스 경계 · react-error-boundary\nㅇ 문자열 ref        ref=\"x\" · this.refs                 19 제거 · 빈 화면                      createRef · useRef · 콜백\nㅈ 함수 defaultProps  Fn.defaultProps                    19.3.1 동작 (경고 없음)                기본 매개변수\nㅊ 손 createElement   앱 코드                           읽기 어려움                           JSX\nㅋ forwardRef 전부 제거  18 지원 필요한데                  호환 깨짐                            새 코드만 prop\nㅌ isValidElement 분기  자식 타입으로 분기                 암묵적                               명시적 prop",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 레거시는 '암묵' 을 '명시' 로 바꾸라는 목록이다",
        body: "여덟의 대안을 나란히 놓으면 방향이 하나입니다. 자식 요소를 뒤져 props를 끼우던 것(Children, cloneElement)은 배열·렌더 prop·컨텍스트로 '무엇을 받는지 보이게', 인스턴스에 매달던 것(Component, PureComponent, createRef)은 훅으로 '로직 단위로 보이게', ref를 뒤로 흘리던 것(forwardRef)은 보통 prop으로 '다른 prop과 같게', 요소를 손으로 만들던 것(createElement, isValidElement)은 JSX로 '구조가 보이게'. 암묵적인 것은 컴파일러·린트·타입이 분석하기 어렵고 사람도 따라가기 어렵습니다. 그래서 레거시 목록은 '깨진 것'이 아니라 '도구가 볼 수 없는 것'의 목록입니다. 처방은 만나는 대로 바꾸되, 호환 범위(18 지원)와 예외(에러 경계)는 남기는 것입니다.",
        code: "암묵 (레거시)                              명시 (대안)\n자식을 뒤져 props 끼움  Children · cloneElement   →  배열 prop · 렌더 prop · 컨텍스트     무엇을 받는지 보임\n인스턴스에 매달기      Component · Pure · createRef  →  useState · useEffect · memo · useRef   로직 단위로 보임\nref 를 뒤로 흘림      forwardRef                 →  ref prop (19)                     다른 prop 과 같음\n요소를 손으로         createElement · isValidElement  →  JSX                            구조가 보임\n\n남기는 것:  18 호환이면 forwardRef · 에러 경계 클래스 하나",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "React 참고서 여덟 갈래가 끝났습니다. 위로 올라가면 '배우기' 쪽(시작하기, UI 표현하기, 상호작용성, State 관리, 탈출구)이 같은 측정 위에서 '왜'를 다룹니다. 옆으로 가면 Vue 노드가 같은 문제(반응성, 컴포넌트, SSR)를 다른 답으로 풉니다.",
      },
      {
        label: "확인 질문",
        body: "오래된 코드에서 셋을 봤습니다. (a) const Tabs = ({ children }) => Children.map(children, (c, i) => cloneElement(c, { active: i === cur })) (b) class Avatar extends PureComponent { render() {…} } (c) const Input = forwardRef((props, ref) => <input ref={ref} {...props} />) 각각 바꿀까요, 두어도 될까요, 바꾸면 무엇으로?",
        notes: [
          {
            title: "답",
            body: "(a) 바꿉니다. Tab이 active를 받는지 어디에도 명시되지 않고, 소비자가 <Tab>을 Fragment나 래퍼로 감싸면 깨집니다. 렌더 prop(<Tabs items={tabs} renderTab={(t, active) => <Tab {...t} active={active}/>}/>)이나 컨텍스트(Tabs가 cur을 제공하고 Tab이 useContext로 읽음)로 바꿉니다. 실제로 돌려 보면 cloneElement 자체는 동작하지만 그것이 문제가 아닙니다. (b) 급하지 않습니다. 동작하고(실제로 memo와 같은 렌더 횟수) 깨질 신호도 없습니다. 다만 훅을 쓰려면 클래스에서는 불가능하므로, 그 컴포넌트를 손볼 때 const Avatar = memo(function Avatar(props) {…})로 바꿉니다. memo는 props만 비교합니다. (c) 두어도 됩니다. 19.3.1에서 경고 없이 동작하고 문서도 '향후' 폐기라고만 합니다. 18도 지원하는 라이브러리면 유지가 맞습니다. 19 전용 앱 코드면 function Input({ ref, ...props }) { return <input ref={ref} {...props}/> }로 바꿔 래퍼를 없앱니다. 결과는 같습니다. 어느 쪽이든 element.ref를 읽는 코드는 element.props.ref로 바꿉니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Legacy React APIs", href: `${DOCS}/reference/react/legacy` },
      { label: "Children", href: `${DOCS}/reference/react/Children` },
      { label: "cloneElement", href: `${DOCS}/reference/react/cloneElement` },
      { label: "Component", href: `${DOCS}/reference/react/Component` },
      { label: "forwardRef", href: `${DOCS}/reference/react/forwardRef` },
      { label: "PureComponent", href: `${DOCS}/reference/react/PureComponent` },
      { label: "createRef", href: `${DOCS}/reference/react/createRef` },
    ],
  },
];
