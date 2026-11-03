'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';

interface MotionRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly direction?: 'left' | 'none' | 'right' | 'up';
  readonly distance?: number;
}

/*** Progressively enhance SSR-visible sections with one viewport reveal. */
export function MotionReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 24,
}: MotionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = elementRef.current;
    if (
      element === null ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.motionState = 'visible';
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    element.dataset.motionState = 'pending';
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
    <div ref={elementRef} className={className} data-motion-reveal style={style}>
      {children}
    </div>
  );
}
