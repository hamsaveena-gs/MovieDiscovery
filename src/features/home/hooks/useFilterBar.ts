'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get('genre') || '';
  const currentYear = searchParams.get('year') || '';
  const currentRating = searchParams.get('rating') || '';
  const currentSort = searchParams.get('sort') || '';

  const activeFilterCount = useMemo(() => {
    return [currentGenre, currentYear, currentRating, currentSort].filter(Boolean).length;
  }, [currentGenre, currentYear, currentRating, currentSort]);

  const applyFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return {
    currentGenre,
    currentYear,
    currentRating,
    currentSort,
    activeFilterCount,
    applyFilter,
    clearFilters,
  };
}
