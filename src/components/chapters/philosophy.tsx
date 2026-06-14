'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { EditorialText } from '@/components/content/editorial-text';
import { PullQuote } from '@/components/content/pull-quote';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

/**
 * Chapter 4 — Engineering Philosophy
 *
 * How you think about engineering. Full-width editorial layout.
 * Pull quotes punctuate the narrative.
 */
export function ChapterPhilosophy() {
  return (
    <Chapter id="philosophy" bg="primary" label="Engineering Philosophy">
      <Container width="narrow" className="py-32 md:py-48 mx-auto">
        <ChapterOverline number={4} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-20">
          Engineering Philosophy
        </Headline>

        <EditorialText>
          Write about how you think about engineering. What principles guide your decisions? What do you believe about code, craft, and quality?
        </EditorialText>

        <PullQuote delay={0.1}>
          Your first powerful quote about engineering goes here
        </PullQuote>

        <EditorialText delay={0.15}>
          Continue your philosophy. Talk about your approach to problem-solving, your relationship with complexity, your views on simplicity.
        </EditorialText>

        {/* Horizontal rule animation */}
        <AnimateOnScroll preset="scaleIn" className="my-16 md:my-24">
          <div className="h-px w-full bg-[var(--portfolio-border)]" />
        </AnimateOnScroll>

        <EditorialText delay={0.1}>
          Write about what good engineering means to you. What separates craft from code?
        </EditorialText>

        <PullQuote delay={0.15}>
          Your second powerful quote goes here
        </PullQuote>
      </Container>
    </Chapter>
  );
}
