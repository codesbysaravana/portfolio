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
    title: 'Your First Principle',
    description: 'A concise explanation of this belief and how it shapes your work.',
  },
  {
    title: 'Your Second Principle',
    description: 'Another belief that guides your decisions and craft.',
  },
  {
    title: 'Your Third Principle',
    description: 'What you stand for. What you optimize for. What you refuse to compromise on.',
  },
  {
    title: 'Your Fourth Principle',
    description: 'The final principle that completes the picture of who you are as a craftsperson.',
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
