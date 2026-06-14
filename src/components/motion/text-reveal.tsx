'use client';

import { useTextReveal } from '@/hooks/use-text-reveal';
import { cn } from '@/lib/utils';
import type { TextRevealProps } from '@/types/motion';

/**
 * TextReveal
 *
 * Splits text into words and animates each upward from
 * behind an overflow-hidden mask. The signature editorial animation.
 */
export function TextReveal({
  children,
  as: Tag = 'h2',
  className,
  style,
  delay = 0,
  stagger,
  splitType = 'words',
}: TextRevealProps) {
  const ref = useTextReveal<HTMLElement>({
    delay,
    stagger,
    splitType,
  });

  return (
    <Tag ref={ref as any} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
