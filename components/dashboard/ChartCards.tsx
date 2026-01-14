'use client';

import ItalyMap, { RegionData } from './ItalyMap';

interface ChartCardsProps {
  studyLocations: RegionData[];
  languages: Array<{
    name: string;
    percentage: number;
    count: number;
    color: string;
  }>;
}

// Language styles with semantic colors
const LANGUAGE_STYLES = [
  { bg: '#F3F4FF', accent: '#6D7BFC' },    // Inglese: blu
  { bg: '#F1FDD1', accent: '#B6DC00' },    // Francese: verde
  { bg: '#FFF7D9', accent: '#FEC800' },    // Spagnolo: giallo
  { bg: '#F3F4FF', accent: '#9D52FF' },    // Altro: viola
];

export default function ChartCards({ studyLocations, languages }: ChartCardsProps) {
  return (
    <div className="flex gap-6 items-center">
      {/* Study Locations Map */}
      <div className="flex-1">
        <div className="bg-white flex flex-col items-start">
          <div className="bg-white flex items-center justify-center px-5 pt-5 pb-2 w-full">
            <p className="flex-1 font-medium text-xl text-[#212746]">
              Dove hanno studiato?
            </p>
          </div>
          <div className="flex flex-col items-center pb-3 px-5 w-full">
            <ItalyMap data={studyLocations} height={240} />
          </div>
        </div>
      </div>

      {/* Languages Chart */}
      <div className="flex-1 self-stretch">
        <div className="bg-white flex flex-col gap-2 h-full items-center">
          <div className="bg-white flex items-center justify-center p-5 w-full">
            <p className="flex-1 font-medium text-xl text-[#212746]">
              Quali lingue parlano?
            </p>
          </div>
          <div className="flex flex-col gap-3 items-start pb-5 pt-2 px-5 w-full">
            {languages.map((lang, index) => {
              const style = LANGUAGE_STYLES[index] || LANGUAGE_STYLES[0];

              return (
                <div
                  key={lang.name}
                  className="flex items-center gap-4 p-4 border border-transparent hover:border-[#6D7BFC] transition-all w-full"
                  style={{ backgroundColor: style.bg }}
                >
                  {/* Vertical accent bar - clean implementation */}
                  <div
                    className="w-1 h-12 flex-shrink-0"
                    style={{ backgroundColor: style.accent }}
                  />

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between">
                    {/* Language info */}
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg text-[#212746]">
                        {lang.name}
                      </p>
                      <p className="font-normal text-sm text-[#8D96AC]">
                        {lang.percentage}% del totale
                      </p>
                    </div>

                    {/* Count badge */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-2xl text-[#212746]">
                        {lang.count}
                      </span>
                      <span className="font-normal text-xs text-[#8D96AC] uppercase">
                        Profiles
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
