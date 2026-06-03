import Button from '@/components/ui/Button';

interface PaginationPagesProps {
  pages: number[];
  rangeStart: number;
  rangeEnd: number;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  size: 'sm' | 'md';
}

export default function PaginationPages({
  pages,
  rangeStart,
  rangeEnd,
  currentPage,
  totalPages,
  goToPage,
  size,
}: PaginationPagesProps) {
  const btnSize = size === 'sm' ? 'text-xs px-2 py-1' : 'text-xs px-3 py-2';
  const activeSize = size === 'sm' ? 'text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2' : 'text-xs sm:text-sm px-3 py-2';

  return (
    <>
      {rangeStart > 1 && (
        <>
          <Button variant="secondary" onClick={() => goToPage(1)} className={btnSize}>1</Button>
          {rangeStart > 2 && <span className="text-gray-400 text-xs">…</span>}
        </>
      )}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'secondary'}
          onClick={() => goToPage(page)}
          className={page === currentPage ? activeSize : btnSize}
        >
          {page}
        </Button>
      ))}
      {rangeEnd < totalPages && (
        <>
          {rangeEnd < totalPages - 1 && <span className="text-gray-400 text-xs">…</span>}
          <Button variant="secondary" onClick={() => goToPage(totalPages)} className={btnSize}>{totalPages}</Button>
        </>
      )}
    </>
  );
}
