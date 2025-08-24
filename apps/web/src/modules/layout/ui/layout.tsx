import { FC, ReactNode } from "react";
import { Container, Logo } from "@repo/components/ui";
import { Header, HeaderGroup } from "@repo/components/widgets/header";
import Link from "next/link";

import { APP_PATHS } from "@/modules/routing";

import { DynamicLayout } from "./dynamic-layout";
import { HeaderAuthGroup } from "./header-auth-group";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = async (props) => {
  return (
    <>
      <Header>
        <HeaderGroup>
          <Link href={APP_PATHS.MAIN}>
            <Logo />
          </Link>
        </HeaderGroup>
        <HeaderGroup>
          <HeaderAuthGroup />
        </HeaderGroup>
      </Header>
      <Container className={"pt-32"}>{props.children}</Container>
      <DynamicLayout />
    </>
  );
};
