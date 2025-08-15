import cookie, { SerializeOptions } from "cookie";

export class Cookie {
  public static set(
    resHeaders: Headers,
    name: string,
    value: string,
    options?: SerializeOptions,
  ) {
    resHeaders.append(
      "Set-Cookie",
      cookie.serialize(name, value, { path: "/", ...options }),
    );
  }
}
