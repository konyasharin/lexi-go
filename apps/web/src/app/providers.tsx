'use client';

import { FC, ReactNode, useState } from 'react';
import { AppRouter } from '@repo/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { Locale, NextIntlClientProvider, useMessages } from 'next-intl';

import { TRPCProvider } from '@/modules/trpc';

interface ProvidersProps {
  i18n: {
    locale: Locale;
    messages: ReturnType<typeof useMessages>;
  };
  children?: ReactNode;
}

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
};
let browserQueryClient: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export const Providers: FC<ProvidersProps> = props => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_HOST!}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <NextIntlClientProvider {...props.i18n}>
          {props.children}
        </NextIntlClientProvider>
      </TRPCProvider>
    </QueryClientProvider>
  );
};
