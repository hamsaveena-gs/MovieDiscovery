import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCardPoster from '@/components/movie-card/MovieCardPoster';
import { Movie } from '@/types/movie';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

jest.mock('@/lib/tmdb', () => ({
  POSTER_URL: 'https://image.tmdb.org/t/p/w500',
}));

const movie: Movie = {
  id: 1,
  title: 'Inception',
  overview: '',
  poster_path: '/inception.jpg',
  backdrop_path: null,
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 30000,
};

describe('MovieCardPoster', () => {
  it('renders movie poster image when poster_path is set', () => {
    render(<MovieCardPoster movie={movie} />);
    const img = screen.getByAltText('Inception');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('/inception.jpg'));
  });

  it('renders NoPoster fallback when poster_path is null', () => {
    render(<MovieCardPoster movie={{ ...movie, poster_path: null }} />);
    expect(screen.getByText('No Poster')).toBeInTheDocument();
  });

  it('does not render poster image when poster_path is null', () => {
    render(<MovieCardPoster movie={{ ...movie, poster_path: null }} />);
    expect(screen.queryByAltText('Inception')).not.toBeInTheDocument();
  });
});
