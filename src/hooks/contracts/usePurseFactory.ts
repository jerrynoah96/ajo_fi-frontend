import { useContract } from './useContract'
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'
import { PurseFactoryABI } from '@/contracts/abis'
import { useCallback } from 'react'
import { useAccount } from 'wagmi'

export function usePurseFactory() {
  const { address: account } = useAccount()
  const { read: purseFactory, write: purseFactoryWrite } = useContract(
    CONTRACT_ADDRESSES.PURSE_FACTORY,
    PurseFactoryABI
  )

  const createPurse = useCallback(async ({
    contributionAmount,
    maxMembers,
    roundInterval,
    tokenAddress,
    position,
    maxDelayTime,
    validator
  }: {
    contributionAmount: number,
    maxMembers: number,
    roundInterval: number,
    tokenAddress: string,
    position: number,
    maxDelayTime: number,
    validator: string
  }) => {
    if (!purseFactoryWrite) return
    
    try {
      const tx = await purseFactoryWrite.createPurse(
        contributionAmount,
        maxMembers,
        roundInterval,
        tokenAddress,
        position,
        maxDelayTime,
        validator
      )
      return await tx.wait()
    } catch (error) {
      console.error('Error creating purse:', error)
      throw error
    }
  }, [purseFactoryWrite])

  const getAllPurses = useCallback(async () => {
    if (!purseFactory) return []
    try {
      return await purseFactory.allPurse()
    } catch (error) {
      console.error('Error getting all purses:', error)
      return []
    }
  }, [purseFactory])

  return {
    createPurse,
    getAllPurses
  }
} 