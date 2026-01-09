'use client';

import { useState } from 'react';
import HeroSection from '@/components/search/HeroSection';
import StepCompany from '@/components/search/StepCompany';
import StepJobRole from '@/components/search/StepJobRole';
import StepDetails from '@/components/search/StepDetails';
import StepEmail from '@/components/search/StepEmail';
import ProcessingScreen from '@/components/search/ProcessingScreen';
import WaitlistModal from '@/components/search/WaitlistModal';

export interface SearchData {
  company: string;
  jobRole: string;
  country: string;
  seniority: [number, number];
  email: string;
}

type WizardStep = 'hero' | 'company' | 'jobRole' | 'details' | 'email' | 'processing';

export default function SearchPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('hero');
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [searchData, setSearchData] = useState<SearchData>({
    company: '',
    jobRole: '',
    country: '',
    seniority: [0, 5],
    email: ''
  });

  const updateData = (field: keyof SearchData, value: string | [number, number]) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const goToStep = (step: WizardStep) => {
    setCurrentStep(step);
  };

  const getStepNumber = (): number => {
    const stepMap: Record<WizardStep, number> = {
      'hero': 0,
      'company': 1,
      'jobRole': 2,
      'details': 3,
      'email': 4,
      'processing': 5
    };
    return stepMap[currentStep];
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-bl from-[#6D7BFC]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-tr from-[#D0E957]/20 to-transparent rounded-full blur-3xl" />
      
      {/* Header */}
      <header className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 py-6">
        {currentStep === 'hero' || currentStep === 'processing' ? (
          <div className="flex items-center gap-2">
            <img src="/images/careerlab-logo-full.png" alt="CareerLab" className="h-8 md:h-10" />
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-white/90 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-sm border border-[#E8EAF8]">
            <div className="flex items-center gap-4 md:gap-6">
              {/* Logo - 25% */}
              <div className="flex-shrink-0 w-[70px] md:w-[100px] flex items-center justify-center">
                <img src="/images/careerlab-logo-full.png" alt="CareerLab" className="h-6 md:h-9 w-auto" />
              </div>

              {/* Progress Bar - 75% */}
              <div className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
                {[
                  { num: 1, label: 'Company' },
                  { num: 2, label: 'Role' },
                  { num: 3, label: 'Details' },
                  { num: 4, label: 'Email' }
                ].map((step, index) => (
                  <div key={step.num} className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div
                        className={`
                          w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-base transition-all duration-500
                          ${getStepNumber() >= step.num
                            ? 'bg-gradient-to-br from-career-blue-500 to-[#5A68D9] text-white shadow-lg shadow-career-blue-500/20'
                            : 'bg-career-blue-100 text-[#8D96AC]'
                          }
                          ${getStepNumber() === step.num ? 'ring-4 ring-career-blue-500/20 scale-110' : ''}
                          ${step.num === 4 && getStepNumber() < 4 ? 'border border-career-blue-500/30' : ''}
                        `}
                      >
                        {getStepNumber() > step.num ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-[18px] md:h-[18px]">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : step.num === 4 ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-[16px] md:h-[16px]">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={getStepNumber() >= step.num ? "currentColor" : "#6D7BFC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke={getStepNumber() >= step.num ? "currentColor" : "#6D7BFC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke={getStepNumber() >= step.num ? "currentColor" : "#6D7BFC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke={getStepNumber() >= step.num ? "currentColor" : "#6D7BFC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke={getStepNumber() >= step.num ? "currentColor" : "#6D7BFC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : step.num}
                      </div>
                      <span className={`text-[9px] md:text-xs font-medium hidden sm:block transition-colors whitespace-nowrap ${getStepNumber() >= step.num ? 'text-career-blue-500' : 'text-[#8D96AC]'}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 min-w-[8px] ${getStepNumber() > step.num ? 'bg-career-blue-500' : 'bg-[#E8EAF8]'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={showWaitlistModal} 
        onClose={() => setShowWaitlistModal(false)} 
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        {/* Hero Section */}
        <div className={`
          transition-all duration-700 ease-out w-full
          ${currentStep === 'hero' 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-10 absolute pointer-events-none'
          }
        `}>
          <HeroSection 
            onBegin={() => goToStep('company')} 
            onJoinWaitlist={() => setShowWaitlistModal(true)}
          />
        </div>

        {/* Step 1: Company */}
        <div className={`
          transition-all duration-700 ease-out delay-100
          ${currentStep === 'company' 
            ? 'opacity-100 translate-y-0' 
            : currentStep === 'hero' 
              ? 'opacity-0 translate-y-20 absolute pointer-events-none'
              : 'opacity-0 -translate-y-10 absolute pointer-events-none'
          }
        `}>
          <StepCompany 
            value={searchData.company}
            onChange={(val) => updateData('company', val)}
            onNext={() => goToStep('jobRole')}
            onBack={() => goToStep('hero')}
          />
        </div>

        {/* Step 2: Job Role */}
        <div className={`
          transition-all duration-700 ease-out delay-100
          ${currentStep === 'jobRole' 
            ? 'opacity-100 translate-y-0' 
            : getStepNumber() < 2
              ? 'opacity-0 translate-y-20 absolute pointer-events-none'
              : 'opacity-0 -translate-y-10 absolute pointer-events-none'
          }
        `}>
          <StepJobRole 
            value={searchData.jobRole}
            onChange={(val) => updateData('jobRole', val)}
            onNext={() => goToStep('details')}
            onBack={() => goToStep('company')}
          />
        </div>

        {/* Step 3: Details */}
        <div className={`
          transition-all duration-700 ease-out delay-100
          ${currentStep === 'details' 
            ? 'opacity-100 translate-y-0' 
            : getStepNumber() < 3
              ? 'opacity-0 translate-y-20 absolute pointer-events-none'
              : 'opacity-0 -translate-y-10 absolute pointer-events-none'
          }
        `}>
          <StepDetails 
            country={searchData.country}
            seniority={searchData.seniority}
            onCountryChange={(val) => updateData('country', val)}
            onSeniorityChange={(val) => updateData('seniority', val)}
            onNext={() => goToStep('email')}
            onBack={() => goToStep('jobRole')}
          />
        </div>

        {/* Step 4: Email */}
        <div className={`
          transition-all duration-700 ease-out delay-100
          ${currentStep === 'email' 
            ? 'opacity-100 translate-y-0' 
            : getStepNumber() < 4
              ? 'opacity-0 translate-y-20 absolute pointer-events-none'
              : 'opacity-0 -translate-y-10 absolute pointer-events-none'
          }
        `}>
          <StepEmail 
            value={searchData.email}
            onChange={(val) => updateData('email', val)}
            onSubmit={() => goToStep('processing')}
            onBack={() => goToStep('details')}
          />
        </div>

        {/* Processing Screen */}
        <div className={`
          transition-all duration-700 ease-out delay-100
          ${currentStep === 'processing' 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-20 scale-95 absolute pointer-events-none'
          }
        `}>
          <ProcessingScreen data={searchData} />
        </div>
      </main>
    </div>
  );
}

