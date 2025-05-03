import { useRef } from "react";
import { useChat } from "../hooks/useChat";
import { useState } from "react";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const [listening, setListening] = useState(false);

  // Voice recognition handler
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (input.current) {
        input.current.value = transcript;
        input.current.focus();
      }
    };
    recognition.start();
  };

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };
  if (hidden) {
    return null;
  }

  return (
    <>
      {/* --- Animated Wavy Background --- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 260,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6dd5ed" />
              <stop offset="50%" stopColor="#a084ee" />
              <stop offset="100%" stopColor="#fcb0b3" />
            </linearGradient>
          </defs>
          <path>
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
                M0,120 C400,200 1040,120 1440,200 L1440,320 L0,320 Z;
                M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z
              "
            />
          </path>
          <path
            d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
            fill="url(#waveGradient)"
            opacity="0.85"
          />
        </svg>
      </div>
      {/* --- End Animated Wavy Background --- */}

      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">FAMS Health Care Bot</h1>
          {/* --- Add this beautiful tagline box --- */}
          <div
            className="mt-2 mb-2 px-4 py-2 rounded-xl shadow-lg bg-gradient-to-r from-blue-400 via-violet-400 to-pink-300 text-white font-semibold text-base"
            style={{
              letterSpacing: "0.5px",
              boxShadow: "0 4px 24px 0 rgba(80,70,180,0.10)",
              border: "1px solid #a084ee33",
              maxWidth: 340,
            }}
          >
            Health care &amp; emotional support only.<br />
            <span className="text-sm font-normal">
              Professional, private, and friendly.<br />
              <span style={{ color: "#fff", opacity: 0.85 }}>
                No medical prescriptions.<br />
                For advice, support, and information.<br />
                More features coming soon!
              </span>
            </span>
          </div>
          {/* --- End tagline box --- */}
          <p>She is here to support you !</p>
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              const body = document.querySelector("body");
              if (body.classList.contains("greenScreen")) {
                body.classList.remove("greenScreen");
              } else {
                body.classList.add("greenScreen");
              }
            }}
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          {/* Voice Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
              listening ? "animate-pulse ring-2 ring-blue-300" : ""
            }`}
            style={{ width: 48, height: 48 }}
            title="Speak"
            disabled={loading || message}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.25v2.25m0 0h3m-3 0h-3m6-2.25a6 6 0 01-12 0V12a6 6 0 0112 0v4.25z" />
              <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill={listening ? "#3b82f6" : "none"} />
            </svg>
          </button>
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-violet-200 bg-white bg-opacity-80">
          {/* Smaller avatar, left-aligned */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white font-bold text-base">
            <span>F</span>
          </div>
          <div>
            <div className="font-black text-lg">FAMS Health Care Bot</div>
            <div className="text-xs text-gray-500">Professional, private, and friendly</div>
          </div>
        </div>
        {/* Messages */}
      </div>
      {/* Glassmorphism Info Card - Right side */}
      <div
        className="fixed top-1/2 right-8 transform -translate-y-1/2 z-30"
        style={{ minWidth: 340, maxWidth: 400 }}
      >
        <div className="backdrop-blur-lg bg-white/30 border border-white/30 rounded-2xl shadow-2xl px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/50 cursor-pointer">
          <div className="text-xl font-bold text-indigo-800 mb-2">
            Why API?
          </div>
          <div className="text-base text-gray-800">
            I'm creating this BOT for healthcare and medical purpose.<br /><br />
            I'm using API for response So responses can be delay because I don't have a very strong PC, so I couldn't train any model in my PC. That's why I'm <span className="font-mono bg-indigo-100 px-1 rounded">using API</span>.<br /><br />
            <span className="text-pink-700 font-semibold">
              If I win this competition, I will make it a reality. That is my purpose in life, not in Replika, but in my project.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
