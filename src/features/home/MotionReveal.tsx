'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

interface MotionRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly direction?: 'left' | 'none' | 'right' | 'up';
  readonly distance?: number;
}

/*** Reveal below-the-fold content once, without a heavyweight animation runtime. */
export function MotionReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 24,
}: MotionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'pending' | 'visible'>('idle');

  useEffect(() => {
    const element = elementRef.current;
    if (element === null) return;

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setPhase('visible');
      return;
    }

    setPhase('pending');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
  const y = direction === 'up' ? distance : 0;
  const style: CSSProperties & {
    '--reveal-x': string;
    '--reveal-y': string;
    '--reveal-delay': string;
  } = {
    '--reveal-x': `${x}px`,
    '--reveal-y': `${y}px`,
    '--reveal-delay': `${delay}s`,
  };

  return (
    <div
      ref={elementRef}
      className={className}
      data-motion-reveal
      data-motion-state={phase}
      style={style}
    >
      {children}
    </div>
  );
}
