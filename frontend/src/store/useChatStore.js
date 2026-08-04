import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";




const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    getAllContacts: async() => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });

        } catch (error) {
            console.log("Error in getAllContacts:", error);
            toast.error(error.response.data.message || "Failed to fetch contacts");


        } finally {
            set({ isUserLoading: false });
        }
    },
    getChats: async() => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            console.log("Error in getChats:", error);
            toast.error(error.response.data.message || "Failed to fetch chats");
        } finally {
            set({ isUserLoading: false });
        }
    },
    getMessagesByUserId: async(userId) => {
        console.log("Fetching messages for userId:", userId);
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log("Error in getMessagesByUserId:", error);
            toast.error(error.response.data.message || "Failed to fetch messages");
        } finally {
            set({ isMessageLoading: false });
        }
    },
    sendMessage: async(messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();
        const tempId = `temp-${Date.now()}`;
        const optimisticMessage = {
            _id: tempId,
            senderId: authUser.supabaseId,
            receiverId: selectedUser.supabaseId,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        }
        set({ messages: [...messages, optimisticMessage] });


        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser.supabaseId}`, messageData);
            set({ messages: messages.concat(res.data) });

        } catch (error) {
            set({ messages: messages });
            toast.error(error.response.data.message) || "Something went wrong";
            console.log("Error in sendMessage:", error);

        }
    }

}))
export default useChatStore;