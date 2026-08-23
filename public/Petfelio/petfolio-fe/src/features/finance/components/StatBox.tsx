interface StatItem {
    label: string;
    value: string;
}

interface StatBoxProps {
    items: StatItem[];
}

const StatBox = ({ items }: StatBoxProps) => {
    return (
        <div
            className="w-full rounded-2xl overflow-hidden bg-pet-surface border border-pet-border grid"
            style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`flex flex-col items-center justify-center py-5 px-4
                        ${index < items.length - 1 ? 'border-r border-pet-border' : ''}`}
                >
                    <span className="text-sm text-pet-text-muted font-medium mb-1.5">
                        {item.label}
                    </span>
                    <span className="text-[22px] text-pet-text font-bold">
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default StatBox;
