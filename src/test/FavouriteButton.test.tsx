import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavouriteButton from '@/features/movie/components/FavouriteButton';
import { useFavouritesStore } from '@/features/favourites/store/favouritesStore';
import { Movie } from '@/types/movie';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

const movie: Movie = {
  id: 10,
  title: 'Gladiator',
  overview: '',
  poster_path: '/glad.jpg',
  backdrop_path: null,
  release_date: '2000-05-05',
  vote_average: 8.5,
  vote_count: 10000,
};

beforeEach(() => {
  useFavouritesStore.setState({ favourites: [] });
});

describe('FavouriteButton', () => {
  it('renders "Add to Favourites" when not favourited', () => {
    render(<FavouriteButton movie={movie} />);
    expect(screen.getByText('Add to Favourites')).toBeInTheDocument();
  });

  it('renders "Remove from Favourites" when already favourited', () => {
    useFavouritesStore.setState({ favourites: [movie] });
    render(<FavouriteButton movie={movie} />);
    expect(screen.getByText('Remove from Favourites')).toBeInTheDocument();
  });

  it('adds movie to favourites on click', () => {
    render(<FavouriteButton movie={movie} />);
    fireEvent.click(screen.getByRole('button'));
    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
  });

  it('removes movie from favourites on second click', () => {
    useFavouritesStore.setState({ favourites: [movie] });
    render(<FavouriteButton movie={movie} />);
    fireEvent.click(screen.getByRole('button'));
    expect(useFavouritesStore.getState().favourites).toHaveLength(0);
  });
});
