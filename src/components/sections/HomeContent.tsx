'use client';

import { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { TertiaryNav, defaultTertiaryNavItems } from './TertiaryNav';
import { SplashScreen } from './SplashScreen';
import { useSplashSettings } from '@/components/layout';
import type { HeroSlideData } from './HeroSlide';

interface HomeContentProps {
  heroSlides: HeroSlideData[];
}

export function HomeContent({ heroSlides }: HomeContentProps) {
  const { splashEnabled, splashDuration } = useSplashSettings();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && splashEnabled && (
        <SplashScreen 
          onClose={() => setShowSplash(false)} 
          autoCloseDelay={splashDuration * 1000}
        />
      )}
      <HeroCarousel slides={heroSlides} />
      <TertiaryNav items={defaultTertiaryNavItems} />
    </>
  );
}
