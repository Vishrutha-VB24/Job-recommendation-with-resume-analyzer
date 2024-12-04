import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  userInfo: object | null;
  setUserInfo: (userData: object) => void;
  clearUserInfo: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userInfo: null,

      setUserInfo: (userData) => set({ userInfo: userData }),

      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: 'resume2job-auth-store',
    }
  )
);

export default useAuthStore;
export type AuthStoreType = ReturnType<typeof useAuthStore>;


