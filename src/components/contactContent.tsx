import Link from "next/link";

export default function ContactsContent() {
  return (
    <div className="max-w-3xl">
      <h2 className="uppercase tracking-widest text-2xl font-light text-neutral-300">
        Contact Info
      </h2>

      <hr className="my-6 border-neutral-500/50" />
      <section>
        <h3 className="uppercase tracking-wide text-xl font-light text-white">
          Studio Giordano Rispo
        </h3>

        <div className="mt-4 text-sm leading-6 text-neutral-400">
          <p>Via XXX, 100</p>
          <p>30222 – Milano</p>
          <p>Italy</p>
          <p className="mt-2">
            <Link
              href="mailto:info@giordanorispo.com"
              className="text-white hover:text-neutral-400 transition-colors underline-offset-2 hover:underline"
            >
              info@giordanorispo.com
            </Link>
          </p>
        </div>
      </section>
      <p className="mt-8 text-xs uppercase tracking-wide text-neutral-400">
        Represented by:
      </p>
      <hr className="mt-3 mb-6 border-neutral-500/50" />
      <section>
        <h3 className="uppercase tracking-wide text-xl font-light text-white">
          Mandala Creative Productions
        </h3>

        <div className="mt-4 text-sm leading-6 text-neutral-400">
          <p>Via Lomazzo, 58</p>
          <p>20154 – Milano</p>
          <p>Italy</p>
          <p>
            T{" "}
            <Link
              href="tel:+390236635750"
              className="text-white hover:text-neutral-400 transition-colors"
            >
              +39 02 36635750
            </Link>
          </p>
          <p>
            F{" "}
            <Link
              href="tel:+390236635769"
              className="text-white hover:text-neutral-400 transition-colors"
            >
              +39 02 36635769
            </Link>
          </p>
          <p className="mt-2">
            <Link
              href="mailto:info@mandalacp.it"
              className="text-white hover:text-neutral-400 transition-colors underline-offset-2 hover:underline"
            >
              info@mandalacp.it
            </Link>
          </p>
        </div>
      </section>

      <p className="mt-8 text-xs uppercase tracking-wide text-neutral-400">
        For Fine Art Prints:
      </p>
      <hr className="mt-3 mb-6 border-neutral-500/50" />
      <section className="mb-10">
        <h3 className="uppercase tracking-wide text-xl font-light text-white">
          Galleria Valeria Bella
        </h3>

        <div className="mt-4 text-sm leading-6 text-neutral-400">
          <p>Via Santa Cecilia, 2</p>
          <p>20122 – Milano</p>
          <p>
            T{" "}
            <Link
              href="tel:+390276004413"
              className="text-white hover:text-neutral-400 transition-colors"
            >
              +39 02 76004413
            </Link>
          </p>
          <p>
            <Link
              href="mailto:photo@valeriabella.com"
              className="text-white hover:text-neutral-400 transition-colors underline-offset-2 hover:underline"
            >
              photo@valeriabella.com
            </Link>
          </p>
        </div>
      </section>

      <hr className="border-neutral-500/50" />
    </div>
  );
}
