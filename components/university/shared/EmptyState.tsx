'use client';

interface EmptyStateProps {
  icon?: 'search' | 'users' | 'filter' | 'data' | 'error';
  title: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export default function EmptyState({
  icon = 'data',
  title,
  description,
  ctaLabel,
  onCtaClick
}: EmptyStateProps) {
  const renderIcon = () => {
    const iconClasses = 'w-16 h-16 text-[#A0A7C4]';

    switch (icon) {
      case 'search':
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'filter':
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        );
      case 'error':
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'data':
      default:
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-4 p-4 bg-[#F5F7FA] rounded-full">
        {renderIcon()}
      </div>

      <h3 className="text-lg font-medium text-[#212746] text-center mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-[#5A607F] text-center max-w-md mb-6">
          {description}
        </p>
      )}

      {ctaLabel && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="inline-flex items-center px-4 py-2 bg-[#6D7BFC] text-white text-sm font-medium rounded-lg hover:bg-[#5A68E0] transition-colors"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
