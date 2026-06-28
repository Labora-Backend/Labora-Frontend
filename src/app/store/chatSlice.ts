import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ChatMessage {
  id: string
  roomId: string
  senderId: string
  content: string
  sentAt: string
}

interface ChatState {
  activeRoomId: string | null
  messages: ChatMessage[]
}

const initialState: ChatState = {
  activeRoomId: null,
  messages: [],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveRoom: (state, action: PayloadAction<string>) => {
      state.activeRoomId = action.payload
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
})

export const { setActiveRoom, addMessage, clearMessages } = chatSlice.actions
export default chatSlice.reducer