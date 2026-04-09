import React from 'react';

const status = {
  text: "Currently servicing",
  location: "Wellington CBD",
  color: "bg-red-500",
};

const Banner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 backdrop-blur-md bg-[var(--surface)]/80 border-b border-white/5 flex items-center justify-center text-xs sm:text-sm">
      
      <div className="flex items-center gap-2 animate-[fadeIn_0.5s_ease]">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />

        <span className="font-medium">
          Currently servicing:
        </span>

        <span className="text-[var(--text-muted)]">
          Wellington CBD • Limited spots today
        </span>
      </div>

    </div>
  );
};

export default Banner;