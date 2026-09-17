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
    id: "ts-hb-everyday",
    name: "일상적인 타입",
    tagline: "자바스크립트에서 매일 만나는 값을 타입스크립트로 적는 법",
    intro:
      "자바스크립트 코드에서 흔히 쓰는 값들을 타입스크립트에서는 어떤 타입으로 적는지 설명하는 장입니다. 모든 타입을 다루지는 않고, 뒤에 나올 복잡한 타입들의 재료가 되는 기본 타입부터 짚습니다. 문서의 대제목마다 시트 하나로 나눠 따라가며 정리합니다.",
    blocks: [
      {
        label: "열네 개의 대제목",
        body: "원시 타입, 배열, any, 변수의 타입 어노테이션, 함수, 객체 타입, 유니온 타입, 타입 별칭, 인터페이스, 타입 단언, 리터럴 타입, null과 undefined, 열거형, 덜 쓰는 원시 타입.\n앞의 다섯은 타입 하나를 적는 법이고, 유니온 타입부터는 타입을 조합하고 이름을 붙이는 법입니다.",
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
        body: "자바스크립트에서 가장 많이 쓰는 원시 값은 문자열, 숫자, 불리언 세 가지입니다.\n타입스크립트에는 각각에 짝이 되는 타입이 있습니다. 타입 이름은 자바스크립트에서 값에 `typeof`를 썼을 때 나오는 이름과 동일합니다!\n(여기서 `typeof`에 대해 이야기를 하는 것이 아니라, 이미 알고 있는 이름을 그대로 쓴다는 의미에요.)\n\n- `string`: `\"Hello, world\"` 같은 문자열 값\n- `number`: `42` 같은 숫자 값\n- `boolean`: `true`와 `false` 두 값",
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
        body: "대문자 `String`, `Number`, `Boolean`도 문법상 쓸 수 있지만, 원시 값이 아니라 `new String(\"a\")` 같은 래퍼 객체의 타입입니다. 래퍼 객체는 `typeof`가 `\"object\"`이고, 같은 글자여도 `===`로 같지 않으며, `new Boolean(false)`도 객체라서 참이 됩니다. 이런 이유로 소문자 `string`을 요구하는 자리에 넘길 수도 없습니다. 그래서 타입은 항상 소문자로 씁니다. 반면 `new` 없이 `String(123)`처럼 함수로 부르는 것은 원시 값으로 바꾸는 형 변환이라 흔하게 씁니다.",
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
        body: "`any`는 특정 값 때문에 타입 검사 에러가 나지 않게 할 때 쓰는 타입입니다.\n값의 타입이 `any`이면\n1. 아무 속성에나 접근하고,\n2. 함수처럼 호출하고,\n3. 아무 타입과 서로 대입하는 등\n문법만 맞으면 거의 모든 것을 할 수 있습니다. 이때 꺼낸 속성도 다시 `any`가 되어, 검사가 꺼진 상태가 꺼내 쓰는 곳으로 계속 번집니다.\n단순한 코드 한 줄을 위해 긴 타입을 적어야 하는 상황이라면, `any` 타입은 상당히 유용합니다. 하지만 타입스크립트보다 내가 상황을 더 잘 알아 타입을 무시해도 돼! 라는 의미입니다. 만약 틀린 코드에 `any` 를 사용했다면, 컴파일은 통과하고 런타임 단계에서 문제가 발생합니다.",
        code: "let obj: any = { x: 0 };\n// 아래 어느 줄도 컴파일 에러가 나지 않는다\nobj.foo();             // 없는 메서드 호출 → 실행하면 터진다\nobj();                 // 객체를 함수처럼 호출 → 실행하면 터진다\nobj.bar = 100;         // 없는 속성에 대입\nobj = \"hello\";         // 객체였는데 문자열 대입\nconst n: number = obj; // 문자열인데 number 변수에 대입",
      },
      {
        label: "noImplicitAny: 조용히 생긴 any를 에러로 잡는다",
        body: "타입을 적지 않았고 문맥에서 추론할 수도 없으면, 컴파일러는 조용히 타입을 `any`로 둡니다. `any`는 컴파일 단계의 검사를 하지 않고, 위에서 명시한 문제가 발생할 수 있으니, 이런 경우는 피하는 게 좋습니다.\nTS 에는 `noImplicitAny` 옵션이 있는데, 해당 옵션을 켜면 이렇게 암묵적으로 생긴 `any`를 에러로 표시해 줍니다.",
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
        body: "익명 함수는 함수 선언과 조금 다릅니다. 어떻게 호출될지 타입스크립트가 알 수 있는 자리에 함수가 놓이면, 그 함수의 매개변수에 자동으로 타입이 붙습니다.\n아래에서 `s`에 타입을 적지 않았는데도, `names`가 `string[]`으로 추론되고 `string[]`의 `forEach`는 원소(`string`)를 하나씩 받는 함수를 인자로 받으므로 `s`는 `string`이 됩니다.\n이 과정을 문맥적 타이핑이라고 합니다. 어떻게 일어나는지 외울 필요는 없지만, 이런 일이 일어난다는 것을 알면 타입 어노테이션이 필요 없는 자리를 알아보는 데 도움이 됩니다.",
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
            body: "값이 한 덩어리냐, 속성을 여러 개 가진 묶음이냐의 차이입니다.\n- 원시 타입: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`. 값 하나이고, 이름(`string`)으로 적습니다. 바꿀 수 없고, `===`는 값이 같으면 같습니다. 복사하면 값이 복사됩니다.\n- 객체 타입: 객체, 배열, 함수, `Date` 등 나머지 전부. 속성을 모은 묶음이고, 모양(`{ x: number }`)으로 적습니다. 속성을 바꿀 수 있고, `===`는 같은 객체(주소)여야 같습니다. 복사하면 주소가 복사되어 같은 객체를 함께 가리킵니다.\n그래서 `{ x: 1 } === { x: 1 }`은 모양이 같아도 `false`이고, `const b = a` 뒤에 `b.x`를 바꾸면 `a.x`도 바뀌어 보입니다. 원시 값인데 `\"hi\".toUpperCase()`처럼 메서드를 쓸 수 있는 건 1절의 래퍼 객체로 잠깐 감싸기 때문입니다. 배열(`number[]`)과 함수도 자주 쓰여서 전용 표기가 있을 뿐, 넓게 보면 객체 타입입니다.",
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
        body: "지금까지는 `string`, `number[]`, 함수, 객체처럼 타입 하나를 적는 법을 봤습니다. 문서는 이제 이 타입들을 조합해 새 타입을 만들기 시작하고, 그 첫 방법이 유니온 타입입니다.\n6절 선택적 속성을 읽을 때 `last?: string`이 `string | undefined`가 됐던 것처럼, 값이 여러 타입 중 하나일 수 있는 경우를 정식으로 다루는 것이 유니온 타입입니다.",
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
        body: "유니온 타입에 맞는 값을 넘기기는 쉽습니다. 멤버 중 아무거나에 맞는 값을 넘기면 됩니다. 까다로운 건 유니온 타입의 값을 받아서 쓸 때입니다.\n타입스크립트는 유니온의 모든 멤버에서 가능한 동작만 허용합니다. `string | number`에서는 `string`에만 있는 `toUpperCase()`를 쓸 수 없는데, `id`가 `number`일 때 실행하면 터질 수 있기 때문입니다. 6절 선택적 속성에서 막혔던 것과 같은 원리입니다.\n해결책은 코드로 유니온을 좁히는 것입니다. `typeof id === \"string\"`처럼 확인하면 그 분기 안에서는 `string`만 남고, `else`에서는 따로 하지 않아도 남은 멤버인 `number`로 좁혀집니다. 배열은 `typeof`가 `\"object\"`라 구분할 수 없어서 `Array.isArray`로 확인합니다.",
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
        body: "지금까지는 객체 타입과 유니온 타입을 타입 어노테이션에 직접 적어 썼습니다. 편하긴 하지만, 같은 타입을 여러 곳에서 여러번 사용하는 경우가 있습니다. 같은 모양을 여러 곳에 적어 두면, 모양이 바뀔 때 모든 곳을 고쳐야 하고 하나라도 빠뜨리면 서로 어긋나는 문제가 생깁니다.\n타입 별칭은 말 그대로 어떤 타입에든 붙이는 이름입니다. `type 이름 = 타입;` 모양으로, 변수에 값을 담는 것처럼 타입에 이름을 붙여 둡니다. 아래 `printCoord(pt: Point)`는 6절의 `printCoord(pt: { x: number; y: number })`와 동일한 뜻이고, 긴 모양 대신 `Point`라는 이름을 썼다는 차이점만 존재합니다. 즉, 이름만 다른 것 뿐이죠!",
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
        body: "별칭은 단순히 타입스크립트가 지원하는 범위 내에서 우리만의 타입을 커스텀 한것입니다. 별칭을 사용했다고 해서, 타입스크립트가 기존에 하지 않았던 것을 지원하지 않습니다.\n예를 들어 `type Won = number`와 `type Dollar = number`로 원화와 달러에 이름을 붙여도, 둘 다 결국 `number`의 별명이라 원화 금액을 달러 변수에 넣어도 에러가 나지 않습니다. 이름으로 구분하고 싶어도, 타입스크립트는 이름이 아니라 원래 타입(`number`)을 보기 때문입니다.\n공식 문서에서는 다음과 같은 예시를 들어 줍니다.\n아래 코드는 정리를 거친 문자열만 담고 싶어서 `UserInputSanitizedString`이라는 이름을 붙였어요. 그런데 이 이름도 결국 `string`의 별명일 뿐이라, 정리하지 않은 아무 문자열(`\"new input\"`)을 넣어도 에러가 나지 않습니다. 얼핏 보면 틀린 코드 같지만, 두 타입 모두 같은 `string`을 가리키는 이름이라 문제가 없는 거죠! 결국 이름을 붙여도, 타입스크립트는 이름이 아니라 모양을 봅니다.",
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
        body: "인터페이스 선언은 객체 타입에 이름을 붙이는 또 다른 방법입니다. `interface 이름 { ... }` 모양으로 적고, 타입 별칭과 달리 `=`를 쓰지 않습니다.\n아래 `printCoord(pt: Point)`는 앞의 타입 별칭 예제와 똑같이 동작합니다. 타입스크립트는 `printCoord`에 넘긴 값의 구조만 봅니다. 기대한 속성(`x`, `y`)을 가지고 있는지만 신경 쓰고, 그 값이 `Point`라는 이름으로 만들어졌는지는 보지 않아요.\n이렇게 이름이 아니라 구조와 할 수 있는 일만 보기 때문에, 타입스크립트를 구조적 타입 시스템이라고 부릅니다.",
        terms: [
          {
            term: "구조적 타입 시스템 (structural type system)",
            body: "타입이 맞는지를 이름이 아니라 모양(가진 속성과 그 타입)으로 판단하는 방식입니다. 앞 절에서 `Won`과 `Dollar`가 서로 섞였던 것도 같은 이유입니다. 반대로 이름이 같아야 같은 타입으로 보는 방식(Java, C# 등)은 명목적 타입 시스템이라고 부릅니다.",
          },
        ],
        code: "interface Point {\n  x: number;\n  y: number;\n}\n\nfunction printCoord(pt: Point) {\n  console.log(\"The coordinate's x value is \" + pt.x);\n  console.log(\"The coordinate's y value is \" + pt.y);\n}\n\n// Point 로 만든 값이 아니어도, x 와 y 가 있으면 된다\nprintCoord({ x: 100, y: 100 });",
      },
      {
        label: "타입 별칭과 인터페이스의 차이 (Differences Between Type Aliases and Interfaces)",
        body: "타입 별칭과 인터페이스는 아주 비슷해서, 대부분의 경우 둘 중 아무거나 골라 써도 됩니다. `interface`의 거의 모든 기능을 `type`으로도 할 수 있어요.\n**가장 큰 차이는 나중에 속성을 더할 수 있느냐입니다.** **인터페이스는 언제든 다시 열어 속성을 추가할 수 있지만, 타입 별칭은 한 번 만들면 다시 열 수 없습니다.**\n- 확장하기: 인터페이스는 `extends`로, 타입 별칭은 `&`(교차 타입)로 다른 타입의 속성을 이어받습니다.\n- 속성 추가하기: 같은 이름의 인터페이스를 한 번 더 선언하면 두 선언이 합쳐지고, 같은 이름의 타입 별칭을 한 번 더 선언하면 에러가 납니다.\n문서도 이 개념들은 뒤 장에서 더 자세히 다루니, 지금 전부 이해하지 못해도 괜찮다고 말합니다.",
        terms: [
          {
            term: "교차 타입 (&)",
            body: "두 타입을 합쳐, 양쪽의 속성을 모두 가진 타입을 만듭니다. `Animal & { honey: boolean }`은 `name`과 `honey`를 모두 가져야 합니다. 유니온(`|`)이 둘 중 하나라면, 교차(`&`)는 둘 다입니다.",
          },
        ],
        code: "// 확장하기 — interface 는 extends\ninterface Animal {\n  name: string;\n}\ninterface Bear extends Animal {\n  honey: boolean;\n}\n\n// 확장하기 — type 은 & (교차 타입)\ntype AnimalType = {\n  name: string;\n};\ntype BearType = AnimalType & {\n  honey: boolean;\n};\n\n// 속성 추가하기 — 같은 이름의 interface 는 합쳐진다\ninterface Settings {\n  title: string;\n}\ninterface Settings {\n  theme: string;\n}\nconst settings: Settings = { title: \"블로그\", theme: \"dark\" }; // 둘 다 있어야 한다\n\n// 같은 이름의 type 은 다시 만들 수 없다\ntype SettingsType = {\n  title: string;\n};\ntype SettingsType = {\n  theme: string;\n};\n// 'SettingsType' 식별자가 중복되었습니다.",
      },
      {
        label: "그 밖의 차이와 고르는 기준",
        body: "문서는 그 밖의 차이도 짧게 짚어 줍니다.\n- 타입스크립트 4.2 이전에는 에러 메시지에 타입 별칭 이름 대신 원래 모양이 나오기도 했습니다. 인터페이스는 항상 이름으로 나옵니다.\n- 같은 이름끼리 합쳐지는 선언 병합은 인터페이스만 됩니다.\n- 인터페이스는 객체의 모양만 적을 수 있고, `string` 같은 원시 타입에 다른 이름을 붙일 수는 없습니다. 원시 타입이나 유니온에 이름을 붙이려면 타입 별칭을 씁니다.\n- 인터페이스 이름은 에러 메시지에 항상 원래 이름으로 나오지만, 그 이름으로 썼을 때만입니다.\n- `extends`로 확장한 인터페이스가 `&`로 합친 타입 별칭보다 컴파일러가 더 빠르게 처리하는 경우가 많습니다.\n대부분은 취향대로 골라도 되고, 다른 쪽이 필요하면 타입스크립트가 알려 줍니다. 기준이 필요하다면, 문서는 `type`의 기능이 필요해지기 전까지는 `interface`를 쓰라고 권합니다.",
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
            body: "타입 단언은 컴파일할 때 지워지기 때문에, 실행 중에 확인하는 일이 전혀 없습니다. 단언이 틀려도 예외가 나거나 `null`이 되지 않아요. 예를 들어 그 아이디의 요소가 캔버스가 아니었다면, 타입스크립트는 캔버스라고 믿고 넘어가고 실제로 캔버스 메서드를 부르는 순간 실행 에러가 납니다. 그래서 단언은 정말 확실할 때만 씁니다.",
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
        body: "`string`, `number` 같은 일반 타입 말고도, 타입 자리에 특정 문자열이나 숫자 하나를 적을 수 있습니다. 이걸 리터럴 타입이라고 합니다.\n자바스크립트의 변수 선언을 떠올리면 이해가 쉬워요. `let`은 안에 든 값을 바꿀 수 있고 `const`는 바꿀 수 없죠. 타입스크립트는 이 차이를 그대로 타입에 반영합니다. `let`으로 만든 변수는 아무 문자열이나 담을 수 있으니 `string`이 되고, `const`로 만든 변수는 그 문자열 하나만 담을 수 있으니 `\"Hello World\"`라는 리터럴 타입이 됩니다.",
        code: "let changingString = \"Hello World\";\nchangingString = \"Olá Mundo\";\n// 어떤 문자열이든 담을 수 있으니 타입은 string\n\nconst constantString = \"Hello World\";\n// 이 문자열 하나만 담을 수 있으니 타입은 \"Hello World\"",
      },
      {
        label: "리터럴 타입은 유니온으로 묶을 때 쓸모가 생긴다",
        body: "리터럴 타입 하나만으로는 별로 쓸모가 없습니다. 값이 하나뿐인 변수는 쓸 일이 거의 없으니까요.\n하지만 리터럴 타입을 유니온으로 묶으면 훨씬 쓸모 있어집니다. 예를 들어 정해진 값들만 받는 함수를 만들 수 있어요. `\"left\" | \"right\" | \"center\"`로 적어 두면 오타(`\"centre\"`)도 컴파일에서 잡힙니다. 숫자 리터럴도 똑같이 쓸 수 있고, `Options | \"auto\"`처럼 리터럴이 아닌 타입과 섞을 수도 있습니다.\n불리언 리터럴 타입도 있습니다. `true`와 `false` 두 개뿐이고, 사실 `boolean` 타입은 `true | false` 유니온의 별칭입니다.",
        code: "let x: \"hello\" = \"hello\";\nx = \"howdy\";\n// '\"howdy\"' 형식은 '\"hello\"' 형식에 할당할 수 없습니다.\n\n// 정해진 값만 받는다\nfunction printText(s: string, alignment: \"left\" | \"right\" | \"center\") {}\nprintText(\"Hello, world\", \"left\");\nprintText(\"G'day, mate\", \"centre\");\n// '\"centre\"' 형식의 인수는 '\"center\" | \"left\" | \"right\"' 형식의 매개 변수에 할당될 수 없습니다.\n\n// 숫자 리터럴\nfunction compare(a: string, b: string): -1 | 0 | 1 {\n  return a === b ? 0 : a > b ? 1 : -1;\n}\n\n// 리터럴이 아닌 타입과 섞기\ninterface Options {\n  width: number;\n}\nfunction configure(x: Options | \"auto\") {}\nconfigure({ width: 100 });\nconfigure(\"auto\");\nconfigure(\"automatic\");\n// '\"automatic\"' 형식의 인수는 '\"auto\" | Options' 형식의 매개 변수에 할당될 수 없습니다.",
      },
      {
        label: "리터럴 추론 (Literal Inference)",
        body: "객체로 변수를 초기화하면, 타입스크립트는 그 객체의 속성 값이 나중에 바뀔 수 있다고 봅니다. 그래서 `{ counter: 0 }`의 `counter`는 `0`이 아니라 `number`가 됩니다. 타입은 읽을 때와 쓸 때 모두에 쓰이기 때문이에요.\n문자열도 마찬가지입니다. 아래 `req.method`는 `\"GET\"`이 아니라 `string`으로 추론됩니다. `req`를 만든 뒤 `handleRequest`를 부르기 전에 누군가 `req.method`에 `\"GUESS\"` 같은 문자열을 넣을 수도 있으니, `\"GET\" | \"POST\"`만 받는 함수에 넘기면 에러가 납니다.\n해결 방법은 두 가지입니다.\n1. 타입 단언으로 추론을 바꿉니다. 객체를 만들 때 `\"GET\" as \"GET\"`으로 적으면 \"이 속성은 늘 `\"GET\"`이다\"라는 뜻이고, 함수에 넘길 때 `req.method as \"GET\"`으로 적으면 \"다른 이유로 지금은 `\"GET\"`인 걸 안다\"라는 뜻입니다.\n2. `as const`로 객체 전체를 리터럴 타입으로 바꿉니다. `as const`는 타입 시스템을 위한 `const` 같은 것이라, 모든 속성이 `string`이나 `number` 같은 넓은 타입 대신 리터럴 타입이 됩니다.",
        notes: [
          {
            title: "실제로 부딪힌 곳: as const 를 붙였는데 효과가 없었다",
            body: "키 목록을 `as const` 배열로 만들고 타입도 따로 적어 둔 적이 있습니다. `const METHODS: readonly Method[] = [\"GET\", \"POST\"] as const`처럼요. 그런데 변수에 타입을 직접 적으면 적은 타입이 우선하기 때문에(변수의 타입 어노테이션 절), `as const`로 좁힌 정보가 버려집니다. 그래서 배열에서 `\"PUT\"`이 빠져도 에러가 나지 않았어요.\n변수 타입을 적지 않고 배열을 기준으로 타입을 뽑으면(`(typeof METHODS)[number]`), 배열과 타입이 한 곳에서 관리되어 빠뜨리는 실수를 막을 수 있습니다. 여기서 쓰인 `typeof`와 `[number]`는 핸드북 타입 조작 장에서 다룹니다.",
            bottom: true,
          },
        ],
        code: "const obj = { counter: 0 };\nif (someCondition) {\n  obj.counter = 1; // 0 이었던 자리에 1 을 넣어도 에러가 아니다 — counter 는 number\n}\n\ndeclare function handleRequest(url: string, method: \"GET\" | \"POST\"): void;\n\nconst req = { url: \"https://example.com\", method: \"GET\" };\nhandleRequest(req.url, req.method);\n// 'string' 형식의 인수는 '\"GET\" | \"POST\"' 형식의 매개 변수에 할당될 수 없습니다.\n\n// 해결 1 — 타입 단언\nconst req1 = { url: \"https://example.com\", method: \"GET\" as \"GET\" };\nhandleRequest(req.url, req.method as \"GET\");\n\n// 해결 2 — as const\nconst req2 = { url: \"https://example.com\", method: \"GET\" } as const;\nhandleRequest(req2.url, req2.method);\n\n// 실제로 부딪힌 곳 — 타입을 적어서 as const 가 무시됐다\ntype Method = \"GET\" | \"POST\" | \"PUT\";\nconst METHODS_WRONG: readonly Method[] = [\"GET\", \"POST\"] as const; // PUT 이 빠져도 에러 없음\n\n// 배열을 기준으로 타입을 뽑는다\nconst METHODS = [\"GET\", \"POST\", \"PUT\"] as const;\ntype MethodFromList = (typeof METHODS)[number]; // \"GET\" | \"POST\" | \"PUT\"",
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
        body: "자바스크립트에는 값이 없거나 아직 정해지지 않았다는 걸 나타내는 원시 값이 두 개 있습니다. `null`과 `undefined`입니다. 타입스크립트에도 같은 이름의 타입이 두 개 있어요.\n이 두 타입이 어떻게 동작하는지는 `strictNullChecks` 옵션을 켰는지에 따라 달라집니다.",
      },
      {
        label: "strictNullChecks 꺼짐",
        body: "`strictNullChecks`를 끄면, `null`이나 `undefined`일 수 있는 값도 아무 확인 없이 그냥 쓸 수 있고, 어떤 타입의 속성에든 `null`과 `undefined`를 넣을 수 있습니다. null 검사가 없는 C#이나 Java와 비슷한 동작이에요.\n하지만 이 값들을 확인하지 않는 것은 버그의 큰 원인이 됩니다. 그래서 문서는 코드베이스에서 가능하다면 항상 `strictNullChecks`를 켜라고 권합니다.",
        code: "// strictNullChecks 가 꺼져 있으면 아래 코드에 에러가 없다\nlet name: string = null;\n\nfunction getLength(s: string | null) {\n  return s.length; // s 가 null 이면 실행할 때 터진다\n}",
      },
      {
        label: "strictNullChecks 켜짐",
        body: "`strictNullChecks`를 켜면, 값이 `null`이나 `undefined`일 수 있을 때는 그 값의 메서드나 속성을 쓰기 전에 먼저 확인해야 합니다.\n선택적 속성을 쓰기 전에 `undefined`인지 확인했던 것처럼, 좁히기로 `null`인지 확인하면 됩니다. `if (x === null)`로 걸러 내면 `else` 안에서는 `string`만 남습니다.",
        code: "function doSomething(x: string | null) {\n  console.log(x.toUpperCase());\n  // 'x'은(는) 'null'일 수 있습니다.\n\n  if (x === null) {\n    // 아무것도 하지 않는다\n  } else {\n    console.log(\"Hello, \" + x.toUpperCase()); // 여기서 x 는 string\n  }\n}",
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
        body: "열거형(enum)은 타입스크립트가 자바스크립트에 더한 기능으로, 이름 붙은 상수 중 하나일 수 있는 값을 표현합니다.\n대부분의 타입스크립트 기능과 달리, 열거형은 타입만 더하는 게 아닙니다. 자바스크립트 언어와 실행 코드 자체에 무언가를 더해요. 다른 타입들은 컴파일하면 사라지지만, 열거형은 컴파일한 뒤에도 실제 객체로 남습니다.\n그래서 문서는 이런 기능이 있다는 것만 알아 두고, 확실하지 않다면 쓰는 것을 미뤄 두라고 권합니다. 자세한 내용은 참고서의 열거형 페이지에서 다룹니다.",
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
    ],
  },

  {
    id: "ts-ev-rare",
    name: "덜 쓰는 원시 타입",
    tagline: "일상적인 타입 14절",
    intro:
      "자주 쓰지는 않지만 타입 시스템에 있는 나머지 원시 타입, bigint와 symbol을 정리합니다.",
    blocks: [
      {
        label: "아주 큰 정수를 위한 bigint",
        body: "ES2020부터 자바스크립트에는 아주 큰 정수를 위한 원시 값 `BigInt`가 있습니다. `number`는 안전하게 표현할 수 있는 정수에 한계가 있어서, 그보다 큰 정수를 정확하게 다룰 때 씁니다.\n`BigInt(100)`처럼 함수로 만들거나, 숫자 뒤에 `n`을 붙인 `100n` 리터럴로 만들 수 있고, 타입은 `bigint`입니다.",
        code: "// BigInt 함수로 만들기\nconst oneHundred: bigint = BigInt(100);\n\n// 리터럴 문법으로 만들기\nconst anotherHundred: bigint = 100n;",
      },
      {
        label: "절대 겹치지 않는 참조를 만드는 symbol",
        body: "`Symbol()` 함수로 전역에서 유일한 참조를 만드는 원시 값도 있습니다. 설명 글자가 같아도(`\"name\"`) 만들 때마다 서로 다른 값이 됩니다.\n그래서 두 심볼을 `===`로 비교하면, 타입스크립트는 절대 같을 수 없는 비교라고 알려 줍니다.",
        code: "const firstName = Symbol(\"name\");\nconst secondName = Symbol(\"name\");\n\nif (firstName === secondName) {\n  // 'typeof firstName'이(가) 'typeof secondName'과(와) 겹치지 않으므로 이 비교는 의도하지 않은 것 같습니다.\n  // 절대 일어날 수 없다\n}",
      },
    ],
    sources: [
      { label: "Everyday Types — 덜 쓰는 원시 타입", href: `${DOCS}/handbook/2/everyday-types.html#less-common-primitives` },
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
