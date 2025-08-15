"use server";

import { cookies } from "next/headers";

export async function getTokens() {
  return {
    accessToken: (await cookies()).get(process.env.NEXT_PUBLIC_JWT_ACCESS_KEY!),
    refreshToken: (await cookies()).get(
      process.env.NEXT_PUBLIC_JWT_REFRESH_KEY!,
    ),
  };
}
