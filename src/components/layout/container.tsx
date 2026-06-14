import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** 'narrow' = 65ch, 'wide' = 1200px, 'full' = 100% */
  width?: 'narrow' | 'wide' | 'full';
  /** Center content within the container */
  center?: boolean;
}

const widthClasses = {
  narrow: 'max-w-[65ch]',
  wide: 'max-w-[1200px]',
  full: 'max-w-full',
} as const;

/**
 * Container
 *
 * Width-constrained content wrapper.
 * - 'narrow': 65ch — for editorial text (optimal reading measure)
 * - 'wide': 1200px — for layouts and grids
 * - 'full': 100% — for full-bleed moments
 */
export function Container({
  children,
  className,
  width = 'wide',
  center = true,
}: ContainerProps) {
  return (
    <div
      className={cn(
        widthClasses[width],
        center && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
}
