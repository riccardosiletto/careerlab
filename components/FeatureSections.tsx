"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FeatureSections() {
  return (
    <>
      {/* Feature 1: Career Choice */}
      <section className="relative bg-[#F0F3FF] pt-[100px] overflow-hidden">
        {/* Purple wave background */}
        <svg 
          className="absolute -left-[60px] top-[260px] w-[1508px] h-[337px]"
          viewBox="0 0 1508 337"
          fill="none"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 337 L0 200 Q754 0 1508 200 L1508 337 Z" 
            fill="#9FA9FF"
            opacity="0.15"
          />
        </svg>

        <div className="w-[1440px] mx-auto relative">
          <div className="flex items-start justify-between gap-10">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute left-[276px] top-[20px] w-[437px]"
            >
              <h2 className="text-[48px] font-medium text-[#212746] leading-tight mb-6">
                Scegli la miglior carriera nell&apos;azienda che vuoi!
              </h2>
              <p className="text-[20px] leading-[1.9] text-[#5A607F]">
                Career Lab ti guida nella scoperta di nuovi percorsi di carriera che valorizzano il tuo profilo di competenze: scegli il tuo ruolo ideale o un&apos;azienda per cominciare l&apos;esplorazione!
              </p>
            </motion.div>

            {/* Screen Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute left-[809px] top-[-72px] w-[636px] h-[504px]"
            >
              <div className="relative w-full h-full bg-white rounded-3xl shadow-feature overflow-hidden">
                <Image 
                  src="/images/screen-1.png" 
                  alt="Career Explorer Screen" 
                  fill
                  className="object-cover rounded-3xl"
                  unoptimized
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="h-[400px]" />
      </section>

      {/* Feature 2: Insights */}
      <section className="relative bg-[#F0F3FF] py-[100px] overflow-hidden">
        <div className="w-[1440px] mx-auto relative">
          <div className="flex items-center justify-between">
            {/* Feature Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-[495px] h-[451px] ml-[234px]"
            >
              {/* Main circle with blue background */}
              <div className="absolute left-[42px] top-[34px] w-[417px] h-[417px] bg-[#9FA9FF] rounded-full" />
              
              {/* Floating cards */}
              <div className="absolute left-0 top-0 w-[178px] h-[146px]">
                <Image 
                  src="/images/group-277.png" 
                  alt="Skill insights" 
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              
              <div className="absolute left-[122px] top-[115px] w-[263px] h-[242px]">
                <Image 
                  src="/images/group-278.png" 
                  alt="Analytics" 
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              
              <div className="absolute left-[285px] top-[288px] w-[210px] h-[140px]">
                <Image 
                  src="/images/group-276.png" 
                  alt="Recommendations" 
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Balloon */}
              <div className="absolute left-[433px] top-[100px] w-[43px] h-[40px] animate-float">
                <svg viewBox="0 0 43 40" fill="none" className="w-full h-full">
                  <ellipse cx="21.5" cy="17" rx="17" ry="17" fill="#D0E957"/>
                  <path d="M21.5 34 L18 40 L25 40 Z" fill="#D0E957"/>
                  <line x1="18" y1="40" x2="25" y2="40" stroke="#212746" strokeWidth="1"/>
                </svg>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-[435px] mr-[195px]"
            >
              <h2 className="text-[48px] font-medium text-[#212746] leading-tight mb-6">
                Ricevi insights personalizzati
              </h2>
              <p className="text-[20px] leading-[1.9] text-[#5A607F] mb-8">
                La nostra tecnologia mette a tua disposizione informazioni uniche sulle aziende di tuo interesse, permettendoti di scegliere al meglio la prossima tappa della tua carriera.
              </p>
              <button className="flex items-center gap-2 bg-[#6D7BFC] text-white px-6 py-3 rounded-[25px] shadow-button hover:bg-[#5468db] transition-colors">
                <span className="font-medium text-[14px]">Inizia esplorazione</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
