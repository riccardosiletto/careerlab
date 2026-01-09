'use client';

interface SalaryRangeChartProps {
  salaryRange: {
    min: number;
    median: number;
    p75: number;
    max: number;
  };
  currency?: string;
}

export default function SalaryRangeChart({ salaryRange, currency = '€' }: SalaryRangeChartProps) {
  const { min, median, p75, max } = salaryRange;

  const formatSalary = (value: number) => {
    return `${currency}${value.toLocaleString()}`;
  };

  // Percentile data with calculated positions and ranges
  const percentiles = [
    {
      label: '',
      value: min,
      endValue: median - ((median - min) / 2),
      color: '#8D96AC',
      bgColor: '#F3F4FF',
      height: 60,
      description: 'Entry Level'
    },
    {
      label: '',
      value: median - ((median - min) / 2),
      endValue: median,
      color: '#6D7BFC',
      bgColor: '#E8ECFF',
      height: 100,
      description: 'Junior'
    },
    {
      label: '',
      value: median,
      endValue: p75,
      color: '#B6DC00',
      bgColor: '#F1FDD1',
      height: 140,
      description: 'Mid-Level'
    },
    {
      label: '',
      value: p75,
      endValue: max,
      color: '#9D52FF',
      bgColor: '#F3E8FF',
      height: 100,
      description: 'Senior'
    },
  ];

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Quanto guadagnano?
        </h3>
      </div>
      <div className="p-6">
        {/* Percentile Visualization - Vertical bars */}
        <div className="flex items-end justify-between gap-4 mb-8" style={{ height: '200px' }}>
          {percentiles.map((percentile, index) => (
            <div
              key={`percentile-${index}`}
              className="flex-1 flex flex-col items-center gap-3"
            >
              {/* Value label above bar */}
              <div className="flex flex-col items-center gap-1 min-h-[60px] justify-end">
                <span
                  className="font-semibold text-lg"
                  style={{ color: percentile.color }}
                >
                  {formatSalary(percentile.endValue)}
                </span>
                <span className="font-normal text-xs text-[#8D96AC]">
                  {percentile.label}
                </span>
              </div>

              {/* Percentile Bar */}
              <div
                className="w-full transition-all hover:opacity-80 relative"
                style={{
                  height: `${percentile.height}px`,
                  backgroundColor: percentile.bgColor,
                  border: `2px solid ${percentile.color}`,
                }}
              >
                {/* Description label inside bar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-medium text-sm"
                    style={{ color: percentile.color }}
                  >
                    {percentile.description}
                  </span>
                </div>
              </div>

              {/* Percentile range label */}
              <span className="font-medium text-xs text-[#5A607F] mt-1">
                {percentile.label.replace('th', '%')}
              </span>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
