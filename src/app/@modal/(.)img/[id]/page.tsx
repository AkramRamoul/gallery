import { Modal } from "./modal";
import FullPageImage from "~/components/full-image-page";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;

  return (
    <Modal>
      <FullPageImage id={photoId} />
    </Modal>
  );
}
