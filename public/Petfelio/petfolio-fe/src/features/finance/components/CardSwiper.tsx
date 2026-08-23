import React, { useRef } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';

interface CardInfo {
  id: string;
  bankName: string;
  cardName: string;
  cardNumber: string;
  validThru: string;
  gradient: string;
  balance: number;
  bankType: string;
  monthlyTransactionCount: number;
  getMonthlyTotalCount: number;   // 이번달 총 지출 금액 (원)
  getMonthlyTotalAmount: number;  // 이번달 총 거래 건수
  cardNickname: string;           // 카드 별명
  /** 현금(직접 등록) 카드 여부 */
  isCash?: boolean;
}

interface CardSwiperProps {
  cards: CardInfo[];
  currentCardIdx: number;
  onChangeCard: (idx: number) => void;
  deleteMode: boolean;
  onToggleDeleteMode: () => void;
  onDeleteCard: (idx: number) => void;
  onCardClick: (card: CardInfo) => void;
  onAddCardClick: () => void;
}

/* cardShake 키프레임은 globals.css에서 제공됨 */

export const CardSwiper: React.FC<CardSwiperProps> = ({
  cards, currentCardIdx, onChangeCard, deleteMode, onToggleDeleteMode,
  onDeleteCard, onCardClick, onAddCardClick,
}) => {
  const dirRef = useRef(1);
  const totalSlots = cards.length + 1;
  const isAddSlot = currentCardIdx >= cards.length;
  const card = isAddSlot ? null : cards[currentCardIdx];

  return (
    <div className="max-w-[500px] mx-auto">

      {/* 삭제 버튼 */}
      <div className="flex justify-end mb-3" style={{ visibility: isAddSlot ? 'hidden' : 'visible' }}>
        <button onClick={onToggleDeleteMode}
          className="px-4 py-1.5 rounded-[10px] border-none text-[0.78em] font-bold cursor-pointer font-[inherit] transition-all duration-200"
          style={{
            background: deleteMode ? 'var(--color-pet-green)' : 'var(--color-pet-red-light)',
            color: deleteMode ? '#fff' : 'var(--color-pet-red)',
          }}>
          {deleteMode ? '완료' : '삭제'}
        </button>
      </div>

      {/* 이번달 지출 */}
      <div className="text-center mb-6" style={{ visibility: isAddSlot ? 'hidden' : 'visible' }}>
        <div className="text-[0.8em] text-[var(--color-pet-text-secondary)]">
          {card?.bankType.toUpperCase() === 'CASH' ? '현금 이번달 지출' : '카드 이번달 지출'}
        </div>
        <div className="text-[2em] font-extrabold text-[var(--color-pet-text-dark)] mt-1">
          ₩{card ? card.getMonthlyTotalCount.toLocaleString() : '0'}
        </div>
      </div>

      {/* 카드 스와이프 */}
      <div className="flex justify-center mb-5" style={{ height: 420, position: 'relative' }}>
        <AnimatePresence mode="wait" custom={dirRef.current} initial={false}>
          <motion.div
            key={currentCardIdx}
            custom={dirRef.current}
            drag={deleteMode ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_: any, info: PanInfo) => {
              if (Math.abs(info.offset.x) > 60) {
                if (info.offset.x < 0 && currentCardIdx < totalSlots - 1) {
                  dirRef.current = 1;
                  onChangeCard(currentCardIdx + 1);
                } else if (info.offset.x > 0 && currentCardIdx > 0) {
                  dirRef.current = -1;
                  onChangeCard(currentCardIdx - 1);
                }
              }
            }}
            variants={{
              enter: (dir: number) => ({ x: dir * 300, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir * -300, opacity: 0 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ touchAction: 'pan-y' }}
          >
            {isAddSlot ? (
              <div className="relative">
                <div onClick={onAddCardClick}
                  className="w-[280px] h-[400px] rounded-[20px] bg-[var(--color-pet-surface)] border-[2.5px] border-dashed border-[var(--color-pet-text-muted)] flex flex-col justify-center items-center gap-3 cursor-pointer transition-all duration-200"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                  <div className="w-14 h-14 rounded-full bg-[var(--color-pet-bg)] flex items-center justify-center text-[1.8em] text-[var(--color-pet-text-muted)]">+</div>
                  <div className="text-[0.95em] font-bold text-[var(--color-pet-text-muted)]">카드 추가</div>
                </div>
              </div>
            ) : card!.bankType.toUpperCase() === 'CASH' ? (
              /* ─── Cash (수동 등록) 형태 ─── */
              <div className="relative">
                <div onClick={() => { if (!deleteMode && card) onCardClick(card); }}
                  className="w-[280px] h-[400px] rounded-[20px] p-7 box-border flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #F5F0E8 0%, #E8DDD0 40%, #DDD2C4 100%)',
                    color: '#5A4A3A',
                    cursor: deleteMode ? 'default' : 'pointer',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                    animation: deleteMode ? 'cardShake 0.4s ease-in-out infinite' : 'none',
                  }}>
                  <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full" style={{ background: 'rgba(180,160,130,0.08)' }} />
                  <div>
                    <div className="flex justify-between">
                      <span className="text-[1.05em] font-bold">현금</span>
                      <span className="text-[1.8em]">💰</span>
                    </div>
                    <div className="text-[0.85em] opacity-60 mt-2">수동 등록</div>
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 gap-2">
                    <div className="text-[3em]">🪙</div>
                    <div className="text-[1.1em] font-bold opacity-80">Cash</div>
                  </div>
                  <div>
                    <div className="text-[0.78em] opacity-70">{card!.cardName || '현금 지출'}</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[0.72em] opacity-50">수동 입력 내역</span>
                      <span className="text-[0.88em] font-bold">₩{card!.balance.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {deleteMode && (
                  <button onClick={() => onDeleteCard(currentCardIdx)}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FF3B30] border-2 border-white text-white text-[1.1em] font-bold flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(255,59,48,0.4)] z-10 leading-none">
                    −
                  </button>
                )}
              </div>
            ) : (
              /* ─── 일반 카드 형태 ─── */
              <div className="relative">
                <div onClick={() => { if (!deleteMode && card) onCardClick(card); }}
                  className="w-[280px] h-[400px] rounded-[20px] p-7 box-border flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: card!.gradient,
                    color: card!.id === 'kakao' ? '#3C1E1E' : '#fff',
                    cursor: deleteMode ? 'default' : 'pointer',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    animation: deleteMode ? 'cardShake 0.4s ease-in-out infinite' : 'none',
                  }}>
                  <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-white/[0.06]" />
                  <div>
                    <div className="flex justify-between">
                      <span className="text-[1.05em] font-bold">{card!.bankName}</span>
                    </div>
                    <div className="h-[30px]" />
                  </div>
                  <div className="text-[1.1em] font-semibold tracking-[0.15em] font-mono">{card!.cardNumber}</div>
                  <div>
                    <div className="text-[0.78em] opacity-70">{card!.cardName}</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[0.72em] opacity-60">VALID THRU</span>
                      <span className="text-[0.88em] font-bold">{card!.validThru}</span>
                    </div>
                  </div>
                </div>

                {deleteMode && (
                  <button onClick={() => onDeleteCard(currentCardIdx)}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FF3B30] border-2 border-white text-white text-[1.1em] font-bold flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(255,59,48,0.4)] z-10 leading-none">
                    −
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center items-center gap-4 mb-5">
        <button onClick={() => { dirRef.current = -1; onChangeCard(Math.max(0, currentCardIdx - 1)); }}
          className="bg-transparent border-none text-[1.1em] text-[var(--color-pet-text-dim)] cursor-pointer">‹</button>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSlots }).map((_, i) => (
            <div key={i} onClick={() => { dirRef.current = i > currentCardIdx ? 1 : -1; onChangeCard(i); }}
              className="h-2 rounded cursor-pointer transition-all duration-300"
              style={{
                width: i === currentCardIdx ? 20 : 8,
                background: i === currentCardIdx
                  ? (i >= cards.length ? 'var(--color-pet-green)' : 'var(--color-pet-text-dark)')
                  : '#d8d8dc',
              }} />
          ))}
        </div>
        <button onClick={() => { dirRef.current = 1; onChangeCard(Math.min(totalSlots - 1, currentCardIdx + 1)); }}
          className="bg-transparent border-none text-[1.1em] text-[var(--color-pet-text-dim)] cursor-pointer">›</button>
      </div>

      {/* 카드 정보 */}
      {!isAddSlot && card && (
        <div className="flex gap-2">
          <div className="flex-1 bg-[var(--color-pet-surface)] rounded-[14px] px-[18px] py-3.5 text-center border border-[var(--color-pet-border)]">
            <div className="text-[0.72em] text-[var(--color-pet-text-secondary)]">이번달 거래</div>
            <div className="text-[1.2em] font-extrabold text-[var(--color-pet-text-dark)] mt-1">{card.getMonthlyTotalAmount}건</div>
          </div>
          <div className="flex-1 bg-[var(--color-pet-surface)] rounded-[14px] px-[18px] py-3.5 text-center border border-[var(--color-pet-border)]">
            <div className="text-[0.72em] text-[var(--color-pet-text-secondary)]">결제 수단</div>
            <div className="text-[1.05em] font-extrabold text-[var(--color-pet-text-dark)] mt-1">
              {card.bankType.toUpperCase() === 'CASH' ? '💰 현금' : card.cardNickname}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type { CardInfo };
export default CardSwiper;
