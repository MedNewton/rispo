import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaInstagram } from 'react-icons/fa6';
import { FaLinkedin, FaFacebookSquare } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';

export default function ContactsContent() {
  const t = useTranslations();
  return (
    <div className="max-w-3xl">
      <h2 className="uppercase tracking-widest text-2xl font-light text-neutral-300">
        {t('contactInfo')}
      </h2>

      <hr className="my-6 border-neutral-500/50" />
      <section>
        <h3 className="uppercase tracking-wide text-xl font-light text-white">
          Giordano Rispo
        </h3>

        <div className="mt-4 text-sm leading-6 text-neutral-400">
          <p>{t('cities')}</p>
          <p className="mt-2">
            <Link
              href="mailto:giorispo01@gmail.com"
              className="text-white hover:text-neutral-400 transition-colors underline-offset-2 hover:underline"
            >
              giorispo01@gmail.com
            </Link>
          </p>
        </div>
      </section>

      <hr className="mt-3 mb-6 border-neutral-500/50" />
      <section>
        <h3 className="uppercase tracking-wide text-xl font-light text-white">
        {t('represented')}
        </h3><br />
        <h3 className="uppercase tracking-wide text-xl font-light text-white">
          Barbara Silbe
        </h3>

        <div className="mt-4 text-sm leading-6 text-neutral-400">
          <p className="mt-2">
            <Link
              href="mailto:barbara.silbe@eyesopen.it"
              className="text-white hover:text-neutral-400 transition-colors underline-offset-2 hover:underline"
            >
              barbara.silbe@eyesopen.it
            </Link>
          </p><br />
        </div>
      </section>

      <hr className="border-neutral-500/50" />

      <div className="flex flex-row items-center gap-2 pt-4">
          <Link
            href="https://www.instagram.com/giordanonadroig"
            target="_blank"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            <FaInstagram size={22} />
          </Link>
          <Link
            href="https://www.tiktok.com/@giordanorispo"
            target="_blank"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            <AiFillTikTok size={24} />
          </Link>
        </div>
    </div>
  );
}
