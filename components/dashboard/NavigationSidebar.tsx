'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import RoleDescriptionCard from './RoleDescriptionCard';

interface NavigationSidebarProps {
  role?: string;
  roleDescription?: string;
}

export default function NavigationSidebar({ role, roleDescription }: NavigationSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [accordionValue, setAccordionValue] = useState<string[]>(["demographics", "education", "career"]);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleCardExpand = (expanded: boolean) => {
    if (expanded) {
      // Close all accordions when card expands
      setAccordionValue([]);
    } else {
      // Reopen accordions when card collapses
      setAccordionValue(["demographics", "education", "career"]);
    }
  };

  return (
    <aside className="w-[286px] bg-[#212746] border-r border-[#3A4066] flex flex-col py-6 h-screen fixed top-[60px] left-0 overflow-y-auto">

      <Accordion
        type="multiple"
        value={accordionValue}
        onValueChange={setAccordionValue}
        className="w-full flex-1"
      >
        {/* Demographics Section */}
        <AccordionItem value="demographics" className="border-b border-[#3A4066]">
          <AccordionTrigger className="text-white hover:text-[#9FA9FF]">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 21C5.5 17.134 8.41015 14 12 14C15.5899 14 18.5 17.134 18.5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>DEMOGRAPHICS</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 pl-7">
              <button
                onClick={() => scrollToElement('age-distribution')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'age-distribution' ? 'text-[#9FA9FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Distribuzione dell'Età
              </button>
              <button
                onClick={() => scrollToElement('education-level')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'education-level' ? 'text-[#9FA9FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Livello di Formazione
              </button>
              <button
                onClick={() => scrollToElement('gender-distribution')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'gender-distribution' ? 'text-[#9FA9FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Distribuzione di Genere
              </button>
              <button
                onClick={() => scrollToElement('gender-trend')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'gender-trend' ? 'text-[#9FA9FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Trend di Genere
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Education Section */}
        <AccordionItem value="education" className="border-b border-[#3A4066]">
          <AccordionTrigger className="text-white hover:text-[#EBFF8C]">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L3 9L12 14L21 9L12 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 13.5L12 18.5L21 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18L12 23L21 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>EDUCATION</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 pl-7">
              <button
                onClick={() => scrollToElement('top-degrees')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'top-degrees' ? 'text-[#EBFF8C] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Top 5 Lauree
              </button>
              <button
                onClick={() => scrollToElement('top-courses')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'top-courses' ? 'text-[#EBFF8C] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Top 5 Corsi
              </button>
              <button
                onClick={() => scrollToElement('school-types')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'school-types' ? 'text-[#EBFF8C] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Tipi di Scuola
              </button>
              <button
                onClick={() => scrollToElement('mba-types')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'mba-types' ? 'text-[#EBFF8C] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Distribuzione MBA
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Career Section */}
        <AccordionItem value="career" className="border-b border-[#3A4066]">
          <AccordionTrigger className="text-white hover:text-[#C299FF]">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="7" width="16" height="13" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>CAREER</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 pl-7">
              <button
                onClick={() => scrollToElement('salary-range')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'salary-range' ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Range Salariale
              </button>
              <button
                onClick={() => scrollToElement('promotion-timeline')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'promotion-timeline' ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Timeline Promozioni
              </button>
              <button
                onClick={() => scrollToElement('promotion-location')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'promotion-location' ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Località Promozione
              </button>
              <button
                onClick={() => scrollToElement('promotion-type')}
                className={`text-left text-sm py-2 px-3 rounded hover:bg-[#2F354E] transition-colors ${activeSection === 'promotion-type' ? 'text-[#C299FF] font-medium bg-[#2F354E]' : 'text-[#ADB3C7]'
                  }`}
              >
                Tipo di Promozione
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Role Description Card - Fixed at Bottom */}
      {role && roleDescription && (
        <div className="mt-auto pt-4">
          <RoleDescriptionCard
            role={role}
            description={roleDescription}
            onExpandChange={handleCardExpand}
          />
        </div>
      )}
    </aside>
  );
}
