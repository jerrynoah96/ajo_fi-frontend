'use client';

import {
  RainbowKitProvider,
  getDefaultWallets,
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
        modalSize="compact"
        modalProps={{
          overlayProps: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, , 1.2, 3)',
            }
          },
          containerProps: {
            style: {
              position: 'relative',
              maxWidth: '360px',
              width: '100%',
              margin: '0 auto',
            }
          }
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
} 