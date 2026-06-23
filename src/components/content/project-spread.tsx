'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
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
 * Large image with mask reveal, title with clip-path, metadata with staggered fadeUp.
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
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReduced = useReducedMotion();

  // Pin effect and staggered master reveal timeline
  useGSAP(() => {
    if (prefersReduced || !spreadRef.current) return;

    if (isDesktop) {
      ScrollTrigger.create({
        trigger: spreadRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spreadRef.current,
        start: 'top 75%',
      },
    });

    if (imageRevealRef.current) {
      tl.fromTo(
        imageRevealRef.current,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.05 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.5, ease: 'expo.out' },
        0
      );
    }

    if (metaRef.current) {
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
        0.2
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { clipPath: 'inset(100% 0 0 0)', y: 20 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'expo.out' },
        0.3
      );
    }

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
        0.4
      );
    }

    if (linkRef.current) {
      tl.fromTo(
        linkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
        0.5
      );
    }
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
        <div ref={imageRevealRef} className="will-change-[clip-path,transform] mb-8 md:mb-12" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[var(--portfolio-bg-elevated)]">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={`${title} project screenshot`}
            />
          </div>
        </div>
      )}

      {/* Project content */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <div ref={metaRef} className="will-change-[opacity,transform] opacity-0">
            <span
              className="block mb-3 font-mono text-[var(--portfolio-fg-tertiary)] uppercase"
              style={{
                fontSize: 'var(--font-size-overline, 0.6875rem)',
                letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
              }}
            >
              {category} — {year}
            </span>
          </div>

          <div ref={titleRef} className="will-change-[clip-path,transform]" style={{ clipPath: 'inset(100% 0 0 0)' }}>
            <h3
              className="text-[var(--portfolio-fg-primary)] mb-4"
            >
              {title}
            </h3>
          </div>

          <div ref={descRef} className="will-change-[opacity,transform] opacity-0">
            <p
              className="max-w-[50ch] text-[var(--portfolio-fg-secondary)]"
              style={{
                fontSize: 'var(--font-size-body-lg, clamp(1.125rem, 1.5vw, 1.375rem))',
                lineHeight: 'var(--line-height-body-lg, 1.7)',
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {link && (
          <div ref={linkRef} className="will-change-[opacity,transform] opacity-0">
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
          </div>
        )}
      </div>
    </article>
  );
}
