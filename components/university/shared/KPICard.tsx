'use client';

import React from 'react';

interface KPICardProps {
  title: string;
  value: number | string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
    period: string;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'yellow';
  subtitle?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const colorConfig = {
  blue: {
    border: '#6D7BFC',
    bg: 'rgba(109, 123, 252, 0.08)',
    iconBg: 'rgba(109, 123, 252, 0.15)',
  },
  green: {
    border: '#00BE65',
    bg: 'rgba(0, 190, 101, 0.08)',
    iconBg: 'rgba(0, 190, 101, 0.15)',
  },
  purple: {
    border: '#9B59B6',
    bg: 'rgba(155, 89, 182, 0.08)',
    iconBg: 'rgba(155, 89, 182, 0.15)',
  },
  yellow: {
    border: '#FEC800',
    bg: 'rgba(254, 200, 0, 0.08)',
    iconBg: 'rgba(254, 200, 0, 0.15)',
  },
};

const trendColors = {
  up: '#00BE65',
  down: '#FF6B6B',
  stable: '#8D96AC',
};

// Skeleton component for loading state
function KPICardSkeleton({ color = 'blue' }: { color?: KPICardProps['color'] }) {
  const config = colorConfig[color || 'blue'];

  return (
    <div
      className="bg-white border-l-4 p-5 flex flex-col gap-3 animate-pulse"
      style={{ borderLeftColor: config.border }}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
      </div>
      <div className="h-8 bg-gray-200 rounded w-20" />
      <div className="h-3 bg-gray-200 rounded w-32" />
    </div>
  );
}

// Trend arrow icons
function TrendArrow({ direction }: { direction: 'up' | 'down' | 'stable' }) {
  if (direction === 'up') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L10 6L8.6 6L8.6 10L3.4 10L3.4 6L2 6L6 2Z" fill={trendColors.up} />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10L2 6L3.4 6L3.4 2L8.6 2L8.6 6L10 6L6 10Z" fill={trendColors.down} />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6H10" stroke={trendColors.stable} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function KPICard({
  title,
  value,
  trend,
  icon,
  color = 'blue',
  subtitle,
  onClick,
  isLoading = false,
}: KPICardProps) {
  const config = colorConfig[color];

  if (isLoading) {
    return <KPICardSkeleton color={color} />;
  }

  const isClickable = !!onClick;
  const Component = isClickable ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        bg-white border-l-4 p-5 flex flex-col gap-2 text-left transition-all duration-200
        ${isClickable ? 'cursor-pointer hover:shadow-md hover:bg-opacity-50' : ''}
      `}
      style={{
        borderLeftColor: config.border,
        ...(isClickable && { backgroundColor: config.bg }),
      }}
    >
      {/* Header with title and icon */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-[#5A607F]">{title}</span>
        {icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: config.iconBg }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Main value */}
      <div className="flex items-baseline gap-2">
        <span className="font-bold text-3xl text-[#212746]">
          {typeof value === 'number' ? value.toLocaleString('it-IT') : value}
        </span>
      </div>

      {/* Trend and subtitle */}
      <div className="flex items-center gap-3">
        {trend && (
          <div className="flex items-center gap-1.5">
            <TrendArrow direction={trend.direction} />
            <span
              className="font-semibold text-sm"
              style={{ color: trendColors[trend.direction] }}
            >
              {trend.direction === 'stable' ? '0%' : `${trend.value > 0 ? '+' : ''}${trend.value}%`}
            </span>
            <span className="text-xs text-[#8D96AC]">{trend.period}</span>
          </div>
        )}
        {subtitle && !trend && (
          <span className="text-xs text-[#8D96AC]">{subtitle}</span>
        )}
      </div>

      {/* Show subtitle below trend if both exist */}
      {subtitle && trend && (
        <span className="text-xs text-[#8D96AC] -mt-1">{subtitle}</span>
      )}
    </Component>
  );
}

export { KPICardSkeleton };
