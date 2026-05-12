'use client';

import { useState, type CSSProperties } from 'react';
import Image, { type StaticImageData } from 'next/image';
import image2 from '@/assets/images/12.webp';
import image6 from '@/assets/ritratti/7.webp';
import image12 from '@/assets/visions/3.webp';
import { useTranslations } from "next-intl";

const STAGGER = 0.22;
const START_DELAY = 0.14;

type Card = { href: string; cardIndex: number; title: string; src: StaticImageData; alt: string };

const CARDS: Card[] = [
  { href: '/ritratti', cardIndex: 3, title: "RITRATTI", src: image2, alt: 'Image 17' },
  { href: '/visions', cardIndex: 2, title: "SCENE DI STRADA", src: image12, alt: 'Image 9' },
  { href: '/intimita', cardIndex: 1, title: "INTIMITA", src: image6, alt: 'Image 3' },
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

type Exhibition = { date: string; span: string };

const EXHIBITIONS: Exhibition[] = [
  { date: '06/06/2025 — 15/06/2025', span: 'sm:col-span-2 lg:col-span-2' },
  { date: '29/08/2025 — 31/08/2025', span: 'sm:col-span-1 lg:col-span-1' },
  { date: '17/07/2025 — 19/07/2025', span: 'sm:col-span-1 lg:col-span-1' },
  { date: '03/08/2025',              span: 'sm:col-span-2 lg:col-span-2' },
  { date: '11/10/2025 — 19/10/2025', span: 'sm:col-span-2 lg:col-span-2' },
  { date: '05/04/2026 — 29/04/2026', span: 'sm:col-span-1 lg:col-span-1' },
  { date: '21/05/2026 — 28/05/2026', span: 'sm:col-span-2 lg:col-span-3' },
];

function ExhibitionsSection() {
  const t = useTranslations();
  return (
    <section className="mt-16 lg:mt-20">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
          {t('exhibitions')}
        </h2>
        <span className="hidden sm:inline-block text-xs uppercase tracking-[0.3em] text-white/40 pb-1">
          2025 — 2026
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-fr">
        {EXHIBITIONS.map((ex, i) => {
          const num = i + 1;
          return (
            <article
              key={num}
              className={`group relative flex flex-col ${ex.span} min-h-[180px] rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-[2px] p-6 transition-all duration-300 ease-out hover:border-white/30 hover:from-white/[0.09] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(255,255,255,0.15)]`}
            >
              <header className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/45">
                <span className="font-medium text-white/70">
                  N° {String(num).padStart(2, '0')}
                </span>
                <span className="whitespace-nowrap tabular-nums">
                  {ex.date}
                </span>
              </header>

              <div className="mt-3 mb-5 h-px w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

              <p className="flex-1 flex items-center justify-center text-center text-base lg:text-lg leading-relaxed text-white/90 font-light italic">
                {t(`exhibition${num}`)}
              </p>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-4 text-white/20 group-hover:text-white/50 transition-colors text-base"
              >
                ↗
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function HomepageContent() {
  return (
    <>
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
      <ExhibitionsSection />
    </>
  );
}
