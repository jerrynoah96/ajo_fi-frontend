'use client';

import { useState } from 'react';

interface GroupsToggleProps {
  activeView: 'all' | 'my';
  onToggle: (view: 'all' | 'my') => void;
}

export function GroupsToggle({ activeView, onToggle }: GroupsToggleProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 inline-flex">
      <button
        onClick={() => onToggle('all')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeView === 'all'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        All Groups
      </button>
      <button
        onClick={() => onToggle('my')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeView === 'my'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        My Groups
      </button>
    </div>
  );
} 