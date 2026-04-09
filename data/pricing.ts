export const WELLINGTON_SUBURBS = [
  { value: 'te_aro', label: 'Te Aro', priceModifier: 0 },
  { value: 'wellington_central', label: 'Wellington Central', priceModifier: 0 },
  { value: 'thorndon', label: 'Thorndon', priceModifier: 5 },
  { value: 'mount_cook', label: 'Mount Cook', priceModifier: 5 },
  { value: 'mount_victoria', label: 'Mount Victoria', priceModifier: 5 },
  { value: 'newtown', label: 'Newtown', priceModifier: 5 },
  { value: 'berhampore', label: 'Berhampore', priceModifier: 10 },
  { value: 'hataitai', label: 'Hataitai', priceModifier: 10 },
  { value: 'kilbirnie', label: 'Kilbirnie', priceModifier: 10 },
  { value: 'lyall_bay', label: 'Lyall Bay', priceModifier: 15 },
  { value: 'miramar', label: 'Miramar', priceModifier: 15 },
  { value: 'karori', label: 'Karori', priceModifier: 15 },
  { value: 'ngaio', label: 'Ngaio', priceModifier: 15 },
  { value: 'wadestown', label: 'Wadestown', priceModifier: 15 },
  { value: 'brooklyn', label: 'Brooklyn', priceModifier: 15 },
  { value: 'johnsonville', label: 'Johnsonville', priceModifier: 20 },
  { value: 'newlands', label: 'Newlands', priceModifier: 20 },
  { value: 'khandallah', label: 'Khandallah', priceModifier: 20 },
  { value: 'tawa', label: 'Tawa', priceModifier: 25 },
];

export const VEHICLE_TYPES = [
  { value: 'compact', label: 'Compact', priceModifier: 0 },
  { value: 'hatchback', label: 'Hatchback', priceModifier: 5 },
  { value: 'sedan', label: 'Sedan', priceModifier: 10 },
  { value: 'coupe', label: 'Coupe', priceModifier: 5 },
  { value: 'sports', label: 'Sports Car', priceModifier: 10 },
  { value: 'wagon', label: 'Wagon', priceModifier: 15 },
  { value: 'suv', label: 'SUV', priceModifier: 20 },
  { value: 'ute', label: 'Ute', priceModifier: 20 },
  { value: 'van', label: 'Van / People Mover', priceModifier: 30 },
  { value: 'luxury', label: 'Luxury / Executive', priceModifier: 25 },
];

export const DOOR_OPTIONS = [
  { value: '2', label: '2 doors', priceModifier: 0 },
  { value: '3', label: '3 doors', priceModifier: 0 },
  { value: '4', label: '4 doors', priceModifier: 5 },
  { value: '5', label: '5 doors', priceModifier: 5 },
];

export const SERVICE_BASE_PRICES: Record<string, number> = {
  basic: 40,
  standard: 70,
  deluxe: 100,
  premium: 180,
};