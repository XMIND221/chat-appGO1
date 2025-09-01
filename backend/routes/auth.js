import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // on créera ce modèle juste après
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ------------------ REGISTER ------------------
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ------------------ LOGIN ------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        // Comparer les mots de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        // Créer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ------------------ LOGOUT ------------------
router.post("/logout", (req, res) => {
    // Avec JWT côté client, logout = supprimer le token
    res.status(200).json({ message: "Déconnecté avec succès" });
});

export default router;
