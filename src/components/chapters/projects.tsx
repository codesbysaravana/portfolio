'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chapter } from '@/components/layout/chapter';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { MaskReveal } from '@/components/motion/mask-reveal';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { PROJECTS, type ProjectContent } from '@/content/projects';

/**
 * Chapter 5 — Projects
 *
 * Premium product showcase. Each project is a full-viewport cinematic spread.
 * Widescreen dashboard previews. Interactive hover effects. Fullscreen lightbox.
 *
 * Content is sourced from `src/content/projects/index.ts`.
 * Images are widescreen (16:9) application screenshots.
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STYLES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const styles = {
  title: {
    fontFamily: 'var(--font-playfair), Georgia, serif',
    fontSize: 'clamp(3rem, 10vw, 9rem)',
    fontWeight: 900,
    lineHeight: 0.9,
    letterSpacing: '-0.04em',
    color: 'var(--portfolio-fg-primary)',
    textTransform: 'uppercase' as const,
  },
  meta: {
    fontSize: 'var(--font-size-overline, 0.6875rem)',
    letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
  },
  tagline: {
    fontSize: 'var(--font-size-body-lg, clamp(1.125rem, 1.5vw, 1.375rem))',
    lineHeight: 'var(--line-height-body-lg, 1.7)',
  },
  description: {
    fontSize: 'var(--font-size-body, 1rem)',
    lineHeight: 'var(--line-height-body, 1.6)',
  },
  cta: {
    fontSize: 'var(--font-size-caption, 0.8125rem)',
    letterSpacing: 'var(--letter-spacing-caption, 0.04em)',
  },
} as const;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BROWSER WINDOW CHROME
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Fake browser chrome — makes the screenshot feel like a running app */
function BrowserChrome({ title }: { title: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 border-b select-none"
      style={{
        backgroundColor: 'oklch(0.12 0 0)',
        borderColor: 'var(--portfolio-border)',
      }}
    >
      {/* Traffic light dots */}
      <div className="flex gap-1.5">
        <span
          className="block w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: 'oklch(0.65 0.18 28)' }}
        />
        <span
          className="block w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: 'oklch(0.75 0.15 85)' }}
        />
        <span
          className="block w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: 'oklch(0.65 0.17 145)' }}
        />
      </div>
      {/* URL bar */}
      <div
        className="flex-1 mx-3 px-3 py-1 rounded-md text-center truncate font-mono"
        style={{
          backgroundColor: 'oklch(0.08 0 0)',
          color: 'var(--portfolio-fg-tertiary)',
          fontSize: '0.6875rem',
          letterSpacing: '0.02em',
        }}
      >
        {title.toLowerCase()}.app
      </div>
      <div className="w-14" />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INTERACTIVE PROJECT IMAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ProjectImage({
  project,
  onActivate,
}: {
  project: ProjectContent;
  onActivate: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  /* ── Mouse tilt effect ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !containerRef.current || !imageRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * -8; // max ±4 degrees for heavier feel
      const tiltY = (x - 0.5) * 8;

      gsap.to(imageRef.current, {
        rotateX: tiltX,
        rotateY: tiltY,
        scale: 1.03,
        duration: 0.8,
        ease: 'expo.out',
      });

      /* Move glow to cursor position */
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX - rect.left - 150,
          y: e.clientY - rect.top - 150,
          opacity: 1,
          duration: 0.3,
        });
      }
    },
    [prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReduced || !imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 1.2,
      ease: 'expo.out',
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, [prefersReduced]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate();
      }
    },
    [onActivate]
  );

  return (
    <div
      ref={containerRef}
      className="relative group cursor-pointer"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${project.title} — click to view full preview`}
    >
      <div
        ref={imageRef}
        className="relative overflow-hidden rounded-lg will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px var(--portfolio-border)',
        }}
      >
        {/* Browser chrome */}
        <BrowserChrome title={project.title} />

        {/* Preview — video with image fallback */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${project.title} product preview`}
              className="w-full h-full object-cover object-top will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <img
              src={project.image}
              alt={`${project.title} application dashboard`}
              className="w-full h-full object-cover object-top will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}

          {/* Hover overlay — "Explore" label */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono uppercase tracking-widest text-xs backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0 translate-y-4"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'var(--portfolio-fg-primary)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <span>Explore</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </div>
        </div>

        {/* Cursor glow */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none w-[300px] h-[300px] rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, var(--portfolio-glow) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 10,
          }}
        />
      </div>

      {/* Focus ring for keyboard nav */}
      <div
        className="absolute -inset-2 rounded-xl pointer-events-none opacity-0 transition-opacity focus-within:opacity-100"
        style={{
          boxShadow: '0 0 0 2px var(--portfolio-accent)',
        }}
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TECH STACK PILLS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function TechPill({ label }: { label: string }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full font-mono uppercase"
      style={{
        fontSize: '0.625rem',
        letterSpacing: '0.08em',
        backgroundColor: 'var(--portfolio-bg-surface)',
        color: 'var(--portfolio-fg-secondary)',
        border: '1px solid var(--portfolio-border)',
      }}
    >
      {label}
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FULLSCREEN LIGHTBOX — PREMIUM PRODUCT MODAL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Determines whether a link is a real deployable URL (not '#' or empty) */
function isLiveUrl(url?: string): url is string {
  return !!url && url !== '#';
}

function ProjectLightbox({
  project,
  onClose,
}: {
  project: ProjectContent;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const hasLiveUrl = isLiveUrl(project.link);

  /* ── Focus trap + escape handler ── */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  /* ── GSAP entrance — cinematic stagger ── */
  useGSAP(() => {
    if (prefersReduced) return;

    const tl = gsap.timeline();

    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'expo.out' },
        0
      );
    }

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        0.1
      );
    }

    // Staggered section reveals inside modal
    const sections = [identityRef.current, previewRef.current, actionsRef.current].filter(Boolean);
    if (sections.length) {
      tl.fromTo(
        sections,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.1 },
        0.3
      );
    }
  }, { dependencies: [prefersReduced] });

  const handleClose = useCallback(() => {
    if (prefersReduced) {
      onClose();
      return;
    }

    const tl = gsap.timeline({ onComplete: onClose });

    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.98,
        y: 20,
        duration: 0.4,
        ease: 'power3.inOut',
      }, 0);
    }

    if (backdropRef.current) {
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      }, 0.1);
    }
  }, [onClose, prefersReduced]);

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 flex items-start justify-center overflow-y-auto"
      style={{
        zIndex: 9990,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — Product Showcase`}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl mx-auto my-8 md:my-12 px-4 md:px-8"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="fixed top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full transition-all duration-300 z-50 group"
          style={{
            color: 'var(--portfolio-fg-secondary)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          aria-label="Close preview"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:rotate-90 duration-300"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {/* ── Section 1: Project Identity ── */}
        <div ref={identityRef} className="mb-10 md:mb-14 pt-4">
          {/* Category + Year */}
          <span
            className="block mb-4 font-mono uppercase"
            style={{
              ...styles.meta,
              color: 'var(--portfolio-fg-tertiary)',
            }}
          >
            {project.category} — {project.year}
          </span>

          {/* Title */}
          <h3
            className="mb-4"
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--portfolio-fg-primary)',
            }}
          >
            {project.title}
          </h3>

          {/* Tagline */}
          <p
            className="mb-5 max-w-3xl"
            style={{
              ...styles.tagline,
              color: 'var(--portfolio-fg-secondary)',
            }}
          >
            {project.tagline}
          </p>

          {/* Description */}
          <p
            className="max-w-3xl mb-6"
            style={{
              ...styles.description,
              color: 'var(--portfolio-fg-tertiary)',
            }}
          >
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechPill key={tech} label={tech} />
            ))}
          </div>
        </div>

        {/* ── Section 2: Live Product Preview ── */}
        <div ref={previewRef} className="mb-10 md:mb-14">
          <div
            className="overflow-hidden rounded-xl"
            style={{
              boxShadow: '0 50px 100px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            <BrowserChrome title={project.title} />

            {hasLiveUrl ? (
              /* Live iframe — actual deployed application */
              <div
                className="relative w-full overflow-hidden"
                style={{
                  height: 'clamp(400px, 70vh, 800px)',
                  backgroundColor: 'oklch(0.12 0 0)',
                }}
              >
                <iframe
                  src={project.link}
                  title={`${project.title} — Live Product Preview`}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                  className="w-full h-full border-0"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
            ) : project.video ? (
              /* Video fallback when no live URL */
              <div className="aspect-[16/9] overflow-hidden">
                <video
                  src={project.video}
                  poster={project.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={`${project.title} product preview`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              /* Image fallback */
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} application preview`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Section 3: Action Area ── */}
        <div ref={actionsRef} className="pb-8">
          <div className="flex flex-wrap gap-3">
            {hasLiveUrl && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg font-mono uppercase tracking-wider text-xs transition-all duration-300 hover:gap-4"
                style={{
                  backgroundColor: 'var(--portfolio-fg-primary)',
                  color: 'var(--portfolio-bg-deep)',
                }}
              >
                <span>Launch App</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            )}
            {isLiveUrl(project.github) && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono uppercase tracking-wider text-xs transition-all duration-300"
                style={{
                  border: '1px solid var(--portfolio-border)',
                  color: 'var(--portfolio-fg-secondary)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}
            {isLiveUrl(project.architectureLink) && (
              <a
                href={project.architectureLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono uppercase tracking-wider text-xs transition-all duration-300"
                style={{
                  border: '1px solid var(--portfolio-border)',
                  color: 'var(--portfolio-fg-secondary)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M7 2v20" />
                  <path d="M17 2v20" />
                  <path d="M2 12h20" />
                  <path d="M2 7h5" />
                  <path d="M2 17h5" />
                  <path d="M17 7h5" />
                  <path d="M17 17h5" />
                </svg>
                <span>Architecture</span>
              </a>
            )}
            {isLiveUrl(project.caseStudyLink) && (
              <a
                href={project.caseStudyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono uppercase tracking-wider text-xs transition-all duration-300"
                style={{
                  border: '1px solid var(--portfolio-border)',
                  color: 'var(--portfolio-fg-secondary)',
                }}
              >
                <span>Case Study</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECT CINEMATIC SPREAD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ProjectSpread({
  project,
  index,
}: {
  project: ProjectContent;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* ── Cinematic Parallax & Staggered Reveal ── */
  useGSAP(
    () => {
      if (prefersReduced || !sectionRef.current) return;

      // Parallax for image
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Master staggered entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      if (metaRef.current) {
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
          0
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { clipPath: 'inset(100% 0 0 0)', y: 20 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'expo.out' },
          0.1
        );
      }

      if (imageRevealRef.current) {
        tl.fromTo(
          imageRevealRef.current,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.05 },
          { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.5, ease: 'expo.out' },
          0.2
        );
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
          0.4
        );
      }

      if (techRef.current) {
        tl.fromTo(
          techRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
          0.5
        );
      }

      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
          0.6
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReduced] }
  );

  const handleActivate = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      <article
        ref={sectionRef}
        className="relative flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40"
        style={{ minHeight: '100vh' }}
      >
        {/* ── Row 1: Index + Category ── */}
        <div ref={metaRef} className="will-change-[opacity,transform] opacity-0">
          <span
            className="block mb-6 md:mb-8 font-mono uppercase"
            style={{
              ...styles.meta,
              color: 'var(--portfolio-fg-tertiary)',
            }}
          >
            {String(index + 1).padStart(2, '0')} — {project.category}
          </span>
        </div>

        {/* ── Row 2: Massive Title ── */}
        <div ref={titleRef} className="will-change-[clip-path,transform]" style={{ clipPath: 'inset(100% 0 0 0)' }}>
          <h3 style={styles.title} className="mb-10 md:mb-14">
            {project.title}
          </h3>
        </div>

        {/* ── Row 3: Widescreen Product Image ── */}
        <div ref={imageContainerRef} className="will-change-transform">
          <div ref={imageRevealRef} className="will-change-[clip-path,transform]" style={{ clipPath: 'inset(0 100% 0 0)' }}>
            <ProjectImage project={project} onActivate={handleActivate} />
          </div>
        </div>

        {/* ── Row 4: Tagline + Description + Actions ── */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-7">
            <div ref={contentRef} className="will-change-[opacity,transform] opacity-0">
              <p
                className="mb-3"
                style={{
                  ...styles.tagline,
                  color: 'var(--portfolio-fg-primary)',
                }}
              >
                {project.tagline}
              </p>
              <p
                className="max-w-[55ch]"
                style={{
                  ...styles.description,
                  color: 'var(--portfolio-fg-tertiary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Tech pills */}
            <div ref={techRef} className="will-change-[opacity,transform] opacity-0">
              <div className="flex flex-wrap gap-2 mt-5">
                {project.techStack.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-5 lg:col-start-8 flex items-end lg:justify-end gap-4">
            <div ref={actionsRef} className="will-change-[opacity,transform] opacity-0">
              <div className="flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 uppercase font-mono transition-colors hover:text-[var(--portfolio-accent)]"
                    style={{
                      ...styles.cta,
                      color: 'var(--portfolio-fg-primary)',
                    }}
                  >
                    <span>View Project</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                    <span className="absolute left-0 -bottom-1.5 h-px w-full bg-[var(--portfolio-accent)] origin-left transition-transform duration-300 group-hover:scale-x-110" />
                  </a>
                )}
                {project.caseStudyLink && (
                  <a
                    href={project.caseStudyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 uppercase font-mono transition-colors hover:text-[var(--portfolio-accent)]"
                    style={{
                      ...styles.cta,
                      color: 'var(--portfolio-fg-secondary)',
                    }}
                  >
                    <span>Case Study</span>
                    <span className="absolute left-0 -bottom-1.5 h-px w-full bg-[var(--portfolio-border-hover)] origin-left transition-transform duration-300 group-hover:scale-x-110" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <ProjectLightbox project={project} onClose={closeLightbox} />
      )}
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PREMIUM IVORY-GOLD DIVIDER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Thick premium divider between project spreads — uses global --portfolio-accent (ivory-gold) */
function ProjectDivider() {
  return (
    <div
      className="relative flex items-center justify-center px-6 md:px-12 lg:px-24 py-4"
      aria-hidden="true"
    >
      {/* Outer horizontal line — full width, gradient fade */}
      <div
        className="absolute inset-x-6 md:inset-x-12 lg:inset-x-24 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--portfolio-accent-muted) 20%, var(--portfolio-accent) 50%, var(--portfolio-accent-muted) 80%, transparent 100%)',
        }}
      />
      {/* Second line for thickness — offset 2px below */}
      <div
        className="absolute inset-x-6 md:inset-x-12 lg:inset-x-24"
        style={{
          height: '1px',
          marginTop: '3px',
          background:
            'linear-gradient(90deg, transparent 0%, var(--portfolio-accent-muted) 25%, var(--portfolio-accent) 50%, var(--portfolio-accent-muted) 75%, transparent 100%)',
          opacity: 0.4,
        }}
      />
      {/* Center diamond glyph */}
      <span
        className="relative z-10 flex items-center justify-center w-8 h-8"
        style={{
          backgroundColor: 'var(--portfolio-bg-deep)',
        }}
      >
        <span
          className="block w-2 h-2 rotate-45"
          style={{
            backgroundColor: 'var(--portfolio-accent)',
            boxShadow: '0 0 12px var(--portfolio-glow)',
          }}
        />
      </span>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CHAPTER EXPORT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function ChapterProjects() {
  return (
    <Chapter id="projects" bg="deep" label="Projects" flush>
      {/* Section introduction — within standard padding */}
      <div className="px-6 md:px-12 lg:px-24 pt-32 md:pt-48">
        <ChapterOverline number={5} />
        <Headline as="h2" size="headline" className="mb-0">
          Selected Work
        </Headline>
      </div>

      {/* Cinematic project spreads — each owns the viewport, separated by premium gold dividers */}
      {PROJECTS.map((project, i) => (
        <div key={project.slug}>
          <ProjectSpread project={project} index={i} />
          {i < PROJECTS.length - 1 && <ProjectDivider />}
        </div>
      ))}
    </Chapter>
  );
}
