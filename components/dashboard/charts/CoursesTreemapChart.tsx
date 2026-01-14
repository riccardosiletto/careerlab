'use client';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

interface CourseData {
  name: string;
  count: number;
  percentage: number;
}

interface CoursesTreemapChartProps {
  data: CourseData[];
}

// Color palette - CareerLab brand colors
const COLORS = [
  '#6D7BFC',   // Primary blue
  '#B6DC00',   // Lime green
  '#9D52FF',   // Purple
  '#FEC800',   // Yellow
  '#8D96AC',   // Grey
  '#212746',   // Dark blue
];

// Custom content renderer for treemap cells - bottom-left aligned like Manpower
const CustomizedContent = (props: any) => {
  const { x, y, width, height, index, name, percentage } = props;

  // Don't render if cell is too small
  if (!width || !height || width < 20 || height < 20) return null;

  const color = COLORS[index % COLORS.length];
  const isLargeEnough = width > 80 && height > 60;
  const isMedium = width > 50 && height > 40;
  const padding = 12;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke="#FFFFFF"
        strokeWidth={2}
      />
      {isLargeEnough && name && (
        <>
          {/* Percentage - Large at bottom-left */}
          <text
            x={x + padding}
            y={y + height - padding - 20}
            textAnchor="start"
            fill="#fff"
            fontSize={42}
            fontWeight={600}
            stroke="none"
          >
            {percentage !== undefined ? `${percentage}%` : ''}
          </text>
          {/* Name - Below the percentage */}
          <text
            x={x + padding}
            y={y + height - padding}
            textAnchor="start"
            fill="#fff"
            fontSize={14}
            fontWeight={400}
            stroke="none"
            opacity={0.9}
          >
            {name.length > 25 ? name.substring(0, 23) + '...' : name}
          </text>
        </>
      )}
      {!isLargeEnough && isMedium && name && (
        <>
          {/* Smaller cells: just percentage */}
          <text
            x={x + padding}
            y={y + height - padding}
            textAnchor="start"
            fill="#fff"
            fontSize={20}
            fontWeight={600}
            stroke="none"
          >
            {percentage !== undefined ? `${percentage}%` : ''}
          </text>
        </>
      )}
    </g>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-[#DCDFFF] px-4 py-3 rounded-lg shadow-lg">
        <p className="font-semibold text-sm text-[#212746]">{data.name}</p>
        <p className="text-xs text-[#5A607F] mt-1">
          <span className="font-bold text-[#212746]">{data.count}</span> profili ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function CoursesTreemapChart({ data }: CoursesTreemapChartProps) {
  // Transform data for treemap format
  const treemapData = [
    {
      name: 'Corsi',
      children: data.map((course, index) => ({
        name: course.name,
        size: course.count,
        count: course.count,
        percentage: course.percentage,
        index,
      })),
    },
  ];

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Quali corsi universitari hanno frequentato?
        </h3>
      </div>

      <div className="flex-1 p-4 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            content={<CustomizedContent />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
