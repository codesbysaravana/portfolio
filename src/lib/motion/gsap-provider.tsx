'use client';

import { useEffect } from 'react';
import { registerGSAPPlugins } from '@/lib/motion/gsap-config';

/**
 * GSAPProvider
 *
 * Registers GSAP plugins on mount. Must wrap any component
 * that uses ScrollTrigger or other GSAP plugins.
 */
export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGSAPPlugins();
  }, []);

  return <>{children}</>;
}
