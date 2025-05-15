import { useEffect, useCallback } from 'react'
import { useProvider } from 'wagmi'
import { Contract } from 'ethers'

export function useContractEvent(
  address: string,
  abi: any,
  eventName: string,
  callback: (...args: any[]) => void
) {
  const provider = useProvider()

  const listener = useCallback(
    (...args: any[]) => {
      callback(...args)
    },
    [callback]
  )

  useEffect(() => {
    const contract = new Contract(address, abi, provider)
    contract.on(eventName, listener)

    return () => {
      contract.off(eventName, listener)
    }
  }, [address, abi, eventName, listener, provider])
} 