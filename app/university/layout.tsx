'use client';

import { useState, useEffect } from 'react';
import UniversityHeader from '@/components/university/layout/UniversityHeader';
import UniversitySidebar from '@/components/university/layout/UniversitySidebar';
import type { University, UniversityUser } from '@/types/university';

/**
 * Mock university data for development
 * TODO: Replace with API call
 */
const mockUniversity: University = {
  id: 'uni-001',
  name: 'Universita degli Studi di Milano',
  shortName: 'UniMi',
  logo: '',
  type: 'traditional',
  location: {
    country: 'Italia',
    region: 'Lombardia',
    city: 'Milano',
  },
  accreditation: ['ANVUR', 'EQUIS'],
  tier: 'tier1',
  website: 'https://www.unimi.it',
  foundedYear: 1924,
  settings: {
    privacyLevel: 'standard',
    benchmarkOptIn: true,
    dataRetentionYears: 5,
    allowedExportFormats: ['csv', 'xlsx', 'pdf'],
  },
  subscription: {
    plan: 'professional',
    status: 'active',
    expiresAt: '2025-12-31',
    features: ['analytics', 'benchmarking', 'export', 'api'],
  },
  createdAt: '2024-01-01',
  updatedAt: '2024-12-01',
};

/**
 * Mock user data for development
 * TODO: Replace with auth context
 */
const mockUser: UniversityUser = {
  id: 'user-001',
  universityId: 'uni-001',
  email: 'admin@unimi.it',
  firstName: 'Marco',
  lastName: 'Rossi',
  avatar: '',
  role: 'admin',
  permissions: {
    canViewAllStudents: true,
    canViewIndividualStudent: true,
    canViewSearchAnalytics: true,
    canViewCareerAnalytics: true,
    canViewBenchmark: true,
    canExportData: true,
    canExportPII: false,
    canManageUsers: true,
    canManageSettings: true,
    canContactStudents: true,
  },
  lastLoginAt: new Date().toISOString(),
  createdAt: '2024-01-01',
  isActive: true,
};

/**
 * UniversityLayout - Root layout wrapper for university dashboard
 *
 * Structure:
 * - Fixed header at top (72px height)
 * - Fixed sidebar on left (286px width)
 * - Scrollable main content area
 *
 * @param children - Page content to render in main area
 */
export default function UniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notificationCount, setNotificationCount] = useState(3);
  const [studentCount, setStudentCount] = useState(2847);
  const [searchCount, setSearchCount] = useState(15400);

  // Simulate fetching counts
  // TODO: Replace with actual API calls
  useEffect(() => {
    // Placeholder for API integration
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Fixed Header */}
      <UniversityHeader
        university={mockUniversity}
        user={mockUser}
        notificationCount={notificationCount}
      />

      {/* Sidebar */}
      <UniversitySidebar
        studentCount={studentCount}
        searchCount={searchCount}
      />

      {/* Main Content Area */}
      <main
        className="
          pt-[72px] pl-[286px]
          min-h-screen
          transition-all duration-300
          md:pl-[286px]
        "
      >
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
