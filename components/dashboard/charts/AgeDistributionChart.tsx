'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface AgeDistributionChartProps {
  averageAge: number;
  distribution: Array<{ range: string; count: number; percentage: number }>;
}

export default function AgeDistributionChart({ averageAge, distribution }: AgeDistributionChartProps) {
  const maxCount = Math.max(...distribution.map(d => d.count));

  return (
    <div className="bg-white flex gap-4 h-full">
      {/* KPI Section - Left - Dark Blue Background */}
      <div className="bg-[#212746] flex flex-col gap-3 items-center justify-center px-8 py-6 min-w-[220px] border-r border-[#3A4066]">
        <div className="flex flex-col items-center gap-1">
          <span className="font-normal text-xl text-[#ADB3C7] uppercase tracking-wider">Età Media</span>
          {/* Simple solid color - Blue on dark */}
          <span className="font-medium text-[100px] leading-none text-[#FFFFFF]">
            {averageAge}
          </span>
          <span className="font-medium text-[28px] text-[#ADB3C7]">anni</span>
        </div>

        {/* Mini stats */}
        <div className="flex flex-col gap-1 items-center mt-2 pt-3 border-t border-[#3A4066] w-full">
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-xl text-white">
              {distribution.reduce((sum, d) => sum + d.count, 0)}
            </span>
            <span className="font-normal text-[17px] text-[#ADB3C7]">profili totali</span>
          </div>
        </div>
      </div>

      {/* Chart Section - Right */}
      <div className="flex-1 flex flex-col gap-3 py-6 pr-6">
        <h3 className="font-medium text-lg text-[#212746]">Distribuzione per Fasce d'Età</h3>

        <div className="flex-1 relative min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={distribution}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              {/* Subtle grid - NO HEAVY EFFECTS */}
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF8" opacity={0.4} vertical={false} />

              <XAxis
                dataKey="range"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#5A607F', fontSize: 13, fontWeight: 500 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8D96AC', fontSize: 12 }}
                tickFormatter={(value) => value.toString()}
                domain={[0, maxCount * 1.2]}
              />

              {/* Bars with opacity gradient from light to full */}
              <Bar
                dataKey="count"
                fill="#6D7BFC"
                radius={0}
                maxBarSize={60}
              >
                {distribution.map((entry, index) => {
                  // Opacity increases from 0.3 (first bar) to 1.0 (last bar)
                  const totalBars = distribution.length;
                  const opacity = 0.3 + (index / (totalBars - 1)) * 0.7;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      opacity={opacity}
                      style={{
                        transition: 'opacity 0.3s',
                      }}
                    />
                  );
                })}
                <LabelList
                  dataKey="percentage"
                  position="top"
                  offset={4}
                  formatter={(value) => `${value}%`}
                  style={{
                    fill: '#212746',
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
