import { cn } from '@/lib/utils';
import { BG_MAP } from '@/types/chapter';

interface ChapterProps {
  id: string;
  bg?: keyof typeof BG_MAP;
  className?: string;
  children: React.ReactNode;
  /** Accessible label for the section */
  label?: string;
  /** Disable default padding */
  flush?: boolean;
}

/**
 * Chapter
 *
 * Wraps each scroll chapter with consistent structure:
 * - Semantic <section> with id and aria-label
 * - Background color from the design system
 * - Consistent vertical padding
 */
export function Chapter({
  id,
  bg = 'primary',
  className,
  children,
  label,
  flush = false,
}: ChapterProps) {
  return (
    <section
      id={id}
      aria-label={label ?? id}
      className={cn(
        'relative w-full',
        !flush && 'px-6 md:px-12 lg:px-24',
        className
      )}
      style={{ backgroundColor: BG_MAP[bg] }}
    >
      {children}
    </section>
  );
}


