"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="relative bg-[#F0F3FF] py-20 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="w-[1440px] mx-auto relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 px-[296px]"
        >
          <h2 className="text-[48px] font-medium text-[#212746] mb-6">
            2 piani semplici e trasparenti
          </h2>
          <p className="text-[18px] text-[#5A607F] leading-relaxed">
            Che tu sia uno Studente curioso di scoprire il mondo del lavoro o un Professionista interessato a cercare attivamente una nuova opportunità di impiego, abbiamo la soluzione per te!
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="flex justify-center gap-6 px-[355px]">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-[#C1C8D5] rounded-[20px] w-[352px] h-[543px] relative"
          >
            <div className="p-6">
              {/* Plan Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <circle cx="13" cy="13" r="12" stroke="#6D7BFC" strokeWidth="2"/>
                    <circle cx="13" cy="13" r="6" fill="#6D7BFC"/>
                  </svg>
                  <h3 className="text-[32px] font-medium text-[#212746]">Registrato</h3>
                </div>
                <p className="text-[14px] text-[#8D96AC]">
                  Ideale per chi vuole iniziare a orientarsi sul mercato di lavoro
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[16px] text-[#212746]">€</span>
                <span className="text-[48px] font-medium text-[#212746]">0</span>
                <span className="text-[14px] text-[#8D96AC]">/gratuito</span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#C1C8D5] mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] bg-[#6D7BFC] rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[16px] text-[#212746]">Account personale</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] bg-[#6D7BFC] rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[16px] text-[#212746]">12 ricerche al mese</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <button className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 bg-[#6D7BFC] text-white py-4 rounded-[25px] shadow-button hover:bg-[#5468db] transition-colors">
              <span className="font-medium text-[14px]">Registrati Gratuitamente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#212746] rounded-[20px] w-[353px] h-[544px] relative"
          >
            <div className="p-6">
              {/* Plan Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <svg width="28" height="31" viewBox="0 0 28 31" fill="none">
                    <path d="M14 0L17.5 11H28L19.5 17.5L23 28.5L14 21.5L5 28.5L8.5 17.5L0 11H10.5L14 0Z" fill="#D0E957"/>
                  </svg>
                  <h3 className="text-[32px] font-medium text-white">Premium</h3>
                </div>
                <p className="text-[14px] text-[#ADB3C7]">
                  Ideale per chi attivamente cerca il lavoro
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[16px] text-white">€</span>
                <span className="text-[48px] font-medium text-white">4,99</span>
                <span className="text-[14px] text-[#ADB3C7]">/per sempre</span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#5A607F] mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] bg-[#D0E957] rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#212746]" />
                  </div>
                  <span className="text-[16px] text-white">Account personale</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] bg-[#D0E957] rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#212746]" />
                  </div>
                  <span className="text-[16px] text-white">Ricerche illimitate per sempre</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-[18px] h-[18px] bg-[#D0E957] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#212746]" />
                  </div>
                  <span className="text-[16px] text-white leading-tight">Avvisi e notifiche sulle posizioni che ti interessano e Aziende che assumono</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] bg-[#D0E957] rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#212746]" />
                  </div>
                  <span className="text-[16px] text-white">Contatti diretti con i Recruiter</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] bg-[#D0E957] rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#212746]" />
                  </div>
                  <span className="text-[16px] text-white">Proposte di lavoro personalizzate</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] bg-[#D0E957] rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#212746]" />
                  </div>
                  <span className="text-[16px] text-white">Risultati personalizzati</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <button className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 bg-[#D0E957] text-[#212746] py-4 rounded-[25px] shadow-button hover:bg-[#EBFF8C] transition-colors">
              <span className="font-medium text-[14px]">Go Premium!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Free search reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-[16px] text-[#5A607F] mt-8"
        >
          Oppure continua con 3 ricerche gratuite!
        </motion.p>
      </div>
    </section>
  );
}
