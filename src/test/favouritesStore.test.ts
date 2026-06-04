import { useFavouritesStore } from '@/features/favourites/store/favouritesStore';
import { Movie } from '@/types/movie';

const movie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Overview',
  poster_path: '/test.jpg',
  backdrop_path: null,
  release_date: '2023-01-01',
  vote_average: 7.0,
  vote_count: 500,
};

beforeEach(() => {
  useFavouritesStore.setState({ favourites: [] });
});

describe('favouritesStore', () => {
  it('starts with empty favourites', () => {
    expect(useFavouritesStore.getState().favourites).toEqual([]);
  });

  it('addFavourite adds a movie', () => {
    useFavouritesStore.getState().addFavourite(movie);
    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
    expect(useFavouritesStore.getState().favourites[0].id).toBe(1);
  });

  it('addFavourite does not remove existing movies', () => {
    const movie2: Movie = { ...movie, id: 2, title: 'Movie 2' };
    useFavouritesStore.getState().addFavourite(movie);
    useFavouritesStore.getState().addFavourite(movie2);
    expect(useFavouritesStore.getState().favourites).toHaveLength(2);
  });

  it('removeFavourite removes the correct movie by id', () => {
    const movie2: Movie = { ...movie, id: 2, title: 'Movie 2' };
    useFavouritesStore.setState({ favourites: [movie, movie2] });
    useFavouritesStore.getState().removeFavourite(1);
    const ids = useFavouritesStore.getState().favourites.map((m) => m.id);
    expect(ids).not.toContain(1);
    expect(ids).toContain(2);
  });

  it('removeFavourite does nothing when id not found', () => {
    useFavouritesStore.setState({ favourites: [movie] });
    useFavouritesStore.getState().removeFavourite(999);
    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
  });

  it('isFavourite returns true for existing movie', () => {
    useFavouritesStore.setState({ favourites: [movie] });
    expect(useFavouritesStore.getState().isFavourite(1)).toBe(true);
  });

  it('isFavourite returns false for non-existing movie', () => {
    expect(useFavouritesStore.getState().isFavourite(99)).toBe(false);
  });
});
