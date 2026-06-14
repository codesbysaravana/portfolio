'use client';

import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { cn } from '@/lib/utils';

interface PrincipleCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

/**
 * PrincipleCard
 *
 * Numbered principle block with watermark number,
 * bold title, and muted description.
 */
export function PrincipleCard({
  number,
  title,
  description,
  className,
}: PrincipleCardProps) {
  const formattedNumber = String(number).padStart(2, '0');

  return (
    <AnimateOnScroll preset="fadeUp">
      <div className={cn('relative py-8', className)}>
        {/* Watermark number */}
        <span
          className="block text-[var(--portfolio-fg-ghost)] select-none"
          aria-hidden="true"
          style={{
            fontSize: 'var(--font-size-display, clamp(3.5rem, 8vw, 8rem))',
            lineHeight: '0.9',
            letterSpacing: '-0.04em',
            fontWeight: 600,
          }}
        >
          {formattedNumber}
        </span>

        <h3
          className="mt-4 mb-3 text-[var(--portfolio-fg-primary)]"
          style={{
            fontSize: 'var(--font-size-title, clamp(1.5rem, 3vw, 2.5rem))',
            lineHeight: 'var(--line-height-title, 1.1)',
            letterSpacing: 'var(--letter-spacing-title, -0.02em)',
            fontWeight: 500,
          }}
        >
          {title}
        </h3>

        <p
          className="max-w-[45ch] text-[var(--portfolio-fg-secondary)]"
          style={{
            fontSize: 'var(--font-size-body, 1rem)',
            lineHeight: 'var(--line-height-body, 1.6)',
          }}
        >
          {description}
        </p>
      </div>
    </AnimateOnScroll>
  );
}
