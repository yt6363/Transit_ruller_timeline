export enum Planet {
  SUN = 'Sun',
  MOON = 'Moon',
  MARS = 'Mars',
  MERCURY = 'Mercury',
  JUPITER = 'Jupiter',
  VENUS = 'Venus',
  SATURN = 'Saturn',
  RAHU = 'Rahu',
  KETU = 'Ketu'
}

export interface ZodiacSign {
  id: number;
  name: string;
  code: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  color: string;
}

export interface Nakshatra {
  id: number;
  name: string;
  ruler: Planet;
  color: string;
}

export interface TransitEvent {
  planet: Planet;
  startDate: Date;
  endDate: Date;
  sign: ZodiacSign;
  nakshatra: Nakshatra;
  pada: 1 | 2 | 3 | 4; // Added Pada (Quarter)
  degrees: number; // 0-360 longitude at start
}

export interface AppState {
  year: number;
  latitude: number;
  longitude: number;
  selectedPlanets: Planet[];
  hoveredEvent: TransitEvent | null;
}