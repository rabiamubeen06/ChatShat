import { createSocketClient } from "../lib/supabaseSocket.js";
import Profile from "../models/Profile.js";

export const socketAuthMiddleware = async(socket, next) => {
    try {
        console.log("Middlware started");
        const supabase = createSocketClient(socket);
        console.log("Client created");

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error || !user) {
            return next(new Error("Unauthorized"));
        }

        const profile = await Profile.findOne({
            supabaseId: user.id,
        });

        if (!profile) {
            return next(new Error("Profile not found"));
        }

        socket.user = user;
        socket.profile = profile;
        socket.userId = user.id;

        next();
    } catch (err) {
        console.log(err);
        next(new Error("Authentication failed"));
    }
};