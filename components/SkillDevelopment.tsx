"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SkillDevelopment() {
    return (
        <section className="relative bg-[#F0F3FF] py-20 overflow-hidden">
            {/* Grid pattern background */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            <div className="w-[1440px] mx-auto relative">

                {/* Rocket Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="w-[99px] h-[108px]">
                        <svg viewBox="0 0 99 108" fill="none" className="w-full h-full">
                            {/* Rocket body */}
                            <path d="M49.5 10 L65 45 L65 75 L49.5 85 L34 75 L34 45 Z" fill="#6D7BFC" />
                            {/* Rocket top */}
                            <path d="M49.5 0 L65 25 L34 25 Z" fill="#D0E957" />
                            {/* Rocket fins */}
                            <path d="M30 60 L20 80 L34 70 Z" fill="#9FA9FF" />
                            <path d="M69 60 L79 80 L65 70 Z" fill="#9FA9FF" />
                            {/* Rocket window */}
                            <circle cx="49.5" cy="45" r="10" fill="#F3F4FF" />
                            {/* Flames */}
                            <path d="M40 85 L49.5 108 L59 85" fill="#EBFF8C" />
                            <path d="M44 85 L49.5 100 L55 85" fill="#D0E957" />
                        </svg>
                    </div>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 px-[288px]"
                >
                    <h2 className="text-[36px] font-normal text-[#212746] mb-6">
                        Fai decollare la tua carriera
                    </h2>
                    <p className="text-[20px] text-[#5A607F] leading-relaxed">
                        Temi che il tuo profilo possa non essere all&apos;altezza del tuo lavoro ideale? Niente paura! Career Lab ti guida anche nello sviluppo delle competenze necessarie per avere le migliori probabilità di successo nella tua candidatura!
                    </p>
                </motion.div>



                {/* Career Explorer Screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mx-auto w-[876px] h-[582px]"
                >
                    <div className="relative w-full h-full bg-white rounded-3xl shadow-feature overflow-hidden">
                        <Image
                            src="/images/career-explorer.png"
                            alt="Career Explorer - Skill Insights"
                            fill
                            className="object-cover rounded-3xl"
                            unoptimized
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
