'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 109, g: 123, b: 252 };
};

const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];
  for (let i = 0; i < count; i++) {
    const opacity = 1.0 - (i * 0.12);
    const bgOpacity = Math.max(0.12, opacity * 0.15);
    styles.push({
      bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
      accent: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    });
  }
  return styles;
};

// =============================================================================
// MOCK DATA
// =============================================================================

const mockStats = {
  totalStudents: 2847,
  activeStudents: 1594,
  semiActiveStudents: 687,
  inactiveStudents: 566,
  avgSearchesPerStudent: 5.4,
  avgEngagementScore: 68,
  profileCompletionRate: 72,
  searchFrequency: {
    daily: 234,
    weekly: 567,
    monthly: 793,
    inactive: 566,
  }
};

// Top 10 most active students
const mockTopStudents = [
  { name: 'Elena Galli', course: 'Economia Aziendale', searches: 102, score: 88, lastActive: '2024-01-15' },
  { name: 'Luca Ferrari', course: 'Informatica', searches: 89, score: 78, lastActive: '2024-01-12' },
  { name: 'Alessandro Verdi', course: 'Data Science', searches: 68, score: 93, lastActive: '2024-01-15' },
  { name: 'Giorgio Barbieri', course: 'Economia Aziendale', searches: 56, score: 91, lastActive: '2024-01-15' },
  { name: 'Marco Rossi', course: 'Economia Aziendale', searches: 47, score: 85, lastActive: '2024-01-14' },
  { name: 'Chiara Lombardi', course: 'Data Science', searches: 41, score: 76, lastActive: '2024-01-15' },
  { name: 'Giulia Bianchi', course: 'Ingegneria Gestionale', searches: 32, score: 72, lastActive: '2024-01-14' },
  { name: 'Valentina Costa', course: 'Marketing e Comunicazione', searches: 28, score: 67, lastActive: '2024-01-14' },
  { name: 'Andrea Marino', course: 'Ingegneria Informatica', searches: 25, score: 61, lastActive: '2024-01-13' },
  { name: 'Simone Fontana', course: 'Informatica', searches: 19, score: 54, lastActive: '2024-01-12' },
];

