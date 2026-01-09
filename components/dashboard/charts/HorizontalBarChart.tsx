'use client';

interface HorizontalBarChartProps {
  title: string;
  data: Array<{ name: string; count: number; percentage: number }>;
  icon?: string;
  accentColor?: string;
}

// Color palette - cycle through these colors
const COLORS = ['#6D7BFC', '#B6DC00', '#9D52FF', '#FEC800', '#8D96AC'];

export default function HorizontalBarChart({
  title,
  data,
  icon,
  accentColor
}: HorizontalBarChartProps) {
  const maxPercentage = Math.max(...data.map(d => d.percentage));

  return (
    <div className="bg-white p-6">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={icon} alt={title} className="w-full h-full object-contain" />
          </div>
        )}
        <h3 className="font-semibold text-xl text-[#212746]">{title}</h3>
      </div>

      {/* Bars */}
      <div className="space-y-5">
        {data.map((item, index) => {
          // Use accentColor if provided, otherwise cycle through COLORS
          const barColor = accentColor || COLORS[index % COLORS.length];

          return (
            <div
              key={index}
              style={{
                animation: `barSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s both`,
              }}
            >
              {/* Name and percentage */}
              <div className="flex items-baseline justify-between mb-2">
                <p className="font-medium text-base text-[#212746]">{item.name}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-lg text-[#212746]">{item.percentage}%</span>
                  <span className="font-normal text-sm text-[#8D96AC]">({item.count})</span>
                </div>
              </div>

              {/* Bar background + fill */}
              <div className="relative h-3 bg-[#F3F4FF] overflow-hidden">
                {/* Animated fill - solid color, no gradient */}
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                  style={{
                    width: `${(item.percentage / maxPercentage) * 100}%`,
                    backgroundColor: barColor,
                    animation: `barExpand 1s ease-out ${index * 0.1 + 0.3}s both`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes barSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes barExpand {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
