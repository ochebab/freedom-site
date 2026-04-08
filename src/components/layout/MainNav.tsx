'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from './Container';
import { SettingsPanel } from './SettingsPanel';
import type { SplashType } from './AppShell';

const NAV_ITEMS = [
  { label: 'Mobile', hasDropdown: true },
  { label: 'Internet + TV', hasDropdown: true },
  { label: 'Network', hasDropdown: true },
  { label: 'Special Offers', hasDropdown: false },
] as const;

const PROVINCES = ['AB', 'BC', 'MB', 'ON'] as const;
type Province = typeof PROVINCES[number];

interface MainNavProps {
  splashEnabled?: boolean;
  splashDuration?: number;
  splashType?: SplashType;
  onSplashEnabledChange?: (enabled: boolean) => void;
  onSplashDurationChange?: (duration: number) => void;
  onSplashTypeChange?: (type: SplashType) => void;
}

export function MainNav({
  splashEnabled = true,
  splashDuration = 60,
  splashType = 'splash1',
  onSplashEnabledChange,
  onSplashDurationChange,
  onSplashTypeChange,
}: MainNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province>('ON');

  return (
    <>
      <div className="main-nav h-[80px] bg-white border-b border-gray-200">
        <Container className="main-nav__container h-full">
          <div className="main-nav__wrapper flex h-full items-center justify-between">
            
            {/* Logo */}
            <a href="/" className="main-nav__logo">
              <Image
                src="/logos/freedom logo - black.svg"
                alt="Freedom"
                width={140}
                height={32}
                className="main-nav__logo-img h-[32px] w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <div className="main-nav__left hidden md:flex items-end gap-8">
              <nav className="main-nav__menu flex items-end gap-6 translate-y-[5px]">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="main-nav__item relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="main-nav__link flex items-center gap-1 text-[1.125rem] text-black hover:opacity-70 transition-opacity"
                    >
                      <span className="main-nav__link-text">{item.label}</span>
                      {item.hasDropdown && (
                        <svg
                          className={`main-nav__link-icon w-3 h-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </nav>
            </div>

            {/* Desktop My Freedom */}
            <div className="main-nav__right hidden md:block">
              <button className="main-nav__link main-nav__link--myfreedom flex items-center gap-1 text-[1.125rem] text-black hover:opacity-70 transition-opacity">
                <span className="main-nav__link-text">My Freedom</span>
                <svg
                  className="main-nav__link-icon w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="main-nav__hamburger md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span 
                className="main-nav__hamburger-line w-6 h-0.5 bg-black"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <motion.span 
                className="main-nav__hamburger-line w-6 h-0.5 bg-black"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="main-nav__hamburger-line w-6 h-0.5 bg-black"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </button>

          </div>
        </Container>
      </div>

      {/* Mobile Menu Overlay - App-like View */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu fixed inset-0 top-[80px] bg-white z-50 md:hidden flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            
            {/* Scrollable Content */}
            <div className="mobile-menu__content flex-1 overflow-y-auto">
              
              {/* Main Nav Items */}
              <nav className="mobile-menu__nav">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href="#"
                    className="mobile-menu__link flex items-center justify-between px-6 py-5 text-[1.25rem] text-black border-b border-gray-100"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileTap={{ backgroundColor: '#f9fafb' }}
                  >
                    <span>{item.label}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                ))}
                <motion.a
                  href="#"
                  className="mobile-menu__link flex items-center justify-between px-6 py-5 text-[1.25rem] text-black border-b border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                  whileTap={{ backgroundColor: '#f9fafb' }}
                >
                  <span>My Freedom</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </nav>

              {/* Secondary Actions */}
              <div className="mobile-menu__secondary bg-gray-50 mt-4">
                
                {/* Find a Store */}
                <motion.a
                  href="#"
                  className="mobile-menu__action flex items-center gap-4 px-6 py-4 text-black"
                  whileTap={{ backgroundColor: '#f3f4f6' }}
                >
                  <div className="mobile-menu__action-icon w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-[1rem]">Find a Store</span>
                </motion.a>

                {/* Contact Us */}
                <motion.a
                  href="#"
                  className="mobile-menu__action flex items-center gap-4 px-6 py-4 text-black"
                  whileTap={{ backgroundColor: '#f3f4f6' }}
                >
                  <div className="mobile-menu__action-icon w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[1rem]">Contact Us</span>
                </motion.a>

              </div>

            </div>

            {/* Fixed Bottom - Province Selector + Settings */}
            <div className="mobile-menu__footer border-t border-gray-200 bg-white px-6 py-4 safe-area-bottom">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Select your province</span>
                {/* Settings Panel */}
                {onSplashEnabledChange && onSplashDurationChange && onSplashTypeChange && (
                  <SettingsPanel
                    splashEnabled={splashEnabled}
                    splashDuration={splashDuration}
                    splashType={splashType}
                    onSplashEnabledChange={onSplashEnabledChange}
                    onSplashDurationChange={onSplashDurationChange}
                    onSplashTypeChange={onSplashTypeChange}
                  />
                )}
              </div>
              <div className="flex gap-2">
                {PROVINCES.map((province) => (
                  <motion.button
                    key={province}
                    onClick={() => setSelectedProvince(province)}
                    className={`flex-1 py-3 rounded-xl text-sm ${
                      selectedProvince === province
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-black'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      backgroundColor: selectedProvince === province ? '#000000' : '#f3f4f6',
                      color: selectedProvince === province ? '#ffffff' : '#000000'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {province}
                  </motion.button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
