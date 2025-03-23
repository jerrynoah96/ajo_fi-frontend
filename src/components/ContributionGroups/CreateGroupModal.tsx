'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CurrencyDollarIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [formData, setFormData] = useState({
    contributionAmount: '',
    duration: '',
    totalMembers: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - changed opacity from /90 to /70 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Modal - changed opacity back to 1 and scale to 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.75, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Create New Group</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Contribution Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={formData.contributionAmount}
                        onChange={(e) => setFormData({ ...formData, contributionAmount: e.target.value })}
                        className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Duration (in days)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter duration"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Total Members Required
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UsersIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={formData.totalMembers}
                        onChange={(e) => setFormData({ ...formData, totalMembers: e.target.value })}
                        className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter number of members"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors mt-6"
                  >
                    Create Group
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 