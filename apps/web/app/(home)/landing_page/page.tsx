"use client";

export default function HomePage() {
  return (
    <div>
      File upload page <br />
        <div className="flex flex-wrap">
            <a href="/upload"  target="_blank" rel="noopener noreferrer">
                <button className="bg-amber-400 p-1 rounded-2xl">Upload</button>
            </a>
            <br />

            <a href="/download" target="_blank" rel="noopener noreferrer">
                <button className="bg-pink-300 p-1 rounded-2xl">Download</button>
            </a>
        </div>
    </div>
  );
}