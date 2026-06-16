/**
 * ChapterTransition
 *
 * 50vh empty spacer between chapters. Creates breathing room
 * and allows background color gradients to crossfade.
 */
export function ChapterTransition({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ height: '30vh', pointerEvents: 'none' }}
    />
  );
}
