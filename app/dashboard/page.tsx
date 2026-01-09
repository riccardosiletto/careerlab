'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import NavigationTabs from '@/components/dashboard/NavigationTabs';
import InfoCards from '@/components/dashboard/InfoCards';
import StatCards from '@/components/dashboard/StatCards';
import ChartCards from '@/components/dashboard/ChartCards';
import PremiumBanner from '@/components/dashboard/PremiumBanner';

// Mock data - in futuro verrà caricato da CSV nella cartella reports
const dashboardData = {
  role: 'Project Manager',
  company: {
    name: 'Intesa Sanpaolo',
    location: 'Milano, Italia',
    logo: '/images/intesa-sanpaolo-logo.png'
  },
  country: 'Italia',
  profilesAnalyzed: 3458,
  dataQuality: 84,
  stats: {
    totalEmployees: 312,
    newHires: 28,
    averageAge: 24
  },
  education: {
    scuolaSuperiore: { count: 52, percentage: 12 },
    laureaTriennale: { count: 216, percentage: 34 },
    laureaMagistrale: { count: 174, percentage: 29 },
    master: { count: 91, percentage: 21 },
    altro: { count: 25, percentage: 5 }
  },
  languages: [
    { name: 'Inglese', percentage: 81, count: 345, color: '#6D7BFC' },
    { name: 'Francese', percentage: 41, count: 125, color: '#B6DC00' },
    { name: 'Spagnolo', percentage: 21, count: 105, color: '#8D96AC' },
    { name: 'Altro', percentage: 15, count: 75, color: '#FEC800' }
  ],
  roleDescription: 'Un Project Manager supporta la gestione dei progetti, aiutando nella pianificazione, nel monitoraggio e nella comunicazione. È un ruolo formativo che prevede l\'affiancamento a manager esperti per migliorare le proprie competenze professionali.'
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#E8EAF8]">
      {/* Header */}
      <DashboardHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          role={dashboardData.role}
          company={dashboardData.company}
          country={dashboardData.country}
          roleDescription={dashboardData.roleDescription}
        />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Navigation Tabs */}
          <NavigationTabs activeTab="panoramica" />
          
          {/* Info Cards Row */}
          <InfoCards 
            company={dashboardData.company}
            profilesAnalyzed={dashboardData.profilesAnalyzed}
            dataQuality={dashboardData.dataQuality}
            role={dashboardData.role}
          />
          
          {/* Stats Section */}
          <div className="px-10 py-8 flex flex-col gap-6">
            {/* Stat Cards Row */}
            <StatCards 
              stats={dashboardData.stats}
              company={dashboardData.company.name}
              role={dashboardData.role}
            />
            
            {/* Chart Cards Row */}
            <ChartCards 
              education={dashboardData.education}
              languages={dashboardData.languages}
            />
            
            {/* Premium Banner */}
            <PremiumBanner />
          </div>
        </main>
      </div>
    </div>
  );
}




