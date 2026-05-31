'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
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
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return { pages: arr, start, end };
  };

  const { pages: mobilePages, start: mobileStart, end: mobileEnd } = getPages(1);
  const { pages: desktopPages, start: desktopStart, end: desktopEnd } = getPages(2);

  if (totalPages <= 1) return null;

  const btnBase = 'btn btn-secondary text-xs';
  const btnSm = 'px-2 py-1 sm:px-3 sm:py-2';
  const btnActive = 'btn btn-primary text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2';

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-10 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} px-2 py-1 sm:px-4 sm:py-2 disabled:opacity-40`}
      >
        Prev
      </button>

      <div className="flex items-center gap-1 sm:hidden">
        {mobileStart > 1 && (
          <>
            <button onClick={() => goToPage(1)} className={`${btnBase} ${btnSm}`}>1</button>
            {mobileStart > 2 && <span className="text-gray-400 text-xs">…</span>}
          </>
        )}
        {mobilePages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={page === currentPage ? btnActive : `${btnBase} ${btnSm}`}
          >
            {page}
          </button>
        ))}
        {mobileEnd < totalPages && (
          <>
            {mobileEnd < totalPages - 1 && <span className="text-gray-400 text-xs">…</span>}
            <button onClick={() => goToPage(totalPages)} className={`${btnBase} ${btnSm}`}>{totalPages}</button>
          </>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-2">
        {desktopStart > 1 && (
          <>
            <button onClick={() => goToPage(1)} className={`${btnBase} px-3 py-2`}>1</button>
            {desktopStart > 2 && <span className="text-gray-400">...</span>}
          </>
        )}
        {desktopPages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={page === currentPage ? btnActive : `${btnBase} px-3 py-2`}
          >
            {page}
          </button>
        ))}
        {desktopEnd < totalPages && (
          <>
            {desktopEnd < totalPages - 1 && <span className="text-gray-400">...</span>}
            <button onClick={() => goToPage(totalPages)} className={`${btnBase} px-3 py-2`}>{totalPages}</button>
          </>
        )}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} px-2 py-1 sm:px-4 sm:py-2 disabled:opacity-40`}
      >
        Next
      </button>
    </div>
  );
}
