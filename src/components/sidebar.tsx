// components/Sidebar.tsx
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";



export default function Sidebar() {
  const year = new Date().getFullYear();

  return (
    <aside className="h-[100dvh] w-[320px] shrink-0 border-r border-neutral-200 px-6 py-7 hidden lg:flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-20">
        <h1 className="text-lg tracking-[0.2em] font-semibold uppercase">Giordano Rispoli</h1>

        <nav className="mt-8 space-y-3">
          <Link className="block text-sm text-neutral-700 hover:text-black lowercase" href="/advertising">advertising</Link>
          <Link className="block text-sm text-neutral-700 hover:text-black lowercase" href="/portraits">portraits</Link>
          <Link className="block text-sm text-neutral-700 hover:text-black lowercase" href="/fine-art">fine art</Link>
          <Link className="block text-sm text-neutral-700 hover:text-black lowercase" href="/exhibitions">exhibitions</Link>
          <Link className="block text-sm text-neutral-700 hover:text-black lowercase" href="/contacts">contacts</Link>
        </nav>

        <div className="flex flex-row items-center gap-2">
          <Link href="https://www.instagram.com/marioermoli/" target="_blank" className="text-neutral-700 hover:text-black">
            <FaInstagram size={18} color="#fff" />
          </Link>
          <Link href="https://www.linkedin.com/in/marioermoli/" target="_blank" className="text-neutral-700 hover:text-black">
            <FaLinkedin size={18} color="#fff" />
          </Link>
        </div>
      </div>
      <div className="text-xs text-neutral-500 font-light space-y-1">
        <p>All Rights Reserved</p>
        <p>Copyright © {year}</p>
        <p>Mario Ermoli</p>
      </div>
    </aside>
  );
}
