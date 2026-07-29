import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    supabaseId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    profilePic: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);