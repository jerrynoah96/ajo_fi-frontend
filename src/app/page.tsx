'use client';

import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from '@/components/Placeholder';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export default function Home() {
  const [activeRole, setActiveRole] = useState<'contributors' | 'validators'>('contributors');

  const roleDetails = {
    contributors: {
      title: "Contributors",
      description: "Join savings groups, make periodic contributions, and build your credit score to access larger loans without traditional collateral.",
      features: [
        {
          title: 'Join Groups',
          description: 'Connect with like-minded savers in trusted thrift circles',
          icon: '👥'
        },
        {
          title: 'Save & Earn',
          description: 'Make regular contributions and earn from group savings',
          icon: '💰'
        },
        {
          title: 'Build Credit',
          description: 'Access larger loans as you build your credit score',
          icon: '📈'
        }
      ]
    },
    validators: {
      title: "Validators",
      description: "Stake funds, validate transactions, and earn rewards while helping secure the network and supporting the ecosystem.",
      features: [
        {
          title: 'Stake Funds',
          description: 'Provide security for the network by staking your assets',
          icon: '🔒'
        },
        {
          title: 'Earn Rewards',
          description: 'Receive fees and rewards for validating transactions',
          icon: '💎'
        },
        {
          title: 'Grow Network',
          description: 'Help expand the ecosystem while earning passive income',
          icon: '🌐'
        }
      ]
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light to-blue-600 dark:from-primary-dark dark:to-blue-500 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                Decentralized Thrift & Credit System
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl mb-8"
              >
                Join trusted savings groups, access credit without collateral, and build your financial future with blockchain technology.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-x-4"
              >
                <Link href="/signup" 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Get Started
                </Link>
                <Link href="#how-it-works"
                  className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:w-1/2 mt-10 md:mt-0"
            >
              <PlaceholderImage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Join Thrift',
                description: 'Connect your wallet and join a trusted savings group',
                icon: '🤝'
              },
              {
                title: 'Contribute',
                description: 'Make periodic contributions to your group savings',
                icon: '💰'
              },
              {
                title: 'Withdraw',
                description: 'Access your funds when it is your turn',
                icon: '📤'
              },
              {
                title: 'Credit Growth',
                description: 'Build credit score and access larger loans',
                icon: '📈'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="text-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-dark-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AjoFi Section */}
      <section className="py-20 dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why Choose AjoFi?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Trustless System',
                description: 'Smart contracts ensure transparent and secure transactions',
                icon: '🔒'
              },
              {
                title: 'No Collateral',
                description: 'Access credit based on your participation and credit score',
                icon: '✨'
              },
              {
                title: 'Earn Rewards',
                description: 'Validators earn passive income for supporting the network',
                icon: '💎'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="text-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-dark-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Information Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Choose Your Role
          </motion.h2>
          
          {/* Role Cards */}
          <div className="flex flex-col md:flex-row gap-8 justify-center mb-16">
            {(['contributors', 'validators'] as const).map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="relative w-full md:w-[400px] h-[300px] perspective-1000"
                onMouseEnter={() => setActiveRole(role)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  activeRole === role ? 'rotate-y-180' : ''
                }`}>
                  {/* Front of card */}
                  <div className="absolute w-full h-full backface-hidden bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">
                      {role === 'contributors' ? '👥' : '🏦'}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 capitalize dark:text-white">
                      {roleDetails[role].title}
                    </h3>
                    <p className="text-gray-600 dark:text-dark-muted text-center">
                      Hover to learn more
                    </p>
                  </div>
                  
                  {/* Back of card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 flex flex-col items-center justify-center">
                    <p className="text-gray-600 dark:text-dark-muted text-center mb-6">
                      {roleDetails[role].description}
                    </p>
                    <Link
                      href={role === 'contributors' ? '/signup' : '/validator'}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      {role === 'contributors' ? 'Start Saving Today' : 'Become a Validator'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roleDetails[activeRole].features.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-dark-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: 1000000,
                prefix: '$',
                suffix: '+',
                label: 'Total Value Locked'
              },
              {
                number: 1000,
                suffix: '+',
                label: 'Active Users'
              },
              {
                number: 100,
                suffix: '+',
                label: 'Validators'
              }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AnimatedCounter 
                  value={stat.number} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
                <div className="text-gray-600 dark:text-dark-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-primary-dark dark:to-blue-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Start Your Financial Journey?</h2>
          <div className="space-x-4">
            <Link href="/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
              Join a Thrift Group
            </Link>
            <Link href="/validator"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition inline-block mt-4 md:mt-0">
              Become a Validator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
