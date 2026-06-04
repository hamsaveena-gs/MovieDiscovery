import { renderHook, act } from '@testing-library/react';
import { usePagination } from '@/hooks/usePagination';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/movies',
  useSearchParams: () => new URLSearchParams('genre=28'),
}));

beforeEach(() => mockPush.mockClear());

describe('usePagination', () => {
  it('getPages returns forward window starting at currentPage', () => {
    const { result } = renderHook(() => usePagination(5, 10));
    const { pages } = result.current.getPages();
    expect(pages).toEqual([5, 6, 7]);
  });

  it('getPages clamps end at totalPages', () => {
    const { result } = renderHook(() => usePagination(10, 10));
    const { pages, end } = result.current.getPages();
    expect(end).toBe(10);
    expect(pages).toEqual([10]);
  });

  it('getPages returns 3 pages when room available', () => {
    const { result } = renderHook(() => usePagination(1, 500));
    const { pages } = result.current.getPages();
    expect(pages).toEqual([1, 2, 3]);
  });

  it('goToPage pushes correct URL preserving existing params', () => {
    const { result } = renderHook(() => usePagination(3, 10));
    act(() => {
      result.current.goToPage(7);
    });
    expect(mockPush).toHaveBeenCalledWith('/movies?genre=28&page=7');
  });

  it('goToPage overwrites existing page param', () => {
    const { result } = renderHook(() => usePagination(3, 10));
    act(() => {
      result.current.goToPage(2);
    });
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });
});
