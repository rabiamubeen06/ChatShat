import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    supabaseId: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    profilePic: { type: String, default: "" },
    isGuest: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);