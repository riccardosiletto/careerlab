'use client';

interface CareerStep {
  role: string;
  seniority: 'intern' | 'junior' | 'mid' | 'senior' | 'lead' | 'director';
  yearsToReach: number; // years from previous step
  salaryRange: { min: number; max: number };
  isCurrentStep?: boolean;
}

interface CareerJourneyChartProps {
  companyName: string;
  companyLogo?: string; // URL del logo dell'azienda
  roleName: string;
  careerPath: CareerStep[];
  currency?: string;
  averagePromotionTime?: number; // years - tempo medio per promozione
}

// Colori per seniority level
const seniorityConfig: Record<string, { color: string; bgColor: string }> = {
  intern: { color: '#8D96AC', bgColor: '#F6F8FF' },
  junior: { color: '#6D7BFC', bgColor: '#F3F4FF' },
  mid: { color: '#B6DC00', bgColor: '#F1FDD1' },
  senior: { color: '#9D52FF', bgColor: '#F3E8FF' },
  lead: { color: '#FF6B6B', bgColor: '#FFE8E8' },
  director: { color: '#212746', bgColor: '#E8E9ED' },
};

export default function CareerJourneyChart({
  companyName,
  companyLogo,
  roleName,
  careerPath,
  currency = '€',
  averagePromotionTime,
}: CareerJourneyChartProps) {

  const formatSalary = (value: number) => {
    if (value >= 1000) {
      return `${currency}${(value / 1000).toFixed(0)}K`;
    }
    return `${currency}${value.toLocaleString('it-IT')}`;
  };

  const formatYears = (years: number) => {
    if (years === 0) return '';
    if (years < 1) return `${Math.round(years * 12)} mesi`;
    if (years === 1) return '1 anno';
    return `${years.toFixed(1).replace('.0', '').replace('.', ',')} anni`;
  };

  const totalYears = careerPath.reduce((acc, step) => acc + step.yearsToReach, 0);

  // Get first and last seniority labels for the journey description
  const firstSeniority = careerPath[0]?.seniority || 'intern';
  const lastSeniority = careerPath[careerPath.length - 1]?.seniority || 'senior';

  const seniorityLabels: Record<string, string> = {
    intern: 'Intern',
    junior: 'Junior',
    mid: 'Mid',
    senior: 'Senior',
    lead: 'Lead',
    director: 'Director',
  };

  // Format promotion time (e.g., 2.5 -> "2,5")
  const formatPromotionTime = (years: number) => {
    return years.toFixed(1).replace('.', ',').replace(',0', '');
  };

  return (
    <div className="bg-white flex h-full">
      {/* KPI Section - Left - Dark Blue Background */}
      <div className="bg-[#212746] flex flex-col gap-3 items-center justify-center px-8 py-6 min-w-[220px] border-r border-[#3A4066]">
        {/* Title section */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-medium text-[24px] leading-tight text-[#FFFFFF] text-center">
            Quanto e come si cresce?
          </span>
        </div>

        {/* Average promotion time */}
        {averagePromotionTime && (
          <div className="flex flex-col gap-1 items-center mt-2 pt-3   w-full">
            <span className="font-medium text-[56px] leading-none text-white">
              {formatPromotionTime(averagePromotionTime)} anni
            </span>
            <span className="font-normal text-[15px] text-[#ADB3C7] text-center">tempo medio per promozione</span>
          </div>
        )}

        {/* Total years */}
        <div className="flex flex-col gap-1 items-center mt-2 pt-3 border-t border-[#3A4066] w-full">
          <span className="font-medium text-[56px] leading-none text-white">
            ~{Math.ceil(totalYears)} anni
          </span>
          <span className="font-normal text-[15px] text-[#ADB3C7] text-center">
            anni totali da {seniorityLabels[firstSeniority]} a {seniorityLabels[lastSeniority]}
          </span>
        </div>
      </div>

      {/* Content Section - Right */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="font-medium text-lg text-[#212746] mb-4">Percorso di Carriera</h3>

        {/* Timeline Container - struttura a griglia per allineamento preciso */}
        <div className="flex-1 relative px-4">

          {/* Grid container per allineamento perfetto */}
          <div
            className="grid gap-0"
            style={{
              gridTemplateColumns: `repeat(${careerPath.length}, 1fr)`,
            }}
          >
            {/* ROW 1: Time indicators - posizionati tra i dot */}
            {careerPath.map((step, index) => {
              const isFirst = index === 0;

              return (
                <div key={`time-${index}`} className="relative h-10 flex items-center justify-center">
                  {/* Time badge - posizionato a sinistra del centro (quindi tra questo e il precedente) */}
                  {!isFirst && step.yearsToReach > 0 && (
                    <div className="absolute left-0 -translate-x-1/2 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#6D7BFC]">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-[12px] font-semibold text-[#5A607F] whitespace-nowrap">
                        {formatYears(step.yearsToReach)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ROW 2: Timeline con nodi - centrati nelle celle */}
            {careerPath.map((step, index) => {
              const config = seniorityConfig[step.seniority];
              const isFirst = index === 0;
              const isLast = index === careerPath.length - 1;

              return (
                <div key={`node-${index}`} className="relative h-8 flex items-center justify-center">
                  {/* Timeline line segment */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-[3px]"
                    style={{
                      left: isFirst ? '50%' : 0,
                      right: isLast ? '50%' : 0,
                      background: `linear-gradient(to right, ${seniorityConfig[careerPath[Math.max(0, index - 1)]?.seniority || step.seniority].color}, ${config.color})`,
                    }}
                  />

                  {/* Start flag for first item */}
                  {isFirst && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                      <div className="bg-[#212746] rounded-lg p-1.5 shadow-md">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M4 21V4h16v10l-8-2-8 2V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Node - centrato */}
                  <div
                    className="w-5 h-5 rounded-full border-[3px] bg-white z-10 shadow-md transition-transform hover:scale-110"
                    style={{ borderColor: config.color }}
                  />
                </div>
              );
            })}

            {/* ROW 3: Connector lines */}
            {careerPath.map((step, index) => {
              const config = seniorityConfig[step.seniority];

              return (
                <div key={`connector-${index}`} className="flex justify-center">
                  <div
                    className="w-[2px] h-4"
                    style={{ backgroundColor: config.color, opacity: 0.4 }}
                  />
                </div>
              );
            })}

            {/* ROW 4: Role cards */}
            {careerPath.map((step, index) => {
              const config = seniorityConfig[step.seniority];

              return (
                <div key={`role-${index}`} className="flex justify-center px-1">
                  <div
                    className="rounded-xl px-4 py-3 w-full max-w-[130px] transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-default"
                    style={{
                      backgroundColor: config.bgColor,
                      border: `2px solid ${config.color}`,
                    }}
                  >
                    <div
                      className="text-[13px] font-semibold text-center leading-tight"
                      style={{ color: config.color }}
                    >
                      {step.role}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ROW 5: Salary cards */}
            {careerPath.map((step, index) => {
              const config = seniorityConfig[step.seniority];

              return (
                <div key={`salary-${index}`} className="flex justify-center px-1 mt-2">
                  <div
                    className="bg-white rounded-lg py-2 px-3 w-full max-w-[130px] text-center border border-gray-100"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className="text-[13px] font-bold"
                        style={{ color: config.color }}
                      >
                        {formatSalary(step.salaryRange.min)}
                      </span>
                      <span className="text-[11px] text-[#8D96AC]">-</span>
                      <span
                        className="text-[13px] font-bold"
                        style={{ color: config.color }}
                      >
                        {formatSalary(step.salaryRange.max)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ROW 6: Extra indicators (SEI QUI) */}
            {careerPath.map((step, index) => (
              <div key={`extra-${index}`} className="flex justify-center mt-2">
                {step.isCurrentStep && (
                  <div className="bg-[#6D7BFC] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
                    SEI QUI
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
