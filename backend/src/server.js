import "dotenv/config";
import express from 'express'
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import { connectDB } from './lib/db.js';
import cors from 'cors'
import { app, server } from "./lib/socket.js";

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB();
});