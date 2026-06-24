'use client';

import { useState } from 'react';
import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';
import BorderGlow from '@/components/motion/border-glow';

/**
 * Chapter 5 — Engineering Domains
 *
 * A premium, stable, editorial exhibition of engineering capabilities.
 * Split-layout design: list on the left, persistent content panel on the right.
 */

interface TechCategory {
  id: string;
  name: string;
  items: string[];
  accent: string;
}

const DOMAINS: TechCategory[] = [
  {
    id: 'backend',
    name: 'Backend Systems',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'RBAC', 'API Design'],
    accent: '#D4AF37', // Warm Gold
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    items: ['AWS', 'EC2', 'S3', 'Lambda', 'IAM', 'ECR'],
    accent: '#E6DDBF', // Champagne Gold
  },
  {
    id: 'devops',
    name: 'DevOps & Automation',
    items: ['Docker', 'Jenkins', 'GitHub Actions', 'Linux', 'CI/CD Pipelines'],
    accent: '#C5A861', // Deep Gold
  },
  {
    id: 'databases',
    name: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'DynamoDB'],
    accent: '#F7E7CE', // Champagne
  },
  {
    id: 'aiml',
    name: 'AI Applications',
    items: ['Ollama Models', 'Amazon Bedrock', 'Google Gemini', 'Prompt Engineering'],
    accent: '#E0BFB8', // Rose Gold
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    items: ['Java', 'JavaScript', 'Python', 'SQL'],
    accent: '#F2E8C6', // Light Ivory
  },
];

function DomainExplorer() {
  // First domain is active by default so the panel is never empty
  const [activeId, setActiveId] = useState<string>(DOMAINS[0].id);

  return (
    <div className="w-full pt-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-24 items-start">

        {/* Left Side: Navigation List */}
        <nav
          className="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-3"
          aria-label="Engineering Domains Navigation"
        >
          {DOMAINS.map((domain) => {
            const isActive = activeId === domain.id;

            return (
              <button
                key={domain.id}
                onClick={() => setActiveId(domain.id)}
                onMouseEnter={() => setActiveId(domain.id)}
                className="relative text-left px-5 py-4 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                }}
                aria-pressed={isActive}
              >
                {/* Active Indicator Line (Desktop: left, Mobile: bottom or hidden. Using a subtle glow/border instead for luxury feel) */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-500 ease-out hidden lg:block"
                  style={{
                    height: isActive ? '60%' : '0%',
                    backgroundColor: domain.accent,
                    boxShadow: isActive ? `0 0 12px ${domain.accent}60` : 'none',
                    opacity: isActive ? 1 : 0,
                  }}
                />

                <div className="flex items-center gap-3">
                  {/* Subtle Dot Indicator */}
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: isActive ? domain.accent : 'var(--portfolio-fg-tertiary)',
                      transform: isActive ? 'scale(1.5)' : 'scale(1)',
                      boxShadow: isActive ? `0 0 8px ${domain.accent}80` : 'none',
                      opacity: isActive ? 1 : 0.3,
                    }}
                  />
                  <span
                    className="font-mono uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-500"
                    style={{
                      fontSize: 'var(--font-size-caption, 0.8125rem)',
                      color: isActive ? domain.accent : 'var(--portfolio-fg-tertiary)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {domain.name}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Persistent Content Panel */}
        <BorderGlow
          className="w-full min-h-[350px] lg:min-h-[400px]"
          edgeSensitivity={20}
          glowColor="42 55 72"
          backgroundColor="var(--portfolio-bg-surface)"
          borderRadius={32}
          glowRadius={24}
          glowIntensity={0.25}
          coneSpread={18}
          animated={false}
          colors={['#D4AF37', '#E8D9B5', '#C5A861']}
        >
          <div className="relative w-full h-full flex items-center p-8 lg:p-12">
            {DOMAINS.map((domain) => {
              const isActive = activeId === domain.id;

              return (
                <div
                  key={`panel-${domain.id}`}
                  className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-center transition-all duration-700 ease-out pointer-events-none"
                  style={{
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? 'visible' : 'hidden',
                    transform: `translateY(${isActive ? '0px' : '10px'})`,
                    zIndex: isActive ? 10 : 0,
                  }}
                >
                  {/* Domain Title inside the panel */}
                  <h3
                    className="mb-8"
                    style={{
                      fontSize: 'var(--font-size-title, clamp(1.5rem, 3vw, 2.5rem))',
                      lineHeight: 'var(--line-height-title, 1.1)',
                      letterSpacing: 'var(--letter-spacing-title, -0.02em)',
                      fontWeight: 500,
                      color: 'var(--portfolio-fg-primary)',
                    }}
                  >
                    {domain.name}
                  </h3>

                  {/* Items List */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {domain.items.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 transition-all duration-700 ease-out"
                        style={{
                          fontSize: 'var(--font-size-body-lg, 1.125rem)',
                          lineHeight: 'var(--line-height-body, 1.6)',
                          color: 'var(--portfolio-fg-secondary)',
                          letterSpacing: '-0.01em',
                          opacity: isActive ? 1 : 0,
                          transform: `translateX(${isActive ? '0px' : '-10px'})`,
                          transitionDelay: isActive ? `${i * 0.05}s` : '0s',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: domain.accent, opacity: 0.5 }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Ambient Subtle Glow matching the domain accent */}
                  <div
                    className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full blur-[80px] opacity-10 transition-colors duration-1000 -z-10"
                    style={{ backgroundColor: domain.accent }}
                  />
                </div>
              );
            })}
          </div>
        </BorderGlow>
      </div>
    </div>
  );
}

export function ChapterTechStack() {
  return (
    <Chapter id="techstack" bg="elevated" label="Engineering Domains">
      <Container width="wide" className="py-32 md:py-48 relative">
        <ChapterOverline number={5} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24 relative z-10">
          Engineering Domains
        </Headline>

        <AnimateOnScroll preset="fadeUp">
          <DomainExplorer />
        </AnimateOnScroll>
      </Container>
    </Chapter>
  );
}
