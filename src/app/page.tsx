import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";
export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative aspect-square w-full overflow-hidden bg-gray-200"
        >
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              fill
              style={{ objectFit: "cover" }}
              alt={image.name}
            />
          </Link>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 text-center text-sm text-white">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
