'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockCareerFlow = {
  timeToFirstJob: 2.3, // mesi
  timeToFirstPromotion: 18, // mesi
  averageJobsIn5Years: 1.8,
  stayRate: 62, // % che resta nella stessa azienda dopo 3 anni
  careerPaths: [
    {
      id: 1,
      name: 'Consulting Track',
      percentage: 28,
      steps: ['Analyst', 'Senior Analyst', 'Consultant', 'Manager'],
      avgTimeToManager: 5,
    },
    {
      id: 2,
      name: 'Finance Track',
      percentage: 24,
      steps: ['Junior Analyst', 'Analyst', 'Associate', 'VP'],
      avgTimeToManager: 6,
    },
    {
      id: 3,
      name: 'Tech Track',
      percentage: 19,
      steps: ['Junior Developer', 'Developer', 'Senior Developer', 'Tech Lead'],
      avgTimeToManager: 4,
    },
    {
      id: 4,
      name: 'Corporate Track',
      percentage: 18,
      steps: ['Specialist', 'Senior Specialist', 'Team Lead', 'Manager'],
      avgTimeToManager: 5.5,
    },
  ],
  flowStages: {
    graduation: 100,
    firstJob: 87,
    promotion: 72,
    management: 35,
  },
  topFirstRoles: [
    { role: 'Analyst', percentage: 32 },
    { role: 'Junior Consultant', percentage: 18 },
    { role: 'Associate', percentage: 15 },
    { role: 'Junior Developer', percentage: 12 },
    { role: 'Specialist', percentage: 10 },
  ],
  topCurrentRoles: [
    { role: 'Senior Analyst', percentage: 22 },
    { role: 'Consultant', percentage: 18 },
    { role: 'Manager', percentage: 15 },
    { role: 'Senior Developer', percentage: 12 },
    { role: 'Team Lead', percentage: 10 },
  ],
  progressionTimeline: [
    { milestone: 'Primo lavoro', avgMonths: 2.3 },
    { milestone: 'Prima promozione', avgMonths: 18 },
    { milestone: 'Ruolo Senior', avgMonths: 36 },
    { milestone: 'Ruolo manageriale', avgMonths: 60 },
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 194, g: 153, b: 255 };
};

const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];
  for (let i = 0; i < count; i++) {
    const opacity = 1.0 - (i * 0.15);
    const bgOpacity = Math.max(0.1, opacity * 0.15);
    styles.push({
      bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
      accent: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    });
  }
  return styles;
};

// =============================================================================
// CAREER FLOW SANKEY PLACEHOLDER
// =============================================================================

