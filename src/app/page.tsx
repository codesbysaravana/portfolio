import { ChapterHero } from '@/components/chapters/hero';
import { ChapterIdentity } from '@/components/chapters/identity';
import { ChapterValue } from '@/components/chapters/value';
import { AiWorkflowStrip } from '@/components/chapters/ai-workflow';
import { ChapterEvolution } from '@/components/chapters/evolution';
import { ChapterTechStack } from '@/components/chapters/techstack';
import { ChapterProjects } from '@/components/chapters/projects';
import { ChapterPrinciples } from '@/components/chapters/principles';
import { ChapterFuture } from '@/components/chapters/future';
import { ChapterContact } from '@/components/chapters/contact';
import { ChapterTransition } from '@/components/layout/chapter-transition';
import { ChapterTransitionLast } from '@/components/layout/chapter-transition-last';

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
