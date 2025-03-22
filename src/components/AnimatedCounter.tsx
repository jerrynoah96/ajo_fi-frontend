'use client';

import { motion, useSpring, useTransform, useMotionValue, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter = ({ value, prefix = '', suffix = '' }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));
  const displayNumber = useSpring(rounded, { duration: 2000 });

  useEffect(() => {
    if (inView) {
      count.set(value);
    } else {
      count.set(0);
    }
  }, [count, inView, value]);

  return (
    <motion.div ref={ref} className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.div>
  );
}; 