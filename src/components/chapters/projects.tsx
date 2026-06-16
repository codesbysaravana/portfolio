'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chapter } from '@/components/layout/chapter';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { MaskReveal } from '@/components/motion/mask-reveal';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { Project } from '@/types/project';

/**
 * Chapter 5 — Projects
 *
 * The centerpiece. Each project is a full-viewport cinematic spread.
 * Massive editorial typography. Asymmetric compositions. Cinematic reveals.
 *
 * Replace the placeholder data with your actual projects.
 */

const PROJECTS: (Project & { image: string })[] = [
  {
    slug: 'omnibot',
    title: 'Omnibot',
    category: 'Web Application',
    year: '2024',
    description:
      'Redefining the relationship between human intent and robotic precision.',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1400&auto=format&fit=crop',
    link: '#',
  },
  {
    slug: 'nephele',
    title: 'Nephele',
    category: 'Design System',
    year: '2023',
    description: 'Atmospheric architecture for the digital age.',
    image:
      'https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1400&auto=format&fit=crop',
    link: '#',
  },
  {
    slug: 'microps',
    title: 'Microps',
    category: 'Open Source',
    year: '2023',
    description:
      'Precision micro-mechanics. The invisible structures defining modern luxury.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1400&auto=format&fit=crop',
    link: '#',
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED TYPOGRAPHY STYLES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Massive editorial serif — the project name becomes a graphic element */
const TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-playfair), Georgia, serif',
  fontSize: 'clamp(4.5rem, 14vw, 13rem)',
  fontWeight: 900,
  lineHeight: 0.85,
  letterSpacing: '-0.04em',
  color: 'var(--portfolio-fg-primary)',
  textTransform: 'uppercase',
};

const META_STYLE: React.CSSProperties = {
  fontSize: 'var(--font-size-overline, 0.6875rem)',
  letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
};

const DESC_STYLE: React.CSSProperties = {
  fontSize:
    'var(--font-size-body-lg, clamp(1.125rem, 1.5vw, 1.375rem))',
  lineHeight: 'var(--line-height-body-lg, 1.7)',
};

