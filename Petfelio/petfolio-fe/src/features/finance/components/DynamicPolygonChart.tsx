import { useState, useEffect } from 'react';

interface DynamicPolygonChartProps {
    data?: number[];
    labels?: string[];
    centerChild?: React.ReactNode;
}

const DynamicPolygonChart = ({ data = [], labels = [], centerChild = null }: DynamicPolygonChartProps) => {
    const [animated, setAnimated] = useState(false);
    const totalPoints = data.length;

    useEffect(() => {
        if (totalPoints >= 3) {
            const timer = setTimeout(() => setAnimated(true), 50);
            return () => clearTimeout(timer);
        }
    }, [totalPoints, data]);

    if (totalPoints < 3) {
        return (
            <div className="flex items-center justify-center w-80 h-80 bg-gray-100 rounded-xl text-gray-500 text-sm font-sans">
                데이터가 부족합니다 (최소 3개 필요).
            </div>
        );
    }

    const totalSum = data.reduce((sum, val) => sum + val, 0);
    const percentData = data.map(val => (totalSum === 0 ? 0 : (val / totalSum) * 100));
    const chartMaxValue = Math.max(...percentData, 1);

    const svgSize = 360;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const maxRadius = 110;
    const labelOffset = 40;

    const calculateCoordinate = (value: number, index: number, isLabel = false) => {
        const ratio = value / chartMaxValue;
        const radius = isLabel ? maxRadius + labelOffset : maxRadius * ratio;
        const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
        return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
    };

    const getTextAnchor = (index: number): 'middle' | 'start' | 'end' => {
        const { x } = calculateCoordinate(chartMaxValue, index, true);
        const threshold = 5;
        if (Math.abs(x - cx) < threshold) return 'middle';
        if (x > cx) return 'start';
        return 'end';
    };

    const gridLevels = [1 / 3, 2 / 3, 1];

    // 애니메이션: 중앙에서 시작 → 실제 데이터 좌표로 확장
    const centerPoints = Array.from({ length: totalPoints })
        .map(() => `${cx},${cy}`)
        .join(' ');

    const dataPoints = percentData
        .map((val, i) => {
            const { x, y } = calculateCoordinate(val, i);
            return `${x},${y}`;
        })
        .join(' ');

    const displayPoints = animated ? dataPoints : centerPoints;

    return (
        <div className="inline-block p-6 font-sans">
            <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full max-w-[420px] h-auto">
                { }
                <g>
                    {gridLevels.map((level, levelIndex) => {
                        const levelValue = chartMaxValue * level;
                        const points = Array.from({ length: totalPoints })
                            .map((_, i) => {
                                const coord = calculateCoordinate(levelValue, i);
                                return `${coord.x},${coord.y}`;
                            })
                            .join(' ');
                        return (
                            <polygon
                                key={`grid-poly-${levelIndex}`}
                                points={points}
                                className="fill-none stroke-pet-grid [stroke-width:1]"
                            />
                        );
                    })}
                    {Array.from({ length: totalPoints }).map((_, i) => {
                        const { x: endX, y: endY } = calculateCoordinate(chartMaxValue, i);
                        return (
                            <line
                                key={`bg-line-${i}`}
                                x1={cx} y1={cy} x2={endX} y2={endY}
                                className="stroke-pet-grid [stroke-width:1]"
                            />
                        );
                    })}
                </g>

                { }
                <polygon
                    points={displayPoints}
                    className="fill-pet-data [fill-opacity:0.85] stroke-pet-brown [stroke-width:2.5] [stroke-linejoin:round] transition-all duration-700 ease-out"
                />

                { }
                {percentData.map((val, i) => {
                    const { x, y } = calculateCoordinate(val, i);
                    return (
                        <circle
                            key={`point-${i}`}
                            cx={animated ? x : cx} cy={animated ? y : cy} r="5.5"
                            className="fill-pet-brown-soft stroke-white [stroke-width:2] transition-all duration-700 ease-out"
                        />
                    );
                })}

                { }
                {centerChild && (
                    <foreignObject x={cx - 28} y={cy - 28} width="56" height="56">
                        <div className="w-full h-full flex items-center justify-center pointer-events-none">
                            {centerChild}
                        </div>
                    </foreignObject>
                )}

                { }
                {percentData.map((val, i) => {
                    const { x, y } = calculateCoordinate(chartMaxValue, i, true);
                    const labelName = labels[i] || `항목 ${i + 1}`;
                    const displayPercent = Math.round(val);
                    const anchor = getTextAnchor(i);
                    return (
                        <text key={`label-${i}`} x={x} y={y} textAnchor={anchor} dominantBaseline="middle">
                            <tspan x={x} dy="-0.5em" className="fill-pet-text-label font-bold text-[15px]">
                                {labelName}
                            </tspan>
                            <tspan x={x} dy="1.5em" className="fill-pet-text-subtle font-semibold text-[13px]">
                                {displayPercent}%
                            </tspan>
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

export default DynamicPolygonChart;