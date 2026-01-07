'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';

import rispo1 from '@/assets/images/rispo1.webp';
import rispo2 from '@/assets/images/rispo2.webp';
import { IoIosArrowRoundForward } from "react-icons/io";


import { useTranslations } from 'next-intl';
import Link from 'next/link';
type CSSVars = CSSProperties & { '--d'?: string; '--dur'?: string };

const STAGGER = 0.18;
const START_DELAY = 0.12;

function ClipRevealBlock({
  src,
  alt,
  delay,
  className = ''
}: {
  src: typeof rispo1;
  alt: string;
  delay: number;
  className?: string;
}) {
  const [decoded, setDecoded] = useState(false);
  const vars: CSSVars = { '--d': `${delay}s`, '--dur': '1s' };

  return (
    <div style={vars} className="relative flex-1 flex flex-col h-[500px] overflow-hidden">
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 z-[1] rounded-lg',
          decoded ? 'opacity-0' : 'opacity-100 animate-shimmer'
        ].join(' ')}
        style={{ transition: 'opacity 280ms ease' }}
      />

      <div className={`clip-reveal ${decoded ? 'clip-reveal-play' : ''}`} data-image-guard>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className={`object-cover ${className}`}
          onLoad={() => setDecoded(true)}
          placeholder="empty"
          priority
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function AboutContent() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-4 px-2 lg:px-4 pt-2 lg:pt-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-4 p-4 lg:p-4">
        <h1 className="text-white/90 text-2xl font-medium">
          {t('aboutGiordano')}
        </h1>
        <Link href="/works" className="text-white/90 w-fit hover:text-white/80 transition-colors hover:underline flex flex-row items-center justify-end gap-0 lg:gap-2">
          <h6 className="text-base lg:text-sm w-fit whitespace-nowrap">
            {t('seemyworks')}
          </h6>
          <IoIosArrowRoundForward size={24} className="mt-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
        <ClipRevealBlock src={rispo1} alt="Giordano Rispo portrait 1" delay={START_DELAY + 0 * STAGGER} className="grayscale" />
        <ClipRevealBlock src={rispo2} alt="Giordano Rispo portrait 2" delay={START_DELAY + 1 * STAGGER} className="grayscale" />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <p>
          {t('aboutPara1')}
        </p>
        <p>
          {t('aboutPara2')}
        </p>
        <p>
          {t('aboutPara3')}
        </p>
        <p>
          {t('aboutPara4')}
        </p>
        <p>
          {t('aboutPara5')}
        </p>
      </div>
    </div>
  );
}
