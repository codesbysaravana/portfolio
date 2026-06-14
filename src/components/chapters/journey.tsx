'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { TimelineNode } from '@/components/content/timeline-node';

/**
 * Chapter 3 — Journey
 *
 * Your story told as a vertical timeline.
 * Not a resume — a narrative arc.
 *
 * Replace the placeholder data with your actual journey.
 */

const TIMELINE_DATA = [
  {
    year: '2020',
    title: 'Your First Milestone',
    description: 'Describe the beginning of your journey. What sparked your interest? What was the first step?',
  },
  {
    year: '2021',
    title: 'Your Second Milestone',
    description: 'What changed? What did you learn? Where did you grow?',
  },
  {
    year: '2022',
    title: 'Your Third Milestone',
    description: 'A turning point. A project, a decision, or a realization that shaped your direction.',
  },
  {
    year: '2023',
    title: 'Your Fourth Milestone',
    description: 'Where you are now. What you\'ve built. What you\'ve become.',
  },
];

export function ChapterJourney() {
  return (
    <Chapter id="journey" bg="elevated" label="Journey">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={3} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24">
          The Journey
        </Headline>

        <Container width="narrow" center={false}>
          <div className="relative">
            {TIMELINE_DATA.map((node, i) => (
              <TimelineNode
                key={i}
                year={node.year}
                title={node.title}
                description={node.description}
              />
            ))}
          </div>
        </Container>
      </Container>
    </Chapter>
  );
}
