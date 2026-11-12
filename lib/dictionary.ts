import { dictionarySections } from "./catalog";

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

/** 문서마다의 낱말 — 절 이름과 순서는 catalog의 dictionarySections가 쥔다 */
const entriesByDocument: { from: string; entries: DictEntry[] }[] = [
    {
      from: "vg-start-intro",
      entries: [
        {
          term: "사용자 인터페이스 (user interface, UI)",
          body: "사람과 프로그램이 만나는 면입니다. 프로그램 안쪽의 데이터와 계산은 사람 눈에 보이지 않습니다. 그래서 버튼, 입력칸, 목록처럼 보고 만지는 부분을 따로 둡니다. 말 그대로 inter(사이)와 face(면), 즉 두 세계 사이의 면입니다. 검색 가능한 셀렉트 컴포넌트라면 options 배열이 안쪽이고, 그 배열을 보여 주는 드롭다운이 면입니다.",
        },
        {
          term: "위에 구축된다 (built on top of)",
          body: "있는 것을 대체하지 않고 그대로 쓰면서 한 층을 얹는다는 뜻입니다. Vue의 템플릿은 HTML에 @click 같은 몇 가지를 더한 것입니다. 스타일은 그냥 CSS, 로직은 그냥 JS입니다. 새 언어를 배우기보다 아는 언어에 낱말 몇 개를 더하는 쪽입니다. Flutter처럼 HTML과 CSS 없이 자기 위젯으로 화면을 그리면 '위에'가 아닙니다. 첫 문장에 이 말이 있어야 뒤의 '빌드 없이 정적 HTML 강화'가 성립합니다.",
        },
        {
          term: "선언적 (declarative)",
          body: "'무엇이어야 하는가'를 적는 방식입니다. 반대말은 '무엇을 하라'를 순서대로 적는 명령적(imperative) 방식입니다. 명령적으로 쓰면 값이 바뀔 때마다 화면을 고치라고 다시 시켜야 합니다. 한 번 빠뜨리면 화면과 데이터가 어긋납니다. 선언적으로 쓰면 값이 저기 들어간다고만 적습니다. 언제 어떻게 고칠지는 프레임워크가 맡습니다.",
          code: "// 명령적 — 순서대로 시킨다\nconst el = document.querySelector('#count');\nel.textContent = 'Count is: ' + count;\nbutton.addEventListener('click', () => {\n  count++;\n  el.textContent = 'Count is: ' + count; // 바뀔 때마다 내가 다시 시켜야 한다\n});\n\n// 선언적 — 결과 모양만 적는다\n<button @click=\"count++\">Count is: {{ count }}</button>",
        },
        {
          term: "프로그래밍 모델 (programming model)",
          body: "코드를 어떤 단위와 규칙으로 짤지 정하는 생각의 틀입니다. v-model의 model과는 다른 말입니다. '컴포넌트 기반 프로그래밍 모델'은 화면을 컴포넌트 단위로 쪼개고, 컴포넌트끼리는 props와 이벤트로만 주고받는다는 틀입니다. 그러니 이 구절은 'Vue 위에서는 선언적으로, 컴포넌트 단위로 짜게 된다'는 말입니다.",
        },
        {
          term: "복잡도 (complexity)",
          body: "프레임워크가 필요해지는 이유입니다. 버튼 하나짜리 화면은 명령적으로 짜도 됩니다. 상태가 열 개, 화면 조각이 백 개가 되면 사정이 다릅니다. '이게 바뀌면 저기도 고쳐야 한다'는 연결이 사람이 못 따라갈 만큼 늘어납니다. 선언적으로 쓰면 그 연결을 프레임워크가 추적합니다. 컴포넌트로 쪼개면 한 번에 볼 범위가 줄어듭니다. '복잡도와 상관없이'는 작든 크든 같은 방식으로 짤 수 있다는 뜻으로, 다음 절 '점진적 프레임워크'의 예고입니다.",
        },
        {
          term: "효율적으로 (efficiently)",
          body: "여기서 효율은 실행 속도가 아니라 개발자의 수고를 말합니다. 명령적 코드는 갱신 한 줄만 빠뜨려도 화면과 데이터가 어긋납니다. 선언적으로 쓰면 그런 실수가 아예 없어집니다. 첫 문장이 말하는 효율이 이것입니다.",
        },
      ],
    },
    {
      from: "i18n",
      entries: [
        {
          term: "i18n과 l10n (internationalization, localization)",
          body: "i18n은 프로그램이 어느 언어에도 대응하게 만드는 일로, 개발자가 합니다. l10n은 특정 언어와 지역에 맞춰 실제 문장과 형식을 채우는 일로, 번역가가 합니다. 가운데 숫자는 첫 글자와 끝 글자 사이의 글자 수입니다. 두 사람이 서로의 일을 건드리지 않도록 경계를 다듬어 온 과정이 열네 단계의 줄거리입니다.",
        },
        {
          term: "로케일 (locale)",
          body: "언어와 지역을 합쳐 부르는 이름표입니다. ko는 한국어, en-US는 미국 영어, zh-Hant는 번체 중국어입니다. 언어만으로는 모자랄 때가 있어 지역을 붙입니다. 같은 영어라도 날짜 순서가 달라, 미국은 11/20/2026, 영국은 20/11/2026으로 씁니다. 사전을 고르는 열쇠이자, 날짜와 숫자 형식을 고르는 열쇠입니다.",
        },
        {
          term: "BCP 47",
          body: "로케일 이름을 적는 웹 표준입니다. 언어와 지역을 하이픈으로 잇습니다(ko-KR, pt-BR). 옛 유닉스(POSIX) 방식은 밑줄을 썼습니다(ko_KR, pt_BR). Vue I18n은 하이픈 단위로 잘라 가며 폴백합니다. 그래서 밑줄을 쓰면 잘리지 않아 pt_BR이 pt로 내려가지 못합니다.",
        },
        {
          term: "열쇠와 값 (key, value)",
          body: "사전의 왼쪽과 오른쪽입니다. 코드가 들고 오는 것이 열쇠, 사용자가 보는 것이 값입니다. 열쇠로 무엇을 쓰느냐가 1~4단계의 역사입니다. 번호(2단계), 영어 문장(3단계), cart.checkout 같은 이름표(4단계) 순입니다. 열쇠가 문장과 너무 멀면 읽을 수 없고, 너무 가까우면 문장을 고칠 때 열쇠가 깨집니다.",
        },
        {
          term: "gettext, msgid, msgstr",
          body: "1995년 GNU가 표준화한 번역 도구 모음입니다. 코드에 _('Checkout')처럼 영어 원문을 그대로 쓰고, 실행 중에 현재 언어 사전에서 그 문장을 찾습니다. 사전(.po 파일)의 한 항목은 msgid(열쇠, 영어 원문)와 msgstr(값, 번역)의 쌍입니다. msgstr가 비면 msgid가 그대로 보이므로, 번역이 빠져도 영어는 나옵니다.",
        },
        {
          term: "폴백 (fallback)",
          body: "고른 사전에 열쇠가 없을 때 대신 볼 사전을 정해 둔 것입니다. 가장 흔한 폴백은 '없으면 영어를 보여라'입니다. Vue I18n은 두 겹으로 내려갑니다. 먼저 zh-Hant-TW → zh-Hant → zh처럼 하이픈을 잘라 가며 저절로 내려갑니다. 그래도 없으면 fallbackLocale에 적은 순서로 내려갑니다. 끝까지 없으면 열쇠 글자가 그대로 화면에 나옵니다.",
        },
        {
          term: "보간 (interpolation)",
          body: "문장 속 빈칸에 값을 끼워 넣는 일입니다. '{name}님의 장바구니'에서 {name}이 빈칸이고, 코드는 t('cart.greeting', { name })처럼 값만 넘깁니다. 빈칸이 문장 어디에 올지는 언어마다 번역가가 정합니다. 코드가 문장을 + 로 이어 붙이면 어순이 다른 언어에서 반드시 틀립니다. 그래서 생긴 장치입니다.",
        },
        {
          term: "복수형 (pluralization)",
          body: "개수에 따라 문장이 바뀌는 규칙입니다. 영어는 item과 items, 러시아어는 1, 2~4, 5 이상으로 갈립니다. 한국어는 갈리지 않습니다. Vue I18n은 문장 안에 세로줄로 후보를 늘어놓고, 숫자를 넘겨 고르게 합니다. 어느 숫자가 어느 범주(one, few, many, other)에 드는지는 Unicode CLDR이 언어마다 정해 두었습니다.",
        },
        {
          term: "Intl (ECMA-402)",
          body: "브라우저에 들어 있는 국제화 표준 라이브러리입니다. 날짜(Intl.DateTimeFormat), 숫자와 통화(Intl.NumberFormat), 복수형 범주(Intl.PluralRules) 등을 로케일에 맞춰 만들어 줍니다. 규칙 데이터는 Unicode CLDR에서 옵니다. Vue I18n의 $d와 $n은 이것을 형식 이름으로 부르는 얇은 껍질입니다. 로케일을 비우고 부르면(toLocaleString()) 코드가 도는 기기의 로케일을 씁니다. 그래서 서버와 브라우저가 다른 글자를 낼 수 있습니다.",
        },
        {
          term: "로케일 협상 (locale negotiation)",
          body: "사용자 언어를 알려 주는 여러 신호 가운데 무엇을 먼저 믿을지 정하는 일입니다. 신호로는 주소의 /en, 전에 고른 값을 담은 쿠키, 브라우저가 보내는 Accept-Language 헤더, 기본값이 있습니다. 보통 직접 적은 주소가 자동으로 온 브라우저 설정을 이깁니다. 순서는 기술이 아니라 제품이 정할 일입니다.",
        },
        {
          term: "Accept-Language",
          body: "브라우저가 모든 요청에 붙여 보내는 HTTP 헤더입니다. 사용자가 OS와 브라우저에 설정한 언어를 선호 순서대로 적습니다(ja-JP,ja;q=0.9,en;q=0.8). 사용자가 직접 고른 값이 아니라 기기 설정입니다. 그래서 영어 OS를 쓰는 한국 사람에게는 틀린 신호가 됩니다.",
        },
        {
          term: "반응형 전환 (reactive locale)",
          body: "locale이 보통 변수가 아니라 Vue의 ref라는 뜻입니다. t 함수는 안에서 locale.value를 읽습니다. 그래서 템플릿에서 t를 쓴 컴포넌트는 그 값을 지켜봅니다. 드롭다운이 locale.value = 'en'을 실행하면 Vue가 그 컴포넌트들을 다시 그립니다. 다만 const title = t('…')처럼 문자열에 한 번 담아 둔 값은 따라오지 않습니다.",
        },
        {
          term: "전역 스코프와 로컬 스코프 (global / local scope)",
          body: "어느 사전을 보는지의 범위입니다. createI18n이 만든 사전 하나를 모두가 보면 전역 스코프입니다. 공용 컴포넌트가 자기 문장만 따로 들고 다니면 로컬 스코프입니다. 로컬의 locale은 기본으로 전역을 따라갑니다. 대신 같은 낱말('닫기')이 두 사전에 따로 생깁니다.",
        },
        {
          term: "지연 로딩과 청크 (lazy loading, chunk)",
          body: "처음에는 쓰는 언어의 사전만 받고, 언어를 바꿀 때 그 사전을 따로 받아 오는 방식입니다. 번들러는 import()로 불러오는 파일을 별도 조각(청크)으로 떼어 두고, 그 줄이 실행될 때 받습니다. 1단계의 dist/ko, dist/en과 모양은 비슷합니다. 하지만 코드가 아니라 사전만 갈라지고, 사이트는 하나입니다.",
        },
        {
          term: "메시지 컴파일러 (message compiler)",
          body: "문장 속 {name}, |, @: 같은 문법을 읽어 실행할 수 있는 구조로 바꾸는 부품입니다. 기본 설정에서는 실행 중에 이 일을 하므로 부품도 번들에 들어 있습니다. 9단계는 빌드 때 미리 바꿔 두고(사전 컴파일) 부품을 번들에서 뺍니다. 그 대가로 실행 중에 새로 들어온 문자열(API 응답)은 문법을 풀 수 없습니다.",
        },
        {
          term: "린트와 CI (lint, continuous integration)",
          body: "린트는 코드를 실행하지 않고 읽기만 해서 규칙 위반을 찾는 도구입니다. i18n에서는 사전에 없는 열쇠를 부르는지, 번역을 거치지 않은 글자가 템플릿에 있는지 봅니다. CI는 PR마다 서버에서 자동으로 도는 검사 묶음입니다. 사람이 끄거나 잊을 수 있는 린트를 머지 전에 한 번 더 강제로 돌리는 자리입니다.",
        },
        {
          term: "TMS (translation management system)",
          body: "번역할 문장을 모아 두고 번역가에게 작업 화면을 주는 서비스입니다. Crowdin, Lokalise, Phrase, Weblate 등이 있습니다. 전에 번역한 문장을 다시 쓰는 번역 메모리와, 브랜드 용어를 고정하는 용어집이 들어 있습니다. 작은 팀은 Google Sheets로 같은 일을 합니다. 어느 쪽이든 원칙은 같습니다. 원본은 그 표에 있고, 코드 안의 사전 파일은 표에서 만든 결과물입니다.",
        },
        {
          term: "SSR과 하이드레이션 (server-side rendering, hydration)",
          body: "SSR은 서버가 먼저 HTML을 그려 보내는 방식입니다. 하이드레이션은 브라우저가 그 HTML에 Vue를 붙여 살아 움직이게 하는 과정입니다. 서버가 그린 결과와 브라우저가 다시 그린 결과가 다르면 불일치 경고가 나고 화면이 깜빡입니다. 서버와 브라우저가 로케일을 다르게 정했거나 둘의 Intl 데이터가 다르면 이렇게 됩니다.",
        },
        {
          term: "요청 간 상태 오염 (cross-request state pollution)",
          body: "한 요청의 값이 다른 요청으로 새는 사고입니다. 서버 프로세스 하나는 여러 요청을 동시에 처리합니다. 그런데 모듈 맨 위에 하나만 만든 객체(싱글턴)를 요청마다 바꿔 쓰면 이 사고가 납니다. 흔한 예가 i18n 인스턴스입니다. 한국어 요청이 데이터를 기다리는 사이 영어 요청이 locale을 바꾸면, 한국어 사용자가 영어 HTML을 받습니다. 요청마다 인스턴스를 새로 만들어 피합니다.",
        },
        {
          term: "Vary 헤더",
          body: "같은 주소라도 특정 요청 헤더가 다르면 다른 응답으로 따로 저장하라고 캐시에 알리는 응답 헤더입니다. 주소에 언어가 없고 쿠키로 언어를 정하는 사이트는 Vary: Cookie를 붙여야 합니다. 안 붙이면 CDN이 첫 사람의 한국어 HTML을 저장해 다음 영어 사용자에게 돌려줍니다.",
        },
        {
          term: "MessageFormat 2 (MF2)",
          body: "Unicode가 만든 메시지 문법 표준입니다. 라이브러리마다 다른 문법({name}, {{name}}, %s)을 하나로 모으려는 것입니다. 변수는 {$name}로 적고 복수형은 .match로 고릅니다. 날짜와 숫자 형식도 문장 안에서 정합니다. 표준은 안정판이 됐지만 브라우저 내장(Intl.MessageFormat)은 TC39 1단계입니다. Vue I18n은 아직 읽지 못합니다.",
        },
        {
          term: "시간대 (time zone)",
          body: "지구를 세로로 나눈 시간 구역입니다. Asia/Seoul처럼 도시 이름으로 적습니다. 언어와는 별개의 축이라, locale이 ko인 사용자가 뉴욕에 있을 수 있습니다. Intl.DateTimeFormat은 timeZone 옵션을 locale과 따로 받습니다. 넘기지 않으면 코드가 도는 기계의 시간대로 찍습니다.",
        },
        {
          term: "Intl.Collator와 Intl.Segmenter",
          body: "Collator는 그 언어의 사전 순서로 글자를 비교하는 Intl 기능입니다. 배열의 sort()는 코드 번호 순서라 대문자가 소문자보다 앞에 옵니다. Segmenter는 문자열을 사람이 보는 글자(그래핌)나 낱말 단위로 나눕니다. length는 UTF-16 단위 수라서 가족 이모지 하나가 8이 됩니다.",
        },
        {
          term: "한중일 통합 한자 (Han unification)",
          body: "유니코드가 한국, 중국, 일본의 한자를 한 코드로 합쳐 둔 것입니다. 같은 코드라도 나라마다 획 모양이 다릅니다. 글꼴은 html의 lang 속성을 보고 어느 모양으로 그릴지 정합니다. lang이 틀리면 글자는 맞아도 모양이 낯설어집니다.",
        },
        {
          term: "RTL과 CSS 논리 속성 (right-to-left, logical properties)",
          body: "RTL은 아랍어나 히브리어처럼 오른쪽에서 왼쪽으로 쓰는 글자 방향입니다. html의 dir=\"rtl\"이 글자 방향과 기본 정렬을 뒤집습니다. CSS 논리 속성은 left, right 대신 start, end로 적는 속성(margin-inline-start 등)이라 dir에 따라 함께 뒤집힙니다. margin-left처럼 방향을 박은 속성은 따라오지 않습니다.",
        },
        {
          term: "유니코드 정규화 (NFC/NFD)",
          body: "같은 글자를 적는 두 방식입니다. '한'은 완성형 한 코드(NFC)로도, ㅎ, ㅏ, ㄴ 세 코드(NFD)로도 적을 수 있습니다. 보기에는 같지만 === 비교는 false입니다. macOS는 파일 이름을 NFD로 저장할 때가 많아, 한글 파일 이름 검색이 어긋나는 사고가 납니다. normalize('NFC')로 한쪽에 맞춥니다.",
        },
        {
          term: "글자 길이 팽창 (text expansion)",
          body: "같은 뜻의 문장도 언어마다 길이가 다른 현상입니다. 독일어와 러시아어는 영어보다 30% 넘게 깁니다. 영어에 꼭 맞춘 버튼이 다른 언어에서 넘치는 까닭입니다. 가짜 로케일로 미리 봅니다.",
        },
        {
          term: "가짜 로케일 (pseudo-localization)",
          body: "테스트용으로 만든 가짜 언어입니다. 영어 문장의 모음에 부호를 붙이고 길이를 늘려 '[Ópén cárt ~~~~]'처럼 만듭니다. 번역을 거친 글자와 안 거친 날글자가 한눈에 갈립니다. 긴 언어에서 레이아웃이 넘치는지도 미리 보입니다. 개발 환경에만 둡니다.",
        },
        {
          term: "missing 핸들러",
          body: "vue-i18n이 사전에서 열쇠를 못 찾을 때 대신 부르는 함수입니다. 어느 언어에서 어느 열쇠가 없었는지를 받습니다. 폴백 단계마다 불리므로, 마지막 폴백 언어에서 불린 것이 진짜 빠진 열쇠입니다. 린트와 타입이 못 보는 것을 실행 중에 잡아 에러 추적 서비스로 보내는 자리입니다.",
        },
        {
          term: "열쇠 유니온 타입 (message key union)",
          body: "사전의 모든 열쇠 경로를 'cart.open' | 'cart.checkout' | …처럼 '이 중 하나'로 묶은 TypeScript 타입입니다. 이 타입만 받는 좁은 t 래퍼를 두면, 열쇠 오타는 물론 변수로 넘기는 열쇠까지 컴파일에서 잡힙니다. 사전 객체에서 템플릿 리터럴 타입으로 펼치거나, 생성 스크립트가 .d.ts로 내보냅니다.",
        },
        {
          term: "트리 셰이킹 (tree-shaking)",
          body: "아무 코드도 부르지 않는 함수와 모듈을 번들러가 결과물에서 빼는 일입니다. Paraglide JS처럼 문장을 함수로 컴파일하면 안 쓰는 문장도 빠집니다. 사전이 객체 하나면 어느 열쇠를 쓰는지 알 수 없어 통째로 남습니다.",
        },
        {
          term: "OTA (over-the-air)",
          body: "다시 배포하지 않고 서버나 CDN에서 내려받아 내용을 바꾸는 방식입니다. 번역에서는 사전을 실행 중에 받아 오는 것을 말합니다. 번역가의 수정이 배포 없이 반영됩니다. 대신 실행 중 의존이 하나 생기고, 코드와 사전의 버전이 어긋날 수 있습니다.",
        },
        {
          term: "in-context 편집",
          body: "번역 도구의 표가 아니라 실제 서비스 화면에서 글자를 눌러 바로 고치는 방식입니다. 번역가는 문장이 어디에 어떻게 보이는지 보며 번역합니다. Tolgee는 Alt+클릭으로 제공합니다.",
        },
        {
          term: "리터럴 (literal)",
          body: "코드에 글자 그대로 적힌 값입니다. t('cart.open')의 'cart.open'은 리터럴이고, t(key)의 key는 변수입니다. 코드를 읽기만 하는 도구(gettext의 추출기, 린트, 타입)는 리터럴만 봅니다. 3단계와 10단계의 사각지대가 같은 까닭입니다.",
        },
        {
          term: "죽은 열쇠 (dead key)",
          body: "사전에는 있는데 코드가 어디서도 부르지 않는 열쇠입니다. 화면에 영향이 없어 눈에 띄지 않습니다. 그래도 번역가는 이것까지 다섯 언어로 옮깁니다. 비용만 드는 문장입니다. no-unused-keys 린트 규칙이 찾아 줍니다.",
        },
        {
          term: "빈 값 (empty string)",
          body: "열쇠는 있는데 값이 \"\"인 것입니다. 라이브러리는 '있음'으로 보고 폴백으로 내려가지 않은 채 빈 글자를 돌려줍니다. 아무것도 안 보이므로, 열쇠가 찍히는 경우보다 늦게 들통납니다. 번역 표의 빈칸을 그대로 JSON으로 만들면 생깁니다.",
        },
        {
          term: "장부가 둘 (two sources of truth)",
          body: "같은 사실을 두 곳에 따로 적어 두는 것입니다. 4단계에서는 코드의 열쇠와 사전의 열쇠, 11단계에서는 번역 표와 JSON 파일이 그 둘입니다. 막는 길은 하나를 다른 하나에서 만들어 내거나(생성), 기계가 자주 맞춰 보는 것(검사)입니다.",
        },
        {
          term: "복수 규칙 (pluralization rules)",
          body: "숫자를 받아 몇째 칸의 문장을 쓸지 정하는 규칙입니다. 영어는 1과 나머지, 러시아어는 1, 21, 31 / 2~4 / 5~20이 다릅니다. Vue I18n의 기본 규칙은 영어식이라 pluralizationRules 옵션으로 언어별 함수를 넣어야 합니다. MF2는 CLDR의 규칙을 가져와 따로 적지 않아도 됩니다.",
        },
        {
          term: "조사 선택 (을/를, 이/가)",
          body: "한국어 조사가 앞말의 받침에 따라 바뀌는 문제입니다. '{name}을 담았습니다'는 '사과을'이 됩니다. 메시지 문법에는 이 분기가 없습니다. 문장을 바꿔 조사를 피하거나, 코드가 마지막 글자의 받침을 보고 고릅니다.",
        },
        {
          term: "ISO 8601 날짜 문자열과 UTC",
          body: "2026-11-11 꼴의 날짜 표기 표준입니다. JavaScript는 날짜만 있으면 UTC 자정으로, 시각이 붙으면 현지 시각으로 읽습니다. 그래서 '2026-11-11'이 로스앤젤레스에서는 11월 10일 저녁이 됩니다. 날짜만 다루는 값은 Date로 바꾸지 말고 글자로 들고 다니는 편이 안전합니다.",
        },
        {
          term: "언어 범위 매칭 (BCP 47 lookup)",
          body: "브라우저가 보낸 en-GB와 사이트에 있는 en을 짝지어 주는 규칙입니다. 지역을 떼어 가며 찾고(en-GB → en), 중국어는 지역을 문자로 바꿔 찾습니다(zh-TW → zh-Hant). 글자 그대로 비교하면 영국 사용자가 기본 언어를 봅니다. 하이픈 앞만 비교하면 대만 사용자가 간체를 봅니다.",
        },
        {
          term: "의존성 추적 (dependency tracking)",
          body: "Vue가 '이 계산은 저 값을 읽었다'를 기록해 두었다가, 저 값이 바뀌면 이 계산을 다시 하는 장치입니다. 템플릿, computed, watch 안에서 읽은 것만 기록됩니다. 그 밖에서 한 번 읽어 변수에 담은 값은 바뀌어도 다시 계산되지 않습니다. 8단계의 버그는 모두 기록되지 않은 자리에서 납니다.",
        },
        {
          term: "콘텐츠 해시 파일 이름 (content hash)",
          body: "빌드가 파일 내용으로 만든 짧은 코드를 파일 이름에 붙이는 것입니다. ja-3f2a.js의 3f2a입니다. 내용이 바뀌면 이름도 바뀌므로 캐시가 옛 파일을 돌려줄 수 없습니다. 대신 배포 전에 열어 둔 탭은 새 파일 이름을 몰라 'Failed to fetch dynamically imported module'이 납니다.",
        },
        {
          term: "eslint-disable 주석",
          body: "린트 규칙을 그 줄이나 파일에서만 끄는 주석입니다. 급할 때 쓰는 장치지만, 끈 줄은 다시 켜지지 않습니다. 저장소에서 이 주석을 세어 보면 그물의 구멍 수가 나옵니다. 끄기보다 규칙에 예외 패턴을 좁게 적는 편이 낫습니다.",
        },
        {
          term: "자동 변환 (auto-format)",
          body: "스프레드시트가 셀의 글자를 날짜, 숫자, 수식으로 알아서 바꾸는 기능입니다. 1/2는 1월 2일, 00123은 123, =로 시작하면 수식이 됩니다. 번역 표에는 해롭습니다. 열을 텍스트 서식으로 두거나, 생성 스크립트가 변환된 값을 거부해야 합니다.",
        },
        {
          term: "요청 스코프 (request scope)",
          body: "서버에서 '이 요청이 끝나면 버려지는 자리'입니다. 그 요청의 사용자에게만 속하는 값(로케일, i18n 인스턴스, API 헤더)을 둡니다. Nuxt에서는 useNuxtApp()으로 꺼내는 것들입니다. 반대로 모듈 맨 위의 const는 프로세스 스코프라 모든 요청이 함께 봅니다.",
        },
        {
          term: "검토 상태 (review state)",
          body: "번역 한 칸이 어느 단계인지 적는 표시입니다. 기계가 채움, 사람이 봄, 검토자가 확인함으로 나뉩니다. gettext는 fuzzy 한 비트로, TMS는 Translated와 Reviewed 상태로 적습니다. 기계가 채우기 시작하면 이 상태 없이는 어느 문장이 사람 눈을 거쳤는지 알 수 없습니다.",
        },
      ],
    },
    {
      from: "render",
      entries: [
        {
          term: "렌더링 (rendering)",
          body: "브라우저가 받은 글자(HTML, CSS, JS)를 화면의 픽셀로 바꾸는 일 전체입니다. 좁게는 마지막 색칠(페인트)만 가리키기도 합니다. 열두 장은 넓은 뜻으로 씁니다. 네비게이션에서 프레임까지입니다.",
        },
        {
          term: "브라우저 프로세스와 렌더러 프로세스",
          body: "브라우저 프로세스는 주소창, 탭, 네트워크, 저장소를, 렌더러 프로세스는 탭 안에 보이는 것을 맡습니다. 사이트마다 렌더러가 따로라 한 탭이 죽어도 다른 탭은 멀쩡합니다. 둘은 메모리를 나누지 않으므로 IPC 메시지로만 주고받습니다.",
        },
        {
          term: "메인 스레드 (main thread)",
          body: "렌더러 프로세스 안에서 자바스크립트 실행, HTML 파싱, 스타일 계산, 레이아웃, 페인트 레코드 만들기를 혼자 다 하는 스레드입니다. 여러 스레드가 DOM을 동시에 만지면 깨지기 때문입니다. 긴 자바스크립트 하나가 탭 전체를 멈추는 까닭이 여기 있습니다.",
        },
        {
          term: "사이트 격리 (site isolation)",
          body: "다른 사이트의 내용은 다른 렌더러 프로세스에 두는 Chrome의 정책입니다. 교차 사이트 iframe도 프로세스를 따로 받습니다. 보안을 위해 메모리를 가르는 대신, 프레임 사이의 통신은 모두 비동기 메시지(postMessage)가 됩니다.",
        },
        {
          term: "브라우징 컨텍스트 (browsing context)",
          body: "문서가 사용자에게 보이는 자리 하나입니다. 탭 하나, iframe 하나가 각각 한 자리입니다. 사양은 이를 WindowProxy와 1:1로 짝짓습니다. 자리가 생기는 순간 realm, Window, about:blank 문서가 함께 만들어집니다.",
        },
        {
          term: "realm (렘)",
          body: "자바스크립트 코드가 사는 세계 하나입니다. Object, Array, Promise 같은 내장 객체 한 벌과 전역 객체가 들어 있습니다. 탭마다, iframe마다 따로입니다. 그래서 iframe에서 받은 배열을 부모의 Array로 instanceof 하면 false입니다. Array.isArray는 realm을 넘어 봅니다.",
        },
        {
          term: "WindowProxy",
          body: "코드가 window라고 부를 때 실제로 받는 손잡이 객체입니다. 안에 진짜 Window를 담고 모든 접근을 넘깁니다. 네비게이션으로 Window가 바뀌어도 WindowProxy는 같은 객체입니다. 그래서 iframe.contentWindow 참조는 그대로인데, 거기 붙인 속성은 사라집니다.",
        },
        {
          term: "전역 객체와 전역 렉시컬 스코프",
          body: "전역에는 층이 둘 있습니다. 전역 객체(Window)에는 var와 function 선언, 웹 API가 속성으로 붙습니다. 전역 렉시컬 스코프에는 let, const, class가 들어갑니다. 뒤의 것은 어디서나 이름으로 부를 수 있지만 window.이름으로는 undefined입니다.",
        },
        {
          term: "이름 접근 (named access on Window)",
          body: "id나 name이 있는 요소를 window.그이름으로 꺼내는 옛 규칙입니다. window의 자체 속성이 아니라, 못 찾았을 때 문서를 뒤지는 마지막 규칙입니다. 같은 이름의 전역 변수가 있으면 변수가 이깁니다. 보통 코드에서는 쓰지 않습니다.",
        },
        {
          term: "readyState와 네 시점",
          body: "문서가 얼마나 채워졌는지 알려 주는 값입니다.\nloading: 채우는 중, body조차 없을 수 있음\ninteractive: 글자를 다 읽음, defer 스크립트 실행, 이어서 DOMContentLoaded 이벤트\ncomplete: 이미지와 iframe까지 도착, load 이벤트\n코드는 자기가 어느 시점에 도는지 알아야 합니다.",
        },
        {
          term: "호환 모드 (quirks mode / standards mode)",
          body: "파서가 첫 줄의 doctype을 보고 정하는 렌더링 규칙입니다. <!doctype html>이 있으면 표준 모드(compatMode 'CSS1Compat')입니다. 없으면 쿼크 모드('BackCompat')가 되어 옛 브라우저의 버그를 흉내 냅니다. 표 안 글꼴 상속, 박스 크기, 이미지 밑 틈이 달라집니다.",
        },
        {
          term: "토크나이저와 트리 구성 (tokenizer, tree construction)",
          body: "HTML 파서의 두 단계입니다. 토크나이저는 글자를 읽어 시작 태그, 끝 태그, 글자 같은 토큰을 내는 상태 기계입니다. 트리 구성기는 토큰을 받아 삽입 모드와 열린 요소 스택을 보고 DOM 노드를 끼웁니다. 틀린 입력도 오류 없이 규칙대로 고쳐 트리를 만듭니다.",
        },
        {
          term: "포스터 페어런팅 (foster parenting)",
          body: "표 안에 있을 수 없는 글자나 요소를 표 바로 앞에 위탁해 끼우는 파서 규칙입니다. 템플릿의 {{ }} 사이 공백이 표 위로 튀어나오는 현상이 이것입니다. 같은 계열의 규칙도 있습니다. <p> 안의 <div>는 p를 닫고 형제가 되고, <table><tr>에는 tbody가 끼어듭니다.",
        },
        {
          term: "프리로드 스캐너 (preload scanner)",
          body: "가벼운 두 번째 스캐너입니다. 메인 파서가 스크립트에 막혀 멈춘 사이 토큰만 훑어, img, link, script의 주소를 찾아 미리 받아 둡니다. DOM은 만들지 않습니다. 그래서 '받는 것'은 일찍, '도는 것'은 파서가 그 태그에 닿은 뒤입니다. JS가 만든 script나 CSS @import는 못 봅니다.",
        },
        {
          term: "파싱을 막는 스크립트 (parser-blocking script)",
          body: "src가 있고 async나 defer가 없는 고전 스크립트와 인라인 스크립트입니다. 파서는 이를 받아 실행할 때까지 다음 토큰을 처리하지 않습니다. 스크립트가 document.write를 하거나 DOM을 읽을 수 있어서 '그 시점까지의 문서'를 멈춰 세웁니다.",
        },
        {
          term: "스크립트를 막는 스타일시트 (script-blocking style sheet)",
          body: "파서가 만든 <link rel=stylesheet>나 <style>이 아직 로딩 중이면 뒤의 스크립트 실행을 막습니다. 스크립트가 getComputedStyle로 스타일을 읽을 수 있기 때문입니다. 그래서 CSS가 늦으면 스크립트가 늦고, 스크립트가 늦으면 파서가 늦습니다. 실제로 696ms가 묶였습니다.",
        },
        {
          term: "async / defer / module",
          body: "셋 다 파서를 막지 않고 받습니다. defer는 파싱이 끝난 뒤 적힌 순서대로, DOMContentLoaded 전에 돕니다. module은 늘 defer입니다. async는 도착하는 즉시, 도착 순서대로 돕니다. 서로 의존하는 파일은 defer, 홀로 도는 것(분석, 광고)은 async로 씁니다.",
        },
        {
          term: "렌더링 차단 (render-blocking)",
          body: "어떤 자원이 올 때까지 첫 화면을 그리지 않는 것입니다. 파서가 만든 스타일시트가 기본으로 이렇습니다. 파서 차단과는 다릅니다. DOM은 만들어지는데 화면에만 올리지 않습니다. 스타일 없는 글자가 먼저 보이는 깜빡임(FOUC)을 피하려는 설계입니다.",
        },
        {
          term: "CSSOM (CSS Object Model)",
          body: "CSS를 파싱해 만든 객체 트리입니다. document.styleSheets 아래에 시트, 규칙, 선언이 있습니다. DOM과는 별개의 트리라서 둘을 합치는 단계(스타일 계산)가 따로 필요합니다. 자바스크립트로 규칙을 넣고 뺄 때도 이 객체를 씁니다.",
        },
        {
          term: "캐스케이드와 특이도 (cascade, specificity)",
          body: "한 속성에 여러 선언이 맞을 때 하나를 고르는 네 단계입니다. 출처와 중요도(!important) → 레이어(@layer) → 특이도(id, 클래스, 요소 수) → 적힌 순서입니다. 특이도만 가지고 싸우면 !important가 쌓입니다. 위 단계인 @layer로 올라가면 끝납니다.",
        },
        {
          term: "계산된 스타일 (computed style)",
          body: "캐스케이드와 상속을 거쳐 요소의 모든 속성에 값이 하나씩 정해진 결과입니다. 적지 않은 속성도 값이 있습니다. getComputedStyle(el)이 돌려줍니다. el.style은 인라인 style 속성에 적힌 것만 보여 줘서 다릅니다.",
        },
        {
          term: "레이아웃 트리 (layout tree)",
          body: "DOM 노드에 계산된 스타일을 입혀 만든 '그릴 상자'의 트리입니다. DOM과 1:1이 아닙니다. display: none은 빠지고, ::before는 들어오고, 날 글자는 익명 상자로 싸입니다. 옛 이름은 렌더 트리입니다. 이 트리의 상자마다 자리와 크기를 정하는 일이 레이아웃입니다.",
        },
        {
          term: "폭은 내려오고 높이는 올라온다",
          body: "블록의 폭은 포함 블록(부모)에서 내려오고, 높이는 안의 내용(줄 수)에서 올라옵니다. 글자 폭은 폰트에서 옆으로 옵니다. 그래서 상자들은 의존 그래프로 묶여 있고, 한 값이 바뀌면 연결된 값이 다시 풀립니다. 부모가 auto일 때 height: 100%가 안 먹는 까닭입니다.",
        },
        {
          term: "강제 동기 레이아웃과 레이아웃 스래싱",
          body: "브라우저는 바뀐 스타일을 모아 다음 프레임에 한 번 레이아웃합니다. 그런데 JS가 offsetWidth 같은 치수를 읽으면 그 자리에서 바로 계산해야 합니다. 쓰기와 읽기를 번갈아 되풀이해 매번 계산하게 만드는 것이 스래싱입니다. 실제로 같은 일이 75배 차이 났습니다.",
        },
        {
          term: "레이아웃 시프트 (layout shift, CLS)",
          body: "늦게 도착한 값(이미지 크기, 웹폰트, 배너) 때문에 이미 그려진 것이 밀려 움직이는 현상입니다. 높이는 아래에서 올라오는데, 올라올 값이 나중에 온 것입니다. 처방은 width와 height 속성, aspect-ratio, 폰트 size-adjust로 자리를 미리 잡는 것입니다.",
        },
        {
          term: "글리프 (glyph)와 셰이핑 (shaping)",
          body: "글리프는 폰트 파일 안의 글자 모양 하나이고 폭(전진 폭)이 붙어 있습니다. 문자와 1:1이 아닙니다. 셰이핑은 문자열을 폰트의 규칙(합자, 결합, 문맥형, 커닝)대로 글리프 열과 위치로 바꾸는 일로 HarfBuzz가 합니다. 한글 자모를 음절 글리프로 모으는 일도 여기서 합니다.",
        },
        {
          term: "폰트 매칭과 폴백 (font matching, fallback)",
          body: "글자마다 font-family 목록을 차례로 훑어, 그 글자의 글리프가 있는 첫 폰트를 고르는 일입니다. 없으면 시스템 폰트로 폴백합니다. 그래서 한 줄에 폰트가 둘 섞일 수 있습니다. 등폭 폰트의 한글은 폴백 폰트의 전각 폭(실제로 영문의 1.44배)이 됩니다.",
        },
        {
          term: "word-break: keep-all과 overflow-wrap: anywhere",
          body: "한국어는 기본(normal)으로 글자 사이 어디서나 끊습니다. keep-all은 공백에서만 끊어 어절을 지키지만, 긴 어절은 상자를 넘칩니다. overflow-wrap: anywhere는 다른 데서 못 끊을 때만 글자 사이를 허용합니다. 둘을 함께 쓰면 어절로 끊되 넘치지 않습니다.",
        },
        {
          term: "font-display와 FOIT / FOUT",
          body: "웹폰트가 오기 전 세 시기(차단, 교체, 실패)의 길이를 정하는 선언입니다.\nblock: 3초까지 빈 글자(FOIT)\nswap: 바로 폴백을 보이다 교체(FOUT)\nfallback: 3초 안에만 교체\noptional: 첫 방문엔 폴백\n교체 순간 폭이 바뀌면 레이아웃 시프트가 납니다.",
        },
        {
          term: "페인트 레코드와 레이어 (paint record, compositing layer)",
          body: "페인트 레코드는 '배경 먼저, 글자, 테두리'처럼 그릴 명령을 순서대로 적은 목록입니다. 메인 스레드는 여기까지만 만듭니다. 레이어는 따로 래스터해 두고, 합칠 때 자리만 바꾸는 그림 조각입니다. transform, will-change, video가 레이어가 되고, 레이어마다 GPU 메모리를 씁니다.",
        },
        {
          term: "래스터와 합성 (rasterization, compositing)",
          body: "래스터는 그릴 명령을 픽셀로 바꾸는 일입니다. 레이어를 타일로 자르면 래스터 스레드들이 GPU 메모리에 비트맵을 만듭니다. 합성은 컴포지터 스레드가 타일을 겹쳐 한 프레임을 만드는 일입니다. 메인 스레드와 따로 돌기 때문에 스크롤, transform, opacity는 JS가 바빠도 매끄럽습니다.",
        },
        {
          term: "태스크와 마이크로태스크 (task, microtask)",
          body: "태스크는 이벤트 루프가 하나씩 꺼내 돌리는 일(클릭 핸들러, setTimeout, 파서 한 조각)입니다. 마이크로태스크는 태스크 직후, 다음 태스크나 렌더링 전에 전부 비우는 작은 일(Promise.then, queueMicrotask, MutationObserver)입니다. Vue는 DOM 갱신을 마이크로태스크에 모아 둡니다.",
        },
        {
          term: "렌더링 기회와 requestAnimationFrame",
          body: "렌더링 기회는 브라우저가 '지금 한 프레임 그릴 때다'라고 보는 순간입니다. 주사율(60Hz면 약 16.7ms)을 따르고, 보이지 않는 탭에는 거의 오지 않습니다. 이때 rAF 콜백 → 스타일 → 레이아웃 → 페인트가 차례로 돕니다. rAF가 레이아웃 앞이라 거기서 쓴 스타일은 그 프레임에 그려집니다.",
        },
        {
          term: "긴 태스크 (long task)",
          body: "메인 스레드를 50ms 넘게 붙잡는 일 하나입니다. 그 프레임은 날아가고 입력도 밀립니다. 사람이 '즉시'로 느끼는 100ms 안에 입력 처리까지 끝내려는 기준에서 나왔습니다. 처방은 쪼개거나 워커로 보내는 것입니다.",
        },
        {
          term: "교차 출처 속성 (cross-origin properties)",
          body: "출처가 다른 프레임의 Window에서 접근이 허용되는 열몇 개입니다. window, self, location, close, closed, focus, blur, frames, length, top, opener, parent, postMessage와 인덱스, 그리고 Location의 href 쓰기와 replace입니다. 나머지는 모두 SecurityError입니다.",
        },
        {
          term: "postMessage",
          body: "출처가 다른 창이나 프레임 사이의 유일한 공식 통로입니다. 받을 출처를 둘째 인자로 적고, 받는 쪽은 message 이벤트의 origin을 확인합니다. 비동기이고 구조화 복제로 복사하므로 함수나 DOM 노드는 못 보냅니다. 사이트 격리 아래에서는 프로세스 사이 IPC입니다.",
        },
        {
          term: "가상 DOM과 패치 (virtual DOM, patch)",
          body: "프레임워크가 메모리에 둔 가벼운 트리입니다. 상태가 바뀌면 새 트리를 만들어 옛것과 비교하고, 다른 부분만 진짜 DOM에 반영합니다. 그 반영이 패치입니다. Vue에서는 상태 변경이 마이크로태스크에 모여 한 번 패치되고, 픽셀은 다음 렌더링 기회에 옵니다. 두 단계로 늦어집니다.",
        },
        {
          term: "하이드레이션 (hydration)",
          body: "서버가 보낸 HTML로 이미 만들어진 DOM에 클라이언트 프레임워크가 가상 트리를 짝지어, 이벤트와 상태를 붙이는 일입니다. 서버 문자열, 파서가 고친 DOM, 클라이언트 vdom 셋이 같아야 합니다. 다르면 불일치 경고가 납니다. 흔한 원인은 Date, 랜덤, 로케일, window 값, 파서가 고치는 중첩입니다.",
        },
      ],
    },
    {
      from: "js",
      entries: [
        {
          term: "엔진 · 명세서 · 호스트",
          body: "엔진은 코드를 실행하는 프로그램입니다(V8, SpiderMonkey). 명세서는 언어의 정답(ECMA-262)이고, MDN은 이를 풀어 쓴 매뉴얼입니다. 호스트는 엔진을 품고 자기 기능(브라우저의 DOM과 fetch, Node의 fs)을 더하는 바깥 프로그램입니다. 값이 이상하면 언어를, 화면이 이상하면 호스트를, 기기마다 다르면 지원 표를 봅니다.",
        },
        {
          term: "엄격 모드 ('use strict')",
          body: "ES5가 옛 동작을 끄려고 넣은 선언입니다. 선언 없는 대입은 에러가 되고, 함수의 this는 window 대신 undefined가 되고, 읽기 전용 대입은 에러를 던집니다. 클래스 본문과 모듈에서는 저절로 켜집니다. 조용한 실패가 소리를 냅니다.",
        },
        {
          term: "형 변환 (type conversion)",
          body: "값을 다른 자료형으로 바꾸는 일입니다. 규칙은 문자열, 숫자, 불린으로 셋뿐인데, 연산자마다 부르는 규칙이 다릅니다. +는 문자열, 다른 산술과 <, ==는 숫자, if와 !는 불린입니다. '0' == false가 true인 것은 숫자 규칙, if ('0')이 참인 것은 불린 규칙 때문입니다.",
        },
        {
          term: "동등 (==)과 일치 (===)",
          body: "==는 형이 다르면 숫자로 바꿔 견주고, ===는 형이 다르면 그냥 false입니다. null과 undefined는 ==에서 서로끼리만 같습니다. 그런데 >=는 null을 0으로 바꿉니다. 그래서 null == 0은 false, null >= 0은 true입니다. ===를 쓰고 x == null만 허용합니다.",
        },
        {
          term: "호이스팅 (hoisting)과 TDZ",
          body: "선언이 스코프 맨 위로 끌어올려진 것처럼 동작하는 규칙입니다. 함수 선언은 몸체까지 올라가 어디서든 부를 수 있습니다. var는 이름만 올라가 값이 undefined입니다. let과 const는 선언 줄 전에 읽으면 ReferenceError(TDZ, 일시적 사각지대)입니다.",
        },
        {
          term: "참조 (reference)와 얕은·깊은 복사",
          body: "변수에는 객체 자체가 아니라 주소(참조)가 들어 있습니다. 복사하면 두 이름이 한 객체를 가리킵니다. 얕은 복사({...o}, Object.assign)는 첫 층만 새 객체이고 안쪽은 공유합니다. 깊은 복사는 structuredClone입니다. {} === {}는 false입니다.",
        },
        {
          term: "this",
          body: "함수가 불릴 때 정해지는 '점 앞의 것'입니다. 정의한 곳이 아니라 부른 모양이 정합니다. 콜백으로 넘기듯 떼어 내 부르면 엄격 모드에서 undefined입니다. 화살표 함수만 자기 this가 없어 바깥 것을 씁니다. call, apply, bind로 직접 정할 수 있지만 화살표에는 이것도 안 통합니다.",
        },
        {
          term: "클로저 (closure)와 렉시컬 환경",
          body: "함수가 만들어진 자리의 변수 장부(렉시컬 환경)를 기억해, 어디서 불리든 그 장부에서 변수를 찾는 것입니다. 값을 복사하지 않고 변수를 가리킵니다. for (var i)로 만든 함수 셋이 모두 마지막 i를 보는 까닭입니다. let은 반복마다 새 장부를 만듭니다.",
        },
        {
          term: "래퍼 객체 (wrapper object)",
          body: "원시값의 메서드를 부르는 순간 엔진이 잠깐 만들어 쓰고 버리는 객체입니다. 'abc'.length가 되는 까닭입니다. 원시값에 붙인 프로퍼티는 임시 객체와 함께 사라지고, 엄격 모드에서는 TypeError입니다.",
        },
        {
          term: "sort의 기본 비교",
          body: "배열 sort()의 기본 비교 함수는 요소를 문자열로 바꿔 사전 순으로 견줍니다. [1, 2, 10, 21].sort()가 [1, 10, 2, 21]이 되는 까닭입니다. 숫자는 (a, b) => a - b를 넘겨야 합니다. sort는 원본을 바꾸고, toSorted는 새 배열을 줍니다.",
        },
        {
          term: "Map · Set · WeakMap",
          body: "Map은 어떤 값이든(객체, NaN) 열쇠로 받고 삽입 순서를 지킵니다. 일반 객체는 객체 열쇠를 '[object Object]' 문자열로 뭉갭니다. Set은 중복 없는 값 모음입니다. WeakMap은 객체 열쇠만 받고, 그 객체가 수거되면 항목도 사라지고 순회가 없습니다. 객체에 데이터를 붙이되 수명을 늘리지 않을 때 씁니다.",
        },
        {
          term: "프로퍼티 설명자 (property descriptor)와 접근자",
          body: "프로퍼티 하나의 모든 것을 적은 객체입니다. 데이터 프로퍼티는 { value, writable, enumerable, configurable }, 접근자 프로퍼티는 { get, set, enumerable, configurable }입니다. 리터럴은 깃발이 모두 true이고, defineProperty는 적지 않은 깃발이 false입니다. Object.keys에 안 보이거나 대입이 조용히 사라지는 것은 모두 깃발 때문입니다.",
        },
        {
          term: "[[Prototype]]과 F.prototype",
          body: "[[Prototype]]은 모든 객체의 숨은 슬롯으로, '못 찾으면 여기서 다시 찾는' 다른 객체를 가리킵니다. 읽기는 사슬을 따라 올라가고, 쓰기는 자기에게만 합니다. F.prototype은 함수의 보통 프로퍼티로, 'new F()가 만든 객체의 [[Prototype]]'이 됩니다. 둘은 이름만 비슷하고 서로 다릅니다.",
        },
        {
          term: "클래스 (class)",
          body: "생성자 함수, prototype 메서드, 사슬 잇기를 한 선언으로 적는 문법입니다. new가 필수이고, 메서드는 non-enumerable, 본문은 엄격 모드이며, #private은 파싱 때 검사합니다. extends는 사슬 두 겹(인스턴스, 정적)을 잇습니다. 자식 생성자에는 super()가 this를 만들 때까지 this가 없습니다. 필드는 자기 생성자 차례에 생깁니다.",
        },
        {
          term: "try..catch와 비동기 에러",
          body: "try는 블록 안이 동기로 도는 '시간'을 감쌉니다. 그 안에서 예약만 하고 나중에 도는 콜백(setTimeout, 이벤트, then)의 에러는 못 잡습니다. 그때는 try가 이미 끝났습니다. 프라미스의 .catch나 async/await로 나중을 try 안으로 끌어와야 합니다. 파싱 에러도 try보다 먼저라 못 잡습니다.",
        },
        {
          term: "커스텀 에러와 다시 던지기",
          body: "class X extends Error { constructor(m) { super(m); this.name = this.constructor.name } }로 종류를 만들고 instanceof로 가립니다. catch는 아는 에러만 처리하고, 모르는 것은 throw e로 올려 보냅니다. 전부 삼키면 진짜 버그가 묻힙니다. 낮은 층의 에러는 cause로 감싸 올립니다.",
        },
        {
          term: "프라미스 (Promise)",
          body: "'한 번 끝나는 나중의 값'입니다. pending → fulfilled/rejected로 한 번만 바뀝니다. 실행자는 즉시 동기, then 핸들러는 늘 마이크로태스크입니다. 체인 어디서 난 에러든 가장 가까운 catch로 갑니다. all은 하나만 실패해도 다 버리고, allSettled는 다 모으고, race는 첫 것, any는 첫 성공입니다.",
        },
        {
          term: "마이크로태스크 큐 (microtask queue)",
          body: "then, catch, finally, queueMicrotask, MutationObserver, await 뒤 코드가 들어가는 줄입니다. 지금 코드가 끝나면 줄을 비우는데, 비우는 동안 들어온 것까지 비운 뒤에야 setTimeout, 이벤트, 렌더링으로 갑니다. 그래서 then은 setTimeout(0)보다 먼저 돌고, 끝없이 자신을 넣으면 화면이 멈춥니다.",
        },
        {
          term: "async / await",
          body: "async는 함수가 늘 프라미스를 돌려주게 하는 표시입니다. await는 프라미스가 끝날 때까지 함수를 멈추고 값을 꺼냅니다. 거부되면 그 줄에서 throw가 되어 try..catch가 받습니다. await 하나가 마이크로태스크 하나입니다. forEach는 반환값을 기다리지 않으니, 순서가 필요하면 for..of를 씁니다.",
        },
        {
          term: "제너레이터 (generator)와 이터레이터 프로토콜",
          body: "function*은 yield에서 멈춰 값을 내보내고 next()로 이어 가는 함수입니다. 돌려주는 객체는 next()가 { value, done }을 주는 이터레이터이자 iterable이라 for..of에 바로 씁니다. 소비자가 당길 때만 값을 만들므로 무한 수열도 됩니다. async function*과 for await는 '여러 번 이어지는 나중'입니다.",
        },
        {
          term: "모듈 (module)과 import/export",
          body: "export나 import가 있는 파일이나 type=module입니다. 늘 엄격 모드, 파일 스코프(전역에 안 붙음), 한 번만 평가(같은 객체 공유)이고 최상위 this는 undefined입니다. 브라우저에서는 늘 defer이고, 외부 모듈은 CORS가 필요합니다. 정적 import는 빌드 때 그래프를, 동적 import()는 실행 때 프라미스로 청크를 받습니다.",
        },
        {
          term: "Proxy와 Reflect",
          body: "Proxy는 객체를 감싸 읽기, 쓰기, 삭제, 열거, 호출을 가로채는 객체입니다(트랩). Reflect는 그 안에서 기본 동작을 하는 함수 묶음이고 receiver로 상속 getter의 this를 바로잡습니다. 내장 객체의 내부 슬롯(Map, #private)은 프록시를 거치지 않아 bind가 필요합니다. Vue 3의 reactive가 이것입니다.",
        },
        {
          term: "속성 (attribute)과 프로퍼티 (property)",
          body: "속성은 HTML에 적은 문자열이고 getAttribute로 읽습니다. 프로퍼티는 DOM 객체의 타입 있는 필드입니다. 표준 속성은 프로퍼티로 반영되지만 value와 checked는 한 방향입니다. 지금 값은 프로퍼티, 처음 값은 defaultValue, 비표준은 data-*와 dataset으로 다룹니다.",
        },
        {
          term: "offsetWidth · clientWidth · scrollWidth",
          body: "요소 크기의 세 가족입니다. offset은 테두리까지 전부, client는 패딩까지(스크롤바 제외), scroll은 보이지 않는 부분까지 내용 전체입니다. scrollTop만 쓸 수 있습니다. 읽으면 레이아웃을 강제합니다(렌더링 7장). getBoundingClientRect는 창 기준이고, 문서 기준은 scrollY를 더합니다.",
        },
        {
          term: "캡처 (capturing)와 버블 (bubbling)",
          body: "이벤트가 지나가는 길의 두 방향입니다. window → 타깃으로 내려가는 캡처(phase 1), 타깃(2), 타깃 → window로 올라오는 버블(3) 순입니다. 핸들러는 기본으로 버블에서, { capture: true }면 캡처에서 불립니다. target은 내내 같고 currentTarget(this)은 단계마다 바뀝니다. focus, blur, mouseenter, scroll은 버블하지 않습니다.",
        },
        {
          term: "이벤트 위임 (event delegation)",
          body: "자식마다 걸지 않고 공통 부모 하나에 핸들러를 건 뒤, event.target.closest로 어느 자식인지 알아내는 패턴입니다. 핸들러가 하나이고 나중에 생긴 자식도 됩니다. 유일한 약점은 중간 요소의 stopPropagation이 길을 끊는 것입니다. 끊는 대신 표시를 남기거나 캡처에 겁니다.",
        },
        {
          term: "기본 동작 (default action)과 preventDefault",
          body: "브라우저가 이벤트 뒤에 스스로 하는 일입니다(링크 이동, 폼 전송, 체크박스 토글, 선택 시작). 핸들러가 동기로 도는 동안 event.preventDefault()를 부르면 막힙니다. await 뒤에 부르면 늦습니다. passive: true는 '막지 않겠다'는 약속이라 스크롤이 기다리지 않습니다. scroll 이벤트는 이미 스크롤된 뒤라 못 막습니다.",
        },
        {
          term: "input 이벤트와 change 이벤트",
          body: "input은 값이 바뀔 때마다(키, 붙여넣기, 음성) 나고, 이미 바뀐 뒤라 막을 수 없습니다. change는 값이 확정될 때 납니다(텍스트는 blur, select와 체크박스는 즉시). 코드로 value를 바꾸면 둘 다 나지 않아 v-model이 모릅니다. 직접 dispatchEvent하거나 상태를 바꿉니다.",
        },
        {
          term: "form.submit() · requestSubmit() · submit 이벤트",
          body: "submit 이벤트는 사용자가 전송할 때 나고 preventDefault로 막을 수 있습니다. form.submit()은 이벤트도 유효성 검사도 건너뛰고 바로 보냅니다. requestSubmit()은 사용자가 누른 것처럼 유효성 → 이벤트 → 전송을 밟습니다. 자바스크립트로 보낼 때는 requestSubmit을 씁니다.",
        },
        {
          term: "DOMContentLoaded · load · beforeunload",
          body: "문서 시계의 눈금입니다. DOMContentLoaded는 DOM 완성(스크립트는 기다림, 이미지는 아님), load는 이미지와 iframe까지 전부입니다. beforeunload는 떠나기 전(확인 창, 문장은 못 정함), unload는 떠날 때입니다(sendBeacon). async 스크립트는 DOMContentLoaded와 무관해서, 그 뒤에 도착하면 리스너가 영영 안 불립니다. readyState를 먼저 봅니다.",
        },
        {
          term: "MutationObserver",
          body: "DOM 노드의 변화(자식, 속성, 텍스트)를 지켜보다 콜백을 부르는 객체입니다. 한 태스크의 변화를 모아 마이크로태스크에서 한 번에 부릅니다. 내가 만들지 않은 변화(서드파티, 프레임워크)에 반응하는 유일한 길입니다. 콜백에서 지켜보는 노드를 고치면 또 불립니다.",
        },
        {
          term: "동일 출처 정책 (Same Origin Policy)과 postMessage",
          body: "스킴, 도메인, 포트가 같은 창끼리만 서로의 window와 document를 만질 수 있습니다. 다른 출처의 창에는 location 쓰기, postMessage, length, closed 등 열몇 개만 됩니다. postMessage는 받을 출처를 적고, 받는 쪽은 e.origin을 확인합니다. 끼우기 거부는 서버 헤더(X-Frame-Options, frame-ancestors)입니다.",
        },
        {
          term: "ArrayBuffer와 뷰 (view)",
          body: "ArrayBuffer는 뜻이 없는 바이트 덩어리입니다. 그 위에 Uint8Array, Uint32Array, DataView 같은 창을 얹어 읽습니다. 같은 4바이트가 Uint8로는 넷, Uint32로는 하나(리틀 엔디언 513, 빅 엔디언 258)입니다. 뷰는 복사본이 아니라 같은 메모리를 봅니다. TextDecoder는 바이트를 글자로(한글 3바이트), Blob은 타입을 붙인 묶음입니다.",
        },
        {
          term: "fetch의 두 단계와 response.ok",
          body: "fetch 프라미스는 헤더가 오면 끝나고 본문은 json(), text()로 따로 한 번만 읽습니다. 404, 500도 응답이라 성공으로 오고 ok가 false입니다. 거부는 네트워크 끊김, CORS, abort뿐입니다. if (!r.ok) throw를 늘 적습니다.",
        },
        {
          term: "CORS와 프리플라이트",
          body: "다른 출처의 응답을 자바스크립트가 읽어도 되는지, 서버가 Access-Control-Allow-Origin 헤더로 허락하는 규칙입니다. 안전하지 않은 요청(PUT, application/json, Authorization)은 OPTIONS 프리플라이트가 먼저 갑니다. Allow-Methods와 Headers로 허락받아야 본 요청이 갑니다. 쿠키는 credentials: 'include' + Allow-Credentials + 정확한 Origin이 필요합니다. 막는 쪽은 브라우저, 푸는 쪽은 서버입니다.",
        },
        {
          term: "쿠키 · localStorage · IndexedDB",
          body: "쿠키는 매 요청 서버로 가는 4KB 글자입니다(세션 ID, httpOnly).\nlocalStorage는 출처별 5MB 문자열로, 탭끼리 공유하고 영구하며 서버로 안 갑니다.\nsessionStorage는 한 탭용입니다.\nIndexedDB는 큰 객체, 파일을 비동기 트랜잭션으로 다룹니다.\n서버가 봐야 하면 쿠키, 여러 탭이면 local, 크거나 객체면 IndexedDB입니다.",
        },
        {
          term: "requestAnimationFrame과 시간 기반 애니메이션",
          body: "브라우저가 다음 프레임 직전에 콜백을 부르는 함수입니다. 주사율에 맞고 숨은 탭에서는 멈춥니다. 진행률은 프레임 수가 아니라 (지금 - 시작) / 전체 시간으로 계산해야 120Hz에서도 속도가 같습니다. transform과 opacity는 컴포지터만 움직여 쌉니다. 시작과 끝으로 적을 수 있으면 CSS에 맡깁니다.",
        },
        {
          term: "커스텀 엘리먼트와 Shadow DOM",
          body: "customElements.define('my-x', class extends HTMLElement)로 만드는 내 태그(하이픈 필수)와 그 안의 숨은 트리입니다. 생명주기는 constructor → attributeChanged → connectedCallback(렌더링은 여기서)입니다. Shadow 경계는 CSS를 양방향으로 막고(CSS 변수와 ::part만 넘음), 바깥 querySelector도 막습니다. 이벤트는 넘지만 target이 호스트로 바뀌고, 커스텀 이벤트는 composed: true여야 넘습니다.",
        },
        {
          term: "파국적 백트래킹 (catastrophic backtracking)",
          body: "수량자가 중첩된 정규식((\\w+\\s?)*)이 지수 시간을 쓰는 현상입니다. 맞지 않는 입력을 만나면 글자를 나누는 모든 방식을 되돌아가며 시도합니다. 문서의 예제 한 줄이 Node 24에서 54초였습니다. 사용자 입력에 쓰면 ReDoS입니다. 같은 글자를 나누는 길이 하나만 되게 패턴을 고치고 입력 길이를 제한합니다.",
        },
        {
          term: "정규식과 한글: \\w · \\b · u 플래그",
          body: "\\w는 라틴, 숫자, _만 잡아 한글이 빠집니다. \\b는 그 경계라 한글 단어 경계를 못 잡습니다. .은 u 없이는 이모지를 두 글자로 봅니다. 한글은 [가-힣]이나 \\p{Script=Hangul}과 u 플래그, 경계는 (?<![가-힣])단어(?![가-힣])로 직접 적습니다.",
        },
      ],
    },
    {
      from: "react",
      entries: [
        {
          term: "렌더 (render)와 커밋 (commit)",
          body: "렌더는 컴포넌트 함수를 불러 '무엇을 보여줄지' 계산하는 단계이고, 커밋은 그 차이를 DOM에 반영하는 단계입니다. 리렌더가 났다고 DOM이 바뀐 것은 아닙니다. 같은 값을 set하면 렌더는 한 번 더 돌지만 커밋은 없습니다. StrictMode는 렌더만 두 번 부르고 두 번째 결과를 버립니다.",
        },
        {
          term: "순수 컴포넌트 (pure component)",
          body: "같은 props, state, 컨텍스트면 같은 JSX를 돌려주고, 렌더 중에 바깥(전역, DOM, props 객체)을 바꾸지 않는 컴포넌트입니다. React가 언제 몇 번 부르든 결과가 같아야 StrictMode, 전환, 컴파일러가 안전합니다. 렌더 중 만든 지역 변수를 바꾸는 것은 괜찮습니다.",
        },
        {
          term: "스냅샷 (snapshot)으로서의 state",
          body: "렌더 한 번 안에서 state는 고정된 값입니다. set(n + 1)을 세 번 불러도 n은 그 렌더의 값이라 +1만 됩니다. set(x => x + 1) 같은 함수형 갱신은 큐를 차례로 밟아 +3이 됩니다. 핸들러 안의 setTimeout도 그 렌더의 스냅샷을 봅니다.",
        },
        {
          term: "묶음 갱신 (batching)",
          body: "같은 틱(이벤트 핸들러, 프라미스, 타임아웃)에서 부른 set들을 모아 렌더 한 번으로 처리하는 것입니다. set(1) set(2) set(3)은 렌더 한 번에 n=3입니다. React 18부터 어디서 부르든 묶입니다. 당장 커밋해야 하면 flushSync를 씁니다.",
        },
        {
          term: "key",
          body: "리스트 항목의 정체를 React에 알리는 문자열입니다. 순서가 바뀌어도 key가 같으면 같은 컴포넌트입니다(state, DOM 유지). key가 바뀌면 새로 마운트합니다(state 초기화). 인덱스를 key로 쓰면 정렬이나 삭제 때 state가 옆 항목으로 샙니다. 같은 자리의 컴포넌트를 강제로 리셋할 때도 key를 바꿉니다.",
        },
        {
          term: "제어 컴포넌트 (controlled)와 비제어 (uncontrolled)",
          body: "value나 checked를 넘기면 React가 값의 주인(제어)입니다. 그래서 onChange로 state를 갱신해야 하고, 없으면 읽기 전용 경고가 납니다. defaultValue나 defaultChecked는 초깃값만 주고 DOM이 주인(비제어)이라 FormData나 ref로 읽습니다. 한 요소는 수명 내내 한쪽이어야 하고, 제어 값은 문자열(null 금지)입니다.",
        },
        {
          term: "Effect와 동기화",
          body: "커밋과 페인트 뒤에 돌아 React 바깥(구독, 타이머, DOM API, 네트워크)과 트리를 맞추는 코드입니다. '마운트 때'가 아니라 '이 의존성으로 동기화를 시작하고, 바뀌면 정리 뒤 다시'입니다. 렌더 중 계산할 수 있는 값(파생 값)이나 사용자 이벤트의 응답에는 쓰지 않습니다.",
        },
        {
          term: "useLayoutEffect",
          body: "useEffect와 같지만 커밋 직후, 페인트 전에 동기로 돕니다. 측정(getBoundingClientRect) 뒤 위치를 바꿔도 사용자는 중간 상태를 못 봅니다. 페인트를 막으므로 측정에만 씁니다. 서버에서는 돌지 않아 경고가 납니다.",
        },
        {
          term: "useEffectEvent",
          body: "Effect 안에서 쓰되 의존성이 되지 않는 '비반응' 로직을 싸는 훅입니다(19 정식). 최신 props와 state를 읽지만 바뀌어도 Effect를 다시 돌리지 않습니다. 채팅방 연결은 roomId에 반응하되 알림 테마에는 반응하지 않게 할 때 씁니다. Effect 안에서만 부릅니다.",
        },
        {
          term: "ref",
          body: "렌더와 상관없이 렌더 사이에 남는 값입니다({ current }). 바꿔도 리렌더가 없고, 렌더 중에 읽거나 쓰면 규칙 위반입니다(refs 린트). DOM 노드를 받는 자리이기도 합니다. 19부터 ref는 보통 prop이라 forwardRef가 필요 없고, ref 콜백은 정리 함수를 돌려줄 수 있습니다.",
        },
        {
          term: "디스패처 (dispatcher)와 훅 순서",
          body: "훅 함수가 '지금 렌더 중인 컴포넌트'를 찾는 내부 객체입니다. 렌더 중이 아니면 null이라, 컴포넌트 밖 훅은 'Cannot read properties of null (reading useState)'를 냅니다. 훅은 이름이 아닌 호출 순서로 슬롯을 받습니다. 그래서 조건, 반복, 조기 return 뒤에서 부르면 슬롯이 뒤바뀝니다. use만 예외입니다.",
        },
        {
          term: "전환 (Transition)과 액션 (Action)",
          body: "startTransition 안의 갱신은 '긴급하지 않다'고 표시됩니다. 그래서 입력 같은 긴급 갱신이 먼저 처리되고 isPending이 true입니다. 전환 중 Suspense는 fallback 대신 옛 내용을 유지합니다. 19에서 async 함수를 넘기면 액션이라 부릅니다. 끝날 때까지 pending이 이어지고, useActionState, useOptimistic, 폼과 묶입니다.",
        },
        {
          term: "useDeferredValue",
          body: "값의 '지연된 사본'입니다. 먼저 옛 값으로 렌더하고 뒤에 새 값으로 다시 렌더합니다. 갱신을 내가 부를 수 있으면 startTransition, 값만 받아 쓰는 자리면 useDeferredValue입니다. 받는 컴포넌트가 memo여야 지연의 이득이 있습니다.",
        },
        {
          term: "Suspense 경계 (boundary)",
          body: "자식 중 하나가 '아직'(lazy 로딩, use의 pending 프라미스)이면 그 영역 전체를 fallback으로 바꾸고, 준비되면 되돌리는 래퍼입니다. 가장 가까운 경계가 받으므로, 경계의 위치가 '누가 함께 기다리나'를 정합니다. 응답이 빨라도 드러내기를 약 300ms 묶어 깜빡임을 막습니다. useEffect의 fetch는 모릅니다.",
        },
        {
          term: "use",
          body: "렌더 중에 프라미스나 컨텍스트를 '읽는' 훅입니다(19). 프라미스가 아직이면 가장 가까운 Suspense가 기다립니다. 다른 훅과 달리 조건이나 반복 안에서도 되지만 try/catch에서는 안 됩니다. 렌더 중 만든 프라미스는 매번 새것이라 cache나 바깥에서 만들어 넘깁니다.",
        },
        {
          term: "StrictMode",
          body: "개발 모드에서만 자식 트리에 추가 검사를 거는 래퍼입니다. 컴포넌트를 두 번 불러 순수성을 보고 Effect를 한 번 더 정리하고 실행해 정리 누락을 봅니다. ref 콜백도 한 번 더 검사합니다(renders 2 · effects 2 · cleanups 1). 운영 빌드에서는 아무것도 안 합니다. 두 번 찍히는 로그는 버그가 아니라 규칙 위반의 신호입니다.",
        },
        {
          term: "memo와 얕은 비교",
          body: "memo(C)는 부모가 렌더될 때 새 props와 옛 props를 각각 Object.is로 비교해, 같으면 C를 건너뜁니다. 렌더마다 새로 만드는 객체, 배열, 함수 prop은 늘 달라 소용이 없습니다(3 vs 1). useMemo나 useCallback으로 참조를 고정하거나 컴파일러에 맡깁니다. state나 컨텍스트 변화는 막지 못합니다.",
        },
        {
          term: "lazy와 코드 분할",
          body: "lazy(() => import('./X'))는 처음 렌더될 때 모듈을 받는 컴포넌트를 만듭니다. 번들러가 import()를 별도 청크로 떼고, 받는 동안 가장 가까운 Suspense의 fallback이 보입니다. 모듈 최상위에 둡니다({ default }를 resolve). 컴포넌트 안에서 만들면 렌더마다 다시 불러옵니다.",
        },
        {
          term: "하이드레이션 (hydration)과 불일치",
          body: "서버 HTML에 React가 이벤트 핸들러를 붙이고 트리를 세우는 일입니다. 다시 그리지 않고 기존 DOM을 자기 것으로 인정하므로, 클라이언트 첫 렌더가 서버 HTML과 같아야 합니다. 다르면(시간, 난수, window 분기, 다른 데이터) 그 트리를 다시 그리고 onRecoverableError로 알립니다. console.error가 아닙니다.",
        },
        {
          term: "포털 (portal)",
          body: "createPortal(children, node)로 React 트리의 위치와 DOM 위치를 떼어 놓는 것입니다. DOM은 body 끝에 있어도 React에서는 그 컴포넌트의 자식입니다. 그래서 컨텍스트를 읽고, 이벤트도 React 부모의 onClick으로 올라갑니다. 서버에는 DOM 노드가 없어 쓸 수 없습니다.",
        },
        {
          term: "flushSync",
          body: "콜백 안의 갱신을 묶지 않고 지금 동기로 커밋합니다. 다음 줄에서는 DOM이 이미 바뀌어 있습니다. window.print처럼 브라우저가 '지금' DOM을 읽는 자리에서만 씁니다. 렌더나 Effect 안에서 부르면 'already rendering' 경고가 납니다. 남발하면 묶음의 이득이 사라지고 Suspense가 fallback으로 튑니다.",
        },
        {
          term: "precedence와 리소스 호이스팅",
          body: "19에서 <title> <meta> <link> <script> <style>은 어디서 렌더해도 head로 올라갑니다. 단 <link rel=stylesheet>와 <style>은 precedence(순서 묶음 이름)가 있어야, <script>는 src + async여야 올라갑니다. 같은 href나 src는 하나로 합쳐집니다. 아니면 보통 태그처럼 제자리에 남습니다. 렌더 뒤 props 변경은 무시되고, 언마운트 뒤에도 남을 수 있습니다.",
        },
        {
          term: "셸 (shell)과 스트리밍 SSR",
          body: "셸은 Suspense 경계 바깥의 모든 것, 즉 바로 보낼 수 있는 첫 HTML입니다. renderToPipeableStream은 onShellReady에서 셸을 보냅니다. 경계 안은 준비되는 대로 <div hidden> + $RC 스크립트로 제자리에 끼웁니다. 셸이 나간 뒤에는 상태 코드를 바꿀 수 없습니다. 셸 자체가 실패하면 onShellError에서 대체 HTML을 보냅니다. renderToString은 기다리지 못해 fallback을 그대로 냅니다.",
        },
        {
          term: "prerender와 postponed",
          body: "prerender는 모든 Suspense가 끝날 때까지 기다려, template과 script 없는 완성 HTML(prelude)을 냅니다(SSG). signal로 중단하면 미완성 경계는 fallback 상태로 남습니다. '어디서 멈췄나'를 담은 불투명 객체 postponed도 생깁니다. 요청 때 resume에 넘기면 그 자리부터 이어 스트리밍합니다(부분 사전 렌더링). 열지 말고 같은 React 버전으로 넘깁니다.",
        },
        {
          term: "useFormStatus와 폼 액션",
          body: "<form action={fn}>에 함수를 넘기면 React가 전환 안에서 FormData로 부르고, 성공하면 비제어 필드를 리셋합니다. useFormStatus는 '자기를 감싼' form의 pending과 data를 읽습니다. 그래서 form을 렌더하는 컴포넌트 자신에서는 늘 false이고, 안의 자식(<SubmitButton/>)에서 읽어야 합니다. 액션의 결과 state는 useActionState로 받습니다.",
        },
        {
          term: "React 컴파일러와 자동 메모이제이션",
          body: "babel-plugin-react-compiler가 빌드 때 컴포넌트를 읽어, '입력이 같으면 재사용'하는 코드(react/compiler-runtime의 c(n) 슬롯)로 바꿉니다. 손으로 쓰던 useMemo, useCallback, memo를 대신합니다. React 규칙을 지킨 함수만 바꾸고, 어긴 함수는 CompileError를 남기고 원문 그대로 둡니다(panicThreshold none). 건너뛴 곳은 logger와 ESLint 플러그인이 보여 줍니다.",
        },
        {
          term: "'use memo'와 'use no memo'",
          body: "함수 몸이나 파일 첫 줄에 두는 컴파일러 지시어 문자열입니다. 'use memo'는 컴파일하라는 뜻이고 annotation 모드에서 필수입니다. 'use no memo'는 건너뛰라는 뜻이고 어느 모드보다 우선합니다(별칭 'use no forget'). 비호환 라이브러리(react-hook-form watch, MobX observer)를 쓰는 동안의 임시 탈출구라, 원인이 풀리면 뗍니다.",
        },
        {
          term: "게이팅 (gating)",
          body: "컴파일러 설정입니다. 같은 컴포넌트의 컴파일판과 원본을 둘 다 번들에 넣고, 런타임 불리언 함수(named export)로 고르게 합니다. isCompilerOn() ? List_compiled : List_original 꼴입니다. 플래그는 모듈 평가 때 한 번만 읽히고 번들도 두 배 가까이 커지므로, 도입기에만 쓰고 뗍니다.",
        },
        {
          term: "컴파일러 진단 (compiler diagnostics)과 린트",
          body: "컴파일러가 '이 함수는 규칙을 어겨 컴파일할 수 없다'고 밝히는 이유입니다. eslint-plugin-react-hooks 7은 같은 분석기를 린트로 감싸, 그 이유('Cannot access refs during render', 'Cannot call impure function during render' 등)를 코드를 쓰는 중에 에디터에 띄웁니다. 컴파일러 없이도 켤 수 있고, 린트가 깨끗하면 컴파일러가 건너뛸 함수도 거의 없습니다.",
        },
        {
          term: "연쇄 렌더 (cascading render)",
          body: "커밋이 끝난 Effect에서 바로 setState를 불러, 방금 그린 화면을 버리고 다시 렌더하는 일입니다. 갱신 한 번이 렌더 두 번이 되고, 중간 상태가 한 프레임 보일 수 있습니다. set-state-in-effect 린트가 잡고, Performance 트랙에는 Cascading update로 보입니다. 다른 state나 props로 계산되는 값은 렌더 중에 파생합니다.",
        },
        {
          term: "레인 (lane)과 Performance 트랙",
          body: "React가 갱신을 우선순위별로 나누는 통로입니다. 동기 갱신은 Blocking, startTransition은 Transition, Suspense 재시도는 Suspense, 남는 시간은 Idle입니다. 19.2의 Performance 트랙은 브라우저 Performance 패널에 Scheduler(레인별 Update, Render, Commit, Effects), Components(컴포넌트별 렌더와 효과), Server 트랙을 그립니다. 개발·프로파일링 빌드(react-dom/profiling)에서만 보입니다.",
        },
        {
          term: "React 규칙 (Rules of React)",
          body: "'지침이 아니라 규칙'인 셋입니다. 컴포넌트와 훅은 순수해야 합니다(멱등, 부수 효과는 렌더 밖, props·state·훅 인자·반환·JSX에 넘긴 값은 불변, 지역 변경은 OK). 컴포넌트와 훅은 React가 부릅니다(직접 호출 X, 훅을 값처럼 X). 훅의 규칙을 지킵니다(최상위, React 함수에서만). 어기면 지금은 돌아도 StrictMode, 컴파일러, 전환, 서버에서 깨집니다.",
        },
        {
          term: "서버 컴포넌트 (Server Component)",
          body: "번들링 전에 서버나 빌드에서 미리 렌더되는 컴포넌트입니다. async로 await하며 DB와 파일을 직접 읽습니다. 코드가 브라우저로 가지 않아 state, Effect, 이벤트가 없습니다. 결과(데이터, JSX)는 클라이언트 컴포넌트에 props로 넘깁니다. 지시어 없이 기본이 서버입니다. React API지만 번들러나 프레임워크가 있어야 돕니다.",
        },
        {
          term: "'use client'와 직렬화 경계",
          body: "파일 첫 줄에 두어 그 모듈과 전이적 의존성을 클라이언트 번들로 표시하는 지시어입니다. 서버 컴포넌트가 이 모듈의 컴포넌트를 렌더하는 곳이 경계입니다. 넘는 props는 직렬화 가능해야 합니다(원시값, Array/Map/Set, Date, 플레인 객체, Promise, JSX, 서버 함수). 일반 함수, 클래스, 인스턴스는 못 넘습니다. 경계는 되도록 아래(leaf)에 둡니다.",
        },
        {
          term: "서버 함수 ('use server')",
          body: "async 함수 몸이나 파일 첫 줄에 두어, 클라이언트가 부를 수 있는 서버 함수로 표시하는 지시어입니다. 함수는 서버에 남고 참조만 넘어가, <form action>, useActionState, startTransition에서 부릅니다. 인자는 클라이언트가 통제하는 공개 엔드포인트이므로 늘 검증하고 권한을 확인합니다. 데이터 가져오기용이 아닙니다. 번들러가 없으면 그냥 문자열입니다.",
        },
        {
          term: "레거시 API (legacy)",
          body: "react가 아직 내보내지만 새 코드에는 권하지 않는 여덟 개입니다. Children, cloneElement, Component, createElement, createRef, forwardRef, isValidElement, PureComponent. 깨진 것이 아니라 '도구가 볼 수 없는 암묵'의 목록입니다. 대안은 함수 컴포넌트 + 훅 + JSX, 자식 대신 배열이나 렌더 prop, 컨텍스트, 그리고 19의 ref prop입니다. 에러 경계 클래스 하나만 예외입니다.",
        },
      ],
    },
    {
      from: "vue",
      entries: [
        {
          term: "반응성 (reactivity)과 추적",
          body: "상태를 읽은 자리를 기록해 두고, 그 상태가 바뀌면 기록된 자리만 다시 실행하는 체계입니다. Vue 3는 객체를 Proxy로 감싸 get에서 track, set에서 trigger합니다. ref는 .value의 getter와 setter가 이 일을 맡습니다. '읽는 순간'에만 기록하므로 구조 분해로 꺼낸 값, await 뒤 읽기, 서버 렌더 중은 기록되지 않습니다. 실제로 구조 분해한 값은 바뀌어도 효과가 돌지 않았습니다.",
        },
        {
          term: "ref와 reactive",
          body: "ref(v)는 어떤 값이든 { value }로 감싸며, 템플릿 최상위에서 풀립니다. reactive(obj)는 객체만 깊은 Proxy로 감쌉니다. reactive의 제한은 셋입니다. 원시값 불가(경고), 통째 교체 불가(옛 프록시 끊김), 구조 분해 불가(복사). 그래서 문서는 ref를 주 API로 권합니다. 같은 원본에는 같은 프록시가 나옵니다(reactive(raw) === reactive(raw)).",
        },
        {
          term: "ref 풀림 (unwrapping)",
          body: "ref를 .value 없이 쓰도록 Vue가 대신 꺼내 주는 규칙입니다. 템플릿의 최상위 바인딩, 깊은 reactive 객체의 프로퍼티, ref 안의 ref에서만 일어납니다. 템플릿의 중첩 식, 배열, Map, shallowReactive 안에서는 일어나지 않습니다. 실제로 {{ obj.id + 1 }}은 '[object Object]1', reactive([ref(5)])[0]은 ref 그대로였습니다.",
        },
        {
          term: "다음 틱 (next tick)과 nextTick()",
          body: "같은 동기 코드의 상태 변경을 모아 DOM에 한 번에 반영하는 시점입니다. 변경 직후 DOM은 옛 값(실제로 '0-0'), await nextTick() 뒤는 새 값('2-1')입니다. 같은 틱의 set 셋이 한 렌더로 묶였습니다. 측정은 nextTick 뒤나 watch flush 'post'에서 합니다.",
        },
        {
          term: "computed의 지연 평가와 캐시",
          body: "읽을 때 처음 계산합니다(생성 직후 runs 0). 의존이 그대로면 다시 읽어도 재계산하지 않습니다(두 번 읽어도 1). 바뀌면 더럽다고 표시만 하고 다음 읽기에 계산합니다. 읽기 전용이라 쓰면 'Write operation failed: computed value is readonly'가 납니다. getter에 부수 효과나 원본 변이(sort)는 금지입니다.",
        },
        {
          term: "computed 안정성 (3.4+)",
          body: "computed가 재계산되어도 값이 전과 같으면(Object.is) 의존 효과를 깨우지 않는 규칙입니다. 불리언 computed는 n이 네 번 바뀌어도 값이 바뀐 한 번만 효과가 돌았고(2회), 매번 새 객체를 돌려주는 computed는 매번 돌았습니다(3회). 객체라면 이전 값(getter의 prev 인자)과 비교해 같으면 prev를 돌려줍니다.",
        },
        {
          term: "watch와 watchEffect",
          body: "watch는 소스(ref, getter, reactive, 배열)를 명시하고 바뀔 때만 콜백을 부릅니다(새·옛 값). reactive 소스는 암묵적 deep이고, getter와 ref는 얕습니다(ref([])의 push 미감지). watchEffect는 즉시 1회 돌며, 첫 await 전까지 동기로 읽은 것만 자동 추적합니다(실제로 runs 2에서 멈춤). 옵션은 immediate, once(3.4+), deep(3.5+ 숫자)입니다.",
        },
        {
          term: "flush (pre · post · sync)",
          body: "감시자 콜백이 도는 시점입니다. pre(기본)는 소유 컴포넌트 DOM 갱신 전(옛 값), post는 갱신 뒤(새 값), sync는 변경 즉시 묶음 없이 돕니다. 실제 순서는 sync → 동기 코드 끝 → pre → post였습니다. DOM 측정은 post로 하고, 배열처럼 여러 번 변이되는 소스에는 sync를 피합니다.",
        },
        {
          term: "effectScope와 onScopeDispose",
          body: "컴포넌트 밖(스토어, 테스트)에서 효과(watch, computed)의 수명을 묶는 장치입니다. scope.run(fn) 안의 효과는 scope.stop()에 전부 멈추고 onScopeDispose가 불립니다(실제로 stop 뒤 변경 무시, disposed true). 컴포저블의 정리를 onUnmounted 대신 이것으로 적으면 컴포넌트와 스토어 어디서든 동작합니다.",
        },
        {
          term: "shallowRef · markRaw · toRaw",
          body: "추적 깊이를 조절하는 셋입니다. shallowRef는 .value 교체만 추적합니다(깊은 변경은 triggerRef로 수동). markRaw는 객체를 프록시로 감싸지 말라는 표시입니다(루트만). toRaw는 프록시의 원본입니다. 거대한 불변 데이터나 외부 라이브러리 인스턴스를 reactive에 넣을 때 씁니다. toRaw 참조는 보관하지 않습니다.",
        },
        {
          term: "customRef",
          body: "track과 trigger를 손에 쥐고 '언제 반응하나'를 직접 정하는 ref 공장입니다. customRef((track, trigger) => ({ get() { track(); … }, set(v) { … trigger() } })). 디바운스 ref가 대표적입니다. 실제로 'a','ab'를 연달아 쓰자 watch가 'ab'에 한 번만 불렸습니다.",
        },
        {
          term: "템플릿 식 허용 목록 (globals whitelist)",
          body: "템플릿 식은 Math, Date, JSON 같은 허용 목록의 전역만 씁니다. window, performance, localStorage는 undefined이고, 개발 모드에서 'Property \"x\" was accessed during render but is not defined on instance.' 경고가 납니다. 식은 _ctx.x로 컴파일되어 인스턴스에서 찾습니다. 필요하면 setup에서 꺼내 반환하거나 app.config.globalProperties에 둡니다.",
        },
        {
          term: "디렉티브 (directive)",
          body: "v-이름:인자.수식어=\"식\" 꼴의 특수 속성입니다. 내장(v-if, v-for, v-model, v-bind, v-on…)과 커스텀(v-focus)이 있습니다. 커스텀은 요소 하나의 생명주기 훅 일곱(created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted)에 DOM 조작을 매답니다. binding에는 value, oldValue, arg, modifiers가 옵니다. 다중 루트 컴포넌트에 걸면 'Runtime directive used on component with non-element root node' 경고가 납니다.",
        },
        {
          term: "v-on 수식어 순서",
          body: "수식어는 적은 순서대로 핸들러를 감싸는 코드가 됩니다. .prevent.self는 먼저 막고 자신인지 검사하므로 자식 클릭도 막힙니다. .self.prevent는 자신인지 먼저 검사하므로 자식은 통과합니다. 실제로 자식 링크 클릭은 전자에서만 preventDefault 됐습니다. .passive와 .prevent는 함께 쓰지 않습니다.",
        },
        {
          term: "v-model과 요소별 짝",
          body: "값 바인딩과 입력 리스너를 한 줄로 씁니다. text와 textarea는 value/input, checkbox와 radio는 checked/change, select는 value/change, 컴포넌트는 modelValue/update:modelValue입니다. 초기 value, checked, selected 속성은 무시합니다(진실은 JS 상태). 수식어는 .lazy(change), .number(parseFloat, 실패 시 원문: '12abc'→12 'abc'→'abc'), .trim입니다.",
        },
        {
          term: "key",
          body: "v-for 노드와 조건 분기에 '이 노드는 이 항목이다'를 알리는 원시값입니다. 리스트가 바뀌면 key로 옛 노드와 새 항목을 짝지어 재사용, 이동, 제거를 정합니다. 없거나 index면 자리 기준이라 input 값과 자식 상태가 옆으로 샙니다. 바꾸면 새 노드가 됩니다(실제로 key 변경에 input 값 리셋). v-if/v-else 분기에 같은 key는 컴파일 에러입니다.",
        },
        {
          term: "v-if와 v-show",
          body: "v-if는 가상 DOM에서 노드를 빼고 넣으므로 컴포넌트 수명과 state가 함께 사라집니다(unmounted 호출). v-show는 트리를 두고 display만 토글해 state가 남습니다(실제로 제거됨 vs display:none). 자주 토글하면 v-show, 조건이 잘 안 바뀌면 v-if, DOM은 빼되 state는 두려면 KeepAlive입니다. 같은 요소에 v-if와 v-for를 쓰면 v-if가 먼저라 변수를 못 읽습니다.",
        },
        {
          term: "in-DOM 템플릿 (in-DOM template)",
          body: "HTML 문서 안에 직접 쓴 템플릿입니다(마운트 컨테이너의 innerHTML). 브라우저 파서를 먼저 거치므로 태그와 속성이 소문자가 됩니다(<MyRow> → <myrow>). 자기 닫힘이 무시되어 <my-row/> 뒤 형제가 그 자식으로 삼켜지고, <table> 안 컴포넌트는 밖으로 끌려 나옵니다(실제로 전부 확인). 처방은 kebab-case, 닫는 태그, <tr is=\"vue:my-row\">입니다. SFC와 문자열 템플릿은 괜찮습니다.",
        },
        {
          term: "props 단방향과 검증",
          body: "props는 부모 상태를 읽기 전용으로 비춘 것입니다. 자식이 쓰면 'Set operation on key \"x\" failed: target is readonly.' 경고가 납니다. 객체 안쪽은 경고 없이 부모까지 바뀌니 피합니다. 선언(type, required, default, validator)은 개발 모드에서 검사되어 'type check failed … Expected Number with value 3, got String with value \"3\"' 같은 경고를 냅니다. Boolean은 속성만 있으면 true, 없으면 false이고, [String, Boolean]이면 ''입니다.",
        },
        {
          term: "반응형 props 구조 분해 (3.5+)",
          body: "const { msg = 'hi' } = defineProps(…)를 컴파일러가 __props.msg로 바꿔 반응성을 지키는 기능입니다(실제로 compileScript 출력에서 확인). 기본값은 구조 분해의 =로 적고, props 선언의 default가 됩니다. 구조 분해 변수를 watch나 컴포저블에 값으로 넘기면 끊기므로 컴파일러가 에러를 냅니다. '\"count\" is a destructured prop and should not be passed directly to watch(). Pass a getter () => count instead.'",
        },
        {
          term: "emits 선언과 폴스루",
          body: "컴포넌트에 건 @click은 emits에 click이 있으면 컴포넌트 이벤트 리스너가 되어 emit만 받습니다. 없으면 폴스루로 루트 요소의 네이티브 리스너가 됩니다(실제로 선언하면 네이티브가 안 오고, 안 하면 폴스루). 선언 없이 $emit('click')까지 하면 두 번 울립니다. 컴포넌트 이벤트는 버블링하지 않습니다.",
        },
        {
          term: "defineModel (3.4+)",
          body: "v-model 계약(modelValue prop + update:modelValue 이벤트)을 한 줄로 선언하고 양방향 ref를 돌려주는 매크로입니다. 실제로 compileScript는 props에 modelValue, modelModifiers를, emits에 update:modelValue를 넣고 const model = useModel(__props, 'modelValue')로 바꿨습니다. 인자는 v-model:title → defineModel('title')이고, 수식어는 [model, modifiers]로 꺼냅니다. default를 줬는데 부모가 undefined면 어긋남 경고가 납니다.",
        },
        {
          term: "폴스루 속성 (fallthrough attributes)",
          body: "props나 emits에 선언되지 않은 속성과 리스너입니다. 단일 루트 요소에 자동으로 붙어 class와 style은 병합되고(실제로 'base extra'), 리스너는 더해집니다. 루트가 여럿이면 붙일 자리가 없어 'Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.' 경고가 납니다. inheritAttrs: false + v-bind=\"$attrs\"로 손수 둡니다. $attrs는 반응형이 아닙니다.",
        },
        {
          term: "슬롯 (slot)과 범위 슬롯",
          body: "부모가 자식 안에 내용을 넘기는 자리입니다. 컴파일하면 { default: () => vnodes, item: (props) => vnodes } 함수 객체가 됩니다. 부모 범위의 클로저라 자식이 부를 때 평가됩니다(안 부르면 폴백). 범위 슬롯은 자식이 그 함수에 인자(:user)를 넘겨 데이터가 자식→부모로 갑니다. 기본 범위 슬롯을 컴포넌트에 직접 두고 이름 슬롯 template을 섞으면 'Mixed v-slot usage…' 컴파일 에러입니다.",
        },
        {
          term: "provide / inject",
          body: "조상이 provide(key, value)한 것을 자손이 inject(key)로 받는 통로입니다. 기준은 논리 트리라 Teleport나 슬롯 안에서도 됩니다(실제로 확인). setup 중 동기로 부릅니다. ref를 넘기면 자손에서도 반응형이고, 보통 값은 스냅샷입니다. 변경은 제공자가 하도록 readonly와 변경 함수를 함께 넘깁니다(자손이 readonly에 쓰면 경고). 키는 Symbol(InjectionKey<T>)로 써서 충돌을 막습니다.",
        },
        {
          term: "컴포저블 (composable)",
          body: "Composition API로 상태 있는 로직을 재사용하는 use* 함수입니다. 관례상 입력은 toValue()로 ref, getter, 값을 모두 받습니다. 출력은 ref를 담은 plain 객체입니다(reactive를 돌려주면 구조 분해에 끊김). DOM은 onMounted, 정리는 onUnmounted/onScopeDispose에서 하고, setup 안에서 동기로 부릅니다. 믹스인(출처 불명, 충돌)과 렌더리스 컴포넌트(인스턴스 비용)를 대체했습니다.",
        },
        {
          term: "비동기 컴포넌트 (defineAsyncComponent)",
          body: "렌더될 때 컴포넌트를 로더로 받아 오는 래퍼입니다. 상태는 대기(delay 200ms) → loadingComponent → 도착 또는 실패(errorComponent, timeout) 순서로 바뀝니다. onError(err, retry, fail, attempts)로 재시도합니다. 실제로 'loading…' → 'lazy 도착', 500 응답은 'Failed to fetch dynamically imported module', timeout 50은 'Async component timed out after 50ms.'였습니다. Suspense 안에서는 Suspense가 로딩을 맡고(suspensible), 3.5+ SSR은 hydrateOnVisible 등으로 하이드레이션을 미룹니다.",
        },
        {
          term: "Transition의 여섯 클래스",
          body: "요소가 들어오고 나갈 때 Vue가 프레임 순서로 붙이는 클래스입니다. 들어옴은 v-enter-from + v-enter-active(삽입 직전) → 다음 프레임 v-enter-from 제거, v-enter-to 추가 → 끝나면 전부 제거 순입니다. 나감은 v-leave-*로 대칭입니다. 실제로 nextTick 'fade-enter-from fade-enter-active' → rAF2 'fade-enter-active fade-enter-to' → 150ms ''였습니다. 자식은 하나이고, 텍스트만 바뀌면 전환이 없습니다(key 필요). mode='out-in'은 after-leave 뒤 before-enter입니다.",
        },
        {
          term: "TransitionGroup과 FLIP",
          body: "리스트 항목마다 들어옴, 나감, 이동(v-move) 전환을 거는 컴포넌트입니다. key는 필수이고('<TransitionGroup> children must be keyed.'), 래퍼가 없으며(tag로), mode도 없습니다. 재정렬 때 위치 차이를 transform으로 역적용해 전환으로 돌리는 것이 FLIP입니다(실제로 재정렬 직후 전부 list-move). 떠나는 항목은 .x-leave-active { position: absolute }로 흐름에서 빼야 나머지가 바로 move합니다.",
        },
        {
          term: "KeepAlive와 LRU",
          body: "동적 컴포넌트를 언마운트 대신 캐시했다가, 돌아오면 복원하는 래퍼입니다(실제로 A:1 유지). include/exclude는 컴포넌트 name과 맞춥니다(SFC는 파일명). max는 LRU로 가장 오래 안 본 인스턴스를 unmounted합니다(실제로 max=2에서 A 퇴출 → A:0). 캐시된 컴포넌트는 mounted/unmounted 대신 activated/deactivated가 도니, 타이머와 구독의 짝을 거기 둡니다.",
        },
        {
          term: "Teleport",
          body: "자식을 DOM의 다른 자리(to)에 그리되, 컴포넌트 트리의 자리는 두는 래퍼입니다. 부모 자리에는 <!--teleport start--><!--teleport end--> 주석만 남고(실제로), 안에서 inject, props, emit은 그대로입니다(논리 트리). 타깃은 마운트 전에 있어야 합니다('Failed to locate Teleport target…' 경고, 3.5+ defer). disabled로 제자리를 토글하고, SSR은 ctx.teleports에 모이므로 body 타깃은 피합니다.",
        },
        {
          term: "Suspense의 비동기 의존",
          body: "Suspense는 둘만 기다립니다. async setup(<script setup>의 최상위 await 포함)과 비동기 컴포넌트 로딩입니다. onMounted 안 fetch나 Router 지연 라우트는 모릅니다. 전부 끝나면 resolve합니다(이벤트 순서 pending → fallback → resolve). 루트 교체만 다시 pending이 되고, 에러는 잡지 않아 부모 onErrorCaptured로 갑니다. 실험 기능이고, 서버 렌더는 기다려 완성 HTML을 냅니다(실제로).",
        },
        {
          term: "요청 간 상태 오염 (cross-request state pollution)",
          body: "SSR 서버의 모듈 수준 reactive나 ref를 모든 요청이 공유해, A 사용자의 상태가 B의 HTML에 들어가는 문제입니다. 실제로 모듈 reactive가 요청 1에서 1, 요청 2에서 2로 쌓였습니다. 요청마다 앱과 스토어를 만들어 provide하거나 Pinia(createPinia를 요청마다)를 쓰면 됩니다. 브라우저는 사용자가 하나라 모듈 범위가 앱 범위여서 괜찮습니다.",
        },
        {
          term: "하이드레이션 불일치 (hydration mismatch)",
          body: "서버가 보낸 HTML과 클라이언트 첫 렌더가 다른 상황입니다. 개발 모드는 'Hydration text content mismatch on …' 경고와 'Hydration completed but contains mismatches.'를 내고 클라이언트 값으로 고칩니다(실제로). 원인은 시간대, 난수, window 분기, 브라우저가 고친 잘못된 HTML 중첩입니다. 피할 수 없으면 3.5+ data-allow-mismatch=\"text\"를 그 요소에 붙입니다(실제로 경고 없음).",
        },
        {
          term: "서버에 없는 셋",
          body: "SSR에서 같은 코드가 다르게 도는 이유는 셋입니다. DOM이 없어 window, 마운트 훅, 디렉티브 DOM 훅이 없습니다(실제로 돈 훅은 serverPrefetch뿐). 반응성 추적이 꺼져 watch와 computed가 갱신되지 않습니다(실제로 watchEffect runs 1). 사용자 격리가 없어 모듈 전역을 공유합니다. 코드를 공통(setup 동기·템플릿) / 서버 전용(onServerPrefetch·getSSRProps) / 브라우저 전용(onMounted 이후)으로 가릅니다.",
        },
        {
          term: "패치 플래그 (patch flag)와 정적 캐시",
          body: "컴파일러가 동적 vnode에 비트 플래그(1 TEXT, 2 CLASS, 8 PROPS, 128 KEYED_FRAGMENT, 512 NEED_PATCH)를 붙여, 런타임이 그것만 비교하게 합니다. 정적 노드는 -1 CACHED로 한 번 만들어 재사용합니다(실제로 컴파일 출력에서 확인). v-if와 v-for는 블록을 만들어 동적 자손만 평탄한 배열로 추적합니다. 손으로 쓴 h()나 JSX에는 이 정보가 없어 전체를 diff합니다.",
        },
        {
          term: "h()와 렌더 함수",
          body: "h(type, props?, children?)로 vnode를 직접 만드는 함수입니다. 컴포넌트 자식은 슬롯 함수 객체(props 자리 null), 디렉티브는 withDirectives, 수식어는 withModifiers, 전역 등록 컴포넌트는 resolveComponent로 씁니다(없으면 'Failed to resolve component' 경고와 이름 문자열). setup은 vnode가 아니라 '함수'를 돌려줘야 갱신됩니다. 이 블로그의 측정 코드는 전부 h()였습니다.",
        },
        {
          term: "<script setup> 매크로",
          body: "import 없이 쓰는 컴파일러 매크로 defineProps, defineEmits, defineModel, defineExpose, defineOptions, defineSlots입니다. 컴파일러가 전부 지우고 props와 emits 선언, __props, __expose, useModel로 바꿉니다(실제로 compileScript 출력). 최상위에서 정적으로 읽혀야 합니다. 인자는 모듈 스코프로 끌어올려지므로 setup 로컬 변수를 못 봅니다. 최상위 await는 async setup이 되어 Suspense가 필요합니다.",
        },
        {
          term: "scoped CSS와 :deep · :slotted · :global",
          body: "<style scoped>는 요소에 data-v-해시 속성을 붙이고, 선택자마다 [data-v-해시]를 붙여 범위를 만듭니다(실제로 .a → .a[data-v-abc123]). 자식 루트는 부모와 자식 스타일을 둘 다 받습니다. 자식 안쪽은 :deep(.b) → .a[data-v-abc123] .b, 슬롯 내용은 :slotted(div) → div[data-v-abc123-s], 전역 한 줄은 :global입니다. 요소 선택자(p)는 모든 p의 속성을 검사해 느리니 클래스를 씁니다.",
        },
        {
          term: "v-bind() in CSS",
          body: "<style>의 값 자리에 컴포넌트 상태를 넣는 SFC 기능입니다. color: v-bind(color)로 쓰고, 식은 v-bind('theme.color')처럼 따옴표로 감쌉니다. 컴파일러가 var(--해시-이름)으로 바꾸고(실제로 var(--abc123-size)), 런타임 useCssVars가 루트 요소에 인라인 CSS 변수를 넣어 반응형으로 갱신합니다. CSSProperties 타입 증강 없이 동적 스타일을 CSS에 둡니다.",
        },
        {
          term: "useId (3.5+)",
          body: "앱에서 고유하고, 서버와 클라이언트에서 같은 id 문자열입니다. label for/input id나 aria-describedby를 잇습니다. 실제로 'v-0' 'v-1', app.config.idPrefix가 'app'이면 'app-0'입니다. 서버도 'v-0'이라 하이드레이션이 맞습니다. 한 컴포넌트에서 여러 번 부르면 id가 다르고, computed 안에서는 안 부릅니다.",
        },
        {
          term: "점진적 프레임워크와 사용 방법 스펙트럼",
          body: "같은 Vue를 스크립트 하나(CDN 전역 빌드로 서버 HTML 강화), 웹 컴포넌트(defineCustomElement), SPA(create-vue), SSR(Nuxt), SSG(VitePress), 데스크톱과 모바일, 터미널(커스텀 렌더러)까지 씁니다. 자리를 정하는 변수는 셋입니다. HTML을 누가 언제 만드나, 상호작용의 양, 실행 환경입니다. 이 블로그는 두 끝(esm-browser 빌드 576KB로 빌드 없이, server-renderer로 SSR)에서 측정했습니다.",
        },
        {
          term: "컴파일 타임 플래그와 운영 빌드",
          body: "__VUE_OPTIONS_API__(true), __VUE_PROD_DEVTOOLS__(false), __VUE_PROD_HYDRATION_MISMATCH_DETAILS__(false, 3.4+)를 빌드 때 상수로 바꿔, 압축기가 코드를 빼게 하는 것입니다. process.env.NODE_ENV 치환과 같은 방식이며 esm-bundler 빌드에서만 됩니다. 실제로 개발 빌드는 경고와 검증을 포함해 575,931바이트, 운영은 177,765바이트였습니다. 운영에서 빠진 검사는 개발과 CI에서 잡고, 에러는 errorHandler로 보고합니다.",
        },
      ],
    },
    {
      from: "ts",
      entries: [
        {
          term: "정적 타입 검사 (static type checking)",
          body: "코드를 실행하지 않고 값의 종류가 맞는지 확인하는 일입니다. JavaScript는 실행해야 아는 동적 언어이고, TypeScript는 그 위에 정적 검사를 더합니다. 예외(호출 불가)뿐 아니라 '예외가 아닌 실패'(없는 속성 읽기 → undefined)까지 잡습니다. 타입은 검사 뒤 지워져 런타임 동작을 바꾸지 않습니다. 실제로 tsc 출력에서 : number가 사라졌습니다.",
        },
        {
          term: "검사기와 변환기 (check vs emit)",
          body: "tsc 한 번에 일어나는 두 작업입니다. 검사는 약속의 모순을 에러로 내고, 변환은 타입을 지우고 문법을 낮춰 .js를 냅니다. 둘은 독립적이라 에러가 있어도 .js가 나옵니다(noEmitOnError로 막음). Babel, esbuild, Vite, Node의 타입 벗기기는 변환만 합니다. 실제로 타입 에러가 난 파일도 Babel에서 조용히 .js가 됐습니다. 그래서 CI에 tsc --noEmit 한 줄이 필요합니다.",
        },
        {
          term: "TS 코드 번호",
          body: "에러 앞에 붙는 TS2322 같은 번호입니다. 1xxx 문법과 파서, 2xxx 타입 검사, 4xxx 선언 emit, 5xxx 컴파일러 옵션(5108 removed, 5112 tsconfig 무시), 6xxx 프로그램 구성(6053 파일 없음, 6306 composite), 7xxx noImplicitAny 계열, 9xxx isolatedDeclarations이고, 18xxx는 최근 추가분입니다(18047 possibly null, 18046 unknown). 검색은 문구보다 번호가 정확합니다.",
        },
        {
          term: "strict 묶음",
          body: "noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, strictBuiltinIteratorReturn, noImplicitThis, useUnknownInCatchVariables, alwaysStrict를 한 번에 켜는 스위치입니다. 6.0부터 기본값이 true입니다. 그래서 '안 켰는데 왜 엄격하지'가 아니라 '옛 tsconfig에 strict: false가 남았나'를 봅니다. strict 밖에 있는 것은 exactOptionalPropertyTypes, noUncheckedIndexedAccess, noImplicitOverride, noPropertyAccessFromIndexSignature입니다.",
        },
        {
          term: "구조적 타입 (structural typing)",
          body: "이름이 아니라 모양(멤버)으로 호환을 정하는 규칙입니다. 'y가 x의 멤버를 전부 가지면 x 자리에 들어간다'. implements 없이도 맞고, 빈 클래스는 무엇이든 받습니다(실제로 fn({ k: 10 }) 통과). 유일한 명목적 예외는 private/protected 멤버로, 같은 선언에서 온 것이어야 합니다(Types have separate declarations of a private property 'x').",
        },
        {
          term: "초과 속성 검사 (excess property check)",
          body: "객체 리터럴을 타입 자리에 '직접' 쓸 때만 켜지는 오타 방지 검사입니다. Object literal may only specify known properties, and 'z' does not exist in type 'Pt'. 변수에 담았다가 넘기면 구조적 규칙으로 통과합니다(실제로 확인). satisfies에 쓴 리터럴도 같은 검사를 받습니다.",
        },
        {
          term: "좁히기 (narrowing)",
          body: "typeof, 진실성, ===, in, instanceof, 대입, 타입 서술, kind 비교 같은 값 검사를 TypeScript가 읽어 분기 안의 타입을 확정하는 과정입니다. 함정이 있습니다. typeof null은 \"object\"이고(실제로 'strs' is possibly 'null'), if (str)은 \"\"도 걸러 냅니다. 표에 없는 검사는 아무것도 좁히지 않으므로 타입 서술 함수(x is T)로 표에 더합니다.",
        },
        {
          term: "판별 유니온 (discriminated union)과 never 소진",
          body: "kind: \"circle\" | \"square\" 같은 리터럴 속성으로 객체 유니온을 가르는 설계입니다. switch의 각 case에서 멤버 하나로 좁혀집니다. default에 const _x: never = shape를 두면, 멤버가 늘었는데 case가 없을 때 Type '{ kind: \"tri\"; … }' is not assignable to type 'never'로 컴파일에서 걸립니다(실제로).",
        },
        {
          term: "타입 서술 (type predicate)과 추론 (5.5)",
          body: "반환 타입 자리에 쓰는 pet is Fish입니다. 참이면 호출 지점에서 그 타입으로 좁힙니다. 5.5부터는 x => typeof x === \"number\" 같은 함수를 적지 않아도 (x: unknown) => x is number로 추론해, filter 결과가 number[]가 됩니다(실제로). 조건은 명시 반환 타입 없음, return 하나, 매개변수 변이 없음입니다. asserts v is string은 호출 뒤부터 좁히는 단언 함수입니다.",
        },
        {
          term: "넓힘 (widening)과 as const",
          body: "리터럴이 바뀔 수 있는 자리(let, 객체 속성)에 들어가면 string이나 number로 넓혀지는 추론 규칙입니다. const c1 = { kind: \"left\" }의 kind는 string이라 \"left\" | \"right\" 자리에 못 들어갑니다(실제로 TS2345). as const는 전부 readonly 리터럴로 고정합니다(readonly kind: \"left\", readonly [1, \"a\"]). readonly 튜플은 가변 튜플 자리에 못 들어갑니다(TS4104).",
        },
        {
          term: "최적 공통 타입과 문맥적 타이핑",
          body: "추론에는 두 방향이 있습니다. 아래→위는 [0, 1, null]의 요소 후보에서 (number | null)[]을 고릅니다. 공통 조상(Animal)은 후보가 아니어서 (Rhino | Elephant)[]가 됩니다. 위→아래는 names.forEach((s) => …)의 s가 자리의 타입에서 string으로 흘러 들어옵니다(실제로). 제네릭 호출은 둘을 함께 쓰고, NoInfer는 '이 인자에서는 올리지 말라'는 표시입니다.",
        },
        {
          term: "오버로드 (overload)와 구현 시그니처",
          body: "본문 없는 선언 여러 줄(오버로드 시그니처)과 본문 있는 마지막 선언(구현 시그니처)입니다. 밖에선 오버로드만 보여 유니온 값은 어느 것에도 안 맞습니다(실제로 No overload matches this call). 지침으로는 되도록 유니온 매개변수를 쓰고, 구체적인 것을 먼저 둡니다. 첫 매치가 뽑히므로 일반을 앞에 두면 구체는 영원히 안 뽑힙니다(실제로 bad(\"s\")가 unknown). 끝 매개변수만 다르면 선택적으로 씁니다. infer와 ReturnType은 마지막 시그니처만 봅니다.",
        },
        {
          term: "void 반환 규칙",
          body: "타입으로 선언한 () => void 자리에는 무엇을 돌려주는 함수든 들어가고, 결과는 void로 무시됩니다. forEach(x => arr.push(x))가 되는 이유입니다(실제로 v()의 타입은 void). 함수 선언에 직접 : void를 적고 return 42를 하면 에러입니다. 콜백 타입에 any가 아니라 void를 쓰라는 Do's and Don'ts가 이 규칙에 기댑니다.",
        },
        {
          term: "readonly는 얕고 호환성에 안 들어간다",
          body: "readonly는 '이 자리에서 쓰지 말라'는 표시입니다. 안쪽 객체는 바뀌고(home.resident.age++ OK), 호환성 검사는 readonly를 무시해 쓰기 가능한 참조를 대입할 수 있습니다. 불변이 필요하면 값 쪽에서 막거나(Object.freeze) 깊은 Readonly 타입을 직접 만듭니다. 매핑된 타입에서는 -readonly로 벗깁니다.",
        },
        {
          term: "제네릭 (generics)과 제약 (extends)",
          body: "타입 자리에 변수를 두고 쓰는 쪽이 채우게 하는 것입니다. 인자에서 추론합니다(first([1,2]) → number, first([]) → never). 제약 T extends { length: number }를 벗어나면 Argument of type 'number' is not assignable to parameter of type '{ length: number; }'. 지침은 셋입니다. 제약보다 T 자체를 쓰고, T는 적게 두고, 한 자리에만 나오는 T는 없앱니다. static은 클래스의 T를 못 씁니다(TS2302).",
        },
        {
          term: "분산 어노테이션 (in / out)",
          body: "타입 매개변수가 반환 쪽에만(out, 공변), 매개변수 쪽에만(in, 반공변) 쓰인다는 선언입니다(4.7). 문서는 '거의 필요 없다', '검사 동작을 바꾸려고 쓰지 마라'고 합니다. Producer<string>은 Producer<string | number> 자리에 들어가고, 반대는 TS2322입니다(실제로). 순환 타입의 검사 속도와 확정을 돕는 힌트입니다.",
        },
        {
          term: "keyof · typeof · 인덱스 접근 (T[K])",
          body: "타입 조작의 '조각 꺼내기' 셋입니다. keyof { x; y }는 \"x\" | \"y\"이고, 문자열 인덱서는 string | number입니다(숫자 키도 문자열이라서, 실제로). typeof는 값→타입의 유일한 다리로, 식별자에만 씁니다(typeof f()는 파서 에러). T[\"k\"]의 대괄호는 타입 자리라 const key는 못 넣고 typeof key를 씁니다(TS2538/2749). (typeof arr)[number]가 요소 타입입니다.",
        },
        {
          term: "조건부 타입과 분배 (distributive)",
          body: "T extends U ? X : Y 꼴입니다. 참 분기에서는 T가 U 모양임을 알아 T[\"message\"]가 허용됩니다(밖에서는 TS2536). infer로 조각을 꺼냅니다(Unwrap<Promise<string>> → string). 벗은 타입 매개변수에 유니온을 넣으면 멤버마다 적용되어 ToArr<string | number> → string[] | number[]가 됩니다(실제로). 막으려면 [T] extends [U]처럼 감쌉니다. Exclude, Extract, NonNullable이 이 원리입니다.",
        },
        {
          term: "매핑된 타입 (mapped type)과 키 재매핑 (as)",
          body: "{ [K in keyof T]: … }, 즉 속성을 도는 for 문입니다. 수식어 -readonly, -?로 벗기고(실제로 Mut<Readonly<Opt>> → { a: number; b: string }), 4.1의 as 절로 키를 바꿉니다(`get${Capitalize<string & K>}`). as가 never면 그 키가 빠집니다(필터). 객체 유니온을 돌며 as E[\"kind\"]로 키를 뽑을 수도 있습니다. Partial, Pick, Record의 정체입니다.",
        },
        {
          term: "템플릿 리터럴 타입",
          body: "`${A}${B}`로 문자열 리터럴을 조합하는 타입입니다. 유니온은 곱이 됩니다(`${\"click\" | \"focus\"}Event` → 두 개, 실제로). 함수 매개변수 자리에서 거꾸로 추론해 콜백 타입을 맞출 수도 있습니다(`${Key}Changed` → Key). Uppercase, Lowercase, Capitalize, Uncapitalize는 컴파일러 내장(intrinsic)이라 .d.ts에 본문이 없고 로캘을 모릅니다. keyof는 symbol 때문에 string & keyof T로 씁니다.",
        },
        {
          term: "유틸리티 타입 (utility types)",
          body: "lib.d.ts에 미리 든 타입 변환 스물두 개입니다.\n객체: Partial, Required, Readonly, Record, Pick, Omit\n유니온: Exclude, Extract, NonNullable\n함수와 클래스: Parameters, ConstructorParameters, ReturnType, InstanceType, Awaited, ThisParameterType, OmitThisParameter\n그 밖: NoInfer(5.4), ThisType, 문자열 넷\n전부 매핑된·조건부·infer로 쓰여 있으니 없는 것은 직접 만듭니다.",
        },
        {
          term: "클래스 필드 초기화와 순서",
          body: "strictPropertyInitialization에서는 필드를 '생성자 자체 안에서' 초기화해야 하고(TS2564), 확정 할당 단언 x!: T로 미룹니다. 초기화 순서는 기반 필드 → 기반 생성자 → 파생 필드 → 파생 생성자라, 기반 생성자가 this.name을 읽으면 파생 값은 아직 없습니다(실제로 \"base\" 출력). implements는 검사일 뿐 속성을 만들지 않습니다(\"pong\" in ball → false).",
        },
        {
          term: "private과 #private",
          body: "TypeScript의 private은 컴파일 때만 막습니다. 대괄호 p[\"soft\"]로는 읽히고, 런타임엔 보통 속성입니다(Object.keys에 보임). #hard는 JavaScript 하드 private이라 런타임에도 밖에서 못 읽고 keys에 없습니다(실제로 undefined). ES2021 이하 타깃은 WeakMap으로 흉내 냅니다. 모양이 같은 클래스를 구분하는 가장 가벼운 명목적 장치는 private 필드 하나입니다.",
        },
        {
          term: "런타임의 this와 this 매개변수",
          body: "const f = obj.method; f()는 this가 undefined라 터집니다(실제로 Cannot read properties of undefined). 화살표 함수 속성은 바인딩을 유지하지만, 인스턴스마다 메모리를 쓰고 super를 못 부릅니다. this 매개변수(m(this: Counter))는 컴파일 때 The 'this' context of type 'void' is not assignable…로 잡지만, 런타임 보장은 없습니다.",
        },
        {
          term: "모듈과 스크립트, export {}",
          body: "최상위 import/export가 하나라도 있으면 모듈(자기 스코프), 없으면 스크립트(전역)입니다. 두 스크립트의 같은 이름 const는 Cannot redeclare block-scoped variable이 되고(실제로), export {} 한 줄로 풀립니다. moduleDetection: force는 전부 모듈로 봅니다. 전역 .d.ts에 import를 넣으면 모듈이 되어 전역 선언이 아니게 됩니다.",
        },
        {
          term: "import 지우기 (elision)와 verbatimModuleSyntax",
          body: "값으로 쓰이지 않은 import를 출력에서 빼는 일입니다. 타입 import가 런타임 로드를 하지 않게 합니다. 실제로 import { a, T }가 import { a }가 됐습니다. 단일 파일 변환기는 T가 타입인지 몰라 지울 수 없습니다. 그래서 5.0의 verbatimModuleSyntax는 적은 대로 내보내되 타입에는 type을 강제합니다('T' is a type and must be imported using a type-only import…, TS1484). import type으로 받은 것을 값으로 쓰면 TS1361입니다. 부수 효과 모듈은 import \"./x.js\"를 따로 적습니다.",
        },
        {
          term: "호스트 (host)",
          body: "컴파일 출력을 실제로 실행하거나 묶는 것으로, Node.js, 브라우저, 번들러가 있습니다. 'TypeScript 컴파일러 자체는 호스트가 아니다'. module(출력 포맷)과 moduleResolution(경로 찾기)은 호스트가 무엇인지 TypeScript에 알리는 선언입니다. 어긋나면 컴파일은 통과해도 실행이 깨집니다. 실제로 bundler로 통과한 확장자 없는 import를 Node가 ERR_MODULE_NOT_FOUND로 거부했습니다.",
        },
        {
          term: "module: nodenext와 파일별 포맷",
          body: "출력 포맷을 파일마다 정하는 모드입니다. .mts/.mjs는 ESM, .cts/.cjs는 CJS, .ts/.js는 가장 가까운 package.json의 type을 따릅니다. 실제로 같은 설정에서 type: module 폴더는 import 그대로, type: commonjs 폴더는 require()/exports.x =로 나왔습니다. moduleResolution nodenext, target esnext, esModuleInterop이 암묵으로 따라옵니다. Node에서 돌 코드에 esnext/commonjs를 적는 것은 '올바르지 않다'. 상대 import는 .js 확장자가 필수입니다(TS2835).",
        },
        {
          term: "moduleResolution: bundler",
          body: "번들러의 느슨한 규칙(확장자 생략, 디렉터리 index)을 흉내 내는 해석입니다. module은 esnext/preserve(6.0+ commonjs도)여야 합니다(TS5095). package.json exports는 읽습니다. 라이브러리에 쓰면 export * from \"./utils\"가 .d.ts에 남아 Node 사용자 쪽에서 깨지는 '전염성'이 있습니다. classic과 node10은 7.0에서 제거됩니다.",
        },
        {
          term: "지정자는 변환되지 않는다",
          body: "출력의 import 문자열은 입력과 같습니다. TypeScript는 ./a.ts를 ./a.js로 바꿔 주지 않습니다. 그래서 Node ESM 소스에는 .js를 적어야 합니다(nodenext가 TS2835로 강제). .ts를 적으려면 allowImportingTsExtensions + noEmit이 필요합니다(출력에 .ts가 남으면 안 되니, TS5096). 유일한 예외가 5.7 rewriteRelativeImportExtensions입니다(실제로 ./a.ts → ./a.js). paths도 검사만 바꾸고 출력은 그대로입니다(실제로).",
        },
        {
          term: "ESM·CJS 상호운용과 이중 default",
          body: "ES2015가 ESM→CJS를 정하지 않아 Babel, TypeScript(esModuleInterop), Node가 각자 규칙을 만들었습니다. 앞의 둘은 __esModule이 있으면 default를 벗기고, 없으면 module.exports를 default로 감쌉니다. Node는 늘 module.exports 전체를 default로 둡니다. 그래서 TS가 컴파일한 CJS를 Node ESM에서 default import 하면 함수가 .default.default에 있습니다(실제로 typeof compiled === \"object\"). 처방은 CJS 라이브러리가 default 대신 export =나 named로 내보내고, 라이브러리는 verbatimModuleSyntax를 쓰는 것입니다.",
        },
        {
          term: "esModuleInterop과 allowSyntheticDefaultImports",
          body: "후자(1.8)는 검사만 바꿉니다. default가 없는 모듈의 default import를 허용합니다. 전자(2.7)는 emit도 바꿉니다. __importDefault/__importStar 헬퍼로 Babel과 같은 규칙을 런타임에 만듭니다. 문서는 'CJS가 있는 앱은 항상 esModuleInterop', '전자만 켜는 것은 피하라'고 합니다. 6.0부터는 false로 둘 수 없습니다(실제로 Option 'esModuleInterop=false' has been removed).",
        },
        {
          term: "선언 파일 (.d.ts)과 declare",
          body: "구현 없이 모양만 적은 파일입니다. declare는 '이 이름은 밖에 있다'는 표시로 var/function/class/namespace/module \"x\"/global에 붙고, 전부 emit에 남지 않습니다. tsc --declaration이 만드는 것과 같은 문법입니다(실제로 본문이 사라지고 추론 반환 타입이 적힘). 손으로 쓴 .d.ts는 '위험하고 실수가 잦다'. 5.5 isolatedDeclarations는 추론에 기대는 선언을 거부해(TS9007/9016) 다른 도구도 생성할 수 있게 합니다.",
        },
        {
          term: "export = 와 세 가지 import",
          body: "CJS의 module.exports = X에 대응하는 선언입니다. 모듈 자체가 함수나 클래스일 때 씁니다(템플릿 module-function/class). 소비자는 import x = require(), default import(interop), import * as(객체일 때만) 중 환경에 맞게 고릅니다. 실제로 nodenext CJS에서 셋 다 통과했지만, 함수를 namespace import로 받으면 호출할 수 없습니다(WRONG! DO NOT DO THIS!). module esnext에서 import = require는 TS1202입니다.",
        },
        {
          term: "선언 병합 (declaration merging)과 세 칸",
          body: "모든 이름은 네임스페이스, 타입, 값 세 칸 중 하나 이상을 채웁니다(class와 enum은 타입+값, interface와 type은 타입, function과 변수는 값, namespace는 네임스페이스+값). 같은 칸을 둘이 채우면 충돌합니다(class+class, type+무엇이든 → Duplicate identifier). 칸이 다르거나 합치는 법이 정해진 것은 병합합니다(interface+interface는 멤버를 합치고 함수는 오버로드로, namespace+function/class/enum). 실전은 모듈 보강(declare module \"x\")과 전역 보강(declare global)이고, 패치만 되며 새 최상위 선언은 못 합니다.",
        },
        {
          term: "@types와 6.0의 types: []",
          body: "DefinitelyTyped가 @types/이름으로 배포하는 선언입니다. 패키지에 자기 types 필드가 있으면 필요 없습니다. 모듈 @types는 import할 때 해석되지만, 전역 @types(node·jest)는 프로그램에 넣어야 합니다. 6.0부터 types 기본값이 []라 자동으로 들어오지 않습니다. 그래서 설치했는데도 Cannot find name 'process'… then add 'node' to the types field in your tsconfig(TS2591)가 납니다. \"types\": [\"*\"]가 옛 동작입니다.",
        },
        {
          term: "checkJs · @ts-check · JSDoc",
          body: ".js를 검사하는 세 스위치입니다. allowJs는 넣고 변환만 합니다(에러 0, 실제로). checkJs나 첫 줄의 // @ts-check는 검사하고, // @ts-nocheck는 뺍니다. 타입은 JSDoc의 @type, @param, @returns, @typedef, @template, @satisfies, @import(5.5)로 적습니다. .js는 적을 자리가 없어 관대하지만(열린 객체 리터럴, 매개변수 기본 선택적, null 초기화는 any), JSDoc 하나로 .ts 규칙이 됩니다. @ts-expect-error는 에러가 없으면 그 자체가 에러입니다(TS2578).",
        },
        {
          term: "tsconfig: files · include · exclude · extends",
          body: "files는 허용 목록(없으면 TS6053), include는 glob입니다. exclude는 include 결과만 거르므로 import, types, reference, files로는 들어옵니다(실제로 exclude 한 gen/g.ts가 import로 들어와 에러 보고). extends는 compilerOptions를 물려받되 files/include/exclude는 교체하고, references는 상속 안 되며, 5.0부터 배열도 됩니다. 최종 결과는 --showConfig로 봅니다. 명령줄에 파일을 적으면 tsconfig를 무시하는데, 6.0은 TS5112 에러이고 --ignoreConfig로만 됩니다.",
        },
        {
          term: "6.0 기본값 전환과 7.0 제거",
          body: "6.0: strict true, module esnext, target 그해 ES(es2025), types [], rootDir ., noUncheckedSideEffectImports true, libReplacement false, 그리고 폐기 예고입니다.\n7.0: 폐기된 것이 전부 에러입니다. target es5, module amd/umd/system/none, moduleResolution classic/node10, baseUrl, outFile, downlevelIteration, esModuleInterop false, alwaysStrict false(실제로 전부 Option '…' has been removed).\n옛 글의 tsconfig를 복사할 때 먼저 볼 표입니다.",
        },
        {
          term: "프로젝트 참조 (project references)와 tsc -b",
          body: "tsconfig의 references로 다른 프로젝트 출력 .d.ts를 import 하고, tsc -b가 의존 순으로 오래된 것만 빌드합니다(tsbuildinfo, 실제로 두 번째는 up to date). 참조되는 쪽은 composite: true여야 하며(없으면 TS6306), declaration도 켜집니다. rootDir 기본은 tsconfig 폴더이고, 모든 파일이 include/files에 있어야 합니다(TS6307). 일반 tsc는 의존을 빌드하지 않습니다(TS6305). -b는 noEmitOnError처럼 동작합니다. 경계가 .d.ts로 고정되어 환경마다 tsconfig를 둘 수 있습니다.",
        },
        {
          term: "erasableSyntaxOnly (5.8)와 Node의 타입 벗기기",
          body: "'지우기만으로 JavaScript가 되는 문법만' 허용하는 옵션입니다. enum, 값을 가진 namespace, 매개변수 속성, import =/export =를 TS1294로 막습니다(실제로 넷 다). Node 24는 기본으로 타입을 벗기며(process.features.typescript === \"strip\"), enum은 TypeScript enum is not supported in strip-only mode로 거부합니다. --experimental-transform-types를 주면 변환합니다. enum 대신 as const 객체를 권하는 배경입니다.",
        },
        {
          term: "TypeScript 7.0 (Go 네이티브)",
          body: "컴파일러를 Go로 옮긴 메이저 버전입니다. 구조와 로직은 원본을 따라 검사 결과가 6.0과 같고, 공유 메모리 멀티스레딩으로 전체 빌드가 8~12× 빠릅니다(vscode 125.7s → 10.6s). 옵션은 --checkers(기본 4), --builders, --singleThreaded입니다. npm i typescript 그대로 설치합니다(실제로 7.0.2, bin/tsc + dist, lib에는 .d.ts만). 안정된 프로그래밍 API는 7.1 예정이라 vue-tsc, ts-loader 등은 6.0 API(@typescript/typescript6)를 씁니다. 이 허브도 추론 타입을 6.0.3으로 꺼냈습니다.",
        },
      ],
    },
    {
      from: "git",
      entries: [
        {
          term: "세 개의 트리 (HEAD · Index · Working Directory)",
          body: "Pro Git의 Reset Demystified가 세 공간을 부르는 이름입니다. HEAD는 마지막 커밋의 스냅샷(다음 커밋의 부모), Index는 다음 커밋으로 제안된 스냅샷(스테이징), Working Directory는 모래밭입니다. add는 WD→Index, commit은 Index→HEAD입니다. status -s의 두 칸(왼쪽 Index, 오른쪽 WD)과 diff(Index↔WD), diff --staged(HEAD↔Index)가 이 셋을 비교합니다. 실제로 add 뒤에 또 고치면 MM입니다.",
        },
        {
          term: "블롭 · 트리 · 커밋 객체",
          body: "git 저장소의 세 객체입니다. 블롭은 파일 내용(이름 없음), 트리는 디렉터리 항목(모드, 종류, 해시, 이름), 커밋은 트리 하나와 부모, 작성자, 메시지입니다. 전부 내용의 SHA-1로 이름이 붙어 같은 내용은 어디서나 해시가 같습니다(echo 'a' → 7898192…). 커밋은 변경분이 아니라 스냅샷을 가리키고, 안 바뀐 파일은 같은 블롭을 다시 가리킵니다. git cat-file -p로 열어 봅니다.",
        },
        {
          term: "브랜치 = 이름표 (41바이트 파일)",
          body: ".git/refs/heads/<이름>에 든 커밋 해시 한 줄입니다(40자 + 줄바꿈). 브랜치를 만드는 일은 파일 하나를 쓰는 일이고, 커밋하면 그 파일의 해시가 바뀝니다. 브랜치에는 부모가 없고, 부모가 있는 것은 커밋입니다. HEAD는 .git/HEAD의 'ref: refs/heads/master'로 '어느 이름표 위에 있나'를 적습니다. 해시가 직접 들어가면 detached HEAD입니다(실제로 'HEAD detached at 5fd1dc1').",
        },
        {
          term: "도달 가능성 (reachability)",
          body: "어느 이름표(브랜치, 태그, 원격 추적, reflog)에서든 부모 사슬을 따라 닿을 수 있는지입니다. log가 보여 주는 것, branch -d가 지워 주는 것(끝 커밋이 현재 브랜치에서 닿아야), push가 보내는 것(브랜치에서 닿되 원격에 없는 것), gc가 남기는 것이 전부 이 하나로 정해집니다. 이름표를 떼면 커밋은 '존재하되 도달 불가'가 됩니다.",
        },
        {
          term: "범위 문법 (.. 과 ...)",
          body: "A..B는 B에서 닿고 A에서는 안 닿는 커밋입니다(PR의 Commits 탭 = base..head, push가 보낼 것 = origin/x..HEAD). A...B는 한쪽에서만 닿는 커밋 전부입니다(--left-right로 < > 표시). diff에서는 뜻이 다릅니다. A..B는 두 끝을, A...B는 merge base와 B를 비교합니다(PR의 Files changed). 실제로 base가 파일을 더한 뒤 두 점은 그 파일을 '삭제'로 보였습니다.",
        },
        {
          term: "reset 세 가지와 WD 안전성",
          body: "reset은 (1) 이름표를 옮기고(--soft는 여기서 멈춤), (2) Index를 HEAD처럼 만들고(--mixed, 기본), (3) WD까지 바꿉니다(--hard). 실제로 --soft 뒤 'A  x.txt', --mixed 뒤 '?? x.txt', --hard 뒤에는 파일이 없었습니다. 'WD Safe?'가 NO인 것은 --hard와 checkout <paths> 둘뿐입니다. 경로를 주는 reset <file>은 이름표를 옮기지 않고 그 파일만 unstage합니다(= restore --staged).",
        },
        {
          term: "reflog와 gc 기한",
          body: "HEAD와 각 브랜치의 이동 기록입니다. 지운 브랜치나 잘못한 reset --hard의 커밋 해시가 'commit: x'로 남아, git branch <name> <sha>로 되살립니다. 로컬 전용입니다(push 안 됨). 기본 보존은 도달 가능 항목 90일(gc.reflogExpire), 도달 불가 30일(gc.reflogExpireUnreachable)이고, 그 뒤 gc가 치웁니다. 실제로 expire + gc --prune=now 뒤에는 'could not get object info'였습니다. 마지막 길은 fsck --lost-found의 dangling commit입니다.",
        },
        {
          term: "원격 추적 브랜치 (origin/x)와 upstream",
          body: "refs/remotes/origin/x는 마지막으로 원격과 통신했을 때 원격 x가 가리키던 커밋의 기록입니다. 읽기 전용이라 거기서 커밋하지 못합니다. fetch는 이것만 옮기고 로컬 브랜치는 옮기지 않습니다('fetch 했는데 뒤처짐'). upstream은 로컬 브랜치의 짝입니다(.git/config의 branch.x.remote/merge). 없으면 'fatal: The current branch x has no upstream branch.'나 'There is no tracking information for the current branch.'가 납니다. branch -vv의 ahead/behind는 마지막 fetch 기준입니다.",
        },
        {
          term: "non-fast-forward 거절",
          body: "동료가 먼저 push해서 원격의 이름표가 내 이름표의 조상이 아니면, push가 '! [rejected] master -> master (fetch first)'로 막힙니다. pull --rebase로 내 커밋을 원격 끝으로 옮기거나, merge한 뒤 push합니다. --force-with-lease는 원격이 내가 본 그대로일 때만 덮어씁니다. 그새 바뀌었으면 '(stale info)'로 거절해, 남의 커밋을 지우는 사고를 막습니다.",
        },
        {
          term: "fast-forward · 병합 커밋 · squash",
          body: "상대가 내 후손이면 이름표만 옮깁니다(Updating a..b / Fast-forward). 양쪽에 커밋이 있으면 merge base와 두 끝을 3-way로 병합해, 부모가 둘인 병합 커밋을 만듭니다(Merge made by the 'ort' strategy, 2.55의 기본 전략). --no-ff는 후손이어도 병합 커밋을 만듭니다(GitHub의 Create a merge commit). --squash는 상대 변경을 한 덩어리로 Index에 담고 멈춥니다(not updating HEAD). 그래서 부모가 하나인 커밋이 되고, 원래 커밋에는 닿지 않아 branch -d가 거절합니다. GitHub에서 Squash and merge 뒤에 보는 일입니다.",
        },
        {
          term: "충돌 (conflict)과 표시",
          body: "merge base 기준으로 같은 자리를 양쪽이 다르게 고쳤거나, 한쪽은 고치고 한쪽은 지웠을 때만 납니다. 'CONFLICT (content): Merge conflict in a.txt'와 'Automatic merge failed; fix conflicts and then commit the result.'가 뜨고, status --short는 UU입니다. 파일에는 <<<<<<< HEAD / ======= / >>>>>>> topic이, diff3 스타일이면 ||||||| base도 들어갑니다. 이때 git diff는 결합 diff(diff --cc, @@@)를 보여 줍니다. 풀고 add → commit(merge) 또는 rebase --continue, 그만두려면 --abort입니다. 진행 중이 아니면 'There is no merge to abort (MERGE_HEAD missing).'가 나옵니다.",
        },
        {
          term: "rebase와 'The Perils of Rebasing'",
          body: "내 커밋을 상대 끝에서 하나씩 다시 만듭니다. 내용은 같고 해시는 새것이며(실제로 12686bd → 62e7c36), 이력은 한 줄이 됩니다. 충돌은 커밋 단위로 멈춥니다('error: could not apply d61f7a0…'). Pro Git의 굵은 규칙은 '내 저장소 밖에 있고 남이 그 위에 작업했을 수 있는 커밋은 rebase 하지 마라'입니다. 로컬 커밋에만 쓰고, push는 --force-with-lease로 합니다. rebase -i는 pick·reword·edit·squash·fixup·drop으로 이력을 다듬습니다.",
        },
        {
          term: "revert와 -m 1",
          body: "반대 변경을 새 커밋으로 쌓아 되돌립니다. 공유 이력은 그대로 남습니다. 병합 커밋은 어느 부모 기준인지 -m 1로 정해야 합니다('is a merge but no -m option was given'). 병합을 revert한 뒤 같은 브랜치를 다시 merge하면 'Already up to date'가 나오니, 그 revert를 다시 revert합니다(Advanced Merging). push한 커밋은 reset이 아니라 이것으로 되돌립니다.",
        },
        {
          term: "stash",
          body: "추적 파일의 수정과 담긴 것을 스택에 치워 WD를 깨끗하게 합니다. untracked는 -u, ignored까지는 --all입니다. pop은 적용 뒤 제거하며, 담겼던 것은 기본으로 '수정' 상태로 돌아옵니다(--index면 유지). 실제로 'Saved working directory and index state WIP on master: …' 뒤 stash@{0}이 생겼습니다. git clean은 untracked를 지우고 되찾을 수 없으니 -n으로 먼저 봅니다.",
        },
        {
          term: "PR의 세 버튼과 로컬 명령",
          body: "Create a merge commit = merge --no-ff(부모 둘, 로컬 -d OK).\nSquash and merge = merge --squash + commit(부모 하나). 원래 커밋이 닿지 않아 -d가 거절합니다(→ -D).\nRebase and merge = base 끝에 다시 만들어 ff합니다. 해시와 커미터 정보가 바뀝니다.\nGitHub 문서는 squash를 수명 짧은 브랜치에 권합니다. 같은 head를 계속 쓰면 같은 충돌이 반복됩니다. PR은 git이 아닌 GitHub의 기능이고, diff는 세 점(merge base 기준)입니다.",
        },
      ],
    },
    {
      from: "css",
      entries: [
        {
          term: "캐스케이드 (cascade)의 정렬 키",
          body: "같은 요소와 속성에 맞은 선언 중 하나를 고르는 순서입니다. 출처와 중요도 → 레이어 → 특이성 → 스코프 근접성 → 등장 순서. 앞 키가 다르면 뒤 키는 보지 않습니다. 레이어가 다르면 특이성은 무관해, 실제로 뒤 레이어의 .lay가 앞 레이어의 #id.lay를 이겼습니다. !important는 레이어 순서를 뒤집어 앞 레이어가 이깁니다. 비레이어는 모든 레이어 위입니다. 애니메이션은 normal 위, 트랜지션은 맨 위입니다.",
        },
        {
          term: "특이성 (specificity)",
          body: "ID-클래스-종류 세 열의 무게입니다. ID 1-0-0, 클래스·속성·가상 클래스 0-1-0, 종류·가상 요소 0-0-1, *·:where()·결합자 0입니다. :is()/:not()/:has()는 인자 중 최고값입니다. 왼쪽 열부터 비교해 #id(1-0-0)가 .a .b .c .d .e [x](0-6-0)를 이깁니다(실제로). 인라인 style은 모든 선택자 위, !important만 그 위입니다. 같은 출처·레이어·중요도 안에서만 비교합니다.",
        },
        {
          term: "상속 (inheritance)과 다섯 키워드",
          body: "선언이 없는 속성은 상속 속성이면 부모 계산값(color, font-size), 아니면 초깃값입니다(border → none). inherit은 부모값, initial은 초깃값입니다. unset은 상속 속성이면 inherit, 아니면 initial입니다(실제로 color는 상속, border는 0). revert는 작성자 출처를 없앤 듯 UA 값, revert-layer는 이전 레이어 값입니다. all로 한 번에 겁니다.",
        },
        {
          term: "box-sizing",
          body: "width·height가 가리키는 영역입니다. content-box(기본)는 콘텐츠만 칩니다. 실제로 width 200 + padding 10 + border 5가 230이 됐습니다. border-box는 테두리까지라 200이었습니다. 둘 다 computed width는 \"200px\"이고, 마진은 어느 쪽에도 들지 않습니다. 리셋의 첫 줄은 *, *::before, *::after { box-sizing: border-box }입니다.",
        },
        {
          term: "마진 병합 (margin collapsing)",
          body: "인접한 세로 마진이 하나로 합쳐지는 규칙입니다. 형제 사이(실제로 30과 20이면 30), 부모와 첫·마지막 자식 사이(테두리·패딩·콘텐츠가 없으면 자식 마진이 부모 밖으로), 빈 블록에서 일어납니다. 새 BFC(display: flow-root)나 패딩 1px이 막고, 플렉스·그리드 안, 가로 마진, float, absolute에는 없습니다. 음수는 큰 양수 + 작은 음수입니다.",
        },
        {
          term: "display의 두 값과 BFC",
          body: "display = <바깥> <안쪽>입니다. 바깥(block·inline)은 부모 안에서 내 종류, 안쪽(flow·flow-root·flex·grid)은 자식의 레이아웃 모드입니다. inline-block = inline flow-root(계산값으로 되돌아옴, 실제로). flow-root는 블록 서식 맥락(BFC)을 만들어 float를 담고, 바깥 float를 밀어내고, 마진 병합을 막습니다. overflow로 만들면 스크롤바, 그림자 잘림이 생깁니다. display: none은 자리와 접근성 트리에서 빠지고, visibility: hidden은 자리를 지키며(800×19) 자식을 visible로 되살립니다.",
        },
        {
          term: "플렉스 아이템의 자동 최소 (min-width: auto)",
          body: "플렉스·그리드 아이템은 min-width 초깃값 auto가 min-content로 풀려 '콘텐츠 아래로 줄지 않음'이 됩니다. 실제로 폭 300에 flex: 1 둘을 두고 한쪽에 끊기지 않는 긴 단어를 넣자 8 / 698로 넘쳤고, min-width: 0이면 150 / 150이었습니다. overflow: hidden도 같습니다(스크롤 컨테이너는 자동 최소 0). 말줄임이 플렉스에서 안 되는 이유입니다. 그리드도 같습니다. 1fr = minmax(auto, 1fr) → minmax(0, 1fr).",
        },
        {
          term: "flex 단축과 알고리즘",
          body: "flex는 grow shrink basis입니다.\n기본은 0 1 auto로, 자라지 않고 줄어들며 콘텐츠에서 출발합니다.\nflex: 1 = 1 1 0이라(basis 계산값 \"0%\", 실제로) 콘텐츠와 상관없이 폭이 같습니다.\nauto = 1 1 auto, none = 0 0 auto입니다.\n알고리즘: 가설 크기(basis) → 남는 공간을 grow/shrink 비율로 분배 → min/max로 고정하고 고정된 것을 빼고 다시.\njustify-content는 주축, align-items는 교차축입니다.",
        },
        {
          term: "fr · auto-fill · auto-fit",
          body: "fr은 고정 트랙과 gap을 뺀 남는 공간의 비율입니다. 실제로 400에 100px 1fr 2fr, gap 10이면 100 / 93.33 / 186.67이었습니다. repeat(auto-fill, minmax(100px, 1fr))은 들어가는 만큼 반복하며 빈 트랙을 남기고(350에 아이템 2 → 116.66 ×3), auto-fit은 빈 트랙을 0으로 접습니다(175 175 0). 암묵적 트랙은 grid-auto-rows 크기입니다. subgrid는 부모 트랙 선을 그대로 씁니다.",
        },
        {
          term: "포함 블록 (containing block)",
          body: "위치(top/left)와 퍼센트의 기준 상자입니다.\nstatic, relative, sticky는 가장 가까운 블록 컨테이너의 콘텐츠 상자입니다.\nabsolute는 가장 가까운 non-static 조상의 패딩 상자입니다.\nfixed는 뷰포트입니다. 단 transform·filter·backdrop-filter·perspective·translate/rotate/scale·contain: layout/paint·will-change 조상이 있으면 그 조상입니다(실제로 transform 부모 안의 fixed가 부모 기준).\n세로 % 패딩은 포함 블록의 '폭'이 기준입니다.",
        },
        {
          term: "쌓임 맥락 (stacking context)",
          body: "z-index를 따로 비교하는 묶음입니다. 묶음 전체가 부모 맥락에서 한 층이 됩니다. 그래서 z-index: 1 안의 999가 형제의 2에 집니다(실제로 elementFromPoint가 형제를 가리킴).\n만드는 것은 z-index 있는 positioned, fixed/sticky, z-index 있는 flex/grid 아이템, opacity < 1(실제로 자식 z 10이 형제 z 1에 짐), transform, filter, clip-path, mask, perspective, isolation: isolate, will-change, contain, container-type: size, top layer입니다.\n모달이 뒤에 깔리면 조상의 맥락부터 봅니다. 처방은 Portal입니다.",
        },
        {
          term: "overflow의 축 연동과 clip vs hidden",
          body: "한 축만 visible·clip이 아니면 다른 축의 visible은 auto가 됩니다(실제로 overflow-y: scroll → overflow-x \"auto\").\nhidden은 스크롤 컨테이너라 scrollTop = 5가 먹고(프로그램 스크롤), BFC를 만들고, sticky 기준이 되고, absolute 자손을 자릅니다.\nclip은 스크롤 컨테이너가 아니라 잘리기만 하고(scrollTop 0), overflow-clip-margin으로 여유를 줍니다.\n잉크 오버플로(그림자)는 스크롤 영역을 늘리지 않습니다.",
        },
        {
          term: "min-content · max-content · fit-content",
          body: "min-content는 줄바꿈 기회마다 줄을 바꾼 폭, 즉 가장 긴 단어의 폭입니다(실제로 'short words here'는 41px). max-content는 전혀 바꾸지 않은 폭입니다(115px). fit-content는 공간 안에서 max-content까지, 모자라면 min-content까지입니다(max-width 150에 걸려 150). 내재 크기(콘텐츠)와 외재 크기(지정)가 어긋나면 넘칩니다.",
        },
        {
          term: "컨테이너 쿼리 (@container)",
          body: "조상 컨테이너의 크기로 규칙을 켭니다. 미디어 쿼리의 대안입니다. container-type: inline-size(또는 size)를 선언해야 합니다. 이 선언이 크기 격리를 걸어, 컨테이너는 자기 콘텐츠로 그 축 크기를 정하지 못합니다(무한 루프 방지). 실제로 같은 .card가 500 컨테이너에선 파랑, 300에선 빨강이었습니다. cqi는 컨테이너 폭의 1%이고(50cqi → 250px), 컨테이너가 없으면 작은 뷰포트 단위입니다. 스타일 쿼리 style(--x)는 커스텀 속성만 봅니다.",
        },
        {
          term: "논리 속성 (logical properties)",
          body: "좌우·상하 대신 인라인(글이 흐르는 축)과 블록(블록이 쌓이는 축)의 start/end로 적는 속성입니다. inline-size, block-size, margin-inline-start, inset-block-start, text-align: start 같은 것입니다. 실제로 writing-mode: vertical-rl에서 inline-size 100은 height 100으로, margin-inline-start는 margin-top으로, padding-block-start는 padding-right로 바뀌었습니다. RTL·세로쓰기 i18n에서 '한 번 쓰면 모든 방향'인 길입니다.",
        },
        {
          term: "계산값 시점 무효 (invalid at computed-value time)",
          body: "var() 치환 뒤 값이 속성에 맞지 않으면 그 선언은 '무시'되지 않습니다. 속성이 초깃값(비상속)이나 상속값으로 떨어집니다. color: green; color: 16px는 파싱 때 버려져 green입니다. 하지만 color: green; color: var(--x)(--x: 16px)는 var가 파서를 통과해 green을 덮고, 계산 때 무효가 되어 실제로 검정이 됐습니다. 대체값 var(--x, fallback)은 '정의되지 않았거나 무효인 변수용'입니다. @property로 등록하면 타입을 검사해 initial-value로 떨어집니다.",
        },
        {
          term: "@property",
          body: "커스텀 속성을 등록하는 at-rule입니다. syntax(필수, \"<length>\" 등), inherits(필수), initial-value(syntax가 \"*\"가 아니면 필수, 계산 독립적이라 3em 불가)를 적습니다. 하나라도 빠지면 규칙 전체가 무효입니다. 등록하면 잘못된 값이 initial-value로 갑니다(실제로 not-a-length → 7px). inherits: false로 상속을 끊고(부모 99px인데 자식 7px), 숫자, 색, 길이로 보간되어 트랜지션과 애니메이션이 됩니다(미등록은 이산). CSS.registerProperty()와 같습니다.",
        },
        {
          term: "보간 (interpolation)과 이산 (discrete), allow-discrete",
          body: "길이·색·숫자·각도·transform·등록된 --var는 두 값 사이를 계산해 부드럽게 바뀝니다(보간). display·visibility·미등록 --var는 50%에서 한 번에 바뀝니다(이산). display는 none과 오갈 때 0%/100%에서 뒤집혀 내용이 전 구간 보입니다. 트랜지션에 이산 속성을 넣으려면 transition-behavior: allow-discrete를, none에서 나올 때의 출발값은 @starting-style(특이성이 같아 원 규칙 뒤에)을 씁니다. height: auto는 보간이 안 됩니다(실제로 즉시 60px). 처방은 interpolate-size: allow-keywords나 calc-size()입니다.",
        },
        {
          term: "transform과 좌표 · 부작용",
          body: "레이아웃을 건드리지 않고 좌표계를 바꾸는 속성입니다. 함수는 오른쪽부터 적용됩니다(rotate(90deg) translateX(10px) → matrix(0, 1, -1, 0, 0, 10), 실제로 100×50이 50×100). transform-origin 기본은 중심(\"50px 25px\")입니다. 개별 속성 translate·rotate·scale은 따로 트랜지션합니다. 부작용은 둘입니다. fixed 자손의 포함 블록이 되고, 쌓임 맥락을 만듭니다(8장). opacity와 함께 합성 단계만 건드려 애니메이션에 가장 쌉니다.",
        },
        {
          term: "font-display와 FOIT · FOUT",
          body: "웹 폰트가 오기 전에 글자를 어떻게 보일지 정합니다.\nblock: ~3s 숨김 → FOIT. 아이콘 폰트용입니다.\nswap: 바로 대체 글꼴 → 폰트가 오면 교체(FOUT). 본문 기본입니다.\nfallback: ~100ms 숨김 → 대체, ~3s 안에 안 오면 대체로 고정.\noptional: ~100ms, 교체 없음.\n실제로 없는 파일의 폰트는 document.fonts에서 loading → error가 됐고, swap이라 그동안 sans-serif로 보였습니다. 교체 때의 흔들림(CLS)은 size-adjust·ascent-override로 대체 글꼴 메트릭을 맞춰 줄입니다.",
        },
        {
          term: "unicode-range와 가변 폰트",
          body: "@font-face에 글자 범위를 적으면, 그 범위의 글자가 쓰일 때만 파일을 받습니다. 한글(U+AC00-D7A3)처럼 큰 폰트를 서브셋으로 쪼개는 표준입니다. 같은 font-family 이름의 @font-face 여럿이 범위별로 합쳐집니다. font-weight: 100 900처럼 범위를 적으면 가변 폰트 한 파일로 모든 굵기를 냅니다. 없는 굵기를 합성하는 faux bold도 막습니다. src에는 local()을 먼저, url() format(\"woff2\")를 후보로 적습니다.",
        },
        {
          term: "CSS 중첩 (nesting)",
          body: "선택자를 부모 규칙 안에 적는 네이티브 문법입니다(Chrome 156 selector(&) true). 결합자 없이 적으면 자손(.nest .child)이고, 복합은 &가 필수입니다(&.mod). &를 뒤에 두면 실제로 .deep & → .deep .nest2처럼 부모 문맥이 뒤로 갑니다. 특이성은 :is()처럼 목록 중 최고입니다. &__elem 식 문자열 이어 붙이기는 안 됩니다(Sass와 다름). 중첩 규칙 뒤의 선언은 CSSNestedDeclarations로 순서를 지킵니다. 미지원 브라우저는 순서가 바뀔 수 있으니 선언을 앞에 둡니다.",
        },
        {
          term: "@layer (cascade layers)",
          body: "규칙 묶음 사이 우선순위를 특이성과 무관하게 정하는 at-rule입니다. @layer reset, base, components, utilities;로 순서를 정합니다(먼저 선언 = 낮음). 파일마다 @layer x { }로 붙이고, @import url() layer(vendor)로 라이브러리를 낮은 레이어에 둡니다. 비레이어 선언은 모든 레이어 위라 탈출구로만 씁니다. !important는 순서를 뒤집어 reset의 important가 가장 셉니다. revert-layer로 한 레이어를 되돌립니다. Tailwind가 실제로 쓰는 구조입니다.",
        },
        {
          term: "@scope와 근접성",
          body: "선택자가 미치는 DOM 범위를 뿌리와 한계로 가두는 at-rule입니다. @scope (.card) to (.slot) { … }가 도넛 스코핑입니다(실제로 한계 안의 p는 기본색). 두 스코프 규칙이 겹치면 뿌리가 가까운 쪽이 이깁니다. 이 '근접성'은 캐스케이드에서 특이성 뒤, 등장 순서 앞입니다(실제로 near가 far를 이김). 선택자에 :where(:scope)가 붙은 듯 특이성은 0을 더하고, 상속은 가두지 않습니다. Vue scoped(속성 선택자 +0-1-0), CSS Modules(해시 이름), BEM이 이것이 없던 시절의 대안입니다. Baseline 2026.",
        },
      ],
    },
    {
      from: "bundle",
      entries: [
        {
          term: "번들러의 다섯 일",
          body: "해석(지정자 → 파일), 변환(.ts/.vue/.css → JS, 자원), 묶기(그래프 → 파일 몇 개), 분할(import() 경계와 공유 모듈에서 청크), 해시(내용 기반 이름).\nVite는 개발에서 해석과 변환만 요청마다 하고, 묶기와 분할과 해시는 건너뜁니다. 그래프는 브라우저 ESM이 따라갑니다. 배포에서는 Rolldown이 다섯을 모두 합니다. 옵션의 접두어(resolve.*, css.*, build.*)가 어느 일인지 알려 줍니다.",
        },
        {
          term: "네이티브 ESM 개발 서버",
          body: "시작할 때 전부 묶지 않는 개발 서버입니다. 브라우저가 <script type=module>의 import를 따라 요청하면 그 파일만 변환해 ESM으로 응답합니다. 실제로 'ready in 53 ms'가 떴고, /src/main.ts를 curl 하면 파일 하나가 왔습니다. TS가 벗겨지고, 상대 import는 /src/util.ts로, 베어 import는 /node_modules/.vite/deps/…로 바뀐 파일입니다. 보이지 않는 모듈은 변환하지 않으니, 전체를 봐야 하는 타입 검사는 못 합니다. tsc --noEmit을 따로 돌립니다.",
        },
        {
          term: "사전 번들링 (dependency pre-bundling)",
          body: "개발 모드에서만 node_modules의 의존성을 Rolldown으로 한 번 묶어 node_modules/.vite/deps에 둡니다. 목적은 둘입니다. CJS/UMD → ESM, 그리고 수백 내부 모듈(lodash-es 600+) → 요청 하나. 캐시는 락파일·patches·설정·NODE_ENV가 바뀌면 무효가 됩니다. 브라우저 쪽은 ?v=browserHash + Cache-Control: max-age=31536000,immutable입니다(실제로). 링크 패키지는 소스로 취급하니 고치면 vite --force를 씁니다.",
        },
        {
          term: "HMR (Hot Module Replacement)과 경계",
          body: "파일이 바뀌면 페이지를 새로 고치지 않고 그 모듈만 바꾸는 메커니즘입니다. 서버가 웹소켓으로 알리면 클라이언트가 ?t=로 다시 import 하고, '받아 주겠다'고 선언한 경계(import.meta.hot.accept)까지 전파합니다. 경계가 없으면 전체를 새로 고칩니다. 실제로 CSS를 고쳐도 window.__marker가 살아 있었습니다. CSS는 JS 모듈이라 <style>만 바꾸면 됩니다. Vue SFC와 React Fast Refresh는 컴포넌트마다 자기 수용 경계입니다. 인스턴스 사이 상태는 dispose/data로 넘깁니다.",
        },
        {
          term: "CSS 모듈 (CSS Modules)과 Lightning CSS",
          body: ".module.css의 클래스 이름을 _title_1a2d1_1처럼 해시로 바꿔 충돌을 없애고, JS에서는 styles.title로 받습니다. 해시가 결정적이라 실제로 개발과 빌드의 이름이 같았습니다. 개발에서 CSS는 __vite__updateStyle로 <style>을 주입하는 JS 모듈로 오고, 빌드에서는 .css로 추출됩니다. 압축은 Vite 8부터 Lightning CSS(build.cssMinify)가 맡습니다. CSS의 default import는 Vite 5에서 없어졌으니 ?inline을 씁니다.",
        },
        {
          term: "assetsInlineLimit와 자산의 세 길",
          body: "import 한 자산은 4096 바이트 미만이면 파일 대신 data URL로 인라인됩니다(실제로 작은 SVG가 dist/assets에 없고 JS 안에 data:image/svg+xml). 크면 /assets/이름-[hash].확장자입니다.\n세 길: import(처리·해시·존재 검사·셰이킹), public/(처리 없이 복사, 이름 고정, 루트 절대 경로), new URL(…, import.meta.url)(정적 문자열만 변환, SSR 불가).\n접미사는 ?url ?raw ?inline ?no-inline ?worker입니다.",
        },
        {
          term: "청크 (chunk)와 내용 해시",
          body: "빌드가 그래프를 접어 만든 파일 단위입니다.\n진입: index.html마다\n비동기: import() 경계(실제로 heavy-9Q5z2xLI.js)\n공유: 둘 이상이 쓰는 모듈\n벤더: advancedChunks로 node_modules 분리(실제로 vendor-Dvd9G-NC.js)\n이름의 해시는 내용 기반이라 바뀐 파일만 갈립니다(--mode staging에 index만 바뀌고 heavy는 그대로). 자산은 immutable 1년, index.html은 no-cache로 짝을 이룹니다. modulepreload가 중첩 import 왕복을 메우고, vite:preloadError가 배포 뒤 404를 처리합니다.",
        },
        {
          term: "매니페스트 (.vite/manifest.json)",
          body: "build.manifest: true로 나오는 '진입점 → 해시 파일·CSS·imports' 지도입니다. 실제로 index.html → assets/index-BPeYG6r7.js, css [assets/index-D3pLvTLE.css], imports [_vendor-Dvd9G-NC.js]였습니다. 서버 템플릿(Rails, Laravel, Django)은 이것을 보고 어떤 해시 파일을 <script>/<link>에 넣을지 압니다. 백엔드 통합의 다리입니다. SSR은 --ssrManifest로 모듈 → 청크 지도를 따로 만듭니다.",
        },
        {
          term: "트리 셰이킹 (tree shaking)과 sideEffects",
          body: "ESM의 정적 import/export를 따라 아무 데서도 안 쓰는 export를 결과에서 뺍니다(실제로 unused()가 번들에 없음). 전제는 둘입니다. 이름이 정적이고(ns[key]·CJS는 불가), 부수 효과가 없어야 합니다(전역 등록·CSS import가 있는 모듈은 남김). package.json \"sideEffects\": false가 '부수 효과 없다' 선언, /* #__PURE__ */는 호출 단위입니다. 배럴 index는 분석과 요청 수 모두에 손해입니다.",
        },
        {
          term: "코드 분할 (code splitting)과 변수 import()",
          body: "import()를 만나면 그 뒤 그래프를 별도 청크로 떼어 필요할 때 받게 합니다. 변수를 섞은 import(`./locales/${lang}.json`)는 './ ../ # 로 시작, 확장자로 끝, 변수는 한 단계' 규칙 안에서 패턴에 맞는 파일을 모두 청크로 만듭니다. import.meta.glob은 실제로 빌드 타임에 파일 목록으로 바뀌어 () => import() 맵(또는 eager 정적 import)이 됐습니다. 라우트 단위 분할은 프레임워크가 맡습니다.",
        },
        {
          term: "import.meta.env와 VITE_ 접두어",
          body: "빌드 시점 상수입니다. MODE, BASE_URL, PROD, DEV, SSR과 .env의 VITE_ 변수만 들어갑니다. 실제로 번들에 api.example.com은 있고 SECRET_KEY/should-not-leak은 없었습니다(undefined로 치환). 파일 순서는 .env < .env.local < .env.[mode] < .env.[mode].local < 셸이고, 모드는 --mode입니다(≠ NODE_ENV). 코드에 글자로 박히므로 '한 번 빌드 여러 환경'은 안 됩니다. 환경마다 빌드하거나 런타임 설정을 씁니다(Nuxt runtimeConfig). 클라이언트 번들은 전부 공개이니 비밀은 서버에 둡니다.",
        },
        {
          term: "Vite 플러그인과 가상 모듈",
          body: "Rolldown(Rollup 호환) 훅(resolveId·load·transform·buildStart…)과 Vite 전용 훅(config·configResolved·configureServer·transformIndexHtml·handleHotUpdate)이 있는 객체입니다. 순서는 enforce pre/post로, 모드는 apply build/serve로 정합니다. 가상 모듈은 id를 \\0 접두어 내부 id로 바꿔 load에서 코드를 만듭니다. 실제로 virtual:build-info가 개발에서 /@id/__x00__virtual:build-info로 서빙됐습니다. 모듈 단위 함수라 개발과 빌드에서 같은 플러그인이 돕니다.",
        },
        {
          term: "Rolldown · Oxc (Vite 8)",
          body: "Vite 8의 도구 사슬입니다. Rolldown(Rust)이 Rollup(배포 묶기)과 esbuild(사전 번들)를 대신합니다. Oxc는 TS/JSX 변환과 JS 압축을, Lightning CSS는 CSS 압축을 맡습니다('Vite 8 uses Rolldown and Oxc based tools instead of esbuild and Rollup'). build.rollupOptions는 build.rolldownOptions(별칭)로 바뀌었습니다. manualChunks의 객체 형태는 없어지고 advancedChunks로 갑니다. 기본 타깃은 Baseline Widely Available(Chrome 111, Firefox 114, Safari 16.4)입니다. 플러그인 API는 호환됩니다.",
        },
        {
          term: "개발과 배포가 다른 자리",
          body: "Vite의 두 코드 경로(사전 번들 + 요청 시 변환 vs Rolldown 전체 묶기)가 어긋나는 곳입니다.\nCJS named import(개발은 관대, 빌드는 'is not exported by')\n순환 import(초기화 순서)\n부수 효과 모듈의 셰이킹\nimport.meta.env(객체 vs 리터럴)\n자산 URL(/src vs /assets-hash, data:)\n변수 import() 규칙\n보험은 vite build && vite preview입니다. 근본 해법은 Rolldown으로 두 경로를 합치려는 '전체 번들 모드'입니다.",
        },
      ],
    },
    {
      from: "nn",
      entries: [
        {
          term: "메타 프레임워크 (meta-framework)",
          body: "React와 Vue가 비워 둔 네 칸, 즉 라우팅, 서버 렌더와 하이드레이션, 데이터 전달, 배포를 채웁니다. 그 대가로 프로젝트 구조와 실행 모델을 정합니다. 예는 Next.js 16(Turbopack, 자체 서버)과 Nuxt 4입니다(Vite 8, Nitro). 둘은 결정을 두는 곳이 다릅니다. Next는 코드 안의 지시어로 정합니다('use client', 'use server', 'use cache'). Nuxt는 설정과 관례로 정합니다(routeRules, server/, .client.vue, useFetch). index.html이 없고, 프레임워크가 HTML을 만듭니다.",
        },
        {
          term: "○ ◐ ƒ (Next 빌드 표)",
          body: "next build 라우트 표의 세 기호입니다.\n○ Static: 빌드 때 프리렌더합니다(x-nextjs-prerender: 1, Cache-Control s-maxage=31536000).\n◐ Partial Prerender: 정적 셸은 빌드 때, Suspense 안의 동적 구멍은 요청 때 스트리밍합니다(x-nextjs-postponed: 1, 실제로 폴백 h1 뒤 실제 내용).\nƒ Dynamic: 요청마다 렌더합니다(route.ts GET 기본).\nCache Components(16 기본)에서는 ◐가 기본이고 generateStaticParams가 돌려준 경로만 ○입니다.",
        },
        {
          term: "Cache Components와 'use cache'",
          body: "Next 16의 기본입니다(cacheComponents: true). 함수·컴포넌트·파일 위의 'use cache'가 캐시 경계입니다. cacheLife(profile)는 stale(클라, 최소 30s)·revalidate(서버, SWR)·expire 셋이고(minutes = 5m/1m/1h, 빌드 표에 '1m 1h'), cacheTag가 태그입니다. 실제로 1초 간격 두 요청의 시각이 같았습니다. 키는 함수+직렬화 인자+클로저라 cookies()/headers()는 안에서 못 쓰고 인자로 넘깁니다. 요청 시점 데이터는 Suspense 안이어야 하고, 어기면 빌드 에러 'accessed outside of <Suspense>'와 세 처방 [stream]·[cache]·[block instant=false]가 뜹니다. export const dynamic은 비호환 에러입니다.",
        },
        {
          term: "재검증 (revalidateTag · updateTag · revalidatePath)",
          body: "Next의 캐시 버리기 셋입니다.\nrevalidateTag(tag, 'max'): 태그 캐시를 오래됨으로 돌립니다(SWR, 둘째 인자가 stale 창). Server Action·Route Handler용입니다.\nupdateTag(tag): 즉시 만료해 같은 요청에서 새 값을 봅니다(read-your-own-writes). Server Action 전용, redirect와 짝입니다.\nrevalidatePath: 경로 단위입니다('태그 선호').\n시간 기반은 cacheLife입니다. 서버리스는 인메모리라 인스턴스별이니 cacheHandler/'use cache: remote'를 씁니다.",
        },
        {
          term: "'use client' 경계와 직렬화",
          body: "파일 맨 위의 지시어가 클라이언트 번들의 경계입니다. 그 파일의 import와 직접 렌더하는 컴포넌트가 클라이언트로 갑니다. 서버 컴포넌트는 children/props로 끼워야 서버에 남습니다. import 하면 끌려가 DB 코드가 드러납니다. 경계를 넘는 props는 직렬화 가능해야 합니다(원시·배열·객체·Date·Map·Promise·JSX; 함수·클래스·Symbol 불가). 클라이언트 컴포넌트도 HTML용으로 서버에서 1회 렌더되니 window는 useEffect 안에서 씁니다. 빌드된 page_client-reference-manifest.js가 그 지도입니다.",
        },
        {
          term: "Server Action ('use server')",
          body: "서버에서 도는 async 함수를 form action·이벤트·useActionState에서 함수처럼 부르는 RPC입니다. 프레임워크가 POST를 만들고 암호화 ID로 식별하지만 '직접 POST 로도 도달 가능'하니 안에서 인증·검증합니다. form action은 void를 반환합니다(값은 useActionState로, 실제로 객체 반환은 타입 에러). redirect는 던지므로 revalidateTag를 앞에 둡니다. cookies().set은 됩니다. 클라이언트 파일에선 정의 못 합니다(import). 예상 에러는 값으로 돌려줍니다.",
        },
        {
          term: "universal 렌더링과 routeRules",
          body: "Nuxt의 기본입니다. 서버가 HTML + payload(data-ssr=\"true\" __NUXT_DATA__)를 만들고, 브라우저가 하이드레이션합니다. routeRules로 경로마다 섞을 수 있습니다.\nprerender: 빌드 때 HTML\nswr: N(실제로 cache-control: s-maxage=60, stale-while-revalidate)\nisr(CDN)\nssr: false(빈 <div id=\"__nuxt\"> SPA, spa-loading-template 권장)\nredirect, proxy, headers, cors\n주의할 점이 있습니다. nuxt generate에서는 섞을 수 없습니다. redirect/proxy는 미들웨어보다 먼저 돌아 보안 수단이 아닙니다.",
        },
        {
          term: "두 번 실행 (Nuxt 컴포넌트)",
          body: "Nuxt 컴포넌트는 기본으로 서버(HTML)와 브라우저(하이드레이션) 양쪽에서 실행됩니다. Next 서버 컴포넌트(1회)와 다른 모델입니다. 그래서 window는 onMounted/import.meta.client에서 씁니다. 한쪽만 돌리려면 <ClientOnly>(서버엔 fallback), .client.vue, .server.vue(아일랜드, 실험적, 격리된 Vue 앱)를 씁니다. 서버엔 반응성이 없어 위에서 아래로 1회 돌고, setup 루트의 setInterval은 누수입니다.\n생명주기: 서버 Nitro 플러그인 → 서버 미들웨어 → 앱 플러그인 → validate → 라우트 미들웨어 → 렌더. 클라이언트 플러그인 → validate → 미들웨어 → mount+hydrate → onMounted.",
        },
        {
          term: "payload (__NUXT_DATA__)와 useFetch",
          body: "서버가 렌더하며 모은 상태(useFetch/useAsyncData의 data, useState, 에러)를 devalue로 직렬화해 <script id=\"__NUXT_DATA__\">에 실어 보내는 통로입니다. 하이드레이션이 이것을 복원하므로 두 번 받지 않습니다. 실제로 useFetch('/api/hello')의 자동 키 $f…와 응답이 payload에 있었고, <h1>home world</h1>은 서버가 그렸습니다. $fetch에는 이 통로가 없어 setup에서 쓰면 2회 요청하니 이벤트 핸들러용입니다. 옵션은 lazy(내비게이션을 막지 않고 status로 봄), server:false, immediate:false+execute, watch, transform/pick, getCachedData입니다. 서버에서 $fetch('/api/x')는 핸들러를 직접 부릅니다.",
        },
        {
          term: "Nitro · h3 · server/",
          body: "Nuxt의 서버 엔진입니다.\nserver/api/*.ts(/api 접두어, .get/.post 접미사가 메서드, [id] 파라미터)\nserver/routes(접두어 없음)\nserver/middleware(모든 요청보다 먼저, 응답을 돌려주지 말고 event.context에)\nserver/utils(자동 import)\nserver/plugins(시작 때 1회)\nh3 헬퍼는 readBody, readValidatedBody, getQuery, getRouterParam, setHeader, setResponseStatus, createError, getCookie입니다. createError는 HTTP 상태 + JSON을 돌려줍니다(실제로 404 JSON). defineCachedEventHandler({ maxAge })는 핸들러를 캐시합니다. 실제로 두 응답의 at이 같았습니다(키는 기본이 URL, 사용자별엔 getKey).\nnuxt build → .output(node_modules 독립, nitro.json에 preset).",
        },
        {
          term: "라우트 미들웨어 vs 서버 미들웨어 (Nuxt)",
          body: "둘은 전혀 다릅니다.\n라우트 미들웨어(app/middleware, definePageMeta({ middleware }), .global)는 Vue 앱 안에서 페이지가 바뀔 때마다 돕니다. 서버 라우트(/api/*)에서는 돌지 않습니다(문서: 'does not run for server routes'). 리다이렉트는 navigateTo로 합니다(실제로 /posts/0 → 302 /).\n서버 미들웨어(server/middleware)는 Nitro에서 모든 HTTP 요청보다 먼저 돕니다(실제로 x-nitro 헤더가 모든 응답에 붙음). /api를 막으려면 이쪽입니다. Next의 proxy.ts(16에서 Middleware를 개명, matcher)가 이 자리입니다.",
        },
        {
          term: "useState (Nuxt)와 요청 간 상태 오염",
          body: "SSR에 맞춘 ref입니다. 키로 공유되고 payload에 실려 하이드레이션 때 복원됩니다(실제로 payload의 state에 count). 직렬화 가능한 값만 담습니다. 패턴은 export const useX = () => useState('x', init)이고, 비동기 초기화는 callOnce, 더 크면 Pinia입니다. 모듈 최상위 const state = ref()는 서버 프로세스가 요청 사이에 공유해 다른 사용자 데이터가 샙니다(Vue 허브에서 실제로 shared 1→2). Next도 같아 React.cache(요청 범위)나 'use cache: private'를 씁니다. 서버에서 상태의 수명은 '요청'입니다.",
        },
        {
          term: "하이드레이션 불일치 (hydration mismatch)",
          body: "서버 HTML과 브라우저 첫 렌더가 다를 때의 경고입니다('Hydration text content mismatch…', React 'Text content does not match…'). 원인은 전부 양쪽이 보는 값의 차이입니다(Date.now(), Math.random(), window, 로캘 포맷, 확장 프로그램 DOM, 잘못된 HTML 중첩). 처방: 서버에서 정해 통로(payload, props)로 넘깁니다. 브라우저 전용은 ClientOnly/useEffect 뒤로 미루고, useId를 씁니다. Next는 connection() 뒤에 둡니다(Suspense 안, 빌드 인사이트 blocking-prerender-random). 억제는 data-allow-mismatch, 최후 수단으로 suppressHydrationWarning입니다.",
        },
        {
          term: "runtimeConfig와 NUXT_ 환경 변수",
          body: "nuxt.config의 runtimeConfig(비공개 키는 서버만, public은 클라이언트도)를 런타임에 NUXT_<KEY>(public은 NUXT_PUBLIC_<KEY>) 환경 변수로 덮어씁니다. 실제로 재빌드 없이 apiBase=/v2-from-env secret=overridden이 됐습니다. '한 번 빌드, 환경마다 다른 값'에 대한 Nuxt의 답입니다(번들링 허브의 VITE_ 치환 한계와 대비). 비공개 키를 SSR 템플릿에 찍으면 실제로 HTML에 들어가니 server/ 안에서만 씁니다. app.config.ts는 빌드 시점이고 반응형이며 비밀 금지입니다. Next는 process.env.X가 서버 런타임, NEXT_PUBLIC_X만 빌드 때 인라인됩니다.",
        },
        {
          term: "배포 산출물 (.next · .output)과 타깃",
          body: "Next: .next/server/app에 라우트별 .html/.rsc/.meta/.segments와 prerender-manifest.json(routes, dynamicRoutes)이 나옵니다. 배포는 next start(모든 기능), Docker standalone, output: 'export'(서버 기능 포기), 어댑터(Vercel, Bun 검증)입니다. 다중 인스턴스는 cacheHandler + NEXT_SERVER_ACTIONS_ENCRYPTION_KEY + deploymentId가 필요합니다.\nNuxt: .output/server/index.mjs + chunks + public + nitro.json(preset node-server 기본, NITRO_PRESET으로 vercel, cloudflare, netlify, PORT/NITRO_PORT)입니다. .output만 복사합니다. nuxt generate는 정적입니다(200/404.html, API 없음).\n빌드는 결정을 고정하고 런타임이 남은 것을 채웁니다. 정적 export는 런타임 쪽을 전부 포기합니다.",
        },
        {
          term: "Nuxt 모듈과 레이어",
          body: "모듈: modules: []에 등록하는 빌드 시점 async 함수(defineNuxtModule + Nuxt Kit의 addPlugin·addServerHandler·addImports·addTemplate)입니다. 런타임 동작은 끼워 넣은 runtime/ 파일 몫입니다. @nuxtjs/i18n·@nuxt/image·@pinia/nuxt가 그 예이며, 설정 키를 false로 끕니다(4.3).\n레이어: nuxt.config가 있는 디렉터리를 extends로 상속합니다. app/의 components·pages·server·config가 defu로 병합됩니다. 우선순위는 프로젝트 > ~~/layers > extends입니다. 레이어 안의 ~/는 사용자 프로젝트를 가리키니 상대 경로나 #layers를 씁니다.\nNext는 모듈 시스템 없이 config 감싸기(withMDX), 어댑터, React 생태계로 풉니다.",
        },
      ],
    },
];

export const dictionary: Dictionary = {
  id: "dict",
  name: "사전",
  tagline: "문서를 읽다 걸린 낱말을 내 말로 다시 적는 곳",
  intro:
    "공식 문서는 첫 문장부터 낱말이 걸립니다. 사용자 인터페이스, 위에 구축된다, 선언적, 프로그래밍 모델. 아는 것 같은데 남에게 설명하라면 막히는 말들입니다. 그런 낱말을 만난 자리마다 하나씩 꺼내 내 말로 다시 적어 둡니다. 절은 낱말이 나온 문서이고, 그 문서에서 이 사전으로 선이 들어옵니다. 왼쪽 포트로 되돌아갈 수 있습니다.",
  sections: dictionarySections.map((section) => ({
    ...section,
    entries: entriesByDocument.find((group) => group.from === section.from)?.entries ?? [],
  })),
};

export function getDictionary(id: string): Dictionary | undefined {
  return id === dictionary.id ? dictionary : undefined;
}
