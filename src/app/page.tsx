import { ChapterHero } from '@/components/chapters/hero';
import { ChapterIdentity } from '@/components/chapters/identity';
import { ChapterJourney } from '@/components/chapters/journey';
import { ChapterPhilosophy } from '@/components/chapters/philosophy';
import { ChapterProjects } from '@/components/chapters/projects';
import { ChapterPrinciples } from '@/components/chapters/principles';
import { ChapterFuture } from '@/components/chapters/future';
import { ChapterContact } from '@/components/chapters/contact';
import { ChapterTransition } from '@/components/layout/chapter-transition';

/**
 * Home Page
 *
 * The entire portfolio is a single vertical scroll journey.
 * 8 chapters separated by breathing-room transitions.
 */
export default function Home() {
  return (
    <main>
      <ChapterHero />
      <ChapterTransition />
      <ChapterIdentity />
      <ChapterTransition />
      <ChapterJourney />
      <ChapterTransition />
      <ChapterPhilosophy />
      <ChapterTransition />
      <ChapterProjects />
      <ChapterTransition />
      <ChapterPrinciples />
      <ChapterTransition />
      <ChapterFuture />
      <ChapterTransition />
      <ChapterContact />
    </main>
  );
}
