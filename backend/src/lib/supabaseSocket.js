import { createServerClient } from "@supabase/ssr";

export function createSocketClient(socket) {
    const cookieHeader = socket.handshake.headers.cookie || "";


    const cookies = cookieHeader
        .split(";")
        .map(cookie => cookie.trim())
        .filter(Boolean)
        .map(cookie => {
            const [name, ...value] = cookie.split("=");
            return {
                name,
                value: decodeURIComponent(value.join("=")),
            };
        });

    return createServerClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_PUBLISHABLE_KEY, {
            cookies: {
                getAll() {
                    return cookies;
                },
                setAll() {},
            },
        }
    );
}