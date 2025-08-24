import { FC, ReactNode } from "react";
import { PopoverContentProps, PopoverProps } from "@radix-ui/react-popover";

import { MenuItem, MenuItemContent } from "./menu-item";

import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn";

interface MenuProps extends PopoverProps {
  items: MenuItemContent[];
  children?: ReactNode;
  contentProps?: PopoverContentProps;
}

export const Menu: FC<MenuProps> = ({ items, children, ...attributes }) => {
  return (
    <Popover {...attributes}>
      <PopoverTrigger className={"cursor-pointer"}>{children}</PopoverTrigger>
      <PopoverContent
        className={"px-3 py-4 border-accent"}
        align={"start"}
        sideOffset={15}
      >
        {items.map((item) => (
          <MenuItem item={item} key={item.text} />
        ))}
      </PopoverContent>
    </Popover>
  );
};
