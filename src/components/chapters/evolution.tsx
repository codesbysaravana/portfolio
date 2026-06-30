'use client';

import { useState } from 'react';
import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

/**
 * Chapter — The Evolution
 *
 * Unified narrative chapter merging Journey storytelling with
 * Experience milestones. A single cohesive scroll experience
 * combining timeline interaction, sticky image panel, energy
 * conduit particles, and embedded achievement milestones.
 */

interface EvolutionEntry {
  year: string;
  title: string;
  description: string;
  milestones: string[];
  image: string;
  color: string;
}

const EVOLUTION_DATA: EvolutionEntry[] = [
  {
    year: '2023',
    title: 'The Beginning',
    description:
      'My journey started with curiosity. As a first-year AI & Data Science student, I found myself constantly asking how software, websites, and the technology around me actually worked. Learning to code became more than a skill—it became a way of understanding the world.',
    milestones: [
      'Started AI & Data Science degree',
      'Began learning programming fundamentals',
      'Built first projects and prototypes',
    ],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    color: '#f43f5e',
  },
  {
    year: '2024',
    title: 'The Builder',
    description:
      'Curiosity turned into creation. I began building projects relentlessly—frontend applications, backend APIs, databases, and automation tools. Every project became an experiment, every bug became a lesson, and every deployment pushed me one step closer to becoming a real engineer.',
    milestones: [
      'Built frontend applications with React',
      'Built backend services and REST APIs',
      'Learned databases and data modeling',
      'Deployed projects to production',
    ],
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop',
    color: '#10b981',
  },
  {
    year: '2025',
    title: 'Cloud, DevOps & Scale',
    description:
      'My focus shifted beneath the application layer. I became fascinated by cloud architecture, containers, CI/CD pipelines, Kubernetes, infrastructure automation, and distributed systems. This was also the year I won an AI & Cloud Hackathon and began building products that combined Backend Engineering, Cloud Computing, DevOps, and AI.',
    milestones: [
      'Frontend Developer Intern — Dexwox Innovations',
      '1st Place — AI & Cloud Hackathon (60+ teams)',
      'Built cloud-native systems on AWS',
      'Started focusing on infrastructure & DevOps',
    ],
    image:
      '/hackathonwinning.jpg',
    color: '#6366f1',
  },
  {
    year: '2026',
    title: 'Leadership & Impact',
    description:
      'Today, I serve as the AWS Student Builder Groups Leader while continuing to build cloud-native and AI-powered products. Beyond writing code, I focus on creating opportunities for others—sharing knowledge, leading communities, organizing initiatives, and helping students discover the same excitement for technology that started this journey.',
    milestones: [
      'AWS Student Builder Groups Leader',
      'Organized technical events and speaker sessions',
      'Building MicrOps, an open-source backend automation platform, while leading the AWS Student Builder Group.',
      'Mentored students in cloud technologies',
      'Continued building cloud-native products',
    ],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    color: '#eab308',
  },
];

