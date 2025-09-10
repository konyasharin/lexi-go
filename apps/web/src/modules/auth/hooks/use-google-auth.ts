import { useEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { APP_PATHS } from "@/modules/routing";

import { useAuth } from "./use-auth";
import { useGoogleCodeController } from "./use-google-code-controller";

export const useGoogleAuth = (auth: ReturnType<typeof useAuth>) => {
  const handleCodeController = useGoogleCodeController();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();

  const redirectToGoogleOauth = () => {
    const url = new URL(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL!);
    const queryParams = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_HOST!}${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_PATH!}`,
      response_type: "code",
      scope: "openid profile email",
    };
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    redirect(url.toString());
  };

  const sendCode = () => {
    const code = searchParams.get("code");
    if (code) {
      handleCodeController.mutate(code);
    } else {
      router.push(APP_PATHS.SIGN_IN);
    }
  };

  useEffect(() => {
    if (handleCodeController.isSuccess) auth.updateTokenData();
  }, [handleCodeController.isSuccess]);

  useEffect(() => {
    if (handleCodeController.isError) {
      toast.error(t("COMMON.SOMETHING_ERROR"));
      console.error(handleCodeController.error);
      router.push(APP_PATHS.SIGN_IN);
    }
  }, [handleCodeController.isError]);

  return {
    redirectToGoogleOauth,
    sendCode,
    isLoading: handleCodeController.isPending,
  };
};
