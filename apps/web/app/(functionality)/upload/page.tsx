"use client"

import { FormEvent, useState } from "react";

type UploadResult = {
  url: string;
  public_id: string;
  original_filename?: string;
};

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setUploading(true);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file");

    if (!file) {
      setError("Please select a file before uploading.");
      setUploading(false);
      return;
    }

    const response = await fetch("/api/cloudinary_upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data?.error || "Upload failed.");
    } else {
      setResult(data);
    }

    setUploading(false);
  }

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="file" name="file" />
        </div>
        <button type="submit" disabled={uploading} className="rounded bg-blue-500 px-4 py-2 text-white">
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 rounded border border-gray-200 p-4">
          <p className="font-semibold">Upload successful!</p>
          <p>
            <strong>Public ID:</strong> {result.public_id}
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <a href={result.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {result.url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
