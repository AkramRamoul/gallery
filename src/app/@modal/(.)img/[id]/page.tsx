import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;

  const idAsnumber = Number(photoId);
  if (isNaN(idAsnumber)) {
    throw new Error("Invalid image id");
  }
  const image = await getImage(idAsnumber);
  return (
    <div>
      <img src={image.url} className="w-96" />
    </div>
  );
}
