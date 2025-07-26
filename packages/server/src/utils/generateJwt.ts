import jwt from 'jsonwebtoken';

import 'dotenv/config';

export const generateJwt = (data: object) => {
  const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '1d',
  });

  return {
    accessToken,
    refreshToken,
  };
};
