'use client';

import { useParallax } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';
import type { ParallaxLayerProps } from '@/types/motion';

/**
 * ParallaxLayer
 *
 * Wraps content with scroll-linked parallax movement.
 * Speed: -1 to 1. Positive = moves with scroll, negative = against.
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  className,
}: ParallaxLayerProps) {
  const ref = useParallax<HTMLDivElement>(speed);

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}
