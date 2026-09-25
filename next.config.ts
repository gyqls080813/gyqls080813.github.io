import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: {
    /* 빌드의 타입 검사는 TypeScript JS API(6)로 한다. ESLint(typescript-eslint)가
       TS 7을 아직 못 읽어 `typescript` 자리에 TS 6(@typescript/typescript6)을 두고,
       TS 7은 `@typescript/native`로 나란히 둔다 — `npx tsc`는 여전히 7이다.
       기본값(CLI 검사)은 `typescript/bin/tsc`를 찾는데 TS 6 패키지에는 `tsc6`만 있다. */
    useTypeScriptCli: false,
  },
};

export default nextConfig;
