"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export interface DocumentsInfoData {
  nidFront?: string | null;
  nidBack?: string | null;
  universityId?: string | null;
  sscCertificate?: string | null;
  hscCertificate?: string | null;
}

interface DocumentsInfoProps {
  data: DocumentsInfoData;
  setData: React.Dispatch<React.SetStateAction<DocumentsInfoData>>;
}

type DocKey = keyof DocumentsInfoData;

const DOCUMENTS: { key: DocKey; label: string }[] = [
  { key: "nidFront", label: "NID / Passport / Birth Certificate (Front)" },
  { key: "nidBack", label: "NID / Passport / Birth Certificate (Back)" },
  { key: "universityId", label: "University ID / Certificate" },
  { key: "sscCertificate", label: "SSC / O Level Marksheet / Certificate" },
  { key: "hscCertificate", label: "HSC / A Level Marksheet / Certificate" },
];

export default function DocumentsInfo({ data, setData }: DocumentsInfoProps) {
  const [uploading, setUploading] = useState<DocKey | null>(null);
  const [preview, setPreview] = useState<Partial<Record<DocKey, string>>>({});

  const handleUpload =
    (key: DocKey) => async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Show preview immediately
      const previewUrl = URL.createObjectURL(file);
      setPreview((prev) => ({ ...prev, [key]: previewUrl }));
      setUploading(key);

      // Prepare form data
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: formData }
        );
        const result = await res.json();

        if (result.success) {
          // Save uploaded image URL
          setData((prev) => ({ ...prev, [key]: result.data.url }));
        } else {
          console.error("Upload failed:", result);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        // Release memory for preview
        URL.revokeObjectURL(previewUrl);
        setUploading(null);
      }
    };

  return (
    <div className="space-y-6 text-gray-700">
      <h3 className="text-lg font-semibold text-gray-800">
        Document Information
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {DOCUMENTS.map((doc, index) => (
          <div
            key={doc.key}
            className="border rounded-xl p-4 bg-white shadow-sm space-y-3"
          >
            <p className="font-medium">
              {index + 1}. {doc.label}
            </p>

            {(preview[doc.key] || data[doc.key]) ? (
              <div className="relative h-40 w-full rounded-lg overflow-hidden border">
                <Image
                  src={preview[doc.key] || data[doc.key]!}
                  alt={doc.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-40 w-full rounded-lg border flex items-center justify-center text-gray-400">
                No image uploaded
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload(doc.key)}
              disabled={uploading === doc.key}
              className="w-full border rounded-lg px-3 py-2"
            />

            {uploading === doc.key && (
              <p className="text-sm text-blue-600">Uploading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