/* ── Energy Conduit Particles ── */
function EnergyConduit({ color }: { color: string }) {
  return (
    <>
      {/* Conduit particle 1 — primary, bright */}
      <span style={{
        position: 'absolute', left: '-2px', top: 0, width: '5px', height: '5px',
        borderRadius: '50%', backgroundColor: color, opacity: 0,
        filter: 'blur(1.5px)',
        boxShadow: `0 0 6px ${color}, 0 0 12px ${color}40`,
        animation: 'xpFlow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Conduit particle 2 — smaller, offset timing */}
      <span style={{
        position: 'absolute', left: '-1px', top: 0, width: '3px', height: '3px',
        borderRadius: '50%', backgroundColor: color, opacity: 0,
        filter: 'blur(1px)',
        boxShadow: `0 0 4px ${color}`,
        animation: 'xpFlow 5.5s cubic-bezier(0.4, 0, 0.2, 1) 1.2s infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Conduit particle 3 — medium, warm glow */}
      <span style={{
        position: 'absolute', left: '-1.5px', top: 0, width: '4px', height: '4px',
        borderRadius: '50%', backgroundColor: color, opacity: 0,
        filter: 'blur(2px)',
        boxShadow: `0 0 8px ${color}, 0 0 3px ${color}80`,
        animation: 'xpFlow 3.5s cubic-bezier(0.4, 0, 0.2, 1) 2.8s infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Conduit particle 4 — faint, slow tail */}
      <span style={{
        position: 'absolute', left: '-0.5px', top: 0, width: '2px', height: '2px',
        borderRadius: '50%', backgroundColor: color, opacity: 0,
        filter: 'blur(2.5px)',
        boxShadow: `0 0 5px ${color}60`,
        animation: 'xpFlow 6s cubic-bezier(0.4, 0, 0.2, 1) 4s infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Trailing bloom — soft glow that follows primary particle */}
      <span style={{
        position: 'absolute', left: '-4px', top: 0, width: '9px', height: '9px',
        borderRadius: '50%', backgroundColor: 'transparent', opacity: 0,
        filter: 'blur(6px)',
        boxShadow: `0 0 14px ${color}30`,
        animation: 'xpFlow 4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Ember sparkle 1 — drifts right */}
      <span style={{
        position: 'absolute', left: '0px', top: 0, width: '2px', height: '2px',
        borderRadius: '50%', backgroundColor: color, opacity: 0,
        filter: 'blur(1px)',
        boxShadow: `0 0 3px ${color}`,
        animation: 'xpEmberRight 4s ease-out 1.8s infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Ember sparkle 2 — drifts left */}
      <span style={{
        position: 'absolute', left: '0px', top: 0, width: '1.5px', height: '1.5px',
        borderRadius: '50%', backgroundColor: color, opacity: 0,
        filter: 'blur(1.5px)',
        boxShadow: `0 0 4px ${color}80`,
        animation: 'xpEmberLeft 5.5s ease-out 3.5s infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Ember sparkle 3 — drifts right, slower */}
      <span style={{
        position: 'absolute', left: '-1px', top: 0, width: '2.5px', height: '2.5px',
        borderRadius: '50%', backgroundColor: color, opacity: 0,
        filter: 'blur(1px)',
        boxShadow: `0 0 5px ${color}60`,
        animation: 'xpEmberRight 6.5s ease-out 5s infinite',
        willChange: 'transform, opacity',
      }} />
    </>
  );
}

/* ── Timeline Node (unified) ── */
function EvolutionNode({
  entry,
  isActive,
  isLast,
  onActivate,
}: {
  entry: EvolutionEntry;
  isActive: boolean;
  isLast: boolean;
  onActivate: () => void;
}) {
  return (
    <AnimateOnScroll preset="fadeUp">
      <article
        className="relative pl-8 md:pl-12 pb-16 cursor-pointer transition-all duration-500"
        onMouseEnter={onActivate}
        style={{ opacity: isActive ? 1 : 0.4 }}
      >
        {/* Timeline dot */}
        <div className="absolute left-0 top-1.5 flex items-center justify-center h-3 w-3">
          <div
            className="absolute rounded-full transition-all duration-500"
            style={{
              width: isActive ? '12px' : '6px',
              height: isActive ? '12px' : '6px',
              backgroundColor: isActive ? entry.color : 'var(--portfolio-fg-tertiary)',
              boxShadow: isActive ? `0 0 16px ${entry.color}, 0 0 4px ${entry.color}` : 'none',
            }}
          />
          {isActive && (
            <div
              className="absolute h-6 w-6 rounded-full animate-ping opacity-25"
              style={{ backgroundColor: entry.color }}
            />
          )}
        </div>

        {/* Timeline line with energy conduit */}
        {!isLast && (
          <div
            className="absolute left-[5px] top-5 bottom-0 w-px transition-all duration-500"
            style={{
              background: isActive
                ? `linear-gradient(to bottom, ${entry.color}, var(--portfolio-border))`
                : 'var(--portfolio-border)',
            }}
          >
            {isActive && <EnergyConduit color={entry.color} />}
          </div>
        )}

        {/* Year */}
        <span
          className="block mb-2 font-mono uppercase transition-colors duration-500"
          style={{
            fontSize: 'var(--font-size-overline, 0.6875rem)',
            letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
            color: isActive ? entry.color : 'var(--portfolio-fg-tertiary)',
            fontWeight: isActive ? 600 : 400,
          }}
        >
          {entry.year}
        </span>

        {/* Title */}
        <h3
          className="mb-3 transition-colors duration-500"
          style={{
            fontSize: 'var(--font-size-title, clamp(1.5rem, 3vw, 2.5rem))',
            lineHeight: 'var(--line-height-title, 1.1)',
            letterSpacing: 'var(--letter-spacing-title, -0.02em)',
            fontWeight: isActive ? 600 : 500,
            color: 'var(--portfolio-fg-primary)',
          }}
        >
          {entry.title}
        </h3>

        {/* Narrative */}
        <p
          className="max-w-[50ch] transition-colors duration-500 mb-4"
          style={{
            fontSize: 'var(--font-size-body, 1rem)',
            lineHeight: 'var(--line-height-body, 1.6)',
            color: isActive ? 'var(--portfolio-fg-primary)' : 'var(--portfolio-fg-secondary)',
          }}
        >
          {entry.description}
        </p>

        {/* Milestones — embedded within the narrative */}
        <div
          className="transition-all duration-500"
          style={{
            maxHeight: isActive ? '300px' : '0px',
            opacity: isActive ? 1 : 0,
            overflow: 'hidden',
          }}
        >
          <span
            className="block mb-2 font-mono uppercase"
            style={{
              fontSize: '0.625rem',
              letterSpacing: '0.14em',
              color: 'var(--portfolio-fg-tertiary)',
            }}
          >
            Key Milestones
          </span>
          <ul className="flex flex-col gap-1.5" style={{ listStyle: 'none', padding: 0 }}>
            {entry.milestones.map((milestone, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{
                  fontSize: 'var(--font-size-body, 1rem)',
                  lineHeight: 'var(--line-height-body, 1.6)',
                  color: 'var(--portfolio-fg-secondary)',
                }}
              >
                <span
                  className="block mt-2.5 shrink-0 w-1 h-1 rounded-full"
                  style={{ backgroundColor: entry.color, opacity: 0.7 }}
                />
                {milestone}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </AnimateOnScroll>
  );
}

/* ── Main Chapter ── */
export function ChapterEvolution() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Chapter id="evolution" bg="elevated" label="The Evolution">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={4} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24">
          The Evolution
        </Headline>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
          {/* Left — Timeline */}
          <div className="relative">
            {EVOLUTION_DATA.map((entry, i) => (
              <EvolutionNode
                key={i}
                entry={entry}
                isActive={activeIndex === i}
                isLast={i === EVOLUTION_DATA.length - 1}
                onActivate={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Right — Sticky Image Panel */}
          <div className="hidden lg:block sticky top-32 h-[600px] w-full rounded-2xl bg-[var(--portfolio-bg-surface)] border border-[var(--portfolio-border)] shadow-xl transition-all duration-700">
            {/* Ambient dynamic color glow */}
            <div
              className="absolute -inset-12 opacity-15 blur-3xl rounded-3xl transition-all duration-1000 -z-10"
              style={{
                background: `radial-gradient(circle, ${EVOLUTION_DATA[activeIndex].color} 0%, transparent 70%)`,
              }}
            />

            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {EVOLUTION_DATA.map((entry, i) => (
                <div
                  key={`img-${i}`}
                  className="absolute inset-0 transition-all duration-[1500ms] ease-in-out"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    zIndex: activeIndex === i ? 10 : 0,
                  }}
                >
                  {/* Subtle cinematic overlay */}
                  <div className="absolute inset-0 bg-black/10 z-10 mix-blend-overlay" />

                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
                    style={{
                      transform: activeIndex === i ? 'scale(1)' : 'scale(1.06)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* ── Keyframes for energy conduit particles ── */}
      <style>{`
        @keyframes xpFlow {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 0.45; }
          25%  { opacity: 0.25; }
          50%  { opacity: 0.4; }
          75%  { opacity: 0.2; }
          95%  { opacity: 0.35; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes xpEmberRight {
          0%   { top: 15%;  transform: translateX(0);    opacity: 0; }
          15%  { opacity: 0.3; }
          40%  { top: 40%;  transform: translateX(8px);  opacity: 0.2; }
          70%  { top: 60%;  transform: translateX(12px); opacity: 0.08; }
          100% { top: 80%;  transform: translateX(6px);  opacity: 0; }
        }
        @keyframes xpEmberLeft {
          0%   { top: 25%;  transform: translateX(0);     opacity: 0; }
          15%  { opacity: 0.25; }
          40%  { top: 45%;  transform: translateX(-7px);  opacity: 0.15; }
          70%  { top: 60%;  transform: translateX(-10px); opacity: 0.06; }
          100% { top: 75%;  transform: translateX(-5px);  opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .xp-particle { display: none !important; }
        }
      `}</style>
    </Chapter>
  );
}
