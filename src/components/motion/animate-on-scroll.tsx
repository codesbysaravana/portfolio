'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import type { AnimateOnScrollProps } from '@/types/motion';

/**
 * AnimateOnScroll
 *
 * Generic wrapper that applies a GSAP preset animation
 * when the element enters the viewport via ScrollTrigger.
 */
export function AnimateOnScroll({
  preset = 'fadeUp',
  delay = 0,
  stagger,
  duration,
  children,
  className,
  as: Tag = 'div',
  scrollTrigger,
}: AnimateOnScrollProps) {
  const ref = useScrollAnimation<HTMLDivElement>({
    preset,
    delay,
    stagger,
    duration,
    scrollTrigger,
    childSelector: stagger ? ':scope > *' : undefined,
  });

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
