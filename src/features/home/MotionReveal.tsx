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

  if (prefersReducedMotion) {
    return (
      <div className={className} data-motion-reveal>
        {children}
      </div>
    );
  }

  const offset =
    direction === 'left'
      ? { x: -distance }
      : direction === 'right'
        ? { x: distance }
        : direction === 'up'
          ? { y: distance }
          : {};

  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      data-motion-reveal
      initial={{ opacity: 0, ...offset }}
      animate={immediate ? visible : undefined}
      whileInView={immediate ? undefined : visible}
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

interface MotionRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly direction?: 'left' | 'none' | 'right' | 'up';
  readonly distance?: number;
  readonly immediate?: boolean;
}
