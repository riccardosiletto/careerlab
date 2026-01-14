'use client';

import { useState, useMemo } from 'react';
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

const mockDepartments = [
  { id: 'dep-1', name: 'Economia e Management', code: 'ECO' },
  { id: 'dep-2', name: 'Ingegneria', code: 'ING' },
  { id: 'dep-3', name: 'Scienze Politiche', code: 'POL' },
  { id: 'dep-4', name: 'Informatica', code: 'INF' },
];

const mockCoursesByDepartment = {
  'dep-1': [
    { id: 'course-1', name: 'Economia Aziendale', level: 'bachelor', students: 487, active: 312, avgEngagement: 72 },
    { id: 'course-2', name: 'Marketing e Comunicazione', level: 'master', students: 234, active: 178, avgEngagement: 68 },
    { id: 'course-3', name: 'Finance', level: 'master', students: 312, active: 245, avgEngagement: 81 },
    { id: 'course-4', name: 'International Management', level: 'master', students: 189, active: 134, avgEngagement: 75 },
  ],
  'dep-2': [
    { id: 'course-5', name: 'Ingegneria Gestionale', level: 'bachelor', students: 356, active: 234, avgEngagement: 69 },
    { id: 'course-6', name: 'Ingegneria Informatica', level: 'bachelor', students: 278, active: 198, avgEngagement: 74 },
    { id: 'course-7', name: 'Ingegneria dei Sistemi', level: 'master', students: 145, active: 112, avgEngagement: 78 },
  ],
  'dep-3': [
    { id: 'course-8', name: 'Relazioni Internazionali', level: 'bachelor', students: 198, active: 124, avgEngagement: 58 },
    { id: 'course-9', name: 'Scienze della Comunicazione', level: 'bachelor', students: 167, active: 98, avgEngagement: 62 },
    { id: 'course-10', name: 'European Studies', level: 'master', students: 89, active: 67, avgEngagement: 71 },
  ],
  'dep-4': [
    { id: 'course-11', name: 'Informatica', level: 'bachelor', students: 234, active: 187, avgEngagement: 76 },
    { id: 'course-12', name: 'Data Science', level: 'master', students: 158, active: 142, avgEngagement: 85 },
  ],
};

// Flatten all courses for the main list
const allCourses = Object.entries(mockCoursesByDepartment).flatMap(([deptId, courses]) =>
  courses.map(course => ({
    ...course,
    departmentId: deptId,
    departmentName: mockDepartments.find(d => d.id === deptId)?.name || ''
  }))
).sort((a, b) => b.students - a.students);

