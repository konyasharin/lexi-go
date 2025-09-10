import { useContext } from "react";

import { UserTagsContext } from "../context";

export const useUserTagsContext = () => {
  return useContext(UserTagsContext);
};
