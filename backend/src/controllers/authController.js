import Profile from "../models/Profile.js";
import { createClient } from "../lib/supabaseServer.js";
import { SupabaseClient } from "@supabase/supabase-js";

export const signup = async(req, res) => {

    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });

        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const supabase = createClient(req, res);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { fullName },
                emailRedirectTo: `https://google.com`,
            },
        })
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        if (data.user && data.user.identities && data.user.identities.length === 0) {
            return res.status(400).json({ message: "This email is already registered. Please check your inbox to verify it, or log in." });
        }
        if (!data.user) {
            return res.status(400).json({ message: "Signup failed. Try a different email." });
        }
        const newProfile = new Profile({
            supabaseId: data.user.id,
            fullName,
        });
        await newProfile.save();
        return res.status(201).json({
            message: "Signup successful. Check your email to verify your account.",
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: newProfile.fullName,
                profilePic: newProfile.profilePic,
            },
        })


    } catch (error) {
        console.log("Error in signup Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const supabase = createClient(req, res);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        if (!data.user) {
            return res.status(400).json({ message: "Login failed. Try a different email." });
        }
        const profile = await Profile.findOne({ supabaseId: data.user.id });
        if (!profile) return res.status(400).json({ message: "Error fetching profile" });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: profile.fullName,
                profilePic: profile.profilePic,
            },
        });


    } catch (error) {
        console.log("Error in login Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const logout = async(_, res) => {
    try {
        const supabase = createClient(req, res);

        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Error in logout Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const checkAuth = (req, res) => {
    res.status(200).json({
        user: req.user,
        profile: req.profile,
    });
}
export const updateProfile = async(req, res) => {

    try {
        const { profilePic } = req.body;
        if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });
        const supabase = createClient(req, res);

        const matches = profilePic.match(/^data:(.+);base64,(.+)$/);
        if (!matches) {
            return res.status(400).json({ message: "Invalid image format" });

        }
        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, "base64");
        const fileExt = mimeType.split("/")[1];
        const fileName = `${req.user.id}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from("avatars").upload(fileName, buffer, {
                contentType: mimeType,
                upsert: true,
            });
        if (uploadError) {
            return res.status(400).json({ message: uploadError.message });

        }
        const { data: urlData } = supabase.storage.from("avatars")
            .getPublicUrl(fileName);
        const updatedProfile = await Profile.findOneAndUpdate({ supabaseId: req.user.id }, { profilePic: urlData.publicUrl }, { new: true });
        if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(updatedProfile);

    } catch (error) {
        console.log("Error in updateProfile Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}