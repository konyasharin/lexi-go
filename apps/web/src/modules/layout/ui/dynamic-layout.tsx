'use client';

import { FC } from 'react';
import { Toaster } from '@repo/components/shadcn';

export const DynamicLayout: FC = () => {
  return (
    <>
      <Toaster richColors position={'bottom-right'} />
    </>
  );
};