function CareerFlowSankey() {
  return (
    <div className="bg-[#F5F7FA] rounded-lg p-6 flex flex-col items-center justify-center min-h-[350px] border-2 border-dashed border-[#E8EAF8]">
      <svg width="100%" height="280" viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stage 1 - Graduation */}
        <rect x="20" y="60" width="80" height="160" rx="4" fill="#C299FF" fillOpacity="0.9"/>
        <text x="60" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Laurea</text>
        <text x="60" y="165" textAnchor="middle" fill="white" fontSize="12">100%</text>

        {/* Stage 2 - First Job */}
        <rect x="170" y="75" width="80" height="130" rx="4" fill="#9D52FF" fillOpacity="0.85"/>
        <text x="210" y="142" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">1° Lavoro</text>
        <text x="210" y="162" textAnchor="middle" fill="white" fontSize="12">87%</text>

        {/* Stage 3 - Promotion */}
        <rect x="320" y="90" width="80" height="100" rx="4" fill="#6D7BFC" fillOpacity="0.8"/>
        <text x="360" y="142" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Promozione</text>
        <text x="360" y="162" textAnchor="middle" fill="white" fontSize="12">72%</text>

        {/* Stage 4 - Current Role */}
        <rect x="470" y="105" width="80" height="70" rx="4" fill="#22C55E" fillOpacity="0.8"/>
        <text x="510" y="142" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Manager</text>
        <text x="510" y="162" textAnchor="middle" fill="white" fontSize="12">35%</text>

        {/* Flow lines */}
        <path d="M100 140 C 135 140, 135 140, 170 140" stroke="#C299FF" strokeWidth="40" strokeOpacity="0.25" fill="none"/>
        <path d="M250 140 C 285 140, 285 140, 320 140" stroke="#9D52FF" strokeWidth="32" strokeOpacity="0.25" fill="none"/>
        <path d="M400 140 C 435 140, 435 140, 470 140" stroke="#6D7BFC" strokeWidth="24" strokeOpacity="0.25" fill="none"/>

        {/* Drop-off flows */}
        <path d="M100 180 C 120 200, 140 220, 140 250" stroke="#8D96AC" strokeWidth="8" strokeOpacity="0.2" fill="none"/>
        <path d="M250 180 C 270 200, 290 220, 290 250" stroke="#8D96AC" strokeWidth="6" strokeOpacity="0.2" fill="none"/>
        <path d="M400 175 C 420 195, 440 215, 440 250" stroke="#8D96AC" strokeWidth="5" strokeOpacity="0.2" fill="none"/>

        {/* Time labels */}
        <text x="135" y="30" textAnchor="middle" fill="#8D96AC" fontSize="11">2.3 mesi</text>
        <text x="285" y="30" textAnchor="middle" fill="#8D96AC" fontSize="11">18 mesi</text>
        <text x="435" y="30" textAnchor="middle" fill="#8D96AC" fontSize="11">5 anni</text>

        {/* Arrows */}
        <path d="M115 40 L135 50 L155 40" stroke="#8D96AC" strokeWidth="1.5" fill="none"/>
        <path d="M265 40 L285 50 L305 40" stroke="#8D96AC" strokeWidth="1.5" fill="none"/>
        <path d="M415 40 L435 50 L455 40" stroke="#8D96AC" strokeWidth="1.5" fill="none"/>
      </svg>

      <div className="flex gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#C299FF]" />
          <span className="text-sm text-[#5A607F]">Laurea</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#9D52FF]" />
          <span className="text-sm text-[#5A607F]">Primo Lavoro</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#6D7BFC]" />
          <span className="text-sm text-[#5A607F]">Promozione</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#22C55E]" />
          <span className="text-sm text-[#5A607F]">Ruolo Manageriale</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-[#8D96AC]">Sankey Diagram - Laurea → Primo Lavoro → Promozione → Ruolo Attuale</p>
      <p className="text-xs text-[#ADB3C7]">Integrazione con D3.js o Recharts</p>
    </div>
  );
}

// =============================================================================
// TIMELINE COMPONENT
// =============================================================================

