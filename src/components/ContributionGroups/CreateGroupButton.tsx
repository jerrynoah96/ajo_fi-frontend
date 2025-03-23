'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CreateGroupModal } from './CreateGroupModal';

export function CreateGroupButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Create Group</span>
      </button>

      <CreateGroupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
} 