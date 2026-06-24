'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import { ShinyText } from '@/components/motion/shiny-text';
import { LogoLoop } from '@/components/motion/logo-loop';
import {
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiGithubcopilot,
  SiNotion,
  SiRaycast,
  SiWarp,
} from 'react-icons/si';
import { TbWorldSearch } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';

/**
 * AI Workflow Strip
 *
 * Compact editorial insert between Value and Engineering Domains.
 * Communicates modern AI-accelerated engineering workflow
 * without consuming significant scroll space.
 */

const AI_LOGOS = [
  { node: <SiOpenai />, title: 'ChatGPT' },
  { node: <SiAnthropic />, title: 'Claude' },
  { node: <SiGooglegemini />, title: 'Gemini' },
  { node: <VscCode />, title: 'Cursor' },
  { node: <SiGithubcopilot />, title: 'GitHub Copilot' },
  { node: <TbWorldSearch />, title: 'Perplexity' },
  { node: <SiWarp />, title: 'Warp' },
  { node: <SiRaycast />, title: 'Raycast AI' },
  { node: <SiNotion />, title: 'Notion AI' },
];

export function AiWorkflowStrip() {
  return (
    <Chapter id="ai-workflow" bg="deep" label="AI Workflow" flush>
      <Container width="narrow" className="py-4 md:py-8 mx-auto">
        {/* Headline */}
        <AnimateOnScroll preset="fadeUp">
          <h2
            className="text-center"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              color: 'var(--portfolio-fg-primary)',
              margin: 0,
            }}
          >
            <ShinyText
              text="AI-Accelerated"
              speed={4}
              delay={1.5}
              spread={140}
              color="var(--portfolio-fg-primary)"
              shineColor="#c19d41ff"
              direction="left"
            />{' '}
            <span>Execution</span>
          </h2>
        </AnimateOnScroll>

        {/* Supporting copy */}
        <AnimateOnScroll preset="fadeUp" delay={0.1}>
          <p
            className="text-center mx-auto max-w-2xl"
            style={{
              fontSize: 'var(--font-size-body, 1rem)',
              lineHeight: 'var(--line-height-body, 1.6)',
              color: 'var(--portfolio-fg-secondary)',
              marginTop: '10px',
              marginBottom: '20px',
            }}
          >
            Leveraging AI-assisted tooling to accelerate research, architecture
            exploration, debugging, documentation, and delivery—while
            maintaining ownership of every engineering decision.
          </p>
        </AnimateOnScroll>

        {/* LogoLoop */}
        <AnimateOnScroll preset="fadeIn" delay={0.2}>
          <div
            style={{
              position: 'relative',
              height: '48px',
              overflow: 'hidden',
              color: 'var(--portfolio-fg-tertiary)',
            }}
          >
            <LogoLoop
              logos={AI_LOGOS}
              speed={35}
              direction="left"
              logoHeight={42}
              gap={48}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="var(--portfolio-bg-deep)"
              ariaLabel="AI tools used in workflow"
            />
          </div>
        </AnimateOnScroll>
      </Container>
    </Chapter>
  );
}
