'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardSelectPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-12">Select Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card 
          className="cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => router.push('/validator-dashboard')}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-500" />
              <CardTitle>Validator Dashboard</CardTitle>
            </div>
            <CardDescription>
              Manage your validator operations and credit assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>View staked amount and earnings</li>
              <li>Manage credit assignments</li>
              <li>Monitor validator performance</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => router.push('/user-dashboard')}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              <CardTitle>User Dashboard</CardTitle>
            </div>
            <CardDescription>
              View your contribution groups and credit status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>View active contribution groups</li>
              <li>Check credit balance</li>
              <li>Track contribution history</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 