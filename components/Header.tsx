'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary-600">CardScan AI</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Dashboard</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Contacts</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Settings</a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a href="#" className="block text-gray-600 dark:text-gray-300">Dashboard</a>
            <a href="#" className="block text-gray-600 dark:text-gray-300">Contacts</a>
            <a href="#" className="block text-gray-600 dark:text-gray-300">Settings</a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
            >
              {theme === 'dark' ? (
                <>
                  <SunIcon className="h-6 w-6" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <MoonIcon className="h-6 w-6" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
} 