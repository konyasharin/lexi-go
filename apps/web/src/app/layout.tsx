import { ReactNode, Suspense } from 'react';
import clsx from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { getLocale, getMessages } from 'next-intl/server';

import { Layout } from '@/modules/layout';

import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Lexi-Go',
  description: 'Learning languages application',
};

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Ensure that the incoming `locale` is valid
  const locale = await getLocale();
  const messages = await getMessages({ locale: locale });

  return (
    <html lang={locale}>
      <body
        className={clsx(
          `${geistSans.variable} ${geistMono.variable}`,
          'dark bg-background text-foreground',
        )}
      >
        <Providers i18n={{ locale, messages }}>
          <Suspense>
            <Layout>{children}</Layout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
