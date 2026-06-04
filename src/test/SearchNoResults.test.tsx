import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchNoResults from '@/features/search/components/SearchNoResults';

describe('SearchNoResults', () => {
  it('renders "No results found" heading', () => {
    render(<SearchNoResults query="xyz" />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders the query in the message', () => {
    render(<SearchNoResults query="Interstellar" />);
    expect(screen.getByText(/Interstellar/)).toBeInTheDocument();
  });

  it('renders suggestion to try a different keyword', () => {
    render(<SearchNoResults query="abc" />);
    expect(screen.getByText(/Try a different keyword/i)).toBeInTheDocument();
  });
});
