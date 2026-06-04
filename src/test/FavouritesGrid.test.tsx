import React from 'react';
import { render, screen } from '@testing-library/react';
import FavouritesGrid from '@/features/favourites/components/FavouritesGrid';
import { Movie } from '@/types/movie';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/favourites',
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

const movies: Movie[] = [
  { id: 1, title: 'Movie One', overview: '', poster_path: null, backdrop_path: null, release_date: '2020-01-01', vote_average: 7.0, vote_count: 100 },
  { id: 2, title: 'Movie Two', overview: '', poster_path: null, backdrop_path: null, release_date: '2021-01-01', vote_average: 8.0, vote_count: 200 },
];

describe('FavouritesGrid', () => {
  it('renders singular saved movie label for one movie', () => {
    render(<FavouritesGrid movies={[movies[0]]} />);
    expect(screen.getByText('1 saved movie')).toBeInTheDocument();
  });

  it('renders plural saved movies label for multiple movies', () => {
    render(<FavouritesGrid movies={movies} />);
    expect(screen.getByText('2 saved movies')).toBeInTheDocument();
  });

  it('renders all movie titles', () => {
    render(<FavouritesGrid movies={movies} />);
    expect(screen.getByText('Movie One')).toBeInTheDocument();
    expect(screen.getByText('Movie Two')).toBeInTheDocument();
  });
});
