'use client';

import { useState } from 'react';
import { ContributionGroupCard } from './ContributionGroupCard';
import { GroupsToggle } from './GroupsToggle';

// This would come from your API/smart contract in production
const MOCK_GROUPS = [
  {
    id: '1',
    timeCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    contributionAmount: 100,
    requestedUsers: 10,
    joinedUsers: 10,
    isLocked: true,
    isMember: true,
  },
  {
    id: '2',
    timeCreated: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    contributionAmount: 50,
    requestedUsers: 5,
    joinedUsers: 3,
    isLocked: false,
    isMember: false,
  },
  {
    id: '3',
    timeCreated: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    contributionAmount: 75,
    requestedUsers: 8,
    joinedUsers: 6,
    isLocked: false,
    isMember: true,
  },
];

export function ContributionGroupsList() {
  const [activeView, setActiveView] = useState<'all' | 'my'>('all');

  const displayedGroups = activeView === 'all' 
    ? MOCK_GROUPS 
    : MOCK_GROUPS.filter(group => group.isMember);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <GroupsToggle activeView={activeView} onToggle={setActiveView} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedGroups.map((group) => (
          <ContributionGroupCard key={group.id} {...group} />
        ))}
      </div>
      
      {activeView === 'my' && displayedGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            You haven't joined any groups yet.
          </p>
        </div>
      )}
    </div>
  );
} 