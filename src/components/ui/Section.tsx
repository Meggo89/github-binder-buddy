import { HTMLAttributes, forwardRef } from 'react';

type SectionTone = 'light' | 'muted' | 'navy' | 'deep' | 'ink';
type SectionPadding = 'sm' | 'md' | 'lg';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  padding?: SectionPadding;
  as?: 'section' | 'div';
}

const toneClasses: Record<SectionTone, string> = {
  light: 'bg-white text-navy',
  muted: 'bg-sand-light text-navy',
  navy: 'bg-navy text-white',
  deep: 'bg-navy-dark text-white',
  ink: 'bg-ink text-white',
};

const paddingClasses: Record<SectionPadding, string> = {
  sm: 'py-section-sm',
  md: 'py-section-md',
  lg: 'py-section-lg',
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ tone = 'light', padding = 'md', as = 'section', className = '', children, ...rest }, ref) => {
    const Tag = as;
    return (
      <Tag
        ref={ref as never}
        className={`${toneClasses[tone]} ${paddingClasses[padding]} ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Section.displayName = 'Section';
