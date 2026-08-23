import Lottie from 'lottie-react';
import Image from 'next/image';
import type { RankingEntry, RankingPodiumProps } from '../types';
import { RANK_PROFILES, DEFAULT_PROFILE } from '@/shared/constants/memberProfiles';

import firstAnim from '@/shared/components/lottle/first.json';
import secondAnim from '@/shared/components/lottle/second.json';
import thirdAnim from '@/shared/components/lottle/third.json';

const RANK_LOTTIE: Record<number, any> = {
    1: firstAnim,
    2: secondAnim,
    3: thirdAnim,
};

const formatAmount = (val: number) => val.toLocaleString();


const RankingPodium = ({ entries }: RankingPodiumProps) => {
    const sorted = [...entries].sort((a, b) => a.rank - b.rank);
    const first = sorted[0];
    const rest = sorted.slice(1);

    return (
        <div className="w-full">
            {/* 헤더 */}
            <div className="flex items-center gap-2 mb-5">
                <Lottie animationData={firstAnim} loop autoplay style={{ width: 28, height: 28 }} />
                <h2 className="text-lg font-bold text-[var(--color-pet-text)]">랭킹</h2>
            </div>

            {/* 1위 카드 - 특별 디자인 */}
            {first && (
                <div
                    className="relative rounded-2xl p-5 mb-3 overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, var(--color-pet-brown-warm) 0%, var(--color-pet-caramel, #c2956a) 100%)',
                    }}
                >
                    <div className="flex items-center gap-4">
                        {/* Lottie 순위 */}
                        <div className="shrink-0">
                            <Lottie
                                animationData={firstAnim}
                                loop autoplay
                                style={{ width: 48, height: 48 }}
                            />
                        </div>

                        {/* 프로필 이미지 */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-[3px] border-white/40 shadow-lg shrink-0 bg-white/20">
                            <Image src={RANK_PROFILES[first.rank] ?? DEFAULT_PROFILE} alt={first.name} width={64} height={64} className="w-full h-full object-cover" />
                        </div>

                        {/* 이름 + 금액 */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-lg font-bold text-white truncate">{first.name}</p>
                            </div>
                            <p className="text-sm text-white/80">
                                총 지출 <span className="font-bold text-white">{formatAmount(first.totalAmount)}원</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 2위, 3위 카드 */}
            <div className="flex flex-col gap-2.5">
                {rest.map((entry) => {
                    const rankLottie = RANK_LOTTIE[entry.rank];
                    return (
                        <div
                            key={entry.rank}
                            className="flex items-center gap-3.5 p-4 rounded-xl bg-[var(--color-pet-bg-light)]"
                        >
                            {/* Lottie 순위 */}
                            <div className="shrink-0 w-9 flex items-center justify-center">
                                {rankLottie ? (
                                    <Lottie
                                        animationData={rankLottie}
                                        loop autoplay
                                        style={{ width: 36, height: 36 }}
                                    />
                                ) : (
                                    <span className="text-lg font-bold text-[var(--color-pet-text-muted)]">
                                        {entry.rank}
                                    </span>
                                )}
                            </div>

                            {/* 프로필 이미지 */}
                            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[var(--color-pet-border)] shrink-0 bg-white">
                                <Image src={RANK_PROFILES[entry.rank] ?? DEFAULT_PROFILE} alt={entry.name} width={48} height={48} className="w-full h-full object-cover" />
                            </div>

                            {/* 이름 + 금액 */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[15px] font-bold text-[var(--color-pet-text)] truncate">
                                    {entry.name}
                                </p>
                                <p className="text-[13px] text-[var(--color-pet-text-secondary)] mt-0.5">
                                    총 지출 <span className="font-semibold text-[var(--color-pet-text)]">{formatAmount(entry.totalAmount)}원</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RankingPodium;
