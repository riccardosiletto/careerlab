'use client';

import { useState } from 'react';
import { Skills } from '@/types/dashboard';
import HorizontalBarCard from '../charts/HorizontalBarCard';
import ViewSwitcher, { ViewType } from '../ViewSwitcher';

interface SkillsSectionProps {
  skills: Skills;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [viewType, setViewType] = useState<ViewType>('entrambi');

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-[#FF6B6B]" />
          <h2 className="font-bold text-3xl text-[#212746]">Skills & Certifications</h2>
        </div>
        <ViewSwitcher value={viewType} onChange={setViewType} />
      </div>

      {/* Top row: Skills and Certifications side by side */}
      <div className="grid grid-cols-2 gap-6">
        <div id="top-skills">
          <HorizontalBarCard
            title="Quali sono le skill più diffuse?"
            data={skills.topSkills}
            baseColor="#FF6B6B"
          />
        </div>

        <div id="top-certifications">
          <HorizontalBarCard
            title="Quali certificazioni possiedono?"
            data={skills.topCertifications}
            baseColor="#FEC800"
          />
        </div>
      </div>

      {/* Training Sources row */}
      {skills.trainingSources && skills.trainingSources.length > 0 && (
        <div className="grid grid-cols-2 gap-6">
          <div id="training-sources">
            <HorizontalBarCard
              title="Quali sono le top 5 sorgenti di formazione?"
              data={skills.trainingSources}
              baseColor="#9D52FF"
            />
          </div>
        </div>
      )}
    </div>
  );
}
