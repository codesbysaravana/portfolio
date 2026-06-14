import type { gsap } from 'gsap';

// ━━ Animation Preset Types ━━

export interface AnimationFrom {
  y?: number | string;
  x?: number | string;
  opacity?: number;
  scale?: number;
  clipPath?: string;
  rotate?: number;
  filter?: string;
}

export interface AnimationTo extends AnimationFrom {
  duration: number;
  ease: string;
  stagger?: number;
}

export interface AnimationPreset {
  from: AnimationFrom;
  to: AnimationTo;
}

// ━━ ScrollTrigger Config ━━

export interface ScrollTriggerConfig {
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}

// ━━ Motion Component Props ━━

export type PresetName =
  | 'fadeUp'
  | 'fadeIn'
  | 'revealLine'
  | 'scaleIn'
  | 'slideFromLeft'
  | 'slideFromRight'
  | 'maskReveal';

export interface AnimateOnScrollProps {
  preset?: PresetName;
  delay?: number;
  stagger?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  scrollTrigger?: Partial<ScrollTriggerConfig>;
}

export interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  /** 'words' splits by word, 'lines' splits by line-break simulation */
  splitType?: 'words' | 'chars';
}

export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // -1 to 1
  className?: string;
}

export interface MaskRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  className?: string;
}

export interface StaggerGroupProps {
  children: React.ReactNode;
  stagger?: number;
  preset?: PresetName;
  className?: string;
  as?: React.ElementType;
}
