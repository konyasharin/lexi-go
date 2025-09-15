import { ComponentProps, FC } from "react";
import { Input } from "@repo/components/shadcn";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type ModuleNameInputProps = ComponentProps<"input">;

export const ModuleNameInput: FC<ModuleNameInputProps> = ({
  className,
  ...attributes
}) => {
  const t = useTranslations();

  return (
    <Input
      placeholder={t("MODULE_FORM.NAME")}
      className={clsx("h-12", className)}
      {...attributes}
    />
  );
};
