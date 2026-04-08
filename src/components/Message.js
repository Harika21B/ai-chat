import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-start" : "flex-end", // ✅ FIXED
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          maxWidth: "65%",
          padding: "0px 18px",
          borderRadius: "16px",
          background: isUser
            ? "linear-gradient(135deg, #ff7a18, #ff3d77)" // user color
            : "linear-gradient(135deg, #7c3aed, #ec4899)", // AI color

          color: "#fff",
          fontSize: "16px",
          lineHeight: "1.7",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;
