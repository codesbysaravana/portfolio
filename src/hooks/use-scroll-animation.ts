'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRESETS } from '@/lib/motion/presets';
import { SCROLL_DEFAULTS, STAGGER } from '@/lib/motion/constants';
import { useReducedMotion } from './use-reduced-motion';
import type { PresetName, ScrollTriggerConfig } from '@/types/motion';

interface UseScrollAnimationOptions {
  preset?: PresetName;
  delay?: number;
  stagger?: number;
  duration?: number;
  scrollTrigger?: Partial<ScrollTriggerConfig>;
  /** Selector for child elements to stagger (e.g. ':scope > *') */
  childSelector?: string;
}

/**
 * Scroll-triggered animation hook.
 * Wraps useGSAP + ScrollTrigger for consistent scroll-based entrances.
 *
 * @returns A ref to attach to the container element.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  const {
    preset = 'fadeUp',
    delay = 0,
    stagger: staggerOverride,
    duration: durationOverride,
    scrollTrigger: stConfig,
    childSelector,
  } = options;

  useGSAP(() => {
    if (prefersReduced || !ref.current) return;

    const p = PRESETS[preset];
    const target = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    gsap.fromTo(target, p.from, {
      ...p.to,
      delay,
      duration: durationOverride ?? p.to.duration,
      stagger: staggerOverride ?? (childSelector ? STAGGER.default : undefined),
      scrollTrigger: {
        trigger: ref.current,
        ...SCROLL_DEFAULTS,
        ...stConfig,
      },
    });
  }, { scope: ref, dependencies: [prefersReduced, preset] });

  return ref;
}
