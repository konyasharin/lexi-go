'use client';

import { FC, ReactNode } from 'react';

interface ProvidersProps {
  children?: ReactNode;
}

export const Providers: FC<ProvidersProps> = props => {
  return props.children;
};
