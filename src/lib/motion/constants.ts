/**
 * Stagger timing constants.
 */
export const STAGGER = {
  /** Rapid sequence — list items */
  fast: 0.05,
  /** Standard stagger */
  default: 0.1,
  /** Dramatic stagger — chapter entrances */
  slow: 0.15,
  /** Between major elements in a chapter */
  chapter: 0.2,
} as const;

/**
 * ScrollTrigger defaults applied to all scroll-triggered animations.
 */
export const SCROLL_DEFAULTS = {
  start: 'top 85%',
  end: 'top 20%',
  toggleActions: 'play none none none' as const,
} as const;
