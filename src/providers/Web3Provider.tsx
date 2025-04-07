'use client';

import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { mainnet, arbitrum, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';

// Configure chains & providers
const { chains, provider } = configureChains(
  [mainnet, arbitrum, sepolia],
  [publicProvider()]
);

// Set up connectors
const { connectors } = getDefaultWallets({
  appName: 'AjoFi',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains
});

// Set up wagmi config
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#9333EA',
          borderRadius: 'medium',
        })}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
} 