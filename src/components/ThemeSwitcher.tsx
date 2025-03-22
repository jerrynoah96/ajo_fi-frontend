'use client';

import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: 0 }}
        animate={{ scale: 1, rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? (
          <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.947-7.053L17.5 4.5m-11 11l-.547.547M15.5 19.5l.547.547M4.5 15.5l-.547.547M19.5 4.5L20.047 4M4.5 4.5L4 4m16 11l-.547.547M11 20.95V21v-.05zm.05 0H11h.05zm-.05-17.9V3v.05zm.05 0H11h.05zm7.906 16.456l-.014-.015.014.015zm.015-.014l-.015.014.015-.014zM4.925 19.505l.015-.014-.015.014zm.014-.015l-.014.015.014-.015zM19.505 4.925l-.014-.015.014.015zm.015-.014l-.015.014.015-.014zM4.925 4.925L4.91 4.91l.015.015zm-.015-.014l.015.014-.015-.014zM20 12h-.05.05zm-.05 0h.05-.05zM12 20v-.05.05zm0 .05v-.05.05zM4 12h.05H4zm.05 0H4h.05zm8-16v.05V4zm0-.05v.05V4zm8.485 3.515l-.012.012.012-.012zm.012.012l-.012-.012.012.012zM4.515 19.485l.012-.012-.012.012zm-.012-.012l.012.012-.012-.012zM19.485 19.485l.012-.012-.012.012zm.012-.012l-.012.012.012-.012zM4.515 4.515l.012-.012-.012.012zm-.012-.012l.012.012-.012-.012z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853z" clipRule="evenodd" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
} 