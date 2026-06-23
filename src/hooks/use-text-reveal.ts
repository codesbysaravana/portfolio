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

    // Save copy of original child nodes to process them while preserving tags/classes
    const originalNodes = Array.from(el.childNodes);

    // Clear original text and build wrapped spans
    el.innerHTML = '';
    el.setAttribute('aria-label', text);

    const processTextNode = (txt: string, container: HTMLElement) => {
      // Split text into words or characters, keeping whitespaces
      const tokens = splitType === 'words'
        ? (txt.match(/\S+|\s+/g) || [])
        : txt.split('');

      tokens.forEach((token) => {
        if (splitType === 'words' && /^\s+$/.test(token)) {
          // It's whitespace, append a non-breaking space
          container.appendChild(document.createTextNode('\u00A0'));
        } else {
          const wrapper = document.createElement('span');
          wrapper.style.display = 'inline-block';
          wrapper.style.overflow = 'hidden';
          wrapper.style.verticalAlign = 'top';
          wrapper.setAttribute('aria-hidden', 'true');

          const inner = document.createElement('span');
          inner.style.display = 'inline-block';
          inner.textContent = token;
          inner.classList.add('text-reveal-unit');

          wrapper.appendChild(inner);
          container.appendChild(wrapper);
        }
      });
    };

    originalNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        processTextNode(node.textContent || '', el);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const clone = node.cloneNode(false) as HTMLElement; // Clones the node and its attributes/classes, but no children
        processTextNode(node.textContent || '', clone);
        el.appendChild(clone);
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
