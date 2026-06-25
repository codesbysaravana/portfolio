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
  /** Architecture documentation or diagram URL */
  architectureLink?: string;
}

export const PROJECTS: ProjectContent[] = [
  {
    slug: 'microps',
    title: 'Microps',
    category: 'Open Source',
    year: '2025',
    tagline: 'Precision micro-mechanics for modern infrastructure.',
    description:
      'An open-source orchestration toolkit for microservice architectures. Microps provides intelligent service mesh routing, real-time dependency visualization, automated health diagnostics, and zero-downtime deployment pipelines. Built for teams managing complex distributed systems at scale.',
    techStack: ['Nodejs', 'Jenkins', 'AWS EC2', 'AWS S3', 'Docker'],
    image: '/projects/micropsmain.png',
    link: 'http://microps-client.s3-website-ap-southeast-2.amazonaws.com/',
  },

  {
    slug: 'pasumaicholai',
    title: 'PasumaiCholai',
    category: 'Web Application',
    year: '2026',
    tagline: 'AI-powered agricultural intelligence for modern farming.',
    description:
      'Pasumaicholai is an AI-powered agricultural assistant designed to empower farmers with real-time data-driven decision support. By integrating IoT sensors, satellite imagery, and machine learning, the platform provides predictive insights on crop health, irrigation needs, and pest infestations. Its intuitive interface allows farmers to monitor their fields, receive instant alerts, and access tailored recommendations—all through a simple mobile application. By bridging the gap between traditional farming practices and cutting-edge technology, Pasumaicholai aims to enhance crop yields, optimize resource utilization, and promote sustainable agriculture across Tamil Nadu.',
    techStack: ['Next.js', 'Python', 'TensorFlow', 'IoT', 'PostgreSQL'],
    image: '/projects/pasumaicholai.webp',
    link: 'https://pasumai-cholai-client.vercel.app/',
  },
  {
    slug: 'nephele',
    title: 'Nephele',
    category: 'Design System',
    year: '2023',
    tagline: 'Atmospheric architecture for the digital age.',
    description:
      'A comprehensive design system built for scale. Nephele provides a unified visual language across web and mobile platforms, featuring an adaptive component library, automated accessibility auditing, and a living documentation portal. The system reduces design-to-code handoff time by 60% and ensures pixel-perfect consistency across product teams.',
    techStack: ['React', 'Storybook', 'Figma API', 'TypeScript'],
    image: '/projects/nephele.webp',
    link: '#',
  },
];
