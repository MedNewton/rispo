// components/page1Content.tsx
import Image, { type StaticImageData } from "next/image";

import image1 from "../assets/images/1.webp";
import image2 from "../assets/images/2.webp";
import image3 from "../assets/images/3.webp";
import image4 from "../assets/images/4.webp";
import image5 from "../assets/images/5.webp";
import image6 from "../assets/images/6.webp";
import image7 from "../assets/images/7.webp";
import image8 from "../assets/images/8.webp";
import image9 from "../assets/images/9.webp";
import image10 from "../assets/images/10.webp";
import image11 from "../assets/images/11.webp";
import image12 from "../assets/images/12.webp";
import image13 from "../assets/images/13.webp";
import image14 from "../assets/images/14.webp";
import image15 from "../assets/images/15.webp";
import image16 from "../assets/images/16.webp";
import image17 from "../assets/images/17.webp";
import image18 from "../assets/images/18.webp";
import image19 from "../assets/images/19.webp";
import image20 from "../assets/images/20.webp";

const IMAGES: { src: StaticImageData; alt: string }[] = [
  { src: image1, alt: "Image 1" },
  { src: image2, alt: "Image 2" },
  { src: image3, alt: "Image 3" },
  { src: image4, alt: "Image 4" },
  { src: image5, alt: "Image 5" },
  { src: image6, alt: "Image 6" },
  { src: image7, alt: "Image 7" },
  { src: image8, alt: "Image 8" },
  { src: image9, alt: "Image 9" },
  { src: image10, alt: "Image 10" },
  { src: image11, alt: "Image 11" },
  { src: image12, alt: "Image 12" },
  { src: image13, alt: "Image 13" },
  { src: image14, alt: "Image 14" },
  { src: image15, alt: "Image 15" },
  { src: image16, alt: "Image 16" },
  { src: image17, alt: "Image 17" },
  { src: image18, alt: "Image 18" },
  { src: image19, alt: "Image 19" },
  { src: image20, alt: "Image 20" },
];

export default function Page3Content() {
  return (
    <div
      className="
        columns-1 sm:columns-2 lg:columns-3
        gap-6
        [column-fill:_balance]
      "
    >
      {IMAGES.map(({ src, alt }, i) => (
        <figure
          key={i}
          className="mb-6 break-inside-avoid overflow-hidden"
        >
          <Image
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
            placeholder="blur"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </figure>
      ))}
    </div>
  );
}
