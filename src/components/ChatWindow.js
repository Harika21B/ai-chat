import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { addUserMessage, fetchAIResponse, newChat } from "../store/chatSlice";

import Header from "./Header";
import Message from "./Message";
import InputBox from "./InputBox";

function ChatWindow() {
  const dispatch = useDispatch();

  const { conversations, currentChatId, loading } = useSelector(
    (state) => state.chat,
  );

  // 🔥 AUTO CREATE CHAT (MAIN FIX)
  useEffect(() => {
    if (!currentChatId) {
      dispatch(newChat());
    }
  }, [currentChatId, dispatch]);

  // ✅ GET CURRENT CHAT
  const currentChat = conversations.find((c) => c.id === currentChatId);

  const messages = currentChat?.messages || [];

  const sendMessage = (text) => {
    dispatch(addUserMessage(text));
    dispatch(fetchAIResponse(text));
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Header />

      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg) => (
          <Message key={msg.id} role={msg.sender} text={msg.text} />
        ))}

        {loading && <p>AI is typing...</p>}
      </div>

      <InputBox onSend={sendMessage} />
    </div>
  );
}

export default ChatWindow;
