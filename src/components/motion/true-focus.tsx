'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export function TrueFocus({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;

    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      className={`tf-container ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        gap: '1em',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => { wordRefs.current[index] = el; }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              outline: 'none',
              userSelect: 'none',
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          boxSizing: 'content-box',
          border: 'none',
        }}
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
      >
        {/* Corner brackets */}
        <span style={{
          position: 'absolute',
          width: '1rem',
          height: '1rem',
          border: `3px solid ${borderColor}`,
          borderRight: 'none',
          borderBottom: 'none',
          borderRadius: '3px',
          top: '-10px',
          left: '-10px',
          filter: `drop-shadow(0px 0px 4px ${glowColor})`,
        }} />
        <span style={{
          position: 'absolute',
          width: '1rem',
          height: '1rem',
          border: `3px solid ${borderColor}`,
          borderLeft: 'none',
          borderBottom: 'none',
          borderRadius: '3px',
          top: '-10px',
          right: '-10px',
          filter: `drop-shadow(0px 0px 4px ${glowColor})`,
        }} />
        <span style={{
          position: 'absolute',
          width: '1rem',
          height: '1rem',
          border: `3px solid ${borderColor}`,
          borderRight: 'none',
          borderTop: 'none',
          borderRadius: '3px',
          bottom: '-10px',
          left: '-10px',
          filter: `drop-shadow(0px 0px 4px ${glowColor})`,
        }} />
        <span style={{
          position: 'absolute',
          width: '1rem',
          height: '1rem',
          border: `3px solid ${borderColor}`,
          borderLeft: 'none',
          borderTop: 'none',
          borderRadius: '3px',
          bottom: '-10px',
          right: '-10px',
          filter: `drop-shadow(0px 0px 4px ${glowColor})`,
        }} />
      </motion.div>
    </div>
  );
}
