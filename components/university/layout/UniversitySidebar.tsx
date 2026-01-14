'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * Props for UniversitySidebar component
 */
interface UniversitySidebarProps {
  studentCount?: number;
  searchCount?: number;
}

/**
 * UniversitySidebar - Fixed sidebar navigation for university dashboard
 *
 * Uses Radix UI Accordion component for expandable sections.
 * Features:
 * - Accordion-based navigation with multiple expandable sections
 * - Different hover colors per section
 * - Badge counts for students
 * - Active state highlighting
 * - Mobile responsive (collapsible)
 */
export default function UniversitySidebar({
  studentCount = 2847,
  searchCount = 15400,
}: UniversitySidebarProps) {
  const pathname = usePathname();
  const [accordionValue, setAccordionValue] = useState<string[]>(['overview', 'studenti', 'analytics-ricerche', 'analytics-carriere', 'benchmarking']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/university') {
      return pathname === '/university';
    }
    return pathname === href;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 p-3 bg-[#6D7BFC] text-white rounded-full shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-[286px] bg-[#212746] border-r border-[#3A4066]
          fixed top-[72px] left-0 bottom-0 z-40
          flex flex-col py-6
          overflow-y-auto
          transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <Accordion
          type="multiple"
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="w-full flex-1"
        >
          {/* Overview Section */}
          <AccordionItem value="overview" className="border-b border-[#3A4066]">
            <AccordionTrigger className="text-white hover:text-[#9FA9FF]">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>OVERVIEW</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0 pl-7">
                <Link
                  href="/university"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university') ? 'text-[#9FA9FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/university/alerts"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/alerts') ? 'text-[#9FA9FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Alert & Notifiche
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Studenti Section */}
          <AccordionItem value="studenti" className="border-b border-[#3A4066]">
            <AccordionTrigger className="text-white hover:text-[#EBFF8C]">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>STUDENTI</span>
                {studentCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-[#EBFF8C]/20 text-[#EBFF8C]">
                    {studentCount > 9999 ? '9999+' : studentCount.toLocaleString()}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0 pl-7">
                <Link
                  href="/university/students"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/students') ? 'text-[#EBFF8C] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Lista Studenti
                </Link>
                <Link
                  href="/university/students/by-course"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/students/by-course') ? 'text-[#EBFF8C] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Per Corso
                </Link>
                <Link
                  href="/university/students/engagement"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/students/engagement') ? 'text-[#EBFF8C] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Engagement
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Analytics Ricerche Section */}
          <AccordionItem value="analytics-ricerche" className="border-b border-[#3A4066]">
            <AccordionTrigger className="text-white hover:text-[#FF8A8A]">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>ANALYTICS RICERCHE</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0 pl-7">
                <Link
                  href="/university/analytics/searches/trend"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/searches/trend') ? 'text-[#FF8A8A] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Trend Ricerche
                </Link>
                <Link
                  href="/university/analytics/searches/companies"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/searches/companies') ? 'text-[#FF8A8A] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Top Aziende
                </Link>
                <Link
                  href="/university/analytics/searches/roles"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/searches/roles') ? 'text-[#FF8A8A] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Top Ruoli
                </Link>
                <Link
                  href="/university/analytics/searches/countries"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/searches/countries') ? 'text-[#FF8A8A] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Per Paese
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Analytics Carriere Section */}
          <AccordionItem value="analytics-carriere" className="border-b border-[#3A4066]">
            <AccordionTrigger className="text-white hover:text-[#C299FF]">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>ANALYTICS CARRIERE</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0 pl-7">
                <Link
                  href="/university/analytics/careers/placement"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/careers/placement') ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Placement Rate
                </Link>
                <Link
                  href="/university/analytics/careers/destinations"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/careers/destinations') ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Destinazioni
                </Link>
                <Link
                  href="/university/analytics/careers/salaries"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/careers/salaries') ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Distribuzione Salari
                </Link>
                <Link
                  href="/university/analytics/careers/flow"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/analytics/careers/flow') ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Career Flow
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Benchmarking Section */}
          <AccordionItem value="benchmarking" className="border-b border-[#3A4066]">
            <AccordionTrigger className="text-white hover:text-[#FFB800]">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="20" x2="18" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="20" x2="12" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="6" y1="20" x2="6" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>BENCHMARKING</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0 pl-7">
                <Link
                  href="/university/benchmarking"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/benchmarking') ? 'text-[#FFB800] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Panoramica
                </Link>
                <Link
                  href="/university/benchmarking/compare"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/benchmarking/compare') ? 'text-[#FFB800] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Confronto Atenei
                </Link>
                <Link
                  href="/university/benchmarking/rankings"
                  className={`text-left text-sm py-1 px-3 rounded hover:bg-[#2F354E] transition-colors ${
                    isActive('/university/benchmarking/rankings') ? 'text-[#FFB800] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
                >
                  Classifiche
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Footer Stats Box */}
        <div className="mt-auto pt-4 border-t border-[#3A4066] px-4">
          <div className="bg-[#2F354E] rounded-lg p-3 mb-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-[#9FA9FF] font-semibold">{studentCount.toLocaleString()}</span>
              <span className="text-[#ADB3C7]">studenti</span>
              <span className="text-[#5A6180]">|</span>
              <span className="text-[#FF8A8A] font-semibold">{formatNumber(searchCount)}</span>
              <span className="text-[#ADB3C7]">ricerche</span>
            </div>
          </div>
          <p className="text-xs text-[#5A6180] text-center">
            Career Lab University v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
