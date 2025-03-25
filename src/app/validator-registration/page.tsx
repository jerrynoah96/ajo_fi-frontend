'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ValidatorRegistration() {
  const router = useRouter();
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
    // For now, we'll just show the success modal
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/validator-dashboard'); // Navigate to dashboard after success
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-dark-bg min-h-screen">
      <Card className="max-w-2xl mx-auto bg-dark-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <CardTitle>Validator Registration</CardTitle>
          </div>
          <CardDescription>
            Register as a validator to provide credits and secure the AJO-FI network
          </CardDescription>
        </CardHeader>
        <CardContent>
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

            <Button type="submit" className="w-full">
              Submit Registration
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-dark-card text-dark-text">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-500" />
              Registration Successful
            </DialogTitle>
            <DialogDescription className="text-dark-muted">
              Your validator registration has been confirmed. You can now start managing credits.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleSuccessClose} className="bg-primary-light hover:bg-primary-dark">
              Go to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 