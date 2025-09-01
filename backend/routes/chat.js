import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Message from "../models/Message.js"; // à créer pour stocker les messages

const router = express.Router();

// Route protégée pour récupérer tous les messages
router.get("/", verifyToken, async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route protégée pour envoyer un message
router.post("/", verifyToken, async (req, res) => {
    try {
        const { text } = req.body;
        const newMessage = new Message({
            text,
            userId: req.user.id,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
