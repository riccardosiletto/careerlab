'use client';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

interface GenderTrendChartProps {
  data: Array<{ year: number; male: number; female: number; other: number }>;
}

export default function GenderTrendChart({ data }: GenderTrendChartProps) {
  // Calculate percentages
  const dataWithPercentages = data.map(item => {
    const total = item.male + item.female + item.other;
    return {
      year: item.year,
      malePercent: Math.round((item.male / total) * 100),
      femalePercent: Math.round((item.female / total) * 100),
      otherPercent: Math.round((item.other / total) * 100),
      male: item.male,
      female: item.female,
      other: item.other,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-[#DCDFFF] px-4 py-3">
          <p className="font-semibold text-sm text-[#212746] mb-2">{label}</p>
          {payload.reverse().map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium text-xs text-[#5A607F] capitalize">
                {entry.name.replace('Percent', '')}:
              </span>
              <span className="font-semibold text-sm text-[#212746]">
                {entry.value}%
              </span>
              <span className="font-normal text-xs text-[#8D96AC]">
                ({entry.payload[entry.name.replace('Percent', '')]})
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Come cambia il gender balance nel tempo?
        </h3>
      </div>

      <div className="relative flex-1 min-h-[200px] p-4" style={{ animation: 'chartFadeIn 0.8s ease-out both' }}>
        {/* Legend inside chart */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6D7BFC]" />
            <span className="font-medium text-xs text-[#5A607F]">Uomini</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#B6DC00]" />
            <span className="font-medium text-xs text-[#5A607F]">Donne</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8D96AC]" />
            <span className="font-medium text-xs text-[#5A607F]">Altro</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dataWithPercentages}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E8EAF8"
              vertical={false}
            />

            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5A607F', fontSize: 13, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8D96AC', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#DCDFFF', strokeWidth: 2 }} />

            {/* Male area */}
            <Area
              type="monotone"
              dataKey="malePercent"
              stroke="#6D7BFC"
              strokeWidth={3}
              fill="#6D7BFC"
              fillOpacity={0.15}
              dot={{
                fill: '#6D7BFC',
                strokeWidth: 3,
                stroke: '#FFFFFF',
                r: 5,
              }}
              activeDot={{
                r: 7,
                strokeWidth: 4,
                stroke: '#FFFFFF',
                fill: '#6D7BFC',
                style: {
                  filter: 'drop-shadow(0 2px 4px rgba(109, 123, 252, 0.3))',
                },
              }}
              style={{
                animation: 'lineDrawIn 1.5s ease-out 0.2s both',
              }}
            />

            {/* Female area */}
            <Area
              type="monotone"
              dataKey="femalePercent"
              stroke="#B6DC00"
              strokeWidth={3}
              fill="#B6DC00"
              fillOpacity={0.15}
              dot={{
                fill: '#B6DC00',
                strokeWidth: 3,
                stroke: '#FFFFFF',
                r: 5,
              }}
              activeDot={{
                r: 7,
                strokeWidth: 4,
                stroke: '#FFFFFF',
                fill: '#B6DC00',
                style: {
                  filter: 'drop-shadow(0 2px 4px rgba(182, 220, 0, 0.3))',
                },
              }}
              style={{
                animation: 'lineDrawIn 1.5s ease-out 0.4s both',
              }}
            />

            {/* Other area */}
            <Area
              type="monotone"
              dataKey="otherPercent"
              stroke="#8D96AC"
              strokeWidth={2}
              fill="#8D96AC"
              fillOpacity={0.15}
              dot={{
                fill: '#8D96AC',
                strokeWidth: 2,
                stroke: '#FFFFFF',
                r: 4,
              }}
              activeDot={{
                r: 6,
                strokeWidth: 3,
                stroke: '#FFFFFF',
                fill: '#8D96AC',
              }}
              style={{
                animation: 'lineDrawIn 1.5s ease-out 0.6s both',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>



      <style jsx>{`
        @keyframes chartFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineDrawIn {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }

        @keyframes statFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
