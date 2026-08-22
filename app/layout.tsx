import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans_KR } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";

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
  title: "민엽의 트러블로그",
  description:
    "프로젝트에서 부딪히고, 이론으로 연결한 기록. 트러블슈팅이 프로젝트와 개념을 잇는 지식 그래프 블로그.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${spaceGrotesk.variable} ${plexKr.variable}`}>
        {children}
      </body>
    </html>
  );
}
