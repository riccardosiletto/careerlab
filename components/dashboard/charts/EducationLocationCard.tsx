'use client';

interface EducationLocationCardProps {
  data: Array<{ location: string; count: number; percentage: number }>;
}

// Color styles for locations
const LOCATION_STYLES = [
  { bg: '#F3F4FF', accent: '#6D7BFC' },    // First location: blue
  { bg: '#F1FDD1', accent: '#B6DC00' },    // Second: green
  { bg: '#FFF7D9', accent: '#FEC800' },    // Third: yellow
  { bg: '#F3F4FF', accent: '#9D52FF' },    // Fourth: purple
  { bg: '#F5F6FA', accent: '#8D96AC' },    // Fifth: gray
];

export default function EducationLocationCard({ data }: EducationLocationCardProps) {
  // Limit to max 4 rows
  const displayData = data.slice(0, 4);

  return (
    <div className="bg-white flex flex-col gap-2 h-full items-center">
      <div className="bg-white flex items-center justify-center p-5 w-full">
        <p className="flex-1 font-medium text-xl text-[#212746]">
          Education Location Distribution
        </p>
      </div>
      <div className="flex flex-col gap-2 items-start pb-5 pt-2 px-5 w-full">
        {displayData.map((location, index) => {
          const style = LOCATION_STYLES[index] || LOCATION_STYLES[0];

          return (
            <div
              key={location.location}
              className="flex items-center gap-3 p-3 border border-transparent hover:border-[#6D7BFC] transition-all w-full"
              style={{ backgroundColor: style.bg }}
            >
              {/* Vertical accent bar */}
              <div
                className="w-1 h-10 flex-shrink-0"
                style={{ backgroundColor: style.accent }}
              />

              {/* Content */}
              <div className="flex-1 flex items-center justify-between">
                {/* Location info */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-base text-[#212746]">
                    {location.location}
                  </p>
                </div>

                {/* Count badge */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xl text-[#212746]">
                    {location.count}
                  </span>
                  <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                    Profiles
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
