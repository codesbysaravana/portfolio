'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Responsive breakpoint hook.
 * @param query - Media query string, e.g. '(min-width: 1024px)'
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  // Server snapshot: media queries don't exist on the server, default to false
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
