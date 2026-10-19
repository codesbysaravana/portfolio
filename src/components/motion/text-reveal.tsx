'use client';

import type React from 'react';

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
  as: TagProp = 'h2',
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

  // ElementType accepts the ref prop loosely; all supported tags are
  // intrinsic elements that take an HTMLElement ref.
  const Tag = TagProp as React.ElementType;

  return (
    <Tag ref={ref} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
