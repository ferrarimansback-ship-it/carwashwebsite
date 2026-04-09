'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { DOOR_OPTIONS, SERVICE_BASE_PRICES, VEHICLE_TYPES, WELLINGTON_SUBURBS } from '../data/pricing';

interface BookingFormProps {
  selectedService: string;
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  setEstimate: (value: string | null) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  selectedService, 
  setSelectedService, 
  setEstimate,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [doors, setDoors] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const fieldClassName =
    'w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none transition focus:ring-2 focus:ring-[var(--accent-from)]';

  const estimate = useMemo(() => {
  if (!selectedService) return null;
  if (selectedService === 'premium') return 'Quote on inspection';

  const base = SERVICE_BASE_PRICES[selectedService] ?? 0;
  const suburbModifier =
    WELLINGTON_SUBURBS.find((s) => s.value === location)?.priceModifier ?? 0;
  const vehicleModifier =
    VEHICLE_TYPES.find((v) => v.value === vehicleType)?.priceModifier ?? 0;
  const doorModifier =
    DOOR_OPTIONS.find((d) => d.value === doors)?.priceModifier ?? 0;

  return `$${base + suburbModifier + vehicleModifier + doorModifier}`;
}, [selectedService, location, vehicleType, doors]);

useEffect(() => {
  setEstimate(estimate ?? null);
}, [estimate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      phone,
      location,
      vehicleType,
      doors,
      selectedService,
      selectedTime,
      estimate,
    });
  };

  const missingFields = [
    !selectedService ? 'Service' : null,
    !location ? 'Suburb' : null,
    !vehicleType ? 'Vehicle' : null,
  ].filter(Boolean) as string[];

  const missingFieldsText =
    missingFields.length === 0
      ? null
      : missingFields.length === 1
      ? missingFields[0]
      : missingFields.length === 2
      ? `${missingFields[0]} and ${missingFields[1]}`
      : `${missingFields[0]}, ${missingFields[1]}, and ${missingFields[2]}`;

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="theme-card rounded-2xl p-6 shadow-2xl md:p-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--text-muted)]">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[var(--text-muted)]">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium text-[var(--text-muted)]">
              Suburb
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className={fieldClassName}
            >
              <option value="">Select suburb</option>
              {WELLINGTON_SUBURBS.map((suburb) => (
                <option key={suburb.value} value={suburb.value}>
                  {suburb.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="vehicleType" className="mb-1 block text-sm font-medium text-[var(--text-muted)]">
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className={fieldClassName}
            >
              <option value="">Select vehicle type</option>
              {VEHICLE_TYPES.map((vehicle) => (
                <option key={vehicle.value} value={vehicle.value}>
                  {vehicle.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="doors" className="mb-1 block text-sm font-medium text-[var(--text-muted)]">
              Doors
            </label>
            <select
              id="doors"
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
              className={fieldClassName}
            >
              <option value="">Select door count</option>
              {DOOR_OPTIONS.map((door) => (
                <option key={door.value} value={door.value}>
                  {door.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="service" className="mb-1 block text-sm font-medium text-[var(--text-muted)]">
              Service
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
              className={fieldClassName}
            >
              <option value="">Select service</option>
              <option value="basic">Basic — from $40</option>
              <option value="standard">Standard — from $70</option>
              <option value="deluxe">Deluxe — from $100</option>
              <option value="premium">Premium+ — by request</option>
            </select>
          </div>

          <div>
            <label htmlFor="time" className="mb-1 block text-sm font-medium text-[var(--text-muted)]">
              Preferred Time
            </label>
            <input
              type="datetime-local"
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm text-[var(--text-muted)]">Estimated price</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--text)]">
            {estimate ?? `Select ${missingFieldsText} to see full estimate`}
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Final quote confirmed after booking review. Travel and vehicle size are included in this estimate.
          </p>
        </div>

        <p className="mt-4 text-sm text-[var(--text-muted)]">
          $20 deposit required. Non-refundable within 24 hours.
        </p>

        <button
          type="submit"
          className="theme-accent mt-4 w-full rounded-2xl py-3 font-semibold tracking-wide text-white transition hover:opacity-90"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;