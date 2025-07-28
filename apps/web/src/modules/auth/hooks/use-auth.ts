'use client';

import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

import { userSchema, UserSchemaInfer } from '../types';
import { TokensService } from '../utils';

import { APP_PATHS } from '@/shared/constants';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserSchemaInfer | null>(null);

  const setUserFromLocalStorageToken = () => {
    const token = TokensService.getAccessToken();
    if (token) {
      const decodedUser = userSchema.safeParse(jwt.decode(token));

      if (decodedUser.success) return setUser(decodedUser.data);
      console.error(decodedUser.error);
    }
    router.push(APP_PATHS.SIGN_IN);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return {
    user,
    setUserFromLocalStorageToken,
  };
};
