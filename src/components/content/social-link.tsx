'use client';

import { cn } from '@/lib/utils';

interface SocialLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * SocialLink
 *
 * Icon + label link for the contact section.
 * Hover: underline slides in from left.
 */
export function SocialLink({ href, label, icon, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative inline-flex items-center gap-2 text-[var(--portfolio-fg-secondary)] transition-colors hover:text-[var(--portfolio-fg-primary)]',
        className
      )}
      style={{
        fontSize: 'var(--font-size-caption, 0.8125rem)',
        letterSpacing: 'var(--letter-spacing-caption, 0.04em)',
      }}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative uppercase">
        {label}
        {/* Hover underline */}
        <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
    </a>
  );
}
