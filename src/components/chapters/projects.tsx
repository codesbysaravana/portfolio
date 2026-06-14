'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { ProjectSpread } from '@/components/content/project-spread';
import type { Project } from '@/types/project';

/**
 * Chapter 5 — Projects
 *
 * The centerpiece. Each project is a full-viewport spread.
 * Replace placeholder data with your actual projects.
 */

const PROJECTS: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    category: 'Web Application',
    year: '2024',
    description: 'A brief, compelling description of what this project is and why it matters. Focus on impact, not features.',
    link: '#',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    category: 'Design System',
    year: '2023',
    description: 'Another project that demonstrates your craft. What problem did it solve? What was your role?',
    link: '#',
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    category: 'Open Source',
    year: '2023',
    description: 'A third project showcasing a different dimension of your abilities. Breadth and depth.',
    link: '#',
  },
];

export function ChapterProjects() {
  return (
    <Chapter id="projects" bg="deep" label="Projects">
      <Container width="wide" className="py-32 md:py-48">
        <ChapterOverline number={5} />
        <Headline as="h2" size="headline" className="mb-16 md:mb-24">
          Selected Work
        </Headline>

        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectSpread
              key={project.slug}
              index={i}
              {...project}
            />
          ))}
        </div>
      </Container>
    </Chapter>
  );
}
