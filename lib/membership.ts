/**
 * 백드랍 소속의 규칙 — 계산만 한다. (asset-pipeline graph/membership.ts에서)
 *
 * 불변식은 하나다: 한 노드는 최대 한 틀에만 직접 매달린다.
 * 소속은 기하학이 아니라 목록이다 — "안에 떨어뜨리면 들어온다,
 * 밖으로 나가도 남는다, 빼려면 빼라고 말한다."
 */

import { ancestorChain } from "./topology";

export interface FrameState {
  id: string;
  members: readonly string[];
}

/**
 * 소속 전체를 글자 하나로 — 화면이 노드가 움직일 때마다가 아니라 소속이 바뀔 때만
 * 틀을 다시 계산하려고 이 글자를 비교한다. JSON으로 적는다. 구분자(`:`, `,`, `|`)로
 * 이어 붙였다 쪼개면 id에 그 글자가 들어갈 때 깨진다.
 */
export function membershipKey(frames: readonly FrameState[]): string {
  return JSON.stringify(frames.map((frame) => [frame.id, frame.members]));
}

/** membershipKey를 되읽는다 — 틀 id → 소속 목록 */
export function parseMembershipKey(key: string): Map<string, string[]> {
  return new Map<string, string[]>(JSON.parse(key));
}

/** 틀 하나의 목록을 이 값으로 갈아 끼우라는 지시. */
export interface MemberWrite {
  frameId: string;
  members: string[];
}

/**
 * 이 틀이 이것들을 담는다고 적는 계획. 다른 틀에서는 뺀다.
 * 편입은 옮기는 것이다 — 새로 담는 쪽에 적으면서 옛 주인에게서 지운다.
 * 이미 다 적혀 있으면 대상 틀에는 쓰지 않는다.
 */
export function planClaim(
  frames: readonly FrameState[],
  frameId: string,
  ids: readonly string[],
): MemberWrite[] {
  const taken = new Set(ids);
  if (taken.size === 0) return [];

  const writes: MemberWrite[] = [];

  for (const frame of frames) {
    if (frame.id === frameId) continue;
    const kept = frame.members.filter((id) => !taken.has(id));
    if (kept.length === frame.members.length) continue;

    writes.push({ frameId: frame.id, members: kept });
  }

  const target = frames.find((frame) => frame.id === frameId);
  if (target) {
    const known = new Set(target.members);
    const joining = ids.filter((id) => !known.has(id));
    if (joining.length > 0) {
      writes.push({ frameId, members: [...target.members, ...joining] });
    }
  }

  return writes;
}

// ── 틀의 자리와 놓은 자리 ──────────────────────────────────

/** 화면의 상자 — 왼쪽 위와 크기 */
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 멤버들을 감싸는 틀의 상자 — 둘레 여백(pad)과 위쪽 제목 줄(title)을 더한다.
 * 최소 크기(floor)가 있으면 그보다 작아지지 않는다. 멤버가 없으면 null(지금 자리 그대로).
 */
export function frameBox(
  members: readonly Box[],
  pad: number,
  title: number,
  floor?: { width: number; height: number },
): Box | null {
  if (members.length === 0) return null;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const member of members) {
    minX = Math.min(minX, member.x);
    minY = Math.min(minY, member.y);
    maxX = Math.max(maxX, member.x + member.width);
    maxY = Math.max(maxY, member.y + member.height);
  }
  return {
    x: minX - pad,
    y: minY - pad - title,
    width: Math.max(maxX - minX + pad * 2, floor?.width ?? 0),
    height: Math.max(maxY - minY + pad * 2 + title, floor?.height ?? 0),
  };
}

/** 놓을 곳 후보가 되는 틀 — 상자와 지금 소속 */
export interface DropFrame extends Box, FrameState {
  /** 접힌 틀 안에 숨은 틀은 그릴 자리가 없으니 받을 수도 없다 */
  hidden?: boolean;
}

/**
 * 노드를 이 점(노드의 가운데)에 놓았을 때 그 노드를 가져갈 틀. 옮길 일이 없으면 null.
 *
 * 겹친 틀에서 임자를 고르는 것은 위치가 아니라 계층이다. 틀은 틀을 담으므로
 * (생각 › TIL) 한 점이 여러 틀 안에 동시에 있다 — 목록에서 먼저 나온 것을 고르면
 * 언제나 가장 바깥이 걸린다. 깊은 틀이 먼저이고, 계층이 갈리지 않는 겹침(형제끼리)은
 * 좁은 쪽이 더 구체적인 뜻이라 그쪽이다.
 *
 * 자기 틀을 감싸는 바깥 틀로는 저절로 옮겨 가지 않는다. 안쪽 틀의 노드는 언제나
 * 바깥 틀 안에도 있어서, 이걸 허락하면 「밖으로 나가도 남는다」가 무너진다.
 */
export function pickDropFrame(
  frames: readonly DropFrame[],
  nodeId: string,
  point: { x: number; y: number },
): string | null {
  const isFrame = new Set(frames.map((frame) => frame.id));
  const parentOf = new Map<string, string>();
  for (const frame of frames) {
    for (const member of frame.members) if (isFrame.has(member)) parentOf.set(member, frame.id);
  }
  const depth = (id: string) => ancestorChain(id, parentOf).length;
  const contains = (frame: DropFrame) =>
    point.x >= frame.x &&
    point.x <= frame.x + frame.width &&
    point.y >= frame.y &&
    point.y <= frame.y + frame.height;

  const hit = frames
    .filter((frame) => !frame.hidden && contains(frame))
    .sort((a, b) => depth(b.id) - depth(a.id) || a.width * a.height - b.width * b.height)[0];
  const owner = frames.find((frame) => frame.members.includes(nodeId));
  if (!hit || hit.id === owner?.id) return null;
  if (owner && ancestorChain(owner.id, parentOf).includes(hit.id)) return null;
  return hit.id;
}
