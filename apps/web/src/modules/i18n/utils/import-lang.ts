export const importLang = async (lang: string) => {
  return (await import(`@/static/locales/${lang}.json`)).default;
};
