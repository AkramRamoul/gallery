import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import analyticsServerClient from "~/server/analytics";

export async function POST(req: Request) {
  const user = await auth();
  if (!user.userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { ids }: { ids: number[] } = await req.json();

  if (!ids || ids.length === 0) {
    return NextResponse.json(
      { error: "No image IDs provided" },
      { status: 400 },
    );
  }

  await db
    .delete(images)
    .where(and(inArray(images.id, ids), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete images",
    properties: { imageIds: ids },
  });

  return NextResponse.json({ success: true });
}
