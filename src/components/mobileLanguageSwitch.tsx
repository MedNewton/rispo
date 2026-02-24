'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { setLocale } from '@/server-actions/set-locale';

type LocaleKey = 'en' | 'it';

export default function MobileLanguageSwitch() {
  const router = useRouter();
  const current = (useLocale() as LocaleKey) || 'en';
  const [pending, start] = useTransition();

  const pick = (code: LocaleKey) => {
    if (pending || code === current) return;
    start(async () => {
      await setLocale(code);
      router.refresh();
    });
  };

  return (
    <label className="relative inline-flex items-center text-xs uppercase tracking-[0.22em]">
      <select
        aria-label="Select language"
        value={current}
        disabled={pending}
        onChange={(e) => pick(e.target.value as LocaleKey)}
        className="appearance-none bg-transparent pr-4 text-white focus:outline-none disabled:opacity-60"
      >
        <option value="en">EN</option>
        <option value="it">IT</option>
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-white/70"
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
    </label>
  );
}
