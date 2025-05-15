import { createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CHAIN_ID } from '@/contracts/addresses'

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
}

// Configure chains & providers
const { chains, provider, webSocketProvider } = configureChains(
  [baseSepolia],
  [publicProvider()]
)

// Set up wagmi client
export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

export { chains } 