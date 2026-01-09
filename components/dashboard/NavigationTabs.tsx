'use client';

interface NavigationTabsProps {
  activeTab: string;
}

const tabs = [
  { 
    id: 'panoramica', 
    label: 'Panoramica',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="12" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="1" y="12" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="12" y="12" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    id: 'competenze', 
    label: 'Competenze',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1L12.39 6.26L18.18 7.27L14.09 11.26L15.02 17.04L10 14.27L4.98 17.04L5.91 11.26L1.82 7.27L7.61 6.26L10 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'carriere', 
    label: 'Carriere',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 5H3C1.89543 5 1 5.89543 1 7V16C1 17.1046 1.89543 18 3 18H17C18.1046 18 19 17.1046 19 16V7C19 5.89543 18.1046 5 17 5Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M13 5V3C13 1.89543 12.1046 1 11 1H9C7.89543 1 7 1.89543 7 3V5" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    id: 'certificazioni', 
    label: 'Certificazioni',
    icon: (
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 1L13.09 4.26L17.18 5.27L14.59 8.76L14.52 13.04L10.5 11.27L6.48 13.04L6.41 8.76L3.82 5.27L7.91 4.26L10.5 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 13V19L10.5 17L14.5 19V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'whats-next', 
    label: "What's Next",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function NavigationTabs({ activeTab }: NavigationTabsProps) {
  return (
    <nav className="bg-white flex gap-2 items-center pt-8 px-10">
      {tabs.map((tab) => (
        <div key={tab.id} className="flex flex-row items-center self-stretch">
          <button
            className={`
              flex gap-3 items-center px-5 py-4 h-full
              font-medium text-lg tracking-[0.36px] capitalize
              transition-colors
              ${activeTab === tab.id 
                ? 'text-[#6D7BFC] border-b-[3px] border-[#6D7BFC]' 
                : 'text-[#212746] hover:text-[#6D7BFC]'
              }
            `}
          >
            <span className={activeTab === tab.id ? 'text-[#6D7BFC]' : 'text-[#9FA9FF]'}>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        </div>
      ))}
    </nav>
  );
}




