import { useMutation } from "@tanstack/react-query";

import { AuthApi } from "../api";

export const useDeleteTokensController = () => {
  return useMutation({
    mutationFn: AuthApi.deleteTokens.bind(AuthApi),
  });
};
