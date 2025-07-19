import { routing } from '@repo/i18n';
import { importLang } from '@repo/i18n/messages';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await importLang(locale),
  };
});
