import { notFound } from "next/navigation";
import MobileHeader from "@/components/mobileHeader";
import Sidebar from "@/components/sidebar";
import MobileFooter from "@/components/mobileFooter";
import PortfolioItemContent from "@/components/portfolioItemContent";
import { type StaticImageData } from "next/image";

// images (intimita / main work)
import image1 from "@/assets/images/1.webp";
import image2 from "@/assets/images/2.webp";
import image3 from "@/assets/images/3.webp";
import image4 from "@/assets/images/4.webp";
import image5 from "@/assets/images/5.webp";
import image6 from "@/assets/images/6.webp";
import image7 from "@/assets/images/7.webp";
import image8 from "@/assets/images/8.webp";
import image9 from "@/assets/images/9.webp";
import image10 from "@/assets/images/10.webp";
import image11 from "@/assets/images/11.webp";
import image12 from "@/assets/images/12.webp";
import image13 from "@/assets/images/13.webp";
import image14 from "@/assets/images/14.webp";
import image15 from "@/assets/images/15.webp";
import image16 from "@/assets/images/16.webp";
import image17 from "@/assets/images/17.webp";
import image18 from "@/assets/images/18.webp";
import image19 from "@/assets/images/19.webp";
import image20 from "@/assets/images/20.webp";

// ritratti
import ritratti1 from "@/assets/ritratti/1.webp";
import ritratti2 from "@/assets/ritratti/2.webp";
import ritratti3 from "@/assets/ritratti/3.webp";
import ritratti4 from "@/assets/ritratti/4.webp";
import ritratti5 from "@/assets/ritratti/5.webp";
import ritratti6 from "@/assets/ritratti/6.webp";
import ritratti7 from "@/assets/ritratti/7.webp";
import ritratti8 from "@/assets/ritratti/8.webp";
import ritratti9 from "@/assets/ritratti/9.webp";
import ritratti10 from "@/assets/ritratti/10.webp";
import ritratti11 from "@/assets/ritratti/11.webp";
import ritratti12 from "@/assets/ritratti/12.webp";
import ritratti13 from "@/assets/ritratti/13.webp";
import ritratti14 from "@/assets/ritratti/14.webp";
import ritratti15 from "@/assets/ritratti/15.webp";
import ritratti16 from "@/assets/ritratti/16.webp";
import ritratti17 from "@/assets/ritratti/17.webp";
import ritratti18 from "@/assets/ritratti/18.webp";
import ritratti19 from "@/assets/ritratti/19.webp";
import ritratti20 from "@/assets/ritratti/20.webp";

// visions (scene di strada)
import visions1 from "@/assets/visions/1.webp";
import visions2 from "@/assets/visions/2.webp";
import visions3 from "@/assets/visions/3.webp";
import visions4 from "@/assets/visions/4.webp";
import visions5 from "@/assets/visions/5.webp";
import visions6 from "@/assets/visions/6.webp";
import visions7 from "@/assets/visions/7.webp";
import visions8 from "@/assets/visions/8.webp";
import visions9 from "@/assets/visions/9.webp";
import visions10 from "@/assets/visions/10.webp";
import visions11 from "@/assets/visions/11.webp";

type Artwork = {
  src: StaticImageData;
  alt: string;
  id: string;
  name: string;
  description: string;
  year: string;
  agency: string;
  creativeDirector: string;
  accountDirector: string;
};

