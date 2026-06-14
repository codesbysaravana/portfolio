'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import type { StaggerGroupProps } from '@/types/motion';

/**
 * StaggerGroup
 *
 * Orchestrates staggered entrance of direct children.
 * Each child enters sequentially using the specified preset.
 */
export function StaggerGroup({
  children,
  stagger = 0.1,
  preset = 'fadeUp',
  className,
  as: Tag = 'div',
}: StaggerGroupProps) {
  const ref = useScrollAnimation<HTMLDivElement>({
    preset,
    stagger,
    childSelector: ':scope > *',
  });

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
