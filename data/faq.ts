const FAQ_PROMPTS = [
  { id: 'price', label: 'How much does it cost?' },
  { id: 'time', label: 'How long does it take?' },
  { id: 'location', label: 'Where do you service?' },
  { id: 'booking', label: 'How do I book?' },
  { id: 'payment', label: 'How does payment work?' },
  { id: 'availability', label: 'When are you available?' },
  { id: 'difference', label: 'What are the differences between packages?' },
  { id: 'extras', label: 'Do you offer extras or custom work?' },
  { id: 'weather', label: 'What happens if it rains?' },
  { id: 'access', label: 'Do I need to be home?' },
];

export type FaqAnswer = string | ((estimate?: string | null) => string);
export const FAQ_ANSWERS: Record<string, FaqAnswer> = {
  price: (estimate?: string | null) =>
    estimate
      ? `Based on your current selections, your estimated price is ${estimate}.`
      : `Pricing depends on your vehicle size and location. Fill in the booking form to get an exact estimate.`,

  time: () =>
    `Most services take between 45 minutes and 2.5 hours depending on the package and vehicle size.`,

  location: () =>
    `We service Wellington CBD and surrounding suburbs. We currently don’t service beyond Ngauranga Gorge.`,

  booking: () =>
    `You can book directly through the form on this page.`,

  payment: () =>
    `$20 deposit is required to secure your booking. The remaining balance is paid after the service is completed.`,

  availability: () =>
    `Availability depends on demand, but we aim to offer flexible time slots including weekends.`,

  difference: () =>
    `Basic is a quick clean, Standard is our most popular full refresh, Deluxe includes deep interior cleaning with steam, and Premium+ is a full high-end detail.`,

  extras: () =>
    `Yes. We offer custom detailing and premium work on request.`,

  weather: () =>
    `If conditions aren’t suitable, we’ll reschedule at no cost.`,

  access: () =>
    `As long as we have access to the vehicle, you don’t need to be present during the service.`,
};
export { FAQ_PROMPTS };