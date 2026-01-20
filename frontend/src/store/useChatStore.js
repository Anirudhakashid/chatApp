import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });

      toast.success("Contacts fetched successfully!");
    } catch (error) {
      console.error("Error in fetching contacts:", error.message);
      toast.error(error.response?.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getChats: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });

      toast.success("Chats fetched Successfully!");
    } catch (error) {
      console.error("Error fetching the chats:", error.message);
      toast.error(error.response?.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
}));
