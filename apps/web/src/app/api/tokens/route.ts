import { NextResponse } from "next/server";

import { getTokens } from "@/modules/auth";

export async function GET() {
  try {
    const tokens = await getTokens();

    if (!tokens)
      return NextResponse.json(
        { success: false, msg: "Please log in to view profile" },
        { status: 403 },
      );

    return NextResponse.json({ success: true, tokens });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
