import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/pagination/Pagination';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/movies',
  useSearchParams: () => new URLSearchParams('page=3'),
}));

beforeEach(() => mockPush.mockClear());

describe('Pagination', () => {
  it('returns null when totalPages <= 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Prev and Next buttons', () => {
    render(<Pagination currentPage={3} totalPages={10} />);
    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('disables Prev button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('calls goToPage with currentPage - 1 on Prev click', () => {
    render(<Pagination currentPage={3} totalPages={10} />);
    fireEvent.click(screen.getByRole('button', { name: /prev/i }));
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });

  it('calls goToPage with currentPage + 1 on Next click', () => {
    render(<Pagination currentPage={3} totalPages={10} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=4'));
  });
});
