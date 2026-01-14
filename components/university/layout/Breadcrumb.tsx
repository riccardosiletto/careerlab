'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Breadcrumb item type
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Props for Breadcrumb component
 */
interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

/**
 * Route label mapping for automatic breadcrumb generation
 */
const routeLabels: Record<string, string> = {
  university: 'Dashboard',
  studenti: 'Studenti',
  analytics: 'Analytics',
  ricerche: 'Ricerche',
  carriere: 'Carriere',
  benchmarking: 'Benchmarking',
  settings: 'Impostazioni',
  trend: 'Trend',
  aziende: 'Aziende',
  ruoli: 'Ruoli',
  heatmap: 'Heatmap',
  placement: 'Placement',
  destinazioni: 'Destinazioni',
  salari: 'Salari',
  flow: 'Career Flow',
  alerts: 'Alert',
  help: 'Aiuto',
};

/**
 * Breadcrumb - Navigation breadcrumb component for university dashboard
 *
 * Features:
 * - Auto-generates breadcrumbs from current route if items not provided
 * - Supports custom items override
 * - Last item is not clickable (current page)
 * - Chevron separator between items
 */
export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || generateBreadcrumbs(pathname);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm ${className}`}
    >
      {/* Home icon */}
      <Link
        href="/university"
        className="text-[#8D96AC] hover:text-[#6D7BFC] transition-colors"
        aria-label="Home"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>

      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <div key={index} className="flex items-center">
            {/* Separator */}
            <svg
              className="w-4 h-4 mx-2 text-[#8D96AC]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            {/* Breadcrumb item */}
            {isLast || !item.href ? (
              <span className="text-[#212746] font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-[#8D96AC] hover:text-[#6D7BFC] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Generate breadcrumb items from pathname
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Remove leading slash and split
  const segments = pathname.replace(/^\//, '').split('/').filter(Boolean);

  // Skip if just 'university' (home)
  if (segments.length <= 1) {
    return [];
  }

  // Skip the first segment (university) since we use home icon
  const relevantSegments = segments.slice(1);

  return relevantSegments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 2).join('/');
    const isLast = index === relevantSegments.length - 1;

    // Check if segment is a dynamic route (e.g., [id])
    const isDynamic = segment.startsWith('[') || /^[a-f0-9-]{36}$/.test(segment);

    return {
      label: isDynamic ? 'Dettaglio' : (routeLabels[segment] || capitalizeFirst(segment)),
      href: isLast ? undefined : href,
    };
  });
}

/**
 * Capitalize first letter of string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
