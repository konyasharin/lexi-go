import { FC } from "react";
import { TbMessageLanguage } from "react-icons/tb";
import { clsx } from "clsx";

import { Typography } from "@/ui/typography";

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = (props) => {
  return (
    <div className={clsx("flex items-center gap-1", props.className)}>
      <TbMessageLanguage size={36} />
      <Typography tag={"h1"} variant={"h2"} className={"capitalize text-2xl"}>
        lexi-go
      </Typography>
    </div>
  );
};
