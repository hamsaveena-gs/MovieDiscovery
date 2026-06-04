import { HTMLAttributes, ReactNode } from 'react';

type TextVariant = 'body' | 'intro' | 'secondary' | 'caption' | 'hint' | 'quote' | 'emphasis' | 'meta' | 'label' | 'brand' | 'footnote';

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: 'p' | 'span' | 'small' | 'label';
  children: ReactNode;
}

const variantClass: Record<TextVariant, string> = {
  body:      'para',
  intro:     'para-lead',
  secondary: 'para-muted',
  caption:   'para-subtle',
  hint:      'para-hint',
  quote:     'para-italic',
  emphasis:  'para-highlight',
  meta:      'para-count',
  label:     'para-name',
  brand:     'footer-brand',
  footnote:  'footer-text',
};

export default function Text({ variant = 'body', as: Tag = 'p', className = '', children, ...props }: TextProps) {
  return (
    <Tag className={`${variantClass[variant]} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
