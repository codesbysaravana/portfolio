'use client';

import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { cn } from '@/lib/utils';

interface EditorialTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * EditorialText
 *
 * Narrative paragraph with optimal reading measure (65ch),
 * generous line height, and fadeUp scroll animation.
 */
export function EditorialText({
  children,
  className,
  delay = 0,
}: EditorialTextProps) {
  return (
    <AnimateOnScroll preset="fadeUp" delay={delay}>
      <p
        className={cn(
          'max-w-[65ch] text-[var(--portfolio-fg-secondary)]',
          className
        )}
        style={{
          fontSize: 'var(--font-size-body-lg, clamp(1.125rem, 1.5vw, 1.375rem))',
          lineHeight: 'var(--line-height-body-lg, 1.7)',
          letterSpacing: 'var(--letter-spacing-body-lg, -0.01em)',
        }}
      >
        {children}
      </p>
    </AnimateOnScroll>
  );
}
