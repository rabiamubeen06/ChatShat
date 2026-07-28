import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profilePic: {
        type: String,
        default: "",
    }
}, { timestamps: true });
export default mongoose.model("User", userschema);