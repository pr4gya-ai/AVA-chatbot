import React from "react";
import { Send } from "lucide-react";

const InputBar = ({ input, setInput, sendMessage, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="input-bar">
      <textarea
        placeholder={isLoading ? "Waiting for response..." : "Ask me anything..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={isLoading}
      />
      <button onClick={sendMessage} disabled={!input.trim() || isLoading}>
        <Send size={18} />
      </button>
    </div>
  );
};

export default InputBar;
