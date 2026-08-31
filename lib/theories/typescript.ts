import type { Theory } from ".";

const DOCS = "https://www.typescriptlang.org/docs";

export const typescriptTheories: Theory[] = [
  {
    id: "ts",
    name: "TypeScript",
    tagline: "규칙을 문서가 아니라 코드에 두는 일",
    intro:
      "규칙을 주석이나 위키에 적어 두면 결국 읽히지 않습니다. 사람이 지켜야 하는 약속은 언젠가 깨지고, 깨진 것은 실행해 봐야 압니다. 타입은 그 약속을 코드 안으로 옮겨서, 어긋난 순간에 그 자리에서 말하게 만드는 장치라고 봅니다.",
    blocks: [
      {
        label: "문서가 갈라 놓은 아홉 갈래",
        body: "시작하기, 핸드북, 참고서, 모듈 참고서, 튜토리얼, 릴리스 노트, 선언 파일, JavaScript 지원, 프로젝트 설정. 배우는 곳(핸드북)과 찾아보는 곳(참고서)이 나뉘어 있고, 남의 코드를 다루는 일(선언 파일·JavaScript 지원)과 빌드를 다루는 일(프로젝트 설정)이 또 따로입니다.",
      },
      {
        label: "타입은 런타임에 없다",
        body: "제일 먼저 붙잡아야 했던 사실입니다. 타입은 컴파일이 끝나면 사라지므로, 바깥에서 들어온 값이 정말 그 모양인지는 타입이 보장해 주지 않습니다. 서버가 주는 JSON에 타입을 적어 두는 것은 '이렇게 오기로 했다'는 기록일 뿐이고, 실제로 그런지는 런타임에 확인해야 합니다.",
      },
      {
        label: "실제로 부딪힌 곳",
        body: "백엔드 스키마가 바뀌었는데 화면은 흰 화면 하나로만 그 사실을 알렸던 적이 있습니다. 타입은 그대로였고 코드도 컴파일됐지만, 오는 데이터가 달랐던 거죠. 그 뒤로 경계에서는 타입 대신 검증을 두고, 안쪽에서는 그 결과로 좁혀진 타입을 쓰는 쪽으로 정리했습니다.",
      },
    ],
    sources: [
      { label: "TypeScript Documentation", href: `${DOCS}/` },
      { label: "The Handbook", href: `${DOCS}/handbook/intro.html` },
    ],
  },

  {
    id: "ts-start",
    name: "시작하기",
    tagline: "어디서 왔느냐에 따라 다른 문",
    intro:
      "이 섹션의 특징은 내용이 아니라 갈래입니다. 같은 언어를 두고 '어디서 오는 사람인가'에 따라 다섯 개의 입구를 따로 만들어 뒀습니다. 이미 아는 것을 다시 설명하지 않기 위해서입니다.",
    blocks: [
      {
        label: "다섯 개의 입구",
        body: "처음 프로그래밍을 배우는 사람, JavaScript를 아는 사람, Java·C# 배경, 함수형 배경, 그리고 5분 만에 도구부터 만져 보는 길. 배경에 따라 오해하는 지점이 다르다는 전제가 깔려 있습니다.",
      },
      {
        label: "OOP 배경을 위한 문이 따로 있는 이유",
        body: "Java·C#에서 오면 타입을 '클래스가 곧 타입'으로 읽기 쉽습니다. 그런데 TypeScript의 타입은 이름이 아니라 모양으로 맞춰지는 구조적 타입입니다. 이 차이를 모르면 왜 아무 관계도 없는 두 객체가 서로 대입되는지 설명이 안 됩니다. 문서가 이걸 별도 페이지로 뺀 이유가 있습니다.",
      },
      {
        label: "제가 실제로 지나온 문",
        body: "JavaScript를 먼저 쓰던 쪽이라 저는 두 번째 문으로 들어갔습니다. 문법은 금방 익었지만, 정작 오래 걸린 건 '타입을 얼마나 적을 것인가'였습니다. 다 적으면 코드가 두 배가 되고 안 적으면 any가 번지는데, 그 사이의 기준은 시작하기가 아니라 핸드북 쪽에 있었습니다.",
      },
    ],
    sources: [
      { label: "TypeScript for JS Programmers", href: `${DOCS}/handbook/typescript-in-5-minutes.html` },
      { label: "TS for the New Programmer", href: `${DOCS}/handbook/typescript-from-scratch.html` },
    ],
  },

  {
    id: "ts-handbook",
    name: "핸드북",
    tagline: "타입을 언어로 쓰는 법",
    intro:
      "TypeScript 문서의 본편입니다. 타입을 '변수 옆에 붙이는 이름표'로 쓰다가, 타입으로 계산하고 좁히고 만들어 내는 데까지 가는 여덟 장입니다. 여기를 건너뛰면 라이브러리가 주는 타입을 읽지 못해서 결국 any로 덮게 됩니다.",
    blocks: [
      {
        label: "여덟 장의 순서",
        body: "기초, 일상적인 타입, 좁히기, 함수, 객체, 타입 조작, 클래스, 모듈. 앞의 다섯 장은 '있는 타입을 쓰는 법'이고 타입 조작부터는 '타입을 만드는 법'입니다. 이 경계에서 난이도가 한 번 꺾입니다.",
      },
      {
        label: "좁히기가 이 문서의 중심이다",
        body: "여러 모양일 수 있는 값을 지금 이 자리에서 하나로 확정하는 일 — 제네릭보다 이쪽이 먼저였습니다. typeof, in, 판별 유니온, 사용자 정의 타입 가드까지 전부 '어떤 코드를 쓰면 컴파일러가 무엇을 확신하는가'를 다룹니다. 컴파일러의 추론을 사람이 거드는 문법이라고 이해했습니다.",
        code: "type Result =\n  | { ok: true; data: Ticket }\n  | { ok: false; error: ApiError };\n\nfunction render(result: Result) {\n  if (result.ok) {\n    // 여기서는 data가 확실히 있다\n    return <Seat ticket={result.data} />;\n  }\n  // 여기서는 error가 확실히 있다 — 놓친 분기가 컴파일에서 걸린다\n  return <Failure reason={result.error.message} />;\n}",
      },
      {
        label: "타입 조작은 중복을 지우는 장이다",
        body: "제네릭, keyof, typeof, 인덱스 접근, 조건부 타입, 매핑된 타입, 템플릿 리터럴 타입. 처음에는 현학적으로 보였는데, 결국은 '같은 사실을 두 군데 적지 않기' 위한 도구들이었습니다. 타입을 손으로 한 벌 더 쓰는 순간 그 둘은 언젠가 어긋납니다.",
      },
      {
        label: "실제로 부딪힌 곳",
        body: "catch로 잡은 에러가 unknown인 채로는 아무것도 할 수 없다는 것 — 여기서 좁히기가 필요했습니다. 실패마다 이름표를 붙여 판별 유니온으로 만들고 나서야, 처리하지 않은 실패가 런타임이 아니라 컴파일에서 걸리기 시작했습니다.",
      },
    ],
    sources: [
      { label: "The TypeScript Handbook", href: `${DOCS}/handbook/intro.html` },
      { label: "Narrowing", href: `${DOCS}/handbook/2/narrowing.html` },
      { label: "Creating Types from Types", href: `${DOCS}/handbook/2/types-from-types.html` },
    ],
  },

  {
    id: "ts-reference",
    name: "참고서",
    tagline: "핸드북에 안 들어간 것들의 사전",
    intro:
      "순서대로 읽는 곳이 아니라 필요할 때 한 항목만 펴 보는 곳입니다. 핸드북의 흐름을 끊을 만큼 곁가지거나, 알아 두면 좋지만 매일 쓰지는 않는 주제들이 모여 있습니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "유틸리티 타입, 치트시트, 데코레이터, 선언 병합, Enum, 이터레이터와 제너레이터, JSX, 믹스인, 네임스페이스, 심벌, 삼중 슬래시 지시어, 타입 호환성, 타입 추론, 변수 선언까지 열다섯 항목입니다.",
      },
      {
        label: "유틸리티 타입은 결국 타입 조작의 예제집이다",
        body: "Partial, Pick, Omit, Record, ReturnType… 처음에는 외워 쓰는 목록이었는데, 핸드북의 타입 조작 장을 읽고 나니 전부 매핑된 타입과 조건부 타입으로 쓰여 있다는 걸 알게 됐습니다. 그때부터는 없는 것이 필요하면 직접 만들 수 있게 됐습니다.",
      },
      {
        label: "타입 호환성과 타입 추론",
        body: "제 기준으로 이 섹션에서 가장 자주 되돌아온 두 항목입니다. '왜 이게 대입이 되지', '왜 여기서 타입이 넓어지지' 같은 질문의 답이 대개 여기 있었습니다. 구조적 타입이라는 성격이 실제로 어떻게 동작하는지가 적혀 있는 곳입니다.",
      },
    ],
    sources: [
      { label: "Utility Types", href: `${DOCS}/handbook/utility-types.html` },
      { label: "Type Compatibility", href: `${DOCS}/handbook/type-compatibility.html` },
    ],
  },

  {
    id: "ts-modules-ref",
    name: "모듈 참고서",
    tagline: "import 한 줄이 왜 안 되는가",
    intro:
      "TypeScript에서 가장 자주 막히는데 문법과는 상관없는 자리가 모듈입니다. 같은 코드가 설정 하나에 따라 되기도 하고 안 되기도 합니다. 문서가 이걸 핸드북에서 떼어 별도 섹션으로 둔 것도 그만큼 얽혀 있어서라고 봅니다.",
    blocks: [
      {
        label: "소개·이론·가이드·참고서·부록",
        body: "다섯 갈래인데, 이론과 부록이 이 섹션의 핵심입니다. 이론은 TypeScript가 모듈을 어떻게 이해하는지, 부록은 ESM과 CommonJS가 섞였을 때 무슨 일이 벌어지는지를 다룹니다. 가이드에는 어떤 설정을 골라야 하는지가 정리돼 있습니다.",
      },
      {
        label: "타입은 컴파일러가, 실행은 런타임이 정한다",
        body: "TypeScript는 import가 어디를 가리키는지 해석할 뿐이고, 실제로 그 파일을 어떻게 불러올지는 번들러나 Node가 정합니다. 이 둘이 어긋나면 타입은 맞는데 실행이 깨지거나, 그 반대가 됩니다. moduleResolution 설정이 왜 그렇게 여러 개인지도 여기서 이해했습니다.",
      },
      {
        label: "ESM과 CJS의 상호운용",
        body: "default import가 어떤 조합에서는 되고 어떤 조합에서는 undefined가 되는 이유가 부록에 있습니다. 라이브러리를 붙일 때 나는 문제의 상당수가 이 한 페이지 안에 있었습니다.",
      },
    ],
    sources: [
      { label: "Modules — Introduction", href: `${DOCS}/handbook/modules/introduction.html` },
      { label: "ESM/CJS Interoperability", href: `${DOCS}/handbook/modules/appendices/esm-cjs-interop.html` },
    ],
  },

  {
    id: "ts-tutorials",
    name: "튜토리얼",
    tagline: "환경마다 다른 도입기",
    intro:
      "언어를 가르치는 곳이 아니라 '이미 있는 프로젝트에 어떻게 들여놓는가'를 다루는 곳입니다. 새 프로젝트를 만들 때보다 남의 프로젝트에 들어갈 때 쓸모가 있습니다.",
    blocks: [
      {
        label: "다섯 개의 상황",
        body: "ASP.NET Core, Gulp, DOM 조작, JavaScript에서 마이그레이션하기, Babel과 함께 쓰기. 요즘 프론트엔드 환경과는 거리가 있는 항목도 있지만, 각각이 '빌드 파이프라인 어디에 타입 검사를 끼워 넣을 것인가'라는 같은 질문을 다릅니다.",
      },
      {
        label: "마이그레이션 문서가 본편이다",
        body: "다섯 중 실제로 도움이 된 것은 JavaScript에서 옮겨 오는 문서였습니다. 한 번에 다 바꾸지 말고 allowJs로 공존시키다가 파일 단위로 옮기라는 것, 그리고 strict는 마지막에 켜라는 것. 순서를 정해 준다는 점에서 다른 문서와 성격이 다릅니다.",
      },
      {
        label: "필요할 때 여는 곳",
        body: "제 프로젝트들은 처음부터 TypeScript로 시작해서 이 섹션을 통째로 읽을 일은 없었습니다. 다만 이미 굴러가는 JavaScript 코드베이스에 들어가게 되면 제일 먼저 펼 곳이라 자리를 비워 두지 않고 옮겨 뒀습니다.",
      },
    ],
    sources: [
      { label: "Migrating from JavaScript", href: `${DOCS}/handbook/migrating-from-javascript.html` },
      { label: "DOM Manipulation", href: `${DOCS}/handbook/dom-manipulation.html` },
    ],
  },

  {
    id: "ts-whatsnew",
    name: "릴리스 노트",
    tagline: "언어가 어디로 가고 있는지",
    intro:
      "버전별로 무엇이 들어왔는지가 쌓여 있는 곳입니다. 처음 배울 때는 볼 일이 없지만, 어느 정도 쓰고 나면 여기가 가장 밀도 높은 문서가 됩니다. 새 기능은 대개 '그동안 사람들이 무엇을 불편해했는가'의 답이라서요.",
    blocks: [
      {
        label: "버전 목록 그대로",
        body: "5.x부터 과거 버전까지 릴리스마다 한 페이지입니다. 그래프에는 목차가 버전 목록이라 노드를 하나로 뒀습니다 — 갈래가 아니라 시간 순서라 나눠 봐야 읽히지 않습니다.",
      },
      {
        label: "왜 읽게 되는가",
        body: "라이브러리의 타입이 갑자기 다르게 동작하거나, 예전 코드에 있던 우회가 더 이상 필요 없어졌을 때 답이 여기 있었습니다. satisfies나 const 타입 매개변수처럼, 몰랐으면 계속 손으로 하고 있었을 일들이 있습니다.",
      },
      {
        label: "버전을 올리기 전에",
        body: "메이저를 올릴 때 그 버전의 노트에서 'Breaking Changes' 부분만 먼저 봅니다. 대부분은 더 엄격해진 것이고, 그 엄격함이 실제로 잡아 주는 게 무엇인지가 같이 적혀 있어서 올릴지 말지를 판단할 수 있습니다.",
      },
    ],
    sources: [
      { label: "Release Notes", href: `${DOCS}/handbook/release-notes/overview.html` },
    ],
  },

  {
    id: "ts-declaration",
    name: "선언 파일",
    tagline: "타입이 없는 코드에 타입을 붙이는 일",
    intro:
      "세상의 코드가 전부 TypeScript로 쓰여 있지는 않습니다. 타입이 없는 라이브러리를 쓰거나, 내가 만든 것을 남이 쓰게 하려면 '구현 없이 모양만 적은 파일'이 필요합니다. 그 .d.ts를 읽고 쓰는 법을 다루는 섹션입니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "소개, 참고서, 구조, 템플릿, 해야 할 것과 하지 말 것, 심화, 배포, 사용 — 여덟 갈래입니다. 템플릿 아래에는 모듈·플러그인·클래스·함수·전역 등 상황별 뼈대가 다시 나뉘어 있습니다.",
      },
      {
        label: "Do's and Don'ts가 제일 실용적이다",
        body: "흔히 저지르는 실수를 모아 둔 페이지입니다. Number·String 같은 래퍼 타입을 쓰지 말라는 것, any 대신 unknown을 쓰라는 것, 콜백의 반환 타입에 void를 쓰라는 것. 남의 타입을 읽다 이상하다고 느꼈던 자리들이 대개 여기 목록에 있었습니다.",
      },
      {
        label: "읽는 법을 배우는 데 먼저 쓴다",
        body: "선언 파일을 직접 쓸 일은 아직 많지 않았습니다. 대신 라이브러리가 왜 그런 타입을 요구하는지 궁금할 때 node_modules 안의 .d.ts를 열어 보게 됐고, 그걸 읽으려면 이 섹션의 문법이 필요했습니다. 쓰기보다 읽기가 먼저 온 셈입니다.",
      },
    ],
    sources: [
      { label: "Declaration Files — Introduction", href: `${DOCS}/handbook/declaration-files/introduction.html` },
      { label: "Do's and Don'ts", href: `${DOCS}/handbook/declaration-files/do-s-and-don-ts.html` },
    ],
  },

  {
    id: "ts-js",
    name: "JavaScript 지원",
    tagline: "바꾸지 않고도 검사받는 길",
    intro:
      "TypeScript로 다시 쓰지 않아도 타입 검사만 받을 수 있습니다. 파일을 .ts로 바꾸는 것이 부담스러운 코드베이스에서, 먼저 검사부터 켜 보는 방법을 다루는 섹션입니다.",
    blocks: [
      {
        label: "네 갈래",
        body: "JS 프로젝트에서 TypeScript 쓰기, .js 파일 타입 검사하기, JSDoc 참고서, 그리고 .d.ts 만들어 내기입니다. 앞의 둘은 설정 이야기, 뒤의 둘은 표기 이야기입니다.",
      },
      {
        label: "JSDoc이 타입 표기가 된다",
        body: "주석에 적은 @param과 @type을 컴파일러가 진짜 타입으로 읽습니다. 문법을 하나도 바꾸지 않고 검사만 받을 수 있다는 뜻이라, 빌드를 건드릴 수 없는 상황에서 유일한 선택지가 되기도 합니다.",
        code: "// @ts-check\n\n/**\n * @param {string} seatId\n * @param {{ userId: string }} actor\n * @returns {Promise<boolean>}\n */\nasync function hold(seatId, actor) {\n  // seatId에 숫자를 넣으면 .js 파일인데도 여기서 걸린다\n}",
      },
      {
        label: "왜 남겨 뒀나",
        body: "제 프로젝트에는 쓸 일이 없었습니다. 다만 '타입은 전부 아니면 전무'가 아니라는 것을 이 섹션이 보여 줍니다. 검사의 강도를 파일 단위로 고를 수 있다는 사실은, 나중에 기존 코드에 들어갈 때 쓸 카드라고 생각해 남겨 뒀습니다.",
      },
    ],
    sources: [
      { label: "JS Projects Utilizing TypeScript", href: `${DOCS}/handbook/intro-to-js-ts.html` },
      { label: "JSDoc Reference", href: `${DOCS}/handbook/jsdoc-supported-types.html` },
    ],
  },

  {
    id: "ts-config",
    name: "프로젝트 설정",
    tagline: "얼마나 엄격할지를 정하는 곳",
    intro:
      "같은 코드가 통과하기도 하고 막히기도 하는 이유는 대개 여기 있습니다. tsconfig는 취향 설정이 아니라 '이 프로젝트가 무엇을 실수로 볼 것인가'를 정하는 선언이라고 봅니다.",
    blocks: [
      {
        label: "무엇이 들어 있나",
        body: "tsconfig.json이란 무엇인가, MSBuild에서의 설정, tsconfig 레퍼런스, 컴파일러 옵션(CLI), 프로젝트 참조, 빌드 도구와의 통합, watch 옵션, 나이틀리 빌드 쓰기까지 여덟 갈래입니다.",
      },
      {
        label: "strict는 한 개가 아니다",
        body: "strict는 여러 검사를 한꺼번에 켜는 스위치입니다. strictNullChecks 하나만으로도 '없을 수 있는 값'을 전부 드러내 주는데, 이걸 끄고 쓰면 TypeScript를 쓰는 이유의 절반이 사라집니다. 반대로 기존 코드에 갑자기 켜면 오류가 수백 개 나오므로, 어떤 것부터 켤지가 실제 판단이 됩니다.",
      },
      {
        label: "설정이 곧 팀의 합의다",
        body: "noUnusedLocals를 켤지, any를 허용할지 같은 결정은 개인 취향이 아니라 코드 리뷰에서 매번 반복할 말을 미리 한 번에 적어 두는 일입니다. 사람이 지적하던 것을 도구가 대신 말하게 만드는 쪽이 오래 갑니다.",
      },
    ],
    sources: [
      { label: "What is a tsconfig.json", href: `${DOCS}/handbook/tsconfig-json.html` },
      { label: "TSConfig Reference", href: "https://www.typescriptlang.org/tsconfig/" },
    ],
  },
];
