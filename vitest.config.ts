import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/* 순수 함수만 시험한다 — 캔버스·브라우저 없이 돈다. `@/` 별칭은 Next와 같게 저장소 뿌리 */
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
