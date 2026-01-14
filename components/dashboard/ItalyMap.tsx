'use client';

import { useState, useEffect, useCallback } from 'react';

interface RegionData {
  code: string;
  name: string;
  value: number;
}

interface ItalyMapProps {
  data: RegionData[];
  colorScale?: {
    low: string;
    mid: string;
    high: string;
  };
  className?: string;
  height?: number;
  fullHeight?: boolean;
}

// Color palette matching SkillSherpa/CareerLab branding
const defaultColorScale = {
  low: '#E8EAF8',   // Light gray
  mid: '#6D7BFC',   // Primary blue
  high: '#212746',  // Dark blue
};

// Map region codes to SVG IDs from the italy.svg file
const regionIdMap: { [key: string]: string } = {
  'PIE': 'IT-21',       // Piemonte
  'VDA': 'IT-23',       // Valle d'Aosta
  'LOM': 'IT-25',       // Lombardia
  'TAA': 'IT-32',       // Trentino-Alto Adige
  'VEN': 'IT-34',       // Veneto
  'FVG': 'IT-36',       // Friuli-Venezia Giulia
  'LIG': 'IT-42',       // Liguria
  'EMR': 'IT-45',       // Emilia-Romagna
  'TOS': 'IT-52',       // Toscana
  'UMB': 'IT-55',       // Umbria
  'MAR': 'IT-57',       // Marche
  'LAZ': 'IT-62',       // Lazio
  'ABR': 'IT_65',       // Abruzzo
  'MOL': 'IT-67',       // Molise
  'CAM': 'IT-72',       // Campania
  'PUG': 'IT-75',       // Puglia
  'BAS': 'IT-77',       // Basilicata
  'CAL': 'IT-78',       // Calabria
  'SIC': 'IT-82',       // Sicilia
  'SAR': 'IT-88',       // Sardegna
};

// Region names for display
const regionNames: { [key: string]: string } = {
  'PIE': 'Piemonte',
  'VDA': "Valle d'Aosta",
  'LOM': 'Lombardia',
  'TAA': 'Trentino-Alto Adige',
  'VEN': 'Veneto',
  'FVG': 'Friuli-Venezia Giulia',
  'LIG': 'Liguria',
  'EMR': 'Emilia-Romagna',
  'TOS': 'Toscana',
  'UMB': 'Umbria',
  'MAR': 'Marche',
  'LAZ': 'Lazio',
  'ABR': 'Abruzzo',
  'MOL': 'Molise',
  'CAM': 'Campania',
  'PUG': 'Puglia',
  'BAS': 'Basilicata',
  'CAL': 'Calabria',
  'SIC': 'Sicilia',
  'SAR': 'Sardegna',
};

