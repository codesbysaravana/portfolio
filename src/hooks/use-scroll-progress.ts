'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the scroll progress of the page (0 → 1).
 * Used for the progress bar and scroll-linked effects.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(scrollTop / docHeight, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
