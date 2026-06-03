import { renderHook, act } from '@testing-library/react';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { useFavouritesStore } from '@/features/favourites/store/favouritesStore';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'A test movie',
  poster_path: '/test.jpg',
  backdrop_path: null,
  release_date: '2024-01-01',
  vote_average: 7.5,
  vote_count: 100,
  genre_ids: [28],
  adult: false,
  original_language: 'en',
  original_title: 'Test Movie',
  popularity: 100,
  video: false,
};

beforeEach(() => {
  useFavouritesStore.setState({ favourites: [] });
});

describe('useFavourites', () => {
  it('returns empty favourites before hydration', () => {
    const { result } = renderHook(() => useFavourites());
    expect(result.current.favourites).toEqual([]);
  });

  it('adds a movie to favourites', () => {
    const { result } = renderHook(() => useFavourites());
    act(() => {
      result.current.addFavourite(mockMovie);
    });
    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
    expect(useFavouritesStore.getState().favourites[0].id).toBe(1);
  });

  it('removes a movie from favourites', () => {
    useFavouritesStore.setState({ favourites: [mockMovie] });
    const { result } = renderHook(() => useFavourites());
    act(() => {
      result.current.removeFavourite(1);
    });
    expect(useFavouritesStore.getState().favourites).toHaveLength(0);
  });

  it('reports isFavourite correctly after hydration', async () => {
    useFavouritesStore.setState({ favourites: [mockMovie] });
    const { result } = renderHook(() => useFavourites());
    await act(async () => {});
    expect(result.current.isFavourite(1)).toBe(true);
    expect(result.current.isFavourite(99)).toBe(false);
  });
});
