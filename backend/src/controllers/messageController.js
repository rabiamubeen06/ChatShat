import Message from "../models/Message.js";
import Profile from "../models/Profile.js";
import { uploadImageToSupabase } from "../lib/uploadImage.js";
import { createClient } from "../lib/supabaseServer.js";
import { getReceiverSocketIds, io } from "../lib/socket.js";

export const getAllContacts = async(req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const filteredUsers = await Profile.find({ supabaseId: { $ne: loggedInUserId } });
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getAllContacts: ", error);
        res.status(500).json({ message: "Server Error" });
    }
}
export const getMessagesByUserId = async(req, res) => {
    try {
        const { id: userToChatSupabaseId } = req.params;

        const myProfile = await Profile.findOne({ supabaseId: req.user.id });
        const otherProfile = await Profile.findOne({ supabaseId: userToChatSupabaseId });

        if (!myProfile || !otherProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const messages = await Message.find({
                $or: [
                    { senderId: myProfile._id, receiverId: otherProfile._id },
                    { senderId: otherProfile._id, receiverId: myProfile._id },
                ],
            })
            .sort({ createdAt: 1 });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessagesByUserId: ", error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const sendMessage = async(req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverSupabaseId } = req.params;
        const senderId = req.user.id;
        if (!text && !image) return res.status(400).json({ message: "Text or image is required" });

        if (senderId === receiverSupabaseId) {
            return res.status(400).json({ message: "Cannot send messages to yourself" });
        }

        const senderProfile = await Profile.findOne({ supabaseId: req.user.id });
        const receiverProfile = await Profile.findOne({ supabaseId: receiverSupabaseId });

        if (!senderProfile || !receiverProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        let imageUrl;
        if (image) {
            const supabase = createClient(req, res);
            const uniqueName = `${req.user.id}-${Date.now()}`;
            imageUrl = await uploadImageToSupabase(supabase, image, "MessageImages", uniqueName);
        }

        const newMessage = new Message({
            senderId: senderProfile._id,
            receiverId: receiverProfile._id,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        const receiverSocketIds = getReceiverSocketIds(receiverProfile.supabaseId);
        receiverSocketIds.forEach((socketId) => {
            io.to(socketId).emit("newMessage", newMessage);
        });
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage: ", error);
        res.status(500).json({ message: error.message || "Server Error" });
    }
};
export const getChatPartners = async(req, res) => {
    try {

        const myProfile = await Profile.findOne({ supabaseId: req.user.id });
        if (!myProfile) return res.status(404).json({ message: "Profile not found" });
        const myId = myProfile._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId },
                { receiverId: myId },
            ],
        });

        const chatPartnerIds = [...new Set(messages.map(msg =>
            msg.senderId.toString() === myId.toString() ?
            msg.receiverId.toString() :
            msg.senderId.toString()
        ))];
        const chatPartners = await Profile.find({ _id: { $in: chatPartnerIds } });
        res.status(200).json(chatPartners);


    } catch (error) {
        console.log("Error in getChatPartners controller: ", error);
        res.status(500).json({ message: error.message || "Server Error" });
    }
}