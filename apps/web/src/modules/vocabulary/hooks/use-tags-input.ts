import { useMemo, useState } from "react";
import { CreateTagsWithAttachSchemaInfer } from "@repo/server/types";

import { autoId } from "@/shared/utils";

export const useTagsInput = () => {
  const [newTags, setNewTags] = useState<
    CreateTagsWithAttachSchemaInfer["newTags"]
  >([]);
  const [userTags, setUserTags] = useState<
    CreateTagsWithAttachSchemaInfer["userTags"]
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
