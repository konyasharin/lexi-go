import jwt from "jsonwebtoken";

import { unauthorized } from "@/utils/errors";

import { userPublicSchema } from "@/routes";

export const getUserPublic = (headers: Headers) => {
  const authHeader = headers.get("Authorization");
  if (!authHeader) {
    return unauthorized({ message: "There is not auth header" });
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    return unauthorized({ message: 'Auth header do not have "Bearer" prefix' });
  }

  try {
    const parsedUser = userPublicSchema.safeParse(
      jwt.verify(token, process.env.JWT_ACCESS_SECRET!),
    );
    if (parsedUser.error)
      return unauthorized({ message: "Decoded with error" });
    return parsedUser.data;
  } catch {
    return unauthorized({ message: "Jwt verify error" });
  }
};
