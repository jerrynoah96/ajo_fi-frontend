'use client';

import { formatDistanceToNow } from 'date-fns';
import { LockClosedIcon, LockOpenIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface ContributionGroupCardProps {
  id: string;
  timeCreated: Date;
  contributionAmount: number;
  requestedUsers: number;
  joinedUsers: number;
  isLocked: boolean;
  isMember: boolean;
}

export function ContributionGroupCard({
  timeCreated,
  contributionAmount,
  requestedUsers,
  joinedUsers,
  isLocked,
}: ContributionGroupCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-purple-500/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">
            Created {formatDistanceToNow(timeCreated)} ago
          </p>
          <div className="flex items-center gap-2 mt-2">
            <CurrencyDollarIcon className="w-5 h-5 text-purple-400" />
            <span className="text-xl font-semibold">${contributionAmount}</span>
          </div>
        </div>
        {isLocked ? (
          <LockClosedIcon className="w-6 h-6 text-green-400" />
        ) : (
          <LockOpenIcon className="w-6 h-6 text-yellow-400" />
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Members</span>
          </div>
          <span className="text-gray-300">
            {joinedUsers} / {requestedUsers}
          </span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${(joinedUsers / requestedUsers) * 100}%` }}
          />
        </div>

        <button 
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isLocked 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
          disabled={isLocked}
        >
          {isLocked ? 'Group Full' : 'Join Group'}
        </button>
      </div>
    </div>
  );
} 