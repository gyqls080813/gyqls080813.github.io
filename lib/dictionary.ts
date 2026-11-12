/**
 * 사전 — 문서를 읽다 걸린 낱말을 내 말로 다시 적어 두는 곳.
 *
 * 생각 갈래에 둔다. 뜻풀이 자체는 사실에 가깝지만, 어느 낱말에 걸렸고 그걸
 * 어떤 말로 바꿔 적을지는 내 결정이기 때문이다. 이론 시트의 낱말 풀이(terms)가
 * 그 문단에 매달린 각주라면, 이쪽은 그 각주들을 한 곳에 모아 둔 색인이다.
 *
 * 절은 낱말이 나온 문서다 — 읽는 순서대로 쌓이므로 그게 곧 목차다.
 * 절의 from은 그 문서의 그래프 노드다. 그래프는 여기서 문서 → 사전 간선을 만들고,
 * 시트 왼쪽 포트로 그 문서에 되돌아갈 수 있다.
 *
 * 낱말은 노드가 아니다. 낱말마다 노드를 세우면 그래프가 색인이 되어 버린다.
 * 그래프에는 「사전」 하나만 서고, 낱말은 전부 이 파일에 쌓인다.
 */
export type DictEntry = {
  /** 표제어 — 원어가 있으면 괄호로 붙인다 */
  term: string;
  body: string;
  code?: string;
};

export type DictSection = {
  /** 낱말이 나온 문서 */
  heading: string;
  /** 그 문서의 그래프 노드 id */
  from: string;
  entries: DictEntry[];
};

export type Dictionary = {
  /** 그래프의 노드 id와 동일 */
  id: string;
  name: string;
  tagline: string;
  intro: string;
  sections: DictSection[];
};

