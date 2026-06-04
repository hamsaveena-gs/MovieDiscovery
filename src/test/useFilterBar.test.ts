import { renderHook, act } from '@testing-library/react';
import { useFilterBar } from '@/features/home/hooks/useFilterBar';

const mockPush = jest.fn();
let mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
  useSearchParams: () => mockSearchParams,
}));

beforeEach(() => {
  mockPush.mockClear();
  mockSearchParams = new URLSearchParams();
});

describe('useFilterBar', () => {
  it('returns empty strings when no search params set', () => {
    const { result } = renderHook(() => useFilterBar());
    expect(result.current.currentGenre).toBe('');
    expect(result.current.currentYear).toBe('');
    expect(result.current.currentRating).toBe('');
    expect(result.current.currentSort).toBe('');
  });

  it('reads existing search params correctly', () => {
    mockSearchParams = new URLSearchParams('genre=28&year=2022&rating=7&sort=popularity.desc');
    const { result } = renderHook(() => useFilterBar());
    expect(result.current.currentGenre).toBe('28');
    expect(result.current.currentYear).toBe('2022');
    expect(result.current.currentRating).toBe('7');
    expect(result.current.currentSort).toBe('popularity.desc');
  });

  it('activeFilterCount is 0 when no filters set', () => {
    const { result } = renderHook(() => useFilterBar());
    expect(result.current.activeFilterCount).toBe(0);
  });

  it('activeFilterCount reflects number of active filters', () => {
    mockSearchParams = new URLSearchParams('genre=28&year=2022');
    const { result } = renderHook(() => useFilterBar());
    expect(result.current.activeFilterCount).toBe(2);
  });

  it('applyFilter sets a filter param and removes page param', () => {
    mockSearchParams = new URLSearchParams('page=3');
    const { result } = renderHook(() => useFilterBar());
    act(() => {
      result.current.applyFilter('genre', '28');
    });
    expect(mockPush).toHaveBeenCalledWith('/?genre=28');
  });

  it('applyFilter with empty value deletes the param', () => {
    mockSearchParams = new URLSearchParams('genre=28');
    const { result } = renderHook(() => useFilterBar());
    act(() => {
      result.current.applyFilter('genre', '');
    });
    // URLSearchParams.toString() with no entries still produces '?' in some environments
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/\??$/));
  });

  it('clearFilters pushes to pathname with no params', () => {
    mockSearchParams = new URLSearchParams('genre=28&year=2022');
    const { result } = renderHook(() => useFilterBar());
    act(() => {
      result.current.clearFilters();
    });
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
