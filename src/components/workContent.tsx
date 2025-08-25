// components/page1Content.tsx
'use client';

import {useEffect, useRef, useState} from 'react';
import Image, {type StaticImageData} from 'next/image';
import Link from 'next/link';

import image1 from '@/assets/images/1.webp';
import image2 from '@/assets/images/2.webp';
import image3 from '@/assets/images/3.webp';
import image4 from '@/assets/images/4.webp';
import image5 from '@/assets/images/5.webp';
import image6 from '@/assets/images/6.webp';
import image7 from '@/assets/images/7.webp';
import image8 from '@/assets/images/8.webp';
import image9 from '@/assets/images/9.webp';
import image10 from '@/assets/images/10.webp';
import image11 from '@/assets/images/11.webp';
import image12 from '@/assets/images/12.webp';
import image13 from '@/assets/images/13.webp';
import image14 from '@/assets/images/14.webp';
import image15 from '@/assets/images/15.webp';
import image16 from '@/assets/images/16.webp';
import image17 from '@/assets/images/17.webp';
import image18 from '@/assets/images/18.webp';
import image19 from '@/assets/images/19.webp';
import image20 from '@/assets/images/20.webp';

type Card = { src: StaticImageData; alt: string; id: string };

const IMAGES: Card[] = [
  { src: image1, alt: 'Image 1', id: '1' },
  { src: image2, alt: 'Image 2', id: '2' },
  { src: image3, alt: 'Image 3', id: '3' },
  { src: image4, alt: 'Image 4', id: '4' },
  { src: image5, alt: 'Image 5', id: '5' },
  { src: image6, alt: 'Image 6', id: '6' },
  { src: image7, alt: 'Image 7', id: '7' },
  { src: image8, alt: 'Image 8', id: '8' },
  { src: image9, alt: 'Image 9', id: '9' },
  { src: image10, alt: 'Image 10', id: '10' },
  { src: image11, alt: 'Image 11', id: '11' },
  { src: image12, alt: 'Image 12', id: '12' },
  { src: image13, alt: 'Image 13', id: '13' },
  { src: image14, alt: 'Image 14', id: '14' },
  { src: image15, alt: 'Image 15', id: '15' },
  { src: image16, alt: 'Image 16', id: '16' },
  { src: image17, alt: 'Image 17', id: '17' },
  { src: image18, alt: 'Image 18', id: '18' },
  { src: image19, alt: 'Image 19', id: '19' },
  { src: image20, alt: 'Image 20', id: '20' }
];

type StyleWithVar = React.CSSProperties & {'--parallax-y'?: string};

function useParallaxVar<T extends HTMLElement>(amplitudePx: number) {
  const ref = useRef<T | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const progress = Math.min(Math.max(center / vh, 0), 1);
      const offset = (progress - 0.5) * amplitudePx; // -amp/2..+amp/2
      setY(offset);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amplitudePx]);

  const style: StyleWithVar = {'--parallax-y': `${y}px`};
  return {ref, style};
}

function depthForIndex(i: number): number {
  const levels = [7, 9, 11];
  return levels[i % levels.length] ?? 7;
}

export default function WorkContent() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] pt-4 lg:pt-0">
      {IMAGES.map(({ src, alt, id }, i) => (
        <MasonryTile key={id} href={`/portfolio/${id}`} src={src} alt={alt} amplitude={depthForIndex(i)} />
      ))}
    </div>
  );
}

function MasonryTile({
  href,
  src,
  alt,
  amplitude
}: {
  href: string;
  src: StaticImageData;
  alt: string;
  amplitude: number;
}) {
  const [ready, setReady] = useState(false);
  const {ref, style} = useParallaxVar<HTMLDivElement>(amplitude);

  return (
    <figure className="mb-6 break-inside-avoid">
      <Link
        href={href}
        className="group relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <div
          ref={ref}
          style={style}
          className="
            relative transform-gpu will-change-transform
            translate-y-[var(--parallax-y)]
            transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.01]
            group-hover:translate-y-[calc(var(--parallax-y)-2px)]
          "
        >
          {/* skeleton shimmer */}
          <div
            aria-hidden="true"
            className={[
              'absolute inset-0 z-[1] rounded-lg',
              ready ? 'opacity-0' : 'opacity-100 animate-shimmer'
            ].join(' ')}
            style={{transition: 'opacity 280ms ease'}}
          />
          <Image
            src={src}
            alt={alt}
            placeholder="blur"
            className="w-full h-auto object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.005]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onLoadingComplete={() => setReady(true)}
            priority={false}
          />
        </div>
      </Link>
    </figure>
  );
}
