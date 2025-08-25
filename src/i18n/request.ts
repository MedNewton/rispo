import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = (await cookies()).get('locale')?.value ?? 'en';

  const mod = (await import(`../translations/${locale}.json`)) as {
    default: Record<string, unknown>;
  };
  const messages = mod.default;

  return { locale, messages };
});
