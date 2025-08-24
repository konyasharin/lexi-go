"use client";

import { FC, useContext } from "react";
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
} from "@repo/components/shadcn";
import clsx from "clsx";

import { AuthContext } from "@/modules/auth";

interface AvatarProps {
  className?: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const authContext = useContext(AuthContext);

  if (authContext?.auth.user)
    return (
      <ShadcnAvatar>
        <AvatarFallback
          className={clsx(
            "h-8 w-8 bg-gray-50 text-purple-700 select-none",
            props.className,
          )}
        >
          {authContext.auth.user.email.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </ShadcnAvatar>
    );
};
