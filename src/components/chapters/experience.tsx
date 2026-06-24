'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

/**
 * Chapter 4 — Experience
 *
 * Professional experience and achievements told as a continuation
 * of the Journey chapter's narrative arc.
 */

interface ExperienceEntry {
  year: string;
  title: string;
  organization: string;
  bullets: string[];
  color: string;
}

const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    year: '2025',
    title: 'Frontend Developer Intern',
    organization: 'Dexwox Innovations',
    bullets: [
      'Built and maintained React-based interfaces',
      'Collaborated on feature implementation',
      'Worked in a remote development environment',
    ],
    color: '#6366f1', // Indigo
  },
  {
    year: '2025',
    title: '1st Place — AI & Cloud Hackathon',
    organization: '',
    bullets: [
      'Won among 60+ participating teams',
      'Built a cloud-native AI solution',
      'Presented and demonstrated the solution',
    ],
    color: '#f59e0b', // Amber
  },
  {
    year: '2026',
    title: 'AWS Student Builder Groups Leader',
    organization: '',
    bullets: [
      'Led student cloud initiatives',
      'Organized technical events and speaker sessions',
      'Helped students explore cloud technologies',
    ],
    color: '#10b981', // Emerald
  },
];

function ExperienceNode({
  entry,
  isLast,
}: {
  entry: ExperienceEntry;
  isLast: boolean;
}) {
  return (
    <AnimateOnScroll preset="fadeUp">
      <article className="relative pl-8 md:pl-12 pb-16">
        {/* Timeline dot */}
        <div className="absolute left-0 top-1.5 flex items-center justify-center h-3 w-3">
          <div
            className="absolute rounded-full transition-all duration-500"
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: entry.color,
              boxShadow: `0 0 12px ${entry.color}40, 0 0 4px ${entry.color}60`,
            }}
          />
        </div>

        {/* Timeline line */}
        {!isLast && (
          <div
            className="absolute left-[5px] top-5 bottom-0 w-px"
            style={{
              background: `linear-gradient(to bottom, ${entry.color}, var(--portfolio-border))`,
            }}
          >
            {/* ── Cinematic energy particle system ── */}

            {/* Conduit particle 1 — primary, bright */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '-2px', top: 0, width: '5px', height: '5px',
              borderRadius: '50%', backgroundColor: entry.color, opacity: 0,
              filter: 'blur(1.5px)',
              boxShadow: `0 0 6px ${entry.color}, 0 0 12px ${entry.color}40`,
              animation: 'xpFlow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              willChange: 'transform, opacity',
            }} />

            {/* Conduit particle 2 — smaller, offset timing */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '-1px', top: 0, width: '3px', height: '3px',
              borderRadius: '50%', backgroundColor: entry.color, opacity: 0,
              filter: 'blur(1px)',
              boxShadow: `0 0 4px ${entry.color}`,
              animation: 'xpFlow 5.5s cubic-bezier(0.4, 0, 0.2, 1) 1.2s infinite',
              willChange: 'transform, opacity',
            }} />

            {/* Conduit particle 3 — medium, warm glow */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '-1.5px', top: 0, width: '4px', height: '4px',
              borderRadius: '50%', backgroundColor: entry.color, opacity: 0,
              filter: 'blur(2px)',
              boxShadow: `0 0 8px ${entry.color}, 0 0 3px ${entry.color}80`,
              animation: 'xpFlow 3.5s cubic-bezier(0.4, 0, 0.2, 1) 2.8s infinite',
              willChange: 'transform, opacity',
            }} />

            {/* Conduit particle 4 — faint, slow tail */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '-0.5px', top: 0, width: '2px', height: '2px',
              borderRadius: '50%', backgroundColor: entry.color, opacity: 0,
              filter: 'blur(2.5px)',
              boxShadow: `0 0 5px ${entry.color}60`,
              animation: 'xpFlow 6s cubic-bezier(0.4, 0, 0.2, 1) 4s infinite',
              willChange: 'transform, opacity',
            }} />

            {/* Trailing bloom — soft glow that follows primary particle */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '-4px', top: 0, width: '9px', height: '9px',
              borderRadius: '50%', backgroundColor: 'transparent', opacity: 0,
              filter: 'blur(6px)',
              boxShadow: `0 0 14px ${entry.color}30`,
              animation: 'xpFlow 4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s infinite',
              willChange: 'transform, opacity',
            }} />

            {/* Ember sparkle 1 — drifts right */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '0px', top: 0, width: '2px', height: '2px',
              borderRadius: '50%', backgroundColor: entry.color, opacity: 0,
              filter: 'blur(1px)',
              boxShadow: `0 0 3px ${entry.color}`,
              animation: 'xpEmberRight 4s ease-out 1.8s infinite',
              willChange: 'transform, opacity',
            }} />

            {/* Ember sparkle 2 — drifts left */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '0px', top: 0, width: '1.5px', height: '1.5px',
              borderRadius: '50%', backgroundColor: entry.color, opacity: 0,
              filter: 'blur(1.5px)',
              boxShadow: `0 0 4px ${entry.color}80`,
              animation: 'xpEmberLeft 5.5s ease-out 3.5s infinite',
              willChange: 'transform, opacity',
            }} />

            {/* Ember sparkle 3 — drifts right, slower */}
            <span className="xp-particle" style={{
              position: 'absolute', left: '-1px', top: 0, width: '2.5px', height: '2.5px',
              borderRadius: '50%', backgroundColor: entry.color, opacity: 0,
              filter: 'blur(1px)',
              boxShadow: `0 0 5px ${entry.color}60`,
              animation: 'xpEmberRight 6.5s ease-out 5s infinite',
              willChange: 'transform, opacity',
            }} />

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
          </div>
        )}

        {/* Year */}
        <span
          className="block mb-2 font-mono uppercase"
          style={{
            fontSize: 'var(--font-size-overline, 0.6875rem)',
            letterSpacing: 'var(--letter-spacing-overline, 0.12em)',
            color: entry.color,
            fontWeight: 600,
          }}
        >
          {entry.year}
        </span>

        {/* Title */}
        <h3
          className="mb-1"
          style={{
            fontSize: 'var(--font-size-title, clamp(1.5rem, 3vw, 2.5rem))',
            lineHeight: 'var(--line-height-title, 1.1)',
            letterSpacing: 'var(--letter-spacing-title, -0.02em)',
            fontWeight: 600,
            color: 'var(--portfolio-fg-primary)',
          }}
        >
          {entry.title}
        </h3>

        {/* Organization */}
        {entry.organization && (
          <span
            className="block mb-4 font-mono uppercase"
            style={{
              fontSize: 'var(--font-size-caption, 0.8125rem)',
              letterSpacing: 'var(--letter-spacing-caption, 0.04em)',
              color: 'var(--portfolio-fg-tertiary)',
            }}
          >
            {entry.organization}
          </span>
        )}

        {/* Bullets */}
        <ul
          className="flex flex-col gap-2 mt-3"
          style={{
            listStyle: 'none',
            padding: 0,
          }}
        >
          {entry.bullets.map((bullet, i) => (
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
              {bullet}
            </li>
          ))}
        </ul>
      </article>
    </AnimateOnScroll>
  );
}

export function ChapterExperience() {
  return (
    <Chapter id="experience" bg="primary" label="Experience">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={4} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24">
          Experience
        </Headline>

        <div className="max-w-[700px]">
          {EXPERIENCE_DATA.map((entry, i) => (
            <ExperienceNode
              key={i}
              entry={entry}
              isLast={i === EXPERIENCE_DATA.length - 1}
            />
          ))}
        </div>
      </Container>
    </Chapter>
  );
}
