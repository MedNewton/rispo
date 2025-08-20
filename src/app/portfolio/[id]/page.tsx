import { notFound } from "next/navigation";
import MobileHeader from "@/components/mobileHeader";
import Sidebar from "@/components/sidebar";
import MobileFooter from "@/components/mobileFooter";
import PortfolioItemContent from "@/components/portfolioItemContent";
import { type StaticImageData } from "next/image";

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
  { src: image13, alt: "Image 13", id: "13", name: "Image 13", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith"  },
  { src: image14, alt: "Image 14", id: "14", name: "Image 14", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image15, alt: "Image 15", id: "15", name: "Image 15", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image16, alt: "Image 16", id: "16", name: "Image 16", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image17, alt: "Image 17", id: "17", name: "Image 17", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image18, alt: "Image 18", id: "18", name: "Image 18", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image19, alt: "Image 19", id: "19", name: "Image 19", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
  { src: image20, alt: "Image 20", id: "20", name: "Image 20", description: "Artwork description", year: "2021", agency: "Agency 1", creativeDirector: "John Doe", accountDirector: "Jane Smith" },
];

type MaybePromise<T> = T | Promise<T>;

export default async function PortfolioItemPage({
  params,
}: {
  params: MaybePromise<{ id: string }>;
}) {
  const { id } = await Promise.resolve(params);
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