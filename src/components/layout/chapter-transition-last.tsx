/**
 * ChapterTransition
 *
 * 50vh empty spacer between chapters. Creates breathing room
 * and allows background color gradients to crossfade.
 */
export function ChapterTransitionLast({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={className}
            style={{ height: '14vh', pointerEvents: 'none' }}
        />
    );
}