// Engagement by course
const mockEngagementByCourse = [
  { course: 'Data Science', avgScore: 85, avgSearches: 12.4, students: 158 },
  { course: 'Finance', avgScore: 81, avgSearches: 10.8, students: 312 },
  { course: 'Informatica', avgScore: 76, avgSearches: 9.2, students: 234 },
  { course: 'Ingegneria Informatica', avgScore: 74, avgSearches: 8.7, students: 278 },
  { course: 'Economia Aziendale', avgScore: 72, avgSearches: 8.1, students: 487 },
];

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function EngagementPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const topStudentColorStyles = generateColorFades('#9D52FF', mockTopStudents.length);
  const courseColorStyles = generateColorFades('#6D7BFC', mockEngagementByCourse.length);

  const maxSearches = Math.max(...mockTopStudents.map(s => s.searches));
  const maxCourseScore = Math.max(...mockEngagementByCourse.map(c => c.avgScore));

  // Calculate percentages for engagement flow
  const activePercentage = Math.round((mockStats.activeStudents / mockStats.totalStudents) * 100);
  const semiActivePercentage = Math.round((mockStats.semiActiveStudents / mockStats.totalStudents) * 100);
  const inactivePercentage = Math.round((mockStats.inactiveStudents / mockStats.totalStudents) * 100);

  return (
    <div className="bg-white min-h-screen">
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#9D52FF] to-[#6D7BFC] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-3xl text-[#212746]">Metriche Engagement</h1>
              <p className="font-normal text-base text-[#5A607F]">Analisi del coinvolgimento e attivita degli studenti</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Time range selector */}
            <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-[#E8EAF8]">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    timeRange === range
                      ? 'bg-[#6D7BFC] text-white'
                      : 'text-[#5A607F] hover:bg-[#F5F7FA]'
                  }`}
                >
                  {range === '7d' ? '7 giorni' : range === '30d' ? '30 giorni' : '90 giorni'}
                </button>
              ))}
            </div>
            <Link
              href="/university/students"
              className="text-sm text-[#6D7BFC] hover:text-[#5A68E0] font-medium flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Torna alla lista
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* KPI CARDS - Question Style */}
      {/* ================================================================== */}
      <div className="px-[53px] py-8 bg-white">
        <div className="flex gap-6 items-stretch">

          {/* Card 1: Qual e il livello di engagement? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Qual e il livello di engagement?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                  {mockStats.avgEngagementScore}%
                </p>
                {/* Trend Up Arrow */}
                <div className="flex items-center gap-1 text-[#22C55E] mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <span className="text-sm font-medium">+3%</span>
                </div>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Punteggio medio di engagement su tutti gli studenti
              </p>
            </div>
          </div>

          {/* Card 2: Quante ricerche per studente? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quante ricerche per studente?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                {mockStats.avgSearchesPerStudent}
              </p>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Ricerche medie per studente negli ultimi <span className="font-medium">30 giorni</span>
              </p>
            </div>
          </div>

          {/* Card 3: Completamento profilo */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Completamento profilo?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-1 items-end">
                <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  {mockStats.profileCompletionRate}%
                </p>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Studenti con profilo <span className="font-medium">completo</span> al 100%
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT GRID */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-[1.2fr_1fr] gap-6">

          {/* ============================================================ */}
          {/* LEFT COLUMN */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Engagement Flow / Sankey-style visualization */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
                <p className="flex-1 font-medium text-xl text-white">
                  Come sono distribuiti per engagement?
                </p>
              </div>

              <div className="p-6">
                {/* Main number */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <span className="text-[80px] font-bold text-[#212746] leading-none">
                      {mockStats.totalStudents.toLocaleString('it-IT')}
                    </span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="14"
                      viewBox="0 0 200 14"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 10C50 3 150 3 198 10"
                        stroke="#D0E957"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base text-[#8D96AC] mt-4 uppercase tracking-wider font-semibold">Studenti Totali</p>
                </div>

                {/* Sankey-style flow diagram */}
                <div className="w-full flex flex-col">
                  <svg width="100%" height="80" viewBox="0 0 300 80" fill="none" preserveAspectRatio="none">
                    {/* Inattivi flow (gray) - leftmost */}
                    <path
                      d="M100 0
                         L110 0
                         C110 40, 60 60, 0 80
                         L0 80
                         C40 60, 100 40, 100 0
                         Z"
                      fill="#8D96AC"
                      opacity="0.5"
                    />
                    {/* Semi-attivi flow (purple) - middle */}
                    <path
                      d="M110 0
                         L190 0
                         C190 40, 180 60, 150 80
                         L0 80
                         C30 60, 110 40, 110 0
                         Z"
                      fill="#9D52FF"
                      opacity="0.5"
                    />
                    {/* Attivi flow (blue) - rightmost */}
                    <path
                      d="M190 0
                         L200 0
                         C200 40, 300 60, 300 80
                         L150 80
                         C180 60, 190 40, 190 0
                         Z"
                      fill="#22C55E"
                      opacity="0.5"
                    />
                  </svg>

                  {/* Horizontal bar */}
                  <div className="flex w-full h-14 rounded-b-lg overflow-hidden">
                    {/* Inattivi section - gray (left) */}
                    <div
                      className="bg-[#8D96AC] flex flex-col items-center justify-center"
                      style={{ width: `${inactivePercentage}%` }}
                    >
                      <span className="text-white font-bold text-lg">{mockStats.inactiveStudents.toLocaleString('it-IT')}</span>
                      <span className="text-white/80 text-[10px] uppercase">{inactivePercentage}%</span>
                    </div>
                    {/* Semi-attivi section - purple (middle) */}
                    <div
                      className="bg-[#9D52FF] flex flex-col items-center justify-center"
                      style={{ width: `${semiActivePercentage}%` }}
                    >
                      <span className="text-white font-bold text-lg">{mockStats.semiActiveStudents.toLocaleString('it-IT')}</span>
                      <span className="text-white/80 text-[10px] uppercase">{semiActivePercentage}%</span>
                    </div>
                    {/* Attivi section - green (right) */}
                    <div
                      className="bg-[#22C55E] flex flex-col items-center justify-center"
                      style={{ width: `${activePercentage}%` }}
                    >
                      <span className="text-white font-bold text-lg">{mockStats.activeStudents.toLocaleString('it-IT')}</span>
                      <span className="text-white/80 text-[10px] uppercase">{activePercentage}%</span>
                    </div>
                  </div>

                  {/* Labels below the bar */}
                  <div className="flex justify-between mt-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#8D96AC]" />
                      <span className="text-sm font-medium text-[#8D96AC]">Inattivi</span>
                      <span className="text-xs text-[#ADB3C7]">(&lt;3 ricerche/mese)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#9D52FF]" />
                      <span className="text-sm font-medium text-[#9D52FF]">Semi-attivi</span>
                      <span className="text-xs text-[#ADB3C7]">(3-10 ricerche/mese)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                      <span className="text-sm font-medium text-[#22C55E]">Attivi</span>
                      <span className="text-xs text-[#ADB3C7]">(&gt;10 ricerche/mese)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement by Course */}
            <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Quali corsi hanno piu engagement?
                </h3>
              </div>

              <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
                {mockEngagementByCourse.map((course, index) => {
                  const style = courseColorStyles[index];

                  return (
                    <div
                      key={course.course}
                      className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#6D7BFC] transition-all w-full overflow-hidden rounded-lg"
                    >
                      {/* Background bar proportional to score */}
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(course.avgScore / maxCourseScore) * 100}%`,
                        }}
                      />

                      {/* Content on top of background */}
                      <div className="relative z-10 flex items-center gap-3 w-full">
                        {/* Vertical accent bar */}
                        <div
                          className="w-1 h-10 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: style.accent }}
                        />

                        {/* Content */}
                        <div className="flex-1 flex items-center justify-between">
                          {/* Course info */}
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-base text-[#212746]">
                              {course.course}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {course.students} studenti
                            </p>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-xl text-[#6D7BFC]">
                                {course.avgScore}%
                              </span>
                              <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                                Score
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-lg text-[#212746]">
                                {course.avgSearches}
                              </span>
                              <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                                Ricerche/mese
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Engagement Score Gauge */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
                <p className="flex-1 font-medium text-xl text-white">
                  Score Engagement Medio
                </p>
              </div>

              <div className="p-6 flex flex-col items-center">
                {/* Gauge Arc */}
                <svg viewBox="0 0 200 120" className="w-64 h-40">
                  <defs>
                    <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8D96AC" />
                      <stop offset="30%" stopColor="#9D52FF" />
                      <stop offset="70%" stopColor="#6D7BFC" />
                      <stop offset="100%" stopColor="#22C55E" />
                    </linearGradient>
                  </defs>
                  {/* Background arc (gray) */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E8EAF8"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  {/* Filled arc (gradient) */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#engagementGradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${(mockStats.avgEngagementScore / 100) * 251.2} 251.2`}
                  />
                  {/* Percentage text */}
                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    fontSize="42"
                    fontWeight="700"
                    fill="#212746"
                  >
                    {mockStats.avgEngagementScore}%
                  </text>
                </svg>

                {/* Legend */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8D96AC]" />
                    <span className="text-xs text-[#5A607F]">Basso (0-30)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#9D52FF]" />
                    <span className="text-xs text-[#5A607F]">Medio (31-60)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                    <span className="text-xs text-[#5A607F]">Alto (61-100)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top 10 Active Students */}
            <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Chi sono i top 10 piu attivi?
                </h3>
              </div>

              <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full max-h-[400px] overflow-y-auto">
                {mockTopStudents.map((student, index) => {
                  const style = topStudentColorStyles[Math.min(index, topStudentColorStyles.length - 1)];

                  return (
                    <div
                      key={student.name}
                      className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#9D52FF] transition-all w-full overflow-hidden rounded-lg"
                    >
                      {/* Background bar proportional to searches */}
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(student.searches / maxSearches) * 100}%`,
                        }}
                      />

                      {/* Content on top of background */}
                      <div className="relative z-10 flex items-center gap-3 w-full">
                        {/* Rank number */}
                        <div
                          className="w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: style.accent }}
                        >
                          {index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex items-center justify-between">
                          {/* Student info */}
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-sm text-[#212746]">
                              {student.name}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {student.course}
                            </p>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-lg text-[#212746]">
                                {student.searches}
                              </span>
                              <span className="font-normal text-[9px] text-[#8D96AC] uppercase">
                                Ricerche
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-lg text-[#9D52FF]">
                                {student.score}
                              </span>
                              <span className="font-normal text-[9px] text-[#8D96AC] uppercase">
                                Score
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="flex flex-col gap-3">
              <Link
                href="/university/students"
                className="flex items-center gap-3 px-5 py-4 bg-[#6D7BFC]/10 rounded-lg border border-[#6D7BFC]/20 hover:border-[#6D7BFC] hover:bg-[#6D7BFC]/15 transition-all"
              >
                <span className="text-[#6D7BFC]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#212746]">Lista Studenti</p>
                  <p className="text-xs text-[#5A607F]">Visualizza tutti gli studenti</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#6D7BFC]">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link
                href="/university/students/by-course"
                className="flex items-center gap-3 px-5 py-4 bg-[#9D52FF]/10 rounded-lg border border-[#9D52FF]/20 hover:border-[#9D52FF] hover:bg-[#9D52FF]/15 transition-all"
              >
                <span className="text-[#9D52FF]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#212746]">Studenti per Corso</p>
                  <p className="text-xs text-[#5A607F]">Breakdown per corso di laurea</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#9D52FF]">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
