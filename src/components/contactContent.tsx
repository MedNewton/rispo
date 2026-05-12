'use client';

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaInstagram } from 'react-icons/fa6';
import { AiFillTikTok } from 'react-icons/ai';
import { env } from "../env";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactsContent() {
  const t = useTranslations();
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const accessKey = env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", accessKey);
    data.append("subject", "New contact form submission — giordanorispo.com");
    data.append("from_name", "Giordano Rispo Website");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { success?: boolean };
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full">
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

      <form
        className="w-full max-w-xl flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        {/* Honeypot field to deter bots — must stay hidden */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <label htmlFor="contact-name" className="sr-only">
            {t('formName')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder={t('formName')}
            className="w-full bg-black text-white placeholder:text-white/40 border-0 border-b border-white focus:outline-none focus:border-white py-3 px-0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact-email" className="sr-only">
            {t('formEmail')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder={t('formEmail')}
            className="w-full bg-black text-white placeholder:text-white/40 border-0 border-b border-white focus:outline-none focus:border-white py-3 px-0"
          />
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="contact-type" className="sr-only">
            {t('formTypeLabel')}
          </label>
          <select
            id="contact-type"
            name="type"
            defaultValue="buyer"
            className="w-full appearance-none bg-black text-white border-0 border-b border-white focus:outline-none focus:border-white py-3 pr-8 pl-0 cursor-pointer"
          >
            <option value="buyer" className="bg-black text-white">
              {t('formTypeBuyer')}
            </option>
            <option value="collaborator" className="bg-black text-white">
              {t('formTypeCollaborator')}
            </option>
            <option value="other" className="bg-black text-white">
              {t('formTypeOther')}
            </option>
          </select>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact-message" className="sr-only">
            {t('formMessage')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder={t('formMessage')}
            className="w-full resize-none bg-black text-white placeholder:text-white/40 border-0 border-b border-white focus:outline-none focus:border-white py-3 px-0"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start bg-white text-black uppercase tracking-[0.2em] text-sm font-medium px-8 py-3 hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? t('formSending') : t('formSend')}
          </button>
          {status === "success" && (
            <p role="status" className="text-sm text-white/80">
              {t('formSuccess')}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-400">
              {t('formError')}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
