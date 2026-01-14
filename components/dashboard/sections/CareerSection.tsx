'use client';

import { Career, CareerStep } from '@/types/dashboard';
import CareerJourneyChart from '@/components/dashboard/charts/CareerJourneyChart';
import CareerFlowDiagram from '@/components/dashboard/charts/CareerFlowDiagram';

interface CareerSectionProps {
  career: Career;
  role: string;
  companyName?: string;
  companyLogo?: string;
}

// Default career path if none provided - esempio per PM in Intesa
const defaultCareerPath: CareerStep[] = [
  {
    role: 'Intern',
    seniority: 'intern',
    yearsToReach: 0,
    salaryRange: { min: 15000, max: 22000 },
  },
  {
    role: 'Junior PM',
    seniority: 'junior',
    yearsToReach: 1.2,
    salaryRange: { min: 28000, max: 35000 },
  },
  {
    role: 'Product Manager',
    seniority: 'mid',
    yearsToReach: 2.5,
    salaryRange: { min: 42000, max: 55000 },
  },
  {
    role: 'Senior PM',
    seniority: 'senior',
    yearsToReach: 3,
    salaryRange: { min: 60000, max: 80000 },
  },
];

export default function CareerSection({ career, role, companyName = 'Intesa Sanpaolo', companyLogo }: CareerSectionProps) {
  const careerPath = career.careerPath || defaultCareerPath;
  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-[#9D52FF]" />
        <h2 className="font-bold text-3xl text-[#212746]">Career</h2>
      </div>

      {/* Grid Layout for Career Insights */}
      <div className="grid grid-cols-1 gap-6">

        {/* Career Journey Chart - Full Width */}
        <div id="career-journey" className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <CareerJourneyChart
            companyName={companyName}
            companyLogo={companyLogo}
            roleName={role}
            careerPath={careerPath}
            averagePromotionTime={career.promotionTimeline.averageYears}
          />
        </div>

        {/* Career Flow Diagram - Full Width */}
        <CareerFlowDiagram
          data={career.promotionMatrix}
          promotionLocation={career.promotionLocation}
          promotionType={career.promotionType}
          differentRoles={career.differentRoles}
        />

      </div>
    </div>
  );
}
