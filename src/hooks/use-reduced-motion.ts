'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Detects if the user prefers reduced motion.
 * When true, all GSAP animations should be disabled.
 */
export function useReducedMotion(): boolean {
  // Server snapshot: assume no preference during SSR
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
