'use client';

import { Web3Provider } from '@/providers/Web3Provider';

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
} 