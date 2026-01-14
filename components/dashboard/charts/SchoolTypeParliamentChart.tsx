'use client';

import { useMemo } from 'react';

interface SchoolTypeData {
  type: string;
  count: number;
  percentage: number;
}

interface SchoolTypeParliamentChartProps {
  data: SchoolTypeData[];
}

const COLORS = ['#6D7BFC', '#B6DC00', '#FEC800', '#8D96AC'];

// Generate points arranged in a semicircle parliament style
function generateParliamentPoints(
  data: SchoolTypeData[],
  centerX: number,
  centerY: number,
  maxRadius: number,
  rows: number = 5
): Array<{ x: number; y: number; color: string; type: string }> {
  const points: Array<{ x: number; y: number; color: string; type: string }> = [];

  // Calculate total dots to show (scaled for visualization)
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const targetDots = 80; // Target number of dots to display
  const scaleFactor = total / targetDots;

  // Calculate scaled counts for each category
  const scaledData = data.map((item, idx) => ({
    ...item,
    color: COLORS[idx % COLORS.length],
    scaledCount: Math.max(1, Math.round(item.count / scaleFactor))
  }));

  const totalDots = scaledData.reduce((sum, item) => sum + item.scaledCount, 0);

  // Calculate dots per row (more dots in outer rows)
  const rowSpacing = 18; // Space between rows
  const dotRadius = 6;
  const dotsPerRow: number[] = [];

  for (let row = 0; row < rows; row++) {
    const rowRadius = maxRadius - (row * rowSpacing);
    // Arc length for 200 degrees (-100 to +100)
    const arcLength = (200 / 180) * Math.PI * rowRadius;
    const maxDotsInRow = Math.floor(arcLength / (dotRadius * 2.5));
    dotsPerRow.push(maxDotsInRow);
  }

  // Distribute total dots across rows proportionally
  const totalCapacity = dotsPerRow.reduce((a, b) => a + b, 0);
  const actualDotsPerRow = dotsPerRow.map(capacity =>
    Math.round((capacity / totalCapacity) * totalDots)
  );

  // Adjust to match total
  let diff = totalDots - actualDotsPerRow.reduce((a, b) => a + b, 0);
  for (let i = 0; diff !== 0 && i < rows; i++) {
    if (diff > 0) {
      actualDotsPerRow[i]++;
      diff--;
    } else {
      actualDotsPerRow[i]--;
      diff++;
    }
  }

  // Generate all positions first
  const allPositions: Array<{ x: number; y: number; row: number; posInRow: number }> = [];

  for (let row = 0; row < rows; row++) {
    const rowRadius = maxRadius - (row * rowSpacing);
    const dotsInThisRow = actualDotsPerRow[row];

    for (let i = 0; i < dotsInThisRow; i++) {
      // Angle from -100 to 100 degrees
      const startAngle = -100 * (Math.PI / 180);
      const endAngle = 100 * (Math.PI / 180);
      const angleRange = endAngle - startAngle;
      const angle = startAngle + (angleRange * (i + 0.5)) / dotsInThisRow;

      // Convert to cartesian (rotate -90 degrees so 0 is at top)
      const x = centerX + rowRadius * Math.cos(angle - Math.PI / 2);
      const y = centerY + rowRadius * Math.sin(angle - Math.PI / 2);

      allPositions.push({ x, y, row, posInRow: i });
    }
  }

  // Sort positions from left to right (by angle/x position)
  allPositions.sort((a, b) => a.x - b.x);

  // Assign colors based on data proportions (left to right)
  let posIndex = 0;
  for (const item of scaledData) {
    for (let i = 0; i < item.scaledCount && posIndex < allPositions.length; i++) {
      const pos = allPositions[posIndex];
      points.push({
        x: pos.x,
        y: pos.y,
        color: item.color,
        type: item.type
      });
      posIndex++;
    }
  }

  return points;
}

export default function SchoolTypeParliamentChart({ data }: SchoolTypeParliamentChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const points = useMemo(() => {
    return generateParliamentPoints(data, 200, 150, 130, 5);
  }, [data]);

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          In che tipo di scuole hanno studiato?
        </h3>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-12 pb-4">
        {/* Parliament Chart - centered */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: '400px', height: '190px' }}>
            <svg width="400" height="190" viewBox="0 0 400 190">
              {/* Dots */}
              {points.map((point, idx) => (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r={6}
                  fill={point.color}
                >
                  <title>{point.type}</title>
                </circle>
              ))}

              {/* Center graduation cap icon */}
              <defs>
                <filter id="circleShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#212746" floodOpacity="0.08" />
                </filter>
              </defs>
              <g transform="translate(200, 150)">
                {/* White circle background with shadow */}
                <circle cx="0" cy="0" r="40" fill="white" filter="url(#circleShadow)" />
                {/* Graduation cap icon - centered to circle */}
                <g transform="translate(-28, -32) scale(1.4)">
                  <path
                    d="M20 12L4 19L20 26L36 19L20 12Z"
                    fill="#212746"
                  />
                  <path
                    d="M10 22V30C10 30 14 34 20 34C26 34 30 30 30 30V22"
                    stroke="#212746"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M34 19V28"
                    stroke="#212746"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="34" cy="30" r="2" fill="#212746" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Legend - horizontal below chart */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-20">
          {data.map((entry, index) => (
            <div
              key={entry.type}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="font-medium text-sm text-[#212746]">{entry.type}</span>
              <span className="font-semibold text-sm text-[#212746]">{entry.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