// KPI Stats
const mockStats = {
  totalCourses: allCourses.length,
  totalStudents: 2847,
  avgStudentsPerCourse: Math.round(2847 / allCourses.length),
  topCourse: allCourses[0]?.name || 'N/A',
  topCourseDept: allCourses[0]?.departmentName || 'N/A',
};

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function StudentsByCoursePage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Filter courses by department
  const filteredCourses = useMemo(() => {
    if (!selectedDepartment) return allCourses;
    return allCourses.filter(c => c.departmentId === selectedDepartment);
  }, [selectedDepartment]);

  const courseColorStyles = generateColorFades('#6D7BFC', filteredCourses.length);
  const maxStudents = Math.max(...filteredCourses.map(c => c.students));

  // Calculate department stats
  const departmentStats = useMemo(() => {
    return mockDepartments.map(dept => {
      const deptCourses = mockCoursesByDepartment[dept.id as keyof typeof mockCoursesByDepartment] || [];
      const totalStudents = deptCourses.reduce((sum, c) => sum + c.students, 0);
      const activeStudents = deptCourses.reduce((sum, c) => sum + c.active, 0);
      return {
        ...dept,
        courses: deptCourses.length,
        students: totalStudents,
        activeStudents,
        activeRate: Math.round((activeStudents / totalStudents) * 100),
      };
    }).sort((a, b) => b.students - a.students);
  }, []);

  const deptColorStyles = generateColorFades('#9D52FF', departmentStats.length);
  const maxDeptStudents = Math.max(...departmentStats.map(d => d.students));

  const getLevelBadgeStyle = (level: string) => {
    switch (level) {
      case 'bachelor':
        return 'bg-[#6D7BFC]/15 text-[#6D7BFC]';
      case 'master':
        return 'bg-[#9D52FF]/15 text-[#9D52FF]';
      case 'phd':
        return 'bg-[#22C55E]/15 text-[#22C55E]';
      default:
        return 'bg-[#8D96AC]/15 text-[#8D96AC]';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'bachelor':
        return 'Triennale';
      case 'master':
        return 'Magistrale';
      case 'phd':
        return 'Dottorato';
      default:
        return level;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6D7BFC] to-[#9D52FF] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-3xl text-[#212746]">Studenti per Corso</h1>
              <p className="font-normal text-base text-[#5A607F]">Breakdown degli studenti per corso di laurea e dipartimento</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/university/students"
              className="text-sm text-[#6D7BFC] hover:text-[#5A68E0] font-medium flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Torna alla lista
            </Link>
            <button className="bg-[#6D7BFC] hover:bg-[#5A68E0] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Esporta
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* KPI CARDS - Question Style */}
      {/* ================================================================== */}
      <div className="px-[53px] py-8 bg-white">
        <div className="flex gap-6 items-stretch">

          {/* Card 1: Quanti corsi? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti corsi attivi?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                {mockStats.totalCourses}
              </p>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Corsi di laurea con studenti registrati su Career Lab
              </p>
            </div>
          </div>

          {/* Card 2: Media studenti per corso */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Media studenti per corso?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                {mockStats.avgStudentsPerCourse}
              </p>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Studenti in media per ciascun corso di laurea
              </p>
            </div>
          </div>

          {/* Card 3: Corso piu popolato */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Qual e il corso piu grande?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-[32px] text-[#212746] leading-[36px]">
                  {mockStats.topCourse}
                </p>
                <p className="font-medium text-xl text-[#6D7BFC]">
                  {allCourses[0]?.students.toLocaleString('it-IT')} studenti
                </p>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Dipartimento di <span className="font-medium">{mockStats.topCourseDept}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT GRID */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-[1.5fr_1fr] gap-6">

          {/* ============================================================ */}
          {/* LEFT COLUMN: Courses List */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Department Filter Pills */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-[#5A607F]">Filtra per dipartimento:</span>
              <button
                onClick={() => setSelectedDepartment(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDepartment === null
                    ? 'bg-[#6D7BFC] text-white'
                    : 'bg-[#F5F7FA] text-[#5A607F] hover:bg-[#E8EAF8]'
                }`}
              >
                Tutti
              </button>
              {mockDepartments.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedDepartment === dept.id
                      ? 'bg-[#6D7BFC] text-white'
                      : 'bg-[#F5F7FA] text-[#5A607F] hover:bg-[#E8EAF8]'
                  }`}
                >
                  {dept.code}
                </button>
              ))}
            </div>

            {/* Courses HorizontalBarCard */}
            <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Distribuzione studenti per corso
                </h3>
                <span className="text-sm text-[#D0E957]">
                  {filteredCourses.length} corsi
                </span>
              </div>

              <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full max-h-[600px] overflow-y-auto">
                {filteredCourses.map((course, index) => {
                  const style = courseColorStyles[Math.min(index, courseColorStyles.length - 1)];

                  return (
                    <div
                      key={course.id}
                      className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#6D7BFC] transition-all w-full overflow-hidden rounded-lg cursor-pointer"
                    >
                      {/* Background bar proportional to students */}
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(course.students / maxStudents) * 100}%`,
                        }}
                      />

                      {/* Content on top of background */}
                      <div className="relative z-10 flex items-center gap-3 w-full">
                        {/* Vertical accent bar */}
                        <div
                          className="w-1 h-12 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: style.accent }}
                        />

                        {/* Content */}
                        <div className="flex-1 flex items-center justify-between">
                          {/* Course info */}
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-base text-[#212746]">
                                {course.name}
                              </p>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${getLevelBadgeStyle(course.level)}`}>
                                {getLevelLabel(course.level)}
                              </span>
                            </div>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {course.departmentName}
                            </p>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-xl text-[#212746]">
                                {course.students}
                              </span>
                              <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                                Studenti
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-lg text-[#22C55E]">
                                {course.active}
                              </span>
                              <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                                Attivi
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-lg text-[#9D52FF]">
                                {course.avgEngagement}%
                              </span>
                              <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                                Engagement
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
          {/* RIGHT COLUMN: Department Summary */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Departments HorizontalBarCard */}
            <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Studenti per Dipartimento
                </h3>
              </div>

              <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
                {departmentStats.map((dept, index) => {
                  const style = deptColorStyles[index];

                  return (
                    <div
                      key={dept.id}
                      onClick={() => setSelectedDepartment(selectedDepartment === dept.id ? null : dept.id)}
                      className={`relative flex items-center gap-3 p-3 border transition-all w-full overflow-hidden rounded-lg cursor-pointer ${
                        selectedDepartment === dept.id
                          ? 'border-[#9D52FF] bg-[#9D52FF]/5'
                          : 'border-[#E8EAF8] hover:border-[#9D52FF]'
                      }`}
                    >
                      {/* Background bar proportional to students */}
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(dept.students / maxDeptStudents) * 100}%`,
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
                          {/* Department info */}
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-base text-[#212746]">
                              {dept.name}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {dept.courses} corsi
                            </p>
                          </div>

                          {/* Count badge */}
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xl text-[#212746]">
                              {dept.students}
                            </span>
                            <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                              Studenti
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Level Distribution Card */}
            <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
                <p className="flex-1 font-medium text-xl text-white">
                  Distribuzione per livello
                </p>
              </div>

              <div className="flex flex-col gap-4 p-5">
                {/* Bachelor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getLevelBadgeStyle('bachelor')}`}>
                      Triennale
                    </span>
                    <span className="text-sm text-[#5A607F]">
                      {allCourses.filter(c => c.level === 'bachelor').length} corsi
                    </span>
                  </div>
                  <span className="font-semibold text-lg text-[#212746]">
                    {allCourses.filter(c => c.level === 'bachelor').reduce((sum, c) => sum + c.students, 0).toLocaleString('it-IT')}
                  </span>
                </div>

                {/* Master */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getLevelBadgeStyle('master')}`}>
                      Magistrale
                    </span>
                    <span className="text-sm text-[#5A607F]">
                      {allCourses.filter(c => c.level === 'master').length} corsi
                    </span>
                  </div>
                  <span className="font-semibold text-lg text-[#212746]">
                    {allCourses.filter(c => c.level === 'master').reduce((sum, c) => sum + c.students, 0).toLocaleString('it-IT')}
                  </span>
                </div>

                {/* Visual bar chart */}
                <div className="mt-4 flex h-4 rounded-full overflow-hidden bg-[#E8EAF8]">
                  <div
                    className="bg-[#6D7BFC] h-full"
                    style={{
                      width: `${(allCourses.filter(c => c.level === 'bachelor').reduce((sum, c) => sum + c.students, 0) / mockStats.totalStudents) * 100}%`
                    }}
                  />
                  <div
                    className="bg-[#9D52FF] h-full"
                    style={{
                      width: `${(allCourses.filter(c => c.level === 'master').reduce((sum, c) => sum + c.students, 0) / mockStats.totalStudents) * 100}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#8D96AC]">
                  <span>Triennale: {Math.round((allCourses.filter(c => c.level === 'bachelor').reduce((sum, c) => sum + c.students, 0) / mockStats.totalStudents) * 100)}%</span>
                  <span>Magistrale: {Math.round((allCourses.filter(c => c.level === 'master').reduce((sum, c) => sum + c.students, 0) / mockStats.totalStudents) * 100)}%</span>
                </div>
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
                href="/university/students/engagement"
                className="flex items-center gap-3 px-5 py-4 bg-[#9D52FF]/10 rounded-lg border border-[#9D52FF]/20 hover:border-[#9D52FF] hover:bg-[#9D52FF]/15 transition-all"
              >
                <span className="text-[#9D52FF]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#212746]">Metriche Engagement</p>
                  <p className="text-xs text-[#5A607F]">Analisi attivita studenti</p>
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
