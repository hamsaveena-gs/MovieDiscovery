import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieGrid from '@/components/ui/MovieGrid';
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

const movies: Movie[] = [
  { id: 1, title: 'Movie A', overview: '', poster_path: null, backdrop_path: null, release_date: '2023-01-01', vote_average: 7.0, vote_count: 100 },
  { id: 2, title: 'Movie B', overview: '', poster_path: null, backdrop_path: null, release_date: '2023-06-01', vote_average: 8.0, vote_count: 200 },
];

describe('MovieGrid', () => {
  it('renders all movie cards', () => {
    render(<MovieGrid movies={movies} />);
    expect(screen.getByText('Movie A')).toBeInTheDocument();
    expect(screen.getByText('Movie B')).toBeInTheDocument();
  });

  it('renders empty grid when no movies', () => {
    const { container } = render(<MovieGrid movies={[]} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(0);
  });

  it('renders correct number of movie cards', () => {
    render(<MovieGrid movies={movies} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(movies.length);
  });
});
