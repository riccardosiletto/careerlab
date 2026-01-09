'use client';

interface ChartCardsProps {
  education: {
    scuolaSuperiore: { count: number; percentage: number };
    laureaTriennale: { count: number; percentage: number };
    laureaMagistrale: { count: number; percentage: number };
    master: { count: number; percentage: number };
    altro: { count: number; percentage: number };
  };
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

export default function ChartCards({ education, languages }: ChartCardsProps) {
  const educationData = [
    { label: 'Scuola\nSuperiore', ...education.scuolaSuperiore, color: '#8D96AC' },
    { label: 'Laurea\nTriennale', ...education.laureaTriennale, color: '#6D7BFC' }, // Fixed: was #9FA9FF
    { label: 'Laurea\nMagistrale', ...education.laureaMagistrale, color: '#B6DC00' },
    { label: 'Master', ...education.master, color: '#9D52FF' }, // Fixed: was #D9D9D9 (too light)
    { label: 'Altro', ...education.altro, color: '#FEC800' },
  ];

  const maxEducationValue = Math.max(...educationData.map(d => d.percentage));
  const maxBarHeight = 220; // Max height in pixels

  return (
    <div className="flex gap-6 items-center">
      {/* Education Level Chart */}
      <div className="flex-1 self-stretch">
        <div className="bg-white flex flex-col gap-2 h-full items-start">
          <div className="bg-white flex items-center justify-center p-5 w-full">
            <p className="flex-1 font-medium text-xl text-[#212746]">
              Che livello di formazione hanno?
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2 items-center justify-center pb-5 pt-2 px-5 w-full">
            {/* Chart Area */}
            <div className="flex gap-2 h-[247px] items-center w-full">
              {/* Y-axis labels */}
              <div className="flex flex-col h-full items-end justify-between w-[22px] font-normal text-xs text-[#8D96AC] text-right capitalize">
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>

              {/* Chart Grid & Bars */}
              <div className="flex-1 h-[234px] relative">
                {/* Grid lines - more subtle */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full h-px bg-[#E8EAF8]/40" />
                  ))}
                </div>

                {/* Bars container */}
                <div className="absolute inset-0 flex gap-5 items-end px-4">
                  {educationData.map((item, index) => {
                    const height = (item.percentage / maxEducationValue) * maxBarHeight;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        {/* Percentage label with background badge */}
                        <div className="bg-white/95 backdrop-blur-sm px-2 py-1 border border-[#E8EAF8]">
                          <span className="font-semibold text-sm text-[#212746]">
                            {item.percentage}%
                          </span>
                        </div>
                        {/* Bar */}
                        <div
                          className="w-full transition-all hover:opacity-80"
                          style={{
                            height: `${height}px`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex items-start justify-between pl-[50px] pr-[22px] w-full font-medium text-sm text-[#212746] text-center">
              {educationData.map((item, index) => (
                <div key={index} className="w-[70px] whitespace-pre-line">
                  {item.label}
                </div>
              ))}
            </div>
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
