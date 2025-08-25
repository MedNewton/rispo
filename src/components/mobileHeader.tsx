"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import MobileLanguageSwitch from "./mobileLanguageSwitch";

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

type NavKey = "home" | "works" | "about" | "contact";
type NavItem = { key: NavKey; href: string };

const NAV: NavItem[] = [
  { key: "home", href: "/" },
  { key: "works", href: "/works" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" }
];

export default function MobileHeader() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    style.overflow = open ? "hidden" : prev || "";
    return () => {
      style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="md:hidden fixed inset-x-0 top-0 z-[60] h-16 bg-black backdrop-blur border-b border-neutral-500">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-5">
          <Link
            href="/"
            className="text-lg sm:text-xl font-semibold tracking-[0.25em] leading-none truncate uppercase text-white"
          >
            Giordano Rispo
          </Link>
          <div className="flex flex-row items-center justify-end gap-2">
            <MobileLanguageSwitch />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative inline-flex h-10 w-10 items-center justify-center"
            >
              {!open ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={cx(
          "md:hidden fixed inset-x-0 top-16 bottom-0 z-[55] bg-black overflow-y-auto transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="mx-auto max-w-screen-xl px-5 py-8">
          <ul className="space-y-6">
            {NAV.map(({ key, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "group flex items-center justify-between border-b border-neutral-200/70 pb-6",
                      "uppercase tracking-[0.2em] text-[15px]"
                    )}
                  >
                    <span
                      className={cx(
                        "transition-opacity",
                        active ? "opacity-40 pointer-events-none" : "opacity-90 group-hover:opacity-100"
                      )}
                    >
                      {t(key)}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 translate-x-0 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="md:hidden h-16" />
    </>
  );
}
