'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { CHAPTERS } from '@/types/chapter';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * NavFloat
 *
 * Minimal floating navigation that appears after scrolling past the hero.
 * Shows chapter dots and allows click-to-scroll navigation.
 */
export function NavFloat() {
  const [visible, setVisible] = useState(false);
  const [activeChapter, setActiveChapter] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > window.innerHeight * 0.8);

      // Determine active chapter
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveChapter(CHAPTERS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Chapter navigation"
      className={cn(
        'fixed right-6 top-1/2 z-40 -translate-y-1/2 flex flex-col gap-3 transition-opacity duration-500',
        'hidden lg:flex',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {CHAPTERS.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => scrollTo(chapter.id)}
          className={cn(
            'group relative flex items-center justify-end gap-3',
          )}
          aria-label={`Navigate to ${chapter.label}`}
          aria-current={activeChapter === chapter.id ? 'true' : undefined}
        >
          {/* Label — visible on hover */}
          <span
            className={cn(
              'text-[0.6875rem] uppercase tracking-[0.12em] opacity-0 transition-opacity duration-200 group-hover:opacity-100',
              activeChapter === chapter.id
                ? 'text-[var(--portfolio-fg-primary)]'
                : 'text-[var(--portfolio-fg-tertiary)]'
            )}
          >
            {chapter.label}
          </span>

          {/* Dot */}
          <span
            className={cn(
              'block h-1.5 w-1.5 rounded-full transition-all duration-300',
              activeChapter === chapter.id
                ? 'bg-[var(--portfolio-accent)] scale-125'
                : 'bg-[var(--portfolio-fg-ghost)] group-hover:bg-[var(--portfolio-fg-tertiary)]'
            )}
          />
        </button>
      ))}
    </nav>
  );
}
