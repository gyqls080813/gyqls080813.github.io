/**
 * 빌드 스크립트가 lib/의 TypeScript 모듈을 그대로 읽게 하는 해석 규칙.
 *
 * Node는 .ts를 타입만 지우고 실행할 수 있지만(Node 22.18+), Next가 쓰는
 * 두 가지를 모른다 — `@/` 별칭과 확장자 없는 상대 경로. 그 둘만 채운다.
 */
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";

const ROOT = process.cwd();

function withExtension(path) {
  for (const candidate of [path, `${path}.ts`, join(path, "index.ts")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const found = withExtension(join(ROOT, specifier.slice(2)));
    if (found) return typescript(await next(pathToFileURL(found).href, context));
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL) {
    const base = join(fileURLToPath(context.parentURL), "..", specifier);
    const found = withExtension(base);
    if (found) return typescript(await next(pathToFileURL(found).href, context));
  }
  return typescript(await next(specifier, context));
}

/* package.json에 type이 없어 Node가 .ts를 CJS로 한 번 읽어 보고 다시 읽는다 — ESM이라고 알려 준다 */
function typescript(resolved) {
  return resolved.url.endsWith(".ts") ? { ...resolved, format: "module-typescript" } : resolved;
}
