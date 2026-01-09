'use client';

interface MBATypesChartProps {
  data: Array<{ type: string; count: number; percentage: number }>;
}

// Color palette for bars
const COLORS = ['#6D7BFC', '#B6DC00', '#9D52FF', '#FEC800', '#8D96AC'];

export default function MBATypesChart({ data }: MBATypesChartProps) {
  // Check for empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white flex flex-col h-full">
        <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
          <h3 className="font-medium text-[19px] text-white">
            Che tipo di MBA hanno conseguito?
          </h3>
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-sm text-[#8D96AC]">Nessun dato MBA disponibile</p>
        </div>
      </div>
    );
  }

  // Transform data with colors
  const chartData = data.map((item, index) => ({
    type: item.type,
    count: item.count,
    percentage: item.percentage,
    color: COLORS[index % COLORS.length],
  }));

  const maxPercentage = Math.max(...chartData.map(d => d.percentage), 1);
  const maxBarHeight = 220; // Max height in pixels

  return (
    <div className="bg-white flex flex-col h-full items-start">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Che tipo di MBA hanno conseguito?
        </h3>
      </div>
      <div className="flex-1 flex flex-col gap-2 items-center justify-center pb-5 pt-4 px-5 w-full">
        {/* Chart Area */}
        <div className="flex gap-2 h-[247px] items-center w-full">
          {/* Y-axis labels */}
          <div className="flex flex-col h-full items-end justify-between w-[30px] font-normal text-xs text-[#8D96AC] text-right capitalize">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
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
              {chartData.map((item, index) => {
                const height = (item.percentage / maxPercentage) * maxBarHeight;
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
          {chartData.map((item, index) => (
            <div key={index} className="flex-1 whitespace-pre-line px-1">
              {item.type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
