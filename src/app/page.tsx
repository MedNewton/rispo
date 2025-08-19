// app/page.tsx
import MobileHeader from "../components/mobileHeader";
import Sidebar from "../components/sidebar";

export default function HomePage() {
  return (
    <main className="noiseBackground">
      <MobileHeader />

      {/* Fill the viewport: on mobile subtract header (4rem), on md+ use full height */}
      <div className="flex w-[100vw] overflow-hidden h-[calc(100dvh-4rem)] md:h-[100dvh]">
        {/* Sidebar only on md+ */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Scrollable content area (scrollbar hidden) */}
        <section className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          {/* content goes here */}
        </section>
      </div>
    </main>
  );
}
