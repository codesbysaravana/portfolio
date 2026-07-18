export interface ChapterMeta {
  id: string;
  number: number;
  label: string;
  /** Background color token — maps to CSS custom property */
  bg: 'deep' | 'primary' | 'elevated' | 'surface';
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'hero',        number: 1,  label: 'Hero',                     bg: 'deep' },
  { id: 'identity',    number: 2,  label: 'Identity',                 bg: 'primary' },
  { id: 'journey',     number: 3,  label: 'Journey',                  bg: 'elevated' },
  { id: 'experience',  number: 4,  label: 'Experience',               bg: 'primary' },
  { id: 'techstack',   number: 5,  label: 'Tech Stack',               bg: 'elevated' },
  { id: 'philosophy',  number: 6,  label: 'Engineering Philosophy',   bg: 'primary' },
  { id: 'projects',    number: 7,  label: 'Projects',                 bg: 'deep' },
  { id: 'principles',  number: 8,  label: 'Principles',               bg: 'primary' },
  { id: 'future',      number: 9,  label: 'Future',                   bg: 'deep' },
  { id: 'contact',     number: 10, label: 'Contact',                  bg: 'deep' },
];

export const BG_MAP = {
  deep:     'var(--portfolio-bg-deep)',
  primary:  'var(--portfolio-bg-primary)',
  elevated: 'var(--portfolio-bg-elevated)',
  surface:  'var(--portfolio-bg-surface)',
} as const; 