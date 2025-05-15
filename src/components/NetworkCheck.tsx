'use client';

import { useNetwork } from '@/hooks/useNetwork';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';

export function NetworkCheck() {
  const { isCorrectNetwork, switchToCorrectNetwork } = useNetwork();
  const { isConnected } = useAccount();

  // Only show warning if wallet is connected AND on wrong network
  if (!isConnected || isCorrectNetwork) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-50 p-4 bg-yellow-500/10 border-b border-yellow-500/50">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm text-yellow-500">
          Please switch to Base Sepolia network to continue
        </p>
        <Button
          onClick={switchToCorrectNetwork}
          variant="outline"
          className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/20"
        >
          Switch Network
        </Button>
      </div>
    </div>
  );
} 