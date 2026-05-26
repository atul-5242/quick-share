"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            📁 FileShare
          </div>
        </nav>
      </header>

      {/* Quick Access Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to FileShare</h1>
          <p className="text-xl text-slate-300 mb-12">
            Choose an action to get started
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Upload Card */}
          <Link href="/upload">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl p-10 transition transform group-hover:scale-105 shadow-lg">
                <div className="text-6xl mb-4">📤</div>
                <h2 className="text-3xl font-bold text-white mb-2">Upload</h2>
                <p className="text-blue-100 mb-6">
                  Share your files instantly
                </p>
                <div className="inline-block px-6 py-2 bg-white text-blue-600 font-bold rounded-lg group-hover:bg-blue-50 transition">
                  Start Uploading →
                </div>
              </div>
            </div>
          </Link>

          {/* Download Card */}
          <Link href="/download">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-xl p-10 transition transform group-hover:scale-105 shadow-lg">
                <div className="text-6xl mb-4">📥</div>
                <h2 className="text-3xl font-bold text-white mb-2">Download</h2>
                <p className="text-green-100 mb-6">
                  Retrieve your shared files
                </p>
                <div className="inline-block px-6 py-2 bg-white text-green-600 font-bold rounded-lg group-hover:bg-green-50 transition">
                  Start Downloading →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-md mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>© 2026 FileShare. Fast, secure, and simple file sharing.</p>
        </div>
      </footer>
    </div>
  );
}