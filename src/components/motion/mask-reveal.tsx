'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '@/lib/motion/easing';
import { SCROLL_DEFAULTS } from '@/lib/motion/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import type { MaskRevealProps } from '@/types/motion';

const CLIP_PATHS = {
  up:    { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)' },
  down:  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)' },
  left:  { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' },
  right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)' },
} as const;

/**
 * MaskReveal
 *
 * Clip-path reveal animation for images and blocks.
 * Content slides into view from the specified direction.
 */
export function MaskReveal({
  children,
  direction = 'up',
  duration = 1.0,
  delay = 0,
  className,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    if (prefersReduced || !ref.current) return;

    const paths = CLIP_PATHS[direction];
    gsap.fromTo(
      ref.current,
      { clipPath: paths.from },
      {
        clipPath: paths.to,
        duration,
        delay,
        ease: EASE.dramatic,
        scrollTrigger: {
          trigger: ref.current,
          ...SCROLL_DEFAULTS,
        },
      }
    );
  }, { scope: ref, dependencies: [prefersReduced, direction] });

  return (
    <div ref={ref} className={cn('will-change-[clip-path]', className)}>
      {children}
    </div>
  );
}
