"use client";

import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";

interface SearchCardProps {
  role: string;
  company: string;
  delay?: number;
}

function SearchCard({ role, company, delay = 0 }: SearchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-white border border-[#ADB3C7] rounded-xl w-[280px] h-[180px] flex flex-col items-center justify-start pt-[26px] shadow-box"
    >
      {/* Close button */}
      <button className="absolute top-[11px] right-[12px] p-1 text-[#5A607F] hover:text-[#212746] transition-colors">
        <X className="w-6 h-6" />
      </button>

      {/* Role Title */}
      <h3 className="text-[22px] font-medium text-[#212746] text-center leading-[30px] max-w-[273px] mb-4">
        {role} in {company}
      </h3>

      {/* Company Logo placeholder */}
      <div className="w-[100px] h-[100px] bg-[#F3F4FF] rounded-full absolute top-[28px] left-1/2 -translate-x-1/2 opacity-0" />

      {/* CTA Button */}
      <button className="absolute bottom-[28px] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#6D7BFC] text-white px-6 py-3 rounded-[25px] shadow-button hover:bg-[#5468db] transition-colors">
        <span className="font-medium text-[14px]">Inizia esplorazione</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function RecentSearches() {
  const searches = [
    { role: "Consulente", company: "J.P. Morgan" },
    { role: "Product Manager", company: "Intesa Sanpaolo" },
    { role: "Data Scientist", company: "Nexi" },
    { role: "Account Manager", company: "Generali" },
    { role: "UX Designer", company: "Amazon" },
  ];

  return (
    <section className="relative bg-[#DCDFFF] py-[20px]">
      <div className="w-[1440px] mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          {/* Folder Icon */}
          <div className="w-[77px] h-[77px] mb-3">
            <svg viewBox="0 0 77 77" fill="none" className="w-full h-full">
              <rect x="0" y="8" width="77" height="65" rx="8" fill="#6D7BFC" />
              <rect x="0" y="0" width="35" height="20" rx="6" fill="#9FA9FF" />
              <rect x="5" y="18" width="67" height="50" rx="6" fill="#F3F4FF" />
              <circle cx="38.5" cy="43" r="12" fill="#D0E957" />
              <path d="M35 43L37 45L42 40" stroke="#212746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[24px] font-medium text-[#212746] text-center">
            Ultime ricerche
          </h2>
        </motion.div>

        {/* Search Cards Row */}
        <div className="flex justify-start gap-6 overflow-x-auto pb-4 px-[28px] scrollbar-hide">
          {searches.map((search, index) => (
            <SearchCard
              key={index}
              role={search.role}
              company={search.company}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
