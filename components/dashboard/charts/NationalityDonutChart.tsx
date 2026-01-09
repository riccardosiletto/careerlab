'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface NationalityDonutChartProps {
  data: Array<{ country: string; count: number; percentage: number }>;
}

// SOLID COLORS - NO GRADIENTS
const COLORS = ['#6D7BFC', '#B6DC00', '#9D52FF', '#FEC800', '#8D96AC'];

export default function NationalityDonutChart({ data }: NationalityDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
      <h3 className="font-medium text-lg text-[#212746]">Nationality Distribution</h3>

      <div className="flex items-center gap-6">
        {/* Donut Chart - CLEAN, NO GRADIENTS */}
        <div className="relative w-[160px] h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="count"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={activeIndex === index ? 3 : 2}
                    style={{
                      filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-normal text-xs text-[#8D96AC] uppercase tracking-wider">Total</span>
            <span className="font-semibold text-2xl text-[#212746]">{total}</span>
          </div>
        </div>

        {/* Legend - COMPACT */}
        <div className="flex-1 flex flex-col gap-2">
          {data.map((entry, index) => (
            <div
              key={entry.country}
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="flex-1 flex items-baseline justify-between">
                <span className="font-medium text-sm text-[#212746]">{entry.country}</span>
                <span className="font-semibold text-base text-[#212746]">{entry.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
