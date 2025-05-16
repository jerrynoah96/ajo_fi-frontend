import { useContract } from './useContract';
import { ValidatorABI } from '@/contracts/abis/Validator';
import { useCallback } from 'react';
import { parseEther } from 'ethers/lib/utils';

export function useValidator(validatorAddress: string) {
  const { write: validator } = useContract(validatorAddress, ValidatorABI);

  const validateUser = useCallback(async (userAddress: string, amount: string) => {
    if (!validator) return;
    const creditAmount = parseEther(amount);
    return await validator.validateUser(userAddress, creditAmount);
  }, [validator]);

  return {
    validateUser
  };
} 