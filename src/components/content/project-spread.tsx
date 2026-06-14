'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
import { EASE } from '@/lib/motion/easing';
import { MaskReveal } from '@/components/motion/mask-reveal';
import { TextReveal } from '@/components/motion/text-reveal';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface ProjectSpreadProps extends Project {
  className?: string;
  index: number;
}

/**
 * ProjectSpread
 *
 * Full-viewport project showcase.
 * Large image with mask reveal, title with text reveal, metadata with fadeUp.
 */
export function ProjectSpread({
  title,
  category,
  year,
  description,
  image,
  link,
  className,
  index,
}: ProjectSpreadProps) {
  const spreadRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReduced = useReducedMotion();

  // Pin effect on desktop only
  useGSAP(() => {
    if (!isDesktop || prefersReduced || !spreadRef.current) return;

    ScrollTrigger.create({
      trigger: spreadRef.current,
      start: 'top top',
      end: '+=150%',
      pin: true,
      pinSpacing: true,
    });
  }, { scope: spreadRef, dependencies: [isDesktop, prefersReduced] });

  return (
    <article
      ref={spreadRef}
      className={cn(
        'relative flex min-h-screen flex-col justify-center py-16 md:py-24',
        className
      )}
    >
      {/* Project image */}
      {image && (
        <MaskReveal direction="left" className="mb-8 md:mb-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[var(--portfolio-bg-elevated)]">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={`${title} project screenshot`}
            />
          </div>
        </MaskReveal>
      )}

      {/* Project content */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <AnimateOnScroll preset="fadeUp" delay={0.1}>
            <span
              className="block mb-3 font-mono text-[var(--portfolio-fg-tertiary)] uppercase"
              style={{
                fontSize: 'var(--font-size-overline, 0.6875rem)',
                letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
              }}
            >
              {category} — {year}
            </span>
          </AnimateOnScroll>

          <TextReveal
            as="h3"
            delay={0.2}
            className="text-[var(--portfolio-fg-primary)] mb-4"
          >
            {title}
          </TextReveal>

          <AnimateOnScroll preset="fadeUp" delay={0.3}>
            <p
              className="max-w-[50ch] text-[var(--portfolio-fg-secondary)]"
              style={{
                fontSize: 'var(--font-size-body-lg, clamp(1.125rem, 1.5vw, 1.375rem))',
                lineHeight: 'var(--line-height-body-lg, 1.7)',
              }}
            >
              {description}
            </p>
          </AnimateOnScroll>
        </div>

        {link && (
          <AnimateOnScroll preset="fadeUp" delay={0.4}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[var(--portfolio-fg-primary)] transition-colors hover:text-[var(--portfolio-accent)]"
              style={{
                fontSize: 'var(--font-size-caption, 0.8125rem)',
                letterSpacing: 'var(--letter-spacing-caption, 0.04em)',
              }}
            >
              <span className="uppercase">View Project</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </AnimateOnScroll>
        )}
      </div>
    </article>
  );
}
