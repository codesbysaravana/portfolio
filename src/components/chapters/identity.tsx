'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { EditorialText } from '@/components/content/editorial-text';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
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
              I don't chase trends.
              <br className="block lg:hidden" />


            </Headline>

            <div className="flex flex-col gap-6">
              <EditorialText>
                "Engineering should accelerate your business, not constrain it. I build the hidden systems that dictate how fast your team ships, how smoothly your product scales, and how much manual effort is erased by intelligent automation. Instead of writing isolated backend code, I align architecture directly with your business goals
              </EditorialText>
              <EditorialText delay={0.15}>
                Removing operational bottlenecks so your company can move faster, spend less on maintenance, and focus entirely on the customer"
              </EditorialText>
            </div>
          </div>

          {/* Right — Image (optional) */}
          <div className="lg:mt-12">
            <AnimateOnScroll preset="slideFromRight" delay={0.3} duration={1.2}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[var(--portfolio-bg-elevated)]">
                {/* Inner Image Parallax */}
                <ParallaxLayer speed={0.15} className="absolute inset-x-0 -top-[15%] h-[100%] w-full">
                  <Image
                    src="/saravanaglow.jpeg"
                    alt="Saravana Priyan"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 70vw, 40vw"
                    quality={90}
                  />
                </ParallaxLayer>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
    </Chapter>
  );
}
