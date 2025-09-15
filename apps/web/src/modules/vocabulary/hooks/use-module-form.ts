import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createModuleInputSchema } from "@repo/entities/module";

export const useModuleForm = () => {
  const { register, control } = useForm({
    resolver: zodResolver(createModuleInputSchema),
  });
  const vocabulariesFieldArray = useFieldArray({
    control,
    name: "vocabularies",
  });
  const userTagsFieldArray = useFieldArray({
    control,
    name: "userTags",
  });
  const newTagsFieldArray = useFieldArray({
    control,
    name: "newTags",
  });

  return {
    register,
    vocabulariesFieldArray,
    userTagsFieldArray,
    newTagsFieldArray,
  };
};
