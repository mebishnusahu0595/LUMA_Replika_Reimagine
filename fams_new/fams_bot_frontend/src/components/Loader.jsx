import React from "react";

const Loader = () => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-200 via-violet-200 to-pink-200"
    style={{ minHeight: "100vh", minWidth: "100vw" }}
  >
    <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-8 flex flex-col items-center max-w-lg border border-white/30">
      {/* Animated spinner */}
      <div className="mb-6">
        <div className="w-20 h-20 border-8 border-indigo-400 border-t-pink-500 border-b-blue-400 rounded-full animate-spin shadow-lg"></div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-tr from-pink-400 to-indigo-400 rounded-full blur-2xl opacity-60"></div>
      </div>
      {/* Main loading text */}
      <div className="text-2xl font-extrabold text-indigo-700 mb-2 text-center drop-shadow">
        We are creating this BOT for healthcare and medical purpose
      </div>
      <div className="text-base text-gray-700 mb-4 text-center">
        We are using API for response because I don't have a very strong PC, so I couldn't train any model in my PC. That's why I'm <span className="font-mono bg-indigo-100 px-1 rounded">using API</span>.
      </div>
      <div className="text-lg text-pink-600 font-semibold text-center">
        Please wait while we load your experience...
      </div>
    </div>
    {/* Subtle floating animation */}
    <style>{`
      .animate-spin {
        animation: spin 1.2s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
);

export default Loader;