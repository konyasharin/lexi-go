"use server";

import { cookies } from "next/headers";

export async function getTokens() {
  return {
    accessToken: (await cookies()).get(process.env.JWT_ACCESS_KEY!),
    refreshToken: (await cookies()).get(process.env.JWT_REFRESH_KEY!),
  };
}
