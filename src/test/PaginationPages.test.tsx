import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationPages from '@/components/pagination/PaginationPages';

const goToPage = jest.fn();

beforeEach(() => goToPage.mockClear());

describe('PaginationPages', () => {
  it('renders page buttons for provided pages array', () => {
    render(
      <PaginationPages
        pages={[3, 4, 5]}
        rangeStart={3}
        rangeEnd={5}
        currentPage={4}
        totalPages={10}
        goToPage={goToPage}
        size="md"
      />
    );
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('renders first page button when rangeStart > 1', () => {
    render(
      <PaginationPages
        pages={[3, 4, 5]}
        rangeStart={3}
        rangeEnd={5}
        currentPage={4}
        totalPages={10}
        goToPage={goToPage}
        size="md"
      />
    );
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  });

  it('renders last page button when rangeEnd < totalPages', () => {
    render(
      <PaginationPages
        pages={[3, 4, 5]}
        rangeStart={3}
        rangeEnd={5}
        currentPage={4}
        totalPages={10}
        goToPage={goToPage}
        size="md"
      />
    );
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
  });

  it('calls goToPage with correct page number on click', () => {
    render(
      <PaginationPages
        pages={[1, 2, 3]}
        rangeStart={1}
        rangeEnd={3}
        currentPage={1}
        totalPages={5}
        goToPage={goToPage}
        size="md"
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(goToPage).toHaveBeenCalledWith(2);
  });

  it('does not render first page button when rangeStart is 1', () => {
    render(
      <PaginationPages
        pages={[1, 2, 3]}
        rangeStart={1}
        rangeEnd={3}
        currentPage={2}
        totalPages={3}
        goToPage={goToPage}
        size="md"
      />
    );
    // Only one button with text "1" (the page button itself)
    const buttons = screen.getAllByRole('button');
    const firstPageExtra = buttons.filter(b => b.textContent === '1');
    expect(firstPageExtra.length).toBe(1);
  });
});
