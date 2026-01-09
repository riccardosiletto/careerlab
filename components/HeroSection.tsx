"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Search, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative pt-[135px] pb-16 bg-[#DCDFFF] overflow-hidden min-h-[800px]">
      {/* Background Decorative Curves - Green */}
      <svg 
        className="absolute -top-[85px] -left-[50px] w-[1608px] h-[584px]"
        viewBox="0 0 1608 584"
        fill="none"
        preserveAspectRatio="none"
      >
        <path 
          d="M0 400 Q400 0 1200 200 Q1608 300 1608 0" 
          stroke="#D0E957" 
          strokeWidth="180" 
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>

      <div className="relative w-[1440px] mx-auto px-0">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-[274px] top-0 w-[1440px]"
        >
          <h1 className="font-medium text-[62px] leading-normal text-[#212746] whitespace-pre-wrap">
            <span>Esplora </span>
            <span className="text-[#6D7BFC]">nuove carriere</span>
            <br />
            <span>e scopri competenze</span>
            <br />
            <span>nuove da formare</span>
          </h1>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-[888px] top-[-57px] w-[384px] h-[384px]"
        >
          <Image 
            src="/images/hero-illustration.png" 
            alt="Startup illustration" 
            width={384} 
            height={384}
            className="animate-float"
            priority
            unoptimized
          />
        </motion.div>

        {/* Search Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute left-[275px] top-[285px] w-[892px]"
        >
          {/* Blue background with grid pattern */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#6D7BFC] rounded-t-xl overflow-hidden">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-35 grid-pattern" />
              <div className="absolute inset-0 bg-[#9FA9FF]/70 rounded-t-xl" />
            </div>
            
            {/* Search Card */}
            <div className="relative pt-[73px] pb-[28px] px-[122px]">
              {/* Search Input Row */}
              <div className="bg-white border border-[#6D7BFC] rounded-xl flex items-center gap-[61px] pl-6 pr-1 py-1">
                <input
                  type="text"
                  placeholder="Inserisci Posizione o l'Azienda che ti interessa"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-[20px] text-[#C1C8D5] placeholder:text-[#C1C8D5] outline-none bg-transparent"
                />
                <button className="flex items-center gap-3 bg-[#212746] text-white px-6 py-4 rounded-xl shadow-button">
                  <span className="font-medium text-[18px]">Inizia qui</span>
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M1 7H15M15 7L9 1M15 7L9 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Free searches indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1C5.03 1 1 5.03 1 10C1 14.97 5.03 19 10 19C14.97 19 19 14.97 19 10C19 5.03 14.97 1 10 1Z" stroke="#F3F4FF" strokeWidth="1.5"/>
                  <path d="M7.5 7.833L9.167 12.167L12.5 10" stroke="#F3F4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[20px] text-[#F3F4FF] text-center">
                  Hai a disposizione 3 ricerche gratuite.
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons Row */}
          <div className="flex">
            {/* Register Button */}
            <div className="flex-1 bg-[#212746] rounded-bl-xl px-5 py-[31px] flex items-center justify-center shadow-box">
              <p className="font-medium text-[18px] text-[#D0E957] text-center underline underline-offset-2 max-w-[352px] leading-6">
                Registrati per avere fino 12 ricerche gratuite mensili
              </p>
            </div>
            
            {/* Premium Button */}
            <div className="flex-1 bg-[#D0E957] rounded-br-xl px-5 py-[31px] flex items-center justify-center shadow-box">
              <div className="font-medium text-[18px] text-[#212746] text-center underline underline-offset-2 leading-6">
                <p>Go Premium! per ricerche illimitate</p>
                <p>e tanto altro</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
