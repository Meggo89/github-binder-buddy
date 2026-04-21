import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  as?: 'div' | 'ul' | 'ol' | 'section';
}

export function Stagger({ children, className, delay = 0, step = 0.08, as = 'div' }: StaggerProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: 'div' | 'li' | 'article' | 'section';
}

export function StaggerItem({ children, className, y = 18, as = 'div' }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </Component>
  );
}
