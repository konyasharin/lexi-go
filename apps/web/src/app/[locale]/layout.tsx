import { ReactNode } from 'react';
import { routing } from '@repo/i18n';
import clsx from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';

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
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const messages = await getMessages({ locale: locale });
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={clsx(
          `${geistSans.variable} ${geistMono.variable}`,
          'dark bg-background text-foreground',
        )}
      >
        <Providers locale={locale} messages={messages}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
