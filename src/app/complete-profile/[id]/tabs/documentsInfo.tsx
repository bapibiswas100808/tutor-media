"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Download,
  Eye,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";

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
  {
    key: "nidFront",
    label: "NID / Passport / Birth Certificate (Front)",
  },
  {
    key: "nidBack",
    label: "NID / Passport / Birth Certificate (Back)",
  },
  {
    key: "universityId",
    label: "University ID / Certificate",
  },
  {
    key: "sscCertificate",
    label: "SSC / O Level Marksheet / Certificate",
  },
  {
    key: "hscCertificate",
    label: "HSC / A Level Marksheet / Certificate",
  },
];

export default function DocumentsInfo({
  data,
  setData,
}: DocumentsInfoProps) {
  const [uploading, setUploading] = useState<DocKey | null>(null);

  // local preview state
  const [preview, setPreview] = useState<
    Partial<Record<DocKey, string>>
  >({});

  // modal preview
  const [selectedImage, setSelectedImage] = useState<string | null>(
    null
  );

  // cleanup preview urls
  useEffect(() => {
    return () => {
      Object.values(preview).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [preview]);

  const handleUpload =
    (key: DocKey) =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);

      // instant preview
      setPreview((prev) => ({
        ...prev,
        [key]: previewUrl,
      }));

      setUploading(key);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();

        if (result.success) {
          setData((prev) => ({
            ...prev,
            [key]: result.data.url,
          }));
        } else {
          console.error("Upload failed:", result);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setUploading(null);
      }
    };

  const handleDownload = async (
    imageUrl: string,
    fileName: string
  ) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${fileName}.jpg`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800">
          Document Information
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Upload clear images of your documents for verification.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {DOCUMENTS.map((doc, index) => {
          const imageUrl = preview[doc.key] || data[doc.key];

          return (
            <div
              key={doc.key}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Title */}
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-gray-800 leading-snug">
                  {index + 1}. {doc.label}
                </h4>

                {uploading === doc.key && (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                )}
              </div>

              {/* Preview */}
              {imageUrl ? (
                <div className="relative group h-52 w-full overflow-hidden rounded-xl border bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={doc.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    {/* Preview */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImage(imageUrl)
                      }
                      className="bg-white text-gray-800 p-3 rounded-full hover:scale-105 transition"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Download */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDownload(
                          imageUrl,
                          doc.label
                        )
                      }
                      className="bg-white text-gray-800 p-3 rounded-full hover:scale-105 transition"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="h-52 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition">
                  <UploadCloud className="w-10 h-10 mb-2" />
                  <p className="text-sm font-medium">
                    Upload Document
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload(doc.key)}
                    disabled={uploading === doc.key}
                    className="hidden"
                  />
                </label>
              )}

              {/* Upload Change Button */}
              {imageUrl && (
                <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition">
                  <UploadCloud size={16} />

                  {uploading === doc.key
                    ? "Uploading..."
                    : "Change File"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload(doc.key)}
                    disabled={uploading === doc.key}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>

      {/* Fullscreen Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full h-[85vh]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-400"
            >
              <X size={28} />
            </button>

            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}