import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Effect } from 'effect';
import { useConsumables, useConsumableDetail, useInvalidateConsumables } from '@/features/supplies/api/queries';
import { getConsumableDetail } from '@/features/supplies/api/getConsumableDetailApi';
import { deleteConsumableEffect } from '@/features/supplies/api/deleteConsumable.effect';
import type { HttpError } from '@/api/effect/errors';
import { useEffectMutation } from '@/shared/hooks/useEffectMutation';
import type { ConsumableItem, ConsumableDetailData } from '@/features/supplies/types/consumable';
import { usePets } from '@/features/pet';
import { dday } from '@/features/supplies/utils/supplyUtils';
import { queryKeys } from '@/shared/hooks/queryKeys';

export function useSuppliesPage(initialItems: ConsumableItem[] | null) {
  const { pets: globalPets, stickerImages, mainPetId } = usePets();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [detailCache, setDetailCache] = useState<Record<number, ConsumableDetailData>>({});
  
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<ConsumableDetailData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ConsumableItem | null>(null);
  const [effectError, setEffectError] = useState<HttpError | null>(null);

  const {
    data: items = [],
    isLoading: loading,
    refetch: refetchItems,
  } = useConsumables(initialItems);

  const { invalidateList, invalidateDetail, invalidateAll } = useInvalidateConsumables();

  const { mutate: deleteEffect, error: deleteError } = useEffectMutation(
    (id: number) => deleteConsumableEffect(id)
  );

  const allStickers = useMemo(() => {
    if (mainPetId && stickerImages[mainPetId]) return stickerImages[mainPetId].map(s => s.imageUrl);
    if (globalPets.length > 0 && stickerImages[globalPets[0].id]) return stickerImages[globalPets[0].id].map(s => s.imageUrl);
    return Object.values(stickerImages).flat().map(s => s.imageUrl);
  }, [stickerImages, mainPetId, globalPets]);

  const queryClient = useQueryClient();

  const prefetchedRef = useRef<Set<number>>(new Set());
  useEffect(() => {
    if (items.length === 0) return;
    items.forEach(async (item: ConsumableItem) => {
      if (detailCache[item.id] || prefetchedRef.current.has(item.id)) return;
      prefetchedRef.current.add(item.id);
      try {
        const res = await getConsumableDetail(item.id);
        if (res.data) setDetailCache(prev => ({ ...prev, [item.id]: res.data }));
      } catch {
      }
    });
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = useCallback(async () => {
    setEffectError(null);
    prefetchedRef.current.clear();
    await invalidateAll();
  }, [invalidateAll]);

  const toggleExpand = async (id: number) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    if (!detailCache[id]) {
      try {
        const res = await getConsumableDetail(id);
        if (res.data) setDetailCache(prev => ({ ...prev, [id]: res.data }));
      } catch (e) {
        console.error(`Failed to load detail for item ${id}`, e);
      }
    }
  };

  const handleEdit = async (item: ConsumableItem) => {
    try {
      const res = await getConsumableDetail(item.id);
      setEditData(res.data);
      setShowForm(true);
    } catch { 
      setEditData(null); 
      setShowForm(true); 
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteEffect(deleteTarget.id);
    if (deleteError) setEffectError(deleteError);
    setDeleteTarget(null);
    await invalidateList();
  };

  const soonItems = useMemo(() => {
    return items.filter((i: ConsumableItem) => dday(i.nextPurchaseDate) <= 7).sort((a: ConsumableItem, b: ConsumableItem) => dday(a.nextPurchaseDate)-dday(b.nextPurchaseDate));
  }, [items]);

  return {
    items, globalPets, stickerImages, allStickers, soonItems,
    loading, expanded, detailCache,
    showForm, editData, deleteTarget, effectError,
    setShowForm, setEditData, setDeleteTarget, setEffectError,
    load, toggleExpand, handleEdit, handleDelete
  };
}
