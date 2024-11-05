import { create } from 'zustand'

const useAlertStore = create((set) => ({
  isAlertTriggered: false,
  triggerAlert: () => set({ isAlertTriggered: true }),
 reset: () => set({ isAlertTriggered: false }),
}))

export default useAlertStore;