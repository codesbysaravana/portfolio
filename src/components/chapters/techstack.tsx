'use client';

import { Chapter } from '@/components/layout/chapter';
import { Container } from '@/components/layout/container';
import { ChapterOverline } from '@/components/content/chapter-overline';
import { Headline } from '@/components/content/headline';
import { AnimateOnScroll } from '@/components/motion/animate-on-scroll';

// Icons
import { 
  SiExpress, 
  SiGithubactions, 
  SiPostgresql, 
  SiMongodb, 
  SiGooglegemini,
  SiJavascript,
} from 'react-icons/si';

import {
  FaNodeJs,
  FaAws,
  FaDocker,
  FaJenkins,
  FaLinux,
  FaJava,
  FaPython
} from 'react-icons/fa6';

interface Tech {
  id: string;
  name: string;
  type: 'large' | 'medium' | 'small';
  icon: any;
  color: string;
  proficiency: number;
  label: string;
  desc: string;
  span: string;
}

const TECH_STACK: Tech[] = [
  // Large Cards
  { id: 'java', name: 'Java', type: 'large', icon: FaJava, color: '#F0931C', proficiency: 5, label: 'Expert', desc: 'Primary backend language for scalable APIs and system design.', span: 'col-span-4 md:col-span-2 row-span-2' },
  { id: 'node', name: 'Node.js', type: 'large', icon: FaNodeJs, color: '#339933', proficiency: 5, label: 'Expert', desc: 'Event-driven runtime for fast, scalable network applications.', span: 'col-span-4 md:col-span-2 row-span-2' },
  { id: 'aws', name: 'AWS', type: 'large', icon: FaAws, color: '#FF9900', proficiency: 4, label: 'Advanced', desc: 'Cloud infrastructure, deployment, networking, and DevOps.', span: 'col-span-4 md:col-span-2 row-span-2' },
  
  // Medium Cards
  { id: 'docker', name: 'Docker', type: 'medium', icon: FaDocker, color: '#2496ED', proficiency: 4, label: 'Advanced', desc: 'Containerization for consistent environments and deployments.', span: 'col-span-4 md:col-span-2 row-span-1' },
  { id: 'postgres', name: 'PostgreSQL', type: 'medium', icon: SiPostgresql, color: '#336791', proficiency: 4, label: 'Advanced', desc: 'Robust relational database for complex data architecture.', span: 'col-span-4 md:col-span-2 row-span-1' },
  { id: 'mongodb', name: 'MongoDB', type: 'medium', icon: SiMongodb, color: '#47A248', proficiency: 3, label: 'Comfortable', desc: 'NoSQL database for flexible, scalable document storage.', span: 'col-span-4 md:col-span-2 row-span-1' },
  
  // Small Cards
  { id: 'express', name: 'Express.js', type: 'small', icon: SiExpress, color: '#ffffff', proficiency: 4, label: 'Advanced', desc: 'Minimalist web framework for Node.js.', span: 'col-span-2 md:col-span-1 row-span-1' },
  { id: 'jenkins', name: 'Jenkins', type: 'small', icon: FaJenkins, color: '#D24939', proficiency: 3, label: 'Comfortable', desc: 'Automation server for continuous integration.', span: 'col-span-2 md:col-span-1 row-span-1' },
  { id: 'linux', name: 'Linux', type: 'small', icon: FaLinux, color: '#FCC624', proficiency: 3, label: 'Comfortable', desc: 'System administration and server management.', span: 'col-span-2 md:col-span-1 row-span-1' },
  { id: 'js', name: 'JavaScript', type: 'small', icon: SiJavascript, color: '#F7DF1E', proficiency: 3, label: 'Comfortable', desc: 'Frontend interactions and full-stack utilities.', span: 'col-span-2 md:col-span-1 row-span-1' },
  { id: 'python', name: 'Python', type: 'small', icon: FaPython, color: '#3776AB', proficiency: 2, label: 'Familiar', desc: 'Scripting, automation, and AI integrations.', span: 'col-span-4 md:col-span-2 row-span-1' },
];

function Proficiency({ rating, label, isSmall }: { rating: number, label: string, isSmall: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex text-[0.7rem] md:text-xs tracking-widest">
        {[1,2,3,4,5].map(i => (
          <span key={i} className="transition-colors duration-300" style={{ 
            color: i <= rating ? 'var(--portfolio-fg-primary)' : 'var(--portfolio-fg-tertiary)',
            opacity: i <= rating ? 1 : 0.25
          }}>
            {i <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <span className={`text-[10px] md:text-xs font-medium uppercase tracking-widest text-[var(--portfolio-fg-tertiary)] ${isSmall ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75' : ''}`}>
        {label}
      </span>
    </div>
  );
}

function BentoCard({ tech, index }: { tech: Tech, index: number }) {
  const isLarge = tech.type === 'large';
  const isMedium = tech.type === 'medium';
  const isSmall = tech.type === 'small';
  
  return (
    <div 
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[var(--portfolio-bg-surface)] border border-[var(--portfolio-border)] transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl ${tech.span}`}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Soft radial accent */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[90px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: tech.color }}
      />
      
      {/* Subtle colored border glow on hover */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ border: `1px solid ${tech.color}40` }}
      />

      <div className={`relative z-10 flex flex-col h-full ${isSmall ? 'p-6' : 'p-8 md:p-10'}`}>
        <div className="flex-1 flex flex-col">
          <div className={`flex ${isSmall ? 'flex-col items-start gap-4' : 'flex-row items-center gap-5'} mb-5`}>
            <tech.icon 
              className={`${isLarge ? 'w-12 h-12 md:w-16 md:h-16' : isMedium ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10'} transition-transform duration-700 ease-out group-hover:scale-110`}
              style={{ color: tech.color }}
            />
            <h3 className={`${isLarge ? 'text-2xl md:text-3xl' : isMedium ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-semibold text-[var(--portfolio-fg-primary)] tracking-tight`}>
              {tech.name}
            </h3>
          </div>
          
          <p className={`
            text-[var(--portfolio-fg-secondary)] 
            ${isLarge ? 'text-base md:text-lg leading-relaxed max-w-sm mt-2' : isMedium ? 'text-sm md:text-base leading-relaxed mt-1' : 'text-xs md:text-sm leading-relaxed'}
            ${isSmall ? 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out' : ''}
          `}>
            {tech.desc}
          </p>
        </div>

        <div className="mt-8">
          <Proficiency rating={tech.proficiency} label={tech.label} isSmall={isSmall} />
        </div>
      </div>
    </div>
  );
}

export function ChapterTechStack() {
  return (
    <Chapter id="techstack" bg="elevated" label="Engineering Domains">
      {/* Background Enhancements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Faint radial spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-white/[0.015] blur-[120px] rounded-full" />
        
        {/* Extremely soft vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)] md:shadow-[inset_0_0_300px_rgba(0,0,0,0.6)] mix-blend-multiply" />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <Container width="wide" className="py-32 md:py-48 relative z-10">
        <ChapterOverline number={5} />
        
        <div className="mb-16 md:mb-24 max-w-2xl">
          <Headline as="h2" size="headline" className="mb-6">
            Tech Stack
          </Headline>
          <p className="text-lg md:text-xl text-[var(--portfolio-fg-secondary)] leading-relaxed">
            The technologies I rely on to design, build, deploy, and scale modern backend systems.
          </p>
        </div>

        <AnimateOnScroll preset="fadeUp">
          <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {TECH_STACK.map((tech, i) => (
              <BentoCard key={tech.id} tech={tech} index={i} />
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </Chapter>
  );
}
