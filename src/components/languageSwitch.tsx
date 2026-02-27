'use client';

import {useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import {setLocale} from '@/server-actions/set-locale';

type LocaleKey = 'en' | 'it';

export default function LanguageSwitch() {
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
    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] sm:text-sm">
      <button
        type="button"
        onClick={() => pick('en')}
        disabled={pending}
        aria-pressed={current === 'en'}
        className={`transition-colors cursor-pointer focus:outline-none ${
          current === 'en' ? 'text-white' : 'text-white/55 hover:text-white/80'
        } ${pending ? 'opacity-60' : ''}`}
      >
        EN
      </button>
      <span aria-hidden="true" className="text-white/35">
        /
      </span>
      <button
        type="button"
        onClick={() => pick('it')}
        disabled={pending}
        aria-pressed={current === 'it'}
        className={`transition-colors cursor-pointer focus:outline-none ${
          current === 'it' ? 'text-white' : 'text-white/55 hover:text-white/80'
        } ${pending ? 'opacity-60' : ''}`}
      >
        IT
      </button>
    </div>
  );
}
