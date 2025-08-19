// app/page.tsx
import Sidebar from "../components/sidebar";

export default function HomePage() {
  return (
    <main className="noiseBackground">
      <div className="flex h-[100dvh] w-[100vw] overflow-hidden">
        <Sidebar />
        <section className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 md:px-8 py-4 sm:py-6">
         
        </section>
      </div>
    </main>
  );
}
