import { create } from 'zustand'

const useLocationStore = create((set) => ({
  isPermissionGranted: false,
  grantPermission: () => set({ isPermissionGranted: true }),
  notGrantPermission: () => set({isPermissionGranted: false})
}))

export default useLocationStore;