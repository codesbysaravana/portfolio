import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins immediately at module load time.
// This ensures ScrollTrigger is available before any component mounts.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Re-export for explicit calls if needed.
 */
export function registerGSAPPlugins() {
  gsap.registerPlugin(ScrollTrigger);
}
