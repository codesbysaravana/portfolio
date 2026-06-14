'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '@/lib/motion/easing';
import { SCROLL_DEFAULTS, STAGGER } from '@/lib/motion/constants';
import { useReducedMotion } from './use-reduced-motion';

interface UseTextRevealOptions {
  /** Stagger delay between words/chars */
  stagger?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Split by 'words' or 'chars' */
  splitType?: 'words' | 'chars';
}

/**
 * Text reveal animation hook.
 *
 * Splits text children into words wrapped in overflow-hidden spans,
 * then animates each word upward from below.
 *
 * The ref should be attached to the text container.
 * The hook will create wrapper spans for each word internally.
 */
export function useTextReveal<T extends HTMLElement = HTMLElement>(
  options: UseTextRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  const {
    stagger = STAGGER.default,
    delay = 0,
    splitType = 'words',
  } = options;

  useGSAP(() => {
    if (prefersReduced || !ref.current) return;

    const el = ref.current;
    const text = el.textContent || '';

    // Split text into units
    const units = splitType === 'words'
      ? text.split(/\s+/).filter(Boolean)
      : text.split('').filter(Boolean);

    // Clear original text and build wrapped spans
    el.innerHTML = '';
    el.setAttribute('aria-label', text);

    units.forEach((unit, i) => {
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.verticalAlign = 'top';
      wrapper.setAttribute('aria-hidden', 'true');

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = unit;
      inner.classList.add('text-reveal-unit');

      wrapper.appendChild(inner);
      el.appendChild(wrapper);

      // Add space between words
      if (splitType === 'words' && i < units.length - 1) {
        const space = document.createTextNode('\u00A0');
        el.appendChild(space);
      }
    });

    // Animate
    const targets = el.querySelectorAll('.text-reveal-unit');
    gsap.fromTo(
      targets,
      { y: '110%' },
      {
        y: '0%',
        duration: 0.7,
        ease: EASE.dramatic,
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          ...SCROLL_DEFAULTS,
        },
      }
    );
  }, { scope: ref, dependencies: [prefersReduced, splitType] });

  return ref;
}
