'use client'

import PlatformSection from "@/components/onboarding/PlatformSection/Platform";

interface CategoryProps {
    selectedIds: number[];
    onToggle: (id: number) => void;
}

const PLATFORM_CONFIG = [
    { serviceName: "Netflix", apiKey: "OTT", accentColor: "bg-red-600" },
    { serviceName: "Youtube", apiKey: "YOUTUBE", accentColor: "bg-red-500" },
];

export default function Category({ selectedIds, onToggle }: CategoryProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center mb-10">
            <div className="border-2 border-gray-300 p-7 rounded-2xl shadow-sm w-[900px] bg-white">
                <h1 className="text-center text-4xl text-black font-bold mb-2">선호하는 카테고리를 선택해주세요</h1>
                <p className="text-center text-lg text-gray-600 mb-10">관심 있는 카테고리를 선택하면 맞춤 추천을 제공해드려요</p>
                <div className="flex items-center justify-center border-2 bg-gray-100 border-gray-200 p-2 rounded-2xl shadow-sm mb-6">
                    <p className="font-bold text-black text-sm mr-1">{selectedIds.length}</p>
                    <p className="text-black text-sm">개 카테고리 선택됨</p>
                </div>

                {PLATFORM_CONFIG.map((config) => (
                    <PlatformSection
                        key={config.apiKey}
                        platformName={config.serviceName}
                        platformKey={config.apiKey}
                        accentColor={config.accentColor}
                        selectedIds={selectedIds} // 부모에게 받은 props 그대로 전달
                        onToggle={onToggle}       // 부모에게 받은 함수 그대로 전달
                    />
                ))}
            </div>
        </div>
    );
}