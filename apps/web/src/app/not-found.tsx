import { Typography } from "@repo/components/ui";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div>
      <Typography tag={"h2"} variant={"h4"}>
        {t("NOT_FOUND.TITLE")}
      </Typography>
    </div>
  );
}
