import Image from "next/image";
import Link from "next/link";

import image2 from "@/assets/images/2.webp";
import image6 from "@/assets/images/6.webp";
import image12 from "@/assets/images/12.webp";

export default function HomepageContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 lg:pt-0">
      <Link href="/category1" className="flex flex-col h-[550px]">
        <div className="flex flex-col h-[550px]">
          <div className="relative flex-1">
            <Image src={image6} alt="Image 3" fill className="object-cover" />
          </div>
          <h6 className="text-2xl font-light mt-4 self-start">
            Category 1
          </h6>
        </div>
      </Link>
      <Link href="/category2" className="flex flex-col h-[550px]">
        <div className="flex flex-col h-[550px]">
          <div className="relative flex-1">
            <Image src={image12} alt="Image 9" fill className="object-cover" />
          </div>
          <h6 className="text-2xl font-light mt-4 self-start">
            Category 2
          </h6>
        </div>
      </Link>
      <Link href="/category3" className="flex flex-col h-[550px]">
        <div className="flex flex-col h-[550px]">
          <div className="relative flex-1">
            <Image src={image2} alt="Image 17" fill className="object-cover" />
          </div>
          <h6 className="text-2xl font-light mt-4 self-start">
            Category 3
          </h6>
        </div>
      </Link>
    </div>
  );
}
