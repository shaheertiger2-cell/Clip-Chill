declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const BOOKING_CONVERSION_ID = 'AW-16910668377/Cp3ECNXJsPEaENmk0f8-';

export const trackBookingConversion = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: BOOKING_CONVERSION_ID });
  }
};
