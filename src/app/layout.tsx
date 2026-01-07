import '@/styles/globals.css';
import {Poppins} from 'next/font/google';
import { type Metadata } from "next";
import DisableImageContext from '@/components/DisableImageContext';
import {getMessages, getLocale, getTranslations} from 'next-intl/server'; 
import { NextIntlClientProvider } from 'next-intl';
const poppins = Poppins({ weight: ['400','500','600','700'], subsets: ['latin'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: "Giordano Rispo | Fotografo",
  description: "Build Here, Grow Anywhere",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default async function RootLayout({children}: {children: React.ReactNode}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html lang={locale} className={poppins.variable}>
      <body>
        <DisableImageContext message={t('imageContextMessage')} durationMs={1400} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
