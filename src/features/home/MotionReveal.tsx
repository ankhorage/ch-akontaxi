'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/*** Reveal homepage content with restrained one-shot viewport motion. */
export function MotionReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 24,
  immediate = false,
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = getMotionOffset(direction, distance);
  const visible = { opacity: 1, x: 0, y: 0 };
  const target = prefersReducedMotion ? undefined : visible;

  return (
    <motion.div
      className={className}
      data-motion-reveal
      initial={prefersReducedMotion ? false : { opacity: 0, ...offset }}
      animate={immediate ? target : undefined}
      whileInView={immediate ? undefined : target}
      viewport={immediate ? undefined : { once: true, amount: 0.18 }}
      transition={{
        duration: 0.62,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/*** Resolve the initial transform offset without dynamic property access. */
function getMotionOffset(direction: MotionRevealDirection, distance: number): MotionOffset {
  switch (direction) {
    case 'left':
      return { x: -distance };
    case 'right':
      return { x: distance };
    case 'up':
      return { y: distance };
    case 'none':
      return {};
  }
}

interface MotionRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly direction?: MotionRevealDirection;
  readonly distance?: number;
  readonly immediate?: boolean;
}

type MotionOffset = {
  readonly x?: number;
  readonly y?: number;
};

type MotionRevealDirection = 'left' | 'none' | 'right' | 'up';
