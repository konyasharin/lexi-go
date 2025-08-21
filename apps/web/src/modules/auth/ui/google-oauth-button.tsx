"use client";

import { FC, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@repo/components/shadcn";

import { AuthContext } from "@/modules/auth";

interface GoogleOauthButtonProps {
  children?: string;
}

export const GoogleOauthButton: FC<GoogleOauthButtonProps> = (props) => {
  const context = useContext(AuthContext);

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => context?.googleAuth.redirectToGoogleOauth()}
    >
      <FcGoogle />
      {props.children}
    </Button>
  );
};
