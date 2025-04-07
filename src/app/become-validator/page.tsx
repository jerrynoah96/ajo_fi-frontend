'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BecomeValidatorPage() {
  const router = useRouter();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    walletAddress: '',
    stakeAmount: '',
    creditAllocation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to register the validator
    setShowRegistrationModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/validator&apos;s dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Become an AJO-FI Validator</h1>
      
      <Card className="max-w-2xl mx-auto">
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
          <DialogHeader>
            <DialogTitle>Validator Registration</DialogTitle>
            <DialogDescription>
              Register as a validator to provide credits and secure the AJO-FI network
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="stakeAmount">Initial Stake Amount (AJO)</Label>
              <Input
                id="stakeAmount"
                type="number"
                placeholder="Minimum stake: 1000 AJO"
                value={formData.stakeAmount}
                onChange={(e) => setFormData({ ...formData, stakeAmount: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                Your stake determines how many credits you can provide to users
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditAllocation">Maximum Credit Per User (AJO)</Label>
              <Input
                id="creditAllocation"
                type="number"
                placeholder="Maximum credit you'll provide per user"
                value={formData.creditAllocation}
                onChange={(e) => setFormData({ ...formData, creditAllocation: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                Set a limit for how much credit you'll provide to individual users
              </p>
            </div>

            <Button type="submit" className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white">
              Submit Registration
            </Button>
          </form>
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
            <Button onClick={handleSuccessClose} className="bg-[#9333EA] hover:bg-[#7928CA] text-white">
              Go to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 