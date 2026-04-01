import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { getCategories } from '@/features/transaction/api/getCategoriesApi';
import type { CategoryItem } from '@/features/transaction/types/category';

const NO_FETCH_PAGES = ['/', '/login', '/register', '/onboarding', '/onboarding/step1', '/onboarding/step2'];

interface CategoryContextValue {
  categories: CategoryItem[];
  /** categoryName 목록 (ex: ['사료','간식',...]) */
  categoryNames: string[];
  /** categoryId → categoryName 맵 */
  categoryMap: Record<number, string>;
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextValue>({
  categories: [],
  categoryNames: [],
  categoryMap: {},
  loading: true,
});

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  // 유효 페이지 진입 시 1회만 호출 (NO_FETCH_PAGES에서는 스킵)
  useEffect(() => {
    if (NO_FETCH_PAGES.includes(router.pathname)) {
      setLoading(false);
      return;
    }
    if (hasFetched.current) return;
    hasFetched.current = true;
    const load = async () => {
      try {
        const res = await getCategories();
        if (res.data) setCategories(res.data);
      } catch (e) {
        console.error('카테고리 로딩 실패:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const categoryNames = useMemo(() => categories.map(c => c.categoryName), [categories]);
  const categoryMap = useMemo(() => categories.reduce<Record<number, string>>((acc, c) => {
    acc[c.categoryId] = c.categoryName;
    return acc;
  }, {}), [categories]);

  return (
    <CategoryContext.Provider value={{ categories, categoryNames, categoryMap, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
