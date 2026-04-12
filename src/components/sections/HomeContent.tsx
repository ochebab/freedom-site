'use client';

import { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { TertiaryNav, defaultTertiaryNavItems } from './TertiaryNav';
import { SplashScreen } from './SplashScreen';
import { SplashScreen2 } from './SplashScreen2';
import { SplashScreen3 } from './SplashScreen3';
import { useSplashSettings } from '@/components/layout';
import type { HeroSlideData } from './HeroSlide';

interface HomeContentProps {
  heroSlides: HeroSlideData[];
}

export function HomeContent({ heroSlides }: HomeContentProps) {
  const { splashEnabled, splashDuration, splashType } = useSplashSettings();
  const [showSplash, setShowSplash] = useState(true);

  const renderSplashScreen = () => {
    const props = {
      onClose: () => setShowSplash(false),
      autoCloseDelay: splashDuration * 1000,
    };

    switch (splashType) {
      case 'splash2':
        return <SplashScreen2 {...props} />;
      case 'splash3':
        return <SplashScreen3 {...props} />;
      case 'splash1':
      default:
        return <SplashScreen {...props} />;
    }
  };

  return (
    <>
      {showSplash && splashEnabled && renderSplashScreen()}
      <HeroCarousel slides={heroSlides} />
      <TertiaryNav items={defaultTertiaryNavItems} />
    </>
  );
}
