'use client';

import { StudentListItem, StudentStatus } from '@/types/university';
import EngagementBadge from './EngagementBadge';

interface StudentCardProps {
  student: StudentListItem;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onClick?: (student: StudentListItem) => void;
}

export default function StudentCard({
  student,
  isSelected = false,
  onSelect,
  onClick
}: StudentCardProps) {
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

  const statusInfo = getStatusLabel(student.status);

  return (
    <div
      onClick={() => onClick?.(student)}
      className={`p-4 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? 'border-[#6D7BFC] bg-[#E8F0FF]'
          : 'border-[#E8EAF8] bg-white hover:border-[#6D7BFC]/30 hover:shadow-sm'
      }`}
    >
      {/* Header: Avatar + Name + Checkbox */}
      <div className="flex items-start gap-3 mb-4">
        {/* Checkbox */}
        {onSelect && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(student.id);
            }}
            className="pt-1"
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(student.id)}
              className="w-5 h-5 rounded border-[#E8EAF8] text-[#6D7BFC] focus:ring-[#6D7BFC]/20 cursor-pointer"
            />
          </div>
        )}

        {/* Avatar */}
        {student.avatar ? (
          <img
            src={student.avatar}
            alt={student.fullName}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#6D7BFC] flex items-center justify-center text-white font-medium text-base flex-shrink-0">
            {student.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
        )}

        {/* Name & Email */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#212746] truncate">{student.fullName}</p>
          <p className="text-sm text-[#5A607F] truncate">{student.email}</p>
        </div>

        {/* Status badge */}
        <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Course & Cohort */}
      <div className="flex items-center gap-2 mb-3 text-sm">
        <svg className="w-4 h-4 text-[#A0A7C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span className="text-[#212746] truncate">{student.courseName}</span>
        <span className="text-[#A0A7C4]">-</span>
        <span className="text-[#5A607F]">{student.cohortYear}</span>
      </div>

      {/* Engagement gauge (prominent) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-[#5A607F] uppercase tracking-wider">Engagement</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Large gauge bar */}
          <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                student.engagementScore <= 30
                  ? 'bg-red-500'
                  : student.engagementScore <= 60
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${student.engagementScore}%` }}
            />
          </div>
          <span
            className={`text-sm font-semibold ${
              student.engagementScore <= 30
                ? 'text-red-700'
                : student.engagementScore <= 60
                ? 'text-yellow-700'
                : 'text-green-700'
            }`}
          >
            {student.engagementScore}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between pt-3 border-t border-[#E8EAF8]">
        {/* Searches */}
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#A0A7C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-sm text-[#5A607F]">
            <span className="font-medium text-[#212746]">{student.searchCount}</span> ricerche
          </span>
        </div>

        {/* Last activity */}
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#A0A7C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-[#5A607F]">{formatDate(student.lastActivityAt)}</span>
        </div>

        {/* Action button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(student);
          }}
          className="p-1.5 rounded-lg hover:bg-[#F5F7FA] transition-colors"
          aria-label="Vedi dettagli"
        >
          <svg className="w-5 h-5 text-[#5A607F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
