import { useNetwork as useWagmiNetwork, useSwitchNetwork } from 'wagmi'
import { CHAIN_ID } from '@/contracts/addresses'

export function useNetwork() {
  const { chain } = useWagmiNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const isCorrectNetwork = chain?.id === CHAIN_ID

  const switchToCorrectNetwork = async () => {
    if (switchNetwork) {
      try {
        await switchNetwork(CHAIN_ID)
      } catch (error) {
        console.error('Failed to switch network:', error)
      }
    }
  }

  return {
    isCorrectNetwork,
    switchToCorrectNetwork,
    currentChainId: chain?.id
  }
} 