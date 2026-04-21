import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'navy' | 'outline-navy' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-navy hover:bg-accent-light hover:shadow-lg hover:-translate-y-0.5',
  secondary: 'border-2 border-sand text-white hover:bg-white/10',
  navy: 'bg-navy text-white hover:bg-navy-light',
  'outline-navy': 'border-2 border-navy text-navy hover:bg-navy hover:text-white hover:shadow-lg',
  ghost: 'text-navy hover:text-navy-light',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg',
};

function buildClasses(variant: ButtonVariant, size: ButtonSize, fullWidth: boolean, className: string) {
  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...rest }, ref) => {
    return (
      <button ref={ref} className={buildClasses(variant, size, fullWidth, className)} {...rest}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

type ButtonLinkProps = CommonProps & Omit<LinkProps, 'className' | 'children'>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...rest }, ref) => {
    return (
      <Link ref={ref} className={buildClasses(variant, size, fullWidth, className)} {...rest}>
        {children}
      </Link>
    );
  }
);
ButtonLink.displayName = 'ButtonLink';

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonAnchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...rest }, ref) => {
    return (
      <a ref={ref} className={buildClasses(variant, size, fullWidth, className)} {...rest}>
        {children}
      </a>
    );
  }
);
ButtonAnchor.displayName = 'ButtonAnchor';
