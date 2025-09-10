"use client";

import {
  TagsInput,
  UserTagsContextProvider,
  useTagsInput,
} from "@/modules/vocabulary";

export default function Modules() {
  const controller = useTagsInput();
  return (
    <UserTagsContextProvider>
      <TagsInput {...controller} />
    </UserTagsContextProvider>
  );
}
