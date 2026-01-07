"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import MobileLanguageSwitch from "./mobileLanguageSwitch";

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

type NavKey = "home" | "works" | "about" | "curatorPageTitle" | "contact";
type NavItem = { key: NavKey; href: string };



type WorksSubItem = Readonly<{ label: string; href: string }>;


export default function MobileHeader() {
  const t = useTranslations();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  // Submenu: hidden by default
  const [worksOpen, setWorksOpen] = useState(false);
  const submenuContentRef = useRef<HTMLDivElement | null>(null);
  const [submenuHeight, setSubmenuHeight] = useState(0);

  useEffect(() => {
    setOpen(false);
    setWorksOpen(false);
  }, [pathname]);

  useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    style.overflow = open ? "hidden" : prev || "";
    return () => {
      style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setWorksOpen(false);
  }, [open]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
  };

  // Measure submenu height so closed is always 0px
  useEffect(() => {
    const el = submenuContentRef.current;
    if (!el) return;

    const measure = () => setSubmenuHeight(el.scrollHeight);

    if (worksOpen) {
      measure();
      const ro = new ResizeObserver(() => measure());
      ro.observe(el);
      return () => ro.disconnect();
    }

    setSubmenuHeight(0);
  }, [worksOpen]);

  const NAV: NavItem[] = [
    { key: "home", href: "/" },
    { key: "works", href: "/works" }, // trigger only
    { key: "about", href: "/about" },
    { key: "curatorPageTitle", href: "/test-curatoriale" },
    { key: "contact", href: "/contact" },
  ];

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
              if (key === "works") {
                const worksActive = isActive("/works");
                const WORKS_SUB: ReadonlyArray<WorksSubItem> = [
                  { href: '/intimita', label: t('category1Title') },
                  { href: '/scene-di-strada', label: t('category2Title') },
                  { href: '/ritratti', label: t('category3Title') },
                ];

                return (
                  <li key="works">
                    {/* Works row */}
                    <button
                      type="button"
                      aria-expanded={worksOpen}
                      aria-controls="works-submenu"
                      onClick={() => setWorksOpen((v) => !v)}
                      className={cx(
                        "group flex w-full items-center justify-between pb-6 text-left",
                        "uppercase tracking-[0.2em] text-[15px]",
                        // IMPORTANT:
                        // - When closed: show separator under Works.
                        // - When open: REMOVE separator under Works so submenu attaches directly.
                        worksOpen ? "border-b-0" : "border-b border-neutral-200/70"
                      )}
                    >
                      <span
                        className={cx(
                          "transition-opacity",
                          worksActive ? "opacity-40" : "opacity-90 group-hover:opacity-100"
                        )}
                      >
                        {t("works")}
                      </span>

                      {/* Chevron rotation fix: use transform + transition-transform explicitly */}
                      <svg
                        viewBox="0 0 24 24"
                        className={cx(
                          "h-4 w-4 transform transition-transform duration-200",
                          worksOpen ? "rotate-90" : "rotate-0"
                        )}
                        aria-hidden="true"
                      >
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </button>

                    {/* Inline submenu (pushes About down). True 0px when closed */}
                    <div
                      id="works-submenu"
                      className="overflow-hidden transition-[height] duration-200 ease-out"
                      style={{ height: worksOpen ? submenuHeight : 0 }}
                      aria-hidden={!worksOpen}
                    >
                      <div
                        ref={submenuContentRef}
                        className={cx(
                          // No "pt" gap that would look like a separator; keep it tight to Works.
                          "pb-2",
                          "transition-[opacity,transform] duration-200 ease-out",
                          worksOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
                          worksOpen ? "pointer-events-auto" : "pointer-events-none"
                        )}
                      >
                        {/* No separators between submenu items, only spacing + left padding */}
                        <ul className="pl-6">
                          {WORKS_SUB.map((item, i) => {
                            const subActive = isActive(item.href);
                            const isLast = i === WORKS_SUB.length - 1;

                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  aria-current={subActive ? "page" : undefined}
                                  className={cx(
                                    "group flex items-center justify-between",
                                    "uppercase tracking-[0.2em] text-[15px]"
                                  )}
                                >
                                  <span
                                    className={cx(
                                      "transition-opacity",
                                      subActive ? "opacity-40 pointer-events-none" : "opacity-90 group-hover:opacity-100"
                                    )}
                                    style={{
                                      paddingLeft: "0.5rem",
                                      ...(isLast ? {} : { paddingBottom: "1.5rem" }),
                                    }}
                                  >
                                    {item.label}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}

                        </ul>
                      </div>
                    </div>
                  </li>
                );
              }

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
