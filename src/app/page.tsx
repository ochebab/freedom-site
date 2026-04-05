import { HomeContent } from "@/components/sections";
import type { HeroSlideData } from "@/components/sections";

const heroSlides: HeroSlideData[] = [
  {
    id: 'slide-1',
    title: 'Nationwide coverage you can count on.',
    subtitle: 'Freedom provides coverage across 99% of the Canadian population.⁶',
    ctaText: 'View coverage map',
    ctaLink: '/coverage',
    mediaSrc: 'https://videos.ctfassets.net/jtlkz9qbebd9/23NrFuzrJEH7s9K5pWTVpQ/e62412ea9cd81a5e4abd071e204cefa0/2257228_-_Freedom_November_coverage_campaign_10s_1920x640_v2.mp4',
    mediaAlt: 'Globe showing Canada coverage',
    mediaType: 'video',
  },
  {
    id: 'slide-2',
    subtitle: 'MORE FAMILY. MORE SAVINGS.',
    title: 'Introducing $25/mo.³ with 100GB.',
    description: '3rd+ lines get up to 50% off select plans¹⁶ with coast-to-coast coverage in Canada, plus roaming in 120+ global destinations⁸',
    note: 'Prices includes Digital Discount. Available only for new Bring Your Own Phone lines.',
    ctaText: 'Order now',
    ctaLink: '/plans',
    mediaSrc: '/images/slider2-desktop.webp',
    mediaSrcMobile: '/images/slider2-mobile.webp',
    mediaAlt: 'Family plan phones with $25 pricing',
    mediaType: 'image',
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <HomeContent heroSlides={heroSlides} />
    </main>
  );
}
