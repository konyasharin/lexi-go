import { useMemo, useState } from "react";
import { CreateTagsWithAttachDataSchemaInfer } from "@repo/entities/tag";

import { autoId } from "@/shared/utils";

export const useTagsInput = () => {
  const [newTags, setNewTags] = useState<
    CreateTagsWithAttachDataSchemaInfer["newTags"]
  >([]);
  const [userTags, setUserTags] = useState<
    CreateTagsWithAttachDataSchemaInfer["userTags"]
  >([]);

  const visualTags = useMemo(() => {
    return autoId([newTags, userTags]);
  }, [newTags, userTags]);

  // const remove = (id: number) => {
  //   const visualTags.find(item => item.id === id);
  //
  // }

  return {
    visualTags,
    newTags,
    setNewTags,
    userTags,
    setUserTags,
  };
};
