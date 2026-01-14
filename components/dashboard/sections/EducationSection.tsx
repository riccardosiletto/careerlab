'use client';

import { useState } from 'react';
import { Education } from '@/types/dashboard';
import HorizontalBarCard from '../charts/HorizontalBarCard';
import CoursesTreemapChart from '../charts/CoursesTreemapChart';
import SchoolTypeParliamentChart from '../charts/SchoolTypeParliamentChart';
import MBATypesChart from '../charts/MBATypesChart';
import ViewSwitcher, { ViewType } from '../ViewSwitcher';

interface EducationSectionProps {
  education: Education;
}

export default function EducationSection({ education }: EducationSectionProps) {
  const [viewType, setViewType] = useState<ViewType>('entrambi');

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-[#B6DC00]" />
          <h2 className="font-bold text-3xl text-[#212746]">Education</h2>
        </div>
        <ViewSwitcher value={viewType} onChange={setViewType} />
      </div>

      {/* Top row: Degrees and Courses side by side */}
      <div className="grid grid-cols-2 gap-6">
        <div id="top-degrees">
          <HorizontalBarCard
            title="Quali sono le lauree più comuni?"
            data={education.topDegrees}
            baseColor="#6D7BFC"
          />
        </div>

        <div id="school-types">
          <SchoolTypeParliamentChart data={education.schoolTypes} />
        </div>
      </div>

      {/* Bottom row: Courses and MBA side by side */}
      <div className="grid grid-cols-2 gap-6">
        <div id="top-courses">
          <CoursesTreemapChart data={education.topCourses} />
        </div>
        <div id="mba-types">
          <MBATypesChart data={education.mbaTypes} />
        </div>
      </div>
    </div>
  );
}
