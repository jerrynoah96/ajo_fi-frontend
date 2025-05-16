'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Users, Coins, Clock, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useValidatorFactory } from "@/hooks/contracts/useValidatorFactory";
import { useRouter } from "next/navigation";
import { useValidatorData } from "@/hooks/useValidatorData";
import { formatEther } from "ethers/lib/utils";
import { format } from "date-fns";
import { useValidator } from '@/hooks/contracts/useValidator';
import { useContractEvent } from '@/hooks/contracts/useContractEvent';
import { ValidatorABI } from '@/contracts/abis/Validator';
import { toast } from 'sonner';
import { SuccessModal } from '@/components/SuccessModal';
import { CopyAddress } from "@/components/CopyAddress";

interface CreditAssignment {
  userAddress: string;
  amount: number;
  amountUSD: number;
  returns: number;
  assignedDate: string;
  expectedReturn: string;
}

export default function ValidatorDashboard() {
  const { address } = useAccount();
  const { isValidator } = useValidatorFactory();
  const router = useRouter();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    address: '',
    amount: '',
    returns: '',
  });
  const { data: validatorData, isLoading, error } = useValidatorData(address);
  const [isAssigning, setIsAssigning] = useState(false);
  const { validateUser } = useValidator(validatorData?.id || '');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);

  console.log('Component render:', {
    address,
    validatorData,
    isLoading,
    error
  });

  useEffect(() => {
    const checkAccess = async () => {
      if (!address) {
        router.push('/');
        return;
      }

      const isValidatorStatus = await isValidator(address);
      if (!isValidatorStatus) {
        router.push('/become-validator');
      }
    };

    checkAccess();
  }, [address, isValidator, router]);

  // Calculate stats from validator data
  const stats = {
    totalStaked: validatorData ? formatEther(validatorData.totalStakedAmount) : '0',
    totalCredits: validatorData ? formatEther(validatorData.totalStakedAmount) : '0',
    assignedCredits: validatorData ? validatorData.userAssignments.reduce(
      (acc: number, assignment) => acc + Number(formatEther(assignment.user.creditBalance)), 
      0
    ).toString() : '0',
    unassignedCredits: validatorData ? (
      Number(formatEther(validatorData.totalStakedAmount)) - 
      validatorData.userAssignments.reduce(
        (acc: number, assignment) => acc + Number(formatEther(assignment.user.creditBalance)), 
        0
      )
    ).toString() : '0'
  };

  // Transform assignments data for the table
  const assignments = validatorData?.userAssignments.map(assignment => ({
    userAddress: assignment.user.id,
    creditBalance: formatEther(assignment.user.creditBalance),
    expectedReturn: 'Not available'
  })) || [];

  // Listen for the CreditsAssignedToUser event
  useContractEvent(
    validatorData?.id || '',
    ValidatorABI,
    'CreditsAssignedToUser',
    (user, amount) => {
      setShowAssignModal(false);
      setIsAssigning(false);
      setShowSuccessModal(true);
    }
  );

  const handleAssignCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatorData?.id) return;

    try {
      setIsAssigning(true);
      const tx = await validateUser(newAssignment.address, newAssignment.amount);
      await tx.wait();
    } catch (error: any) {
      console.error('Error assigning credits:', error);
      toast.error(error.message || 'Failed to assign credits');
      setIsAssigning(false);
    }
  };

  // Get token symbol once
  const tokenSymbol = validatorData?.stakedToken?.symbol || '';

  // Add effect to calculate returns when amount changes
  useEffect(() => {
    if (validatorData && newAssignment.amount) {
      const feePercentage = Number(validatorData.feePercentage) / 100; // Convert basis points to percentage
      const returns = (Number(newAssignment.amount) * feePercentage).toFixed(2);
      setNewAssignment(prev => ({ ...prev, returns }));
    }
  }, [newAssignment.amount, validatorData]);

  // Add this helper function at the top of the component
  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Add handler for checkbox changes
  const handleSelectAssignment = (userAddress: string) => {
    setSelectedAssignments(prev => {
      if (prev.includes(userAddress)) {
        return prev.filter(addr => addr !== userAddress);
      }
      return [...prev, userAddress];
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Dashboard Header */}
        <div className="mb-8 bg-[#1a103c]/50 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6">
          <h3 className="text-4xl font-bold text-white mb-6 pt-4">Validator Dashboard</h3>
          <div className="space-y-3">
            <CopyAddress 
              address={address || ''} 
              label="Validator Address" 
            />
            <CopyAddress 
              address={validatorData?.id || ''} 
              label="Contract Address" 
            />
            <div className="flex items-center text-gray-300">
              <span className="text-gray-400">Fee:</span>
              <span className="ml-2 text-white">{Number(validatorData?.feePercentage || 0) / 100}%</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#1a103c] to-[#2d1a5a] border-purple-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Total Staked
              </CardTitle>
              <Shield className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalStaked} {tokenSymbol}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a103c] to-[#2d1a5a] border-purple-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Total Credits
              </CardTitle>
              <Coins className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCredits} {tokenSymbol}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a103c] to-[#2d1a5a] border-purple-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Assigned Credits
              </CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.assignedCredits} {tokenSymbol}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a103c] to-[#2d1a5a] border-purple-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Unassigned Credits
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.unassignedCredits} {tokenSymbol}</div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Assignments Table */}
        <Card className="bg-gradient-to-br from-[#1a103c] to-[#2d1a5a] border-purple-900/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Credit Assignments</CardTitle>
            <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
              <DialogTrigger asChild>
                <Button className="bg-[#9333EA] hover:bg-[#7928CA] text-white" disabled={isAssigning}>
                  {isAssigning ? 'Assigning...' : 'Assign Credits'}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-[#1a103c] to-[#2d1a5a] border-purple-900/50">
                <DialogHeader>
                  <DialogTitle className="text-white">Assign Credits to User</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Enter the user's address, credit amount, and expected returns
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAssignCredit} className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-gray-200">User Address</Label>
                    <Input
                      id="address"
                      value={newAssignment.address}
                      onChange={(e) => setNewAssignment({ ...newAssignment, address: e.target.value })}
                      placeholder="0x..."
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount" className="text-gray-200">Credit Amount ({tokenSymbol})</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newAssignment.amount}
                      onChange={(e) => setNewAssignment({ ...newAssignment, amount: e.target.value })}
                      placeholder={`Amount in ${tokenSymbol}`}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="returns" className="text-gray-200">Expected Returns (%)</Label>
                    <Input
                      id="returns"
                      type="number"
                      step="0.1"
                      value={newAssignment.returns}
                      readOnly
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white" disabled={isAssigning}>
                    {isAssigning ? 'Assigning...' : 'Assign Credits'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="py-4 px-2 text-gray-300 w-10"></th>
                    <th className="py-4 px-2 text-gray-300">User Address</th>
                    <th className="py-4 px-2 text-gray-300">Credit Assigned</th>
                    <th className="py-4 px-2 text-gray-300">Expected Return Date</th>
                    <th className="py-4 px-2 text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {assignments.map((assignment, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-700 transition-all duration-200 hover:bg-purple-900/20 hover:shadow-[0_0_20px_rgba(147,51,234,0.1)] cursor-pointer"
                    >
                      <td className="py-4 px-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-600 bg-gray-700/50 text-purple-500 focus:ring-purple-500"
                          checked={selectedAssignments.includes(assignment.userAddress)}
                          onChange={() => handleSelectAssignment(assignment.userAddress)}
                        />
                      </td>
                      <td className="py-4 px-2 font-mono">{truncateAddress(assignment.userAddress)}</td>
                      <td className="py-4 px-2">{assignment.creditBalance}</td>
                      <td className="py-4 px-2">{assignment.expectedReturn}</td>
                      <td className="py-4 px-2">
                        <button 
                          className="p-2 hover:bg-purple-900/30 rounded-md transition-colors"
                          onClick={() => {/* TODO: Implement messaging */}}
                        >
                          <MessageCircle className="h-5 w-5 text-purple-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Credits Assigned Successfully!"
        description="The credits have been successfully assigned to the user."
      />
    </>
  );
} 