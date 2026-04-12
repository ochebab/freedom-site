'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreen3Props {
  onClose?: () => void;
  autoCloseDelay?: number;
}

export function SplashScreen3({ onClose, autoCloseDelay = 60000 }: SplashScreen3Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, autoCloseDelay);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (autoCloseDelay / 100));
        return newProgress > 0 ? newProgress : 0;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [autoCloseDelay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="splash-screen-3 fixed inset-0 z-[100] bg-white overflow-hidden"
        >
          {/* Header bar - Logo left, Close right */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="mx-auto w-full px-[16px] md:px-[15px] md:max-w-[1200px] py-[16px] md:py-[24px] flex items-center justify-between">
              <Image
                src="/logos/freedom-logo.png"
                alt="Freedom Mobile"
                width={140}
                height={32}
                className="h-[32px] w-auto"
              />
              
              <button
                onClick={handleClose}
                className="splash-screen-3__close flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <span className="hidden md:inline">Close</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Content - Image left, Copy right */}
          <div className="hidden md:flex splash-screen-3__content relative z-10 h-full flex-row md:max-w-[1200px] md:mx-auto md:my-auto items-center">
            {/* Left - Image (60%) */}
            <div className="splash-screen-3__image relative w-[60%] h-full flex items-center justify-center">
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.1, x: -30 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src="/images/splash-3-desktop.png"
                  alt="iPhone 17 Pro"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </motion.div>
            </div>

            {/* Right - Text Content (40%) */}
            <div className="splash-screen-3__text flex flex-col justify-center items-center text-center px-8 py-0 w-[40%]">
              {/* Category */}
              <span className="text-gray-500 text-sm tracking-wider mb-2">APPLE</span>
              
              {/* Title */}
              <h1 className="text-black text-[2.5rem] leading-tight mb-2">
                Get iPhone 17 Pro.
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-0 mb-2">
                <span className="text-[#f26a21] text-[1rem] align-top">$</span>
                <span className="text-[#f26a21] text-[4rem] leading-none">24</span>
                <span className="text-[#f26a21] text-[1.5rem]">/mo.</span>
              </div>

              {/* Subtitle */}
              <p className="text-black text-sm mb-1">
                with TradeUp on a $50/mo. plan.
              </p>
              <p className="text-gray-500 text-xs mb-6">
                2-year term required<sup>2</sup>
              </p>

              {/* CTA Button */}
              <motion.a
                href="/shop/iphone-17-pro"
                className="splash-screen-3__cta inline-block bg-[#f26a21] text-white px-10 py-4 rounded-full text-[1rem]"
                initial={{ backgroundColor: '#f26a21' }}
                whileHover={{ backgroundColor: '#d55a1a' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                Shop iPhone 17 Pro
              </motion.a>

              {/* Learn more link */}
              <a
                href="/shop/iphone-17-pro"
                className="flex items-center gap-1 mt-4 hover:opacity-80 transition-opacity text-sm"
              >
                <span className="text-[#2E7DC1] underline underline-offset-4">Learn more</span>
                <svg className="w-4 h-4 text-[#DB5C05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Disclaimer */}
              <p className="mt-6 text-gray-400 text-xs max-w-[300px] leading-relaxed">
                Vivamus sit et tempor neque elit turpis duis platea. Ut est ut nunc nisl ut.
              </p>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex md:hidden flex-col items-center text-center h-full pt-[70px] pb-[60px] px-[16px] relative z-10">
            {/* Image */}
            <div className="relative w-full flex-shrink-0" style={{ height: '280px' }}>
              <Image
                src="/images/splash-3-mobile.png"
                alt="iPhone 17 Pro"
                fill
                className="object-contain object-center"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center mt-4">
              {/* Category */}
              <span className="text-gray-500 text-xs tracking-wider mb-1">APPLE</span>
              
              {/* Title */}
              <h1 className="text-black text-[1.75rem] leading-tight mb-1">
                Get iPhone 17 Pro.
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-0 mb-1">
                <span className="text-[#f26a21] text-[0.875rem] align-top">$</span>
                <span className="text-[#f26a21] text-[3rem] leading-none">24</span>
                <span className="text-[#f26a21] text-[1.25rem]">/mo.</span>
              </div>

              {/* Subtitle */}
              <p className="text-black text-sm mb-0.5">
                with TradeUp on a $50/mo. plan.
              </p>
              <p className="text-gray-500 text-xs mb-4">
                2-year term required<sup>1</sup>
              </p>

              {/* CTA Button */}
              <motion.a
                href="/shop/iphone-17-pro"
                className="splash-screen-3__cta inline-block bg-[#f26a21] text-white px-8 py-3 rounded-full text-sm w-full max-w-[280px]"
                whileTap={{ scale: 0.98 }}
              >
                Shop iPhone 17 Pro
              </motion.a>

              {/* Learn more link */}
              <a
                href="/shop/iphone-17-pro"
                className="flex items-center gap-1 mt-3 hover:opacity-80 transition-opacity text-sm"
              >
                <span className="text-[#2E7DC1] underline underline-offset-4">Learn more</span>
                <svg className="w-4 h-4 text-[#DB5C05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Disclaimer */}
              <p className="mt-4 text-gray-400 text-[10px] max-w-[300px] leading-relaxed px-4">
                Vivamus sit et tempor neque elit turpis duis platea. Ut est ut nunc nisl ut. Interdum cras aliquam facilisi proin elit.
              </p>
            </div>

            {/* Progress Bar - Mobile only */}
            <div className="absolute bottom-[20px] left-[16px] right-[16px]">
              <div className="w-full h-[3px] bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#f26a21]"
                  initial={{ width: '100%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
