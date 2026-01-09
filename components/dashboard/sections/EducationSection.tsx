'use client';

import { Education } from '@/types/dashboard';
import HorizontalBarCard from '../charts/HorizontalBarCard';
import SchoolTypeDonutChart from '../charts/SchoolTypeDonutChart';
import MBATypesChart from '../charts/MBATypesChart';

interface EducationSectionProps {
  education: Education;
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-[#B6DC00]" />
        <h2 className="font-bold text-3xl text-[#212746]">Education</h2>
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

        <div id="top-courses">
          <HorizontalBarCard
            title="Quali corsi universitari hanno frequentato?"
            data={education.topCourses}
            baseColor="#B6DC00"
          />
        </div>
      </div>

      {/* Bottom row: School Types and MBA side by side */}
      <div className="grid grid-cols-2 gap-6">
        <div id="school-types">
          <SchoolTypeDonutChart data={education.schoolTypes} />
        </div>
        <div id="mba-types">
          <MBATypesChart data={education.mbaTypes} />
        </div>
      </div>
    </div>
  );
}
