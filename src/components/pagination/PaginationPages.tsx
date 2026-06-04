import Button from '@/components/ui/Button';

interface PaginationPagesProps {
  pages: number[];
  windowEnd: number;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export default function PaginationPages({
  pages,
  windowEnd,
  currentPage,
  totalPages,
  goToPage,
}: PaginationPagesProps) {
  return (
    <>
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'secondary'}
          onClick={() => goToPage(page)}
          className="text-xs px-3 py-2"
        >
          {page}
        </Button>
      ))}

      {windowEnd < totalPages && (
        <>
          {windowEnd < totalPages - 1 && <span className="text-gray-400 text-xs px-1">…</span>}
          <Button variant="secondary" onClick={() => goToPage(totalPages)} className="text-xs px-3 py-2">
            {totalPages}
          </Button>
        </>
      )}
    </>
  );
}
