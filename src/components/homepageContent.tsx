'use client';

import {useEffect, useRef, useState} from 'react';
import Image, { type StaticImageData } from 'next/image';

import image2 from '@/assets/images/2.webp';
import image6 from '@/assets/images/6.webp';
import image12 from '@/assets/images/12.webp';

const STAGGER = 0.22;
const START_DELAY = 0.14;

type Card = { href: string; src: StaticImageData; alt: string };

const CARDS: Card[] = [
  { href: '/category1', src: image6, alt: 'Image 3' },
  { href: '/category2', src: image12, alt: 'Image 9' },
  { href: '/category3', src: image2, alt: 'Image 17' }
];

// SSR-safe: fires once when element enters viewport
function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (typeof window === 'undefined' || !node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(node);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

type CSSVars = React.CSSProperties & { '--d'?: string; '--dur'?: string };

function ClipRevealCard({ src, alt, delay }: { src: StaticImageData; alt: string; delay: number }) {
  const [imgReady, setImgReady] = useState(false);
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ rootMargin: '0px 0px -10% 0px' });

  // Play only when both conditions are true
  const play = inView && imgReady;

  const vars: CSSVars = { '--d': `${delay}s`, '--dur': '1s' };

  return (
    <div className="flex flex-col h-[550px]">
      <div ref={ref} style={vars} className="relative flex-1 overflow-hidden rounded-lg">
        {/* The clipped wrapper (global utility ensures it's clipped at first paint) */}
        <div className={`clip-reveal ${play ? 'clip-reveal-play' : ''}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            // Decode complete → safe to reveal without flashes
            onLoadingComplete={() => setImgReady(true)}
            // If above the fold, you can set priority={true}
            priority={false}
            // If you still ever see a flash from blur placeholder, remove it:
            // placeholder="empty"
            // or keep it (usually fine):
            // placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
}

export default function HomepageContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 lg:pt-0">
      {CARDS.map((card, i) => (
        <ClipRevealCard
          key={card.href}
          src={card.src}
          alt={card.alt}
          delay={START_DELAY + i * STAGGER}
        />
      ))}
    </div>
  );
}
