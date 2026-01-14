'use client';

import { useState } from 'react';

export default function CompareButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-2 py-1.5 transition-colors text-sm font-medium text-[#6D7BFC] hover:text-[#5A68E0]"
      >
        Confronta
        {/* Compare/Benchmark icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 14L12 9L16 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 8H21V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Premium Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium badge */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6D7BFC] to-[#5A68E0] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-[#212746] text-center mb-3">
              Funzionalità Premium
            </h3>

            {/* Description */}
            <p className="text-[#8D96AC] text-center mb-6 leading-relaxed">
              La funzione <span className="font-semibold text-[#212746]">Confronta</span> ti permette di comparare i dati con altre aziende e benchmark di settore. Sblocca questa funzionalità con un piano Premium.
            </p>

            {/* Features list */}
            <div className="bg-[#F5F7FA] rounded-xl p-4 mb-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-[#212746]">
                  <svg className="w-5 h-5 text-[#B6DC00] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Confronto con competitor diretti
                </li>
                <li className="flex items-center gap-3 text-sm text-[#212746]">
                  <svg className="w-5 h-5 text-[#B6DC00] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Benchmark di settore
                </li>
                <li className="flex items-center gap-3 text-sm text-[#212746]">
                  <svg className="w-5 h-5 text-[#B6DC00] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Report personalizzati
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-5 py-3 rounded-full border border-[#E8EAF8] text-[#8D96AC] font-medium hover:bg-[#F5F7FA] transition-colors"
              >
                Chiudi
              </button>
              <button
                onClick={() => {
                  // TODO: Navigate to pricing page
                  setShowModal(false);
                }}
                className="flex-1 px-5 py-3 rounded-full bg-[#6D7BFC] hover:bg-[#5A68E0] text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Scopri Premium
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
