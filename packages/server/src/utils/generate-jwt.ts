import jwt from "jsonwebtoken";

import "dotenv/config";

import { getJwtExpiresTime } from "./get-jwt-expires-time";

export const generateJwt = (data: object) => {
  const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: `${getJwtExpiresTime("access")}ms`,
  });
  const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: `${getJwtExpiresTime("refresh")}ms`,
  });

  return {
    accessToken,
    refreshToken,
  };
};
