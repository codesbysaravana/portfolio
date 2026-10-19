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
  { id: 'value',       number: 3,  label: 'Value',                    bg: 'deep' },
  { id: 'evolution',   number: 4,  label: 'The Evolution',            bg: 'elevated' },
  { id: 'techstack',   number: 5,  label: 'Tech Stack',               bg: 'elevated' },
  { id: 'projects',    number: 6,  label: 'Selected Work',            bg: 'deep' },
  { id: 'open-source', number: 7,  label: 'Open Source',              bg: 'primary' },
  { id: 'writing',     number: 8,  label: 'Writing',                  bg: 'elevated' },
  { id: 'principles',  number: 9,  label: 'Principles',               bg: 'primary' },
  { id: 'future',      number: 10, label: 'Future',                   bg: 'deep' },
  { id: 'contact',     number: 11, label: 'Contact',                  bg: 'deep' },
];

export const BG_MAP = {
  deep:     'var(--portfolio-bg-deep)',
  primary:  'var(--portfolio-bg-primary)',
  elevated: 'var(--portfolio-bg-elevated)',
  surface:  'var(--portfolio-bg-surface)',
} as const; 