'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreen2Props {
  onClose?: () => void;
  autoCloseDelay?: number;
}

export function SplashScreen2({ onClose, autoCloseDelay = 60000 }: SplashScreen2Props) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, autoCloseDelay);

    return () => clearTimeout(timer);
  }, [autoCloseDelay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="splash-screen-2 fixed inset-0 z-[100] bg-black overflow-hidden"
        >
          {/* Mobile: Full background image - optimized for mobile */}
          <div className="absolute inset-0 md:hidden overflow-hidden">
            <Image
              src="/images/splash-image-2-mobile.png"
              alt="Concert background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Desktop: Black background */}
          <div className="absolute inset-0 z-0 hidden md:block bg-black" />

          {/* Header bar - Logo left, Close right */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="mx-auto w-full px-[16px] md:px-[15px] md:max-w-[1100px] py-[16px] md:py-[24px] flex items-center justify-between">
              <Image
                src="/logos/freedom-logo-white-orange-blue.png"
                alt="Freedom Mobile"
                width={140}
                height={32}
                className="h-[32px] w-auto"
              />
              
              <button
                onClick={handleClose}
                className="flex items-center gap-1 md:gap-2 text-white/80 hover:text-white transition-colors text-xs md:text-sm"
              >
                <span>Close</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Content - 50/50 split */}
          <div className="hidden md:flex splash-screen-2__content relative z-10 h-full flex-row md:max-w-[1200px] md:min-h-[600px] md:max-h-[800px] md:mx-auto md:my-auto">
            {/* Left - Image (50%) */}
            <div className="splash-screen-2__image relative w-[50%] h-full flex items-center justify-center overflow-hidden">
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.2, x: -50 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src="/images/splash-image-2.png"
                  alt="Concert moment"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </div>

            {/* Right - Text Content (50%) */}
            <div className="splash-screen-2__text flex flex-col justify-center items-center text-center px-12 py-0 w-[50%]">
              {/* Title */}
              <h1 className="text-[#f26a21] text-[5rem] leading-none font-bold mb-2">
                250GB
              </h1>
              
              {/* Subtitle */}
              <p className="text-white text-[1.25rem] tracking-wider mb-6">
                GRANDSTAND SHOWTIME OFFER
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white/60 text-[1rem]">for</span>
                <span className="text-[#f26a21] text-[6rem] leading-none font-bold">$50</span>
                <div className="flex flex-col text-left">
                  <span className="text-white text-[1.25rem]">/mo.</span>
                  <span className="text-white/60 text-[0.875rem]">with</span>
                  <span className="text-white/60 text-[0.875rem]">Digital</span>
                  <span className="text-white/60 text-[0.875rem]">Discount.</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.a
                href="/plans/250gb"
                className="splash-screen-2__cta inline-block bg-[#f26a21] text-white px-10 py-4 rounded-full text-[1rem] mt-6"
                initial={{ backgroundColor: '#f26a21' }}
                whileHover={{ backgroundColor: '#ffffff', color: '#000000' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                Shop this plan
              </motion.a>

              {/* Disclaimer */}
              <p className="mt-6 text-white/40 text-xs max-w-[400px] leading-relaxed">
                Vivamus sit et tempor neque elit turpis duis platea. Ut est ut nunc nisl ut. Interdum cras aliquam facilisi proin elit porttitor proin nulla. Interdum eu in elementum.
              </p>
            </div>
          </div>

          {/* Mobile Content - Full screen overlay */}
          <div className="flex md:hidden flex-col justify-end items-center text-center h-full px-[16px] pb-[32px] pt-[80px] relative z-10">
            {/* Lockup Image - 150% width, centered */}
            <div className="w-[150%] mb-6 -mx-[25%]">
              <Image
                src="/images/lockup.png"
                alt="250GB $50/mo offer"
                width={600}
                height={300}
                className="w-full h-auto"
              />
            </div>

            {/* CTA Button */}
            <motion.a
              href="/plans/250gb"
              className="splash-screen-2__cta inline-block bg-[#f26a21] text-white px-10 py-4 rounded-full text-[1rem] w-full max-w-[280px]"
              initial={{ backgroundColor: '#f26a21' }}
              whileTap={{ scale: 0.98 }}
            >
              Shop this plan
            </motion.a>

            {/* Learn more link */}
            <a
              href="/plans/250gb"
              className="flex items-center gap-1 mt-4 hover:opacity-80 transition-opacity text-sm"
            >
              <span className="text-[#2E7DC1] underline underline-offset-4">Learn more</span>
              <svg className="w-4 h-4 text-[#DB5C05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
