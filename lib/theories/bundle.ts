import type { Theory } from ".";

/**
 * 번들링과 Vite — vite.dev 의 가이드와 설정 레퍼런스를 따라 열두 장으로 세운다.
 *
 * 번들러가 하는 일(해석 · 변환 · 묶기 · 분할 · 해시)과 Vite 가 그 일을 개발과 배포에서 다르게 하는 이유
 * (개발은 네이티브 ESM 으로 요청 시 변환, 배포는 Rolldown 으로 묶기)를 장마다 하나씩 다룬다.
 * '실제로 돌려 보면' 은 Vite 8.3.8(Rolldown · Oxc · Lightning CSS) 을 Node v24.20.0 에서 돌린 결과다 —
 * scratchpad/bundle-demo/vite-demo 에서 vite build · vite dev(curl 로 변환 결과 확인) · vite optimize ·
 * 플러그인 · HMR(Chrome 156, ego-browser) 을 돌렸다. 출처는 vite.dev/guide 와 vite.dev/config 이다.
 */

const VITE = "https://vite.dev";

export const bundleTheories: Theory[] = [
  {
    id: "bundle",
    name: "번들링과 Vite",
    tagline: "소스 파일 수백 개를 브라우저가 먹을 수 있는 모양으로 바꾸는 일",
    intro:
      "브라우저는 import 문을 읽을 수 있지만, 수백 개의 파일을 하나씩 요청하면 느리고, TypeScript · JSX · CSS 모듈 · 이미지는 그대로 읽지 못합니다. 번들러는 import 그래프를 따라가며(해석) 각 파일을 브라우저용으로 바꾸고(변환) 적은 수의 파일로 묶어(번들) 필요한 만큼 쪼개고(분할) 캐시 가능한 이름을 붙입니다(해시). Vite 는 그 일을 개발과 배포에서 다르게 합니다 — 개발은 묶지 않고 브라우저의 네이티브 ESM 에 요청 시 변환으로 응답하고, 배포는 Rolldown 으로 묶습니다. 열두 장은 그 두 모드와 그 사이의 모든 도구를 다룹니다.",
    blocks: [
      {
        label: "열두 장을 나눈 선",
        body: "앞의 넷(왜 묶나 · 의존성 해석 · 개발 서버 · HMR)은 개발 모드의 이야기입니다. 가운데 셋(CSS 와 자산 · 프로덕션 빌드 · 트리 셰이킹과 분할)은 배포 모드. 뒤의 다섯(환경 변수 · 플러그인 · SSR 과 라이브러리 · 설정 · 성능과 트러블슈팅)은 두 모드에 걸칩니다. Vite 문서의 '가이드'가 이 순서에 가깝고, '설정 레퍼런스'는 11장에 모았습니다.",
        code: "개발 모드 (묶지 않음)              배포 모드 (묶음)                    두 모드에 걸침\n────────────────────────────  ──────────────────────────────  ───────────────────────────\n1 왜 묶는가                     5 CSS 와 정적 자산                 8 환경 변수와 모드\n2 의존성 해석과 사전 번들링        6 프로덕션 빌드 — Rolldown        9 플러그인 API\n3 개발 서버 — 요청 시 변환        7 트리 셰이킹과 코드 분할           10 SSR · 백엔드 통합 · 라이브러리\n4 HMR                                                            11 설정 레퍼런스\n                                                                 12 성능과 트러블슈팅",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 같은 소스가 개발과 배포에서 다른 모양이 된다",
        body: "`npm create vite@latest -- --template vanilla-ts` 로 만든 프로젝트(Vite 8.3.8)에 lodash-es · CSS 모듈 · SVG · 동적 import · .env 를 더해 두 모드로 돌렸습니다. 개발 서버의 index.html 은 `<script type=\"module\" src=\"/@vite/client\">` 와 `/src/main.ts` 두 줄이고, `/src/main.ts` 를 curl 하면 TypeScript 가 벗겨진 ESM 에 `import.meta.env` 객체가 끼워지고 `lodash-es` 가 `/node_modules/.vite/deps/lodash-es.js?v=74ed4849` 로 바뀐 파일이 옵니다 — 묶지 않고 파일 하나를 변환해 보낸 것. `vite build` 는 651 개 모듈을 변환해 `dist/assets/index-DtXQI08K.js`(5.43kB) · `heavy-9Q5z2xLI.js`(동적 import 청크) · `index-D3pLvTLE.css` 셋으로 묶었고 index.html 이 그것을 가리킵니다.",
        code: "# 개발 — 묶지 않음\n$ curl localhost:4330/\n<script type=\"module\" src=\"/@vite/client\"></script>\n<script type=\"module\" src=\"/src/main.ts\"></script>\n$ curl localhost:4330/src/main.ts | head -3\nimport { createHotContext as __vite__createHotContext } from \"/@vite/client\";import.meta.hot = __vite__createHotContext(\"/src/main.ts\");import.meta.env = {\"BASE_URL\": \"/\", \"DEV\": true, \"MODE\": \"development\", \"PROD\": false, \"SSR\": false, \"VITE_API_URL\": \"https://api.example.com\"};import \"/src/style.css\";\nimport { used } from \"/src/util.ts\";\nimport \"/node_modules/.vite/deps/lodash-es.js?v=74ed4849\";\n\n# 배포 — 묶음\n$ npx vite build\nvite v8.3.8 building client environment for production...\n✓ 651 modules transformed.\ndist/index.html                 0.45 kB │ gzip: 0.29 kB\ndist/assets/index-D3pLvTLE.css  4.13 kB │ gzip: 1.48 kB\ndist/assets/heavy-9Q5z2xLI.js   0.11 kB │ gzip: 0.12 kB\ndist/assets/index-DtXQI08K.js   5.43 kB │ gzip: 2.46 kB\n✓ built in 542ms",
        codeLang: "bash",
      },
      {
        label: "문제의 구조: 번들러의 다섯 일",
        body: "어느 번들러든 하는 일은 다섯입니다. (1) 해석(resolve) — `import x from 'lodash-es'` 의 문자열을 파일 경로로. (2) 변환(transform) — .ts · .vue · .css · .svg 를 JS 또는 브라우저 자원으로. (3) 묶기(bundle) — 모듈 그래프를 파일 몇 개로. (4) 분할(split) — 동적 import 경계와 공유 의존성에서 청크로. (5) 해시(hash) — 내용 기반 파일명으로 영구 캐시. Vite 는 개발에서 (1)(2) 만 요청마다 하고 (3)(4)(5) 를 생략합니다 — 브라우저가 ESM 그래프를 직접 따라가니까. 배포에서는 Rolldown 이 다섯을 전부 합니다. 각 장이 이 중 어느 일인지를 먹여 두면 설정 옵션(resolve.* · css.* · build.*)이 어느 단계의 것인지 바로 읽힙니다.",
        code: "소스 그래프                 ① 해석         ② 변환           ③ 묶기 ④ 분할 ⑤ 해시\nmain.ts ──import──► util.ts   'lodash-es'    TS → JS (Oxc)     index-[hash].js\n        ──import──► style.css  → node_modules  CSS → <style>/.css  index-[hash].css\n        ──import()─► heavy.ts  확장자 추론     SVG → URL/인라인    heavy-[hash].js (분할 경계)\n\n개발: ①② 를 요청마다 · ③④⑤ 없음 (브라우저 ESM)\n배포: ①~⑤ 전부 (Rolldown)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "1장 '왜 묶는가'부터입니다. 그 장이 '개발은 안 묶고 배포는 묶는' 결정의 근거이고, 나머지 장이 그 결정의 결과들입니다. 번들러 밖의 이야기 — 브라우저가 ESM 을 어떻게 읽고 실행하는가 — 는 JavaScript 허브의 모듈 장과 렌더링 허브의 스크립트 장에, 모듈 해석 규칙(package.json exports · 확장자)은 TypeScript 허브의 모듈 참고서에 있습니다.",
      },
    ],
    sources: [
      { label: "Vite — Getting Started", href: `${VITE}/guide/` },
      { label: "Vite — Why Vite", href: `${VITE}/guide/why` },
      { label: "Vite — Config Reference", href: `${VITE}/config/` },
    ],
  },

  {
    id: "bundle-s1",
    name: "1장 · 왜 묶는가 — 모듈과 요청과 브라우저 ESM",
    tagline: "개발은 묶지 않아도 되고, 배포는 아직 묶어야 한다",
    intro:
      "Vite 문서 'Why Vite' 의 두 문제 — 느린 개발 서버 시작, 느린 갱신 — 는 전부 '시작하기 전에 전부 묶는' 번들 기반 개발 서버의 비용입니다. 브라우저가 ESM 을 읽게 되자 Vite 는 개발을 둘로 갈랐습니다. 의존성은 한 번 사전 번들링하고, 소스는 브라우저가 요청할 때 그 파일만 변환해 네이티브 ESM 으로 보냅니다. 배포는 여전히 묶습니다 — 묶지 않은 ESM 은 중첩 import 마다 네트워크 왕복이 생기기 때문입니다. 지금의 도구 사슬은 Rolldown(묶기)과 Oxc(파싱 · 변환 · 압축)이고, esbuild 와 Rollup 은 8 에서 물러났습니다.",
    blocks: [
      {
        label: "번들 기반 개발 서버 vs 네이티브 ESM 개발 서버",
        body: "문서의 두 그림. 번들 기반 — 진입점에서 모든 모듈을 따라가 하나로 묶은 뒤에야 서버가 준비되므로 프로젝트가 클수록 시작이 느리고, 파일 하나를 고쳐도 번들을 다시 만듭니다. 네이티브 ESM — 서버는 즉시 뜨고(`VITE v8.3.8 ready in 53 ms` 가 실제 출력), 브라우저가 `<script type=module>` 의 import 를 따라 파일을 요청할 때 그 파일만 변환합니다. 화면에 안 보이는 모듈은 아예 변환되지 않습니다. 갱신도 바뀐 모듈과 그 경계까지만 다시 받습니다(4장 HMR).",
        code: "번들 기반 (webpack 식)                        네이티브 ESM (Vite dev)\n────────────────────────────────────────    ──────────────────────────────────────────\n진입점 → 전부 해석·변환·묶기 → 서버 준비        서버 준비 (53ms) → 브라우저가 import 요청 → 그 파일만 변환\n파일 1개 수정 → 번들 재생성 (크면 수 초)         파일 1개 수정 → 그 모듈만 무효화 (HMR)\n안 보이는 모듈도 변환                            요청된 모듈만 변환",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 요청 하나가 모듈 하나다",
        body: "개발 서버의 index.html 은 소스 그대로에 `/@vite/client`(HMR 클라이언트, 222,796 바이트)만 끼운 것이고, `/src/main.ts` 요청에 Vite 가 그 파일 하나를 변환해 돌려줍니다 — TypeScript 가 벗겨지고, 상대 import 가 절대 URL(`/src/util.ts`)로, 베어 import 가 사전 번들 경로로 바뀌어 있습니다. 소스맵은 데이터 URI 로 끝에 붙습니다. 브라우저는 그 응답을 ESM 으로 실행하고 안의 import 들을 또 요청합니다. 그래서 개발 중 네트워크 탭에 파일이 수십 개 보이는 것이 정상이고, 그 각각이 '변환된 소스 파일 하나'입니다.",
        code: "$ curl -s localhost:4330/src/main.ts\nimport { createHotContext as __vite__createHotContext } from \"/@vite/client\";\nimport.meta.hot = __vite__createHotContext(\"/src/main.ts\");\nimport.meta.env = {\"BASE_URL\": \"/\", \"DEV\": true, \"MODE\": \"development\", …};\nimport \"/src/style.css\";\nimport styles from \"/src/styles.module.css\";\nimport { used } from \"/src/util.ts\";                              # 상대 → 절대 URL\nimport logoUrl from \"/src/assets/typescript.svg?import&url\";\nimport \"/node_modules/.vite/deps/lodash-es.js?v=74ed4849\";        # 베어 import → 사전 번들\n…\n//# sourceMappingURL=data:application/json;base64,…\n\n$ curl -s localhost:4330/@vite/client | wc -c\n222796                                                             # HMR 클라이언트",
        codeLang: "bash",
      },
      {
        label: "배포는 왜 아직 묶는가",
        body: "문서의 답 — 묶지 않은 ESM 은 '중첩 import 가 만드는 추가 네트워크 왕복' 때문에 프로덕션에서 비효율적입니다. main → util → helper 처럼 세 단계 깊이면 브라우저는 세 번의 왕복 뒤에야 실행을 시작합니다(HTTP/2 라도 파일을 받아 파싱해야 다음 import 를 알 수 있음). 그래서 배포는 Rolldown 으로 묶어 왕복을 줄이고, 트리 셰이킹 · 지연 로딩 · 공통 청크 분할 · 해시로 캐시 최적화를 합니다(6 · 7장). 문서가 '전체 번들 모드(Full bundle mode)'를 탐색 중이라고 적는데, 개발 서버도 배포처럼 묶는 선택지를 주겠다는 뜻입니다 — 매우 큰 앱에서는 요청 수가 개발 서버의 병목이 되기 때문입니다.",
        code: "묶지 않은 ESM 의 왕복\n브라우저 ──GET main.js──► 받고 파싱 → import util.js 발견\n        ──GET util.js──► 받고 파싱 → import helper.js 발견\n        ──GET helper.js─► 받고 → 실행 시작       (깊이 = 왕복 수)\n\n묶은 번들\n브라우저 ──GET index-[hash].js──► 실행 시작        (왕복 1)\n            + 동적 import 경계는 별도 청크 (필요할 때만)",
        codeLang: "text",
      },
      {
        label: "도구 사슬: esbuild · Rollup 에서 Rolldown · Oxc 로",
        body: "Vite 는 원래 개발의 변환에 esbuild(Go), 배포의 묶기에 Rollup(JS)을 썼습니다. 8 은 둘을 Rust 기반 하나로 바꿨습니다 — 마이그레이션 문서: 'Vite 8 은 esbuild 와 Rollup 대신 Rolldown 과 Oxc 기반 도구를 쓴다'. 사전 번들링도 Rolldown, TypeScript 변환은 Oxc Transformer, JS 압축은 Oxc Minifier, CSS 압축은 Lightning CSS, esbuild 는 선택 의존성. 설정 이름도 `build.rollupOptions` → `build.rolldownOptions`(옛 이름은 별칭). 플러그인 API 는 Rollup 호환이라 기존 플러그인이 대개 그대로 돌고(9장), 기본 브라우저 타깃은 Baseline Widely Available(Chrome 111 · Edge 111 · Firefox 114 · Safari 16.4)로 올라갔습니다.",
        code: "역할             Vite 7 (이전)         Vite 8\n──────────────  ───────────────────  ──────────────────────────\n묶기 (배포)       Rollup (JS)           Rolldown (Rust)\n사전 번들 (개발)   esbuild (Go)          Rolldown\nTS/JSX 변환       esbuild               Oxc Transformer\nJS 압축           esbuild               Oxc Minifier\nCSS 압축          esbuild               Lightning CSS\n설정 키           build.rollupOptions   build.rolldownOptions (옛 키는 별칭)\n브라우저 타깃      Chrome 107 …          Chrome 111 · Firefox 114 · Safari 16.4 (Baseline WA)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: '언제 묶나' 가 두 모드를 가른다",
        body: "묶기의 비용은 '전부 처리해야 시작'이고 이득은 '왕복이 적다'입니다. 개발에서는 시작과 갱신이 잦고 네트워크는 localhost 라 비용이 이득보다 크고, 배포에서는 한 번 만들어 수많은 사용자가 먼 네트워크로 받으니 이득이 큽니다. Vite 의 설계는 이 비대칭을 그대로 따릅니다 — 다만 의존성(node_modules)은 개발에서도 묶습니다. 수백 개 내부 모듈(lodash-es 600+)을 그대로 보내면 요청 폭발이고, 바뀌지 않으니 한 번만 하면 되기 때문입니다(2장). 그래서 '개발과 배포가 다르게 동작한다'는 Vite 의 함정도 여기서 나옵니다 — 12장의 '개발에서는 되는데 빌드에서 깨짐'.",
      },
      {
        label: "다음 입구",
        body: "개발에서도 묶는 유일한 것 — 의존성의 사전 번들링 — 이 2장입니다. 베어 import 가 `/node_modules/.vite/deps/…?v=해시` 로 바뀐 그 줄의 뒷이야기입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 번들 기반 개발 서버가 느린 두 지점은? 2) Vite 개발 서버에서 `/src/main.ts` 를 요청하면 무엇이 바뀐 채 오나요(세 가지)? 3) 배포에서 아직 묶어야 하는 이유는? 4) Vite 8 에서 esbuild 와 Rollup 을 대신한 둘은?",
      },
    ],
    sources: [
      { label: "Vite — Why Vite", href: `${VITE}/guide/why` },
      { label: "Vite — Migration from v7", href: `${VITE}/guide/migration` },
      { label: "Vite — Philosophy", href: `${VITE}/guide/philosophy` },
    ],
  },

  {
    id: "bundle-s2",
    name: "2장 · 의존성 해석과 사전 번들링",
    tagline: "베어 import 를 파일로 바꾸고, node_modules 는 한 번만 묶어 둔다",
    intro:
      "`import { chunk } from 'lodash-es'` 의 `lodash-es` 는 브라우저가 모르는 베어 지정자입니다. Vite 는 Node 식 해석(package.json 의 exports · main · 확장자 추론)으로 파일을 찾고, 개발에서는 그 패키지를 Rolldown 으로 한 번 묶어 `node_modules/.vite/deps/` 에 캐시한 뒤 import 를 그 경로로 고쳐 씁니다. 목적은 둘 — CommonJS · UMD 를 ESM 으로 바꾸기, 수백 개 내부 모듈을 요청 하나로 줄이기. 캐시는 락파일 · 패치 · 설정 · NODE_ENV 가 바뀌면 무효화되고, 브라우저 쪽은 `max-age=31536000,immutable` 로 1년 캐시합니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: vite optimize 와 .vite/deps",
        body: "`npx vite optimize` 는 소스를 훑어 베어 import 를 찾아 사전 번들링합니다 — 출력 `Optimizing dependencies: lodash-es`, 결과는 `node_modules/.vite/deps/lodash-es.js`(+ .map) 와 `_metadata.json`. 메타데이터의 키는 hash · configHash · lockfileHash · browserHash · optimized · chunks — 무엇이 바뀌면 다시 묶을지를 이 해시들이 정합니다(문서: 락파일 내용, patches 폴더 mtime, vite.config 의 관련 필드, NODE_ENV). 개발 서버가 돌려준 `/node_modules/.vite/deps/lodash-es.js?v=74ed4849` 의 `v=` 가 browserHash 이고, 응답 헤더는 `Cache-Control: max-age=31536000,immutable` — 버전이 바뀌면 쿼리가 바뀌어 캐시가 자연히 갈립니다. lodash-es 는 문서의 예 그대로 '600 개 넘는 내부 모듈'이 파일 하나가 됩니다.",
        code: "$ npx vite optimize\nOptimizing dependencies:\n  lodash-es\n$ ls node_modules/.vite/deps\n_metadata.json  lodash-es.js  lodash-es.js.map  package.json\n$ python3 -c \"import json;m=json.load(open('node_modules/.vite/deps/_metadata.json'));print(list(m))\"\n['hash', 'configHash', 'lockfileHash', 'browserHash', 'optimized', 'chunks']\n\n$ curl -sI 'localhost:4330/node_modules/.vite/deps/lodash-es.js?v=74ed4849'\nHTTP/1.1 200 OK\nContent-Type: text/javascript\nCache-Control: max-age=31536000,immutable      # 1년 — 버전은 ?v= 로 갈림",
        codeLang: "bash",
        terms: [
          {
            term: "사전 번들링 (dependency pre-bundling)",
            body: "개발 모드에서만 하는 node_modules 묶기. 문서의 노트 — '의존성 사전 번들링은 개발 모드에만 적용된다'. 배포 빌드에서는 Rolldown 이 소스와 의존성을 함께 묶으므로 별도 단계가 없습니다. 첫 실행에 소스를 크롤해 자동 발견하고, 뒤늦게 새 의존성이 발견되면 다시 묶고 필요하면 페이지를 새로 고칩니다('new dependencies optimized' 메시지).",
          },
        ],
      },
      {
        label: "해석: 지정자 → 파일",
        body: "해석 규칙은 TypeScript 허브의 모듈 참고서가 다루는 Node 규칙과 같은 자리입니다. 베어 지정자는 node_modules 에서 package.json 을 찾아 `exports`(조건 `import` · `browser` · `module` · `development|production` — `resolve.conditions` 기본값 `['module', 'browser', 'development|production']`) 또는 `main`/`module` 필드로 진입점을 고릅니다. 상대 경로의 확장자 생략은 `resolve.extensions` 순서(`.mjs .js .mts .ts .jsx .tsx .json`)로 파일 시스템을 찔러 봅니다 — 12장 성능의 '확장자를 적으면 검사 1회'. `resolve.alias` 로 `@/` 같은 별칭을 두되 tsconfig 의 paths 와 따로 맞춰야 하고(TypeScript 허브: paths 는 검사만 바꿈), `resolve.tsconfigPaths` 가 그 둘을 이어 줍니다.",
        code: "import { chunk } from 'lodash-es'      // 베어 → node_modules/lodash-es/package.json → exports/module → 파일\nimport { used } from './util'           // 상대 + 확장자 생략 → util.mjs? .js? .mts? .ts ✓  (여러 번 확인)\nimport { used } from './util.ts'        // 1회 확인 (TS: allowImportingTsExtensions)\nimport x from '@/components/x'          // resolve.alias (또는 resolve.tsconfigPaths)\n\n// vite.config.ts\nexport default defineConfig({ resolve: { alias: { '@': '/src' } } })",
      },
      {
        label: "커스터마이징과 모노레포",
        body: "자동 발견이 놓치거나 과하게 잡을 때 — `optimizeDeps.include` 에 크거나 CJS 인 의존성을 강제로 넣고, `optimizeDeps.exclude` 로 이미 작고 유효한 ESM 을 뺍니다. 모노레포에서 `node_modules` 밖으로 링크된 패키지는 '소스'로 취급되어 사전 번들링되지 않으니, 그 패키지가 ESM 이 아니면 include 에 넣고, 링크된 패키지를 고친 뒤에는 `--force` 로 다시 묶습니다(`npm link` 는 캐시를 무효화하지 않음 — 12장 트러블슈팅). `optimizeDeps.rolldownOptions` 로 묶기 옵션을 넘길 수 있습니다.",
        code: "export default defineConfig({\n  optimizeDeps: {\n    include: ['some-cjs-lib', 'linked-pkg > nested-cjs'],   // 강제 포함 (CJS · 큰 것)\n    exclude: ['small-esm-lib'],                              // 제외 (이미 작고 ESM)\n  },\n})\n\n$ npx vite --force        # 캐시 무시하고 다시 묶기 (또는 rm -rf node_modules/.vite)",
      },
      {
        label: "문제가 나는 경우: 의존성이 안 맞을 때",
        body: "사전 번들링과 해석에서 자주 보는 것들입니다.",
        code: "증상                                                  원인                                          처방\n───────────────────────────────────────────────────  ───────────────────────────────────────────  ──────────────────────────────\n'new dependencies optimized: x' 뒤 페이지 새로 고침       늦게 발견된 의존성 재번들                        optimizeDeps.include 에 미리\n링크한 로컬 패키지를 고쳤는데 옛 코드                      npm link 는 캐시 무효화 안 함                    vite --force\nCJS 라이브러리의 named import 가 undefined               CJS→ESM 변환의 named export 분석 한계              default import 뒤 구조 분해 · include\n'Failed to resolve import \"x\"'                          exports 에 없는 경로 · 오타 · 확장자                경로 확인 · exports 조건\n개발에선 되는데 빌드에서 'is not exported by'              개발은 사전 번들(관대) · 빌드는 Rolldown(엄격)      올바른 import 형태 · 라이브러리 이슈\n504 Outdated Optimize Dep                              재번들 중 옛 URL 요청                            새로 고침 (자동)\n모노레포 패키지가 변환 안 됨                              링크 패키지는 소스 취급                           ESM 으로 두거나 include",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 의존성은 '바뀌지 않는 것' 이라 미리 묶고 오래 캐시한다",
        body: "소스는 자주 바뀌고 의존성은 설치할 때만 바뀝니다. Vite 는 이 차이를 그대로 캐시 전략으로 씁니다. 소스는 요청마다 변환하고 캐시 헤더를 짧게, 의존성은 한 번 묶어 파일 시스템(.vite/deps)과 브라우저(immutable 1년) 양쪽에 오래 둡니다. 무효화 조건이 '락파일 · 패치 · 설정 · NODE_ENV' 인 것도 '의존성이 바뀌는 순간'을 전부 열거한 것입니다. 이 전략이 깨지는 자리가 '설치 밖에서 바뀌는 의존성'(npm link · 로컬 수정)이고 그때 `--force` 가 필요합니다.",
        code: "                 바뀌는 때            처리              캐시\n소스 (src/)       편집마다             요청 시 변환         짧게 (HMR 이 무효화)\n의존성            설치·락파일·패치     한 번 사전 번들      .vite/deps + 브라우저 immutable 1년 (?v=해시)\n링크 패키지        편집마다 (설치 밖)   소스 취급            --force 로 수동",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "사전 번들된 의존성과 변환된 소스가 브라우저에 어떻게 전달되는가 — 개발 서버가 요청 하나를 어떻게 처리하는가 — 가 3장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 사전 번들링의 두 목적은? 2) `.vite/deps` 캐시가 무효화되는 네 조건은? 3) `?v=74ed4849` 와 `immutable` 헤더가 함께 하는 일은? 4) 링크된 모노레포 패키지를 고쳤을 때 필요한 명령은?",
      },
    ],
    sources: [
      { label: "Vite — Dependency Pre-Bundling", href: `${VITE}/guide/dep-pre-bundling` },
      { label: "Vite — Features: NPM Dependency Resolving", href: `${VITE}/guide/features#npm-dependency-resolving-and-pre-bundling` },
      { label: "Vite — Shared Options: resolve", href: `${VITE}/config/shared-options#resolve-alias` },
    ],
  },

  {
    id: "bundle-s3",
    name: "3장 · 개발 서버 — 요청 시 변환",
    tagline: "브라우저가 묻는 파일 하나를 그 자리에서 바꿔 준다",
    intro:
      "개발 서버는 HTTP 서버 + 변환 파이프라인입니다. `/src/main.ts` 요청이 오면 플러그인 사슬(resolveId → load → transform)을 통과시켜 TypeScript 를 벗기고(Oxc, 타입 검사 없음), import 를 고쳐 쓰고, `import.meta.env` 와 HMR 컨텍스트를 끼워 ESM 으로 응답합니다. CSS 는 JS 모듈로 감싸져 `<style>` 을 주입하고, 자산은 URL 로. 문서의 노트 — 'Vite 는 .ts 파일에 변환만 하고 타입 검사는 하지 않는다'. TypeScript 허브에서 본 '검사기와 변환기의 분업'이 여기서 다시 나옵니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: CSS 모듈이 JS 로 온다",
        body: "`/src/styles.module.css` 를 curl 하면 CSS 가 아니라 JS 모듈이 옵니다 — `__vite__updateStyle(id, css)` 로 `<style>` 을 주입하고 `export const title = \"_title_1a2d1_1\"` 와 default 객체를 내보냅니다. 클래스 이름이 해시로 바뀐 것(CSS 모듈)과, 스타일 주입이 '모듈 실행'의 부수 효과라는 것이 보입니다. 그래서 CSS 파일 하나를 고치면 HMR 이 그 모듈만 다시 실행해 `<style>` 내용을 바꿉니다(4장). `/src/glob.ts` 의 `import.meta.glob('./lazy/*.ts')` 는 `{ './lazy/heavy.ts': () => import('/src/lazy/heavy.ts') }` 객체로, `{ eager: true }` 는 정적 import 로 펼쳐져 왔습니다 — 글롭은 빌드 타임에 파일 목록으로 바뀌는 문법입니다.",
        code: "$ curl -s localhost:4330/src/styles.module.css\nimport { createHotContext as __vite__createHotContext } from \"/@vite/client\";\nimport.meta.hot = __vite__createHotContext(\"/src/styles.module.css\");\nimport { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from \"/@vite/client\"\nconst __vite__id = \"…/src/styles.module.css\"\nconst __vite__css = \"._title_1a2d1_1 { color: rebeccapurple; }\\n\"\n__vite__updateStyle(__vite__id, __vite__css)          # <style> 주입 = 모듈 실행의 부수 효과\nexport const title = \"_title_1a2d1_1\";\nexport default { title: title };\n\n$ curl -s localhost:4330/src/glob.ts\nimport * as __vite_glob_1_0 from \"/src/lazy/heavy.ts\";\nexport const modules = Object.assign({\"./lazy/heavy.ts\": () => import(\"/src/lazy/heavy.ts\")});\nexport const eager = Object.assign({\"./lazy/heavy.ts\": __vite_glob_1_0});",
        codeLang: "bash",
      },
      {
        label: "TypeScript · JSX · 정적 치환",
        body: "TS 는 Oxc 가 타입만 벗깁니다 — 검사는 `tsc --noEmit` 을 따로(TypeScript 허브 Babel 장의 분업). 그래서 `isolatedModules: true` 가 권장이고(단일 파일 변환이 못 하는 const enum · 타입 re-export 를 미리 막음), `useDefineForClassFields` 는 target ES2022 이상이면 true. Vite 는 tsconfig 의 `target` 을 무시하고 개발에서는 `oxc.target: esnext` 로 최소 변환만 합니다. JSX 는 `.jsx/.tsx` 에서 자동 변환(React 플러그인이 런타임 설정). `import.meta.env.*` 와 `define` 의 값은 코드에 문자열로 치환됩니다 — 3장 첫 curl 에서 `import.meta.env = {...}` 객체가 실제로 끼워진 것, 빌드에서는 각 `import.meta.env.X` 자리가 리터럴로 바뀝니다(8장).",
        code: "개발 서버가 소스 모듈에 하는 일 (순서)\n① resolveId   './util' → /src/util.ts\n② load        파일 읽기\n③ transform   TS 벗기기(Oxc) · JSX · CSS→JS 래핑 · 자산→URL · import 경로 재작성 · import.meta.env 주입 · HMR 컨텍스트\n④ 응답        text/javascript, 소스맵은 data URI\n\n# 타입 검사는 없다 — 따로\n$ npx tsc --noEmit",
        codeLang: "text",
      },
      {
        label: "서버 옵션: 포트 · 프록시 · 미들웨어 모드",
        body: "`server.port`(기본 5173) · `server.strictPort`(쓰는 중이면 실패) · `server.host`(0.0.0.0 로 LAN 노출) · `server.open`. 백엔드가 따로 있으면 `server.proxy` 로 `/api` 를 다른 포트로 넘겨 CORS 없이 개발합니다. `server.fs.allow` 가 프로젝트 밖 파일 서빙을 막고, `server.watch` 가 파일 감시(WSL2 · 컨테이너에서 폴링 옵션). 백엔드 템플릿 안에 Vite 를 끼우는 '백엔드 통합'과 `middlewareMode`(Express 위에 Vite 를 미들웨어로)는 10장. `appType` 은 spa(기본, 모든 경로를 index.html 로) · mpa · custom.",
        code: "export default defineConfig({\n  server: {\n    port: 5173, strictPort: true, host: true,       // host: true = 0.0.0.0\n    proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } },\n    warmup: { clientFiles: ['./src/components/*.vue'] },   // 자주 쓰는 파일 미리 변환 (12장)\n  },\n})",
      },
      {
        label: "문제가 나는 경우: 개발 서버에서",
        body: "요청 시 변환 모델에서 생기는 일들입니다.",
        code: "증상                                              원인                                        처방\n───────────────────────────────────────────────  ─────────────────────────────────────────  ──────────────────────────────\n타입 에러인데 개발 서버는 조용하다                     변환만, 검사 없음                              tsc --noEmit · vite-plugin-checker\n첫 화면이 느리다 (수백 요청)                          묶지 않음 — 모듈마다 요청                        server.warmup · 배럴 파일 피하기 (12장)\n/api 가 CORS 로 막힌다                              다른 오리진의 백엔드                             server.proxy\nimport.meta.env.X 가 undefined                     VITE_ 접두어 없음                              8장\n'Module \"fs\" has been externalized for browser'     Node 내장을 브라우저 코드에서                     브라우저 코드에서 제거 · 폴리필\n파일을 고쳤는데 안 바뀐다                             감시 한계(ENOSPC·WSL2) · 대소문자                 watch.usePolling · 경로 대소문자 (12장)\n404 로 /about 이 안 열린다 (새로 고침)                appType spa 가 아님 · 라우터                     appType: 'spa' (기본)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 개발 서버는 '게으른 변환기' 다",
        body: "묶지 않는다는 것은 '요청된 것만 한다'는 뜻이고, 그래서 변환은 게으릅니다 — 화면에 없는 모듈은 변환되지 않고, 타입 검사처럼 전체를 봐야 하는 일은 할 수 없습니다. 변환은 모듈 단위의 함수(transform)이고 플러그인이 그 함수를 겹치는 것이라, CSS · 자산 · 글롭 전부가 'JS 모듈로 바꾸기'로 통일됩니다(CSS 가 JS 로 온 것이 그 증거). 이 모델의 함정은 '전체를 봐야 아는 것'(타입 오류, 순환 의존, 묶었을 때만 나는 문제)이 개발에서 안 보인다는 것이고, 처방은 전체를 보는 도구(tsc · 빌드)를 따로 돌리는 것입니다.",
      },
      {
        label: "다음 입구",
        body: "변환된 모듈 하나가 바뀌었을 때 페이지를 새로 고치지 않고 그 모듈만 갈아 끼우는 메커니즘 — HMR — 이 4장입니다. 3장에서 본 `createHotContext` 와 `__vite__updateStyle` 이 그 재료입니다.",
      },
      {
        label: "확인 질문",
        body: "1) CSS 모듈 파일을 요청하면 왜 JS 가 오나요? 2) Vite 가 TypeScript 에 하는 일과 하지 않는 일은? 3) `import.meta.glob` 이 개발 서버에서 어떤 코드로 바뀌었나요? 4) 백엔드가 8080 에 있을 때 CORS 없이 개발하는 설정은?",
      },
    ],
    sources: [
      { label: "Vite — Features", href: `${VITE}/guide/features` },
      { label: "Vite — Server Options", href: `${VITE}/config/server-options` },
      { label: "Vite — CLI", href: `${VITE}/guide/cli` },
    ],
  },

  {
    id: "bundle-s4",
    name: "4장 · HMR — 모듈만 갈아 끼우기",
    tagline: "바뀐 모듈과 그 경계까지만 다시 받고, 페이지는 그대로 둔다",
    intro:
      "HMR(Hot Module Replacement)은 파일이 바뀌었을 때 페이지를 새로 고치지 않고 그 모듈만 교체하는 메커니즘입니다. 서버가 파일 변경을 감지해 웹소켓으로 알리고, `/@vite/client` 가 바뀐 모듈을 다시 import 해서 '받아 주겠다'고 선언한 경계(`import.meta.hot.accept`)까지 전파합니다. 경계가 없으면 전체 새로 고침. Vue · React 플러그인이 컴포넌트 단위 경계를 자동으로 만들어 주고, 직접 쓰는 API 는 '프레임워크·도구 저자용'이라고 문서가 적습니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: CSS 를 고쳐도 window 가 살아 있다",
        body: "Chrome 에서 개발 서버 페이지를 열고 `window.__marker` 에 값을 심은 뒤, Node 에서 `src/style.css` 끝에 `body { background-color: rgb(1, 2, 3) !important }` 를 덧붙였습니다. 8초 안에 body 배경이 `rgb(1, 2, 3)` 으로 바뀌었고 `window.__marker` 는 그대로(`alive-1794462097283`) — 페이지가 새로 고쳐지지 않고 CSS 모듈만 다시 실행되어 `__vite__updateStyle` 이 `<style>` 내용을 바꾼 것입니다. 3장에서 본 'CSS 는 JS 모듈' 설계가 HMR 을 공짜로 만드는 자리입니다. 상태(입력 중인 폼, 스크롤, JS 변수)가 보존되는 것이 HMR 의 전부입니다.",
        code: "// Chrome (ego-browser)\nwindow.__marker = \"alive-1794462097283\";\ngetComputedStyle(document.body).backgroundColor   // \"rgba(0, 0, 0, 0)\"\n\n// Node: src/style.css 에 한 줄 추가\nbody { background-color: rgb(1, 2, 3) !important; }\n\n// Chrome, 몇 ms 뒤\ngetComputedStyle(document.body).backgroundColor   // \"rgb(1, 2, 3)\"\nwindow.__marker                                   // \"alive-1794462097283\"  ← 새로 고침 없음",
      },
      {
        label: "전파 규칙: 경계를 만날 때까지 올라간다",
        body: "모듈 A 가 바뀌면 Vite 는 A 를 import 하는 모듈들을 거슬러 올라가며 '이 변경을 받아 줄 수 있다'고 선언한 모듈(HMR 경계)을 찾습니다. A 자신이 `import.meta.hot.accept()` 를 했으면 A 만 다시 실행(자기 수용). 부모 B 가 `accept('./A.js', cb)` 를 했으면 B 의 콜백이 새 A 를 받습니다. 끝까지 경계가 없으면 `vite:beforeFullReload` 뒤 전체 새로 고침. Vue SFC 플러그인은 모든 컴포넌트를 자기 수용 경계로 만들어 컴포넌트 인스턴스의 상태를 보존하며 렌더만 바꾸고, React Fast Refresh 도 같습니다. CSS 는 `prune`(더 이상 import 되지 않으면 `<style>` 제거)까지 Vite 가 처리합니다.",
        code: "변경: util.ts\n  ├─ util.ts 가 accept() ?  → 자기만 다시 실행\n  └─ 아니면 importers 로 ↑\n       main.ts 가 accept('./util.ts', cb) ?  → cb(newUtil)\n       아니면 ↑ … 끝 → 전체 새로 고침 (vite:beforeFullReload)\n\n프레임워크: 컴포넌트마다 자기 수용 경계 → 상태 보존하며 렌더 교체 (Vue SFC · React Fast Refresh)",
        codeLang: "text",
        terms: [
          {
            term: "HMR 경계 (boundary)",
            body: "`import.meta.hot.accept` 로 '여기서 받겠다'를 선언한 모듈. 변경 전파가 멈추는 자리라 그 위의 모듈과 페이지 상태는 건드리지 않습니다. 문서의 조건 — Vite 의 정적 분석이 `import.meta.hot.accept(` 라는 글자 그대로를 찾으니 공백·별칭으로 바꾸면 안 됩니다.",
          },
        ],
      },
      {
        label: "API: accept · dispose · data · invalidate · 이벤트",
        body: "전부 `if (import.meta.hot) { … }` 안에 — 프로덕션 빌드에서 트리 셰이킹되도록. `accept(cb)` 자기 수용(SyntaxError 면 cb 에 undefined), `accept(dep, cb)` / `accept([deps], cb)` 의존성 수용. `dispose(cb)` 옛 인스턴스의 부수 효과(타이머·리스너) 정리. `prune(cb)` 더 이상 import 되지 않을 때. `hot.data` 는 모듈 경로마다 하나인 객체로 인스턴스 사이에 상태를 넘길 때(재대입이 아니라 속성 변경). `invalidate(msg)` 는 '나는 못 받겠으니 부모로 올려라' — `decline()` 은 호환용 no-op. 이벤트 — `vite:beforeUpdate` `vite:afterUpdate` `vite:beforeFullReload` `vite:beforePrune` `vite:invalidate` `vite:error` `vite:ws:disconnect` `vite:ws:connect`. `hot.send` 로 서버 플러그인과 양방향 통신(9장).",
        code: "if (import.meta.hot) {\n  import.meta.hot.accept((newModule) => {        // 자기 수용 — newModule 이 새 인스턴스\n    if (newModule) render(newModule.state)\n  })\n  import.meta.hot.dispose((data) => {           // 옛 인스턴스 정리 · 다음 인스턴스에 넘길 것\n    clearInterval(timer); data.count = count\n  })\n  if (import.meta.hot.data.count != null) count = import.meta.hot.data.count\n  import.meta.hot.on('vite:beforeFullReload', () => console.log('full reload coming'))\n}",
      },
      {
        label: "문제가 나는 경우: HMR 이 안 되거나 전체 새로 고침이 될 때",
        body: "트러블슈팅 문서와 HMR 모델에서 나오는 자리들입니다.",
        code: "증상                                            원인                                            처방\n─────────────────────────────────────────────  ─────────────────────────────────────────────  ───────────────────────────────\n매번 전체 새로 고침                                경계 없음 · 순환 의존 (vite --debug hmr 로 확인)      컴포넌트 단위 분리 · 순환 제거\n파일 고쳤는데 아무 반응 없음                        import 경로의 대소문자 불일치 (macOS/Windows)         경로 대소문자 맞추기\n리눅스에서 감시가 안 됨                             ENOSPC (inotify 한계)                              max_user_watches 늘리기 · watch.ignored\nWSL2 에서 안 됨                                   Windows 파일 시스템 감시 불가                       WSL 안에 프로젝트 · usePolling\n상태가 두 배로 (타이머 둘)                          dispose 로 정리 안 함                               hot.dispose\naccept 를 변수에 담아 호출                          정적 분석이 글자 그대로를 찾음                        import.meta.hot.accept( 그대로\n개발 서버 재접속 뒤 옛 상태                          vite:ws:disconnect / connect                      이벤트로 처리 · 새로 고침",
        codeLang: "text",
      },
      {
        label: "문제의 구조: HMR 은 '모듈 그래프 위의 국소 재실행' 이다",
        body: "ESM 모듈은 한 번 평가되면 캐시됩니다. 다시 평가하려면 다른 URL 로 import 해야 하고(`?t=타임스탬프`), 그 새 인스턴스를 옛 인스턴스 자리에 '연결'하는 일은 모듈 자신(또는 부모)만 할 수 있습니다 — 그래서 accept 가 필요하고, 경계 없는 모듈은 교체할 방법이 없어 전체 새로 고침으로 떨어집니다. CSS 가 가장 쉬운 이유는 '모듈 실행 = <style> 교체'라 연결이 자명하기 때문이고, 컴포넌트가 다음으로 쉬운 이유는 프레임워크가 인스턴스와 정의를 분리해 두어 정의만 바꿔 끼울 수 있기 때문입니다. 그 밖의 모듈(상태를 가진 싱글턴, 전역 등록)은 dispose/data 로 손수 넘겨야 하고, 그래서 문서가 '프레임워크·도구 저자용'이라 적습니다.",
        code: "모듈 캐시 (브라우저)         /src/util.ts          → 평가됨, 캐시\n변경 알림 (웹소켓)           util.ts updated\n재요청                      /src/util.ts?t=1794462097   → 새 인스턴스\n연결                        accept(cb) 가 cb(newUtil) 로 옛 자리에 끼움   ← 이것을 할 모듈이 '경계'\n없으면                      location.reload()",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "개발 모드의 네 장이 끝났습니다. 5장부터 배포 모드 — CSS 와 자산이 빌드에서 어떻게 파일이 되는지(해시 · 인라인 · public/)부터입니다.",
      },
      {
        label: "확인 질문",
        body: "1) CSS 를 고쳤을 때 `window.__marker` 가 살아 있었던 것이 증명하는 것은? 2) 변경 전파가 멈추는 조건과, 끝까지 안 멈추면 일어나는 일은? 3) `hot.dispose` 와 `hot.data` 가 각각 하는 일은? 4) `import.meta.hot.accept` 를 별칭으로 바꾸면 안 되는 이유는?",
      },
    ],
    sources: [
      { label: "Vite — HMR API", href: `${VITE}/guide/api-hmr` },
      { label: "Vite — Features: Hot Module Replacement", href: `${VITE}/guide/features#hot-module-replacement` },
      { label: "Vite — Troubleshooting: HMR", href: `${VITE}/guide/troubleshooting#hmr` },
    ],
  },

  {
    id: "bundle-s5",
    name: "5장 · CSS 와 정적 자산",
    tagline: "스타일과 이미지는 import 할 수 있고, 빌드가 해시 · 인라인 · 복사 중 하나를 고른다",
    intro:
      "Vite 에서 CSS · 이미지 · 폰트 · JSON · 워커는 전부 JS 에서 import 할 수 있는 모듈입니다. CSS 는 `@import` 인라인과 `url()` 재작성이 기본이고, `.module.css` 는 CSS 모듈, PostCSS 설정은 자동 적용, 프로덕션 압축은 Lightning CSS, 전처리기(Sass · Less)는 설치만 하면 됩니다. 자산은 import 하면 URL 이 되고(빌드에서 해시), 4KB 미만은 base64 로 인라인, `?url` `?raw` `?inline` 으로 명시할 수 있으며, `public/` 은 처리 없이 그대로 복사됩니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: CSS 모듈 해시, SVG 인라인, CSS 파일 하나",
        body: "빌드 결과의 CSS 는 `index-D3pLvTLE.css` 하나 — 전역 `style.css` 와 `styles.module.css` 가 합쳐지고 Lightning CSS 로 압축됐습니다. 모듈 클래스는 `._title_1a2d1_1` 로 바뀌어 있고(개발 서버와 같은 이름 — 해시가 파일 경로와 클래스에서 나오므로 결정적), JS 에서는 `styles.title` 로 그 문자열을 받습니다. `import logoUrl from './assets/typescript.svg?url'` 의 SVG 는 4KB 보다 작아 dist/assets 에 파일로 나오지 않고 JS 안에 `data:image/svg+xml,%3csvg…` 로 인라인됐습니다(`build.assetsInlineLimit` 기본 4096). `?raw` 는 파일 내용 문자열. 큰 이미지였다면 `assets/img-[hash].png` 로 복사되고 import 결과가 그 경로가 됩니다.",
        code: "$ ls dist/assets\nheavy-9Q5z2xLI.js  index-D3pLvTLE.css  index-DtXQI08K.js        # CSS 는 하나로, SVG 파일은 없음\n\n$ grep -o '_title_[A-Za-z0-9_-]*' dist/assets/index-D3pLvTLE.css\n_title_1a2d1_1                                                 # CSS 모듈 — 결정적 해시\n$ grep -o 'data:image/svg+xml[^\"]\\{0,20\\}' dist/assets/index-DtXQI08K.js\ndata:image/svg+xml,%3csvg%20xmlns='htt                         # < 4KB → base64/URL 인라인\n\n// 소스\nimport styles from './styles.module.css'   // styles.title === \"_title_1a2d1_1\"\nimport logoUrl from './assets/typescript.svg?url'   // 작으면 data URL, 크면 /assets/typescript-[hash].svg\nimport svgRaw from './assets/typescript.svg?raw'    // 파일 내용 문자열",
        codeLang: "bash",
      },
      {
        label: "CSS 처리 사슬",
        body: "`import './style.css'` → 개발에서는 `<style>` 주입 모듈(3장), 빌드에서는 추출된 .css 파일과 index.html 의 `<link rel=stylesheet>`. 처리 순서 — 전처리기(.scss 가 있으면 sass 패키지 필요) → PostCSS(`postcss.config.*` 자동 인식, Tailwind 가 여기) → `@import` 인라인과 `url()` 재작성(Vite 내장) → CSS 모듈(`.module.css`, `css.modules` 옵션, Lightning CSS 를 쓰면 그쪽 설정) → 프로덕션 압축(`build.cssMinify` 기본 lightningcss). 문서의 노트 — 'CSS 파일의 default/named import 는 Vite 5 에서 제거됐다. `?inline` 을 쓰라'. `build.cssCodeSplit`(기본 true)은 비동기 청크가 쓰는 CSS 를 그 청크 옆의 .css 로 떼어 청크를 받을 때 함께 받게 합니다.",
        code: ".scss ──sass──► .css ──PostCSS(tailwind 등)──► @import 인라인 · url() 재작성 ──► CSS 모듈 해시 ──► Lightning CSS 압축\n                                                                                              │\n개발: <style data-vite-dev-id> 주입 (JS 모듈)                                                  배포: assets/index-[hash].css + <link>\n                                                                                              비동기 청크의 CSS 는 청크별 .css (cssCodeSplit)\n\n// 전처리기는 설치만\n$ npm i -D sass        # import './a.scss' 가 바로 된다",
        codeLang: "text",
      },
      {
        label: "자산: import vs public/ vs new URL",
        body: "세 가지 길. (1) import — 처리됨: 해시 이름, 인라인 판단, 존재 검사(없으면 빌드 실패), TypeScript 는 `vite/client` 타입이 필요. (2) `public/` — 처리 없음: 루트 절대 경로(`/favicon.svg`)로 참조하고 빌드가 dist 루트에 그대로 복사(실제로 `dist/favicon.svg` · `dist/icons.svg`). 해시가 없어 캐시 무효화는 손수. 문서: 'import 를 선호하되, 이름을 그대로 두어야 하거나 수천 개라면 public'. (3) `new URL('./img.png', import.meta.url)` — 브라우저 표준이고 빌드가 정적 문자열이면 변환하되, 변수가 든 경로는 그대로 두고 SSR 에서는 동작하지 않습니다. 접미사 — `?url`(항상 URL) `?inline`(항상 인라인) `?no-inline`(항상 파일) `?raw`(문자열) `?worker`(웹 워커).",
        code: "길                        처리        캐시 무효화     언제\n───────────────────────  ─────────  ────────────  ──────────────────────────────\nimport img from './a.png'  해시·인라인   자동 (해시)     기본 — 코드가 참조하는 자산\n/public/a.png              없음·복사    수동           이름 고정 필요 · robots.txt · 수천 개\nnew URL('./a.png', import.meta.url)  정적이면 변환   자동   플랫폼 중립 코드 · 워커\n\n접미사: ?url · ?inline · ?no-inline · ?raw · ?worker · ?worker&inline",
        codeLang: "text",
        terms: [
          {
            term: "assetsInlineLimit",
            body: "이 크기(기본 4096 바이트) 미만의 자산을 파일 대신 base64 데이터 URL 로 JS/CSS 에 넣는 경계. 요청을 아끼지만 캐시를 따로 못 하고 base64 로 33% 커집니다. 0 이면 항상 파일, 콜백으로 파일별 판단도 됩니다. `build.lib` 모드에서는 무시됩니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우: 스타일과 자산이 안 보일 때",
        body: "CSS · 자산에서 자주 보는 것들입니다.",
        code: "증상                                                원인                                           처방\n─────────────────────────────────────────────────  ────────────────────────────────────────────  ──────────────────────────\nimport css from './a.css' 가 undefined               Vite 5 부터 CSS 의 default import 제거               import css from './a.css?inline'\n.scss 가 'Preprocessor dependency \"sass\" not found'    전처리기 미설치                                 npm i -D sass\n작은 아이콘이 네트워크 탭에 안 보인다                   4KB 미만 인라인                                   정상 · ?no-inline 또는 assetsInlineLimit: 0\npublic/ 이미지를 import 했다                           public 은 import 대상이 아님                        /이름 으로 참조 · 또는 src/assets 로\n빌드 뒤 이미지 404                                    런타임 문자열 경로 (변수) 는 처리 안 됨               import · public/ · new URL 정적 문자열\nCSP 에서 인라인 자산 차단                              data: URL                                        assetsInlineLimit: 0 · img-src data:\nCSS 순서가 개발과 다르다                               빌드가 import 순서로 합침                          순서 한 곳에서 · 레이어(@layer)\nTailwind 클래스가 안 나온다                            PostCSS 설정 미인식 · content 경로                  postcss.config.* · 플러그인 설정",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 자산도 '모듈 그래프의 노드' 다",
        body: "번들러의 통일 원칙 — 모든 것은 import 그래프의 노드이고, 노드 종류에 따라 변환 결과가 다를 뿐입니다. JS 는 JS 로, CSS 는 개발에선 주입 모듈·배포에선 .css 파일로, 이미지는 URL 문자열 모듈로. 그래프에 있으니 존재 검사(없으면 빌드 실패) · 해시(내용 기반) · 트리 셰이킹(안 쓰면 안 나옴) · 코드 분할(청크별 CSS)이 전부 공짜로 따라옵니다. `public/` 은 그 그래프 밖의 '파일 복사'라서 그 이점이 하나도 없고, 대신 '이름이 그대로'라는 다른 이점이 있습니다. 어느 쪽인지의 판단 기준은 '코드가 참조하나(그래프 안) vs 바깥(크롤러·서비스 워커·외부 링크)이 고정된 이름으로 참조하나(그래프 밖)'입니다.",
      },
      {
        label: "다음 입구",
        body: "이 자산들과 JS 가 어떻게 묶이고 쪼개지고 이름 붙는가 — Rolldown 의 프로덕션 빌드 — 가 6장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 빌드 뒤 작은 SVG 가 dist/assets 에 없는 이유는? 2) CSS 모듈 클래스가 개발과 빌드에서 같은 이름인 이유는? 3) `public/` 에 두어야 하는 자산과 import 해야 하는 자산의 기준은? 4) `import css from './a.css'` 가 안 되는 이유와 대안은?",
      },
    ],
    sources: [
      { label: "Vite — Static Asset Handling", href: `${VITE}/guide/assets` },
      { label: "Vite — Features: CSS", href: `${VITE}/guide/features#css` },
      { label: "Vite — Build Options: assetsInlineLimit", href: `${VITE}/config/build-options#build-assetsinlinelimit` },
    ],
  },

  {
    id: "bundle-s6",
    name: "6장 · 프로덕션 빌드 — Rolldown · 청크 · 해시",
    tagline: "index.html 에서 출발해 그래프 전체를 몇 개의 해시 파일로 접는다",
    intro:
      "`vite build` 는 `<root>/index.html` 을 진입점으로 Rolldown 이 그래프 전체를 묶습니다. 결과는 진입 청크 + 동적 import 경계의 비동기 청크 + 공유 의존성 청크, 각각 내용 해시가 붙은 파일명, 그리고 그것을 가리키도록 다시 쓴 index.html(`<script type=module crossorigin>` · `<link rel=stylesheet>` · `<link rel=modulepreload>`). 기본 타깃은 Baseline Widely Available(Chrome 111 · Edge 111 · Firefox 114 · Safari 16.4), 폴리필은 없습니다(@vitejs/plugin-legacy). 청킹은 `build.rolldownOptions.output` 으로, 매니페스트는 `build.manifest` 로.",
    blocks: [
      {
        label: "실제로 돌려 보면: 두 번의 빌드가 보여 주는 것",
        body: "첫 빌드 — 진입 `index-DtXQI08K.js`(5.43kB · gzip 2.46kB), 동적 import 경계의 `heavy-9Q5z2xLI.js`(0.11kB), CSS 하나. index.html 은 `<script type=\"module\" crossorigin src=\"/assets/index-DtXQI08K.js\">` 와 `<link rel=\"stylesheet\" crossorigin href=\"/assets/index-D3pLvTLE.css\">` 로 다시 쓰였습니다. `--mode staging` 빌드는 내용이 달라져(`staging.example.com` 치환) 해시가 `index-0Cby7Prj.js` 로 바뀌고 heavy 는 그대로 — 내용 해시라 바뀐 파일만 캐시가 갈립니다. 둘째 빌드(플러그인 + `advancedChunks` + `manifest: true`) — `vendor-Dvd9G-NC.js`(node_modules 를 따로, 2.39kB)가 생기고 `.vite/manifest.json` 이 `index.html → assets/index-BPeYG6r7.js, css [...], imports ['_vendor-…']` 를 적습니다. 서버가 어떤 해시 파일을 `<script>` 에 넣어야 하는지를 이 매니페스트로 압니다(백엔드 통합, 10장).",
        code: "$ npx vite build\ndist/index.html                 0.45 kB │ gzip: 0.29 kB\ndist/assets/index-D3pLvTLE.css  4.13 kB │ gzip: 1.48 kB\ndist/assets/heavy-9Q5z2xLI.js   0.11 kB │ gzip: 0.12 kB     # import('./lazy/heavy') 경계\ndist/assets/index-DtXQI08K.js   5.43 kB │ gzip: 2.46 kB\n\n$ npx vite build --mode staging\ndist/assets/heavy-9Q5z2xLI.js   (같음)\ndist/assets/index-0Cby7Prj.js   (내용 바뀜 → 해시 바뀜)\n\n# advancedChunks { groups: [{ name: 'vendor', test: /node_modules/ }] } + manifest: true\ndist/assets/vendor-Dvd9G-NC.js  2.39 kB\ndist/assets/index-BPeYG6r7.js   5.93 kB\n$ cat dist/.vite/manifest.json  (요약)\n_vendor-Dvd9G-NC.js → assets/vendor-Dvd9G-NC.js\nindex.html          → assets/index-BPeYG6r7.js  css: [assets/index-D3pLvTLE.css]  imports: [_vendor-Dvd9G-NC.js]",
        codeLang: "bash",
      },
      {
        label: "청크 셋: 진입 · 비동기 · 공유",
        body: "진입 청크는 index.html(여러 .html 이면 MPA, `rolldownOptions.input` 에 나열)마다 하나. 비동기 청크는 `import()` 경계마다 하나 — 라우트 단위 지연 로딩이 여기서 나옵니다. 공유 청크는 둘 이상의 청크가 함께 쓰는 모듈을 따로 뺀 것. `output.codeSplitting`(옛 manualChunks 자리, 8 에서 객체 형태 제거)과 `advancedChunks.groups` 로 '무엇을 한 파일로 묶을까'(vendor 분리, 라이브러리별 분리)를 정합니다 — 자주 바뀌는 앱 코드와 거의 안 바뀌는 라이브러리를 갈라 두면 배포 때 바뀐 쪽 해시만 갈려 캐시 효율이 좋아집니다. 경고 — `build.chunkSizeWarningLimit` 기본 500kB 를 넘으면 빌드가 알려 줍니다.",
        code: "진입 (entry)        index.html → index-[hash].js        항상 받음\n비동기 (async)      import('./lazy/heavy') → heavy-[hash].js   클릭 때 받음\n공유 (shared)       A 와 B 가 함께 쓰는 모듈 → chunk-[hash].js   중복 없이 한 번\n벤더 (advancedChunks) node_modules → vendor-[hash].js       앱 코드 바뀌어도 캐시 유지\n\n// vite.config.ts\nbuild: { rolldownOptions: { output: { advancedChunks: { groups: [{ name: 'vendor', test: /node_modules/ }] } } } }",
        codeLang: "text",
        terms: [
          {
            term: "내용 해시 (content hash)",
            body: "파일 내용의 해시를 이름에 넣은 것(`index-DtXQI08K.js`). 내용이 같으면 이름이 같아 캐시가 그대로 맞고, 바뀌면 이름이 바뀌어 새로 받습니다. 그래서 자산에는 `Cache-Control: immutable` 1년을, 이름이 고정된 index.html 에는 `no-cache` 를 두는 것이 배포의 기본 짝입니다.",
          },
        ],
      },
      {
        label: "modulepreload 와 로딩 실패",
        body: "빌드는 진입 청크와 그 직접 import 에 `<link rel=\"modulepreload\">` 를 넣어 중첩 import 의 왕복(1장)을 없앱니다. 비동기 청크를 import() 할 때는 그 청크가 import 하는 공유 청크들을 '병렬로 미리' 받는 코드가 끼워집니다(비동기 청크 로딩 최적화). 기본 `build.modulePreload: { polyfill: true }`. 배포 직후 옛 HTML 을 가진 탭이 새 해시의 청크를 요청하면 404 — `vite:preloadError` 이벤트가 `window` 에 발생하니 거기서 `location.reload()` 하는 것이 표준 처방이고, HTML 은 `Cache-Control: no-cache` 로 둡니다.",
        code: "<!-- dist/index.html -->\n<script type=\"module\" crossorigin src=\"/assets/index-DtXQI08K.js\"></script>\n<link rel=\"modulepreload\" crossorigin href=\"/assets/vendor-Dvd9G-NC.js\">   <!-- 직접 import 미리 -->\n<link rel=\"stylesheet\" crossorigin href=\"/assets/index-D3pLvTLE.css\">\n\n// 배포 뒤 옛 탭의 청크 404\nwindow.addEventListener('vite:preloadError', (event) => {\n  event.preventDefault()        // 던지지 않게\n  window.location.reload()      // 새 index.html 로\n})",
      },
      {
        label: "타깃 · base · watch · MPA",
        body: "`build.target` 기본 `'baseline-widely-available'`(2026-01-01 기준 Chrome 111 · Edge 111 · Firefox 114 · Safari 16.4 · iOS 16.4). 더 낮추려면 es2015 까지 가능하되 동적 import 와 `import.meta` 는 필요하고(Chrome 64 · Firefox 67 · Safari 11.1), 폴리필은 `@vitejs/plugin-legacy`. `base`(기본 `/`)는 CDN 이나 하위 경로 배포 때 자산 URL 의 접두어 — `import.meta.env.BASE_URL` 로 코드에서 읽고, `'./'` 는 상대 경로 배포. `vite build --watch` 는 변경마다 다시 빌드(설정 변경은 재시작). 여러 .html 진입점은 `rolldownOptions.input` 에 나열하면 MPA. `build.sourcemap`(기본 false)은 디버깅용 — `'hidden'` 이면 파일은 만들되 주석은 빼서 에러 추적 서비스에만 올립니다.",
        code: "export default defineConfig({\n  base: '/my-app/',                         // 자산 URL 접두어 · import.meta.env.BASE_URL\n  build: {\n    target: 'baseline-widely-available',    // 기본 — Chrome 111 · Firefox 114 · Safari 16.4\n    sourcemap: 'hidden',                    // 파일만, 주석 없이 (에러 추적용)\n    rolldownOptions: { input: { main: 'index.html', admin: 'admin/index.html' } },   // MPA\n  },\n})",
      },
      {
        label: "문제가 나는 경우: 빌드 결과에서",
        body: "프로덕션 빌드에서 자주 보는 것들입니다.",
        code: "증상                                                 원인                                        처방\n──────────────────────────────────────────────────  ─────────────────────────────────────────  ─────────────────────────────\n'Some chunks are larger than 500 kB'                  큰 라이브러리가 진입 청크에                     import() 로 지연 · advancedChunks 로 분리\n배포 뒤 'Failed to fetch dynamically imported module'   옛 HTML 이 새 해시 요청 (404)                    vite:preloadError → reload · HTML no-cache\n하위 경로에서 자산 404                                 base 미설정                                  base: '/sub/'\n빌드마다 전부 해시가 바뀐다                             앱과 벤더가 한 청크                             vendor 분리\n옛 브라우저에서 빈 화면                                 타깃이 Baseline WA · 폴리필 없음                 @vitejs/plugin-legacy\n개발은 되는데 빌드가 깨진다                              사전 번들(관대) vs Rolldown(엄격) · 순환 · CJS      12장\n서버가 어떤 해시 파일을 넣어야 할지 모른다                 백엔드 템플릿                                  build.manifest: true (10장)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 빌드는 '그래프 접기' 이고, 접는 선이 청크 경계다",
        body: "모듈 그래프를 파일로 접을 때 어디서 자를지가 전부입니다. 자르지 않으면(한 파일) 왕복은 최소지만 아무것도 지연되지 않고 한 줄만 바뀌어도 전부 다시 받습니다. 너무 자르면(모듈마다) 개발 서버와 같아져 왕복이 늘어납니다. Vite 의 기본 선은 '동적 import 경계 + 공유 모듈'이고, advancedChunks 가 '바뀌는 빈도'라는 두 번째 기준(벤더 분리)을 더합니다. 해시는 그 선을 캐시에 연결하고, modulepreload 는 선을 자른 비용(왕복)을 되돌려 받습니다. 그래서 청킹 설계의 질문은 하나 — '무엇이 함께 바뀌고, 무엇이 함께 필요한가'.",
        code: "한 파일 ◄──────────────── 접는 정도 ────────────────► 모듈마다\n왕복 1 · 지연 없음 · 전부 재다운로드          Vite 기본: import() 경계 + 공유     개발 서버와 같음 (왕복 多)\n                                              + advancedChunks: 바뀌는 빈도로 벤더 분리\n연결: 해시 → 캐시 · modulepreload → 왕복 상쇄 · manifest → 서버가 이름을 안다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "접을 때 '안 쓰는 코드를 버리는' 트리 셰이킹과 '경계에서 쪼개는' 코드 분할이 7장입니다. 빌드 결과에 `unused()` 가 없었던 이유와 heavy 청크가 따로 나온 이유입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `--mode staging` 빌드에서 heavy 청크의 해시는 안 바뀌고 index 는 바뀐 이유는? 2) 벤더 청크를 따로 두면 배포 때 무엇이 좋아지나요? 3) `vite:preloadError` 가 발생하는 상황과 처방은? 4) 매니페스트는 누가 왜 읽나요?",
      },
    ],
    sources: [
      { label: "Vite — Building for Production", href: `${VITE}/guide/build` },
      { label: "Vite — Build Options", href: `${VITE}/config/build-options` },
      { label: "Vite — Features: Build Optimizations", href: `${VITE}/guide/features#build-optimizations` },
    ],
  },

  {
    id: "bundle-s7",
    name: "7장 · 트리 셰이킹과 코드 분할",
    tagline: "쓰지 않는 export 는 버리고, import() 경계에서 쪼갠다",
    intro:
      "묶을 때 번들러는 두 가지로 결과를 줄입니다. 트리 셰이킹 — ESM 의 정적 import/export 를 따라 '어디서도 쓰이지 않는 export' 를 결과에서 뺍니다. 코드 분할 — `import()` 를 만나면 그 뒤의 그래프를 별도 청크로 떼어 필요할 때 받게 합니다. 둘 다 ESM 의 정적 구조가 전제이고, CommonJS · 부수 효과 · 변수 경로 import 가 그 전제를 깨는 자리입니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: unused() 는 사라지고 heavy 는 따로 나온다",
        body: "`util.ts` 의 `used()` 와 `unused()`(console.log 'I should be tree-shaken' 포함) 중 main.ts 는 used 만 import 했습니다. 빌드 결과 전체에서 'tree-shaken' 문자열을 찾으면 0 — unused 는 결과에 없습니다. `import('./lazy/heavy')` 는 클릭 핸들러 안에 있고, 빌드가 `heavy-9Q5z2xLI.js` 로 떼어 냈습니다(0.11kB — 1000 개 숫자 배열이 압축되어). 진입 청크에는 그 청크를 가져오는 `import(\"./heavy-….js\")` 호출만 남습니다. `import.meta.glob('./lazy/*.ts')` 는 각 파일을 `() => import()` 로 펼쳐 파일마다 청크가 되고, `{ eager: true }` 면 정적 import 로 진입 청크에 들어옵니다.",
        code: "// src/util.ts\nexport const used = () => \"used\";\nexport const unused = () => { console.log(\"I should be tree-shaken\"); return \"unused\"; };\n\n$ cat dist/assets/*.js | grep -c 'tree-shaken'\n0                                              # unused 는 결과에 없다\n\n// src/main.ts\naddEventListener('click', async () => { const m = await import('./lazy/heavy'); console.log(m.sum()) })\n$ ls dist/assets | grep heavy\nheavy-9Q5z2xLI.js                              # import() 경계 → 별도 청크",
        codeLang: "bash",
      },
      {
        label: "트리 셰이킹의 전제: 정적 ESM 과 부수 효과 없음",
        body: "번들러가 export 를 버릴 수 있으려면 두 가지를 알아야 합니다. (1) 무엇이 쓰이는가 — `import { a } from` 처럼 정적으로 적힌 이름. `import * as ns` 뒤 `ns[key]` 처럼 동적 접근이면 전부 남습니다. CommonJS(`require`, `module.exports`)는 정적 분석이 안 되어 셰이킹이 거의 안 됩니다 — 사전 번들링이 CJS 를 ESM 으로 바꾸는 이유 중 하나(2장). (2) 버려도 안전한가 — 모듈을 평가할 때 부수 효과(전역 등록, prototype 패치, CSS import)가 있으면 import 되지 않은 export 라도 모듈 자체는 남겨야 합니다. package.json 의 `\"sideEffects\": false` 가 '이 패키지의 모듈은 부수 효과가 없다'는 선언이고, `/* #__PURE__ */` 주석이 호출 단위 선언입니다(실제로 Vite 의 글롭 출력에 붙어 있음). 배럴 파일(`index.ts` 가 전부 re-export)은 부수 효과 분석을 어렵게 하고 개발 서버의 요청도 늘립니다(12장).",
        code: "셰이킹되는 것                              안 되는 것\n─────────────────────────────────────    ────────────────────────────────────────\nimport { a } from './m'  (정적 이름)       import * as ns; ns[key]  (동적 접근)\nESM export                               CommonJS module.exports (분석 불가)\n부수 효과 없는 모듈                        전역 등록 · prototype 패치 · import './x.css'\n\"sideEffects\": false 패키지               sideEffects 미선언 (보수적으로 남김)\n/* #__PURE__ */ fn()                      결과를 안 쓰는 호출 (부수 효과로 간주)",
        codeLang: "text",
        terms: [
          {
            term: "sideEffects (package.json)",
            body: "'이 패키지의 파일을 import 만 하고 아무 export 도 안 쓰면 통째로 버려도 된다'는 선언. false 또는 부수 효과가 있는 파일 목록(`[\"*.css\"]`). 선언이 없으면 번들러는 모듈을 보수적으로 남겨 라이브러리 전체가 번들에 들어갈 수 있습니다.",
          },
        ],
      },
      {
        label: "코드 분할의 규칙: import() 와 변수 경로",
        body: "`import('./lazy/heavy')` 처럼 정적 문자열이면 경계가 하나. 변수를 섞은 `import(\\`./locales/${lang}.json\\`)` 도 되지만 조건이 있습니다 — 문서: '경로는 ./ ../ # 로 시작해야, 확장자로 끝나야, 변수는 한 디렉터리 깊이만'. Vite 가 그 패턴에 맞는 파일 전부를 청크로 만들어 두고 런타임에 고릅니다. 라우트 단위 분할은 프레임워크가 해 줍니다(Vue Router 의 `component: () => import('./views/A.vue')`, Nuxt · Next 는 자동). 분할의 비용은 '필요할 때 왕복 하나'라 작은 모듈을 쪼개면 손해이고, `build.cssCodeSplit` 이 그 청크의 CSS 도 함께 쪼갭니다(5장).",
        code: "// 되는 것\nimport('./lazy/heavy')                       // 정적 — 청크 1\nimport(`./locales/${lang}.json`)             // 변수 1단계 — 패턴 파일 전부 청크, 런타임 선택\nconst routes = [{ path: '/a', component: () => import('./views/A.vue') }]\n\n// 안 되는 것\nimport(lang + '.json')                       // ./ 로 시작 안 함\nimport(`./locales/${dir}/${lang}.json`)      // 두 단계\nimport(`./locales/${name}`)                  // 확장자 없음",
      },
      {
        label: "문제가 나는 경우: 번들이 크거나 지연이 안 될 때",
        body: "트리 셰이킹과 분할에서 자주 보는 것들입니다.",
        code: "증상                                                원인                                           처방\n─────────────────────────────────────────────────  ────────────────────────────────────────────  ──────────────────────────────\nlodash 전체가 번들에                                  lodash 는 CJS · 단일 모듈                        lodash-es (ESM) 또는 개별 import\n아이콘 라이브러리 전체가 들어온다                       배럴 index 재export + sideEffects 미선언          개별 파일 import · 플러그인(unplugin-icons)\nimport() 했는데 진입 청크에 들어 있다                    같은 모듈을 정적으로도 import 함                   정적 import 제거\nimport(변수) 가 빌드에서 실패                          패턴 규칙 위반 (./ · 확장자 · 1단계)               규칙에 맞게 · import.meta.glob\n내 라이브러리가 소비자에서 셰이킹 안 됨                   sideEffects 미선언 · CJS 출력                     \"sideEffects\": false · ESM 출력\n빌드 분석을 하고 싶다                                  —                                             rollup-plugin-visualizer · --profile\n청크가 너무 많아 왕복이 늘었다                           과도한 분할                                     advancedChunks 로 묶기 · minSize",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 둘 다 '정적 그래프' 위에서만 가능하다",
        body: "트리 셰이킹은 '어떤 가지가 안 쓰이는가'를, 코드 분할은 '어디서 가지를 자를까'를 그래프에서 읽습니다. 그래서 둘의 전제가 같습니다 — 그래프가 빌드 시점에 정적으로 보여야 합니다. ESM 의 import/export 는 문법상 정적이라 가능하고, CommonJS 의 require 는 함수 호출이라 불가능합니다(TypeScript 허브의 ESM/CJS 상호운용이 같은 사실의 다른 얼굴). 변수 import() 의 제한도 '패턴을 정적으로 열거할 수 있을 때만'이고, sideEffects 는 '평가의 결과도 정적이라고 믿어 달라'는 선언입니다. 번들 크기를 줄이는 모든 기법은 결국 '그래프를 더 정적으로 만들기'입니다.",
      },
      {
        label: "다음 입구",
        body: "빌드 결과에 치환되는 또 하나 — `import.meta.env` — 가 8장입니다. 어떤 변수가 클라이언트 번들에 들어가고(VITE_), 어떤 것은 들어가지 않는지(SECRET_KEY)를 실제 빌드 결과에서 확인합니다.",
      },
      {
        label: "확인 질문",
        body: "1) `unused()` 가 빌드 결과에 없는 두 전제는? 2) CommonJS 라이브러리가 트리 셰이킹되지 않는 이유는? 3) `import(\\`./x/${a}/${b}.json\\`)` 이 안 되는 이유는? 4) `\"sideEffects\": false` 는 누구에게 무엇을 약속하나요?",
      },
    ],
    sources: [
      { label: "Vite — Features: Glob Import · Dynamic Import", href: `${VITE}/guide/features#glob-import` },
      { label: "Vite — Build Options: rolldownOptions", href: `${VITE}/config/build-options#build-rolldownoptions` },
      { label: "Vite — Performance: Avoid Barrel Files", href: `${VITE}/guide/performance#avoid-barrel-files` },
    ],
  },

  {
    id: "bundle-s8",
    name: "8장 · 환경 변수와 모드",
    tagline: "VITE_ 로 시작하는 것만 클라이언트에 들어가고, 모드가 어느 .env 를 읽을지 정한다",
    intro:
      "`import.meta.env` 는 빌드 시점 상수입니다. 내장 — MODE · BASE_URL · PROD · DEV · SSR. 사용자 변수는 `.env` 파일에서 오되 `VITE_` 접두어가 있는 것만 클라이언트 코드에 노출됩니다(`envPrefix` 로 변경). 파일은 `.env` → `.env.local` → `.env.[mode]` → `.env.[mode].local` 순으로 겹쳐 읽고, 모드는 `vite dev` 가 development · `vite build` 가 production 이며 `--mode staging` 으로 바꿉니다. 모드와 NODE_ENV 는 다른 것입니다.",
    blocks: [
      {
        label: "실제로 돌려 보면: SECRET_KEY 는 번들에 없다",
        body: "`.env` 에 `VITE_API_URL=https://api.example.com` 과 `SECRET_KEY=should-not-leak` 를 두고 main.ts 에서 둘 다 `import.meta.env.X` 로 읽었습니다. 빌드 결과 전체에서 `api.example.com` 은 있고 `should-not-leak` 와 `SECRET_KEY` 는 없습니다 — 접두어 없는 변수는 `undefined` 로 치환되어 아무 흔적이 없습니다. 개발 서버의 `import.meta.env` 객체도 `VITE_API_URL` 만 담고 있었습니다(3장). `.env.staging` 에 `VITE_API_URL=https://staging.example.com` 을 두고 `--mode staging` 으로 빌드하면 번들에 `staging.example.com` 이 들어가고 해시가 바뀌었습니다(6장).",
        code: "# .env\nVITE_API_URL=https://api.example.com\nSECRET_KEY=should-not-leak\n# .env.staging\nVITE_API_URL=https://staging.example.com\n\n$ npx vite build && cat dist/assets/*.js | grep -o 'api.example.com\\|should-not-leak\\|SECRET_KEY' | sort -u\napi.example.com                                  # VITE_ 만 — 나머지는 undefined 로 치환\n\n$ npx vite build --mode staging && cat dist/assets/*.js | grep -o 'staging.example.com'\nstaging.example.com\n\n# 개발 서버가 끼운 객체 (3장)\nimport.meta.env = {\"BASE_URL\": \"/\", \"DEV\": true, \"MODE\": \"development\", \"PROD\": false, \"SSR\": false, \"VITE_API_URL\": \"https://api.example.com\"};",
        codeLang: "bash",
      },
      {
        label: "파일 순서 · 모드 · NODE_ENV",
        body: "읽는 순서(뒤가 이김) — `.env`(항상) · `.env.local`(항상, gitignore) · `.env.[mode]` · `.env.[mode].local`. 이미 셸에 있는 변수가 최우선. 값은 전부 문자열이라 `\"true\"` 를 불리언으로 쓰려면 직접 바꿉니다. 모드 ≠ NODE_ENV — 문서의 표: `vite build` 는 NODE_ENV production · 모드 production, `vite build --mode development` 는 NODE_ENV production · 모드 development, `NODE_ENV=development vite build` 는 NODE_ENV development · 모드 production. `PROD`/`DEV` 는 NODE_ENV 를 따르고, `.env.[mode]` 안에서 `NODE_ENV=development` 를 적어 둘을 묶을 수 있습니다. `.env` 는 `envDir`(기본 root) 에서 읽고 `false` 면 안 읽습니다.",
        code: "명령                                        NODE_ENV       import.meta.env.MODE   PROD / DEV\n─────────────────────────────────────────  ────────────  ─────────────────────  ──────────\nvite  (dev)                                 development    development            false / true\nvite build                                  production     production             true / false\nvite build --mode staging                   production     staging                true / false\nvite build --mode development               production     development            true / false\nNODE_ENV=development vite build             development    production             false / true\n\n파일 우선순위 (뒤가 이김): .env < .env.local < .env.[mode] < .env.[mode].local < 셸 변수",
        codeLang: "text",
      },
      {
        label: "타입 · HTML 치환 · 보안",
        body: "IntelliSense 는 `src/vite-env.d.ts` 에 `interface ImportMetaEnv { readonly VITE_API_URL: string }` 과 `interface ImportMeta { readonly env: ImportMetaEnv }` 를 두면 됩니다 — 문서의 주의: 그 파일에 `import` 문이 있으면 전역 보강이 모듈 보강으로 바뀌어 깨집니다(TypeScript 허브의 '전역 .d.ts 에 import 를 넣으면 모듈이 된다'). index.html 안에서는 `%VITE_API_URL%` · `%MODE%` 로 치환되고 모르는 `%X%` 는 그대로 남습니다(JS 에서는 undefined). 보안 — 문서: 'VITE_* 변수는 API 키 같은 민감한 정보를 담아서는 안 된다'. 클라이언트 번들은 누구나 읽습니다. `envPrefix: ''` 는 모든 변수를 노출하므로 Vite 가 에러를 냅니다. `.env.local` 과 `*.local` 은 .gitignore 에.",
        code: "// src/vite-env.d.ts — import 문 없이!\ninterface ImportMetaEnv { readonly VITE_API_URL: string; readonly VITE_FEATURE_X?: string }\ninterface ImportMeta { readonly env: ImportMetaEnv }\n\n<!-- index.html -->\n<title>%VITE_APP_TITLE% (%MODE%)</title>\n\n// 보안 규칙\nVITE_API_URL=…        ✓ 공개 가능한 값 (엔드포인트 · 기능 플래그)\nVITE_SECRET=…         ✗ 번들에 그대로 들어간다 — 서버 환경 변수로",
      },
      {
        label: "문제가 나는 경우: 변수가 안 보일 때",
        body: "환경 변수에서 자주 보는 것들입니다.",
        code: "증상                                              원인                                       처방\n───────────────────────────────────────────────  ────────────────────────────────────────  ─────────────────────────────\nimport.meta.env.API_URL 이 undefined                VITE_ 접두어 없음                            VITE_API_URL · 또는 envPrefix\n.env 를 고쳤는데 안 바뀐다                           서버 시작 때 읽음                             개발 서버 재시작\n타입이 any 라 자동 완성이 없다                        vite-env.d.ts 없음                            ImportMetaEnv 선언\nvite-env.d.ts 를 썼는데 타입이 안 먹는다              파일에 import 가 있어 모듈화                     import 제거 (전역 .d.ts 유지)\nstaging 빌드가 production 값                        .env.staging 없음 · 우선순위                    파일 이름 · --mode 확인\nPROD 가 false 인데 빌드다                            NODE_ENV=development 로 빌드                    NODE_ENV 와 모드 구분\n%VITE_X% 가 HTML 에 그대로                          변수 미정의 (HTML 은 그대로 둠)                   정의 · 또는 transformIndexHtml\n비밀 키가 번들에 보인다                               VITE_ 를 붙였다                               서버로 옮기기 — 클라이언트는 전부 공개",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 환경 변수는 '빌드 시점 치환' 이라 런타임에 바꿀 수 없다",
        body: "`import.meta.env.X` 는 코드의 그 자리에 문자열이 박히는 것입니다(실제로 번들에 `api.example.com` 이 글자로 들어감). 그래서 '한 번 빌드해서 여러 환경에 배포'가 안 됩니다 — 환경마다 빌드하거나(`--mode`), 런타임 설정은 서버가 내려주는 JSON · `window.__CONFIG__` · HTML 의 메타 태그처럼 '빌드 밖'의 경로로 받아야 합니다. Next·Nuxt 허브의 runtimeConfig(Nuxt 는 `NUXT_*` 환경 변수로 런타임 덮어쓰기, Next 는 서버에서 `process.env` 를 런타임에)가 이 문제에 대한 메타 프레임워크의 답입니다. 접두어 규칙은 '빌드에 박히는 것은 전부 공개'라는 사실을 이름에 새겨 둔 것입니다.",
        code: "빌드 시점 (Vite)                            런타임 (서버가 있을 때)\nimport.meta.env.VITE_X → \"값\" 으로 치환      process.env.X (서버 코드) · runtimeConfig (Nuxt) · window.__CONFIG__ (HTML 주입)\n환경마다 빌드 (--mode)                        한 번 빌드, 배포마다 다른 값\n누구나 읽음 → VITE_ 접두어 = '공개' 표시       서버 전용 비밀 가능",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "3장의 변환 사슬과 6장의 빌드를 '내 손으로 끼우는' 길이 9장 플러그인 API 입니다. 가상 모듈로 빌드 시점 정보를 넣는 것(실제로 `virtual:build-info`)이 환경 변수의 확장판입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `SECRET_KEY` 가 번들에 없는 메커니즘은? 2) `.env.staging` 이 `.env` 를 이기는 순서 규칙은? 3) `vite build --mode development` 의 NODE_ENV 와 MODE 는? 4) '한 번 빌드해서 여러 환경에 배포'가 import.meta.env 로 안 되는 이유와 대안은?",
      },
    ],
    sources: [
      { label: "Vite — Env Variables and Modes", href: `${VITE}/guide/env-and-mode` },
      { label: "Vite — Shared Options: envPrefix · envDir", href: `${VITE}/config/shared-options#envprefix` },
    ],
  },

  {
    id: "bundle-s9",
    name: "9장 · 플러그인 API",
    tagline: "Rolldown 훅에 Vite 훅을 더한 객체 하나 — 가상 모듈 · 변환 · 서버 끼우기",
    intro:
      "Vite 플러그인은 Rolldown(Rollup 호환) 플러그인에 Vite 전용 훅을 더한 객체입니다. 범용 훅 — options · buildStart(서버 시작 때 한 번), resolveId · load · transform(모듈 요청마다), buildEnd · closeBundle(종료). Vite 전용 — config · configResolved · configureServer · configurePreviewServer · transformIndexHtml · handleHotUpdate. `enforce: 'pre' | 'post'` 로 순서를, `apply: 'build' | 'serve'` 로 적용 모드를 정합니다. 가상 모듈은 `\\0` 접두어 관례, 클라이언트 ↔ 서버 통신은 `hot.on/send` 와 `server.ws`.",
    blocks: [
      {
        label: "실제로 돌려 보면: 가상 모듈 + transform 플러그인 하나",
        body: "`virtual:build-info` 라는 가상 모듈을 resolveId 가 `\\0virtual:build-info` 로 바꾸고 load 가 `export const builtAt = …; export const mode = …` 를 돌려주게, transform 이 util.ts 의 문자열을 바꾸게, configResolved 가 명령·모드·base 를 찍게 했습니다. 빌드에서 `[probe-virtual] command=build mode=production base=/` 가 찍히고 결과 h1 이 'used (transformed by plugin)' 으로 바뀌었습니다. 개발 서버에서는 가상 모듈이 `/@id/__x00__virtual:build-info` URL 로 서빙되고(`\\0` 이 `__x00__` 로) `mode = \"development\"` 를 돌려줍니다 — 같은 플러그인이 두 모드에서 그대로 동작합니다. 타입은 `declare module 'virtual:build-info'` 선언 파일로(TypeScript 허브의 앰비언트 모듈).",
        code: "// vite.config.ts\nfunction virtualAndTransform(): Plugin {\n  const id = 'virtual:build-info', resolved = '\\0' + id\n  return {\n    name: 'probe-virtual', enforce: 'pre',\n    resolveId(source) { if (source === id) return resolved },\n    load(idd) { if (idd === resolved) return `export const builtAt = ${JSON.stringify(new Date().toISOString())}; export const mode = ${JSON.stringify(process.env.NODE_ENV)};` },\n    transform(code, idd) { if (idd.endsWith('util.ts')) return { code: code.replace('\"used\"', '\"used (transformed by plugin)\"'), map: null } },\n    configResolved(cfg) { console.log('[probe-virtual] command=%s mode=%s base=%s', cfg.command, cfg.mode, cfg.base) },\n  }\n}\n\n$ npx vite build\n[probe-virtual] command=build mode=production base=/\n$ curl -s 'localhost:4330/@id/__x00__virtual:build-info'\nexport const builtAt = \"2026-11-12T05:39:56.773Z\"; export const mode = \"development\";",
        terms: [
          {
            term: "가상 모듈 (virtual module)",
            body: "디스크에 없는 모듈을 플러그인이 만들어 주는 것. 관례는 사용자가 쓰는 id(`virtual:x`)와 내부 id(`\\0virtual:x`)를 나누는 것 — `\\0` 은 다른 플러그인이 이 id 를 파일로 해석하려 들지 않게 하는 표시이고, 브라우저 URL 로는 `/@id/__x00__virtual:x` 가 됩니다. 빌드 정보 · 라우트 목록 · 아이콘 묶음처럼 '코드 생성'이 이 자리입니다.",
          },
        ],
      },
      {
        label: "훅의 순서와 적용",
        body: "플러그인 배열은 정해진 순서로 재배열됩니다 — Alias → `enforce: 'pre'` 사용자 플러그인 → Vite 코어 → 일반 사용자 플러그인 → Vite 빌드 플러그인 → `enforce: 'post'` 사용자 플러그인 → Vite 후처리(압축 · 매니페스트 · 리포트). 그래서 '다른 플러그인이 만지기 전에 소스를 보고 싶다'면 pre, '최종 코드를 보고 싶다'면 post. `apply: 'build' | 'serve'` 또는 함수 `(config, { command }) => boolean` 으로 한 모드에만. 훅 안에서 `this.environment`(8 의 환경 API — client · ssr) 로 어느 환경을 처리 중인지 알 수 있고, `transform(code, id, { ssr })` 의 옵션이 SSR 분기(10장). 문서의 팁 — `vite-plugin-inspect` 를 넣고 `localhost:5173/__inspect/` 에서 각 플러그인이 모듈을 어떻게 바꿨는지 봅니다.",
        code: "실행 순서 (재배열)\nAlias → [enforce: 'pre' 사용자] → Vite 코어 → [일반 사용자] → Vite 빌드 → [enforce: 'post' 사용자] → 압축 · 매니페스트\n\n훅            언제                              예\n────────────  ───────────────────────────────  ─────────────────────────────\nconfig        설정 해석 전 (수정 가능)            기본값 끼우기\nconfigResolved 설정 확정 뒤 (읽기)               command/mode 로 분기 준비\nconfigureServer 개발 서버 생성 (빌드엔 없음)      미들웨어 추가 · server.ws\nresolveId/load/transform  모듈마다              가상 모듈 · 변환\ntransformIndexHtml  HTML                        태그 주입 (order: 'pre'/'post')\nhandleHotUpdate / hotUpdate  파일 변경           커스텀 HMR 전파\nbuildStart/buildEnd/closeBundle  빌드 수명        리포트 · 정리",
        codeLang: "text",
      },
      {
        label: "서버 끼우기와 클라이언트 통신",
        body: "`configureServer(server)` 에서 `server.middlewares.use(...)` 로 Connect 미들웨어를 더합니다(API 목업, 인증 시뮬레이션). 반환한 함수는 Vite 내부 미들웨어 뒤에 실행됩니다(post 훅 — SSR 미들웨어가 이 자리). 클라이언트와의 통신 — 서버 `server.ws.send('my:event', data)` → 클라이언트 `import.meta.hot.on('my:event', cb)`, 거꾸로 `hot.send` → `server.ws.on`. 문서의 노트 — 이벤트 이름에 항상 접두어를. `transformIndexHtml` 은 문자열 반환(치환) 또는 `{ html, tags: [{ tag, attrs, injectTo }] }` 로 태그 주입. 프레임워크 플러그인(@vitejs/plugin-vue · plugin-react)이 이 훅들로 SFC 컴파일과 Fast Refresh 를 끼웁니다.",
        code: "export default function myPlugin(): Plugin {\n  return {\n    name: 'my-plugin',\n    configureServer(server) {\n      server.middlewares.use('/__mock', (req, res) => { res.end(JSON.stringify({ ok: true })) })\n      server.ws.on('my:ping', (data, client) => client.send('my:pong', { got: data }))   // 클라이언트 ← 서버\n      return () => { /* Vite 내부 미들웨어 뒤에 실행 (SSR 렌더 등) */ }\n    },\n    transformIndexHtml(html) { return { html, tags: [{ tag: 'meta', attrs: { name: 'built', content: 'now' }, injectTo: 'head' }] } },\n  }\n}\n// 클라이언트\nif (import.meta.hot) { import.meta.hot.send('my:ping', 1); import.meta.hot.on('my:pong', console.log) }",
      },
      {
        label: "문제가 나는 경우: 플러그인을 쓸 때",
        body: "플러그인 관련으로 자주 보는 것들입니다.",
        code: "증상                                              원인                                          처방\n───────────────────────────────────────────────  ───────────────────────────────────────────  ──────────────────────────────\n내 transform 이 변환된 코드를 받는다 (TS 아님)        순서가 Vite 코어 뒤                              enforce: 'pre'\nconfig 훅에서 plugins 를 추가했는데 무효              '사용자 플러그인은 config 훅 전에 해석됨'           plugins 배열에서 직접\nconfigureServer 가 빌드에서 안 불린다                 개발 전용 훅                                    정상 — 빌드는 buildStart 등\n가상 모듈을 다른 플러그인이 파일로 찾으려 한다           \\0 접두어 없음                                  resolveId 에서 \\0 붙이기\nRollup 플러그인이 Vite 에서 깨진다                     dev 에만 없는 훅 (moduleParsed 등) · 포맷 가정      Vite 호환 목록 확인 · apply: 'build'\n이벤트가 다른 플러그인과 충돌                          접두어 없는 이름                                 'myplugin:event'\n플러그인 때문에 느리다                                 transform 이 모든 파일을 봄                       필터(id 검사) · vite --profile (12장)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 플러그인은 '모듈 하나를 바꾸는 함수들' 의 사슬이다",
        body: "번들러의 다섯 일(허브) 중 해석과 변환이 플러그인의 자리입니다 — resolveId 가 해석을, load 와 transform 이 변환을 가로채고, 나머지 훅은 그 사슬의 앞뒤(설정 · 서버 · HTML · HMR)입니다. 모듈 단위 함수라는 점이 개발과 배포에서 '같은 플러그인'이 돌게 하는 이유이고(3장의 게으른 변환 + 6장의 Rolldown 이 같은 훅을 부름), 동시에 '전체를 봐야 하는 일'(타입 검사, 전역 분석)에는 맞지 않는 이유입니다. Vue SFC · React JSX · Svelte · MDX · 아이콘 · SVG 컴포넌트 · 모킹 — 전부 '이 확장자의 파일을 이렇게 JS 로' 라는 transform 하나로 설명됩니다.",
        code: "import 'x'  →  resolveId(x) ──► id  →  load(id) ──► code  →  transform(code, id) ──► JS  →  브라우저(dev) / Rolldown(build)\n                 ↑ 플러그인 A        ↑ 플러그인 B           ↑ 플러그인 C, D (순서: pre → 코어 → 일반 → post)\n\n모듈 단위 함수 = 두 모드에서 재사용 · 전역 분석엔 부적합 (tsc 는 따로)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "플러그인 훅의 `ssr` 옵션과 `configureServer` 의 post 미들웨어가 쓰이는 자리 — SSR · 백엔드 통합 · 라이브러리 모드 — 가 10장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 가상 모듈 id 에 `\\0` 을 붙이는 이유와 브라우저 URL 에서의 모양은? 2) `enforce: 'pre'` 가 필요한 상황은? 3) `configureServer` 가 반환한 함수는 언제 실행되나요? 4) 같은 플러그인이 개발과 빌드에서 그대로 도는 구조적 이유는?",
      },
    ],
    sources: [
      { label: "Vite — Plugin API", href: `${VITE}/guide/api-plugin` },
      { label: "Vite — Using Plugins", href: `${VITE}/guide/using-plugins` },
      { label: "Vite — Environment API: Plugins", href: `${VITE}/guide/api-environment-plugins` },
    ],
  },

  {
    id: "bundle-s10",
    name: "10장 · SSR · 백엔드 통합 · 라이브러리 모드",
    tagline: "브라우저 밖에서도 같은 그래프를 쓰는 세 가지 길",
    intro:
      "Vite 는 SPA 만의 도구가 아닙니다. SSR — 개발 서버를 미들웨어 모드로 Express 에 끼우고 `ssrLoadModule` 로 서버 진입점을 실행해 HTML 을 만들고, 배포는 클라이언트 빌드와 `--ssr` 빌드 둘. 백엔드 통합 — Rails · Laravel · Django 템플릿이 Vite 가 만든 자산을 가리키도록 매니페스트를 읽기. 라이브러리 모드 — `build.lib` 로 패키지(es · umd · cjs)를 내보내기. 문서의 자리 — SSR 은 '라이브러리·프레임워크 저자용 저수준 API' 이고 보통은 Nuxt · Next · SvelteKit 같은 상위 도구를 쓰라.",
    blocks: [
      {
        label: "SSR 의 흐름: 개발과 배포",
        body: "소스 — `index.html`(`<!--ssr-outlet-->` 자리) · `entry-client.js`(hydrate) · `entry-server.js`(render). 개발 — `createViteServer({ server: { middlewareMode: true }, appType: 'custom' })` 를 Express 에 `app.use(vite.middlewares)` 로 끼우고, 요청마다 `vite.transformIndexHtml` → `vite.ssrLoadModule('/src/entry-server.js')` → `render()` → 자리 치환. 에러는 `vite.ssrFixStacktrace(e)` 로 소스맵 적용. 배포 — `vite build --outDir dist/client` 와 `vite build --ssr src/entry-server.js --outDir dist/server` 두 번, 서버는 `dist/client/index.html` 과 `import('./dist/server/entry-server.js')`. `import.meta.env.SSR` 은 정적 치환되어 분기가 제거됩니다. `--ssrManifest` 가 '어느 모듈이 어느 청크·CSS 를 쓰는가'를 적어 preload 태그를 만들게 합니다.",
        code: "// server.js (dev)\nconst vite = await createViteServer({ server: { middlewareMode: true }, appType: 'custom' })\napp.use(vite.middlewares)\napp.use('*', async (req, res) => {\n  try {\n    let template = await vite.transformIndexHtml(req.originalUrl, fs.readFileSync('index.html', 'utf-8'))\n    const { render } = await vite.ssrLoadModule('/src/entry-server.js')\n    res.end(template.replace('<!--ssr-outlet-->', await render(req.originalUrl)))\n  } catch (e) { vite.ssrFixStacktrace(e); next(e) }\n})\n\n# 배포 — 두 번 빌드\n$ vite build --outDir dist/client\n$ vite build --ssr src/entry-server.js --outDir dist/server --ssrManifest",
      },
      {
        label: "SSR 의 외부화와 타깃",
        body: "SSR 빌드는 기본으로 의존성을 외부화합니다 — 번들에 넣지 않고 Node 가 `node_modules` 에서 require/import 하게. `ssr.noExternal` 로 특정 패키지를 변환해 번들에 넣고(ESM 전용이라 Node 가 못 읽는 경우, CSS 를 import 하는 컴포넌트 라이브러리), `ssr.external` 로 링크된 패키지를 외부화. `ssr.target: 'webworker'` 면 Cloudflare Workers 식 런타임용으로 전부 번들(`ssr.noExternal: true`, Node 내장 쓰면 에러). 플러그인은 `transform(code, id, { ssr })` 의 ssr 플래그로 서버 분기. Nuxt 가 이 전부를 Nitro 와 묶어 '한 번 빌드 → .output' 으로 만든 것이 Next·Nuxt 허브의 서버 엔진 장이고, Nuxt 의 `nuxt build` 출력에 `vite v8.3.8 building ssr environment` 가 찍히는 것이 실제로 이 SSR 빌드입니다.",
        code: "ssr: {\n  noExternal: ['some-esm-only-lib', /^@my-ui\\//],   // 번들에 넣어 변환\n  external: ['linked-pkg'],                          // 외부화 (Node 가 로드)\n  target: 'node',                                     // 'webworker' 면 전부 번들\n}\n\n# Nuxt 가 실제로 돌리는 것 (nuxt build 출력)\nvite v8.3.8 building client environment for production...\nvite v8.3.8 building ssr environment for production...",
      },
      {
        label: "백엔드 통합: 매니페스트가 다리다",
        body: "Rails · Laravel · Django 처럼 서버가 HTML 을 만드는 곳에 Vite 를 붙일 때. 개발 — 템플릿에 `<script type=module src=\"http://localhost:5173/@vite/client\">` 와 진입점을 직접 적고(React 면 Fast Refresh 프리앰블도), `server.cors` 로 서버 오리진 허용. 배포 — `build.manifest: true` 로 `.vite/manifest.json` 을 만들고(6장에서 실제로: `index.html → assets/index-BPeYG6r7.js, css [...], imports [...]`), 서버가 그 파일을 읽어 `<script src=\"/assets/index-[hash].js\">` 와 `<link>` 를 렌더합니다. 진입점은 `rolldownOptions.input` 에 html 대신 js 파일을 두고 `build.outDir` 을 서버의 정적 폴더로. 각 프레임워크 커뮤니티 플러그인(vite_rails · laravel-vite-plugin)이 이 매니페스트 읽기를 대신해 줍니다.",
        code: "// vite.config.ts\nbuild: { manifest: true, outDir: 'public/build', rolldownOptions: { input: 'src/main.ts' } }\n\n// 서버 템플릿 (의사코드)\nconst entry = manifest['src/main.ts']\n<script type=\"module\" src=\"/build/${entry.file}\"></script>\n${entry.css.map(c => `<link rel=\"stylesheet\" href=\"/build/${c}\">`)}\n${entry.imports.map(i => `<link rel=\"modulepreload\" href=\"/build/${manifest[i].file}\">`)}",
      },
      {
        label: "라이브러리 모드",
        body: "`build.lib: { entry, name, fileName }` 이면 index.html 대신 JS 진입점에서 패키지를 만듭니다. 포맷 기본 — 진입점 하나면 `['es', 'umd']`, 여럿이면 `['es', 'cjs']`, umd/iife 는 전역 이름(`name`) 필요. 의존성(react · vue)은 `rolldownOptions.external` 로 빼고 소비자가 설치하게. CSS 는 하나로 모아 `build.lib.cssFileName`. 문서의 노트 셋 — lib 모드에서 `assetsInlineLimit` 은 무시, `cssCodeSplit` 기본 false, package.json 에 `\"type\": \"module\"` 이 없으면 `.js` 가 `.mjs` 로 `.cjs` 가 `.js` 로. `import.meta.env.*` 는 치환되지만 `process.env.*` 는 안 됩니다. 타입(.d.ts)은 Vite 가 안 만드니 `vite-plugin-dts` 또는 `tsc --emitDeclarationOnly`(TypeScript 허브 선언 파일).",
        code: "export default defineConfig({\n  build: {\n    lib: { entry: 'src/index.ts', name: 'MyLib', fileName: 'my-lib' },   // → dist/my-lib.js (es) · my-lib.umd.cjs\n    rolldownOptions: { external: ['vue'], output: { globals: { vue: 'Vue' } } },\n  },\n})\n// package.json\n{ \"type\": \"module\", \"exports\": { \".\": { \"import\": \"./dist/my-lib.js\", \"require\": \"./dist/my-lib.umd.cjs\", \"types\": \"./dist/index.d.ts\" } } }",
      },
      {
        label: "문제의 구조: 세 길의 공통점은 '그래프는 하나, 소비자가 다르다'",
        body: "SPA 는 브라우저가 index.html 을 열어 그래프를 읽고, SSR 은 Node 가 entry-server 로 같은 그래프를 먼저 읽어 HTML 을 만든 뒤 브라우저가 entry-client 로 다시 읽어 hydrate 하며(한 그래프, 두 환경 — Vite 8 의 환경 API 가 client · ssr 을 1급으로 다룸), 백엔드 통합은 다른 서버가 HTML 을 만들되 자산 이름만 매니페스트로 받고, 라이브러리 모드는 다른 번들러가 소비합니다. 그래서 설정이 '진입점이 무엇인가(html · js)', '무엇을 외부화하나(ssr.external · rolldownOptions.external)', '출력 포맷(es · cjs · umd)'의 조합이고, 모듈 그래프 자체는 같습니다. Nuxt 와 Next 는 이 조합을 '한 명령'으로 접은 것입니다.",
        code: "            진입점            소비자                 외부화                 출력\nSPA         index.html        브라우저                없음                   dist/ (해시 자산)\nSSR         entry-server.js   Node → 브라우저(hydrate) 의존성 (기본)           dist/server + dist/client\n백엔드 통합  src/main.ts        다른 서버의 템플릿        없음                   outDir + manifest.json\n라이브러리   src/index.ts       다른 번들러              peer deps (external)   es · cjs · umd + .d.ts",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "지금까지 흩어 쓴 옵션들의 기본값을 한 표로 모은 것이 11장 설정 레퍼런스입니다. SSR 의 '프레임워크 쪽' 전부는 Next·Nuxt 허브입니다.",
      },
      {
        label: "확인 질문",
        body: "1) SSR 개발 서버에서 요청 하나가 거치는 세 호출은? 2) SSR 빌드가 의존성을 기본으로 외부화하는 이유와 noExternal 이 필요한 경우는? 3) 백엔드 통합에서 매니페스트가 하는 일은? 4) 라이브러리 모드에서 vue 를 external 로 빼는 이유는?",
      },
    ],
    sources: [
      { label: "Vite — Server-Side Rendering", href: `${VITE}/guide/ssr` },
      { label: "Vite — Backend Integration", href: `${VITE}/guide/backend-integration` },
      { label: "Vite — Building for Production: Library Mode", href: `${VITE}/guide/build#library-mode` },
    ],
  },

  {
    id: "bundle-s11",
    name: "11장 · 설정 레퍼런스 요약",
    tagline: "vite.config 의 옵션은 '어느 단계 · 어느 모드' 로 읽는다",
    intro:
      "`vite.config.ts` 는 `defineConfig({...})` 하나이고 함수 형태 `({ command, mode }) => ({...})` 로 모드별 분기가 됩니다(설정 파일 자체도 Rolldown 으로 번들되어 TS · ESM 그대로). 옵션은 공유(root · base · mode · define · plugins · publicDir · cacheDir · resolve · css · json · oxc · assetsInclude · logLevel · envDir · envPrefix · appType) · server · build · preview · optimizeDeps · ssr · worker 로 나뉩니다. 이 시트는 자주 보는 옵션의 기본값을 한 표로 모았습니다 — 허브의 '다섯 일'과 '두 모드'를 축으로.",
    blocks: [
      {
        label: "공유 옵션 — 두 모드에 다 적용",
        body: "문서의 shared-options 페이지에서 기본값이 적힌 것들입니다.",
        code: "옵션                 기본값                                            한 줄\n──────────────────  ──────────────────────────────────────────────  ──────────────────────────────────────\nroot                 process.cwd()                                     index.html 이 있는 곳\nbase                 '/'                                               자산 URL 접두어 · './' 상대\nmode                 serve 'development' · build 'production'           --mode 로 덮음 (8장)\ndefine               —                                                 전역 상수 치환 (JSON 직렬화 가능 값)\nplugins              —                                                 falsy 무시 · 배열 평탄화 · Promise 대기\npublicDir            'public'                                          그대로 복사 · false 로 끔\ncacheDir             'node_modules/.vite'                              사전 번들 캐시 (2장)\nresolve.alias        —                                                 '@' → '/src'\nresolve.conditions   ['module', 'browser', 'development|production']   exports 조건\nresolve.extensions   ['.mjs','.js','.mts','.ts','.jsx','.tsx','.json']  확장자 추론 순서\ncss.modules          —                                                 postcss-modules 옵션\ncss.devSourcemap     false                                             (실험적)\njson.stringify       'auto'                                            10kB 넘으면 JSON.parse 로\noxc                  (ts·jsx·tsx 에 적용)                               esbuild 옵션은 oxc 로 변환 (폐기)\nlogLevel             'info'                                            warn · error · silent\nenvDir               root                                              false 면 .env 안 읽음\nenvPrefix            'VITE_'                                           '' 는 에러 (보안)\nappType              'spa'                                             mpa · custom (SPA 폴백 유무)",
        codeLang: "text",
      },
      {
        label: "빌드 옵션 — 배포 모드",
        body: "build-options 페이지의 기본값. '명시되지 않으면 이 절의 옵션은 빌드에만 적용'.",
        code: "옵션                       기본값                                        한 줄\n────────────────────────  ───────────────────────────────────────────  ─────────────────────────────────\nbuild.target               'baseline-widely-available'                   Chrome 111 · Edge 111 · Firefox 114 · Safari 16.4\nbuild.outDir               'dist'\nbuild.assetsDir            'assets'                                      lib 모드엔 미사용\nbuild.assetsInlineLimit    4096                                          미만은 인라인 · 0 끔 · lib 에선 무시\nbuild.cssCodeSplit         true                                          lib 면 false\nbuild.cssMinify            'lightningcss'                                 minify 끄면 false\nbuild.minify               'oxc' (client) · false (ssr)                  'terser' 가능 · 'esbuild' 폐기\nbuild.sourcemap            false                                         true · 'inline' · 'hidden'\nbuild.rolldownOptions      —                                             Rolldown 에 그대로 (rollupOptions 는 별칭)\nbuild.lib                  —                                             entry · name · fileName · formats\nbuild.manifest             false                                         true → .vite/manifest.json\nbuild.ssrManifest          false                                         true → .vite/ssr-manifest.json\nbuild.chunkSizeWarningLimit 500 (kB)\nbuild.watch                null                                          {} 로 감시\nbuild.modulePreload        { polyfill: true }                            lib 모드엔 폴리필 없음\nbuild.emptyOutDir          outDir 이 root 안이면 true\nbuild.copyPublicDir        true",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 설정 함수와 환경별 분기",
        body: "함수 형태 설정에서 `command` 는 'serve' | 'build', `mode` 는 모드 문자열, `isSsrBuild` · `isPreview` 도 옵니다. 실제로 9장 플러그인의 configResolved 가 `command=build mode=production base=/` 를 찍은 것이 그 값들입니다. `defineConfig` 는 타입만 주는 함수이고, `vite.config.ts` 는 Vite 가 Rolldown 으로 번들해 실행하므로 TS · ESM · 최상위 await 가 됩니다. 설정에서 `loadEnv(mode, process.cwd())` 로 .env 를 읽어 설정에 쓸 수 있습니다(`import.meta.env` 는 설정 파일에서는 없음). Vite 8 의 환경 API 는 `environments: { client: {...}, ssr: {...} }` 로 환경별 설정을 나누는 자리인데 프레임워크 저자용이라 앱에서는 거의 안 만집니다.",
        code: "import { defineConfig, loadEnv } from 'vite'\nexport default defineConfig(({ command, mode, isSsrBuild }) => {\n  const env = loadEnv(mode, process.cwd(), '')          // 설정에서 .env 읽기 (접두어 무시)\n  return {\n    base: command === 'build' ? '/my-app/' : '/',\n    define: { __APP_VERSION__: JSON.stringify(process.env.npm_package_version) },\n    server: { proxy: { '/api': env.API_PROXY } },\n    build: { sourcemap: mode === 'staging' },\n  }\n})",
      },
      {
        label: "문제가 나는 경우: 설정에서",
        body: "설정 옵션에서 자주 보는 것들입니다.",
        code: "증상                                                원인                                        처방\n─────────────────────────────────────────────────  ─────────────────────────────────────────  ─────────────────────────────\nbuild.rollupOptions 경고                             8 에서 rolldownOptions 로 개명                    이름 변경 (별칭이라 동작은 함)\nmanualChunks 객체 형태가 에러                         8 에서 객체 형태 제거                             advancedChunks.groups\nesbuild 옵션이 무시된다                                oxc 로 변환 · 폐기                               oxc 옵션으로\ndefine 값이 코드에 이상하게 들어간다                    문자열이 그대로 식으로 치환                        JSON.stringify(value)\n'This package is ESM only' 로 설정 로드 실패           package.json 에 type 없음 + CJS 로 읽음              \"type\": \"module\" 또는 vite.config.mts\nenvPrefix: '' 가 에러                                 보안 — 전부 노출 금지                            접두어 지정\n옛 브라우저 지원이 필요한데 target 을 낮춰도 안 됨       폴리필 없음 · es2015 하한                          @vitejs/plugin-legacy\nalias 는 되는데 tsc 가 못 찾는다                        tsconfig paths 와 따로                            둘 다 적기 · resolve.tsconfigPaths",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 옵션 이름의 접두어가 '단계와 모드' 를 말한다",
        body: "`resolve.*` 는 해석 단계(두 모드), `css.*` · `oxc` · `assetsInclude` 는 변환 단계(두 모드), `build.*` 는 묶기·분할·해시 단계(배포만), `server.*` 와 `optimizeDeps.*` 는 개발만, `ssr.*` 는 SSR 환경만, `define` · `envPrefix` · `base` 는 치환(두 모드). 허브의 '다섯 일 × 두 모드' 격자에 옵션을 놓으면 '이 옵션을 바꾸면 개발도 바뀌나'가 바로 답해집니다 — build.* 를 바꿨는데 개발 서버가 안 바뀌는 것은 정상입니다.",
        code: "            해석           변환                    묶기·분할·해시      치환\n두 모드      resolve.*      css.* · oxc · json      —                  define · envPrefix · base · publicDir\n개발만       optimizeDeps   server.* (proxy·warmup)  —                  —\n배포만       —              build.cssMinify         build.* (target·outDir·lib·manifest·rolldownOptions)\nSSR          ssr.external   ssr.noExternal          ssr.target         import.meta.env.SSR",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "설정이 맞는데 느리거나 깨질 때 — 12장 성능과 트러블슈팅.",
      },
      {
        label: "확인 질문",
        body: "1) build.assetsInlineLimit 와 build.chunkSizeWarningLimit 의 기본값은? 2) 설정 파일에서 .env 를 읽는 함수는? 3) `build.*` 를 바꿨는데 개발 서버가 그대로인 이유는? 4) `define` 에 문자열 값을 넣을 때 JSON.stringify 가 필요한 이유는?",
      },
    ],
    sources: [
      { label: "Vite — Configuring Vite", href: `${VITE}/config/` },
      { label: "Vite — Shared Options", href: `${VITE}/config/shared-options` },
      { label: "Vite — Build Options", href: `${VITE}/config/build-options` },
    ],
  },

  {
    id: "bundle-s12",
    name: "12장 · 성능과 트러블슈팅",
    tagline: "느리면 요청 수와 플러그인을, 깨지면 '개발과 배포의 차이' 를 본다",
    intro:
      "Vite 의 성능 문서는 개발 서버의 병목이 '요청마다의 해석과 변환'이라는 데서 출발합니다 — 브라우저 확장 끄기, 플러그인 프로파일링(`vite --profile`, `--debug plugin-transform`), 해석 비용 줄이기(확장자 명시, `resolve.extensions`), 배럴 파일 피하기, `server.warmup`, 가벼운 도구 쓰기. 트러블슈팅 문서는 증상별 처방집입니다 — 파일 감시 한계, 대소문자, CJS/ESM, 헤더 크기, 브라우저 확장. 둘을 관통하는 질문이 '개발에서 되는데 배포에서 깨지는가(또는 반대)'입니다.",
    blocks: [
      {
        label: "성능: 요청 수와 해석 비용",
        body: "문서의 순서대로. (1) 브라우저 — 확장 없는 프로필(또는 시크릿), DevTools 의 'Disable cache' 는 끄기(개발 서버 캐시를 무력화함). (2) 플러그인 — `vite --profile` 뒤 페이지를 열고 터미널에서 `p + Enter` 로 .cpuprofile, `vite --debug plugin-transform` 으로 느린 transform 찾기; buildStart · config · configResolved 는 서버 시작을 기다리게 하니 짧게. (3) 해석 — `import './Component.jsx'` 처럼 확장자를 적으면 파일 시스템 검사 1회(생략하면 `resolve.extensions` 일곱 개를 차례로 → 6회), TypeScript 는 `moduleResolution: bundler` + `allowImportingTsExtensions`. (4) 배럴 파일(`index.ts` 가 전부 re-export)은 한 함수만 써도 수십 모듈을 요청하고 트리 셰이킹 분석을 어렵게 하니 구체 파일에서 import. (5) `server.warmup.clientFiles` 로 자주 쓰는 파일을 미리 변환(`--debug transform` 으로 무엇이 느린지 보고). (6) Sass 보다 CSS, SVG 컴포넌트보다 URL/문자열.",
        code: "# 프로파일\n$ vite --profile          # 페이지 열고 → 터미널에서 p + Enter → .cpuprofile\n$ vite --debug plugin-transform   # 플러그인별 transform 시간\n$ vite --debug transform          # 어느 파일이 느린가 → warmup 후보\n\n# 해석 비용\nimport Comp from './Comp'        # .mjs? .js? .mts? .ts? .jsx? ✓  → 최대 7회 검사\nimport Comp from './Comp.jsx'    # 1회\n\n# 배럴\nimport { Button } from '@/components'          # index.ts 가 50개 re-export → 50 요청\nimport { Button } from '@/components/Button'   # 1 요청\n\nserver: { warmup: { clientFiles: ['./src/components/BigComponent.vue', './src/utils/big-utils.js'] } }",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 숫자들",
        body: "이 허브의 프로브 프로젝트에서 — 개발 서버 시작 `ready in 53 ms`, 빌드 `651 modules transformed … built in 542ms`(두 번째 빌드는 캐시로 110ms), `/@vite/client` 222KB(개발 전용, 빌드에는 없음), 사전 번들 `lodash-es` 는 600+ 모듈 → 파일 하나. 이 숫자들이 '개발 서버는 즉시, 빌드는 모듈 수에 비례'라는 모델의 근거입니다. 큰 프로젝트에서 개발 서버가 느려지는 것은 시작이 아니라 '첫 페이지 로드의 요청 수'(수백~수천 모듈)이고, 그래서 처방이 전부 요청 수와 변환 비용 쪽입니다.",
        code: "VITE v8.3.8  ready in 53 ms                          # 시작은 즉시\n✓ 651 modules transformed. … ✓ built in 542ms       # 빌드는 모듈 수에 비례\n✓ built in 110ms                                      # 두 번째 (캐시)\n/@vite/client  222,796 bytes                          # 개발 전용 HMR 클라이언트\nlodash-es: 600+ modules → node_modules/.vite/deps/lodash-es.js (1 요청)",
        codeLang: "text",
      },
      {
        label: "트러블슈팅: 증상별",
        body: "문서의 항목들을 표로. 공통 처방은 '`vite --force`, 확장 끄기, 경로 대소문자 확인, `--debug`' 넷입니다.",
        code: "증상                                                   원인                                      처방\n────────────────────────────────────────────────────  ───────────────────────────────────────  ──────────────────────────────\n'This package is ESM only' (설정 로드)                   require() 로 ESM 설정                      \"type\": \"module\" · .mjs/.mts\n요청이 영원히 멈춤 (Linux)                                 파일 디스크립터·inotify 한계                 ulimit · max_user_watches · devcontainer 는 host 127.0.0.1\nHMR 안 됨 (파일 수정 무반응)                               대소문자 불일치 · WSL2 · ENOSPC             경로 맞추기 · WSL 안으로 · usePolling\n순환 의존 → 전체 새로 고침                                 HMR 경계 못 찾음                            vite --debug hmr 로 확인 · 순환 제거\n'Module \"x\" has been externalized for browser compatibility'  Node 내장을 브라우저 코드에서              제거 · 폴리필\n개발 OK · 빌드 깨짐 (sloppy mode 코드)                    ESM 은 strict · 옛 CJS 라이브러리            patch-package / pnpm patch\n링크 패키지 옛 코드                                       사전 번들 캐시                              vite --force\n431 Request Header Fields Too Large                      Node 헤더 한계 (긴 쿠키)                    쿠키 줄이기 · --max-http-header-size\n흰 화면 · 'Failed to fetch dynamically imported module'   광고 차단 확장 · 배포 뒤 버전 어긋남            확장 끄기 · vite:preloadError → reload\n빌드 'No such file or directory'                          경로 대소문자 (Linux CI)                    대소문자 맞추기\nWindows 다른 드라이브 링크                                 subst · 교차 드라이브 junction               같은 드라이브로",
        codeLang: "text",
      },
      {
        label: "개발과 배포가 다른 자리 — 체크리스트",
        body: "Vite 의 가장 큰 함정은 개발 서버(사전 번들 + 요청 시 변환, 관대)와 배포 빌드(Rolldown 전체 묶기, 엄격)가 다른 코드 경로라는 것입니다. 다른 자리를 열거해 두면 '개발에서는 됐는데'가 빨라집니다. (1) CJS 의존성의 named import — 사전 번들은 통과, Rolldown 은 'is not exported by' 가능. (2) 순환 import — 개발은 모듈 캐시로 넘어가고, 빌드는 초기화 순서가 바뀜. (3) 부수 효과 모듈의 트리 셰이킹 — 개발은 안 지우고 빌드는 지움(7장 sideEffects). (4) `import.meta.env` — 개발은 객체, 빌드는 리터럴 치환(8장). (5) 자산 URL — 개발은 `/src/…`, 빌드는 `/assets/…-hash` 또는 데이터 URL(5장). (6) 변수 동적 import — 개발은 아무 경로, 빌드는 패턴 규칙(7장). (7) `define` · `process.env` — 빌드에서만 치환. 그래서 PR 머지 전 `vite build && vite preview` 한 번이 가장 싼 보험입니다.",
        code: "자리                 개발 (dev)                      배포 (build)\n──────────────────  ─────────────────────────────  ──────────────────────────────\nCJS named import     사전 번들이 관대                 Rolldown 엄격 → 'is not exported by'\n순환 import          모듈 캐시로 대충 됨               초기화 순서 → undefined\n부수 효과 모듈       안 지움                          sideEffects 보고 지움\nimport.meta.env      객체 주입                        리터럴 치환\n자산 URL             /src/a.png                      /assets/a-[hash].png · data:\n변수 import()        아무 경로                        ./ · 확장자 · 1단계 규칙\n보험                 —                               vite build && vite preview",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 성능 문제는 '요청 × 변환', 정합성 문제는 '두 경로'",
        body: "개발 서버의 비용 모델은 '모듈 하나 = 요청 하나 = 해석 + 변환 한 번'입니다. 그래서 성능 처방은 요청 수를 줄이거나(배럴 제거, 사전 번들), 해석을 싸게 하거나(확장자), 변환을 싸게 하거나(가벼운 도구, 플러그인 필터), 미리 하는 것(warmup) 넷뿐입니다. 정합성 문제는 두 코드 경로(개발·배포)가 '같은 결과를 내도록 노력하되 보장하지는 않는' 데서 나오고, Vite 가 Rolldown 으로 두 경로를 합치려는 방향('전체 번들 모드')이 그 문제의 근본 해법입니다. 그때까지는 `vite preview` 가 두 경로를 잇는 다리입니다.",
      },
      {
        label: "다음 입구",
        body: "번들링 허브의 끝입니다. Vite 위에 SSR · 라우팅 · 캐시를 얹은 메타 프레임워크 — Next.js(Turbopack) 와 Nuxt(Vite + Nitro) — 가 다음 허브이고, Nuxt 의 `nuxt build` 출력에서 본 `vite v8.3.8 building client/ssr environment` 가 이 허브와 그 허브를 잇는 줄입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 개발 서버가 큰 프로젝트에서 느려지는 진짜 자리는 시작인가 첫 로드인가, 왜? 2) 배럴 파일이 개발과 빌드 각각에 미치는 비용은? 3) '개발에서는 되는데 빌드에서 깨지는' 대표 원인 셋은? 4) HMR 이 매번 전체 새로 고침이 될 때 확인하는 명령은?",
      },
    ],
    sources: [
      { label: "Vite — Performance", href: `${VITE}/guide/performance` },
      { label: "Vite — Troubleshooting", href: `${VITE}/guide/troubleshooting` },
      { label: "Vite — Why Vite", href: `${VITE}/guide/why` },
    ],
  },
];
