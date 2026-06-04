import React from 'react';
import { render, screen } from '@testing-library/react';
import FavouritesHeader from '@/features/favourites/components/FavouritesHeader';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('FavouritesHeader', () => {
  it('renders "My Favourites" heading', () => {
    render(<FavouritesHeader />);
    expect(screen.getByText('My Favourites')).toBeInTheDocument();
  });

  it('renders favourites icon image', () => {
    render(<FavouritesHeader />);
    expect(screen.getByAltText('favourites')).toBeInTheDocument();
  });
});
