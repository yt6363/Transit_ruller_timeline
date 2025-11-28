import React from 'react';
import { Planet } from '../types';
import { MapPin, Calendar, Clock, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  year: number;
  setYear: (y: number) => void;
  lat: number;
  setLat: (l: number) => void;
  lon: number;
  setLon: (l: number) => void;
  selectedPlanets: Planet[];
  togglePlanet: (p: Planet) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  year, setYear, lat, setLat, lon, setLon, selectedPlanets, togglePlanet
}) => {
  return (
    <div className="h-full flex flex-col p-4 border-r border-sidereal-border bg-sidereal-panel">
      
      {/* Header */}
      <div className="mb-8 border-b border-sidereal-border pb-2">
        <h2 className="text-xs font-bold text-sidereal-green tracking-widest mb-1 flex items-center gap-2">
          <span className="w-2 h-2 bg-sidereal-green rounded-full animate-pulse"></span>
          MISSION CONTROL
        </h2>
      </div>

      {/* Date Input */}
      <div className="mb-6 space-y-2">
        <label className="text-[10px] text-sidereal-dim uppercase tracking-wider">Target Cycle (Year)</label>
        <div className="flex items-center bg-black border border-sidereal-border p-2">
            <Calendar size={14} className="text-sidereal-green mr-2" />
            <input 
                type="number" 
                value={year} 
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="bg-transparent text-sm w-full outline-none font-mono text-white"
            />
        </div>
      </div>

      {/* Location Input */}
      <div className="mb-6 space-y-2">
        <label className="text-[10px] text-sidereal-dim uppercase tracking-wider">Geospatial Coords</label>
        <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center bg-black border border-sidereal-border p-2">
                <span className="text-[10px] text-sidereal-dim mr-2">LAT</span>
                <input 
                    type="number" 
                    value={lat} 
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                    className="bg-transparent text-xs w-full outline-none font-mono text-white"
                />
            </div>
            <div className="flex items-center bg-black border border-sidereal-border p-2">
                <span className="text-[10px] text-sidereal-dim mr-2">LON</span>
                <input 
                    type="number" 
                    value={lon} 
                    onChange={(e) => setLon(parseFloat(e.target.value))}
                    className="bg-transparent text-xs w-full outline-none font-mono text-white"
                />
            </div>
        </div>
      </div>

      {/* Planet Selection */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <label className="text-[10px] text-sidereal-dim uppercase tracking-wider block mb-3">Telemetry Targets</label>
        <div className="space-y-1">
            {Object.values(Planet).map(planet => {
                const isSelected = selectedPlanets.includes(planet);
                return (
                    <button 
                        key={planet}
                        onClick={() => togglePlanet(planet)}
                        className={`w-full text-left text-xs py-2 px-3 border transition-all duration-200 flex justify-between items-center group
                            ${isSelected 
                                ? 'border-sidereal-green bg-sidereal-green/10 text-white' 
                                : 'border-sidereal-border text-gray-500 hover:border-gray-500'
                            }
                        `}
                    >
                        <span className="uppercase tracking-widest">{planet}</span>
                        <div className={`w-1.5 h-1.5 rounded-sm ${isSelected ? 'bg-sidereal-green' : 'bg-gray-800 group-hover:bg-gray-600'}`}></div>
                    </button>
                )
            })}
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-6 pt-4 border-t border-sidereal-border">
         <button 
            className="w-full border border-sidereal-green text-sidereal-green py-3 text-xs font-bold hover:bg-sidereal-green hover:text-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
            onClick={() => window.location.reload()}
         >
            <RotateCcw size={12} />
            [ SYSTEM REBOOT ]
         </button>
      </div>

    </div>
  );
};

export default ControlPanel;
