// components/Sidebar.tsx
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";



export default function Sidebar() {
  const year = new Date().getFullYear();

  return (
    <aside className="h-[100dvh] w-[320px] shrink-0 px-6 py-7 hidden lg:flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-20">
        <Link href="/">
          <h1 className="text-lg tracking-[0.2em] font-semibold uppercase">Giordano Rispo</h1>
        </Link>
        <nav className="mt-8 space-y-3">
          <Link
            href="/category1"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            category 1
          </Link>
          <Link
            href="/category2"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            category 2
          </Link>
          <Link
            href="/category3"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            category 3
          </Link>
          <Link
            href="/about"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            about
          </Link>
          <Link
            href="/contacts"
            className="block text-sm text-white hover:text-neutral-400 capitalize transition-colors"
          >
            contact
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
