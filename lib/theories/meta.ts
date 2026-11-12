import type { Theory } from ".";

/**
 * Next.js 와 Nuxt — 두 메타 프레임워크를 같은 질문 열네 개로 나란히 읽는다.
 *
 * 문서 목차를 그대로 옮기면 둘이 따로 놀아서, '파일 라우팅 · 렌더링 모드 · 서버/클라이언트 경계 ·
 * 데이터 · 캐시 · 변경 · 서버 라우트 · 에러 · 메타데이터 · 자산 · 상태와 하이드레이션 · 설정과 배포 ·
 * 확장' 이라는 같은 질문마다 Next.js(nextjs.org/docs, App Router) 와 Nuxt(nuxt.com/docs/4.x) 의 답을
 * 한 장에 둔다. '실제로 돌려 보면' 은 create-next-app 16.4.6(Turbopack · Cache Components 기본) 과
 * nuxi init 4.6.4(Vite 8.3.8 · Nitro 2.13.5) 로 만든 scratchpad/meta-demo 의 두 앱을 빌드하고
 * `next start` · `node .output/server/index.mjs` 로 띄워 curl 한 결과다.
 */

const NEXT = "https://nextjs.org/docs/app";
const NUXT = "https://nuxt.com/docs/4.x";

export const metaTheories: Theory[] = [
  {
    id: "nn",
    name: "Next.js · Nuxt",
    tagline: "라우팅 · 렌더링 · 데이터 · 배포를 한 프레임워크가 정한 두 가지 답",
    intro:
      "React 와 Vue 는 화면을 그리는 라이브러리이고, Next.js 와 Nuxt 는 그 위에 '파일로 라우트를 정하고, 서버에서 먼저 그려 보내고, 데이터를 어디서 받고 얼마나 캐시하고, 어디에 배포하나'를 정해 둔 메타 프레임워크입니다. 둘은 같은 질문에 다른 답을 내놓습니다. Next 16 은 서버 컴포넌트(RSC)와 'use cache' 로 '무엇을 캐시할지'를 코드에 적게 하고, Nuxt 4 는 Nitro 서버와 routeRules 로 '어느 경로를 어떻게 렌더할지'를 설정에 적게 합니다. 열네 장은 그 질문들을 하나씩 두고 두 답을 나란히 놓습니다. 회사 프로젝트(commerce-web)가 Nuxt 라서 Nuxt 쪽에 실무 주석을 더 달았습니다.",
    blocks: [
      {
        label: "열네 질문",
        body: "열네 질문은 이 순서로 이어집니다. 메타 프레임워크가 하는 일 → 파일 기반 라우팅 → 렌더링 모드 → 서버와 클라이언트의 경계 → 데이터 받기 → 캐시와 재검증 → 데이터 바꾸기 → 서버 라우트와 미들웨어 → 에러 처리 → 메타데이터와 SEO → 이미지 · 폰트 · CSS → 상태와 하이드레이션 → 설정 · 빌드 · 배포 → 확장(모듈 · 레이어 · 어댑터)입니다. 앞의 넷이 '구조'입니다. 가운데 넷이 '데이터'입니다. 뒤의 여섯이 '그 밖의 전부'입니다.",
        code: "질문                   Next.js 16 의 답                     Nuxt 4 의 답\n─────────────────────  ──────────────────────────────────  ───────────────────────────────────\n라우트는 어디서        app/ 의 page.tsx · layout.tsx         app/pages/ 의 .vue · NuxtPage/NuxtLayout\n어디서 렌더하나        정적 셸 + 동적 구멍 (Cache Components)  universal SSR + routeRules\n                                                       (prerender·swr·ssr:false)\n서버/클라이언트 경계    'use client' (기본 서버)             기본 둘 다 실행 · .client/.server.vue · ClientOnly\n데이터                 async 서버 컴포넌트에서 fetch         useFetch/useAsyncData (payload 로 전달)\n캐시                   'use cache' + cacheLife/cacheTag      routeRules swr/isr · defineCachedEventHandler\n변경                   Server Actions ('use server')         server/api POST + $fetch\n서버 라우트            route.ts · proxy.ts                   server/api · server/middleware (Nitro·h3)\n배포                   next start · adapters · output export  .output (Nitro preset) · nuxt generate",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 두 앱의 빌드 출력",
        body: "create-next-app 16.4.6 은 `cacheComponents: true` 와 `partialPrefetching: true` 가 기본 next.config 입니다. `next build` 의 라우트 표는 세 기호를 씁니다. ○ Static 은 정적으로 프리렌더된 라우트입니다. ◐ Partial Prerender 는 정적 HTML + 동적 스트리밍입니다. ƒ Dynamic 은 요청마다 렌더하는 라우트입니다. 실제로 `/static` 은 ○, `/dyn/[slug]` 는 ◐, `/api/hello` 는 ƒ 였습니다. `/cached` 는 ○ 에 `1m 1h` 가 붙었습니다. cacheLife 'minutes' 의 revalidate · expire 입니다. `/posts/1` `/posts/2` 는 generateStaticParams 덕에 ○ 였습니다.\n\nNuxt 4.6.4 의 `nuxt build` 는 Vite 8.3.8 로 client 와 ssr 환경을 두 번 빌드합니다. 그다음 Nitro 가 `.output/server/index.mjs`(node-server preset)와 `.output/public` 을 만듭니다. 총 2.2MB, gzip 559kB 입니다. `nuxt generate` 는 `/` 에서 크롤해 `/static` `/spa` `/posts/1`(링크를 따라감) 과 `200.html` `404.html` 을 프리렌더했습니다.",
        code: "# Next 16.4.6\n▲ Next.js 16.4.6 (Turbopack)\n- Cache Components enabled\n- Partial Prefetching enabled\nRoute (app)\n├ ƒ /api/hello\n├ ○ /cached                   1m      1h\n├ ◐ /dashboard\n├   /dyn/[slug]\n│ └ ◐ /dyn/[slug]\n├   /posts/[id]\n│ ├ ◐ /posts/[id]\n│ ├ ○ /posts/1\n│ └ ○ /posts/2\n└ ○ /static\nƒ Proxy (Middleware)\n○ (Static) · ◐ (Partial Prerender) · ƒ (Dynamic)\n\n# Nuxt 4.6.4\nℹ vite v8.3.8 building client environment for production...\nℹ vite v8.3.8 building ssr environment for production...\n[nitro] ✔ You can preview this build using node .output/server/index.mjs\nΣ Total size: 2.2 MB (559 kB gzip)\n$ cat .output/nitro.json → preset node-server · nuxt 4.6.4 · nitro 2.13.5",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 두 프레임워크는 '결정의 위치' 가 다르다",
        body: "Next 는 결정을 코드 안에 둡니다. 이 컴포넌트는 클라이언트라고 `'use client'` 로, 이 함수는 캐시라고 `'use cache'` 로, 이 함수는 서버에서 실행한다고 `'use server'` 로 적습니다. 지시어가 경계입니다. 번들러가 그 경계로 코드를 두 쪽으로 가릅니다. Nuxt 는 결정을 설정과 관례에 둡니다. 이 경로는 프리렌더라고 routeRules 에, 이 파일은 서버 전용이라고 `.server.vue` 나 `server/` 에, 이 데이터는 payload 로 보낸다고 useFetch 에 맡깁니다. 그래서 Next 의 어려움은 '경계를 넘는 것'입니다. 직렬화, 서버 전용 모듈, Suspense 밖의 동적 데이터가 그 예입니다. Nuxt 의 어려움은 '같은 코드가 두 번 실행되는 것'입니다. SSR 에서 한 번, 하이드레이션에서 한 번 돌아서 window 접근과 공유 상태 오염이 생깁니다. 열네 장의 '문제가 나는 경우'는 대개 이 둘 중 하나입니다.",
        code: "Next.js                                       Nuxt\n코드 안의 지시어가 경계                         설정·관례가 경계\n'use client' | 'use server' | 'use cache'      routeRules · server/ · .client.vue · useFetch\n번들러가 경계로 코드를 두 쪽으로                같은 컴포넌트 코드가 서버·클라이언트 둘 다 실행\n어려움: 경계 넘기 (직렬화 · Suspense · server-only)  어려움: 두 번 실행 (window · 공유 ref · 불일치)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "1장 '메타 프레임워크가 하는 일'부터입니다. React 허브(RSC · Suspense)와 Vue 허브(SSR · 하이드레이션)가 각 프레임워크의 라이브러리 쪽 근거이고, 번들링 허브가 Nuxt 가 쓰는 Vite 와 Next 가 쓰는 Turbopack 의 자리입니다. i18n 허브의 commerce-web 진단이 Nuxt 실무의 예입니다.",
      },
    ],
    sources: [
      { label: "Next.js — App Router docs", href: NEXT },
      { label: "Nuxt — Introduction", href: `${NUXT}/getting-started/introduction` },
    ],
  },

  {
    id: "nn-s1",
    name: "1장 · 메타 프레임워크가 하는 일",
    tagline: "라이브러리가 비워 둔 네 칸 — 라우팅 · 서버 렌더 · 데이터 · 배포 — 를 채운다",
    intro:
      "React 와 Vue 는 '상태 → 화면'만 맡고 나머지는 비워 둡니다. URL 이 어느 화면인가(라우팅), 첫 HTML 을 누가 만드나(서버 렌더와 하이드레이션), 데이터를 어디서 받아 어떻게 전달하나, 어디에 어떻게 배포하나. 메타 프레임워크는 이 네 칸을 채우고, 그 대가로 '프로젝트 구조와 실행 모델'을 정합니다. Next 는 Turbopack 과 자체 서버, Nuxt 는 Vite 와 Nitro 위에 섭니다.",
    blocks: [
      {
        label: "네 칸과 두 답",
        body: "라우팅은 둘 다 파일 시스템입니다(2장).\n서버 렌더에서 Next 는 React 서버 컴포넌트를 서버에서 실행해 RSC 페이로드와 HTML 을 만듭니다. Nuxt 는 Vue 의 renderToString 으로 HTML 과 payload 를 만들고 클라이언트가 하이드레이션합니다(3 · 12장).\n데이터는 Next 가 서버 컴포넌트의 `await fetch` 로 받습니다. Nuxt 는 `useFetch` 가 서버에서 받아 payload 로 넘깁니다(5장).\n배포는 Next 가 `next start`(Node) · 어댑터 · 정적 export 입니다. Nuxt 는 Nitro 프리셋(node-server · vercel · cloudflare · static)입니다(13장).\n\n두 프레임워크는 '공식 문서의 첫 장'에서 자기를 이렇게 소개합니다. Next 는 'React 프레임워크, 라우팅 · 렌더링 · 데이터 · 번들링을 통합'입니다. Nuxt 는 'Vue 로 타입 안전하고 성능 좋은 풀스택 웹 앱을 직관적으로'입니다.",
        code: "칸         라이브러리 (React · Vue)     Next.js 16                    Nuxt 4\n────────  ───────────────────────────  ────────────────────────────  ─────────────────────────────\n라우팅     없음 (react-router · vue-router)  app/ 파일 규약                  app/pages/ 파일 규약 (vue-router)\n서버 렌더   renderToString 만             RSC + 스트리밍 + 정적 셸         renderToString + payload + 하이드레이션\n데이터     없음                          async 서버 컴포넌트 · 'use cache'  useFetch · useAsyncData · Nitro\n배포       없음                          next start · 어댑터 · export     Nitro 프리셋 · nuxt generate\n번들러     없음                          Turbopack                       Vite 8 (Rolldown)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 뼈대 둘",
        body: "`create-next-app` 은 `app/`(layout.tsx · page.tsx · globals.css) · `next.config.ts`(cacheComponents · partialPrefetching 켜짐) · `tsconfig.json` · `AGENTS.md` 를 만들었습니다. 패키지는 next 16.4.6 · react 19.3.0 입니다. `nuxi init -t minimal` 은 `app/app.vue` · `nuxt.config.ts`(compatibilityDate) · `public/` · `tsconfig.json` 을 만들었습니다. 패키지는 nuxt 4.6.4 입니다. 둘 다 '진입 HTML 파일이 없습니다'. index.html 은 프레임워크가 만듭니다. Vite 단독 프로젝트(번들링 허브)에 있던 index.html 이 사라진 것이 메타 프레임워크의 첫 표시입니다.",
        code: "# next-demo\napp/  layout.tsx  page.tsx  globals.css      # 루트 레이아웃 (html·body 필수) + 홈\nnext.config.ts   { cacheComponents: true, partialPrefetching: true }\npackage.json     next 16.4.6 · react 19.3.0\n\n# nuxt-demo\napp/  app.vue                                 # 루트 컴포넌트 (NuxtLayout/NuxtPage 를 둠)\nnuxt.config.ts   defineNuxtConfig({ compatibilityDate: '2025-07-15' })\npackage.json     nuxt ^4.6.4\n\n# 둘 다: index.html 없음 — 프레임워크가 HTML 을 만든다",
        codeLang: "text",
      },
      {
        label: "실행 모델: 한 번 실행 vs 두 번 실행",
        body: "가장 먼저 붙잡을 차이입니다. Next 의 서버 컴포넌트는 서버에서 '한 번만' 실행되고 결과(RSC 페이로드)가 클라이언트로 갑니다 — 그 코드는 브라우저 번들에 없습니다. 클라이언트 컴포넌트(`'use client'`)는 서버에서 HTML 을 위해 한 번, 브라우저에서 하이드레이션으로 또 한 번 실행됩니다. Nuxt 의 컴포넌트는 기본으로 전부 '두 번' 실행됩니다 — 서버에서 HTML, 브라우저에서 하이드레이션. 그래서 Nuxt 문서의 생명주기 장이 'onMounted 는 서버에서 돌지 않는다', '서버에는 반응성이 없다(위에서 아래로 한 번 렌더)', 'script setup 루트의 setInterval 은 누수' 를 적습니다. Nuxt 의 `.server.vue`(아일랜드)가 Next 의 서버 컴포넌트에 가깝지만 '실험적'이고, Next 의 클라이언트 컴포넌트가 Nuxt 의 기본 컴포넌트에 가깝습니다.",
        code: "Next.js\n  서버 컴포넌트 (기본)   서버 1회 → RSC 페이로드 → 브라우저 (코드 없음)\n  클라이언트 컴포넌트    서버 1회 (HTML) + 브라우저 1회 (hydrate)\nNuxt\n  컴포넌트 (기본)        서버 1회 (HTML + payload) + 브라우저 1회 (hydrate)  ← 두 번\n  .server.vue (아일랜드)  서버만 (실험적) — 격리된 Vue 앱, provide/inject·useState 공유 없음\n  .client.vue / ClientOnly  브라우저만",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 네 칸을 채운 대가는 '실행 환경이 둘' 이라는 것",
        body: "라이브러리만 쓰면 코드는 브라우저에서만 돕니다. 메타 프레임워크가 서버 렌더를 채우는 순간 코드는 Node(또는 엣지)와 브라우저 두 환경에서 돌고, 어느 코드가 어디서 도는지(경계), 두 환경 사이에 무엇이 오가는지(HTML · payload · RSC · 직렬화), 두 환경의 결과가 같은지(하이드레이션 불일치)가 전부 새 문제가 됩니다. Next 는 경계를 지시어로 명시하게 해서 '어디서'를 분명히 하고, Nuxt 는 같은 코드가 두 번 돈다는 전제 아래 `import.meta.server/client` · `ClientOnly` · `useState` 로 두 환경을 맞춥니다. 이 허브의 거의 모든 '문제가 나는 경우'가 이 두 환경 사이에서 납니다.",
      },
      {
        label: "다음 입구",
        body: "첫 칸 라우팅 — 파일 이름이 URL 이 되는 규약과, 레이아웃 · 동적 세그먼트 · 미들웨어가 둘에서 어떻게 다른가 — 가 2장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) React·Vue 가 비워 두고 메타 프레임워크가 채우는 네 칸은?\n2) Next 서버 컴포넌트와 Nuxt 기본 컴포넌트는 각각 몇 번 실행되나요?\n3) 두 프레임워크 프로젝트에 index.html 이 없는 이유는?\n4) 두 환경에서 도는 것이 만드는 세 가지 새 문제는?",
      },
    ],
    sources: [
      { label: "Next.js — Project Structure", href: `${NEXT}/getting-started/project-structure` },
      { label: "Nuxt — Nuxt Lifecycle", href: `${NUXT}/guide/concepts/nuxt-lifecycle` },
      { label: "Nuxt — Server Components", href: `${NUXT}/guide/concepts/server-components` },
    ],
  },

  {
    id: "nn-s2",
    name: "2장 · 파일 기반 라우팅",
    tagline: "폴더가 URL 이고, 특별한 파일 이름이 레이아웃 · 로딩 · 에러를 정한다",
    intro:
      "둘 다 파일 시스템이 라우트입니다. Next 에서는 `app/blog/[slug]/page.tsx` 가 `/blog/:slug` 입니다. `layout.tsx` 는 중첩 레이아웃입니다. 루트 레이아웃은 필수이고 html · body 를 포함합니다. `loading.tsx` · `error.tsx` · `not-found.tsx` 는 특수 파일입니다. `(group)` 은 URL 에 안 들어가는 묶음입니다. `page`/`route` 만 공개되고 나머지 파일은 동거할 수 있습니다. Nuxt 에서는 `app/pages/posts/[id].vue` 가 `/posts/:id` 입니다. `app.vue` 의 `<NuxtPage>` 가 페이지 자리입니다. 레이아웃은 `layouts/` 와 `<NuxtLayout>` 으로 둡니다. `definePageMeta` 로 레이아웃 · 미들웨어 · validate 를 정합니다. `[...slug].vue` 가 캐치올입니다. 라우트 미들웨어는 Vue 앱 안에서 돕니다. 서버 라우트에는 안 돌아갑니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 두 트리",
        body: "Next 프로브에는 이런 파일을 두었습니다. `app/static/page.tsx` 는 /static 입니다. `app/posts/[id]/page.tsx` 에 `generateStaticParams` 를 더했습니다. /posts/1 · /posts/2 가 ○ 로 프리렌더되고 나머지는 ◐ 입니다. `app/dyn/[slug]/page.tsx` 는 ◐, `app/api/hello/route.ts` 는 ƒ 입니다. `app/dashboard/loading.tsx`, `app/error.tsx`, `app/not-found.tsx` 도 두었습니다. 실제로 /nope 는 404 와 'custom 404' 를 돌려줬습니다. `proxy.ts` 는 루트에 있습니다. Nuxt 프로브에는 `app/pages/index.vue`(/), `posts/[id].vue`(/posts/:id), `spa.vue`, `static.vue`, `config.vue` 를 두었습니다. `app/middleware/log.ts` 를 `definePageMeta({ middleware: ['log'] })` 로 걸었습니다. 그러자 `/posts/0` 이 302 로 `/` 에 갔습니다. Next 의 `params` 는 Promise 라 `await params` 로 읽습니다. Nuxt 는 `useRoute().params` 로 읽습니다.",
        code: "# Next — app/\napp/layout.tsx              루트 레이아웃 (필수, <html><body>)\napp/page.tsx                /\napp/static/page.tsx         /static                 ○\napp/posts/[id]/page.tsx     /posts/:id              generateStaticParams → /posts/1 ○ /posts/2 ○, 그 외 ◐\napp/dyn/[slug]/page.tsx     /dyn/:slug              ◐\napp/api/hello/route.ts      /api/hello              ƒ (GET · POST)\napp/dashboard/loading.tsx   스트리밍 폴백\napp/error.tsx · not-found.tsx\nproxy.ts                    (루트) 요청 전 처리\n\n# Nuxt — app/\napp/app.vue                 <NuxtLayout><NuxtPage/></NuxtLayout>\napp/pages/index.vue         /\napp/pages/posts/[id].vue    /posts/:id   definePageMeta({ middleware: ['log'] })\napp/middleware/log.ts       defineNuxtRouteMiddleware((to) => to.params.id === '0' && navigateTo('/'))\n$ curl -o /dev/null -w '%{http_code} %{redirect_url}' localhost:4342/posts/0\n302 http://localhost:4342/",
        codeLang: "text",
      },
      {
        label: "레이아웃과 특수 파일",
        body: "Next 의 `layout.tsx` 는 폴더마다 두면 자동으로 중첩됩니다. 그리고 '내비게이션에서 다시 렌더되지 않고 상태를 유지'합니다. 특수 파일은 이렇습니다. `loading.tsx` 는 해당 세그먼트를 Suspense 로 감싸 스트리밍합니다. `error.tsx` 는 클라이언트 컴포넌트이고 error · retry props 를 받습니다. `not-found.tsx` 가 있습니다. `template.tsx` 는 매번 새 인스턴스를 만듭니다. `default.tsx` 는 병렬 라우트용입니다. Nuxt 는 `app/layouts/default.vue` 가 기본 레이아웃입니다. `definePageMeta({ layout: 'admin' })` 으로 고릅니다. 특수 파일은 `error.vue` 와 `app/middleware/*.global.ts` 입니다. 앞의 것은 app.vue 옆에 두는 전역 에러 페이지입니다. 둘 다 'URL 에 안 들어가는 묶음'이 있습니다. Next 는 `(group)` 폴더입니다. Nuxt 는 `pages/` 안의 폴더 자체가 URL 이라 묶음은 레이아웃이나 `definePageMeta` 로 만듭니다.",
        code: "Next 특수 파일            역할                                Nuxt 대응\n──────────────────────  ─────────────────────────────────  ──────────────────────────\nlayout.tsx               중첩 레이아웃 (상태 유지)              layouts/*.vue + definePageMeta({ layout })\npage.tsx                 라우트의 UI                          pages/*.vue\nloading.tsx              Suspense 폴백 (스트리밍)              <NuxtLoadingIndicator> · lazy useFetch status\nerror.tsx                에러 경계 ('use client')              error.vue · <NuxtErrorBoundary>\nnot-found.tsx            notFound()                           createError({ status: 404 }) → error.vue\nroute.ts                 HTTP 핸들러                          server/api/*.ts\n(group)/                 URL 없는 묶음                        —\nproxy.ts                 요청 전 처리                          server/middleware/*.ts (Nitro)",
        codeLang: "text",
      },
      {
        label: "동적 세그먼트 · 캐치올 · 정적 생성",
        body: "Next 의 동적 세그먼트는 `[slug]` 입니다. `[...slug]` 는 캐치올이고 `[[...slug]]` 는 선택적입니다. `generateStaticParams` 가 돌려준 params 는 빌드 때 프리렌더됩니다(○). 나머지는 요청 때 렌더됩니다(◐/ƒ). 실제로 `/posts/3` 은 빌드에 없었지만 200 으로 렌더됐습니다. `params` · `searchParams` 는 Promise 입니다. searchParams 를 읽으면 그 페이지는 동적이 됩니다. Nuxt 는 `[id].vue` 와 `[...slug].vue` 를 쓰고 `useRoute().params` 로 읽습니다. 정적 생성은 이렇게 합니다. `nuxt generate` 가 `/` 에서 링크를 크롤하거나, `routeRules: { '/posts/**': { prerender: true } }` 를 적거나, `nitro.prerender.routes` 에 적습니다. 실제로 `/posts/1` 은 index 의 `<NuxtLink to=\"/posts/1\">` 를 따라 프리렌더됐습니다. 문서는 이렇게 주의를 줍니다. '크롤된 페이지에서 링크되지 않은 페이지는 routes 에 적지 않으면 생성되지 않는다'.",
        code: "// Next\nexport async function generateStaticParams() { return [{ id: \"1\" }, { id: \"2\" }]; }\nexport default async function Post({ params }: { params: Promise<{ id: string }> }) { const { id } = await\n  params; … }\n// → /posts/1 ○  /posts/2 ○  /posts/3 ◐ (요청 때 200)\n\n// Nuxt\nconst route = useRoute(); route.params.id\n// nuxt generate: / 에서 크롤 → /posts/1 (링크 있음) 생성, /posts/2 (링크 없음) 미생성\n// nuxt.config: routeRules: { '/posts/**': { prerender: true } } 또는 nitro: { prerender: { routes:\n  ['/posts/2'] } }",
      },
      {
        label: "내비게이션: Link 와 프리페치",
        body: "Next 의 `<Link>` 는 뷰포트에 들어오거나 호버하면 프리페치합니다. 정적 라우트는 전체를 프리페치합니다. 동적 라우트는 `loading.tsx` 가 있으면 그 폴백까지 프리페치합니다. Partial Prefetching 이 16 의 기본입니다. `prefetch={false}` 로 끕니다. `useLinkStatus()` 로 느린 네트워크에서 피드백을 보입니다. 문서는 '<Link> 는 하이드레이션 뒤에야 프리페치한다 — 큰 번들은 그것을 늦춘다'라고 적습니다. Nuxt 의 `<NuxtLink>` 도 뷰포트 진입 때 컴포넌트와 payload 를 프리페치합니다. 그리고 `<a>` 로 렌더됩니다. 서버 리다이렉트는 둘 다 `Location` 헤더입니다. 그래서 상태가 초기화됩니다. Nuxt 문서는 쿠키에 두지 않으면 사라진다고 적습니다.",
        code: "// Next\n<Link href=\"/posts/1\">post 1</Link>            // 뷰포트/호버 프리페치 · 정적은 전체, 동적은 loading 까지\n<Link href=\"/big\" prefetch={false}>…</Link>    // 끄기\n\n// Nuxt\n<NuxtLink to=\"/posts/1\">post 1</NuxtLink>       // 뷰포트 진입 때 컴포넌트 + payload 프리페치\nnavigateTo('/login')                            // 미들웨어·코드에서 이동 (서버는 Location 헤더)",
      },
      {
        label: "문제가 나는 경우: 라우팅에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                   Next 원인/처방                      Nuxt 원인/처방\n────────────────────────────────────  ─────────────────────────────────  ─────────────────────────────────\nparams.id 가 undefined / Promise        16 은 params 가 Promise → await params  route.params (동기) — 없으면\n                                                                              파일 이름 확인\n레이아웃이 매번 다시 마운트된다           template.tsx 를 썼거나 key 변경       NuxtLayout 의 key ·\n                                                                     definePageMeta key\n정적 생성이 안 된 페이지                generateStaticParams 누락 → 요청 때 렌더  링크 없어 크롤 못 함 →\n                                                                         prerender.routes\n미들웨어가 /api 에 안 돈다               proxy.ts matcher                   라우트 미들웨어는 Vue 앱용 →\n                                                                       server/middleware\n404 가 기본 화면이다                     not-found.tsx 없음                  error.vue 없음\nURL 에 묶음 폴더 이름이 들어간다          (group) 괄호 없음                  pages/ 는 전부 URL — 레이아웃으로 묶기\n동적 라우트 전환이 느리다                loading.tsx 없음 → 프리페치 생략       lazy useFetch + status 로 로딩 표시",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 파일 트리가 '라우트 트리' 이자 '렌더 트리의 뼈대' 다",
        body: "폴더 구조가 URL 을 정하는 동시에 레이아웃 중첩(어느 컴포넌트가 어느 컴포넌트를 감싸나)도 정합니다 — Next 는 폴더마다 layout 이 겹치고, Nuxt 는 `app.vue > NuxtLayout > NuxtPage` 로 깊이가 고정됩니다. 그래서 Next 는 '세그먼트마다 다른 로딩 · 에러 경계'가 자연스럽고(파일 하나 더), Nuxt 는 페이지 단위가 기본이고 더 잘게는 컴포넌트 안에서 Suspense · NuxtErrorBoundary 로 합니다. 라우트가 '빌드 시점에 아는 트리'이기 때문에 두 프레임워크 모두 프리렌더 · 코드 분할 · 프리페치를 라우트 단위로 자동으로 할 수 있습니다 — 번들링 허브의 '라우트 단위 분할은 프레임워크가'가 이 자리입니다.",
      },
      {
        label: "다음 입구",
        body: "같은 라우트 트리를 '어디서 얼마나 미리 그릴까' — 정적 · 동적 · 부분 프리렌더 · SWR · ISR · SPA — 가 3장 렌더링 모드입니다. 빌드 표의 ○ ◐ ƒ 와 routeRules 가 그 답입니다.",
      },
      {
        label: "확인 질문",
        body: "1) Next 에서 URL 에 안 들어가는 폴더와 Nuxt 의 대응은?\n2) `/posts/3` 이 빌드에 없는데 200 인 이유는?\n3) Nuxt 라우트 미들웨어가 `/api/*` 에 안 도는 이유와 대신 쓰는 것은?\n4) `nuxt generate` 가 `/posts/2` 를 만들지 않은 이유는?",
      },
    ],
    sources: [
      { label: "Next.js — Layouts and Pages", href: `${NEXT}/getting-started/layouts-and-pages` },
      { label: "Next.js — Linking and Navigating", href: `${NEXT}/getting-started/linking-and-navigating` },
      { label: "Nuxt — Routing", href: `${NUXT}/getting-started/routing` },
      { label: "Nuxt — Prerendering", href: `${NUXT}/getting-started/prerendering` },
    ],
  },

  {
    id: "nn-s3",
    name: "3장 · 렌더링 모드",
    tagline: "○ ◐ ƒ 와 routeRules — 언제 HTML 을 만들고 얼마나 다시 쓰는가",
    intro:
      "HTML 을 빌드 때 만들면 정적(SSG), 요청마다 만들면 동적(SSR), 만든 것을 일정 시간 쓰다 다시 만들면 ISR/SWR, 브라우저가 만들면 SPA(CSR). Next 16 은 Cache Components 로 한 페이지를 '정적 셸 + 동적 구멍'으로 가르는 부분 프리렌더링(◐)이 기본이고, `'use cache'` 와 Suspense 가 그 경계입니다. Nuxt 는 기본이 universal(SSR + 하이드레이션)이고 `routeRules` 로 경로마다 `prerender` · `swr` · `isr` · `ssr: false` · `redirect` · `proxy` 를 섞는 하이브리드입니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: Next 의 세 기호와 헤더",
        body: "`/static` 은 아무 동적 API 가 없어 ○ 입니다. 응답 헤더는 `x-nextjs-prerender: 1` · `x-nextjs-cache: HIT` · `Cache-Control: s-maxage=31536000` 입니다. `/dyn/[slug]` 는 headers() 를 Suspense 안에서 읽어 ◐ 입니다. 헤더는 `x-nextjs-postponed: 1` · `x-nextjs-prerender: 1` · `Cache-Control: private, no-cache, no-store` 입니다. 정적 셸은 프리렌더되고 구멍은 '연기(postponed)'되어 요청 때 스트리밍됩니다. 실제로 본문의 첫 h1 은 폴백 `dyn …` 입니다. 그 뒤에 실제 내용이 이어 옵니다. `/api/hello` 는 ƒ 입니다. `/dashboard` 는 Suspense 안에 300ms 지연 컴포넌트가 있어 ◐ 입니다. 스트리밍 응답을 2초 안에 끊어 받으니 `loading…`(Suspense 폴백)과 `route loading`(loading.tsx)만 보였습니다. `slow part loaded` 는 뒤에 옵니다.",
        code: "$ curl -sI localhost:4341/static | grep -i nextjs\nx-nextjs-cache: HIT\nx-nextjs-prerender: 1\nCache-Control: s-maxage=31536000                 # ○ 정적\n\n$ curl -sI localhost:4341/dyn/x | grep -iE 'postponed|prerender|cache-control'\nx-nextjs-postponed: 1                            # ◐ 동적 구멍이 연기됨\nx-nextjs-prerender: 1                            #    정적 셸은 프리렌더\nCache-Control: private, no-cache, no-store, max-age=0, must-revalidate\n$ curl -s localhost:4341/dyn/x | grep -o '<h1>[^<]*' | head -2\n<h1>dyn …                                        # 폴백이 먼저\n<h1>dyn                                          # 실제 내용이 스트리밍으로\n\n$ curl -sN --max-time 3 localhost:4341/dashboard | grep -o 'loading…\\|route loading'\nloading…  route loading                          # 폴백들 — slow part 는 뒤에",
        codeLang: "bash",
      },
      {
        label: "Next: 정적 셸과 동적 구멍, 그리고 빌드가 막는 것",
        body: "Cache Components 의 규칙은 이렇습니다. 요청 시점 데이터(`cookies()` · `headers()` · `searchParams` · `params` · 캐시 안 된 `fetch` · `connection()`)를 읽는 자리는 `<Suspense>` 안에 있어야 합니다. 그래야 그 밖은 정적 셸로 프리렌더되고 안은 구멍이 됩니다. 어기면 빌드가 멈춥니다. 실제로 `params` 를 Suspense 밖에서 await 한 페이지가 `Error occurred prerendering page \"/dyn/[slug]\"` 와 'blocking-prerender-dynamic' 로 실패했습니다. 에러 문구가 세 처방을 적어 줍니다.\n[stream] Suspense 로 감쌉니다.\n[cache] `\"use cache\"` 로 캐시합니다.\n[block] `export const instant = false` 로 블로킹 라우트를 허용합니다.\n옛 `export const dynamic = 'force-dynamic'` 은 'cacheComponents 와 호환되지 않는다'로 역시 빌드 에러가 났습니다(실제로). 문서는 'Partial Prerendering(PPR)이 Cache Components 의 기본'이라고 적습니다.",
        code: "// 실제 빌드 에러 (params 를 Suspense 밖에서 읽음)\nError: `fetch(...)`, `cookies()`, `headers()`, `params`, `searchParams`, or `connection()` accessed\n  outside of `<Suspense>`\nprevents the route from being prerendered, blocking the page load and leading to a slower user experience.\nWays to fix this:\n  - [stream] Provide a placeholder with `<Suspense fallback={...}>` around the data access\n  - [cache] For uncached data (`fetch`, database calls): cache the access with `\"use cache\"` (does not\n    apply to `connection()`)\n  - [block] Set `export const instant = false` to allow a blocking route\nError occurred prerendering page \"/dyn/[slug]\".\n\n// 옛 세그먼트 설정도 막힌다\nexport const dynamic = \"force-dynamic\";\n// Error: Route segment config \"dynamic\" is not compatible with `nextConfig.cacheComponents`. Please\n  remove it.\n\n// 처방 — 구멍을 Suspense 로\nexport default function Dyn({ params }) {\n  return <Suspense fallback={<h1>dyn …</h1>}><Body params={params} /></Suspense>;   // ◐\n}",
      },
      {
        label: "실제로 돌려 보면: Nuxt 의 routeRules",
        body: "`routeRules: { '/spa': { ssr: false }, '/static': { prerender: true }, '/posts/**': { swr: 60 } }` 로 두었습니다. `/`(기본 universal)의 응답에는 `data-ssr=\"true\"` 가 붙은 `<script type=\"application/json\" id=\"__NUXT_DATA__\">` payload 와 서버에서 그린 `<h1>home world</h1>` 이 있었습니다. `/spa`(ssr: false)는 `<div id=\"__nuxt\"></div>` 빈 껍데기만 왔습니다. 클라이언트가 그립니다. `/posts/1`(swr: 60)은 `cache-control: s-maxage=60, stale-while-revalidate` 헤더가 붙었습니다. `/static`(prerender)은 `nuxt generate` 때 `.output/public/static/index.html` 로 나왔습니다. 문서의 주의는 셋입니다.\n'Hybrid Rendering 은 nuxt generate 에서는 불가'입니다.\n'routeRules 는 보안 수단이 아니다'입니다. redirect · proxy 가 서버 미들웨어보다 먼저 돕니다.\n'ssr: false 면 app/spa-loading-template.html 을 두라'입니다.",
        code: "// nuxt.config.ts\nrouteRules: {\n  '/spa':   { ssr: false },      // SPA — 서버는 빈 껍데기\n  '/static':  { prerender: true },  // 빌드 때 HTML\n  '/posts/**':  { swr: 60 },         // 60초 캐시 + stale-while-revalidate\n  // '/blog/**': { isr: 3600 }  '/admin/**': { ssr: false }  '/old': { redirect: '/new' }  '/api/**': {\n                                                             cors: true }\n}\n\n$ curl -s localhost:4342/ | grep -o '__NUXT_DATA__\\|<h1>[^<]*</h1>\\|data-ssr=\"[a-z]*\"'\n<h1>home world</h1>  data-ssr=\"true\"  __NUXT_DATA__        # universal: HTML + payload\n$ curl -s localhost:4342/spa | grep -o '<div id=\"__nuxt\">[^<]*</div>'\n<div id=\"__nuxt\"></div>                                    # ssr:false: 빈 껍데기\n$ curl -sI localhost:4342/posts/1 | grep -i cache\ncache-control: s-maxage=60, stale-while-revalidate          # swr",
        codeLang: "bash",
      },
      {
        label: "모드 비교표",
        body: "같은 다섯 모드를 두 프레임워크에서 어떻게 켜는지입니다.",
        code: "모드        Next.js 16                          Nuxt 4\n─────────  ─────────────────────────────────  ──────────────────────────────────────\n정적 (빌드 때)  동적 API 없음 → ○ 자동 · generateStaticParams  routeRules prerender · nuxt generate ·\n                                                         nitro.prerender\n부분 정적 + 동적 구멍  Suspense 밖은 셸, 안은 구멍 → ◐ (기본)  (없음 — 페이지 단위) · 아일랜드/lazy useFetch 로 흉내\n동적 (요청마다)  'use cache' 없는 데이터 (Suspense 안) · route.ts ƒ  기본 universal SSR\n시간 기반 재생성  'use cache' + cacheLife (stale/revalidate/expire)  routeRules swr: N · isr: N (CDN) ·\n                                                                 defineCachedEventHandler\nSPA / CSR   'use client' 컴포넌트 안의 fetch (useEffect/SWR)  routeRules ssr: false · 전역 ssr: false\n전부 정적 export  output: 'export' (서버 기능 불가)        nuxt generate (서버 엔드포인트 불가)",
        codeLang: "text",
        terms: [
          {
            term: "SWR 과 ISR",
            body: "stale-while-revalidate 는 캐시가 만료돼도 옛 응답을 즉시 주고 뒤에서 다시 만드는 방식입니다. Nuxt 의 `swr: 60` 은 그 헤더를 내고 Nitro 가 캐시합니다. `isr` 은 CDN(Vercel · Netlify)에 '다음 배포까지' 보관합니다. Next 는 `cacheLife` 의 stale(클라이언트) · revalidate(서버) · expire 세 시간으로 같은 일을 합니다. `revalidateTag('x', 'max')` 가 SWR 식 재검증입니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우: 렌더링 모드에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                     Next                                  Nuxt\n──────────────────────────────────────  ───────────────────────────────────\n빌드가 'accessed outside of <Suspense>' 로 멈춤  동적 API 를 셸에서 → Suspense/use cache/instant=false  —\n'dynamic is not compatible with cacheComponents'  옛 세그먼트 설정 → 제거                 —\n전부 요청마다 렌더된다 (느림)                Suspense 없이 동적 API → 전부 구멍        routeRules 없이 universal →\n                                                                            swr/prerender 추가\n정적 페이지의 데이터가 안 바뀐다             cacheLife/revalidateTag 없음              prerender 는 다음 빌드까지\n                                                                              · swr 로\nSPA 페이지 첫 화면이 하얗다                  —                                     ssr:false →\n                                                                             spa-loading-template.html\nnuxt generate 뒤 API 가 404                —                                     generate 는 서버 없음 →\n                                                                                nuxt build + prerender\n리다이렉트 라우트가 인증을 우회한다          proxy.ts 에서 처리                       routeRules redirect/proxy 는\n                                                                           미들웨어보다 먼저 — 보안 수단 아님",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Next 는 '컴포넌트 단위', Nuxt 는 '경로 단위' 로 모드를 정한다",
        body: "같은 '정적 + 동적' 을 두 프레임워크가 다르게 가릅니다. Next 는 한 페이지 안에서 Suspense 경계로 가릅니다. 셸은 빌드 때, 구멍은 요청 때 만듭니다. 그래서 ◐ 가 기본입니다. Nuxt 는 경로마다 routeRules 로 가릅니다. 이 경로는 prerender, 저 경로는 swr 식입니다. Next 방식은 세밀합니다. 대신 '어디가 동적인가'를 코드가 전부 선언해야 하고 빌드가 그것을 강제합니다. Nuxt 방식은 단순합니다. 대신 페이지 안의 한 부분만 동적으로 하려면 클라이언트 fetch(lazy useFetch)나 아일랜드로 내려야 합니다. 어느 쪽이든 질문은 같습니다. '이 HTML 의 어느 부분이 누구에게나 같고(캐시 가능), 어느 부분이 요청마다 다른가'입니다.",
        code: "Next (컴포넌트 단위)                          Nuxt (경로 단위)\n<Page>  ← 정적 셸 (빌드 때, ○)                 '/'          universal (요청마다)\n  <Suspense>                                  '/static'    prerender (빌드 때)\n    <UserGreeting/>  ← 구멍 (요청 때)  → ◐      '/posts/**'  swr: 60 (캐시 + 재생성)\n  </Suspense>                                 '/spa'       ssr: false (브라우저)\n</Page>                                        페이지 안 일부만 동적 → lazy useFetch (클라이언트) / 아일랜드",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "◐ 의 '구멍'과 Nuxt 의 '두 번 실행'이 만나는 자리 — 어느 코드가 서버에서, 어느 코드가 브라우저에서 도는가 — 가 4장 서버와 클라이언트의 경계입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `x-nextjs-postponed: 1` 이 뜻하는 것은?\n2) Next 빌드가 'accessed outside of <Suspense>' 로 멈출 때의 세 처방은?\n3) Nuxt 에서 `/posts/**` 를 60초 캐시 + 재검증으로 만드는 한 줄은?\n4) `nuxt generate` 에서 Hybrid Rendering 이 불가한 이유는?",
      },
    ],
    sources: [
      { label: "Next.js — Caching (Cache Components)", href: `${NEXT}/getting-started/caching` },
      { label: "Next.js — Partial Prerendering", href: `${NEXT}/getting-started/partial-prerendering` },
      { label: "Nuxt — Rendering Modes", href: `${NUXT}/guide/concepts/rendering` },
    ],
  },

  {
    id: "nn-s4",
    name: "4장 · 서버와 클라이언트의 경계",
    tagline: "'use client' 가 번들을 가르고, Nuxt 는 같은 코드를 두 번 돌린다",
    intro:
      "Next 의 컴포넌트는 기본이 서버 컴포넌트 — 서버에서만 실행되고 코드가 브라우저에 가지 않습니다. 파일 맨 위의 `'use client'` 가 경계를 선언하면 그 파일과 그것이 import 하는 것들이 클라이언트 번들에 들어가고, 서버 컴포넌트를 `children` 으로 끼워 넣을 수 있습니다(인터리빙). 넘기는 props 는 직렬화 가능해야 합니다. Nuxt 는 기본으로 모든 컴포넌트가 서버(HTML)와 브라우저(하이드레이션) 둘 다에서 돕니다 — `import.meta.server/client`, `.client.vue` · `.server.vue`, `<ClientOnly>` 가 한쪽만 고르는 도구입니다.",
    blocks: [
      {
        label: "Next: 경계는 파일이고 방향은 한쪽이다",
        body: "문서의 규칙은 이렇습니다. `'use client'` 는 import 들 위, 파일 맨 위에 적습니다. 그 파일의 import 와 거기서 직접 렌더하는 컴포넌트가 클라이언트 번들로 들어갑니다. 서버 컴포넌트를 클라이언트 컴포넌트가 import 하면 그것도 클라이언트가 됩니다. 대신 `children` 이나 props 로 '끼워 넣으면' 서버에 남습니다. `<Modal><Cart/></Modal>` 이 그 모양입니다. 클라이언트 컴포넌트는 서버에서도 HTML 을 위해 한 번 렌더됩니다. 그래서 `window` 를 최상위에서 읽으면 서버에서 터집니다.\n\n서버 컴포넌트에서 쓸 수 있는 것은 async/await · 비밀 · DB 직접 접근 · 큰 의존성(클라이언트에 안 감)입니다. 클라이언트에서만 쓸 수 있는 것은 state · 이벤트 · effect · 브라우저 API · 컨텍스트입니다. 'React context 는 서버 컴포넌트에서 지원되지 않음'이라서 provider 를 클라이언트 컴포넌트로 만들어 children 을 받습니다. 빌드 결과의 `page_client-reference-manifest.js` 가 '어느 클라이언트 컴포넌트가 어느 청크인가'의 지도입니다. 실제로 .next/server/app 에 있었습니다.",
        code: "// app/components/Modal.tsx\n'use client'                                  // 이 파일 + import 가 클라이언트 번들\nexport function Modal({ children }) { const [open, setOpen] = useState(false); return open ?\n  <div>{children}</div> : <button onClick={() => setOpen(true)}>open</button>; }\n\n// app/page.tsx (서버 컴포넌트, 기본)\nimport { Modal } from './components/Modal'\nimport { Cart } from './components/Cart'     // 서버 컴포넌트 — DB 접근 가능\n// Cart 는 서버에 남는다 (children 으로 끼움)\nexport default function Page() { return <Modal><Cart /></Modal>; }\n\n// ✗ Modal.tsx 가 import { Cart } 하면 Cart 도 클라이언트가 된다 (DB 코드가 번들에!)\n// 빌드 결과\n.next/server/app/page_client-reference-manifest.js    // 클라이언트 참조 지도",
        terms: [
          {
            term: "직렬화 가능한 props",
            body: "서버 → 클라이언트 경계를 넘는 값은 RSC 페이로드에 적힐 수 있어야 합니다. 원시값 · 배열 · 객체 · Date · Map · Set · Promise · JSX 가 넘어갑니다. 함수(Server Action 제외) · 클래스 인스턴스 · Symbol 은 못 넘깁니다. 문서는 'Props passed to Client Components need to be serializable by React.'라고 적습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: Nuxt 는 같은 코드가 두 번 돈다",
        body: "`app/pages/spa.vue` 에 `const t = ref(import.meta.client ? 'client' : 'server')` 를 두고 `<ClientOnly>` 안에 렌더했습니다. `/spa` 는 routeRules 로 ssr: false 입니다. 그래서 서버가 빈 껍데기만 보내고 브라우저가 'client' 를 그립니다. universal 페이지에서 같은 코드를 쓰면 서버 HTML 은 'server' 입니다. 하이드레이션 뒤 'client' 로 바뀌면서 불일치 경고가 납니다. Vue 허브의 'Hydration text content mismatch' 입니다. 그래서 Nuxt 의 도구들은 전부 '어느 쪽에서만'을 고르는 것입니다.\n`<ClientOnly>` 는 서버에서는 `#fallback` 슬롯을 그립니다.\n`.client.vue` 접미사는 클라이언트만입니다. 서버에선 자리만 둡니다.\n`.server.vue` 는 아일랜드입니다. 서버만 돌고 실험적입니다.\n`import.meta.server/client` 로 코드를 분기합니다.\n브라우저 API 는 `onMounted` 안에서 부릅니다.\n\n문서의 생명주기는 이렇습니다. 서버는 Nitro 플러그인 → 서버 미들웨어 → 앱 플러그인 → validate → 라우트 미들웨어 → 렌더 → HTML 입니다. 클라이언트는 플러그인 → validate → 미들웨어 → mount + hydrate → onMounted 입니다.",
        code: "<script setup lang=\"ts\">\n// 서버에서 'server', 브라우저에서 'client' — 둘 다 실행된다\nconst t = ref(import.meta.client ? 'client' : 'server')\n</script>\n<template>\n  <ClientOnly>                       <!-- 서버 HTML 에는 fallback 만 → 불일치 없음 -->\n    <p>rendered on {{ t }}</p>\n    <template #fallback><p>…</p></template>\n  </ClientOnly>\n</template>\n\n도구                  서버               브라우저          쓰는 곳\n────────────────────  ────────────────  ───────────────  ───────────────────────────\n기본 .vue              렌더               hydrate           보통 컴포넌트\n<ClientOnly>           fallback 만        렌더               window · 차트 · 날짜·랜덤\nX.client.vue           자리만             렌더               같은 뜻, 컴포넌트 단위\nX.server.vue           렌더 (아일랜드)     (코드 없음)         무거운 비대화형 콘텐츠 (실험적)\nimport.meta.server/client  분기           분기               플러그인 · 유틸\nonMounted              안 돎              돎                 DOM · 타이머 · 구독",
      },
      {
        label: "서버 전용 코드 보호: server-only 와 서버 디렉터리",
        body: "Next 는 서버 전용 모듈(DB 클라이언트, 비밀 키)에 `import 'server-only'` 를 넣습니다. 그러면 클라이언트 컴포넌트가 import 할 때 빌드 에러가 납니다. 환경 변수는 `NEXT_PUBLIC_` 접두어만 클라이언트 번들에 들어갑니다. 나머지는 빈 문자열입니다. 번들링 허브의 VITE_ 와 같은 설계입니다. Nuxt 의 `server/` 디렉터리는 Nitro 전용이라 브라우저 번들에 들어갈 길이 없습니다. `runtimeConfig` 의 비공개 키는 클라이언트 `useRuntimeConfig()` 에 없습니다. 단 실제로 `config.secret` 을 템플릿에 찍으면 SSR HTML 에 그대로 들어갔습니다(`secret=overridden`). '클라이언트 번들에 없다'와 'HTML 에 안 찍힌다'는 다른 일입니다. 비밀은 서버 라우트 안에서만 쓰는 것이 규칙입니다.",
        code: "// Next — lib/db.ts\nimport 'server-only'                        // 클라이언트 컴포넌트가 import 하면 빌드 에러\nexport const db = createClient(process.env.DATABASE_URL)   // NEXT_PUBLIC_ 아님 → 클라이언트엔 빈 문자열\n\n// Nuxt — nuxt.config.ts\nruntimeConfig: { secret: 'server-only', public: { apiBase: '/api' } }\n// 클라이언트 useRuntimeConfig(): { public: { apiBase } }  — secret 없음\n// 하지만 SSR 템플릿에 {{ config.secret }} 을 찍으면 HTML 에 들어간다 (실제로 'secret=overridden')\n// → 비밀은 server/api 안에서만",
      },
      {
        label: "문제가 나는 경우: 경계에서",
        body: "두 프레임워크에서 가장 자주 보는 에러 묶음입니다.",
        code: "증상                                          Next                                   Nuxt\n───────────────────────────────────────────  ────────────────────────────────────\n'window is not defined' / 'document is not defined'  클라이언트 컴포넌트도 서버에서 1회 렌더 → useEffect 안으로\n                                                     서버에서도 실행 → onMounted · import.meta.client ·\n                                                     ClientOnly\n'useState only works in Client Components'     서버 컴포넌트에 훅 → 'use client' 파일로 분리  —\n'Functions cannot be passed directly to Client Components'  직렬화 불가 props → Server Action 또는 클라이언트\n                                                            안에서 정의  —\nHydration mismatch 경고                        서버/클라 출력 다름 (Date.now · random)     같음 → ClientOnly ·\n                                              useId · 서버 값 payload 로\nDB 코드가 클라이언트 번들에                      클라이언트 파일이 서버 모듈 import → server-only · children  server/\n                                           로 옮기기\n비밀이 노출됐다                                  NEXT_PUBLIC_ 붙임 · 클라이언트에 props 로 넘김\n                                             runtimeConfig.public · 템플릿에 찍음\n'Nuxt instance is unavailable'                  —                                     컴포저블을 setup\n                                                밖(await 뒤 · 모듈 최상위)에서 호출\n컨텍스트 Provider 가 서버 컴포넌트에서 안 됨       provider 를 'use client' 로, children 받기     provide/inject 는\n                                           그대로 (둘 다 실행)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 경계는 '코드가 가는 곳' 과 '데이터가 가는 곳' 둘을 정한다",
        body: "서버/클라이언트 경계에서 오가는 것은 둘입니다. 코드는 어느 모듈이 어느 번들에 가는가입니다. 데이터는 어느 값이 HTML · payload · RSC 페이로드에 가는가입니다. Next 의 `'use client'` 는 코드의 경계이고 props 직렬화가 데이터의 경계입니다. Nuxt 는 코드 경계가 느슨합니다. 기본은 둘 다입니다. 대신 데이터 경계가 명확합니다. useFetch 의 payload(5장) 와 useState(12장)가 서버 값을 브라우저로 넘기는 유일한 공식 통로입니다. 둘 모두에서 '비밀'은 코드 경계와 데이터 경계를 둘 다 넘지 않아야 합니다. '브라우저 API'는 코드 경계의 클라이언트 쪽에서만 불러야 합니다. 이 둘을 분리해 보면 위 표의 에러가 전부 어느 경계를 잘못 넘었는지로 분류됩니다.",
      },
      {
        label: "다음 입구",
        body: "데이터 경계의 본론 — 서버에서 받은 데이터를 어떻게 브라우저로 넘기고 두 번 받지 않게 하나 — 가 5장 데이터 받기입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `'use client'` 파일이 서버 컴포넌트를 import 하면 어떻게 되고, 서버에 남기는 방법은?\n2) Nuxt 컴포넌트가 `window` 를 setup 에서 읽으면 왜 터지고 세 가지 처방은?\n3) Nuxt 비공개 runtimeConfig 가 HTML 에 들어갈 수 있는 경우는?\n4) 'Nuxt instance is unavailable' 이 뜨는 호출 위치는?",
      },
    ],
    sources: [
      { label: "Next.js — Server and Client Components", href: `${NEXT}/getting-started/server-and-client-components` },
      { label: "Nuxt — Nuxt Lifecycle", href: `${NUXT}/guide/concepts/nuxt-lifecycle` },
      { label: "Nuxt — <ClientOnly>", href: `${NUXT}/api/components/client-only` },
    ],
  },

  {
    id: "nn-s5",
    name: "5장 · 데이터 받기",
    tagline: "서버에서 한 번 받고, 결과를 브라우저에 넘겨 두 번 받지 않는다",
    intro:
      "Next 는 서버 컴포넌트를 `async` 로 만들어 `await fetch()` 또는 ORM 을 직접 부릅니다. 같은 fetch 는 한 렌더 안에서 메모이즈됩니다(중복 제거). 캐시는 기본으로 안 됩니다('fetch 요청은 기본으로 캐시되지 않고 페이지 렌더를 막는다'). 느린 부분은 `loading.tsx` 나 `<Suspense>` 로 스트리밍합니다. 병렬은 `Promise.all` 로 합니다. 클라이언트는 `use()` 훅이나 SWR 을 씁니다. Nuxt 는 `useFetch`/`useAsyncData` 를 setup 에서 호출합니다. 그러면 서버에서 받아 payload 에 담아 브라우저로 넘기고 하이드레이션 때 다시 받지 않습니다. `$fetch` 는 그 메커니즘이 없어 이벤트 핸들러용입니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: Nuxt 의 payload 에 데이터가 실려 온다",
        body: "`index.vue` 의 `const { data } = await useFetch('/api/hello')` — 서버가 `/api/hello` 핸들러를 '네트워크 없이 직접' 불러(Nitro 문서: `$fetch` 가 서버에서는 핸들러 함수를 바로 호출해 'API 호출을 아낀다') `{ hello: 'world' }` 를 받고, HTML 에 `<h1>home world</h1>` 와 `__NUXT_DATA__` payload 를 함께 보냅니다. payload 안을 보면 `{\"data\":2,\"state\":7,…}` 와 `{\"$favuujuj986j5\":4}` — `$f` 접두어 + 해시가 useFetch 의 자동 키이고 그 값이 응답입니다. 브라우저는 하이드레이션 때 이 payload 를 읽어 `data` 를 채우고 fetch 를 다시 하지 않습니다. 문서의 상태 — `status` 는 idle · pending · success · error, `refresh`/`execute` 로 다시, `clear` 로 비움.",
        code: "<script setup lang=\"ts\">\nconst { data, status, error, refresh } = await useFetch('/api/hello')   // 서버: 핸들러 직접 호출 → payload\n</script>\n\n$ curl -s localhost:4342/ | grep -o '<h1>[^<]*</h1>'\n<h1>home world</h1>                                      # 서버가 데이터로 그렸다\n$ curl -s localhost:4342/ | grep -o 'id=\"__NUXT_DATA__\">[^<]\\{0,120\\}'\nid=\"__NUXT_DATA__\">[[\"ShallowReactive\",1],{\"data\":2,\"state\":7,\"once\":10,\"_errors\":11,\"serverRendered\":13,\"path\":14},[\"ShallowReactive\",3],{\"$favuujuj986j5\":4},{\"hello\":5,\"method\":\n#                                                              ↑ useFetch 의 자동 키     ↑ 응답 — 브라우저는 다시\n  안 받는다",
        codeLang: "bash",
        terms: [
          {
            term: "payload (Nuxt)",
            body: "서버가 렌더하며 모은 상태(useFetch/useAsyncData 의 data, useState, 에러)를 devalue 로 직렬화해 `<script id=\"__NUXT_DATA__\">` 에 넣은 것. 하이드레이션 때 복원되어 '서버에서 받은 데이터'가 브라우저의 초기값이 됩니다. `pick`/`transform` 으로 크기를 줄이고, DevTools 의 Payload 탭에서 봅니다. 프리렌더 때는 `_payload.json` 으로 따로 떨어져 클라이언트 내비게이션이 그것만 받습니다.",
          },
        ],
      },
      {
        label: "Nuxt: useFetch · useAsyncData · $fetch 의 자리",
        body: "`$fetch`(ofetch) 는 그냥 요청입니다. payload 전달 · 중복 제거 · 내비게이션 대기가 '모두 없음'입니다. setup 에서 쓰면 서버와 브라우저에서 두 번 요청합니다(문서의 경고). `useAsyncData(key, handler)` 가 그 셋을 더한 래퍼입니다. `useFetch(url)` 은 `useAsyncData(url, () => $fetch(url))` 의 '거의 동등'한 단축입니다. 키는 useFetch 가 URL · 옵션 · 호출 위치에서 자동으로 만들고, useAsyncData 는 첫 인자로 받습니다. 같은 키를 쓰는 곳은 handler · deep · transform · pick · getCachedData · default 가 일치해야 합니다. server · lazy · immediate · dedupe · watch 는 달라도 됩니다.\n\n옵션은 이렇습니다.\n`lazy: true` 는 내비게이션을 막지 않습니다. status 로 로딩을 표시합니다. `await` 하면 클라이언트 내비게이션에서 즉시 resolve 됩니다.\n`server: false` 는 브라우저만입니다.\n`immediate: false` 와 `execute` 는 사용자 트리거용입니다.\n`watch` 는 반응형 소스가 바뀌면 재요청합니다. 반응형 옵션은 기본으로 감시합니다.\n`transform`/`pick` 은 payload 를 줄입니다. 요청 자체는 그대로입니다.\n`getCachedData` 는 캐시에서 먼저 봅니다.\n`dedupe` 가 있습니다.\n부수 효과는 `callOnce` 로 합니다.",
        code: "// 서버 데이터 — setup 에서\nconst { data: post } = await useAsyncData(`post-${id}`, () => $fetch(`/api/posts/${id}`))\n// 내비게이션 안 막기\nconst { data, status } = useLazyFetch('/api/slow')        // status: 'pending' → 로딩 UI\n// 브라우저에서만 · 사용자 트리거\nconst { data, execute } = useFetch('/api/search', { server: false, immediate: false, query: { q } })\n// 이벤트에서는 $fetch\nasync function save() { await $fetch('/api/todo', { method: 'POST', body: { title } }) }\n\n// ✗ setup 에서 $fetch — 서버 1번 + 브라우저 1번 = 두 번 요청, payload 없음",
      },
      {
        label: "Next: 서버 컴포넌트의 fetch 와 스트리밍",
        body: "`export default async function Page() { const data = await fetch(url).then(r => r.json()) }` 처럼 씁니다. 자격 증명은 클라이언트에 안 가고, ORM 도 바로 부릅니다. '동일한 fetch 요청은 한 컴포넌트 트리에서 메모이즈'됩니다. 그래서 레이아웃과 페이지가 같은 URL 을 받아도 한 번만 받습니다. 캐시는 아닙니다. 요청마다 새로 받고 렌더를 막습니다. 캐시는 6장 'use cache' 입니다. 느린 fetch 는 `loading.tsx`(세그먼트 전체를 Suspense 로) 또는 `<Suspense>`(한 컴포넌트만)로 스트리밍합니다. 실제로 /dashboard 가 `loading…` 폴백을 먼저 보냈습니다. 문서의 주의는 둘입니다. '캐시 안 된 데이터를 읽는 레이아웃은 loading.js 로 떨어지지 않고 내비게이션을 막는다 → 자기 Suspense 를' 과 '봇과 크롤러에는 스트리밍 대신 완성 페이지' 입니다. 순차는 의존하는 await 입니다. 병렬은 `Promise.all` 인데 하나 실패하면 전부 실패하니 `allSettled` 를 씁니다. 미리 시작하는 preload 패턴이 있습니다. 비 fetch 데이터의 중복 제거는 `React.cache`(요청 범위)로 합니다.",
        code: "// app/dashboard/page.tsx\nasync function Slow() { await new Promise((r) => setTimeout(r, 300)); return <p>slow part loaded</p>; }\nexport default function Dashboard() {\n  return <section><h1>dashboard</h1><Suspense fallback={<p>loading…</p>}><Slow /></Suspense></section>;\n}\n$ curl -sN --max-time 3 localhost:4341/dashboard | grep -o 'loading…\\|slow part loaded'\nloading…                      # 셸 + 폴백이 먼저, slow part 는 스트림 뒤에\n\n// 병렬\nconst [user, posts] = await Promise.all([getUser(id), getPosts(id)])   // 하나 실패 → 전부 실패 (allSettled 로)\n// 클라이언트에서 Promise 받기\n<Suspense><Posts posts={getPosts()} /></Suspense>   // 'use client' 안에서 const posts = use(props.posts)",
      },
      {
        label: "문제가 나는 경우: 데이터 받기에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                  Next                                    Nuxt\n───────────────────────────────────  ─────────────────────────────────────\n같은 API 가 두 번 호출된다               레이아웃+페이지 fetch 는 메모이즈 — URL/옵션이 다르면 2회  setup 의 $fetch →\n                                    useFetch 로\n데이터가 안 갱신된다                     fetch 는 기본 캐시 없음 — 'use cache' 썼다면 revalidate  useFetch 키 같고\n                                    데이터 같음 → refresh · watch · key 에 id\n페이지 전체가 느린 fetch 를 기다린다       Suspense/loading.tsx 없음                await useFetch (내비게이션 막음)\n                                                                            → useLazyFetch + status\n클라이언트 내비게이션에서 data 가 undefined  —                                     lazy + await → status 로 처리\n                                                                            · 서버에서 안 받았으면 setup\n                                                                            에서 undefined\n'Nuxt instance is unavailable'         —                                     await 뒤에 컴포저블 호출 → 앞으로\n레이아웃 fetch 가 loading 을 건너뛴다     레이아웃은 loading.tsx 밖 → 자기 Suspense     —\n키 충돌로 다른 데이터가 나온다            —                                     useAsyncData 키 중복 →\n                                                                         `post-${id}` 처럼 고유하게\nSSR 에서 쿠키가 안 넘어간다              서버 fetch 는 요청 쿠키를 자동 전달 안 함 → cookies() 로  useFetch 가 요청 헤더\n                                   일부 자동 전달 · useRequestFetch",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 두 번 받지 않으려면 '한 번 받은 결과를 넘길 통로' 가 있어야 한다",
        body: "SSR 의 근본 문제 — 서버가 데이터로 HTML 을 그렸는데 브라우저가 하이드레이션하며 같은 데이터를 또 받는 것. 해법은 '서버가 받은 값을 HTML 에 함께 실어 보내고 브라우저가 그것을 초기값으로 쓰는 통로'이고, Nuxt 는 payload(`__NUXT_DATA__`), Next 는 RSC 페이로드(`self.__next_f.push` — 실제로 응답에 존재)가 그 통로입니다. 통로를 거치지 않는 요청($fetch in setup, 클라이언트 useEffect fetch)은 두 번 받습니다. Next 에서는 서버 컴포넌트가 데이터를 '렌더 결과'로 넘기므로 통로가 자동이고, Nuxt 에서는 useFetch/useAsyncData/useState 만 통로에 실리므로 '어떤 함수를 쓰는가'가 두 번 받느냐를 정합니다.",
        code: "서버                                    HTML + 통로                        브라우저\nNext: async 서버 컴포넌트 fetch  ──────►  HTML + RSC 페이로드 (__next_f)  ──►  클라이언트 컴포넌트는 props 로 받음\n                                                                         (재요청 없음)\nNuxt: useFetch in setup        ──────►  HTML + __NUXT_DATA__ (payload)  ──►  하이드레이션이 data 복원\n                                                                             (재요청 없음)\nNuxt: $fetch in setup          ──────►  HTML (통로 없음)                ──►  다시 $fetch (2회)\n둘:  클라이언트 useEffect/onMounted fetch  (서버 안 거침)                  ──►  브라우저만 1회 (SSR 에 데이터 없음)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "받은 데이터를 '얼마나 오래 재사용하나' — Next 의 'use cache' 와 cacheLife, Nuxt 의 routeRules 캐시와 defineCachedEventHandler — 가 6장 캐시와 재검증입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `__NUXT_DATA__` 안의 `$f…` 키는 무엇이고 브라우저가 그것으로 무엇을 하나요?\n2) setup 에서 `$fetch` 를 쓰면 왜 두 번 요청되나요?\n3) Next 에서 같은 fetch 가 레이아웃과 페이지에서 한 번만 가는 메커니즘과, 그것이 '캐시'가 아닌 이유는?\n4) 느린 fetch 가 내비게이션을 막지 않게 하는 Next · Nuxt 각각의 도구는?",
      },
    ],
    sources: [
      { label: "Next.js — Fetching Data", href: `${NEXT}/getting-started/fetching-data` },
      { label: "Nuxt — Data Fetching", href: `${NUXT}/getting-started/data-fetching` },
      { label: "Nuxt — Server Engine (Nitro)", href: `${NUXT}/guide/concepts/server-engine` },
    ],
  },

  {
    id: "nn-s6",
    name: "6장 · 캐시와 재검증",
    tagline: "'use cache' + cacheLife/cacheTag 와 routeRules swr/isr + defineCachedEventHandler",
    intro:
      "캐시의 질문은 둘입니다. 무엇을 얼마나 두나(시간), 언제 버리나(재검증)입니다. Next 16 Cache Components 는 코드에 적습니다. 함수 · 컴포넌트 · 파일 위에 `'use cache'` 를 적습니다. 수명은 `cacheLife('minutes')` 같은 프로필(stale · revalidate · expire)로 정합니다. 태그는 `cacheTag('posts')` 로 붙입니다. 버리기는 `revalidateTag('posts', 'max')` · `updateTag`(Server Action 에서 즉시) · `revalidatePath` 입니다. Nuxt 는 설정과 서버에 적습니다. `routeRules` 의 `swr` · `isr` · `cache`, 서버 핸들러의 `defineCachedEventHandler({ maxAge })`, 그리고 `useFetch` 의 `getCachedData` 입니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 'use cache' 는 같은 시각을 두 번 돌려준다",
        body: "`async function getTime() { 'use cache'; cacheLife('minutes'); cacheTag('time'); return new Date().toISOString() }` 을 쓰는 `/cached` 페이지를 만들었습니다. 빌드 표에 `○ /cached 1m 1h` 가 찍혔습니다. minutes 프로필의 revalidate 1분 · expire 1시간입니다. 1초 간격으로 두 번 요청하니 둘 다 `2026-11-12T05:47:21.187Z` 였습니다. 캐시가 맞았습니다.\n\n문서의 프로필 표는 이렇습니다.\ndefault 는 stale 5m · revalidate 15m · expire never 입니다.\nseconds 는 30s/1s/60s 입니다.\nminutes 는 5m/1m/1h 입니다.\nhours 는 5m/1h/1d 입니다.\ndays 는 5m/1d/1w 입니다.\nweeks 는 5m/1w/30d 입니다.\nmax 는 5m/30d/1y 입니다.\n문서는 '모든 cache 지시어에 cacheLife 를 짝지으라'고 권고합니다. 없으면 default 입니다.\n\n캐시 키는 함수 ID + 직렬화 가능한 인자 + 클로저 변수입니다. 그래서 `cookies()` · `headers()` 는 'use cache' 안에서 못 부릅니다. 밖에서 읽어 인자로 넘깁니다. 기본 저장소는 인스턴스 안 메모리입니다. 서버리스에서는 휘발됩니다. 공유하려면 `cacheHandler` 또는 `'use cache: remote'` 를 씁니다.",
        code: "// app/cached/page.tsx\nimport { cacheLife, cacheTag } from \"next/cache\";\nasync function getTime() { \"use cache\"; cacheLife(\"minutes\"); cacheTag(\"time\"); return new\nDate().toISOString(); }\nexport default async function Cached() { const t = await getTime(); return <h1>cached at {t}</h1>; }\n\n# 빌드 표\n├ ○ /cached                   1m      1h          # revalidate 1m · expire 1h\n# 1초 간격 두 요청\ncached at 2026-11-12T05:47:21.187Z\ncached at 2026-11-12T05:47:21.187Z               # 같다 — 캐시 HIT\n\n프로필     stale(클라) revalidate(서버) expire\ndefault    5m          15m              never\nseconds    30s         1s               60s      ← 5분 미만 expire 는 프리렌더에서 제외 (동적 구멍)\nminutes    5m          1m               1h\nhours      5m          1h               1d\nmax        5m          30d              1y",
        codeLang: "text",
        terms: [
          {
            term: "stale · revalidate · expire",
            body: "stale 은 클라이언트(라우터 캐시)가 서버에 묻지 않고 쓰는 시간입니다. 최소 30초입니다.\nrevalidate 는 서버가 캐시를 '오래됐다'고 보고 뒤에서 다시 만들기 시작하는 시간입니다. 그동안 옛 값을 줍니다. 이것이 SWR 입니다.\nexpire 는 이 뒤로는 옛 값도 안 주고 새로 만들 때까지 막는 시간입니다.\n`revalidateTag(tag, 'max')` 의 둘째 인자가 그 태그의 stale 창을 정합니다.",
          },
        ],
      },
      {
        label: "Next: 재검증 세 함수",
        body: "`revalidateTag('posts', 'max')` 는 태그가 붙은 캐시를 '오래됨'으로 표시합니다. 'max' 가 가장 긴 stale 창입니다. SWR 식이라 다음 요청은 옛 값을 받고 뒤에서 갱신됩니다. Server Action 과 Route Handler 에서 부릅니다.\n`updateTag('posts')` 는 '즉시 만료'하고 같은 요청 안에서 새 값을 읽습니다(read-your-own-writes). Server Action 전용이고 쓰기 뒤 `redirect` 와 짝입니다.\n`revalidatePath('/profile')` 은 경로 단위입니다. 문서는 '가능하면 태그 기반을 선호'합니다.\n시간 기반은 cacheLife 가 알아서 합니다. 실제로 프로브의 Server Action 이 `revalidateTag('time', 'max')` 를 부르도록 두었습니다. 폼 제출이 `/cached` 의 시각을 갈아 줍니다. 서버리스에서는 주의할 것이 있습니다. 인메모리 캐시는 인스턴스마다 따로라 재검증이 다른 인스턴스에 안 보일 수 있습니다. 그래서 공유 핸들러(Redis 등)가 필요합니다.",
        code: "// app/actions.ts\n'use server'\nimport { revalidateTag, updateTag } from 'next/cache'\nexport async function addTodo(formData: FormData): Promise<void> {\n  await db.insert(…)\n  revalidateTag('time', 'max')     // 오래됨 표시 — 다음 요청은 옛 값 + 뒤에서 갱신 (SWR)\n  // updateTag('posts')            // 즉시 만료 + 같은 요청에서 새 값 (Server Action 전용) → redirect 와 짝\n}\n\n함수               어디서                       효과\nrevalidateTag(t, p) Server Action · Route Handler  태그 캐시를 stale 로, p 는 stale 창 ('max' 권장)\nupdateTag(t)        Server Action                 즉시 만료 + read-your-own-writes\nrevalidatePath(p)   Server Action · Route Handler  경로 단위 (태그 선호)\ncacheLife(profile)  'use cache' 안               시간 기반",
      },
      {
        label: "실제로 돌려 보면: Nuxt 의 세 층",
        body: "(1) 라우트 캐시입니다. `routeRules: { '/posts/**': { swr: 60 } }` 가 `cache-control: s-maxage=60, stale-while-revalidate` 헤더를 내고 Nitro 가 렌더 결과를 캐시합니다(실제로). `isr` 은 CDN 에 보관합니다. `cache: { maxAge }` 는 Nitro 캐시만 씁니다.\n(2) 서버 핸들러 캐시입니다. `defineCachedEventHandler(handler, { maxAge: 60 })` 로 감쌉니다. 실제로 `/api/posts/7` 을 1초 간격으로 두 번 부르니 `\"at\":1794461719181` 이 같았습니다. 핸들러가 한 번만 돌았습니다. 키는 기본으로 URL 이고 `getKey` 로 바꿉니다.\n(3) 클라이언트 측입니다. `useFetch` 의 `getCachedData((key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key])` 로 payload 에 이미 있는 값을 쓰고 요청을 건너뜁니다. Nuxt 4 기본값이 이 모양입니다.\n전역 저장은 `useStorage()` 입니다. Nitro storage 이고 드라이버를 바꿀 수 있습니다. 비움은 `clearNuxtData(key)` · `refreshNuxtData` 입니다.",
        code: "// server/api/posts/[id].get.ts\nexport default defineCachedEventHandler((event) => {\n  const id = getRouterParam(event, 'id')\n  return { id, title: `post ${id}`, at: Date.now() }\n}, { maxAge: 60 })                                   // 60초 동안 한 번만 실행\n\n$ curl -s localhost:4342/api/posts/7 | grep -o '\"at\":[0-9]*'; sleep 1; curl -s … \n\"at\":1794461719181\n\"at\":1794461719181                                   # 같다 — 핸들러 캐시 HIT\n\n// nuxt.config.ts — 라우트 캐시\n// → cache-control: s-maxage=60, stale-while-revalidate\nrouteRules: { '/posts/**': { swr: 60 } }\n\n// 클라이언트 — payload 재사용\nuseFetch('/api/x', { getCachedData: (key, app) => app.payload.data[key] ?? app.static.data[key] })",
      },
      {
        label: "문제가 나는 경우: 캐시에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                    Next                                     Nuxt\n─────────────────────────────────────  ──────────────────────────────────────\n데이터가 안 바뀐다                        'use cache' 의 cacheLife 만료 전 → revalidateTag  swr/isr 만료 전 ·\n                                      핸들러 maxAge · payload 재사용 (getCachedData)\n사용자별 데이터가 섞인다                   cookies/headers 를 캐시 함수 안에서 → 인자로 넘기거나 'use cache: private'\n                                     defineCachedEventHandler 키에 사용자 없음 → getKey 에 사용자 · 캐시 안 함\n빌드가 'nested short-lived cache' 로 실패  짧은 캐시가 cacheLife 없는 캐시 안에          —\n서버리스에서 재검증이 안 먹는다             인메모리 캐시가 인스턴스별 → cacheHandler/remote  Nitro 캐시도 인메모리 기본 →\n                                                                               storage 드라이버 (redis)\n쓰기 직후 옛 목록이 보인다                  revalidateTag 는 SWR → updateTag            쓰기 뒤\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n                                                                                 refreshNuxtData/clearNuxtData\nseconds 프로필 페이지가 ◐ 로 바뀜           expire < 5m 은 프리렌더 제외 (동적 구멍)       —\n개발에서 캐시가 안 되는 것 같다              개발은 HMR 해시가 키에 들어감 · Draft Mode 는 캐시 안 함  개발 모드도 maxAge\n                                      적용 — 키 확인",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 캐시 키에 '누구 · 무엇 · 언제' 가 들어가야 한다",
        body: "모든 캐시 사고는 키 설계입니다. Next 는 키를 '함수 + 인자 + 클로저'로 자동으로 만들어 주되 요청 데이터(쿠키 · 헤더)를 캐시 함수 안에서 읽는 것을 금지해 '누구'가 키에서 빠지는 사고를 구조적으로 막습니다('use cache: private' 이 사용자별 캐시의 자리). Nuxt 의 defineCachedEventHandler 는 기본 키가 URL 이라 '누구'를 넣으려면 `getKey` 를 직접 써야 하고, routeRules 는 경로 전체가 키라 사용자별 페이지에 swr 을 걸면 다른 사용자의 HTML 이 나갑니다. '언제'는 Next 의 세 시간(stale · revalidate · expire)과 Nuxt 의 maxAge/swr 숫자이고, '무엇'을 버릴지는 태그(Next) 또는 키(Nuxt)입니다. 캐시를 켤 때 세 질문 — 이 값이 누구에게나 같은가, 얼마나 오래 같은가, 언제 틀려지는가 — 를 먹여 두면 둘 어디서든 같은 답이 나옵니다.",
        code: "            누구 (사용자)                      무엇 (키/태그)              언제 (시간)\nNext        캐시 안에서 cookies() 금지 → 인자    함수+인자+클로저 · cacheTag   cacheLife stale/revalidate/expire\n                                                                      · revalidateTag/updateTag\n            'use cache: private' = 사용자별\nNuxt        getKey 에 넣기 · 사용자별 경로엔 swr 금지   URL (기본) · 라우트 경로      maxAge · swr/isr 초 ·\n                                                                           clearNuxtData",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "캐시를 버리는 트리거가 대개 '데이터 변경'입니다 — Server Action 과 server/api POST 가 7장 데이터 바꾸기입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `cacheLife('minutes')` 의 세 시간은 각각 무엇을 뜻하나요?\n2) `revalidateTag` 와 `updateTag` 의 차이와 각각 쓰는 자리는?\n3) `defineCachedEventHandler` 의 두 응답이 같은 `at` 을 가진 이유와, 사용자별 데이터에서 위험한 점은?\n4) Next 가 'use cache' 안에서 `cookies()` 를 금지하는 이유는?",
      },
    ],
    sources: [
      { label: "Next.js — Revalidating", href: `${NEXT}/getting-started/revalidating` },
      { label: "Next.js — use cache", href: `${NEXT}/api-reference/directives/use-cache` },
      { label: "Nuxt — Rendering Modes (routeRules)", href: `${NUXT}/guide/concepts/rendering` },
      { label: "Nitro — Cache", href: "https://nitro.build/guide/cache" },
    ],
  },

  {
    id: "nn-s7",
    name: "7장 · 데이터 바꾸기",
    tagline: "Server Action ('use server') 과 server/api POST — 쓰기는 서버에서, 결과는 재검증으로",
    intro:
      "Next 는 `'use server'` 가 붙은 async 함수를 씁니다. 이것을 Server Function 이라 하고, 변경에 쓰면 Server Action 이라 부릅니다. 이 함수는 `<form action={fn}>` · 이벤트 핸들러 · `useActionState` 에서 부릅니다. 네트워크 요청은 프레임워크가 만들고, 항상 POST 입니다. 함수는 서버에서 돌고, 끝에서 `revalidateTag`/`updateTag` 와 `redirect` 를 부릅니다. 문서는 'Server Function 은 UI 뿐 아니라 직접 POST 로도 도달 가능하다'고 경고합니다. 그래서 공개 엔드포인트처럼 검증합니다. Nuxt 는 `server/api/todo.post.ts` 핸들러에서 `readBody` 로 받고 `setResponseStatus` 로 상태를 정합니다. 클라이언트는 `$fetch('/api/todo', { method: 'POST', body })` 로 보내고, 뒤에 `refreshNuxtData` 를 부릅니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: Next 의 form action 과 타입 제약",
        body: "`app/actions.ts` 에 `'use server'` 와 `export async function addTodo(formData: FormData)` 를 적었습니다. `app/form/page.tsx` 에서는 `<form action={addTodo}>` 로 연결했습니다. 처음에는 `{ ok, title }` 을 return 하게 썼습니다. 그랬더니 빌드의 타입 검사가 거부했습니다. form 의 `action` 은 `(formData: FormData) => void | Promise<void>` 이기 때문입니다. 값을 돌려주는 액션은 `useActionState` 로 감싸야 합니다. 실제 에러 문구는 이렇습니다. \"Type '(formData: FormData) => Promise<{ ok: boolean; title: string; }>' is not assignable to type 'string | ((formData: FormData) => void | Promise<void>)'\". 반환을 `Promise<void>` 로 바꾸고 `revalidateTag('time', 'max')` 를 넣자 통과했습니다. 서버 컴포넌트의 form 은 점진적 향상을 따릅니다. JS 가 오기 전에 제출해도 동작합니다. 클라이언트 컴포넌트에서는 하이드레이션 전에 한 제출이 큐에 쌓입니다.",
        code: "// app/actions.ts\n'use server'\nexport async function addTodo(formData: FormData): Promise<void> {   // form action 은 void 를 돌려줘야\n  const title = String(formData.get('title'))\n  await db.todos.insert({ title })\n  revalidateTag('todos', 'max')\n}\n// app/form/page.tsx (서버 컴포넌트 — 점진적 향상)\n<form action={addTodo}><input name=\"title\" /><button>add</button></form>\n\n// 실제 빌드 에러 (값을 돌려주는 액션을 action 에 직접)\nType '(formData: FormData) => Promise<{ ok: boolean; title: string; }>' is not assignable to type\n  'string | ((formData: FormData) => void | Promise<void>) | undefined'.\n\n// 값(에러 메시지 등)을 받으려면 useActionState\n'use client'\nconst [state, action, pending] = useActionState(addTodoWithState, { message: '' })\n<form action={action}>…{state.message}</form>",
      },
      {
        label: "Next: 호출 방식 · 보안 · 뒤처리",
        body: "부르는 길은 셋입니다. FormData 를 받는 form 의 `action`, 이벤트 핸들러 `onClick={async () => await incrementLike()}`, 그리고 `useEffect` 입니다.\n상태는 `useActionState(fn, initial)` 로 다룹니다. 돌려받는 값은 `[state, action, pending]` 입니다.\n에러 처리에 대해 문서는 'Server Function 에서는 try/catch 로 던지지 말고 값으로 돌려주라'고 말합니다. 돌려준 `{ message }` 는 useActionState 로 읽습니다(9장).\n보안도 챙깁니다. 액션은 POST 엔드포인트입니다. 그래서 인증과 입력 검증을 함수 안에서 합니다. 암호화된 ID 로 호출되지만 공개된 것은 마찬가지입니다.\n뒤처리에서는 `revalidateTag`/`updateTag`/`revalidatePath` 로 캐시를 다룹니다. `redirect('/posts')` 는 제어 흐름 예외라서 그 뒤의 코드가 돌지 않습니다. 그래서 재검증은 redirect 앞에 둡니다. `cookies().set/delete` 도 쓸 수 있고, 그러면 페이지와 레이아웃이 다시 렌더됩니다. `refresh()` 는 라우터만 새로 고치고, 태그 캐시는 건드리지 않습니다.\n클라이언트 컴포넌트는 액션을 정의할 수 없습니다. `'use server'` 파일에서 import 해서 씁니다.",
        code: "// 세 가지 호출\n<form action={createPost}>                               // FormData\n<button onClick={async () => { await incrementLike(id) }}>  // 핸들러\nuseEffect(() => { void trackView(id) }, [id])             // 마운트\n\n// 액션 안의 순서\nexport async function createPost(prev, formData) {\n  // 공개 엔드포인트 — 직접 검증\n  const session = await auth(); if (!session) return { message: 'unauthorized' }\n  const parsed = schema.safeParse(Object.fromEntries(formData)); if (!parsed.success) return { message:\n    '…' }\n  await db.insert(parsed.data)\n  updateTag('posts')               // 즉시 만료 → 리다이렉트 뒤 새 목록\n  redirect('/posts')               // 던진다 — 이 뒤는 실행 안 됨\n}",
      },
      {
        label: "실제로 돌려 보면: Nuxt 의 POST 핸들러",
        body: "파일은 `server/api/todo.post.ts` 입니다. 파일 이름의 `.post` 가 메서드 필터입니다. 핸들러는 `defineEventHandler(async (event) => { const body = await readBody(event); setResponseStatus(event, 201); return { got: body } })` 입니다. curl 로 `{\"a\":1}` 을 POST 하니 `{\"got\":{\"a\":1}} 201` 이 돌아왔습니다. 클라이언트는 `$fetch('/api/todo', { method: 'POST', body: { title } })` 로 보냅니다. 부르는 자리는 이벤트 핸들러입니다. setup 의 useFetch 가 아닙니다. 유효성 검사는 `readValidatedBody(event, schema.parse)` 로 합니다. 뒤처리에서는 서버에 `revalidate` 같은 것이 없습니다. Nitro 캐시는 maxAge 가 끝나야 풀립니다. 아니면 `useStorage('cache').removeItem` 으로 지웁니다. 클라이언트에서는 `refreshNuxtData('todos')` 나 `refresh()` 로 useFetch 를 다시 돌립니다. 메서드는 파일로 나눕니다. `todo.get.ts` · `todo.post.ts` · `todo.put.ts` · `[id].delete.ts` 가 그 예입니다. `server/routes/` 에는 `/api` 접두어가 없는 라우트를 둡니다. sitemap.xml 등이 여기에 들어갑니다.",
        code: "// server/api/todo.post.ts\nexport default defineEventHandler(async (event) => {\n  const body = await readBody(event)                 // 또는 readValidatedBody(event, schema.parse)\n  setResponseStatus(event, 201)\n  return { got: body }\n})\n$ curl -s -X POST -H 'content-type: application/json' -d '{\"a\":1}' -w ' %{http_code}'\n  localhost:4342/api/todo\n{\"got\":{\"a\":1}} 201\n\n// 클라이언트 — 이벤트에서\nasync function add() {\n  await $fetch('/api/todo', { method: 'POST', body: { title: title.value } })\n  await refreshNuxtData('todos')                     // useFetch 키 'todos' 를 다시\n}",
      },
      {
        label: "비교와 함정",
        body: "두 방식의 자리를 나란히 봅니다.",
        code: "항목        Next Server Action                         Nuxt server/api + $fetch\n─────────  ────────────────────────────────────────  ─────────────────────────────────────────\n정의 위치   'use server' 함수 (파일 또는 인라인)         server/api/*.post.ts 핸들러\n호출       함수처럼 (프레임워크가 POST 만듦)              $fetch(url, { method, body })\n입력       FormData · 인자 (직렬화)                     readBody · readValidatedBody · getQuery\n점진적 향상  서버 컴포넌트 form 은 JS 없이도                form @submit.prevent — JS 필요 (또는 action 속성 직접)\n보안       암호화 ID 지만 공개 POST — 함수 안에서 인증·검증  공개 엔드포인트 — 핸들러 안에서 인증·검증\n뒤처리     revalidateTag/updateTag · redirect · cookies  refreshNuxtData · navigateTo · setCookie\n에러       값으로 반환 → useActionState                 createError({ status }) → $fetch 가 throw → try/catch\n\n함정: Next — form action 은 void 반환 (값은 useActionState) · redirect 뒤 코드 안 돎 · 클라이언트 파일에서 정의 불가\n      Nuxt — setup 에서 $fetch POST 하지 말기 · POST 핸들러도 캐시 핸들러로 감싸면 안 됨 · 메서드 접미사 오타(.post)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 변경은 '서버 함수 호출' 이고, 둘의 차이는 그 호출을 누가 만드나",
        body: "브라우저에서 서버의 상태를 바꾸는 일은 결국 POST 요청 하나입니다. Next 는 그 요청을 프레임워크가 숨겨 '함수를 부르는 것'처럼 보이게 하고(RPC), 그래서 타입이 양쪽에서 같고 form 과 점진적 향상이 자연스럽지만 '함수가 공개 엔드포인트'라는 사실을 잊기 쉽습니다. Nuxt 는 요청을 드러내고(`$fetch` + URL) 핸들러를 파일로 두어 REST 처럼 보이게 하며, 타입은 Nitro 가 라우트 반환 타입을 생성해 `$fetch` 결과에 붙입니다. 두 쪽 모두 변경 뒤의 일은 같습니다 — 캐시를 버리고(6장) 화면을 갱신하고 필요하면 이동. commerce-web 같은 Nuxt 앱에서 `$fetch` POST 뒤 `refreshNuxtData` 를 빼먹어 옛 목록이 남는 것이 가장 흔한 버그이고, Next 에서는 `revalidateTag` 를 `redirect` 뒤에 둬서 안 도는 것이 짝입니다.",
      },
      {
        label: "다음 입구",
        body: "변경 핸들러가 사는 곳 — Next 의 route.ts/proxy.ts, Nuxt 의 server/api · server/middleware · Nitro — 가 8장 서버 라우트와 미들웨어입니다.",
      },
      {
        label: "확인 질문",
        body: "1) form `action` 에 값을 돌려주는 Server Action 을 직접 넘기면 왜 타입 에러인가요?\n2) Server Action 안에서 인증을 다시 해야 하는 이유는?\n3) Nuxt 에서 POST 뒤 목록을 갱신하는 함수는?\n4) `redirect()` 뒤에 `revalidateTag` 를 두면 어떻게 되나요?",
      },
    ],
    sources: [
      { label: "Next.js — Mutating Data", href: `${NEXT}/getting-started/mutating-data` },
      { label: "Nuxt — Server directory", href: `${NUXT}/directory-structure/server` },
      { label: "Nuxt — $fetch", href: `${NUXT}/api/utils/dollarfetch` },
    ],
  },

  {
    id: "nn-s8",
    name: "8장 · 서버 라우트와 미들웨어",
    tagline: "route.ts · proxy.ts 와 server/api · server/middleware — 요청이 페이지 밖에서 처리되는 자리",
    intro:
      "페이지가 아닌 요청 — JSON API · 웹훅 · 헤더 조작 · 리다이렉트 — 를 받는 곳입니다. Next — `app/**/route.ts` 가 GET · POST 등 메서드별 함수를 export(Request → Response, GET 은 기본 캐시 없음), `proxy.ts`(16 에서 Middleware 의 새 이름)가 루트에 하나 있어 매처에 맞는 요청을 응답 전에 가로챕니다(리다이렉트 · 리라이트 · 헤더). Nuxt — `server/api/*.ts`(`/api` 접두어) · `server/routes/*.ts`(접두어 없음) · `server/middleware/*.ts`(모든 요청) 가 Nitro(h3) 위에서 돌고, `defineEventHandler` 와 h3 헬퍼(readBody · getQuery · getRouterParam · setHeader · createError)를 씁니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 두 API 와 두 미들웨어",
        body: "Next 에서는 `app/api/hello/route.ts` 에 `export async function GET(req) { return Response.json({ hello: 'world', url: req.url }) }` 를 두었습니다. POST 도 두었습니다. `req.json()` 으로 받고 201 을 돌려줍니다. 실제로 GET 은 `{\"hello\":\"world\",\"url\":\"http://localhost:4341/api/hello\"}` 를 돌려주었습니다. POST 는 `{\"got\":{\"a\":1}} 201` 이었습니다. 빌드 표에는 ƒ 로 찍혔습니다. `proxy.ts` 는 `matcher: ['/dyn/:path*']` 로 경로를 좁히고, 그 안에서 `NextResponse.next()` 에 `x-proxied: 1` 헤더를 붙였습니다. 실제로 `/dyn/x` 응답에만 그 헤더가 있고 `/static` 에는 없습니다.\n\nNuxt 에서는 `server/api/hello.get.ts` 가 `{\"hello\":\"world\",\"method\":\"GET\"}` 를 돌려줍니다. `server/middleware/stamp.ts` 의 `setHeader(event, 'x-nitro', '1')` 은 모든 응답에 붙습니다. 실제로 `/` 와 `/posts/1` 둘 다에 있었습니다. `server/api/posts/[id].get.ts` 의 `createError({ statusCode: 404, statusMessage: 'no post' })` 는 JSON 으로 나갑니다. 그 모양은 `{ error: true, statusCode: 404, statusMessage: 'no post', message: 'no post', url }` 입니다.",
        code: "# Next\n$ curl -s localhost:4341/api/hello\n{\"hello\":\"world\",\"url\":\"http://localhost:4341/api/hello\"}\n$ curl -sI localhost:4341/dyn/x | grep x-proxied\nx-proxied: 1                                   # proxy.ts matcher '/dyn/:path*' 만\n\n# Nuxt\n$ curl -s localhost:4342/api/hello\n{\"hello\":\"world\",\"method\":\"GET\"}\n$ curl -sI localhost:4342/ | grep x-nitro\nx-nitro: 1                                     # server/middleware — 모든 요청\n$ curl -s localhost:4342/api/posts/404\n{ \"error\": true, \"url\": \"…/api/posts/404\", \"statusCode\": 404, \"statusMessage\": \"no post\", \"message\":\n  \"no post\" }",
        codeLang: "bash",
      },
      {
        label: "Next: route.ts 와 proxy.ts 의 규칙",
        body: "route.ts 는 `GET POST PUT PATCH DELETE HEAD OPTIONS` 를 export 합니다. 없는 메서드에는 405 를 돌려줍니다. 같은 세그먼트에 page.tsx 와 route.ts 를 함께 둘 수 없습니다. GET 은 기본이 동적(ƒ)입니다. `export const dynamic = 'force-static'` 을 적으면 정적이 됩니다. Cache Components 에서는 네트워크 · DB · cookies() 를 만나면 프리렌더가 멈추는 규칙을 따릅니다. `'use cache'` 는 핸들러 본문에 직접 쓸 수 없고, 헬퍼 함수로 빼야 합니다. 특수 핸들러(sitemap.ts · opengraph-image · icon)는 기본이 정적입니다. proxy.ts 는 프로젝트 루트(또는 src/)에 하나 둡니다. `export function proxy(request)` 나 default 로 내보내고, `config.matcher` 로 경로를 제한합니다. 문서는 한계도 적어 둡니다. '느린 데이터 페칭용이 아니다', '완전한 인증 · 세션 해법이 아니다'가 그것입니다. `'use cache'` · `'use server'` 는 proxy 에서 무효이고, fetch 캐시 옵션도 무효입니다. 단순 리다이렉트는 `next.config` 의 `redirects` 로 합니다.",
        code: "// app/api/hello/route.ts\nexport async function GET(req: Request) { return Response.json({ hello: 'world' }) }      // ƒ 기본\nexport async function POST(req: Request) { const body = await req.json(); return Response.json({ got: body\n  }, { status: 201 }) }\n// 다른 메서드 → 405 Method Not Allowed\n\n// proxy.ts (루트) — 16: Middleware → Proxy\nimport { NextResponse, type NextRequest } from 'next/server'\nexport function proxy(req: NextRequest) {\n  if (!req.cookies.get('session') && req.nextUrl.pathname.startsWith('/app')) return\n    NextResponse.redirect(new URL('/login', req.url))\n  const res = NextResponse.next(); res.headers.set('x-proxied', '1'); return res\n}\nexport const config = { matcher: ['/dyn/:path*', '/app/:path*'] }",
      },
      {
        label: "Nuxt: Nitro 와 h3",
        body: "`server/` 안은 전부 Nitro 입니다. 브라우저 번들과 무관한 서버 코드입니다. `server/api/x.ts` 는 `/api/x` 가 되고, `server/routes/sitemap.xml.ts` 는 `/sitemap.xml` 이 됩니다. 파일 이름의 `.get/.post` 가 메서드를 정합니다. `[id]` 는 파라미터이고 `getRouterParam` 으로 읽습니다. `[...].ts` 는 캐치올입니다. `server/middleware/*.ts` 는 모든 요청에서 먼저 돕니다. 여기서는 응답을 돌려주면 안 됩니다. 헤더와 컨텍스트를 설정하는 자리입니다. `event.context` 에 값을 실어 핸들러로 넘깁니다. `server/utils/` 는 자동으로 import 됩니다. `server/plugins/` 는 Nitro 가 시작할 때 한 번 돕니다. 서버리스에서는 부팅마다 돕니다.\n\nh3 헬퍼로는 readBody · readValidatedBody · getQuery · getRouterParam · getHeader/setHeader · setResponseStatus · sendRedirect · createError · getCookie/setCookie 가 있습니다. 서버에서 `$fetch('/api/x')` 를 부르면 네트워크 없이 핸들러를 직접 호출합니다(5장). 라우트의 반환 타입은 `$fetch` 의 결과 타입으로 생성됩니다. Nitro 문서는 'res.end() 가 아니라 값을 돌려주면 타입이 나온다'고 적습니다. 배포 타깃마다 프리셋이 바뀌어도 이 코드는 그대로입니다(13장).",
        code: "server/\n  api/hello.get.ts           → GET /api/hello\n  api/todo.post.ts           → POST /api/todo\n  api/posts/[id].get.ts      → GET /api/posts/:id   (getRouterParam(event, 'id'))\n  routes/sitemap.xml.ts      → GET /sitemap.xml      (접두어 없음)\n  middleware/stamp.ts        → 모든 요청 먼저 (응답 돌려주지 않기)\n  utils/db.ts                → 자동 import\n  plugins/init.ts            → Nitro 시작 1회\n\n// server/middleware/auth.ts\nexport default defineEventHandler((event) => {\n  const token = getCookie(event, 'token')\n  event.context.user = token ? verify(token) : null     // 핸들러가 event.context.user 로 읽음\n})",
      },
      {
        label: "문제가 나는 경우: 서버 라우트에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                     Next                                   Nuxt\n──────────────────────────────────────  ────────────────────────────────────\npage 와 route 를 같은 폴더에 두니 에러       같은 세그먼트 불가 → api/ 하위로         —\nGET 이 매번 실행된다 (캐시 기대)            GET 기본 동적 → force-static 또는 'use cache' 헬퍼\n                                      defineCachedEventHandler\nproxy 에서 DB 조회가 느리다                 proxy 는 느린 작업용 아님 → 라우트/서버 컴포넌트로  server/middleware 도 모든\n                                                                                 요청 — 가볍게\nproxy 가 안 돈다                          루트 위치 · matcher · 파일 이름 proxy.ts (16)  server/middleware 는\n                                        응답 돌려주면 이후 중단\n라우트 미들웨어로 /api 를 막으려 했다        —                                     라우트 미들웨어는 Vue 앱용 →\n                                                                           server/middleware\n405                                     메서드 export 없음                     .get/.post 접미사 불일치 → 404\n에러가 HTML 로 온다                        Response.json({...}, { status })        createError → JSON\n                                                                                (Accept 따라) · fatal\n                                                                                이면 error.vue\n타입이 any                                 Response 는 타입 없음 → zod 로 직접       핸들러에서 값 반환해야 타입 생성",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 요청은 '미들웨어 → 라우트 → 렌더' 세 층을 지난다",
        body: "두 프레임워크 모두 요청이 세 층을 지납니다.\n가로채는 층(Next proxy · Nuxt server/middleware)은 모든(또는 매처에 맞는) 요청에 먼저 닿습니다. 가볍게 응답을 바꾸거나 컨텍스트를 싣는 곳입니다.\n라우트 층(route.ts · server/api)은 특정 경로에 특정 메서드로 응답하는 곳입니다.\n렌더 층(page · pages)은 HTML 을 만드는 곳입니다.\nNuxt 에는 여기에 '라우트 미들웨어'가 하나 더 있습니다. Vue 앱 안에서 페이지 전환마다 돌고, 서버 라우트와는 무관합니다. 둘을 혼동하면 '/api 가 안 막힌다'가 됩니다. 인증은 가로채는 층에서 '토큰 있나'만 봅니다. 실제 권한은 라우트/렌더 층에서 다시 확인합니다. 이것이 두 문서의 공통 권고입니다. Next 는 'proxy 는 완전한 인증 해법이 아니다', Nuxt 는 'routeRules 는 보안 수단이 아니다'라고 적습니다.",
        code: "요청\n ├─ ① 가로채는 층   Next proxy.ts (matcher)        Nuxt server/middleware (전부)        가볍게 · 헤더/리다이렉트/컨텍스트\n ├─ ② 라우트 층     app/**/route.ts (메서드)        server/api · server/routes          JSON · 웹훅 · 파일\n └─ ③ 렌더 층       page.tsx (RSC)                  pages/*.vue (+ 라우트 미들웨어 — Vue 앱 안)   HTML\n권한 확인은 ②③ 에서 다시 — ① 은 보안 경계가 아니다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "세 층 어디서든 날 수 있는 에러를 어떻게 잡고 보여 주나 — error.tsx · not-found · global-error 와 error.vue · createError · NuxtErrorBoundary — 가 9장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) Next route.ts 의 GET 이 기본 ƒ 인 이유와 정적으로 만드는 두 길은?\n2) `x-proxied` 가 `/static` 에는 없는 이유는?\n3) Nuxt 의 라우트 미들웨어와 서버 미들웨어의 차이는?\n4) 두 문서가 '가로채는 층'에 대해 공통으로 경고하는 것은?",
      },
    ],
    sources: [
      { label: "Next.js — Route Handlers", href: `${NEXT}/getting-started/route-handlers` },
      { label: "Next.js — Proxy", href: `${NEXT}/getting-started/proxy` },
      { label: "Nuxt — Server directory", href: `${NUXT}/directory-structure/server` },
    ],
  },

  {
    id: "nn-s9",
    name: "9장 · 에러 처리",
    tagline: "예상한 에러는 값으로, 뜻밖의 에러는 경계로 — 그리고 404 는 따로",
    intro:
      "Next 는 에러를 나눠서 다룹니다. 예상한 에러(폼 검증 실패, 없는 리소스)는 값으로 돌려주거나 `notFound()` · `redirect()` 로 처리합니다. 뜻밖의 예외는 가장 가까운 `error.tsx` 로 갑니다. 이 파일은 클라이언트 컴포넌트이고 error · retry 를 받습니다. 루트 레이아웃까지 깨지면 `global-error.tsx` 가 받습니다. 이 파일은 html · body 를 포함합니다. Nuxt 는 에러 원천을 넷으로 봅니다. Vue 렌더링(onErrorCaptured · vue:error), 시작(app:error), Nitro 서버(error.vue 로 렌더), 청크 로드(자동 리로드)입니다. 도구로는 `createError` · `showError` · `useError` · `clearError` · `<NuxtErrorBoundary>` · `error.vue` 가 있습니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 404 셋",
        body: "Next 에서는 `app/not-found.tsx` 를 두고 `/nope` 를 열었습니다. 실제로 상태 404 와 'custom 404' 본문이 나왔습니다. 코드에서는 `notFound()` 를 던집니다. 그러면 가장 가까운 not-found 로 갑니다. Nuxt 에서는 `server/api/posts/404` 가 `createError({ statusCode: 404, statusMessage: 'no post' })` 를 던집니다. API 응답은 404 JSON 입니다. 그런데 그것을 `useAsyncData` 로 받은 페이지 `/posts/404` 는 200 으로 렌더됩니다. `error.value.statusCode` 는 404 입니다. 데이터 에러는 기본으로 페이지 에러가 아니라 '값'입니다. 실제로 페이지는 200 이었습니다. 페이지 자체를 404 로 하려면 setup 에서 `throw createError({ statusCode: 404, fatal: true })` 를 합니다. 아니면 `definePageMeta({ validate })` 가 false 를 돌려주게 합니다. 그러면 error.vue 가 뜹니다. 문서도 validate 가 false 를 돌려주면 404 라고 적습니다.",
        code: "# Next\n$ curl -s -o /dev/null -w '%{http_code}' localhost:4341/nope; curl -s localhost:4341/nope | grep -o\n  'custom 404'\n404  custom 404                                  # app/not-found.tsx\n\n# Nuxt — 데이터 에러는 값\nconst { data, error } = await useAsyncData(`post-${id}`, () => $fetch(`/api/posts/${id}`))\n<p v-if=\"error\">{{ error.statusCode }}</p>        # 404 가 찍히지만 페이지는 200\n$ curl -s -o /dev/null -w '%{http_code}' localhost:4342/posts/404\n200\n\n# 페이지를 404 로\n// → error.vue\nif (!data.value) throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })\n// false → 404\ndefinePageMeta({ validate: (route) => /^\\d+$/.test(String(route.params.id)) })",
      },
      {
        label: "Next: 경계 파일 셋과 Server Action 의 에러",
        body: "`error.tsx` 에는 반드시 `'use client'` 를 붙입니다. props 는 `error`(message · digest) 와 `retry`(세그먼트를 다시 렌더)입니다. 에러는 가장 가까운 경계로 버블링합니다. 같은 세그먼트의 layout 에러는 잡지 못합니다. 그것은 부모 세그먼트의 error.tsx 가 잡습니다. `global-error.tsx` 는 루트 레이아웃의 에러를 받고, html · body 를 직접 포함합니다. 그 밖에 `not-found.tsx` 와 `notFound()` 가 있고, `forbidden()` · `unauthorized()`(403 · 401, 실험적)도 있습니다. 이벤트 핸들러 안의 에러는 경계가 잡지 못합니다. 그래서 try/catch 와 state 로 다룹니다. `startTransition` 안의 에러는 잡힙니다. Server Action 의 예상 에러는 문서대로 '던지지 말고 값으로' 처리합니다. `return { message: '…' }` 를 `useActionState` 로 읽습니다. 프로덕션에서는 서버 에러 메시지가 가려지고 `digest` 만 남습니다. 이것을 로그와 맞춰 봅니다. 컴포넌트 단위 경계는 `catchError`(next/error)로 만듭니다.",
        code: "// app/error.tsx\n'use client'\nexport default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void })\n  {\n  useEffect(() => { console.error(error) }, [error])\n  return <div><p>Something went wrong ({error.digest})</p><button onClick={retry}>retry</button></div>\n}\n// app/global-error.tsx — html·body 포함 (루트 레이아웃이 깨졌을 때)\n\n// Server Action — 예상 에러는 값으로\nexport async function createPost(prev, formData) {\n  const parsed = schema.safeParse(…); if (!parsed.success) return { message: 'title is required' }\n  …\n}\n// 클라이언트\nconst [state, action] = useActionState(createPost, { message: '' })",
      },
      {
        label: "Nuxt: 네 원천과 도구",
        body: "(1) Vue 렌더 에러에는 `onErrorCaptured`, `vue:error` 훅(onErrorCaptured 기반), `vueApp.config.errorHandler` 가 있습니다. 마지막 것은 처리된 것까지 포함해 전부 받습니다.\n(2) 시작 에러는 `app:error` 훅이 받습니다. 플러그인 · 마운트 · SSR 렌더에서 나는 에러입니다.\n(3) Nitro 에러에는 서버 측 핸들러를 정의할 수 없습니다. 대신 에러 페이지로 렌더됩니다.\n(4) 청크 로드에 실패하면 내비게이션 때 하드 리로드합니다(`experimental.emitRouteChunkError`).\n전역 에러 페이지는 `error.vue`(app.vue 옆)입니다. `useError()` 로 에러를 읽고, `clearError({ redirect: '/' })` 로 복구합니다. `createError({ status, statusText, message, fatal, data })` 는 던지는 곳에 따라 다르게 동작합니다. 서버에서 던지면 HTTP 상태와 JSON(Accept 가 json 이면) 또는 전체 화면 에러가 됩니다. 클라이언트에서는 `fatal: true` 면 전체 화면이고, 아니면 try/catch 로 다룹니다. `<NuxtErrorBoundary>` 는 기본 슬롯의 클라이언트 에러를 잡아 `#error` 슬롯(error · clearError)으로 넘깁니다. 주의할 점도 있습니다. 에러 페이지를 렌더할 때 미들웨어가 다시 돕니다. 그래서 미들웨어에서 `useError()` 로 확인합니다. `cause` 는 dev 에서만 노출됩니다.",
        code: "<!-- app/error.vue -->\n<script setup lang=\"ts\">\nconst props = defineProps<{ error: { status?: number; statusCode?: number; message: string } }>()\nconst handle = () => clearError({ redirect: '/' })\n</script>\n<template><div><h1>{{ props.error.status ?? props.error.statusCode }}</h1><p>{{ props.error.message\n  }}</p><button @click=\"handle\">home</button></div></template>\n\n<!-- 컴포넌트 단위 -->\n<NuxtErrorBoundary @error=\"log\">\n  <RiskyWidget />\n  <template #error=\"{ error, clearError }\"><p>{{ error.message }}</p><button\n    @click=\"clearError\">retry</button></template>\n</NuxtErrorBoundary>\n\n// 서버 라우트 — HTTP 상태 + JSON\nthrow createError({ statusCode: 404, statusMessage: 'no post' })\n// → { error: true, statusCode: 404, statusMessage: 'no post', message: 'no post', url }  (실제로)",
      },
      {
        label: "문제가 나는 경우: 에러 처리에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                      Next                                       Nuxt\n───────────────────────────────────────  ────────────────────────────────────────\nerror.tsx 가 레이아웃 에러를 못 잡는다       같은 세그먼트 layout 은 부모 error.tsx 가 잡음   —\n이벤트 핸들러 에러가 경계로 안 간다            경계는 렌더 에러만 → try/catch · startTransition  NuxtErrorBoundary 도\n                                       렌더 에러 — 핸들러는 try/catch\n프로덕션에서 메시지가 'An error occurred…'   서버 에러 가림 → digest 로 로그 대조           cause 는 dev 만 —\n                                                                                statusMessage/message\n                                                                                로 전달\nAPI 404 인데 페이지는 200                   notFound() 를 안 던짐                       useAsyncData 의 error\n                                         는 값 → throw createError({ fatal }) · validate\nerror.tsx 에서 훅 에러                       'use client' 누락                          —\n에러 페이지에서 미들웨어가 또 돈다              —                                        정상 — useError() 로\n                                                                                 미들웨어에서 분기\nstatusText 에 한글을 넣었더니 깨짐            —                                        statusText 는 ASCII 만\n                                                                                 → message 에\n청크 로드 실패로 흰 화면                      vite:preloadError 식 처리 (번들링 허브)       자동 하드 리로드\n                                                                                  (emitRouteChunkError)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 에러는 '어느 층에서 났나' 와 '예상했나' 두 축으로 처리된다",
        body: "층 — 서버 라우트(HTTP 상태로), 서버 렌더(에러 페이지로), 클라이언트 렌더(경계로), 이벤트 핸들러(try/catch 로). 예상 여부 — 예상한 것(검증 실패 · 없음 · 권한 없음)은 값 · 상태 코드 · notFound/createError 로 '정상 흐름'에 두고, 뜻밖의 것만 경계(error.tsx · error.vue · NuxtErrorBoundary)로 보냅니다. Next 가 'Server Action 에서 던지지 말고 값으로'를 강조하고, Nuxt 가 useAsyncData 의 에러를 기본으로 '값'으로 두는 것이 같은 설계입니다. 그리고 경계는 '렌더 중의 예외'만 잡는다는 React · Vue 의 규칙(React 허브 · Vue 허브)이 두 프레임워크에서 그대로이고, 그래서 핸들러 안의 에러는 어디서든 try/catch 입니다.",
        code: "                 예상한 에러 (정상 흐름)                        뜻밖의 에러 (경계)\n서버 라우트       Response.json({…}, { status }) · createError   500 → 프레임워크 기본 응답 · 로그\n서버 렌더         notFound() · redirect() · createError(fatal)    error.tsx(가장 가까운) · error.vue\n클라이언트 렌더    조건부 렌더 · error 값 표시                     error.tsx · NuxtErrorBoundary\n이벤트 핸들러      useActionState 의 state · try/catch             try/catch (경계가 못 잡음)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "에러 페이지에도 `<title>` 이 필요합니다. 메타데이터와 SEO 는 10장에서 다룹니다. Next 의 metadata · generateMetadata · 파일 규약과 Nuxt 의 useHead · useSeoMeta · app.head 를 봅니다.",
      },
      {
        label: "확인 질문",
        body: "1) Next 에서 예상한 에러와 뜻밖의 에러를 각각 어떻게 처리하라고 하나요?\n2) Nuxt 의 `useAsyncData` 가 404 를 받았는데 페이지가 200 인 이유와, 404 로 만드는 두 방법은?\n3) `error.tsx` 가 `'use client'` 여야 하는 이유는?\n4) 이벤트 핸들러 안의 에러를 경계가 못 잡는 이유는?",
      },
    ],
    sources: [
      { label: "Next.js — Error Handling", href: `${NEXT}/getting-started/error-handling` },
      { label: "Nuxt — Error Handling", href: `${NUXT}/getting-started/error-handling` },
    ],
  },

  {
    id: "nn-s10",
    name: "10장 · 메타데이터와 SEO",
    tagline: "서버가 head 를 채운다 — metadata 객체와 useHead/useSeoMeta",
    intro:
      "SSR 의 큰 이유 하나가 크롤러에게 완성된 `<head>` 를 주는 것입니다. Next 는 레이아웃 · 페이지에서 `export const metadata` 나 `export async function generateMetadata({ params })` 를 씁니다. 서버 컴포넌트에서만 씁니다. 파일 규약도 있습니다. `favicon.ico` · `opengraph-image.tsx` · `robots.ts` · `sitemap.ts` 입니다. 동적 페이지에서는 메타데이터가 스트리밍됩니다. 다만 봇에게는 head 에 넣어서 줍니다. Nuxt 는 Unhead 기반입니다. `useHead`(반응형) · `useSeoMeta`(타입 있는 SEO 태그) · `nuxt.config` 의 `app.head`(정적) · `titleTemplate` · `<Title>` 같은 컴포넌트를 씁니다.",
    blocks: [
      {
        label: "Next: metadata · generateMetadata · 파일 규약",
        body: "정적 메타데이터는 `export const metadata: Metadata = { title: '…', description: '…' }` 로 적습니다. 동적 메타데이터는 `export async function generateMetadata({ params, searchParams }, parent)` 가 fetch 해서 돌려줍니다. 페이지의 fetch 와 중복되면 `React.cache` 나 fetch 메모이제이션으로 한 번만 부릅니다. 문서는 'metadata 와 generateMetadata 는 서버 컴포넌트에서만'이라고 적습니다. 기본으로 항상 들어가는 태그가 둘 있습니다. `<meta charset=\"utf-8\">` 과 `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` 입니다.\n\n파일 규약도 있습니다. `app/favicon.ico` · `icon.png` · `apple-icon.png` 가 있고, `opengraph-image.tsx` 가 있습니다. 이것은 `ImageResponse` 로 생성하며 1200×630 이고, flexbox 와 CSS 일부만 지원합니다. `robots.ts` · `sitemap.ts` 도 있습니다. 깊은 세그먼트의 OG 이미지가 상위를 덮습니다. 스트리밍 메타데이터도 있습니다. 동적 페이지에서 generateMetadata 가 느리면 본문을 먼저 보내고 head 를 나중에 주입합니다. 다만 봇(Twitterbot · Bingbot 등, `htmlLimitedBots`)에게는 기다려서 head 에 넣습니다. 실제로 프로브 빌드 결과에 `favicon.ico.body` · `favicon.ico.meta` 가 라우트처럼 생성됐습니다.",
        code: "// app/posts/[id]/page.tsx\nexport async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata>\n  {\n  // 페이지와 같은 getPost — React.cache 로 1회\n  const { id } = await params; const post = await getPost(id)\n  return { title: post.title, openGraph: { images: [`/posts/${id}/opengraph-image`] } }\n}\n// app/layout.tsx — 템플릿\nexport const metadata: Metadata = { title: { template: '%s | My Site', default: 'My Site' } }\n\n// 파일 규약\napp/favicon.ico  app/icon.png  app/opengraph-image.tsx  app/robots.ts  app/sitemap.ts\n// opengraph-image.tsx\nexport const size = { width: 1200, height: 630 }; export const contentType = 'image/png'\nexport default async function Image() { return new ImageResponse(<div style={{ display: 'flex' }}>…</div>,\n  size) }",
      },
      {
        label: "실제로 돌려 보면: Nuxt 의 useSeoMeta 와 payload",
        body: "`index.vue` 에 `useSeoMeta({ title: 'home', description: 'nuxt probe' })` 를 적었습니다. SSR HTML 의 head 에 `<title>home</title>` 과 `<meta name=\"description\">` 이 들어갑니다. 서버가 Unhead 로 렌더한 결과입니다. `useHead` 는 refs · computed · getter 를 받아 반응형으로 동작합니다. `useSeoMeta` 는 `ogTitle` · `twitterCard` 같은 키를 타입으로 안내해 오타를 막습니다. `useServerSeoMeta` 는 서버에서만 돌아 클라이언트 번들을 아낍니다. `app.head`(nuxt.config) 는 정적입니다. 문서는 '반응형 데이터를 줄 수 없다, app.vue 의 useHead 를 권한다'고 적습니다.\n\n기본으로 들어가는 것은 둘입니다. viewport `width=device-width, initial-scale=1` 과 charset `utf-8` 입니다. 제목 틀은 `titleTemplate: '%s - My Site'` 로 정합니다. 함수형은 app.vue 에서만 됩니다. `%siteName` 같은 자리값은 `templateParams` 로 채웁니다. 컴포넌트로도 쓸 수 있습니다. `<Head>` 안의 `<Title>` · `<Meta>` · `<Link>` 로 템플릿에서 선언적으로 적습니다. 중복 제거를 위해 `<Head>`/`<Html>` 로 감쌉니다. 스크립트 위치는 `tagPosition: 'bodyClose'` 로 정합니다.",
        code: "<script setup lang=\"ts\">\nconst { data: post } = await useFetch(`/api/posts/${id}`)\nuseSeoMeta({\n  title: () => post.value?.title ?? 'post',            // 반응형 (getter)\n  description: () => post.value?.summary,\n  ogImage: () => post.value?.cover,\n  twitterCard: 'summary_large_image',                   // 키가 타입으로 안내됨\n})\n</script>\n\n// nuxt.config.ts — 정적 기본\napp: { head: { titleTemplate: '%s - My Site', link: [{ rel: 'icon', href: '/favicon.ico' }] } }\n\n$ curl -s localhost:4342/ | grep -o '<title>[^<]*</title>'\n<title>home</title>                                    # SSR 에 들어간다",
      },
      {
        label: "i18n 과 SEO: hreflang · canonical · lang",
        body: "다국어 사이트의 head 는 i18n 허브의 자리와 겹칩니다. `<html lang>` — Next 는 루트 레이아웃의 `<html lang={locale}>`, Nuxt 는 `useHead({ htmlAttrs: { lang } })` 또는 @nuxtjs/i18n 의 `useLocaleHead`. `hreflang` 대안 링크 — Next `metadata.alternates.languages`, Nuxt `useLocaleHead({ addSeoAttributes: true })` 가 `link rel=alternate hreflang` 과 canonical 을 만들어 줍니다. commerce-web 진단(i18n 허브)에서 'hreflang/useLocaleHead 0' 이었던 것이 이 자리의 공백입니다 — `no_prefix` 전략이면 언어별 URL 이 없어 hreflang 이 의미를 잃으므로, SEO 가 필요한 페이지는 prefix 전략과 함께 가야 합니다.",
        code: "// Next — app/[lang]/layout.tsx\nexport default async function Layout({ children, params }) { const { lang } = await params; return <html\n  lang={lang}><body>{children}</body></html> }\nexport const metadata = { alternates: { canonical: '/ko', languages: { en: '/en', ja: '/ja' } } }\n\n// Nuxt (@nuxtjs/i18n)\n// htmlAttrs.lang · link hreflang · canonical · og:locale\nconst head = useLocaleHead({ addSeoAttributes: true })\nuseHead(head)\n// no_prefix 전략이면 언어별 URL 이 없어 hreflang 이 비어 있다 — SEO 페이지는 prefix 전략으로",
      },
      {
        label: "문제가 나는 경우: head 에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                  Next                                    Nuxt\n───────────────────────────────────  ─────────────────────────────────────\n클라이언트 컴포넌트에서 metadata 를 export 했다  서버 컴포넌트만 → 페이지/레이아웃으로         useHead 는 어디서나 (setup 안)\ntitle 이 '%s' 그대로 나온다              template 만 있고 자식이 title 안 줌 → default  titleTemplate 함수형을\n                                                                                nuxt.config 에 → app.vue 로\nOG 이미지가 grid 로 깨진다                ImageResponse 는 flexbox 와 CSS 일부만       —\n봇이 title 을 못 본다 (동적 페이지)        스트리밍 메타데이터 — 봇은 기다림 · htmlLimitedBots 확인  SSR 이면 head 에 있음\n                                     · ssr:false 페이지는 없음\n메타가 한 번만 설정되고 바뀌지 않는다       generateMetadata 는 요청마다 — 캐시 확인       app.head 는 정적 →\n                                                                             useHead/useSeoMeta 로\nfavicon 경로가 CDN 에서 틀리다             파일 규약은 자동 처리                      app.head 의 정적 href 는\n                                                                             cdnURL 미적용 → useHead\n중복 meta 태그                           부모·자식 metadata 병합 규칙 (얕은 병합)      <Meta> 를 <Head> 로 감싸지\n                                                                              않음 · key 로 dedupe\nhreflang 이 없다                         alternates.languages                     useLocaleHead ·\n                                                                                prefix 전략 필요",
        codeLang: "text",
      },
      {
        label: "문제의 구조: head 는 '서버가 완성해야 하는 유일한 UI' 다",
        body: "본문은 스트리밍되고 하이드레이션되고 나중에 바뀌어도 되지만, head 의 title · description · OG · canonical 은 크롤러와 공유 미리보기가 '첫 응답'에서 읽습니다. 그래서 두 프레임워크 모두 메타데이터 API 를 서버 쪽에 두고(Next: 서버 컴포넌트 전용, Nuxt: SSR 에서 Unhead 렌더), 동적 데이터와 묶으며(generateMetadata · 반응형 useSeoMeta), 봇에게는 스트리밍을 멈추고 기다립니다(Next 의 htmlLimitedBots). `ssr: false`(Nuxt) 나 클라이언트에서만 세우는 title 은 크롤러에 안 보인다는 것이 결론이고, i18n 의 hreflang 은 '언어별 URL 이 있어야 의미가 있다'는 조건이 붙습니다.",
      },
      {
        label: "다음 입구",
        body: "head 에 들어가는 또 다른 것 — 폰트 preload · 이미지 preload · 스타일시트 — 와 본문의 이미지 · 폰트 · CSS 최적화가 11장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `generateMetadata` 와 페이지가 같은 데이터를 두 번 받지 않게 하는 방법은?\n2) `app.head` 와 `useHead` 의 차이는?\n3) 동적 페이지에서 봇이 title 을 보게 하는 Next 의 메커니즘은?\n4) `no_prefix` i18n 전략에서 hreflang 이 비는 이유는?",
      },
    ],
    sources: [
      { label: "Next.js — Metadata and OG images", href: `${NEXT}/getting-started/metadata-and-og-images` },
      { label: "Nuxt — SEO and Meta", href: `${NUXT}/getting-started/seo-meta` },
      { label: "Nuxt i18n — useLocaleHead", href: "https://i18n.nuxtjs.org/docs/composables/use-locale-head" },
    ],
  },

  {
    id: "nn-s11",
    name: "11장 · 이미지 · 폰트 · CSS",
    tagline: "프레임워크가 자산을 대신 최적화한다 — 그 대가로 규칙이 생긴다",
    intro:
      "Next 에서는 `next/image` 가 리사이즈 · 포맷 변환 · 지연 로딩 · 레이아웃 시프트 방지를 합니다. 다만 원격 이미지는 `width` · `height`(또는 `fill`)와 `remotePatterns` 허용이 필요합니다. `next/font` 는 Google 폰트를 빌드 때 자체 호스팅합니다. 그래서 '브라우저가 Google 에 요청하지 않고 레이아웃 시프트 없이' 폰트를 씁니다. CSS 는 CSS Modules · 전역 CSS(루트 레이아웃에서) · Tailwind(PostCSS) · Sass 를 쓸 수 있고, 순서는 import 순서를 따릅니다. Nuxt 에서는 `@nuxt/image` 의 `<NuxtImg>` · `<NuxtPicture>` 와 `@nuxt/fonts` 를 씁니다. CSS 는 Vite 의 것(번들링 허브 5장)을 씁니다. 여기에 `app/assets` vs `public/` 의 구분과 `nuxt.config` 의 `css` 배열이 더해집니다.",
    blocks: [
      {
        label: "Next: next/image 와 next/font",
        body: "정적 import 한 이미지는 width · height · blurDataURL 이 자동으로 채워집니다. `public/` 의 파일이나 원격 URL 은 width · height 를 직접 적습니다. 이 값이 비율을 정합니다. 아니면 `fill` 로 부모를 채웁니다. 원격 호스트는 `images.remotePatterns` 에 protocol · hostname · pathname 을 가능한 한 구체적으로 적습니다. `placeholder=\"blur\"` 를 주면 블러업이 됩니다. `next/font/google` 은 `Inter({ subsets: ['latin'] })` 처럼 호출하고, `font.className` 을 요소에 붙입니다. 빌드 때 폰트 파일을 받아 자체 호스팅하므로 런타임에 Google 요청이 없습니다. 가변 폰트를 권장하고, 아니면 `weight` 가 필수입니다. 레이아웃 시프트는 0 입니다. CSS 허브 13장의 size-adjust 를 자동으로 해 주기 때문입니다. `next/font/local` 은 `src` 에 경로를 줍니다. 폰트는 쓰는 컴포넌트 범위에 적용됩니다. 그래서 전체에 쓰려면 루트 레이아웃에 둡니다.",
        code: "// app/layout.tsx\nimport { Inter } from 'next/font/google'\nconst inter = Inter({ subsets: ['latin'], display: 'swap' })   // 빌드 때 자체 호스팅 — 런타임 Google 요청 없음\nexport default function Root({ children }) { return <html lang=\"ko\"\n  className={inter.className}><body>{children}</body></html> }\n\n// 이미지\nimport hero from './hero.png'                                  // width·height·blurDataURL 자동\n<Image src={hero} alt=\"…\" placeholder=\"blur\" priority />\n// 원격: 크기 + remotePatterns\n<Image src=\"https://cdn.example.com/a.jpg\" alt=\"…\" width={800} height={600} />\n// next.config.ts\nimages: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com', pathname: '/images/**' }] }",
      },
      {
        label: "Next: CSS 의 네 길과 순서",
        body: "CSS Modules 는 `*.module.css` 로 지역 클래스를 만듭니다. 번들링 허브의 해시 이름과 같은 것입니다.\n전역 CSS 는 루트 레이아웃에서 import 하고, 모든 라우트에 적용됩니다. 문서는 '라우트 이동 때 스타일시트를 제거하지 않아 충돌이 날 수 있다'고 적습니다.\nTailwind 는 `@tailwindcss/postcss` 와 `@import 'tailwindcss'` 로 씁니다.\n외부 스타일시트는 패키지에서 import 하거나 React 19 의 `<link rel=stylesheet>` 로 넣습니다.\nSass · CSS-in-JS 는 별도 가이드가 있습니다. CSS-in-JS 는 서버 컴포넌트에서 런타임 주입이 안 됩니다. 그래서 라이브러리마다 registry 패턴이 필요합니다.\n순서는 import 순서를 따릅니다. 다만 '빌드가 코드 분할된 파일로 합치니 `next build` 출력에서 확인'해야 합니다. `cssChunking` 옵션으로 조절합니다. 자산 자체는 Turbopack 이 처리합니다. Vite 와 다른 번들러입니다.",
        code: "길              쓰는 곳                                 주의\n─────────────  ─────────────────────────────────────  ─────────────────────────────────────────\nCSS Modules     import styles from './x.module.css'     지역 클래스 (해시)\n전역 CSS         app/layout.tsx 에서 import './globals.css'   라우트 이동 때 제거 안 됨 → 충돌 가능\nTailwind        postcss.config.mjs + @import 'tailwindcss'  v4 (v3 는 별도 가이드)\n외부 CSS         import 'pkg/dist/x.css' · <link rel=stylesheet>  React 19\nCSS-in-JS        'use client' + registry 패턴             서버 컴포넌트에서 런타임 주입 불가\n순서             import 순서 → next build 출력으로 확인    cssChunking",
        codeLang: "text",
      },
      {
        label: "Nuxt: 모듈이 맡는 이미지 · 폰트와 assets vs public",
        body: "Nuxt 에서 이미지와 폰트는 모듈인 @nuxt/image · @nuxt/fonts 가 맡습니다. Nuxt 코어에는 이미지 · 폰트 최적화가 없고, 모듈이 더합니다(14장). `@nuxt/image` 의 `<NuxtImg src width height sizes format=\"webp\" />` 는 IPX(내장)나 CDN provider(Cloudinary · Vercel 등)로 리사이즈·포맷 변환을 합니다. `<NuxtPicture>` 는 `<picture>` 를 만듭니다. `@nuxt/fonts` 는 Google · Bunny 등의 폰트를 자체 호스팅합니다. `font-family` 선언만 하면 자동으로 설정됩니다. CSS 는 `nuxt.config` 의 `css: ['~/assets/css/main.css']` 가 전역입니다. 컴포넌트에는 `<style scoped>` 를 씁니다. Vue 허브에서 본 `[data-v-…]` 속성 선택자입니다. CSS Modules 는 `<style module>` 이고, Tailwind 는 `@nuxtjs/tailwindcss` 모듈로 붙입니다. 자산은 둘로 나뉩니다. `app/assets/` 는 Vite 가 처리해 해시를 붙이거나 인라인합니다(번들링 허브 5장). `public/` 은 그대로 복사됩니다. 실제로 `.output/public` 에 `favicon.ico` · `robots.txt` 가 있었습니다. 외부 스타일시트는 `useHead` 로 링크합니다.",
        code: "// nuxt.config.ts\nexport default defineNuxtConfig({\n  modules: ['@nuxt/image', '@nuxt/fonts', '@nuxtjs/tailwindcss'],\n  css: ['~/assets/css/main.css'],                      // 전역 — Vite 가 처리\n  image: { domains: ['cdn.example.com'] },\n})\n\n<NuxtImg src=\"/hero.jpg\" width=\"800\" height=\"600\" sizes=\"sm:100vw md:50vw\" format=\"webp\" loading=\"lazy\" />\n\n<style scoped>.title { color: var(--brand) }</style>   // → .title[data-v-abc123]  (Vue 허브)\n\napp/assets/img/a.png   → import 처리 (해시 · <4KB 인라인)   // 번들링 허브 5장\npublic/robots.txt      → .output/public/robots.txt 그대로  (실제로)",
      },
      {
        label: "문제가 나는 경우: 자산에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                      Next                                    Nuxt\n───────────────────────────────────────  ─────────────────────────────────────\n'hostname is not configured under images'  원격 호스트 → images.remotePatterns        @nuxt/image domains\n'Image is missing required width/height'   원격·public 이미지 → 크기 또는 fill       NuxtImg 에\n                                                                                width/height (CLS 방지)\n폰트가 매 요청 Google 로 간다                <link> 로 직접 넣음 → next/font 로        @nuxt/fonts 미설치 · 직접 link\nbold 가 안 나온다                           비가변 폰트에 weight 미지정                fonts 설정의 weights\n전역 CSS 가 다른 라우트에 샌다                루트 레이아웃 전역은 제거 안 됨 → Modules/scoped  전역 css: 는 전부 —\n                                        scoped/module 로\nCSS 순서가 개발과 다르다                     next build 출력 확인 · 한 파일에서 import  Vite 가 import 순서로 합침\n                                                                              (번들링 허브)\nstyled-components 가 SSR 에서 깨진다         서버 컴포넌트 → registry 패턴 + 'use client'  CSS-in-JS 는 Vue\n                                          생태계에서 드묾 — scoped 로\n이미지가 빌드 뒤 404                         public/ 은 /name · import 는 경로         assets 는 import ·\n                                                                                 public 은 /name (변수\n                                                                                 경로 X)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 최적화를 프레임워크에 맡기면 '정보' 를 미리 줘야 한다",
        body: "이미지 리사이즈는 크기를, 레이아웃 시프트 방지는 비율을, 포맷 변환은 허용 호스트를, 폰트 자체 호스팅은 빌드 때의 네트워크를 요구합니다. 그래서 next/image 가 width · height · remotePatterns 를, next/font 가 subsets · weight 를 묻고, Nuxt 모듈이 domains · provider 를 묻습니다 — 전부 '런타임에 알 수 없거나 알기엔 늦은 정보'를 빌드 · 설정 시점으로 당긴 것입니다. 거꾸로 그 정보를 못 주는 자산(사용자 업로드, 크기 모르는 외부 이미지)은 `fill` + 부모 비율(CSS 허브의 aspect-ratio) 이나 `unoptimized` 로 빠져나갑니다. CSS 쪽은 두 프레임워크가 번들러(Turbopack · Vite)에 그대로 맡기므로 번들링 허브의 규칙(해시 · 인라인 · 순서)이 그대로 적용됩니다.",
      },
      {
        label: "다음 입구",
        body: "자산이 아니라 '상태'가 서버와 브라우저 사이를 건너는 문제 — 하이드레이션 불일치 · useState(Nuxt) · 요청 간 상태 오염 — 가 12장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 원격 이미지에 next/image 가 요구하는 두 가지는?\n2) next/font 가 '레이아웃 시프트 0' 과 'Google 요청 없음'을 만드는 방법은?\n3) Nuxt 에서 이미지 · 폰트 최적화가 코어에 없는 이유와 대신 쓰는 것은?\n4) 전역 CSS 가 라우트 간에 새는 문제의 Next · Nuxt 각각의 처방은?",
      },
    ],
    sources: [
      { label: "Next.js — Image Optimization", href: `${NEXT}/getting-started/images` },
      { label: "Next.js — Font Optimization", href: `${NEXT}/getting-started/fonts` },
      { label: "Next.js — CSS", href: `${NEXT}/getting-started/css` },
      { label: "Nuxt — Styling", href: `${NUXT}/getting-started/styling` },
    ],
  },

  {
    id: "nn-s12",
    name: "12장 · 상태와 하이드레이션",
    tagline: "서버가 그린 HTML 과 브라우저가 그릴 결과가 같아야 하고, 상태는 요청마다 따로여야 한다",
    intro:
      "하이드레이션은 서버 HTML 에 브라우저가 이벤트와 상태를 붙이는 일입니다. 그 전제는 '둘이 같은 결과를 낸다'입니다. 다르면 경고가 뜹니다(또는 다시 그립니다). 그리고 서버는 요청을 여럿 처리합니다. 그래서 모듈 최상위의 상태는 요청 사이에 공유됩니다. Nuxt 문서는 'setup 밖에 const state = ref() 를 두지 마라'고 적습니다. 이 둘을 다루는 도구가 있습니다. Nuxt 에는 `useState`(SSR 친화 ref, payload 로 넘겨짐) · `callOnce` · Pinia 가 있습니다. Next 에는 서버/클라이언트 상태 분리 · `connection()` · `useId` 가 있습니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: Nuxt useState 가 payload 에 실린다",
        body: "`index.vue` 에 `const count = useState('count', () => 0)` 를 적었습니다. SSR HTML 의 `__NUXT_DATA__` 에 `\"state\":7` 과 `count` 키가 들어 있습니다. 실제로 payload 에 'count' 가 있었습니다. 이 값은 하이드레이션 때 복원됩니다. 그래서 브라우저도 서버가 그린 `0` 과 같은 값에서 출발합니다. 다른 컴포넌트에서 같은 키로 `useState('count')` 를 부르면 같은 ref 를 공유합니다. 전역 상태의 가장 작은 단위입니다. 문서의 규칙은 이렇습니다. 직렬화 가능한 값만 담습니다. 클래스 · 함수 · Symbol 은 안 됩니다. 권장 패턴은 `export const useCounter = () => useState('counter', () => 0)` 입니다. 비동기 초기화는 `callOnce` 로 합니다. 더 크면 Pinia 를 씁니다(`npx nuxt module add pinia`, '공식 Vue 권장'). 상태를 비울 때는 `clearNuxtState` 를 씁니다.",
        code: "<script setup lang=\"ts\">\nconst count = useState('count', () => 0)        // 서버에서 초기화 → payload → 하이드레이션에 복원\n</script>\n<button @click=\"count++\">{{ count }}</button>\n\n$ curl -s localhost:4342/ | grep -o 'count' | head -1\ncount                                             # __NUXT_DATA__ 의 state 에 실려 있다\n\n// 공유 패턴 — composables/useCounter.ts\nexport const useCounter = () => useState<number>('counter', () => 0)\n// 비동기 초기화 — app.vue\nawait callOnce(async () => { config.value = await $fetch('/api/config') })",
      },
      {
        label: "요청 간 상태 오염: 모듈 최상위의 ref",
        body: "Vue 허브의 SSR 장에서 실제로 봤습니다. 모듈 최상위의 `reactive` 가 요청 두 개에 걸쳐 `shared = 1 → 2` 로 늘었습니다. 서버 프로세스는 요청 사이에 모듈을 다시 평가하지 않습니다. 그래서 최상위 상태는 모든 사용자가 공유합니다. Nuxt 문서가 'Never define `const state = ref()` outside of `<script setup>` or `setup()`' 라고 경고하는 이유입니다. 처방은 `const useX = () => useState('x')` 입니다. Next 에서도 같습니다. 서버 컴포넌트 모듈의 최상위 변수에 사용자 데이터를 두면 요청 사이에 샙니다. 요청 범위는 `React.cache` 로 다룹니다. 요청마다 리셋됩니다. 사용자별 캐시는 `'use cache: private'` 를 씁니다. 전역 싱글턴에는 '요청과 무관한 것'(DB 커넥션 풀)만 둡니다.",
        code: "// ✗ 서버에서 모든 요청이 공유한다\nconst currentUser = ref<User | null>(null)          // 모듈 최상위 (Nuxt)\nlet lastViewer: string | null = null                 // 모듈 최상위 (Next 서버 컴포넌트 파일)\n\n// ✓ 요청(=컴포넌트 인스턴스) 범위\nexport const useCurrentUser = () => useState<User | null>('user', () => null)   // Nuxt — payload 로 전달\nconst getUser = cache(async (id: string) => db.user(id))                        // Next — 요청 범위 메모\n\n// 공유해도 되는 것: 요청과 무관한 싱글턴 (DB 풀 · 설정 상수)",
      },
      {
        label: "하이드레이션 불일치: 원인과 처방",
        body: "원인은 전부 '서버와 브라우저가 다른 값을 봄' — `Date.now()` · `Math.random()` · `window.innerWidth` · 로캘 포맷(서버 로캘 ≠ 브라우저) · 브라우저 확장이 끼운 DOM · 잘못된 HTML 중첩(`<p>` 안의 `<div>`). Vue 허브에서 실제로 'Hydration text content mismatch on …' 과 'Hydration completed but contains mismatches.' 를 봤고 `data-allow-mismatch` 가 억제했습니다. 처방 — 값을 서버에서 정해 넘기기(useFetch · useState · props), 브라우저 전용은 `<ClientOnly>`/`useEffect` 뒤로, 고유 id 는 `useId`(React · Vue 3.5 둘 다), 시간 · 랜덤은 Next 의 `connection()` 뒤(Suspense 안)에서 — 'blocking-prerender-random/current-time' 이 빌드 인사이트로 뜹니다. i18n 허브의 '서버 로캘과 브라우저 로캘이 다르면 숫자 포맷이 어긋난다'가 같은 문제입니다.",
        code: "원인                Next 처방                           Nuxt 처방\n─────────────────  ─────────────────────────────────  ────────────────────────────────\nDate.now() · Math.random()  await connection() 뒤 (Suspense 안) · 'use cache'  서버에서 정해 useState/payload\n                                                                              로 · ClientOnly\nwindow · localStorage  useEffect 안 · 'use client'          onMounted · import.meta.client · ClientOnly\n로캘별 포맷 (Intl)    서버에 locale 을 명시 (헤더/쿠키)       같음 — i18n 허브\n고유 id              useId()                              useId() (Vue 3.5)\n잘못된 HTML 중첩      <p> 안 <div> 금지 (React 가 경고)      같음\n확장 프로그램 DOM 변경  suppressHydrationWarning (body/html 속성)  data-allow-mismatch",
        codeLang: "text",
      },
      {
        label: "하이드레이션의 비용과 스트리밍 · 지연",
        body: "하이드레이션은 '컴포넌트 트리를 브라우저에서 한 번 더 실행'하는 일입니다. 그래서 JS 가 크면 TTI(상호작용 가능 시점)가 늦습니다. 줄이는 길은 이렇습니다. Next 에서는 서버 컴포넌트가 하이드레이션 대상이 아닙니다. 브라우저에 코드가 없기 때문입니다. 그래서 클라이언트 컴포넌트를 잎(leaf)으로 밉니다. Suspense 로 부분 스트리밍을 하면 각 경계가 독립적으로 하이드레이션됩니다. `loading.tsx` 도 씁니다. Nuxt 에서는 아일랜드(`.server.vue`)로 비대화형 부분을 서버 전용으로 돌립니다. `<LazyX hydrate-on-visible>`(Vue 3.5 지연 하이드레이션, Vue 허브)을 쓰면 보일 때 하이드레이션합니다. `defineLazyHydrationComponent` 도 있습니다. 전부 `ssr: false` 로 두면 하이드레이션 자체가 없습니다. 대신 첫 화면이 빈 껍데기가 됩니다. 두 프레임워크가 가는 방향은 같습니다. 바로 '브라우저가 실행해야 하는 코드를 줄이고, 나머지는 서버가 끝낸 HTML 로'입니다.",
        code: "Next                                            Nuxt\n서버 컴포넌트 = 하이드레이션 없음 (코드 없음)       .server.vue 아일랜드 = 하이드레이션 없음 (실험적)\n'use client' 를 잎으로 (큰 트리는 서버에)            <LazyX hydrate-on-visible /> (Vue 3.5 지연 하이드레이션)\n<Suspense> 경계마다 독립 하이드레이션                 defineLazyHydrationComponent · lazy useFetch\nloading.tsx (셸 먼저)                              ssr: false (하이드레이션 없음, 빈 첫 화면)",
        codeLang: "text",
      },
      {
        label: "문제가 나는 경우: 상태와 하이드레이션에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                        원인                                  처방\n─────────────────────────────────────────  ───────────────────────────────────\n다른 사용자의 데이터가 보인다                   모듈 최상위 상태 (서버 공유)             useState / React.cache /\n                                                                            요청 범위로\nHydration mismatch 경고                      서버·브라우저 값 다름 (시간·랜덤·window·로캘)  위 표 — 서버에서 정하거나\n                                            클라이언트로 미루기\n새로 고침마다 상태가 사라진다                   useState 는 요청 범위 — 영속 아님          쿠키(useCookie) ·\n                                                                               localStorage(onMounted)\n서버 리다이렉트 뒤 상태 초기화                   Location 헤더 = 새 요청                쿠키에\n카운터가 두 번 증가 / 타이머 둘                  setup 루트의 setInterval 이 서버·클라 둘 다 실행  onMounted +\n                                          onUnmounted\n'Text content does not match server-rendered HTML'(React)  같은 불일치\n                                                           suppressHydrationWarning 은 마지막 수단\n클릭이 한참 안 먹는다                          하이드레이션 전 (큰 번들)                 잎으로 밀기 · 스트리밍 ·\n                                                                              지연 하이드레이션\nSSR 에서 Pinia 스토어가 공유된다                스토어를 모듈 최상위에서 생성               Nuxt Pinia 모듈\n                                                                               (요청마다 인스턴스)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 상태에는 '수명' 이 있고 서버에서는 그 수명이 '요청' 이다",
        body: "브라우저에서 상태의 수명은 탭(또는 저장소)입니다. 그래서 모듈 최상위 변수가 자연스럽습니다. 서버에서는 수명이 '요청 하나'여야 합니다. 그 요청의 상태를 브라우저로 넘겨 이어 가는 통로가 있습니다. Nuxt 는 payload, Next 는 RSC 페이로드와 props 입니다. 하이드레이션 불일치는 '통로를 거치지 않고 양쪽이 각자 값을 만든' 결과입니다. 요청 간 오염은 '수명을 요청보다 길게 둔' 결과입니다. 그래서 규칙은 둘입니다. 상태는 setup/컴포넌트 안에서 만듭니다. 서버가 정한 값은 통로로 넘깁니다. useState · useFetch · useId · connection() · React.cache 가 전부 이 두 규칙의 도구입니다.",
      },
      {
        label: "다음 입구",
        body: "이 모든 것이 돌아가는 서버를 어떻게 설정하고 빌드하고 어디에 올리나 — next.config · output · 어댑터와 nuxt.config · runtimeConfig · Nitro 프리셋 — 가 13장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `useState('count')` 가 서버에서 정한 값으로 브라우저에서 출발하는 메커니즘은?\n2) 모듈 최상위 `ref` 가 서버에서 위험한 이유(Vue 허브의 실제 결과 포함)는?\n3) `Date.now()` 를 Next · Nuxt 에서 각각 어디서 불러야 불일치가 없나요?\n4) 하이드레이션 비용을 줄이는 두 프레임워크의 공통 방향은?",
      },
    ],
    sources: [
      { label: "Nuxt — State Management", href: `${NUXT}/getting-started/state-management` },
      { label: "Next.js — Server and Client Components", href: `${NEXT}/getting-started/server-and-client-components` },
      { label: "Nuxt — Lazy Hydration", href: `${NUXT}/api/utils/define-lazy-hydration-component` },
    ],
  },

  {
    id: "nn-s13",
    name: "13장 · 설정 · 빌드 · 배포",
    tagline: "next.config 와 output · 어댑터, nuxt.config 와 runtimeConfig · Nitro 프리셋",
    intro:
      "Next 의 설정은 `next.config.ts` 에 둡니다(cacheComponents · images · redirects · cacheHandler). `next build` 가 `.next/` 를 만들고, `next start` 가 Node 서버를 띄웁니다. 이 길은 모든 기능을 씁니다. Docker 도 모든 기능을 씁니다. `output: 'export'` 는 정적이라 서버 기능을 쓸 수 없습니다. 어댑터는 `adapterPath` 로 붙이고, Vercel · Bun 이 검증됐습니다. 환경 변수는 `NEXT_PUBLIC_` 만 빌드에 인라인되고, 나머지는 서버 런타임에서 읽습니다. Nuxt 는 `nuxt.config.ts` 의 `runtimeConfig` 를 씁니다. 비공개/public 으로 나뉘고, `NUXT_*` 환경 변수로 런타임에 덮어씁니다. `app.config.ts` 는 빌드 시점 값이라 비밀을 넣으면 안 됩니다. 환경별 설정은 `$production` 처럼 적습니다. `nuxt build` 는 `.output/` 을 만듭니다(Nitro 프리셋 기본 node-server). `nuxt generate` 는 정적으로 만듭니다. `NITRO_PRESET` 으로 Vercel · Cloudflare · Netlify 를 고릅니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: 두 빌드 산출물",
        body: "Next 의 산출물은 `.next/server/app/` 에 있습니다. 라우트마다 `static.html` · `static.rsc` · `static.meta` · `static.segments` 가 생깁니다. 각각 프리렌더 HTML · RSC 페이로드 · 메타 · 세그먼트입니다. `page_client-reference-manifest.js` 도 있습니다. `prerender-manifest.json` 에는 routes(`/ /cached /dashboard /form /posts/1 /posts/2 /static …`)와 dynamicRoutes(`/dyn/[slug] /posts/[id]`)가 적혀 있습니다. `next start` 가 그것을 서빙합니다. 정적 응답에는 `x-nextjs-cache: HIT` 가 붙고, 동적 구멍은 스트리밍됩니다.\n\nNuxt 의 산출물은 `.output/` 입니다. 진입점은 `server/index.mjs` 입니다. `server/chunks/` 에는 routes/api/hello.get.mjs 처럼 핸들러별 청크가 있습니다. `public/` 에는 _nuxt/ 해시 자산 · favicon · robots 가 있습니다. `nitro.json` 에는 preset node-server · nuxt 4.6.4 · nitro 2.13.5 · `commands.preview: node server/index.mjs` 가 적혀 있습니다. 실제로 `PORT=4342 node .output/server/index.mjs` 로 띄워 모든 프로브를 했습니다. 문서에 따르면 `.output` 은 `node_modules` 와 독립입니다. 그 폴더만 복사해 배포합니다.",
        code: "# Next\n.next/server/app/static.html  static.rsc  static.meta  static.segments   # 프리렌더 셋\n.next/prerender-manifest.json  routes: ['/', '/cached', '/dashboard', '/form', '/posts/1', '/posts/2',\n                               '/static', …]\n                               dynamicRoutes: ['/dyn/[slug]', '/posts/[id]']\n$ npm run build && PORT=3000 npm start                                     # Node 서버 — 모든 기능\n\n# Nuxt\n.output/\n  server/index.mjs                       # node .output/server/index.mjs\n  server/chunks/routes/api/hello.get.mjs # 핸들러별 청크\n  public/_nuxt/C2FvM_pq.js               # 해시 자산\n  nitro.json  { preset: 'node-server', framework: { name: 'nuxt', version: '4.6.4' }, versions: { nitro:\n              '2.13.5' } }\n$ PORT=4342 NODE_ENV=production node .output/server/index.mjs",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: Nuxt runtimeConfig 는 런타임에 NUXT_ 로 덮인다",
        body: "`runtimeConfig: { secret: 'server-only', public: { apiBase: '/api' } }` 로 빌드했습니다. 그 뒤 `NUXT_PUBLIC_API_BASE=/v2-from-env NUXT_SECRET=overridden` 환경 변수를 주고 서버를 띄웠습니다. `/config` 가 `apiBase=/v2-from-env secret=overridden` 을 그렸습니다. 다시 빌드하지 않고 값이 바뀐 것입니다. 이것이 번들링 허브 8장의 '한 번 빌드, 환경마다 다른 값'의 답입니다. 규칙은 이렇습니다. 키 이름을 대문자 스네이크로 바꾸고 `NUXT_` 접두어를 붙입니다. public 은 `NUXT_PUBLIC_` 입니다. `useRuntimeConfig()` 로 읽되 비공개 키는 서버에서만 읽습니다. 4장의 '템플릿에 찍으면 HTML 에 들어간다'에 주의해야 합니다. `app.config.ts`(`defineAppConfig`) 는 빌드 시점에 고정되고 반응형이며 HMR 이 됩니다. 환경 변수로는 바꿀 수 없고 비밀은 넣으면 안 됩니다. 테마 · 기능 플래그 같은 공개 설정의 자리입니다. Next 는 서버 코드의 `process.env.X` 가 런타임 값입니다. `NEXT_PUBLIC_X` 만 빌드에 인라인됩니다. 런타임 읽기는 `await connection()` 뒤에 합니다.",
        code: "// nuxt.config.ts\nruntimeConfig: { secret: 'server-only', public: { apiBase: '/api' } }\n\n$ npx nuxt build\n$ NUXT_PUBLIC_API_BASE=/v2-from-env NUXT_SECRET=overridden node .output/server/index.mjs\n$ curl -s localhost:4342/config | grep -o 'apiBase=[^ ]* secret=[^ ]*'\napiBase=/v2-from-env secret=overridden              # 재빌드 없이 바뀜\n\n키 → 환경 변수:  runtimeConfig.apiSecret → NUXT_API_SECRET   runtimeConfig.public.apiBase →\n  NUXT_PUBLIC_API_BASE\n\n            runtimeConfig          app.config.ts\n환경 변수     ✓ (NUXT_*)             ✗\n요청마다      ✗                     ✓ (반응형 · HMR)\n비밀         ✓ (비공개 키)           ✗\n\n// Next\nprocess.env.DATABASE_URL        // 서버 런타임 (connection() 뒤에 읽으면 요청 시점)\nprocess.env.NEXT_PUBLIC_API     // 빌드에 인라인 — 클라이언트 번들",
        codeLang: "bash",
      },
      {
        label: "배포 타깃",
        body: "Next 의 표는 이렇습니다.\nNode.js 서버(`next build` + `next start`)는 모든 기능을 씁니다.\nDocker 도 모든 기능을 씁니다. 템플릿에 `output: 'standalone'` 을 두면 필요한 파일만 모은 독립 폴더가 나옵니다.\n정적 export(`output: 'export'`)는 서버가 필요한 기능을 쓸 수 없습니다. Server Actions · 동적 라우트의 요청 시 렌더 · proxy · ISR 이 그것입니다.\n어댑터(`adapterPath`)는 Vercel · Bun 이 검증되었고, Cloudflare · Netlify 는 자체 통합입니다.\n자체 호스팅 가이드도 있습니다. 이미지 최적화는 `next start` 에 내장되어 있습니다. 캐시는 메모리 50MB + 디스크가 기본이라 다중 인스턴스면 `cacheHandler`(Redis · S3) 와 `cacheMaxMemorySize: 0` 을 씁니다. `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` 와 `deploymentId` 는 인스턴스 간에 통일합니다. nginx 뒤에서 스트리밍하려면 `X-Accel-Buffering: no` 를 둡니다.\nNuxt 는 `nitro.preset` 또는 `NITRO_PRESET` 으로 정합니다. node-server 가 기본이고 node_cluster · vercel · vercel-edge · netlify · cloudflare-pages · static 등이 있습니다. 자동 감지도 됩니다. Vercel 에 올리면 vercel 이 됩니다. 환경 변수는 `NITRO_PORT`/`PORT`(3000) · `NITRO_HOST`(0.0.0.0) · `NUXT_APP_BASE_URL` 입니다. 정적은 `nuxt generate` 입니다. `200.html` · `404.html` 폴백을 실제로 생성합니다. `ssr: false` 면 빈 `<div id=\"__nuxt\">` SPA 껍데기가 나옵니다.",
        code: "타깃          Next.js 16                               Nuxt 4\n───────────  ──────────────────────────────────────  ─────────────────────────────────────────\nNode 서버     next start (모든 기능)                     node .output/server/index.mjs (node-server 기본)\nDocker        output: 'standalone' + next start         .output 만 복사\n정적          output: 'export' (서버 기능 불가)            nuxt generate (서버 엔드포인트 불가 · 200/404.html)\n서버리스/엣지  어댑터 (Vercel · Bun 검증)                  NITRO_PRESET=vercel · cloudflare-pages · netlify-edge\n다중 인스턴스  cacheHandler 공유 · encryption key · deploymentId  Nitro storage 드라이버 (redis) · node_cluster\n환경 변수     NEXT_PUBLIC_ 빌드 인라인 · 나머지 런타임       NUXT_* 런타임 덮어쓰기 (runtimeConfig)",
        codeLang: "text",
      },
      {
        label: "문제가 나는 경우: 빌드와 배포에서",
        body: "두 프레임워크에서 자주 보는 것들입니다.",
        code: "증상                                       Next                                    Nuxt\n────────────────────────────────────────  ─────────────────────────────────────\n'output: export' 에서 Server Action/동적 라우트 에러  정적 export 는 서버 기능 불가 → Node/어댑터    nuxt generate\n                                                 에서 /api 404 → nuxt build\n환경 변수를 바꿨는데 안 바뀐다                  NEXT_PUBLIC_ 은 빌드 인라인 → 재빌드       runtimeConfig 가 아닌\n                                                                               app.config →\n                                                                               runtimeConfig 로\n비밀이 클라이언트에                           NEXT_PUBLIC_ 붙임                       public 에 두었거나 템플릿에 찍음\n인스턴스마다 캐시가 다르다                      인메모리 → cacheHandler                  Nitro 인메모리 →\n                                                                                storage 드라이버\nServer Action 이 다른 인스턴스에서 실패          encryption key 다름 → NEXT_SERVER_ACTIONS_ENCRYPTION_KEY  —\nnginx 뒤에서 스트리밍이 안 된다                  버퍼링 → X-Accel-Buffering: no            같음 (Nitro 스트리밍)\n'blocking-prerender' 로 빌드 실패              3장 — Suspense/use cache/instant=false    —\nVue Router 경고가 프로덕션에                     —                                     NODE_ENV=production 누락\n하위 경로에 배포했는데 자산 404                  basePath                               NUXT_APP_BASE_URL /\n                                                                                 app.baseURL",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 빌드는 '결정을 고정' 하고 런타임은 '남은 것을 채운다'",
        body: "빌드 시점에 고정되는 것은 라우트 트리, 정적 HTML(○), RSC/payload 포맷, `NEXT_PUBLIC_`/`app.config` 값, 청크와 해시입니다. 런타임에 채워지는 것은 동적 구멍(◐ ƒ), 서버 환경 변수(`process.env` · `NUXT_*`), 캐시 내용, 요청별 데이터입니다. 배포 타깃의 선택은 '런타임이 있는가'(Node/서버리스/엣지) 또는 '없는가'(정적 export/generate)의 선택입니다. 없으면 런타임에 채우는 것 전부를 포기합니다. Nuxt 의 runtimeConfig 가 번들링 허브의 '빌드 시점 치환' 문제를 푼 것입니다. Next 는 서버 코드의 process.env 가 그 자리입니다. 그래서 '한 번 빌드해 여러 환경에'는 두 프레임워크 모두 '서버 런타임이 있을 때만' 성립합니다.",
        code: "빌드 시점 (고정)                              런타임 (채움)                          필요한 것\n라우트 트리 · ○ HTML · 청크/해시              ◐ ƒ 구멍 · 요청별 데이터                 서버\nNEXT_PUBLIC_* · app.config.ts                 process.env.* · NUXT_* runtimeConfig    서버\nprerender-manifest · nitro.json               캐시 내용 (cacheHandler · storage)       서버 (+ 공유 저장소)\n정적 export / generate = 왼쪽만 — 오른쪽 전부 포기",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "마지막 장은 두 프레임워크를 '늘리는' 길 — Nuxt 의 모듈 · 레이어 · Nuxt Kit, Next 의 next.config 플러그인 · 어댑터 — 와 commerce-web 같은 실무 Nuxt 앱이 이 허브의 어디에 서 있는가입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `.output/nitro.json` 이 적는 것과 `.output` 만 복사해 배포할 수 있는 이유는?\n2) `NUXT_PUBLIC_API_BASE` 가 재빌드 없이 값을 바꾼 메커니즘은?\n3) Next 에서 `output: 'export'` 가 포기하는 기능들은?\n4) 다중 인스턴스에서 Next 가 요구하는 두 설정은?",
      },
    ],
    sources: [
      { label: "Next.js — Deploying", href: `${NEXT}/getting-started/deploying` },
      { label: "Next.js — Self-Hosting", href: `${NEXT}/guides/self-hosting` },
      { label: "Nuxt — Configuration", href: `${NUXT}/getting-started/configuration` },
      { label: "Nuxt — Deployment", href: `${NUXT}/getting-started/deployment` },
    ],
  },

  {
    id: "nn-s14",
    name: "14장 · 확장 — 모듈 · 레이어 · 어댑터",
    tagline: "프레임워크를 늘리는 공식 통로와, 실무 앱이 그 위에 서는 자리",
    intro:
      "Nuxt 의 확장은 두 겹입니다. 하나는 모듈입니다. `modules: []` 에 등록하는 빌드 시점 async 함수이고, `defineNuxtModule` + Nuxt Kit 으로 플러그인 · 컴포넌트 · 서버 라우트 · 템플릿을 끼웁니다. @nuxtjs/i18n · @nuxt/image · @pinia/nuxt 가 전부 이것입니다. 다른 하나는 레이어입니다. `extends` 로 다른 Nuxt 앱 조각의 pages · components · server · config 를 통째로 상속합니다. 디자인 시스템이나 멀티 브랜드에 씁니다. Next 의 확장은 `next.config.ts` 를 감싸는 플러그인(`withMDX` · `withSentry`), 배포 어댑터 API, 그리고 React 생태계 그대로입니다. 이 장은 둘을 비교하고, commerce-web(Nuxt 3 · @nuxtjs/i18n · vue-i18n)이 이 허브의 어디에 서 있는지 적습니다.",
    blocks: [
      {
        label: "Nuxt 모듈: 빌드 시점에 Nuxt 를 바꾸는 함수",
        body: "문서는 '모듈은 nuxt dev · nuxt build 때 순서대로 실행되는 async 함수'이고 '빌드 시점 전용'이라고 적습니다. Nuxt 2 의 buildModules 는 폐기되었습니다. 등록은 `modules: ['@nuxtjs/i18n', ['@nuxt/image', { … }], './modules/local', async (opts, nuxt) => {}]` 처럼 합니다. 끄려면 모듈의 설정 키를 `false` 로 둡니다(4.3). 만들 때는 `defineNuxtModule({ meta, defaults, setup(options, nuxt) })` 안에서 Nuxt Kit 의 `addPlugin` · `addComponent` · `addImports` · `addServerHandler` · `addTemplate` · `extendPages` · `nuxt.hook('…')` 을 부릅니다. 모듈이 할 수 있는 일이 넓습니다. 라우트 추가 · 자동 import · 서버 미들웨어 · Vite 설정 변경이 다 됩니다. 그래서 i18n 같은 '횡단 관심사'가 모듈로 배포됩니다. commerce-web 의 `@nuxtjs/i18n` 10.x 가 그 예입니다. vue-i18n 플러그인 등록 · `useI18n` 자동 import · 로캘 감지 미들웨어 · `nuxt.config` 의 `i18n` 블록(locales · strategy · langDir · cookie)을 전부 모듈이 끼웁니다.",
        code: "// nuxt.config.ts\nexport default defineNuxtConfig({\n  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/image', './modules/analytics'],\n  i18n: { locales: ['ko', 'en', 'ja'], defaultLocale: 'ko', strategy: 'no_prefix' },   // 모듈이 읽는 키\n  image: false,                                                                         // 4.3: 끄기\n})\n\n// modules/analytics/index.ts\nimport { defineNuxtModule, addPlugin, addServerHandler, createResolver } from 'nuxt/kit'\nexport default defineNuxtModule({\n  meta: { name: 'analytics', configKey: 'analytics' }, defaults: { id: '' },\n  setup(options, nuxt) {\n    const { resolve } = createResolver(import.meta.url)\n    addPlugin(resolve('./runtime/plugin.client'))                        // 클라이언트 플러그인\n    addServerHandler({ route: '/api/_analytics', handler: resolve('./runtime/server') })\n    nuxt.options.runtimeConfig.public.analyticsId = options.id          // 런타임 설정 주입\n  },\n})",
      },
      {
        label: "Nuxt 레이어: 앱 조각을 상속한다",
        body: "레이어는 `nuxt.config.ts` 를 가진 디렉터리입니다. `extends: ['./base', 'github:org/repo', 'npm-pkg']` 로 가져옵니다. 자동으로 합쳐지는 것은 `app/components · composables · layouts · middleware · pages · plugins · utils · app.config.ts`, `server/*`, 그리고 defu 로 병합되는 `nuxt.config.ts` 입니다. 우선순위는 프로젝트 파일 > `~~/layers/`(알파벳순, 번호 접두어로 조절) > `extends`(앞이 이김) 순입니다. 함정이 있습니다. 레이어 안의 `~/` `@/` 별칭은 '사용자 프로젝트'를 가리킵니다. 상대 경로도 프로젝트 기준입니다. 그래서 레이어 안에서는 상대 import 나 전체 경로를 씁니다. 별칭이 필요하면 `$meta.name` 으로 `#layers/<name>` 을 씁니다. 쓰는 자리는 여러 앱이 공유하는 디자인 시스템 · 인증 · i18n 설정, 멀티 브랜드(기본 레이어 + 브랜드별 덮어쓰기), 모노레포의 공통 서버 라우트입니다. Next 에는 대응이 없습니다. 모노레포 패키지 + 컴포넌트 라이브러리로 합니다.",
        code: "// nuxt.config.ts (앱)\nexport default defineNuxtConfig({ extends: ['../layers/design-system', '../layers/auth',\n  'github:my-org/nuxt-base#v2'] })\n\n우선순위 (높음 → 낮음)\n프로젝트 app/  >  ~~/layers/01-brand  >  ~~/layers/02-core  >  extends[0]  >  extends[1]\n\n// 레이어 안에서 — ~/ 는 사용자 프로젝트를 가리킨다!\nimport { x } from '~/utils/x'          // ✗ 레이어가 아니라 앱의 utils\nimport { x } from './utils/x'          // ✓ 상대\nimport { x } from '#layers/design-system/utils/x'   // ✓ 별칭 ($meta.name)",
      },
      {
        label: "Next 의 확장: config 플러그인 · 어댑터 · 생태계",
        body: "Next 는 '모듈 시스템'이 없습니다. 확장은 셋입니다.\n(1) `next.config.ts` 를 감싸는 고차 함수 플러그인입니다. `withMDX(config)` · `withSentryConfig` · `withBundleAnalyzer` 가 그것이고, 번들러(Turbopack) 설정과 리라이트를 주입합니다.\n(2) 배포 어댑터 API(`adapterPath`)입니다. 빌드 출력을 플랫폼이 소비하는 모양으로 바꿉니다. Vercel · Bun 이 검증되었습니다.\n(3) React 생태계를 그대로 씁니다. 데이터는 SWR · TanStack Query, 상태는 Zustand · Jotai, 폼은 react-hook-form 입니다. i18n 은 next-intl 이고, 서버 컴포넌트 지원이 핵심 기준입니다.\nNext 자체는 `instrumentation.ts`(OpenTelemetry) · `instrumentation-client.ts` · `mdx-components.tsx` 같은 파일 규약으로 끼울 자리를 줍니다. 결과적으로 Nuxt 의 '모듈 하나 추가'가 Next 에서는 '패키지 설치 + Provider 배치 + config 감싸기' 세 걸음이 되는 경우가 많습니다. 반대로 Next 는 React 생태계의 선택지가 넓습니다.",
        code: "// next.config.ts — 플러그인은 config 를 감싸는 함수\nimport createMDX from '@next/mdx'\nimport { withSentryConfig } from '@sentry/nextjs'\nconst withMDX = createMDX({})\nconst config: NextConfig = { cacheComponents: true, pageExtensions: ['ts', 'tsx', 'mdx'] }\nexport default withSentryConfig(withMDX(config), { … })\n\n// 파일 규약으로 끼우는 자리\ninstrumentation.ts            // 서버 시작 (OpenTelemetry)\ninstrumentation-client.ts     // 클라이언트 초기화\nmdx-components.tsx            // MDX 컴포넌트 매핑\nproxy.ts                      // 8장",
      },
      {
        label: "실무 앱이 서는 자리: commerce-web (Nuxt) 을 이 허브로 읽기",
        body: "i18n 허브의 진단을 이 허브의 장 번호로 다시 놓으면 이렇습니다.\n2장: `pages/` + `strategy: 'no_prefix'` 입니다. 언어별 URL 이 없어서 10장의 hreflang 공백으로 이어집니다.\n3장: universal SSR 에 routeRules 캐시가 없습니다. 상품 목록이 `swr` 후보입니다.\n4장: `locale.value ===` 분기 16곳이 서버·클라이언트 둘 다에서 실행됩니다. 쿠키 기반 로캘이라 불일치 위험은 낮습니다.\n5장: `useFetch`/`$fetch` 와 `getLocalizedValue` 가 ~150 호출입니다. 서버 데이터 폴백은 `[locale,'en','ko',…]` 입니다.\n8장: `server/middleware/strip-i18n-cookie.ts` · `locale-vary.ts` 가 가로채는 층입니다. Vary 헤더로 캐시를 분리합니다.\n13장: `plugins/lang-query.ts` · `i18n-cookie.client.ts` 가 생명주기의 플러그인 자리입니다. 번역 파이프라인(Sheets → CSV → JSON)은 빌드 시점입니다.\n14장: `@nuxtjs/i18n` 모듈이 전부를 끼웁니다.\n이 지도가 있으면 '어느 장을 고치면 어느 증상이 사라지나'가 한 번에 읽힙니다. 예를 들어 캐시(6장)를 켜려면 로캘이 키에 들어가야 합니다(`locale-vary.ts` 가 그 근거입니다). SEO(10장)를 하려면 2장의 전략을 바꿔야 합니다.",
        code: "장     commerce-web 의 자리                                      메모\n────  ──────────────────────────────────────────────────────  ─────────────────────────────────────\n2     pages/ · @nuxtjs/i18n strategy no_prefix                 언어별 URL 없음\n3     universal SSR · routeRules 없음                            상품 목록 swr 후보 — 단 로캘별 키\n4     locale.value === 분기 16 · 쿠키 기반                      서버·클라 같은 쿠키 → 불일치 낮음\n5     useFetch · $fetch · getLocalizedValue ~150                 서버 데이터 폴백 체인\n6     (없음)                                                   Nitro 캐시 켜면 Vary/키에 로캘 필수\n8     server/middleware strip-i18n-cookie · locale-vary          가로채는 층 — Vary 헤더\n10    useLocaleHead 0                                           no_prefix 라 hreflang 무의미\n13    plugins/lang-query · i18n-cookie.client · Sheets 파이프라인  런타임 플러그인 · 빌드 시점 번역\n14    @nuxtjs/i18n 10 · vue-i18n 11                               모듈이 전부 끼움",
        codeLang: "text",
      },
      {
        label: "문제가 나는 경우: 확장에서",
        body: "모듈 · 레이어 · 플러그인에서 자주 보는 것들입니다.",
        code: "증상                                       Nuxt                                    Next\n────────────────────────────────────────  ─────────────────────────────────────\n모듈 설정이 안 먹는다                        configKey 이름 · 모듈 순서 (뒤가 앞을 덮음)  플러그인 감싸는 순서 (바깥이 마지막)\n레이어의 ~/ import 가 앱 파일을 가리킨다       별칭은 프로젝트 기준 → 상대/#layers         —\n레이어 컴포넌트가 앱 것에 덮이지 않는다 / 덮인다  우선순위: 프로젝트 > layers/ > extends      —\n자동 import 가 레이어에서 깨진다               imports.scan: false 가 레이어 덮어쓰기 기능을 깸  —\n모듈을 끄고 싶다                              설정 키 false (4.3)                      config 에서 플러그인 제거\ni18n 라이브러리가 서버 컴포넌트에서 안 된다      — (Nuxt 는 둘 다 실행)                     RSC 지원\n                                                                                라이브러리(next-intl) 선택\n빌드 시점 모듈 로직이 런타임에 필요하다          모듈은 빌드 전용 → runtime/ 플러그인으로 분리  instrumentation.ts\nNuxt 2 의 buildModules                       폐기 → modules                          —",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 빌드 시점 확장과 런타임 확장의 갈림",
        body: "확장은 '빌드 시점에 프레임워크를 바꾸는 것'과 '런타임에 앱을 바꾸는 것'으로 갈립니다. Nuxt 모듈은 빌드 시점에만 돌며 Nuxt 의 설정 · 파일 트리 · 번들러를 바꿉니다. 런타임에 필요한 것은 모듈이 `addPlugin`/`addServerHandler` 로 끼운 '런타임 파일'이 합니다. 그래서 모듈 패키지는 `module.ts`(빌드) + `runtime/`(런타임) 두 폴더입니다. 레이어는 그 둘을 '앱 조각' 단위로 상속하는 것입니다. Next 는 빌드 시점 확장을 config 감싸기와 어댑터로 합니다. 런타임 확장은 React 컴포넌트 · Provider · 파일 규약으로 합니다. 두 프레임워크를 늘릴 때의 질문은 같습니다. '이 일은 빌드 때 한 번인가(설정 · 코드 생성 · 라우트 추가), 요청마다인가(플러그인 · 미들웨어 · 컴포넌트)'입니다. 이 허브 전체의 결론도 그 질문입니다. 라우팅 · 프리렌더 · 청크는 빌드 때입니다. 동적 구멍 · 캐시 · 변경 · 상태는 요청 때입니다. 그리고 두 시점을 잇는 통로(payload · RSC · runtimeConfig)가 메타 프레임워크가 라이브러리 위에 더한 것의 전부입니다.",
      },
      {
        label: "다음 입구",
        body: "Next · Nuxt 허브의 끝이고, 이론 허브들의 끝입니다. 여기서 되돌아가는 자리 — 라이브러리 쪽은 React 허브(RSC · Suspense · 'use client')와 Vue 허브(SSR · 하이드레이션 · 지연 하이드레이션), 번들러 쪽은 번들링 허브(Vite · 환경 변수 · 청크), 다국어 쪽은 i18n 허브(commerce-web 진단), 그리고 브라우저가 HTML 을 그리는 과정은 렌더링 허브입니다.",
      },
      {
        label: "확인 질문",
        body: "1) Nuxt 모듈이 '빌드 시점 전용'인데 런타임 동작을 끼우는 방법은?\n2) 레이어 안에서 `~/` 를 쓰면 안 되는 이유는?\n3) Next 에서 Nuxt 모듈에 해당하는 세 가지 확장 길은?\n4) commerce-web 에 라우트 캐시(swr)를 켜려면 먼저 무엇이 키에 들어가야 하나요?",
      },
    ],
    sources: [
      { label: "Nuxt — Modules", href: `${NUXT}/guide/concepts/modules` },
      { label: "Nuxt — Authoring Nuxt Layers", href: `${NUXT}/guide/going-further/layers` },
      { label: "Nuxt — Nuxt Kit", href: `${NUXT}/guide/going-further/kit` },
      { label: "Next.js — next.config.js", href: `${NEXT}/api-reference/config/next-config-js` },
    ],
  },
];
