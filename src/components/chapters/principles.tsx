'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { PrincipleCard } from '@/components/content/principle-card';

/**
 * Chapter 6 — Principles
 *
 * Core beliefs, condensed. Short, memorable.
 * 2-column grid on desktop, single column on mobile.
 */

const PRINCIPLES = [
  {
    title: 'Build Before You Feel Ready',
    description:
      'Most opportunities are won by execution, not confidence. I learn by building, breaking, shipping, and improving in public.',
  },
  {
    title: 'Systems Over Shortcuts',
    description:
      'I focus on creating scalable systems rather than temporary fixes. Whether it is cloud infrastructure, backend architecture, or workflows, good systems compound.',
  },
  {
    title: 'Learn Through Creation',
    description:
      'Courses teach concepts. Projects teach reality. Every skill I have today was earned through building real products and solving real problems.',
  },
  {
    title: 'Understand before automating',
    description:
      'AI accelerates execution, but understanding creates expertise. I believe in learning the fundamentals, understanding the architecture.',
  },
];

export function ChapterPrinciples() {
  return (
    <Chapter id="principles" bg="primary" label="Principles">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={6} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24">
          Principles
        </Headline>

        <div className="grid gap-x-16 gap-y-4 md:grid-cols-2">
          {PRINCIPLES.map((principle, i) => (
            <PrincipleCard
              key={i}
              number={i + 1}
              title={principle.title}
              description={principle.description}
            />
          ))}
        </div>
      </Container>
    </Chapter>
  );
}
