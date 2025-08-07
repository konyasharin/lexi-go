'use client';

import { useEffect } from 'react';
import { Loader } from '@repo/components/ui';
import { useTranslations } from 'next-intl';

import { useGoogleAuth } from '@/modules/auth/client';

export default function GoogleOauth() {
  const googleAuth = useGoogleAuth();
  const t = useTranslations();

  useEffect(() => {
    googleAuth.sendCode();
  }, []);

  return <Loader label={t('COMMON.LOADING')} />;
}
