'use client';

import ItalyMap, { RegionData } from '../ItalyMap';

interface StudyLocationChartProps {
  data?: RegionData[];
  fullHeight?: boolean;
}

// Default mock data for study locations by Italian region
const defaultStudyData: RegionData[] = [
  { code: 'LOM', name: 'Lombardia', value: 32 },
  { code: 'LAZ', name: 'Lazio', value: 18 },
  { code: 'EMR', name: 'Emilia-Romagna', value: 12 },
  { code: 'PIE', name: 'Piemonte', value: 9 },
  { code: 'VEN', name: 'Veneto', value: 8 },
  { code: 'TOS', name: 'Toscana', value: 7 },
  { code: 'CAM', name: 'Campania', value: 5 },
  { code: 'PUG', name: 'Puglia', value: 3 },
  { code: 'SIC', name: 'Sicilia', value: 2 },
  { code: 'LIG', name: 'Liguria', value: 2 },
  { code: 'FVG', name: 'Friuli-Venezia Giulia', value: 1 },
  { code: 'TAA', name: 'Trentino-Alto Adige', value: 1 },
];

export default function StudyLocationChart({ data, fullHeight = false }: StudyLocationChartProps) {
  const studyData = data && data.length > 0 ? data : defaultStudyData;

  return (
    <div className="bg-white flex flex-col h-full items-start overflow-visible">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none flex-shrink-0">
        <h3 className="font-medium text-[19px] text-white">
          Dove hanno studiato?
        </h3>
      </div>
      <div className="flex-1 flex flex-col items-center p-4 w-full min-h-0 overflow-visible">
        <ItalyMap data={studyData} fullHeight={fullHeight} />
      </div>
    </div>
  );
}
