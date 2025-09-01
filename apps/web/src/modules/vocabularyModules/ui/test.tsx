"use client";
import { FC, useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "@/modules/auth";
import { useTRPC } from "@/modules/trpc";

export const Test: FC = () => {
  const trpc = useTRPC();
  const authContext = useContext(AuthContext);
  const createModuleController = useMutation(
    trpc.modules.createModule.mutationOptions(),
  );

  useEffect(() => {
    if (!authContext?.auth.user) return;
    createModuleController.mutate({
      userId: authContext.auth.user.id,
      name: "test",
      description: "test",
      vocabularies: [{ word: "test", translation: "test" }],
      tags: [],
    });
  }, []);

  return <div></div>;
};
