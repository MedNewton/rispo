// components/page1Content.tsx
'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
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

// at top of file
function usePriorityBudget(): number {
  const [budget, setBudget] = useState(6); // default for safety
  useEffect(() => {
    const mSm = window.matchMedia('(min-width: 640px)');
    const mLg = window.matchMedia('(min-width: 1024px)');
    const compute = () => setBudget(mLg.matches ? 9 : mSm.matches ? 6 : 3); // ~3 rows of first view
    compute();
    const onChange = () => compute();
    mSm.addEventListener('change', onChange);
    mLg.addEventListener('change', onChange);
    return () => {
      mSm.removeEventListener('change', onChange);
      mLg.removeEventListener('change', onChange);
    };
  }, []);
  return budget;
}


type StyleWithVar = React.CSSProperties & {'--parallax-y'?: string};
type CSSVars = React.CSSProperties & {'--d'?: string; '--dur'?: string};

/* closest scroll container (for parallax) */
function findScrollRoot(node: Element | null): Element | null {
  let el: Element | null = node?.parentElement ?? null;
  while (el) {
    const cs = window.getComputedStyle(el);
    const oy = cs.overflowY;
    if (oy === 'auto' || oy === 'scroll') return el;
    el = el.parentElement;
  }
  return null;
}

/* tiny parallax */
function useParallaxVar<T extends HTMLElement>(amplitudePx: number) {
  const ref = useRef<T | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const root = findScrollRoot(node);
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = node.getBoundingClientRect();
      const rootRect =
        root
          ? root.getBoundingClientRect()
          : ({ top: 0, height: window.innerHeight || 1 } as DOMRect | { top: number; height: number });
      const vh = root ? rootRect.height : (window.innerHeight || 1);
      const topRef = root ? rootRect.top : 0;
      const center = rect.top + rect.height / 2;
      const progress = Math.min(Math.max((center - topRef) / vh, 0), 1);
      const offset = (progress - 0.5) * amplitudePx;
      setY(offset);
    };

    const onScroll: EventListener = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();

    const target: EventTarget = (root ?? window) as unknown as EventTarget;
    target.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      target.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [amplitudePx]);

  const style: StyleWithVar = { '--parallax-y': `${y}px` };
  return { ref, style };
}

function depthForIndex(i: number): number {
  const levels = [7, 9, 11];
  return levels[i % levels.length] ?? 9;
}

/* component */
export default function WorkContent() {
  const priorityBudget = usePriorityBudget();

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] pt-4 lg:pt-0">
      {IMAGES.map(({ src, alt, id }, i) => (
        <MasonryTile
          key={id}
          index={i}
          priorityBudget={priorityBudget}
          href={`/portfolio/${id}`}
          src={src}
          alt={alt}
          amplitude={depthForIndex(i)}
        />
      ))}
    </div>
  );
}


function MasonryTile({
  index,
  priorityBudget,
  href,
  src,
  alt,
  amplitude
}: {
  index: number;
  priorityBudget: number;
  href: string;
  src: StaticImageData;
  alt: string;
  amplitude: number;
}) {
  const {ref: parallaxRef, style} = useParallaxVar<HTMLDivElement>(amplitude);
  const [decoded, setDecoded] = useState(false);

  const { width, height } = src;
  const vars: CSSVars = useMemo(() => ({ '--d': '0s', '--dur': '0.9s' }), []);

  // First N tiles get high fetch priority; the rest are lazy
  const isPriority = index < priorityBudget;
  const loading: 'eager' | 'lazy' = isPriority ? 'eager' : 'lazy';

  return (
    <figure className="mb-6 break-inside-avoid">
      <Link
        href={href}
        className="group relative block rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <div
          ref={parallaxRef}
          style={style}
          className="
            relative transform-gpu will-change-transform
            transition-transform duration-500 ease-out
            translate-y-[var(--parallax-y)]
            group-hover:scale-[1.01]
            group-hover:translate-y-[calc(var(--parallax-y)-2px)]
          "
        >
          {/* shimmer until decoded */}
          <div
            aria-hidden="true"
            className={[
              'absolute inset-0 z-[1] rounded-lg',
              decoded ? 'opacity-0' : 'opacity-100 animate-shimmer'
            ].join(' ')}
            style={{ transition: 'opacity 280ms ease' }}
          />

          {/* Natural layout + responsive sizes */}
          <div className={`reveal ${decoded ? 'reveal-play' : ''}`} style={vars}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="
                w-full h-auto object-cover
                transition-transform duration-500 ease-out
                group-hover:scale-[1.005]
              "
              placeholder="empty"           // faster than blur; shimmer covers it
              onLoadingComplete={() => setDecoded(true)}
              priority={isPriority}         // adds fetchPriority="high"
              loading={loading}             // eager for first few, lazy for the rest
              decoding="async"
            />
            <div className="reveal-mask" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </figure>
  );
}
