import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Chat from "./components/Chat"; // à créer plus tard

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/chat" element={<Chat />} /> {/* page principale du chat */}
                <Route path="*" element={<LoginForm />} /> {/* redirection par défaut */}
            </Routes>
        </Router>
    );
}

export default App;
