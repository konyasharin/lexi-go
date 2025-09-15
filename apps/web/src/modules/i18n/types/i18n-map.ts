import { NestedMessages } from "./nested-messages";

export type I18nMap<T extends string = string> = Record<T, NestedMessages>;
