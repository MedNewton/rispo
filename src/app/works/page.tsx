"use client";

import dynamic from 'next/dynamic';

import MobileHeader from '@/components/mobileHeader';
import Sidebar from '@/components/sidebar';
import MobileFooter from '@/components/mobileFooter';
import LanguageSwitch from '@/components/languageSwitch';

const WorkContent = dynamic(
  () => import('@/components/workContent').then(m => m.default),
  { ssr: false, loading: () => <SkeletonGrid /> }
);

function SkeletonGrid() {
  const blocks = Array.from({ length: 9 });
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 pt-4 lg:pt-0">
      {blocks.map((_, i) => (
        <div key={i} className="mb-6 break-inside-avoid">
          <div className="w-full h-[280px] rounded-lg animate-shimmer" />
        </div>
      ))}
    </div>
  );
}

export default function Works() {
  return (
    <main className="noiseBackground">
      <MobileHeader />
      <div className="flex w-[100vw] overflow-hidden h-[calc(100dvh-4rem)] md:h-[100dvh]">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <section className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col will-change-transform">
          <div className="w-full flex-row justify-end gap-2 min-h-[3rem] mb-8 hidden lg:flex">
            <LanguageSwitch />
          </div>
          <WorkContent />
          <div className="mt-8 md:hidden">
            <MobileFooter />
          </div>
        </section>
      </div>
    </main>
  );
}
