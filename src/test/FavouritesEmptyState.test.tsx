import React from 'react';
import { render, screen } from '@testing-library/react';
import FavouritesEmptyState from '@/features/favourites/components/FavouritesEmptyState';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('FavouritesEmptyState', () => {
  it('renders "No favourites yet" message', () => {
    render(<FavouritesEmptyState />);
    expect(screen.getByText('No favourites yet')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<FavouritesEmptyState />);
    expect(screen.getByText('Save movies you love and find them here')).toBeInTheDocument();
  });

  it('renders Browse Movies link pointing to /', () => {
    render(<FavouritesEmptyState />);
    const link = screen.getByRole('link', { name: /browse movies/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders no-favourites image', () => {
    render(<FavouritesEmptyState />);
    expect(screen.getByAltText('no favourites')).toBeInTheDocument();
  });
});
