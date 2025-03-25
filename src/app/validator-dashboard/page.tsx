'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Users, Coins, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface CreditAssignment {
  userAddress: string;
  amount: number;
  amountUSD: number;
  returns: number;
  assignedDate: string;
  expectedReturn: string;
}

export default function ValidatorDashboard() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    address: '',
    amount: '',
    returns: '',
  });

  // Mock data
  const mockData = {
    totalStaked: 10000,
    totalStakedUSD: 15000,
    totalCredits: 8000,
    assignedCredits: 5000,
    unassignedCredits: 3000,
    assignments: [
      {
        userAddress: "0x1234...5678",
        amount: 1000,
        amountUSD: 1500,
        returns: 5, // 5% return
        assignedDate: "2024-03-15",
        expectedReturn: "2024-06-15"
      },
      {
        userAddress: "0x8765...4321",
        amount: 2000,
        amountUSD: 3000,
        returns: 7.5, // 7.5% return
        assignedDate: "2024-03-16",
        expectedReturn: "2024-06-16"
      },
    ]
  };

  const handleAssignCredit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAssignModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Validator Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Staked
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalStaked} AJO</div>
            <div className="text-sm text-muted-foreground">${mockData.totalStakedUSD.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Credits
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalCredits} AJO</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Credits
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.assignedCredits} AJO</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Unassigned Credits
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.unassignedCredits} AJO</div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Assignments Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Credit Assignments</CardTitle>
          <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
            <DialogTrigger asChild>
              <Button className="bg-[#9333EA] hover:bg-[#7928CA] text-white">
                Assign Credits
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Credits to User</DialogTitle>
                <DialogDescription>
                  Enter the user's address, credit amount, and expected returns
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAssignCredit} className="space-y-4">
                <div>
                  <Label htmlFor="address">User Address</Label>
                  <Input
                    id="address"
                    value={newAssignment.address}
                    onChange={(e) => setNewAssignment({ ...newAssignment, address: e.target.value })}
                    placeholder="0x..."
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Credit Amount (AJO)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newAssignment.amount}
                    onChange={(e) => setNewAssignment({ ...newAssignment, amount: e.target.value })}
                    placeholder="Amount in AJO"
                  />
                </div>
                <div>
                  <Label htmlFor="returns">Expected Returns (%)</Label>
                  <Input
                    id="returns"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={newAssignment.returns}
                    onChange={(e) => setNewAssignment({ ...newAssignment, returns: e.target.value })}
                    placeholder="e.g., 5.5"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white">
                  Assign Credits
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-4 px-2">User Address</th>
                  <th className="py-4 px-2">Amount (AJO)</th>
                  <th className="py-4 px-2">Amount (USD)</th>
                  <th className="py-4 px-2">Returns (%)</th>
                  <th className="py-4 px-2">Assigned Date</th>
                  <th className="py-4 px-2">Expected Return</th>
                </tr>
              </thead>
              <tbody>
                {mockData.assignments.map((assignment, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-2">{assignment.userAddress}</td>
                    <td className="py-4 px-2">{assignment.amount} AJO</td>
                    <td className="py-4 px-2">${assignment.amountUSD.toLocaleString()}</td>
                    <td className="py-4 px-2">{assignment.returns}%</td>
                    <td className="py-4 px-2">{assignment.assignedDate}</td>
                    <td className="py-4 px-2">{assignment.expectedReturn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 