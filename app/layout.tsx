import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans_KR } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { SheetViewProvider } from "@/components/content/SheetView";
import SheetChrome from "@/components/content/SheetChrome";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        {/*
          리액트가 붙기 전에 판을 정한다. 이걸 컴포넌트에서 하면 첫 칠이 한 번
          어두운 판으로 나갔다가 밝은 판으로 바뀌며 번쩍인다.

          운영체제 설정은 따르지 않는다. 이 사이트는 어두운 판을 기본으로 두고
          만든 것이라, 밝은 판은 고른 사람에게만 간다.
          키는 토글(ThemeToggle)과 같은 상수(THEME_KEY)를 쓴다.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});` +
              "if(t)document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body className={cx(spaceGrotesk.variable, plexKr.variable)}>
        {/* 시트 보기 설정(전체 화면·양옆 패널)은 페이지가 바뀌어도 남아야 해서
            루트에 둔다 — 레이아웃은 클라이언트 이동에서 다시 만들어지지 않는다.

            시트의 껍데기(그래프·트리·포트·목차)도 같은 이유로 여기 있다.
            페이지 안에 두면 주소가 바뀔 때마다 트리가 다시 마운트돼 스크롤이
            맨 위로 튀고 접어 둔 갈래가 펴진다. 껍데기는 주소에서 노드 id만
            읽어 스스로 바뀌고, 페이지는 본문만 넘긴다.
            시트가 아닌 곳(그래프 홈, 글 목록)에서는 그냥 지나 보낸다. */}
        <SheetViewProvider>
          <SheetChrome>{children}</SheetChrome>
        </SheetViewProvider>
      </body>
    </html>
  );
}
