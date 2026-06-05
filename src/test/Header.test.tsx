import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

jest.mock('@/features/nav/components/Navbar', () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

describe('Header', () => {
  it('renders a header element', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders Navbar inside the header', () => {
    render(<Header />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
