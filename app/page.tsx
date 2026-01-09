"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#dcdfff] overflow-hidden">
      {/* Background curves */}
      <div className="absolute -top-[98px] -left-[50px] w-full max-w-[1608px] h-[584px] rotate-[359.544deg]">
        <Image src="/svg/vector-4.svg" alt="" fill className="object-contain" unoptimized />
      </div>
      
      {/* White background for lower sections */}
      <div className="absolute left-0 right-0 top-[1359px] bg-white" style={{ height: "calc(100% - 1359px + 2000px)" }} />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="block">
          <div className="w-[160px] h-[60px] relative">
            <Image src="/images/careerlab-logo-full.png" alt="CareerLab" fill className="object-contain object-left" unoptimized />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex bg-white items-center gap-6 pl-[42px] pr-6 py-4 rounded-lg">
          <div className="border-2 border-[#d0e957] rounded-3xl px-4 py-2">
            <span className="font-medium text-[#5a607f] text-base">Esplora Carriere</span>
          </div>
          <span className="text-[#8d96ac] text-base cursor-pointer hover:text-[#5a607f] transition-colors">Per Aziende</span>
          <span className="text-[#8d96ac] text-base cursor-pointer hover:text-[#5a607f] transition-colors">Per Università</span>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <button className="bg-[#ebff8c] rounded-3xl px-3 py-2 hover:bg-[#d0e957] transition-colors">
            <span className="font-medium text-[#212746] text-sm">Vedi i piani</span>
          </button>
          <div className="border-2 border-[#6d7bfc] rounded-[25px] px-4 py-2 cursor-pointer hover:bg-[#6d7bfc] hover:text-white transition-colors group">
            <span className="font-medium text-[#212746] text-sm group-hover:text-white">Registrati</span>
          </div>
          <span className="font-medium text-[#6d7bfc] text-sm px-1 py-2 cursor-pointer hover:text-[#212746] transition-colors">Login</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-[51px] px-6 lg:px-[274px] max-w-[1440px] mx-auto">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[600px]"
        >
          <h1 className="font-medium text-4xl md:text-5xl lg:text-[62px] text-[#212746] leading-[1.1]">
            <span>Esplora </span>
            <span className="text-[#6d7bfc]">nuove carriere</span>
            <br />
            <span>e scopri competenze</span>
            <br />
            <span>nuove da formare</span>
          </h1>
        </motion.div>

        {/* Hero Illustration - positioned to the right */}
        <div className="absolute right-6 lg:right-[168px] top-[78px] w-[280px] md:w-[384px] h-[280px] md:h-[384px]">
          <Image 
            src="/images/startup-character.svg" 
            alt="Startup illustration" 
            fill 
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Search Box */}
      <section className="relative mt-[85px] px-6 lg:px-[269px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[897px] shadow-[1px_1px_2px_0px_rgba(0,12,70,0.1)] mx-auto lg:mx-0"
        >
          {/* Top section with gradient */}
          <div className="relative h-[257px] rounded-t-xl overflow-hidden">
            <div className="absolute inset-0 bg-[#6d7bfc]" />
            <div className="absolute inset-0">
              <Image 
                src="/images/search-bg.png" 
                alt="" 
                fill 
                className="object-cover opacity-20" 
                unoptimized
              />
            </div>
            
            {/* Search Content */}
            <div className="absolute inset-x-1 top-[17px] flex flex-col items-center gap-6 pt-7 pb-2.5 px-2.5">
              {/* Search Input */}
              <div className="bg-white border border-[#6d7bfc] rounded-xl flex flex-col md:flex-row items-center gap-4 md:gap-[61px] pl-6 pr-1 py-1 w-full max-w-[700px]">
                <span className="text-[#c1c8d5] text-lg md:text-xl text-center md:text-left">
                  Inserisci Posizione o l&apos;Azienda che ti interessa
                </span>
                <button className="bg-[#212746] rounded-xl px-6 py-4 flex items-center gap-3 shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15)] hover:bg-[#2d3560] transition-colors">
                  <span className="font-medium text-white text-lg">Inizia qui</span>
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M1 7H15M15 7L9 1M15 7L9 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {/* Free searches message */}
              <div className="flex items-center gap-2">
                <Image src="/images/user-icon.svg" alt="" width={20} height={20} unoptimized />
                <span className="text-[#f3f4ff] text-lg md:text-xl text-center">
                  Hai a disposizione 3 ricerche gratuite.
                </span>
              </div>
            </div>
          </div>
          
          {/* Bottom CTAs */}
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 bg-[#212746] h-[90px] flex items-center justify-center p-2.5 rounded-bl-xl">
              <p className="text-[#d0e957] text-base md:text-lg font-medium text-center underline max-w-[352px] cursor-pointer hover:text-[#ebff8c] transition-colors">
                Registrati per avere fino 12 ricerche gratuite mensili
              </p>
            </div>
            <div className="flex-1 bg-[#d0e957] h-[90px] flex items-center justify-center p-2.5 rounded-br-xl">
              <div className="text-[#212746] text-base md:text-lg font-medium text-center underline cursor-pointer hover:text-[#6d7bfc] transition-colors">
                <p>Go Premium! per ricerche illimitate</p>
                <p>e tanto altro</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recent Searches Section */}
      <section className="relative mt-[130px] flex flex-col items-center gap-8 px-6">
        {/* Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-[77px] h-[77px] relative">
            <Image src="/svg/layer-1.svg" alt="" fill className="object-contain" unoptimized />
          </div>
          <h2 className="font-medium text-[26px] text-[#212746] text-center tracking-[0.52px]">
            Ultime ricerche
          </h2>
        </div>

        {/* Search Cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-[1440px]">
          {[
            { role: "Consulente", company: "J.P. Morgan" },
            { role: "Product Manager", company: "Intesa Sanpaolo" },
            { role: "Data Scientist", company: "Nexi" },
            { role: "Account Manager", company: "Generali" },
            { role: "UX Designer", company: "Amazon" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#ebff8c] w-[280px] rounded-xl pt-[26px] pb-7 flex flex-col items-center gap-6 relative hover:shadow-lg transition-shadow"
            >
              {/* Close button */}
              <button className="absolute top-[11px] right-[12px] w-6 h-6 flex items-center justify-center text-[#212746] hover:text-[#6d7bfc] transition-colors">
                ✕
              </button>
              
              {/* Content */}
              <div className="font-medium text-xl text-[#212746] text-center leading-[30px] w-[273px]">
                <p>{item.role}</p>
                <p>in {item.company}</p>
              </div>
              
              {/* Button */}
              <button className="bg-[#212746] border border-[#212746] rounded-[40px] px-6 py-3 flex items-center gap-3 hover:bg-[#2d3560] transition-colors">
                <span className="font-medium text-[#f3f4ff] text-base">Scopri i risultati</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#f3f4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature 1: Career Choice */}
      <section className="relative mt-[200px] bg-white pt-[100px]">
        {/* Purple wave background */}
        <div className="absolute -left-[60px] top-[24px] w-full max-w-[1508px] h-[337px] scale-y-[-1]">
          <Image src="/svg/vector-7.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        
        <div className="relative flex flex-col lg:flex-row px-6 lg:px-[276px] max-w-[1440px] mx-auto gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 lg:w-1/2"
          >
            <h2 className="font-medium text-3xl md:text-4xl lg:text-[48px] text-[#212746] leading-[1.15] max-w-[435px]">
              <span>Scegli la miglior carriera </span>
              <span className="text-[#6d7bfc]">nell&apos;azienda</span>
              <span> che vuoi!</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-[24px] text-[#212746] leading-[30px] max-w-[437px]">
              <span className="font-medium text-[#6d7bfc]">Career Lab</span>
              <span> ti guida nella scoperta di nuovi percorsi di carriera che valorizzano il tuo profilo di competenze: scegli il tuo </span>
              <span className="font-medium">ruolo ideale o un&apos;azienda</span>
              <span> per cominciare l&apos;esplorazione!</span>
            </p>
          </motion.div>
          
          {/* Right - Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:absolute lg:right-0 lg:top-[-92px] w-full lg:w-[636px]"
          >
            <div className="bg-[#9fa9ff] w-full lg:w-[636px] h-[400px] lg:h-[504px] rounded-[20px] lg:rounded-l-[20px] lg:rounded-r-none relative">
              <div className="absolute left-4 lg:left-[67px] top-[60px] lg:top-[92px] right-4 lg:right-0 bottom-0 rounded-tl-xl shadow-[-2px_-2px_16px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                <Image 
                  src="/images/screen-1.png" 
                  alt="Career Explorer Screen" 
                  fill 
                  className="object-cover rounded-tl-xl"
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature 2: Insights */}
      <section className="relative bg-white pt-[300px] pb-[100px]">
        <div className="relative flex flex-col-reverse lg:flex-row justify-between px-6 lg:px-[200px] max-w-[1440px] mx-auto gap-12">
          {/* Left - Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[500px] h-[400px] lg:h-[450px]"
          >
            {/* Yellow circle */}
            <div className="bg-[#d0e957] w-[300px] lg:w-[417px] h-[300px] lg:h-[417px] rounded-[20px] absolute left-[20px] lg:left-[42px] top-[30px] lg:top-[34px]" />
            
            {/* Card 278 */}
            <div className="absolute left-[80px] lg:left-[122px] top-[80px] lg:top-[115px] w-[200px] lg:w-[263px] h-[180px] lg:h-[242px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]">
              <Image src="/images/group-278.png" alt="" fill className="object-contain" unoptimized />
            </div>
            
            {/* Card 277 */}
            <div className="absolute left-0 top-0 w-[140px] lg:w-[178px] h-[115px] lg:h-[146px] shadow-[2px_2px_20px_0px_rgba(0,0,0,0.15)]">
              <Image src="/images/group-277.png" alt="" fill className="object-contain" unoptimized />
            </div>
            
            {/* Card 276 */}
            <div className="absolute left-[220px] lg:left-[285px] top-[220px] lg:top-[288px] w-[160px] lg:w-[210px] h-[110px] lg:h-[140px] shadow-[2px_2px_20px_0px_rgba(0,0,0,0.15)]">
              <Image src="/images/group-276.png" alt="" fill className="object-contain" unoptimized />
            </div>
          </motion.div>
          
          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 lg:w-[435px]"
          >
            <h2 className="font-medium text-3xl md:text-4xl lg:text-[48px] text-[#212746] leading-[1.15]">
              <span>Ricevi insights </span>
              <span className="text-[#6d7bfc]">personalizzati</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-[24px] text-[#212746] leading-[30px] max-w-[358px]">
              <span>La </span>
              <span className="font-medium">nostra tecnologia</span>
              <span> mette a tua disposizione </span>
              <span className="font-medium text-[#6d7bfc]">informazioni uniche</span>
              <span> sulle aziende di tuo interesse, permettendoti di scegliere al meglio la prossima tappa della tua carriera.</span>
            </p>
            
            {/* CTA Button */}
            <button className="bg-[#6d7bfc] border border-[#212746] rounded-[40px] px-5 py-3 flex items-center gap-3 w-fit mt-4 hover:bg-[#5a69e8] transition-colors">
              <span className="font-medium text-white text-base">Registrati subito</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative bg-white py-[100px] px-6">
        <div className="flex flex-col items-center gap-6 max-w-[1440px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-medium text-3xl md:text-4xl lg:text-[48px] text-[#212746] text-center"
          >
            <span className="text-[#6d7bfc]">2 piani</span>
            <span> semplici e trasparenti</span>
          </motion.h2>
          <p className="text-lg md:text-xl text-[#212746] text-center leading-[26px] max-w-[871px]">
            <span>Che tu sia uno </span>
            <span className="font-medium text-[#6d7bfc]">Studente</span>
            <span> curioso di scoprire il mondo del lavoro o un </span>
            <span className="font-medium text-[#6d7bfc]">Professionista</span>
            <span> interessato a cercare attivamente una nuova opportunità di impiego, abbiamo la soluzione per te!</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-12 max-w-[1440px] mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#f3f4ff] w-full md:w-[352px] min-h-[543px] rounded-3xl p-6 flex flex-col gap-8 shadow-[1px_1px_2px_0px_rgba(0,12,70,0.1)] relative"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Image src="/images/user-icon.svg" alt="" width={26} height={26} unoptimized />
                  <span className="text-[36px] text-black">Registrato</span>
                </div>
                <p className="text-[14px] text-[#8d96ac]">
                  Ideale per chi vuole iniziare a orientarsi sul mercato di lavoro
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[14px] text-[#8d96ac]">€</span>
                <span className="text-[62px] text-black leading-[40px] mt-1">0</span>
                <span className="text-[14px] text-[#6d7bfc] ml-2 mt-8">/gratuito</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-[#c1c8d5]" />
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image src="/images/check-icon.svg" alt="" width={18} height={18} unoptimized />
                <span className="text-[16px] text-[#212746]">Account personale</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/images/check-icon.svg" alt="" width={18} height={18} unoptimized />
                <span className="text-[16px] text-[#212746]">12 ricerche al mese</span>
              </div>
            </div>
            
            <button className="absolute bottom-6 left-6 right-6 bg-[#6d7bfc] rounded-[40px] h-[46px] flex items-center justify-center gap-3 hover:bg-[#5a69e8] transition-colors">
              <span className="font-medium text-white text-base">Registrati subito</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#6d7bfc] border border-[#6d7bfc] w-full md:w-[353px] rounded-3xl p-6 flex flex-col gap-8 shadow-[1px_1px_2px_0px_rgba(0,12,70,0.1)]"
          >
            <div className="flex flex-col gap-[34px]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Image src="/images/gem-icon.svg" alt="" width={28} height={31} unoptimized />
                  <span className="text-[36px] text-white leading-[40px]">Premium</span>
                </div>
                <p className="text-[14px] text-[#f3f4ff] w-[250px]">
                  Ideale per chi attivamente cerca il lavoro
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[14px] text-[#c1c8d5]">€</span>
                <span className="text-[62px] text-white leading-[40px] mt-1">4,99</span>
                <span className="text-[14px] text-[#d0e957] ml-2 mt-8">/per sempre</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-white/30" />
            
            <div className="flex flex-col gap-4">
              {[
                "Account personale",
                "Ricerche illimitate per sempre",
                "Avvisi e notifiche sulle posizioni che ti interessano e Aziende che assumono",
                "Contatti diretti con i Recruiter",
                "Proposte di lavoro personalizzate",
                "Risultati personalizzati",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[18px] h-[18px] flex-shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9L7 13L15 5" stroke="#d0e957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[16px] text-white">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="bg-[#d0e957] rounded-[40px] h-[46px] flex items-center justify-center gap-3 w-full hover:bg-[#ebff8c] transition-colors">
              <span className="font-medium text-[#212746] text-base">Go Premium</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#212746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </div>
        
        <p className="font-medium text-base text-black text-center mt-8">
          Oppure continua con 3 ricerche gratuite!
        </p>
      </section>

      {/* Skill Development Section */}
      <section className="relative bg-white py-[100px] px-6">
        <div className="flex flex-col items-center gap-8 max-w-[1440px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-medium text-3xl md:text-4xl lg:text-[48px] text-[#212746] text-center"
          >
            <span>Fai decollare la </span>
            <span className="text-[#6d7bfc]">tua carriera</span>
          </motion.h2>
          <div className="text-lg md:text-xl lg:text-[24px] text-[#212746] text-center leading-[32px] max-w-[871px]">
            <p>Temi che il tuo profilo possa non essere all&apos;altezza del tuo lavoro ideale?</p>
            <p>
              <span>Niente paura! </span>
              <span className="font-medium text-[#6d7bfc]">Career Lab</span>
              <span> ti guida anche nello sviluppo delle competenze necessarie per avere le migliori probabilità di successo nella tua candidatura!</span>
            </p>
          </div>
        </div>
        
        {/* Balloon Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <div className="w-[100px] h-[108px] relative">
            <Image src="/images/balloon-icon.svg" alt="" fill className="object-contain" unoptimized />
          </div>
        </motion.div>
        
        {/* Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mx-auto mt-8 w-full max-w-[876px] h-[400px] md:h-[582px] shadow-[0px_-3px_26.4px_0px_rgba(0,0,0,0.15)]"
        >
          <Image 
            src="/images/career-explorer-skill.png" 
            alt="Career Explorer Skill Insights" 
            fill 
            className="object-cover"
            unoptimized
          />
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="relative bg-[#212746] py-10 px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-[1440px] mx-auto">
          {/* Logo Icon */}
          <div className="w-[73px] h-[89px] relative flex-shrink-0">
            <Image src="/images/logo-icon.png" alt="" fill className="object-contain" unoptimized />
          </div>
          
          {/* Text */}
          <div className="font-medium text-3xl md:text-4xl lg:text-[44px] text-white leading-[1.1] text-center lg:text-left">
            <p>
              <span>Dai un </span>
              <span className="text-[#ebff8c]">boost</span>
            </p>
            <p>alla tua carriera!</p>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-[20px] text-[#d0e957] leading-[24px] max-w-[419px] text-center lg:text-left">
            Scopri tutte le funzionalita&apos; del Career Lab! Go Premium per avere ricerche illimitate, notifiche per le posizioni che ti interessano e molto altro ancora!
          </p>
          
          {/* Button */}
          <button className="bg-[#d0e957] border border-[#212746] rounded-[40px] px-5 py-3 flex items-center gap-3 hover:bg-[#ebff8c] transition-colors">
            <span className="font-medium text-[#212746] text-base">Go Premium!</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#212746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
