'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import StudentFilters from '@/components/university/students/StudentFilters';
import StudentTable from '@/components/university/students/StudentTable';
import StudentCard from '@/components/university/students/StudentCard';
import Pagination from '@/components/university/shared/Pagination';
import EmptyState from '@/components/university/shared/EmptyState';
import { StudentFilters as StudentFiltersType, StudentListItem, StudentStatus } from '@/types/university';

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
    const opacity = 1.0 - (i * 0.15);
    const bgOpacity = Math.max(0.15, opacity * 0.15);
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
  { id: 'dep-1', name: 'Economia e Management' },
  { id: 'dep-2', name: 'Ingegneria' },
  { id: 'dep-3', name: 'Scienze Politiche' },
  { id: 'dep-4', name: 'Informatica' }
];

const mockCourses = [
  { id: 'course-1', name: 'Economia Aziendale', departmentId: 'dep-1' },
  { id: 'course-2', name: 'Marketing e Comunicazione', departmentId: 'dep-1' },
  { id: 'course-3', name: 'Ingegneria Gestionale', departmentId: 'dep-2' },
  { id: 'course-4', name: 'Ingegneria Informatica', departmentId: 'dep-2' },
  { id: 'course-5', name: 'Relazioni Internazionali', departmentId: 'dep-3' },
  { id: 'course-6', name: 'Scienze della Comunicazione', departmentId: 'dep-3' },
  { id: 'course-7', name: 'Informatica', departmentId: 'dep-4' },
  { id: 'course-8', name: 'Data Science', departmentId: 'dep-4' }
];

const mockCohorts = [
  { id: 'cohort-1', year: '2023/2024', courseId: 'course-1' },
  { id: 'cohort-2', year: '2022/2023', courseId: 'course-1' },
  { id: 'cohort-3', year: '2023/2024', courseId: 'course-2' },
  { id: 'cohort-4', year: '2023/2024', courseId: 'course-3' },
  { id: 'cohort-5', year: '2022/2023', courseId: 'course-3' },
  { id: 'cohort-6', year: '2023/2024', courseId: 'course-4' },
  { id: 'cohort-7', year: '2023/2024', courseId: 'course-5' },
  { id: 'cohort-8', year: '2023/2024', courseId: 'course-6' },
  { id: 'cohort-9', year: '2023/2024', courseId: 'course-7' },
  { id: 'cohort-10', year: '2022/2023', courseId: 'course-7' },
  { id: 'cohort-11', year: '2023/2024', courseId: 'course-8' }
];

