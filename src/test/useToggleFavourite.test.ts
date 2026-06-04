import { renderHook, act } from '@testing-library/react';
import { useToggleFavourite } from '@/features/favourites/hooks/useToggleFavourite';
import { useFavouritesStore } from '@/features/favourites/store/favouritesStore';
import { Movie } from '@/types/movie';

const movie: Movie = {
  id: 5,
  title: 'Parasite',
  overview: '',
  poster_path: '/parasite.jpg',
  backdrop_path: null,
  release_date: '2019-05-30',
  vote_average: 8.5,
  vote_count: 10000,
};

beforeEach(() => {
  useFavouritesStore.setState({ favourites: [] });
});

describe('useToggleFavourite', () => {
  it('returns favourited=false when movie is not in store', () => {
    const { result } = renderHook(() => useToggleFavourite(movie));
    expect(result.current.favourited).toBe(false);
  });

  it('returns favourited=true when movie is already in store', async () => {
    useFavouritesStore.setState({ favourites: [movie] });
    const { result } = renderHook(() => useToggleFavourite(movie));
    await act(async () => {});
    expect(result.current.favourited).toBe(true);
  });

  it('adds movie to store when toggle is called and not favourited', () => {
    const { result } = renderHook(() => useToggleFavourite(movie));
    act(() => {
      result.current.toggle();
    });
    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
  });

  it('removes movie from store when toggle is called and already favourited', () => {
    useFavouritesStore.setState({ favourites: [movie] });
    const { result } = renderHook(() => useToggleFavourite(movie));
    act(() => {
      result.current.toggle();
    });
    expect(useFavouritesStore.getState().favourites).toHaveLength(0);
  });
});
