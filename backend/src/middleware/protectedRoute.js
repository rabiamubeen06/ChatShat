import { createClient } from "../lib/supabaseServer.js";
import Profile from "../models/Profile.js";

export const protectRoute = async(req, res, next) => {
    try {
        const supabase = createClient(req, res);

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return res.status(401).json({ message: "Unauthorized - no valid session" });
        }

        const profile = await Profile.findOne({ supabaseId: user.id });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        req.user = user;
        req.profile = profile;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};