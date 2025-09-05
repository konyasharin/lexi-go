"use client";
import { FC, useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "@/modules/auth";
import { useTRPC } from "@/modules/trpc";

export const Test: FC = () => {
  const trpc = useTRPC();
  const authContext = useContext(AuthContext);
  // const createModuleController = useMutation(
  //   trpc.modules.create.mutationOptions(),
  // );
  //
  // useEffect(() => {
  //   if (!authContext?.auth.user) return;
  //   createModuleController.mutate({
  //     name: "test123",
  //     description: "test",
  //     vocabularies: [{ word: "test", translation: "test" }],
  //     tags: [{ id: 9, name: "test", color: "#ffffff" }],
  //   });
  // }, []);

  const deleteModuleController = useMutation(
    trpc.modules.delete.mutationOptions(),
  );

  useEffect(() => {
    if (!authContext?.auth.user) return;
    deleteModuleController.mutate({
      id: 16,
    });
  }, []);

  return <div></div>;
};
