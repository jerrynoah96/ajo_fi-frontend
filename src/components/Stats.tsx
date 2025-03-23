'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, animate } from 'framer-motion';
import { formatEther } from 'ethers/lib/utils';
import { useBalance } from 'wagmi';

export function Stats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const tvlControls = useAnimation();
  const usersControls = useAnimation();
  const validatorsControls = useAnimation();

  const animateValue = (value: number, element: HTMLElement, prefix: string = '') => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (latest) => {
        if (prefix === '$') {
          element.textContent = `$${latest.toLocaleString()}`;
        } else {
          element.textContent = latest.toLocaleString();
        }
      },
      ease: "easeOut",
    });

    return controls;
  };

  useEffect(() => {
    if (!hasAnimated) {
      const tvlElement = document.getElementById('tvl-value');
      const usersElement = document.getElementById('users-value');
      const validatorsElement = document.getElementById('validators-value');

      if (tvlElement && usersElement && validatorsElement) {
        animateValue(125000, tvlElement, '$');
        animateValue(1234, usersElement);
        animateValue(45, validatorsElement);
        setHasAnimated(true);
      }
    }
  }, [hasAnimated]);

  const statItem = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.div 
          variants={statItem}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-body font-medium text-gray-400">Total Value Locked</h3>
          <p 
            id="tvl-value"
            className="mt-2 text-4xl font-heading font-bold text-purple-400"
          >
            $0
          </p>
        </motion.div>

        <motion.div 
          variants={statItem}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-body font-medium text-gray-400">Active Users</h3>
          <p 
            id="users-value"
            className="mt-2 text-4xl font-heading font-bold text-purple-400"
          >
            0
          </p>
        </motion.div>

        <motion.div 
          variants={statItem}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-body font-medium text-gray-400">Validators</h3>
          <p 
            id="validators-value"
            className="mt-2 text-4xl font-heading font-bold text-purple-400"
          >
            0
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 