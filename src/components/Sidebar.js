import { useDispatch, useSelector } from "react-redux";
import { newChat, setCurrentChat } from "../store/chatSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const { conversations, currentChatId } = useSelector((state) => state.chat);

  return (
    <div
      style={{
        width: "260px",
        background: "#f9fafb",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        // ✅ SAME AS CHAT WINDOW
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        lineHeight: "1.7",
      }}
    >
      <div>
        {/* 🔥 New Chat Button */}
        <div
          onClick={() => dispatch(newChat())}
          style={{
            margin: "16px",
            padding: "14px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            color: "#fff",
            textAlign: "center",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          + New Chat
        </div>

        {/* 💬 Chat List */}
        <div style={{ padding: "10px" }}>
          {conversations.map((chat) => {
            const firstMessage = chat.messages.find(
              (msg) => msg.sender === "user",
            );

            return (
              <div
                key={chat.id}
                onClick={() => dispatch(setCurrentChat(chat.id))}
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  marginBottom: "8px",
                  cursor: "pointer",

                  // ✅ SAME FONT SETTINGS
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#111",

                  background:
                    currentChatId === chat.id ? "#ede9fe" : "transparent",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    currentChatId === chat.id ? "#ede9fe" : "transparent")
                }
              >
                💬{" "}
                {firstMessage
                  ? firstMessage.text.slice(0, 30) + "..."
                  : "New Chat"}
              </div>
            );
          })}
        </div>
      </div>

      {/* 👤 Profile */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            U
          </div>

          <span
            style={{
              marginLeft: "10px",
              fontSize: "16px",
              fontWeight: "400",
              color: "#111",
            }}
          >
            User Profile
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
