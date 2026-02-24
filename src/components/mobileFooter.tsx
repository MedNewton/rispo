import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from 'react-icons/ai';

const MobileFooter = () => {
    const year = new Date().getFullYear();

    return (
        <div className="flex flex-row items-end justify-between pt-8 pb-4">
            <div className="text-sm text-neutral-500 font-light space-y-1 w-full">
                <p>All Rights Reserved</p>
                <p>Copyright © {year}</p>
                <p>Giordano Rispo</p>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Link
                    href="https://www.instagram.com/giordanonadroig"
                    target="_blank"
                    className="text-white hover:text-neutral-400 transition-colors"
                >
                    <FaInstagram size={32} />
                </Link>
                <Link
                    href="https://www.tiktok.com/@giordanorispo"
                    target="_blank"
                    className="text-white hover:text-neutral-400 transition-colors"
                >
                    <AiFillTikTok size={32} />
                </Link>

            </div>
        </div>
    );
};

export default MobileFooter;
