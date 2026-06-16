'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { TextReveal } from '@/components/motion/text-reveal';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { StaggerGroup } from '@/components/motion/stagger-group';
import { SocialLink } from '@/components/content/social-link';
import { ExternalLink, Mail, ArrowUpRight } from 'lucide-react';

/**
 * Chapter 8 — Contact
 *
 * Clear, confident call to action. End the experience.
 * Email prominent, social links below, copyright at bottom.
 */
export function ChapterContact() {
  return (
    <Chapter id="contact" bg="deep" label="Contact" flush>
      <footer className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 md:px-12 lg:px-24">
        <Container width="narrow" className="text-center">
          <TextReveal
            as="h2"
            className="text-[var(--portfolio-fg-primary)] mb-10"
            stagger={0.08}
            style={{
              fontSize: 'var(--font-size-headline)',
              lineHeight: 'var(--line-height-headline)',
              letterSpacing: 'var(--letter-spacing-headline)',
              fontWeight: 500,
            }}
          >
            Let&apos;s work together
          </TextReveal>

          {/* Email CTA */}
          <AnimateOnScroll preset="fadeUp" delay={0.3}>
            <a
              href="mailto:c.saravanapriyan@gmail.com"
              className="group relative inline-block text-[var(--portfolio-fg-primary)] transition-colors hover:text-[var(--portfolio-accent)]"
              style={{
                fontSize: 'var(--font-size-title)',
                lineHeight: 'var(--line-height-title)',
                letterSpacing: 'var(--letter-spacing-title)',
              }}
            >
              c.saravanapriyan@gmail.com
              <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-100 bg-[var(--portfolio-border)] transition-all duration-300 group-hover:bg-[var(--portfolio-accent)] group-hover:scale-x-100" />
            </a>
          </AnimateOnScroll>

          {/* Social links */}
          <StaggerGroup
            stagger={0.1}
            preset="fadeUp"
            className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8"
          >
            <SocialLink
              href="https://github.com/codesbysaravana"
              label="GitHub"
              icon={<ExternalLink size={16} />}
            />
            <SocialLink
              href="https://www.linkedin.com/in/saravanapriyanc/"
              label="LinkedIn"
              icon={<ExternalLink size={16} />}
            />
            <SocialLink
              href="https://x.com/Saravana_atX"
              label="Twitter"
              icon={<ExternalLink size={16} />}
            />
            <SocialLink
              href="mailto:c.saravanapriyan@gmail.com"
              label="Email"
              icon={<Mail size={16} />}
            />
          </StaggerGroup>
        </Container>

        {/* Copyright */}
        <AnimateOnScroll preset="fadeIn" delay={0.5}>
          <p
            className="absolute bottom-8 left-0 w-full text-center text-[var(--portfolio-fg-tertiary)]"
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: 'var(--letter-spacing-caption)',
            }}
          >
            © {new Date().getFullYear()} saravanapriyanc
          </p>
        </AnimateOnScroll>
      </footer>
    </Chapter>
  );
}
