'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useValidatorFactory } from '@/hooks/contracts/useValidatorFactory';
import { CONTRACT_ADDRESSES } from '@/contracts/addresses';
import { BigNumber, utils } from 'ethers';
import { useToken } from '@/hooks/contracts/useToken';
import { useContractEvent } from '@/hooks/contracts/useContractEvent';
import { ValidatorFactoryABI } from '@/contracts/abis';
import { useNetwork } from '@/hooks/useNetwork';
import { useAccount } from 'wagmi';
import { TokenABI } from '@/contracts/abis';

type TxState = 'idle' | 'approving' | 'waiting_approval' | 'creating' | 'waiting_creation' | 'success';

export default function BecomeValidatorPage() {
  const router = useRouter();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txState, setTxState] = useState<TxState>('idle');
  const [isApprovalConfirmed, setIsApprovalConfirmed] = useState(false);
  const [approvalTxHash, setApprovalTxHash] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  
  const { createValidator } = useValidatorFactory();
  const { approve, token } = useToken();
  const { isCorrectNetwork, switchToCorrectNetwork } = useNetwork();
  const { isConnected, address: account } = useAccount();

  const [formData, setFormData] = useState({
    // fullName: '',
    // email: '',
    // walletAddress: '',
    stakeAmount: '',
    feePercentage: '',
  });

  // Listen for ValidatorCredited event
  useContractEvent(
    CONTRACT_ADDRESSES.VALIDATOR_FACTORY,
    ValidatorFactoryABI,
    'ValidatorCredited',
    (validator, creditAmount) => {
      setTxState('success');
      setTimeout(() => {
        setShowRegistrationModal(false);
        setShowSuccessModal(true);
      }, 1500);
    }
  );

  // Modify approval event listener to be more lenient
  useContractEvent(
    CONTRACT_ADDRESSES.TOKEN,
    TokenABI,
    'Approval',
    (owner, spender, amount) => {
      console.log('Approval event:', { owner, spender, amount, account });
      // Check if this is the approval we're waiting for
      if (approvalTxHash && 
          owner?.toLowerCase() === account?.toLowerCase() && 
          spender?.toLowerCase() === CONTRACT_ADDRESSES.VALIDATOR_FACTORY.toLowerCase()) {
        console.log('Setting approval confirmed');
        setIsApprovalConfirmed(true);
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setTxState('approving');
    setIsApprovalConfirmed(false);
    setApprovalTxHash(null);

    try {
      const stakeAmountWei = utils.parseEther(formData.stakeAmount);
      const feePercentageBP = Math.floor(parseFloat(formData.feePercentage) * 100);

      // First approve token spending
      try {
        const approveTx = await approve(CONTRACT_ADDRESSES.VALIDATOR_FACTORY, stakeAmountWei);
        if (!approveTx) {
          throw new Error('Failed to initiate approval transaction');
        }
        
        setApprovalTxHash(approveTx.hash);
        setTxState('waiting_approval');
        
        const receipt = await approveTx.wait();
        console.log('Approval transaction mined:', receipt);

        const allowance = await token.allowance(account, CONTRACT_ADDRESSES.VALIDATOR_FACTORY);
        if (allowance.gte(stakeAmountWei)) {
          console.log('Allowance confirmed through direct check');
          setIsApprovalConfirmed(true);
          setIsApproved(true);
          setTxState('idle');
        } else {
          throw new Error('Allowance check failed after approval');
        }

      } catch (approveError) {
        console.error('Error approving tokens:', approveError);
        throw new Error(
          approveError instanceof Error 
            ? `Failed to approve token spending: ${approveError.message}` 
            : 'Failed to approve token spending. Please try again.'
        );
      }

    } catch (err) {
      console.error('Error in approval:', err);
      setError(err instanceof Error ? err.message : 'Failed to approve tokens');
      setTxState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateValidator = async () => {
    setError(null);
    setIsLoading(true);
    setTxState('creating');

    try {
      const stakeAmountWei = utils.parseEther(formData.stakeAmount);
      // Convert percentage to basis points (e.g., 0.5% = 50 basis points)
      const feePercentageBP = Math.floor(parseFloat(formData.feePercentage) * 100 / 100);
      
      // Check minimum stake (1000 AJO)
      const minStake = utils.parseEther("1000");
      if (stakeAmountWei.lt(minStake)) {
        throw new Error('Minimum stake amount is 1000 AJO');
      }

      // Check fee percentage (must be less than maxFeePercentage from config)
      if (feePercentageBP < 0 || feePercentageBP > 1000) { // Max 10% (1000 basis points)
        throw new Error('Fee percentage must be between 0% and 10%');
      }

      // Check token balance
      const balance = await token.balanceOf(account);
      if (balance.lt(stakeAmountWei)) {
        throw new Error('Insufficient token balance');
      }

      console.log('Creating validator with params:', {
        feePercentageBP,
        tokenAddress: CONTRACT_ADDRESSES.TOKEN,
        stakeAmount: stakeAmountWei.toString()
      });

      const createTx = await createValidator({
        feePercentage: feePercentageBP,
        tokenToStake: CONTRACT_ADDRESSES.TOKEN,
        stakeAmount: stakeAmountWei
      });

      if (!createTx) {
        throw new Error('Failed to create validator transaction');
      }

      setTxState('waiting_creation');
      await createTx.wait();
    } catch (createError: any) {
      console.error('Error creating validator:', createError);
      if (createError.message.includes('AlreadyRegistered')) {
        throw new Error('You are already registered as a validator');
      } else if (createError.message.includes('FeeTooHigh')) {
        throw new Error('Fee percentage exceeds maximum allowed');
      } else if (createError.message.includes('InsufficientStake')) {
        throw new Error('Insufficient stake amount or token balance');
      } else if (createError.message.includes('TokenNotWhitelisted')) {
        throw new Error('Token is not whitelisted');
      } else if (createError.message.includes('execution reverted')) {
        throw new Error('Transaction failed. Please check your inputs and try again.');
      }
      throw createError;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/validator-dashboard');
  };

  // Transaction status component
  const TransactionStatus = () => {
    switch (txState) {
      case 'approving':
        return (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-2" />
            <p className="text-sm text-gray-400">Approving token spending...</p>
          </div>
        );
      case 'creating':
        return (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-2" />
            <p className="text-sm text-gray-400">Creating validator...</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center py-4">
            <Shield className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-green-500">Successfully registered as validator!</p>
          </div>
        );
      case 'waiting_approval':
        return (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-2" />
            <p className="text-sm text-gray-400">Waiting for approval confirmation...</p>
            <p className="text-xs text-gray-500 mt-1">Please wait for the transaction to be confirmed</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Disable form submission button if not on correct network
  const isSubmitDisabled = isLoading || !isConnected || !isCorrectNetwork;

  // Update the button text logic
  const getButtonText = () => {
    if (!isConnected) return 'Connect Wallet';
    if (!isCorrectNetwork) return 'Switch Network';
    if (isLoading) {
      return txState === 'creating' ? 'Creating Validator...' : 'Approving...';
    }
    return isApproved ? 'Create Validator' : 'Approve Tokens';
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-12">Become an AJO-FI Validator</h1>
      
      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <CardTitle>AJO-FI Validator</CardTitle>
          </div>
          <CardDescription>
            Stake funds to provide credits and validate user activities in contribution groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Stake funds to generate user credits</li>
            <li>Earn rewards from successful group contributions</li>
            <li>Help more users access contribution groups</li>
            <li>Manage credit assignments to trusted users</li>
          </ul>
          <Button 
            className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white"
            onClick={() => setShowRegistrationModal(true)}
          >
            Register as Validator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Registration Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent>
          {!isCorrectNetwork && (
            <div className="p-4 mb-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
              <p className="text-sm text-yellow-500">
                Please switch to Base Sepolia network to continue
                <Button
                  onClick={switchToCorrectNetwork}
                  variant="link"
                  className="text-yellow-500 underline ml-2"
                >
                  Switch Network
                </Button>
              </p>
            </div>
          )}
          
          <DialogHeader>
            <DialogTitle>Validator Registration</DialogTitle>
            <DialogDescription>
              Register as a validator to provide credits and secure the AJO-FI network
            </DialogDescription>
          </DialogHeader>
          
          {/* Show transaction status when processing */}
          {txState !== 'idle' && <TransactionStatus />}

          {/* Only show form when not processing */}
          {txState === 'idle' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (isApproved) {
                handleCreateValidator();
              } else {
                handleSubmit(e);
              }
            }} className="space-y-6">
              {/* Commented out personal info fields
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  placeholder="Your wallet address for staking"
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  required
                />
              </div>
              */}

              <div className="space-y-2">
                <Label htmlFor="stakeAmount">Amount</Label>
                <Input
                  id="stakeAmount"
                  type="number"
                  step="0.01"
                  placeholder="Minimum stake: 1000 AJO"
                  value={formData.stakeAmount}
                  onChange={(e) => setFormData({ ...formData, stakeAmount: e.target.value })}
                  required
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  Your stake determines how many credits you can provide to users
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feePercentage">Fee %</Label>
                <Input
                  id="feePercentage"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="Enter fee percentage"
                  value={formData.feePercentage}
                  onChange={(e) => setFormData({ ...formData, feePercentage: e.target.value })}
                  required
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  % of users contribution charged
                </p>
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <Button 
                type="submit" 
                className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white"
                disabled={isSubmitDisabled}
              >
                {getButtonText()}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-500" />
              Registration Successful
            </DialogTitle>
            <DialogDescription>
              Your validator registration has been confirmed. You can now start managing credits.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button 
              onClick={handleSuccessClose} 
              className="bg-[#9333EA] hover:bg-[#7928CA] text-white"
            >
              Go to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 