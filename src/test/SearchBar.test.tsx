import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/ui/SearchBar';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

describe('SearchBar', () => {
  it('renders search input and button', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('has id and name attributes on the input', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    expect(input).toHaveAttribute('id', 'search');
    expect(input).toHaveAttribute('name', 'search');
  });

  it('renders with defaultValue populated', () => {
    render(<SearchBar defaultValue="Inception" />);
    expect(screen.getByDisplayValue('Inception')).toBeInTheDocument();
  });

  it('shows clear button when query has value', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'Dune' } });
    expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
  });

  it('does not show clear button when query is empty', () => {
    render(<SearchBar />);
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });

  it('clears the input when clear button is clicked', () => {
    render(<SearchBar defaultValue="Dune" />);
    fireEvent.click(screen.getByRole('button', { name: /clear search/i }));
    expect(screen.getByPlaceholderText('Search for movies...')).toHaveValue('');
  });

  it('hides clear button after clearing', () => {
    render(<SearchBar defaultValue="Dune" />);
    fireEvent.click(screen.getByRole('button', { name: /clear search/i }));
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });

  it('navigates to /search on form submit with query', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'Dune' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/search?q=Dune');
  });

  it('does not navigate when query is empty', () => {
    render(<SearchBar />);
    fireEvent.submit(screen.getByPlaceholderText('Search for movies...').closest('form')!);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('trims whitespace from query before navigating', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: '  Matrix  ' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/search?q=Matrix');
  });
});
