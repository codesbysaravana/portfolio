'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './use-reduced-motion';

/**
 * Parallax depth effect on scroll.
 *
 * @param speed -1 to 1. Negative = moves opposite to scroll direction.
 *              0.2 is subtle, 0.5 is noticeable.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.2
) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    if (prefersReduced || !ref.current) return;

    const yPercent = speed * 100;

    gsap.fromTo(
      ref.current,
      { yPercent: -yPercent * 0.5 },
      {
        yPercent: yPercent * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: ref, dependencies: [prefersReduced, speed] });

  return ref;
}
