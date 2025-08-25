// components/Sidebar.tsx
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { useTranslations } from "next-intl";

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
          <Link
            href="/"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="/works"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            {t("works")}
          </Link>
          <Link
            href="/about"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            {t("contact")}
          </Link>
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
        <p>All Rights Reserved</p>
        <p>Copyright © {year}</p>
        <p>Giordano Rispo</p>
      </div>
    </aside>
  );
}
