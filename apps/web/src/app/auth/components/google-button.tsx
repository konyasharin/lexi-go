'use client';

import { FC } from 'react';
import { Button } from '@repo/components/shadcn';

import { useGoogleAuth } from '@/modules/auth';

interface GoogleButtonProps {
  children?: string;
}

export const GoogleButton: FC<GoogleButtonProps> = props => {
  const googleAuth = useGoogleAuth();

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => googleAuth.redirectToGoogleOauth()}
    >
      {props.children}
    </Button>
  );
};
