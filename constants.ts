import { Planet, ZodiacSign, Nakshatra } from './types';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 1, name: 'Aries', code: 'ARI', element: 'Fire', color: '#ef4444' },
  { id: 2, name: 'Taurus', code: 'TAU', element: 'Earth', color: '#10b981' },
  { id: 3, name: 'Gemini', code: 'GEM', element: 'Air', color: '#fbbf24' },
  { id: 4, name: 'Cancer', code: 'CAN', element: 'Water', color: '#3b82f6' },
  { id: 5, name: 'Leo', code: 'LEO', element: 'Fire', color: '#dc2626' },
  { id: 6, name: 'Virgo', code: 'VIR', element: 'Earth', color: '#059669' },
  { id: 7, name: 'Libra', code: 'LIB', element: 'Air', color: '#d97706' },
  { id: 8, name: 'Scorpio', code: 'SCO', element: 'Water', color: '#1d4ed8' },
  { id: 9, name: 'Sagittarius', code: 'SAG', element: 'Fire', color: '#b91c1c' },
  { id: 10, name: 'Capricorn', code: 'CAP', element: 'Earth', color: '#047857' },
  { id: 11, name: 'Aquarius', code: 'AQU', element: 'Air', color: '#b45309' },
  { id: 12, name: 'Pisces', code: 'PIS', element: 'Water', color: '#1e3a8a' },
];

// Simplified Nakshatra list (27) with colors roughly based on ruler
export const NAKSHATRAS: Nakshatra[] = [
  { id: 1, name: 'Ashwini', ruler: Planet.KETU, color: '#a8a29e' },
  { id: 2, name: 'Bharani', ruler: Planet.VENUS, color: '#f472b6' },
  { id: 3, name: 'Krittika', ruler: Planet.SUN, color: '#fb923c' },
  { id: 4, name: 'Rohini', ruler: Planet.MOON, color: '#e2e8f0' },
  { id: 5, name: 'Mrigashirsha', ruler: Planet.MARS, color: '#ef4444' },
  { id: 6, name: 'Ardra', ruler: Planet.RAHU, color: '#71717a' },
  { id: 7, name: 'Punarvasu', ruler: Planet.JUPITER, color: '#fbbf24' },
  { id: 8, name: 'Pushya', ruler: Planet.SATURN, color: '#3b82f6' },
  { id: 9, name: 'Ashlesha', ruler: Planet.MERCURY, color: '#22c55e' },
  { id: 10, name: 'Magha', ruler: Planet.KETU, color: '#a8a29e' },
  { id: 11, name: 'Purva Phalguni', ruler: Planet.VENUS, color: '#f472b6' },
  { id: 12, name: 'Uttara Phalguni', ruler: Planet.SUN, color: '#fb923c' },
  { id: 13, name: 'Hasta', ruler: Planet.MOON, color: '#e2e8f0' },
  { id: 14, name: 'Chitra', ruler: Planet.MARS, color: '#ef4444' },
  { id: 15, name: 'Swati', ruler: Planet.RAHU, color: '#71717a' },
  { id: 16, name: 'Vishakha', ruler: Planet.JUPITER, color: '#fbbf24' },
  { id: 17, name: 'Anuradha', ruler: Planet.SATURN, color: '#3b82f6' },
  { id: 18, name: 'Jyeshtha', ruler: Planet.MERCURY, color: '#22c55e' },
  { id: 19, name: 'Mula', ruler: Planet.KETU, color: '#a8a29e' },
  { id: 20, name: 'Purva Ashadha', ruler: Planet.VENUS, color: '#f472b6' },
  { id: 21, name: 'Uttara Ashadha', ruler: Planet.SUN, color: '#fb923c' },
  { id: 22, name: 'Shravana', ruler: Planet.MOON, color: '#e2e8f0' },
  { id: 23, name: 'Dhanishta', ruler: Planet.MARS, color: '#ef4444' },
  { id: 24, name: 'Shatabhisha', ruler: Planet.RAHU, color: '#71717a' },
  { id: 25, name: 'Purva Bhadrapada', ruler: Planet.JUPITER, color: '#fbbf24' },
  { id: 26, name: 'Uttara Bhadrapada', ruler: Planet.SATURN, color: '#3b82f6' },
  { id: 27, name: 'Revati', ruler: Planet.MERCURY, color: '#22c55e' },
];

export const PLANET_SPEEDS = {
  [Planet.SUN]: 1, // deg per day
  [Planet.MOON]: 13.2,
  [Planet.MARS]: 0.5,
  [Planet.MERCURY]: 1.5, // varying
  [Planet.JUPITER]: 0.083,
  [Planet.VENUS]: 1.6, // varying
  [Planet.SATURN]: 0.033,
  [Planet.RAHU]: -0.05,
  [Planet.KETU]: -0.05,
};
