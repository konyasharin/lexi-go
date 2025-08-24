"use client";

import { FC, useContext } from "react";
import { Button, Skeleton } from "@repo/components/shadcn";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AuthContext, Avatar } from "@/modules/auth";
import { APP_PATHS } from "@/modules/routing";

import { HeaderMenu } from "./header-menu";

export const HeaderAuthGroup: FC = () => {
  const t = useTranslations();
  const authContext = useContext(AuthContext);

  if (authContext?.authProcess.inProcess)
    return <Skeleton className={"h-8 w-8"} />;

  if (authContext?.auth.user)
    return (
      <HeaderMenu>
        <Avatar />
      </HeaderMenu>
    );

  return (
    <>
      <Link href={APP_PATHS.SIGN_UP}>
        <Button variant={"outline"}>{t("AUTH.SIGN_UP")}</Button>
      </Link>
      <Link href={APP_PATHS.SIGN_IN}>
        <Button>{t("AUTH.SIGN_IN")}</Button>
      </Link>
    </>
  );
};