export default function ItalyMap({
  data,
  colorScale = defaultColorScale,
  className = '',
  height = 280,
  fullHeight = false
}: ItalyMapProps) {
  const [processedSvg, setProcessedSvg] = useState<string>('');

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const minValue = Math.min(...data.map(d => d.value), 0);

  // Simple color blending function
  const blendColors = useCallback((color1: string, color2: string, ratio: number): string => {
    const hex = (c: string) => parseInt(c, 16);
    const r1 = hex(color1.slice(1, 3));
    const g1 = hex(color1.slice(3, 5));
    const b1 = hex(color1.slice(5, 7));
    const r2 = hex(color2.slice(1, 3));
    const g2 = hex(color2.slice(3, 5));
    const b2 = hex(color2.slice(5, 7));

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }, []);

  // Interpolate between colors based on value
  const getColor = useCallback((value: number): string => {
    const normalized = (value - minValue) / (maxValue - minValue || 1);

    if (normalized < 0.25) {
      return colorScale.low;
    } else if (normalized < 0.5) {
      return blendColors(colorScale.low, colorScale.mid, (normalized - 0.25) * 4);
    } else if (normalized < 0.75) {
      return blendColors(colorScale.mid, colorScale.high, (normalized - 0.5) * 4);
    } else {
      return colorScale.high;
    }
  }, [colorScale, minValue, maxValue, blendColors]);

  useEffect(() => {
    // Load and process the SVG file
    fetch('/images/italy.svg')
      .then(res => res.text())
      .then(svg => {
        // Create a DOM parser to manipulate the SVG
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');

        // Apply colors to each region by modifying the SVG before rendering
        Object.entries(regionIdMap).forEach(([code, svgId]) => {
          const path = doc.getElementById(svgId);
          if (path) {
            const region = data.find(d => d.code === code);
            const color = region ? getColor(region.value) : '#f5f6fd';

            path.setAttribute('fill', color);
            path.setAttribute('stroke', '#ffffff');
            path.setAttribute('stroke-width', '1');
            // Remove any existing style attribute that might override our fill
            path.removeAttribute('style');
          }
        });

        // Also set a default fill for any paths without our IDs
        const allPaths = doc.querySelectorAll('path');
        allPaths.forEach(path => {
          if (!path.id || !Object.values(regionIdMap).includes(path.id)) {
            // This is a path we don't control, set it to a neutral color
            if (!path.getAttribute('fill') || path.getAttribute('fill') === '#000000' || path.getAttribute('fill') === 'black') {
              path.setAttribute('fill', '#f5f6fd');
            }
          }
        });

        // Serialize back to string
        const serializer = new XMLSerializer();
        const processedSvgString = serializer.serializeToString(doc.documentElement);
        setProcessedSvg(processedSvgString);
      })
      .catch(err => console.error('Error loading Italy map:', err));
  }, [data, getColor]);

  // Get top regions for display (5 for fullHeight, 3 otherwise)
  const topRegionsCount = fullHeight ? 5 : 3;
  const topRegions = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, topRegionsCount);

  if (!processedSvg) {
    return (
      <div className={`relative ${className} ${fullHeight ? 'h-full' : ''}`}>
        <div
          className="flex items-center justify-center text-[#8D96AC]"
          style={fullHeight ? { height: '100%' } : { height }}
        >
          Loading map...
        </div>
      </div>
    );
  }

  // For fullHeight mode, map fills the space with overlapping top regions
  if (fullHeight) {
    return (
      <div className={`relative h-full ${className}`}>
        {/* Top Regions List - Overlapping in top right */}
        <div className="absolute top-0 right-0 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-10 py-8 shadow-sm ">
          <span className="text-[10px] font-semibold text-[#8D96AC] uppercase tracking-wider block mb-2">
            Top Regioni
          </span>
          <div className="flex flex-col gap-1.5">
            {topRegions.map((region) => (
              <div key={region.code} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: getColor(region.value) }}
                />
                <span className="text-sm text-[#212746] font-medium">
                  {regionNames[region.code] || region.name}
                </span>
                <span className="text-sm text-[#6D7BFC] font-semibold ml-auto">
                  {region.value}%
                </span>
              </div>
            ))}
          </div>
          {/* Color Legend - compact */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#E8EAF8]">
            <div className="flex items-center gap-1">
              <div
                className="w-2.5 h-2 rounded-sm"
                style={{ backgroundColor: colorScale.low }}
              />
              <span className="text-[10px] text-[#8D96AC]">Bassa</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-2.5 h-2 rounded-sm"
                style={{ backgroundColor: colorScale.mid }}
              />
              <span className="text-[10px] text-[#8D96AC]">Media</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-2.5 h-2 rounded-sm"
                style={{ backgroundColor: colorScale.high }}
              />
              <span className="text-[10px] text-[#8D96AC]">Alta</span>
            </div>
          </div>
        </div>

        {/* Map Container - compact height based on scaled SVG */}
        <div className="flex items-start justify-center overflow-visible" style={{ height: '515px' }}>
          <div
            className="origin-top"
            style={{
              transform: 'scale(0.75) translateX(-75px) translateY(20px)',
              filter: 'drop-shadow(0 2px 8px rgba(0,20,70,0.06))'
            }}
            dangerouslySetInnerHTML={{ __html: processedSvg }}
          />
        </div>
      </div>
    );
  }

  // Standard fixed-height mode
  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Map Container */}
      <div className="flex items-start gap-4 h-full">
        {/* Map */}
        <div
          className="relative flex justify-center overflow-hidden"
          style={{
            height,
            width: '55%',
            filter: 'drop-shadow(0 2px 8px rgba(0,20,70,0.06))'
          }}
        >
          <div
            className="origin-top"
            style={{ transform: 'scale(0.35)' }}
            dangerouslySetInnerHTML={{ __html: processedSvg }}
          />
        </div>

        {/* Top Regions List */}
        <div className="flex flex-col gap-2 pt-4" style={{ width: '45%' }}>
          <span className="text-xs font-semibold text-[#8D96AC] uppercase tracking-wider mb-1">
            Top Regioni
          </span>
          {topRegions.map((region) => (
            <div key={region.code} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: getColor(region.value) }}
              />
              <span className="text-sm text-[#212746] font-medium truncate">
                {regionNames[region.code] || region.name}
              </span>
              <span className="text-sm text-[#8D96AC] ml-auto">
                {region.value}%
              </span>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#E8EAF8]">
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-2 rounded-sm"
                style={{ backgroundColor: colorScale.low }}
              />
              <span className="text-[10px] text-[#8D96AC]">Bassa</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-2 rounded-sm"
                style={{ backgroundColor: colorScale.mid }}
              />
              <span className="text-[10px] text-[#8D96AC]">Media</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-2 rounded-sm"
                style={{ backgroundColor: colorScale.high }}
              />
              <span className="text-[10px] text-[#8D96AC]">Alta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { regionNames, regionIdMap };
export type { RegionData };
