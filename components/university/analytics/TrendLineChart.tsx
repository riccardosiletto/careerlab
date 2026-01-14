'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface TrendDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface TrendLineChartProps {
  data: TrendDataPoint[];
  height?: number;
  color?: string;
  showArea?: boolean;
  showTooltip?: boolean;
  title?: string;
  formatValue?: (value: number) => string;
  formatDate?: (date: string) => string;
}

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
  formatValue,
  color,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: TrendDataPoint }>;
  label?: string;
  formatValue?: (value: number) => string;
  color?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const displayValue = formatValue ? formatValue(data.value) : data.value.toLocaleString('it-IT');
    const displayLabel = data.payload.label || label;

    return (
      <div className="bg-white/95 backdrop-blur-sm border border-[#DCDFFF] px-4 py-3 shadow-lg rounded-sm">
        <p className="font-semibold text-sm text-[#212746] mb-1">{displayLabel}</p>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color || '#6D7BFC' }}
          />
          <span className="font-bold text-lg text-[#212746]">{displayValue}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TrendLineChart({
  data,
  height = 200,
  color = '#6D7BFC',
  showArea = true,
  showTooltip = true,
  title,
  formatValue,
  formatDate,
}: TrendLineChartProps) {
  // Format date for X axis display
  const defaultFormatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
    } catch {
      return dateStr;
    }
  };

  const dateFormatter = formatDate || defaultFormatDate;

  // Prepare data with formatted dates
  const chartData = data.map((point) => ({
    ...point,
    formattedDate: dateFormatter(point.date),
  }));

  const ChartComponent = showArea ? AreaChart : LineChart;

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Header */}
      {title && (
        <div className="bg-[#212746] flex items-center px-5 py-4 w-full">
          <h3 className="font-medium text-[19px] text-white">{title}</h3>
        </div>
      )}

      <div
        className="relative flex-1 p-4"
        style={{
          minHeight: height,
          animation: 'chartFadeIn 0.8s ease-out both',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent
            data={chartData}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E8EAF8"
              vertical={false}
            />

            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5A607F', fontSize: 12, fontWeight: 500 }}
              dy={10}
              interval="preserveStartEnd"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8D96AC', fontSize: 12 }}
              tickFormatter={(value) =>
                formatValue ? formatValue(value) : value.toLocaleString('it-IT')
              }
              width={60}
            />

            {showTooltip && (
              <Tooltip
                content={<CustomTooltip formatValue={formatValue} color={color} />}
                cursor={{ stroke: '#DCDFFF', strokeWidth: 2 }}
              />
            )}

            {showArea ? (
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                fill={color}
                fillOpacity={0.15}
                dot={{
                  fill: color,
                  strokeWidth: 3,
                  stroke: '#FFFFFF',
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                  strokeWidth: 4,
                  stroke: '#FFFFFF',
                  fill: color,
                  style: {
                    filter: `drop-shadow(0 2px 4px ${color}4D)`,
                  },
                }}
                style={{
                  animation: 'lineDrawIn 1.5s ease-out 0.2s both',
                }}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={{
                  fill: color,
                  strokeWidth: 3,
                  stroke: '#FFFFFF',
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                  strokeWidth: 4,
                  stroke: '#FFFFFF',
                  fill: color,
                  style: {
                    filter: `drop-shadow(0 2px 4px ${color}4D)`,
                  },
                }}
                style={{
                  animation: 'lineDrawIn 1.5s ease-out 0.2s both',
                }}
              />
            )}
          </ChartComponent>
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
      `}</style>
    </div>
  );
}
