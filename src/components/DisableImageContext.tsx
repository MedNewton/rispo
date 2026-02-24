'use client';

import { useEffect, useRef, useState } from 'react';

export default function DisableImageContext({
  message = "Image can't be saved",
  screenshotMessage = 'Screenshots are not allowed',
  durationMs = 1500,
  shieldDurationMs = 1200
}: {
  message?: string;
  screenshotMessage?: string;
  durationMs?: number;
  shieldDurationMs?: number;
}) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(message);
  const [showShield, setShowShield] = useState(false);
  const hideToastTimer = useRef<number | null>(null);
  const hideShieldTimer = useRef<number | null>(null);

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

    const showToastWith = (text: string) => {
      setToastMessage(text);
      setShowToast(true);
      if (hideToastTimer.current) window.clearTimeout(hideToastTimer.current);
      hideToastTimer.current = window.setTimeout(() => setShowToast(false), durationMs);
    };

    const holdShield = (forMs?: number) => {
      setShowShield(true);
      if (hideShieldTimer.current) window.clearTimeout(hideShieldTimer.current);
      if (typeof forMs === 'number') {
        hideShieldTimer.current = window.setTimeout(() => setShowShield(false), forMs);
      }
    };

    const isScreenshotShortcut = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const code = e.code.toLowerCase();
      const isPrintScreen = key === 'printscreen' || code === 'printscreen';
      const isMacScreenshot = e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5');
      const isSnippingTool =
        e.shiftKey &&
        (e.metaKey || e.ctrlKey) &&
        (key === 's' || code === 'keys');
      return isPrintScreen || isMacScreenshot || isSnippingTool;
    };

    const blockScreenshot = (e: KeyboardEvent) => {
      e.preventDefault();
      holdShield(shieldDurationMs);
      showToastWith(screenshotMessage);

      if (navigator.clipboard?.writeText) {
        void navigator.clipboard.writeText('').catch(() => undefined);
      }
    };

    const onContext = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (isImageArea(t)) {
        e.preventDefault();
        showToastWith(message);
      }
    };

    const onDragStart = (e: DragEvent) => {
      const t = e.target as Element | null;
      if (isImageArea(t)) {
        e.preventDefault();
        showToastWith(message);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isScreenshotShortcut(e)) return;
      blockScreenshot(e);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (!isScreenshotShortcut(e)) return;
      blockScreenshot(e);
    };

    document.addEventListener('contextmenu', onContext, opts);
    document.addEventListener('dragstart', onDragStart, opts);
    document.addEventListener('keydown', onKeyDown, opts);
    document.addEventListener('keyup', onKeyUp, opts);

    return () => {
      document.removeEventListener('contextmenu', onContext, opts);
      document.removeEventListener('dragstart', onDragStart, opts);
      document.removeEventListener('keydown', onKeyDown, opts);
      document.removeEventListener('keyup', onKeyUp, opts);
      if (hideToastTimer.current) window.clearTimeout(hideToastTimer.current);
      if (hideShieldTimer.current) window.clearTimeout(hideShieldTimer.current);
    };
  }, [durationMs, message, screenshotMessage, shieldDurationMs]);

  return (
    <>
      {showShield ? (
        <div
          aria-hidden="true"
          data-capture-shield
          className="pointer-events-none fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm"
        />
      ) : null}

      <div
        aria-live="polite"
        aria-atomic="true"
        className={`fixed inset-x-0 bottom-6 z-[1000] pointer-events-none flex justify-center transition-[opacity,transform] duration-200 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="pointer-events-auto rounded-full bg-white/10 text-white text-base px-3 py-1.5 backdrop-blur border border-white/15 shadow-lg">
          {toastMessage}
        </div>
      </div>
    </>
  );
}
