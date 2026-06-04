import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCardInfo from '@/components/movie-card/MovieCardInfo';
import { Movie } from '@/types/movie';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

const movie: Movie = {
  id: 1,
  title: 'Dune',
  overview: 'A sci-fi epic',
  poster_path: '/dune.jpg',
  backdrop_path: null,
  release_date: '2021-10-22',
  vote_average: 8.1,
  vote_count: 5000,
};

describe('MovieCardInfo', () => {
  it('renders movie title', () => {
    render(<MovieCardInfo movie={movie} />);
    expect(screen.getByText('Dune')).toBeInTheDocument();
  });

  it('renders vote average formatted to 1 decimal', () => {
    render(<MovieCardInfo movie={movie} />);
    expect(screen.getByText('8.1')).toBeInTheDocument();
  });

  it('renders release year only (first 4 chars)', () => {
    render(<MovieCardInfo movie={movie} />);
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('renders rating icon image', () => {
    render(<MovieCardInfo movie={movie} />);
    expect(screen.getByAltText('rating')).toBeInTheDocument();
  });

  it('handles missing release_date gracefully', () => {
    render(<MovieCardInfo movie={{ ...movie, release_date: '' }} />);
    // No crash expected; empty year is acceptable
    expect(screen.getByText('Dune')).toBeInTheDocument();
  });
});
