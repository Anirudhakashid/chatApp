import { create } from "zustand";

export const useAuthStore = create((get, set) => ({
  authUser: { name: "Anirudha", _id: 123, age: 20 },
  isLoading: false,

  login: () => {
    console.log("we just logged in ");
    set({ isLoading: true });
  },
}));
