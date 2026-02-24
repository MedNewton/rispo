'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

const SESSION_KEY = 'capture_watermark_session';
const WATERMARK_COUNT = 14;

function newSessionId() {
  const rand = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
  return rand.replace(/-/g, '').slice(0, 10).toUpperCase();
}

export default function CaptureWatermark() {
  const pathname = usePathname();
  const [sessionId, setSessionId] = useState('UNSET');
  const [timestamp, setTimestamp] = useState(() => new Date());

  useEffect(() => {
    const current = window.sessionStorage.getItem(SESSION_KEY);
    if (current) {
      setSessionId(current);
      return;
    }

    const next = newSessionId();
    window.sessionStorage.setItem(SESSION_KEY, next);
    setSessionId(next);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTimestamp(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const stamp = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(timestamp),
    [timestamp]
  );

  const text = `GIORDANO RISPO  ${sessionId}  ${stamp}  ${pathname}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden select-none"
    >
      {Array.from({ length: WATERMARK_COUNT }).map((_, i) => {
        const row = i % 7;
        const col = Math.floor(i / 7);
        return (
          <p
            key={i}
            className="absolute whitespace-nowrap text-[10px] font-medium tracking-[0.25em] text-white/[0.09]"
            style={{
              top: `${row * 16 + 6}%`,
              left: `${col * 52 - 12}%`,
              transform: 'rotate(-24deg)'
            }}
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
