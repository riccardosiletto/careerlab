'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import NavigationSidebar from '@/components/dashboard/NavigationSidebar';
import InfoCards from '@/components/dashboard/InfoCards';
import DemographicsSection from '@/components/dashboard/sections/DemographicsSection';
import EducationSection from '@/components/dashboard/sections/EducationSection';
import SkillsSection from '@/components/dashboard/sections/SkillsSection';
import CareerSection from '@/components/dashboard/sections/CareerSection';
import PremiumBanner from '@/components/dashboard/PremiumBanner';
import { DashboardData } from '@/types/dashboard';

// Mock data - struttura identica a quella caricata da CSV in /dashboard/[id]
const mockData: DashboardData = {
  metadata: {
    role: 'Project Manager',
    company: {
      name: 'Intesa Sanpaolo',
      location: 'Milano, Italia',
      logo: '/images/intesa-sanpaolo-logo.png'
    },
    country: 'Italia',
    profilesAnalyzed: 3458,
    dataQuality: 84,
    lastUpdate: '2024-01-15',
    roleDescription: 'Un Project Manager supporta la gestione dei progetti, aiutando nella pianificazione, nel monitoraggio e nella comunicazione. È un ruolo formativo che prevede l\'affiancamento a manager esperti per migliorare le proprie competenze professionali.'
  },
  demographics: {
    averageAge: 34,
    ageDistribution: [
      { range: '20-25', count: 45, percentage: 14 },
      { range: '26-30', count: 89, percentage: 29 },
      { range: '31-35', count: 78, percentage: 25 },
      { range: '36-40', count: 52, percentage: 17 },
      { range: '41-45', count: 31, percentage: 10 },
      { range: '46+', count: 17, percentage: 5 }
    ],
    gender: [
      { type: 'Uomini', count: 187, percentage: 60 },
      { type: 'Donne', count: 125, percentage: 40 }
    ],
    genderTrend: [
      { year: 2019, male: 68, female: 32, other: 0 },
      { year: 2020, male: 65, female: 35, other: 0 },
      { year: 2021, male: 63, female: 37, other: 0 },
      { year: 2022, male: 61, female: 39, other: 0 },
      { year: 2023, male: 60, female: 40, other: 0 }
    ],
    educationLocation: [
      { location: 'Milano', count: 145, percentage: 42 },
      { location: 'Roma', count: 78, percentage: 22 },
      { location: 'Torino', count: 52, percentage: 15 },
      { location: 'Bologna', count: 38, percentage: 11 },
      { location: 'Altro', count: 35, percentage: 10 }
    ],
    nationality: [
      { country: 'Italia', count: 280, percentage: 82 },
      { country: 'Francia', count: 25, percentage: 7 },
      { country: 'Germania', count: 18, percentage: 5 },
      { country: 'Altro', count: 21, percentage: 6 }
    ],
    educationLevel: {
      scuolaSuperiore: { count: 52, percentage: 12 },
      laureaTriennale: { count: 145, percentage: 34 },
      laureaMagistrale: { count: 124, percentage: 29 },
      master: { count: 89, percentage: 21 },
      altro: { count: 21, percentage: 5 }
    }
  },
  education: {
    topDegrees: [
      { name: 'Economia e Management', count: 89, percentage: 26 },
      { name: 'Ingegneria Gestionale', count: 67, percentage: 19 },
      { name: 'Scienze Politiche', count: 45, percentage: 13 },
      { name: 'Informatica', count: 38, percentage: 11 },
      { name: 'Giurisprudenza', count: 31, percentage: 9 }
    ],
    topCourses: [
      { name: 'Project Management Professional', count: 156, percentage: 45 },
      { name: 'Agile & Scrum', count: 98, percentage: 28 },
      { name: 'Leadership', count: 67, percentage: 19 },
      { name: 'Data Analysis', count: 52, percentage: 15 },
      { name: 'Communication', count: 45, percentage: 13 }
    ],
    schoolTypes: [
      { type: 'Università Pubblica', count: 198, percentage: 57 },
      { type: 'Università Privata', count: 89, percentage: 26 },
      { type: 'Business School', count: 45, percentage: 13 },
      { type: 'Altro', count: 16, percentage: 4 }
    ],
    mbaTypes: [
      { type: 'Full-time MBA', count: 34, percentage: 38 },
      { type: 'Part-time MBA', count: 28, percentage: 31 },
      { type: 'Executive MBA', count: 18, percentage: 20 },
      { type: 'Online MBA', count: 10, percentage: 11 }
    ]
  },
  skills: {
    topSkills: [
      { name: 'Project Management', count: 134, percentage: 85 },
      { name: 'Leadership', count: 98, percentage: 62 },
      { name: 'Stakeholder Management', count: 87, percentage: 55 },
      { name: 'Agile Methodologies', count: 76, percentage: 48 },
      { name: 'Risk Management', count: 65, percentage: 41 }
    ],
    topCertifications: [
      { name: 'PMP (Project Management Professional)', count: 89, percentage: 56 },
      { name: 'PRINCE2 Foundation', count: 67, percentage: 42 },
      { name: 'Scrum Master Certified', count: 54, percentage: 34 },
      { name: 'ITIL Foundation', count: 43, percentage: 27 },
      { name: 'Six Sigma Green Belt', count: 32, percentage: 20 }
    ]
  },
  career: {
    salaryRange: {
      min: 35000,
      median: 55000,
      p75: 72000,
      max: 95000
    },
    promotionTimeline: {
      averageYears: 2.8,
      description: 'In media, i Project Manager in Intesa Sanpaolo ricevono la prima promozione dopo circa 2,8 anni dall\'assunzione.'
    },
    workSetup: {
      onSite: 25,
      hybrid: 60,
      remote: 15
    },
    benefits: [
      { name: 'Health Insurance', icon: 'health' },
      { name: 'Flexible Hours', icon: 'clock' },
      { name: 'Training Budget', icon: 'book' },
      { name: 'Pension Plan', icon: 'piggy-bank' }
    ],
    hiring: {
      isHiring: true,
      companyName: 'Intesa Sanpaolo',
      jobPostUrl: 'https://careers.intesasanpaolo.com'
    },
    recruiter: {
      available: true,
      companyName: 'Intesa Sanpaolo',
      ctaUrl: 'https://careers.intesasanpaolo.com/contact'
    },
    promotionLocation: {
      sameCompany: 65,
      newCompany: 35
    },
    promotionType: {
      sameRole: 40,
      differentRole: 60
    },
    promotionMatrix: {
      sameCompanySameRole: 26,
      sameCompanyDiffRole: 39,
      newCompanySameRole: 14,
      newCompanyDiffRole: 21
    }
  }
};

export default function DashboardPage() {
  const data = mockData;

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
          />

          {/* Content Area with Sections */}
          <div className="px-11 py-9 flex flex-col gap-12">
            {/* Demographics Section */}
            <DemographicsSection demographics={data.demographics} />

            {/* Education Section */}
            <EducationSection education={data.education} />

            {/* Career Section */}
            <CareerSection career={data.career} role={data.metadata.role} companyName={data.metadata.company.name} companyLogo={data.metadata.company.logo} />

            {/* Skills Section */}
            <SkillsSection skills={data.skills} />

            {/* Premium Banner */}
            <PremiumBanner />
          </div>
        </main>
      </div>
    </div>
  );
}
