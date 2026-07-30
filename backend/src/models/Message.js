import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    text: {
        type: String,
        trim: true,
        maxLength: 1000,
    },
    image: {
        type: String,
    },
}, { timestamps: true });
export default mongoose.model("Message", messageSchema);