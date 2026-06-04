import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterBadges from '@/features/home/components/FilterBadges';

describe('FilterBadges', () => {
  it('renders no badges when all filters are empty', () => {
    const { container } = render(
      <FilterBadges currentGenre="" currentYear="" currentRating="" currentSort="" sortLabel={undefined} />
    );
    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  it('renders "Genre applied" badge when genre is set', () => {
    render(<FilterBadges currentGenre="28" currentYear="" currentRating="" currentSort="" sortLabel={undefined} />);
    expect(screen.getByText('Genre applied')).toBeInTheDocument();
  });

  it('renders year badge', () => {
    render(<FilterBadges currentGenre="" currentYear="2022" currentRating="" currentSort="" sortLabel={undefined} />);
    expect(screen.getByText('Year: 2022')).toBeInTheDocument();
  });

  it('renders rating badge', () => {
    render(<FilterBadges currentGenre="" currentYear="" currentRating="7" currentSort="" sortLabel={undefined} />);
    expect(screen.getByText('Rating: 7+')).toBeInTheDocument();
  });

  it('renders sort label badge', () => {
    render(
      <FilterBadges currentGenre="" currentYear="" currentRating="" currentSort="popularity.desc" sortLabel="Most Popular" />
    );
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders multiple badges at once', () => {
    render(
      <FilterBadges currentGenre="28" currentYear="2021" currentRating="8" currentSort="vote_average.desc" sortLabel="Top Rated" />
    );
    expect(screen.getByText('Genre applied')).toBeInTheDocument();
    expect(screen.getByText('Year: 2021')).toBeInTheDocument();
    expect(screen.getByText('Rating: 8+')).toBeInTheDocument();
    expect(screen.getByText('Top Rated')).toBeInTheDocument();
  });
});
