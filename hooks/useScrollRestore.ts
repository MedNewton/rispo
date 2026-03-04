'use client';

import { useEffect, useRef } from 'react';

export function useScrollRestore(key: string) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const storageKey = `scroll-${key}`;
    const saved = sessionStorage.getItem(storageKey);

    // Restore scroll after dynamic content loads
    if (saved) {
      const pos = parseInt(saved, 10);
      if (pos > 0) {
        const observer = new MutationObserver(() => {
          if (el.scrollHeight >= pos) {
            el.scrollTop = pos;
            observer.disconnect();
          }
        });
        observer.observe(el, { childList: true, subtree: true });
        // Fallback: disconnect after 5s
        setTimeout(() => observer.disconnect(), 5000);
      }
    }

    // Save scroll position on scroll
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(storageKey, String(Math.round(el.scrollTop)));
        ticking = false;
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [key]);

  return ref;
}
