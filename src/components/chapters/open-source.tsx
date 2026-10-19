'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

interface OpenSourceItem {
  repo: string;
  prNumber: number;
  fix: string;
  status: 'Merged' | 'In review' | 'Open' | 'Approved';
  link: string;
}

const OPEN_SOURCE_ITEMS: OpenSourceItem[] = [
  {
    repo: 'salesforce/tough-cookie',
    prNumber: 650,
    fix: 'cookie-name token validation.',
    status: 'Merged',
    link: 'https://github.com/salesforce/tough-cookie/pull/650',
  },
  {
    repo: 'sequelize/sequelize',
    prNumber: 18555,
    fix: 'fix for a SQL injection in @sequelize/mariadb caused by connection charset mismatch (verifies the real session charset at connect).',
    status: 'In review',
    link: 'https://github.com/sequelize/sequelize/pull/18555',
  },
  {
    repo: 'GoogleContainerTools/jib',
    prNumber: 4536,
    fix: 'fix for registry credentials leaking via an unvalidated auth URL.',
    status: 'Open',
    link: 'https://github.com/GoogleContainerTools/jib/pull/4536',
  },
  {
    repo: 'nodejs/undici',
    prNumber: 5973,
    fix: 'test-only, maintainer-requested.',
    status: 'Approved',
    link: 'https://github.com/nodejs/undici/pull/5973',
  },
];

const STATUS_CONFIG: Record<
  OpenSourceItem['status'],
  { label: string; text: string; bg: string; border: string; glow: string }
> = {
  Merged: {
    label: 'Merged',
    text: '#c084fc',
    bg: 'rgba(168, 85, 247, 0.12)',
    border: 'rgba(168, 85, 247, 0.28)',
    glow: '#a855f7',
  },
  'In review': {
    label: 'In review',
    text: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.28)',
    glow: '#38bdf8',
  },
  Open: {
    label: 'Open',
    text: '#4ade80',
    bg: 'rgba(74, 222, 128, 0.12)',
    border: 'rgba(74, 222, 128, 0.28)',
    glow: '#22c55e',
  },
  Approved: {
    label: 'Approved',
    text: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0.28)',
    glow: '#10b981',
  },
};

function OpenSourceCard({ item, index }: { item: OpenSourceItem; index: number }) {
  const statusCfg = STATUS_CONFIG[item.status];

  return (
    <AnimateOnScroll preset="fadeUp" delay={index * 0.1}>
      <div className="group relative flex flex-col justify-between h-full overflow-hidden rounded-[1.5rem] bg-[var(--portfolio-bg-surface)] border border-[var(--portfolio-border)] p-7 md:p-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-[var(--portfolio-border-hover)]">
        {/* Soft radial glow */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: statusCfg.glow }}
        />

        {/* Subtle colored border glow on hover */}
        <div
          className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ border: `1px solid ${statusCfg.border}` }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header: Repo + PR number & Status Badge */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-[var(--portfolio-fg-tertiary)] group-hover:text-[var(--portfolio-fg-primary)] transition-colors"
                aria-hidden="true"
              >
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <line x1="6" y1="9" x2="6" y2="21" />
              </svg>
              <div className="font-mono text-sm md:text-base font-medium text-[var(--portfolio-fg-primary)] truncate">
                <span>{item.repo}</span>
                <span className="text-[var(--portfolio-fg-tertiary)] ml-1.5">#{item.prNumber}</span>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[0.6875rem] uppercase tracking-wider font-medium"
              style={{
                backgroundColor: statusCfg.bg,
                color: statusCfg.text,
                border: `1px solid ${statusCfg.border}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: statusCfg.text }}
              />
              {statusCfg.label}
            </span>
          </div>

          {/* Fix description */}
          <p className="text-sm md:text-[0.9375rem] text-[var(--portfolio-fg-secondary)] leading-relaxed my-3 flex-1">
            {item.fix}
          </p>

          {/* Action Link */}
          <div className="pt-4 mt-2 border-t border-[var(--portfolio-border)]">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-mono uppercase text-xs tracking-wider text-[var(--portfolio-fg-primary)] transition-colors hover:text-[var(--portfolio-accent)]"
            >
              <span>View Pull Request</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
              <span className="sr-only">for {item.repo} #{item.prNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

/**
 * Chapter 7 — Open Source
 *
 * Security and correctness fixes in widely used libraries.
 */
export function ChapterOpenSource() {
  return (
    <Chapter id="open-source" bg="primary" label="Open Source">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={7} />

        <div className="mb-16 md:mb-24 max-w-2xl">
          <Headline as="h2" size="headline" className="mb-6">
            Open Source
          </Headline>
          <p className="text-lg md:text-xl text-[var(--portfolio-fg-secondary)] leading-relaxed">
            Security and correctness fixes in widely used libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {OPEN_SOURCE_ITEMS.map((item, i) => (
            <OpenSourceCard key={`${item.repo}-${item.prNumber}`} item={item} index={i} />
          ))}
        </div>
      </Container>
    </Chapter>
  );
}
