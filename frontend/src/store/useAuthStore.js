import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningIn: false,
  isLoggingIn: false,
  hasCheckedAuth: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    const { isCheckingAuth, hasCheckedAuth } = get();
    if (isCheckingAuth || hasCheckedAuth) return;

    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data, hasCheckedAuth: true });
      get().connectSocket();
    } catch (error) {
      console.error("Error in auth Check:", error);
      get().disconnectSocket();
      set({ authUser: null, hasCheckedAuth: true });

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
      set({ authUser: res.data.data, hasCheckedAuth: true });
      get().connectSocket();

      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error in signup:", error);
      get().disconnectSocket();
      toast.error(error.response?.data?.message || "Failed to create account");
      set({ authUser: null, hasCheckedAuth: true });
    } finally {
      set({ isSigningIn: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.data, hasCheckedAuth: true });
      get().connectSocket();

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login failed:", {
        status: error.response?.status,
        message: error.response?.data?.message,
      });

      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";

      get().disconnectSocket();
      toast.error(errorMessage);
      set({ authUser: null, hasCheckedAuth: true });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated successfully!");
    } catch (error) {
      console.error("error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser) return;
    if (socket?.connected) return;

    if (socket) {
      socket.disconnect();
    }

    const socketInstance = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      withCredentials: true,
    });

    socketInstance.connect();

    socketInstance.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: socketInstance });
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();
    }

    set({ socket: null, onlineUsers: [] });
  },
}));
