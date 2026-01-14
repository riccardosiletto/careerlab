'use client';

import { StudentListItem, StudentStatus } from '@/types/university';
import EngagementBadge from './EngagementBadge';

interface StudentTableProps {
  students: StudentListItem[];
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onRowClick: (student: StudentListItem) => void;
  isLoading?: boolean;
}

export default function StudentTable({
  students,
  sortBy,
  sortDirection,
  onSort,
  selectedIds,
  onSelect,
  onSelectAll,
  onRowClick,
  isLoading = false
}: StudentTableProps) {
  const allSelected = students.length > 0 && selectedIds.length === students.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < students.length;

  const getStatusLabel = (status: StudentStatus): { label: string; color: string } => {
    const statusMap: Record<StudentStatus, { label: string; color: string }> = {
      enrolled: { label: 'Iscritto', color: 'bg-green-100 text-green-700' },
      graduated: { label: 'Laureato', color: 'bg-blue-100 text-blue-700' },
      dropped: { label: 'Ritirato', color: 'bg-red-100 text-red-700' },
      suspended: { label: 'Sospeso', color: 'bg-orange-100 text-orange-700' },
      on_leave: { label: 'In pausa', color: 'bg-yellow-100 text-yellow-700' }
    };
    return statusMap[status];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Oggi';
    if (diffDays === 1) return 'Ieri';
    if (diffDays < 7) return `${diffDays} giorni fa`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} settimane fa`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} mesi fa`;
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 text-[#A0A7C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return (
      <svg
        className={`w-4 h-4 text-[#6D7BFC] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  };

  // Skeleton row for loading state
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-4">
        <div className="w-5 h-5 bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-8 bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-lg border border-[#E8EAF8] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F7FA] border-b border-[#E8EAF8]">
              {/* Checkbox column */}
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={onSelectAll}
                  disabled={isLoading}
                  className="w-5 h-5 rounded border-[#E8EAF8] text-[#6D7BFC] focus:ring-[#6D7BFC]/20 cursor-pointer disabled:cursor-not-allowed"
                />
              </th>

              {/* Name column */}
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center gap-2 text-xs font-semibold text-[#5A607F] uppercase tracking-wider hover:text-[#212746]"
                >
                  Nome
                  <SortIcon column="name" />
                </button>
              </th>

              {/* Course column */}
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                  Corso
                </span>
              </th>

              {/* Cohort column */}
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                  Coorte
                </span>
              </th>

              {/* Engagement column */}
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('engagement')}
                  className="flex items-center gap-2 text-xs font-semibold text-[#5A607F] uppercase tracking-wider hover:text-[#212746]"
                >
                  Engagement
                  <SortIcon column="engagement" />
                </button>
              </th>

              {/* Searches column */}
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('searchCount')}
                  className="flex items-center gap-2 text-xs font-semibold text-[#5A607F] uppercase tracking-wider hover:text-[#212746]"
                >
                  Ricerche
                  <SortIcon column="searchCount" />
                </button>
              </th>

              {/* Last activity column */}
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('lastActivity')}
                  className="flex items-center gap-2 text-xs font-semibold text-[#5A607F] uppercase tracking-wider hover:text-[#212746]"
                >
                  Ultima attivita
                  <SortIcon column="lastActivity" />
                </button>
              </th>

              {/* Status column */}
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                  Status
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8EAF8]">
            {isLoading ? (
              // Skeleton loading
              Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
            ) : (
              students.map((student) => {
                const isSelected = selectedIds.includes(student.id);
                const statusInfo = getStatusLabel(student.status);

                return (
                  <tr
                    key={student.id}
                    onClick={() => onRowClick(student)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#E8F0FF]' : 'hover:bg-[#F5F7FA]'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(student.id)}
                        className="w-5 h-5 rounded border-[#E8EAF8] text-[#6D7BFC] focus:ring-[#6D7BFC]/20 cursor-pointer"
                      />
                    </td>

                    {/* Name with avatar */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={student.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#6D7BFC] flex items-center justify-center text-white font-medium text-sm">
                            {student.fullName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-[#212746]">{student.fullName}</p>
                          <p className="text-sm text-[#5A607F]">{student.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-[#212746]">{student.courseName}</span>
                    </td>

                    {/* Cohort */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-[#5A607F]">{student.cohortYear}</span>
                    </td>

                    {/* Engagement */}
                    <td className="px-4 py-4">
                      <EngagementBadge score={student.engagementScore} size="sm" />
                    </td>

                    {/* Searches */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-[#212746]">{student.searchCount}</span>
                    </td>

                    {/* Last activity */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-[#5A607F]">{formatDate(student.lastActivityAt)}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
