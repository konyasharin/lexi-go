import { FC } from "react";
import { Card, CardContent, CardHeader } from "@repo/components/shadcn";

import { VocabularyInput } from "@/modules/vocabulary/ui";

export const VocabularyInputsBlock: FC = () => {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <VocabularyInput vocabularyType={"word"} />
        <VocabularyInput vocabularyType={"translation"} />
      </CardContent>
    </Card>
  );
};
