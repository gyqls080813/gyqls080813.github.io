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
  ],
};

export function getDictionary(id: string): Dictionary | undefined {
  return id === dictionary.id ? dictionary : undefined;
}
