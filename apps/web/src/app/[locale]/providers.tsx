'use client';

import { FC, ReactNode } from 'react';
import { Locale, NextIntlClientProvider, useMessages } from 'next-intl';

interface ProvidersProps {
  locale: Locale;
  messages: ReturnType<typeof useMessages>;
  children?: ReactNode;
}

export const Providers: FC<ProvidersProps> = props => {
  return (
    <NextIntlClientProvider locale={props.locale} messages={props.messages}>
      {props.children}
    </NextIntlClientProvider>
  );
};
