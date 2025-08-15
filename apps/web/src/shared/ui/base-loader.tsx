import { ComponentProps, FC } from "react";
import { Loader } from "@repo/components/ui";
import { useTranslations } from "next-intl";

type BaseLoaderProps = ComponentProps<typeof Loader>;

export const BaseLoader: FC<BaseLoaderProps> = (props) => {
  const t = useTranslations();

  return <Loader label={t("COMMON.LOADING")} {...props} />;
};
