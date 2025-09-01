// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
    res.send("🚀 Chat App Backend is running...");
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Socket.io setup
io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("message", (data) => {
        console.log("💬 Message received:", data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
