'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chapter } from '@/components/layout/chapter';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { ScrollIndicator } from '@/components/motion/scroll-indicator';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * Chapter 1 — Hero
 *
 * Full viewport. Centered content. Arrested attention.
 * Cinematic backdrop image with independent parallax and text fade-out.
 */
export function ChapterHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation for the cinematic backdrop
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' }
        );
      }

      // 2. Scroll-linked animations (Parallax separation)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text moves up slightly and fades out
      if (contentRef.current) {
        tl.to(contentRef.current, {
          opacity: 0,
          scale: 0.95,
          y: -80,
          ease: 'none',
        }, 0);
      }

      // Image moves down slowly (parallax) and fades to black
      if (imageWrapperRef.current) {
        tl.to(imageWrapperRef.current, {
          y: '30%',
          opacity: 0.2,
          ease: 'none',
        }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <Chapter id="hero" bg="deep" flush label="Hero">
      <div
        ref={sectionRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
      >
        {/* Cinematic Backdrop Image Layer */}
        <div ref={imageWrapperRef} className="absolute inset-0 z-0">
          <Image
            src="/hero_portrait.jpeg"
            alt="Hero Portrait"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          {/* Text-protection scrim — ensures name is readable */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Foreground Content Layer */}
        <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center">
          {/* Name — Display typography */}
          <Headline as="h1" size="display" className="mb-6">
            Saravana Priyan C
          </Headline>

          {/* Role — Secondary text */}
          <AnimateOnScroll preset="fadeUp" delay={0.6}>
            <p
              className="text-[var(--portfolio-fg-secondary)]"
              style={{
                fontSize: 'var(--font-size-body-lg)',
                lineHeight: 'var(--line-height-body-lg)',
                letterSpacing: 'var(--letter-spacing-body-lg)',
              }}
            >
              Backend Platform Engineer
            </p>
          </AnimateOnScroll>

          {/* Scroll indicator */}
          <ScrollIndicator className="mt-16" />
        </div>
      </div>
    </Chapter>
  );
}
