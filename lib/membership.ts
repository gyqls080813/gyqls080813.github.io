/**
 * 백드랍 소속의 규칙 — 계산만 한다. (asset-pipeline graph/membership.ts에서)
 *
 * 불변식은 하나다: 한 노드는 최대 한 틀에만 직접 매달린다.
 * 소속은 기하학이 아니라 목록이다 — "안에 떨어뜨리면 들어온다,
 * 밖으로 나가도 남는다, 빼려면 빼라고 말한다."
 */

export interface FrameState {
  id: string;
  members: readonly string[];
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
): { writes: MemberWrite[]; donors: string[] } {
  const taken = new Set(ids);
  if (taken.size === 0) return { writes: [], donors: [] };

  const writes: MemberWrite[] = [];
  const donors: string[] = [];

  for (const frame of frames) {
    if (frame.id === frameId) continue;
    const kept = frame.members.filter((id) => !taken.has(id));
    if (kept.length === frame.members.length) continue;

    writes.push({ frameId: frame.id, members: kept });
    donors.push(frame.id);
  }

  const target = frames.find((frame) => frame.id === frameId);
  if (target) {
    const known = new Set(target.members);
    const joining = ids.filter((id) => !known.has(id));
    if (joining.length > 0) {
      writes.push({ frameId, members: [...target.members, ...joining] });
    }
  }

  return { writes, donors };
}
