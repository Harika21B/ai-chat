import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ API CALL
export const fetchAIResponse = createAsyncThunk(
  "chat/fetchAIResponse",
  async (message) => {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.reply;
  },
);

const initialState = {
  conversations: [],
  currentChatId: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // ✅ CREATE NEW CHAT
    newChat: (state) => {
      const newChat = {
        id: Date.now(),
        messages: [],
      };

      state.conversations.push(newChat);
      state.currentChatId = newChat.id;
    },

    // ✅ SWITCH CHAT
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
    },

    // ✅ ADD USER MESSAGE
    addUserMessage: (state, action) => {
      const chat = state.conversations.find(
        (c) => c.id === state.currentChatId,
      );

      if (chat) {
        chat.messages.push({
          id: Date.now(),
          sender: "user",
          text: action.payload,
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        const chat = state.conversations.find(
          (c) => c.id === state.currentChatId,
        );

        if (chat) {
          chat.messages.push({
            id: Date.now(),
            sender: "bot",
            text: action.payload,
          });
        }

        state.loading = false;
      })
      .addCase(fetchAIResponse.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export const { newChat, setCurrentChat, addUserMessage } = chatSlice.actions;

export default chatSlice.reducer;
