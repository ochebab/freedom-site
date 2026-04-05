'use client';

import { useState } from 'react';
import { Container } from './Container';
import { SettingsPanel } from './SettingsPanel';

const PROVINCES = ['AB', 'BC', 'MB', 'ON'] as const;
type Province = typeof PROVINCES[number];

interface TopBarProps {
  splashEnabled?: boolean;
  splashDuration?: number;
  onSplashEnabledChange?: (enabled: boolean) => void;
  onSplashDurationChange?: (duration: number) => void;
}

export function TopBar({
  splashEnabled = true,
  splashDuration = 10,
  onSplashEnabledChange,
  onSplashDurationChange,
}: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province>('ON');

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province);
    setIsDropdownOpen(false);
  };

  return (
    <div className="topbar hidden md:block h-[40px] bg-black text-white">
      <Container className="topbar__container h-full">
        <nav className="topbar__nav flex h-full items-center justify-end gap-6">
          
          {/* Province Selector + Settings */}
          <div className="topbar__province-settings flex items-center gap-3">
            {/* Province Selector */}
            <div className="topbar__province-selector relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="topbar__province-button flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
              >
                <span className="topbar__province-label">{selectedProvince}</span>
                <svg
                  className={`topbar__province-icon w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="topbar__province-dropdown absolute top-full right-0 mt-1 bg-white text-black rounded shadow-lg py-2 min-w-[120px] z-50">
                  {PROVINCES.map((province) => (
                    <button
                      key={province}
                      onClick={() => handleProvinceSelect(province)}
                      className={`topbar__province-option w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${selectedProvince === province ? 'bg-gray-50' : ''}`}
                    >
                      {province}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Settings Panel */}
            {onSplashEnabledChange && onSplashDurationChange && (
              <SettingsPanel
                splashEnabled={splashEnabled}
                splashDuration={splashDuration}
                onSplashEnabledChange={onSplashEnabledChange}
                onSplashDurationChange={onSplashDurationChange}
              />
            )}
          </div>

          {/* Find a Store Link */}
          <a
            href="#"
            className="topbar__link topbar__link--store flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          >
            <svg
              className="topbar__link-icon w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="topbar__link-text">Find a Store</span>
          </a>

          {/* Contact Us Link */}
          <a
            href="#"
            className="topbar__link topbar__link--contact text-sm hover:opacity-80 transition-opacity"
          >
            Contact Us
          </a>

        </nav>
      </Container>
    </div>
  );
}
