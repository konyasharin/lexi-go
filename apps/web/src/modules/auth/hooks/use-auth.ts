import { useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { userSchema, UserSchemaInfer } from '../types';
import { TokensService } from '../utils';

import { APP_PATHS } from '@/shared/constants';

export const useAuth = () => {
  const router = useRouter();
  const t = useTranslations();
  const [user, setUser] = useState<UserSchemaInfer | null>(null);

  const setUserFromLocalStorageToken = () => {
    const token = TokensService.getAccessToken();
    if (!token) return router.push(APP_PATHS.SIGN_IN);

    const decodedUser = userSchema.safeParse(jwt.decode(token));
    if (!decodedUser.success) return console.error(decodedUser.error);

    setUser(decodedUser.data);
    toast.success(t('AUTH.SIGN_IN_SUCCESSFULLY'));
    router.push(APP_PATHS.MAIN);
  };

  return {
    user,
    setUserFromLocalStorageToken,
  };
};
