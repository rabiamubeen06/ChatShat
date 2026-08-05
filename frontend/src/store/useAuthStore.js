import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client"


import toast from "react-hot-toast";


const baseURL =
    import.meta.env.MODE === 'development' ? "http://localhost:3000" : "/";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in authCheck", error);
            toast.error(error.response.data.message || "Failed to check authentication");
            set({ authUser: null });

        } finally {
            set({ isCheckingAuth: false });
        }

    },
    signup: async(data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created Successfully!");
            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async(data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in Successfully!")
            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out Successfully!");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }


    },
    updateProfile: async(data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile:", error);
            toast.error(error.response.data.message);
        }
    },
    connectSocket: async() => {
        const { authUser } = get();

        if (!authUser || (get().socket && get().socket.connected)) return;



        const socket = io(baseURL, {
            withCredentials: true,
        });


        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
        socket.on("connect_error", async(err) => {
            if (err.message === "Unauthorized") {
                try {
                    // hits checkAuth -> triggers Supabase SSR client -> refreshes + rewrites cookie
                    await axiosInstance.get("/auth/checkAuth");
                    socket.connect(); // retry handshake with the fresh cookie
                } catch {
                    get().disconnectSocket();
                    set({ authUser: null }); // session truly dead, force re-login
                }
            }
        });

        set({ socket });
    },
    disconnectSocket: () => {
        if (get().socket && get().socket.connected) get().socket.disconnect();

    }
}));