import { EASE } from './easing';
import type { AnimationPreset, PresetName } from '@/types/motion';

/**
 * Reusable animation presets.
 * Each defines a `from` and `to` state for GSAP.
 */
export const PRESETS: Record<PresetName, AnimationPreset> = {
  fadeUp: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: EASE.enter },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.6, ease: EASE.enter },
  },
  revealLine: {
    from: { y: '110%' },
    to: { y: '0%', duration: 0.7, ease: EASE.dramatic },
  },
  scaleIn: {
    from: { scale: 0.95, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.8, ease: EASE.enter },
  },
  slideFromLeft: {
    from: { x: -60, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: EASE.enter },
  },
  slideFromRight: {
    from: { x: 60, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: EASE.enter },
  },
  maskReveal: {
    from: { clipPath: 'inset(0 0 100% 0)' },
    to: { clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: EASE.dramatic },
  },
} as const;
