import { ChildrenOf } from "@/types";

import { FC } from "react";

import { HeaderGroup } from "./header-group";

import { Container } from "@/ui";

interface HeaderProps {
  children?: ChildrenOf<typeof HeaderGroup>;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div
      className={
        "border-b border-b-ring fixed top-0 left-0 w-full h-16 flex items-center"
      }
    >
      <Container
        className={
          "flex justify-between items-center 2xl:w-[1480px] xl:w-[1160px] lg:w-[950px] md:w-[680px]"
        }
      >
        {props.children}
      </Container>
    </div>
  );
};
