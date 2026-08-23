import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/hooks/queryKeys';
import { dynamicQueryOptions, staticQueryOptions } from '@/shared/hooks/queryConfig';
import { getConsumables } from './getConsumablesApi';
import { getConsumableDetail } from './getConsumableDetailApi';
import type { ConsumableItem, ConsumableDetailData } from '../types/consumable';

export function useConsumables(initialData?: ConsumableItem[] | null) {
  return useQuery({
    queryKey: queryKeys.consumables.list(),
    queryFn: async () => {
      const res = await getConsumables();
      return res.data || [];
    },
    ...dynamicQueryOptions,
    ...(initialData ? { initialData } : {}),
  });
}

export function useConsumableDetail(id: number | null) {
  return useQuery({
    queryKey: queryKeys.consumables.detail(id || 0),
    queryFn: async () => {
      if (!id) return null;
      const res = await getConsumableDetail(id);
      return res.data || null;
    },
    enabled: !!id,
    ...staticQueryOptions,
  });
}

export function useInvalidateConsumables() {
  const queryClient = useQueryClient();
  return {
    invalidateList: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.consumables.list() }),
    invalidateDetail: (id: number) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.consumables.detail(id) }),
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.consumables.all }),
  };
}
