'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Cell } from 'recharts';

interface PromotionTimelineChartProps {
  data: Array<{ years: string; count: number; percentage: number }>;
}

// Color palette for bars
const COLORS = ['#6D7BFC', '#B6DC00', '#9D52FF', '#FEC800', '#8D96AC'];

export default function PromotionTimelineChart({ data }: PromotionTimelineChartProps) {
  // Check for empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white flex gap-4 h-full">
        <div className="bg-[#212746] flex flex-col gap-3 items-center justify-center px-8 py-6 min-w-[220px] border-r border-[#3A4066]">
          <span className="font-normal text-lg text-[#ADB3C7] text-center">Quanto tempo per la prima promozione?</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-6 pr-6">
          <p className="text-sm text-[#8D96AC]">Nessun dato disponibile</p>
        </div>
      </div>
    );
  }

  // Transform data for recharts
  const chartData = data.map((item, index) => ({
    years: item.years,
    count: item.count,
    percentage: item.percentage,
    fill: COLORS[index % COLORS.length],
  }));

  // Find the most common promotion timeline
  const mostCommon = data.reduce((prev, current) =>
    (current.count > prev.count) ? current : prev
  );

  // Calculate total profiles
  const totalProfiles = data.reduce((sum, d) => sum + d.count, 0);
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white flex gap-4 h-full">
      {/* KPI Section - Left - Dark Blue Background */}
      <div className="bg-[#212746] flex flex-col gap-3 items-center justify-center px-8 py-6 min-w-[220px] border-r border-[#3A4066]">
        <div className="flex flex-col items-center gap-1">
          <span className="font-normal text-lg text-[#ADB3C7] text-center leading-tight">Quanto tempo per la prima promozione?</span>
          {/* Main KPI */}
          <span className="font-medium text-[80px] leading-none text-[#FFFFFF]">
            {mostCommon.years.replace(' anni', '').replace(' anno', '')}
          </span>
          <span className="font-medium text-[28px] text-[#ADB3C7]">anni</span>
        </div>

        {/* Mini stats */}
        <div className="flex flex-col gap-1 items-center mt-2 pt-3 border-t border-[#3A4066] w-full">
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-xl text-white">
              {totalProfiles}
            </span>
            <span className="font-normal text-[17px] text-[#ADB3C7]">profili totali</span>
          </div>
        </div>
      </div>

      {/* Chart Section - Right */}
      <div className="flex-1 flex flex-col gap-3 py-6 pr-6">
        <h3 className="font-medium text-lg text-[#212746]">Distribuzione Tempo alla Prima Promozione</h3>

        <div className="flex-1 relative min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF8" opacity={0.4} vertical={false} />
              <XAxis
                dataKey="years"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: '#5A607F', fontSize: 13, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8D96AC', fontSize: 12 }}
                tickFormatter={(value) => value.toString()}
                domain={[0, maxCount * 1.2]}
              />
              <Bar dataKey="count" radius={0} maxBarSize={60}>
                <LabelList
                  dataKey="percentage"
                  position="top"
                  offset={4}
                  formatter={(value: number) => `${value}%`}
                  style={{
                    fill: '#212746',
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                />
                {chartData.map((entry, index) => {
                  const totalBars = chartData.length;
                  const opacity = 0.3 + (index / (totalBars - 1)) * 0.7;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill="#6D7BFC"
                      opacity={opacity}
                      style={{
                        transition: 'opacity 0.3s',
                      }}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
