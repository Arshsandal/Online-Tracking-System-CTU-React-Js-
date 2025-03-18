import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Help from "./pages/Help";
import DiscoverChandigarh from "./pages/DiscoverChandigarh";
import AllServices from "./pages/AllServices";
import FixLounge from "./pages/FixLounge";
import ProfilePage from "./pages/Profile";
import TripTracker from "./pages/TripTracker";
import RouteMap from "./pages/RouteMap";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/help" element={<Help />} />
      <Route path="/discoverChandigarh" element={<DiscoverChandigarh />} />
      <Route path="/allServices" element={<AllServices />} />
      <Route path="/fixLounge" element={<FixLounge />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/tripTracker" element={<TripTracker />} />
      <Route path="/routeMap" element={<RouteMap />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
    </Routes>
  </BrowserRouter>
);
