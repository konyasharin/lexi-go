import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/modules/trpc";

export const useGoogleCodeController = () => {
  const trpc = useTRPC();
  return useMutation(trpc.auth.authWithGoogle.mutationOptions());
};
