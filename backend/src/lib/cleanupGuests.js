import Profile from "../models/Profile.js";
import Message from "../models/Message.js";

const STALE_AFTER_MS = 24 * 60 * 60 * 1000;

export const cleanupStaleGuests = async() => {
    try {
        const cutoff = new Date(Date.now() - STALE_AFTER_MS);

        const staleGuests = await Profile.find({
            isGuest: true,
            createdAt: { $lt: cutoff },
        });

        if (staleGuests.length === 0) return;

        const guestIds = staleGuests.map((g) => g._id);

        await Message.deleteMany({
            $or: [{ senderId: { $in: guestIds } }, { receiverId: { $in: guestIds } }],
        });

        await Profile.deleteMany({ _id: { $in: guestIds } });

        console.log(`[cleanup] removed ${staleGuests.length} stale guest account(s)`);
    } catch (error) {
        console.log("Error in cleanupStaleGuests:", error);
    }
};