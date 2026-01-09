'use client';

import { Demographics } from '@/types/dashboard';
import AgeDistributionChart from '../charts/AgeDistributionChart';
import GenderDonutChart from '../charts/GenderDonutChart';
import GenderTrendChart from '../charts/GenderTrendChart';
import EducationLevelChart from '../charts/EducationLevelChart';

interface DemographicsSectionProps {
  demographics: Demographics;
}

export default function DemographicsSection({ demographics }: DemographicsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-[#6D7BFC]" />
        <h2 className="font-bold text-3xl text-[#212746]">Demographics</h2>
      </div>

      {/* Age Distribution & Education Level - 50/50 */}
      <div className="grid grid-cols-2 gap-6">
        <div id="age-distribution">
          <AgeDistributionChart
            averageAge={demographics.averageAge}
            distribution={demographics.ageDistribution}
          />
        </div>
        <div id="education-level">
          <EducationLevelChart data={demographics.educationLevel} />
        </div>
      </div>

      {/* Gender Charts - Side by Side */}
      <div className="grid grid-cols-2 gap-6">
        <div id="gender-distribution">
          <GenderDonutChart data={demographics.gender} />
        </div>
        <div id="gender-trend">
          <GenderTrendChart data={demographics.genderTrend} />
        </div>
      </div>
    </div>
  );
}
