import Link from "next/link";
import { useTranslations } from "next-intl";

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
              href="mailto:barbara.silbe@ilgiornale.it"
              className="text-white hover:text-neutral-400 transition-colors underline-offset-2 hover:underline"
            >
              barbara.silbe@ilgiornale.it
            </Link>
          </p><br />
        </div>
      </section>

      <hr className="border-neutral-500/50" />
    </div>
  );
}
