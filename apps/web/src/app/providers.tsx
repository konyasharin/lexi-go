'use client';

import { FC, ReactNode } from 'react';
import { Locale, NextIntlClientProvider, useMessages } from 'next-intl';

interface ProvidersProps {
  i18n: {
    locale: Locale;
    messages: ReturnType<typeof useMessages>;
  };
  children?: ReactNode;
}

export const Providers: FC<ProvidersProps> = props => {
  return (
    <NextIntlClientProvider {...props.i18n}>
      {props.children}
    </NextIntlClientProvider>
  );
};
