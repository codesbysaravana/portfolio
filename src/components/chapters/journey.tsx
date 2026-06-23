'use client';

import { useState } from 'react';
import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { TimelineNode } from '@/components/content/timeline-node';

/**
 * Chapter 3 — Journey
 *
 * Your story told as a vertical timeline.
 * Not a resume — a narrative arc.
 *
 * Replace the placeholder data with your actual journey.
 */

const TIMELINE_DATA = [
  {
    year: '2023',
    title: 'The Beginning',
    description:
      'My journey started with curiosity. As a first-year AI & Data Science student, I found myself constantly asking how software, websites, and the technology around me actually worked. Learning to code became more than a skill—it became a way of understanding the world.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    color: '#f43f5e', // Rose
  },
  {
    year: '2024',
    title: 'The Builder',
    description:
      'Curiosity turned into creation. I began building projects relentlessly—frontend applications, backend APIs, databases, and automation tools. Every project became an experiment, every bug became a lesson, and every deployment pushed me one step closer to becoming a real engineer.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop',
    color: '#10b981', // Emerald
  },
  {
    year: '2025',
    title: 'Cloud, DevOps & Scale',
    description:
      'My focus shifted beneath the application layer. I became fascinated by cloud architecture, containers, CI/CD pipelines, Kubernetes, infrastructure automation, and distributed systems. This was also the year I won an AI & Cloud Hackathon and began building products that combined Backend Engineering, Cloud Computing, DevOps, and AI.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
    color: '#6366f1', // Indigo
  },
  {
    year: '2026',
    title: 'Leadership & Impact',
    description:
      'Today, I serve as the AWS Student Builder Groups Leader while continuing to build cloud-native and AI-powered products. Beyond writing code, I focus on creating opportunities for others—sharing knowledge, leading communities, organizing initiatives, and helping students discover the same excitement for technology that started this journey.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    color: '#eab308', // Amber
  },
];

export function ChapterJourney() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Chapter id="journey" bg="elevated" label="Journey">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={3} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24">
          The Journey
        </Headline>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
          {/* Left Side: Timeline */}
          <div className="relative">
            {TIMELINE_DATA.map((node, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className="cursor-pointer"
              >
                <div
                  className={`transition-opacity duration-500 ease-in-out ${
                    activeIndex === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <TimelineNode
                    year={node.year}
                    title={node.title}
                    description={node.description}
                    isActive={activeIndex === i}
                    color={node.color}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Image Panel */}
          <div className="hidden lg:block sticky top-32 h-[600px] w-full rounded-2xl bg-[var(--portfolio-bg-secondary)] border border-[var(--portfolio-border)] shadow-xl transition-all duration-700">
            {/* Ambient dynamic color glow matching active year */}
            <div
              className="absolute -inset-12 opacity-15 blur-3xl rounded-3xl transition-all duration-1000 -z-10"
              style={{
                background: `radial-gradient(circle, ${TIMELINE_DATA[activeIndex].color} 0%, transparent 70%)`,
              }}
            />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {TIMELINE_DATA.map((node, i) => (
                <div
                  key={`img-${i}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* Subtle cinematic overlay */}
                  <div className="absolute inset-0 bg-black/10 z-10 mix-blend-overlay" />

                  <img
                    src={node.image}
                    alt={node.title}
                    className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
                      activeIndex === i ? 'scale-100' : 'scale-110'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Chapter>
  );
}
