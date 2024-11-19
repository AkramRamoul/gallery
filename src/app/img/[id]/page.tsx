import FullPageImage from "~/components/full-image-page";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;

  return <FullPageImage id={photoId} />;
}
