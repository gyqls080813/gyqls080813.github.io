import React, { useMemo } from 'react';
import Card from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { StatBox } from '@/features/finance';
import type { DashboardData } from '@/features/finance/types/dashboard';

const formatMoney = (val: number) => {
  if (!val || isNaN(val)) return '0';
  if (val >= 10000) {
    const man = val / 10000;
    return `${Number.isInteger(man) ? man : man.toFixed(1)}만`;
  }
  return val.toLocaleString();
};

/* ─── 정규분포 확률밀도함수 ─── */
const normalPDF = (x: number, mean: number, std: number) => {
  const exp = -0.5 * ((x - mean) / std) ** 2;
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exp);
};

/* ─── SVG 정규분포 차트 ─── */
const NormalDistributionChart = ({
  mean,
  std,
  myValue,
  label,
  isStandardNormal = false,
}: {
  mean: number;
  std: number;
  myValue: number;
  label: string;
  isStandardNormal?: boolean;
}) => {
  const W = 320, H = 140, PAD_X = 20, PAD_Y = 20;
  const chartW = W - PAD_X * 2;
  const chartH = H - PAD_Y * 2;

  // x축 범위: mean ± 3.5 * std
  const xMin = mean - 3.5 * std;
  const xMax = mean + 3.5 * std;
  const range = xMax - xMin;

  // 곡선 포인트 생성
  const curvePoints = useMemo(() => {
    const pts: string[] = [];
    const steps = 80;
    const peakY = normalPDF(mean, mean, std);
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * range;
      const y = normalPDF(x, mean, std);
      const px = PAD_X + ((x - xMin) / range) * chartW;
      const py = PAD_Y + chartH - (y / peakY) * chartH * 0.85;
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [mean, std, xMin, range, chartW, chartH]);

  // 내 위치
  const myX = PAD_X + ((Math.max(xMin, Math.min(xMax, myValue)) - xMin) / range) * chartW;
  const myY_val = normalPDF(myValue, mean, std);
  const peakY = normalPDF(mean, mean, std);
  const myY = PAD_Y + chartH - (myY_val / peakY) * chartH * 0.85;

  // 평균 위치
  const meanX = PAD_X + ((mean - xMin) / range) * chartW;

  // 내 z-score
  const myZ = ((myValue - mean) / std);
  const topPct = (() => {
    // CDF 근사
    const z = myZ;
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (z > 0) p = 1 - p;
    return Math.max(0, Math.min(100, Math.round((1 - p) * 100)));
  })();

  // 색상: 평균 이하면 파란색(절약), 이상이면 빨간색(초과)
  const isAboveAvg = myValue > mean;
  const myColor = isAboveAvg ? '#ef4444' : '#3b82f6';

  // x축 라벨
  const xLabels = isStandardNormal
    ? [
        { pos: PAD_X + (0.5 / 7) * chartW, text: '-3σ' },
        { pos: PAD_X + (1.5 / 7) * chartW, text: '-2σ' },
        { pos: PAD_X + (2.5 / 7) * chartW, text: '-1σ' },
        { pos: meanX, text: 'μ' },
        { pos: PAD_X + (4.5 / 7) * chartW, text: '+1σ' },
        { pos: PAD_X + (5.5 / 7) * chartW, text: '+2σ' },
        { pos: PAD_X + (6.5 / 7) * chartW, text: '+3σ' },
      ]
    : [
        { pos: PAD_X, text: `${formatMoney(Math.round(xMin))}` },
        { pos: meanX, text: `평균 ${formatMoney(Math.round(mean))}` },
        { pos: PAD_X + chartW, text: `${formatMoney(Math.round(xMax))}` },
      ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 25}`} style={{ maxWidth: W }}>
        {/* 배경 그라데이션 */}
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-pet-primary, #8b5e3c)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-pet-primary, #8b5e3c)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* 곡선 아래 채우기 */}
        <polygon
          points={`${PAD_X},${PAD_Y + chartH} ${curvePoints} ${PAD_X + chartW},${PAD_Y + chartH}`}
          fill="url(#curveGrad)"
        />

        {/* 정규분포 곡선 */}
        <polyline
          fill="none"
          stroke="var(--color-pet-primary, #8b5e3c)"
          strokeWidth="2.5"
          points={curvePoints}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 평균 점선 */}
        <line
          x1={meanX} y1={PAD_Y} x2={meanX} y2={PAD_Y + chartH}
          stroke="var(--color-pet-text-muted, #999)"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.5"
        />

        {/* 내 위치 수직선 */}
        <line
          x1={myX} y1={myY} x2={myX} y2={PAD_Y + chartH}
          stroke={myColor}
          strokeWidth="1.5"
          strokeDasharray="4,2"
          opacity="0.7"
        />

        {/* 내 위치 점 */}
        <circle cx={myX} cy={myY} r="5" fill={myColor} stroke="white" strokeWidth="2" />

        {/* 내 위치 라벨 */}
        <text
          x={myX}
          y={myY - 12}
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill={myColor}
        >
          나 ({isStandardNormal ? `z=${myZ.toFixed(1)}` : `₩${formatMoney(Math.round(myValue))}`})
        </text>

        {/* x축 선 */}
        <line
          x1={PAD_X} y1={PAD_Y + chartH} x2={PAD_X + chartW} y2={PAD_Y + chartH}
          stroke="var(--color-pet-text-muted, #ccc)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* x축 라벨 */}
        {xLabels.map((l, i) => (
          <text
            key={i}
            x={l.pos}
            y={PAD_Y + chartH + 16}
            textAnchor="middle"
            fontSize="9"
            fill="var(--color-pet-text-muted, #999)"
          >
            {l.text}
          </text>
        ))}
      </svg>

      {/* 분석 결과 텍스트 */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '0.25rem', 
        padding: '0.5rem 1rem',
        borderRadius: '0.75rem',
        background: isAboveAvg ? 'rgba(239,68,68,0.06)' : 'rgba(59,130,246,0.06)',
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: myColor }}>
          {label} 기준 상위 {topPct}%
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--color-pet-text-muted)', display: 'block', marginTop: '2px' }}>
          {isAboveAvg 
            ? `평균보다 ${formatMoney(Math.round(myValue - mean))}원 더 지출`
            : `평균보다 ${formatMoney(Math.round(mean - myValue))}원 절약`
          }
        </span>
      </div>
    </div>
  );
};

/** 지출 비교 분석 섹션 */
export const SpendingComparisonSection = ({ spendingAnalysis }: { spendingAnalysis: DashboardData['spendingAnalysis'] }) => {
  const hasData = spendingAnalysis.mySpending > 0 || spendingAnalysis.averageSpending > 0;

  // 정규분포를 그릴 수 있는지 판단
  const canDrawNormal = spendingAnalysis.standardDeviation > 0 && spendingAnalysis.averageSpending > 0;

  // 표준 정규분포 폴백 (μ=0, σ=1 에 z-score 표시)
  const useStandardNormal = !canDrawNormal && (spendingAnalysis.zScore !== 0 || spendingAnalysis.mySpending > 0);

  // 평균이 0이지만 내 지출이 있는 경우 → 내 지출 기준으로 간이 분포 표시
  const fallbackMean = spendingAnalysis.averageSpending > 0 ? spendingAnalysis.averageSpending : spendingAnalysis.mySpending;
  const fallbackStd = spendingAnalysis.standardDeviation > 0 ? spendingAnalysis.standardDeviation : spendingAnalysis.mySpending * 0.3;
  const canDrawFallback = !canDrawNormal && spendingAnalysis.mySpending > 0 && fallbackStd > 0;

  return (
    <Card elevation="low" radius="large" withBorder>
      <Box padding="medium" paddingHorizontal="large" direction="column">
        <Paragraph typography="st7" fontWeight="bold" color="var(--color-pet-text-muted)">
          다른 반려인 대비
        </Paragraph>
        <Paragraph typography="t5" fontWeight="bold" color="var(--color-pet-text)">
          지출 비교
        </Paragraph>
      </Box>

      {!hasData && (
        <Box padding="large" direction="column" alignItems="center">
          <Paragraph typography="t6" color="var(--color-pet-text-muted)" textAlign="center">
            <Paragraph.Text>비교할 데이터가 아직 없어요</Paragraph.Text>
            <br />
            <Paragraph.Text style={{ fontSize: '0.8em' }}>반려동물을 선택하면 같은 품종과 비교해볼 수 있어요</Paragraph.Text>
          </Paragraph>
        </Box>
      )}

      {hasData && (
        <>
          {/* 통계 요약 박스 */}
          <Box padding="medium" paddingHorizontal="large">
            <StatBox
              items={[
                { label: '내 지출', value: `₩${formatMoney(spendingAnalysis.mySpending)}` },
                { label: `${spendingAnalysis.breedName || spendingAnalysis.speciesName || '전체'} 평균`, value: `₩${formatMoney(spendingAnalysis.averageSpending)}` },
              ]}
            />
          </Box>

          {/* 정규분포 차트 */}
          <Box padding="medium" paddingHorizontal="large">
            {canDrawNormal ? (
              <NormalDistributionChart
                mean={spendingAnalysis.averageSpending}
                std={spendingAnalysis.standardDeviation}
                myValue={spendingAnalysis.mySpending}
                label={spendingAnalysis.breedName || spendingAnalysis.speciesName || '전체'}
              />
            ) : canDrawFallback ? (
              <>
                <NormalDistributionChart
                  mean={fallbackMean}
                  std={fallbackStd}
                  myValue={spendingAnalysis.mySpending}
                  label={spendingAnalysis.breedName || spendingAnalysis.speciesName || '전체'}
                />
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '0.25rem',
                  fontSize: '0.7rem',
                  color: 'var(--color-pet-text-muted)',
                  opacity: 0.7,
                }}>
                  ※ 같은 품종 비교 데이터가 부족하여 예상 분포로 표시됩니다
                </div>
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem', 
                color: 'var(--color-pet-text-muted)',
                fontSize: '0.8rem',
              }}>
                비교 데이터가 충분하지 않아 분포표를 그릴 수 없어요
              </div>
            )}
          </Box>
        </>
      )}
    </Card>
  );
};

export default SpendingComparisonSection;
