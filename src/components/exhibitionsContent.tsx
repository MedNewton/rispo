'use client';

import { useTranslations } from 'next-intl';

type ExhibitionType = 'Solo' | 'Group' | 'Festival';
type Exhibition = { date: string; type: ExhibitionType };

const EXHIBITIONS: Exhibition[] = [
  { date: '06/06/2025 — 15/06/2025', type: 'Solo' },
  { date: '29/08/2025 — 31/08/2025', type: 'Festival' },
  { date: '17/07/2025 — 19/07/2025', type: 'Solo' },
  { date: '03/08/2025',              type: 'Solo' },
  { date: '11/10/2025 — 19/10/2025', type: 'Festival' },
  { date: '05/04/2026 — 29/04/2026', type: 'Group' },
  { date: '21/05/2026 — 28/05/2026', type: 'Solo' },
];

export default function ExhibitionsContent() {
  const t = useTranslations();
  return (
    <section className="pt-8 lg:pt-0">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
          {t('exhibitions')}
        </h2>
        <span className="hidden sm:inline-block text-xs uppercase tracking-[0.3em] text-white/40 pb-1">
          2025 — 2026
        </span>
      </div>

      <ol className="flex flex-col">
        {EXHIBITIONS.map((ex, i) => {
          const num = i + 1;
          const title = t(`exhibition${num}Title`);
          const location = t(`exhibition${num}Location`);
          const typeLabel = t(`exhibitionType${ex.type}`);

          return (
            <li
              key={num}
              className="group relative grid grid-cols-[auto_1fr] sm:grid-cols-[200px_1fr] gap-y-2 gap-x-6 py-6 border-t border-white/10 last:border-b transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  N° {String(num).padStart(2, '0')}
                </span>
                <span className="text-sm tabular-nums text-white/80">
                  {ex.date}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {typeLabel}
                </span>
                {title ? (
                  <h3 className="text-base lg:text-lg italic text-white/95 leading-snug">
                    “{title}”
                  </h3>
                ) : null}
                <p className="text-sm lg:text-base text-white/75 leading-snug">
                  {location}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
