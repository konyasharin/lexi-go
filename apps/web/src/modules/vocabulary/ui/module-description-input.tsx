import { ComponentProps, FC } from "react";
import { Textarea } from "@repo/components/shadcn";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type ModuleDescriptionInputProps = ComponentProps<"textarea">;

export const ModuleDescriptionInput: FC<ModuleDescriptionInputProps> = ({
  className,
  ...attributes
}) => {
  const t = useTranslations();

  return (
    <Textarea
      placeholder={t("MODULE_FORM.DESCRIPTION")}
      className={clsx("h-20 resize-none", className)}
      {...attributes}
    />
  );
};
