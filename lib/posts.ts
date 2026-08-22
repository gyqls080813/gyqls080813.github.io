export type TheoryRole = "원인 개념" | "해결 기법" | "관련 개념";

export type PostSection = {
  heading: string;
  /** 섹션 불릿 색: trouble(코럴) = 증상, theory(청록) = 원인·해결 */
  tone: "trouble" | "theory";
  body: string;
  code?: string;
};

export type Post = {
  /** 그래프의 트러블 노드 id와 동일 */
  id: string;
  title: string;
  date: string;
  readMinutes: number;
  /** 프로젝트 노드 id */
  project: string;
  theories: { id: string; role: TheoryRole }[];
  lead: string;
  sections: PostSection[];
};

/** 목 데이터 — 실제 글 연결 전까지의 자리 채움. 내용은 실제 겪은 트러블 기준 */
export const posts: Post[] = [
  {
    id: "t-iframe",
    title: "YouTube iframe이 페이지 로딩을 영원히 붙잡고 있었다",
    date: "2026.08.10",
    readMinutes: 7,
    project: "withy",
    theories: [
      { id: "loading", role: "원인 개념" },
      { id: "eventloop", role: "관련 개념" },
    ],
    lead: "withy에 유튜브 예고편 임베드를 넣고 배포했더니, 페이지가 스피너에서 멈춘 채 끝나지 않았다. 코드는 로컬에서 멀쩡했다. 문제는 코드가 아니라 브라우저가 페이지를 \"다 로드됐다\"고 판정하는 방식에 있었다.",
    sections: [
      {
        heading: "증상",
        tone: "trouble",
        body: "탭의 로딩 인디케이터가 계속 돌고, load 이벤트에 걸어둔 초기화 코드가 영영 실행되지 않았다.",
      },
      {
        heading: "원인 — 로딩 파이프라인에서 iframe의 위치",
        tone: "theory",
        body: "window.load는 문서의 모든 서브리소스 — iframe 포함 — 가 끝나야 발생한다. YouTube 임베드는 내부에서 리소스를 계속 물고 있어 load를 무기한 지연시킬 수 있다.",
        code: "// 뷰포트에 들어올 때만 iframe을 붙인다\nconst io = new IntersectionObserver(mountIframe);\nio.observe(trailerBox);",
      },
    ],
  },
  {
    id: "t-header",
    title: "헤더가 화면 가운데로 끌려간 날",
    date: "2026.08.08",
    readMinutes: 4,
    project: "withy",
    theories: [{ id: "flexbox", role: "원인 개념" }],
    lead: "화면 전체를 감싸는 .screen-view에 무심코 넣은 정렬 속성 하나가, 그 안의 모든 자식 — 헤더까지 — 을 가운데로 끌어당겼다.",
    sections: [
      {
        heading: "증상",
        tone: "trouble",
        body: "헤더 로고와 내비게이션이 좌우로 퍼져야 하는데, 화면 한가운데로 뭉쳐 있었다. 헤더 컴포넌트 코드는 아무리 봐도 정상이었다.",
      },
      {
        heading: "원인 — Flexbox 정렬은 상속이 아니라 강제다",
        tone: "theory",
        body: "부모의 align-items·justify-content는 직계 자식의 배치를 결정한다. 범인은 헤더가 아니라 조상 컨테이너였다. 화면 래퍼에서 정렬을 제거하고, 정렬이 필요한 곳에서만 지정해 해결.",
      },
    ],
  },
  {
    id: "t-modal",
    title: "모달 두 개가 서로의 상태를 밟던 문제",
    date: "2026.08.05",
    readMinutes: 5,
    project: "withy",
    theories: [{ id: "state", role: "원인 개념" }],
    lead: "파티 생성 모달과 커밍순 모달을 각자 boolean으로 열고 닫았더니, 특정 순서로 누르면 두 모달이 동시에 뜨거나 둘 다 안 떴다.",
    sections: [
      {
        heading: "증상",
        tone: "trouble",
        body: "포스터 클릭 → 커밍순 모달 → 닫기 전에 파티 만들기 클릭 → 화면이 겹치거나 아무것도 안 뜨는 상태로.",
      },
      {
        heading: "해결 — 열림 상태를 하나의 값으로",
        tone: "theory",
        body: "isCreateOpen, isComingSoonOpen 두 boolean을 activeModal: 'create' | 'comingSoon' | null 하나로 합쳤다. 동시에 두 개가 열리는 상태 자체가 타입에서 불가능해진다.",
      },
    ],
  },
  {
    id: "t-poster",
    title: "포스터 이미지가 화면을 다 잡아먹던 것",
    date: "2026.08.03",
    readMinutes: 3,
    project: "withy",
    theories: [{ id: "caching", role: "관련 개념" }],
    lead: "넷플릭스 로고와 포스터 이미지가 원본 크기 그대로 렌더링되면서 레이아웃이 무너졌다. 스타일시트보다 우선순위가 높은 게 필요했다.",
    sections: [
      {
        heading: "증상",
        tone: "trouble",
        body: "섹션 헤더의 로고 이미지가 전체 크기로 렌더링되어 화면을 덮었다. CSS 클래스로 크기를 지정해도 다른 규칙에 밀렸다.",
      },
      {
        heading: "해결",
        tone: "theory",
        body: "인라인 스타일로 크기를 강제해 우선순위 문제를 끊고, 이미지 응답에 캐시 헤더가 실리는지 확인해 재방문 로딩을 줄였다.",
      },
    ],
  },
  {
    id: "t-jank",
    title: "노드 22개에 벌써 버벅이면 어떡하지",
    date: "2026.08.20",
    readMinutes: 6,
    project: "blog",
    theories: [{ id: "repaint", role: "원인 개념" }],
    lead: "이 블로그의 그래프에 호버 하이라이트를 붙이자 커서를 움직일 때마다 전체가 다시 그려졌다. 무엇이 리페인트를 부르는지부터 갈라야 했다.",
    sections: [
      {
        heading: "증상",
        tone: "trouble",
        body: "노드 위에서 마우스를 움직이면 프레임이 뚝뚝 끊겼다. DevTools Performance 탭에 보라색(스타일 재계산)과 초록색(페인트)이 가득.",
      },
      {
        heading: "원인 — 리페인트와 리플로우는 다른 비용이다",
        tone: "theory",
        body: "opacity·transform은 컴포지터에서 처리되어 싸고, width나 filter 변경은 페인트/레이아웃을 다시 태운다. 하이라이트를 opacity 전환으로 바꿔 해결.",
      },
    ],
  },
  {
    id: "t-404",
    title: "GitHub Pages에서 새로고침하면 404가 뜨는 이유",
    date: "2026.08.18",
    readMinutes: 5,
    project: "blog",
    theories: [{ id: "routing", role: "원인 개념" }],
    lead: "그래프에서 글 페이지로 잘 이동하는데, 그 페이지에서 새로고침을 누르면 404. 클라이언트 라우팅과 정적 호스팅의 오래된 어긋남이다.",
    sections: [
      {
        heading: "증상",
        tone: "trouble",
        body: "/posts/abc 경로로 직접 접근하거나 새로고침하면 GitHub Pages의 404 페이지가 나왔다. 링크 클릭으로는 잘만 갔다.",
      },
      {
        heading: "해결 — 경로마다 진짜 HTML을 만든다",
        tone: "theory",
        body: "Next.js 정적 내보내기의 generateStaticParams로 글마다 실제 HTML 파일을 생성하면, 서버 트릭 없이도 모든 경로가 직접 접근 가능해진다.",
      },
    ],
  },
];

export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}
