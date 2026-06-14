'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * ScrollIndicator
 *
 * Subtle "scroll" affordance that appears in the hero
 * with a gentle oscillation animation.
 */
export function ScrollIndicator({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    // Fade in after delay
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: 'power2.out' }
    );

    // Gentle oscillation loop
    const tl = gsap.to(ref.current.querySelector('.scroll-indicator-line'), {
      scaleY: 1,
      duration: 1.2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => { tl.kill(); };
  }, [prefersReduced]);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center gap-3 opacity-0',
        className
      )}
      aria-hidden="true"
    >
      <span
        className="text-[var(--portfolio-fg-tertiary)] uppercase tracking-[0.12em]"
        style={{ fontSize: 'var(--font-size-overline, 0.6875rem)' }}
      >
        Scroll
      </span>
      <div className="relative h-12 w-px bg-[var(--portfolio-border)]">
        <div
          className="scroll-indicator-line absolute top-0 left-0 h-full w-full origin-top scale-y-50 bg-[var(--portfolio-fg-tertiary)]"
        />
      </div>
    </div>
  );
}
