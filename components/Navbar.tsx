'use client';

import React, { useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
const basePath = process.env.NODE_ENV === 'production' ? '/buffdnz' : '';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-8 left-0 right-0 z-40 theme-surface backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
      }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center items-center justify-between gap-3">
        <img
          src={`${basePath}/brand/buffd/buffd-logo-primary.png`}
          alt="Buff’d"
          className="h-10 w-10 object-contain"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-2xl px-5 py-3 text-sm sm:text-lg text-[var(--text)] shadow-lg transition hover:opacity-90 hover:shadow-xl theme-accent leading-none flex items-center justify-center"
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Services
          </button>

          <div className="flex items-center justify-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;