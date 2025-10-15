import React, { useState, useEffect } from "react"; 
import { Bot, Sun, Moon } from "lucide-react"; 
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import { fetchWithRetry } from "./utils/fetchWithRetry";
import "./App.css";

const apiKey = "AIzaSyAKazxjnRxm2Cbz9vwx7yuETalxRqJoaXo";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

export default function App() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hey there! I'm your AI chat buddy!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: "user", text: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = newMessages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const payload = {
        contents: chatHistory,
        systemInstruction: {
          parts: [{ text: "Be witty and fun, but concise." }],
        },
      };

      const response = await fetchWithRetry(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const candidate = result.candidates?.[0];
      let reply = "🤖 Oops, something went wrong...";

      if (candidate?.content?.parts?.[0]?.text) {
        reply = candidate.content.parts[0].text;
      }

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `⚠️ Oops! ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="chat-wrapper"
      style={{ display: "flex", flexDirection: "column", height: "85vh" }}
    >
      {/* Header */}
      <header className="chat-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Bot size={22} />
          <span>Ava Chatbot 🤖</span>
        </div>
        <button
          className="toggle-btn"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Chat messages */}
      <ChatWindow messages={messages} isLoading={isLoading} />

      {/* Input */}
      <InputBar
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
