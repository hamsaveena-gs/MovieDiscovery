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
  it('getPages returns correct page range centered on currentPage', () => {
    const { result } = renderHook(() => usePagination(5, 10));
    const { pages } = result.current.getPages(2);
    expect(pages).toEqual([3, 4, 5, 6, 7]);
  });

  it('getPages clamps start at 1', () => {
    const { result } = renderHook(() => usePagination(1, 10));
    const { pages, start } = result.current.getPages(2);
    expect(start).toBe(1);
    expect(pages[0]).toBe(1);
  });

  it('getPages clamps end at totalPages', () => {
    const { result } = renderHook(() => usePagination(10, 10));
    const { pages, end } = result.current.getPages(2);
    expect(end).toBe(10);
    expect(pages[pages.length - 1]).toBe(10);
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
