'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroSlide, HeroSlideData } from './HeroSlide';

interface HeroCarouselProps {
  slides: HeroSlideData[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  const goToSlide = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0 || isPaused) return;
    
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, goToNext, isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="hero-carousel pt-[20px] md:pt-[40px]">
      <div 
        className="hero-carousel__wrapper relative w-full max-w-[1100px] mx-[16px] md:mx-auto h-[600px] md:h-[482px] rounded-[20px] overflow-hidden touch-pan-y" 
        style={{ width: 'calc(100% - 32px)' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
      
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="hero-carousel__slides absolute inset-0 h-full"
        >
          <HeroSlide slide={slides[activeIndex]} isActive={true} />
        </motion.div>
      </AnimatePresence>

      {/* Control Panel - Desktop only */}
      {slides.length > 1 && (
        <div className="hero-carousel__controls absolute bottom-6 right-6 hidden md:flex items-center gap-3 z-10">
          {/* Progress Toggle */}
          <div className="hero-carousel__toggle flex items-center gap-2 bg-white rounded-full px-1.5 py-1.5 h-[32px]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative rounded-full overflow-hidden transition-all duration-300 ${
                  index === activeIndex ? 'w-[32px] h-[8px] bg-gray-200' : 'w-[8px] h-[8px] bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === activeIndex && !isPaused && (
                  <motion.div
                    key={`progress-${activeIndex}`}
                    className="absolute left-0 top-0 h-full bg-[#f26a21] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                  />
                )}
                {index === activeIndex && isPaused && (
                  <div className="absolute left-0 top-0 h-full bg-[#f26a21] rounded-full w-1/2" />
                )}
              </button>
            ))}
          </div>
          
          {/* Pause/Play Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="hero-carousel__pause w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center"
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? (
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </button>
        </div>
      )}
      
      {/* Mobile Controls */}
      {slides.length > 1 && (
        <>
          {/* Mobile Progress Toggle - Bottom Left */}
          <div className="hero-carousel__toggle-mobile absolute bottom-6 left-6 flex items-center gap-2 bg-white rounded-full px-2.5 h-[32px] z-10 md:hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative rounded-full overflow-hidden transition-all duration-300 ${
                  index === activeIndex ? 'w-[32px] h-[8px] bg-gray-200' : 'w-[8px] h-[8px] bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === activeIndex && !isPaused && (
                  <motion.div
                    key={`progress-mobile-${activeIndex}`}
                    className="absolute left-0 top-0 h-full bg-[#f26a21] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                  />
                )}
                {index === activeIndex && isPaused && (
                  <div className="absolute left-0 top-0 h-full bg-[#f26a21] rounded-full w-1/2" />
                )}
              </button>
            ))}
          </div>
          
          {/* Mobile Play/Pause - Bottom Right */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="hero-carousel__pause-mobile absolute bottom-6 right-6 w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center z-10 md:hidden"
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? (
              <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </button>
        </>
      )}

      </div>
    </section>
  );
}
