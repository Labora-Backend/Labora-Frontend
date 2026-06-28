import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppNotification } from '@/types/notification'

interface NotificationState {
  items: AppNotification[]
}

const initialState: NotificationState = {
  items: [],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<AppNotification[]>) => {
      state.items = action.payload
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find((item) => item.id === action.payload)
      if (notification) notification.isRead = true
    },
  },
})

export const { setNotifications, markAsRead } = notificationSlice.actions
export default notificationSlice.reducer