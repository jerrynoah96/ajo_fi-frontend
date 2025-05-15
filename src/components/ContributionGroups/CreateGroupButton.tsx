'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CreateGroupModal } from './CreateGroupModal';
import { usePurseFactory } from '@/hooks/contracts/usePurseFactory';
import { useContractEvent } from '@/hooks/contracts/useContractEvent';
import { CONTRACT_ADDRESSES } from '@/contracts/addresses';
import { PurseFactoryABI } from '@/contracts/abis';

export function CreateGroupButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createPurse } = usePurseFactory();

  // Listen for PurseCreated events
  useContractEvent(
    CONTRACT_ADDRESSES.PURSE_FACTORY,
    PurseFactoryABI,
    'PurseCreated',
    (purse, creator) => {
      console.log('New purse created:', { purse, creator });
      // Handle new purse creation (e.g., show notification, refresh list, etc.)
    }
  );

  const handleCreatePurse = async (data: {
    contributionAmount: number;
    maxMembers: number;
    roundInterval: number;
    tokenAddress: string;
    position: number;
    maxDelayTime: number;
    validator: string;
  }) => {
    try {
      await createPurse(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating purse:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors mt-20"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Create Group</span>
      </button>

      <CreateGroupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePurse}
      />
    </>
  );
} 