import type { Theory } from ".";

const DOCS = "https://vuejs.org";

export const vueTheories: Theory[] = [
  {
    id: "vue",
    name: "Vue",
    tagline: "무엇이 바뀌었는지를 화면이 아니라 값에서 아는 도구",
    intro:
      "React와 같은 자리에서 출발합니다. 데이터가 이러면 화면은 이렇게 생겼다고 쓰고, 바꾸는 일은 프레임워크가 맡습니다. 갈리는 곳은 '무엇이 바뀌었는지'를 알아내는 방법입니다. React는 컴포넌트를 다시 불러 결과를 견주고, Vue는 값을 읽는 순간을 기록해 두었다가 그 값이 바뀌면 기록된 곳만 다시 돌립니다. 이 차이 하나에서 문서의 순서와 API의 모양이 갈라져 나옵니다.",
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
    ],
    sources: [
      { label: "Introduction", href: `${DOCS}/guide/introduction` },
      { label: "Reactivity in Depth", href: `${DOCS}/guide/extras/reactivity-in-depth` },
      { label: "Rendering Mechanism", href: `${DOCS}/guide/extras/rendering-mechanism` },
    ],
  },

  {
    id: "vg",
    name: "가이드",
    tagline: "순서대로 읽도록 짜인 쪽",
    intro:
      "가이드는 아홉 장으로 나뉘어 있고, 앞의 세 장은 이어서 읽는 것을 전제로 씁니다. 시작하기에서 소개와 빠른 시작을 지나면, 핵심 개념이 애플리케이션 생성부터 라이프사이클 훅까지 열세 페이지로 이어지고, 그다음이 컴포넌트 심화입니다. 뒤의 여섯 장은 필요할 때 들르는 곳입니다.",
    blocks: [
      {
        label: "핵심 개념은 한 줄로 이어진다",
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
    ],
    sources: [
      { label: "Guide", href: `${DOCS}/guide/introduction` },
      { label: "Composition API FAQ", href: `${DOCS}/guide/extras/composition-api-faq` },
    ],
  },

  {
    id: "va",
    name: "API 참고서",
    tagline: "같은 개념을 두 벌로 적어 둔 쪽",
    intro:
      "가이드가 '왜'와 '어떤 순서로'를 다룬다면 여기는 시그니처와 반환값, 그리고 쓰면 안 되는 경우를 적는 자리입니다. 여섯 갈래로 나뉘어 있고, 그중 둘(Composition API·Options API)은 같은 것을 다른 문법으로 적은 것이라 한쪽을 알면 다른 쪽은 대응표처럼 읽힙니다.",
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
    ],
    sources: [
      { label: "API Reference", href: `${DOCS}/api/` },
      { label: "Reactivity: Core", href: `${DOCS}/api/reactivity-core` },
      { label: "<script setup>", href: `${DOCS}/api/sfc-script-setup` },
    ],
  },
];
