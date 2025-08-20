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
            <div className="relative w-full">
                <Image
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-contain"
                    placeholder="blur"
                    priority
                    sizes="(min-width: 1024px) 800px, 100vw"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-10 md:mt-12 w-full items-end">
                <div>
                    <h2 className="text-xl md:text-2xl font-light text-white">{name}</h2>
                    <p className="mt-6 text-base font-light uppercase tracking-wide text-neutral-400">
                        {year}
                    </p>
                </div>
                <div className="text-sm leading-7 text-neutral-300 md:flex md:justify-end md:text-right">
                    <dl className="space-y-2">
                        <div className="flex gap-3 md:justify-end">
                            <dt className="w-40 shrink-0 text-neutral-400">Agency</dt>
                            <dd className="flex-1">{agency}</dd>
                        </div>
                        <div className="flex gap-3 md:justify-end">
                            <dt className="w-40 shrink-0 text-neutral-400">Creative Director</dt>
                            <dd className="flex-1">{creativeDirector}</dd>
                        </div>
                        <div className="flex gap-3 md:justify-end">
                            <dt className="w-40 shrink-0 text-neutral-400">Account Director</dt>
                            <dd className="flex-1">{accountDirector}</dd>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    );
}
