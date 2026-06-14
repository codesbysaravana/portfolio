'use client';

import { TextReveal } from '@/components/motion/text-reveal';
import { cn } from '@/lib/utils';

interface PullQuoteProps {
  children: string;
  className?: string;
  delay?: number;
}

/**
 * PullQuote
 *
 * Large, light-weight quoted text with an accent-colored em dash.
 * Used to punctuate the Engineering Philosophy chapter.
 */
export function PullQuote({ children, className, delay = 0 }: PullQuoteProps) {
  return (
    <div className={cn('my-16 md:my-24', className)}>
      <span
        className="block mb-4 text-[var(--portfolio-accent)]"
        style={{ fontSize: 'var(--font-size-title)', fontWeight: 300 }}
        aria-hidden="true"
      >
        —
      </span>
      <TextReveal
        as="p"
        delay={delay}
        stagger={0.06}
        className="text-[var(--portfolio-fg-primary)] font-light"
        style={{
          fontSize: 'var(--font-size-title)',
          lineHeight: 'var(--line-height-title)',
          letterSpacing: 'var(--letter-spacing-title)',
          fontWeight: 300,
        }}
      >
        {children}
      </TextReveal>
    </div>
  );
}
