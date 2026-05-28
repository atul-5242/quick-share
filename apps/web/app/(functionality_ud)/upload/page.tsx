"use client"

import type * as React from "react";
import { useState, ChangeEvent } from "react";

type UploadResult = {
  url: string;
  public_id: string;
  original_filename?: string;
};

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("/api/cloudinary_upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data?.error || "Upload failed.");
    } else {
      setResult(data);
      setSelectedFile(null);
    }

    setUploading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">📤 Upload File</h1>
          <p className="text-slate-300 text-lg">Share your files instantly and securely</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition ${
              dragActive
                ? "border-blue-400 bg-blue-500/10"
                : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
            }`}
          >
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="text-5xl mb-4">📁</div>
              <p className="text-xl font-semibold text-white mb-2">
                {selectedFile ? selectedFile.name : "Drag and drop your file here"}
              </p>
              <p className="text-slate-400 mb-4">
                or click to select a file
              </p>
              {selectedFile && (
                <p className="text-sm text-slate-300">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </label>
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition transform ${
              uploading || !selectedFile
                ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105"
            } shadow-lg`}
          >
            {uploading ? "⏳ Uploading..." : "🚀 Upload File"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-red-900/30 border border-red-600 rounded-lg">
            <p className="text-red-300 font-semibold">❌ Error: {error}</p>
          </div>
        )}

        {/* Success Message */}
        {result && (
          <div className="mt-8 p-8 bg-green-900/20 border border-green-600 rounded-lg space-y-4">
            <p className="text-green-300 font-bold text-lg">✅ Upload Successful!</p>
            <div className="space-y-3 bg-slate-900/50 p-4 rounded border border-slate-700">
              <div>
                <p className="text-slate-400 text-sm">Public ID:</p>
                <p className="text-white font-mono text-sm break-all bg-slate-800 p-2 rounded mt-1">
                  {result.public_id}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">File URL:</p>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-mono text-sm break-all"
                >
                  {result.url}
                </a>
              </div>
              {result.original_filename && (
                <div>
                  <p className="text-slate-400 text-sm">Filename:</p>
                  <p className="text-white text-sm">{result.original_filename}</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setSelectedFile(null);
              }}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
            >
              Upload Another File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
