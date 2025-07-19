export const importLang = async (lang: string) => {
  return (await import(`./${lang}.json`)).default;
};
