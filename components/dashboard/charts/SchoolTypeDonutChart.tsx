'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface SchoolTypeDonutChartProps {
  data: Array<{ type: string; count: number; percentage: number }>;
}

const COLORS = ['#6D7BFC', '#B6DC00', '#FEC800', '#8D96AC'];

export default function SchoolTypeDonutChart({ data }: SchoolTypeDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);


  return (
    <div className="bg-white flex flex-col h-full">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          In che tipo di scuole hanno studiato?
        </h3>
      </div>

      <div className="flex-1 flex items-center gap-8 p-6">
        {/* Donut */}
        <div className="relative w-[260px] h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="percentage"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <span className="font-semibold text-5xl text-[#212746]">{total}</span>
            <span className="font-normal text-sm text-[#8D96AC] uppercase tracking-wide">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 flex flex-col gap-5 justify-center">
          {data.map((entry, index) => (
            <div
              key={entry.type}
              className="flex items-center gap-3"
            >
              <div
                className="w-5 h-5"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <div className="flex-1 flex items-baseline justify-between">
                <span className="font-medium text-base text-[#212746]">{entry.type}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-xl text-[#212746]">{entry.percentage}%</span>
                  <span className="font-normal text-sm text-[#8D96AC]">({entry.count})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
