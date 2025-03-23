'use client';

import { ContributionGroupsList } from '@/components/ContributionGroups/ContributionGroupsList';
import { CreateGroupButton } from '@/components/ContributionGroups/CreateGroupButton';

export default function GroupsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">
          Contribution Groups
        </h1>
        <CreateGroupButton />
      </div>
      
      <ContributionGroupsList />
    </div>
  );
} 