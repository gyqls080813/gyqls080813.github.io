import type { Idea } from ".";

/**
 * i18n 진단 — 이론 갈래(i18n 열네 단계)를 잣대로 내가 일하는 프로젝트를 재 본
 * 기록. 단계 시트는 사실이라 이론이고, 어느 단계가 비었고 무엇을 먼저 고칠지는
 * 내 판단이라 이쪽이다. 그래프에서는 i18n 허브 아래 마지막 노드로 매단다 —
 * 열네 단계를 읽은 끝에서 "그래서 우리는 어디인가"로 이어지게.
 */
export const i18nIdeas: Idea[] = [
  {
    id: "i18n-commerce-web",
    name: "진단 · commerce-web은 어느 단계인가",
    tagline: "열네 단계 잣대로 재 본 회사 프로젝트, 그리고 무엇을 먼저 고칠지",
    intro:
      "제가 일하는 커머스 웹(Nuxt 3, 다섯 언어)을 i18n 열네 단계에 하나씩 대어 봤습니다. 결론부터 적습니다. 4·7·11·12단계는 제대로 서 있습니다. 6단계와 10단계는 비어 있습니다. 5단계는 절반만 있습니다. 9단계는 기본값에 머물러 있습니다. 비어 있는 자리가 곧 그 자리에서 나는 버그의 이름입니다. 그래서 고칠 순서도 거기서 나옵니다. 선택지 밖의 길 여덟도 재어 보았습니다. 셋은 바로 더하고, 셋은 조건을 적어 두고, 둘은 하지 않습니다. 숫자는 2026년 11월에 저장소를 직접 검색한 값입니다. 검색 범위에 따라 조금씩 다를 수 있어 '약'으로 적었습니다. 외부에 공개하지 않을 설정값과 주소는 뺐습니다.",
    sections: [
      {
        heading: "1. 무엇을 보았나",
        blocks: [
          {
            label: "잣대와 방법",
            body: "단계마다 '이 단계가 있으면 코드에 무엇이 보여야 하나'를 먼저 정하고, 저장소를 검색했습니다.\n4단계는 계층형 열쇠와 언어별 사전 파일입니다.\n5단계는 {name}, 세로줄, @:, i18n-t입니다.\n6단계는 $d, $n과 datetimeFormats입니다.\n7단계는 협상 함수와 쿠키입니다.\n9단계는 지연 로딩 설정과 컴파일러 옵션입니다.\n10단계는 타입 스키마, 린트 플러그인, CI 체크입니다.\n11단계는 표와 생성 스크립트입니다.\n12단계는 요청별 인스턴스와 캐시 헤더입니다.\n각 단계 시트의 '문제' 블록에 적힌 버그가 실제로 날 수 있는 코드인지도 함께 봤습니다.",
            code: "# 단계별로 '있어야 할 것'을 셌다 (apps/commerce-web, 2026-11)\n$t( 를 쓰는 .vue                    약 210 파일\nuseI18n( 을 쓰는 파일                 약 160 파일\nt(key, { … }) 보간 호출              77\n세로줄 복수형 (|)                     0        en 사전에 'item(s)' 표기 3곳\n@: 링크 메시지                        0\n<i18n-t>                             1 파일\n$d( / $n( / datetimeFormats           0\ntoLocaleString() 로케일 없이           62\ndate-fns 고정 패턴 'yyyy.MM.dd …'     3 (utils/datetime.ts)\nDefineLocaleMessage 타입 스키마        0\n@intlify/eslint-plugin-vue-i18n       없음\nCI 에 i18n:check                     없음 (스크립트는 있다)\nI18NStringClass (인라인 5개 언어 객체)  약 90 호출 / 19 파일\n템플릿에 남은 한국어 날글자            5~13 파일 (검색 방법에 따라)",
            codeLang: "text",
            terms: [
              {
                term: "린트 (lint)",
                body: "코드를 실행하지 않고 읽어서, 정해진 규칙에 어긋난 곳을 짚어 주는 도구입니다. 코드의 맞춤법 검사기인 셈입니다. 대표는 ESLint이고, 규칙은 플러그인으로 더합니다. 10단계의 no-missing-keys 같은 규칙도 그런 플러그인에서 옵니다.",
              },
              {
                term: "CI (Continuous Integration, 지속적 통합)",
                body: "코드를 올릴 때마다 서버가 테스트, 린트, 빌드 같은 검사를 자동으로 돌리는 것입니다. 사람이 잊어도 기계는 빠짐없이 돌립니다. GitHub Actions의 PR 체크가 그런 예입니다. 여기에 걸지 않은 검사는 '있지만 돌지 않는' 검사입니다.",
              },
            ],
          },
          {
            label: "단계별 비교표: 지금, 근거, 고른 방식",
            body: "열네 단계를 한 줄씩 대어 본 표입니다. '지금' 열은 그 단계가 저장소에 있는지, '근거' 열은 그렇게 판단한 검색 결과입니다. '더 나은 방식' 열은 그 단계 시트가 권하는 모양입니다. 2절과 3절은 이 표의 ○와 ✗를 풀어 씁니다. 4절은 ✗마다 어떤 길이 있고 무엇을 골랐는지 적습니다. 5절은 그 선택지 밖에 더 나은 길이 있는지 봅니다. 6절은 고른 것을 적용하는 순서, 7절은 근거입니다.",
            code: "단계  이름                 지금               근거 (저장소에서 본 것)                                고른 방식 (선택지는 4절)\n1~3   옛 방식              잔재만 남음         템플릿 한국어 날글자 5~13파일 · I18NStringClass 약 90곳 (2단계식 인라인 객체)   열쇠로 옮기고 린트로 재발을 막는다 · 가짜 로케일로 찾는다\n4     이름표 열쇠           ○ 있음             5개 언어 .js · 약 1,600 열쇠 · $t 약 210 파일 · useI18n 약 160 파일           유지\n5     문장 문법            △ 절반             {name} 보간 77 · 세로줄 복수형 0 · 'item(s)' 3 · @: 0 · i18n-t 1            세로줄 복수형 · 문장 속 링크는 i18n-t\n6     Intl 위임            ✗ 없음             $d/$n 0 · datetimeFormats 0 · toLocaleString() 62 · date-fns 고정 패턴 3     datetimeFormats/numberFormats 선언 + $d/$n\n7     협상과 폴백           ○ 협상 / △ 폴백     resolveLocalePreference(쿼리>쿠키>헤더>ko) · no_prefix · hreflang 0 · UI fallbackLocale 설정 없음   협상 유지 · 주소 전략은 제품 결정\n8     반응형 전환/스코프     ○ 전환 / — 스코프   드롭다운 → useLanguage.setLanguage → setLocale · 로컬 스코프 0 · locale 비교 분기 16    분기 16곳은 사전으로 옮길 후보\n9     지연 로딩/컴파일       ○ 로딩 / ✗ 컴파일   langDir 지연 로딩 · bundle.dropMessageCompiler 미설정 (기본 false)             bundle 옵션 한 줄\n10    타입·린트·CI          ✗ 없음             DefineLocaleMessage 0 · eslint-plugin 없음 · no-hardcoded-text 는 next 프리셋만 · i18n:check CI 미연결   스키마 + 플러그인 + CI 한 줄 + 열쇠 타입 래퍼·missing 핸들러 (첫째)\n11    번역 워크플로          ○ 있음             Sheets → pull → CSV 약 1,600행 → generate (빈칸 검사 · 빈 값 en 채움)           유지 · check 를 CI 로\n12    SSR 요청별 인스턴스     ○ 있음             모듈 플러그인 · locale-vary.ts · strip-i18n-cookie.ts                        유지\n13    기계 번역/LLM          — 없음             채우기 스크립트 없음                                                    10단계가 선 뒤에 붙인다\n14    MessageFormat 2       — 해당 없음         Vue I18n 이 아직 읽지 못함                                               지금은 옮길 곳이 없다\n\n○ 있음   △ 절반   ✗ 없음   — 해당 없음",
            codeLang: "text",
          },
        ],
      },
      {
        heading: "2. 지금 쓰는 방식",
        blocks: [
          {
            label: "뼈대는 4단계, Nuxt 모듈이 7·9·12를 설정으로 넣어 준다",
            body: "@nuxtjs/i18n 10을 씁니다. 그 밑에는 vue-i18n 11이 있습니다. 사전은 i18n/language/{ko,en,ja,zh,zh-Hant}.js에 있고, 약 1,600개 열쇠가 계층형 객체로 들어 있습니다. 전부 Composition API이고 전부 전역 스코프입니다. 로컬 스코프는 없습니다. 주소에 언어를 넣지 않는 no_prefix 전략입니다. 언어는 쿠키(i18n_redirected)로 기억합니다. 협상은 utils/i18n/locale.ts의 resolveLocalePreference가 합니다. 순서는 주소 쿼리 > 쿠키 > Accept-Language > ko입니다. 서버 미들웨어 둘이 있습니다. 하나는 Vary 헤더를 붙이고, 하나는 캐시될 응답의 Set-Cookie를 떼어 냅니다. 12단계 시트의 확인 질문에 나온 두 사고를 정확히 막는 코드가 이미 있는 것입니다. 요청별 인스턴스는 모듈의 플러그인이 만듭니다. 사전은 langDir 설정으로 언어별 지연 로딩됩니다. 언어 전환은 LanguageDropdown → useLanguage의 setLanguage → 모듈의 setLocale 순서로 갑니다. 쿠키는 클라이언트 플러그인(i18n-cookie.client.ts)이 적습니다. 주소의 ?lang 쿼리는 다른 플러그인(lang-query.ts)이 읽어 같은 setLocale을 부릅니다. 8단계의 반응형 전환은 이 길로 이미 됩니다. 다만 코드 안에 locale 값으로 갈라지는 분기(locale.value === 'ko' 같은 if)가 16곳 있습니다. 문장이 아니라 로직이 언어를 아는 자리라서, 옮길 수 있는 것은 사전으로 옮길 후보입니다. <html lang>은 글꼴 플러그인(pretendard-font.ts)이 useHead에 함수를 넘겨 locale을 따라 반응형으로 적습니다. 같은 자리에서 일본어일 때만 일본어 글꼴 CSS를 붙입니다. 8단계 시트의 'html lang과 dir' 블록이 말하는 모양이 이미 있는 것입니다. hreflang과 useLocaleHead는 없습니다. no_prefix라 주소로 언어를 가를 수 없어서, 검색 엔진에 언어별 페이지를 알릴 길이 없습니다. 이 부분은 주소 전략을 바꿀 때 함께 결정할 일입니다.",
            code: "// nuxt.config.ts 의 i18n 블록 (요약)\ni18n: {\n  locales: [{ code: 'ko', file: 'ko.js' }, { code: 'en', file: 'en.js' }, { code: 'ja', file: 'ja.js' },\n            { code: 'zh', file: 'zh.js' }, { code: 'zh-Hant', file: 'zh-Hant.js' }],\n  defaultLocale: 'ko',\n  langDir: 'language',                  // 9단계: 언어별 지연 로딩\n  strategy: 'no_prefix',                // 7단계: 주소에 언어 없음 → 캐시는 Vary 로\n  detectBrowserLanguage: { useCookie: true, cookieKey: 'i18n_redirected', alwaysRedirect: false },\n}\n\n// server/middleware/locale-vary.ts, strip-i18n-cookie.ts  ← 12단계의 캐시 사고 둘을 막는다",
            terms: [
              {
                term: "no_prefix 전략",
                body: "주소에 언어를 넣지 않는 방식입니다. /cart 주소 하나로 모든 언어를 보여 주고, 어느 언어로 보일지는 쿠키가 정합니다. 주소는 깔끔합니다. 하지만 같은 주소가 사람마다 다른 내용을 내므로 캐시에 Vary를 걸어야 합니다. 7단계 시트의 주소 전략 표에서 세 방식을 비교합니다.",
              },
              {
                term: "전역 스코프와 Composition API",
                body: "전역 스코프는 앱 전체가 사전 하나와 locale 하나를 함께 쓰는 것입니다. 로컬 스코프는 컴포넌트마다 자기 사전을 따로 두는 것입니다. Composition API는 Vue 3의 useI18n() 방식입니다. this.$i18n을 쓰는 옛 Legacy API와 다릅니다. 8단계 시트가 이 둘을 다룹니다.",
              },
            ],
          },
          {
            label: "번역 흐름은 11단계 그대로",
            body: "Google Sheets가 원본입니다. pnpm i18n:pull이 표를 CSV(약 1,600행, sync_id 열)로 받아 옵니다. pnpm i18n:generate가 그 CSV로 다섯 언어 파일을 만듭니다. 생성 스크립트는 세 가지를 합니다. 빈칸 집합을 ko와 대조하고, 빈 값은 en으로 채우고, 열쇠 없는 행은 거부합니다. 11단계 시트의 '생성할 때 검사한다' 블록이 거의 그대로 있습니다. i18n:export로 거꾸로 올리는 길도 있습니다. 다만 i18n:check 스크립트가 PR 워크플로에 걸려 있지 않습니다. 그래서 검사는 사람이 직접 돌릴 때만 돕니다.",
          },
          {
            label: "서버 데이터의 번역은 다른 길로 간다",
            body: "상품명이나 공지처럼 API에서 오는 문장은 사전에 없습니다. 응답 안에 언어별 필드가 있고, getLocalizedValue()가 그중 하나를 고릅니다. 호출은 약 150곳입니다. UI 문장의 i18n과는 다른 축이고, Vue I18n이 다루지 않으니 단계 잣대 밖입니다. 다만 이 폴백 사슬이 7단계의 fallbackLocale과 따로 적혀 있습니다. 사슬은 요청 언어 → en → ko → ja → zh이고, 번체는 zh-Hant → zh → en → ko → ja입니다. 둘이 어긋나면 UI는 영어인데 상품명은 한국어인 화면이 나올 수 있습니다. 그런데 UI 쪽 앱 설정에서는 fallbackLocale을 찾지 못했습니다. 이 설정이 없으면 vue-i18n은 폴백 없이 열쇠 글자를 그대로 보입니다. 11단계의 generate가 빈칸을 en으로 채우므로 실제로 빈 열쇠는 드뭅니다. 그래도 두 폴백 순서가 한 곳에 적혀 있지 않다는 문제는 남습니다.",
          },
        ],
      },
      {
        heading: "3. 비어 있는 자리와 거기서 나는 버그",
        blocks: [
          {
            label: "6단계 공백: 날짜와 금액을 코드가 찍는다",
            body: "$d와 $n이 한 번도 쓰이지 않았습니다. datetimeFormats와 numberFormats도 설정에 없습니다. 날짜는 date-fns로 'yyyy.MM.dd HH:mm'을 어느 언어에서나 똑같이 찍습니다. 금액은 toLocaleString()을 로케일 없이 62곳에서 부릅니다. 6단계 시트의 두 번째 문제가 그대로 있는 것입니다. 영어 사용자에게 2026.11.11이 보입니다. 서버(Node)와 브라우저의 기본 로케일이 다르면 SSR과 클라이언트의 금액 표기가 달라집니다. 그러면 하이드레이션 불일치가 날 수 있습니다. 통화는 utils/payment.ts의 formatCurrencyAmount가 따로 처리합니다. 이것도 Intl.NumberFormat에 로케일을 넘기는 쪽으로 모을 수 있습니다.",
            terms: [
              {
                term: "하이드레이션 불일치 (hydration mismatch)",
                body: "서버가 만든 HTML과 브라우저가 다시 그린 결과가 다를 때 Vue가 내는 경고입니다. 서버는 '1,234,567'을, 브라우저는 '1.234.567'을 찍으면 글자가 달라 경고가 납니다. 화면이 한 번 깜빡이고, 심하면 잘못된 쪽이 남습니다. 12단계 시트의 하이드레이션 항목을 참고하세요.",
              },
            ],
          },
          {
            label: "10단계 공백: 열쇠의 짝을 아무도 보지 않는다",
            body: "타입 스키마가 없어서 ko.js와 ja.js의 모양이 달라도 컴파일이 통과합니다. 린트 플러그인도 없어서 t('cart.chekout') 같은 오타나 템플릿의 한국어 날글자가 저장할 때 잡히지 않습니다. 모노레포의 eslint-config에 자체 규칙 no-hardcoded-text가 있기는 합니다. 하지만 next 프리셋에만 있고, commerce-web이 쓰는 nuxt 프리셋에는 없습니다. i18n:check도 CI에 없습니다. 결국 4단계 시트의 두 문제(빠진 열쇠가 찍힌다, 이름표가 썩는다)를 사용자 화면에서야 발견합니다. 1단계부터 이어진 하드코딩도 마찬가지입니다. useEventApplicantForm.ts 같은 곳의 템플릿 리터럴 열쇠는 10단계 시트의 '동적 열쇠' 문제이기도 합니다.",
            terms: [
              {
                term: "모노레포와 린트 프리셋",
                body: "모노레포는 여러 앱과 패키지를 한 저장소에 두는 방식입니다. 공통 설정을 packages/ 아래 패키지로 만들어 앱들이 가져다 씁니다. 린트 프리셋은 그렇게 묶어 둔 규칙 세트입니다. next 프리셋과 nuxt 프리셋이 따로 있어서, 한쪽에 넣은 규칙이 다른 쪽에는 자동으로 들어가지 않습니다.",
              },
            ],
          },
          {
            label: "5단계 절반: 보간은 쓰고 복수형과 링크는 안 쓴다",
            body: "{name} 보간은 77곳에서 씁니다. 하지만 세로줄 복수형은 0곳이고, 영어 사전에는 'item(s)'처럼 괄호로 피한 표기가 있습니다. 영어 화면에 '1 items'나 '3 item(s)'가 보이는 까닭입니다. @: 링크 메시지는 0곳, i18n-t는 한 파일입니다. 문장 속 링크는 아마 문장을 쪼개 코드에서 붙이고 있을 것입니다. 그러면 5단계 시트의 '어순이 다른 언어에서 코드가 조립하면 틀린다'가 영어와 일본어 화면에서 날 수 있습니다.",
          },
          {
            label: "9단계 기본값: 컴파일러가 번들에 남아 있다",
            body: "지연 로딩은 모듈이 해 줍니다. 하지만 사전 컴파일 설정은 기본값 그대로입니다. @nuxtjs/i18n의 bundle 옵션(runtimeOnly, dropMessageCompiler)이 nuxt.config에 없어 기본값 false입니다. 그래서 메시지 컴파일러가 클라이언트 번들에 들어 있고, 열쇠 1,600개의 문장을 실행 중에 파싱합니다. 9단계 데모에서 컴파일러 하나는 gzip 6 kB였습니다. 큰 수치는 아닙니다. 하지만 설정 한 줄이면 되고, 켜면 문장 문법 오류가 빌드에서 잡히는 부수 효과가 더 큽니다.",
          },
          {
            label: "잔재: 사전 밖의 사전",
            body: "model/common.ts의 I18NStringClass는 객체 하나에 다섯 언어 문장을 인라인으로 담습니다. 2단계식 구조입니다. 결제 오류 메시지 등 약 90곳에서 new로 만듭니다. 이 문장들은 Sheets에 없어서 번역가가 볼 수 없고, 10단계 검사를 만들어도 빠져나갑니다. 템플릿에 남은 한국어 날글자(5~13파일)도 같은 성격입니다. 두 잔재 모두 '열쇠를 사전으로 옮기기'라는 기계적인 작업으로 없앨 수 있습니다. 하지만 린트가 없으면 다시 생깁니다.",
            terms: [
              {
                term: "인라인 객체 (inline object)",
                body: "값을 따로 파일로 빼지 않고 코드 안에 바로 적은 객체입니다. { ko: '결제 실패', en: 'Payment failed', ja: … }처럼 다섯 언어가 코드 한가운데 들어 있는 것입니다. 사전과 떨어져 있어서 번역 표에도, 검사에도 잡히지 않습니다.",
              },
            ],
          },
        ],
      },
      {
        heading: "4. 선택지: 공백을 메우는 길은 하나가 아니다",
        blocks: [
          {
            label: "6단계: 날짜와 숫자를 누가 찍나",
            body: "길은 셋입니다.\nA는 Vue I18n의 $d, $n을 쓰고 형식을 nuxt.config의 datetimeFormats, numberFormats에 둡니다.\nB는 유틸에서 Intl.DateTimeFormat, Intl.NumberFormat을 직접 부르고 로케일만 i18n에서 받습니다.\nC는 date-fns에 locale 객체와 패턴을 넘깁니다.\nA는 형식이 한 곳에 모이고 서버와 브라우저 글자도 같지만, useI18n이 컴포넌트 안에서만 됩니다. B는 컴포넌트 밖에서도 되지만 형식이 흩어집니다. C는 패턴(yyyy.MM.dd)을 사람이 적으니 6단계의 '표준에 맡긴다'를 놓칩니다. 그래서 A가 기본이고, 결제 모듈 같은 컴포넌트 밖에서만 B를 씁니다. 상대 시간('3일 전')은 Intl.RelativeTimeFormat이 맡습니다.",
            code: "선택지                       장점                                  단점                                   언제\nA  $d/$n + 형식 선언          로케일·형식이 한 곳 · SSR 일치           컴포넌트 밖에서는 $i18n 을 꺼내 써야 함      기본\nB  Intl 직접 + 로케일 전달     어디서나 호출 가능 · 라이브러리 독립        형식 옵션이 유틸마다 흩어짐                 결제 모듈 등 컴포넌트 밖\nC  date-fns 유지 + locale    기존 코드 변화 최소                      패턴을 사람이 적음 · 언어별 패턴 관리 필요     고르지 않음",
            codeLang: "text",
            terms: [
              {
                term: "Intl.RelativeTimeFormat",
                body: "'3일 전', '방금'처럼 지금을 기준으로 한 시간을 로케일에 맞게 적어 주는 Intl의 기능입니다. 숫자와 단위(-3, 'day')를 넘기면 한국어는 '3일 전', 영어는 '3 days ago'를 돌려줍니다. 다만 '방금'과 '어제'의 경계를 어디에 둘지는 제품이 정합니다.",
              },
            ],
          },
          {
            label: "10단계: 열쇠의 짝을 누가 보나",
            body: "길은 셋입니다.\nA는 @intlify/eslint-plugin-vue-i18n입니다. no-missing-keys, no-raw-text, no-unused-keys가 바로 돌고, $t, t, <i18n-t>와 .js 사전을 읽습니다. 대신 외부 의존이 늘고, no-raw-text가 숫자, 기호, 브랜드명까지 잡아 ignorePattern이 필요합니다.\nB는 no-hardcoded-text를 nuxt 프리셋에 켜고, i18n:check에 '코드가 부르는 열쇠를 모아 사전과 대조'하는 단계를 더합니다. 외부 의존은 없지만 플러그인이 푼 <i18n-t keypath> 등을 다시 풀고 유지해야 합니다.\nC는 DefineLocaleMessage와, 열쇠 유니온을 받는 t 래퍼만 씁니다. 템플릿의 $t와 날글자는 못 보고, 1,600개 유니온이 컴파일을 늦춥니다.\n기준은 '사람 손 없이 PR에서 막히는가', '날글자도 보는가', '유지 비용'입니다. A를 골라 타입 스키마와 CI의 i18n:check를 더합니다. no-raw-text와 no-hardcoded-text는 겹치니 하나만 켭니다. 변수 열쇠 23곳은 셋 다 못 보니 5절 ㄱ의 래퍼가 덮습니다.",
            code: "선택지                              보는 것                              못 보는 것                       유지\nA  eslint-plugin-vue-i18n            코드의 열쇠 · 날글자 · 안 쓰는 열쇠      변수 열쇠 23곳                     플러그인 업데이트만\nB  자체 규칙 + i18n:check 확장         날글자(이미 있음) · 열쇠는 추가 구현       i18n-t · 템플릿 $t 는 직접 구현       직접\nC  타입 스키마 + t 래퍼                사전끼리 모양 · script 의 t 열쇠         템플릿 $t · 날글자                   컴파일 시간 ↑\n고른 것  A + 타입 스키마(사전끼리) + 기존 i18n:check 를 CI 에   (+ 5절 ㄱ·ㄴ: 열쇠 타입 래퍼, missing 핸들러)",
            codeLang: "text",
            terms: [
              {
                term: "ignorePattern",
                body: "린트 규칙에 '이 모양의 글자는 날글자로 치지 말라'고 알려 주는 정규식 설정입니다. 숫자, 문장 부호, 브랜드 이름처럼 번역할 필요가 없는 글자를 여기에 적어 두지 않으면 no-raw-text가 전부 오류로 잡습니다.",
              },
            ],
          },
          {
            label: "5단계 복수형: 지금 할 일인가",
            body: "길이 셋 있습니다.\nA는 세로줄 복수형입니다. 문장 파일이 처리하고 코드는 숫자만 넘깁니다. 단점은 Sheets 셀에 세로줄 문법이 들어가 번역가가 그 규칙을 알아야 한다는 점입니다. 11단계 검사에 '칸 수가 en과 같은가'도 더해야 합니다.\nB는 열쇠를 나누는 길입니다. cartItems_one과 cartItems_other를 따로 두고, 코드가 Intl.PluralRules로 범주를 골라 열쇠를 조립합니다. 라이브러리에 묶이지 않아 14단계로 옮길 때 유리합니다. 단점은 코드가 복수형을 알아야 하고, 열쇠와 Sheets 행이 늘어난다는 점입니다.\nC는 지금의 'item(s)' 표기를 그대로 두는 길입니다. 바꿀 것이 없습니다.\n복수형은 영어 한 언어의 품질 문제입니다. 한국어, 일본어, 중국어는 복수형이 없어 상관없습니다. 기준은 영어 고객의 비중, 그리고 번역가가 문법을 감당할 수 있는가입니다. A를 골랐지만 순서는 셋째로 미뤘습니다. 영어 사용자 비중이 낮다면 C를 유지해도 틀린 결정이 아닙니다.",
            code: "선택지                     바꾸는 곳                        장점                          단점\nA  세로줄 복수형             en 사전 3줄 · 호출 3곳 · 검사 1줄   코드는 숫자만 · 표준적인 Vue I18n 방식   번역가가 문법을 알아야 함\nB  열쇠 분리 + PluralRules   열쇠 ×2 · 코드에 범주 선택         라이브러리 독립 · MF2 이행 유리          코드가 복수형을 안다 · 행 증가\nC  'item(s)' 유지            없음                            변경 없음                      영어 품질 (ko·ja·zh 는 무관)\n고른 것  A, 셋째 순서. 영어 비중이 낮으면 C 유지도 합리적",
            codeLang: "text",
          },
          {
            label: "9단계 컴파일: 켤 조건",
            body: "길이 둘입니다.\nA는 @nuxtjs/i18n의 bundle 옵션에서 dropMessageCompiler를, 필요하면 runtimeOnly도 켜는 길입니다. 설정 한 줄로 번들에서 메시지 컴파일러가 빠지고, 문장 문법 오류가 빌드에서 잡힙니다. 조건은 실행 중에 문장 문자열을 새로 컴파일하는 곳이 없어야 한다는 것입니다. API 응답의 문장을 $rt나 t로 컴파일하는 코드가 그런 곳입니다. 저장소에 $rt 호출은 0이고, API 문장은 getLocalizedValue로 가서 t를 거치지 않으니 조건을 충족합니다.\nB는 기본값을 두는 길입니다. 바꿀 것이 없습니다. 비용은 gzip 약 6 kB와 실행 중 파싱입니다. 첫 화면이 쓰는 열쇠만 파싱하므로 체감은 작습니다.\n기준은 '조건을 만족하는가'와 '빌드가 문법을 검사해 주는 부수 효과를 원하는가'입니다. 시험 빌드로 한 번 확인한 뒤 A를 적용하기로 했습니다.",
            code: "선택지                          얻는 것                              조건 / 비용                       판단\nA  bundle.dropMessageCompiler    번들 ↓ · 문법 오류가 빌드에서            실행 중 문장 컴파일이 없어야 함 ($rt 0 ✓)   시험 빌드 후 적용\nB  기본값 유지                   변경 없음                             gzip 약 6 kB · 실행 중 파싱           A 가 막히면",
            codeLang: "text",
          },
          {
            label: "잔재: 옮기나, 잇나",
            body: "I18NStringClass 약 90곳을 두고 길이 셋입니다.\nA는 열쇠로 옮겨 Sheets에 올리는 길입니다. 번역가가 볼 수 있고 10단계 검사도 받습니다. 결제 오류처럼 서버 코드에 따라 갈리는 문장은 payment.error.<코드> 열쇠로 열거해 둡니다.\nB는 클래스를 그대로 두고, 인스턴스를 모아 Sheets로 내보내는 스크립트를 더하는 길입니다. 코드 변경이 가장 적습니다. 단점은 사전이 영영 두 체계로 남고, 린트가 이 길을 보지 못한다는 점입니다.\nC는 과도기 어댑터입니다. 클래스 안에서 t를 부르게 바꿔, 호출부는 그대로 두고 문장만 사전으로 옮깁니다. A로 가는 중간 단계입니다.\n기준은 '한 체계로 모이는가'와 '린트가 보는가'입니다. A를 골랐고 순서는 넷째입니다. 약 90곳은 기계적으로 바꿀 수 있는 크기입니다.",
            code: "선택지                      코드 변경        결과                              린트가 보나\nA  열쇠로 옮긴다              약 90곳 치환      한 체계 · 번역가가 본다                 ✓\nB  클래스 유지 + 내보내기       스크립트 1개      두 체계 영구화                        ✗\nC  어댑터 (클래스가 t 를 부름)   클래스 1곳       호출부 그대로 · 결국 A 로               △ (열쇠는 봄)\n고른 것  A, 넷째 순서",
            codeLang: "text",
          },
          {
            label: "주소 전략: 바꾸지 않는 이유와 바꿀 조건",
            body: "7단계 시트에 적은 세 전략이 여기서도 선택지입니다. 지금의 no_prefix를 유지하는 길, 기본 언어만 빼고 /en, /ja를 붙이는 길, 전부 붙이는 길입니다. 유지하는 이유는 둘입니다. no_prefix의 약점인 캐시 문제를 서버 미들웨어 둘이 이미 막고 있습니다. 또 바꾸면 모든 링크와 검색 색인, 공유된 주소가 한꺼번에 바뀌어, i18n이 아니라 제품의 결정이 됩니다. 바꿀 조건도 적어 둡니다. 언어별 검색 노출이 매출에 중요해져 hreflang이 필요할 때, 또는 공유한 링크가 받는 사람의 언어로 열린다는 불만이 들어올 때입니다. 그때는 prefix_except_default가 자연스럽습니다. 한국어 주소는 그대로 두고 다른 언어에만 경로가 생기기 때문입니다.",
            code: "선택지                  공유 링크        검색 색인              캐시              지금\nno_prefix (유지)        받는 사람 언어    언어당 1페이지 못함       Vary 로 막음 (있음)   ○\nprefix_except_default   보낸 사람 언어    hreflang 가능          주소가 키           바꿀 조건이 오면\nprefix                  보낸 사람 언어    hreflang 가능          주소가 키           한국어 주소까지 바뀜",
            codeLang: "text",
          },
        ],
      },
      {
        heading: "5. 더 나은 길은 없나: 선택지 밖을 본다",
        blocks: [
          {
            label: "4절의 길은 전부 지금 틀 안에 있다",
            body: "4절에서 고른 길은 모두 지금 쓰는 틀(@nuxtjs/i18n, vue-i18n, Sheets) 안에서 빈자리를 메우는 길입니다. 그래서 틀 밖에 더 나은 길은 없는지 한 번 더 따져 봅니다. 여덟 가지를 보고, 각각을 넷 중 하나로 판정했습니다.\n'지금 더 낫다'는 고른 것에 바로 더하는 길입니다.\n'조건이 오면'은 적어 둔 조건이 생길 때 다시 재는 길입니다.\n'새로 시작할 때만'은 설계로는 더 낫지만, 이 프로젝트에서는 옮기는 비용이 이득보다 큰 길입니다.\n'하지 않는다'는 지금도 나중에도 이 프로젝트에 맞지 않는 길입니다.\n판정 기준은 4절과 같습니다. 사람 손 없이 막히는지, 한 체계로 모이는지, 옮기는 비용이 얼마인지 봅니다. 여기에 하나를 더했습니다. 이미 잘 되는 7, 11, 12단계를 깨뜨리지 않는지입니다.",
            code: "길                                     메우는 자리         판정             한 줄 근거\nㄱ 열쇠를 타입으로 뽑아 변수 열쇠까지 잡는다    10단계             지금 더 낫다       린트가 못 보는 23곳을 tsc 가 본다. 추가만 하는 변경\nㄴ missing 핸들러 → 에러 추적               10단계 · 7단계      지금 더 낫다       코드를 읽는 도구가 못 보는 것을 실행 중에 잡는다. Sentry 가 이미 있다\nㄷ 가짜 로케일                             10단계 · 잔재       지금 더 낫다       날글자와 넘침이 화면에서 바로 보인다. 개발 환경에만\nㄹ Sheets → TMS (Tolgee 등)                11단계 · 13단계     조건이 오면        열쇠별 검토 상태·이력·문맥 화면을 얻는다. 옮기는 비용이 있다\nㅁ 문장을 함수로 컴파일 (Paraglide JS)        9 · 10단계         새로 시작할 때만    타입·번들은 가장 좋다. Nuxt 모듈이 주는 7·12단계를 다시 만들어야 한다\nㅂ ICU·Fluent 문법을 지금 끼운다             5단계 · 14단계      하지 않는다        실험 기능 위에 1,600 문장을 옮긴다. 영어 한 언어의 문제다\nㅅ 사전을 배포에서 떼어 낸다 (OTA)            9단계 · 11단계      조건이 오면        번역 수정을 배포 없이 내보내야 할 때만 이득. 실행 중 의존이 하나 생긴다\nㅇ 서버 데이터의 번역을 서버에서 끝낸다         잔재 · 7단계        조건이 오면        API 가 로케일을 받으면 약 150곳과 폴백 사슬 하나가 사라진다",
            codeLang: "text",
          },
          {
            label: "ㄱ 열쇠를 타입으로 뽑아 변수 열쇠까지 잡는다",
            body: "4절 C의 약점은 '템플릿의 $t와 날글자를 못 본다'였습니다. 그래서 린트를 골랐습니다. 그런데 린트의 약점은 변수로 넘기는 열쇠 23곳입니다. 둘을 합치면 서로의 약점을 덮습니다. 방법은 이렇습니다. 사전 객체의 잎 경로를 전부 펼친 MessageKey 유니온 타입을 만듭니다. 그 타입만 받는 좁은 래퍼 tk를 둡니다. 변수로 열쇠를 고르는 자리는 as const satisfies Record<상태, MessageKey> 객체로 적습니다. 그러면 오타는 tsc가 잡고, 상태가 늘면 객체에도 넣으라고 tsc가 잡습니다. 유니온 타입은 두 길로 만들 수 있습니다. 하나는 타입 수준에서 typeof ko를 펼치는 것입니다. 다만 ko.js가 JS 파일이라 allowJs가 켜져 있거나 .ts로 바꿔야 합니다. 다른 하나는 i18n:generate 스크립트가 사전 파일을 만들 때 message-keys.d.ts도 함께 내보내는 것입니다. 스크립트는 이미 열쇠 목록을 전부 알고 있어서 몇 줄이면 됩니다. 저는 둘째 길이 맞다고 봅니다. 생성물이 둘이 되지만 원본은 여전히 Sheets 하나이기 때문입니다. 비용은 열쇠 1,600개 유니온 타입의 컴파일 시간인데, TypeScript는 이 크기의 유니온을 흔히 다룹니다. 10단계 A에 이것을 더하는 것이 4절에서 고른 것을 고치는 유일한 변경입니다.",
            code: "// 1. 열쇠 유니온 — 사전 객체의 잎 경로를 전부 펼친다 (또는 i18n:generate 가 message-keys.d.ts 로 내보낸다)\ntype Leaves<T, P extends string = ''> = T extends string\n  ? P\n  : { [K in keyof T & string]: Leaves<T[K], P extends '' ? K : `${P}.${K}`> }[keyof T & string];\nexport type MessageKey = Leaves<typeof ko>;      // 'cart.open' | 'cart.checkout' | 'order.status.paid' | …\n\n// 2. 좁은 래퍼 — vue-i18n 의 t 는 어떤 string 이든 받지만, tk 는 열쇠만 받는다\nconst tk = (key: MessageKey, ...args: unknown[]) => t(key, ...args);\n\n// 3. 변수 열쇠 23곳 — 열거 객체가 열쇠 타입을 만족해야 한다\nconst STATUS_KEY = {\n  paid: 'order.status.paid', shipped: 'order.status.shipped', canceled: 'order.status.canceled',\n} as const satisfies Record<OrderStatus, MessageKey>;\ntk(STATUS_KEY[status]);                           // 변수인데도 타입이 본다\n\n// tsc 결과 — 오타를 넣고 돌렸다\n//  error TS2345: Argument of type '\"cart.chekout\"' is not assignable to parameter of type '\"order.status.canceled\" | … | \"cart.checkout\"'\n//  error TS2820: Type '\"order.status.shiped\"' is not assignable … Did you mean '\"order.status.shipped\"'?",
            terms: [
              {
                term: "열쇠 유니온 타입 (message key union)",
                body: "사전의 모든 열쇠 경로를 'cart.open' | 'cart.checkout' | …처럼 '이 중 하나'로 묶은 TypeScript 타입입니다. 이 타입만 받는 함수에 오타를 넘기면 컴파일 오류가 납니다. 사전 객체에서 템플릿 리터럴 타입으로 펼치거나, 생성 스크립트가 .d.ts 파일로 내보내 만듭니다. 10단계 시트의 '동적 열쇠' 블록에 데모가 있습니다.",
              },
            ],
            notes: [
              {
                title: "실제로 돌려 보면",
                body: "TypeScript 6.0으로 위 파일을 --strict로 돌렸습니다. 오타 두 곳에서 정확히 두 오류가 났고, 고친 파일은 오류 0이었습니다. 10단계 시트에서는 t('cart.chekout')이 tsc를 그냥 통과했습니다. 차이는 래퍼 하나입니다.",
                bottom: true,
              },
            ],
          },
          {
            label: "ㄴ 빠진 열쇠를 실행 중에 에러 추적으로 보낸다",
            body: "린트·타입·CI는 코드를 읽습니다. 실행해야 드러나는 것은 못 봅니다. 서버 응답의 코드로 조립한 열쇠, Sheets에서 지워졌는데 코드가 아직 부르는 열쇠, 배포 뒤에도 캐시에 남은 옛 코드가 부르는 열쇠가 그렇습니다. vue-i18n의 missing 옵션에 함수를 넘기면 사전에 없는 열쇠를 만날 때마다 (locale, key)로 불립니다. 저장소에는 @sentry/nuxt가 이미 있습니다. 그래서 이 함수에서 captureMessage 한 줄을 부르면 사용자 화면에 열쇠가 찍히는 순간 알림이 옵니다. 설정 자리는 @nuxtjs/i18n이 읽는 i18n.config.ts입니다. 지금 저장소에는 이 파일이 없어 vue-i18n 옵션이 전부 기본값입니다. 2절에서 적은 'fallbackLocale 설정 없음'도 같은 파일에서 함께 정할 수 있습니다. 주의할 점이 둘입니다. 핸들러는 폴백 단계마다 불립니다. ja에 없어 en으로 내려갈 때도 한 번 불리므로, 마지막 폴백 언어에서 불린 것만 보내야 소음이 없습니다. 그리고 같은 열쇠가 화면마다 반복되므로 한 세션에 한 번만 보내는 중복 제거가 필요합니다. 비용은 파일 하나와 열 줄입니다.",
            code: "// i18n/i18n.config.ts — 모듈이 이 이름의 파일을 vue-i18n 옵션으로 읽는다\nimport * as Sentry from '@sentry/nuxt';\n\nexport default defineI18nConfig(() => {\n  const sent = new Set<string>();\n  return {\n    legacy: false,\n    fallbackLocale: 'en',                                  // 2절: 지금은 설정이 없다\n    missing: (locale, key) => {\n      if (locale !== 'en' || sent.has(key)) return;        // 마지막 폴백에서, 세션에 한 번만\n      sent.add(key);\n      Sentry.captureMessage(`i18n missing: ${key}`);      // 서버에서는 로그로 떨어진다\n    },\n  };\n});\n\n// 데모 (vue-i18n 11.4.18) — ja 에 cart.open 이 없고, cart.chekout 은 어디에도 없다\nt('cart.open')     → 'Open cart'       핸들러: ja/cart.open                       ← 폴백. 보내지 않는다\nt('cart.chekout')  → 'cart.chekout'    핸들러: ja/cart.chekout, en/cart.chekout   ← en 에서 불렸다. 보낸다",
            terms: [
              {
                term: "missing 핸들러",
                body: "vue-i18n이 사전에서 열쇠를 못 찾았을 때 대신 부르는 함수입니다. 어느 언어에서 어느 열쇠가 없었는지를 받습니다. 폴백 단계마다 불리므로 마지막 폴백 언어에서 불린 것이 진짜 빠진 열쇠입니다. 10단계 시트의 '방법 4' 블록에 데모가 있습니다.",
              },
            ],
          },
          {
            label: "ㄷ 가짜 로케일로 날글자와 넘침을 화면에서 본다",
            body: "린트의 no-raw-text는 코드에서 날글자를 잡고, 가짜 로케일은 화면에서 잡습니다. 영어 사전의 모든 문장을, 모음에 부호를 붙이고 꼬리를 늘인 가짜 언어로 바꿉니다. 그리고 개발 환경의 여섯째 로케일로 등록합니다. 이 언어로 화면을 켜면 번역을 거친 문장은 모두 [ ]로 감싸여 보이고, 거치지 않은 날글자만 한국어로 남습니다. 3절의 '한국어 날글자 5~13파일'을 찾는 가장 빠른 길입니다. 문장이 30% 길어지므로 버튼과 칸이 넘치는 자리도 미리 보입니다. 지금은 영어가 가장 길지만, 나중에 독일어나 러시아어를 붙일 때 레이아웃이 어디서 깨질지 미리 알 수 있습니다. 비용은 열 줄짜리 변환 스크립트, 그리고 nuxt.config의 locales 배열에 개발 환경에서만 넣는 항목 하나입니다. 배포 번들에는 들어가지 않게 조건을 둡니다. 잔재 정리(6절 넷째)를 시작하는 날 켜면 됩니다.",
            code: "// scripts/i18n/pseudo.mjs — en.js 에서 가짜 언어 파일을 만든다 ({count} 같은 빈칸은 건너뛴다)\nconst ACCENT = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú' };\nconst pseudo = s => '[' + s.split(/(\\{[^}]+\\})/)\n  .map((p, i) => i % 2 ? p : p.replace(/[aeiou]/gi, c => ACCENT[c])).join('') + ' ~~~~]';\n\n// 출력\n{ cart: { open: 'Open cart', cartItems: '{count} items', checkout: 'Proceed to checkout' } }\n→ { cart: { open: '[Ópén cárt ~~~~]', cartItems: '[{count} ítéms ~~~~]', checkout: '[Prócééd tó chéckóút ~~~~]' } }\n\n// nuxt.config.ts — 개발 환경에서만 여섯째 로케일\nlocales: [\n  …다섯 언어,\n  ...(process.env.NODE_ENV !== 'production' ? [{ code: 'qps', file: 'pseudo.js' }] : []),\n],",
            terms: [
              {
                term: "가짜 로케일 (pseudo-localization)",
                body: "테스트용으로 만든 가짜 언어입니다. 영어 문장의 모음에 부호를 붙이고 길이를 늘려 만듭니다. 번역을 거친 글자와 안 거친 날글자가 한눈에 갈리고, 긴 언어에서 레이아웃이 넘치는지도 미리 보입니다. 개발 환경에만 둡니다. 코드 qps는 '가짜 로케일'에 관례로 쓰는 이름입니다.",
              },
            ],
          },
          {
            label: "ㄹ Sheets를 TMS로 바꾸는 길",
            body: "11단계 시트대로 Sheets와 TMS는 뼈대가 같고, 번역가가 보는 화면이 다릅니다. 지금 Sheets에는 넷이 없습니다. 열쇠별 '번역됨·검토됨' 상태와 변경 이력, 문장이 놓인 화면 스크린샷, 기계 번역 초안의 검토 승인 흐름(13단계)입니다. TMS에는 다 있습니다. 오픈소스 Tolgee는 자체 호스팅이 되고, Alt+클릭으로 고치는 in-context 편집과 Translated, Reviewed 상태가 있습니다. CLI의 pull로 받으니 i18n:pull → generate 흐름은 두고 원본만 바꿀 수 있습니다. Crowdin, Lokalise, Weblate도 비슷합니다.\n그래도 지금은 바꾸지 않습니다. 번역 인원에 비해 도구 운영 비용이 들고, 1,600행을 옮기고 새 화면을 배워야 합니다. 10단계 검사 없이 원본을 바꾸면 과도기에 깨진 열쇠를 아무도 못 봅니다. 번역가가 셋을 넘거나, 여섯째 언어를 붙이거나, Sheets 셀 하나가 배포를 깨뜨리거나, 13단계 기계 번역 초안이 필요해지면 TMS가 낫습니다.",
            code: "                     Sheets (지금)                TMS (Tolgee 를 예로)\n원본                  표 하나                      프로젝트 하나. 파일로 pull\n열쇠별 상태            없음 (빈칸 여부만)              Translated · Reviewed\n이력                  시트 버전 기록                 열쇠·언어 단위 이력\n문맥                  context 열                   설명 + 스크린샷 + 화면에서 직접 편집 (Alt+클릭)\n기계 번역 초안          없음                         있음. 검토자가 승인해야 반영\n코드 쪽 변경           없음                         i18n:pull 을 tolgee pull 로. generate 는 그대로\n비용                  0                            호스팅 또는 구독 · 1,600행 이전 · 번역가 교육\n바꿀 조건              —                            번역가 3명↑ · 여섯째 언어 · Sheets 사고 1회 · 13단계를 붙일 때",
            codeLang: "text",
            terms: [
              {
                term: "in-context 편집",
                body: "번역 도구의 표가 아니라 실제 서비스 화면에서 글자를 클릭해 바로 고치는 방식입니다. 번역가가 그 문장이 어디에 어떻게 보이는지 보면서 번역합니다. 3단계의 'Open' 문제처럼 문맥을 몰라 틀리는 일이 줄어듭니다. Tolgee는 Alt+클릭으로 제공합니다.",
              },
            ],
          },
          {
            label: "ㅁ 문장을 함수로 컴파일하는 길 (Paraglide JS)",
            body: "9단계와 10단계를 끝까지 밀면 이 모양이 됩니다. 사전을 실행 중에 읽지 않습니다. 빌드 때 문장 하나를 함수 하나로 컴파일합니다. m.cartItems({ count: 3 })처럼 부릅니다. 그러면 세 가지가 함께 옵니다. 열쇠 오타는 없는 함수를 부르는 것이어서 컴파일 오류입니다. 빈칸의 이름과 타입도 함수 인자여서 검사됩니다. 안 쓰는 문장은 번들러가 지웁니다. Paraglide JS가 이 길의 대표입니다. v2가 MIT이고, Vite 플러그인 하나로 붙고, Vue 어댑터가 있습니다. 복수형은 Intl.PluralRules 범주로 가릅니다. 저는 이것이 설계로는 가장 나은 길이라고 봅니다. 그런데 이 프로젝트에는 고르지 않습니다. 첫째, Nuxt는 공식 문서에 없습니다. @nuxtjs/i18n이 설정으로 주던 7단계(쿠키 협상, setLocale)와 12단계(요청별 인스턴스, 지금 있는 Vary 미들웨어와의 궁합)를 다시 만들어 검증해야 합니다. 둘째, 문서가 '열쇠를 빌드 때 알아야 한다'고 못 박습니다. 변수 열쇠 23곳은 m[key]()로 바꿔야 하는데, 문서는 그러면 사전 전체가 번들에 남을 수 있다고 적습니다. 셋째, 1,600개 열쇠와 Sheets 흐름을 inlang 형식으로 옮기는 일이 통째로 생깁니다. 그래서 '새로 시작할 때만'입니다. 대신 ㄱ(열쇠 유니온)과 4절 9단계 A(사전 컴파일)를 하면, 이 길의 이득 중 타입 안전과 컴파일러 제거는 틀 안에서 얻습니다. 남는 차이는 문장 단위 트리 셰이킹인데, 언어별 사전 한 권이 지연 로딩되는 지금 구조에서 그 차이는 크지 않습니다.",
            code: "                      지금 틀 + ㄱ + 9단계 A                      Paraglide JS\n열쇠 오타               tsc (래퍼) + 린트                           컴파일 오류 (함수가 없다)\n빈칸 이름·타입           CI 스크립트가 언어끼리 대조                    함수 인자 타입\n번들                    언어별 사전 한 권 (지연 로딩) · 컴파일러 제거       쓰는 문장만 (트리 셰이킹)\n변수 열쇠               열거 객체 + MessageKey                       m[key]() → 사전 전체가 남을 수 있다\n7·12단계               @nuxtjs/i18n 이 준다 (미들웨어까지 검증됨)        직접 만든다 (Nuxt 문서 없음)\n옮기는 비용              0 (추가만)                                  1,600 열쇠 · Sheets→inlang · 모든 호출부\n판정                    지금                                        새 앱을 시작할 때",
            codeLang: "text",
            terms: [
              {
                term: "트리 셰이킹 (tree-shaking)",
                body: "번들러가 아무 코드도 부르지 않는 함수를 결과물에서 빼는 일입니다. 나무를 흔들어 죽은 잎을 떨어내는 비유입니다. 문장이 함수가 되면 안 쓰는 문장도 이렇게 빠집니다. 사전이 객체 하나면 어느 열쇠를 쓰는지 번들러가 알 수 없어 통째로 남습니다.",
              },
            ],
          },
          {
            label: "ㅂ 번역자용 문법(ICU, Fluent)을 지금 끼우는 길",
            body: "5단계의 세로줄 문법은 Vue I18n만의 문법입니다. 번역가가 다른 도구에서 본 문법과 다릅니다. 업계에 넓게 퍼진 ICU MessageFormat이나 Mozilla의 Fluent로 지금 바꿀 수도 있습니다. vue-i18n에는 messageCompiler 옵션이 있어 intl-messageformat으로 ICU 문장을 컴파일하는 예가 공식 문서에 있습니다. 그러나 문서가 이 기능을 '실험적이며 깨지는 변경이나 삭제가 있을 수 있다'고 적어 둡니다. 그 위에 1,600 문장을 옮길 수는 없습니다. 더 큰 이유는 14단계입니다. ICU의 다음 판인 MessageFormat 2가 이미 표준이 됐고, Vue I18n이 그것을 읽는 날이 옮길 날입니다. 지금 ICU로 옮기면 두 번 옮기게 됩니다. 그리고 3절에서 본 대로 복수형 문제는 영어 한 언어의 문제입니다. 문법을 바꿀 만큼의 크기가 아닙니다. 그래서 하지 않습니다.",
          },
          {
            label: "ㅅ 사전을 배포에서 떼어 내는 길 (OTA)",
            body: "지금은 Sheets를 바꿔도 pull → generate → 배포를 거쳐야 화면이 바뀝니다. 그 사이를 없애는 길이 있습니다. @nuxtjs/i18n의 지연 로딩 파일은 객체 대신 함수를 돌려줄 수 있습니다. defineI18nLocale(async locale => $fetch(…))처럼 적으면 실행 중에 API나 CDN에서 사전을 받아 옵니다. Tolgee 같은 TMS는 이것을 Content Delivery라는 이름으로 제공하고, 바뀐 번역이 15분 안에 CDN에 반영된다고 적어 둡니다. 번역가가 오타를 고치면 배포 없이 화면이 바뀝니다. 그러나 대가가 분명합니다. 실행 중 의존이 하나 생깁니다. CDN이 느리면 첫 화면이 늦습니다. 코드는 새 열쇠를 부르는데 CDN의 사전은 옛것인 어긋남이 생길 수 있습니다. 그때 ㄴ의 missing 핸들러가 없으면 아무도 모릅니다. 그리고 문서에 따르면 함수로 돌려주는 파일은 기본으로 캐시가 꺼집니다. 지금은 배포 파이프라인이 사전 파일을 함께 만듭니다. 번역 수정이 배포를 기다리는 것이 실제로 문제가 되는지부터 확인할 일입니다. 그래서 조건을 적어 둡니다. 번역 수정을 배포와 따로 내보내야 하는 요구가 생기면, 그때 ㄹ(TMS)과 함께 재는 것이 맞습니다. 둘은 같은 도구가 함께 줍니다.",
            code: "// i18n/language/en.js — 객체 대신 함수를 돌려주면 실행 중에 받아 온다 (Nuxt I18n 문서의 예)\nexport default defineI18nLocale(async locale => {\n  return await $fetch(`https://cdn.example.com/translations/${locale}.json`);\n});\n// 문서: 함수로 돌려주는 파일은 기본으로 캐시가 꺼진다\n// 코드와 사전의 버전이 어긋날 수 있다 → ㄴ 의 missing 핸들러가 필요하다",
            terms: [
              {
                term: "OTA (over-the-air)",
                body: "앱을 다시 배포하지 않고 서버나 CDN에서 내용을 내려받아 바꾸는 방식입니다. 휴대폰 업데이트에서 온 말입니다. 번역에서는 사전 파일을 빌드에 넣지 않고 실행 중에 받아 오는 것을 뜻합니다. 번역가가 고친 것이 배포 없이 반영됩니다. 대신 실행 중에 받아 올 곳이 하나 늘고, 코드와 사전의 버전이 어긋날 수 있습니다.",
              },
            ],
          },
          {
            label: "ㅇ 서버 데이터의 번역을 서버에서 끝내는 길",
            body: "상품명과 공지는 응답에 다섯 언어가 다 오고, getLocalizedValue가 약 150곳에서 하나를 고릅니다(2절). 다른 길은 API가 요청한 언어 하나만 돌려주는 것입니다. 협상(7단계)과 폴백이 서버에 모여, 고르는 코드가 사라지고 응답이 줄어듭니다. 'UI는 영어인데 상품명은 한국어' 어긋남도 구조상 없어집니다. API가 로케일 매개변수나 Accept-Language를 받고 캐시 열쇠에 로케일을 넣어야 하니 '조건이 오면'입니다. 그 전에 폴백 순서를 상수로 뽑아 getLocalizedValue와 i18n.config의 fallbackLocale이 같이 읽게 합니다. 원인인 '두 곳에 따로 적힘'을 없애는, 파일 하나짜리 일입니다. vue-i18n의 fallbackLocale은 언어별 사슬 객체를 받으니 번체 순서도 담깁니다.",
            code: "// 지금 — 응답에 다섯 언어가 다 오고, 클라이언트 약 150곳이 고른다\n{ name: { ko: '…', en: '…', ja: '…', zh: '…', 'zh-Hant': '…' } }   →  getLocalizedValue(item.name)\n\n// 조건이 오면 — 요청의 로케일로 서버가 하나만 돌려준다\nGET /products/1   Accept-Language: ja   →  { name: '…' }               // 폴백 사슬은 서버 한 곳에만\n\n// 그 전에 할 수 있는 것 — 폴백 순서를 한 상수로. 두 곳이 같은 것을 읽는다\nexport const FALLBACK = { default: ['en', 'ko', 'ja', 'zh'], 'zh-Hant': ['zh', 'en', 'ko', 'ja'] } as const;\n// utils/i18n/locale.ts 의 getLocalizedValue 와 i18n/i18n.config.ts 의 fallbackLocale 이 둘 다 FALLBACK 을 읽는다",
          },
        ],
      },
      {
        heading: "6. 고른 것을 어떤 순서로",
        blocks: [
          {
            label: "첫째, 10단계부터",
            body: "눈에 더 띄는 것은 6단계지만, 10단계가 먼저입니다. 6단계는 수십 파일의 toLocaleString()을 $n으로 바꾸는 큰 일이라, 검사 없이는 오타와 날글자가 새로 섞입니다. 검사가 서면 잔재(I18NStringClass, 날글자) 정리도 경고 목록이 곧 작업 목록입니다.\n첫째, 영어 사전 기준 DefineLocaleMessage 스키마로 다섯 파일의 모양을 맞춥니다.\n둘째, @intlify/eslint-plugin-vue-i18n의 no-missing-keys와 no-raw-text를 nuxt 프리셋에 넣습니다. 자체 no-hardcoded-text로 대신해도 됩니다.\n셋째, i18n:check를 PR 워크플로에 겁니다.\n셋 다 더하기만 하니 위험이 낮습니다. 5절의 '지금 더 낫다' 둘인 열쇠 유니온과 tk 래퍼(ㄱ), i18n.config.ts의 missing 핸들러(ㄴ)도 같은 PR에 넣습니다. 그 뒤 변수 열쇠 23곳을 열거 객체로 바꾸면 타입이 지켜 줍니다.",
            code: "# 1. 타입 — 영어 사전이 기준 모양\n# i18n/schema.d.ts\nimport en from './language/en.js';\ndeclare module 'vue-i18n' { export interface DefineLocaleMessage extends typeof en {} }\n\n# 2. 린트 — nuxt 프리셋에 추가\n'@intlify/vue-i18n/no-missing-keys': 'error',\n'@intlify/vue-i18n/no-raw-text': ['error', { ignorePattern: '^[\\\\d\\\\s\\\\p{P}]+$' }],\n\n# 3. CI — 이미 있는 스크립트를 PR 체크에\n- run: pnpm --filter commerce-web i18n:check\n\n# 4. 5절 ㄱ·ㄴ — 추가만 하는 변경 둘\n# i18n/message-keys.d.ts    ← i18n:generate 가 함께 내보낸다 (MessageKey 유니온)\n# composables/useT.ts        ← tk(key: MessageKey)\n# i18n/i18n.config.ts        ← fallbackLocale + missing → Sentry",
            codeLang: "bash",
          },
          {
            label: "둘째, 6단계",
            body: "nuxt.config의 i18n 블록에 datetimeFormats와 numberFormats를 다섯 로케일로 선언합니다. utils/datetime.ts의 고정 패턴은 $d(또는 useI18n의 d)로, toLocaleString() 62곳은 $n으로 바꿉니다. 통화는 언어와 따로 정할 일입니다(6단계 확인 질문). 그러니 사이트의 통화 정책부터 정합니다. 예를 들어 'KRW를 영어로 보일 때 ₩4,500'이라면 numberFormats의 en 항목에 currency: 'KRW'를 둡니다. 고칠 파일이 많습니다. 린트를 먼저 세워야 하는 까닭입니다.",
          },
          {
            label: "셋째, 5단계 복수형과 9단계 설정",
            body: "두 작업은 각각 작습니다. 하나는 영어 사전의 'item(s)' 표기를 세로줄 복수형으로 바꾸고, 호출 쪽에 숫자를 넘기는 것입니다. 영어·일본어 사전 몇 줄과 호출 몇 곳입니다. 다른 하나는 모듈의 사전 컴파일 옵션을 켜는 것입니다. 설정 한 줄을 바꾸고 빌드를 한 번 돌려 문장 문법 오류가 없는지 봅니다. 둘 다 10단계가 있으면 안전하고, 없어도 할 수 있습니다. 그래서 순서는 셋째입니다.",
          },
          {
            label: "넷째, 잔재를 사전으로",
            body: "I18NStringClass의 인라인 객체 약 90개를 열쇠로 바꿔 Sheets에 올리고, 템플릿의 한국어 날글자를 $t로 바꿉니다. 린트가 있으면 경고 목록을 0으로 만드는 일이 됩니다. 끝나면 no-raw-text를 error로 올려 다시 생기지 않게 합니다. 서버 데이터의 getLocalizedValue 폴백 사슬을 fallbackLocale과 같은 순서로 맞추는 일도 여기에 넣습니다. 5절 ㅇ의 FALLBACK 상수입니다. 시작하는 날에는 5절 ㄷ의 가짜 로케일을 개발 환경에 켭니다. [ ] 없이 보이는 글자가 곧 날글자 목록입니다.",
          },
          {
            label: "바꿀 문구: 지금 코드 → 바꾼 코드",
            body: "6절의 순서를 코드 한 줄 단위로 옮기면 아래와 같습니다. 각 쌍의 첫 줄은 지금 저장소에 있는 모양이고, 변수 이름만 일부 바꿨습니다. 둘째 줄은 해당 단계 시트가 권하는 모양입니다. 바꾸는 이유는 줄 끝 주석에 적었습니다. 날짜 형식 이름(short, monthDay)과 통화 형식(currency)은 nuxt.config의 i18n 블록에 로케일별로 한 번만 선언하면 모든 호출에 함께 적용됩니다.",
            code: "// 6단계 — 날짜: 고정 패턴을 이어 붙인다 → 형식 이름을 부른다\nformat(startDate, 'yyyy.MM.dd') + ' ~ ' + format(endDate, 'MM.dd')   // 지금: 어느 언어에서나 2026.11.11 ~ 11.20\nd(startDate, 'short') + ' ~ ' + d(endDate, 'monthDay')              // 바꾼 뒤: ko 2026. 11. 11.  en-US 11/11/2026  ja 2026/11/11\n\n// 6단계 — 금액: 기호는 손으로, 숫자는 기기 로케일로 → 통화 형식 하나로\n{{ getCurrencySymbol(true) }}{{ priceData[item.id].toLocaleString() }}   // 지금: 서버와 브라우저가 다른 글자를 낼 수 있다\n{{ $n(priceData[item.id], 'currency') }}                               // 바꾼 뒤: locale 과 통화 정책이 함께 정한다\n\n// 5단계 — 복수형: 괄호로 피한 표기 → 세로줄\ncartItems: '{count} item(s)'                                             // 지금\ncartItems: 'no items | one item | {count} items'                         // 바꾼 뒤.  호출은 $t('cart.cartItems', count)\n\n// 잔재 — 사전 밖의 사전 → 열쇠 하나\nreturn new I18NStringClass({ ko: '…', en: '…', ja: '…', zh: '…', 'zh-Hant': '…' })   // 지금: 번역가가 볼 수 없다\nreturn t('payment.error.cardDeclined')                                   // 바꾼 뒤: Sheets 에 한 행으로 올라간다\n\n// 10단계 — 동적 열쇠 → 열거한 열쇠\nt(`order.status.${status}`)                                              // 지금: 어느 도구도 못 본다\ntk(STATUS_KEY[status])                                                   // 바꾼 뒤: STATUS_KEY 가 Record<상태, MessageKey> 를 만족해야 한다 (5절 ㄱ)",
          },
        ],
      },
      {
        heading: "7. 근거",
        blocks: [
          {
            label: "왜 이 순서인가",
            body: "세 가지입니다. 첫째, 10단계 작업은 기존 코드를 바꾸지 않는 추가입니다. 되돌리기 쉽고, 나머지 작업의 안전망이 됩니다. 둘째, 6단계 문제는 사용자에게 보이지만 '틀린 형식'입니다. '빠진 기능'이 아닙니다. 7단계 시트의 확인 질문처럼 '어느 쪽을 더 많이 틀려도 되는가'로 보면, 열쇠 오타로 cart.chekout이 찍히는 쪽이 더 나쁩니다. 셋째, 잔재 정리는 린트 없이 하면 끝나는 날이 없습니다. 고치는 동안 새로 생기기 때문입니다. 11단계와 12단계가 이미 잘 되어 있다는 것도 근거입니다. 표와 생성 스크립트와 캐시 미들웨어가 있습니다. 검사만 걸면 전체가 맞물립니다.",
          },
          {
            label: "무엇을 하지 않을 것인가",
            body: "주소 전략을 prefix로 바꾸는 것은 지금 하지 않습니다. no_prefix의 캐시 문제는 미들웨어가 이미 막고 있습니다. 바꾸면 모든 링크와 검색 색인이 바뀌는 큰 변경입니다. i18n의 문제가 아니라 제품의 결정입니다. 14단계 MessageFormat 2로 옮기는 것도 하지 않습니다. Vue I18n이 읽지 못하니 지금은 옮길 곳이 없습니다. 13단계 LLM 채우기는 10단계 검사가 선 뒤에 붙일 수 있습니다. 검사 없이 붙이면 13단계 시트의 '자신 있게 틀린다'가 다섯 언어로 동시에 납니다. 5절의 넷도 지금은 하지 않습니다. TMS 전환(ㄹ)과 OTA(ㅅ)는 조건을 적어 두었고, Paraglide(ㅁ)는 새 앱을 시작할 때의 선택지이며, ICU·Fluent(ㅂ)는 14단계를 기다립니다. 서버 데이터의 번역을 서버로 옮기는 것(ㅇ)은 백엔드와 함께 정할 일이라, 폴백 상수 하나만 먼저 뽑습니다.",
          },
          {
            label: "다시 재는 법",
            body: "이 진단은 2026년 11월의 저장소 기준이고, 숫자는 바뀝니다. 다시 잴 때는 1절의 표에 적은 검색을 그대로 돌리면 됩니다. 10단계가 들어간 뒤로는 린트 경고 수가 곧 진단표이니, 따로 세지 않아도 됩니다. 각 버그가 무엇인지는 단계 시트의 '문제' 블록에 적혀 있습니다. 버그 리포트가 들어오면 어느 단계의 공백에서 왔는지부터 대어 봅니다. 이 진단의 쓸모는 그 습관에 있습니다.",
          },
        ],
      },
    ],
    sources: [
      { label: "Nuxt I18n — Options", href: "https://i18n.nuxtjs.org/docs/api/options" },
      { label: "@intlify/eslint-plugin-vue-i18n", href: "https://eslint-plugin-vue-i18n.intlify.dev/" },
      { label: "Vue I18n — TypeScript Support", href: "https://vue-i18n.intlify.dev/guide/advanced/typescript.html" },
      { label: "Vue I18n — General API (missing 옵션)", href: "https://vue-i18n.intlify.dev/api/general.html" },
      { label: "Vue I18n — Custom Message Format (messageCompiler)", href: "https://vue-i18n.intlify.dev/guide/advanced/format.html" },
      { label: "Nuxt I18n — Lazy-load translations (defineI18nLocale)", href: "https://i18n.nuxtjs.org/docs/guide/lazy-load-translations" },
      { label: "Paraglide JS", href: "https://paraglidejs.com/" },
      { label: "Tolgee Docs — In-context translating", href: "https://docs.tolgee.io/js-sdk/in-context" },
      { label: "Sentry for Nuxt", href: "https://docs.sentry.io/platforms/javascript/guides/nuxt/" },
    ],
  },
];
