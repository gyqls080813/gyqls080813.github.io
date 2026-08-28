/** 개념 시트의 한 블록 — 라벨 하나에 문단 하나, 필요하면 코드 한 조각 */
export type TheoryBlock = {
  label: string;
  body: string;
  code?: string;
};

/** 참고한 곳 — 문서를 읽고 쓴 것이니 출처를 남긴다 */
export type TheorySource = {
  label: string;
  href: string;
};

export type Theory = {
  /** 그래프의 이론 노드 id와 동일 */
  id: string;
  name: string;
  tagline: string;
  /** 이 개념이 답하는 질문 — 화면을 보여주기 전에 */
  intro: string;
  blocks: TheoryBlock[];
  sources?: TheorySource[];
};

const REACT_DOCS = "https://react.dev";

export const theories: Theory[] = [
  {
    id: "react",
    name: "React",
    tagline: "화면을 명령이 아니라 결과로 쓰는 도구",
    intro:
      "직접 DOM을 다루면 코드가 '무엇을 보여줄지'가 아니라 '무엇을 바꿀지'로 쌓입니다. 지금 화면이 어떤 상태인지 알아야 다음 명령을 쓸 수 있고, 그 전제가 하나라도 어긋나면 화면과 데이터가 갈라집니다. React는 그 순서를 뒤집습니다. 지금 데이터가 이러면 화면은 이렇게 생겼다고 쓰면, 무엇을 어떻게 바꿀지는 React가 계산합니다.",
    blocks: [
      {
        label: "렌더는 계산이고, 커밋이 반영이다",
        body: "React에서 렌더링은 화면을 그리는 일이 아니라 컴포넌트 함수를 불러 무엇을 보여줄지 알아내는 일입니다. 그 결과를 실제 DOM에 옮기는 것은 그다음 단계인 커밋이고요. 이 둘이 나뉘어 있다는 것이 React를 쓰면서 제일 자주 되돌아온 사실이었습니다. 리렌더가 일어났다고 해서 DOM이 바뀐 것은 아니고, 화면이 그대로라고 해서 계산이 없었던 것도 아닙니다.",
      },
      {
        label: "순수해야 React가 마음대로 부를 수 있다",
        body: "React는 컴포넌트를 순수 함수로 가정합니다. 같은 입력이면 같은 결과를 돌려주고, 렌더 중에 자기 바깥의 값을 건드리지 않는 함수라는 뜻입니다. 이 가정이 있어야 React가 컴포넌트를 언제 몇 번 부르든 결과가 같습니다. 개발 모드의 StrictMode가 컴포넌트를 두 번 부르는 것도 이 가정이 깨진 곳을 드러내기 위해서입니다. 렌더 중에 만든 값을 렌더 중에 바꾸는 것은 괜찮습니다 — 바깥이 모르는 값이니까요.",
        code: "// 렌더 바깥의 값을 건드린다 — 두 번 부르면 결과가 달라진다\nlet guest = 0;\nfunction Cup() {\n  guest = guest + 1;\n  return <h2>Tea cup for guest #{guest}</h2>;\n}\n\n// 입력만 읽는다 — 몇 번을 부르든 같다\nfunction Cup({ guest }) {\n  return <h2>Tea cup for guest #{guest}</h2>;\n}",
      },
      {
        label: "그래서 최적화의 방향이 정해진다",
        body: "리렌더가 비싸다고 느껴질 때 손댈 곳은 대체로 셋 중 하나입니다. 렌더를 덜 일으키거나, 렌더 한 번의 비용을 줄이거나, 애초에 React가 모르는 곳에 값을 두거나. 앞의 둘은 React 안에서 하는 일이고 마지막은 경계 바깥으로 나가는 일입니다. 셋을 구분하지 않으면 메모이제이션을 아무 데나 붙이게 됩니다.",
      },
      {
        label: "실제로 부딪힌 곳",
        body: "이 개념이 실전에서 문제가 된 자리는 대부분 '상태가 아닌 값을 상태로 뒀을 때'였습니다. 초당 수백 번 들어오는 마우스 이벤트를 상태로 받으면 화면이 그 횟수만큼 다시 계산됩니다. 화면에 그려지지 않는 값이라면 애초에 렌더를 일으킬 이유가 없다는 것을, 프레임이 떨어지고 나서야 알았습니다.",
      },
    ],
    sources: [
      { label: "Render and Commit", href: `${REACT_DOCS}/learn/render-and-commit` },
      { label: "Keeping Components Pure", href: `${REACT_DOCS}/learn/keeping-components-pure` },
    ],
  },
];

export function getTheory(id: string): Theory | undefined {
  return theories.find((theory) => theory.id === id);
}