const CTA_STYLE: React.CSSProperties = {
  fontSize: 'var(--font-size-caption, 0.8125rem)',
  letterSpacing: 'var(--letter-spacing-caption, 0.04em)',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPER COMPONENTS (inline, not exported)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** "01 — Web Application" metadata label */
function ProjectMeta({
  index,
  category,
}: {
  index: number;
  category: string;
}) {
  return (
    <AnimateOnScroll preset="fadeUp">
      <span
        className="block mb-6 md:mb-8 font-mono text-[var(--portfolio-fg-tertiary)] uppercase"
        style={META_STYLE}
      >
        {String(index + 1).padStart(2, '0')} — {category}
      </span>
    </AnimateOnScroll>
  );
}

/** Accent-underlined "VIEW CASE" link */
function ViewCaseLink({
  href,
  delay = 0.6,
}: {
  href: string;
  delay?: number;
}) {
  return (
    <AnimateOnScroll preset="fadeUp" delay={delay}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-block mt-6 uppercase font-mono text-[var(--portfolio-fg-primary)] transition-colors hover:text-[var(--portfolio-accent)]"
        style={CTA_STYLE}
      >
        <span>View Case</span>
        <span className="absolute left-0 -bottom-1.5 h-px w-full bg-[var(--portfolio-accent)] origin-left transition-transform duration-300 group-hover:scale-x-110" />
      </a>
    </AnimateOnScroll>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CINEMATIC PROJECT SPREAD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ProjectCinematic({
  title,
  category,
  description,
  image,
  link,
  index,
}: Project & { image: string; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const variant = index % 3;

  /* Alternate image reveal direction per variant */
  const revealDir = variant === 1 ? ('right' as const) : ('left' as const);

  /* Cinematic parallax — image drifts against scroll */
  useGSAP(
    () => {
      if (prefersReduced || !imageRef.current || !sectionRef.current) return;

      const img = imageRef.current.querySelector('img');
      if (!img) return;

      // Scale provides headroom for vertical translation
      gsap.set(img, { scale: 1.15 });

      gsap.fromTo(
        img,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReduced] }
  );

  return (
    <article
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40"
    >
      {/* Project index + category */}
      <ProjectMeta index={index} category={category} />

      {/* ━━ Variant 0: Title with overlapping right image ━━
          The image floats over the right side of the massive title,
          creating the editorial layered composition from the reference. */}
      {variant === 0 && (
        <div className="relative">
          <MaskReveal direction="up">
            <h3 style={TITLE_STYLE} className="relative z-[1]">
              {title}
            </h3>
          </MaskReveal>

          {/* Image — absolute on desktop, overlaps the title */}
          <div
            ref={imageRef}
            className="relative mt-8 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-[45%] lg:w-[48%]"
            style={{ zIndex: 5 }}
          >
            <MaskReveal direction={revealDir} delay={0.3}>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={image}
                  alt={`${title} project`}
                  className="w-full h-full object-cover will-change-transform"
                />
              </div>
            </MaskReveal>
          </div>

          {/* Description — anchored below, left */}
          <div
            className="relative mt-12 lg:mt-24 max-w-md"
            style={{ zIndex: 10 }}
          >
            <AnimateOnScroll preset="fadeUp" delay={0.5}>
              <p
                className="text-[var(--portfolio-fg-secondary)]"
                style={DESC_STYLE}
              >
                {description}
              </p>
            </AnimateOnScroll>
            {link && <ViewCaseLink href={link} />}
          </div>
        </div>
      )}

      {/* ━━ Variant 1: Title top, wide image left, text right ━━
          Like an editorial spread — image dominates the left 7 columns,
          description anchors bottom-right for asymmetric balance. */}
      {variant === 1 && (
        <div className="relative">
          <MaskReveal direction="up">
            <h3 style={TITLE_STYLE}>{title}</h3>
          </MaskReveal>

          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div ref={imageRef} className="lg:col-span-7">
              <MaskReveal direction={revealDir} delay={0.3}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={`${title} project`}
                    className="w-full h-full object-cover will-change-transform"
                  />
                </div>
              </MaskReveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end lg:self-end lg:pb-4">
              <AnimateOnScroll preset="fadeUp" delay={0.5}>
                <p
                  className="text-[var(--portfolio-fg-secondary)] max-w-sm"
                  style={DESC_STYLE}
                >
                  {description}
                </p>
              </AnimateOnScroll>
              {link && <ViewCaseLink href={link} />}
            </div>
          </div>
        </div>
      )}

      {/* ━━ Variant 2: Title top, tall image left, text right ━━
          Portrait-oriented image creates vertical tension.
          Description floats mid-right for documentary pacing. */}
      {variant === 2 && (
        <div className="relative">
          <MaskReveal direction="up">
            <h3 style={TITLE_STYLE}>{title}</h3>
          </MaskReveal>

          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div ref={imageRef} className="lg:col-span-5">
              <MaskReveal direction={revealDir} delay={0.3}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={image}
                    alt={`${title} project`}
                    className="w-full h-full object-cover will-change-transform"
                  />
                </div>
              </MaskReveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-7 flex flex-col justify-start lg:pt-12">
              <AnimateOnScroll preset="fadeUp" delay={0.5}>
                <p
                  className="text-[var(--portfolio-fg-secondary)] max-w-sm"
                  style={DESC_STYLE}
                >
                  {description}
                </p>
              </AnimateOnScroll>
              {link && <ViewCaseLink href={link} />}
            </div>
          </div>
        </div>
      )}
    </article>
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

      {/* Cinematic project spreads — each owns the viewport */}
      {PROJECTS.map((project, i) => (
        <ProjectCinematic key={project.slug} index={i} {...project} />
      ))}
    </Chapter>
  );
}
