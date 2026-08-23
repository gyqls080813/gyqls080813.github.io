'use client'
import { useSearchCategory } from "@/hooks/user/Category";

interface PlatformSectionProps {
  platformName: string;
  platformKey: string;
  accentColor: string;
  selectedIds: number[];
  onToggle: (id: number) => void;
}

export default function PlatformSection({
  platformName,
  platformKey,
  accentColor,
  selectedIds,
  onToggle
}: PlatformSectionProps) {

  const { data: items, isLoading } = useSearchCategory(platformKey, true);

  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex text-left text-black font-bold items-center mb-4">
        <div className={`w-1 h-6 ${accentColor} rounded-full mr-4`}></div>
        {platformName}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {items.map((item: { id: number; name: string }) => {
          const isSelected = selectedIds.map(String).includes(String(item.id));

          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`relative basis-[calc(20%-1rem)] mb-3 p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center
                ${isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
            >
              <span className="font-semibold text-sm truncate w-full text-center">{item.name}</span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}