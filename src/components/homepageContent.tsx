'use client';

import { useState, type CSSProperties } from 'react';
import Image, { type StaticImageData } from 'next/image';
import image2 from '@/assets/images/2.webp';
import image6 from '@/assets/images/6.webp';
import image12 from '@/assets/images/12.webp';
import { useTranslations } from "next-intl";

const STAGGER = 0.22;
const START_DELAY = 0.14;

type Card = { href: string; cardIndex: number; title: string; src: StaticImageData; alt: string };

const CARDS: Card[] = [
  { href: '/intimita', cardIndex: 1, title: "INTIMITA", src: image6, alt: 'Image 3' },
  { href: '/scene-di-strada', cardIndex: 2, title: "SCENE DI STRADA", src: image12, alt: 'Image 9' },
  { href: '/ritratti', cardIndex: 3, title: "RITRATTI", src: image2, alt: 'Image 17' }
];

type CSSVars = CSSProperties & { '--d'?: string; '--dur'?: string };

function ClipRevealCard({ src, cardIndex, href, alt, delay }: Card & { delay: number }) {
  const [decoded, setDecoded] = useState(false);
  const vars: CSSVars = { '--d': `${delay}s`, '--dur': '1s' };

  const t = useTranslations();

  return (
    <a href={href}>
      <div className="flex flex-col h-[550px] cursor-pointer">
      <h1 className='text-2xl font-bold mb-2'>{t(`category${cardIndex}Title`)}</h1>
      <div style={vars} className="relative flex-1 overflow-hidden">
        <div className={`clip-reveal ${decoded ? 'clip-reveal-play' : ''}`} data-image-guard>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            onLoad={() => setDecoded(true)}
            priority
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </div>
      </div>
    </div>
    </a>
  );
}

export default function HomepageContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 lg:pt-0">
      {CARDS.map((card, i) => (
        <ClipRevealCard
          key={card.href}
          cardIndex={card.cardIndex}
          href={card.href}
          title={card.title}
          src={card.src}
          alt={card.alt}
          delay={START_DELAY + i * STAGGER}
        />
      ))}
    </div>
  );
}
