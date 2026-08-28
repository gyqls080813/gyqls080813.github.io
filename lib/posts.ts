export type TheoryRole = "원인 개념" | "해결 기법" | "관련 개념";

export type PostSection = {
  heading: string;
  /** 섹션 불릿 색: trouble(코럴) = 증상, theory(청록) = 원인·해결 */
  tone: "trouble" | "theory";
  body: string;
  code?: string;
};

export type Post = {
  /** 그래프의 트러블 노드 id와 동일 */
  id: string;
  title: string;
  date: string;
  readMinutes: number;
  /** 프로젝트 노드 id */
  project: string;
  theories: { id: string; role: TheoryRole }[];
  lead: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  /* ─────────────── WITHY — 넷플릭스 워치파티 크롬 익스텐션 ─────────────── */
  {
    id: "t-isolated",
    title: "video.currentTime은 됐는데, 넷플릭스는 그 사실을 몰랐다",
    date: "2026.02.05",
    readMinutes: 9,
    project: "withy",
    theories: [{ id: "js-frames", role: "원인 개념" }],
    lead: "넷플릭스 위에 얹히는 익스텐션에서 플레이어를 제어해야 했다. <video>를 직접 조작하면 재생·정지는 됐지만 탐색에서 진행바가 어긋나고 영상이 튀었다. 정상 경로인 내부 API는 콘솔에 undefined로 찍혔다 — 만질 수 있는 건 부작용이 있고, 제대로 된 건 안 보이는 상황이었다.",
    sections: [
      {
        heading: "증상 — 동작은 하는데 상태가 어긋난다",
        tone: "trouble",
        body: "<video>의 currentTime을 바꾸는 방식은 같은 프로젝트의 유튜브에서는 충분했다. 넷플릭스도 재생·정지는 됐다. 그런데 탐색을 하면 넷플릭스의 커스텀 진행바가 실제 위치를 따라오지 않았고, 자체 버퍼 관리와 충돌해 영상이 튀었다. 넷플릭스는 <video> 위에 자체 플레이어 계층을 얹어 상태를 따로 관리하는데, DOM을 직접 건드리면 그 계층은 그 사실을 모른다.",
      },
      {
        heading: "원인 — Isolated World: DOM은 공유, JS 힙은 분리",
        tone: "theory",
        body: "정상 경로는 window.netflix 내부 API를 거치는 것이다. 그런데 콘텐츠 스크립트에서 찍으면 undefined였다. 콘텐츠 스크립트는 Isolated World에서 실행되어 DOM은 페이지와 공유하지만 JavaScript 힙은 완전히 분리되기 때문이다. 개발자도구 콘솔의 컨텍스트를 바꿔가며 대조하면 눈으로 확인된다 — top에서는 window.netflix가 객체·chrome.storage가 undefined, 익스텐션 컨텍스트에서는 정확히 반대. 이건 버그가 아니라 의도된 보안 설계다. 이 경계가 없으면 아무 웹사이트나 익스텐션 권한으로 토큰을 훔칠 수 있다.",
      },
      {
        heading: "해결 — 권한 없는 코드만 MAIN World로 내려보낸다",
        tone: "theory",
        body: "WXT의 world: 'MAIN' 옵션으로 넷플릭스 API를 호출하는 코드만 페이지와 같은 컨텍스트에 정식으로 넣고, 확장 권한이 필요한 나머지는 Isolated에 남겨 postMessage로 이었다. MAIN World 스크립트에는 토큰도 저장소도 서버 통신도 없다 — 페이지가 이 코드를 다 들여다봐도 가져갈 게 없다. 격리를 뚫은 게 아니라, 권한 없는 코드만 아래에 두고 메시지로 이은 것이다.",
        code: "// MAIN World가 하는 일 전부 — 명령을 받아 플레이어를 호출\nwindow.addEventListener(\"message\", (event) => {\n  if (event.data?.type !== \"WIDDY_NETFLIX_CONTROL\") return;\n  const { action, value } = event.data.payload;\n  const player = getNetflixPlayer(); // window.netflix... 세션 조회\n  if (action === \"SEEK\") player.seek(value);\n});",
      },
      {
        heading: "읽기와 쓰기의 비대칭 — 경계를 넘어야만 하는 것만 넘긴다",
        tone: "theory",
        body: "쓰기(재생·정지·탐색)만 MAIN World에 위임했다. 읽기(현재 위치)는 <video>.currentTime을 Isolated에서 직접 읽는다 — DOM은 두 World가 공유하니까. 읽기까지 postMessage 왕복으로 만들면 동기화 판정의 기준값이 낡은 값이 된다. 전부 한쪽으로 통일하는 게 깔끔해 보여도, 안 넘어도 될 것까지 비동기 비용을 물게 된다.",
      },
      {
        heading: "결과와 한계",
        tone: "theory",
        body: "플랫폼이 관리하는 정상 경로로 제어하게 되어 UI 상태·버퍼 어긋남이 사라졌다. 다만 window.netflix는 공식 문서가 없는 사설 경로라 넷플릭스가 리팩터하면 깨진다. try/catch를 두 겹으로 걸어 한 번의 실패가 리스너 전체를 죽이지 않게 했고, 플레이어 객체는 캐싱하지 않고 명령마다 새로 찾는다 — 에피소드가 바뀌면 세션이 재생성되기 때문이다. 배운 것: 경계가 있는 데는 이유가 있고, 넘을 때는 넘는 범위를 최소로 해야 한다.",
      },
    ],
  },
  {
    id: "t-focus",
    title: "넷플릭스가 유휴 상태가 되면 채팅 커서가 사라졌다",
    date: "2026.02.06",
    readMinutes: 7,
    project: "withy",
    theories: [{ id: "js-events", role: "원인 개념" },
      { id: "js-ui-events", role: "관련 개념" }],
    lead: "우리 채팅창은 남의 페이지 위에 얹혀 있다. 그래서 입력이 우리 것으로 끝나지 않았다. 유튜브에서는 치는 글자가 단축키로 새어 나갔고, 넷플릭스에서는 몇 글자 치고 나면 커서가 그냥 사라졌다. 증상은 비슷해 보였지만 원인이 서로 달랐고, 그래서 해결도 달라야 했다.",
    sections: [
      {
        heading: "증상 — 유튜브는 새어 나가고, 넷플릭스는 끊긴다",
        tone: "trouble",
        body: "유튜브에서는 채팅창에 Space를 치면 영상이 멈추고 방향키를 누르면 건너뛰었다. 글자는 찍히는데 영상도 같이 반응했다. 넷플릭스는 달랐다. 타이핑을 하다가 잠깐 손을 멈추면 커서가 사라지고, 그 뒤로 치는 글자가 아무 데도 들어가지 않았다. 다시 입력창을 클릭해야 이어 쓸 수 있었다.",
      },
      {
        heading: "원인 1 — 이벤트는 우리 입력창에서 끝나지 않는다",
        tone: "theory",
        body: "유튜브 쪽은 전파 문제였다. 키 이벤트는 발생한 요소에서 멈추지 않고 조상 라인을 타고 document까지 올라가는데, 거기에 플랫폼의 단축키 리스너가 걸려 있다. 우리 입력창이 Shadow DOM 안에 있어도 막히지 않는다 — Shadow DOM이 격리하는 건 스타일과 DOM 트리 조회이지 이벤트 전파가 아니다. 키 이벤트는 경계를 넘을 때 호스트 쪽 조상으로 다시 타깃팅될 뿐, 올라가는 것 자체는 멈추지 않는다.",
      },
      {
        heading: "원인 2 — idle-user: 커서를 가져가는 건 클래스 하나였다",
        tone: "trouble",
        body: "넷플릭스 쪽은 전파가 아니라 포커스였다. 넷플릭스는 마우스가 잠시 멈추면 컨트롤을 감추면서 플레이어 컨테이너에 idle-user 클래스를 붙인다. 그 순간 포커스가 우리 입력창에서 플레이어나 body로 회수된다. 사용자 입장에서는 가만히 있었을 뿐인데 커서가 사라지는 것이다. 그리고 우리는 포커스를 잃었다는 사실 자체를 모르니 되돌릴 수도 없었다. 문제는 이 신호가 우리 쪽에 없다는 것이었다 — 클래스가 붙는 것도, 포커스가 어디로 갔는지도, 넷플릭스가 사는 MAIN World의 일이었다.",
      },
      {
        heading: "해결 1 — MAIN World를 감시자로 쓴다",
        tone: "theory",
        body: "플레이어 제어를 위해 이미 MAIN World에 스크립트를 심어 둔 상태였다. 거기에 역할을 하나 더 줬다. MutationObserver로 플레이어 컨테이너의 class 속성만 지켜보다가 idle 상태가 바뀌면 알리고, window의 focus를 capture 단계로 잡아 포커스가 어디로 갔는지(data-uia 값, 클래스 이름)를 함께 넘긴다. 판단은 하지 않고 관찰만 한다 — 되찾을지 말지는 UI를 가진 Isolated World가 정한다.",
        code: "// MAIN World — 넷플릭스가 컨트롤을 감추는 순간을 알린다\nconst observer = new MutationObserver((mutations) => {\n  mutations.forEach((mutation) => {\n    if (mutation.attributeName !== \"class\") return;\n    const target = mutation.target as HTMLElement;\n    window.postMessage({\n      type: \"WIDDY_NETFLIX_IDLE_STATE\",\n      payload: { isIdle: target.classList.contains(\"idle-user\") },\n    }, \"*\");\n  });\n});\n\n// 플레이어 뷰는 뒤늦게 생긴다 — 나타날 때까지 기다렸다 붙인다\nconst wait = setInterval(() => {\n  const playerView = document.querySelector(\".watch-video--player-view\");\n  if (!playerView) return;\n  clearInterval(wait);\n  observer.observe(playerView, { attributes: true, attributeFilter: [\"class\"] });\n}, 1000);",
      },
      {
        heading: "해결 2 — 뺏기면 돌려놓는다",
        tone: "theory",
        body: "포커스는 막을 수가 없다. 넷플릭스가 focus()를 호출하는 것 자체를 취소할 방법이 없기 때문이다. 그래서 막는 대신 되돌리기로 했다. idle 신호를 받았을 때 활성 요소가 우리 입력창이 아니면 다시 focus를 준다. 그물은 하나로는 부족해서 여러 겹으로 쳤다 — document의 focus를 capture로 잡아 다른 요소가 포커스를 가져가려는 순간 되찾고, blur에서는 relatedTarget을 보고 body나 video로 빠져나간 경우에만 복구한다. 사용자가 스스로 다른 곳을 클릭한 것이라면 그건 존중해야 하니까.",
        code: "// 포커스가 넘어가려는 순간을 capture로 잡는다\nconst handleFocusCapture = (event: FocusEvent) => {\n  const input = inputRef.current;\n  if (!input) return;\n  if (document.activeElement !== input) return; // 원래 내 것이 아니었으면 관여하지 않는다\n  if (event.target === input) return;\n  event.stopPropagation();\n  input.focus();\n};\ndocument.addEventListener(\"focus\", handleFocusCapture, true);",
      },
      {
        heading: "유튜브 쪽 — 통과가 기본이다",
        tone: "theory",
        body: "전파 문제는 훨씬 간단했다. 입력창의 키 이벤트만 stopPropagation으로 끊으면 document의 단축키 리스너까지 올라가지 않는다. 중요한 건 preventDefault를 하지 않는다는 것이다 — 글자는 찍혀야 하니까. 전파만 끊고 기본 동작은 살린다. 그리고 이 처리는 입력창 안에서만 일어난다. 채팅을 치고 있지 않을 때의 Space는 그대로 유튜브로 흘러가 영상을 멈춰야 맞다. 차단이 기본이 아니라 통과가 기본이다.",
      },
      {
        heading: "결과와 남은 것",
        tone: "theory",
        body: "채팅을 치는 동안 영상이 반응하지 않고, 손을 멈춰도 커서가 사라지지 않게 됐다. 다만 두 해결책의 성격이 다르다. 전파를 끊는 쪽은 브라우저가 보장하는 순서에 기댄 것이라 안정적이다. 포커스를 되찾는 쪽은 idle-user라는 클래스 이름 하나에 기대고 있다 — 넷플릭스가 그 이름을 바꾸면 조용히 깨진다. 그물을 여러 겹으로 친 것도 그래서였다. 남의 페이지 위에서는 규칙을 만들 수 없고 반응만 할 수 있다는 걸, 이 두 겹의 차이로 배웠다.",
      },
    ],
  },
  {
    id: "t-sync",
    title: "완벽히 맞추려던 동기화가 오히려 영상을 끊고 있었다",
    date: "2026.02.08",
    readMinutes: 7,
    project: "withy",
    theories: [
      { id: "js-network", role: "해결 기법" },
      { id: "rl-escape", role: "관련 개념" },
    ],
    lead: "호스트의 재생 위치를 참여자에게 전파했더니 영상이 계속 끊겼다. 네트워크 지연 때문에 참여자의 위치는 호스트와 항상 미세하게 다른데, 그 차이를 매번 seek로 맞추려 한 것이 원인이었다. 오차를 0으로 만들려는 시도 자체가 불안정을 만들고 있었다.",
    sections: [
      {
        heading: "증상 — 맞출수록 끊긴다",
        tone: "trouble",
        body: "명령이 도착하는 데 걸린 시간만큼 위치는 이미 어긋나 있고, 그 지연은 참여자마다 다르고 계속 변한다. 차이가 날 때마다 seek를 걸면 화면이 튀고 버퍼링이 걸린다. 넷플릭스는 적응형 스트리밍이라 탐색 지점의 세그먼트를 다시 받아야 해서 특히 비싸다.",
      },
      {
        heading: "해결 — 1초 불감대: 아무것도 하지 않는 것이 설계다",
        tone: "theory",
        body: "명령을 받으면 바로 seek하지 않는다. 현재 위치를 <video>.currentTime으로 동기적으로 읽고, 목표값과의 차이가 1초를 넘을 때만 이동한다. 이내면 아무것도 하지 않는다 — 조금 어긋난 상태를 그대로 두는 것이 이 설계의 선택이다. 1초 미만은 같이 보는 데 지장이 없고, 맞추려는 행위가 만드는 끊김이 훨씬 크다. 1초는 '사람이 같이 본다고 느끼는 한계'와 '네트워크 지터가 일상적으로 넘지 않는 폭'이 겹치는 지점으로 잡았다.",
      },
      {
        heading: "하트비트 — 이벤트만으로는 원리적으로 못 잡는 것",
        tone: "theory",
        body: "이벤트 기반은 유휴 트래픽이 0이지만 구멍이 둘 있다. 재생 중 디코딩 속도·버퍼링 차이로 누적되는 드리프트는 '변화'가 아니라서 이벤트가 발생할 이유가 없고, 중간 참여자는 이전 이벤트를 못 받아 현재 위치를 모른다. 그래서 호스트가 5초마다 현재 상태를 브로드캐스트하는 하트비트를 얹었다. 폴링과 다르다 — 실제 조작은 발생 즉시 별도로 나가고, 하트비트는 안전망일 뿐이다. 그리고 불감대와 짝으로 동작한다: 5초마다 상태가 와도 이미 맞으면 불감대가 걸러서 아무 일도 안 일어난다.",
      },
      {
        heading: "왜 WebSocket인가 — 결정한 건 영상이 아니라 채팅",
        tone: "theory",
        body: "영상 동기화만 보면 호스트만 발신하는 단방향이라 SSE로도 됐다. 그런데 채팅은 참여자 전원이 수시로 보낸다. SSE면 받기는 SSE·보내기는 HTTP POST로 채널이 두 벌이 되고 순서도 어긋날 수 있다. 채팅 때문에 WebSocket(STOMP)이 이미 필요했고, 영상 동기화를 그 위에 얹었다. 연결은 Background 서비스워커가 소유한다 — content script에 두면 새로고침 한 번에 파티에서 튕긴다. 호스트 한 명만 발신하는 권위 모델이라 서로 맞추려다 진동하는 문제도, 참여자 seek가 명령으로 되돌아오는 에코도 구조적으로 생기지 않는다.",
      },
      {
        heading: "정직한 결과",
        tone: "theory",
        body: "불필요한 탐색이 사라져 재생이 끊기지 않게 됐고, 유휴 상태 트래픽 없이 드리프트가 보정된다. 다만 정확히 말하면 밀리초 동기화가 아니라 상시 최대 1초 오차를 허용하는 근사 동기화다. 1초 미만은 설계상 교정되지 않는다 — 그게 이 설계의 의도이기도 하다. 그리고 1초라는 값은 측정이 아니라 체감으로 정한 값이다.",
      },
    ],
  },

  /* ─────────────── Petfolio — 반려동물 공동 가계부 ─────────────── */
  {
    id: "t-schema",
    title: "백엔드 스키마가 바뀌면 전원이 같은 흰 화면을 봤다",
    date: "2026.03.24",
    readMinutes: 6,
    project: "petfolio",
    theories: [
      { id: "ts-hb-everyday", role: "원인 개념" },
      { id: "ts-hb-narrowing", role: "해결 기법" },
    ],
    lead: "API 응답을 타입만 믿고 그대로 썼다. 백엔드 스키마가 변경되면 프론트엔드에서 TypeError가 터지고 사용자에게 빈 화면이 노출됐다. 공동 가계부라 그룹 전원이 동시에 같은 빈 화면을 본다 — 이 서비스에서 특히 나쁜 실패였다.",
    sections: [
      {
        heading: "증상 — 로컬에서는 절대 재현되지 않는 크래시",
        tone: "trouble",
        body: "배포된 화면이 어느 날 White Screen이 됐다. 코드는 그대로였고, 바뀐 건 백엔드 응답 형태였다. 응답의 중첩 필드 하나가 사라지자 undefined 접근이 렌더 중에 터졌고, React 트리 전체가 내려앉았다.",
      },
      {
        heading: "원인 — 타입은 컴파일 후에 사라진다",
        tone: "theory",
        body: "TypeScript의 타입은 런타임에 존재하지 않는다. response as ExpenseData는 검증이 아니라 '이럴 것이다'라는 선언일 뿐이고, 실제 응답이 다르게 생겼는지는 아무도 확인하지 않는다. 신뢰 경계(서버 응답)를 넘어온 데이터를 검증 없이 타입만 씌워 쓰면, 오염이 화면 깊숙한 곳까지 흘러들어가 어디서 터질지 예측할 수 없게 된다.",
      },
      {
        heading: "해결 — 경계에서 1회 검증",
        tone: "theory",
        body: "@effect/schema로 응답이 도착하는 즉시 사전 정의된 스키마와 런타임 비교 검증하고, 형식이 불일치하면 ParseError로 분류해 크래시 전에 차단했다. 검증은 경계에서 한 번만 한다 — 통과한 데이터는 그 뒤 어디서든 믿고 쓸 수 있고, 오염이 경계 안쪽으로 아예 못 들어온다. 스키마 불일치 시 빈 화면 대신 EffectErrorBanner가 렌더링되고, ParseError에는 재시도 버튼을 주지 않는다. 다시 시도해도 같은 응답이 올 테니까 — 에러 종류마다 UX가 달라야 한다.",
      },
      {
        heading: "남는 문제 — 스키마는 결국 프론트가 손으로 쓴다",
        tone: "theory",
        body: "이 방식의 대가는 계약서가 두 벌이 된다는 것이다. 응답의 형태를 정하는 쪽은 서버인데, 그 형태를 프론트도 스키마로 다시 적어 둔다. 백엔드가 필드를 바꾸면 이제 화면이 조용히 터지는 대신 ParseError로 시끄럽게 실패하지만, 스키마를 따라 고치는 일은 여전히 사람의 몫이다. 검증이 하는 일은 어긋남을 없애는 게 아니라, 어긋남이 드러나는 지점을 렌더 깊숙한 곳에서 경계로 끌어올리는 것이다. 근본은 API 명세에서 스키마를 생성하는 쪽인데 거기까지는 가지 않았다.",
      },
    ],
  },
  {
    id: "t-tagged",
    title: "에러 타입이 unknown인 채로는, 놓친 분기가 크래시가 된다",
    date: "2026.03.28",
    readMinutes: 6,
    project: "petfolio",
    theories: [{ id: "ts-hb-narrowing", role: "해결 기법" },
      { id: "ts-tm-creating", role: "관련 개념" }],
    lead: "try/catch의 에러는 unknown으로 추론된다. 어떤 에러가 올 수 있는지 컴파일러가 모르니, 예외 처리를 빠뜨린 지점은 조용히 통과되다가 런타임 크래시로 드러났다. 에러 처리 누락을 사람의 성실함이 아니라 컴파일러가 잡게 만들고 싶었다.",
    sections: [
      {
        heading: "증상 — 누락은 컴파일이 통과된다",
        tone: "trouble",
        body: "API 호출 실패에는 네트워크 단절, 인증 만료, 서버 에러, 응답 형식 불일치가 섞여 있다. TypeScript에는 Java의 throws 같은 선언이 없어서, 함수 시그니처만 봐서는 무엇이 던져지는지 알 수 없다. 분기를 하나 빠뜨려도 에러 없이 컴파일되고, 그 지점은 사용자가 밟는 순간 크래시가 된다.",
      },
      {
        heading: "해결 — 에러 4종 규격화 + Effect-TS",
        tone: "theory",
        body: "실패를 네 종류로 나누고 각각에 이름을 붙였다. 서버가 에러를 보낸 ApiError, 연결이 실패한 NetworkError, 인증이 만료된 UnauthorizedError, 응답 형태가 어긋난 ParseError. Effect-TS의 Data.TaggedError로 만들면 각 에러가 _tag라는 리터럴 필드를 갖고, 넷을 합친 HttpError 유니온이 함수 시그니처의 에러 자리에 그대로 실린다. Effect<A, HttpError> 형태라 '무엇이 실패할 수 있는가'가 호출하는 쪽에 보이고, _tag로 좁히지 않은 채 쓰면 타입이 통과되지 않는다. 런타임에 가서야 알던 것을 컴파일 단계로 당긴 것이다.",
        code: "export class ApiError extends Data.TaggedError('ApiError')<{\n  readonly status: number;\n  readonly message: string;\n  readonly data?: unknown;\n}> {}\n\nexport class ParseError extends Data.TaggedError('ParseError')<{\n  readonly message: string;\n  readonly cause?: unknown;\n}> {}\n\n// 네 종류를 합친 것이 이 계층의 전부다\nexport type HttpError =\n  | ApiError | NetworkError | UnauthorizedError | ParseError;",
      },
      {
        heading: "대안 인정 — class로도 분류는 된다",
        tone: "theory",
        body: "에러를 클래스로 나누고 instanceof로 분기하는 것만으로도 '분류'는 가능하다. 남는 차이는 하나다 — class는 분류가 가능할 뿐이지만, Effect는 분류하지 않으면 타입이 통과되지 않는다. 규칙을 문서가 아니라 컴파일러로 강제하는 것. 대가도 있다: 공통 래퍼로 통일하면서 개별 함수의 시그니처를 봐서 얻던 정보는 줄었다.",
      },
      {
        heading: "결과 — 에러 종류마다 다른 화면",
        tone: "theory",
        body: "이름이 붙자 실패마다 다른 말을 할 수 있게 됐다. NetworkError는 '네트워크 연결을 확인해주세요'와 함께 재시도 버튼을 준다. UnauthorizedError는 재로그인으로 보낸다. ParseError는 '서버 응답 형식이 변경되었습니다'라고 말하고 재시도 버튼을 주지 않는다 — 다시 눌러도 같은 응답이 올 테니까. 재시도가 의미 있는 실패인지를 판정하는 함수를 따로 두고, 화면은 그것만 물어본다.",
        code: "export const isRetryable = (error: HttpError | null): boolean => {\n  if (!error) return false;\n  if (error._tag === 'NetworkError') return true;          // 다시 하면 될 수도\n  if (error._tag === 'ApiError' && error.status >= 500) return true;\n  return false;                                            // ParseError는 여기서 걸린다\n};",
      },
    ],
  },

  /* ─────────────── Tickle — 공정한 티켓 예매 플랫폼 ─────────────── */
  {
    id: "t-canvas",
    title: "DOM으로 그린 좌석은 셀렉터 한 줄에 뚫렸다",
    date: "2026.05.10",
    readMinutes: 7,
    project: "tickle",
    theories: [{ id: "js-document", role: "관련 개념" }],
    lead: "좌석을 DOM으로 그리니 구조가 개발자 도구에 투명하게 보였다. 콘솔에서 querySelector로 좌석을 찾아 click()을 부르면 사람이 클릭한 것과 똑같이 동작했다. 좌석의 '의미'가 마크업에 그대로 적혀 있다는 게 문제였다.",
    sections: [
      {
        heading: "증상 — 자동 클릭 스크립트에 그대로 뚫린다",
        tone: "trouble",
        body: "document.querySelector('.seat[data-id=\"A3\"]').click() — 이 한 줄이면 끝이었다. 게다가 좌석 하나를 입체감 있게 그리려면 요소가 여러 개 필요해서, 좌석 수백 개면 DOM 노드가 수천 개가 되고 상태가 바뀔 때마다 그 트리를 다시 계산해야 했다.",
      },
      {
        heading: "해결 — 190석을 Canvas 하나로",
        tone: "theory",
        body: "공연장 하나에 190석인데 <canvas> 태그는 단 하나다. 좌석 배치를 순회해 사각형 정보(id·x·y·크기) 배열을 useMemo로 한 번 만들고, 좌석 하나를 그리는 일은 React를 모르는 순수 함수로 분리했다. Canvas는 한 번 그리면 픽셀만 남고 '여기가 A열 3번'이라는 정보가 사라진다 — 사각형 배열이 유일한 진실이고, 화면은 그걸 시각화한 결과일 뿐이다. 클릭은 좌표를 받아 어느 사각형 안인지 역산하는 히트 테스트로 매핑했다.",
        code: "// 좌표 → 좌석: 화면에는 없는 정보를 메모리에서 되찾는다\nconst getHitSeat = (e: React.MouseEvent) => {\n  const rect = canvas.getBoundingClientRect();\n  // CSS transform(scale)이 걸리면 화면 좌표와 캔버스 좌표의 비율이 달라진다\n  const scaleX = canvas.offsetWidth / rect.width;\n  const x = (e.clientX - rect.left) * scaleX;\n  const y = (e.clientY - rect.top) * (canvas.offsetHeight / rect.height);\n\n  for (const seat of seatRects) {\n    if (x >= seat.x && x <= seat.x + seat.width &&\n        y >= seat.y && y <= seat.y + seat.height) return seat.id;\n  }\n  return null;\n};",
      },
      {
        heading: "까다로웠던 것 — 확대 상태의 좌표 보정",
        tone: "theory",
        body: "좌석 맵에 CSS transform: scale()이 걸리면 화면 좌표와 캔버스 내부 좌표의 비율이 달라진다. getBoundingClientRect()는 변환 후 크기, offsetWidth는 변환 전 크기라 scaleX = offsetWidth / rect.width로 보정했다. 이걸 안 하면 확대할수록 어긋나서, 좌석이 작아 확대했더니 더 안 맞는 상황이 됐을 것이다. 고해상도 흐림은 내부 버퍼를 devicePixelRatio 배로 잡고 ctx.scale(dpr, dpr)로 해결 — 그리는 코드는 CSS 좌표계를 그대로 쓰면서 실제로는 고밀도로 그려진다.",
      },
      {
        heading: "적용 범위 — 기술 선호가 아니라 요구사항으로 합의",
        tone: "theory",
        body: "팀에서 의견이 갈렸다. 보안 때문에 Canvas를 주장했고, 접근성과 개발 속도를 이유로 반대가 있었다. 둘 다 맞는 얘기라 보안이 실제로 필요한 좌석과 CAPTCHA만 Canvas로 하고 나머지 화면은 DOM을 유지하는 절충안으로 합의했다.",
      },
      {
        heading: "결과와 한계",
        tone: "theory",
        body: "셀렉터 기반 자동 클릭이 프론트 단에서 차단됐고, 상태가 바뀌어도 DOM 구조는 변하지 않는다(픽셀만 바뀐다). 다만 완전한 방어는 아니다 — 클릭은 결국 좌표라서 dispatchEvent로 좌표에 쏘면 히트 테스트는 구분하지 못한다. 이 층의 역할은 값싼 자동화를 거르는 것이고, 정밀 판정은 서버 AI가 행동 데이터로 한다. 그리고 접근성을 포기했다. 스크린리더는 Canvas 좌석을 읽을 수 없다 — 인지하고 감수한 결정이지만, 상용 서비스였다면 숨김 버튼 리스트 병행 없이 배포할 수는 없었을 것이다.",
      },
      {
        heading: "지금 다시 본다면 — 매 프레임 다시 그릴 이유가 없었다",
        tone: "trouble",
        body: "그리기 루프를 requestAnimationFrame으로 계속 돌게 짰다. 좌석 상태가 바뀌든 말든 초당 60번 190석을 전부 다시 그린다는 뜻이다. 애니메이션이 있는 화면이 아니니 상태가 바뀔 때만 한 번 그리면 충분했다. 마우스를 올렸을 때의 반응 때문에 매 프레임 갱신이 편했던 건데, 호버는 그 좌석 하나만 다시 그리면 되는 일이었다. DOM 리렌더를 줄이려고 Canvas로 옮겨놓고 정작 캔버스 안에서 같은 낭비를 하고 있었던 셈이다.",
      },
    ],
  },
  {
    id: "t-webdriver",
    title: "봇 방어가 서버 AI 한 곳뿐이라는 게 문제였다",
    date: "2026.05.15",
    readMinutes: 5,
    project: "tickle",
    theories: [{ id: "js-document", role: "관련 개념" }],
    lead: "방어가 단일 층이면 그 층이 곧 단일 실패 지점이다. Selenium·Playwright처럼 브라우저에 명백한 흔적을 남기는 자동화까지 행동 수집 → 전송 → AI 추론 파이프라인을 전부 태우면, 정작 정밀 판정이 필요한 트래픽에 쓸 자원이 줄어든다.",
    sections: [
      {
        heading: "해결 — 오탐이 안 나는 신호만 클라이언트에서",
        tone: "theory",
        body: "BotDetector 컴포넌트가 마운트 직후 세 가지를 검사한다: navigator.webdriver(W3C 표준 — 자동화 제어 중이면 true), <html>의 webdriver 속성, User-Agent의 headless 문자열. 셋 다 정상 브라우저에는 절대 나타나지 않는 값이라는 공통점으로 골랐다. 조건을 더 넣을수록 오탐이 커진다 — '마우스가 너무 규칙적이다' 같은 애매한 판단을 클라이언트에서 하면 접근성 도구 사용자가 막힌다. 확실한 것만 클라, 애매한 것 전부 서버.",
      },
      {
        heading: "렌더 이전에 배치한 이유",
        tone: "theory",
        body: "렌더 후에 검사하면 좌석 정보와 예매 UI가 이미 DOM에 올라간 뒤라, 차단해봐야 봇은 필요한 정보를 읽었을 수 있다. 최상위에서 children을 감싸고 봇 판정 시 return null — 판정을 먼저 하고 통과한 경우에만 화면을 그린다. 차단 API가 실패해도 finally에서 무조건 차단 페이지로 보낸다. API 실패가 차단 자체를 막으면 안 되니까.",
      },
      {
        heading: "계층 방어 — 위로 갈수록 값싸고 아래로 갈수록 정밀하게",
        tone: "theory",
        body: "WebDriver 검사(비용 거의 0) → Canvas 렌더링(셀렉터 자동화 차단) → 행동 데이터 + AI 판정(정교한 봇) → CAPTCHA 재검증. 각 층이 막는 대상이 다르고, 하나를 뚫어도 다음 층이 남는다. 단독으로 완전한 층은 없다 — 각 층이 무엇을 막을 수 있고 무엇을 못 막는지 구분해서 배치한 것이다.",
      },
      {
        heading: "정직한 한계 — 이건 차단이 아니라 필터다",
        tone: "trouble",
        body: "세 검사 모두 우회 가능하다. navigator.webdriver는 defineProperty 한 줄로 덮이고, <html> 속성은 요즘 드라이버가 안 심어 사실상 죽은 검사이며, 신형 헤드리스는 UA에 headless를 안 넣는다. 직접 우회 코드를 짜서 셋 다 통과되는 걸 확인했다. 그래서 이 층은 '표식을 남긴 봇을 값싸게 거르는 1차 스크리닝'으로 범위를 한정했다. 그리고 뒤늦게 안 것: 오탐 시 로그인 사용자가 블랙리스트에 등록되는 구조라 비용이 비대칭인데, 초기에 고려하지 못했다.",
      },
    ],
  },
  {
    id: "t-buffer",
    title: "행동 데이터를 수집하자 좌석 화면이 버벅였다",
    date: "2026.05.22",
    readMinutes: 9,
    project: "tickle",
    theories: [
      { id: "js-ui-misc", role: "원인 개념" },
      { id: "rl-interact", role: "원인 개념" },
      { id: "rl-escape", role: "해결 기법" },
    ],
    lead: "봇 판별용 마우스 궤적을 수집하기 시작하자 좌석 화면 프레임이 뚝뚝 떨어졌다. 고빈도 이벤트를 React state에 담고, 무거운 지표 계산을 핸들러 안에서 하고, 이벤트마다 전송했다 — 수집·계산·전송이 한 지점에 몰려 있었다.",
    sections: [
      {
        heading: "증상 — mousemove 한 번마다 리렌더",
        tone: "trouble",
        body: "mousemove는 초당 60~120회 발생하는데 이벤트마다 setState를 부르면 그때마다 리렌더가 난다. 좌석 화면은 트리가 깊어 한 번의 비용이 작지 않았다. 여기에 42개 행동 지표 계산이 핸들러 안에서 돌았다 — 메인 스레드는 하나라서 계산이 끝날 때까지 렌더링도 입력 처리도 멈춘다.",
      },
      {
        heading: "해결 — React가 모르는 곳에 상태를 둔다",
        tone: "theory",
        body: "TrialCollector라는 순수 TypeScript 클래스를 만들어 useRef로 붙잡았다. React가 리렌더하는 조건은 setState 호출 하나뿐이라, 이벤트 배열이 클래스의 private 필드 안에 있으면 아무리 push해도 React에겐 아무 일도 일어나지 않은 것이다. useMemo·React.memo가 '리렌더는 일어나되 비용을 줄이는' 것이라면, 이건 리렌더가 억제되는 게 아니라 구조적으로 발생할 수 없다. useRef인 이유: useState는 갱신마다 리렌더(목적 무산), 일반 변수는 렌더마다 새 인스턴스(데이터 소실). 클래스는 'React가 모르게 하는' 장치, useRef는 '모르는 채로 계속 살아있게 하는' 장치 — 둘이 짝이다.",
      },
      {
        heading: "왜 그냥 useRef([])가 아닌가 — 캡슐화",
        tone: "theory",
        body: "리렌더 방지만이 목적이면 배열 ref로 충분하다. 클래스여야 했던 이유는 따로 있다. mousemove 하나에 스로틀 시각·카운터·인덱스·배열 네 상태가 관여하고, 재클릭 판정은 두 값이 항상 같이 갱신돼야 맞는다. ref로 흩어놓으면 하나만 바꿔도 컴파일이 통과하고 판정만 조용히 틀어진다. private 필드면 반드시 addClick()을 거치고 그 안에서 함께 갱신되므로 빠뜨릴 방법이 없다. 규칙을 문서가 아니라 구조로 강제하는 것.",
      },
      {
        heading: "타이머 없는 스로틀 — 좌표와 시각의 짝을 지킨다",
        tone: "theory",
        body: "스로틀은 lastMoveTs 숫자 하나로 한다. 이벤트가 들어오면 뺄셈 하나·비교 하나로 그 자리에서 버릴지 정한다. setTimeout 스로틀은 타이머 생성·큐 등록·정리가 계속 붙고, 더 나쁜 건 콜백이 '50ms 뒤부터 실행 가능'이라 정작 성능이 나쁠 때 샘플링 간격이 불규칙해진다는 것. 지금 방식은 이벤트가 온 그 순간 판단·저장하므로 좌표와 시각이 항상 정확히 짝을 이룬다 — 속도·가속도 계산이 이 짝에 의존한다. 스로틀은 mousemove에만 건다. 클릭은 하나 놓치면 더블클릭·간격 정보가 통째로 사라지지만, 이동은 하나 빠져도 궤적의 형태가 남는다.",
        code: "addMousemove(x: number, y: number) {\n  const now = Date.now();\n  if (now - this.lastMoveTs < MOUSE_THROTTLE_MS) return; // 버림\n  this.lastMoveTs = now;\n  this.moveCount++;\n  this.eventRows.push({ ...meta, x, y }); // 저장만, 계산 없음\n}",
      },
      {
        heading: "관측이 대상을 흔드는 문제 — DOM을 저장소로",
        tone: "theory",
        body: "'버튼이 렌더된 지 50ms 안에 눌렸는가'는 판별력이 높은 지표다(사람은 인지·조준에 최소 수백 ms). 그런데 이 시각을 state에 담으면 기록 행위가 리렌더를 만들어 측정 대상인 버튼이 다시 그려진다 — 관측이 관측 대상을 바꾼다. 그래서 값을 그 요소의 data-* 속성에 직접 썼다(data-mount-ts, data-visible-ts…). dataset 대입은 React 상태 시스템 바깥이라 리렌더가 0번이고, 노드 추가가 아니라 속성 대입이라 레이아웃도 다시 일어나지 않는다. 노출 시점은 IntersectionObserver로 — 브라우저가 감시하다 교차가 바뀔 때만 콜백을 부르니 메인 스레드 비용이 사실상 없다.",
      },
      {
        heading: "전송 시점 — 블로킹을 없앤 게 아니라 옮겼다",
        tone: "theory",
        body: "42개 지표는 속도(2점)·가속도(3점)·저크(4점)·직선성(구간 전체)처럼 원리적으로 이벤트 하나로는 만들 수 없는 값들이다. 즉 '이벤트마다 전송'은 요청이 많아서 나쁜 게 아니라 판별에 쓸 수 없는 데이터를 보내는 것이었다. 계산·전송은 단계 전환(captcha → detail → booking) 시점으로 옮겼다 — 같은 계산이라도 마우스를 움직이는 중이면 커서가 끊기지만, 화면이 전환되는 순간이면 사용자는 이미 로딩을 기다리는 중이라 묻힌다. 수집 구간에서 Long Task가 사라진 걸로 측정됐지만, 정확히는 없앤 게 아니라 전환 시점으로 옮긴 것이고 거기서는 여전히 동기로 돈다. 전송 실패는 무시한다 — 행동 수집은 부가 기능이고 예매가 본 기능이니까.",
      },
    ],
  },
];

export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}
