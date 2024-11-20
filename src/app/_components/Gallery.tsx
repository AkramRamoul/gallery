"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditNameDialogue from "./EditNameDialogue";
import axios from "axios";

export default function Gallery({
  images,
}: {
  images: { id: number; url: string; name: string }[];
}) {
  const [editImage, setEditImage] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const router = useRouter();

  const toggleSelection = (id: number) => {
    setSelectedImages((prev) => {
      const updated = new Set(prev);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      if (updated.size === 1) {
        const selectedId = Array.from(updated)[0];
        const selectedImage = images.find((img) => img.id === selectedId);
        if (selectedImage) {
          setEditImage({ id: selectedImage.id, name: selectedImage.name });
        }
      } else {
        setEditImage(null);
      }

      return updated;
    });
  };

  const handleDelete = async () => {
    const idsToDelete = Array.from(selectedImages);
    if (idsToDelete.length === 0) return;

    axios
      .post("/api/deleteImages", { ids: idsToDelete })
      .then(() => {
        toast.success("Image deleted successfully");
        setSelectedImages(new Set());
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error);
      });
  };
  return (
    <div className="p-4">
      {/* Action Buttons */}
      {selectedImages.size > 0 && (
        <div className="mb-4 flex justify-center gap-4">
          {selectedImages.size === 1 && editImage && (
            <EditNameDialogue name={editImage.name} id={editImage.id} />
          )}
          <Button onClick={handleDelete} variant="destructive">
            Delete {selectedImages.size} Image{selectedImages.size > 1 && "s"}
          </Button>
        </div>
      )}

      {/* Gallery */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square w-full overflow-hidden bg-gray-200"
          >
            {/* Link to Image */}
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                fill
                style={{ objectFit: "cover" }}
                alt={image.name}
                className="transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Checkbox */}
            <Checkbox
              className="absolute right-2 top-2 h-6 w-6 rounded border border-gray-300 bg-white opacity-0 transition-opacity group-hover:opacity-100"
              checked={selectedImages.has(image.id)}
              onCheckedChange={() => toggleSelection(image.id)}
              aria-label={`Select image ${image.name}`}
            >
              <button
                className="mt-1 rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent checkbox toggle when button is clicked
                  setEditImage({ id: image.id, name: image.name });
                }}
              ></button>
            </Checkbox>

            {/* Edit Button */}

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 text-center text-sm text-white">
              {image.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
