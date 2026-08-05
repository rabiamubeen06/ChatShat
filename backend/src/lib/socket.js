import "dotenv/config";
import { Server } from "socket.io"
import http from "http"
import express from "express"
import { socketAuthMiddleware } from "../middleware/socketAuth.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});
console.log("Before middleware");
// apply authentication to all socket connections
io.use(socketAuthMiddleware);
console.log("After middleware");
export function getReceiverSocketIds(userId) {
    const set = userSocketMap[userId];
    return set ? Array.from(set) : [];

}
const userSocketMap = {}; // userId -> Set of socketIds
function addUserSocket(userId, socketId) {
    if (!userSocketMap[userId]) userSocketMap[userId] = new Set();
    userSocketMap[userId].add(socketId);
}

function removeUserSocket(userId, socketId) {
    const set = userSocketMap[userId];
    if (!set) return;
    set.delete(socketId);
    if (set.size === 0) delete userSocketMap[userId];
}

io.on("connect", (socket) => {
    console.log("A user connected: ", socket.profile.fullName);
    const userId = socket.userId;
    addUserSocket(userId, socket.id);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("A user disconnected ", socket.profile.fullName);
        removeUserSocket(userId, socket.id);
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };