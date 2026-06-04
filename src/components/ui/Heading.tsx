import { HTMLAttributes, ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingVariant = 'page' | 'section' | 'sub' | 'error' | '404' | 'card' | 'empty';

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  as?: HeadingLevel;
  variant?: HeadingVariant;
  children: ReactNode;
}

const variantClass: Record<HeadingVariant, string> = {
  page:    'page-title',
  section: 'section-heading',
  sub:     'sub-heading',
  error:   'error-heading',
  '404':   'heading-404',
  card:    'heading-card',
  empty:   'empty-title',
};

export default function Heading({ as: Tag = 'h2', variant = 'sub', className = '', children, ...props }: HeadingProps) {
  return (
    <Tag className={`${variantClass[variant]} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
