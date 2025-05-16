'use client';

import { Copy } from "lucide-react";
import { useState } from "react";

interface CopyAddressProps {
  address: string;
  label: string;
}

export function CopyAddress({ address, label }: CopyAddressProps) {
  const [copied, setCopied] = useState(false);

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center text-gray-300">
      <span className="text-gray-400">{label}:</span>
      <span className="ml-2 font-mono text-white">{truncateAddress(address)}</span>
      <button
        onClick={handleCopy}
        className="ml-2 p-1 hover:bg-purple-900/30 rounded-md transition-colors"
      >
        <Copy className="h-4 w-4 text-gray-400" />
      </button>
      {copied && (
        <span className="ml-2 text-sm text-green-400">Copied!</span>
      )}
    </div>
  );
} 