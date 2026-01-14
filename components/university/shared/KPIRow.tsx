'use client';

import React from 'react';
import KPICard, { KPICardSkeleton } from './KPICard';
import { KPICardData } from '@/types/university';

interface KPIRowProps {
  kpis: KPICardData[];
  isLoading?: boolean;
}

// Map icon strings to React nodes (using simple SVG icons)
const iconMap: Record<string, React.ReactNode> = {
  users: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 15.5V14.5C14 13.4391 13.5786 12.4217 12.8284 11.6716C12.0783 10.9214 11.0609 10.5 10 10.5H5C3.93913 10.5 2.92172 10.9214 2.17157 11.6716C1.42143 12.4217 1 13.4391 1 14.5V15.5" stroke="#6D7BFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 7.5C9.433 7.5 11 5.933 11 4C11 2.067 9.433 0.5 7.5 0.5C5.567 0.5 4 2.067 4 4C4 5.933 5.567 7.5 7.5 7.5Z" stroke="#6D7BFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 15.5V14.5C18.9993 13.6137 18.7044 12.7528 18.1614 12.0523C17.6184 11.3519 16.8581 10.8516 16 10.63" stroke="#6D7BFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 0.63C13.8604 0.850297 14.623 1.35087 15.1676 2.05244C15.7122 2.75401 16.0078 3.61707 16.0078 4.505C16.0078 5.39293 15.7122 6.25599 15.1676 6.95756C14.623 7.65913 13.8604 8.1597 13 8.38" stroke="#6D7BFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z" stroke="#00BE65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 18L14 14" stroke="#00BE65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  building: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 18H19" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 18V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H11C11.5304 2 12.0391 2.21071 12.4142 2.58579C12.7893 2.96086 13 3.46957 13 4V18" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 8H15C15.5304 8 16.0391 8.21071 16.4142 8.58579C16.7893 8.96086 17 9.46957 17 10V18" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6H10" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 10H10" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 14H10" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 18H2V2" stroke="#FEC800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 6L12.5 11.5L8 7L2 13" stroke="#FEC800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// Helper to get icon from iconMap or return provided icon
function getIcon(icon: string | undefined, color: string): React.ReactNode | undefined {
  if (!icon) return undefined;
  return iconMap[icon] || undefined;
}

export default function KPIRow({ kpis, isLoading = false }: KPIRowProps) {
  // Default loading skeletons (4 items)
  if (isLoading) {
    const colors: Array<'blue' | 'green' | 'purple' | 'yellow'> = ['blue', 'green', 'purple', 'yellow'];
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <KPICardSkeleton key={index} color={color} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <KPICard
          key={kpi.id}
          title={kpi.title}
          value={kpi.value}
          trend={kpi.trend}
          icon={getIcon(kpi.icon, kpi.color || 'blue')}
          color={kpi.color === 'red' ? 'purple' : kpi.color}
          subtitle={kpi.subtitle}
        />
      ))}
    </div>
  );
}
