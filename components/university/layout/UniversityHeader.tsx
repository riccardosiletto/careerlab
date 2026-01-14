'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import type { University, UniversityUser } from '@/types/university';

/**
 * Props for UniversityHeader component
 */
interface UniversityHeaderProps {
  university: University;
  user: UniversityUser;
  notificationCount?: number;
}

/**
 * UniversityHeader - Fixed header component for the university dashboard
 *
 * Features:
 * - University logo and name on the left (aligned with sidebar)
 * - Notification bell with badge
 * - User avatar with dropdown menu
 */
export default function UniversityHeader({
  university,
  user,
  notificationCount = 0,
}: UniversityHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#212746] flex items-center justify-between pr-10 py-3 h-[72px] fixed top-0 left-0 right-0 z-50">
      {/* Left section - Logo & University Name */}
      <div className="w-[286px] flex items-center gap-4 pl-6">
        <Link href="/university" className="flex items-center gap-3">
          {university.logo ? (
            <div className="h-10 w-10 relative rounded-lg overflow-hidden bg-white/10">
              <Image
                src={university.logo}
                alt={university.name}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-lg bg-[#6D7BFC] flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {university.shortName?.[0] || university.name[0]}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-white font-semibold text-base leading-tight">
              {university.shortName || university.name}
            </span>
            <span className="text-[#8D96AC] text-xs leading-tight">
              Career Lab
            </span>
          </div>
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={`Notifiche${notificationCount > 0 ? ` (${notificationCount} nuove)` : ''}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#FF6B6B] text-white text-xs font-medium rounded-full flex items-center justify-center">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>

        {/* User Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            {user.avatar ? (
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 ring-offset-2 ring-offset-[#212746]">
                <Image
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#6D7BFC] ring-2 ring-white/30 ring-offset-2 ring-offset-[#212746] flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              </div>
            )}
            <svg
              className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#E8EAF8] py-2 z-50">
              <div className="px-4 py-3 border-b border-[#E8EAF8]">
                <p className="text-sm font-medium text-[#212746]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-[#8D96AC] mt-0.5">{user.email}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-medium bg-[#6D7BFC]/10 text-[#6D7BFC] rounded">
                  {user.role}
                </span>
              </div>
              <div className="py-1">
                <Link
                  href="/university/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[#212746] hover:bg-[#F5F7FA] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Impostazioni
                </Link>
                <Link
                  href="/university/help"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[#212746] hover:bg-[#F5F7FA] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Aiuto
                </Link>
              </div>
              <div className="border-t border-[#E8EAF8] py-1">
                <button
                  onClick={() => {
                    // Handle logout
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#FF6B6B] hover:bg-[#FFF5F5] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Esci
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
