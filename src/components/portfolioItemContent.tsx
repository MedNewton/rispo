'use client';

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
    src: StaticImageData;
    alt: string;
    name: string;
    description: string;
    year: string;
    agency: string;
    creativeDirector: string;
    accountDirector: string;
    prevId: string;
    nextId: string;
};

export default function PortfolioItemContent({
    src,
    alt,
    prevId,
    nextId,
}: Props) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="mx-auto w-full max-w-5xl flex-1 flex items-center justify-center">
            <div className="relative w-full flex justify-center">
                <Image
                    src={src}
                    alt={alt}
                    className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                    placeholder="blur"
                    priority
                    sizes="(min-width: 1024px) 800px, 100vw"
                    onLoad={() => setLoaded(true)}
                />
                {loaded && (
                    <>
                        <Link
                            href={`/portfolio/${prevId}`}
                            aria-label="Previous image"
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </Link>
                        <Link
                            href={`/portfolio/${nextId}`}
                            aria-label="Next image"
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
