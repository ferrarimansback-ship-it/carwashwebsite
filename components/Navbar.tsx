'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-8 left-0 right-0 z-40 theme-surface backdrop-blur-md border-b border-white/10 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3 justify-between items-center">
        <h1 className="text-[var(--text)] text-base sm:text-xl font-bold">Buff'd</h1>
        <div className="flex items-center gap-3">
          <button
            className="mt-5 rounded-2xl py-2 px-4 text-lg text-[var(--text)] shadow-lg transition hover:opacity-90 hover:shadow-xl theme-accent sm:mt-4"
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Services
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;