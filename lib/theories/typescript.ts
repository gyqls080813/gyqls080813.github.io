import type { Theory } from ".";

/**
 * TypeScript — typescriptlang.org/docs 의 목차를 그대로 따른다.
 *
 * 시작하기(다섯 입구) · 핸드북(기초 → 일상적인 타입 → 좁히기 → 함수 → 객체 → 타입 조작 → 클래스 → 모듈) ·
 * 참고서(열다섯 항목) · 모듈 참고서(이론 · 가이드 · 레퍼런스 · 부록) · 튜토리얼 · 릴리스 노트 ·
 * 선언 파일(템플릿 여섯 포함) · JavaScript 지원 · 프로젝트 설정. 노드 하나가 문서의 페이지 하나다.
 * 시트는 그 페이지가 무엇을 말하는지 → 실제로 돌려 본 결과 → 그 자리에서 나는 문제 → 문제의 구조 →
 * 다음 입구 → 확인 질문 순서로 적는다. i18n·렌더링·JavaScript·React·Vue 노드와 같은 틀이다.
 * '실제로 돌려 보면'은 tsc 7.0.2(Go 네이티브 컴파일러)와 TypeScript 6.0.3(타입 API, 추론 결과 확인)을
 * Node v24.20.0에서 돌린 결과다. 에러 문구는 영어 원문 그대로 적었다 — 검색이 되는 쪽이 낫다.
 */

const DOCS = "https://www.typescriptlang.org/docs";
const TSCONFIG = "https://www.typescriptlang.org/tsconfig";

export const typescriptTheories: Theory[] = [
  {
    id: "ts",
    name: "TypeScript",
    tagline: "규칙을 문서가 아니라 코드에 두는 일",
    intro:
      "규칙을 주석이나 위키에 적어 두면 결국 읽히지 않습니다. 사람이 지켜야 하는 약속은 언젠가 깨지고, 깨진 것은 실행해 봐야 압니다. 타입은 그 약속을 코드 안으로 옮겨서, 어긋난 순간에 그 자리에서 말하게 만드는 장치라고 봅니다. 이 노드 아래의 시트들은 typescriptlang.org 문서의 목차를 그대로 따릅니다. 시작하기 다섯 장, 핸드북 여덟 장(일상적인 타입 열네 절과 타입 조작 여덟 절은 따로), 참고서 열다섯 장, 모듈 참고서 일곱 장, 튜토리얼 다섯 장, 선언 파일 열네 장, JavaScript 지원 네 장, 프로젝트 설정 여덟 장. 각 시트에 tsc 7.0.2를 실제로 돌려 본 결과를 붙였습니다.",
    blocks: [
      {
        label: "문서가 갈라 놓은 아홉 갈래",
        body: "아홉 갈래는 시작하기, 핸드북, 참고서, 모듈 참고서, 튜토리얼, 릴리스 노트, 선언 파일, JavaScript 지원, 프로젝트 설정입니다. 배우는 곳(핸드북)과 찾아보는 곳(참고서)이 나뉘어 있습니다. 남의 코드를 다루는 일(선언 파일·JavaScript 지원)과 빌드를 다루는 일(프로젝트 설정)이 또 따로입니다.",
      },
      {
        label: "타입은 런타임에 없다",
        body: "제일 먼저 붙잡아야 했던 사실입니다. 타입은 컴파일이 끝나면 사라지므로, 바깥에서 들어온 값이 정말 그 모양인지는 타입이 보장해 주지 않습니다. 서버가 주는 JSON에 타입을 적어 두는 것은 '이렇게 오기로 했다'는 기록일 뿐이고, 실제로 그런지는 런타임에 확인해야 합니다.",
      },
      {
        label: "실제로 부딪힌 곳",
        body: "백엔드 스키마가 바뀌었는데 화면은 흰 화면 하나로만 그 사실을 알렸던 적이 있습니다. 타입은 그대로였고 코드도 컴파일됐지만, 오는 데이터가 달랐습니다. 그 뒤로 경계에서는 타입 대신 검증을 두고, 안쪽에서는 그 결과로 좁혀진 타입을 쓰는 쪽으로 정리했습니다.",
      },
      {
        label: "실제로 돌려 보면: 지금의 tsc 는 7.0 이고, 기본값이 바뀌었다",
        body: "이 허브의 근거는 2026년 11월 기준 `npm i typescript`로 받은 7.0.2입니다. 7.0은 컴파일러를 Go로 옮긴 네이티브 빌드로, 문서의 발표 글은 전체 빌드가 8~12배 빨라졌다고 적습니다. 타입 검사 규칙은 6.0과 같게 맞췄지만, 6.0에서 '폐기 예고'였던 옵션이 7.0에서는 전부 에러가 됩니다. 실제로 `--target es5`, `--module amd`, `--moduleResolution classic`, `--outFile`, `--baseUrl`, `--downlevelIteration`, `--esModuleInterop false`를 넘기면 모두 \"Option '…' has been removed. Please remove it from your configuration.\"로 멈춥니다. 기본값도 바뀌었습니다. `strict`는 true, `module`은 esnext, `target`은 그해의 ES 버전(지금 es2025), `types`는 빈 배열, `rootDir`는 tsconfig 디렉터리입니다. 아래 시트의 에러 문구는 전부 이 버전에서 받은 것입니다.",
        code: "$ npx tsc --version\nVersion 7.0.2\n\n$ npx tsc --noEmit --target es5 a.ts\nerror TS5108: Option 'target=ES5' has been removed. Please remove it from your configuration.\n\n$ npx tsc --noEmit --baseUrl . a.ts\nerror TS5102: Option 'baseUrl' has been removed. Please remove it from your configuration.\n\n$ npx tsc --help --all | grep -A1 checkers\n--checkers\nSet the number of checkers per project.   # 7.0 — 병렬 검사기 수",
        codeLang: "text",
        terms: [
          {
            term: "tsc",
            body: "TypeScript 컴파일러의 명령줄 이름. 검사(type check)와 변환(emit)을 둘 다 하고, `--noEmit`이면 검사만 합니다. 7.0부터 Go로 작성된 바이너리가 `npm i typescript`로 그대로 설치됩니다.",
          },
          {
            term: "폐기 (deprecation) → 제거 (removal)",
            body: "TypeScript는 옵션을 없앨 때 한 메이저 전에 먼저 경고를 내고(`ignoreDeprecations`로 잠시 끌 수 있음), 다음 메이저에서 에러로 바꿉니다. 6.0이 경고, 7.0이 에러인 짝이 지금의 자리입니다.",
          },
        ],
      },
      {
        label: "문제의 구조: 검사기와 변환기는 한 도구에 들어 있지만 다른 일을 한다",
        body: "tsc 한 번에 두 일이 일어납니다. 첫째는 타입 검사 — 코드가 적어 둔 약속과 어긋나는 자리를 찾아 에러로 보고합니다. 둘째는 변환(emit) — 타입을 지우고, `target`보다 새 문법은 낮춰 쓰고, `module`에 맞는 import·export 모양으로 바꿔 .js를 씁니다. 두 일은 독립적입니다. 에러가 있어도 기본으로는 .js가 나오고(`noEmitOnError`로 막음), Babel·esbuild·Vite·Node의 타입 제거(strip)는 변환만 하고 검사는 전혀 하지 않습니다. 실제로 타입 에러가 있는 파일을 `@babel/preset-typescript`로 돌리면 아무 말 없이 .js가 나왔습니다. 그래서 요즘 파이프라인은 '빌드는 빠른 도구가, 검사는 `tsc --noEmit`이' 하는 두 줄이 됩니다. 이 허브의 거의 모든 장이 이 두 역할 중 어느 쪽 이야기인지를 먼저 가르면 읽기 쉬워집니다.",
        code: "타입 검사(check)            변환(emit)\n────────────────            ──────────────────────\n약속과 어긋남 → 에러         타입 지우기 · 문법 낮추기 · 모듈 모양 바꾸기\ntsc · 에디터(tsserver)      tsc · Babel · esbuild · swc · Vite · Node(strip)\n'런타임에 없는 것'을 봄      '런타임에 남는 것'을 만듦\n\n요즘 파이프라인\n  빌드:  vite build          (검사 없음, 빠름)\n  검사:  tsc --noEmit        (CI 에서 따로)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "어디서 오는가에 따라 시작하기의 다섯 문 중 하나를 고르고, 그 뒤는 핸드북을 순서대로 읽습니다. 핸드북에서 막히는 자리의 답은 참고서(타입 호환성·타입 추론)에 있고, import 한 줄이 안 되는 문제는 모듈 참고서에, 남의 라이브러리에 타입이 없을 때는 선언 파일에, '왜 우리 프로젝트에선 이게 통과하지'는 프로젝트 설정에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) 타입 에러가 있는 파일을 Vite로 빌드하면 빌드가 실패할까요, 성공할까요? 왜 그럴까요?\n2) 7.0에서 `--target es5`가 에러인 이유를 '폐기 → 제거' 두 단계로 설명해 보세요.\n3) 서버에서 받은 JSON에 `User` 타입을 적어 두면 런타임에 무엇이 보장되나요?",
      },
    ],
    sources: [
      { label: "TypeScript Documentation", href: `${DOCS}/` },
      { label: "The Handbook", href: `${DOCS}/handbook/intro.html` },
      { label: "Announcing TypeScript 7.0", href: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
      { label: "TypeScript 6.0 — Release Notes", href: `${DOCS}/handbook/release-notes/typescript-6-0.html` },
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
        body: "다섯 입구는 처음 프로그래밍을 배우는 사람, JavaScript를 아는 사람, Java·C# 배경, 함수형 배경, 그리고 5분 만에 도구부터 만져 보는 길입니다. 배경에 따라 오해하는 지점이 다르다는 전제가 깔려 있습니다.",
      },
      {
        label: "OOP 배경을 위한 문이 따로 있는 이유",
        body: "Java·C#에서 오면 타입을 '클래스가 곧 타입'으로 읽기 쉽습니다. 그런데 TypeScript의 타입은 이름이 아니라 모양으로 맞춰지는 구조적 타입입니다. 이 차이를 모르면 왜 아무 관계도 없는 두 객체가 서로 대입되는지 설명이 안 됩니다. 문서가 이걸 별도 페이지로 뺀 이유가 있습니다.",
      },
      {
        label: "제가 실제로 지나온 문",
        body: "JavaScript를 먼저 쓰던 쪽이라 저는 두 번째 문으로 들어갔습니다. 문법은 금방 익었지만, 정작 오래 걸린 건 '타입을 얼마나 적을 것인가'였습니다. 다 적으면 코드가 두 배가 되고 안 적으면 any가 번지는데, 그 사이의 기준은 시작하기가 아니라 핸드북 쪽에 있었습니다.",
      },
      {
        label: "다섯 문이 각각 바로잡는 오해",
        body: "다섯 페이지를 나란히 읽으면 각 문이 '이 배경의 사람이 꼭 하는 오해'를 하나씩 겨냥하고 있다는 것이 보입니다. 처음 배우는 사람에게는 '타입은 실행을 바꾸지 않는다'를, JS 개발자에게는 '적지 않아도 추론된다'를, Java·C# 개발자에게는 '클래스가 아니라 모양이 타입이다'를, 함수형 개발자에게는 '유니온은 태그가 없고 고차 종류(HKT)는 없다'를, 도구부터 보는 사람에게는 '에러가 있어도 .js는 나온다'를 말합니다.",
        code: "입구              겨냥하는 오해                         한 줄 교정\n────────────────  ─────────────────────────────────── ──────────────────────────────\n처음 배우는 사람  타입이 실행을 바꾼다                   타입은 검사 뒤 지워진다\nJS 개발자         타입을 전부 적어야 한다                 추론 + 필요한 곳만 어노테이션\nJava·C# 개발자    클래스 이름이 타입이다                  모양(구조)이 타입이다\n함수형 개발자     유니온은 태그 달린 합 타입이다          태그 없음 — 판별 속성을 직접\n도구부터          에러가 나면 빌드가 멈춘다               기본은 에러 있어도 emit",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다섯 중 하나만 읽고 핸드북의 기초로 넘어가면 됩니다. 두 개 이상 읽을 필요는 없습니다 — 핸드북 소개 페이지도 '네 입구 중 하나를 먼저 읽으라'고만 적습니다.",
      },
    ],
    sources: [
      { label: "TypeScript for JS Programmers", href: `${DOCS}/handbook/typescript-in-5-minutes.html` },
      { label: "TS for the New Programmer", href: `${DOCS}/handbook/typescript-from-scratch.html` },
      { label: "The TypeScript Handbook — Intro", href: `${DOCS}/handbook/intro.html` },
    ],
  },

  {
    id: "ts-start-new",
    name: "처음 배우는 사람을 위한 TS",
    tagline: "JavaScript 의 런타임에 컴파일 타임 검사기를 얹은 것",
    intro:
      "프로그래밍이 처음인 사람에게 TypeScript를 소개하는 문입니다. 핵심 문장은 하나입니다. 'TypeScript는 JavaScript의 런타임에 컴파일 타임 타입 검사기를 더한 것'. JavaScript가 왜 이렇게 됐는지(짧은 스크립트용 언어가 수십만 줄 앱을 떠받치게 된 역사)부터 시작해서, 타입이 실행을 바꾸지 않는다는 약속으로 끝납니다.",
    blocks: [
      {
        label: "JavaScript 의 느슨함이 문제가 된 지점",
        body: "문서는 JavaScript의 '이상한' 동작을 두 가지로 보여 줍니다. `\"\" == 0`이 참인 것처럼 느슨한 동등 비교, 그리고 없는 속성을 읽어도 에러가 아니라 `undefined`가 나오는 것. 몇 줄짜리 스크립트에서는 괜찮았지만 코드가 커지면 이런 실수를 실행해 봐야만 알 수 있게 되고, 그 비용이 커집니다. TypeScript는 이 중 '실행 전에 알 수 있는 것'만 잡습니다. 값이 어떤 종류인지(kind of value)를 보고, 그 종류에 맞지 않는 쓰임을 실행 전에 보고합니다.",
        code: 'const obj = { width: 10, height: 15 };\nconst area = obj.width * obj.heigth;\n//                          ~~~~~~\n// Property \'heigth\' does not exist on type \'{ width: number; height: number; }\'.\n// Did you mean \'height\'?                                               (TS2551)\n\nconsole.log(4 / []);\n// The right-hand side of an arithmetic operation must be of type\n// \'any\', \'number\', \'bigint\' or an enum type.                             (TS2363)\n// — JavaScript 는 그냥 Infinity 를 찍는다',
      },
      {
        label: "문법 오류와 타입 오류는 다른 것이다",
        body: "`let a = (4`처럼 괄호가 안 닫힌 것은 문법 오류입니다. 실행도 못 하니 JavaScript도 잡습니다. TypeScript가 더하는 것은 타입 오류입니다. 문법은 맞는데 값의 종류가 맞지 않는 쓰임입니다. 문서가 두 오류를 나눠 보여 주는 이유는 '타입스크립트가 잡아 주는 것'이 무엇인지 정확히 그리기 위해서입니다. 실제로 돌려 보면 둘의 코드 번호도 다릅니다. 문법 오류는 1000번대(`TS1005: ')' expected.`)이고, 타입 오류는 2000번대입니다.",
        code: "$ npx tsc --noEmit src/basics.ts\nsrc/basics.ts(1,5): error TS2322: Type 'string' is not assignable to type 'number'.\nsrc/basics.ts(3,3): error TS2339: Property 'b' does not exist on type '{ a: number; }'.\nsrc/basics.ts(5,1): error TS2554: Expected 2 arguments, but got 1.\nsrc/basics.ts(12,20): error TS2367: This comparison appears to be unintentional because the types\n'string' and 'number' have no overlap.\nsrc/basics.ts(13,25): error TS2551: Property 'lenght' does not exist on type 'number[]'. Did you\nmean 'length'?",
        codeLang: "text",
        terms: [
          {
            term: "정적 타입 검사 (static type checking)",
            body: "코드를 실행하지 않고(static) 값의 종류가 맞는지 확인하는 일. 반대말은 실행 중에 확인하는 동적 검사입니다. JavaScript는 동적 타입 언어라 실행해야 알고, TypeScript는 그 위에 정적 검사를 더합니다.",
          },
          {
            term: "TS 코드 번호",
            body: "에러 문구 앞의 `TS2322` 같은 번호. 1xxx는 문법·파서, 2xxx는 타입 검사, 5xxx는 컴파일러 옵션, 6xxx는 프로그램 구성(파일 목록·프로젝트 참조), 7xxx는 noImplicitAny 계열, 18xxx는 비교적 새로 추가된 검사입니다. 검색할 때 번호가 문구보다 정확합니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 타입은 지워지고, 런타임 라이브러리는 없다",
        body: "문서의 약속은 두 개입니다. 'TypeScript는 JavaScript 코드의 런타임 동작을 결코 바꾸지 않는다', 그리고 '추가 런타임 라이브러리를 제공하지 않는다'. 실제로 `const n: number = 1; type T = string;`을 컴파일하면 `: number`와 `type T` 줄이 사라진 순수한 JavaScript만 남습니다. 거꾸로 말하면 타입이 틀린 코드도 실행은 됩니다. tsc는 기본으로 에러가 있어도 .js를 써 주기 때문입니다(`noEmitOnError`를 켜면 막힘). 처음 배우는 사람이 가장 많이 놀라는 자리라 문서가 미리 적어 둔 것입니다.",
        code: "// src/erasable.ts\nconst n: number = 1;\ntype T = string;\nexport const t: T = \"ok\";\n\n// tsc 가 쓴 erasable.js — 타입이 있던 자리가 그냥 비었다\nconst n = 1;\nexport const t = \"ok\";\n\n// Node 24 도 같은 일을 한다 (타입만 벗겨 내기, 검사 없음)\n$ node src/erasable.mts\n// enum 처럼 '지우기만으로 안 되는' 문법은 Node 가 거부한다\n$ node src/enums.ts\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode",
        codeLang: "text",
      },
      {
        label: "문제: 타입을 적었으니 안전하다고 믿는다",
        body: "이 문을 지난 사람이 다음에 겪는 일입니다. 함수에 `user: User`라고 적었으니 `user.name`은 항상 문자열일 거라고 믿는데, 그 user가 `fetch`로 받은 JSON이면 서버가 무엇을 보내든 타입 검사는 모릅니다. 타입은 '이 코드 안에서의 약속'이지 '바깥 세계의 사실'이 아닙니다. 경계(네트워크·localStorage·URL·사용자 입력)에서는 런타임 검증이 있어야 하고, 검증을 통과한 뒤부터가 타입의 영역입니다.",
        code: "경계 밖 (알 수 없음)      경계 (검증)              경계 안 (타입이 참)\n──────────────────────   ─────────────────────   ──────────────────────\nfetch 응답 · JSON.parse   if (typeof x.name ===   user.name 은 string\nlocalStorage · URL        \"string\") …  또는      — 검사기가 보장\n사용자 입력               스키마 검증 라이브러리",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "이 문을 지나면 핸드북의 기초로 갑니다. 기초는 여기서 말한 '실행 전 검사'가 구체적으로 무엇을 보는지(정적 타입 검사, 예외 아닌 실패, 도구 지원), 그리고 tsc·target·strict 세 가지 스위치를 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) `obj.heigth`를 JavaScript로 실행하면 어떻게 되고, TypeScript는 왜 실행 전에 잡을 수 있나요?\n2) `TS1005`와 `TS2322`는 어느 쪽이 문법 오류일까요?\n3) `const u: User = await res.json()`이라고 적으면 런타임에 `u.name`이 문자열임이 보장되나요?",
      },
    ],
    sources: [
      { label: "TypeScript for the New Programmer", href: `${DOCS}/handbook/typescript-from-scratch.html` },
      { label: "The Basics", href: `${DOCS}/handbook/2/basic-types.html` },
    ],
  },

  {
    id: "ts-start-js",
    name: "JS 개발자를 위한 TS",
    tagline: "추론이 먼저, 어노테이션은 추론이 모르는 곳에만",
    intro:
      "JavaScript를 이미 쓰는 사람을 위한 5분 입구입니다. 타입을 하나도 적지 않아도 TypeScript가 값에서 타입을 알아낸다는 것(추론)부터 시작해서, 적어야 하는 자리(함수 매개변수·객체 모양)에 어떻게 적는지, 그리고 `interface`와 `type` 중 무엇을 고를지, 유니온·제네릭·구조적 타입까지 한 번에 훑습니다.",
    blocks: [
      {
        label: "추론: 적지 않아도 안다",
        body: "`let helloWorld = \"Hello World\"`라고만 쓰면 TypeScript는 `helloWorld: string`으로 봅니다. 값이 바로 있으면 타입을 적을 이유가 없습니다. 실제로 TypeScript 6.0.3의 타입 API로 추론 결과를 꺼내 보면 `const`는 리터럴 `\"Hello World\"`, `let`은 넓혀진 `string`, 객체 리터럴은 각 속성의 타입을 가진 모양으로 잡힙니다. 어노테이션이 필요한 자리는 값이 아직 없는 곳 — 함수의 매개변수, 나중에 채울 변수, 바깥에서 들어오는 값 — 입니다.",
        code: "// TypeScript 6.0.3 checker.typeToString 으로 꺼낸 추론 결과\nconst helloWorld = \"Hello World\";  // helloWorld: \"Hello World\"   (const → 리터럴)\nlet changing = \"x\";                // changing: string            (let → 넓혀짐)\nconst obj = { name: \"a\", age: 1, tags: [\"x\"], nested: { ok: true } };\n// obj: { name: string; age: number; tags: string[]; nested: { ok: boolean; }; }\nconst mixed = [0, 1, null];        // mixed: (number | null)[]     (최적 공통 타입)\nconst arrow = (s: string) => s.length;  // arrow: (s: string) => number (반환은 추론)",
      },
      {
        label: "interface 와 type: 문서는 interface 를 먼저 권한다",
        body: "객체의 모양에 이름을 붙이는 방법은 둘입니다. 문서의 지침은 짧습니다. 'interface를 선호하라. type은 특정 기능이 필요할 때 쓰라.' 둘의 차이는 핸드북 일상적인 타입의 인터페이스 절에서 자세히 다루고, 여기서는 '객체 모양은 interface, 유니온이나 원시 타입의 별칭은 type'이라는 감만 잡으면 됩니다. 객체 리터럴을 넘길 때 모양에 없는 속성이 있으면 바로 걸립니다.",
        code: "interface User { name: string; id: number; }\nconst user: User = { username: \"Monkey\", id: 0 };\n//                   ~~~~~~~~\n// Object literal may only specify known properties, and 'username' does not exist in type 'User'.\n  (TS2353)\n\n// 클래스도 모양으로 맞춰진다 — implements 없이도 User 자리에 들어간다\nclass UserAccount { name: string; id: number; constructor(name: string, id: number) { this.name = name;\n  this.id = id; } }\nconst u: User = new UserAccount(\"Murphy\", 1);",
      },
      {
        label: "원시 타입 일곱 개와 TS 가 더한 네 개",
        body: "JavaScript의 원시 타입은 `boolean` `bigint` `null` `number` `string` `symbol` `undefined` 일곱 개이고, TypeScript는 여기에 `any`(무엇이든 허용), `unknown`(무엇인지 확인해야 함), `never`(일어날 수 없음), `void`(아무것도 돌려주지 않음) 네 개를 더합니다. 이 네 개는 값의 종류가 아니라 '검사기에게 하는 말'입니다. any는 검사를 끄고, unknown은 검사를 강제하고, never는 도달 불가를 표시하고, void는 반환값을 쓰지 말라는 뜻입니다.",
        terms: [
          {
            term: "any 와 unknown",
            body: "둘 다 '아무 값'을 받지만 쓸 때가 다릅니다. any는 무엇이든 할 수 있어서(any.foo.bar() 통과) 검사가 없어진 것과 같고, unknown은 좁히기 전에는 아무것도 못 합니다. 실제로 `catch (e)`의 e는 strict에서 unknown이라 `e.message`는 \"'e' is of type 'unknown'.\" 에러가 납니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: 유니온은 typeof 로 좁히고, 제네릭은 변수 같은 타입이다",
        body: "`string | string[]`처럼 '둘 중 하나'인 값은 그대로는 두 타입에 공통인 것만 쓸 수 있고, `typeof x === \"string\"`이나 `Array.isArray(x)`로 확인한 분기 안에서 하나로 좁혀집니다. 제네릭은 타입 자리에 변수를 두는 것입니다. `Array<string>`의 string처럼 쓰는 쪽이 채웁니다. 실제로 `const r2 = first<string>([1])`처럼 타입 인자와 값이 어긋나면 \"Argument of type 'number' is not assignable to parameter of type 'string'.\"이 바로 납니다.",
        code: "function wrapInArray(obj: string | string[]) {\n  if (typeof obj === \"string\") return [obj];   // 여기서 obj: string\n  return obj;                                  // 여기서 obj: string[]\n}\n\ninterface Backpack<Type> { add: (obj: Type) => void; get: () => Type; }\ndeclare const backpack: Backpack<string>;\nconst object = backpack.get();   // object: string\nbackpack.add(23);\n// Argument of type 'number' is not assignable to parameter of type 'string'. (TS2345)",
      },
      {
        label: "문제의 구조: 이름이 아니라 모양이 맞는지 본다",
        body: "이 문의 마지막 절이 구조적 타입입니다. `Point { x: number; y: number }`를 받는 함수에 `{ x: 12, y: 26 }`을 넘기면 됩니다. Point라고 선언한 적이 없어도 모양이 같으니까요. 속성이 더 있어도(`{ x, y, z }`) 됩니다. 반면 `{ hex: \"#187ABF\" }`는 x와 y가 없어서 안 됩니다. 에러 문구가 그 구조를 그대로 말합니다. \"Type '{ hex: string; }' is missing the following properties from type 'Point': x, y\". 이름을 비교하는 Java·C#의 명목적 타입과 가장 크게 갈리는 자리이고, 참고서의 타입 호환성 장이 이 규칙의 전부를 다룹니다.",
        code: "interface Point { x: number; y: number; }\nfunction logPoint(p: Point) {}\n\nlogPoint({ x: 12, y: 26 });                 // OK — 이름 없이 모양만\nlogPoint({ x: 12, y: 26, z: 89 });          // OK — 변수로 넘기면 더 있어도 됨\nlogPoint({ hex: \"#187ABF\" });\n// Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.\n//   Type '{ hex: string; }' is missing the following properties from type 'Point': x, y  (TS2345)",
      },
      {
        label: "다음 입구",
        body: "핸드북의 기초 → 일상적인 타입으로 이어집니다. 이 문에서 한 줄씩 지나간 유니온·타입 별칭·인터페이스·리터럴이 일상적인 타입에서 절 하나씩으로 펼쳐집니다. '얼마나 적어야 하는가'의 답은 거기와 좁히기 장에 있습니다 — 추론이 되는 곳은 맡기고, 함수 경계와 바깥 입력에만 적는 것이 기본 자세입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `const s = \"a\"`와 `let s = \"a\"`의 추론 타입은 어떻게 다른가요?\n2) `logPoint({ x: 1, y: 2, z: 3 })`는 되는데 `const p: Point = { x: 1, y: 2, z: 3 }`은 왜 에러일까요(힌트: 객체 리터럴 초과 속성 검사)?\n3) 문서가 interface를 먼저 권하는 문장을 그대로 적어 보세요.",
      },
    ],
    sources: [
      { label: "TypeScript for JavaScript Programmers", href: `${DOCS}/handbook/typescript-in-5-minutes.html` },
      { label: "Everyday Types", href: `${DOCS}/handbook/2/everyday-types.html` },
      { label: "Type Compatibility", href: `${DOCS}/handbook/type-compatibility.html` },
    ],
  },

  {
    id: "ts-start-oop",
    name: "Java·C# 개발자를 위한 TS",
    tagline: "클래스는 선택이고, 타입은 이름이 아니라 모양이다",
    intro:
      "Java·C#에서 오는 사람을 위한 문입니다. 두 언어의 습관 — 모든 것은 클래스 안에 있고, 타입은 클래스 이름이며, 런타임에 타입을 물을 수 있다 — 세 가지가 TypeScript에서는 전부 다릅니다. 문서는 이 차이를 '구조적(structural) 대 명목적(nominal)', '구체화(reified) 안 됨', '자유 함수가 기본'으로 정리합니다.",
    blocks: [
      {
        label: "클래스는 필수가 아니다",
        body: "Java·C#은 모든 코드가 클래스 안에 있어야 하지만 JavaScript는 함수가 최상위에 그대로 있을 수 있고, 문서는 '자유 함수(free function)가 JavaScript 프로그램을 쓰는 데 선호되는 모델'이라고 적습니다. 그래서 싱글턴 클래스나 정적 클래스 같은 패턴은 TypeScript에서 '불필요'합니다. 그냥 객체 리터럴이나 모듈 수준의 함수로 씁니다. 클래스는 여전히 있고(인터페이스 구현·상속·static 메서드 전부 됨), 다만 그것이 유일한 그릇이 아닙니다.",
      },
      {
        label: "실제로 돌려 보면: 빈 클래스는 모든 것을 받는다",
        body: "구조적 타입이 명목적 사고와 가장 세게 충돌하는 예가 문서의 `class Empty {}`입니다. Empty 타입의 매개변수에 `{ k: 10 }`을 넘겨도 에러가 아닙니다. Empty에는 멤버가 없고, '멤버가 없는 타입'의 요구는 '아무것도 요구하지 않음'이라 어떤 객체든 맞기 때문입니다. 멤버가 똑같은 두 클래스 `Car`와 `Golfer`도 서로 대입됩니다. 실제로 돌려 보면 둘 다 에러 없이 통과하고 실행도 됩니다. Java에서라면 두 경우 모두 컴파일 에러입니다.",
        code: "class Empty {}\nfunction fn(arg: Empty) { return \"accepted\"; }\nfn({ k: 10 });   // 에러 없음 — Empty 는 아무것도 요구하지 않는다\n\nclass Car { drive() {} }\nclass Golfer { drive() {} }\nlet w: Car = new Golfer();   // 에러 없음 — 멤버가 같다\n\n// 실제 실행 (rt/classes.ts → node)\naccepted accepted",
      },
      {
        label: "타입은 런타임에 없다: 리플렉션이 안 된다",
        body: "Java·C#의 타입은 런타임에도 남아서 `instanceof`·리플렉션·제네릭 타입 인자 조회가 됩니다. TypeScript의 타입은 컴파일 뒤 전부 지워집니다. 문서의 표현은 'Pointlike 타입은 런타임에 어떤 형태로도 존재하지 않는다'. 그래서 `typeof (new Car())`는 `\"object\"`이고, 제네릭 `Array<string>`의 string은 런타임에 물어볼 수 없습니다. 인터페이스로는 `instanceof`를 할 수 없고(인터페이스는 값이 아니니까), 그 자리에는 핸드북 좁히기의 사용자 정의 타입 가드가 옵니다.",
        code: "interface Pointlike { x: number; y: number }\nfunction isPointlike(v: unknown): v is Pointlike {\n  // 런타임엔 Pointlike 가 없으니 모양을 직접 확인한다\n  return typeof v === \"object\" && v !== null && \"x\" in v && \"y\" in v;\n}\n// v instanceof Pointlike  ← 인터페이스는 값이 아니라서 쓸 수 없다\n// 'Pointlike' only refers to a type, but is being used as a value here.",
      },
      {
        label: "문제가 나는 경우: 명목적 습관으로 설계할 때",
        body: "구조적 타입에서 자주 어긋나는 설계 습관을 적어 둡니다.",
        code: "습관 (Java·C#)                      TypeScript 에서 일어나는 일\n─────────────────────────────────  ─────────────────────────────────────────\n빈 마커 인터페이스로 구분           모양이 같으니 구분 안 됨 → 판별 속성(kind) 추가\n같은 모양의 UserId·OrderId 클래스   서로 대입됨 → 브랜드 타입(string & { __brand })\ninterface 에 instanceof            값이 아니라서 불가 → 타입 가드 함수\nprivate 로 캡슐화하면 다른 타입      private 은 '같은 선언 출처' 비교 — 유일한 명목적 자리\n제네릭 인자를 런타임에 조회         지워져서 불가 → 값으로 따로 넘김",
        codeLang: "text",
        terms: [
          {
            term: "명목적 (nominal) 타입과 구조적 (structural) 타입",
            body: "명목적은 '이름이 같은가'로, 구조적은 '모양(멤버)이 맞는가'로 호환을 정합니다. TypeScript는 구조적이되, 클래스의 private·protected 멤버만은 '같은 선언에서 온 것인가'를 보는 예외가 있습니다(참고서 타입 호환성 장).",
          },
          {
            term: "브랜드 타입 (branded type)",
            body: "`type UserId = string & { readonly __brand: \"UserId\" }`처럼 런타임에 없는 속성을 교차해 이름을 구분하는 기법. 구조적 시스템 안에서 명목적 구분을 흉내 냅니다. 함수형 개발자 문에 '태그된 교차 타입'으로 같은 기법이 나옵니다.",
          },
        ],
      },
      {
        label: "다음 입구",
        body: "클래스 문법 자체는 핸드북의 클래스 장에 다 있습니다. 상속·implements·abstract·접근 제한자가 전부 있지만, 그 장의 마지막 절 '클래스 사이의 관계'가 다시 이 문의 결론 — 멤버가 없는 클래스는 무엇의 상위 타입이기도 하다 — 으로 돌아옵니다. 구조적 규칙의 전부는 참고서의 타입 호환성에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `fn({ k: 10 })`이 `Empty`를 받는 함수에 통과하는 이유를 한 문장으로 적어 보세요.\n2) 인터페이스에 `instanceof`를 쓸 수 없는 이유는?\n3) `UserId`와 `OrderId`를 둘 다 string으로 두면 서로 섞여도 에러가 안 납니다. 어떻게 구분하나요?",
      },
    ],
    sources: [
      { label: "TypeScript for Java/C# Programmers", href: `${DOCS}/handbook/typescript-in-5-minutes-oop.html` },
      { label: "Classes — Relationships Between Classes", href: `${DOCS}/handbook/2/classes.html#relationships-between-classes` },
      { label: "Type Compatibility", href: `${DOCS}/handbook/type-compatibility.html` },
    ],
  },

  {
    id: "ts-start-fp",
    name: "함수형 개발자를 위한 TS",
    tagline: "태그 없는 유니온, 점진적 타입, 그리고 없는 것들",
    intro:
      "Haskell·ML 계열에서 오는 사람을 위한 문입니다. TypeScript의 타입 시스템을 그쪽 용어로 대응시켜 줍니다. 원시 타입과 `unknown`(top)·`never`(bottom), 상자 안의 타입(`T[]`·튜플), `any`는 검사기를 끄는 스위치, 점진적(gradual) 타입, 구조적 타입, 그리고 태그 없는 유니온·교차·단위 타입까지. 끝에는 TypeScript에 없는 것 — 고차 종류 타입(HKT), 포인트프리 스타일의 추론 — 을 적습니다.",
    blocks: [
      {
        label: "유니온은 태그가 없다",
        body: "함수형 언어의 합 타입(sum type)은 생성자 이름이 태그 역할을 해서 어느 쪽인지 바로 알 수 있습니다. TypeScript의 `string | number`에는 그런 태그가 없습니다. 어느 쪽인지는 값 자체를 봐야(typeof, Array.isArray) 알고, 객체끼리라면 `kind: \"circle\"` 같은 판별 속성을 직접 넣어야 합니다. 문서는 '내장 태그나 속성으로 판별하라'고 적습니다. 그래서 핸드북 좁히기 장의 판별 유니온(discriminated union)이 함수형 개발자에게는 '내가 태그를 손으로 다는 법'이 됩니다.",
        code: "// 태그가 없는 유니온 — 값을 보고 가른다\nfunction size(x: string | string[]) {\n  return Array.isArray(x) ? x.length : x.length;\n}\n// 객체라면 태그를 직접 단다 (판별 유니온)\ntype Shape = { kind: \"circle\"; r: number } | { kind: \"square\"; s: number };",
      },
      {
        label: "실제로 돌려 보면: 단위 타입은 대입하면 넓어진다",
        body: "`\"left\"` 같은 문자열 리터럴은 하나의 값만 가지는 단위 타입(unit type)입니다. 그런데 `let s = \"right\"`처럼 변경 가능한 변수에 넣는 순간 `string`으로 넓혀집니다. 그 변수를 `\"left\" | \"right\"`를 받는 함수에 넘기면 에러입니다. 실제로 `const c1 = { kind: \"left\" }`의 kind는 `string`으로 잡혔고 `go(c1.kind)`는 \"Argument of type 'string' is not assignable to parameter of type '\"left\" | \"right\"'.\"로 막혔습니다. `as const`를 붙이면 `readonly kind: \"left\"`로 남아 통과합니다. 함수형 언어에서는 리터럴이 그대로 타입인 경우가 많아 이 '넓힘(widening)'이 낯선 지점입니다.",
        code: "declare function go(k: \"left\" | \"right\"): void;\n\nconst c1 = { kind: \"left\" };            // c1: { kind: string }   ← 넓혀짐\ngo(c1.kind);\n// Argument of type 'string' is not assignable to parameter of type '\"left\" | \"right\"'. (TS2345)\n\nconst c2 = { kind: \"left\" } as const;   // c2: { readonly kind: \"left\" }\ngo(c2.kind);                            // OK\nconst c3 = { kind: \"left\" as const };   // 속성 하나만 고정해도 된다\ngo(c3.kind);                            // OK",
        terms: [
          {
            term: "넓힘 (widening)",
            body: "리터럴 타입이 변경 가능한 자리(let, 객체 속성)에 들어갈 때 그 리터럴을 포함하는 더 넓은 타입(string, number)으로 바뀌는 추론 규칙. 나중에 다른 값을 넣을 수 있으니 미리 넓혀 둡니다. `const`와 `as const`, `readonly`가 넓힘을 막습니다.",
          },
        ],
      },
      {
        label: "교차 타입과 태그된 교차",
        body: "`A & B`는 두 타입의 멤버를 모두 가진 타입입니다. 함수형에서는 레코드 확장에 가깝습니다. 같은 속성이 서로 다른 타입이면 그 속성은 `number & string` — 가능한 값이 없는 `never`가 됩니다. 문서는 이것을 뒤집어 '태그된 교차'로도 씁니다. `type FString = string & { __compileTimeOnly: any }`는 런타임에는 그냥 string이지만 타입으로는 다른 string과 구분되는 이름이 됩니다. 구조적 시스템 안에서 명목적 구분을 만드는 기법이고, Java·C# 문의 브랜드 타입과 같은 것입니다.",
        code: "type Combined = { a: number } & { b: string };     // { a: number; b: string }\ntype Conflicting = { a: number } & { a: string };  // a: never\n\ntype FString = string & { __compileTimeOnly: any };\n// 런타임엔 string, 타입으론 '검사된 string' 이라는 표시",
      },
      {
        label: "없는 것들: 고차 종류 타입과 포인트프리",
        body: "문서가 솔직하게 적는 한계입니다. 'TypeScript에는 고차 종류 타입(higher kinded types)이 없다' — `F<_>`처럼 '타입 생성자 자체'를 타입 변수로 받는 것은 할 수 없습니다. Functor·Monad를 일반화하는 인터페이스를 그대로 옮길 수 없는 이유입니다. 그리고 포인트프리 스타일(인자를 적지 않고 함수를 합성하는 스타일)은 추론을 자주 깨뜨립니다. 추론은 호출 지점의 인자를 보고 타입 변수를 채우는데, 인자가 없으면 채울 재료가 없기 때문입니다. 문서의 권고는 '추론이 안 되면 매개변수를 적어라'입니다.",
        code: "// 되는 것: 구체 타입 생성자에 대한 map\nfunction mapArray<A, B>(f: (a: A) => B, xs: A[]): B[] { return xs.map(f); }\n\n// 안 되는 것: F 자체를 변수로 (HKT)\n// interface Functor<F<_>> { map<A, B>(f: (a: A) => B, fa: F<A>): F<B> }\n//                  ~~~~  — 문법이 없다\n\n// 포인트프리는 추론 재료가 없다\nconst compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => f(g(a));\nconst inc = (n: number) => n + 1; const str = (n: number) => String(n);\nconst both = compose(str, inc);   // 여기는 됨 — 인자가 둘 다 있어서\n// const h = compose(str);        // 커링을 섞으면 A 를 알 길이 없어 unknown 으로 남는다",
      },
      {
        label: "다음 입구",
        body: "이 문이 가리키는 핸드북의 자리는 셋입니다.\n좁히기 장은 태그를 직접 다는 판별 유니온과 never 소진 검사를 다룹니다.\n일상적인 타입의 리터럴 타입 절은 넓힘과 as const를 다룹니다.\n타입 조작은 조건부·매핑된 타입을 다루며, 함수형의 타입 수준 계산과 가장 가까운 곳입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `let dir = \"left\"`를 `\"left\" | \"right\"` 자리에 넘기면 왜 에러가 나고, 어떻게 고치나요?\n2) `{ a: number } & { a: string }`의 a는 어떤 타입이 되나요?\n3) TypeScript에서 Functor 인터페이스를 `F<_>`로 일반화할 수 없는 이유를 한 문장으로.",
      },
    ],
    sources: [
      { label: "TypeScript for Functional Programmers", href: `${DOCS}/handbook/typescript-in-5-minutes-func.html` },
      { label: "Narrowing — Discriminated unions", href: `${DOCS}/handbook/2/narrowing.html#discriminated-unions` },
      { label: "Everyday Types — Literal Types", href: `${DOCS}/handbook/2/everyday-types.html#literal-types` },
    ],
  },

  {
    id: "ts-start-tooling",
    name: "5분 만에 보는 TS 도구",
    tagline: "tsc 한 번 돌려 보고 .js 가 나오는 것을 보는 일",
    intro:
      "설치하고 파일 하나를 컴파일해 보는 가장 짧은 문입니다. `npm install -g typescript`, `tsc greeter.ts`, 그러면 `greeter.js`가 나옵니다. 이 문의 핵심 문장은 두 개입니다. '.ts 확장자를 썼지만 이 코드는 그냥 JavaScript다', 그리고 '에러가 있었지만 greeter.js 파일은 그래도 만들어진다'.",
    blocks: [
      {
        label: "설치와 첫 컴파일",
        body: "전역 설치보다 프로젝트에 개발 의존성으로 두는 쪽이 요즘 관례입니다(`npm i -D typescript`, 실행은 `npx tsc`). 문서의 greeter 예제는 함수 매개변수에 `: string` 하나를 붙이고, 숫자 배열을 넘겨 에러를 받아 보는 것으로 끝납니다. 에러 문구는 \"Argument of type 'number[]' is not assignable to parameter of type 'string'.\"입니다. 실제로 7.0.2에서 돌려 보면 같은 코드로 같은 문구가 나오고, 파일 위치 `(행,열)`과 `error TS2345`가 앞에 붙습니다.",
        code: "$ npm i -D typescript\n$ npx tsc --version\nVersion 7.0.2\n\n$ cat greeter.ts\nfunction greeter(person: string) { return \"Hello, \" + person; }\nlet user = [0, 1, 2];\ndocument.body.textContent = greeter(user);\n\n$ npx tsc greeter.ts\ngreeter.ts(3,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type\n  'string'.\n\n$ ls\ngreeter.js  greeter.ts     # ← 에러가 났는데도 .js 는 나왔다",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 에러가 있어도 .js 는 나온다",
        body: "이 문에서 가장 중요한 관찰입니다. tsc는 검사와 변환을 따로 하기 때문에 타입 에러가 있어도 변환 결과를 씁니다. 문서의 설명은 '타입 어노테이션이 틀려도 코드가 돌아갈 거라고 TypeScript는 경고하는 것뿐'입니다. 막고 싶으면 `--noEmitOnError`를 켭니다. 반대로 요즘 흔한 구성은 검사만 하는 `tsc --noEmit`을 CI에 두고, .js를 만드는 일은 Vite·esbuild 같은 빠른 도구에 맡기는 것입니다. 실제로 enum 선언과 타입 에러가 섞인 파일을 컴파일했을 때도 에러 두 줄 뒤에 enums.js가 정상적으로 쓰였습니다.",
        code: "$ npx tsc --target es2022 --module esnext --outDir out src/enums.ts\nsrc/enums.ts(2,7): error TS2322: Type '5' is not assignable to type 'Dir'.\nsrc/enums.ts(2,25): error TS2322: Type '\"a\"' is not assignable to type 'Str'.\n\n$ head -6 out/enums.js        # 그래도 나왔다\n\"use strict\";\nvar Dir;\n(function (Dir) {\n    Dir[Dir[\"Up\"] = 0] = \"Up\";\n    Dir[Dir[\"Down\"] = 1] = \"Down\";\n})(Dir || (Dir = {}));\n\n$ npx tsc --noEmitOnError --outDir out2 src/enums.ts && ls out2\n# 에러 → out2 없음",
        codeLang: "bash",
      },
      {
        label: "인터페이스와 클래스: implements 없이도 맞는다",
        body: "문서의 두 번째 예제는 `interface Person { firstName: string; lastName: string }`과 `class Student`입니다. Student는 Person을 `implements`하지 않았는데도 Person 자리에 들어갑니다. 모양이 맞으니까요. 그리고 생성자 매개변수에 `public firstName: string`이라고 쓰면 같은 이름의 속성이 자동으로 만들어진다는 '매개변수 속성'이 여기서 처음 나옵니다. 실제로 컴파일하면 `this.x = x`가 생성자 본문에 들어간 .js가 나옵니다.",
        code: "class PP { constructor(public x: number) {} }\n\n// tsc 출력 (target es2022)\nclass PP {\n    x;\n    constructor(x) {\n        this.x = x;\n    }\n}",
      },
      {
        label: "문제: 에디터는 빨간 줄을 그리는데 빌드는 통과한다",
        body: "이 문을 지난 뒤 처음 겪는 혼란입니다. VS Code가 빨간 줄을 긋는데 `npm run build`는 성공합니다. 빌드가 Vite·esbuild·Babel이면 그 도구는 변환만 하기 때문입니다. 에디터는 tsserver(검사기)를 쓰고 빌드는 변환기를 쓰니 둘이 다른 말을 합니다. 해결은 CI에 `tsc --noEmit`을 추가하는 것입니다. 거꾸로 에디터와 CI의 결과가 다르면 둘이 다른 TypeScript 버전을 보고 있을 가능성이 큽니다(VS Code의 'Use Workspace Version').",
        code: "증상                                  원인                          처방\n────────────────────────────────────  ───────────────────────────  ──────────────────────────\n에디터 빨간 줄, 빌드는 성공            빌드 도구는 변환만 함           CI 에 tsc --noEmit\n에디터와 CI 결과가 다름                TS 버전이 다름                 워크스페이스 버전 사용\n에러가 있는데 dist 가 갱신됨           기본이 emit                    noEmitOnError (또는 CI 에서 실패)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "tsc의 스위치가 왜 그렇게 많은지는 프로젝트 설정 섹션에서, `target`·`module`·`strict` 세 스위치의 뜻은 핸드북 기초에서 이어집니다. 빌드 도구에 끼우는 법은 튜토리얼의 Babel과 함께 쓰기와 프로젝트 설정의 빌드 도구 연동에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `tsc greeter.ts`에서 에러가 났는데 greeter.js가 생긴 이유는? 막으려면 어떤 플래그를 쓰나요?\n2) 에디터는 에러를 보이는데 Vite 빌드는 성공합니다. 무엇이 빠졌나요?\n3) `constructor(public x: number) {}`가 만들어 내는 JavaScript를 적어 보세요.",
      },
    ],
    sources: [
      { label: "TypeScript Tooling in 5 minutes", href: `${DOCS}/handbook/typescript-tooling-in-5-minutes.html` },
      { label: "tsc CLI Options", href: `${DOCS}/handbook/compiler-options.html` },
      { label: "Using Babel with TypeScript", href: `${DOCS}/handbook/babel-with-typescript.html` },
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
      {
        label: "문서가 스스로 정한 목표와 비목표",
        body: "핸드북 소개 페이지는 읽는 사람이 끝나고 할 수 있어야 하는 것을 셋으로 적습니다. 흔히 쓰는 TypeScript 문법과 패턴을 읽고 이해하기, 중요한 컴파일러 옵션의 효과를 설명하기, 대부분의 경우 타입 시스템의 동작을 올바르게 예측하기. 그리고 다루지 않는 것도 적습니다. JavaScript 기초(함수·클래스·클로저)는 가르치지 않고, 완전한 언어 명세가 아니며, 빌드 도구 연동은 '필요한 곳 외에는' 범위 밖입니다. '몇 시간 안에 읽을 수 있게' 모서리 사례는 의도적으로 뺐다고도 적습니다. 그래서 모서리에서 막히면 참고서로 가야 합니다.",
        code: "핸드북 (순서대로 읽는다)          참고서 (필요할 때 한 항목)\n──────────────────────────────  ────────────────────────────────\n기초 → 일상 → 좁히기 → 함수 →   유틸리티 타입 · 데코레이터 · 선언 병합\n객체 → 타입 조작 → 클래스 →      Enum · 이터레이터 · JSX · 믹스인 ·\n모듈                             네임스페이스 · 심볼 · 삼중 슬래시 ·\n'대부분의 경우' 를 예측하게      타입 호환성 · 타입 추론 · 변수 선언\n                                 '연속성 없음' — 모서리를 다룬다",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 여덟 장이 각각 어떤 에러를 내는가",
        body: "장마다 대표 에러 하나씩을 tsc 7.0.2에서 받아 두면 지도가 됩니다. 기초는 TS2345(인자 타입), 일상적인 타입은 TS2353(객체 리터럴 초과 속성), 좁히기는 TS18047('possibly null'), 함수는 TS2769(맞는 오버로드 없음), 객체는 TS2540(readonly 대입), 타입 조작은 TS2536(인덱스 불가), 클래스는 TS2564(초기화 안 됨), 모듈은 TS2835(확장자 필요). 이 번호들이 아래 시트의 '실제로 돌려 보면'에 다시 나옵니다.",
        code: "기초  TS2345  Argument of type 'string' is not assignable to parameter of type 'Date'.\n일상  TS2353  Object literal may only specify known properties, and 'z' does not exist in type 'Pt'.\n좁히기  TS18047 'el' is possibly 'null'.\n함수  TS2769  No overload matches this call.\n객체  TS2540  Cannot assign to 'id' because it is a read-only property.\n타입 조작  TS2536  Type '\"message\"' cannot be used to index type 'T'.\n클래스  TS2564  Property 'x' has no initializer and is not definitely assigned in the constructor.\n모듈  TS2835  Relative import paths need explicit file extensions in ECMAScript imports when\n             '--moduleResolution' is 'node16' or 'nodenext'.",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "기초부터 순서대로입니다. 일상적인 타입은 절이 열넷이라 시트도 열넷으로 나눴고, 타입 조작도 여덟 절이 각각 시트입니다. 나머지 장(기초·좁히기·함수·객체·클래스·모듈)은 장 하나가 시트 하나입니다.",
      },
    ],
    sources: [
      { label: "The TypeScript Handbook", href: `${DOCS}/handbook/intro.html` },
      { label: "Narrowing", href: `${DOCS}/handbook/2/narrowing.html` },
      { label: "Creating Types from Types", href: `${DOCS}/handbook/2/types-from-types.html` },
    ],
  },

  {
    id: "ts-hb-basics",
    name: "기초",
    tagline: "실행 전에 무엇을 볼 수 있는가, 그리고 세 개의 스위치",
    intro:
      "핸드북의 첫 장입니다. 정적 타입 검사가 잡는 것(호출할 수 없는 값, 없는 속성, 오타, 논리 오류), 타입이 도구에 주는 것(자동 완성·빠른 수정), tsc의 동작(에러가 있어도 emit, `noEmitOnError`), 명시적 타입과 지워지는 타입, 다운레벨링(`target`), 그리고 엄격함(`strict`, `noImplicitAny`, `strictNullChecks`)까지. 뒤의 모든 장이 이 장의 어휘를 씁니다.",
    blocks: [
      {
        label: "예외가 아닌 실패까지 잡는다",
        body: "JavaScript에서 `message()`를 문자열에 부르면 실행 중 TypeError가 납니다. 이건 '예외'라 실행하면 어차피 알게 됩니다. 문서가 더 강조하는 것은 '예외가 아닌 실패(non-exception failures)'입니다. 없는 속성을 읽으면 JavaScript는 에러 없이 `undefined`를 돌려주고, 그 undefined가 한참 뒤 다른 곳에서 터집니다. TypeScript는 이것도 그 자리에서 에러로 봅니다. \"Property 'location' does not exist on type '{ name: string; age: number; }'.\" 같은 식입니다. 오타(`toLocaleLowercase`), 호출하지 않은 함수와의 비교(`Math.random < 0.5`), 겹치지 않는 비교(`\"a\" === \"b\"`)도 같은 종류입니다.",
        code: 'const message = "hello!";\nmessage();\n// This expression is not callable.\n//   Type \'String\' has no call signatures.                               (TS2349)\n\nconst user = { name: "Daniel", age: 26 };\nuser.location;   // JS 는 undefined — 예외가 아닌 실패\n// Property \'location\' does not exist on type \'{ name: string; age: number; }\'. (TS2339)\n\nfunction flipCoin() { return Math.random < 0.5; }\n// Operator \'<\' cannot be applied to types \'() => number\' and \'number\'.      (TS2365)',
      },
      {
        label: "실제로 돌려 보면: tsc, 에러와 emit, noEmitOnError",
        body: "`tsc hello.ts`를 돌리면 에러가 없을 때는 아무것도 출력하지 않고 hello.js를 씁니다. 에러가 있으면 에러를 출력하고 — 그래도 hello.js를 씁니다. 문서의 문장은 'TypeScript는 당신이 TypeScript보다 더 잘 안다는 전제에서 방해하지 않는다'입니다. 막고 싶으면 `--noEmitOnError`. 실제로 7.0.2에서 인자 하나가 빠진 호출은 \"Expected 2 arguments, but got 1.\"(TS2554)로 보고되고, `--noEmitOnError`를 켠 쪽은 출력 디렉터리가 만들어지지 않았습니다.",
        code: "$ npx tsc --noEmit src/basics.ts\nsrc/basics.ts(5,1): error TS2554: Expected 2 arguments, but got 1.\nsrc/basics.ts(6,6): error TS2345: Argument of type 'number' is not assignable to parameter of type\n  'string'.\nsrc/basics.ts(7,12): error TS7006: Parameter 'x' implicitly has an 'any' type.\nsrc/basics.ts(9,1): error TS18048: 'maybe' is possibly 'undefined'.\nsrc/basics.ts(11,1): error TS18047: 'el' is possibly 'null'.\n\n# emit 은 그대로, noEmitOnError 를 켜면 멈춘다\n$ npx tsc --noEmitOnError --outDir out2 src/basics.ts; ls out2\nls: out2: No such file or directory",
        codeLang: "bash",
      },
      {
        label: "명시적 타입, 그리고 지워지는 타입",
        body: "`function greet(person: string, date: Date)`처럼 매개변수에 타입을 적는 것이 명시적 타입입니다. 문서의 예에서 `greet(\"Maddison\", Date())`가 에러인 이유는 `Date()`가 문자열을 돌려주기 때문입니다 — `new Date()`가 Date입니다. 그런데 변수 `let msg = \"hello\"`에는 타입을 적지 않아도 string으로 추론되니 안 적는 것이 좋습니다. 그리고 컴파일 결과를 보면 `: string`과 `: Date`가 사라지고 템플릿 리터럴이 문자열 연결로 바뀌어 있습니다. '타입 어노테이션은 프로그램의 런타임 동작을 결코 바꾸지 않는다'가 이 장의 기억할 문장입니다.",
        code: 'function greet(person: string, date: Date) {\n  console.log(`Hello ${person}, today is ${date.toDateString()}!`);\n}\ngreet("Maddison", Date());\n// Argument of type \'string\' is not assignable to parameter of type \'Date\'. (TS2345)\ngreet("Maddison", new Date());   // OK\n\n// target es5 로 컴파일했던 시절의 출력 (문서 예시) — 타입이 지워지고 문법이 낮아진다\nfunction greet(person, date) {\n  console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));\n}',
      },
      {
        label: "다운레벨링: target 이 정하는 문법의 높이",
        body: "템플릿 리터럴은 ES2015 문법입니다. `target`을 그보다 낮게 두면 tsc가 옛 문법으로 바꿔 씁니다(다운레벨링). 문서는 '기본으로 TypeScript는 ES5를 타깃한다'고 적고 있지만, 이것은 지금 사실이 아닙니다. 6.0에서 기본 target이 그해의 ES 버전(es2025)으로 바뀌었고, 7.0에서는 `--target es5` 자체가 \"Option 'target=ES5' has been removed.\"로 거부됩니다. 실제로 `--explainFiles`를 돌려 보면 \"Default library for target 'ES2025'\"가 찍힙니다. 문서의 이 절은 '왜 target이라는 스위치가 있는가'로만 읽으면 됩니다.",
        code: "$ npx tsc -p . --explainFiles | head -2\n   Default library for target 'ES2025'      # 6.0+ 기본값\n\n$ npx tsc --noEmit --target es5 a.ts\nerror TS5108: Option 'target=ES5' has been removed. Please remove it from your configuration.\n\n# 아직 낮출 수 있는 것: es2015 ~ esnext\n$ npx tsc --target es2015 --outDir out a.ts   # 템플릿 리터럴은 그대로, async/await 는 generator 로",
        codeLang: "bash",
        terms: [
          {
            term: "다운레벨링 (downleveling)",
            body: "새 ECMAScript 문법을 오래된 런타임이 읽을 수 있는 옛 문법으로 바꿔 쓰는 일입니다. 문법만 바꾸고(예: async → generator 기반 코드) 런타임 API(Promise, Map)는 채워 주지 않습니다. 그건 폴리필의 일입니다.",
          },
        ],
      },
      {
        label: "엄격함: strict 는 스위치 묶음이고, 지금은 기본이 켜짐이다",
        body: "`strict`는 여러 검사를 한꺼번에 켭니다. 문서가 둘을 꼽습니다. `noImplicitAny` — 타입을 추론할 수 없어 any로 떨어지는 자리를 에러로(\"Parameter 'x' implicitly has an 'any' type.\"), `strictNullChecks` — null과 undefined를 다른 타입과 구분해 '있을 수도 있는 값'을 쓰기 전에 확인하게(\"'maybe' is possibly 'undefined'.\"). 문서는 '새 코드베이스는 가능하면 항상 켜라'고 적는데, 6.0부터는 켜지 않아도 기본이 true입니다. 끄려면 명시적으로 `\"strict\": false`를 적어야 합니다. 그래서 '왜 우리 프로젝트는 이런 에러가 안 나지'는 대개 옛 tsconfig에 `strict: false`나 개별 플래그 false가 남아 있는 경우입니다.",
        code: "strict 가 켜는 것 (6.0+ 기본 true)\n──────────────────────────────────────────────────────────\nnoImplicitAny              추론 실패 → any 대신 에러 (TS7006)\nstrictNullChecks           null·undefined 를 따로 셈 (TS18047/18048)\nstrictFunctionTypes        함수 매개변수를 반공변으로 검사\nstrictBindCallApply        bind/call/apply 인자 검사\nstrictPropertyInitialization 클래스 필드 초기화 검사 (TS2564)\nstrictBuiltinIteratorReturn 내장 이터레이터의 반환을 undefined 로\nnoImplicitThis             this 가 any 로 떨어지면 에러\nuseUnknownInCatchVariables catch (e) 의 e 를 unknown 으로\nalwaysStrict               \"use strict\" 출력",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 검사기는 '약속'을, 런타임은 '사실'을 다룬다",
        body: "이 장을 관통하는 선은 하나입니다. 타입은 코드 안의 약속이고, 검사는 그 약속끼리의 모순을 찾습니다. 약속이 사실과 다르면(바깥에서 다른 값이 들어오면) 검사기는 알 길이 없습니다. 그래서 세 스위치의 역할도 갈립니다. `strict`는 '약속을 얼마나 꼼꼼히 비교할까', `target`은 '약속을 지운 뒤 어떤 문법으로 쓸까', `noEmitOnError`는 '모순이 있으면 쓰지 말까'. 셋 다 런타임의 사실을 바꾸지는 않습니다.",
      },
      {
        label: "다음 입구",
        body: "일상적인 타입으로 갑니다. 이 장에서 쓴 string·Date·any가 거기서 절 하나씩이 됩니다. `strict`의 각 플래그가 정확히 무엇을 하는지는 프로젝트 설정의 TSConfig 레퍼런스에, '있을 수도 있는 값'을 확인하는 문법은 좁히기 장에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `user.location`은 JavaScript에서 예외가 아닙니다. 그런데 TypeScript가 에러로 보는 이유는?\n2) `greet(\"Maddison\", Date())`가 에러인 이유는 무엇이고 어떻게 고치나요?\n3) 6.0 이후 프로젝트에서 `'x' is possibly 'undefined'`가 전혀 안 뜬다면 tsconfig에서 무엇을 의심해야 할까요?",
      },
    ],
    sources: [
      { label: "The Basics", href: `${DOCS}/handbook/2/basic-types.html` },
      { label: "TSConfig — strict", href: `${TSCONFIG}/#strict` },
      { label: "TypeScript 6.0 — New defaults", href: `${DOCS}/handbook/release-notes/typescript-6-0.html` },
    ],
  },

  {
    id: "ts-hb-everyday",
    name: "일상적인 타입",
    tagline: "자바스크립트에서 매일 만나는 값을 타입스크립트로 적는 법",
    intro:
      "자바스크립트 코드에서 흔히 쓰는 값들을 타입스크립트에서는 어떤 타입으로 적는지 설명하는 장입니다. 모든 타입을 다루지는 않고, 뒤에 나올 복잡한 타입들의 재료가 되는 기본 타입부터 짚습니다. 타입은 타입 어노테이션 말고도 훨씬 많은 자리에 나오는데, 타입 자체를 배우면서 그 타입을 가리켜 새 구성을 만드는 자리들도 함께 배웁니다. 문서의 대제목마다 시트 하나로 나눠 따라가며 정리합니다.",
    blocks: [
      {
        label: "열네 개의 대제목",
        body: "대제목은 원시 타입, 배열, any, 변수의 타입 어노테이션, 함수, 객체 타입, 유니온 타입, 타입 별칭, 인터페이스, 타입 단언, 리터럴 타입, null과 undefined, 열거형, 덜 쓰는 원시 타입입니다.\n앞의 다섯은 타입 하나를 적는 법이고, 유니온 타입부터는 타입을 조합하고 이름을 붙이는 법입니다.",
      },
      {
        label: "실제로 돌려 보면: 열네 절의 대표 에러",
        body: "절마다 가장 자주 만나는 에러를 tsc 7.0.2로 받아 두었습니다. 아래 시트들의 코드 조각은 이 표의 한 줄씩을 자세히 풉니다.",
        code: "원시 타입  String 을 string 자리에  TS2345  'String' is a primitive wrapper… (문서) / Argument of\n                                        type 'String'…\n배열   arr.lenght       TS2551  Property 'lenght' does not exist on type 'number[]'. Did you mean 'length'?\nany    function g(x)    TS7006  Parameter 'x' implicitly has an 'any' type.\n어노테이션  let n: number = \"hello\"  TS2322  Type 'string' is not assignable to type 'number'.\n함수   f(1) (인자 부족)  TS2554  Expected 2 arguments, but got 1.\n객체 타입  obj.last (선택 속성)  TS18048 'obj.last' is possibly 'undefined'.\n유니온  id.toUpperCase()  TS2339  Property 'toUpperCase' does not exist on type 'string | number'.\n타입 별칭 / 인터페이스  중복 인터페이스 vs 별칭  TS2300  Duplicate identifier 'Alias'.\n타입 단언  \"x\" as number    TS2352  Conversion of type 'string' to type 'number' may be a mistake…\n리터럴  go(c1.kind)      TS2345  Argument of type 'string' is not assignable to parameter of type '\"left\"\n                               | \"right\"'.\nnull/undefined  el.focus()       TS18047 'el' is possibly 'null'.\n열거형  const d: Dir = 5  TS2322  Type '5' is not assignable to type 'Dir'.\n덜 쓰는 원시  unique symbol 을 let 에  TS1332  A variable whose type is a 'unique symbol' type must\n                                           be 'const'.",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "원시 타입 절부터 순서대로 열네 시트입니다. 이 장이 끝나면 좁히기로 이어집니다 — 유니온 절에서 '`typeof`로 확인하면 좁혀진다'고만 했던 것을 좁히기가 통째로 다룹니다.",
      },
    ],
    sources: [
      { label: "Everyday Types", href: `${DOCS}/handbook/2/everyday-types.html` },
      { label: "Do's and Don'ts — General Types", href: `${DOCS}/handbook/declaration-files/do-s-and-don-ts.html` },
    ],
  },
  {
    id: "ts-ev-primitives",
    name: "원시 타입: string, number, boolean",
    tagline: "일상적인 타입 1절",
    intro:
      "자바스크립트에서 가장 많이 쓰는 원시 값에 짝이 되는 타입과, 쓰지 말아야 할 대문자 타입을 정리합니다.",
    blocks: [
      {
        label: "자바스크립트 원시 값마다 짝이 되는 타입이 있다",
        body: "자바스크립트에서 가장 많이 쓰는 원시 값은 문자열, 숫자, 불리언 세 가지입니다.\n타입스크립트에는 각각에 짝이 되는 타입이 있습니다. 타입 이름은 자바스크립트에서 값에 `typeof`를 썼을 때 나오는 이름과 동일합니다!\n(여기서 `typeof`에 대해 이야기를 하는 것이 아니라, 이미 알고 있는 이름을 그대로 쓴다는 의미입니다.)\n\n- `string`: `\"Hello, world\"` 같은 문자열 값\n- `number`: `42` 같은 숫자 값\n- `boolean`: `true`와 `false` 두 값",
        terms: [
          {
            term: "number",
            body: "자바스크립트 런타임에는 정수 전용 값이 따로 없어서 `int`나 `float`처럼 정수와 실수를 나누지 않고, 일반 숫자는 모두 `number`로 적습니다. 아주 큰 정수를 다루는 `bigint`는 이 장의 마지막 절에서 나옵니다.",
          },
        ],
        code: 'typeof "Hello, world"; // "string"  → string\ntypeof 42;             // "number"  → number\ntypeof true;           // "boolean" → boolean',
      },
      {
        label: "대문자 String, Number, Boolean은 래퍼 객체의 타입이다",
        body: "대문자 `String`, `Number`, `Boolean`도 문법상 쓸 수 있지만, 코드에 나올 일이 거의 없는 특별한 내장 타입을 가리킵니다. 원시 값이 아니라 `new String(\"a\")` 같은 래퍼 객체의 타입입니다. 래퍼 객체는 `typeof`가 `\"object\"`이고, 같은 글자여도 `===`로 같지 않으며, `new Boolean(false)`도 객체라서 참이 됩니다. 이런 이유로 소문자 `string`을 요구하는 자리에 넘길 수도 없습니다. 그래서 타입은 항상 소문자로 씁니다. 반면 `new` 없이 `String(123)`처럼 함수로 부르는 것은 원시 값으로 바꾸는 형 변환이라 흔하게 씁니다.",
        terms: [
          {
            term: "래퍼 객체 (wrapper object)",
            body: "원시 값을 감싸는(wrap) 객체. 원시 값은 객체가 아닌데도 `\"hi\".toUpperCase()`처럼 메서드를 부를 수 있는 건, 자바스크립트가 그 순간 잠깐 `String` 객체로 감쌌다가 메서드를 부르고 버리기 때문입니다. 타입스크립트의 대문자 `String`은 그 객체의 모양을 적어 둔 인터페이스입니다.",
          },
        ],
        code: '// 1. 보이지 않게 — 메서드를 부를 때 잠깐 감쌌다가 버린다\n"minyeop".toUpperCase();          // "MINYEOP"\n\n// 2. new 없이 — 원시 값으로 바꾸는 함수 (정상, 흔함)\nString(123);                      // "123"\ntypeof String(123);               // "string"\n\n// 3. new 붙여서 — 래퍼 객체를 직접 만든다 (쓰지 말 것)\ntypeof new String("hello");       // "object"\nnew String("a") === "a";          // false\nif (new Boolean(false)) {}        // 객체라 참 → 실행된다\n\n// 4. 타입스크립트의 대문자 타입 — string 자리에 넘길 수 없다\nfunction shout(text: string) {\n  return text.toUpperCase();\n}\nconst s: String = "hi";\nshout(s);\n// \'String\' 형식의 인수는 \'string\' 형식의 매개 변수에 할당될 수 없습니다.\n// \'string\'은(는) 기본 개체이지만 \'String\'은(는) 래퍼 개체입니다. 가능한 경우 \'string\'을(를) 사용하세요.',
      },
    ],
    sources: [
      { label: "Everyday Types — 원시 타입: string, number, boolean", href: `${DOCS}/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean` },
    ],
  },

  {
    id: "ts-ev-arrays",
    name: "배열",
    tagline: "일상적인 타입 2절",
    intro:
      "배열의 타입을 적는 두 가지 방법과, 모양이 비슷하지만 전혀 다른 튜플을 정리합니다.",
    blocks: [
      {
        label: "배열은 타입 뒤에 [ ]를 붙인다",
        body: "`[]`가 배열이라는 표시이고, 앞에 오는 타입이 원소의 타입입니다.\n`number[]`는 숫자 배열, `string[]`은 문자열 배열입니다. 예를 들어 `[1, 2, 3]` 같은 배열의 타입은 `number[]` 이고, `['a', 'b', 'c']` 는 `string[]` 입니다.\n문서가 이 문법은 모든 타입에 쓸 수 있다고 말하는 것도 같은 뜻으로, `[]` 앞에는 원시 타입뿐 아니라 객체 타입이나 유니온도 올 수 있습니다.",
        code: "number[]              // 숫자 배열\nstring[]              // 문자열 배열\nboolean[]             // 불리언 배열\n{ name: string }[]    // 객체 배열\n(string | number)[]   // 문자열 또는 숫자가 섞인 배열 (유니온은 괄호로 묶는다)",
      },
      {
        label: "Array<number>도 같은 뜻이다",
        body: "`number[]`는 `Array<number>`로도 쓸 수 있고, 둘은 완전히 같은 타입입니다. 꺾쇠(`< >`) 안에 원소 타입을 넣는 이 문법이 제네릭이고, 자세한 내용은 뒤에 나오는 제네릭 장에서 다룹니다.",
        terms: [
          {
            term: "제네릭 (generic)",
            body: "타입을 매개변수로 받는 타입입니다. 함수가 값을 인자로 받듯, `Array`는 원소 타입을 인자로 받습니다. `Array<T>`의 `T` 자리에 `number`를 넣으면 숫자 배열, `string`을 넣으면 문자열 배열이 됩니다. 배열 하나를 원소 타입마다 따로 정의하지 않아도 되는 이유입니다.",
          },
        ],
        code: "const a: number[] = [1, 2, 3];\nconst b: Array<number> = [1, 2, 3]; // a와 같은 타입\n\nconst c: string[] = ['a', 'b', 'c'];\nconst d: Array<string> = ['a', 'b', 'c']; // c와 같은 타입",
      },
      {
        label: "[number]는 배열이 아니라 튜플이다",
        body: "대괄호 안에 타입을 넣은 `[number]`는 전혀 다른 의미입니다. 길이와 자리마다의 타입이 정해진 튜플이고, 자세한 내용은 객체 타입 장의 튜플 절을 참고하라고 문서가 따로 짚어 둡니다.",
        code: "const list: number[] = [1, 2, 3]; // 숫자가 몇 개든 된다\nconst one: [number] = [1];         // 숫자 딱 하나\nconst pair: [string, number] = [\"age\", 20]; // 첫 자리는 문자열, 둘째 자리는 숫자\n\nconst wrong: [number] = [1, 2];\n// '[number, number]' 형식은 '[number]' 형식에 할당할 수 없습니다.\n// 소스에 2개 요소가 있지만, 대상에서 1개만 허용합니다.",
      },
    ],
    sources: [
      { label: "Everyday Types — 배열", href: `${DOCS}/handbook/2/everyday-types.html#arrays` },
    ],
  },

  {
    id: "ts-ev-any",
    name: "any",
    tagline: "일상적인 타입 3절",
    intro:
      "타입 검사를 끄는 any와, 조용히 생긴 any를 잡아 주는 noImplicitAny를 정리합니다.",
    blocks: [
      {
        label: "any는 그 값의 타입 검사를 끈다",
        body: "`any`는 특정 값 때문에 타입 검사 에러가 나지 않게 할 때 쓰는 타입입니다.\n값의 타입이 `any`이면\n1. 아무 속성에나 접근하고,\n2. 함수처럼 호출하고,\n3. 아무 타입과 서로 대입하는 등\n문법만 맞으면 거의 모든 것을 할 수 있습니다. 이때 꺼낸 속성도 다시 `any`가 되어, 검사가 꺼진 상태가 꺼내 쓰는 곳으로 계속 번집니다.\n단순한 코드 한 줄을 위해 긴 타입을 적어야 하는 상황이라면, `any` 타입은 상당히 유용합니다. 하지만 이는 타입스크립트보다 내가 상황을 더 잘 알아 타입을 무시해도 된다는 의미입니다. 만약 틀린 코드에 `any`를 사용했다면, 컴파일은 통과하고 런타임 단계에서 문제가 발생합니다.",
        code: "let obj: any = { x: 0 };\n// 아래 어느 줄도 컴파일 에러가 나지 않는다.\n// any 를 쓰면 그 뒤의 타입 검사가 모두 꺼지고,\n// 타입스크립트보다 내가 환경을 더 잘 안다고 가정한다.\nobj.foo();             // 없는 메서드 호출 → 실행하면 터진다\nobj();                 // 객체를 함수처럼 호출 → 실행하면 터진다\nobj.bar = 100;         // 없는 속성에 대입\nobj = \"hello\";         // 객체였는데 문자열 대입\nconst n: number = obj; // 문자열인데 number 변수에 대입",
      },
      {
        label: "noImplicitAny: 조용히 생긴 any를 에러로 잡는다",
        body: "타입을 적지 않았고 문맥에서 추론할 수도 없으면, 컴파일러는 대개 조용히 타입을 `any`로 둡니다. `any`는 컴파일 단계의 검사를 하지 않고, 위에서 명시한 문제가 발생할 수 있으니, 이런 경우는 피하는 게 좋습니다.\nTS 에는 `noImplicitAny` 옵션이 있는데, 해당 옵션을 켜면 이렇게 암묵적으로 생긴 `any`를 에러로 표시해 줍니다.",
        code: "function greet(name) {\n  return name.toUpperCase();\n}\n// noImplicitAny 를 켜면:\n// 'name' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다.",
      },
    ],
    sources: [
      { label: "Everyday Types — any", href: `${DOCS}/handbook/2/everyday-types.html#any` },
    ],
  },

  {
    id: "ts-ev-annotations",
    name: "변수의 타입 어노테이션",
    tagline: "일상적인 타입 4절",
    intro:
      "타입 어노테이션이 무엇이고, 변수에는 언제 적고 언제 추론에 맡기는지 정리합니다.",
    blocks: [
      {
        label: "타입 어노테이션이란",
        body: "타입 어노테이션(type annotation)은 이름 뒤에 `: string`처럼 타입을 직접 적어 두는 표시입니다. 이 값은 이 타입이라고 사람이 코드에 적어 두는 것입니다.\n같은 문법을 변수 뒤, 함수의 매개변수 뒤, 함수의 괄호 뒤(반환값)에 붙일 수 있고, 이 절에서는 변수에 붙이는 경우를, 다음 함수 절에서 나머지 두 자리를 봅니다.",
        code: "let myName: string = \"Alice\";          // 변수 뒤 (이 절)\n\nfunction greet(name: string) {}        // 매개변수 뒤 (5절)\n\nfunction getFavoriteNumber(): number { // 괄호 뒤 = 반환값 (5절)\n  return 26;\n}",
      },
      {
        label: "타입은 변수 이름 뒤에 적는다",
        body: "`const`, `var`, `let`으로 변수를 선언할 때, 원하면 타입 어노테이션을 붙여 변수의 타입을 직접 정할 수 있습니다. 필수가 아니라 선택입니다.\nC나 Java의 `int x = 0;` 처럼 타입을 앞에 적지 않고, 타입스크립트는 항상 이름 뒤에 콜론(`:`)을 붙여 적습니다.",
        code: "int x = 0;               // C, Java: 타입이 앞\n\nlet x: number = 0;       // TypeScript: 타입이 뒤\nlet myName: string = \"Alice\";",
      },
      {
        label: "대부분은 적지 않아도 추론된다",
        body: "하지만 대부분은 타입을 적을 필요가 없습니다. 타입스크립트는 가능한 곳에서 타입을 자동으로 추론하고, 변수라면 초기값의 타입을 보고 정합니다.\n이때 사용되는 추론 규칙을 따로 외울 필요는 없고, 처음이라면 생각보다 적게 타입을 적어 봐도 됩니다.\n반대로 타입을 직접 적으면 적은 타입이 우선하고, 추론으로 알 수 있던 정확한 정보는 사용되지 않습니다. 이 차이는 뒤의 리터럴 타입 절에서 다시 나옵니다.",
        code: "let myName = \"Alice\";   // 적지 않아도 string 으로 추론된다\nlet age = 20;            // number\n\nconst a = \"GET\";              // \"GET\" (값 그대로)\nconst b: string = \"GET\";      // string (적은 타입이 우선)",
      },
    ],
    sources: [
      { label: "Everyday Types — 변수의 타입 어노테이션", href: `${DOCS}/handbook/2/everyday-types.html#type-annotations-on-variables` },
    ],
  },

  {
    id: "ts-ev-functions",
    name: "함수",
    tagline: "일상적인 타입 5절",
    intro:
      "함수의 매개변수와 반환값에 타입을 붙이는 법, 비동기 함수의 반환 타입, 익명 함수의 문맥적 타이핑을 정리합니다.",
    blocks: [
      {
        label: "함수는 입력과 출력의 타입을 정할 수 있다",
        body: "함수는 자바스크립트에서 데이터를 주고받는 주된 수단입니다. 타입스크립트에서는 함수의 입력값(매개변수)과 출력값(반환값) 둘 다 타입을 정할 수 있습니다.\n4절에서 본 타입 어노테이션을 함수에서는 매개변수 뒤와 괄호 뒤(반환값)에 붙입니다.",
      },
      {
        label: "매개변수 타입 어노테이션 (Parameter Type Annotations)",
        body: "함수를 선언할 때 매개변수마다 이름 뒤에 타입을 붙여, 이 함수가 어떤 타입을 받는지 선언할 수 있습니다. 변수의 타입 어노테이션과 같은 자리입니다.\n매개변수에 타입이 있으면 그 함수에 넘기는 인자가 검사됩니다. 실행하면 런타임 에러가 났을 코드를 실행 전에 컴파일에서 잡아 주는 것입니다.\n매개변수에 타입을 적지 않아도, 인자 개수가 맞는지는 검사합니다.",
        code: "function greet(name: string) {\n  console.log(\"Hello, \" + name.toUpperCase() + \"!!\");\n}\n\ngreet(42); // 실행했다면 42.toUpperCase() 에서 터졌을 코드\n// 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.\n\nfunction add(a, b) {\n  return a + b;\n}\nadd(1); // 타입이 없어도 개수는 검사한다\n// 2개의 인수가 필요한데 1개를 가져왔습니다.",
      },
      {
        label: "반환 타입 어노테이션 (Return Type Annotations)",
        body: "반환값에도 타입 어노테이션을 붙일 수 있습니다. 매개변수 목록을 닫는 괄호 `)` 바로 뒤에 `: number`처럼 붙입니다.\n변수와 마찬가지로 보통은 필요 없습니다. `return` 문을 보고 반환 타입을 추론하기 때문에, 아래 예제의 `: number`도 있으나 없으나 결과가 같습니다.\n그래도 반환 타입을 일부러 적는 코드베이스가 있습니다. 함수 본문을 읽지 않아도 무엇을 돌려주는지 보이게 하는 문서 역할, 본문을 고치다 반환 타입이 실수로 바뀌는 것을 막는 역할, 그리고 개인 취향 때문입니다.",
        code: "function getFavoriteNumber(): number {\n  return 26;\n}\n\n// 반환 타입을 적어 두면 실수로 바뀌는 것을 막는다\nfunction getPrice(): number {\n  return \"1000\";\n  // 'string' 형식은 'number' 형식에 할당할 수 없습니다.\n}",
      },
      {
        label: "비동기 함수의 반환 타입 어노테이션: Promise<T>",
        body: "동기 함수의 경우 반환 타입 어노테이션에 결과값의 타입을 그대로 적으면 됩니다. 하지만 비동기로 함수의 결과값이 들어오는 경우에는, 함수가 결과값을 바로 돌려주지 못하고 나중에 들어오기 때문에 반환 타입을 결과값의 타입(`number`)으로 적으면 실제와 달라지는 문제가 발생합니다.\n그렇다면 비동기는 어떤 방식으로 반환 타입을 명시할까요? 그 방법으로는 `Promise`를 사용하는 것입니다. `Promise` 는 비동기의 응답을 예약하는 객체입니다. 함수는 결과값이 아직 들어오지 않았을 때 결과값 대신 `Promise`를 먼저 돌려주고, 반환 타입은 `Promise`로 지정합니다.\n그렇다면 응답이 돌아왔을 경우, `Promise`는 어떻게 될까요? 응답이 돌아오면 `Promise` 앞에 `await`를 붙이거나 `.then`을 이어 붙여 `Promise`를 벗기고 안에 든 결과값을 꺼냅니다. `Promise<number>`라면 꺼낸 값은 `number`입니다.\n비동기의 대표적인 `async` 함수를 예로 들어보겠습니다. `async` 함수는 `return 26`라고 작성하면 실제로는 `Promise` 를 돌려줍니다. 즉, 반환 타입은 `number` 가 아니라 `Promise<number>` 입니다. `< >` 는 이전에 본 제네릭입니다. 아까 `Array<number>` 가 숫자를 담은 배열이었죠? 이것처럼, `Promise<number>`는 숫자를 불러올 `Promise` 라는 의미입니다.",
        terms: [
          {
            term: "async",
            body: "객체가 아니라 함수 앞에 붙이는 키워드입니다. `async`를 붙인 함수는 `return`한 값을 그대로 돌려주지 않고 `Promise`로 감싸서 돌려줍니다. 감싸는 쪽이 `async`이고, 감싸서 나온 결과물이 `Promise`입니다.",
          },
        ],
        code: "async function getFavoriteNumber(): Promise<number> {\n  return 26;\n}\n\nasync function main() {\n  const p = getFavoriteNumber();        // Promise<number> — 아직 약속\n  const n = await getFavoriteNumber();  // number — await 로 벗긴 값\n\n  getFavoriteNumber().then((value) => {\n    value;                              // number — then 으로 벗긴 값\n  });\n}\n\n// 실행 순서 차이\nasync function withAwait() {\n  console.log(1);\n  await getFavoriteNumber();         // 여기서 멈춘다\n  console.log(2);                    // 출력: 1 → 2\n}\n\nfunction withThen() {\n  console.log(1);\n  getFavoriteNumber().then(() => console.log(2)); // 예약만 한다\n  console.log(3);                    // 출력: 1 → 3 → 2\n}",
        notes: [
          {
            title: "then과 await는 무엇이 다른가",
            body: "꺼내는 값은 둘 다 같습니다. 차이는 기다리는 방식과 값을 쓸 수 있는 자리입니다.\n- `await`: 결과가 올 때까지 그 줄에서 멈췄다가, 값을 변수에 받아 다음 줄부터 이어 씁니다. `async` 함수 안에서만 쓸 수 있고, 에러는 `try` / `catch`로 잡습니다.\n- `.then`: 멈추지 않고, 결과가 오면 실행할 함수를 예약만 한 뒤 바로 다음 코드로 넘어갑니다. 값은 예약한 함수 안에서만 쓸 수 있고, 에러는 `.catch`로 잡습니다.\n`await`는 `.then`으로 하던 일을 위에서 아래로 읽히게 적는 문법이라, 같은 `Promise`를 벗기고 같은 타입의 값을 꺼냅니다.",
          },
        ],
      },
      {
        label: "익명 함수 (Anonymous Functions)",
        body: "익명 함수는 함수 선언과 조금 다릅니다. 어떻게 호출될지 타입스크립트가 알 수 있는 자리에 함수가 놓이면, 그 함수의 매개변수에 자동으로 타입이 붙습니다.\n아래에서 `s`에 타입을 적지 않았는데도, `names`가 `string[]`으로 추론되고 `string[]`의 `forEach`는 원소(`string`)를 하나씩 받는 함수를 인자로 받으므로 `s`는 `string`이 됩니다.\n이 과정을 문맥적 타이핑이라고 합니다. 어떻게 일어나는지 외울 필요는 없지만, 이런 일이 일어난다는 것을 알면 타입 어노테이션이 필요 없는 자리를 알아보는 데 도움이 됩니다. 값이 놓인 문맥이 그 값의 타입에 영향을 주는 예는 뒤에서 더 나옵니다.",
        terms: [
          {
            term: "문맥적 타이핑 (contextual typing)",
            body: "함수가 놓인 문맥(자리)이 그 함수가 어떤 타입이어야 하는지 알려 주는 것입니다. 앞 절에서 말한 문맥에서 추론한다는 것이 바로 이것입니다.",
          },
        ],
        code: "const names = [\"Alice\", \"Bob\", \"Eve\"]; // string[]\n\n// 함수의 문맥적 타이핑 — 매개변수 s 가 string 으로 추론된다\nnames.forEach(function (s) {\n  console.log(s.toUpperCase());\n});\n\n// 화살표 함수에도 똑같이 적용된다\nnames.forEach((s) => {\n  console.log(s.toUpperCase());\n});",
      },
    ],
    sources: [
      { label: "Everyday Types — 함수", href: `${DOCS}/handbook/2/everyday-types.html#functions` },
    ],
  },

  {
    id: "ts-ev-objects",
    name: "객체 타입",
    tagline: "일상적인 타입 6절",
    intro:
      "속성과 타입을 나열해 객체의 모양을 적는 법과, 있어도 되고 없어도 되는 선택적 속성을 정리합니다.",
    blocks: [
      {
        label: "객체 타입은 속성과 그 타입을 나열한다",
        body: "원시 타입 다음으로 가장 일반적으로 볼 수 있는 타입은 객체 타입입니다. 속성을 가진 자바스크립트 값을 말하는데, 대부분의 값들을 의미합니다.\n객체 타입을 정의할 때는 속성과 그 타입을 나열하면 됩니다. 아래에 매개변수 타입 어노테이션이 있는데, 확인을 하면 다음과 같습니다. `string` 대신 객체 모양 형태인 `{ x: number; y: number }` 형태로 적었습니다. 이때 `pt` 는 `x`와 `y`를 가지고 둘 다 `number` 타입인 객체라는 뜻입니다.\n속성과 속성 사이는 `,` 혹은 `;` 중 원하는 걸 사용하면 되고, 마지막 구분자는 있어도, 없어도 됩니다. 이때 각 속성의 타입을 생략할 수 있는데, 타입을 생략하면 `any` 로 간주합니다.",
        terms: [
          {
            term: "구분자 (separator)",
            body: "속성과 속성 사이를 나누는 `,`나 `;`를 구분자라고 하고, 마지막 구분자는 `{ x: number; y: number; }`의 끝 `;`처럼 마지막 속성 뒤에 붙는 것을 말합니다.",
          },
        ],
        code: "// 매개변수의 타입 어노테이션이 객체 타입이다\nfunction printCoord(pt: { x: number; y: number }) {\n  console.log(\"The coordinate's x value is \" + pt.x);\n  console.log(\"The coordinate's y value is \" + pt.y);\n}\nprintCoord({ x: 3, y: 7 });\n\n{ x: number; y: number }    // ; 로 구분\n{ x: number, y: number }    // , 로 구분해도 된다\n{ x: number; y: number; }   // 마지막 구분자가 있어도 된다\n\nfunction loose(pt: { x; y }) {}\n// 타입을 생략하면 any — noImplicitAny 를 켜면:\n// 'x' 멤버에는 암시적으로 'any' 형식이 포함됩니다.",
        notes: [
          {
            title: "원시 타입과 객체 타입은 무엇이 다른가",
            body: "값이 한 덩어리냐, 속성을 여러 개 가진 묶음이냐의 차이입니다.\n- 원시 타입: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`가 여기 속합니다. 값 하나이고, 이름(`string`)으로 적습니다. 바꿀 수 없고, `===`는 값이 같으면 같습니다. 복사하면 값이 복사됩니다.\n- 객체 타입: 객체, 배열, 함수, `Date` 등 나머지 전부입니다. 속성을 모은 묶음이고, 모양(`{ x: number }`)으로 적습니다. 속성을 바꿀 수 있고, `===`는 같은 객체(주소)여야 같습니다. 복사하면 주소가 복사되어 같은 객체를 함께 가리킵니다.\n그래서 `{ x: 1 } === { x: 1 }`은 모양이 같아도 `false`이고, `const b = a` 뒤에 `b.x`를 바꾸면 `a.x`도 바뀌어 보입니다. 원시 값인데 `\"hi\".toUpperCase()`처럼 메서드를 쓸 수 있는 것은 1절의 래퍼 객체로 잠깐 감싸기 때문입니다. 배열(`number[]`)과 함수도 자주 쓰여서 전용 표기가 있을 뿐, 넓게 보면 객체 타입입니다.",
          },
        ],
      },
      {
        label: "선택적 속성 (Optional Properties)",
        body: "객체 타입의 속성 일부나 전부를 선택적, 즉 있어도 되고 없어도 되는 속성으로 지정할 수 있습니다. 속성 이름 뒤에 `?`를 붙입니다. 아래에서 `first`는 반드시 있어야 하고 `last`는 없어도 됩니다.\n자바스크립트에서는 없는 속성에 접근해도 런타임 에러가 나지 않고 `undefined`가 나옵니다. 즉, 설정한 타입으로 반환되는 것이 아니라, `undefined`로 나온다는 의미입니다. 그래서 선택적 속성을 읽을 때는 쓰기 전에 `undefined`인지 확인해야 합니다. `last?: string`은 사실상 `string | undefined`라서, 바로 `obj.last.toUpperCase()`를 부르면 컴파일에서 막습니다.\n확인하는 방법은 두 가지입니다. `if`로 `undefined`가 아니라고 확인하면 그 안에서는 `string`으로 좁혀지고(다음 장의 좁히기), 옵셔널 체이닝 `?.`을 쓰면 값이 `undefined`일 때 멈추고 `undefined`를 돌려줍니다.",
        code: "function printName(obj: { first: string; last?: string }) {\n  // ...\n}\n// 둘 다 OK\nprintName({ first: \"Bob\" });\nprintName({ first: \"Alice\", last: \"Alisson\" });\n\nfunction printLast(obj: { first: string; last?: string }) {\n  // 에러 — obj.last 를 안 넘겼다면 터질 수 있다\n  console.log(obj.last.toUpperCase());\n  // 'obj.last'은(는) 'undefined'일 수 있습니다.\n\n  if (obj.last !== undefined) {\n    // OK — 여기서는 string 으로 좁혀진다\n    console.log(obj.last.toUpperCase());\n  }\n\n  // 옵셔널 체이닝으로 안전하게\n  console.log(obj.last?.toUpperCase());\n}",
        notes: [
          {
            title: "왜 컴파일에서 막나",
            body: "`last?: string`을 읽으면 값은 `string`일 수도, `undefined`일 수도 있습니다. 타입스크립트는 이 두 경우를 모두 따져 봅니다.\n- `string`이라면 `toUpperCase()`가 있으니 괜찮습니다.\n- `undefined`라면 `toUpperCase()`가 없어서, 실행하는 순간 `TypeError: Cannot read properties of undefined (reading 'toUpperCase')`로 멈춥니다.\n둘 중 하나라도 터질 수 있으면 타입스크립트는 코드를 통과시키지 않습니다. 실행해 봐야 알 수 있는 에러를, 가능한 모든 경우를 미리 따져서 작성하는 시점에 알려 주는 것입니다. 그래서 `if`로 `undefined`가 아니라고 확인하거나 `?.`를 쓰면, 남는 경우가 `string`뿐이거나 멈추는 길이 생겨서 에러가 사라집니다.",
          },
        ],
      },
    ],
    sources: [
      { label: "Everyday Types — 객체 타입", href: `${DOCS}/handbook/2/everyday-types.html#object-types` },
    ],
  },

  {
    id: "ts-ev-unions",
    name: "유니온 타입",
    tagline: "일상적인 타입 7절",
    intro:
      "여러 타입 중 하나일 수 있는 값을 적는 유니온 타입과, 그 값을 좁혀서 쓰는 법을 정리합니다.",
    blocks: [
      {
        label: "타입을 조합하기 시작한다",
        body: "지금까지는 `string`, `number[]`, 함수, 객체처럼 타입 하나를 적는 법을 봤습니다. 타입스크립트의 타입 시스템은 다양한 연산자로 기존 타입에서 새 타입을 만들 수 있게 해 주는데, 이제 이 타입들을 조합하기 시작합니다. 그 첫 방법이 유니온 타입입니다.\n6절 선택적 속성을 읽을 때 `last?: string`이 `string | undefined`가 됐던 것처럼, 값이 여러 타입 중 하나일 수 있는 경우를 정식으로 다루는 것이 유니온 타입입니다.",
        notes: [
          {
            title: "?와 string | undefined는 완전히 같지 않다",
            body: "읽을 때 타입은 둘 다 `string | undefined`입니다. 하지만 `last?: string`은 속성을 빠뜨리는 것까지 허락하고, `last: string | undefined`는 속성은 반드시 있어야 하며 값으로 `undefined`를 넣을 수 있다는 뜻입니다.",
          },
        ],
        code: "const a: { last?: string } = {};             // OK — 속성을 빠뜨려도 된다\nconst b: { last: string | undefined } = {};  // 에러 — 속성은 있어야 한다\n// 'last' 속성이 '{}' 형식에 없지만 '{ last: string | undefined; }' 형식에서 필수입니다.",
      },
      {
        label: "유니온 타입 정의하기 (Defining a Union Type)",
        body: "유니온 타입은 두 개 이상의 타입으로 만든 타입이고, 값이 그 타입들 중 아무거나 하나일 수 있다는 뜻입니다. 조합에 들어간 각 타입을 유니온의 멤버라고 부릅니다.\n기호는 `|`이고 \"또는\"으로 읽으면 됩니다. `number | string`은 숫자 또는 문자열이고, 멤버는 `number`와 `string`입니다. 그래서 아래 `printId`는 숫자도 문자열도 받지만, 두 멤버 어디에도 맞지 않는 객체는 받지 않습니다.\n멤버 사이의 구분자 `|`는 첫 멤버 앞에도 쓸 수 있어서, 멤버가 많아 줄을 나눌 때 보기 좋게 맞출 수 있습니다.",
        code: "function printId(id: number | string) {\n  console.log(\"Your ID is: \" + id);\n}\nprintId(101);             // OK — number\nprintId(\"202\");           // OK — string\nprintId({ myID: 22342 }); // 에러\n// '{ myID: number; }' 형식의 인수는 'string | number' 형식의 매개 변수에 할당될 수 없습니다.\n\n// 첫 멤버 앞에도 | 를 쓸 수 있다\nfunction printTextOrNumberOrBool(\n  textOrNumberOrBool:\n    | string\n    | number\n    | boolean\n) {\n  console.log(textOrNumberOrBool);\n}",
      },
      {
        label: "유니온 타입 다루기 (Working with Union Types)",
        body: "유니온 타입에 맞는 값을 넘기기는 쉽습니다. 멤버 중 아무거나에 맞는 값을 넘기면 됩니다. 까다로운 건 유니온 타입의 값을 받아서 쓸 때입니다.\n타입스크립트는 유니온의 모든 멤버에서 가능한 동작만 허용합니다. `string | number`에서는 `string`에만 있는 `toUpperCase()`를 쓸 수 없는데, `id`가 `number`일 때 실행하면 터질 수 있기 때문입니다. 6절 선택적 속성에서 막혔던 것과 같은 원리입니다.\n해결책은 타입 어노테이션이 없는 자바스크립트에서 하던 것과 똑같이, 코드로 유니온을 좁히는 것입니다. `typeof id === \"string\"`처럼 확인하면 그 분기 안에서는 `string`만 남고, `else`에서는 따로 하지 않아도 남은 멤버인 `number`로 좁혀집니다. 배열은 `typeof`가 `\"object\"`라 구분할 수 없어서 `Array.isArray`로 확인합니다. 이때도 `else`에서는 따로 할 것이 없습니다. `x`가 `string[]`이 아니었다면 `string`일 수밖에 없으니까요.",
        terms: [
          {
            term: "좁히기 (narrowing)",
            body: "코드의 구조를 보고 타입스크립트가 값의 타입을 더 구체적으로 알아내는 것입니다. `if`로 확인한 분기 안에서는 확인한 타입만 남습니다. 핸드북의 다음 장이 통째로 이 내용입니다.",
          },
        ],
        code: "function printId(id: number | string) {\n  console.log(id.toUpperCase());\n  // 'string | number' 형식에 'toUpperCase' 속성이 없습니다.\n  //   'number' 형식에 'toUpperCase' 속성이 없습니다.\n}\n\n// typeof 로 좁히기\nfunction printId2(id: number | string) {\n  if (typeof id === \"string\") {\n    console.log(id.toUpperCase()); // 여기서 id 는 string\n  } else {\n    console.log(id);               // 여기서 id 는 number\n  }\n}\n\n// Array.isArray 로 좁히기\nfunction welcomePeople(x: string[] | string) {\n  if (Array.isArray(x)) {\n    console.log(\"Hello, \" + x.join(\" and \")); // x 는 string[]\n  } else {\n    console.log(\"Welcome lone traveler \" + x); // x 는 string\n  }\n}",
      },
      {
        label: "모든 멤버에 공통으로 있으면 좁히지 않고 쓴다",
        body: "유니온의 모든 멤버에 공통으로 있는 속성은 좁히지 않고 바로 쓸 수 있습니다. 배열과 문자열은 둘 다 `slice` 메서드가 있어서, `number[] | string`에서도 `x.slice(0, 3)`을 부를 수 있고 반환 타입은 `number[] | string`으로 추론됩니다.",
        terms: [
          {
            term: "slice",
            body: "배열과 문자열에 모두 있는 메서드로, 원본에서 일부를 잘라 새로 돌려줍니다. `slice(시작, 끝)`은 시작 위치부터 끝 위치 바로 앞까지를 잘라내고, 끝은 포함하지 않습니다. 원본은 바뀌지 않습니다.\n- 배열: `[1, 2, 3, 4].slice(0, 3)`은 `[1, 2, 3]`\n- 문자열: `\"hello\".slice(0, 3)`은 `\"hel\"`\n끝을 생략하면 마지막까지 자르고(`\"hello\".slice(1)`은 `\"ello\"`), 음수를 쓰면 뒤에서부터 셉니다(`[1, 2, 3, 4].slice(-2)`는 `[3, 4]`). 배열에서 부르면 배열을, 문자열에서 부르면 문자열을 돌려주기 때문에 `getFirstThree`의 반환 타입이 `number[] | string`이 됩니다.",
          },
        ],
        notes: [
          {
            title: "합집합인데 왜 교집합만 쓸 수 있나",
            bottom: true,
            body: "타입들의 합집합이 마치 그 타입들의 교집합 속성들을 가지는 것처럼 보이는 것이 혼란스러울 수 있습니다. 하지만 이는 우연이 아닙니다. '합집합(union)'이라는 이름은 타입 이론에서 유래했습니다. 합집합 `number | string`은 각 타입의 값들을 모두 더한 것입니다. 두 집합과 각 집합에 대해 아는 사실들이 주어졌을 때, 두 집합을 합친 집합에는 그 사실들의 교집합만 해당한다는 점에 유의하십시오. 예를 들어, 모자를 쓴 키 큰 사람들이 있는 방과 모자를 쓴 스페인어 사용자들이 있는 방이 있다고 가정해 봅시다. 이 두 방을 합치면, 모든 사람에 대해 우리가 알 수 있는 유일한 사실은 그들이 모자를 쓰고 있다는 것뿐입니다.\n그래서 `number | string`에서는 숫자도 문자열도 들어올 수 있고(값의 합집합), 확실히 쓸 수 있는 동작은 둘 다 가진 것뿐입니다(속성의 교집합).",
          },
        ],
        code: "// 반환 타입은 number[] | string 으로 추론된다\nfunction getFirstThree(x: number[] | string) {\n  return x.slice(0, 3);\n}",
      },
    ],
    sources: [
      { label: "Everyday Types — 유니온 타입", href: `${DOCS}/handbook/2/everyday-types.html#union-types` },
    ],
  },

  {
    id: "ts-ev-aliases",
    name: "타입 별칭",
    tagline: "일상적인 타입 8절",
    intro:
      "같은 타입을 여러 번 적지 않도록 타입에 이름을 붙이는 타입 별칭을 정리합니다.",
    blocks: [
      {
        label: "타입 별칭은 타입에 붙이는 이름이다",
        body: "지금까지는 객체 타입과 유니온 타입을 타입 어노테이션에 직접 적어 썼습니다. 편하긴 하지만, 같은 타입을 여러 곳에서 여러번 사용하는 경우가 있습니다. 같은 모양을 여러 곳에 적어 두면, 모양이 바뀔 때 모든 곳을 고쳐야 하고 하나라도 빠뜨리면 서로 어긋나는 문제가 생깁니다.\n타입 별칭은 말 그대로 어떤 타입에든 붙이는 이름입니다. `type 이름 = 타입;` 모양으로, 변수에 값을 담는 것처럼 타입에 이름을 붙여 둡니다. 아래 `printCoord(pt: Point)`는 6절의 `printCoord(pt: { x: number; y: number })`와 동일한 뜻이고, 긴 모양 대신 `Point`라는 이름을 썼다는 차이점만 존재합니다. 즉, 이름만 다를 뿐입니다.",
        notes: [
          {
            title: "타입 어노테이션과 타입 별칭은 무엇이 다른가",
            body: "둘 다 타입을 적는 문법이지만 하는 일이 다릅니다.\n- 타입 어노테이션: 값(변수, 매개변수, 반환값)에 \"이 값은 이 타입\"이라고 붙이는 자리입니다. 이름 뒤의 `: 타입` 부분입니다.\n- 타입 별칭: 타입 자체에 이름을 만들어 두는 선언입니다. `type Point = { ... }`처럼 따로 한 줄로 적습니다.\n그래서 둘은 함께 쓰입니다. 타입 별칭으로 이름을 만들어 두고, 타입 어노테이션 자리에 그 이름을 적습니다. `pt: Point`에서 `: Point`는 타입 어노테이션이고, `Point`는 타입 별칭입니다.",
          },
        ],
        code: "// 기존: 타입 어노테이션에 모양을 직접 적는다 — 같은 모양이 반복된다\nfunction printCoord(pt: { x: number; y: number }) {}\nfunction moveCoord(pt: { x: number; y: number }) {}\n\n// 타입 별칭: 모양에 이름을 한 번 붙이고, 어노테이션에는 이름을 적는다\ntype Point = {\n  x: number;\n  y: number;\n};\n\nfunction printCoord2(pt: Point) {\n  console.log(\"The coordinate's x value is \" + pt.x);\n  console.log(\"The coordinate's y value is \" + pt.y);\n}\nfunction moveCoord2(pt: Point) {}\n\nprintCoord2({ x: 100, y: 100 });",
      },
      {
        label: "객체 말고 어떤 타입에도 붙일 수 있다",
        body: "타입 별칭은 객체 타입뿐 아니라 어떤 타입에도 이름을 붙일 수 있습니다. 예를 들어 7절의 유니온 타입 `number | string`에 `ID`라는 이름을 붙이면, `printId(id: number | string)`를 `printId(id: ID)`로 쓸 수 있습니다.",
        code: "type ID = number | string;\n\nfunction printId(id: ID) {\n  console.log(\"Your ID is: \" + id);\n}",
      },
      {
        label: "별칭은 별칭일 뿐, 새 타입이 아니다",
        body: "별칭은 별칭일 뿐입니다. 타입 별칭으로 같은 타입의 서로 다른 \"버전\"을 만들 수는 없고, 별칭을 쓰는 것은 원래 타입을 그 자리에 그대로 적은 것과 똑같습니다.\n예를 들어 `type Won = number`와 `type Dollar = number`로 원화와 달러에 이름을 붙여도, 둘 다 결국 `number`의 별명이라 원화 금액을 달러 변수에 넣어도 에러가 나지 않습니다. 이름으로 구분하고 싶어도, 타입스크립트는 이름이 아니라 원래 타입(`number`)을 보기 때문입니다.\n공식 문서에서는 다음과 같은 예시를 들어 줍니다.\n아래 코드는 정리를 거친 문자열만 담고 싶어서 `UserInputSanitizedString`이라는 이름을 붙였습니다. 그런데 이 이름도 결국 `string`의 별명일 뿐이라, 정리하지 않은 아무 문자열(`\"new input\"`)을 넣어도 에러가 나지 않습니다. 얼핏 보면 틀린 코드 같지만, 두 타입 모두 같은 `string`을 가리키는 이름이라 문제가 없습니다. 결국 이름을 붙여도, 타입스크립트는 이름이 아니라 모양을 봅니다.",
        code: "// 이름은 다르지만 둘 다 number 의 별명이다\ntype Won = number;\ntype Dollar = number;\n\nconst price: Won = 10000;\nconst usd: Dollar = price; // 원화를 달러 변수에 넣어도 에러가 나지 않는다\n\ntype UserInputSanitizedString = string;\n\nfunction sanitizeInput(str: string): UserInputSanitizedString {\n  return sanitize(str);\n}\n\n// 정리된 입력을 만든다\nlet userInput = sanitizeInput(getInput());\n\n// 그래도 그냥 string 을 다시 넣을 수 있다 — 에러 없음\nuserInput = \"new input\";",
      },
    ],
    sources: [
      { label: "Everyday Types — 타입 별칭", href: `${DOCS}/handbook/2/everyday-types.html#type-aliases` },
    ],
  },

  {
    id: "ts-ev-interfaces",
    name: "인터페이스",
    tagline: "일상적인 타입 9절",
    intro:
      "객체 타입에 이름을 붙이는 또 다른 방법인 인터페이스와, 타입 별칭과의 차이를 정리합니다.",
    blocks: [
      {
        label: "인터페이스는 객체 타입에 이름을 붙이는 또 다른 방법이다",
        body: "인터페이스 선언은 객체 타입에 이름을 붙이는 또 다른 방법입니다. `interface 이름 { ... }` 모양으로 적고, 타입 별칭과 달리 `=`를 쓰지 않습니다.\n아래 `printCoord(pt: Point)`는 앞의 타입 별칭 예제처럼, 이름 없는 객체 타입을 직접 적었을 때와 똑같이 동작합니다. 타입스크립트는 `printCoord`에 넘긴 값의 구조만 봅니다. 기대한 속성(`x`, `y`)을 가지고 있는지만 신경 쓰고, 그 값이 `Point`라는 이름으로 만들어졌는지는 보지 않습니다.\n이렇게 이름이 아니라 구조와 할 수 있는 일만 보기 때문에, 타입스크립트를 구조적 타입 시스템이라고 부릅니다.",
        terms: [
          {
            term: "구조적 타입 시스템 (structural type system)",
            body: "타입이 맞는지를 이름이 아니라 모양(가진 속성과 그 타입)으로 판단하는 방식입니다. 앞 절에서 `Won`과 `Dollar`가 서로 섞였던 것도 같은 이유입니다. 반대로 이름이 같아야 같은 타입으로 보는 방식(Java, C# 등)은 명목적 타입 시스템이라고 부릅니다.",
          },
        ],
        code: "interface Point {\n  x: number;\n  y: number;\n}\n\nfunction printCoord(pt: Point) {\n  console.log(\"The coordinate's x value is \" + pt.x);\n  console.log(\"The coordinate's y value is \" + pt.y);\n}\n\n// Point 로 만든 값이 아니어도, x 와 y 가 있으면 된다\nprintCoord({ x: 100, y: 100 });",
      },
      {
        label: "타입 별칭과 인터페이스의 차이",
        body: "문서 원문의 제목은 'Differences Between Type Aliases and Interfaces'입니다. 타입 별칭과 인터페이스는 아주 비슷해서, 대부분의 경우 둘 중 아무거나 골라 써도 됩니다. `interface`의 거의 모든 기능을 `type`으로도 할 수 있습니다.\n**가장 큰 차이는 나중에 속성을 더할 수 있느냐입니다.** **인터페이스는 언제든 다시 열어 속성을 추가할 수 있지만, 타입 별칭은 한 번 만들면 다시 열 수 없습니다.**\n- 확장하기: 인터페이스는 `extends`로, 타입 별칭은 `&`(교차 타입)로 다른 타입의 속성을 이어받습니다.\n- 속성 추가하기: 같은 이름의 인터페이스를 한 번 더 선언하면 두 선언이 합쳐지고, 타입 별칭은 만든 뒤에 바꿀 수 없어서 같은 이름으로 한 번 더 선언하면 에러가 납니다. 문서 예제는 브라우저에 이미 있는 `Window` 인터페이스에 `ts` 속성을 더하는 모습입니다.\n문서도 이 개념들은 뒤 장에서 더 자세히 다루니, 지금 전부 이해하지 못해도 괜찮다고 말합니다.",
        terms: [
          {
            term: "교차 타입 (&)",
            body: "두 타입을 합쳐, 양쪽의 속성을 모두 가진 타입을 만듭니다. `Animal & { honey: boolean }`은 `name`과 `honey`를 모두 가져야 합니다. 유니온(`|`)이 둘 중 하나라면, 교차(`&`)는 둘 다입니다.",
          },
        ],
        code: "// 확장하기 — interface 는 extends\ninterface Animal {\n  name: string;\n}\ninterface Bear extends Animal {\n  honey: boolean;\n}\nconst bear = getBear();\nbear.name;\nbear.honey;\n\n// 확장하기 — type 은 & (교차 타입)\ntype AnimalType = {\n  name: string;\n};\ntype BearType = AnimalType & {\n  honey: boolean;\n};\nconst bearType = getBearType();\nbearType.name;\nbearType.honey;\n\n// 속성 추가하기 — 같은 이름의 interface 는 합쳐진다\ninterface Window {\n  title: string;\n}\ninterface Window {\n  ts: TypeScriptAPI;\n}\nconst src = 'const a = \"Hello World\"';\nwindow.ts.transpileModule(src, {});\n\n// type 은 만든 뒤에 바꿀 수 없다\ntype WindowType = {\n  title: string;\n};\ntype WindowType = {\n  ts: TypeScriptAPI;\n};\n// 'WindowType' 식별자가 중복되었습니다.",
      },
      {
        label: "그 밖의 차이와 고르는 기준",
        body: "문서는 그 밖의 차이도 짧게 짚어 줍니다.\n- 타입스크립트 4.2 이전에는 에러 메시지에 타입 별칭 이름이 나올 수 있었고, 때로는 같은 뜻의 익명 타입 대신 별칭 이름이 나오기도 했습니다(원하는 결과일 수도, 아닐 수도 있습니다). 인터페이스는 에러 메시지에 항상 이름으로 나옵니다.\n- 같은 이름끼리 합쳐지는 선언 병합은 인터페이스만 됩니다.\n- 인터페이스는 객체의 모양만 적을 수 있고, `string` 같은 원시 타입에 다른 이름을 붙일 수는 없습니다. 원시 타입이나 유니온에 이름을 붙이려면 타입 별칭을 씁니다.\n- 인터페이스 이름은 에러 메시지에 항상 원래 이름으로 나오지만, 그 이름으로 썼을 때만입니다.\n- `extends`로 확장한 인터페이스가 `&`로 합친 타입 별칭보다 컴파일러가 더 빠르게 처리하는 경우가 많습니다.\n대부분은 취향대로 골라도 되고, 다른 쪽이 필요하면 타입스크립트가 알려 줍니다. 기준이 필요하다면, 문서는 `type`의 기능이 필요해지기 전까지는 `interface`를 쓰라고 권합니다.",
        code: "// 원시 타입이나 유니온에 이름을 붙이는 건 type 만 된다\ntype Name = string;\ntype ID = number | string;\n\n// interface 는 객체 모양만 적는다\ninterface User {\n  name: Name;\n  id: ID;\n}",
      },
    ],
    sources: [
      { label: "Everyday Types — 인터페이스", href: `${DOCS}/handbook/2/everyday-types.html#interfaces` },
    ],
  },

  {
    id: "ts-ev-assertions",
    name: "타입 단언",
    tagline: "일상적인 타입 10절",
    intro:
      "타입스크립트는 모르지만 내가 아는 타입 정보를 알려 주는 타입 단언과, 그 한계를 정리합니다.",
    blocks: [
      {
        label: "타입 단언은 내가 아는 타입을 알려 주는 것이다",
        body: "가끔은 타입스크립트가 알 수 없는 값의 타입을 내가 알고 있을 때가 있습니다.\n예를 들어 `document.getElementById`를 쓰면 타입스크립트는 어떤 `HTMLElement`가 온다는 것까지만 압니다. 하지만 내 페이지에는 그 아이디로 항상 `HTMLCanvasElement`가 있다는 걸 나는 알고 있죠. 이럴 때 타입 단언(`as`)으로 더 구체적인 타입을 알려 줄 수 있습니다.\n타입 어노테이션처럼 타입 단언도 컴파일할 때 지워지고, 코드의 실행 동작에는 영향을 주지 않습니다. `.tsx` 파일이 아니라면 꺾쇠(`< >`) 문법으로도 같은 뜻을 적을 수 있습니다.",
        notes: [
          {
            title: "단언이 틀려도 실행 중에 알려 주지 않는다",
            body: "타입 단언은 컴파일할 때 지워지기 때문에, 실행 중에 확인하는 일이 전혀 없습니다. 단언이 틀려도 예외가 나거나 `null`이 되지 않습니다. 예를 들어 그 아이디의 요소가 캔버스가 아니었다면, 타입스크립트는 캔버스라고 믿고 넘어가고 실제로 캔버스 메서드를 부르는 순간 실행 에러가 납니다. 그래서 단언은 정말 확실할 때만 씁니다.",
          },
        ],
        code: "// 타입스크립트는 HTMLElement | null 까지만 안다\nconst myCanvas = document.getElementById(\"main_canvas\") as HTMLCanvasElement;\n\n// 꺾쇠 문법 — .tsx 파일에서는 쓸 수 없다\nconst myCanvas2 = <HTMLCanvasElement>document.getElementById(\"main_canvas\");",
      },
      {
        label: "말이 안 되는 단언은 막는다",
        body: "타입스크립트는 타입을 더 구체적으로 좁히거나, 더 넓게 넓히는 단언만 허용합니다. 그래서 `string`을 `number`로 바꾸는 것처럼 불가능한 변환은 막아 줍니다.\n가끔 이 규칙이 너무 깐깐해서 실제로는 맞는 복잡한 변환까지 막을 때가 있습니다. 그럴 때는 단언을 두 번 써서, 먼저 `any`(또는 뒤에서 배울 `unknown`)로 바꾼 다음 원하는 타입으로 바꿀 수 있습니다. 다만 이건 타입 검사를 완전히 우회하는 방법이라 꼭 필요할 때만 씁니다.",
        code: "const x = \"hello\" as number;\n// 'string' 형식을 'number' 형식으로 변환한 작업은 실수일 수 있습니다. 두 형식이 서로 충분히 겹치지 않기 때문입니다.\n// 의도적으로 변환한 경우에는 먼저 'unknown'으로 식을 변환합니다.\n\n// 두 번 단언 — 검사를 우회하므로 꼭 필요할 때만\nconst a = expr as any as T;\nconst b = expr as unknown as T;",
      },
    ],
    sources: [
      { label: "Everyday Types — 타입 단언", href: `${DOCS}/handbook/2/everyday-types.html#type-assertions` },
    ],
  },

  {
    id: "ts-ev-literals",
    name: "리터럴 타입",
    tagline: "일상적인 타입 11절",
    intro:
      "특정한 값 하나를 타입으로 쓰는 리터럴 타입과, 객체 안의 값이 넓게 추론되는 이유와 as const를 정리합니다.",
    blocks: [
      {
        label: "특정 값 하나도 타입이 될 수 있다",
        body: "`string`, `number` 같은 일반 타입 말고도, 타입 자리에 특정 문자열이나 숫자 하나를 적을 수 있습니다. 이걸 리터럴 타입이라고 합니다.\n자바스크립트의 변수 선언을 떠올리면 이해가 쉽습니다. `var`와 `let`은 안에 든 값을 바꿀 수 있고 `const`는 바꿀 수 없죠. 타입스크립트는 이 차이를 그대로 타입에 반영합니다. `let`으로 만든 변수는 아무 문자열이나 담을 수 있으니 `string`이 되고, `const`로 만든 변수는 그 문자열 하나만 담을 수 있으니 `\"Hello World\"`라는 리터럴 타입이 됩니다.",
        code: "let changingString = \"Hello World\";\nchangingString = \"Olá Mundo\";\n// 어떤 문자열이든 담을 수 있으니 타입은 string\n\nconst constantString = \"Hello World\";\n// 이 문자열 하나만 담을 수 있으니 타입은 \"Hello World\"",
      },
      {
        label: "리터럴 타입은 유니온으로 묶을 때 쓸모가 생긴다",
        body: "리터럴 타입 하나만으로는 별로 쓸모가 없습니다. 값이 하나뿐인 변수는 쓸 일이 거의 없으니까요.\n하지만 리터럴 타입을 유니온으로 묶으면 훨씬 쓸모 있어집니다. 예를 들어 정해진 값들만 받는 함수를 만들 수 있습니다. `\"left\" | \"right\" | \"center\"`로 적어 두면 오타(`\"centre\"`)도 컴파일에서 잡힙니다. 숫자 리터럴도 똑같이 쓸 수 있고, `Options | \"auto\"`처럼 리터럴이 아닌 타입과 섞을 수도 있습니다.\n불리언 리터럴 타입도 있습니다. `true`와 `false` 두 개뿐이고, 사실 `boolean` 타입은 `true | false` 유니온의 별칭입니다.",
        code: "let x: \"hello\" = \"hello\";\n// OK\nx = \"hello\";\n// ...\nx = \"howdy\";\n// '\"howdy\"' 형식은 '\"hello\"' 형식에 할당할 수 없습니다.\n\n// 정해진 값만 받는다\nfunction printText(s: string, alignment: \"left\" | \"right\" | \"center\") {}\nprintText(\"Hello, world\", \"left\");\nprintText(\"G'day, mate\", \"centre\");\n// '\"centre\"' 형식의 인수는 '\"left\" | \"right\" | \"center\"' 형식의 매개 변수에 할당될 수 없습니다.\n\n// 숫자 리터럴\nfunction compare(a: string, b: string): -1 | 0 | 1 {\n  return a === b ? 0 : a > b ? 1 : -1;\n}\n\n// 리터럴이 아닌 타입과 섞기\ninterface Options {\n  width: number;\n}\nfunction configure(x: Options | \"auto\") {}\nconfigure({ width: 100 });\nconfigure(\"auto\");\nconfigure(\"automatic\");\n// '\"automatic\"' 형식의 인수는 'Options | \"auto\"' 형식의 매개 변수에 할당될 수 없습니다.",
      },
      {
        label: "리터럴 추론 (Literal Inference)",
        body: "객체로 변수를 초기화하면, 타입스크립트는 그 객체의 속성 값이 나중에 바뀔 수 있다고 봅니다. 그래서 `{ counter: 0 }`의 `counter`는 `0`이 아니라 `number`가 됩니다. 타입은 읽을 때와 쓸 때 모두에 쓰이기 때문입니다.\n문자열도 마찬가지입니다. 아래 `req.method`는 `\"GET\"`이 아니라 `string`으로 추론됩니다. `req`를 만든 뒤 `handleRequest`를 부르기 전에 누군가 `req.method`에 `\"GUESS\"` 같은 문자열을 넣을 수도 있으니, `\"GET\" | \"POST\"`만 받는 함수에 넘기면 에러가 납니다.\n해결 방법은 두 가지입니다.\n1. 둘 중 한 곳에 타입 단언을 붙여 추론을 바꿉니다. 객체를 만들 때 `\"GET\" as \"GET\"`으로 적으면 \"`req.method`는 언제나 `\"GET\"`이라는 리터럴 타입이어야 한다\"는 뜻이라, 그 뒤에 `\"GUESS\"`를 넣는 것도 막아 줍니다. 함수에 넘길 때 `req.method as \"GET\"`으로 적으면 \"다른 이유로 지금은 `\"GET\"`인 걸 안다\"라는 뜻입니다.\n2. `as const`로 객체 전체를 리터럴 타입으로 바꿉니다. `as const`는 타입 시스템을 위한 `const` 같은 것이라, 모든 속성이 `string`이나 `number` 같은 넓은 타입 대신 리터럴 타입이 됩니다.",
        notes: [
          {
            title: "실제로 부딪힌 곳: as const 를 붙였는데 효과가 없었다",
            body: "키 목록을 `as const` 배열로 만들고 타입도 따로 적어 둔 적이 있습니다. `const METHODS: readonly Method[] = [\"GET\", \"POST\"] as const`가 그 예입니다. 그런데 변수에 타입을 직접 적으면 적은 타입이 우선하기 때문에(변수의 타입 어노테이션 절), `as const`로 좁힌 정보가 버려집니다. 그래서 배열에서 `\"PUT\"`이 빠져도 에러가 나지 않았습니다.\n변수 타입을 적지 않고 배열을 기준으로 타입을 뽑으면(`(typeof METHODS)[number]`), 배열과 타입이 한 곳에서 관리되어 빠뜨리는 실수를 막을 수 있습니다. 여기서 쓰인 `typeof`와 `[number]`는 핸드북 타입 조작 장에서 다룹니다.",
            bottom: true,
          },
        ],
        code: "const obj = { counter: 0 };\nif (someCondition) {\n  obj.counter = 1; // 0 이었던 자리에 1 을 넣어도 에러가 아니다 — counter 는 number\n}\n\ndeclare function handleRequest(url: string, method: \"GET\" | \"POST\"): void;\n\nconst req = { url: \"https://example.com\", method: \"GET\" };\nhandleRequest(req.url, req.method);\n// 'string' 형식의 인수는 '\"GET\" | \"POST\"' 형식의 매개 변수에 할당될 수 없습니다.\n\n// 해결 1 — 타입 단언을 둘 중 한 곳에 붙인다\n// 바꾸는 곳 1: 객체를 만들 때\nconst req1 = { url: \"https://example.com\", method: \"GET\" as \"GET\" };\nhandleRequest(req1.url, req1.method);\n// 바꾸는 곳 2: 함수에 넘길 때\nhandleRequest(req.url, req.method as \"GET\");\n\n// 해결 2 — as const\nconst req2 = { url: \"https://example.com\", method: \"GET\" } as const;\nhandleRequest(req2.url, req2.method);\n\n// 실제로 부딪힌 곳 — 타입을 적어서 as const 가 무시됐다\ntype Method = \"GET\" | \"POST\" | \"PUT\";\nconst METHODS_WRONG: readonly Method[] = [\"GET\", \"POST\"] as const; // PUT 이 빠져도 에러 없음\n\n// 배열을 기준으로 타입을 뽑는다\nconst METHODS = [\"GET\", \"POST\", \"PUT\"] as const;\ntype MethodFromList = (typeof METHODS)[number]; // \"GET\" | \"POST\" | \"PUT\"",
      },
    ],
    sources: [
      { label: "Everyday Types — 리터럴 타입", href: `${DOCS}/handbook/2/everyday-types.html#literal-types` },
    ],
  },

  {
    id: "ts-ev-null",
    name: "null과 undefined",
    tagline: "일상적인 타입 12절",
    intro:
      "값이 없음을 나타내는 null과 undefined가 strictNullChecks 설정에 따라 어떻게 다르게 다뤄지는지 정리합니다.",
    blocks: [
      {
        label: "값이 없다는 뜻의 두 원시 값",
        body: "자바스크립트에는 값이 없거나 아직 정해지지 않았다는 걸 나타내는 원시 값이 두 개 있습니다. `null`과 `undefined`입니다. 타입스크립트에도 같은 이름의 타입이 두 개 있습니다.\n이 두 타입이 어떻게 동작하는지는 `strictNullChecks` 옵션을 켰는지에 따라 달라집니다.",
      },
      {
        label: "strictNullChecks 꺼짐",
        body: "`strictNullChecks`를 끄면, `null`이나 `undefined`일 수 있는 값도 아무 확인 없이 그냥 쓸 수 있고, 어떤 타입의 속성에든 `null`과 `undefined`를 넣을 수 있습니다. null 검사가 없는 C#이나 Java와 비슷한 동작입니다.\n하지만 이 값들을 확인하지 않는 것은 버그의 큰 원인이 됩니다. 그래서 문서는 코드베이스에서 가능하다면 항상 `strictNullChecks`를 켜라고 권합니다.",
        code: "// strictNullChecks 가 꺼져 있으면 아래 코드에 에러가 없다\nlet name: string = null;\n\nfunction getLength(s: string | null) {\n  return s.length; // s 가 null 이면 실행할 때 터진다\n}",
      },
      {
        label: "strictNullChecks 켜짐",
        body: "`strictNullChecks`를 켜면, 값이 `null`이나 `undefined`일 수 있을 때는 그 값의 메서드나 속성을 쓰기 전에 먼저 확인해야 합니다.\n선택적 속성을 쓰기 전에 `undefined`인지 확인했던 것처럼, 좁히기로 `null`인지 확인하면 됩니다. `if (x === null)`로 걸러 내면 `else` 안에서는 `string`만 남습니다.",
        code: "function doSomething(x: string | null) {\n  if (x === null) {\n    // 아무것도 하지 않는다\n  } else {\n    console.log(\"Hello, \" + x.toUpperCase()); // 여기서 x 는 string\n  }\n}\n\n// 확인하지 않고 바로 쓰면\nfunction withoutCheck(x: string | null) {\n  console.log(x.toUpperCase());\n  // 'x'은(는) 'null'일 수 있습니다.\n}",
      },
      {
        label: "null 아님 단언 연산자 (Postfix !)",
        body: "타입스크립트에는 확인 없이 타입에서 `null`과 `undefined`를 빼는 특별한 문법도 있습니다. 식 뒤에 `!`를 붙이면, 그 값이 `null`이나 `undefined`가 아니라고 단언하는 것과 같습니다.\n다른 타입 단언과 마찬가지로 실행 동작은 바뀌지 않습니다. 그래서 `!`는 그 값이 절대 `null`이나 `undefined`일 수 없다는 걸 확실히 알 때만 써야 합니다.",
        notes: [
          {
            title: "?. 와 ! 는 무엇이 다른가",
            body: "- `?.`: 값이 없으면 멈추고 `undefined`를 돌려줍니다. 실제로 확인하는 코드라 안전합니다.\n- `!`: 값이 없을 리 없다고 타입스크립트에게 우기는 표시입니다. 실행 중에는 아무것도 확인하지 않아서, 값이 실제로 없으면 그대로 터집니다.",
          },
        ],
        code: "function liveDangerously(x?: number | null) {\n  // 에러 없음 — 하지만 x 가 없으면 실행할 때 터진다\n  console.log(x!.toFixed());\n}",
      },
    ],
    sources: [
      { label: "Everyday Types — null과 undefined", href: `${DOCS}/handbook/2/everyday-types.html#null-and-undefined` },
    ],
  },

  {
    id: "ts-ev-enums",
    name: "열거형",
    tagline: "일상적인 타입 13절",
    intro:
      "타입스크립트가 자바스크립트에 더한 열거형이 다른 기능과 무엇이 다르고, 왜 조심해서 써야 하는지 정리합니다.",
    blocks: [
      {
        label: "열거형은 타입이 아니라 실행되는 코드까지 더한다",
        body: "열거형(enum)은 타입스크립트가 자바스크립트에 더한 기능으로, 이름 붙은 상수 중 하나일 수 있는 값을 표현합니다.\n대부분의 타입스크립트 기능과 달리, 열거형은 타입만 더하는 게 아닙니다. 자바스크립트 언어와 실행 코드 자체에 무언가를 더합니다. 다른 타입들은 컴파일하면 사라지지만, 열거형은 컴파일한 뒤에도 실제 객체로 남습니다.\n그래서 문서는 이런 기능이 있다는 것만 알아 두고, 확실하지 않다면 쓰는 것을 미뤄 두라고 권합니다. 자세한 내용은 참고서의 열거형 페이지에서 다룹니다.",
        notes: [
          {
            title: "같은 일을 리터럴 유니온으로",
            body: "정해진 값 중 하나만 받고 싶다면, 대부분은 리터럴 타입 절에서 본 리터럴 유니온(`\"left\" | \"right\" | \"center\"`)으로 충분합니다. 리터럴 유니온은 컴파일하면 사라지는 순수한 타입이라 실행 코드에 아무것도 남기지 않습니다.",
          },
        ],
        code: "// 열거형 — 컴파일한 뒤에도 Direction 객체가 남는다\nenum Direction {\n  Up,\n  Down,\n}\n\n// 리터럴 유니온 — 컴파일하면 사라진다\ntype DirectionType = \"up\" | \"down\";",
      },
    ],
    sources: [
      { label: "Everyday Types — 열거형", href: `${DOCS}/handbook/2/everyday-types.html#enums` },
      { label: "Enums", href: `${DOCS}/handbook/enums.html` },
    ],
  },

  {
    id: "ts-ev-rare",
    name: "덜 쓰는 원시 타입",
    tagline: "일상적인 타입 14절",
    intro:
      "자주 쓰지는 않지만 타입 시스템에 있는 나머지 원시 타입, bigint와 symbol을 정리합니다. 문서도 있다는 것만 짚고 깊이 다루지는 않습니다.",
    blocks: [
      {
        label: "아주 큰 정수를 위한 bigint",
        body: "ES2020부터 자바스크립트에는 아주 큰 정수를 위한 원시 값 `BigInt`가 있습니다. `number`는 안전하게 표현할 수 있는 정수에 한계가 있어서, 그보다 큰 정수를 정확하게 다룰 때 씁니다.\n`BigInt(100)`처럼 함수로 만들거나, 숫자 뒤에 `n`을 붙인 `100n` 리터럴로 만들 수 있고, 타입은 `bigint`입니다.\n자세한 내용은 타입스크립트 3.2 릴리스 노트에 있습니다.",
        code: "// BigInt 함수로 만들기\nconst oneHundred: bigint = BigInt(100);\n\n// 리터럴 문법으로 만들기\nconst anotherHundred: bigint = 100n;",
      },
      {
        label: "절대 겹치지 않는 참조를 만드는 symbol",
        body: "`Symbol()` 함수로 전역에서 유일한 참조를 만드는 원시 값도 있습니다. 설명 글자가 같아도(`\"name\"`) 만들 때마다 서로 다른 값이 됩니다.\n그래서 두 심볼을 `===`로 비교하면, 타입스크립트는 절대 같을 수 없는 비교라고 알려 줍니다.\n자세한 내용은 참고서의 Symbols 페이지에 있습니다.",
        code: "const firstName = Symbol(\"name\");\nconst secondName = Symbol(\"name\");\n\nif (firstName === secondName) {\n  // 'typeof firstName'이(가) 'typeof secondName'과(와) 겹치지 않으므로 이 비교는 의도하지 않은 것 같습니다.\n  // 절대 일어날 수 없다\n}",
      },
    ],
    sources: [
      { label: "Everyday Types — 덜 쓰는 원시 타입", href: `${DOCS}/handbook/2/everyday-types.html#less-common-primitives` },
      { label: "TypeScript 3.2 — BigInt", href: `${DOCS}/handbook/release-notes/typescript-3-2.html#bigint` },
      { label: "Symbols", href: `${DOCS}/handbook/symbols.html` },
    ],
  },


  {
    id: "ts-hb-narrowing",
    name: "좁히기",
    tagline: "어떤 코드를 쓰면 컴파일러가 무엇을 확신하는가",
    intro:
      "유니온 타입의 값은 그대로는 멤버 모두에 공통인 것만 쓸 수 있습니다. 좁히기(narrowing)는 `if`·`typeof`·`===` 같은 평범한 JavaScript 검사를 TypeScript가 읽어서, 그 분기 안에서는 타입이 더 구체적이라고 확신하는 과정입니다. 이 장은 TypeScript가 알아보는 검사의 목록입니다. typeof 가드, 진실성, 동등성, in, instanceof, 대입, 제어 흐름 분석, 타입 서술(predicate), 단언 함수, 판별 유니온, never와 소진 검사.",
    blocks: [
      {
        label: "typeof 가드와 null 의 함정",
        body: "`typeof x === \"string\"`은 가장 기본적인 가드입니다. typeof가 돌려주는 문자열은 여덟 개 — \"string\" \"number\" \"bigint\" \"boolean\" \"symbol\" \"undefined\" \"object\" \"function\" — 이고, TypeScript는 이 비교를 보고 분기 안의 타입을 좁힙니다. 함정은 `typeof null`이 `\"object\"`라는 JavaScript의 오래된 사실입니다. `string[] | string | null`에서 `typeof strs === \"object\"` 분기에는 `string[]`과 `null`이 함께 남습니다. 실제로 그 분기에서 `for (const s of strs)`를 돌리면 \"'strs' is possibly 'null'.\"(TS18047)이 납니다. TypeScript가 JavaScript의 함정을 아는 셈입니다.",
        code: 'function printAll(strs: string | string[] | null) {\n  if (typeof strs === "object") {\n    for (const s of strs) {}\n    //               ~~~~\n    // \'strs\' is possibly \'null\'.   (TS18047) — typeof null 은 "object"\n  } else if (typeof strs === "string") {\n    console.log(strs);              // strs: string\n  }\n}',
      },
      {
        label: "진실성 좁히기와 빈 문자열의 함정",
        body: "`if (strs)`처럼 값 자체를 조건에 두면 falsy 여섯 값 — `0` `NaN` `\"\"` `0n` `null` `undefined` — 이 걸러집니다. null 함정을 피하는 가장 흔한 방법입니다. 문서는 그 바로 옆에 두 번째 함정을 적습니다. 함수 전체를 `if (strs)`로 감싸면 빈 문자열 `\"\"`도 걸러져서 '빈 문자열 처리'를 조용히 잃습니다. 코드 주석이 \"DON'T DO THIS!\"입니다. 실제로 `function g(s: string | null) { if (s) s.length; s.length; }`에서 `if (s)` 안은 통과하고, 밖의 `s.length`만 TS18047입니다. 그리고 `!!\"world\"`는 리터럴 `true`로, `Boolean(\"hello\")`는 `boolean`으로 추론되는 차이도 적혀 있습니다. 항상 참인 식에는 \"This kind of expression is always truthy.\"(TS2872)가 납니다.",
        code: "function g(s: string | null) {\n  if (s) s.length;      // OK — 이 안에서 s: string\n  s.length;             // 'g' is possibly 'null'. (TS18047)\n  if (s != null) s.length;   // OK — != null 은 null 과 undefined 를 함께 뺀다\n}\n\nfunction h(x: 0 | \"\" | null | string) {\n  if (x) { const y: string = x; }   // 0, \"\", null 이 빠져 string 만 남는다 — 빈 문자열도 빠진다!\n}",
      },
      {
        label: "동등성 · in · instanceof · 대입",
        body: "`===`·`!==`·`==`·`!=`는 양쪽이 공유하는 타입으로 좁힙니다. `x === y`에서 `x: string | number`, `y: string | boolean`이면 둘 다 string이 됩니다. `x != null` 하나로 null과 undefined를 함께 뺄 수 있습니다. `\"swim\" in animal`은 그 속성을 가진 멤버로 좁히는데, 선택적 속성(`swim?`)은 양쪽 분기에 다 남습니다. `instanceof`는 프로토타입 체인을 보는 가드라 클래스·내장 객체(Date)에 씁니다. 대입은 '선언된 타입'에 대해 검사되고, 대입 뒤의 타입은 대입한 값으로 좁혀집니다. 실제로 `let x: string | number = \"a\"; x = 1;` 뒤에서 x를 읽으면 `number`로 잡혔고, `x = true`는 \"Type 'boolean' is not assignable to type 'string | number'.\"였습니다.",
        code: "// TypeScript 6.0.3 타입 API 로 꺼낸 각 분기의 타입\nfunction inop(a: { swim(): void } | { fly(): void }) {\n  if (\"swim\" in a) return a;   // → { swim(): void; }\n  return a;                    // → { fly(): void; }\n}\nlet notNarrowed: string | number = \"a\";\nnotNarrowed = 1;\nconst after = notNarrowed;     // after: number  — 대입으로 좁혀짐 (선언 타입은 그대로)",
      },
      {
        label: "실제로 돌려 보면: 제어 흐름 분석과 타입 서술, 추론되는 서술 (5.5)",
        body: "`if (typeof x === \"number\") return …;` 뒤의 코드에서는 number가 빠집니다. TypeScript가 분기·return·throw를 따라 '여기까지 왔으면 이 타입'을 계산하기 때문이고, 이것이 제어 흐름 분석(control flow analysis)입니다. 함수로 뽑으면 `pet is Fish` 꼴의 타입 서술(type predicate)이 됩니다. 5.5부터는 `x => typeof x === \"number\"` 같은 함수는 서술을 적지 않아도 추론됩니다. 실제로 6.0.3 API에서 `const isNum = (x: unknown) => typeof x === \"number\"`의 타입은 `(x: unknown) => x is number`로 잡혔고, `[1, \"a\", 2].filter((x) => typeof x === \"number\")`의 결과도 `number[]`였습니다. 단언 함수 `asserts v is string`은 호출 뒤의 코드부터 좁힙니다.",
        code: "// 6.0.3 checker.typeToString\nconst isNum = (x: unknown) => typeof x === \"number\";\n// isNum: (x: unknown) => x is number          ← 5.5+ 추론된 타입 서술\nconst nums = [1, \"a\", 2].filter((x) => typeof x === \"number\");\n// nums: number[]                               ← 서술이 없던 시절엔 (string | number)[]\n\nfunction assertIsString(v: unknown): asserts v is string {\n  if (typeof v !== \"string\") throw new Error();\n}\nfunction useAssert(v: unknown) { assertIsString(v); return v; }\n// useAssert: (v: unknown) => string            ← 호출 뒤부터 string",
        terms: [
          {
            term: "타입 서술 (type predicate)",
            body: "반환 타입 자리에 `매개변수 is 타입`이라고 적는 함수. 참을 돌려주면 그 인자가 그 타입이라고 호출 지점에서 좁혀 줍니다. `Array.prototype.filter`의 오버로드가 이 서술을 받아 결과 배열의 타입을 바꿉니다.",
          },
          {
            term: "추론되는 서술의 조건 (5.5)",
            body: "명시적 반환 타입이 없고, return이 하나이며 암묵적 반환이 없고, 매개변수를 변이하지 않고, 불리언 결과가 좁힘과 묶여 있을 때만 추론됩니다. 조건을 벗어나면 예전처럼 boolean입니다.",
          },
        ],
      },
      {
        label: "판별 유니온과 never 소진 검사",
        body: "객체 유니온은 `kind: \"circle\" | \"square\"`처럼 리터럴 속성으로 갈라야 좁힙니다. 한 인터페이스에 `kind`와 선택적 `radius?`를 넣는 설계는 안 됩니다 — `shape.radius`가 \"'shape.radius' is possibly 'undefined'.\"로 남습니다. 멤버마다 kind가 다른 유니온으로 바꾸면 `switch (shape.kind)`의 각 case 안에서 멤버 하나로 좁혀집니다. 마지막에 `const _x: never = shape`를 두면 소진 검사가 됩니다. 멤버를 하나 추가하고 case를 안 쓰면 그 자리에서 \"Type '{ kind: \"tri\"; b: number; }' is not assignable to type 'never'.\"가 납니다. 실제로 세 멤버 중 둘만 처리한 코드가 정확히 그 문구로 걸렸습니다.",
        code: 'type Shape =\n  | { kind: "circle"; r: number }\n  | { kind: "square"; s: number }\n  | { kind: "tri"; b: number };\n\nfunction area(sh: Shape): number {\n  switch (sh.kind) {\n    case "circle": return sh.r ** 2;\n    case "square": return sh.s ** 2;\n    default:\n      const _x: never = sh;\n      //    ~~\n      // Type \'{ kind: "tri"; b: number; }\' is not assignable to type \'never\'. (TS2322)\n      return _x;\n  }\n}',
      },
      {
        label: "문제가 나는 경우: 좁힘이 '새지' 않는 자리",
        body: "좁히기는 코드의 모양을 읽는 것이라, 모양이 바뀌면 사라집니다.",
        code: "상황                                  일어나는 일                              처방\n────────────────────────────────────  ───────────────────────────────────────  ───────────────────────\n콜백 안에서 바깥 변수 사용              콜백 실행 시점을 모름 → 좁힘 리셋          const 로 받아 두고 쓰기\nobj.prop 를 검사하고 obj 를 다시 읽음   속성 접근은 좁혀도 참조가 바뀌면 리셋      const p = obj.prop\n함수로 뺀 검사 (isFish) 가 boolean 반환  5.5 조건을 벗어나면 서술 추론 안 됨        `: pet is Fish` 명시\n`typeof x === \"object\"` 로 배열 구분    null 이 함께 남음                         Array.isArray · `x !== null`\n선택 속성 + `in`                      양쪽 분기에 다 남음                       판별 속성(kind) 사용\n`if (str)` 로 null 제거               \"\" 도 빠짐                               `str != null`",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 좁히기는 '값의 검사' 를 '타입의 사실' 로 번역하는 규칙표다",
        body: "TypeScript는 런타임을 보지 못합니다. 대신 '이런 코드가 참이면 저런 타입이다'라는 규칙표를 가지고 있고, 좁히기 장은 그 표입니다. typeof → 원시 타입, 진실성 → falsy 제거, === → 교집합, in → 속성 보유 멤버, instanceof → 프로토타입, 대입 → 대입한 값, 서술 함수 → 선언한 타입, kind 비교 → 유니온 멤버. 표에 없는 검사(정규식 매치, 길이 비교, 외부 라이브러리의 validate)는 아무것도 좁히지 않습니다. 그럴 때 쓰는 것이 타입 서술 함수 — '내가 검사했으니 이 타입으로 믿어라'를 표에 추가하는 문법 — 입니다.",
        code: "코드 (값의 검사)                 →  타입의 사실\n──────────────────────────────  ──  ────────────────────────────\ntypeof x === \"string\"           →  x: string\nif (x)                          →  x 에서 falsy 멤버 제거\nx === y                         →  x, y 공통 타입\n\"k\" in x                        →  k 를 가진 멤버\nx instanceof Date               →  Date\nx = 1                           →  x: number (선언 타입 안에서)\nisFish(x)  (x is Fish)          →  Fish\nx.kind === \"circle\"             →  kind 가 \"circle\" 인 멤버\n(표에 없는 검사)                 →  아무 변화 없음",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "좁히기의 결과를 함수 경계 밖으로 전달하는 방법이 타입 서술과 단언 함수였고, 그 함수 자체의 타입을 다루는 것이 다음 장 '함수 더 알아보기'입니다. unknown을 좁히는 패턴은 catch 절(useUnknownInCatchVariables)과 JSON 경계에서 매일 쓰게 됩니다.",
      },
      {
        label: "확인 질문",
        body: "1) `typeof strs === \"object\"` 분기에 null이 남는 이유는?\n2) 함수 전체를 `if (str)`로 감싸면 무엇을 잃나요?\n3) Shape에 네 번째 멤버를 추가했을 때 컴파일이 어디서 어떤 문구로 막히게 하려면 무엇을 두어야 하나요?\n4) `[1, \"a\"].filter(x => typeof x === \"number\")`의 타입이 5.4와 5.5에서 어떻게 다른가요?",
      },
    ],
    sources: [
      { label: "Narrowing", href: `${DOCS}/handbook/2/narrowing.html` },
      { label: "TypeScript 5.5 — Inferred Type Predicates", href: `${DOCS}/handbook/release-notes/typescript-5-5.html` },
      { label: "TypeScript 3.7 — Assertion Functions", href: `${DOCS}/handbook/release-notes/typescript-3-7.html#assertion-functions` },
    ],
  },

  {
    id: "ts-hb-functions",
    name: "함수 더 알아보기",
    tagline: "함수 자체에 타입을 붙이는 모든 방법",
    intro:
      "일상적인 타입에서는 매개변수와 반환에 타입을 붙였습니다. 이 장은 함수 자체를 값으로 다룹니다. 함수 타입 표현식, 호출 시그니처, 생성 시그니처, 제네릭 함수(추론·제약·지침), 선택적 매개변수, 오버로드, this 선언, void·object·unknown·never·Function, 나머지 매개변수와 인자, 매개변수 구조 분해, 그리고 함수의 대입 가능성(void 반환 규칙)까지.",
    blocks: [
      {
        label: "함수 타입 표현식과 시그니처",
        body: "`(a: string) => void`가 함수 타입 표현식입니다. 문서가 못 박는 것 하나 — 매개변수 이름은 필수입니다. `(string) => void`라고 쓰면 string이라는 이름의 any 매개변수가 됩니다. 함수에 속성도 있어야 하면 객체 타입 안에 호출 시그니처 `(x: number): boolean;`를 적고(화살표가 아니라 콜론), `new`로 부를 수 있어야 하면 생성 시그니처 `new (s: string): SomeObject;`를 적습니다. Date처럼 둘 다 되는 것은 둘 다 적습니다.",
        code: "type GreetFunction = (a: string) => void;\n\ntype DescribableFunction = {\n  description: string;\n  (someArg: number): boolean;   // 호출 시그니처 — 콜론\n};\ntype SomeConstructor = {\n  new (s: string): SomeObject;  // 생성 시그니처\n};\ninterface CallOrConstruct {\n  (n?: number): string;\n  new (s: string): Date;\n}",
      },
      {
        label: "제네릭 함수: 추론 · 제약 · 세 가지 지침",
        body: "`function firstElement<Type>(arr: Type[]): Type | undefined`는 호출할 때 Type을 인자에서 추론합니다. 제약은 `Type extends { length: number }`처럼 적고, 제약을 벗어난 인자는 \"Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.\"가 됩니다. 제약된 값으로 작업할 때의 함정은 `Type`을 돌려줘야 하는 자리에 `{ length: minimum }`을 돌려주는 것 — 제약에 맞는 '어떤' 객체이지 '그' Type이 아니라서 \"Type '{ length: number; }' is not assignable to type 'Type'.\"입니다. 문서의 지침은 셋입니다. 가능하면 제약 대신 타입 매개변수 자체를 쓰라, 타입 매개변수는 가능한 한 적게, 한 자리에만 나오는 타입 매개변수는 다시 생각하라.",
        code: "// 6.0.3 추론 결과\nfunction longest<T extends { length: number }>(a: T, b: T) { return a.length >= b.length ? a : b; }\nconst lg = longest([1, 2], [1, 2, 3]);   // lg: number[]\nconst lg2 = longest(\"abc\", \"de\");        // lg2: \"abc\" | \"de\"  ← 리터럴이 그대로 남는다\nlongest(10, 100);\n// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'. (TS2345)\n\nfunction first<T>(a: T[]) { return a[0]; }\nconst fst = first([1, 2]);   // number\nconst fst2 = first([]);      // never  ← 빈 배열은 never[]\n\n// 지침 3 — 한 자리에만 나오는 타입 매개변수는 필요 없다\nfunction greet<Str extends string>(s: Str) {}   // → function greet(s: string) 로 충분",
      },
      {
        label: "실제로 돌려 보면: 오버로드는 구현 시그니처가 보이지 않는다",
        body: "같은 함수를 인자 종류에 따라 다르게 부르게 하려면 오버로드 시그니처를 여러 줄 적고 마지막에 구현을 둡니다. 구현 시그니처는 바깥에서 보이지 않습니다. 그래서 `len(\"a\")`와 `len([1])`은 되지만 `len(Math.random() > 0.5 ? \"a\" : [1])`은 '어느 오버로드에도 맞지 않아' 실패합니다. 실제로 7.0.2는 \"No overload matches this call. The last overload gave the following error. Argument of type '\"a\" | number[]' is not assignable to parameter of type 'any[]'.\"를 냈습니다. 문서의 지침인 '가능하면 오버로드 대신 유니온 매개변수를 쓰라'가 이 자리의 답입니다. `len(x: string | any[])` 한 줄이면 위 호출이 전부 통과합니다.",
        code: "function len(s: string): number;\nfunction len(a: any[]): number;\nfunction len(x: any) { return x.length; }   // 구현 시그니처 — 밖에서 안 보임\n\nlen(Math.random() > 0.5 ? \"a\" : [1]);\n// No overload matches this call.\n//   The last overload gave the following error.\n//     Argument of type '\"a\" | number[]' is not assignable to parameter of type 'any[]'.\n//       Type 'string' is not assignable to type 'any[]'.               (TS2769)\n\n// 유니온으로 바꾸면 끝\nfunction len2(x: string | any[]) { return x.length; }\nlen2(Math.random() > 0.5 ? \"a\" : [1]);   // OK",
        terms: [
          {
            term: "오버로드 시그니처와 구현 시그니처",
            body: "본문이 없는 선언들이 오버로드 시그니처(호출하는 쪽이 보는 것), 본문이 있는 마지막 선언이 구현 시그니처입니다. 구현은 모든 오버로드와 호환되어야 하고(\"This overload signature is not compatible with its implementation signature.\" TS2394), 호출 시에는 오버로드만 후보가 됩니다.",
          },
        ],
      },
      {
        label: "this · void · unknown · never · Function",
        body: "`function f(this: User, e: Event)`처럼 첫 매개변수 이름을 this로 적으면 호출 시 this의 타입을 검사합니다. 컴파일 결과에서는 사라집니다. 실제로 `withThis(new Event(\"x\"))`처럼 그냥 부르면 \"The 'this' context of type 'void' is not assignable to method's 'this' of type 'HTMLElement'.\"(TS2684)입니다.\n`void`는 '반환값을 쓰지 말라'는 뜻이고, 문서는 'void는 undefined와 같지 않다'고 적습니다.\n`unknown`은 좁히기 전에는 아무것도 못 하는 any입니다(\"'a' is of type 'unknown'.\" TS18046).\n`never`는 '돌아오지 않는다'(throw, 무한 루프)와 '소진된 유니온'을 뜻합니다.\n`Function`은 부르면 any를 돌려주는 포괄 타입이라 피하고 `() => void`를 쓰라고 합니다. 그리고 문서는 'object는 Object가 아니다. 항상 object를 쓰라'고 적습니다.",
        code: "const u = { v: 1, m(this: { v: number }) { return this.v; } };\nconst m = u.m;\nm();\n// The 'this' context of type 'void' is not assignable to method's 'this' of type '{ v: number;\n  }'. (TS2684)\n\nfunction f(x: unknown) {\n  x.toFixed();                     // 'x' is of type 'unknown'. (TS18046)\n  if (typeof x === \"number\") x.toFixed();   // OK\n}",
      },
      {
        label: "나머지 매개변수와 as const, 매개변수 구조 분해",
        body: "`...rest: number[]`는 가변 인자이고 어노테이션이 없으면 `any[]`입니다. 거꾸로 배열을 펼쳐 넘길 때는 길이를 모르니 고정 인자 함수에 못 넘깁니다. `Math.atan2(...args)`에 `number[]`를 넘기면 \"A spread argument must either have a tuple type or be passed to a rest parameter.\"(TS2556)가 납니다. `const args = [1, 2] as const`로 튜플 `readonly [1, 2]`를 만들면 통과합니다. 매개변수 구조 분해는 패턴 뒤에 어노테이션을 붙입니다. `function sum({ a, b }: { a: number; b: number })`가 그 예입니다.",
        code: "const args = [1, 2];\nMath.atan2(...args);\n// A spread argument must either have a tuple type or be passed to a rest parameter. (TS2556)\n\nconst argsC = [1, 2] as const;   // readonly [1, 2]\nMath.atan2(...argsC);            // OK\n\nfunction dflt(a: number, b = \"x\", ...rest: boolean[]) {}\ndflt(1, \"y\", true, \"z\");\n// Argument of type 'string' is not assignable to parameter of type 'boolean'. (TS2345)",
      },
      {
        label: "함수의 대입 가능성: void 반환 규칙",
        body: "이 장의 마지막이고 콜백을 쓸 때 매일 만나는 규칙입니다. 타입이 `() => void`인 자리에는 '무엇을 돌려주든' 함수를 넘길 수 있고, 돌려준 값은 void로 무시됩니다. 그래서 `forEach(x => arr.push(x))`가 됩니다(push는 number를 돌려줌). 하지만 함수 선언에 직접 `: void`를 적고 값을 return하면 에러입니다. 실제로 `const v: () => void = () => 42`는 통과하고 `v()`의 타입은 void, `function lit(): void { return 42; }`는 \"Type 'number' is not assignable to type 'void'.\"였습니다.",
        code: "type V = () => void;\nconst v: V = () => 42;   // OK — 타입으로 선언된 void 는 반환값을 무시\nconst r = v();           // r: void  (42 가 아니다)\n\nfunction lit(): void { return 42; }\n//                           ~~\n// Type 'number' is not assignable to type 'void'. (TS2322) — 리터럴 함수의 : void 는 진짜 void",
      },
      {
        label: "문제의 구조: 함수 타입은 '호출하는 쪽' 의 약속이다",
        body: "이 장의 규칙들이 전부 한 방향을 봅니다. 오버로드는 '호출하는 쪽이 고를 수 있는 모양들', this 매개변수는 '호출하는 쪽이 주어야 하는 수신자', void 반환은 '호출하는 쪽이 결과를 쓰지 않겠다는 약속', 나머지 매개변수의 튜플 요구는 '호출하는 쪽이 길이를 알아야 한다'. 선언하는 쪽은 자기 본문을 자유롭게 쓰되, 바깥에 보이는 것은 시그니처만입니다. 그래서 '구현 시그니처는 안 보인다'와 'void 콜백은 무엇이든 돌려줘도 된다'가 같은 원리에서 나옵니다.",
      },
      {
        label: "다음 입구",
        body: "함수가 받고 돌려주는 객체의 타입이 다음 장 객체 타입입니다. 제네릭 함수의 지침은 타입 조작의 제네릭 절로, 오버로드 작성 규칙은 선언 파일의 '해야 할 것과 하지 말 것'으로 이어집니다 — 그 페이지가 오버로드 순서와 콜백 매개변수 규칙을 더 길게 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) `(string) => void`는 무엇을 뜻하나요?\n2) 오버로드 두 개가 있는 함수에 `string | any[]` 값을 넘기면 왜 실패하고, 어떻게 고치나요?\n3) `const f: () => void = () => 42`는 왜 통과하고 `function g(): void { return 42 }`는 왜 에러인가요?\n4) `Math.atan2(...[1, 2])`가 에러인 이유와 `as const`가 고치는 이유는?",
      },
    ],
    sources: [
      { label: "More on Functions", href: `${DOCS}/handbook/2/functions.html` },
      { label: "Do's and Don'ts — Function Overloads", href: `${DOCS}/handbook/declaration-files/do-s-and-don-ts.html#function-overloads` },
    ],
  },

  {
    id: "ts-hb-objects",
    name: "객체 타입",
    tagline: "속성 하나하나에 붙는 수식어와, 객체를 넓히고 합치는 법",
    intro:
      "JavaScript는 데이터를 객체로 묶고, TypeScript는 그 객체를 객체 타입으로 적습니다. 이 장은 속성 수식어(선택적 `?`, `readonly`), 인덱스 시그니처, 객체 리터럴 초과 속성 검사, `extends`로 넓히기, 교차 타입 `&`, 제네릭 객체 타입, Array와 ReadonlyArray, 튜플(선택 요소·나머지 요소·readonly)까지입니다.",
    blocks: [
      {
        label: "선택적 속성과 readonly, 그리고 readonly 는 얕다",
        body: "`xPos?: number`는 있어도 없어도 되는 속성이고, strictNullChecks에서 읽으면 `number | undefined`입니다. `readonly prop: string`은 대입을 막습니다. 대입하면 \"Cannot assign to 'prop' because it is a read-only property.\"(TS2540)가 납니다. 문서는 바로 두 경고를 붙입니다. 첫째, readonly는 얕습니다. `readonly resident: { name: string }`에서 `resident` 자체는 못 바꾸지만 `resident.name`은 바꿀 수 있습니다. 둘째, 호환성 검사는 readonly를 무시합니다. `readonly` 속성을 가진 타입에 같은 모양의 쓰기 가능한 객체를 대입하고 그쪽으로 바꾸면 readonly 쪽 값도 바뀝니다. 'readonly는 쓰지 말라는 표시이지 불변성이 아니다'로 기억하면 됩니다.",
        code: "interface Home { readonly resident: { name: string; age: number } }\nfunction visit(home: Home) {\n  home.resident.age++;                      // OK — 안쪽은 바뀐다\n  // Cannot assign to 'resident' because it is a read-only property. (TS2540)\n  home.resident = { name: \"x\", age: 1 };\n}\n\ninterface Person { name: string; age: number }\ninterface ReadonlyPerson { readonly name: string; readonly age: number }\nlet w: Person = { name: \"P\", age: 42 };\nlet r: ReadonlyPerson = w;   // OK — readonly 는 호환성에 안 들어간다\nw.age++;                      // r.age 도 43 이 된다",
      },
      {
        label: "인덱스 시그니처: 이름을 모르는 속성",
        body: "`[index: number]: string`처럼 키의 타입과 값의 타입만 적는 것이 인덱스 시그니처입니다. 키로 쓸 수 있는 타입은 string·number·symbol·템플릿 리터럴 패턴·이들의 유니온입니다. 숫자 인덱서와 문자열 인덱서를 함께 두면 숫자 쪽 값이 문자열 쪽 값의 서브타입이어야 합니다. obj[100]은 obj[\"100\"]이기도 하기 때문입니다. 그리고 문자열 인덱스 시그니처가 있으면 모든 속성이 그 값 타입에 맞아야 합니다. 어긋나면 \"Property 'name' of type 'string' is not assignable to 'string' index type 'number'.\"(TS2411)입니다. `readonly [index: number]: string`이면 쓰기가 막힙니다. `noUncheckedIndexedAccess`를 켜면 인덱스로 읽은 값에 `| undefined`가 붙습니다. 실제로 `Record<string, number>`의 `dict.a`가 그 옵션에서 `number | undefined`로 잡혔고, `noPropertyAccessFromIndexSignature`까지 켜면 점 접근 자체가 \"Property 'a' comes from an index signature, so it must be accessed with ['a'].\"(TS4111)입니다.",
        code: "const dict: Record<string, number> = {};\nconst d: number = dict.a;\n// --noUncheckedIndexedAccess:\n// Type 'number | undefined' is not assignable to type 'number'. (TS2322)\n// --noPropertyAccessFromIndexSignature:\n// Property 'a' comes from an index signature, so it must be accessed with ['a']. (TS4111)\ndict[\"c\"];   // 이쪽은 허용",
      },
      {
        label: "실제로 돌려 보면: 초과 속성 검사는 '리터럴을 바로 넘길 때만' 이다",
        body: "`const p: Pt = { x: 1, y: 2, z: 3 }`은 에러입니다. \"Object literal may only specify known properties, and 'z' does not exist in type 'Pt'.\"(TS2353)이 납니다. 오타를 잡기 위한 검사라 \"Did you mean to write 'color'?\" 같은 제안도 붙습니다. 그런데 같은 객체를 변수에 먼저 담고 `const p2: Pt = q`로 넘기면 통과합니다. 구조적 타입에서는 속성이 더 있어도 호환되기 때문이고, 초과 속성 검사는 '객체 리터럴을 그 자리에서 쓸 때'만 켜지는 특별 규칙입니다. 실제로 둘을 나란히 돌려 첫 줄만 TS2353이었습니다. 공통 속성이 하나도 없는 변수는 그래도 걸립니다. \"Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.\"(TS2559)입니다.",
        code: "interface Pt { x: number; y: number }\nconst p: Pt = { x: 1, y: 2, z: 3 };\n//                           ~~~~\n// Object literal may only specify known properties, and 'z' does not exist in type 'Pt'. (TS2353)\n\nconst q = { x: 1, y: 2, z: 3 };\nconst p2: Pt = q;        // OK — 변수를 거치면 초과 속성 검사가 없다\n\n// satisfies 도 리터럴이라 같은 검사를 받는다\nconst bad = { red: \"x\", extra: 1 } satisfies { red: string };\n// Object literal may only specify known properties, and 'extra' does not exist in type\n  '{ red: string; }'.",
        terms: [
          {
            term: "초과 속성 검사 (excess property check)",
            body: "객체 리터럴을 특정 타입 자리에 직접 쓸 때, 그 타입에 없는 속성이 있으면 에러로 보는 검사. 구조적 호환 규칙의 예외이고, 목적은 오타 잡기입니다. 변수에 담았다가 넘기거나 `as` 단언을 하면 꺼집니다.",
          },
        ],
      },
      {
        label: "extends 와 교차 타입: 충돌할 때 갈린다",
        body: "인터페이스는 `extends`로 다른 타입의 멤버를 가져올 수 있고 여러 개도 됩니다. 타입 별칭은 `&`로 합칩니다. 둘의 차이는 같은 이름의 속성이 충돌할 때입니다. 인터페이스 extends는 에러 — 실제로 `interface I2 extends I1 { a: number }`(I1의 a는 string)가 \"Interface 'I2' incorrectly extends interface 'I1'. Types of property 'a' are incompatible.\"(TS2430)였습니다. 교차 타입은 에러 없이 그 속성을 `never`로 만듭니다 — `{ a: string } & { a: number }`의 a는 never이고, 값을 만들 수 없게 되어 나중에 다른 자리에서 터집니다. 충돌을 빨리 알고 싶으면 인터페이스 쪽입니다.",
        code: "interface I1 { a: string }\ninterface I2 extends I1 { a: number }\n// Interface 'I2' incorrectly extends interface 'I1'.\n//   Types of property 'a' are incompatible.\n//     Type 'number' is not assignable to type 'string'.   (TS2430)\n\ntype A = { a: string }; type B = { a: number };\ntype AB = A & B;          // 에러 없음 — AB[\"a\"] 는 never\nconst ab: AB = { a: \"x\" as never };   // 이렇게밖에 못 만든다",
      },
      {
        label: "Array · ReadonlyArray · 튜플",
        body: "`number[]`는 `Array<number>`의 줄임이고, Array는 제네릭 객체 타입입니다.\n`ReadonlyArray<string>`(줄임 `readonly string[]`)은 push가 없고(\"Property 'push' does not exist on type 'readonly string[]'.\") `new ReadonlyArray`로 만들 수도 없습니다. 값이 아니라 타입이기 때문입니다. 대입은 한 방향입니다. 실제로 `const c2: [\"a\", 1] = id([\"a\", 1])`에서 \"The type 'readonly [\"a\", 1]' is 'readonly' and cannot be assigned to the mutable type '[\"a\", 1]'.\"(TS4104)가 났습니다.\n튜플은 길이와 자리별 타입이 고정된 배열입니다. `[string, number]`의 2번을 읽으면 \"Tuple type '[string, number]' of length '2' has no element at index '2'.\"(TS2493)입니다. 선택 요소는 끝에만 올 수 있고 length가 `2 | 3`처럼 됩니다. 나머지 요소 `...boolean[]`은 앞·중간·끝 어디든 됩니다. `as const`는 `readonly [3, 4]`를 만들어 `[number, number]` 자리에 못 들어가는 점을 기억해야 합니다.",
        code: "// 6.0.3 추론 결과\nconst tupOpt: [string, number?] = [\"a\"];\nconst len = tupOpt.length;          // len: 2 | 1\nconst tup: [string, number] = [\"a\", 1];\ntup[2];\n// Tuple type '[string, number]' of length '2' has no element at index '2'. (TS2493)\n\nconst pair = [3, 4] as const;        // readonly [3, 4]\nfunction dist(p: [number, number]) {}\ndist(pair);\n// Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'. (TS2345)",
      },
      {
        label: "문제의 구조: 수식어는 '이 자리에서의 쓰기 허용' 이고, 호환성은 '읽기 모양' 만 본다",
        body: "이 장에서 혼란스러운 자리는 전부 '쓰기'와 '읽기'가 갈리는 곳입니다. readonly는 쓰기를 막는 표시인데 호환성은 읽기 모양만 비교하니 readonly가 사라진 참조가 생길 수 있습니다. 초과 속성 검사는 리터럴을 '쓰는' 순간의 오타 방지이고, 변수를 통한 '읽기'에는 적용되지 않습니다. 튜플의 readonly가 가변 튜플 자리에 못 들어가는 것은 '쓰기 허용 범위가 더 넓은 자리'에 '쓰기가 막힌 값'을 넣으면 그 자리에서 쓰기가 일어날 수 있기 때문입니다. 수식어는 자리의 성질이고 호환성은 모양의 성질, 둘을 분리해서 보면 모든 예외가 설명됩니다.",
      },
      {
        label: "다음 입구",
        body: "Array<Type>처럼 타입을 받는 타입이 제네릭 객체 타입이었고, 그 메커니즘 전체가 다음 장 타입 조작입니다. readonly를 벗기거나 모든 속성을 선택적으로 만드는 일은 매핑된 타입 절(-readonly, -?)과 유틸리티 타입(Readonly·Partial)에서 이어집니다.",
      },
      {
        label: "확인 질문",
        body: "1) `const p: Pt = { x, y, z }`는 에러인데 `const q = { x, y, z }; const p: Pt = q`는 왜 통과하나요?\n2) `readonly resident`인데 `resident.age++`가 되는 이유는?\n3) interface extends와 `&`가 같은 속성 충돌에서 각각 어떻게 다르게 행동하나요?\n4) `[3, 4] as const`를 `[number, number]` 자리에 못 넘기는 이유는?",
      },
    ],
    sources: [
      { label: "Object Types", href: `${DOCS}/handbook/2/objects.html` },
      { label: "TSConfig — noUncheckedIndexedAccess", href: `${TSCONFIG}/#noUncheckedIndexedAccess` },
      { label: "Utility Types", href: `${DOCS}/handbook/utility-types.html` },
    ],
  },

  {
    id: "ts-hb-manipulation",
    name: "타입 조작",
    tagline: "타입에서 타입을 만들어 같은 사실을 두 번 적지 않는다",
    intro:
      "핸드북에서 난이도가 꺾이는 장입니다. 지금까지는 있는 타입을 적었고, 여기서부터는 타입으로 타입을 계산합니다. 제네릭(타입 매개변수), keyof(키의 유니온), typeof(값에서 타입), 인덱스 접근(T[K]), 조건부 타입(extends ? :), 매핑된 타입([K in keyof T]), 템플릿 리터럴 타입(`${A}${B}`)을 다룹니다. 여덟 절이 각각 시트입니다. 공통 동기는 하나입니다. 같은 사실을 두 군데 적으면 언젠가 어긋납니다.",
    blocks: [
      {
        label: "여덟 절의 역할 분담",
        body: "제네릭은 '타입 자리에 변수를 둔다', keyof·typeof·인덱스 접근은 '있는 타입에서 조각을 꺼낸다', 조건부·매핑된·템플릿 리터럴은 '조각으로 새 타입을 짓는다'. 유틸리티 타입(Partial·Pick·ReturnType…)은 전부 이 재료들로 쓰여 있어서, 이 장을 읽고 나면 lib.d.ts의 정의가 그대로 읽힙니다.",
        code: "변수를 둔다      제네릭 <T>\n조각을 꺼낸다    keyof T · typeof v · T[K]\n새로 짓는다      T extends U ? X : Y · { [K in keyof T]: … } · `${A}${B}`\n\n// 전부 섞인 한 줄 — lib.d.ts 의 Partial\ntype Partial<T> = { [P in keyof T]?: T[P] };",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 여덟 절의 대표 결과",
        body: "TypeScript 6.0.3의 타입 API로 각 절의 한 줄짜리 결과를 뽑아 두었습니다. 시트들에서 각각 다시 나옵니다.",
        code: "제네릭          first([1, 2]) → number · first([]) → never\nkeyof           keyof { x: number; y: number } → \"x\" | \"y\" · 문자열 인덱서 → string | number\ntypeof          typeof s (let s = \"hello\") → string · ReturnType<typeof f>\n인덱스 접근     Person[\"age\"] → number · (typeof arr)[number] → 요소 타입\n조건부          Unwrap<Promise<string>> → string · ToArr<string | number> → string[] | number[]\n매핑된          Mut<Readonly<Opt>> → { a: number; b: string } (-readonly -?)\n템플릿 리터럴   `${\"click\" | \"focus\"}Event` → \"clickEvent\" | \"focusEvent\"\n유틸리티        Getters<{ name: string; age: number }> → { getName: () => string; getAge: () => number }",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "제네릭 절부터입니다. 순서가 중요합니다 — keyof 없이 매핑된 타입을, 조건부 없이 infer를 읽을 수 없습니다. 끝나면 참고서의 유틸리티 타입 장에서 이 재료로 쓰인 완성품 목록을 봅니다.",
      },
    ],
    sources: [
      { label: "Creating Types from Types", href: `${DOCS}/handbook/2/types-from-types.html` },
      { label: "Utility Types", href: `${DOCS}/handbook/utility-types.html` },
    ],
  },

  {
    id: "ts-tm-creating",
    name: "타입에서 타입 만들기",
    tagline: "타입 조작 장의 소개 — 일곱 도구의 목차",
    intro:
      "타입 조작 장을 여는 한 페이지입니다. 내용은 목차입니다. 'TypeScript의 타입 시스템은 다른 타입으로 타입을 표현할 수 있어 매우 강력하다'로 시작해, 제네릭·keyof·typeof·인덱스 접근·조건부·매핑된·템플릿 리터럴 일곱 항목에 한 줄씩을 붙입니다. 이 시트는 그 한 줄들과, 일곱 도구가 서로 어떻게 기대는지를 적습니다.",
    blocks: [
      {
        label: "문서의 일곱 줄",
        body: "제네릭은 매개변수를 받는 타입입니다.\nkeyof 타입 연산자는 새 타입을 만들기 위해 keyof를 쓰는 것입니다.\ntypeof 타입 연산자는 새 타입을 만들기 위해 typeof를 쓰는 것입니다.\n인덱스 접근 타입은 Type['a']로 타입의 부분을 접근하는 것입니다.\n조건부 타입은 타입 시스템 안에서 if 문처럼 동작하는 타입입니다.\n매핑된 타입은 기존 타입의 각 속성을 매핑해 타입을 만드는 것입니다.\n템플릿 리터럴 타입은 템플릿 리터럴 문자열로 속성을 바꾸는 매핑된 타입입니다.",
      },
      {
        label: "서로 기대는 순서",
        body: "일곱 도구는 독립적이지 않습니다. 매핑된 타입은 keyof 없이는 '모든 속성'을 돌 수 없고, 값 타입을 유지하려면 인덱스 접근 T[K]가 필요합니다. 조건부 타입은 제네릭 매개변수 없이는 분기할 재료가 없고, infer는 조건부 안에서만 씁니다. 템플릿 리터럴 타입이 쓸모 있어지는 자리는 매핑된 타입의 키 재매핑(`as`)입니다. typeof는 값의 세계와 타입의 세계를 잇는 유일한 다리라서 어디서든 처음에 옵니다. 그래서 읽는 순서는 제네릭 → keyof → typeof → 인덱스 접근 → 조건부 → 매핑된 → 템플릿 리터럴이고, 문서도 그 순서입니다.",
        code: "                 typeof (값 → 타입)\n                       │\n   제네릭 <T> ─────────┼──────── keyof T ──── T[K] (인덱스 접근)\n       │               │             │          │\n  조건부 타입 ◄────────┘        매핑된 타입 ◄───┘\n  (infer 포함)                       │\n                              템플릿 리터럴 타입 (키 재매핑 as)\n\n  실제 사용: 유틸리티 타입 = 위 재료의 조합",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 재료가 다 들어간 한 줄",
        body: "`Getters<T>`는 문서의 매핑된 타입 절에 나오는 예제인데 일곱 도구 중 다섯이 들어 있습니다. 제네릭 T, keyof T로 키 순회, `as`로 키 재매핑, 템플릿 리터럴 `get${…}`과 내장 Capitalize, 값 자리에 인덱스 접근 T[K]. 실제로 6.0.3에서 `Getters<{ name: string; age: number }>`는 `{ getName: () => string; getAge: () => number }`로 계산됐고, 없는 키 `getC`를 넣은 객체는 \"Object literal may only specify known properties, and 'getC' does not exist in type 'Getters<P>'.\"로 막혔습니다.",
        code: "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n};\ntype G = Getters<{ name: string; age: number }>;\n// G = { getName: () => string; getAge: () => number; }\n\nconst g: G = { getName: () => \"\", getAge: () => 1, getC: () => 0 };\n// Object literal may only specify known properties, and 'getC' does not exist in type 'Getters<P>'.\n  (TS2353)",
      },
      {
        label: "다음 입구",
        body: "제네릭 절로 갑니다. 이 시트는 지도이고, 각 도구의 규칙과 함정은 자기 절에 있습니다.",
      },
    ],
    sources: [
      { label: "Creating Types from Types", href: `${DOCS}/handbook/2/types-from-types.html` },
    ],
  },

  {
    id: "ts-tm-generics",
    name: "제네릭",
    tagline: "타입 자리에 변수를 두고, 쓰는 쪽이 채우게 한다",
    intro:
      "`identity(arg: any)`는 무엇이든 받지만 무엇을 돌려주는지 잊습니다. `identity<Type>(arg: Type): Type`은 받은 타입을 그대로 돌려줍니다. 이 장은 그 타입 변수를 함수·인터페이스·클래스에 두는 법, 제약(`extends`), 제약에 다른 타입 매개변수를 쓰는 법(keyof), 클래스 타입을 받는 법(`new () => T`), 기본값, 그리고 분산 어노테이션(in/out)까지입니다.",
    blocks: [
      {
        label: "타입 변수와 추론",
        body: "`function identity<Type>(arg: Type): Type`에서 Type은 호출마다 채워지는 변수입니다. `identity<string>(\"x\")`로 직접 적어도 되고, 대개는 인자에서 추론되게 둡니다. 제네릭 함수의 타입 자체도 적을 수 있습니다 — `let myIdentity: <Input>(arg: Input) => Input = identity`. 변수 이름은 아무래도 상관없습니다. 인터페이스로 빼면 `interface GenericIdentityFn<Type> { (arg: Type): Type }`처럼 인터페이스 전체의 매개변수가 되어, 어떤 타입에 대한 identity인지 쓰는 쪽이 고정합니다. 문서가 못 박는 제한 하나 — 제네릭 enum과 네임스페이스는 만들 수 없습니다.",
        code: "function identity<Type>(arg: Type): Type { return arg; }\nlet output = identity<string>(\"myString\");   // 명시\nlet output2 = identity(\"myString\");          // 추론 → \"myString\" (const 문맥) 또는 string\n\ninterface GenericIdentityFn<Type> { (arg: Type): Type; }\nlet myIdentity: GenericIdentityFn<number> = identity;   // number 전용으로 고정",
      },
      {
        label: "제약: 모양을 요구하기",
        body: "`arg.length`를 쓰고 싶으면 Type이 length를 가진다는 보장이 필요합니다. 제약 없이 쓰면 \"Property 'length' does not exist on type 'Type'.\"(TS2339). `Type extends Lengthwise`로 제약하면 되고, 그 대신 `loggingIdentity(3)`은 \"Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.\"(TS2345)로 막힙니다. 실제로 7.0.2에서 `len(3)`이 정확히 그 문구였고 `len(\"ab\")`와 `len([1])`은 통과했습니다. 제약에 다른 타입 매개변수를 쓰는 것이 `getProperty<Type, Key extends keyof Type>(obj: Type, key: Key)`입니다. 없는 키 \"m\"을 넣으면 \"Argument of type '\"m\"' is not assignable to parameter of type '\"a\" | \"b\" | \"c\" | \"d\"'.\"입니다.",
        code: "function len<T extends { length: number }>(x: T) { return x.length; }\nlen(\"ab\"); len([1]);   // OK\nlen(3);\n// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'. (TS2345)\n\nfunction getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) { return obj[key]; }\nlet x = { a: 1, b: 2, c: 3, d: 4 };\ngetProperty(x, \"a\");\ngetProperty(x, \"m\");\n// Argument of type '\"m\"' is not assignable to parameter of type '\"a\" | \"b\" | \"c\" | \"d\"'. (TS2345)",
      },
      {
        label: "실제로 돌려 보면: 클래스의 static 은 타입 매개변수를 못 쓴다",
        body: "`class GenericNumber<NumType> { zeroValue: NumType; add: (x: NumType, y: NumType) => NumType; }`처럼 클래스도 제네릭이 됩니다. 인스턴스 쪽만입니다. 문서는 'static 멤버는 클래스의 타입 매개변수를 쓸 수 없다'고 적고, 실제로 `class Box<T> { static def: T; }`는 \"Static members cannot reference class type parameters.\"(TS2302)입니다. 이유는 간단합니다. static은 클래스 하나에 하나인데 T는 인스턴스마다 다를 수 있으니 하나로 정할 수 없습니다. 클래스 타입 자체를 받으려면 `c: { new (): Type }` 또는 `c: new () => Type`으로 생성자 시그니처를 요구합니다 — 믹스인 패턴의 기초입니다.",
        code: "class Box<T> {\n  static def: T;\n  //          ~\n  // Static members cannot reference class type parameters. (TS2302)\n  v!: T;\n}\n\nfunction create<Type>(c: { new (): Type }): Type { return new c(); }\nclass Bee { hasMask = true; }\ncreate(Bee).hasMask;   // Type 은 Bee 로 추론",
      },
      {
        label: "기본값과 분산 어노테이션",
        body: "`<T = string>`처럼 타입 매개변수에 기본값을 둘 수 있습니다. 규칙은 함수 기본값과 같습니다 — 필수 매개변수는 선택적 매개변수 뒤에 올 수 없고, 기본값은 제약을 만족해야 합니다. 실제로 `make()`의 결과는 `string[]`, `make<number>()`는 `number[]`로 잡혔습니다. 분산 어노테이션 `out T`(공변)·`in T`(반공변)·`in out T`(불변)는 4.7에 들어왔는데 문서의 경고가 둘입니다. '분산 어노테이션을 쓸 필요는 거의 없다', 그리고 '타입 검사 동작을 바꾸려고 쓰지 마라 — 그런 용도가 아니다'. 실제로 `Producer<out T>`에 `Producer<string | number>`를 `Producer<string>`에 넣으면 당연히 막히고(\"Type 'Producer<string | number>' is not assignable to type 'Producer<string>'.\"), 반대 방향은 통과합니다. 어노테이션은 그 판단을 빠르게 하고 순환 타입에서 확정해 주는 힌트일 뿐입니다.",
        code: "function make<T = string>(): T[] { return []; }\nconst m1 = make();          // string[]\nconst m2 = make<number>();  // number[]\n\ninterface Producer<out T> { make(): T }\nlet p1: Producer<string> = { make: () => \"a\" };\nlet p2: Producer<string | number> = p1;   // OK — string 생산자는 string | number 생산자다\np1 = p2;\n// Type 'Producer<string | number>' is not assignable to type 'Producer<string>'. (TS2322)",
        terms: [
          {
            term: "공변 (covariant) · 반공변 (contravariant)",
            body: "T가 더 넓어질 때 전체 타입도 같은 방향으로 넓어지면 공변(생산자·반환 위치)이고, 반대 방향이면 반공변(소비자·매개변수 위치)입니다. `out`은 '반환 쪽에만 쓴다', `in`은 '매개변수 쪽에만 쓴다'는 선언이고, 둘 다면 불변입니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우: 제네릭을 쓰지 않아도 될 자리에 쓸 때",
        body: "함수 장의 세 지침이 여기서도 유효합니다.",
        code: "코드                                         문제                            고치기\n───────────────────────────────────────────  ─────────────────────────────  ──────────────────────────\nfunction greet<S extends string>(s: S)        S 가 한 자리에만 나온다           (s: string)\nfunction first<T extends any[]>(a: T): T[0]   제약을 거치며 T[0] 가 any 로      <T>(a: T[]): T | undefined\nfunction f<T, F extends (a: T) => any>(a: T, f: F) 타입 매개변수가 둘인데 F 는 관계만  <T, R>(a: T, f: (a: T)\n                                                                               => R)\nclass Box<T> { static d: T }                  static 은 인스턴스 타입을 못 안다  static 을 밖으로\n<T>(x: T) => x.length                         T 에 length 가 없다               T extends { length: number }",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "keyof 절입니다. 이 절의 `Key extends keyof Type`이 keyof의 첫 쓸모였고, 다음 절은 keyof가 인덱스 시그니처를 만나면 무엇을 돌려주는지부터 봅니다.",
      },
      {
        label: "확인 질문",
        body: "1) `identity(arg: any)`와 `identity<T>(arg: T): T`의 차이를 '돌려주는 타입' 관점에서 설명하세요.\n2) `class Box<T> { static def: T }`가 에러인 이유는?\n3) `function greet<S extends string>(s: S)`에서 S를 없애도 되는 이유는 무엇인가요?\n4) `out T`를 붙이면 타입 검사 결과가 바뀌나요?",
      },
    ],
    sources: [
      { label: "Generics", href: `${DOCS}/handbook/2/generics.html` },
      { label: "TypeScript 4.7 — Variance Annotations", href: `${DOCS}/handbook/release-notes/typescript-4-7.html#optional-variance-annotations-for-type-parameters` },
    ],
  },

  {
    id: "ts-tm-keyof",
    name: "keyof 연산자",
    tagline: "객체 타입의 키를 리터럴 유니온으로 꺼낸다",
    intro:
      "`keyof { x: number; y: number }`는 `\"x\" | \"y\"`입니다. 짧은 절이지만 매핑된 타입과 제네릭 제약의 재료라서 빠질 수 없습니다. 인덱스 시그니처를 만나면 다른 것을 돌려준다는 점이 유일한 함정입니다.",
    blocks: [
      {
        label: "키의 유니온",
        body: "객체 타입에 keyof를 적용하면 그 키들의 문자열(또는 숫자) 리터럴 유니온이 됩니다. `type P = keyof Point`는 `\"x\" | \"y\"`와 같은 타입입니다. 이 유니온은 값으로 쓸 수 없는 타입이라 `const k: K = \"c\"`처럼 없는 키를 넣으면 바로 걸립니다 — 실제로 \"Type '\"c\"' is not assignable to type 'keyof P'.\"(TS2322)입니다. 문서는 'keyof는 매핑된 타입과 결합할 때 특히 유용하다'고 끝맺습니다.",
        code: "type Point = { x: number; y: number };\ntype P = keyof Point;        // \"x\" | \"y\"\n\ntype PP = { a: string; b: number };\nconst k: keyof PP = \"c\";\n// Type '\"c\"' is not assignable to type 'keyof P'. (TS2322)",
      },
      {
        label: "실제로 돌려 보면: 인덱스 시그니처를 만나면 string | number",
        body: "`{ [n: number]: unknown }`에 keyof를 하면 `number`가 됩니다. `{ [k: string]: boolean }`에 하면 `string`이 아니라 `string | number`입니다. JavaScript에서 객체 키는 항상 문자열로 바뀌므로 `obj[0]`과 `obj[\"0\"]`이 같은 속성이고, 숫자 키도 문자열 인덱서에 들어갈 수 있기 때문입니다. 실제로 6.0.3에서 `keyof { [k: number]: string }`은 `number`, `keyof { [k: string]: string }`은 `string | number`로 계산됐습니다.",
        code: "// 6.0.3 checker.typeToString\ntype Keys = keyof { x: number; y: number };     // \"x\" | \"y\"\ntype ArrKey = keyof { [k: number]: string };     // number\ntype StrKey = keyof { [k: string]: string };     // string | number  ← 숫자 키도 문자열이 되니까",
      },
      {
        label: "문제: keyof 가 string 을 포함해서 템플릿 리터럴에 못 넣는다",
        body: "`keyof T`를 `${…}Changed`에 넣으려 하면 keyof T에 symbol이 들어 있어 거부됩니다(객체 키는 string | number | symbol). 문서의 템플릿 리터럴 절은 그래서 `string & keyof Type`으로 symbol을 걸러 냅니다. 매핑된 타입 절의 `Capitalize<string & K>`도 같은 이유입니다. keyof를 문자열 연산에 넣을 때는 `string & keyof T`가 관용구입니다.",
        code: "type Ev<T> = `${keyof T}Changed`;\n// Type 'keyof T' is not assignable to type 'string | number | bigint | boolean | null | undefined'.\n//   Type 'string | number | symbol' is not assignable… — symbol 때문\n\ntype Ev2<T> = `${string & keyof T}Changed`;   // OK — symbol 을 걸러 냄",
      },
      {
        label: "다음 입구",
        body: "keyof는 '타입'의 키를 꺼냅니다. '값'의 타입을 먼저 얻어야 할 때 쓰는 것이 다음 절 typeof이고, 둘을 이어 `keyof typeof obj`가 '이 객체의 실제 키들'을 뜻하는 관용구가 됩니다 — 참고서 Enum 장의 `keyof typeof LogLevel`이 그 예입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `keyof { [k: string]: boolean }`이 `string`이 아니라 `string | number`인 이유는?\n2) `${keyof T}Changed`가 거부되는 이유와 고치는 관용구는?\n3) `keyof typeof obj`는 무엇을 뜻하나요?",
      },
    ],
    sources: [
      { label: "Keyof Type Operator", href: `${DOCS}/handbook/2/keyof-types.html` },
      { label: "Mapped Types", href: `${DOCS}/handbook/2/mapped-types.html` },
    ],
  },

  {
    id: "ts-tm-typeof",
    name: "typeof 연산자",
    tagline: "값의 세계에서 타입의 세계로 건너가는 유일한 다리",
    intro:
      "JavaScript의 `typeof`는 값에 써서 문자열을 돌려줍니다. TypeScript는 '타입 자리'에서 `typeof 변수`를 쓰면 그 변수의 타입을 가리키는 연산자를 더했습니다. 짧은 절이고 제한이 명확합니다 — 식별자(변수)와 그 속성에만 쓸 수 있고, 함수 호출 같은 식에는 쓸 수 없습니다.",
    blocks: [
      {
        label: "값에서 타입을 꺼낸다",
        body: "`let s = \"hello\"; let n: typeof s;`에서 n은 string입니다. 기본 타입에서는 별로 쓸모가 없고, 다른 연산자와 묶일 때 힘을 냅니다. 대표가 `ReturnType<typeof f>`입니다. `ReturnType<f>`라고 쓰면 f는 값이라 \"'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?\"(TS2749)가 납니다. 값과 타입은 다른 이름 공간이라 값 이름을 타입 자리에 바로 쓸 수 없고, typeof가 그 다리입니다.",
        code: "let s = \"hello\";\nlet n: typeof s;            // n: string\n\nfunction f() { return { x: 10, y: 3 }; }\ntype P = ReturnType<typeof f>;   // { x: number; y: number }\n\ntype Wrong = ReturnType<f>;\n// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'? (TS2749)",
      },
      {
        label: "실제로 돌려 보면: 호출식에는 쓸 수 없다",
        body: "문서의 제한 — 'typeof는 식별자(변수 이름)나 그 속성에만 쓸 수 있다'. `typeof msgbox(\"…\")`처럼 호출을 넣으면 타입이 아니라 파서 에러가 납니다. 실제로 `type M = typeof msgbox();`는 \"';' expected.\"(TS1005)와 \"Expression expected.\"(TS1109)였습니다. 함수의 반환 타입이 필요하면 `ReturnType<typeof msgbox>`가 맞는 길입니다. 이 제한은 '타입을 얻으려고 코드를 실행하는 일은 없다'는 원칙의 표현입니다.",
        code: "function msgbox() { return 1; }\ntype M = typeof msgbox();\n//                      ~\n// ';' expected. (TS1005)   — 호출식은 typeof 의 피연산자가 될 수 없다\n\ntype R = ReturnType<typeof msgbox>;   // number",
      },
      {
        label: "관용구: typeof 와 keyof, as const",
        body: "`const config = { … } as const; type Config = typeof config;`는 '설정 객체를 값으로 한 번만 적고 타입은 꺼내 쓰는' 가장 흔한 패턴입니다. `keyof typeof obj`는 그 객체의 키 유니온이고, `(typeof arr)[number]`는 배열 요소의 타입입니다. 실제로 6.0.3에서 `const user = { name: \"a\", age: 1 }; type U = typeof user`에 `{ name: \"x\", age: \"1\" }`을 넣으면 \"Type 'string' is not assignable to type 'number'.\"로 막혔습니다 — 값에서 꺼낸 타입이 그대로 검사에 쓰인 것입니다.",
        code: "const ROUTES = { home: \"/\", seat: \"/seat/:id\" } as const;\ntype RouteKey = keyof typeof ROUTES;        // \"home\" | \"seat\"\ntype RoutePath = (typeof ROUTES)[RouteKey]; // \"/\" | \"/seat/:id\"\n\nconst arr2 = [{ n: 1 }, { n: 2 }];\ntype Elem = (typeof arr2)[number];          // { n: number }",
      },
      {
        label: "다음 입구",
        body: "`(typeof arr)[number]`의 `[number]`가 다음 절 인덱스 접근 타입입니다. typeof로 값에서 타입을 꺼내고, 인덱스 접근으로 그 타입의 조각을 꺼내는 두 걸음이 짝입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `ReturnType<f>`가 에러인 이유를 '이름 공간' 관점에서 설명하세요.\n2) `typeof f()`가 안 되는 이유는?\n3) 설정 객체를 한 번만 적고 타입을 꺼내 쓰는 관용구를 적어 보세요.",
      },
    ],
    sources: [
      { label: "Typeof Type Operator", href: `${DOCS}/handbook/2/typeof-types.html` },
      { label: "Utility Types — ReturnType", href: `${DOCS}/handbook/utility-types.html#returntypetype` },
    ],
  },

  {
    id: "ts-tm-indexed",
    name: "인덱스 접근 타입",
    tagline: "Type[\"key\"] 로 타입의 조각을 꺼낸다",
    intro:
      "`Person[\"age\"]`는 Person 타입의 age 속성 타입입니다. 인덱스에는 타입만 올 수 있어서 유니온·keyof·다른 타입을 그대로 넣을 수 있고, `[number]`로 배열 요소 타입을 꺼낼 수 있습니다. 함정은 하나 — `const key = \"age\"` 같은 값 변수를 인덱스에 쓸 수 없다는 것입니다.",
    blocks: [
      {
        label: "속성 타입 꺼내기",
        body: "`type Age = Person[\"age\"]`는 number입니다. 인덱스는 타입이라 `Person[\"age\" | \"name\"]`은 `string | number`, `Person[keyof Person]`은 모든 속성 타입의 유니온입니다. 없는 키는 \"Property 'alve' does not exist on type 'Person'.\"(TS2339). 실제로 6.0.3에서 `{ a: string; b: number }[\"a\" | \"b\"]`는 `string | number`였고, `type Age = P[\"b\"]`에 문자열을 넣으면 \"Type 'string' is not assignable to type 'number'.\"로 막혔습니다.",
        code: "type Person = { age: number; name: string; alive: boolean };\ntype Age = Person[\"age\"];             // number\ntype I1 = Person[\"age\" | \"name\"];      // string | number\ntype I2 = Person[keyof Person];        // string | number | boolean\ntype I3 = Person[\"alve\"];\n// Property 'alve' does not exist on type 'Person'. (TS2339)",
      },
      {
        label: "실제로 돌려 보면: [number] 로 배열 요소를, 값 변수는 안 된다",
        body: "배열 리터럴의 요소 타입은 `typeof MyArray[number]`로 꺼냅니다. 배열 타입의 숫자 인덱스 시그니처 값이기 때문입니다. 반면 `const key = \"age\"; type A = Person[key]`는 안 됩니다. key는 값이고 인덱스 자리는 타입입니다. 에러가 둘 납니다. \"Type 'key' cannot be used as an index type.\"(TS2538)과 \"'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?\"(TS2749)입니다. 고치는 길은 둘입니다. `type key = \"age\"`로 타입 별칭을 만들거나 `Person[typeof key]`로 적습니다.",
        code: "const MyArray = [{ name: \"Alice\", age: 15 }, { name: \"Bob\", age: 23 }];\ntype Person = (typeof MyArray)[number];   // { name: string; age: number }\ntype Age = (typeof MyArray)[number][\"age\"]; // number\n\nconst key = \"age\";\ntype A1 = Person[key];\n// Type 'key' cannot be used as an index type. (TS2538)\n// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'? (TS2749)\ntype A2 = Person[typeof key];   // OK — number",
      },
      {
        label: "문제의 구조: 대괄호 안은 타입의 자리다",
        body: "`obj[key]`(값의 인덱스)와 `Type[Key]`(타입의 인덱스)는 같은 문법처럼 보이지만 다른 세계에 있습니다. 값의 세계에서는 변수가 들어가고 실행 중에 평가되며, 타입의 세계에서는 타입이 들어가고 컴파일 중에 계산됩니다. 두 세계를 잇는 다리는 typeof 하나뿐이고, 그래서 에러 문구가 'Did you mean typeof key?'라고 묻습니다. 제네릭 함수 `getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`는 두 세계가 만나는 자리입니다 — 값 key의 타입 K가 타입 인덱스로 들어가 반환 타입을 정합니다.",
        code: "값의 세계                     타입의 세계\n──────────────────────────   ─────────────────────────────\nobj[key]       (실행 중)      Type[Key]        (컴파일 중)\nconst key = \"age\"            type Key = \"age\"\n                   typeof ──────────►\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }\n//                                                   ▲ 값 key 의 타입 K 가 타입 인덱스로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "`T[K]`를 매핑된 타입의 값 자리에 두면 '각 속성의 타입을 유지하며 변형'하는 패턴이 됩니다. 그 전에 조건부 타입 절에서 `T[\"message\"]`를 쓰려면 T가 message를 가진다는 제약이 필요하다는 것(TS2536)을 봅니다.",
      },
      {
        label: "확인 질문",
        body: "1) `Person[keyof Person]`은 어떤 타입인가요?\n2) `const key = \"age\"; Person[key]`가 에러인 이유와 두 가지 고치는 길은?\n3) 배열 리터럴의 요소 타입을 꺼내는 식을 적어 보세요.",
      },
    ],
    sources: [
      { label: "Indexed Access Types", href: `${DOCS}/handbook/2/indexed-access-types.html` },
    ],
  },

  {
    id: "ts-tm-conditional",
    name: "조건부 타입",
    tagline: "타입 시스템 안의 if 문, 그리고 infer 와 분배",
    intro:
      "`SomeType extends OtherType ? TrueType : FalseType`. 조건부 타입은 입력 타입에 따라 출력 타입을 고릅니다. 제네릭과 묶이면 오버로드 여러 줄을 한 줄로 줄이고, `infer`로 타입 안의 조각을 꺼내고, 유니온에 대해서는 멤버마다 분배됩니다. 분배를 막는 법(`[T] extends [U]`)까지가 이 절입니다.",
    blocks: [
      {
        label: "오버로드를 한 줄로",
        body: "`createLabel(id: number): IdLabel; createLabel(name: string): NameLabel;` 같은 오버로드는 입력 종류가 늘수록 줄이 늘고, `string | number`를 넘기면 또 한 줄이 필요합니다. 조건부 타입 `NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel`로 바꾸면 한 줄이고, `Math.random() ? \"hello\" : 42`를 넘기면 결과가 `NameLabel | IdLabel`로 알아서 나옵니다. 문서의 첫 예 `Dog extends Animal ? number : string`은 number, `RegExp extends Animal`은 string입니다 — 조건은 '대입 가능한가'입니다.",
        code: "interface IdLabel { id: number } interface NameLabel { name: string }\ntype NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;\n\nfunction createLabel<T extends number | string>(idOrName: T): NameOrId<T> { throw \"unimplemented\"; }\nlet a = createLabel(\"typescript\");        // NameLabel\nlet b = createLabel(2.8);                 // IdLabel\nlet c = createLabel(Math.random() ? \"hello\" : 42);   // NameLabel | IdLabel",
      },
      {
        label: "실제로 돌려 보면: 참 분기에서는 제약이 좁혀진다",
        body: "`type MessageOf<T> = T[\"message\"]`는 T가 message를 가진다는 보장이 없어 \"Type '\"message\"' cannot be used to index type 'T'.\"(TS2536)입니다. `T extends { message: unknown } ? T[\"message\"] : never`로 바꾸면 참 분기 안에서는 T가 그 모양임을 알기 때문에 인덱스가 허용됩니다. 실제로 7.0.2가 첫 줄만 TS2536으로 보고했습니다. 조건부 타입이 좁히기 장의 `if`와 같은 일을 타입 수준에서 하는 셈입니다.",
        code: "type MsgOf<T> = T[\"message\"];\n//                 ~~~~~~~~~\n// Type '\"message\"' cannot be used to index type 'T'. (TS2536)\n\ntype MsgOf2<T> = T extends { message: unknown } ? T[\"message\"] : never;   // OK\ntype EmailMsg = MsgOf2<{ message: string }>;   // string\ntype DogMsg = MsgOf2<{ bark(): void }>;        // never",
      },
      {
        label: "infer: 조각을 꺼내는 변수 선언",
        body: "`Type extends Array<infer Item> ? Item : Type`에서 `infer Item`은 '여기 들어 있는 것을 Item이라 부르자'입니다. 손으로 `Type[number]`를 적지 않고 패턴 매칭으로 꺼냅니다. 함수의 반환 타입도 `Type extends (...args: never[]) => infer Return ? Return : never`로 꺼내고, 이것이 유틸리티 ReturnType의 정의입니다. 실제로 6.0.3에서 `Unwrap<Promise<string>>`은 string이었습니다. 문서가 못 박는 제한 — '인자 타입 목록으로 오버로드 해결을 하는 것은 불가능하다'. 오버로드된 함수에 infer를 쓰면 마지막 시그니처(가장 일반적인 것)만 봅니다. 실제로 `ov(x: string): string; ov(x: number): number`의 `ReturnType<typeof ov>`는 number였습니다.",
        code: "type Unwrap<T> = T extends Promise<infer U> ? U : T;\ntype U1 = Unwrap<Promise<string>>;   // string\n\ndeclare function ov(x: string): string;\ndeclare function ov(x: number): number;\ntype OvR = ReturnType<typeof ov>;    // number  ← 마지막 오버로드만\nconst r: OvR = \"s\";\n// Type 'string' is not assignable to type 'number'. (TS2322)",
      },
      {
        label: "분배: 유니온은 멤버마다 따로 들어간다",
        body: "`type ToArray<T> = T extends any ? T[] : never`에 `string | number`를 넣으면 `(string | number)[]`가 아니라 `string[] | number[]`입니다. 조건부 타입의 검사 대상이 '벗은 타입 매개변수(naked type parameter)'이면 유니온의 멤버마다 조건부가 적용되고 결과가 다시 유니온으로 합쳐집니다. 이것이 Exclude·Extract·NonNullable이 동작하는 원리입니다. 분배를 원하지 않으면 양쪽을 튜플로 감쌉니다 — `[T] extends [any] ? T[] : never`. 실제로 6.0.3에서 `ToArr<string | number>`는 `string[] | number[]`, 튜플로 감싼 `ToArrN<string | number>`는 `(string | number)[]`였습니다.",
        code: "type ToArr<T> = T extends any ? T[] : never;\ntype D1 = ToArr<string | number>;     // string[] | number[]   ← 분배\n\ntype ToArrN<T> = [T] extends [any] ? T[] : never;\ntype D2 = ToArrN<string | number>;    // (string | number)[]  ← 분배 안 됨\n\n// 분배가 하는 일을 손으로 풀면\n// ToArr<string | number>\n//  = ToArr<string> | ToArr<number>\n//  = string[] | number[]",
        terms: [
          {
            term: "벗은 타입 매개변수 (naked type parameter)",
            body: "`T extends …`처럼 T가 아무것에도 감싸이지 않고 바로 검사 대상인 자리. `[T]`나 `Promise<T>`로 감싸면 벗은 것이 아니라 분배가 일어나지 않습니다. 분배는 벗은 자리에서만 일어납니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우: 분배와 never",
        body: "분배의 부작용 몇 가지를 적어 둡니다.",
        code: "상황                           결과                     설명\n─────────────────────────────  ──────────────────────  ─────────────────────────\nToArr<never>                    never                   never 는 빈 유니온 → 멤버가 없어 아무것도 안 나옴\nIsString<string | number>       true | false (= boolean)  멤버마다 따로 답해서 합쳐짐\nT extends string ? \"s\" : \"n\" 에 string | number  \"s\" | \"n\"           실제로 \"x\" 를 넣으면 Type '\"x\"' is not\n                                                                    assignable to type '\"n\" | \"s\"'\n[T] extends [string] ? … 에 string | number  거짓 분기 한 번         유니온 전체가 string 에 대입되는지 한 번만 봄\n오버로드 함수의 infer            마지막 시그니처만       오버로드 해결은 타입 수준에서 불가",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "조건부 타입이 '속성을 고르는' 데 쓰이는 자리가 다음 절 매핑된 타입입니다. `as` 절에 조건부를 넣어 never가 되는 키를 떨어내는 필터링이 그 교차점입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `T[\"message\"]`가 에러인데 `T extends { message: unknown } ? T[\"message\"] : never`는 되는 이유는?\n2) `ToArray<string | number>`가 `string[] | number[]`가 되는 이유와, `(string | number)[]`로 만드는 법은?\n3) 오버로드된 함수에 `ReturnType`을 쓰면 어느 시그니처를 보나요?",
      },
    ],
    sources: [
      { label: "Conditional Types", href: `${DOCS}/handbook/2/conditional-types.html` },
      { label: "Utility Types — Exclude · Extract · ReturnType", href: `${DOCS}/handbook/utility-types.html` },
    ],
  },

  {
    id: "ts-tm-mapped",
    name: "매핑된 타입",
    tagline: "있는 타입의 속성 하나하나를 돌며 새 타입을 짓는다",
    intro:
      "`{ [Property in keyof Type]: boolean }`. 매핑된 타입은 인덱스 시그니처 문법으로 keyof의 각 키를 돌면서 속성을 만듭니다. 수식어 `readonly`와 `?`를 `+`/`-`로 붙이고 떼고, 4.1부터는 `as` 절로 키 이름을 바꾸고(템플릿 리터럴과 Capitalize), never로 키를 걸러 내고, 임의의 유니온을 돌 수도 있습니다. Partial·Required·Readonly·Pick·Record가 전부 이것입니다.",
    blocks: [
      {
        label: "키를 돌면서 속성을 만든다",
        body: "`type OptionsFlags<Type> = { [Property in keyof Type]: boolean }`는 Type의 모든 속성을 boolean으로 바꾼 타입입니다. `in`의 오른쪽은 리터럴 유니온이면 무엇이든 되고, 보통 keyof T입니다. 값 자리에 `Type[Property]`를 두면 원래 타입을 유지하면서 수식어만 바꾸는 패턴이 됩니다. 실제로 6.0.3에서 `{ [K in \"a\" | \"b\"]: boolean }`은 `{ a: boolean; b: boolean }`이었습니다.",
        code: "type OptionsFlags<Type> = { [Property in keyof Type]: boolean };\ntype Features = { darkMode: () => void; newUserProfile: () => void };\ntype FeatureOptions = OptionsFlags<Features>;\n// { darkMode: boolean; newUserProfile: boolean }\n\n// lib.d.ts 의 정의들 — 전부 매핑된 타입\ntype Partial<T>  = { [P in keyof T]?: T[P] };\ntype Readonly<T> = { readonly [P in keyof T]: T[P] };\ntype Pick<T, K extends keyof T> = { [P in K]: T[P] };\ntype Record<K extends keyof any, T> = { [P in K]: T };",
      },
      {
        label: "실제로 돌려 보면: 수식어는 + 와 - 로 붙이고 뗀다",
        body: "`-readonly`는 readonly를 떼고 `-?`는 선택 표시를 뗍니다. 접두어가 없으면 `+`입니다. 실제로 `type Mut<T> = { -readonly [K in keyof T]-?: T[K] }`에 `Readonly<{ a?: number; b: string }>`을 넣으면 `{ a: number; b: string }`이 나왔습니다 — readonly와 `?`가 둘 다 사라지고 `| undefined`도 함께 빠졌습니다. 거꾸로 `readonly`를 붙인 매핑된 타입 `RO<P>`의 속성에 대입하면 \"Cannot assign to 'a' because it is a read-only property.\"(TS2540)입니다. 객체 타입 장에서 '매핑된 타입으로 readonly를 벗길 수 있다'고 한 것이 이 자리입니다.",
        code: "type Opt = { a?: number; b: string };\ntype Mut<T> = { -readonly [K in keyof T]-?: T[K] };\ntype M1 = Mut<Readonly<Opt>>;     // { a: number; b: string }  ← -readonly, -? 둘 다\n\ntype RO<T> = { readonly [K in keyof T]: T[K] };\nconst r: RO<{ a: string; b: number }> = { a: \"\", b: 1 };\nr.a = \"x\";\n// Cannot assign to 'a' because it is a read-only property. (TS2540)",
      },
      {
        label: "as 로 키 재매핑 (4.1), never 로 필터링",
        body: "`[K in keyof T as NewKey]`로 키 이름을 바꿉니다. 템플릿 리터럴과 Capitalize를 넣어 `name` → `getName`을 만드는 Getters가 대표 예입니다. `as` 자리의 타입이 never가 되면 그 키는 사라집니다 — `as Exclude<K, \"kind\">`로 kind를 빼거나, 값 자리에 조건부 타입을 두어 특정 타입의 속성만 남기는 필터링이 됩니다. 실제로 6.0.3에서 `Getters<{ name: string; age: number }>`는 `{ getName: () => string; getAge: () => number }`였습니다.",
        code: "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n};\ntype G = Getters<{ name: string; age: number }>;\n// { getName: () => string; getAge: () => number }\n\ntype RemoveKind<T> = { [K in keyof T as Exclude<K, \"kind\">]: T[K] };\ntype KindlessCircle = RemoveKind<{ kind: \"circle\"; radius: number }>;   // { radius: number }\n\ntype OnlyBooleans<T> = { [K in keyof T as T[K] extends boolean ? K : never]: T[K] };",
      },
      {
        label: "임의의 유니온을 돌 수 있다",
        body: "`in`의 오른쪽이 꼭 `string | number | symbol`의 유니온일 필요는 없습니다. 객체 유니온을 돌면서 `as E[\"kind\"]`로 각 멤버의 판별 속성을 키로 뽑을 수 있습니다. 문서의 예 — `type EventConfig<Events extends { kind: string }> = { [E in Events as E[\"kind\"]]: (event: E) => void }`. 이벤트 유니온에서 '이벤트 이름 → 핸들러' 맵 타입을 자동으로 만드는 패턴이고, 멤버를 추가하면 맵도 따라옵니다.",
        code: "type SquareEvent = { kind: \"square\"; x: number; y: number };\ntype CircleEvent = { kind: \"circle\"; radius: number };\ntype EventConfig<Events extends { kind: string }> = {\n  [E in Events as E[\"kind\"]]: (event: E) => void\n};\ntype Config = EventConfig<SquareEvent | CircleEvent>;\n// { square: (event: SquareEvent) => void; circle: (event: CircleEvent) => void }",
      },
      {
        label: "문제의 구조: 매핑된 타입은 '속성에 대한 for 문' 이다",
        body: "조건부 타입이 if라면 매핑된 타입은 for입니다. `in`이 반복 변수, `as`가 키 변환, 값 자리가 본문, never가 continue에 해당합니다. 이 비유로 lib.d.ts의 유틸리티들이 전부 읽힙니다. Partial은 '모든 키에 ?를 붙이는 for', Pick은 '주어진 키만 도는 for', Omit은 'Exclude로 뺀 키만 도는 for'입니다. 함정도 for와 같습니다. 중첩 객체는 한 겹만 돕니다. 깊게 하려면 재귀 조건부 타입 `Deep<T>`가 필요합니다. 그리고 유니온 타입을 넘기면 조건부와 달리 분배되지 않고 유니온의 공통 키만 돕니다.",
        code: "타입 수준           값 수준 비유\n──────────────────  ──────────────────────────────\n[K in keyof T]      for (const K of Object.keys(T))\nas NewKey           key = transform(K)\n: T[K]              result[key] = T[K]\nas never            continue\n\n// 깊게 하려면 재귀\ntype Deep<T> = T extends object ? { [K in keyof T]: Deep<T[K]> } : T;",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "`as` 절에서 쓴 `${…}`가 다음 절 템플릿 리터럴 타입입니다. 문자열 타입을 조합하고, 거꾸로 `${Key}Changed`에서 Key를 추론해 콜백의 인자 타입까지 맞추는 데까지 갑니다.",
      },
      {
        label: "확인 질문",
        body: "1) `Partial<T>`를 매핑된 타입으로 직접 적어 보세요.\n2) `-readonly`와 `-?`를 한 번에 적용하면 `{ readonly a?: number }`는 무엇이 되나요?\n3) 특정 키를 제거하는 매핑된 타입에서 never가 하는 일은?\n4) 객체 유니온을 `in`으로 돌 때 키를 무엇으로 뽑나요?",
      },
    ],
    sources: [
      { label: "Mapped Types", href: `${DOCS}/handbook/2/mapped-types.html` },
      { label: "TypeScript 4.1 — Key Remapping in Mapped Types", href: `${DOCS}/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types` },
    ],
  },

  {
    id: "ts-tm-template",
    name: "템플릿 리터럴 타입",
    tagline: "문자열 리터럴을 조합하고, 거꾸로 추론한다",
    intro:
      "`${World}`를 타입 안에 쓰면 문자열 리터럴 타입을 이어 붙입니다. 유니온을 넣으면 모든 조합이 나오고, 함수 매개변수 자리에 두면 호출 지점의 문자열에서 타입 매개변수를 거꾸로 추론할 수 있습니다. 내장 문자열 조작 타입 Uppercase·Lowercase·Capitalize·Uncapitalize는 컴파일러에 심어져 있어 .d.ts에 정의가 없습니다.",
    blocks: [
      {
        label: "조합: 유니온은 곱이 된다",
        body: "`type Greeting = \\`hello ${World}\\``에 `World = \"world\"`면 `\"hello world\"`입니다. 보간 자리에 유니온을 넣으면 각 멤버가 들어간 모든 문자열의 유니온이 됩니다. 자리가 둘이면 곱입니다 — `${\"en\" | \"ja\"}_${\"heading\" | \"body\"}_id`는 네 개. 실제로 6.0.3에서 `${\"click\" | \"focus\"}Event`는 `\"clickEvent\" | \"focusEvent\"`로 계산됐고, 그 타입에 `\"hoverEvent\"`를 넣으면 \"Type '\"hoverEvent\"' is not assignable to type '\"clickEvent\" | \"focusEvent\"'.\"(TS2322)였습니다.",
        code: "type Ev = `${\"click\" | \"focus\"}Event`;     // \"clickEvent\" | \"focusEvent\"\nconst e: Ev = \"hoverEvent\";\n// Type '\"hoverEvent\"' is not assignable to type '\"clickEvent\" | \"focusEvent\"'. (TS2322)\n\ntype Lang = \"en\" | \"ja\"; type Part = \"heading\" | \"body\";\ntype Ids = `${Lang}_${Part}_id`;\n// \"en_heading_id\" | \"en_body_id\" | \"ja_heading_id\" | \"ja_body_id\"",
      },
      {
        label: "실제로 돌려 보면: 속성 이름에서 이벤트 이름을 만든다",
        body: "문서의 예는 `on(eventName: \\`${string & keyof Type}Changed\\`, callback)`입니다. 객체의 키마다 `firstNameChanged` 같은 이벤트 이름을 자동으로 만들고, 없는 이름은 거부합니다. 그때의 에러는 \"Argument of type '\"firstName\"' is not assignable to parameter of type '\"firstNameChanged\" | \"lastNameChanged\" | \"ageChanged\"'.\"(TS2345)입니다. `string & keyof Type`인 이유는 keyof에 symbol이 들어 있어 템플릿에 못 들어가기 때문입니다(keyof 절). 매핑된 타입의 `as` 절에 두면 `Getters`처럼 키 자체를 바꾸는 데 쓰입니다.",
        code: "type PropEventSource<Type> = {\n  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;\n};\ndeclare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;\nconst person = makeWatchedObject({ firstName: \"Saoirse\", lastName: \"Ronan\", age: 26 });\n\nperson.on(\"firstNameChanged\", (v) => {});   // OK\nperson.on(\"firstName\", (v) => {});\n// Argument of type '\"firstName\"' is not assignable to parameter of type\n// '\"firstNameChanged\" | \"lastNameChanged\" | \"ageChanged\"'. (TS2345)",
      },
      {
        label: "거꾸로 추론: 문자열에서 Key 를 꺼내 콜백 타입을 맞춘다",
        body: "위 예의 콜백 인자가 `any`인 것이 아쉬운 자리입니다. 매개변수를 `on<Key extends string & keyof Type>(eventName: \\`${Key}Changed\\`, callback: (newValue: Type[Key]) => void)`로 바꾸면, `\"firstNameChanged\"`라는 문자열에서 Key가 `\"firstName\"`으로 추론되고 콜백의 newValue는 `Type[\"firstName\"]` = string이 됩니다. 템플릿 리터럴 타입이 패턴 매칭처럼 동작하는 것이고, 조건부 타입의 infer와 같은 방향입니다 — 문자열의 일부를 타입 변수로 꺼냅니다.",
        code: "type PropEventSource<Type> = {\n  on<Key extends string & keyof Type>(\n    eventName: `${Key}Changed`,\n    callback: (newValue: Type[Key]) => void\n  ): void;\n};\nperson.on(\"firstNameChanged\", (newName) => newName.toUpperCase());   // newName: string\nperson.on(\"ageChanged\", (newAge) => newAge.toFixed());                // newAge: number",
      },
      {
        label: "내장 문자열 조작 타입 네 개",
        body: "`Uppercase<\"abc\">`는 \"ABC\", `Lowercase<\"ABC\">`는 \"abc\", `Capitalize<\"abc\">`는 \"Abc\", `Uncapitalize<\"Abc\">`는 \"abc\"가 됩니다. 문서의 주의는 둘입니다. 하나는 이 타입들이 '성능을 위해 컴파일러에 내장되어 있어서 TypeScript에 포함된 .d.ts 파일에서 찾을 수 없다'는 점입니다. 다른 하나는 '4.1 기준으로 이 내장 함수들은 JavaScript 문자열 런타임 함수를 직접 쓰므로 로캘을 인식하지 않는다'는 점입니다. toUpperCase를 그대로 부르는 것이라 터키어 i 같은 예외는 없습니다. 실제로 6.0.3에서 `Uppercase<\"abc\">`는 \"ABC\", `Capitalize<\"abc\">`는 \"Abc\"였습니다.",
        code: "type Up = Uppercase<\"abc\">;        // \"ABC\"\ntype Cap = Capitalize<\"abc\">;      // \"Abc\"\ntype ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;\ntype MainID = ASCIICacheKey<\"my_app\">;   // \"ID-MY_APP\"\n\n// lib.es5.d.ts 에는 이름만 있다\ntype Uppercase<S extends string> = intrinsic;",
      },
      {
        label: "문제가 나는 경우: 조합이 너무 커질 때",
        body: "유니온의 곱은 빨리 커집니다. 보간 자리 셋에 각각 10개 멤버면 1,000개 리터럴이고, TypeScript는 유니온 멤버 수 상한(100,000)을 넘기면 \"Expression produces a union type that is too complex to represent.\"로 거부합니다. 또 한 자리에 `string`을 넣으면 `\\`id-${string}\\``처럼 패턴 타입이 되어 어떤 문자열이든 접두어만 맞으면 통과합니다 — 유용하지만 '값을 열거한다'는 보장은 사라집니다.",
        code: "상황                                결과\n──────────────────────────────────  ─────────────────────────────────────────────\n`${A}${B}${C}` 각 10 멤버             1,000 리터럴 — 아직 됨\n곱이 100,000 을 넘음                  Expression produces a union type that is too complex to represent.\n`id-${string}`                       패턴 타입 — \"id-anything\" 전부 허용, 열거 아님\n`${keyof T}`                         symbol 때문에 거부 → string & keyof T",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "타입 조작 여덟 절이 끝났습니다. 다음은 클래스 장 — 타입이 아니라 값이기도 한 선언이고, 여기서 만든 타입들이 멤버·제네릭 클래스·this 타입으로 들어갑니다. 유틸리티 타입 전체 목록은 참고서 첫 장에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `${\"a\" | \"b\"}_${\"x\" | \"y\"}`는 몇 개의 리터럴이 되나요?\n2) `${keyof T}Changed`가 거부되는 이유는?\n3) `\"firstNameChanged\"`에서 콜백 인자 타입을 string으로 맞추려면 시그니처를 어떻게 바꾸나요?\n4) Capitalize가 .d.ts에 본문이 없는 이유는?",
      },
    ],
    sources: [
      { label: "Template Literal Types", href: `${DOCS}/handbook/2/template-literal-types.html` },
      { label: "TypeScript 4.1 — Template Literal Types", href: `${DOCS}/handbook/release-notes/typescript-4-1.html#template-literal-types` },
    ],
  },

  {
    id: "ts-hb-classes",
    name: "클래스",
    tagline: "값이면서 타입인 선언 — 필드 초기화 · 가시성 · this · 추상 · 구조적 관계",
    intro:
      "ES2015 클래스에 TypeScript가 타입 어노테이션과 몇 가지 문법을 더한 장입니다. 필드와 `strictPropertyInitialization`, 생성자, getter/setter, 인덱스 시그니처, `implements`와 `extends`, 초기화 순서, 가시성(public·protected·private·#private), static과 static 블록, 제네릭 클래스, 런타임의 this, this 타입, 매개변수 속성, 클래스 표현식, abstract, 그리고 마지막에 다시 구조적 관계로 돌아옵니다.",
    blocks: [
      {
        label: "필드는 생성자에서 초기화되어야 한다",
        body: "`class Point { x: number; }`는 strict에서 \"Property 'x' has no initializer and is not definitely assigned in the constructor.\"(TS2564)입니다. 문서는 '필드는 생성자 자체 안에서 초기화되어야 한다'고 강조합니다. init() 메서드를 생성자에서 불러도 TypeScript는 따라가지 않습니다. 확실히 다른 곳에서 채운다면 `name!: string`처럼 확정 할당 단언을 씁니다. `readonly`는 생성자 밖의 대입을 막습니다. 생성자에는 타입 매개변수와 반환 타입 어노테이션을 쓸 수 없고('인스턴스 타입이 항상 반환되니까'), 파생 클래스에서는 this를 쓰기 전에 `super()`를 불러야 합니다(\"'super' must be called before accessing 'this' in the constructor of a derived class.\" TS17009).",
        code: "class A { x: number; constructor() {} }\n//        ~\n// Property 'x' has no initializer and is not definitely assigned in the constructor. (TS2564)\n\nclass OK {\n  a = 0;            // 초기화자\n  b: number;        // 생성자에서\n  c!: string;       // 확정 할당 단언 — 다른 곳에서 채운다는 약속\n  readonly d = 1;\n  constructor() { this.b = 1; }\n}",
      },
      {
        label: "실제로 돌려 보면: 초기화 순서와 implements 의 한계",
        body: "문서의 예를 그대로 돌렸습니다. `class Base { name = \"base\"; constructor() { console.log(\"My name is \" + this.name); } }`와 `class Derived extends Base { name = \"derived\"; }`입니다. `new Derived()`는 \"base\"를 찍습니다. 순서는 '기반 필드 → 기반 생성자 → 파생 필드 → 파생 생성자'라서 기반 생성자가 돌 때 파생 필드는 아직 없습니다. 그리고 `implements`는 검사일 뿐입니다. 문서는 '클래스나 메서드의 타입을 전혀 바꾸지 않는다'고 적습니다. 인터페이스의 선택적 속성 `pong?()`은 클래스에 생기지 않습니다. 실제로 `\"pong\" in new Ball()`은 false였습니다. 멤버가 같지 않으면 \"Class 'Ball' incorrectly implements interface 'Pingable'.\"(TS2420)입니다.",
        code: "class Base { name = \"base\"; constructor() { console.log(\"Base ctor sees name =\", this.name); } }\nclass Derived extends Base { name = \"derived\"; constructor() { super();\n  console.log(\"Derived ctor sees name =\", this.name); } }\nnew Derived();\n// Base ctor sees name = base        ← 파생 필드는 아직 없다\n// Derived ctor sees name = derived\n\ninterface Pingable { ping(): void; pong?(): void }\nclass Ball implements Pingable { ping() {} }\n\"pong\" in new Ball();   // false — implements 는 속성을 만들지 않는다",
      },
      {
        label: "가시성: private 은 소프트, #private 은 하드",
        body: "가시성은 `public`(기본)·`protected`(하위 클래스까지)·`private`(이 클래스만) 셋입니다. TypeScript의 private은 컴파일 때만 검사합니다. 문서의 문장은 'private은 타입 검사 중 대괄호 표기로의 접근을 허용한다'입니다. 실제로 `(p as any)[\"soft\"]`뿐 아니라 `p[\"soft\"]`도 통과했습니다. 런타임에는 그냥 속성이라 Object.keys에 보입니다. 반면 JavaScript의 `#hard`는 런타임에서도 밖에서 못 읽고 Object.keys에도 없습니다. 실제로 `(p as any)[\"#hard\"]`는 undefined였고 keys는 `['soft']`였습니다. ES2021 이하로 컴파일하면 WeakMap으로 흉내 냅니다. 바깥에서 private을 읽으면 \"Property 'p' is private and only accessible within class 'B'.\"(TS2341)가 납니다. #private은 \"Property '#q' is not accessible outside class 'B' because it has a private identifier.\"(TS18013)가 납니다.",
        code: "class Priv { private soft = 1; #hard = 2; }\nconst p = new Priv();\np.soft;   // Property 'soft' is private and only accessible within class 'Priv'. (TS2341)\n// Property '#hard' is not accessible outside class 'Priv' because it has a private identifier. (TS18013)\np.#hard;\np[\"soft\"];   // 통과! — 소프트 private\n\n// 런타임 (node)\n(p as any)[\"soft\"]   → 1\n(p as any)[\"#hard\"]  → undefined\nObject.keys(p)       → ['soft']",
      },
      {
        label: "static · 제네릭 클래스 · 런타임의 this",
        body: "static 멤버는 클래스 자체에 붙고 상속됩니다. 실제로 `class T2 extends S {}`의 `T2.value`가 1이었습니다. `name`·`length`·`call`은 Function의 속성이라 static 이름으로 못 씁니다. \"Static property 'name' conflicts with built-in property 'Function.name'…\"(TS2699)이 납니다. static 블록 `static { … }`은 클래스 정의 시점에 한 번 돌고 private 필드에 접근할 수 있습니다. 제네릭 클래스의 static은 타입 매개변수를 못 씁니다(TS2302). 런타임의 this는 호출 방식에 따릅니다. 실제로 `const detached = c.inc; detached()`는 \"Cannot read properties of undefined (reading 'count')\"로 터졌습니다. 화살표 함수 속성 `incArrow = () => …`는 됩니다. 문서는 교환 조건을 적습니다. 화살표는 메모리를 더 쓰고 super.method를 못 부릅니다. `this` 매개변수(`inc(this: Counter)`)는 컴파일 때 잡지만 런타임 보장은 없습니다.",
        code: "class Counter {\n  count = 0;\n  inc() { this.count++; return this; }\n  incArrow = () => { this.count++; return this; };\n}\nconst c = new Counter();\nconst detached = c.inc; detached();\n// TypeError: Cannot read properties of undefined (reading 'count')\nconst detachedArrow = c.incArrow; detachedArrow();   // OK — count 1\n\n// 컴파일 타임에 막는 길\nclass Safe { count = 0; inc(this: Safe) { this.count++; } }\nconst s = new Safe(); const f = s.inc; f();\n// The 'this' context of type 'void' is not assignable to method's 'this' of type 'Safe'. (TS2684)",
      },
      {
        label: "getter/setter · 매개변수 속성 · abstract · override",
        body: "getter만 있으면 readonly입니다. 런타임에서도 strict 모드 대입이 \"Cannot set property v of #<Acc> which has only a getter\"로 터집니다. setter 매개변수 타입은 getter 반환에서 추론됩니다. 4.3부터 둘이 달라도 됩니다. `constructor(public a: number, private b: string)`은 매개변수 속성입니다. 같은 이름의 필드를 자동으로 만듭니다. 실제로 emit에 `this.x = x`가 생성됐습니다. `abstract class`는 `new`를 못 합니다. \"Cannot create an instance of an abstract class.\"(TS2511)가 납니다. 추상 멤버를 구현하지 않은 파생은 TS2515입니다. 추상 클래스를 생성자로 받으려면 `typeof Base` 대신 `new () => Base`를 씁니다. `override` 키워드를 `noImplicitOverride`와 함께 쓰면 리팩터링 실수를 잡습니다. 기반에 없는 멤버에 붙이면 \"This member cannot have an 'override' modifier because it is not declared in the base class 'C'.\"(TS4113)가 납니다.",
        code: "abstract class S { abstract m(): void }\nnew S();\n// Cannot create an instance of an abstract class. (TS2511)\n\nclass C { m() {} }\nclass D extends C { override m() {} override nope() {} }\n//                                           ~~~~\n// --noImplicitOverride:\n// This member cannot have an 'override' modifier because it is not declared in the base class 'C'.\n  (TS4113)\n\nclass Acc { get v() { return 1 } set v(x: string) {} }\n// 4.3+ : get 과 set 의 타입이 달라도 된다 (단, get 타입이 set 타입에 대입 가능해야)",
      },
      {
        label: "문제의 구조: 클래스는 값과 타입을 동시에 만들고, 비교는 여전히 구조적이다",
        body: "클래스 선언은 두 가지를 만듭니다. 하나는 생성자 함수라는 값(`typeof Point`)입니다. 다른 하나는 인스턴스 모양이라는 타입(`Point`)입니다. 그래서 `InstanceType<typeof Point>`가 Point입니다. 그리고 관계 비교는 마지막 절이 말하듯 구조적입니다. 멤버가 같은 두 클래스는 서로 대입됩니다. '멤버가 없는 타입은 다른 모든 것의 상위 타입'입니다. 유일한 명목적 예외가 private·protected 멤버입니다. 두 클래스가 각자 `private x`를 가지면 모양이 같아도 호환되지 않습니다. \"Types have separate declarations of a private property 'x'.\"가 납니다. 그러니 '이 클래스 인스턴스만 받겠다'를 보장하는 가장 가벼운 방법이 private 필드 하나입니다.",
        code: "class Point1 { x = 0; y = 0 }\nclass Point2 { x = 0; y = 0 }\nconst p: Point1 = new Point2();   // OK — 구조적\n\nclass A2 { private x = 1 } class B2 { private x = 1 }\nconst a2: A2 = new B2();\n// Type 'B2' is not assignable to type 'A2'.\n//   Types have separate declarations of a private property 'x'. (TS2322)\n\nclass Empty {}\nfunction fn(x: Empty) {}\nfn(42); fn(\"x\"); fn({});   // 전부 OK — Empty 는 아무것도 요구하지 않는다",
      },
      {
        label: "다음 입구",
        body: "클래스를 파일 밖으로 내보내고 가져오는 것이 마지막 장 모듈입니다. 클래스와 네임스페이스·인터페이스의 병합은 참고서의 선언 병합에, 믹스인(클래스를 받아 클래스를 돌려주는 함수)은 참고서의 믹스인에, 데코레이터는 참고서의 데코레이터에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `new Derived()`가 \"base\"를 찍는 이유를 초기화 순서로 설명하세요.\n2) `private`과 `#private`의 차이를 '컴파일 타임'과 '런타임' 두 단어로 적어 보세요.\n3) `const f = obj.method; f()`가 터지는 이유와, 컴파일 때 잡는 두 가지 방법은?\n4) 모양이 같은 두 클래스가 서로 대입되지 않게 만드는 가장 가벼운 방법은?",
      },
    ],
    sources: [
      { label: "Classes", href: `${DOCS}/handbook/2/classes.html` },
      { label: "TypeScript 4.3 — Separate Write Types on Properties", href: `${DOCS}/handbook/release-notes/typescript-4-3.html#separate-write-types-on-properties` },
      { label: "TSConfig — noImplicitOverride", href: `${TSCONFIG}/#noImplicitOverride` },
    ],
  },

  {
    id: "ts-hb-modules",
    name: "모듈",
    tagline: "import·export 한 줄이 있으면 모듈, 없으면 스크립트",
    intro:
      "핸드북 마지막 장입니다. JavaScript의 모듈을 TypeScript가 어떻게 보는지 — 모듈과 스크립트의 구분, `export {}`, ES 모듈 문법(default·named·namespace·side-effect), `import type`과 인라인 `type` 수식어, `import x = require()`, 출력 옵션 `module`·`target`, `moduleResolution`, 네임스페이스에 대한 한 줄, CommonJS 문법과 상호운용까지. 깊은 내용은 모듈 참고서 섹션에 있고, 이 장은 어휘를 세우는 자리입니다.",
    blocks: [
      {
        label: "모듈과 스크립트: 한 줄의 차이",
        body: "최상위에 `import`나 `export`가 하나라도 있으면 그 파일은 모듈이고 자기 스코프를 가집니다. 없으면 스크립트이고 선언이 전역입니다. 그래서 두 스크립트 파일에 같은 이름의 `const shared`가 있으면 충돌합니다. 실제로 `s1.ts`와 `s2.ts`에 각각 `const shared`를 두고 함께 컴파일하면 \"Cannot redeclare block-scoped variable 'shared'.\"가 났고, 한쪽에 `export {};`를 붙이자 사라졌습니다. 문서는 '이 문법은 모듈 타깃과 상관없이 동작한다'고 적습니다. 6.0 기본의 `moduleDetection: force`(5.9 `tsc --init`도 그렇게 씀)는 모든 파일을 모듈로 취급해 이 함정을 없앱니다.",
        code: "// s1.ts\nconst shared = 1;\n// s2.ts\nconst shared = 2;\n// Cannot redeclare block-scoped variable 'shared'. (TS2451) — 둘 다 스크립트라 전역\n\n// s2.ts 를 모듈로\nconst shared = 2;\nexport {};          // ← 이 한 줄로 자기 스코프",
      },
      {
        label: "실제로 돌려 보면: 타입 import 지우기",
        body: "타입 import는 지워지고, verbatimModuleSyntax는 타입임을 적게 합니다. `import { a, T } from \"./a.js\"`에서 T가 타입이면 컴파일 결과에서 T는 사라집니다. 타입은 런타임에 없기 때문입니다. 실제로 emit된 b.js에는 `import { a } from \"./a.js\"`만 남았습니다. 이 '지우기(elision)'는 단일 파일 변환기(Babel·esbuild)가 할 수 없는 일입니다. 다른 파일을 봐야 T가 타입인지 알 수 있기 때문입니다. 그래서 5.0의 `verbatimModuleSyntax`는 적은 대로 내보내되 타입은 `type`을 붙이라고 강제합니다. 실제로 켜면 \"'T' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.\"(TS1484)가 납니다. 처방은 `import type { T }`(전체) 또는 `import { a, type T }`(4.5 인라인)입니다. type-only로 가져온 것을 값으로 쓰면 \"'Observable' cannot be used as a value because it was imported using 'import type'.\"(TS1361)입니다.",
        code: "// esm/b.ts\nimport { a, T, I } from \"./a.js\";      // T, I 는 타입\n\n// tsc 출력 b.js — 타입은 지워졌다\nimport { a } from \"./a.js\";\n\n// --verbatimModuleSyntax\n// 'T' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.\n  (TS1484)\nimport { a, type T, type I } from \"./a.js\";   // 처방 — 그대로 emit 되고 type 은 빠진다\n\nimport type { Observable } from \"./observable.js\";\nnew Observable(1);\n// 'Observable' cannot be used as a value because it was imported using 'import type'. (TS1361)",
        terms: [
          {
            term: "import 지우기 (import elision)",
            body: "값으로 쓰이지 않은 import를 컴파일러가 출력에서 빼는 것. 타입만 가져온 import가 런타임에 모듈을 불러오지 않게 합니다. 부작용이 있는 모듈을 타입만 가져왔다가 실행이 사라지는 함정도 여기서 나오고, `import \"./x.js\"`(side-effect import)는 지워지지 않습니다.",
          },
        ],
      },
      {
        label: "import x = require() 와 CommonJS",
        body: "TypeScript에는 CommonJS의 require에 직접 대응하는 문법 `import fs = require(\"fs\")`가 있습니다. ES 모듈을 출력할 때는 쓸 수 없습니다. 실제로 `--module esnext`에서 \"Import assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from \"mod\"'…\"(TS1202)가 났습니다. `module: nodenext`에서 package.json의 type이 commonjs인 파일은 CommonJS로 emit됩니다. `require(\"…\")`와 `exports.x =`가 나옵니다. 실제로 cjs/e.js가 그렇게 나왔습니다. ESM과 CJS가 섞일 때의 규칙은 모듈 참고서로 넘깁니다. 이 장은 '같은 import가 설정에 따라 다른 코드가 된다'까지만 말합니다.",
        code: "// cjs/e.ts (package.json type: commonjs, --module nodenext)\nimport { a } from \"../esm/a.js\";\nexport const e = String(a);\nexport default function hello() { return \"hi\"; }\n\n// emit\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.e = void 0;\nexports.default = hello;\nconst a_js_1 = require(\"../esm/a.js\");\nexports.e = String(a_js_1.a);",
      },
      {
        label: "module 과 target 은 다른 축이다",
        body: "`target`은 문법의 높이(어떤 ES 버전의 문법으로 쓸까), `module`은 모듈 코드의 모양(import/export를 어떤 시스템으로 쓸까)입니다. 문서의 예는 같은 소스를 ES2020·CommonJS·UMD로 출력해 보여 줍니다. 지금 쓸 수 있는 module 값은 es2015~esnext, commonjs, node16/node18/node20/nodenext, preserve이고, amd·umd·system은 6.0에서 폐기되어 7.0에서 \"Option 'module=AMD' has been removed.\"입니다. 이 장의 `moduleResolution` 절은 'Classic과 Node 두 전략'이라고 적고 있는데 이것도 옛 설명입니다 — classic은 7.0에서 제거됐고 지금은 node16/nodenext·bundler가 주류입니다(모듈 참고서의 레퍼런스 장).",
        code: "축            묻는 것                         값 (7.0 에서 살아 있는 것)\n────────────  ─────────────────────────────  ─────────────────────────────────────────\ntarget        어떤 문법 높이로 쓸까             es2015 … es2025, esnext   (es5 제거)\nmodule        import/export 를 어떤 모양으로    es2015…esnext · commonjs · node16/18/20/nodenext · preserve\n                                              (amd · umd · system · none 제거)\nmoduleResolution  import 경로를 어떻게 파일로    node16 · nodenext · bundler   (classic · node10 제거)",
        codeLang: "text",
      },
      {
        label: "문제: 타입만 가져온 모듈의 부수 효과가 사라졌다",
        body: "폴리필이나 전역 등록을 하는 모듈에서 타입 하나만 import하면, 지우기 때문에 그 모듈이 런타임에 로드되지 않습니다. 반대로 verbatimModuleSyntax에서 `import { Foo }`를 값인 줄 알고 썼다가 타입이면 TS1484로 막힙니다. 두 문제의 처방이 같습니다 — 타입은 `type`을 붙이고, 부수 효과가 필요한 모듈은 `import \"./x.js\"`를 따로 적습니다. 6.0 기본 `noUncheckedSideEffectImports`는 그 side-effect import의 경로가 틀리면 \"Cannot find module or type declarations for side-effect import of './missing.css'.\"(TS2882)로 잡아 줍니다.",
        code: "import { type Registry } from \"./registry.js\";   // 타입만 — 런타임 로드 없음\nimport \"./registry.js\";                           // 부수 효과가 필요하면 따로\n\nimport \"./missing.css\";\n// Cannot find module or type declarations for side-effect import of './missing.css'. (TS2882)  ← 6.0 기본",
      },
      {
        label: "다음 입구",
        body: "핸드북이 끝났습니다. 모듈의 깊은 규칙 — 호스트(Node·번들러)가 무엇을 하는지, module·moduleResolution 각 값의 뜻, ESM과 CJS가 섞일 때의 default 혼란 — 은 모듈 참고서 섹션 일곱 장이 다룹니다. 참고서 섹션의 열다섯 장은 순서 없이 필요한 것만 봐도 됩니다.",
      },
      {
        label: "확인 질문",
        body: "1) 두 .ts 파일에 같은 이름의 최상위 const가 있을 때 에러가 나는 조건과 고치는 한 줄은?\n2) `import { a, T }`에서 T가 타입이면 출력은 어떻게 되고, verbatimModuleSyntax는 왜 이걸 에러로 보나요?\n3) `import fs = require(\"fs\")`가 `module: esnext`에서 거부되는 이유는?\n4) target과 module이 각각 정하는 것을 한 문장씩.",
      },
    ],
    sources: [
      { label: "Modules", href: `${DOCS}/handbook/2/modules.html` },
      { label: "TSConfig — verbatimModuleSyntax", href: `${TSCONFIG}/#verbatimModuleSyntax` },
      { label: "Modules — Reference", href: `${DOCS}/handbook/modules/reference.html` },
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
      {
        label: "열다섯 항목의 성격: 셋으로 나뉜다",
        body: "항목들을 나란히 놓으면 세 묶음입니다.\n첫째는 핸드북의 보충(유틸리티 타입·타입 호환성·타입 추론·변수 선언·심벌·이터레이터)입니다. 핸드북 장의 모서리를 더 길게 적은 것입니다.\n둘째는 옛 기능과 그 자리(네임스페이스·네임스페이스와 모듈·삼중 슬래시·Enum·믹스인)입니다. 모듈 이전 시대의 문법이고, 문서가 '지금은 이렇게 하라'를 함께 적는 것입니다.\n셋째는 다른 생태계와의 접점(JSX·데코레이터)입니다. React와 프레임워크 데코레이터가 TypeScript에 요구한 것입니다.\n세 번째 묶음은 TypeScript 자체보다 바깥 사정에 따라 바뀌어서 버전 주의가 가장 필요합니다.",
        code: "핸드북 보충              옛 기능과 그 자리            바깥과의 접점\n──────────────────────   ─────────────────────────   ────────────────────\n유틸리티 타입 · 치트시트   네임스페이스 · ns 와 모듈      JSX (React)\n타입 호환성 · 타입 추론    삼중 슬래시 지시어             데코레이터 (TC39 vs legacy)\n변수 선언 · 심벌           Enum (vs as const 객체)\n이터레이터와 제너레이터    믹스인",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 참고서가 다루는 '제거되었거나 바뀐' 것들",
        body: "7.0.2에서 이 섹션의 몇 가지 문장이 더는 사실이 아닙니다. 네임스페이스 장의 `--outFile` 다중 파일 묶기는 \"Option 'outFile' has been removed.\"로 불가능하고, `module Legacy {}` 키워드는 \"A 'namespace' declaration should not be declared using the 'module' keyword.\"(TS1540) 에러이며, 이터레이터 장의 ES5 타깃 제한은 ES5 자체가 제거되어 의미가 없어졌습니다. 데코레이터 장은 여전히 '실험적 2단계 구현'을 설명하며 머리에 '3단계 데코레이터는 5.0부터'라고만 적고 있습니다. 각 시트에 '지금 어떤가'를 따로 적어 두었습니다.",
        code: "$ npx tsc --module amd --outFile out/all.js rt/ns.ts\nerror TS5102: Option 'outFile' has been removed. Please remove it from your configuration.\n\nrt/ns.ts(4,8): error TS1540: A 'namespace' declaration should not be declared using the 'module' keyword.\nPlease use the 'namespace' keyword instead.\n\n$ npx tsc --noEmit --target es5 rt/iter.ts\nerror TS5108: Option 'target=ES5' has been removed.",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "유틸리티 타입 장부터 열다섯 시트입니다. 가장 자주 돌아올 곳은 타입 호환성(왜 대입이 되지)과 타입 추론(왜 넓어지지)이고, Enum 장은 '쓸 것인가'의 판단까지 담고 있습니다.",
      },
    ],
    sources: [
      { label: "Utility Types", href: `${DOCS}/handbook/utility-types.html` },
      { label: "Type Compatibility", href: `${DOCS}/handbook/type-compatibility.html` },
    ],
  },

  {
    id: "ts-ref-utility",
    name: "유틸리티 타입",
    tagline: "lib.d.ts 에 미리 들어 있는 스물두 개의 타입 변환",
    intro:
      "전역으로 쓸 수 있는 타입 변환 모음입니다. 전부 핸드북 타입 조작 장의 재료(매핑된·조건부·infer·내장 문자열)로 쓰여 있습니다. 문서는 항목마다 '릴리스' 버전을 적습니다. 이 시트는 스물두 개를 한 줄씩, 그리고 6.0.3 타입 API로 각각 계산한 결과를 붙입니다.",
    blocks: [
      {
        label: "객체를 바꾸는 것: Partial 부터 Omit 까지",
        body: "객체를 바꾸는 유틸리티 타입은 Partial·Required·Readonly·Record·Pick·Omit입니다. Partial<T>(2.1)는 모든 속성을 선택적으로 만듭니다. Required<T>(2.8)는 전부 필수로 만듭니다. Readonly<T>(2.1)는 전부 readonly로 만듭니다. `Object.freeze`의 반환 타입이 Readonly<T>입니다. Record<K, T>(2.1)는 키 K에 값 T인 객체입니다. Pick<T, K>(2.1)는 K 키만 남깁니다. Omit<T, K>(3.5)는 K 키를 뺍니다. 실제로 6.0.3에서 `Partial<{ a: 1; b: 2 }>`는 `{ a?: 1 | undefined; b?: 2 | undefined }`였습니다. `Omit<{ a: 1; b: 2 }, \"a\">`는 `{ b: 2 }`였습니다.",
        code: "// 6.0.3 checker.typeToString\ntype P   = Partial<{ a: 1; b: 2 }>;        // { a?: 1 | undefined; b?: 2 | undefined; }\ntype R   = Required<{ a?: 1 }>;            // { a: 1; }\ntype RO  = Readonly<{ a: 1 }>;             // { readonly a: 1; }\ntype Rec = Record<\"x\" | \"y\", number>;      // { x: number; y: number; }\ntype Pk  = Pick<{ a: 1; b: 2 }, \"a\">;      // { a: 1; }\ntype Om  = Omit<{ a: 1; b: 2 }, \"a\">;      // { b: 2; }\n\n// 정의 (lib.es5.d.ts)\ntype Partial<T> = { [P in keyof T]?: T[P] };\ntype Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;",
      },
      {
        label: "유니온을 바꾸는 것: Exclude · Extract · NonNullable",
        body: "Exclude<U, E>(2.8)는 E에 대입 가능한 멤버를 빼고, Extract<T, U>(2.8)는 U에 대입 가능한 멤버만 남기고, NonNullable<T>(2.8)는 null과 undefined를 뺍니다. 셋 다 분배 조건부 타입입니다 — `T extends U ? never : T`. 실제로 `Exclude<\"a\" | \"b\" | \"c\", \"a\">`는 `\"b\" | \"c\"`, `Extract<\"a\" | \"b\" | 1, string>`은 `\"a\" | \"b\"`, `NonNullable<string | null | undefined>`는 string이었습니다.",
        code: "type Exc = Exclude<\"a\" | \"b\" | \"c\", \"a\">;          // \"b\" | \"c\"\ntype Ext = Extract<\"a\" | \"b\" | 1, string>;         // \"a\" | \"b\"\ntype NN  = NonNullable<string | null | undefined>;  // string\n\n// 정의 — 분배 조건부\ntype Exclude<T, U> = T extends U ? never : T;\ntype NonNullable<T> = T & {};   // 4.8 부터 이 정의",
      },
      {
        label: "실제로 돌려 보면: 함수와 클래스에서 꺼내는 것",
        body: "Parameters<F>(3.1)는 매개변수 튜플을 꺼냅니다. ConstructorParameters<C>(3.1)는 생성자 매개변수 튜플을 꺼냅니다. ReturnType<F>(2.8)는 반환 타입을, InstanceType<C>(2.8)는 인스턴스 타입을 꺼냅니다. 문서의 주의가 있습니다. 오버로드는 마지막 시그니처를 씁니다. any를 넣으면 unknown[]이고, never를 넣으면 never입니다. ThisParameterType<F>(3.3)는 this 매개변수 타입입니다(없으면 unknown). OmitThisParameter<F>(3.3)는 this 매개변수를 뺀 함수 타입입니다. Awaited<T>(4.5)는 Promise를 재귀적으로 벗깁니다. 실제로 `Parameters<(a: number, b: string) => void>`는 이름이 남은 튜플 `[a: number, b: string]`이었습니다. `ConstructorParameters<typeof Date>`는 `[value: string | number | Date]`였습니다. `Awaited<Promise<Promise<number>>>`는 number였습니다.",
        code: "type Pa = Parameters<(a: number, b: string) => void>;   // [a: number, b: string]\ntype CP = ConstructorParameters<typeof Date>;            // [value: string | number | Date]\ntype RT = ReturnType<() => Promise<number>>;             // Promise<number>\ntype IT = InstanceType<typeof Map>;                      // Map<unknown, unknown>\ntype Aw = Awaited<Promise<Promise<number>>>;             // number\ntype TP = ThisParameterType<(this: Window, x: number) => void>;   // Window\ntype OT = OmitThisParameter<(this: Window, x: number) => void>;   // (x: number) => void\n\n// 정의\ntype ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;",
      },
      {
        label: "NoInfer · ThisType · 문자열 네 개",
        body: "NoInfer<T>(5.4)는 그 자리를 추론 후보에서 뺍니다. `createStreetLight(colors: C[], defaultColor?: NoInfer<C>)`에서 defaultColor가 C를 넓히지 못하게 하는 용도. 실제로 `noInfer(\"a\", 1)`은 두 번째 인자에서 \"Argument of type 'number' is not assignable to parameter of type 'string'.\"가 났습니다 — 첫 인자만으로 T가 string이 되었기 때문입니다. ThisType<T>(2.3)는 변환이 아니라 '객체 리터럴 안의 this가 T다'라는 표시이고 `noImplicitThis`가 켜져 있어야 동작합니다. Uppercase·Lowercase·Capitalize·Uncapitalize는 템플릿 리터럴 장의 내장 타입이고 .d.ts에는 `intrinsic`이라는 이름만 있습니다.",
        code: "const noInfer = <T,>(a: T, b: NoInfer<T>) => {};\nnoInfer(\"a\", 1);\n// Argument of type 'number' is not assignable to parameter of type 'string'. (TS2345)\n// — b 는 추론에 참여하지 않으니 T 는 \"a\" 에서만 결정된다\n\ntype Up = Uppercase<\"abc\">;     // \"ABC\"\ntype Cap = Capitalize<\"abc\">;   // \"Abc\"",
      },
      {
        label: "스물두 개 한눈에",
        body: "문서가 적은 릴리스 버전과 함께 정리합니다.",
        code: "이름                      버전   하는 일\n────────────────────────  ─────  ───────────────────────────────────────\nAwaited<T>                4.5    Promise 재귀 벗기기\nPartial<T>                2.1    모두 ?\nRequired<T>               2.8    모두 필수\nReadonly<T>               2.1    모두 readonly\nRecord<K, T>              2.1    K 키 → T 값\nPick<T, K>                2.1    K 만 남김\nOmit<T, K>                3.5    K 뺌\nExclude<U, E>             2.8    E 에 맞는 멤버 뺌\nExtract<T, U>             2.8    U 에 맞는 멤버만\nNonNullable<T>            2.8    null · undefined 뺌\nParameters<F>             3.1    매개변수 튜플\nConstructorParameters<C>  3.1    생성자 매개변수 튜플\nReturnType<F>             2.8    반환 타입 (오버로드 → 마지막)\nInstanceType<C>           2.8    인스턴스 타입\nNoInfer<T>                5.4    추론 후보에서 제외\nThisParameterType<F>      3.3    this 매개변수 타입\nOmitThisParameter<F>      3.3    this 매개변수 제거\nThisType<T>               2.3    객체 리터럴 this 표시 (noImplicitThis 필요)\nUppercase · Lowercase · Capitalize · Uncapitalize   intrinsic (4.1)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "없는 것이 필요하면 만듭니다 — DeepPartial, PickByValue 같은 것은 lib에 없고 타입 조작 장의 재료로 몇 줄이면 됩니다. 믹스인 장의 `Constructor<T>`도 사실상 유틸리티 하나를 직접 정의하는 예입니다.",
      },
      {
        label: "확인 질문",
        body: "1) Omit을 Pick과 Exclude로 정의해 보세요.\n2) 오버로드된 함수의 ReturnType은 어느 시그니처를 보나요?\n3) NoInfer가 없을 때 `f([\"red\", \"green\"], \"blue\")`에서 C가 어떻게 추론되고, NoInfer가 그걸 어떻게 바꾸나요?\n4) Capitalize의 정의가 .d.ts에 없는 이유는?",
      },
    ],
    sources: [
      { label: "Utility Types", href: `${DOCS}/handbook/utility-types.html` },
      { label: "TypeScript 5.4 — NoInfer", href: `${DOCS}/handbook/release-notes/typescript-5-4.html#the-noinfer-utility-type` },
    ],
  },

  {
    id: "ts-ref-cheat",
    name: "치트 시트",
    tagline: "한 장짜리 그림 네 개 — 제어 흐름 분석 · 인터페이스 · 타입 · 클래스",
    intro:
      "typescriptlang.org/cheatsheets 에는 내려받을 수 있는 그림 네 장이 있습니다. 제어 흐름 분석(Control Flow Analysis), 인터페이스(Interfaces), 타입(Types), 클래스(Classes)입니다. PDF와 PNG로 받을 수 있고, 네 장 묶음 zip도 있습니다. 텍스트 페이지가 아니라 그림입니다. 그래서 이 시트는 '각 장이 핸드북의 어디를 압축했는지'와, 실제로 압축해 두면 좋은 것들을 적습니다.",
    blocks: [
      {
        label: "네 장이 가리키는 핸드북의 자리",
        body: "제어 흐름 분석 장은 핸드북 좁히기 장을 한 그림으로 압축한 것입니다. if/else·typeof·instanceof·in·판별 유니온·타입 가드·단언 함수·never 소진이 들어 있습니다.\n인터페이스 장은 일상적인 타입의 인터페이스 절과 객체 타입 장입니다. extends·제네릭·오버로드·getter/setter·인덱스 시그니처·readonly가 들어 있습니다.\n타입 장은 타입 조작 장입니다. 유니온·교차·조건부·매핑된·템플릿 리터럴·튜플·typeof·keyof가 들어 있습니다.\n클래스 장은 클래스 장입니다. 가시성·abstract·static·매개변수 속성·데코레이터·제네릭 클래스가 들어 있습니다.\n그림마다 '언제 interface 대신 type을 쓰나' 같은 결정 메모가 한 귀퉁이에 있습니다.",
        code: "치트 시트              압축한 핸드북 장\n────────────────────  ───────────────────────────────────\nControl Flow Analysis  좁히기\nInterfaces             일상적인 타입 — 인터페이스 · 객체 타입\nTypes                  타입 조작 (여덟 절)\nClasses                클래스",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 제어 흐름 한 장을 코드로",
        body: "치트 시트의 제어 흐름 장을 글로 옮기면 좁히기 시트의 규칙표입니다. 6.0.3 타입 API로 각 분기의 타입을 뽑아 둔 것이 그 장의 '실행 가능한 버전'입니다. `typeof pad === \"number\"` 분기에서 pad가 `never`로 잡히는 것(pad는 boolean | string이라 number일 수 없음)이 치트 시트의 '불가능한 분기는 never' 메모와 같은 사실입니다.",
        code: "function pad(input: string | number, pad: boolean | string) {\n  if (typeof pad === \"number\") { return pad; }   // pad → never  (불가능한 분기)\n  return input;                                   // input → string | number\n}\nfunction ex(k: \"a\" | \"b\") {\n  if (k === \"a\") return 1;    // 1\n  else return k;              // k → \"b\"  (나머지)\n}\n// ex: (k: \"a\" | \"b\") => 1 | \"b\"",
      },
      {
        label: "직접 만들어 두면 좋은 다섯째 장: 설정",
        body: "네 장에 없는 것이 하나 있습니다 — tsconfig. 7.0 기준으로 '켜져 있는 것'과 '제거된 것'을 한 장으로 가지고 있으면 옛 글을 읽을 때 걸러 낼 수 있습니다. 이 허브의 프로젝트 설정 섹션이 그 장 역할을 합니다.",
        code: "7.0 기본 켜짐             7.0 에서 제거됨 (적으면 에러)\n───────────────────────  ─────────────────────────────────────────\nstrict: true              target: es5\nmodule: esnext            module: amd · umd · system · none\ntarget: es2025            moduleResolution: classic · node10\ntypes: []                 baseUrl · outFile · downlevelIteration\nrootDir: .                esModuleInterop: false · alwaysStrict: false\nnoUncheckedSideEffectImports: true\nlibReplacement: false",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "그림은 기억을 돕는 도구이고 규칙의 출처는 핸드북입니다. 그림에서 모르는 항목을 만나면 위 표의 장으로 돌아가면 됩니다.",
      },
    ],
    sources: [
      { label: "Cheat Sheets", href: "https://www.typescriptlang.org/cheatsheets/" },
      { label: "Narrowing", href: `${DOCS}/handbook/2/narrowing.html` },
    ],
  },

  {
    id: "ts-ref-decorators",
    name: "데코레이터",
    tagline: "표준(5.0+) 과 실험적(--experimentalDecorators) 은 다른 기능이다",
    intro:
      "참고서의 데코레이터 페이지는 머리에 이렇게 적습니다. '이 문서는 실험적 2단계 데코레이터 구현을 가리킨다. 3단계 데코레이터 지원은 TypeScript 5.0부터 가능하다.' 즉 페이지 본문은 legacy(`--experimentalDecorators`)이고, 지금 기본으로 켜지는 것은 TC39 표준 데코레이터입니다. 둘은 시그니처·종류·메타데이터 전부 다릅니다. 이 시트는 둘을 나란히 두고 실제로 돌려 본 결과로 가릅니다.",
    blocks: [
      {
        label: "두 세계: 시그니처가 다르다",
        body: "표준 데코레이터는 `(value, context)` 두 인자를 받습니다. context에 `kind`(\"class\" | \"method\" | \"getter\" | \"setter\" | \"field\" | \"accessor\")·`name`·`static`·`private`·`addInitializer`·`metadata`가 들어 있습니다. legacy는 `(target, propertyKey, descriptor)` 세 인자입니다. 같은 `@logged`를 두 모드에서 돌리면 전혀 다른 것이 들어옵니다. 실제로 표준 모드에서는 \"standard decorator sees method m false false\", legacy 모드에서는 \"legacy decorator sees object m function\"이 찍혔습니다. 그리고 표준 모드용으로 쓴 데코레이터를 `--experimentalDecorators`로 컴파일하면 \"Unable to resolve signature of method decorator when called as an expression. Argument of type 'string' is not assignable to parameter of type 'ClassMethodDecoratorContext…'\"(TS1241)로 막힙니다 — 두 번째 인자로 문자열(propertyKey)이 오니까요.",
        code: "// 표준 (5.0+, 기본)\nfunction logged<T extends (...a: any[]) => any>(value: T, ctx: ClassMethodDecoratorContext) {\n  console.log(\"standard decorator sees\", ctx.kind, String(ctx.name), ctx.static, ctx.private);\n  return function (this: any, ...args: any[]) { console.log(\"→\", String(ctx.name), args); return\n    value.apply(this, args); } as T;\n}\nclass Svc { n = 1; @logged m(x: number) { return x + this.n; } }\nnew Svc().m(2);\n// standard decorator sees method m false false\n// → m [ 2 ]\n// 3\n\n// 같은 코드를 --experimentalDecorators 로\n// Unable to resolve signature of method decorator when called as an expression.\n//   Argument of type 'string' is not assignable to parameter of type 'ClassMethodDecoratorContext<…>'.\n  (TS1241)",
      },
      {
        label: "실제로 돌려 보면: legacy 의 평가 순서",
        body: "참고서 본문의 규칙입니다. 여러 데코레이터를 한 멤버에 걸면 '식은 위에서 아래로 평가되고, 결과는 아래에서 위로 호출된다'. 실제로 `@first() @second() m()`을 legacy로 돌리면 \"first(): factory evaluated\" → \"second(): factory evaluated\" → \"second(): called\" → \"first(): called\" 순서였습니다. 멤버 종류 간 순서는 인스턴스 멤버(매개변수 → 메서드/접근자/속성) → static 멤버 → 생성자 매개변수 → 클래스. 그리고 '속성 데코레이터는 디스크립터를 받지 않고 반환값이 무시된다', '한 멤버의 get과 set 둘 다에 데코레이터를 거는 것은 금지', 매개변수 데코레이터는 '선언됐다는 것을 관찰하는 데만' 쓸 수 있습니다. 표준 데코레이터에는 매개변수 데코레이터가 없습니다.",
        code: "// legacy (--experimentalDecorators) 실행 결과\nfirst(): factory evaluated\nsecond(): factory evaluated\nsecond(): called\nfirst(): called\nlegacy decorator sees object m function        ← 인스턴스 메서드 (target 은 prototype)\nlegacy decorator sees function s function      ← static 메서드 (target 은 생성자)",
        codeLang: "text",
      },
      {
        label: "표준의 도구: addInitializer 와 metadata",
        body: "표준 데코레이터에는 legacy에 없던 둘이 있습니다. `context.addInitializer(fn)`은 인스턴스가 만들어질 때(또는 클래스가 정의될 때) 돌 코드를 등록합니다 — 메서드를 this에 bind하는 `@bound`가 대표 예이고, 실제로 `const { k } = s; k()`가 1을 돌려줬습니다. `context.metadata`(5.2)는 클래스마다 하나인 객체이고 `Class[Symbol.metadata]`로 읽습니다. Node 24에는 Symbol.metadata가 아직 없어 `Symbol.metadata ??= Symbol(\"Symbol.metadata\")` 폴리필이 필요했고, 그러고 나니 `[Object: null prototype] { touched: 'm' }`이 읽혔습니다. 컴파일에는 `lib`에 `esnext.decorators`가 필요합니다.",
        code: "function bound(_v: any, ctx: ClassMethodDecoratorContext) {\n  ctx.addInitializer(function (this: any) { this[ctx.name] = this[ctx.name].bind(this); });\n}\nclass Svc { n = 1; @bound k() { return this.n; } }\nconst { k } = new Svc(); k();   // 1 — bind 되어 있다\n\n(Symbol as any).metadata ??= Symbol(\"Symbol.metadata\");   // Node 24 폴리필\nfunction meta(_v: any, ctx: ClassMethodDecoratorContext) { (ctx.metadata as any).touched =\n  String(ctx.name); }\nclass A { @meta m() {} }\n(A as any)[Symbol.metadata];   // [Object: null prototype] { touched: 'm' }\n// tsc --lib es2022,esnext.decorators,dom",
      },
      {
        label: "emit 의 모양과 reflect-metadata",
        body: "표준 데코레이터는 `__esDecorate`·`__runInitializers` 헬퍼로 컴파일되고, legacy는 `__decorate`로 컴파일됩니다(실제로 두 출력의 헬퍼 이름이 그렇게 갈렸습니다). legacy 세계의 `emitDecoratorMetadata`는 `reflect-metadata` 라이브러리와 함께 타입 정보를 런타임에 남기는 기능이고 문서가 '실험적이며 향후 호환성이 깨질 수 있다'고 적습니다. 표준 데코레이터는 `emitDecoratorMetadata`와 호환되지 않습니다(5.0 릴리스 노트). Angular·NestJS 같은 프레임워크가 legacy 시그니처와 메타데이터에 기대 왔기 때문에, 어느 모드인지는 프레임워크가 정합니다.",
        code: "모드      플래그                      인자                       메타데이터\n───────  ──────────────────────────  ─────────────────────────  ─────────────────────────\n표준 (5.0+)  없음 (기본)                  (value, context)           context.metadata · Symbol.metadata (5.2)\nlegacy   --experimentalDecorators    (target, key, descriptor)  --emitDecoratorMetadata + reflect-metadata\n\n표준에 없는 것: 매개변수 데코레이터 · emitDecoratorMetadata\nlegacy 에 없는 것: addInitializer · context.metadata · accessor 키워드",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 데코레이터는 타입을 바꾸지 않는다",
        body: "두 모드 공통의 사실입니다. 데코레이터가 클래스에 속성을 추가해도 TypeScript의 타입은 모릅니다. 참고서의 예 — `@reportableClassDecorator`가 `reportingURL`을 더했지만 `bug.reportingURL`은 \"Property 'reportingURL' does not exist on type 'BugReport'.\"(TS2339). 믹스인 장의 제약 절도 같은 말을 합니다. 타입에 반영하려면 믹스인(함수가 클래스를 돌려주는 패턴)을 쓰거나 인터페이스 병합으로 선언을 따로 적어야 합니다.",
      },
      {
        label: "다음 입구",
        body: "타입에 반영되는 클래스 확장은 참고서의 믹스인 장, 클래스에 선언을 덧붙이는 것은 선언 병합 장입니다. 표준 데코레이터의 전체 명세는 5.0 릴리스 노트의 Decorators 절에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) 참고서 데코레이터 페이지 본문이 설명하는 모드는 어느 쪽인가요?\n2) `@first() @second()`에서 팩토리 평가와 데코레이터 호출의 순서는?\n3) 표준 모드용 데코레이터를 `--experimentalDecorators`로 컴파일하면 어떤 에러가 나고 왜인가요?\n4) 데코레이터가 추가한 속성을 TypeScript가 모르는 이유는?",
      },
    ],
    sources: [
      { label: "Decorators (experimental, stage 2)", href: `${DOCS}/handbook/decorators.html` },
      { label: "TypeScript 5.0 — Decorators", href: `${DOCS}/handbook/release-notes/typescript-5-0.html#decorators` },
      { label: "TypeScript 5.2 — Decorator Metadata", href: `${DOCS}/handbook/release-notes/typescript-5-2.html#decorator-metadata` },
    ],
  },

  {
    id: "ts-ref-merging",
    name: "선언 병합",
    tagline: "같은 이름의 선언 둘이 하나로 합쳐지는 규칙",
    intro:
      "TypeScript의 선언은 네임스페이스·타입·값 세 그룹 중 하나 이상을 만듭니다. 같은 이름으로 두 번 선언하면 그룹별로 합쳐집니다. 인터페이스끼리, 네임스페이스끼리, 네임스페이스와 클래스·함수·enum. 클래스끼리는 안 됩니다. 모듈 보강(`declare module`)과 전역 보강(`declare global`)이 이 메커니즘의 가장 흔한 쓸모입니다.",
    blocks: [
      {
        label: "인터페이스 병합: 멤버는 합쳐지고, 함수는 오버로드가 된다",
        body: "`interface Box { height: number }`와 `interface Box { width: number }`를 같이 선언하면 둘 다 가진 하나의 Box입니다. 실제로 `{ height: 1, width: 2 }`가 그대로 들어갔습니다. 규칙 — '함수가 아닌 멤버는 이름이 유일해야 하고, 유일하지 않으면 같은 타입이어야 한다'. 함수 멤버는 오버로드로 쌓이는데 순서가 있습니다. 나중에 선언된 인터페이스의 오버로드가 앞에 오고, 각 인터페이스 안의 순서는 유지됩니다. 예외 하나 — 매개변수가 단일 문자열 리터럴인 '특수화된 시그니처'는 맨 위로 올라갑니다. 이것이 `document.createElement(\"div\")`가 HTMLDivElement를 돌려주는 메커니즘입니다.",
        code: "interface Box { height: number }\ninterface Box { width: number }\nconst b: Box = { height: 1, width: 2 };   // 합쳐진 Box\n\ninterface Doc { createElement(tag: any): Element; }\ninterface Doc { createElement(tag: \"div\"): HTMLDivElement; }\ninterface Doc { createElement(tag: \"span\"): HTMLSpanElement; }\n// 병합 결과 (특수화된 시그니처가 위로, 나중 인터페이스가 먼저)\n// createElement(tag: \"span\"): HTMLSpanElement;\n// createElement(tag: \"div\"): HTMLDivElement;\n// createElement(tag: any): Element;",
      },
      {
        label: "실제로 돌려 보면: 네임스페이스는 함수·enum·클래스에 붙는다",
        body: "네임스페이스를 같은 이름의 함수 뒤에 선언하면 함수에 속성이 붙습니다. `buildLabel.prefix`가 그 예입니다.\nenum 뒤에 두면 enum에 메서드가 붙습니다. `Color.mixColor`가 그 예입니다.\n클래스 뒤에 두면 클래스 안의 보조 클래스를 담을 수 있습니다. `Album.AlbumLabel`이 그 예입니다.\n세 경우 모두 '네임스페이스가 뒤에 와야' 합니다. 실제로 세 예제를 그대로 돌려 \"Hello, Sam\", `enum+namespace: 3 Up`(mixColor(\"yellow\") = red + green = 3), `lbl`을 얻었습니다. 컴파일 결과는 IIFE로 같은 객체에 속성을 더하는 모양입니다.",
        code: "function buildLabel(name: string) { return buildLabel.prefix + name + buildLabel.suffix; }\nnamespace buildLabel { export let suffix = \"\"; export let prefix = \"Hello, \"; }\nbuildLabel(\"Sam\");   // \"Hello, Sam\"\n\nenum Color { red = 1, green, blue }\nnamespace Color { export function mixColor(n: string) { return n === \"yellow\" ? Color.red + Color.green :\n  undefined; } }\nColor.mixColor(\"yellow\");   // 3\n\n// emit — 같은 객체에 덧붙인다\nvar Color;\n(function (Color) { Color[Color[\"red\"] = 1] = \"red\"; /* … */ })(Color || (Color = {}));\n(function (Color) { function mixColor(n) { /* … */ } Color.mixColor = mixColor; })(Color || (Color = {}));",
      },
      {
        label: "안 되는 병합: 클래스와 클래스, 타입 별칭과 무엇이든",
        body: "문서의 문장 — '클래스는 다른 클래스나 변수와 병합할 수 없다'. 실제로 `class Dup {} class Dup {}`는 \"Duplicate identifier 'Dup'.\"(TS2300) 두 개이고, 그래도 emit된 .js를 실행하면 \"SyntaxError: Identifier 'Dup' has already been declared\"입니다. 타입 별칭도 병합되지 않습니다 — `type Alias = …; interface Alias {}`는 같은 TS2300. 인터페이스가 병합되고 타입 별칭이 안 되는 이것이 일상적인 타입 장에서 '타입 별칭은 선언 병합에 참여하지 못하지만 인터페이스는 할 수 있다'고 한 문장의 근거입니다. 클래스를 흉내 내어 섞으려면 믹스인 장으로 갑니다.",
        code: "class Dup {} class Dup {}\n// Duplicate identifier 'Dup'. (TS2300) ×2\n\ntype Alias = { a: 1 }; interface Alias { b: 2 }\n// Duplicate identifier 'Alias'. (TS2300) ×2\n\n// 되는 것: 클래스 + 인터페이스 (인스턴스 타입에 멤버 추가)\nclass C { x = 1 } interface C { y: number } namespace C { export const z = 3; }\nconst c = new C(); c.y = 2; C.z;   // 전부 OK",
      },
      {
        label: "모듈 보강과 전역 보강",
        body: "`declare module \"./observable.js\" { interface Observable<T> { map<U>(f: (x: T) => U): Observable<U>; } }`처럼 이미 있는 모듈의 인터페이스에 멤버를 더하는 것이 모듈 보강입니다. 라이브러리의 타입에 플러그인이 추가한 메서드를 알리는 표준 방법입니다. 한계가 있습니다. '보강에서는 새 최상위 선언을 할 수 없고, 기존 선언에 대한 패치만'입니다. default export는 보강할 수 없고 named export만 됩니다. 전역에 더하려면 모듈 파일 안에서 `declare global { interface Array<T> { toObservable(): … } }`를 씁니다. 실제로 세 가지(모듈 인터페이스 보강, 전역 Array 보강, Window에 속성 추가)를 한 파일에서 선언하고 다른 파일에서 쓰는 것이 에러 없이 통과했습니다. 선언 파일 템플릿의 '모듈: 플러그인'과 '전역: 모듈 수정'이 이 둘의 뼈대입니다.",
        code: "// augment.ts\nimport \"./observable.js\";\ndeclare module \"./observable.js\" {\n  interface Observable<T> { map<U>(f: (x: T) => U): Observable<U>; }\n}\ndeclare global {\n  interface Array<T> { toObservable(): import(\"./observable.js\").Observable<T>; }\n  interface Window { __APP__: string; }\n}\nexport {};\n\n// use.ts\nnew Observable(1).map((x) => String(x));   // OK\n[1].toObservable();                        // OK\nwindow.__APP__ = \"x\";                      // OK\nwindow.__NOT_DECLARED__;\n// Property '__NOT_DECLARED__' does not exist on type 'Window & typeof globalThis'. (TS2339)",
      },
      {
        label: "문제의 구조: 이름 하나에 세 칸이 있고, 칸이 겹칠 때만 충돌한다",
        body: "모든 선언은 이름 하나에 '네임스페이스·타입·값' 세 칸 중 어느 칸을 채우는지가 정해져 있습니다. 인터페이스·타입 별칭은 타입 칸, 변수·함수는 값 칸, 클래스·enum은 타입과 값 둘, 네임스페이스는 네임스페이스 칸(값을 담으면 값 칸도). 병합이 되는가는 '같은 칸을 둘이 채우려 하는가'로 결정됩니다. 인터페이스 둘은 타입 칸을 함께 쓰도록 특별히 허용되고, 클래스 둘은 값 칸이 겹쳐 충돌, 타입 별칭은 타입 칸 공유를 허용하지 않습니다. 네임스페이스는 다른 칸이라 함수·클래스·enum 어디에나 붙습니다. 선언 파일의 '깊이 알아보기' 장이 이 표를 더 길게 다룹니다.",
        code: "선언          네임스페이스  타입  값\n───────────  ────────────  ────  ──\nnamespace    X             (X)   X*    * 값을 담으면\nclass                      X     X\nenum                       X     X\ninterface                  X\ntype alias                 X\nfunction                         X\nvariable                         X\n\n병합 가능: 같은 칸이어도 '합치기' 가 정의된 것 (interface+interface, namespace+namespace)\n또는 다른 칸 (namespace + class/function/enum, class + interface)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "병합을 '라이브러리 타입 확장'으로 쓰는 실전은 선언 파일 섹션의 템플릿(플러그인·전역 수정)에 있습니다. 클래스끼리 섞는 길은 믹스인 장, 네임스페이스 자체는 네임스페이스 장입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 두 인터페이스의 같은 이름 함수 멤버는 어떻게 되고 순서 규칙은?\n2) `class A {} class A {}`가 거부되는 이유와, 클래스를 확장하려면 무엇을 쓰나요?\n3) 모듈 보강에서 할 수 없는 것 두 가지는?\n4) `window.__APP__`을 에러 없이 쓰려면 무엇을 선언하나요?",
      },
    ],
    sources: [
      { label: "Declaration Merging", href: `${DOCS}/handbook/declaration-merging.html` },
      { label: "Module: Plugin .d.ts", href: `${DOCS}/handbook/declaration-files/templates/module-plugin-d-ts.html` },
    ],
  },

  {
    id: "ts-ref-enums",
    name: "이넘",
    tagline: "런타임에 남는 유일한 타입 선언, 그리고 as const 객체라는 대안",
    intro:
      "enum은 TypeScript가 JavaScript에 더한 몇 안 되는 '런타임 기능'입니다. 숫자 enum, 문자열 enum, 이질 enum(권하지 않음), 상수·계산 멤버, 유니온 enum과 멤버 타입, 런타임의 enum 객체, 역매핑, const enum과 그 함정, 앰비언트 enum, 그리고 마지막 절 'Objects vs Enums'가 `as const` 객체를 대안으로 내놓습니다. 5.8의 `erasableSyntaxOnly`와 Node의 타입 벗기기가 그 대안에 무게를 더했습니다.",
    blocks: [
      {
        label: "숫자 enum 과 역매핑, 문자열 enum",
        body: "`enum Dir { Up = 1, Down, Left, Right }`는 Up부터 1·2·3·4로 자동 증가합니다. 초기화자가 없으면 0부터 시작합니다. 숫자 enum은 컴파일되면 '이름 → 값'과 '값 → 이름' 양방향을 가진 객체가 됩니다(역매핑). 실제로 `Dir[3]`은 \"Left\"였습니다. `Object.keys(Dir)`는 `['1','2','3','4','Up','Down','Left','Right']` 여덟 개였습니다. 문자열 enum은 자동 증가도 역매핑도 없습니다. `Str[\"a\"]`는 undefined입니다. 계산 멤버 뒤에 초기화자 없는 멤버가 오면 \"Enum member must have initializer.\"(TS1061)가 납니다. 그리고 enum 타입에는 리터럴을 직접 넣을 수 없습니다. `const d: Dir = 5`는 \"Type '5' is not assignable to type 'Dir'.\"입니다. `const s: Str = \"a\"`도 \"Type '\"a\"' is not assignable to type 'Str'.\"입니다. 5.0부터 모든 enum이 유니온 enum이 되어 숫자도 엄격해졌습니다.",
        code: "enum Dir { Up = 1, Down, Left, Right }\nDir.Left;          // 3\nDir[3];            // \"Left\"   ← 역매핑\nObject.keys(Dir);  // ['1','2','3','4','Up','Down','Left','Right']\n\nenum Str { A = \"a\" }\n(Str as any)[\"a\"]; // undefined — 문자열 enum 은 역매핑 없음\n\nconst d: Dir = 5;  // Type '5' is not assignable to type 'Dir'. (TS2322)\nconst s: Str = \"a\";// Type '\"a\"' is not assignable to type 'Str'. (TS2322)",
      },
      {
        label: "실제로 돌려 보면: emit 과 const enum 인라이닝",
        body: "일반 enum은 IIFE로 객체를 만드는 코드가 됩니다. `const enum`은 '컴파일 중 완전히 제거'되고 쓰인 자리에 값이 인라인됩니다. 실제로 `const ce = CE.X + CE.Y`가 `const ce = 1 /* CE.X */ + 2 /* CE.Y */`로 나왔고 CE 객체는 출력에 없었습니다. 문서가 적는 const enum의 함정 — isolatedModules(파일 하나씩 변환하는 도구)에서는 다른 파일의 const enum 값을 알 수 없어 앰비언트 const enum 참조가 에러이고, 라이브러리가 .d.ts로 const enum을 내보내면 쓰는 쪽 컴파일러 버전에 따라 값이 달라질 수 있습니다. 처방은 `preserveConstEnums`로 객체도 남기거나, 린터로 const enum을 금지하거나, 아예 쓰지 않기입니다.",
        code: "// 입력\nenum Dir { Up, Down }\nconst enum CE { X = 1, Y = 2 }\nconst ce = CE.X + CE.Y;\n\n// tsc 출력\nvar Dir;\n(function (Dir) {\n    Dir[Dir[\"Up\"] = 0] = \"Up\";\n    Dir[Dir[\"Down\"] = 1] = \"Down\";\n})(Dir || (Dir = {}));\nconst ce = 1 /* CE.X */ + 2 /* CE.Y */;   // CE 는 사라졌다",
      },
      {
        label: "유니온 enum, 멤버 타입, keyof typeof",
        body: "멤버가 전부 리터럴이면 각 멤버가 타입이 됩니다. `ShapeKind.Circle` 타입의 자리에 `ShapeKind.Square`를 넣으면 \"Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.\"이 납니다. 그리고 겹치지 않는 비교는 잡힙니다. 실제로 `x !== E.Foo || x !== E.Bar`가 \"This comparison appears to be unintentional because the types 'E.Foo' and 'E.Bar' have no overlap.\"(TS2367)이었습니다. 첫 조건이 거짓이면 x는 E.Foo라 둘째 비교가 항상 참이기 때문입니다. 키 이름의 유니온이 필요하면 `keyof typeof Dir`를 씁니다. 실제로 `\"Up\" | \"Down\" | \"Left\" | \"Right\"`였습니다. `\"Diag\"`를 넣으면 \"Type '\"Diag\"' is not assignable to type '\"Down\" | \"Left\" | \"Right\" | \"Up\"'.\"입니다.",
        code: "enum E { Foo, Bar }\nfunction f(x: E) {\n  if (x !== E.Foo || x !== E.Bar) {}\n  //                 ~~~~~~~~~~~~\n  // This comparison appears to be unintentional because the types 'E.Foo' and 'E.Bar' have no overlap.\n    (TS2367)\n}\n\ntype K = keyof typeof Dir;   // \"Up\" | \"Down\" | \"Left\" | \"Right\"\nconst k: K = \"Diag\";\n// Type '\"Diag\"' is not assignable to type '\"Down\" | \"Left\" | \"Right\" | \"Up\"'. (TS2322)",
      },
      {
        label: "Objects vs Enums: as const 객체라는 대안",
        body: "문서의 마지막 절입니다. '현대 TypeScript에서는 as const 객체로 충분한 경우 enum이 필요하지 않을 수 있다'. `const ODirection = { Up: 0, Down: 1 } as const; type Direction = typeof ODirection[keyof typeof ODirection];`이면 값은 0 | 1, 키는 keyof typeof로 꺼내고, 런타임에는 평범한 객체입니다. 문서가 드는 장점 — 'JavaScript의 현재 상태와 코드베이스를 맞춰 둔다'. 두 가지 사정이 이 대안을 밀고 있습니다. 5.8의 `erasableSyntaxOnly`는 enum·namespace(값)·매개변수 속성·`import =`를 전부 \"This syntax is not allowed when 'erasableSyntaxOnly' is enabled.\"(TS1294)로 막고, Node 24의 기본 타입 벗기기도 enum을 \"TypeScript enum is not supported in strip-only mode\"로 거부합니다. 둘 다 '타입을 지우기만 하면 JavaScript가 되는 부분집합'을 겨냥한 것이고, enum은 그 밖에 있습니다.",
        code: "// enum 대신\nconst ODirection = { Up: 0, Down: 1, Left: 2, Right: 3 } as const;\ntype Direction = (typeof ODirection)[keyof typeof ODirection];   // 0 | 1 | 2 | 3\nfunction walk(dir: Direction) {}\nwalk(ODirection.Left);\n\n// 왜 — 지우기만으로 JavaScript 가 되는 쪽\n$ npx tsc --noEmit --erasableSyntaxOnly src/enums.ts\nsrc/enums.ts(1,6): error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.   # enum\nsrc/enums.ts(3,11): error TS1294: …   # namespace with value\nsrc/enums.ts(4,24): error TS1294: …   # constructor(public x)\n\n$ node src/enums.ts\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode",
      },
      {
        label: "문제가 나는 경우: enum 을 쓸 때의 표",
        body: "쓸지 말지의 판단 재료입니다.",
        code: "상황                                       enum                          as const 객체\n────────────────────────────────────────  ───────────────────────────   ─────────────────────────────\n값 → 이름 (역매핑)                         숫자 enum 만 자동               Object.entries 로 직접\n타입 벗기기만 하는 도구 (Node · esbuild)     const enum 불가 · Node 거부      그대로 동작\nisolatedModules / 단일 파일 변환            const enum 참조 에러             문제 없음\n.d.ts 로 내보내기                           const enum 은 값 불일치 위험      값이 .d.ts 에 그대로\n리터럴 직접 대입                            불가 (5.0+ 전부 유니온 enum)      가능 (0 | 1 타입)\n이질 enum (숫자 + 문자열)                   '권하지 않음'                    자연스럽게 섞임",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "enum을 네임스페이스와 병합해 메서드를 붙이는 예는 선언 병합 장에, `erasableSyntaxOnly`는 프로젝트 설정의 TSConfig 레퍼런스에, Node의 타입 벗기기는 튜토리얼의 Babel과 함께 쓰기(변환기들)에 이어집니다.",
      },
      {
        label: "확인 질문",
        body: "1) 숫자 enum을 컴파일하면 Object.keys가 몇 개인가요? 문자열 enum은?\n2) const enum이 isolatedModules에서 문제가 되는 이유는?\n3) `enum E { A }`를 `erasableSyntaxOnly`가 거부하는 이유와 대안은?\n4) `x !== E.Foo || x !== E.Bar`가 에러인 이유는?",
      },
    ],
    sources: [
      { label: "Enums", href: `${DOCS}/handbook/enums.html` },
      { label: "TypeScript 5.8 — erasableSyntaxOnly", href: `${DOCS}/handbook/release-notes/typescript-5-8.html#the---erasablesyntaxonly-option` },
      { label: "TypeScript 5.0 — All enums Are Union enums", href: `${DOCS}/handbook/release-notes/typescript-5-0.html#all-enums-are-union-enums` },
    ],
  },

  {
    id: "ts-ref-iterators",
    name: "이터레이터와 제너레이터",
    tagline: "Symbol.iterator 가 있으면 돌 수 있다 — for..of 와 for..in 의 차이",
    intro:
      "`Symbol.iterator` 메서드를 가진 객체가 이터러블입니다. Array·Map·Set·String·타입 배열이 내장 이터러블이고, `Iterable<T>`를 매개변수 타입으로 쓸 수 있습니다. `for..of`는 값을, `for..in`은 키(문자열)를 돕니다. 참고서의 이 장은 ES5 타깃의 제한(배열만 for..of 가능)을 길게 다루는데, ES5가 7.0에서 제거되어 그 절은 역사가 됐습니다. 제너레이터는 제목에만 있고 본문에 없습니다.",
    blocks: [
      {
        label: "for..of 와 for..in",
        body: "`for (const i in list)`는 인덱스를 문자열로 돌립니다 — 실제로 `\"0\" string`, `\"1\" string`. `for (const v of list)`는 값 4, 5, 6을 돌립니다. 객체에는 for..in만 되고(키 순회), for..of는 Symbol.iterator가 없어 거부됩니다. 실제로 `for (const v of { a: 1 })`은 컴파일에서 \"Type '{ a: number; }' must have a '[Symbol.iterator]()' method that returns an iterator.\"(TS2488)이고, 억지로 실행하면 \"TypeError: {(intermediate value)} is not iterable\"입니다. Map은 `[k, v]` 엔트리를, 문자열은 코드 포인트 하나씩을 돌립니다.",
        code: "const list = [4, 5, 6];\nfor (const i in list) console.log(i, typeof i);   // \"0\" string, \"1\" string, \"2\" string\nfor (const v of list) console.log(v);             // 4, 5, 6\n\nfor (const v of { a: 1 }) {}\n// Type '{ a: number; }' must have a '[Symbol.iterator]()' method that returns an iterator. (TS2488)\n\nconst m = new Map([[\"a\", 1]]);\nfor (const [k, v] of m) console.log(k, v);        // a 1",
      },
      {
        label: "실제로 돌려 보면: 직접 만드는 이터러블과 제너레이터",
        body: "`*[Symbol.iterator]() { yield 7; }`를 가진 객체 리터럴은 `Iterable<number>`에 대입되고 `[...it]`로 펼쳐집니다. 제너레이터 함수 `function* gen() { yield 1; yield 2; return \"done\"; }`는 호출 즉시 실행되지 않고 이터레이터를 돌려줍니다. `next()`를 부를 때마다 `{ value, done }`이 나오고, return 값은 `done: true`와 함께 한 번 나온 뒤 `{ value: undefined, done: true }`가 반복됩니다. 실제로 `[...gen()]`은 `[1, 2]`(return 값은 펼치기에 안 들어감)였습니다. 타입은 `Generator<1 | 2, string, unknown>`으로 잡힙니다.",
        code: "function* gen() { yield 1; yield 2; return \"done\"; }\nconst g = gen();\n[...gen()];   // [1, 2]  — return 값은 안 들어간다\ng.next();     // { value: 1, done: false }\ng.next();     // { value: 2, done: false }\ng.next();     // { value: 'done', done: true }\ng.next();     // { value: undefined, done: true }\n\nconst it: Iterable<number> = { *[Symbol.iterator]() { yield 7; } };\n[...it];      // [7]",
      },
      {
        label: "ES5 타깃의 제한은 역사가 됐다",
        body: "이 장의 절반은 'ES5를 타깃하면 이터레이터는 배열에만 허용된다. Symbol.iterator를 구현한 값이라도 배열이 아니면 for..of가 에러다'와 그 우회(`downlevelIteration`)입니다. ES5에는 Symbol도 이터레이터 프로토콜도 없어 for..of를 인덱스 for 문으로 바꿔 쓸 수밖에 없었기 때문입니다. 7.0에서 `--target es5`와 `--downlevelIteration`이 둘 다 제거되어 이 절은 더는 적용되지 않습니다. 실제로 둘 다 \"Option '…' has been removed.\"입니다. 가장 낮은 target인 es2015부터 이터레이터 프로토콜이 있으니 for..of는 그대로 나옵니다.",
        code: "$ npx tsc --noEmit --target es5 rt/iter.ts\nerror TS5108: Option 'target=ES5' has been removed. Please remove it from your configuration.\n$ npx tsc --noEmit --downlevelIteration rt/iter.ts\nerror TS5102: Option 'downlevelIteration' has been removed. Please remove it from your configuration.\n\n# es2015+ 출력 — for..of 가 그대로 남는다\nfor (const v of list) { console.log(\"of:\", v); }",
        codeLang: "bash",
      },
      {
        label: "strictBuiltinIteratorReturn 과 Iterator 헬퍼 (5.6)",
        body: "5.6은 `Iterator` 헬퍼(map·filter·take…)의 타입과 함께 `strictBuiltinIteratorReturn`을 strict 묶음에 넣었습니다. 내장 이터레이터(배열의 `values()`, Map의 `entries()`)의 `next()` 반환값은 `IteratorResult<T, undefined>`로 — 끝났을 때 value가 any가 아니라 undefined로 — 잡힙니다. 끝난 뒤 `value`를 멋대로 쓰는 코드가 잡히는 효과입니다. 직접 쓴 제너레이터의 return 타입은 그대로 세 번째 타입 인자(`Generator<T, TReturn, TNext>`)로 남습니다.",
        code: "const it = [1, 2].values();\nconst r = it.next();\n// r: IteratorResult<number, undefined>   ← strictBuiltinIteratorReturn (strict 포함)\nif (!r.done) r.value.toFixed();          // number\n\n// 5.6 Iterator 헬퍼 (lib esnext.iterator)\n[1, 2, 3].values().map((x) => x * 2).filter((x) => x > 2).toArray();   // [4, 6]",
      },
      {
        label: "다음 입구",
        body: "Symbol.iterator가 '잘 알려진 심벌'이고 그 목록이 심볼 장에 있습니다. 비동기 이터레이터(`Symbol.asyncIterator`, `for await`)와 제너레이터의 깊은 쓰임은 JavaScript 허브의 제너레이터·비동기 반복 장에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `for (const i in [4, 5, 6])`의 i는 무엇이고 어떤 타입인가요?\n2) 객체 리터럴에 for..of를 쓰면 컴파일·런타임 각각 어떤 에러가 나나요?\n3) `[...gen()]`에 return 값이 들어가나요?\n4) ES5 타깃 제한 절이 지금 적용되지 않는 이유는?",
      },
    ],
    sources: [
      { label: "Iterators and Generators", href: `${DOCS}/handbook/iterators-and-generators.html` },
      { label: "TypeScript 5.6 — Iterator Helper Methods", href: `${DOCS}/handbook/release-notes/typescript-5-6.html#iterator-helper-methods` },
    ],
  },

  {
    id: "ts-ref-jsx",
    name: "JSX",
    tagline: "jsx 옵션 다섯 값과 JSX 네임스페이스의 검사 규칙",
    intro:
      "`.tsx` 파일과 `jsx` 옵션이 있어야 JSX를 쓸 수 있습니다. 옵션 값은 다섯 — preserve·react·react-native·react-jsx·react-jsxdev. 타입 검사는 `JSX` 네임스페이스의 인터페이스(IntrinsicElements·ElementAttributesProperty·ElementChildrenAttribute·Element·ElementType)로 정해지고, React 프로젝트에서는 `@types/react`가 그 네임스페이스를 채웁니다. `.tsx`에서는 꺾쇠 단언 `<T>x`를 쓸 수 없고 `as`만 됩니다.",
    blocks: [
      {
        label: "jsx 옵션 다섯 값과 emit",
        body: "preserve는 JSX를 그대로 두고 `.jsx`로 내보냅니다. Babel 같은 다음 단계가 처리합니다.\nreact는 `React.createElement(...)`로 바꿉니다.\nreact-native는 JSX를 유지하되 `.js`로 내보냅니다.\nreact-jsx(17+ 자동 런타임)는 `react/jsx-runtime`의 `_jsx`·`_jsxs`를 import해 호출로 바꿉니다.\nreact-jsxdev는 디버그 정보가 붙는 `_jsxDEV`를 씁니다.\n실제로 같은 `.tsx`를 react-jsx로 컴파일하면 `import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from \"react/jsx-runtime\"`이 자동으로 들어갔습니다. preserve는 소스 그대로 `react-jsx.jsx`를 썼습니다. `jsxFactory`(react 모드의 함수 이름, 실제로 `h`로 바꾸면 `h(\"foo\", { … })`), `jsxFragmentFactory`, `jsxImportSource`(react-jsx 모드의 모듈)로 바꿉니다.",
        code: "// 입력 rt/react-jsx.tsx\nexport const App = () => <div className=\"a\"><span>hi</span><></></div>;\n\n// --jsx react-jsx\nimport { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from \"react/jsx-runtime\";\nexport const App = () => _jsxs(\"div\", { className: \"a\", children: [_jsx(\"span\", { children: \"hi\" }),\n  _jsx(_Fragment, {})] });\n\n// --jsx preserve  → react-jsx.jsx (그대로)\nexport const App = () => <div className=\"a\"><span>hi</span><></></div>;\n\n// --jsx react --jsxFactory h\nconst a = h(\"foo\", { requiredProp: \"bar\" });",
      },
      {
        label: "실제로 돌려 보면: IntrinsicElements 가 소문자 태그의 사전이다",
        body: "소문자 태그(`<foo />`)는 내장 요소, 대문자(`<Foo />`)는 값 기반 요소(함수·클래스 컴포넌트)입니다. 내장 요소의 허용 목록과 속성은 `JSX.IntrinsicElements`에 적습니다. 실제로 `foo: { requiredProp: string; optionalProp?: number }`만 선언한 뒤 `<bar />`는 \"Property 'bar' does not exist on type 'JSX.IntrinsicElements'.\"(TS2339), `<foo requiredProp={0} />`는 \"Type 'number' is not assignable to type 'string'.\", 모르는 속성 `extra`는 \"Property 'extra' does not exist on type '{ requiredProp: string; optionalProp?: number | undefined; }'.\"였습니다. 반면 `data-x=\"ok\"`처럼 하이픈이 든 속성은 모르는 이름이어도 에러가 아닙니다(문서의 규칙). IntrinsicElements가 없으면 모든 태그가 any로 허용되고 noImplicitAny에서 \"JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.\"(TS7026)가 납니다 — @types/react 없이 .tsx를 컴파일할 때 보는 에러입니다.",
        code: "declare namespace JSX {\n  interface IntrinsicElements { foo: { requiredProp: string; optionalProp?: number }; }\n}\nconst a = <foo requiredProp=\"bar\" />;        // OK\nconst b = <foo requiredProp={0} />;          // Type 'number' is not assignable to type 'string'. (TS2322)\n// Property 'bar' does not exist on type 'JSX.IntrinsicElements'. (TS2339)\nconst c = <bar />;\nconst d = <foo requiredProp=\"x\" data-x=\"ok\" extra=\"no\" />;\n// Property 'extra' does not exist on type '{ requiredProp: string; optionalProp?: number | undefined; }'.\n// — data-x 는 하이픈이라 통과\n\n// @types/react 없이 .tsx 를 컴파일하면\n// JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists. (TS7026)\n// This JSX tag requires the module path 'react/jsx-runtime' to exist, but none could be found. (TS2875)",
      },
      {
        label: "JSX 네임스페이스의 나머지 조각",
        body: "값 기반 요소의 props는 `JSX.ElementAttributesProperty`가 가리키는 속성(React는 `props`)에서 읽습니다. 함수 컴포넌트는 `JSX.Element`를 돌려줘야 합니다. `JSX.IntrinsicAttributes`(key)와 `JSX.IntrinsicClassAttributes<T>`(ref)는 모든 요소에 허용되는 추가 속성입니다. 자식 검사는 `JSX.ElementChildrenAttribute`가 이름(`children`)을 정합니다(2.3). 5.1의 `JSX.ElementType`은 '무엇이 컴포넌트가 될 수 있는가'를 덮어씁니다. React 18의 비동기 컴포넌트가 가능해진 자리입니다. JSX 표현식의 결과 타입은 `JSX.Element`로 불투명합니다. 네임스페이스를 찾는 위치는 모드에 따릅니다. react 모드는 jsxFactory의 네임스페이스 `React.JSX`에서 찾습니다. react-jsx는 `${jsxImportSource}/jsx-runtime`에서 찾습니다. 둘 다 없으면 전역 JSX입니다.",
        code: "JSX 네임스페이스 멤버            정하는 것\n──────────────────────────────  ─────────────────────────────────────\nIntrinsicElements                소문자 태그 목록과 속성 타입\nElementAttributesProperty        값 기반 요소에서 props 를 읽을 속성 이름 (React: props)\nElementChildrenAttribute         자식의 속성 이름 (children) — 2.3\nIntrinsicAttributes              모든 요소 허용 속성 (key)\nIntrinsicClassAttributes<T>      클래스 요소 허용 속성 (ref)\nElement                          JSX 식의 결과 타입 (불투명)\nElementClass                     클래스 컴포넌트가 만족할 인스턴스 타입\nElementType                      컴포넌트가 될 수 있는 타입 — 5.1",
        codeLang: "text",
      },
      {
        label: "문제: .tsx 에서 꺾쇠 단언이 파서 에러다",
        body: "`.ts`에서 되는 `<string>\"x\"`가 `.tsx`에서는 JSX 태그로 읽힙니다. 문서의 문장 — 'TypeScript는 .tsx 파일에서 꺾쇠 괄호 타입 단언을 허용하지 않는다'. 실제로 \"JSX element 'string' has no corresponding closing tag.\"(TS17008)와 \"'</' expected.\"가 났고, 이 파서 에러 때문에 그 파일의 다른 타입 에러는 보고되지 않았습니다. `.tsx`에서는 항상 `as`입니다.",
        code: "// rt/jsx.tsx\nconst asserted = <string>\"x\";\n// JSX element 'string' has no corresponding closing tag. (TS17008)\n// '</' expected. (TS1005)\n\nconst ok = \"x\" as string;   // .tsx 에서는 as 만",
      },
      {
        label: "다음 입구",
        body: "React 쪽에서 이 네임스페이스를 어떻게 채우는지, 컴포넌트 타입(`FC`, `ReactNode`, `ComponentProps`)은 React 허브의 TypeScript 절에 있습니다. `jsx` 옵션 자체는 프로젝트 설정의 TSConfig 레퍼런스(Language and Environment 그룹)입니다.",
      },
      {
        label: "확인 질문",
        body: "1) react-jsx 모드가 emit에 자동으로 넣는 import 한 줄은?\n2) `<bar />`가 에러인 조건과, `data-x`가 에러가 아닌 이유는?\n3) @types/react 없이 .tsx를 컴파일하면 어떤 두 에러가 나나요?\n4) `.tsx`에서 `<T>x`가 안 되는 이유는?",
      },
    ],
    sources: [
      { label: "JSX", href: `${DOCS}/handbook/jsx.html` },
      { label: "TSConfig — jsx", href: `${TSCONFIG}/#jsx` },
      { label: "TypeScript 5.1 — Decoupled Type-Checking Between JSX Elements and JSX Tag Types", href: `${DOCS}/handbook/release-notes/typescript-5-1.html` },
    ],
  },

  {
    id: "ts-ref-mixins",
    name: "믹스인",
    tagline: "클래스를 받아 클래스를 돌려주는 함수로 재사용 가능한 조각을 쌓는다",
    intro:
      "클래스는 하나만 extends할 수 있습니다. 믹스인은 '기반 클래스를 받아 그것을 확장한 클래스 표현식을 돌려주는 함수'로 여러 조각을 쌓는 패턴입니다. 재료는 생성자 타입 `type Constructor = new (...args: any[]) => {}`, 제네릭 제약, 클래스 표현식. 제약된 믹스인, 옛 대안 패턴, 그리고 제약(데코레이터와의 조합·static 속성)까지가 이 장입니다.",
    blocks: [
      {
        label: "패턴: 생성자 타입을 받아 확장한 클래스를 돌려준다",
        body: "`function Timestamped<TBase extends Constructor>(Base: TBase) { return class extends Base { timestamp = Date.now(); }; }`. TBase는 '어떤 생성자든'이고, 돌려주는 것은 그 생성자를 extends한 익명 클래스입니다. 여러 믹스인을 `Timestamped(Activatable(User))`처럼 겹치면 결과 클래스가 세 조각의 멤버를 모두 가집니다. 실제로 그렇게 만든 인스턴스에서 `u.id`(User), `u.timestamp`(Timestamped), `u.activate()`·`u.isActivated`(Activatable)가 전부 동작했고 출력은 `7 123 u true`였습니다. 문서의 주의 — 믹스인 안에서는 `private`·`protected` 멤버를 선언할 수 없고(익명 클래스의 private은 바깥에서 타입으로 표현할 수 없음), ES2020 `#private` 필드를 쓰라고 합니다.",
        code: "type Constructor<T = {}> = new (...args: any[]) => T;\n\nfunction Timestamped<TBase extends Constructor>(Base: TBase) {\n  return class extends Base { timestamp = 123; };\n}\nfunction Activatable<TBase extends Constructor<{ name: string }>>(Base: TBase) {\n  return class extends Base {\n    isActivated = false;\n    activate() { this.isActivated = true; return this.name; }   // 제약 덕에 this.name 사용 가능\n  };\n}\nclass User { name = \"u\"; constructor(public id = 1) {} }\nconst TimestampedActivatableUser = Timestamped(Activatable(User));\nconst u = new TimestampedActivatableUser(7);\nconsole.log(u.id, u.timestamp, u.activate(), u.isActivated);   // 7 123 u true",
      },
      {
        label: "실제로 돌려 보면: 제약된 믹스인은 모양이 맞는 기반만 받는다",
        body: "`Constructor<{ name: string }>`로 제약하면 name을 가진 클래스만 기반으로 넣을 수 있습니다. 실제로 `Activatable(class { id = 1 })`은 \"Argument of type 'typeof (Anonymous class)' is not assignable to parameter of type 'Constructor<{ name: string; }>'. Property 'name' is missing in type '(Anonymous class)' but required in type '{ name: string; }'.\"(TS2345)였습니다. 제네릭 장의 '클래스 타입을 제네릭에서 쓰기'(`new () => T`)가 바로 이 자리를 위한 것이었습니다.",
        code: "const Bad = Activatable(class { id = 1 });\n// Argument of type 'typeof (Anonymous class)' is not assignable to parameter of type\n  'Constructor<{ name: string; }>'.\n//   Property 'name' is missing in type '(Anonymous class)' but required in type '{ name: string; }'.\n  (TS2345)",
      },
      {
        label: "옛 대안: 인터페이스 병합 + applyMixins",
        body: "문서가 '이전에 권했던' 패턴입니다. 조각 클래스들을 따로 쓰고, 결과 클래스가 그 조각들을 `implements`하면서 `interface Sprite extends Jumpable, Duckable {}`로 인터페이스 병합을 걸고, 런타임에는 `applyMixins(Sprite, [Jumpable, Duckable])`로 프로토타입 메서드를 복사합니다. 타입은 선언 병합으로, 값은 Object.defineProperty로 각각 채우는 방식이라 둘이 어긋날 수 있고, 그래서 지금은 클래스 표현식 패턴을 권합니다.",
        code: "class Jumpable { jump() {} }\nclass Duckable { duck() {} }\nclass Sprite { x = 0; y = 0; }\ninterface Sprite extends Jumpable, Duckable {}   // 타입은 병합으로\napplyMixins(Sprite, [Jumpable, Duckable]);       // 값은 복사로\n\nfunction applyMixins(derivedCtor: any, constructors: any[]) {\n  constructors.forEach((baseCtor) => {\n    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {\n      Object.defineProperty(derivedCtor.prototype, name,\n        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));\n    });\n  });\n}",
      },
      {
        label: "제약: 데코레이터와 static",
        body: "문서는 제약 두 가지를 적습니다. 첫째, 데코레이터로 믹스인을 적용하면 타입에 반영되지 않습니다. `@Pausable class Player {}` 뒤에 `player.shouldFreeze`는 \"Property 'shouldFreeze' does not exist on type 'Player'.\"(TS2339)가 납니다. 데코레이터 장의 '데코레이터는 타입을 바꾸지 않는다'와 같은 사실입니다. 둘째, 클래스 표현식은 한 번 평가되면 하나의 클래스(싱글턴)입니다. 그래서 static 속성을 믹스인마다 따로 가지려면 제네릭 함수로 매번 새 클래스를 만들어야 합니다. 그리고 믹스인 안에서 `private` 멤버를 선언하면 돌려주는 클래스의 타입을 바깥에 내보낼 수 없어 에러가 되는 경우가 있습니다. 하드 private `#x`를 쓰는 것이 처방입니다.",
        code: "제약                               증상                                         처방\n─────────────────────────────────  ──────────────────────────────────────────  ─────────────────────────\n데코레이터로 믹스인 적용            Property 'shouldFreeze' does not exist…       함수 호출 패턴으로\n클래스 표현식은 싱글턴              static 이 모든 믹스인 결과에서 공유됨          제네릭 함수로 매번 생성\n믹스인 안의 private/protected       반환 타입을 표현할 수 없어 선언 에러            #private 필드",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "믹스인이 기대는 두 장 — 제네릭의 `new () => T`와 클래스의 클래스 표현식 — 은 핸드북에 있고, 믹스인이 대체하는 '클래스 병합 불가'는 선언 병합 장에, '타입을 바꾸지 않는 데코레이터'는 데코레이터 장에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `type Constructor<T = {}> = new (...args: any[]) => T`가 뜻하는 것은?\n2) `Activatable(class { id = 1 })`이 거부되는 이유는?\n3) 믹스인 안에서 private 대신 무엇을 쓰라고 하나요?\n4) 데코레이터로 믹스인을 적용하면 무엇이 안 되나요?",
      },
    ],
    sources: [
      { label: "Mixins", href: `${DOCS}/handbook/mixins.html` },
      { label: "Generics — Using Class Types in Generics", href: `${DOCS}/handbook/2/generics.html#using-class-types-in-generics` },
    ],
  },

  {
    id: "ts-ref-namespaces",
    name: "네임스페이스",
    tagline: "모듈 이전 시대의 코드 묶음 — 내부 모듈이라 불렸던 것",
    intro:
      "네임스페이스는 TypeScript가 ES 모듈 이전에 코드를 묶던 방법이고 예전 이름이 '내부 모듈(internal module)'입니다. `namespace Validation { export class … }`로 선언하고, 내보낸 것만 밖에서 보이고, 여러 파일에 걸쳐 같은 네임스페이스를 이어 쓸 수 있으며, `import q = x.y.z`로 별칭을 만들고, `.d.ts`에서 `declare namespace`로 외부 라이브러리를 기술합니다. 문서는 '`module` 키워드 대신 `namespace`를 쓰라'고 적고, 7.0은 그것을 에러로 올렸습니다.",
    blocks: [
      {
        label: "선언과 emit: IIFE 로 객체를 만든다",
        body: "네임스페이스는 컴파일되면 '변수 하나 + 그 변수에 속성을 채우는 즉시 실행 함수'가 됩니다. export한 것만 그 객체의 속성이 되고, export하지 않은 `lettersRegexp`는 함수 안의 지역 변수로 남아 밖에서는 undefined입니다. 중첩 네임스페이스는 안쪽 IIFE가 됩니다. 실제로 emit된 ns.js는 `var Validation; (function (Validation) { const lettersRegexp = …; class LettersOnly {…} Validation.LettersOnly = LettersOnly; let Inner; (function (Inner) { Inner.deep = 1; })(Inner = Validation.Inner || (Validation.Inner = {})); })(Validation || (Validation = {}));` 모양이었고, `(Validation as any).lettersRegexp`는 undefined였습니다. 같은 이름의 네임스페이스를 다시 선언하면 같은 객체에 덧붙여집니다(선언 병합) — 실제로 `Validation.added`가 2로 읽혔습니다.",
        code: "namespace Validation {\n  export interface StringValidator { isAcceptable(s: string): boolean; }\n  const lettersRegexp = /^[A-Za-z]+$/;                 // export 안 함 → 밖에서 안 보임\n  export class LettersOnly implements StringValidator { isAcceptable(s: string) { return\n    lettersRegexp.test(s); } }\n  export namespace Inner { export const deep = 1; }\n}\n\n// emit\nvar Validation;\n(function (Validation) {\n    const lettersRegexp = /^[A-Za-z]+$/;\n    class LettersOnly { isAcceptable(s) { return lettersRegexp.test(s); } }\n    Validation.LettersOnly = LettersOnly;\n    let Inner;\n    (function (Inner) { Inner.deep = 1; })(Inner = Validation.Inner || (Validation.Inner = {}));\n})(Validation || (Validation = {}));",
      },
      {
        label: "실제로 돌려 보면: module 키워드와 outFile 은 끝났다",
        body: "문서의 '다중 파일 네임스페이스' 절은 `/// <reference path=\"Validation.ts\" />`로 파일을 잇고 `tsc --outFile sample.js Test.ts`로 하나로 묶으라고 합니다. 7.0에서는 `--outFile`이 \"Option 'outFile' has been removed.\"(TS5102)로 사라졌습니다. 묶음은 번들러의 일이 됐습니다. `module Legacy { … }`처럼 옛 키워드로 네임스페이스를 선언하면 \"A 'namespace' declaration should not be declared using the 'module' keyword. Please use the 'namespace' keyword instead.\"(TS1540)입니다. 6.0에서 폐기됐고 7.0에서 에러가 됐습니다. 그리고 값을 가진 네임스페이스는 `erasableSyntaxOnly`에서 TS1294로 막힙니다. 타입만 담은 네임스페이스는 됩니다.",
        code: "$ npx tsc --module amd --outFile out/all.js rt/ns.ts\nerror TS5102: Option 'outFile' has been removed. Please remove it from your configuration.\n\nmodule Legacy { export const x = 1; }\n// A 'namespace' declaration should not be declared using the 'module' keyword. Please use the\n'namespace' keyword instead. (TS1540)\n\n$ npx tsc --noEmit --erasableSyntaxOnly src/enums.ts\nsrc/enums.ts(3,11): error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.   #\n  namespace NS { export const v = 1 }",
        codeLang: "text",
      },
      {
        label: "별칭과 앰비언트 네임스페이스",
        body: "`import polygons = Shapes.Polygons;`는 네임스페이스 안의 깊은 이름에 짧은 이름을 붙이는 별칭입니다. ES import와 다른 문법이고, 값에 대해서는 '원래 심벌과 별개의 참조'를 만듭니다. 실제로 `import deep = Validation.Inner.deep`으로 1을 읽었습니다. `.d.ts`에서 `declare namespace D3 { export interface Base {…} }`와 `declare var d3: D3.Base;`로 전역 라이브러리의 모양을 적는 것이 앰비언트 네임스페이스이고, 선언 파일 섹션의 전역 템플릿이 이 문법 위에 있습니다.",
        code: "import deep = Validation.Inner.deep;   // 별칭 — 1\n\n// d3.d.ts (앰비언트)\ndeclare namespace D3 {\n  export interface Selectors { select: { (selector: string): Selection; (element: EventTarget): Selection\n    } }\n  export interface Base extends Selectors { event: Event }\n}\ndeclare var d3: D3.Base;",
      },
      {
        label: "문제의 구조: 네임스페이스는 전역 객체이고, 모듈은 파일 스코프다",
        body: "네임스페이스가 하는 일은 '전역에 이름 하나만 두고 그 아래에 다 넣기'입니다. 스크립트 태그 여러 개가 전역을 공유하던 시대의 해법입니다. ES 모듈은 파일마다 스코프가 있어 그 문제가 처음부터 없습니다. 그래서 핸드북 모듈 장은 '네임스페이스는 JavaScript의 방향에 맞춰 모듈을 쓰라'고 적고, 다음 장 네임스페이스와 모듈이 둘을 비교합니다. 지금 네임스페이스가 남아 있는 자리는 둘 — .d.ts의 앰비언트 선언(값이 없으니 지워짐), 그리고 선언 병합으로 함수·클래스·enum에 타입을 붙이는 관용구(`declare namespace fn { interface Opts }`).",
        code: "네임스페이스                          ES 모듈\n──────────────────────────────────   ─────────────────────────────\n전역 변수 하나 + IIFE                 파일 = 스코프\n/// <reference path> + outFile        import / export + 번들러\n선언 병합으로 여러 파일에 걸침          파일 하나가 단위\n7.0: outFile 제거 · module 키워드 에러 지금의 기본\n남은 쓸모: .d.ts 의 declare namespace · 함수/클래스에 타입 붙이기",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "다음 장 네임스페이스와 모듈이 둘을 직접 비교하고 함정(모듈에 reference 지시어, 불필요한 네임스페이싱)을 적습니다. `declare namespace`의 실전은 선언 파일 섹션의 선언 레퍼런스와 전역 템플릿입니다.",
      },
      {
        label: "확인 질문",
        body: "1) export하지 않은 네임스페이스 멤버는 emit에서 어디로 가나요?\n2) `module X {}`가 7.0에서 에러인 이유는?\n3) 다중 파일 네임스페이스를 하나로 묶던 옵션은 무엇이고 지금은 어떻게 되나요?\n4) 네임스페이스가 지금도 쓰이는 두 자리는?",
      },
    ],
    sources: [
      { label: "Namespaces", href: `${DOCS}/handbook/namespaces.html` },
      { label: "Modules — TypeScript namespaces", href: `${DOCS}/handbook/2/modules.html#typescript-namespaces` },
    ],
  },

  {
    id: "ts-ref-ns-modules",
    name: "네임스페이스와 모듈",
    tagline: "둘을 나란히 놓고, 섞을 때 생기는 함정을 적는다",
    intro:
      "짧은 비교 페이지입니다. 모듈은 파일 스코프와 의존성 명시를 가지므로 '현대 코드에서는 모듈을 권한다'고 합니다. 네임스페이스는 전역 객체입니다. 함정은 둘입니다. 모듈 파일에 `/// <reference>`를 쓰는 것, 그리고 '불필요한 네임스페이싱'입니다. 그리고 outFile과 module 포맷의 조합 제한이 적혀 있습니다. outFile이 사라져 그 절은 끝났습니다.",
    blocks: [
      {
        label: "모듈을 쓰라",
        body: "문서의 문장 — '현대 코드에서는 네임스페이스보다 모듈을 권한다'. 이유는 모듈이 주는 둘입니다. 선언이 파일에 갇혀 전역을 더럽히지 않고, import로 의존성이 코드에 보여 번들러와 런타임이 따라갈 수 있습니다. 네임스페이스는 전역 객체라 어느 파일이 어느 파일에 기대는지가 코드에 없고, 로드 순서를 사람이 맞춰야 합니다.",
      },
      {
        label: "함정 1: 모듈에 /// <reference> 를 쓰는 것",
        body: "`/// <reference path=\"myModules.d.ts\" />`로 모듈 파일을 가리키면 그 파일은 '참조'되지만 '가져와지지' 않습니다. 모듈은 import로만 가져옵니다. 앰비언트 모듈 선언(`declare module \"SomeModule\" { … }`)은 .d.ts에 두고 `import x from \"SomeModule\"`로 씁니다. 삼중 슬래시 지시어 장도 '모듈에는 import를 쓰라'고 같은 말을 합니다.",
        code: "// 잘못\n/// <reference path=\"myModules.d.ts\" />\nimport * as m from \"SomeModule\";   // reference 는 모듈을 가져오지 않는다 — import 가 전부\n\n// 맞음 — myModules.d.ts\ndeclare module \"SomeModule\" { export function fn(): string; }\n// myOtherModule.ts\nimport * as m from \"SomeModule\";   // 앰비언트 선언은 types/typeRoots/include 로 프로그램에 들어가면 된다",
      },
      {
        label: "함정 2: 불필요한 네임스페이싱",
        body: "모듈 안에 네임스페이스를 또 두면 `shapes.Shapes.Triangle`처럼 이름이 두 겹이 됩니다. 모듈 자체가 이미 묶음이라 안의 네임스페이스는 겹입니다. 문서의 처방 — 모듈 최상위에 바로 export하고, 쓰는 쪽에서 `import * as shapes`로 이름을 붙이면 `shapes.Triangle`이 됩니다. 반대로 '한 파일에 네임스페이스 하나'라면 그 네임스페이스는 파일로 바꾸는 것이 맞습니다.",
        code: "// 겹\nexport namespace Shapes { export class Triangle {} }\nimport * as shapes from \"./shapes\"; new shapes.Shapes.Triangle();   // 두 겹\n\n// 평평하게\nexport class Triangle {}\nimport * as shapes from \"./shapes\"; new shapes.Triangle();",
      },
      {
        label: "실제로 돌려 보면: outFile 조합 절은 끝났다",
        body: "이 페이지의 '교환 조건' 절은 '`--outFile`은 commonjs·umd에서는 쓸 수 없고 amd·system에서는 1.8부터 쓸 수 있다'고 적습니다. 7.0에서는 `--outFile`·`--module amd`·`--module umd`·`--module system`이 전부 제거되어 이 절의 모든 조합이 \"Option '…' has been removed.\"입니다. 실제로 `--module amd --outFile out/all.js`는 TS5102와 TS5108을 함께 냈습니다. 묶음은 번들러(Vite·esbuild·Rollup)의 일입니다.",
        code: "$ npx tsc --module amd --outFile out/all.js rt/narrowing.ts\nerror TS5102: Option 'outFile' has been removed. Please remove it from your configuration.\nerror TS5108: Option 'module=AMD' has been removed. Please remove it from your configuration.",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "`/// <reference>`가 그럼 언제 맞는지는 다음 장 트리플 슬래시 지시어에, 앰비언트 모듈 선언 `declare module \"x\"`의 모양은 선언 파일 템플릿의 모듈 d.ts에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) 모듈이 네임스페이스보다 권해지는 두 이유는?\n2) 모듈 파일을 `/// <reference path>`로 가리키면 무엇이 안 되나요?\n3) `shapes.Shapes.Triangle`이 생기는 원인과 고치는 법은?",
      },
    ],
    sources: [
      { label: "Namespaces and Modules", href: `${DOCS}/handbook/namespaces-and-modules.html` },
      { label: "Triple-Slash Directives", href: `${DOCS}/handbook/triple-slash-directives.html` },
    ],
  },

  {
    id: "ts-ref-symbols",
    name: "심볼",
    tagline: "unique symbol 타입과 잘 알려진 심볼 열두 개",
    intro:
      "`symbol`은 ES2015의 원시 타입이고 `Symbol()`은 부를 때마다 유일한 값을 만듭니다. TypeScript는 여기에 `unique symbol` — 특정 심벌 하나만 가리키는 타입 — 을 더했고, const 선언과 readonly static 속성에만 허용합니다. 그리고 언어가 특별히 취급하는 잘 알려진 심볼(Symbol.iterator·Symbol.toPrimitive 등) 열두 개를 나열합니다.",
    blocks: [
      {
        label: "유일한 값, 그리고 unique symbol",
        body: "`Symbol(\"key\") === Symbol(\"key\")`는 false입니다. 설명 문자열이 같아도 다른 심벌입니다. 실제로 false였고, `s1.toString()`은 \"Symbol(key)\", `s1.description`은 \"key\"였습니다. 심벌 키 속성은 `Object.keys`와 `JSON.stringify`에 안 나옵니다. 실제로 `[]`와 `{}`였습니다. 타입 수준에서 `const s1 = Symbol()`의 타입은 `typeof s1`이라는 unique symbol입니다. 두 unique symbol은 서로 비교조차 할 수 없습니다. \"This comparison appears to be unintentional because the types 'typeof s1' and 'typeof s2' have no overlap.\"(TS2367)이 납니다. `let`에 `unique symbol`을 적으면 \"A variable whose type is a 'unique symbol' type must be 'const'.\"(TS1332)입니다.",
        code: "const s1 = Symbol(\"key\"); const s2 = Symbol(\"key\");\ns1 === s2;   // false (런타임)\n// This comparison appears to be unintentional because the types 'typeof s1' and 'typeof s2' have no\n  overlap. (TS2367)\n\nconst o = { [s1]: \"v\" };\no[s1];                // \"v\"\nObject.keys(o);       // []\nJSON.stringify(o);    // \"{}\"\n\nlet notConst: unique symbol = Symbol();\n// A variable whose type is a 'unique symbol' type must be 'const'. (TS1332)",
      },
      {
        label: "실제로 돌려 보면: 잘 알려진 심볼로 동작을 끼운다",
        body: "열두 개 — asyncIterator·hasInstance·isConcatSpreadable·iterator·match·replace·search·species·split·toPrimitive·toStringTag·unscopables. 이 심벌을 키로 메서드를 두면 언어의 내장 동작이 그 메서드를 부릅니다. 실제로 `[Symbol.toPrimitive](hint)`를 둔 클래스는 `+new Temp()`에서 42(hint \"number\"), 템플릿 리터럴에서 \"str\"(hint \"string\")을 냈고, `get [Symbol.toStringTag]()`는 `Object.prototype.toString.call()`을 \"[object Temp]\"로 바꿨습니다. Symbol.iterator는 이터레이터 장의 for..of가 찾는 그 키입니다. `Symbol.dispose`·`Symbol.asyncDispose`(5.2 `using`)는 이 페이지에는 없고 변수 선언 장에 있습니다.",
        code: "class Temp {\n  [Symbol.toPrimitive](hint: string) { return hint === \"number\" ? 42 : \"str\"; }\n  get [Symbol.toStringTag]() { return \"Temp\"; }\n}\n+new Temp();                                  // 42\n`${new Temp()}`;                              // \"str\"\nObject.prototype.toString.call(new Temp());   // \"[object Temp]\"",
      },
      {
        label: "쓸모: 충돌하지 않는 키와 브랜드",
        body: "심벌 키는 다른 코드와 절대 겹치지 않아 라이브러리가 객체에 '숨은' 속성을 둘 때 씁니다(Vue의 `__v_isRef` 같은 문자열 대신 심벌을 쓰는 경우). 타입 수준에서는 `declare const brand: unique symbol; type UserId = string & { [brand]: true }`처럼 브랜드 타입의 키로 써서 다른 브랜드와 구조적으로도 겹치지 않게 합니다. unique symbol은 선언마다 다른 타입이니 두 브랜드가 우연히 같아질 수 없습니다.",
        code: "declare const userBrand: unique symbol;\ndeclare const orderBrand: unique symbol;\ntype UserId = string & { readonly [userBrand]: true };\ntype OrderId = string & { readonly [orderBrand]: true };\n\nconst u = \"u1\" as UserId;\nconst o: OrderId = u;\n// Type 'UserId' is not assignable to type 'OrderId'. — 키가 다른 unique symbol 이라 구조적으로도 다르다",
      },
      {
        label: "다음 입구",
        body: "Symbol.iterator의 쓰임은 이터레이터 장, Symbol.dispose는 변수 선언 장의 `using`, 심벌을 keyof에 넣을 때 템플릿 리터럴이 거부하는 문제는 keyof 장에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `Symbol(\"a\") === Symbol(\"a\")`의 결과와 이유는?\n2) `let s: unique symbol`이 거부되는 이유는?\n3) `+obj`가 42를 돌려주게 하려면 어떤 심벌 메서드를 두나요?\n4) 브랜드 타입의 키로 unique symbol을 쓰는 이점은?",
      },
    ],
    sources: [
      { label: "Symbols", href: `${DOCS}/handbook/symbols.html` },
      { label: "Iterators and Generators", href: `${DOCS}/handbook/iterators-and-generators.html` },
    ],
  },

  {
    id: "ts-ref-triple",
    name: "트리플 슬래시 지시어",
    tagline: "/// 로 시작하는 컴파일러 지시 — 파일 맨 위에서만",
    intro:
      "`/// <reference … />`는 한 줄 주석 모양의 컴파일러 지시어입니다. path(파일 의존), types(@types 패키지), lib(내장 lib 파일), no-default-lib, amd-module, amd-dependency(폐기), preserve. 규칙 하나가 전부를 지배합니다 — '파일 맨 위에서만 유효하다. 문장이나 선언 뒤에 오면 보통 주석이다'.",
    blocks: [
      {
        label: "types · lib · path",
        body: "`/// <reference types=\"node\" />`는 `@types/node`에 대한 의존을 선언합니다 — import처럼 동작하되 타입 패키지를 가리킵니다. `/// <reference lib=\"es2017.string\" />`은 `lib` 옵션에 그 파일을 더하는 것과 같습니다(padStart 같은 API를 켬). `/// <reference path=\"…\" />`는 파일 사이의 의존과 출력 순서를 정하던 것인데, 다중 파일 네임스페이스와 outFile이 사라진 지금은 쓸 자리가 거의 없고 `noResolve`에서는 무시됩니다. 선언 파일 배포 장은 '`path` 대신 `types`를 쓰라'를 적신호 목록에 넣습니다.",
        code: "/// <reference types=\"node\" />          // @types/node 를 프로그램에\n/// <reference lib=\"es2017.string\" />   // lib 추가 — \"x\".padStart 가능\n/// <reference path=\"./legacy.ts\" />    // 파일 의존 (옛 방식, noResolve 면 무시)\n\nconst p: NodeJS.Process = process;\n\"x\".padStart(3, \"-\");",
      },
      {
        label: "실제로 돌려 보면: types 가 못 찾으면 TS2688, 그리고 6.0 의 types: []",
        body: "`@types/node`가 설치되지 않은 상태에서 `/// <reference types=\"node\" />`를 두면 \"Cannot find type definition file for 'node'.\"(TS2688)이고, 그 뒤의 `NodeJS`·`process`는 각각 TS2503·TS2591(\"Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.\")입니다. `--typeRoots`로 @types가 있는 폴더를 가리키자 셋 다 사라졌습니다. 6.0부터 `types`의 기본값이 `[]`로 바뀌어 `node_modules/@types`가 자동으로 들어오지 않습니다. 그래서 전역 타입(node·jest)이 갑자기 사라지면 tsconfig의 `types`에 적거나 파일 맨 위에 이 지시어를 두는 것이 처방이고, 에러 문구 자체가 그 두 길을 안내합니다.",
        code: "$ npx tsc --noEmit rt/triple.ts          # @types/node 없음\nrt/triple.ts(1,23): error TS2688: Cannot find type definition file for 'node'.\nrt/triple.ts(3,10): error TS2503: Cannot find namespace 'NodeJS'.\nrt/triple.ts(3,27): error TS2591: Cannot find name 'process'. Do you need to install type definitions for\n  node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.\n\n$ npx tsc --noEmit --typeRoots ts6/node_modules/@types rt/triple.ts\n(에러 없음)",
        codeLang: "bash",
      },
      {
        label: "맨 위에서만, 그리고 5.5 부터 emit 하지 않는다",
        body: "지시어는 파일의 첫 문장 앞에만 올 수 있습니다. 실제로 `const late = 1;` 뒤에 둔 `/// <reference types=\"jest\" />`는 아무 효과도 에러도 없었습니다 — 주석으로 읽힙니다. 5.5부터 컴파일러는 지시어를 출력 .js/.d.ts에 복사하지 않습니다. 남기려면 `preserve=\"true\"`를 붙입니다. `amd-module name=\"…\"`와 `amd-dependency`는 AMD 시대의 것이고 후자는 폐기(`import \"moduleName\"`을 쓰라), `no-default-lib=\"true\"`는 `noLib`처럼 기본 lib을 빼는 표시로 lib.d.ts 자체가 쓰는 것입니다.",
        code: "지시어                              역할                                      지금\n──────────────────────────────────  ───────────────────────────────────────  ───────────────\n<reference types=\"X\" />             @types/X 의존 선언                         쓰임 (6.0 types: [] 이후 더)\n<reference lib=\"X\" />               lib 파일 추가                              쓰임\n<reference path=\"X\" />              파일 의존·출력 순서                        거의 안 씀 (outFile 제거)\n<reference no-default-lib=\"true\" /> 기본 lib 제외 (lib.d.ts 용)                 내부용\n<amd-module name=\"X\" />             AMD 모듈 이름                              AMD 제거\n<amd-dependency path=\"X\" />         AMD 의존                                   폐기 — import 사용\npreserve=\"true\"                     출력에 지시어 남기기 (5.5+)                 필요할 때",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "`types` 옵션과 `typeRoots`는 프로젝트 설정의 TSConfig 레퍼런스에, `/// <reference types>`를 선언 파일에서 어떻게 쓰는지(그리고 UMD 라이브러리에는 쓰지 말라는 경고)는 선언 파일 섹션의 라이브러리 구조에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `/// <reference types=\"node\" />`가 TS2688을 내는 상황은?\n2) 6.0에서 `types`의 기본값이 무엇으로 바뀌었고, 그 영향으로 어떤 에러가 늘었나요?\n3) 문장 뒤에 둔 지시어는 어떻게 취급되나요?\n4) `path`와 `types` 중 선언 파일에서 권하는 것은?",
      },
    ],
    sources: [
      { label: "Triple-Slash Directives", href: `${DOCS}/handbook/triple-slash-directives.html` },
      { label: "TSConfig — types", href: `${TSCONFIG}/#types` },
      { label: "Publishing — Red flags", href: `${DOCS}/handbook/declaration-files/publishing.html` },
    ],
  },

  {
    id: "ts-ref-compat",
    name: "타입 호환성",
    tagline: "왜 이게 대입이 되지 — 구조적 서브타이핑의 규칙 전부",
    intro:
      "TypeScript의 호환성은 이름이 아니라 구조로 정해집니다. 이 장은 그 규칙을 객체·함수·enum·클래스·제네릭으로 나눠 적고, '건전하지 않은(unsound)' 자리를 솔직하게 나열합니다. 함수 매개변수의 이변성, 선택적·나머지 매개변수의 교환, 서로 다른 enum의 비호환, 클래스는 인스턴스 멤버만 비교, private 멤버의 출처 비교, 그리고 any·unknown·object·void·undefined·null·never의 대입표까지.",
    blocks: [
      {
        label: "객체: y 가 x 의 멤버를 전부 가지면 x 자리에 들어간다",
        body: "`interface Named { name: string }`에 `class Person { name = \"p\"; age = 1 }`의 인스턴스를 넣을 수 있습니다. Person이 Named를 implements하지 않았어도 됩니다. 규칙은 'y는 x와 최소한 같은 멤버를 가진다'. 속성이 더 있어도 변수로 넘기면 괜찮고, 객체 리터럴을 직접 쓸 때만 초과 속성 검사가 켜집니다(객체 타입 장). 문서의 '건전성에 대한 메모' — TypeScript의 타입 시스템은 컴파일 때 알 수 없는 동작을 허용하는 자리가 있고, 그런 자리를 '건전하지 않다'고 부르며 이 장이 그 자리를 밝힙니다.",
        code: "interface Named { name: string }\nclass Person { name = \"p\"; constructor(public age = 1) {} }\nlet n: Named = new Person();   // OK — implements 없이, age 가 더 있어도",
      },
      {
        label: "실제로 돌려 보면: 함수는 매개변수가 '적은' 쪽이 '많은' 쪽에 들어간다",
        body: "`let x = (a: number) => 0; let y = (b: number, s: string) => 0;`에서 `y = x`는 되고 `x = y`는 안 됩니다. 매개변수가 적은 함수는 많은 인자를 받는 자리에 들어가도 남는 인자를 무시하면 되기 때문입니다. 실제로 `x = y`만 \"Type '(b: number, s: string) => number' is not assignable to type '(a: number) => number'. Target signature provides too few arguments. Expected 2 or more, but got 1.\"였습니다. 이것이 `forEach((item) => …)`처럼 콜백 인자를 일부만 받는 코드가 되는 이유입니다. 반환 타입은 반대로 '소스가 타깃의 서브타입'이어야 합니다. 선택적 매개변수와 필수 매개변수는 서로 교환됩니다. 건전하지 않지만 흔한 콜백 패턴을 위해서입니다. 나머지 매개변수는 무한 선택 매개변수처럼 취급됩니다. 오버로드는 타깃의 각 시그니처가 소스의 어떤 시그니처에든 맞아야 합니다.",
        code: "let x = (a: number) => 0;\nlet y = (b: number, s: string) => 0;\ny = x;   // OK — 적은 쪽이 많은 자리에\nx = y;\n// Type '(b: number, s: string) => number' is not assignable to type '(a: number) => number'.\n//   Target signature provides too few arguments. Expected 2 or more, but got 1. (TS2322)\n\nconst items = [1, 2, 3];\nitems.forEach((item, index, array) => {});   // 셋 다\nitems.forEach((item) => {});                 // 하나만 — 같은 규칙",
      },
      {
        label: "매개변수 이변성과 strictFunctionTypes",
        body: "매개변수 타입을 비교할 때 TypeScript는 역사적으로 '어느 방향이든 대입 가능하면' 통과시켰습니다(이변성, bivariance). `(e: MouseEvent) => void`를 `(e: Event) => void` 자리에 넣는 것이 그 예입니다. 건전하지 않습니다. Event만 오면 e.button이 없습니다. 그래도 리스너 패턴에 흔해서 허용했습니다. `strictFunctionTypes`(strict에 포함)는 함수 타입에서 이 검사를 반공변(contravariant)으로 바꿉니다. 매개변수는 타깃이 소스보다 좁거나 같아야 합니다. 단 메서드 문법(`m(x): void`)으로 선언한 것은 여전히 이변적입니다. 실제로 같은 파일을 strictFunctionTypes 켜고 끄고 비교했습니다. 켰을 때 함수 속성 `p: (x: string | number) => void`에 `(x: string) => void`를 넣는 줄만 추가로 걸렸습니다(\"Types of parameters 'x' and 'x' are incompatible.\"). 메서드 `m(x: string | number): void`에 `m(x: string) {}`를 넣는 줄은 양쪽 모두 통과했습니다.",
        code: "let m1: { m(x: string | number): void } = { m(x: string) {} };          // 통과 — 메서드는 이변\nlet p1: { p: (x: string | number) => void } = { p: (x: string) => {} };\n// strictFunctionTypes (strict 포함):\n// Type '(x: string) => void' is not assignable to type '(x: string | number) => void'.\n//   Types of parameters 'x' and 'x' are incompatible.\n//     Type 'string | number' is not assignable to type 'string'.\n//       Type 'number' is not assignable to type 'string'. (TS2322)\n\n// --strictFunctionTypes false → 위 줄도 통과 (에러 수 6 → 5)",
        terms: [
          {
            term: "이변성 (bivariance) · 반공변 (contravariance)",
            body: "매개변수 비교에서 '소스→타깃 또는 타깃→소스 어느 방향이든 되면 OK'가 이변성, '타깃 매개변수가 소스 매개변수에 대입되어야'가 반공변입니다. 함수가 더 넓은 입력을 받을 수 있으면 더 좁은 입력 자리에 안전하게 들어간다는 것이 반공변의 뜻이고, 그 반대는 건전하지 않습니다.",
          },
        ],
      },
      {
        label: "enum · 클래스 · 제네릭",
        body: "enum은 숫자와는 호환되지만 서로 다른 enum끼리는 아닙니다. 실제로 `let st = Status.Ready; st = Color.Red`는 \"Type 'Color.Red' is not assignable to type 'Status'.\"였습니다. `st = 1`은 통과했습니다.\n클래스는 인스턴스 멤버만 비교하고 static과 생성자는 무시합니다. 생성자 시그니처가 다른 Animal과 Size가 서로 대입됐습니다. 예외가 private·protected입니다. '같은 선언에서 온' 멤버여야 하므로 각자 `private x`를 가진 두 클래스는 \"Types have separate declarations of a private property 'x'.\"로 비호환입니다. 구조적 시스템 안의 유일한 명목적 자리입니다.\n제네릭은 쓰이지 않은 타입 매개변수는 무시합니다(`Empty<number>`에 `Empty<string>` OK). 쓰인 것은 비교합니다(`NotEmpty<string>`→`NotEmpty<number>`는 \"Type 'string' is not assignable to type 'number'.\").",
        code: "enum Status { Ready, Waiting } enum Color { Red, Blue }\nlet st = Status.Ready;\nst = Color.Red;   // Type 'Color.Red' is not assignable to type 'Status'. (TS2322)\nst = 1;           // OK — 숫자와는 호환\n\nclass A2 { private x = 1 } class B2 { private x = 1 }\nlet a2: A2 = new B2();\n// Type 'B2' is not assignable to type 'A2'.\n//   Types have separate declarations of a private property 'x'. (TS2322)\n\ninterface Empty<T> {} let e1: Empty<number> = {} as Empty<string>;        // OK — T 가 안 쓰임\ninterface NotEmpty<T> { data: T } let ne1: NotEmpty<number> = {} as NotEmpty<string>;\n// Type 'string' is not assignable to type 'number'.",
      },
      {
        label: "특수 타입의 대입표",
        body: "문서 끝의 표를 strictNullChecks 기준으로 정리합니다.\nany는 never를 제외한 모든 것에 대입되고, 모든 것이 any에 대입됩니다.\nunknown은 any와 unknown에만 대입됩니다. 실제로 `let str: string = u`는 \"Type 'unknown' is not assignable to type 'string'.\"이었습니다. 모든 것이 unknown에 들어갑니다.\nnever는 모든 것에 대입되고, never에는 never만 들어갑니다.\nvoid에는 undefined(와 any·never)만 들어갑니다. undefined와 null은 서로에게도 다른 타입에도 못 들어갑니다(strictNullChecks).\nobject에는 원시값이 못 들어갑니다.\n이 표가 '서브타입 관계'와 '대입 가능성'의 차이를 설명합니다. 대입은 any와 enum↔number 규칙을 더한 것입니다.",
        code: "소스 ↓ / 타깃 →   any  unknown  object  void  undefined  null  never\n────────────────  ───  ───────  ──────  ────  ─────────  ────  ─────\nany                ·     ✓        ✓      ✓      ✓         ✓     ✗\nunknown            ✓     ·        ✗      ✗      ✗         ✗     ✗\nobject             ✓     ✓        ·      ✗      ✗         ✗     ✗\nvoid               ✓     ✓        ✗      ·      ✗         ✗     ✗\nundefined          ✓     ✓        ✗      ✓      ·         ✗     ✗\nnull               ✓     ✓        ✗      ✗      ✗         ·     ✗\nnever              ✓     ✓        ✓      ✓      ✓         ✓     ·\n(strictNullChecks 켜짐 기준 — 6.0+ 기본)",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 건전하지 않은 자리는 '편의를 위해 열어 둔 문' 이다",
        body: "이 장이 나열하는 건전하지 않은 자리 — 메서드 매개변수 이변성, 선택적·필수 매개변수 교환, 매개변수 적은 함수의 대입, readonly 무시 — 는 전부 '흔한 JavaScript 패턴을 에러로 만들지 않기 위해' 열어 둔 것입니다. 콜백에 인자를 다 안 받는 것, 리스너에 좁은 이벤트 타입을 쓰는 것. 그래서 TypeScript는 '건전한 타입 시스템'을 목표로 하지 않고 '유용한' 것을 목표로 한다고 설계 노트가 적습니다. strict 플래그들은 그 문 중 일부를 닫는 스위치이고, 전부 닫는 스위치는 없습니다.",
      },
      {
        label: "다음 입구",
        body: "'왜 대입이 되지'의 짝인 '왜 이 타입으로 추론되지'가 다음 장 타입 추론입니다. 함수 매개변수의 분산은 제네릭 장의 분산 어노테이션(in/out)으로, private 멤버의 명목적 성질은 클래스 장의 마지막 절로 이어집니다.",
      },
      {
        label: "확인 질문",
        body: "1) `y = x`는 되고 `x = y`는 안 되는 이유를 매개변수 수로 설명하세요.\n2) strictFunctionTypes가 메서드 문법에는 적용되지 않는 이유는?\n3) 모양이 같은 두 클래스가 비호환이 되는 유일한 조건은?\n4) unknown을 string에 대입할 수 없는데 string은 unknown에 대입되는 이유는?",
      },
    ],
    sources: [
      { label: "Type Compatibility", href: `${DOCS}/handbook/type-compatibility.html` },
      { label: "TSConfig — strictFunctionTypes", href: `${TSCONFIG}/#strictFunctionTypes` },
    ],
  },

  {
    id: "ts-ref-inference",
    name: "타입 추론",
    tagline: "적지 않은 타입을 어떻게 정하는가 — 최적 공통 타입과 문맥적 타이핑",
    intro:
      "`let x = 3`의 x가 number인 것이 추론입니다. 변수 초기화, 매개변수 기본값, 함수 반환에서 일어납니다. 이 장은 두 메커니즘을 적습니다. 여러 후보에서 하나를 고르는 '최적 공통 타입(best common type)', 그리고 식의 위치에서 타입이 흘러 들어오는 '문맥적 타이핑(contextual typing)'. 좁히기·제네릭·리터럴 넓힘이 전부 이 둘 위에 있습니다.",
    blocks: [
      {
        label: "최적 공통 타입: 후보들의 상위 타입을 찾는다",
        body: "`let x = [0, 1, null]`의 x는 `(number | null)[]`입니다. 요소 후보 number와 null을 모두 담는 타입을 고릅니다. 실제로 6.0.3이 그렇게 잡았습니다. 후보들 중 하나가 다른 전부의 상위 타입이면 그것을 고르고, 없으면 유니온입니다. 문서의 zoo 예 — `[new Rhino(), new Elephant(), new Snake()]`는 공통 조상 Animal이 후보에 없으니 `(Rhino | Elephant | Snake)[]`가 되고, Animal[]을 원하면 어노테이션으로 적어야 합니다.",
        code: "const mixed = [0, 1, null];   // (number | null)[]\n\nclass Animal {} class Rhino extends Animal {} class Elephant extends Animal {} class Snake extends Animal\n  {}\n// (Rhino | Elephant | Snake)[]  — Animal 은 후보에 없다\nlet zoo = [new Rhino(), new Elephant(), new Snake()];\nlet zoo2: Animal[] = [new Rhino(), new Elephant(), new Snake()];   // 원하면 적는다",
      },
      {
        label: "실제로 돌려 보면: 문맥적 타이핑은 자리에서 흘러 들어온다",
        body: "`window.onmousedown = function (mouseEvent) { … }`에서 mouseEvent에 타입을 안 적어도 MouseEvent입니다. 대입 왼쪽의 타입이 오른쪽 함수 식으로 흘러 들어오기 때문입니다. 그래서 `mouseEvent.button`은 됩니다. `mouseEvent.kangaroo`는 \"Property 'kangaroo' does not exist on type 'MouseEvent'.\"가 납니다. 반대로 `window.onscroll`에 넣으면 uiEvent는 UIEvent입니다. 그래서 `.button`이 \"Property 'button' does not exist on type 'Event'.\"로 걸립니다. 실제로 `names.forEach((s) => …)`의 s는 string으로 잡혔습니다. `[1, \"a\", 2].filter((x) => …)`의 x는 `string | number`로 잡혔습니다. 문맥이 되는 자리는 함수 호출의 인자, 대입의 오른쪽, 타입 단언, 객체·배열 리터럴의 멤버, return 문입니다. 문맥이 없고 noImplicitAny가 꺼져 있으면 매개변수는 any입니다.",
        code: "// 6.0.3 — 어노테이션 없는 매개변수의 문맥적 타입\nconst names = [\"a\", \"b\"];\nnames.forEach((s) => s.toUpperCase());        // s: string\n[1, \"a\", 2].filter((x) => typeof x === \"number\");   // x: string | number\n\nwindow.onmousedown = function (mouseEvent) {\n  console.log(mouseEvent.button);     // OK — MouseEvent\n  console.log(mouseEvent.kangaroo);   // Property 'kangaroo' does not exist on type 'MouseEvent'. (TS2339)\n};",
      },
      {
        label: "리터럴 넓힘: const 와 let, 그리고 as const",
        body: "이 장에 직접 적혀 있지는 않지만 추론을 읽을 때 매번 만나는 규칙입니다. `const c = \"a\"`는 리터럴 `\"a\"`입니다. `let l = \"a\"`는 string입니다. 객체 속성은 변경 가능하니 넓혀집니다. `{ kind: \"left\" }`의 kind는 string입니다. `as const`는 모든 속성을 readonly 리터럴로 고정합니다. 실제로 `helloWorld: \"Hello World\"`(const), `changing: string`(let), `widened: { kind: string }`, `narrowKind: { readonly kind: \"left\" }`(as const), `tup: readonly [1, \"a\"]`가 각각의 결과였습니다. 함수 반환도 추론됩니다. `function f(a: number, b?: string) { return { a, b }; }`의 반환은 `{ a: number; b: string | undefined }`입니다.",
        code: "const helloWorld = \"Hello World\";          // \"Hello World\"\nlet changing = \"x\";                        // string\nlet widened = { kind: \"left\" };            // { kind: string }\nconst narrowKind = { kind: \"left\" } as const;   // { readonly kind: \"left\" }\nconst tup = [1, \"a\"] as const;             // readonly [1, \"a\"]\n\nfunction f(a: number, b?: string) { return { a, b }; }\n// f: (a: number, b?: string | undefined) => { a: number; b: string | undefined }",
      },
      {
        label: "문제가 나는 경우: 추론이 '너무 넓게' 또는 '너무 좁게' 될 때",
        body: "추론 결과가 뜻과 다를 때의 표입니다.",
        code: "증상                                       원인                              처방\n─────────────────────────────────────────  ───────────────────────────────  ─────────────────────────────\n[Rhino, Elephant] 가 Animal[] 이 아님        공통 조상은 후보가 아님              : Animal[] 어노테이션\n{ kind: \"left\" } 의 kind 가 string           속성은 변경 가능 → 넓힘              as const · satisfies\n[] 가 never[] 또는 any[]                     요소 후보 없음                      : string[] 어노테이션\n콜백 매개변수가 any (noImplicitAny 꺼짐)      문맥이 없음                         매개변수 타입 적기 · strict\nreturn 이 여럿인 함수의 반환이 유니온         각 return 의 최적 공통 타입           반환 타입 어노테이션\nlongest(\"abc\", \"de\") 가 \"abc\" | \"de\"        제네릭 T 에 리터럴이 그대로           필요하면 <string> 명시",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 추론은 두 방향으로 흐른다",
        body: "최적 공통 타입은 '아래에서 위로' — 값들에서 담는 타입으로 올라갑니다. 문맥적 타이핑은 '위에서 아래로' — 자리의 타입이 식 안으로 내려갑니다. 제네릭 호출은 둘을 동시에 씁니다. 인자에서 타입 매개변수를 올려 잡고(아래→위), 그 결과를 다른 인자의 콜백 매개변수로 내려 보냅니다(위→아래). `NoInfer`는 어떤 인자에서는 올리지 말라는 표시이고, `satisfies`는 내려보내되(문맥) 결과 타입은 올린 것(값의 좁은 타입)을 유지하라는 연산자입니다 — 실제로 `{ port: \"80\" } satisfies { port: string | number }`의 port는 string이었습니다.",
        code: "        위 (자리의 타입)\n         │  문맥적 타이핑 ↓          onmousedown = function (e) → e: MouseEvent\n   ┌─────┴─────┐\n   │   식·값   │\n   └─────┬─────┘\n         │  최적 공통 타입 ↑         [0, 1, null] → (number | null)[]\n        아래 (값들)\n\nsatisfies: 위에서 검사하되, 결과는 아래 것 — { port: \"80\" } satisfies { port: string | number } → port: string",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "추론된 타입을 더 좁히는 것이 좁히기 장, 넓힘을 막는 리터럴 타입은 일상적인 타입의 리터럴 절, 제네릭 추론의 지침은 제네릭 장입니다. 다음 장 변수 선언은 var·let·const가 추론과 스코프에 어떻게 다른지를 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) `[new Rhino(), new Elephant()]`가 Animal[]로 추론되지 않는 이유는?\n2) `names.forEach((s) => …)`의 s가 string인 메커니즘의 이름은?\n3) `{ kind: \"left\" }`의 kind가 string으로 넓혀지는 이유와 막는 방법 둘은?\n4) satisfies가 as와 다른 점을 '방향'으로 설명하세요.",
      },
    ],
    sources: [
      { label: "Type Inference", href: `${DOCS}/handbook/type-inference.html` },
      { label: "TypeScript 4.9 — satisfies", href: `${DOCS}/handbook/release-notes/typescript-4-9.html#the-satisfies-operator` },
    ],
  },

  {
    id: "ts-ref-vardecl",
    name: "변수 선언",
    tagline: "var · let · const 의 스코프, 구조 분해와 전개, 그리고 using",
    intro:
      "JavaScript의 변수 선언을 TypeScript 관점에서 다시 적은 장입니다. var의 함수 스코프와 호이스팅 문제, let의 블록 스코프·TDZ·재선언 금지, const를 다룹니다. 배열·객체 구조 분해(기본값·이름 바꾸기·나머지·함수 매개변수)와 전개(메서드를 잃음)도 다룹니다. 그리고 5.2의 `using`·`await using`(Symbol.dispose) 선언까지 다룹니다.",
    blocks: [
      {
        label: "var 의 함수 스코프, let 의 블록 스코프",
        body: "문서의 고전적 예 — `for (var i = 0; i < 10; i++) setTimeout(() => console.log(i))`는 10을 열 번 찍습니다. var는 함수 스코프라 클로저 열 개가 같은 i를 봅니다. let은 반복마다 새 바인딩을 만들어 0~9를 찍습니다. 실제로 둘을 나란히 돌리면 `var 3 3 3`과 `let 0 1 2`였습니다. let은 선언 전에 쓸 수 없고(TDZ) 같은 스코프에서 재선언할 수 없습니다. 실제로 `console.log(a); let a = 1;`은 \"Block-scoped variable 'a' used before its declaration.\"(TS2448)과 \"Variable 'a' is used before being assigned.\"(TS2454), `let x = 1; let x = 2;`는 \"Cannot redeclare block-scoped variable 'x'.\"(TS2451)이고 억지로 실행하면 \"SyntaxError: Identifier 'x' has already been declared\"입니다.",
        code: "for (var i = 0; i < 3; i++) setTimeout(() => console.log(\"var\", i));   // var 3, var 3, var 3\nfor (let j = 0; j < 3; j++) setTimeout(() => console.log(\"let\", j));   // let 0, let 1, let 2\n\nfunction tdz() { console.log(a); let a = 1; }\n// Block-scoped variable 'a' used before its declaration. (TS2448)\nlet x = 1; let x = 2;\n// Cannot redeclare block-scoped variable 'x'. (TS2451)",
      },
      {
        label: "const 는 재대입 금지이고 불변이 아니다",
        body: "const는 바인딩을 다시 대입할 수 없다는 뜻입니다. 객체의 속성은 바뀝니다. 문서는 '내부 상태가 바뀌지 않아야 하면 readonly 타입 수식어를 쓰라'고 적습니다. 객체 타입 장의 readonly와 `as const`가 그 자리입니다. 추론에서 const는 리터럴 타입을 유지하고 let은 넓힙니다(타입 추론 장).",
        code: "const kitty = { name: \"Aurora\", numLives: 9 };\nkitty.name = \"Rory\";   // OK — 속성은 바뀐다\nkitty = { name: \"x\", numLives: 1 };   // Cannot assign to 'kitty' because it is a constant. (TS2588)\n\nconst frozen = { name: \"Aurora\" } as const;\nfrozen.name = \"Rory\";   // Cannot assign to 'name' because it is a read-only property. (TS2540)",
      },
      {
        label: "실제로 돌려 보면: 구조 분해와 전개",
        body: "배열 구조 분해 `[first, second]`, 객체 구조 분해 `{ a, b }`, 이름 바꾸기 `{ a: newName }`, 기본값 `{ b = 2 }`, 나머지 `...rest`, 함수 매개변수에서의 구조 분해 — 전부 됩니다. 매개변수에 타입을 적을 때는 패턴 뒤에 한 번에 적습니다. 실제로 `f([1, 2], { a: 3 })`이 8(1+2+3+2)을 돌려줬습니다. 전개는 얕은 복사이고 '자기 소유의 열거 가능한 속성'만 복사합니다. 그래서 클래스 인스턴스를 전개하면 프로토타입의 메서드를 잃습니다 — 실제로 `{ ...new C() }`에서 `\"m\" in cc`가 false였고, 객체 리터럴의 메서드는 자기 속성이라 남았습니다(`Object.keys(clone)`에 m 포함).",
        code: "function f([first, second]: [number, number], { a, b = 2 }: { a: number; b?: number }) {\n  return first + second + a + b;\n}\nf([1, 2], { a: 3 });   // 8\n\nconst { a: renamed, ...rest } = { a: 1, b: 2, c: 3 };   // renamed = 1, rest = { b: 2, c: 3 }\n\nclass C { a = 1; m() { return 1 } }\nconst cc = { ...new C() };\n\"m\" in cc;   // false — 프로토타입 메서드는 전개되지 않는다\ncc.m();      // Property 'm' does not exist on type '{ a: number; }'. (TS2339)",
      },
      {
        label: "using 과 await using (5.2)",
        body: "`using r = res()`는 블록을 벗어날 때 `r[Symbol.dispose]()`를 자동으로 부르는 선언입니다(TC39 명시적 자원 관리, 3단계). `await using`은 `Symbol.asyncDispose`를 부르고 await합니다. async 함수나 모듈 최상위에서만 쓸 수 있습니다. null·undefined도 허용되고, for·for..of 안에서도 쓸 수 있으며, 구조 분해와는 함께 쓸 수 없습니다. `Disposable`·`AsyncDisposable` 인터페이스는 lib에 있습니다(`esnext.disposable`). 런타임에 Symbol.dispose가 없는 환경에는 폴리필이 필요합니다. 실제로 `--lib es2022,esnext.disposable`로 컴파일하면 `__addDisposableResource` 헬퍼가 든 코드가 나왔습니다. 파일 핸들·DB 커넥션·락처럼 '열면 꼭 닫아야 하는 것'의 try/finally를 선언 한 줄로 바꾸는 기능입니다.",
        code: "function res() { return { [Symbol.dispose]() { console.log(\"disposed\"); } }; }\n{\n  using r = res();\n  // … 블록 끝에서 r[Symbol.dispose]() 자동 호출\n}\n\n// emit (--lib es2022,esnext.disposable)\nvar __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) { /*\n  … */ };\n// try { … } catch (e) { env.error = e; env.hasError = true; } finally { __disposeResources(env); }",
      },
      {
        label: "문제의 구조: 선언 키워드는 '언제 사라지는가' 를 정한다",
        body: "var는 함수가 끝날 때, let·const는 블록이 끝날 때 바인딩이 사라집니다. using은 거기에 '사라질 때 정리 함수를 부른다'를 더합니다. 그래서 네 키워드는 한 축 위에 있습니다 — 스코프의 크기(var > let·const)와 떠날 때 하는 일(없음 vs dispose). TypeScript는 이 축을 바꾸지 않고, 그 위에서 '선언 전에 쓰는가'(TS2448), '다시 선언하는가'(TS2451), '다시 대입하는가'(TS2588)를 컴파일 때 잡습니다.",
        code: "키워드        스코프        재대입   떠날 때              TS 가 잡는 것\n───────────  ───────────  ──────  ──────────────────  ──────────────────────────\nvar          함수          O       없음                 (재선언도 허용 — 함정)\nlet          블록          O       없음                 TS2448 · TS2451\nconst        블록          X       없음                 TS2588 · 리터럴 유지\nusing        블록          X       [Symbol.dispose]()   구조 분해 불가 · lib 필요\nawait using  블록 (async)  X       await [Symbol.asyncDispose]()",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "참고서 열다섯 장이 끝났습니다. 다음 섹션 모듈 참고서는 핸드북 모듈 장의 어휘 위에서 호스트·module·moduleResolution·ESM/CJS 상호운용을 깊게 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) `for (var i …) setTimeout(() => i)`가 같은 값을 찍는 이유와 let이 고치는 메커니즘은?\n2) `{ ...instance }`가 메서드를 잃는 이유는?\n3) `using`이 블록을 벗어날 때 부르는 메서드와, 컴파일에 필요한 lib은?\n4) const 객체의 속성이 바뀌는 것을 타입으로 막는 두 방법은?",
      },
    ],
    sources: [
      { label: "Variable Declaration", href: `${DOCS}/handbook/variable-declarations.html` },
      { label: "TypeScript 5.2 — using Declarations and Explicit Resource Management", href: `${DOCS}/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management` },
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
      {
        label: "실제로 돌려 보면: 같은 import 가 설정마다 다르게 끝난다",
        body: "`import { a } from \"./a\"`(확장자 없음) 한 줄을 세 설정에서 돌렸습니다.\n`module: nodenext`는 \"Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './a.js'?\"(TS2835)를 냈습니다.\n`module: preserve`(bundler)는 통과했습니다.\n`module: esnext --moduleResolution bundler`도 통과했습니다. 다만 같은 파일의 `import fs = require()`는 \"Import assignment cannot be used when targeting ECMAScript modules.\"(TS1202)였습니다.\n그리고 Node 24에서 확장자 없는 ESM import를 실행하면 \"ERR_MODULE_NOT_FOUND: Cannot find module '…/a'\"입니다. nodenext가 까다로운 이유는 그 런타임 에러를 컴파일 때 미리 내기 때문입니다.",
        code: "// esm/c.ts\nimport { a } from \"./a\";\n\n--module nodenext\n  error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when\n  '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './a.js'?\n--module preserve   (moduleResolution bundler 암묵)\n  (통과)\n--module esnext --moduleResolution bundler\n  (통과)\n\n$ node interop/noext.mjs         # 같은 코드를 Node 가 실행하면\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '…/interop/a' imported from …/noext.mjs",
        codeLang: "text",
      },
      {
        label: "일곱 장의 지도",
        body: "소개는 목차입니다.\n이론은 '호스트가 누구인가'와 TypeScript의 세 가지 일(출력 포맷·import 해석·타입 부여)을 다룹니다.\n가이드는 '컴파일러 옵션 고르기' 한 장입니다. 앱(번들러·Node)과 라이브러리의 처방을 적습니다.\n레퍼런스는 module·moduleResolution 각 값과 paths·typesVersions를 다룹니다.\n부록은 ESM/CJS 상호운용입니다. 왜 default가 `.default.default`가 되는지를 설명합니다.\n이 섹션에서 가장 자주 돌아오는 것은 가이드의 처방 두 줄(앱은 `module: esnext + moduleResolution: bundler`, Node와 라이브러리는 `module: nodenext/node18`)과 부록입니다.",
      },
      {
        label: "다음 입구",
        body: "소개 → 이론 → 가이드 → 레퍼런스 → 부록 순서입니다. 급하면 가이드(컴파일러 옵션 고르기)부터 읽고 막히는 에러를 레퍼런스에서 찾아도 됩니다.",
      },
    ],
    sources: [
      { label: "Modules — Introduction", href: `${DOCS}/handbook/modules/introduction.html` },
      { label: "ESM/CJS Interoperability", href: `${DOCS}/handbook/modules/appendices/esm-cjs-interop.html` },
    ],
  },

  {
    id: "ts-mr-intro",
    name: "모듈 소개",
    tagline: "모듈 참고서의 목차 — 이론 · 가이드 · 레퍼런스 · 부록",
    intro:
      "모듈 참고서의 첫 페이지이고 내용은 목차입니다. 이론은 TypeScript가 모듈에 접근하는 방식과 의존 패키지를 처리하는 법, 가이드는 실무 작업(컴파일러 설정 고르기부터), 레퍼런스는 문법과 설정의 상세, 부록은 ESM/CJS 상호운용 같은 복잡한 주제. 이 시트는 그 네 갈래가 각각 어떤 질문에 답하는지와, 섞여 쓰이는 용어를 먼저 정리합니다.",
    blocks: [
      {
        label: "네 갈래가 답하는 질문",
        body: "이론은 'TypeScript는 모듈에 대해 무엇을 하고 무엇을 하지 않는가'에 답합니다.\n가이드는 '내 프로젝트는 어떤 설정을 적어야 하는가'에 답합니다.\n레퍼런스는 '이 옵션 값은 정확히 무엇을 하는가'에 답합니다.\n부록은 '왜 default import가 깨지는가'에 답합니다.\n읽는 순서는 그대로이지만 돌아오는 빈도는 가이드 > 레퍼런스 > 부록 > 이론입니다.",
      },
      {
        label: "먼저 가려 둘 용어",
        body: "이 섹션은 비슷한 낱말을 구분해서 씁니다.\n모듈 포맷(format)은 출력 .js가 ESM인가 CJS인가를 가리킵니다(`module` 옵션).\n모듈 해석(resolution)은 import 문자열을 파일 경로로 바꾸는 알고리즘입니다(`moduleResolution`).\n모듈 지정자(specifier)는 import 뒤의 문자열 자체입니다.\n호스트(host)는 출력을 실제로 실행하거나 묶는 것입니다(Node, 브라우저, 번들러).\n'TypeScript 컴파일러 자체는 호스트가 아니다'가 이론 장의 첫 문장급 선언입니다.",
        code: "낱말                  뜻                                        옵션\n───────────────────  ───────────────────────────────────────  ─────────────────\n모듈 포맷            출력의 import/export 모양 (ESM · CJS)       module\n모듈 해석            지정자 → 파일 경로                          moduleResolution\n모듈 지정자          import { a } from \"./a.js\" 의 \"./a.js\"       (코드)\n호스트               출력을 실행·번들하는 것 (Node · 번들러)      (설정이 아님 — 맞춰야 할 대상)\n모듈 감지            이 파일이 모듈인가 스크립트인가             moduleDetection",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 7.0 에서 살아 있는 값",
        body: "이 섹션의 옵션 값 중 7.0에서 남은 것만 적어 둡니다. module은 es2015·es2020·es2022·esnext·commonjs·node16·node18·node20·nodenext·preserve입니다. moduleResolution은 node16·nodenext·bundler입니다. amd·umd·system·none과 classic·node10은 \"Option '…' has been removed.\"입니다. 실제로 `--module amd`와 `--moduleResolution classic`이 그렇게 거부됐습니다. 그래서 레퍼런스 장의 '쓰지 말라'(commonjs의 'You probably shouldn't use this', classic의 'Do not use classic') 중 일부는 이미 선택지에서 빠졌습니다.",
        code: "$ npx tsc --noEmit --module amd a.ts\nerror TS5108: Option 'module=AMD' has been removed. Please remove it from your configuration.\n$ npx tsc --noEmit --module commonjs --moduleResolution classic a.ts\nerror TS5108: Option 'moduleResolution=Classic' has been removed. Please remove it from your\nconfiguration.",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "이론 장으로 갑니다. 그 장이 끝나면 '호스트'라는 낱말 하나로 나머지 세 장이 읽힙니다.",
      },
    ],
    sources: [
      { label: "Modules — Introduction", href: `${DOCS}/handbook/modules/introduction.html` },
    ],
  },

  {
    id: "ts-mr-theory",
    name: "모듈 이론",
    tagline: "TypeScript 는 호스트가 아니다 — 호스트를 알아야 세 가지 일을 할 수 있다",
    intro:
      "모듈 참고서의 중심 장입니다. 스크립트와 모듈의 차이에서 시작해, TypeScript가 모듈에 대해 하는 세 가지 일 — 유효한 출력 포맷으로 컴파일하기, 출력의 import가 해석되게 하기, import한 이름의 타입을 알기 — 을 적고, 그 셋을 하려면 '호스트'(Node·번들러)의 규칙을 알아야 한다고 말합니다. module 옵션, moduleResolution, 확장자와 package.json exports, '지정자는 변환되지 않는다', 라이브러리를 위한 선언 파일까지.",
    blocks: [
      {
        label: "세 가지 일, 그리고 호스트",
        body: "브라우저의 여러 `<script>`는 전역을 공유합니다. 모듈 시스템은 파일마다 스코프를 줍니다. TypeScript는 '파일이 자기 스코프를 가진다'고 가정하고 출발합니다. 그 위에서 TypeScript의 일은 셋 — (1) 파일을 유효한 출력 모듈 포맷으로 컴파일하기, (2) 그 출력의 import가 성공적으로 해석되게 하기, (3) import한 이름에 어떤 타입을 줄지 알기. 셋 다 '출력을 누가 실행하는가'를 알아야 합니다. 그 누군가가 호스트(Node.js, 브라우저, 번들러)이고, 'TypeScript 컴파일러 자체는 호스트가 아니다'. 그래서 module·moduleResolution 옵션은 취향이 아니라 '호스트가 무엇인지 TypeScript에 알리는 선언'입니다.",
        code: "TypeScript 의 세 가지 일            필요한 호스트 지식\n─────────────────────────────────  ──────────────────────────────────\n(1) 유효한 출력 포맷으로 컴파일        호스트가 ESM 을 읽나 CJS 를 읽나 (module)\n(2) 출력의 import 가 해석되게        호스트가 \"./a\" 를 어떻게 찾나 (moduleResolution)\n(3) import 한 이름의 타입            그 파일(또는 .d.ts)이 무엇을 내보내나\n\n호스트 = Node.js · 브라우저 · 번들러(Vite/esbuild/webpack)   — tsc 는 호스트가 아니다",
        codeLang: "text",
      },
      {
        label: "module: 호스트에 맞는 출력 포맷",
        body: "`module` 값은 출력 .js의 모양을 정합니다. 문서의 노트는 이렇습니다. 'Node.js의 모듈 포맷 감지와 상호운용 규칙 때문에 Node에서 실행할 코드에 esnext나 commonjs를 지정하는 것은 올바르지 않다. 올바른 값은 node16과 nodenext뿐'. node16/nodenext는 파일마다 포맷을 정합니다. `.mts`/`.mjs`는 ESM, `.cts`/`.cjs`는 CJS, `.ts`/`.js`는 가장 가까운 package.json의 `type`을 따릅니다. 실제로 같은 `--module nodenext`에서 `type: module` 폴더의 파일은 `import … from` 그대로, `type: commonjs` 폴더의 파일은 `require()`와 `exports.x =`로 나왔습니다. 번들러에는 esnext(또는 5.4의 preserve)를, 라이브러리에는 node18을 씁니다. 'commonjs·system·amd·umd는 더는 권하지 않음'이고 그중 셋은 7.0에서 제거됐습니다.",
        code: "// 같은 --module nodenext, 다른 package.json type\n// esm/ (type: module) → b.js\nimport { a } from \"./a.js\";\n\n// cjs/ (type: commonjs) → e.js\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst a_js_1 = require(\"../esm/a.js\");\nexports.e = String(a_js_1.a);",
      },
      {
        label: "실제로 돌려 보면: 지정자는 변환되지 않는다",
        body: "이 장의 가장 중요한 규칙입니다. '출력 파일의 모듈 지정자는 입력 파일의 모듈 지정자와 같다'. `import \"./a.ts\"`라고 써도 TypeScript가 `./a.js`로 바꿔 주지 않습니다(5.7의 `rewriteRelativeImportExtensions`가 예외). 그래서 Node ESM처럼 확장자가 필수인 호스트에서는 소스에 `.js`를 적어야 하고, nodenext는 그걸 TS2835로 강제합니다. `.ts` 확장자를 적으려면 `allowImportingTsExtensions`가 필요한데, 실제로 그냥 쓰면 \"An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.\"(TS5097)이고, 켜되 emit도 하려 하면 \"Option 'allowImportingTsExtensions' can only be used when one of 'noEmit', 'emitDeclarationOnly', or 'rewriteRelativeImportExtensions' is set.\"(TS5096)입니다 — 출력에 `.ts`가 남으면 어떤 호스트도 못 읽으니까요. `rewriteRelativeImportExtensions`를 켜면 `./a.ts`가 출력에서 `./a.js`로 바뀌었습니다.",
        code: "import { a } from \"./a.ts\";\n// An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.\n  (TS5097)\n\n--allowImportingTsExtensions (emit 함께)\n// Option 'allowImportingTsExtensions' can only be used when one of 'noEmit', 'emitDeclarationOnly', or\n  'rewriteRelativeImportExtensions' is set. (TS5096)\n\n--rewriteRelativeImportExtensions   → 출력 ext.js\nimport { a } from \"./a.js\";          // 이 옵션만 지정자를 바꾼다 (5.7)",
      },
      {
        label: "moduleResolution 과 package.json exports",
        body: "해석 알고리즘은 호스트의 것을 흉내 냅니다. node16/nodenext는 Node의 규칙을 따릅니다. import는 확장자가 필수이고 디렉터리 import가 안 되며, require는 확장자를 생략할 수 있습니다. bundler는 번들러의 느슨한 규칙을 따라 확장자 생략과 디렉터리 index를 허용합니다. 다만 module은 esnext/preserve여야 합니다('`bundler`는 module을 esnext로 설정해야 한다'; 실제로 amd와 섞으면 TS5095). 둘 다 package.json의 `exports`·`imports`와 조건(`types`·`import`·`require`)을 읽습니다. 실제로 exports에 `.`과 `./sub`만 적은 패키지에서 `pkg/dist/hidden`은 \"Cannot find module 'pkg/dist/hidden' or its corresponding type declarations.\"(TS2307)였고, `--traceResolution`은 \"Entering conditional exports. Matched 'exports' condition 'types'.\"를 찍었습니다. classic은 '6.0에서 폐기 예정'이었고 7.0에서 제거됐습니다. node10은 '새 프로젝트에 쓰지 말 것'이었고 역시 제거됐습니다.",
        code: "$ npx tsc --noEmit --module nodenext --traceResolution esm/usepkg.ts | grep -E \"exports|resolved\"\nEntering conditional exports.\nMatched 'exports' condition 'types'.\nUsing 'exports' subpath '.' with target './dist/index.d.ts'.\n======== Module name 'pkg' was successfully resolved to '…/node_modules/pkg/dist/index.d.ts' with Package\nID 'pkg/dist/index.d.ts@1.0.0'. ========\n\nimport { h } from \"pkg/dist/hidden\";   // exports 에 없는 경로\n// Cannot find module 'pkg/dist/hidden' or its corresponding type declarations. (TS2307)",
        codeLang: "text",
      },
      {
        label: "라이브러리: 선언 파일은 출력과 짝이어야 한다",
        body: "`tsc --declaration`은 `.js`와 `.d.ts`를 함께 내보내고, 쓰는 쪽 컴파일러는 '둘이 대응한다'고 가정합니다. 확장자 짝은 `.d.ts`↔`.js`↔`.ts`, `.d.mts`↔`.mjs`↔`.mts`, `.d.cts`↔`.cjs`↔`.cts`입니다. 문서는 '선언 파일을 손으로 쓰는 것은 위험하고 실수가 잦은 일'이라고 경고합니다. 그리고 라이브러리에 `moduleResolution: bundler`를 쓰면 '번들러에서만 동작하는 코드'가 나올 수 있어 '전염성(infectious)'이 있다고 적습니다. `export * from \"./utils\"`(확장자 없음)가 .d.ts에 그대로 남으면 Node 사용자의 컴파일이 깨집니다. 라이브러리는 `module: node18`이 처방입니다. 'ES 모듈이 CommonJS 모듈을 import하는 것을 막는 TypeScript 설정은 현재 없다'도 이 장의 솔직한 한 줄입니다.",
        code: "소스        출력 JS    선언\n─────────  ────────  ─────────\n.ts        .js       .d.ts\n.mts       .mjs      .d.mts\n.cts       .cjs      .d.cts\n(.*  →  .d.*.ts  — allowArbitraryExtensions)\n\n라이브러리 처방: module: node18 → moduleResolution node16, 확장자 강제 → .d.ts 가 어느 호스트에서도 해석됨",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 설정은 '호스트 선언' 이고, 어긋나면 컴파일은 통과하되 실행이 깨진다",
        body: "모듈 문제가 다른 타입 에러와 다른 점은 '컴파일은 성공했는데 실행이 실패하는' 꼴이라는 것입니다. 타입 검사는 TypeScript가 아는 호스트 규칙에 대해서만 맞고, 설정이 실제 호스트와 다르면 검사는 다른 세계를 보고 있습니다. `module: esnext + bundler`로 통과한 확장자 없는 import를 Node로 실행하면 ERR_MODULE_NOT_FOUND가 나는 것이 그 예입니다. 그래서 이 섹션의 첫 질문은 항상 '출력을 누가 실행하는가'이고, 가이드 장은 그 답마다 설정 세트를 줍니다.",
        code: "호스트          module              moduleResolution    확장자 규칙\n─────────────  ──────────────────  ─────────────────  ─────────────────────────\nNode.js        node16 / nodenext   (암묵)              import 는 .js 필수, require 는 생략 가능\n번들러         esnext / preserve   bundler             생략 가능 (번들러가 찾음)\n라이브러리      node18              (암묵 node16)        .js 필수 → 어디서나 동작하는 .d.ts\n브라우저(직접)  nodenext + paths    (암묵)              URL 그대로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "이론을 설정으로 옮긴 것이 가이드 장 '컴파일러 옵션 고르기'입니다. 각 옵션 값의 정확한 동작은 레퍼런스 장, 'ESM이 CJS를 import할 때'의 세부는 부록입니다.",
      },
      {
        label: "확인 질문",
        body: "1) TypeScript가 모듈에 대해 하는 세 가지 일은?\n2) 'TypeScript는 호스트가 아니다'가 module 옵션의 의미를 어떻게 바꾸나요?\n3) `import \"./a.ts\"`가 출력에서 `./a.js`로 바뀌지 않는 이유와 바꾸는 유일한 옵션은?\n4) 라이브러리에 `moduleResolution: bundler`가 '전염성'이 있다는 뜻은?",
      },
    ],
    sources: [
      { label: "Modules — Theory", href: `${DOCS}/handbook/modules/theory.html` },
      { label: "TypeScript 5.7 — Path Rewriting for Relative Paths", href: `${DOCS}/handbook/release-notes/typescript-5-7.html#path-rewriting-for-relative-paths` },
    ],
  },

  {
    id: "ts-mr-guides",
    name: "모듈 가이드",
    tagline: "실무 질문에 답하는 갈래 — 지금은 '컴파일러 옵션 고르기' 한 장",
    intro:
      "모듈 참고서의 가이드 갈래입니다. 이론을 '그래서 무엇을 적어야 하는가'로 옮긴 곳이고, 지금은 '컴파일러 옵션 고르기' 한 페이지가 들어 있습니다. 그 페이지가 번들러 앱·Node 앱·라이브러리·번들된 라이브러리 각각에 설정 세트를 줍니다.",
    blocks: [
      {
        label: "가이드가 전제하는 한 가지",
        body: "'환경마다 tsconfig 하나'. 서버 코드·DOM 코드·워커·테스트가 한 저장소에 있으면 각각 다른 lib와 module이 필요하니 tsconfig를 나누고 프로젝트 참조로 잇습니다. 하나의 tsconfig로 모든 환경을 덮으려 하면 어느 환경에서는 거짓인 설정이 생깁니다. 이 전제가 프로젝트 설정 섹션의 프로젝트 참조 장과 이어집니다.",
      },
      {
        label: "실제로 돌려 보면: 가이드의 처방 두 줄",
        body: "앱이 번들러로 빌드되면 `module: esnext`(또는 preserve) + `moduleResolution: bundler` + `noEmit`(검사만)입니다.\n앱이 Node에서 돌면 `module: nodenext` 하나로 moduleResolution·target·esModuleInterop이 따라옵니다.\n라이브러리는 `module: node18`입니다.\n실제로 5.9 이후 `tsc --init`이 쓰는 최소 설정이 `module: nodenext, target: esnext, verbatimModuleSyntax: true, isolatedModules: true, moduleDetection: force, skipLibCheck: true`였습니다. Node 처방에 가장 가깝습니다. 번들러 프로젝트라면 module과 moduleResolution 두 줄만 바꾸면 됩니다.",
        code: "$ npx tsc --init   (7.0.2)\n{\n  \"compilerOptions\": {\n    \"module\": \"nodenext\",\n    \"target\": \"esnext\",\n    \"types\": [],\n    \"sourceMap\": true,\n    \"declaration\": true,\n    \"declarationMap\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"exactOptionalPropertyTypes\": true,\n    \"strict\": true,\n    \"jsx\": \"react-jsx\",\n    \"verbatimModuleSyntax\": true,\n    \"isolatedModules\": true,\n    \"noUncheckedSideEffectImports\": true,\n    \"moduleDetection\": \"force\",\n    \"skipLibCheck\": true\n  }\n}",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "컴파일러 옵션 고르기 장으로 갑니다. 그 장의 각 옵션이 정확히 무엇을 하는지는 레퍼런스 장에 있습니다.",
      },
    ],
    sources: [
      { label: "Modules — Choosing Compiler Options", href: `${DOCS}/handbook/modules/guides/choosing-compiler-options.html` },
      { label: "TypeScript 5.9 — Minimal and Updated tsc --init", href: `${DOCS}/handbook/release-notes/typescript-5-9.html` },
    ],
  },

  {
    id: "ts-mr-options",
    name: "컴파일러 옵션 고르기",
    tagline: "번들러 앱 · Node 앱 · 라이브러리 — 셋의 설정 세트",
    intro:
      "이론 장의 '호스트가 누구인가'에 대한 답마다 설정을 적어 준 페이지입니다. 번들러로 빌드하는 앱, Node에서 실행하는 앱(ts-node·tsx 포함), 번들러 없이 브라우저에서 ESM을 직접 쓰는 경우, 라이브러리, 번들된 라이브러리가 그 답들입니다. 그리고 '두 포맷으로 내보내되 검사는 한 번'의 위험까지 다룹니다.",
    blocks: [
      {
        label: "앱 + 번들러",
        body: "설정은 `module: esnext`, `moduleResolution: bundler`, `esModuleInterop: true`, `customConditions: [\"module\"]`(exports 조건), `noEmit`(또는 `emitDeclarationOnly`), `allowImportingTsExtensions: true`, `allowArbitraryExtensions: true`, 그리고 `verbatimModuleSyntax` 또는 `isolatedModules`입니다. 번들러가 변환하니 tsc는 검사만 하고, `.ts` 확장자 import도 허용됩니다(noEmit이니 출력에 남지 않습니다). 문서는 '번들러 프로젝트에서는 당장은 package.json에 `type: module`을 두거나 .mts 파일을 쓰지 않는 것을 권한다'고 주의를 둡니다. 번들러들의 Node 포맷 규칙 지원이 고르지 않기 때문입니다. tsx도 '번들러와 같은 설정'을 쓰라고 합니다.",
        code: "{\n  \"compilerOptions\": {\n    \"module\": \"esnext\",\n    \"moduleResolution\": \"bundler\",\n    \"esModuleInterop\": true,\n    \"customConditions\": [\"module\"],\n    \"noEmit\": true,                    // 번들러가 .js 를 만든다\n    \"allowImportingTsExtensions\": true,\n    \"allowArbitraryExtensions\": true,\n    \"verbatimModuleSyntax\": true,\n    \"strict\": true\n  }\n}\n// 실제로: allowImportingTsExtensions 는 noEmit 없이 켜면\n// Option 'allowImportingTsExtensions' can only be used when one of 'noEmit', 'emitDeclarationOnly', or\n  'rewriteRelativeImportExtensions' is set. (TS5096)",
      },
      {
        label: "실제로 돌려 보면: 앱 + Node 는 nodenext 한 줄",
        body: "`module: nodenext`를 적으면 `moduleResolution: nodenext`, `esModuleInterop: true`, `target: esnext`가 암묵적으로 따라옵니다. 권장 추가는 `verbatimModuleSyntax: true`입니다. ESM으로 내보낼 거면 package.json에 `type: module`을 두거나 `.mts`를 씁니다. 실제로 nodenext에서는 Node의 규칙이 그대로 검사됩니다.\n확장자 없는 import는 TS2835입니다.\nCJS 파일의 최상위 await는 \"The current file is a CommonJS module and cannot use 'await' at the top level.\"(TS1309)입니다.\n`module: commonjs`로 최상위 await를 쓰면 \"Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022', 'esnext', 'system', 'node16', 'node18', 'node20', 'nodenext', or 'preserve', and the 'target' option is set to 'es2017' or higher.\"(TS1378)입니다.\nts-node는 Node 설정을 그대로 따릅니다.",
        code: "// cjs/c.ts (type: commonjs) under --module nodenext\nimport { a } from \"../esm/a.js\";\nawait Promise.resolve(1);\n// The current file is a CommonJS module and cannot use 'await' at the top level. (TS1309)\n\n// --module commonjs\n// Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022', 'esnext',\n  'system',\n// 'node16', 'node18', 'node20', 'nodenext', or 'preserve', and the 'target' option is set to 'es2017' or\n  higher. (TS1378)",
      },
      {
        label: "라이브러리: node18 + 가장 낮은 target + verbatimModuleSyntax",
        body: "문서의 템플릿 — `module: node18`(moduleResolution node16 암묵), 지원할 가장 낮은 `target`, `strict: true`, `verbatimModuleSyntax: true`, `declaration: true`, `sourceMap`, `declarationMap`, `rootDir: src`, `outDir: dist`. 왜 bundler가 아닌가 — `moduleResolution: bundler`는 `export * from \"./utils\"`(확장자 없음)를 통과시키고 그 줄이 .d.ts에 그대로 남아 Node 사용자에게서 \"Error [ERR_MODULE_NOT_FOUND]: Cannot find module '…/node_modules/dependency/utils'… Did you mean to import ./utils.js?\"로 터집니다. '한마디로 bundler는 전염성이 있다'. verbatimModuleSyntax는 esModuleInterop에 따라 뜻이 달라지는 import 문을 막고, CJS 출력에서 `export default`를 막습니다 — 실제로 CJS 파일의 `export default function`은 \"A top-level 'export' modifier cannot be used on value declarations in a CommonJS module when 'verbatimModuleSyntax' is enabled.\"(TS1287), `import x from`은 \"ECMAScript imports and exports cannot be written in a CommonJS file under 'verbatimModuleSyntax'.\"(TS1295)였습니다.",
        code: "{\n  \"compilerOptions\": {\n    \"module\": \"node18\",\n    \"target\": \"es2020\",             // 지원할 가장 낮은 것\n    \"strict\": true,\n    \"verbatimModuleSyntax\": true,\n    \"declaration\": true,\n    \"sourceMap\": true,\n    \"declarationMap\": true,\n    \"rootDir\": \"src\",\n    \"outDir\": \"dist\"\n  }\n}\n\n// cjs/f.ts (type: commonjs) + verbatimModuleSyntax\nexport default function hello() {}\n// A top-level 'export' modifier cannot be used on value declarations in a CommonJS module when\n  'verbatimModuleSyntax' is enabled. (TS1287)\n// → 처방: export = hello  또는  파일을 ESM 으로",
      },
      {
        label: "번들된 라이브러리와 이중 출력의 함정",
        body: "라이브러리를 번들러로 묶어 배포하면 `module: esnext + bundler`를 써도 되지만 두 주의가 있습니다 — 해석이 둘로 갈리고(번들러의 해석 vs 사용자 tsc의 해석), .d.ts를 묶는 도구(API Extractor 등)가 따로 필요합니다. 그리고 ESM과 CJS를 둘 다 내보내는 '이중 출력'에 대한 문서의 한 줄 — '서로 다른 모듈 포맷의 출력 둘을 내보내며 타입 검사는 한 번만 하는 어떤 방법도 (최소) 한쪽 출력은 검사되지 않은 채로 둔다'. 검사가 본 세계와 실행되는 세계가 다른, 이론 장의 문제가 그대로 돌아옵니다.",
      },
      {
        label: "문제가 나는 경우: 설정 조합표",
        body: "실제로 돌려 본 에러를 조합별로 묶었습니다.",
        code: "조합                             에러 / 결과\n───────────────────────────────  ─────────────────────────────────────────────────────\nnodenext + 확장자 없는 상대 import  TS2835 Relative import paths need explicit file extensions…\nnodenext + CJS 파일에 최상위 await  TS1309 The current file is a CommonJS module and cannot use 'await'…\ncommonjs + 최상위 await            TS1378 Top-level 'await' expressions are only allowed when…\nesnext + import x = require()      TS1202 Import assignment cannot be used when targeting\n                                   ECMAScript modules.\nbundler + module amd/commonjs(옛)  TS5095 Option 'bundler' can only be used when 'module' is set to\n                                  'preserve', 'commonjs', or 'es2015' or later.\nverbatimModuleSyntax + 타입을 값 import  TS1484 'T' is a type and must be imported using a type-only import…\nverbatimModuleSyntax + CJS 파일의 export default TS1287 / import → TS1295\nallowImportingTsExtensions + emit              TS5096 … can only be used when one of 'noEmit',\n                                               'emitDeclarationOnly', or 'rewriteRelativeImportExtensions'\nimport defer + nodenext                        TS18060 Deferred imports are only supported when the\n                                               '--module' flag is set to 'esnext' or 'preserve'.",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "표의 옵션 하나하나는 레퍼런스 장에서 값별로 풀립니다. `esModuleInterop`이 왜 라이브러리에 '전염'되는지는 부록입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 번들러 앱에 `noEmit`을 두는 이유와, 그것이 `allowImportingTsExtensions`와 어떻게 묶이나요?\n2) `module: nodenext`가 암묵적으로 켜는 세 옵션은?\n3) 라이브러리에 bundler 해석을 쓰면 사용자에게 어떤 런타임 에러가 날 수 있나요?\n4) ESM·CJS 이중 출력의 근본 문제는?",
      },
    ],
    sources: [
      { label: "Modules — Choosing Compiler Options", href: `${DOCS}/handbook/modules/guides/choosing-compiler-options.html` },
      { label: "TSConfig — verbatimModuleSyntax", href: `${TSCONFIG}/#verbatimModuleSyntax` },
    ],
  },

  {
    id: "ts-mr-reference",
    name: "모듈 레퍼런스",
    tagline: "module · moduleResolution · paths · typesVersions — 값 하나하나의 뜻",
    intro:
      "옵션 값의 사전입니다. module의 node16·node18·node20·nodenext(파일별 포맷)·es2015~esnext·preserve·commonjs, moduleResolution의 node16/nodenext·bundler(classic·node10은 제거), paths와 baseUrl(제거), typesVersions, 타입 전용 import와 지우기. 각 값이 암묵적으로 켜는 것도 여기 있습니다.",
    blocks: [
      {
        label: "module: node16 → nodenext 는 파일마다 포맷을 정한다",
        body: "문서의 첫 교정은 '흔한 오해는 node16~nodenext가 ES 모듈만 내보낸다는 것'입니다. 실제로는 파일의 포맷(확장자·package.json type)에 따라 CJS 또는 ESM을 내보냅니다. 표를 옮기면 이렇습니다.\nnode16은 target es2022·moduleResolution node16이고 `require(esm)`은 불가입니다.\nnode18은 import 속성(`with { type: \"json\" }`)이 추가됩니다.\nnode20은 target es2023입니다(5.9 안정).\nnodenext는 target esnext이고 `require(esm)`을 지원합니다(5.8, Node 22.12+).\n암묵 옵션은 nodenext가 moduleResolution nodenext·target esnext·esModuleInterop, node16/18이 moduleResolution node16·target es2022·esModuleInterop입니다. 실제로 `import data from \"./data.json\" with { type: \"json\" }`이 nodenext에서 그대로 통과했고, `resolveJsonModule`을 따로 켜지 않아도 JSON의 타입(`{ name: string; n: number }`)이 검사됐습니다.",
        code: "module      target    moduleResolution  require(esm)  import 속성\n─────────  ────────  ────────────────  ───────────  ──────────\nnode16     es2022    node16            ✗             ✗\nnode18     es2022    node16            ✗             ✓\nnode20     es2023    node16            ✗             ✓\nnodenext   esnext    nodenext          ✓ (Node 22.12+)✓\n(전부 esModuleInterop 암묵 켜짐 · 파일 포맷은 .mts/.cts 또는 package.json type)\n\n// nodenext 에서 JSON\nimport data from \"./data.json\" with { type: \"json\" };\nexport const s: number = data.name;   // Type 'string' is not assignable to type 'number'. — 타입이 검사된다",
        codeLang: "text",
      },
      {
        label: "module: es2015 → esnext · preserve · commonjs",
        body: "es2015~esnext는 ESM만 내보냅니다. '`import mod = require(\"mod\")`는 선언 파일이 아닌 곳에서 허용되지 않음'입니다(실제로 TS1202). es2020에서는 `import.meta`를, es2022에서는 최상위 await를, esnext에서는 5.9의 `import defer`를 쓸 수 있습니다. 실제로 nodenext에서는 \"Deferred imports are only supported when the '--module' flag is set to 'esnext' or 'preserve'.\" TS18060이 났고, esnext에서는 `import defer * as ns from \"./a.js\"`가 그대로 출력됐습니다. preserve(5.4)는 import와 require를 적은 그대로 두고 moduleResolution bundler와 esModuleInterop을 암묵적으로 켭니다. 번들러가 둘 다 처리하는 세계를 위한 값입니다. commonjs는 '아마 쓰지 말아야 한다(You probably shouldn't use this)'입니다. amd·umd·system은 제거됐습니다.",
        code: "// esm/d.ts — import defer (5.9)\nimport defer * as ns from \"./a.js\";\nexport const d = () => ns.a;        // ns.a 를 처음 읽을 때 모듈이 평가된다\n\n--module nodenext\n// Deferred imports are only supported when the '--module' flag is set to 'esnext' or 'preserve'.\n  (TS18060)\n--module esnext → 출력 d.js (그대로)\nimport defer * as ns from \"./a.js\";",
      },
      {
        label: "실제로 돌려 보면: moduleResolution 의 두 가족",
        body: "node16/nodenext는 import와 require가 다른 알고리즘을 씁니다. '확장자 없는 import와 디렉터리 import는 require에서만 동작'입니다. package.json exports/imports와 조건을 읽습니다.\nbundler는 module이 esnext 또는 preserve여야 합니다(실제로 amd와 섞으면 \"Option 'bundler' can only be used when 'module' is set to 'preserve', 'commonjs', or 'es2015' or later.\" TS5095이고, 6.0부터 commonjs와도 허용됩니다). 확장자 생략과 디렉터리 import를 허용하되 exports도 읽고, allowSyntheticDefaultImports를 암묵적으로 켭니다.\nclassic은 'Do not use', node10(5.0에서 node에서 개명)은 'should no longer be used'입니다. 둘 다 7.0에서 \"Option 'moduleResolution=Classic' has been removed.\"입니다. 그래서 지금 선택지는 '호스트가 Node면 nodenext, 번들러면 bundler' 둘입니다.",
        code: "moduleResolution   import 확장자   디렉터리 import   exports 읽기   짝이 되는 module\n────────────────  ────────────  ──────────────  ───────────  ────────────────────\nnode16/nodenext    import 필수    require 만        ✓            node16/18/20/nodenext\nbundler            생략 가능      ✓                 ✓            esnext · preserve · (commonjs 6.0+)\nclassic / node10   —             —                 ✗            제거됨 (7.0)",
        codeLang: "text",
      },
      {
        label: "paths · baseUrl(제거) · typesVersions · 타입 전용 import",
        body: "`paths`는 지정자 패턴을 파일 위치로 바꾸는 매핑입니다. 다만 '출력 코드의 import 경로를 바꾸지 않는다'고 하니, 번들러나 런타임에 같은 별칭 설정이 따로 필요합니다. 실제로 `@lib/*` 매핑으로 타입 검사는 통과했지만 출력 .js에는 `import { a } from \"@lib/a.js\"`가 그대로 남았습니다. 그리고 `main`·`types`·`exports`·`typesVersions`를 전부 덮어씁니다. 4.1부터 baseUrl 없이 쓸 수 있고 baseUrl은 7.0에서 제거됐습니다(\"Option 'baseUrl' has been removed.\"). typesVersions는 패키지가 TypeScript 버전별로 다른 .d.ts를 주는 장치입니다. 실제로 `\">=6.0\": { \"*\": [\"ts6/*\"] }`를 둔 패키지에서 7.0.2가 ts6 쪽 선언을 읽어 `which: \"ts6\"`가 되고 `\"ts4\"`에 넣으면 에러였습니다. `import type`·`export type`·인라인 `type`은 '항상 지워진다'고 적혀 있습니다. 타입 전용 import는 default와 named를 함께 못 적습니다(\"A type-only import can specify a default import or named bindings, but not both.\").",
        code: "// paths 는 검사만 바꾼다\n{ \"compilerOptions\": { \"paths\": { \"@lib/*\": [\"../esm/*\"] } } }\nimport { a } from \"@lib/a.js\";   // 검사 OK\n// 출력 dist/use.js\nimport { a } from \"@lib/a.js\";   // 그대로! — 번들러 alias 가 따로 필요\n\n// typesVersions\n{ \"types\": \"ts4/index.d.ts\", \"typesVersions\": { \">=6.0\": { \"*\": [\"ts6/*\"] } } }\nimport { which } from \"tv\"; const w: \"ts4\" = which;\n// Type '\"ts6\"' is not assignable to type '\"ts4\"'.   ← 7.0.2 는 ts6/ 를 읽었다",
      },
      {
        label: "문제의 구조: 레퍼런스의 모든 값은 '호스트의 한 측면' 이다",
        body: "module은 호스트가 읽는 포맷, moduleResolution은 호스트가 경로를 찾는 법, paths는 호스트(번들러)의 별칭을 TypeScript에 알리는 것, typesVersions는 호스트가 아니라 '쓰는 쪽 컴파일러 버전'을 위한 것. 그래서 '이 값이 맞나'의 판단 기준은 항상 '실제 호스트가 그렇게 동작하는가'입니다. 7.0이 classic·node10·amd·umd·system·baseUrl·outFile을 치운 것도 같은 기준 — 그런 호스트가 더는 없다 — 에서 나온 결정입니다.",
      },
      {
        label: "다음 입구",
        body: "esModuleInterop·allowSyntheticDefaultImports가 암묵적으로 켜진다고만 적었는데, 둘이 정확히 무엇을 하고 왜 라이브러리에 위험한지는 부록 ESM·CJS 상호운용에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `module: nodenext`가 ESM만 내보낸다는 말이 오해인 이유는?\n2) `import defer`가 허용되는 module 값 둘은?\n3) `paths`가 바꾸는 것과 바꾸지 않는 것은?\n4) typesVersions는 누구를 위한 분기인가요?",
      },
    ],
    sources: [
      { label: "Modules — Reference", href: `${DOCS}/handbook/modules/reference.html` },
      { label: "TypeScript 5.9 — Support for import defer", href: `${DOCS}/handbook/release-notes/typescript-5-9.html` },
      { label: "TSConfig — paths", href: `${TSCONFIG}/#paths` },
    ],
  },

  {
    id: "ts-mr-appendices",
    name: "모듈 부록",
    tagline: "복잡한 주제를 따로 뺀 갈래 — 지금은 ESM·CJS 상호운용 한 장",
    intro:
      "모듈 참고서의 부록 갈래입니다. 본문 흐름을 끊을 만큼 긴 주제가 들어오는 자리이고, 지금은 'ESM/CJS 상호운용' 한 페이지입니다. 라이브러리를 붙일 때 나는 default import 문제의 거의 전부가 그 한 장에 있습니다.",
    blocks: [
      {
        label: "부록이 답하는 질문",
        body: "질문은 '왜 `import x from \"lib\"`가 어떤 설정에서는 함수이고 어떤 설정에서는 `{ default: 함수 }`인가'입니다. 답은 ES2015 명세가 ESM→CJS 상호운용을 정하지 않아 Babel·TypeScript·Node가 각자 규칙을 만들었고, 그 규칙들이 서로 조금씩 다르다는 것입니다.",
      },
      {
        label: "실제로 돌려 보면: Node 가 CJS 를 import 하면",
        body: "부록을 읽기 전에 Node의 실제 동작을 먼저 봐 두면 좋습니다. `module.exports = function`인 CJS를 ESM에서 `import fn, * as ns`로 가져오면 fn은 그 함수, ns의 키는 `['default', 'extra', 'module.exports']`입니다. `exports.default = …; exports.named = 1`로 컴파일된 CJS를 default import하면 `compiled`는 함수가 아니라 `{ default, named }` 객체이고 함수는 `compiled.default()`에 있습니다 — 이것이 '이중 default' 문제입니다. 그리고 Node는 CJS의 named export를 정적 분석(cjs-module-lexer)으로 찾기 때문에 `exports[key] = 2`처럼 계산된 이름과 defineProperty getter는 보이지 않았습니다(`one`만 보임).",
        code: "// lib.cjs: module.exports = function doSomething() {…}; module.exports.extra = \"x\";\nimport fn, * as ns from \"./lib.cjs\";\ntypeof fn        // \"function\"\nObject.keys(ns)  // [ 'default', 'extra', 'module.exports' ]\n\n// compiled.cjs: exports.__esModule = true; exports.default = function compiledDefault(){…}; exports.named\n  = 1;\nimport compiled from \"./compiled.cjs\";\ntypeof compiled           // \"object\"   ← 함수가 아니다\ntypeof compiled.default   // \"function\" ← 이중 default\n\n// obj.cjs: exports.one = 1; exports[key] = 2; Object.defineProperty(exports, \"three\", { get(){…} })\nimport * as o from \"./obj.cjs\";\nObject.keys(o)   // [ 'default', 'module.exports', 'one' ]  — two, three 는 lexer 가 못 본다",
      },
      {
        label: "다음 입구",
        body: "ESM·CJS 상호운용 장으로 갑니다. 위의 세 관찰이 그 장의 각 절(default 혼란·이중 default·named export)에 하나씩 대응합니다.",
      },
    ],
    sources: [
      { label: "Modules — ESM/CJS Interoperability", href: `${DOCS}/handbook/modules/appendices/esm-cjs-interop.html` },
    ],
  },

  {
    id: "ts-mr-esm-cjs",
    name: "ESM·CJS 상호운용",
    tagline: "default 가 함수인가 객체인가 — 규칙이 셋이라 생기는 문제",
    intro:
      "ES2015는 ESM이 ESM을 import하는 것만 정했습니다. ESM이 CommonJS를 import할 때 `module.exports`가 무엇이 되는가는 정하지 않았고, Babel·TypeScript·Node가 각자 답을 냈습니다. 이 부록은 그 역사 — `import * as`의 문제, allowSyntheticDefaultImports(1.8), esModuleInterop(2.7), Node의 규칙(v12), 이중 default, named export의 정적 분석 — 와 라이브러리·앱 각각의 권고를 적습니다.",
    blocks: [
      {
        label: "문제의 시작: module.exports 가 함수일 때",
        body: "CJS는 `module.exports = function () {}`처럼 모듈 자체를 함수나 클래스로 내보낼 수 있습니다. ESM의 namespace import `import * as hello from \"hello\"`는 명세상 '호출할 수 없는 객체'여야 하므로 그 함수를 담을 수 없습니다. TypeScript는 그래서 \"External module '\"./exports-function\"' resolves to a non-module entity and cannot be imported using this construct.\"(TS2497)를 냈고, 그 자리를 위해 `import hello = require(\"hello\")`가 있었습니다. 그런데 Babel은 `import hello from \"hello\"`로 그 함수를 받게 했습니다 — module.exports를 default로 취급하는 '합성 default'. 두 세계가 여기서 갈렸습니다.",
        code: "// hello.cjs\nmodule.exports = function hello() {};\n\n// ESM 명세대로라면\nimport * as hello from \"./hello.cjs\";   // hello 는 객체 — 함수를 담을 수 없다\nhello();  // TS2497: … resolves to a non-module entity and cannot be imported using this construct.\n\n// TypeScript 의 원래 답\nimport hello = require(\"./hello.cjs\");\n// Babel 의 답 (합성 default)\nimport hello from \"./hello.cjs\";",
      },
      {
        label: "ESM/CJS 상호운용의 두 옵션",
        body: "두 옵션은 allowSyntheticDefaultImports(1.8)와 esModuleInterop(2.7)입니다. allowSyntheticDefaultImports는 '타입 검사만' 바꿉니다. default가 없는 모듈의 default import를 허용합니다. emit은 그대로라 런타임에서 `undefined`가 될 수 있었습니다. esModuleInterop은 emit도 바꿉니다. `__importDefault`·`__importStar` 헬퍼로 Babel과 같은 규칙을 런타임에 만듭니다. `__esModule` 플래그가 있으면 그대로 두고, 없으면 `{ default: module.exports }`로 감쌉니다. 실제로 CJS 출력의 `import * as ns`에는 `__importStar`가, default import에는 `__importDefault`가 들어갔고, 이 헬퍼들이 'default가 아닌 키만 복사하고 default에 module.exports를 둔다'는 규칙을 코드로 담고 있습니다. 6.0부터 esModuleInterop을 false로 둘 수 없습니다. 실제로 \"Option 'esModuleInterop=false' has been removed.\"가 났습니다. 문서의 두 줄은 'CommonJS 코드가 있는 앱은 항상 esModuleInterop을 켜야 한다'와 'esModuleInterop 없이 allowSyntheticDefaultImports만 켜는 것은 피해야 한다'입니다.",
        code: "// tsc emit (CJS, esModuleInterop) 의 헬퍼 일부\nvar __importStar = … function (mod) {\n    if (mod && mod.__esModule) return mod;          // TS/Babel 이 만든 모듈이면 그대로\n    var result = {};\n    if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++)\n        if (k[i] !== \"default\") __createBinding(result, mod, k[i]);   // default 뺀 키 복사\n    __setModuleDefault(result, mod);                // default = module.exports\n    return result;\n};\n\n$ npx tsc --noEmit --esModuleInterop false a.ts\nerror TS5108: Option 'esModuleInterop=false' has been removed. Please remove it from your configuration.",
      },
      {
        label: "실제로 돌려 보면: Node 의 규칙과 이중 default",
        body: "Node(v12+)는 CJS를 import할 때 `module.exports` 전체를 default로 줍니다. `__esModule` 플래그를 보지 않습니다. 그래서 TypeScript나 Babel이 `exports.default = fn`으로 컴파일한 CJS를 Node ESM에서 default import하면 `{ default: fn, named }` 객체가 오고, 함수는 `.default.default`에 있습니다 — 실제로 `typeof compiled`는 \"object\", `typeof compiled.default`는 \"function\"이었습니다. 같은 코드를 TypeScript로 컴파일한 쪽에서 import하면 `__importDefault`가 `__esModule`을 보고 벗겨 주니 함수가 바로 옵니다. 같은 import 문이 '누가 소비하는가'에 따라 다른 값이 되는 것이 이중 default 문제의 전부입니다. named export는 Node가 cjs-module-lexer로 정적으로 찾으므로 계산된 이름은 빠집니다(실제로 `exports[key] = 2`가 보이지 않음). `require(esm)`은 Node 22.12부터 되지만 최상위 await가 있으면 \"ERR_REQUIRE_ASYNC_MODULE: require() cannot be used on an ESM graph with top-level await.\"입니다.",
        code: "// compiled.cjs (TS/Babel 이 만든 것)\n\"use strict\"; Object.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = function compiledDefault() {}; exports.named = 1;\n\n// Node ESM 에서\nimport compiled from \"./compiled.cjs\";\ntypeof compiled;           // \"object\"    — Node 는 module.exports 전체를 default 로\ntypeof compiled.default;   // \"function\"  — 이중 default\n\n// TS 로 컴파일된 소비자(CJS, esModuleInterop)에서는\nconst m = __importDefault(require(\"./compiled.cjs\"));   // __esModule 보고 그대로 → m.default 가 함수\n\n$ node interop/req-tla.cjs\nERR_REQUIRE_ASYNC_MODULE - require() cannot be used on an ESM graph with top-level await. Use import()\n  instead.",
      },
      {
        label: "권고: 라이브러리와 앱이 다르다",
        body: "앱 — esModuleInterop을 켜고(6.0부터 끌 수도 없음), `importHelpers`로 헬퍼를 tslib에서 가져와 중복을 줄입니다. 라이브러리 — CJS로 내보내는 라이브러리는 default export를 피하고 `export =`(단일 export) 또는 named export를 씁니다. '선언 파일을 배포하는 라이브러리는 추가로 주의해야 한다' — .d.ts 안의 default import가 esModuleInterop에 기대면 그 설정이 사용자에게 '전염'됩니다. 그래서 가이드 장이 라이브러리에 `verbatimModuleSyntax`를 권합니다 — esModuleInterop에 따라 뜻이 바뀌는 import 문 자체를 금지하니까요. 실제로 CJS 파일에서 `import hello from \"./f.js\"`를 verbatimModuleSyntax로 컴파일하면 TS1295로 막혔고, 처방은 `import hello = require(\"./f.js\")` 또는 파일을 ESM으로 바꾸는 것입니다.",
        code: "역할             권고\n──────────────  ───────────────────────────────────────────────────────\n앱 (CJS 포함)    esModuleInterop (6.0+ 항상 켜짐) · importHelpers + tslib\nCJS 라이브러리   default export 피하기 → export = 또는 named · .d.ts 에 interop 의존 import 금지\n모든 라이브러리   verbatimModuleSyntax — 뜻이 설정에 따라 바뀌는 import 문을 원천 차단\n소비자            Node ESM 에서 TS 컴파일 CJS 의 default 는 .default.default 일 수 있음을 기억",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 세 규칙이 '__esModule' 한 플래그를 다르게 본다",
        body: "Babel과 TypeScript(esModuleInterop)는 `__esModule`이 있으면 '이미 ESM 모양'이라 보고 default를 벗기고, 없으면 module.exports를 default로 감쌉니다. Node는 플래그를 무시하고 항상 module.exports를 default로 줍니다. 그래서 TS/Babel이 만든 CJS를 TS/Babel이 소비하면 맞고, Node가 소비하면 한 겹 더 감싸입니다. 해법은 '규칙을 통일'하는 것이 아니라(명세가 없으니) '규칙에 의존하는 코드를 쓰지 않는' 것 — CJS 라이브러리는 default를 내보내지 않고, 소비자는 named import를 쓰는 것입니다. ESM으로만 배포하는 라이브러리는 이 문제가 처음부터 없습니다.",
        code: "소비자 → CJS 모듈           __esModule 있음 (TS/Babel 출력)      __esModule 없음 (손으로 쓴 CJS)\n──────────────────────────  ─────────────────────────────────  ────────────────────────────────\nTS (esModuleInterop) / Babel  default = exports.default            default = module.exports\nNode ESM                      default = module.exports (전체)      default = module.exports\n                              → exports.default 는 .default.default\n\n탈출: CJS 라이브러리는 default 를 내보내지 않는다 · 가능하면 ESM 으로만 배포한다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "모듈 참고서가 끝났습니다. 라이브러리 쪽에서 `export =`를 선언 파일에 어떻게 적는지는 선언 파일 템플릿(모듈·클래스·함수 d.ts)에, 소비자 쪽 `import x = require()`의 문법은 핸드북 모듈 장에 있습니다. 튜토리얼 섹션은 이런 설정을 실제 빌드 파이프라인에 끼우는 자리입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `import * as fn`으로 CJS 함수 모듈을 받을 수 없는 명세상의 이유는?\n2) allowSyntheticDefaultImports와 esModuleInterop의 차이를 '검사'와 'emit'으로 설명하세요.\n3) TS가 컴파일한 CJS를 Node ESM에서 default import하면 왜 함수가 `.default.default`에 있나요?\n4) CJS 라이브러리 저자에게 문서가 권하는 export 방식은?",
      },
    ],
    sources: [
      { label: "Modules — ESM/CJS Interoperability", href: `${DOCS}/handbook/modules/appendices/esm-cjs-interop.html` },
      { label: "TSConfig — esModuleInterop", href: `${TSCONFIG}/#esModuleInterop` },
      { label: "Node.js — Modules: ECMAScript modules (Interoperability with CommonJS)", href: "https://nodejs.org/api/esm.html#interoperability-with-commonjs" },
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
        body: "다섯 상황은 ASP.NET Core, Gulp, DOM 조작, JavaScript에서 마이그레이션하기, Babel과 함께 쓰기입니다. 요즘 프론트엔드 환경과는 거리가 있는 항목도 있지만, 각각이 '빌드 파이프라인 어디에 타입 검사를 끼워 넣을 것인가'라는 같은 질문을 다룹니다.",
      },
      {
        label: "마이그레이션 문서가 본편이다",
        body: "다섯 중 실제로 도움이 된 것은 JavaScript에서 옮겨 오는 문서였습니다. 한 번에 다 바꾸지 말고 allowJs로 공존시키다가 파일 단위로 옮기라는 것, 그리고 strict는 마지막에 켜라는 것. 순서를 정해 준다는 점에서 다른 문서와 성격이 다릅니다.",
      },
      {
        label: "필요할 때 여는 곳",
        body: "제 프로젝트들은 처음부터 TypeScript로 시작해서 이 섹션을 통째로 읽을 일은 없었습니다. 다만 이미 굴러가는 JavaScript 코드베이스에 들어가게 되면 제일 먼저 펼 곳이라 자리를 비워 두지 않고 옮겨 뒀습니다.",
      },
      {
        label: "실제로 돌려 보면: 다섯 장이 각각 어떤 도구를 가리키는가",
        body: "ASP.NET Core와 Gulp는 2015~2017년의 도구 사슬(Visual Studio, gulp-typescript, Browserify, Watchify)이고 지금은 역사입니다. DOM 조작은 lib.dom.d.ts를 읽는 법 — 지금도 그대로 유효합니다(실제로 6.0.3의 lib.dom.d.ts는 45,125줄, `getElementById(elementId: string): HTMLElement | null`). 마이그레이션은 설정 순서 — 그대로 유효합니다. Babel과 함께 쓰기는 '변환은 Babel, 검사는 tsc'라는 분업인데, 지금은 Babel 자리에 esbuild·swc·Vite·Node의 타입 벗기기가 들어왔고 원리는 같습니다. 실제로 타입 에러가 있는 파일을 `@babel/preset-typescript`로 돌리면 에러 없이 .js가 나왔습니다.",
        code: "장                 가리키는 도구                            지금\n────────────────  ─────────────────────────────────────  ──────────────────────────────\nASP.NET Core      Visual Studio · Microsoft.TypeScript.MSBuild  역사 (원리: 서버 프로젝트에 tsc 끼우기)\nGulp              gulp-typescript · Browserify · Watchify  역사 (원리: 변환 → 번들 → 감시)\nDOM 조작          lib.dom.d.ts                             그대로 유효\n마이그레이션       allowJs → 파일 단위 → strict              그대로 유효\nBabel             @babel/preset-typescript + tsc --noEmit  esbuild · swc · Vite · Node strip 으로 자리만 바뀜",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "DOM 조작과 마이그레이션 두 장은 지금도 읽을 가치가 있고, Babel 장은 '변환기와 검사기의 분업'이라는 원리로 읽으면 됩니다. ASP.NET Core와 Gulp는 한 문단으로 정리했습니다.",
      },
    ],
    sources: [
      { label: "Migrating from JavaScript", href: `${DOCS}/handbook/migrating-from-javascript.html` },
      { label: "DOM Manipulation", href: `${DOCS}/handbook/dom-manipulation.html` },
    ],
  },

  {
    id: "ts-tut-aspnet",
    name: "ASP.NET Core",
    tagline: "서버 프로젝트 안에 tsc 를 끼우는 법 — Visual Studio 시대의 기록",
    intro:
      "ASP.NET Core 웹 애플리케이션(Empty 템플릿, Visual Studio 2015/2017)에 TypeScript를 더하는 튜토리얼입니다. NuGet으로 `Microsoft.AspNetCore.StaticFiles`와 `Microsoft.TypeScript.MSBuild`를 넣고, Startup.cs에 UseDefaultFiles·UseStaticFiles, scripts/app.ts에 `sayHello()`, tsconfig에 noEmitOnError·noImplicitAny·sourceMap·target es6와 `files: [\"./app.ts\"]`·compileOnSave, gulp(4.0.2)와 del(5.1.0)로 wwwroot/scripts에 복사, index.html에서 로드, Edge로 디버깅. 끝입니다.",
    blocks: [
      {
        label: "원리만 남는다",
        body: "도구는 전부 옛것이지만 구조는 지금도 같습니다. 서버 프로젝트가 정적 파일을 서빙하고, TypeScript 소스는 별도 폴더에, 빌드가 .js를 정적 폴더로 옮기고, HTML이 그 .js를 로드합니다. `Microsoft.TypeScript.MSBuild`는 MSBuild가 tsc를 부르게 하는 패키지이고, 그 설정 방법이 프로젝트 설정 섹션의 'MSBuild 컴파일러 옵션' 장입니다. 요즘이라면 .NET 프로젝트에서도 프런트엔드는 Vite 같은 도구가 따로 빌드하고 결과만 wwwroot에 두는 쪽이 보통입니다.",
        code: "// 튜토리얼의 tsconfig.json (scripts/)\n{\n  \"compilerOptions\": {\n    \"noEmitOnError\": true,\n    \"noImplicitAny\": true,\n    \"sourceMap\": true,\n    \"target\": \"es6\"\n  },\n  \"files\": [\"./app.ts\"],\n  \"compileOnSave\": true\n}",
      },
      {
        label: "실제로 돌려 보면: 이 설정을 7.0 에 그대로 넣으면",
        body: "`target: es6`는 es2015의 별칭이라 7.0에서도 됩니다(es5가 아니기 때문입니다). `noImplicitAny`는 strict 기본값에 이미 포함됩니다. `compileOnSave`는 에디터 힌트일 뿐 tsc는 무시합니다. 그러니 이 tsconfig는 아직 유효한 몇 안 되는 2017년 설정입니다. 다만 `files`로 한 파일만 적었으니 import하는 다른 파일은 자동으로 따라 들어옵니다. 그리고 6.0부터 `types: []`가 기본이라 DOM 타입은 `lib`에 dom이 들어 있는지에 달립니다(target 기본 lib에 dom은 포함됩니다).",
      },
      {
        label: "다음 입구",
        body: "MSBuild로 tsc를 부르는 설정은 프로젝트 설정의 MSBuild 장에 한 문단으로 있습니다. 빌드 파이프라인에 끼우는 일반 원리는 Gulp 장과 Babel 장이 이어갑니다.",
      },
    ],
    sources: [
      { label: "ASP.NET Core", href: `${DOCS}/handbook/asp-net-core.html` },
      { label: "Compiler Options in MSBuild", href: `${DOCS}/handbook/compiler-options-in-msbuild.html` },
    ],
  },

  {
    id: "ts-tut-gulp",
    name: "Gulp",
    tagline: "변환 → 번들 → 감시 → 최소화 — 빌드 파이프라인의 네 단계",
    intro:
      "gulp로 TypeScript를 빌드하는 튜토리얼입니다. `gulp-typescript`로 tsconfig를 읽어 dist에 컴파일하고, Browserify + tsify로 CommonJS 출력을 브라우저용으로 묶고(`debug: true`면 인라인 소스맵), Watchify로 저장마다 증분 재컴파일하고, Terser로 최소화(gulp-terser·vinyl-buffer·gulp-sourcemaps), 마지막에 Babel(babelify, presets es2015)을 끼워 tsconfig는 es2015를 타깃하고 Babel이 ES5로 낮춥니다.",
    blocks: [
      {
        label: "네 단계는 지금도 같다",
        body: "도구 이름을 지우면 파이프라인은 지금과 같습니다. (1) 변환 — .ts를 .js로, (2) 번들 — 모듈 그래프를 파일 몇 개로, (3) 감시 — 저장마다 다시, (4) 최소화 — 배포용 압축. 2017년에는 네 도구를 gulp 태스크로 이었고, 지금은 Vite·esbuild 하나가 넷을 다 합니다. 튜토리얼이 보여 주는 소스맵 처리(vinyl-buffer → sourcemaps.init({ loadMaps: true }) → terser → sourcemaps.write)는 '각 단계가 맵을 이어받아야 디버거가 원본을 가리킨다'는 원리이고, 이건 지금 도구에서도 설정 한 줄(`sourcemap: true`)로 같은 일을 합니다.",
        code: "2017 (gulp)                              지금 (Vite / esbuild)\n──────────────────────────────────────  ──────────────────────────\n변환   gulp-typescript (tsc)             esbuild (타입 벗기기)\n번들   Browserify + tsify                 Rollup / esbuild\n감시   Watchify                           vite dev (HMR)\n최소화 gulp-terser + sourcemaps           build.minify + sourcemap\n검사   (gulp-typescript 가 함께)          tsc --noEmit 따로",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: Babel 을 끼우는 마지막 절이 지금의 분업이다",
        body: "튜토리얼의 마지막 절은 tsconfig를 `target: es2015`로 두고 Babel(babelify)이 ES5로 낮추게 합니다. '타입은 tsc가, 문법 낮추기는 Babel이'라는 분업입니다. 이 분업이 다음 장 Babel과 함께 쓰기의 주제입니다. 실제로 `@babel/preset-typescript`는 타입 에러가 있는 파일도 그냥 변환했습니다. 7.0에서 ES5 타깃이 사라진 것도 이 분업의 결과입니다. 더 낮춰야 하면 Babel 같은 도구가 하라는 뜻입니다.",
        code: "// 튜토리얼의 Babel 절\nbrowserify({ entries: [\"main.ts\"], debug: true })\n  .plugin(tsify)\n  .transform(\"babelify\", { presets: [\"es2015\"], extensions: [\".ts\"] })\n  .bundle()\n\n// tsconfig: \"target\": \"es2015\"  — tsc 는 여기까지, 나머지는 Babel",
      },
      {
        label: "다음 입구",
        body: "분업의 원리와 함정(Babel은 const enum·namespace를 다루지 못함, 검사가 없음)은 Babel과 함께 쓰기 장에, 지금의 번들러 연동 목록은 프로젝트 설정의 빌드 도구 연동 장에 있습니다.",
      },
    ],
    sources: [
      { label: "Gulp", href: `${DOCS}/handbook/gulp.html` },
      { label: "Integrating with Build Tools", href: `${DOCS}/handbook/integrating-with-build-tools.html` },
    ],
  },

  {
    id: "ts-tut-dom",
    name: "DOM 조작",
    tagline: "lib.dom.d.ts 를 읽는 법 — createElement 가 왜 HTMLParagraphElement 를 돌려주는가",
    intro:
      "`document.getElementById`, `createElement`, `appendChild`, `querySelector`를 TypeScript로 쓰면서 그 타입이 어디서 오는지 보는 튜토리얼입니다. 답은 lib.dom.d.ts — 2만 줄이 넘는(6.0.3 기준 45,125줄) DOM 타입 선언 — 이고, `HTMLElementTagNameMap`이라는 인터페이스 하나가 태그 이름을 요소 타입으로 바꿉니다.",
    blocks: [
      {
        label: "getElementById 는 null 일 수 있다",
        body: "시그니처는 `getElementById(elementId: string): HTMLElement | null;`입니다. 실제로 lib.dom.d.ts 13,080행에 그대로 있습니다. 없는 id면 null이 오니 strictNullChecks에서 바로 쓰면 \"'el' is possibly 'null'.\"(TS18047)입니다. 튜토리얼은 `app?.appendChild(p)`로 옵셔널 체이닝을 씁니다. 반드시 있다고 확신하면 `!`(non-null 단언)이지만, 그 확신이 틀리면 런타임에 터집니다 — 좁히기 장의 '타입은 사실이 아니라 약속'이 여기서 가장 자주 부딪힙니다.",
        code: "// lib.dom.d.ts:13080\ngetElementById(elementId: string): HTMLElement | null;\n\nconst el = document.getElementById(\"x\");   // el: HTMLElement | null\nel.focus();\n// 'el' is possibly 'null'. (TS18047)\nel?.focus();                                // OK\nel!.focus();                                // 컴파일은 OK — 없으면 런타임 TypeError",
      },
      {
        label: "실제로 돌려 보면: createElement 의 두 오버로드",
        body: "`createElement(\"p\")`가 `HTMLParagraphElement`인 이유는 오버로드 두 개와 HTMLElementTagNameMap 때문입니다. 첫째는 `createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?): HTMLElementTagNameMap[K]`입니다. 태그 이름이 맵의 키이면 맵의 값 타입을 돌려줍니다. 둘째는 `createElement(tagName: string, options?): HTMLElement`입니다. 모르는 태그는 HTMLElement가 됩니다. 실제로 lib.dom.d.ts 12,929행에 첫 오버로드가 있고, HTMLElementTagNameMap에는 141개 태그가 등록돼 있습니다. 6.0.3 API로 `document.createElement(\"p\")`는 `HTMLParagraphElement`, `querySelector(\"a\")`는 `HTMLAnchorElement | null`, 선택자가 태그가 아닌 `querySelector(\".cls\")`는 `Element | null`로 잡혔습니다. 타입 조작 장의 제네릭 제약(`K extends keyof`)과 인덱스 접근(`Map[K]`)이 그대로 쓰인 자리입니다.",
        code: "// lib.dom.d.ts:12929\ncreateElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions):\n  HTMLElementTagNameMap[K];\ncreateElement(tagName: string, options?: ElementCreationOptions): HTMLElement;\n\ninterface HTMLElementTagNameMap { \"a\": HTMLAnchorElement; \"p\": HTMLParagraphElement; /* … 141 개 */ }\n\nconst p = document.createElement(\"p\");          // HTMLParagraphElement\nconst q = document.querySelector(\"a\");          // HTMLAnchorElement | null\nconst q2 = document.querySelector(\".cls\");      // Element | null  — 선택자는 태그가 아니라서\nconst q3 = document.querySelector<HTMLInputElement>(\".cls\");   // 제네릭으로 알려 준다",
      },
      {
        label: "appendChild · children 과 childNodes · textContent",
        body: "`appendChild<T extends Node>(newChild: T): T`는 넣은 것을 그대로 돌려줍니다 — 체이닝용. `children`은 HTMLCollection(요소만), `childNodes`는 NodeList(텍스트 노드 포함)라 같은 DOM에서 길이가 다를 수 있습니다. 튜토리얼은 `textContent`로 글을 넣습니다 — HTML을 파싱하지 않아 안전하고, `innerHTML`은 이 페이지에 없습니다(렌더링 허브와 Vue 허브의 보안 절이 그 차이를 다룹니다).",
        code: "const app = document.getElementById(\"app\");\nconst p = document.createElement(\"p\");\np.textContent = \"Hello, World!\";   // HTML 로 해석되지 않는다\napp?.appendChild(p);               // appendChild 는 p 를 돌려준다 (HTMLParagraphElement)\n\ndiv.children;     // HTMLCollection — 요소만\ndiv.childNodes;   // NodeList — 텍스트 노드까지",
      },
      {
        label: "문제의 구조: DOM 타입은 '브라우저가 돌려줄 수 있는 것' 을 전부 적어 둔 것이다",
        body: "lib.dom.d.ts는 브라우저 명세(WebIDL)에서 생성됩니다. 그래서 `| null`이 많고, 모르는 태그는 HTMLElement이며, 선택자 문자열로는 타입을 알 수 없어 Element입니다. 이 보수성이 불편하면 제네릭 인자(`querySelector<HTMLInputElement>`)나 단언으로 '내가 더 안다'고 알리는데, 그 순간 책임이 코드 쪽으로 옵니다. 그리고 `types: []`가 기본인 6.0에서도 dom은 `lib`로 들어오는 것이라(`@types`가 아니라) 영향이 없습니다 — 단, Node 전용 프로젝트라면 `lib: [\"es2025\"]`로 dom을 빼야 `document`가 안 보입니다.",
      },
      {
        label: "다음 입구",
        body: "이 장의 제네릭 오버로드가 핸드북 함수 장(오버로드)·타입 조작 장(keyof·인덱스 접근)의 실전 예입니다. 렌더링 허브가 DOM 자체를 다루고, Vue·React 허브의 TypeScript 절이 프레임워크 안에서 이 타입들을 어떻게 받는지를 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) `getElementById`가 `| null`인 이유와 두 가지 처리법(그리고 각 위험)은?\n2) `createElement(\"p\")`가 HTMLParagraphElement인 메커니즘을 두 오버로드로 설명하세요.\n3) `querySelector(\".cls\")`가 Element인 이유와 더 좁히는 법은?\n4) children과 childNodes의 차이는?",
      },
    ],
    sources: [
      { label: "DOM Manipulation", href: `${DOCS}/handbook/dom-manipulation.html` },
      { label: "More on Functions — Function Overloads", href: `${DOCS}/handbook/2/functions.html#function-overloads` },
    ],
  },

  {
    id: "ts-tut-migrate",
    name: "JavaScript에서 옮겨오기",
    tagline: "allowJs 로 공존 → 파일 하나씩 .ts → 엄격함은 마지막에",
    intro:
      "이미 굴러가는 JavaScript 프로젝트에 TypeScript를 들이는 순서입니다. src/와 built/를 나누고 tsconfig에 `allowJs`와 `outDir`, 빌드 도구에 끼우고, 파일을 하나씩 .ts(JSX면 .tsx)로 바꾸고, 그때 나오는 에러들(require를 못 찾음, 모듈을 못 찾음, 암묵적 any)을 고치고, 마지막에 `noImplicitAny` → `strictNullChecks` → `noImplicitThis` 순서로 엄격함을 올립니다.",
    blocks: [
      {
        label: "1단계: 공존 — allowJs 와 outDir",
        body: "첫 tsconfig는 작습니다. `outDir: \"./built\"`, `allowJs: true`, `include: [\"./src/**/*\"]`를 적습니다. 이렇게만 해도 tsc가 .js 파일을 읽어 built/로 내보내고(변환만 하고 검사는 없습니다), 프로젝트는 그대로 돌아갑니다. 문서가 이 단계에서 켜 보라는 가벼운 검사는 `noImplicitReturns`, `noFallthroughCasesInSwitch`, `allowUnreachableCode`, `allowUnusedLabels`입니다. 타입과 무관하게 코드 흐름만 보는 것들이라 .js에서도 걸립니다. 실제로 `allowJs`만으로는 .js의 타입 에러가 전혀 보고되지 않았고(`checkJs` 없이), `// @ts-check`를 붙인 파일만 검사됐습니다.",
        code: "{\n  \"compilerOptions\": {\n    \"outDir\": \"./built\",\n    \"allowJs\": true,\n    \"target\": \"es2015\"      // 튜토리얼은 es5 — 7.0 에서는 es2015 이상\n  },\n  \"include\": [\"./src/**/*\"]\n}\n\n$ npx tsc --noEmit --allowJs b.js     # @ts-check 없는 .js\n(에러 없음 — 변환만, 검사 안 함)",
      },
      {
        label: "2단계: 파일을 .ts 로 바꾸면 나오는 에러들",
        body: "확장자를 바꾸면 '빨간 밑줄'이 나옵니다. 문서의 비유는 'Word의 빨간 밑줄처럼, 고치지 않아도 문서는 인쇄된다'입니다. `noEmitOnError`를 켜면 에러가 있는 동안 출력이 막힙니다. 자주 나오는 에러는 셋입니다.\n(1) `Cannot find name 'require'.` / `'define'`입니다. CommonJS·AMD 호출을 import 문으로 바꾸거나 `declare function require`를 적습니다.\n(2) `Cannot find module 'foo'.`입니다. 타입 선언이 없는 패키지입니다. `npm i -D @types/foo` 또는 `declare module \"foo\";`로 해결합니다. 실제로 선언 없는 패키지를 import하면 \"Could not find a declaration file for module 'untyped'. '…/index.js' implicitly has an 'any' type. Try `npm i --save-dev @types/untyped` if it exists or add a new declaration (.d.ts) file containing `declare module 'untyped';`\"(TS7016)로 처방까지 적힌 문구가 옵니다.\n(3) `module.exports = foo`는 `export = foo`로 바꿉니다.\n그리고 '`Object`보다 `{}`를, any는 최후의 수단으로'라고 적습니다.",
        code: "import greet from \"untyped\";\n// Could not find a declaration file for module 'untyped'. '…/node_modules/untyped/index.js' implicitly\n  has an 'any' type.\n//   Try `npm i --save-dev @types/untyped` if it exists or add a new declaration (.d.ts) file containing\n  `declare module 'untyped';` (TS7016)\n\n// 임시 처방 — shorthand.d.ts\ndeclare module \"untyped\";          // greet 은 any\n// 제대로 — untyped.d.ts\ndeclare module \"untyped\" { function greet(name: string): string; export = greet; }",
      },
      {
        label: "실제로 돌려 보면: 엄격함은 순서대로",
        body: "문서의 순서 — `noImplicitAny`(추론 안 되는 any를 에러로), `strictNullChecks`('foo' is possibly 'null'), `noImplicitThis`(this가 any인 함수에 `this: Point` 매개변수). 6.0부터 `strict`가 기본 true라 '새로 만든' tsconfig에서는 셋이 전부 켜져 있습니다. 마이그레이션 중에는 거꾸로 `strict: false`로 시작해 하나씩 true로 올리는 것이 문서의 순서에 맞습니다. 실제로 strict에서 `function g(x)`는 \"Parameter 'x' implicitly has an 'any' type.\"(TS7006), `maybe.length`는 \"'maybe' is possibly 'undefined'.\"(TS18048)입니다.",
        code: "// 마이그레이션 중 tsconfig — 6.0+ 는 strict 기본 true 이니 명시적으로 끄고 하나씩 켠다\n{\n  \"compilerOptions\": {\n    \"strict\": false,\n    \"noImplicitAny\": true,        // 1단계\n    // \"strictNullChecks\": true,  // 2단계\n    // \"noImplicitThis\": true     // 3단계\n  }\n}\n\nsrc/basics.ts(7,12): error TS7006: Parameter 'x' implicitly has an 'any' type.\nsrc/basics.ts(9,1): error TS18048: 'maybe' is possibly 'undefined'.",
      },
      {
        label: "문제가 나는 경우: 순서를 어길 때",
        body: "마이그레이션에서 자주 보는 실패 패턴입니다.",
        code: "실패                                   원인                                 처방\n─────────────────────────────────────  ──────────────────────────────────  ─────────────────────────────\n첫날 strict 켜고 에러 수백 개            전부 한 번에                          strict: false → 플래그 하나씩\n.js 를 .ts 로 다 바꾸고 빌드가 멈춤      noEmitOnError + 에러                  파일 단위로, 또는 noEmitOnError 끄기\n@types 가 없는 패키지마다 any            declare module \"x\"; 로 임시 처방      쓰는 부분만 .d.ts 로 점차\n에디터는 조용한데 CI 는 실패            에디터 TS 버전 ≠ 프로젝트 버전         워크스페이스 버전 사용\nallowJs 인데 .js 에러가 안 보임          checkJs 가 없음                      checkJs 또는 // @ts-check",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: ".js를 바꾸지 않고 검사만 받는 길(checkJs·JSDoc)은 JavaScript 지원 섹션, 선언이 없는 패키지에 .d.ts를 쓰는 법은 선언 파일 섹션, strict의 각 플래그는 프로젝트 설정의 TSConfig 레퍼런스입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `allowJs`만 켜면 .js 파일에 무슨 일이 일어나고 무슨 일은 안 일어나나요?\n2) TS7016의 문구가 제안하는 두 처방은?\n3) 문서가 권하는 엄격함 플래그 세 개의 순서는?\n4) 6.0 이후 마이그레이션 tsconfig의 첫 줄에 무엇을 적어야 하나요?",
      },
    ],
    sources: [
      { label: "Migrating from JavaScript", href: `${DOCS}/handbook/migrating-from-javascript.html` },
      { label: "Type Checking JavaScript Files", href: `${DOCS}/handbook/type-checking-javascript-files.html` },
    ],
  },

  {
    id: "ts-tut-babel",
    name: "Babel과 함께 쓰기",
    tagline: "변환은 빠른 도구가, 검사는 tsc 가 — 분업의 원리와 함정",
    intro:
      "Babel은 TypeScript 문법을 벗겨 .js를 만들지만 타입을 검사하지 않습니다. 문서의 기준 — '빌드 출력이 소스와 거의 같으면 tsc를, 여러 출력이 필요한 파이프라인이면 Babel로 변환하고 tsc로 검사'. 그 분업의 tsconfig(`declaration`·`emitDeclarationOnly`·`isolatedModules`)와 한계를 적습니다. 지금은 Babel 자리에 esbuild·swc·Vite·Node의 타입 벗기기가 들어왔고 원리는 그대로입니다.",
    blocks: [
      {
        label: "Babel 은 검사하지 않는다",
        body: "`@babel/preset-typescript`는 타입 어노테이션을 지우고 enum·namespace 같은 것을 변환합니다. 다른 파일을 보지 않고 한 파일씩 처리하기 때문에 타입을 알 수 없고, 따라서 검사도 할 수 없습니다. 실제로 `const n: number = \"not a number\"`가 든 파일을 돌리면 아무 말 없이 `const n = \"not a number\"`가 나왔습니다. 문서는 타입 에러가 프로덕션에 갈 수 있다고 경고합니다. 그래서 짝으로 `tsc --noEmit`(또는 `emitDeclarationOnly`)이 필요합니다. Babel은 .d.ts도 만들 수 없습니다.",
        code: "// in.ts\nconst n: number = \"not a number\";\nenum E { A }\nexport const x: E = E.A;\n\n$ node -e 'require(\"@babel/core\").transformFileSync(\"in.ts\", { presets: [\"@babel/preset-typescript\"] })'\nconst n = \"not a number\";          // ← 타입 에러인데 그냥 나왔다\nvar E = /*#__PURE__*/function (E) { E[E[\"A\"] = 0] = \"A\"; return E; }(E || {});\nexport const x = E.A;",
      },
      {
        label: "실제로 돌려 보면: 분업의 tsconfig",
        body: "문서의 하이브리드 설정은 `declaration: true`, `emitDeclarationOnly: true`, `isolatedModules: true`입니다. 주석은 '.d.ts는 tsc가 만들되 .js는 만들지 않게'입니다. `isolatedModules`는 '파일 하나만 보고 변환하는 도구가 할 수 없는 일'을 에러로 막습니다. 타입만 re-export하는 `export { T } from`(type 없이), const enum 참조, 모듈이 아닌 파일이 그런 일입니다. 5.0의 `verbatimModuleSyntax`가 그 역할을 더 엄격하게 대신합니다(핸드북 모듈 장의 TS1484). 실제로 `--isolatedModules`만 켠 esm/b.ts는 통과했고 `--verbatimModuleSyntax`는 타입 import에 type을 요구했습니다.",
        code: "{\n  \"compilerOptions\": {\n    \"declaration\": true,\n    \"emitDeclarationOnly\": true,   // .d.ts 만, .js 는 Babel 이\n    \"isolatedModules\": true        // 단일 파일 변환기가 못 하는 일을 금지\n    // 또는 verbatimModuleSyntax: true (5.0+, 더 엄격)\n  }\n}\n\n파이프라인\n  babel src --out-dir dist          # .js (검사 없음)\n  tsc                               # .d.ts + 검사",
      },
      {
        label: "지금의 변환기들: esbuild · swc · Vite · Node",
        body: "같은 분업이 도구만 바뀌어 이어집니다. Vite는 '.ts 파일 import를 기본 지원하되 변환만 하고 타입 검사는 하지 않는다'입니다(빌드 도구 연동 장). esbuild·swc도 같습니다. Node 24는 아예 런타임이 타입을 벗깁니다. `process.features.typescript`가 \"strip\"이고 `node file.ts`가 그냥 됩니다. 단 '지우기만으로 JavaScript가 되는' 문법만 됩니다. enum은 \"TypeScript enum is not supported in strip-only mode\"로 거부되고, `--experimental-transform-types`를 주면 변환됩니다(실제로 `Up 0 a 1 3 1`이 출력됐습니다). 5.8의 `erasableSyntaxOnly`가 그 부분집합을 tsc 쪽에서 강제하는 옵션입니다. 변환기가 늘수록 '검사는 tsc만'이라는 사실이 더 중요해집니다.",
        code: "$ node -p 'process.features.typescript'\nstrip                                   # Node 24: 기본으로 타입을 벗긴다\n$ node src/enums.ts\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode\n$ node --experimental-transform-types rt/enums-run.mts\nUp 0 a 1 3 1                            # 변환 모드면 enum 도 된다\n\n# tsc 쪽에서 '지울 수 있는 문법만' 강제\n$ npx tsc --noEmit --erasableSyntaxOnly src/enums.ts\nerror TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.",
        codeLang: "bash",
      },
      {
        label: "문제의 구조: 단일 파일 변환기는 '다른 파일을 모른다'",
        body: "tsc는 프로그램 전체를 봅니다. Babel·esbuild·swc·Node는 파일 하나씩 봅니다. 그 차이에서 세 제약이 나옵니다. (1) 검사 불가 — 타입은 다른 파일에 있으니까. (2) import 지우기 불가 — `import { T }`의 T가 타입인지 모르니 `type`을 적어 줘야(verbatimModuleSyntax). (3) const enum 불가 — 다른 파일의 값을 인라인할 수 없으니까. isolatedModules·verbatimModuleSyntax·erasableSyntaxOnly는 전부 'tsc가 전체를 보고, 단일 파일 도구가 깨질 코드를 미리 막는' 옵션들입니다.",
        code: "                 tsc (프로그램 전체)     Babel · esbuild · swc · Node (파일 하나)\n──────────────  ─────────────────────  ─────────────────────────────────────────\n타입 검사        ✓                       ✗  → tsc --noEmit 를 따로\nimport 지우기    타입이면 자동           모름 → import { type T }  (verbatimModuleSyntax)\nconst enum       인라인                  불가 → isolatedModules 가 금지\nenum · namespace 변환                   Node strip 은 거부 → erasableSyntaxOnly\n.d.ts            ✓                       ✗  → tsc --emitDeclarationOnly",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "지금 쓰는 도구 목록(Babel·Rollup·Vite·webpack·Svelte…)은 프로젝트 설정의 빌드 도구 연동 장에, `isolatedModules`·`verbatimModuleSyntax`·`erasableSyntaxOnly`의 정확한 정의는 TSConfig 레퍼런스에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) Babel이 타입 에러를 잡지 못하는 구조적 이유는?\n2) 하이브리드 설정의 세 옵션과 각 역할은?\n3) Node 24에서 `node file.ts`가 되는데 enum은 안 되는 이유는?\n4) isolatedModules가 금지하는 것들의 공통점은?",
      },
    ],
    sources: [
      { label: "Using Babel with TypeScript", href: `${DOCS}/handbook/babel-with-typescript.html` },
      { label: "TSConfig — isolatedModules", href: `${TSCONFIG}/#isolatedModules` },
      { label: "Node.js — Modules: TypeScript (Type stripping)", href: "https://nodejs.org/api/typescript.html" },
    ],
  },

  {
    id: "ts-whatsnew",
    name: "릴리스 노트",
    tagline: "언어가 어디로 가고 있는지",
    intro:
      "버전별로 무엇이 들어왔는지가 쌓여 있는 곳입니다. 처음 배울 때는 볼 일이 없지만, 어느 정도 쓰고 나면 여기가 가장 밀도 높은 문서가 됩니다. 새 기능은 대개 '그동안 사람들이 무엇을 불편해했는가'의 답이기 때문입니다.",
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
      {
        label: "실제로 돌려 보면: 5.0 → 7.0 의 굵은 줄",
        body: "이 허브의 시트들이 기대는 버전 사실만 모았습니다.\n5.0은 표준 데코레이터, const 타입 매개변수(실제로 `id([\"a\", 1])`가 `readonly [\"a\", 1]`이 됩니다), 모든 enum이 유니온 enum이 되는 변화, moduleResolution bundler, verbatimModuleSyntax, extends 배열입니다.\n5.2는 using 선언과 데코레이터 메타데이터입니다.\n5.4는 NoInfer와 module preserve입니다.\n5.5는 추론되는 타입 서술(실제로 filter 결과가 number[]가 됩니다), isolatedDeclarations(실제로 \"Function must have an explicit return type annotation with --isolatedDeclarations.\" TS9007이 납니다), 정규식 문법 검사, JSDoc @import입니다.\n5.7은 rewriteRelativeImportExtensions입니다.\n5.8은 erasableSyntaxOnly, require(esm) in nodenext, libReplacement입니다.\n5.9는 import defer, module node20, 최소 tsc --init입니다.\n6.0은 기본값 전환(strict·module esnext·target es2025·types []·rootDir .·noUncheckedSideEffectImports)과 폐기 예고입니다.\n7.0은 Go 네이티브 컴파일러, 폐기된 것 전부 제거, --checkers/--builders입니다.",
        code: "5.0  데코레이터(표준) · const 타입 매개변수 · 유니온 enum · bundler · verbatimModuleSyntax\n5.2  using / await using · Symbol.metadata\n5.4  NoInfer · module preserve\n5.5  추론되는 타입 서술 · isolatedDeclarations · 정규식 검사 · @import\n5.7  rewriteRelativeImportExtensions\n5.8  erasableSyntaxOnly · require(esm) · libReplacement · 세분화된 return 검사\n5.9  import defer · node20 · 최소 tsc --init · 확장 가능한 hover\n6.0  strict=true · module=esnext · target=es2025 · types=[] · rootDir=. · 폐기 예고 (es5, node10, classic,\n     baseUrl, outFile …)\n7.0  Go 네이티브 (8~12× 빠름) · 폐기 → 제거 · --checkers · --builders · --singleThreaded · 프로그래밍 API 는 7.1 로",
        codeLang: "text",
      },
      {
        label: "7.0: 무엇이 같고 무엇이 다른가",
        body: "7.0 발표 글의 요점입니다. 컴파일러를 Go로 옮겼고, 구조와 로직은 원본을 그대로 따라서 타입 검사 결과는 6.0과 같게 맞췄습니다. 공유 메모리 멀티스레딩으로 전체 빌드가 8~12배 빨라졌고(vscode 저장소 125.7초 → 10.6초), `--checkers`(기본 4)·`--builders`·`--singleThreaded`로 병렬을 조절합니다. 설치는 그대로 `npm i -D typescript`입니다. 다른 점도 있습니다. 6.0에서 폐기 예고된 모든 플래그가 에러가 됩니다. 템플릿 리터럴 추론이 유니코드 코드 포인트를 묶어 처리합니다. JS 파일 규칙이 바뀌었습니다. 아직 없는 것은 안정된 프로그래밍 API입니다(7.1 예정). 그래서 Vue·Svelte·Astro·Angular의 템플릿 검사와 webpack 로더처럼 API에 기대는 도구는 6.0 API를 씁니다. `@typescript/typescript6` 패키지로 6.0을 `tsc6`로 나란히 둘 수 있습니다. 실제로 이 허브의 '추론 타입 꺼내기'도 7.0에 JS API가 없어 6.0.3으로 했습니다.",
        code: "$ npx tsc --version\nVersion 7.0.2\n$ npx tsc --help --all | grep -A1 -E 'checkers|builders|singleThreaded'\n--checkers         Set the number of checkers per project.\n--singleThreaded   Run in single threaded mode.\n--builders         Set the number of projects to build concurrently.\n\n$ ls node_modules/typescript/\nbin  dist  lib  vendor  …        # lib 에는 lib.*.d.ts 만 — typescript.js (API) 가 없다\n$ npm view typescript dist-tags\n{ latest: '7.0.2', next: '7.1.0-dev.20261111.1', beta: '7.1.0-beta', rc: '7.0.1-rc', … }",
        codeLang: "bash",
      },
      {
        label: "다음 입구",
        body: "6.0 노트의 기본값 변경과 폐기 목록은 프로젝트 설정의 TSConfig 레퍼런스 시트에 표로 옮겨 두었습니다. 5.x 각 기능은 해당 시트(데코레이터·좁히기·이넘·모듈 레퍼런스·변수 선언)에서 '실제로 돌려 보면'으로 다시 나옵니다.",
      },
    ],
    sources: [
      { label: "Release Notes", href: `${DOCS}/handbook/release-notes/overview.html` },
      { label: "TypeScript 6.0", href: `${DOCS}/handbook/release-notes/typescript-6-0.html` },
      { label: "Announcing TypeScript 7.0", href: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
      { label: "TypeScript 5.5", href: `${DOCS}/handbook/release-notes/typescript-5-5.html` },
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
      {
        label: "실제로 돌려 보면: 선언이 없을 때 → 임시 처방 → 제대로",
        body: "타입 없는 패키지를 import하면 \"Could not find a declaration file for module 'untyped'. … implicitly has an 'any' type. Try `npm i --save-dev @types/untyped` if it exists or add a new declaration (.d.ts) file containing `declare module 'untyped';`\"(TS7016)입니다. 문구가 세 길을 안내합니다.\n첫째는 @types 설치입니다(가져다 쓰기 장).\n둘째는 축약 앰비언트 선언 `declare module \"untyped\";`입니다. 전부 any가 됩니다. 실제로 에러는 사라졌지만 greet은 any였습니다.\n셋째는 제대로 된 .d.ts입니다(템플릿 장).\n실제로 `declare module \"untyped\" { function greet(name: string): string; namespace greet { const version: string } export = greet; }`를 두자 `import greet from`, `import greet = require()`, `import * as ns` 세 방식 모두 통과했습니다.",
        code: "import greet from \"untyped\";\n// TS7016: Could not find a declaration file for module 'untyped'. '…/node_modules/untyped/index.js'\n  implicitly has an 'any' type.\n//   Try `npm i --save-dev @types/untyped` if it exists or add a new declaration (.d.ts) file containing\n  `declare module 'untyped';`\n\n// 1) 임시 — 전부 any\ndeclare module \"untyped\";\n// 2) 제대로 — untyped.d.ts\ndeclare module \"untyped\" {\n  function greet(name: string): string;\n  namespace greet { const version: string; }\n  export = greet;\n}",
      },
      {
        label: "여덟 갈래의 역할",
        body: "소개는 지도입니다.\n참고서(선언 레퍼런스)는 '이런 JavaScript에는 이런 선언'의 짝 목록입니다.\n구조는 '이 라이브러리가 전역인가 모듈인가 UMD인가'를 알아내는 법입니다.\n템플릿은 그 판정에 따라 고르는 뼈대 여섯입니다.\nDo's and Don'ts는 타입 작성 규칙입니다.\n심화는 '선언이 네임스페이스·타입·값 중 무엇을 만드는가'라는 이론입니다.\n배포는 npm에 .d.ts를 싸는 법입니다(types 필드·typesVersions).\n사용은 @types를 받는 법입니다.\n읽기만 하려면 소개·참고서·심화를 보고, 쓰려면 구조 → 템플릿 → Do's and Don'ts → 배포 순서로 갑니다.",
      },
      {
        label: "다음 입구",
        body: "선언 파일 소개부터 열네 시트입니다. 가장 자주 돌아올 곳은 템플릿의 모듈 d.ts(export = 와 named export)와 Do's and Don'ts입니다.",
      },
    ],
    sources: [
      { label: "Declaration Files — Introduction", href: `${DOCS}/handbook/declaration-files/introduction.html` },
      { label: "Do's and Don'ts", href: `${DOCS}/handbook/declaration-files/do-s-and-don-ts.html` },
    ],
  },

  {
    id: "ts-dcl-intro",
    name: "선언 파일 소개",
    tagline: "누가 무엇부터 읽어야 하는가",
    intro:
      "선언 파일 섹션의 지도입니다. 섹션의 구성(선언 레퍼런스·라이브러리 구조·Do's and Don'ts·심화·npm 배포·찾아 설치)을 적고, 읽는 사람에 따라 출발점을 다르게 줍니다. '가장 흔한 경우 — 타입이 없는 npm 패키지에 타입을 붙이기 — 라면 바로 모듈 .d.ts 템플릿으로 가라', '라이브러리 구조는 새 선언 파일을 쓰는 저자용이고 기존 파일을 고치는 데는 보통 필요 없다', '모두가 Do's and Don'ts를 읽어야 한다'.",
    blocks: [
      {
        label: "세 종류의 독자",
        body: "(1) 타입 없는 패키지를 쓰려는 사람은 모듈 .d.ts 템플릿으로 직행합니다.\n(2) 라이브러리를 만들고 타입을 배포하려는 사람은 라이브러리 구조 → 템플릿 → 배포 순서로 읽습니다.\n(3) 기존 @types를 고치려는 사람은 선언 레퍼런스와 Do's and Don'ts를 봅니다.\n이 페이지는 '기본 TypeScript는 안다'고 가정하고 타입·모듈은 핸드북으로 넘깁니다.",
        code: "독자                         출발점\n──────────────────────────  ─────────────────────────────────────────\n타입 없는 패키지를 쓴다       templates/module.d.ts\n라이브러리 타입을 배포한다    library-structures → templates → publishing\n기존 @types 를 고친다         by-example (선언 레퍼런스) → do-s-and-don-ts\n모두                          do-s-and-don-ts",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: .d.ts 는 구현이 없는 .ts 다",
        body: "선언 파일은 `declare`가 붙은 선언들만 들어 있고 값(구현)이 없습니다. tsc가 `--declaration`으로 만들어 주는 것이 바로 그 모양입니다. 실제로 `export function noRet(x: number) { return { x, y: x * 2 }; }`를 컴파일하면 `export declare function noRet(x: number): { x: number; y: number; };`가 나왔습니다 — 본문이 사라지고 추론된 반환 타입이 적혔습니다. 손으로 쓰는 .d.ts는 이 출력과 같은 문법입니다. 5.5의 `isolatedDeclarations`를 켜면 추론에 기대는 선언을 거부합니다 — \"Function must have an explicit return type annotation with --isolatedDeclarations.\"(TS9007), \"Objects that contain shorthand properties can't be inferred with --isolatedDeclarations.\"(TS9016). 다른 도구(esbuild 등)가 .d.ts를 파일 단위로 만들 수 있게 하는 옵션입니다.",
        code: "// src/decl.ts\nexport function noRet(x: number) { return { x, y: x * 2 }; }\nexport const arrow = (a: string) => a.length;\nexport default class K { m() { return 1 } }\n\n// tsc --declaration --emitDeclarationOnly → decl.d.ts\nexport declare function noRet(x: number): { x: number; y: number; };\nexport declare const arrow: (a: string) => number;\nexport default class K { m(): number; }\n\n// --isolatedDeclarations (5.5)\n// TS9016: Objects that contain shorthand properties can't be inferred with --isolatedDeclarations.\n// TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.",
      },
      {
        label: "다음 입구",
        body: "선언 레퍼런스로 갑니다 — 'JavaScript가 이렇게 쓰이면 선언은 이렇게'의 짝 목록이고, 템플릿 장들이 그 조각을 파일 하나로 묶습니다.",
      },
    ],
    sources: [
      { label: "Declaration Files — Introduction", href: `${DOCS}/handbook/declaration-files/introduction.html` },
      { label: "TypeScript 5.5 — Isolated Declarations", href: `${DOCS}/handbook/release-notes/typescript-5-5.html#isolated-declarations` },
    ],
  },

  {
    id: "ts-dcl-reference",
    name: "선언 레퍼런스",
    tagline: "이렇게 쓰이는 JavaScript 에는 이렇게 선언한다 — 짝 목록",
    intro:
      "'By Example' 페이지입니다. 라이브러리가 어떻게 쓰이는지(사용 코드)를 보고 그에 맞는 선언을 적는 짝 목록입니다. 속성을 가진 객체(declare namespace), 오버로드된 함수, 재사용 타입(interface·type), 타입 묶기(namespace), 클래스(declare class), 전역 변수(declare var/let/const), 전역 함수(declare function)를 다룹니다.",
    blocks: [
      {
        label: "일곱 짝",
        body: "사용 코드를 보고 그에 맞는 선언을 적습니다.\n\n`myLib.makeGreeting(\"a\"); myLib.numberOfGreetings`의 선언은 `declare namespace myLib { function makeGreeting(s: string): string; let numberOfGreetings: number; }`입니다.\n`getWidget(43); getWidget(\"all\")`의 선언은 `declare function getWidget(n: number): Widget; declare function getWidget(s: string): Widget[];`입니다.\n설정 객체는 `interface GreetingSettings { greeting: string; duration?: number; color?: string }`입니다.\n여러 타입 중 하나는 `type GreetingLike = string | (() => string) | MyGreeter`입니다.\n관련 타입 묶기는 `declare namespace GreetingLib { interface LogOptions {…} }`입니다(중첩은 `GreetingLib.Options`로 씁니다).\n`new Greeter(\"x\")`의 선언은 `declare class Greeter { constructor(greeting: string); greeting: string; showGreeting(): void; }`입니다.\n`foo = 1`의 선언은 `declare var foo: number;`입니다(읽기 전용이면 `declare const`, 블록 스코프면 `declare let`입니다).\n`greet(\"a\")`의 선언은 `declare function greet(greeting: string): void;`입니다.",
        code: "// 사용 코드                              // 선언\nmyLib.makeGreeting(\"hello\");              declare namespace myLib {\nmyLib.numberOfGreetings;                    function makeGreeting(s: string): string;\n                                            let numberOfGreetings: number;\n                                          }\ngetWidget(43); getWidget(\"all\");          declare function getWidget(n: number): Widget;\n                                          declare function getWidget(s: string): Widget[];\nconst g = new Greeter(\"Hello\");           declare class Greeter {\ng.showGreeting();                           constructor(greeting: string);\n                                            greeting: string;\n                                            showGreeting(): void;\n                                          }\nfoo = 123;                                declare var foo: number;\ngreet(\"hi\");                              declare function greet(greeting: string): void;",
      },
      {
        label: "실제로 돌려 보면: 전역 선언 하나로 쓰는 쪽이 전부 검사된다",
        body: "전역 템플릿의 선언을 그대로 .d.ts에 두고 쓰는 파일을 컴파일했습니다. `myLib(\"x\")`·`myLib.timeout = 50`·`new myLib.Cat().purr()`·`const s: myLib.CatSettings`는 통과, `declare const version`에 대입한 `myLib.version = \"2\"`는 \"Cannot assign to 'version' because it is a read-only property.\"(TS2540), 선언에 없는 `window.__NOT_DECLARED__`는 \"Property '__NOT_DECLARED__' does not exist on type 'Window & typeof globalThis'.\"(TS2339). 선언이 '있다'고만 적는 것이 아니라 '어떻게 쓸 수 있다'(읽기 전용인가, 어떤 인자인가)까지 적는 것임을 보여 줍니다.",
        code: "// global-lib.d.ts\ndeclare function myLib(a: string): string;\ndeclare namespace myLib {\n  let timeout: number;\n  const version: string;\n  class Cat { purr(): void }\n  interface CatSettings { weight: number }\n  type VetID = string | number;\n}\n\n// use.ts\nmyLib.timeout = 50;        // OK — let\nmyLib.version = \"2\";\n// Cannot assign to 'version' because it is a read-only property. (TS2540) — const\nwindow.__NOT_DECLARED__;\n// Property '__NOT_DECLARED__' does not exist on type 'Window & typeof globalThis'. (TS2339)",
      },
      {
        label: "declare 가 뜻하는 것",
        body: "`declare`는 '이 이름은 어딘가에 존재한다, 구현은 여기 없다'는 뜻입니다. 값을 만들지 않으니 emit에 아무것도 남지 않고, .d.ts 파일에서는 최상위 선언에 사실상 항상 붙습니다(interface·type은 원래 값이 없어 생략합니다). 같은 키워드가 `declare module \"x\"`(앰비언트 모듈), `declare global`(전역 보강), 클래스 필드의 `declare x: T`(런타임 코드 없는 필드 재선언, 클래스 장)에도 쓰이고, 뜻은 같습니다. '타입만, 값은 밖에'입니다.",
        code: "declare 의 자리                    뜻\n────────────────────────────────  ──────────────────────────────────\ndeclare var/let/const/function    전역 값이 밖에 있다\ndeclare class                     생성자와 인스턴스 모양만\ndeclare namespace                 속성을 가진 전역 객체의 모양\ndeclare module \"x\" { … }          모듈 \"x\" 의 모양 (앰비언트 모듈)\ndeclare module \"x\";               모듈 \"x\" 는 any (축약)\ndeclare global { … }              모듈 파일 안에서 전역 보강\nclass { declare x: T }            필드 타입만 재선언, 코드 없음",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "짝 하나하나를 알았으면 다음은 '이 라이브러리는 어떤 종류인가'(라이브러리 구조)와 그에 맞는 파일 뼈대(템플릿)입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `myLib.makeGreeting(\"a\")`처럼 속성을 가진 전역 객체는 무엇으로 선언하나요?\n2) `declare const`와 `declare let`의 차이가 쓰는 쪽에서 어떻게 나타나나요?\n3) `declare`가 emit에 남기는 것은?",
      },
    ],
    sources: [
      { label: "Declaration Reference", href: `${DOCS}/handbook/declaration-files/by-example.html` },
      { label: "Global .d.ts", href: `${DOCS}/handbook/declaration-files/templates/global-d-ts.html` },
    ],
  },

  {
    id: "ts-dcl-structures",
    name: "라이브러리 구조",
    tagline: "전역인가 모듈인가 UMD 인가 — 코드를 보고 알아내는 법",
    intro:
      "선언 파일의 모양은 라이브러리가 '어떻게 쓰이는가'에 따라 갈립니다. 문서는 두 질문을 먼저 묻습니다. 어떻게 얻는가(npm만? CDN?), 어떻게 가져오는가(전역 객체? require/import?). 그리고 코드에서 종류를 알아보는 단서, 종류별 템플릿, 의존 선언법(`/// <reference types>` vs import)과 이름 충돌·ES6 호출 시그니처 두 각주를 적습니다.",
    blocks: [
      {
        label: "세 종류와 단서",
        body: "모듈은 '거의 모든 현대 Node.js 라이브러리'입니다. 단서는 조건 없는 require/define 호출, import/export, `exports`나 `module.exports`에 대입하는 코드입니다. window·global 대입은 드뭅니다.\n전역은 import 없이 씁니다. 단서는 최상위 var/function, `window.someName = …`, DOM 가정, 그리고 require/define이 없다는 점입니다. 문서는 'window에 붙이는 전역 라이브러리를 선언하기 전에 실제로는 UMD가 아닌지 확인하라'고 적습니다.\nUMD는 모듈로도 전역으로도 쓸 수 있습니다. 단서는 `typeof define`, `typeof window`, `typeof module` 검사입니다. '이게 보이면 거의 항상 UMD'입니다. 지금 인기 있는 전역 라이브러리는 대부분 UMD입니다.",
        code: "종류   단서 (라이브러리 코드에서)                                     템플릿\n────  ───────────────────────────────────────────────────────  ─────────────────────\n모듈  require()/define() 무조건 호출 · import/export · module.exports =  module.d.ts (+\n                                                                     class/function/plugin)\n전역  최상위 var/function · window.x = · DOM 가정 · import 없음         global.d.ts\nUMD   typeof define / typeof window / typeof module 분기              module.d.ts + export as namespace",
        codeLang: "text",
      },
      {
        label: "템플릿 고르기",
        body: "모듈이면 다시 묻습니다.\n모듈 자체를 호출하면(`x(42)`) module-function.d.ts입니다.\n`new`로 만들면 module-class.d.ts입니다.\nimport할 때 다른 모듈을 바꾸면(플러그인) module-plugin.d.ts입니다.\n아니면 module.d.ts입니다.\n전역이면 global.d.ts이고, 전역을 바꾸는 모듈이면 global-modifying-module.d.ts입니다.\n이 판정이 템플릿 허브와 그 아래 여섯 시트의 입구입니다.",
      },
      {
        label: "실제로 돌려 보면: 의존은 종류 조합에 따라 적는다",
        body: "선언 파일이 다른 라이브러리에 기댈 때의 규칙입니다.\n전역이 전역에 기대면 `/// <reference types=\"someLib\" />`를 씁니다.\n모듈이 모듈에 기대면 `import * as moment from \"moment\"`를 씁니다.\n전역이 UMD에 기대면 `/// <reference types=\"moment\" />`를 씁니다.\n모듈·UMD가 UMD에 기대면 import를 씁니다.\n문서의 경고는 'UMD 라이브러리에 대한 의존을 /// <reference 지시어로 선언하지 마라!'입니다. 그리고 `/// <reference types>`는 @types가 프로그램에 들어와야 동작합니다. 실제로 @types/node가 없을 때 \"Cannot find type definition file for 'node'.\"(TS2688)이 났고, `--typeRoots`로 알려 주자 통과했습니다. 6.0부터 `types: []`가 기본이라 전역 라이브러리의 타입이 자동으로 안 들어오는 것도 같은 자리의 문제입니다.",
        code: "// 전역 라이브러리가 다른 전역에 기댈 때\n/// <reference types=\"someLib\" />\nfunction getThing(): someLib.Thing;\n\n// 모듈이 모듈에 기댈 때\nimport * as moment from \"moment\";\nexport function getThing(): moment.Moment;\n\n$ npx tsc --noEmit rt/triple.ts\nrt/triple.ts(1,23): error TS2688: Cannot find type definition file for 'node'.   # @types 가 프로그램에 없다",
      },
      {
        label: "두 각주: 이름 충돌과 ES6 의 호출 시그니처",
        body: "각주 1은 전역 라이브러리의 타입은 전역의 네임스페이스 안에 두라는 것입니다. `interface KittySettings`를 최상위에 두면 다른 라이브러리와 충돌하니 `declare namespace cats { interface KittySettings {} }`로 감쌉니다.\n각주 2는 ES6 모듈의 최상위 객체는 '절대 호출할 수 없다'는 것입니다. 그래서 `module.exports = function`인 CJS 라이브러리를 ESM에서 쓰려면 default export가 필요하고, TypeScript는 `esModuleInterop: true`로 그 구멍을 메웁니다. 모듈 참고서 부록의 그 문제가 선언 파일 쪽에서는 '`export =`를 쓰되 소비자는 interop에 기댄다'로 나타납니다. 실제로 `export = greet`인 .d.ts를 `module: esnext`에서 `import greet = require()`로 쓰면 TS1202가 났고, `import greet from`은 allowSyntheticDefaultImports(bundler가 암묵적으로 켭니다) 덕에 통과했습니다.",
        code: "// 각주 1 — 충돌 피하기\ndeclare namespace cats { interface KittySettings { weight: number } }   // cats.KittySettings\n\n// 각주 2 — export = 와 ESM 소비자\ndeclare module \"typed-lib\" { function typedLib(s: string): number; export = typedLib; }\nimport typedLib from \"typed-lib\";        // bundler/nodenext: allowSyntheticDefaultImports 로 OK\n// module esnext: TS1202 Import assignment cannot be used when targeting ECMAScript modules.\nimport typedLib = require(\"typed-lib\");",
      },
      {
        label: "다음 입구",
        body: "판정이 끝나면 템플릿 허브에서 여섯 뼈대 중 하나를 고릅니다. 의존 선언의 `/// <reference types>`는 참고서의 트리플 슬래시 장, `export =`의 소비자 쪽 문제는 모듈 참고서 부록입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 라이브러리 코드에 `typeof define === \"function\"` 분기가 보이면 어떤 종류인가요?\n2) 전역 라이브러리 선언을 쓰기 전에 확인하라는 것은?\n3) UMD 의존을 `/// <reference>`로 적지 말라는 이유는?\n4) ES6 모듈 최상위 객체가 호출 불가인 사실이 선언에 미치는 영향은?",
      },
    ],
    sources: [
      { label: "Library Structures", href: `${DOCS}/handbook/declaration-files/library-structures.html` },
      { label: "Modules — ESM/CJS Interoperability", href: `${DOCS}/handbook/modules/appendices/esm-cjs-interop.html` },
    ],
  },

  {
    id: "ts-dcl-templates",
    name: "d.ts 템플릿",
    tagline: "여섯 뼈대 — 모듈 · 플러그인 · 클래스 · 함수 · 전역 · 전역 수정",
    intro:
      "라이브러리 구조에서 판정한 종류별로 복사해 시작하는 .d.ts 뼈대 여섯 개입니다. module.d.ts(일반 모듈), module-plugin.d.ts(다른 모듈을 보강), module-class.d.ts(`new`로 쓰는 모듈), module-function.d.ts(호출하는 모듈), global.d.ts(전역 라이브러리), global-modifying-module.d.ts(import하면 전역을 바꾸는 모듈). 각각이 시트 하나입니다.",
    blocks: [
      {
        label: "여섯 뼈대의 핵심 한 줄",
        body: "module은 `export function`·`export const`를 쓰고, 비객체 export면 `export = x`를 씁니다.\nplugin은 `export module \"대상\" { interface 보강 }`입니다(선언 병합).\nclass는 `export = Greeter; declare class Greeter {…}`에 타입용 `declare namespace Greeter`를 더한 꼴입니다.\nfunction은 `export = Greeter; declare function Greeter(…)` 오버로드에 속성용 namespace를 더한 꼴입니다.\nglobal은 `declare function`·`declare namespace`를 쓰고 import가 없습니다.\nglobal-modifying은 모듈 파일 안의 `declare global { interface String { … } }`입니다.",
        code: "템플릿                       핵심 문장                                     언제\n──────────────────────────  ───────────────────────────────────────────  ─────────────────────────────\nmodule.d.ts                 export function f(): T;  /  export = x;        import { f } from \"lib\"\nmodule-plugin.d.ts          export module \"base\" { interface X { … } }     import \"plugin\" 이 base 를 바꿈\nmodule-class.d.ts           export = C; declare class C { … }              new (require(\"lib\"))()\nmodule-function.d.ts        export = f; declare function f(…): …;          require(\"lib\")(42)\nglobal.d.ts                 declare function f(); declare namespace f {}   <script> 로 로드, import 없음\nglobal-modifying-module.d.ts declare global { interface String { … } }     import 하면 prototype 이 바뀜",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: export = 하나로 세 가지 import 가 된다",
        body: "클래스·함수 템플릿의 공통 핵심이 `export =`입니다. CJS의 `module.exports = X`에 대응하고, 소비자는 `import x = require()`, default import(esModuleInterop/allowSyntheticDefaultImports), `import * as`(객체일 때) 중 환경에 맞는 것을 씁니다. 실제로 nodenext(CJS 파일)에서 `export = greet`에 세 방식이 모두 통과했고, `greet.version`(namespace로 붙인 속성)과 `typedLib.Opts`(namespace 안의 타입)도 읽혔습니다. 템플릿 주석의 경고 — '`--esModuleInterop` 없이 `import * as x`로 가져오면 틀렸다(WRONG! DO NOT DO THIS!)'. 함수를 namespace import로 받으면 호출할 수 없기 때문입니다.",
        code: "// untyped.d.ts (function 템플릿)\ndeclare module \"untyped\" {\n  function greet(name: string): string;\n  namespace greet { const version: string; }\n  export = greet;\n}\n\n// 소비 (nodenext, CJS 파일) — 셋 다 OK\nimport greet from \"untyped\";          greet(\"a\"); greet.version;\nimport greet2 = require(\"untyped\");    greet2(\"b\");\nimport * as ns from \"untyped\";         ns.version;   // 함수 자체를 부르려면 이 방식은 안 됨",
      },
      {
        label: "다음 입구",
        body: "모듈 d.ts부터 여섯 시트입니다. 플러그인과 전역 수정은 참고서의 선언 병합이 메커니즘이고, 클래스·함수 템플릿의 `export =`는 모듈 참고서 부록과 짝입니다.",
      },
    ],
    sources: [
      { label: "Modules .d.ts", href: `${DOCS}/handbook/declaration-files/templates/module-d-ts.html` },
      { label: "Library Structures", href: `${DOCS}/handbook/declaration-files/library-structures.html` },
    ],
  },

  {
    id: "ts-dcl-t-modules",
    name: "모듈 d.ts",
    tagline: "CommonJS 와 ESM 의 export 패턴마다 대응하는 선언",
    intro:
      "가장 흔한 템플릿입니다. 라이브러리의 JavaScript가 어떻게 내보내는지(`module.exports = {…}`, `exports.x =`, `module.exports = 함수`, `export function`)를 보고 선언을 적는 법, 타입을 함께 내보내는 법(제네릭·네임스페이스 병합), UMD 전역 이름(`export as namespace`), 그리고 `@types/myLib/index.d.ts`처럼 파일을 배치하는 법을 다룹니다.",
    blocks: [
      {
        label: "CommonJS 세 패턴과 ESM",
        body: "`module.exports = { getArrayLength, maxInterval }`의 선언은 `export function getArrayLength(arr: any[]): number; export const maxInterval: 12;`입니다.\n객체가 아닌 것을 내보내면(`module.exports = /hello( world)?/`) `declare const helloWorld: RegExp; export = helloWorld;`입니다.\n속성이 붙은 함수(`module.exports = getArrayLength; module.exports.maxInterval = 12`)는 `declare function getArrayLength(…); declare namespace getArrayLength { const maxInterval: 12; } export = getArrayLength;`입니다.\nESM의 `export function`은 선언에서도 그대로 `export function`입니다.\n문서의 주의가 하나 있습니다. 소비자가 쓸 수 있는 import 형태(`import x from`, `import { x }`, `import * as`, `require`)를 전부 지원하려면 'JavaScript 코드가 실제로 그 패턴들을 지원해야 한다'는 것입니다. 선언이 거짓말을 하면 런타임이 깨집니다.",
        code: "// JS: module.exports = { getArrayLength, maxInterval }\nexport function getArrayLength(arr: any[]): number;\nexport const maxInterval: 12;\n\n// JS: module.exports = /hello( world)?/\ndeclare const helloWorld: RegExp;\nexport = helloWorld;\n\n// JS: module.exports = getArrayLength; module.exports.maxInterval = 12\ndeclare function getArrayLength(arr: any[]): number;\ndeclare namespace getArrayLength { const maxInterval: 12; }\nexport = getArrayLength;",
      },
      {
        label: "실제로 돌려 보면: 타입도 내보내고, 소비자는 import type 으로 받는다",
        body: "모듈은 값과 함께 타입을 내보냅니다. `export interface ArrayMetadata<ArrType> { length: number; firstObject: ArrType | undefined }`처럼 제네릭 인터페이스를 두고 함수가 그것을 돌려주게 합니다. 클래스와 네임스페이스를 같은 이름으로 병합해 `API.Options` 같은 중첩 타입을 담는 것도 이 템플릿의 패턴입니다. 소비자는 `import { ArrayMetadata }`, `import type { ArrayMetadata }`, JSDoc `@import`로 받습니다. 실제로 `export interface Opts { x: number }`가 든 .ts를 `--declaration --isolatedDeclarations`로 컴파일하면 interface는 그대로, 함수와 const는 어노테이션이 있어 통과했습니다.",
        code: "// lib.d.ts\nexport interface ArrayMetadata<ArrType> { length: number; firstObject: ArrType | undefined; }\nexport function getArrayMetadata<ArrType>(arr: ArrType[]): ArrayMetadata<ArrType>;\n\nexport class API { constructor(options: API.Options); }\nexport declare namespace API { interface Options { verbose: boolean } }   // 클래스 + 네임스페이스 병합\n\n// 소비자\nimport type { ArrayMetadata } from \"lib\";\n/** @import { Opts } from \"lib\" */   // JSDoc (5.5)",
      },
      {
        label: "UMD 전역 이름과 파일 배치",
        body: "`export as namespace moduleName;`을 .d.ts에 두면 스크립트 파일(모듈이 아닌 파일)에서 `moduleName.x`로 전역처럼 쓸 수 있습니다. UMD 라이브러리용입니다. 파일 배치는 라이브러리의 구조를 따라갑니다. `@types/myLib/index.d.ts`, `foo.d.ts`, `bar/index.d.ts`, `bar/baz.d.ts`처럼 두어 `import \"myLib/bar/baz\"`가 그 파일을 찾아가게 합니다. package.json의 `exports`가 있는 패키지라면 `types` 조건이 그 경로를 가리켜야 하고(모듈 레퍼런스 장의 traceResolution에서 \"Matched 'exports' condition 'types'\"가 보입니다), exports에 없는 하위 경로는 `declare module 'pkg/sub'`를 따로 두지 않으면 TS7016입니다.",
        code: "// UMD 전역\nexport as namespace myLib;\nexport function greet(): void;\n// 스크립트 파일에서: myLib.greet();\n\n// 배치\n@types/myLib/\n  index.d.ts        ← import \"myLib\"\n  foo.d.ts          ← import \"myLib/foo\"\n  bar/\n    index.d.ts      ← import \"myLib/bar\"\n    baz.d.ts        ← import \"myLib/bar/baz\"",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "모듈이 다른 모듈을 보강하면 플러그인 템플릿, `new`로 쓰면 클래스 템플릿, 호출하면 함수 템플릿입니다. 선언이 JavaScript와 어긋나지 않게 쓰는 규칙은 Do's and Don'ts입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `module.exports = /regex/`에 대응하는 선언은?\n2) 함수에 속성이 붙은 CJS export는 어떻게 선언하나요?\n3) `export as namespace`는 어떤 소비자를 위한 것인가요?\n4) 선언이 지원한다고 적은 import 형태를 JS가 실제로 지원하지 않으면 무슨 일이 생기나요?",
      },
    ],
    sources: [
      { label: "Modules .d.ts", href: `${DOCS}/handbook/declaration-files/templates/module-d-ts.html` },
      { label: "Modules — Reference (exports)", href: `${DOCS}/handbook/modules/reference.html` },
    ],
  },

  {
    id: "ts-dcl-t-plugin",
    name: "모듈: 플러그인",
    tagline: "import 하면 다른 모듈에 메서드가 생기는 라이브러리를 선언하는 법",
    intro:
      "`import \"hyper-super-greeter\"; greeter.hyperGreet();` — 플러그인을 import하는 것만으로 다른 모듈(`super-greeter`)의 객체에 메서드가 생기는 패턴입니다. 선언은 선언 병합으로 합니다. 대상 모듈을 import하고, `export module \"super-greeter\" { export interface GreeterFunction { hyperGreet(): void } }`로 그 모듈의 인터페이스를 보강합니다. 문서의 경고 — 'ES6 모듈은 불변으로 간주되어 이 패턴은 불가능해진다'.",
    blocks: [
      {
        label: "템플릿의 세 줄",
        body: "첫 줄은 '이 모듈이 더하는 대상 모듈을 import한다'입니다(`import { greeter } from \"super-greeter\";`).\n둘째는 대상 모듈을 보강하는 블록입니다. 템플릿은 `export module \"super-greeter\" { … }`로 쓰지만 핸드북 선언 병합 장의 `declare module \"./observable.js\" { … }`와 같은 메커니즘입니다.\n셋째는 보강 안에서 기존 인터페이스에 멤버를 더하는 일입니다. 기존 모듈의 `GreeterFunction`이 호출 시그니처 오버로드(`(name: string): void; (time: number): void`)를 가진 인터페이스였기에 메서드를 더할 수 있습니다. 함수를 `declare function`으로 적었다면 보강할 인터페이스가 없습니다. 보강 가능성을 열어 두려면 기반 라이브러리가 인터페이스로 선언해야 합니다.",
        code: "// super-greeter.d.ts (기반)\nexport interface GreeterFunction { (name: string): void; (time: number): void }\nexport const greeter: GreeterFunction;\n\n// hyper-super-greeter.d.ts (플러그인)\nimport { greeter } from \"super-greeter\";        // 1. 대상 import\nexport module \"super-greeter\" {                 // 2. 대상 모듈 보강 (= declare module)\n  export interface GreeterFunction {            // 3. 기존 인터페이스에 멤버 추가\n    hyperGreet(): void;\n  }\n}",
      },
      {
        label: "실제로 돌려 보면: 보강은 패치만, 새 최상위 선언은 못 한다",
        body: "핸드북 선언 병합 장에서 돌린 그대로입니다. `declare module \"./observable.js\" { interface Observable<T> { map<U>(…): Observable<U> } }`를 두고 `new Observable(1).map(String)`이 통과했습니다. 한계는 '보강에서는 새 최상위 선언을 할 수 없고 기존 선언에 대한 패치만'입니다. default export는 보강할 수 없고 named만 됩니다. 그리고 보강 파일 자체가 모듈이어야 하므로(import나 export가 있어야 합니다) 다른 export가 없으면 `export {}`를 붙입니다.",
        code: "import \"./observable.js\";\ndeclare module \"./observable.js\" {\n  interface Observable<T> { map<U>(f: (x: T) => U): Observable<U>; }   // 패치 — OK\n}\nexport {};   // 이 파일을 모듈로\n\n// 소비\nnew Observable(1).map((x) => String(x));   // OK",
      },
      {
        label: "문제의 구조: 타입은 병합되지만 값은 런타임이 넣어야 한다",
        body: "선언 병합은 타입 세계의 일입니다. `hyperGreet`가 실제로 greeter 객체에 생기는 것은 플러그인 JavaScript가 import 시점에 `greeter.hyperGreet = …`를 실행하기 때문입니다. 선언이 그 사실을 '따라가서' 적는 것이지 만드는 것이 아닙니다. 그래서 import 지우기가 위험합니다 — 플러그인에서 타입만 가져오면(값 사용이 없으면) import가 지워져 런타임 패치가 실행되지 않습니다. 부수 효과 import `import \"hyper-super-greeter\";`를 따로 두는 것이 처방이고, 핸드북 모듈 장의 TS2882(noUncheckedSideEffectImports)가 그 import의 경로를 지켜 줍니다. 문서의 ES6 경고도 같은 선 위에 있습니다 — ES 모듈의 네임스페이스 객체는 불변이라 `ns.hyperGreet = …` 자체가 안 됩니다. 그래서 요즘 라이브러리는 플러그인 패턴 대신 `app.use(plugin)`처럼 명시적 등록 API를 씁니다(Vue·Fastify).",
        code: "타입 (선언 병합)                 값 (런타임)\n────────────────────────────    ─────────────────────────────────\nexport module \"super-greeter\"   import 시 greeter.hyperGreet = fn 실행\n{ interface GreeterFunction      ← 플러그인 JS 가 하는 일\n  { hyperGreet(): void } }\n\n위험: 타입만 쓰면 import 가 지워져 런타임 패치가 안 돈다\n처방: import \"hyper-super-greeter\";   (부수 효과 import 를 따로)\nES 모듈: 네임스페이스 객체가 불변 → 패턴 자체가 불가 → app.use(plugin) 식 등록 API 로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "선언 병합의 전체 규칙은 참고서의 선언 병합 장, 전역을 바꾸는 쪽은 전역: 모듈 수정 템플릿, 보강이 아니라 모듈 자체가 클래스·함수인 경우는 다음 두 템플릿입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 플러그인 템플릿의 첫 줄이 대상 모듈을 import하는 이유는?\n2) 기반 라이브러리가 함수를 `declare function`으로 선언했다면 플러그인이 메서드를 더할 수 있나요?\n3) 플러그인에서 타입만 가져오면 왜 런타임 패치가 사라질 수 있나요?\n4) ES6 모듈에서 이 패턴이 불가능한 이유는?",
      },
    ],
    sources: [
      { label: "Module: Plugin .d.ts", href: `${DOCS}/handbook/declaration-files/templates/module-plugin-d-ts.html` },
      { label: "Declaration Merging — Module Augmentation", href: `${DOCS}/handbook/declaration-merging.html#module-augmentation` },
    ],
  },

  {
    id: "ts-dcl-t-class",
    name: "모듈: 클래스",
    tagline: "require 해서 new 로 쓰는 모듈 — export = 와 declare class",
    intro:
      "`const Greeter = require(\"super-greeter\"); const greeter = new Greeter();`처럼 모듈 자체가 클래스인 라이브러리의 선언입니다. 뼈대는 `export = Greeter;` + `declare class Greeter { constructor(customGreeting?: string); greet: void; myMethod(opts: MyClass.MyClassMethodOptions): number; }` + 타입을 담는 `declare namespace MyClass`입니다. 선택으로 UMD 전역 `export as namespace`를 더합니다. 템플릿 주석이 소비자 쪽 주의를 길게 적습니다.",
    blocks: [
      {
        label: "뼈대",
        body: "`export =`는 '모듈 전체가 이 값'이라는 뜻이고 CJS의 `module.exports = Greeter`에 대응합니다. 템플릿 주석 — 'ES6 모듈은 클래스 객체를 직접 내보낼 수 없다'(ESM의 최상위는 네임스페이스 객체니까). 그래서 소비자는 `import x = require(\"…\")`를 쓰거나, `--allowSyntheticDefaultImports`/`--esModuleInterop`이 있을 때 default import를 씁니다. `declare namespace MyClass { interface MyClassMethodOptions { … } }`는 메서드 인자 타입처럼 클래스와 함께 내보내야 하는 타입의 자리입니다 — 클래스와 같은 이름의 네임스페이스는 병합되어 `Greeter.MyClassMethodOptions`로 접근됩니다.",
        code: "// super-greeter.d.ts\nexport = Greeter;\n\ndeclare class Greeter {\n  constructor(customGreeting?: string);\n  greet: void;\n  myMethod(opts: MyClass.MyClassMethodOptions): number;\n}\n\ndeclare namespace MyClass {\n  export interface MyClassMethodOptions { a?: string; b?: number; }\n}\n\n// 선택: UMD 전역\n// export as namespace myClassLib;",
      },
      {
        label: "실제로 돌려 보면: 소비자의 세 import 와 WRONG 주석",
        body: "템플릿 주석 — '`--esModuleInterop` 없이 `import * as x from \"…\"`로 가져오는 것은 틀렸다(WRONG! DO NOT DO THIS!)'. namespace import는 객체를 받으니 `new x()`를 할 수 없습니다. 실제로 `export =` 선언을 nodenext(CJS)에서 `import X = require()`, `import X from`(interop), `import * as ns`로 각각 가져왔을 때 셋 다 컴파일은 됐지만, ns로는 생성자를 못 부르고 속성(`ns.version`)만 읽을 수 있었습니다. `module: esnext`에서는 `import X = require()` 자체가 \"Import assignment cannot be used when targeting ECMAScript modules.\"(TS1202)라 default import만 남습니다.",
        code: "// 소비자\nimport Greeter = require(\"super-greeter\");   // CJS 출력에서 가장 정확\nimport Greeter from \"super-greeter\";          // esModuleInterop / allowSyntheticDefaultImports\nimport * as Greeter from \"super-greeter\";     // WRONG — 객체라 new 불가 (interop 없으면)\n\n// module esnext\nimport Greeter = require(\"super-greeter\");\n// Import assignment cannot be used when targeting ECMAScript modules. (TS1202)",
      },
      {
        label: "클래스 선언에서 적는 것",
        body: "`declare class`에는 생성자 시그니처(오버로드 가능), 인스턴스 속성과 메서드, static 멤버, 접근 제한자를 적습니다. 본문은 없습니다. 클래스 장의 사실 — 클래스 선언은 값(`typeof Greeter`)과 타입(`Greeter`) 둘을 만듭니다 — 이 그대로 적용되어, `export = Greeter`로 값을 내보내면 소비자는 `Greeter` 타입도 함께 받습니다. `InstanceType<typeof Greeter>`가 Greeter인 것도 같습니다. 참고서의 깊이 알아보기 장이 '클래스 = 타입 + 값'을 표로 정리합니다.",
      },
      {
        label: "다음 입구",
        body: "모듈이 클래스가 아니라 함수면 다음 템플릿, 둘 다 `export =` 위에 있고 소비자 쪽의 default 혼란은 모듈 참고서 부록입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `export = Greeter`가 CJS의 무엇에 대응하나요?\n2) `import * as Greeter`가 틀린 이유는?\n3) 클래스와 같은 이름의 `declare namespace`는 무엇을 위해 두나요?\n4) `module: esnext`에서 쓸 수 없는 import 형태는?",
      },
    ],
    sources: [
      { label: "Module: Class .d.ts", href: `${DOCS}/handbook/declaration-files/templates/module-class-d-ts.html` },
      { label: "Modules — ESM/CJS Interoperability", href: `${DOCS}/handbook/modules/appendices/esm-cjs-interop.html` },
    ],
  },

  {
    id: "ts-dcl-t-function",
    name: "모듈: 함수",
    tagline: "require 해서 바로 호출하는 모듈 — 오버로드와 속성용 네임스페이스",
    intro:
      "`import greeter from \"super-greeter\"; greeter(2); greeter(\"Hello world\");`처럼 모듈 자체가 함수인 라이브러리의 선언입니다. 뼈대는 `declare function Greeter(name: string): Greeter.NamedReturnType; declare function Greeter(length: number): Greeter.LengthReturnType;`(오버로드) + `export = Greeter;` + 속성과 반환 타입을 담는 `declare namespace Greeter`입니다.",
    blocks: [
      {
        label: "뼈대",
        body: "함수를 `declare function`으로 오버로드마다 한 줄씩 적고 `export =`로 내보냅니다. 함수에 붙은 속성(`greeter.defaultName`)은 같은 이름의 네임스페이스에 `export const defaultName: string; export let defaultLength: number;`로 적습니다. 선언 병합의 '네임스페이스 + 함수'입니다. 반환 타입 인터페이스(`LengthReturnType`·`NamedReturnType`)도 그 네임스페이스 안에 둡니다. 템플릿 주석의 소비 예는 `import f = require('super-greeter'); console.log(f.defaultName);`입니다.",
        code: "// super-greeter.d.ts\nexport = Greeter;\n\ndeclare function Greeter(name: string): Greeter.NamedReturnType;\ndeclare function Greeter(length: number): Greeter.LengthReturnType;\n\ndeclare namespace Greeter {\n  export interface LengthReturnType { width: number; height: number; }\n  export interface NamedReturnType { firstName: string; lastName: string; }\n  export const defaultName: string;\n  export let defaultLength: number;\n}",
      },
      {
        label: "실제로 돌려 보면: 같은 모양을 .d.ts 로 두고 세 방식으로 소비",
        body: "`declare module \"untyped\" { function greet(name: string): string; namespace greet { const version: string } export = greet; }`가 정확히 이 템플릿입니다. 실제로 `import greet from`으로 `greet(\"a\")`와 `greet.version`, `import greet2 = require()`로 `greet2(\"b\")`, `import * as ns`로 `ns.version`이 전부 통과했습니다. 그리고 `@types/typed-lib` 모양으로 만든 `export = typedLib` + `namespace typedLib { interface Opts }`에서 `const o: typedLib.Opts`도 읽혔습니다. 템플릿 주석의 경고는 클래스 템플릿과 같습니다 — interop 없이 namespace import하면 '잘못 가져온 것'이 되어 호출할 수 없습니다.",
        code: "import greet from \"untyped\";          greet(\"a\"); greet.version;      // OK\nimport greet2 = require(\"untyped\");    greet2(\"b\");                     // OK\nimport * as ns from \"untyped\";         ns.version;                      // OK — 하지만 ns() 는 불가\nimport typedLib from \"typed-lib\";      const o: typedLib.Opts = { x: 1 };   // 네임스페이스 안의 타입",
      },
      {
        label: "오버로드를 적을 때의 규칙",
        body: "Do's and Don'ts의 오버로드 규칙이 여기서 바로 쓰입니다.\n구체적인 시그니처를 앞에, 일반적인 것을 뒤에 둡니다(TypeScript는 첫 번째로 맞는 오버로드를 고릅니다).\n끝 매개변수만 다르면 오버로드 대신 선택적 매개변수를 씁니다.\n한 자리의 타입만 다르면 유니온을 씁니다.\n함수 템플릿의 `(name: string)`과 `(length: number)`는 반환 타입이 다르기 때문에 유니온으로 합칠 수 없어 오버로드가 맞습니다. 반환이 같았다면 `(x: string | number)` 한 줄이 나았을 것입니다.",
        code: "// 반환 타입이 다르다 → 오버로드가 맞다\ndeclare function Greeter(name: string): Greeter.NamedReturnType;\ndeclare function Greeter(length: number): Greeter.LengthReturnType;\n\n// 반환이 같다면 → 유니온 한 줄\ndeclare function len(x: string | any[]): number;",
      },
      {
        label: "다음 입구",
        body: "오버로드 작성 규칙 전체는 Do's and Don'ts, 함수+네임스페이스 병합의 메커니즘은 참고서의 선언 병합, 모듈이 아니라 전역이면 다음 템플릿입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 함수에 붙은 속성 `greeter.defaultName`은 어디에 선언하나요?\n2) `(name: string)`과 `(length: number)` 오버로드를 유니온 한 줄로 못 합치는 이유는?\n3) interop 없는 namespace import의 문제는?",
      },
    ],
    sources: [
      { label: "Module: Function .d.ts", href: `${DOCS}/handbook/declaration-files/templates/module-function-d-ts.html` },
      { label: "Do's and Don'ts — Function Overloads", href: `${DOCS}/handbook/declaration-files/do-s-and-don-ts.html#function-overloads` },
    ],
  },

  {
    id: "ts-dcl-t-global",
    name: "전역 d.ts",
    tagline: "import 없이 쓰는 라이브러리 — declare function · declare namespace",
    intro:
      "`<script>`로 로드하면 `$(…)`처럼 전역에서 바로 쓰는 라이브러리의 선언입니다. 단서는 최상위 var/function, `window.someName = …`, DOM 가정, 그리고 require/define이 없다는 점입니다. 템플릿은 호출 가능한 전역이면 `declare function myLib(a: string): string;`(오버로드)을 쓰고, 타입으로도 쓰이면 `interface myLib`를 두고, 속성과 타입은 `declare namespace myLib { let timeout: number; const version: string; class Cat; interface CatSettings; type VetID; function checkCat(); }`에 담습니다. 문서가 반복하는 주의는 '인기 있는 전역 라이브러리는 대부분 지금은 UMD다. 전역 선언을 쓰기 전에 확인하라'입니다.",
    blocks: [
      {
        label: "뼈대와 템플릿의 주석",
        body: "템플릿의 주석들이 선언의 '뜻'을 적어 줍니다. `let timeout: number` 옆에는 'myLib.timeout = 50;은 허용된다', `const version: string` 옆에는 'myLib.version은 읽을 수 있지만 바꿀 수 없다', 그리고 `interface myLib` 옆에는 '이게 정말 말이 되는지 확인하라! 아니면 이 선언을 지워라…'가 있습니다. 전역 라이브러리의 이름이 함수이면서 타입(`let x: myLib`)으로도 쓰이는 경우가 드물기 때문입니다. 실제로 이 템플릿 그대로 돌린 결과가 선언 레퍼런스 시트에 있습니다. `timeout` 대입은 OK였고, `version` 대입은 TS2540이 났습니다.",
        code: "// global.d.ts\ndeclare function myLib(a: string): string;\ndeclare function myLib(a: number): number;\n\ninterface myLib { name: string; length: number; extras?: string[]; }   // 타입으로도 쓰일 때만\n\ndeclare namespace myLib {\n  let timeout: number;          // myLib.timeout = 50  OK\n  const version: string;        // 읽기만\n  class Cat { constructor(n: number); readonly age: number; purr(): void; }\n  interface CatSettings { weight: number; name: string; tailLength?: number; }\n  type VetID = string | number;\n  function checkCat(c: Cat, s?: VetID): void;\n}",
      },
      {
        label: "실제로 돌려 보면: 전역 선언은 '스크립트 파일' 이어야 한다",
        body: "전역 .d.ts에 import나 export가 하나라도 있으면 그 파일은 모듈이 되고 선언은 전역이 아니게 됩니다(핸드북 모듈 장의 '한 줄의 차이'). 그래서 전역 템플릿에는 import가 없고, 다른 전역에 기대려면 `/// <reference types=\"…\" />`를 씁니다. 반대로 모듈 파일 안에서 전역에 무언가를 더해야 하면 `declare global { … }`를 씁니다(다음 템플릿). 그리고 이 .d.ts가 프로그램에 들어와야 합니다. `include`에 잡히거나 `types`·`typeRoots`로 알려 줍니다. 6.0부터 `types: []`가 기본이라 `node_modules/@types`의 전역이 자동으로 안 들어오는 것이 흔한 '갑자기 전역이 사라진' 원인입니다. 실제로 `/// <reference types=\"node\" />`가 @types를 못 찾을 때 TS2688과 함께 `process`가 TS2591로 사라졌습니다.",
        code: "// 전역 .d.ts 가 모듈이 되는 순간 — 이 한 줄로 전역이 아니게 된다\nimport type { X } from \"./x\";     // ← 있으면 모듈. 전역 선언은 declare global 로 감싸야 한다\ndeclare var legacyGlobal: number; // 모듈 파일 안의 이 선언은 전역이 아니다\n\n// 프로그램에 들어오게\n{ \"compilerOptions\": { \"types\": [\"node\", \"jest\"] } }   // 6.0+: 기본 [] 이라 명시\n// 또는 include 에 .d.ts 경로, 또는 /// <reference types=\"…\" />",
      },
      {
        label: "문제의 구조: 전역은 '이름 하나를 모든 파일이 공유' 하는 것이다",
        body: "전역 선언의 비용은 충돌입니다. 라이브러리 구조 장의 각주 — 타입을 최상위에 두지 말고 라이브러리 네임스페이스 안에 두라(`cats.KittySettings`). 그리고 두 전역 .d.ts가 같은 이름을 다르게 선언하면 TS2300·TS2451로 깨집니다. 모듈로 쓸 수 있는 라이브러리라면 모듈 템플릿이 항상 낫고, 문서가 '정말 전역인지, UMD는 아닌지'를 두 번 묻는 이유가 그것입니다.",
      },
      {
        label: "다음 입구",
        body: "모듈이지만 import하면 전역(String.prototype 등)을 바꾸는 라이브러리는 다음 템플릿 전역: 모듈 수정입니다. 전역 .d.ts가 프로그램에 들어오는 규칙은 프로젝트 설정의 tsconfig.json 장(include·files)과 TSConfig 레퍼런스(types·typeRoots)에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) 전역 .d.ts에 import를 한 줄 넣으면 무슨 일이 생기나요?\n2) `declare namespace` 안의 `let`과 `const`가 쓰는 쪽에서 어떻게 다르게 검사되나요?\n3) 6.0에서 전역 타입이 '사라진' 가장 흔한 이유와 처방은?\n4) 전역 라이브러리 선언 전에 문서가 확인하라는 것은?",
      },
    ],
    sources: [
      { label: "Global .d.ts", href: `${DOCS}/handbook/declaration-files/templates/global-d-ts.html` },
      { label: "TSConfig — types", href: `${TSCONFIG}/#types` },
    ],
  },

  {
    id: "ts-dcl-t-globalmod",
    name: "전역: 모듈 수정",
    tagline: "import 하면 String.prototype 이 바뀌는 모듈 — declare global",
    intro:
      "`require(\"string-fancy\")`를 부르는 것만으로 `\"x\".fancyFormat()`이 생기는 식의, 가져오면 전역을 바꾸는 모듈의 선언입니다. 문서의 첫 줄 — '이 패턴은 런타임 충돌 가능성 때문에 다소 위험하다'. 템플릿은 모듈 파일 안의 `declare global { interface String { fancyFormat(opts: StringFormatOptions): string; } }`이고, 모듈 자체의 export(`export interface StringFormatOptions`, `export function doSomething`)가 함께 있을 수 있으며, export가 없으면 `export {};`가 필요합니다.",
    blocks: [
      {
        label: "뼈대",
        body: "알아보는 법은 '반환값을 쓰지 않는(또는 쓰는) require 호출이 있고, 그 뒤 내장 타입에 메서드가 생긴다'입니다. 선언은 모듈 파일(import/export가 있는 파일) 안에서 `declare global` 블록으로 전역 인터페이스를 보강합니다. 참고서 선언 병합 장의 '전역 보강' 그 자체이고 '모듈 보강과 같은 동작과 한계'를 가집니다. 패치만 되고, 새 최상위 선언은 못 합니다. 템플릿 주석은 모듈이 호출 가능하거나 생성 가능하면 클래스·함수 템플릿과 합치라고 적습니다.",
        code: "// string-fancy.d.ts\nexport interface StringFormatOptions { fancinessLevel: number; }\nexport function doSomething(): void;          // 모듈 자체의 export (있을 수도 없을 수도)\n\ndeclare global {\n  interface String {\n    fancyFormat(opts: StringFormatOptions): string;\n  }\n}\n// export 가 하나도 없다면:\n// export {};",
      },
      {
        label: "실제로 돌려 보면: declare global 로 Array 와 Window 를 보강",
        body: "참고서 선언 병합 시트에서 돌린 그대로입니다. 모듈 파일(`export {}` 포함)에 `declare global { interface Array<T> { toObservable(): … } interface Window { __APP__: string } }`를 두고 다른 파일에서 `[1].toObservable()`과 `window.__APP__ = \"x\"`가 통과했습니다. 선언하지 않은 `window.__NOT_DECLARED__`는 TS2339. 보강은 그 파일이 프로그램에 들어오는 순간 전역에 적용되므로, 어디서 보강했는지 추적이 어렵다는 것이 '위험'의 타입 쪽 얼굴입니다.",
        code: "// augment.ts (모듈)\ndeclare global {\n  interface Array<T> { toObservable(): import(\"./observable.js\").Observable<T>; }\n  interface Window { __APP__: string; }\n}\nexport {};\n\n// use.ts\n[1].toObservable();  // OK\nwindow.__APP__ = \"x\";  // OK\nwindow.__NOT_DECLARED__;  // Property '__NOT_DECLARED__' does not exist on type 'Window & typeof\n                          globalThis'. (TS2339)",
      },
      {
        label: "문제의 구조: 전역을 바꾸는 모듈은 '누가 먼저 import 했나' 에 기댄다",
        body: "런타임 쪽 위험입니다. `\"x\".fancyFormat()`이 동작하려면 그 전에 어딘가에서 `import \"string-fancy\"`가 실행되어 prototype이 바뀌어 있어야 합니다. 타입은 프로그램 전체에 보강되어 어느 파일에서든 통과하니, import하지 않은 파일에서 쓰면 '컴파일은 되는데 런타임 TypeError'가 됩니다. 두 라이브러리가 같은 이름을 prototype에 붙이면 나중 것이 이기고 타입은 둘 다 통과(또는 충돌 에러). 그래서 문서가 '위험'이라 적고, 지금의 라이브러리들은 prototype 패치 대신 함수 import(`import { fancyFormat } from`)를 씁니다 — 타입과 값이 같은 import 한 줄에 묶이니까요.",
        code: "타입 (declare global)            값 (런타임 prototype 패치)\n───────────────────────────────  ──────────────────────────────────────\n프로그램 전체에 적용               import \"string-fancy\" 가 실행된 뒤에만\n→ 어느 파일에서든 통과              → import 안 한 파일에서 TypeError\n두 라이브러리가 같은 이름           나중 것이 이김 (조용히)\n\n대안: export function fancyFormat(s: string) — 타입과 값이 한 import 에",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "여섯 템플릿이 끝났습니다. 어떤 템플릿을 쓰든 타입을 적는 규칙은 다음 장 Do's and Don'ts이고, 선언이 네임스페이스·타입·값 중 무엇을 만드는지는 깊이 알아보기입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `declare global`은 어떤 종류의 파일 안에서만 전역 보강이 되나요?\n2) 보강 파일에 다른 export가 없을 때 필요한 한 줄은?\n3) 이 패턴이 '위험'한 이유를 타입 쪽과 런타임 쪽으로 나눠 적어 보세요.",
      },
    ],
    sources: [
      { label: "Global: Modifying Module .d.ts", href: `${DOCS}/handbook/declaration-files/templates/global-modifying-module-d-ts.html` },
      { label: "Declaration Merging — Global augmentation", href: `${DOCS}/handbook/declaration-merging.html#global-augmentation` },
    ],
  },

  {
    id: "ts-dcl-dos",
    name: "해야 할 것과 하지 말 것",
    tagline: "타입을 적을 때 흔히 하는 실수 — 일반 타입 · 콜백 · 오버로드",
    intro:
      "선언 파일 섹션에서 '모두가 읽어야 하는' 페이지입니다. 세 묶음입니다.\n일반 타입은 Number·String·Boolean·Symbol·Object를 쓰지 않고, 쓰지 않는 제네릭 매개변수를 두지 않고, any 대신 unknown을 씁니다.\n콜백 타입은 반환을 void로 하고, 선택적 매개변수를 두지 않고, 인자 수만 다른 오버로드를 만들지 않습니다.\n오버로드는 구체적인 것을 먼저 두고, 끝 매개변수 차이는 선택적 매개변수로, 한 자리 차이는 유니온으로 적습니다.",
    blocks: [
      {
        label: "일반 타입: 소문자, 그리고 unknown",
        body: "`Number`·`String`·`Boolean`·`Symbol`·`Object`는 거의 항상 틀립니다. 래퍼 객체의 타입이라 원시값 자리에 못 들어갑니다(일상적인 타입의 원시 타입 절). 소문자 `number`·`string`·`boolean`·`symbol`을 씁니다. 원시가 아닌 값에는 `object`를 씁니다(2.2). 타입 매개변수를 쓰지 않는 제네릭(`interface Something<T> { name: string }`)은 만들지 않습니다. 타입 호환성 장에서 보듯 쓰이지 않는 T는 무시되어 `Something<string>`과 `Something<number>`가 같아집니다. 'JavaScript를 옮기는 중이 아니면 any를 쓰지 말고, 무엇이든 받으려면 unknown'이라는 규칙도 있습니다.",
        code: "// Don't\nfunction reverse(s: String): String;\n// Do\nfunction reverse(s: string): string;\n\n// Don't — T 가 안 쓰인다\ninterface Something<T> { name: string }\n// 실제로: Empty<number> 에 Empty<string> 이 그대로 들어간다 (타입 호환성)\n\n// Don't / Do\nfunction fn(x: any): void;\nfunction fn(x: unknown): void;   // 쓰기 전에 좁혀야 한다",
      },
      {
        label: "실제로 돌려 보면: 콜백의 반환은 void, 매개변수는 적어도 된다",
        body: "콜백의 반환값을 쓰지 않는다면 `() => any`가 아니라 `() => void`로 적습니다. any로 적으면 호출한 쪽이 반환값을 믿고 쓸 수 있어서입니다. 실제로 `declare function anyReturn(callback: () => any): void;`의 `anyReturn(() => 42).toFixed`는 \"Property 'toFixed' does not exist on type 'void'.\"로 — anyReturn 자신의 반환이 void라 — 걸렸지만, 콜백 안의 `42`는 아무 말 없이 통과했습니다. `() => void`로 적어도 `voidReturn(() => 42)`는 통과합니다(함수 장의 void 반환 규칙) — 뜻이 '무시한다'로 바뀌는 것뿐입니다. 콜백 매개변수는 선택적으로 적지 않습니다 — '콜백은 항상 더 적은 인자를 받아도 되므로' `(elapsedTime: number) => void`가 맞습니다. 인자 수만 다른 오버로드(`(cb: () => void)`와 `(cb: (n: number) => void)`)도 쓰지 않고 가장 많은 인자의 것 하나만 적습니다.",
        code: "// Don't\nfunction fn(x: () => any) { x(); }\n// Do\nfunction fn(x: () => void) { x(); }   // 반환을 쓰지 않겠다는 약속\n\n// Don't — 콜백 매개변수를 선택적으로\ninterface Fetcher { getObject(done: (data: unknown, elapsedTime?: number) => void): void; }\n// Do — 콜백은 더 적은 인자를 받아도 되니까\ninterface Fetcher { getObject(done: (data: unknown, elapsedTime: number) => void): void; }\n\n// Don't — 인자 수만 다른 오버로드\ndeclare function beforeAll(action: () => void, timeout?: number): void;\ndeclare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;\n// Do — 가장 많은 인자 하나\ndeclare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;",
      },
      {
        label: "오버로드: 순서 · 선택적 · 유니온",
        body: "'TypeScript는 첫 번째로 맞는 오버로드를 고른다'는 규칙이 있습니다. 그래서 일반적인 시그니처(`(x: unknown): unknown`)를 앞에 두면 구체적인 것이 영원히 선택되지 않습니다. 실제로 `fn`(구체→일반)의 `fn(\"s\")`는 string으로 잡혔습니다. `bad`(일반→구체)의 `bad(\"s\")`는 unknown으로 잡혔습니다. 끝 매개변수만 다른 오버로드들(`(x)`, `(x, y)`, `(x, y, z)`)은 선택적 매개변수 하나로 합칩니다. 단 '반환 타입이 전부 같을 때만'입니다. 한 자리의 타입만 다른 오버로드들(`(x: string)`, `(x: number)`)은 유니온 하나로 합칩니다. 호출하는 쪽도 유니온 값을 바로 넘길 수 있어 더 낫습니다(함수 장의 TS2769가 그 예입니다).",
        code: "// 순서\nexport declare function fn(x: string): string;\nexport declare function fn(x: number): number;\nexport declare function fn(x: unknown): unknown;    // 일반은 마지막\nexport declare function bad(x: unknown): unknown;   // 일반이 먼저 →\nexport declare function bad(x: string): string;     //   이 줄은 절대 안 뽑힌다\nconst a = fn(\"s\");    // a: string\nconst b = bad(\"s\");   // b: unknown   ← 실제로 그렇게 잡혔다\n\n// 끝 매개변수 → 선택적 (반환이 같을 때)\ndeclare function diff(one: string, two?: string, three?: string): number;\n// 한 자리 타입 → 유니온\ndeclare function moveBy(dx: number | string, dy: number | string): void;",
      },
      {
        label: "문제의 구조: 선언은 '쓰는 쪽에 무엇을 허용하는가' 를 정한다",
        body: "이 페이지의 모든 규칙은 '선언이 소비자에게 열어 주는 문'을 좁히는 쪽입니다. any 대신 unknown은 '확인 없이 쓰는 문'을 닫고, void 반환은 '반환값을 믿는 문'을 닫고, 콜백 매개변수를 필수로 두는 것은 '덜 넘겨도 되는 문'을 선언 쪽에서 억지로 열지 않는 것, 오버로드 순서는 '맞는 문이 가려지는 일'을 막는 것입니다. 선언 파일은 구현이 없으니 검사기가 믿을 수 있는 것은 선언의 문구뿐이고, 그래서 선언의 작은 느슨함이 소비자 전체로 퍼집니다.",
      },
      {
        label: "다음 입구",
        body: "오버로드 규칙의 메커니즘(첫 매치)은 핸드북 함수 장, void 반환 규칙은 같은 장의 마지막 절, 쓰이지 않는 제네릭이 무시되는 이유는 참고서 타입 호환성입니다. 다음 장 깊이 알아보기는 선언이 만드는 세 가지(네임스페이스·타입·값)를 정리합니다.",
      },
      {
        label: "확인 질문",
        body: "1) `String`과 `string`의 차이가 선언에서 문제가 되는 이유는?\n2) 콜백 반환을 `any`로 적으면 소비자에게 무엇이 허용되나요?\n3) 일반 시그니처를 오버로드 맨 앞에 두면 어떻게 되나요(실제 결과로)?\n4) 끝 매개변수 차이 오버로드를 선택적 매개변수로 합칠 수 있는 조건은?",
      },
    ],
    sources: [
      { label: "Do's and Don'ts", href: `${DOCS}/handbook/declaration-files/do-s-and-don-ts.html` },
      { label: "More on Functions — Function Overloads", href: `${DOCS}/handbook/2/functions.html#function-overloads` },
    ],
  },

  {
    id: "ts-dcl-deep",
    name: "깊이 알아보기",
    tagline: "선언은 네임스페이스 · 타입 · 값 중 무엇을 만드는가",
    intro:
      "선언 파일의 이론입니다. TypeScript의 모든 이름은 세 칸 — 네임스페이스, 타입, 값 — 중 하나 이상을 가집니다. 어떤 선언이 어느 칸을 채우는지, 한 이름이 세 뜻을 동시에 가질 수 있다는 것, 그리고 그래서 어떤 조합이 병합되고 어떤 조합이 충돌하는지를 적습니다. 참고서 선언 병합 장의 '왜'에 해당합니다.",
    blocks: [
      {
        label: "무엇이 타입을 만들고 무엇이 값을 만드는가",
        body: "타입을 만드는 것은 타입 별칭, 인터페이스, 클래스, enum, 타입을 가리키는 import입니다. 값을 만드는 것은 let/const/var, 값을 담은 네임스페이스나 모듈, enum, 클래스, 함수, 값을 가리키는 import입니다. 네임스페이스는 네임스페이스 칸을 만듭니다. `let x: A.B.C`에서 A.B는 '타입 C가 들어 있는 네임스페이스'일 뿐입니다. 그 자체가 타입이거나 값일 필요는 없습니다. 클래스와 enum이 두 칸에 다 나오는 것이 핵심입니다. 그래서 `class C`는 `new C()`(값)와 `let c: C`(타입) 둘 다 됩니다. `typeof C`로는 값 쪽의 타입을 따로 가리킵니다.",
        code: "선언            네임스페이스   타입   값\n─────────────  ────────────  ─────  ────\nnamespace       X             —      X (값을 담으면)\nclass           —             X      X\nenum            —             X      X\ninterface       —             X      —\ntype alias      —             X      —\nfunction        —             —      X\nvariable        —             —      X\n\n// 하나의 이름, 세 뜻\nclass C { x = 1 }                 // 타입 C, 값 C\ninterface C { y: number }         // 타입 C 에 병합\nnamespace C { export const z = 3 } // 네임스페이스 C (값도)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 같은 칸이 충돌하고 다른 칸은 병합된다",
        body: "`class C { x = 1 } interface C { y: number } namespace C { export const z = 3 }`는 전부 통과했습니다. `new C().y = 2`와 `C.z`가 됐습니다. 클래스의 타입 칸에 인터페이스가 병합되고(패치), 네임스페이스는 다른 칸에 들어가기 때문입니다. `type Alias = …; interface Alias {}`는 \"Duplicate identifier 'Alias'.\"(TS2300)였습니다. 타입 별칭은 타입 칸을 공유하지 않습니다(문서: '타입 별칭에는 더할 수 없다'). `enum E { A }`는 `const e: E`(타입)와 `let eVal = E`(값) 둘 다 OK입니다. 타입만 든 `namespace OnlyTypes { export type T }`를 값으로 쓰면 \"Cannot use namespace 'OnlyTypes' as a value.\"(TS2708)입니다. 값을 담지 않은 네임스페이스는 값 칸이 비어 있어 emit도 되지 않습니다.",
        code: "class C { x = 1 } interface C { y: number } namespace C { export const z = 3; }\nconst c = new C(); c.y = 2; C.z;   // 전부 OK\n\ntype Alias = { a: 1 }; interface Alias { b: 2 }\n// Duplicate identifier 'Alias'. (TS2300) ×2 — 타입 별칭은 병합 불가\n\nenum E { A } const e: E = E.A; let eVal = E;   // 타입과 값 둘 다\n\nnamespace OnlyTypes { export type T = string; }\nconst v = OnlyTypes;\n// Cannot use namespace 'OnlyTypes' as a value. (TS2708) — 값 칸이 비어 있다",
      },
      {
        label: "조합 규칙과 export = 의 자리",
        body: "문서의 규칙을 의역하면 이렇습니다. 값은 값과 충돌합니다(네임스페이스로 선언된 것 제외). 타입 별칭은 타입과 충돌합니다. 네임스페이스는 절대 충돌하지 않습니다. 그래서 '함수 + 네임스페이스'(속성 붙이기), '클래스 + 네임스페이스'(중첩 타입), '클래스 + 인터페이스'(멤버 패치), 'enum + 네임스페이스'(메서드)가 선언 파일 템플릿들의 재료가 됩니다. `export = X`는 'X라는 이름이 가진 모든 칸을 모듈 전체로 내보낸다'입니다. `export = greet`에서 greet이 함수(값)이자 네임스페이스(타입 Opts를 담음)이면 소비자는 `greet()`과 `greet.Opts` 둘 다 받습니다(함수 템플릿 시트에서 실제로 확인했습니다).",
        code: "// export = 는 이름의 세 칸을 통째로\ndeclare function greet(name: string): string;              // 값\ndeclare namespace greet { const version: string; interface Opts { x: number } }  // 네임스페이스 (값 + 타입)\nexport = greet;\n\n// 소비자\nimport greet = require(\"lib\");\ngreet(\"a\");                   // 값\ngreet.version;                // 네임스페이스의 값\nconst o: greet.Opts = { x: 1 };   // 네임스페이스의 타입",
      },
      {
        label: "문제의 구조: 에러 문구가 '칸' 을 말해 준다",
        body: "이 장을 알면 몇 에러가 바로 읽힙니다.\n\"'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?\"(TS2749)는 값 칸만 있는 이름을 타입 자리에 쓴 것입니다.\n\"'ReadonlyArray' only refers to a type, but is being used as a value here.\"(TS2693)는 타입 칸만 있는 이름을 값 자리에 쓴 것입니다.\n\"Cannot use namespace 'X' as a value.\"(TS2708)는 네임스페이스 칸만 있는 이름을 값 자리에 쓴 것입니다.\n\"Duplicate identifier\"(TS2300)는 같은 칸을 둘이 채우려 한 것입니다.\ntypeof는 값 칸에서 타입 칸으로 건너가는 유일한 다리입니다(typeof 장).",
        code: "에러                                                       뜻\n────────────────────────────────────────────────────────  ────────────────────────────\nTS2749 'f' refers to a value, but is being used as a type   값 칸만 → 타입 자리 (typeof f)\nTS2693 'X' only refers to a type, but is being used as a value   타입 칸만 → 값 자리\nTS2708 Cannot use namespace 'X' as a value                 네임스페이스 칸만 → 값 자리\nTS2300 Duplicate identifier 'X'                            같은 칸을 둘이\nTS1361 'X' cannot be used as a value because it was imported using 'import type'   import 가 타입 칸만 가져옴",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "이 표가 참고서 선언 병합 장의 근거이고, 템플릿 여섯의 모든 '같은 이름 두 번 선언'이 이 표 위에 있습니다. 다음은 만든 .d.ts를 npm으로 내보내는 배포하기입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 클래스가 만드는 두 칸은 무엇이고, `typeof C`는 어느 칸의 타입인가요?\n2) `type A`와 `interface A`가 충돌하는데 `interface A` 둘은 병합되는 이유는?\n3) 타입만 든 네임스페이스를 값으로 쓰면 어떤 에러가 나나요?\n4) `export = greet`에서 소비자가 받는 것은?",
      },
    ],
    sources: [
      { label: "Declaration Files — Deep Dive", href: `${DOCS}/handbook/declaration-files/deep-dive.html` },
      { label: "Declaration Merging", href: `${DOCS}/handbook/declaration-merging.html` },
    ],
  },

  {
    id: "ts-dcl-publish",
    name: "배포하기",
    tagline: "npm 패키지에 .d.ts 를 싸는 법 — types 필드 · dependencies · typesVersions",
    intro:
      "선언을 세상에 내는 길은 둘입니다. 자기 npm 패키지에 함께 넣거나, DefinitelyTyped에 올려 `@types/*`로 배포합니다. 소스에서 생성한 타입이면 패키지에 함께 넣습니다. package.json의 `types`(`typings`와 동의어)가 .d.ts를 가리킵니다. 선언이 다른 패키지의 타입을 노출하면 그 패키지는 `dependencies`에 둡니다. `/// <reference path>`는 적신호입니다. TypeScript 버전별로 다른 선언은 `typesVersions`로 가리킵니다.",
    blocks: [
      {
        label: "types 필드와 dependencies",
        body: "`\"main\": \"./lib/main.js\", \"types\": \"./lib/main.d.ts\"`처럼 적습니다. types가 없으면 TypeScript는 main 옆의 `.d.ts`, 그다음 `index.d.ts`를 찾습니다. package.json에 `exports`가 있으면 각 진입점의 `types` 조건이 그 역할을 합니다(모듈 레퍼런스 장의 traceResolution에서 \"Matched 'exports' condition 'types'\"). 선언이 `import { Browserify } from \"browserify\"`처럼 다른 패키지의 타입을 노출하면 `@types/browserify`를 `devDependencies`가 아니라 `dependencies`에 둡니다. 소비자가 당신의 .d.ts를 읽을 때 그 타입도 필요하기 때문입니다. 실제로 `types` 필드 하나만 둔 패키지(`withtypes`)에서 `import { count }`가 그 선언으로 검사됐습니다.",
        code: "// package.json\n{\n  \"name\": \"awesome\",\n  \"main\": \"./lib/main.js\",\n  \"types\": \"./lib/main.d.ts\",            // 또는 exports[\".\"].types\n  \"dependencies\": { \"@types/browserify\": \"latest\" }   // .d.ts 가 노출하는 타입의 패키지\n}\n\n// exports 가 있으면\n\"exports\": { \".\": { \"types\": \"./dist/index.d.ts\", \"import\": \"./dist/index.js\", \"require\":\n  \"./dist/index.cjs\" } }",
      },
      {
        label: "실제로 돌려 보면: typesVersions 로 TS 버전별 선언",
        body: "`\"typesVersions\": { \">=3.1\": { \"*\": [\"ts3.1/*\"] } }`처럼 TypeScript 버전 범위마다 다른 폴더를 가리킵니다. 범위는 Node semver입니다. 먼저 맞는 것이 이기므로 순서가 중요합니다(문서의 코드 주석: 거꾸로 두면 \"NOTE: this doesn't work!\"). 파일 단위 리다이렉트(`\"<4.0\": { \"index.d.ts\": [\"index.v3.d.ts\"] }`)도 됩니다. 실제로 `types: ts4/index.d.ts`와 `typesVersions: { \">=6.0\": { \"*\": [\"ts6/*\"] } }`를 둔 패키지에서 7.0.2는 ts6/의 선언(`which: \"ts6\"`)을 읽었습니다. 문서의 주의는 '리다이렉트는 패키지의 외부 API에만 영향을 준다'입니다(패키지 내부 import는 그대로입니다).",
        code: "// node_modules/tv/package.json\n{ \"types\": \"ts4/index.d.ts\", \"typesVersions\": { \">=6.0\": { \"*\": [\"ts6/*\"] } } }\n// ts4/index.d.ts: export declare const which: \"ts4\";\n// ts6/index.d.ts: export declare const which: \"ts6\";\n\nimport { which } from \"tv\";\nconst w: \"ts4\" = which;\n// Type '\"ts6\"' is not assignable to type '\"ts4\"'.   ← 7.0.2 가 ts6/ 를 골랐다",
      },
      {
        label: "적신호와 DefinitelyTyped",
        body: "적신호는 이렇습니다. `/// <reference path=\"…\" />`를 쓰지 말고 `/// <reference types=\"…\" />`를 씁니다. 의존 패키지의 .d.ts를 복사하거나 합쳐 넣지 말고 npm 타입 패키지에 의존합니다. 라이브러리 소스가 TypeScript가 아니고 타입을 직접 관리하지 않는다면 DefinitelyTyped(github.com/DefinitelyTyped/DefinitelyTyped)에 올려 `@types/이름`으로 배포합니다. 이론 장의 경고도 여기 붙습니다. 손으로 쓴 .d.ts는 '위험하고 실수가 잦다'는 것입니다. 소스가 TypeScript면 `tsc --declaration`이 만들어 주는 것을 그대로 싸는 것이 가장 안전합니다. 5.5의 `isolatedDeclarations`는 그 생성을 다른 도구도 할 수 있게 합니다.",
        code: "적신호                                   대신\n──────────────────────────────────────  ─────────────────────────────────────\n/// <reference path=\"../other/x.d.ts\" />  /// <reference types=\"other\" /> 또는 import\n의존 패키지의 .d.ts 를 복사·병합            dependencies 에 @types/other\n손으로 쓴 .d.ts (소스가 TS 인데)            tsc --declaration (+ isolatedDeclarations)\ndevDependencies 에 노출되는 타입 패키지      dependencies 로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "배포한 것을 받는 쪽이 다음 장 가져다 쓰기입니다. `exports`의 types 조건과 moduleResolution의 관계는 모듈 레퍼런스, 라이브러리 tsconfig(module node18·declaration·declarationMap)는 모듈 가이드의 컴파일러 옵션 고르기입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `types` 필드가 없을 때 TypeScript가 .d.ts를 찾는 순서는?\n2) 선언이 노출하는 타입의 @types 패키지를 dependencies에 두는 이유는?\n3) typesVersions의 범위 순서가 중요한 이유는?\n4) 적신호 목록의 `/// <reference path>` 대안은?",
      },
    ],
    sources: [
      { label: "Publishing", href: `${DOCS}/handbook/declaration-files/publishing.html` },
      { label: "Modules — Reference (typesVersions)", href: `${DOCS}/handbook/modules/reference.html` },
    ],
  },

  {
    id: "ts-dcl-consume",
    name: "가져다 쓰기",
    tagline: "@types 를 받아 쓰는 법 — 그리고 6.0 의 types: []",
    intro:
      "타입 없는 패키지를 쓸 때 `npm install --save-dev @types/lodash`로 DefinitelyTyped의 선언을 받습니다. 패키지가 자기 선언을 이미 싸고 있으면 @types는 필요 없습니다. 이름은 `@types/` + npm 패키지 이름입니다. 쓰는 법은 `import * as _ from \"lodash\"`입니다. 모듈이 아닌 코드에서는 전역 `_`를 씁니다. 선언이 없으면 DefinitelyTyped에 기여할 수 있습니다.",
    blocks: [
      {
        label: "받고 쓰기",
        body: "`npm i -D @types/lodash` 뒤 `import * as _ from \"lodash\"`가 되는 메커니즘 — moduleResolution이 `node_modules/lodash`에서 types를 못 찾으면 `node_modules/@types/lodash`를 봅니다. 실제로 `@types/typed-lib` 폴더를 만들어 두자 `import typedLib from \"typed-lib\"`가 그 선언으로 검사됐습니다. 선언이 없을 때의 문구가 받을 패키지 이름까지 알려 줍니다 — \"Try `npm i --save-dev @types/untyped` if it exists\". 패키지가 `types` 필드로 자기 선언을 가지면(실제로 `withtypes`) @types 없이 바로 됩니다.",
        code: "$ npm i -D @types/lodash\n\nimport * as _ from \"lodash\";\n_.padStart(\"Hello TypeScript!\", 20, \" \");\n\n// 모듈이 아닌 코드(스크립트)에서는 전역 _\n_.padStart(\"Hello\", 20);\n\n// 해석 순서\nnode_modules/lodash/package.json → types / main 옆 .d.ts / index.d.ts\n  → 없으면 node_modules/@types/lodash/index.d.ts",
      },
      {
        label: "실제로 돌려 보면: 6.0 부터 전역 @types 는 자동으로 들어오지 않는다",
        body: "모듈 @types(`import`로 쓰는 것)는 import할 때 해석되니 그대로 됩니다. 문제는 전역 @types(node·jest·mocha처럼 `process`·`describe`를 전역에 두는 것)입니다. 6.0 전에는 `node_modules/@types/*`가 전부 자동으로 프로그램에 들어왔습니다. 6.0부터는 `types`의 기본값이 `[]`로 바뀌어 적어 준 것만 들어옵니다. 그래서 `@types/node`를 설치했는데도 `process`가 \"Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.\"(TS2591)로 안 보이는 상황이 생깁니다. 문구의 둘째 절인 'then add 'node' to the types field'가 처방입니다. 옛 동작으로 돌리려면 `\"types\": [\"*\"]`를 둡니다. 실제로 `--typeRoots`로 @types 위치를 알려 준 뒤 `/// <reference types=\"node\" />`가 통과했습니다.",
        code: "// 6.0+ tsconfig — 전역 @types 는 명시\n{ \"compilerOptions\": { \"types\": [\"node\", \"jest\"] } }\n// 옛 동작 (전부 자동)\n{ \"compilerOptions\": { \"types\": [\"*\"] } }\n\n// 설치했는데도 안 보일 때의 문구\nerror TS2591: Cannot find name 'process'. Do you need to install type definitions for node?\n  Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.",
      },
      {
        label: "문제가 나는 경우: 받았는데 안 될 때",
        body: "소비자 쪽에서 자주 보는 증상입니다.",
        code: "증상                                       원인                         처방\n─────────────────────────────────────────  ──────────────────────────  ───────────────────────────────\nTS7016 Could not find a declaration file…    선언 없음                     @types 설치 · declare module \"x\"\nTS2591 Cannot find name 'process' (설치했는데)  6.0 types: []                 types: [\"node\"]\nTS2688 Cannot find type definition file for 'x'  /// <reference types> 가 @types 못 찾음  설치 · typeRoots\n@types 와 패키지 버전 불일치로 타입 에러       @types 가 옛 API               @types 버전 맞추기 · 패키지 자체 types 확인\n같은 전역을 두 @types 가 선언 (jest + mocha)   전역 충돌 TS2300              types 로 하나만\n패키지의 exports 에 types 조건 없음            TS7016 (JS 는 찾음)            패키지 이슈 · paths 로 임시",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "선언 파일 섹션이 끝났습니다. 선언을 받을 수 없는 .js 코드를 TypeScript 없이 검사하는 길이 다음 섹션 JavaScript 지원이고, `types`·`typeRoots` 옵션의 정의는 프로젝트 설정의 TSConfig 레퍼런스입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 패키지가 자기 선언을 가질 때 @types가 필요하지 않은 이유는?\n2) 6.0에서 `@types/node`를 설치해도 `process`가 안 보이는 이유와 처방은?\n3) 모듈 @types와 전역 @types가 6.0 변경에 다르게 영향받는 이유는?",
      },
    ],
    sources: [
      { label: "Consumption", href: `${DOCS}/handbook/declaration-files/consumption.html` },
      { label: "TypeScript 6.0 — types defaults to []", href: `${DOCS}/handbook/release-notes/typescript-6-0.html` },
      { label: "DefinitelyTyped", href: "https://github.com/DefinitelyTyped/DefinitelyTyped" },
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
      {
        label: "실제로 돌려 보면: 세 스위치로 강도가 갈린다",
        body: "같은 .js 파일을 세 조건으로 돌렸습니다.\n`allowJs`만 켜면 에러 0입니다(변환만 합니다).\n`// @ts-check` 또는 `checkJs`를 켜면 타입 에러를 보고합니다(실제로 10개였습니다).\n`// @ts-nocheck`를 붙이면 그 파일만 0입니다.\n\n문서의 '엄격함 사다리'는 추론만 하는 JS → JSDoc → `// @ts-check` → TypeScript → strict TypeScript 순서입니다. 각 단계를 파일 단위로 고를 수 있어서 코드베이스 전체를 한 번에 옮기지 않아도 됩니다. .js에서 JSDoc 타입을 틀리게 적으면 .ts와 같은 번호의 에러가 납니다(TS2322 등). 검사기는 같고 입력 문법만 다른 것입니다.",
        code: "$ npx tsc --noEmit --allowJs b.js                       # @ts-check 없음\n(에러 없음)\n$ npx tsc --noEmit --allowJs --checkJs --strict a.js    # 또는 파일 첫 줄 // @ts-check\na.js(3,42): error TS2322: Type 'number' is not assignable to type 'string'.\na.js(8,98): error TS2554: Expected 0-2 arguments, but got 3.\na.js(10,29): error TS2339: Property 'y' does not exist on type '{ x: number; }'.\n…\n$ npx tsc --noEmit --allowJs --checkJs c.js             # 첫 줄 // @ts-nocheck\n(에러 없음)",
        codeLang: "bash",
      },
      {
        label: "다음 입구",
        body: "TS를 쓰는 JS 프로젝트(스위치) → JS 파일 타입 검사(.ts와 다른 추론 규칙) → JSDoc 레퍼런스(태그 목록) → JS에서 d.ts 만들기(JSDoc에서 선언 생성) 순서입니다.",
      },
    ],
    sources: [
      { label: "JS Projects Utilizing TypeScript", href: `${DOCS}/handbook/intro-to-js-ts.html` },
      { label: "JSDoc Reference", href: `${DOCS}/handbook/jsdoc-supported-types.html` },
    ],
  },

  {
    id: "ts-js-projects",
    name: "TS를 쓰는 JS 프로젝트",
    tagline: "에디터 지원은 공짜, 검사는 // @ts-check 한 줄부터",
    intro:
      "JavaScript 프로젝트에 TypeScript를 들이는 가장 낮은 문턱입니다. 에디터의 자동 완성·심벌 이동·이름 바꾸기는 .js에서도 TypeScript가 뒤에서 돌리고 있습니다. 검사를 켜려면 파일 첫 줄에 `// @ts-check`를 적습니다. 프로젝트 전체면 `jsconfig.json`(또는 tsconfig의 checkJs)을 둡니다. 특정 파일을 빼려면 `// @ts-nocheck`를 적습니다. 한 줄을 빼려면 앞 줄에 `// @ts-ignore` 또는 `// @ts-expect-error`를 적습니다.",
    blocks: [
      {
        label: "엄격함의 사다리",
        body: "문서가 그리는 단계는 다섯입니다.\n(1) 추론만 하는 JS입니다. 에디터가 타입을 추론해 자동 완성에 쓰지만 에러는 없습니다.\n(2) JSDoc입니다. 주석으로 타입을 알려 줘 추론을 돕되 아직 에러는 없습니다(`/** @type {number} */ var x; x = false; // OK?!`).\n(3) `// @ts-check`입니다. 그 파일에서 에러 보고가 시작됩니다. \"Type 'boolean' is not assignable to type 'number'.\"(TS2322)가 그 예입니다.\n(4) TypeScript입니다. 파일을 .ts로 바꿉니다.\n(5) strict입니다.\n\n문서의 한 줄은 JS 프로젝트에서는 '기본으로는 검사하지 않는다'입니다. 켜야 켜집니다.",
        code: "// 2단계 — JSDoc 만, 검사 없음\n/** @type {number} */\nvar x;\nx = 0;      // OK\nx = false;  // OK?!  ← 에러가 아니다\n\n// 3단계 — 첫 줄에 추가\n// @ts-check\n/** @type {number} */\nvar x;\nx = false;  // Type 'boolean' is not assignable to type 'number'. (TS2322)",
      },
      {
        label: "실제로 돌려 보면: 세 지시어 주석",
        body: "`// @ts-check`는 파일을 검사에 넣습니다. `// @ts-nocheck`는 뺍니다(checkJs가 켜져 있어도 그렇습니다). `// @ts-ignore`는 다음 줄의 에러를 무조건 무시합니다. `// @ts-expect-error`는 다음 줄에 에러가 '있어야' 합니다. 없으면 \"Unused '@ts-expect-error' directive.\"(TS2578)가 납니다. 실제로 에러가 없는 줄 위의 @ts-expect-error가 정확히 그 문구로 걸렸습니다. 그래서 '언젠가 고쳐질 에러'에는 expect-error가 맞습니다. 고쳐지면 지시어가 에러가 되어 지우라고 알려 줍니다. ignore는 에러가 사라져도 조용히 남습니다.",
        code: "// @ts-expect-error\nconst okErr = 1;        // 에러가 없는 줄\n// Unused '@ts-expect-error' directive. (TS2578)  ← 지시어 자체가 에러\n\n// @ts-ignore\nconst ignored = undefinedVar;   // 조용히 통과 — 나중에 undefinedVar 가 생겨도 조용히 남는다\n\n// @ts-nocheck   (파일 첫 줄)\n/** @type {number} */ const x = \"s\";   // 아무 말 없음",
      },
      {
        label: "jsconfig.json 과 allowJs/checkJs",
        body: "`jsconfig.json`은 tsconfig.json의 JS 프로젝트 버전으로 `allowJs: true`가 암묵적이고 몇 JS 플래그가 기본으로 켜져 있습니다. tsconfig를 쓰는 프로젝트에서는 `allowJs`(JS를 프로그램에 넣음)와 `checkJs`(그 JS를 검사함)를 켭니다. 둘은 다른 스위치입니다 — allowJs만이면 .js가 변환(emit)되지만 검사되지 않고, 실제로 `--allowJs`만 켠 b.js는 에러 0, `--checkJs`를 더하자 10개였습니다. `checkJs`를 켜면 `allowJs`는 자동(기본값 설명: 'allowJs는 checkJs가 설정되면 true').",
        code: "// jsconfig.json (JS 프로젝트)\n{ \"compilerOptions\": { \"checkJs\": true, \"target\": \"es2022\" }, \"exclude\": [\"node_modules\"] }\n\n// tsconfig.json (혼합 프로젝트)\n{ \"compilerOptions\": { \"allowJs\": true, \"checkJs\": true } }\n\n스위치        .js 를 프로그램에   .js 를 변환   .js 를 검사\n────────────  ──────────────────  ──────────  ──────────\n(없음)        ✗                   ✗            ✗\nallowJs       ✓                   ✓            ✗\ncheckJs       ✓ (allowJs 암묵)     ✓            ✓\n// @ts-check  (파일 단위로 ✓)",
      },
      {
        label: "다음 입구",
        body: ".js를 검사할 때 TypeScript가 .ts와 다르게 추론하는 규칙들(클래스 속성, CommonJS, 열린 객체 리터럴, 선택적 매개변수)이 다음 장 JS 파일 타입 검사입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `/** @type {number} */ var x; x = false`가 에러가 아닌 조건과 에러가 되는 조건은?\n2) `@ts-ignore`와 `@ts-expect-error`의 차이와, 어느 쪽이 '고쳐졌음'을 알려 주나요?\n3) `allowJs`와 `checkJs`가 각각 하는 일은?",
      },
    ],
    sources: [
      { label: "JS Projects Utilizing TypeScript", href: `${DOCS}/handbook/intro-to-js-ts.html` },
      { label: "TSConfig — checkJs", href: `${TSCONFIG}/#checkJs` },
    ],
  },

  {
    id: "ts-js-checking",
    name: "JS 파일 타입 검사",
    tagline: ".ts 와 다른 추론 규칙 — 클래스 속성 · CommonJS · 열린 객체 · 선택적 매개변수",
    intro:
      "JavaScript는 타입을 적을 자리가 없으니 TypeScript는 .js에서 더 관대하게, 그리고 몇 가지를 다르게 추론합니다.\n클래스 속성은 생성자·메서드의 대입에서 추론합니다.\n생성자 함수는 클래스처럼 봅니다.\n`require`/`module.exports`는 import/export처럼 봅니다.\n클래스·함수·객체 리터럴은 네임스페이스처럼 봅니다.\n객체 리터럴은 열려 있습니다.\nnull/undefined/[] 초기화는 any입니다.\n함수 매개변수는 기본으로 선택적입니다.\n`arguments`를 쓰면 가변 인자입니다.\n지정하지 않은 타입 매개변수는 any입니다.",
    blocks: [
      {
        label: "클래스 속성은 대입에서 추론된다",
        body: "ES2015 클래스에는 속성 선언이 없으니 TypeScript는 클래스 본문의 `this.x = …` 대입에서 속성을 추론합니다. 생성자에서 대입한 속성은 '항상 있음', 메서드에서만 대입한 속성은 '선택적'. 실제로 `constructor() { this.n = 1 } m() { this.later = \"x\" }`에서 `k.n = \"s\"`는 \"Type 'string' is not assignable to type 'number'.\", `k.later.toUpperCase()`는 \"'k.later' is possibly 'undefined'.\"(TS18048)였습니다. 읽기만 하고 대입하지 않는 속성은 unknown이라 JSDoc `/** @type {number | undefined} */`로 생성자에서 선언해 줍니다. ES5의 생성자 함수(`function C() { this.x = 1 }`)도 클래스처럼 취급합니다.",
        code: "class K {\n  constructor() { this.n = 1; }       // n: number  (항상 있음)\n  m() { this.later = \"x\"; }           // later: string | undefined  (선택적)\n}\nconst k = new K();\nk.n = \"s\";                 // Type 'string' is not assignable to type 'number'. (TS2322)\nk.later.toUpperCase();     // 'k.later' is possibly 'undefined'. (TS18048)\n\n// 읽기만 하는 속성은 선언해 준다\nclass C { constructor() { /** @type {number | undefined} */ this.prop = undefined; } }",
      },
      {
        label: "실제로 돌려 보면: 열린 객체 · 매개변수 선택적 · null 은 any",
        body: "객체 리터럴은 .ts에서는 선언한 모양으로 닫히지만 .js에서는 열려 있습니다. `const obj = { a: 1 }; obj.b = 2`가 허용됩니다. JSDoc으로 타입을 주면 닫힙니다. 실제로 `/** @type {{a: number}} */`가 붙은 객체의 `.y = 2`는 \"Property 'y' does not exist on type '{ x: number; }'.\"(TS2339)였습니다. 함수 매개변수는 JSDoc이 없으면 전부 선택적입니다. `optionalByDefault(1)`은 OK입니다. 단 '너무 많은 인자는 에러'입니다. 실제로 `optionalByDefault(1, 2, 3)`은 \"Expected 0-2 arguments, but got 3.\"(TS2554)였습니다. strict에서는 그 매개변수들이 \"Parameter 'a' implicitly has an 'any' type.\"(TS7006)로도 걸립니다. `let nul = null`은 any라 `nul = 1; nul = \"s\"`가 전부 통과합니다(strictNullChecks여도 그렇습니다).",
        code: "const open = { x: 1 }; open.y = 2;          // OK — .js 의 객체 리터럴은 열려 있다\n/** @type {{ a: number }} */\n// Property 'y' does not exist on type '{ a: number; }'. (TS2339)\nconst closed = { a: 1 }; closed.y = 2;\n\nfunction optionalByDefault(a, b) { return a + b; }\noptionalByDefault(1);         // OK — 매개변수는 기본 선택적\noptionalByDefault(1, 2, 3);   // Expected 0-2 arguments, but got 3. (TS2554)\n\nlet nul = null; nul = 1; nul = \"s\";   // 전부 OK — null 초기화는 any",
      },
      {
        label: "CommonJS · 네임스페이스처럼 쓰이는 것 · 가변 인자 · 제네릭 기본",
        body: "`require(\"x\")`는 import, `module.exports.f = …`와 `module.exports = …`는 export로 읽습니다 — 문서: 'JavaScript의 모듈 지원은 문법적으로 훨씬 관대하다'. 클래스·함수·객체 리터럴에 속성을 붙이면(`C.D = class {}`, `Outer.Inner = function () {}`) 네임스페이스처럼 봅니다. `arguments`를 쓰는 함수는 `(...arg: any[]) => any` 시그니처가 되고, `@param {...number} args`로 타입을 줍니다. 타입 매개변수를 지정하지 않으면 any — `@type {Array}`는 `Array<any>`, `new Promise(…)`는 `Promise<any>`; React 클래스처럼 상속할 때는 `@augments {Component<{a: number}, State>}`.",
        code: "// CommonJS 를 모듈로\nconst fs = require(\"fs\");                 // import 처럼\nmodule.exports.readFile = (p) => …;        // export 처럼\n\n// 네임스페이스처럼\nvar Outer = {};\nOuter.Inner = function () {};\nOuter.Inner.prototype.m = function () {};\n\n// arguments → 가변 인자\n/** @param {...number} args */\nfunction sum(...args) { return args.reduce((a, b) => a + b, 0); }\n\n// 제네릭 기본은 any\n/** @type {Array} */ const anyArr = [];          // Array<any>\n/** @type {Array<string>} */ const strArr = [];  // 지정하면 닫힌다",
      },
      {
        label: "문제의 구조: .js 의 관대함은 '적을 자리가 없어서' 이고, JSDoc 이 그 자리다",
        body: "열린 객체, 선택적 매개변수, any인 null, any인 제네릭 — 전부 '선언할 문법이 없으니 가장 넓게 본다'는 한 원칙입니다. 그리고 JSDoc 하나를 붙이면 그 자리에서 .ts와 같은 규칙으로 바뀝니다 — 객체는 닫히고(TS2339), 매개변수는 타입을 갖고, 배열은 요소 타입을 갖습니다. 그래서 .js 검사의 실질은 '어디에 JSDoc을 붙일 것인가'이고, 그 태그 목록이 다음 장입니다.",
        code: "JSDoc 없을 때 (.js)                 JSDoc 있을 때 (= .ts 규칙)\n─────────────────────────────────  ───────────────────────────────────\n{ a: 1 } 에 .b = 2  OK              @type {{a: number}} → TS2339\nf(a, b) 는 0~2 인자                  @param 있으면 필수/선택 명시\nlet x = null → any                  @type {string | null}\n@type {Array} → Array<any>          @type {Array<string>}\n함수에 arguments → (...any[])        @param {...number} args",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "JSDoc 레퍼런스가 쓸 수 있는 태그 전체(@type·@param·@returns·@typedef·@callback·@template·@satisfies·@import·@this·@extends·@implements·접근 제한·@override·@deprecated·@see·@link·@enum)와 지원하지 않는 패턴을 적습니다.",
      },
      {
        label: "확인 질문",
        body: "1) 메서드에서만 대입한 클래스 속성의 타입은 무엇이 되나요?\n2) `.js`의 객체 리터럴이 열려 있다는 뜻과 닫는 방법은?\n3) `f(1, 2, 3)`이 `function f(a, b)`에서 에러인데 `f(1)`은 왜 OK인가요?\n4) `let x = null`의 타입은?",
      },
    ],
    sources: [
      { label: "Type Checking JavaScript Files", href: `${DOCS}/handbook/type-checking-javascript-files.html` },
      { label: "JSDoc Reference", href: `${DOCS}/handbook/jsdoc-supported-types.html` },
    ],
  },

  {
    id: "ts-js-jsdoc",
    name: "JSDoc 레퍼런스",
    tagline: "지원하는 태그 전부 — 타입 · 클래스 · 문서 · 그 밖",
    intro:
      "TypeScript가 .js에서 타입으로 읽는 JSDoc 태그의 목록입니다. 문서의 전제는 둘입니다. '아래에 명시되지 않은 태그(@async 등)는 아직 지원하지 않는다'와 'TypeScript 파일에서는 문서 태그만 지원된다. 나머지는 JavaScript 파일에서만'입니다. 태그는 이렇게 묶입니다. 타입 태그(@type·@import·@param·@returns·@typedef·@callback·@template·@satisfies), 클래스 태그(@public/@private/@protected/@readonly·@override·@extends·@implements·@class·@this), 문서 태그(@deprecated·@see·@link), 그 밖(@enum·@author)입니다.",
    blocks: [
      {
        label: "타입 태그",
        body: "`@type {T}`는 변수·속성에 타입을 줍니다. 중괄호 안은 TypeScript 타입 문법 그대로입니다(유니온·제네릭·import 타입·함수 타입).\n`@param {T} name`과 `@returns {T}`는 함수 시그니처입니다(`@arg`·`@argument`·`@return`도 됩니다).\n`@typedef {…} Name`은 타입 별칭입니다. `@callback Name`은 함수 타입 별칭입니다(매개변수는 @param으로 적습니다).\n`@template T`는 제네릭 함수·클래스입니다.\n`@satisfies {T}`(4.9의 satisfies 연산자)는 '값이 타입을 구현한다고 선언하되 값의 타입은 바꾸지 않는다'입니다.\n`@import { X } from \"mod\"`(5.5)는 타입 전용 import입니다. '실제로 파일을 가져오지는 않는다'고 합니다.\n\n실제로 `@template T @param {T[]} xs @returns {T}`인 head에 `[1, 2]`를 넘기자 결과가 number로 잡혔습니다. 그래서 `.toUpperCase()`가 \"Property 'toUpperCase' does not exist on type 'number'.\"였습니다. `@satisfies {Record<string, number>}`에 `b: \"2\"`를 넣자 \"Type 'string' is not assignable to type 'number'.\"였습니다.",
        code: "/** @typedef {{ id: number, name?: string }} User */\n/** @type {User} */ const u = { id: 1 };\nu.name = 3;   // Type 'number' is not assignable to type 'string'. (TS2322)\n\n/** @template T @param {T[]} xs @returns {T} */\nfunction head(xs) { return xs[0]; }\nconst h = head([1, 2]);   // h: number\nh.toUpperCase();          // Property 'toUpperCase' does not exist on type 'number'. (TS2339)\n\n/** @satisfies {Record<string, number>} */\nconst table = { a: 1, b: \"2\" };   // Type 'string' is not assignable to type 'number'. (TS2322)\n\n/** @import { Opts } from \"./lib\" */   // 5.5 — 타입만, 런타임 import 없음\n/** @param {Opts} o */ function useOpts(o) { return o.x; }",
      },
      {
        label: "클래스 태그",
        body: "`@public`·`@private`·`@protected`는 접근 제한자입니다(TS2341 \"Property 'identifier' is private and only accessible within class 'Car'.\"). 문서의 주의는 '생성자 함수에서는 동작하지 않는다'입니다(클래스에서만 됩니다).\n`@readonly`는 초기화 중에만 쓸 수 있게 합니다.\n`@override`는 `noImplicitOverride: true`를 켜면 검사합니다.\n`@extends {Base<T>}`(`@augments`)는 제네릭 기반 클래스의 타입 인자를 줍니다. '@extends는 클래스에서만 동작한다'고 합니다.\n`@implements {Iface}`는 인터페이스 구현을 검사합니다.\n`@class`/`@constructor`는 함수를 생성자로 표시합니다. `new` 없이 부르면 \"Value of type 'typeof C' is not callable. Did you mean to include 'new'?\"(TS2348)입니다.\n`@this {T}`는 함수 안 this의 타입입니다.\n\n생성자 함수 관련 에러 메시지는 'JSConfig와 checkJs가 켜진 JS 코드베이스에서만' 보입니다.",
        code: "class Car {\n  constructor() {\n    /** @private */\n    this.identifier = 100;\n  }\n}\nnew Car().identifier;\n// Property 'identifier' is private and only accessible within class 'Car'. (TS2341)\n\n/** @extends {Set<string>} */\nclass SortableSet extends Set {}   // 기반의 타입 인자를 알린다\n\n/** @constructor */\nfunction C() {}\nconst c = C();\n// Value of type 'typeof C' is not callable. Did you mean to include 'new'? (TS2348)",
      },
      {
        label: "문서 태그와 그 밖, 그리고 지원하지 않는 것",
        body: "`@deprecated`는 에디터가 취소선을 그립니다(.ts에서도 됩니다). `@see`·`@link`는 다른 심벌로 링크합니다(.ts에서도 됩니다).\n`@enum {T}`는 객체 리터럴의 모든 멤버가 그 타입임을 선언합니다. '다른 멤버를 허용하지 않음'이며, TypeScript enum과 달리 값이 어떤 타입이든 됩니다.\n`@author`도 지원합니다.\n\n지원하지 않는 것도 있습니다. `@memberof`·`@yields`·`@member` 등 목록에 없는 태그는 무시됩니다. Closure의 후위 `=`(`{string=}`)는 속성을 선택적으로 만들지 않습니다. nullable 타입(`?string`)은 strictNullChecks가 켜져야 의미가 있습니다.",
        code: "/** @deprecated use newFn */\nfunction oldFn() {}\noldFn();   // 에디터: 취소선 (.ts 에서도)\n\n/** @enum {number} */\nconst JSDocState = { BeginningOfLine: 0, SawAsterisk: 1, SavingComments: 2 };\n\n태그 분류                .js       .ts\n─────────────────────  ────────  ────────\n타입 태그 (@type …)      ✓         ✗\n클래스 태그 (@private …) ✓         ✗\n문서 태그 (@deprecated·@see·@link)  ✓   ✓\n미등록 태그 (@async·@memberof)       무시",
      },
      {
        label: "문제의 구조: JSDoc 은 '주석에 쓰는 .ts 문법' 이고 런타임엔 없다",
        body: "중괄호 안은 TypeScript 타입 문법이고, 태그는 '그 타입을 어느 선언에 붙이는가'를 가리킵니다. @type은 변수에, @param은 매개변수에, @typedef는 이름에, @template은 타입 매개변수 자리에, @import는 import 문 자리에. 주석이라 어떤 변환기도 건드리지 않고 런타임에 아무 흔적이 없습니다 — 그래서 '빌드를 못 건드리는 코드베이스'에서 유일한 선택지가 됩니다. 한계도 같은 자리 — 타입 단언(`as`)·제네릭 호출(`f<T>()`)·non-null(`!`)처럼 식에 붙는 문법은 괄호와 캐스트 주석(`/** @type {T} */ (expr)`)으로 우회합니다.",
        code: ".ts                                .js + JSDoc\n────────────────────────────────  ─────────────────────────────────────\nlet x: number                     /** @type {number} */ let x\nfunction f(a: string): number     /** @param {string} a @returns {number} */ function f(a)\ntype U = { id: number }           /** @typedef {{ id: number }} U */\nfunction g<T>(x: T): T            /** @template T @param {T} x @returns {T} */ function g(x)\nimport type { O } from \"./lib\"    /** @import { O } from \"./lib\" */\nexpr as T                          /** @type {T} */ (expr)\nobj satisfies T                    /** @satisfies {T} */ const obj = …",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "JSDoc으로 적은 타입은 `.d.ts`로 뽑아낼 수 있습니다. 다음 장 JS에서 d.ts 만들기가 그 이야기입니다. @satisfies의 .ts 쪽 짝은 참고서 타입 추론 시트의 satisfies입니다. @import의 .ts 쪽 짝은 핸드북 모듈 장의 `import type`입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `@template T`로 적은 함수에 `[1, 2]`를 넘기면 반환 타입이 어떻게 추론되나요?\n2) `@satisfies`가 `@type`과 다른 점은?\n3) .ts 파일에서도 동작하는 태그 묶음은?\n4) `as` 단언을 .js에서 흉내 내는 방법은?",
      },
    ],
    sources: [
      { label: "JSDoc Reference", href: `${DOCS}/handbook/jsdoc-supported-types.html` },
      { label: "TypeScript 5.5 — The JSDoc @import Tag", href: `${DOCS}/handbook/release-notes/typescript-5-5.html#the-jsdoc-import-tag` },
      { label: "TypeScript 5.0 — @satisfies Support in JSDoc", href: `${DOCS}/handbook/release-notes/typescript-5-0.html#satisfies-support-in-jsdoc` },
    ],
  },

  {
    id: "ts-js-dts",
    name: "JS에서 d.ts 만들기",
    tagline: "JSDoc 이 있는 .js 에서 tsc 가 선언 파일을 뽑아낸다",
    intro:
      "3.7부터 'JSDoc 문법을 쓴 JavaScript에서 .d.ts 파일을 생성하는 지원'이 있습니다. tsconfig에 `allowJs`·`declaration`·`emitDeclarationOnly`·`outDir`(선택으로 `declarationMap`)을 둡니다. CLI로는 `tsc src/**/*.js --declaration --allowJs --emitDeclarationOnly --outDir types`입니다. package.json의 `types`가 생성된 파일을 가리킵니다. 테스트는 tsd나 TSTyche로 합니다.",
    blocks: [
      {
        label: "설정과 명령",
        body: "tsconfig 예 — `include: [\"src/**/*\"]`, `compilerOptions: { allowJs: true, declaration: true, emitDeclarationOnly: true, outDir: \"dist\", declarationMap: true }`. .js는 변환하지 않고(emitDeclarationOnly) 선언만 dist/에 씁니다. 라이브러리가 JavaScript로 쓰여 있지만 TypeScript 소비자에게 타입을 주고 싶을 때의 길이고, 선언을 손으로 쓰는 것보다 '소스와 어긋날 일이 없다'는 점에서 안전합니다. 문서의 주의 — .gitignore에 생성 파일이 있으면 npm 패키지에는 들어가게 해야 합니다.",
        code: "{\n  \"include\": [\"src/**/*\"],\n  \"compilerOptions\": {\n    \"allowJs\": true,\n    \"declaration\": true,\n    \"emitDeclarationOnly\": true,\n    \"outDir\": \"dist\",\n    \"declarationMap\": true\n  }\n}\n\n# 또는 CLI\n$ npx -p typescript tsc src/**/*.js --declaration --allowJs --emitDeclarationOnly --outDir types",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: JSDoc 이 있는 곳과 없는 곳",
        body: "`/** @param {string} name @returns {string} */ export function greet(name) {…}`, `export const n = 1`, 생성자에서 `this.v = 0`을 하고 `/** @param {number} x */ set(x)`를 가진 클래스를 돌렸습니다. 결과 — greet은 `(name: string): string`으로 정확히, n은 `export declare const n = 1`(리터럴 유지), 클래스는 `v: number`와 `constructor()`가 추론됐습니다. 그런데 `set(x: any): void` — @param 주석이 메서드 바로 위가 아니라 같은 줄 앞에 있어 메서드에 붙지 않았고, 매개변수가 any로 떨어졌습니다. JSDoc은 '바로 위 선언'에 붙는다는 규칙이 .d.ts 생성에서 바로 드러납니다. 생성된 .d.ts는 JSDoc 주석 자체도 함께 복사합니다.",
        code: "// lib.js\n/** @param {string} name @returns {string} */\nexport function greet(name) { return \"hi \" + name; }\nexport const n = 1;\nexport class Box { constructor() { this.v = 0; } /** @param {number} x */ set(x) { this.v = x; } }\n\n// tsc lib.js --declaration --allowJs --emitDeclarationOnly → types/lib.d.ts\n/** @param {string} name @returns {string} */\nexport declare function greet(name: string): string;\nexport declare const n = 1;\nexport declare class Box {\n    v: number;\n    constructor(); /** @param {number} x */\n    set(x: any): void;        // ← 주석이 메서드 '바로 위' 가 아니라 any 로\n}",
      },
      {
        label: "package.json 과 테스트",
        body: "소비자가 선언을 찾는 순서는 `types` → `main` 옆 → `index.d.ts`입니다. 생성 위치를 `\"types\": \"./dist/main.d.ts\"`로 가리킵니다(배포 장). 생성된 선언이 뜻대로인지는 타입 테스트 도구로 확인합니다. 문서가 드는 것은 tsd와 TSTyche입니다. 그리고 선언이 어긋나지 않게 하려면 소스 쪽에서 `// @ts-check`나 `checkJs`로 JSDoc 자체가 검사되게 두는 것이 짝입니다. JSDoc이 틀리면 .d.ts도 틀립니다.",
        code: "{\n  \"name\": \"my-js-lib\",\n  \"main\": \"./src/main.js\",\n  \"types\": \"./dist/main.d.ts\"\n}\n\n// 선언 테스트 (tsd)\nimport { expectType } from \"tsd\";\nimport { greet } from \"./dist/main\";\nexpectType<string>(greet(\"x\"));",
      },
      {
        label: "다음 입구",
        body: "JavaScript 지원 섹션이 끝났습니다. 생성된 .d.ts를 어떻게 싸서 내보내는지는 선언 파일의 배포하기, 이 설정이 tsconfig 전체에서 어디에 있는지는 다음 섹션 프로젝트 설정입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `.js`에서 `.d.ts`만 만들 때 켜는 옵션 셋은?\n2) `set(x: any)`가 된 이유는?\n3) 생성된 선언을 소비자가 찾게 하는 package.json 필드는?\n4) JSDoc에서 생성한 선언이 소스와 어긋나지 않게 하는 짝 설정은?",
      },
    ],
    sources: [
      { label: "Creating .d.ts Files from .js files", href: `${DOCS}/handbook/declaration-files/dts-from-js.html` },
      { label: "Publishing", href: `${DOCS}/handbook/declaration-files/publishing.html` },
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
      {
        label: "실제로 돌려 보면: 7.0 의 tsconfig 는 짧아졌고, 옛 옵션은 에러다",
        body: "6.0이 기본값을 바꾸고 7.0이 폐기 옵션을 제거하면서 이 섹션의 사실이 많이 바뀌었습니다. `strict`는 기본 true입니다. `module`은 esnext, `target`은 es2025, `types`는 `[]`, `rootDir`는 `.`입니다. 그래서 `tsc --init`이 만드는 파일이 열다섯 줄입니다(5.9부터). 거꾸로 옛 tsconfig의 `target: es5`·`moduleResolution: node`·`baseUrl`·`outFile`·`downlevelIteration`·`esModuleInterop: false`는 전부 \"Option '…' has been removed. Please remove it from your configuration.\"로 멈춥니다. 그리고 6.0의 새 에러가 있습니다. tsconfig가 있는 폴더에서 파일을 명시해 tsc를 부르면 \"tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.\"(TS5112)가 납니다. 옛 글의 설정을 복사할 때 이 표를 먼저 보면 됩니다.",
        code: "6.0 기본값 변경              7.0 제거 (적으면 TS5102/TS5108)\n──────────────────────────  ─────────────────────────────────────────\nstrict: true                target: es5\nmodule: esnext              module: amd · umd · system · none\ntarget: es2025 (그해 ES)     moduleResolution: classic · node (node10)\ntypes: []                   baseUrl\nrootDir: .                  outFile\nnoUncheckedSideEffectImports: true   downlevelIteration\nlibReplacement: false       esModuleInterop: false · alwaysStrict: false\n\n$ npx tsc --noEmit a.ts     # tsconfig 가 있는 폴더에서\nerror TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use\n'--ignoreConfig' to skip this error.",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "tsconfig.json이란 → TSConfig 레퍼런스 → tsc CLI 순서로 읽습니다. 저장소가 여러 패키지면 프로젝트 참조를 봅니다. 번들러를 쓰면 빌드 도구 연동을 봅니다. 개발 중 재컴파일은 watch입니다. 다음 버전을 미리 보려면 나이틀리입니다. MSBuild는 .NET 프로젝트에만 해당합니다.",
      },
    ],
    sources: [
      { label: "What is a tsconfig.json", href: `${DOCS}/handbook/tsconfig-json.html` },
      { label: "TSConfig Reference", href: `${TSCONFIG}/` },
    ],
  },

  {
    id: "ts-cfg-tsconfig",
    name: "tsconfig.json이란",
    tagline: "프로젝트의 뿌리를 표시하고, 어떤 파일을 어떤 옵션으로 컴파일할지 적는 파일",
    intro:
      "폴더에 tsconfig.json이 있으면 그 폴더가 프로젝트의 뿌리입니다. 파일 목록(`files`·`include`·`exclude`)과 컴파일러 옵션을 적습니다. 인자 없는 `tsc`는 현재 폴더에서 위로 올라가며 tsconfig.json을 찾고, `tsc -p`로 지정할 수 있습니다. `extends`로 다른 설정을 물려받고, `@tsconfig/*` 패키지(TSConfig bases)가 런타임별 기본을 줍니다. 핵심 규칙 — '명령줄에 입력 파일을 적으면 tsconfig.json은 무시된다'.",
    blocks: [
      {
        label: "files · include · exclude",
        body: "`files`는 허용 목록입니다. 적은 파일이 없으면 에러입니다. 실제로 `\"files\": [\"nope.ts\"]`는 \"File '…/nope.ts' not found. The file is in the program because: Part of 'files' list in tsconfig.json\"(TS6053)였습니다. `include`는 glob입니다(`*`·`?`·`**/`). 기본값은 files가 있으면 `[]`, 없으면 `**/*`입니다. `exclude`는 include가 찾은 것만 걸러냅니다. 'exclude된 파일도 import·types·/// <reference>·files로 들어올 수 있다'고 합니다. 실제로 `exclude: [\"gen\"]`인데 src의 파일이 gen/g.ts를 import하자 g.ts가 프로그램에 들어와 그 안의 타입 에러가 보고됐습니다. `--listFilesOnly`에도 g.ts가 찍혔습니다. exclude 기본값은 node_modules·bower_components·jspm_packages와 outDir입니다.",
        code: "{ \"files\": [\"nope.ts\"] }\n// error TS6053: File '…/nope.ts' not found.\n//   The file is in the program because:\n//     Part of 'files' list in tsconfig.json\n\n{ \"include\": [\"src\"], \"exclude\": [\"gen\"] }\n// src/s.ts: import { g } from \"../gen/g.js\";\n$ npx tsc -p .\ngen/g.ts(1,14): error TS2322: …        # exclude 했지만 import 로 들어왔다\n$ npx tsc -p . --listFilesOnly | grep -v node_modules\n…/gen/g.ts\n…/src/s.ts",
      },
      {
        label: "실제로 돌려 보면: extends 와 showConfig",
        body: "`extends: \"./base.json\"`은 base의 compilerOptions를 물려받되 자기 것이 덮어씁니다. `files`·`include`·`exclude`는 물려받으면서 자식이 적으면 통째로 교체되고, 상대 경로는 '그 설정이 적힌 파일 기준'으로 해석됩니다. `references`는 물려받지 않습니다. 5.0부터 extends에 배열을 줄 수 있고 뒤의 것이 이깁니다. 실제로 base(strict·target es2022·exclude base-excluded)를 extends하고 target을 esnext로 덮은 뒤 `tsc --showConfig`를 돌리면 합쳐진 결과 — strict true, target esnext, module esnext(기본값이 함께 보임), 그리고 include가 실제로 찾은 `files` 목록 — 가 찍혔습니다. showConfig는 '내 설정이 결국 무엇인가'를 보는 가장 빠른 방법입니다.",
        code: "// base.json\n{ \"compilerOptions\": { \"strict\": true, \"target\": \"es2022\" }, \"exclude\": [\"base-excluded\"] }\n// tsconfig.json\n{ \"extends\": \"./base.json\", \"compilerOptions\": { \"target\": \"esnext\" }, \"include\": [\"src\"] }\n\n$ npx tsc --showConfig\n{\n    \"compilerOptions\": { \"strict\": true, \"target\": \"esnext\", \"module\": \"esnext\" },\n    \"files\": [\"./src/q.ts\"],          // include 가 찍어낸 결과\n    \"include\": [\"src\"],\n    \"exclude\": [\"base-excluded\"]\n}",
      },
      {
        label: "TSConfig bases: @tsconfig/*",
        body: "github.com/tsconfig/bases의 패키지들은 런타임별 기본을 줍니다 — `\"extends\": \"@tsconfig/node24/tsconfig.json\"`. 문서의 설명 — '런타임 지원을 대신 처리해 tsconfig.json을 단순하게 한다'. 실제로 `@tsconfig/node24` 24.0.6을 받아 보면 `lib: [es2024, ESNext.Array, …]`, `module: nodenext`, `target: es2024`, `types: [\"node\"]`, `strict`, `esModuleInterop`, `skipLibCheck`, `moduleResolution: node16`이 들어 있습니다. `@tsconfig/strictest` 같은 '검사 최대' 베이스도 있습니다. 베이스가 정한 lib·target이 그 Node 버전이 실제로 지원하는 것이라는 점이 쓸모입니다.",
        code: "$ npm i -D @tsconfig/node24\n// tsconfig.json\n{ \"extends\": \"@tsconfig/node24/tsconfig.json\", \"include\": [\"src\"] }\n\n// @tsconfig/node24/tsconfig.json (24.0.6)\n{\n  \"compilerOptions\": {\n    \"lib\": [\"es2024\", \"ESNext.Array\", \"ESNext.Collection\", \"ESNext.Error\", \"ESNext.Iterator\",\n      \"ESNext.Promise\"],\n    \"module\": \"nodenext\", \"target\": \"es2024\", \"types\": [\"node\"],\n    \"strict\": true, \"esModuleInterop\": true, \"skipLibCheck\": true, \"moduleResolution\": \"node16\"\n  }\n}",
      },
      {
        label: "문제: 명령줄에 파일을 적으면 tsconfig 가 무시된다 — 6.0 은 그걸 에러로",
        body: "문서의 오래된 규칙 — '명령줄에 입력 파일이 지정되면 tsconfig.json 파일은 무시된다'. `tsc src/index.ts`는 tsconfig의 strict·paths·include 전부를 보지 않고 기본값으로 그 파일만 컴파일합니다. 조용히 다른 설정으로 돌아가는 함정이라 6.0이 에러로 올렸습니다 — 실제로 tsconfig가 있는 폴더에서 `tsc --noEmit a.ts`는 TS5112, `--ignoreConfig`를 붙여야 통과. 파일 하나만 검사하고 싶으면 tsconfig의 include를 좁히거나 `-p`로 다른 설정을 쓰는 것이 맞습니다.",
        code: "$ ls\na.ts  tsconfig.json\n$ npx tsc --noEmit a.ts\nerror TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use\n  '--ignoreConfig' to skip this error.\n$ npx tsc --noEmit --ignoreConfig a.ts      # '정말 무시하겠다' 를 명시\n(통과 — 기본 옵션으로)",
        codeLang: "bash",
      },
      {
        label: "다음 입구",
        body: "compilerOptions 하나하나의 뜻은 TSConfig 레퍼런스, 명령줄 플래그는 tsc CLI, 여러 tsconfig를 잇는 `references`는 프로젝트 참조입니다.",
      },
      {
        label: "확인 질문",
        body: "1) exclude한 폴더의 파일이 프로그램에 들어오는 네 가지 경로는?\n2) extends에서 물려받지 않는 유일한 필드는?\n3) `tsc --showConfig`가 보여 주는 것은?\n4) `tsc a.ts`가 6.0에서 에러인 이유와 우회 플래그는?",
      },
    ],
    sources: [
      { label: "What is a tsconfig.json", href: `${DOCS}/handbook/tsconfig-json.html` },
      { label: "TSConfig bases", href: "https://github.com/tsconfig/bases" },
      { label: "TypeScript 6.0 — --ignoreConfig", href: `${DOCS}/handbook/release-notes/typescript-6-0.html` },
    ],
  },

  {
    id: "ts-cfg-msbuild",
    name: "MSBuild 컴파일러 옵션",
    tagline: ".NET 프로젝트가 tsc 를 부르는 두 길 — tsconfig 또는 .csproj 속성",
    intro:
      "ASP.NET Core 같은 MSBuild 프로젝트에서 TypeScript를 설정하는 페이지입니다. 권장은 tsconfig.json을 두고 그것을 파일 목록과 옵션의 단일 진실로 삼는 것입니다. 대안은 .csproj의 PropertyGroup에 `<TypeScriptNoEmitOnError>true</TypeScriptNoEmitOnError>`처럼 XML 속성으로 적는 것입니다. 각 속성이 tsc 플래그 하나에 대응합니다. 대응이 없는 플래그는 `<TypeScriptAdditionalFlags>`로 적습니다. `<TypeScriptCompileBlocked>`는 다른 빌드 도구를 쓰면서 VS 편집만 받을 때 씁니다. `<TypeScriptEnableIncrementalMSBuild>`(4.2)는 증분 빌드입니다. Debug/Release는 조건부 PropertyGroup으로 나눕니다.",
    blocks: [
      {
        label: "한 문단으로",
        body: "`Microsoft.TypeScript.MSBuild` NuGet 패키지가 빌드 타깃을 더하고, 프로젝트 폴더의 tsconfig.json이 있으면 그것을 읽습니다. 없으면 .csproj 속성이 tsc 플래그로 변환됩니다. 둘 다 결국 tsc를 부르는 것이라 옵션의 뜻은 TSConfig 레퍼런스와 같고, 7.0에서 제거된 옵션은 여기서도 에러입니다. 프런트엔드를 Vite 같은 도구가 따로 빌드하는 요즘 구조에서는 `<TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>`로 MSBuild의 tsc 호출을 막고 에디터 지원만 받는 쪽이 보통입니다.",
        code: "<!-- .csproj -->\n<PropertyGroup Condition=\"'$(Configuration)' == 'Debug'\">\n  <TypeScriptNoEmitOnError>false</TypeScriptNoEmitOnError>\n  <TypeScriptSourceMap>true</TypeScriptSourceMap>\n</PropertyGroup>\n<PropertyGroup Condition=\"'$(Configuration)' == 'Release'\">\n  <TypeScriptNoEmitOnError>true</TypeScriptNoEmitOnError>\n</PropertyGroup>\n<!-- 다른 도구가 빌드하면 -->\n<TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "ASP.NET Core 튜토리얼이 이 패키지를 쓰는 전체 흐름이고, 속성이 대응하는 플래그의 뜻은 TSConfig 레퍼런스입니다.",
      },
    ],
    sources: [
      { label: "Compiler Options in MSBuild", href: `${DOCS}/handbook/compiler-options-in-msbuild.html` },
      { label: "ASP.NET Core", href: `${DOCS}/handbook/asp-net-core.html` },
    ],
  },

  {
    id: "ts-cfg-tsconfig-ref",
    name: "TSConfig 레퍼런스",
    tagline: "옵션 백여 개의 사전 — 그룹별 지도와 자주 보는 것의 기본값",
    intro:
      "typescriptlang.org/tsconfig 는 모든 옵션의 사전입니다. 최상위(files·extends·include·exclude·references)와 compilerOptions의 그룹들 — 타입 검사(20), 모듈(19), Emit(21), JavaScript 지원, 에디터 지원, 상호운용 제약(8), 하위 호환(9), 언어와 환경(13), 컴파일러 진단(9), 프로젝트(6), 출력 형식, 완전성, watch. 이 시트는 그 지도와, 자주 보는 옵션의 7.0 기준 기본값입니다.",
    blocks: [
      {
        label: "그룹 지도",
        body: "그룹 이름이 '이 옵션이 무엇에 영향을 주는가'를 말해 줍니다. 타입 검사 그룹은 에러의 종류를, 모듈 그룹은 import 해석을, Emit 그룹은 출력 파일을, 상호운용 제약은 '단일 파일 도구와 맞추기'(isolatedModules·verbatimModuleSyntax·isolatedDeclarations·erasableSyntaxOnly·esModuleInterop)를, 하위 호환 그룹은 전부 옛 옵션(importsNotUsedAsValues·preserveValueImports·keyofStringsOnly…)이라 새 프로젝트에서는 볼 일이 없습니다.",
        code: "그룹         멤버 (일부)\n──────────  ───────────────────────────────────────────────────────────────\n타입 검사 (20)  strict · noImplicitAny · strictNullChecks · strictFunctionTypes ·\n              exactOptionalPropertyTypes ·\n                     noUncheckedIndexedAccess · noImplicitOverride · noPropertyAccessFromIndexSignature ·\n                     useUnknownInCatchVariables ·\n                     noUnusedLocals · noUnusedParameters · noImplicitReturns ·\n                     noFallthroughCasesInSwitch …\n모듈 (19)            module · moduleResolution · paths · rootDir · rootDirs · types · typeRoots ·\n                    resolveJsonModule ·\n                     allowImportingTsExtensions · rewriteRelativeImportExtensions ·\n                     noUncheckedSideEffectImports · customConditions …\nEmit (21)            declaration · declarationMap · emitDeclarationOnly · outDir · sourceMap · noEmit ·\n                     noEmitOnError ·\n                     removeComments · importHelpers · preserveConstEnums · stripInternal …\nJavaScript 지원      allowJs · checkJs · maxNodeModuleJsDepth\n상호운용 제약 (8)     isolatedModules · verbatimModuleSyntax · isolatedDeclarations · erasableSyntaxOnly ·\n                   esModuleInterop ·\n                     allowSyntheticDefaultImports · forceConsistentCasingInFileNames · preserveSymlinks\n언어와 환경 (13)      target · lib · jsx · jsxFactory · jsxImportSource · experimentalDecorators ·\n                   emitDecoratorMetadata ·\n                     useDefineForClassFields · moduleDetection · libReplacement · noLib\n프로젝트 (6)  composite · incremental · tsBuildInfoFile · disableSourceOfProjectReferenceRedirect …\n컴파일러 진단 (9)  explainFiles · listFiles · traceResolution · extendedDiagnostics · generateTrace · noCheck\n완전성   skipLibCheck · skipDefaultLibCheck\n하위 호환 (9)  importsNotUsedAsValues · preserveValueImports · keyofStringsOnly ·\n             suppressImplicitAnyIndexErrors … (옛것)",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 자주 보는 옵션의 7.0 기본값",
        body: "6.0의 변경을 반영한 표입니다. 옛 문서나 블로그의 '기본값'은 이 표와 다를 수 있습니다. 실제로 확인한 것 — `--explainFiles`가 \"Default library for target 'ES2025'\"를 찍었고(target 기본), `tsc --init`이 strict 등을 명시적으로 적었고, `types: []` 때문에 @types/node가 자동으로 안 들어와 TS2591이 났고, `noUncheckedSideEffectImports`가 켜져 있어 `import \"./missing.css\"`가 TS2882였습니다(false로 끄자 통과).",
        code: "옵션                   7.0 기본값               한 줄\n────────────────────  ──────────────────────  ──────────────────────────────────────\nstrict                 true (6.0+)              strict 묶음 전부\nnoImplicitAny · strictNullChecks  true (strict)        추론 실패 any 에러 · null 구분\nuseUnknownInCatchVariables  true (strict)            catch (e) 의 e 가 unknown\nexactOptionalPropertyTypes  false                    ?: 에 undefined 명시 대입 금지 (TS2375)\nnoUncheckedIndexedAccess  false                    인덱스 읽기에 | undefined\nnoImplicitOverride     false                    override 키워드 강제 (TS4113)\nnoPropertyAccessFromIndexSignature false               인덱스 시그니처는 [\"k\"] 로 (TS4111)\ntarget                 es2025 (그해 ES, 6.0+)    es5 제거\nmodule                 esnext (6.0+)            amd·umd·system 제거\nmoduleResolution       module 에서 유도          classic·node10 제거\nlib                    target 에서 유도 (+dom)    dom 에 dom.iterable 포함 (6.0)\nesModuleInterop        true (node16+/preserve 암묵, false 불가)\nverbatimModuleSyntax   false                    켜면 isolatedModules 도 true\nisolatedDeclarations   false (5.5)              declaration 필요\nerasableSyntaxOnly     false (5.8)              enum·namespace(값)·매개변수 속성·import= 금지\nskipLibCheck           false                    .d.ts 전체 검사 생략\ndeclaration · incremental  composite 면 true, 아니면 false\nnoEmit · noEmitOnError · sourceMap  false\nrootDir                . (tsconfig 폴더, 6.0+)   이전: 입력 파일의 공통 디렉터리\ntypes                  [] (6.0+)                이전: @types 전부\nnoUncheckedSideEffectImports  true (6.0+)              TS2882\nlibReplacement         false (6.0+; 5.8 도입)    @typescript/lib-* 대체 끔\nallowJs                false (checkJs 면 true)\njsx                    (없음)                    preserve·react·react-native·react-jsx·react-jsxdev\nresolveJsonModule      false (nodenext 는 자동)\nallowImportingTsExtensions  false (rewriteRelativeImportExtensions 면 true)  noEmit/emitDeclarationOnly\n                                                                            필요 (TS5096)",
        codeLang: "text",
      },
      {
        label: "엄격함을 더 올리는 다섯 개",
        body: "strict 밖에 있어 따로 켜야 하는 검사들입니다.\n`exactOptionalPropertyTypes`는 `{ a?: number }`에 `{ a: undefined }`를 넣으면 \"Type '{ a: undefined; }' is not assignable to type 'Opt' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.\"(TS2375)를 냅니다.\n`noUncheckedIndexedAccess`를 켜면 `arr[5]`가 `number | undefined`가 됩니다.\n`noPropertyAccessFromIndexSignature`는 `dict.a` 대신 `dict[\"a\"]`로 쓰게 합니다(TS4111).\n`noImplicitOverride`는 기반에 없는 멤버의 override를 금지합니다(TS4113).\n`noUnusedLocals`·`noUnusedParameters`는 안 쓰는 선언을 검사합니다.\n5.9의 `tsc --init`은 앞의 둘(exactOptionalPropertyTypes·noUncheckedIndexedAccess)을 기본으로 켜 둡니다. 실제로 전부 이 허브의 다른 시트에서 돌려 받은 문구들입니다.",
        code: "--exactOptionalPropertyTypes\ntype Opt = { a?: number }; const op: Opt = { a: undefined };\n// Type '{ a: undefined; }' is not assignable to type 'Opt' with 'exactOptionalPropertyTypes: true'.\n//   Consider adding 'undefined' to the types of the target's properties. (TS2375)\n\n--noUncheckedIndexedAccess\nconst x: number = [1, 2][5];\n// Type 'number | undefined' is not assignable to type 'number'. (TS2322)\n\n--noPropertyAccessFromIndexSignature\nconst dict: Record<string, number> = {}; dict.a;\n// Property 'a' comes from an index signature, so it must be accessed with ['a']. (TS4111)",
      },
      {
        label: "문제의 구조: 옵션은 네 축 위에 있다",
        body: "백여 개 옵션은 네 질문으로 정리됩니다.\n(1) 무엇을 에러로 볼까요? 타입 검사 그룹입니다.\n(2) import를 어떻게 찾을까요? 모듈 그룹입니다.\n(3) 무엇을 어디에 쓸까요? Emit 그룹입니다.\n(4) 어떤 환경을 가정할까요? 언어와 환경(target·lib·jsx)입니다.\n상호운용 제약은 (3)의 특수 사례입니다('다른 도구가 변환해도 깨지지 않게'). 프로젝트 그룹은 (3)의 묶음 단위입니다. 진단 그룹은 '왜 이렇게 됐나'를 묻는 도구입니다. 어떤 옵션을 만나든 이 네 축 중 어디인지 먼저 놓으면 뜻이 반은 읽힙니다.",
        code: "축                 질문                          그룹\n────────────────  ───────────────────────────  ──────────────────────────────\n① 검사            무엇을 에러로 볼까              타입 검사 (strict …)\n② 해석            import 를 어떻게 찾을까         모듈 (module · moduleResolution · paths …)\n③ 출력            무엇을 어디에 쓸까              Emit · 상호운용 제약 · 프로젝트\n④ 환경            어떤 런타임을 가정할까           언어와 환경 (target · lib · jsx …)\n(도구)            왜 이렇게 됐나                  컴파일러 진단 (explainFiles · traceResolution …)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "같은 옵션을 명령줄에서 쓰는 법과 tsc 전용 플래그(--init·--build·--showConfig·--explainFiles)는 다음 장 tsc CLI, composite·incremental은 프로젝트 참조, watchOptions는 watch 설정입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 6.0에서 기본값이 바뀐 옵션 일곱 개를 적어 보세요.\n2) strict에 포함되지 않아 따로 켜야 하는 검사 셋은?\n3) `types: []`가 기본이 되면서 생긴 흔한 에러는?\n4) 상호운용 제약 그룹의 옵션들이 공통으로 겨냥하는 것은?",
      },
    ],
    sources: [
      { label: "TSConfig Reference", href: `${TSCONFIG}/` },
      { label: "TypeScript 6.0 — New defaults", href: `${DOCS}/handbook/release-notes/typescript-6-0.html` },
      { label: "TSConfig — strict", href: `${TSCONFIG}/#strict` },
    ],
  },

  {
    id: "ts-cfg-cli",
    name: "tsc CLI 옵션",
    tagline: "tsc 를 부르는 여섯 모양과 전용 플래그",
    intro:
      "명령줄에서 tsc를 쓰는 법입니다. 사용 형태는 다음과 같습니다. `tsc`(가장 가까운 tsconfig), `tsc index.ts`, `tsc src/*.ts`, `tsc --project tsconfig.production.json`, `tsc index.js --declaration --emitDeclarationOnly`, `tsc app.ts util.ts --target esnext --outfile index.js`입니다. outFile이 제거되어 마지막 형태는 더는 안 됩니다. 전용 플래그는 `--init`, `--build`(`-b`), `--watch`(`-w`), `--showConfig`, `--listFilesOnly`, `--explainFiles`, `--ignoreConfig`(6.0), 그리고 7.0의 `--checkers`·`--builders`·`--singleThreaded`입니다.",
    blocks: [
      {
        label: "여섯 모양과 한 규칙",
        body: "모든 compilerOptions는 `--이름 값` 형태로 명령줄에서도 줄 수 있습니다(`--noEmit`, `--target es2022`, `--module nodenext`). 규칙은 하나입니다. '명령줄에 입력 파일을 적으면 tsconfig.json은 무시된다'입니다. 6.0은 그 상황을 TS5112 에러로 바꾸고 `--ignoreConfig`로만 넘어가게 했습니다. 이 허브의 probe들은 전부 `npx tsc --noEmit --strict --target es2022 … 파일`이었습니다. tsconfig가 없는 폴더라 가능했던 것입니다. 모르는 옵션을 주면 \"Unknown compiler option '--nope'.\"(TS5023)이 나옵니다.",
        code: "$ tsc                                        # 가장 가까운 tsconfig.json\n$ tsc -p tsconfig.production.json            # 지정한 설정\n$ tsc --noEmit                               # 검사만 (CI)\n$ tsc index.ts                               # 파일 지정 → tsconfig 무시 (6.0+: 있으면 TS5112)\n$ tsc --ignoreConfig index.ts                # 무시를 명시\n$ tsc index.js --declaration --emitDeclarationOnly --allowJs   # JS 에서 .d.ts\n$ tsc --nope\nerror TS5023: Unknown compiler option '--nope'.",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 진단 플래그 셋",
        body: "`--showConfig`는 최종 설정을 JSON으로 출력하고 빌드하지 않습니다(extends 합친 결과, include가 찍어낸 files).\n`--listFilesOnly`는 컴파일에 들어가는 파일 목록만 출력합니다.\n`--explainFiles`는 각 파일이 왜 들어왔는지 설명합니다.\n실제로 `--explainFiles`는 `gen/g.ts`를 \"Imported via \"../gen/g.js\" from file 'src/s.ts'\"로, `src/s.ts`를 \"Matched by include pattern 'src' in 'tsconfig.json'\"으로, lib 파일을 \"Default library for target 'ES2025'\"로 설명했습니다. '왜 이 파일이 검사되지'·'왜 이 전역이 보이지'의 답은 거의 이 플래그에 있습니다. `--traceResolution`은 모듈 하나하나의 해석 과정을 보여 줍니다(모듈 레퍼런스 시트).",
        code: "$ npx tsc -p . --explainFiles\n…/lib.es2025.full.d.ts\n   Default library for target 'ES2025'\ngen/g.ts\n   Imported via \"../gen/g.js\" from file 'src/s.ts'\nsrc/s.ts\n   Matched by include pattern 'src' in 'tsconfig.json'\n\n$ npx tsc -p . --listFilesOnly | grep -v node_modules\n…/gen/g.ts\n…/src/s.ts",
        codeLang: "bash",
      },
      {
        label: "--init · --build · --watch",
        body: "`tsc --init`은 tsconfig.json을 만듭니다. 5.9부터는 주석 대신 열다섯 줄의 실제 설정을 적어 줍니다(module nodenext·target esnext·strict·verbatimModuleSyntax·isolatedModules·moduleDetection force·skipLibCheck·noUncheckedIndexedAccess·exactOptionalPropertyTypes·declaration·sourceMap·types []…). 실제로 7.0.2에서 그렇게 나왔습니다.\n`tsc -b`는 프로젝트 참조를 따라 의존 순서대로 빌드하고 최신이면 건너뜁니다(`--verbose`·`--dry`·`--clean`·`--force`).\n`tsc -w`는 입력 파일을 감시해 재컴파일합니다(watch 설정 장).\n7.0 전용 플래그는 `--checkers`(프로젝트당 검사기 수, 기본 4), `--builders`(동시 빌드 프로젝트 수), `--singleThreaded`입니다.",
        code: "$ npx tsc --init          # 7.0.2 → 15줄의 실제 설정 (5.9+)\n$ npx tsc -b --verbose    # 프로젝트 참조 빌드\n$ npx tsc -b --dry        # 무엇을 빌드할지만\n$ npx tsc -w              # 감시\n\n$ npx tsc --help --all | grep -A1 -E 'checkers|builders|singleThreaded'\n--checkers         Set the number of checkers per project.\n--singleThreaded   Run in single threaded mode.\n--builders         Set the number of projects to build concurrently.",
        codeLang: "bash",
      },
      {
        label: "문제가 나는 경우: 명령줄과 tsconfig 가 어긋날 때",
        body: "자주 보는 혼란입니다.",
        code: "증상                                       원인                                    처방\n────────────────────────────────────────  ─────────────────────────────────────  ─────────────────────────\n에디터는 에러인데 tsc 파일이름 은 통과        파일을 적어 tsconfig 가 무시됨 (6.0: TS5112)  tsc -p . 또는 --noEmit\n옵션을 줬는데 효과가 없다                     tsconfig 가 같은 옵션을 덮음? (CLI 가 우선)    --showConfig 로 확인\n파일이 왜 들어왔는지 모른다                   import·types·reference 경로             --explainFiles\n전역 타입이 안 보인다 (6.0+)                 types: []                               tsconfig types 에 추가\n빌드가 매번 전부 다시                         incremental/composite 없음               -b 또는 incremental: true",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "`-b`가 전제하는 `references`·`composite`는 다음 장 프로젝트 참조, `-w`의 세부는 watch 설정, 플래그 하나하나의 뜻은 TSConfig 레퍼런스입니다.",
      },
      {
        label: "확인 질문",
        body: "1) `tsc index.ts`와 `tsc -p .`의 차이는?\n2) 파일이 왜 컴파일에 들어왔는지 보는 플래그는?\n3) 5.9 이후 `tsc --init`이 만드는 파일의 특징은?\n4) 7.0에서 추가된 병렬 관련 플래그 셋은?",
      },
    ],
    sources: [
      { label: "tsc CLI Options", href: `${DOCS}/handbook/compiler-options.html` },
      { label: "TypeScript 5.9 — Minimal and Updated tsc --init", href: `${DOCS}/handbook/release-notes/typescript-5-9.html` },
      { label: "Announcing TypeScript 7.0", href: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
    ],
  },

  {
    id: "ts-cfg-references",
    name: "프로젝트 참조",
    tagline: "큰 저장소를 tsconfig 여러 개로 나누고 tsc -b 로 순서대로 빌드한다",
    intro:
      "3.0에 들어온 기능입니다. tsconfig에 `\"references\": [{ \"path\": \"../core\" }]`를 적으면 그 프로젝트의 출력 .d.ts를 import하고, `tsc -b`(빌드 모드)가 의존 순서대로, 오래된 것만 다시 빌드합니다. 참조되는 프로젝트는 `composite: true`여야 하고, 그러면 declaration이 켜지고 rootDir 기본이 tsconfig 폴더가 되며 모든 구현 파일이 include/files에 잡혀야 합니다.",
    blocks: [
      {
        label: "구조와 composite 의 요구",
        body: "뿌리에는 `files: []`와 references만 가진 '솔루션' tsconfig를 두고, 패키지마다 자기 tsconfig를 둡니다. 참조되는 쪽은 `composite: true`가 필요합니다. 그 요구는 셋입니다.\n`declaration`이 켜져야 합니다(자동).\n`rootDir`가 명시되지 않으면 tsconfig 폴더가 됩니다.\n'모든 구현 파일이 include나 files에 맞아야' 합니다(안 그러면 TS6307).\n참조하는 쪽은 상대 경로 import가 아니라 참조 프로젝트의 출력 .d.ts를 봅니다. 실제로 core에서 composite를 빼자 app 쪽에서 \"Referenced project '…/core' must have setting \"composite\": true.\"(TS6306)가 나왔습니다. core의 include 밖 파일을 import하자 \"File '…/stray.ts' is not under 'rootDir' '…/src'. 'rootDir' is expected to contain all source files.\"(TS6059)와 \"File '…/stray.ts' is not listed within the file list of project '…'. Projects must list all files or use an 'include' pattern.\"(TS6307)이 나왔습니다.",
        code: "// tsconfig.json (솔루션)\n{ \"files\": [], \"references\": [{ \"path\": \"packages/core\" }, { \"path\": \"packages/app\" }] }\n// packages/core/tsconfig.json\n{ \"compilerOptions\": { \"composite\": true, \"declaration\": true, \"rootDir\": \"src\", \"outDir\": \"dist\",\n  \"module\": \"nodenext\" }, \"include\": [\"src\"] }\n// packages/app/tsconfig.json\n{ \"compilerOptions\": { \"rootDir\": \"src\", \"outDir\": \"dist\", \"module\": \"nodenext\" }, \"include\": [\"src\"],\n  \"references\": [{ \"path\": \"../core\" }] }\n\n// composite 없을 때\n// error TS6306: Referenced project '…/packages/core' must have setting \"composite\": true.",
      },
      {
        label: "실제로 돌려 보면: tsc -b 의 동작",
        body: "`tsc -b --verbose`는 빌드에 든 프로젝트 셋을 나열하고, core가 \"out of date because output file 'packages/core/tsconfig.tsbuildinfo' does not exist\"라 빌드하고, app도 빌드했습니다(app의 타입 에러는 그대로 보고). 두 번째 실행은 core가 \"up to date because newest input 'packages/core/src/index.ts' is older than output 'packages/core/tsconfig.tsbuildinfo'\"로 건너뛰었습니다. `--dry`는 \"A non-dry build would build project '…/packages/app/tsconfig.json'\"만 찍었습니다. 그리고 문서의 주의 — '일반 tsc는 --build 없이는 의존 프로젝트를 빌드하지 않는다'. 실제로 core의 dist를 지우고 `tsc -p packages/app`을 돌리면 \"Output file '…/core/dist/index.d.ts' has not been built from source file '…/core/src/index.ts'.\"(TS6305)입니다. 빌드 모드는 `noEmitOnError`가 켜진 것처럼 동작합니다.",
        code: "$ npx tsc -b --verbose\nProjects in this build:\n    * packages/core/tsconfig.json\n    * packages/app/tsconfig.json\n    * tsconfig.json\nProject 'packages/core/tsconfig.json' is out of date because output file\n  'packages/core/tsconfig.tsbuildinfo' does not exist\nBuilding project 'packages/core/tsconfig.json'...\n…\n$ npx tsc -b --verbose     # 두 번째\nProject 'packages/core/tsconfig.json' is up to date because newest input 'packages/core/src/index.ts' is\n  older than output 'packages/core/tsconfig.tsbuildinfo'\n\n$ rm -rf packages/core/dist && npx tsc -p packages/app\nerror TS6305: Output file '…/core/dist/index.d.ts' has not been built from source file\n  '…/core/src/index.ts'.",
        codeLang: "bash",
      },
      {
        label: "플래그와 주의",
        body: "`tsc -b`에는 다음 플래그가 있습니다. `--verbose`(무엇을 왜 빌드하는지), `--dry`(빌드할 것만 표시), `--clean`(출력 삭제, dry와 함께 가능), `--force`(전부 오래된 것으로 취급), `--watch`(verbose와만 조합)입니다. 인자는 의존 순서로 재배열됩니다(`tsc -b foo/prd.tsconfig.json bar`). 주의할 점이 있습니다. 의존하는 쪽은 빌드된 .d.ts가 필요하니 출력을 커밋하거나 클론 뒤 빌드해야 합니다. 체크인한 출력은 소스 관리 조작 뒤 `--force`가 필요할 수 있습니다. `declarationMap`을 켜면 정의로 이동이 .d.ts가 아니라 소스로 갑니다. `outFile`과 `prepend`는 제거됐으니 그 절은 역사입니다. MSBuild에서는 `<TypeScriptBuildMode>true</TypeScriptBuildMode>`로 적습니다.",
        code: "tsc -b 플래그    하는 일\n──────────────  ─────────────────────────────────────\n--verbose        무엇을 왜 빌드/건너뛰는지\n--dry            빌드할 프로젝트만 표시\n--clean          출력 삭제 (--dry 와 조합 가능)\n--force          전부 다시\n--watch          감시 (--verbose 와만)\n\n주의: -b 는 noEmitOnError 처럼 동작 · 출력 .d.ts 가 있어야 의존 쪽이 검사됨 · outFile/prepend 제거",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 참조는 '타입 경계' 를 .d.ts 로 고정하는 것이다",
        body: "하나의 tsconfig로 전부를 보면 모든 파일이 하나의 프로그램입니다. 어디서든 어디로든 import할 수 있고, 변경 하나에 전부 다시 검사됩니다. 참조로 나누면 패키지 경계가 '출력 .d.ts'로 고정됩니다. 의존하는 쪽은 소스가 아니라 선언을 봅니다. 선언이 안 바뀌면 다시 검사하지 않습니다(tsbuildinfo). 그래서 빨라집니다. 동시에 '환경마다 tsconfig 하나'(모듈 가이드)가 가능해집니다. DOM 코드와 Node 코드가 다른 lib를 가진 채 한 저장소에 있을 수 있습니다. 비용은 '빌드 순서'가 생기는 것입니다. 그래서 `-b`가 있습니다. 7.0의 `--builders`는 그 순서 안에서 독립적인 것을 동시에 돌립니다.",
        code: "하나의 tsconfig                   프로젝트 참조\n──────────────────────────────  ──────────────────────────────────────\n전부 하나의 프로그램               패키지마다 프로그램, 경계는 .d.ts\n어디서든 import                   references 에 적은 것만\n변경 → 전부 재검사                 tsbuildinfo 로 오래된 것만 (-b)\nlib·module 하나                   환경마다 다르게\n순서 없음                          의존 순서 (tsc -b 가 정렬 · 7.0 --builders 로 병렬)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "`-b --watch`의 감시 동작은 watch 설정 장, 참조를 번들러와 함께 쓰는 법은 빌드 도구 연동, `composite`·`incremental`·`tsBuildInfoFile`의 정의는 TSConfig 레퍼런스의 프로젝트 그룹입니다.",
      },
      {
        label: "확인 질문",
        body: "1) composite가 요구하는 세 가지는?\n2) `tsc -p app`이 의존 프로젝트를 빌드하지 않을 때 나는 에러와 처방은?\n3) `tsc -b`가 두 번째 실행에서 core를 건너뛴 근거는?\n4) 참조로 나누면 패키지 경계가 무엇으로 바뀌나요?",
      },
    ],
    sources: [
      { label: "Project References", href: `${DOCS}/handbook/project-references.html` },
      { label: "TSConfig — composite", href: `${TSCONFIG}/#composite` },
    ],
  },

  {
    id: "ts-cfg-buildtools",
    name: "빌드 도구 연동",
    tagline: "열한 도구와 한 문장 — 변환은 도구가, 검사는 tsc 가",
    intro:
      "Babel, Browserify, Grunt, Gulp, Jspm, MSBuild, NuGet, Rollup, Svelte Compiler, Vite, Webpack에 TypeScript를 끼우는 방법의 목록입니다. 목록의 절반은 역사(Grunt의 grunt-ts는 '더는 관리되지 않음', Jspm은 '0.16beta')이고, 살아 있는 쪽의 공통 문장은 Vite 항목에 있습니다 — 'Vite는 .ts 파일 import를 기본으로 지원한다. 변환만 하고 타입 검사는 하지 않는다'.",
    blocks: [
      {
        label: "도구별 한 줄",
        body: "Babel은 `@babel/cli @babel/core @babel/preset-typescript`를 설치하고 `.babelrc`에 `{ \"presets\": [\"@babel/preset-typescript\"] }`를 적습니다.\nVite는 기본 지원이고 변환만 합니다.\nWebpack은 `ts-loader`를 씁니다(또는 babel-loader·esbuild-loader).\nRollup은 `@rollup/plugin-typescript`를 쓰고, `typescript`와 `tslib`이 peer dependency입니다.\nSvelte는 `svelte-preprocess`입니다.\nBrowserify는 tsify입니다(Gulp 튜토리얼).\nMSBuild·NuGet은 Microsoft.TypeScript.MSBuild입니다(MSBuild 장).\nGrunt·Jspm은 역사입니다.",
        code: "도구          끼우는 것                                검사?\n───────────  ──────────────────────────────────────  ──────\nBabel        @babel/preset-typescript                  ✗\nVite         (기본 지원, esbuild)                       ✗\nWebpack      ts-loader / babel-loader / esbuild-loader  ts-loader 만 선택적 ✓ (transpileOnly 면 ✗)\nRollup       @rollup/plugin-typescript (+ tslib)        플러그인 설정에 따라\nSvelte       svelte-preprocess                          ✗ (svelte-check 따로)\nBrowserify   tsify                                      역사\nMSBuild/NuGet Microsoft.TypeScript.MSBuild              ✓ (tsc 호출)\nGrunt/Jspm   grunt-ts (미관리) / 0.16beta               역사",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 변환기들은 검사하지 않는다",
        body: "Babel 장에서 본 그대로 — `@babel/preset-typescript`는 타입 에러가 있는 파일을 조용히 변환했습니다. Vite의 esbuild도, Node 24의 타입 벗기기도 같습니다(`process.features.typescript`가 \"strip\"). 그래서 어느 도구를 쓰든 파이프라인에 `tsc --noEmit`이 한 줄 들어가야 타입 에러가 빌드를 막습니다. 7.0이 빨라진 것(8~12배)이 이 한 줄의 비용을 크게 줄였고, `--checkers`로 더 병렬화할 수 있습니다. 변환기가 처리하지 못하는 TypeScript 문법(const enum·namespace·매개변수 속성·import=)은 `erasableSyntaxOnly`로 미리 막고, 파일 단위 변환이 못 하는 import 지우기는 `verbatimModuleSyntax`로 — 둘이 '변환기와 맞추는' 옵션입니다.",
        code: "# package.json scripts — 분업\n\"build\": \"vite build\",              # 변환 + 번들 (검사 없음)\n\"typecheck\": \"tsc --noEmit\",        # 검사만\n\"ci\": \"npm run typecheck && npm run build\"\n\n# 변환기와 맞추는 옵션\n{ \"compilerOptions\": { \"noEmit\": true, \"verbatimModuleSyntax\": true, \"erasableSyntaxOnly\": true,\n\"isolatedModules\": true } }",
        codeLang: "text",
      },
      {
        label: "7.0 과 도구들의 API 문제",
        body: "7.0 발표 글의 한 절 — 7.0은 안정된 프로그래밍 API 없이 나왔고 새 API는 7.1에 예정. 그래서 TypeScript의 API에 기대는 도구들 — Vue·Svelte·Astro·Angular의 템플릿 타입 검사, webpack의 ts-loader — 는 당장은 6.0 API를 씁니다. `@typescript/typescript6` 패키지로 6.0을 `tsc6`로 나란히 설치할 수 있습니다. 변환만 하는 도구(Vite·esbuild·Babel)는 TypeScript API를 쓰지 않아 영향이 없습니다. 실제로 이 허브의 '추론 타입 꺼내기'도 7.0에 JS API가 없어 typescript@6(6.0.3)으로 했습니다.",
        code: "도구                           TS API 의존   7.0 영향\n────────────────────────────  ───────────  ──────────────────────────────\nVite · esbuild · swc · Babel   ✗             없음 (변환만)\ntsc --noEmit                   (자체)        7.0 으로 바로\nts-loader (webpack)            ✓             6.0 API → 7.1 대기\nvue-tsc · svelte-check         ✓             6.0 API → 7.1 대기\n@typescript/typescript6        —             6.0 을 tsc6 로 나란히",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "분업의 원리는 튜토리얼의 Babel과 함께 쓰기, 변환기와 맞추는 옵션(isolatedModules·verbatimModuleSyntax·erasableSyntaxOnly)의 정의는 TSConfig 레퍼런스, 개발 중 재검사는 다음 장 watch 설정입니다. 번들러 자체는 번들링 허브(예정)에서 다룹니다.",
      },
      {
        label: "확인 질문",
        body: "1) Vite 항목의 문장이 다른 모든 변환 도구에 적용되는 이유는?\n2) CI에 어떤 한 줄이 있어야 타입 에러가 빌드를 막나요?\n3) 7.0으로 바로 갈 수 있는 도구와 7.1을 기다리는 도구의 차이는?",
      },
    ],
    sources: [
      { label: "Integrating with Build Tools", href: `${DOCS}/handbook/integrating-with-build-tools.html` },
      { label: "Announcing TypeScript 7.0", href: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
    ],
  },

  {
    id: "ts-cfg-watch",
    name: "watch 설정",
    tagline: "파일 변화를 어떻게 감지할까 — 폴링과 fs 이벤트",
    intro:
      "`tsc -w`가 파일 변화를 감지하는 방식의 설정입니다. 3.8부터 tsconfig의 `watchOptions`가 권장이고 환경 변수(`TSC_WATCHFILE`·`TSC_WATCHDIRECTORY`)도 남아 있습니다. `watchFile`(파일 하나를 어떻게), `watchDirectory`(디렉터리를 어떻게), `fallbackPolling`(fs 이벤트가 안 될 때), `synchronousWatchDirectory`, `excludeDirectories`·`excludeFiles`.",
    blocks: [
      {
        label: "watchOptions 의 여섯 항목",
        body: "문서의 예는 이렇습니다. `watchFile: \"useFsEvents\"`, `watchDirectory: \"useFsEvents\"`, `fallbackPolling: \"dynamicPriority\"`, `synchronousWatchDirectory: true`, `excludeDirectories: [\"**/node_modules\", \"_build\"]`, `excludeFiles: [\"build/fileWhichChangesOften.ts\"]`입니다.\nwatchFile 값은 fixedPollingInterval·priorityPollingInterval·dynamicPriorityPolling·fixedChunkSizePolling·useFsEvents·useFsEventsOnParentDirectory입니다.\nwatchDirectory 값은 useFsEvents·fixedPollingInterval·dynamicPriorityPolling·fixedChunkSizePolling입니다.\nfallbackPolling 값은 fixedInterval·priorityInterval·dynamicPriority·fixedChunkSize입니다.\n실제로 이 블록을 tsconfig에 넣고 `--showConfig`를 돌리면 그대로 받아들여 출력됐습니다.",
        code: "{\n  \"compilerOptions\": { … },\n  \"watchOptions\": {\n    \"watchFile\": \"useFsEvents\",\n    \"watchDirectory\": \"useFsEvents\",\n    \"fallbackPolling\": \"dynamicPriority\",\n    \"synchronousWatchDirectory\": true,\n    \"excludeDirectories\": [\"**/node_modules\", \"_build\"],\n    \"excludeFiles\": [\"build/fileWhichChangesOften.ts\"]\n  }\n}",
      },
      {
        label: "폴링과 fs 이벤트",
        body: "두 방식입니다. 폴링은 일정 간격으로 파일의 수정 시각을 확인합니다(기본 `fs.watchFile` 250ms). 변경을 놓치지 않지만 파일이 많으면 CPU를 씁니다. 'priority'·'dynamic' 변형은 자주 바뀌는 파일을 더 자주 보고 안 바뀌는 파일은 덜 봅니다. fs 이벤트는 OS가 변경을 알려 주는 방식입니다(`fs.watch`). 싸지만 플랫폼·네트워크 드라이브·컨테이너에 따라 못 받는 경우가 있어 fallbackPolling이 있습니다. 디렉터리 감시는 '네이티브 재귀 감시가 있는 플랫폼(macOS·Windows)'에서는 OS가 합니다. 없는 플랫폼(Linux)에서는 TypeScript가 하위 디렉터리를 돌며 등록합니다. `synchronousWatchDirectory`는 그 등록을 동기적으로 하라는 것입니다. 환경 변수 `TSC_WATCHFILE`(PriorityPollingInterval·DynamicPriorityPolling·UseFsEvents·UseFsEventsWithFallbackDynamicPolling·UseFsEventsOnParentDirectory)·`TSC_WATCHDIRECTORY`·`TSC_NONPOLLING_WATCHER`는 옛 길입니다.",
        code: "방식          동작                                   비용           함정\n───────────  ────────────────────────────────────  ────────────  ─────────────────────────────\n폴링          주기적으로 mtime 확인 (기본 250ms)       CPU (파일 수에 비례)   느림 · 배터리\nfs 이벤트     OS 가 알림 (fs.watch)                  거의 없음       네트워크 드라이브 · 일부 컨테이너에서 못 받음\n→ fallbackPolling  이벤트가 안 되면 폴링으로           —              —\n재귀 디렉터리  macOS·Windows 는 네이티브, Linux 는 TS 가 하위를 등록",
        codeLang: "text",
      },
      {
        label: "실제로 돌려 보면: 7.0 의 watch 는 다시 쓰였다",
        body: "7.0 발표 글 — `--watch`는 Parcel의 watcher를 Go로 옮긴 것 위에 다시 만들어졌습니다. 그래서 위의 옵션들이 어디까지 그대로 반영되는지는 7.x에서 확인이 필요합니다(실제로 tsconfig에 적는 것은 받아들여졌고, 이 허브에서는 장시간 watch를 돌리지 않았습니다). 실무에서 watch는 보통 에디터(tsserver)나 Vite의 HMR이 대신하고, `tsc -w`나 `tsc -b -w`는 .d.ts를 계속 만들어야 하는 라이브러리 개발에서 씁니다. `excludeDirectories: [\"**/node_modules\"]`는 거의 항상 켤 가치가 있습니다 — 감시 대상이 수천 개 줄어듭니다.",
        code: "$ npx tsc -w                 # 단일 프로젝트 감시\n$ npx tsc -b -w --verbose    # 참조 프로젝트 전체 감시\n\n# 7.0: watch 는 Parcel watcher 의 Go 포트 위에 재구현 — 옵션 반영 범위는 7.x 에서 확인",
        codeLang: "bash",
      },
      {
        label: "다음 입구",
        body: "watch가 다시 빌드하는 단위(프로젝트)는 프로젝트 참조 장, `incremental`·`tsBuildInfoFile`(실제로 `.cache/tsbuildinfo`에 9,487바이트가 쓰였음)은 TSConfig 레퍼런스입니다. 다음 장 나이틀리 빌드는 다음 버전을 먼저 쓰는 법입니다.",
      },
      {
        label: "확인 질문",
        body: "1) 폴링과 fs 이벤트의 교환 조건은?\n2) fallbackPolling은 언제 쓰이나요?\n3) Linux에서 디렉터리 감시가 macOS와 다른 점은?\n4) `excludeDirectories`에 거의 항상 넣을 것은?",
      },
    ],
    sources: [
      { label: "Configuring Watch", href: `${DOCS}/handbook/configuring-watch.html` },
      { label: "TSConfig — Watch Options", href: `${TSCONFIG}/#watch-options` },
    ],
  },

  {
    id: "ts-cfg-nightly",
    name: "나이틀리 빌드",
    tagline: "typescript@next — 다음 버전을 오늘 쓰는 법",
    intro:
      "main 브랜치에서 매일 밤(PST 자정까지) npm에 올라가는 빌드입니다. `npm install -D typescript@next`. VS Code는 '워크스페이스 버전 사용'으로 그 버전을 쓰게 하거나 `.vscode/settings.json`에 `\"typescript.tsdk\": \"node_modules/typescript/lib\"`를 적고, 'JavaScript and TypeScript Nightly' 확장도 있습니다. Sublime(`typescript_tsdk`)·IntelliJ·옛 Visual Studio 설정도 적혀 있습니다.",
    blocks: [
      {
        label: "태그와 버전",
        body: "실제로 `npm view typescript dist-tags`를 보면 `latest: 7.0.2`, `next: 7.1.0-dev.20261111.1`(날짜가 붙은 나이틀리), `beta: 7.1.0-beta`, `rc: 7.0.1-rc`. 7.0 발표 글은 네이티브 프리뷰 시절의 `@typescript/native-preview` 패키지(마지막 7.0.0-dev.20260707.2) 대신 '곧 표준 typescript 패키지의 next 태그로 나이틀리가 재개된다'고 적었고, 지금 next가 7.1.0-dev인 것이 그 결과입니다. `@typescript/typescript6`(6.0.2)는 6.0을 나란히 두는 패키지입니다.",
        code: "$ npm view typescript dist-tags\n{\n  latest: '7.0.2',\n  next: '7.1.0-dev.20261111.1',     # 나이틀리 (날짜)\n  beta: '7.1.0-beta',\n  rc: '7.0.1-rc',\n  …\n}\n$ npm i -D typescript@next\n$ npm view @typescript/typescript6 version\n6.0.2                               # 6.0 을 tsc6 로 나란히",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 에디터가 어느 버전을 보는가",
        body: "나이틀리를 설치해도 에디터가 자기 내장 TypeScript를 쓰면 빨간 줄이 다릅니다. VS Code는 상태 바의 버전 번호를 눌러 'Use Workspace Version'을 고르거나 settings에 tsdk 경로를 적습니다. 이것이 '에디터와 CI의 결과가 다르다'(도구 장의 문제)의 가장 흔한 원인이고, 나이틀리가 아니어도 프로젝트 버전과 에디터 버전이 다르면 같은 일이 납니다. 7.0처럼 메이저가 바뀌어 폐기 옵션이 에러가 되는 시기에는 특히 — 에디터는 6.x를 보고 CI는 7.0을 보면 tsconfig의 `baseUrl` 한 줄이 한쪽에서만 에러입니다.",
        code: "// .vscode/settings.json\n{ \"typescript.tsdk\": \"node_modules/typescript/lib\" }\n// 또는 명령 팔레트: TypeScript: Select TypeScript Version → Use Workspace Version\n\n# 어긋남의 예 (7.0 전환기)\n에디터 (내장 6.x): tsconfig 의 baseUrl → 폐기 경고\nCI (프로젝트 7.0): error TS5102: Option 'baseUrl' has been removed.",
        codeLang: "text",
      },
      {
        label: "왜 나이틀리를 쓰는가",
        body: "다음 버전의 기능을 먼저 쓰기, 또는 버그 수정이 들어갔는지 확인하기. 릴리스 노트의 각 기능은 베타 → RC → 정식 순서로 나오고, 나이틀리는 그보다 앞입니다. 플레이그라운드(typescriptlang.org/play)에서도 버전 선택기로 Nightly를 고를 수 있어 설치 없이 시험할 수 있습니다. 비용은 안정성 — 나이틀리는 CI에 두지 않고 로컬에서만, 정식이 나오면 `latest`로 돌아갑니다.",
        code: "단계        태그       예 (2026-11)            용도\n─────────  ────────  ─────────────────────  ─────────────────\n나이틀리    next      7.1.0-dev.20261111.1    기능 미리 보기 · 수정 확인 (로컬)\n베타        beta      7.1.0-beta              릴리스 노트 초안 읽기\nRC          rc        7.0.1-rc                업그레이드 리허설\n정식        latest    7.0.2                   CI · 배포",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "프로젝트 설정 섹션과 TypeScript 허브가 끝났습니다. 베타·RC에서 무엇이 바뀌는지는 릴리스 노트 시트, 버전이 어긋날 때의 증상은 시작하기의 도구 시트에 있습니다.",
      },
      {
        label: "확인 질문",
        body: "1) `typescript@next`의 버전 문자열에 들어 있는 것은?\n2) 나이틀리를 설치했는데 에디터의 빨간 줄이 CI와 다를 때 확인할 것은?\n3) 나이틀리를 CI에 두지 않는 이유는?",
      },
    ],
    sources: [
      { label: "Nightly Builds", href: `${DOCS}/handbook/nightly-builds.html` },
      { label: "Announcing TypeScript 7.0", href: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
    ],
  },
];
