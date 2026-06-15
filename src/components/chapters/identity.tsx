'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { EditorialText } from '@/components/content/editorial-text';
import { MaskReveal } from '@/components/motion/mask-reveal';
import { ParallaxLayer } from '@/components/motion/parallax-layer';
import Image from 'next/image';

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
              Hands That Build, No Passive Here
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
                <div className="relative h-full w-full">
                  <Image
                    src="/saravanasuit.jpeg"
                    alt="Saravana Priyan"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 70vw, 40vw"
                    quality={90}
                  />
                </div>
              </div>
            </MaskReveal>
          </ParallaxLayer>
        </div>
      </Container>
    </Chapter>
  );
}
