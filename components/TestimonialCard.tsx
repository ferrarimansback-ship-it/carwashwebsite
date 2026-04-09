import React from 'react';

interface TestimonialCardProps {
  name: string;
  review: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, review }) => {
  return (
    <div className="theme-card relative rounded-2xl shadow-md p-5 transition-transform duration-300 hover:-translate-y-1">
      <p className="text-slate-700 dark:text-slate-300">"{review}"</p>
      <p className="text-slate-600 dark:text-slate-400">- {name}</p>
    </div>
  );
};

export default TestimonialCard;