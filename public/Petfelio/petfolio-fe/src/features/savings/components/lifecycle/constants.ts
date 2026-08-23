

export interface BodyPartInfo {
  key: string;
  label: string;
}

export const BODY_PARTS: BodyPartInfo[] = [
  { key: 'head',  label: '머리' },
  { key: 'chest', label: '가슴' },
  { key: 'waist', label: '허리' },
  { key: 'legs',  label: '다리' },
  { key: 'whole', label: '전신' },
];

// ─── Body Part Positions (percentages for overlay) ──────────────────────────────────
export const PART_POSITIONS: Record<string, { top: string; left: string }> = {
  head:  { top: '25%', left: '50%' },   // 머리 (위 중앙)
  chest: { top: '55%', left: '38%' },   // 가슴 (중간 왼쪽)
  waist: { top: '50%', left: '68%' },   // 허리 (중간 오른쪽)
  legs:  { top: '82%', left: '42%' },   // 다리 (아래쪽 중심부)
  whole: { top: '15%', left: '85%' },   // 전신 (배지처럼 우측 상단 배치)
};

