'use client';

interface NextButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export default function NextButton({ text, onClick, className = '' }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-[300px] bg-career-blue-500 py-4 px-6 flex items-center justify-center gap-3 hover:bg-career-blue-400 transition-all duration-300 group ${className}`}
    >
      <span className="text-white font-medium text-[18px]">{text}</span>

      {/* Triple chevron arrows */}
      <div className="flex items-center -ml-1">
        <svg
          width="37"
          height="25"
          viewBox="0 0 37.3772 24.8296"
          fill="none"
          className="text-white group-hover:translate-x-1 transition-transform"
        >
          <path d="M3.07412 1.08016L13.4013 11.4083C13.6668 11.6739 13.8163 12.0347 13.8163 12.4102C13.8162 12.7856 13.6667 13.1457 13.4013 13.4112L3.06338 23.7501L2.70889 24.1046L2.35537 23.7501L1.06045 22.4542L0.706932 22.1007L10.3974 12.4102L1.07021 3.08309L0.716698 2.7286L1.07021 2.37509L2.36709 1.08016L2.7206 0.726648L3.07412 1.08016Z" fill="currentColor" stroke="currentColor"/>
          <path d="M14.9763 1.08016L25.3035 11.4083C25.5689 11.6739 25.7185 12.0347 25.7185 12.4102C25.7184 12.7856 25.5689 13.1457 25.3035 13.4112L14.9656 23.7501L14.6111 24.1046L14.2576 23.7501L12.9626 22.4542L12.6091 22.1007L22.2996 12.4102L12.9724 3.08309L12.6189 2.7286L12.9724 2.37509L14.2693 1.08016L14.6228 0.726648L14.9763 1.08016Z" fill="currentColor" stroke="currentColor"/>
          <path d="M26.8795 1.06184L35.9264 10.1126L36.0728 10.2591V10.2747C36.5894 10.865 36.8775 11.6242 36.8775 12.4134C36.8775 13.2747 36.5353 14.1011 35.9264 14.7103L26.5142 24.1224L26.1598 23.7689L24.5113 22.1204L24.8648 21.7669L33.9234 12.7034L33.9752 12.64C34.0205 12.5721 34.0455 12.4914 34.0455 12.4085C34.0454 12.2983 34.0013 12.1925 33.9234 12.1146L24.524 2.71516L24.8766 2.36165L26.1715 1.06184L26.525 0.707349L26.8795 1.06184Z" fill="currentColor" stroke="currentColor"/>
        </svg>
      </div>
    </button>
  );
}
