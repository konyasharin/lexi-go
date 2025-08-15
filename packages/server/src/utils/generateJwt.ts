import jwt from "jsonwebtoken";

import "dotenv/config";

import { getJwtExpiresTime } from "./getJwtExpiresTime";

export const generateJwt = (data: object) => {
  const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: getJwtExpiresTime("access"),
  });
  const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: getJwtExpiresTime("refresh"),
  });

  return {
    accessToken,
    refreshToken,
  };
};
