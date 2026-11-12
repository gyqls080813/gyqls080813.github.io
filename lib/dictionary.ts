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
    {
      heading: "Vue — vuejs.org 의 가이드와 참고서를 따라 읽은 백여섯 장",
      from: "vue",
      entries: [
        {
          term: "반응성 (reactivity)과 추적",
          body: "상태를 읽은 자리를 기록해 두고 그 상태가 바뀌면 기록된 자리만 다시 실행하는 체계. Vue 3는 객체를 Proxy로 감싸 get에서 track, set에서 trigger하고 ref는 .value의 getter·setter가 그 역할. '읽는 순간'에만 기록되므로 구조 분해로 꺼낸 값, await 뒤 읽기, 서버 렌더 중은 기록되지 않는다. 실제로 구조 분해한 값은 바뀌어도 효과가 돌지 않았다.",
        },
        {
          term: "ref 와 reactive",
          body: "ref(v)는 어떤 값이든 { value }로 감싸 템플릿 최상위에서 풀리고, reactive(obj)는 객체만 깊은 Proxy로 감싼다. reactive의 제한 셋: 원시값 불가(경고), 통째 교체 불가(옛 프록시 끊김), 구조 분해 불가(복사). 그래서 문서는 ref를 주 API로 권한다. 같은 원본엔 같은 프록시(reactive(raw) === reactive(raw)).",
        },
        {
          term: "ref 풀림 (unwrapping)",
          body: "ref를 .value 없이 쓰게 Vue가 대신 꺼내 주는 규칙. 템플릿의 최상위 바인딩, 깊은 reactive 객체의 프로퍼티, ref 안의 ref에서만 일어나고 템플릿의 중첩 식·배열·Map·shallowReactive 안에서는 안 일어난다. 실제로 {{ obj.id + 1 }}은 '[object Object]1', reactive([ref(5)])[0]은 ref 그대로.",
        },
        {
          term: "다음 틱 (next tick)과 nextTick()",
          body: "같은 동기 코드의 상태 변경을 모아 한 번에 DOM에 반영하는 시점. 변경 직후 DOM은 옛 값(실제로 '0-0'), await nextTick() 뒤 새 값('2-1'). 같은 틱의 set 셋이 렌더 한 번으로 묶였다. 측정은 nextTick 뒤나 watch flush 'post'에서.",
        },
        {
          term: "computed 의 지연 평가와 캐시",
          body: "읽을 때 처음 계산하고(생성 직후 runs 0) 의존이 바뀌기 전엔 다시 읽어도 재계산하지 않으며(두 번 읽어도 1) 바뀌면 더럽다고 표시만 해 다음 읽기에 계산한다. 읽기 전용이라 쓰면 'Write operation failed: computed value is readonly'. getter에 부수 효과·원본 변이(sort) 금지.",
        },
        {
          term: "computed 안정성 (3.4+)",
          body: "computed가 재계산되어도 값이 전과 같으면(Object.is) 의존하는 효과를 깨우지 않는 규칙. 불리언 computed는 n이 네 번 바뀌어도 값이 바뀐 한 번만 효과(2회), 매번 새 객체를 돌려주는 computed는 매번(3회). 객체를 돌려줄 땐 이전 값(getter의 prev 인자)과 비교해 같으면 prev.",
        },
        {
          term: "watch 와 watchEffect",
          body: "watch는 소스(ref·getter·reactive·배열)를 명시하고 바뀔 때만 콜백(새·옛 값). reactive 소스는 암묵적 deep, getter·ref는 얕음(ref([])의 push 미감지). watchEffect는 즉시 1회 돌고 동기 실행 중 읽은 것을 자동 추적하며 첫 await 전까지만 기록한다(실제로 runs 2에서 멈춤). 옵션 immediate·once(3.4+)·deep(3.5+ 숫자).",
        },
        {
          term: "flush (pre · post · sync)",
          body: "감시자 콜백이 도는 시점. pre(기본)는 소유 컴포넌트 DOM 갱신 전(DOM 옛 값), post는 갱신 뒤(새 값), sync는 변경 즉시 묶음 없이. 실제로 순서는 sync → 동기 코드 끝 → pre → post. DOM 측정은 post, 배열처럼 여러 번 변이되는 소스에 sync는 피할 것.",
        },
        {
          term: "effectScope 와 onScopeDispose",
          body: "컴포넌트 밖(스토어·테스트)에서 효과(watch·computed)의 수명을 묶는 장치. scope.run(fn) 안의 효과는 scope.stop()에 전부 멈추고 onScopeDispose가 불린다(실제로 stop 뒤 변경 무시·disposed true). 컴포저블의 정리를 onUnmounted 대신 이것으로 적으면 컴포넌트·스토어 어디서든 동작.",
        },
        {
          term: "shallowRef · markRaw · toRaw",
          body: "추적 깊이를 조절하는 셋. shallowRef는 .value 교체만 추적(깊은 변경은 triggerRef로 수동), markRaw는 객체를 프록시로 감싸지 말라는 표시(루트만), toRaw는 프록시의 원본. 거대 불변 데이터·외부 라이브러리 인스턴스를 reactive에 넣을 때의 처방이고, toRaw 참조는 보관하지 않는다.",
        },
        {
          term: "customRef",
          body: "track·trigger를 손에 쥐고 '언제 반응하나'를 직접 정하는 ref 공장. customRef((track, trigger) => ({ get() { track(); … }, set(v) { … trigger() } })). 디바운스 ref가 전형이고 실제로 'a','ab' 연속 쓰기에 watch가 'ab' 한 번만 불렸다.",
        },
        {
          term: "템플릿 식 허용 목록 (globals whitelist)",
          body: "템플릿 식이 접근할 수 있는 전역은 Math·Date·JSON 등 허용 목록만. window·performance·localStorage는 undefined이고 개발 경고 'Property \"x\" was accessed during render but is not defined on instance.' 식은 _ctx.x로 컴파일되어 인스턴스에서 찾는다. 필요하면 setup에서 꺼내 반환하거나 app.config.globalProperties.",
        },
        {
          term: "디렉티브 (directive)",
          body: "v-이름:인자.수식어=\"식\" 꼴의 특수 속성. 내장(v-if·v-for·v-model·v-bind·v-on…)과 커스텀(v-focus). 커스텀은 요소 하나의 생명주기 훅 일곱(created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted)에 DOM 조작을 매단 것이고 binding에 value·oldValue·arg·modifiers가 온다. 다중 루트 컴포넌트에 걸면 'Runtime directive used on component with non-element root node' 경고.",
        },
        {
          term: "v-on 수식어 순서",
          body: "수식어는 적은 순서대로 핸들러를 감싸는 코드가 된다. .prevent.self는 먼저 막고 자신인지 검사해 자식 클릭도 막히고, .self.prevent는 자신인지 먼저 검사해 자식은 통과. 실제로 자식 링크 클릭이 전자는 preventDefault 됨·후자는 안 됨. .passive와 .prevent는 함께 쓰지 않는다.",
        },
        {
          term: "v-model 과 요소별 짝",
          body: "값 바인딩 + 입력 리스너를 한 줄로. text·textarea는 value/input, checkbox·radio는 checked/change, select는 value/change, 컴포넌트는 modelValue/update:modelValue. 초기 value·checked·selected 속성은 무시(진실은 JS 상태). 수식어 .lazy(change) .number(parseFloat, 실패 시 원문: '12abc'→12 'abc'→'abc') .trim.",
        },
        {
          term: "key",
          body: "v-for 노드와 조건 분기에 '이 노드는 이 항목이다'를 알리는 원시값. 리스트가 바뀌면 key로 옛 노드와 새 항목을 짝지어 재사용·이동·제거를 정한다. 없거나 index면 자리 기준이라 input 값·자식 상태가 옆으로 새고, 바꾸면 새 노드가 된다(실제로 key 변경에 input 값 리셋). v-if/v-else 분기에 같은 key는 컴파일 에러.",
        },
        {
          term: "v-if 와 v-show",
          body: "v-if는 가상 DOM에서 노드를 빼고 넣어 컴포넌트 수명·state가 함께 사라지고(unmounted 호출), v-show는 트리를 두고 display만 토글해 state가 남는다(실제로 제거됨 vs display:none). 자주 토글이면 v-show, 조건이 잘 안 바뀌면 v-if, DOM은 빼되 state는 두려면 KeepAlive. 같은 요소에 v-if와 v-for는 v-if가 먼저라 변수를 못 읽는다.",
        },
        {
          term: "in-DOM 템플릿 (in-DOM template)",
          body: "HTML 문서 안에 직접 쓴 템플릿(마운트 컨테이너의 innerHTML). 브라우저 파서를 먼저 거쳐 태그·속성이 소문자가 되고(<MyRow> → <myrow>), 자기 닫힘이 무시되어 <my-row/> 뒤 형제가 그 자식으로 삼켜지고, <table> 안 컴포넌트는 밖으로 끌려 나온다(실제로 전부 확인). kebab-case·닫는 태그·<tr is=\"vue:my-row\">가 처방. SFC·문자열 템플릿엔 해당 없음.",
        },
        {
          term: "props 단방향과 검증",
          body: "props는 부모 상태의 읽기 전용 투영. 자식이 쓰면 'Set operation on key \"x\" failed: target is readonly.' 경고, 객체 안쪽은 경고 없이 부모까지 바뀌니 피할 것. 선언(type·required·default·validator)은 개발 모드에서 검사되어 'type check failed … Expected Number with value 3, got String with value \"3\"' 같은 경고를 낸다. Boolean은 속성만 있으면 true·없으면 false, [String, Boolean]이면 ''.",
        },
        {
          term: "반응형 props 구조 분해 (3.5+)",
          body: "const { msg = 'hi' } = defineProps(…)를 컴파일러가 __props.msg로 치환해 반응성을 유지하는 기능(실제로 compileScript 출력에서 확인). 기본값은 구조 분해의 =로 적고 props 선언의 default가 된다. 구조 분해 변수를 watch·컴포저블에 값으로 넘기면 끊기므로 컴파일러가 에러를 낸다: '\"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.'",
        },
        {
          term: "emits 선언과 폴스루",
          body: "컴포넌트에 건 @click은 emits에 click이 있으면 컴포넌트 이벤트 리스너(emit만 받음), 없으면 폴스루로 루트 요소의 네이티브 리스너가 된다(실제로 선언 시 네이티브 안 옴·미선언 시 네이티브 폴스루). 선언 없이 $emit('click')도 하면 두 번 울린다. 컴포넌트 이벤트는 버블링하지 않는다.",
        },
        {
          term: "defineModel (3.4+)",
          body: "v-model 계약(modelValue prop + update:modelValue 이벤트)을 한 줄로 선언하고 양방향 ref를 돌려주는 매크로. 실제로 compileScript가 props에 modelValue·modelModifiers, emits에 update:modelValue, const model = useModel(__props, 'modelValue')로 바꿨다. 인자 v-model:title → defineModel('title'), 수식어는 [model, modifiers]. default를 주고 부모가 undefined면 어긋남 경고.",
        },
        {
          term: "폴스루 속성 (fallthrough attributes)",
          body: "props·emits에 선언되지 않은 속성·리스너. 단일 루트 요소에 자동 적용되어 class·style은 병합(실제로 'base extra'), 리스너는 추가. 루트가 여럿이면 자리가 없어 'Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.' 경고. inheritAttrs: false + v-bind=\"$attrs\"로 손으로 둔다. $attrs는 비반응.",
        },
        {
          term: "슬롯 (slot)과 범위 슬롯",
          body: "부모가 자식 안에 내용을 넘기는 자리. 컴파일되면 { default: () => vnodes, item: (props) => vnodes } 함수 객체라 부모 범위의 클로저이고 자식이 부를 때 평가된다(안 부르면 폴백). 범위 슬롯은 자식이 그 함수에 인자(:user)를 넘겨 데이터가 자식→부모로 간다. 기본 범위 슬롯을 컴포넌트에 직접 두고 이름 슬롯 template을 섞으면 'Mixed v-slot usage…' 컴파일 에러.",
        },
        {
          term: "provide / inject",
          body: "조상이 provide(key, value)한 것을 자손이 inject(key)로 받는 통로. 기준은 논리 트리(Teleport·슬롯 안에서도 됨. 실제로 확인), setup 중 동기 호출. ref를 넘기면 자손이 반응형으로 갱신되고 보통 값은 스냅샷. 변경은 제공자가 하도록 readonly와 변경 함수를 함께 넘긴다(자손이 readonly에 쓰면 경고). 키는 Symbol(InjectionKey<T>)로 충돌 방지.",
        },
        {
          term: "컴포저블 (composable)",
          body: "Composition API로 상태 있는 로직을 재사용하는 use* 함수. 관례: 입력은 toValue()로 ref·getter·값을 모두 받고, 출력은 ref들을 담은 plain 객체(reactive를 돌려주면 구조 분해에 끊김), DOM은 onMounted, 정리는 onUnmounted/onScopeDispose, 호출은 setup 안에서 동기로. 믹스인(출처 불명·충돌)과 렌더리스 컴포넌트(인스턴스 비용)를 대체했다.",
        },
        {
          term: "비동기 컴포넌트 (defineAsyncComponent)",
          body: "컴포넌트를 렌더될 때 로더로 받는 래퍼. 상태 기계: 대기(delay 200ms) → loadingComponent → 도착 또는 실패(errorComponent, timeout). onError(err, retry, fail, attempts)로 재시도. 실제로 'loading…' → 'lazy 도착', 500 응답은 'Failed to fetch dynamically imported module', timeout 50은 'Async component timed out after 50ms.'. Suspense 안에서는 Suspense가 로딩을 맡고(suspensible), 3.5+ SSR은 hydrateOnVisible 등으로 하이드레이션을 미룬다.",
        },
        {
          term: "Transition 의 여섯 클래스",
          body: "요소가 들어오고 나갈 때 Vue가 프레임 순서로 붙이는 클래스. 들어옴: v-enter-from + v-enter-active(삽입 직전) → 다음 프레임 v-enter-from 제거·v-enter-to 추가 → 끝나면 전부 제거. 나감은 v-leave-* 대칭. 실제로 nextTick 'fade-enter-from fade-enter-active' → rAF2 'fade-enter-active fade-enter-to' → 150ms ''. 자식은 하나, 텍스트만 바뀌면 전환 없음(key 필요), mode='out-in'은 after-leave 뒤 before-enter.",
        },
        {
          term: "TransitionGroup 과 FLIP",
          body: "리스트 항목마다 들어옴·나감·이동(v-move) 전환을 거는 컴포넌트. key 필수('<TransitionGroup> children must be keyed.'), 래퍼 없음(tag로), mode 없음. 재정렬 때 옛·새 위치 차이를 transform으로 역적용해 전환으로 돌리는 FLIP(실제로 재정렬 직후 전부 list-move). 떠나는 항목은 .x-leave-active { position: absolute }로 흐름에서 빼야 나머지가 바로 move.",
        },
        {
          term: "KeepAlive 와 LRU",
          body: "동적 컴포넌트를 언마운트 대신 캐시해 돌아오면 복원하는 래퍼(실제로 A:1 유지). include/exclude는 컴포넌트 name과 매칭(SFC는 파일명), max는 LRU로 가장 오래 안 본 인스턴스를 unmounted(실제로 max=2에서 A 퇴출 → A:0). 캐시된 컴포넌트는 mounted/unmounted 대신 activated/deactivated가 돌아 타이머·구독 짝을 거기 둔다.",
        },
        {
          term: "Teleport",
          body: "자식을 DOM의 다른 자리(to)에 그리되 컴포넌트 트리의 자리는 두는 래퍼. 부모 자리엔 <!--teleport start--><!--teleport end--> 주석만 남고(실제로), 안에서 inject·props·emit은 그대로(논리 트리). 타깃은 마운트 전에 있어야('Failed to locate Teleport target…' 경고, 3.5+ defer), disabled로 제자리 토글, SSR은 ctx.teleports에 모여 body 타깃은 피한다.",
        },
        {
          term: "Suspense 의 비동기 의존",
          body: "Suspense가 기다리는 것은 둘만: async setup(<script setup>의 최상위 await 포함)과 비동기 컴포넌트 로딩. onMounted 안 fetch나 Router 지연 라우트는 모른다. 전부 끝나면 resolve(이벤트 순서 pending → fallback → resolve), 루트 교체만 다시 pending, 에러는 잡지 않아 부모 onErrorCaptured. 실험적이고 서버 렌더는 기다려 완성 HTML을 낸다(실제로).",
        },
        {
          term: "요청 간 상태 오염 (cross-request state pollution)",
          body: "SSR 서버의 모듈 수준 reactive·ref는 모든 요청이 공유해 A 사용자의 상태가 B의 HTML에 들어가는 문제. 실제로 모듈 reactive가 요청 1에서 1, 요청 2에서 2로 누적. 처방은 요청마다 앱·스토어를 만들어 provide하거나 Pinia(createPinia를 요청마다). 브라우저는 사용자 하나라 모듈 범위가 앱 범위와 같아 문제없다.",
        },
        {
          term: "하이드레이션 불일치 (hydration mismatch)",
          body: "서버가 보낸 HTML과 클라이언트 첫 렌더가 다를 때. 개발 모드는 'Hydration text content mismatch on …' 경고와 'Hydration completed but contains mismatches.'를 내고 클라이언트 값으로 고친다(실제로). 원인은 시간대·난수·window 분기·브라우저가 고친 잘못된 HTML 중첩. 불가피하면 3.5+ data-allow-mismatch=\"text\"를 그 요소에(실제로 경고 없음).",
        },
        {
          term: "서버에 없는 셋",
          body: "SSR에서 같은 코드가 다르게 도는 이유. DOM이 없어 window·마운트 훅·디렉티브 DOM 훅이 없고(실제로 돈 훅은 serverPrefetch만), 반응성 추적이 꺼져 watch·computed 갱신이 없고(실제로 watchEffect runs 1), 사용자 격리가 없어 모듈 전역이 공유된다. 코드를 공통(setup 동기·템플릿) / 서버 전용(onServerPrefetch·getSSRProps) / 브라우저 전용(onMounted 이후)으로 가른다.",
        },
        {
          term: "패치 플래그 (patch flag)와 정적 캐시",
          body: "컴파일러가 동적 vnode에 붙이는 비트 플래그(1 TEXT · 2 CLASS · 8 PROPS · 128 KEYED_FRAGMENT · 512 NEED_PATCH)로 런타임이 그것만 비교하고, 정적 노드는 -1 CACHED로 한 번 만들어 재사용한다(실제로 컴파일 출력에서 확인). v-if·v-for는 블록을 만들어 동적 자손만 평탄 배열로 추적. 손으로 쓴 h()·JSX에는 이 정보가 없어 전체 diff.",
        },
        {
          term: "h() 와 렌더 함수",
          body: "h(type, props?, children?)로 vnode를 직접 만드는 함수. 컴포넌트 자식은 슬롯 함수 객체(props 자리 null), 디렉티브는 withDirectives, 수식어는 withModifiers, 전역 등록 컴포넌트는 resolveComponent(없으면 'Failed to resolve component' 경고와 이름 문자열). setup은 vnode가 아니라 '함수'를 돌려줘야 갱신된다. 이 블로그의 측정 코드가 전부 h()였다.",
        },
        {
          term: "<script setup> 매크로",
          body: "import 없이 쓰는 컴파일러 매크로 defineProps·defineEmits·defineModel·defineExpose·defineOptions·defineSlots. 컴파일러가 전부 지우고 props·emits 선언과 __props·__expose·useModel로 바꾼다(실제로 compileScript 출력). 최상위에서 정적으로 읽혀야 하고 인자는 모듈 스코프로 끌어올려져 setup 로컬 변수를 못 본다. 최상위 await는 async setup이 되어 Suspense 필수.",
        },
        {
          term: "scoped CSS 와 :deep · :slotted · :global",
          body: "<style scoped>는 요소에 data-v-해시 속성을 붙이고 선택자마다 [data-v-해시]를 붙여 범위를 만든다(실제로 .a → .a[data-v-abc123]). 자식 루트는 부모·자식 둘 다의 영향. 자식 안쪽은 :deep(.b) → .a[data-v-abc123] .b, 슬롯 내용은 :slotted(div) → div[data-v-abc123-s], 전역 한 줄은 :global. 요소 선택자(p)는 모든 p를 속성 검사해 느리니 클래스로.",
        },
        {
          term: "v-bind() in CSS",
          body: "<style>의 값 자리에 컴포넌트 상태를 넣는 SFC 기능. color: v-bind(color), 식은 따옴표 v-bind('theme.color'). 컴파일러가 var(--해시-이름)으로 바꾸고(실제로 var(--abc123-size)) 런타임 useCssVars가 루트 요소에 인라인 CSS 변수를 넣어 반응형으로 갱신한다. CSSProperties 타입 증강 없이 동적 스타일을 CSS에 둘 수 있다.",
        },
        {
          term: "useId (3.5+)",
          body: "앱 안 고유하고 서버·클라이언트에서 같은 id 문자열. label for/input id·aria-describedby 연결용. 실제로 'v-0' 'v-1', app.config.idPrefix 'app'이면 'app-0', 서버도 'v-0'이라 하이드레이션이 맞는다. 같은 컴포넌트에서 여러 번 부르면 다른 id, computed 안에서 부르지 말 것.",
        },
        {
          term: "점진적 프레임워크와 사용 방법 스펙트럼",
          body: "스크립트 하나(CDN 전역 빌드로 서버 HTML 강화) · 웹 컴포넌트(defineCustomElement) · SPA(create-vue) · SSR(Nuxt) · SSG(VitePress) · 데스크톱·모바일·터미널(커스텀 렌더러)까지 같은 Vue. 자리를 정하는 변수 셋은 HTML을 누가 언제 만드나·상호작용 양·실행 환경. 이 블로그는 두 끝(esm-browser 빌드 576KB로 빌드 없이, server-renderer로 SSR)에서 측정했다.",
        },
        {
          term: "컴파일 타임 플래그와 운영 빌드",
          body: "__VUE_OPTIONS_API__(true) · __VUE_PROD_DEVTOOLS__(false) · __VUE_PROD_HYDRATION_MISMATCH_DETAILS__(false, 3.4+)를 빌드 때 상수로 치환해 압축기가 코드를 빼게 하는 것. process.env.NODE_ENV 치환과 같은 메커니즘이고 esm-bundler 빌드에서만. 개발 빌드는 경고·검증을 포함해 575,931바이트, 운영은 177,765바이트(실제로). 운영에서 빠진 검사는 개발·CI에서 잡고 에러는 errorHandler로 보고한다.",
        },
      ],
    },
    {
      heading: "TypeScript — typescriptlang.org 의 핸드북과 참고서를 따라 읽은 아흔여덟 장",
      from: "ts",
      entries: [
        {
          term: "정적 타입 검사 (static type checking)",
          body: "코드를 실행하지 않고 값의 종류가 맞는지 확인하는 일. JavaScript는 실행해야 아는 동적 언어이고 TypeScript는 그 위에 정적 검사를 더한다. 잡는 것은 예외(호출 불가)뿐 아니라 '예외가 아닌 실패'(없는 속성 읽기 → undefined)까지. 타입은 검사 뒤 지워져 런타임 동작을 바꾸지 않는다 — 실제로 tsc 출력에서 : number 가 사라졌다.",
        },
        {
          term: "검사기와 변환기 (check vs emit)",
          body: "tsc 한 번에 일어나는 두 일. 검사는 약속의 모순을 에러로, 변환은 타입을 지우고 문법을 낮춰 .js 로. 둘은 독립적이라 에러가 있어도 .js 가 나오고(noEmitOnError 로 막음), Babel·esbuild·Vite·Node 의 타입 벗기기는 변환만 한다 — 실제로 타입 에러가 있는 파일이 Babel 에서 조용히 .js 가 됐다. 그래서 CI 에 tsc --noEmit 한 줄이 필요하다.",
        },
        {
          term: "TS 코드 번호",
          body: "에러 앞의 TS2322 같은 번호. 1xxx 문법·파서, 2xxx 타입 검사, 4xxx 선언 emit, 5xxx 컴파일러 옵션(5108 removed, 5112 tsconfig 무시), 6xxx 프로그램 구성(6053 파일 없음, 6306 composite), 7xxx noImplicitAny 계열, 9xxx isolatedDeclarations, 18xxx 최근 추가(18047 possibly null, 18046 unknown). 검색은 문구보다 번호가 정확하다.",
        },
        {
          term: "strict 묶음",
          body: "noImplicitAny · strictNullChecks · strictFunctionTypes · strictBindCallApply · strictPropertyInitialization · strictBuiltinIteratorReturn · noImplicitThis · useUnknownInCatchVariables · alwaysStrict 를 한 번에 켜는 스위치. 6.0 부터 기본 true 라 '안 켰는데 왜 엄격하지' 가 아니라 '옛 tsconfig 에 strict: false 가 남았나' 를 본다. 밖에 있는 것: exactOptionalPropertyTypes · noUncheckedIndexedAccess · noImplicitOverride · noPropertyAccessFromIndexSignature.",
        },
        {
          term: "구조적 타입 (structural typing)",
          body: "이름이 아니라 모양(멤버)으로 호환을 정하는 규칙. 'y 가 x 의 멤버를 전부 가지면 x 자리에 들어간다'. implements 없이도 맞고, 빈 클래스는 모든 것을 받는다(실제로 fn({ k: 10 }) 통과). 유일한 명목적 예외는 private/protected 멤버 — 같은 선언에서 온 것이어야 한다(Types have separate declarations of a private property 'x').",
        },
        {
          term: "초과 속성 검사 (excess property check)",
          body: "객체 리터럴을 타입 자리에 '직접' 쓸 때만 켜지는 오타 방지 검사. Object literal may only specify known properties, and 'z' does not exist in type 'Pt'. 변수에 담았다가 넘기면 구조적 규칙으로 통과한다(실제로 확인). satisfies 도 리터럴이라 같은 검사를 받는다.",
        },
        {
          term: "좁히기 (narrowing)",
          body: "typeof · 진실성 · === · in · instanceof · 대입 · 타입 서술 · kind 비교 같은 값의 검사를 TypeScript 가 읽어 분기 안의 타입을 확정하는 과정. 함정: typeof null 은 \"object\"(실제로 'strs' is possibly 'null'), if (str) 은 \"\" 도 뺀다. 표에 없는 검사는 아무것도 좁히지 않아 타입 서술 함수(x is T)로 표에 추가한다.",
        },
        {
          term: "판별 유니온 (discriminated union)과 never 소진",
          body: "kind: \"circle\" | \"square\" 같은 리터럴 속성으로 객체 유니온을 가르는 설계. switch 의 각 case 에서 멤버 하나로 좁혀지고, default 에 const _x: never = shape 를 두면 멤버가 늘었는데 case 가 없을 때 Type '{ kind: \"tri\"; … }' is not assignable to type 'never' 로 컴파일에서 걸린다(실제로).",
        },
        {
          term: "타입 서술 (type predicate)과 추론 (5.5)",
          body: "반환 타입 자리의 pet is Fish. 참이면 호출 지점에서 그 타입으로 좁힌다. 5.5 부터 x => typeof x === \"number\" 같은 함수는 적지 않아도 (x: unknown) => x is number 로 추론되어 filter 결과가 number[] 가 된다(실제로). 조건: 명시 반환 타입 없음, return 하나, 매개변수 변이 없음. asserts v is string 은 호출 뒤부터 좁히는 단언 함수.",
        },
        {
          term: "넓힘 (widening)과 as const",
          body: "리터럴이 변경 가능한 자리(let, 객체 속성)에 들어가면 string·number 로 넓혀지는 추론 규칙. const c1 = { kind: \"left\" } 의 kind 는 string 이라 \"left\" | \"right\" 자리에 못 들어간다(실제로 TS2345). as const 는 전부 readonly 리터럴로 고정(readonly kind: \"left\", readonly [1, \"a\"]). readonly 튜플은 가변 튜플 자리에 못 들어간다(TS4104).",
        },
        {
          term: "최적 공통 타입과 문맥적 타이핑",
          body: "추론의 두 방향. 아래→위: [0, 1, null] 의 요소 후보에서 (number | null)[] 을 고른다 — 공통 조상(Animal)은 후보가 아니라 (Rhino | Elephant)[] 가 된다. 위→아래: names.forEach((s) => …) 의 s 가 자리의 타입에서 string 으로 흘러 들어온다(실제로). 제네릭 호출은 둘을 동시에 쓰고 NoInfer 는 '이 인자에서는 올리지 말라'.",
        },
        {
          term: "오버로드 (overload)와 구현 시그니처",
          body: "본문 없는 선언 여러 줄(오버로드 시그니처) + 본문 있는 마지막 선언(구현 시그니처). 밖에서는 오버로드만 보여 유니온 값은 어느 것에도 안 맞는다(실제로 No overload matches this call). 지침: 가능하면 유니온 매개변수로, 구체적인 것을 먼저(첫 매치가 뽑힘 — 일반을 앞에 두면 구체는 영원히 안 뽑힌다, 실제로 bad(\"s\") 가 unknown), 끝 매개변수 차이는 선택적으로, infer 와 ReturnType 은 마지막 시그니처만 본다.",
        },
        {
          term: "void 반환 규칙",
          body: "타입으로 선언된 () => void 자리에는 무엇을 돌려주든 함수가 들어가고 결과는 void 로 무시된다(forEach(x => arr.push(x)) 가 되는 이유, 실제로 v() 의 타입 void). 함수 선언에 직접 : void 를 적고 return 42 하면 에러. 콜백 타입에 any 가 아니라 void 를 쓰라는 Do's and Don'ts 가 이 규칙 위에 있다.",
        },
        {
          term: "readonly 는 얕고 호환성에 안 들어간다",
          body: "readonly 는 '이 자리에서 쓰지 말라'는 표시. 안쪽 객체는 바뀌고(home.resident.age++ OK), 호환성 검사는 readonly 를 무시해 쓰기 가능한 참조를 대입할 수 있다. 불변이 필요하면 값 쪽에서(Object.freeze) 또는 깊은 Readonly 타입을 직접. 매핑된 타입의 -readonly 로 벗긴다.",
        },
        {
          term: "제네릭 (generics)과 제약 (extends)",
          body: "타입 자리에 변수를 두고 쓰는 쪽이 채우게 하는 것. 추론은 인자에서(first([1,2]) → number, first([]) → never). 제약 T extends { length: number } 를 벗어나면 Argument of type 'number' is not assignable to parameter of type '{ length: number; }'. 지침 셋: 제약보다 T 자체를, T 는 적게, 한 자리에만 나오는 T 는 없애라. static 은 클래스 T 를 못 쓴다(TS2302).",
        },
        {
          term: "분산 어노테이션 (in / out)",
          body: "타입 매개변수가 반환 쪽에만(out, 공변) · 매개변수 쪽에만(in, 반공변) 쓰인다는 선언(4.7). 문서: '거의 필요 없다', '검사 동작을 바꾸려고 쓰지 마라'. Producer<string> 은 Producer<string | number> 자리에 들어가고 반대는 TS2322(실제로). 순환 타입의 검사 속도와 확정을 위한 힌트.",
        },
        {
          term: "keyof · typeof · 인덱스 접근 (T[K])",
          body: "타입 조작의 '조각 꺼내기' 셋. keyof { x; y } → \"x\" | \"y\", 문자열 인덱서는 string | number(숫자 키도 문자열이라서, 실제로). typeof 는 값→타입의 유일한 다리로 식별자에만(typeof f() 는 파서 에러). T[\"k\"] 의 대괄호는 타입 자리라 const key 는 못 넣고 typeof key 를(TS2538/2749). (typeof arr)[number] 가 요소 타입.",
        },
        {
          term: "조건부 타입과 분배 (distributive)",
          body: "T extends U ? X : Y. 참 분기에서는 T 가 U 모양임을 알아 T[\"message\"] 가 허용된다(밖에서는 TS2536). infer 로 조각을 꺼낸다(Unwrap<Promise<string>> → string). 벗은 타입 매개변수에 유니온을 넣으면 멤버마다 적용되어 ToArr<string | number> → string[] | number[] (실제로); 막으려면 [T] extends [U]. Exclude·Extract·NonNullable 이 이 원리.",
        },
        {
          term: "매핑된 타입 (mapped type)과 키 재매핑 (as)",
          body: "{ [K in keyof T]: … } — 속성에 대한 for 문. 수식어 -readonly · -? 로 벗기고(실제로 Mut<Readonly<Opt>> → { a: number; b: string }), 4.1 의 as 절로 키를 바꾸고(`get${Capitalize<string & K>}`), as 가 never 면 그 키가 빠진다(필터). 임의의 객체 유니온을 돌며 as E[\"kind\"] 로 키를 뽑을 수도 있다. Partial·Pick·Record 의 정체.",
        },
        {
          term: "템플릿 리터럴 타입",
          body: "`${A}${B}` 로 문자열 리터럴을 조합하는 타입. 유니온은 곱이 된다(`${\"click\" | \"focus\"}Event` → 두 개, 실제로). 함수 매개변수 자리에서 거꾸로 추론해 콜백 타입을 맞출 수 있다(`${Key}Changed` → Key). Uppercase·Lowercase·Capitalize·Uncapitalize 는 컴파일러 내장(intrinsic)이라 .d.ts 에 본문이 없고 로캘을 모른다. keyof 는 symbol 때문에 string & keyof T 로.",
        },
        {
          term: "유틸리티 타입 (utility types)",
          body: "lib.d.ts 에 미리 든 스물두 개의 타입 변환 — Partial·Required·Readonly·Record·Pick·Omit(객체), Exclude·Extract·NonNullable(유니온), Parameters·ConstructorParameters·ReturnType·InstanceType·Awaited·ThisParameterType·OmitThisParameter(함수·클래스), NoInfer(5.4)·ThisType·문자열 넷. 전부 매핑된·조건부·infer 로 쓰여 있어 없는 것은 직접 만든다.",
        },
        {
          term: "클래스 필드 초기화와 순서",
          body: "strictPropertyInitialization: 필드는 '생성자 자체 안에서' 초기화되어야(TS2564), 확정 할당 단언 x!: T 로 미룬다. 초기화 순서는 기반 필드 → 기반 생성자 → 파생 필드 → 파생 생성자라 기반 생성자가 this.name 을 읽으면 파생 값이 아직 없다(실제로 \"base\" 출력). implements 는 검사일 뿐 속성을 만들지 않는다(\"pong\" in ball → false).",
        },
        {
          term: "private 과 #private",
          body: "TypeScript 의 private 은 컴파일 때만 — 대괄호 p[\"soft\"] 로 읽히고 런타임엔 보통 속성(Object.keys 에 보임). #hard 는 JavaScript 의 하드 private 으로 런타임에도 밖에서 못 읽고 keys 에 없다(실제로 undefined). ES2021 이하 타깃은 WeakMap 으로 흉내. 모양이 같은 클래스를 구분하는 가장 가벼운 명목적 장치가 private 필드 하나.",
        },
        {
          term: "런타임의 this 와 this 매개변수",
          body: "const f = obj.method; f() 는 this 가 undefined 라 터진다(실제로 Cannot read properties of undefined). 화살표 함수 속성은 바인딩을 유지하되 인스턴스마다 메모리를 쓰고 super 를 못 부른다. this 매개변수(m(this: Counter))는 컴파일 때 The 'this' context of type 'void' is not assignable… 로 잡지만 런타임 보장은 없다.",
        },
        {
          term: "모듈과 스크립트, export {}",
          body: "최상위 import/export 가 하나라도 있으면 모듈(자기 스코프), 없으면 스크립트(전역). 두 스크립트의 같은 이름 const 는 Cannot redeclare block-scoped variable(실제로), export {} 한 줄로 해결. moduleDetection: force 는 전부 모듈로. 전역 .d.ts 에 import 를 넣으면 모듈이 되어 전역 선언이 아니게 된다.",
        },
        {
          term: "import 지우기 (elision)와 verbatimModuleSyntax",
          body: "값으로 쓰이지 않은 import 를 출력에서 빼는 것 — 타입 import 가 런타임 로드를 안 하게. 실제로 import { a, T } 가 import { a } 로. 단일 파일 변환기는 T 가 타입인지 몰라 지울 수 없으므로 5.0 의 verbatimModuleSyntax 는 적은 대로 내보내되 타입에 type 을 강제한다('T' is a type and must be imported using a type-only import…, TS1484). import type 으로 받은 것을 값으로 쓰면 TS1361. 부수 효과 모듈은 import \"./x.js\" 를 따로.",
        },
        {
          term: "호스트 (host)",
          body: "컴파일 출력을 실제로 실행하거나 묶는 것 — Node.js · 브라우저 · 번들러. 'TypeScript 컴파일러 자체는 호스트가 아니다'. module(출력 포맷) · moduleResolution(경로 찾기) 은 호스트가 무엇인지 TypeScript 에 알리는 선언이고, 어긋나면 컴파일은 통과하되 실행이 깨진다 — 실제로 bundler 로 통과한 확장자 없는 import 를 Node 가 ERR_MODULE_NOT_FOUND.",
        },
        {
          term: "module: nodenext 와 파일별 포맷",
          body: "출력 포맷을 파일마다 정하는 모드 — .mts/.mjs 는 ESM, .cts/.cjs 는 CJS, .ts/.js 는 가장 가까운 package.json 의 type. 실제로 같은 설정에서 type: module 폴더는 import 그대로, type: commonjs 폴더는 require()/exports.x =. moduleResolution nodenext · target esnext · esModuleInterop 이 암묵. Node 에서 돌 코드에 esnext/commonjs 를 적는 것은 '올바르지 않다'. 상대 import 는 .js 확장자 필수(TS2835).",
        },
        {
          term: "moduleResolution: bundler",
          body: "번들러의 느슨한 규칙(확장자 생략 · 디렉터리 index)을 흉내 내는 해석. module 은 esnext/preserve(6.0+ commonjs 도)여야(TS5095). package.json exports 는 읽는다. 라이브러리에 쓰면 export * from \"./utils\" 가 .d.ts 에 남아 Node 사용자에게서 깨지는 '전염성'. classic · node10 은 7.0 에서 제거.",
        },
        {
          term: "지정자는 변환되지 않는다",
          body: "출력의 import 문자열은 입력과 같다 — TypeScript 가 ./a.ts 를 ./a.js 로 바꿔 주지 않는다. 그래서 Node ESM 소스에 .js 를 적어야 하고(nodenext 가 TS2835 로 강제), .ts 를 적으려면 allowImportingTsExtensions + noEmit(출력에 .ts 가 남으면 안 되니, TS5096). 유일한 예외가 5.7 rewriteRelativeImportExtensions(실제로 ./a.ts → ./a.js). paths 도 검사만 바꾸고 출력은 그대로(실제로).",
        },
        {
          term: "ESM·CJS 상호운용과 이중 default",
          body: "ES2015 가 ESM→CJS 를 정하지 않아 Babel·TypeScript(esModuleInterop)·Node 가 각자 규칙을 만들었다. 앞의 둘은 __esModule 이 있으면 default 를 벗기고 없으면 module.exports 를 default 로 감싼다, Node 는 항상 module.exports 전체를 default 로. 그래서 TS 가 컴파일한 CJS 를 Node ESM 에서 default import 하면 함수가 .default.default 에(실제로 typeof compiled === \"object\"). 처방: CJS 라이브러리는 default 를 내보내지 말고 export = 또는 named, 라이브러리는 verbatimModuleSyntax.",
        },
        {
          term: "esModuleInterop 과 allowSyntheticDefaultImports",
          body: "후자(1.8)는 검사만 — default 가 없는 모듈의 default import 를 허용. 전자(2.7)는 emit 도 — __importDefault/__importStar 헬퍼로 Babel 과 같은 규칙을 런타임에 만든다. 문서: 'CJS 가 있는 앱은 항상 esModuleInterop', '전자만 켜는 것은 피하라'. 6.0 부터 false 로 둘 수 없다(실제로 Option 'esModuleInterop=false' has been removed).",
        },
        {
          term: "선언 파일 (.d.ts)과 declare",
          body: "구현 없이 모양만 적은 파일. declare 는 '이 이름은 밖에 있다' — var/function/class/namespace/module \"x\"/global, 전부 emit 에 남지 않는다. tsc --declaration 이 만드는 것과 같은 문법(실제로 본문이 사라지고 추론 반환 타입이 적힘). 손으로 쓴 .d.ts 는 '위험하고 실수가 잦다'; 5.5 isolatedDeclarations 는 추론에 기대는 선언을 거부해(TS9007/9016) 다른 도구도 생성할 수 있게.",
        },
        {
          term: "export = 와 세 가지 import",
          body: "CJS 의 module.exports = X 에 대응하는 선언. 모듈 자체가 함수·클래스일 때(템플릿 module-function/class). 소비자는 import x = require() · default import(interop) · import * as(객체일 때만) 중 환경에 맞게 — 실제로 nodenext CJS 에서 셋 다 통과, 함수를 namespace import 로 받으면 호출 불가(WRONG! DO NOT DO THIS!). module esnext 에서 import = require 는 TS1202.",
        },
        {
          term: "선언 병합 (declaration merging)과 세 칸",
          body: "모든 이름은 네임스페이스·타입·값 세 칸 중 하나 이상을 채운다(class·enum 은 타입+값, interface·type 은 타입, function·변수는 값, namespace 는 네임스페이스+값). 같은 칸을 둘이 채우면 충돌(class+class, type+무엇이든 → Duplicate identifier), 다른 칸이거나 합치기가 정의된 것(interface+interface 멤버 합치고 함수는 오버로드로, namespace+function/class/enum)은 병합. 모듈 보강(declare module \"x\")·전역 보강(declare global)이 실전 — 패치만, 새 최상위 선언 불가.",
        },
        {
          term: "@types 와 6.0 의 types: []",
          body: "DefinitelyTyped 가 @types/이름 으로 배포하는 선언. 패키지가 자기 types 필드를 가지면 불필요. 모듈 @types 는 import 때 해석되지만 전역 @types(node·jest)는 프로그램에 넣어야 하는데, 6.0 부터 types 기본값이 [] 라 자동으로 안 들어온다 — 설치했는데 Cannot find name 'process'… then add 'node' to the types field in your tsconfig(TS2591). \"types\": [\"*\"] 가 옛 동작.",
        },
        {
          term: "checkJs · @ts-check · JSDoc",
          body: ".js 를 검사하는 세 스위치. allowJs 는 넣고 변환만(에러 0, 실제로), checkJs 또는 파일 첫 줄 // @ts-check 는 검사, // @ts-nocheck 는 제외. 타입은 JSDoc 으로 — @type·@param·@returns·@typedef·@template·@satisfies·@import(5.5). .js 는 적을 자리가 없어 관대하다(열린 객체 리터럴, 매개변수 기본 선택적, null 초기화는 any)가 JSDoc 하나로 .ts 규칙이 된다. @ts-expect-error 는 에러가 없으면 그 자체가 에러(TS2578).",
        },
        {
          term: "tsconfig: files · include · exclude · extends",
          body: "files 는 허용 목록(없으면 TS6053), include 는 glob, exclude 는 include 가 찾은 것만 걸러 import·types·reference·files 로는 들어온다(실제로 exclude 한 gen/g.ts 가 import 로 들어와 에러 보고). extends 는 compilerOptions 를 물려받되 files/include/exclude 는 교체, references 는 상속 안 됨, 5.0 부터 배열. --showConfig 로 최종 결과 확인. 명령줄에 파일을 적으면 tsconfig 무시 → 6.0 은 TS5112 에러, --ignoreConfig 로만.",
        },
        {
          term: "6.0 기본값 전환과 7.0 제거",
          body: "6.0: strict true · module esnext · target 그해 ES(es2025) · types [] · rootDir . · noUncheckedSideEffectImports true · libReplacement false, 그리고 폐기 예고. 7.0: 폐기된 것 전부 에러 — target es5 · module amd/umd/system/none · moduleResolution classic/node10 · baseUrl · outFile · downlevelIteration · esModuleInterop false · alwaysStrict false(실제로 전부 Option '…' has been removed). 옛 글의 tsconfig 를 복사할 때 먼저 볼 표.",
        },
        {
          term: "프로젝트 참조 (project references)와 tsc -b",
          body: "tsconfig 의 references 로 다른 프로젝트의 출력 .d.ts 를 import 하고, tsc -b 가 의존 순서대로 오래된 것만 빌드한다(tsbuildinfo, 실제로 두 번째 실행 up to date). 참조되는 쪽은 composite: true(없으면 TS6306) — declaration 켜짐, rootDir 기본 tsconfig 폴더, 모든 파일이 include/files 에(TS6307). 일반 tsc 는 의존을 빌드하지 않는다(TS6305). -b 는 noEmitOnError 처럼. 경계가 .d.ts 로 고정되어 환경마다 tsconfig 가 가능해진다.",
        },
        {
          term: "erasableSyntaxOnly (5.8)와 Node 의 타입 벗기기",
          body: "'지우기만으로 JavaScript 가 되는 문법만' 허용하는 옵션 — enum · 값을 가진 namespace · 매개변수 속성 · import =/export = 를 TS1294 로 막는다(실제로 넷 다). Node 24 는 기본으로 타입을 벗기며(process.features.typescript === \"strip\") enum 을 TypeScript enum is not supported in strip-only mode 로 거부, --experimental-transform-types 면 변환. enum 대신 as const 객체를 권하는 배경.",
        },
        {
          term: "TypeScript 7.0 (Go 네이티브)",
          body: "컴파일러를 Go 로 옮긴 메이저. 구조·로직은 원본을 따라 검사 결과는 6.0 과 같게, 공유 메모리 멀티스레딩으로 전체 빌드 8~12× 빠름(vscode 125.7s → 10.6s), --checkers(기본 4) · --builders · --singleThreaded. npm i typescript 그대로(실제로 7.0.2, bin/tsc + dist, lib 에는 .d.ts 만). 안정된 프로그래밍 API 는 7.1 예정이라 vue-tsc·ts-loader 등은 6.0 API(@typescript/typescript6) — 이 허브의 추론 타입 꺼내기도 6.0.3 으로 했다.",
        },
      ],
    },
    {
      heading: "Git — Pro Git 과 GitHub 문서로 세운 일곱 단계의 낱말",
      from: "git",
      entries: [
        {
          term: "세 개의 트리 (HEAD · Index · Working Directory)",
          body: "Pro Git 의 Reset Demystified 가 세 공간을 부르는 이름. HEAD 는 마지막 커밋의 스냅샷(다음 커밋의 부모), Index 는 다음 커밋으로 제안된 스냅샷(스테이징), Working Directory 는 모래밭. add 는 WD→Index, commit 은 Index→HEAD. status -s 의 두 칸(왼쪽 Index, 오른쪽 WD)과 diff(Index↔WD)·diff --staged(HEAD↔Index)가 이 셋을 비교한 것. 실제로 add 뒤 또 고치면 MM.",
        },
        {
          term: "블롭 · 트리 · 커밋 객체",
          body: "git 저장소의 세 객체. 블롭은 파일 내용(이름 없음), 트리는 디렉터리 항목(모드·종류·해시·이름), 커밋은 트리 하나·부모·작성자·메시지. 전부 내용의 SHA-1 로 이름이 붙어 같은 내용은 어디서나 같은 해시(echo 'a' → 7898192…). 커밋은 변경분이 아니라 스냅샷을 가리키고, 안 바뀐 파일은 같은 블롭을 다시 가리킨다. git cat-file -p 로 열어 본다.",
        },
        {
          term: "브랜치 = 이름표 (41바이트 파일)",
          body: ".git/refs/heads/<이름> 에 커밋 해시 한 줄(40자 + 줄바꿈). 브랜치를 만드는 일은 파일 하나를 쓰는 일이고 커밋하면 그 파일의 해시가 바뀐다. 브랜치에 부모는 없다 — 부모가 있는 것은 커밋. HEAD 는 .git/HEAD 의 'ref: refs/heads/master' 로 '어느 이름표 위에 있나', 해시가 직접 들어가면 detached HEAD(실제로 'HEAD detached at 5fd1dc1').",
        },
        {
          term: "도달 가능성 (reachability)",
          body: "어느 이름표(브랜치·태그·원격 추적·reflog)에서든 부모 사슬을 따라 갈 수 있는가. log 가 보여 주는 것, branch -d 가 지워 주는 것(끝 커밋이 현재 브랜치에서 닿아야), push 가 보내는 것(브랜치에서 닿되 원격에 없는 것), gc 가 남기는 것이 전부 이 하나의 기준. 이름표를 떼면 커밋은 '존재하되 도달 불가'가 된다.",
        },
        {
          term: "범위 문법 (.. 과 ...)",
          body: "A..B 는 B 에서 닿고 A 에서는 안 닿는 커밋(PR 의 Commits 탭 = base..head, push 가 보낼 것 = origin/x..HEAD). A...B 는 한쪽에서만 닿는 전부(--left-right 로 < > 표시). diff 에서는 뜻이 다르다 — A..B 는 두 끝 비교, A...B 는 merge base 와 B 비교(PR 의 Files changed). 실제로 base 가 파일을 더한 뒤 두 점은 그 파일을 '삭제'로 보였다.",
        },
        {
          term: "reset 세 가지와 WD 안전성",
          body: "reset 은 (1) 이름표 이동 → --soft 는 여기서 멈춤 (2) Index 를 HEAD 처럼 → --mixed(기본) 멈춤 (3) WD 까지 → --hard. 실제로 --soft 뒤 'A  x.txt', --mixed 뒤 '?? x.txt', --hard 뒤 파일 없음. 'WD Safe?' 가 NO 인 것은 --hard 와 checkout <paths> 둘뿐. 경로를 주는 reset <file> 은 이름표를 옮기지 않고 그 파일만 unstage (= restore --staged).",
        },
        {
          term: "reflog 와 gc 기한",
          body: "HEAD(와 각 브랜치)의 이동 기록. 지운 브랜치·잘못한 reset --hard 의 커밋 해시가 'commit: x' 로 남아 git branch <name> <sha> 로 되살린다. 로컬 전용(push 안 됨). 기본 보존은 도달 가능 항목 90일(gc.reflogExpire) · 도달 불가 30일(gc.reflogExpireUnreachable), 그 뒤 gc 가 치운다 — 실제로 expire + gc --prune=now 뒤 'could not get object info'. 마지막 길은 fsck --lost-found 의 dangling commit.",
        },
        {
          term: "원격 추적 브랜치 (origin/x)와 upstream",
          body: "refs/remotes/origin/x — 마지막으로 원격과 통신했을 때 원격 x 가 가리키던 커밋의 기록. 읽기 전용이라 거기서 커밋 못 함. fetch 가 이것만 옮기고 로컬 브랜치는 안 옮긴다('fetch 했는데 뒤처짐'). upstream 은 로컬 브랜치의 짝(.git/config 의 branch.x.remote/merge) — 없으면 'fatal: The current branch x has no upstream branch.' · 'There is no tracking information for the current branch.' branch -vv 의 ahead/behind 는 마지막 fetch 기준.",
        },
        {
          term: "non-fast-forward 거절",
          body: "원격의 이름표가 내 이름표의 조상이 아닐 때(동료가 먼저 push) push 가 '! [rejected] master -> master (fetch first)' 로 막히는 것. 처방은 pull --rebase(내 커밋을 원격 끝으로) 또는 merge 뒤 push. --force-with-lease 는 원격이 내가 본 그대로일 때만 덮어쓰고, 그새 바뀌면 '(stale info)' 로 거절 — 남의 커밋을 지우는 사고를 막는다.",
        },
        {
          term: "fast-forward · 병합 커밋 · squash",
          body: "상대가 내 후손이면 이름표만 이동(Updating a..b / Fast-forward). 양쪽에 커밋이 있으면 merge base 와 두 끝의 3-way 병합으로 부모 둘인 병합 커밋(Merge made by the 'ort' strategy — 2.55 기본 전략). --no-ff 는 후손이어도 병합 커밋을 만든다(GitHub 의 Create a merge commit). --squash 는 상대 변경을 한 덩어리로 Index 에 담고 멈춰(not updating HEAD) 부모 하나인 커밋이 되고, 원래 커밋은 닿지 않아 branch -d 가 거절한다(GitHub 의 Squash and merge 뒤 보는 것).",
        },
        {
          term: "충돌 (conflict)과 표시",
          body: "merge base 기준으로 같은 자리를 양쪽이 다르게 고쳤거나 한쪽은 고치고 한쪽은 지웠을 때만. 'CONFLICT (content): Merge conflict in a.txt' · 'Automatic merge failed; fix conflicts and then commit the result.' status --short 는 UU. 파일에 <<<<<<< HEAD / ======= / >>>>>>> topic, diff3 스타일이면 ||||||| base 도. 그때의 git diff 는 결합 diff(diff --cc, @@@). 풀고 add → commit(merge) 또는 rebase --continue, 그만두면 --abort(진행 중이 아니면 'There is no merge to abort (MERGE_HEAD missing).').",
        },
        {
          term: "rebase 와 'The Perils of Rebasing'",
          body: "내 커밋을 상대 끝에서 하나씩 다시 만드는 것 — 같은 내용, 새 해시(실제로 12686bd → 62e7c36), 한 줄 이력. 충돌은 커밋 단위로 멈춘다('error: could not apply d61f7a0…'). Pro Git 의 굵은 규칙: '내 저장소 밖에 있고 남이 그 위에 작업했을 수 있는 커밋은 rebase 하지 마라'. 로컬 커밋만, push 는 --force-with-lease. rebase -i 는 pick·reword·edit·squash·fixup·drop 으로 이력을 다듬는다.",
        },
        {
          term: "revert 와 -m 1",
          body: "반대 변경을 새 커밋으로 쌓아 공유 이력을 보존하는 되돌리기. 병합 커밋은 어느 부모 기준인지 -m 1 이 필요하다('is a merge but no -m option was given'). 병합을 revert 한 뒤 같은 브랜치를 다시 merge 하면 'Already up to date' 라 그 revert 를 다시 revert 해야 한다(Advanced Merging). push 된 커밋의 되돌리기는 reset 이 아니라 이것.",
        },
        {
          term: "stash",
          body: "추적 파일의 수정과 담긴 것을 스택에 치우고 WD 를 깨끗하게. untracked 는 -u, ignored 까지는 --all. pop 은 적용 뒤 제거하고 담겼던 것은 기본으로 '수정' 상태로 돌아온다(--index 면 유지). 실제로 'Saved working directory and index state WIP on master: …' → stash@{0}. git clean 은 untracked 를 지우고 되찾을 수 없으니 -n 으로 먼저.",
        },
        {
          term: "PR 의 세 버튼과 로컬 명령",
          body: "Create a merge commit = merge --no-ff(부모 둘, 로컬 -d OK). Squash and merge = merge --squash + commit(부모 하나, 원래 커밋이 닿지 않아 -d 거절 → -D). Rebase and merge = base 끝에 다시 만들어 ff(해시 변경, 커미터 정보 변경). GitHub 문서: squash 는 수명 짧은 브랜치에, 같은 head 를 계속 쓰면 같은 충돌 반복. PR 은 git 이 아니라 GitHub 의 기능이고 diff 는 세 점(merge base 기준).",
        },
      ],
    },
  ],
};

export function getDictionary(id: string): Dictionary | undefined {
  return id === dictionary.id ? dictionary : undefined;
}
