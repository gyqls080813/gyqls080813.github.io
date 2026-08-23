import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
  setLogin: (user: any, accessToken: string, refreshToken: string) => void;
  setLogout: () => void;
  setAccessToken: (token: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setLogin: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken }),

      setLogout: () =>
        set({ user: null, accessToken: null, refreshToken: null }),

      setAccessToken: (token) =>
        set({ accessToken: token }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      completeOnboarding: () =>
        set((state) => {
          if (!state.user) return state; 

          return {
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                isOnboardingComplete: true,
              },
            },
          };
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);