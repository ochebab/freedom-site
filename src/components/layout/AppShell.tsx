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
  const [splashDuration, setSplashDuration] = useState(10);
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
      } catch (e) {
        console.error('Failed to parse splash settings', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ splashEnabled, splashDuration }));
    }
  }, [splashEnabled, splashDuration, isLoaded]);

  const handleSplashEnabledChange = (enabled: boolean) => {
    setSplashEnabled(enabled);
  };

  const handleSplashDurationChange = (duration: number) => {
    setSplashDuration(duration);
  };

  return (
    <>
      <TopBar
        splashEnabled={splashEnabled}
        splashDuration={splashDuration}
        onSplashEnabledChange={handleSplashEnabledChange}
        onSplashDurationChange={handleSplashDurationChange}
      />
      <MainNav />
      <SplashContext.Provider value={{ splashEnabled, splashDuration }}>
        {children}
      </SplashContext.Provider>
    </>
  );
}

import { createContext, useContext } from 'react';

interface SplashContextType {
  splashEnabled: boolean;
  splashDuration: number;
}

export const SplashContext = createContext<SplashContextType>({
  splashEnabled: true,
  splashDuration: 10,
});

export function useSplashSettings() {
  return useContext(SplashContext);
}
