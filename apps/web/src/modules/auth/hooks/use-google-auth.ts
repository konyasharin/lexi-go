'use client';

// import { useContext, useEffect } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import { redirect, useSearchParams } from 'next/navigation';
//
// import { useTRPC } from '@/modules/trpc';
//
// import { AuthContext } from '../context';
// import { TokensService } from '../utils';

export const useGoogleAuth = () => {
  // const trpc = useTRPC();
  // const handleCodeController = useMutation(
  //   trpc.auth.authWithGoogle.mutationOptions(),
  // );
  // const searchParams = useSearchParams();
  // const auth = useContext(AuthContext);

  const redirectToGoogleOauth = () => {
    // const url = new URL(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL!);
    // const queryParams = {
    //   client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    //   redirect_uri: `${process.env.NEXT_PUBLIC_HOST!}${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_PATH!}`,
    //   response_type: 'code',
    //   scope: 'openid profile email',
    // };
    // Object.entries(queryParams).forEach(([key, value]) => {
    //   url.searchParams.append(key, value);
    // });
    // redirect(url.toString());
  };

  const sendCode = () => {
    // const code = searchParams.get('code');
    // if (code) {
    //   handleCodeController.mutate(code);
    // }
  };

  // useEffect(() => {
  //   if (handleCodeController.data?.tokens) {
  //     TokensService.setTokens(handleCodeController.data.tokens);
  //     auth?.setUserFromLocalStorageToken();
  //   }
  // }, [handleCodeController.data]);

  return {
    redirectToGoogleOauth,
    sendCode,
  };
};
