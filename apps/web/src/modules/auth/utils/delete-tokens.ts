"use server";

import { cookies } from "next/headers";

export async function deleteTokens() {
  (await cookies()).delete(process.env.NEXT_PUBLIC_JWT_ACCESS_KEY!);
  (await cookies()).delete(process.env.NEXT_PUBLIC_JWT_REFRESH_KEY!);
}
