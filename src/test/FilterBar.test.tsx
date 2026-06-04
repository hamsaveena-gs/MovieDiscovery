import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '@/features/home/components/FilterBar';
import { Genre } from '@/types/movie';

const mockPush = jest.fn();
const mockPathname = '/';
let mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
];

beforeEach(() => {
  mockPush.mockClear();
  mockSearchParams = new URLSearchParams();
});

describe('FilterBar', () => {
  it('renders Filter label', () => {
    render(<FilterBar genres={genres} />);
    expect(screen.getByText('Filter:')).toBeInTheDocument();
  });

  it('renders genre, year, rating, and sort selects', () => {
    render(<FilterBar genres={genres} />);
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(4);
  });

  it('renders genre options from props', () => {
    render(<FilterBar genres={genres} />);
    expect(screen.getByRole('option', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Comedy' })).toBeInTheDocument();
  });

  it('does not show Clear button when no active filters', () => {
    render(<FilterBar genres={genres} />);
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('shows Clear button when filters are active', () => {
    mockSearchParams = new URLSearchParams('genre=28');
    render(<FilterBar genres={genres} />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('calls router.push with no params on Clear click', () => {
    mockSearchParams = new URLSearchParams('genre=28');
    render(<FilterBar genres={genres} />);
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders filter badges when filters are active', () => {
    mockSearchParams = new URLSearchParams('year=2020');
    render(<FilterBar genres={genres} />);
    expect(screen.getByText('Year: 2020')).toBeInTheDocument();
  });
});
