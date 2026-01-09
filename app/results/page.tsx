'use client';

import { useState } from 'react';
import ResultsHeader from '@/components/results-flow/ResultsHeader';
import HexBackground from '@/components/results-flow/HexBackground';
import Step1ReportReady from '@/components/results-flow/Step1ReportReady';
import Step2AgeDistribution from '@/components/results-flow/Step2AgeDistribution';
import Step3TopDegree from '@/components/results-flow/Step3TopDegree';
import Step4Learning from '@/components/results-flow/Step4Learning';

// Mock data that would come from API/CSV
const mockData = {
  role: 'Software Engineer',
  company: 'Google',
  country: 'USA',
  profilesAnalyzed: 50,
  avgAge: 24,
  ageDistribution: [
    { range: '18-25', percentage: 30 },
    { range: '26-30', percentage: 28 },
    { range: '31-35', percentage: 22 },
    { range: '36-40', percentage: 12 },
    { range: '41+', percentage: 8 },
  ],
  genderDistribution: [
    { type: 'Male', percentage: 62 },
    { type: 'Female', percentage: 38 },
  ],
  topDegree: 'PhD in Engineering',
  degrees: [
    { name: 'Bachelor in Computer Science', count: 30, percentage: 48 },
    { name: 'Master in Engineering', count: 20, percentage: 28 },
    { name: 'MBA', count: 10, percentage: 13 },
  ],
  courses: [
    { name: 'Data Science Fundamentals', platform: 'Coursera' },
    { name: 'Machine Learning A-Z', platform: 'Udemy' },
    { name: 'Agile Project Management', platform: 'LinkedIn' },
  ],
};

type Step = 1 | 2 | 3 | 4;

export default function ResultsPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleSwipeToFullReport = () => {
    // Navigate to full dashboard/report
    window.location.href = '/dashboard';
  };

  const renderStep = () => {
    const stepClasses = 'animate-fadeIn';

    switch (currentStep) {
      case 1:
        return <Step1ReportReady data={mockData} onNext={nextStep} className={stepClasses} />;
      case 2:
        return <Step2AgeDistribution data={mockData} onNext={nextStep} className={stepClasses} />;
      case 3:
        return <Step3TopDegree data={mockData} onNext={nextStep} className={stepClasses} />;
      case 4:
        return <Step4Learning data={mockData} onSwipe={handleSwipeToFullReport} className={stepClasses} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-career-blue-100 relative overflow-hidden">
      {/* Background Pattern */}
      <HexBackground />

      {/* Header */}
      <ResultsHeader />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center px-5 pt-8 pb-8 min-h-[calc(100vh-76px)]">
        {renderStep()}
      </main>
    </div>
  );
}
