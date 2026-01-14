'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangePreset {
  label: string;
  days: number;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  presets?: DateRangePreset[];
}

// Default presets
const defaultPresets: DateRangePreset[] = [
  { label: 'Ultimi 7 giorni', days: 7 },
  { label: 'Ultimi 30 giorni', days: 30 },
  { label: 'Ultimi 90 giorni', days: 90 },
  { label: 'Questo mese', days: -1 }, // Special case: current month
];

// Helper to format date
function formatDate(date: Date): string {
  return date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Helper to format input date
function formatInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to calculate date range from days
function getRangeFromDays(days: number): DateRange {
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  if (days === -1) {
    // This month
    const start = new Date(end.getFullYear(), end.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    return { start, end };
  }

  const start = new Date();
  start.setDate(start.getDate() - days + 1);
  start.setHours(0, 0, 0, 0);

  return { start, end };
}

// Check if two date ranges are equal
function areRangesEqual(a: DateRange, b: DateRange): boolean {
  return (
    a.start.toDateString() === b.start.toDateString() &&
    a.end.toDateString() === b.end.toDateString()
  );
}

// Calendar icon
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7H16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Chevron icon
function ChevronIcon({ direction }: { direction: 'down' | 'up' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform ${direction === 'up' ? 'rotate-180' : ''}`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DateRangePicker({
  value,
  onChange,
  presets = defaultPresets,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customStart, setCustomStart] = useState(formatInputDate(value.start));
  const [customEnd, setCustomEnd] = useState(formatInputDate(value.end));
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustom(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find active preset
  const activePreset = presets.find((preset) => {
    const presetRange = getRangeFromDays(preset.days);
    return areRangesEqual(presetRange, value);
  });

  // Handle preset selection
  const handlePresetSelect = (preset: DateRangePreset) => {
    const range = getRangeFromDays(preset.days);
    onChange(range);
    setIsOpen(false);
    setShowCustom(false);
  };

  // Handle custom date apply
  const handleApplyCustom = () => {
    const start = new Date(customStart);
    start.setHours(0, 0, 0, 0);
    const end = new Date(customEnd);
    end.setHours(23, 59, 59, 999);

    if (start <= end) {
      onChange({ start, end });
      setIsOpen(false);
      setShowCustom(false);
    }
  };

  // Display text
  const displayText = activePreset
    ? activePreset.label
    : `${formatDate(value.start)} - ${formatDate(value.end)}`;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 bg-white border rounded-lg
          transition-all hover:border-[#6D7BFC] focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20
          ${isOpen ? 'border-[#6D7BFC] ring-2 ring-[#6D7BFC]/20' : 'border-[#E8EAF8]'}
        `}
      >
        <span className="text-[#6D7BFC]">
          <CalendarIcon />
        </span>
        <span className="text-sm font-medium text-[#212746]">{displayText}</span>
        <span className="text-[#8D96AC]">
          <ChevronIcon direction={isOpen ? 'up' : 'down'} />
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-[#E8EAF8] rounded-lg shadow-lg z-50 min-w-[280px]">
          {/* Presets */}
          <div className="p-2">
            {presets.map((preset) => {
              const isActive = activePreset === preset;
              return (
                <button
                  key={preset.label}
                  onClick={() => handlePresetSelect(preset)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                    ${
                      isActive
                        ? 'bg-[#6D7BFC] text-white font-medium'
                        : 'text-[#212746] hover:bg-[#F5F6FF]'
                    }
                  `}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-[#E8EAF8]" />

          {/* Custom range toggle */}
          <div className="p-2">
            <button
              onClick={() => setShowCustom(!showCustom)}
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between
                ${showCustom ? 'bg-[#F5F6FF] text-[#6D7BFC]' : 'text-[#5A607F] hover:bg-[#F5F6FF]'}
              `}
            >
              <span>Personalizzato</span>
              <ChevronIcon direction={showCustom ? 'up' : 'down'} />
            </button>

            {/* Custom date inputs */}
            {showCustom && (
              <div className="mt-3 px-3 pb-2">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5A607F] mb-1">Da</label>
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      max={customEnd}
                      className="w-full px-3 py-2 border border-[#E8EAF8] rounded-md text-sm text-[#212746]
                        focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A607F] mb-1">A</label>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      min={customStart}
                      max={formatInputDate(new Date())}
                      className="w-full px-3 py-2 border border-[#E8EAF8] rounded-md text-sm text-[#212746]
                        focus:outline-none focus:ring-2 focus:ring-[#6D7BFC]/20 focus:border-[#6D7BFC]"
                    />
                  </div>
                  <button
                    onClick={handleApplyCustom}
                    className="w-full py-2 bg-[#6D7BFC] text-white text-sm font-semibold rounded-md
                      hover:bg-[#5A6AEB] transition-colors"
                  >
                    Applica
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
