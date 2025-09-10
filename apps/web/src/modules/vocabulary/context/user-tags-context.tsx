import { createContext, FC, ReactNode } from "react";

import { useUserTags } from "../hooks";

interface UserTagsContextProviderProps {
  children?: ReactNode;
}

type UserTagsContext = ReturnType<typeof useUserTags>;

export const UserTagsContext = createContext<UserTagsContext | null>(null);

export const UserTagsContextProvider: FC<UserTagsContextProviderProps> = (
  props,
) => {
  const context = useUserTags();

  return (
    <UserTagsContext.Provider value={context}>
      {props.children}
    </UserTagsContext.Provider>
  );
};
