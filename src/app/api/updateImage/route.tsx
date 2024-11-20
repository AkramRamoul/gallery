import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { images } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const ImageSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID"),
  name: z.string().min(1, "Name cannot be empty"),
});

export async function POST(req: Request) {
  const user = await auth();

  if (!user.userId) {
    return new Response(
      JSON.stringify({ status: "error", message: "Unauthorized" }),
      { status: 401 },
    );
  }

  const formData = await req.formData();
  const id = formData.get("id");
  const name = formData.get("name");

  const validation = ImageSchema.safeParse({ id, name });

  if (!validation.success) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: validation.error.errors[0]?.message,
      }),
      { status: 400 },
    );
  }

  try {
    await db
      .update(images)
      .set({ name: validation.data.name })
      .where(eq(images.id, parseInt(validation.data.id, 10)));

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Profile updated successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Database error" }),
      { status: 500 },
    );
  }
}
