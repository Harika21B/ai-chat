import { useState } from "react";

function InputBox({ onSend }) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false); // 🔥 focus state

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ padding: "10px 20px 20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 18px",
          borderRadius: "40px",
          background: "#fff",

          // 🔥 dynamic focus style
          boxShadow: isFocused
            ? "0 0 0 3px rgba(124,58,237,0.3), 0 12px 30px rgba(124,58,237,0.25)"
            : "0 10px 25px rgba(0,0,0,0.08)",

          border: isFocused ? "1px solid #7c3aed" : "1px solid transparent",

          transition: "all 0.3s ease",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI..."
          onFocus={() => setIsFocused(true)} // 🔥 focus start
          onBlur={() => setIsFocused(false)} // 🔥 focus end
          style={{
            flex: 1,
            padding: "16px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            fontSize: "17px",
            fontFamily: "Inter, sans-serif",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default InputBox;