function ProgressionTimeline({ data }: { data: typeof mockCareerFlow.progressionTimeline }) {
  const maxMonths = Math.max(...data.map(d => d.avgMonths));

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C299FF] via-[#9D52FF] to-[#6D7BFC]" />

      <div className="flex flex-col gap-6">
        {data.map((item, index) => (
          <div key={item.milestone} className="flex items-center gap-4">
            {/* Dot */}
            <div
              className="relative z-10 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center"
              style={{
                backgroundColor: index === 0 ? '#C299FF' : index === 1 ? '#9D52FF' : index === 2 ? '#6D7BFC' : '#22C55E',
              }}
            >
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>

            {/* Content */}
            <div className="flex-1 bg-[#F5F7FA] rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#212746]">{item.milestone}</span>
                <span className="text-lg font-bold text-[#C299FF]">
                  {item.avgMonths < 12 ? `${item.avgMonths} mesi` : `${(item.avgMonths / 12).toFixed(1)} anni`}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-2 bg-[#E8EAF8] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.avgMonths / maxMonths) * 100}%`,
                    backgroundColor: index === 0 ? '#C299FF' : index === 1 ? '#9D52FF' : index === 2 ? '#6D7BFC' : '#22C55E',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function CareerFlowPage() {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  const pathColorStyles = generateColorFades('#C299FF', mockCareerFlow.careerPaths.length);
  const firstRoleColorStyles = generateColorFades('#9D52FF', mockCareerFlow.topFirstRoles.length);
  const currentRoleColorStyles = generateColorFades('#C299FF', mockCareerFlow.topCurrentRoles.length);

  return (
    <div className="bg-white min-h-screen">
      {/* ================================================================== */}
      {/* BREADCRUMB & HEADER */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] pt-6 pb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#8D96AC] mb-4">
          <Link href="/university" className="hover:text-[#6D7BFC] transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/university/analytics" className="hover:text-[#6D7BFC] transition-colors">
            Analytics
          </Link>
          <span>/</span>
          <span className="text-[#C299FF] font-medium">Carriere</span>
          <span>/</span>
          <span className="text-[#212746] font-medium">Career Flow</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl text-[#212746]">Career Flow</h1>
            <p className="font-normal text-base text-[#5A607F] mt-1">
              Percorsi di carriera e progressione professionale dei laureati
            </p>
          </div>
          <button className="bg-[#C299FF] hover:bg-[#B080FF] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Esporta Report
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* KPI CARDS */}
      {/* ================================================================== */}
      <div className="px-[53px] py-8 bg-white">
        <div className="flex gap-6 items-stretch">

          {/* Card 1: Tempo al primo lavoro */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanto ci mettono a trovare lavoro?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                  {mockCareerFlow.timeToFirstJob}
                </p>
                <span className="text-2xl font-medium text-[#212746] pb-3">mesi</span>
                {/* Trend Down Arrow - miglioramento */}
                <div className="flex items-center gap-1 text-[#22C55E] mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                  <span className="text-sm font-medium">-0.5</span>
                </div>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Tempo medio per trovare il <span className="font-medium">primo impiego</span>
              </p>
            </div>
          </div>

          {/* Card 2: Tempo alla prima promozione */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quando arriva la prima promozione?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  {mockCareerFlow.timeToFirstPromotion}
                </p>
                <span className="text-2xl font-medium text-[#212746] pb-3">mesi</span>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Tempo medio per la <span className="font-medium">prima promozione</span>
              </p>
            </div>
          </div>

          {/* Card 3: Retention rate */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti restano nella stessa azienda?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end font-medium text-[#212746]">
                <span className="text-[82px] leading-[72px]">
                  {mockCareerFlow.stayRate}%
                </span>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                resta nella stessa azienda dopo <span className="font-medium">3 anni</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* CAREER FLOW SANKEY */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
          <div className="bg-white flex items-center justify-between px-5 py-4 w-full border-b border-[#E8EAF8]">
            <h3 className="font-medium text-xl text-[#212746]">
              Flusso Carriere: Laurea → Primo Lavoro → Promozione → Ruolo Attuale
            </h3>
          </div>
          <div className="p-6">
            <CareerFlowSankey />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT GRID */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-[1fr_1fr] gap-6">

          {/* ============================================================ */}
          {/* LEFT: Timeline */}
          {/* ============================================================ */}
          <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Timeline Media Progressione
              </h3>
            </div>
            <div className="p-6">
              <ProgressionTimeline data={mockCareerFlow.progressionTimeline} />
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: Career Paths */}
          {/* ============================================================ */}
          <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Pattern di Carriera Piu Comuni
              </h3>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {mockCareerFlow.careerPaths.map((path, index) => {
                const style = pathColorStyles[index];
                const isSelected = selectedPath === path.id;

                return (
                  <div
                    key={path.id}
                    onClick={() => setSelectedPath(isSelected ? null : path.id)}
                    className={`relative cursor-pointer rounded-lg border transition-all overflow-hidden ${
                      isSelected ? 'border-[#C299FF] shadow-md' : 'border-[#E8EAF8] hover:border-[#C299FF]'
                    }`}
                  >
                    {/* Background bar */}
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundColor: style.bg,
                        width: `${(path.percentage / mockCareerFlow.careerPaths[0].percentage) * 100}%`,
                      }}
                    />

                    <div className="relative z-10 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-1 h-8 rounded-full"
                            style={{ backgroundColor: style.accent }}
                          />
                          <div>
                            <p className="font-semibold text-[#212746]">{path.name}</p>
                            <p className="text-xs text-[#8D96AC]">{path.percentage}% dei laureati</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[#C299FF]">
                          ~{path.avgTimeToManager} anni a Manager
                        </span>
                      </div>

                      {/* Steps */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-[#E8EAF8]">
                          <div className="flex items-center gap-2">
                            {path.steps.map((step, stepIndex) => (
                              <div key={step} className="flex items-center">
                                <span className="text-sm text-[#5A607F] bg-white px-2 py-1 rounded">
                                  {step}
                                </span>
                                {stepIndex < path.steps.length - 1 && (
                                  <svg className="w-4 h-4 text-[#C299FF] mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* ROLE COMPARISON */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-2 gap-6">

          {/* First Roles */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Top Primi Ruoli
              </h3>
              <span className="text-sm text-[#D0E957]">Dopo la laurea</span>
            </div>

            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {mockCareerFlow.topFirstRoles.map((item, index) => {
                const style = firstRoleColorStyles[index];
                const maxPercentage = mockCareerFlow.topFirstRoles[0].percentage;

                return (
                  <div
                    key={item.role}
                    className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#9D52FF] transition-all w-full overflow-hidden rounded-lg"
                  >
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundColor: style.bg,
                        width: `${(item.percentage / maxPercentage) * 100}%`,
                      }}
                    />
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <div
                        className="w-1 h-10 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: style.accent }}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <p className="font-semibold text-base text-[#212746]">
                          {item.role}
                        </p>
                        <span className="font-semibold text-xl text-[#212746]">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Roles */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Top Ruoli Attuali
              </h3>
              <span className="text-sm text-[#D0E957]">Alumni attivi</span>
            </div>

            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {mockCareerFlow.topCurrentRoles.map((item, index) => {
                const style = currentRoleColorStyles[index];
                const maxPercentage = mockCareerFlow.topCurrentRoles[0].percentage;

                return (
                  <div
                    key={item.role}
                    className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#C299FF] transition-all w-full overflow-hidden rounded-lg"
                  >
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundColor: style.bg,
                        width: `${(item.percentage / maxPercentage) * 100}%`,
                      }}
                    />
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <div
                        className="w-1 h-10 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: style.accent }}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <p className="font-semibold text-base text-[#212746]">
                          {item.role}
                        </p>
                        <span className="font-semibold text-xl text-[#212746]">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* INSIGHTS BOX */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="bg-gradient-to-r from-[#C299FF]/10 to-[#9D52FF]/10 border border-[#C299FF]/30 rounded-lg p-6">
          <h3 className="font-semibold text-lg text-[#212746] mb-4">Key Insights</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C299FF]/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C299FF" strokeWidth="2">
                  <path d="M23 6l-9.5 9.5-5-5L1 18" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#212746]">Carriere veloci</p>
                <p className="text-sm text-[#5A607F]">Il 35% raggiunge un ruolo manageriale entro 5 anni dalla laurea</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#9D52FF]/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9D52FF" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#212746]">Alta retention</p>
                <p className="text-sm text-[#5A607F]">Il {mockCareerFlow.stayRate}% resta nella stessa azienda per almeno 3 anni</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6D7BFC]/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D7BFC" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#212746]">Promozioni rapide</p>
                <p className="text-sm text-[#5A607F]">Prima promozione in media dopo {mockCareerFlow.timeToFirstPromotion} mesi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* NAVIGATION TO OTHER SECTIONS */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] py-8">
        <h3 className="text-lg font-semibold text-[#212746] mb-4">Altre Sezioni Carriere</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <Link
            href="/university/analytics/careers/placement"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Placement Rate</span>
          </Link>

          <Link
            href="/university/analytics/careers/destinations"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Destinazioni</span>
          </Link>

          <Link
            href="/university/analytics/careers/salaries"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Distribuzione Salari</span>
          </Link>

          <Link
            href="/university/analytics"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Tutte le Analytics</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
