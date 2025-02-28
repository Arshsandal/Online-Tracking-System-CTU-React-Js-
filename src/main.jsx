import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Help from "./pages/Help";
import DiscoverChandigarh from "./pages/DiscoverChandigarh";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/help" element={<Help />} />
      <Route path="/discover-chandigarh" element={<DiscoverChandigarh />} />
    </Routes>
  </BrowserRouter>
);
