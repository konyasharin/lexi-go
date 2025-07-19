export const importLang = async (lang: string) => {
  return (await import(`../messages/${lang}.json`)).default;
};
