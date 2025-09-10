import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/modules/trpc";

export const useRefreshController = () => {
  const trpc = useTRPC();
  return useMutation(trpc.auth.refresh.mutationOptions());
};
