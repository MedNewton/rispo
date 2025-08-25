// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import { FaInstagram } from 'react-icons/fa6';
import { FaLinkedin, FaFacebookSquare } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import { useTranslations } from 'next-intl';

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  const active =
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/');

  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className="group block text-inherit">
      <span className="relative inline-flex items-center text-sm">
        {/* Label (force color with ! to beat globals) */}
        <span
          aria-hidden="true"
          className={`mr-1 mt-1 h-1 w-1 rounded-full bg-white transition-all ${
            active ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        />
        <span
          className={[
            'capitalize transition-colors',
            active
              ? '!text-white'
              : '!text-neutral-400 group-hover:!text-neutral-200',
          ].join(' ')}
        >
          {label}
        </span>
      </span>
    </Link>
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
          <NavItem href="/works" label={t('works')} />
          <NavItem href="/about" label={t('about')} />
          <NavItem href="/contact" label={t('contact')} />
        </nav>

        <div className="flex flex-row items-center gap-2">
          <Link href="https://www.instagram.com/giordanonadroig" target="_blank" className="text-white hover:text-neutral-400 transition-colors">
            <FaInstagram size={22} />
          </Link>
          <Link href="https://www.linkedin.com/in/giordano-rispo-0103a1226/" target="_blank" className="text-white hover:text-neutral-400 transition-colors">
            <FaLinkedin size={22} />
          </Link>
          <Link href="https://www.facebook.com/gio.rispo/" target="_blank" className="text-white hover:text-neutral-400 transition-colors">
            <FaFacebookSquare size={22} />
          </Link>
          <Link href="https://www.tiktok.com/@giordanorispo" target="_blank" className="text-white hover:text-neutral-400 transition-colors">
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
