import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCardNumber, formatValidThru, sanitizeName } from '@/shared/utils/cardUtils';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #4A90D9 0%, #357ABD 50%, #2868A8 100%)',
  'linear-gradient(135deg, #FEE500 0%, #E5C800 50%, #CCB200 100%)',
  'linear-gradient(135deg, #34C759 0%, #28A745 50%, #1E8C3A 100%)',
  'linear-gradient(135deg, #FF6B6B 0%, #E55555 50%, #CC4444 100%)',
  'linear-gradient(135deg, #8E44AD 0%, #7D3C98 50%, #6C3483 100%)',
  'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #1C2833 100%)',
];

const BANKS = [
  '토스뱅크', '카카오뱅크', '국민', '신한',
  '우리', '하나', 'NH농협', 'IBK기업',
  'SC제일', '씨티', '케이뱅크', '새마을금고',
  '수협', '우체국', '한국투자', '삼성',
];

interface CardRegisterFlowProps {
  gradientIndex: number;
  onRegister: (data: { bankName: string; cardName: string; cardNumber: string; validThru: string; cvc: string }) => void;
  onCancel: () => void;
}

const CARD_STEPS = ['bankName', 'cardName', 'cardNumber', 'cvc', 'validThru', 'confirm'] as const;
const CARD_QUESTIONS: Record<string, string> = {
  bankName: '어떤 은행 카드인가요?',
  cardName: '카드 별명을 지어주세요',
  cardNumber: '카드 번호를 입력해주세요',
  cvc: 'CVC 번호를 입력해주세요',
  validThru: '유효기간은 언제까지인가요?',
  confirm: '카드 정보를 확인해주세요',
};
const CARD_PLACEHOLDERS: Record<string, string> = {
  cardName: '예: 월급 카드, 생활비 카드',
  cardNumber: '1234-5678-9012-3456',
  cvc: '카드 뒷면 3자리',
  validThru: 'MM/YY',
};

