import Profile from "../models/Profile.js";
import { createClient } from "../lib/supabaseServer.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { uploadImageToSupabase } from "../lib/uploadImage.js";

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
                emailRedirectTo: `${process.env.CLIENT_URL}/login`,
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
            id: data.user.id,
            profileId: newProfile._id,
            email: data.user.email,
            fullName: newProfile.fullName,
            profilePic: newProfile.profilePic,
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
            id: data.user.id,
            profileId: profile._id,
            email: data.user.email,
            fullName: profile.fullName,
            profilePic: profile.profilePic,
        });


    } catch (error) {
        console.log("Error in login Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
import Message from "../models/Message.js";

export const logout = async(req, res) => {
    try {
        const supabase = createClient(req, res);

        // Capture the user before signOut invalidates the session
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase.auth.signOut();
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        // If this was a guest account, wipe their Mongo data
        if (user.is_anonymous) {
            const profile = await Profile.findOne({ supabaseId: user.id });
            if (profile) {
                await Message.deleteMany({
                    $or: [{ senderId: profile._id }, { receiverId: profile._id }],
                });
                await Profile.findByIdAndDelete(profile._id);
            }
        }

        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Error in logout Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const checkAuth = (req, res) => {
    res.status(200).json({
        id: req.profile.supabaseId,
        profileId: req.profile._id,
        email: req.user.email,
        fullName: req.profile.fullName,
        profilePic: req.profile.profilePic,
    });
}
export const updateProfile = async(req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

        const supabase = createClient(req, res);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const publicUrl = await uploadImageToSupabase(supabase, profilePic, "avatars", user.id);

        const updatedProfile = await Profile.findOneAndUpdate({ supabaseId: user.id }, { profilePic: publicUrl }, { new: true });

        if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });

        res.status(200).json(updatedProfile);

    } catch (error) {
        console.log("Error in updateProfile Controller:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const guestLogin = async(req, res) => {
    try {
        const supabase = createClient(req, res);
        const { data, error } = await supabase.auth.signInAnonymously();

        if (error) {
            return res.status(400).json({ message: error.message });
        }
        if (!data.user) {
            return res.status(400).json({ message: "Guest login failed" });
        }

        const guestName = `Guest ${Math.floor(1000 + Math.random() * 9000)}`;

        const newProfile = new Profile({
            supabaseId: data.user.id,
            fullName: guestName,
            isGuest: true,
        });
        await newProfile.save();

        return res.status(200).json({
            message: "Guest login successful",
            id: data.user.id,
            profileId: newProfile._id,
            fullName: newProfile.fullName,
            profilePic: newProfile.profilePic,
            isGuest: true,
        });

    } catch (error) {
        console.log("Error in guestLogin Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};