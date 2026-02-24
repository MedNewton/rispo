'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { setLocale } from '@/server-actions/set-locale';

type LocaleKey = 'en' | 'it';
const OPTIONS: LocaleKey[] = ['en', 'it'];

export default function MobileLanguageSwitch() {
  const router = useRouter();
  const current = (useLocale() as LocaleKey) || 'en';
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onDocDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const pick = (code: LocaleKey) => {
    if (pending || code === current) return;
    start(async () => {
      await setLocale(code);
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={pending}
        onClick={() => setOpen((v) => !v)}
        className="
          inline-flex items-center gap-1.5 rounded-md
          border border-white/10 bg-black/90 px-2.5 py-1.5
          text-[11px] uppercase tracking-[0.22em] text-white
          backdrop-blur-sm transition
          hover:border-white/20
          focus:outline-none focus:ring-1 focus:ring-white/25
          disabled:opacity-60
        "
      >
        <span>{current.toUpperCase()}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 text-white/70 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M6 8l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="
            absolute right-0 z-[80] mt-2 min-w-[78px]
            rounded-md border border-white/10
            bg-black/95 p-1 shadow-xl backdrop-blur-sm
          "
        >
          {OPTIONS.map((code) => {
            const selected = code === current;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={pending}
                  onClick={() => pick(code)}
                  className={`
                    block w-full rounded-sm px-2 py-1.5 text-left
                    text-[11px] uppercase tracking-[0.22em] transition
                    ${selected ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'}
                    disabled:opacity-60
                  `}
                >
                  {code.toUpperCase()}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

    </div>
  );
}
