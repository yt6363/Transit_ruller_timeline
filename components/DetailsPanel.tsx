import React from 'react';
import { TransitEvent } from '../types';
import { Info, Disc, BoxSelect } from 'lucide-react';

interface DetailsPanelProps {
  hoveredEvent: TransitEvent | null;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ hoveredEvent }) => {
  return (
    <div className="h-full flex flex-col p-6 border-l border-sidereal-border bg-sidereal-panel relative overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10 border-b border-sidereal-border pb-2 mb-8">
        <h2 className="text-xs font-bold text-gray-400 tracking-widest flex items-center gap-2">
          <Info size={12} />
          DETAILS
        </h2>
      </div>

      {hoveredEvent ? (
        <div className="relative z-10 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          
          {/* Planet Header */}
          <div>
            <div className="text-[10px] text-sidereal-green mb-1 uppercase tracking-widest">Selected Celestial Body</div>
            <div className="text-3xl font-mono text-white tracking-tighter">{hoveredEvent.planet}</div>
            <div className="text-xs text-gray-500 mt-1">Transit Analysis</div>
          </div>

          {/* Sign Info */}
          <div className="p-4 border border-white/10 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400 uppercase">Zodiac Sign</span>
                <span className="text-[10px] px-1.5 py-0.5 border border-white/20 text-white/80">{hoveredEvent.sign.code}</span>
            </div>
            <div className="text-xl text-white font-bold" style={{ color: hoveredEvent.sign.color }}>
                {hoveredEvent.sign.name}
            </div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{hoveredEvent.sign.element} Element</div>
          </div>

          {/* Nakshatra Info */}
          <div className="p-4 border border-white/10 bg-black/50 backdrop-blur-sm relative overflow-hidden">
             {/* Decorative bar */}
             <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: hoveredEvent.nakshatra.color }}></div>
             
             <div className="pl-2">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-gray-400 uppercase">Nakshatra</span>
                    <span className="text-[10px] text-gray-600">#{hoveredEvent.nakshatra.id}</span>
                </div>
                <div className="text-lg text-white font-bold mb-1">
                    {hoveredEvent.nakshatra.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <Disc size={10} />
                    <span>Ruled by {hoveredEvent.nakshatra.ruler}</span>
                </div>

                {/* Pada Visual */}
                <div className="border-t border-white/5 pt-3">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1">
                         <BoxSelect size={10} />
                         Quarter (Pada)
                      </span>
                      <span className="text-xs font-mono font-bold text-sidereal-green">{hoveredEvent.pada}/4</span>
                   </div>
                   <div className="flex gap-1">
                      {[1, 2, 3, 4].map((p) => (
                        <div 
                           key={p} 
                           className={`h-1.5 flex-1 rounded-sm transition-all duration-300 ${p === hoveredEvent.pada ? 'bg-sidereal-green shadow-[0_0_8px_rgba(0,255,157,0.5)]' : 'bg-gray-800'}`}
                        ></div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Date Range */}
          <div>
            <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Temporal Window</div>
            <div className="font-mono text-sm text-sidereal-green">
                {hoveredEvent.startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                <span className="mx-2 text-gray-600">to</span>
                {hoveredEvent.endDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
            </div>
            <div className="mt-2 text-[10px] text-gray-500 font-mono">
               EPOCH: {hoveredEvent.degrees.toFixed(2)}°
            </div>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 opacity-40">
           <div className="w-24 h-24 rounded-full border border-dashed border-gray-500 flex items-center justify-center mb-4 animate-spin-slow">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
           </div>
           <div className="text-xs text-gray-500 uppercase tracking-widest">No Selection</div>
           <div className="text-[10px] text-gray-700 mt-2 max-w-[200px]">Hover over the timeline to analyze planetary coordinates.</div>
        </div>
      )}
      
      <div className="mt-auto pt-4 border-t border-sidereal-border text-[9px] text-gray-700 font-mono text-right relative z-10">
        V.2.5.1-BETA // SIDEREAL.OS
      </div>
    </div>
  );
};

export default DetailsPanel;