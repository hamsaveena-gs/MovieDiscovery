import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  outline: 'btn btn-outline',
};

export default function ButtonLink({ variant = 'primary', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${variantClass[variant]} ${className}`.trim()} {...props}>
      {children}
    </Link>
  );
}
