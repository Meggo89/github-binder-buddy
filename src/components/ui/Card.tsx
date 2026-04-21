import { HTMLAttributes, forwardRef } from 'react';

type CardTone = 'white' | 'muted' | 'bordered' | 'navy';
type CardInteractive = 'none' | 'lift' | 'shadow';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  interactive?: CardInteractive;
  padding?: 'sm' | 'md' | 'lg';
}

const toneClasses: Record<CardTone, string> = {
  white: 'bg-white shadow-sm',
  muted: 'bg-sand-light',
  bordered: 'bg-white border border-sand',
  navy: 'bg-navy-light text-white',
};

const interactiveClasses: Record<CardInteractive, string> = {
  none: '',
  lift: 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
  shadow: 'transition-shadow duration-300 hover:shadow-md',
};

const paddingClasses = {
  sm: 'p-6',
  md: 'p-8',
  lg: 'p-10',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { tone = 'white', interactive = 'none', padding = 'md', className = '', children, ...rest },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl ${toneClasses[tone]} ${interactiveClasses[interactive]} ${paddingClasses[padding]} ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
