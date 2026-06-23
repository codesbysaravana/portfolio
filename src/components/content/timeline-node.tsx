'use client';

import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { cn } from '@/lib/utils';

interface TimelineNodeProps {
  year: string;
  title: string;
  description: string;
  className?: string;
  isActive?: boolean;
  color?: string;
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
  isActive = false,
  color = 'var(--portfolio-accent)',
}: TimelineNodeProps) {
  return (
    <AnimateOnScroll preset="fadeUp">
      <article className={cn('relative pl-8 md:pl-12 pb-16 transition-all duration-500', className)}>
        {/* Timeline dot */}
        <div className="absolute left-0 top-1.5 flex items-center justify-center h-3 w-3">
          <div
            className="absolute rounded-full transition-all duration-500"
            style={{
              width: isActive ? '12px' : '6px',
              height: isActive ? '12px' : '6px',
              backgroundColor: isActive ? color : 'var(--portfolio-fg-tertiary)',
              boxShadow: isActive ? `0 0 16px ${color}, 0 0 4px ${color}` : 'none',
            }}
          />
          {isActive && (
            <div
              className="absolute h-6 w-6 rounded-full animate-ping opacity-25"
              style={{ backgroundColor: color }}
            />
          )}
        </div>

        {/* Timeline line */}
        <div
          className="absolute left-[5px] top-5 bottom-0 w-px transition-all duration-500"
          style={{
            background: isActive
              ? `linear-gradient(to bottom, ${color}, var(--portfolio-border))`
              : 'var(--portfolio-border)',
          }}
        />

        <span
          className="block mb-2 font-mono uppercase transition-colors duration-500"
          style={{
            fontSize: 'var(--font-size-overline, 0.6875rem)',
            letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
            color: isActive ? color : 'var(--portfolio-fg-tertiary)',
            fontWeight: isActive ? 600 : 400,
          }}
        >
          {year}
        </span>

        <h3
          className="mb-3 transition-colors duration-500"
          style={{
            fontSize: 'var(--font-size-title, clamp(1.5rem, 3vw, 2.5rem))',
            lineHeight: 'var(--line-height-title, 1.1)',
            letterSpacing: 'var(--letter-spacing-title, -0.02em)',
            fontWeight: isActive ? 600 : 500,
            color: 'var(--portfolio-fg-primary)',
          }}
        >
          {title}
        </h3>

        <p
          className="max-w-[50ch] transition-colors duration-500"
          style={{
            fontSize: 'var(--font-size-body, 1rem)',
            lineHeight: 'var(--line-height-body, 1.6)',
            color: isActive ? 'var(--portfolio-fg-primary)' : 'var(--portfolio-fg-secondary)',
          }}
        >
          {description}
        </p>
      </article>
    </AnimateOnScroll>
  );
}
