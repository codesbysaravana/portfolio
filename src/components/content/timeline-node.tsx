'use client';

import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { cn } from '@/lib/utils';

interface TimelineNodeProps {
  year: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * TimelineNode
 *
 * Single event in the Journey timeline.
 * Year label in monospace, title in heading weight, description in secondary.
 */
export function TimelineNode({
  year,
  title,
  description,
  className,
}: TimelineNodeProps) {
  return (
    <AnimateOnScroll preset="fadeUp">
      <article className={cn('relative pl-8 md:pl-12 pb-16', className)}>
        {/* Timeline dot */}
        <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[var(--portfolio-fg-tertiary)]" />
        {/* Timeline line */}
        <div className="absolute left-[3px] top-4 bottom-0 w-px bg-[var(--portfolio-border)]" />

        <span
          className="block mb-2 font-mono text-[var(--portfolio-fg-tertiary)] uppercase"
          style={{
            fontSize: 'var(--font-size-overline, 0.6875rem)',
            letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
          }}
        >
          {year}
        </span>

        <h3
          className="mb-3 text-[var(--portfolio-fg-primary)]"
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
          className="max-w-[50ch] text-[var(--portfolio-fg-secondary)]"
          style={{
            fontSize: 'var(--font-size-body, 1rem)',
            lineHeight: 'var(--line-height-body, 1.6)',
          }}
        >
          {description}
        </p>
      </article>
    </AnimateOnScroll>
  );
}
