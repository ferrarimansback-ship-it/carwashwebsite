import React from 'react';

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  highlight?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  price, 
  description, 
  highlight,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`theme-card relative w-full rounded-2xl p-5 text-left shadow-md transition-all duration-300 hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-[var(--accent-to)] shadow-xl' : ''
      } ${highlight ? 'border border-fuchsia-400/50' : ''}`}
    >
      {highlight && (
        <div className="absolute top-4 right-4 theme-accent text-xs px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-1 text-base text-[var(--text-muted)]">{price}</p>
      <p className="mt-4 leading-7 text-[var(--text-muted)]">{description}</p>
    </button>
  );
};

export default ServiceCard;