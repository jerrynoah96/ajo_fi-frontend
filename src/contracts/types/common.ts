import { BigNumber } from 'ethers'

export interface TokenAmount {
  token: string
  amount: BigNumber
}

export interface PurseConfig {
  contributionAmount: BigNumber
  maxMembers: number
  roundInterval: number
  tokenAddress: string
  position: number
  maxDelayTime: number
  validator: string
}

export interface ValidatorInfo {
  validatorAddress: string
  feePercentage: number
  stakedAmount: BigNumber
  tokenAddress: string
} 