import Image, { type StaticImageData } from "next/image";

type Props = {
    src: StaticImageData;
    alt: string;
    name: string;
    description: string;
    year: string;
    agency: string;
    creativeDirector: string;
    accountDirector: string;
};

export default function PortfolioItemContent({
    src,
    alt,
    name,
    year,
    agency,
    creativeDirector,
    accountDirector,
}: Props) {
    return (
        <div className="mx-auto w-full max-w-5xl">
            <div className="relative w-full pt-8">
                <Image
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-contain"
                    placeholder="blur"
                    priority
                    sizes="(min-width: 1024px) 800px, 100vw"
                />
            </div>
        </div>
    );
}
