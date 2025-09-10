"use client";

import { FC, ReactNode, useMemo } from "react";
import { CiSettings } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { Menu, MenuItemContent } from "@repo/components/widgets/menu";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useAuthContext } from "@/modules/auth";
import { APP_PATHS } from "@/modules/routing";

interface HeaderMenuProps {
  children?: ReactNode;
}

export const HeaderMenu: FC<HeaderMenuProps> = (props) => {
  const authContext = useAuthContext();
  const router = useRouter();
  const t = useTranslations();

  const items = useMemo<MenuItemContent[]>(
    () => [
      {
        text: t("HEADER_MENU.SETTINGS"),
        icon: <CiSettings size={24} />,
        onClick: () => router.push(APP_PATHS.SETTINGS),
      },
      {
        text: t("HEADER_MENU.EXIT"),
        icon: <IoExitOutline size={24} />,
        onClick: () => {
          authContext?.auth.logout();
        },
        className: "hover:text-red-500 transition",
      },
    ],
    [],
  );

  return <Menu items={items}>{props.children}</Menu>;
};
