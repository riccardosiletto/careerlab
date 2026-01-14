'use client';

import { useState } from 'react';
import { Demographics } from '@/types/dashboard';
import AgeDistributionChart from '../charts/AgeDistributionChart';
import GenderTrendChart from '../charts/GenderTrendChart';
import StudyLocationChart from '../charts/StudyLocationChart';
import ViewSwitcher, { ViewType } from '../ViewSwitcher';

interface DemographicsSectionProps {
  demographics: Demographics;
}

export default function DemographicsSection({ demographics }: DemographicsSectionProps) {
  const [viewType, setViewType] = useState<ViewType>('entrambi');

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-[#6D7BFC]" />
          <h2 className="font-bold text-3xl text-[#212746]">Demographics</h2>
        </div>
        <ViewSwitcher value={viewType} onChange={setViewType} />
      </div>

      {/* Two-column layout: Left (Age + Gender stacked) | Right (Study Location matching height) */}
      <div className="grid grid-cols-2 gap-6 items-stretch">
        {/* Left column: Age Distribution + Gender Trend stacked */}
        <div className="flex flex-col gap-6">
          <div id="age-distribution">
            <AgeDistributionChart
              averageAge={demographics.averageAge}
              distribution={demographics.ageDistribution}
            />
          </div>
          <div id="gender-trend">
            <GenderTrendChart data={demographics.genderTrend} />
          </div>
        </div>

        {/* Right column: Study Location (matches left column height) */}
        <div id="study-location">
          <StudyLocationChart fullHeight />
        </div>
      </div>
    </div>
  );
}
