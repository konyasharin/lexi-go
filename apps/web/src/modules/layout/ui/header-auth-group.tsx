"use client";

import { FC, useContext } from "react";
import { Button } from "@repo/components/shadcn";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AuthContext } from "@/modules/auth";

import { APP_PATHS } from "@/shared/constants";

export const HeaderAuthGroup: FC = () => {
  const t = useTranslations();
  const authContext = useContext(AuthContext);

  if (authContext?.user) return <>Profile here</>;

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
