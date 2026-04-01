'use client';

import { useState, useMemo } from 'react';
import OTT_Component from '../Netflix/Netflix';
import Youtube from '../Youtube/Youtube';
import { useGetHistoryQuery } from '@/hooks/watch_history/GetHistory';
import { responseGetHistory } from '@/constants/watch_history/GetHistory';

export default function HistorySection() {
    const [activePlatform, setActivePlatform] = useState("Netflix");

    const PLATFORM_MAP: Record<string, string> = {
        "Netflix": "OTT",
        "YouTube": "YOUTUBE"
    };

    const isYoutube = activePlatform === "YouTube";
    const Platform = isYoutube ? Youtube : OTT_Component;

    const { data, isLoading, isError } = useGetHistoryQuery();

    const historyGroups = useMemo(() => {

        if (!data || data.length === 0) return [];
        const targetPlatform = PLATFORM_MAP[activePlatform];

        const filteredData = data.filter((item: responseGetHistory) =>
            item.platform.toLowerCase() === targetPlatform.toLowerCase()
        );

        const groups = filteredData.reduce((acc: any, item: responseGetHistory) => {
            const date = item.endedAt.split('T')[0]

            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push({
                id: item.id,
                title: item.title,
                image: item.thumbnailPath,
                progress: item.progress,
                endedAt: item.endedAt,
            });

            return acc;
        }, {});

        return Object.keys(groups)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map(date => ({
                date,
                items: groups[date]
            }));

    }, [data, activePlatform]);

    if (isLoading) return <div className="p-10 text-center">로딩 중...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">데이터를 불러오는데 실패했습니다.</div>;

    return (
        <section className="border border-zinc-800 p-10 rounded-3xl shadow-sm bg-zinc-900">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold text-white">시청 기록</h2>
                <div className="flex gap-2">
                    {Object.keys(PLATFORM_MAP).map((platform) => (
                        <button
                            key={platform}
                            onClick={() => setActivePlatform(platform)}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activePlatform === platform
                                ? "bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                                : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
                                }`}
                        >
                            {platform}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {historyGroups.length > 0 ? (
                    historyGroups.map((group) => (
                        <div key={group.date}>
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-8">
                                <h3 className="text-lg font-bold text-white">{group.date}</h3>
                                <span className="text-zinc-500 text-sm font-bold">{group.items.length}개</span>
                            </div>
                            <div className={`grid gap-x-6 gap-y-12 ${isYoutube ? "grid-cols-3" : "grid-cols-5"}`}>
                                {group.items.map((item: any) => (
                                    <Platform
                                        key={item.id}
                                        title={item.title}
                                        image={item.image}
                                        progress={item.progress}
                                        showProgress={true}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center text-zinc-500 font-medium">
                        {activePlatform} 시청 기록이 없습니다.
                    </div>
                )}
            </div>
        </section>
    );
}