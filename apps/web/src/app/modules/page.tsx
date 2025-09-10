"use client";

import { TagsInput, UserTagsContextProvider } from "@/modules/vocabulary";
import { useTagsInput } from "@/modules/vocabulary/client";

export default function Modules() {
  const controller = useTagsInput();
  return (
    <UserTagsContextProvider>
      <TagsInput {...controller} />
    </UserTagsContextProvider>
  );
}
