'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

/**
 * Chapter 5 — Engineering Domains
 *
 * A premium, museum-like exhibition of engineering capabilities.
 * Features ambient horizontal drift that softly pauses and expands on hover.
 */

interface TechCategory {
  id: string;
  name: string;
  items: string[];
  accent: string;
}

const DOMAINS: TechCategory[] = [
  {
    id: 'backend',
    name: 'Backend Systems',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'RBAC', 'API Design'],
    accent: '#D4AF37', // Warm Gold
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    items: ['AWS', 'EC2', 'S3', 'Lambda', 'IAM', 'ECR'],
    accent: '#E6DDBF', // Champagne Gold
  },
  {
    id: 'devops',
    name: 'DevOps & Automation',
    items: ['Docker', 'Jenkins', 'GitHub Actions', 'Linux', 'CI/CD Pipelines'],
    accent: '#C5A861', // Deep Gold
  },
  {
    id: 'databases',
    name: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'DynamoDB'],
    accent: '#F7E7CE', // Champagne
  },
  {
    id: 'aiml',
    name: 'AI Applications',
    items: ['Ollama Models', 'Amazon Bedrock', 'Google Gemini', 'Prompt Engineering'],
    accent: '#E0BFB8', // Rose Gold
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    items: ['Java', 'JavaScript', 'Python', 'SQL'],
    accent: '#F2E8C6', // Light Ivory
  },
];

function DomainCard({
  category,
  isActive,
  isFaded,
  onHover,
  onLeave,
}: {
  category: TechCategory;
  isActive: boolean;
  isFaded: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // In-place layout transition
      if (isActive) {
        gsap.to(cardRef.current, {
          scale: 1.02,
          backgroundColor: 'rgba(20, 20, 23, 0.95)',
          borderColor: `${category.accent}30`,
          boxShadow: `0 20px 40px -10px rgba(0,0,0,0.6), 0 0 40px ${category.accent}10`,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        });

        // Expand container height to fit items
        gsap.to(contentRef.current, {
          height: 'auto',
          marginTop: 24,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        });

        // Stagger items in
        if (itemsRef.current) {
          gsap.fromTo(
            itemsRef.current.children,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: 'power2.out',
            }
          );
        }
      } else {
        gsap.to(cardRef.current, {
          scale: isFaded ? 0.98 : 1,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          boxShadow: 'none',
          opacity: isFaded ? 0.3 : 1,
          filter: isFaded ? 'blur(3px)' : 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
        });

        // Collapse container
        gsap.to(contentRef.current, {
          height: 0,
          marginTop: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [isActive, isFaded, category.accent]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="flex-shrink-0 w-[280px] md:w-[360px] p-6 md:p-8 rounded-[2rem] border border-transparent transition-colors cursor-default"
      style={{
        backdropFilter: isActive ? 'blur(16px)' : 'none',
      }}
    >
      <div className="flex flex-col h-full items-start">
        {/* Node Label & Dot */}
        <div className="flex items-center gap-4">
          <span
            className="block w-2 h-2 rounded-full relative shrink-0"
            style={{ backgroundColor: category.accent }}
          >
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-50"
              style={{ backgroundColor: category.accent, animationDuration: '4s' }}
            />
          </span>
          <h3
            className="font-mono uppercase whitespace-nowrap m-0"
            style={{
              fontSize: 'var(--font-size-caption, 0.8125rem)',
              letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
              color: isActive ? category.accent : 'var(--portfolio-fg-secondary)',
              fontWeight: isActive ? 600 : 400,
              transition: 'color 0.6s, font-weight 0.6s',
            }}
          >
            {category.name}
          </h3>
        </div>

        {/* Node Content (Items) */}
        <div
          ref={contentRef}
          className="overflow-hidden w-full flex justify-start"
          style={{ height: 0, opacity: 0 }}
        >
          <ul
            ref={itemsRef}
            className="flex flex-col gap-3 items-start w-full"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {category.items.map((item) => (
              <li
                key={item}
                className="whitespace-nowrap"
                style={{
                  fontSize: 'var(--font-size-body-lg, 1.125rem)',
                  lineHeight: 'var(--line-height-body, 1.6)',
                  color: 'var(--portfolio-fg-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EngineeringGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Create a continuous seamless track by duplicating the blocks
  // Total of 12 items. Block 1 (indices 0-5), Block 2 (indices 6-11).
  const extendedDomains = [...DOMAINS, ...DOMAINS];

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      // Infinitely drift to -50% to seamlessly loop the two identical blocks
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40, // 40 seconds per loop for ambient drift
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tweenRef.current) {
      // Smoothly pause timeScale to 0 when hovered, and back to 1 when unhovered
      gsap.to(tweenRef.current, {
        timeScale: activeIndex !== null ? 0 : 1,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full overflow-hidden py-12 md:py-20">
      {/* Soft edge masks to blend the track into the background */}
      <div
        className="absolute inset-y-0 left-0 w-20 md:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--portfolio-bg-elevated) 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 md:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--portfolio-bg-elevated) 0%, transparent 100%)' }}
      />

      {/* The Scrolling Track Container */}
      <div className="flex w-max" ref={trackRef}>

        {/* Block 1 */}
        <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
          {DOMAINS.map((domain, index) => {
            const actualIndex = index;
            return (
              <DomainCard
                key={`${domain.id}-1`}
                category={domain}
                isActive={activeIndex === actualIndex}
                isFaded={activeIndex !== null && activeIndex !== actualIndex}
                onHover={() => setActiveIndex(actualIndex)}
                onLeave={() => setActiveIndex(null)}
              />
            );
          })}
        </div>

        {/* Block 2 (Identical Clone for Seamless Loop) */}
        <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
          {DOMAINS.map((domain, index) => {
            const actualIndex = index + DOMAINS.length;
            return (
              <DomainCard
                key={`${domain.id}-2`}
                category={domain}
                isActive={activeIndex === actualIndex}
                isFaded={activeIndex !== null && activeIndex !== actualIndex}
                onHover={() => setActiveIndex(actualIndex)}
                onLeave={() => setActiveIndex(null)}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}

export function ChapterTechStack() {
  return (
    <Chapter id="techstack" bg="elevated" label="Engineering Domains">
      <Container width="wide" className="py-32 md:py-48 relative">
        <ChapterOverline number={5} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24 relative z-10">
          Engineering Domains
        </Headline>

        <AnimateOnScroll preset="fadeUp">
          <EngineeringGallery />
        </AnimateOnScroll>
      </Container>
    </Chapter>
  );
}
