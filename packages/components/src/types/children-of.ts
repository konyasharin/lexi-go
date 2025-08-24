import { ComponentType, ReactElement } from "react";

export type ChildrenOf<T extends ComponentType> =
  | ReactElement<T>
  | ReactElement<T>[];
