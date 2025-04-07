'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';

// Custom Discord SVG icon
const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
    <path d="M15 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
    <path d="M8.5 17c0 1-1.356 3-3 3-1.644 0-3-2-3-3 0-.993.006-2.662.006-3 0-6 4-8 7.494-8C13.494 6 17 8 17 14c0 .338-.001 2 0 3 0 1-1.356 3-3 3-1.644 0-3-2-3-3" />
  </svg>
);

// Add onLogoClick prop to Footer component
interface FooterProps {
  onLogoClick?: () => void;
}

export function Footer({ onLogoClick }: FooterProps) {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 mt-20 relative z-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <button  // Changed from Link to button
              onClick={onLogoClick}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 cursor-pointer"
            >
              AjoFi
            </button>
            <p className="text-gray-100 text-lg">
              Decentralized savings groups for everyone. Secure, transparent, and community-driven.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://X.com/ajofi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-purple-400 transition-colors"
              >
                <Icons.X size={20} />
              </a>
              <a 
                href="https://discord.gg/ajofi" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <DiscordIcon size={20} />
              </a>
              <a 
                href="https://github.com/ajofi" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Icons.Github size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/groups" 
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <Icons.Users size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>Savings Groups</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/become-validator" 
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <Icons.Shield size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>Become a Validator</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/roadmap" 
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <Icons.FileText size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>Roadmap</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://docs.google.com/document/d/1GipSwKsjBNQ9XlxN3VDhYNrxm68-HSl46oQRKc7cX4U/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
                >
                  <Icons.FileText size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>Whitepaper</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.ajofi.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <Icons.Book size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <Icons.HelpCircle size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://forum.ajofi.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <Icons.MessageSquare size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>Forum</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/ajofi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <DiscordIcon size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>Discord</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://X.com/ajofi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-gray-100 hover:text-purple-400 transition-colors"
                >
                  <Icons.X size={16} className="group-hover:text-purple-400 transition-colors" />
                  <span>X</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-100">
              © {new Date().getFullYear()} AjoFi. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link 
                href="/privacy" 
                className="text-gray-100 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-100 hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 