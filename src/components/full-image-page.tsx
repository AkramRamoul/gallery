import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";
import Image from "next/image";
export default async function FullPageImage(props: { id: number }) {
  const image = await getImage(props.id);

  const clerk = await clerkClient();

  const uploaderInfo = await clerk.users.getUser(image.userId);

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center overflow-hidden text-white">
      <div className="relative ml-2 flex-shrink flex-grow">
        <Image src={image.url} width={750} height={680} alt={image.name} />
      </div>
      <div className="w-68 flex h-full flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          <div>{uploaderInfo.fullName}</div>
        </div>

        <div className="p-2">
          <div>Created On:</div>
          <div>{image.createdAt.toLocaleDateString()}</div>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";

              // await deleteImage(idAsNumber);
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}
