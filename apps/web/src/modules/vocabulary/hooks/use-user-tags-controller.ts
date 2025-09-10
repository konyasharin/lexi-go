import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/modules/trpc";

export const useUserTagsController = () => {
  const trpc = useTRPC();
  return useQuery(trpc.tags.getUserTags.queryOptions());
};
