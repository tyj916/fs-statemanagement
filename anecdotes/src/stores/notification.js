import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setNotification: (notification) => set(() => ({ notification }))
  }
}))

export const useNotification = () => useNotificationStore(state => state.notification)
