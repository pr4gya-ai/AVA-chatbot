import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Bot, Loader2 } from "lucide-react";

const ChatWindow = ({ messages, isLoading }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
      {isLoading && (
        <div className="message bot">
          <div className="message-icon">
            <Bot size={16} color="#2563eb" />
          </div>
          <div className="loading">
            <Loader2 className="animate-spin" size={16} />
            <span style={{ marginLeft: "8px" }}>Thinking...</span>
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
