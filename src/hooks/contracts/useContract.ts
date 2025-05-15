import { Contract } from 'ethers'
import { useProvider, useSigner } from 'wagmi'
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'

export function useContract(address: string, abi: any) {
  const provider = useProvider()
  const { data: signer } = useSigner()

  return {
    read: new Contract(address, abi, provider),
    write: signer ? new Contract(address, abi, signer) : null
  }
} 