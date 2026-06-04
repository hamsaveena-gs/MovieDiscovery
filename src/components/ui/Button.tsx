import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'icon-light' | 'ghost';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  outline: 'btn btn-outline',
  'icon-light': 'btn-icon-light',
  ghost: 'btn-ghost',
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: ButtonVariant;
  children: ReactNode;
};

type ButtonAsLink = LinkProps & {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const classes = `${variantClass[variant]} ${className}`.trim();

  if (props.href !== undefined) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
