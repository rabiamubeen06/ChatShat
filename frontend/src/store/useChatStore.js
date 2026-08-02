import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


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
            const res = await axios.axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });

        } catch (error) {
            console.log("Error in getAllContacts:", error);
            toast.error(error.response.data.message || "Failed to fetch contacts");


        } finally {
            set({ isUserLoading: false });
        }
    }



}))
export default useChatStore;