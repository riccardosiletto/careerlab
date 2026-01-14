'use client';

import React from 'react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary' | 'outline';
  onClick: () => void;
  disabled?: boolean;
}

interface QuickActionsBarProps {
  actions: QuickAction[];
}

const variantStyles = {
  primary: {
    base: 'bg-[#6D7BFC] text-white border-[#6D7BFC]',
    hover: 'hover:bg-[#5A6AEB] hover:border-[#5A6AEB]',
    disabled: 'bg-[#B8BDDC] border-[#B8BDDC] cursor-not-allowed',
  },
  secondary: {
    base: 'bg-[#212746] text-white border-[#212746]',
    hover: 'hover:bg-[#2D3561] hover:border-[#2D3561]',
    disabled: 'bg-[#8D96AC] border-[#8D96AC] cursor-not-allowed',
  },
  outline: {
    base: 'bg-white text-[#212746] border-[#E8EAF8]',
    hover: 'hover:bg-[#F5F6FF] hover:border-[#6D7BFC] hover:text-[#6D7BFC]',
    disabled: 'bg-[#F5F6FF] text-[#8D96AC] border-[#E8EAF8] cursor-not-allowed',
  },
};

function ActionButton({ action }: { action: QuickAction }) {
  const styles = variantStyles[action.variant];
  const isDisabled = action.disabled;

  return (
    <button
      onClick={isDisabled ? undefined : action.onClick}
      disabled={isDisabled}
      className={`
        flex items-center gap-2 px-4 py-2.5 border rounded-lg font-medium text-sm
        transition-all duration-200
        ${isDisabled ? styles.disabled : `${styles.base} ${styles.hover}`}
      `}
    >
      <span className="flex-shrink-0">{action.icon}</span>
      <span>{action.label}</span>
    </button>
  );
}

export default function QuickActionsBar({ actions }: QuickActionsBarProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {actions.map((action) => (
        <ActionButton key={action.id} action={action} />
      ))}
    </div>
  );
}

// Common action icons for convenience
export const ActionIcons = {
  download: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2V12M9 12L5 8M9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  export: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 7L2 7L2 16L16 16L16 7L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12V2M9 2L5 6M9 2L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  filter: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3H16L11 9.5V14L7 16V9.5L2 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  refresh: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 9C15 12.3137 12.3137 15 9 15C5.68629 15 3 12.3137 3 9C3 5.68629 5.68629 3 9 3C11.2091 3 13.1305 4.2066 14.1567 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 2V6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  add: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3V15M3 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  share: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8L12 5M6 10L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 5L9 10L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  print: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5V2H13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H2V7C2 6.44772 2.44772 6 3 6H15C15.5523 6 16 6.44772 16 7V12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="5" y="10" width="8" height="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 1V3M9 15V17M1 9H3M15 9H17M3.22 3.22L4.64 4.64M13.36 13.36L14.78 14.78M3.22 14.78L4.64 13.36M13.36 4.64L14.78 3.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="8" width="3" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7.5" y="4" width="3" height="10" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="6" width="3" height="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};