export const dictionary: Dictionary = {
  id: "dict",
  name: "사전",
  tagline: "문서를 읽다 걸린 낱말을 내 말로 다시 적는 곳",
  intro:
    "공식 문서는 첫 문장부터 낱말이 걸립니다. 사용자 인터페이스, 위에 구축된다, 선언적, 프로그래밍 모델. 아는 것 같은데 남에게 설명하라면 막히는 말들입니다. 그런 낱말을 만난 자리마다 하나씩 꺼내 내 말로 다시 적어 둡니다. 절은 낱말이 나온 문서이고, 그 문서에서 이 사전으로 선이 들어옵니다. 왼쪽 포트로 되돌아갈 수 있습니다.",
  sections: [
    {
      heading: "Vue 소개 — Vue란 무엇인가요?",
      from: "vg-start-intro",
      entries: [
        {
          term: "사용자 인터페이스 (user interface, UI)",
          body: "사람과 프로그램이 만나는 면. 프로그램 안쪽의 데이터와 계산은 사람이 직접 볼 수 없어서, 버튼·입력칸·목록처럼 보고 만지는 부분을 따로 둔다. inter(사이)와 face(면)를 합친 말 그대로 두 세계 사이의 면이다. 검색 가능한 셀렉트 컴포넌트로 치면 options 배열이 안쪽이고, 드롭다운이 그 배열을 사람에게 보여 주는 면이다.",
        },
        {
          term: "위에 구축된다 (built on top of)",
          body: "무엇을 대체하지 않고 그대로 쓰면서 한 층을 얹는다는 뜻. Vue의 템플릿은 HTML에 @click 같은 몇 가지를 더한 것이고, 스타일은 그냥 CSS, 로직은 그냥 JS다. 새 언어를 배우는 게 아니라 아는 언어에 단어 몇 개를 더하는 쪽이다. Flutter처럼 HTML·CSS 없이 자기 위젯으로 화면을 그리는 것은 '위에'가 아니다. 이 말이 첫 문장에 있어서 뒤의 '빌드 없이 정적 HTML 강화'가 성립한다.",
        },
        {
          term: "선언적 (declarative)",
          body: "'무엇이어야 하는가'를 적는 방식. 반대말은 명령적(imperative)으로, '무엇을 하라'를 순서대로 적는 방식이다. 명령적으로 쓰면 값이 바뀔 때마다 화면을 고치라고 내가 다시 시켜야 하고, 한 번 빠뜨리면 화면과 데이터가 어긋난다. 선언적으로 쓰면 값이 저기 들어간다고만 적고, 언제 어떻게 고칠지는 프레임워크가 맡는다.",
          code: "// 명령적 — 순서대로 시킨다\nconst el = document.querySelector('#count');\nel.textContent = 'Count is: ' + count;\nbutton.addEventListener('click', () => {\n  count++;\n  el.textContent = 'Count is: ' + count; // 바뀔 때마다 내가 다시 시켜야 한다\n});\n\n// 선언적 — 결과 모양만 적는다\n<button @click=\"count++\">Count is: {{ count }}</button>",
        },
        {
          term: "프로그래밍 모델 (programming model)",
          body: "코드를 어떤 단위와 규칙으로 짜느냐 하는 사고의 틀. v-model의 model과는 다른 말이다. '컴포넌트 기반 프로그래밍 모델'은 화면을 컴포넌트라는 단위로 쪼개고, 컴포넌트끼리는 props와 이벤트로만 이야기한다는 틀을 뜻한다. 그러니 이 구절은 'Vue 위에서는 선언적으로, 컴포넌트 단위로 짜게 된다'는 말이다.",
        },
        {
          term: "복잡도 (complexity)",
          body: "프레임워크가 필요해지는 이유. 버튼 하나짜리 화면은 명령적으로 짜도 된다. 상태가 열 개, 화면 조각이 백 개가 되면 '이게 바뀌면 저기도 고쳐야 한다'는 연결이 사람이 추적할 수 없을 만큼 늘어난다. 선언적으로 쓰면 그 연결을 프레임워크가 추적하고, 컴포넌트로 쪼개면 한 번에 볼 범위가 줄어든다. '복잡도와 상관없이'는 작든 크든 같은 방식으로 짤 수 있다는 뜻이고, 다음 절 '점진적 프레임워크'의 예고다.",
        },
        {
          term: "효율적으로 (efficiently)",
          body: "여기서 효율은 실행 속도가 아니라 개발자의 수고다. 명령적 코드에서 갱신 한 줄을 빠뜨리면 화면과 데이터가 어긋나는데, 선언적으로 쓰면 그 종류의 실수 자체가 없어진다. 그게 첫 문장이 말하는 효율이다.",
        },
      ],
    },
    {
      heading: "i18n — 문장을 코드에서 떼어 내는 열네 단계",
      from: "i18n",
      entries: [
        {
          term: "i18n과 l10n (internationalization, localization)",
          body: "i18n은 프로그램을 어느 언어에도 대응할 수 있게 만드는 일이고, 개발자가 한다. l10n은 특정 언어와 지역에 맞춰 실제 문장과 형식을 채우는 일이고, 번역가가 한다. 숫자는 첫 글자와 끝 글자 사이의 글자 수다. 두 사람이 서로의 일을 건드리지 않게 경계를 다듬어 온 것이 열네 단계의 줄거리다.",
        },
        {
          term: "로케일 (locale)",
          body: "언어와 지역을 합쳐 부르는 이름표. ko는 한국어, en-US는 미국 영어, zh-Hant는 번체 중국어다. 언어만으로는 부족한 경우가 있어서 지역이 붙는다. 같은 영어라도 미국은 11/11/2026, 영국은 11/11/2026이지만 날짜 순서가 다르다. 사전을 고르는 열쇠이면서 날짜·숫자 형식을 고르는 열쇠이기도 하다.",
        },
        {
          term: "BCP 47",
          body: "로케일 이름을 적는 웹 표준. 언어-지역을 하이픈으로 잇는다(ko-KR, pt-BR). 옛 유닉스(POSIX) 방식은 밑줄을 썼다(ko_KR, pt_BR). Vue I18n은 하이픈 단위로 잘라 가며 폴백하기 때문에 밑줄을 쓰면 잘리지 않아 pt_BR이 pt로 내려가지 못한다.",
        },
        {
          term: "열쇠와 값 (key, value)",
          body: "사전의 왼쪽과 오른쪽. 코드가 들고 오는 것이 열쇠이고, 사용자가 보는 것이 값이다. 열쇠로 무엇을 쓰느냐가 1~4단계의 역사다. 번호(2단계), 영어 문장(3단계), cart.checkout 같은 이름표(4단계). 열쇠가 문장과 너무 멀면 읽을 수 없고, 너무 가까우면 문장을 고칠 때 열쇠가 깨진다.",
        },
        {
          term: "gettext, msgid, msgstr",
          body: "1995년 GNU가 표준화한 번역 도구 모음. 코드에 _('Checkout')처럼 영어 원문을 그대로 쓰고, 실행 중에 현재 언어 사전에서 그 문장을 찾는다. 사전(.po 파일)의 한 항목은 msgid(열쇠, 영어 원문)와 msgstr(값, 번역)의 쌍이다. msgstr가 비어 있으면 msgid가 그대로 보여서, 번역이 빠져도 영어는 보인다.",
        },
        {
          term: "폴백 (fallback)",
          body: "고른 사전에 열쇠가 없을 때 대신 볼 사전을 정해 둔 것. '없으면 영어를 보여라'가 가장 흔한 폴백이다. Vue I18n은 두 겹으로 내려간다. zh-Hant-TW → zh-Hant → zh처럼 하이픈을 잘라 가며 자동으로 내려가고, 그래도 없으면 fallbackLocale에 적은 순서로 내려간다. 끝까지 없으면 열쇠 글자가 그대로 화면에 나온다.",
        },
        {
          term: "보간 (interpolation)",
          body: "문장 속 빈칸에 값을 끼워 넣는 일. '{name}님의 장바구니'에서 {name}이 빈칸이고, 코드는 t('cart.greeting', { name })처럼 값만 넘긴다. 빈칸이 문장의 어디에 오는지는 언어마다 번역가가 정한다. 코드가 문장을 + 로 이어 붙이면 어순이 다른 언어에서 반드시 틀리기 때문에 생긴 장치다.",
        },
        {
          term: "복수형 (pluralization)",
          body: "개수에 따라 문장이 바뀌는 규칙. 영어는 item과 items, 러시아어는 1·2~4·5 이상으로 갈린다. 한국어는 갈리지 않는다. Vue I18n은 문장 안에 세로줄로 후보를 나열하고 숫자를 넘겨 고르게 한다. 어느 숫자가 어느 범주(one, few, many, other)에 드는지는 언어마다 Unicode CLDR이 정해 두었다.",
        },
        {
          term: "Intl (ECMA-402)",
          body: "브라우저 안에 들어 있는 국제화 표준 라이브러리. 날짜(Intl.DateTimeFormat), 숫자와 통화(Intl.NumberFormat), 복수형 범주(Intl.PluralRules) 등을 로케일에 맞춰 만들어 준다. 규칙 데이터는 Unicode CLDR에서 온다. Vue I18n의 $d와 $n은 이것을 형식 이름으로 부르는 얇은 껍질이다. 로케일을 비우고 부르면(toLocaleString()) 코드가 돌아가는 기기의 로케일을 써서, 서버와 브라우저가 다른 글자를 낼 수 있다.",
        },
        {
          term: "로케일 협상 (locale negotiation)",
          body: "사용자의 언어를 알려 주는 여러 신호 중 무엇을 믿을지 순서를 정하는 일. 주소의 /en, 전에 고른 값을 담은 쿠키, 브라우저가 보내는 Accept-Language 헤더, 기본값. 보통 직접 적은 것(주소)이 자동으로 온 것(브라우저 설정)을 이긴다. 순서는 기술이 아니라 제품의 결정이다.",
        },
        {
          term: "Accept-Language",
          body: "브라우저가 모든 요청에 붙여 보내는 HTTP 헤더. 사용자가 OS와 브라우저에 설정한 언어를 선호 순서대로 적는다(ja-JP,ja;q=0.9,en;q=0.8). 사용자가 직접 고른 것이 아니라 기기 설정이라서, 영어 OS를 쓰는 한국 사람에게는 틀린 신호가 된다.",
        },
        {
          term: "반응형 전환 (reactive locale)",
          body: "locale이 보통 변수가 아니라 Vue의 ref라는 뜻. t 함수는 안에서 locale.value를 읽기 때문에, 템플릿에서 t를 쓴 컴포넌트는 그 값을 지켜본다. 드롭다운이 locale.value = 'en'을 실행하면 Vue가 그 컴포넌트들을 다시 그린다. 단, 문자열에 한 번 담아 둔 값(const title = t('…'))은 따라오지 않는다.",
        },
        {
          term: "전역 스코프와 로컬 스코프 (global / local scope)",
          body: "어느 사전을 보는가의 범위. createI18n이 만든 하나의 사전을 모두가 보면 전역 스코프다. 공용 컴포넌트가 자기 문장만 따로 들고 다니면 로컬 스코프다. 로컬의 locale은 기본적으로 전역을 따라간다. 대신 같은 낱말('닫기')이 두 사전에 따로 있게 된다.",
        },
        {
          term: "지연 로딩과 청크 (lazy loading, chunk)",
          body: "처음에는 쓰는 언어의 사전만 받고, 바꿀 때 그 언어의 사전을 따로 받아 오는 방식. 번들러는 import()로 불러오는 파일을 별도 조각(청크)으로 떼어 두고 그 줄이 실행될 때 받는다. 1단계의 dist/ko, dist/en과 모양이 비슷하지만, 코드가 아니라 사전만 갈라지고 사이트는 하나다.",
        },
        {
          term: "메시지 컴파일러 (message compiler)",
          body: "문장 속 {name}, |, @: 같은 문법을 읽어 실행할 수 있는 구조로 바꾸는 부품. 기본값은 실행 중에 이 일을 하고, 그 부품도 번들에 들어 있다. 빌드 때 미리 바꿔 두고(사전 컴파일) 부품을 번들에서 빼는 것이 9단계다. 그 대가로, 실행 중에 새로 들어온 문자열(API 응답)은 문법을 풀 수 없다.",
        },
        {
          term: "린트와 CI (lint, continuous integration)",
          body: "린트는 코드를 실행하지 않고 읽어서 규칙 위반을 찾는 도구다. i18n에서는 사전에 없는 열쇠를 부르는지, 번역을 거치지 않은 글자가 템플릿에 있는지를 본다. CI는 PR마다 서버에서 자동으로 도는 검사 묶음이다. 사람이 끄거나 잊을 수 있는 린트를 머지 전에 강제로 한 번 더 돌리는 자리다.",
        },
        {
          term: "TMS (translation management system)",
          body: "번역할 문장을 모아 두고 번역가에게 작업 화면을 주는 서비스. Crowdin, Lokalise, Phrase, Weblate 등. 전에 번역한 문장을 다시 쓰는 번역 메모리와, 브랜드 용어를 고정하는 용어집이 들어 있다. 작은 팀은 Google Sheets로 같은 일을 한다. 어느 쪽이든 원칙은 같다. 원본은 그 표에 있고, 코드 안의 사전 파일은 표에서 생성한 결과물이다.",
        },
        {
          term: "SSR과 하이드레이션 (server-side rendering, hydration)",
          body: "SSR은 서버가 먼저 HTML을 그려 보내는 방식이다. 하이드레이션은 브라우저가 그 HTML 위에 Vue를 붙여 살아 움직이게 만드는 과정이다. 서버가 그린 결과와 브라우저가 다시 그린 결과가 다르면 불일치 경고가 나고 화면이 깜빡인다. 서버와 브라우저가 로케일을 다르게 정했거나, 둘의 Intl 데이터가 다르면 그렇게 된다.",
        },
        {
          term: "요청 간 상태 오염 (cross-request state pollution)",
          body: "서버 프로세스 하나가 여러 사람의 요청을 동시에 처리하는데, 모듈 맨 위에 하나만 만들어 둔 객체(싱글턴)를 요청마다 바꿔 쓰면 한 요청의 값이 다른 요청에 새어 나가는 사고. i18n 인스턴스가 가장 흔한 예다. 한국어 요청이 데이터를 기다리는 사이 영어 요청이 locale을 바꾸면 한국어 사용자가 영어 HTML을 받는다. 요청마다 인스턴스를 새로 만들어 피한다.",
        },
        {
          term: "Vary 헤더",
          body: "같은 주소라도 어떤 요청 헤더가 다르면 다른 응답으로 취급해 따로 저장하라고 캐시에 알리는 응답 헤더. 주소에 언어가 없고 쿠키로 언어를 정하는 사이트는 Vary: Cookie를 붙여야 한다. 안 붙이면 CDN이 첫 사람의 한국어 HTML을 저장해 다음 영어 사용자에게 돌려준다.",
        },
        {
          term: "MessageFormat 2 (MF2)",
          body: "Unicode가 만든 메시지 문법 표준. 라이브러리마다 다른 문법({name}, {{name}}, %s)을 하나로 통일하려는 것이다. 변수는 {$name}, 복수형은 .match로 고르고, 날짜·숫자 형식도 문장 안에서 지정한다. 표준은 안정판이 됐지만 브라우저 내장(Intl.MessageFormat)은 TC39 1단계이고, Vue I18n은 아직 읽지 못한다.",
        },
        {
          term: "시간대 (time zone)",
          body: "지구를 세로로 나눈 시간 구역. Asia/Seoul처럼 도시 이름으로 적는다. 언어와 별개의 축이라 locale이 ko인 사용자가 뉴욕에 있을 수 있다. Intl.DateTimeFormat은 timeZone 옵션을 locale과 따로 받고, 넘기지 않으면 코드가 돌아가는 기계의 시간대로 찍는다.",
        },
        {
          term: "Intl.Collator와 Intl.Segmenter",
          body: "Collator는 그 언어의 사전 순서로 글자를 비교하는 Intl 기능이다. 배열의 sort()는 코드 번호 순서라 대문자가 소문자보다 앞에 온다. Segmenter는 문자열을 사람이 보는 글자(그래핌)나 낱말 단위로 나눈다. length는 UTF-16 단위 수라 가족 이모지 하나가 8이 된다.",
        },
        {
          term: "한중일 통합 한자 (Han unification)",
          body: "유니코드가 한국·중국·일본의 한자를 하나의 코드로 합쳐 둔 것. 같은 코드라도 나라마다 획 모양이 다르고, 글꼴은 html의 lang 속성을 보고 어느 모양으로 그릴지 정한다. lang이 틀리면 글자는 맞는데 모양이 낯설어진다.",
        },
        {
          term: "RTL과 CSS 논리 속성 (right-to-left, logical properties)",
          body: "RTL은 아랍어·히브리어처럼 오른쪽에서 왼쪽으로 쓰는 글자 방향이다. html의 dir=\"rtl\"이 글자 방향과 기본 정렬을 뒤집는다. CSS 논리 속성은 left·right 대신 start·end로 적는 속성(margin-inline-start 등)이라 dir에 따라 함께 뒤집힌다. margin-left처럼 방향을 박은 속성은 따라오지 않는다.",
        },
        {
          term: "유니코드 정규화 (NFC/NFD)",
          body: "같은 글자를 적는 두 방식. '한'을 완성형 한 코드(NFC)로 적을 수도, ㅎ·ㅏ·ㄴ 세 코드(NFD)로 적을 수도 있다. 보기에는 같지만 === 비교가 false다. macOS가 파일 이름을 NFD로 저장하는 일이 많아 한글 파일 이름 검색이 안 맞는 사고가 난다. normalize('NFC')로 한쪽에 맞춘다.",
        },
        {
          term: "글자 길이 팽창 (text expansion)",
          body: "같은 뜻의 문장이 언어마다 길이가 다른 것. 영어 기준으로 독일어·러시아어는 30% 넘게 길어진다. 영어에 꼭 맞춘 버튼이 다른 언어에서 넘치는 원인이다. 가짜 로케일로 미리 본다.",
        },
        {
          term: "가짜 로케일 (pseudo-localization)",
          body: "테스트용으로 만든 가짜 언어. 영어 문장의 모음에 부호를 붙이고 길이를 늘려 '[Ópén cárt ~~~~]'처럼 만든다. 번역을 거친 글자와 안 거친 날글자가 한눈에 갈리고, 긴 언어에서 레이아웃이 넘치는지도 미리 보인다. 개발 환경에만 둔다.",
        },
        {
          term: "missing 핸들러",
          body: "vue-i18n이 사전에서 열쇠를 못 찾을 때 대신 부르는 함수. 어느 언어에서 어느 열쇠가 없었는지 받는다. 폴백 단계마다 불리므로 마지막 폴백 언어에서 불린 것이 진짜 빠진 열쇠다. 린트와 타입이 못 보는 것을 실행 중에 잡아 에러 추적 서비스로 보내는 자리다.",
        },
        {
          term: "열쇠 유니온 타입 (message key union)",
          body: "사전의 모든 열쇠 경로를 'cart.open' | 'cart.checkout' | …처럼 '이 중 하나'로 묶은 TypeScript 타입. 이 타입만 받는 좁은 t 래퍼를 두면 열쇠 오타와 변수로 넘기는 열쇠까지 컴파일에서 잡힌다. 사전 객체에서 템플릿 리터럴 타입으로 펼치거나, 생성 스크립트가 .d.ts로 내보낸다.",
        },
        {
          term: "트리 셰이킹 (tree-shaking)",
          body: "번들러가 아무 코드도 부르지 않는 함수와 모듈을 결과물에서 빼는 일. 문장을 함수로 컴파일하면(Paraglide JS) 안 쓰는 문장도 빠진다. 사전이 객체 하나면 어느 열쇠를 쓰는지 알 수 없어 통째로 남는다.",
        },
        {
          term: "OTA (over-the-air)",
          body: "다시 배포하지 않고 서버나 CDN에서 내려받아 내용을 바꾸는 방식. 번역에서는 사전을 실행 중에 받아 오는 것을 뜻한다. 번역가의 수정이 배포 없이 반영되지만, 실행 중 의존이 하나 생기고 코드와 사전의 버전이 어긋날 수 있다.",
        },
        {
          term: "in-context 편집",
          body: "번역 도구의 표가 아니라 실제 서비스 화면에서 글자를 클릭해 바로 고치는 방식. 번역가가 문장이 어디에 어떻게 보이는지 보며 번역한다. Tolgee가 Alt+클릭으로 제공한다.",
        },
        {
          term: "리터럴 (literal)",
          body: "코드에 글자 그대로 적힌 값. t('cart.open')의 'cart.open'은 리터럴이고 t(key)의 key는 변수다. 코드를 읽기만 하는 도구(gettext의 추출기, 린트, 타입)는 리터럴만 본다. 3단계와 10단계의 사각지대가 같은 이유다.",
        },
        {
          term: "죽은 열쇠 (dead key)",
          body: "사전에는 있는데 코드가 아무 데서도 부르지 않는 열쇠. 화면에는 영향이 없어 눈에 띄지 않지만 번역가는 그 열쇠도 다섯 언어로 번역한다. 비용만 드는 문장이다. no-unused-keys 린트 규칙이 찾아 준다.",
        },
        {
          term: "빈 값 (empty string)",
          body: "열쇠는 있는데 값이 \"\"인 것. 라이브러리는 '있음'으로 보아 폴백으로 내려가지 않고 빈 글자를 돌려준다. 열쇠가 찍히는 것보다 늦게 들통난다. 아무것도 안 보이기 때문이다. 번역 표의 빈 칸을 그대로 JSON으로 만들면 생긴다.",
        },
        {
          term: "장부가 둘 (two sources of truth)",
          body: "같은 사실을 두 곳에 따로 적어 두는 것. 4단계에서는 코드의 열쇠와 사전의 열쇠, 11단계에서는 번역 표와 JSON 파일이 그 둘이다. 어긋남을 막는 길은 하나를 다른 하나에서 만들어 내거나(생성), 기계가 자주 맞춰 보는 것(검사)이다.",
        },
        {
          term: "복수 규칙 (pluralization rules)",
          body: "숫자를 받아 몇째 칸의 문장을 쓸지 정하는 규칙. 영어는 1과 나머지, 러시아어는 1·21·31 / 2~4 / 5~20이 다르다. Vue I18n의 기본 규칙은 영어식이라 pluralizationRules 옵션으로 언어별 함수를 넣어야 한다. MF2는 CLDR의 규칙을 가져와 적지 않아도 된다.",
        },
        {
          term: "조사 선택 (을/를, 이/가)",
          body: "한국어 조사가 앞말의 받침 유무로 바뀌는 문제. '{name}을 담았습니다'는 '사과을'이 된다. 메시지 문법에는 이 분기가 없다. 문장을 바꿔 조사를 피하거나, 코드가 마지막 글자의 받침을 보고 고른다.",
        },
        {
          term: "ISO 8601 날짜 문자열과 UTC",
          body: "2026-11-11 꼴의 날짜 표기 표준. JavaScript는 날짜만 있으면 UTC 자정으로, 시각이 붙으면 현지 시각으로 읽는다. 그래서 '2026-11-11'이 로스앤젤레스에서는 11월 10일 저녁이 된다. 날짜만 다루는 값은 Date로 바꾸지 않고 글자로 들고 다니는 것이 안전하다.",
        },
        {
          term: "언어 범위 매칭 (BCP 47 lookup)",
          body: "브라우저가 보낸 en-GB와 사이트가 가진 en을 짝지어 주는 규칙. 지역을 떼며 찾고(en-GB → en), 중국어는 지역을 문자로 바꿔 찾는다(zh-TW → zh-Hant). 글자 그대로 비교하면 영국 사용자가 기본 언어를 보고, 하이픈 앞만 비교하면 대만 사용자가 간체를 본다.",
        },
        {
          term: "의존성 추적 (dependency tracking)",
          body: "Vue가 '이 계산은 저 값을 읽었다'를 기록해 두고, 저 값이 바뀌면 이 계산을 다시 하는 장치. 템플릿·computed·watch 안에서 읽은 것만 기록된다. 그 밖에서 한 번 읽어 변수에 담은 값은 바뀌어도 다시 계산되지 않는다. 8단계의 버그는 전부 기록되지 않은 자리에서 난다.",
        },
        {
          term: "콘텐츠 해시 파일 이름 (content hash)",
          body: "빌드가 파일 내용으로 만든 짧은 코드를 파일 이름에 붙이는 것. ja-3f2a.js의 3f2a다. 내용이 바뀌면 이름도 바뀌어 캐시가 옛것을 돌려줄 수 없다. 대신 배포 전에 열어 둔 탭이 새 파일 이름을 몰라 'Failed to fetch dynamically imported module'이 난다.",
        },
        {
          term: "eslint-disable 주석",
          body: "린트 규칙을 그 줄이나 파일에서만 끄는 주석. 급할 때 쓰는 장치지만 끈 줄은 다시 켜지지 않는다. 저장소에서 그 주석을 세어 보면 그물의 구멍 수가 나온다. 끄는 대신 규칙에 예외 패턴을 좁게 적는 것이 낫다.",
        },
        {
          term: "자동 변환 (auto-format)",
          body: "스프레드시트가 셀의 글자를 날짜·숫자·수식으로 알아서 바꾸는 기능. 1/2는 1월 2일, 00123은 123, =로 시작하면 수식이 된다. 번역 표에는 해롭다. 열을 텍스트 서식으로 두거나, 생성 스크립트가 변환된 값을 거부해야 한다.",
        },
        {
          term: "요청 스코프 (request scope)",
          body: "서버에서 '이 요청이 끝나면 버려지는 자리'. 그 요청의 사용자에게만 속하는 값(로케일, i18n 인스턴스, API 헤더)을 둔다. Nuxt에서는 useNuxtApp()으로 꺼내는 것들이다. 모듈 맨 위의 const는 반대로 프로세스 스코프라 모든 요청이 함께 본다.",
        },
        {
          term: "검토 상태 (review state)",
          body: "번역 한 칸이 어느 단계인지 적어 두는 표시. 기계가 채움, 사람이 봄, 검토자가 확인함. gettext는 fuzzy 한 비트로, TMS는 Translated·Reviewed 상태로 한다. 기계가 채우기 시작하면 이 상태 없이는 어느 문장이 사람의 눈을 거쳤는지 알 수 없다.",
        },
      ],
    },
    {
      heading: "브라우저 렌더링 — 주소가 픽셀이 되기까지",
      from: "render",
      entries: [
        {
          term: "렌더링 (rendering)",
          body: "브라우저가 받은 글자(HTML·CSS·JS)를 화면의 픽셀로 바꾸는 일 전체. 좁게는 마지막의 색칠(페인트)만을 가리키기도 한다. 열두 장은 넓은 뜻으로 쓴다. 네비게이션에서 프레임까지다.",
        },
        {
          term: "브라우저 프로세스와 렌더러 프로세스",
          body: "브라우저 프로세스는 주소창·탭·네트워크·저장소를 맡고, 렌더러 프로세스는 탭 안에 보이는 것을 맡는다. 사이트마다 렌더러가 따로라 한 탭이 죽어도 다른 탭은 멀쩡하다. 둘은 메모리를 공유하지 않아 IPC 메시지로만 말한다.",
        },
        {
          term: "메인 스레드 (main thread)",
          body: "렌더러 프로세스 안에서 자바스크립트 실행, HTML 파싱, 스타일 계산, 레이아웃, 페인트 레코드 만들기를 전부 혼자 하는 스레드. DOM을 여러 스레드가 동시에 만지면 깨지기 때문이다. 긴 자바스크립트 하나가 탭 전체를 멈추는 이유가 이 한 줄이다.",
        },
        {
          term: "사이트 격리 (site isolation)",
          body: "다른 사이트의 내용은 다른 렌더러 프로세스에 두는 Chrome의 정책. 교차 사이트 iframe도 따로 프로세스를 받는다. 보안을 위해 메모리를 가르는 대신, 프레임 사이의 모든 통신이 비동기 메시지(postMessage)가 된다.",
        },
        {
          term: "브라우징 컨텍스트 (browsing context)",
          body: "문서가 사용자에게 보이는 자리 하나. 탭 하나, iframe 하나가 각각이다. 사양은 이것을 WindowProxy와 1:1로 짝지어 둔다. 자리가 생기는 순간 realm·Window·about:blank 문서가 함께 만들어진다.",
        },
        {
          term: "realm (렘)",
          body: "자바스크립트 코드가 사는 세계 하나. Object·Array·Promise 같은 내장 객체 한 벌과 전역 객체가 들어 있다. 탭마다, iframe마다 따로다. 그래서 iframe에서 받은 배열을 부모의 Array로 instanceof 하면 false다. Array.isArray는 realm을 넘어 본다.",
        },
        {
          term: "WindowProxy",
          body: "코드가 window라고 부를 때 실제로 받는 손잡이 객체. 안에 진짜 Window를 담고 모든 접근을 넘긴다. 네비게이션으로 Window가 바뀌어도 WindowProxy는 같은 객체라, iframe.contentWindow 참조는 그대로인데 거기 붙여 둔 속성은 사라진다.",
        },
        {
          term: "전역 객체와 전역 렉시컬 스코프",
          body: "전역에는 층이 둘 있다. 전역 객체(Window)에는 var·function 선언과 웹 API가 속성으로 붙는다. 전역 렉시컬 스코프에는 let·const·class가 들어간다. 뒤의 것은 어디서나 이름으로 부를 수 있지만 window.이름으로는 undefined다.",
        },
        {
          term: "이름 접근 (named access on Window)",
          body: "id나 name이 있는 요소를 window.그이름으로 꺼내는 옛 규칙. window의 자체 속성이 아니라 못 찾을 때 문서를 뒤지는 마지막 규칙이다. 같은 이름의 전역 변수가 있으면 변수가 이긴다. 코드에서는 쓰지 않는 것이 보통이다.",
        },
        {
          term: "readyState와 네 시점",
          body: "문서가 얼마나 채워졌는지 알려 주는 값. loading(채우는 중, body조차 없을 수 있다) → interactive(글자를 다 읽었다, defer 스크립트 실행) → DOMContentLoaded 이벤트 → complete(이미지·iframe까지 다 왔다, load 이벤트). 코드는 자기가 어느 시점에 도는지 알아야 한다.",
        },
        {
          term: "호환 모드 (quirks mode / standards mode)",
          body: "첫 줄의 doctype을 보고 파서가 정하는 렌더링 규칙. <!doctype html>이 있으면 표준 모드(compatMode 'CSS1Compat'), 없으면 쿼크 모드('BackCompat')로 옛 브라우저의 버그를 흉내 낸다. 표 안 글꼴 상속, 박스 크기, 이미지 밑 틈이 달라진다.",
        },
        {
          term: "토크나이저와 트리 구성 (tokenizer, tree construction)",
          body: "HTML 파서의 두 단계. 토크나이저는 글자를 읽어 시작 태그·끝 태그·글자 같은 토큰을 내는 상태 기계다. 트리 구성기는 토큰을 받아 삽입 모드와 열린 요소 스택을 보고 DOM 노드를 끼운다. 오류를 내지 않고 틀린 입력도 규칙대로 고쳐 트리를 만든다.",
        },
        {
          term: "포스터 페어런팅 (foster parenting)",
          body: "표 안에 있을 수 없는 글자나 요소를 표 바로 앞에 위탁해 끼우는 파서 규칙. 템플릿의 {{ }} 사이 공백이 표 위로 튀어나오는 것이 이것이다. 같은 계열의 규칙으로 <p> 안의 <div>는 p를 닫고 형제가 되며, <table><tr>에는 tbody가 끼어든다.",
        },
        {
          term: "프리로드 스캐너 (preload scanner)",
          body: "메인 파서가 스크립트에 막혀 멈춘 동안 토큰만 훑어 img·link·script의 주소를 찾아 미리 받아 두는 가벼운 두 번째 스캐너. DOM은 만들지 않는다. 그래서 '받는 것'은 일찍, '도는 것'은 파서가 그 태그에 닿은 뒤다. JS가 만든 script나 CSS @import는 못 본다.",
        },
        {
          term: "파싱을 막는 스크립트 (parser-blocking script)",
          body: "src가 있고 async·defer가 없는 고전 스크립트와 인라인 스크립트. 파서는 그것이 받아져 실행될 때까지 다음 토큰을 처리하지 않는다. 스크립트가 document.write나 DOM 읽기를 할 수 있어 '그 시점까지의 문서'를 멈춰 세운다.",
        },
        {
          term: "스크립트를 막는 스타일시트 (script-blocking style sheet)",
          body: "파서가 만든 <link rel=stylesheet>나 <style>이 아직 로딩 중이면 뒤의 스크립트 실행을 막는다. 스크립트가 getComputedStyle로 스타일을 읽을 수 있어서다. 그래서 CSS가 늦으면 스크립트가 늦고, 스크립트가 늦으면 파서가 늦는다. 실제로 696ms가 묶였다.",
        },
        {
          term: "async / defer / module",
          body: "셋 다 파서를 막지 않고 받는다. defer는 파싱이 끝난 뒤 적힌 순서대로, DOMContentLoaded 전에 돈다. module은 늘 defer다. async는 도착하는 즉시 돈다. 순서는 도착 순서다. 서로 의존하는 파일은 defer, 독립적인 것(분석·광고)은 async.",
        },
        {
          term: "렌더링 차단 (render-blocking)",
          body: "어떤 자원이 올 때까지 첫 화면을 그리지 않는 것. 파서가 만든 스타일시트가 기본으로 이것이다. 파서를 막는 것과 다르다. DOM은 만들어지는데 화면에만 안 올린다. 스타일 없는 글자가 먼저 보이는 깜빡임(FOUC)을 피하려는 설계다.",
        },
        {
          term: "CSSOM (CSS Object Model)",
          body: "CSS를 파싱해 만든 객체 트리. document.styleSheets 아래 시트, 규칙, 선언이 있다. DOM과는 별개의 트리라 둘을 합치는 단계(스타일 계산)가 따로 필요하다. 자바스크립트로 규칙을 넣고 빼는 것도 이 객체를 통한다.",
        },
        {
          term: "캐스케이드와 특이도 (cascade, specificity)",
          body: "한 속성에 여러 선언이 맞을 때 하나를 고르는 네 단계. 출처·중요도(!important) → 레이어(@layer) → 특이도(id, 클래스, 요소 수) → 적힌 순서. 특이도만 알고 싸우면 !important가 쌓인다. 위 단계인 @layer로 올라가면 끝난다.",
        },
        {
          term: "계산된 스타일 (computed style)",
          body: "캐스케이드와 상속을 거쳐 요소의 모든 속성에 값 하나씩이 정해진 결과. 적지 않은 속성도 값이 있다. getComputedStyle(el)이 돌려준다. el.style은 인라인 style 속성에 적힌 것만 보여 주어 다르다.",
        },
        {
          term: "레이아웃 트리 (layout tree)",
          body: "DOM 노드에 계산된 스타일을 입혀 만든 '그릴 상자'의 트리. DOM과 1:1이 아니다. display: none은 빠지고, ::before는 들어오고, 날 글자는 익명 상자로 싸인다. 옛 이름은 렌더 트리. 이 트리의 상자마다 자리와 크기를 정하는 것이 레이아웃이다.",
        },
        {
          term: "폭은 내려오고 높이는 올라온다",
          body: "블록의 폭은 포함 블록(부모)에서 내려오고, 높이는 안의 내용(줄 수)에서 올라온다. 글자 폭은 폰트에서 옆으로 온다. 그래서 상자들은 의존 그래프로 묶여 있고, 한 값이 바뀌면 연결된 것이 다시 풀린다. height: 100%가 부모 auto에서 안 먹는 이유다.",
        },
        {
          term: "강제 동기 레이아웃과 레이아웃 스래싱",
          body: "브라우저는 바뀐 스타일을 모아 다음 프레임에 한 번 레이아웃한다. 그런데 JS가 offsetWidth 같은 치수를 읽으면 그 자리에서 즉시 계산해야 한다. 쓰기와 읽기를 번갈아 반복해 매번 계산하게 하는 것이 스래싱. 실제로 같은 일이 75배 차이였다.",
        },
        {
          term: "레이아웃 시프트 (layout shift, CLS)",
          body: "늦게 도착한 값(이미지 크기, 웹폰트, 배너) 때문에 이미 그려진 것이 밀려 움직이는 것. 높이는 아래에서 올라오는데 올라올 값이 나중에 왔다. 처방은 자리를 미리 잡는 것이다. width·height 속성, aspect-ratio, 폰트 size-adjust.",
        },
        {
          term: "글리프 (glyph)와 셰이핑 (shaping)",
          body: "글리프는 폰트 파일 안의 글자 모양 하나이고 폭(전진 폭)이 붙어 있다. 문자와 1:1이 아니다. 셰이핑은 문자열을 폰트의 규칙(합자·결합·문맥형·커닝)대로 글리프 열과 위치로 바꾸는 일이고 HarfBuzz가 한다. 한글 자모를 음절 글리프로 모으는 것도 여기다.",
        },
        {
          term: "폰트 매칭과 폴백 (font matching, fallback)",
          body: "글자마다 font-family 목록을 순서대로 훑어 그 글자의 글리프를 가진 첫 폰트를 고르는 일. 없으면 시스템 폰트로 폴백한다. 그래서 한 줄에 폰트가 둘 섞일 수 있고, 등폭 폰트의 한글은 폴백 폰트의 전각 폭(실제로 영문의 1.44배)이 된다.",
        },
        {
          term: "word-break: keep-all과 overflow-wrap: anywhere",
          body: "한국어는 기본(normal)으로 글자 사이 어디서나 끊는다. keep-all은 공백에서만 끊어 어절을 지키지만 긴 어절은 상자를 넘친다. overflow-wrap: anywhere는 다른 데서 못 끊을 때만 글자 사이를 허용한다. 둘을 함께 쓰면 어절로 끊되 넘치지 않는다.",
        },
        {
          term: "font-display와 FOIT / FOUT",
          body: "웹폰트가 오기 전의 세 시기(차단·교체·실패)의 길이를 정하는 선언. block은 3초까지 빈 글자(FOIT), swap은 바로 폴백으로 보이다 교체(FOUT), fallback은 3초 안에만 교체, optional은 첫 방문엔 폴백. 교체 순간 폭이 바뀌면 레이아웃 시프트가 난다.",
        },
        {
          term: "페인트 레코드와 레이어 (paint record, compositing layer)",
          body: "페인트 레코드는 '배경 먼저, 글자, 테두리'처럼 그릴 명령을 순서대로 적은 목록이다. 메인 스레드는 여기까지만 만든다. 레이어는 따로 래스터해 두고 합칠 때만 자리를 바꾸는 그림 조각이다. transform·will-change·video가 레이어가 되고, 레이어마다 GPU 메모리를 먹는다.",
        },
        {
          term: "래스터와 합성 (rasterization, compositing)",
          body: "래스터는 그릴 명령을 픽셀로 바꾸는 일로, 레이어를 타일로 잘라 래스터 스레드들이 GPU 메모리에 비트맵을 만든다. 합성은 컴포지터 스레드가 타일들을 겹쳐 한 프레임을 만드는 일이다. 메인 스레드와 따로 돌아 스크롤·transform·opacity는 JS가 바빠도 매끈하다.",
        },
        {
          term: "태스크와 마이크로태스크 (task, microtask)",
          body: "태스크는 이벤트 루프가 하나씩 꺼내 돌리는 일(클릭 핸들러, setTimeout, 파서 한 조각)이다. 마이크로태스크는 태스크 직후 다음 태스크나 렌더링 전에 전부 비우는 작은 일(Promise.then, queueMicrotask, MutationObserver)이다. Vue가 DOM 갱신을 모아 두는 자리가 마이크로태스크다.",
        },
        {
          term: "렌더링 기회와 requestAnimationFrame",
          body: "렌더링 기회는 브라우저가 '지금 한 프레임 그릴 때다'라고 보는 순간으로, 주사율(60Hz면 약 16.7ms)을 따르고 보이지 않는 탭에는 거의 없다. 그때 rAF 콜백 → 스타일 → 레이아웃 → 페인트가 순서대로 돈다. rAF가 레이아웃 앞이라 거기서 쓴 스타일은 그 프레임에 그려진다.",
        },
        {
          term: "긴 태스크 (long task)",
          body: "메인 스레드를 50ms 넘게 붙잡는 일 하나. 그 프레임은 날아가고 입력도 밀린다. 사람이 '즉시'로 느끼는 100ms 안에 입력 처리까지 끝내려는 기준에서 나온 숫자다. 처방은 쪼개거나 워커로 보내는 것.",
        },
        {
          term: "교차 출처 속성 (cross-origin properties)",
          body: "출처가 다른 프레임의 Window에서 접근이 허용되는 열몇 개. window, self, location, close, closed, focus, blur, frames, length, top, opener, parent, postMessage와 인덱스, Location의 href 쓰기와 replace. 나머지는 전부 SecurityError다.",
        },
        {
          term: "postMessage",
          body: "출처가 다른 창·프레임 사이의 유일한 공식 통로. 받을 출처를 둘째 인자로 적고, 받는 쪽은 message 이벤트의 origin을 확인한다. 비동기이고 구조화 복제로 복사하므로 함수나 DOM 노드는 못 보낸다. 사이트 격리 아래서는 프로세스 사이 IPC다.",
        },
        {
          term: "가상 DOM과 패치 (virtual DOM, patch)",
          body: "프레임워크가 메모리에 든 가벼운 트리. 상태가 바뀌면 새 트리를 만들어 옛것과 비교하고 다른 부분만 진짜 DOM에 반영한다. 그 반영이 패치다. Vue에서는 상태 변경이 마이크로태스크에 모여 한 번 패치되고, 픽셀은 다음 렌더링 기회에 온다. 두 단계 늦춤이다.",
        },
        {
          term: "하이드레이션 (hydration)",
          body: "서버가 보낸 HTML로 이미 만들어진 DOM에 클라이언트 프레임워크가 가상 트리를 짝지어 이벤트와 상태를 붙이는 일. 서버 문자열, 파서가 고친 DOM, 클라이언트 vdom 셋이 같아야 하고 다르면 불일치 경고가 난다. Date·랜덤·로케일·window 값·파서가 고치는 중첩이 흔한 원인이다.",
        },
      ],
    },
    {
      heading: "JavaScript — javascript.info 를 따라 읽은 스물일곱 챕터",
      from: "js",
      entries: [
        {
          term: "엔진 · 명세서 · 호스트",
          body: "엔진은 코드를 실행하는 프로그램(V8, SpiderMonkey). 명세서는 언어의 정답(ECMA-262), MDN은 그것을 풀어 쓴 매뉴얼. 호스트는 엔진을 품고 자기 기능(브라우저의 DOM·fetch, Node의 fs)을 더해 주는 바깥 프로그램. 값이 이상하면 언어, 화면이 이상하면 호스트, 기기마다 다르면 지원 표를 본다.",
        },
        {
          term: "엄격 모드 ('use strict')",
          body: "ES5가 옛 동작을 끄기 위해 넣은 선언. 선언 없는 대입이 에러가 되고, 함수의 this가 window 대신 undefined가 되고, 읽기 전용 대입이 던진다. 클래스 본문과 모듈은 자동으로 켜진다. 조용한 실패를 소리 나게 한다.",
        },
        {
          term: "형 변환 (type conversion)",
          body: "값을 다른 자료형으로 바꾸는 일. 규칙은 셋(문자열로·숫자로·불린으로)뿐이지만 어느 연산자가 어느 규칙을 부르는지가 따로다. +는 문자열, 다른 산술과 <, ==는 숫자, if와 !는 불린. '0' == false가 true인 것은 숫자 규칙, if ('0')이 참인 것은 불린 규칙이다.",
        },
        {
          term: "동등 (==)과 일치 (===)",
          body: "==는 형이 다르면 숫자로 바꿔 견주고, ===는 형이 다르면 그냥 false. null과 undefined는 ==에서 서로만 같고 다른 값과는 다르며, >=는 null을 0으로 바꾼다. 그래서 null == 0은 false, null >= 0은 true. ===를 쓰고 x == null만 허용한다.",
        },
        {
          term: "호이스팅 (hoisting)과 TDZ",
          body: "선언이 스코프 맨 위로 끌어올려진 것처럼 동작하는 규칙. 함수 선언은 몸체까지 올라가 어디서든 부를 수 있고, var는 이름만 올라가 값이 undefined, let·const는 선언 줄 전에 읽으면 ReferenceError(TDZ, 일시적 사각지대)다.",
        },
        {
          term: "참조 (reference)와 얕은·깊은 복사",
          body: "변수에는 객체 자체가 아니라 주소(참조)가 들어 있어, 복사하면 두 이름이 한 객체를 가리킨다. 얕은 복사({...o}, Object.assign)는 첫 층만 새 객체, 안의 객체는 공유. 깊은 복사는 structuredClone. {} === {}는 false다.",
        },
        {
          term: "this",
          body: "함수가 불릴 때 정해지는 '점 앞의 것'. 정의한 곳이 아니라 부른 모양이 정한다. 떼어 내 부르면(콜백으로 넘기면) 엄격 모드에서 undefined. 화살표 함수만 자기 this가 없어 바깥 것을 쓴다. call·apply·bind로 직접 정할 수 있고, 화살표에는 그것도 안 통한다.",
        },
        {
          term: "클로저 (closure)와 렉시컬 환경",
          body: "함수가 만들어진 자리의 변수 장부(렉시컬 환경)를 기억해, 어디서 불리든 그 장부에서 변수를 찾는 것. 값을 복사하는 게 아니라 변수를 가리킨다. for (var i)로 만든 함수 셋이 전부 마지막 i를 보는 이유. let은 반복마다 새 장부를 만든다.",
        },
        {
          term: "래퍼 객체 (wrapper object)",
          body: "원시값의 메서드를 부르는 순간 엔진이 잠깐 만들어 쓰고 버리는 객체. 'abc'.length가 되는 이유. 원시값에 프로퍼티를 붙이면 그 임시 객체에 붙고 사라지며 엄격 모드에서는 TypeError다.",
        },
        {
          term: "sort의 기본 비교",
          body: "배열 sort()의 기본 비교 함수는 요소를 문자열로 바꿔 사전 순으로 견준다. [1, 2, 10, 21].sort()가 [1, 10, 2, 21]이 되는 이유. 숫자는 (a, b) => a - b를 넘겨야 한다. sort는 원본을 바꾸고 toSorted는 새 배열을 준다.",
        },
        {
          term: "Map · Set · WeakMap",
          body: "Map은 어떤 값도 열쇠로 받고(객체, NaN) 삽입 순서를 지킨다. 일반 객체는 객체 열쇠를 '[object Object]' 문자열로 뭉갠다. Set은 중복 없는 값 모음. WeakMap은 객체 열쇠만 받고 그 객체가 수거되면 항목도 사라지며 순회가 없다. 객체에 데이터를 붙이되 수명을 늘리지 않을 때.",
        },
        {
          term: "프로퍼티 설명자 (property descriptor)와 접근자",
          body: "프로퍼티 하나의 전부를 적은 객체. 데이터 프로퍼티는 { value, writable, enumerable, configurable }, 접근자 프로퍼티는 { get, set, enumerable, configurable }. 리터럴은 깃발이 전부 true, defineProperty는 적지 않은 깃발이 false. Object.keys에 안 보이는 것, 대입이 조용히 사라지는 것이 전부 깃발 때문이다.",
        },
        {
          term: "[[Prototype]]과 F.prototype",
          body: "[[Prototype]]은 모든 객체의 숨은 슬롯으로 '못 찾으면 여기서 다시 찾는' 다른 객체를 가리킨다. 읽기는 사슬을 올라가고 쓰기는 자기에게만. F.prototype은 함수의 보통 프로퍼티로 'new F()가 만든 객체의 [[Prototype]]'이 된다. 둘은 이름이 비슷하지만 다른 것이다.",
        },
        {
          term: "클래스 (class)",
          body: "생성자 함수 + prototype 메서드 + 사슬 잇기를 한 선언으로 적는 문법. new 필수, 메서드 non-enumerable, 본문은 엄격 모드, #private은 파싱 때 검사. extends는 사슬 두 겹(인스턴스·정적)을 잇고, 자식 생성자는 super()가 this를 만들어 줄 때까지 this가 없다. 필드는 자기 생성자 차례에 만들어진다.",
        },
        {
          term: "try..catch와 비동기 에러",
          body: "try는 블록 안이 동기로 도는 '시간'을 감싼다. 그 안에서 예약만 하고 나중에 도는 콜백(setTimeout, 이벤트, then)의 에러는 try가 끝난 뒤라 잡지 못한다. 프라미스의 .catch나 async/await로 나중을 try 안으로 끌어와야 한다. 파싱 에러도 try 전이라 못 잡는다.",
        },
        {
          term: "커스텀 에러와 다시 던지기",
          body: "class X extends Error { constructor(m) { super(m); this.name = this.constructor.name } }로 종류를 만들고 instanceof로 가린다. catch는 아는 에러만 처리하고 모르는 것은 throw e로 올린다. 전부 삼키면 진짜 버그가 사라진다. cause로 낮은 에러를 감싸 올린다.",
        },
        {
          term: "프라미스 (Promise)",
          body: "'한 번 끝나는 나중의 값'. pending → fulfilled/rejected로 한 번만 바뀐다. 실행자는 즉시 동기, then 핸들러는 늘 마이크로태스크. 체인 어디서 난 에러든 가장 가까운 catch로. all은 하나 실패면 전부 버리고, allSettled는 전부 모으고, race는 첫 것, any는 첫 성공.",
        },
        {
          term: "마이크로태스크 큐 (microtask queue)",
          body: "then·catch·finally·queueMicrotask·MutationObserver·await 뒤 코드가 들어가는 줄. 지금 코드가 끝나면 전부 비우고, 비우는 동안 들어온 것도 비운 뒤에야 setTimeout·이벤트·렌더링으로 간다. 그래서 then은 setTimeout(0)보다 먼저이고, 끝없이 자신을 넣으면 화면이 멈춘다.",
        },
        {
          term: "async / await",
          body: "async는 함수가 늘 프라미스를 돌려주게 하는 표시, await는 프라미스가 끝날 때까지 함수를 멈추고 값을 꺼낸다. 거부되면 그 줄에서 throw가 되어 try..catch가 받는다. await 하나가 마이크로태스크 하나다. forEach는 반환값을 기다리지 않으니 순서가 필요하면 for..of다.",
        },
        {
          term: "제너레이터 (generator)와 이터레이터 프로토콜",
          body: "function*은 yield에서 멈춰 값을 내보내고 next()로 이어 가는 함수. 돌려주는 객체는 next()가 { value, done }을 주는 이터레이터이자 iterable이라 for..of에 바로 쓴다. 소비자가 당길 때만 만들어 무한 수열도 된다. async function*과 for await는 '여러 번 이어지는 나중'이다.",
        },
        {
          term: "모듈 (module)과 import/export",
          body: "export·import가 있는 파일, 또는 type=module. 늘 엄격 모드, 파일 스코프(전역에 안 붙음), 한 번만 평가(같은 객체 공유), 최상위 this는 undefined, 브라우저에서는 늘 defer이고 외부 모듈은 CORS가 필요하다. 정적 import는 빌드 때 그래프를, 동적 import()는 실행 때 프라미스로 청크를.",
        },
        {
          term: "Proxy와 Reflect",
          body: "Proxy는 객체를 감싸 읽기·쓰기·삭제·열거·호출을 가로채는 객체(트랩). Reflect는 그 안에서 기본 동작을 하는 함수 묶음이고 receiver로 상속 getter의 this를 바로잡는다. 내장 객체의 내부 슬롯(Map, #private)은 프록시를 통하지 않아 bind가 필요하다. Vue 3의 reactive가 이것이다.",
        },
        {
          term: "속성 (attribute)과 프로퍼티 (property)",
          body: "속성은 HTML에 적은 문자열이고 getAttribute로 읽는다. 프로퍼티는 DOM 객체의 타입 있는 필드다. 표준 속성은 프로퍼티로 반영되지만 value·checked는 한 방향이다. 지금 값은 프로퍼티, 처음 값은 defaultValue, 비표준은 data-*와 dataset.",
        },
        {
          term: "offsetWidth · clientWidth · scrollWidth",
          body: "요소 크기의 세 가족. offset은 테두리까지 전부, client는 패딩까지(스크롤바 제외), scroll은 보이지 않는 부분까지 내용 전체. scrollTop만 쓸 수 있다. 읽으면 레이아웃을 강제한다(렌더링 7장). getBoundingClientRect는 창 기준이고 문서 기준은 scrollY를 더한다.",
        },
        {
          term: "캡처 (capturing)와 버블 (bubbling)",
          body: "이벤트가 지나가는 길의 두 방향. window → 타깃으로 내려가는 캡처(phase 1), 타깃(2), 타깃 → window로 올라오는 버블(3). 핸들러는 기본으로 버블에서 불리고 { capture: true }로 캡처에서. target은 내내 같고 currentTarget(this)은 단계마다 바뀐다. focus·blur·mouseenter·scroll은 버블하지 않는다.",
        },
        {
          term: "이벤트 위임 (event delegation)",
          body: "자식마다가 아니라 공통 부모 하나에 핸들러를 걸고 event.target.closest로 어느 자식인지 알아내는 패턴. 핸들러가 하나고 나중에 생긴 자식도 된다. 중간 요소의 stopPropagation이 길을 끊는 것이 유일한 약점이라, 끊지 않고 표시를 남기거나 캡처에 건다.",
        },
        {
          term: "기본 동작 (default action)과 preventDefault",
          body: "브라우저가 이벤트 뒤에 스스로 하는 일(링크 이동, 폼 전송, 체크박스 토글, 선택 시작). 핸들러가 동기로 도는 동안 event.preventDefault()를 부르면 막힌다. await 뒤에 부르면 늦다. passive: true는 '막지 않겠다'는 약속이라 스크롤이 기다리지 않는다. scroll 이벤트는 이미 스크롤된 뒤라 못 막는다.",
        },
        {
          term: "input 이벤트와 change 이벤트",
          body: "input은 값이 바뀔 때마다(키·붙여넣기·음성) 나고 이미 바뀐 뒤라 막을 수 없다. change는 확정될 때(텍스트는 blur, select·체크박스는 즉시). 프로그램으로 value를 바꾸면 둘 다 나지 않아 v-model이 모른다. 직접 dispatchEvent하거나 상태를 바꾼다.",
        },
        {
          term: "form.submit() · requestSubmit() · submit 이벤트",
          body: "submit 이벤트는 사용자가 전송할 때 나고 preventDefault로 막을 수 있다. form.submit()은 이벤트도 유효성도 건너뛰고 바로 보낸다. requestSubmit()은 사용자가 누른 것처럼 유효성 → 이벤트 → 전송을 밟는다. 자바스크립트로 보낼 때는 requestSubmit.",
        },
        {
          term: "DOMContentLoaded · load · beforeunload",
          body: "문서 시계의 눈금. DOMContentLoaded는 DOM 완성(스크립트는 기다림, 이미지는 아님), load는 이미지·iframe까지 전부, beforeunload는 떠나기 전(확인 창, 문장은 못 정함), unload는 떠남(sendBeacon). async 스크립트는 DOMContentLoaded와 무관해 지난 뒤 도착하면 리스너가 영영 안 불린다. readyState를 먼저 본다.",
        },
        {
          term: "MutationObserver",
          body: "DOM 노드의 변화(자식·속성·텍스트)를 지켜보다 콜백을 부르는 객체. 변화마다가 아니라 한 태스크의 변화를 모아 마이크로태스크에서 한 번 부른다. 내가 만들지 않은 변화(서드파티, 프레임워크)에 반응하는 유일한 길. 콜백에서 지켜보는 노드를 고치면 또 불린다.",
        },
        {
          term: "동일 출처 정책 (Same Origin Policy)과 postMessage",
          body: "스킴·도메인·포트가 같은 창끼리만 서로의 window·document를 만질 수 있다. 다른 출처의 창에는 location 쓰기·postMessage·length·closed 등 열몇 개만. postMessage는 받을 출처를 적고, 받는 쪽은 e.origin을 확인한다. 끼우기 거부는 서버 헤더(X-Frame-Options, frame-ancestors)다.",
        },
        {
          term: "ArrayBuffer와 뷰 (view)",
          body: "ArrayBuffer는 뜻이 없는 바이트 덩어리. 그 위에 Uint8Array·Uint32Array·DataView 같은 창을 얹어 읽는다. 같은 4바이트가 Uint8로는 넷, Uint32로는 하나, 리틀 엔디언 513, 빅 엔디언 258. 뷰는 복사가 아니라 같은 메모리를 본다. TextDecoder가 바이트를 글자로(한글 3바이트), Blob이 타입을 붙인 묶음.",
        },
        {
          term: "fetch의 두 단계와 response.ok",
          body: "fetch 프라미스는 헤더가 왔을 때 끝나고 본문은 json()·text()로 따로(한 번만). 404·500은 응답이라 성공으로 들어오고 ok가 false. 거부는 네트워크 끊김·CORS·abort만. if (!r.ok) throw를 늘 적는다.",
        },
        {
          term: "CORS와 프리플라이트",
          body: "다른 출처의 응답을 자바스크립트가 읽어도 되는지 서버가 Access-Control-Allow-Origin 헤더로 허락하는 규칙. 안전하지 않은 요청(PUT, application/json, Authorization)은 OPTIONS 프리플라이트가 먼저 가고 Allow-Methods·Headers로 허락받아야 본 요청이 간다. 쿠키는 credentials: 'include' + Allow-Credentials + 정확한 Origin. 막는 쪽은 브라우저, 푸는 쪽은 서버.",
        },
        {
          term: "쿠키 · localStorage · IndexedDB",
          body: "쿠키는 서버로 매 요청 함께 가는 4KB 글자(세션 ID, httpOnly). localStorage는 출처별 5MB 문자열, 탭 공유, 영구, 서버로 안 감. sessionStorage는 탭 하나. IndexedDB는 큰 객체·파일을 비동기 트랜잭션으로. 서버가 봐야 하나 → 쿠키, 탭을 넘나 → local, 크거나 객체 → IndexedDB.",
        },
        {
          term: "requestAnimationFrame과 시간 기반 애니메이션",
          body: "브라우저가 다음 프레임 직전에 콜백을 부르는 함수. 주사율에 맞고 숨은 탭에서 멈춘다. 진행률은 프레임 수가 아니라 (지금 - 시작) / 전체 시간으로 계산해야 120Hz에서도 같은 속도다. transform·opacity는 컴포지터만 움직여 싸고, 시작·끝으로 적을 수 있으면 CSS에 맡긴다.",
        },
        {
          term: "커스텀 엘리먼트와 Shadow DOM",
          body: "customElements.define('my-x', class extends HTMLElement)로 만드는 내 태그(하이픈 필수)와 그 안의 숨은 트리. 생명주기는 constructor → attributeChanged → connectedCallback(렌더링은 여기). Shadow 경계는 CSS를 양방향으로 막고(CSS 변수·::part만 넘음), 바깥 querySelector를 막고, 이벤트는 넘되 target이 호스트로 바뀌며 커스텀 이벤트는 composed: true여야 넘는다.",
        },
        {
          term: "파국적 백트래킹 (catastrophic backtracking)",
          body: "수량자가 중첩된 정규식((\\w+\\s?)*)이 맞지 않는 입력을 만나 글자를 나누는 모든 방식을 되돌아가며 시도해 지수 시간이 걸리는 현상. 문서의 예제 한 줄이 Node 24에서 54초였다. 사용자 입력에 돌리면 ReDoS. 같은 글자를 나누는 길이 하나만 되게 패턴을 고치고 입력 길이를 제한한다.",
        },
        {
          term: "정규식과 한글: \\w · \\b · u 플래그",
          body: "\\w는 라틴·숫자·_만이라 한글이 빠지고, \\b는 그 경계라 한글 단어 경계를 못 잡고, .은 u 없이 이모지를 두 글자로 본다. 한글은 [가-힣]이나 \\p{Script=Hangul}과 u 플래그, 경계는 (?<![가-힣])단어(?![가-힣])로 직접 적는다.",
        },
      ],
    },
    {
      heading: "React — react.dev 의 배우기와 참고서를 따라 읽은 서른여섯 장",
      from: "react",
      entries: [
        {
          term: "렌더 (render)와 커밋 (commit)",
          body: "렌더는 컴포넌트 함수를 불러 '무엇을 보여줄지' 계산하는 단계, 커밋은 그 차이를 DOM에 반영하는 단계. 리렌더가 났다고 DOM이 바뀐 것이 아니고, 같은 값을 set하면 렌더는 한 번 더 돌되 커밋은 없다. StrictMode는 렌더만 두 번 부르고 두 번째 결과를 버린다.",
        },
        {
          term: "순수 컴포넌트 (pure component)",
          body: "같은 props·state·컨텍스트면 같은 JSX를 돌려주고, 렌더 중에 바깥(전역, DOM, props 객체)을 바꾸지 않는 컴포넌트. React가 언제 몇 번 부르든 결과가 같아야 StrictMode·전환·컴파일러가 안전하다. 렌더 중 만든 지역 변수를 바꾸는 것은 괜찮다.",
        },
        {
          term: "스냅샷 (snapshot)으로서의 state",
          body: "렌더 한 번 안에서 state는 고정된 값이다. set(n + 1)을 세 번 불러도 n은 그 렌더의 값이라 +1만 되고, set(x => x + 1) 함수형 갱신은 큐를 차례로 밟아 +3이 된다. 핸들러 안의 setTimeout도 그 렌더의 스냅샷을 본다.",
        },
        {
          term: "묶음 갱신 (batching)",
          body: "같은 틱(이벤트 핸들러, 프라미스, 타임아웃)에서 부른 set들을 모아 렌더 한 번으로 처리하는 것. set(1) set(2) set(3)이 렌더 한 번에 n=3. React 18부터 어디서 부르든 묶인다. 지금 당장 커밋해야 하면 flushSync.",
        },
        {
          term: "key",
          body: "리스트 항목의 정체를 React에 알려 주는 문자열. 순서가 바뀌어도 같은 key면 같은 컴포넌트(state·DOM 유지), key가 바뀌면 새로 마운트(state 초기화). 인덱스를 key로 쓰면 정렬·삭제 때 state가 옆 항목으로 샌다. 같은 자리의 컴포넌트를 강제로 리셋할 때도 key를 바꾼다.",
        },
        {
          term: "제어 컴포넌트 (controlled)와 비제어 (uncontrolled)",
          body: "value·checked를 넘기면 React가 값의 주인(제어)이라 onChange로 state를 갱신해야 하고, 없으면 읽기 전용 경고. defaultValue·defaultChecked는 초깃값만 주고 DOM이 주인(비제어)이라 FormData·ref로 읽는다. 하나의 요소는 수명 중 한쪽이어야 하고, 제어 값은 문자열(null 금지)이다.",
        },
        {
          term: "Effect 와 동기화",
          body: "커밋·페인트 뒤에 돌아 React 바깥(구독, 타이머, DOM API, 네트워크)과 트리를 맞추는 코드. '마운트 때'가 아니라 '이 의존성으로 동기화를 시작하고, 바뀌면 정리 뒤 다시'. 렌더 중 계산할 수 있는 값(파생 값)이나 사용자 이벤트의 응답에는 쓰지 않는다.",
        },
        {
          term: "useLayoutEffect",
          body: "useEffect와 같되 커밋 직후 페인트 전에 동기로 돈다. 측정(getBoundingClientRect) 뒤 위치를 바꿔도 사용자는 중간 상태를 못 본다. 페인트를 막으니 측정에만 쓰고, 서버에서는 돌지 않아 경고가 난다.",
        },
        {
          term: "useEffectEvent",
          body: "Effect 안에서 쓰되 의존성이 되지 않는 '비반응' 로직을 싸는 훅(19 정식). 최신 props·state를 읽지만 바뀌어도 Effect를 다시 돌리지 않는다. 채팅방 연결은 roomId에 반응하되 알림 테마는 반응하지 않게 할 때. Effect 안에서만 부른다.",
        },
        {
          term: "ref",
          body: "렌더와 무관하게 렌더 사이에 남는 값({ current }). 바꿔도 리렌더가 없고, 렌더 중 읽기·쓰기는 규칙 위반(refs 린트). DOM 노드를 받는 자리이기도 하다. 19부터 ref는 보통 prop이라 forwardRef가 필요 없고, ref 콜백은 정리 함수를 돌려줄 수 있다.",
        },
        {
          term: "디스패처 (dispatcher)와 훅 순서",
          body: "훅 함수가 '지금 렌더 중인 컴포넌트'를 찾는 내부 객체. 렌더 중이 아니면 null이라 컴포넌트 밖 훅은 'Cannot read properties of null (reading useState)'. 훅은 이름이 아니라 호출 순서로 슬롯을 받으므로 조건·반복·조기 return 뒤에서 부르면 슬롯이 뒤바뀐다. use만 조건에서 예외.",
        },
        {
          term: "전환 (Transition)과 액션 (Action)",
          body: "startTransition 안의 갱신은 '긴급하지 않다'고 표시되어 입력 같은 긴급 갱신이 먼저 처리되고 isPending이 true다. 전환 중 Suspense는 fallback 대신 옛 내용을 유지한다. 19에서 async 함수를 넘기면 액션이라 부르고 끝날 때까지 pending이 이어지며 useActionState·useOptimistic·폼과 묶인다.",
        },
        {
          term: "useDeferredValue",
          body: "값의 '지연된 사본'. 먼저 옛 값으로 렌더하고 뒤에 새 값으로 다시 렌더한다. 갱신을 내가 부를 수 있으면 startTransition, 값만 받아 쓰는 자리면 useDeferredValue. 받는 컴포넌트가 memo여야 지연의 이득이 있다.",
        },
        {
          term: "Suspense 경계 (boundary)",
          body: "자식 중 하나가 '아직'(lazy 로딩, use의 pending 프라미스)이면 그 영역 전체를 fallback으로 바꾸고 준비되면 되돌리는 래퍼. 가장 가까운 경계가 받으므로 위치가 '누가 함께 기다리나'를 정한다. 빠른 응답에도 드러내기를 약 300ms 묶어 깜빡임을 막는다. useEffect의 fetch는 모른다.",
        },
        {
          term: "use",
          body: "렌더 중 프라미스나 컨텍스트를 '읽는' 훅(19). 프라미스가 아직이면 가장 가까운 Suspense가 기다린다. 다른 훅과 달리 조건·반복 안에서도 되지만 try/catch는 안 된다. 렌더 중 만든 프라미스는 매번 새것이라 cache나 바깥에서 만들어 넘긴다.",
        },
        {
          term: "StrictMode",
          body: "개발 모드에서만 자식 트리에 추가 검사를 거는 래퍼. 컴포넌트를 두 번 불러 순수성을, Effect를 한 번 더 정리·실행해 정리 누락을, ref 콜백도 한 번 더 검사한다(renders 2 · effects 2 · cleanups 1). 운영 빌드에서는 아무 일도 안 한다. 두 번 들어가는 로그는 버그가 아니라 규칙 위반의 신호다.",
        },
        {
          term: "memo 와 얕은 비교",
          body: "memo(C)는 부모가 렌더될 때 새·옛 props를 각각 Object.is로 비교해 같으면 C를 건너뛴다. 매 렌더 새로 만드는 객체·배열·함수 prop은 늘 다르다고 보아 무력하다(3 vs 1). useMemo·useCallback으로 참조를 고정하거나 컴파일러가 대신한다. state·컨텍스트 변화는 막지 못한다.",
        },
        {
          term: "lazy 와 코드 분할",
          body: "lazy(() => import('./X'))는 처음 렌더될 때 모듈을 받는 컴포넌트를 만든다. 번들러가 import()를 별도 청크로 떼고, 받는 동안 가장 가까운 Suspense의 fallback이 보인다. 모듈 최상위에 두고({ default }를 resolve) 컴포넌트 안에서 만들면 매 렌더 재로드된다.",
        },
        {
          term: "하이드레이션 (hydration)과 불일치",
          body: "서버 HTML에 React가 이벤트 핸들러를 붙이고 트리를 세우는 일. 다시 그리지 않고 기존 DOM을 자기 것으로 인정하므로 클라이언트 첫 렌더가 서버 HTML과 같아야 한다. 다르면(시간·난수·window 분기·다른 데이터) 그 트리를 다시 그리고 onRecoverableError로 알린다. console.error가 아니다.",
        },
        {
          term: "포털 (portal)",
          body: "createPortal(children, node)로 React 트리의 위치와 DOM 위치를 떼어 놓는 것. DOM은 body 끝에 있어도 React에서는 그 컴포넌트의 자식이라 컨텍스트를 읽고 이벤트가 React 부모의 onClick으로 올라간다. 서버에서는 DOM 노드가 없어 쓸 수 없다.",
        },
        {
          term: "flushSync",
          body: "콜백 안의 갱신을 묶지 않고 지금 동기로 커밋한다. 다음 줄에서 DOM이 바뀌어 있다. window.print처럼 브라우저가 '지금' DOM을 읽는 자리에서만 쓰고, 렌더·Effect 안에서 부르면 'already rendering' 경고다. 남발하면 묶음의 이득이 사라지고 Suspense가 fallback으로 튄다.",
        },
        {
          term: "precedence 와 리소스 호이스팅",
          body: "19에서 <title> <meta> <link> <script> <style>은 어디서 렌더해도 head로 올라간다. 단 <link rel=stylesheet>와 <style>은 precedence(순서 묶음 이름)가 있어야, <script>는 src + async여야 올라가고 같은 href·src는 하나로 합쳐진다. 없으면 보통 태그처럼 제자리. 렌더 뒤 props 변경은 무시되고 언마운트 뒤에도 남을 수 있다.",
        },
        {
          term: "셸 (shell)과 스트리밍 SSR",
          body: "셸은 Suspense 경계 바깥의 모든 것, 즉 바로 보낼 수 있는 첫 HTML. renderToPipeableStream은 onShellReady에 셸을 보내고 경계 안은 준비되는 대로 <div hidden> + $RC 스크립트로 제자리에 끼운다. 셸이 나간 뒤에는 상태 코드를 바꿀 수 없고, 셸 자체가 실패하면 onShellError로 대체 HTML을 보낸다. renderToString은 기다리지 못해 fallback을 그대로 낸다.",
        },
        {
          term: "prerender 와 postponed",
          body: "prerender는 모든 Suspense가 끝날 때까지 기다려 template·script 없는 완성 HTML(prelude)을 낸다(SSG). signal로 중단하면 미완성 경계는 fallback 상태로 남고 '어디서 멈췄나'를 담은 불투명 객체 postponed가 생긴다. 요청 때 resume에 넘기면 그 자리부터 이어 스트리밍한다(부분 사전 렌더링). 열지 말고 같은 React 버전으로 넘긴다.",
        },
        {
          term: "useFormStatus 와 폼 액션",
          body: "<form action={fn}>에 함수를 넘기면 React가 전환 안에서 FormData로 부르고, 성공하면 비제어 필드를 리셋한다. useFormStatus는 '자기를 감싼' form의 pending·data를 읽으므로 form을 렌더하는 컴포넌트 자신은 늘 false이고 안의 자식(<SubmitButton/>)에서 읽어야 한다. 액션의 결과 state는 useActionState.",
        },
        {
          term: "React 컴파일러와 자동 메모이제이션",
          body: "babel-plugin-react-compiler가 빌드 때 컴포넌트를 읽어 '입력이 같으면 재사용'하는 코드(react/compiler-runtime의 c(n) 슬롯)로 바꾼다. 손으로 쓰던 useMemo·useCallback·memo를 대신한다. React 규칙을 지킨 함수만 바꾸고 어긴 함수는 CompileError와 함께 원문으로 건너뛴다(panicThreshold none). 어디가 건너뛰어졌는지는 logger와 ESLint 플러그인이 보여 준다.",
        },
        {
          term: "'use memo' 와 'use no memo'",
          body: "컴파일러 지시어. 함수 몸 첫 줄(또는 파일 첫 줄)의 문자열. 'use memo'는 컴파일하라(annotation 모드에서 필수), 'use no memo'는 건너뛰라(모든 모드보다 우선, 별칭 'use no forget'). 비호환 라이브러리(react-hook-form watch, MobX observer)를 쓰는 동안의 임시 탈출구이고, 원인이 해소되면 뗀다.",
        },
        {
          term: "게이팅 (gating)",
          body: "컴파일러 설정으로, 같은 컴포넌트의 컴파일판과 원본을 둘 다 번들에 넣고 런타임 불리언 함수(named export)로 고르게 한다. isCompilerOn() ? List_compiled : List_original. 플래그는 모듈 평가 때 한 번 읽히고 번들이 두 배 가까이 커지므로 도입기에만 쓰고 뗀다.",
        },
        {
          term: "컴파일러 진단 (compiler diagnostics)과 린트",
          body: "컴파일러가 '이 함수는 규칙을 어겨 컴파일할 수 없다'고 낼 때의 이유. eslint-plugin-react-hooks 7은 같은 분석기를 린트로 감싸 그 이유('Cannot access refs during render', 'Cannot call impure function during render' 등)를 쓰는 중에 에디터에 보여 준다. 컴파일러를 쓰지 않아도 켤 수 있고, 린트가 깨끗하면 컴파일러가 건너뛸 함수도 거의 없다.",
        },
        {
          term: "연쇄 렌더 (cascading render)",
          body: "커밋이 끝난 Effect 안에서 바로 setState를 불러 방금 그린 화면을 버리고 다시 렌더하는 것. 한 갱신이 두 렌더가 되고 중간 상태가 한 프레임 보일 수 있다. set-state-in-effect 린트가 잡고 Performance 트랙에 Cascading update로 보인다. 다른 state·props로 계산할 수 있는 값은 렌더 중 파생한다.",
        },
        {
          term: "레인 (lane)과 Performance 트랙",
          body: "React가 갱신을 우선순위별로 나누는 통로. 동기 갱신은 Blocking, startTransition은 Transition, Suspense 재시도는 Suspense, 남는 시간은 Idle. 19.2의 Performance 트랙은 브라우저 Performance 패널에 Scheduler(레인별 Update·Render·Commit·Effects)·Components(컴포넌트별 렌더·효과)·Server 트랙을 그린다. 개발·프로파일링 빌드(react-dom/profiling)에서만.",
        },
        {
          term: "React 규칙 (Rules of React)",
          body: "'지침이 아니라 규칙'. 셋이다. 컴포넌트와 훅은 순수해야 한다(멱등, 부수 효과는 렌더 밖, props·state·훅 인자·반환·JSX에 넘긴 값은 불변, 지역 변경은 OK). React가 컴포넌트와 훅을 부른다(직접 호출 X, 훅을 값처럼 X). 훅의 규칙(최상위, React 함수에서만). 어기면 지금은 돌아도 StrictMode·컴파일러·전환·서버에서 깨진다.",
        },
        {
          term: "서버 컴포넌트 (Server Component)",
          body: "번들링 전에 서버(또는 빌드)에서 미리 렌더되는 컴포넌트. async로 await하며 DB·파일을 직접 읽고, 코드가 브라우저로 가지 않아 state·Effect·이벤트가 없다. 결과(데이터·JSX)를 클라이언트 컴포넌트에 props로 넘긴다. 지시어가 없고 기본이 서버다. React API지만 번들러·프레임워크가 있어야 돈다.",
        },
        {
          term: "'use client' 와 직렬화 경계",
          body: "파일 첫 줄에 두어 그 모듈과 전이적 의존성을 클라이언트 번들로 표시하는 지시어. 서버 컴포넌트가 이 모듈의 컴포넌트를 렌더하는 자리가 경계이고, 넘는 props는 직렬화 가능해야 한다(원시값·Array/Map/Set·Date·플레인 객체·Promise·JSX·서버 함수). 일반 함수·클래스·인스턴스는 못 넘는다. 경계는 가능한 한 아래(leaf)에.",
        },
        {
          term: "서버 함수 ('use server')",
          body: "async 함수 몸(또는 파일) 첫 줄에 두어 클라이언트가 부를 수 있는 서버 함수로 표시하는 지시어. 함수는 서버에 남고 참조만 넘어가 <form action>·useActionState·startTransition에서 부른다. 인자는 클라이언트가 통제하는 공개 엔드포인트라 늘 검증하고 권한을 확인한다. 데이터 가져오기용이 아니다. 번들러가 없으면 그냥 문자열이다.",
        },
        {
          term: "레거시 API (legacy)",
          body: "react가 여전히 내보내지만 새 코드에는 권하지 않는 여덟: Children, cloneElement, Component, createElement, createRef, forwardRef, isValidElement, PureComponent. 깨진 것이 아니라 '도구가 볼 수 없는 암묵'의 목록이다. 대안은 함수 컴포넌트 + 훅 + JSX, 자식 대신 배열·렌더 prop·컨텍스트, 19의 ref prop. 에러 경계 클래스 하나는 예외.",
        },
      ],
    },
  ],
};

export function getDictionary(id: string): Dictionary | undefined {
  return id === dictionary.id ? dictionary : undefined;
}
