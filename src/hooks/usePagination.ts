'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function usePagination(currentPage: number, totalPages: number) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPages = (delta: number) => {
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return { pages, start, end };
  };

  return { goToPage, getPages };
}
