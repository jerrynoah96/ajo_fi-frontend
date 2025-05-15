import { useContract } from './useContract'
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'
import { TokenABI } from '@/contracts/abis'
import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { BigNumber } from 'ethers'

export function useToken() {
  const { address: account } = useAccount()
  const { read: token, write: tokenWrite } = useContract(
    CONTRACT_ADDRESSES.TOKEN,
    TokenABI
  )

  const approve = useCallback(async (spender: string, amount: BigNumber) => {
    if (!tokenWrite || !account) return null
    try {
      const tx = await tokenWrite.approve(spender, amount)
      return tx
    } catch (error) {
      console.error('Error approving tokens:', error)
      throw error
    }
  }, [tokenWrite, account])

  const balanceOf = useCallback(async (address: string) => {
    if (!token) return BigNumber.from(0)
    try {
      return await token.balanceOf(address)
    } catch (error) {
      console.error('Error getting balance:', error)
      return BigNumber.from(0)
    }
  }, [token])

  const allowance = useCallback(async (owner: string, spender: string) => {
    if (!token) return BigNumber.from(0)
    try {
      return await token.allowance(owner, spender)
    } catch (error) {
      console.error('Error getting allowance:', error)
      return BigNumber.from(0)
    }
  }, [token])

  return {
    approve,
    balanceOf,
    allowance,
    token,
  }
} 