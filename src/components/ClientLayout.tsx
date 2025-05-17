'use client';

import { ThemeProvider } from 'next-themes'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Navbar } from '@/components/Navbar'
import { Web3ModalProvider } from '@/components/Web3ModalProvider'
import { useState, useEffect } from 'react'
import { Outfit, Quicksand } from 'next/font/google'
import { NetworkCheck } from './NetworkCheck'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-quicksand',
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  if (!mounted) return null;

  return (
    <div className={`${outfit.className} ${quicksand.className} font-body min-h-screen w-full bg-gradient-to-br from-purple-900/95 to-indigo-900/95 dark:from-gray-900/95 dark:to-slate-900/95 text-white backdrop-blur-sm fixed-when-modal`}>
      <Web3ModalProvider>
        <div className="bg-[url('/grid.svg')] bg-fixed bg-center min-h-screen w-full">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar onLogoClick={handleLogoClick} />
            <ThemeSwitcher />
            <NetworkCheck />
            {children}
          </ThemeProvider>
        </div>
      </Web3ModalProvider>
    </div>
  );
} 