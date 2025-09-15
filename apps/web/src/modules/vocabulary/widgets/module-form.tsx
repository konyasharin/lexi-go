"use client";

import { FC } from "react";

import { useModuleForm } from "../hooks";
import { ModuleDescriptionInput, ModuleNameInput } from "../ui";

import { VocabularyInputsBlock } from "./vocabulary-inputs-block";

export const ModuleForm: FC = () => {
  const form = useModuleForm();

  return (
    <form className={"flex flex-col gap-5"}>
      <ModuleNameInput {...form.register("name")} />
      <ModuleDescriptionInput {...form.register("description")} />
      <VocabularyInputsBlock />
    </form>
  );
};
