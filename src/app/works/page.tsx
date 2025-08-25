
import MobileHeader from "@/components/mobileHeader";
import Sidebar from "@/components/sidebar";
import WorkContent from "@/components/workContent";
import MobileFooter from "@/components/mobileFooter";
import LanguageSwitch from "@/components/languageSwitch";

export default function Works() {
  return (
    <main className="noiseBackground">
      <MobileHeader />
      <div className="flex w-[100vw] overflow-hidden h-[calc(100dvh-4rem)] md:h-[100dvh]">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <section className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col will-change-transform">
          <div className="flex w-full flex-row justify-end gap-2 min-h-[3rem] mb-8">
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
