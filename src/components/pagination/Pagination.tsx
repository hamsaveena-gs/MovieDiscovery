'use client';

import Button from '@/components/ui/Button';
import { usePagination } from '@/hooks/usePagination';
import PaginationPages from '@/components/pagination/PaginationPages';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const { goToPage, getPages } = usePagination(currentPage, totalPages);
  const { pages, end } = getPages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-10 flex-wrap">
      <Button
        variant="secondary"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-xs px-3 py-2 disabled:opacity-40"
      >
        ‹ Prev
      </Button>

      <div className="flex items-center gap-1 sm:gap-2">
        <PaginationPages
          pages={pages}
          windowEnd={end}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>

      <Button
        variant="secondary"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-xs px-3 py-2 disabled:opacity-40"
      >
        Next ›
      </Button>
    </div>
  );
}
