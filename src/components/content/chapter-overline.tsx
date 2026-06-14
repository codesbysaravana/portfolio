'use client';

import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { cn } from '@/lib/utils';

interface ChapterOverlineProps {
  number: number;
  className?: string;
}

/**
 * ChapterOverline
 *
 * "CHAPTER 01" label. Uppercase, wide-tracked, tertiary color.
 * Uses monospace font for the number.
 */
export function ChapterOverline({ number, className }: ChapterOverlineProps) {
  const formattedNumber = String(number).padStart(2, '0');

  return (
    <AnimateOnScroll preset="fadeUp" className={cn('mb-6 md:mb-8', className)}>
      <span
        className="inline-block uppercase font-mono text-[var(--portfolio-fg-tertiary)]"
        style={{
          fontSize: 'var(--font-size-overline, 0.6875rem)',
          lineHeight: 'var(--line-height-overline, 1.4)',
          letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
        }}
      >
        Chapter {formattedNumber}
      </span>
    </AnimateOnScroll>
  );
}
