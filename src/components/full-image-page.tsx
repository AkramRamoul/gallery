import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import Image from "next/image";
import { Button } from "./ui/button";
export default async function FullPageImage(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);

  const clerk = await clerkClient();

  const uploaderInfo = await clerk.users.getUser(image.userId);

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center overflow-hidden text-white">
      <div className="itam-center relative flex flex-shrink flex-grow justify-center">
        <Image src={image.url} width={750} height={680} alt={image.name} />
      </div>
      <div className="w-68 flex h-full flex-shrink-0 flex-col items-center border-l">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="flex gap-1 p-2">
          <div>Uploaded By:</div>
          <div>{uploaderInfo.fullName}</div>
        </div>

        <div className="flex gap-1 p-2">
          <div>Created On:</div>
          <div>{image.createdAt.toLocaleDateString()}</div>
        </div>

        <div className="mt-6 flex justify-center p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(idAsNumber);
            }}
          >
            <Button type="submit" variant={"destructive"}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
