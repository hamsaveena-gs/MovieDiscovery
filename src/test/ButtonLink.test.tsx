import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('Button as link (href provided)', () => {
  it('renders children', () => {
    render(<Button href="/test">Go</Button>);
    expect(screen.getByText('Go')).toBeInTheDocument();
  });

  it('renders with correct href', () => {
    render(<Button href="/movies">Movies</Button>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/movies');
  });

  it('applies primary variant class by default', () => {
    render(<Button href="/">Home</Button>);
    expect(screen.getByRole('link').className).toContain('btn-primary');
  });

  it('applies secondary variant class', () => {
    render(<Button href="/" variant="secondary">Secondary</Button>);
    expect(screen.getByRole('link').className).toContain('btn-secondary');
  });

  it('applies outline variant class', () => {
    render(<Button href="/" variant="outline">Outline</Button>);
    expect(screen.getByRole('link').className).toContain('btn-outline');
  });

  it('merges custom className', () => {
    render(<Button href="/" className="extra">Link</Button>);
    expect(screen.getByRole('link').className).toContain('extra');
  });
});
