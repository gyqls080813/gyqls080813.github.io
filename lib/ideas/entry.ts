import type { Idea } from ".";

/** Ⅰ. 진입 & 라우팅 — 화면이 시작되는 자리 */
export const entryIdeas: Idea[] = [
  {
    id: "craft-url",
    name: "URL 설계",
    tagline: "이 상태를 URL에 담을 것인가, 담는다면 어디에 담을 것인가",
    intro:
      "화면 하나를 만들 때 제일 먼저 정하는 것은 주소입니다. 무엇이 주소에 있고 무엇이 없는지가 곧 '이 화면을 공유하고 새로고침하면 무엇이 살아남는가'를 정하기 때문입니다. 그래서 여기서 정하는 것은 라우팅 문법이 아니라 상태의 수명입니다. 이걸 틀리면 뒤의 상태 위치에서 같은 정보를 두 번 들고 있게 되고, 그 둘을 맞추는 코드가 따라옵니다.",
    sections: [
      {
        heading: "1. 이 단계의 의사결정",
        blocks: [
          {
            label: "질문은 둘이고 순서가 있다",
            body: "먼저 이 상태를 URL에 담을 것인가, 담기로 했다면 어디에 담을 것인가. 뒤의 질문에는 자리가 셋(path, query, hash) 있지만 그 셋을 펼치기 전에 앞의 질문에서 한 번 갈립니다. 둘을 한 줄에 세워 네 개의 선택지로 다루면 '담을 이유가 있나'를 건너뛰고 '어느 자리가 넘기기 편한가'부터 고르게 됩니다.",
          },
          {
            label: "담으면 얻는 것",
            body: "URL에 담긴 값만 화면 밖에서 살아남습니다. 링크를 보낸 사람과 받은 사람이 같은 화면을 보고, 새로고침해도 돌아오고, 뒤로가기가 '아까 그 화면'이라는 뜻을 갖고, 서버가 요청 하나만 보고도 그 화면을 그릴 수 있습니다. 버그 제보가 주소 한 줄로 끝나는 것도 같은 성질입니다. 이 중 하나라도 필요하면 담을 이유가 생긴 것입니다.",
          },
          {
            label: "담으면 치르는 값",
            body: "URL은 브라우저 히스토리, 서버 접근 로그, 리퍼러 헤더에 평문으로 남습니다. 문자열 하나뿐이라 구조가 있는 값은 직렬화해야 하고, 그 형식은 앞으로 계속 읽어 줘야 하는 약속이 됩니다. 그리고 URL을 바꾸는 일은 곧 라우팅이라, 값이 바뀔 때마다 트리가 다시 그려집니다. 마지막 것을 제일 비싸게 물었습니다 — 아래 '실제로 부딪힌 곳'의 검색창이 그 값을 치르다 우회한 자리입니다.",
          },
        ],
      },
      {
        heading: "2. 선택지",
        blocks: [
          {
            label: "URL에 안 둔다 — 여기서 먼저 갈린다",
            body: "모달이 열렸는지, 어디에 마우스가 올라가 있는지, 입력 중인 글자. 공유하거나 새로고침했을 때 되살아나지 않아도 되는 값은 담지 않습니다. 앞의 이유는 하나도 필요 없고 대가만 남는 경우입니다. URL을 더럽히지 않는 대신 다른 탭이나 새로고침에는 남지 않고, 그럼 어디에 두는지는 뒤의 상태 위치가 정합니다. 담기로 했다면 자리는 셋입니다.",
          },
          {
            label: "path — 무엇을 보는지",
            body: "리소스의 정체입니다. /events/123의 123이 없으면 그 페이지는 성립하지 않습니다. 깔끔하고 의미가 드러나고 계층을 표현할 수 있지만, 조합하거나 빼먹어도 되는 값을 넣기에는 맞지 않습니다.",
            code: "/events/123          // 어떤 공연인지 — 없으면 404가 맞다",
          },
          {
            label: "query — 어떻게 보는지",
            body: "표현 옵션입니다. 검색어, 정렬, 필터, 페이지, 탭처럼 없어도 페이지가 성립하고 여러 개를 조합할 수 있으며 순서가 상관없는 값. 리소스 식별에 쓰면(?id=123) 되긴 하지만 계층이 사라지고 검색 엔진에도 약합니다.",
            code: "/events?sort=price&page=2   // 같은 목록을 어떻게 거를지",
          },
          {
            label: "hash — 서버는 몰라도 되는 위치",
            body: "# 뒤는 요청에 실리지 않습니다. 서버가 볼 필요 없는 클라이언트 전용 값, 대체로 페이지 안의 앵커에 씁니다. 새로고침에는 남고 서버 로그에는 안 남는다는 성질이 있어서, 드물게 '서버에 절대 보내면 안 되는 값'을 잠깐 실어 나르는 데에도 쓰입니다.",
            code: "/docs#section-2      // 어느 위치로 스크롤할지",
          },
        ],
      },
      {
        heading: "3. 선택 기준",
        blocks: [
          {
            label: "판별 순서",
            body: "먼저 '공유와 새로고침에 살아남아야 하나'를 묻습니다. 아니면 URL 밖입니다. 살아남아야 하면 '없으면 404가 맞나'를 묻습니다. 맞으면 path, 기본값이 있어도 되면 query입니다. 마지막으로 '서버는 몰라도 되는 순수한 위치값인가'면 hash입니다. 이 순서로 물으면 한 값이 두 자리에 동시에 해당하는 일이 없습니다.",
            code: "/events/123?tab=schedule&sort=date#reviews\n//  123      → path  (어떤 공연인지)\n//  tab·sort → query (어떻게 볼지)\n//  #reviews → hash  (어디로 스크롤할지)\n//  '리뷰 작성 모달이 열렸는가' → URL에 없다, state",
          },
          {
            label: "주인은 하나여야 한다",
            body: "URL에 두기로 했으면 URL이 그 값의 유일한 주인입니다. 같은 값을 state에도 복사해 두고 둘을 맞추기 시작하면 이 결정은 이미 실패한 것입니다. 이 문장이 뒤에 나오는 안티패턴 넷 중 가장 자주 걸리는 것이고, 제 코드에서도 정확히 이렇게 걸렸습니다.",
          },
        ],
      },
      {
        heading: "4. 도구",
        blocks: [
          {
            label: "path를 골랐다면",
            body: "Next.js의 동적 세그먼트입니다. app/events/[id]/page.tsx를 두면 /events/123의 123이 params.id로 들어옵니다. 깊이가 가변이면 [...slug]로 배열을 받습니다.",
          },
          {
            label: "query를 골랐다면",
            body: "읽기는 useSearchParams, 조립은 URLSearchParams, 갱신은 router.push 또는 router.replace입니다. push는 히스토리를 쌓고 replace는 현재 항목을 바꿉니다. 필터나 정렬처럼 뒤로가기로 하나씩 되돌릴 필요가 없는 값은 replace가 맞습니다. 그래야 뒤로가기 한 번에 목록 화면 밖으로 나갑니다.",
            code: "const sort = useSearchParams().get('sort') ?? 'date';   // 읽기\n\nconst next = new URLSearchParams(searchParams);          // 조립\nnext.set('page', '2');\nrouter.replace(`?${next}`);                              // 갱신 — 히스토리 안 쌓음",
          },
          {
            label: "hash를 골랐다면",
            body: "id를 가진 요소와 scrollIntoView, 그리고 window.location.hash를 읽어 위치를 복원하는 effect입니다. 서버 컴포넌트는 hash를 못 보므로 클라이언트에서만 다룹니다.",
          },
          {
            label: "안 두기로 했다면",
            body: "useState입니다. 어디에 둘지는 상태 위치가 다루고, 여기서 정한 것은 'URL 도구가 필요 없다'는 것뿐입니다.",
          },
        ],
      },
      {
        heading: "5. 안티패턴",
        blocks: [
          {
            label: "식별자를 query에, 필터를 path에",
            body: "?id=123으로 상세를 열거나 /events/list/price/desc처럼 필터를 경로에 욱여넣는 것. path와 query의 역할('무엇을' 대 '어떻게')을 구분하지 않고 값 넘기기 편한 쪽에 실어서 생깁니다. '없으면 404가 맞나'로 되돌리면 됩니다.",
          },
          {
            label: "필터와 탭이 URL에 없다",
            body: "필터를 바꿨는데 주소가 그대로면 공유하거나 새로고침했을 때 초기화됩니다. 상태의 주인이 컴포넌트 메모리뿐이라 컴포넌트가 다시 만들어지는 순간 사라지는 것입니다. 살아남아야 하는 값이면 query에 반영하고 query를 읽어 그립니다.",
          },
          {
            label: "민감한 값을 URL에",
            body: "액세스 토큰이나 개인정보가 쿼리스트링에 실리는 것. URL은 브라우저 히스토리, 서버 접근 로그, 리퍼러 헤더에 평문으로 남습니다. 헤더나 바디, httpOnly 쿠키로 옮깁니다.",
          },
          {
            label: "URL과 state에 이중 보관하고 effect로 동기화",
            body: "검색어를 URL에도 두고 useState에도 복제한 뒤 effect 둘로 서로 맞추는 것. URL도 쓰고 싶고 value={query}처럼 state로 다루는 게 익숙해서 둘 다 두다가 생깁니다. 주인이 둘이라 모호하고, 두 effect가 서로를 깨워 무한 루프나 깜빡임이 납니다. 주인을 URL 하나로 정하고 URL을 직접 읽어 파생하면 동기화 코드가 사라집니다. 단, 타이핑 중 값만 로컬에 두고 확정 시 URL로 한 방향 커밋하는 것은 이중 보관이 아닙니다.",
            code: "// 이중 보관 — 서로 맞추는 effect가 둘\nconst [query, setQuery] = useState('');\nuseEffect(() => setQuery(searchParams.get('q') ?? ''), [searchParams]);\nuseEffect(() => router.push(`?q=${query}`), [query]);\n\n// 주인은 URL 하나 — 읽어서 파생, 바꿀 때만 URL 갱신\nconst query = searchParams.get('q') ?? '';\nconst onSearch = (value: string) => router.replace(`?q=${value}`);",
          },
        ],
      },
      {
        heading: "실제로 부딪힌 곳",
        blocks: [
          {
            label: "Tickle 검색 — 검색어의 주인이 셋이었다",
            body: "감사에서 빨간불이 난 자리입니다. 헤더는 엔터 때 replaceState로 URL을 바꾸고, 검색 화면은 타이핑 디바운스로 store만 바꾸고, popstate 리스너가 URL을 다시 store로 옮겼습니다. 검색 API는 URL이 아니라 store를 읽었으니 URL은 주인이 아니라 store의 복사본이었고, 새로고침이나 공유에서 복원이 반쪽만 됐습니다.",
            code: "// Header.tsx — 엔터만 URL 갱신\nwindow.history.replaceState(null, '', url.pathname + url.search);\n// SearchContent.tsx — 타이핑은 store만, URL은 그대로\nif (trimmed && trimmed !== query) setSearchValue(trimmed);\n// useSearchStore.ts — 뒤로가기면 URL을 store로\nwindow.addEventListener('popstate', () => setSearchValue(q));",
          },
          {
            label: "실수가 아니라 우회였다",
            body: "그렇게 된 이유가 있었습니다. 매 글자마다 router.push로 URL을 바꾸면 라우팅이라 트리가 다시 렌더되고, 입력창 포커스가 튕기고, 한글 조합이 끊겨 '아이유'가 '아이ㅇㅠ'로 깨졌습니다. 헤더의 주석에 그대로 적혀 있었습니다 — 'URL 라우팅 안 함, 포커스 유지, IME 분리 문제 해결'. store는 취향이 아니라 실시간 URL 갱신의 부작용을 피하려던 정당한 동기였습니다. 문제는 동기가 아니라, 그 우회로 주인이 둘이 됐다는 것입니다.",
          },
          {
            label: "고친 방법 — 입력 중과 확정을 나눴다",
            body: "뿌리는 '매 글자 라우팅'이었으므로 그것만 없앴습니다. 입력 중 값은 로컬 state에만 두고(URL을 안 건드리니 리렌더가 없어 포커스와 조합이 안전), 엔터나 디바운스로 확정될 때만 router.replace로 URL에 한 번 씁니다. 검색 실행은 useSearchParams로 URL을 읽어 파생합니다. 그러자 엔터, 공유, 새로고침, 뒤로가기가 전부 'URL 읽어 호출' 한 경로로 모였고, store 파일과 popstate 리스너와 동기화 effect 하나가 사라졌습니다. 조합 중에는 커밋을 건너뛰도록 compositionstart/end를 봅니다.",
            code: "const [inputValue, setInputValue] = useState(query);   // 입력 중 — 로컬만\nconst isComposingRef = useRef(false);\n\nuseEffect(() => {                                       // 확정 — 그때만 URL\n  const t = setTimeout(() => {\n    if (isComposingRef.current) return;\n    if (inputValue.trim()) router.replace(`?q=${inputValue.trim()}`);\n  }, 300);\n  return () => clearTimeout(t);\n}, [inputValue]);\n\nconst query = useSearchParams().get('q') ?? '';         // 읽기 — URL이 주인\nconst { data } = useSearchData(query);",
          },
          {
            label: "Tickle 상세 — 단계를 history.state에만 뒀다",
            body: "예매 단계(좌석, 권종, 결제)를 뒤로가기로 되돌리려고 pushState의 state 객체에 단계 플래그를 넣었습니다. 뒤로가기는 됐지만 새로고침이나 새 탭에서는 단계가 사라졌습니다. history.state는 그 탭의 그 항목에만 붙는 값이라 URL이 아닙니다. 단계는 '공유와 새로고침에 살아남아야 하는 값'이었으니 ?step=으로 표면화하는 것이 맞았고, 감사에서도 그렇게 판정했습니다.",
          },
          {
            label: "Tickle 상세 — /detail?id=",
            body: "상세 화면 주소가 /detail?id=123입니다. 공연 id는 없으면 페이지가 성립하지 않는 값이라 위 기준대로면 /detail/123이 맞습니다. 홈의 모달형 상세를 store로 라우팅하면서 query가 편해 그렇게 됐고, 동작에는 문제가 없어 손대지 않았습니다. 다만 '왜 그렇게 했나'를 물으면 편해서였다는 답밖에 없다는 것이 여기서 드러난 부분입니다.",
          },
          {
            label: "잘 된 자리 — 카카오 토큰은 hash로, redirect는 검증하고",
            body: "카카오 로그인 콜백은 토큰을 query가 아니라 hash로 받습니다. # 뒤는 서버 로그와 리퍼러에 남지 않기 때문입니다. 로그인 후 돌아갈 주소(?redirect=)는 startsWith('/')로 검증한 뒤에만 씁니다. //evil.com 같은 값으로 외부로 튕기는 open redirect를 막기 위해서입니다. 이 둘은 감사에서 초록불이었습니다.",
          },
        ],
      },
    ],
    sources: [
      { label: "Next.js — Dynamic Routes", href: "https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes" },
      { label: "Next.js — useSearchParams", href: "https://nextjs.org/docs/app/api-reference/functions/use-search-params" },
    ],
  },
];
