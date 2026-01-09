'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface EducationLocationChartProps {
  data: Array<{ location: string; count: number; percentage: number }>;
}

// Color palette for locations
const LOCATION_COLORS = [
  '#6D7BFC', // Primary blue
  '#B6DC00', // Lime green
  '#9D52FF', // Purple
  '#FEC800', // Yellow
  '#8D96AC', // Gray
];

export default function EducationLocationChart({ data }: EducationLocationChartProps) {
  return (
    <div className="bg-white flex flex-col gap-4 p-6 h-full">
      <h3 className="font-medium text-lg text-[#212746]">Education Location Distribution</h3>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 60, left: 0, bottom: 5 }}
          >
            {/* Subtle grid */}
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF8" opacity={0.4} horizontal={false} />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8D96AC', fontSize: 12 }}
              hide
            />

            <YAxis
              type="category"
              dataKey="location"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5A607F', fontSize: 13, fontWeight: 500 }}
              width={100}
            />

            {/* Solid color bars - NO GRADIENTS */}
            <Bar
              dataKey="count"
              radius={[0, 8, 8, 0]}
              maxBarSize={35}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={LOCATION_COLORS[index % LOCATION_COLORS.length]}
                  opacity={0.9}
                />
              ))}

              {/* Percentage labels on bars */}
              <LabelList
                dataKey="percentage"
                position="right"
                formatter={(value: number) => `${value}%`}
                style={{
                  fill: '#212746',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
