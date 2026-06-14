/**
 * Easing curves for the motion design system.
 * Each curve serves a specific emotional purpose.
 */
export const EASE = {
  /** Primary entrance — confident deceleration */
  enter: 'power3.out',
  /** Exit — quick, decisive */
  exit: 'power2.in',
  /** Smooth scroll-linked — no easing, direct mapping */
  scroll: 'none',
  /** Emphasis — dramatic entrance for hero elements */
  dramatic: 'power4.out',
  /** Subtle — micro-interactions, hovers */
  subtle: 'power1.out',
  /** Elastic — rare, for playful moments only */
  elastic: 'elastic.out(1, 0.5)',
} as const;

export type EaseName = keyof typeof EASE;
