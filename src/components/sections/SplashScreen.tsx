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
          className="splash-screen fixed inset-0 z-[100] bg-black"
        >
          {/* Content - Image takes full height including header area */}
          <div className="splash-screen__content h-full flex flex-col md:flex-row">
            {/* Left - Image with TAKEOVER effect + Aurora Borealis */}
            <div className="splash-screen__image relative w-full md:w-[60%] h-full bg-black overflow-hidden">
              {/* Aurora Borealis Effect - Multiple animated gradient layers */}
              <div className="absolute inset-0 z-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00273F] via-black to-black" />
                
                {/* Aurora Layer 1 - Slow wave */}
                <motion.div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 20% 40%, #00273F 0%, transparent 50%)',
                  }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Aurora Layer 2 - Medium wave */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'radial-gradient(ellipse 60% 40% at 70% 60%, #00273F 0%, transparent 40%)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1.1, 1, 1.1],
                    x: [-20, 20, -20],
                    y: [10, -10, 10],
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
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(ellipse 50% 35% at 40% 50%, #0891b2 0%, transparent 45%)',
                  }}
                  animate={{
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.15, 1],
                    x: [10, -15, 10],
                    y: [-5, 15, -5],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.8,
                  }}
                />
                
                {/* Aurora Layer 3 - Fast shimmer with turquoise */}
                <motion.div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, #00273F 25%, #0e7490 45%, transparent 60%, #00273F 80%, transparent 100%)',
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />
                
                {/* Aurora Layer 4 - Top glow */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1/2"
                  style={{
                    background: 'linear-gradient(180deg, #00273F 0%, transparent 100%)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                  }}
                />
              </div>

              {/* Image with takeover effect */}
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ scale: 1.4, x: -80 }}
                animate={{ scale: 1.15, x: 0 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src="/images/splash-image-1.png"
                  alt="Samsung Galaxy Z Flip5"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </div>

            {/* Right - Text Content - centered, shifted left on desktop */}
            <div className="splash-screen__text flex flex-col justify-center items-center text-center px-8 md:px-16 lg:px-24 py-8 md:py-0 w-full md:w-[40%] md:-ml-10">
              {/* Samsung Logo */}
              <Image
                src="/images/samsung-logo-white.webp"
                alt="Samsung"
                width={120}
                height={24}
                className="h-[20px] md:h-[24px] w-auto mb-4"
              />
              
              {/* Title */}
              <h1 className="text-white text-[2.5rem] md:text-[4rem] leading-none mb-6">
                Get the Samsung<br />Galaxy Z Flip5.
              </h1>

              {/* Price */}
              <div className="mb-3">
                <span className="text-[#f26a21] text-[3rem] md:text-[4rem] leading-none">$24</span>
                <span className="text-[#f26a21] text-[1.5rem] md:text-[2rem]">/mo.</span>
              </div>

              {/* Subtitle */}
              <p className="text-white text-[0.9375rem] md:text-[1rem] mb-1">
                with TradeUp on a $50/mo. plan.
              </p>
              <p className="text-white/50 text-[0.75rem] md:text-[0.8125rem] mb-8">
                2-year term required.
              </p>

              {/* CTA Button - Pill shape with hover animation */}
              <motion.a
                href="/samsung-galaxy-z-flip5"
                className="splash-screen__cta inline-block bg-[#f26a21] text-white px-8 py-4 rounded-full text-[0.9375rem]"
                initial={{ backgroundColor: '#f26a21' }}
                whileHover={{ backgroundColor: '#ffffff', color: '#000000' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                Shop Samsung Galaxy z Flip 5
              </motion.a>

              {/* Continue to website link */}
              <button
                onClick={handleClose}
                className="splash-screen__skip mt-6 text-white/60 text-sm hover:text-white transition-colors underline underline-offset-4"
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
