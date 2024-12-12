import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // глобальные стили
import App from "./App.jsx"; // компонент App
import Docs from "./Docs"; // компонент Docs
import LinuxEmulation from "./xterm/term.js"; // компонент для эмуляции Linux
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Изменили Switch на Routes
import AlgorithmPage from "./algoritm/algoritm.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<App />} />
        {/* Страница документации */}
        <Route path="/docs" element={<Docs />} />
        {/* Страница эмуляции Linux */}
        <Route path="/linuxemulation" element={<LinuxEmulation />} />
        <Route path="/AlgorithmPage" element={<AlgorithmPage />} />        
      </Routes>
    </Router>
  </React.StrictMode>
);
