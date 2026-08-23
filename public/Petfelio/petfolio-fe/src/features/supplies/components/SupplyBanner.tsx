import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/shared/components/common/Card';
import { Badge } from '@/shared/components/common/Badge';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { colors, adaptive } from '@/shared/styles/colors';
import { Package } from '@/shared/components/ui/icon';
import { dday, catById } from '@/features/supplies/utils/supplyUtils';
import type { ConsumableItem, ConsumableDetailData } from '@/features/supplies/types/consumable';

interface SupplyBannerProps {
  soonItems: ConsumableItem[];
  itemsCount: number;
  allStickers: string[];
  globalPets: any[];
  detailCache: Record<number, ConsumableDetailData>;
  stickerImages: Record<number, any[]>;
  setExpanded: (id: number) => void;
}

export const SupplyBanner = ({ 
  soonItems, itemsCount, allStickers, globalPets, detailCache, stickerImages, setExpanded 
}: SupplyBannerProps) => {
  if (soonItems.length === 0) return null;

  return (
    <div className="mb-6 relative">
      <Card
        elevation="high"
        radius="large"
        padding="medium"
        htmlStyle={{
          border: '1px solid rgba(255, 255, 255, 0.6)',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(46, 125, 50, 0.08)',
          background: 'rgba(255, 255, 255, 0.6)',
        }}
      >

        <div className="absolute inset-0 z-0 rounded-[1em] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#F1F8E9] to-[#E0F2F1] opacity-90" />
          

          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-[#c8e6c9] rounded-full mix-blend-multiply opacity-30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#b2dfdb] rounded-full mix-blend-multiply opacity-20 blur-3xl"
          />
        </div>


        <div className="relative z-10">
          <Box direction="row" alignItems="center" gap="xsmall" htmlStyle={{ marginBottom: '0.4rem' }}>
            <Paragraph typography="t1" fontWeight="bold" style={{ letterSpacing: '-0.5px' }} className="font-extrabold">
              <span style={{ color: colors.blue600}}>{soonItems.length}개</span> 소모품,
            </Paragraph>
          </Box>
          <Paragraph typography="t3" fontWeight="bold" color={adaptive.grey800} style={{ marginBottom: '1.2rem', letterSpacing: '-0.3px' }}>
            곧 교체 예정이에요
          </Paragraph>

          <Box direction="row" gap="xsmall" htmlStyle={{ marginBottom: '1.5rem' }}>
            <Badge color="blue" variant="fill" size="small" className="shadow-sm bg-white/70 border border-white/50">
              <span className="text-gray-700">이번 달 교체</span> <span className="font-bold text-blue-600 ml-1">{soonItems.length}개</span>
            </Badge>
            <Badge color="grey" variant="fill" size="small" className="shadow-sm bg-white/70 border border-white/50">
              <span className="text-gray-700">총 등록</span> <span className="font-bold text-gray-700 ml-1">{itemsCount}개</span>
            </Badge>
          </Box>


          <div className="flex flex-col gap-2.5">
            {soonItems.slice(0, 2).map((s) => {
              const d = dday(s.nextPurchaseDate);
              const urgencyColor = d <= 1 ? colors.red500 : d <= 3 ? '#f59e0b' : colors.blue500;
              
              const petId = detailCache[s.id]?.pets[0]?.petId;
              const associatedPet = globalPets.find(p => p.id === petId);
              const isCat = associatedPet?.species === 'CAT';
              const cat = catById(s.categoryId);
              const sticker = petId ? stickerImages[petId]?.find(st => st.categoryId === s.categoryId) : null;
              const miniIcon = sticker?.imageUrl || (isCat ? cat.catImage : cat.dogImage);
              
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 cursor-pointer group"
                  style={{ transition: 'transform 0.2s' }}
                  onClick={() => {
                    const el = document.getElementById(`supply-${s.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setExpanded(s.id);
                    }
                  }}
                >

                  {miniIcon ? (
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-white relative">
                      <Image src={miniIcon} alt="pet icon" fill sizes="36px" className="object-cover" unoptimized={!!sticker} />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center shrink-0">
                      <Package size="small" color={urgencyColor} />
                    </div>
                  )}


                  <span className="flex-1 text-[0.9rem] font-extrabold text-gray-800 truncate">
                    {s.name}
                  </span>


                  <span
                    className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-black"
                    style={{
                      background: d <= 1 ? colors.red500 : d <= 3 ? '#f59e0b' : 'rgba(255,255,255,0.75)',
                      color: d <= 3 ? '#fff' : '#555',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {d <= 0 ? 'D-Day' : `D-${d}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>


        <div className="absolute inset-x-0 -top-10 -bottom-10 z-[20] overflow-hidden pointer-events-none">

          {allStickers.slice(0, 3).map((url, idx) => (
            <motion.div
              key={idx}
              animate={{ 
                y: [0, -25, 0], 
                rotate: [-10, 10, -10] 
              }}
              transition={{ 
                duration: 8 + idx * 3, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: idx * 2.5
              }}
              className={`absolute opacity-100 drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] ${
                idx === 0 ? 'top-10 -right-2 w-24 h-24' :
                idx === 1 ? 'bottom-16 right-20 w-18 h-18' :
                'top-20 left-[50%] w-16 h-16'
              }`}
            >
              <Image src={url} alt="배경 스티커" fill sizes="100px" priority className="object-contain" unoptimized />
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};
