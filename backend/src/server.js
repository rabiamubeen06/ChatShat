import express from 'express'
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import { connectDB } from './lib/db.js';
dotenv.config();
import cors from 'cors'

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB();
});