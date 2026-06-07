import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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

// ---------------------------------------------------------------------------
// Suggestions behaviour
// ---------------------------------------------------------------------------

const mockSuggestions = [
  { id: 157336, title: 'Interstellar', release_date: '2014-11-07', poster_path: '/inter.jpg' },
  { id: 27205,  title: 'Inception',    release_date: '2010-07-16', poster_path: '/inc.jpg'   },
];

function mockFetchSuccess() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ results: mockSuggestions }),
  } as Response);
}

function mockFetchFailure() {
  global.fetch = jest.fn().mockRejectedValue(new Error('network error'));
}

describe('SearchBar — suggestions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFetchSuccess();
    mockPush.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('does not fetch when query is less than 2 characters', () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), { target: { value: 'a' } });
    act(() => { jest.advanceTimersByTime(300); });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('fetches suggestions after 300ms debounce', async () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/suggestions?q=inc');
    });
  });

  it('shows suggestion dropdown after debounce', async () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => {
      expect(screen.getByText('Interstellar')).toBeInTheDocument();
      expect(screen.getByText('Inception')).toBeInTheDocument();
    });
  });

  it('does not show dropdown before debounce fires', () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('resets debounce timer if user keeps typing', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'in' } });
    act(() => { jest.advanceTimersByTime(200); });
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/suggestions?q=inc');
    });
  });

  it('hides dropdown when query is cleared to less than 2 chars', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByRole('listbox'));
    fireEvent.change(input, { target: { value: 'i' } });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('navigates to /movies/[id] when suggestion is clicked', async () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByText('Interstellar'));
    fireEvent.mouseDown(screen.getAllByRole('option')[0]);
    expect(mockPush).toHaveBeenCalledWith('/movies/157336');
  });

  it('navigates to /movies/[id] when Enter pressed on highlighted suggestion', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByText('Interstellar'));
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockPush).toHaveBeenCalledWith('/movies/157336');
  });

  it('moves highlight down with ArrowDown', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByText('Interstellar'));
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('moves highlight up with ArrowUp and wraps to last', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByText('Interstellar'));
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    const options = screen.getAllByRole('option');
    expect(options[options.length - 1]).toHaveAttribute('aria-selected', 'true');
  });

  it('closes dropdown on Escape key', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByRole('listbox'));
    fireEvent.keyDown(input, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('submits to /search?q=... when Enter pressed with no highlighted suggestion', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByRole('listbox'));
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/search?q=inc');
  });

  it('hides dropdown and clears suggestions when clear button is clicked', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => screen.getByRole('listbox'));
    fireEvent.click(screen.getByRole('button', { name: /clear search/i }));
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('shows no dropdown when fetch fails', async () => {
    mockFetchFailure();
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), { target: { value: 'inc' } });
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});

