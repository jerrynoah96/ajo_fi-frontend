'use client';

import {
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { CHAIN_ID } from '@/contracts/addresses';
import '@rainbow-me/rainbowkit/styles.css';

// Define Base Sepolia chain
const baseSepolia = {
  id: CHAIN_ID,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.base.org'] },
    default: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
} as const;

// Configure chains & providers with only Base Sepolia
const { chains, provider } = configureChains(
  [baseSepolia], // Only Base Sepolia
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
        initialChain={CHAIN_ID} // Force initial chain to Base Sepolia
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