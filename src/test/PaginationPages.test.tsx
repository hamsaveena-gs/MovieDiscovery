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
        windowEnd={5}
        currentPage={3}
        totalPages={10}
        goToPage={goToPage}
      />
    );
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('renders last page button when windowEnd < totalPages', () => {
    render(
      <PaginationPages
        pages={[3, 4, 5]}
        windowEnd={5}
        currentPage={3}
        totalPages={10}
        goToPage={goToPage}
      />
    );
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
  });

  it('does not render last page button when windowEnd equals totalPages', () => {
    render(
      <PaginationPages
        pages={[8, 9, 10]}
        windowEnd={10}
        currentPage={8}
        totalPages={10}
        goToPage={goToPage}
      />
    );
    const buttons = screen.getAllByRole('button');
    const lastButtons = buttons.filter(b => b.textContent === '10');
    expect(lastButtons.length).toBe(1);
  });

  it('calls goToPage with correct page number on click', () => {
    render(
      <PaginationPages
        pages={[1, 2, 3]}
        windowEnd={3}
        currentPage={1}
        totalPages={10}
        goToPage={goToPage}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(goToPage).toHaveBeenCalledWith(2);
  });

  it('renders ellipsis when windowEnd is not adjacent to totalPages', () => {
    const { container } = render(
      <PaginationPages
        pages={[1, 2, 3]}
        windowEnd={3}
        currentPage={1}
        totalPages={10}
        goToPage={goToPage}
      />
    );
    expect(container.textContent).toContain('…');
  });
});
