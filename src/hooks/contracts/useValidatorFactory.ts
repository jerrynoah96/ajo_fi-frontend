import { useContract } from './useContract'
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'
import { ValidatorFactoryABI } from '@/contracts/abis'
import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { BigNumber } from 'ethers'

export function useValidatorFactory() {
  const { address: account } = useAccount()
  const { read: validatorFactory, write: validatorFactoryWrite } = useContract(
    CONTRACT_ADDRESSES.VALIDATOR_FACTORY,
    ValidatorFactoryABI
  )

  const createValidator = useCallback(async ({
    feePercentage,
    tokenToStake,
    stakeAmount
  }: {
    feePercentage: number,
    tokenToStake: string,
    stakeAmount: BigNumber
  }) => {
    if (!validatorFactoryWrite || !account) {
      console.error('Missing dependencies:', { validatorFactoryWrite: !!validatorFactoryWrite, account });
      return null;
    }
    
    try {
      // Verify parameters are in correct format
      console.log('Creating validator with params:', {
        feePercentage,
        tokenToStake,
        stakeAmount: stakeAmount.toString(),
        account
      });

      // Try estimating gas first to check if transaction would fail
      try {
        const gasEstimate = await validatorFactoryWrite.estimateGas.createValidator(
          feePercentage,
          tokenToStake,
          stakeAmount
        );
        console.log('Gas estimate:', gasEstimate.toString());
      } catch (estimateError) {
        console.error('Gas estimation failed:', estimateError);
      }

      const tx = await validatorFactoryWrite.createValidator(
        feePercentage,
        tokenToStake,
        stakeAmount
      );
      
      console.log('Transaction created:', tx);
      return tx;

    } catch (error) {
      console.error('Error creating validator:', error);
      throw error;
    }
  }, [validatorFactoryWrite, account]);

  const isValidator = useCallback(async (address: string) => {
    if (!validatorFactory) return false
    try {
      const validatorContract = await validatorFactory.validatorContracts(address)
      return validatorContract !== '0x0000000000000000000000000000000000000000'
    } catch (error) {
      console.error('Error checking validator status:', error)
      return false
    }
  }, [validatorFactory])

  return {
    createValidator,
    isValidator
  }
} 