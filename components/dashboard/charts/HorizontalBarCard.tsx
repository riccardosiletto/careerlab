'use client';

interface HorizontalBarCardProps {
  title: string;
  data: Array<{ name: string; count: number; percentage: number }>;
  icon?: string;
  baseColor?: string;
}

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 109, g: 123, b: 252 }; // Default to blue
};

// Generate color fades from darkest to lightest
const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];

  for (let i = 0; i < count; i++) {
    // Calculate opacity from 1.0 to 0.2 (darkest to lightest)
    const opacity = 1.0 - (i * 0.2);
    const bgOpacity = Math.max(0.15, opacity * 0.15); // Background is lighter

    styles.push({
      bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
      accent: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    });
  }

  return styles;
};

export default function HorizontalBarCard({
  title,
  data,
  icon,
  baseColor = '#6D7BFC' // Default blue
}: HorizontalBarCardProps) {
  const colorStyles = generateColorFades(baseColor, data.length);
  return (
    <div className="bg-white flex flex-col h-full items-center">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          {title}
        </h3>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
        {data.map((item, index) => {
          const style = colorStyles[index];
          const maxPercentage = Math.max(...data.map(d => d.percentage));

          return (
            <div
              key={item.name}
              className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#6D7BFC] transition-all w-full overflow-hidden"
            >
              {/* Background bar proportional to percentage */}
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  backgroundColor: style.bg,
                  width: `${(item.percentage / maxPercentage) * 100}%`,
                }}
              />

              {/* Content on top of background */}
              <div className="relative z-10 flex items-center gap-3 w-full">
                {/* Vertical accent bar */}
                <div
                  className="w-1 h-10 flex-shrink-0"
                  style={{ backgroundColor: style.accent }}
                />

                {/* Content */}
                <div className="flex-1 flex items-center justify-between">
                  {/* Item info */}
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-base text-[#212746]">
                      {item.name}
                    </p>
                    <p className="font-normal text-xs text-[#8D96AC]">
                      {item.percentage}% del totale
                    </p>
                  </div>

                  {/* Count badge */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xl text-[#212746]">
                      {item.count}
                    </span>
                    <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                      Profiles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