// Extended mock data for realistic Bocconi-style university
const mockStudents: StudentListItem[] = [
  {
    id: 'student-1',
    fullName: 'Marco Rossi',
    email: 'marco.rossi@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Economia Aziendale',
    courseId: 'course-1',
    cohortYear: '2023/2024',
    cohortId: 'cohort-1',
    status: 'enrolled',
    engagementScore: 85,
    searchCount: 47,
    lastActivityAt: '2024-01-15T10:30:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-2',
    fullName: 'Giulia Bianchi',
    email: 'giulia.bianchi@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Ingegneria Gestionale',
    courseId: 'course-3',
    cohortYear: '2023/2024',
    cohortId: 'cohort-4',
    status: 'enrolled',
    engagementScore: 72,
    searchCount: 32,
    lastActivityAt: '2024-01-14T16:45:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-3',
    fullName: 'Alessandro Verdi',
    email: 'alessandro.verdi@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Data Science',
    courseId: 'course-8',
    cohortYear: '2023/2024',
    cohortId: 'cohort-11',
    status: 'enrolled',
    engagementScore: 93,
    searchCount: 68,
    lastActivityAt: '2024-01-15T08:15:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-4',
    fullName: 'Francesca Russo',
    email: 'francesca.russo@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Marketing e Comunicazione',
    courseId: 'course-2',
    cohortYear: '2023/2024',
    cohortId: 'cohort-3',
    status: 'enrolled',
    engagementScore: 45,
    searchCount: 12,
    lastActivityAt: '2024-01-10T14:20:00Z',
    isActive: true,
    profileComplete: false
  },
  {
    id: 'student-5',
    fullName: 'Luca Ferrari',
    email: 'luca.ferrari@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Informatica',
    courseId: 'course-7',
    cohortYear: '2022/2023',
    cohortId: 'cohort-10',
    status: 'graduated',
    engagementScore: 78,
    searchCount: 89,
    lastActivityAt: '2023-12-20T11:00:00Z',
    isActive: false,
    profileComplete: true
  },
  {
    id: 'student-6',
    fullName: 'Sara Conti',
    email: 'sara.conti@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Relazioni Internazionali',
    courseId: 'course-5',
    cohortYear: '2023/2024',
    cohortId: 'cohort-7',
    status: 'enrolled',
    engagementScore: 28,
    searchCount: 5,
    lastActivityAt: '2023-12-05T09:30:00Z',
    isActive: false,
    profileComplete: false
  },
  {
    id: 'student-7',
    fullName: 'Andrea Marino',
    email: 'andrea.marino@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Ingegneria Informatica',
    courseId: 'course-4',
    cohortYear: '2023/2024',
    cohortId: 'cohort-6',
    status: 'enrolled',
    engagementScore: 61,
    searchCount: 25,
    lastActivityAt: '2024-01-13T17:45:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-8',
    fullName: 'Elena Galli',
    email: 'elena.galli@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Economia Aziendale',
    courseId: 'course-1',
    cohortYear: '2022/2023',
    cohortId: 'cohort-2',
    status: 'graduated',
    engagementScore: 88,
    searchCount: 102,
    lastActivityAt: '2024-01-08T10:00:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-9',
    fullName: 'Davide Romano',
    email: 'davide.romano@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Scienze della Comunicazione',
    courseId: 'course-6',
    cohortYear: '2023/2024',
    cohortId: 'cohort-8',
    status: 'on_leave',
    engagementScore: 35,
    searchCount: 8,
    lastActivityAt: '2023-11-15T14:30:00Z',
    isActive: false,
    profileComplete: false
  },
  {
    id: 'student-10',
    fullName: 'Chiara Lombardi',
    email: 'chiara.lombardi@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Data Science',
    courseId: 'course-8',
    cohortYear: '2023/2024',
    cohortId: 'cohort-11',
    status: 'enrolled',
    engagementScore: 76,
    searchCount: 41,
    lastActivityAt: '2024-01-15T12:00:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-11',
    fullName: 'Matteo Ricci',
    email: 'matteo.ricci@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Ingegneria Gestionale',
    courseId: 'course-3',
    cohortYear: '2022/2023',
    cohortId: 'cohort-5',
    status: 'dropped',
    engagementScore: 15,
    searchCount: 3,
    lastActivityAt: '2023-06-20T08:00:00Z',
    isActive: false,
    profileComplete: false
  },
  {
    id: 'student-12',
    fullName: 'Valentina Costa',
    email: 'valentina.costa@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Marketing e Comunicazione',
    courseId: 'course-2',
    cohortYear: '2023/2024',
    cohortId: 'cohort-3',
    status: 'enrolled',
    engagementScore: 67,
    searchCount: 28,
    lastActivityAt: '2024-01-14T09:15:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-13',
    fullName: 'Simone Fontana',
    email: 'simone.fontana@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Informatica',
    courseId: 'course-7',
    cohortYear: '2023/2024',
    cohortId: 'cohort-9',
    status: 'enrolled',
    engagementScore: 54,
    searchCount: 19,
    lastActivityAt: '2024-01-12T15:30:00Z',
    isActive: true,
    profileComplete: true
  },
  {
    id: 'student-14',
    fullName: 'Beatrice Moretti',
    email: 'beatrice.moretti@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Relazioni Internazionali',
    courseId: 'course-5',
    cohortYear: '2023/2024',
    cohortId: 'cohort-7',
    status: 'suspended',
    engagementScore: 22,
    searchCount: 6,
    lastActivityAt: '2023-10-01T11:00:00Z',
    isActive: false,
    profileComplete: false
  },
  {
    id: 'student-15',
    fullName: 'Giorgio Barbieri',
    email: 'giorgio.barbieri@studenti.unibocconi.it',
    avatar: undefined,
    courseName: 'Economia Aziendale',
    courseId: 'course-1',
    cohortYear: '2023/2024',
    cohortId: 'cohort-1',
    status: 'enrolled',
    engagementScore: 91,
    searchCount: 56,
    lastActivityAt: '2024-01-15T14:00:00Z',
    isActive: true,
    profileComplete: true
  }
];

