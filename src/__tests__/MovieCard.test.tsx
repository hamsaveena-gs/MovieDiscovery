import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '@/components/movie-card/MovieCard';
import { useFavouritesStore } from '@/features/favourites/store/favouritesStore';
import { Movie } from '@/types/movie';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

const mockMovie: Movie = {
  id: 42,
  title: 'Inception',
  overview: 'A dream within a dream',
  poster_path: '/inception.jpg',
  backdrop_path: null,
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 30000,
  genre_ids: [28, 878],
};

beforeEach(() => {
  useFavouritesStore.setState({ favourites: [] });
});

describe('MovieCard', () => {
  it('renders movie title and rating', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  it('renders release year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2010')).toBeInTheDocument();
  });

  it('links to the correct movie detail page', () => {
    render(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movies/42');
  });

  it('toggles favourite on heart button click', () => {
    render(<MovieCard movie={mockMovie} />);
    const button = screen.getByRole('button', { name: 'favourite' });
    fireEvent.click(button);
    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
    fireEvent.click(button);
    expect(useFavouritesStore.getState().favourites).toHaveLength(0);
  });

  it('shows no-poster fallback when poster_path is null', () => {
    render(<MovieCard movie={{ ...mockMovie, poster_path: null }} />);
    expect(screen.getByText('No Poster')).toBeInTheDocument();
  });
});
