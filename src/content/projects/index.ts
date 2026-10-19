/**
 * Project Content — Single Source of Truth
 *
 * All project data lives here. To add or edit projects,
 * modify this file. The Projects showcase component
 * consumes this data directly — no hardcoded content.
 *
 * Architecture: Each project is a typed object with all
 * content fields. The component renders them in order.
 */

export interface ProjectContent {
  /** URL-safe identifier */
  slug: string;
  /** Display name — rendered as massive editorial typography */
  title: string;
  /** Category label (e.g., "Web Application", "Design System") */
  category: string;
  /** Year of creation/release */
  year: string;
  /** One-line tagline — shown prominently below the image */
  tagline: string;
  /** Full description — sourced from markdown content */
  description: string;
  /** Technologies used — rendered as pills */
  techStack: string[];
  /** Widescreen (16:9) product screenshot path */
  image: string;
  /** Live demo URL */
  link?: string;
  /** Optional case study URL */
  caseStudyLink?: string;
  /** Looping preview video path (mp4). Falls back to image if not provided. */
  video?: string;
  /** GitHub repository URL */
  github?: string;
  /** Dedicated Grafana dashboard link */
  grafanaLink?: string;
  /** Architecture documentation or diagram URL */
  architectureLink?: string;
  /** If true, lightbox displays the static image screenshot instead of embedding the live URL in an iframe */
  disableIframe?: boolean;
}

export const PROJECTS: ProjectContent[] = [
  {
    slug: 'microps',
    title: 'MicrOps',
    category: 'DevOps & Cloud Platform',
    year: '2026',
    tagline: 'Automated container deployment platform on AWS ECS Fargate.',
    description:
      'A deployment platform that automates container builds and deployments to AWS ECS Fargate from a Git repository. Connect a repository and the system runs asynchronous Docker builds using BullMQ workers, streams real-time deployment logs over Server-Sent Events, provisions ECS services, and assists with build failure diagnostics.',
    techStack: [
      'TypeScript',
      'React',
      'Node.js',
      'PostgreSQL',
      'Redis & BullMQ',
      'AWS ECS Fargate',
      'Docker',
      'GitHub Actions',
    ],
    image: '/projects/microps.png',
    link: 'https://microps-development.vercel.app/',
    github: 'https://github.com/codesbysaravana/microps',
  },
  {
    slug: 'codepro',
    title: 'CodePro',
    category: 'Code Execution Engine',
    year: '2026',
    tagline: "Production code-execution engine powering placement practice at St Joseph's, Chennai.",
    description:
      "I built the code-execution engine behind CodePro, an online judge used for placement practice at St Joseph's, Chennai. It runs in production from my repo's main branch.",
    techStack: ['Judge0', 'BullMQ', 'Redis', 'Node.js'],
    image: '/projects/codepro.png',
    link: 'https://codepro-green.vercel.app/',
    grafanaLink: 'https://grafana.stjosephsplacements.in/public-dashboards/b65e72b16769417c803e9001efa06da8',
    github: 'https://github.com/codesbysaravana/codepro',
  },
  {
    slug: 'nephele',
    title: 'Nephele',
    category: 'Voice AI Assistant',
    year: '2026',
    tagline: 'Real-time voice assistant you can interrupt mid-answer.',
    description:
      'A real-time voice assistant used weekly by 30+ students. Streaming speech-to-text, GPT-4o-mini replies and streaming text-to-speech over WebSockets, with barge-in so you can interrupt it mid-answer. Fixed a TTS cancellation race where cancel checks never ran while the audio stream awaited the network (asyncio).',
    techStack: [
      'Python',
      'FastAPI',
      'WebSockets',
      'AssemblyAI (STT)',
      'GPT-4o-mini',
      'Deepgram (TTS)',
      'React',
      'Vercel',
      'Railway',
    ],
    image: '/projects/nephele.png',
    link: 'https://nephele-production.vercel.app/',
    video: 'https://www.youtube.com/embed/rm_tdCiRECc?start=30',
    github: 'https://github.com/codesbysaravana/nephele_production',
  },
];
