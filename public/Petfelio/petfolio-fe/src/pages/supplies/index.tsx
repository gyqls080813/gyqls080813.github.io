import React from 'react';
import type { GetServerSideProps } from 'next';
import { AnimatePresence } from 'framer-motion';

import { useSuppliesPage } from '@/features/supplies/hooks/useSuppliesPage';
import { SupplyBanner } from '@/features/supplies/components/SupplyBanner';
import { SupplyList } from '@/features/supplies/components/SupplyList';
import { DeleteConfirm } from '@/features/supplies/components/DeleteConfirm';
import { SupplyWizard } from '@/features/supplies/components/SupplyWizard';
import { SuppliesSkeleton } from '@/features/supplies/components/SuppliesSkeleton';

import { EffectErrorBanner } from '@/shared/components/common/EffectErrorBanner';
import type { ConsumableItem } from '@/features/supplies/types/consumable';

interface SuppliesPageProps {
  initialItems: ConsumableItem[] | null;
}

export const getServerSideProps: GetServerSideProps<SuppliesPageProps> = async () => {
  const base = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
  let initialItems: ConsumableItem[] | null = null;
  try {
    const cRes = await fetch(`${base}/api/v1/consumables`);
    const cJson = await cRes.json();
    initialItems = cJson.data ?? null;
  } catch (e) {
    console.error('[SSR] 소모품 데이터 로딩 실패:', e);
  }
  return { props: { initialItems } };
};

export default function SuppliesPage({ initialItems }: SuppliesPageProps) {
  const {
    items, globalPets, stickerImages, allStickers, soonItems,
    loading, expanded, detailCache,
    showForm, editData, deleteTarget, effectError,
    setShowForm, setEditData, setDeleteTarget, setEffectError,
    load, toggleExpand, handleEdit, handleDelete
  } = useSuppliesPage(initialItems);

  if (showForm) {
    return (
      <SupplyWizard
        mode={editData ? 'edit' : 'create'}
        initial={editData ?? undefined}
        pets={globalPets}
        onClose={() => { setShowForm(false); setEditData(null); }}
        onSave={() => { setShowForm(false); setEditData(null); load(); }}
      />
    );
  }

  if (loading && items.length === 0) {
    return <SuppliesSkeleton />;
  }

  return (
    <div className="max-w-[500px] mx-auto min-h-screen pb-24" style={{ background: 'transparent' }}>
      <div className="pt-2">
        <EffectErrorBanner
          error={effectError}
          onRetry={load}
          onDismiss={() => setEffectError(null)}
        />
      </div>

      <SupplyBanner 
        soonItems={soonItems} 
        itemsCount={items.length}
        allStickers={allStickers}
        globalPets={globalPets}
        detailCache={detailCache}
        stickerImages={stickerImages}
        setExpanded={toggleExpand}
      />

      <SupplyList 
        items={items}
        loading={loading}
        expanded={expanded}
        detailCache={detailCache}
        globalPets={globalPets}
        stickerImages={stickerImages}
        toggleExpand={toggleExpand}
        handleEdit={handleEdit}
        setDeleteTarget={setDeleteTarget}
      />

      <button
        onClick={() => { setEditData(null); setShowForm(true); }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full bg-[#3182f6] text-white font-bold text-[15px] border-none cursor-pointer shadow-lg hover:bg-[#1b6de8] transition-colors"
        style={{ boxShadow: '0 4px 20px rgba(49,130,246,0.35)' }}>
        + 등록하기
      </button>

      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirm
            name={deleteTarget.name}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
