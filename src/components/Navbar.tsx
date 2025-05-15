'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { truncateAddress } from '@/utils/truncateAddress';

interface NavbarProps {
  onLogoClick?: () => void;
}

export function Navbar({ onLogoClick }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { address, disconnect } = useAccount();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setIsDropdownOpen(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={onLogoClick}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 cursor-pointer"
          >
            AjoFi
          </button>

          <div className="relative" ref={dropdownRef}>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      return (
                        <div>
                          <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-gray-800/40 hover:bg-gray-800/60 pl-4 pr-1 py-1 rounded-xl transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              {/* Network Icon */}
                              <div className="w-4 h-4 rounded-full bg-green-400" />
                              
                              {/* Address */}
                              <span className="text-sm font-medium">
                                {truncateAddress(account.address)}
                              </span>
                            </div>

                            {/* Avatar/Icon */}
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                              <svg 
                                className="w-5 h-5 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                                />
                              </svg>
                            </div>
                          </button>

                          {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg py-1 z-10 border border-gray-700">
                              <button
                                onClick={handleCopyAddress}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy Address
                              </button>

                              <Link
                                href="/dashboard-select"
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Dashboard
                              </Link>

                              <button
                                onClick={handleDisconnect}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Disconnect
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </nav>
  );
} 