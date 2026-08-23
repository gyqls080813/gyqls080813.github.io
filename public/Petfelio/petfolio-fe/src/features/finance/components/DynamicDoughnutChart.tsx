import React, { useState, useEffect } from 'react';

interface DynamicDoughnutChartProps {
    data?: number[];
    labels?: string[];
    centerChild?: React.ReactNode;
}

const DynamicDoughnutChart = ({ data = [], labels = [], centerChild = null }: DynamicDoughnutChartProps) => {
    const [progress, setProgress] = useState(0);
    const [showLabels, setShowLabels] = useState(false);
    const totalPoints = data.length;

    useEffect(() => {
        if (totalPoints > 0) {
            let start: number | null = null;
            const duration = 1000;
            const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const p = Math.min(elapsed / duration, 1) * 100;
                setProgress(p);
                if (elapsed < duration) {
                    requestAnimationFrame(step);
                } else {
                    setShowLabels(true);
                }
            };
            requestAnimationFrame(step);
        }
    }, [totalPoints, data]);

    if (totalPoints === 0) {
        return (
            <div className="flex items-center justify-center w-[260px] h-[260px] bg-gray-50 rounded-full text-gray-400 text-sm font-sans mx-auto shadow-inner border border-gray-100">
                지출 내역이 없어요.
            </div>
        );
    }

    const totalSum = data.reduce((sum, val) => sum + val, 0);
    const percentData = data.map(val => (totalSum === 0 ? 0 : (val / totalSum) * 100));

    // Bar progress와 어울리는 색상 배열 설정
    const colors = [
        'var(--color-pet-brown-warm)', // 1위 (ex. #8FBC8F 등)
        'var(--color-pet-brown-badge)', // 2위
        'var(--color-pet-data)', // 3위 및 기타
        '#d6d3d1',
        '#e7e5e4',
        '#f5f5f4'
    ];

    const svgSize = 340;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const radius = 90;
    const strokeWidth = 38;
    const circumference = 2 * Math.PI * radius;

    let currentOffset = 0;
    let currentAngle = 0;

    const slices = percentData.map((val, i) => {
        const angleValue = (val / 100) * (2 * Math.PI);
        const midAngle = currentAngle + angleValue / 2;
        currentAngle += angleValue;

        // 텍스트를 회전 보정 (svg 쪽에 -rotate-90이 걸려 있으므로 그에 맞춰 위치계산)
        // 화면상 12시 방향이 midAngle 0 라디안 이므로, 
        // 그냥 직관적으로 CSS로 회전된 걸 고려해 라벨 위치를 -Math.PI / 2 부터 시작하는 걸로 계산
        // 그래야 text element를 rotate하지 않아도 텍스트가 똑바로 보입니다.
        return { val, midAngle, labelName: labels[i] };
    });
    
    // reset currentAngle for rendering slices
    currentAngle = -Math.PI / 2;

    return (
        <div className="relative inline-block w-[340px] h-[340px] font-sans flex items-center justify-center">
            <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full drop-shadow-sm">
                {percentData.map((val, i) => {
                    const startPercent = percentData.slice(0, i).reduce((s, v) => s + v, 0);
                    const drawPercent = Math.max(0, Math.min(val, progress - startPercent));
                    
                    const strokeLength = (drawPercent / 100) * circumference;
                    const dashArray = `${strokeLength} ${circumference - strokeLength}`;
                    const dashOffset = -((startPercent / 100) * circumference);

                    if (val === 0) return null;

                    return (
                        <circle
                            key={`donut-slice-${i}`}
                            cx={cx}
                            cy={cy}
                            r={radius}
                            fill="transparent"
                            stroke={colors[i] || colors[2]}
                            strokeWidth={strokeWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="butt"
                            className="origin-center -rotate-90"
                        />
                    );
                })}
                {/* Labels rendered outside of the rotation */}
                {slices.map((slice, i) => {
                    if (slice.val === 0) return null;
                    const angle = currentAngle + (slice.val / 100) * Math.PI;
                    currentAngle += (slice.val / 100) * 2 * Math.PI;

                    const textRadius = radius + 40;
                    const labelX = cx + textRadius * Math.cos(angle);
                    const labelY = cy + textRadius * Math.sin(angle);
                    
                    const isLeft = labelX < cx;
                    const textAnchor = isLeft ? 'end' : 'start';

                    return (
                        <text 
                            key={`label-${i}`} 
                            x={labelX} 
                            y={labelY} 
                            textAnchor={textAnchor} 
                            dominantBaseline="middle" 
                            className="font-sans"
                            style={{ 
                                opacity: showLabels ? 1 : 0, 
                                visibility: showLabels ? 'visible' : 'hidden',
                                transition: 'opacity 0.6s ease-in, visibility 0.6s' 
                            }}
                        >
                            <tspan x={labelX} dy="-0.3em" className="fill-pet-text-label font-bold text-[14px]">
                                {slice.labelName || `항목 ${i+1}`}
                            </tspan>
                            <tspan x={labelX} dy="1.4em" className="fill-pet-text-subtle font-semibold text-[13px]">
                                {Math.round(slice.val)}%
                            </tspan>
                        </text>
                    );
                })}
            </svg>
            
            {/* Center Content (ex. PawIcon) */}
            {centerChild && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-white/80 w-[120px] h-[120px] rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/50">
                        {centerChild}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DynamicDoughnutChart;
