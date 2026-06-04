import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchEmptyState from '@/features/search/components/SearchEmptyState';

describe('SearchEmptyState', () => {
  it('renders prompt text to start searching', () => {
    render(<SearchEmptyState />);
    expect(screen.getByText('Start searching for movies')).toBeInTheDocument();
  });

  it('renders helper instruction text', () => {
    render(<SearchEmptyState />);
    expect(screen.getByText('Type a movie name in the search bar above')).toBeInTheDocument();
  });
});
