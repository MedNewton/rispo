// src/components/DisableImageContext.tsx
'use client';

import { useEffect } from 'react';

export default function DisableImageContext() {
  useEffect(() => {
    const opts = { capture: true } as const;

    const onContext = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // opt-out: wrap an image in a container with data-allow-contextmenu to allow right click there
      if (t.closest('[data-allow-contextmenu]')) return;

      if (t.tagName === 'IMG' || t.closest('img')) {
        e.preventDefault();
      }
    };

    const onDragStart = (e: DragEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || t.closest('[data-allow-contextmenu]')) return;
      if (t.tagName === 'IMG') e.preventDefault();
    };

    document.addEventListener('contextmenu', onContext, opts);
    document.addEventListener('dragstart', onDragStart, opts);
    return () => {
      document.removeEventListener('contextmenu', onContext, opts);
      document.removeEventListener('dragstart', onDragStart, opts);
    };
  }, []);

  return null;
}
