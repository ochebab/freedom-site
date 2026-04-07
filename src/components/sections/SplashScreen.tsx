'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onClose?: () => void;
  autoCloseDelay?: number;
}

export function SplashScreen({ onClose, autoCloseDelay = 10000 }: SplashScreenProps) {
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
          className="splash-screen fixed inset-0 z-[100] bg-black overflow-hidden"
        >
          {/* Aurora Borealis Effect - Full page background (GPU optimized) */}
          <div className="absolute inset-0 z-0 will-change-transform">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00273F] via-black to-black" />
            
            {/* Aurora Layer 1 - Slow wave (blue) */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 20% 40%, #00273F 0%, transparent 50%)',
                transform: 'translateZ(0)',
              }}
              animate={{
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Aurora Layer 2 - Medium wave (blue) */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{
                background: 'radial-gradient(ellipse 70% 45% at 80% 60%, #00273F 0%, transparent 45%)',
                transform: 'translateZ(0)',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            
            {/* Aurora Layer - Turquoise accent */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{
                background: 'radial-gradient(ellipse 55% 40% at 35% 50%, #0891b2 0%, transparent 50%)',
                transform: 'translateZ(0)',
              }}
              animate={{
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8,
              }}
            />
            
            {/* Aurora Layer - Orange accent (subtle, right side) */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{
                background: 'radial-gradient(ellipse 40% 35% at 75% 45%, #f26a21 0%, transparent 50%)',
                transform: 'translateZ(0)',
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
            
            {/* Aurora Layer - Orange glow (bottom right, very subtle) */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{
                background: 'radial-gradient(ellipse 50% 40% at 90% 80%, #c2410c 0%, transparent 45%)',
                transform: 'translateZ(0)',
              }}
              animate={{
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3,
              }}
            />
            
            {/* Aurora Layer - Top glow */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 will-change-transform"
              style={{
                background: 'linear-gradient(180deg, #00273F 0%, transparent 100%)',
                transform: 'translateZ(0)',
              }}
              animate={{
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </div>

          {/* Content - Image takes full height including header area */}
          <div className="splash-screen__content relative z-10 h-full flex flex-col md:flex-row">
            {/* Left - Image with TAKEOVER effect */}
            <div className="splash-screen__image relative w-full md:w-[60%] flex-1 md:flex-none md:h-full flex items-center justify-center overflow-hidden">
              {/* Image with takeover effect */}
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.4, x: -80 }}
                animate={{ scale: 1.15, x: 0 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src="/images/splash-image-1.png"
                  alt="Samsung Galaxy Z Flip5"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </motion.div>
            </div>

            {/* Mobile separator */}
            <div className="w-[70%] h-[1px] bg-white/20 mx-auto md:hidden flex-shrink-0" />

            {/* Right - Text Content - centered, shifted left on desktop */}
            <div className="splash-screen__text flex flex-col justify-start md:justify-center items-center text-center px-6 md:px-16 lg:px-24 pt-3 pb-[5px] md:py-0 w-full md:w-[40%] md:-ml-10 flex-shrink-0">
              {/* Samsung Logo */}
              <Image
                src="/images/samsung-logo-white.webp"
                alt="Samsung"
                width={120}
                height={24}
                className="h-[20px] md:h-[24px] w-auto mb-4"
              />
              
              {/* Title */}
              <h1 className="text-white text-[1.75rem] md:text-[4rem] leading-none mb-4 md:mb-6">
                Get the Samsung<br />Galaxy Z Flip5.
              </h1>

              {/* Price */}
              <div className="mb-2 md:mb-3">
                <span className="text-[#f26a21] text-[2.25rem] md:text-[4rem] leading-none">$24</span>
                <span className="text-[#f26a21] text-[1.25rem] md:text-[2rem]">/mo.</span>
              </div>

              {/* Subtitle */}
              <p className="text-white text-[0.8125rem] md:text-[1rem] mb-1">
                with TradeUp on a $50/mo. plan.
              </p>
              <p className="text-white/50 text-[0.6875rem] md:text-[0.8125rem] mb-4 md:mb-8">
                2-year term required.
              </p>

              {/* CTA Button - Pill shape with hover animation */}
              <motion.a
                href="/samsung-galaxy-z-flip5"
                className="splash-screen__cta inline-block bg-[#f26a21] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-[0.875rem] md:text-[0.9375rem]"
                initial={{ backgroundColor: '#f26a21' }}
                whileHover={{ backgroundColor: '#ffffff', color: '#000000' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                Shop Samsung Galaxy z Flip 5
              </motion.a>

              {/* Continue to website link */}
              <button
                onClick={handleClose}
                className="splash-screen__skip mt-3 md:mt-6 text-white/60 text-xs md:text-sm hover:text-white transition-colors underline underline-offset-4"
              >
                Continue to website
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
