'use client';

import {useEffect, useRef, useState} from 'react';
import Image, {type StaticImageData} from 'next/image';
import Link from 'next/link';

import image2 from '@/assets/images/2.webp';
import image6 from '@/assets/images/6.webp';
import image12 from '@/assets/images/12.webp';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const STAGGER = 0.22;
const START_DELAY = 0.14;

type Card = { href: string; src: StaticImageData; alt: string };

const CARDS: Card[] = [
  { href: '/category1', src: image6, alt: 'Image 3' },
  { href: '/category2', src: image12, alt: 'Image 9' },
  { href: '/category3', src: image2, alt: 'Image 17' }
];

function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return {ref, inView};
}

type CSSVars = React.CSSProperties & {'--d'?: string; '--dur'?: string};

function ClipRevealCard({ href, src, alt, delay }: Card & { delay: number }) {
  const [imgReady, setImgReady] = useState(false);
  const {ref, inView} = useInViewOnce<HTMLDivElement>({ rootMargin: '0px 0px -10% 0px' });
  const play = inView && imgReady;

  const vars: CSSVars = { '--d': `${delay}s`, '--dur': '1s' };

  return (
    <div className="flex flex-col h-[550px]">
      <Link href={href} className="flex flex-col h-[550px]">
        <div ref={ref} style={vars} className="relative flex-1 overflow-hidden">
          <div className={`reveal ${play ? 'play' : ''}`}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              onLoadingComplete={() => setImgReady(true)}
              priority={false}
            />
          </div>
        </div>
      </Link>

      <style jsx>{`
        .reveal {
          /* start fully clipped at the bottom (only top edge visible) */
          clip-path: inset(0 0 100% 0);
          will-change: clip-path;
          transform: translateZ(0); /* GPU hint to avoid subpixel seams */
          height: 100%;
          width: 100%;
          position: absolute;
          inset: 0;
        }
        .reveal.play {
          animation: clipDown var(--dur) ${EASE} both;
          animation-delay: var(--d);
        }
        @keyframes clipDown {
          to { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </div>
  );
}

export default function HomepageContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 lg:pt-0">
      {CARDS.map((card, i) => (
        <ClipRevealCard
          key={card.href}
          {...card}
          delay={START_DELAY + i * STAGGER}
        />
      ))}
    </div>
  );
}
