import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return <button>{t('test')}</button>;
}
