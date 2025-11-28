import React, { useState, useCallback } from 'react';
import { Planet, TransitEvent } from './types';
import Timeline from './components/Timeline';
import ControlPanel from './components/ControlPanel';
import DetailsPanel from './components/DetailsPanel';

const App: React.FC = () => {
  // State
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [lat, setLat] = useState<number>(40.7128); // Default NY
  const [lon, setLon] = useState<number>(-74.0060);
  
  const [selectedPlanets, setSelectedPlanets] = useState<Planet[]>([
    Planet.SUN, 
    Planet.MOON, 
    Planet.JUPITER,
    Planet.SATURN
  ]);
  
  const [hoveredEvent, setHoveredEvent] = useState<TransitEvent | null>(null);

  // Handlers
  const togglePlanet = useCallback((planet: Planet) => {
    setSelectedPlanets(prev => 
      prev.includes(planet) 
        ? prev.filter(p => p !== planet) 
        : [...prev, planet]
    );
  }, []);

  return (
    <div className="w-screen h-screen bg-sidereal-bg text-white flex overflow-hidden font-mono selection:bg-sidereal-green selection:text-black">
      
      {/* 1. Left Sidebar: Mission Control */}
      <div className="w-80 flex-shrink-0 h-full z-20 shadow-xl shadow-black/50">
        <ControlPanel 
          year={year} setYear={setYear}
          lat={lat} setLat={setLat}
          lon={lon} setLon={setLon}
          selectedPlanets={selectedPlanets}
          togglePlanet={togglePlanet}
        />
      </div>

      {/* 2. Main Center: Visualization */}
      <div className="flex-1 h-full flex flex-col relative bg-[#050505]">
        
        {/* Top Status Bar */}
        <div className="h-10 border-b border-sidereal-border flex items-center justify-between px-6 bg-sidereal-panel/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-[10px] text-green-500 font-bold tracking-widest">SYSTEM ONLINE</span>
          </div>
          <div className="text-[10px] text-gray-500 tracking-widest">
            LAT: {lat.toFixed(2)} / LON: {lon.toFixed(2)}
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="flex-1 relative overflow-hidden">
            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10" 
                 style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                 }}>
            </div>
            
            {selectedPlanets.length > 0 ? (
                <Timeline 
                    year={year} 
                    selectedPlanets={selectedPlanets} 
                    onHoverEvent={setHoveredEvent}
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                    <p className="uppercase tracking-widest text-sm">[ No Telemetry Targets Selected ]</p>
                </div>
            )}
        </div>
      </div>

      {/* 3. Right Sidebar: Details */}
      <div className="w-96 flex-shrink-0 h-full z-20 shadow-xl shadow-black/50">
        <DetailsPanel hoveredEvent={hoveredEvent} />
      </div>

    </div>
  );
};

export default App;
