'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Footer } from '@/components/Footer';

type ViewMode = 'default' | 'validator' | 'contributor';

const problems = [
  {
    id: 1,
    title: "Lack of Trust in Traditional Savings Groups",
    description: "Members must trust others to keep contributing, leading to defaults and disputes.",
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    id: 2,
    title: "Collateral Barriers to Credit Access",
    description: "Many users cannot access credit due to lack of upfront collateral.",
    gradient: "from-blue-500/20 to-teal-500/20"
  },
  {
    id: 3,
    title: "Limited Financial Inclusion",
    description: "Traditional financial systems exclude those without formal credit histories.",
    gradient: "from-teal-500/20 to-emerald-500/20"
  },
  {
    id: 4,
    title: "Validator Incentives & Risk Management",
    description: "Ensuring validators can support users while earning rewards and mitigating risks.",
    gradient: "from-emerald-500/20 to-purple-500/20"
  },
  {
    id: 5,
    title: "Seamless Fiat-to-Crypto Integration",
    description: "Lowering the barrier for non-crypto users to participate easily.",
    gradient: "from-purple-500/20 to-pink-500/20"
  }
];

// Add a prop type for the navbar
interface PageProps {
  setHomeView?: (view: 'default') => void;
}

export default function Home({ setHomeView }: PageProps) {
  const [activeView, setActiveView] = useState<ViewMode>('default');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (activeView !== 'default') return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentProblemIndex((prev) => (prev + 1) % problems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeView]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentProblemIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % problems.length;
      }
      return prev === 0 ? problems.length - 1 : prev - 1;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
      rotateY: direction > 0 ? '15deg' : '-15deg'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotateY: '0deg'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
      rotateY: direction < 0 ? '15deg' : '-15deg'
    })
  };

  // Add this function to pass up to Navbar
  const handleLogoClick = () => {
    setActiveView('default');
  };

  useEffect(() => {
    // Make this function available to parent components
    if (setHomeView) {
      setHomeView(() => handleLogoClick);
    }
  }, [setHomeView]);

  return (
    <div className="min-h-screen bg-[#0A0B0D] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-purple-900/30 via-black to-teal-900/30"
          style={{ filter: 'blur(120px)' }}
        />
        <div className="absolute w-full h-full bg-[url('/grid.png')] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          {/* Add AjoFi text with better positioning and interaction */}
          <button
            onClick={() => setActiveView('default')}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 cursor-pointer mt-6 hover:scale-105 transition-transform"
          >
            AjoFi
          </button>

          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center mt-10">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400 mb-6">
              Decentralized
              <br />
              Savings Groups
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mb-8">
              Join trusted savings groups or create your own. Secure, transparent, and community-driven.
            </p>
          </div>

          {/* Problems Section */}
          {activeView === 'default' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-24"
            >
              <h2 className="text-3xl font-bold text-center mb-16">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                  Problems We're Solving
                </span>
              </h2>
              
              <div className="relative max-w-4xl mx-auto perspective-1000">
                <div className="overflow-hidden relative min-h-[300px]">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={currentProblemIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 25,
                          restDelta: 0.01 
                        },
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.4 },
                        filter: { duration: 0.4 },
                        rotateY: { duration: 0.4 }
                      }}
                      className="absolute w-full transform-style-3d"
                    >
                      <div 
                        className={`
                          backdrop-blur-xl rounded-2xl border border-gray-800
                          bg-gradient-to-br ${problems[currentProblemIndex].gradient}
                          p-8 text-center shadow-2xl
                          hover:border-gray-700 transition-all
                          relative overflow-hidden
                          transform-style-3d
                        `}
                        style={{
                          boxShadow: '0 0 40px rgba(139, 92, 246, 0.1)'
                        }}
                      >
                        {/* Animated background gradient */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5"
                          animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            backgroundSize: '200% 200%'
                          }}
                        />
                        
                        <div className="relative z-10">
                          <motion.h3 
                            className="text-2xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            {problems[currentProblemIndex].title}
                          </motion.h3>
                          <motion.p 
                            className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            {problems[currentProblemIndex].description}
                          </motion.p>
                        </div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex justify-center items-center gap-3 mt-8">
                  <button
                    onClick={() => paginate(-1)}
                    className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  {problems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentProblemIndex ? 1 : -1);
                        setCurrentProblemIndex(index);
                      }}
                      className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${index === currentProblemIndex 
                          ? 'bg-gradient-to-r from-purple-400 to-teal-400 w-8' 
                          : 'bg-gray-700 hover:bg-gray-600'
                        }
                      `}
                    />
                  ))}
                  
                  <button
                    onClick={() => paginate(1)}
                    className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <button
                  onClick={() => setActiveView('contributor')}
                  className="
                    px-8 py-4 rounded-lg font-medium
                    bg-gradient-to-r from-purple-500 to-teal-500
                    hover:from-purple-600 hover:to-teal-600
                    text-white shadow-lg
                    hover:shadow-purple-500/25
                    transition-all duration-300
                    transform hover:scale-105
                  "
                >
                  Learn How It Works
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* View Toggle Buttons - Only show if not in default view */}
          {activeView !== 'default' && (
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveView('contributor')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeView === 'contributor'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                For Contributors
              </button>
              <button
                onClick={() => setActiveView('validator')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeView === 'validator'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                For Validators
              </button>
            </div>
          )}

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeView === 'contributor' && (
              <motion.div
                key="contributor"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">Join Trusted Savings Groups</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Browse Active Groups</h3>
                        <p className="text-gray-300">Find groups that match your savings goals and contribution capacity.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Join or Create</h3>
                        <p className="text-gray-300">Join existing groups or create your own with custom parameters.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Stake or Request Credit</h3>
                        <p className="text-gray-300">Stake collateral or request credit points from validators to participate.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">4</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Contribute & Collect</h3>
                        <p className="text-gray-300">Make regular contributions and receive your share when it's your turn.</p>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href="/groups"
                    className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Get Started
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {!imageError ? (
                      <Image
                        src="/validator-dashboard.png"
                        alt="Validator Dashboard"
                        width={1200}
                        height={800}
                        priority
                        onError={() => setImageError(true)}
                        className="rounded-lg shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                        style={{
                          filter: 'brightness(1.1) contrast(1.1)',
                          WebkitBackdropFilter: 'blur(4px)',
                        }}
                      />
                    ) : (
                      <div className="aspect-[16/10] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                        <p className="text-gray-500">Failed to load dashboard preview</p>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-gray-900/20 to-transparent" />
                    
                    {/* Feature highlights - Desktop version */}
                    <div className="absolute -right-4 top-4 bg-purple-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 md:block hidden">
                      Real-time Credit Management
                    </div>
                    <div className="absolute -right-4 top-20 bg-teal-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100 md:block hidden">
                      Stake & Earn Rewards
                    </div>
                    <div className="absolute -right-4 top-36 bg-blue-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-200 md:block hidden">
                      Track Credit Assignments
                    </div>

                    {/* Feature highlights - Mobile version */}
                    <div className="absolute inset-x-4 bottom-4 md:hidden">
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <p className="text-sm text-white">Real-time Credit Management</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-teal-500" />
                          <p className="text-sm text-white">Stake & Earn Rewards</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <p className="text-sm text-white">Track Credit Assignments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeView === 'validator' && (
              <motion.div
                key="validator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">Become a Validator</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Apply as Validator</h3>
                        <p className="text-gray-300">Submit your application and get verified to become a trusted validator.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Stake & Get Credit Points</h3>
                        <p className="text-gray-300">Deposit collateral to receive credit points that you can assign to users.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Assign Credit Points</h3>
                        <p className="text-gray-300">Review user requests and assign credit points based on your requirements and risk assessment.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">4</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Earn Rewards</h3>
                        <p className="text-gray-300">
                          Receive rewards from successful credit assignments, earn passive yields on your stake, and get platform contribution bonuses.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href="/become-validator"
                    className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Apply Now
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {!imageError ? (
                      <Image
                        src="/validator-dashboard.png"
                        alt="Validator Dashboard"
                        width={1200}
                        height={800}
                        priority
                        onError={() => setImageError(true)}
                        className="rounded-lg shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                        style={{
                          filter: 'brightness(1.1) contrast(1.1)',
                          WebkitBackdropFilter: 'blur(4px)',
                        }}
                      />
                    ) : (
                      <div className="aspect-[16/10] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                        <p className="text-gray-500">Failed to load dashboard preview</p>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-gray-900/20 to-transparent" />
                    
                    {/* Feature highlights - Desktop version */}
                    <div className="absolute -right-4 top-4 bg-purple-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 md:block hidden">
                      Real-time Credit Management
                    </div>
                    <div className="absolute -right-4 top-20 bg-teal-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100 md:block hidden">
                      Stake & Earn Rewards
                    </div>
                    <div className="absolute -right-4 top-36 bg-blue-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-200 md:block hidden">
                      Track Credit Assignments
                    </div>

                    {/* Feature highlights - Mobile version */}
                    <div className="absolute inset-x-4 bottom-4 md:hidden">
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <p className="text-sm text-white">Real-time Credit Management</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-teal-500" />
                          <p className="text-sm text-white">Stake & Earn Rewards</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <p className="text-sm text-white">Track Credit Assignments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer onLogoClick={handleLogoClick} />
    </div>
  );
} 