export const CardRegisterFlow: React.FC<CardRegisterFlowProps> = ({ gradientIndex, onRegister, onCancel }) => {
  const [newCard, setNewCard] = useState({ bankName: '', cardName: '', cardNumber: '', cvc: '', validThru: '' });
  const [stepIdx, setStepIdx] = useState(0);
  const [stepDir, setStepDir] = useState(1);
  const cardInputRef = useRef<HTMLInputElement>(null);

  const step = CARD_STEPS[stepIdx];
  const progress = ((stepIdx + 1) / CARD_STEPS.length) * 100;
  const cardPreviewGradient = CARD_GRADIENTS[gradientIndex % CARD_GRADIENTS.length];

  const goNext = () => { setStepDir(1); setStepIdx(s => Math.min(s + 1, CARD_STEPS.length - 1)); };
  const goBack = () => { setStepDir(-1); setStepIdx(s => Math.max(s - 1, 0)); };

  const handleStepNext = () => {
    if (step === 'bankName' && !newCard.bankName.trim()) return;
    if (step === 'cardNumber' && !newCard.cardNumber.trim()) return;
    goNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); handleStepNext(); }
  };

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 60 : -60 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -30 : 30 }),
  };

  return (
    <div className="max-w-[500px] mx-auto" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
      {/* Progress bar */}
      <div style={{ height: '3px', background: 'rgba(0,0,0,0.06)', borderRadius: '2px', marginBottom: '16px' }}>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #3182f6, #6db3f2)', borderRadius: '2px' }}
        />
      </div>

      {/* Back button */}
      <button onClick={stepIdx > 0 ? goBack : onCancel}
        className="bg-transparent border-none cursor-pointer text-[1.2em] mb-4 self-start"
        style={{ color: 'var(--color-pet-text-secondary)' }}>
        ←
      </button>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '24px' }}>
        {/* Card preview */}
        <div className="w-[200px] h-[125px] rounded-[14px] mb-6 p-4 flex flex-col justify-between relative overflow-hidden"
          style={{ background: cardPreviewGradient, color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
          <div className="absolute -top-5 -right-5 w-[80px] h-[80px] rounded-full bg-white/[0.08]" />
          <div className="flex justify-between items-start">
            <span className="text-[0.7em] font-bold">{newCard.bankName || '은행명'}</span>
            <span className="text-[0.9em]">💳</span>
          </div>
          <div className="text-[0.6em] font-mono tracking-[0.1em] opacity-90">
            {newCard.cardNumber || '•••• •••• •••• ••••'}
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[0.55em] opacity-70">{newCard.cardName || '카드 별명'}</span>
            <span className="text-[0.55em] font-bold">{newCard.validThru || 'MM/YY'}</span>
          </div>
        </div>

        <AnimatePresence mode="wait" custom={stepDir}>
          <motion.div
            key={step}
            custom={stepDir}
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-pet-text-dark)', textAlign: 'center', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              {CARD_QUESTIONS[step]}
            </h2>

            {/* 은행 선택 (토스 스타일 그리드) */}
            {step === 'bankName' && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="grid grid-cols-4 gap-2.5" style={{ width: '100%' }}>
                  {BANKS.map((bank) => {
                    const selected = newCard.bankName === bank;
                    return (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => {
                          setNewCard(c => ({ ...c, bankName: bank }));
                        }}
                        className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-1 rounded-2xl border-2 cursor-pointer transition-all duration-200"
                        style={{
                          background: selected ? '#EBF5FF' : '#f8f9fa',
                          borderColor: selected ? '#3182f6' : 'transparent',
                          transform: selected ? 'scale(1.02)' : 'scale(1)',
                        }}
                      >
                        <span className="text-[0.72rem] font-bold" style={{
                          color: selected ? '#3182f6' : 'var(--color-pet-text-dark, #333)',
                        }}>
                          {bank}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button onClick={handleStepNext}
                  disabled={!newCard.bankName.trim()}
                  className="py-3.5 rounded-[14px] border-none text-[0.95em] font-bold cursor-pointer font-[inherit] transition-all w-full"
                  style={{
                    background: !newCard.bankName.trim() ? 'var(--color-pet-border)' : '#3182f6',
                    color: !newCard.bankName.trim() ? 'var(--color-pet-text-muted)' : '#fff',
                  }}>
                  다음
                </button>
              </div>
            )}

            {/* 기타 입력 필드 스텝 */}
            {step !== 'confirm' && step !== 'bankName' && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  ref={cardInputRef}
                  type="text"
                  value={step === 'cardName' ? newCard.cardName
                    : step === 'cardNumber' ? newCard.cardNumber
                    : step === 'cvc' ? newCard.cvc
                    : newCard.validThru}
                  onChange={e => {
                    const val = e.target.value;
                    if (step === 'cardName') setNewCard(c => ({ ...c, cardName: sanitizeName(val) }));
                    else if (step === 'cardNumber') setNewCard(c => ({ ...c, cardNumber: formatCardNumber(val) }));
                    else if (step === 'cvc') setNewCard(c => ({ ...c, cvc: val.replace(/\D/g, '').slice(0, 3) }));
                    else setNewCard(c => ({ ...c, validThru: formatValidThru(val) }));
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={CARD_PLACEHOLDERS[step]}
                  style={{
                    width: '100%', padding: '18px 20px',
                    fontSize: '18px', fontWeight: 700,
                    textAlign: 'center',
                    border: 'none', borderBottom: '3px solid #3182f6',
                    borderRadius: '0', background: 'transparent',
                    outline: 'none', color: 'var(--color-pet-text-dark, #1a1a2e)',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  {step === 'cardName' && (
                    <button onClick={goNext}
                      className="py-3.5 rounded-[14px] border-none text-[0.95em] font-bold cursor-pointer font-[inherit] transition-all"
                      style={{ flex: 1, background: 'var(--color-pet-grid)', color: 'var(--color-pet-text-secondary)' }}>
                      건너뛰기
                    </button>
                  )}
                  <button onClick={handleStepNext}
                    disabled={step === 'cardNumber' ? !newCard.cardNumber.trim() : step === 'validThru' ? !newCard.validThru.trim() : false}
                    className="py-3.5 rounded-[14px] border-none text-[0.95em] font-bold cursor-pointer font-[inherit] transition-all"
                    style={{
                      flex: step === 'cardName' ? 2 : 1,
                      background: (step === 'cardNumber' && !newCard.cardNumber.trim()) || (step === 'validThru' && !newCard.validThru.trim())
                        ? 'var(--color-pet-border)' : '#3182f6',
                      color: (step === 'cardNumber' && !newCard.cardNumber.trim()) || (step === 'validThru' && !newCard.validThru.trim())
                        ? 'var(--color-pet-text-muted)' : '#fff',
                    }}>
                    다음
                  </button>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="bg-[var(--color-pet-surface)] rounded-2xl px-5 py-4 border border-[var(--color-pet-border)]">
                  {[
                    { label: '은행명', value: newCard.bankName },
                    { label: '카드 별명', value: newCard.cardName || `${newCard.bankName} 카드` },
                    { label: '카드번호', value: newCard.cardNumber },
                    { label: 'CVC', value: '•••' },
                    { label: '유효기간', value: newCard.validThru || '-' },
                  ].map((item, idx) => (
                    <div key={idx} className={`flex justify-between py-2.5 ${idx < 4 ? 'border-b border-[var(--color-pet-border)]' : ''}`}>
                      <span className="text-[0.82em] text-[var(--color-pet-text-secondary)]">{item.label}</span>
                      <span className="text-[0.88em] font-bold text-[var(--color-pet-text-dark)]">{item.value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onRegister(newCard)}
                  className="py-3.5 rounded-[14px] border-none text-[0.95em] font-bold cursor-pointer font-[inherit] transition-all"
                  style={{ background: '#3182f6', color: '#fff' }}>
                  카드 등록하기
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step !== 'confirm' && (
        <div style={{ textAlign: 'center', paddingBottom: '24px' }}>
          <span onClick={onCancel}
            style={{ fontSize: '14px', color: 'var(--color-pet-text-secondary)', cursor: 'pointer' }}>
            나중에 할게요
          </span>
        </div>
      )}
    </div>
  );
};

export default CardRegisterFlow;
