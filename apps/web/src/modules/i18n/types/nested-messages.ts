import { MessageKeys, Messages, NestedKeyOf } from "next-intl";

export type NestedMessages = MessageKeys<Messages, NestedKeyOf<Messages>>;
