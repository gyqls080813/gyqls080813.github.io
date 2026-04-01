import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TransactionAddForm } from '@/features/transaction';
import type { TransactionItem } from '@/features/transaction';
import { getTransactions } from '@/features/transaction/api/getTransactionsApi';
import { getTransactionDetail } from '@/features/transaction/api/getTransactionDetailApi';
import { saveTransactionDetails } from '@/features/transaction/api/saveTransactionDetailApi';
import { updateTransactionDetails } from '@/features/transaction/api/updateTransactionDetailApi';
import { syncTransactions } from '@/features/transaction/api/syncTransactionApi';
import { registerCard } from '@/features/finance/api/cardApi';
import { deleteCard } from '@/features/finance/api/deleteCardApi';
import ConfirmModal from '@/shared/components/common/ConfirmModal';
import { useCards } from '@/features/finance/context/CardContext';
import type { TransactionDetailData, TransactionDetailsRequest } from '@/features/transaction/types/transactionDetail';
import type { TransactionListItem } from '@/features/transaction/types/transaction';
import { useCategories } from '@/shared/context/CategoryContext';
import { usePets } from '@/features/pet';
import { CardSwiper, type CardInfo } from '@/features/finance/components/CardSwiper';
import { CardRegisterFlow } from '@/features/finance/components/CardRegisterFlow';
import { AccountTransactionList } from '@/features/transactionhistory/components/AccountTransactionList';
import { useToast } from '@/shared/context/ToastContext';
import { Skeleton, SkeletonCard } from '@/shared/components/skeleton/Skeleton';
import { getAccessToken } from '@/api/tokenManager';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #4A90D9 0%, #357ABD 50%, #2868A8 100%)',
  'linear-gradient(135deg, #FEE500 0%, #E5C800 50%, #CCB200 100%)',
  'linear-gradient(135deg, #34C759 0%, #28A745 50%, #1E8C3A 100%)',
  'linear-gradient(135deg, #FF6B6B 0%, #E55555 50%, #CC4444 100%)',
  'linear-gradient(135deg, #8E44AD 0%, #7D3C98 50%, #6C3483 100%)',
  'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #1C2833 100%)',
];

/** 현금 카드 판별: cardId=5 또는 카드사명이 '현금'인 경우 */
const CASH_CARD_ID = 5;
const isCashCard = (cardId: number, cardCompany?: string) =>
  cardId === CASH_CARD_ID || cardCompany === '현금';

type View = 'cards' | 'list' | 'add' | 'edit' | 'addCard';

