import React from 'react';

type Step = 'service' | 'vehicle' | 'doors' | 'suburb' | 'time' | 'contact' | 'confirm';

interface ServiceCardProps {
  title: string;
  price: string;
  summary: string;
  features: string[];
  duration: string;
  bestFor?: string;
  highlight?: boolean;

  isSelected?: boolean;
  step?: Step;

  onSelect?: () => void;
  onContinue?: () => void;

  children?: React.ReactNode; // step content injected from parent
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  price,
  summary,
  features,
  duration,
  bestFor,
  highlight = false,
  isSelected = false,
  step = 'service',
  onSelect,
  onContinue,
  children,
}) => {
  return (
    <div
      className={`theme-card relative w-full rounded-2xl border p-5 text-left shadow-md transition-all duration-300 ${
        isSelected
          ? 'scale-[1.02] border-[var(--accent-to)] ring-2 ring-[var(--accent-to)] shadow-xl'
          : 'border-white/10 hover:-translate-y-1 hover:shadow-xl cursor-pointer'
      } ${highlight ? 'border-fuchsia-400/50' : ''}`}
      onClick={!isSelected ? onSelect : undefined}
    >
      {highlight && (
        <div className="theme-accent absolute right-4 top-4 rounded-full px-3 py-1 text-xs">
          Most Popular
        </div>
      )}

      {/* HEADER */}
      <div className="pr-24">
        <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
        <p className="mt-1 text-base text-[var(--text-muted)]">{price}</p>
      </div>

      {/* DEFAULT CONTENT (only when not selected) */}
      {!isSelected && (
        <>
          <p className="mt-4 leading-7 text-[var(--text-muted)]">{summary}</p>

          <div className="mt-4 space-y-2">
            {features.map((feature, index) => (
              <p key={index} className="text-sm text-[var(--text-muted)]">
                ✓ {feature}
              </p>
            ))}
          </div>

          <div className="mt-4 text-sm text-[var(--text-muted)]">
            <p>⏱ {duration}</p>
            {bestFor && <p className="mt-1">Best for: {bestFor}</p>}
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-sm text-[var(--text-muted)]">
              Tap to select this service.
            </p>
          </div>
        </>
      )}

      {/* EXPANDED FLOW (when selected) */}
      {isSelected && (
        <div className="mt-5 border-t border-white/10 pt-4 space-y-4">
          {/* Injected step UI */}
          {children}

          {/* Continue button */}
          {onContinue && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onContinue();
              }}
              className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;