// KPI Stats
const mockStats = {
  totalStudents: 2847,
  activeStudents: 1594,
  inactiveStudents: 1253,
  newThisMonth: 127,
  avgEngagement: 68,
  totalSearches: 15420,
};

// Top students by engagement
const mockTopStudents = [
  { name: 'Alessandro Verdi', course: 'Data Science', score: 93, searches: 68 },
  { name: 'Giorgio Barbieri', course: 'Economia Aziendale', score: 91, searches: 56 },
  { name: 'Elena Galli', course: 'Economia Aziendale', score: 88, searches: 102 },
  { name: 'Marco Rossi', course: 'Economia Aziendale', score: 85, searches: 47 },
  { name: 'Luca Ferrari', course: 'Informatica', score: 78, searches: 89 },
];

// =============================================================================
// PAGE COMPONENT
// =============================================================================

const defaultFilters: StudentFiltersType = {};

export default function StudentsPage() {
  // State
  const [filters, setFilters] = useState<StudentFiltersType>(defaultFilters);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const topStudentColorStyles = generateColorFades('#9D52FF', mockTopStudents.length);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    let result = [...mockStudents];

    // Text search
    if (filters.searchText) {
      const search = filters.searchText.toLowerCase();
      result = result.filter(
        (s) =>
          s.fullName.toLowerCase().includes(search) || s.email.toLowerCase().includes(search)
      );
    }

    // Department filter (via course)
    if (filters.departmentIds?.length) {
      const courseIdsInDept = mockCourses
        .filter((c) => filters.departmentIds?.includes(c.departmentId))
        .map((c) => c.id);
      result = result.filter((s) => courseIdsInDept.includes(s.courseId));
    }

    // Course filter
    if (filters.courseIds?.length) {
      result = result.filter((s) => filters.courseIds?.includes(s.courseId));
    }

    // Cohort filter
    if (filters.cohortIds?.length) {
      result = result.filter((s) => filters.cohortIds?.includes(s.cohortId));
    }

    // Status filter
    if (filters.status?.length) {
      result = result.filter((s) => filters.status?.includes(s.status));
    }

    // Engagement level filter
    if (filters.engagementLevel?.length) {
      result = result.filter((s) => {
        if (filters.engagementLevel?.includes('low') && s.engagementScore <= 30) return true;
        if (
          filters.engagementLevel?.includes('medium') &&
          s.engagementScore > 30 &&
          s.engagementScore <= 60
        )
          return true;
        if (filters.engagementLevel?.includes('high') && s.engagementScore > 60) return true;
        return false;
      });
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'engagement':
          comparison = a.engagementScore - b.engagementScore;
          break;
        case 'searchCount':
          comparison = a.searchCount - b.searchCount;
          break;
        case 'lastActivity':
          comparison = new Date(a.lastActivityAt).getTime() - new Date(b.lastActivityAt).getTime();
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [filters, sortBy, sortDirection]);

  // Paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredStudents.slice(startIndex, startIndex + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  // Handlers
  const handleFiltersChange = (newFilters: StudentFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedStudents.map((s) => s.id));
    }
  };

  const handleRowClick = (student: StudentListItem) => {
    console.log('Navigate to student:', student.id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    setSelectedIds([]);
  };

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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-3xl text-[#212746]">Lista Studenti</h1>
              <p className="font-normal text-base text-[#5A607F]">Gestisci e monitora gli studenti della tua universita</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {selectedIds.length > 0 && (
              <span className="text-sm text-[#5A607F]">
                {selectedIds.length} selezionat{selectedIds.length === 1 ? 'o' : 'i'}
              </span>
            )}
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

          {/* Card 1: Quanti studenti? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti studenti?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                {mockStats.totalStudents.toLocaleString('it-IT')}
              </p>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Studenti totali registrati sulla piattaforma Career Lab
              </p>
            </div>
          </div>

          {/* Card 2: Quanti sono attivi? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti sono attivi?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-1 items-end">
                <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  {mockStats.activeStudents.toLocaleString('it-IT')}
                </p>
                <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 8L13.5 24" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 14L13.5 8L20 14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Studenti con <span className="font-medium">almeno una ricerca</span> negli ultimi 30 giorni
              </p>
            </div>
          </div>

          {/* Card 3: Quanti inattivi? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti inattivi?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                {mockStats.inactiveStudents.toLocaleString('it-IT')}
              </p>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Studenti <span className="font-medium">senza attivita</span> negli ultimi 30 giorni
              </p>
            </div>
          </div>

          {/* Card 4: Nuovi questo mese */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Nuovi questo mese?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-1 items-end">
                <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  +{mockStats.newThisMonth}
                </p>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Studenti registrati a <span className="font-medium">gennaio 2024</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT GRID */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-[2fr_1fr] gap-6">

          {/* ============================================================ */}
          {/* LEFT COLUMN: Students Table */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Filters */}
            <StudentFilters
              filters={filters}
              onChange={handleFiltersChange}
              onReset={handleResetFilters}
              departments={mockDepartments}
              courses={mockCourses}
              cohorts={mockCohorts}
              isLoading={isLoading}
            />

            {/* Results count */}
            <div className="text-sm text-[#5A607F]">
              {filteredStudents.length === mockStudents.length ? (
                <span>Tutti gli studenti ({mockStudents.length})</span>
              ) : (
                <span>
                  {filteredStudents.length} risultat{filteredStudents.length === 1 ? 'o' : 'i'} su{' '}
                  {mockStudents.length} studenti
                </span>
              )}
            </div>

            {/* Content */}
            {filteredStudents.length === 0 ? (
              <EmptyState
                icon="filter"
                title="Nessuno studente trovato"
                description="Non ci sono studenti che corrispondono ai filtri selezionati. Prova a modificare i criteri di ricerca."
                ctaLabel="Reimposta filtri"
                onCtaClick={handleResetFilters}
              />
            ) : (
              <>
                {/* Desktop: Table view */}
                <div className="hidden lg:block">
                  <StudentTable
                    students={paginatedStudents}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    selectedIds={selectedIds}
                    onSelect={handleSelect}
                    onSelectAll={handleSelectAll}
                    onRowClick={handleRowClick}
                    isLoading={isLoading}
                  />
                </div>

                {/* Mobile: Card view */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paginatedStudents.map((student) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      isSelected={selectedIds.includes(student.id)}
                      onSelect={handleSelect}
                      onClick={handleRowClick}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-2">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      pageSize={pageSize}
                      totalItems={filteredStudents.length}
                      onPageChange={handlePageChange}
                      onPageSizeChange={handlePageSizeChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Top Students & Quick Actions */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Top Students Card */}
            <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Chi sono gli studenti piu attivi?
                </h3>
              </div>

              <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
                {mockTopStudents.map((student, index) => {
                  const style = topStudentColorStyles[index];
                  const maxScore = Math.max(...mockTopStudents.map(s => s.score));

                  return (
                    <div
                      key={student.name}
                      className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#9D52FF] transition-all w-full overflow-hidden rounded-lg"
                    >
                      {/* Background bar proportional to score */}
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(student.score / maxScore) * 100}%`,
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
                          {/* Student info */}
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-base text-[#212746]">
                              {student.name}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {student.course}
                            </p>
                          </div>

                          {/* Score */}
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xl text-[#212746]">
                              {student.score}
                            </span>
                            <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                              Score
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-5 pb-5">
                <Link
                  href="/university/students/engagement"
                  className="text-sm text-[#6D7BFC] hover:text-[#5A68E0] font-medium flex items-center gap-1"
                >
                  Vedi tutti gli engagement
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="/university/students/by-course"
                className="flex items-center gap-3 px-5 py-4 bg-[#6D7BFC]/10 rounded-lg border border-[#6D7BFC]/20 hover:border-[#6D7BFC] hover:bg-[#6D7BFC]/15 transition-all"
              >
                <span className="text-[#6D7BFC]">
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
                  <p className="text-xs text-[#5A607F]">Analisi attivita e coinvolgimento</p>
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
