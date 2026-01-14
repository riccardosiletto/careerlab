'use client';

import CompareButton from './CompareButton';

type ViewType = 'attuali' | 'passati' | 'entrambi';

interface ViewSwitcherProps {
  value: ViewType;
  onChange: (value: ViewType) => void;
  showCompare?: boolean;
}

export default function ViewSwitcher({ value, onChange, showCompare = true }: ViewSwitcherProps) {
  const options: { key: ViewType; label: string }[] = [
    { key: 'attuali', label: 'Attuali' },
    { key: 'passati', label: 'Passati' },
    { key: 'entrambi', label: 'Tutti' },
  ];

  return (
    <div className="flex items-center gap-3">
      {showCompare && <CompareButton />}
      <div className="flex items-center bg-[#F5F7FA] rounded-full p-1">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${value === option.key
                ? 'bg-white text-[#212746] shadow-sm'
                : 'text-[#8D96AC] hover:text-[#212746]'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { ViewType };