const Artworks: Artwork[] = [
  // main work / intimita
  { src: image1, alt: "Image 1", id: "1", name: "Image 1", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image2, alt: "Image 2", id: "2", name: "Image 2", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image3, alt: "Image 3", id: "3", name: "Image 3", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image4, alt: "Image 4", id: "4", name: "Image 4", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image5, alt: "Image 5", id: "5", name: "Image 5", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image6, alt: "Image 6", id: "6", name: "Airalzh", description: "Artwork description", year: "2024", agency: "Komma", creativeDirector: "Arturo Massari", accountDirector: "Chiara Gaetani" },
  { src: image7, alt: "Image 7", id: "7", name: "Image 7", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image8, alt: "Image 8", id: "8", name: "Image 8", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image9, alt: "Image 9", id: "9", name: "Image 9", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image10, alt: "Image 10", id: "10", name: "Image 10", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image11, alt: "Image 11", id: "11", name: "Image 11", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image12, alt: "Image 12", id: "12", name: "Image 12", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image13, alt: "Image 13", id: "13", name: "Image 13", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image14, alt: "Image 14", id: "14", name: "Image 14", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image15, alt: "Image 15", id: "15", name: "Image 15", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image16, alt: "Image 16", id: "16", name: "Image 16", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image17, alt: "Image 17", id: "17", name: "Image 17", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image18, alt: "Image 18", id: "18", name: "Image 18", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image19, alt: "Image 19", id: "19", name: "Image 19", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image20, alt: "Image 20", id: "20", name: "Image 20", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },

  // ritratti
  { src: ritratti1, alt: "Ritratti 1", id: "ritratti-1", name: "Ritratti 1", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti2, alt: "Ritratti 2", id: "ritratti-2", name: "Ritratti 2", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti3, alt: "Ritratti 3", id: "ritratti-3", name: "Ritratti 3", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti4, alt: "Ritratti 4", id: "ritratti-4", name: "Ritratti 4", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti5, alt: "Ritratti 5", id: "ritratti-5", name: "Ritratti 5", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti6, alt: "Ritratti 6", id: "ritratti-6", name: "Ritratti 6", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti7, alt: "Ritratti 7", id: "ritratti-7", name: "Ritratti 7", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti8, alt: "Ritratti 8", id: "ritratti-8", name: "Ritratti 8", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti9, alt: "Ritratti 9", id: "ritratti-9", name: "Ritratti 9", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti10, alt: "Ritratti 10", id: "ritratti-10", name: "Ritratti 10", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti11, alt: "Ritratti 11", id: "ritratti-11", name: "Ritratti 11", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti12, alt: "Ritratti 12", id: "ritratti-12", name: "Ritratti 12", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti13, alt: "Ritratti 13", id: "ritratti-13", name: "Ritratti 13", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti14, alt: "Ritratti 14", id: "ritratti-14", name: "Ritratti 14", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti15, alt: "Ritratti 15", id: "ritratti-15", name: "Ritratti 15", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti16, alt: "Ritratti 16", id: "ritratti-16", name: "Ritratti 16", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti17, alt: "Ritratti 17", id: "ritratti-17", name: "Ritratti 17", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti18, alt: "Ritratti 18", id: "ritratti-18", name: "Ritratti 18", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti19, alt: "Ritratti 19", id: "ritratti-19", name: "Ritratti 19", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: ritratti20, alt: "Ritratti 20", id: "ritratti-20", name: "Ritratti 20", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },

  // visions (scene di strada)
  { src: visions1, alt: "Visions 1", id: "visions-1", name: "Visions 1", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions2, alt: "Visions 2", id: "visions-2", name: "Visions 2", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions3, alt: "Visions 3", id: "visions-3", name: "Visions 3", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions4, alt: "Visions 4", id: "visions-4", name: "Visions 4", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions5, alt: "Visions 5", id: "visions-5", name: "Visions 5", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions6, alt: "Visions 6", id: "visions-6", name: "Visions 6", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions7, alt: "Visions 7", id: "visions-7", name: "Visions 7", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions8, alt: "Visions 8", id: "visions-8", name: "Visions 8", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions9, alt: "Visions 9", id: "visions-9", name: "Visions 9", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions10, alt: "Visions 10", id: "visions-10", name: "Visions 10", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: visions11, alt: "Visions 11", id: "visions-11", name: "Visions 11", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
];

export default async function PortfolioItemPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const item = Artworks.find((a) => a.id === id);
    if (!item) notFound();

    return (
      <main className="noiseBackground">
        <MobileHeader />
        <div className="flex w-[100vw] overflow-hidden h-[calc(100dvh-4rem)] md:h-[100dvh]">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <section className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col">
            <PortfolioItemContent {...item} />
            <div className="mt-12 md:hidden">
              <MobileFooter />
            </div>
          </section>
        </div>
      </main>
    );
  }

  export function generateStaticParams() {
    return Artworks.map((a) => ({ id: a.id }));
  }
