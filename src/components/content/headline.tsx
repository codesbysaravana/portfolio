'use client';

import { TextReveal } from '@/components/motion/text-reveal';
import { cn } from '@/lib/utils';

interface HeadlineProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  /** 'display' = hero, 'headline' = chapter, 'title' = section */
  size?: 'display' | 'headline' | 'title';
  className?: string;
  delay?: number;
}

const sizeStyles = {
  display: {
    fontSize: 'var(--font-size-display, clamp(3.5rem, 8vw, 8rem))',
    lineHeight: 'var(--line-height-display, 0.9)',
    letterSpacing: 'var(--letter-spacing-display, -0.04em)',
    fontWeight: 600,
  },
  headline: {
    fontSize: 'var(--font-size-headline, clamp(2.5rem, 5vw, 5rem))',
    lineHeight: 'var(--line-height-headline, 0.95)',
    letterSpacing: 'var(--letter-spacing-headline, -0.03em)',
    fontWeight: 500,
  },
  title: {
    fontSize: 'var(--font-size-title, clamp(1.5rem, 3vw, 2.5rem))',
    lineHeight: 'var(--line-height-title, 1.1)',
    letterSpacing: 'var(--letter-spacing-title, -0.02em)',
    fontWeight: 500,
  },
};

/**
 * Headline
 *
 * Large typographic heading with built-in text reveal animation.
 * Three sizes: display (hero), headline (chapter), title (section).
 */
export function Headline({
  children,
  as = 'h2',
  size = 'headline',
  className,
  delay = 0,
}: HeadlineProps) {
  return (
    <TextReveal
      as={as}
      delay={delay}
      className={cn('text-[var(--portfolio-fg-primary)]', className)}
      stagger={size === 'display' ? 0.06 : 0.08}
      style={sizeStyles[size]}
    >
      {children}
    </TextReveal>
  );
}

/**
 * HeadlineStatic
 *
 * Same typography without animation — for cases where
 * the parent controls the animation.
 */
export function HeadlineStatic({
  children,
  as: Tag = 'h2',
  size = 'headline',
  className,
}: Omit<HeadlineProps, 'delay'>) {
  return (
    <Tag
      className={cn('text-[var(--portfolio-fg-primary)]', className)}
      style={sizeStyles[size]}
    >
      {children}
    </Tag>
  );
}
