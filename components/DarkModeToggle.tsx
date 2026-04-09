'use client';

import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return (
      <button
        type="button"
        className="h-10 w-10 shrink-0 rounded-[15px] border border-white/10 bg-white/10 text-white flex items-center justify-center"
        aria-label="Toggle theme"
      >
        ☀️
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsDarkMode(prev => !prev)}
      className="h-10 w-10 shrink-0 rounded-[15px] border border-white/10 bg-white/10 text-white transition duration-300 hover:bg-white/20 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;