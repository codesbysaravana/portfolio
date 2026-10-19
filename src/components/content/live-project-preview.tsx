'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ProjectContent } from '@/content/projects';

/** Keep page scrolling safe until the visitor chooses to use the embedded app. */
export function LiveProjectPreview({ project }: { project: ProjectContent }) {
  const [interactive, setInteractive] = useState(false);
  const [failed, setFailed] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    // The project landing pages need at least 360px for their own navigation.
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / 360));
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-bg-deep)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--portfolio-border)] px-4 py-3">
        <span className="font-mono text-xs text-[var(--portfolio-fg-secondary)]">
          {project.title} / Live preview
        </span>
        {!failed && (
          <button
            type="button"
            aria-pressed={interactive}
            onClick={() => setInteractive(!interactive)}
            className="min-h-11 rounded border border-[var(--portfolio-border)] px-3 text-xs text-[var(--portfolio-fg-primary)] transition-colors hover:border-[var(--portfolio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--portfolio-accent)]"
          >
            {interactive ? 'Pause interaction' : 'Interact with preview'}
          </button>
        )}
      </div>
      <div ref={viewportRef} className="relative h-[480px] w-full sm:h-[560px] lg:h-[620px]" data-lenis-prevent={interactive ? '' : undefined}>
        {failed ? (
          <Image src={project.image} alt={`${project.title} preview unavailable. Open the project below.`} fill sizes="(max-width: 768px) 100vw, 85vw" className="object-contain object-top" />
        ) : (
          <>
            <iframe
              src={project.link}
              title={`${project.title} live project`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="strict-origin-when-cross-origin"
              inert={!interactive}
              tabIndex={interactive ? 0 : -1}
              className={`h-full w-full border-0 bg-[#101010] ${interactive ? '' : 'pointer-events-none'}`}
              style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: 'top left' }}
              onError={() => setFailed(true)}
            />
            {!interactive && <div className="absolute inset-0" aria-hidden="true" />}
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-[var(--portfolio-border)] px-4 py-2 text-xs text-[var(--portfolio-fg-tertiary)]">
        <p>Preview unavailable or need more room?</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[var(--portfolio-fg-primary)] underline underline-offset-4 hover:text-[var(--portfolio-accent)]">
          Open {project.title} in a new tab ↗
        </a>
      </div>
    </div>
  );
}
