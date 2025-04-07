'use client';

import { ThemeProvider } from 'next-themes'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Navbar } from '@/components/Navbar'
import { Web3ModalProvider } from '@/components/Web3ModalProvider'
import { useState, useEffect } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Outfit, Quicksand } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const quicksand = Quicksand({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  if (!mounted) return null;

  return (
    <div 
      className={`
        ${outfit.className}
        ${quicksand.className}
        font-body 
        min-h-screen
        w-full
        bg-gradient-to-br 
        from-purple-900/95 
        to-indigo-900/95 
        dark:from-gray-900/95 
        dark:to-slate-900/95 
        text-white
        backdrop-blur-sm
        fixed-when-modal
      `}
    >
      <Web3ModalProvider>
        <div className="bg-[url('/grid.svg')] bg-fixed bg-center min-h-screen w-full">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar onLogoClick={handleLogoClick} />
            <ThemeSwitcher />
            {children}
          </ThemeProvider>
        </div>
      </Web3ModalProvider>
    </div>
  );
} 