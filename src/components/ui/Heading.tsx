import { HTMLAttributes, forwardRef } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = 'display-xl' | 'display-lg' | 'display-md' | 'heading-lg' | 'heading-md' | 'heading-sm';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  serif?: boolean;
}

const sizeClasses: Record<HeadingSize, string> = {
  'display-xl': 'text-display-xl font-bold',
  'display-lg': 'text-display-lg font-bold',
  'display-md': 'text-display-md font-bold',
  'heading-lg': 'text-heading-lg font-semibold',
  'heading-md': 'text-heading-md font-semibold',
  'heading-sm': 'text-heading-sm font-semibold',
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size, serif = false, className = '', children, ...rest }, ref) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
    const resolvedSize: HeadingSize =
      size ?? (level === 1 ? 'display-lg' : level === 2 ? 'heading-lg' : level === 3 ? 'heading-md' : 'heading-sm');
    const fontClass = serif ? 'font-serif' : 'font-sans';
    return (
      <Tag ref={ref} className={`${sizeClasses[resolvedSize]} ${fontClass} ${className}`} {...rest}>
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';
