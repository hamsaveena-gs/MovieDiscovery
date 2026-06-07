import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchSuggestions from '@/components/ui/SearchSuggestions';
import { Suggestion } from '@/types/movie';

const mockSuggestions: Suggestion[] = [
  { id: 1, title: 'Inception', release_date: '2010-07-16', poster_path: '/inception.jpg' },
  { id: 2, title: 'Interstellar', release_date: '2014-11-07', poster_path: null },
  { id: 3, title: 'In Bruges', release_date: '2008-02-08', poster_path: '/bruges.jpg' },
];

describe('SearchSuggestions', () => {
  it('renders nothing when suggestions list is empty', () => {
    const { container } = render(
      <SearchSuggestions suggestions={[]} activeIndex={-1} onSelect={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders all suggestions', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={jest.fn()} />
    );
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('In Bruges')).toBeInTheDocument();
  });

  it('renders the listbox with correct id', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={jest.fn()} />
    );
    expect(screen.getByRole('listbox')).toHaveAttribute('id', 'search-suggestions-listbox');
  });

  it('renders each suggestion as a listbox option', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={jest.fn()} />
    );
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('shows the release year for each suggestion', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={jest.fn()} />
    );
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('2014')).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
  });

  it('does not show year when release_date is empty', () => {
    const noDate: Suggestion[] = [
      { id: 4, title: 'No Date Movie', release_date: '', poster_path: null },
    ];
    render(
      <SearchSuggestions suggestions={noDate} activeIndex={-1} onSelect={jest.fn()} />
    );
    expect(screen.getByText('No Date Movie')).toBeInTheDocument();
    // No year should appear
    expect(screen.queryByText(/^\d{4}$/)).not.toBeInTheDocument();
  });

  it('marks active suggestion with aria-selected=true', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={1} onSelect={jest.fn()} />
    );
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('applies active highlight class to active suggestion only', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={0} onSelect={jest.fn()} />
    );
    const options = screen.getAllByRole('option');
    // Active item has bare bg-gray-700; inactive items have hover:bg-gray-700
    expect(options[0].className.split(' ')).toContain('bg-gray-700');
    expect(options[1].className.split(' ')).not.toContain('bg-gray-700');
  });

  it('calls onSelect with the correct suggestion on mousedown', () => {
    const onSelect = jest.fn();
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={onSelect} />
    );
    fireEvent.mouseDown(screen.getAllByRole('option')[0]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });

  it('calls onSelect with the correct suggestion when second item is clicked', () => {
    const onSelect = jest.fn();
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={onSelect} />
    );
    fireEvent.mouseDown(screen.getAllByRole('option')[1]);
    expect(onSelect).toHaveBeenCalledWith(mockSuggestions[1]);
  });

  it('renders a poster image when poster_path is provided', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={jest.fn()} />
    );
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('alt', 'Inception');
  });

  it('renders a fallback placeholder when poster_path is null', () => {
    render(
      <SearchSuggestions suggestions={mockSuggestions} activeIndex={-1} onSelect={jest.fn()} />
    );
    // Interstellar has no poster — fallback "?" should appear
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
