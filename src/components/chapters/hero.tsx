'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Chapter } from '@/components/layout/chapter';
import { ScrollIndicator } from '@/components/motion/scroll-indicator';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * Chapter 1 — Hero: Editorial Z-Index Layered Composition
 *
 * Three-layer depth illusion:
 *   z-1  "Saravana"  — behind the portrait
 *   z-2  Portrait    — middle layer, centered, tall
 *   z-3  "Priyan C"  — in front of the portrait
 *
 * The person appears to stand between the two lines of their own name,
 * creating a magazine-cover / cinematic poster composition.
 */

const NAV_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#identity' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
] as const;

export function ChapterHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Initial hidden state ──
      gsap.set(atmosphereRef.current, { opacity: 0 });
      gsap.set([subtitleRef.current, navRef.current], { opacity: 0, y: 10 });
      gsap.set(firstNameRef.current, { opacity: 0, x: -40 });
      gsap.set(portraitRef.current, { opacity: 0, scale: 1.05 });
      gsap.set(lastNameRef.current, { opacity: 0, x: 40 });

      // ── ENTRANCE TIMELINE ──
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Atmosphere glow fades in
      tl.to(atmosphereRef.current, {
        opacity: 1, duration: 2, ease: 'power2.out',
      }, 0);

      // 2. Subtitle + Nav
      tl.to([subtitleRef.current, navRef.current], {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      }, 0.3);

      // 3. "Saravana" slides in from left
      tl.to(firstNameRef.current, {
        opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
      }, 0.5);

      // 4. Portrait fades in with scale
      tl.to(portraitRef.current, {
        opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out',
      }, 0.7);

      // 5. "Priyan C" slides in from right
      tl.to(lastNameRef.current, {
        opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
      }, 0.9);

      // ── SCROLL-LINKED PARALLAX ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // "Saravana" at 1.3× scroll speed
      if (firstNameRef.current) {
        scrollTl.to(firstNameRef.current, {
          y: '-35%', opacity: 0, ease: 'none',
        }, 0);
      }

      // Portrait at 1×
      if (portraitRef.current) {
        scrollTl.to(portraitRef.current, {
          y: '-10%', opacity: 0, ease: 'none',
        }, 0);
      }

      // "Priyan C" at 0.7×
      if (lastNameRef.current) {
        scrollTl.to(lastNameRef.current, {
          y: '5%', opacity: 0, ease: 'none',
        }, 0);
      }

      // Subtitle + Nav fade
      scrollTl.to([subtitleRef.current, navRef.current], {
        opacity: 0, ease: 'none',
      }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <Chapter id="hero" bg="deep" flush label="Hero">
      <div
        ref={sectionRef}
        style={{
          position: 'relative',
          minHeight: '100dvh',
          overflow: 'hidden',
          background: '#0D0D0F',
        }}
      >
        {/* ━━ Layer 0: Atmosphere ━━ */}
        <div
          ref={atmosphereRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
        />

        {/* ━━ Subtitle — top left ━━ */}
        <div
          ref={subtitleRef}
          style={{
            position: 'absolute',
            top: 48,
            left: 48,
            zIndex: 10,
            fontFamily: 'var(--font-newsreader), serif',
            fontStyle: 'italic',
            fontSize: '0.875rem',
            letterSpacing: '0.08em',
            color: '#888',
          }}
        >
          Elite Engineer &amp; Founder
        </div>

        {/* ━━ Nav — top right ━━ */}
        <nav
          ref={navRef}
          style={{
            position: 'absolute',
            top: 48,
            right: 48,
            zIndex: 10,
            display: 'flex',
            gap: '2rem',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.875rem',
            letterSpacing: '0.08em',
            color: '#aaa',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{ transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#aaa')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ━━ Layer 1: "Saravana" — BEHIND portrait (z-1) ━━ */}
        <div
          ref={firstNameRef}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: 48,
            top: '50%',
            transform: 'translateY(-100%)',
          }}
        >
          <h1
            aria-label="Saravana Priyan C"
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(72px, 12vw, 180px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Saravana
          </h1>
        </div>

        {/* ━━ Layer 2: Portrait — MIDDLE (z-2) ━━ */}
        <div
          ref={portraitRef}
          style={{
            position: 'absolute',
            zIndex: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '70vh',
              width: 'calc(70vh * 0.75)',
            }}
          >
            <Image
              src="/saravana2.png"
              alt="Saravana Priyan"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 640px) 70vw, 40vw"
              quality={90}
              style={{
                filter: 'brightness(0.82) contrast(1.15) saturate(0.85)',
              }}
            />
            {/* Vignette: blends gray photo edges into dark page */}
            <div
              style={{
                position: 'absolute',
                inset: '-15%',
                zIndex: 1,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse 45% 48% at 50% 45%, transparent 30%, #0D0D0F 75%)',
              }}
            />
          </div>
        </div>

        {/* ━━ Layer 3: "Priyan C" — IN FRONT of portrait (z-3) ━━ */}
        <div
          ref={lastNameRef}
          style={{
            position: 'absolute',
            zIndex: 3,
            left: 48,
            top: '50%',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(72px, 12vw, 180px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              display: 'block',
            }}
          >
            Priyan C
          </span>
        </div>

        {/* ━━ Scroll Indicator ━━ */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <ScrollIndicator />
        </div>
      </div>
    </Chapter>
  );
}
