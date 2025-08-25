// src/app/components/homepageContent.tsx
'use client';

import { useState, type CSSProperties } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

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

type CSSVars = CSSProperties & { '--d'?: string; '--dur'?: string };

function ClipRevealCard({ href, src, alt, delay }: Card & { delay: number }) {
  const [decoded, setDecoded] = useState(false);
  const vars: CSSVars = { '--d': `${delay}s`, '--dur': '1s' };

  return (
    <div className="flex flex-col h-[550px]">
      <Link href={href} className="flex flex-col h-[550px]">
        <div style={vars} className="relative flex-1 overflow-hidden">
          {/* Initial state is clipped via .clip-reveal (globals.css).
              When decoded === true, we add .clip-reveal-play to animate. */}
          <div className={`clip-reveal ${decoded ? 'clip-reveal-play' : ''}`}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              // Fire only after decode → prevents any show/hide race
              onLoadingComplete={() => setDecoded(true)}
              // Above-the-fold → preload for reliable first-paint behavior
              priority
              // If blur placeholder causes any pulse, switch to placeholder="empty"
              // placeholder="blur"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 lg:pt-0">
      {CARDS.map((card, i) => (
        <ClipRevealCard
          key={card.href}
          href={card.href}
          src={card.src}
          alt={card.alt}
          delay={START_DELAY + i * STAGGER}
        />
      ))}
    </div>
  );
}
