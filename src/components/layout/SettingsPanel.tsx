'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { SplashType } from './AppShell';

interface SettingsPanelProps {
  splashEnabled: boolean;
  splashDuration: number;
  splashType: SplashType;
  onSplashEnabledChange: (enabled: boolean) => void;
  onSplashDurationChange: (duration: number) => void;
  onSplashTypeChange: (type: SplashType) => void;
}

const SPLASH_TYPES: { value: SplashType; label: string }[] = [
  { value: 'splash1', label: 'Splash Screen 1' },
  { value: 'splash2', label: 'Splash Screen 2' },
  { value: 'splash3', label: 'Splash Screen 3' },
];

export function SettingsPanel({
  splashEnabled,
  splashDuration,
  splashType,
  onSplashEnabledChange,
  onSplashDurationChange,
  onSplashTypeChange,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const durationOptions = [5, 10, 15, 20, 30];

  return (
    <div className="settings-panel relative">
      {/* Settings Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="settings-panel__trigger flex items-center justify-center w-6 h-6 hover:opacity-80 transition-opacity"
        aria-label="Settings"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Settings Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="settings-panel__dropdown absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-xl p-4 min-w-[250px] z-50"
          >
            <h3 className="text-sm font-medium mb-4 text-gray-700">Paramètres</h3>
            
            {/* Splash Type Selector */}
            <div className="settings-panel__option mb-4">
              <span className="text-sm text-gray-600 block mb-2">Type de Splash</span>
              <div className="flex flex-col gap-1">
                {SPLASH_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => onSplashTypeChange(type.value)}
                    className={`px-3 py-2 text-xs rounded-lg transition-colors text-left ${
                      splashType === type.value
                        ? 'bg-[#f26a21] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Splash Screen Toggle */}
            <div className="settings-panel__option flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Splash Screen</span>
              <button
                onClick={() => onSplashEnabledChange(!splashEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  splashEnabled ? 'bg-[#f26a21]' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                  animate={{ left: splashEnabled ? '28px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Splash Duration */}
            <div className="settings-panel__option">
              <span className="text-sm text-gray-600 block mb-2">Durée (secondes)</span>
              <div className="flex gap-2 flex-wrap items-center">
                {durationOptions.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => onSplashDurationChange(duration)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      splashDuration === duration
                        ? 'bg-[#f26a21] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {duration}s
                  </button>
                ))}
              </div>
              {/* Manual Input */}
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={splashDuration}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value >= 1 && value <= 60) {
                      onSplashDurationChange(value);
                    }
                  }}
                  className="w-16 px-2 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:border-[#f26a21]"
                />
                <span className="text-xs text-gray-500">secondes (1-60)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
