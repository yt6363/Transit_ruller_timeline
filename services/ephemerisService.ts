import { Planet, TransitEvent, ZodiacSign, Nakshatra } from '../types';
import { ZODIAC_SIGNS, NAKSHATRAS, PLANET_SPEEDS } from '../constants';

// NOTE: This is a simulation for UI demonstration purposes. 
// A real app would use 'swisseph' or an API for precise ephemeris data.
// This generates plausible transit data based on average speeds.

export const generateAnnualTransits = (year: number, planets: Planet[]): Map<Planet, TransitEvent[]> => {
  const transitMap = new Map<Planet, TransitEvent[]>();
  
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const totalDays = 365;

  planets.forEach(planet => {
    const events: TransitEvent[] = [];
    const speed = PLANET_SPEEDS[planet];
    
    // Seed random start position (0-360) based on planet + year hash to be consistent
    let currentLongitude = (year * 13 + planet.length * 57) % 360; 
    
    let currentDate = new Date(startDate);
    
    // Initial State
    let currentEvent: TransitEvent = createEventAt(currentDate, currentLongitude, planet);
    
    for (let day = 0; day <= totalDays; day++) {
      // Advance Date (increment by smaller steps for fast planets could be better, but day is fine for simulation)
      const nextDate = new Date(startDate.getTime() + day * 24 * 60 * 60 * 1000);
      
      // Move Planet
      currentLongitude += speed;
      if (currentLongitude >= 360) currentLongitude -= 360;
      if (currentLongitude < 0) currentLongitude += 360;

      const newSign = getSign(currentLongitude);
      const newNak = getNakshatra(currentLongitude);
      const newPada = getPada(currentLongitude);

      // Check if critical boundary crossed (Sign, Nakshatra, OR Pada change)
      if (
        newSign.id !== currentEvent.sign.id || 
        newNak.id !== currentEvent.nakshatra.id ||
        newPada !== currentEvent.pada
      ) {
        // Close previous event
        currentEvent.endDate = new Date(nextDate);
        events.push(currentEvent);

        // Start new event
        currentEvent = createEventAt(nextDate, currentLongitude, planet);
      }
    }
    
    // Push final segment
    currentEvent.endDate = endDate;
    events.push(currentEvent);
    
    transitMap.set(planet, events);
  });

  return transitMap;
};

const createEventAt = (date: Date, longitude: number, planet: Planet): TransitEvent => {
  return {
    planet,
    startDate: new Date(date),
    endDate: new Date(date), // Will be updated
    degrees: longitude,
    sign: getSign(longitude),
    nakshatra: getNakshatra(longitude),
    pada: getPada(longitude)
  };
};

const getSign = (longitude: number): ZodiacSign => {
  const index = Math.floor(longitude / 30);
  return ZODIAC_SIGNS[index % 12];
};

const getNakshatra = (longitude: number): Nakshatra => {
  const nakshatraSpan = 360 / 27; // 13.333 degrees
  const index = Math.floor(longitude / nakshatraSpan);
  return NAKSHATRAS[index % 27];
};

const getPada = (longitude: number): 1 | 2 | 3 | 4 => {
  const nakshatraSpan = 360 / 27; // 13.333 degrees
  const padaSpan = nakshatraSpan / 4; // 3.333 degrees
  
  // Find position within the current nakshatra
  const nakshatraStart = Math.floor(longitude / nakshatraSpan) * nakshatraSpan;
  const degreesInNakshatra = longitude - nakshatraStart;
  
  const padaIndex = Math.floor(degreesInNakshatra / padaSpan);
  return (Math.min(Math.max(padaIndex, 0), 3) + 1) as 1 | 2 | 3 | 4;
};