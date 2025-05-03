import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getOrCreateSessionId() {
  let sessionId = localStorage.getItem("fams_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 16);
    localStorage.setItem("fams_session_id", sessionId);
  }
  return sessionId;
}

const sessionId = getOrCreateSessionId();

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setLoading(true);
    try {
      const data = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, sessionId }),
      });
      const respData = await data.json();

      if (respData.error) {
        alert(respData.error); // Show error to user
        setLoading(false);
        return;
      }
      if (!respData.messages || !Array.isArray(respData.messages)) {
        alert("Unexpected response from server.");
        setLoading(false);
        return;
      }
      setMessages((messages) => [...messages, ...respData.messages]);
    } catch (err) {
      alert("Network or server error: " + err.message);
    }
    setLoading(false);
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    // Defensive: Only set message if messages[0] exists and has required fields
    if (messages.length > 0 && messages[0].audio && messages[0].lipsync) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
