'use client';

import { useEffect, useRef, useState } from 'react';

export default function DisableImageContext({
  message = "Image can't be saved",
  durationMs = 1500
}: {
  message?: string;
  durationMs?: number;
}) {
  const [show, setShow] = useState(false);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const opts = { capture: true } as const;

    const isImageArea = (el: Element | null) => {
      if (!el) return false;
      if (el.closest('[data-allow-contextmenu]')) return false;

      if ((el as HTMLElement).tagName === 'IMG' || el.closest('img')) return true;

      const guard = el.closest('[data-image-guard]');
      if (guard?.querySelector('img')) return true;

      return false;
    };

    const showToast = () => {
      setShow(true);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setShow(false), durationMs);
    };

    const onContext = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (isImageArea(t)) {
        e.preventDefault();
        showToast();
      }
    };

    const onDragStart = (e: DragEvent) => {
      const t = e.target as Element | null;
      if (isImageArea(t)) {
        e.preventDefault();
        showToast();
      }
    };

    document.addEventListener('contextmenu', onContext, opts);
    document.addEventListener('dragstart', onDragStart, opts);
    return () => {
      document.removeEventListener('contextmenu', onContext, opts);
      document.removeEventListener('dragstart', onDragStart, opts);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [durationMs]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={`fixed inset-x-0 bottom-6 z-[1000] pointer-events-none flex justify-center transition-[opacity,transform] duration-200 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="pointer-events-auto rounded-full bg-white/10 text-white text-base px-3 py-1.5 backdrop-blur border border-white/15 shadow-lg">
        {message}
      </div>
    </div>
  );
}
