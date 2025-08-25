'use client';

import {useEffect, useMemo, useRef, useState, useTransition} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import {setLocale} from '@/server-actions/set-locale';

import flagEn from '@/assets/images/gb.webp';
import flagIt from '@/assets/images/it.webp';

const LOCALES = {
  en: {short: 'EN', flag: flagEn},
  it: {short: 'IT', flag: flagIt}
} as const;
type LocaleKey = keyof typeof LOCALES;

export default function LanguageSwitch() {
  const router = useRouter();
  const current = (useLocale() as LocaleKey) || 'en';
  const options = useMemo(() => Object.keys(LOCALES) as LocaleKey[], []);
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [activeIdx, setActiveIdx] = useState(() => options.indexOf(current));
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLButtonElement[]>([]);

  const dn = useMemo(
    () => new Intl.DisplayNames([current], {type: 'language'}),
    [current]
  );
  const labelFor = (code: LocaleKey) => dn.of(code) ?? code.toUpperCase();

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  useEffect(() => {
    if (open) {
      const idx = options.indexOf(current);
      setActiveIdx(idx >= 0 ? idx : 0);
      setTimeout(() => itemRefs.current[idx]?.focus(), 0);
    }
  }, [open, current, options]);

  const pick = (code: LocaleKey) =>
    start(async () => {
      await setLocale(code);
      setOpen(false);
      router.refresh();
    });

  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key === 'Home')  { e.preventDefault(); setActiveIdx(0); itemRefs.current[0]?.focus(); return; }
    if (e.key === 'End')   { e.preventDefault(); setActiveIdx(options.length - 1); itemRefs.current[options.length - 1]?.focus(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault(); const next = (activeIdx + 1) % options.length; setActiveIdx(next); itemRefs.current[next]?.focus(); return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault(); const prev = (activeIdx - 1 + options.length) % options.length; setActiveIdx(prev); itemRefs.current[prev]?.focus(); return;
    }
  };

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        onKeyDown={onTriggerKey}
        disabled={pending}
        className="
          group relative flex items-center gap-2
          rounded-lg border border-white/10
          bg-neutral-900/80 px-3 py-2 pr-9
          text-sm text-white shadow-sm backdrop-blur
          hover:border-white/20 hover:bg-neutral-900
          focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30
          disabled:opacity-60
        "
      >
        <Image src={LOCALES[current].flag} alt="" width={16} height={20} className="rounded-[1px]" priority />
        <span className="text-sm text-white/90 capitalize">{labelFor(current)}</span>

        <svg aria-hidden="true" viewBox="0 0 20 20"
             className={`pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform opacity-70 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {pending && (
          <span className="pointer-events-none absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-white/30 border-t-transparent" />
        )}
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`lang-${options[activeIdx]}`}
          onKeyDown={onListKey}
          className="
            animate-in fade-in zoom-in-95
            absolute right-0 z-50 mt-2 w-44
            rounded-xl border border-white/10
            bg-neutral-900/95 p-1.5 shadow-xl backdrop-blur
          "
        >
          {options.map((code, idx) => {
            const active = idx === activeIdx;
            const selected = code === current;
            return (
              <li key={code}>
                <button
                  id={`lang-${code}`}
                  ref={el => { if (el) itemRefs.current[idx] = el; }}
                  role="option"
                  aria-selected={selected}
                  disabled={pending}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => pick(code)}
                  className={`
                    group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left outline-none
                    transition
                    ${active ? 'bg-white/10' : 'hover:bg-white/5'}
                    focus-visible:ring-2 focus-visible:ring-white/20
                    active:scale-[0.99]
                  `}
                >
                  <Image src={LOCALES[code].flag} alt="" width={16} height={20} className="rounded-[1px]" />
                  <span className="text-sm text-white/90 capitalize">{labelFor(code)}</span>
                  {selected && (
                    <svg viewBox="0 0 20 20" className="ml-auto h-4 w-4 text-white/80" aria-hidden="true">
                      <path d="M7.5 13.5l-2.5-2.5 1.4-1.4 1.1 1.1 5-5 1.4 1.4-6.4 6.4z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
