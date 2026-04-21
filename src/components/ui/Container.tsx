import { HTMLAttributes, forwardRef } from 'react';

type ContainerSize = 'default' | 'narrow' | 'wide' | 'full';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  default: 'max-w-content',
  narrow: 'max-w-3xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'default', className = '', children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`container mx-auto px-6 ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
