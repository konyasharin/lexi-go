import { FC, ReactNode } from "react";
import { clsx } from "clsx";

export interface MenuItemContent {
  text: string;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}

interface MenuItemProps {
  item: MenuItemContent;
  className?: string;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex gap-3 items-center cursor-pointer px-3 py-2.5 select-none hover:bg-accent",
        props.className,
        props.item.className,
      )}
      onClick={props.item.onClick}
    >
      {props.item.icon}
      {props.item.text}
    </div>
  );
};
