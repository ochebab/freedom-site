'use client';

import { motion } from 'motion/react';

interface TertiaryNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface TertiaryNavProps {
  items: TertiaryNavItem[];
}

export function TertiaryNav({ items }: TertiaryNavProps) {
  return (
    <nav className="tertiary-nav mt-[30px] overflow-hidden">
      <div className="tertiary-nav__scroll-container overflow-x-auto md:overflow-visible">
        <div className="tertiary-nav__wrapper max-w-[1100px] mx-auto px-[16px] md:px-0">
          <ul className="tertiary-nav__list flex items-center md:justify-center gap-3 w-max md:w-full">
            {items.map((item) => (
              <li key={item.id} className="tertiary-nav__item flex-shrink-0">
                <motion.a
                  href={item.href}
                  className="tertiary-nav__link flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-full text-black text-[1rem] whitespace-nowrap"
                  whileHover={{ 
                    backgroundColor: '#000000', 
                    color: '#ffffff',
                    borderColor: '#000000'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <span className="tertiary-nav__icon w-5 h-5">{item.icon}</span>
                  <span className="tertiary-nav__label">{item.label}</span>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export const defaultTertiaryNavItems: TertiaryNavItem[] = [
  {
    id: 'mobile',
    label: 'Mobile',
    href: '/mobile',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'internet',
    label: 'Internet',
    href: '/internet',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    id: 'tv',
    label: 'TV',
    href: '/tv',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'bundles',
    label: 'Bundles',
    href: '/bundles',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'accessories',
    label: 'Accessories',
    href: '/accessories',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];
