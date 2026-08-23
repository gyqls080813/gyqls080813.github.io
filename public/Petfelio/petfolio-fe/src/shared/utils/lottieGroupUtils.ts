/**
 * 우주인 Lottie 애니메이션을 5개 그룹으로 분리하여
 * 각 그룹을 개별적으로 렌더링 & 클릭할 수 있게 하는 유틸리티
 *
 * 그룹: 별(stars) / 행성(planet) / 우주인(astronaut) / 연기+로켓(rocketSmoke) / 배경(background)
 */

// 레이어 index(ind) 기준 그룹 매핑
const GROUP_MAP: Record<string, number[]> = {
  // 별: 작은 도트들 (좌상단, 우상단 등)
  stars: [1, 2, 8, 9],

  // 행성: 오른쪽 토성 모양
  planet: [4, 5, 6],

  // 우주인: body, l hand, Null 2 컨트롤러 + 하위 레이어들
  astronaut: [
    10, // Null 2 (controller)
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, // Layer 2~27 (우주인 파츠)
    37, // body
    38, // l hand
  ],

  // 연기 + 로켓
  rocketSmoke: [
    39, // rocket
    40, // Apollo-rocket-loader (프리컴프)
    41, // Shape Layer 1 (연기)
    42, // Layer 29
    43, // Shape Layer 3 (연기)
    44, // Layer 28
    45, // Shape Layer 2 (연기)
    46, // Layer 30
  ],

  // 배경: 하늘색 원 + 바닥 그림자
  background: [3, 7, 47],
};

export type AstronautGroup = keyof typeof GROUP_MAP;

export const ASTRONAUT_GROUPS: AstronautGroup[] = ['stars', 'planet', 'astronaut', 'rocketSmoke', 'background'];

export const GROUP_LABELS: Record<AstronautGroup, string> = {
  stars: '별',
  planet: '행성',
  astronaut: '우주인',
  rocketSmoke: '로켓',
  background: '배경',
};

/**
 * 원본 Lottie JSON에서 특정 그룹의 레이어만 추출
 */
export function extractGroup(originalData: any, group: AstronautGroup): any {
  const targetInds = GROUP_MAP[group];
  return {
    ...originalData,
    layers: originalData.layers.filter((l: any) => targetInds.includes(l.ind)),
  };
}

/**
 * 원본 Lottie JSON에서 특정 그룹의 레이어를 숨김(제거)
 */
export function hideGroup(originalData: any, group: AstronautGroup): any {
  const targetInds = GROUP_MAP[group];
  return {
    ...originalData,
    layers: originalData.layers.filter((l: any) => !targetInds.includes(l.ind)),
  };
}

/**
 * 여러 그룹만 보이게 필터
 */
export function showGroups(originalData: any, groups: AstronautGroup[]): any {
  const allInds = groups.flatMap(g => GROUP_MAP[g]);
  return {
    ...originalData,
    layers: originalData.layers.filter((l: any) => allInds.includes(l.ind)),
  };
}
