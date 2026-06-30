'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { TextReveal } from '@/components/motion/text-reveal';

/**
 * Chapter 7 — Future
 *
 * Full-screen cinematic. Maximum restraint.
 * A single forward-looking statement with accent glow.
 */
export function ChapterFuture() {
  return (
    <Chapter id="future" bg="deep" label="Future">
      <div
        className="relative flex min-h-screen flex-col items-center justify-center py-32"
        style={{
          background: `
            radial-gradient(
              ellipse 50% 40% at 50% 50%,
              var(--portfolio-glow),
              transparent
            ),
            var(--portfolio-bg-deep)
          `,
        }}
      >
        <Container width="narrow" className="text-center">
          <ChapterOverline number={7} />

          <TextReveal
            as="h2"
            className="text-[var(--portfolio-fg-primary)] mb-6"
            stagger={0.08}
            style={{
              fontSize: 'var(--font-size-headline)',
              lineHeight: 'var(--line-height-headline)',
              letterSpacing: 'var(--letter-spacing-headline)',
              fontWeight: 500,
            }}
          >
            What comes next
          </TextReveal>

          <AnimateOnScroll preset="fadeIn" delay={0.5} duration={1}>
            <p
              className="mx-auto max-w-[50ch] text-[var(--portfolio-fg-secondary)]"
              style={{
                fontSize: 'var(--font-size-body-lg)',
                lineHeight: 'var(--line-height-body-lg)',
              }}
            >
              I'm looking for backend or DevOps roles at early-stage startups, and for businesses that need their deployment and operational workflows automated. If that's you, the contact below goes straight to me.
            </p>
          </AnimateOnScroll>
        </Container>
      </div>
    </Chapter>
  );
}
