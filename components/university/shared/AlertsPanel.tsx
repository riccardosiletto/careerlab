'use client';

import React, { useState } from 'react';
import { Alert } from '@/types/university';

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
  maxVisible?: number;
  title?: string;
}

const alertTypeConfig = {
  warning: {
    bg: 'bg-[#FFF8E6]',
    border: 'border-[#FEC800]',
    iconBg: 'bg-[#FEC800]',
    iconColor: '#FFFFFF',
  },
  info: {
    bg: 'bg-[#E8F0FF]',
    border: 'border-[#6D7BFC]',
    iconBg: 'bg-[#6D7BFC]',
    iconColor: '#FFFFFF',
  },
  success: {
    bg: 'bg-[#E8F8F0]',
    border: 'border-[#00BE65]',
    iconBg: 'bg-[#00BE65]',
    iconColor: '#FFFFFF',
  },
  error: {
    bg: 'bg-[#FFE8E8]',
    border: 'border-[#FF6B6B]',
    iconBg: 'bg-[#FF6B6B]',
    iconColor: '#FFFFFF',
  },
};

// Alert type icons
function AlertIcon({ type }: { type: Alert['type'] }) {
  switch (type) {
    case 'warning':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill="currentColor" />
          <path d="M7.13 2.5L1.5 12.5C1.37 12.72 1.37 12.97 1.5 13.19C1.63 13.41 1.86 13.5 2.12 13.5H13.88C14.14 13.5 14.37 13.41 14.5 13.19C14.63 12.97 14.63 12.72 14.5 12.5L8.87 2.5C8.74 2.28 8.51 2.19 8.25 2.19C7.99 2.19 7.76 2.28 7.63 2.5H7.13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'info':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="5" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'success':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'error':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 6L6 10M6 6L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

// Priority badge
function PriorityBadge({ priority }: { priority: Alert['priority'] }) {
  const colors = {
    high: 'bg-[#FF6B6B] text-white',
    medium: 'bg-[#FEC800] text-[#212746]',
    low: 'bg-[#E8EAF8] text-[#5A607F]',
  };

  return (
    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${colors[priority]}`}>
      {priority}
    </span>
  );
}

// Close button
function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded hover:bg-black/10 transition-colors"
      aria-label="Chiudi"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#5A607F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// Single alert item
function AlertItem({
  alert,
  onDismiss,
  onAction,
}: {
  alert: Alert;
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
}) {
  const config = alertTypeConfig[alert.type];
  const timeAgo = formatTimeAgo(alert.timestamp);

  return (
    <div
      className={`
        ${config.bg} ${config.border} border-l-4 p-4 transition-all
        ${alert.isRead ? 'opacity-70' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`${config.iconBg} w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0`}
          style={{ color: config.iconColor }}
        >
          <AlertIcon type={alert.type} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm text-[#212746] truncate">{alert.title}</h4>
            <PriorityBadge priority={alert.priority} />
          </div>
          <p className="text-sm text-[#5A607F] mb-2">{alert.description}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8D96AC]">{timeAgo}</span>
            {alert.action && (
              <button
                onClick={() => onAction?.(alert.id)}
                className="text-xs font-semibold text-[#6D7BFC] hover:text-[#5A6AEB] transition-colors"
              >
                {alert.action.label}
              </button>
            )}
          </div>
        </div>

        {/* Dismiss button */}
        {onDismiss && <CloseButton onClick={() => onDismiss(alert.id)} />}
      </div>
    </div>
  );
}

// Helper to format timestamp
function formatTimeAgo(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Adesso';
    if (diffMins < 60) return `${diffMins} min fa`;
    if (diffHours < 24) return `${diffHours} ore fa`;
    if (diffDays < 7) return `${diffDays} giorni fa`;
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
  } catch {
    return timestamp;
  }
}

export default function AlertsPanel({
  alerts,
  onDismiss,
  onAction,
  maxVisible = 5,
  title = 'Notifiche',
}: AlertsPanelProps) {
  const [showAll, setShowAll] = useState(false);

  // Filter out dismissed alerts and sort by priority/timestamp
  const visibleAlerts = alerts
    .filter((a) => !a.isDismissed)
    .sort((a, b) => {
      // Priority order: high > medium > low
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      // Then by timestamp (newest first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const displayAlerts = showAll ? visibleAlerts : visibleAlerts.slice(0, maxVisible);
  const hasMore = visibleAlerts.length > maxVisible;
  const unreadCount = visibleAlerts.filter((a) => !a.isRead).length;

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-[19px] text-white">{title}</h3>
          {unreadCount > 0 && (
            <span className="bg-[#FF6B6B] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Alerts list */}
      <div className="flex-1 overflow-auto">
        {displayAlerts.length > 0 ? (
          <div className="flex flex-col gap-2 p-4">
            {displayAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onDismiss={onDismiss}
                onAction={onAction}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-12 h-12 rounded-full bg-[#E8F8F0] flex items-center justify-center mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#00BE65"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="9" stroke="#00BE65" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-sm text-[#5A607F] text-center">Nessuna notifica</p>
            <p className="text-xs text-[#8D96AC] text-center mt-1">
              Sei al passo con tutto!
            </p>
          </div>
        )}
      </div>

      {/* Footer with "Show all" button */}
      {hasMore && (
        <div className="border-t border-[#E8EAF8] px-5 py-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-[#6D7BFC] hover:text-[#5A6AEB] transition-colors font-medium flex items-center gap-1 w-full justify-center"
          >
            {showAll ? 'Mostra meno' : `Mostra tutte (${visibleAlerts.length})`}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
