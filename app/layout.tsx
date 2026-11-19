import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans_KR } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { SheetViewProvider } from "@/components/content/SheetView";
import SheetChrome from "@/components/content/SheetChrome";
import SheetDrawers from "@/components/content/SheetDrawers";
import { SITE_NAME, THEME_KEY } from "@/lib/site";
import { cx } from "@/lib/util";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const plexKr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex-kr",
});

export const metadata: Metadata = {
  /* 페이지는 자기 이름만 적고, 사이트 이름 꼬리는 여기서 한 번 붙인다 */
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description:
    "프로젝트에서 부딪히고, 이론으로 연결한 기록. 트러블슈팅이 프로젝트와 개념을 잇는 지식 그래프 블로그.",
};

/*
  리액트가 붙기 전에 판을 정한다. 이걸 컴포넌트에서 하면 첫 칠이 한 번
  어두운 판으로 나갔다가 밝은 판으로 바뀌며 번쩍인다.

  운영체제 설정은 따르지 않는다. 이 사이트는 어두운 판을 기본으로 두고
  만든 것이라, 밝은 판은 고른 사람에게만 간다.
  키는 토글(ThemeToggle)과 같은 상수(THEME_KEY)를 쓴다.

  다른 탭에서 판을 바꾸면 storage 이벤트가 온다. 그 값을 이 문서의 표식에 옮겨
  적는 일도 여기서 한 번만 붙인다 — 표식이 바뀌면 useTheme의 관찰자가 알아챈다.
*/
const THEME_SCRIPT =
  `(function(){var d=document.documentElement,k=${JSON.stringify(THEME_KEY)};` +
  'function ok(t){return t==="dark"||t==="light"}' +
  "try{var t=localStorage.getItem(k);if(ok(t))d.dataset.theme=t}catch(e){}" +
  'addEventListener("storage",function(e){if(e.key===k&&ok(e.newValue))d.dataset.theme=e.newValue})})()';

export default function RootLayout({
  children,
  outline,
}: Readonly<{
  children: React.ReactNode;
  /** 열린 시트의 목차와 포트 — app/@outline 슬롯. 시트가 아닌 곳에서는 비어 있다 */
  outline: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-theme="dark"
      /* 글꼴 변수는 :root에 있어야 globals.css의 --font-sans 같은 토큰이 풀린다 */
      className={cx(spaceGrotesk.variable, plexKr.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {/* 시트 보기 설정(전체 화면·양옆 패널)은 페이지가 바뀌어도 남아야 해서
            루트에 둔다 — 레이아웃은 클라이언트 이동에서 다시 만들어지지 않는다.

            시트의 껍데기(그래프·트리·포트·목차)도 같은 이유로 여기 있다.
            페이지 안에 두면 주소가 바뀔 때마다 트리가 다시 마운트돼 스크롤이
            맨 위로 튀고 접어 둔 갈래가 펴진다. 껍데기는 주소에서 노드 id만
            읽어 스스로 바뀌고, 페이지는 본문만 넘긴다. 노드마다 다른 목차와
            포트는 @outline 슬롯이 그 노드 것만 서버에서 그려 넘긴다.
            시트가 아닌 곳(그래프 홈, 글 목록)에서는 그냥 지나 보낸다. */}
        <SheetViewProvider>
          <SheetChrome outline={outline}>{children}</SheetChrome>
          {/* 좁은 화면의 메뉴와 목차 서랍 — 홈과 글 목록에서도 열려야 해서 껍데기 밖에 둔다 */}
          <SheetDrawers outline={outline} />
        </SheetViewProvider>
      </body>
    </html>
  );
}
