import React from 'react';
import { render, screen } from '@testing-library/react';
import NoPoster from '@/components/ui/NoPoster';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('NoPoster', () => {
  it('renders No Poster text', () => {
    render(<NoPoster />);
    expect(screen.getByText('No Poster')).toBeInTheDocument();
  });

  it('renders image with alt "no poster"', () => {
    render(<NoPoster />);
    expect(screen.getByAltText('no poster')).toBeInTheDocument();
  });

  it('uses small icon size by default', () => {
    render(<NoPoster />);
    const img = screen.getByAltText('no poster');
    expect(img).toHaveAttribute('width', '36');
    expect(img).toHaveAttribute('height', '36');
  });

  it('uses large icon size when size="lg"', () => {
    render(<NoPoster size="lg" />);
    const img = screen.getByAltText('no poster');
    expect(img).toHaveAttribute('width', '48');
    expect(img).toHaveAttribute('height', '48');
  });
});
