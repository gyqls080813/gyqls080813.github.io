import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransactionAddForm from '@/features/transaction/components/TransactionAddForm';
import { useCategories } from '@/shared/context/CategoryContext';
import { usePets } from '@/features/pet/context/PetContext';

export interface Entry {
  id: string;
  category: string;
  petName: string;
  amount: number;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  time: string;
  isPetAI: boolean;
  isRejected: boolean;
  entries: Entry[];
  aiSuggestions?: Entry[];
}

type TxStatus = 'suggested' | 'confirmed' | 'rejected';

function getStatus(tx: Transaction): TxStatus {
  if (tx.isRejected) return 'rejected';
  if (tx.entries.length > 0) return 'confirmed';
  if (tx.isPetAI) return 'suggested';
  return 'rejected';
}

const CATEGORY_ICONS: Record<string, string> = {
  '사료': '🍖', '간식': '🦴', '병원': '🏥', '미용': '✂️',
  '장난감': '🎾', '용품': '🧴', '펫시터': '🧑‍⚕️', '기타': '📦',
};

interface Props {
  transactions: Transaction[];
  onUpdate: (txs: Transaction[]) => void;
}

export default function PetLedgerInbox({ transactions, onUpdate }: Props) {
  const [filter, setFilter] = useState<'all' | 'suggested' | 'confirmed' | 'rejected'>('all');
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const counts = useMemo(() => ({
    suggested: transactions.filter(t => getStatus(t) === 'suggested').length,
    confirmed: transactions.filter(t => getStatus(t) === 'confirmed').length,
    rejected: transactions.filter(t => getStatus(t) === 'rejected').length,
  }), [transactions]);

  const filtered = useMemo(() => transactions.filter(t => {
    if (filter === 'all') return true;
    return getStatus(t) === filter;
  }), [transactions, filter]);

  const handleConfirmQuick = (tx: Transaction) => setEditingTx(tx);

  const handleRejectQuick = (txId: string) => {
    onUpdate(transactions.map(t =>
      t.id === txId ? { ...t, isRejected: true, entries: [] } : t
    ));
  };

  const handleSheetSave = (txId: string, entries: Entry[], isPet: boolean) => {
    onUpdate(transactions.map(t =>
      t.id === txId
        ? { ...t, entries: isPet ? entries : [], isRejected: !isPet, isPetAI: isPet }
        : t
    ));
    setEditingTx(null);
  };

  const filterTabs = [
    { key: 'all' as const, label: '전체', count: transactions.length, color: 'var(--color-pet-text-dark)' },
    { key: 'suggested' as const, label: '🌟 제안', count: counts.suggested, color: '#FF9500' },
    { key: 'confirmed' as const, label: '✓ 확정', count: counts.confirmed, color: '#007AFF' },
    { key: 'rejected' as const, label: '일반', count: counts.rejected, color: 'var(--color-pet-text-secondary)' },
  ];

  return (
    <>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {filterTabs.map(tab => (
          <motion.button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '7px 14px', borderRadius: 20,
              border: filter === tab.key ? `2px solid ${tab.color}` : '2px solid transparent',
              background: filter === tab.key ? `${tab.color}12` : 'var(--color-pet-bg-light)',
              color: filter === tab.key ? tab.color : 'var(--color-pet-text-secondary)',
              fontSize: '0.75em', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            {tab.label} <span style={{ opacity: 0.6 }}>{tab.count}</span>
          </motion.button>
        ))}
      </div>

      {}
      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="popLayout">
          {filtered.map(tx => (
            <TxCard
              key={tx.id}
              tx={tx}
              onConfirm={() => handleConfirmQuick(tx)}
              onReject={() => handleRejectQuick(tx.id)}
              onTap={() => setEditingTx(tx)}
            />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-pet-text-dim)', fontSize: '0.85em' }}>
            항목이 없습니다
          </div>
        )}
      </div>

      {}
      <AnimatePresence>
        {editingTx && (
          <DetailEditorSheet
            tx={editingTx}
            onSave={(entries, isPet) => handleSheetSave(editingTx.id, entries, isPet)}
            onClose={() => setEditingTx(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function TxCard({ tx, onConfirm, onReject, onTap }: {
  tx: Transaction; onConfirm: () => void; onReject: () => void; onTap: () => void;
}) {
  const status = getStatus(tx);
  const styles = {
    suggested: { bg: 'linear-gradient(135deg, #fff8f0, #fff3e0)', border: '2px solid #FFB74D', shadow: '0 4px 20px rgba(255,152,0,0.12)' },
    confirmed: { bg: '#f0f7ff', border: '2px solid #42A5F5', shadow: '0 4px 20px rgba(33,150,243,0.12)' },
    rejected: { bg: '#fafafa', border: '2px solid #e8e8ea', shadow: '0 1px 4px rgba(0,0,0,0.03)' },
  }[status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: status === 'rejected' ? 200 : -200, scale: 0.8, transition: { duration: 0.3 } }}
      transition={{ layout: { type: 'spring', stiffness: 400, damping: 35 }, opacity: { duration: 0.25 }, y: { type: 'spring', stiffness: 300, damping: 25 } }}
      onClick={onTap}
      style={{ background: styles.bg, border: styles.border, borderRadius: 18, padding: '16px', marginBottom: 10, cursor: 'pointer', boxShadow: styles.shadow, position: 'relative', overflow: 'hidden' }}
    >
      {status === 'suggested' && (
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,152,0,0.15), transparent)', pointerEvents: 'none' }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.92em', fontWeight: 700, color: status === 'rejected' ? '#b0b0b5' : 'var(--color-pet-text-dark)', textDecoration: status === 'rejected' ? 'line-through' : 'none' }}>{tx.title}</div>
          <div style={{ fontSize: '0.65em', marginTop: 2, color: status === 'rejected' ? 'var(--color-pet-text-dim)' : 'var(--color-pet-text-secondary)' }}>{tx.date} · {tx.time}</div>
        </div>
        <div style={{ fontSize: '0.95em', fontWeight: 800, color: status === 'rejected' ? 'var(--color-pet-text-dim)' : 'var(--color-pet-text-dark)', textDecoration: status === 'rejected' ? 'line-through' : 'none' }}>
          -{Math.abs(tx.amount).toLocaleString()}원
        </div>
      </div>

      {status === 'suggested' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <motion.button whileTap={{ scale: 0.92 }} onClick={(e) => { e.stopPropagation(); onConfirm(); }}
            style={{ flex: 1, padding: '10px 0', borderRadius: 12, background: 'linear-gradient(135deg, #FF9500, #FF8000)', border: 'none', color: '#fff', fontSize: '0.78em', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(255,149,0,0.3)' }}>
            👍 맞아요
          </motion.button>
          <motion.button whileTap={{ scale: 0.92 }} onClick={(e) => { e.stopPropagation(); onReject(); }}
            style={{ flex: 1, padding: '10px 0', borderRadius: 12, background: '#fff', border: '1.5px solid #e8e8ea', color: 'var(--color-pet-text-secondary)', fontSize: '0.78em', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            👎 아님
          </motion.button>
        </motion.div>
      )}

      {status === 'confirmed' && tx.entries.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {tx.entries.map(entry => (
            <div key={entry.id} style={{ padding: '4px 10px', borderRadius: 16, background: '#e3f2fd', color: '#1565C0', fontSize: '0.65em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>{entry.petName}</span><span style={{ opacity: 0.5 }}>·</span>
              <span>{CATEGORY_ICONS[entry.category] || '📦'} {entry.category}</span><span style={{ opacity: 0.5 }}>·</span>
              <span>{entry.amount.toLocaleString()}원</span>
            </div>
          ))}
          <div style={{ padding: '4px 8px', borderRadius: 16, background: '#42A5F5', color: '#fff', fontSize: '0.6em', fontWeight: 700, display: 'flex', alignItems: 'center' }}>✓ 확정됨</div>
        </motion.div>
      )}

      {status === 'rejected' && (
        <div style={{ marginTop: 8, fontSize: '0.65em', color: 'var(--color-pet-text-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: '1em' }}>🚫</span> 일반 지출로 분류됨
        </div>
      )}
    </motion.div>
  );
}

function DetailEditorSheet({ tx, onSave, onClose }: {
  tx: Transaction;
  onSave: (entries: Entry[], isPet: boolean) => void;
  onClose: () => void;
}) {
  const [isPet, setIsPet] = useState(tx.isPetAI && !tx.isRejected);
  const totalAmount = Math.abs(tx.amount);
  const { categoryNames } = useCategories();
  const { pets } = usePets();

  return (
    <>
      {}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999, backdropFilter: 'blur(4px)' }}
      />

      {}
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: '90vh', background: '#fff', borderRadius: '24px 24px 0 0', zIndex: 1000, overflowY: 'auto', boxShadow: '0 -8px 40px rgba(0,0,0,0.12)' }}
      >
        {}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: '#d8d8dc' }} />
        </div>

        {}
        <div style={{ textAlign: 'center', padding: '8px 20px 16px' }}>
          <div style={{ fontSize: '0.78em', color: 'var(--color-pet-text-secondary)' }}>{tx.title} · {tx.date}</div>
          <div style={{ fontSize: '2em', fontWeight: 800, color: 'var(--color-pet-text-dark)', margin: '6px 0 2px' }}>
            -{totalAmount.toLocaleString()}원
          </div>
        </div>

        {}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10 }}>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => setIsPet(true)}
            style={{
              flex: 1, padding: '14px 0', borderRadius: 16,
              background: isPet ? 'linear-gradient(135deg, #FF9500, #FF8000)' : 'var(--color-pet-bg-light)',
              border: isPet ? '2px solid #FF9500' : '2px solid #e8e8ea',
              color: isPet ? '#fff' : 'var(--color-pet-text-secondary)', fontSize: '0.88em', fontWeight: 800,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: isPet ? '0 4px 16px rgba(255,149,0,0.3)' : 'none', transition: 'box-shadow 0.3s',
            }}>
            👍 펫 지출 맞음
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => setIsPet(false)}
            style={{
              flex: 1, padding: '14px 0', borderRadius: 16,
              background: !isPet ? '#f0f0f2' : 'var(--color-pet-bg-light)',
              border: !isPet ? '2px solid var(--color-pet-text-secondary)' : '2px solid #e8e8ea',
              color: !isPet ? 'var(--color-pet-text-dark)' : 'var(--color-pet-text-dim)', fontSize: '0.88em', fontWeight: 800,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
            👎 일반 지출임
          </motion.button>
        </div>

        {}
        {isPet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{ padding: '0 12px 12px' }}
          >
            <TransactionAddForm
              dateString={tx.date}
              categoryOptions={categoryNames}
              petList={pets.map(p => ({ id: p.id, name: p.name }))}
              initialAmount={totalAmount}
              hideHeader
              onSave={(data) => {
                const entries: Entry[] = data.items.map((item, idx) => {
                  const firstPetId = item.whom[0];
                  const firstPetName = pets.find(p => p.id === firstPetId)?.name || '';
                  return {
                    id: `entry-${tx.id}-${idx}-${Date.now()}`,
                    category: item.what || '기타',
                    petName: firstPetName,
                    amount: item.amount,
                  };
                });
                onSave(entries, true);
              }}
              onCancel={onClose}
            />
          </motion.div>
        )}

        {}
        {!isPet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--color-pet-text-secondary)', fontSize: '0.85em' }}>
              <span style={{ fontSize: '2em', display: 'block', marginBottom: 8 }}>🚫</span>
              이 결제는 반려동물 지출이 아닙니다
            </motion.div>
            <div style={{ padding: '12px 20px 28px', borderTop: '1px solid #f0f0f2', position: 'sticky', bottom: 0, background: '#fff' }}>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => onSave([], false)}
                style={{ width: '100%', padding: 16, borderRadius: 16, border: 'none', fontSize: '0.92em', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', background: '#f0f0f2', color: 'var(--color-pet-text-secondary)' }}>
                일반 지출로 분류하기
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}
