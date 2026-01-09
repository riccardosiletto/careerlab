"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FooterCTA() {
  return (
    <section className="relative bg-[#D0E957] py-10 overflow-hidden">
      <div className="w-[1440px] mx-auto relative">
        <div className="flex items-center gap-12 px-[171px]">
          {/* Logo Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-[73px] h-[89px] flex-shrink-0"
          >
            <svg viewBox="0 0 73 89" fill="none" className="w-full h-full">
              <rect x="0" y="14" width="73" height="75" rx="12" fill="url(#footer-cta-gradient)"/>
              <path d="M29 0L73 80" stroke="#212746" strokeWidth="8" strokeLinecap="round"/>
              <defs>
                <linearGradient id="footer-cta-gradient" x1="0" y1="14" x2="73" y2="89" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EBFF8C"/>
                  <stop offset="1" stopColor="#D0E957"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* CTA Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <h2 className="text-[36px] font-medium text-[#212746] mb-2">
              Dai un boost alla tua carriera!
            </h2>
          </motion.div>

          {/* CTA Description + Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-8"
          >
            <p className="text-[18px] text-[#5A607F] max-w-[419px] leading-relaxed">
              Scopri tutte le funzionalita&apos; del Career Lab! Go Premium per avere ricerche illimitate, notifiche per le posizioni che ti interessano e molto altro ancora!
            </p>
            
            <button className="flex items-center gap-2 bg-[#212746] text-white px-6 py-4 rounded-[25px] shadow-button hover:bg-[#2d3555] transition-colors whitespace-nowrap">
              <span className="font-medium text-[14px]">Go Premium!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
