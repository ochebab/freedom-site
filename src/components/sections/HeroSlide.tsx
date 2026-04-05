'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export interface HeroSlideData {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  note?: string;
  ctaText: string;
  ctaLink: string;
  mediaSrc: string;
  mediaSrcMobile?: string;
  mediaAlt: string;
  mediaType?: 'image' | 'video';
}

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
}

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  if (!isActive) return null;

  return (
    <div className="hero-slide h-[600px] md:h-full w-full bg-black rounded-[20px] overflow-hidden">
      <div className="hero-slide__wrapper flex flex-col md:grid md:grid-cols-2 h-full">
        
        {/* Mobile: Media on top / Desktop: Right side */}
        <div className="hero-slide__media-wrapper relative bg-black overflow-hidden order-1 md:order-2 h-[280px] md:h-full">
          {slide.mediaType === 'video' ? (
            <video
              src={slide.mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              className="hero-slide__video absolute inset-0 w-full h-full object-cover object-center"
            />
          ) : (
            <>
              {/* Desktop Image */}
              <Image
                src={slide.mediaSrc}
                alt={slide.mediaAlt}
                fill
                className="hero-slide__image object-cover object-center hidden md:block"
                priority
              />
              {/* Mobile Image */}
              <Image
                src={slide.mediaSrcMobile || slide.mediaSrc}
                alt={slide.mediaAlt}
                fill
                className="hero-slide__image object-cover object-center md:hidden"
                priority
              />
            </>
          )}
        </div>

        {/* Mobile: Text below / Desktop: Left side */}
        <div className="hero-slide__content flex flex-col justify-center px-[24px] md:pl-[75px] md:pr-8 py-8 pb-[70px] md:py-12 md:pb-12 bg-black order-2 md:order-1">
          <p className="hero-slide__subtitle text-[#f26a21] text-[0.875rem] md:text-[1rem] uppercase tracking-wide mb-2 md:mb-3">
            {slide.subtitle}
          </p>
          <h1 className="hero-slide__title text-white text-[2rem] md:text-[3rem] leading-tight mb-4 md:mb-5">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="hero-slide__description text-white/80 text-[0.9375rem] md:text-[1.125rem] mb-4 md:mb-5 leading-relaxed">
              {slide.description}
            </p>
          )}
          {slide.note && (
            <p className="hero-slide__note text-white/60 text-[0.75rem] md:text-[0.875rem] mb-6 md:mb-8">
              {slide.note}
            </p>
          )}
          <div className="hero-slide__cta">
            <motion.a
              href={slide.ctaLink}
              className="hero-slide__cta-button block w-full text-center bg-[#f26a21] text-white px-8 py-4 rounded-full text-[1rem] relative overflow-hidden"
              initial={{ backgroundColor: '#f26a21' }}
              whileHover={{ backgroundColor: '#ffffff', color: '#000000' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {slide.ctaText}
            </motion.a>
          </div>
        </div>

      </div>
    </div>
  );
}
