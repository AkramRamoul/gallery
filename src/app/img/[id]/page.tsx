import FullPageImage from "~/components/full-image-page";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;

  const idAsnumber = Number(photoId);
  if (isNaN(idAsnumber)) {
    throw new Error("Invalid image id");
  }
  return <FullPageImage id={idAsnumber} />;
}
