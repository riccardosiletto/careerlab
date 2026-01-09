"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-[1440px] mx-auto">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="px-6 py-4">
          <Link href="/" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/careerlab-logo-full.png"
              alt="CareerLab"
              width={200}
              height={80}
              style={{ height: 'auto' }}
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-6 bg-white pl-[42px] pr-6 py-6">
          <div className="flex items-center gap-6">
            <button className="px-4 py-2 border-2 border-[#D0E957] rounded-3xl">
              <span className="font-medium text-[16px] text-[#5A607F]">Esplora Carriere</span>
            </button>
            <button className="px-4 py-2">
              <span className="text-[16px] text-[#8D96AC]">Per Aziende</span>
            </button>
            <button className="px-4 py-2">
              <span className="text-[16px] text-[#8D96AC]">Per Università</span>
            </button>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-end gap-3 absolute right-0 top-5">
          <button className="px-3 py-2 bg-[#EBFF8C] rounded-3xl">
            <span className="font-medium text-[14px] text-[#212746]">Vedi i piani</span>
          </button>
          <button className="px-4 py-2 border-2 border-[#6D7BFC] rounded-[25px]">
            <span className="font-medium text-[14px] text-[#212746]">Registrati</span>
          </button>
          <div className="px-1 py-2">
            <span className="font-medium text-[14px] text-[#6D7BFC]">Login</span>
          </div>
        </div>
      </div>
    </header>
  );
}
