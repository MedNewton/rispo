// app/page.tsx
import MobileHeader from "../../components/mobileHeader";
import Sidebar from "../../components/sidebar";
import AboutContent from "../../components/aboutContent";

export default function About() {
    return (
        <main className="noiseBackground">
            <MobileHeader />
            <div className="flex w-[100vw] overflow-hidden h-[calc(100dvh-4rem)] md:h-[100dvh]">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <section className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 md:px-8 py-4 sm:py-6">
                    <AboutContent />
                </section>
            </div>
        </main>
    );
}
