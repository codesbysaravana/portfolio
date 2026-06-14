'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { EditorialText } from '@/components/content/editorial-text';
import { MaskReveal } from '@/components/motion/mask-reveal';
import { ParallaxLayer } from '@/components/motion/parallax-layer';

/**
 * Chapter 2 — Identity
 *
 * Who you are. Asymmetric two-column layout.
 * Large typographic statement + optional portrait.
 */
export function ChapterIdentity() {
  return (
    <Chapter id="identity" bg="primary" label="Identity">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={2} />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20 items-start">
          {/* Left — Text */}
          <div>
            <Headline as="h2" size="headline" className="mb-10">
              Your Identity Statement
            </Headline>

            <div className="flex flex-col gap-6">
              <EditorialText>
                Your first paragraph goes here. Write about who you are, what drives you, and why you do what you do.
              </EditorialText>
              <EditorialText delay={0.15}>
                Your second paragraph continues the story. This is your positioning — not a biography, but a declaration of intent.
              </EditorialText>
            </div>
          </div>

          {/* Right — Image (optional) */}
          <ParallaxLayer speed={-0.15}>
            <MaskReveal direction="up" delay={0.3}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[var(--portfolio-bg-elevated)]">
                {/* Replace with your portrait image */}
                <div className="h-full w-full flex items-center justify-center text-[var(--portfolio-fg-ghost)]">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: 'var(--font-size-caption)', letterSpacing: '0.12em' }}
                  >
                    Your Image
                  </span>
                </div>
              </div>
            </MaskReveal>
          </ParallaxLayer>
        </div>
      </Container>
    </Chapter>
  );
}
