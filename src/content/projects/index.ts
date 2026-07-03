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
    title: 'MicrOps',
    category: 'DevOps & Cloud SaaS',
    year: '2026',
    tagline: 'Autonomous No-Code Cloud DevOps & Serverless Container Orchestrator.',
    description:
      'An enterprise No-Code DevOps platform and serverless container orchestrator. Simply paste any Git repository URL to trigger automated AI pre-flight radar scanning, multi-stage Docker buildpack generation via BullMQ worker queues, real-time Server-Sent Events (SSE) telemetry streaming, and zero-downtime serverless container provisioning on AWS ECS Fargate.',
    techStack: [
      'TypeScript',
      'React 18',
      'Node.js',
      'AWS ECS Fargate',
      'AWS ECR',
      'AWS EC2',
      'Redis & BullMQ',
      'Docker',
    ],
    image: '/projects/microps.png',
    link: 'https://microps.in/',
    github: 'https://github.com/codesbysaravana/Microps',
  },

  {
    slug: 'pasumaicholai',
    title: 'PasumaiCholai',
    category: 'AI-Powered Agricultural Platform',
    year: '2026',
    tagline: 'AI voice assistance and digital services for farmers.',
    description:
      'Pasumaicholai is an AI-powered agricultural platform designed to make farming information more accessible through natural language interactions. Farmers can ask questions using voice or text in their preferred language and receive contextual guidance on crops, cultivation practices, government schemes, weather conditions, and agricultural best practices. The platform combines modern AI models with structured agricultural knowledge to deliver reliable, easy-to-understand responses while reducing the digital barrier for rural communities. Built with a scalable backend architecture, Pasumaicholai focuses on improving accessibility, farmer awareness, and informed decision-making through conversational AI.',
    techStack: [
      'Next.js',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'OpenAI',
      'Tailwind CSS'
    ],
    image: '/projects/pasumaicholai.webp',
    link: 'https://pasumai-cholai-client.vercel.app/',
  },
  {
    slug: 'nephele',
    title: 'Nephele AI',
    category: 'AI Robotics & Orchestration',
    year: '2026',
    tagline: 'A futuristic multi-modal AI interviewer and robotic assistant.',
    description:
      'Nephele is a production-grade AI operating interface and robotic orchestrator. It features a real-time computer vision edge pipeline for behavioral telemetry, fused multi-modal data processing, and a low-latency Cognitive Engine. The frontend provides a stunning, framework-less Vanilla JS SPA with adaptive CSS animations and surgical WebSocket state management.',
    techStack: ['Python', 'FastAPI', 'OpenCV', 'Vanilla JS', 'TailwindCSS', 'WebSockets', 'Groq LLM'],
    image: '/projects/nephele.png',
    link: 'http://nephele.frontend.s3-website-ap-southeast-2.amazonaws.com/',
  }

];
