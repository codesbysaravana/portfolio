import dynamic from 'next/dynamic';
import { ChapterHero } from '@/components/chapters/hero';
import { ChapterTransition } from '@/components/layout/chapter-transition';

const ChapterIdentity = dynamic(() => import('@/components/chapters/identity').then(mod => mod.ChapterIdentity));
const ChapterValue = dynamic(() => import('@/components/chapters/value').then(mod => mod.ChapterValue));
const AiWorkflowStrip = dynamic(() => import('@/components/chapters/ai-workflow').then(mod => mod.AiWorkflowStrip));
const ChapterEvolution = dynamic(() => import('@/components/chapters/evolution').then(mod => mod.ChapterEvolution));
const ChapterTechStack = dynamic(() => import('@/components/chapters/techstack').then(mod => mod.ChapterTechStack));
const ChapterProjects = dynamic(() => import('@/components/chapters/projects').then(mod => mod.ChapterProjects));
const ChapterPrinciples = dynamic(() => import('@/components/chapters/principles').then(mod => mod.ChapterPrinciples));
const ChapterFuture = dynamic(() => import('@/components/chapters/future').then(mod => mod.ChapterFuture));
const ChapterContact = dynamic(() => import('@/components/chapters/contact').then(mod => mod.ChapterContact));
const ChapterTransitionLast = dynamic(() => import('@/components/layout/chapter-transition-last').then(mod => mod.ChapterTransitionLast));

/**
 * Home Page
 *
 * The entire portfolio is a single vertical scroll journey.
 * 10 chapters separated by breathing-room transitions.
 */
export default function Home() {
  return (
    <main>
      <ChapterHero />
      <ChapterTransition />
      <ChapterIdentity />
      <ChapterValue />
      <ChapterTransition />
      <AiWorkflowStrip />
      <ChapterTransition />
      <ChapterEvolution />
      <ChapterTransition />
      <ChapterTechStack />
      <ChapterTransition />
      <ChapterProjects />
      <ChapterTransition />
      <ChapterPrinciples />
      <ChapterTransition />
      <ChapterFuture />
      <ChapterTransition />
      <ChapterContact />
      <ChapterTransitionLast />
    </main>
  );
}
