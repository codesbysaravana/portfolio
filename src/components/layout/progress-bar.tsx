'use client';

import { useScrollProgress } from '@/hooks/use-scroll-progress';

/**
 * ProgressBar
 *
 * Thin horizontal progress bar at the very top of the viewport.
 * Shows scroll progress from 0% to 100%.
 */
export function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[2px] w-full pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[var(--portfolio-accent)] origin-left transition-none"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
