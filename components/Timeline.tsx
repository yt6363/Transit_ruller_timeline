import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { Planet, TransitEvent } from '../types';
import { generateAnnualTransits } from '../services/ephemerisService';

interface TimelineProps {
  year: number;
  selectedPlanets: Planet[];
  onHoverEvent: (event: TransitEvent | null) => void;
}

const Timeline: React.FC<TimelineProps> = ({ year, selectedPlanets, onHoverEvent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate data only when inputs change
  const transitData = useMemo(() => {
    return generateAnnualTransits(year, selectedPlanets);
  }, [year, selectedPlanets]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Dimensions
    const containerWidth = containerRef.current.clientWidth;
    const margin = { top: 40, right: 20, bottom: 30, left: 100 };
    const width = Math.max(containerWidth, 1200) - margin.left - margin.right; // Min width to scroll
    
    // Calculate height based on number of planets
    const laneHeight = 60;
    const height = (selectedPlanets.length * laneHeight) + margin.top + margin.bottom;

    // Set SVG Size
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height)
      .style("background-color", "#050505");

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale (Time)
    const xScale = d3.scaleTime()
      .domain([new Date(year, 0, 1), new Date(year, 11, 31)])
      .range([0, width]);

    // Y Scale (Planets)
    const yScale = d3.scaleBand()
      .domain(selectedPlanets)
      .range([0, selectedPlanets.length * laneHeight])
      .padding(0.2);

    // --- Drawing the "Ruler" (X Axis) ---
    const xAxis = d3.axisTop(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%B") as any)
      .tickSize(-height + margin.top) // Grid lines down
      .tickPadding(10);

    const axisGroup = g.append("g")
      .attr("class", "x-axis")
      .call(xAxis);

    // Style the axis to match Sidereal.os
    axisGroup.selectAll("text")
      .attr("fill", "#888")
      .style("font-family", "JetBrains Mono")
      .style("text-transform", "uppercase")
      .style("font-size", "10px");
    
    axisGroup.selectAll("line")
      .attr("stroke", "#1f2937") // gray-800
      .attr("stroke-dasharray", "2,2");

    axisGroup.selectAll(".domain").remove(); // Remove main axis line

    // --- Drawing Data ---
    
    selectedPlanets.forEach((planet) => {
      const events = transitData.get(planet) || [];
      const yPos = yScale(planet) || 0;
      const bandHeight = yScale.bandwidth();

      // Lane Background (Guides)
      g.append("rect")
        .attr("x", 0)
        .attr("y", yPos)
        .attr("width", width)
        .attr("height", bandHeight)
        .attr("fill", "#0a0a0a")
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 0.5);

      // Planet Label
      svg.append("text")
        .attr("x", margin.left - 15)
        .attr("y", margin.top + yPos + bandHeight / 2)
        .attr("dy", "0.32em")
        .attr("text-anchor", "end")
        .attr("fill", "#00ff9d")
        .style("font-family", "JetBrains Mono")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("text-transform", "uppercase")
        .text(planet);

      // Render Segments
      events.forEach((event, index) => {
        const xStart = xScale(event.startDate);
        const xEnd = xScale(event.endDate);
        const w = Math.max(1, xEnd - xStart); // Ensure minimal visibility

        // Check if this is the start of a new Nakshatra sequence for labelling purposes
        const prevEvent = events[index - 1];
        const isNakshatraStart = !prevEvent || prevEvent.nakshatra.id !== event.nakshatra.id;

        // Group for interaction
        const segmentGroup = g.append("g")
          .style("cursor", "crosshair")
          .on("mouseenter", () => {
             // Highlight all segments of same Nakshatra? Optional, keeping it simple for now.
             onHoverEvent(event);
          })
          .on("mouseleave", () => {
             onHoverEvent(null);
          });

        // 1. Sign Bar (Top half of lane)
        segmentGroup.append("rect")
          .attr("x", xStart)
          .attr("y", yPos)
          .attr("width", w)
          .attr("height", bandHeight * 0.4) // Top 40%
          .attr("fill", event.sign.color)
          .attr("opacity", 0.7)
          .attr("stroke", "#050505") // Separator
          .attr("stroke-width", 0.5);

        // 2. Nakshatra Bar (Bottom half of lane)
        segmentGroup.append("rect")
          .attr("x", xStart)
          .attr("y", yPos + bandHeight * 0.4)
          .attr("width", w)
          .attr("height", bandHeight * 0.6) // Bottom 60%
          .attr("fill", event.nakshatra.color)
          .attr("opacity", 0.9)
          .attr("stroke", "#050505") // Distinct separator for Padas
          .attr("stroke-width", 1);
          
        // Text Labels
        // Only show Sign code if it's wide enough
        if (w > 25) {
           segmentGroup.append("text")
            .attr("x", xStart + 2)
            .attr("y", yPos + bandHeight * 0.3)
            .attr("fill", "white")
            .style("font-family", "JetBrains Mono")
            .style("font-size", "9px")
            .style("font-weight", "bold")
            .style("pointer-events", "none")
            .text(event.sign.code);
        }

        // Only show Nakshatra name if it's the START of the nakshatra and we have room,
        // OR if it's a huge segment (like slow planets)
        if (isNakshatraStart && w > 10) {
           segmentGroup.append("text")
            .attr("x", xStart + 4)
            .attr("y", yPos + bandHeight * 0.8)
            .attr("fill", "black")
            .style("font-family", "JetBrains Mono")
            .style("font-size", "9px")
            .style("font-weight", "500")
            .style("pointer-events", "none")
            .text(event.nakshatra.name.substring(0, 4));
        }
      });
    });

    // Current Date Marker
    const now = new Date();
    if (now.getFullYear() === year) {
        const xNow = xScale(now);
        g.append("line")
            .attr("x1", xNow)
            .attr("x2", xNow)
            .attr("y1", -20)
            .attr("y2", height)
            .attr("stroke", "#00ff9d")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "4,2");
            
        g.append("text")
            .attr("x", xNow)
            .attr("y", -25)
            .attr("text-anchor", "middle")
            .attr("fill", "#00ff9d")
            .style("font-family", "JetBrains Mono")
            .style("font-size", "10px")
            .text("NOW");
    }

  }, [transitData, selectedPlanets, year, onHoverEvent]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-x-auto overflow-y-hidden custom-scrollbar bg-[#050505]">
        <svg ref={svgRef}></svg>
    </div>
  );
};

export default Timeline;