'use client';

import { useState, useEffect } from 'react';
import { StudentFilters as StudentFiltersType } from '@/types/university';

interface StudentFiltersProps {
  filters: StudentFiltersType;
  onChange: (filters: StudentFiltersType) => void;
  onReset: () => void;
  departments: { id: string; name: string }[];
  courses: { id: string; name: string; departmentId: string }[];
  cohorts: { id: string; year: string; courseId: string }[];
  isLoading?: boolean;
}

export default function StudentFilters({
  filters,
  onChange,
  onReset,
  departments,
  courses,
  cohorts,
  isLoading = false
}: StudentFiltersProps) {
  const [searchText, setSearchText] = useState(filters.searchText || '');

  // Count active filters (excluding searchText)
  const activeFiltersCount = [
    filters.departmentIds?.length,
    filters.courseIds?.length,
    filters.cohortIds?.length,
    filters.status?.length,
    filters.engagementLevel?.length,
    filters.activityPeriod && filters.activityPeriod !== 'all' ? 1 : 0
  ].filter(Boolean).reduce((acc: number, val) => acc + (typeof val === 'number' ? val : 1), 0);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText !== filters.searchText) {
        onChange({ ...filters, searchText: searchText || undefined });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, filters, onChange]);

  // Filter courses based on selected departments
  const availableCourses = filters.departmentIds?.length
    ? courses.filter((c) => filters.departmentIds?.includes(c.departmentId))
    : courses;

  // Filter cohorts based on selected courses
  const availableCohorts = filters.courseIds?.length
    ? cohorts.filter((c) => filters.courseIds?.includes(c.courseId))
    : cohorts;

  const handleDepartmentChange = (departmentId: string) => {
    const current = filters.departmentIds || [];
    const newDepartments = current.includes(departmentId)
      ? current.filter((id) => id !== departmentId)
      : [...current, departmentId];

    // Clear courses and cohorts if their parent department is removed
    const newCourseIds = filters.courseIds?.filter((courseId) => {
      const course = courses.find((c) => c.id === courseId);
      return course && newDepartments.includes(course.departmentId);
    });

    const newCohortIds = filters.cohortIds?.filter((cohortId) => {
      const cohort = cohorts.find((c) => c.id === cohortId);
      return cohort && newCourseIds?.includes(cohort.courseId);
    });

    onChange({
      ...filters,
      departmentIds: newDepartments.length > 0 ? newDepartments : undefined,
      courseIds: newCourseIds?.length ? newCourseIds : undefined,
      cohortIds: newCohortIds?.length ? newCohortIds : undefined
    });
  };

  const handleCourseChange = (courseId: string) => {
    const current = filters.courseIds || [];
    const newCourses = current.includes(courseId)
      ? current.filter((id) => id !== courseId)
      : [...current, courseId];

    // Clear cohorts if their parent course is removed
    const newCohortIds = filters.cohortIds?.filter((cohortId) => {
      const cohort = cohorts.find((c) => c.id === cohortId);
      return cohort && newCourses.includes(cohort.courseId);
    });

    onChange({
      ...filters,
      courseIds: newCourses.length > 0 ? newCourses : undefined,
      cohortIds: newCohortIds?.length ? newCohortIds : undefined
    });
  };

  const handleCohortChange = (cohortId: string) => {
    const current = filters.cohortIds || [];
    const newCohorts = current.includes(cohortId)
      ? current.filter((id) => id !== cohortId)
      : [...current, cohortId];

    onChange({
      ...filters,
      cohortIds: newCohorts.length > 0 ? newCohorts : undefined
    });
  };

  const handleStatusChange = (status: string) => {
    const current = filters.status || [];
    const newStatus = current.includes(status as any)
      ? current.filter((s) => s !== status)
      : [...current, status as any];

    onChange({
      ...filters,
      status: newStatus.length > 0 ? newStatus : undefined
    });
  };

  const handleEngagementChange = (level: 'low' | 'medium' | 'high') => {
    const current = filters.engagementLevel || [];
    const newLevels = current.includes(level)
      ? current.filter((l) => l !== level)
      : [...current, level];

    onChange({
      ...filters,
      engagementLevel: newLevels.length > 0 ? newLevels : undefined
    });
  };

  return (
    <div className="bg-white rounded-lg border border-[#E8EAF8] p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A7C4]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Cerca per nome o email..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 border border-[#E8EAF8] rounded-lg text-sm text-[#212746] placeholder:text-[#A0A7C4] focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC] disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Department select */}
        <div className="w-full lg:w-48">
          <select
            multiple
            value={filters.departmentIds || []}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
              onChange({
                ...filters,
                departmentIds: selected.length > 0 ? selected : undefined
              });
            }}
            disabled={isLoading}
            className="hidden"
          />
          <div className="relative">
            <select
              value={filters.departmentIds?.[0] || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleDepartmentChange(e.target.value);
                }
              }}
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-[#E8EAF8] rounded-lg text-sm text-[#212746] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC] appearance-none cursor-pointer disabled:bg-gray-50"
            >
              <option value="">Dipartimento</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A7C4] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Course select (cascading) */}
        <div className="w-full lg:w-48">
          <div className="relative">
            <select
              value={filters.courseIds?.[0] || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleCourseChange(e.target.value);
                }
              }}
              disabled={isLoading || availableCourses.length === 0}
              className="w-full px-3 py-2.5 border border-[#E8EAF8] rounded-lg text-sm text-[#212746] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC] appearance-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">Corso</option>
              {availableCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A7C4] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Cohort select (cascading) */}
        <div className="w-full lg:w-40">
          <div className="relative">
            <select
              value={filters.cohortIds?.[0] || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleCohortChange(e.target.value);
                }
              }}
              disabled={isLoading || availableCohorts.length === 0}
              className="w-full px-3 py-2.5 border border-[#E8EAF8] rounded-lg text-sm text-[#212746] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC] appearance-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">Coorte</option>
              {availableCohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.year}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A7C4] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Status select */}
        <div className="w-full lg:w-36">
          <div className="relative">
            <select
              value={filters.status?.[0] || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleStatusChange(e.target.value);
                }
              }}
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-[#E8EAF8] rounded-lg text-sm text-[#212746] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC] appearance-none cursor-pointer disabled:bg-gray-50"
            >
              <option value="">Status</option>
              <option value="enrolled">Iscritto</option>
              <option value="graduated">Laureato</option>
              <option value="dropped">Ritirato</option>
              <option value="suspended">Sospeso</option>
              <option value="on_leave">In pausa</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A7C4] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Engagement select */}
        <div className="w-full lg:w-40">
          <div className="relative">
            <select
              value={filters.engagementLevel?.[0] || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleEngagementChange(e.target.value as 'low' | 'medium' | 'high');
                }
              }}
              disabled={isLoading}
              className="w-full px-3 py-2.5 border border-[#E8EAF8] rounded-lg text-sm text-[#212746] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC] appearance-none cursor-pointer disabled:bg-gray-50"
            >
              <option value="">Engagement</option>
              <option value="high">Alto (61-100)</option>
              <option value="medium">Medio (31-60)</option>
              <option value="low">Basso (0-30)</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A7C4] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Reset button with badge */}
        <div className="flex items-center">
          <button
            onClick={onReset}
            disabled={isLoading || activeFiltersCount === 0}
            className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#5A607F] hover:text-[#212746] hover:bg-[#F5F7FA] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#6D7BFC] text-white text-xs font-medium rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
