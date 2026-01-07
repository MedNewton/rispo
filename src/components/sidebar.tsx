// components/Sidebar.tsx
'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { FaInstagram } from 'react-icons/fa6';
import { FaLinkedin, FaFacebookSquare } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  const active =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className="group block text-inherit">
      <span className="relative inline-flex items-center text-sm">
        <span
          aria-hidden="true"
          className={cx(
            'mr-1 mt-1 h-1 w-1 rounded-full bg-white transition-all',
            active ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          )}
        />
        <span
          className={cx(
            'capitalize transition-colors',
            active ? '!text-white' : '!text-neutral-400 group-hover:!text-neutral-200'
          )}
        >
          {label}
        </span>
      </span>
    </Link>
  );
}

type WorksChild = Readonly<{ href: string; label: string }>;

function WorksNavItemInline({
  label,
  baseHref = '/works',
  items,
}: {
  label: string;
  baseHref?: string;
  items: ReadonlyArray<WorksChild>;
}) {
  const pathname = usePathname();
  const submenuId = useId();

  const groupRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const isWorksRoute = useMemo(
    () => pathname === baseHref || pathname.startsWith(baseHref + '/'),
    [pathname, baseHref]
  );

  // open = visible; pinned = stays open after click even when mouse leaves
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  // measured height for perfect 0px collapse
  const [submenuHeight, setSubmenuHeight] = useState<number>(0);

  const triggerActive = isWorksRoute || open;

  // If you're inside /works/* keep it open and pinned
  useEffect(() => {
    if (isWorksRoute) {
      setOpen(true);
      setPinned(true);
    }
  }, [isWorksRoute]);

  // Outside click closes (unpin + close)
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = groupRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setPinned(false);
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  // Escape closes
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPinned(false);
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Hover logic: show on hover, hide on leave only if NOT pinned
  const onMouseEnter = () => setOpen(true);
  const onMouseLeave = () => {
    if (!pinned) setOpen(false);
  };

  // Click logic: pin/unpin
  const togglePinned = () => {
    setPinned((prev) => {
      const next = !prev;
      // pin => open; unpin => close (unless currently on works route)
      setOpen(next ? true : isWorksRoute);
      return next;
    });
  };

  // Measure submenu content height so closed is always 0px
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // when opening, measure immediately
    const measure = () => setSubmenuHeight(el.scrollHeight);

    if (open) {
      measure();

      // keep height correct if fonts/images/layout change
      const ro = new ResizeObserver(() => measure());
      ro.observe(el);
      return () => ro.disconnect();
    }

    // when closing, set to 0 (transition will animate from current height)
    setSubmenuHeight(0);
  }, [open]);

  return (
    <div ref={groupRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {/* Works trigger (NOT a link) */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={submenuId}
        onClick={togglePinned}
        className="group block w-full text-left text-inherit"
      >
        <span className="relative inline-flex items-center text-sm">
          <span
            aria-hidden="true"
            className={cx(
              'mr-1 mt-1 h-1 w-1 rounded-full bg-white transition-all',
              triggerActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            )}
            
          />
          <span
            className={cx(
              'capitalize transition-colors',
              triggerActive ? '!text-white' : '!text-neutral-400 group-hover:!text-neutral-200'
            )}
          >
            {label}
          </span>
        </span>
      </button>

      {/* Inline submenu: true 0px height when closed */}
      <div
        id={submenuId}
        className={cx(
          'pl-3 overflow-hidden',
          // the push-down animation
          'transition-[height] duration-200 ease-out',
          // only add spacing when open
          open ? 'mt-2' : 'mt-0'
        )}
        style={{ height: open ? submenuHeight : 0 }}
        aria-hidden={!open}
      >
        <div
          ref={contentRef}
          className={cx(
            'min-h-0',
            'transition-[opacity,transform] duration-200 ease-out',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
            // prevent interactions when closed (even if something weird happens)
            open ? 'pointer-events-auto' : 'pointer-events-none'
          )}
          style={{marginLeft: "10px"}}
        >
          <div className="space-y-3">
            {items.map((item) => {
              const childActive =
                pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={childActive ? 'page' : undefined}
                  className="group block text-inherit"
                  onClick={() => {
                    // If opened only by hover (not pinned), close after choosing an item.
                    if (!pinned && !isWorksRoute) setOpen(false);
                  }}
                >
                  <span className="relative inline-flex items-center text-sm">
                    <span
                      aria-hidden="true"
                      className={cx(
                        'mr-1 mt-1 h-1 w-1 rounded-full bg-white transition-all',
                        childActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      )}
                    />
                    <span
                      className={cx(
                        'capitalize transition-colors',
                        childActive ? '!text-white' : '!text-neutral-400 group-hover:!text-neutral-200'
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const year = new Date().getFullYear();
  const t = useTranslations();

  return (
    <aside className="h-[100dvh] w-[320px] shrink-0 px-6 py-7 hidden lg:flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-20">
        <Link href="/">
          <h1 className="text-lg tracking-[0.2em] font-semibold uppercase">Giordano Rispo</h1>
        </Link>

        <nav className="mt-8 space-y-3">
          <NavItem href="/" label={t('home')} />

          <WorksNavItemInline
            label={t('works')}
            baseHref="/works"
            items={[
              { href: '/intimita', label: t('category1Title') },
              { href: '/scene-di-strada', label: t('category2Title') },
              { href: '/ritratti', label: t('category3Title') },
            ]}
          />

          <NavItem href="/about" label={t('about')} />
          <NavItem href="/contact" label={t('contact')} />
        </nav>

        <div className="flex flex-row items-center gap-2">
          <Link
            href="https://www.instagram.com/giordanonadroig"
            target="_blank"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            <FaInstagram size={22} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/giordano-rispo-0103a1226/"
            target="_blank"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            <FaLinkedin size={22} />
          </Link>
          <Link
            href="https://www.facebook.com/gio.rispo/"
            target="_blank"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            <FaFacebookSquare size={22} />
          </Link>
          <Link
            href="https://www.tiktok.com/@giordanorispo"
            target="_blank"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            <AiFillTikTok size={24} />
          </Link>
        </div>
      </div>

      <div className="text-xs text-neutral-500 font-light space-y-1">
        <p>{t('allRightsReserved')}</p>
        <p>Copyright © {year}</p>
        <p>Giordano Rispo</p>
      </div>
    </aside>
  );
}
