import { create } from "zustand";

const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("chat-theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
};

const initialTheme = getInitialTheme();
if (typeof window !== "undefined") applyTheme(initialTheme);

export const useThemeStore = create((set, get) => ({
    theme: initialTheme,
    toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        localStorage.setItem("chat-theme", next);
        applyTheme(next);
        set({ theme: next });
    },
}));