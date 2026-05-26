"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            📁 FileShare
          </div>
          <div className="hidden sm:flex gap-6">
            <Link href="/upload" className="text-slate-300 hover:text-white transition">
              Upload
            </Link>
            <Link href="/download" className="text-slate-300 hover:text-white transition">
              Download
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="text-6xl sm:text-7xl mb-6 animate-bounce">📤</div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Fast & Secure
              <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                File Sharing
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto mb-8">
              Upload files instantly and share them securely. No registration needed, completely free.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-8 border border-slate-600/50 hover:border-blue-500/50 transition group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-300">Upload and download files at blazing speeds with our optimized infrastructure.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-8 border border-slate-600/50 hover:border-purple-500/50 transition group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
            <p className="text-slate-300">Your files are protected with encryption and secure cloud storage.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-8 border border-slate-600/50 hover:border-green-500/50 transition group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">Easy to Use</h3>
            <p className="text-slate-300">Simple drag-and-drop interface. No complex settings or technical knowledge required.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/upload"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            🚀 Upload File
          </Link>
          <Link
            href="/download"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            📥 Download File
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
