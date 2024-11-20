import { SignedIn, SignedOut } from "@clerk/nextjs";

import { getMyImages } from "~/server/queries";
import Gallery from "./_components/Gallery";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getMyImages();
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Gallery images={images} />
      </SignedIn>
    </main>
  );
}
