import { FC } from "react";

import { useTagsInput, useUserTagsContext } from "../hooks";

interface TagsInputProps extends ReturnType<typeof useTagsInput> {
  className?: string;
}

export const TagsInput: FC<TagsInputProps> = (props) => {
  const context = useUserTagsContext();
  console.log(context?.tags);

  return <div className={props.className}>1243</div>;
};
