import { FC, ReactNode } from "react";
import { Container, Logo } from "@repo/components/ui";
import { Header } from "@repo/components/widgets";
import Link from "next/link";

import { DynamicLayout } from "./dynamic-layout";
import { HeaderAuthGroup } from "./header-auth-group";

import { APP_PATHS } from "@/shared/constants";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = async (props) => {
  return (
    <>
      <Header>
        <Header.Group>
          <Link href={APP_PATHS.MAIN}>
            <Logo />
          </Link>
        </Header.Group>
        <Header.Group>
          <HeaderAuthGroup />
        </Header.Group>
      </Header>
      <Container className={"pt-32"}>{props.children}</Container>
      <DynamicLayout />
    </>
  );
};
