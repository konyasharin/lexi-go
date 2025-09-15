import { ComponentProps, FC } from "react";
import { Input } from "@repo/components/shadcn";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { I18nMap } from "@/modules/i18n";

import { VocabularyType } from "../types";

interface VocabularyInputProps extends ComponentProps<"input"> {
  vocabularyType: VocabularyType;
}

const PLACEHOLDERS = {
  word: "MODULE_FORM.WORD",
  translation: "MODULE_FORM.TRANSLATION",
} satisfies I18nMap<VocabularyType>;

export const VocabularyInput: FC<VocabularyInputProps> = ({
  className,
  vocabularyType,
  ...attributes
}) => {
  const t = useTranslations();

  return (
    <Input
      className={clsx("h-8", className)}
      placeholder={t(PLACEHOLDERS[vocabularyType])}
      {...attributes}
    />
  );
};
