"use client"

import { FormEvent, useState } from "react";

export default function DownloadPage() {
  const [publicId, setPublicId] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setDownloadUrl("");

    if (!publicId.trim()) {
      setError("Please enter the Cloudinary public_id from upload.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/cloudinary_download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: publicId.trim() }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data?.error || "Failed to fetch download URL.");
    } else {
      setDownloadUrl(data.url);
    }

    setLoading(false);
  }

  return (
    <div>
      <h1>File Download</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cloudinary public_id
          </label>
          <input
            value={publicId}
            onChange={(event) => setPublicId(event.target.value)}
            placeholder="Enter public_id from upload result"
            className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
          />
        </div>
        <button type="submit" disabled={loading} className="rounded bg-green-600 px-4 py-2 text-white">
          {loading ? "Loading..." : "Get Download URL"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {downloadUrl && (
        <div className="mt-6 rounded border border-gray-200 p-4">
          <p className="font-semibold">Download ready</p>
          <a href={downloadUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
            Open or save file
          </a>
        </div>
      )}
    </div>
  );
}
