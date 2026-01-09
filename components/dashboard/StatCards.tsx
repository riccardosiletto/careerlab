'use client';

interface StatCardsProps {
  stats: {
    totalEmployees: number;
    newHires: number;
    averageAge: number;
  };
  company: string;
  role: string;
}

export default function StatCards({ stats, company, role }: StatCardsProps) {
  return (
    <div className="flex gap-6 items-start">
      {/* Quanti sono */}
      <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6  self-stretch">
        <div className="bg-white flex items-center justify-center p-5 w-full">
          <p className="flex-1 font-medium text-xl text-[#212746]">
            Quanti sono?
          </p>
        </div>
        <div className="flex flex-col gap-5 items-start justify-center px-6 w-full">
          <div className="flex gap-1 items-end">
            <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
              {stats.totalEmployees}
            </p>
            {/* Trend Icon */}
            <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 8L13.5 24" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 14L13.5 8L20 14" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="font-normal text-base text-[#5A607F] leading-5">
            <span className="font-medium">Project Manager </span>
            attualmente assunti in<br />
            <span className="font-medium">{company}</span>
          </p>
        </div>
      </div>

      {/* Quanti ne assumono */}
      <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6  self-stretch">
        <div className="bg-white flex items-center justify-center p-5 w-full">
          <p className="flex-1 font-medium text-xl text-[#212746]">
            Quanti ne assumono?
          </p>
        </div>
        <div className="flex flex-col gap-5 items-start justify-center px-6 w-full">
          <div className="flex gap-[3px] items-end justify-center">
            {/* Up Arrow */}
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 25L15.5 5" stroke="#6D7BFC" strokeWidth="3" strokeLinecap="round"/>
              <path d="M7 13L15.5 5L24 13" stroke="#6D7BFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
              {stats.newHires}
            </p>
          </div>
          <p className="font-normal text-base text-[#5A607F] leading-5">
            Il team di <span className="font-medium">{company}</span> si è arricchito di <span className="font-medium">{stats.newHires} </span>nuovi<span className="font-medium"> Project Manager </span>negli ultimi 12 mesi!
          </p>
        </div>
      </div>

      {/* Che età hanno */}
      <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6  self-stretch">
        <div className="bg-white flex items-center justify-center p-5 w-full">
          <p className="flex-1 font-medium text-xl text-[#212746]">
            Che età hanno?
          </p>
        </div>
        <div className="flex flex-col gap-5 items-start justify-center px-6 w-full">
          <div className="flex gap-2 items-end font-medium text-[#6D7BFC]">
            <span className="text-[82px] text-[#9D52FF] leading-[72px]">
              {stats.averageAge}
            </span>
            <span className="text-[30px] leading-normal">
              anni
            </span>
          </div>
          <p className="font-normal text-base text-[#5A607F] leading-5">
            Età media dei <span className="font-medium">Project Manager</span> attualmente assunti in <span className="font-medium">{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}




