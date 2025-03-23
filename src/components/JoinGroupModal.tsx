import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinGroupModal = ({ isOpen, onClose }: JoinGroupModalProps) => {
  const [step, setStep] = useState(1);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Join New Thrift Group</h2>
                <p className="text-gray-600">Find the perfect group for your savings goals</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Group Search Filters */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contribution Amount
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>₦10,000 - ₦50,000</option>
                      <option>₦50,000 - ₦100,000</option>
                      <option>₦100,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>

                {/* Available Groups */}
                <div className="space-y-4">
                  {[1, 2, 3].map((group) => (
                    <motion.div
                      key={group}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Monthly Savings Group {group}</h3>
                          <p className="text-sm text-gray-600">8/10 members</p>
                        </div>
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                          Open
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Contribution</p>
                          <p className="font-medium">₦50,000/month</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Required Score</p>
                          <p className="font-medium">650+</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Request to Join
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 