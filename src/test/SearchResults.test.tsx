import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from '@/features/search/components/SearchResults';
import { Movie } from '@/types/movie';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/search',
  useSearchParams: () => new URLSearchParams('q=batman'),
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
  { id: 1, title: 'Batman Begins', overview: '', poster_path: null, backdrop_path: null, release_date: '2005-06-15', vote_average: 8.2, vote_count: 1000 },
  { id: 2, title: 'The Dark Knight', overview: '', poster_path: null, backdrop_path: null, release_date: '2008-07-18', vote_average: 9.0, vote_count: 2000 },
];

describe('SearchResults', () => {
  it('renders result count', () => {
    render(<SearchResults movies={movies} query="batman" currentPage={1} totalPages={1} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders the query in the result summary', () => {
    render(<SearchResults movies={movies} query="batman" currentPage={1} totalPages={1} />);
    const summary = screen.getByText(/results for/i);
    expect(summary).toHaveTextContent('batman');
  });

  it('renders all movie titles', () => {
    render(<SearchResults movies={movies} query="batman" currentPage={1} totalPages={1} />);
    expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });

  it('does not render pagination when totalPages is 1', () => {
    render(<SearchResults movies={movies} query="batman" currentPage={1} totalPages={1} />);
    expect(screen.queryByRole('button', { name: /prev/i })).not.toBeInTheDocument();
  });

  it('renders pagination when totalPages > 1', () => {
    render(<SearchResults movies={movies} query="batman" currentPage={1} totalPages={5} />);
    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
  });
});
