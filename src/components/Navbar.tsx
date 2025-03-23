'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-heading font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            AjoFi
          </Link>
          
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
} 