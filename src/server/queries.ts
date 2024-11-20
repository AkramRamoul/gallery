import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import analyticsServerClient from "./analytics";
import { revalidatePath } from "next/cache";
export type State = {
  status: "error" | "success" | undefined;
  error?: string;
  message?: string | null;
};
export async function getMyImages() {
  const user = await auth();
  if (!user.userId) {
    throw new Error("Unauthorized");
  }
  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return images;
}

export async function getImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");
  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });
  revalidatePath("/");
  redirect("/");
}