export default function AccountPage() {
  const [view, setView] = useState<View>('cards');
  const { cards: contextCards, refresh: refreshCards, loading: cardsLoading } = useCards();
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [txList, setTxList] = useState<TransactionListItem[]>([]);
  const [txLoading, setTxLoading] = useState(false);
  const { petNames, pets } = usePets();
  const { categoryNames } = useCategories();
  const { showToast } = useToast();

  const validContextCards = contextCards.filter(c => c.cardName !== '현금 지갑' && c.cardCompany !== 'CASH-WALLET');

  const cards: CardInfo[] = validContextCards.map((c, idx) => ({
    id: `card-${c.cardId}`,
    bankName: c.cardCompany,
    cardName: c.cardName,
    cardNumber: c.maskedCardNo,
    validThru: c.validThru || '',
    gradient: CARD_GRADIENTS[idx % CARD_GRADIENTS.length],
    balance: c.balance ?? 0,
    bankType: c.cardCompany,
    monthlyTransactionCount: c.monthlyTransactionCount ?? 0,
    getMonthlyTotalCount: c.getMonthlyTotalCount ?? 0,
    getMonthlyTotalAmount: c.getMonthlyTotalAmount ?? 0,
    cardNickname: c.cardNickname || c.cardName,
    isCash: isCashCard(c.cardId, c.cardCompany),
  }));

  // AI 분류 폴링 대체용 쿨타임 및 상태 관리
  const syncLockRef = useRef<Record<number, number>>({});

  const loadTransactions = useCallback(async (cardId: string) => {
    setTxList([]);        // 이전 카드 데이터 즉시 제거
    setTxLoading(true);
    const numericId = Number(cardId.replace('card-', ''));
    
    // 1. [즉시 응답 UI] 기존 내역을 먼저 표출해서 로딩 스켈레톤을 0.1초 만에 없애버림
    try {

      const res = await getTransactions(numericId);
      setTxList(res.data?.content || []);
    } catch (err) {
      console.error('[첫 거래내역 fetch 실패]', err);
      showToast('거래내역을 불러오지 못했어요');
    } finally {
      setTxLoading(false);
    }

    // 2. [백그라운드 동기화] 현금 카드가 아니면 뒷단에서 POST /sync → jobId 기반 SSE 스트림 구독
    const matchedCard = contextCards.find(c => c.cardId === numericId);
    if (!isCashCard(numericId, matchedCard?.cardCompany)) {
      const now = Date.now();
      const lastSync = syncLockRef.current[numericId] || 0;
      
      // StrictMode 중복렌더링/연타 방지 (5초 쿨타임)
      if (now - lastSync > 5000) {
        syncLockRef.current[numericId] = now;
        
        (async () => {
          try {
            const syncRes = await syncTransactions(numericId);
            const jobId = syncRes.data?.jobId;
            const syncCount = syncRes.data?.syncCount ?? 0;

            // 즉시 최신 내역 반영
            const afterSync = await getTransactions(numericId);
            setTxList(afterSync.data?.content || []);

            // 동기화된 건이 있고 jobId가 있으면 SSE 스트림 구독
            if (syncCount > 0 && jobId) {
              const { fetchEventSource } = await import('@microsoft/fetch-event-source');
              const token = getAccessToken();
              let sseResolved = false;

              const refreshTxList = async () => {
                if (sseResolved) return;
                sseResolved = true;
                try {
                  const freshData = await getTransactions(numericId);
                  setTxList(freshData.data?.content || []);
                } catch (err) {
                  console.error('[SSE-Sync] 갱신 실패:', err);
                }
              };

              const ctrl = new AbortController();

              fetchEventSource(`/api/v1/transactions/sync/${jobId}/stream`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'text/event-stream',
                },
                signal: ctrl.signal,
                onmessage(event) {
                  // 백엔드는 event name으로 상태를 구분함
                  if (event.event === 'connect') return; // 연결 성공 알림 무시

                  // AI 분류 완료 (event name = "AI_SYNC_COMPLETE")
                  if (event.event === 'AI_SYNC_COMPLETE') {
                    console.log('[SSE-Sync] AI 분류 완료 이벤트 수신');
                    ctrl.abort();
                    refreshTxList();
                    return;
                  }
                  // AI 분석 실패 (event name = "AI_SYNC_ERROR")
                  if (event.event === 'AI_SYNC_ERROR') {
                    console.log('[SSE-Sync] AI 분석 실패 이벤트 수신');
                    ctrl.abort();
                    refreshTxList();
                    return;
                  }
                },
                onclose() {
                  // 백엔드가 연결을 닫음 = 완료 신호
                  console.log('[SSE-Sync] 연결 종료 → 거래내역 갱신');
                  refreshTxList();
                },
                onerror() {
                  console.log('[SSE-Sync] 에러 발생 → 거래내역 갱신');
                  ctrl.abort();
                  refreshTxList();
                },
                openWhenHidden: true, // 탭이 백그라운드여도 연결 유지
              });
            }
          } catch (syncErr) {

          }
        })();
      }
    }
  }, [showToast, contextCards]);

  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);
  const [selectedTxItem, setSelectedTxItem] = useState<TransactionListItem | null>(null);
  const [addFormAmount, setAddFormAmount] = useState(0);
  const [detailData, setDetailData] = useState<TransactionDetailData | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const isAddSlot = currentCardIdx >= cards.length;
  const card = isAddSlot ? null : cards[currentCardIdx];

  // Build txByDate for list view
  const txByDate: Record<string, (TransactionListItem & { dateStr: string; timeStr: string })[]> = {};
  for (const tx of txList) {
    const dateStr = tx.transactionDate?.split('T')[0] || '';
    if (!dateStr) continue;
    if (!txByDate[dateStr]) txByDate[dateStr] = [];
    const timeStr = tx.transactionDate?.split('T')[1]?.substring(0, 5) || '';
    txByDate[dateStr].push({ ...tx, dateStr, timeStr });
  }

  const handleTxClick = async (tx: TransactionListItem & { dateStr: string; timeStr: string }) => {
    setSelectedDate(tx.dateStr);
    setSelectedTxId(String(tx.transactionId));
    setSelectedTxItem(tx);
    setAddFormAmount(tx.amount);

    // 먼저 edit 뷰로 즉시 이동, 데이터는 비동기로 로드
    setDetailData(null);
    setView('edit');

    try {
      const res = await getTransactionDetail(tx.transactionId);
      if (res.data && res.data.classifications && res.data.classifications.length > 0) {
        setDetailData(res.data);
      } else {
        setView('add');
      }
    } catch {
      setView('add');
    }
  };

  // 카드 삭제 확인 모달 상태
  const [pendingDeleteIdx, setPendingDeleteIdx] = useState<number | null>(null);

  const handleDeleteCard = (idx: number) => {
    setPendingDeleteIdx(idx);
  };

  const confirmDeleteCard = async () => {
    if (pendingDeleteIdx === null) return;
    const targetCard = cards[pendingDeleteIdx];
    if (!targetCard) return;

    try {
      const numericId = Number(targetCard.id.replace('card-', ''));
      await deleteCard(numericId);
      showToast('카드가 삭제되었습니다');
      await refreshCards();
      if (currentCardIdx >= cards.length - 1) setCurrentCardIdx(Math.max(0, cards.length - 2));
      if (cards.length <= 1) setDeleteMode(false);
    } catch (err) {
      console.error('[카드 삭제 실패]', err);
      showToast('카드 삭제에 실패했어요');
    } finally {
      setPendingDeleteIdx(null);
    }
  };

  const handleAddCard = async (data: { bankName: string; cardName: string; cardNumber: string; validThru: string; cvc: string }) => {
    if (!data.cardNumber.trim() || !data.cvc.trim()) return;
    try {
      const cardNo = data.cardNumber.replace(/\D/g, '');
      const cardNickname = data.cardName || `${data.bankName} 카드`;
      const cardValidityPeriod = data.validThru.replace(/\D/g, '') || '0000';
      await registerCard({ cardNo, cvc: data.cvc, cardNickname, cardValidityPeriod });
      await refreshCards();
      setCurrentCardIdx(cards.length);
      setView('cards');
    } catch (err) {
      console.error('[카드 등록 실패]', err);
      showToast('카드 등록에 실패했어요. 카드 정보를 확인해주세요');
    }
  };

  const buildSaveRequest = (items: { what: string; whom?: number[]; amount: number }[]): TransactionDetailsRequest => {
    const req: TransactionDetailsRequest = {
      classifications: items.map(item => ({
        categoryId: categoryNames.indexOf(item.what) + 1 || 99,
        amount: item.amount,
        memo: '',
        petAllocations: (item.whom && item.whom.length > 0)
          ? item.whom.map((petId, index) => {
            const numPets = item.whom!.length;
            const baseAmount = Math.floor(item.amount / numPets);
            const remainder = item.amount % numPets;
            // 첫 번째 펫에게 나머지 금액을 모두 할당하여 총합을 맞춤
            const allocatedAmount = index === 0 ? baseAmount + remainder : baseAmount;

            return {
              petId,
              allocatedAmount,
            };
          })
          : [],
      })),
    };
    console.log('[buildSaveRequest] pets:', pets.map(p => ({ id: p.id, name: p.name })));
    console.log('[buildSaveRequest] request body:', JSON.stringify(req, null, 2));
    return req;
  };



  // --- View routing ---

  if (cardsLoading) {
    return (
      <div className="max-w-[500px] mx-auto">
        {/* 삭제 버튼 영역 (실제와 동일) */}
        <div className="flex justify-end mb-3">
          <Skeleton width={52} height={30} borderRadius={10} />
        </div>

        {/* 이번달 지출 (실제와 동일: text-center mb-6) */}
        <div className="text-center mb-6">
          <div className="text-[0.8em] text-[var(--color-pet-text-secondary)]">
            <Skeleton width={100} height={14} style={{ margin: '0 auto' }} />
          </div>
          <div className="mt-1">
            <Skeleton width={180} height={36} style={{ margin: '0 auto' }} />
          </div>
        </div>

        {/* 카드 영역 (실제와 동일: 280×400 rounded-[20px]) */}
        <div className="flex justify-center mb-5" style={{ height: 420, position: 'relative' }}>
          <div
            className="w-[280px] h-[400px] rounded-[20px] p-7 box-border flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e0e0e0 0%, #c8c8c8 50%, #b8b8b8 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
            }}
          >
            <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-white/[0.06]" />
            <div>
              <div className="flex justify-between">
                <Skeleton width={80} height={18} />
                <Skeleton width={28} height={28} borderRadius="50%" />
              </div>
              <Skeleton width={40} height={30} borderRadius={6} style={{ marginTop: 16 }} />
            </div>
            <Skeleton width="80%" height={20} />
            <div>
              <Skeleton width="60%" height={14} style={{ marginBottom: 6 }} />
              <div className="flex justify-between mt-1">
                <Skeleton width={'40%'} height={12} />
                <Skeleton width={'30%'} height={14} />
              </div>
            </div>
          </div>
        </div>

        {/* 인디케이터 (실제와 동일: flex gap-1.5) */}
        <div className="flex justify-center items-center gap-4 mb-5">
          <Skeleton width={14} height={14} borderRadius="50%" />
          <div className="flex gap-1.5">
            <div className="h-2 rounded" style={{ width: 20, background: '#d8d8dc' }} />
            <div className="h-2 rounded" style={{ width: 8, background: '#d8d8dc' }} />
          </div>
          <Skeleton width={14} height={14} borderRadius="50%" />
        </div>

        {/* 카드 정보 (실제와 동일: flex gap-2 + rounded-[14px]) */}
        <div className="flex gap-2">
          <div className="flex-1 bg-[var(--color-pet-surface)] rounded-[14px] px-[18px] py-3.5 text-center border border-[var(--color-pet-border)]">
            <Skeleton width={60} height={11} style={{ margin: '0 auto 6px' }} />
            <Skeleton width={40} height={22} style={{ margin: '0 auto' }} />
          </div>
          <div className="flex-1 bg-[var(--color-pet-surface)] rounded-[14px] px-[18px] py-3.5 text-center border border-[var(--color-pet-border)]">
            <Skeleton width={60} height={11} style={{ margin: '0 auto 6px' }} />
            <Skeleton width={50} height={22} style={{ margin: '0 auto' }} />
          </div>
        </div>
      </div>
    );
  }

  if (view === 'cards') {
    return (
      <>
        <CardSwiper
          cards={cards}
          currentCardIdx={currentCardIdx}
          onChangeCard={setCurrentCardIdx}
          deleteMode={deleteMode}
          onToggleDeleteMode={() => setDeleteMode(!deleteMode)}
          onDeleteCard={handleDeleteCard}
          onCardClick={(c) => { setView('list'); loadTransactions(c.id); }}
          onAddCardClick={() => setView('addCard')}
        />
        {pendingDeleteIdx !== null && cards[pendingDeleteIdx] && (
          <ConfirmModal
            title={`'${cards[pendingDeleteIdx].cardNickname || cards[pendingDeleteIdx].cardName}' 카드를 삭제할까요?`}
            subtitle="삭제하면 해당 카드의 거래 내역도 함께 사라집니다."
            actions={[{ label: '삭제', danger: true, onClick: confirmDeleteCard }]}
            onClose={() => setPendingDeleteIdx(null)}
          />
        )}
      </>
    );
  }

  if (view === 'addCard') {
    return (
      <CardRegisterFlow
        gradientIndex={cards.length}
        onRegister={(data) => { handleAddCard(data); }}
        onCancel={() => setView('cards')}
      />
    );
  }

  if (view === 'add') {
    // AI 분류된 거래인 경우 초기값 세팅 (categoryName, amount)
    const aiInitialItems = selectedTxItem?.categoryName
      ? [{ id: 'ai-0', what: selectedTxItem.categoryName, whom: [] as number[], amount: 0 }]
      : undefined;

    return (
      <div className="max-w-[500px] mx-auto">
        <TransactionAddForm
          dateString={selectedDate || new Date().toISOString().slice(0, 10)}
          categoryOptions={categoryNames}
          petList={pets.map(p => ({ id: p.id, name: p.name }))}
          initialAmount={selectedTxItem?.amount ?? 0}
          initialItems={aiInitialItems}
          maxAmount={addFormAmount}
          merchantName={selectedTxItem?.merchantName}
          onSave={async (data) => {
            if (selectedTxId) {
              try {
                await saveTransactionDetails(Number(selectedTxId), buildSaveRequest(data.items || []));
              } catch (err: any) {
                console.error('[분류 저장 실패]', err);
                showToast(err?.status === 403 ? '해당 거래에 대한 권한이 없습니다' : '분류 저장에 실패했어요');
              }
            }
            setSelectedTxId(null); setSelectedTxItem(null);
            if (card) loadTransactions(card.id);
            setView('list');
          }}
          onCancel={() => { setSelectedTxId(null); setSelectedTxItem(null); setView('list'); }}
        />
      </div>
    );
  }

  if (view === 'edit') {
    // detailData 로딩 중이면 폼 마운트를 지연 (initialItems가 useState 초기값으로만 사용되므로)
    if (!detailData) {
      return (
        <div className="max-w-[500px] mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <Skeleton width={200} height={24} style={{ marginBottom: 12 }} />
            <Skeleton width={140} height={16} />
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-[500px] mx-auto">
        <TransactionAddForm
          dateString={selectedDate || new Date().toISOString().slice(0, 10)}
          categoryOptions={categoryNames}
          petList={pets.map(p => ({ id: p.id, name: p.name }))}
          initialAmount={selectedTxItem?.amount ?? 0}
          maxAmount={selectedTxItem?.amount ?? 0}
          merchantName={selectedTxItem?.merchantName}
          initialItems={
            detailData.classifications.length > 0
              ? detailData.classifications.map((cls, i) => ({
                id: `edit-${i}`,
                what: cls.categoryName,
                whom: cls.petAllocations.map(p => p.petId),
                amount: cls.amount,
              }))
              : undefined
          }
          onSave={async (data) => {
            if (selectedTxId) {
              try {
                await updateTransactionDetails(Number(selectedTxId), buildSaveRequest(data.items || []));
              } catch (err: any) {
                console.error('[분류 수정 실패]', err);
                showToast('분류 저장에 실패했어요');
              }
            }
            setSelectedTxId(null); setSelectedTxItem(null); setDetailData(null);
            if (card) loadTransactions(card.id);
            setView('list');
          }}
          onCancel={() => { setSelectedTxId(null); setSelectedTxItem(null); setDetailData(null); setView('list'); }}
        />
      </div>
    );
  }

  if (!card) return null;

  return (
    <AccountTransactionList
      card={card}
      txByDate={txByDate}
      petNames={petNames}
      isLoading={txLoading}
      onBack={() => setView('cards')}
      onTxClick={handleTxClick}
      onRefresh={() => loadTransactions(card.id)}
    />
  );
}
