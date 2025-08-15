"use client";

import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@repo/components/shadcn";

import { useGoogleAuth } from "@/modules/auth/client";

interface GoogleOauthButtonProps {
  children?: string;
}

export const GoogleOauthButton: FC<GoogleOauthButtonProps> = (props) => {
  const googleAuth = useGoogleAuth();

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => googleAuth.redirectToGoogleOauth()}
    >
      <FcGoogle />
      {props.children}
    </Button>
  );
};
