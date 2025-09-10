import { useMemo } from "react";

import { Tag } from "../types";

import { useUserTagsController } from "./use-user-tags-controller";

export const useUserTags = () => {
  const controller = useUserTagsController();
  const tags = useMemo<Tag[]>(() => {
    return controller.data ?? [];
  }, [controller.data]);

  return {
    tags,
    isLoading: controller.isPending,
    isError: controller.isError,
  };
};
