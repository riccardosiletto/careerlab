'use client';

export default function PremiumBanner() {
  return (
    <div className="bg-[#6D7BFC] flex items-center justify-between px-6 py-3 rounded-xl w-full">
      {/* Left Section */}
      <div className="flex gap-5 items-center">
        {/* Rocket Illustration - same as InfoCards banner */}
        <div className="w-[84px] h-[84px] flex-shrink-0">
          <img src="/svg/layer-1.svg" alt="Rocket" className="w-full h-full object-contain" />
        </div>

        {/* Title */}
        <p className="font-medium text-[26px] text-[#D0E957] leading-[30px] tracking-[0.52px] w-[187px]">
          Sblocca tutte le funzionalità!
        </p>
      </div>

      {/* Description */}
      <p className="font-normal text-base text-white leading-5 tracking-[0.64px] w-[569px]">
        Go Premium per avere ricerche illimitate per le posizioni che ti interessano e molto altro ancora!
      </p>

      {/* CTA Button */}
      <button className="bg-[#D0E957] flex gap-3 items-center justify-center px-5 py-3 rounded-full hover:bg-[#E5F984] transition-colors">
        <span className="font-medium text-base text-[#212746] text-center">
          Go Premium
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#212746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}




