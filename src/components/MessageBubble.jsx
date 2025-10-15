import React from "react";
import { Bot, User } from "lucide-react";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className={`message ${isUser ? "user" : "bot"}`}>
      {!isUser && (
        <div className="message-icon">
          <Bot size={16} color="#2563eb" />
        </div>
      )}
      <div className="message-bubble">
        <p>{message.text}</p>
      </div>
      {isUser && (
        <div className="message-icon">
          <User size={16} color="#fff" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
