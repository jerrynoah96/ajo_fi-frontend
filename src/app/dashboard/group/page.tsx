'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon
} from '@heroicons/react/24/outline';

// Helper function to truncate addresses
function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

export default function GroupDashboard() {
  const searchParams = useSearchParams();
  
  const amount = searchParams.get('amount') || '0';
  const duration = searchParams.get('duration') || '0';
  const totalMembers = searchParams.get('members') || '0';
  const joinedMembers = '1'; // Starting with the creator
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: '0x1234567890abcdef1234567890abcdef12345678',
      message: 'Welcome to the group chat!',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: '2',
      sender: '0xabcdef1234567890abcdef1234567890abcdef12',
      message: 'Thanks for creating this group. Looking forward to our contributions.',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
  ]);
  
  // Mock data for contribution order - in a real app, this would come from your backend
  const contributionOrder = [
    { address: '0x1234567890abcdef1234567890abcdef12345678', position: 1 },
    { address: '0xabcdef1234567890abcdef1234567890abcdef12', position: 2 },
    { address: '0x7890abcdef1234567890abcdef1234567890abcd', position: 3 },
    // Add more as needed based on totalMembers
  ].slice(0, parseInt(totalMembers));
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    // Add new message to chat
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: '0x1234567890abcdef1234567890abcdef12345678', // Current user's address
      message: chatMessage,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  const toggleChatExpand = () => {
    setIsChatExpanded(!isChatExpanded);
  };
  
  // Format timestamp for chat messages
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 relative">
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
      
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg transition-all z-10"
        aria-label="Toggle chat"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>
      
      {/* Chat box */}
      {isChatOpen && (
        <div 
          className={`fixed ${
            isChatExpanded 
              ? 'top-20 right-6 left-6 bottom-20 md:left-auto md:right-6 md:w-1/2 lg:w-1/3' 
              : 'bottom-20 right-6 w-80 md:w-96'
          } bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl z-10 flex flex-col transition-all duration-300`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-medium">Group Chat</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleChatExpand}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={isChatExpanded ? "Collapse chat" : "Expand chat"}
              >
                {isChatExpanded ? (
                  <ArrowsPointingInIcon className="h-5 w-5" />
                ) : (
                  <ArrowsPointingOutIcon className="h-5 w-5" />
                )}
              </button>
              <button 
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isChatExpanded ? '' : 'max-h-80'}`}>
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === '0x1234567890abcdef1234567890abcdef12345678' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-400 font-mono">{truncateAddress(msg.sender)}</span>
                  <span className="text-xs text-gray-500 ml-2">{formatMessageTime(msg.timestamp)}</span>
                </div>
                <div 
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    msg.sender === '0x1234567890abcdef1234567890abcdef12345678' 
                      ? 'bg-purple-500/30 text-white' 
                      : 'bg-gray-700/70 text-gray-200'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700 flex">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="ml-2 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 