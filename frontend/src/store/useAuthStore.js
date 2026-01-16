import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningIn: false,
  isLoggingIn: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in auth Check:", error);
      set({ authUser: null });

      if (error.response?.status !== 401) {
        toast.error("Connection error. Please try again later.");
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error in signup:", error);
      toast.error(error.response?.data?.message || "Failed to create account");
      set({ authUser: null });
    } finally {
      set({ isSigningIn: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login failed:", {
        status: error.response?.status,
        message: error.response?.data?.message,
      });

      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";

      toast.error(errorMessage);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
