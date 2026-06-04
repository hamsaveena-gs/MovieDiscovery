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

  const getPages = () => {
    const end = Math.min(totalPages, currentPage + 2);
    const pages = [];
    for (let i = currentPage; i <= end; i++) pages.push(i);
    return { pages, end };
  };

  return { goToPage, getPages };
}
