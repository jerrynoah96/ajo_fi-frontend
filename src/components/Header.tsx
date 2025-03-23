import Link from 'next/link';
import { motion } from 'framer-motion';

export const Header = () => {
  // This is a simplified version - you'll want to add proper auth state management
  const isLoggedIn = false; // Replace with actual auth state

  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AjoFi
        </Link>

        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login"
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}; 