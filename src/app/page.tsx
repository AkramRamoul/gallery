import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Gallery from "./_components/Gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch images only for logged-in users
  const images = await getMyImages();

  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above to view your gallery.
        </div>
      </SignedOut>
      <SignedIn>
        {images.length > 0 ? (
          <Gallery images={images} />
        ) : (
          <div className="text-center text-xl">No images to display.</div>
        )}
      </SignedIn>
    </main>
  );
}
