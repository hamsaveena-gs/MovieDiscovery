import { renderHook, act } from '@testing-library/react';
import { useMovieCard } from '@/hooks/useMovieCard';
import { useFavouritesStore } from '@/features/favourites/store/favouritesStore';
import { Movie } from '@/types/movie';

const movie: Movie = {
  id: 7,
  title: 'Arrival',
  overview: '',
  poster_path: '/arrival.jpg',
  backdrop_path: null,
  release_date: '2016-11-11',
  vote_average: 7.9,
  vote_count: 8000,
};

beforeEach(() => {
  useFavouritesStore.setState({ favourites: [] });
});

describe('useMovieCard', () => {
  it('returns favourited=false initially', () => {
    const { result } = renderHook(() => useMovieCard(movie));
    expect(result.current.favourited).toBe(false);
  });

  it('toggles to favourited=true after handleFavourite', () => {
    const { result } = renderHook(() => useMovieCard(movie));
    act(() => {
      result.current.handleFavourite({ preventDefault: jest.fn() } as unknown as React.MouseEvent);
    });
    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
  });

  it('calls preventDefault to stop link navigation', () => {
    const { result } = renderHook(() => useMovieCard(movie));
    const preventDefault = jest.fn();
    act(() => {
      result.current.handleFavourite({ preventDefault } as unknown as React.MouseEvent);
    });
    expect(preventDefault).toHaveBeenCalled();
  });

  it('toggles favourite off on second call', () => {
    useFavouritesStore.setState({ favourites: [movie] });
    const { result } = renderHook(() => useMovieCard(movie));
    act(() => {
      result.current.handleFavourite({ preventDefault: jest.fn() } as unknown as React.MouseEvent);
    });
    expect(useFavouritesStore.getState().favourites).toHaveLength(0);
  });
});
