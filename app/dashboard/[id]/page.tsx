'use client';

import { useParams } from 'next/navigation';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import NavigationSidebar from '@/components/dashboard/NavigationSidebar';
import InfoCards from '@/components/dashboard/InfoCards';
import DemographicsSection from '@/components/dashboard/sections/DemographicsSection';
import EducationSection from '@/components/dashboard/sections/EducationSection';
import CareerSection from '@/components/dashboard/sections/CareerSection';
import PremiumBanner from '@/components/dashboard/PremiumBanner';

export default function DynamicDashboardPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, loading, error } = useDashboardData(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E8EAF8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Animated spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#E8EAF8] rounded-full" />
            <div
              className="absolute inset-0 border-4 border-[#6D7BFC] rounded-full border-t-transparent"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </div>
          <p className="font-medium text-lg text-[#5A607F]">Loading dashboard...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#E8EAF8] flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FEC800] to-[#FF6B6B] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-semibold text-xl text-[#212746] mb-2">Dashboard Not Found</h2>
          <p className="font-normal text-base text-[#5A607F] mb-6">
            {error || `The dashboard with ID "${id}" could not be loaded.`}
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-[#6D7BFC] hover:bg-[#5A68D9] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Go to Dashboard List
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8EAF8]">
      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <DashboardHeader />
      </div>

      {/* Add padding top to account for fixed header */}
      <div className="flex pt-[60px]">
        {/* Navigation Sidebar - Left (fixed, so we need spacer) */}
        <div className="w-[286px] flex-shrink-0"></div>
        <NavigationSidebar
          role={data.metadata.role}
          roleDescription={data.metadata.roleDescription}
        />

        {/* Main Content */}
        <main
          className="flex-1 flex flex-col bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/dashboard-bg-texture.webp')",
            backgroundColor: '#F0F3FF'
          }}
        >
          {/* Info Cards Row */}
          <InfoCards
            company={data.metadata.company}
            profilesAnalyzed={data.metadata.profilesAnalyzed}
            dataQuality={data.metadata.dataQuality}
            role={data.metadata.role}
            roleDescription={data.metadata.roleDescription}
            educationLevel={data.demographics.educationLevel}
          />

          {/* Content Area with Sections */}
          <div className="px-11 py-9 flex flex-col gap-12">
            {/* Demographics Section */}
            <DemographicsSection demographics={data.demographics} />

            {/* Education Section */}
            <EducationSection education={data.education} />

            {/* Career Section */}
            <CareerSection career={data.career} role={data.metadata.role} />

            {/* Premium Banner */}
            <PremiumBanner />
          </div>
        </main>
      </div>
    </div>
  );
}
