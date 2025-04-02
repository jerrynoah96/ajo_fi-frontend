'use client';

import { useSearchParams } from 'next/navigation';
import { UsersIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

// Helper function to truncate addresses
function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}

export default function GroupDashboard() {
  const searchParams = useSearchParams();
  
  const amount = searchParams.get('amount') || '0';
  const duration = searchParams.get('duration') || '0';
  const totalMembers = searchParams.get('members') || '0';
  const joinedMembers = '1'; // Starting with the creator
  
  // Mock data for contribution order - in a real app, this would come from your backend
  const contributionOrder = [
    { address: '0x1234567890abcdef1234567890abcdef12345678', position: 1 },
    { address: '0xabcdef1234567890abcdef1234567890abcdef12', position: 2 },
    { address: '0x7890abcdef1234567890abcdef1234567890abcd', position: 3 },
    // Add more as needed based on totalMembers
  ].slice(0, parseInt(totalMembers));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Contribution Group Dashboard</h1>
      
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Group Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700/50 rounded-lg p-4 flex items-center">
            <CurrencyDollarIcon className="h-10 w-10 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-400 text-sm">Contribution Amount</p>
              <p className="text-white text-xl font-semibold">${amount}</p>
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4 flex items-center">
            <ClockIcon className="h-10 w-10 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-400 text-sm">Duration</p>
              <p className="text-white text-xl font-semibold">{duration} days</p>
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4 flex items-center">
            <UsersIcon className="h-10 w-10 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-400 text-sm">Members</p>
              <p className="text-white text-xl font-semibold">{joinedMembers} / {totalMembers}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Progress</h2>
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div 
            className="bg-purple-500 h-4 rounded-full" 
            style={{ width: `${(parseInt(joinedMembers) / parseInt(totalMembers)) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-300">
          {joinedMembers} out of {totalMembers} members have joined this group.
        </p>
      </div>
      
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Contribution Order</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-2 font-medium">Position</th>
                <th className="pb-2 font-medium">Address</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {contributionOrder.map((member) => (
                <tr key={member.position} className="border-b border-gray-700/50">
                  <td className="py-3 text-white">{member.position}</td>
                  <td className="py-3 text-white font-mono">{truncateAddress(member.address)}</td>
                  <td className="py-3">
                    {member.position === 1 ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        Current
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                        Waiting
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {/* Show empty slots if not all positions are filled */}
              {Array.from({ length: Math.max(0, parseInt(totalMembers) - contributionOrder.length) }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-gray-700/50">
                  <td className="py-3 text-white">{contributionOrder.length + i + 1}</td>
                  <td className="py-3 text-gray-500 italic">Not joined yet</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                      Empty
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 