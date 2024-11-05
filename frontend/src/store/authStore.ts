import { create } from 'zustand';

const useauthStore = create((set) => ({
  userInfo: null,  // Initialize userInfo to null
  
  // Method to set the userInfo
  setUserInfo: (userData: object) => set({ userInfo: userData }),

  // Method to clear the userInfo (set it to null)
  clearUserInfo: () => set({ userInfo: null }),
}));

export default useauthStore;
