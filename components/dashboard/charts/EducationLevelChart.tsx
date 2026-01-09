'use client';

interface EducationLevelChartProps {
  data: {
    scuolaSuperiore: { count: number; percentage: number };
    laureaTriennale: { count: number; percentage: number };
    laureaMagistrale: { count: number; percentage: number };
    master: { count: number; percentage: number };
    altro: { count: number; percentage: number };
  };
}

export default function EducationLevelChart({ data }: EducationLevelChartProps) {
  // Default data if not provided
  const defaultData = {
    scuolaSuperiore: { count: 0, percentage: 0 },
    laureaTriennale: { count: 0, percentage: 0 },
    laureaMagistrale: { count: 0, percentage: 0 },
    master: { count: 0, percentage: 0 },
    altro: { count: 0, percentage: 0 },
  };

  const educationDataSource = data || defaultData;

  const educationData = [
    { label: 'Scuola\nSuperiore', ...educationDataSource.scuolaSuperiore, color: '#8D96AC' },
    { label: 'Laurea\nTriennale', ...educationDataSource.laureaTriennale, color: '#6D7BFC' },
    { label: 'Laurea\nMagistrale', ...educationDataSource.laureaMagistrale, color: '#B6DC00' },
    { label: 'Master', ...educationDataSource.master, color: '#9D52FF' },
    { label: 'Altro', ...educationDataSource.altro, color: '#FEC800' },
  ];

  const maxEducationValue = Math.max(...educationData.map(d => d.percentage), 1);
  const maxBarHeight = 220; // Max height in pixels

  return (
    <div className="bg-white flex flex-col h-full items-start">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Che livello di formazione hanno?
        </h3>
      </div>
      <div className="flex-1 flex flex-col gap-2 items-center justify-center pb-5 pt-4 px-5 w-full">
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
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    {/* Percentage label - no background */}
                    <span className="font-medium text-xl text-[#212746]">
                      {item.percentage}%
                    </span>
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
  );
}
