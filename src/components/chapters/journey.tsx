'use client';

import { useState } from 'react';
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
    year: 'Chapter 01',
    title: 'The Curiosity',
    description:
      'It started with a simple question: how do the things we use every day actually work? Programming was the entry point, but understanding became the goal.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
  },
  {
    year: 'Chapter 02',
    title: 'The Builder',
    description:
      'What began as small applications evolved into full-stack systems. Every project became an excuse to learn something new and push a little deeper.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop',
  },
  {
    year: 'Chapter 03',
    title: 'The Systems Thinker',
    description:
      'Applications led to databases. Databases led to operating systems, networking, distributed systems, and cloud infrastructure. I became fascinated by the layers beneath the code.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
  },
  {
    year: 'Chapter 04',
    title: 'The Explorer',
    description:
      'Today my focus sits at the intersection of backend engineering, cloud platforms, and AI systems. Not because they are trends, but because they represent some of the most interesting problems to solve.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
  },
];

export function ChapterJourney() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Chapter id="journey" bg="elevated" label="Journey">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={3} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24">
          The Journey
        </Headline>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
          {/* Left Side: Timeline */}
          <div className="relative">
            {TIMELINE_DATA.map((node, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className="cursor-pointer"
              >
                <div
                  className={`transition-opacity duration-500 ease-in-out ${activeIndex === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                >
                  <TimelineNode
                    year={node.year}
                    title={node.title}
                    description={node.description}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Image Panel */}
          <div className="hidden lg:block sticky top-32 h-[600px] w-full rounded-2xl overflow-hidden bg-[var(--portfolio-bg-secondary)] border border-[var(--portfolio-border)] shadow-xl">
            {TIMELINE_DATA.map((node, i) => (
              <div
                key={`img-${i}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                {/* Subtle cinematic overlay */}
                <div className="absolute inset-0 bg-black/10 z-10 mix-blend-overlay" />

                <img
                  src={node.image}
                  alt={node.title}
                  className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${activeIndex === i ? 'scale-100' : 'scale-110'
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Chapter>
  );
}
