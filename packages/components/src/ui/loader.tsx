import { FC } from "react";
import { ClockLoader } from "react-spinners";
import { clsx } from "clsx";
import colors from "tailwindcss/colors";

import { Typography } from "@/ui/typography";

interface LoaderProps {
  size?: number;
  color?: string;
  label?: string;
  className?: string;
}

export const Loader: FC<LoaderProps> = (props) => {
  return (
    <div className={clsx("flex flex-col items-center gap-6", props.className)}>
      {props.label && <Typography variant={"h5"}>{props.label}</Typography>}
      <ClockLoader
        loading
        color={props.color ?? colors.white}
        size={props.size ?? 36}
      />
    </div>
  );
};
