// app/category3/page.tsx
import MobileHeader from "@/components/mobileHeader";
import Sidebar from "@/components/sidebar";
import Page3Content from "@/components/page3Content";
import MobileFooter from "@/components/mobileFooter";

export default function Category3() {
  return (
    <main className="noiseBackground">
      <MobileHeader />
      <div className="flex w-[100vw] overflow-hidden h-[calc(100dvh-4rem)] md:h-[100dvh]">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <section className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col">
          <Page3Content />
          <div className="mt-8 md:hidden">
            <MobileFooter />
          </div>
        </section>
      </div>
    </main>
  );
}
