import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/rateLimit";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const user = await auth();
      // const clerk = await clerkClient();
      // const uploaderInfo = await clerk.users.getUser(user.userId!);

      // if (uploaderInfo?.privateMetadata?.["can-upload"] !== true) {
      //   throw new Error("No upload permissions");
      // }

      if (!user.userId) {
        throw new Error("Unauthorized");
      }
      const { success } = await ratelimit.limit(user.userId);
      if (!success) {
        throw new Error("Rate limit exceeded");
      }
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
