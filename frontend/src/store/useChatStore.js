import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

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

  getAllContacts: async (force = false) => {
    const { allContacts, isUserLoading } = get();
    if (!force && (isUserLoading || allContacts.length > 0)) {
      return;
    }

    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      const { chats } = get();
      const chatIds = new Set(chats.map((chat) => chat._id));
      const filteredContacts = res.data.data.filter(
        (contact) => !chatIds.has(contact._id),
      );
      set({ allContacts: filteredContacts });
    } catch (error) {
      console.error("Error in fetching contacts:", error.message);
      toast.error(error.response?.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getChats: async (force = false) => {
    const { chats, isUserLoading } = get();
    if (!force && (isUserLoading || chats.length > 0)) {
      return;
    }

    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data.data });
    } catch (error) {
      console.error("Error fetching the chats:", error.message);
      toast.error(error.response?.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      toast.error(error.response?.data.message || "Something went Wrong!");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    //optimestic update
    const { authUser } = useAuthStore.getState();
    const { messages, selectedUser } = get();

    const tempId = `temp-${Date.now()}`;

    const optimesticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({
      messages: [...messages, optimesticMessage],
    });

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData,
      );

      set({
        messages: messages.concat(res.data.data),
      });
    } catch (error) {
      set((state) => ({
        messages: state.messages
          .filter((m) => m._id !== tempId)
          .concat(res.data.data),
      }));
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
}));
