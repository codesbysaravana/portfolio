'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

interface ArticleItem {
  title: string;
  takeaway: string;
  link: string;
}

const ARTICLES: ArticleItem[] = [
  {
    title: 'Before trusting at-least-once delivery: SIGKILLing BullMQ workers on Amazon EC2',
    takeaway:
      'Killing a worker mid-job caused duplicate side effects with default retries, and making the effect and dedupe check one atomic step fixed it.',
    link: 'https://builder.aws.com/content/3KoTxIUs6CcvEhy98Mt9rYiSnCa/before-trusting-at-least-once-delivery-sigkilling-bullmq-workers-on-amazon-ec2',
  },
  {
    title: 'Before chasing high RPS: designing a Netty benchmark on Amazon EC2',
    takeaway:
      'My first Netty test showed 1.06M req/s on EC2, but without recording setup parameters and client limits, the run wasn\'t repeatable—designing the test harness matters before chasing throughput numbers.',
    link: 'https://builder.aws.com/content/3KQ6baYdvpwGjpraV6ZWjd6xKaJ/before-chasing-high-rps-designing-a-netty-benchmark-on-amazon-ec2',
  },
];

function WritingCard({ article, index }: { article: ArticleItem; index: number }) {
  return (
    <AnimateOnScroll preset="fadeUp" delay={index * 0.15}>
      <div className="group relative flex flex-col justify-between h-full overflow-hidden rounded-[2rem] bg-[var(--portfolio-bg-surface)] border border-[var(--portfolio-border)] p-8 md:p-10 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--portfolio-border-hover)]">
        {/* Soft radial accent glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[90px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: 'var(--portfolio-accent)' }}
        />

        {/* Subtle accent border glow on hover */}
        <div
          className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ border: '1px solid var(--portfolio-accent-muted)' }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Platform Tag */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[var(--portfolio-accent)]" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--portfolio-accent)] font-medium">
                AWS Builder Center
              </span>
            </div>
            <span className="font-mono text-[0.6875rem] text-[var(--portfolio-fg-tertiary)] uppercase tracking-wider">
              Technical Article
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-semibold text-[var(--portfolio-fg-primary)] tracking-tight leading-snug group-hover:text-white transition-colors mb-6">
            {article.title}
          </h3>

          {/* Takeaway Block */}
          <div className="my-auto py-4 px-5 rounded-xl bg-[oklch(1_0_0_/_3%)] border border-[var(--portfolio-border)]">
            <span className="block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--portfolio-fg-tertiary)] mb-2">
              Key Takeaway
            </span>
            <p className="text-sm md:text-[0.9375rem] text-[var(--portfolio-fg-secondary)] leading-relaxed">
              {article.takeaway}
            </p>
          </div>

          {/* Action Link */}
          <div className="pt-6 mt-6 border-t border-[var(--portfolio-border)] flex items-center justify-between">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-mono uppercase text-xs tracking-wider text-[var(--portfolio-fg-primary)] transition-colors hover:text-[var(--portfolio-accent)]"
            >
              <span>Read on AWS Builder Center</span>
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
            </a>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

/**
 * Chapter 8 — Writing
 *
 * Technical publications and takeaways.
 */
export function ChapterWriting() {
  return (
    <Chapter id="writing" bg="elevated" label="Writing">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={8} />

        <div className="mb-16 md:mb-24 max-w-2xl">
          <Headline as="h2" size="headline" className="mb-6">
            Writing
          </Headline>
          <p className="text-lg md:text-xl text-[var(--portfolio-fg-secondary)] leading-relaxed">
            Technical deep dives on systems engineering, performance benchmarks, and failure modes in production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ARTICLES.map((article, i) => (
            <WritingCard key={article.link} article={article} index={i} />
          ))}
        </div>
      </Container>
    </Chapter>
  );
}
