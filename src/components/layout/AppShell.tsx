'use client';

import { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { MainNav } from './MainNav';

const STORAGE_KEY = 'freedom-splash-settings';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [splashEnabled, setSplashEnabled] = useState(true);
  const [splashDuration, setSplashDuration] = useState(60);
  const [splashType, setSplashType] = useState<SplashType>('splash1');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        if (typeof settings.splashEnabled === 'boolean') {
          setSplashEnabled(settings.splashEnabled);
        }
        if (typeof settings.splashDuration === 'number') {
          setSplashDuration(settings.splashDuration);
        }
        if (settings.splashType) {
          setSplashType(settings.splashType);
        }
      } catch (e) {
        console.error('Failed to parse splash settings', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ splashEnabled, splashDuration, splashType }));
    }
  }, [splashEnabled, splashDuration, splashType, isLoaded]);

  const handleSplashEnabledChange = (enabled: boolean) => {
    setSplashEnabled(enabled);
  };

  const handleSplashDurationChange = (duration: number) => {
    setSplashDuration(duration);
  };

  const handleSplashTypeChange = (type: SplashType) => {
    setSplashType(type);
  };

  return (
    <>
      <TopBar
        splashEnabled={splashEnabled}
        splashDuration={splashDuration}
        splashType={splashType}
        onSplashEnabledChange={handleSplashEnabledChange}
        onSplashDurationChange={handleSplashDurationChange}
        onSplashTypeChange={handleSplashTypeChange}
      />
      <MainNav
        splashEnabled={splashEnabled}
        splashDuration={splashDuration}
        splashType={splashType}
        onSplashEnabledChange={handleSplashEnabledChange}
        onSplashDurationChange={handleSplashDurationChange}
        onSplashTypeChange={handleSplashTypeChange}
      />
      <SplashContext.Provider value={{ splashEnabled, splashDuration, splashType }}>
        {children}
      </SplashContext.Provider>
    </>
  );
}

import { createContext, useContext } from 'react';

export type SplashType = 'splash1' | 'splash2' | 'splash3';

interface SplashContextType {
  splashEnabled: boolean;
  splashDuration: number;
  splashType: SplashType;
}

export const SplashContext = createContext<SplashContextType>({
  splashEnabled: true,
  splashDuration: 60,
  splashType: 'splash1',
});

export function useSplashSettings() {
  return useContext(SplashContext);
}
