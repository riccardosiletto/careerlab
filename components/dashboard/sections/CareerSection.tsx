'use client';

import { Career } from '@/types/dashboard';
import SalaryRangeChart from '@/components/dashboard/charts/SalaryRangeChart';
import CareerFlowDiagram from '@/components/dashboard/charts/CareerFlowDiagram';

interface CareerSectionProps {
  career: Career;
  role: string;
}

export default function CareerSection({ career, role }: CareerSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-[#9D52FF]" />
        <h2 className="font-bold text-3xl text-[#212746]">Career</h2>
      </div>

      {/* Grid Layout for Career Insights */}
      <div className="grid grid-cols-1 gap-6">

        {/* Salary Range and Promotion Timeline - 30/70 split */}
        <div className="grid grid-cols-10 gap-6">
          {/* Promotion Timeline - 30% */}
          <div id="promotion-timeline" className="col-span-3 bg-white shadow-sm border border-gray-200 overflow-hidden">
            {/* Dark blue header */}
            <div className="bg-[#212746] flex items-center px-5 py-4 w-full">
              <h3 className="font-medium text-base text-white">
                Quanto tempo per la prima promozione?
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center p-8 flex-1">
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-end gap-2">
                    <span className="font-black text-[88px] text-[#6D7BFC] leading-none">
                      {career.promotionTimeline.averageYears.toFixed(1).replace('.', ',')}
                    </span>
                    <span className="font-bold text-[44px] text-[#6D7BFC] pb-2">
                      anni
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#5A607F] font-medium leading-relaxed px-2">
                  {career.promotionTimeline.description}
                </p>
              </div>
            </div>
          </div>

          {/* Salary Range Chart - 70% */}
          <div id="salary-range" className="col-span-7 bg-white shadow-sm border border-gray-200 overflow-hidden">
            <SalaryRangeChart salaryRange={career.salaryRange} />
          </div>
        </div>

        {/* Career Flow Diagram - Full Width */}
        <CareerFlowDiagram
          data={career.promotionMatrix}
          promotionLocation={career.promotionLocation}
          promotionType={career.promotionType}
        />

      </div>
    </div>
  );
}
