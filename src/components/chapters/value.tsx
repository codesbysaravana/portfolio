'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { TrueFocus } from '@/components/motion/true-focus';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Value Proposition Section
 *
 * Cinematic scroll-driven narrative that communicates
 * engineering value through massive editorial typography
 * and TrueFocus keyword cycling.
 */

interface ValueChapter {
  statement: string[];
  keywords: string;
  supporting: string;
}

const VALUE_CHAPTERS: ValueChapter[] = [
  {
    statement: ['I build systems,', 'not just features.'],
    keywords: 'SYSTEMS RELIABILITY OWNERSHIP',
    supporting:
      'Every line of code serves a purpose beyond the ticket. I design for maintainability, scalability, and the engineer who inherits it next.',
  },
  {
    statement: ['I think in', 'workflows,', 'automation,', 'and scale.'],
    keywords: 'WORKFLOWS AUTOMATION SCALE',
    supporting:
      'Manual processes are technical debt. I identify repetitive patterns and replace them with systems that compound value over time.',
  },
  {
    statement: ['I ship fast,', 'iterate faster.'],
    keywords: 'DELIVERY EXECUTION IMPACT',
    supporting:
      'Speed without direction is noise. I combine rapid execution with clear architectural intent to deliver outcomes, not just output.',
  },
  {
    statement: ['I own the problem,', 'not just the code.'],
    keywords: 'OWNERSHIP RESPONSIBILITY OUTCOMES',
    supporting:
      'Engineering is not isolated. I understand the business context, the user need, and the operational reality behind every technical decision.',
  },
];

function ValueBlock({
  chapter,
  index,
}: {
  chapter: ValueChapter;
  index: number;
}) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current) return;

    const ctx = gsap.context(() => {
      const lines = blockRef.current!.querySelectorAll('.value-line');
      const focus = blockRef.current!.querySelector('.value-focus');
      const support = blockRef.current!.querySelector('.value-support');

      gsap.set(lines, { opacity: 0, y: 40 });
      gsap.set(focus, { opacity: 0, y: 20 });
      gsap.set(support, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(lines, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      tl.to(
        focus,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.to(
        support,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.2'
      );
    }, blockRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={blockRef}
      className="flex flex-col items-center text-center py-24 md:py-40"
    >
      {/* Massive editorial statement */}
      <div className="mb-12 md:mb-16">
        {chapter.statement.map((line, i) => (
          <div
            key={i}
            className="value-line"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              color: 'var(--portfolio-fg-primary)',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* TrueFocus keyword area */}
      <div
        className="value-focus mb-10 md:mb-14"
        style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          fontFamily: 'var(--font-geist-mono), monospace',
        }}
      >
        <TrueFocus
          sentence={chapter.keywords}
          blurAmount={3}
          borderColor="#C8A86B"
          glowColor="rgba(200,168,107,0.25)"
          animationDuration={1.5}
          pauseBetweenAnimations={1.5}
        />
      </div>

      {/* Supporting copy */}
      <p
        className="value-support max-w-2xl"
        style={{
          fontSize: 'var(--font-size-body-lg, 1.125rem)',
          lineHeight: 'var(--line-height-body, 1.6)',
          color: 'var(--portfolio-fg-secondary)',
          letterSpacing: '-0.01em',
        }}
      >
        {chapter.supporting}
      </p>

      {/* Subtle divider (except last) */}
      {index < VALUE_CHAPTERS.length - 1 && (
        <AnimateOnScroll preset="scaleIn" className="mt-20 md:mt-28 w-full max-w-xs">
          <div
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--portfolio-border), transparent)',
            }}
          />
        </AnimateOnScroll>
      )}
    </div>
  );
}

export function ChapterValue() {
  return (
    <Chapter id="value" bg="deep" label="Value Proposition">
      <Container width="narrow" className="py-32 md:py-48 mx-auto relative">
        <ChapterOverline number={3} />

        {VALUE_CHAPTERS.map((chapter, index) => (
          <ValueBlock key={index} chapter={chapter} index={index} />
        ))}
      </Container>
    </Chapter>
  );
}
