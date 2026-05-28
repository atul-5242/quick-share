"use client"

import type * as React from "react";
import { useState } from "react";

export default function DownloadPage() {
  const [publicId, setPublicId] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setError(null);
  setDownloadUrl("");

  if (!publicId.trim()) {
    setError("Please enter the public ID from the upload result.");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">📥 Download File</h1>
          <p className="text-slate-300 text-lg">Retrieve your shared files instantly</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Enter Public ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={publicId}
                  onChange={(event) => setPublicId(event.target.value)}
                  placeholder="Paste the public ID from upload result..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                💡 Copy the public ID from your upload confirmation
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !publicId.trim()}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition transform ${
                loading || !publicId.trim()
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105"
              } shadow-lg`}
            >
              {loading ? "⏳ Loading..." : "🔗 Get Download Link"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-6 bg-red-900/20 border border-red-600 rounded-lg mb-8">
            <p className="text-red-300 font-semibold text-lg">❌ {error}</p>
            <p className="text-red-300/70 text-sm mt-2">
              Make sure you've entered the correct public ID from your upload.
            </p>
          </div>
        )}

        {/* Success Message */}
        {downloadUrl && (
          <div className="p-8 bg-emerald-900/20 border border-emerald-600 rounded-lg space-y-4">
            <p className="text-emerald-300 font-bold text-lg">✅ Download Ready!</p>
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700 space-y-4">
              <p className="text-slate-400 text-sm font-semibold">Your file is ready to download:</p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full text-center py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg font-bold transition transform hover:scale-105"
              >
                📥 Download File
              </a>
              <div className="pt-4 border-t border-slate-600">
                <p className="text-slate-400 text-xs mb-2">Direct URL:</p>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-mono text-xs break-all"
                >
                  {downloadUrl}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setDownloadUrl("");
                setPublicId("");
              }}
              className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded font-semibold transition"
            >
              Download Another File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
